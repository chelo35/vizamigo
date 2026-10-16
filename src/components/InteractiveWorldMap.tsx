import React, { useState, useMemo, useRef, useEffect, lazy, Suspense } from 'react';
import { loadGoogleMaps } from '../utils/googleMapsLoader';
import {
  CountryItem,
  getCountryName,
  getFlag,
  CAT_INFO,
  VisaCategory,
  getCategoryBadgeLabel,
  REGIONS,
  countryToRegion
} from '../data/passportData';
import { GEO_DATA, CountryGeo } from '../data/geoData';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryGeography } from '../data/countryGeography';
import { useI18n } from '../data/i18n';
import {
  Search,
  MapPin,
  ExternalLink,
  Shield,
  Wifi,
  DollarSign,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Globe,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Move,
  Compass,
  BookOpen,
  Layers,
  Tag,
  CheckCircle2,
  Navigation,
  Map as MapIcon,
  Eye,
  Sliders
} from 'lucide-react';
const CountryDossierModal = lazy(() =>
  import('./CountryDossierModal').then(m => ({ default: m.CountryDossierModal }))
);

// Google Maps Night / Tactical Dark Palette
const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#161e2e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0b0f17' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334155' }, { weight: 1.2 }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cbd5e1' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0e2b26' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#273449' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#182234' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#94a3b8' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#0d9488' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1f293d' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#090d16' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#475569' }]
  }
];

interface InteractiveWorldMapProps {
  currentPassport: string;
  items: CountryItem[];
  onSelectCountry?: (countryCode: string) => void;
  onOpenAuditConsole?: () => void;
  onOpenReportChange?: (country: { code: string; name: string; cat: string }) => void;
}

// Continents with bounding boxes and centers for quick zoom
const CONTINENT_PRESETS = [
  { id: 'all', regionFilter: 'all', labelTr: 'Tüm Dünya', labelEn: 'World', labelDe: 'Weltweit', center: { x: 500, y: 260 }, scale: 1, gZoom: 2 },
  { id: 'europe', regionFilter: 'Avrupa', labelTr: 'Avrupa', labelEn: 'Europe', labelDe: 'Europa', center: { x: 540, y: 160 }, scale: 2.8, gCenter: { lat: 50, lng: 15 }, gZoom: 4 },
  { id: 'asia', regionFilter: 'Asya', labelTr: 'Asya & Orta Doğu', labelEn: 'Asia & Mid East', labelDe: 'Asien & Nahost', center: { x: 700, y: 230 }, scale: 2, gCenter: { lat: 28, lng: 85 }, gZoom: 3.5 },
  { id: 'americas', regionFilter: 'Amerika', labelTr: 'Amerika Kıtası', labelEn: 'Americas', labelDe: 'Amerika', center: { x: 260, y: 280 }, scale: 1.5, gCenter: { lat: 10, lng: -75 }, gZoom: 3 },
  { id: 'africa', regionFilter: 'Afrika', labelTr: 'Afrika', labelEn: 'Africa', labelDe: 'Afrika', center: { x: 530, y: 300 }, scale: 2, gCenter: { lat: 5, lng: 20 }, gZoom: 3.5 },
  { id: 'oceania', regionFilter: 'Okyanusya', labelTr: 'Okyanusya', labelEn: 'Oceania', labelDe: 'Ozeanien', center: { x: 840, y: 390 }, scale: 2.2, gCenter: { lat: -25, lng: 135 }, gZoom: 3.5 },
];

// Major prominent countries to show in zoomed-in vector views
const PROMINENT_CODES = new Set([
  'TR', 'DE', 'FR', 'IT', 'ES', 'GB', 'US', 'JP', 'CN', 'RU', 'BR', 'IN', 'AU', 'CA', 'MX',
  'SA', 'ZA', 'EG', 'TH', 'ID', 'AR', 'GR', 'AZ', 'GE', 'BA', 'NL', 'CH', 'AT', 'PT', 'SE',
  'NO', 'FI', 'PL', 'UA', 'RO', 'KR', 'VN', 'MY', 'SG', 'AE', 'QA', 'IL', 'MA', 'DZ', 'RS',
  'ME', 'AL', 'MK', 'BG', 'HR', 'UZ', 'KZ', 'IR', 'IQ', 'CU', 'CO', 'PE', 'CL', 'NZ'
]);

export const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({
  currentPassport,
  items,
  onSelectCountry,
  onOpenAuditConsole,
  onOpenReportChange
}) => {
  const { language, t, l } = useI18n();

  // Mode switcher: 'google-map' (Live Google Maps) | 'map' (Vector Radar SVG) | 'atlas' (Directory Grid)
  const [viewMode, setViewMode] = useState<'google-map' | 'map' | 'atlas'>('google-map');
  const [mapTheme, setMapTheme] = useState<'dark' | 'roadmap' | 'hybrid'>('dark');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [selectedCode, setSelectedCode] = useState<string | null>('TH'); // Default to popular nomad Thailand
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [activeContinent, setActiveContinent] = useState<string>('all');
  const [dossierCountry, setDossierCountry] = useState<string | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Google Maps Instance Refs
  const googleMapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [mapsLoaded, setMapsLoaded] = useState<boolean>(false);
  const [mapsError, setMapsError] = useState<boolean>(false);

  // SVG Pan/Zoom Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragOriginRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);

  // Map countryCode -> CountryItem
  const itemMap = useMemo(() => {
    const map = new Map<string, CountryItem>();
    items.forEach(it => map.set(it.c, it));
    return map;
  }, [items]);

  // Search matches for quick selection and dossier opening
  const searchMatches = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.trim().toLowerCase();
    return items
      .filter(it => {
        const name = getCountryName(it.c, language).toLowerCase();
        const geo = GEO_DATA[it.c];
        const capital = geo ? geo.capital.toLowerCase() : '';
        const code = it.c.toLowerCase();
        return name.includes(q) || code.includes(q) || capital.includes(q);
      })
      .slice(0, 8);
  }, [items, search, language]);

  // Active continent filter mapping
  const currentPreset = useMemo(() => {
    return CONTINENT_PRESETS.find(p => p.id === activeContinent) || CONTINENT_PRESETS[0];
  }, [activeContinent]);

  // Projected markers (Equirectangular projection: x: 0..1000, y: 0..520)
  const markers = useMemo(() => {
    const result: Array<{
      geo: CountryGeo;
      item: CountryItem;
      x: number;
      y: number;
      color: string;
      label: string;
      isProminent: boolean;
    }> = [];

    Object.values(GEO_DATA).forEach(geo => {
      const item = itemMap.get(geo.code);
      if (!item) return;

      // Filter by category if set
      if (categoryFilter === 'free' && item.cat !== 'free' && !item.id) return;
      if (categoryFilter === 'id' && !item.id) return;
      if (categoryFilter === 'evisa' && item.cat !== 'evisa' && item.cat !== 'eta') return;
      if (categoryFilter === 'voa' && item.cat !== 'voa') return;
      if (categoryFilter === 'visa' && item.cat !== 'visa') return;

      // Filter by continent if selected in atlas or filter
      if (currentPreset.regionFilter !== 'all') {
        const reg = countryToRegion[geo.code];
        if (currentPreset.regionFilter === 'Amerika') {
          if (reg !== 'Kuzey & Orta Amerika' && reg !== 'Güney Amerika') return;
        } else if (currentPreset.regionFilter === 'Asya') {
          if (reg !== 'Asya' && reg !== 'Orta Doğu') return;
        } else if (reg !== currentPreset.regionFilter) {
          return;
        }
      }

      // Filter by search
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const nameTr = getCountryName(geo.code, 'tr').toLowerCase();
        const nameEn = getCountryName(geo.code, 'en').toLowerCase();
        const nameDe = getCountryName(geo.code, 'de').toLowerCase();
        if (
          !nameTr.includes(q) &&
          !nameEn.includes(q) &&
          !nameDe.includes(q) &&
          !geo.code.toLowerCase().includes(q) &&
          !geo.capital.toLowerCase().includes(q)
        ) {
          return;
        }
      }

      // Projection: lng (-180 to 180) -> x (0 to 1000)
      // lat (85 to -60) -> y (0 to 520)
      const x = ((geo.lng + 180) / 360) * 1000;
      const y = ((85 - geo.lat) / 145) * 520;

      // Color scheme based on visa
      let color = '#ef4444'; // Red (Visa)
      if (item.id) color = '#0d9488'; // Teal (ID card)
      else if (item.cat === 'free') color = '#10b981'; // Green (Visa Free)
      else if (item.cat === 'evisa' || item.cat === 'eta') color = '#3b82f6'; // Blue (E-Visa)
      else if (item.cat === 'voa') color = '#f59e0b'; // Amber (On Arrival)

      result.push({
        geo,
        item,
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        color,
        label: getCountryName(geo.code, language),
        isProminent: PROMINENT_CODES.has(geo.code)
      });
    });

    return result;
  }, [itemMap, categoryFilter, search, language, currentPreset]);

  // Selected country enriched details
  const selectedInfo = useMemo(() => {
    if (!selectedCode) return null;
    const geo = GEO_DATA[selectedCode];
    const item = itemMap.get(selectedCode);
    const insights = getCountryInsights(selectedCode, language);
    const geography = getCountryGeography(selectedCode, language);
    if (!geo || !item) return null;
    return { geo, item, insights, geography };
  }, [selectedCode, itemMap, language]);

  // Initialize Google Maps JavaScript API
  useEffect(() => {
    let isMounted = true;
    loadGoogleMaps()
      .then(() => {
        if (!isMounted) return;
        setMapsLoaded(true);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        console.warn('Google Maps JS API load error:', err);
        setMapsError(true);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize / Update Google Maps Canvas & Markers
  useEffect(() => {
    if (!mapsLoaded || viewMode !== 'google-map' || !googleMapContainerRef.current) return;
    if (!window.google || !window.google.maps) return;

    if (!mapInstanceRef.current) {
      const initialCenter = selectedCode && GEO_DATA[selectedCode]
        ? { lat: GEO_DATA[selectedCode].lat, lng: GEO_DATA[selectedCode].lng }
        : { lat: 22, lng: 20 };

      const map = new google.maps.Map(googleMapContainerRef.current, {
        center: initialCenter,
        zoom: selectedCode ? 4 : 2,
        minZoom: 2,
        maxZoom: 14,
        mapTypeId: mapTheme === 'roadmap' ? 'roadmap' : mapTheme === 'hybrid' ? 'hybrid' : 'roadmap',
        styles: mapTheme === 'dark' ? DARK_MAP_STYLES : [],
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: true,
        backgroundColor: '#090d16'
      });
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setMapTypeId(mapTheme === 'roadmap' ? 'roadmap' : mapTheme === 'hybrid' ? 'hybrid' : 'roadmap');
      if (mapTheme === 'dark') {
        mapInstanceRef.current.setOptions({ styles: DARK_MAP_STYLES });
      } else {
        mapInstanceRef.current.setOptions({ styles: [] });
      }
    }

    // Clear previous markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // InfoWindow reuse
    if (!infoWindowRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow();
    }

    // Add markers for current markers list
    markers.forEach(m => {
      const isSelected = selectedCode === m.geo.code;
      const marker = new google.maps.Marker({
        position: { lat: m.geo.lat, lng: m.geo.lng },
        map: mapInstanceRef.current,
        title: `${m.label} (${m.geo.capital})`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: isSelected ? 9.5 : 6,
          fillColor: m.color,
          fillOpacity: 0.95,
          strokeColor: '#ffffff',
          strokeWeight: isSelected ? 2.5 : 1.5
        }
      });

      marker.addListener('click', () => {
        setSelectedCode(m.geo.code);
        if (onSelectCountry) onSelectCountry(m.geo.code);

        const badgeText = getCategoryBadgeLabel(m.item, language);
        const content = `
          <div style="font-family: inherit; padding: 12px 34px 12px 14px; min-width: 200px; color: #f8fafc; text-align: left; line-height: 1.4;">
            <div style="font-weight: 900; font-size: 15px; display: flex; align-items: center; gap: 8px; color: #ffffff;">
              <span style="font-size: 18px;">${getFlag(m.geo.code)}</span>
              <span>${m.label}</span>
            </div>
            <div style="font-size: 12px; color: #94a3b8; margin-top: 4px; font-weight: 600;">
              🏛️ ${m.geo.capital} · ✈️ ${m.geo.mainHub}
            </div>
            <div style="margin-top: 8px; display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 800; background: ${m.color}25; color: ${m.color}; border: 1.5px solid ${m.color}60;">
              ${badgeText}
            </div>
          </div>
        `;
        infoWindowRef.current?.setContent(content);
        infoWindowRef.current?.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  }, [mapsLoaded, viewMode, mapTheme, markers, selectedCode, language]);

  // Fly to country coordinates on the map
  const flyToCountry = (code: string, openDossierNow = false) => {
    setSelectedCode(code);
    if (onSelectCountry) onSelectCountry(code);

    const geo = GEO_DATA[code];
    if (geo) {
      if (viewMode === 'google-map' && mapInstanceRef.current) {
        mapInstanceRef.current.panTo({ lat: geo.lat, lng: geo.lng });
        mapInstanceRef.current.setZoom(5);
      } else {
        const targetX = ((geo.lng + 180) / 360) * 1000;
        const targetY = ((85 - geo.lat) / 145) * 520;
        const targetZoom = Math.max(zoomLevel, 2.3);
        setZoomLevel(targetZoom);
        setPanOffset({
          x: (500 - targetX) * targetZoom,
          y: (260 - targetY) * targetZoom
        });
      }
    }

    if (openDossierNow) {
      setDossierCountry(code);
      setIsDossierOpen(true);
    }
  };

  const handleContinentClick = (preset: typeof CONTINENT_PRESETS[0]) => {
    setActiveContinent(preset.id);
    if (viewMode === 'google-map' && mapInstanceRef.current) {
      if (preset.gCenter) {
        mapInstanceRef.current.panTo(preset.gCenter);
        mapInstanceRef.current.setZoom(preset.gZoom || 3);
      } else {
        mapInstanceRef.current.setZoom(2);
      }
    } else {
      setZoomLevel(preset.scale);
      const offsetX = (500 - preset.center.x) * preset.scale;
      const offsetY = (260 - preset.center.y) * preset.scale;
      setPanOffset({ x: offsetX, y: offsetY });
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(5, Math.max(1, Math.round((prev + delta) * 10) / 10)));
  };

  const handleResetZoom = () => {
    setActiveContinent('all');
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    if (viewMode === 'google-map' && mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(2);
      mapInstanceRef.current.panTo({ lat: 20, lng: 15 });
    }
  };

  const handlePanStep = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 90;
    setPanOffset(prev => {
      const maxPanX = Math.max(350, 550 * (zoomLevel - 0.4));
      const maxPanY = Math.max(220, 300 * (zoomLevel - 0.4));
      let nextX = prev.x;
      let nextY = prev.y;
      if (direction === 'up') nextY += step;
      if (direction === 'down') nextY -= step;
      if (direction === 'left') nextX += step;
      if (direction === 'right') nextX -= step;
      return {
        x: Math.max(-maxPanX, Math.min(maxPanX, nextX)),
        y: Math.max(-maxPanY, Math.min(maxPanY, nextY))
      };
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragOriginRef.current = { x: e.clientX, y: e.clientY };
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const totalDist = Math.hypot(e.clientX - dragOriginRef.current.x, e.clientY - dragOriginRef.current.y);
    if (totalDist > 10) {
      hasMovedRef.current = true;
    }
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const rect = containerRef.current?.getBoundingClientRect();
    const scaleRatio = rect && rect.width > 0 ? 1000 / rect.width : 1;

    setPanOffset(prev => {
      const maxPanX = Math.max(400, 600 * (zoomLevel - 0.3));
      const maxPanY = Math.max(250, 350 * (zoomLevel - 0.3));
      const newX = Math.max(-maxPanX, Math.min(maxPanX, prev.x + dx * scaleRatio));
      const newY = Math.max(-maxPanY, Math.min(maxPanY, prev.y + dy * scaleRatio));
      return { x: newX, y: newY };
    });

    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      hasMovedRef.current = false;
      dragOriginRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const totalDist = Math.hypot(e.touches[0].clientX - dragOriginRef.current.x, e.touches[0].clientY - dragOriginRef.current.y);
    if (totalDist > 10) {
      hasMovedRef.current = true;
    }
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    const rect = containerRef.current?.getBoundingClientRect();
    const scaleRatio = rect && rect.width > 0 ? 1000 / rect.width : 1;

    setPanOffset(prev => {
      const maxPanX = Math.max(400, 600 * (zoomLevel - 0.3));
      const maxPanY = Math.max(250, 350 * (zoomLevel - 0.3));
      const newX = Math.max(-maxPanX, Math.min(maxPanX, prev.x + dx * scaleRatio));
      const newY = Math.max(-maxPanY, Math.min(maxPanY, prev.y + dy * scaleRatio));
      return { x: newX, y: newY };
    });

    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY < 0 ? 0.25 : -0.25;
    setZoomLevel(prev => Math.min(5, Math.max(1, Math.round((prev + delta) * 10) / 10)));
  };

  const openGoogleMaps = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Quick ribbon of countries for the active region
  const regionRibbonCountries = useMemo(() => {
    return markers.slice(0, 18);
  }, [markers]);

  return (
    <div className="space-y-4">
      {/* Top Interactive Controls & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Header Title & Subtitle */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗺️</span>
              <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                {l('Dünya Seyahat Atlası & İnteraktif Harita', 'World Travel Atlas & Interactive Map', 'Weltreise-Atlas & Interaktive Karte')}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {l(
                '199 ülkenin vize, güvenlik, internet, yerel taksi, priz ve yaşam maliyetlerini gerçek teyitli istihbaratla keşfedin.',
                'Explore visa, safety, internet, ride apps, plugs, and living costs for 199 countries with verified intelligence.',
                'Erkunden Sie Visum, Sicherheit, Internet, Taxi-Apps und Lebenshaltungskosten für 199 Länder mit geprüften Daten.'
              )}
            </p>
          </div>

          {/* Mode Switcher & Search Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('google-map')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'google-map'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>{l('Google Haritalar', 'Google Maps', 'Google Maps')}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'map'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{l('Vektör Radar', 'Vector Radar', 'Vektor-Radar')}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('atlas')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'atlas'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>📑</span>
                <span>{l('Ülke Atlası', 'Country Atlas', 'Länder-Atlas')}</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="relative min-w-[200px] flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={l('Ülke, başkent veya kod ara...', 'Search country, capital...', 'Land oder Hauptstadt suchen...')}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              {/* Quick Match Dropdown */}
              {searchMatches.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden py-1 max-h-64 overflow-y-auto">
                  {searchMatches.map((it) => {
                    const geoData = getCountryGeography(it.c, language);
                    return (
                      <button
                        key={it.c}
                        type="button"
                        onClick={() => {
                          flyToCountry(it.c);
                          setSearch('');
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-xs cursor-pointer border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getFlag(it.c)}</span>
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-100">
                              {getCountryName(it.c, language)}
                            </span>
                            <span className="text-[11px] text-slate-400 ml-1.5 font-normal">
                              ({geoData.capital} · {geoData.currencyCode})
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                          {l('Haritada Odakla →', 'Focus on Map →', 'Auf Karte →')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters & Continent Presets */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {/* Continent Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 mr-1 hidden sm:inline">
              {l('Bölge:', 'Region:', 'Region:')}
            </span>
            {CONTINENT_PRESETS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleContinentClick(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeContinent === p.id
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {l(p.labelTr, p.labelEn, p.labelDe)}
              </button>
            ))}
          </div>

          {/* Visa Category Legend / Filter */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            {viewMode === 'google-map' && (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setMapTheme('dark')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer ${mapTheme === 'dark' ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'text-slate-500'}`}
                >
                  🌙 {l('Koyu', 'Dark', 'Dunkel')}
                </button>
                <button
                  type="button"
                  onClick={() => setMapTheme('roadmap')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer ${mapTheme === 'roadmap' ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'text-slate-500'}`}
                >
                  🗺️ {l('Yol', 'Road', 'Straße')}
                </button>
                <button
                  type="button"
                  onClick={() => setMapTheme('hybrid')}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer ${mapTheme === 'hybrid' ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'text-slate-500'}`}
                >
                  🛰️ {l('Uydu', 'Sat', 'Sat')}
                </button>
              </div>
            )}

            {viewMode === 'map' && (
              <button
                type="button"
                onClick={() => setShowLabels(!showLabels)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                  showLabels
                    ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                }`}
                title={l('Haritada ülke isimlerini göster veya gizle', 'Show or hide country labels on map', 'Ländernamen anzeigen/ausblenden')}
              >
                <Tag className="w-3 h-3" />
                <span>{showLabels ? l('🏷️ İsimler Açık', '🏷️ Labels ON', '🏷️ Namen AN') : l('🏷️ İsimler Sade', '🏷️ Labels OFF', '🏷️ Namen AUS')}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-2 py-0.5 rounded-md font-bold cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'text-slate-500'
              }`}
            >
              {l('Tümü', 'All', 'Alle')}
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter(categoryFilter === 'free' ? 'all' : 'free')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-bold cursor-pointer ${
                categoryFilter === 'free'
                  ? 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              {l('Vizesiz', 'Visa-Free', 'Visumfrei')}
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter(categoryFilter === 'evisa' ? 'all' : 'evisa')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-bold cursor-pointer ${
                categoryFilter === 'evisa'
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              {l('E-Vize', 'eVisa', 'e-Visum')}
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter(categoryFilter === 'voa' ? 'all' : 'voa')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-bold cursor-pointer ${
                categoryFilter === 'voa'
                  ? 'ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              {l('Kapıda', 'VoA', 'b. Ankunft')}
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter(categoryFilter === 'visa' ? 'all' : 'visa')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-bold cursor-pointer ${
                categoryFilter === 'visa'
                  ? 'ring-2 ring-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              {l('Vize Şart', 'Visa Req.', 'Visumpflicht')}
            </button>
          </div>
        </div>

        {/* Quick Regional Country Ribbons for Instant 1-Click Access */}
        {regionRibbonCountries.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Navigation className="w-3 h-3 text-teal-500" />
              <span>{l('Bölgedeki Ülkelere Hızlı Ulaşım (Tıklayın Harita Odaklansın):', 'Quick Travel Picks (Click to focus on map):', 'Schnellauswahl (Klicken zum Fokussieren):')}</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
              {regionRibbonCountries.map(m => {
                const isSelected = selectedCode === m.geo.code;
                return (
                  <button
                    key={m.geo.code}
                    type="button"
                    onClick={() => flyToCountry(m.geo.code)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-600 text-white shadow-xs ring-2 ring-teal-400'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>{getFlag(m.geo.code)}</span>
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* VIEW MODE 1: LIVE GOOGLE MAPS */}
      {viewMode === 'google-map' && (
        <div className="relative bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg select-none">
          <div
            ref={googleMapContainerRef}
            className="w-full aspect-[16/9] min-h-[380px] sm:min-h-[500px] overflow-hidden relative"
          />

          {/* Fallback notice if Google Maps couldn't connect */}
          {mapsError && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white z-20">
              <Compass className="w-10 h-10 text-teal-400 mb-2 animate-bounce" />
              <p className="text-sm font-bold">{l('Canlı Google Haritalar yüklenemedi, Vektör Radar modu aktifleştirildi.', 'Google Maps could not load, switching to Vector Radar.', 'Google Maps konnte nicht geladen werden, Vektor-Radar aktiv.')}</p>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className="mt-3 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold"
              >
                {l('Vektör Haritaya Geç', 'Switch to Vector Map', 'Zu Vektorkarte wechseln')}
              </button>
            </div>
          )}

          {/* Bottom Floating Hint */}
          <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-2 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <Move className="w-3.5 h-3.5 text-teal-400" />
            <span>{l('Google Haritalar üzerinde gezinmek için sürükleyin, ülkeye tıklayın', 'Drag to pan on Google Maps, click pins to inspect', 'Auf Google Maps ziehen, Pins anklicken')}</span>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: VISUAL SVG INTERACTIVE MAP (CLEAN, NO OVERLAPPING BADGES) */}
      {viewMode === 'map' && (
        <div className="relative bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg select-none">
          {/* Floating Pan & Zoom Controls */}
          <div className="absolute top-3 right-3 z-20 flex flex-col items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-2xl shadow-xl">
            {/* Zoom In */}
            <button
              type="button"
              onClick={() => handleZoom(0.3)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title={l('Yakınlaştır (+)', 'Zoom In (+)', 'Vergrößern (+)')}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {/* Zoom Out */}
            <button
              type="button"
              onClick={() => handleZoom(-0.3)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title={l('Uzaklaştır (-)', 'Zoom Out (-)', 'Verkleinern (-)')}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            {/* Reset */}
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title={l('Sıfırla', 'Reset View', 'Zurücksetzen')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="w-full h-px bg-slate-800 my-0.5" />

            {/* D-Pad Pan Directional Controls */}
            <div className="grid grid-cols-3 gap-0.5">
              <span />
              <button
                type="button"
                onClick={() => handlePanStep('up')}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title={l('Yukarı Kaydır', 'Pan Up', 'Nach oben')}
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <span />

              <button
                type="button"
                onClick={() => handlePanStep('left')}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title={l('Sola Kaydır', 'Pan Left', 'Nach links')}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1 text-teal-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                title={l('Merkeze Dön', 'Center Map', 'Zentrieren')}
              >
                <Compass className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handlePanStep('right')}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title={l('Sağa Kaydır', 'Pan Right', 'Nach rechts')}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <span />
              <button
                type="button"
                onClick={() => handlePanStep('down')}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title={l('Aşağı Kaydır', 'Pan Down', 'Nach unten')}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <span />
            </div>
          </div>

          {/* Bottom Floating Hint / Zoom Indicator */}
          <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <Move className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>{l('Haritada gezinmek için sürükleyin, ülkeye tıklayın', 'Drag to pan, click country to inspect', 'Ziehen zum Navigieren, Land anklicken')}</span>
            <span className="text-[10px] font-mono text-teal-400 font-bold bg-teal-950/60 px-1.5 py-0.5 rounded border border-teal-800/60">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          {/* SVG Map Canvas */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              handleMouseUp();
              setHoveredCode(null);
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className={`w-full aspect-[16/9] min-h-[350px] sm:min-h-[480px] overflow-hidden flex items-center justify-center relative bg-gradient-to-b from-slate-950 via-[#0a1120] to-slate-950 touch-none select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            <svg
              viewBox="0 0 1000 520"
              className="w-full h-full pointer-events-auto"
            >
              <defs>
                <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Ocean */}
              <rect width="1000" height="520" fill="url(#oceanGlow)" />

              {/* Pan & Zoom Transform Group */}
              <g
                transform={`translate(${panOffset.x}, ${panOffset.y}) translate(500, 260) scale(${zoomLevel}) translate(-500, -260)`}
                style={{
                  transition: isDragging ? 'none' : 'transform 250ms ease-out'
                }}
              >
                {/* Latitude/Longitude grid lines */}
                <g stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3">
                  <line x1="0" y1="130" x2="1000" y2="130" />
                  <line x1="0" y1="260" x2="1000" y2="260" /> {/* Equator */}
                  <line x1="0" y1="390" x2="1000" y2="390" />
                  <line x1="250" y1="0" x2="250" y2="520" />
                  <line x1="500" y1="0" x2="500" y2="520" /> {/* Prime Meridian */}
                  <line x1="750" y1="0" x2="750" y2="520" />
                </g>

                {/* Stylized Continents Outlines */}
                <g fill="#13213c" stroke="#1e3a63" strokeWidth="0.8" opacity="0.85">
                  {/* North America */}
                  <path d="M 120 70 L 290 80 L 260 170 L 220 220 L 250 250 L 210 270 L 170 210 L 110 180 Z" />
                  {/* South America */}
                  <path d="M 230 260 L 320 280 L 330 350 L 280 460 L 250 430 L 220 320 Z" />
                  {/* Europe */}
                  <path d="M 460 70 L 590 80 L 580 170 L 500 190 L 460 150 L 440 100 Z" />
                  {/* Africa */}
                  <path d="M 450 190 L 580 190 L 610 280 L 570 420 L 500 420 L 440 260 Z" />
                  {/* Asia */}
                  <path d="M 590 80 L 890 90 L 870 240 L 760 300 L 680 280 L 590 190 Z" />
                  {/* Australia */}
                  <path d="M 770 340 L 890 350 L 880 430 L 780 420 Z" />
                </g>

                {/* Interactive Country Markers & Non-Colliding Badges */}
                {markers.map((m) => {
                  const isSelected = selectedCode === m.geo.code;
                  const isHovered = hoveredCode === m.geo.code;

                  // FIX: Show label ONLY when hovered or selected, or when zoomed in to avoid brick of overlapping badges!
                  const shouldShowLabel =
                    isSelected ||
                    isHovered ||
                    (showLabels && zoomLevel >= 2.5 && m.isProminent);

                  const labelText = m.label;
                  const badgeWidth = Math.max(28, labelText.length * 6.5 + 10);

                  return (
                    <g
                      key={m.geo.code}
                      className="cursor-pointer transition-transform group"
                      style={{ pointerEvents: 'auto' }}
                      onMouseEnter={() => setHoveredCode(m.geo.code)}
                      onMouseLeave={() => setHoveredCode(null)}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        flyToCountry(m.geo.code, false);
                      }}
                    >
                      {/* Generous Click Target Circle */}
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r={22}
                        fill="transparent"
                        className="cursor-pointer"
                      />

                      {/* Outer Pulsing Ring for Selected */}
                      {isSelected && (
                        <circle
                          cx={m.x}
                          cy={m.y}
                          r={14}
                          fill="none"
                          stroke={m.color}
                          strokeWidth="2.5"
                          opacity="0.9"
                          className="animate-ping"
                        />
                      )}

                      {/* Pin Circle */}
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r={isSelected ? 7.5 : isHovered ? 6.5 : 4.5}
                        fill={m.color}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        filter={isSelected ? 'url(#glow)' : undefined}
                        className="transition-transform group-hover:scale-125"
                      />

                      {/* High-Contrast Country Name Pill (Shown only on select, hover, or high zoom) */}
                      {shouldShowLabel && (
                        <g className="select-none pointer-events-auto">
                          {/* Label Pill Box */}
                          <rect
                            x={m.x - badgeWidth / 2}
                            y={m.y - (isSelected ? 26 : 22)}
                            width={badgeWidth}
                            height={15}
                            rx={4.5}
                            ry={4.5}
                            fill={isSelected ? '#042f2e' : '#090f1d'}
                            stroke={isSelected ? '#2dd4bf' : m.color}
                            strokeWidth={isSelected ? 1.5 : 0.8}
                            opacity={isSelected ? 1 : 0.95}
                            className="shadow-sm transition-all"
                          />
                          {/* Label Text */}
                          <text
                            x={m.x}
                            y={m.y - (isSelected ? 15 : 11)}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="8.5"
                            fontWeight="bold"
                            letterSpacing="0.2"
                            className="select-none pointer-events-none"
                          >
                            {labelText}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: COUNTRY ATLAS & DIRECTORY GRID */}
      {viewMode === 'atlas' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>📑</span>
                <span>
                  {l(currentPreset.labelTr, currentPreset.labelEn, currentPreset.labelDe)} {l('Ülke Kataloğu & Atlası', 'Country Directory & Atlas', 'Länder-Verzeichnis')}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  {markers.length} {l('Ülke', 'Countries', 'Länder')}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {l(
                  'Başkenti, para birimi ve vize durumuyla listelenen ülkeleri haritada odaklayabilir veya detaylı dosyasını açabilirsiniz.',
                  'Explore countries with their capital, currency, and visa status. Focus on map or open detailed dossier.',
                  'Erkunden Sie Länder mit Hauptstadt, Währung und Visumstatus. Auf Karte fokussieren oder Dossier öffnen.'
                )}
              </p>
            </div>
          </div>

          {/* Atlas Country Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[620px] overflow-y-auto pr-1">
            {markers.map(m => {
              const geoData = getCountryGeography(m.geo.code, language);
              const isSelected = selectedCode === m.geo.code;
              return (
                <div
                  key={m.geo.code}
                  className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl leading-none">{getFlag(m.geo.code)}</span>
                      <div>
                        <div className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                          {m.label}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          🏛️ {geoData.capital}
                        </div>
                      </div>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap"
                      style={{
                        backgroundColor:
                          m.item.id || m.item.cat === 'free'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : m.item.cat === 'evisa' || m.item.cat === 'eta'
                            ? 'rgba(59, 130, 246, 0.15)'
                            : m.item.cat === 'voa'
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(239, 68, 68, 0.15)',
                        color: m.color
                      }}
                    >
                      {getCategoryBadgeLabel(m.item, language)}
                    </span>
                  </div>

                  {/* Currency & Travel Indicators */}
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <div className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400">{l('Para Birimi', 'Currency', 'Währung')}</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        💰 {geoData.currencyCode} ({geoData.currencySymbol})
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400">{l('Ana Havalimanı', 'Hub', 'Drehkreuz')}</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        ✈️ {m.geo.mainHub}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('google-map');
                        flyToCountry(m.geo.code, false);
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Navigation className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                      <span>{l('Haritada Gör', 'Map View', 'Auf Karte')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDossierCountry(m.geo.code);
                        setIsDossierOpen(true);
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{l('Dosyayı Aç', 'Dossier', 'Dossier')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Country Live Sheet / Bottom Inspector */}
      {selectedInfo && (
        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 text-slate-900 dark:text-white shadow-md space-y-3.5 animate-in fade-in duration-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Country Header & Currency / Capital */}
            <div
              className="space-y-1.5 cursor-pointer group"
              onClick={() => {
                setDossierCountry(selectedInfo.item.c);
                setIsDossierOpen(true);
              }}
              title={l('Ayrıntılı ülke dosyasını açmak için tıklayın', 'Click to open detailed country dossier', 'Klicken für detailliertes Länderdossier')}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl leading-none group-hover:scale-110 transition-transform">
                  {getFlag(selectedInfo.item.c)}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {getCountryName(selectedInfo.item.c, language)}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      🏛️ {l('Başkent: ', 'Capital: ', 'Hauptstadt: ')}<b>{selectedInfo.geography.capital}</b>
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
                      💰 {selectedInfo.geography.currencyName} ({selectedInfo.geography.currencyCode} - {selectedInfo.geography.currencySymbol})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor:
                          selectedInfo.item.id || selectedInfo.item.cat === 'free'
                            ? 'rgba(16, 185, 129, 0.2)'
                            : selectedInfo.item.cat === 'evisa' || selectedInfo.item.cat === 'eta'
                            ? 'rgba(59, 130, 246, 0.2)'
                            : selectedInfo.item.cat === 'voa'
                            ? 'rgba(245, 158, 11, 0.2)'
                            : 'rgba(239, 68, 68, 0.2)',
                        color:
                          selectedInfo.item.id || selectedInfo.item.cat === 'free'
                            ? '#10b981'
                            : selectedInfo.item.cat === 'evisa' || selectedInfo.item.cat === 'eta'
                            ? '#3b82f6'
                            : selectedInfo.item.cat === 'voa'
                            ? '#f59e0b'
                            : '#ef4444'
                      }}
                    >
                      {getCategoryBadgeLabel(selectedInfo.item, language)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {l('Havalimanı:', 'Main Hub:', 'Haupt-Drehkreuz:')} <b>{selectedInfo.geo.mainHub}</b> · 🕒 {selectedInfo.geography.timeZone} · 🔌 {selectedInfo.geography.plugTypes}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              {/* Safety Score */}
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-2 sm:px-3 rounded-2xl">
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  {l('Güvenlik', 'Safety', 'Sicherheit')}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedInfo.insights.safety.safetyScore}/100
                </div>
                <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                  {selectedInfo.insights.safety.safetyLevel}
                </div>
              </div>

              {/* Internet Speed */}
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-2 sm:px-3 rounded-2xl">
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  <Wifi className="w-3 h-3 text-sky-500" />
                  {l('İnternet', 'Internet', 'Internet')}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedInfo.insights.internet.mobileSpeedMbps} Mbps
                </div>
                <div className="text-[9px] text-sky-600 dark:text-sky-400 font-semibold truncate">
                  {selectedInfo.insights.internet.costPerGbUsd}/GB
                </div>
              </div>

              {/* Daily Cost */}
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-2 sm:px-3 rounded-2xl">
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  <DollarSign className="w-3 h-3 text-amber-500" />
                  {l('Günlük Bütçe', 'Daily Budget', 'Tagesbudget')}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedInfo.insights.livingCosts.dailyBudgetBackpackerUsd}
                </div>
                <div className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold truncate">
                  {selectedInfo.insights.transport.costLevel}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDossierCountry(selectedInfo.item.c);
                  setIsDossierOpen(true);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                <span>{l('📖 Kapsamlı Ülke Dosyasını Aç', '📖 Open Full Country Dossier', '📖 Länderdossier & Kultur öffnen')}</span>
              </button>

              <button
                type="button"
                onClick={() => openGoogleMaps(`${selectedInfo.geo.capital}, ${getCountryName(selectedInfo.item.c, language)}`)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all border border-slate-200 dark:border-slate-700 cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 text-teal-500" />
                <span>{l("Google Haritalar", 'Google Maps', 'Google Maps')}</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </button>
            </div>
          </div>

          {/* Major Cities & Tourist Spots Pills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            {/* Major Cities */}
            <div className="space-y-1.5">
              <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>🏙️</span>
                <span>{l('Büyük Şehirler & Metropoller:', 'Major Cities & Metropolises:', 'Großstädte & Metropolen:')}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedInfo.geography.majorCities.map((city, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Tourist Regions */}
            <div className="space-y-1.5">
              <div className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <span>🏖️</span>
                <span>{l('Popüler Turistik Bölgeler & Gezilecek Yerler:', 'Popular Touristic Regions & Highlights:', 'Beliebte Urlaubsregionen & Highlights:')}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedInfo.geography.touristRegions.map((region, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800/60"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Country Cultural & Travel Dossier Modal */}
      {isDossierOpen && (
        <Suspense fallback={null}>
          <CountryDossierModal
            isOpen={isDossierOpen}
            onClose={() => setIsDossierOpen(false)}
            countryCode={dossierCountry}
            currentPassport={currentPassport}
            onOpenAudit={onOpenAuditConsole}
            onOpenReportChange={onOpenReportChange}
          />
        </Suspense>
      )}
    </div>
  );
};
