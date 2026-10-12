import React, { useState } from 'react';
import { Search, X, CloudSun, Wind, Droplets, Globe } from 'lucide-react';
import { ALL_WORLD_HUBS } from '../../data/worldHubs';
import { getHubWeather, HubWeather } from '../../data/weatherData';
import { useI18n } from '../../data/i18n';

interface Props {
  className?: string;
  onOpenRadar?: (city?: string) => void;
}

export const WeatherWidget: React.FC<Props> = ({ className = '', onOpenRadar }) => {
  const { language, l } = useI18n();
  const [search, setSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  // Featured cities default list
  const featuredCities = ['Istanbul', 'London', 'Tokyo', 'New York', 'Paris'];

  // Search matches across ALL_WORLD_HUBS with fallback weather resolver
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

  const displayWeatherList: { weather: HubWeather; cityTr?: string }[] = isSearching || search.trim()
    ? filteredHubs.slice(0, 30).map((hub) => ({
        weather: getHubWeather(hub.city, hub),
        cityTr: hub.cityTr
      }))
    : featuredCities.map((city) => {
        const hub = ALL_WORLD_HUBS.find((h) => h.city === city);
        return {
          weather: getHubWeather(city, hub),
          cityTr: hub?.cityTr
        };
      });

  const formatTemp = (celsius: number) => {
    if (unit === 'F') {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${celsius}°C`;
  };

  return (
    <div className={`p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 shadow-sm ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <CloudSun className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
              {l('Canlı Dünya Hava Durumu', 'Live World Weather', 'Weltweites Wetter', 'Clima Mundial', 'Погода в мире')}
            </h4>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {l('Küresel başkentler & seyahat hava şartları', 'Global capitals & travel conditions', 'Globale Hauptstädte & Wetter', 'Capitales y condiciones climáticas', 'Столицы и погодные условия')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenRadar && (
            <button
              type="button"
              onClick={() => onOpenRadar()}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 transition-all cursor-pointer"
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

          {/* Search Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsSearching(!isSearching);
              if (isSearching) setSearch('');
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors cursor-pointer"
            title={l('Başkent veya şehir ara', 'Search capital or city', 'Stadt suchen', 'Buscar capital o ciudad', 'Поиск')}
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Optional Search Bar */}
      {isSearching && (
        <div className="relative mb-2.5">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={l('Başkent, şehir veya ülke ara... (örn: Viyana, Tokyo, Roma)', 'Search capital, city or country... (e.g. Vienna, Tokyo)', 'Stadt oder Land suchen...', 'Buscar ciudad o país...', 'Поиск города или страны...')}
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
          <span>{l('Sıcaklık & Durum', 'Temp & Condition', 'Temperatur & Wetter', 'Temperatura', 'Температура')}</span>
        </div>
      )}

      {/* Weather List */}
      <div className={`space-y-1.5 ${isSearching || search.trim() ? 'max-h-64 overflow-y-auto pr-1' : ''}`}>
        {displayWeatherList.length === 0 ? (
          <p className="text-[11px] text-center text-slate-400 py-3">
            {l('Eşleşen başkent veya şehir bulunamadı', 'No matching capitals or cities found', 'Keine Treffer gefunden', 'Sin resultados', 'Совпадений не найдено')}
          </p>
        ) : (
          displayWeatherList.map(({ weather: item, cityTr }) => {
            const countryName = item.country[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || item.city;
            const conditionText = item.condition[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || item.condition.en;
            const displayName = language === 'tr' && cityTr ? cityTr : item.city;

            return (
              <div
                key={item.city}
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
