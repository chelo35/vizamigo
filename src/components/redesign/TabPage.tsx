import React from 'react';
import { FlyingBanner } from './FlyingBanner';

export interface PageSection {
  id: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

interface Props {
  eyebrow: string;
  title: string;
  sub: string;
  words: string[];
  sections?: PageSection[];
  active?: string;
  onSelect?: (id: string) => void;
  children: React.ReactNode;
}

/**
 * Ana sayfa dışındaki sekmelerin ortak iskeleti:
 * deniz-gökyüzü şeridi (uçak + pankart) → bölüm kartları → seçilen bölümün içeriği.
 */
export const TabPage: React.FC<Props> = ({ eyebrow, title, sub, words, sections, active, onSelect, children }) => {
  const current = sections?.find((s) => s.id === active);
  return (
    <div className="rd-home rd-page">
      <section className="rd-band">
        <div className="rd-sky" aria-hidden="true" />
        <FlyingBanner className="f1 rd-band-flight" words={words} />
        <div className="rd-band-sea" aria-hidden="true">
          <div className="rd-wave w1"><svg viewBox="0 0 2400 240" preserveAspectRatio="none"><path d="M0 110 C 150 70 300 150 600 110 C 900 70 1050 150 1200 110 C 1350 70 1500 150 1800 110 C 2100 70 2250 150 2400 110 V240 H0 Z" /></svg></div>
          <div className="rd-wave w3"><svg viewBox="0 0 2400 240" preserveAspectRatio="none"><path d="M0 170 C 150 150 300 190 600 170 C 900 150 1050 190 1200 170 C 1350 150 1500 190 1800 170 C 2100 150 2250 190 2400 170 V240 H0 Z" /></svg></div>
        </div>
        <div className="rd-band-in">
          <span className="rd-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{sub}</p>
        </div>
      </section>

      <div className="rd-wrap rd-page-body">
        {sections && sections.length > 1 && (
          <div className="rd-segs" role="tablist" aria-label={title} style={{ ['--n' as string]: sections.length } as React.CSSProperties}>
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={s.id === active}
                className="rd-tile rd-seg"
                onClick={() => onSelect?.(s.id)}
              >
                <span className="rd-tile-ic">{s.icon}</span>
                <span className="rd-tile-t">{s.label}</span>
                <span className="rd-tile-s">{s.desc}</span>
              </button>
            ))}
          </div>
        )}
        <div className="rd-page-panel" role={sections ? 'tabpanel' : undefined} key={active}>
          {current && sections && sections.length > 1 && (
            <div className="rd-page-panel-h">
              <span className="rd-page-dot" aria-hidden="true" />
              <h2>{current.label}</h2>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
