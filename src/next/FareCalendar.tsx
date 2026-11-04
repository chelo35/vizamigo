import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';

type Day = { price: number; ret: string | null; transfers: number | null; link: string | null };
type MonthRes = { currency: string; month: string; days: Record<string, Day>; cheapest: string | null };

const cache = new Map<string, Promise<MonthRes | null>>();
const load = (from: string, to: string, month: string, len: number, cur: string) => {
  const k = `${from}${to}${month}${len}${cur}`;
  if (!cache.has(k))
    cache.set(
      k,
      fetch(`/api/fare-calendar?from=${from}&to=${to}&month=${month}&len=${len}&cur=${cur}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    );
  return cache.get(k)!;
};
const ym = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
const addDays = (s: string, n: number) => {
  const d = new Date(`${s}T12:00:00`);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Ucuz tarih takvimi: önümüzdeki 6 ayın en ucuz fiyatı ve seçilen ayda her gidiş günü için fiyat.
 * Bir güne dokununca planlayıcının gidiş ve dönüş tarihleri o güne göre ayarlanır.
 */
export const FareCalendar: React.FC<{
  from: string;
  to: string;
  nights: number;
  cur: string;
  dep: string;
  money: (v: number, c?: string) => string;
  onPick: (dep: string, ret: string) => void;
}> = ({ from, to, nights, cur, dep, money, onPick }) => {
  const { l, language } = useI18n();
  const loc = language === 'tr' ? 'tr-TR' : language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : language === 'ru' ? 'ru-RU' : 'en-GB';
  const months = useMemo(() => {
    const d = new Date();
    d.setDate(1);
    return Array.from({ length: 6 }, (_, i) => ym(new Date(d.getFullYear(), d.getMonth() + i, 1)));
  }, []);
  const [month, setMonth] = useState(() => (months.includes(dep.slice(0, 7)) ? dep.slice(0, 7) : months[0]));
  const [all, setAll] = useState<Record<string, MonthRes | null | undefined>>({});
  const len = Math.max(1, Math.min(30, nights));
  const c = cur.toLowerCase();

  useEffect(() => {
    let on = true;
    setAll({});
    months.forEach((m) => load(from, to, m, len, c).then((r) => on && setAll((a) => ({ ...a, [m]: r }))));
    return () => {
      on = false;
    };
  }, [from, to, len, c, months]);

  const compact = (v: number) => {
    try {
      return new Intl.NumberFormat(loc, { notation: 'compact', maximumFractionDigits: v >= 10000 ? 0 : 1 }).format(v);
    } catch {
      return String(v);
    }
  };
  const res = all[month];
  const prices = res ? Object.values(res.days).map((d) => d.price).sort((a, b) => a - b) : [];
  const lo = prices[Math.floor(prices.length * 0.25)] ?? 0;
  const hi = prices[Math.floor(prices.length * 0.75)] ?? 0;
  const first = new Date(`${month}-01T12:00:00`);
  const lead = (first.getDay() + 6) % 7; // Pazartesi başlangıç
  const dim = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const today = new Date().toISOString().slice(0, 10);
  const wk = Array.from({ length: 7 }, (_, i) => new Date(2026, 10, 2 + i).toLocaleDateString(loc, { weekday: 'narrow' }));
  const best = (m: string) => {
    const r = all[m];
    return r && r.cheapest ? r.days[r.cheapest].price : null;
  };
  const cheapestMonth = months.reduce<string | null>((b, m) => (best(m) != null && (b == null || best(m)! < best(b)!) ? m : b), null);

  return (
    <section className="vz-card vz-fcal">
      <h3><Icon name="cal" size={18} /> {l(`Ucuz tarih takvimi · ${len} gece`, `Cheapest dates · ${len} nights`, `Günstigste Termine · ${len} Nächte`, `Fechas más baratas · ${len} noches`, `Дешёвые даты · ${len} ноч.`)}</h3>
      <div className="vz-fcal-months" role="tablist">
        {months.map((m) => {
          const b = best(m);
          return (
            <button key={m} type="button" role="tab" aria-selected={m === month} className={`${m === month ? 'on' : ''}${m === cheapestMonth ? ' best' : ''}`} onClick={() => setMonth(m)}>
              <span>{new Date(`${m}-01T12:00:00`).toLocaleDateString(loc, { month: 'short' })}</span>
              <b>{all[m] === undefined ? '…' : b != null ? money(b, all[m]!.currency) : '—'}</b>
            </button>
          );
        })}
      </div>
      <div className="vz-fcal-grid">
        {wk.map((w, i) => <span key={`w${i}`} className="vz-fcal-wk">{w}</span>)}
        {Array.from({ length: lead }, (_, i) => <span key={`e${i}`} />)}
        {Array.from({ length: dim }, (_, i) => {
          const d = `${month}-${String(i + 1).padStart(2, '0')}`;
          const x = res?.days[d];
          const past = d <= today;
          const tone = !x ? '' : x.price <= lo ? 'lo' : x.price >= hi ? 'hi' : 'mid';
          return (
            <button
              key={d}
              type="button"
              disabled={!x || past}
              className={`vz-fcal-day ${tone}${d === dep ? ' sel' : ''}${res?.cheapest === d ? ' best' : ''}`}
              onClick={() => x && onPick(d, x.ret || addDays(d, len))}
              aria-label={x ? `${d}: ${money(x.price, res!.currency)}` : d}
            >
              <span>{i + 1}</span>
              {x && !past && <b>{compact(x.price)}</b>}
            </button>
          );
        })}
      </div>
      <p className="vz-qd-foot">
        {res === undefined
          ? l('Fiyatlar yükleniyor…', 'Loading fares…', 'Preise werden geladen…', 'Cargando tarifas…', 'Загружаем цены…')
          : prices.length
            ? l('Kişi başı gidiş-dönüş, son günlerde Aviasales\'te bulunan en düşük fiyatlar. Bir güne dokun, tarihler ayarlansın.', 'Per person, round trip; lowest fares seen on Aviasales recently. Tap a day to set your dates.', 'Pro Person, hin & zurück; zuletzt gefundene Tiefstpreise. Tag antippen.', 'Por persona, ida y vuelta; tarifas más bajas recientes. Toca un día.', 'На человека, туда-обратно; минимальные цены. Нажмите на день.')
            : l('Bu ay için kayıtlı fiyat yok; başka bir ay ya da kalış süresi dene.', 'No saved fares this month; try another month or trip length.', 'Keine Preise in diesem Monat.', 'Sin tarifas este mes.', 'Нет цен в этом месяце.')}
      </p>
    </section>
  );
};

export default FareCalendar;
