import React from 'react';

/**
 * Gerçekçi 3D simge + üstünde canlı değer (saat, sıcaklık, kur, tarih, giriş kuralı).
 * Görseldeki boş ekranın yeri yüzde olarak tutulur; değer o ekrana yazılır.
 */
type Kind = 'clock' | 'weather' | 'fx' | 'cal' | 'entry';
const SCREEN: Record<Kind, [number, number, number, number]> = {
  clock: [19.8, 31.5, 60.1, 35.6],
  weather: [16.8, 24.4, 66.5, 51.4],
  fx: [16.0, 14.7, 67.8, 37.6],
  cal: [18.9, 25.6, 62.1, 50.1],
  entry: [29.6, 15.6, 37.0, 53.9]
};

export const LiveIcon: React.FC<{ kind: Kind; size?: number; value?: React.ReactNode; sub?: React.ReactNode; tone?: 'ok' | 'warn' | 'bad' }> = ({ kind, size = 84, value, sub, tone }) => {
  const [x, y, w, h] = SCREEN[kind];
  const b = `/images/icons/live-${kind}`;
  return (
    <span className={`vz-l3d vz-l3d-${kind}${tone ? ` t-${tone}` : ''}`} style={{ width: size, height: size }} aria-hidden="true">
      <img src={`${b}-128.webp`} srcSet={`${b}-128.webp 1x, ${b}-256.webp 2x`} width={size} height={size} alt="" decoding="async" />
      {value !== undefined && value !== null && value !== '' && (
        <span className="vz-l3d-scr" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}>
          {sub && <small>{sub}</small>}
          <b>{value}</b>
        </span>
      )}
    </span>
  );
};
