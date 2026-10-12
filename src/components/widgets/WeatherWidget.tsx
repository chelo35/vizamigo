import React, { useState } from 'react';
import { Search, X, CloudSun } from 'lucide-react';
import { WORLD_WEATHER_DATA } from '../../data/weatherData';
import { useI18n } from '../../data/i18n';

interface Props {
  className?: string;
}

export const WeatherWidget: React.FC<Props> = ({ className = '' }) => {
  const { language, l } = useI18n();
  const [search, setSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  // Featured cities default list
  const featuredCities = ['Istanbul', 'London', 'Tokyo', 'New York'];

  const allWeatherList = Object.values(WORLD_WEATHER_DATA);

  const filteredList = allWeatherList.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      item.city.toLowerCase().includes(q) ||
      item.country.tr.toLowerCase().includes(q) ||
      item.country.en.toLowerCase().includes(q) ||
      item.country.es.toLowerCase().includes(q) ||
      item.country.ru.toLowerCase().includes(q) ||
      item.country.de.toLowerCase().includes(q)
    );
  });

  const displayList = isSearching || search.trim()
    ? filteredList.slice(0, 5)
    : featuredCities.map((city) => WORLD_WEATHER_DATA[city]).filter(Boolean);

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
              {l('Küresel seyahat hava şartları', 'Global travel conditions', 'Globale Reisebedingungen', 'Condiciones de viaje', 'Условия для поездок')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
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
            title={l('Şehir ara', 'Search city', 'Stadt suchen', 'Buscar ciudad', 'Поиск')}
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
            placeholder={l('Şehir veya ülke ara...', 'Search city or country...', 'Stadt oder Land suchen...', 'Buscar ciudad o país...', 'Поиск города или страны...')}
            className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            autoFocus
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Weather List */}
      <div className="space-y-1.5">
        {displayList.length === 0 ? (
          <p className="text-[11px] text-center text-slate-400 py-2">
            {l('Sonuç bulunamadı', 'No weather data found', 'Keine Wetterdaten', 'Sin resultados', 'Не найдено')}
          </p>
        ) : (
          displayList.map((item) => {
            const countryName = item.country[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || item.city;
            const conditionText = item.condition[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || item.condition.en;

            return (
              <div
                key={item.city}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors border border-slate-100/80 dark:border-white/[0.04]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base leading-none">{item.flag}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.city}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {countryName} · <span className="opacity-90">{conditionText}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-sm" title={conditionText}>
                    {item.icon}
                  </span>
                  <span className="font-mono text-xs font-black text-slate-900 dark:text-white bg-white dark:bg-black/40 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-white/10 shadow-2xs">
                    {formatTemp(item.tempC)}
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
