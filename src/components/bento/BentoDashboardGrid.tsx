import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import {
  Search,
  ArrowLeft,
  Minus,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Shield,
  Plane,
  Building2,
  Car,
  Wifi,
  Compass,
  Clock,
  Coins,
  Luggage,
  Laptop,
  PhoneCall,
  Smartphone,
  Calendar,
  Route as RouteIcon,
  Globe,
  ArrowRightLeft,
  ChevronRight
} from 'lucide-react';
import {
  WorldRadar3DIllustration,
  Passports3DIllustration,
  GlobalDayCounter3DIllustration,
  RoutePlanner3DIllustration,
  CurrencyCoins3DIllustration,
  WorldClock3DIllustration,
  Suitcases3DIllustration,
  NomadIsland3DIllustration,
  LifebuoySOS3DIllustration,
  LocalApps3DIllustration
} from './BentoIllustrations';
import { useI18n } from '../../data/i18n';
import { getFlag, getCountryName, getCategoryBadgeLabel, CountryItem } from '../../data/passportData';
import { getPassportItems, compareDualPassports } from '../../utils/calculator';
import { getCrossRate } from '../../data/currencyRates';
import { getCountryNomadApps, MASTER_APPS_DIRECTORY } from '../../data/rideAndDeliveryApps';
import { getCountryConciergePlan } from '../../data/travelConciergeEngine';
import { getCountryInsights } from '../../data/countryInsights';
import { getCountryGeography } from '../../data/countryGeography';
import { TabKey } from '../Navigation';

const CompareTab = lazy(() =>
  import('../CompareTab').then(m => ({ default: m.CompareTab }))
);
const DayCounterTab = lazy(() =>
  import('../DayCounterTab').then(m => ({ default: m.DayCounterTab }))
);
const RoutePlannerTab = lazy(() =>
  import('../RoutePlannerTab').then(m => ({ default: m.RoutePlannerTab }))
);
const NomadToolsTab = lazy(() =>
  import('../NomadToolsTab').then(m => ({ default: m.NomadToolsTab }))
);
const WhereCanIGoTab = lazy(() =>
  import('../WhereCanIGoTab').then(m => ({ default: m.WhereCanIGoTab }))
);

export type BentoWidgetId =
  | 'radar'
  | 'country_research'
  | 'synergy'
  | 'day_counter'
  | 'route_planner'
  | 'currency'
  | 'world_clock'
  | 'packing'
  | 'nomad'
  | 'emergency'
  | 'local_apps'
  | 'affiliate_hub';

interface BentoDashboardGridProps {
  currentPassport: string;
  secondaryPassport?: string;
  onOpenCountryDossier: (code: string) => void;
  onSelectTab: (tab: TabKey) => void;
  onOpenPackingList: () => void;
  onOpenTippingCalc: () => void;
  onOpenTimezoneOverlap: () => void;
  onOpenGlobalRadar: (mode?: 'all' | 'clock' | 'weather' | 'currency', city?: string) => void;
}

const POPULAR_RESEARCH_COUNTRIES = ['TH', 'JP', 'IT', 'ES', 'GR', 'DE', 'AE', 'GE', 'RS', 'ME', 'GB', 'US', 'KR', 'ID', 'BR', 'EG'];

export const BentoDashboardGrid: React.FC<BentoDashboardGridProps> = ({
  currentPassport,
  secondaryPassport = 'DE',
  onOpenCountryDossier,
  onSelectTab: _onSelectTab,
  onOpenPackingList,
  onOpenTippingCalc,
  onOpenTimezoneOverlap,
  onOpenGlobalRadar
}) => {
  const { language, l } = useI18n();

  // Sub-widget modal stack state
  const [widgetStack, setWidgetStack] = useState<Array<{ id: BentoWidgetId; subTab?: string; countryCode?: string }>>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [widgetSearch, setWidgetSearch] = useState<string>('');

  // Interactive card local states
  const [researchCountry, setResearchCountry] = useState<string>('TH');
  const [researchSearch, setResearchSearch] = useState<string>('');
  const [appsCountry, setAppsCountry] = useState<string>('TH');
  const [affiliateCategory, setAffiliateCategory] = useState<'hotel' | 'flight' | 'transfer' | 'insurance' | 'esim'>('hotel');
  const [now, setNow] = useState<Date>(() => new Date());

  // Update live clock every 15 seconds for lightweight crisp display
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);

  // Passport items & stats
  const passportItems = useMemo(() => getPassportItems(currentPassport), [currentPassport]);
  const stats = useMemo(() => {
    let free = 0;
    let evisa = 0;
    let visa = 0;
    passportItems.forEach((it: CountryItem) => {
      if (it.cat === 'free' || it.id) free++;
      else if (it.cat === 'evisa' || it.cat === 'voa' || it.cat === 'eta') evisa++;
      else visa++;
    });
    return { free, evisa, visa, total: passportItems.length || 199 };
  }, [passportItems]);

  // Synergy stats between currentPassport and secondaryPassport (or DE/US fallback)
  const effectiveSecondPassport = secondaryPassport && secondaryPassport !== currentPassport ? secondaryPassport : (currentPassport === 'TR' ? 'DE' : 'TR');
  const synergyStats = useMemo(() => {
    try {
      const comp = compareDualPassports(currentPassport, effectiveSecondPassport);
      const gain = Math.max(0, comp.combinedFreedomScore - comp.scoreA);
      return {
        combinedFree: comp.combinedFreedomScore,
        gain,
        totalEasy: comp.combinedFreedomScore
      };
    } catch {
      return { combinedFree: 162, gain: 51, totalEasy: 185 };
    }
  }, [currentPassport, effectiveSecondPassport]);

  // Live currency rates
  const usdTry = useMemo(() => getCrossRate('USD', 'TRY').toFixed(2), []);
  const eurTry = useMemo(() => getCrossRate('EUR', 'TRY').toFixed(2), []);
  const gbpTry = useMemo(() => getCrossRate('GBP', 'TRY').toFixed(2), []);

  // World clocks
  const formatCityTime = (offsetHours: number) => {
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const d = new Date(utc + offsetHours * 3600000);
    return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Local apps for selected appsCountry
  const localAppsList = useMemo(() => {
    const insights = getCountryInsights(appsCountry, language);
    return getCountryNomadApps(appsCountry, insights.transport.popularRideApps);
  }, [appsCountry, language]);

  // Concierge / Affiliate plan for researchCountry
  const conciergePlan = useMemo(
    () => getCountryConciergePlan(researchCountry, currentPassport),
    [researchCountry, currentPassport]
  );

  // Open a sub-widget window
  const openWidget = (id: BentoWidgetId, subTab?: string, countryCode?: string) => {
    setIsMinimized(false);
    setWidgetSearch('');
    setWidgetStack(prev => [...prev, { id, subTab, countryCode }]);
  };

  const goBackWidget = () => {
    setWidgetSearch('');
    setWidgetStack(prev => (prev.length > 1 ? prev.slice(0, -1) : []));
  };

  const closeAllWidgets = () => {
    setWidgetStack([]);
    setIsFullscreen(false);
    setIsMinimized(false);
    setWidgetSearch('');
  };

  const activeWidget = widgetStack.length > 0 ? widgetStack[widgetStack.length - 1] : null;

  const setActiveSubTab = (subTab: string) => {
    setWidgetStack(prev => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      copy[copy.length - 1] = { ...copy[copy.length - 1], subTab };
      return copy;
    });
  };

  // Filtered countries for research widget
  const matchingResearchCountries = useMemo(() => {
    if (!researchSearch.trim()) return POPULAR_RESEARCH_COUNTRIES.slice(0, 6);
    const q = researchSearch.trim().toLocaleLowerCase('tr');
    return passportItems
      .filter(it => getCountryName(it.c, language).toLocaleLowerCase('tr').includes(q) || it.c.toLowerCase().includes(q))
      .slice(0, 6)
      .map(it => it.c);
  }, [researchSearch, passportItems, language]);

  return (
    <section aria-label={l('Vizamigo Akıllı Seyahat Panosu', 'Vizamigo Smart Travel Bento Dashboard')} className="space-y-4">
      {/* Section Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-[#0D9488] to-[#0EA5E9] text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            {l('Akıllı Tatil & Vize Komuta Merkezi', 'Smart Holiday & Visa Command Center')}
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/12 text-[#0F766E] dark:text-[#2DD4BF] border border-teal-500/25">
            {l('12 Canlı Modül · Tıkla & Keşfet', '12 Live Modules · Click & Explore')}
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          {l('Detaylı alt sekmeler ve tam ekran görünüm için kartlara tıklayın', 'Click any widget for sub-tabs & fullscreen view')}
        </div>
      </div>

      {/* =====================================================================
          12-CARD LAGOON BENTO GRID (ZERO EMPTY SLOTS ON DESKTOP & MOBILE)
      ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* -----------------------------------------------------------------
            1. NEREYE GİDEBİLİRİM? (DÜNYA RADARI) — 6 cols on lg
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('radar', 'map')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('radar', 'map')}
          className="lg:col-span-6 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between min-h-[235px]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF] border border-teal-500/25">
                <Globe className="w-3 h-3" />
                {l('Canlı Dünya Radarı', 'Live World Radar')}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1.5 group-hover:text-[#0F766E] dark:group-hover:text-[#2DD4BF] transition-colors">
                {l('Nereye Gidebilirim?', 'Where Can I Go?')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {l(
                  `${getFlag(currentPassport)} ${getCountryName(currentPassport, language)} pasaportuyla anında vizesiz rotalar`,
                  `Instant visa-free routes with ${getFlag(currentPassport)} ${getCountryName(currentPassport, language)} passport`
                )}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
              {stats.free} {l('Vizesiz', 'Visa-Free')}
            </span>
          </div>

          <div className="my-2">
            <WorldRadar3DIllustration />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-teal-500/15 dark:border-white/10">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                🟢 {stats.free} {l('Vizesiz', 'Free')}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500/15 text-sky-800 dark:text-sky-300">
                🔵 {stats.evisa} {l('E-Vize / Kapıda', 'eVisa / VoA')}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300">
                🟠 {stats.visa} {l('Vize', 'Visa')}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#0F766E] dark:text-[#2DD4BF] group-hover:translate-x-0.5 transition-transform">
              {l('Haritayı Aç', 'Open Radar')} <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            2. ÜLKE ARAŞTIRMA MERKEZİ (HER ŞEY TEK EKRANDA) — 6 cols on lg
        ----------------------------------------------------------------- */}
        <div
          className="lg:col-span-6 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 transition-all duration-300 flex flex-col justify-between min-h-[235px]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-500/15 text-sky-800 dark:text-sky-300 border border-sky-500/25">
                <Compass className="w-3 h-3" />
                {l('199 Ülke Ansiklopedisi', '199 Country Encyclopedia')}
              </span>
              <h3
                onClick={() => openWidget('country_research', 'visa', researchCountry)}
                className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1.5 cursor-pointer hover:text-[#0F766E] dark:hover:text-[#2DD4BF] transition-colors"
              >
                {l('Ülke Araştırma Merkezi', 'Country Research Hub')}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onOpenCountryDossier(researchCountry)}
              className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs hover:opacity-95 cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <span>{getFlag(researchCountry)} {getCountryName(researchCountry, language)}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Country Search & Popular Country Selector Pills */}
          <div className="my-2.5 space-y-2">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] absolute left-3 pointer-events-none" />
              <input
                type="search"
                value={researchSearch}
                onChange={(e) => setResearchSearch(e.target.value)}
                placeholder={l('Ülke seçin veya yazın (Tayland, Japonya, İtalya...)', 'Pick or type a country (Thailand, Japan, Italy...)')}
                className="w-full pl-8 pr-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-white/[0.07] border border-teal-600/25 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {matchingResearchCountries.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setResearchCountry(code)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    researchCountry === code
                      ? 'bg-[#0D9488] text-white shadow-2xs'
                      : 'bg-teal-500/10 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 hover:bg-teal-500/20'
                  }`}
                >
                  <span>{getFlag(code)}</span>
                  <span>{getCountryName(code, language)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 8 Category Sub-Tab Pills that open the Country Research Sub-Widget or Dossier */}
          <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-teal-500/15 dark:border-white/10">
            {[
              { key: 'visa', label: l('🛂 Vize', '🛂 Visa') },
              { key: 'practical', label: l('🔌 Pratik', '🔌 Practical') },
              { key: 'safety', label: l('🛡️ Güvenlik', '🛡️ Safety') },
              { key: 'culture', label: l('🎭 Kültür', '🎭 Culture') },
              { key: 'route', label: l('🗺️ Rota', '🗺️ Route') },
              { key: 'weather', label: l('☀️ Sezon', '☀️ Season') },
              { key: 'emergency', label: l('🆘 Acil', '🆘 SOS') },
              { key: 'apps', label: l('📲 Uygulama', '📲 Apps') }
            ].map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => openWidget('country_research', cat.key, researchCountry)}
                className="px-2 py-1.5 rounded-xl text-[11px] font-bold bg-white/80 dark:bg-white/[0.05] hover:bg-teal-500/15 dark:hover:bg-teal-400/15 text-slate-800 dark:text-slate-200 border border-teal-500/15 dark:border-white/10 transition-all cursor-pointer truncate text-center"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------------
            3. PASAPORT SİNERJİSİ & KARŞILAŞTIR — 4 cols on lg
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('synergy', 'overview')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('synergy', 'overview')}
          className="lg:col-span-4 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between min-h-[215px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF]">
                {l('İkili Karşılaştırma', 'Dual Compare')}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-[#0F766E] dark:group-hover:text-[#2DD4BF] transition-colors">
                {l('Pasaport Sinerjisi', 'Passport Synergy')}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF] border border-teal-500/25">
              {synergyStats.combinedFree} {l('Ülke', 'Countries')}
            </span>
          </div>

          <div className="my-2">
            <Passports3DIllustration
              codeA={currentPassport}
              codeB={effectiveSecondPassport}
              synergyCount={synergyStats.combinedFree}
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-teal-500/15 dark:border-white/10">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {getFlag(currentPassport)} {currentPassport} + {getFlag(effectiveSecondPassport)} {effectiveSecondPassport} ({l(`+${synergyStats.gain} ek vizesiz`, `+${synergyStats.gain} extra`)})
            </span>
            <span className="font-extrabold text-[#0F766E] dark:text-[#2DD4BF] group-hover:translate-x-0.5 transition-transform">
              {l('Karşılaştır →', 'Compare →')}
            </span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            4. DÜNYA GÜN SAYACI (TÜM DÜNYA & SCHENGEN 90/180) — 4 cols on lg
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('day_counter', 'schengen')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('day_counter', 'schengen')}
          className="lg:col-span-4 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between min-h-[215px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                {l('Tüm Dünya & Schengen', 'Global & Schengen')}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-[#0F766E] dark:group-hover:text-[#2DD4BF] transition-colors">
                {l('Dünya Gün Sayacı', 'World Day Counter')}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
              90 / 180 {l('Gün', 'Days')}
            </span>
          </div>

          <div className="my-2">
            <GlobalDayCounter3DIllustration usedDays={42} maxDays={90} />
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-teal-500/15 dark:border-white/10">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {l('Schengen, ABD, İngiltere, Tayland & Japonya', 'Schengen, US, UK, Thailand & Japan')}
            </span>
            <span className="font-extrabold text-[#0F766E] dark:text-[#2DD4BF] group-hover:translate-x-0.5 transition-transform">
              {l('Hesapla →', 'Track →')}
            </span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            5. ROTA PLANLAYICI — 4 cols on lg
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('route_planner', 'builder')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('route_planner', 'builder')}
          className="lg:col-span-4 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between min-h-[215px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-500/15 text-sky-800 dark:text-sky-300">
                {l('Çoklu Durak & Transit', 'Multi-Stop & Transit')}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-[#0F766E] dark:group-hover:text-[#2DD4BF] transition-colors">
                {l('Rota Planlayıcı', 'Route Planner')}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-sky-500/15 text-sky-800 dark:text-sky-300">
              3 {l('Durak', 'Stops')}
            </span>
          </div>

          <div className="my-2">
            <RoutePlanner3DIllustration />
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-teal-500/15 dark:border-white/10">
            <span className="font-bold text-slate-700 dark:text-slate-300 truncate">
              🇹🇷 İST ➔ 🇬🇷 ATİ ➔ 🇯🇵 TYO ({l('Vize & Transit Kontrolü', 'Visa & Transit Check')})
            </span>
            <span className="font-extrabold text-[#0F766E] dark:text-[#2DD4BF] shrink-0 ml-1 group-hover:translate-x-0.5 transition-transform">
              {l('Planla →', 'Plan →')}
            </span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            6. DÖVİZ & BÜTÇE — 3 cols on lg
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('currency', 'converter')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('currency', 'converter')}
          className="lg:col-span-3 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between min-h-[210px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
                {l('Canlı Kur & Sokak Fiyatı', 'Live FX & Street Cost')}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {l('Döviz & Bütçe', 'Currency & Budget')}
              </h3>
            </div>
            <Coins className="w-4 h-4 text-[#0F766E] dark:text-[#2DD4BF]" />
          </div>

          <div className="my-1.5">
            <CurrencyCoins3DIllustration />
          </div>

          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-teal-500/15 dark:border-white/10 text-center">
            <div className="px-1.5 py-1 rounded-xl bg-white/80 dark:bg-white/[0.05]">
              <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">USD/TRY</div>
              <div className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">₺{usdTry}</div>
            </div>
            <div className="px-1.5 py-1 rounded-xl bg-white/80 dark:bg-white/[0.05]">
              <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">EUR/TRY</div>
              <div className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">₺{eurTry}</div>
            </div>
            <div className="px-1.5 py-1 rounded-xl bg-white/80 dark:bg-white/[0.05]">
              <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">GBP/TRY</div>
              <div className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">₺{gbpTry}</div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            7. DÜNYA SAATİ & ZAMAN DİLİMİ — 3 cols on lg
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('world_clock', 'clocks')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('world_clock', 'clocks')}
          className="lg:col-span-3 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between min-h-[210px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                {l('Zaman Dilimi & Mesai', 'Timezones & Overlap')}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {l('Dünya Saati', 'World Clock')}
              </h3>
            </div>
            <Clock className="w-4 h-4 text-[#0F766E] dark:text-[#2DD4BF]" />
          </div>

          <div className="my-1.5">
            <WorldClock3DIllustration />
          </div>

          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-teal-500/15 dark:border-white/10 text-center">
            <div className="px-1.5 py-1 rounded-xl bg-white/80 dark:bg-white/[0.05]">
              <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">🇹🇷 İST</div>
              <div className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">{formatCityTime(3)}</div>
            </div>
            <div className="px-1.5 py-1 rounded-xl bg-white/80 dark:bg-white/[0.05]">
              <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">🇯🇵 TYO</div>
              <div className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">{formatCityTime(9)}</div>
            </div>
            <div className="px-1.5 py-1 rounded-xl bg-white/80 dark:bg-white/[0.05]">
              <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">🇺🇸 NYC</div>
              <div className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">{formatCityTime(-4)}</div>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            8. AKILLI BAVUL HAZIRLAMA — 3 cols on lg
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('packing', 'documents')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('packing', 'documents')}
          className="lg:col-span-3 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between min-h-[210px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                {l('İklime Göre Valiz', 'Climate Packing')}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {l('Bavul Hazırlama', 'Smart Packing')}
              </h3>
            </div>
            <Luggage className="w-4 h-4 text-[#0F766E] dark:text-[#2DD4BF]" />
          </div>

          <div className="my-1.5">
            <Suitcases3DIllustration progress={75} />
          </div>

          <div className="flex items-center justify-between gap-1 pt-2 border-t border-teal-500/15 dark:border-white/10">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                ✓ {l('Evrak', 'Docs')}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF]">
                ✓ {l('Kabin', 'Cabin')}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-800 dark:text-sky-300">
                🔌 {l('Adaptör', 'Plug')}
              </span>
            </div>
            <span className="text-xs font-extrabold text-[#0F766E] dark:text-[#2DD4BF]">→</span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            9. DİJİTAL GÖÇEBE (NOMAD) REHBERİ — 3 cols on lg
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('nomad', 'hubs')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('nomad', 'hubs')}
          className="lg:col-span-3 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between min-h-[210px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
                {l('Uzaktan Çalışma & Wi-Fi', 'Remote Work & Wi-Fi')}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {l('Dijital Göçebe', 'Digital Nomad')}
              </h3>
            </div>
            <Laptop className="w-4 h-4 text-[#0F766E] dark:text-[#2DD4BF]" />
          </div>

          <div className="my-1.5">
            <NomadIsland3DIllustration />
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-teal-500/15 dark:border-white/10">
            <span className="font-bold text-slate-700 dark:text-slate-300 truncate">
              🌴 Bali · Bangkok · Lizbon · Tiflis
            </span>
            <span className="font-extrabold text-[#0F766E] dark:text-[#2DD4BF] shrink-0">→</span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            10. ACİL YARDIM & KONSOLOSLUK — 3 cols on lg
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('emergency', 'sos')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('emergency', 'sos')}
          className="lg:col-span-3 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between min-h-[225px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500/15 text-rose-800 dark:text-rose-300">
                SOS · 7/24
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                {l('Acil & Konsolosluk', 'SOS & Embassies')}
              </h3>
            </div>
            <PhoneCall className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>

          <div className="my-1.5">
            <LifebuoySOS3DIllustration />
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-teal-500/15 dark:border-white/10">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {l('Elçilikler & Kayıp Pasaport', 'Embassies & Lost Passport')}
            </span>
            <span className="font-extrabold text-[#0F766E] dark:text-[#2DD4BF]">→</span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            11. ÜLKE İÇİ GEÇERLİ UYGULAMALAR — 4 cols on lg
        ----------------------------------------------------------------- */}
        <div
          className="lg:col-span-4 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 transition-all duration-300 flex flex-col justify-between min-h-[225px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div onClick={() => openWidget('local_apps', 'ride', appsCountry)} className="cursor-pointer">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF]">
                <Smartphone className="w-3 h-3" />
                {l('Taksi · Harita · Yemek · eSIM', 'Taxi · Map · Food · eSIM')}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-[#0F766E] dark:group-hover:text-[#2DD4BF] transition-colors">
                {l('Ülke İçi Geçerli Uygulamalar', 'Valid Local Apps by Country')}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => openWidget('local_apps', 'ride', appsCountry)}
              className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF] cursor-pointer shrink-0"
            >
              {l('Tümü →', 'All →')}
            </button>
          </div>

          {/* Quick Country Selector Pills for Local Apps */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar my-1.5">
            {(['TH', 'JP', 'GE', 'DE', 'AE', 'KR', 'ID', 'GB'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setAppsCountry(c)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all ${
                  appsCountry === c
                    ? 'bg-[#0D9488] text-white shadow-2xs'
                    : 'bg-white/80 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 hover:bg-teal-500/15'
                }`}
              >
                {getFlag(c)} {getCountryName(c, language)}
              </button>
            ))}
          </div>

          {/* Active Local Apps for that country */}
          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-teal-500/15 dark:border-white/10">
            {localAppsList.slice(0, 2).map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-1.5 no-underline transition-all"
              >
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{app.name}</div>
                  <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 truncate">
                    {language === 'tr' ? app.categoryLabelTr : app.categoryLabelEn}
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------------
            12. SEYAHAT ORTAKLARI & FIRSATLAR (AFFILIATE MERKEZİ) — 5 cols on lg
        ----------------------------------------------------------------- */}
        <div
          className="lg:col-span-5 group relative overflow-hidden rounded-[26px] bento-lagoon-card p-5 transition-all duration-300 flex flex-col justify-between min-h-[225px]"
        >
          <div className="flex items-start justify-between gap-2">
            <div onClick={() => openWidget('affiliate_hub', affiliateCategory, researchCountry)} className="cursor-pointer">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                <Sparkles className="w-3 h-3" />
                {l('Güvenilir Rezervasyon & Fırsatlar', 'Trusted Booking & Deals')}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-[#0F766E] dark:group-hover:text-[#2DD4BF] transition-colors">
                {l('Seyahat Ortakları & Fırsatlar', 'Travel Partners & Deals')}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => openWidget('affiliate_hub', affiliateCategory, researchCountry)}
              className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#10B981] text-white shadow-xs hover:opacity-95 cursor-pointer shrink-0"
            >
              {l('Fırsatı Gör →', 'View Deals →')}
            </button>
          </div>

          {/* Category Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar my-1.5">
            {[
              { id: 'hotel' as const, label: l('🏨 Otel', '🏨 Hotel') },
              { id: 'flight' as const, label: l('✈️ Uçak', '✈️ Flight') },
              { id: 'transfer' as const, label: l('🚕 Transfer', '🚕 Transit') },
              { id: 'insurance' as const, label: l('🛡️ Sigorta', '🛡️ Insurance') },
              { id: 'esim' as const, label: l('📶 eSIM', '📶 eSIM') }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAffiliateCategory(tab.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all ${
                  affiliateCategory === tab.id
                    ? 'bg-[#0D9488] text-white shadow-2xs'
                    : 'bg-white/80 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 hover:bg-teal-500/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Partner Deal Preview */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-teal-500/15 dark:border-white/10">
            {affiliateCategory === 'hotel' && (
              <>
                <a
                  href="https://www.agoda.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 no-underline"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">Agoda & Booking</div>
                    <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{l('%35’e Varan İndirim', 'Up to 35% Off')}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </a>
                <a
                  href="https://www.hostelworld.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 no-underline"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">Hostelworld</div>
                    <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">{l('Sosyal & Ekonomik', 'Social & Budget')}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </a>
              </>
            )}
            {affiliateCategory === 'flight' && (
              <>
                <a
                  href="https://www.skyscanner.com.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 no-underline"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">Skyscanner</div>
                    <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{l('En Ucuz Ay Radarı', 'Cheapest Month')}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </a>
                <a
                  href="https://wayaway.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 no-underline"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">WayAway</div>
                    <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">{l('Nakit İadeli Bilet', 'Cashback Flights')}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </a>
              </>
            )}
            {affiliateCategory === 'transfer' && (
              <>
                <a
                  href="https://kiwitaxi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 no-underline"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">Kiwitaxi</div>
                    <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{l('Havalimanı Karşılama', 'Airport Pickup')}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </a>
                <a
                  href="https://gettransfer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 no-underline"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">GetTransfer</div>
                    <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">{l('VIP & Grup Transfer', 'VIP & Group')}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </a>
              </>
            )}
            {affiliateCategory === 'insurance' && (
              <>
                <a
                  href="https://safetywing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 no-underline"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">SafetyWing</div>
                    <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{l('Vize Uyumlu Poliçe', 'Visa Compliant')}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </a>
                <button
                  type="button"
                  onClick={() => openWidget('affiliate_hub', 'insurance', researchCountry)}
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 text-left cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">Schengen 30.000€</div>
                    <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">{l('Anında Teklif Al', 'Instant Quote')}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </button>
              </>
            )}
            {affiliateCategory === 'esim' && (
              <>
                <a
                  href="https://www.airalo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 no-underline"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">Airalo eSIM</div>
                    <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{l('200+ Ülkede Anında 5G', 'Instant 5G in 200+')}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </a>
                <a
                  href="https://preply.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/85 dark:bg-white/[0.05] hover:bg-teal-500/15 border border-teal-500/15 dark:border-white/10 flex items-center justify-between gap-2 no-underline"
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">Preply Dil</div>
                    <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">{l('Yerel Dil Pratiği', 'Local Language')}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          MINIMIZED SUB-WIDGET DOCK BAR (When user clicks [ — Küçült ])
      ===================================================================== */}
      {activeWidget && isMinimized && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#06283D] to-[#0D9488] text-white shadow-2xl border border-teal-300/40">
          <Sparkles className="w-4 h-4 text-teal-200" />
          <span className="text-xs font-extrabold">
            {l('Açık Pencere:', 'Active Widget:')} {activeWidget.id.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-[11px] font-bold cursor-pointer"
          >
            {l('Büyüt ⛶', 'Restore ⛶')}
          </button>
          <button
            type="button"
            onClick={closeAllWidgets}
            className="p-1 rounded-full hover:bg-white/20 cursor-pointer"
            title={l('Kapat', 'Close')}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =====================================================================
          SUB-WIDGET DETAIL WINDOW MODAL ([ ← Geri ] + [ — ] [ ⛶ ] [ ✕ ] + Search + Sub-Tabs)
      ===================================================================== */}
      {activeWidget && !isMinimized && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center ${
            isFullscreen ? 'p-0' : 'p-0 sm:p-4 md:p-6'
          } bg-slate-950/75 backdrop-blur-md`}
          onClick={closeAllWidgets}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${
              isFullscreen
                ? 'fixed inset-0 w-screen h-screen rounded-none max-w-none max-h-none'
                : 'relative w-full sm:max-w-5xl h-[92dvh] sm:h-[86vh] rounded-t-[28px] sm:rounded-[28px]'
            } flex flex-col overflow-hidden bg-[#F0FDFA] dark:bg-[#051824] border border-teal-500/30 dark:border-teal-400/25 shadow-2xl transition-all`}
          >
            {/* 1. TOP WINDOW BAR ([ ← Geri ] | Title | [ — ] [ ⛶ ] [ ✕ ]) */}
            <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#0D9488]/15 via-[#0EA5E9]/10 to-[#10B981]/15 dark:from-[#0A2538] dark:via-[#071E30] dark:to-[#0A2538] border-b border-teal-500/20 dark:border-white/10 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={widgetStack.length > 1 ? goBackWidget : closeAllWidgets}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-white/90 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-teal-500 hover:text-white transition-all cursor-pointer shadow-2xs shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{widgetStack.length > 1 ? l('Geri', 'Back') : l('Panoya Dön', 'Dashboard')}</span>
                </button>

                <div className="min-w-0">
                  <h2 className="text-sm sm:text-lg font-extrabold text-slate-900 dark:text-white truncate">
                    {activeWidget.id === 'radar' && l('🌍 Nereye Gidebilirim? — Canlı Dünya Radarı', '🌍 Where Can I Go? — Live World Radar')}
                    {activeWidget.id === 'country_research' && `${getFlag(activeWidget.countryCode || researchCountry)} ${getCountryName(activeWidget.countryCode || researchCountry, language)} — ${l('Ülke Araştırma & Rehber Merkezi', 'Country Research & Guide Hub')}`}
                    {activeWidget.id === 'synergy' && l('🛂 Pasaport Sinerjisi & İkili Karşılaştırma', '🛂 Passport Synergy & Dual Comparison')}
                    {activeWidget.id === 'day_counter' && l('⏳ Dünya Gün Sayacı — Tüm Dünya & Schengen 90/180', '⏳ World Day Counter — Global & Schengen 90/180')}
                    {activeWidget.id === 'route_planner' && l('🗺️ Çok Duraklı Rota & Transit Vize Planlayıcı', '🗺️ Multi-Stop Route & Transit Visa Planner')}
                    {activeWidget.id === 'currency' && l('💱 Döviz, Sokak Fiyatları & Seyahat Bütçesi', '💱 Currency, Street Prices & Travel Budget')}
                    {activeWidget.id === 'world_clock' && l('🕒 Dünya Saati, Zaman Dilimi & Mesai Çakışması', '🕒 World Clock, Timezone & Working Hours')}
                    {activeWidget.id === 'packing' && l('🧳 Akıllı Bavul & Seyahat Evrak Listesi', '🧳 Smart Packing & Travel Document Checklist')}
                    {activeWidget.id === 'nomad' && l('💻 Dijital Göçebe (Nomad) Üsleri & Uzaktan Çalışma', '💻 Digital Nomad Hubs & Remote Work')}
                    {activeWidget.id === 'emergency' && l('🆘 Acil Yardım, 112/911 & T.C. Konsolosluk Rehberi', '🆘 Emergency SOS, 112/911 & Consular Guide')}
                    {activeWidget.id === 'local_apps' && `${getFlag(activeWidget.countryCode || appsCountry)} ${getCountryName(activeWidget.countryCode || appsCountry, language)} — ${l('Ülke İçi Geçerli Uygulamalar', 'Valid Local Apps')}`}
                    {activeWidget.id === 'affiliate_hub' && l('🤝 Seyahat Ortakları, Otel, Uçuş, Sigorta & eSIM Fırsatları', '🤝 Travel Partners, Flights, Hotels, Insurance & eSIM')}
                  </h2>
                </div>
              </div>

              {/* Window Control Buttons: Minimize [ — ], Fullscreen [ ⛶ ], Close [ ✕ ] */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-2 rounded-full bg-white/80 dark:bg-white/10 hover:bg-teal-500/20 text-slate-700 dark:text-slate-200 cursor-pointer transition-all"
                  title={l('Küçült', 'Minimize')}
                  aria-label={l('Küçült', 'Minimize')}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-full bg-white/80 dark:bg-white/10 hover:bg-teal-500/20 text-slate-700 dark:text-slate-200 cursor-pointer transition-all"
                  title={isFullscreen ? l('Normal Boyut', 'Restore Size') : l('Ekranı Kapla', 'Fullscreen')}
                  aria-label={isFullscreen ? l('Normal Boyut', 'Restore Size') : l('Ekranı Kapla', 'Fullscreen')}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={closeAllWidgets}
                  className="p-2 rounded-full bg-rose-500/15 hover:bg-rose-500 text-rose-700 dark:text-rose-300 hover:text-white cursor-pointer transition-all"
                  title={l('Kapat', 'Close')}
                  aria-label={l('Kapat', 'Close')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. IN-WIDGET SEARCH BAR + SUB-TAB PILLS */}
            <div className="px-4 sm:px-6 py-3 bg-white/75 dark:bg-[#071E30]/90 border-b border-teal-500/15 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shrink-0">
              {/* Sub-Tabs for the active widget */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {activeWidget.id === 'country_research' &&
                  [
                    { k: 'visa', label: l('🛂 Vize & Giriş', '🛂 Visa & Entry') },
                    { k: 'practical', label: l('🔌 Pratik Bilgi', '🔌 Practical Info') },
                    { k: 'safety', label: l('🛡️ Güvenlik', '🛡️ Safety') },
                    { k: 'culture', label: l('🎭 Kültür & Bahşiş', '🎭 Culture & Tipping') },
                    { k: 'apps', label: l('📲 Yerel Uygulamalar', '📲 Local Apps') },
                    { k: 'deals', label: l('🤝 Otel & Uçak Fırsatları', '🤝 Deals & Partners') }
                  ].map((t) => (
                    <button
                      key={t.k}
                      type="button"
                      onClick={() => setActiveSubTab(t.k)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                        (activeWidget.subTab || 'visa') === t.k
                          ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs'
                          : 'bg-teal-500/10 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 hover:bg-teal-500/20'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}

                {activeWidget.id === 'local_apps' &&
                  [
                    { k: 'ride', label: l('🚕 Taksi & Ulaşım', '🚕 Taxi & Ride') },
                    { k: 'delivery', label: l('🍔 Yemek & Market', '🍔 Food & Grocery') },
                    { k: 'esim', label: l('📶 eSIM & İletişim', '📶 eSIM & Data') },
                    { k: 'all_directory', label: l('🌍 Tüm Global Uygulamalar', '🌍 All Global Apps') }
                  ].map((t) => (
                    <button
                      key={t.k}
                      type="button"
                      onClick={() => setActiveSubTab(t.k)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                        (activeWidget.subTab || 'ride') === t.k
                          ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs'
                          : 'bg-teal-500/10 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 hover:bg-teal-500/20'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}

                {activeWidget.id === 'affiliate_hub' &&
                  [
                    { k: 'hotel', label: l('🏨 Otel & Konaklama', '🏨 Hotels') },
                    { k: 'flight', label: l('✈️ Uçak Bileti', '✈️ Flights') },
                    { k: 'transfer', label: l('🚕 Transfer & Taksi', '🚕 Transfers') },
                    { k: 'insurance', label: l('🛡️ Seyahat Sigortası', '🛡️ Insurance') },
                    { k: 'esim', label: l('📶 eSIM & Dil', '📶 eSIM & Language') }
                  ].map((t) => (
                    <button
                      key={t.k}
                      type="button"
                      onClick={() => setActiveSubTab(t.k)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                        (activeWidget.subTab || 'hotel') === t.k
                          ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs'
                          : 'bg-teal-500/10 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 hover:bg-teal-500/20'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}

                {activeWidget.id === 'synergy' &&
                  [
                    { k: 'overview', label: l('🔗 Sinerji & Ortak Ülkeler', '🔗 Synergy & Shared') },
                    { k: 'full_compare', label: l('📊 199 Ülke Tam Tablo', '📊 Full 199 Matrix') }
                  ].map((t) => (
                    <button
                      key={t.k}
                      type="button"
                      onClick={() => setActiveSubTab(t.k)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                        (activeWidget.subTab || 'overview') === t.k
                          ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs'
                          : 'bg-teal-500/10 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
              </div>

              {/* In-Widget Search Bar */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={widgetSearch}
                  onChange={(e) => setWidgetSearch(e.target.value)}
                  placeholder={l('Bu bölümde ara...', 'Search inside widget...')}
                  className="w-full pl-8 pr-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-white/[0.08] border border-teal-500/25 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                />
              </div>
            </div>

            {/* 3. SUB-WIDGET BODY CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* --- A. COUNTRY RESEARCH HUB SUB-WIDGET --- */}
              {activeWidget.id === 'country_research' && (() => {
                const targetCode = activeWidget.countryCode || researchCountry;
                const insights = getCountryInsights(targetCode, language);
                const geo = getCountryGeography(targetCode, language);
                const item = passportItems.find(i => i.c === targetCode);
                const apps = getCountryNomadApps(targetCode, insights.transport.popularRideApps);
                const cPlan = getCountryConciergePlan(targetCode, currentPassport);

                return (
                  <div className="space-y-5">
                    {/* Country Switcher Strip inside Sub-Widget */}
                    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{getFlag(targetCode)}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                              {getCountryName(targetCode, language)}
                            </h3>
                            {item && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                                {getCategoryBadgeLabel(item, language)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300">
                            {geo?.capital ? `${l('Başkent:', 'Capital:')} ${geo.capital}` : ''} · {geo?.currencyName || 'USD'} ({geo?.currencySymbol || '$'}) · {geo?.timeZone || 'UTC'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          closeAllWidgets();
                          onOpenCountryDossier(targetCode);
                        }}
                        className="px-4 py-2 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-sm hover:opacity-95 cursor-pointer"
                      >
                        {l('360° Tam Ülke Dosyasını Aç →', 'Open Full 360° Country Dossier →')}
                      </button>
                    </div>

                    {/* Quick Country Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                      {POPULAR_RESEARCH_COUNTRIES.filter(c =>
                        !widgetSearch.trim() || getCountryName(c, language).toLocaleLowerCase('tr').includes(widgetSearch.toLocaleLowerCase('tr'))
                      ).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setResearchCountry(c);
                            setWidgetStack(prev => {
                              const copy = [...prev];
                              copy[copy.length - 1] = { ...copy[copy.length - 1], countryCode: c };
                              return copy;
                            });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                            targetCode === c
                              ? 'bg-[#0D9488] text-white'
                              : 'bg-white/80 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 hover:bg-teal-500/15'
                          }`}
                        >
                          {getFlag(c)} {getCountryName(c, language)}
                        </button>
                      ))}
                    </div>

                    {/* Tab-specific rich cards */}
                    {(activeWidget.subTab || 'visa') === 'visa' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20 space-y-2">
                          <h4 className="text-sm font-extrabold text-[#0F766E] dark:text-[#2DD4BF]">
                            🛂 {l('Vize & Sınır Giriş Kuralı', 'Visa & Border Entry Rule')}
                          </h4>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {item ? getCategoryBadgeLabel(item, language) : l('Vize Bilgisi', 'Visa Info')}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {l(
                              'Pasaportunuzun seyahat dönüş tarihinden itibaren en az 6 ay geçerli olması, gidiş-dönüş bilet ve konaklama rezervasyonunun hazır bulunması önerilir.',
                              'Ensure your passport has at least 6 months validity beyond return date, along with return ticket and hotel booking.'
                            )}
                          </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20 space-y-2">
                          <h4 className="text-sm font-extrabold text-[#0F766E] dark:text-[#2DD4BF]">
                            🛡️ {l('Seyahat Sağlık Sigortası & Evrak', 'Travel Insurance & Documents')}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {l(
                              'Sınır kontrolünde 30.000€ teminatlı seyahat sağlık sigortası ve yeterli bakiye kanıtı talep edilebilir.',
                              'Border officers may request 30,000€ medical coverage insurance and proof of funds.'
                            )}
                          </p>
                          <a
                            href="https://safetywing.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F766E] dark:text-[#2DD4BF] hover:underline"
                          >
                            {l('Vize Uyumlu Sigorta Teklifi Al →', 'Get Visa-Compliant Insurance Quote →')}
                          </a>
                        </div>
                      </div>
                    )}

                    {activeWidget.subTab === 'practical' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20">
                          <div className="text-xs font-bold text-slate-500">{l('Priz & Voltaj', 'Plug & Voltage')}</div>
                          <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">{geo?.plugTypes || insights.plugType}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20">
                          <div className="text-xs font-bold text-slate-500">{l('Şebeke Suyu', 'Tap Water')}</div>
                          <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">{insights.waterSafety}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20">
                          <div className="text-xs font-bold text-slate-500">{l('Ödeme & Kart', 'Cards & Cash')}</div>
                          <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">{insights.paymentCulture}</div>
                        </div>
                      </div>
                    )}

                    {activeWidget.subTab === 'safety' && (
                      <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20 space-y-2">
                        <h4 className="text-sm font-extrabold text-[#0F766E] dark:text-[#2DD4BF]">
                          🛡️ {l('Güvenlik Seviyesi & Acil Numaralar', 'Safety Level & Emergency Numbers')}
                        </h4>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{insights.safetyLevel}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {l('Acil Yardım:', 'Emergency:')} <b>{insights.emergencyNumber}</b> · {l('En İyi Sezon:', 'Best Season:')} <b>{insights.bestSeason}</b>
                        </p>
                      </div>
                    )}

                    {activeWidget.subTab === 'culture' && (
                      <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20 space-y-2">
                        <h4 className="text-sm font-extrabold text-[#0F766E] dark:text-[#2DD4BF]">
                          🎭 {l('Bahşiş & Yerel Kültür', 'Tipping & Local Etiquette')}
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{insights.tippingCulture}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{insights.culturalNorms}</p>
                      </div>
                    )}

                    {activeWidget.subTab === 'apps' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {apps.map((app) => (
                          <a
                            key={app.name}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20 hover:border-teal-500 flex items-center justify-between gap-3 no-underline"
                          >
                            <div>
                              <div className="text-sm font-extrabold text-slate-900 dark:text-white">{app.name}</div>
                              <div className="text-xs font-semibold text-[#0F766E] dark:text-[#2DD4BF]">
                                {language === 'tr' ? app.categoryLabelTr : app.categoryLabelEn}
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                                {language === 'tr' ? app.recommendedReasonTr : app.recommendedReasonEn}
                              </p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                          </a>
                        ))}
                      </div>
                    )}

                    {activeWidget.subTab === 'deals' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {cPlan.stages.map((st) => (
                          <a
                            key={st.stage}
                            href={st.primaryPartner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20 hover:border-teal-500 flex items-center justify-between gap-3 no-underline"
                          >
                            <div>
                              <div className="text-[11px] font-bold text-[#0F766E] dark:text-[#2DD4BF]">
                                {st.stepNumber} · {language === 'tr' ? st.titleTr : st.titleEn}
                              </div>
                              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                                {st.primaryPartner.brand}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                                {language === 'tr' ? st.primaryPartner.taglineTr : st.primaryPartner.taglineEn}
                              </div>
                            </div>
                            <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-[#0D9488] text-white shrink-0">
                              {language === 'tr' ? st.primaryPartner.ctaTr : st.primaryPartner.ctaEn}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- B. LOCAL APPS SUB-WIDGET --- */}
              {activeWidget.id === 'local_apps' && (() => {
                const targetCode = activeWidget.countryCode || appsCountry;
                const insights = getCountryInsights(targetCode, language);
                const countryApps = getCountryNomadApps(targetCode, insights.transport.popularRideApps);
                const allApps = Object.values(MASTER_APPS_DIRECTORY).filter((a) =>
                  !widgetSearch.trim() ||
                  a.name.toLowerCase().includes(widgetSearch.toLowerCase()) ||
                  a.taglineTr.toLocaleLowerCase('tr').includes(widgetSearch.toLocaleLowerCase('tr'))
                );

                return (
                  <div className="space-y-4">
                    {/* Country selector row */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                      {POPULAR_RESEARCH_COUNTRIES.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setAppsCountry(c);
                            setWidgetStack(prev => {
                              const copy = [...prev];
                              copy[copy.length - 1] = { ...copy[copy.length - 1], countryCode: c };
                              return copy;
                            });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                            targetCode === c
                              ? 'bg-[#0D9488] text-white'
                              : 'bg-white/80 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 hover:bg-teal-500/15'
                          }`}
                        >
                          {getFlag(c)} {getCountryName(c, language)}
                        </button>
                      ))}
                    </div>

                    {activeWidget.subTab === 'esim' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                          href="https://www.airalo.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/25 flex items-center justify-between gap-4 no-underline"
                        >
                          <div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                              {l('Fiziksel SIM Gerekmez', 'No Physical SIM Needed')}
                            </span>
                            <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                              Airalo {getCountryName(targetCode, language)} eSIM
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                              {l('Havalimanına indiğin anda 5G internetin hazır olsun.', 'Instant 5G data the moment you land at the airport.')}
                            </p>
                          </div>
                          <span className="px-3.5 py-2 rounded-full text-xs font-extrabold bg-[#0D9488] text-white shrink-0">
                            {l('eSIM Al →', 'Get eSIM →')}
                          </span>
                        </a>
                        <a
                          href="https://preply.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/25 flex items-center justify-between gap-4 no-underline"
                        >
                          <div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-500/15 text-sky-800 dark:text-sky-300">
                              {l('Dil & İletişim', 'Language & Speaking')}
                            </span>
                            <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                              Preply 1-e-1 Yerel Dil Pratiği
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                              {l('Seyahat öncesi yerel eğitmenlerle pratik yapın.', 'Practice with native tutors before your trip.')}
                            </p>
                          </div>
                          <span className="px-3.5 py-2 rounded-full text-xs font-extrabold bg-[#0EA5E9] text-white shrink-0">
                            {l('İncele →', 'Explore →')}
                          </span>
                        </a>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {(activeWidget.subTab === 'all_directory' ? allApps : countryApps).map((app) => (
                          <a
                            key={app.name}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20 hover:border-teal-500 flex items-start justify-between gap-3 no-underline transition-all"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-extrabold text-slate-900 dark:text-white">{app.name}</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF]">
                                  {language === 'tr' ? app.categoryLabelTr : app.categoryLabelEn}
                                </span>
                              </div>
                              <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
                                {language === 'tr' ? app.taglineTr : app.taglineEn}
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                {language === 'tr' ? app.recommendedReasonTr : app.recommendedReasonEn}
                              </p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[#0F766E] dark:text-[#2DD4BF] shrink-0 mt-1" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* --- C. AFFILIATE HUB SUB-WIDGET --- */}
              {activeWidget.id === 'affiliate_hub' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conciergePlan.stages.map((group) =>
                      group.partners.map((p) => (
                        <a
                          key={p.id}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20 hover:border-teal-500 flex items-center justify-between gap-4 no-underline transition-all"
                        >
                          <div className="space-y-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF]">
                              {language === 'tr' ? p.badgeTr : p.badgeEn}
                            </span>
                            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{p.brand}</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300">
                              {language === 'tr' ? p.taglineTr : p.taglineEn}
                            </p>
                          </div>
                          <span className="px-4 py-2 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#10B981] text-white shrink-0">
                            {language === 'tr' ? p.ctaTr : p.ctaEn} →
                          </span>
                        </a>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* --- D. PASSPORT SYNERGY & COMPARE SUB-WIDGET (With Country Drill-Down!) --- */}
              {activeWidget.id === 'synergy' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      💡 {l(
                        'Herhangi bir ülkeye tıklayarak o ülkenin detaylı vize, taksi ve rehber penceresine geçebilir, sol üstteki [ ← Geri ] tuşuyla karşılaştırmaya dönebilirsiniz:',
                        'Click any country below to inspect its full dossier and return here anytime with [ ← Back ]:'
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {(['TH', 'JP', 'IT', 'GR', 'DE', 'AE', 'BR', 'KR'] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => openWidget('country_research', 'visa', c)}
                          className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-white dark:bg-white/10 text-slate-900 dark:text-white hover:bg-[#0D9488] hover:text-white transition-all cursor-pointer shadow-2xs"
                        >
                          {getFlag(c)} {getCountryName(c, language)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Suspense fallback={<div className="p-8 text-center text-sm font-bold">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <CompareTab initialPassportA={currentPassport} initialPassportB={effectiveSecondPassport} />
                  </Suspense>
                </div>
              )}

              {/* --- E. WORLD DAY COUNTER SUB-WIDGET --- */}
              {activeWidget.id === 'day_counter' && (
                <Suspense fallback={<div className="p-8 text-center text-sm font-bold">{l('Yükleniyor...', 'Loading...')}</div>}>
                  <DayCounterTab />
                </Suspense>
              )}

              {/* --- F. ROUTE PLANNER SUB-WIDGET --- */}
              {activeWidget.id === 'route_planner' && (
                <Suspense fallback={<div className="p-8 text-center text-sm font-bold">{l('Yükleniyor...', 'Loading...')}</div>}>
                  <RoutePlannerTab currentPassport={currentPassport} />
                </Suspense>
              )}

              {/* --- G. RADAR / WHERE CAN I GO SUB-WIDGET --- */}
              {activeWidget.id === 'radar' && (
                <Suspense fallback={<div className="p-8 text-center text-sm font-bold">{l('Yükleniyor...', 'Loading...')}</div>}>
                  <WhereCanIGoTab currentPassport={currentPassport} />
                </Suspense>
              )}

              {/* --- H. NOMAD & EMERGENCY SUB-WIDGETS --- */}
              {activeWidget.id === 'nomad' && (
                <Suspense fallback={<div className="p-8 text-center text-sm font-bold">{l('Yükleniyor...', 'Loading...')}</div>}>
                  <NomadToolsTab defaultSubTab="nomad" currentPassport={currentPassport} />
                </Suspense>
              )}

              {activeWidget.id === 'emergency' && (
                <Suspense fallback={<div className="p-8 text-center text-sm font-bold">{l('Yükleniyor...', 'Loading...')}</div>}>
                  <NomadToolsTab defaultSubTab="emergency" currentPassport={currentPassport} />
                </Suspense>
              )}

              {/* --- I. CURRENCY, CLOCK & PACKING QUICK LAUNCHERS --- */}
              {activeWidget.id === 'currency' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20">
                      <div className="text-xs font-bold text-slate-500">1 USD ($)</div>
                      <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">₺{usdTry}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20">
                      <div className="text-xs font-bold text-slate-500">1 EUR (€)</div>
                      <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">₺{eurTry}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20">
                      <div className="text-xs font-bold text-slate-500">1 GBP (£)</div>
                      <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">₺{gbpTry}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenGlobalRadar('currency');
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white cursor-pointer"
                    >
                      {l('Tam Döviz & Kurlar Radarını Aç →', 'Open Full FX & Currency Radar →')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenTippingCalc();
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-white dark:bg-white/10 text-slate-900 dark:text-white border border-teal-500/30 cursor-pointer"
                    >
                      {l('Ülkelere Göre Bahşiş Hesaplayıcıyı Aç →', 'Open Tipping Calculator →')}
                    </button>
                  </div>
                </div>
              )}

              {activeWidget.id === 'world_clock' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: '🇹🇷 İstanbul', offset: 3 },
                      { name: '🇬🇧 Londra', offset: 1 },
                      { name: '🇯🇵 Tokyo', offset: 9 },
                      { name: '🇺🇸 New York', offset: -4 },
                      { name: '🇹🇭 Bangkok', offset: 7 },
                      { name: '🇦🇪 Dubai', offset: 4 },
                      { name: '🇩🇪 Berlin', offset: 2 },
                      { name: '🇦🇺 Sidney', offset: 10 }
                    ].map((c) => (
                      <div key={c.name} className="p-4 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20">
                        <div className="text-xs font-bold text-slate-600 dark:text-slate-300">{c.name}</div>
                        <div className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1">
                          {formatCityTime(c.offset)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenTimezoneOverlap();
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white cursor-pointer"
                    >
                      {l('Mesai & Saat Çakışması Planlayıcısını Aç →', 'Open Timezone Overlap Planner →')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenGlobalRadar('clock');
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-white dark:bg-white/10 text-slate-900 dark:text-white border border-teal-500/30 cursor-pointer"
                    >
                      {l('Dünya Saatleri & Hava Durumu Radarını Aç →', 'Open Global Clock & Weather Radar →')}
                    </button>
                  </div>
                </div>
              )}

              {activeWidget.id === 'packing' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-teal-500/20 space-y-3">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                      🧳 {l('İnteraktif Akıllı Bavul & Evrak Kontrol Listesi', 'Interactive Smart Packing & Document Checklist')}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {l(
                        'Gideceğiniz ülkenin iklimine, priz tipine ve vize evraklarına göre özelleştirilmiş tam kontrol listesini açın.',
                        'Open the full interactive checklist tailored to your destination climate, plug type, and visa documents.'
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenPackingList();
                      }}
                      className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#10B981] text-white cursor-pointer"
                    >
                      {l('Tam Ekran Akıllı Bavul Asistanını Başlat →', 'Launch Interactive Packing Assistant →')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
