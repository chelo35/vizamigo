import React from 'react';

interface SocketPlugVectorProps {
  type: string; // e.g. 'C', 'F', 'G', 'A', 'B', 'D', 'I', 'J', 'L'
  className?: string;
  size?: number;
}

export const SocketPlugVector: React.FC<SocketPlugVectorProps> = ({
  type,
  className = '',
  size = 56
}) => {
  const cleanType = type.trim().toUpperCase();

  // Render SVG socket faceplate based on international electrical standard
  const renderSocketInterior = () => {
    switch (cleanType) {
      // Type C: Europlug - 2 round pins (4.0 - 4.8 mm diameter, 19 mm separation)
      case 'C':
        return (
          <g>
            <circle cx="18" cy="28" r="4" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="38" cy="28" r="4" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
          </g>
        );

      // Type F: Schuko (German standard) - 2 round pins + top & bottom ground clips
      case 'F':
      case 'E':
        return (
          <g>
            {/* Round indentation plate */}
            <circle cx="28" cy="28" r="22" className="fill-slate-100 dark:fill-slate-800/80 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
            {/* Pin holes */}
            <circle cx="18" cy="28" r="4" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="38" cy="28" r="4" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            {/* Top ground clip */}
            <rect x="25.5" y="7" width="5" height="5" rx="1" className="fill-amber-500/80 stroke-amber-600" strokeWidth="0.8" />
            {/* Bottom ground clip */}
            <rect x="25.5" y="44" width="5" height="5" rx="1" className="fill-amber-500/80 stroke-amber-600" strokeWidth="0.8" />
          </g>
        );

      // Type G: British 3-pin standard (UK, Ireland, Cyprus, Malta, UAE, Singapore, Malaysia, etc.)
      case 'G':
        return (
          <g>
            {/* Top ground pin (vertical rectangle) */}
            <rect x="25" y="11" width="6" height="12" rx="1.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            {/* Bottom-left line pin (horizontal rectangle) */}
            <rect x="11" y="32" width="11" height="6" rx="1.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            {/* Bottom-right neutral pin (horizontal rectangle) */}
            <rect x="34" y="32" width="11" height="6" rx="1.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
          </g>
        );

      // Type A: North American / Japanese 2-flat-blade ungrounded
      case 'A':
        return (
          <g>
            <rect x="18" y="19" width="4" height="18" rx="1" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <rect x="34" y="19" width="4" height="18" rx="1" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
          </g>
        );

      // Type B: North American 3-pin grounded (2 flat blades + round ground)
      case 'B':
        return (
          <g>
            <rect x="18" y="16" width="4" height="16" rx="1" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <rect x="34" y="16" width="4" height="16" rx="1" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="28" cy="38" r="3.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
          </g>
        );

      // Type I: Australia, New Zealand, China, Argentina (2 angled blades in V shape + ground)
      case 'I':
        return (
          <g>
            {/* Left angled slot */}
            <rect x="16" y="18" width="4.5" height="13" rx="1" transform="rotate(30 18 24)" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            {/* Right angled slot */}
            <rect x="35.5" y="18" width="4.5" height="13" rx="1" transform="rotate(-30 38 24)" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            {/* Bottom vertical grounding slot */}
            <rect x="25.5" y="34" width="5" height="11" rx="1" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
          </g>
        );

      // Type J: Swiss standard (3 round pins in offset flattened hexagon)
      case 'J':
        return (
          <g>
            <circle cx="16" cy="28" r="3.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="40" cy="28" r="3.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="28" cy="23" r="3.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
          </g>
        );

      // Type L: Italian 3-in-line round pins
      case 'L':
        return (
          <g>
            <circle cx="16" cy="28" r="3.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="3.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="40" cy="28" r="3.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
          </g>
        );

      // Type D / M: India / South Africa 3 round pins in triangle
      case 'D':
      case 'M':
        return (
          <g>
            <circle cx="28" cy="17" r={cleanType === 'M' ? '5' : '4.5'} className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="17" cy="35" r={cleanType === 'M' ? '4.5' : '3.8'} className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="39" cy="35" r={cleanType === 'M' ? '4.5' : '3.8'} className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
          </g>
        );

      // Fallback universal socket
      default:
        return (
          <g>
            <circle cx="20" cy="28" r="3.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="36" cy="28" r="3.5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
            <circle cx="28" cy="20" r="3" className="fill-slate-800 dark:fill-slate-900 stroke-slate-600 dark:stroke-slate-500" strokeWidth="1.5" />
          </g>
        );
    }
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-sm select-none"
      >
        {/* Outer socket faceplate / bezel */}
        <rect
          x="2"
          y="2"
          width="52"
          height="52"
          rx="12"
          className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-700"
          strokeWidth="2"
        />
        {/* Inner recessed socket boundary */}
        <circle
          cx="28"
          cy="28"
          r="23"
          className="fill-slate-50/70 dark:fill-slate-800/50 stroke-slate-200/80 dark:stroke-slate-700/80"
          strokeWidth="1.2"
        />
        {/* Render pin holes according to type */}
        {renderSocketInterior()}
      </svg>
      <span className="mt-1 font-mono text-[10px] font-extrabold text-slate-700 dark:text-slate-300">
        Tip {cleanType}
      </span>
    </div>
  );
};
