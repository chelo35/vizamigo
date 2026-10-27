import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useI18n } from '../../data/i18n';

export interface HubTab {
  id: string;
  label: string;
  render: () => React.ReactNode;
}

export interface Hub {
  id: string;
  title: string;
  sub: string;
  badge?: string;
  icon: React.ReactNode;
  tabs: HubTab[];
}

interface Props {
  hubs: Hub[];
  openRequest?: { id: string; tab?: string; nonce: number } | null;
}

const useCols = () => {
  const [cols, setCols] = useState(() => (typeof window !== 'undefined' && window.innerWidth >= 900 ? 3 : 2));
  useEffect(() => {
    const on = () => setCols(window.innerWidth >= 900 ? 3 : 2);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return cols;
};

/** Pano kartları: dokununca tam altında sekmeli bir alan açılır, uçak süzülür. */
export const HubGrid: React.FC<Props> = ({ hubs, openRequest }) => {
  const { l } = useI18n();
  const cols = useCols();
  const [openId, setOpenId] = useState<string | null>(null);
  const [tab, setTab] = useState<string>('');
  const [flyKey, setFlyKey] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const open = (id: string, t?: string) => {
    const hub = hubs.find((h) => h.id === id);
    if (!hub) return;
    if (openId !== id) setFlyKey((k) => k + 1);
    setOpenId(id);
    setTab(t || hub.tabs[0]?.id || '');
    window.setTimeout(() => {
      const el = panelRef.current;
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 88;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }, 80);
  };

  useEffect(() => {
    if (openRequest) open(openRequest.id, openRequest.tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRequest?.nonce]);

  const idx = hubs.findIndex((h) => h.id === openId);
  const panelOrder = idx >= 0 ? Math.ceil((idx + 1) / cols) * cols : 999;
  const hub = idx >= 0 ? hubs[idx] : null;
  const active = hub?.tabs.find((t) => t.id === tab) || hub?.tabs[0];

  return (
    <div className="rd-grid">
      {hubs.map((h, i) => (
        <button
          key={h.id}
          type="button"
          className="rd-tile"
          style={{ order: i + 1 }}
          aria-expanded={openId === h.id}
          aria-controls="rd-panel"
          onClick={() => (openId === h.id ? setOpenId(null) : open(h.id))}
        >
          {h.badge && <span className="rd-tile-badge">{h.badge}</span>}
          <span className="rd-tile-ic">{h.icon}</span>
          <span className="rd-tile-t">{h.title}</span>
          <span className="rd-tile-s">{h.sub}</span>
        </button>
      ))}
      <div id="rd-panel" ref={panelRef} className={`rd-panel ${hub ? 'open' : ''}`} style={{ order: panelOrder }} role="region" aria-label={hub?.title}>
        <div>
          {hub && active && (
            <div className="rd-pbox">
              <svg key={flyKey} className="rd-sweep" viewBox="0 0 36 36" aria-hidden="true">
                <path d="M2 18 L 26 13 L 33 15 L 26 19 L 2 22 L 9 19 L 5 17 Z M 12 17 L 7 8 L 11 8 L 19 15 Z M 12 19 L 7 28 L 11 28 L 19 21 Z" fill="currentColor" />
              </svg>
              <div className="rd-ph">
                <h3>{hub.title}</h3>
                <button type="button" className="rd-close" onClick={() => setOpenId(null)} aria-label={l('Panoyu kapat', 'Close panel', 'Schließen', 'Cerrar', 'Закрыть')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
              </div>
              <div className="rd-tabs" role="tablist">
                {hub.tabs.map((t) => (
                  <button key={t.id} type="button" role="tab" aria-selected={t.id === active.id} onClick={() => setTab(t.id)}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="rd-pbody" role="tabpanel">
                <Suspense fallback={<div className="rd-skel rd-skel-lg" />}>{active.render()}</Suspense>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
