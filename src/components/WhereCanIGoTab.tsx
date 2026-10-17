import React, { useState, useMemo } from 'react';
import { Search, Compass } from 'lucide-react';
import {
  CountryItem,
  CAT_INFO,
  VisaCategory,
  getCountryName,
  getFlag,
  REGIONS,
  countryToRegion,
  getCategoryBadgeLabel,
  getRegionName
} from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { useI18n } from '../data/i18n';
import { getCountryVisual, getOptimizedSrcSet } from '../data/countryVisuals';
import { SafeImage } from './common/SafeImage';

interface WhereCanIGoTabProps {
  currentPassport: string;
  externalSearch?: string;
  embedded?: boolean;
}

export const WhereCanIGoTab: React.FC<WhereCanIGoTabProps> = ({
  currentPassport,
  externalSearch,
  embedded = false
}) => {
  const { language, t, l } = useI18n();
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(['free', 'id']));
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [minDays, setMinDays] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const items = useMemo(() => {
    return getPassportItems(currentPassport);
  }, [currentPassport]);

  const toggleType = (typeId: string) => {
    const next = new Set(selectedTypes);
    if (next.has(typeId)) {
      next.delete(typeId);
    } else {
      next.add(typeId);
    }
    setSelectedTypes(next);
  };

  const results = useMemo(() => {
    const locale = language === 'de' ? 'de' : language === 'en' ? 'en' : 'tr';
    const activeQuery = externalSearch !== undefined ? externalSearch : search;
    const q = activeQuery.trim().toLocaleLowerCase(locale);

    return items.filter(item => {
      // Region filter
      if (selectedRegion !== 'all') {
        const itemRegion = countryToRegion[item.c];
        if (itemRegion !== selectedRegion) return false;
      }

      // Entry type filter
      const matchesType =
        (selectedTypes.has('id') && item.id) ||
        (selectedTypes.has(item.cat) && (!item.id || selectedTypes.has('id')));

      if (!matchesType) return false;

      // Minimum days (only for numeric duration visa-free)
      if (minDays > 0) {
        if (!/^\d+$/.test(item.v)) return false;
        const days = parseInt(item.v, 10);
        if (days < minDays) return false;
      }

      // Search query
      if (q) {
        const name = getCountryName(item.c, language).toLocaleLowerCase(locale);
        return name.includes(q) || item.c.toLowerCase().includes(q);
      }

      return true;
    }).sort((a, b) => {
      const daysA = parseInt(a.v, 10) || 0;
      const daysB = parseInt(b.v, 10) || 0;
      if (daysB !== daysA) return daysB - daysA;
      return getCountryName(a.c, language).localeCompare(getCountryName(b.c, language), locale);
    });
  }, [items, selectedTypes, selectedRegion, minDays, search, language]);

  const passportName = getCountryName(currentPassport, language);

  const entryTypeOptions = [
    { id: 'free', label: t.visaFree },
    { id: 'id', label: t.idEntry },
    { id: 'evisa', label: t.eVisa },
    { id: 'eta', label: t.eta },
    { id: 'voa', label: t.voa }
  ];

  return (
    <div className="space-y-6">
      {/* Filter Box Card */}
      <div className="glass-panel border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-lg space-y-6 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 dark:bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="flex items-center gap-3 pb-3 border-b border-slate-200/70 dark:border-white/10">
          <div className="w-9 h-9 rounded-2xl bg-[#0F172A] text-white dark:bg-[#1E2B58] dark:border dark:border-white/20 flex items-center justify-center shadow-xs flex-shrink-0">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            {l('Nereye Gidebilirim? (Akıllı Keşif Filtresi)', 'Where Can I Go? (Smart Discovery Filter)', 'Wohin kann ich reisen? (Smarter Entdecker-Filter)')}
          </h2>
        </div>

        {/* 1. Entry Types multi-select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#8E9DBE] mb-2.5">
            {l('Giriş Türü (Birden fazla seçebilirsiniz)', 'Entry Type (Select one or more)', 'Einreiseart (Mehrfachauswahl möglich)')}
          </label>
          <div className="flex flex-wrap gap-2">
            {entryTypeOptions.map(type => {
              const isSelected = selectedTypes.has(type.id);
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => toggleType(type.id)}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'tab-chip-active'
                      : 'tab-chip-inactive'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-400 dark:bg-[#7A89A6]'}`} />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Region & Min Days in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {l('Kıta / Bölge', 'Continent / Region', 'Kontinent / Region')}
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-medium shadow-xs"
            >
              <option value="all">
                {l('🌍 Tüm Bölgeler (Dünya geneli)', '🌍 All Regions (Worldwide)', '🌍 Alle Regionen (Weltweit)')}
              </option>
              {Object.keys(REGIONS).map(r => (
                <option key={r} value={r}>
                  {getRegionName(r, language)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {l('En Az Kalış Süresi', 'Minimum Stay Duration', 'Mindestaufenthaltsdauer')}
            </label>
            <select
              value={minDays}
              onChange={(e) => setMinDays(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-medium shadow-xs"
            >
              <option value={0}>{l('Fark etmez (Tüm süreler)', 'Any duration (All stays)', 'Beliebig (Alle Zeiträume)')}</option>
              <option value={30}>{l('En az 30 gün ve üzeri', 'At least 30+ days', 'Mindestens 30+ Tage')}</option>
              <option value={60}>{l('En az 60 gün ve üzeri', 'At least 60+ days', 'Mindestens 60+ Tage')}</option>
              <option value={90}>{l('En az 90 gün ve üzeri', 'At least 90+ days', 'Mindestens 90+ Tage')}</option>
              <option value={180}>{l('En az 180 gün ve üzeri', 'At least 180+ days', 'Mindestens 180+ Tage')}</option>
            </select>
          </div>
        </div>

        {/* Search within filtered results (hidden when embedded in Bento widget) */}
        {!embedded && externalSearch === undefined && (
          <div className="relative pt-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 mt-0.5 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="search"
              placeholder={l('Filtrelenen sonuçlar içinde ara...', 'Search within filtered results...', 'In gefilterten Ergebnissen suchen...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 shadow-2xs"
            />
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono bg-gradient-to-r from-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
            {results.length}
          </span>
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300 ml-2">
            {l('uygun destinasyon bulundu', 'destinations found matching criteria', 'passende Reiseziele gefunden')}
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-slate-200/70 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>{l('Pasaport:', 'Passport:', 'Pass:')}</span>
          <b className="text-slate-900 dark:text-white font-bold">{passportName}</b>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {results.length === 0 ? (
          <div className="col-span-full py-16 text-center glass-panel border border-slate-200/80 dark:border-white/10 rounded-3xl p-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {l(
                'Seçilen filtrelere uyan destinasyon bulunamadı. Lütfen giriş türü veya gün sınırını esnetin.',
                'No destinations found matching your filters. Try selecting more entry types or relaxing the stay limit.',
                'Keine Ziele gefunden, die Ihren Filtern entsprechen. Bitte erweitern Sie die Filterkriterien.'
              )}
            </p>
          </div>
        ) : (
          results.map(item => {
            const countryName = getCountryName(item.c, language);
            const badgeClass = item.id ? CAT_INFO.id.badgeBg : CAT_INFO[item.cat]?.badgeBg;
            const badgeLabel = getCategoryBadgeLabel(item, language);
            const rawRegion = countryToRegion[item.c] || 'Diğer';
            const region = getRegionName(rawRegion, language);
            const visual = getCountryVisual(item.c, language);

            return (
              <div
                key={item.c}
                className="glass-card rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-4 hover:border-[#0D9488]/40 dark:hover:border-[#0D9488]/30 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Dedicated Scenic Thumbnail Slot */}
                  <div className="country-thumbnail-slot w-24 h-20 sm:w-28 sm:h-24 aspect-[16/10] shadow-sm flex-shrink-0">
                    <SafeImage
                      src={visual.image}
                      srcSet={getOptimizedSrcSet(visual.image)}
                      sizes="(max-width: 640px) 96px, 112px"
                      alt={`${countryName} - ${visual.landmark}`}
                      className="country-thumbnail-image country-thumbnail-images"
                      loading="lazy"
                      decoding="async"
                      width="112"
                      height="80"
                    />
                    <div className="country-thumbnail-scrim" />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-xs shadow-sm">
                      {getFlag(item.c)}
                    </div>
                    <div className="absolute bottom-1 left-2 right-2 text-xs font-semibold text-white/95 truncate">
                      {visual.landmark}
                    </div>
                  </div>

                  {/* Text Details with generous breathing whitespace */}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-[#0D9488] dark:group-hover:text-[#14B8A6] transition-colors truncate">
                      {countryName}
                    </h4>
                    <span className="text-xs text-slate-600 dark:text-slate-400 block truncate mt-0.5">
                      {region}
                    </span>
                    <div className="mt-2.5">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold shadow-2xs inline-block ${badgeClass}`}>
                        {badgeLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/[0.06] text-xs">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase font-semibold">
                    ISO: {item.c}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {item.v === 'vf' ? l('Süresiz', 'Indefinite', 'Unbegrenzt') : /^\d+$/.test(item.v) ? `${item.v} ${l('gün', 'days', 'Tage')}` : ''}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
