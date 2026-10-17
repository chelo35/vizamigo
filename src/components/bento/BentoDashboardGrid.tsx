import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import {
  Search,
  Sparkles,
  ChevronDown,
  X
} from 'lucide-react';
import { Passports3DIllustration } from './BentoIllustrations';
import { useI18n } from '../../data/i18n';
import { getFlag, getCountryName, getCategoryBadgeLabel, CountryItem } from '../../data/passportData';
import { getPassportItems, compareDualPassports } from '../../utils/calculator';
import { getCrossRate } from '../../data/currencyRates';
import { getCountryVisual } from '../../data/countryVisuals';
import { getFastCountryMetrics, POPULAR_RESEARCH_COUNTRIES } from '../../data/initialCountryIndex';
import { TabKey } from '../Navigation';
import { SafeImage } from '../common/SafeImage';

const BentoSecondaryWidgets = lazy(() =>
  import('./BentoSecondaryWidgets').then((m) => ({ default: m.BentoSecondaryWidgets }))
);

const BentoSubWidgetModal = lazy(() =>
  import('./BentoSubWidgetModal').then((m) => ({ default: m.BentoSubWidgetModal }))
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
  onOpenAssistant?: () => void;
}

const BentoSecondaryWidgetsSkeleton: React.FC = () => (
  <>
    {[4, 5, 6, 7, 8, 9, 10].map((id) => (
      <div
        key={id}
        className="col-span-1 rounded-2xl sm:rounded-3xl bento-lagoon-card p-3 sm:p-4 min-h-[196px] sm:min-h-[216px] animate-pulse flex flex-col justify-between"
      >
        <div className="space-y-2">
          <div className="h-4 w-28 rounded-lg bg-teal-900/20 dark:bg-white/10" />
          <div className="h-3 w-16 rounded-lg bg-teal-900/15 dark:bg-white/5" />
        </div>
        <div className="h-20 w-20 mx-auto rounded-full bg-teal-900/10 dark:bg-white/5" />
        <div className="h-8 w-full rounded-xl bg-teal-900/20 dark:bg-white/10" />
      </div>
    ))}
  </>
);

export const BentoDashboardGrid: React.FC<BentoDashboardGridProps> = ({
  currentPassport,
  secondaryPassport = 'DE',
  onOpenCountryDossier,
  onSelectTab,
  onOpenPackingList,
  onOpenTippingCalc,
  onOpenTimezoneOverlap,
  onOpenGlobalRadar,
  onOpenAssistant
}) => {
  const { language, l } = useI18n();

  // Sub-widget modal stack state
  const [widgetStack, setWidgetStack] = useState<Array<{ id: BentoWidgetId; subTab?: string; countryCode?: string }>>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Interactive card local states & country search modal
  const [researchCountry, setResearchCountry] = useState<string>('TH');
  const [showCountrySearchModal, setShowCountrySearchModal] = useState<boolean>(false);
  const [countryPickerSearch, setCountryPickerSearch] = useState<string>('');
  const [appsCountry, setAppsCountry] = useState<string>('TH');

  // Passport items & stats
  const passportItems = useMemo(() => getPassportItems(currentPassport), [currentPassport]);

  // Real-time filtered countries for country search modal
  const allFilteredCountries = useMemo(() => {
    if (!countryPickerSearch.trim()) {
      return passportItems;
    }
    const q = countryPickerSearch.toLocaleLowerCase('tr').trim();
    return passportItems.filter((it: CountryItem) => {
      const code = it.c || (it as any).code || '';
      const name = getCountryName(code, language).toLocaleLowerCase('tr');
      return name.includes(q) || code.toLowerCase().includes(q);
    });
  }, [passportItems, countryPickerSearch, language]);

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
  const effectiveSecondPassport = useMemo(() => {
    if (secondaryPassport && secondaryPassport !== currentPassport) return secondaryPassport;
    if (currentPassport === 'TR') return 'DE';
    if (currentPassport === 'DE') return 'US';
    if (currentPassport === 'US') return 'GB';
    if (currentPassport === 'JP') return 'SG';
    if (currentPassport === 'GB') return 'DE';
    if (currentPassport === 'FR') return 'US';
    return currentPassport === 'DE' ? 'US' : 'DE';
  }, [currentPassport, secondaryPassport]);

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

  // Fast country metrics for initial paint
  const travelerGeo = useMemo(() => getFastCountryMetrics(currentPassport), [currentPassport]);
  const travelerCurr = travelerGeo?.currencyCode || 'USD';
  const travelerSymbol = travelerGeo?.currencySymbol || travelerCurr;

  const currencyDisplay = useMemo(() => {
    if (travelerCurr === 'USD') {
      const eurUsd = getCrossRate('EUR', 'USD').toFixed(2);
      const gbpUsd = getCrossRate('GBP', 'USD').toFixed(2);
      return {
        line1: `€1 = $${eurUsd}`,
        line2: `£1 = $${gbpUsd}`,
        card1: { flag: '🇪🇺', code: 'EUR', name: 'Euro', value: `$${eurUsd}` },
        card2: { flag: '🇬🇧', code: 'GBP', name: l('İngiliz Sterlini', 'British Pound'), value: `$${gbpUsd}` },
        card3: { flag: '🇯🇵', code: 'JPY', name: l('Japon Yeni', 'Japanese Yen'), value: `$${(1 / getCrossRate('USD', 'JPY')).toFixed(4)}` }
      };
    }
    if (travelerCurr === 'EUR') {
      const usdEur = getCrossRate('USD', 'EUR').toFixed(2);
      const gbpEur = getCrossRate('GBP', 'EUR').toFixed(2);
      return {
        line1: `$1 = €${usdEur}`,
        line2: `£1 = €${gbpEur}`,
        card1: { flag: '🇺🇸', code: 'USD', name: l('Amerikan Doları', 'US Dollar'), value: `€${usdEur}` },
        card2: { flag: '🇬🇧', code: 'GBP', name: l('İngiliz Sterlini', 'British Pound'), value: `€${gbpEur}` },
        card3: { flag: '🇨🇭', code: 'CHF', name: l('İsviçre Frangı', 'Swiss Franc'), value: `€${getCrossRate('CHF', 'EUR').toFixed(2)}` }
      };
    }
    const usdRate = getCrossRate('USD', travelerCurr).toFixed(2);
    const eurRate = getCrossRate('EUR', travelerCurr).toFixed(2);
    const gbpRate = getCrossRate('GBP', travelerCurr).toFixed(2);
    return {
      line1: `$1 = ${usdRate}${travelerSymbol}`,
      line2: `€1 = ${eurRate}${travelerSymbol}`,
      card1: { flag: '🇺🇸', code: 'USD', name: l('Amerikan Doları', 'US Dollar'), value: `${travelerSymbol}${usdRate}` },
      card2: { flag: '🇪🇺', code: 'EUR', name: 'Euro', value: `${travelerSymbol}${eurRate}` },
      card3: { flag: '🇬🇧', code: 'GBP', name: l('İngiliz Sterlini', 'British Pound'), value: `${travelerSymbol}${gbpRate}` }
    };
  }, [travelerCurr, travelerSymbol, language, l]);

  // Selected research country details & visual
  const researchCountryItem = useMemo(
    () => passportItems.find((i) => i.c === researchCountry),
    [passportItems, researchCountry]
  );
  const researchVisual = useMemo(() => getCountryVisual(researchCountry), [researchCountry]);
  const researchMetrics = useMemo(() => getFastCountryMetrics(researchCountry), [researchCountry]);

  const researchVisaBadge = useMemo(() => {
    if (!researchCountryItem) return { icon: '🛂', text: l('Vize Gerekli', 'Visa Required') };
    const label = getCategoryBadgeLabel(researchCountryItem, language);
    const icon = researchCountryItem.cat === 'free' || researchCountryItem.id ? '✅' : researchCountryItem.cat === 'evisa' ? '💻' : '🛂';
    return { icon, text: `${label} (${researchCountryItem.v} Gün)` };
  }, [researchCountryItem, language, l]);

  // Open a sub-widget window
  const openWidget = (id: BentoWidgetId, subTab?: string, countryCode?: string) => {
    setIsMinimized(false);
    setWidgetStack((prev) => [...prev, { id, subTab, countryCode }]);
  };

  const closeAllWidgets = () => {
    setWidgetStack([]);
    setIsMinimized(false);
    setIsFullscreen(false);
  };

  const goBackWidget = () => {
    setWidgetStack((prev) => prev.slice(0, -1));
  };

  const setActiveSubTab = (subTab: string) => {
    setWidgetStack((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      copy[copy.length - 1] = { ...copy[copy.length - 1], subTab };
      return copy;
    });
  };

  const activeWidget = widgetStack.length > 0 ? widgetStack[widgetStack.length - 1] : null;

  return (
    <section aria-label="Bento Travel Dashboard" className="space-y-3 sm:space-y-4">
      {/* =====================================================================
          AUTONOMOUS AI AGENTS & QUICK ACCESS DOCK (Top Horizontal Bar)
      ===================================================================== */}
      <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-gradient-to-r from-[#021824] via-[#04283b] to-[#011420] border-2 border-[#2DD4BF]/50 shadow-lg overflow-x-auto no-scrollbar scrollbar-none">
        <button
          type="button"
          onClick={() => onOpenAssistant?.()}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#e11d48] text-white hover:brightness-110 transition-all cursor-pointer shrink-0 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin-slow" />
          <span className="text-xs font-black whitespace-nowrap">{l('Otonom AI Ajanları', 'Autonomous AI Agents')}</span>
          <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-white text-[#ea580c]">4</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenAssistant?.()}
          className="px-3 py-1.5 rounded-xl bg-[#032030] hover:bg-[#063045] text-xs font-black text-cyan-200 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs border border-cyan-500/30"
        >
          <span>🛡️</span>
          <span>{l('Schengen Nöbetçisi', 'Schengen Sentinel')}</span>
        </button>
        <button
          type="button"
          onClick={() => onOpenAssistant?.()}
          className="px-3 py-1.5 rounded-xl bg-[#032030] hover:bg-[#063045] text-xs font-black text-emerald-200 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs border border-emerald-500/30"
        >
          <span>🛰️</span>
          <span>{l('Konsolosluk Kriz Masası', 'Consular Crisis Bot')}</span>
        </button>
        <button
          type="button"
          onClick={() => openWidget('radar', 'all')}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>🌍</span>
          <span>{l('Dünya Radarı', 'World Radar')}</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab?.('plan')}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>🛂</span>
          <span>{l('Pasaport Karşılaştır', 'Compare Passports')}</span>
        </button>
        <button
          type="button"
          onClick={() => openWidget('day_counter', 'schengen')}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>⏳</span>
          <span>{l('90/180 Gün Sayacı', 'Day Counter')}</span>
        </button>
        <button
          type="button"
          onClick={() => openWidget('currency', 'converter')}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>💱</span>
          <span>{l('Döviz & Bütçe', 'Currency & Budget')}</span>
        </button>
        <button
          type="button"
          onClick={() => onOpenTimezoneOverlap?.()}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>⏰</span>
          <span>{l('Dünya Saatleri', 'World Clock')}</span>
        </button>
        <button
          type="button"
          onClick={() => onOpenPackingList?.()}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>🧳</span>
          <span>{l('Akıllı Bavul', 'Packing List')}</span>
        </button>
        <button
          type="button"
          onClick={() => openWidget('nomad', 'hubs')}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>💻</span>
          <span>{l('Dijital Göçebe', 'Digital Nomad')}</span>
        </button>
        <button
          type="button"
          onClick={() => openWidget('local_apps', 'apps', appsCountry)}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>📱</span>
          <span>{l('Tüm Uygulamalar', 'All Apps')}</span>
        </button>
        <button
          type="button"
          onClick={() => onOpenTippingCalc?.()}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>💵</span>
          <span>{l('Bahşiş Hesaplayıcı', 'Tipping Calc')}</span>
        </button>
        <button
          type="button"
          onClick={() => openWidget('emergency', 'sos')}
          className="px-3 py-1.5 rounded-xl bg-[#13112c] hover:bg-[#1f1b4a] border border-indigo-400/50 text-xs font-black text-indigo-100 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>🆘</span>
          <span>{l('Acil Kriz Masası', 'Emergency SOS')}</span>
        </button>
      </div>

      {/* =====================================================================
          MAIN V2 LAGOON WIDGET GRID (ALL 10 WIDGETS UNIFORM COMPACT HALF-HEIGHT)
      ===================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-2.5 sm:gap-4">
        {/* -----------------------------------------------------------------
            WIDGET 1: PASAPORTUMLA NEREYE GİDEBİLİRİM? (LCP HERO)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('radar', 'all')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('radar', 'all')}
          className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#5EEAD4]/60 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between p-3 sm:p-4"
        >
          <SafeImage
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=420&q=50"
            alt={l('Turkuaz Lagün & Dünya Radarı', 'Turquoise Lagoon & World Radar')}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="420"
            height="216"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0284C7]/90 via-[#0EA5E9]/75 to-[#0D9488]/85" />

          <div className="relative z-10 space-y-1.5">
            <h2 className="text-sm sm:text-base font-black text-white leading-tight tracking-tight drop-shadow-md">
              {l('Pasaportumla Nereye Gidebilirim?', 'Where Can I Travel?')}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-lg text-xs sm:text-sm font-black bg-[#38BDF8] text-[#042637] shadow-xs">
                {stats.free} {l('Vizesiz', 'Visa-Free')}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-xs sm:text-sm font-black bg-[#5EEAD4] text-[#042F2E] shadow-xs">
                {stats.evisa} {l('E-Vize', 'eVisa')}
              </span>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-1.5 pt-1.5">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white text-[#042F2E] text-xs font-black shadow-md">
              🌍 {l('199 Ülke Radarı →', '199 Country Radar →')}
            </span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 2: ÜLKE ARAŞTIRMA MERKEZİ (SEARCH MODAL TRIGGER)
        ----------------------------------------------------------------- */}
        <div
          onClick={() => openWidget('country_research', 'visa', researchCountry)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openWidget('country_research', 'visa', researchCountry)}
          className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#5EEAD4]/60 shadow-xl transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between p-3 sm:p-4 cursor-pointer"
        >
          <SafeImage
            src={
              researchCountry === 'TH'
                ? 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=360&q=50'
                : researchVisual.image
            }
            alt={getCountryName(researchCountry, language)}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="eager"
            decoding="async"
            width="360"
            height="216"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0284C7]/90 via-[#0EA5E9]/70 to-[#0D9488]/85" />

          <div className="relative z-10 space-y-1.5">
            <div className="flex items-center justify-between gap-1">
              <h2 className="text-sm sm:text-base font-black text-white leading-tight tracking-tight drop-shadow-md">
                {l('Ülke Araştırma', 'Country Research')}
              </h2>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCountrySearchModal(true);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/25 hover:bg-white/40 text-white font-black text-xs sm:text-sm border border-white/40 backdrop-blur-md transition-all cursor-pointer shadow-xs"
              >
                <span>{getFlag(researchCountry)}</span>
                <span className="truncate max-w-[70px] sm:max-w-[100px]">{getCountryName(researchCountry, language)}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5EEAD4]" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="px-2 py-0.5 rounded-md text-xs sm:text-sm font-black bg-emerald-500/90 text-white shadow-xs">
                {researchVisaBadge.text}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs sm:text-sm font-black bg-sky-500/90 text-white shadow-xs">
                🔌 Tip {researchMetrics.plugTypes.split(',')[0]}
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openWidget('country_research', 'visa', researchCountry);
              }}
              className="w-full px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black bg-[#2DD4BF] hover:bg-white text-[#042F2E] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <span>{getFlag(researchCountry)}</span>
              <span className="truncate">{l('360° Rehberi Aç →', 'Open Dossier →')}</span>
            </button>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGET 3: PASAPORT KARŞILAŞTIR & SİNERJİ
        ----------------------------------------------------------------- */}
        <div
          onClick={() => onSelectTab?.('plan')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectTab?.('plan')}
          className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl bento-lagoon-card p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between"
        >
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-black text-[#011a17] dark:text-white leading-tight">
              {l('Pasaport Karşılaştır', 'Compare Passports')}
              <span className="block text-xs sm:text-sm font-bold text-[#03443d] dark:text-[#5EEAD4]">
                {l('& Güç Sinerjisi', '& Power Synergy')}
              </span>
            </h3>
            <div className="flex items-baseline gap-1.5 pt-0.5">
              <span className="text-xl sm:text-2xl font-black text-[#011a17] dark:text-[#5EEAD4] tracking-tight">
                {synergyStats.combinedFree}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#03443d] dark:text-teal-100">
                {l('Ülke Vizesiz', 'Visa-Free')}
              </span>
            </div>
          </div>

          <div className="h-24 sm:h-28 flex items-center justify-center my-1.5">
            <Passports3DIllustration
              codeA={currentPassport}
              codeB={effectiveSecondPassport}
              synergyCount={synergyStats.combinedFree}
            />
          </div>

          <div>
            <span className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#14B8A6] hover:from-[#0F766E] hover:to-[#0D9488] text-white text-xs sm:text-sm font-black shadow-xs transition-all">
              {l('Karşılaştır →', 'Compare →')}
            </span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            WIDGETS 4-10: CODE-SPLIT SECONDARY WIDGETS (SUSPENSE + SKELETON)
        ----------------------------------------------------------------- */}
        <Suspense fallback={<BentoSecondaryWidgetsSkeleton />}>
          <BentoSecondaryWidgets
            openWidget={openWidget}
            onOpenPackingList={onOpenPackingList}
            onOpenTippingCalc={onOpenTippingCalc}
            onOpenTimezoneOverlap={onOpenTimezoneOverlap}
            onOpenGlobalRadar={onOpenGlobalRadar}
            appsCountry={appsCountry}
            currencyDisplay={currencyDisplay}
            l={l}
          />
        </Suspense>
      </div>

      {/* =====================================================================
          POPUP MODAL: SEARCHABLE COUNTRY SELECTOR FOR 199 COUNTRIES
      ===================================================================== */}
      {showCountrySearchModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowCountrySearchModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#042637] border-2 border-[#2DD4BF] rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0D9488] flex items-center justify-center text-white">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {l('Ülke Araştırma Merkezi', 'Country Research Hub')}
                  </h3>
                  <p className="text-xs text-[#5EEAD4] font-bold">
                    {l('199 Ülke İçinden Seçin veya Arayın', 'Search & Select from 199 Countries')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCountrySearchModal(false)}
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instant Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#5EEAD4] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={countryPickerSearch}
                onChange={(e) => setCountryPickerSearch(e.target.value)}
                placeholder={l('Ülke adı veya kodu yazın (örn: Japonya, Tayland, Brezilya)...', 'Type country name or code...')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-[#2DD4BF]/50 text-white placeholder-slate-400 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                autoFocus
              />
            </div>

            {/* Popular Quick Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {POPULAR_RESEARCH_COUNTRIES.slice(0, 8).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setResearchCountry(code);
                    setShowCountrySearchModal(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black shrink-0 transition-all ${
                    researchCountry === code ? 'bg-[#2DD4BF] text-[#042F2E]' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {getFlag(code)} {getCountryName(code, language)}
                </button>
              ))}
            </div>

            {/* Scrollable list of 199 countries */}
            <div className="overflow-y-auto space-y-1 pr-1 flex-1">
              {allFilteredCountries.map((it: CountryItem) => {
                const code = it.c || (it as any).code || '';
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setResearchCountry(code);
                      setShowCountrySearchModal(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-black transition-colors ${
                      researchCountry === code
                        ? 'bg-[#0D9488] text-white shadow-sm'
                        : 'hover:bg-white/10 text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg leading-none">{getFlag(code)}</span>
                      <span>{getCountryName(code, language)}</span>
                      <span className="text-[10px] text-slate-400">({code})</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/15 text-[#5EEAD4]">
                      {getCategoryBadgeLabel(it, language)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
          EXPANDABLE CARD / SUB-WIDGET WINDOW MODAL (LAZY-LOADED)
      ===================================================================== */}
      {activeWidget && !isMinimized && (
        <Suspense fallback={null}>
          <BentoSubWidgetModal
            activeWidget={activeWidget}
            widgetStack={widgetStack}
            setWidgetStack={setWidgetStack}
            isMinimized={isMinimized}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
            setIsMinimized={setIsMinimized}
            closeAllWidgets={closeAllWidgets}
            goBackWidget={goBackWidget}
            openWidget={openWidget}
            currentPassport={currentPassport}
            secondaryPassport={secondaryPassport}
            onOpenCountryDossier={onOpenCountryDossier}
            onOpenPackingList={onOpenPackingList}
            onOpenTippingCalc={onOpenTippingCalc}
            onOpenTimezoneOverlap={onOpenTimezoneOverlap}
            onOpenGlobalRadar={onOpenGlobalRadar}
            researchCountry={researchCountry}
            setResearchCountry={setResearchCountry}
            appsCountry={appsCountry}
            setAppsCountry={setAppsCountry}
            passportItems={passportItems}
            effectiveSecondPassport={effectiveSecondPassport}
            currencyDisplay={currencyDisplay}
            language={language}
            setActiveSubTab={setActiveSubTab}
            l={l}
          />
        </Suspense>
      )}
    </section>
  );
};
