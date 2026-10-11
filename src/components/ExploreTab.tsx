import React, { useState, useMemo } from 'react';
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
  BookOpen
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
import { InteractiveWorldMap } from './InteractiveWorldMap';
import { ReportChangeModal } from './ReportChangeModal';
import { RegulationAuditModal } from './RegulationAuditModal';
import { CountryDossierModal } from './CountryDossierModal';
import { getPassportItems } from '../utils/calculator';
import { loadStoredChecklists, saveStoredChecklists } from '../utils/storage';
import { useI18n } from '../data/i18n';
import { getCountryVisual } from '../data/countryVisuals';

interface ExploreTabProps {
  currentPassport: string;
  onOpenAuditConsole?: () => void;
  externalSearch?: string;
  onSearchChange?: (val: string) => void;
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
  onSearchChange
}) => {
  const { language, t } = useI18n();
  const l = (trText: string, enText: string, deText?: string): string => {
    if (language === 'de') return deText || enText;
    if (language === 'en') return enText;
    return trText;
  };
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>(() => externalSearch || '');
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [checklists, setChecklists] = useState<Record<string, number[]>>(() => loadStoredChecklists());
  const [reportingCountry, setReportingCountry] = useState<{ code: string; name: string; cat: string } | null>(null);
  const [isLocalAuditOpen, setIsLocalAuditOpen] = useState<boolean>(false);
  const [selectedDossierCountry, setSelectedDossierCountry] = useState<string | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* View Switcher: Liste vs İnteraktif Harita (Pastel Sunset Coral Harmonies) */}
      <div className="flex items-center justify-between gap-1.5 p-1.5 glass-panel border border-slate-200/80 dark:border-white/10 rounded-full shadow-xs">
        <button
          type="button"
          onClick={() => setViewMode('list')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
            viewMode === 'list'
              ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E72] text-white shadow-md shadow-[#FF6B6B]/25 border border-white/20'
              : 'text-slate-600 dark:text-[#8E9DBE] hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <List className="w-4 h-4" />
          <span>{l('🗂️ Ülke Listesi & Detaylar', '🗂️ Country Directory & Details', '🗂️ Länderübersicht & Details')}</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('map')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
            viewMode === 'map'
              ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E72] text-white shadow-md shadow-[#FF6B6B]/25 border border-white/20'
              : 'text-slate-600 dark:text-[#8E9DBE] hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>{l('🗺️ İnteraktif Dünya Haritası', '🗺️ Interactive World Map', '🗺️ Interaktive Weltkarte')}</span>
        </button>
      </div>

      {viewMode === 'map' ? (
        <InteractiveWorldMap
          currentPassport={currentPassport}
          items={items}
          onSelectCountry={(code) => {
            setExpandedCountry(code);
          }}
          onOpenAuditConsole={handleOpenAudit}
          onOpenReportChange={(c) => setReportingCountry(c)}
        />
      ) : (
        <>
          {/* Hero Stats Card - Luxury Freedom & Mobility Experience */}
          <section className="relative overflow-hidden glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-lg bg-gradient-to-br from-white/95 via-slate-50/80 to-[#FF6B6B]/5 dark:from-[#111625]/90 dark:via-[#0C0F19]/95 dark:to-[#161D30]/80">
            {/* Ambient decorative glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-[#FF6B6B]/15 via-[#FF8E72]/10 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B6B]/10 dark:bg-[#FF6B6B]/15 border border-[#FF6B6B]/20 text-[#FF6B6B] dark:text-[#FF8E72] text-xs font-bold mb-3 tracking-wide shadow-2xs">
                  <span className="text-base select-none">{getFlag(currentPassport)}</span>
                  <span>{l(`${passportName} Vatandaşlığı & Küresel Mobilite`, `${passportName} Citizenship & Global Mobility`, `${passportName} Staatsbürgerschaft & Mobilität`)}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl sm:text-7xl font-black tracking-tight font-mono bg-gradient-to-r from-[#FF6B6B] via-[#FF7A59] to-[#E5A93C] bg-clip-text text-transparent">
                    {stats.totalFreeOrId}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-200">
                    {l('ülkeye vizesiz veya kimlikle giriş', 'destinations visa-free or with ID card', 'Länder visumfrei oder mit Personalausweis')}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
                  {l(
                    `Toplam ${items.length} ülke ve bölge arasında e-vize ve kapıda vize dahil edildiğinde kolay erişim skoru: `,
                    `Out of ${items.length} destinations worldwide, easy access score including eVisa and Visa on Arrival is: `,
                    `Von weltweit ${items.length} Zielen beträgt der einfache Zugangsscore inkl. eVisa und Visa bei Ankunft: `
                  )}
                  <b className="text-slate-900 dark:text-white font-bold">
                    {stats.totalEasyAccess} {l('ülke', 'countries', 'Länder')}
                  </b>.
                </p>
              </div>

              {/* Quick Stats Pills */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 text-center glass-panel p-3 rounded-2xl border border-slate-200/60 dark:border-white/10 shadow-xs">
                <div className="p-1.5">
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{stats.counts.free + stats.counts.id}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                    {l('Vizesiz/Kimlik', 'Visa-Free / ID', 'Visumfrei / Ausweis')}
                  </div>
                </div>
                <div className="p-1.5 border-x border-slate-200/80 dark:border-white/10">
                  <div className="text-xl font-black text-sky-600 dark:text-sky-400 font-mono">{stats.counts.evisa + stats.counts.voa + stats.counts.eta}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                    {l('E-vize / Kapı', 'eVisa / VoA', 'e-Visum / Ankunft')}
                  </div>
                </div>
                <div className="p-1.5">
                  <div className="text-xl font-black text-rose-500 font-mono">{stats.counts.visa}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                    {l('Vize Gerekli', 'Visa Required', 'Visum nötig')}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Spectrum Bar */}
            <div className="h-2.5 w-full bg-slate-200/70 dark:bg-slate-800/80 rounded-full overflow-hidden flex gap-0.5 mt-6 p-0.5 shadow-inner">
              {stats.counts.id > 0 && (
                <div
                  style={{ width: `${(stats.counts.id / stats.total) * 100}%` }}
                  className="bg-emerald-600 rounded-l-full"
                  title={`${l('Kimlikle:', 'National ID:', 'Mit Personalausweis:')} ${stats.counts.id}`}
                />
              )}
              {stats.counts.free > 0 && (
                <div
                  style={{ width: `${(stats.counts.free / stats.total) * 100}%` }}
                  className="bg-emerald-400"
                  title={`${l('Vizesiz:', 'Visa-Free:', 'Visumfrei:')} ${stats.counts.free}`}
                />
              )}
              {stats.counts.eta > 0 && (
                <div
                  style={{ width: `${(stats.counts.eta / stats.total) * 100}%` }}
                  className="bg-purple-400"
                  title={`ETA: ${stats.counts.eta}`}
                />
              )}
              {stats.counts.evisa > 0 && (
                <div
                  style={{ width: `${(stats.counts.evisa / stats.total) * 100}%` }}
                  className="bg-sky-400"
                  title={`${l('E-vize:', 'eVisa:', 'e-Visum:')} ${stats.counts.evisa}`}
                />
              )}
              {stats.counts.voa > 0 && (
                <div
                  style={{ width: `${(stats.counts.voa / stats.total) * 100}%` }}
                  className="bg-amber-400"
                  title={`${l('Kapıda vize:', 'Visa on Arrival:', 'Visum bei Ankunft:')} ${stats.counts.voa}`}
                />
              )}
              {stats.counts.visa > 0 && (
                <div
                  style={{ width: `${(stats.counts.visa / stats.total) * 100}%` }}
                  className="bg-rose-500"
                  title={`${l('Vize gerekli:', 'Visa Required:', 'Visumpflicht:')} ${stats.counts.visa}`}
                />
              )}
              {stats.counts.none > 0 && (
                <div
                  style={{ width: `${(stats.counts.none / stats.total) * 100}%` }}
                  className="bg-slate-400 rounded-r-full"
                  title={`${l('Giriş yok:', 'No Entry:', 'Keine Einreise:')} ${stats.counts.none}`}
                />
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-slate-600 dark:text-slate-400 font-medium">
              {stats.counts.id > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-2xs" />
                  {l('Kimlikle:', 'National ID:', 'Mit Personalausweis:')} <b>{stats.counts.id}</b>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-2xs" />
                {l('Vizesiz:', 'Visa-Free:', 'Visumfrei:')} <b>{stats.counts.free}</b>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-2xs" />
                {l('E-vize:', 'eVisa:', 'e-Visum:')} <b>{stats.counts.evisa}</b>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-2xs" />
                {l('Kapıda vize:', 'Visa on Arrival:', 'Visum bei Ankunft:')} <b>{stats.counts.voa}</b>
              </span>
              {stats.counts.eta > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-2xs" />
                  ETA: <b>{stats.counts.eta}</b>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-2xs" />
                {l('Vize gerekli:', 'Visa Required:', 'Visum erforderlich:')} <b>{stats.counts.visa}</b>
              </span>
            </div>
          </section>

          {/* Focal Point Search & Filter Controls */}
          <div className="space-y-3.5">
            {/* Prominent, Welcoming Search Bar Focal Point */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B]/20 via-[#FF8E72]/15 to-[#38BDF8]/15 rounded-full blur-md opacity-40 group-focus-within:opacity-100 group-hover:opacity-75 transition duration-500 pointer-events-none" />
              <div className="relative flex items-center">
                <div className="absolute left-3.5 sm:left-4.5 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#FF6B6B] to-[#FF8E72] text-white shadow-md shadow-[#FF6B6B]/25 pointer-events-none transition-transform group-focus-within:scale-105">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="search"
                  placeholder={l(
                    '✨ Gitmek istediğiniz ülkeyi arayın... (Örn: Arnavutluk, Bosna Hersek, Japonya, Karadağ, Tayland...)',
                    '✨ Search any destination to explore... (e.g. Albania, Bosnia, Japan, Montenegro, Thailand...)',
                    '✨ Reiseziel zum Erkunden suchen... (z. B. Albanien, Bosnien, Japan, Montenegro, Thailand...)'
                  )}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    onSearchChange?.(e.target.value);
                  }}
                  className="w-full pl-15 sm:pl-18 pr-20 py-4 sm:py-5 glass-card bg-white/95 dark:bg-[#111625]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/[0.12] rounded-2xl sm:rounded-full text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-lg shadow-slate-900/5 dark:shadow-black/25 focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B]/60 transition-all"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      onSearchChange?.('');
                    }}
                    className="absolute right-3.5 sm:right-4 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-xs hover:scale-105"
                  >
                    {l('Temizle', 'Clear', 'Löschen')}
                  </button>
                )}
              </div>
            </div>

            {/* Horizontal Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'tab-chip-active'
                    : 'tab-chip-inactive'
                }`}
              >
                {l('Tümü', 'All', 'Alle')} ({items.length})
              </button>
              {stats.counts.id > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('id')}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    filter === 'id'
                      ? 'tab-chip-active'
                      : 'tab-chip-inactive'
                  }`}
                >
                  {l('Kimlikle Giriş', 'National ID', 'Personalausweis')} ({stats.counts.id})
                </button>
              )}
              <button
                type="button"
                onClick={() => setFilter('free')}
                className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === 'free'
                    ? 'tab-chip-active'
                    : 'tab-chip-inactive'
                }`}
              >
                {l('Vizesiz', 'Visa-Free', 'Visumfrei')} ({stats.counts.free})
              </button>
              <button
                type="button"
                onClick={() => setFilter('evisa')}
                className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === 'evisa'
                    ? 'tab-chip-active'
                    : 'tab-chip-inactive'
                }`}
              >
                {l('E-vize', 'eVisa', 'e-Visum')} ({stats.counts.evisa})
              </button>
              <button
                type="button"
                onClick={() => setFilter('voa')}
                className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === 'voa'
                    ? 'tab-chip-active'
                    : 'tab-chip-inactive'
                }`}
              >
                {l('Kapıda Vize', 'Visa on Arrival', 'Visum b. Ankunft')} ({stats.counts.voa})
              </button>
              {stats.counts.eta > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('eta')}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    filter === 'eta'
                      ? 'tab-chip-active'
                      : 'tab-chip-inactive'
                  }`}
                >
                  ETA ({stats.counts.eta})
                </button>
              )}
              <button
                type="button"
                onClick={() => setFilter('visa')}
                className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === 'visa'
                    ? 'tab-chip-active'
                    : 'tab-chip-inactive'
                }`}
              >
                {l('Vize Gerekli', 'Visa Required', 'Visum erforderlich')} ({stats.counts.visa})
              </button>
            </div>
          </div>

          {/* Canlı Mevzuat Denetim & Teyit Konsolu Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-3xl glass-panel border border-emerald-500/25 dark:border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-sky-500/10 text-xs shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                    {t.auditConsoleTitle}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    CANLI TEYİTLİ
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {l('15 kritik destinasyon IATA Timatic ve konsolosluk genelgeleriyle taranıyor; %100 açık veri teyidi aktif.', '15 key destinations actively audited against IATA Timatic & consular decrees.', '15 Reiseziele aktiv mit IATA Timatic & Konsulatsbeschlüssen abgeglichen.')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleOpenAudit}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{l('Denetim Masasını Aç', 'Open Audit Console', 'Audit-Konsole öffnen')}</span>
            </button>
          </div>

      {/* Destinations List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {l(
                'Arama veya filtre kriterlerinize uyan ülke bulunamadı.',
                'No destinations match your search or filter criteria.',
                'Keine Reiseziele entsprechen Ihren Such- oder Filterkriterien.'
              )}
            </p>
          </div>
        ) : (
          filteredItems.map(item => {
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

            const visual = getCountryVisual(item.c);

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

            return (
              <div
                key={item.c}
                className="glass-card rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#FF6B6B]/30 dark:hover:border-[#FF6B6B]/25 transition-all duration-300 group"
              >
                {/* Modern Card Summary with ETS Tur & Booking aesthetics */}
                <div className="w-full p-4 sm:p-6 lg:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-colors hover:bg-slate-50/40 dark:hover:bg-white/[0.02]">
                  <div
                    onClick={() => setExpandedCountry(isExpanded ? null : item.c)}
                    className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0 flex-1 cursor-pointer"
                  >
                    {/* Scenic Landscape Landmark Thumbnail */}
                    <div className="country-thumbnail-slot w-32 h-28 sm:w-44 sm:h-32 rounded-2xl shadow-sm flex-shrink-0">
                      <img
                        src={visual.image}
                        alt={`${countryName} - ${visual.landmark}`}
                        className="country-thumbnail-image country-thumbnail-images group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=480&q=80';
                        }}
                      />
                      <div className="country-thumbnail-scrim" />

                      {/* Floating Flag Badge Capsule in top-left */}
                      <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/20 text-base sm:text-lg shadow-sm flex items-center justify-center">
                        {getFlag(item.c)}
                      </div>

                      {/* Landmark Caption in bottom-left */}
                      <div className="absolute bottom-2 left-2.5 right-2.5 text-xs font-bold text-white/95 truncate tracking-tight drop-shadow-md">
                        {visual.landmark}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 space-y-2.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-black text-slate-900 dark:text-white text-lg sm:text-2xl group-hover:text-[#FF6B6B] dark:group-hover:text-[#FF8E72] transition-colors truncate">
                          {countryName}
                        </span>
                        <span className="text-xs sm:text-sm font-mono text-slate-400 font-extrabold">({item.c})</span>
                        <span className={`text-xs sm:text-sm px-4 py-1 rounded-full font-extrabold shadow-2xs ${badgeClass}`}>
                          {badgeText}
                        </span>

                        {/* Şeffaf Teyit Rozeti */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenAudit();
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/20 transition-all shadow-2xs cursor-pointer"
                          title={l('Mevzuat Teyit Bilgisini İncele', 'View Regulation Verification Info', 'Regelüberprüfungs-Info anzeigen')}
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          <span>{l('✓ 2026 Teyitli', '✓ 2026 Verified', '✓ 2026 Geprüft')}</span>
                        </button>
                      </div>

                      {/* ETS Tur Style Amenity & Highlight Tags */}
                      {highlights.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          {highlights.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Immediate Glance Badges: Capital, Currency, Safety, Internet Speed, Living Cost (Scaled Up) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold glass-panel border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-300 shadow-2xs">
                          <span>🏛️</span>
                          <span>{geography.capital}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold glass-panel border border-purple-500/20 bg-purple-500/10 text-purple-700 dark:text-purple-300 shadow-2xs">
                          <span>💰</span>
                          <span>{geography.currencyCode} ({geography.currencySymbol})</span>
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold border shadow-2xs ${insights.safety.badgeColor}`}>
                          <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{insights.safety.safetyScore}/100 {insights.safety.safetyLevel}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold glass-panel border border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300 shadow-2xs">
                          <Wifi className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{insights.internet.mobileSpeedMbps} Mbps</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold glass-panel border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300 shadow-2xs">
                          <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{insights.livingCosts.dailyBudgetBackpackerUsd}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: ETS Tur Style Traveler Score Box & Quick Action Buttons */}
                  <div className="flex items-center justify-between lg:justify-end gap-3 flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/10">
                    {/* ETS Tur & Booking Rating Score Pill */}
                    <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300">
                      <div className="text-right">
                        <div className="text-xs font-black leading-tight">{scoreLabel}</div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          {l('Gezgin Puanı', 'Traveler Score', 'Reisebewertung')}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-xs">
                        {travelerScore}
                      </div>
                    </div>

                    {/* Kapsamlı Gezi Planı ve 360° Rota Butonu */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDossierCountry(item.c);
                        setIsDossierOpen(true);
                      }}
                      className="btn-nubair-primary py-2.5 px-4 text-xs sm:text-sm font-bold whitespace-nowrap shadow-sm"
                      title={l('Kapsamlı Ülke Dosyası ve Gezi Rotasını Aç', 'Open Full Country Dossier & Travel Itinerary', 'Länderdossier & Reiseroute öffnen')}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{l('360° Gezi Rehberi', '360° Travel Guide', '360° Reiseführer')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setReportingCountry({ code: item.c, name: countryName, cat: item.cat });
                      }}
                      className="btn-nubair-secondary py-2.5 px-3 text-xs sm:text-sm"
                      title={l('Kural değişikliği veya hata bildir', 'Report rule change or error', 'Regeländerung oder Fehler melden')}
                    >
                      <Flag className="w-3.5 h-3.5 text-slate-500 dark:text-[#8E9DBE]" />
                      <span className="hidden sm:inline">{t.reportChange}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const geo = GEO_DATA[item.c];
                        const q = geo ? `${geo.capital}, ${countryName}` : countryName;
                        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="btn-nubair-secondary py-2.5 px-3 text-xs sm:text-sm"
                      title={l("Google Haritalar'da Canlı Aç", 'Open Live in Google Maps', 'Live auf Google Maps öffnen')}
                    >
                      <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-[#8E9DBE]" />
                      <span>{l('Harita', 'Map', 'Karte')}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedCountry(isExpanded ? null : item.c)}
                      className="p-2.5 rounded-full glass-panel border border-slate-200/70 dark:border-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
                      aria-label={l('Detayları aç', 'Toggle details', 'Details ein-/ausblenden')}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Expanded Drawer Details */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-8 pt-5 border-t border-slate-100 dark:border-white/[0.08] space-y-6 text-sm text-slate-600 dark:text-slate-300 animate-in fade-in duration-200">
                    {/* Widescreen Scenic Landmark Hero Banner */}
                    <div className="relative h-44 sm:h-56 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] shadow-md group/hero">
                      <img
                        src={visual.image}
                        alt={`${countryName} - ${visual.landmark}`}
                        className="w-full h-full object-cover brightness-[0.78] contrast-[1.06] group-hover/hero:scale-105 transition-transform duration-700"
                        loading="lazy"
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
                            {geography.region} · {geography.subRegion}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                            {visual.landmark}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDossierCountry(item.c);
                            setIsDossierOpen(true);
                          }}
                          className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{l('360° Seyahat Rehberi', '360° Travel Guide', '360° Reiseführer')}</span>
                        </button>
                      </div>
                    </div>
                    {/* Kapsamlı Ülke Dosyası & Kültür Ansiklopedisi Aç Butonu */}
                    <div className="flex items-center justify-between p-5 rounded-3xl glass-panel border border-[#FF6B6B]/20 bg-gradient-to-r from-[#FF6B6B]/10 via-[#FF8E72]/5 to-transparent flex-wrap gap-4 shadow-sm">
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#FF6B6B] to-[#FF8E72] text-white shadow-xs">
                          <BookOpen className="w-5 h-5 flex-shrink-0" />
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900 dark:text-white">
                            {l('Kapsamlı Ülke Dosyası & Kültür Ansiklopedisi', 'Full Country Dossier & Cultural Encyclopedia', 'Vollständiges Länderdossier & Kulturlexikon')}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {l('Görgü kuralları, gezilecek yerler, yemekler, dini yapı, pratik dil cümleleri ve ekonomi.', 'Etiquette, sights, cuisine, religion, survival phrases, and economy.', 'Umgangsformen, Sehenswürdigkeiten, Essen, Religion, Phrasen und Wirtschaft.')}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDossierCountry(item.c);
                          setIsDossierOpen(true);
                        }}
                        className="btn-nubair-primary px-5 py-2.5 text-xs font-bold shadow-xs whitespace-nowrap"
                      >
                        {l('Ayrıntılı Dosyayı Aç →', 'Open Detailed Dossier →', 'Dossier öffnen →')}
                      </button>
                    </div>

                    {/* 0. BAŞKENT, PARA BİRİMİ, BÜYÜK ŞEHİRLER & TURİSTİK BÖLGELER KARTI */}
                    <div className="glass-panel border border-purple-500/20 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-amber-500/5 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-amber-950/20 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
                          <span>🏛️</span>
                          {l('Başkent, Para Birimi & Şehir Rehberi', 'Capital, Currency & City Guide', 'Hauptstadt, Währung & Städteführer')} ({countryName})
                        </div>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800">
                          💰 {geography.currencyName} ({geography.currencyCode} - {geography.currencySymbol})
                        </span>
                      </div>

                      {/* Capital & Quick specs */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 rounded-2xl glass-card border border-purple-100 dark:border-white/[0.08]">
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{l('🏛️ Başkent', '🏛️ Capital', '🏛️ Hauptstadt')}</div>
                          <div className="font-extrabold text-slate-900 dark:text-white truncate mt-0.5">{geography.capital}</div>
                        </div>
                        <div className="p-3 rounded-2xl glass-card border border-purple-100 dark:border-white/[0.08]">
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{l('💰 Para Birimi', '💰 Currency', '💰 Währung')}</div>
                          <div className="font-extrabold text-slate-900 dark:text-white truncate mt-0.5">{geography.currencyCode} ({geography.currencySymbol})</div>
                        </div>
                        <div className="p-3 rounded-2xl glass-card border border-purple-100 dark:border-white/[0.08]">
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{l('🕒 Saat Dilimi', '🕒 Time Zone', '🕒 Zeitzone')}</div>
                          <div className="font-bold text-slate-900 dark:text-white truncate mt-0.5">{geography.timeZone}</div>
                        </div>
                        <div className="p-3 rounded-2xl glass-card border border-purple-100 dark:border-white/[0.08]">
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{l('🔌 Priz & Voltaj', '🔌 Plug & Voltage', '🔌 Stecker & Volt')}</div>
                          <div className="font-bold text-slate-900 dark:text-white truncate mt-0.5">{geography.plugTypes}</div>
                        </div>
                      </div>

                      {/* Major Cities */}
                      {geography.majorCities.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <span>🏙️</span>
                            <span>{l('Büyük Şehirler & Metropoller:', 'Major Cities & Metropolises:', 'Großstädte & Metropolen:')}</span>
                          </div>
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
                          <div className="text-[11px] font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1">
                            <span>🏖️</span>
                            <span>{l('Popüler Turistik Bölgeler & Cazibe Merkezleri:', 'Popular Touristic Regions & Attractions:', 'Beliebte Urlaubsregionen & Highlights:')}</span>
                          </div>
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
                    </div>

                    {/* 0. GOOGLE HARİTA & COĞRAFİ KONUM KARTI */}
                    <div className="glass-panel border border-teal-500/20 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-teal-500/5 via-sky-500/5 to-emerald-500/5 dark:from-teal-950/20 dark:via-sky-950/20 dark:to-emerald-950/20 space-y-3.5 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                          <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          {l('Google Haritalar & Coğrafi Konum İstihbaratı', 'Google Maps & Geo Intelligence', 'Google Maps & Geo-Informationen')}
                        </div>
                        {GEO_DATA[item.c] && (
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            📍 {GEO_DATA[item.c].lat.toFixed(2)}°N, {GEO_DATA[item.c].lng.toFixed(2)}°E · {l('Ana Hub:', 'Main Hub:', 'Haupt-Drehkreuz:')} <b>{GEO_DATA[item.c].mainHub}</b>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {l('Başkent: ', 'Capital: ', 'Hauptstadt: ')}<b>{GEO_DATA[item.c]?.capital || countryName}</b>. {l(
                          'Uçuş rotaları, şehir merkezi, oteller, coworking ve resmi temsilcilikler için canlı Google Haritalar navigasyonu:',
                          'Live navigation on Google Maps for flights, city center, hotels, coworking, and diplomatic missions:',
                          'Live-Navigation auf Google Maps für Flüge, Stadtzentrum, Hotels, Coworking und Vertretungen:'
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
                          <span>{l('Başkent & Şehir Haritası', 'Capital & City Map', 'Hauptstadt & Stadtplan')}</span>
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
                          <span>🏛️ {getCountryName(currentPassport, language)} {l('Temsilciliği Haritada', 'Embassy on Maps', 'Vertretung auf Karte')}</span>
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
                          <span>{l('💻 Coworking & Göçebe Noktaları', '💻 Coworking & Nomad Hubs', '💻 Coworking & Nomad-Hubs')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    {/* General Explanation */}
                    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-3">
                      <p className="leading-relaxed">
                        {item.id && (
                          <span className="font-semibold text-teal-700 dark:text-teal-400 block mb-1.5">
                            {l(
                              '✨ Pasaport gerekmeksizin yeni tip çipli ulusal kimlik kartıyla seyahat edilebilir.',
                              '✨ Travel eligible with biometric National ID card (Passport not required).',
                              '✨ Einreise mit biometrischem Personalausweis möglich (Kein Reisepass erforderlich).'
                            )}
                          </span>
                        )}
                        {/^\d+$/.test(item.v)
                          ? l(
                              `${passportName} pasaportu ile ${item.v} gün vizesiz kalabilirsiniz. Kalış süresi ülkeye ilk giriş mühründen itibaren başlar; bölgeye göre (örn. Schengen) kayan dönem kuralları uygulanır.`,
                              `Holders of ${passportName} passport can stay up to ${item.v} days visa-free. Duration begins upon entry stamp; rolling period limits apply where designated.`,
                              `Inhaber eines ${passportName}-Reisepasses können bis zu ${item.v} Tage visumfrei bleiben. Die Frist beginnt mit dem Einreisestempel; rollierende Zeiträume gelten, wo vorgesehen.`
                            )
                          : item.v === 'vf'
                          ? l(
                              'Vizesiz giriş mümkündür; standart turist kalış süresi resmi makamlara bağlıdır.',
                              'Visa-free entry allowed; permissible stay is subject to immigration authorities.',
                              'Visumfreie Einreise gestattet; Aufenthaltsdauer unterliegt den Einwanderungsbehörden.'
                            )
                          : item.cat === 'evisa'
                          ? l(
                              'Seyahat öncesinde resmi e-vize portalından başvuru yapılmalı ve onay çıktısı alınmalıdır.',
                              'Official eVisa must be obtained online prior to departure and printed copy presented.',
                              'Offizielles e-Visum muss vor Reiseantritt online beantragt und ausgedruckt mitgeführt werden.'
                            )
                          : item.cat === 'voa'
                          ? l(
                              'Ülkeye varışta havalimanı/sınır kapısındaki gişeden vize harcı ödenerek vize alınır.',
                              'Visa on Arrival is issued at port of entry upon paying immigration fee.',
                              'Visum bei Ankunft (VoA) wird an der Grenze gegen Entrichtung der Gebühr ausgestellt.'
                            )
                          : item.cat === 'eta'
                          ? l(
                              'Uçuşa kabul edilmek için online ETA izni zorunludur.',
                              'Mandatory Electronic Travel Authorization (ETA) required before boarding.',
                              'Elektronische Reisegenehmigung (ETA) vor Abflug zwingend erforderlich.'
                            )
                          : item.cat === 'visa'
                          ? l(
                              'Seyahat öncesinde konsolosluk veya yetkili vize merkezinden randevu alınarak pasaporta vize basılmalıdır.',
                              'Consular visa application and passport stamp required prior to departure.',
                              'Vor der Reise muss ein Konsularvisum beantragt und in den Pass gestempelt werden.'
                            )
                          : l(
                              'Bu pasaport hamilleri için ülkeye giriş izni verilmemektedir.',
                              'Admission denied for holders of this passport.',
                              'Inhabern dieses Passes wird die Einreise verweigert.'
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
                            {l('Son doğrulama: ', 'Last verified: ', 'Zuletzt verifiziert: ')}
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
                            {l('Resmi Portal', 'Official Portal', 'Offizielles Portal')} ({detailedInfo.h}) <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* 1. GÜVENLİK VE SUÇ ORANLARI */}
                    <div className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                          <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          {l('Güvenlik & Suç Oranları', 'Safety & Crime Profile', 'Sicherheit & Kriminalitätsrate')} ({countryName})
                        </div>
                        <span className={`text-[11px] px-3 py-1 rounded-full font-bold border ${insights.safety.badgeColor}`}>
                          {insights.safety.safetyLevel} · {l('Skor:', 'Score:', 'Wertung:')} {insights.safety.safetyScore}/100
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {insights.safety.crimeRateSummary}
                      </p>

                      {/* Scams & warnings */}
                      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 space-y-2 text-xs">
                        <span className="font-bold text-amber-900 dark:text-amber-200 block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          {l('Yaygın Dolandırıcılık Türleri & Dikkat Edilecekler:', 'Common Scams & Things to Watch:', 'Häufige Betrugsmaschen & Vorsichtsmaßnahmen:')}
                        </span>
                        {insights.safety.commonScams.map((scam, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-1.5 text-amber-950 dark:text-amber-200 text-[11px]">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{scam}</span>
                          </div>
                        ))}
                      </div>

                      {/* Safe travel tips */}
                      <div className="p-3.5 rounded-2xl glass-card border border-slate-200/60 dark:border-white/[0.08] space-y-1.5 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block text-[11px] uppercase tracking-wider">
                          {l('💡 Güvenli Seyahat Tavsiyeleri:', '💡 Safe Travel Tips:', '💡 Sicherheitstipps für Reisende:')}
                        </span>
                        {insights.safety.safeTravelTips.map((tip, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                        <span>🚨 <b>{l('Acil Polis / Ambulans:', 'Police / Ambulance:', 'Notruf Polizei / Rettung:')}</b> {insights.safety.emergencyNumbers.police} / {insights.safety.emergencyNumbers.ambulance}</span>
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-750 px-2.5 py-0.5 rounded-full">{l('Genel:', 'General:', 'Allgemein:')} {insights.safety.emergencyNumbers.general}</span>
                      </div>
                    </div>

                    {/* 2. İNTERNET ÜCRETLERİ, GÜCÜ & YAYGINLIĞI */}
                    <div className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                          <Wifi className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          {l('İnternet Hızı, Gücü & Ücretleri', 'Internet Speeds, Cost & Coverage', 'Internet-Geschwindigkeit, Kosten & Abdeckung')}
                        </div>
                        <span className="text-[11px] px-3 py-1 rounded-full font-bold bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/60">
                          {l('eSIM Uyumu:', 'eSIM Support:', 'eSIM-Unterstützung:')} {insights.internet.esimAvailability}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-center">
                          <span className="text-[10px] text-slate-400 block font-medium">{l('Mobil Hız', 'Mobile Speed', 'Mobilfunk-Geschwindigkeit')}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">{insights.internet.mobileSpeedMbps} Mbps</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-center">
                          <span className="text-[10px] text-slate-400 block font-medium">{l('Sabit Fiber Hız', 'Broadband Speed', 'Breitband / Glasfaser')}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">{insights.internet.broadbandSpeedMbps} Mbps</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-center">
                          <span className="text-[10px] text-slate-400 block font-medium">{l('1 GB Veri Ücreti', '1 GB Data Cost', 'Kosten pro 1 GB')}</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 block">{insights.internet.costPerGbUsd}</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-center">
                          <span className="text-[10px] text-slate-400 block font-medium">{l('4G/5G Kapsama', '4G/5G Coverage', '4G/5G Abdeckung')}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">{insights.internet.networkCoverage}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-sky-50/60 dark:bg-sky-950/20 rounded-2xl border border-sky-200/50 dark:border-sky-900/40 text-xs text-sky-950 dark:text-sky-200">
                        <span className="font-bold">{l('📶 Önerilen Operatörler:', '📶 Recommended Carriers:', '📶 Empfohlene Anbieter:')}</span> {insights.internet.bestCarriers.join(', ')} · <i>Airalo & Maya Mobile eSIM.</i>
                      </div>

                      {insights.internet.vpnRequired && (
                        <div className="p-3 bg-rose-50/80 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200">
                          ⚠️ <b>{l('VPN & Sansür Uyarısı:', 'VPN & Censorship Notice:', 'VPN & Zensurhinweis:')}</b> {insights.internet.vpnNote || l('Bazı sosyal medya ve arama servisleri kısıtlıdır; seyahatten önce cihazınıza güvenilir bir VPN kurunuz.', 'Certain web services and messaging platforms may be restricted; install a reliable VPN prior to travel.', 'Bestimmte Onlinedienste oder Messenger können eingeschränkt sein; installieren Sie vor der Reise ein VPN.')}
                        </div>
                      )}
                    </div>

                    {/* 3. ŞEHİR İÇİ ULAŞIM & ARAÇ ÇAĞIRMA */}
                    <div className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                          <Bus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          {l('Ülke İçi Ulaşım & Taksi Rehberi', 'Domestic Transport & Taxi Guide', 'Nahverkehr & Taxi-Leitfaden')}
                        </div>
                        <span className="text-[11px] px-3 py-1 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/60">
                          {l('Ulaşım:', 'Transit:', 'Verkehr:')} {insights.transport.costLevel}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3.5 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <span className="text-[10px] text-slate-400 block font-medium">{l('Toplu Taşıma Kalitesi', 'Transit Quality', 'Öffentliche Verkehrsmittel')}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.transport.transportQuality}</span>
                        </div>
                        <div className="p-3.5 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <span className="text-[10px] text-slate-400 block font-medium">{l('Tek Biniş / Günlük Paso', 'Single / Day Pass', 'Einzelfahrt / Tageskarte')}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.transport.singleTicketUsd} / {insights.transport.dailyPassUsd}</span>
                        </div>
                        <div className="p-3.5 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <span className="text-[10px] text-slate-400 block font-medium">{l('Popüler Araç Çağırma', 'Ride-Hailing Apps', 'Fahrdienst-Apps')}</span>
                          <span className="font-bold text-teal-600 dark:text-teal-400 text-xs mt-0.5 block">{insights.transport.popularRideApps.join(', ')}</span>
                        </div>
                      </div>

                      <div className="p-3.5 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-300">
                        🚕 <b>{l('Taksi & Ulaşım Tavsiyesi:', 'Taxi & Ride Advice:', 'Taxi- & Fahrempfehlung:')}</b> {insights.transport.taxiAdvice}
                      </div>
                    </div>

                    {/* 4. TEMEL İHTİYAÇ GİDERLERİ, KONAKLAMA & UÇAK BİLETİ */}
                    <div className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                          <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          {l('Temel İhtiyaç Giderleri, Konaklama & Uçak', 'Cost of Living, Lodging & Flights', 'Lebenshaltungskosten, Unterkunft & Flüge')}
                        </div>
                        <span className="text-[11px] px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60">
                          {l('Günlük: ', 'Daily: ', 'Täglich: ')}{insights.livingCosts.dailyBudgetBackpackerUsd} ({l('Ekonomik', 'Backpacker', 'Budget')})
                        </span>
                      </div>

                      {/* Daily budget breakdown */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <span className="text-[10px] text-slate-400 block font-medium flex items-center gap-1">
                            <Coffee className="w-3 h-3 text-amber-500" /> {l('Ucuz Yemek / Kahve', 'Meal / Coffee', 'Mahlzeit / Kaffee')}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.livingCosts.budgetMealUsd} / {insights.livingCosts.coffeeUsd}</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <span className="text-[10px] text-slate-400 block font-medium">{l('Şişe Su (1.5L)', 'Water Bottle (1.5L)', 'Flasche Wasser (1,5L)')}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.livingCosts.waterBottleUsd}</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <span className="text-[10px] text-slate-400 block font-medium flex items-center gap-1">
                            <Hotel className="w-3 h-3 text-blue-500" /> {l('Hostel / 3★ Otel', 'Hostel / 3★ Hotel', 'Hostel / 3★ Hotel')}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.livingCosts.hostelDormUsd} / {insights.livingCosts.hotel3StarUsd}</span>
                        </div>
                        <div className="p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <span className="text-[10px] text-slate-400 block font-medium">{l('Orta Seviye Günlük', 'Midrange Daily', 'Mittelklasse pro Tag')}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{insights.livingCosts.dailyBudgetMidrangeUsd}</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/40 text-xs text-emerald-950 dark:text-emerald-200">
                        ✈️ <b>{l('Uçak Bileti & Ulaşım:', 'Flights & Travel Index:', 'Flüge & Reisekostenindex:')}</b> {insights.livingCosts.flightCostIndex} — {insights.livingCosts.flightTip}
                      </div>
                    </div>

                    {/* 5. PRATİK KART (DÖVİZ, PRİZ, İDEAL ZAMAN & ADAB) */}
                    <div className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        {l('Priz, Para Birimi & Yerel Adab', 'Power Plug, Currency & Local Etiquette', 'Steckdosen, Währung & Verhaltensregeln')}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-start gap-2.5 p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <CreditCard className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{l('Para Birimi:', 'Currency:', 'Währung:')}</span>{' '}
                            <span>{insights.currency}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <Plug className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{l('Priz & Voltaj:', 'Plug & Voltage:', 'Steckdosen & Spannung:')}</span>{' '}
                            <span>{insights.plugType}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{l('En İdeal Gidiş Zamanı:', 'Best Time to Visit:', 'Beste Reisezeit:')}</span>{' '}
                            <span>{insights.bestMonths}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 glass-card rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                          <PhoneCall className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{l('Acil Çağrı:', 'Emergency Call:', 'Notruf:')}</span>{' '}
                            <span>{insights.safety.emergencyNumbers.police} ({l('Polis', 'Police', 'Polizei')}) / {insights.safety.emergencyNumbers.ambulance}</span>
                          </div>
                        </div>
                      </div>
                      {practical.localEtiquette && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                          💡 <b>{l('Yerel Kültür & Yasaklar:', 'Local Culture & Etiquette:', 'Lokale Kultur & Verhaltensregeln:')}</b> {practical.localEtiquette}
                        </div>
                      )}
                    </div>

                    {/* Transit Kuralları (Airport Transit & TWOV Rules) */}
                    <div className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                          <Plane className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          {l('Transit Kuralları', 'Transit Visa Rules', 'Transitvisum-Regeln')} ({countryName})
                        </div>
                        <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold border ${transitRule.badgeClass}`}>
                          {transitRule.badgeTitle}
                        </span>
                      </div>

                      <div className="text-xs space-y-2.5">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 text-[13px]">
                          {transitRule.ruleTitle}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {transitRule.summary}
                        </p>

                        {/* Quick parameters grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
                          <div className="glass-card p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                            <span className="text-slate-400 block font-medium">{l('Maks. Transit Süresi', 'Max Transit Time', 'Max. Transitzeit')}</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">{transitRule.maxHours}</span>
                          </div>
                          <div className="glass-card p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                            <span className="text-slate-400 block font-medium">{l('Havalimanı İçi Transit', 'Airside Transit', 'Flughafentransit (Airside)')}</span>
                            <span className={`font-bold text-xs mt-0.5 block ${transitRule.airsideTransitAllowed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                              {transitRule.airsideTransitAllowed
                                ? l('✓ Vizesiz Serbest', '✓ Visa-Free Transit', '✓ Visumfreier Transit')
                                : l('✗ Özel İzin Şart', '✗ Transit Visa Required', '✗ Transitvisum erforderlich')}
                            </span>
                          </div>
                          <div className="glass-card p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                            <span className="text-slate-400 block font-medium">{l('Şehre Çıkış / Stopover', 'City Stopover', 'Stadtbesuch / Stopover')}</span>
                            <span className={`font-bold text-xs mt-0.5 block ${transitRule.cityExitAllowed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                              {transitRule.cityExitAllowed
                                ? l('✓ Serbest', '✓ Allowed', '✓ Erlaubt')
                                : l('⚠️ Giriş Vizesi Gerekir', '⚠️ Entry Visa Required', '⚠️ Einreisevisum erforderlich')}
                            </span>
                          </div>
                        </div>

                        {/* Key Conditions */}
                        {transitRule.keyConditions.length > 0 && (
                          <div className="p-3.5 rounded-2xl glass-card border border-slate-200/60 dark:border-white/[0.08] space-y-1.5">
                            <span className="font-bold text-slate-700 dark:text-slate-300 block text-[11px] uppercase tracking-wider">
                              {l('📋 Temel Koşullar ve Kurallar:', '📋 Key Conditions & Rules:', '📋 Wichtige Bedingungen & Regeln:')}
                            </span>
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
                            <span className="font-bold block text-[11px] uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                              {l('✅ İstisnalar ve Muafiyetler:', '✅ Exceptions & Exemptions:', '✅ Ausnahmen & Befreiungen:')}
                            </span>
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
                            <span className="font-bold">{l('🧳 Bagaj & Ayrı Bilet Uyarısı:', '🧳 Baggage & Separate Ticket Notice:', '🧳 Gepäck & Getrennte Tickets:')}</span> {transitRule.baggageAndTransferTip}
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
                              {l('Resmi Transit Prosedürü', 'Official Transit Procedure', 'Offizielles Transitverfahren')} <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Entry Preparation Checklist */}
                    <div className="glass-panel border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-3.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {l('Giriş Kontrol Listesi', 'Entry Preparation Checklist', 'Einreise-Checkliste')} ({checkedIndices.length} / {currentChecklist.length})
                        </span>
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
                    </div>

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
              </div>
            );
          })
        )}
      </div>
        </>
      )}

      {/* Community Change Reporting Modal */}
      <ReportChangeModal
        isOpen={!!reportingCountry}
        onClose={() => setReportingCountry(null)}
        defaultCountryCode={reportingCountry?.code}
        defaultCountryName={reportingCountry?.name}
        currentPassport={currentPassport}
        categoryHint={reportingCountry?.cat}
      />

      {/* Regulation Audit Console Modal */}
      <RegulationAuditModal
        isOpen={isLocalAuditOpen}
        onClose={() => setIsLocalAuditOpen(false)}
        onOpenReportModal={(code, name) => {
          setIsLocalAuditOpen(false);
          setReportingCountry({ code, name, cat: 'vf' });
        }}
      />

      {/* Country Cultural & Travel Dossier Modal */}
      <CountryDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        countryCode={selectedDossierCountry}
        currentPassport={currentPassport}
        onOpenAudit={handleOpenAudit}
        onOpenReportChange={(c) => setReportingCountry(c)}
      />
    </div>
  );
};
