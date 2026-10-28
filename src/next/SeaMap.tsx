import React, { useEffect, useMemo, useRef, useState } from 'react';
import { loadGoogleMaps, isGoogleMapsAuthFailed } from '../utils/googleMapsLoader';
import { WORLD_DOTS, WORLD_W, WORLD_H, project } from './worldDots';
import { Icon } from './Icon';

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  color?: string;
  title?: string;
  /** noktanın içine yazılan kısa metin (ör. durak numarası) */
  label?: string;
  /** noktanın üstünde yazan kısa metin (ör. "Tokyo 10:52") */
  tag?: string;
  big?: boolean;
  onClick?: () => void;
}

export type MapStyle = 'sea' | 'road' | 'satellite';

interface Props {
  points: MapPoint[];
  path?: { lat: number; lng: number }[];
  /** yol çizgisinde yön okları */
  arrows?: boolean;
  height?: number;
  /** tek nokta varken yakınlık */
  zoom?: number;
  ariaLabel: string;
  styleMode?: MapStyle;
  labels?: boolean;
  selectedId?: string | null;
  /** değişince harita noktalara yeniden sığdırılır (varsayılan: nokta listesi) */
  fitKey?: string;
  /** değişince haritayı bu noktaya uçurur */
  focus?: { lat: number; lng: number; zoom: number; key: string } | null;
  /** her zaman nokta haritasını kullan */
  forceDots?: boolean;
  /** yedek haritada kaydırma/yakınlaştırma */
  interactive?: boolean;
}

/* Deniz temalı Google Haritalar stili (açık ve koyu) */
const LIGHT = [
  { elementType: 'geometry', stylers: [{ color: '#F7F3EC' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#5A6A72' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#F7F3EC' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#BFE8F2' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#0B7287' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#B9AE9C' }] },
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
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#6A6470' }] },
  { featureType: 'road', stylers: [{ visibility: 'simplified' }, { color: '#34313A' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] }
];
const NO_LABELS = [{ elementType: 'labels', stylers: [{ visibility: 'off' }] }];

const isDark = () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Önce Google Haritalar (deniz temalı), anahtar çalışmazsa ya da ağ yoksa
 * kendi nokta dünya haritamız. İkisi de aynı noktaları ve rotayı çizer.
 */
export const SeaMap: React.FC<Props> = ({
  points,
  path,
  arrows,
  height = 360,
  zoom = 5,
  ariaLabel,
  styleMode = 'sea',
  labels = true,
  selectedId = null,
  fitKey,
  focus = null,
  forceDots,
  interactive = true
}) => {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markers = useRef<Map<string, any>>(new Map());
  const lineRef = useRef<any>(null);
  const [mode, setMode] = useState<'loading' | 'google' | 'dots'>(forceDots ? 'dots' : 'loading');
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    if (forceDots) return;
    let alive = true;
    if (isGoogleMapsAuthFailed()) {
      setMode('dots');
      return;
    }
    const t = window.setTimeout(() => alive && modeRef.current === 'loading' && setMode('dots'), 7000);
    loadGoogleMaps()
      .then(() => {
        if (!alive || !el.current) return;
        const g = (window as any).google;
        mapRef.current = new g.maps.Map(el.current, {
          center: { lat: 25, lng: 20 },
          zoom: 2,
          minZoom: 2,
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
          gestureHandling: 'cooperative',
          clickableIcons: false,
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
  }, [forceDots]);

  // stil, etiketler ve tema
  useEffect(() => {
    if (mode !== 'google' || !mapRef.current) return;
    const apply = () => {
      const base = styleMode === 'sea' ? (isDark() ? DARK : LIGHT) : [];
      mapRef.current.setOptions({
        mapTypeId: styleMode === 'satellite' ? 'hybrid' : 'roadmap',
        styles: labels ? base : [...base, ...NO_LABELS]
      });
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, [mode, styleMode, labels]);

  // noktalar: yerinde güncelle (her yenilemede yeniden yaratma)
  useEffect(() => {
    if (mode !== 'google' || !mapRef.current) return;
    const g = (window as any).google;
    const seen = new Set<string>();
    points.forEach((pt) => {
      seen.add(pt.id);
      const sel = pt.id === selectedId;
      const icon = {
        path: g.maps.SymbolPath.CIRCLE,
        scale: sel ? 11 : pt.big || pt.label ? 9 : 6,
        fillColor: pt.color || '#0B7287',
        fillOpacity: 1,
        strokeColor: sel ? '#12313E' : '#FFFFFF',
        strokeWeight: sel ? 3 : 2,
        labelOrigin: pt.tag && !pt.label ? new g.maps.Point(0, -2.6) : undefined
      };
      const label = pt.label
        ? { text: pt.label, color: '#FFFFFF', fontSize: '11px', fontWeight: '800' }
        : pt.tag
          ? { text: pt.tag, color: isDark() || styleMode === 'satellite' ? '#FFF7EF' : '#12313E', fontSize: '12px', fontWeight: '700', className: 'vz-gm-tag' }
          : undefined;
      let m = markers.current.get(pt.id);
      if (!m) {
        m = new g.maps.Marker({ position: { lat: pt.lat, lng: pt.lng }, map: mapRef.current, title: pt.title, optimized: true });
        markers.current.set(pt.id, m);
      } else {
        m.setPosition({ lat: pt.lat, lng: pt.lng });
        m.setTitle(pt.title || '');
      }
      m.setIcon(icon);
      m.setLabel(label || null);
      m.setZIndex(sel ? 999 : pt.big ? 50 : 10);
      g.maps.event.clearListeners(m, 'click');
      if (pt.onClick) m.addListener('click', pt.onClick);
    });
    markers.current.forEach((m, id) => {
      if (!seen.has(id)) {
        m.setMap(null);
        markers.current.delete(id);
      }
    });
    lineRef.current?.setMap(null);
    lineRef.current = null;
    if (path && path.length > 1) {
      lineRef.current = new g.maps.Polyline({
        path,
        geodesic: true,
        map: mapRef.current,
        strokeColor: '#1095AE',
        strokeOpacity: arrows ? 0.9 : 0,
        strokeWeight: 3,
        icons: arrows
          ? [{ icon: { path: g.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 3, strokeColor: '#0B7287', fillColor: '#0B7287', fillOpacity: 1 }, offset: '50%', repeat: '120px' }]
          : [{ icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, strokeColor: '#1095AE', scale: 3 }, offset: '0', repeat: '14px' }]
      });
    }
  }, [mode, points, path, selectedId, styleMode, arrows]);

  // sığdırma: yalnızca nokta seti (ya da fitKey) değişince
  const autoKey = fitKey ?? points.map((p) => p.id).join('|');
  useEffect(() => {
    if (mode !== 'google' || !mapRef.current || !points.length) return;
    const g = (window as any).google;
    if (points.length === 1 && !(path && path.length > 1)) {
      mapRef.current.setCenter({ lat: points[0].lat, lng: points[0].lng });
      mapRef.current.setZoom(zoom);
      return;
    }
    const b = new g.maps.LatLngBounds();
    points.forEach((p) => b.extend({ lat: p.lat, lng: p.lng }));
    (path || []).forEach((p) => b.extend(p));
    mapRef.current.fitBounds(b, 36);
  }, [mode, autoKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mode !== 'google' || !mapRef.current || !focus) return;
    mapRef.current.panTo({ lat: focus.lat, lng: focus.lng });
    mapRef.current.setZoom(focus.zoom);
  }, [mode, focus?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`vz-mapbox vz-seamap${mode === 'dots' ? ' dots' : ''}`} style={{ height }}>
      <div ref={el} className="vz-seamap-g" style={{ display: mode === 'dots' ? 'none' : 'block' }} role="region" aria-label={ariaLabel} />
      {mode === 'loading' && <div className="vz-seamap-load" aria-hidden="true" />}
      {mode === 'dots' && <DotMap points={points} path={path} ariaLabel={ariaLabel} selectedId={selectedId} focus={focus} fitKey={autoKey} interactive={interactive} />}
    </div>
  );
};
/* eslint-enable @typescript-eslint/no-explicit-any */

type VB = { x: number; y: number; w: number; h: number };

/** Ağsız / anahtarsız yedek: nokta dünya haritası. Sürüklenir, yakınlaşır, noktalar tıklanır. */
const DotMap: React.FC<{
  points: MapPoint[];
  path?: { lat: number; lng: number }[];
  ariaLabel: string;
  selectedId?: string | null;
  focus?: { lat: number; lng: number; zoom: number; key: string } | null;
  fitKey: string;
  interactive: boolean;
}> = ({ points, path, ariaLabel, selectedId, focus, fitKey, interactive }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 800, h: 360 });
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth || 800, h: el.clientHeight || 360 }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const ratio = size.h / Math.max(1, size.w);

  // noktalara sığan görünüm
  const fit = useMemo<VB>(() => {
    const pts = [...points.map((p) => project(p.lng, p.lat)), ...(path || []).map((p) => project(p.lng, p.lat))];
    let x0 = 0, x1 = WORLD_W, y0 = 0, y1 = WORLD_H;
    if (pts.length) {
      const xs = pts.map((p) => p[0]);
      const ys = pts.map((p) => p[1]);
      const pad = pts.length === 1 ? 160 : 60;
      x0 = Math.min(...xs) - pad; x1 = Math.max(...xs) + pad;
      y0 = Math.min(...ys) - pad; y1 = Math.max(...ys) + pad;
    }
    let w = Math.max(x1 - x0, 220), h = Math.max(y1 - y0, 120);
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    if (h / w < ratio) h = w * ratio; else w = h / ratio;
    return { x: cx - w / 2, y: cy - h / 2, w, h };
  }, [fitKey, ratio]); // eslint-disable-line react-hooks/exhaustive-deps
  const [vb, setVb] = useState<VB>(fit);
  useEffect(() => setVb(fit), [fit]);
  useEffect(() => {
    if (!focus) return;
    const [fx, fy] = project(focus.lng, focus.lat);
    const w = Math.max(160, WORLD_W / Math.pow(2, Math.max(0, focus.zoom - 2)));
    const h = w * ratio;
    setVb({ x: fx - w / 2, y: fy - h / 2, w, h });
  }, [focus?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const u = vb.w / size.w; // 1 ekran pikseli kaç harita birimi
  const zoomBy = (f: number, cx = vb.x + vb.w / 2, cy = vb.y + vb.h / 2) => {
    const w = Math.min(WORLD_W * 1.6, Math.max(60, vb.w * f));
    const h = w * ratio;
    setVb({ x: cx - (cx - vb.x) * (w / vb.w), y: cy - (cy - vb.y) * (h / vb.h), w, h });
  };
  const drag = useRef<{ x: number; y: number; vb: VB; moved: boolean } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    drag.current = { x: e.clientX, y: e.clientY, vb, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.x) * u, dy = (e.clientY - d.y) * u;
    if (Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 4) d.moved = true;
    if (d.moved) setVb({ ...d.vb, x: d.vb.x - dx, y: d.vb.y - dy });
  };
  const onUp = () => {
    setTimeout(() => (drag.current = null), 0);
  };
  useEffect(() => {
    const el = svgRef.current;
    if (!el || !interactive) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey && Math.abs(e.deltaY) < 30) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      setVb((v) => {
        const cx = v.x + ((e.clientX - r.left) / r.width) * v.w;
        const cy = v.y + ((e.clientY - r.top) / r.height) * v.h;
        const f = e.deltaY > 0 ? 1.2 : 1 / 1.2;
        const w = Math.min(WORLD_W * 1.6, Math.max(60, v.w * f));
        const h = w * (v.h / v.w);
        return { x: cx - (cx - v.x) * (w / v.w), y: cy - (cy - v.y) * (h / v.h), w, h };
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [interactive]);

  const pts = points.map((p) => ({ p, xy: project(p.lng, p.lat) }));
  const showTags = points.length <= 24 || vb.w < 420;
  const line = path && path.length > 1 ? path.map((q, i) => { const [x, y] = project(q.lng, q.lat); return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ') : '';
  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={ariaLabel}
        className={interactive ? 'vz-dotmap grab' : 'vz-dotmap'}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        <path d={WORLD_DOTS} className="vz-map-dots" strokeWidth={Math.max(2.6, 2.2 * u)} />
        {line && <path d={line} className="vz-map-route" strokeWidth={2.2 * u} strokeDasharray={`${6 * u} ${5 * u}`} />}
        {pts.map(({ p, xy }) => {
          const sel = p.id === selectedId;
          const r = (sel ? 9 : p.label ? 11 : p.big ? 7 : points.length > 40 ? 4.5 : 6) * u;
          return (
            <g
              key={p.id}
              className={p.onClick ? 'vz-map-hit' : undefined}
              onClick={() => {
                if (drag.current?.moved) return;
                p.onClick?.();
              }}
            >
              {p.title && <title>{p.title}</title>}
              {p.onClick && <circle cx={xy[0]} cy={xy[1]} r={14 * u} fill="transparent" />}
              {sel && <circle cx={xy[0]} cy={xy[1]} r={r * 2} className="vz-map-pulse" />}
              <circle cx={xy[0]} cy={xy[1]} r={r} fill={p.color || 'var(--rd-sea-ink)'} stroke={sel ? 'var(--rd-fg)' : 'var(--rd-surface)'} strokeWidth={(sel ? 2.5 : 1.5) * u} />
              {p.label && <text x={xy[0]} y={xy[1]} dy="0.35em" textAnchor="middle" fontSize={11 * u} fontWeight={800} fill="#FFFFFF">{p.label}</text>}
              {(p.tag || (sel && p.title)) && !p.label && (showTags || sel) && (
                <text x={xy[0]} y={xy[1] - r - 5 * u} textAnchor="middle" fontSize={12 * u} fontWeight={700} className="vz-map-tag" strokeWidth={3 * u}>{p.tag || p.title}</text>
              )}
            </g>
          );
        })}
      </svg>
      {interactive && (
        <div className="vz-map-ctrl">
          <button type="button" onClick={() => zoomBy(1 / 1.5)} aria-label="Yakınlaştır / Zoom in"><Icon name="plus" size={16} duo={false} /></button>
          <button type="button" onClick={() => zoomBy(1.5)} aria-label="Uzaklaştır / Zoom out"><span aria-hidden="true" style={{ fontSize: 20, lineHeight: 1 }}>−</span></button>
          <button type="button" onClick={() => setVb(fit)} aria-label="Sığdır / Fit"><Icon name="globe" size={16} duo={false} /></button>
        </div>
      )}
    </>
  );
};
