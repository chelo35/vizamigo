import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../data/i18n';
import { FlyingBanner } from './FlyingBanner';

interface Chip {
  label: string;
  onClick: () => void;
}

interface Props {
  onSearch: (q: string) => void;
  chips?: Chip[];
  /** Yeni akıllı arama kutusu; verilirse eski form yerine bu çizilir. */
  searchSlot?: React.ReactNode;
}

/**
 * Açılış sahnesi: gündüz deniz + güneş, koyu temada gün batımı + ay.
 * Tüm hareket yalnızca transform / opacity ile (GPU), görsel dosya yok.
 */
export const SeaHero: React.FC<Props> = ({ onSearch, chips = [], searchSlot }) => {
  const { l } = useI18n();
  const [q, setQ] = useState('');
  const heroRef = useRef<HTMLElement>(null);

  // Masaüstünde imleçle hafif paralaks
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layers = Array.from(hero.querySelectorAll<HTMLElement>('[data-par]'));
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const step = () => {
      raf = 0;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      layers.forEach((el) => {
        const k = Number(el.dataset.par);
        el.style.translate = `${cx * k}px ${cy * k * 0.6}px`;
      });
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) raf = requestAnimationFrame(step);
    };
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(step);
    };
    hero.addEventListener('pointermove', move);
    return () => {
      hero.removeEventListener('pointermove', move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const glints = React.useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({ left: (i * 37) % 96 + 2, top: (i * 53) % 100, delay: ((i * 7) % 32) / 10, w: 8 + ((i * 11) % 16) })),
    []
  );

  return (
    <section ref={heroRef} className="rd-hero" aria-label={l('Arama', 'Search', 'Suche', 'Búsqueda', 'Поиск')}>
      <div className="rd-sky" aria-hidden="true" />
      <div className="rd-orb" data-par="12" aria-hidden="true" />
      <div className="rd-cloud c1" data-par="22" aria-hidden="true" />
      <div className="rd-cloud c2" data-par="16" aria-hidden="true" />
      <div className="rd-cloud c3" data-par="9" aria-hidden="true" />
      <svg className="rd-trail" viewBox="0 0 1600 600" preserveAspectRatio="none" aria-hidden="true">
        <path d="M -60 300 C 300 120, 700 80, 1100 170 S 1500 260, 1700 200" />
      </svg>
      <FlyingBanner className="f1" words={['Thailand', 'Japan', 'USA', 'France']} />
      <FlyingBanner className="f2" words={['Italy', 'Türkiye', 'Spain', 'Greece']} />
      <div className="rd-gulls" aria-hidden="true">
        <span className="g1"><svg viewBox="0 0 34 14" width="30" height="12"><path d="M1 11 Q8 1 17 10 Q26 1 33 11" stroke="#3A4A55" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <span className="g2"><svg viewBox="0 0 34 14" width="22" height="9"><path d="M1 11 Q8 1 17 10 Q26 1 33 11" stroke="#3A4A55" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <span className="g3"><svg viewBox="0 0 34 14" width="26" height="11"><path d="M1 11 Q8 1 17 10 Q26 1 33 11" stroke="#3A4A55" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      </div>
      <div className="rd-sea" aria-hidden="true">
        <div className="rd-wave w1"><svg viewBox="0 0 2400 240" preserveAspectRatio="none"><path d="M0 110 C 150 70 300 150 600 110 C 900 70 1050 150 1200 110 C 1350 70 1500 150 1800 110 C 2100 70 2250 150 2400 110 V240 H0 Z" /></svg></div>
        <div className="rd-wave w2"><svg viewBox="0 0 2400 240" preserveAspectRatio="none"><path d="M0 140 C 200 100 400 180 600 140 C 800 100 1000 180 1200 140 C 1400 100 1600 180 1800 140 C 2000 100 2200 180 2400 140 V240 H0 Z" /></svg></div>
        <div className="rd-seafx" aria-hidden="true">
          <div className="rd-dolphin d1"><svg viewBox="0 0 64 30" width="58" height="27"><path d="M4 18c8-9 22-13 36-11 4-4 9-5 12-4-2 2-3 4-3 6 6 2 10 5 12 9-5-1-9-1-12 0 1 3 0 6-3 8-1-3-3-5-6-6-10 3-24 3-36 0z" fill="#3E6E86" /><path d="M10 19c10 3 24 3 34-1-8 5-24 6-34 1z" fill="#CFE6EE" /><circle cx="49" cy="12" r="1.3" fill="#fff" /></svg></div>
          <div className="rd-dolphin d2"><svg viewBox="0 0 64 30" width="46" height="22"><path d="M4 18c8-9 22-13 36-11 4-4 9-5 12-4-2 2-3 4-3 6 6 2 10 5 12 9-5-1-9-1-12 0 1 3 0 6-3 8-1-3-3-5-6-6-10 3-24 3-36 0z" fill="#3E6E86" /><path d="M10 19c10 3 24 3 34-1-8 5-24 6-34 1z" fill="#CFE6EE" /><circle cx="49" cy="12" r="1.3" fill="#fff" /></svg></div>
          <div className="rd-sail">
            <svg viewBox="0 0 60 56" width="64" height="60">
              <path d="M30 4v38" stroke="#5B3A29" strokeWidth="2" />
              <path d="M31 6l18 32H31z" fill="#FFFFFF" />
              <path d="M29 10L14 38h15z" fill="#F28C6B" />
              <path d="M8 42h44l-6 9H14z" fill="#6B3F2A" />
              <path d="M10 44h40" stroke="#E7B98A" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="rd-jet">
            <svg viewBox="0 0 96 34" width="108" height="38">
              <path d="M2 27c10-3 20-3 30 0M6 31c10-2 18-2 26 0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".85" />
              <path d="M34 26h44c6 0 12-3 14-7H44l-6 3z" fill="#FFFFFF" />
              <path d="M44 19h48c-1 2-3 4-6 5H40z" fill="#E8505B" />
              <circle cx="62" cy="9" r="3.6" fill="#2F2A3A" />
              <path d="M60 13l-4 8h8l4-6z" fill="#F7B733" />
              <path d="M64 14l8 2" stroke="#2F2A3A" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="rd-surf">
            <svg viewBox="0 0 48 52" width="44" height="48">
              <circle cx="24" cy="9" r="4.4" fill="#3A2A2A" />
              <path d="M24 14l-3 12 6 2 2-8 6 4" stroke="#3A2A2A" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M21 26l-7 10M27 28l3 9" stroke="#3A2A2A" strokeWidth="3.6" strokeLinecap="round" />
              <path d="M24 16l-10 4" stroke="#3A2A2A" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="22" cy="40" rx="18" ry="3.4" fill="#FFD36B" transform="rotate(-6 22 40)" />
              <path d="M6 44c6 3 26 3 36-2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".8" />
            </svg>
          </div>
        </div>
        <div className="rd-glitter">
          {glints.map((g, i) => (
            <i key={i} style={{ left: `${g.left}%`, top: `${g.top}%`, animationDelay: `${g.delay}s`, width: g.w }} />
          ))}
        </div>
        <div className="rd-wave w3"><svg viewBox="0 0 2400 240" preserveAspectRatio="none"><path d="M0 180 C 150 160 300 200 600 180 C 900 160 1050 200 1200 180 C 1350 160 1500 200 1800 180 C 2100 160 2250 200 2400 180 V240 H0 Z" /></svg></div>
      </div>
      <div className="rd-hero-in">
        <span className="rd-eyebrow">{l('Pasaport · Vize · Yolculuk', 'Passport · Visa · Travel', 'Pass · Visum · Reise', 'Pasaporte · Visado · Viaje', 'Паспорт · Виза · Поездка')}</span>
        <h1>{l('Nereye gidiyoruz?', 'Where to next?', 'Wohin geht’s?', '¿A dónde vamos?', 'Куда летим?')}</h1>
        <p>
          {l(
            '199 ülkenin vize kuralı, kalış süresi ve yolculuk hazırlığı tek panoda. Resmî kaynaklı, tarihli, beş dilde.',
            'Visa rules, stay limits and trip prep for 199 countries in one place. Officially sourced, dated, in five languages.',
            'Visaregeln, Aufenthaltsdauer und Reisevorbereitung für 199 Länder an einem Ort. Amtlich belegt, datiert, in fünf Sprachen.',
            'Reglas de visado, estancias y preparación para 199 países en un solo lugar. Fuentes oficiales, fechadas, en cinco idiomas.',
            'Визовые правила, сроки пребывания и подготовка к поездке для 199 стран в одном месте. Официальные источники, на пяти языках.'
          )}
        </p>
        {searchSlot ? searchSlot : (
        <form
          className="rd-search"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(q.trim());
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <label htmlFor="rd-q" className="sr-only">{l('Ülke ara', 'Search a country', 'Land suchen', 'Buscar país', 'Найти страну')}</label>
          <input
            id="rd-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={l('Tayland, Japonya, Schengen…', 'Thailand, Japan, Schengen…', 'Thailand, Japan, Schengen…', 'Tailandia, Japón, Schengen…', 'Таиланд, Япония, Шенген…')}
            autoComplete="off"
          />
          <button type="submit" className="rd-btn">{l('Ara', 'Search', 'Suchen', 'Buscar', 'Найти')}</button>
        </form>
        )}
        {chips.length > 0 && (
          <div className="rd-chips">
            {chips.map((c) => (
              <button key={c.label} type="button" onClick={c.onClick}>{c.label}</button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
