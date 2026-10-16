import React, { useState, useEffect, useRef, useMemo } from 'react';
import { loadGoogleMaps, DARK_MAP_STYLES } from '../utils/googleMapsLoader';
import {
  CountryItem,
  getCountryName,
  getFlag,
  CAT_INFO,
  getCategoryBadgeLabel
} from '../data/passportData';
import { useI18n } from '../data/i18n';
import {
  CountryGeo,
  getCountryGeo,
  estimateTravelLeg,
  TravelLegEstimate
} from '../data/geoData';
import { RouteStop, formatLocalizedDate, dateToDayIndex } from '../utils/calculator';
import {
  Compass,
  Navigation,
  Clock,
  Plane,
  ArrowRight,
  Map as MapIcon,
  GitCommit,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  Info,
  Globe,
  Maximize2,
  RefreshCw,
  ExternalLink,
  Eye,
  Sliders
} from 'lucide-react';


interface RouteMapVisualizerProps {
  stops: RouteStop[];
  passportItems: Map<string, CountryItem>;
  onSelectStop?: (stopId: string) => void;
  selectedStopId?: string | null;
  onLoadPreset?: (index: number) => void;
}

export const RouteMapVisualizer: React.FC<RouteMapVisualizerProps> = ({
  stops,
  passportItems,
  onSelectStop,
  selectedStopId,
  onLoadPreset
}) => {
  const { language, t, l } = useI18n();
  const [viewMode, setViewMode] = useState<'google-map' | 'schematic' | 'timeline'>('google-map');
  const [mapTheme, setMapTheme] = useState<'dark' | 'roadmap' | 'hybrid'>('dark');
  const [hoveredStopId, setHoveredStopId] = useState<string | null>(null);

  // Google Maps State
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [mapsLoaded, setMapsLoaded] = useState<boolean>(false);
  const [mapsError, setMapsError] = useState<string | null>(null);
  const [activeInfoWindowStopId, setActiveInfoWindowStopId] = useState<string | null>(null);

  // Calculate legs & distances
  const { legs, totalKm, totalHours, projectedPoints, viewBox, geoStops } = useMemo(() => {
    const geoList = stops.map(s => ({
      stop: s,
      geo: getCountryGeo(s.countryCode)
    }));

    const legList: TravelLegEstimate[] = [];
    let kmSum = 0;
    let hourSum = 0;

    for (let i = 0; i < geoList.length - 1; i++) {
      const leg = estimateTravelLeg(geoList[i].stop.countryCode, geoList[i + 1].stop.countryCode);
      legList.push(leg);
      kmSum += leg.distanceKm;
      hourSum += leg.estimatedTransitHours;
    }

    // Dynamic SVG bounds calculation for fallback schematic
    const lats = geoList.map(g => g.geo.lat);
    const lngs = geoList.map(g => g.geo.lng);

    const minLat = lats.length > 0 ? Math.min(...lats) : 20;
    const maxLat = lats.length > 0 ? Math.max(...lats) : 60;
    const minLng = lngs.length > 0 ? Math.min(...lngs) : 0;
    const maxLng = lngs.length > 0 ? Math.max(...lngs) : 50;

    const latSpan = Math.max(12, maxLat - minLat);
    const lngSpan = Math.max(16, maxLng - minLng);

    const padLat = latSpan * 0.24;
    const padLng = lngSpan * 0.24;

    const boundMinLat = minLat - padLat;
    const boundMaxLat = maxLat + padLat;
    const boundMinLng = minLng - padLng;
    const boundMaxLng = maxLng + padLng;

    const width = 840;
    const height = 450;

    const project = (lat: number, lng: number) => {
      const x = ((lng - boundMinLng) / (boundMaxLng - boundMinLng)) * (width - 120) + 60;
      const y = height - (((lat - boundMinLat) / (boundMaxLat - boundMinLat)) * (height - 90) + 45);
      return { x: Math.round(x), y: Math.round(y) };
    };

    const pts = geoList.map(g => ({
      ...g,
      point: project(g.geo.lat, g.geo.lng)
    }));

    return {
      legs: legList,
      totalKm: kmSum,
      totalHours: Math.round(hourSum * 10) / 10,
      projectedPoints: pts,
      viewBox: `0 0 ${width} ${height}`,
      geoStops: geoList
    };
  }, [stops]);

  // Active stop details
  const activeStop = useMemo(() => {
    const targetId = selectedStopId || hoveredStopId || stops[0]?.id;
    return stops.find(s => s.id === targetId) || stops[0];
  }, [stops, selectedStopId, hoveredStopId]);

  const activeStopIndex = stops.findIndex(s => s.id === activeStop?.id);
  const activeGeo = activeStop ? getCountryGeo(activeStop.countryCode) : null;

  // Initialize Google Maps JavaScript API
  useEffect(() => {
    let isMounted = true;

    loadGoogleMaps()
      .then(() => {
        if (!isMounted) return;
        setMapsLoaded(true);
        setMapsError(null);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        console.warn('Google Maps JS API yüklenemedi:', err);
        setMapsError('Google Maps yüklenemedi. Şematik radar harita aktif.');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize or update Map Canvas
  useEffect(() => {
    if (!mapsLoaded || viewMode !== 'google-map' || !mapContainerRef.current) return;

    if (!window.google || !window.google.maps) return;

    // Center point
    const center =
      geoStops.length > 0
        ? { lat: geoStops[0].geo.lat, lng: geoStops[0].geo.lng }
        : { lat: 41.0, lng: 28.97 };

    // Instantiate Google Map if not created yet
    if (!mapInstanceRef.current) {
      // Mandatory attribution tracking ID
      const mapOptions: google.maps.MapOptions & { internalUsageAttributionIds?: string[] } = {
        center,
        zoom: 4,
        mapTypeId:
          mapTheme === 'hybrid'
            ? google.maps.MapTypeId.HYBRID
            : google.maps.MapTypeId.ROADMAP,
        styles: mapTheme === 'dark' ? DARK_MAP_STYLES : [],
        streetViewControl: false,
        fullscreenControl: true,
        mapTypeControl: false,
        zoomControl: true,
        gestureHandling: 'cooperative',
        internalUsageAttributionIds: ['gmp_git_agentskills_v1']
      };

      mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, mapOptions);
      infoWindowRef.current = new google.maps.InfoWindow();
    } else {
      // Update theme
      mapInstanceRef.current.setMapTypeId(
        mapTheme === 'hybrid'
          ? google.maps.MapTypeId.HYBRID
          : google.maps.MapTypeId.ROADMAP
      );
      mapInstanceRef.current.setOptions({
        styles: mapTheme === 'dark' ? DARK_MAP_STYLES : []
      });
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Clear existing polyline
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    if (geoStops.length === 0) return;

    // 1. Draw Route Polyline with Geodesic curvature
    const pathCoordinates = geoStops.map(g => ({
      lat: g.geo.lat,
      lng: g.geo.lng
    }));

    const polyline = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#0d9488', // Teal accent
      strokeOpacity: 0.85,
      strokeWeight: 4,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 3.5,
            strokeColor: '#ffffff',
            fillColor: '#10b981',
            fillOpacity: 1
          },
          offset: '50%',
          repeat: '140px'
        }
      ],
      map
    });

    polylineRef.current = polyline;

    // 2. Add Markers for each destination stop
    const bounds = new google.maps.LatLngBounds();

    geoStops.forEach((item, index) => {
      const position = { lat: item.geo.lat, lng: item.geo.lng };
      bounds.extend(position);

      const pItem = passportItems.get(item.stop.countryCode);
      const isFreeOrId = pItem && (pItem.id || pItem.cat === 'free');
      const isVisaReq = pItem?.cat === 'visa';

      const pinColor = isFreeOrId ? '#10b981' : isVisaReq ? '#ef4444' : '#3b82f6';

      // Custom crisp SVG Pin Icon
      const pinSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46" viewBox="0 0 38 46">
          <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.6"/>
          </filter>
          <path d="M19 0 C8.5 0 0 8.5 0 19 C0 33 19 46 19 46 C19 46 38 33 38 19 C38 8.5 29.5 0 19 0 Z" fill="${pinColor}" stroke="#ffffff" stroke-width="2" filter="url(#dropshadow)"/>
          <circle cx="19" cy="19" r="13" fill="#0f172a" />
          <text x="19" y="23.5" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">${index + 1}</text>
        </svg>
      `;

      const marker = new google.maps.Marker({
        position,
        map,
        title: `${index + 1}. ${getCountryName(item.stop.countryCode, language)}`,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(pinSvg)}`,
          scaledSize: new google.maps.Size(38, 46),
          anchor: new google.maps.Point(19, 46)
        },
        animation: index === 0 ? google.maps.Animation.DROP : undefined
      });

      // Marker click -> Open InfoWindow & Notify Parent
      marker.addListener('click', () => {
        if (onSelectStop) onSelectStop(item.stop.id);
        setActiveInfoWindowStopId(item.stop.id);

        const inIdx = dateToDayIndex(item.stop.entryDate);
        const outIdx = dateToDayIndex(item.stop.exitDate);
        const stayDays = Math.max(1, outIdx - inIdx + 1);

        const nextStop = index < geoStops.length - 1 ? geoStops[index + 1] : null;
        const leg = nextStop ? estimateTravelLeg(item.stop.countryCode, nextStop.stop.countryCode) : null;

        const visaLabel = getCategoryBadgeLabel(pItem, language);

        const infoContent = `
          <div style="font-family:system-ui, sans-serif; color:#f8fafc; min-width:240px; padding:12px 34px 12px 14px; line-height:1.4;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <span style="font-size:24px; line-height:1;">${getFlag(item.stop.countryCode)}</span>
              <div>
                <strong style="font-size:15px; color:#ffffff; display:block; font-weight:900;">
                  ${index + 1}. ${getCountryName(item.stop.countryCode, language)}
                </strong>
                <span style="font-size:12px; color:#94a3b8; font-weight:600;">
                  ${item.geo.capital} · ${l('Merkez:', 'Hub:', 'Knotenpunkt:')} ${item.geo.mainHub}
                </span>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); padding:8px 10px; border-radius:10px; font-size:12px; margin-bottom:8px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:#94a3b8;">${l('Kalış Süresi:', 'Stay Duration:', 'Aufenthaltsdauer:')}</span>
                <strong style="color:#2dd4bf; font-weight:800;">${stayDays} ${l('Gün', 'Days', 'Tage')} (${formatLocalizedDate(inIdx, language)} – ${formatLocalizedDate(outIdx, language)})</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:#94a3b8;">${l('Vize Statüsü:', 'Visa Status:', 'Visumstatus:')}</span>
                <strong style="color:${pinColor}; font-weight:800;">${visaLabel}</strong>
              </div>
            </div>
            ${
              leg
                ? `<div style="font-size:11px; color:#cbd5e1; border-top:1px dashed rgba(255,255,255,0.15); padding-top:6px; margin-top:6px;">
                    <span style="color:#94a3b8;">${l('Sonraki Durak', 'Next Destination', 'Nächstes Ziel')} (${getCountryName(nextStop!.stop.countryCode, language)}):</span><br/>
                    <strong style="color:#ffffff;">${leg.modeIcon} ${leg.modeLabel}</strong> · ${leg.distanceKm} km · ~${leg.estimatedTransitHours} ${l('sa intikal', 'hrs transit', 'Std. Transit')}
                   </div>`
                : `<div style="font-size:12px; color:#34d399; font-weight:700;">${l('✓ Rotanın son varış noktası', '✓ Final destination of route', '✓ Endziel der Reiseroute')}</div>`
            }
          </div>
        `;

        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(infoContent);
          infoWindowRef.current.open(map, marker);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map bounds to show all markers with nice padding
    if (geoStops.length > 1) {
      map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });
    } else if (geoStops.length === 1) {
      map.setCenter({ lat: geoStops[0].geo.lat, lng: geoStops[0].geo.lng });
      map.setZoom(5);
    }
  }, [mapsLoaded, viewMode, mapTheme, geoStops, passportItems, onSelectStop, language]);

  // Center on selected stop when selected externally
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedStopId) return;
    const target = geoStops.find(g => g.stop.id === selectedStopId);
    if (target) {
      mapInstanceRef.current.panTo({ lat: target.geo.lat, lng: target.geo.lng });
      mapInstanceRef.current.setZoom(6);
    }
  }, [selectedStopId, geoStops]);

  // If no stops are added yet
  if (stops.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base text-slate-100">
              {l('Google Maps™ & Görsel Seyahat Rota Katmanı', 'Google Maps™ Interactive Journey Layer', 'Google Maps™ Interaktive Reiseebene')}
            </h3>
          </div>
          <span className="text-xs text-teal-400/90 font-medium bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-800/50">
            {l('Google Maps API Aktif', 'Google Maps API Active', 'Google Maps API aktiv')}
          </span>
        </div>

        <div className="py-10 px-4 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-400 shadow-lg shadow-teal-500/10">
            <Navigation className="w-7 h-7 animate-pulse" />
          </div>
          <h4 className="font-bold text-sm text-slate-200">
            {l('Henüz Seyahat Rotası Eklenmedi', 'No Destinations Added to Route Yet', 'Noch keine Reiseziele zur Route hinzugefügt')}
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            {l(
              'Aşağıdaki formdan duraklar ekledikçe, Google Maps üzerinde ardışık uçuş/tren rotaları, coğrafi mesafeler, küresel kavisli çizgiler ve zaman çizelgesi anlık olarak canlanacaktır.',
              'As you add stops in the form below, sequential flight/rail lines, geodesic distances, curved arcs, and dynamic timelines will visualize live on Google Maps.',
              'Sobald Sie unten Stopps hinzufügen, werden Flug-/Bahnrouten, Entfernungen und Zeitachsen live auf Google Maps visualisiert.'
            )}
          </p>
          {onLoadPreset && (
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => onLoadPreset(0)}
                className="px-3.5 py-1.5 rounded-xl bg-teal-600/80 hover:bg-teal-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {l('Örnek Balkan Rotasını Göster', 'Load Balkans Tour', 'Balkan-Tour laden')}
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset(3)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {l('G.Doğu Asya Nomad Rotası', 'SE Asia Nomad Route', 'Südostasien Nomad-Route')}
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset(2)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                {l('Akdeniz Rotasını Göster', 'Mediterranean Route', 'Mittelmeer-Route')}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Helper to re-center Google Maps to fit all current stops
  const handleFitAllStops = () => {
    if (!mapInstanceRef.current || geoStops.length === 0) return;
    const bounds = new google.maps.LatLngBounds();
    geoStops.forEach(g => bounds.extend({ lat: g.geo.lat, lng: g.geo.lng }));
    mapInstanceRef.current.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-md text-white overflow-hidden space-y-4 animate-in fade-in duration-300">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              {l('Etkileşimli Rota & Mesafe Haritası', 'Interactive Route & Distance Map', 'Interaktive Routen- & Entfernungsübersicht')}
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-md bg-teal-950 text-teal-300 border border-teal-800/60">
                Google Maps™
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {l(
              'Seçilen duraklar arası ardışık uçuş/ulaşım çizgisi, coğrafi mesafeler ve vize durumları',
              'Sequential flight & overland paths between destinations, geodesic distances and visa statuses',
              'Sequenzielle Flug- & Landrouten, geografische Entfernungen und Visabestimmungen'
            )}
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('google-map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'google-map'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.googleMapView}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('schematic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'schematic'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.schematicRadarView}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>{t.timelineView}</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 text-xs">
            <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700">
              <span className="font-mono font-bold text-teal-400 text-xs">
                {totalKm.toLocaleString(language === 'de' ? 'de-DE' : language === 'en' ? 'en-US' : 'tr-TR')} {t.distanceKm}
              </span>
            </div>
            <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700">
              <span className="font-mono font-bold text-emerald-400 text-xs">
                ~{totalHours} {t.hours}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. GOOGLE MAPS INTERACTIVE VIEW */}
      {viewMode === 'google-map' && (
        <div className="space-y-3">
          {/* Map Toolbar (Theme Switchers & Fit Button) */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-950/60 p-2 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">
                {l('Katman:', 'Layer:', 'Ebene:')}
              </span>
              <button
                type="button"
                onClick={() => setMapTheme('dark')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  mapTheme === 'dark'
                    ? 'bg-slate-800 text-teal-300 border border-teal-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🌙 {t.mapDarkTheme}
              </button>
              <button
                type="button"
                onClick={() => setMapTheme('hybrid')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  mapTheme === 'hybrid'
                    ? 'bg-slate-800 text-teal-300 border border-teal-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🛰️ {t.mapSatelliteHybrid}
              </button>
              <button
                type="button"
                onClick={() => setMapTheme('roadmap')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  mapTheme === 'roadmap'
                    ? 'bg-slate-800 text-teal-300 border border-teal-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🗺️ {t.mapRoadmap}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFitAllStops}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-900/40 hover:bg-teal-900/60 text-teal-300 border border-teal-700/50 text-xs font-semibold cursor-pointer transition-all"
              >
                <Maximize2 className="w-3 h-3" />
                <span>{t.fitRouteBounds}</span>
              </button>
              <span className="text-[10px] text-slate-500">
                {stops.length} {t.stopsCount} · {legs.length} {t.directLegs}
              </span>
            </div>
          </div>

          {/* Map Canvas Container */}
          <div className="relative w-full h-[400px] sm:h-[460px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Loading / Error Overlay */}
            {!mapsLoaded && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-slate-300 font-medium">
                  {l('Google Maps™ Haritası Yükleniyor...', 'Loading Google Maps™ Canvas...', 'Google Maps™-Karte wird geladen...')}
                </p>
                {mapsError && (
                  <p className="text-[11px] text-amber-400 max-w-sm">
                    {mapsError}
                  </p>
                )}
              </div>
            )}

            {/* Floating Quick Distance Strip at bottom of map */}
            {legs.length > 0 && (
              <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                <div className="flex items-center gap-2 overflow-x-auto py-1 px-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-lg text-[11px] pointer-events-auto max-w-full">
                  <span className="text-slate-400 font-bold whitespace-nowrap flex items-center gap-1 text-[10px] uppercase tracking-wider pl-1">
                    <Plane className="w-3 h-3 text-teal-400" /> {l('Bacaklar:', 'Legs:', 'Etappen:')}
                  </span>
                  {legs.map((leg, idx) => (
                    <div
                      key={`leg-badge-${idx}`}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 whitespace-nowrap text-xs"
                    >
                      <span className="font-bold text-slate-300">
                        {idx + 1}→{idx + 2}
                      </span>
                      <span>{leg.modeIcon}</span>
                      <span className="font-mono text-teal-300 font-semibold">{leg.distanceKm} km</span>
                      <span className="text-slate-400 text-[10px]">(~{leg.estimatedTransitHours}{l('s', 'h', 'h')})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SCHEMATIC RADAR VECTOR VIEW */}
      {viewMode === 'schematic' && (
        <div className="space-y-3">
          <div className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] bg-slate-950/70 rounded-2xl border border-slate-800/90 overflow-hidden flex items-center justify-center">
            {/* Background radar grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            <svg viewBox={viewBox} className="w-full h-full select-none">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>

                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connected Leg Curves */}
              {projectedPoints.map((pt, idx) => {
                if (idx === projectedPoints.length - 1) return null;
                const nextPt = projectedPoints[idx + 1];
                const p1 = pt.point;
                const p2 = nextPt.point;

                // Curved quadratic control point (arc)
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const cx = (p1.x + p2.x) / 2 - dy * 0.16;
                const cy = (p1.y + p2.y) / 2 + dx * 0.16;

                const pathD = `M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`;
                const leg = legs[idx];

                return (
                  <g key={`leg-${idx}`}>
                    {/* Outer glow line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#0f766e"
                      strokeWidth="6"
                      opacity="0.3"
                    />
                    {/* Animated dash line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="url(#routeGradient)"
                      strokeWidth="2.5"
                      strokeDasharray="6,4"
                      className="animate-pulse"
                    />

                    {/* Midpoint badge for Transport Mode */}
                    {leg && (
                      <g transform={`translate(${cx}, ${cy})`}>
                        <rect
                          x="-38"
                          y="-12"
                          width="76"
                          height="24"
                          rx="12"
                          fill="#0f172a"
                          stroke="#334155"
                          strokeWidth="1.2"
                        />
                        <text
                          x="0"
                          y="4"
                          fill="#cbd5e1"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {leg.modeIcon} {leg.distanceKm} km
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Destination Nodes */}
              {projectedPoints.map((pt, idx) => {
                const isSelected = activeStop?.id === pt.stop.id;
                const pItem = passportItems.get(pt.stop.countryCode);
                const isFreeOrId = pItem && (pItem.id || pItem.cat === 'free');

                return (
                  <g
                    key={pt.stop.id}
                    transform={`translate(${pt.point.x}, ${pt.point.y})`}
                    onClick={() => onSelectStop && onSelectStop(pt.stop.id)}
                    onMouseEnter={() => setHoveredStopId(pt.stop.id)}
                    onMouseLeave={() => setHoveredStopId(null)}
                    className="cursor-pointer group"
                  >
                    {/* Outer pulse circle when selected */}
                    {isSelected && (
                      <circle
                        r="24"
                        fill="none"
                        stroke="#14b8a6"
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="animate-ping"
                      />
                    )}

                    {/* Core node ring */}
                    <circle
                      r={isSelected ? '20' : '15'}
                      fill={isSelected ? '#0f766e' : '#1e293b'}
                      stroke={isFreeOrId ? '#10b981' : pItem?.cat === 'visa' ? '#ef4444' : '#3b82f6'}
                      strokeWidth={isSelected ? '3.5' : '2'}
                      filter={isSelected ? 'url(#glow)' : undefined}
                      className="transition-all duration-200 group-hover:scale-115"
                    />

                    {/* Sequential step index */}
                    <text
                      x="0"
                      y="4"
                      fill="#ffffff"
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight="900"
                      textAnchor="middle"
                    >
                      {idx + 1}
                    </text>

                    {/* Destination Pill below */}
                    <g transform="translate(0, 26)">
                      <rect
                        x="-48"
                        y="-10"
                        width="96"
                        height="20"
                        rx="7"
                        fill="#0f172a"
                        fillOpacity="0.9"
                        stroke={isSelected ? '#14b8a6' : '#334155'}
                        strokeWidth={isSelected ? '1.5' : '0.8'}
                      />
                      <text
                        x="0"
                        y="4"
                        fill={isSelected ? '#5eead4' : '#f1f5f9'}
                        fontSize="9.5"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {getFlag(pt.stop.countryCode)} {getCountryName(pt.stop.countryCode, language).slice(0, 11)}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* 3. SIMPLE LINE-CONNECTED TIMELINE VIEW */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <GitCommit className="w-4 h-4" /> {l('Çizgili İlerleme Zaman Çizelgesi', 'Linear Progress Timeline', 'Fortlaufender Zeitstrahl')}
              </span>
              <span>{stops.length} {l('Ardışık Durak', 'Sequential Stops', 'Fortlaufende Stopps')}</span>
            </div>

            {/* Linear Connected Sequence Pipeline */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-teal-500 before:via-emerald-500 before:to-blue-500">
              {stops.map((stop, idx) => {
                const inIdx = dateToDayIndex(stop.entryDate);
                const outIdx = dateToDayIndex(stop.exitDate);
                const stayDays = Math.max(1, outIdx - inIdx + 1);
                const pItem = passportItems.get(stop.countryCode);
                const geo = getCountryGeo(stop.countryCode);
                const isSelected = activeStop?.id === stop.id;
                const isFreeOrId = pItem && (pItem.id || pItem.cat === 'free');

                const nextStop = idx < stops.length - 1 ? stops[idx + 1] : null;
                const leg = nextStop ? estimateTravelLeg(stop.countryCode, nextStop.countryCode) : null;

                return (
                  <div key={stop.id} className="relative space-y-3">
                    {/* Node Dot on the vertical line */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black border-2 transition-all ${
                        isSelected
                          ? 'bg-teal-500 border-white text-slate-950 scale-110 shadow-md shadow-teal-500/40'
                          : isFreeOrId
                          ? 'bg-emerald-600 border-slate-900 text-white'
                          : pItem?.cat === 'visa'
                          ? 'bg-rose-600 border-slate-900 text-white'
                          : 'bg-blue-600 border-slate-900 text-white'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    {/* Step Card */}
                    <div
                      onClick={() => onSelectStop && onSelectStop(stop.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800/90 border-teal-500 shadow-md shadow-teal-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl leading-none">{getFlag(stop.countryCode)}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-100">
                                {idx + 1}. {l('Durak', 'Stop', 'Stopp')}: {getCountryName(stop.countryCode, language)}
                              </h4>
                              <span className="text-[11px] font-mono text-slate-400">
                                ({geo.capital})
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-slate-500" />
                                {formatLocalizedDate(inIdx, language)} – {formatLocalizedDate(outIdx, language)}
                              </span>
                              <span>·</span>
                              <span className="font-bold text-teal-400">
                                {stayDays} {l('gün kalış', 'days stay', 'Tage Aufenthalt')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {pItem && (
                          <div className="flex items-center gap-2 self-start sm:self-center">
                            <span
                              className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${
                                pItem.id ? CAT_INFO.id.badgeBg : CAT_INFO[pItem.cat]?.badgeBg
                              }`}
                            >
                              {getCategoryBadgeLabel(pItem, language)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connecting Transport Pip to Next Destination */}
                    {leg && (
                      <div className="pt-1 pb-1 pl-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px]">
                          <span>{leg.modeIcon}</span>
                          <span className="font-semibold">{leg.modeLabel}</span>
                          <span className="text-slate-500">|</span>
                          <span className="font-mono text-teal-400">{leg.distanceKm} km</span>
                          <span className="text-slate-500">|</span>
                          <span className="text-slate-400">
                            ~{leg.estimatedTransitHours} {l('sa intikal', 'hrs transit', 'Std. Transit')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Selected Node Quick Inspection Card */}
      {activeStop && activeGeo && (
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none">{getFlag(activeStop.countryCode)}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-200">
                  {activeStopIndex + 1}. {l('Durak', 'Stop', 'Stopp')}: {getCountryName(activeStop.countryCode, language)}
                </span>
                <span className="text-[11px] text-teal-400 font-mono">
                  {activeGeo.capital} ({activeGeo.mainHub})
                </span>
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                {l('Tarih:', 'Dates:', 'Termine:')}{' '}
                {formatLocalizedDate(dateToDayIndex(activeStop.entryDate), language)} -{' '}
                {formatLocalizedDate(dateToDayIndex(activeStop.exitDate), language)} (
                {dateToDayIndex(activeStop.exitDate) - dateToDayIndex(activeStop.entryDate) + 1}{' '}
                {l('Gün', 'Days', 'Tage')})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-right">
            {activeStopIndex < stops.length - 1 ? (
              <div className="text-xs text-slate-300">
                <span className="text-slate-500 block text-[10px]">{l('Sonraki Durak', 'Next Stop', 'Nächster Stopp')}</span>
                <span className="font-bold text-teal-400 flex items-center gap-1 justify-end">
                  {getCountryName(stops[activeStopIndex + 1].countryCode, language)} <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ) : (
              <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> {l('Rotanın Son Durağı', 'Final Stop of Route', 'Letzter Stopp der Route')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
