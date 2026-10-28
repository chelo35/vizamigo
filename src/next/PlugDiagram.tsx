import React from 'react';

/** Fiş tipinin önden basit çizimi (A–N). Ölçüler gerçek değil, ayırt etmeye yeter. */
const PINS: Record<string, React.ReactNode> = {
  A: <><rect x="21" y="22" width="5" height="18" rx="1.5" /><rect x="38" y="22" width="5" height="18" rx="1.5" /></>,
  B: <><rect x="21" y="18" width="5" height="16" rx="1.5" /><rect x="38" y="18" width="5" height="16" rx="1.5" /><circle cx="32" cy="44" r="4" /></>,
  C: <><circle cx="23" cy="32" r="4.5" /><circle cx="41" cy="32" r="4.5" /></>,
  D: <><circle cx="32" cy="20" r="5.5" /><circle cx="22" cy="40" r="4.5" /><circle cx="42" cy="40" r="4.5" /></>,
  E: <><circle cx="23" cy="34" r="4.5" /><circle cx="41" cy="34" r="4.5" /><circle cx="32" cy="18" r="3.5" fill="none" strokeWidth="2.5" /></>,
  F: <><circle cx="23" cy="32" r="4.5" /><circle cx="41" cy="32" r="4.5" /><rect x="29" y="9" width="6" height="5" rx="1" /><rect x="29" y="50" width="6" height="5" rx="1" /></>,
  G: <><rect x="29" y="14" width="6" height="14" rx="1.5" /><rect x="15" y="38" width="13" height="6" rx="1.5" /><rect x="36" y="38" width="13" height="6" rx="1.5" /></>,
  H: <><rect x="16" y="20" width="5" height="15" rx="1.5" transform="rotate(-30 18.5 27.5)" /><rect x="43" y="20" width="5" height="15" rx="1.5" transform="rotate(30 45.5 27.5)" /><rect x="29.5" y="38" width="5" height="14" rx="1.5" /></>,
  I: <><rect x="17" y="16" width="5" height="15" rx="1.5" transform="rotate(30 19.5 23.5)" /><rect x="42" y="16" width="5" height="15" rx="1.5" transform="rotate(-30 44.5 23.5)" /><rect x="29.5" y="36" width="5" height="14" rx="1.5" /></>,
  J: <><circle cx="21" cy="36" r="4.5" /><circle cx="43" cy="36" r="4.5" /><circle cx="32" cy="22" r="4.5" /></>,
  K: <><circle cx="21" cy="28" r="4.5" /><circle cx="43" cy="28" r="4.5" /><path d="M26 46 h12 v-2 a6 6 0 0 0 -12 0 z" /></>,
  L: <><circle cx="18" cy="32" r="4" /><circle cx="32" cy="32" r="4" /><circle cx="46" cy="32" r="4" /></>,
  M: <><circle cx="32" cy="18" r="6.5" /><circle cx="21" cy="41" r="5" /><circle cx="43" cy="41" r="5" /></>,
  N: <><circle cx="21" cy="36" r="4" /><circle cx="43" cy="36" r="4" /><circle cx="32" cy="24" r="4" /></>
};

export const PlugDiagram: React.FC<{ type: string; label?: string }> = ({ type, label }) => {
  const t = type.trim().toUpperCase().replace(/^TYPE\s*/, '').charAt(0);
  const pins = PINS[t];
  if (!pins) return null;
  return (
    <figure className="vz-plug">
      <svg viewBox="0 0 64 64" role="img" aria-label={label || `Type ${t}`}>
        <rect x="4" y="4" width="56" height="56" rx={t === 'G' ? 8 : 20} className="vz-plug-face" />
        <g className="vz-plug-pins">{pins}</g>
      </svg>
      <figcaption>{t}</figcaption>
    </figure>
  );
};
