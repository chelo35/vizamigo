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
  Shield,
  Plane,
  Laptop,
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import {
  WorldRadar3DIllustration,
  Passports3DIllustration,
  GlobalDayCounter3DIllustration,
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
import { getCountryVisual } from '../../data/countryVisuals';
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
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);
  const [appsCountry, setAppsCountry] = useState<string>('TH');
  const [now, setNow] = useState<Date>(() => new Date());

  // Update live clock every 15 seconds
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

  // Synergy stats between currentPassport and secondaryPassport
  const effectiveSecondPassport =
    secondaryPassport && secondaryPassport !== currentPassport
      ? secondaryPassport
      : currentPassport === 'TR'
      ? 'DE'
      : 'TR';

  const synergyStats = useMemo(() => {
    try {
      const comp = compareDualPassports(currentPassport, effectiveSecondPassport);
      const gain = Math.max(0, comp.combinedFreedomScore - comp.scoreA);
      return {
        combinedFree: comp.combinedFreedomScore || 162,
        gain
      };
    } catch {
      return { combinedFree: 162, gain: 51 };
    }
  }, [currentPassport, effectiveSecondPassport]);

  // Live currency rates
  const usdTry = useMemo(() => getCrossRate('USD', 'TRY').toFixed(2), []);
  const eurTry = useMemo(() => getCrossRate('EUR', 'TRY').toFixed(2), []);

  // World clocks
  const formatCityTime = (offsetHours: number) => {
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const d = new Date(utc + offsetHours * 3600000);
    return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Selected research country details & visual
  const researchCountryItem = useMemo(
    () => passportItems.find((i) => i.c === researchCountry),
    [passportItems, researchCountry]
  );
  const researchVisual = useMemo(() => getCountryVisual(researchCountry), [researchCountry]);

  // Concierge / Affiliate plan for researchCountry
  const conciergePlan = useMemo(
    () => getCountryConciergePlan(researchCountry, currentPassport),
    [researchCountry, currentPassport]
  );

  // Open a sub-widget window
  const openWidget = (id: BentoWidgetId, subTab?: string, countryCode?: string) => {
    setIsMinimized(false);
    setWidgetSearch('');
    setWidgetStack((prev) => [...prev, { id, subTab, countryCode }]);
  };

  const goBackWidget = () => {
    setWidgetSearch('');
    setWidgetStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : []));
  };

  const closeAllWidgets = () => {
    setWidgetStack([]);
    setIsFullscreen(false);
    setIsMinimized(false);
    setWidgetSearch('');
  };

  const activeWidget = widgetStack.length > 0 ? widgetStack[widgetStack.length - 1] : null;

  const setActiveSubTab = (subTab: string) => {
    setWidgetStack((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      copy[copy.length - 1] = { ...copy[copy.length - 1], subTab };
      return copy;
    });
  };

  return (
    <section
      aria-label={l('Vizamigo Akıllı Seyahat Panosu', 'Vizamigo Smart Travel Widget System')}
      className="space-y-4 sm:space-y-5"
    >
      {/* =====================================================================
          MAIN V2 LAGOON WIDGET GRID (MATCHES APPROVED WEB V2 & MOBILE V2 1:1)
      ===================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-5">
        {/* -----------------------------------------------------------------
            WIDGET 1: NEREYE GİDEBİLİRİM? (DÜNYA RADARI)
            Full width on Mobile (col-span-2), 6 cols on Desktop (lg:col-span-6)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('radar', 'map')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('radar', 'map')}
          className="col-span-2 lg:col-span-6 group relative overflow-hidden rounded-[26px] sm:rounded-[30px] border-2 border-[#5EEAD4]/60 shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 min-h-[210px] sm:min-h-[250px] flex flex-col justify-between p-5 sm:p-6"
        >
          {/* Real Tropical Turquoise Island Lagoon Photo Background */}
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&fm=webp&q=80"
            alt={l('Turkuaz Lagün & Dünya Radarı', 'Turquoise Lagoon & World Radar')}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="eager"
          />
          {/* Rich Lagoon Gradient Scrim for 100% Crisp White Text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#042F2E]/90 via-[#0F766E]/70 to-[#042F2E]/85" />

          {/* Content Layout */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 h-full">
            <div className="flex flex-col justify-between h-full space-y-4 sm:max-w-[52%]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-[1.15] tracking-tight drop-shadow-md">
                  {l('Nereye Gidebilirim?', 'Where Can I Go?')}
                  <span className="block text-xl sm:text-2xl text-[#99F6E4] mt-0.5">
                    {l('(Dünya Radarı)', '(World Radar)')}
                  </span>
                </h2>
              </div>

              {/* Big High-Contrast Pills: 71 Vizesiz | 45 E-Vize */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="px-4 py-2 rounded-2xl text-sm sm:text-base font-black bg-[#4ADE80] text-[#042F2E] shadow-lg">
                  {stats.free} {l('Vizesiz', 'Visa-Free')}
                </span>
                <span className="px-4 py-2 rounded-2xl text-sm sm:text-base font-black bg-[#5EEAD4] text-[#042F2E] shadow-lg">
                  {stats.evisa} {l('E-Vize', 'eVisa')}
                </span>
              </div>
            </div>

            {/* 3D Glowing World Map with Colorful Flight Arcs */}
            <div className="w-full sm:w-[48%] -my-2">
              <WorldRadar3DIllustration />
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 2: ÜLKE ARAŞTIRMA MERKEZİ (🇹🇭 TAYLAND & 199 ÜLKE)
            Full width on Mobile (col-span-2), 6 cols on Desktop (lg:col-span-6)
        ----------------------------------------------------------------- */}
        <div
          className="col-span-2 lg:col-span-6 group relative overflow-hidden rounded-[26px] sm:rounded-[30px] border-2 border-[#5EEAD4]/60 shadow-2xl transition-all duration-300 hover:-translate-y-1 min-h-[210px] sm:min-h-[250px] flex flex-col justify-between p-5 sm:p-6"
        >
          {/* Real Tropical Limestone Lagoon Photo Background (Thailand / Selected Country) */}
          <img
            src={
              researchCountry === 'TH'
                ? 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&fm=webp&q=80'
                : researchVisual.image
            }
            alt={getCountryName(researchCountry, language)}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="eager"
          />
          {/* Rich Lagoon Scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#042F2E]/85 via-[#064E3B]/60 to-[#042F2E]/90" />

          {/* Top Title & Country Selector Pill */}
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2
                onClick={() => openWidget('country_research', 'visa', researchCountry)}
                className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-md cursor-pointer hover:text-[#5EEAD4] transition-colors"
              >
                {l('Ülke Araştırma Merkezi:', 'Country Research Hub:')}
              </h2>
            </div>

            {/* Active Country Pill + Quick Country Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => openWidget('country_research', 'visa', researchCountry)}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0F766E]/90 hover:bg-[#0D9488] text-white border-2 border-[#5EEAD4] text-base sm:text-lg font-black shadow-lg cursor-pointer transition-all"
              >
                <span className="text-xl">{getFlag(researchCountry)}</span>
                <span>{getCountryName(researchCountry, language)}</span>
                <ChevronRight className="w-4 h-4 text-[#5EEAD4]" />
              </button>

              <button
                type="button"
                onClick={() => setShowCountryPicker(!showCountryPicker)}
                className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 cursor-pointer transition-all"
              >
                {l('Ülke Değiştir ▾', 'Change Country ▾')}
              </button>
            </div>

            {showCountryPicker && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {POPULAR_RESEARCH_COUNTRIES.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setResearchCountry(code);
                      setShowCountryPicker(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                      researchCountry === code
                        ? 'bg-[#5EEAD4] text-[#042F2E] shadow-sm'
                        : 'bg-[#042F2E]/80 text-white hover:bg-[#0D9488]'
                    }`}
                  >
                    {getFlag(code)} {getCountryName(code, language)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom 5 Large Frosted Sub-Tab Buttons (Matching V2 Mockup 1:1) */}
          <div className="relative z-10 flex items-center gap-2 overflow-x-auto no-scrollbar pt-3">
            {[
              {
                key: 'visa',
                label: researchCountryItem
                  ? `🛂 ${getCategoryBadgeLabel(researchCountryItem, language)}`
                  : l('🛂 Vize (60 Gün)', '🛂 Visa (60d)')
              },
              { key: 'practical', label: l('🔌 Pratik', '🔌 Practical') },
              { key: 'safety', label: l('🛡️ Güvenlik', '🛡️ Safety') },
              { key: 'apps', label: l('📲 Uygulamalar', '📲 Apps') },
              { key: 'deals', label: l('🏨 Otel & Uçak', '🏨 Hotel & Flight') }
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => openWidget('country_research', tab.key, researchCountry)}
                className="px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap bg-[#0F766E]/80 hover:bg-[#2DD4BF] text-white hover:text-[#042F2E] border border-[#5EEAD4]/60 backdrop-blur-md shadow-md cursor-pointer transition-all"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 3: PASAPORT SİNERJİSİ / KARŞILAŞTIR
            1 col on Mobile (col-span-1), 4 cols on Desktop (lg:col-span-4)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('synergy', 'overview')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('synergy', 'overview')}
          className="col-span-1 lg:col-span-4 group relative overflow-hidden rounded-[24px] sm:rounded-[28px] bento-lagoon-card p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 min-h-[195px] sm:min-h-[225px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <div className="flex flex-col justify-between h-full z-10 space-y-2 sm:space-y-4">
            <div>
              <h3 className="text-lg sm:text-3xl font-black text-[#042F2E] dark:text-white leading-[1.12] tracking-tight">
                {l('Pasaport', 'Passport')}
                <span className="block">{l('Sinerjisi', 'Synergy')}</span>
              </h3>
            </div>

            <div className="pt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-4xl font-black text-[#042F2E] dark:text-[#5EEAD4] tracking-tight">
                  {synergyStats.combinedFree}
                </span>
                <span className="text-xs sm:text-base font-extrabold text-[#042F2E] dark:text-teal-100 leading-tight">
                  {l('Ülke Vizesiz', 'Visa-Free')}
                </span>
              </div>
            </div>
          </div>

          <div className="self-center sm:self-auto -my-2">
            <Passports3DIllustration
              codeA={currentPassport}
              codeB={effectiveSecondPassport}
              synergyCount={synergyStats.combinedFree}
            />
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 4: DÜNYA GÜN SAYACI (TÜM DÜNYA & SCHENGEN)
            1 col on Mobile (col-span-1), 4 cols on Desktop (lg:col-span-4)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('day_counter', 'schengen')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('day_counter', 'schengen')}
          className="col-span-1 lg:col-span-4 group relative overflow-hidden rounded-[24px] sm:rounded-[28px] bento-lagoon-card p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 min-h-[195px] sm:min-h-[225px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <div className="flex flex-col justify-between h-full z-10 space-y-2 sm:space-y-4">
            <div>
              <h3 className="text-lg sm:text-3xl font-black text-[#042F2E] dark:text-white leading-[1.12] tracking-tight">
                {l('Dünya', 'World')}
                <span className="block">{l('Gün Sayacı', 'Day Counter')}</span>
              </h3>
            </div>

            <div className="pt-1">
              <div className="text-base sm:text-2xl font-black text-[#042F2E] dark:text-[#5EEAD4] leading-tight">
                {l('48 Gün Kaldı', '48 Days Left')}
              </div>
              <div className="text-[11px] sm:text-sm font-extrabold text-[#064E3B] dark:text-teal-200 mt-0.5">
                {l('(Tüm Dünya & Schengen)', '(Global & Schengen)')}
              </div>
            </div>
          </div>

          <div className="self-center sm:self-auto -my-2">
            <GlobalDayCounter3DIllustration daysLeft={48} />
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 5: DÖVİZ & BÜTÇE
            1 col on Mobile (col-span-1), 4 cols on Desktop (lg:col-span-4)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('currency', 'converter')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('currency', 'converter')}
          className="col-span-1 lg:col-span-4 group relative overflow-hidden rounded-[24px] sm:rounded-[28px] bento-lagoon-card p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 min-h-[195px] sm:min-h-[225px] flex flex-col justify-between"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-lg sm:text-3xl font-black text-[#042F2E] dark:text-white leading-[1.12] tracking-tight">
              {l('Döviz &', 'Currency &')}
              <span className="block">{l('Bütçe', 'Budget')}</span>
            </h3>
            <div className="self-center sm:self-auto -my-3">
              <CurrencyCoins3DIllustration />
            </div>
          </div>

          <div className="pt-2 border-t border-[#0F766E]/20 dark:border-white/15">
            <div className="text-sm sm:text-2xl font-black text-[#042F2E] dark:text-white tracking-tight font-mono">
              $1 = {usdTry}₺ · €1 = {eurTry}₺
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 6: AKILLI BAVUL
            1 col on Mobile (col-span-1), 4 cols on Desktop (lg:col-span-4)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('packing', 'documents')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('packing', 'documents')}
          className="col-span-1 lg:col-span-4 group relative overflow-hidden rounded-[24px] sm:rounded-[28px] bento-lagoon-card p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 min-h-[195px] sm:min-h-[225px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <div className="flex flex-col justify-between h-full z-10 space-y-3 sm:space-y-5">
            <h3 className="text-lg sm:text-3xl font-black text-[#042F2E] dark:text-white leading-[1.12] tracking-tight">
              {l('Akıllı', 'Smart')}
              <span className="block">{l('Bavul', 'Packing')}</span>
            </h3>

            <div>
              <span className="inline-block px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-2xl bg-[#5EEAD4] text-[#042F2E] text-sm sm:text-2xl font-black shadow-md">
                %75 {l('Hazır', 'Ready')}
              </span>
            </div>
          </div>

          <div className="self-center sm:self-auto -my-2">
            <Suitcases3DIllustration progress={75} />
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 7: DÜNYA SAATİ & ROTA
            1 col on Mobile (col-span-1), 4 cols on Desktop (lg:col-span-4)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('world_clock', 'clocks')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('world_clock', 'clocks')}
          className="col-span-1 lg:col-span-4 group relative overflow-hidden rounded-[24px] sm:rounded-[28px] bento-lagoon-card p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 min-h-[195px] sm:min-h-[225px] flex flex-col justify-between"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-3xl font-black text-[#042F2E] dark:text-white leading-[1.12] tracking-tight">
                {l('Dünya Saati', 'World Clock')}
                <span className="block">{l('& Rota', '& Route')}</span>
              </h3>
              <p className="text-xs sm:text-sm font-extrabold text-[#064E3B] dark:text-teal-200">
                İstanbul ➔ Atina ➔ Tokyo
              </p>
            </div>
            <div className="self-center sm:self-auto -my-3">
              <WorldClock3DIllustration />
            </div>
          </div>

          <div className="pt-2 border-t border-[#0F766E]/20 dark:border-white/15">
            <div className="text-sm sm:text-2xl font-black text-[#042F2E] dark:text-white tracking-tight font-mono">
              İST {formatCityTime(3)} · TYO {formatCityTime(9)}
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 8: ÜLKE UYGULAMALARI & FIRSATLAR (AFFILIATE & LOCAL APPS)
            1 col on Mobile (col-span-1), 4 cols on Desktop (lg:col-span-4)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('local_apps', 'ride', appsCountry)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('local_apps', 'ride', appsCountry)}
          className="col-span-1 lg:col-span-4 group relative overflow-hidden rounded-[24px] sm:rounded-[28px] bento-lagoon-card p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 min-h-[195px] sm:min-h-[225px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <div className="flex flex-col justify-between h-full z-10 space-y-2.5 sm:space-y-4">
            <h3 className="text-base sm:text-2xl font-black text-[#042F2E] dark:text-white leading-[1.15] tracking-tight">
              {l('Ülke', 'Country')}
              <span className="block">{l('Uygulamaları', 'Local Apps')}</span>
              <span className="block">{l('& Fırsatlar', '& Deals')}</span>
            </h3>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-[#2DD4BF] to-[#38BDF8] text-[#042F2E] text-xs sm:text-base font-black shadow-md group-hover:scale-105 transition-transform">
                {l('Fırsatları Gör →', 'View Deals →')}
              </span>
            </div>
          </div>

          <div className="self-center sm:self-auto -my-2">
            <LocalApps3DIllustration />
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 9 & 10: DİJİTAL GÖÇEBE & ACİL KONSOLOSLUK (6 + 6 cols)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('nomad', 'hubs')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('nomad', 'hubs')}
          className="col-span-1 lg:col-span-6 group relative overflow-hidden rounded-[24px] bento-lagoon-card p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#0F766E] text-white">
              <Laptop className="w-3.5 h-3.5" />
              {l('Uzaktan Çalışma & Hızlı Wi-Fi', 'Remote Work & Fast Wi-Fi')}
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-[#042F2E] dark:text-white">
              {l('Dijital Göçebe (Nomad) Üsleri', 'Digital Nomad Hubs')}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-[#064E3B] dark:text-teal-200">
              🌴 Bali · Bangkok · Lizbon · Tiflis · 185 Mbps
            </p>
          </div>
          <div className="self-center sm:self-auto -my-2">
            <NomadIsland3DIllustration />
          </div>
        </div>

        <div
          onClick={() => openWidget('emergency', 'sos')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('emergency', 'sos')}
          className="col-span-1 lg:col-span-6 group relative overflow-hidden rounded-[24px] bento-lagoon-card p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white">
              <PhoneCall className="w-3.5 h-3.5" />
              {l('SOS 112 / 911 · 7/24 Kriz Masası', 'SOS 112 / 911 · 24/7 Consular Desk')}
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-[#042F2E] dark:text-white">
              {l('Acil Yardım & T.C. Konsolosluklar', 'Emergency SOS & Embassies')}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-[#064E3B] dark:text-teal-200">
              {l('Kayıp Pasaport, Geçici Belge & Büyükelçilik Numaraları', 'Lost Passport, Emergency Travel Doc & Embassies')}
            </p>
          </div>
          <div className="self-center sm:self-auto -my-2">
            <LifebuoySOS3DIllustration />
          </div>
        </div>
      </div>

      {/* =====================================================================
          MINIMIZED SUB-WIDGET DOCK BAR (When user clicks [ — Küçült ])
      ===================================================================== */}
      {activeWidget && isMinimized && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#042F2E] to-[#0D9488] text-white shadow-2xl border-2 border-[#5EEAD4]">
          <Sparkles className="w-4 h-4 text-[#5EEAD4]" />
          <span className="text-sm font-black">
            {l('Açık Pencere:', 'Active Window:')} {activeWidget.id.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="px-3 py-1 rounded-full bg-[#5EEAD4] text-[#042F2E] text-xs font-black cursor-pointer"
          >
            {l('Büyüt ⛶', 'Restore ⛶')}
          </button>
          <button
            type="button"
            onClick={closeAllWidgets}
            className="p-1.5 rounded-full hover:bg-white/20 cursor-pointer"
            title={l('Kapat', 'Close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =====================================================================
          EXPANDABLE CARD / SUB-WIDGET WINDOW MODAL
          (Matches V2 Right Mobile Screen "🇹🇭 Tayland Rehberi" 1:1)
      ===================================================================== */}
      {activeWidget && !isMinimized && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center ${
            isFullscreen ? 'p-0' : 'p-0 sm:p-4 md:p-6'
          } bg-[#02181C]/80 backdrop-blur-md`}
          onClick={closeAllWidgets}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${
              isFullscreen
                ? 'fixed inset-0 w-screen h-screen rounded-none max-w-none max-h-none'
                : 'relative w-full sm:max-w-4xl h-[93dvh] sm:h-[88vh] rounded-t-[32px] sm:rounded-[32px]'
            } flex flex-col overflow-hidden bg-gradient-to-b from-[#136F63] via-[#0D5C63] to-[#06373A] dark:from-[#072A36] dark:via-[#051F2B] dark:to-[#03131A] border-2 border-[#5EEAD4]/60 shadow-2xl transition-all`}
          >
            {/* 1. TOP WINDOW CONTROL BAR: [ ← Geri ] | Title | [ — ] [ ⛶ ] [ ✕ ] */}
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-3 border-b border-white/15 shrink-0">
              <button
                type="button"
                onClick={widgetStack.length > 1 ? goBackWidget : closeAllWidgets}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black bg-white/20 hover:bg-[#5EEAD4] text-white hover:text-[#042F2E] border border-white/30 transition-all cursor-pointer shadow-sm shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{l('Geri', 'Back')}</span>
              </button>

              <h2 className="text-lg sm:text-2xl font-black text-white truncate text-center">
                {activeWidget.id === 'country_research' &&
                  `${getFlag(activeWidget.countryCode || researchCountry)} ${getCountryName(
                    activeWidget.countryCode || researchCountry,
                    language
                  )} ${l('Rehberi', 'Guide')}`}
                {activeWidget.id === 'radar' && l('🌍 Nereye Gidebilirim? (Dünya Radarı)', '🌍 Where Can I Go? (World Radar)')}
                {activeWidget.id === 'synergy' && l('🛂 Pasaport Sinerjisi & Karşılaştır', '🛂 Passport Synergy & Compare')}
                {activeWidget.id === 'day_counter' && l('⏳ Dünya Gün Sayacı (Tüm Dünya)', '⏳ World Day Counter (Global)')}
                {activeWidget.id === 'route_planner' && l('🗺️ Çok Duraklı Rota Planlayıcı', '🗺️ Multi-Stop Route Planner')}
                {activeWidget.id === 'currency' && l('💱 Döviz & Seyahat Bütçesi', '💱 Currency & Travel Budget')}
                {activeWidget.id === 'world_clock' && l('🕒 Dünya Saati & Rota', '🕒 World Clock & Route')}
                {activeWidget.id === 'packing' && l('🧳 Akıllı Bavul Hazırlama', '🧳 Smart Packing Checklist')}
                {activeWidget.id === 'nomad' && l('💻 Dijital Göçebe (Nomad) Rehberi', '💻 Digital Nomad Guide')}
                {activeWidget.id === 'emergency' && l('🆘 Acil Yardım & Konsolosluk', '🆘 Emergency & Embassies')}
                {activeWidget.id === 'local_apps' &&
                  `${getFlag(activeWidget.countryCode || appsCountry)} ${getCountryName(
                    activeWidget.countryCode || appsCountry,
                    language
                  )} ${l('Uygulamalar & Fırsatlar', 'Local Apps & Deals')}`}
                {activeWidget.id === 'affiliate_hub' && l('🏨 Otel, Uçak & Seyahat Fırsatları', '🏨 Flights, Hotels & Travel Deals')}
              </h2>

              {/* Window Controls: Minimize [ — ], Fullscreen [ ⛶ ], Close [ ✕ ] */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 hover:bg-white/30 border border-white/25 text-white flex items-center justify-center cursor-pointer transition-all"
                  title={l('Küçült', 'Minimize')}
                  aria-label={l('Küçült', 'Minimize')}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 hover:bg-white/30 border border-white/25 text-white flex items-center justify-center cursor-pointer transition-all"
                  title={isFullscreen ? l('Normal Boyut', 'Restore Size') : l('Ekranı Kapla', 'Fullscreen')}
                  aria-label={isFullscreen ? l('Normal Boyut', 'Restore Size') : l('Ekranı Kapla', 'Fullscreen')}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={closeAllWidgets}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 hover:bg-rose-500 border border-white/25 text-white flex items-center justify-center cursor-pointer transition-all"
                  title={l('Kapat', 'Close')}
                  aria-label={l('Kapat', 'Close')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. IN-WIDGET SEARCH BAR + LARGE SUB-TAB PILLS (Matching Right Phone Screen 1:1) */}
            <div className="px-4 sm:px-6 pt-3 pb-3 space-y-3 border-b border-white/15 shrink-0">
              {/* Full-width Frosted Lagoon Search Bar */}
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-[#042F2E] absolute left-4 pointer-events-none" />
                <input
                  type="search"
                  value={widgetSearch}
                  onChange={(e) => setWidgetSearch(e.target.value)}
                  placeholder={
                    activeWidget.id === 'country_research' || activeWidget.id === 'local_apps'
                      ? `${getCountryName(activeWidget.countryCode || researchCountry, language)} ${l(
                          'içinde vize, uygulama, otel veya konu ara...',
                          'search visa, apps, hotel or topic...'
                        )}`
                      : l('Bu pencere içinde ara...', 'Search inside this window...')
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-full text-sm sm:text-base font-bold bg-[#CCFBF1]/90 text-[#042F2E] placeholder:text-[#0F766E] border border-[#5EEAD4] focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] shadow-inner"
                />
              </div>

              {/* Large Sub-Tab Pills */}
              {(activeWidget.id === 'country_research' ||
                activeWidget.id === 'local_apps' ||
                activeWidget.id === 'affiliate_hub') && (
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                  {[
                    { k: 'visa', label: l('🛂 Vize (60 Gün)', '🛂 Visa & Entry') },
                    { k: 'apps', label: l('📲 Uygulamalar', '📲 Local Apps') },
                    { k: 'deals', label: l('🏨 Otel & Uçak', '🏨 Hotel & Flight') },
                    { k: 'insurance', label: l('🛡️ Sigorta & eSIM', '🛡️ Insurance & eSIM') },
                    { k: 'practical', label: l('🔌 Pratik & Güvenlik', '🔌 Practical & Safety') }
                  ].map((t) => {
                    const currentSub = activeWidget.subTab || 'visa';
                    const isActive = currentSub === t.k || (currentSub === 'ride' && t.k === 'apps');
                    return (
                      <button
                        key={t.k}
                        type="button"
                        onClick={() => setActiveSubTab(t.k)}
                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-black whitespace-nowrap cursor-pointer transition-all ${
                          isActive
                            ? 'bg-[#2DD4BF] text-[#042F2E] shadow-md ring-2 ring-white/50'
                            : 'bg-[#042F2E]/50 text-white hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. SUB-WIDGET SCROLLABLE BODY */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* --- A. COUNTRY GUIDE / LOCAL APPS / AFFILIATE WINDOW (Matches Right Phone Screen 1:1) --- */}
              {(activeWidget.id === 'country_research' ||
                activeWidget.id === 'local_apps' ||
                activeWidget.id === 'affiliate_hub') &&
                (() => {
                  const targetCode = activeWidget.countryCode || researchCountry;
                  const insights = getCountryInsights(targetCode, language);
                  const geo = getCountryGeography(targetCode, language);
                  const item = passportItems.find((i) => i.c === targetCode);
                  const visual = getCountryVisual(targetCode);
                  const apps = getCountryNomadApps(targetCode, insights.transport.popularRideApps);

                  return (
                    <div className="space-y-5">
                      {/* Quick Country Switcher Bar */}
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                        {POPULAR_RESEARCH_COUNTRIES.filter(
                          (c) =>
                            !widgetSearch.trim() ||
                            getCountryName(c, language)
                              .toLocaleLowerCase('tr')
                              .includes(widgetSearch.toLocaleLowerCase('tr'))
                        ).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => {
                              setResearchCountry(c);
                              setAppsCountry(c);
                              setWidgetStack((prev) => {
                                const copy = [...prev];
                                copy[copy.length - 1] = { ...copy[copy.length - 1], countryCode: c };
                                return copy;
                              });
                            }}
                            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black whitespace-nowrap cursor-pointer transition-all ${
                              targetCode === c
                                ? 'bg-[#5EEAD4] text-[#042F2E] shadow-sm'
                                : 'bg-white/15 text-white hover:bg-white/25'
                            }`}
                          >
                            {getFlag(c)} {getCountryName(c, language)}
                          </button>
                        ))}
                      </div>

                      {/* 1. Large Scenic Tropical Lagoon Photo Header with Visa Badge */}
                      <div className="relative h-48 sm:h-60 w-full rounded-[24px] overflow-hidden border-2 border-[#5EEAD4]/60 shadow-xl">
                        <img
                          src={
                            targetCode === 'TH'
                              ? 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&fm=webp&q=80'
                              : visual.image
                          }
                          alt={getCountryName(targetCode, language)}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#042F2E]/85 via-transparent to-[#042F2E]/35" />

                        {/* Top-Right Visa Status Pill ("60 Gün Vizesiz Giriş") */}
                        <div className="absolute top-3.5 right-3.5 px-4 py-2 rounded-full bg-[#CCFBF1] text-[#042F2E] text-xs sm:text-sm font-black shadow-lg border border-white">
                          {item ? getCategoryBadgeLabel(item, language) : l('60 Gün Vizesiz Giriş', '60 Days Visa-Free')}
                        </div>

                        {/* Bottom-Left Country Summary & Full 360 Button */}
                        <div className="absolute bottom-3.5 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                              {getFlag(targetCode)} {getCountryName(targetCode, language)} · {visual.landmark}
                            </h3>
                            <p className="text-xs sm:text-sm font-bold text-[#99F6E4]">
                              {geo?.capital ? `${l('Başkent:', 'Capital:')} ${geo.capital}` : ''} · {geo?.currencyName || 'THB'} ({geo?.currencySymbol || '฿'})
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              closeAllWidgets();
                              onOpenCountryDossier(targetCode);
                            }}
                            className="px-4 py-2 rounded-full text-xs sm:text-sm font-black bg-[#2DD4BF] text-[#042F2E] hover:bg-white shadow-md cursor-pointer transition-all"
                          >
                            {l('360° Tam Ülke Dosyası →', 'Full 360° Dossier →')}
                          </button>
                        </div>
                      </div>

                      {/* 2. "Tayland'da Geçerli Uygulamalar" Mint Card with 4 Big App Icons (Grab, Bolt, Agoda, Airalo) */}
                      <div className="p-5 rounded-[24px] bg-[#CCFBF1] dark:bg-[#0B3B49] border-2 border-[#5EEAD4] shadow-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base sm:text-xl font-black text-[#042F2E] dark:text-white">
                            {l(
                              `${getCountryName(targetCode, language)}'da Geçerli Uygulamalar`,
                              `Valid Apps in ${getCountryName(targetCode, language)}`
                            )}
                          </h4>
                          <span className="text-xs font-extrabold text-[#0F766E] dark:text-[#5EEAD4]">
                            {l('İndirmek için dokunun', 'Tap to open')}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {/* App 1: Primary Ride App (e.g. Grab) */}
                          <a
                            href={apps[0]?.url || 'https://www.grab.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 rounded-2xl bg-white dark:bg-[#072630] border border-teal-500/25 shadow-sm hover:-translate-y-0.5 transition-all flex flex-col items-center text-center no-underline"
                          >
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-lg font-black text-emerald-600 dark:text-emerald-400 shadow-xs">
                              {apps[0]?.name.slice(0, 6) || 'Grab'}
                            </div>
                            <div className="text-sm font-black text-[#042F2E] dark:text-white mt-2">
                              {apps[0]?.name || 'Grab'}
                            </div>
                            <div className="text-xs font-bold text-[#0F766E] dark:text-teal-300">
                              {l('Taksi & Ulaşım', 'Taxi & Ride')}
                            </div>
                          </a>

                          {/* App 2: Secondary Ride / Food App (e.g. Bolt) */}
                          <a
                            href={apps[1]?.url || 'https://bolt.eu'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 rounded-2xl bg-white dark:bg-[#072630] border border-teal-500/25 shadow-sm hover:-translate-y-0.5 transition-all flex flex-col items-center text-center no-underline"
                          >
                            <div className="w-14 h-14 rounded-2xl bg-[#10B981] flex items-center justify-center text-lg font-black text-white shadow-xs">
                              {apps[1]?.name.slice(0, 6) || 'Bolt'}
                            </div>
                            <div className="text-sm font-black text-[#042F2E] dark:text-white mt-2">
                              {apps[1]?.name || 'Bolt'}
                            </div>
                            <div className="text-xs font-bold text-[#0F766E] dark:text-teal-300">
                              {l('Ekonomik Taksi', 'Ride-Hailing')}
                            </div>
                          </a>

                          {/* App 3: Agoda / Booking (Hotel) */}
                          <a
                            href="https://www.agoda.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 rounded-2xl bg-white dark:bg-[#072630] border border-teal-500/25 shadow-sm hover:-translate-y-0.5 transition-all flex flex-col items-center text-center no-underline"
                          >
                            <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-500/30 flex flex-col items-center justify-center text-base font-black text-sky-700 dark:text-sky-300 shadow-xs">
                              <span>agoda</span>
                              <span className="text-[9px] tracking-widest text-rose-500">•••••</span>
                            </div>
                            <div className="text-sm font-black text-[#042F2E] dark:text-white mt-2">
                              Agoda (Otel)
                            </div>
                            <div className="text-xs font-bold text-[#0F766E] dark:text-teal-300">
                              {l('%35 İndirimli', 'Up to 35% Off')}
                            </div>
                          </a>

                          {/* App 4: Airalo (eSIM) */}
                          <a
                            href="https://www.airalo.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 rounded-2xl bg-white dark:bg-[#072630] border border-teal-500/25 shadow-sm hover:-translate-y-0.5 transition-all flex flex-col items-center text-center no-underline"
                          >
                            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-500/30 flex flex-col items-center justify-center text-sm font-black text-rose-600 dark:text-amber-300 shadow-xs">
                              <span>airalo</span>
                              <span className="text-[10px] text-[#0F766E] font-extrabold">5G eSIM</span>
                            </div>
                            <div className="text-sm font-black text-[#042F2E] dark:text-white mt-2">
                              Airalo (eSIM)
                            </div>
                            <div className="text-xs font-bold text-[#0F766E] dark:text-teal-300">
                              {l('Anında İnternet', 'Instant 5G')}
                            </div>
                          </a>
                        </div>
                      </div>

                      {/* 3. Sub-Tab Specific Cards (Visa / Practical / Deals / Insurance) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-[22px] bg-[#CCFBF1]/95 dark:bg-white/[0.06] border border-[#5EEAD4] space-y-2">
                          <h5 className="text-base font-black text-[#042F2E] dark:text-[#5EEAD4]">
                            🛂 {l('Vize & Sınır Giriş Kuralları', 'Visa & Border Entry Rules')}
                          </h5>
                          <p className="text-sm font-bold text-[#042F2E] dark:text-white leading-relaxed">
                            {l(
                              'En az 6 ay geçerli pasaport, dönüş uçak bileti ve ilk konaklama adresinizin rezervasyon belgesi ile sorunsuz giriş yapabilirsiniz.',
                              'Enter smoothly with at least 6 months passport validity, return flight ticket, and hotel booking.'
                            )}
                          </p>
                        </div>

                        <div className="p-5 rounded-[22px] bg-[#CCFBF1]/95 dark:bg-white/[0.06] border border-[#5EEAD4] space-y-2">
                          <h5 className="text-base font-black text-[#042F2E] dark:text-[#5EEAD4]">
                            🔌 {l('Pratik Bilgiler & Güvenlik', 'Practical Info & Safety')}
                          </h5>
                          <p className="text-sm font-bold text-[#042F2E] dark:text-white leading-relaxed">
                            {l('Priz Tipi:', 'Plug Type:')} {geo?.plugTypes || insights.plugType} ·{' '}
                            {l('Acil Numara:', 'Emergency:')} {insights.emergencyNumber} ·{' '}
                            {l('En İyi Sezon:', 'Best Season:')} {insights.bestSeason}
                          </p>
                        </div>
                      </div>

                      {/* Additional Partner Stages if user clicked "Otel & Uçak" or "Sigorta" */}
                      {(activeWidget.subTab === 'deals' || activeWidget.subTab === 'insurance') && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {conciergePlan.stages.map((st) => (
                            <a
                              key={st.stage}
                              href={st.primaryPartner.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-4 rounded-2xl bg-white/95 dark:bg-white/[0.08] border border-[#5EEAD4] flex items-center justify-between gap-3 no-underline"
                            >
                              <div>
                                <div className="text-xs font-extrabold text-[#0F766E] dark:text-[#5EEAD4]">
                                  {language === 'tr' ? st.titleTr : st.titleEn}
                                </div>
                                <div className="text-lg font-black text-[#042F2E] dark:text-white">
                                  {st.primaryPartner.brand}
                                </div>
                                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                  {language === 'tr' ? st.primaryPartner.taglineTr : st.primaryPartner.taglineEn}
                                </div>
                              </div>
                              <span className="px-4 py-2 rounded-full text-xs font-black bg-[#0D9488] text-white shrink-0">
                                {language === 'tr' ? st.primaryPartner.ctaTr : st.primaryPartner.ctaEn} →
                              </span>
                            </a>
                          ))}
                        </div>
                      )}

                      {/* 4. Bottom Full-Width Emerald-Lagoon Action Button (Matches Right Phone Screen 1:1) */}
                      <a
                        href="https://www.skyscanner.com.tr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0D9488] via-[#10B981] to-[#0D9488] hover:opacity-95 text-white font-black text-base sm:text-lg shadow-xl border-2 border-[#5EEAD4] flex items-center justify-center gap-2.5 no-underline transition-all"
                      >
                        <Plane className="w-5 h-5" />
                        <span>
                          {l(
                            '✈️ En Uygun Uçak & 🏨 Otel Fırsatlarını Gör',
                            '✈️ View Best Flight & 🏨 Hotel Deals'
                          )}
                        </span>
                      </a>
                    </div>
                  );
                })()}

              {/* --- B. PASSPORT SYNERGY & COMPARE SUB-WIDGET --- */}
              {activeWidget.id === 'synergy' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-black">
                      💡 {l(
                        'Ülkeye tıklayarak doğrudan o ülkenin rehber penceresine geçebilirsiniz:',
                        'Tap any country to open its guide window:'
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(['TH', 'JP', 'IT', 'GR', 'DE', 'AE', 'BR', 'KR'] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => openWidget('country_research', 'visa', c)}
                          className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-black bg-[#0F766E] text-white hover:bg-[#042F2E] transition-all cursor-pointer shadow-xs"
                        >
                          {getFlag(c)} {getCountryName(c, language)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                    <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                      <CompareTab initialPassportA={currentPassport} initialPassportB={effectiveSecondPassport} />
                    </Suspense>
                  </div>
                </div>
              )}

              {/* --- C. WORLD DAY COUNTER SUB-WIDGET --- */}
              {activeWidget.id === 'day_counter' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <DayCounterTab />
                  </Suspense>
                </div>
              )}

              {/* --- D. ROUTE PLANNER SUB-WIDGET --- */}
              {activeWidget.id === 'route_planner' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <RoutePlannerTab currentPassport={currentPassport} />
                  </Suspense>
                </div>
              )}

              {/* --- E. WHERE CAN I GO RADAR SUB-WIDGET --- */}
              {activeWidget.id === 'radar' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <WhereCanIGoTab currentPassport={currentPassport} />
                  </Suspense>
                </div>
              )}

              {/* --- F. DIGITAL NOMAD SUB-WIDGET --- */}
              {activeWidget.id === 'nomad' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <NomadToolsTab defaultSubTab="nomad" currentPassport={currentPassport} />
                  </Suspense>
                </div>
              )}

              {/* --- G. EMERGENCY & CONSULAR SUB-WIDGET --- */}
              {activeWidget.id === 'emergency' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <NomadToolsTab defaultSubTab="emergency" currentPassport={currentPassport} />
                  </Suspense>
                </div>
              )}

              {/* --- H. CURRENCY / WORLD CLOCK / PACKING QUICK LAUNCH --- */}
              {activeWidget.id === 'currency' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4]">
                      <div className="text-sm font-extrabold">🇺🇸 1 USD (Amerikan Doları)</div>
                      <div className="text-3xl font-black font-mono mt-1">₺{usdTry}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4]">
                      <div className="text-sm font-extrabold">🇪🇺 1 EUR (Euro)</div>
                      <div className="text-3xl font-black font-mono mt-1">₺{eurTry}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4]">
                      <div className="text-sm font-extrabold">🇬🇧 1 GBP (İngiliz Sterlini)</div>
                      <div className="text-3xl font-black font-mono mt-1">
                        ₺{getCrossRate('GBP', 'TRY').toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenGlobalRadar('currency');
                      }}
                      className="px-6 py-3.5 rounded-full text-sm font-black bg-[#5EEAD4] text-[#042F2E] cursor-pointer shadow-lg"
                    >
                      {l('Canlı Kur Hesaplayıcıyı Tam Ekran Aç →', 'Open Full Currency Converter →')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenTippingCalc();
                      }}
                      className="px-6 py-3.5 rounded-full text-sm font-black bg-white/20 text-white border border-white/30 cursor-pointer"
                    >
                      {l('Ülkelere Göre Bahşiş Hesaplayıcı →', 'Tipping Calculator →')}
                    </button>
                  </div>
                </div>
              )}

              {activeWidget.id === 'world_clock' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {[
                      { name: '🇹🇷 İstanbul', offset: 3 },
                      { name: '🇬🇧 Londra', offset: 1 },
                      { name: '🇯🇵 Tokyo', offset: 9 },
                      { name: '🇺🇸 New York', offset: -4 },
                      { name: '🇹🇭 Bangkok', offset: 7 },
                      { name: '🇦🇪 Dubai', offset: 4 },
                      { name: '🇩🇪 Berlin', offset: 2 },
                      { name: '🇰🇷 Seul', offset: 9 }
                    ].map((city) => (
                      <div
                        key={city.name}
                        className="p-4 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4]"
                      >
                        <div className="text-sm font-extrabold">{city.name}</div>
                        <div className="text-2xl font-black font-mono mt-1">
                          {formatCityTime(city.offset)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openWidget('route_planner', 'builder')}
                      className="px-6 py-3.5 rounded-full text-sm font-black bg-[#5EEAD4] text-[#042F2E] cursor-pointer shadow-lg"
                    >
                      {l('🗺️ Çok Duraklı Rota Planlayıcıyı Aç →', '🗺️ Open Multi-Stop Route Planner →')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenTimezoneOverlap();
                      }}
                      className="px-6 py-3.5 rounded-full text-sm font-black bg-white/20 text-white border border-white/30 cursor-pointer"
                    >
                      {l('🕒 Mesai & Toplantı Saati Çakıştırma →', '🕒 Timezone Overlap Tool →')}
                    </button>
                  </div>
                </div>
              )}

              {activeWidget.id === 'packing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      l('✓ En az 6 ay geçerli pasaport ve fotokopisi', '✓ Passport valid for at least 6 months'),
                      l('✓ Gidiş-dönüş uçak bileti ve otel rezervasyon çıktısı', '✓ Return flight ticket & hotel booking printout'),
                      l('✓ 30.000€ kapsamlı seyahat sağlık sigortası poliçesi', '✓ Travel health insurance policy (30,000€)'),
                      l('✓ Üniversal priz adaptörü ve taşınabilir şarj (Powerbank)', '✓ Universal plug adapter & powerbank'),
                      l('✓ Yurtdışı kullanıma açık banka/kredi kartı ve acil nakit döviz', '✓ International bank card & emergency cash'),
                      l('✓ Kabin bagajı sıvı kuralına (100ml) uygun kişisel bakım çantası', '✓ Cabin-compliant (100ml) toiletry bag')
                    ].map((itemText, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4] text-sm font-black"
                      >
                        {itemText}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeAllWidgets();
                      onOpenPackingList();
                    }}
                    className="px-6 py-3.5 rounded-full text-sm font-black bg-[#5EEAD4] text-[#042F2E] cursor-pointer shadow-lg"
                  >
                    {l('İnteraktif Bavul Sihirbazını Tam Ekran Aç →', 'Open Interactive Packing Wizard →')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
