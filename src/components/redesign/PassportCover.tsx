import React, { useRef } from 'react';
import { getCover } from './passportCovers';
import { getCountryName } from '../../data/passportData';

interface Props {
  code: string;
  size?: 'sm' | 'lg';
  onClick?: () => void;
}

/** Seçili pasaporta göre renk ve dil değiştiren kapak; imleçle hafif 3B eğilir. */
export const PassportCover: React.FC<Props> = ({ code, size = 'lg', onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const cover = getCover(code, getCountryName(code, 'en'));
  const tilt = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 14}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div className={`rd-pp-stage rd-pp-${size}`}>
      <button
        ref={ref}
        type="button"
        className="rd-pp"
        onClick={onClick}
        onPointerMove={tilt}
        onPointerLeave={reset}
        aria-label={`${getCountryName(code)} – ${cover.line2}`}
        style={{ background: `linear-gradient(135deg, ${cover.colors.from} 0%, ${cover.colors.to} 100%)`, color: cover.colors.ink }}
      >
        <span className="rd-pp-l1" dir={cover.rtl ? 'rtl' : undefined}>{cover.line1}</span>
        <svg className="rd-pp-emb" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <ellipse cx="60" cy="60" rx="20" ry="44" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 60h88M22 38h76M22 82h76" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" />
        </svg>
        <span className="rd-pp-l2" dir={cover.rtl ? 'rtl' : undefined}>{cover.line2}</span>
        <span className="rd-pp-chip" aria-hidden="true" />
      </button>
    </div>
  );
};
