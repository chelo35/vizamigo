import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Clock, Globe } from 'lucide-react';
import { ALL_WORLD_HUBS, WorldHub } from '../../data/worldHubs';
import { useI18n } from '../../data/i18n';

interface Props {
  className?: string;
  onOpenRadar?: (city?: string) => void;
}

type QuickFilter = 'popular' | 'TR' | 'TH' | 'Europe' | 'Asia' | 'Americas' | 'all';

export const WorldClockWidget: React.FC<Props> = ({ className = '', onOpenRadar }) => {
  const { language, l } = useI18n();
  const [now, setNow] = useState<Date>(() => new Date());
  const [search, setSearch] = useState<string>('');
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('popular');

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredCities = ['Istanbul', 'Antalya', 'London', 'Bangkok', 'Phuket', 'Tokyo', 'New York', 'Dubai'];

  const displayHubs: WorldHub[] = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (q) {
      return ALL_WORLD_HUBS.filter(
        (hub) =>
          hub.city.toLowerCase().includes(q) ||
          (hub.cityTr && hub.cityTr.toLowerCase().includes(q)) ||
          hub.country.tr.toLowerCase().includes(q) ||
          hub.country.en.toLowerCase().includes(q) ||
          hub.country.es.toLowerCase().includes(q) ||
          hub.country.ru.toLowerCase().includes(q) ||
          hub.country.de.toLowerCase().includes(q)
      ).slice(0, 60);
    }

    if (quickFilter === 'TR') {
      return ALL_WORLD_HUBS.filter((h) => h.iso === 'TR' || h.flag === '🇹🇷');
    }
    if (quickFilter === 'TH') {
      return ALL_WORLD_HUBS.filter((h) => h.iso === 'TH' || h.flag === '🇹🇭');
    }
    if (quickFilter === 'Europe' || quickFilter === 'Asia' || quickFilter === 'Americas') {
      return ALL_WORLD_HUBS.filter((h) => h.region === quickFilter).slice(0, 50);
    }
    if (quickFilter === 'all') {
      return ALL_WORLD_HUBS.slice(0, 80);
    }
    return featuredCities
      .map((c) => ALL_WORLD_HUBS.find((h) => h.city === c))
      .filter((h): h is WorldHub => Boolean(h));
  }, [search, quickFilter]);

  const filterChips: { id: QuickFilter; label: string }[] = [
    { id: 'popular', label: l('⭐ Popüler', '⭐ Popular', '⭐ Beliebt', '⭐ Populares', '⭐ Популярные') },
    { id: 'TR', label: '🇹🇷 Türkiye' },
    { id: 'TH', label: '🇹🇭 Tayland' },
    { id: 'Europe', label: l('Avrupa', 'Europe', 'Europa', 'Europa', 'Европа') },
    { id: 'Asia', label: l('Asya', 'Asia', 'Asien', 'Asia', 'Азия') },
    { id: 'Americas', label: l('Amerika', 'Americas', 'Amerika', 'América', 'Америка') },
    { id: 'all', label: `${l('Tümü', 'All', 'Alle', 'Todos', 'Все')} (${ALL_WORLD_HUBS.length})` }
  ];

  return (
    <div className={`p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 shadow-sm ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
              {l('Canlı Dünya Saatleri', 'Live World Clock', 'Weltzeituhr', 'Reloj Mundial', 'Мировое время')}
            </h4>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {ALL_WORLD_HUBS.length}+ {l('turistik şehir, tatil bölgesi & başkent', 'tourist cities, resorts & capitals', 'Städte & Urlaubsorte', 'ciudades turísticas y capitales', 'городов и курортов')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onOpenRadar && (
            <button
              type="button"
              onClick={() => onOpenRadar()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/20 transition-all cursor-pointer"
              title={l('Dünya Haritasında Aç', 'Open in World Map', 'In Weltkarte öffnen')}
            >
              <Globe className="w-3 h-3 animate-pulse" />
              <span>{l('Haritada Aç', 'Radar Map', 'Radar')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Always-visible Search Input */}
      <div className="relative mb-2">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={l('Şehir/ülke ara: Antalya, Muğla, Pattaya, Phuket, Bali...', 'Search city or country (e.g. Phuket, Pattaya, Bodrum)...', 'Stadt oder Land suchen...')}
          className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Quick Country / Region Filter Chips */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-2 mb-1.5">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => {
              setQuickFilter(chip.id);
              setSearch('');
            }}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
              !search && quickFilter === chip.id
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Clock List */}
      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {displayHubs.length === 0 ? (
          <p className="text-[11px] text-center text-slate-400 py-3">
            {l('Eşleşen başkent veya şehir bulunamadı', 'No matching capitals or hubs found', 'Keine Treffer gefunden', 'No se encontraron resultados', 'Совпадений не найдено')}
          </p>
        ) : (
          displayHubs.map((hub) => {
            let hubTime = '--:--:--';
            let isDay = true;
            try {
              const timeFormatter = new Intl.DateTimeFormat('en-GB', {
                timeZone: hub.tz,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
              });
              const hourOnly = parseInt(
                new Intl.DateTimeFormat('en-GB', { timeZone: hub.tz, hour: '2-digit', hour12: false }).format(now),
                10
              );
              isDay = hourOnly >= 6 && hourOnly < 20;
              hubTime = timeFormatter.format(now);
            } catch {}
            const countryName = hub.country[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || hub.city;
            const displayName = language === 'tr' && hub.cityTr ? hub.cityTr : hub.city;

            return (
              <div
                key={`${hub.city}_${hub.iso || ''}`}
                onClick={() => onOpenRadar?.(hub.city)}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] hover:bg-teal-50/50 dark:hover:bg-teal-950/20 hover:border-teal-500/30 transition-all border border-slate-100/80 dark:border-white/[0.04] cursor-pointer group"
                title={l(`${displayName} için Dünya Haritasında Saat/Hava/Döviz Aç`, `Open World Map telemetry for ${displayName}`, `Öffne Telemetrie für ${displayName}`)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base leading-none group-hover:scale-110 transition-transform">{hub.flag}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {displayName}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {countryName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-xs" title={isDay ? 'Gündüz' : 'Gece'}>
                    {isDay ? '☀️' : '🌙'}
                  </span>
                  <span className="font-mono text-xs font-black text-slate-900 dark:text-white bg-white dark:bg-black/40 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-white/10 shadow-2xs group-hover:border-teal-500/40">
                    {hubTime}
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
