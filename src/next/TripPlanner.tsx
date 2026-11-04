import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Btn, Chip, Chips, Field, List, Row, VisaBadge } from './ui';
import { PartnerLogo } from './PartnerLogo';
import { Picks, type PickItem } from './Picks';
import { Icon } from './Icon';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { getCountryInsights } from '../data/countryInsights';
import { getPassportItems } from '../utils/calculator';
import { getCrossRate } from '../data/currencyRates';
import { useLiveFx } from '../utils/liveData';
import { tpLinks, stay22, s22Flights, s22Cars, gygLink } from '../data/tpPartners';
import { TOURS } from '../data/tours';
import ESIM from '../data/esimPrices.json';

/**
 * Seyahat planlayıcı (1. aşama): nereden, nereye, tarih, kişi →
 * gerçek gidiş-dönüş uçuş fiyatı, ±3 gün içinde daha ucuz tarihler,
 * konaklama/günlük harcama/sigorta/eSIM tahmini ve vize durumu.
 */
type Fl = { price: number; dep: string; ret: string | null; transfers: number | null; airline: string | null; link: string | null };
type Res = { currency: string; exact: Fl | null; best: Fl | null; alts: Fl[] };
type Style = 'budget' | 'mid';
interface State { from: string; to: string; dep: string; ret: string; n: number; style: Style }

const KEY = 'vz_trip_v1';
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const plus = (s: string, days: number) => {
  const d = new Date(`${s}T12:00:00`);
  d.setDate(d.getDate() + days);
  return iso(d);
};
const nightsOf = (a: string, b: string) => Math.max(1, Math.round((Date.parse(b) - Date.parse(a)) / 86400000));
const ddmm = (s: string) => `${s.slice(8, 10)}${s.slice(5, 7)}`;

/** "25 - 50 $" / "75 - 130 €" → ortalama ve para birimi */
/** Airalo beslemesi: [GB (0 = sınırsız), gün, USD, airalo.com yolu] */
type Pkg = [number, number, number, string];
const pickEsim = (code: string, days: number): Pkg | null => {
  const list = ((ESIM as unknown as { p: Record<string, Pkg[]> }).p[code] || []).filter((x) => x[0] === 0 || x[0] >= 3);
  if (!list.length) return null;
  const fit = list.filter((x) => x[1] >= days);
  return fit.length ? fit.reduce((a, b) => (b[2] < a[2] ? b : a)) : list.reduce((a, b) => (b[1] > a[1] || (b[1] === a[1] && b[2] < a[2]) ? b : a));
};
const rangeOf = (s?: string): { lo: number; hi: number; cur: string } | null => {
  if (!s) return null;
  const nums = (s.match(/\d+(?:[.,]\d+)?/g) || []).slice(0, 2).map((x) => parseFloat(x.replace(',', '.')));
  if (!nums.length) return null;
  return { lo: nums[0], hi: nums[1] ?? nums[0], cur: s.includes('€') ? 'EUR' : s.includes('£') ? 'GBP' : 'USD' };
};
const parseRange = (s?: string): { v: number; cur: string } | null => {
  if (!s) return null;
  const nums = (s.match(/\d+(?:[.,]\d+)?/g) || []).slice(0, 2).map((x) => parseFloat(x.replace(',', '.')));
  if (!nums.length) return null;
  const v = nums.length > 1 ? (nums[0] + nums[1]) / 2 : nums[0];
  const cur = s.includes('€') ? 'EUR' : s.includes('£') ? 'GBP' : 'USD';
  return { v, cur };
};

const cache = new Map<string, Promise<Res | null>>();
const loadTrip = (from: string, to: string, dep: string, ret: string, cur: string) => {
  const k = [from, to, dep, ret, cur].join('|');
  if (!cache.has(k)) {
    cache.set(
      k,
      fetch(`/api/trip-flights?from=${from}&to=${to}&dep=${dep}&ret=${ret}&cur=${cur}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    );
  }
  return cache.get(k)!;
};
const loadOneWay = (from: string, to: string, cur: string): Promise<number | null> =>
  fetch(`/api/flight-price?from=${from}&to=${to}&cur=${cur}`)
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => (j && j.price ? Number(j.price) : null))
    .catch(() => null);

export const TripPlanner: React.FC<{ passport: string; dest: string; onOpenCountry: (c: string) => void }> = ({ passport, dest, onOpenCountry }) => {
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

  const [s, setS] = useState<State>(() => {
    const today = iso(new Date());
    const def: State = { from: GEO_DATA[passport] ? passport : 'TR', to: dest && dest !== passport ? dest : 'TH', dep: plus(today, 30), ret: plus(today, 37), n: 1, style: 'mid' };
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null') as State | null;
      if (saved && saved.dep > today && GEO_DATA[saved.from] && GEO_DATA[saved.to]) return { ...def, ...saved, to: dest && dest !== saved.from ? dest : saved.to };
    } catch {}
    return def;
  });
  const set = (p: Partial<State>) => {
    const next = { ...s, ...p };
    if (next.ret <= next.dep) next.ret = plus(next.dep, 1);
    setS(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const opts = useMemo(() => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)), [language]);
  const fromIata = GEO_DATA[s.from]?.mainHub || '';
  const toIata = GEO_DATA[s.to]?.mainHub || '';
  const city = GEO_DATA[s.to]?.capital || getCountryName(s.to, 'en');
  const nights = nightsOf(s.dep, s.ret);
  const item = useMemo(() => getPassportItems(passport).find((x) => x.c === s.to) || null, [passport, s.to]);
  const costs = useMemo(() => getCountryInsights(s.to, 'en').livingCosts, [s.to]);

  // Uçuş fiyatları
  const [res, setRes] = useState<Res | null>(null);
  const [oneWay, setOneWay] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setRes(null);
    setOneWay(null);
    if (!/^[A-Z]{3}$/.test(fromIata) || !/^[A-Z]{3}$/.test(toIata) || fromIata === toIata) return;
    let on = true;
    setLoading(true);
    const c = cur.toLowerCase();
    loadTrip(fromIata, toIata, s.dep, s.ret, c).then((r) => {
      if (!on) return;
      setRes(r);
      if (!r?.exact && !r?.best) loadOneWay(fromIata, toIata, c).then((v) => on && setOneWay(v));
      setLoading(false);
    });
    return () => {
      on = false;
    };
  }, [fromIata, toIata, s.dep, s.ret, cur]);

  // Para çevirme (USD/EUR tabanlı tahminler → görüntüleme para birimi)
  const conv = (v: number, from: string) => v * getCrossRate(from, cur);
  const conv1 = (r: { v: number; cur: string } | null) => (r ? conv(r.v, r.cur) : 0);

  const near = res?.exact || res?.best || null;
  const flightPP = near?.price ?? (oneWay ? oneWay * 2 : 0);
  const flightReal = !!near;
  const flight = flightPP * s.n;
  const dorm = conv1(parseRange(costs.hostelDormUsd));
  const hotel = conv1(parseRange(costs.hotel3StarUsd));
  const stayNight = s.style === 'budget' ? dorm * s.n : hotel * Math.ceil(s.n / 2);
  const stay = stayNight * nights;
  const dailyPP = conv1(parseRange(s.style === 'budget' ? costs.dailyBudgetBackpackerUsd : costs.dailyBudgetMidrangeUsd));
  const spendPP = Math.max(dailyPP * 0.45, dailyPP - stayNight / s.n);
  const spend = spendPP * nights * s.n;
  const insurance = conv(2, 'USD') * (nights + 1) * s.n;
  const pkg = pickEsim(s.to, nights + 1);
  const esim = pkg ? conv(pkg[2], 'USD') * s.n : conv(nights <= 8 ? 10 : nights <= 16 ? 18 : 28, 'USD') * s.n;
  const esimLink = pkg ? `https://www.airalo.com/${pkg[3]}` : tpLinks.yesim();
  const hr = rangeOf(s.style === 'budget' ? costs.hostelDormUsd : costs.hotel3StarUsd);
  const nightRange = hr ? `${money(conv(hr.lo, hr.cur))}–${money(conv(hr.hi, hr.cur))}` : '';
  const total = flight + stay + spend + insurance + esim;

  const roundLink = `https://www.aviasales.com/search/${fromIata}${ddmm(s.dep)}${toIata}${ddmm(s.ret)}${s.n}`;
  const flightLink = near?.link || roundLink;
  const rooms = s.style === 'budget' ? 1 : Math.ceil(s.n / 2);
  const cq = encodeURIComponent(city);
    const hq = { address: `${city}, ${getCountryName(s.to, 'en')}`, checkin: s.dep, checkout: s.ret, adults: s.n, campaign: 'planner' };
  // Önce komisyon getirenler: Klook (Travelpayouts) ve Stay22 üzerinden Booking, Agoda, Expedia, Hotels.com
  const hotelPicks: PickItem[] = [
    { id: 'klook', url: 'https://www.klook.com/hotels/' },
    { id: 'booking', url: stay22('booking', hq) },
    { id: 'agoda', url: stay22('agoda', hq) },
    { id: 'expedia', url: stay22('expedia', hq) },
    { id: 'hotelscom', url: stay22('hotelscom', hq) },
    ...(s.style === 'budget' ? [{ id: 'hostelworld', url: `https://www.hostelworld.com/find/?search_keywords=${cq}` }] : []),
    { id: 'tripcom', url: `https://www.trip.com/hotels/list?keyword=${cq}&checkin=${s.dep}&checkout=${s.ret}&adult=${s.n}` }
  ];
  // Türkiye'den Airalo, Yesim, Saily ve GigSky alan adları erişime kapalı (Kasım 2026 kontrolü); Drimsim açılıyor
  const inTR = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Istanbul';
    } catch {
      return false;
    }
  })();
  const airaloCountry = pkg ? `https://www.airalo.com/${pkg[3].split('/')[0]}` : 'https://www.airalo.com/';
  const esimPicks: PickItem[] = [
    { id: 'airalo', url: airaloCountry, blocked: inTR },
    { id: 'yesim', url: tpLinks.yesim(), blocked: inTR },
    { id: 'saily', url: tpLinks.saily(), blocked: inTR },
    { id: 'gigsky', url: tpLinks.gigsky(), blocked: inTR },
    { id: 'drimsim', url: tpLinks.drimsim() }
  ].sort((a, b) => Number(!!a.blocked) - Number(!!b.blocked));
  const s22c = s22Cars(city, s.dep, s.ret, 'planner_cars');
  const s22f = s22Flights(fromIata, toIata, s.dep, s.ret, s.n, 'planner_flights');
  const flightPicks: PickItem[] = [
    { id: 'aviasales', url: flightLink },
    { id: 'kayak', url: s22f.kayak },
    { id: 'expedia', url: s22f.expedia }
  ];
  const carPicks: PickItem[] = [
    { id: 'economybookings', url: tpLinks.economybookings() },
    { id: 'bookingcars', url: s22c.booking },
    { id: 'expediacars', url: s22c.expedia },
    { id: 'localrent', url: tpLinks.localrent() },
    { id: 'getrentacar', url: tpLinks.getrentacar() },
    { id: 'qeeq', url: tpLinks.qeeq() },
    ...(EU_CARS.has(s.to) ? [{ id: 'autoeurope', url: tpLinks.autoeurope() }] : [])
  ];

  const est = <span className="vz-trip-tag est">{l('Yaklaşık', 'Approx.', 'Ca.', 'Aprox.', 'Примерно')}</span>;
  const avg = <span className="vz-trip-tag est">{l('Ortalama', 'Average', 'Durchschnitt', 'Media', 'Среднее')}</span>;
  const real = <span className="vz-trip-tag real">{l('Gerçek fiyat', 'Live price', 'Echtpreis', 'Precio real', 'Реальная цена')}</span>;
  const sameCountry = s.from === s.to;

  return (
    <div className="vz-stack vz-trip">
      <form className="vz-card tone-sea" onSubmit={(e) => e.preventDefault()}>
        <div className="vz-formgrid">
          <Field label={l('Nereden', 'From', 'Von', 'Desde', 'Откуда')} htmlFor="vz-tp-f" hint={fromIata}>
            <select id="vz-tp-f" className="vz-select" value={s.from} onChange={(e) => set({ from: e.target.value })}>
              {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
            </select>
          </Field>
          <Field label={l('Nereye', 'To', 'Nach', 'A', 'Куда')} htmlFor="vz-tp-t" hint={toIata}>
            <select id="vz-tp-t" className="vz-select" value={s.to} onChange={(e) => set({ to: e.target.value })}>
              {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
            </select>
          </Field>
          <Field label={l('Gidiş', 'Depart', 'Hinflug', 'Ida', 'Туда')} htmlFor="vz-tp-d">
            <input id="vz-tp-d" type="date" className="vz-input" min={plus(iso(new Date()), 1)} value={s.dep} onChange={(e) => e.target.value && set({ dep: e.target.value })} />
          </Field>
          <Field label={l('Dönüş', 'Return', 'Rückflug', 'Vuelta', 'Обратно')} htmlFor="vz-tp-r">
            <input id="vz-tp-r" type="date" className="vz-input" min={plus(s.dep, 1)} value={s.ret} onChange={(e) => e.target.value && set({ ret: e.target.value })} />
          </Field>
          <Field label={l('Kişi', 'Travellers', 'Reisende', 'Viajeros', 'Человек')} htmlFor="vz-tp-n">
            <select id="vz-tp-n" className="vz-select" value={s.n} onChange={(e) => set({ n: Number(e.target.value) })}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </Field>
        </div>
        <Chips>
          <Chip on={s.style === 'budget'} onClick={() => set({ style: 'budget' })}>{l('Ekonomik (hostel)', 'Budget (hostel)', 'Sparsam (Hostel)', 'Económico (hostal)', 'Эконом (хостел)')}</Chip>
          <Chip on={s.style === 'mid'} onClick={() => set({ style: 'mid' })}>{l('Orta (3★ otel)', 'Mid-range (3★ hotel)', 'Mittel (3★ Hotel)', 'Medio (hotel 3★)', 'Средний (3★ отель)')}</Chip>
        </Chips>
      </form>

      {sameCountry ? (
        <p className="vz-muted">{l('Nereden ve nereye aynı ülke. Farklı bir hedef seç.', 'From and to are the same country. Pick another destination.', 'Start und Ziel sind gleich.', 'Origen y destino son el mismo país.', 'Откуда и куда совпадают.')}</p>
      ) : (
        <>
          <section className="vz-card vz-trip-total" aria-live="polite">
            <span className="vz-muted">{l(`${nights} gece · ${s.n} kişi · yaklaşık toplam bütçe`, `${nights} nights · ${s.n} ${s.n > 1 ? 'people' : 'person'} · estimated total`, `${nights} Nächte · ${s.n} Pers. · geschätzt gesamt`, `${nights} noches · ${s.n} pers. · total estimado`, `${nights} ноч. · ${s.n} чел. · итого примерно`)}</span>
            <b>{flightPP ? money(total) : loading ? '…' : `${money(total - flight)} +`}</b>
            <span className="vz-muted" style={{ fontSize: 13 }}>
              {flightPP
                ? l(`Kişi başı ≈ ${money(total / s.n)}`, `≈ ${money(total / s.n)} per person`, `≈ ${money(total / s.n)} pro Person`, `≈ ${money(total / s.n)} por persona`, `≈ ${money(total / s.n)} на человека`)
                : loading
                  ? l('Uçuş fiyatı aranıyor…', 'Looking up flight prices…', 'Flugpreise werden gesucht…', 'Buscando precios de vuelos…', 'Ищем цены на билеты…')
                  : l('Bu rota için uçuş fiyatı bulunamadı; uçuş hariç.', 'No flight price found for this route; flights not included.', 'Kein Flugpreis gefunden; ohne Flug.', 'Sin precio de vuelo; sin incluir vuelos.', 'Цена перелёта не найдена; без перелёта.')}
            </span>
          </section>

          {res && res.alts.length > 0 && (
            <section className="vz-card">
              <h3 style={{ margin: '0 0 8px', fontSize: 16 }}><Icon name="cal" size={18} /> {res.exact ? l('±3 gün içinde daha ucuz tarihler', 'Cheaper dates within ±3 days', 'Günstigere Daten (±3 Tage)', 'Fechas más baratas (±3 días)', 'Дешевле в пределах ±3 дней') : l('±3 gün içinde bulunan fiyatlar', 'Fares found within ±3 days', 'Preise innerhalb ±3 Tage', 'Tarifas en ±3 días', 'Цены в пределах ±3 дней')}</h3>
              <div className="vz-trip-alts">
                {res.alts.map((a) => (
                  <button key={`${a.dep}${a.ret}`} type="button" className="vz-trip-alt" onClick={() => set({ dep: a.dep, ret: a.ret || s.ret })}>
                    <b>{money(a.price)}</b>
                    <span>{fmtDay(a.dep)} → {a.ret ? fmtDay(a.ret) : ''}</span>
                    {res.exact && <i>−{money(res.exact.price - a.price)}</i>}
                  </button>
                ))}
              </div>
            </section>
          )}

          <List>
            <Row
              key={`f-${flightLink}`}
              lead={<PartnerLogo id="aviasales" />}
              title={<>{l('Uçuş (gidiş-dönüş)', 'Flights (round trip)', 'Flug (hin & zurück)', 'Vuelo (ida y vuelta)', 'Перелёт (туда-обратно)')} {flightPP ? (flightReal ? real : est) : null}</>}
              sub={
                near && !res?.exact
                  ? l(`Bu tarihlere en yakın fiyat: ${fmtDay(near.dep)} → ${near.ret ? fmtDay(near.ret) : ''}`, `Closest dates found: ${fmtDay(near.dep)} → ${near.ret ? fmtDay(near.ret) : ''}`, `Nächste Daten: ${fmtDay(near.dep)} → ${near.ret ? fmtDay(near.ret) : ''}`, `Fechas más cercanas: ${fmtDay(near.dep)} → ${near.ret ? fmtDay(near.ret) : ''}`, `Ближайшие даты: ${fmtDay(near.dep)} → ${near.ret ? fmtDay(near.ret) : ''}`)
                  : res?.exact
                  ? `${fromIata} → ${toIata} · ${res.exact.transfers === 0 ? l('direkt', 'direct', 'direkt', 'directo', 'прямой') : l(`${res.exact.transfers ?? '?'} aktarma`, `${res.exact.transfers ?? '?'} stop(s)`, `${res.exact.transfers ?? '?'} Umstieg(e)`, `${res.exact.transfers ?? '?'} escala(s)`, `пересадок: ${res.exact.transfers ?? '?'}`)}${s.n > 1 ? ` · ${money(flightPP)} × ${s.n}` : ''}`
                  : oneWay
                    ? l('Bu tarihler için fiyat yok; tek yön fiyatın 2 katı alındı.', 'No fare for these dates; based on 2 × the one-way fare.', 'Kein Preis für diese Daten; 2 × Einzelflug.', 'Sin tarifa para estas fechas; 2 × ida.', 'Нет цены на даты; 2 × в одну сторону.')
                    : `${fromIata} → ${toIata}`
              }
              right={<span className="vz-trip-amt">{flightPP ? money(flight) : loading ? '…' : '—'}</span>}
              href={flightLink}
            />
            <Picks label={l('Uçuşu şu sitelerde karşılaştır:', 'Compare this flight on:', 'Flug vergleichen bei:', 'Compara el vuelo en:', 'Сравнить перелёт:')} items={flightPicks} k={`${fromIata}${toIata}${s.dep}${s.ret}${s.n}`} />
            <Row
              icon="bed"
              title={<>{s.style === 'budget' ? l('Hostel', 'Hostel', 'Hostel', 'Hostal', 'Хостел') : l('Otel (3★)', 'Hotel (3★)', 'Hotel (3★)', 'Hotel (3★)', 'Отель (3★)')} {avg}</>}
              sub={`${city} · ${l(`${nights} gece`, `${nights} nights`, `${nights} Nächte`, `${nights} noches`, `${nights} ноч.`)} · ${nightRange || money(stayNight)} / ${s.style === 'budget' ? l('yatak', 'bed', 'Bett', 'cama', 'место') : l('oda', 'room', 'Zimmer', 'habitación', 'номер')} `}
              right={<span className="vz-trip-amt">{money(stay)}</span>}
            />
            <Picks label={l('Güncel otel fiyatlarını şurada gör:', 'See live hotel prices on:', 'Live-Hotelpreise bei:', 'Precios de hotel en:', 'Цены отелей на:')} items={hotelPicks} k={`${s.to}${s.dep}${s.ret}${s.n}${s.style}`} />
            <Row
              icon="food"
              title={<>{l('Yemek, ulaşım ve gezme', 'Food, transport & sights', 'Essen, Transport, Ausflüge', 'Comida, transporte y visitas', 'Еда, транспорт, экскурсии')} {avg}</>}
              sub={`≈ ${money(spendPP)} / ${l('kişi / gün', 'person / day', 'Person / Tag', 'persona / día', 'чел. / день')}`}
              right={<span className="vz-trip-amt">{money(spend)}</span>}
            />
            <Row
              icon="shield"
              title={<>{l('Seyahat sağlık sigortası', 'Travel health insurance', 'Reisekrankenversicherung', 'Seguro de viaje', 'Медицинская страховка')} {est}</>}
              sub={l('Yaklaşık fiyat; kapsam ve yaşa göre değişir.', 'Rough price; varies with cover and age.', 'Richtwert; je nach Deckung und Alter.', 'Precio orientativo; varía según cobertura y edad.', 'Ориентир; зависит от покрытия и возраста.')}
              right={<span className="vz-trip-amt">{money(insurance)}</span>}
            />
            <Row
              key={`e-${esimLink}`}
              lead={<PartnerLogo id={pkg ? 'airalo' : 'yesim'} />}
              title={<>eSIM {pkg ? real : est}</>}
              sub={pkg ? `Airalo · ${pkg[0] ? `${pkg[0]} GB` : l('sınırsız', 'unlimited', 'unbegrenzt', 'ilimitado', 'безлимит')} · ${pkg[1]} ${l('gün', 'days', 'Tage', 'días', 'дн.')}${s.n > 1 ? ` · ${money(conv(pkg[2], 'USD'))} × ${s.n}` : ''}` : l('İnmeden internet: Yesim', 'Data from landing: Yesim', 'Daten ab Landung: Yesim', 'Datos al aterrizar: Yesim', 'Интернет сразу: Yesim')}
              right={<span className="vz-trip-amt">{money(esim)}</span>}
              href={inTR ? undefined : esimLink}
            />
            <Picks label={l('eSIM firmasını seç:', 'Choose your eSIM provider:', 'eSIM-Anbieter wählen:', 'Elige tu eSIM:', 'Выберите eSIM:')} items={esimPicks} k={s.to} />
            {inTR && (
              <p className="vz-trip-note">
                {l(
                  'Türkiye\'den Airalo, Yesim, Saily ve GigSky sitelerine erişim engelli; Türkiye\'deyken Drimsim açılıyor. Diğerlerini yurt dışına çıkınca, örneğin havalimanı Wi-Fi\'ında satın alabilirsin.',
                  'Airalo, Yesim, Saily and GigSky are blocked in Türkiye; Drimsim opens. You can buy the others once abroad, e.g. on airport Wi-Fi.',
                  'Airalo, Yesim, Saily und GigSky sind in der Türkei gesperrt; Drimsim funktioniert.',
                  'Airalo, Yesim, Saily y GigSky están bloqueados en Turquía; Drimsim funciona.',
                  'Airalo, Yesim, Saily и GigSky заблокированы в Турции; Drimsim открывается.'
                )}
              </p>
            )}
          </List>

          <section className="vz-card">
            <div className="vz-row-flex" style={{ justifyContent: 'space-between', gap: 10 }}>
              <span className="vz-row-flex" style={{ gap: 8 }}>
                <VisaBadge item={item} />
                <span>{getCountryName(s.to, language)}</span>
              </span>
              <Btn variant="soft" small iconRight="next" onClick={() => onOpenCountry(s.to)}>{l('Giriş şartları', 'Entry rules', 'Einreise', 'Requisitos', 'Правила въезда')}</Btn>
            </div>
            <List>
              <Row key={`t-${s.to}`} lead={<PartnerLogo id="kiwitaxi" />} title={l('Havalimanı transferi', 'Airport transfer', 'Flughafentransfer', 'Traslado', 'Трансфер')} sub={l(`${toIata} → otel, sabit fiyat · Kiwitaxi`, `${toIata} → hotel, fixed price · Kiwitaxi`, `${toIata} → Hotel, Festpreis · Kiwitaxi`, `${toIata} → hotel, precio fijo · Kiwitaxi`, `${toIata} → отель, фикс. цена · Kiwitaxi`)} href={tpLinks.kiwitaxi()} />
              <Row icon="car" title={l('Araç kirala', 'Rent a car', 'Mietwagen', 'Alquiler de coche', 'Аренда авто')} sub={l('Firmaları karşılaştır; çoğunda ücretsiz iptal', 'Compare companies; most with free cancellation', 'Anbieter vergleichen; meist kostenlos stornierbar', 'Compara empresas; cancelación gratuita', 'Сравните компании; бесплатная отмена')} />
              <Picks label={l('Araç firmasını seç:', 'Choose a rental site:', 'Anbieter wählen:', 'Elige empresa:', 'Выберите сервис:')} items={carPicks} k={s.to} />
              <Row key={`a-${s.to}`} lead={<PartnerLogo id="klook" />} title={l('Turlar ve biletler', 'Tours & tickets', 'Touren & Tickets', 'Tours y entradas', 'Экскурсии и билеты')} sub={`Klook · ${city}`} href={tpLinks.tours(city)} />
              <Row key={`g-${s.to}`} lead={<PartnerLogo id="getyourguide" />} title={l('Günübirlik turlar', 'Day trips', 'Tagesausflüge', 'Excursiones', 'Однодневные туры')} sub={`GetYourGuide · ${city}`} href={(() => { const t = TOURS.find((x) => x.code === s.to); return t ? gygLink(t.gyg, 'planner') : stay22('getyourguide', { address: city, campaign: 'planner' }); })()} />
              <Row lead={<PartnerLogo id="radicalstorage" />} title={l('Bagaj emaneti', 'Luggage storage', 'Gepäckaufbewahrung', 'Consigna', 'Камера хранения')} sub={l('Radical Storage · şehirde çantanı bırak', 'Radical Storage · drop your bags in town', 'Radical Storage · Gepäck abgeben', 'Radical Storage · deja tu equipaje', 'Radical Storage · оставьте багаж')} href={tpLinks.radicalStorage()} />
              <Row lead={<PartnerLogo id="airhelp" />} title={l('Uçuş rötar ve iptal tazminatı', 'Flight delay compensation', 'Entschädigung bei Verspätung', 'Compensación por retraso', 'Компенсация за задержку')} sub={l('AirHelp · 3 saat+ rötarda 600 €’ya kadar', 'AirHelp · up to €600 for 3h+ delays', 'AirHelp · bis 600 € ab 3 Std.', 'AirHelp · hasta 600 € por +3 h', 'AirHelp · до 600 € при задержке 3+ ч')} href={tpLinks.airhelp()} />
            </List>
          </section>

          <p className="vz-muted" style={{ fontSize: 12.5 }}>
            {l(
              'Uçuş fiyatları Aviasales\'te son günlerde bulunan en düşük fiyatlar, eSIM fiyatları Airalo\'nun güncel liste fiyatlarıdır. Konaklama ve harcamalar ülke ortalamasıdır; otel fiyatı için bağlantıya dokun. Sigorta yaklaşık fiyattır.',
              'Flight prices are the lowest fares found on Aviasales in recent days; eSIM prices are Airalo’s current list prices. Stay and spending are country averages; tap the hotel link for live prices. Insurance is approximate.',
              'Flugpreise sind die niedrigsten kürzlich auf Aviasales gefundenen Tarife, eSIM-Preise die aktuellen Airalo-Listenpreise. Unterkunft und Ausgaben sind Landesdurchschnitte; Live-Hotelpreise über den Link. Versicherung ist ein Richtwert.',
              'Los vuelos son las tarifas más bajas halladas en Aviasales en los últimos días; los eSIM, precios actuales de Airalo. Alojamiento y gastos son medias del país; toca el enlace del hotel para precios reales. El seguro es aproximado.',
              'Билеты — минимальные цены Aviasales за последние дни, eSIM — текущие цены Airalo. Жильё и расходы — средние по стране; актуальные цены отелей по ссылке. Страховка — ориентир.'
            )}
          </p>
        </>
      )}
    </div>
  );
};

const EU_CARS = new Set(['AT', 'BE', 'CH', 'CZ', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'NL', 'NO', 'PL', 'PT', 'SE', 'SI', 'SK', 'MT', 'CY']);

export default TripPlanner;
