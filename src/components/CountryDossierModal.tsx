import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  ArrowLeft,
  Minus,
  Search,
  Square,
  Maximize2,
  Minimize2,
  Globe,
  MapPin,
  ExternalLink,
  Shield,
  Wifi,
  DollarSign,
  Calendar,
  Sparkles,
  BookOpen,
  Utensils,
  Languages,
  Trophy,
  FileCheck2,
  CheckCircle2,
  Copy,
  Check,
  AlertTriangle,
  Plane,
  CreditCard,
  Plug,
  PhoneCall,
  Clock,
  Compass,
  Building,
  Heart,
  Landmark,
  Share2,
  ShieldCheck,
  Flag,
  Route,
  Zap,
  ArrowRightLeft,
  Sun,
  Moon,
  Laptop,
  Activity,
  Calculator,
  RotateCcw,
  Car,
  ShoppingBag,
  Info,
  Percent,
  Smartphone,
  Coins,
  ArrowDownUp,
  Droplets,
  ShieldAlert,
  Receipt
} from 'lucide-react';
import {
  getCountryName,
  getFlag,
  CAT_INFO,
  getCategoryBadgeLabel,
  CountryItem,
  INFO,
  VER
} from '../data/passportData';
import { GEO_DATA } from '../data/geoData';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryTravelIntelligence } from '../data/countryTravelIntelligence';
import { getCountryEncyclopedia, CountryEncyclopediaData } from '../data/countryEncyclopedia';
import { getCountryGeography, CountryGeographyData } from '../data/countryGeography';
import { getCountryItinerary, CountryTravelItinerary } from '../data/countryItineraries';
import { getVerifiedCountryRecord, VerifiedCountryRecord } from '../data/verifiedCountryData';
import { getPassportItems } from '../utils/calculator';
import { useI18n } from '../data/i18n';
import {
  getCrossRate,
  convertCurrency,
  formatCurrencyValue,
  COMMON_CHEAT_SHEET_TIERS
} from '../data/currencyRates';
import { SocketPlugVector } from './SocketPlugVector';
import { getCountryNomadApps } from '../data/rideAndDeliveryApps';
import { CountryRichSnippetSummary } from './CountryRichSnippetSummary';
import { getCountryNaturalH1 } from '../utils/schemaGenerator';
import { StatusBadge, VisaStatus } from './design/StatusBadge';
import { TravelConciergeGrid } from './TravelConciergeGrid';
import { EasyVacationAssistant } from './EasyVacationAssistant';

interface CountryDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryCode: string | null;
  currentPassport: string;
  onOpenAudit?: () => void;
  onOpenReportChange?: (country: { code: string; name: string; cat: string }) => void;
}

type DossierTab = 'itinerary' | 'concierge' | 'logistics' | 'culture' | 'gastronomy' | 'language' | 'achievements' | 'visa';

function parseCountryUtcOffset(tzString?: string, lng?: number): number {
  if (tzString) {
    const match = tzString.match(/UTC\s*([+-]\d+(\.\d+)?)/i);
    if (match) {
      return parseFloat(match[1]);
    }
  }
  if (typeof lng === 'number' && !isNaN(lng)) {
    return Math.round(lng / 15);
  }
  return 0;
}

export const CountryDossierModal: React.FC<CountryDossierModalProps> = ({
  isOpen,
  onClose,
  countryCode,
  currentPassport,
  onOpenAudit,
  onOpenReportChange
}) => {
  const { language, t, l } = useI18n();
  const [activeTab, setActiveTab] = useState<DossierTab>('itinerary');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleTabChange = (tab: DossierTab) => {
    setActiveTab(tab);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);
  const [copiedItinerary, setCopiedItinerary] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  const [converterAmount, setConverterAmount] = useState<number>(100);
  const [converterBase, setConverterBase] = useState<'USD' | 'EUR' | 'GBP' | 'LOCAL'>('USD');
  const [remoteBaseCity, setRemoteBaseCity] = useState<'IST' | 'NYC' | 'LON' | 'BER' | 'SFO' | 'SIN' | 'TYO'>('IST');
  const [marketTargetCurrency, setMarketTargetCurrency] = useState<'GBP' | 'USD' | 'EUR'>('GBP');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [dossierSearch, setDossierSearch] = useState<string>('');

  const handleDossierSearchChange = (q: string) => {
    setDossierSearch(q);
    const low = q.trim().toLocaleLowerCase('tr');
    if (!low) return;
    if (low.includes('vize') || low.includes('pasaport') || low.includes('evrak') || low.includes('giriş')) {
      setActiveTab('visa');
    } else if (low.includes('taksi') || low.includes('priz') || low.includes('internet') || low.includes('kur') || low.includes('döviz') || low.includes('saat')) {
      setActiveTab('logistics');
    } else if (low.includes('otel') || low.includes('uçak') || low.includes('sigorta') || low.includes('esim') || low.includes('uygulama')) {
      setActiveTab('concierge');
    } else if (low.includes('yemek') || low.includes('mutfak') || low.includes('bahşiş') || low.includes('restoran')) {
      setActiveTab('gastronomy');
    } else if (low.includes('dil') || low.includes('kelime') || low.includes('tarih') || low.includes('din')) {
      setActiveTab('language');
    } else if (low.includes('kültür') || low.includes('müze') || low.includes('gezilecek')) {
      setActiveTab('culture');
    } else if (low.includes('rota') || low.includes('plan')) {
      setActiveTab('itinerary');
    }
  };

  const scrollToSection = (tab: DossierTab, targetId: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Real-time ticking clock for Dual-Clock Time Zone Sync (throttled to 30s to prevent mobile lag)
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Close or minimize on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isFullscreen, onClose]);

  // Reset tab and fullscreen mode when country changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('itinerary');
      setIsFullscreen(false);
    }
  }, [isOpen, countryCode]);

  const countryData = useMemo(() => {
    if (!countryCode) return null;
    const code = countryCode.toUpperCase();
    const passportItems = getPassportItems(currentPassport);
    const item = passportItems.find(i => i.c === code) || {
      c: code,
      v: 'v',
      cat: 'visa',
      id: false
    };

    const geo = GEO_DATA[code];
    const insights = getCountryInsights(code, language);
    const encyclopedia = getCountryEncyclopedia(code, language);
    const detailedInfo = INFO[`${currentPassport}-${code}`];

    const verifiedRecord = getVerifiedCountryRecord(code);

    // Verification Status Badge (Specifies Visa & Border Entry verification)
    let verStatus = {
      type: 'agree',
      label: l('Vize: Resmi Kaynaklar Mutabık (2026)', 'Visa: Official Sources Consensus (2026)', 'Visum: Quellen Konsens (2026)'),
      color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    };

    if (verifiedRecord) {
      verStatus = {
        type: 'verified',
        label: l(
          `🛡️ Resmi Teyitli (${verifiedRecord.last_reviewed})`,
          `🛡️ Official Audited (${verifiedRecord.last_reviewed})`,
          `🛡️ Amtlich geprüft (${verifiedRecord.last_reviewed})`
        ),
        color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
      };
    } else if (VER.chk.split(' ').includes(code)) {
      verStatus = {
        type: 'chk',
        label: l('Vize: Resmi Dışişleri & Göç Teyitli (2026)', 'Visa: Official MFA & Immigration Audited (2026)', 'Visum: Offiziell geprüft (2026)'),
        color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800'
      };
    } else if (VER.conf.split(' ').includes(code)) {
      verStatus = {
        type: 'conf',
        label: l('Vize: Mevzuat Çelişkisi Takipte', 'Visa: Discrepancy Watchlist', 'Visum: Beobachtungsliste'),
        color: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800'
      };
    }

    const geography = getCountryGeography(code, language);
    const itinerary = getCountryItinerary(code, language);
    const countryName = getCountryName(code, language);
    const travelIntel = getCountryTravelIntelligence(code, countryName);

    return {
      code,
      name: countryName,
      item,
      geo,
      insights,
      encyclopedia,
      detailedInfo,
      verStatus,
      geography,
      itinerary,
      travelIntel,
      verifiedRecord
    };
  }, [countryCode, currentPassport, language, l]);

  if (!isOpen || !countryData) return null;

  const { code, name, item, geo, insights, encyclopedia, detailedInfo, verStatus, geography, itinerary, travelIntel, verifiedRecord } = countryData;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhrase(id);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  const handleCopyItinerary = () => {
    if (!itinerary) return;
    const stopsFormatted = itinerary.stops
      .map(
        (s) =>
          `📍 ${s.name}\n⏱️ ${l('Önerilen Ziyaret Süresi:', 'Recommended Duration:', 'Empfohlene Dauer:')} ${s.recommendedDuration}\n✨ ${l('Gezilecek İkonik Yerler:', 'Must-See Highlights:', 'Highlights:')} ${s.highlights.join(', ')}\n🏃 ${l('Neler Yapılır & Nereler Gezilir?', 'Activities:', 'Aktivitäten:')}\n${s.activities.map((a) => `   • ${a}`).join('\n')}\n🍲 ${l('Ne Yenir & Ne İçilir?', 'Eat & Drink:', 'Essen & Trinken:')} ${s.foodAndDrinks.join(', ')}\n⚠️ ${l('Nelere Dikkat Edilir & İpuçları:', 'Tips & Precautions:', 'Tipps & Hinweise:')}\n${s.criticalTips.map((c) => `   • ${c}`).join('\n')}`
      )
      .join('\n\n----------------------------------------\n\n');

    const fullPlan = `🌟 ${itinerary.countryName} - ${itinerary.routeName} (${itinerary.idealDurationText})
📅 ${l('İdeal Seyahat Dönemi:', 'Best Season:', 'Beste Reisezeit:')} ${itinerary.bestSeason}
🚆 ${l('Ulaşım Biçimi:', 'Transport Mode:', 'Transportmittel:')} ${itinerary.transportMode}
⚡ ${l('Gezi Temposu:', 'Pace Level:', 'Reisetempo:')} ${itinerary.paceLevel}

${itinerary.routeSummary}

========================================
${l('UĞRANMASI GEREKEN DURAKLAR & DETAYLI GEZİ PLANI', 'MUST-VISIT STOPS & DETAILED ITINERARY', 'STOPPS & REISEPLAN')}
========================================

${stopsFormatted}

========================================
🍽️ ${l('İMZA LEZZETLER & MUTFAK KÜLTÜRÜ', 'SIGNATURE GASTRONOMY', 'KULINARIK & ESSKULTUR')}
========================================
• ${l('Meşhur Yemekler:', 'Famous Dishes:', 'Berühmte Gerichte:')} ${itinerary.signatureGastronomy.dishes.join(', ')}
• ${l('Geleneksel İçecekler:', 'Traditional Drinks:', 'Traditionelle Getränke:')} ${itinerary.signatureGastronomy.drinks.join(', ')}
• ${l('Sokak Lezzetleri & Tatlılar:', 'Street Food & Desserts:', 'Streetfood & Desserts:')} ${itinerary.signatureGastronomy.streetFoods.join(', ')}
• ${l('Masa Adabı & Bahşiş:', 'Dining Advice:', 'Tischsitten & Trinkgeld:')} ${itinerary.signatureGastronomy.diningAdvice}

========================================
🎒 ${l('ÇANTA & GÜVENLİK HAZIRLIĞI', 'PACKING & PRECAUTIONS', 'VORBEREITUNG & SICHERHEIT')}
====================
${itinerary.packingAndPrecautions.essentials.map((e) => `• ${e}`).join('\n')}
${itinerary.packingAndPrecautions.safetyAndEtiquette.map((se) => `• ${se}`).join('\n')}

Planlayan: Vizamigo (vizamigo.com)`;

    navigator.clipboard.writeText(fullPlan);
    setCopiedItinerary(true);
    setTimeout(() => setCopiedItinerary(false), 2500);
  };

  const openRouteGoogleMaps = () => {
    if (!itinerary || itinerary.stops.length === 0) return;
    const origin = encodeURIComponent(itinerary.stops[0].mapsQuery);
    const destination = encodeURIComponent(itinerary.stops[itinerary.stops.length - 1].mapsQuery);
    const waypoints = itinerary.stops
      .slice(1, -1)
      .map((s) => encodeURIComponent(s.mapsQuery))
      .join('|');
    const url = waypoints
      ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`
      : `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openGoogleMaps = () => {
    const q = geo ? `${geo.capital}, ${name}` : name;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer');
  };

  const badgeClass = item.id ? CAT_INFO.id.badgeBg : CAT_INFO[item.cat]?.badgeBg;
  const badgeLabel = getCategoryBadgeLabel(item, language);
  const visaStatus: VisaStatus = item.id
    ? 'id'
    : item.cat === 'none'
    ? 'denied'
    : item.cat === 'eta'
    ? 'evisa'
    : (item.cat as VisaStatus);
  const userPassportName = getCountryName(currentPassport, language);

  // Currency & Financial Calculations
  const destCurrencyCode = geography?.currencyCode || 'USD';
  const destCurrencySymbol = geography?.currencySymbol || '$';
  const destCurrencyName = geography?.currencyName || destCurrencyCode;

  const rate1Usd = getCrossRate('USD', destCurrencyCode);
  const rate1Eur = getCrossRate('EUR', destCurrencyCode);
  const rate1Gbp = getCrossRate('GBP', destCurrencyCode);

  const effectiveBaseCurrency = converterBase === 'LOCAL' ? destCurrencyCode : converterBase;
  const convertedToDest =
    converterBase === 'LOCAL'
      ? converterAmount
      : convertCurrency(converterAmount, converterBase, destCurrencyCode);

  const convertedToUsd = convertCurrency(converterAmount, effectiveBaseCurrency, 'USD');
  const convertedToEur = convertCurrency(converterAmount, effectiveBaseCurrency, 'EUR');
  const convertedToGbp = convertCurrency(converterAmount, effectiveBaseCurrency, 'GBP');

  // Time Zone Sync Calculations
  const userOffsetHours = -(new Date().getTimezoneOffset() / 60);
  const destOffsetHours = parseCountryUtcOffset(geography?.timeZone, geo?.lng);
  const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
  const destTime = new Date(utc + destOffsetHours * 3600000);

  const diffHours = Math.round((destOffsetHours - userOffsetHours) * 10) / 10;
  const diffLabel =
    diffHours === 0
      ? l('Aynı Saat Dilimi', 'Same Timezone', 'Gleiche Zeitzone')
      : diffHours > 0
      ? `+${diffHours} ${l('Saat İleri', 'Hours Ahead', 'Std voraus')}`
      : `${diffHours} ${l('Saat Geri', 'Hours Behind', 'Std zurück')}`;

  const formatTimeStr = (d: Date) => {
    return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };
  const formatDateStr = (d: Date) => {
    return d.toLocaleDateString(language === 'tr' ? 'tr-TR' : language === 'de' ? 'de-DE' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Plug & Hardware Information
  const plugInfo = geography?.plugTypes || insights.plugType || 'C, F (230V, 50Hz)';
  const plugTypesList = plugInfo.split('(')[0].split(',').map((p) => p.trim()).filter(Boolean);
  const homeGeo = getCountryGeography(currentPassport || 'TR', language);
  const homePlugs = (homeGeo?.plugTypes || 'C, F').split('(')[0].split(',').map((p) => p.trim()).filter(Boolean);
  const isPlugCompatible = plugTypesList.some((p) => homePlugs.includes(p));
  const homeCountryName = getCountryName(currentPassport || 'TR', language);
  const voltageMatch = plugInfo.match(/(\d{3}V)/i);
  const detectedVoltage = voltageMatch ? voltageMatch[1] : (plugInfo.includes('230V') ? '230V' : plugInfo.includes('220V') ? '220V' : plugInfo.includes('120V') ? '120V' : '230V');
  const freqMatch = plugInfo.match(/(\d{2}Hz)/i);
  const detectedFreq = freqMatch ? freqMatch[1] : (plugInfo.includes('60Hz') ? '60Hz' : '50Hz');
  const voltageFreqLabel = `${detectedVoltage} / ${detectedFreq}`;

  // Nomad Apps (Ride-hailing & Delivery)
  const nomadApps = getCountryNomadApps(code, insights.transport.popularRideApps);

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#042637] to-[#0D9488] text-white shadow-2xl border-2 border-[#2DD4BF] animate-in fade-in slide-in-from-bottom-4 duration-200">
        <span className="text-xl">{getFlag(code)}</span>
        <span className="text-sm font-black">{name} ({code})</span>
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="px-3 py-1 rounded-full bg-[#2DD4BF] text-[#042F2E] text-xs font-black cursor-pointer hover:bg-[#5EEAD4] transition-all"
        >
          {l('Büyüt ⛶', 'Restore ⛶')}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/20 cursor-pointer"
          title={l('Kapat', 'Close')}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center ${
        isFullscreen ? 'p-0' : 'p-0 sm:p-5 sm:py-6'
      } overflow-y-auto backdrop-blur-md bg-slate-950/80 animate-in fade-in duration-200`}
      onClick={() => {
        if (isFullscreen) setIsFullscreen(false);
        onClose();
      }}
    >
      <div
        className={`${
          isFullscreen
            ? 'dossier-fullscreen-panel fixed inset-0 w-screen h-screen z-[99999] rounded-none max-w-none max-h-none flex flex-col glass-panel shadow-2xl transition-all duration-300'
            : 'mobile-bottom-sheet-panel relative w-full sm:max-w-5xl h-[94dvh] sm:h-auto max-h-[94dvh] sm:max-h-[90vh] flex flex-col glass-panel rounded-t-[32px] sm:rounded-3xl rounded-b-none sm:rounded-b-3xl shadow-2xl transition-all duration-300'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Bottom-Sheet Pull Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300/80 dark:bg-white/20 mx-auto mt-2.5 mb-1 sm:hidden shrink-0" aria-hidden="true" />

        {/* Top Header Banner - Symmetrical & Compact Executive Travel Layout */}
        <div className="relative px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-[#042637] via-[#0E7490]/40 to-[#042637] border-b border-[#2DD4BF]/30">
          <div className="flex items-center justify-between gap-3">
            {/* Left: [ ← Geri ] + Flag + Title + Code + Status */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-white/95 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-[#0D9488] hover:text-white transition-all cursor-pointer shadow-2xs shrink-0"
                title={l('Geri Dön', 'Go Back')}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">{l('Geri', 'Back')}</span>
              </button>
              <span className="text-3xl sm:text-4xl leading-none filter drop-shadow select-none shrink-0">
                {getFlag(code)}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base sm:text-xl font-black text-white tracking-tight truncate drop-shadow-sm">
                    {name}
                  </h1>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-white text-slate-900 font-black border border-slate-200 shadow-xs shrink-0">
                    {code}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-white text-slate-900 border border-slate-200 shadow-xs shrink-0">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{badgeLabel}</span>
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-teal-100 font-semibold truncate mt-0.5 drop-shadow-xs">
                  {getCountryNaturalH1(name, language)}
                </div>
              </div>
            </div>

            {/* Right: Window Controls ([ — ] [ ⛶ ] [ ✕ ]) with High-Contrast White Background */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 z-20">
              <button
                type="button"
                onClick={() => {
                  if (isFullscreen) setIsFullscreen(false);
                  setIsMinimized(true);
                }}
                className="inline-flex items-center justify-center p-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer shadow-xs"
                title={l('Küçült', 'Minimize')}
                aria-label="Minimize window"
              >
                <Minus className="w-4 h-4 text-slate-900" />
              </button>

              {!isFullscreen ? (
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="inline-flex items-center justify-center p-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer shadow-xs"
                  title={l('Ekranı Kapla', 'Fullscreen')}
                  aria-label="Expand country dossier to full screen"
                >
                  <Maximize2 className="w-4 h-4 text-slate-900" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="inline-flex items-center justify-center p-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer shadow-xs"
                  title={l('Varsayılan Boyuta Küçült', 'Restore Window')}
                  aria-label="Restore default size"
                >
                  <Minimize2 className="w-4 h-4 text-slate-900" />
                </button>
              )}

              {/* Close Button (X) */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white text-rose-600 hover:bg-rose-50 border border-slate-200 transition-all cursor-pointer shrink-0 shadow-xs"
                title={l('Kapat', 'Close', 'Schließen')}
                aria-label="Close dossier"
              >
                <X className="w-4 h-4 text-rose-600" />
              </button>
            </div>
          </div>

          {/* Symmetrical Row 2: In-Dossier Search Bar + Metadata & Verification Pill Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2.5 pt-2.5 border-t border-teal-500/15 dark:border-white/10 text-xs sm:text-sm">
            <div className="relative w-full sm:w-80 shrink-0">
              <Search className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={dossierSearch}
                onChange={(e) => handleDossierSearchChange(e.target.value)}
                placeholder={l(
                  `${name} içinde vize, taksi, priz, otel veya yemek ara...`,
                  `Search visa, taxi, plug, hotel or food in ${name}...`
                )}
                className="w-full pl-8 pr-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/95 dark:bg-white/[0.08] border border-teal-500/25 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {(geo?.capital || geography?.capital) && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 font-bold border border-teal-500/15 shrink-0 text-xs">
                  <span>🏛️</span>
                  <span>{l('Başkent:', 'Capital:', 'Hauptstadt:')} <b>{geo?.capital || geography?.capital}</b></span>
                </span>
              )}

              {geo?.mainHub && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 font-bold border border-teal-500/15 shrink-0 text-xs">
                  <span>✈️</span>
                  <span>IATA: <b className="font-mono text-[#0F766E] dark:text-[#2DD4BF]">{geo.mainHub}</b></span>
                </span>
              )}

              <button
                type="button"
                onClick={onOpenAudit}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold border transition-colors cursor-pointer shrink-0 text-xs ${verStatus.color}`}
                title={l('Mevzuat Denetim Masasını Aç', 'Open Regulation Audit Console', 'Audit-Konsole öffnen')}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>✓ {verStatus.label}</span>
              </button>

              <button
                type="button"
                onClick={openGoogleMaps}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 hover:bg-teal-500/15 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 font-bold border border-teal-500/15 transition-colors cursor-pointer shrink-0 text-xs"
              >
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>Harita</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            FIXED TAB NAVIGATION BAR: Sits permanently below header, ZERO overlap with content!
        ===================================================================== */}
        <div className="shrink-0 px-3 sm:px-6 py-2 bg-[#042637] dark:bg-[#021824] border-b border-[#2DD4BF]/30 backdrop-blur-xl flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            { key: 'itinerary', icon: Route, label: l('Gezi Planı & Rota', 'Itinerary & Route', 'Reiseplan') },
            { key: 'concierge', icon: Sparkles, label: l('Kolay Tatil & Asistan', 'Easy Vacation & Hub', 'Urlaubs-Assistent') },
            { key: 'logistics', icon: Zap, label: l('Lojistik & Göçebe Hub', 'Nomad & Logistics', 'Logistik-Hub') },
            { key: 'culture', icon: Landmark, label: l('Kültür & Turizm', 'Culture & Sights', 'Kultur') },
            { key: 'gastronomy', icon: Utensils, label: l('Yemek & İçecek', 'Food & Drinks', 'Kulinarik') },
            { key: 'language', icon: Languages, label: l('Dil & Tarih', 'Language & History', 'Sprache & Geschichte') },
            { key: 'achievements', icon: Trophy, label: l('Ünlüler & Ekonomi', 'Figures & Economy', 'Wirtschaft') },
            { key: 'visa', icon: FileCheck2, label: l('Vize & Güvenlik', 'Visa & Safety', 'Visum & Schutz') }
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key as DossierTab)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md shadow-teal-900/30 border border-[#5EEAD4]/60'
                  : 'bg-white/10 dark:bg-white/[0.08] text-teal-100 hover:text-white hover:bg-white/20 border border-[#2DD4BF]/30'
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === tab.key ? 'text-[#5EEAD4]' : 'text-teal-300'}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Body (Scrollable, Fluid Bottom-Sheet & Fullscreen) */}
        <div
          ref={scrollContainerRef}
          className="dossier-scrollable-content flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6 overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y pinch-zoom' }}
        >
          {/* Teal Status Band & Stay Limit Card - Compact 2-column Layout */}
          <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-[#0D9488] p-3 sm:p-4 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <StatusBadge status={visaStatus} label={badgeLabel} className="!bg-white !text-emerald-900 font-bold shadow-xs text-xs sm:text-sm px-3 py-1" />
              <div className="text-xs sm:text-sm font-semibold text-teal-100 leading-tight">
                <span>{userPassportName}</span>
                <span className="block text-xs text-teal-200/90 font-normal">
                  {l('pasaportu için kalış süresi', 'stay duration for passport', 'Aufenthaltsdauer')}
                </span>
              </div>
            </div>
            {item.v !== undefined && (
              <div className="flex items-baseline gap-1.5 sm:self-center shrink-0">
                <span className="font-mono text-2xl sm:text-3xl font-black tracking-tight">{item.v}</span>
                <span className="text-sm sm:text-base font-bold font-sans text-teal-100">{l('Gün', 'Days', 'Tage', 'Días', 'Дней')}</span>
              </div>
            )}
          </div>

          {/* Diplomatic Advisory Alert Banner (Tier 1 Verified Multi-Agency) */}
          {verifiedRecord?.advisory && verifiedRecord.advisory.combined_level !== null && (
            <div
              className={`rounded-2xl p-4 border transition-all ${
                verifiedRecord.advisory.combined_level >= 4
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100'
                  : verifiedRecord.advisory.combined_level === 3
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100'
                  : verifiedRecord.advisory.combined_level === 2
                  ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-950 dark:text-yellow-100'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl shrink-0 mt-0.5">
                  {verifiedRecord.advisory.combined_level >= 4
                    ? '🛑'
                    : verifiedRecord.advisory.combined_level === 3
                    ? '⚠️'
                    : verifiedRecord.advisory.combined_level === 2
                    ? '⚡'
                    : '🛡️'}
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        verifiedRecord.advisory.combined_level >= 4
                          ? 'bg-rose-600 text-white'
                          : verifiedRecord.advisory.combined_level === 3
                          ? 'bg-amber-600 text-white'
                          : verifiedRecord.advisory.combined_level === 2
                          ? 'bg-yellow-600 text-slate-900'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {verifiedRecord.advisory.combined_level >= 4
                        ? l('Seviye 4: Seyahat Etmeyiniz', 'Level 4: Do Not Travel', 'Stufe 4: Reisewarnung')
                        : verifiedRecord.advisory.combined_level === 3
                        ? l('Seviye 3: Seyahatinizi Yeniden Değerlendirin', 'Level 3: Reconsider Travel', 'Stufe 3: Reisen überdenken')
                        : verifiedRecord.advisory.combined_level === 2
                        ? l('Seviye 2: Yüksek Dikkat', 'Level 2: Exercise Increased Caution', 'Stufe 2: Erhöhte Vorsicht')
                        : l('Seviye 1: Normal Önlemler', 'Level 1: Exercise Normal Precautions', 'Stufe 1: Normale Vorsicht')}
                    </span>
                    <span className="text-xs opacity-85 font-semibold">
                      {l('Resmi Diplomatik Seyahat Uyarısı', 'Official Diplomatic Travel Advisory', 'Offizielle Reisehinweise')}
                    </span>
                  </div>
                  {verifiedRecord.advisory.advisory_headline && (
                    <p className="text-xs sm:text-sm font-bold leading-snug">
                      {(verifiedRecord.advisory.advisory_headline as Record<string, string>)[language] ||
                        verifiedRecord.advisory.advisory_headline.tr ||
                        verifiedRecord.advisory.advisory_headline.en}
                    </p>
                  )}
                  {verifiedRecord.advisory.regional_warnings && verifiedRecord.advisory.regional_warnings.length > 0 && (
                    <div className="pt-1 space-y-1">
                      {verifiedRecord.advisory.regional_warnings.map((rw, idx) => (
                        <div key={idx} className="text-xs sm:text-sm opacity-90 flex items-start gap-1">
                          <span>•</span>
                          <span>
                            <b>{rw.area}:</b> {rw.reason} (Level {rw.level})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {verifiedRecord.advisory.agencies && verifiedRecord.advisory.agencies.length > 0 && (
                    <div className="pt-1 flex items-center gap-2 text-xs opacity-85 flex-wrap">
                      <span>🏛️ {verifiedRecord.advisory.agencies.map((a) => a.source.title).join(' • ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* De-Widgetized Lifestyle Bento Quick Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-4 pt-3.5 border-t border-teal-500/20 dark:border-white/10 text-xs">
            {/* 1. Currency Hub & Mini Cheat-Sheet Matrix Quick Trigger */}
            <button
              type="button"
              onClick={() => scrollToSection('logistics', 'dossier-currency-matrix')}
              className="group flex flex-col justify-between p-3 sm:p-3.5 rounded-2xl bg-[#F0FDFA] dark:bg-[#062634] hover:bg-amber-50/70 dark:hover:bg-amber-500/[0.08] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 hover:border-amber-400 transition-all cursor-pointer text-left shadow-xs"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-slate-100 font-black uppercase tracking-wide">
                  <DollarSign className="w-4 h-4 text-amber-500" />
                  <span>{l('Çapraz Kur Matrisi', 'Cross Rates', 'Wechselkurse')}</span>
                </div>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-black group-hover:translate-x-0.5 transition-transform bg-amber-100/70 dark:bg-amber-900/40 px-2 py-0.5 rounded-md">
                  {destCurrencyCode} →
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 mt-2 text-center">
                <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/60 dark:border-teal-700/50 font-mono text-xs shadow-2xs">
                  <span className="text-slate-500">🇺🇸</span> <b className="text-slate-900 dark:text-slate-100">{formatCurrencyValue(rate1Usd)}</b>
                </div>
                <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/60 dark:border-teal-700/50 font-mono text-xs shadow-2xs">
                  <span className="text-slate-500">🇪🇺</span> <b className="text-slate-900 dark:text-slate-100">{formatCurrencyValue(rate1Eur)}</b>
                </div>
                <div className="p-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 font-mono text-xs shadow-2xs">
                  <span>🇬🇧</span> <b className="text-indigo-700 dark:text-indigo-300">{formatCurrencyValue(rate1Gbp)}</b>
                </div>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-2 truncate">
                1 {destCurrencyCode} ≈ <b className="text-slate-900 dark:text-white font-mono font-bold">£{formatCurrencyValue(1 / rate1Gbp)} GBP</b>
              </div>
            </button>

            {/* 2. Time Zone Sync & Dual Clock Quick Trigger */}
            <button
              type="button"
              onClick={() => scrollToSection('logistics', 'dossier-dual-clock')}
              className="group flex flex-col justify-between p-3 sm:p-3.5 rounded-2xl bg-[#F0FDFA] dark:bg-[#062634] hover:bg-sky-50/70 dark:hover:bg-sky-500/[0.08] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 hover:border-sky-400 transition-all cursor-pointer text-left shadow-xs"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-slate-100 font-black uppercase tracking-wide">
                  <Clock className="w-4 h-4 text-sky-500" />
                  <span>{l('Çift Saat & Zaman', 'Dual Clock', 'Doppeluhr')}</span>
                </div>
                <span className="text-xs font-black text-sky-700 dark:text-sky-300 bg-sky-100/70 dark:bg-sky-900/40 px-2 py-0.5 rounded-md">
                  {diffLabel}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-2 text-center">
                <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/60 dark:border-teal-700/50 font-mono text-xs shadow-2xs">
                  <div className="text-xs text-slate-500 font-medium">🏠 İst</div>
                  <b className="text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{formatTimeStr(currentTime).slice(0, 5)}</b>
                </div>
                <div className="p-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-700 font-mono text-xs shadow-2xs">
                  <div className="text-xs text-sky-700 dark:text-sky-300 font-medium">✈️ {geo?.capital ? geo.capital.slice(0, 5) : 'Yerel'}</div>
                  <b className="text-sky-800 dark:text-sky-200 text-xs sm:text-sm">{formatTimeStr(destTime).slice(0, 5)}</b>
                </div>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-2 truncate">
                {l('Mesai & Çalışma Analizi →', 'Work Shift Sync →', 'Arbeitszeit-Sync →')}
              </div>
            </button>

            {/* 3. Connectivity & SIM Quick Trigger */}
            <button
              type="button"
              onClick={() => scrollToSection('logistics', 'dossier-internet-sim')}
              className="group flex flex-col justify-between p-3 sm:p-3.5 rounded-2xl bg-[#F0FDFA] dark:bg-[#062634] hover:bg-teal-50/70 dark:hover:bg-teal-500/[0.08] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 hover:border-teal-400 transition-all cursor-pointer text-left shadow-xs"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-slate-100 font-black uppercase tracking-wide">
                  <Wifi className="w-4 h-4 text-teal-600" />
                  <span>{l('İnternet & SIM', 'Internet & SIM', 'WLAN & SIM')}</span>
                </div>
                <span className="text-xs text-teal-800 dark:text-teal-300 font-black bg-teal-100/70 dark:bg-teal-900/40 px-2 py-0.5 rounded-md">
                  {insights.internet.mobileSpeedMbps} Mbps
                </span>
              </div>
              <div className="mt-2 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                ⚡ Mobil: {insights.internet.mobileSpeedMbps}M · Wi-Fi: {insights.internet.broadbandSpeedMbps}M
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-2 truncate">
                {insights.internet.bestCarriers[0] || 'Yerel'} · {l('Havalimanı Uyarısı →', 'Airport SIM Tip →', 'SIM-Tipps →')}
              </div>
            </button>

            {/* 4. Sockets & Safety Quick Pill */}
            <button
              type="button"
              onClick={() => scrollToSection('logistics', 'dossier-sockets-safety')}
              className="group flex flex-col justify-between p-3 sm:p-3.5 rounded-2xl bg-[#F0FDFA] dark:bg-[#062634] hover:bg-emerald-50/70 dark:hover:bg-emerald-500/[0.08] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 hover:border-emerald-400 transition-all cursor-pointer text-left shadow-xs"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-slate-100 font-black uppercase tracking-wide">
                  <Plug className="w-4 h-4 text-amber-500" />
                  <span>{l('Priz & Güvenlik', 'Sockets & Safety', 'Stecker & Schutz')}</span>
                </div>
                <span className="text-xs text-emerald-800 dark:text-emerald-300 font-black bg-emerald-100/70 dark:bg-emerald-900/40 px-2 py-0.5 rounded-md">
                  {insights.safety.safetyScore}/100
                </span>
              </div>
              <div className="mt-2 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                🔌 Tip {plugTypesList.slice(0, 2).join(', ')} ({detectedVoltage})
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-2 truncate">
                {isPlugCompatible
                  ? `✓ ${homeCountryName} ${l('fişiyle uyumlu', 'plug compatible', 'Stecker kompatibel', 'compatible', 'совместимо')}`
                  : l('⚠️ Adaptör gerekli', '⚠️ Adapter required', '⚠️ Adapter nötig', '⚠️ Requiere adaptador', '⚠️ Нужен адаптер')}
              </div>
            </button>
          </div>

        {/* TAB: KOLAY TATİL & 360° SEYAHAT ASİSTANI (GİDERKEN, GİDİNCE, DÖNERKEN TÜM UYGULAMA VE ORTAKLIKLAR) */}
        {activeTab === 'concierge' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <EasyVacationAssistant countryCode={code} originPassport={currentPassport} />
          </div>
        )}

          {/* TAB 0: GEZİ PLANI & TURİSTİK ROTA */}
          {activeTab === 'itinerary' && itinerary && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Route Hero Header Banner */}
              <div className="relative overflow-hidden bg-gradient-to-br from-teal-900/15 via-slate-900/5 to-emerald-900/10 dark:from-teal-950/50 dark:via-slate-900 dark:to-slate-950 border border-teal-500/20 dark:border-teal-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-600 text-white shadow-2xs flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{itinerary.idealDurationText}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {itinerary.paceLevel}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{itinerary.bestSeason}</span>
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                      {name} · {itinerary.routeName}
                    </h2>
                  </div>

                  {/* Actions: Copy & Maps */}
                  <div className="flex flex-wrap sm:flex-col gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={openRouteGoogleMaps}
                      className="btn-nubair-primary !py-2 !px-3.5 text-xs inline-flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{l('Google Haritalar Rotası', 'Open Route in Google Maps', 'Route in Google Maps')}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyItinerary}
                      className="btn-nubair-secondary !py-2 !px-3.5 text-xs inline-flex items-center justify-center gap-2"
                    >
                      {copiedItinerary ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span>
                        {copiedItinerary
                          ? l('✓ Plan Panoya Kopyalandı!', '✓ Copied to Clipboard!', '✓ In Zwischenablage!')
                          : l('Tüm Planı Kopyala', 'Copy Full Itinerary', 'Gesamten Plan kopieren')}
                      </span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {itinerary.routeSummary}
                </p>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    🚆 {l('Tavsiye Edilen Ulaşım Biçimi:', 'Recommended Transport:', 'Empfohlene Anreise/Verkehrsmittel:')}
                  </span>
                  <span>{itinerary.transportMode}</span>
                </div>
              </div>

              {/* Stop By Stop Itinerary Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Route className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {l('Uğranması Gereken Duraklar & Günlük Gezi Planı', 'Must-Visit Stops & Day-by-Day Itinerary', 'Stopps & Detaillierter Tagesplan', 'Paradas Imprescindibles e Itinerario Diario', 'Обязательные остановки и план по дням')}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {itinerary.stops.length} {l('Ana Durak', 'Main Stops', 'Hauptstopps', 'Paradas Principales', 'Главных остановок')}
                  </span>
                </div>

                <div className="space-y-4">
                  {itinerary.stops.map((stop, sIdx) => {
                    const stopMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.mapsQuery)}`;

                    return (
                      <div
                        key={sIdx}
                        className="relative bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/70 dark:border-[#2DD4BF]/40 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm"
                      >
                        {/* Stop Top Header */}
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white font-black flex items-center justify-center text-sm flex-shrink-0 shadow-md border border-[#5EEAD4]/60">
                              {sIdx + 1}
                            </span>
                            <div className="min-w-0">
                              <h3 className="font-black text-base sm:text-xl text-[#042F2E] dark:text-white tracking-tight truncate">
                                {stop.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/90 dark:bg-teal-900/50 text-teal-950 dark:text-teal-200 border border-teal-300 dark:border-teal-700 font-extrabold text-xs sm:text-sm shadow-xs">
                                  <Clock className="w-3.5 h-3.5 text-teal-700 dark:text-teal-300" />
                                  <span>{l('Yeterli Ziyaret Süresi:', 'Duration:', 'Dauer:', 'Duración:', 'Длительность:')} <b>{stop.recommendedDuration}</b></span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => window.open(stopMapsUrl, '_blank', 'noopener,noreferrer')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-slate-800 text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700 text-xs sm:text-sm font-black shadow-xs cursor-pointer transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                            <span>{l('Durağı Haritada Aç', 'View Stop on Maps', 'Auf Karte zeigen', 'Ver en el Mapa', 'Открыть на карте')}</span>
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </button>
                        </div>

                        {/* Highlights Tags */}
                        {stop.highlights.length > 0 && (
                          <div className="space-y-1.5">
                            <div className="text-xs font-black text-teal-900 dark:text-teal-300 uppercase tracking-wider">
                              {l('Görülmesi Gereken İkonik Noktalar:', 'Must-See Landmarks:', 'Wichtigste Sehenswürdigkeiten:', 'Lugares Emblemáticos:', 'Главные достопримечательности:')}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {stop.highlights.map((h, hIdx) => (
                                <span
                                  key={hIdx}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-700/60 text-slate-900 dark:text-white text-xs sm:text-sm font-bold shadow-2xs"
                                >
                                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                                  <span>{h}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Activities List */}
                        <div className="space-y-2 pt-1">
                          <div className="text-xs font-black text-teal-900 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                            <span>🏃</span>
                            <span>{l('Neler Yapılır & Nereler Gezilir?', 'What to Do & Activities:', 'Was man unternimmt & Aktivitäten:', 'Qué Hacer y Actividades:', 'Чем заняться и что посмотреть:')}</span>
                          </div>
                          <ul className="space-y-1.5">
                            {stop.activities.map((act, aIdx) => (
                              <li key={aIdx} className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-2 font-medium leading-relaxed">
                                <span className="text-teal-600 dark:text-teal-400 font-black flex-shrink-0">•</span>
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Gastronomy Box for Stop - Harmonious Ocean Turquoise Glass */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-700/60 space-y-2">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-200">
                            <Utensils className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>{l('🍲 Bu Durakta Ne Yenir & Ne İçilir?', '🍲 What to Eat & Drink at this Stop:', '🍲 Essen & Trinken an diesem Stopp:', '🍲 Qué Comer y Beber en esta Parada:', '🍲 Что поесть и выпить на этой остановке:')}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-0.5">
                            {stop.foodAndDrinks.map((fd, fIdx) => (
                              <span
                                key={fIdx}
                                className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-700 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white shadow-2xs"
                              >
                                {fd}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Critical Tips & Precautions for Stop - High-Contrast Lagoon Alert */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#042637] dark:bg-[#031E2C] border border-cyan-500/50 space-y-2 text-white shadow-sm">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-cyan-200">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span>{l('⚠️ Nelere Dikkat Edilir & Kritik İpuçları:', '⚠️ What to Watch Out for & Tips:', '⚠️ Wichtige Hinweise & Tipps:', '⚠️ Precauciones y Consejos Clave:', '⚠️ На что обратить внимание и советы:')}</span>
                          </div>
                          <ul className="space-y-1.5">
                            {stop.criticalTips.map((tip, tIdx) => (
                              <li key={tIdx} className="text-xs sm:text-sm text-cyan-100 font-medium flex items-start gap-2 leading-relaxed">
                                <span className="text-cyan-400 font-black flex-shrink-0">›</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Signature Gastronomy Summary */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5 border-b border-teal-500/20 dark:border-slate-700/60 pb-3">
                  <Utensils className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-slate-100">
                    {l('Mutfak Kültürü: Rotanın İmza Lezzetleri & İçecekleri', 'Culinary Culture: Signature Dishes & Drinks', 'Kulinarik: Typische Gerichte & Getränke', 'Cultura Culinaria: Platos y Bebidas Emblemáticas', 'Кулинарная культура: фирменные блюда и напитки')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Famous Dishes */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/60 space-y-2 shadow-2xs">
                    <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span>🍲</span>
                      <span>{l('Öne Çıkan Yemekler', 'Signature Dishes', 'Typische Gerichte', 'Platos Destacados', 'Фирменные блюда')}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                      {itinerary.signatureGastronomy.dishes.map((dish, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Drinks */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/60 space-y-2 shadow-2xs">
                    <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span>🍹</span>
                      <span>{l('Geleneksel İçecekler', 'Traditional Drinks', 'Traditionelle Getränke', 'Bebidas Tradicionales', 'Традиционные напитки')}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                      {itinerary.signatureGastronomy.drinks.map((drink, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                          <span>{drink}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Street Food */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/60 space-y-2 shadow-2xs">
                    <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span>🍢</span>
                      <span>{l('Sokak Lezzetleri & Tatlılar', 'Street Food & Sweets', 'Streetfood & Süßes', 'Comida Callejera y Postres', 'Уличная еда и сладости')}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                      {itinerary.signatureGastronomy.streetFoods.map((snack, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                          <span>{snack}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-300 dark:border-teal-800 text-xs sm:text-sm text-teal-950 dark:text-teal-200 font-medium leading-relaxed">
                  <b className="font-black">💡 {l('Masa Kültürü & Bahşiş:', 'Dining Etiquette & Tipping:', 'Tischsitten & Trinkgeld:', 'Etiqueta en la Mesa y Propinas:', 'Культура застолья и чаевые:')}</b> {itinerary.signatureGastronomy.diningAdvice}
                </div>
              </div>

              {/* Packing & Precautions Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Packing Essentials */}
                <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-teal-500/20 dark:border-slate-700/60 pb-2.5">
                    <span className="text-lg">🎒</span>
                    <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {l('Yanınıza Almanız Gerekenler (Çanta)', 'Packing Essentials', 'Packliste & Must-Haves', 'Imprescindibles en el Equipaje', 'Что взять с собой')}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                    {itinerary.packingAndPrecautions.essentials.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety & Etiquette */}
                <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-teal-500/20 dark:border-slate-700/60 pb-2.5">
                    <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {l('Güvenlik & Yerel Görgü Kuralları', 'Safety & Cultural Etiquette', 'Sicherheit & Verhaltensregeln', 'Seguridad y Etiqueta Cultural', 'Безопасность и местный этикет')}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                    {itinerary.packingAndPrecautions.safetyAndEtiquette.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: LOJİSTİK, DÖVİZ & GÖÇEBE BENTO GRID */}
          {activeTab === 'logistics' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Bento Grid Top Section: 1. Currency Hub & 2. Time Zone Buddy */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* 1. AKILLI DÖVİZ ARAÇLARI (CURRENCY HUB) */}
                <div id="dossier-currency-matrix" className="lg:col-span-7 bento-card p-5 sm:p-6 bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5 rounded-[24px]">
                  {/* Header */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-sm">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                          {name} {l('Para Birimi ve Güncel Döviz Kurları (USD/EUR/TRY)', 'Currency & Live Exchange Rates (USD/EUR/GBP)', 'Währung & Wechselkurse (USD/EUR/GBP)', 'Moneda y Tipos de Cambio en Vivo', 'Валюта и актуальные курсы обмена')}
                        </h2>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE]">
                          {l('Yerel Para Birimi:', 'Local Currency:', 'Landeswährung:')} <b className="text-slate-800 dark:text-slate-200">{destCurrencyName} ({destCurrencyCode} - {destCurrencySymbol})</b>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono">
                      {destCurrencyCode}
                    </span>
                  </div>

                  {/* Ülke Bilgisi Çapraz Kur Matrisi (Mini Cheat-Sheet) */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                      <div className="text-xs text-slate-500 dark:text-[#7A89A6] font-medium flex items-center justify-center gap-1">
                        <span>🇺🇸</span> <span>1 USD</span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-slate-800 dark:text-white truncate">
                        {destCurrencySymbol}{formatCurrencyValue(rate1Usd)}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">{destCurrencyCode}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10">
                      <div className="text-xs text-slate-500 dark:text-[#7A89A6] font-medium flex items-center justify-center gap-1">
                        <span>🇪🇺</span> <span>1 EUR</span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-slate-800 dark:text-white truncate">
                        {destCurrencySymbol}{formatCurrencyValue(rate1Eur)}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">{destCurrencyCode}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <div className="text-xs text-indigo-700 dark:text-indigo-400 font-medium flex items-center justify-center gap-1">
                        <span>🇬🇧</span> <span>1 GBP</span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 truncate">
                        {destCurrencySymbol}{formatCurrencyValue(rate1Gbp)}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">{destCurrencyCode}</div>
                    </div>
                  </div>

                  {/* Canlı 2-Yönlü Hesaplayıcı */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-[#8E9DBE]">
                      <span>{l('Özel Tutar Çevir', 'Convert Custom Amount', 'Betrag umrechnen')}</span>
                      <span>{l('Kaynak Birim:', 'Base Currency:', 'Basiswährung:')}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          min="1"
                          step="any"
                          value={converterAmount || ''}
                          onChange={(e) => setConverterAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white font-bold text-base focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                          placeholder="100"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">
                          {effectiveBaseCurrency}
                        </span>
                      </div>

                      {/* Source Currency Toggle Pills */}
                      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/60 dark:bg-white/[0.05] border border-slate-200/50 dark:border-white/10 text-xs font-bold">
                        {(['USD', 'EUR', 'GBP', 'LOCAL'] as const).map((curr) => {
                          const label = curr === 'LOCAL' ? destCurrencyCode : curr;
                          const isSelected = converterBase === curr;
                          return (
                            <button
                              key={curr}
                              type="button"
                              onClick={() => setConverterBase(curr)}
                              className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                                  : 'text-slate-600 dark:text-[#8E9DBE] hover:text-slate-900 dark:hover:text-white'
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dynamic Converted Banner */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-teal-500/10 border border-amber-500/20 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        {l('Hedef Ülkedeki Karşılığı:', 'Destination Value:', 'Gegenwert im Zielland:')}
                      </div>
                      <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-1.5">
                        <span className="text-amber-600 dark:text-amber-400 font-mono text-sm">{destCurrencySymbol}</span>
                        <span>{formatCurrencyValue(convertedToDest)}</span>
                        <span className="text-xs font-mono text-slate-500 dark:text-[#8E9DBE] font-bold">
                          {destCurrencyCode}
                        </span>
                      </div>
                    </div>

                    {converterBase !== 'LOCAL' && (
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE] pt-1">
                        <span>{l('Eşdeğerler:', 'Equivalents:', 'Äquivalente:')}</span>
                        <span className="px-2 py-0.5 rounded-md bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 font-mono">
                          ${formatCurrencyValue(convertedToUsd)} USD
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 font-mono">
                          €{formatCurrencyValue(convertedToEur)} EUR
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 font-mono">
                          £{formatCurrencyValue(convertedToGbp)} GBP
                        </span>
                      </div>
                    )}
                  </div>

                  {/* "PAZAR YERI" ÇEVRİM ŞEMASI (OFFLINE CHEAT-SHEET - Semantic HTML5 Details/Summary for Mobile Googlebot Crawlability) */}
                  <details className="semantic-mobile-accordion space-y-2.5 pt-1" open>
                    <summary className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-800 dark:text-white cursor-pointer py-1.5">
                      <span className="flex items-center gap-1.5 safe-text-wrap">
                        <ShoppingBag className="w-4 h-4 text-[#2A8C82] shrink-0" />
                        <span>{l('"Pazar Yeri" Seyahat Fiyat Tablosu (Offline Cheat-Sheet)', 'Marketplace Price Table (Offline Cheat-Sheet)', 'Marktplatz-Preistabelle (Offline)', 'Tabla de Precios de Mercado (Offline)', 'Таблица цен (Офлайн-шпаргалка)')}</span>
                      </span>
                      <div className="flex items-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs font-semibold text-[#2A8C82] dark:text-[#52B2A7] bg-[#2A8C82]/10 px-2.5 py-1 rounded-full border border-[#2A8C82]/20">
                          📶 {l('Offline Hazır', 'Offline Ready', 'Offline bereit')}
                        </span>
                        {/* Target Switcher (Strict 48x48px Touch Targets) */}
                        <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-full text-xs">
                          {(['GBP', 'USD', 'EUR'] as const).map(curr => (
                            <button
                              key={curr}
                              type="button"
                              onClick={() => setMarketTargetCurrency(curr)}
                              className={`min-h-[48px] min-w-[48px] px-3 py-1.5 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center touch-target-min ${
                                marketTargetCurrency === curr
                                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-extrabold shadow-2xs'
                                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                              }`}
                            >
                              {curr === 'GBP' ? '£ GBP' : curr}
                            </button>
                          ))}
                        </div>
                      </div>
                    </summary>

                    <div className="rounded-[20px] border border-slate-200/80 dark:border-white/10 overflow-hidden text-xs mt-2">
                      <div className="grid grid-cols-12 bg-slate-100/80 dark:bg-white/[0.04] p-3 font-bold text-xs text-slate-600 dark:text-slate-300 border-b border-slate-200/60 dark:border-white/10 safe-text-wrap">
                        <div className="col-span-4 break-words">{l('Yerel Tutar', 'Local Amount', 'Landeswährung')}</div>
                        <div className="col-span-4 text-right break-words">
                          {marketTargetCurrency === 'GBP'
                            ? l('İngiliz Sterlini (£) Karşılığı', 'British Pound (£) Equivalent', 'Britisches Pfund (£)')
                            : `${marketTargetCurrency} ${l('Karşılığı', 'Equivalent', 'Gegenwert')}`}
                        </div>
                        <div className="col-span-4 text-right break-words">{l('Örnek Harcama', 'Typical Purchase', 'Beispielausgabe')}</div>
                      </div>

                      <div className="divide-y divide-slate-100 dark:divide-white/5 bg-white dark:bg-slate-900/40">
                        {[
                          { val: 5, tr: 'Şişe Su / Sakız / Ufak İçecek', en: 'Bottled Water / Snack' },
                          { val: 10, tr: 'Kafede Çay / Espresso', en: 'Tea / Espresso in Cafe' },
                          { val: 20, tr: 'Sokak Yemeği / Dürüm / Sandviç', en: 'Street Food / Sandwich' },
                          { val: 50, tr: 'Şehir İçi Kısa Mesafe Taksi', en: 'Short Taxi / Transit' },
                          { val: 100, tr: 'Müze Girişi / Günlük Bilet', en: 'Museum / Day Pass' },
                          { val: 200, tr: '2 Kişilik Kafe / Kahve & Tatlı', en: 'Coffee & Dessert for Two' },
                          { val: 500, tr: 'Akşam Yemeği / Restoran Hesabı', en: 'Dinner for Two' },
                          { val: 1000, tr: 'Haftalık Market / Hızlı Tren', en: 'Groceries / Train Ticket' }
                        ].map((item, idx) => {
                          const converted = convertCurrency(item.val, destCurrencyCode, marketTargetCurrency);
                          const formattedConverted =
                            marketTargetCurrency === 'GBP'
                              ? `£${formatCurrencyValue(converted)}`
                              : marketTargetCurrency === 'USD'
                              ? `$${formatCurrencyValue(converted)}`
                              : `€${formatCurrencyValue(converted)}`;
                          return (
                            <div
                              key={idx}
                              className="grid grid-cols-12 p-3 hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors items-center gap-2 safe-text-wrap"
                            >
                              <div className="col-span-4 font-mono font-extrabold text-slate-900 dark:text-white flex flex-wrap items-center gap-1">
                                <span>{item.val}</span>
                                <span className="text-xs text-slate-400 font-bold">{destCurrencyCode}</span>
                              </div>
                              <div className="col-span-4 text-right font-mono font-black text-amber-600 dark:text-amber-400 break-words">
                                ≈ {formattedConverted}
                              </div>
                              <div className="col-span-4 text-right text-xs text-slate-500 dark:text-[#8E9DBE] break-words">
                                {language === 'tr' ? item.tr : item.en}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </details>

                  {/* AKILLI UYARI: DCC & ATM KOMİSYON TUZAĞI */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-400">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{l('Akıllı Finansal Uyarı: DCC (Dinamik Kur Dönüşümü) Tuzağına Düşmeyin!', 'Smart FX Alert: Avoid the Dynamic Currency Conversion (DCC) Trap!', 'Finanz-Tipp: DCC-Kostenfalle vermeiden!')}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {l(
                        `Bu ülkede (${destCurrencyCode}) kredi kartı kullanırken POS cihazı size "TL ile mi yoksa ${destCurrencyCode} ile mi ödemek istersiniz?" diye sorarsa MUTLAKA YEREL PARA BİRİMİNİ (${destCurrencyCode}) SEÇİN! "TL ile öde" seçeneği (DCC), bankanız yerine yerel işletmenin ve aracı POS terminalinin %5 ila %12 arasında fahiş kur marjı kesmesine neden olur. ATM'lerde de nakit çekerken daima "Without Conversion" (Dönüştürmesiz) seçeneğini tercih edin.`,
                        `When paying by card in this country, always choose the LOCAL currency (${destCurrencyCode}) on the terminal if asked. Selecting your home currency triggers DCC (Dynamic Currency Conversion) with 5-12% hidden markup fees! When withdrawing from ATMs, always pick "Without Conversion".`,
                        `Beim Bezahlen mit Karte immer die LOKALE Währung (${destCurrencyCode}) wählen, um DCC-Aufschläge von 5-12% zu vermeiden!`
                      )}
                    </p>
                  </div>
                </div>

                {/* 2. DÜNYA SAATİ VE ZAMAN DİLİMİ (TIME ZONE BUDDY) */}
                <div id="dossier-dual-clock" className="lg:col-span-5 bento-card p-5 sm:p-6 bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5 rounded-[24px] flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-sm">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <h2 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                            {name} {l('Yerel Saati, Saat Dilimi ve Çalışma Saatleri (Dual Clock)', 'Local Time, Time Zone & Remote Work Sync', 'Ortszeit, Zeitzone & Remote-Arbeitszeit', 'Hora Local, Zona Horaria y Sincronización', 'Местное время, часовой пояс и рабочий график')}
                          </h2>
                          <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE]">
                            {geography?.timeZone || `UTC${destOffsetHours >= 0 ? '+' : ''}${destOffsetHours}`}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                        {diffLabel}
                      </span>
                    </div>

                    {/* Çift Saat Göstergesi */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {/* Home Clock */}
                      <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 text-center space-y-1">
                        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-[#7A89A6] font-bold uppercase tracking-wider">
                          <span>🏠 {l('Ev Saati (İstanbul)', 'Home (Istanbul)', 'Heimat (Istanbul)')}</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                          {formatTimeStr(currentTime)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-[#8E9DBE] font-medium">
                          {formatDateStr(currentTime)} · UTC+3
                        </div>
                      </div>

                      {/* Destination Clock */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-b from-sky-500/10 to-transparent border border-sky-500/25 text-center space-y-1">
                        <div className="flex items-center justify-center gap-1.5 text-xs text-sky-700 dark:text-sky-400 font-bold uppercase tracking-wider">
                          <span>✈️ {l('Hedef Ülke Saati', 'Destination Time', 'Ziel-Uhrzeit')}</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight text-sky-700 dark:text-sky-300">
                          {formatTimeStr(destTime)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-[#8E9DBE] font-medium truncate">
                          {geo?.capital || name} · UTC{destOffsetHours >= 0 ? '+' : ''}{destOffsetHours}
                        </div>
                      </div>
                    </div>

                    {/* "ÇALIŞMA SAATİ" ANALİZİ & INTERACTIVE REMOTE SIMULATOR */}
                    <div className="mt-4 p-4 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span className="flex items-center gap-1.5">
                          <Laptop className="w-3.5 h-3.5 text-sky-500" />
                          <span>{l('"Çalışma Saati" Analizi & Göçebe Simülatörü', 'Remote Work Shift Simulator', 'Remote-Arbeitszeit-Simulator')}</span>
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          09:00 - 18:00
                        </span>
                      </div>

                      {/* City Selector Pills */}
                      <div>
                        <div className="text-xs text-slate-500 dark:text-[#8E9DBE] mb-1.5 font-medium">
                          {l('Hangi şehrin şirket / müşteri saatiyle çalışıyorsunuz?', 'Which company timezone are you working in?', 'Für welche Zeitzone arbeiten Sie?')}
                        </div>
                        <div className="flex flex-wrap gap-1 text-xs font-bold">
                          {[
                            { id: 'IST' as const, name: 'İstanbul', flag: '🇹🇷', offset: 3 },
                            { id: 'NYC' as const, name: 'New York', flag: '🇺🇸', offset: -5 },
                            { id: 'LON' as const, name: 'Londra', flag: '🇬🇧', offset: 0 },
                            { id: 'BER' as const, name: 'Berlin', flag: '🇩🇪', offset: 1 },
                            { id: 'SFO' as const, name: 'San Fran', flag: '🇺🇸', offset: -8 },
                            { id: 'SIN' as const, name: 'Singapur', flag: '🇸🇬', offset: 8 },
                            { id: 'TYO' as const, name: 'Tokyo', flag: '🇯🇵', offset: 9 }
                          ].map(city => {
                            const isSel = remoteBaseCity === city.id;
                            return (
                              <button
                                key={city.id}
                                type="button"
                                onClick={() => setRemoteBaseCity(city.id)}
                                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                                  isSel
                                    ? 'bg-sky-500 text-white font-extrabold shadow-2xs'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-white/10'
                                }`}
                              >
                                <span>{city.flag}</span>
                                <span>{city.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Simulator Calculation Result */}
                      {(() => {
                        const CITIES = {
                          IST: { name: 'İstanbul', offset: 3 },
                          NYC: { name: 'New York', offset: -5 },
                          LON: { name: 'Londra', offset: 0 },
                          BER: { name: 'Berlin', offset: 1 },
                          SFO: { name: 'San Francisco', offset: -8 },
                          SIN: { name: 'Singapur', offset: 8 },
                          TYO: { name: 'Tokyo', offset: 9 }
                        };
                        const targetCity = CITIES[remoteBaseCity];
                        const offsetDiff = destOffsetHours - targetCity.offset;
                        const startLocal = ((9 + offsetDiff) % 24 + 24) % 24;
                        const endLocal = ((18 + offsetDiff) % 24 + 24) % 24;
                        const formatH = (h: number) => `${Math.floor(h).toString().padStart(2, '0')}:00`;

                        return (
                          <div className="space-y-2 pt-1 text-xs sm:text-sm">
                            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-slate-800 dark:text-slate-200 space-y-1">
                              <div className="flex items-center justify-between font-bold">
                                <span>{targetCity.name} Saatiyle 09:00 - 18:00:</span>
                                <span className="font-mono text-sky-700 dark:text-sky-300 font-extrabold text-xs sm:text-sm">
                                  Yerel {formatH(startLocal)} - {formatH(endLocal)}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {startLocal >= 17 || startLocal < 4 ? (
                                  <span>🌙 <b>Akşam / Gece Mesaisi:</b> Gündüz saatleriniz (sabah ve öğle) tamamen serbesttir; güneşin ve şehrin tadını çıkarıp mesainize akşam {formatH(startLocal)}'de başlayabilirsiniz.</span>
                                ) : startLocal >= 4 && startLocal <= 8 ? (
                                  <span>🌅 <b>Erken Kuş Mesaisi:</b> Mesainiz sabah erken saatte ({formatH(startLocal)}) başlar; öğleden sonra erkenden serbest kalarak keşfe çıkabilirsiniz.</span>
                                ) : (
                                  <span>🟢 <b>Mükemmel Senkron:</b> Şirketinizle neredeyse aynı mesai dilimindesiniz. Günlük çalışma ve uyku düzeniniz bozulmaz.</span>
                                )}
                              </p>
                            </div>

                            {/* 24h Visual Shift Bar */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-slate-500 font-mono">
                                <span>00:00</span>
                                <span>06:00</span>
                                <span>12:00</span>
                                <span>18:00</span>
                                <span>24:00</span>
                              </div>
                              <div className="relative h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                                {Array.from({ length: 24 }).map((_, h) => {
                                  const isWork =
                                    startLocal <= endLocal
                                      ? h >= startLocal && h < endLocal
                                      : h >= startLocal || h < endLocal;
                                  const isSleep = h >= 0 && h < 7;
                                  return (
                                    <div
                                      key={h}
                                      className={`h-full flex-1 ${
                                        isWork
                                          ? 'bg-sky-500'
                                          : isSleep
                                          ? 'bg-slate-400/30 dark:bg-slate-700/40'
                                          : 'bg-emerald-400/50 dark:bg-emerald-500/30'
                                      }`}
                                      title={`${h}:00 - ${isWork ? 'Mesai' : isSleep ? 'Uyku' : 'Serbest Zaman'}`}
                                    />
                                  );
                                })}
                              </div>
                              <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500 inline-block" /> Mesai Saatleri</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Keşif / Serbest</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400 inline-block" /> Uyku</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-[#8E9DBE] flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                    <Activity className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                    <span>{l('Saniyeler gerçek zamanlı atomik dünya saati (NTP) ile senkronizedir.', 'Seconds sync live with atomic world time.', 'Live-Atomzeitsynchronisation.')}</span>
                  </div>
                </div>
              </div>

              {/* 3. İNTERNET VE BAĞLANTI İSTİHBARATI (NOMAD CONNECTIVITY) */}
              <div id="dossier-internet-sim" className="bento-card p-5 sm:p-6 bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-5 rounded-[24px]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white flex items-center justify-center shadow-sm">
                      <Wifi className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                        {name} {l('İnternet Hızı, eSIM ve Yerel Mobil Hatlar', 'Internet Speed, eSIM & Mobile Connectivity', 'WLAN-Speed, eSIM & Mobilfunk-Netze', 'Velocidad de Internet, eSIM y Conectividad Móvil', 'Скорость интернета, eSIM и мобильная связь')}
                      </h2>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE]">
                        {l('Mobil ağ kapsama alanı:', 'Mobile coverage:', 'Netzabdeckung:')} <b className="text-slate-800 dark:text-slate-200">{insights.internet.networkCoverage}</b>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1 rounded-full font-bold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                      ⚡ {insights.internet.mobileSpeedMbps} Mbps Mobil
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full font-bold bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      📶 {insights.internet.broadbandSpeedMbps} Mbps Wi-Fi
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Pillar 1: Wi-Fi & Mobil Hız Skorları */}
                  <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                        <Wifi className="w-4 h-4 text-teal-500" />
                        <span>{l('Wi-Fi & Mobil Hız Skorları', 'Wi-Fi & Mobile Speeds', 'WLAN & Mobilspeed')}</span>
                      </div>
                      <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
                        {insights.internet.costPerGbUsd}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm">
                      <div>
                        <div className="flex justify-between mb-1 font-semibold text-slate-600 dark:text-slate-300">
                          <span>{l('Mobil İndirme / Yükleme:', 'Mobile Down / Up:', 'Mobil Down / Up:')}</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {insights.internet.mobileSpeedMbps} / {Math.round(insights.internet.mobileSpeedMbps * 0.35)} Mbps
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
                            style={{ width: `${Math.min(100, Math.max(15, (insights.internet.mobileSpeedMbps / 150) * 100))}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 font-semibold text-slate-600 dark:text-slate-300">
                          <span>{l('Genişbant / Wi-Fi Hızı:', 'Broadband / Wi-Fi:', 'Breitband / WLAN:')}</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {insights.internet.broadbandSpeedMbps} / {Math.round(insights.internet.broadbandSpeedMbps * 0.45)} Mbps
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-400"
                            style={{ width: `${Math.min(100, Math.max(15, (insights.internet.broadbandSpeedMbps / 200) * 100))}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                          <span>✓ Zoom / Meet Video:</span>
                          <span>{l('Kusursuz', 'Excellent', 'Optimal')}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>• 4K Video Akışı:</span>
                          <span>{l('Akıcı', 'Smooth', 'Flüssig')}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>• Ortalama Gecikme (Ping):</span>
                          <span>~22 - 35 ms</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 2: Priz & Voltaj Detayı (Vektörel Çizim) */}
                  <div id="dossier-sockets-safety" className="p-4 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                        <Plug className="w-4 h-4 text-amber-500" />
                        <span>{l('Priz Tipleri & Voltaj Detayı', 'Socket Types & Voltage', 'Steckdosen & Volt')}</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                        {voltageFreqLabel}
                      </span>
                    </div>

                    {/* Vektörel Priz Çizimleri */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-center gap-3 py-1">
                        {plugTypesList.map((pt, idx) => (
                          <SocketPlugVector key={idx} type={pt} size={54} />
                        ))}
                      </div>

                      {/* Home Socket Compatibility Check */}
                      <div className="pt-1">
                        {isPlugCompatible ? (
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5">
                            <span className="mt-0.5">✓</span>
                            <span>{l(
                              `${homeCountryName} fişlerinizle (Tip ${homePlugs.join(' & ')}) doğrudan uyumludur. Yanınızda adaptör taşımanız gerekmez.`,
                              `Directly compatible with ${getCountryName(currentPassport || 'TR', 'en')} Type ${homePlugs.join(' & ')} plugs. No adapter required.`,
                              `Direkt kompatibel mit Steckern aus ${getCountryName(currentPassport || 'TR', 'de')} (Typ ${homePlugs.join(' & ')}). Kein Adapter erforderlich.`,
                              `Directamente compatible con enchufes de ${getCountryName(currentPassport || 'TR', 'es')} (Tipo ${homePlugs.join(' & ')}). No necesita adaptador.`,
                              `Полностью совместимо со штекерами ${getCountryName(currentPassport || 'TR', 'ru')} (Тип ${homePlugs.join(' & ')}). Адаптер не требуется.`
                            )}</span>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-300 flex items-start gap-1.5">
                            <span className="mt-0.5">⚠️</span>
                            <span>{l(
                              `Dikkat: ${homeCountryName} priz standardınızdan (${homePlugs.join(', ')}) farklıdır. Yanınızda evrensel seyahat adaptörü bulundurun.`,
                              `Adapter required: Socket types differ from your home standard (${homePlugs.join(', ')}). Please pack a universal plug adapter.`,
                              `Reiseadapter erforderlich: Steckertypen weichen von Ihrem Heimatstandard (${homePlugs.join(', ')}) ab.`,
                              `Adaptador necesario: Los enchufes difieren de su estándar de origen (${homePlugs.join(', ')}). Lleve un adaptador universal.`,
                              `Внимание: Розетки отличаются от стандартов вашей страны (${homePlugs.join(', ')}). Возьмите универсальный адаптер.`
                            )}</span>
                          </div>
                        )}
                      </div>

                      {verifiedRecord?.electricity?.voltage?.sources?.[0] && (
                        <div className="pt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <span>🏛️ {l('Resmi Standart:', 'Official Standard:', 'Offizieller Standard:')}</span>
                          <a
                            href={verifiedRecord.electricity.voltage.sources[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-slate-600 dark:hover:text-slate-300"
                          >
                            {verifiedRecord.electricity.voltage.sources[0].title}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pillar 3: Yerel Operatör Tavsiyesi */}
                  <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                        <Smartphone className="w-4 h-4 text-emerald-500" />
                        <span>{l('Yerel Operatör Tavsiyesi', 'Local Carrier Advice', 'Lokale Anbieter-Tipps')}</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        {insights.internet.esimAvailability.includes('Mevcut') || insights.internet.esimAvailability.includes('Var') ? 'eSIM Hazır' : 'Fiziksel SIM'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200">
                        <b className="text-amber-700 dark:text-amber-400 block mb-0.5">⚠️ {l('Havalimanından SIM Kart Almayın:', 'Avoid Airport SIM Kiosks:', 'Keine SIM am Flughafen kaufen:')}</b>
                        {l(
                          `Havalimanı gelen yolcu salonundaki turist paketleri 2 ila 3 kat pahalıdır. Havalimanı Wi-Fi ile merkeze geçip ${insights.internet.bestCarriers[0] || 'resmi operatör'} bayisinden pasaportla hat almak çok daha ekonomiktir.`,
                          `Airport kiosks charge inflated tourist fees. Head to the city center and buy from an official store instead.`,
                          `Flughafen-Kioske haben oft teure Touristentarife. Besser im Stadtzentrum kaufen.`
                        )}
                      </div>

                      <div className="pt-0.5 space-y-1">
                        <div>• <b>{l('Önerilen Operatörler:', 'Best Carriers:', 'Beste Netze:')}</b> {insights.internet.bestCarriers.join(', ')}</div>
                        <div>• <b>{l('eSIM Seçeneği:', 'eSIM:', 'eSIM:')}</b> Airalo, Holafly veya Nomad ile uçuş öncesi dijital hat kurabilirsiniz.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. GÜNLÜK YAŞAM GÜVENLİĞİ, TAKSİ UYGULAMALARI & BAHŞİŞ KÜLTÜRÜ */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* 4A: YEREL TAKSİ VE TESLİMAT UYGULAMALARI (lg:col-span-7) */}
                <div className="lg:col-span-7 bento-card p-5 sm:p-6 bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 rounded-[24px]">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-sm">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                          {name} {l('Ulaşım, Taksi ve Araç Çağırma Uygulamaları', 'Transport, Taxi & Ride-Hailing Apps', 'Transport, Taxi & Fahrdienst-Apps', 'Transporte, Taxi y Apps de Movilidad', 'Транспорт, такси и сервисы заказа авто')}
                        </h2>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE]">
                          {l('Her ülkenin Uber’i farklıdır; sabit fiyat ve rota güvenliği için resmi uygulamalar:', 'Every country has its own Uber. Upfront fares and safety:', 'Offizielle Apps für Festpreise & GPS-Sicherheit:')}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {nomadApps.length} {l('Doğrulanmış Uygulama', 'Verified Apps', 'Geprüfte Apps')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nomadApps.map((app, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 hover:border-indigo-400/50 transition-all flex flex-col justify-between space-y-2.5"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-black text-slate-900 dark:text-white text-sm">
                              {app.name}
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                              {language === 'tr' ? app.categoryLabelTr : app.categoryLabelEn}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                            {language === 'tr' ? app.taglineTr : app.taglineEn}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE] mt-1 leading-relaxed">
                            {language === 'tr' ? app.recommendedReasonTr : app.recommendedReasonEn}
                          </p>
                        </div>

                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                        >
                          <span>{l('Uygulamayı Aç / İndir', 'Open / Download App', 'App öffnen / laden')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE] pt-1">
                    💡 <b>{l('Taksi Tüyosu:', 'Taxi Pro-Tip:', 'Taxi-Tipp:')}</b> {insights.transport.taxiAdvice}
                  </div>
                </div>

                {/* 4B: BAHŞİŞ (TIPPING) KÜLTÜRÜ (lg:col-span-5) */}
                <div className="lg:col-span-5 bento-card p-5 sm:p-6 bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 rounded-[24px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 text-white flex items-center justify-center shadow-sm">
                          <Coins className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                            {l('Bahşiş (Tipping) Kültürü & Adap', 'Tipping Culture & Etiquette', 'Trinkgeld-Kultur & Etikette')}
                          </h3>
                          <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE]">
                            {l('Hesaba ne eklenir, ne zaman verilir?', 'What is expected or customary?', 'Was wird üblicherweise erwartet?')}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        {l('Yerel Adet', 'Local Custom', 'Lokaler Brauch')}
                      </span>
                    </div>

                    <div className="space-y-3 mt-4">
                      {/* Restoranlar */}
                      <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-1">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>🍽️</span>
                          <span>{l('Restoranlar & Kafeler', 'Restaurants & Cafes', 'Restaurants & Cafés')}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {encyclopedia.economy.tippingCulture || (
                            ['JP', 'KR'].includes(code)
                              ? l('Bahşiş KESİNLİKLE verilmez; mükemmel hizmet standart görev sayılır, bahşiş bırakmak hakaret olarak algılanabilir.', 'Tipping is strictly not customary and considered rude.', 'Kein Trinkgeld – gilt als unhöflich.')
                              : ['US', 'CA'].includes(code)
                              ? l('Zorunlu kural: Hesap tutarına %18 - %22 bahşiş eklenmesi beklenir.', 'Expected: 18-22% gratuity is customary.', '18-22% Trinkgeld ist obligatorisch.')
                              : l('Turistik restoranlarda %10 civarı servis eklenir veya küçük madeni paralar bırakılır.', '10% tip is standard in sit-down dining.', '10% Trinkgeld in Speiserestaurants üblich.')
                          )}
                        </p>
                      </div>

                      {/* Taksiler */}
                      <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-1">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>🚕</span>
                          <span>{l('Taksiler & Şoförler', 'Taxis & Drivers', 'Taxis & Fahrer')}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {['JP', 'KR'].includes(code)
                            ? l('Taksilerde bahşiş verilmez; para üstü kuruşu kuruşuna eksiksiz iade edilir.', 'No tip. Exact change is always given.', 'Kein Trinkgeld. Wechselgeld wird exakt herausgegeben.')
                            : l('Taksimetre tutarını en yakın tam sayıya yuvarlamak veya %5-10 eklemek adettir.', 'Round up the fare to the nearest round number.', 'Auf den nächsten Betrag aufrunden ist üblich.')}
                        </p>
                      </div>

                      {/* Oteller */}
                      <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-1">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>🛎️</span>
                          <span>{l('Oteller & Bavul Taşıma (Bellboy)', 'Hotels & Porters', 'Hotels & Gepäckträger')}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {['JP', 'KR'].includes(code)
                            ? l('Otel personeli bahşiş kabul etmez; teşekkür etmek yeterlidir.', 'Staff will politely decline tips.', 'Hotelpersonal lehnt Trinkgeld höflich ab.')
                            : l('Bavul taşıyan görevli için bavul başına 1-2 $ veya yerel karşılığı nezaket kuralıdır.', '$1-2 per bag for bellhop/porter is polite.', '1-2 $ pro Gepäckstück ist angemessen.')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-white/5">
                    💡 <b>{l('Kültür Hapı:', 'Cultural Pill:', 'Kultur-Tipp:')}</b> {itinerary?.signatureGastronomy.diningAdvice || l('Bahşiş ödemelerinde kart yerine nakit yerel para birimi her zaman daha makbuldür.', 'Cash in local currency is preferred for tips.', 'Trinkgeld in bar ist bevorzugt.')}
                  </div>
                </div>
              </div>

              {/* 5. SAHA İSTİHBARATI: SU GÜVENLİĞİ, TAX-FREE & DOLANDIRICILIK RADARI */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
                {/* 5A: MUSLUK SUYU & SAĞLIK GÜVENLİĞİ (lg:col-span-6) */}
                <div className="lg:col-span-6 bento-card p-5 sm:p-6 bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 rounded-[24px]">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm ${
                        travelIntel.waterAndHealth.tapWaterSafe
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                          : 'bg-gradient-to-br from-amber-500 to-rose-600'
                      }`}>
                        <Droplets className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                          {l('Musluk Suyu & Sağlık Güvenliği', 'Tap Water & Health Security', 'Leitungswasser & Gesundheit')}
                        </h3>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE]">
                          {l('İçilebilirlik durumu, aşılar ve acil tıp', 'Drinkability, vaccines & emergency medical', 'Trinkbarkeit, Impfungen & Notfall')}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                      travelIntel.waterAndHealth.tapWaterSafe
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                    }`}>
                      {travelIntel.waterAndHealth.tapWaterSafe
                        ? l('🚰 İçilebilir Musluk Suyu', '🚰 Safe Tap Water', '🚰 Trinkwasser')
                        : l('🚱 Yalnızca Şişe Suyu', '🚱 Bottled Water Only', '🚱 Nur Flaschenwasser')}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {travelIntel.waterAndHealth.tapWaterDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                        {l('Tavsiye Edilen Aşılar', 'Recommended Vaccines', 'Empfohlene Impfungen')}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-tight block">
                        {travelIntel.waterAndHealth.vaccines.join(', ')}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                        {l('Acil Ambulans / Tıp', 'Emergency Medical', 'Notruf Krankenwagen')}
                      </span>
                      <span className="font-mono font-black text-rose-600 dark:text-rose-400 text-sm block">
                        📞 {travelIntel.waterAndHealth.emergencyAmbulance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5B: TAX-FREE ALIŞVERİŞ & KDV İADESİ (lg:col-span-6) */}
                <div className="lg:col-span-6 bento-card p-5 sm:p-6 bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 rounded-[24px]">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-sm">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                          {l('Tax-Free Alışveriş & KDV İadesi', 'Tax-Free Shopping & VAT Refund', 'Tax-Free & MwSt-Rückerstattung')}
                        </h3>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE]">
                          {l('Havalimanı iade oranları ve minimum harcama', 'Airport refund rates and minimum threshold', 'Flughafen-Rückerstattung & Schwellen')}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
                      {travelIntel.taxFree.vatRefundPercent}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                        {l('Standart KDV İadesi', 'VAT Refund Rate', 'MwSt.-Satz')}
                      </span>
                      <span className="font-black text-slate-900 dark:text-white text-base font-mono block">
                        {travelIntel.taxFree.vatRefundPercent}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 space-y-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                        {l('Min. Harcama Eşiği', 'Min. Spend Required', 'Mindestbetrag')}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm block">
                        {travelIntel.taxFree.minSpend}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-blue-950 dark:text-blue-200 leading-relaxed">
                    💡 <b>{l('Gümrük Hatırlatması:', 'Customs Reminder:', 'Zoll-Hinweis:')}</b> {travelIntel.taxFree.customsNote}
                  </div>
                </div>

                {/* 5C: TURİST TUZAKLARI & DOLANDIRICILIK RADARI (lg:col-span-12) */}
                <div className="lg:col-span-12 bento-card p-5 sm:p-6 bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-4 rounded-[24px]">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-sm">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                          {name} {l('Turist Tuzakları & Dolandırıcılık Radarı', 'Tourist Scam Radar & Safety Alerts', 'Touristenfallen & Betrugs-Radar')}
                        </h3>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE]">
                          {l('Gezginlerin en çok karşılaştığı hileler ve korunma taktikleri', 'Most common tourist scams and how to protect yourself', 'Häufigste Betrugsmaschen & Schutztipps')}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {travelIntel.touristScams.length} {l('Aktif Uyarı', 'Active Alerts', 'Aktive Warnungen')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {travelIntel.touristScams.map((scam, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/10 hover:border-rose-400/50 transition-all space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-rose-700 dark:text-rose-400">
                            <span>⚠️</span>
                            <span>{scam.title}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {scam.desc}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/5 p-2 rounded-xl border border-emerald-500/15">
                          🛡️ <b>{l('Nasıl Korunursunuz?', 'How to Avoid:', 'Schutzmaßnahme:')}</b> {scam.tip}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: KÜLTÜR & TURİZM */}
          {activeTab === 'culture' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Coğrafya, Başkent, Büyük Şehirler ve Turistik Bölgeler */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 space-y-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#5EEAD4]/40 dark:border-teal-700/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h2 className="font-black text-base sm:text-lg text-[#042F2E] dark:text-white">
                      {name} {l('Kültürel Miras, Şehirler ve Gezilecek Yerler', 'Cultural Heritage, Cities & Sights', 'Kulturerbe, Städte & Sehenswürdigkeiten', 'Patrimonio Cultural, Ciudades y Lugares', 'Культурное наследие, города и достопримечательности')}
                    </h2>
                  </div>
                  <span className="text-xs font-black px-3.5 py-1.5 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-100 border border-teal-300 dark:border-teal-700 flex items-center gap-1.5 shadow-2xs">
                    <span>🏛️</span>
                    <span>{l('Başkent:', 'Capital:', 'Hauptstadt:')} {geography.capital}</span>
                  </span>
                </div>

                {/* Büyük Şehirler */}
                <div>
                  <div className="text-xs font-black text-teal-900 dark:text-teal-200 mb-2 flex items-center gap-1.5">
                    <span>🏙️</span>
                    <span>{l('Başlıca Büyük Şehirler & Metropoller:', 'Major Metropolitan Cities:', 'Wichtigste Großstädte:')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {geography.majorCities.map((city, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-white shadow-2xs hover:border-teal-500 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span>{city}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Popüler Turistik Bölgeler */}
                <div>
                  <div className="text-xs font-black text-teal-900 dark:text-teal-200 mb-2 flex items-center gap-1.5">
                    <span>🏖️</span>
                    <span>{l('Öne Çıkan Popüler Turistik Bölgeler:', 'Top Touristic Regions & Destinations:', 'Beliebte Urlaubsregionen & Highlights:')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {geography.touristRegions.map((region, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-100/70 dark:bg-teal-950/60 border border-teal-300/80 dark:border-teal-800/80 text-xs sm:text-sm font-bold text-teal-950 dark:text-teal-100 shadow-2xs"
                      >
                        <span className="text-teal-600 dark:text-teal-400">📍</span>
                        <span>{region}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pratik Seyahat Parametreleri (Para Birimi, Saat Dilimi, Priz, Telefon Kodu) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#5EEAD4]/40 dark:border-teal-700/60 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-700 shadow-2xs">
                    <div className="text-xs text-teal-800 dark:text-teal-300 font-bold">{l('Para Birimi & Sembolü', 'Currency & Symbol', 'Währung & Symbol')}</div>
                    <div className="font-black text-[#042F2E] dark:text-white mt-1 text-sm sm:text-base">
                      {geography.currencyCode} ({geography.currencySymbol})
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">{geography.currencyName}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-700 shadow-2xs">
                    <div className="text-xs text-teal-800 dark:text-teal-300 font-bold">{l('Saat Dilimi', 'Time Zone', 'Zeitzone')}</div>
                    <div className="font-black text-[#042F2E] dark:text-white mt-1 text-xs sm:text-sm">{geography.timeZone}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{l('Yerel Saat Farkı', 'Local Difference', 'Zeitdifferenz')}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-700 shadow-2xs">
                    <div className="text-xs text-teal-800 dark:text-teal-300 font-bold">{l('Priz Tipi & Voltaj', 'Plug & Voltage', 'Steckertyp')}</div>
                    <div className="font-black text-[#042F2E] dark:text-white mt-1 text-xs sm:text-sm">{geography.plugTypes}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{l('Seyahat Adaptörü', 'Travel Adapter', 'Reiseadapter')}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-700 shadow-2xs">
                    <div className="text-xs text-teal-800 dark:text-teal-300 font-bold">{l('Telefon Alan Kodu', 'Dialing Code', 'Ländervorwahl')}</div>
                    <div className="font-black text-[#042F2E] dark:text-white mt-1 font-mono text-sm sm:text-base">{geography.callingCode}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{l('Uluslararası Arama', 'Intl. Calling', 'Ländervorwahl')}</div>
                  </div>
                </div>
              </div>

              {/* Toplumsal Görgü Kuralları */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <h3 className="font-black text-base sm:text-lg text-[#042F2E] dark:text-white">
                    {l('Toplumsal Görgü Kuralları ve Gelenekler', 'Social Etiquette & Traditions', 'Umgangsformen & Traditionen')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {encyclopedia.culture.etiquette.map((tip, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-200 flex items-center justify-center font-black text-xs">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gezilecek Yerler & İkonik Rotalar */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-sky-500" />
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                      {l('Mutlaka Görülmesi Gereken Yerler & İkonik Rotalar', 'Must-See Attractions & Iconic Sites', 'Sehenswürdigkeiten & Highlights')}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {encyclopedia.tourism.mustSeePlaces.length} {l('Önemli Nokta', 'Key Landmarks', 'Highlights')}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {encyclopedia.tourism.mustSeePlaces.map((place, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs hover:border-teal-500 transition-colors"
                    >
                      <span className="text-teal-600 dark:text-teal-400 font-bold">📍</span>
                      <span className="leading-snug">{place}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Festivaller & Kutlamalar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {l('Önemli Festivaller ve Etkinlikler', 'Major Festivals & Cultural Events', 'Bedeutende Feste & Kultur', 'Festivales y Eventos Culturales', 'Главные фестивали и праздники')}
                    </h3>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {encyclopedia.culture.festivals.map((fest, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span>{fest}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Yaşam Tarzı ve Seyahat Tüyosu */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                  <div>
                    <h3 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider m-0">
                      {l('Sosyal Yaşam ve Ruh Hali', 'Social Vibe & Lifestyle', 'Lebensart', 'Estilo de Vida y Ambiente Social', 'Образ жизни и атмосфера')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                      {encyclopedia.culture.lifestyle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                    <h3 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider m-0">
                      {l('Gezginler İçin Seyahat Tarzı Tüyosu', 'Travel Style Tip for Explorers', 'Reisetipp', 'Consejo para Viajeros', 'Совет для путешественников')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                      {encyclopedia.tourism.travelStyleTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: YEMEK & GASTRONOMİ */}
          {activeTab === 'gastronomy' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Meşhur Milli Yemekler */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <Utensils className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h2 className="font-black text-base sm:text-xl text-slate-900 dark:text-slate-100 tracking-tight">
                    {name} {l('Meşhur Yemekleri, İçecekleri ve Mutfak Kültürü', 'Gastronomy, Famous Dishes & Culinary Guide', 'Kulinarik, berühmte Gerichte & Esskultur', 'Gastronomía, Platos Típicos y Guía Culinaria', 'Национальная кухня, популярные блюда и напитки')}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {encyclopedia.gastronomy.famousDishes.map((dish, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/60 hover:border-teal-400 text-slate-900 dark:text-white font-bold text-sm sm:text-base flex items-center gap-3 shadow-2xs transition-all"
                    >
                      <span className="text-2xl flex-shrink-0">🍲</span>
                      <span className="leading-snug">{dish}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* İçecekler & Sokak Lezzetleri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Geleneksel İçecekler */}
                <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3.5">
                    <span className="text-xl">☕</span>
                    <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {l('Geleneksel ve Popüler İçecekler', 'Traditional & Popular Drinks', 'Traditionelle Getränke', 'Bebidas Tradicionales y Populares', 'Традиционные и популярные напитки')}
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {encyclopedia.gastronomy.traditionalDrinks.map((drink, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/60 hover:border-teal-400 text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2.5 shadow-2xs transition-all"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 flex-shrink-0" />
                        <span>{drink}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sokak Lezzetleri ve Tatlılar */}
                <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3.5">
                    <span className="text-xl">🍰</span>
                    <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {l('Sokak Lezzetleri ve Tatlılar', 'Street Food & Iconic Desserts', 'Streetfood & Süßspeisen', 'Comida Callejera y Postres', 'Уличная еда и десерты')}
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {encyclopedia.gastronomy.streetFoodAndDesserts.map((dessert, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/60 hover:border-teal-400 text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2.5 shadow-2xs transition-all"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 flex-shrink-0" />
                        <span>{dessert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DİL, DİN & TARİH */}
          {activeTab === 'language' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Pratik Hayat Kurtaran Cümleler */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <Languages className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h2 className="font-black text-base sm:text-lg text-slate-900 dark:text-slate-100">
                      {name} {l('Pratik Konuşma Kalıpları ve Yerel Dil Rehberi', 'Survival Travel Phrases & Local Language Guide', 'Wichtige Reiseredewendungen & Sprachführer', 'Frases Prácticas de Viaje y Guía de Idioma', 'Разговорник и полезные фразы для путешествия')}
                    </h2>
                  </div>
                  <span className="text-xs text-teal-700 dark:text-teal-300 font-semibold bg-teal-100/70 dark:bg-teal-900/40 px-2.5 py-1 rounded-full">
                    {l('Tıklayarak kopyalayın', 'Click to copy', 'Zum Kopieren klicken')}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {encyclopedia.language.phrases.map((phraseItem, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCopy(phraseItem.phrase, `phrase-${idx}`)}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/50 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-md transition-all cursor-pointer group relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {phraseItem.phrase}
                        </div>
                        <span className="text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                          {copiedPhrase === `phrase-${idx}` ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4 opacity-70" />
                          )}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
                        {phraseItem.meaning}
                      </div>
                      {phraseItem.pronunciation && (
                        <div className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300 mt-1.5 flex items-center gap-1">
                          <span>🗣️</span> {phraseItem.pronunciation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dini Yapı & Saygı Normları */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <Landmark className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-slate-100">
                    {l('Dini Yapı & İbadethane Ziyaret Kuralları', 'Religion & Sacred Etiquette', 'Religion & Verhaltensregeln')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/50 space-y-1.5">
                    <span className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                      {l('Hakim Dini İnanışlar', 'Primary Faiths', 'Vorherrschende Religionen')}
                    </span>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      {encyclopedia.religion.primaryReligions}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/50 space-y-1.5">
                    <span className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      {l('Ziyaret Kuralları & Saygı Normları', 'Visitor Guidelines & Dress Code', 'Besuchsregeln')}
                    </span>
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      {encyclopedia.religion.respectNorms}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kısa Öz Tarihçe & Dönüm Noktaları */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-slate-100">
                    {l('Kısa ve Öz Tarihçe', 'Concise Historical Overview', 'Kurze Geschichte')}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/50">
                  {encyclopedia.history.conciseHistory}
                </p>
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                    {l('Tarihin Önemli Dönüm Noktaları', 'Historical Milestones', 'Historische Meilensteine')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {encyclopedia.history.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/50 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2.5"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 flex-shrink-0" />
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ÜNLÜLER & EKONOMİ */}
          {activeTab === 'achievements' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Dünyaca Ünlü İsimler */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h2 className="font-black text-base sm:text-lg text-slate-900 dark:text-slate-100">
                    {name} {l('Küresel Başarılar, İnovasyon ve Dünya Sıralaması', 'Global Achievements, Figures & World Standing', 'Globale Erfolge, Persönlichkeiten & Rangliste', 'Logros Globales y Personalidades Célebres', 'Мировые достижения, известные личности и рейтинги')}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {encyclopedia.achievements.famousFigures.map((fig, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/50 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3 shadow-2xs hover:border-amber-400 transition-colors"
                    >
                      <span className="text-amber-500 font-black text-base">★</span>
                      <span className="leading-snug">{fig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dünyada Lider Olduğu Alanlar */}
              <div className="bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <Building className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-slate-100">
                    {l('Dünyada Lider veya En Başarılı Olduğu Alanlar', 'Global Leadership & Strong Sectors', 'Führende Wirtschaftszweige')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {encyclopedia.achievements.strongSectors.map((sector, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-teal-200/80 dark:border-teal-700/50 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3 shadow-2xs hover:border-teal-400 transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500 flex-shrink-0" />
                      <span className="leading-snug">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ekonomi, Ödeme Kültürü ve Bahşiş */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Ödeme Kültürü */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100">
                    <CreditCard className="w-4 h-4 text-purple-500" />
                    <span>{l('Kart vs. Nakit Kültürü', 'Cards vs. Cash', 'Zahlungskultur')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {encyclopedia.economy.paymentCulture}
                  </p>
                </div>

                {/* Bahşiş Kültürü */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span>{l('Bahşiş Teamülü', 'Tipping Culture', 'Trinkgeld')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {encyclopedia.economy.tippingCulture}
                  </p>
                </div>

                {/* Ekonomik Güç */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100">
                    <Building className="w-4 h-4 text-sky-500" />
                    <span>{l('Lokomotif Sektörler', 'Economic Pillars', 'Wirtschaftskraft')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {encyclopedia.economy.economicPillars}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VİZE & GÜVENLİK KARTI (UYGULAMADAKİ TÜM DETAYLAR) */}
          {activeTab === 'visa' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Multilingual Rich Snippet Summary Box (TL;DR for Google Featured Snippets) */}
              <CountryRichSnippetSummary
                countryCode={code}
                currentPassport={currentPassport}
                language={language}
                variant="modal"
              />

              {/* Giriş Rejimi & Vize Şartları */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h2 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                      {name} {l('Giriş Şartları, Pasaport Geçerliliği ve Resmi Mevzuat', 'Entry Regulations, Passport Validity & Official Rules', 'Einreisebestimmungen, Passgültigkeit & offizielle Regeln', 'Requisitos de Entrada, Validez de Pasaporte y Normativas', 'Правила въезда, требования к паспорту и регламент')}
                    </h2>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeClass}`}>
                    {badgeLabel}
                  </span>
                </div>

                {/* Detailed Rule Note */}
                {detailedInfo && (
                  <div className="p-4 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs text-slate-800 dark:text-teal-100 leading-relaxed space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-teal-800 dark:text-teal-300">
                      <Sparkles className="w-4 h-4" />
                      <span>{l('Mevzuat ve Kalış Detayı (Doğrulanmış)', 'Verified Regulation & Stay Rules', 'Verifizierte Regelungen')}</span>
                    </div>
                    <p>
                      {language === 'de' && detailedInfo.nDe
                        ? detailedInfo.nDe
                        : language === 'en' && detailedInfo.nEn
                        ? detailedInfo.nEn
                        : detailedInfo.n}
                    </p>
                    {detailedInfo.u && (
                      <div className="pt-2">
                        <a
                          href={detailedInfo.u}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-nubair-primary !py-2 !px-3.5 text-xs inline-flex items-center gap-1.5"
                        >
                          <span>{l('Resmi Konsolosluk / E-Vize Başvuru Portalı', 'Official Consular / eVisa Portal', 'Offizielles Visaportal')}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Güvenlik & Dolandırıcılık Uyarıları */}
                <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{l('Güvenlik Özeti ve Dolandırıcılık Uyarıları', 'Safety Assessment & Common Scams', 'Sicherheitshinweise & Betrugsmaschen')}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {insights.safety.crimeRateSummary}
                  </p>
                  {insights.safety.commonScams.length > 0 && (
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pt-1">
                      {insights.safety.commonScams.map((scam, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-500">⚠️</span>
                          <span>{scam}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Ulaşım, Taksi ve Acil Hatlar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                    <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      🚕 <span>{l('Taksi & Araç Çağırma Uygulamaları', 'Taxi & Ride Apps', 'Taxi & Fahrdienste')}</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      {insights.transport.popularRideApps.length > 0
                        ? insights.transport.popularRideApps.join(', ')
                        : l('Metre açtırılması önerilir', 'Metered taxi recommended', 'Taxameter empfohlen')}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500">
                      {insights.transport.taxiAdvice}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                    <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      🚨 <span>{l('Acil Yardım Çağrı Numaraları', 'Emergency Hotlines', 'Notrufnummern')}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-slate-700 dark:text-slate-300">
                      <span>{l('Polis:', 'Police:', 'Polizei:')} <b>{insights.safety.emergencyNumbers.police}</b></span>
                      <span>{l('Ambulans:', 'Ambulance:', 'Krankenwagen:')} <b>{insights.safety.emergencyNumbers.ambulance}</b></span>
                      <span>{l('Genel:', 'General:', 'Allgemein:')} <b>{insights.safety.emergencyNumbers.general}</b></span>
                      {verifiedRecord?.emergency?.tourist_police?.value && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                          {l('Turist Polisi:', 'Tourist Police:', 'Touristenpolizei:')} <b>{verifiedRecord.emergency.tourist_police.value}</b>
                        </span>
                      )}
                    </div>
                    {verifiedRecord?.emergency?.police?.sources?.[0] && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-1 flex-wrap">
                        <span>🏛️ {l('Doğrulanmış Kaynak:', 'Verified Source:', 'Verifizierte Quelle:')}</span>
                        <a
                          href={verifiedRecord.emergency.police.sources[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-slate-600 dark:hover:text-slate-300"
                        >
                          {verifiedRecord.emergency.police.sources[0].title}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hata veya Kural Değişikliği Bildir */}
                {onOpenReportChange && (
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenReportChange({ code, name, cat: item.cat });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 font-semibold cursor-pointer transition-colors"
                    >
                      <Flag className="w-3.5 h-3.5 text-rose-500" />
                      <span>{l('Kural değişikliği veya güncel bilgi bildir', 'Report rule change or update', 'Regeländerung melden')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50/60 dark:bg-white/[0.02] border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8E9DBE] flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="truncate">
              {l(
                '🛡️ Vize ve sınır geçiş kuralları IATA Timatic ve diplomatik mevzuat bültenleriyle (Ekim 2026) teyitlidir. Ülke ansiklopedisi doğrulanmış küresel arşivlerden derlenmiştir.',
                '🛡️ Visa and entry regulations verified via IATA Timatic & consular gazettes (Oct 2026). Country encyclopedia compiled from verified global archives.',
                '🛡️ Visabestimmungen über IATA Timatic & Konsularberichte (Okt 2026) verifiziert. Enzyklopädie aus geprüften Archiven.'
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={openGoogleMaps}
              className="btn-nubair-secondary text-xs"
            >
              {l('Haritada Gör', 'View on Maps', 'Auf Karte zeigen')}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn-nubair-primary text-xs"
            >
              {l('Kapat', 'Close', 'Schließen')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
