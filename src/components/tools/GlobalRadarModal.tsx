import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Globe,
  Clock,
  CloudSun,
  DollarSign,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Compass,
  ArrowRightLeft,
  Navigation,
  Layers,
  MapPin,
  Radio,
  Eye,
  Sliders
} from 'lucide-react';
import { ALL_WORLD_HUBS, WorldHub } from '../../data/worldHubs';
import { getHubWeather, HubWeather } from '../../data/weatherData';
import { getCountryGeography } from '../../data/countryGeography';
import { getCrossRate, formatCurrencyValue, convertCurrency } from '../../data/currencyRates';
import { GEO_DATA, CountryGeo } from '../../data/geoData';
import { getCountryName, getFlag, CAT_INFO } from '../../data/passportData';
import { getPassportItems } from '../../utils/calculator';
import { useI18n } from '../../data/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'all' | 'clock' | 'weather' | 'currency';
  initialCity?: string;
  currentPassport?: string;
  onOpenCountryDossier?: (countryCode: string) => void;
}

// Exact geographical coordinates for major multi-city hubs to prevent pin stacking
const SPECIAL_CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Istanbul: { lat: 41.01, lng: 28.98 },
  Ankara: { lat: 39.93, lng: 32.85 },
  Antalya: { lat: 36.89, lng: 30.71 },
  Frankfurt: { lat: 50.11, lng: 8.68 },
  Munich: { lat: 48.14, lng: 11.58 },
  Berlin: { lat: 52.52, lng: 13.40 },
  Milan: { lat: 45.46, lng: 9.19 },
  Rome: { lat: 41.90, lng: 12.50 },
  Barcelona: { lat: 41.39, lng: 2.17 },
  Madrid: { lat: 40.42, lng: -3.70 },
  Zurich: { lat: 47.38, lng: 8.54 },
  Geneva: { lat: 46.20, lng: 6.14 },
  Bern: { lat: 46.95, lng: 7.45 },
  Dubrovnik: { lat: 42.65, lng: 18.09 },
  Zagreb: { lat: 45.81, lng: 15.98 },
  Budva: { lat: 42.29, lng: 18.84 },
  Podgorica: { lat: 42.43, lng: 19.26 },
  Almaty: { lat: 43.24, lng: 76.91 },
  Astana: { lat: 51.17, lng: 71.43 },
  Samarkand: { lat: 39.65, lng: 66.96 },
  Tashkent: { lat: 41.31, lng: 69.24 },
  Jeddah: { lat: 21.54, lng: 39.17 },
  Riyadh: { lat: 24.71, lng: 46.68 },
  Dubai: { lat: 25.20, lng: 55.27 },
  'Abu Dhabi': { lat: 24.45, lng: 54.38 },
  Alexandria: { lat: 31.20, lng: 29.92 },
  Cairo: { lat: 30.04, lng: 31.24 },
  'Sharm El-Sheikh': { lat: 27.92, lng: 34.33 },
  Hurghada: { lat: 27.26, lng: 33.81 },
  Casablanca: { lat: 33.57, lng: -7.59 },
  Marrakech: { lat: 31.63, lng: -8.01 },
  Rabat: { lat: 34.02, lng: -6.83 },
  Kyoto: { lat: 35.01, lng: 135.77 },
  Osaka: { lat: 34.69, lng: 135.50 },
  Tokyo: { lat: 35.68, lng: 139.77 },
  Shanghai: { lat: 31.23, lng: 121.47 },
  Beijing: { lat: 39.90, lng: 116.41 },
  'Hong Kong': { lat: 22.32, lng: 114.17 },
  Phuket: { lat: 7.88, lng: 98.39 },
  'Chiang Mai': { lat: 18.79, lng: 98.98 },
  Bangkok: { lat: 13.76, lng: 100.50 },
  Bali: { lat: -8.41, lng: 115.19 },
  Jakarta: { lat: -6.20, lng: 106.85 },
  'Ho Chi Minh': { lat: 10.82, lng: 106.63 },
  Hanoi: { lat: 21.03, lng: 105.83 },
  Mumbai: { lat: 19.08, lng: 72.88 },
  'New Delhi': { lat: 28.61, lng: 77.21 },
  'New York': { lat: 40.71, lng: -74.01 },
  'Los Angeles': { lat: 34.05, lng: -118.24 },
  Chicago: { lat: 41.88, lng: -87.63 },
  Miami: { lat: 25.76, lng: -80.19 },
  'San Francisco': { lat: 37.77, lng: -122.42 },
  Toronto: { lat: 43.65, lng: -79.38 },
  Vancouver: { lat: 49.28, lng: -123.12 },
  Montreal: { lat: 45.50, lng: -73.57 },
  Ottawa: { lat: 45.42, lng: -75.70 },
  Cancun: { lat: 21.16, lng: -86.85 },
  'Mexico City': { lat: 19.43, lng: -99.13 },
  Medellin: { lat: 6.24, lng: -75.58 },
  Bogota: { lat: 4.71, lng: -74.07 },
  'São Paulo': { lat: -23.55, lng: -46.63 },
  'Rio de Janeiro': { lat: -22.91, lng: -43.17 },
  Brasilia: { lat: -15.79, lng: -47.88 },
  'Cape Town': { lat: -33.92, lng: 18.42 },
  Johannesburg: { lat: -26.20, lng: 28.04 },
  Pretoria: { lat: -25.75, lng: 28.19 },
  Zanzibar: { lat: -6.16, lng: 39.20 },
  Melbourne: { lat: -37.81, lng: 144.96 },
  Sydney: { lat: -33.87, lng: 151.21 },
  Auckland: { lat: -36.85, lng: 174.76 },
  Wellington: { lat: -41.29, lng: 174.78 }
};

// Extracts 2-letter ISO country code from emoji flag (Unicode Regional Indicator symbols)
function flagToCountryCode(flag: string): string {
  const chars = [...flag];
  if (chars.length < 2) return '';
  const cp1 = chars[0].codePointAt(0);
  const cp2 = chars[1].codePointAt(0);
  if (!cp1 || !cp2) return '';
  return String.fromCharCode(cp1 - 127397, cp2 - 127397);
}

// Continent presets with zoom center and scale
const CONTINENT_PRESETS = [
  { id: 'all', labelTr: 'Tüm Dünya', labelEn: 'World', labelDe: 'Welt', center: { x: 500, y: 260 }, scale: 1 },
  { id: 'europe', labelTr: 'Avrupa', labelEn: 'Europe', labelDe: 'Europa', center: { x: 540, y: 160 }, scale: 2.8 },
  { id: 'asia', labelTr: 'Asya & Körfez', labelEn: 'Asia & Gulf', labelDe: 'Asien', center: { x: 720, y: 230 }, scale: 2.1 },
  { id: 'americas', labelTr: 'Amerika', labelEn: 'Americas', labelDe: 'Amerika', center: { x: 260, y: 270 }, scale: 1.6 },
  { id: 'africa', labelTr: 'Afrika', labelEn: 'Africa', labelDe: 'Afrika', center: { x: 530, y: 310 }, scale: 2.0 },
  { id: 'oceania', labelTr: 'Okyanusya', labelEn: 'Oceania', labelDe: 'Ozeanien', center: { x: 860, y: 380 }, scale: 2.2 },
];

export const GlobalRadarModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialMode = 'all',
  initialCity,
  currentPassport = 'TR',
  onOpenCountryDossier
}) => {
  const { language, l } = useI18n();

  // Active Telemetry Mode
  const [telemetryMode, setTelemetryMode] = useState<'all' | 'clock' | 'weather' | 'currency'>(initialMode);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [activeContinent, setActiveContinent] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<WorldHub>(() => {
    if (initialCity) {
      const match = ALL_WORLD_HUBS.find((h) => h.city.toLowerCase() === initialCity.toLowerCase());
      if (match) return match;
    }
    return ALL_WORLD_HUBS.find((h) => h.city === 'Tokyo') || ALL_WORLD_HUBS[0];
  });

  // Ticking time for live clocks
  const [now, setNow] = useState<Date>(() => new Date());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // FX converter live test input
  const [convertAmount, setConvertAmount] = useState<number>(100);
  const [convertFromCode, setConvertFromCode] = useState<'USD' | 'EUR' | 'GBP' | 'TRY'>('USD');

  // Zoom & Pan for SVG map
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update live clock every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync initial parameters when opening
  useEffect(() => {
    if (isOpen) {
      if (initialMode) setTelemetryMode(initialMode);
      if (initialCity) {
        const match = ALL_WORLD_HUBS.find((h) => h.city.toLowerCase() === initialCity.toLowerCase());
        if (match) setSelectedHub(match);
      }
    }
  }, [isOpen, initialMode, initialCity]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Passport visa item cache
  const passportItems = useMemo(() => {
    try {
      return getPassportItems(currentPassport);
    } catch {
      return [];
    }
  }, [currentPassport]);

  // Target intelligence for currently selected hub
  const targetIntel = useMemo(() => {
    const countryCode = flagToCountryCode(selectedHub.flag);
    const geo = SPECIAL_CITY_COORDS[selectedHub.city] || GEO_DATA[countryCode] || { lat: 0, lng: 0 };
    const geography = getCountryGeography(countryCode, language);
    const weather = getHubWeather(selectedHub.city, selectedHub);
    const countryName = selectedHub.country[language as keyof typeof selectedHub.country] || selectedHub.country.tr;

    // Local time calculation
    let localTimeString = '--:--:--';
    let localHour = 12;
    let localMinute = 0;
    let localSecond = 0;
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: selectedHub.tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).formatToParts(now);
      const h = parts.find((p) => p.type === 'hour')?.value;
      const m = parts.find((p) => p.type === 'minute')?.value;
      const s = parts.find((p) => p.type === 'second')?.value;
      if (h && m && s) {
        localTimeString = `${h}:${m}:${s}`;
        localHour = parseInt(h, 10);
        localMinute = parseInt(m, 10);
        localSecond = parseInt(s, 10);
      }
    } catch {}

    const isDayTime = localHour >= 6 && localHour < 19;

    // Time difference vs Istanbul / TR
    let timeDiffText = '';
    try {
      const trHour = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Europe/Istanbul',
          hour: '2-digit',
          hour12: false
        }).format(now),
        10
      );
      const diff = localHour - trHour;
      if (diff === 0) {
        timeDiffText = l('İstanbul ile aynı saat', 'Same time as Istanbul', 'Gleiche Zeit wie Istanbul');
      } else if (diff > 0) {
        timeDiffText = l(`İstanbul'dan +${diff} saat ileride`, `+${diff}h ahead of Istanbul`, `+${diff}h vor Istanbul`);
      } else {
        timeDiffText = l(`İstanbul'dan ${diff} saat geride`, `${diff}h behind Istanbul`, `${diff}h hinter Istanbul`);
      }
    } catch {}

    // Currency Cross Rates
    const destCurrency = geography.currencyCode || 'USD';
    const rate1Usd = getCrossRate('USD', destCurrency);
    const rate1Eur = getCrossRate('EUR', destCurrency);
    const rate1Gbp = getCrossRate('GBP', destCurrency);
    const rate1Try = getCrossRate('TRY', destCurrency);

    // Live converted value from user input
    const convertedLocalAmount = convertCurrency(convertAmount, convertFromCode, destCurrency);

    // Visa Status for user passport
    const visaItem = passportItems.find((it) => it.c === countryCode);
    const visaBadge = visaItem
      ? visaItem.id || visaItem.cat === 'free'
        ? { text: l('Vizesiz Giriş', 'Visa-Free', 'Visumfrei'), color: 'emerald' }
        : visaItem.cat === 'evisa' || visaItem.cat === 'eta'
        ? { text: l('e-Vize / ETA', 'eVisa / ETA', 'e-Visum'), color: 'teal' }
        : visaItem.cat === 'voa'
        ? { text: l('Kapıda Vize', 'Visa on Arrival', 'Visum bei Ankunft'), color: 'amber' }
        : { text: l('Konsolosluk Vizesi', 'Visa Required', 'Visum erforderlich'), color: 'rose' }
      : { text: l('Vizesiz', 'Visa-Free', 'Visumfrei'), color: 'emerald' };

    return {
      countryCode,
      countryName,
      geo,
      geography,
      weather,
      localTimeString,
      localHour,
      localMinute,
      localSecond,
      isDayTime,
      timeDiffText,
      destCurrency,
      rate1Usd,
      rate1Eur,
      rate1Gbp,
      rate1Try,
      convertedLocalAmount,
      visaBadge
    };
  }, [selectedHub, now, language, convertAmount, convertFromCode, passportItems, l]);

  // Projected SVG Markers for all 154 hubs
  const projectedMarkers = useMemo(() => {
    return ALL_WORLD_HUBS.map((hub) => {
      const countryCode = flagToCountryCode(hub.flag);
      const coords = SPECIAL_CITY_COORDS[hub.city] || GEO_DATA[countryCode] || { lat: 0, lng: 0 };
      // Equirectangular projection: x: 0..1000, y: 0..520
      const x = ((coords.lng + 180) / 360) * 1000;
      const y = ((90 - coords.lat) / 180) * 520;
      const isSelected = hub.city === selectedHub.city;

      // Hub live weather & clock for badge indicators
      const weather = getHubWeather(hub.city, hub);
      let isDay = true;
      let hubTimeShort = '';
      try {
        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone: hub.tz,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).formatToParts(now);
        const h = parts.find((p) => p.type === 'hour')?.value;
        const m = parts.find((p) => p.type === 'minute')?.value;
        if (h && m) {
          hubTimeShort = `${h}:${m}`;
          const hourNum = parseInt(h, 10);
          isDay = hourNum >= 6 && hourNum < 19;
        }
      } catch {}

      return {
        hub,
        countryCode,
        coords,
        x,
        y,
        isSelected,
        weather,
        isDay,
        hubTimeShort
      };
    });
  }, [selectedHub, now]);

  // Filtered search hubs
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ALL_WORLD_HUBS.filter((h) => {
      return (
        h.city.toLowerCase().includes(q) ||
        (h.cityTr && h.cityTr.toLowerCase().includes(q)) ||
        h.country.tr.toLowerCase().includes(q) ||
        h.country.en.toLowerCase().includes(q) ||
        h.country.de.toLowerCase().includes(q)
      );
    }).slice(0, 8);
  }, [searchQuery]);

  // Handle Continent Quick Jump
  const handleContinentClick = (preset: typeof CONTINENT_PRESETS[0]) => {
    setActiveContinent(preset.id);
    setScale(preset.scale);
    // Pan offset to center the preset
    const targetX = -(preset.center.x * preset.scale - 500);
    const targetY = -(preset.center.y * preset.scale - 260);
    setPan({ x: targetX, y: targetY });
  };

  // Select hub and center map on it
  const handleSelectHub = (hub: WorldHub) => {
    setSelectedHub(hub);
    setSearchQuery('');
    setIsSearchOpen(false);

    const countryCode = flagToCountryCode(hub.flag);
    const coords = SPECIAL_CITY_COORDS[hub.city] || GEO_DATA[countryCode] || { lat: 0, lng: 0 };
    const x = ((coords.lng + 180) / 360) * 1000;
    const y = ((90 - coords.lat) / 180) * 520;

    // Smoothly focus on selected target
    setScale((prev) => Math.max(prev, 1.8));
    const targetScale = Math.max(scale, 1.8);
    setPan({
      x: -(x * targetScale - 500),
      y: -(y * targetScale - 260)
    });
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      onMouseUp={handleMouseUp}
    >
      {/* Main Container - Cyber Glass HUD */}
      <div className="relative w-full max-w-7xl h-[92vh] max-h-[900px] flex flex-col rounded-3xl bg-slate-900/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden text-slate-100">
        
        {/* ============================================================== */}
        {/* TOP TELEMETRY HUD BAR                                         */}
        {/* ============================================================== */}
        <header className="flex-shrink-0 px-4 sm:px-6 py-3.5 bg-slate-950/90 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Radar Live Ping & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black tracking-wider uppercase bg-gradient-to-r from-white via-cyan-200 to-teal-400 bg-clip-text text-transparent">
                  {l('Küresel Seyahat Radarı', 'Global Travel Radar', 'Globaler Reiseradar', 'Radar de Viajes', 'Глобальный Радар')}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  HUD v3.4 · 154 HUBS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                {l('Canlı Dünya Saati · Meteoroloji · Çapraz Döviz Kurları', 'Live World Clock · Meteorology · Cross FX Rates', 'Echtzeit-Uhr · Wetter · Währungskurse')}
              </p>
            </div>
          </div>

          {/* Middle: Telemetry Mode Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-white/10 shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setTelemetryMode('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                telemetryMode === 'all'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{l('Tümü', 'All', 'Alle')}</span>
            </button>
            <button
              type="button"
              onClick={() => setTelemetryMode('clock')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                telemetryMode === 'clock'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-cyan-300" />
              <span>{l('Saatler', 'Clocks', 'Uhren')}</span>
            </button>
            <button
              type="button"
              onClick={() => setTelemetryMode('weather')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                telemetryMode === 'weather'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <CloudSun className="w-3.5 h-3.5 text-amber-300" />
              <span>{l('Hava Durumu', 'Weather', 'Wetter')}</span>
            </button>
            <button
              type="button"
              onClick={() => setTelemetryMode('currency')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                telemetryMode === 'currency'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-300" />
              <span>{l('Döviz & Kurlar', 'FX Rates', 'Währungen')}</span>
            </button>
          </div>

          {/* Right: Controls & Close */}
          <div className="flex items-center gap-2">
            {/* Temp Unit Toggle */}
            <button
              type="button"
              onClick={() => setTempUnit((u) => (u === 'C' ? 'F' : 'C'))}
              className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs font-bold border border-white/10 transition-colors cursor-pointer"
              title="Sıcaklık Birimi (°C / °F)"
            >
              °{tempUnit}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 transition-all cursor-pointer"
              title={l('Kapat', 'Close', 'Schließen')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ============================================================== */}
        {/* SUBHEADER: CONTINENT CHIPS & SEARCH BAR                        */}
        {/* ============================================================== */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-2 bg-slate-950/70 border-b border-cyan-500/10 flex items-center justify-between gap-3 text-xs">
          
          {/* Continent Quick Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {CONTINENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleContinentClick(preset)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeContinent === preset.id
                    ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-xs'
                    : 'bg-slate-800/50 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {preset.labelTr}
              </button>
            ))}
          </div>

          {/* Fast Search Autocomplete */}
          <div className="relative flex-shrink-0 w-44 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder={l('Şehir veya ülke ara (örn: Tokyo, Roma)...', 'Search city or country...', 'Stadt oder Land suchen...')}
              className="w-full pl-8 pr-3 py-1 text-xs rounded-xl bg-slate-950/90 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
            />
            {/* Search Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 py-1 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-xl z-30 max-h-56 overflow-y-auto">
                {searchResults.map((hub) => (
                  <button
                    key={hub.city}
                    type="button"
                    onClick={() => handleSelectHub(hub)}
                    className="w-full px-3 py-1.5 flex items-center justify-between text-left hover:bg-cyan-950/50 text-xs transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{hub.flag}</span>
                      <span className="font-bold text-white">{hub.cityTr || hub.city}</span>
                      <span className="text-[10px] text-slate-400">({hub.country[language as keyof typeof hub.country] || hub.country.tr})</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">{hub.region}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE RADAR WORKSPACE (MAP + HUD DRAWER)                */}
        {/* ============================================================== */}
        <div className="relative flex-1 flex overflow-hidden">
          
          {/* --- MAP CANVAS WRAPPER --- */}
          <div
            className="relative flex-1 h-full bg-[#070b14] overflow-hidden select-none cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            {/* High-tech Radar Grid & Background Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

            {/* Radar Sweep Beam Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
              <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-[shimmer_8s_infinite_linear]" />
            </div>

            {/* SVG Interactive Map */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                transformOrigin: '500px 260px'
              }}
            >
              <svg
                viewBox="0 0 1000 520"
                className="w-full h-full max-w-[1200px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Graticule Latitude & Longitude Lines */}
                <g stroke="#0e2338" strokeWidth="0.5" strokeDasharray="3 3">
                  {/* Equator & Tropics */}
                  <line x1="0" y1="260" x2="1000" y2="260" stroke="#00ffff" strokeWidth="0.8" strokeOpacity="0.3" />
                  <line x1="0" y1="193" x2="1000" y2="193" /> {/* Tropic of Cancer */}
                  <line x1="0" y1="327" x2="1000" y2="327" /> {/* Tropic of Capricorn */}
                  {/* Prime Meridian */}
                  <line x1="500" y1="0" x2="500" y2="520" stroke="#00ffff" strokeWidth="0.8" strokeOpacity="0.3" />
                  <line x1="250" y1="0" x2="250" y2="520" />
                  <line x1="750" y1="0" x2="750" y2="520" />
                </g>

                {/* Continental Simplified Radar Silhouettes */}
                <g fill="#10192e" stroke="#1e3a5f" strokeWidth="0.75" opacity="0.85">
                  {/* North America */}
                  <path d="M 120 70 L 220 50 L 320 60 L 310 110 L 250 140 L 270 200 L 230 250 L 190 220 L 140 160 L 100 110 Z" />
                  {/* South America */}
                  <path d="M 270 260 L 340 280 L 370 330 L 340 430 L 300 460 L 270 370 L 250 300 Z" />
                  {/* Europe */}
                  <path d="M 460 90 L 550 70 L 590 120 L 560 170 L 490 180 L 450 140 Z" />
                  {/* Africa */}
                  <path d="M 460 190 L 570 190 L 600 270 L 560 380 L 500 410 L 450 300 L 440 220 Z" />
                  {/* Asia */}
                  <path d="M 580 60 L 850 70 L 890 150 L 830 250 L 730 260 L 670 210 L 590 140 Z" />
                  {/* Australia & Oceania */}
                  <path d="M 780 340 L 880 340 L 890 410 L 810 420 L 770 370 Z" />
                </g>

                {/* Pinpoint Radar Markers for 154 Hubs */}
                {projectedMarkers.map((marker) => {
                  const { hub, x, y, isSelected, weather, isDay, hubTimeShort } = marker;
                  
                  // Color coding by active telemetry mode
                  let pinColor = '#06b6d4'; // default cyan
                  if (telemetryMode === 'clock') {
                    pinColor = isDay ? '#38bdf8' : '#818cf8';
                  } else if (telemetryMode === 'weather') {
                    pinColor = weather.tempC >= 25 ? '#f97316' : weather.tempC >= 15 ? '#eab308' : '#06b6d4';
                  } else if (telemetryMode === 'currency') {
                    pinColor = '#10b981';
                  }

                  return (
                    <g
                      key={hub.city}
                      transform={`translate(${x}, ${y})`}
                      className="cursor-pointer transition-all duration-150"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectHub(hub);
                      }}
                    >
                      {/* Selected Reticle Target Ping */}
                      {isSelected && (
                        <g>
                          <circle r="14" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" className="animate-[spin_4s_linear_infinite]" />
                          <circle r="9" fill="none" stroke="#06b6d4" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                          <circle r="4" fill="#00ffff" />
                        </g>
                      )}

                      {/* City Hub Point Node */}
                      <circle
                        r={isSelected ? 5 : 3.5}
                        fill={pinColor}
                        stroke="#0f172a"
                        strokeWidth="1.5"
                        className="hover:scale-150 transition-transform"
                      />

                      {/* Mode Badge Preview on Pin (Visible on Zoomed Map or Selected) */}
                      {(scale >= 1.7 || isSelected) && (
                        <g transform="translate(0, -9)">
                          <rect
                            x="-22"
                            y="-11"
                            width="44"
                            height="12"
                            rx="4"
                            fill="#020617"
                            fillOpacity="0.85"
                            stroke={isSelected ? '#00ffff' : '#334155'}
                            strokeWidth="0.8"
                          />
                          <text
                            x="0"
                            y="-2.5"
                            textAnchor="middle"
                            fill={isSelected ? '#00ffff' : '#cbd5e1'}
                            fontSize="7.5"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {telemetryMode === 'weather'
                              ? `${weather.tempC}°`
                              : telemetryMode === 'currency'
                              ? hub.flag
                              : hubTimeShort || hub.city}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Map Controls Floating Overlay (Zoom In, Zoom Out, Reset) */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 z-20">
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(s + 0.4, 4))}
                className="w-8 h-8 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 flex items-center justify-center transition-all shadow-md cursor-pointer"
                title={l('Yakınlaştır', 'Zoom In', 'Heranzoomen')}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(s - 0.4, 0.8))}
                className="w-8 h-8 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 flex items-center justify-center transition-all shadow-md cursor-pointer"
                title={l('Uzaklaştır', 'Zoom Out', 'Herauszoomen')}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setScale(1);
                  setPan({ x: 0, y: 0 });
                  setActiveContinent('all');
                }}
                className="w-8 h-8 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 flex items-center justify-center transition-all shadow-md cursor-pointer"
                title={l('Sıfırla', 'Reset View', 'Ansicht zurücksetzen')}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Telemetry Coordinate Tracker Overlay */}
            <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 shadow-md">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{selectedHub.city.toUpperCase()}</span>
              </span>
              <span className="text-slate-500">|</span>
              <span>LAT: {targetIntel.geo.lat.toFixed(2)}°</span>
              <span>LNG: {targetIntel.geo.lng.toFixed(2)}°</span>
              <span className="text-slate-500">|</span>
              <span>MAG: {scale.toFixed(1)}x</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* TARGET TELEMETRY HUD DRAWER (RIGHT PANEL)                      */}
          {/* ============================================================== */}
          <aside className="w-full sm:w-96 flex-shrink-0 bg-slate-950/95 border-l border-cyan-500/20 flex flex-col overflow-y-auto p-4 sm:p-5 space-y-4 shadow-2xl z-20">
            
            {/* 1. Target Identity Header */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl select-none filter drop-shadow">{selectedHub.flag}</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      {selectedHub.cityTr || selectedHub.city}
                    </h3>
                    <div className="text-xs text-cyan-300 font-medium">
                      {targetIntel.countryName} · <span className="font-mono text-[11px] text-slate-400">{targetIntel.countryCode}</span>
                    </div>
                  </div>
                </div>

                {/* Visa Badge */}
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] whitespace-nowrap shadow-xs">
                  {targetIntel.visaBadge.text}
                </span>
              </div>

              {/* Coordinates & Region strip */}
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>📍 {selectedHub.region}</span>
                <span>{targetIntel.geo.lat > 0 ? `${targetIntel.geo.lat}°N` : `${Math.abs(targetIntel.geo.lat)}°S`}, {targetIntel.geo.lng > 0 ? `${targetIntel.geo.lng}°E` : `${Math.abs(targetIntel.geo.lng)}°W`}</span>
              </div>
            </div>

            {/* 2. BENTO 1: CANLI SAAT & ZAMAN DİLİMİ (WORLD CLOCK) */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-400">
                  <Clock className="w-3.5 h-3.5" />
                  {l('Canlı Yerel Saat', 'Live Local Time', 'Lokale Echtzeit')}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-950 text-[10px] font-mono text-cyan-300 font-bold border border-cyan-800">
                  {selectedHub.tz.split('/')[1] || selectedHub.tz}
                </span>
              </div>

              {/* Big Glowing Digital Clock + Mini SVG Analog Clock */}
              <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-white/5">
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black tracking-wider text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    {targetIntel.localTimeString}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                    <span>{targetIntel.isDayTime ? '☀️ Gündüz Vakti' : '🌙 Gece Vakti'}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-cyan-300 font-mono text-[10px]">{targetIntel.timeDiffText}</span>
                  </div>
                </div>

                {/* Working Analog Mini Clock */}
                <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-cyan-500/50 relative shadow-inner flex items-center justify-center flex-shrink-0">
                  {/* Clock Center Pin */}
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 z-10" />
                  {/* Hour Hand */}
                  <div
                    className="absolute w-0.5 h-4 bg-white rounded-full origin-bottom bottom-1/2 left-[calc(50%-1px)]"
                    style={{ transform: `rotate(${(targetIntel.localHour % 12) * 30 + targetIntel.localMinute * 0.5}deg)` }}
                  />
                  {/* Minute Hand */}
                  <div
                    className="absolute w-0.5 h-5 bg-cyan-300 rounded-full origin-bottom bottom-1/2 left-[calc(50%-1px)]"
                    style={{ transform: `rotate(${targetIntel.localMinute * 6}deg)` }}
                  />
                  {/* Second Hand */}
                  <div
                    className="absolute w-px h-6 bg-rose-400 rounded-full origin-bottom bottom-1/2 left-[calc(50%-0.5px)]"
                    style={{ transform: `rotate(${targetIntel.localSecond * 6}deg)` }}
                  />
                </div>
              </div>
            </div>

            {/* 3. BENTO 2: CANLI METEOROLOJİ & HAVA DURUMU */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                  <CloudSun className="w-3.5 h-3.5" />
                  {l('Canlı Meteoroloji', 'Live Meteorology', 'Live-Wetter')}
                </span>
                <span className="text-xs font-bold text-amber-300">
                  {targetIntel.weather.condition[language as keyof typeof targetIntel.weather.condition] || targetIntel.weather.condition.tr}
                </span>
              </div>

              {/* Weather Stats Display */}
              <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl select-none">{targetIntel.weather.icon}</span>
                  <div>
                    <div className="font-mono text-2xl font-black text-white">
                      {tempUnit === 'F'
                        ? `${Math.round((targetIntel.weather.tempC * 9) / 5 + 32)}°F`
                        : `${targetIntel.weather.tempC}°C`}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {l('Hissedilen:', 'Feels like:', 'Gefühlt:')}{' '}
                      <b className="text-slate-200">
                        {tempUnit === 'F'
                          ? `${Math.round((targetIntel.weather.feelsLikeC * 9) / 5 + 32)}°F`
                          : `${targetIntel.weather.feelsLikeC}°C`}
                      </b>
                    </div>
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono space-y-0.5 text-slate-300">
                  <div>💧 {l('Nem:', 'Humidity:', 'Feuchte:')} <b>%{targetIntel.weather.humidity}</b></div>
                  <div>💨 {l('Rüzgar:', 'Wind:', 'Wind:')} <b>{targetIntel.weather.windKmh} km/h</b></div>
                </div>
              </div>
            </div>

            {/* 4. BENTO 3: CANLI DÖVİZ VE ÇAPRAZ KURLAR (FX MATRIX) */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
                  <DollarSign className="w-3.5 h-3.5" />
                  {l('Döviz & Çapraz Kurlar', 'FX & Cross Rates', 'Wechselkurse')}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-[10px] font-mono text-emerald-300 font-bold border border-emerald-800">
                  {targetIntel.destCurrency} ({targetIntel.geography.currencySymbol})
                </span>
              </div>

              {/* Currency Name Subtitle */}
              <div className="text-[11px] text-slate-300 font-medium">
                💰 {targetIntel.geography.currencyName}
              </div>

              {/* Live Cross Rates Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-xl bg-slate-950/80 border border-white/5">
                  <div className="text-[9px] text-slate-400">1 USD (Dolar)</div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {formatCurrencyValue(targetIntel.rate1Usd)} {targetIntel.destCurrency}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-950/80 border border-white/5">
                  <div className="text-[9px] text-slate-400">1 EUR (Euro)</div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {formatCurrencyValue(targetIntel.rate1Eur)} {targetIntel.destCurrency}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-950/80 border border-white/5">
                  <div className="text-[9px] text-slate-400">1 GBP (Sterlin)</div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {formatCurrencyValue(targetIntel.rate1Gbp)} {targetIntel.destCurrency}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-950/80 border border-white/5">
                  <div className="text-[9px] text-slate-400">1 TRY (Türk Lirası)</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">
                    {formatCurrencyValue(targetIntel.rate1Try)} {targetIntel.destCurrency}
                  </div>
                </div>
              </div>

              {/* Live Instant Converter Mini Tool */}
              <div className="p-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{l('Canlı Hızlı Çevirici:', 'Instant Calculator:', 'Schnellrechner:')}</span>
                  <span className="text-emerald-400 font-bold">2026 Live Baseline</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={convertAmount || ''}
                    onChange={(e) => setConvertAmount(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-20 px-2 py-1 rounded-lg bg-slate-900 border border-white/10 font-mono text-xs font-bold text-white text-center focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                  <select
                    value={convertFromCode}
                    onChange={(e) => setConvertFromCode(e.target.value as any)}
                    className="px-2 py-1 rounded-lg bg-slate-900 border border-white/10 font-mono text-xs font-bold text-emerald-400 focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                  <span className="text-slate-400 font-bold">=</span>
                  <div className="flex-1 font-mono text-xs font-black text-white text-right truncate">
                    {formatCurrencyValue(targetIntel.convertedLocalAmount)} {targetIntel.destCurrency}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. ACTION: OPEN COUNTRY DOSSIER */}
            {onOpenCountryDossier && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCountryDossier(targetIntel.countryCode);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
              >
                <span>{l('Detaylı Ülke Dosyasını Aç', 'Open Full Country Dossier', 'Länder-Dossier öffnen')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
