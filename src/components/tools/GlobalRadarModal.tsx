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
  ChevronRight,
  Radio,
  RefreshCw,
  MapPin,
  Layers,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ALL_WORLD_HUBS, WorldHub, flagToIso } from '../../data/worldHubs';
import { getHubWeather, useLiveWeather } from '../../data/weatherData';
import { getCountryGeography } from '../../data/countryGeography';
import { getCrossRate, formatCurrencyValue, convertCurrency, useLiveCurrencyRates } from '../../data/currencyRates';
import { GEO_DATA } from '../../data/geoData';
import { getPassportItems } from '../../utils/calculator';
import { useI18n } from '../../data/i18n';
import { loadGoogleMaps, DARK_MAP_STYLES } from '../../utils/googleMapsLoader';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'all' | 'clock' | 'weather' | 'currency';
  initialCity?: string;
  currentPassport?: string;
  onOpenCountryDossier?: (countryCode: string) => void;
}

interface ContinentPreset {
  id: string;
  labelTr: string;
  labelEn: string;
  labelDe: string;
  gCenter: { lat: number; lng: number };
  gZoom: number;
  svgCenter: { x: number; y: number };
  svgScale: number;
  filterFn: (hub: WorldHub) => boolean;
}

const CONTINENT_PRESETS: ContinentPreset[] = [
  {
    id: 'all',
    labelTr: '🌍 Tüm Dünya',
    labelEn: '🌍 World',
    labelDe: '🌍 Welt',
    gCenter: { lat: 24, lng: 18 },
    gZoom: 2,
    svgCenter: { x: 500, y: 230 },
    svgScale: 1,
    filterFn: () => true
  },
  {
    id: 'TR',
    labelTr: '🇹🇷 Türkiye',
    labelEn: '🇹🇷 Turkey',
    labelDe: '🇹🇷 Türkei',
    gCenter: { lat: 38.6, lng: 32.0 },
    gZoom: 6,
    svgCenter: { x: 589, y: 148 },
    svgScale: 5.2,
    filterFn: (h) => h.iso === 'TR' || h.flag === '🇹🇷'
  },
  {
    id: 'TH',
    labelTr: '🇹🇭 Tayland',
    labelEn: '🇹🇭 Thailand',
    labelDe: '🇹🇭 Thailand',
    gCenter: { lat: 12.8, lng: 100.5 },
    gZoom: 6,
    svgCenter: { x: 779, y: 222 },
    svgScale: 5.0,
    filterFn: (h) => h.iso === 'TH' || h.flag === '🇹🇭'
  },
  {
    id: 'europe',
    labelTr: 'Avrupa',
    labelEn: 'Europe',
    labelDe: 'Europa',
    gCenter: { lat: 47.5, lng: 15.0 },
    gZoom: 4,
    svgCenter: { x: 542, y: 122 },
    svgScale: 2.8,
    filterFn: (h) => h.region === 'Europe'
  },
  {
    id: 'asia',
    labelTr: 'Asya & Körfez',
    labelEn: 'Asia & Gulf',
    labelDe: 'Asien & Golf',
    gCenter: { lat: 25.0, lng: 92.0 },
    gZoom: 3,
    svgCenter: { x: 755, y: 190 },
    svgScale: 2.1,
    filterFn: (h) => h.region === 'Asia' || h.region === 'Middle East'
  },
  {
    id: 'americas',
    labelTr: 'Amerika',
    labelEn: 'Americas',
    labelDe: 'Amerika',
    gCenter: { lat: 14.0, lng: -82.0 },
    gZoom: 3,
    svgCenter: { x: 272, y: 220 },
    svgScale: 1.7,
    filterFn: (h) => h.region === 'Americas'
  },
  {
    id: 'africa',
    labelTr: 'Afrika',
    labelEn: 'Africa',
    labelDe: 'Afrika',
    gCenter: { lat: 4.0, lng: 20.0 },
    gZoom: 3,
    svgCenter: { x: 555, y: 255 },
    svgScale: 2.1,
    filterFn: (h) => h.region === 'Africa'
  },
  {
    id: 'oceania',
    labelTr: 'Okyanusya',
    labelEn: 'Oceania',
    labelDe: 'Ozeanien',
    gCenter: { lat: -26.0, lng: 145.0 },
    gZoom: 4,
    svgCenter: { x: 902, y: 335 },
    svgScale: 2.4,
    filterFn: (h) => h.region === 'Oceania'
  }
];

function getHubCoords(hub: WorldHub): { lat: number; lng: number } {
  if (typeof hub.lat === 'number' && typeof hub.lng === 'number') {
    return { lat: hub.lat, lng: hub.lng };
  }
  const code = hub.iso || flagToIso(hub.flag);
  const geo = GEO_DATA[code];
  return geo ? { lat: geo.lat, lng: geo.lng } : { lat: 41.01, lng: 28.98 };
}

export const GlobalRadarModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialMode = 'all',
  initialCity,
  currentPassport = 'TR',
  onOpenCountryDossier
}) => {
  const { language, l } = useI18n();
  const { isLive: isFxLive, refresh: refreshFx } = useLiveCurrencyRates();
  const [isRefreshingFx, setIsRefreshingFx] = useState(false);

  // Active Telemetry Mode
  const [telemetryMode, setTelemetryMode] = useState<'all' | 'clock' | 'weather' | 'currency'>(initialMode);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [activeContinent, setActiveContinent] = useState<string>('all');
  const [mapTheme, setMapTheme] = useState<'dark' | 'roadmap' | 'hybrid'>('dark');
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(false);

  const [selectedHub, setSelectedHub] = useState<WorldHub>(() => {
    if (initialCity) {
      const match = ALL_WORLD_HUBS.find(
        (h) =>
          h.city.toLowerCase() === initialCity.toLowerCase() ||
          (h.cityTr && h.cityTr.toLowerCase() === initialCity.toLowerCase())
      );
      if (match) return match;
    }
    return ALL_WORLD_HUBS.find((h) => h.city === 'Istanbul') || ALL_WORLD_HUBS[0];
  });

  // Live ticking clock
  const [now, setNow] = useState<Date>(() => new Date());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // FX converter live test input
  const [convertAmount, setConvertAmount] = useState<number>(100);
  const [convertFromCode, setConvertFromCode] = useState<'USD' | 'EUR' | 'GBP' | 'TRY'>('USD');

  // Google Maps refs & state
  const googleMapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [mapsLoaded, setMapsLoaded] = useState<boolean>(false);
  const [mapsError, setMapsError] = useState<boolean>(false);
  const [gZoomLevel, setGZoomLevel] = useState<number>(3);

  // Fallback SVG zoom & pan (used only if Google Maps fails to load)
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // All hubs in the same country as selectedHub (for instant switching between e.g. Bangkok, Phuket, Pattaya, Koh Samui or Istanbul, Antalya, Muğla, Bodrum)
  const siblingCountryHubs = useMemo(() => {
    const code = selectedHub.iso || flagToIso(selectedHub.flag);
    return ALL_WORLD_HUBS.filter((h) => (h.iso || flagToIso(h.flag)) === code);
  }, [selectedHub]);

  // Hubs matching the active continent/country filter chip
  const filteredContinentHubs = useMemo(() => {
    const preset = CONTINENT_PRESETS.find((p) => p.id === activeContinent) || CONTINENT_PRESETS[0];
    return ALL_WORLD_HUBS.filter(preset.filterFn);
  }, [activeContinent]);

  // Fetch live Open-Meteo weather for the selected hub + its sibling cities in the same country + top visible hubs
  const weatherTargetHubs = useMemo(() => {
    const combined = [selectedHub, ...siblingCountryHubs, ...filteredContinentHubs.slice(0, 25)];
    const seen = new Set<string>();
    return combined.filter((h) => {
      if (seen.has(h.city)) return false;
      seen.add(h.city);
      return true;
    });
  }, [selectedHub, siblingCountryHubs, filteredContinentHubs]);

  useLiveWeather(isOpen ? weatherTargetHubs : []);

  // Update live clock every second
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Load Google Maps when modal opens
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    const onAuthFailure = () => {
      if (isMounted) setMapsError(true);
    };
    window.addEventListener('vizamigo:gmaps-auth-failure', onAuthFailure);

    loadGoogleMaps()
      .then(() => {
        if (!isMounted) return;
        setMapsLoaded(true);
      })
      .catch(() => {
        if (!isMounted) return;
        setMapsError(true);
      });

    return () => {
      isMounted = false;
      window.removeEventListener('vizamigo:gmaps-auth-failure', onAuthFailure);
    };
  }, [isOpen]);

  // Sync initial parameters when opening
  useEffect(() => {
    if (isOpen) {
      if (initialMode) setTelemetryMode(initialMode);
      if (initialCity) {
        const match = ALL_WORLD_HUBS.find(
          (h) =>
            h.city.toLowerCase() === initialCity.toLowerCase() ||
            (h.cityTr && h.cityTr.toLowerCase() === initialCity.toLowerCase())
        );
        if (match) {
          setSelectedHub(match);
          const coords = getHubCoords(match);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.panTo(coords);
            mapInstanceRef.current.setZoom(6);
          }
        }
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
    const countryCode = selectedHub.iso || flagToIso(selectedHub.flag);
    const geo = getHubCoords(selectedHub);
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
      let diff = localHour - trHour;
      if (diff > 12) diff -= 24;
      if (diff < -12) diff += 24;
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

    const convertedLocalAmount = convertCurrency(convertAmount, convertFromCode, destCurrency);

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
  }, [selectedHub, now, language, convertAmount, convertFromCode, passportItems, l, isFxLive]);

  // Initialize & Sync Live Google Map
  useEffect(() => {
    if (!isOpen || !mapsLoaded || mapsError || !googleMapContainerRef.current) return;
    if (!window.google || !window.google.maps) return;

    if (!mapInstanceRef.current) {
      const initialCoords = getHubCoords(selectedHub);
      const map = new google.maps.Map(googleMapContainerRef.current, {
        center: initialCity ? initialCoords : { lat: 30, lng: 25 },
        zoom: initialCity ? 6 : 3,
        minZoom: 2,
        maxZoom: 13,
        mapTypeId: mapTheme === 'hybrid' ? 'hybrid' : 'roadmap',
        styles: mapTheme === 'dark' ? DARK_MAP_STYLES : [],
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
        backgroundColor: '#070b14'
      });

      map.addListener('zoom_changed', () => {
        const z = map.getZoom();
        if (typeof z === 'number') setGZoomLevel(z);
      });

      mapInstanceRef.current = map;
      infoWindowRef.current = new google.maps.InfoWindow();
    }
  }, [isOpen, mapsLoaded, mapsError]);

  // Tear down map instance when modal closes so re-opening mounts cleanly
  useEffect(() => {
    if (!isOpen) {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current.clear();
      mapInstanceRef.current = null;
    }
  }, [isOpen]);

  // Update Google Map theme when toggled
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setMapTypeId(mapTheme === 'hybrid' ? 'hybrid' : 'roadmap');
    map.setOptions({ styles: mapTheme === 'dark' ? DARK_MAP_STYLES : [] });
  }, [mapTheme]);

  // Create/update markers on Google Maps
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!isOpen || !mapsLoaded || mapsError || !map) return;

    // Clear previous markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current.clear();

    ALL_WORLD_HUBS.forEach((hub) => {
      const coords = getHubCoords(hub);
      const isSelected = hub.city === selectedHub.city;
      const weather = getHubWeather(hub.city, hub);
      const displayName = language === 'tr' && hub.cityTr ? hub.cityTr : hub.city;

      // Determine marker color based on telemetryMode
      let fillColor = '#06b6d4';
      if (telemetryMode === 'weather') {
        fillColor = weather.tempC >= 26 ? '#f97316' : weather.tempC >= 16 ? '#eab308' : '#38bdf8';
      } else if (telemetryMode === 'currency') {
        fillColor = '#10b981';
      } else if (telemetryMode === 'clock') {
        fillColor = '#38bdf8';
      }
      if (isSelected) {
        fillColor = '#22d3ee';
      }

      const marker = new google.maps.Marker({
        position: coords,
        map,
        title: `${hub.flag} ${displayName}`,
        zIndex: isSelected ? 999 : 10,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor,
          fillOpacity: 0.95,
          strokeColor: isSelected ? '#ffffff' : '#0f172a',
          strokeWeight: isSelected ? 2.5 : 1.5,
          scale: isSelected ? 9 : 6
        }
      });

      marker.addListener('click', () => {
        handleSelectHub(hub);
      });

      markersRef.current.set(hub.city, marker);
    });
  }, [isOpen, mapsLoaded, mapsError, selectedHub, telemetryMode, language]);

  // Show sleek InfoWindow on the selected hub in Google Maps
  useEffect(() => {
    const map = mapInstanceRef.current;
    const infoWindow = infoWindowRef.current;
    if (!isOpen || !mapsLoaded || mapsError || !map || !infoWindow) return;

    const marker = markersRef.current.get(selectedHub.city);
    if (!marker) return;

    const displayName = language === 'tr' && selectedHub.cityTr ? selectedHub.cityTr : selectedHub.city;
    const tempStr =
      tempUnit === 'F'
        ? `${Math.round((targetIntel.weather.tempC * 9) / 5 + 32)}°F`
        : `${targetIntel.weather.tempC}°C`;

    const contentHtml = `
      <div style="color:#f8fafc;padding:14px 38px 14px 16px;font-family:ui-sans-serif,system-ui,sans-serif;min-width:230px;line-height:1.4;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px;">
          <span style="font-weight:900;font-size:16px;color:#ffffff;letter-spacing:-0.02em;">${selectedHub.flag} ${displayName}</span>
          <span style="font-family:monospace;font-size:13px;font-weight:800;color:#2dd4bf;background:rgba(45,212,191,0.18);padding:3px 8px;border-radius:8px;border:1px solid rgba(45,212,191,0.35);">${targetIntel.localTimeString.slice(0, 5)}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#cbd5e1;gap:12px;">
          <span style="font-weight:800;color:#f1f5f9;display:inline-flex;align-items:center;gap:4px;">${targetIntel.weather.icon} <b>${tempStr}</b></span>
          <span style="color:#34d399;font-family:monospace;font-weight:800;font-size:13px;background:rgba(52,211,153,0.15);padding:3px 8px;border-radius:8px;border:1px solid rgba(52,211,153,0.3);">1$ = ${formatCurrencyValue(targetIntel.rate1Usd)} ${targetIntel.destCurrency}</span>
        </div>
      </div>
    `;
    infoWindow.setContent(contentHtml);
    infoWindow.open({ map, anchor: marker, shouldFocus: false });
  }, [
    isOpen,
    mapsLoaded,
    mapsError,
    selectedHub,
    targetIntel.weather.tempC,
    targetIntel.weather.icon,
    targetIntel.rate1Usd,
    targetIntel.destCurrency,
    tempUnit,
    language
  ]);

  // Projected SVG Markers (for fallback mode if Google Maps is blocked)
  const projectedMarkers = useMemo(() => {
    return ALL_WORLD_HUBS.map((hub) => {
      const coords = getHubCoords(hub);
      const x = ((coords.lng + 180) / 360) * 1000;
      const y = ((90 - coords.lat) / 180) * 520;
      const isSelected = hub.city === selectedHub.city;
      const weather = getHubWeather(hub.city, hub);
      let hubTimeShort = '';
      try {
        hubTimeShort = new Intl.DateTimeFormat('en-GB', {
          timeZone: hub.tz,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(now);
      } catch {}
      return { hub, coords, x, y, isSelected, weather, hubTimeShort };
    });
  }, [selectedHub, now]);

  // Search autocomplete results across all 500+ hubs
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ALL_WORLD_HUBS.filter((h) => {
      return (
        h.city.toLowerCase().includes(q) ||
        (h.cityTr && h.cityTr.toLowerCase().includes(q)) ||
        h.country.tr.toLowerCase().includes(q) ||
        h.country.en.toLowerCase().includes(q) ||
        h.country.de.toLowerCase().includes(q) ||
        h.country.es.toLowerCase().includes(q) ||
        h.country.ru.toLowerCase().includes(q)
      );
    }).slice(0, 12);
  }, [searchQuery]);

  // Handle Continent / Country Quick Jump
  const handleContinentClick = (preset: ContinentPreset) => {
    setActiveContinent(preset.id);

    // Focus Google Maps smoothly on the continent / country
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(preset.gCenter);
      mapInstanceRef.current.setZoom(preset.gZoom);
    }

    // Also update fallback SVG pan/scale
    setScale(preset.svgScale);
    setPan({
      x: (500 - preset.svgCenter.x) * preset.svgScale,
      y: (260 - preset.svgCenter.y) * preset.svgScale
    });

    // If user clicked a specific country preset (e.g. Türkiye or Tayland), select its top hub if not already in that country
    const firstMatch = ALL_WORLD_HUBS.find(preset.filterFn);
    if (firstMatch && !preset.filterFn(selectedHub)) {
      setSelectedHub(firstMatch);
    }
  };

  // Select hub and fly map to it
  const handleSelectHub = (hub: WorldHub) => {
    setSelectedHub(hub);
    setSearchQuery('');
    setIsSearchOpen(false);

    const coords = getHubCoords(hub);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(coords);
      const currentZoom = mapInstanceRef.current.getZoom() || 3;
      if (currentZoom < 6) {
        mapInstanceRef.current.setZoom(6);
      }
    }

    const x = ((coords.lng + 180) / 360) * 1000;
    const y = ((90 - coords.lat) / 180) * 520;
    const targetScale = Math.max(scale, 2.4);
    setScale(targetScale);
    setPan({
      x: (500 - x) * targetScale,
      y: (260 - y) * targetScale
    });
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      const z = mapInstanceRef.current.getZoom() || 3;
      mapInstanceRef.current.setZoom(Math.min(z + 1, 13));
    }
    setScale((s) => Math.min(s + 0.5, 6));
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      const z = mapInstanceRef.current.getZoom() || 3;
      mapInstanceRef.current.setZoom(Math.max(z - 1, 2));
    }
    setScale((s) => Math.max(s - 0.5, 1));
  };

  const handleResetView = () => {
    setActiveContinent('all');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: 24, lng: 18 });
      mapInstanceRef.current.setZoom(2);
    }
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePan = (dx: number, dy: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panBy(dx, dy);
    } else {
      setPan((prev) => ({ x: prev.x - dx, y: prev.y - dy }));
    }
  };

  const handleManualFxRefresh = async () => {
    setIsRefreshingFx(true);
    await refreshFx();
    setTimeout(() => setIsRefreshingFx(false), 350);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200"
      onMouseUp={() => setIsDragging(false)}
    >
      {/* Top Floating High-Z-Index Close Button (Ensures user can ALWAYS close the modal from ANY viewport) */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-3 sm:top-5 right-3 sm:right-5 z-[9999] p-2.5 sm:p-3 rounded-full bg-slate-900/95 hover:bg-rose-600 text-white hover:text-white border-2 border-cyan-400/50 hover:border-rose-400 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all cursor-pointer flex items-center justify-center group active:scale-90"
        title={l('Kapat / Geri Dön', 'Close / Exit', 'Schließen')}
        aria-label="Close Global Radar"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform text-cyan-200 group-hover:text-white" />
      </button>

      {/* Main Container - Cyber Glass HUD */}
      <div className="relative w-full max-w-7xl h-[93vh] max-h-[920px] flex flex-col rounded-3xl bg-slate-900/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden text-slate-100">
        {/* ============================================================== */}
        {/* TOP TELEMETRY HUD BAR                                         */}
        {/* ============================================================== */}
        <header className="flex-shrink-0 px-4 sm:px-6 py-3 bg-slate-950/90 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
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
                  GOOGLE MAPS · {ALL_WORLD_HUBS.length} MERKEZ
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                {l(
                  'Canlı Dünya Saati · Open-Meteo Canlı Hava Durumu · Güncel Döviz Kurları',
                  'Live World Clock · Open-Meteo Live Weather · Live FX Rates',
                  'Echtzeit-Uhr · Live-Wetter · Aktuelle Wechselkurse'
                )}
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

          {/* Right: Map Theme, Temp Unit & Close */}
          <div className="flex items-center gap-2">
            {/* Map Theme Switcher */}
            <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-900 border border-white/10 text-[11px]">
              {(
                [
                  { id: 'dark', label: l('Koyu', 'Dark', 'Dunkel') },
                  { id: 'roadmap', label: l('Harita', 'Map', 'Karte') },
                  { id: 'hybrid', label: l('Uydu', 'Satellite', 'Satellit') }
                ] as const
              ).map((tItem) => (
                <button
                  key={tItem.id}
                  type="button"
                  onClick={() => setMapTheme(tItem.id)}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    mapTheme === tItem.id ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tItem.label}
                </button>
              ))}
            </div>

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
        {/* SUBHEADER: CONTINENT CHIPS, QUICK CITY BAR & SEARCH            */}
        {/* ============================================================== */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-2 bg-slate-950/80 border-b border-cyan-500/15 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between gap-3">
            {/* Continent & Country Quick Focus Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
              {CONTINENT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleContinentClick(preset)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeContinent === preset.id
                      ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 shadow-xs'
                      : 'bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {language === 'de' ? preset.labelDe : language === 'en' ? preset.labelEn : preset.labelTr}
                </button>
              ))}
            </div>

            {/* Fast Search Autocomplete */}
            <div className="relative flex-shrink-0 w-48 sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder={l(
                  'Şehir, tatil bölgesi veya ülke ara (Antalya, Pattaya, Phuket)...',
                  'Search city, resort or country...',
                  'Stadt oder Land suchen...'
                )}
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-slate-900 border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Search Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 py-1 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-2xl z-30 max-h-64 overflow-y-auto">
                  {searchResults.map((hub) => (
                    <button
                      key={`${hub.city}_${hub.iso || ''}`}
                      type="button"
                      onClick={() => handleSelectHub(hub)}
                      className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-cyan-950/60 text-xs transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base">{hub.flag}</span>
                        <span className="font-bold text-white truncate">
                          {language === 'tr' && hub.cityTr ? hub.cityTr : hub.city}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          ({hub.country[language as keyof typeof hub.country] || hub.country.tr})
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 ml-2 shrink-0">{hub.region}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Scrollable City Strip for Active Region / Country */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80 shrink-0 mr-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {l('Popüler Noktalar:', 'Popular Hubs:', 'Beliebte Orte:')}
            </span>
            {filteredContinentHubs.slice(0, 45).map((hub) => {
              const isSel = hub.city === selectedHub.city;
              const label = language === 'tr' && hub.cityTr ? hub.cityTr : hub.city;
              return (
                <button
                  key={`strip_${hub.city}_${hub.iso || ''}`}
                  type="button"
                  onClick={() => handleSelectHub(hub)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    isSel
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-white/5'
                  }`}
                >
                  <span>{hub.flag}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE RADAR WORKSPACE (GOOGLE MAPS + HUD DRAWER)         */}
        {/* ============================================================== */}
        <div className="relative flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* --- MAP CANVAS WRAPPER --- */}
          <div className="relative flex-1 h-full min-h-[340px] bg-[#070b14] overflow-hidden">
            {/* Live Google Maps Surface */}
            {!mapsError && (
              <div
                ref={googleMapContainerRef}
                className="w-full h-full"
                style={{ minHeight: '340px' }}
              />
            )}

            {/* Loading indicator while Google Maps initializes */}
            {!mapsLoaded && !mapsError && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-10">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{l('Google Haritalar yükleniyor...', 'Loading Google Maps...', 'Google Maps wird geladen...')}</span>
                </div>
              </div>
            )}

            {/* Fallback Vector Map ONLY if Google Maps is blocked */}
            {mapsError && (
              <div
                className="relative w-full h-full bg-[#070b14] overflow-hidden select-none cursor-grab active:cursor-grabbing"
                onMouseDown={(e) => {
                  setIsDragging(true);
                  dragStartRef.current = { x: e.clientX, y: e.clientY };
                  panStartRef.current = { ...pan };
                }}
                onMouseMove={(e) => {
                  if (!isDragging) return;
                  setPan({
                    x: panStartRef.current.x + (e.clientX - dragStartRef.current.x),
                    y: panStartRef.current.y + (e.clientY - dragStartRef.current.y)
                  });
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <svg viewBox="0 0 1000 520" className="w-full h-full max-w-[1200px]" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="#0e2338" strokeWidth="0.5" strokeDasharray="3 3">
                      <line x1="0" y1="260" x2="1000" y2="260" stroke="#00ffff" strokeWidth="0.8" strokeOpacity="0.3" />
                      <line x1="500" y1="0" x2="500" y2="520" stroke="#00ffff" strokeWidth="0.8" strokeOpacity="0.3" />
                    </g>
                    {projectedMarkers.map(({ hub, x, y, isSelected, weather, hubTimeShort }) => (
                      <g
                        key={`${hub.city}_${hub.iso || ''}`}
                        transform={`translate(${x}, ${y})`}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectHub(hub);
                        }}
                      >
                        <circle
                          r={isSelected ? 6 / Math.sqrt(scale) : 3.5 / Math.sqrt(scale)}
                          fill={isSelected ? '#00ffff' : '#06b6d4'}
                          stroke="#0f172a"
                          strokeWidth={1.2 / Math.sqrt(scale)}
                        />
                        {(scale >= 1.8 || isSelected) && (
                          <text
                            x="0"
                            y={-8 / Math.sqrt(scale)}
                            textAnchor="middle"
                            fill={isSelected ? '#00ffff' : '#e2e8f0'}
                            fontSize={9 / Math.sqrt(scale)}
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {hub.flag} {language === 'tr' && hub.cityTr ? hub.cityTr : hub.city}{' '}
                            {telemetryMode === 'weather' ? `${weather.tempC}°` : hubTimeShort}
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            )}

            {/* Touch guidance hint badge on top of map */}
            <div className="absolute top-3 left-3 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px] text-cyan-300/90 font-medium backdrop-blur-md pointer-events-none z-10">
              <span>💡</span>
              <span>{l('Yön tuşları veya haritayı sürükleyerek dünyayı keşfedin', 'Use arrow controls or drag to explore the globe', 'Mit Pfeiltasten oder Ziehen navigieren')}</span>
            </div>

            {/* Mobile View Switcher (Map Focus vs Read All Details) */}
            <div className="lg:hidden absolute top-3 right-3 z-30">
              <button
                type="button"
                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-600/95 hover:bg-cyan-500 text-white text-xs font-bold shadow-xl border border-cyan-300/50 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                {isDetailsExpanded ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>{l('🗺️ Haritayı Göster', '🗺️ Show Map', '🗺️ Karte')}</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{l('📊 Bilgileri Genişlet', '📊 Expand Details', '📊 Details')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Map Controls Floating Overlay (D-Pad Pan + Zoom + Reset) */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-20">
              {/* D-Pad Pan Navigation Buttons */}
              <div className="bg-slate-900/95 p-1.5 rounded-2xl border border-cyan-500/40 shadow-xl flex flex-col items-center gap-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => handlePan(0, -120)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                  title={l('Yukarı Kaydır', 'Pan Up', 'Nach oben')}
                  aria-label="Pan Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handlePan(-120, 0)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                    title={l('Sola Kaydır', 'Pan Left', 'Nach links')}
                    aria-label="Pan Left"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetView}
                    className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-cyan-400 flex items-center justify-center transition-all cursor-pointer text-[10px] font-bold active:scale-95"
                    title={l('Dünya Görünümünü Sıfırla', 'Reset World View', 'Ansicht zurücksetzen')}
                    aria-label="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePan(120, 0)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                    title={l('Sağa Kaydır', 'Pan Right', 'Nach rechts')}
                    aria-label="Pan Right"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handlePan(0, 120)}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                  title={l('Aşağı Kaydır', 'Pan Down', 'Nach unten')}
                  aria-label="Pan Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Zoom In & Out */}
              <div className="flex items-center justify-between gap-1 bg-slate-900/95 p-1 rounded-xl border border-cyan-500/40 shadow-xl backdrop-blur-md">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="flex-1 w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  title={l('Yakınlaştır', 'Zoom In', 'Heranzoomen')}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="flex-1 w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  title={l('Uzaklaştır', 'Zoom Out', 'Herauszoomen')}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Telemetry Coordinate Tracker Overlay */}
            <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 shadow-lg z-20">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{(selectedHub.cityTr || selectedHub.city).toUpperCase()}</span>
              </span>
              <span className="text-slate-500">|</span>
              <span>LAT: {targetIntel.geo.lat.toFixed(2)}°</span>
              <span>LNG: {targetIntel.geo.lng.toFixed(2)}°</span>
              <span className="text-slate-500">|</span>
              <span>ZOOM: {mapsError ? `${scale.toFixed(1)}x` : `${gZoomLevel}z`}</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* TARGET TELEMETRY HUD DRAWER (RIGHT PANEL)                      */}
          {/* ============================================================== */}
          <aside
            className={`w-full lg:w-[420px] flex-shrink-0 bg-slate-950/95 border-t lg:border-t-0 lg:border-l border-cyan-500/20 flex flex-col overflow-y-auto p-4 sm:p-5 space-y-3.5 shadow-2xl z-20 transition-all duration-300 ${
              isDetailsExpanded
                ? 'h-[78vh] max-h-[78vh]'
                : 'h-[44vh] max-h-[44vh] lg:h-auto lg:max-h-none'
            }`}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* 1. Target Identity Header + Same-Country Tourist Cities Selector */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl select-none filter drop-shadow">{selectedHub.flag}</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      {language === 'tr' && selectedHub.cityTr ? selectedHub.cityTr : selectedHub.city}
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

              {/* Other Popular Cities & Resorts in this Country */}
              {siblingCountryHubs.length > 1 && (
                <div className="mt-3 pt-2.5 border-t border-white/10">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                    <span>
                      {targetIntel.countryName} — {l('Popüler Şehirler & Bölgeler', 'Popular Cities & Resorts', 'Beliebte Städte & Regionen')} ({siblingCountryHubs.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                    {siblingCountryHubs.map((cityHub) => {
                      const active = cityHub.city === selectedHub.city;
                      const cLabel = language === 'tr' && cityHub.cityTr ? cityHub.cityTr : cityHub.city;
                      return (
                        <button
                          key={`sib_${cityHub.city}`}
                          type="button"
                          onClick={() => handleSelectHub(cityHub)}
                          className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            active
                              ? 'bg-cyan-500 text-slate-950 font-black shadow-xs'
                              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/5'
                          }`}
                        >
                          {cLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. BENTO 1: CANLI SAAT & ZAMAN DİLİMİ (WORLD CLOCK) */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-400">
                  <Clock className="w-3.5 h-3.5" />
                  {l('Canlı Yerel Saat', 'Live Local Time', 'Lokale Echtzeit')}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-950 text-[10px] font-mono text-cyan-300 font-bold border border-cyan-800">
                  {selectedHub.tz.split('/')[1]?.replace('_', ' ') || selectedHub.tz}
                </span>
              </div>

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
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-500/50 relative shadow-inner flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 z-10" />
                  <div
                    className="absolute w-0.5 h-3.5 bg-white rounded-full origin-bottom bottom-1/2 left-[calc(50%-1px)]"
                    style={{ transform: `rotate(${(targetIntel.localHour % 12) * 30 + targetIntel.localMinute * 0.5}deg)` }}
                  />
                  <div
                    className="absolute w-0.5 h-4.5 bg-cyan-300 rounded-full origin-bottom bottom-1/2 left-[calc(50%-1px)]"
                    style={{ transform: `rotate(${targetIntel.localMinute * 6}deg)` }}
                  />
                  <div
                    className="absolute w-px h-5 bg-rose-400 rounded-full origin-bottom bottom-1/2 left-[calc(50%-0.5px)]"
                    style={{ transform: `rotate(${targetIntel.localSecond * 6}deg)` }}
                  />
                </div>
              </div>
            </div>

            {/* 3. BENTO 2: CANLI METEOROLOJİ & HAVA DURUMU */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
                  <CloudSun className="w-3.5 h-3.5" />
                  {l('Canlı Meteoroloji', 'Live Meteorology', 'Live-Wetter')}
                </span>
                <span className="text-xs font-bold text-amber-300">
                  {targetIntel.weather.condition[language as keyof typeof targetIntel.weather.condition] || targetIntel.weather.condition.tr}
                </span>
              </div>

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
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
                  <DollarSign className="w-3.5 h-3.5" />
                  {l('Döviz & Çapraz Kurlar', 'FX & Cross Rates', 'Wechselkurse')}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleManualFxRefresh}
                    className="p-1 rounded-md bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 cursor-pointer"
                    title={l('Canlı Kurları Güncelle', 'Refresh Live Rates', 'Kurse aktualisieren')}
                  >
                    <RefreshCw className={`w-3 h-3 ${isRefreshingFx ? 'animate-spin' : ''}`} />
                  </button>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-[10px] font-mono text-emerald-300 font-bold border border-emerald-800">
                    {targetIntel.destCurrency} ({targetIntel.geography.currencySymbol})
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 font-medium flex items-center justify-between">
                <span>💰 {targetIntel.geography.currencyName}</span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {isFxLive ? '● Canlı Piyasa Kuru' : '● Güncel Kur'}
                </span>
              </div>

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
                  <span className="text-emerald-400 font-bold">{isFxLive ? 'Canlı Kur Aktif' : 'Güncel Kur'}</span>
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

            {/* Mobile Sticky Exit & Action Bar */}
            <div className="lg:hidden sticky bottom-0 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-3 bg-slate-950/95 backdrop-blur-xl border-t border-cyan-500/30 flex items-center gap-2 z-30">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 font-bold text-xs flex items-center justify-center gap-2 border border-white/10 hover:border-rose-500/30 cursor-pointer active:scale-95 transition-all shadow-md"
              >
                <X className="w-4 h-4 text-rose-400" />
                <span>{l('Kapat / Geri Dön', 'Close / Exit', 'Schließen')}</span>
              </button>
              {onOpenCountryDossier && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCountryDossier(targetIntel.countryCode);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/30 cursor-pointer active:scale-95 transition-all"
                >
                  <span>{l('Ülke Dosyası', 'Country Dossier', 'Länder-Dossier')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
