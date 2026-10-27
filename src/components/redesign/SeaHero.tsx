import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../data/i18n';

interface Chip {
  label: string;
  onClick: () => void;
}

interface Props {
  onSearch: (q: string) => void;
  chips?: Chip[];
}

/**
 * Açılış sahnesi: gündüz deniz + güneş, koyu temada gün batımı + ay.
 * Tüm hareket yalnızca transform / opacity ile (GPU), görsel dosya yok.
 */
export const SeaHero: React.FC<Props> = ({ onSearch, chips = [] }) => {
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
      <div className="rd-plane" aria-hidden="true">
        <svg viewBox="0 0 36 36" width="34" height="34">
          <path d="M2 18 L 26 13 L 33 15 L 26 19 L 2 22 L 9 19 L 5 17 Z M 12 17 L 7 8 L 11 8 L 19 15 Z M 12 19 L 7 28 L 11 28 L 19 21 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="rd-sea" aria-hidden="true">
        <div className="rd-wave w1"><svg viewBox="0 0 2400 240" preserveAspectRatio="none"><path d="M0 110 C 150 70 300 150 600 110 C 900 70 1050 150 1200 110 C 1350 70 1500 150 1800 110 C 2100 70 2250 150 2400 110 V240 H0 Z" /></svg></div>
        <div className="rd-wave w2"><svg viewBox="0 0 2400 240" preserveAspectRatio="none"><path d="M0 140 C 200 100 400 180 600 140 C 800 100 1000 180 1200 140 C 1400 100 1600 180 1800 140 C 2000 100 2200 180 2400 140 V240 H0 Z" /></svg></div>
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
