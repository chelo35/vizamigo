import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../data/i18n';
import { LIVE, tourCurrency } from '../data/tours';

type LiveTour = {
  id: number;
  name: string;
  days: number | null;
  op: string;
  img: string;
  img2: string;
  rating: number | null;
  reviews: number | null;
  price: number;
  orig: number | null;
  disc: number;
  url: string;
  dep: { date: string; price: number; orig: number | null; seats: number | null } | null;
};

const LOCALE: Record<string, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' };
const cache = new Map<string, Promise<{ currency: string; tours: LiveTour[] }>>();

/**
 * Bir paket tur kartının içinde canlı teklifler (TourRadar): tarih, fiyat, indirim, kalan yer.
 * Kart ekrana yaklaşınca yüklenir; sayfa açılışını yavaşlatmaz.
 */
export const LiveTours: React.FC<{ pkg: string }> = ({ pkg }) => {
  const { l, language } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{ currency: string; tours: LiveTour[] } | null | 'err'>(null);
  const cfg = LIVE[pkg];

  useEffect(() => {
    if (!cfg || !ref.current) return;
    let alive = true;
    const el = ref.current;
    const load = () => {
      const cur = tourCurrency(language);
      const qs = new URLSearchParams({ q: cfg.q, c: cfg.c.join(','), min: String(cfg.min), max: String(cfg.max), cur, n: '3', cmp: `pkg_${pkg}` });
      const key = qs.toString();
      if (!cache.has(key))
        cache.set(
          key,
          fetch(`/api/tours?${key}`).then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        );
      cache
        .get(key)!
        .then((j) => alive && setState(j && Array.isArray(j.tours) ? j : 'err'))
        .catch(() => {
          cache.delete(key);
          if (alive) setState('err');
        });
    };
    if (typeof IntersectionObserver === 'undefined') {
      load();
      return () => {
        alive = false;
      };
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => {
      alive = false;
      io.disconnect();
    };
  }, [pkg, language, cfg]);

  if (!cfg) return null;
  const loc = LOCALE[language] || 'en-GB';
  const money = (n: number, c: string) => {
    try {
      return new Intl.NumberFormat(loc, { style: 'currency', currency: c, maximumFractionDigits: 0 }).format(n);
    } catch {
      return `${n} ${c}`;
    }
  };
  const day = (d: string) => {
    try {
      return new Date(`${d}T12:00:00Z`).toLocaleDateString(loc, { day: 'numeric', month: 'short' });
    } catch {
      return d;
    }
  };

  return (
    <div ref={ref} className="vz-live" aria-live="polite">
      {state === null && (
        <div className="vz-live-skel" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      )}
      {state !== null && state !== 'err' && state.tours.length > 0 && (
        <>
          <p className="vz-live-head">
            <span className="vz-live-dot" />
            {l('Güncel turlar ve fiyatlar', 'Live tours & prices', 'Aktuelle Touren & Preise', 'Tours y precios actuales', 'Актуальные туры и цены')}
          </p>
          <ul className="vz-live-list">
            {state.tours.map((t) => {
              const price = t.dep ? t.dep.price : t.price;
              const orig = t.dep ? t.dep.orig : t.orig;
              const pct = orig && orig > price ? Math.round((1 - price / orig) * 100) : 0;
              const few = t.dep?.seats != null && t.dep.seats > 0 && t.dep.seats <= 8;
              return (
                <li key={t.id}>
                  <a href={t.url} target="_blank" rel="noopener noreferrer sponsored">
                    <img src={t.img} srcSet={`${t.img} 360w, ${t.img2} 750w`} sizes="112px" alt="" loading="lazy" decoding="async" width={112} height={66} />
                    <span className="vz-live-main">
                      <b>{t.name}</b>
                      <small>
                        {t.days ? l(`${t.days} gün`, `${t.days} days`, `${t.days} Tage`, `${t.days} días`, `${t.days} дн.`) : ''}
                        {t.op ? ` · ${t.op}` : ''}
                        {t.rating ? ` · ★ ${t.rating.toFixed(1)}${t.reviews ? ` (${t.reviews})` : ''}` : ''}
                      </small>
                      {t.dep && (
                        <small className="vz-live-dep">
                          {l(`${day(t.dep.date)} çıkışlı`, `Departs ${day(t.dep.date)}`, `Abreise ${day(t.dep.date)}`, `Salida ${day(t.dep.date)}`, `Выезд ${day(t.dep.date)}`)}
                          {few && <em>{l(`son ${t.dep.seats} yer`, `${t.dep.seats} spots left`, `noch ${t.dep.seats} Plätze`, `quedan ${t.dep.seats}`, `осталось ${t.dep.seats}`)}</em>}
                        </small>
                      )}
                    </span>
                    <span className="vz-live-price">
                      {pct >= 5 && <span className="vz-live-off">-{pct}%</span>}
                      {orig && orig > price && <s>{money(orig, state.currency)}</s>}
                      <b>{money(price, state.currency)}</b>
                      <small>{l('kişi başı', 'per person', 'pro Person', 'por persona', 'с человека')}</small>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="vz-live-note">
            {l(
              'Fiyat ve tarihler TourRadar’dan anlık gelir; rezervasyon orada yapılır.',
              'Prices and dates come live from TourRadar, where you book.',
              'Preise und Termine kommen live von TourRadar; dort wird gebucht.',
              'Precios y fechas en directo de TourRadar, donde reservas.',
              'Цены и даты в реальном времени с TourRadar, бронирование там.'
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default LiveTours;
