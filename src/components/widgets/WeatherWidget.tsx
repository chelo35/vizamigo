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
    <div className={`p-6 rounded-[24px] glass-card weather-info leading-[1.6] ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100 dark:border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[14px] bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center">
            <CloudSun className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-[-0.02em] text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
              <span>{l('Canlı Dünya Hava Durumu', 'Live World Weather', 'Weltweites Wetter', 'Clima Mundial', 'Погода в мире')}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2A8C82]" title="Open-Meteo Canlı Meteoroloji" />
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-[1.6]">
              {ALL_WORLD_HUBS.length}+ {l('turistik şehir & tatil bölgesi canlı hava', 'cities & resorts live weather', 'Städte & Urlaubsorte Live-Wetter', 'clima en vivo', 'погода в реальном времени')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onOpenRadar && (
            <button
              type="button"
              onClick={() => onOpenRadar()}
              className="min-h-[48px] min-w-[48px] flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/20 transition-all cursor-pointer touch-target-min"
              title={l('Hava Durumu Radar Haritasını Aç', 'Open Weather Radar Map', 'Wetter-Radar öffnen')}
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{l('Haritada Aç', 'Radar Map', 'Radar')}</span>
            </button>
          )}

          {/* Unit Toggle (°C / °F) */}
          <button
            type="button"
            onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
            className="min-h-[48px] min-w-[48px] px-3 py-2 rounded-full text-xs font-bold font-mono glass-pill-control text-slate-600 dark:text-slate-300 hover:text-[#FF6B6B] transition-colors cursor-pointer touch-target-min"
            title={l('Birim değiştir', 'Toggle unit', 'Einheit wechseln', 'Cambiar unidad', 'Сменить единицу')}
          >
            °{unit}
          </button>
        </div>
      </div>

      {/* Always-visible Search Input */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={l('Şehir/bölge ara: Antalya, Muğla, Bodrum, Pattaya, Phuket...', 'Search city or resort (e.g. Phuket, Pattaya, Bodrum)...', 'Stadt oder Urlaubsort suchen...')}
          className="w-full min-h-[48px] pl-10 pr-10 py-2.5 text-xs rounded-[20px] bg-slate-50/90 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200/70 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/30"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Country / Region Filter Chips (Strict 48px Touch Target, Zero Overlap) */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2.5 mb-2 horizontal-badge-slider no-scrollbar-slider touch-pan-x flex-nowrap">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => {
              setQuickFilter(chip.id);
              setSearch('');
            }}
            className={`shrink-0 flex-shrink-0 min-h-[44px] min-w-[48px] px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer inline-flex items-center justify-center touch-target-min ${
              !search && quickFilter === chip.id
                ? 'bg-[#FF6B6B] text-white shadow-xs'
                : 'bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border border-transparent dark:border-white/[0.08] hover:bg-slate-200/70 dark:hover:bg-white/[0.08]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Weather List */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {displayWeatherList.length === 0 ? (
          <p className="text-xs text-center text-slate-400 py-4 leading-[1.6]">
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
                className="weather-info min-h-[48px] flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-[20px] bg-slate-50/70 dark:bg-white/[0.03] hover:bg-[#FF6B6B]/[0.05] dark:hover:bg-white/[0.06] transition-all border border-slate-100/80 dark:border-white/[0.06] cursor-pointer group safe-text-wrap"
                title={l(`${displayName} için Dünya Haritası ve Hava Telemetrisini Aç`, `Open World Map weather for ${displayName}`, `Öffne Wetter-Telemetrie für ${displayName}`)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base leading-none group-hover:scale-110 transition-transform">{item.flag}</span>
                  <div className="min-w-0 leading-[1.6] safe-text-wrap">
                    <div className="text-xs font-bold text-slate-900 dark:text-white break-words group-hover:text-[#FF6B6B] transition-colors">
                      {displayName}
                    </div>
                    <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-1.5 leading-[1.6]">
                      <span>{countryName}</span>
                      <span>·</span>
                      <span className="text-[#2A8C82] dark:text-[#52B2A7] font-medium">{conditionText}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="flex items-center gap-0.5" title="Nem">
                      <Droplets className="w-2.5 h-2.5" />
                      {item.humidity}%
                    </span>
                    <span className="flex items-center gap-0.5" title="Rüzgar">
                      <Wind className="w-2.5 h-2.5" />
                      {item.windKmh}km/s
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-sm leading-none">{item.icon}</span>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white glass-pill-control px-3 py-1 rounded-full">
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
