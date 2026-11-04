import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Field, List, Row, VisaBadge } from './ui';
import { PartnerLogo } from './PartnerLogo';
import { Picks, type PickItem } from './Picks';
import { Icon } from './Icon';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { getCountryInsights } from '../data/countryInsights';
import { getPassportItems } from '../utils/calculator';
import { getCrossRate } from '../data/currencyRates';
import { useLiveFx } from '../utils/liveData';
import { stay22, s22Flights } from '../data/tpPartners';

/**
 * Çok şehirli rota (planlayıcı 2. aşama): başlangıç ülkesi → 2–5 durak (her birinde kaç gece) → isteğe bağlı dönüş.
 * Her ayak için o tarihe en yakın en ucuz tek yön bilet (Aviasales), her durak için otel bağlantısı ve konaklama ortalaması.
 */
type Fl = { price: number; dep: string; transfers: number | null; airline: string | null; link: string | null };
type LegRes = { exact: Fl | null; best: Fl } | null;
interface Stop { to: string; nights: number }
interface MState { from: string; start: string; stops: Stop[]; back: boolean; n: number }

const KEY = 'vz_multi_v1';
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const plus = (s: string, days: number) => {
  const d = new Date(`${s}T12:00:00`);
  d.setDate(d.getDate() + days);
  return iso(d);
};
const ddmm = (s: string) => `${s.slice(8, 10)}${s.slice(5, 7)}`;
const avgOf = (s?: string): { v: number; cur: string } | null => {
  if (!s) return null;
  const nums = (s.match(/\d+(?:[.,]\d+)?/g) || []).slice(0, 2).map((x) => parseFloat(x.replace(',', '.')));
  if (!nums.length) return null;
  return { v: nums.length > 1 ? (nums[0] + nums[1]) / 2 : nums[0], cur: s.includes('€') ? 'EUR' : s.includes('£') ? 'GBP' : 'USD' };
};
const hub = (c: string) => (GEO_DATA[c]?.mainHub || '').split('/')[0];

export const MultiCity: React.FC<{ passport: string }> = ({ passport }) => {
  const { l, language } = useI18n();
  useLiveFx();
  const cur = language === 'tr' ? 'TRY' : language === 'ru' ? 'RUB' : 'EUR';
  const loc = language === 'tr' ? 'tr-TR' : language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : language === 'ru' ? 'ru-RU' : 'en-GB';
  const money = (v: number) => {
    try {
      return new Intl.NumberFormat(loc, { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(Math.round(v));
    } catch {
      return `${Math.round(v)} ${cur}`;
    }
  };
  const fmtDay = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString(loc, { day: 'numeric', month: 'short', weekday: 'short' });
  const opts = useMemo(() => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)), [language]);

  const [s, setS] = useState<MState>(() => {
    const today = iso(new Date());
    const def: MState = { from: GEO_DATA[passport] ? passport : 'TR', start: plus(today, 30), stops: [{ to: 'IT', nights: 4 }, { to: 'FR', nights: 4 }], back: true, n: 1 };
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null') as MState | null;
      if (saved && saved.start > today && Array.isArray(saved.stops) && saved.stops.length) return { ...def, ...saved };
    } catch {}
    return def;
  });
  const set = (p: Partial<MState>) => {
    const next = { ...s, ...p };
    setS(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const setStop = (i: number, p: Partial<Stop>) => set({ stops: s.stops.map((x, j) => (j === i ? { ...x, ...p } : x)) });

  // Ayaklar: başlangıç → durak 1 → … → (dönüş)
  const legs = useMemo(() => {
    const out: { from: string; to: string; date: string }[] = [];
    let d = s.start;
    let prev = s.from;
    for (const st of s.stops) {
      out.push({ from: prev, to: st.to, date: d });
      d = plus(d, st.nights);
      prev = st.to;
    }
    if (s.back && prev !== s.from) out.push({ from: prev, to: s.from, date: d });
    return out;
  }, [s]);
  const valid = legs.every((g) => /^[A-Z]{3}$/.test(hub(g.from)) && /^[A-Z]{3}$/.test(hub(g.to)) && hub(g.from) !== hub(g.to));
  const q = legs.map((g) => `${hub(g.from)}-${hub(g.to)}-${g.date}`).join(',');

  const [res, setRes] = useState<LegRes[] | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setRes(null);
    if (!valid || !legs.length) return;
    let on = true;
    setBusy(true);
    fetch(`/api/multi-city?legs=${encodeURIComponent(q)}&cur=${cur.toLowerCase()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => on && setRes(Array.isArray(j?.legs) ? j.legs : []))
      .catch(() => on && setRes([]))
      .finally(() => on && setBusy(false));
    return () => {
      on = false;
    };
  }, [q, cur, valid, legs.length]);

  const conv = (v: number, from: string) => v * getCrossRate(from, cur);
  const flightPP = res ? res.reduce((a, r) => a + (r ? (r.exact || r.best).price : 0), 0) : 0;
  const missing = res ? res.filter((r) => !r).length : 0;
  const stays = s.stops.map((st) => {
    const c = getCountryInsights(st.to, 'en').livingCosts;
    const h = avgOf(c.hotel3StarUsd);
    const night = h ? conv(h.v, h.cur) * Math.ceil(s.n / 2) : 0;
    return { night, total: night * st.nights };
  });
  const stayTotal = stays.reduce((a, x) => a + x.total, 0);
  const totalNights = s.stops.reduce((a, x) => a + x.nights, 0);
  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);

  return (
    <div className="vz-stack vz-trip">
      <form className="vz-card tone-sea" onSubmit={(e) => e.preventDefault()}>
        <div className="vz-formgrid">
          <Field label={l('Nereden', 'From', 'Von', 'Desde', 'Откуда')} htmlFor="vz-mc-f" hint={hub(s.from)}>
            <select id="vz-mc-f" className="vz-select" value={s.from} onChange={(e) => set({ from: e.target.value })}>
              {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
            </select>
          </Field>
          <Field label={l('Yola çıkış', 'Start date', 'Abreise', 'Salida', 'Начало')} htmlFor="vz-mc-d">
            <input id="vz-mc-d" type="date" className="vz-input" min={plus(iso(new Date()), 1)} value={s.start} onChange={(e) => e.target.value && set({ start: e.target.value })} />
          </Field>
          <Field label={l('Kişi', 'Travellers', 'Reisende', 'Viajeros', 'Человек')} htmlFor="vz-mc-n">
            <select id="vz-mc-n" className="vz-select" value={s.n} onChange={(e) => set({ n: Number(e.target.value) })}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </Field>
        </div>
        <ol className="vz-mc-stops">
          {s.stops.map((st, i) => (
            <li key={i}>
              <span className="vz-mc-num">{i + 1}</span>
              <select aria-label={l(`${i + 1}. durak`, `Stop ${i + 1}`, `Station ${i + 1}`, `Parada ${i + 1}`, `Остановка ${i + 1}`)} className="vz-select" value={st.to} onChange={(e) => setStop(i, { to: e.target.value })}>
                {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
              </select>
              <select aria-label={l('Gece', 'Nights', 'Nächte', 'Noches', 'Ночей')} className="vz-select vz-mc-n" value={st.nights} onChange={(e) => setStop(i, { nights: Number(e.target.value) })}>
                {[1, 2, 3, 4, 5, 6, 7, 10, 14].map((n) => <option key={n} value={n}>{l(`${n} gece`, `${n} nights`, `${n} Nächte`, `${n} noches`, `${n} ноч.`)}</option>)}
              </select>
              {s.stops.length > 1 && (
                <button type="button" className="vz-mc-del" aria-label={l('Durağı sil', 'Remove stop', 'Entfernen', 'Quitar', 'Удалить')} onClick={() => set({ stops: s.stops.filter((_, j) => j !== i) })}>✕</button>
              )}
            </li>
          ))}
        </ol>
        <div className="vz-row-flex" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {s.stops.length < 5 && (
            <button type="button" className="vz-btn vz-btn-soft sm" onClick={() => set({ stops: [...s.stops, { to: 'ES', nights: 3 }] })}>
              <Icon name="plus" size={16} duo={false} /> {l('Durak ekle', 'Add stop', 'Station hinzufügen', 'Añadir parada', 'Добавить')}
            </button>
          )}
          <label className="vz-row-flex" style={{ gap: 6, fontSize: 14 }}>
            <input type="checkbox" checked={s.back} onChange={(e) => set({ back: e.target.checked })} />
            {l(`${getCountryName(s.from, language)}'ye dön`, `Return to ${getCountryName(s.from, language)}`, `Rückflug nach ${getCountryName(s.from, language)}`, `Volver a ${getCountryName(s.from, language)}`, `Обратно: ${getCountryName(s.from, language)}`)}
          </label>
        </div>
      </form>

      <section className="vz-card vz-trip-total" aria-live="polite">
        <span className="vz-muted">{l(`${s.stops.length} durak · ${totalNights} gece · ${s.n} kişi`, `${s.stops.length} stops · ${totalNights} nights · ${s.n} ${s.n > 1 ? 'people' : 'person'}`, `${s.stops.length} Stationen · ${totalNights} Nächte`, `${s.stops.length} paradas · ${totalNights} noches`, `${s.stops.length} ост. · ${totalNights} ноч.`)}</span>
        <b>{busy ? '…' : money(flightPP * s.n + stayTotal)}</b>
        <span className="vz-muted" style={{ fontSize: 13 }}>
          {l(`Uçuşlar ${money(flightPP * s.n)} + konaklama ortalaması ${money(stayTotal)}`, `Flights ${money(flightPP * s.n)} + average stay ${money(stayTotal)}`, `Flüge ${money(flightPP * s.n)} + Unterkunft ${money(stayTotal)}`, `Vuelos ${money(flightPP * s.n)} + alojamiento ${money(stayTotal)}`, `Перелёты ${money(flightPP * s.n)} + жильё ${money(stayTotal)}`)}
          {missing > 0 && l(` · ${missing} ayak için fiyat bulunamadı`, ` · no fare found for ${missing} leg(s)`, ` · ${missing} Strecke(n) ohne Preis`, ` · ${missing} tramo(s) sin tarifa`, ` · нет цены для ${missing}`)}
        </span>
      </section>

      <List>
        {legs.map((g, i) => {
          const r = res?.[i];
          const f = r ? r.exact || r.best : null;
          const search = `https://www.aviasales.com/search/${hub(g.from)}${ddmm(g.date)}${hub(g.to)}${s.n}`;
          return (
            <Row
              key={`${q}-${i}`}
              lead={<PartnerLogo id="aviasales" />}
              title={`${getCountryName(g.from, language)} → ${getCountryName(g.to, language)}`}
              sub={
                f
                  ? `${hub(g.from)} → ${hub(g.to)} · ${fmtDay(f.dep)}${f.dep !== g.date ? l(' (en yakın tarih)', ' (closest date)', ' (nächstes Datum)', ' (fecha más cercana)', ' (ближайшая дата)') : ''}${f.transfers === 0 ? l(' · direkt', ' · direct', ' · direkt', ' · directo', ' · прямой') : ''}`
                  : `${hub(g.from)} → ${hub(g.to)} · ${fmtDay(g.date)}`
              }
              right={<span className="vz-trip-amt">{f ? money(f.price * s.n) : busy ? '…' : '—'}</span>}
              href={f?.link || search}
            />
          );
        })}
      </List>
      {legs.length > 0 && (
        <Picks
          label={l('İlk uçuşu başka sitelerde de karşılaştır:', 'Compare the first flight elsewhere:', 'Ersten Flug vergleichen:', 'Compara el primer vuelo:', 'Сравнить первый перелёт:')}
          items={[
            { id: 'kayak', url: s22Flights(hub(legs[0].from), hub(legs[0].to), legs[0].date, undefined, s.n, 'multi_city').kayak },
            { id: 'expedia', url: s22Flights(hub(legs[0].from), hub(legs[0].to), legs[0].date, undefined, s.n, 'multi_city').expedia }
          ]}
          k={q}
        />
      )}

      <section className="vz-card">
        <h3 style={{ margin: '0 0 8px', fontSize: 16 }}><Icon name="bed" size={18} /> {l('Duraklarda konaklama', 'Where to stay', 'Unterkünfte', 'Alojamiento', 'Где жить')}</h3>
        <div className="vz-stack" style={{ gap: 12 }}>
          {s.stops.map((st, i) => {
            const city = GEO_DATA[st.to]?.capital || getCountryName(st.to, 'en');
            const ci = legs[i]?.date || s.start;
            const co = plus(ci, st.nights);
            const hq = { address: `${city}, ${getCountryName(st.to, 'en')}`, checkin: ci, checkout: co, adults: s.n, campaign: 'multi_city' };
            const picks: PickItem[] = [
              { id: 'booking', url: stay22('booking', hq) },
              { id: 'agoda', url: stay22('agoda', hq) },
              { id: 'expedia', url: stay22('expedia', hq) },
              { id: 'hotelscom', url: stay22('hotelscom', hq) }
            ];
            return (
              <div key={`${st.to}-${i}`} className="vz-mc-stay">
                <div className="vz-row-flex" style={{ justifyContent: 'space-between', gap: 8 }}>
                  <b>{i + 1}. {city} · {l(`${st.nights} gece`, `${st.nights} nights`, `${st.nights} Nächte`, `${st.nights} noches`, `${st.nights} ноч.`)}</b>
                  {st.to !== passport && <VisaBadge item={items.get(st.to) || null} />}
                </div>
                <span className="vz-muted" style={{ fontSize: 13 }}>{fmtDay(ci)} → {fmtDay(co)}{stays[i].night ? ` · ≈ ${money(stays[i].night)} / ${l('gece', 'night', 'Nacht', 'noche', 'ночь')}` : ''}</span>
                <Picks label="" items={picks} k={`${st.to}${ci}${co}${s.n}`} />
              </div>
            );
          })}
        </div>
      </section>
      <p className="vz-trip-note">{l('Uçuş fiyatları her ayak için seçilen tarihe en yakın (±3 gün) en ucuz tek yön biletlerdir; kişi başı fiyat × kişi sayısı. Konaklama ülke ortalamasıdır.', 'Flight fares are the cheapest one-way tickets within ±3 days of each leg date, times travellers. Stays are country averages.', 'Flugpreise: günstigste Einzelflüge ±3 Tage je Strecke. Unterkunft: Landesdurchschnitt.', 'Vuelos: ida más barata ±3 días por tramo. Alojamiento: media del país.', 'Перелёты: самые дешёвые билеты ±3 дня на каждый участок. Жильё: средние цены.')}</p>
    </div>
  );
};

export default MultiCity;
