import React, { useState, useMemo } from 'react';
import { Search, X, CloudSun, Wind, Droplets, Globe } from 'lucide-react';
import { ALL_WORLD_HUBS, WorldHub } from '../../data/worldHubs';
import { getHubWeather, HubWeather, useLiveWeather } from '../../data/weatherData';
import { useI18n } from '../../data/i18n';

interface Props {
  className?: string;
  onOpenRadar?: (city?: string) => void;
}

type QuickFilter = 'popular' | 'TR' | 'TH' | 'Europe' | 'Asia' | 'Americas' | 'all';

export const WeatherWidget: React.FC<Props> = ({ className = '', onOpenRadar }) => {
  const { language, l } = useI18n();
  const [search, setSearch] = useState<string>('');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('popular');

  const featuredCities = ['Istanbul', 'Antalya', 'Bangkok', 'Phuket', 'London', 'Tokyo', 'New York', 'Dubai'];

  const activeHubs: WorldHub[] = useMemo(() => {
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
      ).slice(0, 50);
    }

    if (quickFilter === 'TR') {
      return ALL_WORLD_HUBS.filter((h) => h.iso === 'TR' || h.flag === '🇹🇷');
    }
    if (quickFilter === 'TH') {
      return ALL_WORLD_HUBS.filter((h) => h.iso === 'TH' || h.flag === '🇹🇭');
    }
    if (quickFilter === 'Europe' || quickFilter === 'Asia' || quickFilter === 'Americas') {
      return ALL_WORLD_HUBS.filter((h) => h.region === quickFilter).slice(0, 40);
    }
    if (quickFilter === 'all') {
      return ALL_WORLD_HUBS.slice(0, 60);
    }
    return featuredCities
      .map((c) => ALL_WORLD_HUBS.find((h) => h.city === c))
      .filter((h): h is WorldHub => Boolean(h));
  }, [search, quickFilter]);

  // Subscribe to real-time Open-Meteo weather for the currently visible hubs
  useLiveWeather(activeHubs);

  const displayWeatherList: { weather: HubWeather; cityTr?: string; iso?: string }[] = activeHubs.map((hub) => ({
    weather: getHubWeather(hub.city, hub),
    cityTr: hub.cityTr,
    iso: hub.iso
  }));

  const formatTemp = (celsius: number) => {
    if (unit === 'F') {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${celsius}°C`;
  };

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
            <CloudSun className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
              <span>{l('Canlı Dünya Hava Durumu', 'Live World Weather', 'Weltweites Wetter', 'Clima Mundial', 'Погода в мире')}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Open-Meteo Canlı Meteoroloji" />
            </h4>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {ALL_WORLD_HUBS.length}+ {l('turistik şehir & tatil bölgesi canlı hava', 'cities & resorts live weather', 'Städte & Urlaubsorte Live-Wetter', 'clima en vivo', 'погода в реальном времени')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenRadar && (
            <button
              type="button"
              onClick={() => onOpenRadar()}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 transition-all cursor-pointer"
              title={l('Hava Durumu Radar Haritasını Aç', 'Open Weather Radar Map', 'Wetter-Radar öffnen')}
            >
              <Globe className="w-3 h-3 animate-pulse" />
              <span>{l('Haritada Aç', 'Radar Map', 'Radar')}</span>
            </button>
          )}

          {/* Unit Toggle (°C / °F) */}
          <button
            type="button"
            onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
            className="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
            title={l('Birim değiştir', 'Toggle unit', 'Einheit wechseln', 'Cambiar unidad', 'Сменить единицу')}
          >
            °{unit}
          </button>
        </div>
      </div>

      {/* Always-visible Search Input */}
      <div className="relative mb-2">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={l('Şehir/bölge ara: Antalya, Muğla, Bodrum, Pattaya, Phuket...', 'Search city or resort (e.g. Phuket, Pattaya, Bodrum)...', 'Stadt oder Urlaubsort suchen...')}
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
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Weather List */}
      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {displayWeatherList.length === 0 ? (
          <p className="text-[11px] text-center text-slate-400 py-3">
            {l('Eşleşen başkent veya şehir bulunamadı', 'No matching capitals or cities found', 'Keine Treffer gefunden', 'Sin resultados', 'Совпадений не найдено')}
          </p>
        ) : (
          displayWeatherList.map(({ weather: item, cityTr, iso }) => {
            const countryName = item.country[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || item.city;
            const conditionText = item.condition[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || item.condition.en;
            const displayName = language === 'tr' && cityTr ? cityTr : item.city;

            return (
              <div
                key={`${item.city}_${iso || ''}`}
                onClick={() => onOpenRadar?.(item.city)}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] hover:bg-amber-50/50 dark:hover:bg-amber-950/20 hover:border-amber-500/30 transition-all border border-slate-100/80 dark:border-white/[0.04] cursor-pointer group"
                title={l(`${displayName} için Dünya Haritası ve Hava Telemetrisini Aç`, `Open World Map weather for ${displayName}`, `Öffne Wetter-Telemetrie für ${displayName}`)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base leading-none group-hover:scale-110 transition-transform">{item.flag}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {displayName}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate flex items-center gap-1.5">
                      <span>{countryName}</span>
                      <span>·</span>
                      <span className="text-teal-600 dark:text-teal-400 font-medium">{conditionText}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-0.5" title="Nem">
                      <Droplets className="w-2.5 h-2.5" />
                      {item.humidity}%
                    </span>
                    <span className="flex items-center gap-0.5" title="Rüzgar">
                      <Wind className="w-2.5 h-2.5" />
                      {item.windKmh}km/s
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-sm leading-none">{item.icon}</span>
                    <span className="font-mono text-xs font-black text-slate-900 dark:text-white bg-white dark:bg-black/40 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-white/10 shadow-2xs">
                      {formatTemp(item.tempC)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
