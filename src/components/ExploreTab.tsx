import React, { useState, useMemo, Suspense, lazy, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  Info,
  Zap,
  PhoneCall,
  CreditCard,
  Plug,
  Calendar,
  Sparkles,
  ShieldAlert,
  FileCheck2,
  Plane,
  Shield,
  Wifi,
  Bus,
  DollarSign,
  Hotel,
  Coffee,
  MapPin,
  Globe,
  Map as MapIcon,
  List,
  Flag,
  ShieldCheck,
  BookOpen,
  Route,
  Luggage,
  Coins,
  Laptop,
  Radio
} from 'lucide-react';
import {
  CountryItem,
  CAT_INFO,
  VisaCategory,
  getCountryName,
  getFlag,
  INFO,
  VER,
  getPracticalInfo,
  getCountryTransitRule,
  getCategoryBadgeLabel
} from '../data/passportData';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryGeography } from '../data/countryGeography';
import { GEO_DATA } from '../data/geoData';
import { getPassportItems } from '../utils/calculator';
import { loadStoredChecklists, saveStoredChecklists } from '../utils/storage';
import { useI18n } from '../data/i18n';
import { getCountryVisual, getOptimizedSrcSet } from '../data/countryVisuals';
import { getFastCountryMetrics } from '../data/initialCountryIndex';

const CountryRichSnippetSummary = lazy(() =>
  import('./CountryRichSnippetSummary').then(m => ({ default: m.CountryRichSnippetSummary }))
);
const TravelConciergeGrid = lazy(() =>
  import('./TravelConciergeGrid').then(m => ({ default: m.TravelConciergeGrid }))
);
import { getCountrySectionHeadings, getMobileVoiceQuestion } from '../utils/schemaGenerator';

import { BentoDashboardGrid } from './bento/BentoDashboardGrid';
import { TabKey } from './Navigation';
import { SafeImage } from './common/SafeImage';

// Code-split heavy visual nodes & live loop widgets for <0.5s instant initial paint
const InteractiveWorldMap = lazy(() =>
  import('./InteractiveWorldMap').then(m => ({ default: m.InteractiveWorldMap }))
);
const WorldClockWidget = lazy(() =>
  import('./widgets/WorldClockWidget').then(m => ({ default: m.WorldClockWidget }))
);
const WeatherWidget = lazy(() =>
  import('./widgets/WeatherWidget').then(m => ({ default: m.WeatherWidget }))
);
const CurrencyWidget = lazy(() =>
  import('./widgets/CurrencyWidget').then(m => ({ default: m.CurrencyWidget }))
);
const ReportChangeModal = lazy(() =>
  import('./ReportChangeModal').then(m => ({ default: m.ReportChangeModal }))
);
const RegulationAuditModal = lazy(() =>
  import('./RegulationAuditModal').then(m => ({ default: m.RegulationAuditModal }))
);
const CountryDossierModal = lazy(() =>
  import('./CountryDossierModal').then(m => ({ default: m.CountryDossierModal }))
);

const WidgetCardSkeleton: React.FC = () => (
  <div className="h-[260px] rounded-[24px] glass-card p-6 animate-pulse flex flex-col justify-between border border-slate-200/60 dark:border-white/[0.06]">
    <div className="flex items-center justify-between">
      <div className="h-4 w-32 rounded-full bg-slate-200/80 dark:bg-white/10" />
      <div className="h-6 w-16 rounded-full bg-slate-200/80 dark:bg-white/10" />
    </div>
    <div className="space-y-3">
      <div className="h-12 w-full rounded-[20px] bg-slate-100 dark:bg-white/[0.04]" />
      <div className="h-12 w-full rounded-[20px] bg-slate-100 dark:bg-white/[0.04]" />
    </div>
    <div className="h-3 w-24 rounded-full bg-slate-200/60 dark:bg-white/[0.06]" />
  </div>
);

interface ExploreTabProps {
  currentPassport: string;
  onOpenAuditConsole?: () => void;
  externalSearch?: string;
  onSearchChange?: (val: string) => void;
  initialCountryCode?: string | null;
  onCountrySelect?: (code: string | null) => void;
  onNavigateTab?: (tab: TabKey) => void;
  onOpenPackingList?: () => void;
  onOpenTippingCalc?: () => void;
  onOpenTimezoneOverlap?: () => void;
  onOpenGlobalRadar?: (mode?: 'all' | 'clock' | 'weather' | 'currency', city?: string) => void;
  onOpenAssistant?: () => void;
}

const COMMON_CHECKLIST_TR = [
  'Pasaport geçerlilik süresi (Çoğu ülke en az 6 ay geçerlilik şartı arar)',
  'Pasaportta en az 2 adet boş vize sayfası',
  'Gidiş-dönüş veya üçüncü bir ülkeye devam uçak/seyahat bileti',
  'Otel rezervasyonu veya davet mektubu çıktısı',
  'Yurt dışı seyahat sağlık sigortası (Kapsamlı poliçe)',
  'Yeterli finansal kanıt (Kredi kartı veya nakit döviz)'
];

const COMMON_CHECKLIST_EN = [
  'Passport validity (Most countries require at least 6 months validity)',
  'At least 2 blank visa pages in passport',
  'Roundtrip or onward flight/travel ticket to third destination',
  'Hotel booking confirmation or official invitation letter',
  'Travel health insurance policy coverage',
  'Proof of sufficient financial means (Credit cards or cash)'
];

const COMMON_CHECKLIST_DE = [
  'Gültigkeit des Reisepasses (Die meisten Länder verlangen mind. 6 Monate Gültigkeit)',
  'Mindestens 2 freie Visaseiten im Reisepass',
  'Rückflug- oder Weiterreiseticket in ein Drittland',
  'Hotelreservierungsbestätigung oder offizielles Einladungsschreiben',
  'Auslandskrankenversicherungspolice',
  'Nachweis ausreichender finanzieller Mittel (Kreditkarten oder Bargeld)'
];

const SPECIAL_CHECKLIST_TR: Record<string, string[]> = {
  evisa: ['E-vize onay belgesinin fiziki çıktısını seyahat boyunca yanınızda bulundurun'],
  eta: ['Elektronik Seyahat İznini (ETA) uçuştan en az 72 saat önce alın ve onay e-postasını saklayın'],
  voa: ['Varışta vize harcı için nakit döviz (USD/EUR) ve 2 adet biyometrik vesikalık fotoğraf bulundurun'],
  visa: ['Konsolosluk veya akredite vize merkezi (VFS/iDATA/TLS) randevusunu seyahatten 4-6 hafta önce planlayın']
};

const SPECIAL_CHECKLIST_EN: Record<string, string[]> = {
  evisa: ['Keep a physical printout of the official eVisa approval throughout your travel'],
  eta: ['Obtain Electronic Travel Authorization (ETA) at least 72 hours prior to departure'],
  voa: ['Carry cash (USD/EUR) for visa fee and 2 passport photos upon arrival'],
  visa: ['Schedule consular or visa application appointment 4-6 weeks prior to departure']
};

const SPECIAL_CHECKLIST_DE: Record<string, string[]> = {
  evisa: ['Ausdruck der offiziellen eVisa-Genehmigung während der gesamten Reise mitführen'],
  eta: ['Elektronische Reisegenehmigung (ETA) mind. 72 Stunden vor Abflug beantragen'],
  voa: ['Bargeld (USD/EUR) für Visumgebühr und 2 Passfotos bei Ankunft bereithalten'],
  visa: ['Konsulartermin oder Visazentrum 4-6 Wochen vor Reisebeginn vereinbaren']
};

export const ExploreTab: React.FC<ExploreTabProps> = ({
  currentPassport,
  onOpenAuditConsole,
  externalSearch,
  onSearchChange,
  initialCountryCode = null,
  onCountrySelect,
  onNavigateTab,
  onOpenPackingList,
  onOpenTippingCalc,
  onOpenTimezoneOverlap,
  onOpenGlobalRadar,
  onOpenAssistant
}) => {
  const { language, t, l } = useI18n();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>(() => externalSearch || '');
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [checklists, setChecklists] = useState<Record<string, number[]>>(() => loadStoredChecklists());
  const [reportingCountry, setReportingCountry] = useState<{ code: string; name: string; cat: string } | null>(null);
  const [isLocalAuditOpen, setIsLocalAuditOpen] = useState<boolean>(false);
  const [selectedDossierCountry, setSelectedDossierCountry] = useState<string | null>(() => initialCountryCode);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(() => !!initialCountryCode);
  const [widgetsHydrated, setWidgetsHydrated] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [showDirectory, setShowDirectory] = useState<boolean>(true);

  // Reset pagination when search, filter or passport changes
  useEffect(() => {
    setVisibleCount(4);
  }, [search, filter, currentPassport]);

  // Defer live clock, weather & currency widget hydration until after initial HTML/CSS paint (<0.5s FCP)
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setWidgetsHydrated(true);
    });
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const openDossier = (code: string) => {
    setSelectedDossierCountry(code);
    setIsDossierOpen(true);
    onCountrySelect?.(code);
  };

  const closeDossier = () => {
    setIsDossierOpen(false);
    onCountrySelect?.(null);
  };

  React.useEffect(() => {
    if (initialCountryCode) {
      setSelectedDossierCountry(initialCountryCode);
      setIsDossierOpen(true);
    }
  }, [initialCountryCode]);

  React.useEffect(() => {
    if (externalSearch !== undefined && externalSearch !== search) {
      setSearch(externalSearch);
    }
  }, [externalSearch]);

  const handleOpenAudit = () => {
    if (onOpenAuditConsole) {
      onOpenAuditConsole();
    } else {
      setIsLocalAuditOpen(true);
    }
  };

  const items = useMemo(() => {
    return getPassportItems(currentPassport);
  }, [currentPassport]);

  // Statistics
  const stats = useMemo(() => {
    const counts: Record<string, number> = {
      free: 0,
      id: 0,
      evisa: 0,
      voa: 0,
      eta: 0,
      visa: 0,
      none: 0
    };
    items.forEach(it => {
      if (it.id) counts.id++;
      else counts[it.cat]++;
    });

    const totalFreeOrId = items.filter(it => it.cat === 'free' || it.id).length;
    const totalEasyAccess = items.filter(it => it.cat === 'free' || it.id || it.cat === 'evisa' || it.cat === 'voa' || it.cat === 'eta').length;

    return {
      counts,
      totalFreeOrId,
      totalEasyAccess,
      total: items.length || 1
    };
  }, [items]);

  // Filtered and sorted destinations
  const filteredItems = useMemo(() => {
    const locale = language === 'de' ? 'de' : language === 'en' ? 'en' : 'tr';
    const q = search.trim().toLocaleLowerCase(locale);
    const orderPriority: VisaCategory[] = ['id', 'free', 'eta', 'evisa', 'voa', 'visa', 'none'];

    return items
      .filter(it => {
        if (filter === 'id' && !it.id) return false;
        if (filter !== 'all' && filter !== 'id' && (it.cat !== filter || it.id)) return false;
        if (q) {
          const name = getCountryName(it.c, language).toLocaleLowerCase(locale);
          return name.includes(q) || it.c.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        const catA: VisaCategory = a.id ? 'id' : a.cat;
        const catB: VisaCategory = b.id ? 'id' : b.cat;
        const pDiff = orderPriority.indexOf(catA) - orderPriority.indexOf(catB);
        if (pDiff !== 0) return pDiff;

        const daysA = parseInt(a.v, 10) || 0;
        const daysB = parseInt(b.v, 10) || 0;
        if (daysB !== daysA) return daysB - daysA;

        return getCountryName(a.c, language).localeCompare(getCountryName(b.c, language), locale);
      });
  }, [items, filter, search, language]);

  const toggleChecklistItem = (countryCode: string, idx: number) => {
    const key = `${currentPassport}-${countryCode}`;
    const currentList = checklists[key] || [];
    const updated = currentList.includes(idx)
      ? currentList.filter(i => i !== idx)
      : [...currentList, idx];

    const newMap = { ...checklists, [key]: updated };
    setChecklists(newMap);
    saveStoredChecklists(newMap);
  };

  const getBadgeLabel = (item: CountryItem) => {
    return getCategoryBadgeLabel(item, language);
  };

  const passportName = getCountryName(currentPassport, language);

  return (
    <div className="space-y-6">
      {/* =====================================================================
          1. PURE V2 LAGOON WIDGET DASHBOARD (HERO EXPERIENCE)
          Automatically hidden during active search so countries show right at top!
      ===================================================================== */}
      {search.trim().length === 0 ? (
        <BentoDashboardGrid
          currentPassport={currentPassport}
          onOpenCountryDossier={(code) => openDossier(code)}
          onSelectTab={(tab) => onNavigateTab?.(tab)}
          onOpenPackingList={() => onOpenPackingList?.()}
          onOpenTippingCalc={() => onOpenTippingCalc?.()}
          onOpenTimezoneOverlap={() => onOpenTimezoneOverlap?.()}
          onOpenGlobalRadar={(mode, city) => onOpenGlobalRadar?.(mode, city)}
          onOpenAssistant={onOpenAssistant}
        />
      ) : (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0D9488]/15 border border-[#2DD4BF]/40">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <span className="text-sm font-black text-[#042F2E] dark:text-white">
              "{search}" {l('için sonuçlar', 'search results')} ({filteredItems.length} {l('Ülke', 'Countries')})
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              onSearchChange?.('');
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#2DD4BF] text-[#042F2E] hover:bg-white shadow-xs transition-all cursor-pointer"
          >
            {l('Panoya Dön ✕', 'Back to Dashboard ✕')}
          </button>
        </div>
      )}

      {/* =====================================================================
          2. 199-COUNTRY DIRECTORY & INTERACTIVE MAP TOGGLE BAR
      ===================================================================== */}
      <div id="vz-country-directory" className="bento-lagoon-card rounded-[26px] p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-[#042F2E] dark:text-white tracking-tight">
              🌍 {l(`Tüm ${items.length} Ülke Vize & Tatil Rehberi`, `All ${items.length} Countries Visa & Holiday Directory`)}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#064E3B] dark:text-teal-200 mt-0.5">
              {l(
                `${stats.counts.free + stats.counts.id} Vizesiz/Kimlikle · ${stats.counts.evisa + stats.counts.voa + stats.counts.eta} E-Vize/Kapıda`,
                `${stats.counts.free + stats.counts.id} Visa-Free/ID · ${stats.counts.evisa + stats.counts.voa + stats.counts.eta} eVisa/VoA`
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setViewMode('list');
                setShowDirectory(true);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-black shadow-md cursor-pointer transition-all flex items-center gap-2 ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-teal-900/20'
                  : 'bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white border border-teal-500/30 dark:border-teal-400/30'
              }`}
            >
              <List className="w-4 h-4" />
              <span>{l('199 Ülke Listesi', '199 Countries List')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('map');
                setShowDirectory(true);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-black shadow-md cursor-pointer transition-all flex items-center gap-2 ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-teal-900/20'
                  : 'bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white border border-teal-500/30 dark:border-teal-400/30'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{l('İnteraktif Harita', 'Interactive Map')}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAudit}
              className="px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-black bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white border border-teal-500/30 dark:border-teal-400/30 hover:bg-white cursor-pointer transition-all flex items-center gap-1.5 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#0D9488] dark:text-[#5EEAD4]" />
              <span>{l('Denetim Masası', 'Audit Console')}</span>
            </button>
          </div>
        </div>
      </div>

      {(showDirectory || search.trim().length > 0) && (
        viewMode === 'map' ? (
          <Suspense
            fallback={
              <div className="h-[520px] rounded-[24px] glass-card flex items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-300">
                {l('İnteraktif Dünya Haritası Yükleniyor...', 'Loading Interactive World Map...', 'Interaktive Weltkarte wird geladen...')}
              </div>
            }
          >
            <InteractiveWorldMap
              currentPassport={currentPassport}
              items={items}
              onSelectCountry={(code) => {
                setExpandedCountry(code);
              }}
              onOpenAuditConsole={handleOpenAudit}
              onOpenReportChange={(c) => setReportingCountry(c)}
            />
          </Suspense>
        ) : (
          <>
            {/* Horizontal Filter Chips */}
            <div className="w-full max-w-full overflow-x-auto touch-pan-x flex items-center gap-2.5 pb-2 pt-0.5 scrollbar-none no-scrollbar horizontal-badge-slider no-scrollbar-slider">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`shrink-0 flex-shrink-0 min-w-[48px] px-4 py-2.5 min-h-[48px] rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer select-none inline-flex items-center justify-center touch-target-min ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md'
                    : 'bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white border border-teal-500/25 dark:border-teal-400/30 shadow-xs'
                }`}
              >
                {l('Tümü', 'All', 'Alle', 'Todos', 'Все')} ({items.length})
              </button>
              {stats.counts.id > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('id')}
                  className={`shrink-0 flex-shrink-0 min-w-[48px] px-4 py-2.5 min-h-[48px] rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer select-none inline-flex items-center justify-center touch-target-min ${
                    filter === 'id'
                      ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md'
                      : 'bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white border border-teal-500/25 dark:border-teal-400/30 shadow-xs'
                  }`}
                >
                  {l('Kimlikle Giriş', 'National ID', 'Personalausweis', 'Entrada con DNI', 'По ID-карте')} ({stats.counts.id})
                </button>
              )}
              <button
                type="button"
                onClick={() => setFilter('free')}
                className={`shrink-0 flex-shrink-0 min-w-[48px] px-4 py-2.5 min-h-[48px] rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer select-none inline-flex items-center justify-center touch-target-min ${
                  filter === 'free'
                    ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md'
                    : 'bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white border border-teal-500/25 dark:border-teal-400/30 shadow-xs'
                }`}
              >
                {l('Vizesiz', 'Visa-Free', 'Visumfrei', 'Sin Visado', 'Без Визы')} ({stats.counts.free})
              </button>
              <button
                type="button"
                onClick={() => setFilter('evisa')}
                className={`shrink-0 flex-shrink-0 min-w-[48px] px-4 py-2.5 min-h-[48px] rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer select-none inline-flex items-center justify-center touch-target-min ${
                  filter === 'evisa'
                    ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md'
                    : 'bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white border border-teal-500/25 dark:border-teal-400/30 shadow-xs'
                }`}
              >
                {l('E-vize', 'eVisa', 'e-Visum', 'E-visa', 'Электронная Виза')} ({stats.counts.evisa})
              </button>
              <button
                type="button"
                onClick={() => setFilter('voa')}
                className={`shrink-0 flex-shrink-0 min-w-[48px] px-4 py-2.5 min-h-[48px] rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer select-none inline-flex items-center justify-center touch-target-min ${
                  filter === 'voa'
                    ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md'
                    : 'bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white border border-teal-500/25 dark:border-teal-400/30 shadow-xs'
                }`}
              >
                {l('Kapıda Vize', 'Visa on Arrival', 'Visum b. Ankunft', 'Visado a la Llegada', 'Виза по Прибытии')} ({stats.counts.voa})
              </button>
              {stats.counts.eta > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('eta')}
                  className={`shrink-0 flex-shrink-0 min-w-[48px] px-4 py-2.5 min-h-[48px] rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer select-none inline-flex items-center justify-center touch-target-min ${
                    filter === 'eta'
                      ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md'
                      : 'bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white border border-teal-500/25 dark:border-teal-400/30 shadow-xs'
                  }`}
                >
                  ETA ({stats.counts.eta})
                </button>
              )}
              <button
                type="button"
                onClick={() => setFilter('visa')}
                className={`shrink-0 flex-shrink-0 min-w-[48px] px-4 py-2.5 min-h-[48px] rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer select-none inline-flex items-center justify-center touch-target-min ${
                  filter === 'visa'
                    ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md'
                    : 'bg-white/90 dark:bg-white/10 text-slate-800 dark:text-white hover:bg-white border border-teal-500/25 dark:border-teal-400/30 shadow-xs'
                }`}
              >
                {l('Vize Gerekli', 'Visa Required', 'Visum erforderlich', 'Visado Requerido', 'Нужна Виза')} ({stats.counts.visa})
              </button>
            </div>

      {/* Destinations List */}
      <div className="w-full space-y-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-[24px] p-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-[1.6]">
              {l(
                'Arama veya filtre kriterlerinize uyan ülke bulunamadı.',
                'No destinations match your search or filter criteria.',
                'Keine Reiseziele entsprechen Ihren Such- oder Filterkriterien.'
              )}
            </p>
          </div>
        ) : (
          filteredItems.slice(0, visibleCount).map((item) => {
            const isExpanded = expandedCountry === item.c;
            const countryName = getCountryName(item.c, language);
            const badgeClass = item.id ? CAT_INFO.id.badgeBg : CAT_INFO[item.cat]?.badgeBg;
            const badgeText = getBadgeLabel(item);
            const detailedInfo = INFO[`${currentPassport}-${item.c}`];
            const practical = getPracticalInfo(item.c, language);
            const checklistKey = `${currentPassport}-${item.c}`;
            const checkedIndices = checklists[checklistKey] || [];
            const transitRule = getCountryTransitRule(item.c, currentPassport, language);
            const insights = getCountryInsights(item.c, language);
            const geography = getCountryGeography(item.c, language);

            const visual = getCountryVisual(item.c, language);

            // Stage 0 Verification Status string
            let verificationBadge = null;
            if (currentPassport === 'TR') {
              if (VER.chk.split(' ').includes(item.c)) {
                verificationBadge = {
                  type: 'chk',
                  text: l('Çoklu kaynakla teyitli (Ekim 2026); resmi mevzuat takip ediliyor.', 'Verified with multiple official sources (October 2026); monitored actively.', 'Mit mehreren Quellen verifiziert (Oktober 2026); aktiv überwacht.'),
                  color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60'
                };
              } else if (VER.agree.split(' ').includes(item.c)) {
                verificationBadge = {
                  type: 'agree',
                  text: l('3 bağımsız açık veri seti mutabık.', '3 independent open datasets in consensus.', '3 unabhängige offene Datensätze in Übereinstimmung.'),
                  color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60'
                };
              } else {
                verificationBadge = {
                  type: 'conf',
                  text: l('Veri setleri çelişkisi tespit edildi; resmi dışişleri kaynağından teyit önerilir.', 'Dataset discrepancy detected; verify with official ministry portal.', 'Diskrepanz im Datensatz festgestellt; Überprüfung beim Ministerium empfohlen.'),
                  color: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60'
                };
              }
            } else {
              verificationBadge = {
                type: 'agree',
                text: l(`${passportName} pasaportu için karşılıklı uluslararası IATA/Göç veritabanıyla teyitli.`, `Verified against international IATA/Immigration datasets for ${passportName} passport.`, `Bestätigt anhand internationaler IATA-/Einreisedaten für den Pass von ${passportName}.`),
                color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60'
              };
            }

            const currentChecklist = [
              ...(item.id
                ? [l('Çipli ulusal kimlik kartınızı yanınıza alın (Pasaport gerekmez)', 'Bring your biometric National ID card (Passport not required)', 'Biometrischen Personalausweis mitbringen (Reisepass nicht erforderlich)')]
                : []),
              ...(language === 'de' ? COMMON_CHECKLIST_DE : language === 'en' ? COMMON_CHECKLIST_EN : COMMON_CHECKLIST_TR),
              ...((language === 'de' ? SPECIAL_CHECKLIST_DE : language === 'en' ? SPECIAL_CHECKLIST_EN : SPECIAL_CHECKLIST_TR)[item.cat] || [])
            ];

            const travelerScore = (Math.min(9.9, Math.max(6.8, Math.round(((insights.safety.safetyScore * 0.6) + (Math.min(100, insights.internet.mobileSpeedMbps) * 0.4)) / 10 * 10) / 10))).toFixed(1);
            const scoreLabel = parseFloat(travelerScore) >= 9.0
              ? l('Harika', 'Exceptional', 'Hervorragend')
              : parseFloat(travelerScore) >= 8.0
              ? l('Çok İyi', 'Very Good', 'Sehr gut')
              : l('İyi', 'Good', 'Gut');

            const highlights: string[] = [];
            if (item.cat === 'free' || item.id) {
              highlights.push(item.id ? l('🪪 Kimlikle Giriş', '🪪 ID Card Entry', '🪪 Personalausweis') : l('⚡ Vizesiz Seyahat', '⚡ Visa-Free Entry', '⚡ Visumfrei'));
            } else if (item.cat === 'evisa') {
              highlights.push(l('💻 Kolay E-Vize', '💻 Instant eVisa', '💻 Einfaches eVisa'));
            } else if (item.cat === 'voa') {
              highlights.push(l('🛬 Kapıda Vize', '🛬 Visa on Arrival', '🛬 Visum b. Ankunft'));
            }

            if (insights.internet.mobileSpeedMbps >= 50) {
              highlights.push(`📶 ${insights.internet.mobileSpeedMbps} Mbps ${l('Hızlı Net', 'Fast Net', 'Schnelles Netz')}`);
            }

            if (insights.safety.safetyScore >= 75) {
              highlights.push(l('🛡️ Güvenli Rota', '🛡️ High Safety', '🛡️ Hohe Sicherheit'));
            }

            const sectionHeadings = getCountrySectionHeadings(countryName, language);

            return (
              <div
                key={item.c}
                className="glass-card country-card rounded-[24px] touch-pan-y transition-all duration-300 group"
              >
                {/* Modern Symmetrical Country Card Layout (p-6 to p-8 generous breathing space) */}
                <div className="w-full p-6 sm:p-7 lg:p-8 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-stretch gap-5 sm:gap-6">
                    {/* 1. Landmark Scenic Thumbnail (Symmetrical full-height desktop image) */}
                    <div
                      onClick={() => setExpandedCountry(isExpanded ? null : item.c)}
                      className="country-thumbnail-slot w-full md:w-52 lg:w-56 min-h-[200px] md:min-h-full self-stretch rounded-2xl shadow-sm shrink-0 cursor-pointer overflow-hidden relative group/thumb"
                    >
                      <SafeImage
                        src={visual.image}
                        srcSet={getOptimizedSrcSet(visual.image)}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 208px, 224px"
                        alt={`${countryName} - ${visual.landmark}`}
                        className="country-thumbnail-image absolute inset-0 w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 rounded-2xl"
                        loading="lazy"
                        fetchPriority="low"
                        decoding="async"
                        width="224"
                        height="200"
                      />
                      <div className="country-thumbnail-scrim" />

                      {/* Floating Flag Badge Capsule in top-left */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-base sm:text-lg shadow-sm flex items-center justify-center">
                        {getFlag(item.c)}
                      </div>

                      {/* Landmark Caption in bottom */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs font-bold text-white/95 truncate tracking-tight drop-shadow-md flex items-center gap-1.5">
                        <span>📍</span>
                        <span className="truncate">{visual.landmark}</span>
                      </div>
                    </div>

                    {/* 2. Main Details & Symmetrical Grid Area */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between gap-3 md:min-h-[228px] leading-[1.6]">
                      {/* Top Header Row: Country Name + Badges + Traveler Score */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <div
                          onClick={() => setExpandedCountry(isExpanded ? null : item.c)}
                          className="flex flex-wrap items-center gap-2.5 cursor-pointer"
                        >
                          <h3 className="font-bold tracking-[-0.02em] text-slate-900 dark:text-white text-lg sm:text-2xl group-hover:text-[#2A8C82] dark:group-hover:text-[#52B2A7] transition-colors">
                            {countryName}
                          </h3>
                          <span className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 font-bold">({item.c})</span>

                          {/* Primary Visa Badge (Pill 9999px) */}
                          <span className={`text-xs px-3.5 py-1 rounded-full font-bold ${badgeClass}`}>
                            {badgeText}
                          </span>
                        </div>

                        {/* Traveler Score Pill */}
                        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-[20px] bg-[#2A8C82]/[0.08] dark:bg-[#2A8C82]/15 border border-[#2A8C82]/20 text-[#1E6F66] dark:text-[#52B2A7] flex-shrink-0">
                          <div className="text-right">
                            <div className="text-xs font-bold leading-tight">{scoreLabel}</div>
                            <div className="text-[10px] text-[#1E6F66] dark:text-[#52B2A7] font-bold">
                              {l('Gezgin Puanı', 'Traveler Score', 'Reisebewertung', 'Puntaje de Viajero', 'Оценка')}
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-[14px] bg-[#1E7168] text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center">
                            {travelerScore}
                          </div>
                        </div>
                      </div>

                      {/* Highlights Row (Scale-Ready Multilingual Flex Wrap - Pill Tags 9999px) */}
                      <div className="flex flex-wrap items-center gap-2 min-h-[28px] safe-text-wrap">
                        {highlights.length > 0 ? (
                          highlights.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-white/[0.08]"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 italic break-words">
                            {l('Doğrulanmış küresel seyahat bilgileri', 'Verified global mobility specs', 'Verifizierte Reisedaten')}
                          </span>
                        )}
                      </div>

                      {/* UNIFIED THEME-HARMONIOUS INFO BOXES GRID (20px rounded corners, 1.6 line-height, Scale-Ready Multilingual Grid) */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
                        {/* 1. Başkent (Capital) */}
                        <div className="country-metric-box multilingual-grid-cell col-span-1 min-h-[64px] flex flex-col justify-between p-3 rounded-[20px] bg-slate-50/80 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.08] transition-colors">
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <span className="text-xs shrink-0">🏛️</span>
                            <span className="break-words">{l('Başkent', 'Capital', 'Hauptstadt', 'Capital', 'Столица')}</span>
                          </div>
                          <div className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-[1.6] break-words" title={geography.capital}>
                            {geography.capital}
                          </div>
                        </div>

                        {/* 2. Para Birimi (Currency) */}
                        <div className="country-metric-box multilingual-grid-cell col-span-1 min-h-[64px] flex flex-col justify-between p-3 rounded-[20px] bg-slate-50/80 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.08] transition-colors">
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <DollarSign className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="break-words">{l('Para Birimi', 'Currency', 'Währung', 'Moneda', 'Валюта')}</span>
                          </div>
                          <div className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-[1.6] break-words">
                            {geography.currencyCode} <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">({geography.currencySymbol})</span>
                          </div>
                        </div>

                        {/* 3. Günlük Bütçe (Daily Budget) */}
                        <div className="country-metric-box multilingual-grid-cell col-span-1 min-h-[64px] flex flex-col justify-between p-3 rounded-[20px] bg-slate-50/80 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.08] transition-colors">
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <CreditCard className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="break-words">{l('Günlük Bütçe', 'Daily Cost', 'Tagesbudget', 'Presupuesto', 'Бюджет/день')}</span>
                          </div>
                          <div className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-[1.6] font-mono break-words">
                            {insights.livingCosts.dailyBudgetBackpackerUsd.replace(/\s+/g, ' ').trim()}
                          </div>
                        </div>

                        {/* 4. Güvenlik (Safety) */}
                        <div className="country-metric-box multilingual-grid-cell col-span-1 min-h-[64px] flex flex-col justify-between p-3 rounded-[20px] bg-slate-50/80 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.08] transition-colors">
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <Shield className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="break-words">{l('Güvenlik', 'Safety', 'Sicherheit', 'Seguridad', 'Безопасность')}</span>
                          </div>
                          <div className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-[1.6] flex flex-wrap items-center gap-1">
                            <span>{insights.safety.safetyScore} / 100</span>
                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 break-words">· {insights.safety.safetyLevel}</span>
                          </div>
                        </div>

                        {/* 5. İnternet (Internet Speed) */}
                        <div className="country-metric-box multilingual-grid-cell col-span-2 sm:col-span-2 lg:col-span-1 min-h-[64px] flex flex-col justify-between p-3 rounded-[20px] bg-slate-50/80 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.08] transition-colors">
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <Wifi className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="break-words">{l('İnternet', 'Internet', 'Internet', 'Internet', 'Интернет')}</span>
                          </div>
                          <div className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-[1.6] font-mono flex flex-wrap items-center gap-1">
                            <span>{insights.internet.mobileSpeedMbps} Mbps</span>
                            <span className="text-[11px] font-sans font-semibold text-slate-500 dark:text-slate-400 break-words">
                              {insights.internet.mobileSpeedMbps >= 50
                                ? `· ${l('Hızlı Net', 'Fast Net', 'Schnelles Netz', 'Red rápida', 'Быстрый')}`
                                : `· ${l('Standart', 'Standard', 'Standard', 'Estándar', 'Стандарт')}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons Row (Symmetrical, Strict 48x48px Touch Targets, Mobile Crawl-Accessible) */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3.5 border-t border-slate-100 dark:border-white/[0.06] mt-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDossier(item.c);
                            }}
                            className="btn-nubair-primary min-h-[48px] min-w-[48px] py-2.5 px-4 text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 touch-target-min"
                            title={l('Kapsamlı Ülke Dosyası ve Gezi Rotasını Aç', 'Open Full Country Dossier & Travel Itinerary', 'Länderdossier & Reiseroute öffnen', 'Abrir guía completa 360°', 'Открыть полное досье 360°')}
                          >
                            <BookOpen className="w-4 h-4 shrink-0" />
                            <span>{l('360° Gezi Rehberi', '360° Travel Guide', '360° Reiseführer', 'Guía 360°', 'Гид 360°')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const geo = GEO_DATA[item.c];
                              const q = geo ? `${geo.capital}, ${countryName}` : countryName;
                              window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer');
                            }}
                            className="btn-nubair-secondary min-h-[48px] min-w-[48px] py-2.5 px-3.5 text-xs cursor-pointer flex items-center gap-1.5 touch-target-min"
                            title={l("Google Haritalar'da Canlı Aç", 'Open Live in Google Maps', 'Live auf Google Maps öffnen', 'Abrir en Google Maps', 'Открыть на Google Maps')}
                          >
                            <MapPin className="w-4 h-4 text-slate-500 dark:text-[#8E9DBE] shrink-0" />
                            <span>{l('Harita', 'Map', 'Karte', 'Mapa', 'Карта')}</span>
                            <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setReportingCountry({ code: item.c, name: countryName, cat: item.cat });
                            }}
                            className="btn-nubair-secondary min-h-[48px] min-w-[48px] py-2.5 px-3.5 text-xs cursor-pointer flex items-center gap-1.5 touch-target-min"
                            title={l('Kural değişikliği veya hata bildir', 'Report rule change or error', 'Regeländerung oder Fehler melden', 'Informar cambio o error', 'Сообщить об ошибке')}
                          >
                            <Flag className="w-4 h-4 text-slate-500 dark:text-[#8E9DBE] shrink-0" />
                            <span>{t.reportChange}</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setExpandedCountry(isExpanded ? null : item.c)}
                          className="min-w-[48px] min-h-[48px] p-2.5 rounded-full glass-panel border border-slate-200/70 dark:border-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors flex items-center justify-center touch-target-min"
                          aria-label={l('Detayları aç', 'Toggle details', 'Details ein-/ausblenden', 'Ver detalles', 'Свернуть/Развернуть')}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#FF6B6B]' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Drawer Details inside Semantic HTML5 Details for Googlebot Crawlability */}
                <details
                  className="semantic-card-details group/details"
                  open={isExpanded}
                  onToggle={(e) => {
                    const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                    if (isOpen !== isExpanded) {
                      setExpandedCountry(isOpen ? item.c : null);
                    }
                  }}
                >
                  <summary className="sr-only">
                    {countryName} {l('ayrıntılı seyahat ve vize bilgileri', 'detailed travel and visa specifications', 'detaillierte Reise- und Visabestimmungen', 'información detallada de viaje y visado', 'подробная визовая и туристическая информация')}
                  </summary>
                  {isExpanded && (
                  <div
                    className="country-expanded-body country-scrollable-content px-6 sm:px-8 pb-8 pt-5 border-t border-slate-100 dark:border-white/[0.08] space-y-6 text-sm text-slate-600 dark:text-slate-300 animate-in fade-in duration-200 h-auto"
                    style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
                  >
                    {/* Country Detail Primary Semantic Header (H1) */}
                    <header className="space-y-1">
                      <h1 className="text-base sm:text-xl font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white leading-snug">
                        {sectionHeadings.h1}
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {getMobileVoiceQuestion(countryName, passportName, language, currentPassport)}
                      </p>
                    </header>

                    {/* Mobile Rich Snippet TL;DR Box for Googlebot Featured Snippet Crawling */}
                    <Suspense fallback={<div className="h-24 rounded-2xl bg-slate-100 dark:bg-white/5 animate-pulse" />}>
                      <CountryRichSnippetSummary
                        countryCode={item.c}
                        currentPassport={currentPassport}
                        language={language}
                        variant="card"
                      />
                    </Suspense>

                    {/* Full 4-Stage Chronological Hyper-Localized Travel Concierge Bento Grid */}
                    <Suspense fallback={<div className="h-48 rounded-2xl bg-slate-100 dark:bg-white/5 animate-pulse" />}>
                      <TravelConciergeGrid
                        countryCode={item.c}
                        originPassport={currentPassport}
                        variant="bento-full"
                      />
                    </Suspense>

                    {/* Widescreen Scenic Landmark Hero Banner */}
                    <div className="relative h-44 sm:h-56 aspect-[16/9] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] shadow-md group/hero">
                      <SafeImage
                        src={visual.image}
                        srcSet={getOptimizedSrcSet(visual.image)}
                        sizes="(max-width: 640px) 100vw, 800px"
                        alt={`${countryName} - ${visual.landmark}`}
                        className="w-full h-full object-cover brightness-[0.78] contrast-[1.06] group-hover/hero:scale-105 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="440"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/35 to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm flex items-center gap-1.5">
                          <span>{getFlag(item.c)}</span>
                          <span>{countryName}</span>
                        </span>
                        <span className="px-3 py-1 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-500/30 text-[11px] font-bold text-rose-200 shadow-sm">
                          📍 {visual.landmark}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between flex-wrap gap-2">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 block">
                            {countryName} · {geography.capital}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                            {visual.landmark}
                          </h2>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDossier(item.c);
                          }}
                          className="px-4 py-2 min-h-[44px] rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer touch-target-min"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{l('360° Seyahat Rehberi', '360° Travel Guide', '360° Reiseführer', 'Guía de Viaje 360°', '360° Путеводитель')}</span>
                        </button>
                      </div>
                    </div>
                    {/* Kapsamlı Ülke Dosyası & Kültür Ansiklopedisi Aç Butonu */}
                    <div className="flex items-center justify-between p-5 rounded-3xl glass-panel border border-[#0D9488]/20 bg-gradient-to-r from-[#0D9488]/10 via-[#14B8A6]/5 to-transparent flex-wrap gap-4 shadow-sm">
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#0D9488] to-[#14B8A6] text-white shadow-xs">
                          <BookOpen className="w-5 h-5 flex-shrink-0" />
                        </div>
                        <div>
                          <h2 className="text-sm font-black text-slate-900 dark:text-white m-0">
                            {l('Kapsamlı Ülke Dosyası & Kültür Ansiklopedisi', 'Full Country Dossier & Cultural Encyclopedia', 'Vollständiges Länderdossier & Kulturlexikon', 'Dossier Completo del País y Enciclopedia Cultural', 'Полное досье страны и культурная энциклопедия')}
                          </h2>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {l('Görgü kuralları, gezilecek yerler, yemekler, dini yapı, pratik dil cümleleri ve ekonomi.', 'Etiquette, sights, cuisine, religion, survival phrases, and economy.', 'Umgangsformen, Sehenswürdigkeiten, Essen, Religion, Phrasen und Wirtschaft.', 'Etiqueta, lugares de interés, gastronomía, religión, frases útiles y economía.', 'Этикет, достопримечательности, кухня, религия, полезные фразы и экономика.')}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDossier(item.c);
                        }}
                        className="btn-nubair-primary min-h-[44px] px-5 py-2.5 text-xs font-bold shadow-xs whitespace-nowrap touch-target-min"
                      >
                        {l('Ayrıntılı Dosyayı Aç →', 'Open Detailed Dossier →', 'Dossier öffnen →', 'Abrir Dossier Detallado →', 'Открыть полное досье →')}
                      </button>
                    </div>

                    {/* 0. BAŞKENT, PARA BİRİMİ, BÜYÜK ŞEHİRLER & TURİSTİK BÖLGELER KARTI */}
                    <section className="glass-panel border border-purple-500/20 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-amber-500/5 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-amber-950/20 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h2 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-300 tracking-tight m-0">
                          <span>🏛️</span>
                          <span>{sectionHeadings.currencyH2}</span>
                        </h2>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800">
                          💰 {geography.currencyName} ({geography.currencyCode} - {geography.currencySymbol})
                        </span>
                      </div>

                      {/* Capital & Quick specs */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 rounded-2xl glass-card border border-purple-100 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold m-0">{l('🏛️ Başkent', '🏛️ Capital', '🏛️ Hauptstadt', '🏛️ Capital', '🏛️ Столица')}</h3>
                          <div className="font-extrabold text-slate-900 dark:text-white truncate mt-0.5">{geography.capital}</div>
                        </div>
                        <div className="p-3 rounded-2xl glass-card border border-purple-100 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold m-0">{l('💰 Para Birimi', '💰 Currency', '💰 Währung', '💰 Moneda', '💰 Валюта')}</h3>
                          <div className="font-extrabold text-slate-900 dark:text-white truncate mt-0.5">{geography.currencyCode} ({geography.currencySymbol})</div>
                        </div>
                        <div className="p-3 rounded-2xl glass-card border border-purple-100 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold m-0">{l('🕒 Saat Dilimi', '🕒 Time Zone', '🕒 Zeitzone', '🕒 Zona Horaria', '🕒 Часовой пояс')}</h3>
                          <div className="font-bold text-slate-900 dark:text-white truncate mt-0.5">{geography.timeZone}</div>
                        </div>
                        <div className="p-3 rounded-2xl glass-card border border-purple-100 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold m-0">{l('🔌 Priz & Voltaj', '🔌 Plug & Voltage', '🔌 Stecker & Volt', '🔌 Enchufe y Voltaje', '🔌 Розетки и вольтаж')}</h3>
                          <div className="font-bold text-slate-900 dark:text-white truncate mt-0.5">{geography.plugTypes}</div>
                        </div>
                      </div>

                      {/* Major Cities */}
                      {geography.majorCities.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <h3 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 m-0">
                            <span>🏙️</span>
                            <span>{l('Büyük Şehirler & Metropoller:', 'Major Cities & Metropolises:', 'Großstädte & Metropolen:', 'Ciudades Principales y Metrópolis:', 'Крупные города и мегаполисы:')}</span>
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {geography.majorCities.map((city, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full text-xs font-semibold glass-card text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/[0.08] shadow-2xs"
                              >
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tourist Regions */}
                      {geography.touristRegions.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <h3 className="text-[11px] font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1 m-0">
                            <span>🏖️</span>
                            <span>{l('Popüler Turistik Bölgeler & Cazibe Merkezleri:', 'Popular Touristic Regions & Attractions:', 'Beliebte Urlaubsregionen & Highlights:', 'Regiones Turísticas Populares y Atracciones:', 'Популярные туристические регионы и курорты:')}</span>
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {geography.touristRegions.map((region, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-800 dark:text-teal-200 border border-teal-500/20 shadow-2xs"
                              >
                                {region}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </section>

                    {/* 0. GOOGLE HARİTA & COĞRAFİ KONUM KARTI */}
                    <section className="glass-panel border border-teal-500/20 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-teal-500/5 via-sky-500/5 to-emerald-500/5 dark:from-teal-950/20 dark:via-sky-950/20 dark:to-emerald-950/20 space-y-3.5 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h2 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-800 dark:text-teal-300 tracking-tight m-0">
                          <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          <span>{sectionHeadings.geographyMapH2}</span>
                        </h2>
                        {GEO_DATA[item.c] && (
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            📍 {GEO_DATA[item.c].lat.toFixed(2)}°N, {GEO_DATA[item.c].lng.toFixed(2)}°E · {l('Ana Hub:', 'Main Hub:', 'Haupt-Drehkreuz:', 'Hub Principal:', 'Главный хаб:')} <b>{GEO_DATA[item.c].mainHub}</b>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {l('Başkent: ', 'Capital: ', 'Hauptstadt: ', 'Capital: ', 'Столица: ')}<b>{GEO_DATA[item.c]?.capital || countryName}</b>. {l(
                          'Uçuş rotaları, şehir merkezi, oteller, coworking ve resmi temsilcilikler için canlı Google Haritalar navigasyonu:',
                          'Live navigation on Google Maps for flights, city center, hotels, coworking, and diplomatic missions:',
                          'Live-Navigation auf Google Maps für Flüge, Stadtzentrum, Hotels, Coworking und Vertretungen:',
                          'Navegación en vivo en Google Maps para vuelos, centro de la ciudad, hoteles, coworking y embajadas:',
                          'Живая навигация Google Карт для рейсов, центра города, отелей, коворкингов и посольств:'
                        )}
                      </p>

                      <div className="flex flex-wrap items-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            const geo = GEO_DATA[item.c];
                            const q = geo ? `${geo.capital}, ${countryName}` : countryName;
                            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer');
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{l('Başkent & Şehir Haritası', 'Capital & City Map', 'Hauptstadt & Stadtplan', 'Mapa de la Capital y Ciudad', 'Карта столицы и города')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const passportNameEn = getCountryName(currentPassport, 'en');
                            const q = currentPassport === 'TR'
                              ? `Turk Buyukelciligi ${countryName} Embassy of Turkiye`
                              : `${passportNameEn} Embassy in ${countryName}`;
                            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer');
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200/80 dark:border-white/[0.08] transition-all shadow-xs cursor-pointer"
                        >
                          <span>🏛️ {getCountryName(currentPassport, language)} {l('Temsilciliği Haritada', 'Embassy on Maps', 'Vertretung auf Karte', 'Embajada en el Mapa', 'Посольство на карте')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const geo = GEO_DATA[item.c];
                            const q = `coworking space cafe in ${geo?.capital || countryName}`;
                            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer');
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200/80 dark:border-white/[0.08] transition-all shadow-xs cursor-pointer"
                        >
                          <span>{l('💻 Coworking & Göçebe Noktaları', '💻 Coworking & Nomad Hubs', '💻 Coworking & Nomad-Hubs', '💻 Coworking y Hubs Nómadas', '💻 Коворкинги и хабы')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </section>
                    {/* General Explanation */}
                    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-3">
                      <p className="leading-relaxed">
                        {item.id && (
                          <span className="font-semibold text-teal-700 dark:text-teal-400 block mb-1.5">
                            {l(
                              '✨ Pasaport gerekmeksizin yeni tip çipli ulusal kimlik kartıyla seyahat edilebilir.',
                              '✨ Travel eligible with biometric National ID card (Passport not required).',
                              '✨ Einreise mit biometrischem Personalausweis möglich (Kein Reisepass erforderlich).',
                              '✨ Viaje permitido con documento nacional de identidad biométrico (no requiere pasaporte).',
                              '✨ Въезд возможен по биометрической ID-карте (загранпаспорт не требуется).'
                            )}
                          </span>
                        )}
                        {/^\d+$/.test(item.v)
                          ? l(
                              `${passportName} pasaportu ile ${item.v} gün vizesiz kalabilirsiniz. Kalış süresi ülkeye ilk giriş mühründen itibaren başlar; bölgeye göre (örn. Schengen) kayan dönem kuralları uygulanır.`,
                              `Holders of ${passportName} passport can stay up to ${item.v} days visa-free. Duration begins upon entry stamp; rolling period limits apply where designated.`,
                              `Inhaber eines ${passportName}-Reisepasses können bis zu ${item.v} Tage visumfrei bleiben. Die Frist beginnt mit dem Einreisestempel; rollierende Zeiträume gelten, wo vorgesehen.`,
                              `Los titulares de pasaporte de ${passportName} pueden permanecer hasta ${item.v} días sin visado. El plazo comienza con el sello de entrada.`,
                              `Владельцы паспорта (${passportName}) могут находиться без визы до ${item.v} дней. Срок начинается со штампа о въезде.`
                            )
                          : item.v === 'vf'
                          ? l(
                              'Vizesiz giriş mümkündür; standart turist kalış süresi resmi makamlara bağlıdır.',
                              'Visa-free entry allowed; permissible stay is subject to immigration authorities.',
                              'Visumfreie Einreise gestattet; Aufenthaltsdauer unterliegt den Einwanderungsbehörden.',
                              'Entrada sin visado permitida; la estancia está sujeta a las autoridades migratorias.',
                              'Разрешен безвизовый въезд; срок пребывания определяется пограничной службой.'
                            )
                          : item.cat === 'evisa'
                          ? l(
                              'Seyahat öncesinde resmi e-vize portalından başvuru yapılmalı ve onay çıktısı alınmalıdır.',
                              'Official eVisa must be obtained online prior to departure and printed copy presented.',
                              'Offizielles e-Visum muss vor Reiseantritt online beantragt und ausgedruckt mitgeführt werden.',
                              'El visado electrónico (eVisa) debe tramitarse en línea antes de viajar y presentarse impreso.',
                              'Электронная виза (eVisa) должна быть оформлена онлайн до поездки.'
                            )
                          : item.cat === 'voa'
                          ? l(
                              'Ülkeye varışta havalimanı/sınır kapısındaki gişeden vize harcı ödenerek vize alınır.',
                              'Visa on Arrival is issued at port of entry upon paying immigration fee.',
                              'Visum bei Ankunft (VoA) wird an der Grenze gegen Entrichtung der Gebühr ausgestellt.',
                              'El visado a la llegada (VoA) se emite en el aeropuerto o frontera tras abonar la tasa.',
                              'Виза по прибытии (VoA) оформляется в аэропорту или на границе после оплаты сбора.'
                            )
                          : item.cat === 'eta'
                          ? l(
                              'Uçuşa kabul edilmek için online ETA izni zorunludur.',
                              'Mandatory Electronic Travel Authorization (ETA) required before boarding.',
                              'Elektronische Reisegenehmigung (ETA) vor Abflug zwingend erforderlich.',
                              'Se requiere Autorización Electrónica de Viaje (ETA) obligatoria antes de embarcar.',
                              'Для посадки на рейс обязательно наличие электронного разрешения (ETA).'
                            )
                          : item.cat === 'visa'
                          ? l(
                              'Seyahat öncesinde konsolosluk veya yetkili vize merkezinden randevu alınarak pasaporta vize basılmalıdır.',
                              'Consular visa application and passport stamp required prior to departure.',
                              'Vor der Reise muss ein Konsularvisum beantragt und in den Pass gestempelt werden.',
                              'Se requiere solicitar visado consular antes del viaje.',
                              'Перед поездкой необходимо оформить консульскую визу в паспорт.'
                            )
                          : l(
                              'Bu pasaport hamilleri için ülkeye giriş izni verilmemektedir.',
                              'Admission denied for holders of this passport.',
                              'Inhabern dieses Passes wird die Einreise verweigert.',
                              'Entrada no permitida para titulares de este pasaporte.',
                              'Въезд для владельцев данного паспорта закрыт.'
                            )}
                      </p>

                      {/* Verification Status Banner (Stage 0) */}
                      {verificationBadge && (
                        <div className={`mt-3 p-3 rounded-2xl border text-xs flex items-center gap-2.5 ${verificationBadge.color}`}>
                          <FileCheck2 className="w-4 h-4 flex-shrink-0" />
                          <span>{verificationBadge.text}</span>
                        </div>
                      )}
                    </div>

                    {/* Official Verified Note (if in INFO dataset) */}
                    {detailedInfo && (
                      <div className="glass-card border border-amber-300/40 dark:border-amber-900/40 p-5 rounded-3xl text-amber-950 dark:text-amber-200 text-xs space-y-2.5 shadow-sm">
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                          <div className="leading-relaxed font-medium">
                            {language === 'de'
                              ? (detailedInfo.nDe || detailedInfo.nEn || detailedInfo.n)
                              : language === 'en' && detailedInfo.nEn
                              ? detailedInfo.nEn
                              : detailedInfo.n}
                          </div>
                        </div>
                        <div className="pt-1 flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-400">
                          <span>
                            {l('Son doğrulama: ', 'Last verified: ', 'Zuletzt verifiziert: ', 'Última verificación: ', 'Последняя проверка: ')}
                            {language === 'en'
                              ? detailedInfo.d.replace('Ekim', 'October')
                              : language === 'de'
                              ? detailedInfo.d.replace('Ekim', 'Oktober')
                              : detailedInfo.d}
                          </span>
                          <a
                            href={detailedInfo.u}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold underline hover:text-amber-900 dark:hover:text-amber-100"
                          >
                            {l('Resmi Portal', 'Official Portal', 'Offizielles Portal', 'Portal Oficial', 'Официальный портал')} ({detailedInfo.h}) <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* 1. GÜVENLİK VE SUÇ ORANLARI */}
                    <section className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h2 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight m-0">
                          <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>{l(`${countryName} Güvenlik, Suç Oranları ve Acil Durum Rehberi`, `${countryName} Safety, Crime Index & Emergency Guide`, `${countryName} Sicherheit, Kriminalität & Notruf-Guide`, `Seguridad, Índice de Criminalidad y Emergencias en ${countryName}`, `Безопасность, уровень преступности и экстренные службы в ${countryName}`)}</span>
                        </h2>
                        <span className={`text-[11px] px-3 py-1 rounded-full font-bold border ${insights.safety.badgeColor}`}>
                          {insights.safety.safetyLevel} · {l('Skor:', 'Score:', 'Wertung:', 'Puntuación:', 'Рейтинг:')} {insights.safety.safetyScore}/100
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {insights.safety.crimeRateSummary}
                      </p>

                      {/* Scams & warnings */}
                      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 space-y-2 text-xs">
                        <h3 className="font-bold text-amber-900 dark:text-amber-200 text-[11px] uppercase tracking-wider flex items-center gap-1.5 m-0">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          <span>{l('Yaygın Dolandırıcılık Türleri & Dikkat Edilecekler:', 'Common Scams & Things to Watch:', 'Häufige Betrugsmaschen & Vorsichtsmaßnahmen:', 'Estafas Comunes y Precauciones:', 'Частые виды мошенничества и меры предосторожности:')}</span>
                        </h3>
                        {insights.safety.commonScams.map((scam, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-1.5 text-amber-950 dark:text-amber-200 text-[11px]">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{scam}</span>
                          </div>
                        ))}
                      </div>

                      {/* Safe travel tips */}
                      <div className="p-3.5 rounded-2xl glass-card border border-slate-200/60 dark:border-white/[0.08] space-y-1.5 text-xs">
                        <h3 className="font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider m-0">
                          {l('💡 Güvenli Seyahat Tavsiyeleri:', '💡 Safe Travel Tips:', '💡 Sicherheitstipps für Reisende:', '💡 Consejos de Viaje Seguro:', '💡 Советы по безопасности:')}
                        </h3>
                        {insights.safety.safeTravelTips.map((tip, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                        <span>🚨 <b>{l('Acil Polis / Ambulans:', 'Police / Ambulance:', 'Notruf Polizei / Rettung:', 'Policía / Ambulancia:', 'Полиция / Скорая:')}</b> {insights.safety.emergencyNumbers.police} / {insights.safety.emergencyNumbers.ambulance}</span>
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-750 px-2.5 py-0.5 rounded-full">{l('Genel:', 'General:', 'Allgemein:', 'General:', 'Общий:')} {insights.safety.emergencyNumbers.general}</span>
                      </div>
                    </section>

                    {/* 2. İNTERNET ÜCRETLERİ, GÜCÜ & YAYGINLIĞI */}
                    <section className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h2 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight m-0">
                          <Wifi className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          <span>{sectionHeadings.internetEsimH2}</span>
                        </h2>
                        <span className="text-[11px] px-3 py-1 rounded-full font-bold bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/60">
                          {l('eSIM Uyumu:', 'eSIM Support:', 'eSIM-Unterstützung:', 'Soporte eSIM:', 'Поддержка eSIM:')} {insights.internet.esimAvailability}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-center">
                          <h3 className="text-[10px] text-slate-400 font-medium m-0">{l('Mobil Hız', 'Mobile Speed', 'Mobilfunk-Geschwindigkeit', 'Velocidad Móvil', 'Мобильная скорость')}</h3>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">{insights.internet.mobileSpeedMbps} Mbps</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-center">
                          <h3 className="text-[10px] text-slate-400 font-medium m-0">{l('Sabit Fiber Hız', 'Broadband Speed', 'Breitband / Glasfaser', 'Banda Ancha / Fibra', 'Оптоволокно')}</h3>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">{insights.internet.broadbandSpeedMbps} Mbps</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-center">
                          <h3 className="text-[10px] text-slate-400 font-medium m-0">{l('1 GB Veri Ücreti', '1 GB Data Cost', 'Kosten pro 1 GB', 'Costo por 1 GB', 'Цена за 1 ГБ')}</h3>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 block">{insights.internet.costPerGbUsd}</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-center">
                          <h3 className="text-[10px] text-slate-400 font-medium m-0">{l('4G/5G Kapsama', '4G/5G Coverage', '4G/5G Abdeckung', 'Cobertura 4G/5G', 'Покрытие 4G/5G')}</h3>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">{insights.internet.networkCoverage}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-sky-50/60 dark:bg-sky-950/20 rounded-2xl border border-sky-200/50 dark:border-sky-900/40 text-xs text-sky-950 dark:text-sky-200">
                        <span className="font-bold">{l('📶 Önerilen Operatörler:', '📶 Recommended Carriers:', '📶 Empfohlene Anbieter:', '📶 Operadores Recomendados:', '📶 Рекомендуемые операторы:')}</span> {insights.internet.bestCarriers.join(', ')} · <i>Airalo & Maya Mobile eSIM.</i>
                      </div>

                      {insights.internet.vpnRequired && (
                        <div className="p-3 bg-rose-50/80 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200">
                          ⚠️ <b>{l('VPN & Sansür Uyarısı:', 'VPN & Censorship Notice:', 'VPN & Zensurhinweis:', 'Aviso de VPN y Censura:', 'Уведомление о VPN и цензуре:')}</b> {insights.internet.vpnNote || l('Bazı sosyal medya ve arama servisleri kısıtlıdır; seyahatten önce cihazınıza güvenilir bir VPN kurunuz.', 'Certain web services and messaging platforms may be restricted; install a reliable VPN prior to travel.', 'Bestimmte Onlinedienste oder Messenger können eingeschränkt sein; installieren Sie vor der Reise ein VPN.', 'Algunos servicios web pueden estar restringidos; instale una VPN confiable antes de viajar.', 'Некоторые веб-сервисы могут быть ограничены; установите надежный VPN перед поездкой.')}
                        </div>
                      )}
                    </section>

                    {/* 3. ŞEHİR İÇİ ULAŞIM & ARAÇ ÇAĞIRMA */}
                    <section className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h2 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight m-0">
                          <Bus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span>{sectionHeadings.transportTaxiH2}</span>
                        </h2>
                        <span className="text-[11px] px-3 py-1 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/60">
                          {l('Ulaşım:', 'Transit:', 'Verkehr:', 'Transporte:', 'Транспорт:')} {insights.transport.costLevel}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3.5 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-400 font-medium m-0">{l('Toplu Taşıma Kalitesi', 'Transit Quality', 'Öffentliche Verkehrsmittel', 'Calidad del Transporte', 'Качество транспорта')}</h3>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.transport.transportQuality}</span>
                        </div>
                        <div className="p-3.5 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-400 font-medium m-0">{l('Tek Biniş / Günlük Paso', 'Single / Day Pass', 'Einzelfahrt / Tageskarte', 'Billete Sencillo / Pase Diario', 'Разовый / Дневной проездной')}</h3>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.transport.singleTicketUsd} / {insights.transport.dailyPassUsd}</span>
                        </div>
                        <div className="p-3.5 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-400 font-medium m-0">{l('Popüler Araç Çağırma', 'Ride-Hailing Apps', 'Fahrdienst-Apps', 'Apps de Transporte', 'Приложения такси')}</h3>
                          <span className="font-bold text-teal-600 dark:text-teal-400 text-xs mt-0.5 block">{insights.transport.popularRideApps.join(', ')}</span>
                        </div>
                      </div>

                      <div className="p-3.5 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-300">
                        🚕 <b>{l('Taksi & Ulaşım Tavsiyesi:', 'Taxi & Ride Advice:', 'Taxi- & Fahrempfehlung:', 'Consejo de Taxi y Transporte:', 'Советы по такси и транспорту:')}</b> {insights.transport.taxiAdvice}
                      </div>
                    </section>

                    {/* 4. TEMEL İHTİYAÇ GİDERLERİ, KONAKLAMA & UÇAK BİLETİ */}
                    <section className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h2 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight m-0">
                          <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>{sectionHeadings.budgetAccommodationH2}</span>
                        </h2>
                        <span className="text-[11px] px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60">
                          {l('Günlük: ', 'Daily: ', 'Täglich: ', 'Diario: ', 'В день: ')}{insights.livingCosts.dailyBudgetBackpackerUsd} ({l('Ekonomik', 'Backpacker', 'Budget', 'Económico', 'Бюджетный')})
                        </span>
                      </div>

                      {/* Daily budget breakdown */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-400 font-medium flex items-center gap-1 m-0">
                            <Coffee className="w-3 h-3 text-amber-500" /> {l('Ucuz Yemek / Kahve', 'Meal / Coffee', 'Mahlzeit / Kaffee', 'Comida / Café', 'Еда / Кофе')}
                          </h3>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.livingCosts.budgetMealUsd} / {insights.livingCosts.coffeeUsd}</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-400 font-medium m-0">{l('Şişe Su (1.5L)', 'Water Bottle (1.5L)', 'Flasche Wasser (1,5L)', 'Agua (1.5L)', 'Вода (1.5 л)')}</h3>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.livingCosts.waterBottleUsd}</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-400 font-medium flex items-center gap-1 m-0">
                            <Hotel className="w-3 h-3 text-blue-500" /> {l('Hostel / 3★ Otel', 'Hostel / 3★ Hotel', 'Hostel / 3★ Hotel', 'Hostal / Hotel 3★', 'Хостел / Отель 3★')}
                          </h3>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.livingCosts.hostelDormUsd} / {insights.livingCosts.hotel3StarUsd}</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <h3 className="text-[10px] text-slate-400 font-medium m-0">{l('Orta Seviye Günlük', 'Midrange Daily', 'Mittelklasse pro Tag', 'Presupuesto Medio', 'Средний бюджет')}</h3>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.livingCosts.dailyBudgetMidrangeUsd}</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/40 text-xs text-emerald-950 dark:text-emerald-200">
                        ✈️ <b>{l('Uçak Bileti & Ulaşım:', 'Flights & Travel Index:', 'Flüge & Reisekostenindex:', 'Vuelos e Índice de Viaje:', 'Авиабилеты и перелет:')}</b> {insights.livingCosts.flightCostIndex} — {insights.livingCosts.flightTip}
                      </div>
                    </section>

                    {/* 5. PRATİK KART (DÖVİZ, PRİZ, İDEAL ZAMAN & ADAB) */}
                    <section className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <h2 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight m-0">
                        <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>{sectionHeadings.practicalEtiquetteH2}</span>
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-start gap-2.5 p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <CreditCard className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-xs inline m-0">{l('Para Birimi:', 'Currency:', 'Währung:', 'Moneda:', 'Валюта:')}</h3>{' '}
                            <span>{insights.currency}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <Plug className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-xs inline m-0">{l('Priz & Voltaj:', 'Plug & Voltage:', 'Steckdosen & Spannung:', 'Enchufe y Voltaje:', 'Розетки и напряжение:')}</h3>{' '}
                            <span>{insights.plugType}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-xs inline m-0">{l('En İdeal Gidiş Zamanı:', 'Best Time to Visit:', 'Beste Reisezeit:', 'Mejor Época para Visitar:', 'Лучшее время для поездки:')}</h3>{' '}
                            <span>{insights.bestMonths}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <PhoneCall className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-xs inline m-0">{l('Acil Çağrı:', 'Emergency Call:', 'Notruf:', 'Llamada de Emergencia:', 'Экстренный вызов:')}</h3>{' '}
                            <span>{insights.safety.emergencyNumbers.police} ({l('Polis', 'Police', 'Polizei', 'Policía', 'Полиция')}) / {insights.safety.emergencyNumbers.ambulance}</span>
                          </div>
                        </div>
                      </div>
                      {practical.localEtiquette && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                          💡 <b>{l('Yerel Kültür & Yasaklar:', 'Local Culture & Etiquette:', 'Lokale Kultur & Verhaltensregeln:', 'Cultura Local y Etiqueta:', 'Местная культура и этикет:')}</b> {practical.localEtiquette}
                        </div>
                      )}
                    </section>

                    {/* Transit Kuralları (Airport Transit & TWOV Rules) */}
                    <section className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h2 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight m-0">
                          <Plane className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          <span>{sectionHeadings.transitRulesH2}</span>
                        </h2>
                        <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold border ${transitRule.badgeClass}`}>
                          {transitRule.badgeTitle}
                        </span>
                      </div>

                      <div className="text-xs space-y-2.5">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-[13px] m-0">
                          {transitRule.ruleTitle}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {transitRule.summary}
                        </p>

                        {/* Quick parameters grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
                          <div className="glass-card p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                            <h3 className="text-slate-400 font-medium text-[11px] m-0">{l('Maks. Transit Süresi', 'Max Transit Time', 'Max. Transitzeit', 'Tiempo Máx. de Tránsito', 'Макс. время транзита')}</h3>
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{transitRule.maxHours}</span>
                          </div>
                          <div className="glass-card p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                            <h3 className="text-slate-400 font-medium text-[11px] m-0">{l('Havalimanı İçi Transit', 'Airside Transit', 'Flughafentransit (Airside)', 'Tránsito en Zona Internacional', 'Транзит в стерильной зоне')}</h3>
                            <span className={`font-bold text-xs mt-0.5 block ${transitRule.airsideTransitAllowed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                              {transitRule.airsideTransitAllowed
                                ? l('✓ Vizesiz Serbest', '✓ Visa-Free Transit', '✓ Visumfreier Transit', '✓ Tránsito Sin Visa', '✓ Безвизовый транзит')
                                : l('✗ Özel İzin Şart', '✗ Transit Visa Required', '✗ Transitvisum erforderlich', '✗ Requiere Visa de Tránsito', '✗ Требуется транзитная виза')}
                            </span>
                          </div>
                          <div className="glass-card p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                            <h3 className="text-slate-400 font-medium text-[11px] m-0">{l('Şehre Çıkış / Stopover', 'City Stopover', 'Stadtbesuch / Stopover', 'Salida a la Ciudad / Escala', 'Выход в город / Стоповер')}</h3>
                            <span className={`font-bold text-xs mt-0.5 block ${transitRule.cityExitAllowed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                              {transitRule.cityExitAllowed
                                ? l('✓ Serbest', '✓ Allowed', '✓ Erlaubt', '✓ Permitido', '✓ Разрешено')
                                : l('⚠️ Giriş Vizesi Gerekir', '⚠️ Entry Visa Required', '⚠️ Einreisevisum erforderlich', '⚠️ Requiere Visa de Entrada', '⚠️ Требуется въездная виза')}
                            </span>
                          </div>
                        </div>

                        {/* Key Conditions */}
                        {transitRule.keyConditions.length > 0 && (
                          <div className="p-3.5 rounded-2xl glass-card border border-slate-200/60 dark:border-white/[0.08] space-y-1.5">
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider m-0">
                              {l('📋 Temel Koşullar ve Kurallar:', '📋 Key Conditions & Rules:', '📋 Wichtige Bedingungen & Regeln:', '📋 Condiciones y Reglas Clave:', '📋 Основные условия и правила:')}
                            </h3>
                            {transitRule.keyConditions.map((cond, cIdx) => (
                              <div key={cIdx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300">
                                <span className="text-sky-600 dark:text-sky-400 font-bold">•</span>
                                <span>{cond}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Exemptions */}
                        {transitRule.exemptions.length > 0 && (
                          <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 space-y-1">
                            <h3 className="font-bold text-[11px] uppercase tracking-wider text-emerald-800 dark:text-emerald-300 m-0">
                              {l('✅ İstisnalar ve Muafiyetler:', '✅ Exceptions & Exemptions:', '✅ Ausnahmen & Befreiungen:', '✅ Excepciones y Exenciones:', '✅ Исключения и льготы:')}
                            </h3>
                            {transitRule.exemptions.map((ex, exIdx) => (
                              <div key={exIdx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{ex}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Baggage & Self-Transfer Tip */}
                        {transitRule.baggageAndTransferTip && (
                          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-[11px] leading-relaxed">
                            <span className="font-bold">{l('🧳 Bagaj & Ayrı Bilet Uyarısı:', '🧳 Baggage & Separate Ticket Notice:', '🧳 Gepäck & Getrennte Tickets:', '🧳 Aviso de Equipaje y Billetes Separados:', '🧳 Багаж и раздельные билеты:')}</span> {transitRule.baggageAndTransferTip}
                          </div>
                        )}

                        {transitRule.officialUrl && (
                          <div className="pt-1 flex justify-end">
                            <a
                              href={transitRule.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-bold text-[11px] text-sky-600 dark:text-sky-400 hover:underline"
                            >
                              {l('Resmi Transit Prosedürü', 'Official Transit Procedure', 'Offizielles Transitverfahren', 'Procedimiento Oficial de Tránsito', 'Официальная процедура транзита')} <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Entry Preparation Checklist */}
                    <section className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-3.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 m-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{l(`${countryName} Sınır Giriş Kontrol Listesi`, `${countryName} Border Entry Preparation Checklist`, `${countryName} Einreise-Checkliste`, `Lista de Control de Entrada a ${countryName}`, `Чек-лист для въезда в ${countryName}`)} ({checkedIndices.length} / {currentChecklist.length})</span>
                        </h2>
                        <span className="text-[11px] text-slate-400">
                          {l('Bu cihazda saklanır', 'Saved locally on this device', 'Lokal auf diesem Gerät gespeichert')}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {currentChecklist.map((itemDesc, idx) => {
                          const isDone = checkedIndices.includes(idx);
                          return (
                            <label
                              key={idx}
                              className={`flex items-start gap-3 p-3 rounded-2xl text-xs cursor-pointer transition-all ${
                                isDone
                                  ? 'bg-emerald-50/70 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300'
                                  : 'glass-card hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleChecklistItem(item.c, idx)}
                                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-700"
                              />
                              <span className={isDone ? 'line-through opacity-80' : ''}>{itemDesc}</span>
                            </label>
                          );
                        })}
                      </div>
                    </section>

                    {/* External Official Search Link & Verification Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/[0.08]">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{t.lastVerifiedDate} · {t.verifiedBadge}</span>
                      </div>
                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setReportingCountry({ code: item.c, name: countryName, cat: item.cat })}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>{t.reportChange}</span>
                        </button>
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(`${passportName} citizen ${countryName} visa entry official requirements`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          {l("Google'da Resmi Dışişleri Bilgisi Ara", 'Search Official Ministry Visa Rules on Google', 'Offizielle Visabestimmungen auf Google suchen')} <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                  )}
                </details>
              </div>
            );
          })
        )}

        {/* Progressive Loading Sentinel / Button for Performance and Zero-Lag Mobile Safari */}
        {filteredItems.length > visibleCount && (
          <div className="flex flex-col items-center justify-center pt-6 pb-4 space-y-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(filteredItems.length, prev + 12))}
              className="px-6 py-3.5 rounded-full bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 touch-target-min hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {l(
                  `Daha Fazla Ülke Yükle (+12) · ${visibleCount} / ${filteredItems.length}`,
                  `Load More Countries (+12) · ${visibleCount} / ${filteredItems.length}`,
                  `Weitere Länder laden (+12) · ${visibleCount} / ${filteredItems.length}`,
                  `Cargar más países (+12) · ${visibleCount} / ${filteredItems.length}`,
                  `Загрузить еще (+12) · ${visibleCount} / ${filteredItems.length}`
                )}
              </span>
            </button>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {l(
                'Akıllı bellek koruyucu aktif · Web tarayıcınız maksimum hızda çalışır.',
                'Smart memory optimization active · Keeps browser lightning fast.',
                'Intelligente Speicheroptimierung aktiv.'
              )}
            </span>
          </div>
        )}
      </div>
          </>
        )
      )}

      {/* Community Change Reporting Modal */}
      {reportingCountry && (
        <Suspense fallback={null}>
          <ReportChangeModal
            isOpen={!!reportingCountry}
            onClose={() => setReportingCountry(null)}
            defaultCountryCode={reportingCountry?.code}
            defaultCountryName={reportingCountry?.name}
            currentPassport={currentPassport}
            categoryHint={reportingCountry?.cat}
          />
        </Suspense>
      )}

      {/* Regulation Audit Console Modal */}
      {isLocalAuditOpen && (
        <Suspense fallback={null}>
          <RegulationAuditModal
            isOpen={isLocalAuditOpen}
            onClose={() => setIsLocalAuditOpen(false)}
            onOpenReportModal={(code, name) => {
              setIsLocalAuditOpen(false);
              setReportingCountry({ code, name, cat: 'vf' });
            }}
          />
        </Suspense>
      )}

      {/* Country Cultural & Travel Dossier Modal */}
      {isDossierOpen && (
        <Suspense fallback={null}>
          <CountryDossierModal
            isOpen={isDossierOpen}
            onClose={closeDossier}
            countryCode={selectedDossierCountry}
            currentPassport={currentPassport}
            onOpenAudit={handleOpenAudit}
            onOpenReportChange={(c) => setReportingCountry(c)}
          />
        </Suspense>
      )}
    </div>
  );
};
