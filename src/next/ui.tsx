import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Icon, IconName } from './Icon';
import { useI18n } from '../data/i18n';
import { FlyingBanner } from '../components/redesign/FlyingBanner';
import { CountryItem, getCategoryBadgeLabel } from '../data/passportData';

/* ------------------------------------------------------------------ */
/* Temel parçalar                                                      */
/* ------------------------------------------------------------------ */

type BtnVariant = 'primary' | 'soft' | 'ghost' | 'link';
export const Btn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; icon?: IconName; iconRight?: IconName; small?: boolean; block?: boolean }> = ({
  variant = 'primary', icon, iconRight, small, block, className = '', children, ...rest
}) => (
  <button type="button" {...rest} className={`vz-btn vz-btn-${variant}${small ? ' sm' : ''}${block ? ' block' : ''} ${className}`}>
    {icon && <Icon name={icon} size={small ? 16 : 18} duo={false} />}
    {children && <span>{children}</span>}
    {iconRight && <Icon name={iconRight} size={small ? 16 : 18} duo={false} />}
  </button>
);

export const LinkBtn: React.FC<{ href: string; children: React.ReactNode; variant?: BtnVariant; icon?: IconName; small?: boolean }> = ({ href, children, variant = 'soft', icon = 'external', small }) => (
  <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={`vz-btn vz-btn-${variant}${small ? ' sm' : ''}`}>
    <span>{children}</span>
    <Icon name={icon} size={small ? 15 : 17} duo={false} />
  </a>
);

export const Chip: React.FC<{ on?: boolean; onClick?: () => void; children: React.ReactNode; count?: number; icon?: IconName }> = ({ on, onClick, children, count, icon }) => (
  <button type="button" className={`vz-chip${on ? ' on' : ''}`} aria-pressed={!!on} onClick={onClick}>
    {icon && <Icon name={icon} size={15} duo={false} />}
    <span>{children}</span>
    {typeof count === 'number' && <em>{count}</em>}
  </button>
);

export const Chips: React.FC<{ children: React.ReactNode; scroll?: boolean }> = ({ children, scroll }) => (
  <div className={`vz-chips${scroll ? ' scroll' : ''}`}>{children}</div>
);

export function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div className="vz-seg" role="tablist" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" role="tab" aria-selected={o.id === value} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export const Field: React.FC<{ label: string; htmlFor: string; hint?: string; children: React.ReactNode }> = ({ label, htmlFor, hint, children }) => (
  <div className="vz-field">
    <label htmlFor={htmlFor}>{label}</label>
    {children}
    {hint && <small>{hint}</small>}
  </div>
);

export const SearchInput: React.FC<{ id: string; value: string; onChange: (v: string) => void; placeholder: string; autoFocus?: boolean }> = ({ id, value, onChange, placeholder, autoFocus }) => (
  <div className="vz-searchbox">
    <Icon name="search" size={18} duo={false} />
    <label htmlFor={id} className="sr-only">{placeholder}</label>
    <input id={id} type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete="off" autoFocus={autoFocus} />
    {value && (
      <button type="button" onClick={() => onChange('')} aria-label="Temizle">
        <Icon name="close" size={16} duo={false} />
      </button>
    )}
  </div>
);

export const Card: React.FC<{ title?: string; eyebrow?: string; icon?: IconName; actions?: React.ReactNode; children: React.ReactNode; tone?: 'plain' | 'sea' | 'sun' | 'warn' | 'ok'; className?: string; id?: string }> = ({
  title, eyebrow, icon, actions, children, tone = 'plain', className = '', id
}) => (
  <section className={`vz-card tone-${tone} ${className}`} id={id}>
    {(title || eyebrow || actions) && (
      <header className="vz-card-h">
        {icon && <span className="vz-ic">{<Icon name={icon} size={20} />}</span>}
        <div className="vz-card-ht">
          {eyebrow && <span className="vz-eyebrow">{eyebrow}</span>}
          {title && <h3>{title}</h3>}
        </div>
        {actions && <div className="vz-card-a">{actions}</div>}
      </header>
    )}
    <div className="vz-card-b">{children}</div>
  </section>
);

export const Stat: React.FC<{ value: React.ReactNode; label: string; icon?: IconName; tone?: 'sea' | 'ok' | 'warn' | 'sun' }> = ({ value, label, icon, tone = 'sea' }) => (
  <div className={`vz-stat tone-${tone}`}>
    {icon && <span className="vz-ic sm"><Icon name={icon} size={18} /></span>}
    <b className={typeof value === 'string' && value.length > 16 ? 'long' : undefined}>{value}</b>
    <span>{label}</span>
  </div>
);

export const Row: React.FC<{ icon?: IconName; lead?: React.ReactNode; title: React.ReactNode; sub?: React.ReactNode; right?: React.ReactNode; onClick?: () => void; href?: string }> = ({ icon, lead, title, sub, right, onClick, href }) => {
  const inner = (
    <>
      {lead ? <span className="vz-row-lead">{lead}</span> : icon ? <span className="vz-ic sm"><Icon name={icon} size={18} /></span> : null}
      <span className="vz-row-b">
        <span className="vz-row-t">{title}</span>
        {sub && <span className="vz-row-s">{sub}</span>}
      </span>
      {right && <span className="vz-row-r">{right}</span>}
      {(onClick || href) && !right && <Icon name={href ? 'external' : 'next'} size={18} duo={false} className="vz-row-go" />}
    </>
  );
  if (href) return <a className="vz-row link" href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  if (onClick) return <button type="button" className="vz-row link" onClick={onClick}>{inner}</button>;
  return <div className="vz-row">{inner}</div>;
};

export const List: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="vz-list">{children}</div>;

export const Bullets: React.FC<{ items: string[]; tone?: 'sea' | 'warn' | 'ok' }> = ({ items, tone = 'sea' }) => (
  <ul className={`vz-bullets tone-${tone}`}>
    {items.filter(Boolean).map((t, i) => (
      <li key={i}>{t}</li>
    ))}
  </ul>
);

export const Tags: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="vz-tags">
    {items.filter(Boolean).map((t, i) => (
      <span key={i}>{t}</span>
    ))}
  </div>
);

export const Empty: React.FC<{ icon?: IconName; title: string; text?: string; action?: React.ReactNode; steps?: string[] }> = ({ icon = 'compass', title, text, action, steps }) => (
  <div className={`vz-empty${steps ? ' guide' : ''}`}>
    <span className="vz-ic lg"><Icon name={icon} size={28} /></span>
    <b>{title}</b>
    {text && <p>{text}</p>}
    {steps && (
      <ol className="vz-empty-steps">
        {steps.map((s, i) => (
          <li key={i}><span>{i + 1}</span>{s}</li>
        ))}
      </ol>
    )}
    {action}
  </div>
);

export const SecHead: React.FC<{ eyebrow?: string; title: string; action?: React.ReactNode; sub?: string; id?: string }> = ({ eyebrow, title, action, sub, id }) => (
  <div className="vz-sechead">
    <div>
      {eyebrow && <span className="vz-eyebrow">{eyebrow}</span>}
      <h2 id={id}>{title}</h2>
      {sub && <p className="vz-muted">{sub}</p>}
    </div>
    {action}
  </div>
);

export const Flag: React.FC<{ code: string; size?: 'sm' | 'md' | 'lg' }> = ({ code, size = 'md' }) => {
  const [bad, setBad] = useState(false);
  const c = (code || '').toLowerCase();
  const px = size === 'sm' ? 28 : size === 'lg' ? 52 : 36;
  return (
    <span className={`vz-flag ${size}`} aria-hidden="true">
      {bad || !c ? <b>{(code || '').toUpperCase()}</b> : <img src={`/flags/${c}.webp`} alt="" width={px} height={px} loading="lazy" decoding="async" onError={() => setBad(true)} />}
    </span>
  );
};

/* Vize rozeti: kategoriye göre tek tip renk */
export function visaTone(item?: CountryItem | null): 'ok' | 'sea' | 'sun' | 'warn' | 'mute' {
  if (!item) return 'mute';
  if (item.id || item.cat === 'free') return 'ok';
  if (item.cat === 'evisa' || item.cat === 'eta') return 'sea';
  if (item.cat === 'voa') return 'sun';
  if (item.cat === 'visa') return 'warn';
  return 'mute';
}
export const VisaBadge: React.FC<{ item?: CountryItem | null; big?: boolean }> = ({ item, big }) => {
  const { language } = useI18n();
  return <span className={`vz-badge tone-${visaTone(item)}${big ? ' big' : ''}`}>{getCategoryBadgeLabel(item || null, language)}</span>;
};

/* ------------------------------------------------------------------ */
/* Sayfa iskeleti: gökyüzü şeridi + özet + gövde                       */
/* ------------------------------------------------------------------ */

export const Page: React.FC<{
  eyebrow: string;
  title: string;
  sub?: string;
  words: string[];
  summary?: React.ReactNode;
  back?: { label: string; onClick: () => void };
  children: React.ReactNode;
}> = ({ eyebrow, title, sub, words, summary, back, children }) => (
  <div className="vz-page">
    <section className="vz-band">
      <div className="vz-band-sky" aria-hidden="true" />
      <FlyingBanner className="f1 vz-band-flight" words={words} />
      <div className="vz-band-sea" aria-hidden="true">
        <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className="vz-wv a"><path d="M0 50 C 200 20 400 80 600 50 C 800 20 1000 80 1200 50 C 1400 20 1600 80 1800 50 C 2000 20 2200 80 2400 50 V120 H0 Z" /></svg>
        <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className="vz-wv b"><path d="M0 80 C 150 64 300 96 600 80 C 900 64 1050 96 1200 80 C 1350 64 1500 96 1800 80 C 2100 64 2250 96 2400 80 V120 H0 Z" /></svg>
      </div>
      <div className="vz-wrap vz-band-in">
        {back && (
          <button type="button" className="vz-back" onClick={back.onClick}>
            <Icon name="back" size={18} duo={false} />
            <span>{back.label}</span>
          </button>
        )}
        <span className="vz-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </section>
    <div className="vz-wrap vz-page-body">
      {summary && <div className="vz-summary">{summary}</div>}
      {children}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Kutucuk ızgarası: mobilde 2, tablette 3, masaüstünde 4 sütun.        */
/* Kutucuğa dokununca içerik, o satırın hemen altında açılır.          */
/* ------------------------------------------------------------------ */

export interface TileTab {
  id: string;
  label: string;
  render: () => React.ReactNode;
}
export interface Tile {
  id: string;
  title: string;
  desc: string;
  icon: IconName;
  badge?: string;
  isNew?: boolean;
  tabs?: TileTab[];
  render?: () => React.ReactNode;
  onOpen?: () => void; // içerik yerine bir eylem çalıştırır
}
export type OpenRequest = { id: string; tab?: string; nonce: number } | null;

const colsFor = (w: number, n: number) => (w >= 1024 ? (n % 4 === 0 || n > 9 ? 4 : n % 3 === 0 ? 3 : 4) : w >= 640 ? 3 : 2);
const useCols = (n: number) => {
  const [cols, setCols] = useState(() => (typeof window !== 'undefined' ? colsFor(window.innerWidth, n) : 2));
  useEffect(() => {
    const on = () => setCols(colsFor(window.innerWidth, n));
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, [n]);
  return cols;
};

export const TileGrid: React.FC<{ tiles: Tile[]; openRequest?: OpenRequest; label: string; defaultOpen?: string }> = ({ tiles, openRequest, label, defaultOpen }) => {
  const { l } = useI18n();
  const cols = useCols(tiles.length);
  const [openId, setOpenId] = useState<string | null>(defaultOpen || null);
  const [tab, setTab] = useState('');
  const [fly, setFly] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const open = (id: string, t?: string, scroll = true) => {
    const tile = tiles.find((x) => x.id === id);
    if (!tile) return;
    if (tile.onOpen && !tile.render && !tile.tabs) {
      tile.onOpen();
      return;
    }
    if (openId !== id) setFly((k) => k + 1);
    setOpenId(id);
    setTab(t || tile.tabs?.[0]?.id || '');
    if (!scroll) return;
    window.setTimeout(() => {
      const el = panelRef.current;
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 84;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }, 60);
  };

  useEffect(() => {
    if (openRequest) open(openRequest.id, openRequest.tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRequest?.nonce]);

  const idx = tiles.findIndex((x) => x.id === openId);
  const tile = idx >= 0 ? tiles[idx] : null;
  const panelOrder = idx >= 0 ? Math.ceil((idx + 1) / cols) * cols : 999;
  const activeTab = tile?.tabs?.find((x) => x.id === tab) || tile?.tabs?.[0];

  return (
    <div className="vz-tiles" role="group" aria-label={label} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {tiles.map((t, i) => (
        <button
          key={t.id}
          type="button"
          aria-controls={`vz-panel-${label.replace(/\W+/g, '')}`}
          className={`vz-tile${openId === t.id ? ' on' : ''}`}
          style={{ order: i + 1 }}
          aria-expanded={t.onOpen && !t.render && !t.tabs ? undefined : openId === t.id}
          onClick={() => (openId === t.id ? setOpenId(null) : open(t.id))}
        >
          {t.badge && <span className="vz-tile-badge">{t.badge}</span>}
          {t.isNew && !t.badge && <span className="vz-tile-badge new">{l('Yeni', 'New', 'Neu', 'Nuevo', 'Новое')}</span>}
          <span className="vz-ic"><Icon name={t.icon} size={22} /></span>
          <span className="vz-tile-t">{t.title}</span>
          <span className="vz-tile-s">{t.desc}</span>
        </button>
      ))}
      <div ref={panelRef} className={`vz-panel${tile ? ' open' : ''}`} style={{ order: panelOrder }} id={`vz-panel-${label.replace(/\W+/g, '')}`} role="region" aria-label={tile?.title}>
        <div>
          {tile && (
            <div className="vz-panel-box">
              <svg key={fly} className="vz-sweep" viewBox="0 0 36 36" aria-hidden="true">
                <path d="M2 18 L 26 13 L 33 15 L 26 19 L 2 22 L 9 19 L 5 17 Z M 12 17 L 7 8 L 11 8 L 19 15 Z M 12 19 L 7 28 L 11 28 L 19 21 Z" fill="currentColor" />
              </svg>
              <header className="vz-panel-h">
                <span className="vz-ic"><Icon name={tile.icon} size={20} /></span>
                <h2>{tile.title}</h2>
                <button type="button" className="vz-iconbtn" onClick={() => setOpenId(null)} aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}>
                  <Icon name="close" size={18} duo={false} />
                </button>
              </header>
              {tile.tabs && tile.tabs.length > 1 && (
                <div className="vz-tabs" role="tablist">
                  {tile.tabs.map((x) => (
                    <button key={x.id} type="button" role="tab" aria-selected={x.id === activeTab?.id} onClick={() => setTab(x.id)}>
                      {x.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="vz-panel-b" key={`${tile.id}-${activeTab?.id || ''}`}>
                <Suspense fallback={<div className="vz-skel" />}>{activeTab ? activeTab.render() : tile.render?.()}</Suspense>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* Sayıları dile göre biçimle */
export const fmtNum = (n: number, lang: string, digits = 0) =>
  new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : lang === 'de' ? 'de-DE' : lang === 'es' ? 'es-ES' : lang === 'ru' ? 'ru-RU' : 'en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(n);

/** Kur çiftini okunur yaz: oran çok küçükse ters çevir (1 £ = 52 ₺ gibi). */
export const fmtPair = (homeSym: string, destSym: string, rate: number, lang: string) => {
  if (!rate) return '—';
  if (rate < 0.1) {
    const inv = 1 / rate;
    return `1 ${destSym} = ${fmtNum(inv, lang, inv >= 100 ? 0 : inv >= 10 ? 1 : 2)} ${homeSym}`;
  }
  return `1 ${homeSym} = ${fmtNum(rate, lang, rate >= 100 ? 0 : rate >= 10 ? 1 : 2)} ${destSym}`;
};
