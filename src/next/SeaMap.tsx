import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps, isGoogleMapsAuthFailed } from '../utils/googleMapsLoader';
import { WORLD_DOTS, WORLD_W, WORLD_H, project } from './worldDots';

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  color?: string;
  title?: string;
  label?: string;
  /** haritada noktanın yanında yazan kısa metin (ör. "Tokyo 10:52") */
  tag?: string;
  big?: boolean;
  onClick?: () => void;
}

interface Props {
  points: MapPoint[];
  path?: { lat: number; lng: number }[];
  height?: number;
  zoom?: number; // tek nokta için
  ariaLabel: string;
}

/* Deniz temalı Google Haritalar stili (açık ve koyu) */
const LIGHT = [
  { elementType: 'geometry', stylers: [{ color: '#F7F3EC' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#5A6A72' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#F7F3EC' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#BFE8F2' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#0B7287' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#C9BFAF' }] },
  { featureType: 'road', stylers: [{ visibility: 'simplified' }, { color: '#EDE5D8' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#F1EBDF' }] }
];
const DARK = [
  { elementType: 'geometry', stylers: [{ color: '#28262C' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#BDB5AC' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1E1C21' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#2B5E6C' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#8ED8E6' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#57525B' }] },
  { featureType: 'road', stylers: [{ visibility: 'simplified' }, { color: '#34313A' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] }
];

const isDark = () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

/**
 * Önce Google Haritalar (deniz temalı), anahtar çalışmazsa ya da ağ yoksa
 * kendi nokta dünya haritamız. İkisi de aynı noktaları ve rotayı çizer.
 */
export const SeaMap: React.FC<Props> = ({ points, path, height = 360, zoom = 5, ariaLabel }) => {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const layers = useRef<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [mode, setMode] = useState<'loading' | 'google' | 'dots'>('loading');

  useEffect(() => {
    let alive = true;
    if (isGoogleMapsAuthFailed()) {
      setMode('dots');
      return;
    }
    const t = window.setTimeout(() => alive && mode === 'loading' && setMode('dots'), 6000);
    loadGoogleMaps()
      .then(() => {
        if (!alive || !el.current) return;
        const g = (window as any).google; // eslint-disable-line @typescript-eslint/no-explicit-any
        mapRef.current = new g.maps.Map(el.current, {
          center: { lat: 25, lng: 20 },
          zoom: 2,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
          styles: isDark() ? DARK : LIGHT,
          backgroundColor: isDark() ? '#2B5E6C' : '#BFE8F2'
        });
        setMode('google');
      })
      .catch(() => alive && setMode('dots'));
    const onFail = () => setMode('dots');
    window.addEventListener('vizamigo:gmaps-auth-failure', onFail);
    return () => {
      alive = false;
      window.clearTimeout(t);
      window.removeEventListener('vizamigo:gmaps-auth-failure', onFail);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // tema değişince harita stili
  useEffect(() => {
    if (mode !== 'google') return;
    const obs = new MutationObserver(() => mapRef.current?.setOptions({ styles: isDark() ? DARK : LIGHT }));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, [mode]);

  // noktaları ve rotayı çiz
  useEffect(() => {
    if (mode !== 'google' || !mapRef.current) return;
    const g = (window as any).google; // eslint-disable-line @typescript-eslint/no-explicit-any
    layers.current.forEach((x) => x.setMap(null));
    layers.current = [];
    const bounds = new g.maps.LatLngBounds();
    points.forEach((pt) => {
      const m = new g.maps.Marker({
        position: { lat: pt.lat, lng: pt.lng },
        map: mapRef.current,
        title: pt.title,
        label: pt.label
          ? { text: pt.label, color: '#FFFFFF', fontSize: '11px', fontWeight: '800' }
          : pt.tag
            ? { text: pt.tag, color: isDark() ? '#FFF7EF' : '#12313E', fontSize: '12px', fontWeight: '700', className: 'vz-gm-tag' }
            : undefined,
        icon: {
          path: g.maps.SymbolPath.CIRCLE,
          scale: pt.big || pt.label ? 9 : 6,
          fillColor: pt.color || '#0B7287',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          labelOrigin: pt.tag && !pt.label ? new g.maps.Point(0, -2.6) : undefined
        }
      });
      if (pt.onClick) m.addListener('click', pt.onClick);
      layers.current.push(m);
      bounds.extend({ lat: pt.lat, lng: pt.lng });
    });
    if (path && path.length > 1) {
      const line = new g.maps.Polyline({
        path,
        geodesic: true,
        map: mapRef.current,
        strokeOpacity: 0,
        icons: [{ icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, strokeColor: '#1095AE', scale: 3 }, offset: '0', repeat: '14px' }]
      });
      layers.current.push(line);
    }
    if (points.length === 1) {
      mapRef.current.setCenter({ lat: points[0].lat, lng: points[0].lng });
      mapRef.current.setZoom(zoom);
    } else if (points.length > 1) {
      mapRef.current.fitBounds(bounds, 40);
      if (points.length > 60) mapRef.current.setZoom(2);
    }
  }, [mode, points, path, zoom]);

  return (
    <div className={`vz-mapbox vz-seamap${mode === 'dots' ? ' dots' : ''}`} style={mode === 'dots' ? undefined : { height }}>
      <div ref={el} className="vz-seamap-g" style={{ display: mode === 'dots' ? 'none' : 'block' }} role="img" aria-label={ariaLabel} />
      {mode === 'dots' && <DotMap points={points} path={path} ariaLabel={ariaLabel} />}
    </div>
  );
};

/** Ağsız / anahtarsız yedek: nokta dünya haritası, noktalar tıklanabilir. */
const DotMap: React.FC<{ points: MapPoint[]; path?: { lat: number; lng: number }[]; ariaLabel: string }> = ({ points, path, ariaLabel }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cw, setCw] = useState(800);
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCw(el.clientWidth || 800));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pts = points.map((p) => ({ p, xy: project(p.lng, p.lat) }));
  let vb = `0 0 ${WORLD_W} ${WORLD_H}`;
  if (points.length && points.length < 40) {
    const xs = pts.map((x) => x.xy[0]);
    const ys = pts.map((x) => x.xy[1]);
    const pad = 50;
    let x0 = Math.max(0, Math.min(...xs) - pad), x1 = Math.min(WORLD_W, Math.max(...xs) + pad);
    let y0 = Math.max(0, Math.min(...ys) - pad), y1 = Math.min(WORLD_H, Math.max(...ys) + pad);
    if (x1 - x0 < 260) { const c = (x0 + x1) / 2; x0 = Math.max(0, c - 130); x1 = Math.min(WORLD_W, x0 + 260); }
    const needH = (x1 - x0) * 0.56;
    if (y1 - y0 < needH) { const c = (y0 + y1) / 2; y0 = Math.max(0, c - needH / 2); y1 = Math.min(WORLD_H, y0 + needH); }
    vb = `${x0} ${y0} ${x1 - x0} ${y1 - y0}`;
  }
  const vbW = Number(vb.split(' ')[2]);
  const k = vbW / WORLD_W;
  const u = vbW / cw; // 1 ekran pikseli kaç harita birimi
  const many = points.length > 40;
  const line = path && path.length > 1 ? path.map((q, i) => { const [x, y] = project(q.lng, q.lat); return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ') : '';
  return (
    <svg ref={svgRef} viewBox={vb} preserveAspectRatio="xMidYMid meet" role="img" aria-label={ariaLabel} style={{ width: '100%', height: '100%', display: 'block' }}>
      <path d={WORLD_DOTS} className="vz-map-dots" strokeWidth={Math.max(2.4 * k, 2.2 * u)} />
      {line && <path d={line} className="vz-map-route" strokeWidth={Math.max(2 * k, 0.8)} strokeDasharray={`${5 * k} ${4 * k}`} />}
      {pts.map(({ p, xy }) => (
        <g key={p.id} className={p.onClick ? 'vz-map-hit' : undefined} onClick={p.onClick}>
          {p.title && <title>{p.title}</title>}
          {p.onClick && <circle cx={xy[0]} cy={xy[1]} r={14 * u} fill="transparent" />}
          <circle cx={xy[0]} cy={xy[1]} r={(p.label ? 11 : p.big ? 7 : many ? 4 : 5.5) * u} fill={p.color || 'var(--rd-sea-ink)'} stroke="var(--rd-surface)" strokeWidth={1.5 * u} />
          {p.label && <text x={xy[0]} y={xy[1]} dy="0.35em" textAnchor="middle" fontSize={11 * u} fontWeight={800} fill="#FFFFFF">{p.label}</text>}
          {p.tag && !p.label && <text x={xy[0]} y={xy[1] - 11 * u} textAnchor="middle" fontSize={12 * u} fontWeight={700} className="vz-map-tag" strokeWidth={3 * u}>{p.tag}</text>}
        </g>
      ))}
    </svg>
  );
};
