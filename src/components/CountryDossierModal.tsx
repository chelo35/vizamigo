import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
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
  Route
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
import { getCountryEncyclopedia, CountryEncyclopediaData } from '../data/countryEncyclopedia';
import { getCountryGeography, CountryGeographyData } from '../data/countryGeography';
import { getCountryItinerary, CountryTravelItinerary } from '../data/countryItineraries';
import { getPassportItems } from '../utils/calculator';
import { useI18n } from '../data/i18n';

interface CountryDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryCode: string | null;
  currentPassport: string;
  onOpenAudit?: () => void;
  onOpenReportChange?: (country: { code: string; name: string; cat: string }) => void;
}

type DossierTab = 'itinerary' | 'culture' | 'gastronomy' | 'language' | 'achievements' | 'visa';

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
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);
  const [copiedItinerary, setCopiedItinerary] = useState<boolean>(false);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset tab when country changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('itinerary');
    }
  }, [countryCode, isOpen]);

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

    // Verification Status Badge (Specifies Visa & Border Entry verification)
    let verStatus = {
      type: 'agree',
      label: l('Vize: 3 Kaynak Mutabık (2026)', 'Visa: 3 Sources Consensus (2026)', 'Visum: 3 Quellen Konsens (2026)'),
      color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    };

    if (VER.chk.split(' ').includes(code)) {
      verStatus = {
        type: 'chk',
        label: l('Vize: IATA & Konsolosluk Teyitli (Ekim 2026)', 'Visa: IATA & Consular Audited (Oct 2026)', 'Visum: IATA & Konsularisch geprüft (Okt 2026)'),
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

    return {
      code,
      name: getCountryName(code, language),
      item,
      geo,
      insights,
      encyclopedia,
      detailedInfo,
      verStatus,
      geography,
      itinerary
    };
  }, [countryCode, currentPassport, language, l]);

  if (!isOpen || !countryData) return null;

  const { code, name, item, geo, insights, encyclopedia, detailedInfo, verStatus, geography, itinerary } = countryData;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 sm:py-6 overflow-y-auto backdrop-blur-md bg-slate-950/75 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col glass-panel rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="relative p-5 sm:p-6 pb-4 bg-gradient-to-r from-teal-900/10 via-slate-900/5 to-slate-900/10 dark:from-teal-950/40 dark:via-slate-900/40 dark:to-slate-950/40 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-start justify-between gap-4">
            {/* Country Identity */}
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <span className="text-4xl sm:text-5xl leading-none filter drop-shadow-md select-none">
                {getFlag(code)}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {name}
                  </h2>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border border-slate-200 dark:border-slate-700">
                    {code}
                  </span>
                  {(geo?.capital || geography?.capital) && (
                    <span className="text-xs text-slate-500 dark:text-[#8E9DBE] font-medium">
                      • {l('Başkent:', 'Capital:', 'Hauptstadt:')} <b className="text-slate-800 dark:text-slate-200">{geo?.capital || geography?.capital}</b>
                    </span>
                  )}
                  {geo?.mainHub && (
                    <span className="text-xs text-slate-500 dark:text-[#8E9DBE] font-medium">
                      • IATA: <b className="font-mono text-slate-900 dark:text-white">{geo.mainHub}</b>
                    </span>
                  )}
                </div>

                {/* Sub Badges: Visa Status + Verification Badge */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${badgeClass}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{badgeLabel}</span>
                  </span>

                  <button
                    type="button"
                    onClick={onOpenAudit}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${verStatus.color}`}
                    title={l('Mevzuat Denetim Masasını Aç', 'Open Regulation Audit Console', 'Audit-Konsole öffnen')}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>✓ {verStatus.label}</span>
                  </button>

                  <button
                    type="button"
                    onClick={openGoogleMaps}
                    className="btn-nubair-secondary !py-1 !px-3 text-xs inline-flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-[#8E9DBE]" />
                    <span>Google Haritalar</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer flex-shrink-0"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10 text-xs">
            {/* Safety */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10">
              <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 dark:text-[#7A89A6] font-medium">{l('Güvenlik', 'Safety', 'Sicherheit')}</div>
                <div className="font-bold text-slate-800 dark:text-white truncate">
                  {insights.safety.safetyScore}/100 · {insights.safety.safetyLevel}
                </div>
              </div>
            </div>

            {/* Internet */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10">
              <Wifi className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 dark:text-[#7A89A6] font-medium">{l('Mobil Hız', 'Mobile Speed', 'Mobilfunk')}</div>
                <div className="font-bold text-slate-800 dark:text-white truncate">
                  {insights.internet.mobileSpeedMbps} Mbps · {insights.internet.costPerGbUsd}
                </div>
              </div>
            </div>

            {/* Daily Budget */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10">
              <DollarSign className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 dark:text-[#7A89A6] font-medium">{l('Günlük Bütçe', 'Daily Budget', 'Tagesbudget')}</div>
                <div className="font-bold text-slate-800 dark:text-white truncate">
                  {insights.livingCosts.dailyBudgetBackpackerUsd}
                </div>
              </div>
            </div>

            {/* Currency & Card */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10">
              <CreditCard className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 dark:text-[#7A89A6] font-medium">{l('Para Birimi', 'Currency', 'Währung')}</div>
                <div className="font-bold text-slate-800 dark:text-white truncate">
                  {insights.currency}
                </div>
              </div>
            </div>

            {/* Season */}
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10">
              <Calendar className="w-4 h-4 text-[#0F172A] dark:text-[#8E9DBE] flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 dark:text-[#7A89A6] font-medium">{l('İdeal Dönem', 'Best Time', 'Reisezeit')}</div>
                <div className="font-bold text-slate-800 dark:text-white truncate">
                  {insights.bestMonths || encyclopedia.tourism.bestSeasons.slice(0, 22) + '...'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-slate-50/60 dark:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/10 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('itinerary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'itinerary' ? 'tab-chip-active' : 'tab-chip-inactive'
            }`}
          >
            <Route className="w-4 h-4" />
            <span>{l('🗺️ Gezi Planı & Rota', '🗺️ Travel Itinerary & Guide', '🗺️ Reiseplan & Route')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('culture')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'culture' ? 'tab-chip-active' : 'tab-chip-inactive'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>{l('🏛️ Kültür & Turizm', '🏛️ Culture & Sights', '🏛️ Kultur & Tourismus')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gastronomy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'gastronomy' ? 'tab-chip-active' : 'tab-chip-inactive'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>{l('🍲 Yemek & İçecek', '🍲 Gastronomy & Drinks', '🍲 Essen & Trinken')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('language')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'language' ? 'tab-chip-active' : 'tab-chip-inactive'
            }`}
          >
            <Languages className="w-4 h-4" />
            <span>{l('🗣️ Dil, Din & Tarih', '🗣️ Language, Faith & History', '🗣️ Sprache, Glaube & Geschichte')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'achievements' ? 'tab-chip-active' : 'tab-chip-inactive'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>{l('🏆 Ünlüler & Ekonomi', '🏆 Figures & Economy', '🏆 Persönlichkeiten & Wirtschaft')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('visa')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'visa' ? 'tab-chip-active' : 'tab-chip-inactive'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>{l('🛂 Vize & Güvenlik Kartı', '🛂 Visa & Travel Dossier', '🛂 Visum & Sicherheitskarte')}</span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
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

                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                      {itinerary.routeName}
                    </h3>
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
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {l('Uğranması Gereken Duraklar & Günlük Gezi Planı', 'Must-Visit Stops & Day-by-Day Itinerary', 'Stopps & Detaillierter Tagesplan')}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {itinerary.stops.length} {l('Ana Durak', 'Main Stops', 'Hauptstopps')}
                  </span>
                </div>

                <div className="space-y-4">
                  {itinerary.stops.map((stop, sIdx) => {
                    const stopMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.mapsQuery)}`;

                    return (
                      <div
                        key={sIdx}
                        className="relative bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-3.5 hover:border-teal-500/50 transition-all shadow-2xs"
                      >
                        {/* Stop Top Header */}
                        <div className="flex flex-wrap items-start justify-between gap-2.5">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-black flex items-center justify-center text-xs flex-shrink-0 shadow-xs">
                              {sIdx + 1}
                            </span>
                            <div className="min-w-0">
                              <h5 className="font-black text-sm sm:text-base text-slate-900 dark:text-white truncate">
                                {stop.name}
                              </h5>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-bold text-xs">
                                  <Clock className="w-3 h-3" />
                                  <span>{l('Yeterli Ziyaret Süresi:', 'Duration:', 'Dauer:')} {stop.recommendedDuration}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => window.open(stopMapsUrl, '_blank', 'noopener,noreferrer')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-slate-800 text-teal-700 dark:text-teal-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-2xs cursor-pointer transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5 text-teal-600" />
                            <span>{l('Durağı Haritada Aç', 'View Stop on Maps', 'Auf Karte zeigen')}</span>
                            <ExternalLink className="w-3 h-3 opacity-60" />
                          </button>
                        </div>

                        {/* Highlights Tags */}
                        {stop.highlights.length > 0 && (
                          <div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              {l('Görülmesi Gereken İkonik Noktalar:', 'Must-See Landmarks:', 'Wichtigste Sehenswürdigkeiten:')}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {stop.highlights.map((h, hIdx) => (
                                <span
                                  key={hIdx}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                  <span>{h}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Activities List */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            🏃 {l('Neler Yapılır & Nereler Gezilir?', 'What to Do & Activities:', 'Was man unternimmt & Aktivitäten:')}
                          </div>
                          <ul className="space-y-1.5">
                            {stop.activities.map((act, aIdx) => (
                              <li key={aIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2 font-medium leading-relaxed">
                                <span className="text-teal-600 dark:text-teal-400 font-bold flex-shrink-0">•</span>
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Gastronomy Box for Stop */}
                        <div className="p-3 rounded-xl bg-orange-50/80 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-800/60 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-black text-orange-900 dark:text-orange-200">
                            <Utensils className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                            <span>{l('🍲 Bu Durakta Ne Yenir & Ne İçilir?', '🍲 What to Eat & Drink at this Stop:', '🍲 Essen & Trinken an diesem Stopp:')}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-0.5">
                            {stop.foodAndDrinks.map((fd, fIdx) => (
                              <span
                                key={fIdx}
                                className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/80 border border-orange-200 dark:border-orange-900/60 text-xs font-bold text-orange-950 dark:text-orange-200 shadow-2xs"
                              >
                                {fd}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Critical Tips & Precautions for Stop */}
                        <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 dark:text-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span>{l('⚠️ Nelere Dikkat Edilir & Kritik İpuçları:', '⚠️ What to Watch Out for & Tips:', '⚠️ Wichtige Hinweise & Tipps:')}</span>
                          </div>
                          <ul className="space-y-1">
                            {stop.criticalTips.map((tip, tIdx) => (
                              <li key={tIdx} className="text-xs text-amber-950 dark:text-amber-200 font-medium flex items-start gap-1.5 leading-relaxed">
                                <span className="text-amber-600 font-bold flex-shrink-0">›</span>
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
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200/70 dark:border-slate-700/60 pb-3">
                  <Utensils className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {l('Mutfak Kültürü: Rotanın İmza Lezzetleri & İçecekleri', 'Culinary Culture: Signature Dishes & Drinks', 'Kulinarik: Typische Gerichte & Getränke')}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Famous Dishes */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/70 space-y-2">
                    <div className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span>🍲</span>
                      <span>{l('Öne Çıkan Yemekler', 'Signature Dishes', 'Typische Gerichte')}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {itinerary.signatureGastronomy.dishes.map((dish, idx) => (
                        <li key={idx}>• {dish}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Drinks */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/70 space-y-2">
                    <div className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span>🍹</span>
                      <span>{l('Geleneksel İçecekler', 'Traditional Drinks', 'Traditionelle Getränke')}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {itinerary.signatureGastronomy.drinks.map((drink, idx) => (
                        <li key={idx}>• {drink}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Street Food */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/70 space-y-2">
                    <div className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span>🍢</span>
                      <span>{l('Sokak Lezzetleri & Tatlılar', 'Street Food & Sweets', 'Streetfood & Süßes')}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {itinerary.signatureGastronomy.streetFoods.map((snack, idx) => (
                        <li key={idx}>• {snack}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/70 dark:border-teal-800/60 text-xs text-teal-950 dark:text-teal-200 font-medium leading-relaxed">
                  <b className="font-bold">💡 {l('Masa Kültürü & Bahşiş:', 'Dining Etiquette & Tipping:', 'Tischsitten & Trinkgeld:')}</b> {itinerary.signatureGastronomy.diningAdvice}
                </div>
              </div>

              {/* Packing & Precautions Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Packing Essentials */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-slate-200/70 dark:border-slate-700/60 pb-2">
                    <span className="text-lg">🎒</span>
                    <h5 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      {l('Yanınıza Almanız Gerekenler (Çanta)', 'Packing Essentials', 'Packliste & Must-Haves')}
                    </h5>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {itinerary.packingAndPrecautions.essentials.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety & Etiquette */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-slate-200/70 dark:border-slate-700/60 pb-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <h5 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      {l('Güvenlik & Yerel Görgü Kuralları', 'Safety & Cultural Etiquette', 'Sicherheit & Verhaltensregeln')}
                    </h5>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {itinerary.packingAndPrecautions.safetyAndEtiquette.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: KÜLTÜR & TURİZM */}
          {activeTab === 'culture' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Coğrafya, Başkent, Büyük Şehirler ve Turistik Bölgeler */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-700/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                      {l('Başkent, Büyük Şehirler ve Turistik Bölgeler', 'Capital, Major Cities & Tourist Regions', 'Hauptstadt, Großstädte & Regionen')}
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 flex items-center gap-1.5">
                    <span>🏛️</span>
                    <span>{l('Başkent:', 'Capital:', 'Hauptstadt:')} {geography.capital}</span>
                  </span>
                </div>

                {/* Büyük Şehirler */}
                <div>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <span>🏙️</span>
                    <span>{l('Başlıca Büyük Şehirler & Metropoller:', 'Major Metropolitan Cities:', 'Wichtigste Großstädte:')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {geography.majorCities.map((city, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs hover:border-teal-500 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span>{city}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Popüler Turistik Bölgeler */}
                <div>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <span>🏖️</span>
                    <span>{l('Öne Çıkan Popüler Turistik Bölgeler:', 'Top Touristic Regions & Destinations:', 'Beliebte Urlaubsregionen & Highlights:')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {geography.touristRegions.map((region, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 text-xs font-semibold text-teal-800 dark:text-teal-200 shadow-2xs"
                      >
                        <span className="text-teal-600 dark:text-teal-400">📍</span>
                        <span>{region}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pratik Seyahat Parametreleri (Para Birimi, Saat Dilimi, Priz, Telefon Kodu) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[10px] text-slate-400 font-semibold">{l('Para Birimi & Sembolü', 'Currency & Symbol', 'Währung & Symbol')}</div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100 mt-0.5 text-sm">
                      {geography.currencyCode} ({geography.currencySymbol})
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{geography.currencyName}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[10px] text-slate-400 font-semibold">{l('Saat Dilimi', 'Time Zone', 'Zeitzone')}</div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100 mt-0.5 text-xs">{geography.timeZone}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{l('Yerel Saat Farkı', 'Local Difference', 'Zeitdifferenz')}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[10px] text-slate-400 font-semibold">{l('Priz Tipi & Voltaj', 'Plug & Voltage', 'Steckertyp')}</div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100 mt-0.5 text-xs">{geography.plugTypes}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{l('Seyahat Adaptörü', 'Travel Adapter', 'Reiseadapter')}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="text-[10px] text-slate-400 font-semibold">{l('Telefon Alan Kodu', 'Dialing Code', 'Ländervorwahl')}</div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100 mt-0.5 font-mono text-sm">{geography.callingCode}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{l('Uluslararası Arama', 'Intl. Calling', 'Ländervorwahl')}</div>
                  </div>
                </div>
              </div>

              {/* Toplumsal Görgü Kuralları */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {l('Toplumsal Görgü Kuralları ve Gelenekler', 'Social Etiquette & Traditions', 'Umgangsformen & Traditionen')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {encyclopedia.culture.etiquette.map((tip, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gezilecek Yerler & İkonik Rotalar */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5">
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
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {l('Önemli Festivaller ve Etkinlikler', 'Major Festivals & Cultural Events', 'Bedeutende Feste & Kultur')}
                    </h4>
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
                    <div className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                      {l('Sosyal Yaşam ve Ruh Hali', 'Social Vibe & Lifestyle', 'Lebensart')}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                      {encyclopedia.culture.lifestyle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                    <div className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                      {l('Gezginler İçin Seyahat Tarzı Tüyosu', 'Travel Style Tip for Explorers', 'Reisetipp')}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
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
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Utensils className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {l('İkonik Milli Yemekler', 'Iconic National Dishes', 'Traditionelle Nationalgerichte')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {encyclopedia.gastronomy.famousDishes.map((dish, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-3 shadow-2xs"
                    >
                      <span className="text-xl">🍲</span>
                      <span className="leading-snug">{dish}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* İçecekler & Sokak Lezzetleri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Geleneksel İçecekler */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">☕</span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {l('Geleneksel ve Popüler İçecekler', 'Traditional & Popular Drinks', 'Traditionelle Getränke')}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {encyclopedia.gastronomy.traditionalDrinks.map((drink, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                        <span>{drink}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sokak Lezzetleri ve Tatlılar */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🍰</span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {l('Sokak Lezzetleri ve Tatlılar', 'Street Food & Iconic Desserts', 'Streetfood & Süßspeisen')}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {encyclopedia.gastronomy.streetFoodAndDesserts.map((dessert, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
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
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                      {l('Pratik Hayat Kurtaran Gezgin Cümleleri', 'Survival Travel Phrases', 'Wichtige Reisewendungen')}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {l('Tıklayarak kopyalayın', 'Click to copy', 'Zum Kopieren klicken')}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {encyclopedia.language.phrases.map((phraseItem, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCopy(phraseItem.phrase, `phrase-${idx}`)}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 hover:border-teal-500 dark:hover:border-teal-500 transition-all cursor-pointer shadow-2xs group relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
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
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {phraseItem.meaning}
                      </div>
                      {phraseItem.pronunciation && (
                        <div className="text-[11px] font-mono text-teal-600 dark:text-teal-400 mt-1">
                          🗣️ {phraseItem.pronunciation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dini Yapı & Saygı Normları */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {l('Dini Yapı & İbadethane Ziyaret Kuralları', 'Religion & Sacred Etiquette', 'Religion & Verhaltensregeln')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {l('Hakim Dini İnanışlar', 'Primary Faiths', 'Vorherrschende Religionen')}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {encyclopedia.religion.primaryReligions}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {l('Ziyaret Kuralları & Saygı Normları', 'Visitor Guidelines & Dress Code', 'Besuchsregeln')}
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {encyclopedia.religion.respectNorms}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kısa Öz Tarihçe & Dönüm Noktaları */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {l('Kısa ve Öz Tarihçe', 'Concise Historical Overview', 'Kurze Geschichte')}
                  </h3>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60">
                  {encyclopedia.history.conciseHistory}
                </p>
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    {l('Tarihin Önemli Dönüm Noktaları', 'Historical Milestones', 'Historische Meilensteine')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {encyclopedia.history.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
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
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {l('Dünya Çapında Tanınan Ünlü İsimler', 'World-Renowned Personalities', 'Berühmte Persönlichkeiten')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {encyclopedia.achievements.famousFigures.map((fig, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 shadow-2xs"
                    >
                      <span className="text-amber-500 font-bold">★</span>
                      <span className="leading-snug">{fig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dünyada Lider Olduğu Alanlar */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    {l('Dünyada Lider veya En Başarılı Olduğu Alanlar', 'Global Leadership & Strong Sectors', 'Führende Wirtschaftszweige')}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {encyclopedia.achievements.strongSectors.map((sector, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 shadow-2xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                      <span className="leading-snug">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ekonomi, Ödeme Kültürü ve Bahşiş */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Ödeme Kültürü */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <CreditCard className="w-4 h-4 text-purple-500" />
                    <span>{l('Kart vs. Nakit Kültürü', 'Cards vs. Cash', 'Zahlungskultur')}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {encyclopedia.economy.paymentCulture}
                  </p>
                </div>

                {/* Bahşiş Kültürü */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span>{l('Bahşiş Teamülü', 'Tipping Culture', 'Trinkgeld')}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {encyclopedia.economy.tippingCulture}
                  </p>
                </div>

                {/* Ekonomik Güç */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <Building className="w-4 h-4 text-sky-500" />
                    <span>{l('Lokomotif Sektörler', 'Economic Pillars', 'Wirtschaftskraft')}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {encyclopedia.economy.economicPillars}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VİZE & GÜVENLİK KARTI (UYGULAMADAKİ TÜM DETAYLAR) */}
          {activeTab === 'visa' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Giriş Rejimi & Vize Şartları */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                      {l('Pasaport Giriş Rejimi ve Kalış Hakları', 'Passport Entry Regime & Stay Allowance', 'Einreiseregelung & Aufenthaltsdauer')}
                    </h3>
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
                    <div className="text-[11px] text-slate-500">
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
                    </div>
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
          <div className="text-[11px] text-slate-500 dark:text-[#8E9DBE] flex items-center gap-2 truncate">
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
