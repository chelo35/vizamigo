import React from 'react';

/**
 * High-craft 3D-styled illustrations & animated SVG components for Vizamigo V2
 * "Tropical Turquoise & Emerald Lagoon" Widget System.
 */

export const WorldRadar3DIllustration: React.FC = () => (
  <div className="relative w-full h-36 sm:h-40 flex items-center justify-center overflow-hidden rounded-2xl">
    <svg viewBox="0 0 340 150" className="w-full h-full drop-shadow-lg" aria-hidden="true">
      <defs>
        <linearGradient id="v2ContinentGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="50%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="v2ArcYellow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="v2ArcCyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
        <linearGradient id="v2ArcPink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>

      {/* Stylized 3D World Map Continents */}
      <g fill="url(#v2ContinentGrad)" stroke="#99F6E4" strokeWidth="0.8" opacity="0.92">
        {/* North & South America */}
        <path d="M28 24 Q55 14 74 34 T64 72 Q46 78 36 58 Z" />
        <path d="M64 80 Q82 86 76 118 T56 134 Q48 108 64 80 Z" />
        {/* Europe & Africa */}
        <path d="M138 22 Q168 14 186 30 T172 54 Q148 56 138 22 Z" />
        <path d="M144 60 Q176 58 184 92 T162 128 Q142 106 144 60 Z" />
        {/* Asia & Australia */}
        <path d="M190 22 Q256 10 296 42 T268 86 Q218 82 190 22 Z" />
        <path d="M264 98 Q298 94 306 118 T274 130 Z" />
      </g>

      {/* Glowing Multi-Color Flight Arcs */}
      <path
        d="M 164 42 Q 105 10 56 46"
        fill="none"
        stroke="url(#v2ArcYellow)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M 164 42 Q 115 68 70 102"
        fill="none"
        stroke="url(#v2ArcYellow)"
        strokeWidth="2.4"
        strokeDasharray="5 4"
      />
      <path
        d="M 164 42 Q 218 12 268 48"
        fill="none"
        stroke="url(#v2ArcCyan)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 164 42 Q 232 64 284 110"
        fill="none"
        stroke="url(#v2ArcPink)"
        strokeWidth="2.5"
        strokeDasharray="5 4"
      />
      <path
        d="M 164 42 Q 168 74 164 108"
        fill="none"
        stroke="#5EEAD4"
        strokeWidth="2.2"
      />

      {/* Glowing Hub Dots */}
      <circle cx="164" cy="42" r="5.5" fill="#FEF08A" />
      <circle cx="164" cy="42" r="11" fill="#2DD4BF" opacity="0.4" />
      <circle cx="56" cy="46" r="4.5" fill="#5EEAD4" />
      <circle cx="70" cy="102" r="4.5" fill="#FDE047" />
      <circle cx="268" cy="48" r="5" fill="#38BDF8" />
      <circle cx="284" cy="110" r="4.5" fill="#F472B6" />
      <circle cx="164" cy="108" r="4" fill="#34D399" />
    </svg>
  </div>
);

export const Passports3DIllustration: React.FC<{
  codeA?: string;
  codeB?: string;
  synergyCount?: number;
}> = () => (
  <div className="relative w-36 sm:w-44 h-32 sm:h-36 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 180 140" className="w-full h-full drop-shadow-xl overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="v2RedPass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BE123C" />
          <stop offset="50%" stopColor="#9F1239" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="v2BluePass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="50%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="v2GoldFoil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>

      {/* Back Glow */}
      <ellipse cx="92" cy="78" rx="68" ry="44" fill="#2DD4BF" opacity="0.22" />

      {/* Right Passport (Blue EU Style, tilted right) */}
      <g transform="translate(82, 16) rotate(12)">
        <rect x="4" y="6" width="68" height="94" rx="9" fill="#042F2E" opacity="0.35" />
        <rect x="2" y="2" width="68" height="94" rx="9" fill="#F8FAFC" />
        <rect x="0" y="0" width="68" height="94" rx="9" fill="url(#v2BluePass)" stroke="#60A5FA" strokeWidth="1.2" />
        <rect x="14" y="13" width="40" height="4" rx="2" fill="url(#v2GoldFoil)" opacity="0.9" />
        {/* Circle of EU stars */}
        <circle cx="34" cy="46" r="15" fill="none" stroke="url(#v2GoldFoil)" strokeWidth="2" strokeDasharray="3 4.8" />
        <rect x="18" y="72" width="32" height="4" rx="2" fill="url(#v2GoldFoil)" opacity="0.85" />
        <rect x="26" y="81" width="16" height="5" rx="2" fill="url(#v2GoldFoil)" />
      </g>

      {/* Left Passport (Turkish Crimson Red Style, tilted left) */}
      <g transform="translate(22, 18) rotate(-10)">
        <rect x="4" y="6" width="70" height="96" rx="9" fill="#042F2E" opacity="0.4" />
        <rect x="2" y="2" width="70" height="96" rx="9" fill="#FFF1F2" />
        <rect x="0" y="0" width="70" height="96" rx="9" fill="url(#v2RedPass)" stroke="#FDA4AF" strokeWidth="1.2" />
        <rect x="12" y="12" width="46" height="4" rx="2" fill="url(#v2GoldFoil)" />
        <rect x="18" y="19" width="34" height="3" rx="1.5" fill="url(#v2GoldFoil)" opacity="0.75" />
        {/* Gold Crescent & Star */}
        <circle cx="33" cy="48" r="12" fill="url(#v2GoldFoil)" />
        <circle cx="36.5" cy="48" r="9.5" fill="url(#v2RedPass)" />
        <polygon points="44,48 48,50 47,46 50,43.5 46,43.5" fill="url(#v2GoldFoil)" />
        <rect x="18" y="72" width="34" height="4" rx="2" fill="url(#v2GoldFoil)" opacity="0.9" />
        {/* Biometric chip symbol */}
        <rect x="27" y="81" width="16" height="6" rx="2" fill="url(#v2GoldFoil)" />
      </g>

      {/* Glowing Turquoise Synergy Orbit Rings Wrapping Both Passports */}
      <ellipse
        cx="90"
        cy="76"
        rx="76"
        ry="22"
        fill="none"
        stroke="#5EEAD4"
        strokeWidth="2.5"
        opacity="0.9"
        transform="rotate(-8 90 76)"
      />
      <ellipse
        cx="90"
        cy="82"
        rx="72"
        ry="18"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        opacity="0.85"
        transform="rotate(-4 90 82)"
      />
      <circle cx="24" cy="82" r="3.5" fill="#FEF08A" />
      <circle cx="158" cy="68" r="3.5" fill="#5EEAD4" />
    </svg>
  </div>
);

export const GlobalDayCounter3DIllustration: React.FC<{
  usedDays?: number;
  maxDays?: number;
  daysLeft?: number;
}> = ({ daysLeft = 48 }) => (
  <div className="relative w-36 sm:w-44 h-32 sm:h-36 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-xl overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="v2EarthSphere" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="45%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0F766E" />
        </radialGradient>
        <linearGradient id="v2NeonRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* Outer Glowing Progress Ring */}
      <circle cx="82" cy="70" r="56" fill="none" stroke="#99F6E4" strokeWidth="4" opacity="0.3" />
      <circle
        cx="82"
        cy="70"
        r="56"
        fill="none"
        stroke="url(#v2NeonRing)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="350"
        strokeDashoffset="95"
        transform="rotate(-90 82 70)"
      />

      {/* 3D Earth Sphere */}
      <circle cx="82" cy="70" r="44" fill="url(#v2EarthSphere)" />
      {/* Lush Green Continents */}
      <path d="M56 44 Q74 36 88 48 T78 76 Q58 72 56 44 Z" fill="#4ADE80" opacity="0.88" />
      <path d="M92 52 Q114 48 118 68 T102 94 Q88 82 92 52 Z" fill="#22C55E" opacity="0.88" />
      <path d="M48 76 Q62 82 58 100 T44 92 Z" fill="#86EFAC" opacity="0.8" />

      {/* 3D Curved Calendar Ribbon Wrapping the Globe */}
      <g transform="translate(20, 62)">
        <rect x="4" y="8" width="116" height="32" rx="10" fill="#042F2E" opacity="0.3" />
        <rect x="0" y="4" width="116" height="32" rx="10" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5" />
        {/* Calendar cells */}
        <rect x="8" y="10" width="20" height="20" rx="4" fill="#CCFBF1" />
        <rect x="32" y="10" width="20" height="20" rx="4" fill="#CCFBF1" />
        {/* Center Highlighted Day Badge */}
        <rect x="56" y="7" width="28" height="26" rx="6" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1.5" />
        <text x="70" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900">
          {daysLeft}
        </text>
        <rect x="88" y="10" width="20" height="20" rx="4" fill="#CCFBF1" />
      </g>
    </svg>
  </div>
);

export const RoutePlanner3DIllustration: React.FC = () => (
  <div className="relative w-36 sm:w-44 h-32 sm:h-36 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-xl overflow-visible" aria-hidden="true">
      {/* Outer Glow */}
      <circle cx="84" cy="70" r="52" fill="#5EEAD4" opacity="0.18" />
      {/* 3D Globe */}
      <circle cx="84" cy="70" r="44" fill="url(#v2EarthSphere)" />
      <path d="M58 46 Q78 36 92 50 T80 82 Q60 76 58 46 Z" fill="#4ADE80" opacity="0.88" />
      <path d="M96 54 Q116 50 120 72 T102 98 Q90 84 96 54 Z" fill="#22C55E" opacity="0.88" />

      {/* Dashed 3D Flight Arc Around Globe */}
      <path
        d="M 28 84 Q 84 18 138 64"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeDasharray="5 4"
      />
      {/* Airplane 1 */}
      <g transform="translate(44, 52) rotate(-25)">
        <path d="M0 8 L18 0 L12 14 L8 9 Z" fill="#FFFFFF" />
      </g>
      {/* Airplane 2 */}
      <g transform="translate(116, 46) rotate(22)">
        <path d="M0 8 L18 0 L12 14 L8 9 Z" fill="#FFFFFF" />
      </g>
    </svg>
  </div>
);

export const CurrencyCoins3DIllustration: React.FC = () => (
  <div className="relative w-40 sm:w-48 h-28 sm:h-32 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 190 125" className="w-full h-full drop-shadow-xl overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="v2GoldCoinFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="v2GoldCoinEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>
        <linearGradient id="v2EmeraldTrend" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>

      {/* Bold Rising Neon Green Trend Line & Arrow */}
      <path
        d="M 24 98 L 78 64 L 118 76 L 172 18"
        fill="none"
        stroke="url(#v2EmeraldTrend)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 152 18 H 172 V 38"
        fill="none"
        stroke="#34D399"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3D Gold Coin: Dollar ($) Top Left */}
      <g transform="translate(42, 8)">
        <circle cx="26" cy="27" r="23" fill="url(#v2GoldCoinEdge)" />
        <circle cx="23" cy="23" r="23" fill="url(#v2GoldCoinFace)" stroke="#FEF9C3" strokeWidth="1.5" />
        <circle cx="23" cy="23" r="18" fill="none" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
        <text x="23" y="31" textAnchor="middle" fill="#854D0E" fontSize="22" fontWeight="900">$</text>
      </g>

      {/* 3D Gold Coin: Pound (£) Bottom Left */}
      <g transform="translate(18, 54)">
        <circle cx="25" cy="26" r="22" fill="url(#v2GoldCoinEdge)" />
        <circle cx="22" cy="22" r="22" fill="url(#v2GoldCoinFace)" stroke="#FEF9C3" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="17" fill="none" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
        <text x="22" y="30" textAnchor="middle" fill="#854D0E" fontSize="21" fontWeight="900">£</text>
      </g>

      {/* 3D Gold Coin: Euro (€) Center */}
      <g transform="translate(76, 38)">
        <circle cx="25" cy="26" r="22" fill="url(#v2GoldCoinEdge)" />
        <circle cx="22" cy="22" r="22" fill="url(#v2GoldCoinFace)" stroke="#FEF9C3" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="17" fill="none" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
        <text x="22" y="30" textAnchor="middle" fill="#854D0E" fontSize="21" fontWeight="900">€</text>
      </g>

      {/* 3D Gold Coin: Turkish Lira (₺) Bottom Right */}
      <g transform="translate(112, 60)">
        <circle cx="25" cy="26" r="22" fill="url(#v2GoldCoinEdge)" />
        <circle cx="22" cy="22" r="22" fill="url(#v2GoldCoinFace)" stroke="#FEF9C3" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="17" fill="none" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
        <text x="22" y="30" textAnchor="middle" fill="#854D0E" fontSize="21" fontWeight="900">₺</text>
      </g>
    </svg>
  </div>
);

export const WorldClock3DIllustration: React.FC = () => (
  <div className="relative w-36 sm:w-44 h-32 sm:h-36 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 165 135" className="w-full h-full drop-shadow-xl overflow-visible" aria-hidden="true">
      {/* Glowing Halo */}
      <circle cx="88" cy="66" r="52" fill="#5EEAD4" opacity="0.2" />
      {/* 3D Earth */}
      <circle cx="88" cy="66" r="44" fill="url(#v2EarthSphere)" />
      <path d="M62 42 Q82 32 96 46 T84 78 Q64 72 62 42 Z" fill="#4ADE80" opacity="0.9" />
      <path d="M100 50 Q120 46 124 68 T106 94 Q94 80 100 50 Z" fill="#22C55E" opacity="0.9" />

      {/* Flight Arc Across Globe */}
      <path
        d="M 32 78 Q 88 18 142 62"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeDasharray="5 4"
      />
      {/* 3D White Airplanes */}
      <g transform="translate(44, 48) rotate(-25)">
        <path d="M0 8 L16 0 L11 13 L7 8 Z" fill="#FFFFFF" />
      </g>
      <g transform="translate(120, 42) rotate(22)">
        <path d="M0 8 L16 0 L11 13 L7 8 Z" fill="#FFFFFF" />
      </g>
    </svg>
  </div>
);

export const Suitcases3DIllustration: React.FC<{ progress?: number }> = () => (
  <div className="relative w-40 sm:w-48 h-32 sm:h-36 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 190 140" className="w-full h-full drop-shadow-xl overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="v2TealBag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="v2BlueBag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="v2AmberBag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* 1. Large Turquoise Suitcase (Back Right) */}
      <g transform="translate(104, 6)">
        <path d="M22 18 V4 H46 V18" fill="none" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="18" y="2" width="32" height="5" rx="2.5" fill="#1E293B" />
        <rect x="4" y="18" width="60" height="92" rx="12" fill="url(#v2TealBag)" stroke="#99F6E4" strokeWidth="1.5" />
        <line x1="20" y1="28" x2="20" y2="100" stroke="#CCFBF1" strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />
        <line x1="34" y1="28" x2="34" y2="100" stroke="#CCFBF1" strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />
        <line x1="48" y1="28" x2="48" y2="100" stroke="#CCFBF1" strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />
        {/* Travel Stickers */}
        <rect x="38" y="34" width="16" height="11" rx="2" fill="#FEF08A" transform="rotate(12 46 39)" />
        <circle cx="24" cy="56" r="7" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.2" />
        <rect x="36" y="70" width="15" height="10" rx="2" fill="#F472B6" transform="rotate(-8 43 75)" />
        <circle cx="16" cy="114" r="5" fill="#1E293B" />
        <circle cx="52" cy="114" r="5" fill="#1E293B" />
      </g>

      {/* 2. Medium Sky-Blue Suitcase (Middle) */}
      <g transform="translate(56, 24)">
        <path d="M18 16 V4 H38 V16" fill="none" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <rect x="15" y="2" width="26" height="4.5" rx="2" fill="#1E293B" />
        <rect x="4" y="16" width="50" height="74" rx="10" fill="url(#v2BlueBag)" stroke="#BAE6FD" strokeWidth="1.5" />
        <line x1="17" y1="24" x2="17" y2="82" stroke="#E0F2FE" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <line x1="29" y1="24" x2="29" y2="82" stroke="#E0F2FE" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <line x1="41" y1="24" x2="41" y2="82" stroke="#E0F2FE" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <rect x="14" y="34" width="14" height="10" rx="2" fill="#4ADE80" transform="rotate(-10 21 39)" />
        <rect x="30" y="52" width="14" height="10" rx="2" fill="#FDE047" transform="rotate(8 37 57)" />
        <circle cx="14" cy="94" r="4.5" fill="#1E293B" />
        <circle cx="44" cy="94" r="4.5" fill="#1E293B" />
      </g>

      {/* 3. Small Cabin Suitcase (Front Left) */}
      <g transform="translate(12, 42)">
        <path d="M16 14 V4 H34 V14" fill="none" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <rect x="13" y="2" width="24" height="4" rx="2" fill="#1E293B" />
        <rect x="2" y="14" width="46" height="60" rx="10" fill="url(#v2AmberBag)" stroke="#FED7AA" strokeWidth="1.5" />
        <line x1="15" y1="22" x2="15" y2="66" stroke="#FFEDD5" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <line x1="25" y1="22" x2="25" y2="66" stroke="#FFEDD5" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <line x1="35" y1="22" x2="35" y2="66" stroke="#FFEDD5" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        <rect x="10" y="26" width="13" height="9" rx="2" fill="#FEF08A" transform="rotate(-8 16 30)" />
        <circle cx="32" cy="48" r="6" fill="#2DD4BF" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="12" cy="78" r="4" fill="#1E293B" />
        <circle cx="38" cy="78" r="4" fill="#1E293B" />
      </g>
    </svg>
  </div>
);

export const NomadIsland3DIllustration: React.FC = () => (
  <div className="relative w-36 h-28 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 155 100" className="w-full h-full drop-shadow-md" aria-hidden="true">
      <ellipse cx="76" cy="82" rx="64" ry="14" fill="#2DD4BF" opacity="0.35" />
      <ellipse cx="76" cy="76" rx="48" ry="12" fill="#A7F3D0" />
      <ellipse cx="76" cy="73" rx="42" ry="10" fill="#34D399" />
      <path d="M106 70 Q114 44 102 24" fill="none" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
      <path d="M102 24 Q122 18 128 28" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
      <path d="M102 24 Q84 16 78 28" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
      <g transform="translate(42, 34)">
        <rect x="4" y="0" width="44" height="28" rx="4" fill="#06283D" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="8" y="4" width="36" height="20" rx="2" fill="#0EA5E9" opacity="0.85" />
        <path d="M0 28 H52 L58 35 H-6 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
      </g>
    </svg>
  </div>
);

export const LifebuoySOS3DIllustration: React.FC = () => (
  <div className="relative w-32 h-28 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-md" aria-hidden="true">
      <circle cx="48" cy="52" r="34" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      <path d="M36 20 A34 34 0 0 1 60 20 L55 34 A18 18 0 0 0 41 34 Z" fill="#EF4444" />
      <path d="M36 84 A34 34 0 0 0 60 84 L55 70 A18 18 0 0 1 41 70 Z" fill="#EF4444" />
      <path d="M16 40 A34 34 0 0 0 16 64 L30 59 A18 18 0 0 1 30 45 Z" fill="#EF4444" />
      <path d="M80 40 A34 34 0 0 1 80 64 L66 59 A18 18 0 0 0 66 45 Z" fill="#EF4444" />
      <circle cx="48" cy="52" r="17" fill="#E0F2FE" stroke="#94A3B8" strokeWidth="1.5" />
      <g transform="translate(66, 16)">
        <path d="M22 0 L42 8 V24 C42 38 22 48 22 48 C22 48 2 38 2 24 V8 Z" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M15 24 L20 29 L30 19" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  </div>
);

export const LocalApps3DIllustration: React.FC = () => (
  <div className="relative w-40 sm:w-48 h-32 sm:h-36 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 185 140" className="w-full h-full drop-shadow-xl overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="v2PhoneScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      {/* Tilted 3D Smartphone in Center */}
      <g transform="translate(62, 10) rotate(8)">
        <rect x="4" y="6" width="64" height="114" rx="14" fill="#042F2E" opacity="0.4" />
        <rect x="0" y="0" width="64" height="114" rx="14" fill="#0F172A" stroke="#67E8F9" strokeWidth="2" />
        <rect x="4" y="5" width="56" height="104" rx="11" fill="url(#v2PhoneScreen)" />
        {/* Dynamic Island Notch */}
        <rect x="22" y="9" width="20" height="4" rx="2" fill="#0F172A" />
        {/* 3D Mini Globe on Phone Screen */}
        <circle cx="32" cy="56" r="16" fill="#0284C7" stroke="#A7F3D0" strokeWidth="1.5" />
        <path d="M24 48 Q32 42 38 52 T32 66 Z" fill="#4ADE80" />
      </g>

      {/* Floating 3D App Tile 1: Grab (Top Left) */}
      <g transform="translate(22, 10) rotate(-8)">
        <rect x="2" y="4" width="40" height="40" rx="10" fill="#042F2E" opacity="0.25" />
        <rect x="0" y="0" width="40" height="40" rx="10" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#16A34A" fontSize="13" fontWeight="900">Grab</text>
      </g>

      {/* Floating 3D App Tile 2: Bolt (Middle Left) */}
      <g transform="translate(10, 56) rotate(-4)">
        <rect x="2" y="4" width="38" height="38" rx="10" fill="#042F2E" opacity="0.25" />
        <rect x="0" y="0" width="38" height="38" rx="10" fill="#10B981" stroke="#A7F3D0" strokeWidth="1.5" />
        <text x="19" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900">Bolt</text>
      </g>

      {/* Floating 3D App Tile 3: Airalo eSIM (Bottom Left) */}
      <g transform="translate(24, 96) rotate(4)">
        <rect x="2" y="4" width="38" height="36" rx="9" fill="#042F2E" opacity="0.25" />
        <rect x="0" y="0" width="38" height="36" rx="9" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.5" />
        <text x="19" y="18" textAnchor="middle" fill="#EA580C" fontSize="10" fontWeight="900">Airalo</text>
        <text x="19" y="29" textAnchor="middle" fill="#0F766E" fontSize="8" fontWeight="800">eSIM</text>
      </g>

      {/* Floating 3D App Tile 4: Booking (Top Right) */}
      <g transform="translate(128, 16) rotate(10)">
        <rect x="2" y="4" width="42" height="40" rx="10" fill="#042F2E" opacity="0.25" />
        <rect x="0" y="0" width="42" height="40" rx="10" fill="#1E3A8A" stroke="#93C5FD" strokeWidth="1.5" />
        <text x="21" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="900">Booking</text>
      </g>

      {/* Floating 3D App Tile 5: Sigorta (Bottom Right) */}
      <g transform="translate(116, 82) rotate(-6)">
        <rect x="2" y="4" width="42" height="40" rx="10" fill="#042F2E" opacity="0.25" />
        <rect x="0" y="0" width="42" height="40" rx="10" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.5" />
        <path d="M21 7 L31 11 V19 C31 26 21 30 21 30 C21 30 11 26 11 19 V11 Z" fill="#2563EB" />
        <text x="21" y="37" textAnchor="middle" fill="#1E293B" fontSize="8" fontWeight="900">Sigorta</text>
      </g>
    </svg>
  </div>
);
