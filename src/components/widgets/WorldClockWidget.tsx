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
    <div className={`p-6 rounded-[24px] glass-card leading-[1.6] ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100 dark:border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[14px] bg-[#2A8C82]/10 text-[#2A8C82] dark:text-[#52B2A7] flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-[-0.02em] text-slate-900 dark:text-white leading-tight">
              {l('Canlı Dünya Saatleri', 'Live World Clock', 'Weltzeituhr', 'Reloj Mundial', 'Мировое время')}
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-[1.6]">
              {ALL_WORLD_HUBS.length}+ {l('turistik şehir, tatil bölgesi & başkent', 'tourist cities, resorts & capitals', 'Städte & Urlaubsorte', 'ciudades turísticas y capitales', 'городов и курортов')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenRadar && (
            <button
              type="button"
              onClick={() => onOpenRadar()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#2A8C82]/10 hover:bg-[#2A8C82]/20 text-[#2A8C82] dark:text-[#52B2A7] border border-[#2A8C82]/20 transition-all cursor-pointer"
              title={l('Dünya Haritasında Aç', 'Open in World Map', 'In Weltkarte öffnen')}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{l('Haritada Aç', 'Radar Map', 'Radar')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Always-visible Search Input */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={l('Şehir/ülke ara: Antalya, Muğla, Pattaya, Phuket, Bali...', 'Search city or country (e.g. Phuket, Pattaya, Bodrum)...', 'Stadt oder Land suchen...')}
          className="w-full pl-9 pr-8 py-2 text-xs rounded-[20px] bg-slate-50/90 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200/70 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2A8C82]/30"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Quick Country / Region Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2.5 mb-2">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => {
              setQuickFilter(chip.id);
              setSearch('');
            }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
              !search && quickFilter === chip.id
                ? 'tab-chip-active'
                : 'bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border border-transparent dark:border-white/[0.08] hover:bg-slate-200/70 dark:hover:bg-white/[0.08]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Clock List */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {displayHubs.length === 0 ? (
          <p className="text-xs text-center text-slate-400 py-4 leading-[1.6]">
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
                className="clock-row flex items-center justify-between px-3.5 py-2.5 rounded-[20px] bg-slate-50/70 dark:bg-white/[0.03] hover:bg-[#2A8C82]/[0.06] dark:hover:bg-white/[0.06] transition-all border border-slate-100/80 dark:border-white/[0.06] cursor-pointer group"
                title={l(`${displayName} için Dünya Haritasında Saat/Hava/Döviz Aç`, `Open World Map telemetry for ${displayName}`, `Öffne Telemetrie für ${displayName}`)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base leading-none group-hover:scale-110 transition-transform">{hub.flag}</span>
                  <div className="min-w-0 leading-[1.6]">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-[#2A8C82] dark:group-hover:text-[#52B2A7] transition-colors">
                      {displayName}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate leading-[1.6]">
                      {countryName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs" title={isDay ? 'Gündüz' : 'Gece'}>
                    {isDay ? '☀️' : '🌙'}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white glass-pill-control px-3 py-1 rounded-full">
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
