import React from 'react';

/**
 * High-craft 3D-styled isometric & animated SVG illustrations for the 12 Bento Dashboard Widgets.
 * Designed for the "Mediterranean & Tropical Crystal Lagoon Breeze" theme (Zero network overhead, 60fps CSS animations).
 */

export const WorldRadar3DIllustration: React.FC = () => (
  <div className="relative w-full h-32 sm:h-36 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#E0F7FA]/90 via-[#CCFBF1]/70 to-[#BAE6FD]/80 dark:from-[#082F49]/80 dark:via-[#0F3F4C]/70 dark:to-[#064E3B]/60 border border-teal-500/20 p-3">
    {/* Animated radar sweep ring */}
    <div className="absolute w-44 h-44 rounded-full border border-teal-400/30 dark:border-teal-400/20 animate-ping" style={{ animationDuration: '4s' }} />
    <div className="absolute w-32 h-32 rounded-full border border-sky-400/40 dark:border-teal-300/25" />

    <svg viewBox="0 0 320 130" className="w-full h-full drop-shadow-sm" aria-hidden="true">
      <defs>
        <linearGradient id="lagoonMapGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="50%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="flightArcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>

      {/* Stylized continents dot-matrix & landmasses */}
      <g fill="url(#lagoonMapGrad)" opacity="0.85">
        {/* Americas */}
        <path d="M35 28 Q52 22 62 36 T55 68 Q45 75 40 60 Z" />
        <path d="M58 76 Q72 80 68 104 T52 114 Q48 96 58 76 Z" />
        {/* Europe & Africa */}
        <path d="M132 24 Q158 18 172 32 T160 50 Q140 52 132 24 Z" />
        <path d="M138 56 Q168 54 174 82 T154 112 Q136 96 138 56 Z" />
        {/* Asia & Oceania */}
        <path d="M180 26 Q235 16 268 42 T245 76 Q205 74 180 26 Z" />
        <path d="M245 88 Q272 84 278 104 T252 112 Z" />
      </g>

      {/* Animated Flight Routes */}
      <path
        d="M 152 38 Q 205 6 248 54"
        fill="none"
        stroke="url(#flightArcGrad)"
        strokeWidth="2.5"
        strokeDasharray="5 4"
        className="vz-route"
      />
      <path
        d="M 152 38 Q 98 14 54 46"
        fill="none"
        stroke="#0284C7"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.75"
      />

      {/* Glowing Hub Nodes */}
      <circle cx="152" cy="38" r="5" fill="#0D9488" />
      <circle cx="152" cy="38" r="9" fill="#14B8A6" opacity="0.3" />

      <circle cx="248" cy="54" r="5" fill="#10B981" />
      <circle cx="248" cy="54" r="10" fill="#10B981" opacity="0.3" />

      <circle cx="54" cy="46" r="4.5" fill="#0284C7" />

      {/* Floating Live Telemetry Pills */}
      <g transform="translate(18, 86)">
        <rect width="78" height="24" rx="12" fill="#FFFFFF" fillOpacity="0.92" stroke="#14B8A6" strokeWidth="1" />
        <text x="39" y="15" textAnchor="middle" fill="#06283D" fontSize="10" fontWeight="800">🇹🇭 Phuket 29°C</text>
      </g>
      <g transform="translate(212, 16)">
        <rect width="88" height="24" rx="12" fill="#FFFFFF" fillOpacity="0.92" stroke="#0EA5E9" strokeWidth="1" />
        <text x="44" y="15" textAnchor="middle" fill="#06283D" fontSize="10" fontWeight="800">🇯🇵 Tokyo · Vizesiz</text>
      </g>
    </svg>
  </div>
);

export const Passports3DIllustration: React.FC<{ synergyCount?: number }> = ({ synergyCount = 112 }) => (
  <div className="relative w-full h-28 flex items-center justify-between px-2 overflow-hidden">
    {/* 3D Isometric Passports Pair */}
    <svg viewBox="0 0 150 110" className="w-32 h-24 shrink-0 drop-shadow-md" aria-hidden="true">
      <defs>
        <linearGradient id="trPassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#9F1239" />
        </linearGradient>
        <linearGradient id="secondPassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0F4C81" />
        </linearGradient>
      </defs>
      {/* Second Passport (Tilted Right) */}
      <g transform="translate(62, 14) rotate(12)">
        <rect x="3" y="4" width="58" height="78" rx="8" fill="#06283D" opacity="0.25" />
        <rect x="0" y="0" width="58" height="78" rx="8" fill="url(#secondPassGrad)" stroke="#BAE6FD" strokeWidth="1" />
        <circle cx="29" cy="36" r="13" fill="none" stroke="#FDE68A" strokeWidth="1.2" opacity="0.85" />
        <path d="M16 36 H42 M29 23 V49" stroke="#FDE68A" strokeWidth="1" opacity="0.7" />
        <rect x="14" y="12" width="30" height="4" rx="2" fill="#FDE68A" opacity="0.85" />
        <rect x="18" y="60" width="22" height="3" rx="1.5" fill="#E0F2FE" opacity="0.8" />
      </g>
      {/* Primary Turkish Passport (Tilted Left) */}
      <g transform="translate(18, 16) rotate(-8)">
        <rect x="3" y="5" width="60" height="80" rx="8" fill="#06283D" opacity="0.3" />
        <rect x="0" y="0" width="60" height="80" rx="8" fill="url(#trPassGrad)" stroke="#FECDD3" strokeWidth="1" />
        <rect x="13" y="12" width="34" height="4" rx="2" fill="#FDE68A" opacity="0.9" />
        {/* Crescent & Star */}
        <circle cx="28" cy="40" r="10" fill="#FDE68A" />
        <circle cx="31" cy="40" r="8" fill="url(#trPassGrad)" />
        <polygon points="38,40 41,42 40,38 43,36 39,36" fill="#FDE68A" />
        <rect x="16" y="62" width="28" height="3.5" rx="1.5" fill="#FFE4E6" opacity="0.9" />
      </g>
    </svg>

    {/* Animated Venn Synergy Rings */}
    <div className="relative flex items-center justify-center pr-1">
      <div className="w-16 h-16 rounded-full bg-teal-500/20 dark:bg-teal-400/20 border-2 border-[#0D9488] dark:border-[#2DD4BF] flex items-center justify-center -mr-5 backdrop-blur-xs">
        <span className="text-[10px] font-extrabold text-[#06283D] dark:text-teal-200 -ml-3">P1</span>
      </div>
      <div className="w-16 h-16 rounded-full bg-sky-500/20 dark:bg-sky-400/20 border-2 border-[#0284C7] dark:border-[#38BDF8] flex items-center justify-center backdrop-blur-xs">
        <span className="text-[10px] font-extrabold text-[#06283D] dark:text-sky-200 ml-3">P2</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-sm font-black font-mono text-[#06283D] dark:text-white bg-white/90 dark:bg-[#061826]/90 px-2 py-0.5 rounded-full shadow-xs border border-teal-500/30">
          {synergyCount}
        </span>
      </div>
    </div>
  </div>
);

export const GlobalDayCounter3DIllustration: React.FC<{ daysLeft?: number }> = ({ daysLeft = 64 }) => (
  <div className="relative w-full h-28 flex items-center justify-between px-2 overflow-hidden">
    {/* 3D Globe + Calendar Icon */}
    <svg viewBox="0 0 110 100" className="w-24 h-24 shrink-0 drop-shadow-md" aria-hidden="true">
      <defs>
        <radialGradient id="globeSphereGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="55%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#064E3B" />
        </radialGradient>
      </defs>
      {/* 3D Globe */}
      <circle cx="44" cy="52" r="34" fill="url(#globeSphereGrad)" />
      <ellipse cx="44" cy="52" rx="34" ry="14" fill="none" stroke="#A7F3D0" strokeWidth="1.2" opacity="0.6" />
      <ellipse cx="44" cy="52" rx="16" ry="34" fill="none" stroke="#A7F3D0" strokeWidth="1.2" opacity="0.6" />
      {/* 3D Floating Calendar Card */}
      <g transform="translate(52, 16)">
        <rect x="2" y="4" width="48" height="44" rx="10" fill="#06283D" opacity="0.22" />
        <rect x="0" y="0" width="48" height="44" rx="10" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="1.5" />
        <path d="M0 10 Q0 0 10 0 H38 Q48 0 48 10 V14 H0 Z" fill="#0D9488" />
        <circle cx="14" cy="7" r="2.2" fill="#FFFFFF" />
        <circle cx="34" cy="7" r="2.2" fill="#FFFFFF" />
        <text x="24" y="33" textAnchor="middle" fill="#06283D" fontSize="14" fontWeight="900">180</text>
      </g>
    </svg>

    {/* Circular Animated 90/180 Gauge */}
    <div className="relative w-22 h-22 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 88 88" className="w-22 h-22 -rotate-90">
        <circle cx="44" cy="44" r="35" fill="none" stroke="currentColor" className="text-teal-900/10 dark:text-white/10" strokeWidth="7" />
        <circle
          cx="44"
          cy="44"
          r="35"
          fill="none"
          stroke="#0D9488"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="220"
          strokeDashoffset={220 - (220 * daysLeft) / 90}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-lg font-black font-mono text-[#06283D] dark:text-white leading-none">{daysLeft}</span>
        <span className="text-[10px] font-bold text-[#0F766E] dark:text-[#2DD4BF] mt-0.5">/ 90 gün</span>
      </div>
    </div>
  </div>
);

export const RoutePlanner3DIllustration: React.FC = () => (
  <div className="relative w-full h-28 flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#E0F2FE]/80 via-[#CCFBF1]/60 to-[#D1FAE5]/80 dark:from-[#082F49]/70 dark:to-[#064E3B]/60 p-3 border border-teal-500/20">
    <svg viewBox="0 0 260 68" className="w-full h-16 overflow-visible" aria-hidden="true">
      {/* Dashed curved flight path */}
      <path
        d="M 24 50 Q 85 6 130 38 T 236 18"
        fill="none"
        stroke="#0D9488"
        strokeWidth="2.5"
        strokeDasharray="5 4"
      />
      {/* Stop 1 */}
      <circle cx="24" cy="50" r="6" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
      {/* Stop 2 */}
      <circle cx="130" cy="38" r="6" fill="#0D9488" stroke="#FFFFFF" strokeWidth="2" />
      {/* Stop 3 */}
      <circle cx="236" cy="18" r="7" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
      {/* 3D Paper Plane / Jet Icon along path */}
      <g transform="translate(166, 12) rotate(-14)">
        <polygon points="0,12 24,0 14,18 10,13" fill="#0284C7" />
        <polygon points="10,13 24,0 14,18" fill="#0D9488" />
      </g>
    </svg>
    <div className="flex items-center justify-between text-[11px] font-extrabold text-[#06283D] dark:text-white px-1">
      <span className="px-2 py-0.5 rounded-full bg-white/85 dark:bg-white/10 shadow-2xs">🇹🇷 İstanbul</span>
      <span className="text-teal-700 dark:text-teal-300">➔</span>
      <span className="px-2 py-0.5 rounded-full bg-white/85 dark:bg-white/10 shadow-2xs">🇬🇷 Atina</span>
      <span className="text-teal-700 dark:text-teal-300">➔</span>
      <span className="px-2 py-0.5 rounded-full bg-white/85 dark:bg-white/10 shadow-2xs">🇯🇵 Tokyo</span>
    </div>
  </div>
);

export const CurrencyCoins3DIllustration: React.FC = () => (
  <div className="relative w-full h-28 flex items-center justify-between px-1 overflow-hidden">
    <svg viewBox="0 0 240 100" className="w-full h-full drop-shadow-sm" aria-hidden="true">
      <defs>
        <linearGradient id="goldCoin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="tealCoin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="55%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#115E59" />
        </linearGradient>
        <linearGradient id="skyCoin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="55%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
        <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Rising Emerald Sparkline Chart */}
      <path d="M12 88 L55 72 L98 76 L144 54 L188 58 L228 30 L228 94 L12 94 Z" fill="url(#chartArea)" />
      <path d="M12 88 L55 72 L98 76 L144 54 L188 58 L228 30" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="228" cy="30" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* 3D Coin 1: USD ($) */}
      <g transform="translate(16, 12)">
        <circle cx="24" cy="26" r="21" fill="#78350F" opacity="0.25" />
        <circle cx="22" cy="22" r="21" fill="url(#goldCoin)" stroke="#FEF08A" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="16" fill="none" stroke="#FEF08A" strokeWidth="1" strokeDasharray="3 2" />
        <text x="22" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900">$</text>
      </g>

      {/* 3D Coin 2: EUR (€) */}
      <g transform="translate(68, 20)">
        <circle cx="21" cy="23" r="18" fill="#06283D" opacity="0.22" />
        <circle cx="19" cy="19" r="18" fill="url(#skyCoin)" stroke="#BAE6FD" strokeWidth="1.5" />
        <text x="19" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900">€</text>
      </g>

      {/* 3D Coin 3: TRY (₺) & GBP (£) */}
      <g transform="translate(114, 10)">
        <circle cx="20" cy="22" r="17" fill="#06283D" opacity="0.22" />
        <circle cx="18" cy="18" r="17" fill="url(#tealCoin)" stroke="#99F6E4" strokeWidth="1.5" />
        <text x="18" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900">₺</text>
      </g>
      <g transform="translate(156, 18)">
        <circle cx="16" cy="16" r="14" fill="url(#goldCoin)" stroke="#FEF08A" strokeWidth="1.2" />
        <text x="16" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900">£</text>
      </g>
    </svg>
  </div>
);

export const WorldClock3DIllustration: React.FC = () => (
  <div className="relative w-full h-28 flex items-center justify-center gap-2 overflow-hidden">
    <svg viewBox="0 0 240 96" className="w-full h-full drop-shadow-sm" aria-hidden="true">
      {/* Center 3D Earth */}
      <circle cx="120" cy="48" r="32" fill="url(#globeSphereGrad)" opacity="0.9" />
      <path d="M104 32 Q122 24 134 40 T124 66 Q106 62 104 32 Z" fill="#A7F3D0" opacity="0.75" />

      {/* Left Analog Clock (Istanbul / Local) */}
      <g transform="translate(22, 16)">
        <circle cx="32" cy="34" r="30" fill="#06283D" opacity="0.2" />
        <circle cx="30" cy="30" r="30" fill="#FFFFFF" stroke="#0D9488" strokeWidth="3" />
        <circle cx="30" cy="30" r="24" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="30" y1="30" x2="30" y2="14" stroke="#06283D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="30" x2="44" y2="30" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="30" r="3" fill="#0D9488" />
        <text x="30" y="50" textAnchor="middle" fill="#0F766E" fontSize="8" fontWeight="800">İST</text>
      </g>

      {/* Right Night/Digital Clock (Tokyo / New York) */}
      <g transform="translate(156, 16)">
        <circle cx="32" cy="34" r="30" fill="#06283D" opacity="0.25" />
        <circle cx="30" cy="30" r="30" fill="#06283D" stroke="#2DD4BF" strokeWidth="2.5" />
        <text x="30" y="33" textAnchor="middle" fill="#2DD4BF" fontSize="12" fontWeight="900" fontFamily="monospace">16:45</text>
        <text x="30" y="47" textAnchor="middle" fill="#99F6E4" fontSize="8" fontWeight="700">TOKYO +6s</text>
      </g>
    </svg>
  </div>
);

export const Suitcases3DIllustration: React.FC<{ progress?: number }> = ({ progress = 75 }) => (
  <div className="relative w-full h-28 flex items-center justify-between px-2 overflow-hidden">
    {/* 3D Suitcases Pair (Large & Cabin Size) */}
    <svg viewBox="0 0 135 105" className="w-30 h-24 shrink-0 drop-shadow-md" aria-hidden="true">
      <defs>
        <linearGradient id="tealSuitcase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="skySuitcase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Tall Suitcase */}
      <g transform="translate(58, 8)">
        {/* Telescopic Handle */}
        <path d="M18 14 V2 H38 V14" fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        <rect x="14" y="0" width="28" height="4" rx="2" fill="#06283D" />
        {/* Body */}
        <rect x="4" y="14" width="48" height="68" rx="10" fill="url(#tealSuitcase)" stroke="#99F6E4" strokeWidth="1.5" />
        {/* Ribs */}
        <line x1="16" y1="22" x2="16" y2="74" stroke="#CCFBF1" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <line x1="28" y1="22" x2="28" y2="74" stroke="#CCFBF1" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <line x1="40" y1="22" x2="40" y2="74" stroke="#CCFBF1" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        {/* Travel Sticker */}
        <rect x="30" y="30" width="14" height="10" rx="2" fill="#FEF08A" transform="rotate(10 37 35)" />
        {/* Wheels */}
        <circle cx="14" cy="85" r="4" fill="#06283D" />
        <circle cx="42" cy="85" r="4" fill="#06283D" />
      </g>

      {/* Cabin Suitcase (Front Left) */}
      <g transform="translate(10, 26)">
        <path d="M15 12 V3 H31 V12" fill="none" stroke="#64748B" strokeWidth="2.5" />
        <rect x="2" y="12" width="42" height="52" rx="9" fill="url(#skySuitcase)" stroke="#BAE6FD" strokeWidth="1.5" />
        <line x1="14" y1="20" x2="14" y2="56" stroke="#E0F2FE" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <line x1="23" y1="20" x2="23" y2="56" stroke="#E0F2FE" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <line x1="32" y1="20" x2="32" y2="56" stroke="#E0F2FE" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <circle cx="11" cy="67" r="3.5" fill="#06283D" />
        <circle cx="35" cy="67" r="3.5" fill="#06283D" />
      </g>
    </svg>

    {/* Readiness Ring & Tags */}
    <div className="flex flex-col items-end gap-1.5">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg viewBox="0 0 68 68" className="w-16 h-16 -rotate-90">
          <circle cx="34" cy="34" r="27" fill="none" stroke="currentColor" className="text-teal-900/10 dark:text-white/10" strokeWidth="6" />
          <circle
            cx="34"
            cy="34"
            r="27"
            fill="none"
            stroke="#10B981"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="170"
            strokeDashoffset={170 - (170 * progress) / 100}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-black font-mono text-[#06283D] dark:text-white">%{progress}</span>
          <span className="text-[9px] font-bold text-[#0F766E] dark:text-emerald-300">Hazır</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-[#065F46] dark:text-emerald-300 border border-emerald-500/30">
          Evrak ✓
        </span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-[#075985] dark:text-sky-300 border border-sky-500/30">
          Kabin ✓
        </span>
      </div>
    </div>
  </div>
);

export const NomadIsland3DIllustration: React.FC = () => (
  <div className="relative w-full h-28 flex items-center justify-between px-1 overflow-hidden">
    <svg viewBox="0 0 155 100" className="w-34 h-24 shrink-0 drop-shadow-md" aria-hidden="true">
      {/* Lagoon Water Base */}
      <ellipse cx="76" cy="82" rx="64" ry="14" fill="#2DD4BF" opacity="0.35" />
      {/* Tropical Island Mound */}
      <ellipse cx="76" cy="76" rx="48" ry="12" fill="#A7F3D0" />
      <ellipse cx="76" cy="73" rx="42" ry="10" fill="#34D399" />
      {/* Palm Tree */}
      <path d="M106 70 Q114 44 102 24" fill="none" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
      <path d="M102 24 Q122 18 128 28" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
      <path d="M102 24 Q84 16 78 28" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
      <path d="M102 24 Q112 8 124 14" fill="none" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
      {/* 3D Laptop on Island */}
      <g transform="translate(42, 34)">
        <rect x="4" y="0" width="44" height="28" rx="4" fill="#06283D" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="8" y="4" width="36" height="20" rx="2" fill="#0EA5E9" opacity="0.85" />
        <path d="M0 28 H52 L58 35 H-6 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
      </g>
    </svg>

    <div className="flex flex-col items-end gap-1.5 pr-1">
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF] border border-teal-500/30">
        📶 185 Mbps
      </span>
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-sky-500/15 text-[#075985] dark:text-sky-300 border border-sky-500/30">
        💳 $1,250 / ay
      </span>
    </div>
  </div>
);

export const LifebuoySOS3DIllustration: React.FC = () => (
  <div className="relative w-full h-28 flex items-center justify-between px-2 overflow-hidden">
    <svg viewBox="0 0 120 100" className="w-26 h-24 shrink-0 drop-shadow-md" aria-hidden="true">
      {/* 3D Lifebuoy Ring */}
      <circle cx="48" cy="52" r="34" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      <path d="M36 20 A34 34 0 0 1 60 20 L55 34 A18 18 0 0 0 41 34 Z" fill="#EF4444" />
      <path d="M36 84 A34 34 0 0 0 60 84 L55 70 A18 18 0 0 1 41 70 Z" fill="#EF4444" />
      <path d="M16 40 A34 34 0 0 0 16 64 L30 59 A18 18 0 0 1 30 45 Z" fill="#EF4444" />
      <path d="M80 40 A34 34 0 0 1 80 64 L66 59 A18 18 0 0 0 66 45 Z" fill="#EF4444" />
      <circle cx="48" cy="52" r="17" fill="#E0F2FE" stroke="#94A3B8" strokeWidth="1.5" />

      {/* 3D Emerald Shield Badge */}
      <g transform="translate(66, 16)">
        <path d="M22 0 L42 8 V24 C42 38 22 48 22 48 C22 48 2 38 2 24 V8 Z" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M15 24 L20 29 L30 19" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>

    <div className="flex flex-col items-end gap-1.5">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500 text-white shadow-sm">
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        SOS 112 / 911
      </span>
      <span className="text-[11px] font-bold text-[#06283D] dark:text-slate-200 text-right">
        T.C. Büyükelçilik &<br />Kayıp Pasaport Hattı
      </span>
    </div>
  </div>
);

export const LocalApps3DIllustration: React.FC = () => (
  <div className="relative w-full h-28 flex items-center justify-between px-2 overflow-hidden">
    <svg viewBox="0 0 140 100" className="w-32 h-24 shrink-0 drop-shadow-md" aria-hidden="true">
      {/* 3D Smartphone */}
      <rect x="42" y="8" width="54" height="84" rx="11" fill="#06283D" stroke="#38BDF8" strokeWidth="2" />
      <rect x="46" y="14" width="46" height="72" rx="7" fill="#E0F7FA" />
      <rect x="61" y="11" width="16" height="3" rx="1.5" fill="#38BDF8" />

      {/* Floating 3D App Tile 1: Taxi (Grab/Bolt/Uber) */}
      <g transform="translate(8, 18)">
        <rect width="38" height="30" rx="8" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="19" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">TAKSİ</text>
      </g>

      {/* Floating 3D App Tile 2: Map & Metro */}
      <g transform="translate(92, 16)">
        <rect width="40" height="30" rx="8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="20" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="900">HARİTA</text>
      </g>

      {/* Floating 3D App Tile 3: eSIM */}
      <g transform="translate(90, 54)">
        <rect width="42" height="28" rx="8" fill="#0D9488" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="21" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">eSIM</text>
      </g>

      {/* Floating 3D App Tile 4: Delivery / Social */}
      <g transform="translate(10, 54)">
        <rect width="36" height="28" rx="8" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="18" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="900">YEMEK</text>
      </g>
    </svg>

    <div className="flex flex-col items-end gap-1 text-right">
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-[#065F46] dark:text-emerald-300 border border-emerald-500/30">
        Grab · Bolt · Uber
      </span>
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-500/15 text-[#075985] dark:text-sky-300 border border-sky-500/30">
        Airalo · Agoda · Klook
      </span>
      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
        199 ülke yerel rehberi
      </span>
    </div>
  </div>
);
