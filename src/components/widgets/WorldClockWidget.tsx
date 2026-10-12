import React, { useState, useEffect } from 'react';
import { Search, X, Clock } from 'lucide-react';
import { ALL_WORLD_HUBS } from '../../data/worldHubs';
import { useI18n } from '../../data/i18n';

interface Props {
  className?: string;
}

export const WorldClockWidget: React.FC<Props> = ({ className = '' }) => {
  const { language, l } = useI18n();
  const [now, setNow] = useState<Date>(() => new Date());
  const [search, setSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Live ticking clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Top default featured cities
  const featuredCities = ['London', 'Istanbul', 'Tokyo', 'New York', 'Paris'];

  const filteredHubs = ALL_WORLD_HUBS.filter((hub) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      hub.city.toLowerCase().includes(q) ||
      (hub.cityTr && hub.cityTr.toLowerCase().includes(q)) ||
      hub.country.tr.toLowerCase().includes(q) ||
      hub.country.en.toLowerCase().includes(q) ||
      hub.country.es.toLowerCase().includes(q) ||
      hub.country.ru.toLowerCase().includes(q) ||
      hub.country.de.toLowerCase().includes(q)
    );
  });

  const displayHubs = isSearching || search.trim()
    ? filteredHubs.slice(0, 30)
    : ALL_WORLD_HUBS.filter((h) => featuredCities.includes(h.city));

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
              {l('Küresel başkentler & seyahat zaman dilimleri', 'Global capitals & travel timezones', 'Globale Hauptstädte & Zeitzonen', 'Capitales y zonas horarias', 'Столицы и часовые пояса')}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsSearching(!isSearching);
            if (isSearching) setSearch('');
          }}
          className="p-1.5 rounded-lg text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors cursor-pointer"
          title={l('Şehir veya başkent ara', 'Search city or capital', 'Stadt oder Hauptstadt suchen', 'Buscar ciudad o capital', 'Поиск города или столицы')}
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Optional Search Bar */}
      {isSearching && (
        <div className="relative mb-2.5">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={l('Başkent, şehir veya ülke ara... (örn: Viyana, Tokyo, Roma)', 'Search capital, city or country... (e.g. Vienna, Tokyo)', 'Hauptstadt, Stadt oder Land suchen...', 'Buscar capital, ciudad o país...', 'Поиск столицы, города или страны...')}
            className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            autoFocus
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
      )}

      {/* Result Counter if searching */}
      {search.trim() && (
        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 mb-1 font-semibold">
          <span>{filteredHubs.length} {l('merkez bulundu', 'hubs found', 'Treffer gefunden', 'resultados encontrados', 'найдено')}</span>
          <span>{l('Canlı Saat', 'Live Time', 'Echtzeit', 'Hora local', 'Текущее время')}</span>
        </div>
      )}

      {/* Clock List */}
      <div className={`space-y-1.5 ${isSearching || search.trim() ? 'max-h-64 overflow-y-auto pr-1' : ''}`}>
        {displayHubs.length === 0 ? (
          <p className="text-[11px] text-center text-slate-400 py-3">
            {l('Eşleşen başkent veya şehir bulunamadı', 'No matching capitals or hubs found', 'Keine Treffer gefunden', 'No se encontraron resultados', 'Совпадений не найдено')}
          </p>
        ) : (
          displayHubs.map((hub) => {
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
            const isDay = hourOnly >= 6 && hourOnly < 20;
            const hubTime = timeFormatter.format(now);
            const countryName = hub.country[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || hub.city;
            const displayName = language === 'tr' && hub.cityTr ? hub.cityTr : hub.city;

            return (
              <div
                key={hub.city}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors border border-slate-100/80 dark:border-white/[0.04]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base leading-none">{hub.flag}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
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
                  <span className="font-mono text-xs font-black text-slate-900 dark:text-white bg-white dark:bg-black/40 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-white/10 shadow-2xs">
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
