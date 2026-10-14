import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Calendar,
  AlertTriangle,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Route,
  Sparkles,
  Info,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Wand2,
  Copy,
  Check,
  Save,
  FolderOpen,
  Share2,
  Plane,
  Clock,
  Layers,
  FileText
} from 'lucide-react';
import {
  CountryItem,
  CAT_INFO,
  getCountryName,
  getFlag,
  D,
  SCHENGEN_SET,
  getCategoryBadgeLabel
} from '../data/passportData';
import {
  RouteStop,
  RouteWarning,
  validateRouteStop,
  computeRouteSchengenTotal,
  formatLocalizedDate,
  dateToDayIndex,
  dayIndexToDate,
  getTodayDayIndex,
  TripRecord
} from '../utils/calculator';
import {
  estimateTravelLeg,
  optimizeRouteOrder,
  calculateDistanceKm,
  getCountryGeo,
  TravelLegEstimate
} from '../data/geoData';
import { RouteMapVisualizer } from './RouteMapVisualizer';
import { loadStoredRouteStops, saveStoredRouteStops, loadStoredTrips } from '../utils/storage';
import { getPassportItems } from '../utils/calculator';
import { useI18n } from '../data/i18n';
import { processRouteAnalysis } from '../utils/routeAnalyzer';
import { CustomDatePicker } from './CustomDatePicker';

interface RoutePlannerTabProps {
  currentPassport: string;
}

interface SavedItinerary {
  id: string;
  name: string;
  savedAt: string;
  stops: RouteStop[];
}

const PRESET_ROUTES: {
  titleTr: string;
  titleEn: string;
  titleDe: string;
  descTr: string;
  descEn: string;
  descDe: string;
  stops: { country: string; days: number }[];
}[] = [
  {
    titleTr: 'Balkanlar & Vizesiz Keşif Turu',
    titleEn: 'Balkans Visa-Free Discovery Tour',
    titleDe: 'Balkan-Visumfrei-Entdeckungstour',
    descTr: 'Sırbistan, Bosna-Hersek, Karadağ ve Arnavutluk (18 gün)',
    descEn: 'Serbia, Bosnia & Herzegovina, Montenegro and Albania (18 days)',
    descDe: 'Serbien, Bosnien und Herzegowina, Montenegro und Albanien (18 Tage)',
    stops: [
      { country: 'RS', days: 5 },
      { country: 'BA', days: 4 },
      { country: 'ME', days: 5 },
      { country: 'AL', days: 4 }
    ]
  },
  {
    titleTr: 'Kafkasya & Kimlikle Seyahat',
    titleEn: 'Caucasus & ID Travel Route',
    titleDe: 'Kaukasus & Personalausweis-Route',
    descTr: 'Gürcistan ve Azerbaycan rotası (14 gün)',
    descEn: 'Georgia and Azerbaijan corridor (14 days)',
    descDe: 'Georgien- und Aserbaidschan-Korridor (14 Tage)',
    stops: [
      { country: 'GE', days: 8 },
      { country: 'AZ', days: 6 }
    ]
  },
  {
    titleTr: 'İberik & Akdeniz Koridoru',
    titleEn: 'Iberian & Mediterranean Corridor',
    titleDe: 'Iberischer & Mittelmeer-Korridor',
    descTr: 'Portekiz, İspanya, Fransa ve İtalya (21 gün)',
    descEn: 'Portugal, Spain, France and Italy (21 days)',
    descDe: 'Portugal, Spanien, Frankreich und Italien (21 Tage)',
    stops: [
      { country: 'PT', days: 5 },
      { country: 'ES', days: 6 },
      { country: 'FR', days: 5 },
      { country: 'IT', days: 5 }
    ]
  },
  {
    titleTr: 'Güneydoğu Asya Nomad Rotası',
    titleEn: 'Southeast Asia Nomad Route',
    titleDe: 'Südostasien Nomad-Route',
    descTr: 'Tayland, Malezya ve Singapur (45 gün)',
    descEn: 'Thailand, Malaysia and Singapore (45 days)',
    descDe: 'Thailand, Malaysia und Singapur (45 Tage)',
    stops: [
      { country: 'TH', days: 20 },
      { country: 'MY', days: 15 },
      { country: 'SG', days: 10 }
    ]
  }
];

export const RoutePlannerTab: React.FC<RoutePlannerTabProps> = ({ currentPassport }) => {
  const { language, t, l } = useI18n();

  const [stops, setStops] = useState<RouteStop[]>(() => loadStoredRouteStops());
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);

  // Form states for adding new stop
  const [selectedCountry, setSelectedCountry] = useState<string>('RS');
  const [stayDuration, setStayDuration] = useState<number>(5);
  const [entryDate, setEntryDate] = useState<string>(() => dayIndexToDate(getTodayDayIndex() + 14));
  const [exitDate, setExitDate] = useState<string>(() => dayIndexToDate(getTodayDayIndex() + 18));
  const [includeTransitDay, setIncludeTransitDay] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Saved itineraries state
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>(() => {
    try {
      const raw = localStorage.getItem('vr_saved_itineraries');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [newItineraryName, setNewItineraryName] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [optNotice, setOptNotice] = useState<string | null>(null);

  // Auto-scheduler modal / mini-panel
  const [showAutoScheduler, setShowAutoScheduler] = useState<boolean>(false);
  const [autoStartDate, setAutoStartDate] = useState<string>(() => dayIndexToDate(getTodayDayIndex() + 10));
  const [autoDaysPerStop, setAutoDaysPerStop] = useState<number>(4);

  // Existing trips for Schengen & 180-day calculations
  const trips = useMemo<TripRecord[]>(() => loadStoredTrips(), []);

  // Passport info map
  const passportItems = useMemo(() => getPassportItems(currentPassport), [currentPassport]);
  const passportItemsMap = useMemo(() => {
    const map = new Map<string, CountryItem>();
    passportItems.forEach(it => map.set(it.c, it));
    return map;
  }, [passportItems]);

  const passportName = getCountryName(currentPassport, language);

  // Sync stops changes to localStorage
  const updateStops = (newStops: RouteStop[]) => {
    setStops(newStops);
    saveStoredRouteStops(newStops);
  };

  // Country select list sorted by name in current language
  const countryList = useMemo(() => {
    const codes = Object.keys(D);
    return codes.sort((a, b) => getCountryName(a, language).localeCompare(getCountryName(b, language), language));
  }, [language]);

  // Handle adding stop
  const handleAddStop = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!selectedCountry) {
      setFormError(l('Lütfen eklenecek bir ülke seçin.', 'Please select a destination country.', 'Bitte wählen Sie ein Zielland aus.'));
      return;
    }

    const inIdx = dateToDayIndex(entryDate);
    const outIdx = dateToDayIndex(exitDate);

    if (!entryDate || !exitDate) {
      setFormError(l('Lütfen geçerli giriş ve çıkış tarihlerini girin.', 'Please specify valid entry and exit dates.', 'Bitte geben Sie gültige Ein- und Ausreisedaten ein.'));
      return;
    }

    if (outIdx < inIdx) {
      setFormError(l('Çıkış tarihi giriş tarihinden önce olamaz.', 'Exit date cannot be earlier than entry date.', 'Das Ausreisedatum kann nicht vor dem Einreisedatum liegen.'));
      return;
    }

    const newStop: RouteStop = {
      id: `stop-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      countryCode: selectedCountry,
      entryDate,
      exitDate
    };

    const nextStops = [...stops, newStop];
    updateStops(nextStops);

    // Auto calculate next suggested entry date (day after or with 1-day transit buffer)
    const transitBuffer = includeTransitDay ? 1 : 0;
    const nextStartIdx = outIdx + 1 + transitBuffer;
    const nextEndIdx = nextStartIdx + stayDuration - 1;
    setEntryDate(dayIndexToDate(nextStartIdx));
    setExitDate(dayIndexToDate(nextEndIdx));
  };

  // Remove stop
  const handleRemoveStop = (id: string) => {
    const next = stops.filter(s => s.id !== id);
    updateStops(next);
    if (selectedStopId === id) setSelectedStopId(null);
  };

  // Move stop up / down
  const handleMoveStop = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === stops.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const nextStops = [...stops];
    const temp = nextStops[index];
    nextStops[index] = nextStops[targetIdx];
    nextStops[targetIdx] = temp;

    updateStops(nextStops);
  };

  // Intelligent Route Optimization (Traveling Salesperson heuristic to minimize total distance)
  const handleOptimizeProgression = () => {
    if (stops.length < 3) return;

    const countryCodes = stops.map(s => s.countryCode);
    const optResult = optimizeRouteOrder(countryCodes);
    const optimizedCodes = optResult.optimizedCodes;

    // Keep durations matching the corresponding countries
    const durMap = new Map<string, number>();
    stops.forEach(s => {
      const dur = Math.max(1, dateToDayIndex(s.exitDate) - dateToDayIndex(s.entryDate) + 1);
      durMap.set(s.countryCode, dur);
    });

    // Reconstruct stops with consecutive dates starting from the earliest entry date
    const firstStartIdx = dateToDayIndex(stops[0].entryDate);
    let currentIdx = firstStartIdx;

    const reconstructedStops: RouteStop[] = optimizedCodes.map((code, idx) => {
      const dur = durMap.get(code) || 4;
      const inStr = dayIndexToDate(currentIdx);
      const outStr = dayIndexToDate(currentIdx + dur - 1);
      currentIdx += dur; // Next day
      return {
        id: `opt-${idx}-${code}`,
        countryCode: code,
        entryDate: inStr,
        exitDate: outStr
      };
    });

    const origKm = calculateRouteTotalKm(stops);
    const newKm = calculateRouteTotalKm(reconstructedStops);
    const savedKm = Math.max(0, origKm - newKm);

    updateStops(reconstructedStops);
    setOptNotice(
      l(
        `✨ Rota coğrafi yakınlığa göre optimize edildi! Yaklaşık ${savedKm.toLocaleString('tr-TR')} km yol tasarrufu sağlandı.`,
        `✨ Route optimized for geographic proximity! Saved approximately ${savedKm.toLocaleString('en-US')} km of transit distance.`,
        `✨ Route nach geografischer Nähe optimiert! Ca. ${savedKm.toLocaleString('de-DE')} km Reiseabstand eingespart.`
      )
    );
    setTimeout(() => setOptNotice(null), 5000);
  };

  // Helper to compute total distance
  const calculateRouteTotalKm = (stList: RouteStop[]): number => {
    let sum = 0;
    for (let i = 0; i < stList.length - 1; i++) {
      sum += estimateTravelLeg(stList[i].countryCode, stList[i + 1].countryCode).distanceKm;
    }
    return sum;
  };

  // Auto schedule dates evenly
  const handleApplyAutoSchedule = () => {
    if (stops.length === 0) return;

    let curIdx = dateToDayIndex(autoStartDate);
    const newStops = stops.map(s => {
      const entry = dayIndexToDate(curIdx);
      const exit = dayIndexToDate(curIdx + autoDaysPerStop - 1);
      curIdx += autoDaysPerStop;
      return {
        ...s,
        entryDate: entry,
        exitDate: exit
      };
    });

    updateStops(newStops);
    setShowAutoScheduler(false);
  };

  // Load a preset itinerary
  const handleLoadPreset = (presetIdx: number) => {
    const preset = PRESET_ROUTES[presetIdx];
    if (!preset) return;

    let curIdx = getTodayDayIndex() + 14;
    const newStops: RouteStop[] = preset.stops.map((ps, idx) => {
      const entry = dayIndexToDate(curIdx);
      const exit = dayIndexToDate(curIdx + ps.days - 1);
      curIdx += ps.days;
      return {
        id: `preset-${presetIdx}-${idx}-${ps.country}`,
        countryCode: ps.country,
        entryDate: entry,
        exitDate: exit
      };
    });

    updateStops(newStops);
  };

  // Save current route to localStorage
  const handleSaveItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItineraryName.trim() || stops.length === 0) return;

    const newItin: SavedItinerary = {
      id: `itin-${Date.now()}`,
      name: newItineraryName.trim(),
      savedAt: new Date().toLocaleDateString(language === 'de' ? 'de-DE' : language === 'en' ? 'en-US' : 'tr-TR'),
      stops
    };

    const updated = [newItin, ...savedItineraries];
    setSavedItineraries(updated);
    try {
      localStorage.setItem('vr_saved_itineraries', JSON.stringify(updated));
    } catch {}

    setNewItineraryName('');
    setShowSaveModal(false);
  };

  const handleLoadSavedItinerary = (itin: SavedItinerary) => {
    updateStops(itin.stops);
  };

  const handleDeleteSavedItinerary = (id: string) => {
    const updated = savedItineraries.filter(i => i.id !== id);
    setSavedItineraries(updated);
    try {
      localStorage.setItem('vr_saved_itineraries', JSON.stringify(updated));
    } catch {}
  };

  // Copy formatted itinerary text to clipboard
  const handleCopySummary = () => {
    if (stops.length === 0) return;
    let text = l(
      `✈️ VizeRehberi - Seyahat Rotası Planı (${passportName} Pasaportu)\n`,
      `✈️ ${t.appTitle} - Travel Route Plan (${passportName} Passport)\n`,
      `✈️ ${t.appTitle} - Reiseroutenplan (${passportName}-Pass)\n`
    );
    text += l(
      `Toplam ${stops.length} Durak · ${routeSummary?.cumulativeDays} Gün Kalış\n`,
      `Total ${stops.length} Stops · ${routeSummary?.cumulativeDays} Stay Days\n`,
      `Insgesamt ${stops.length} Stopps · ${routeSummary?.cumulativeDays} Aufenthaltstage\n`
    );
    text += l(
      `Tarihler: ${formatLocalizedDate(routeSummary?.firstDay || 0, language)} - ${formatLocalizedDate(routeSummary?.lastDay || 0, language)}\n\n`,
      `Dates: ${formatLocalizedDate(routeSummary?.firstDay || 0, language)} - ${formatLocalizedDate(routeSummary?.lastDay || 0, language)}\n\n`,
      `Termine: ${formatLocalizedDate(routeSummary?.firstDay || 0, language)} - ${formatLocalizedDate(routeSummary?.lastDay || 0, language)}\n\n`
    );

    stops.forEach((s, idx) => {
      const pItem = passportItemsMap.get(s.countryCode);
      const inIdx = dateToDayIndex(s.entryDate);
      const outIdx = dateToDayIndex(s.exitDate);
      const dur = outIdx - inIdx + 1;
      const status = getCategoryBadgeLabel(pItem, language);

      text += `${idx + 1}. ${getFlag(s.countryCode)} ${getCountryName(s.countryCode, language)}: ${formatLocalizedDate(
        inIdx,
        language
      )} - ${formatLocalizedDate(outIdx, language)} (${dur} ${l('gün', 'days', 'Tage')}) [${status}]\n`;

      if (idx < stops.length - 1) {
        const leg = estimateTravelLeg(s.countryCode, stops[idx + 1].countryCode);
        text += `   ↳ ${leg.modeIcon} ${leg.modeLabel} (~${leg.distanceKm} km, ~${leg.estimatedTransitHours} ${l('sa', 'hrs', 'Std.')})\n`;
      }
    });

    if (routeSummary?.schengenAnalysis.totalSchengenDays) {
      text += l(
        `\nSchengen Durumu: Rota içinde ${routeSummary.schengenAnalysis.totalSchengenDays} gün kalış (Pik: ${routeSummary.schengenAnalysis.peak180Days}/90 gün).`,
        `\nSchengen Status: ${routeSummary.schengenAnalysis.totalSchengenDays} days in route (Peak: ${routeSummary.schengenAnalysis.peak180Days}/90 days).`,
        `\nSchengen-Status: ${routeSummary.schengenAnalysis.totalSchengenDays} Tage in der Route (Spitze: ${routeSummary.schengenAnalysis.peak180Days}/90 Tage).`
      );
    }

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Route statistics and Schengen accumulation
  const routeSummary = useMemo(() => {
    if (stops.length === 0) return null;

    let cumulativeDays = 0;
    let minDay = Infinity;
    let maxDay = -Infinity;

    stops.forEach(s => {
      const a = dateToDayIndex(s.entryDate);
      const b = dateToDayIndex(s.exitDate);
      if (a < minDay) minDay = a;
      if (b > maxDay) maxDay = b;
      cumulativeDays += Math.max(0, b - a + 1);
    });

    const totalDistanceKm = calculateRouteTotalKm(stops);
    const schengenAnalysis = computeRouteSchengenTotal(stops, trips);

    return {
      totalStops: stops.length,
      cumulativeDays,
      totalDaysSpan: Math.max(0, maxDay - minDay + 1),
      firstDay: minDay,
      lastDay: maxDay,
      totalDistanceKm,
      schengenAnalysis
    };
  }, [stops, trips]);

  const routeAnalysisResult = useMemo(() => {
    return processRouteAnalysis({
      passport: currentPassport,
      targetLanguage: language,
      routeStops: stops.map(s => ({
        countryCode: s.countryCode,
        entryDate: s.entryDate,
        exitDate: s.exitDate
      })),
      existingTrips: trips
    });
  }, [currentPassport, language, stops, trips]);

  return (
    <div className="space-y-6">
      {/* Visual Journey Schematic Map & Line-Connected Timeline */}
      <RouteMapVisualizer
        stops={stops}
        passportItems={passportItemsMap}
        onSelectStop={(id) => {
          setSelectedStopId(id);
          const el = document.getElementById(`stop-${id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }}
        selectedStopId={selectedStopId}
        onLoadPreset={handleLoadPreset}
      />

      {/* Main Builder Form Card */}
      <div className="glass-panel border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-lg space-y-6 bg-gradient-to-br from-white/95 via-slate-50/80 to-[#0D9488]/5 dark:from-[#111625]/90 dark:via-[#0C0F19]/95 dark:to-[#161D30]/80 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-[#0D9488] to-[#14B8A6] text-white shadow-xs">
                <Route className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                {l('Çok Ülkeli Rota Planlayıcı', 'Multi-Country Route Planner', 'Mehrländer-Routenplaner')}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {l(
                'Seyahat süresi, mantıksal sıralama ve vize rejimini dikkate alan ardışık seyahat planı',
                'Sequential travel itinerary considering duration, logical sequencing and visa regimes',
                'Sequenzielle Reiseroute unter Berücksichtigung von Aufenthaltsdauer, Logik und Visabestimmungen'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {stops.length > 0 && (
              <button
                type="button"
                onClick={handleCopySummary}
                className="btn-nubair-secondary py-1.5 px-3 text-xs"
                title={l('Rotayı WhatsApp / Metin olarak kopyala', 'Copy route to clipboard', 'Route in Zwischenablage kopieren')}
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> {l('Kopyalandı!', 'Copied!', 'Kopiert!')}
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-[#8E9DBE]" /> {l('Özeti Kopyala', 'Copy Summary', 'Zusammenfassung kopieren')}
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              disabled={stops.length === 0}
              className="btn-nubair-secondary py-1.5 px-3 text-xs disabled:opacity-50"
              title={l('Bu rotayı kaydet', 'Save this route', 'Diese Route speichern')}
            >
              <Save className="w-3.5 h-3.5 text-slate-500 dark:text-[#8E9DBE]" /> {l('Rotayı Kaydet', 'Save Route', 'Route speichern')}
            </button>
          </div>
        </div>

        {/* Add Stop Form */}
        <form onSubmit={handleAddStop} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {l('Eklenecek Ülke', 'Destination Country', 'Zielland hinzufügen')}
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {countryList.map(c => (
                  <option key={c} value={c}>
                    {getFlag(c)} {getCountryName(c, language)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                {l('Kalış Süresi (Gün)', 'Stay Duration (Days)', 'Aufenthaltsdauer (Tage)')}
              </label>
              <input
                type="number"
                min={1}
                max={365}
                value={stayDuration}
                onChange={(e) => {
                  const d = Number(e.target.value);
                  setStayDuration(d);
                  if (entryDate) {
                    setExitDate(dayIndexToDate(dateToDayIndex(entryDate) + d - 1));
                  }
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <CustomDatePicker
                value={entryDate}
                onChange={(d) => {
                  setEntryDate(d);
                  if (d && stayDuration) {
                    setExitDate(dayIndexToDate(dateToDayIndex(d) + stayDuration - 1));
                  }
                }}
                label={l('Giriş Tarihi', 'Entry Date', 'Einreisedatum')}
              />
            </div>

            <div>
              <CustomDatePicker
                value={exitDate}
                onChange={setExitDate}
                label={l('Çıkış Tarihi', 'Exit Date', 'Ausreisedatum')}
              />
            </div>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={includeTransitDay}
                onChange={(e) => setIncludeTransitDay(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <span>
                {l(
                  'Duraklar arasına 1 gün seyahat / intikal tamponu ekle',
                  'Add 1-day transit / travel buffer between stops',
                  '1 Tag Reise-/Transitpuffer zwischen den Stopps hinzufügen'
                )}
              </span>
            </label>

            <button
              type="submit"
              className="btn-nubair-primary"
            >
              <Plus className="w-4 h-4" /> {l('Durak Ekle', 'Add Stop', 'Stopp hinzufügen')}
            </button>
          </div>
        </form>

        {/* Smart Toolbar: Optimize Progression & Auto Schedule */}
        <div className="p-3.5 glass-panel rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOptimizeProgression}
              disabled={stops.length < 3}
              className="btn-nubair-secondary py-2 px-3.5 text-xs disabled:opacity-50"
              title={
                l(
                  'Zikzakları önlemek için en kısa ve mantıklı coğrafi sıraya diz',
                  'Sort stops into closest geographical order to avoid zigzagging',
                  'Stopps in geografisch sinnvollste Reihenfolge sortieren, um Zickzack-Reisen zu vermeiden'
                )
              }
            >
              <Wand2 className="w-4 h-4 text-amber-500 dark:text-cyan-400" />{' '}
              {l('Akıllı Coğrafi Sıralama (Zikzakları Önle)', 'Smart Route Optimization (Avoid Zigzags)', 'Intelligente Routenoptimierung (Zickzack vermeiden)')}
            </button>

            <button
              type="button"
              onClick={() => setShowAutoScheduler(!showAutoScheduler)}
              disabled={stops.length === 0}
              className="btn-nubair-secondary py-2 px-3.5 text-xs disabled:opacity-50"
            >
              <Calendar className="w-4 h-4 text-slate-500 dark:text-[#8E9DBE]" />{' '}
              {l('Tarihleri Otomatik Sırala', 'Auto-Schedule Dates', 'Termine automatisch verteilen')}
            </button>
          </div>

          <span className="text-[11px] text-slate-400 dark:text-[#8E9DBE]">
            {stops.length} {l('durak planlandı', 'stops planned', 'Stopps geplant')}
          </span>
        </div>

        {/* Auto scheduler sub-panel */}
        {showAutoScheduler && (
          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 space-y-3 animate-in fade-in duration-200">
            <div className="font-bold text-xs text-teal-950 dark:text-teal-200 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-600" />
              {l('Otomatik Tarih & Süre Dağıtıcı', 'Automatic Date & Duration Distributor', 'Automatischer Datums- & Dauerverteiler')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <CustomDatePicker
                  value={autoStartDate}
                  onChange={setAutoStartDate}
                  label={l('İlk Durağa Giriş Tarihi', 'First Stop Entry Date', 'Einreisedatum erster Stopp')}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-teal-900 dark:text-teal-300 mb-1">
                  {l('Her Durakta Kalış (Gün)', 'Stay per Stop (Days)', 'Aufenthalt pro Stopp (Tage)')}
                </label>
                <input
                  type="number"
                  min={1}
                  value={autoDaysPerStop}
                  onChange={(e) => setAutoDaysPerStop(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAutoScheduler(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100"
              >
                {l('Kapat', 'Close', 'Schließen')}
              </button>
              <button
                type="button"
                onClick={handleApplyAutoSchedule}
                className="px-4 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
              >
                {l('Tüm Duraklara Uygula', 'Apply to All Stops', 'Auf alle Stopps anwenden')}
              </button>
            </div>
          </div>
        )}

        {/* Optimization notification banner */}
        {optNotice && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">{optNotice}</div>
          </div>
        )}

        {/* Pre-made route presets */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />{' '}
            {l('Örnek Rotalar (1 Tıkla Yükle)', 'Sample Curated Routes (1-Click Load)', 'Beispielrouten (1-Klick-Laden)')}
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_ROUTES.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadPreset(idx)}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-teal-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                <b>{language === 'de' ? p.titleDe : language === 'en' ? p.titleEn : p.titleTr}</b>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Itineraries Drawer */}
      {savedItineraries.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-teal-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {l('Kayıtlı Rotalarınız', 'Saved Routes', 'Gespeicherte Routen')} ({savedItineraries.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {savedItineraries.map(itin => (
              <div
                key={itin.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{itin.name}</div>
                  <div className="text-[10px] text-slate-400">
                    {itin.stops.length} {l('durak', 'stops', 'Stopps')} · {itin.savedAt}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleLoadSavedItinerary(itin)}
                    className="px-2 py-1 bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 rounded font-bold text-[11px] hover:underline"
                  >
                    {l('Yükle', 'Load', 'Laden')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSavedItinerary(itin.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title={l('Sil', 'Delete', 'Löschen')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Route Summary & Schengen Alert Banner */}
      {routeSummary && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 border border-teal-200/80 dark:border-teal-800/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                {l('Rota Lojistik Özeti', 'Route Logistics Summary', 'Routen-Logistikübersicht')}
              </div>
              <div className="text-xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                {routeSummary.totalStops} {l('Durak', 'Stops', 'Stopps')} · {l('Toplam', 'Total', 'Insgesamt')}{' '}
                {routeSummary.cumulativeDays} {l('Gün Kalış', 'Stay Days', 'Aufenthaltstage')} ·{' '}
                {routeSummary.totalDistanceKm.toLocaleString(language === 'de' ? 'de-DE' : language === 'en' ? 'en-US' : 'tr-TR')} km
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {formatLocalizedDate(routeSummary.firstDay, language)} {l('ile', 'to', 'bis')}{' '}
                {formatLocalizedDate(routeSummary.lastDay, language)}{' '}
                {l(
                  `arası, genel seyahat süresi: ${routeSummary.totalDaysSpan} gün.`,
                  `· Total journey span: ${routeSummary.totalDaysSpan} days.`,
                  `· Gesamte Reisedauer: ${routeSummary.totalDaysSpan} Tage.`
                )}
              </div>
            </div>

            {routeSummary.schengenAnalysis.totalSchengenDays > 0 && (
              <div className="bg-white/90 dark:bg-slate-900/90 px-4 py-3 rounded-xl border border-teal-200 dark:border-teal-800 text-center">
                <div className="text-xs text-slate-500 font-semibold">
                  {l('Schengen Durumu', 'Schengen Stay', 'Schengen-Aufenthalt')}
                </div>
                <div className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400">
                  {routeSummary.schengenAnalysis.totalSchengenDays} {l('gün', 'days', 'Tage')}
                </div>
                <div className="text-[10px] text-slate-400">
                  {l(
                    `180 günde pik: ${routeSummary.schengenAnalysis.peak180Days} / 90 gün`,
                    `180d peak: ${routeSummary.schengenAnalysis.peak180Days} / 90 days`,
                    `180-Tage-Spitze: ${routeSummary.schengenAnalysis.peak180Days} / 90 Tage`
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Schengen Overstay Warning */}
          {routeSummary.schengenAnalysis.exceedsLimit && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <b className="font-bold block text-sm">
                  {l(
                    'Schengen 90/180 Gün Kuralı Aşımı Uyarısı!',
                    'Schengen 90/180-Day Limit Overstay Warning!',
                    'Warnung vor Überschreitung der Schengen-90/180-Tage-Regel!'
                  )}
                </b>
                {l(
                  `Planlanan rotanız, önceki seyahatleriniz ile birlikte değerlendirildiğinde herhangi bir 180 günlük kayan dönemde 90 gün sınırını aşmaktadır (Pik: ${routeSummary.schengenAnalysis.peak180Days} gün). Bu rota vize ihlaline yol açabilir; lütfen durak sürelerini kısaltın.`,
                  `Your planned route exceeds the 90-day threshold across rolling 180-day periods when evaluated with prior trips (Peak: ${routeSummary.schengenAnalysis.peak180Days} days). This may trigger visa violations; consider shortening stays.`,
                  `Ihre geplante Route überschreitet zusammen mit früheren Reisen das 90-Tage-Limit in einem rollierenden 180-Tage-Zeitraum (Spitze: ${routeSummary.schengenAnalysis.peak180Days} Tage). Dies kann zu Visumsverstößen führen.`
                )}
              </div>
            </div>
          )}

          {/* Tax Residency Assessment Alerts */}
          {routeAnalysisResult.routeAnalysis.taxResidencyAlerts.length > 0 && (
            <div className="space-y-2">
              {routeAnalysisResult.routeAnalysis.taxResidencyAlerts.map(tra => (
                <div
                  key={tra.countryCode}
                  className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
                    tra.status === 'safe'
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{getFlag(tra.countryCode)}</span>
                    <span className="font-bold">{getCountryName(tra.countryCode, language)}:</span>
                    <span>{tra.localizedAlert[language] || tra.localizedAlert.en || tra.localizedAlert.tr}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    {tra.status === 'safe' ? l('Güvenli', 'Safe', 'Sicher') : l('Dikkat', 'Review', 'Prüfen')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sequential Stops Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
            {l('Ardışık Duraklar & Seyahat Adımları', 'Sequential Waypoints & Journey Steps', 'Fortlaufende Zwischenstopps & Etappen')} ({stops.length})
          </h3>
          <span className="text-xs text-slate-400">
            {l('▲ ▼ Butonları ile sırayı değiştirebilirsiniz', 'Use ▲ ▼ buttons to reorder', 'Verwenden Sie ▲ ▼, um die Reihenfolge zu ändern')}
          </span>
        </div>

        {stops.length === 0 ? (
          <div className="py-14 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <Route className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              {l('Henüz durak eklemediniz.', 'No stops added yet.', 'Noch keine Stopps hinzugefügt.')}
            </p>
            <p className="text-slate-400 text-xs mt-1">
              {l(
                'Yukarıdaki formdan ülke seçip ekleyebilir veya örnek rotalardan birini yükleyebilirsiniz.',
                'Select destinations using the form above or load one of the sample itineraries.',
                'Wählen Sie oben Reiseziele aus oder laden Sie eine der Beispielrouten.'
              )}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {stops.map((stop, idx) => {
              const inIdx = dateToDayIndex(stop.entryDate);
              const outIdx = dateToDayIndex(stop.exitDate);
              const duration = Math.max(0, outIdx - inIdx + 1);
              const warnings = validateRouteStop(stop, currentPassport, stops, trips, language);
              const isSchengen = SCHENGEN_SET.has(stop.countryCode);
              const pItem = passportItemsMap.get(stop.countryCode);
              const geo = getCountryGeo(stop.countryCode);

              // Next leg transport estimate
              const nextStop = idx < stops.length - 1 ? stops[idx + 1] : null;
              const leg = nextStop ? estimateTravelLeg(stop.countryCode, nextStop.countryCode) : null;
              const stopSmartWarning = routeAnalysisResult.stopSpecificWarnings.find(sw => sw.countryCode === stop.countryCode);

              return (
                <div key={stop.id} className="space-y-2">
                  {/* Stop Card */}
                  <div
                    id={`stop-${stop.id}`}
                    onClick={() => setSelectedStopId(stop.id)}
                    className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 shadow-2xs space-y-3 transition-all ${
                      selectedStopId === stop.id
                        ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Sequence badge & Reorder controls */}
                        <div className="flex flex-col items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveStop(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                            title={l('Yukarı taşı', 'Move up', 'Nach oben verschieben')}
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleMoveStop(idx, 'down')}
                            disabled={idx === stops.length - 1}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                            title={l('Aşağı taşı', 'Move down', 'Nach unten verschieben')}
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-3xl leading-none flex-shrink-0">
                          {getFlag(stop.countryCode)}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                              {getCountryName(stop.countryCode, language)}
                            </h4>
                            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                              ({geo.capital})
                            </span>
                            {isSchengen && (
                              <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-1.5 py-0.5 rounded-md font-bold">
                                Schengen
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {formatLocalizedDate(inIdx, language)} – {formatLocalizedDate(outIdx, language)} ·{' '}
                            <b>{duration} {l('gün', 'days', 'Tage')}</b>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {pItem && (
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border ${
                              pItem.id ? CAT_INFO.id.badgeBg : CAT_INFO[pItem.cat]?.badgeBg
                            }`}
                          >
                            {getCategoryBadgeLabel(pItem, language)}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveStop(stop.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title={l('Durağı sil', 'Delete stop', 'Stopp löschen')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Warnings for this stop */}
                    {warnings.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {warnings.map((w, wIdx) => (
                          <div
                            key={wIdx}
                            className={`text-xs p-2 rounded-lg flex items-start gap-2 ${
                              w.type === 'error'
                                ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                                : w.type === 'warning'
                                ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                                : 'bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-900'
                            }`}
                          >
                            {w.type === 'error' ? (
                              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            )}
                            <span>{w.message}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* AI & Intelligence Smart Insight for Stop */}
                    {stopSmartWarning && (
                      <div className="p-3 rounded-xl text-xs bg-amber-50/90 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900/60 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded bg-amber-200/70 dark:bg-amber-900/70 text-[10px] uppercase font-extrabold text-amber-900 dark:text-amber-200">
                              {stopSmartWarning.badgeLabel[language] || stopSmartWarning.badgeLabel.en || stopSmartWarning.badgeLabel.tr}
                            </span>
                          </div>
                          <p className="leading-relaxed font-medium">
                            {stopSmartWarning.smartInsight[language] || stopSmartWarning.smartInsight.en || stopSmartWarning.smartInsight.tr}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Inter-Stop Transit Connector */}
                  {leg && (
                    <div className="flex items-center justify-center my-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-medium shadow-2xs">
                        <span>{leg.modeIcon}</span>
                        <span className="font-semibold">{leg.modeLabel}</span>
                        <span className="text-slate-400">·</span>
                        <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">~{leg.distanceKm} km</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500 font-mono">
                          ~{leg.estimatedTransitHours} {l('sa intikal', 'hrs transit', 'Std. Transit')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <form
            onSubmit={handleSaveItinerary}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 w-full max-w-md shadow-2xl space-y-4"
          >
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {l('Bu Seyahat Rotasını Kaydet', 'Save This Travel Itinerary', 'Diese Reiseroute speichern')}
            </h3>
            <p className="text-xs text-slate-500">
              {l(
                'Rotanızı cihazınızda saklayıp daha sonra tek tıkla tekrar yükleyebilirsiniz.',
                'Store your itinerary locally on your device to reload anytime.',
                'Speichern Sie Ihre Reiseroute lokal auf Ihrem Gerät, um sie jederzeit neu zu laden.'
              )}
            </p>
            <input
              type="text"
              placeholder={l(
                'Rota Adı (Örn: 2026 Yaz Balkan Turu, Avrupa Ekspresi...)',
                'Route Name (e.g., 2026 Summer Balkans Tour...)',
                'Routenname (z. B. Sommer-Balkantour 2026...)'
              )}
              value={newItineraryName}
              onChange={(e) => setNewItineraryName(e.target.value)}
              autoFocus
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100"
              >
                {l('Vazgeç', 'Cancel', 'Abbrechen')}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
              >
                {l('Kaydet', 'Save', 'Speichern')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
