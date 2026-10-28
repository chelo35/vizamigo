import React, { useId } from 'react';
import { Icon } from './Icon';

/**
 * Kutucuk simgeleri: renkli, hafif hacimli (gradyan + ışık + gölge) SVG çizimler.
 * Görsel dosya indirmez; her biri birkaç yüz bayt, her ekranda net.
 * Çizimi olmayan simgeler aynı renkli zeminde çizgi simgeyle gösterilir.
 */

type Pal = [string, string]; // zemin gradyanı (açık, koyu)
const PAL: Record<string, Pal> = {
  pin: ['#FF8A7A', '#E8505B'],
  globe: ['#5CC8F0', '#2B7BD8'],
  scale: ['#B79CFF', '#7653E0'],
  star: ['#FFD36B', '#F59E0B'],
  radar: ['#4FD8C4', '#0E9F8E'],
  bell: ['#FFB36B', '#F2711C'],
  sun: ['#FFE08A', '#FBA91A'],
  laptop: ['#7FB7FF', '#4361EE'],
  spark: ['#F7A8FF', '#B44CE0'],
  route: ['#6EE7B7', '#10A37F'],
  passport: ['#8FA8FF', '#3F51B5'],
  shield: ['#7DE3A8', '#1F9D6B'],
  plane: ['#80D4FF', '#1E88E5'],
  bed: ['#FFB4C8', '#E05284'],
  car: ['#FFA98A', '#E4572E'],
  ticket: ['#FFC97A', '#E8892B'],
  wallet: ['#9BE07B', '#3E9B2F'],
  doc: ['#A9B8D6', '#5B6B8C'],
  sos: ['#FF8A8A', '#D62839'],
  plug: ['#FFD86B', '#D9A400'],
  transit: ['#7FD1E8', '#1B8AB0'],
  fx: ['#7CE0C3', '#13906F'],
  coin: ['#FFE07A', '#E0A800'],
  info: ['#9CC8FF', '#3A7BD5'],
  bag: ['#E0B3FF', '#9B4DCA'],
  cal: ['#FF9FA0', '#E0484B'],
  heart: ['#FF9FBF', '#E2366F'],
  user: ['#9FD3FF', '#3B82C4'],
  handshake: ['#8FE3C9', '#1E9E78'],
  chart: ['#A0B4FF', '#5468E0'],
  flag: ['#FF9C9C', '#D93A3A'],
  map: ['#9FE0A5', '#3BA55C'],
  receipt: ['#C5CEDB', '#6B7A90'],
  clock: ['#9DD6FF', '#2C8BD6'],
  people: ['#FFBFA0', '#E8724A'],
  phone: ['#A6B9FF', '#4C5FD5'],
  food: ['#FFB38A', '#E0662B'],
  book: ['#C9A6FF', '#7B4FD6'],
  landmark: ['#D9C29A', '#A0773C'],
  compass: ['#8BE0E0', '#178F99'],
  tools: ['#B8C4D6', '#5E6E86'],
  gear: ['#B8C4D6', '#5E6E86'],
  card: ['#93C5FD', '#2563EB']
};

/** Çizimler: 56x56 alanda, beyaz + vurgu renkli katmanlar */
const ART: Record<string, (c: { hi: string; lo: string }) => React.ReactNode> = {
  pin: () => (
    <>
      <ellipse cx="28" cy="44" rx="10" ry="3" fill="#000" opacity=".18" />
      <path d="M28 10c-7.2 0-13 5.6-13 12.6C15 32 28 44 28 44s13-12 13-21.4C41 15.6 35.2 10 28 10z" fill="#fff" />
      <circle cx="28" cy="22.5" r="5.2" fill="#E8505B" />
      <circle cx="26.4" cy="21" r="1.6" fill="#fff" opacity=".7" />
    </>
  ),
  globe: () => (
    <>
      <circle cx="28" cy="28" r="15" fill="#fff" />
      <path d="M20 19c3 1 4 4 7 4s3 3 1 5-5 1-6 4 1 6-2 6c-3-2-6-7-6-12 0-3 2-5 6-7zM34 15c3 2 2 5 5 6s5 4 4 8c-3 0-4-3-6-2s-1 5-4 5-3-4-2-7 0-6 3-10z" fill="#2B7BD8" opacity=".85" />
      <circle cx="28" cy="28" r="15" fill="none" stroke="#fff" strokeWidth="2" />
      <ellipse cx="23" cy="21" rx="4" ry="2.4" fill="#fff" opacity=".45" transform="rotate(-30 23 21)" />
    </>
  ),
  scale: () => (
    <>
      <rect x="26.5" y="12" width="3" height="28" rx="1.5" fill="#fff" />
      <rect x="18" y="40" width="20" height="4" rx="2" fill="#fff" />
      <rect x="13" y="16" width="30" height="3" rx="1.5" fill="#fff" />
      <path d="M11 30l5-11 5 11a5 5 0 0 1-10 0z" fill="#FFD36B" />
      <path d="M35 30l5-11 5 11a5 5 0 0 1-10 0z" fill="#FFD36B" />
      <circle cx="28" cy="12" r="3" fill="#FFD36B" />
    </>
  ),
  star: () => (
    <>
      <path d="M28 11l5 10.4 11.4 1.6-8.3 8 2 11.3L28 37l-10.1 5.3 2-11.3-8.3-8 11.4-1.6z" fill="#fff" />
      <path d="M28 17l3 6.4 7 1-5 4.9 1.2 7L28 33l-6.2 3.3 1.2-7-5-4.9 7-1z" fill="#F59E0B" opacity=".55" />
    </>
  ),
  radar: () => (
    <>
      <circle cx="28" cy="28" r="15" fill="#fff" />
      <circle cx="28" cy="28" r="10" fill="none" stroke="#0E9F8E" strokeWidth="1.6" opacity=".35" />
      <circle cx="28" cy="28" r="5" fill="none" stroke="#0E9F8E" strokeWidth="1.6" opacity=".35" />
      <path d="M28 28L28 13a15 15 0 0 1 13 7.5z" fill="#4FD8C4" opacity=".75" />
      <circle cx="35" cy="22" r="2.2" fill="#E8505B" />
      <circle cx="28" cy="28" r="2" fill="#0E9F8E" />
    </>
  ),
  bell: () => (
    <>
      <path d="M17 36V26a11 11 0 0 1 22 0v10l3 3H14z" fill="#fff" />
      <path d="M24 41a4 4 0 0 0 8 0z" fill="#fff" />
      <circle cx="38" cy="16" r="5" fill="#E8505B" stroke="#fff" strokeWidth="2" />
      <path d="M22 24a6 6 0 0 1 5-5" stroke="#F2711C" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".5" />
    </>
  ),
  sun: () => (
    <>
      <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
        <path d="M28 9v4M28 43v4M9 28h4M43 28h4M14.6 14.6l2.8 2.8M38.6 38.6l2.8 2.8M14.6 41.4l2.8-2.8M38.6 17.4l2.8-2.8" />
      </g>
      <circle cx="28" cy="28" r="10" fill="#fff" />
      <circle cx="28" cy="28" r="6.5" fill="#FBA91A" opacity=".55" />
    </>
  ),
  laptop: () => (
    <>
      <rect x="14" y="15" width="28" height="19" rx="3" fill="#fff" />
      <rect x="17.5" y="18.5" width="21" height="12" rx="1.5" fill="#4361EE" opacity=".8" />
      <path d="M10 36h36l-3 5H13z" fill="#fff" />
      <path d="M21 26l4 3 7-7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="40" cy="14" r="5" fill="#FFD36B" />
    </>
  ),
  spark: () => (
    <>
      <path d="M26 12l3.6 9.4L39 25l-9.4 3.6L26 38l-3.6-9.4L13 25l9.4-3.6z" fill="#fff" />
      <path d="M39 30l1.8 4.2L45 36l-4.2 1.8L39 42l-1.8-4.2L33 36l4.2-1.8zM40 11l1.2 2.8L44 15l-2.8 1.2L40 19l-1.2-2.8L36 15l2.8-1.2z" fill="#fff" opacity=".85" />
    </>
  ),
  route: () => (
    <>
      <path d="M16 38c0-8 24-4 24-14s-12-6-12-12" stroke="#fff" strokeWidth="3" strokeDasharray="1 5.5" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="39" r="5" fill="#fff" />
      <circle cx="16" cy="39" r="2" fill="#10A37F" />
      <path d="M28 8c-3.9 0-7 3-7 6.8C21 20 28 26 28 26s7-6 7-11.2C35 11 31.9 8 28 8z" fill="#fff" />
      <circle cx="28" cy="15" r="2.6" fill="#E8505B" />
    </>
  ),
  passport: () => (
    <>
      <rect x="16" y="10" width="24" height="34" rx="4" fill="#fff" />
      <circle cx="28" cy="24" r="6" fill="none" stroke="#3F51B5" strokeWidth="2" />
      <path d="M22 24h12M28 18c2 2 2 10 0 12M28 18c-2 2-2 10 0 12" stroke="#3F51B5" strokeWidth="1.4" fill="none" />
      <rect x="21" y="35" width="14" height="2.6" rx="1.3" fill="#3F51B5" opacity=".6" />
    </>
  ),
  shield: () => (
    <>
      <path d="M28 10l13 5v10c0 9-6 15-13 19-7-4-13-10-13-19V15z" fill="#fff" />
      <path d="M22 27l4.5 4.5L35 23" stroke="#1F9D6B" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  plane: () => (
    <>
      <path d="M26 44l3-2v-9l13 4v-4l-13-8.5V13a3 3 0 0 0-6 0v11.5L10 33v4l13-4v9l3 2z" fill="#fff" transform="rotate(35 28 28)" />
      <path d="M8 44c6-2 10-2 14 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6" fill="none" />
    </>
  ),
  bed: () => (
    <>
      <rect x="10" y="30" width="36" height="8" rx="2" fill="#fff" />
      <rect x="10" y="20" width="4" height="22" rx="2" fill="#fff" />
      <rect x="42" y="26" width="4" height="16" rx="2" fill="#fff" />
      <rect x="16" y="23" width="9" height="7" rx="3" fill="#fff" />
      <path d="M26 30v-5h14a2 2 0 0 1 2 2v3z" fill="#E05284" opacity=".55" />
      <text x="37" y="18" fontSize="9" fontWeight="800" fill="#fff" fontFamily="system-ui">z</text>
    </>
  ),
  car: () => (
    <>
      <path d="M12 34v-5l4-9h24l4 9v5z" fill="#fff" />
      <path d="M18 21h20l3 7H15z" fill="#E4572E" opacity=".45" />
      <circle cx="19" cy="36" r="4.2" fill="#2B2B3A" stroke="#fff" strokeWidth="2" />
      <circle cx="37" cy="36" r="4.2" fill="#2B2B3A" stroke="#fff" strokeWidth="2" />
      <circle cx="15" cy="30" r="1.6" fill="#FFD36B" />
      <circle cx="41" cy="30" r="1.6" fill="#FFD36B" />
    </>
  ),
  ticket: () => (
    <>
      <path d="M11 20a3 3 0 0 0 3-3h28a3 3 0 0 0 3 3v4a4 4 0 0 0 0 8v4a3 3 0 0 0-3 3H14a3 3 0 0 0-3-3v-4a4 4 0 0 0 0-8z" fill="#fff" />
      <path d="M34 18v20" stroke="#E8892B" strokeWidth="1.8" strokeDasharray="2 2.5" />
      <path d="M18 25h11M18 30h8" stroke="#E8892B" strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  wallet: () => (
    <>
      <path d="M13 19l20-7 3 7z" fill="#fff" opacity=".7" />
      <rect x="11" y="19" width="34" height="23" rx="5" fill="#fff" />
      <rect x="32" y="27" width="13" height="8" rx="3" fill="#3E9B2F" opacity=".55" />
      <circle cx="37" cy="31" r="1.8" fill="#fff" />
    </>
  ),
  doc: () => (
    <>
      <path d="M17 10h15l8 8v28H17z" fill="#fff" />
      <path d="M32 10v8h8" fill="#5B6B8C" opacity=".35" />
      <path d="M22 26h13M22 31h13M22 36h8" stroke="#5B6B8C" strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  sos: () => (
    <>
      <circle cx="28" cy="28" r="15" fill="#fff" />
      <path d="M28 19v12" stroke="#D62839" strokeWidth="4" strokeLinecap="round" />
      <circle cx="28" cy="37" r="2.4" fill="#D62839" />
    </>
  ),
  plug: () => (
    <>
      <path d="M22 10v8M34 10v8" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M16 18h24v6a12 12 0 0 1-24 0z" fill="#fff" />
      <path d="M28 36v10" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M29 21l-4 6h4l-2 6 6-8h-4l2-4z" fill="#D9A400" />
    </>
  ),
  transit: () => (
    <>
      <rect x="15" y="10" width="26" height="30" rx="7" fill="#fff" />
      <rect x="18.5" y="15" width="19" height="10" rx="2" fill="#1B8AB0" opacity=".55" />
      <circle cx="21.5" cy="32" r="2.2" fill="#1B8AB0" />
      <circle cx="34.5" cy="32" r="2.2" fill="#1B8AB0" />
      <path d="M20 40l-4 6M36 40l4 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  fx: () => (
    <>
      <circle cx="22" cy="24" r="10" fill="#fff" />
      <circle cx="34" cy="32" r="10" fill="#fff" opacity=".85" />
      <text x="22" y="28.5" fontSize="12" fontWeight="800" textAnchor="middle" fill="#13906F" fontFamily="system-ui">$</text>
      <text x="34" y="36.5" fontSize="12" fontWeight="800" textAnchor="middle" fill="#13906F" fontFamily="system-ui">€</text>
    </>
  ),
  coin: () => (
    <>
      <ellipse cx="28" cy="36" rx="14" ry="5" fill="#fff" opacity=".7" />
      <ellipse cx="28" cy="31" rx="14" ry="5" fill="#fff" opacity=".85" />
      <ellipse cx="28" cy="25" rx="14" ry="5" fill="#fff" />
      <ellipse cx="28" cy="25" rx="8" ry="2.4" fill="#E0A800" opacity=".5" />
    </>
  ),
  info: () => (
    <>
      <circle cx="28" cy="28" r="15" fill="#fff" />
      <path d="M28 26v11" stroke="#3A7BD5" strokeWidth="4" strokeLinecap="round" />
      <circle cx="28" cy="19.5" r="2.6" fill="#3A7BD5" />
    </>
  ),
  bag: () => (
    <>
      <path d="M22 18v-3a6 6 0 0 1 12 0v3" stroke="#fff" strokeWidth="3" fill="none" />
      <rect x="12" y="18" width="32" height="24" rx="6" fill="#fff" />
      <path d="M12 28h32" stroke="#9B4DCA" strokeWidth="2" opacity=".45" />
      <rect x="25" y="26" width="6" height="5" rx="1.5" fill="#9B4DCA" opacity=".7" />
    </>
  ),
  cal: () => (
    <>
      <rect x="12" y="14" width="32" height="30" rx="6" fill="#fff" />
      <path d="M12 20a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v3H12z" fill="#E0484B" opacity=".75" />
      <path d="M20 10v7M36 10v7" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="21" cy="31" r="2" fill="#E0484B" /><circle cx="28" cy="31" r="2" fill="#E0484B" opacity=".5" /><circle cx="35" cy="31" r="2" fill="#E0484B" opacity=".5" />
      <circle cx="21" cy="38" r="2" fill="#E0484B" opacity=".5" /><circle cx="28" cy="38" r="2" fill="#E0484B" opacity=".5" />
    </>
  ),
  heart: () => (
    <>
      <path d="M28 43s-15-9-15-20a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 11-15 20-15 20z" fill="#fff" />
      <ellipse cx="21" cy="21" rx="3" ry="2" fill="#E2366F" opacity=".35" transform="rotate(-35 21 21)" />
    </>
  ),
  handshake: () => (
    <>
      <path d="M8 26l8-8 10 5 10-5 8 8-18 16z" fill="#fff" />
      <path d="M20 30l4 4M24 27l4 4M28 25l4 4" stroke="#1E9E78" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  chart: () => (
    <>
      <rect x="13" y="28" width="7" height="14" rx="2" fill="#fff" opacity=".75" />
      <rect x="24.5" y="18" width="7" height="24" rx="2" fill="#fff" />
      <rect x="36" y="23" width="7" height="19" rx="2" fill="#fff" opacity=".9" />
      <path d="M12 22l9-7 8 5 13-9" stroke="#FFD36B" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  flag: () => (
    <>
      <path d="M17 44V11" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M18 12h22l-5 7 5 7H18z" fill="#fff" />
      <circle cx="27" cy="19" r="3" fill="#D93A3A" opacity=".7" />
    </>
  ),
  map: () => (
    <>
      <path d="M10 16l11-4 14 4 11-4v28l-11 4-14-4-11 4z" fill="#fff" />
      <path d="M21 12v28M35 16v28" stroke="#3BA55C" strokeWidth="1.6" opacity=".45" />
      <path d="M14 30c5-2 8 3 13 0s7-6 13-3" stroke="#3BA55C" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeDasharray="1 4" />
    </>
  ),
  receipt: () => (
    <>
      <path d="M16 10h24v34l-4-3-4 3-4-3-4 3-4-3-4 3z" fill="#fff" />
      <path d="M21 19h14M21 25h14M21 31h8" stroke="#6B7A90" strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  clock: () => (
    <>
      <circle cx="28" cy="28" r="15" fill="#fff" />
      <path d="M28 19v9l6 4" stroke="#2C8BD6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="28" cy="28" r="2" fill="#2C8BD6" />
    </>
  ),
  people: () => (
    <>
      <circle cx="22" cy="21" r="6" fill="#fff" />
      <path d="M11 41a11 11 0 0 1 22 0z" fill="#fff" />
      <circle cx="36" cy="22" r="5" fill="#fff" opacity=".8" />
      <path d="M31 41a9 9 0 0 1 15-6v6z" fill="#fff" opacity=".8" />
    </>
  ),
  phone: () => (
    <>
      <rect x="18" y="9" width="20" height="38" rx="5" fill="#fff" />
      <rect x="21" y="14" width="14" height="24" rx="2" fill="#4C5FD5" opacity=".55" />
      <circle cx="28" cy="42" r="1.8" fill="#4C5FD5" />
    </>
  ),
  food: () => (
    <>
      <circle cx="28" cy="30" r="13" fill="#fff" />
      <circle cx="28" cy="30" r="8" fill="#E0662B" opacity=".35" />
      <path d="M12 12v10M15 12v10M18 12v10M12 22h6M15 22v22" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M43 12c-3 0-4 4-4 9s1 5 4 5v18" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </>
  ),
  book: () => (
    <>
      <path d="M10 15c6-2 12-2 18 2v26c-6-4-12-4-18-2z" fill="#fff" />
      <path d="M46 15c-6-2-12-2-18 2v26c6-4 12-4 18-2z" fill="#fff" opacity=".85" />
      <path d="M15 22h8M15 27h8M33 22h8M33 27h8" stroke="#7B4FD6" strokeWidth="1.8" strokeLinecap="round" opacity=".6" />
    </>
  ),
  landmark: () => (
    <>
      <path d="M10 22l18-11 18 11z" fill="#fff" />
      <path d="M14 24h4v14h-4zM22 24h4v14h-4zM30 24h4v14h-4zM38 24h4v14h-4z" fill="#fff" />
      <rect x="10" y="40" width="36" height="4" rx="1.5" fill="#fff" />
    </>
  ),
  compass: () => (
    <>
      <circle cx="28" cy="28" r="15" fill="#fff" />
      <path d="M34 22l-3.5 8.5L22 34l3.5-8.5z" fill="#E8505B" />
      <path d="M34 22l-8.5 3.5L22 34z" fill="#178F99" />
      <circle cx="28" cy="28" r="1.8" fill="#fff" />
    </>
  ),
  card: () => (
    <>
      <rect x="10" y="16" width="36" height="24" rx="5" fill="#fff" />
      <rect x="10" y="21" width="36" height="5" fill="#2563EB" opacity=".6" />
      <rect x="15" y="31" width="10" height="3" rx="1.5" fill="#2563EB" opacity=".5" />
    </>
  )
};

export const TileArt: React.FC<{ name: string; size?: number }> = ({ name, size = 48 }) => {
  const uid = useId().replace(/:/g, '');
  const pal = PAL[name] || ['#7FD1E8', '#1B8AB0'];
  const art = ART[name];
  return (
    <span className="vz-art" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 56 56" width={size} height={size}>
        <defs>
          <linearGradient id={`g${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={pal[0]} />
            <stop offset="1" stopColor={pal[1]} />
          </linearGradient>
          <radialGradient id={`h${uid}`} cx=".3" cy=".2" r=".8">
            <stop offset="0" stopColor="#fff" stopOpacity=".45" />
            <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="2" y="3" width="52" height="52" rx="16" fill={pal[1]} opacity=".35" />
        <rect x="2" y="1" width="52" height="52" rx="16" fill={`url(#g${uid})`} />
        <rect x="2" y="1" width="52" height="52" rx="16" fill={`url(#h${uid})`} />
        {art ? <g>{art({ hi: pal[0], lo: pal[1] })}</g> : null}
      </svg>
      {!art && (
        <span className="vz-art-fb">
          <Icon name={name} size={Math.round(size * 0.5)} duo={false} />
        </span>
      )}
    </span>
  );
};

export const TILE_ART_NAMES = Object.keys(PAL);
