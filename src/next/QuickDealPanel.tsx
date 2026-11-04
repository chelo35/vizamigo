import React, { useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Btn, Field } from './ui';
import { Picks, type PickItem } from './Picks';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { getCrossRate } from '../data/currencyRates';
import { useLiveFx } from '../utils/liveData';
import { tpLinks, stay22, s22Flights, s22Cars } from '../data/tpPartners';
import ESIM from '../data/esimPrices.json';
import type { DealKind } from './QuickDeals';
import { toursPath, TOURS } from '../data/tours';

type Fl = { price: number; dep: string; ret: string | null; transfers: number | null; link: string | null };
type Pkg = [number, number, number, string];

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const plus = (s: string, n: number) => {
  const d = new Date(`${s}T12:00:00`);
  d.setDate(d.getDate() + n);
  return iso(d);
};
const ddmm = (s: string) => `${s.slice(8, 10)}${s.slice(5, 7)}`;
const EU = new Set(['AT', 'BE', 'CH', 'CZ', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'NL', 'NO', 'PL', 'PT', 'SE', 'SI', 'SK', 'MT', 'CY']);
const POPULAR_TOURS: [string, string][] = [
  ['TH', 'Bangkok'], ['GR', 'Athens'], ['EG', 'Cairo'], ['AE', 'Dubai'], ['IT', 'Rome'], ['JP', 'Tokyo'], ['ME', 'Kotor'], ['ES', 'Barcelona'], ['FR', 'Paris'], ['ID', 'Bali']
];

const QuickDealPanel: React.FC<{ kind: DealKind; passport: string; destination: string; onClose: () => void }> = ({ kind, passport, destination, onClose }) => {
  const { l, language } = useI18n();
  useLiveFx();
  const cur = language === 'tr' ? 'TRY' : language === 'ru' ? 'RUB' : 'EUR';
  const loc = language === 'tr' ? 'tr-TR' : language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : language === 'ru' ? 'ru-RU' : 'en-GB';
  const money = (v: number, c = cur) => {
    try {
      return new Intl.NumberFormat(loc, { style: 'currency', currency: c, maximumFractionDigits: 0 }).format(Math.round(v));
    } catch {
      return `${Math.round(v)} ${c}`;
    }
  };
  const fmtDay = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString(loc, { day: 'numeric', month: 'short', weekday: 'short' });
  const opts = useMemo(() => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)), [language]);
  const today = iso(new Date());

  const [from, setFrom] = useState(GEO_DATA[passport] ? passport : 'TR');
  const [to, setTo] = useState(destination && destination !== passport && GEO_DATA[destination] ? destination : 'TH');
  const [start, setStart] = useState(plus(today, 14));
  const [end, setEnd] = useState(plus(today, 45));
  const [len, setLen] = useState(7);
  const [n, setN] = useState(2);
  const [res, setRes] = useState<Fl[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [rc, setRc] = useState(cur);

  const fromIata = GEO_DATA[from]?.mainHub || '';
  const toIata = GEO_DATA[to]?.mainHub || '';
  const city = GEO_DATA[to]?.capital || getCountryName(to, 'en');
  const toName = getCountryName(to, language);
  const inTR = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Istanbul';
    } catch {
      return false;
    }
  })();

  const countrySel = (id: string, label: string, v: string, set: (c: string) => void) => (
    <Field label={label} htmlFor={id}>
      <select id={id} className="vz-select" value={v} onChange={(e) => { set(e.target.value); setRes(null); }}>
        {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
      </select>
    </Field>
  );
  const toSel = countrySel(`vz-qd-to-${kind}`, l('Nereye', 'Where to', 'Wohin', 'Destino', 'Куда'), to, setTo);

  const findFlights = async () => {
    setBusy(true);
    setRes(null);
    try {
      const c = cur.toLowerCase();
      const r = await fetch(`/api/cheap-flights?from=${fromIata}&to=${toIata}&start=${start}&end=${end}&len=${len}&cur=${c}`);
      const j = r.ok ? await r.json() : null;
      setRc(j?.currency || cur);
      setRes(Array.isArray(j?.results) ? j.results : []);
    } catch {
      setRes([]);
    }
    setBusy(false);
  };
  const searchLink = len
    ? `https://www.aviasales.com/search/${fromIata}${ddmm(start)}${toIata}${ddmm(plus(start, len))}1`
    : `https://www.aviasales.com/search/${fromIata}${ddmm(start)}${toIata}1`;

  // Otel: önce komisyon getirenler
  const checkout = plus(start, len || 3);
  const cq = encodeURIComponent(city);
  const hq = { address: `${city}, ${getCountryName(to, 'en')}`, checkin: start, checkout, adults: n, campaign: 'quick' };
  const hotelPicks: PickItem[] = [
    { id: 'klook', url: 'https://www.klook.com/hotels/' },
    { id: 'booking', url: stay22('booking', hq) },
    { id: 'agoda', url: stay22('agoda', hq) },
    { id: 'expedia', url: stay22('expedia', hq) },
    { id: 'hotelscom', url: stay22('hotelscom', hq) },
    { id: 'tripcom', url: `https://www.trip.com/hotels/list?keyword=${cq}&checkin=${start}&checkout=${checkout}&adult=${n}` },
    { id: 'hostelworld', url: `https://www.hostelworld.com/find/?search_keywords=${cq}` }
  ];
  const s22c = s22Cars(city, start, checkout, 'quick_cars');
  const s22f = s22Flights(fromIata, toIata, start, len ? plus(start, len) : undefined, 1, 'quick_flights');
  const flightPicks: PickItem[] = [
    { id: 'aviasales', url: searchLink },
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
    ...(EU.has(to) ? [{ id: 'autoeurope', url: tpLinks.autoeurope() }] : [])
  ];
  const transferPicks: PickItem[] = [
    { id: 'kiwitaxi', url: tpLinks.kiwitaxi() },
    ...(EU.has(to) ? [{ id: 'welcomepickups', url: tpLinks.welcomePickups() }] : []),
    { id: 'gettransfer', url: tpLinks.gettransfer() },
    { id: 'intui', url: 'https://intui.travel/' }
  ];
  const [tourCity, setTourCity] = useState(() => (TOURS.some((x) => x.search === city) ? city : 'Bangkok'));
  const tourPicks: PickItem[] = [
    { id: 'klook', url: tpLinks.tours(tourCity) },
    { id: 'getyourguide', url: (() => { const t = TOURS.find((x) => x.search === tourCity); return t ? stay22('getyourguide', { link: t.gyg, campaign: 'quick_tours' }) : stay22('getyourguide', { address: tourCity, campaign: 'quick_tours' }); })() },
    { id: 'tiqets', url: tpLinks.tiqets() },
    { id: 'wegotrip', url: tpLinks.wegotrip() },
    { id: 'gocity', url: tpLinks.gocity() },
    { id: 'kkday', url: tpLinks.kkday() }
  ];
  const esimList = useMemo(() => {
    const all = ((ESIM as unknown as { p: Record<string, Pkg[]> }).p[to] || []).filter((x) => x[0] === 0 || x[0] >= 3);
    const pick = (d: number) => all.filter((x) => x[1] >= d && x[1] <= d * 2 + 2).sort((a, b) => a[2] - b[2])[0];
    return [pick(7), pick(15), pick(30)].filter((x, i, arr): x is Pkg => !!x && arr.findIndex((y) => y && y[3] === x[3]) === i);
  }, [to]);
  const esimPicks: PickItem[] = [
    { id: 'drimsim', url: tpLinks.drimsim() },
    { id: 'airalo', url: esimList[0] ? `https://www.airalo.com/${esimList[0][3].split('/')[0]}` : 'https://www.airalo.com/', blocked: inTR },
    { id: 'yesim', url: tpLinks.yesim(), blocked: inTR },
    { id: 'saily', url: tpLinks.saily(), blocked: inTR },
    { id: 'gigsky', url: tpLinks.gigsky(), blocked: inTR }
  ];
  const usd = (v: number) => money(v * getCrossRate('USD', cur));

  return (
    <div className="vz-qd-body">
      {kind === 'flight' && (
        <>
          <div className="vz-formgrid vz-qd-grid">
            {countrySel('vz-qd-from', l('Nereden', 'From', 'Von', 'Desde', 'Откуда'), from, setFrom)}
            {toSel}
            <Field label={l('En erken gidiş', 'Earliest departure', 'Frühester Abflug', 'Salida desde', 'Вылет с')} htmlFor="vz-qd-s">
              <input id="vz-qd-s" type="date" className="vz-input" min={plus(today, 1)} value={start} onChange={(e) => { if (e.target.value) { setStart(e.target.value); if (end < e.target.value) setEnd(plus(e.target.value, 14)); setRes(null); } }} />
            </Field>
            <Field label={l('En geç gidiş', 'Latest departure', 'Spätester Abflug', 'Salida hasta', 'Вылет до')} htmlFor="vz-qd-e">
              <input id="vz-qd-e" type="date" className="vz-input" min={start} max={plus(start, 92)} value={end} onChange={(e) => { if (e.target.value) { setEnd(e.target.value); setRes(null); } }} />
            </Field>
            <Field label={l('Kaç gün kalacaksın?', 'Trip length', 'Reisedauer', 'Duración', 'Сколько дней')} htmlFor="vz-qd-l">
              <select id="vz-qd-l" className="vz-select" value={len} onChange={(e) => { setLen(Number(e.target.value)); setRes(null); }}>
                <option value={0}>{l('Tek yön', 'One way', 'Nur Hinflug', 'Solo ida', 'В одну сторону')}</option>
                {[3, 5, 7, 10, 14, 21].map((d) => <option key={d} value={d}>{l(`${d} gün (gidiş-dönüş)`, `${d} days (return)`, `${d} Tage (hin & zurück)`, `${d} días (ida y vuelta)`, `${d} дн. (туда-обратно)`)}</option>)}
              </select>
            </Field>
          </div>
          <Btn icon="search" onClick={findFlights} disabled={busy || !fromIata || !toIata || from === to}>
            {busy ? l('Aranıyor…', 'Searching…', 'Suche…', 'Buscando…', 'Ищем…') : l('En ucuz bileti bul', 'Find the cheapest fare', 'Günstigsten Flug finden', 'Buscar el más barato', 'Найти дешевле всего')}
          </Btn>
          {res && res.length > 0 && (
            <div className="vz-qd-res">
              {res.map((f, i) => (
                <a key={`${f.dep}${f.ret}`} className={`vz-qd-fare${i === 0 ? ' best' : ''}`} href={f.link || searchLink} target="_blank" rel="noopener noreferrer sponsored">
                  {i === 0 && <em>{l('En ucuz', 'Cheapest', 'Am günstigsten', 'Más barato', 'Дешевле всего')}</em>}
                  <b>{money(f.price, rc)}</b>
                  <span>{fmtDay(f.dep)}{f.ret ? ` → ${fmtDay(f.ret)}` : ''}</span>
                  <small>{f.transfers === 0 ? l('Direkt', 'Direct', 'Direkt', 'Directo', 'Прямой') : l(`${f.transfers ?? '?'} aktarma`, `${f.transfers ?? '?'} stop(s)`, `${f.transfers ?? '?'} Umstieg`, `${f.transfers ?? '?'} escala`, `пересадок: ${f.transfers ?? '?'}`)} · {l('Bileti al', 'Book', 'Buchen', 'Reservar', 'Купить')} ›</small>
                </a>
              ))}
            </div>
          )}
          {res && res.length === 0 && (
            <p className="vz-muted" style={{ margin: 0 }}>
              {l('Bu aralık için kayıtlı fiyat bulunamadı. ', 'No saved fares for these dates. ', 'Keine gespeicherten Preise. ', 'Sin tarifas guardadas. ', 'Нет сохранённых цен. ')}
              <a href={searchLink} target="_blank" rel="noopener noreferrer sponsored">{l('Aviasales\'te canlı ara ›', 'Search live on Aviasales ›', 'Live auf Aviasales suchen ›', 'Buscar en Aviasales ›', 'Искать на Aviasales ›')}</a>
            </p>
          )}
          <Picks label={l('Diğer sitelerde de karşılaştır:', 'Compare on other sites too:', 'Auch woanders vergleichen:', 'Compara en otros sitios:', 'Сравнить на других сайтах:')} items={flightPicks} k={`${fromIata}${toIata}${start}${len}`} />
          <p className="vz-qd-foot">{l('Fiyatlar Aviasales\'te son günlerde bulunan en düşük fiyatlardır; kişi başı.', 'Lowest fares found on Aviasales in recent days; per person.', 'Niedrigste kürzlich gefundene Preise auf Aviasales; pro Person.', 'Tarifas más bajas halladas en Aviasales; por persona.', 'Минимальные цены Aviasales за последние дни; на человека.')}</p>
        </>
      )}

      {kind === 'hotel' && (
        <>
          <div className="vz-formgrid vz-qd-grid">
            {toSel}
            <Field label={l('Giriş', 'Check-in', 'Anreise', 'Entrada', 'Заезд')} htmlFor="vz-qd-hs">
              <input id="vz-qd-hs" type="date" className="vz-input" min={plus(today, 1)} value={start} onChange={(e) => e.target.value && setStart(e.target.value)} />
            </Field>
            <Field label={l('Gece', 'Nights', 'Nächte', 'Noches', 'Ночей')} htmlFor="vz-qd-hn">
              <select id="vz-qd-hn" className="vz-select" value={len || 3} onChange={(e) => setLen(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 7, 10, 14].map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
            <Field label={l('Kişi', 'Guests', 'Gäste', 'Huéspedes', 'Гостей')} htmlFor="vz-qd-hp">
              <select id="vz-qd-hp" className="vz-select" value={n} onChange={(e) => setN(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
          </div>
          <Picks label={l(`${city} otellerini şurada karşılaştır:`, `Compare ${city} hotels on:`, `Hotels in ${city} vergleichen:`, `Compara hoteles en ${city}:`, `Отели ${city}:`)} items={hotelPicks} k={`${to}${start}${len}${n}`} />
        </>
      )}

      {kind === 'car' && (
        <>
          <div className="vz-formgrid vz-qd-grid">{toSel}</div>
          <Picks label={l(`${toName} için araç kiralama sitesini seç:`, `Car rental in ${toName}:`, `Mietwagen in ${toName}:`, `Alquiler en ${toName}:`, `Аренда в ${toName}:`)} items={carPicks} k={to} />
        </>
      )}

      {kind === 'transfer' && (
        <>
          <div className="vz-formgrid vz-qd-grid">{toSel}</div>
          <Picks label={l(`${toIata} havalimanından otele sabit fiyatlı transfer:`, `Fixed-price transfer from ${toIata} airport:`, `Festpreis-Transfer ab ${toIata}:`, `Traslado desde ${toIata}:`, `Трансфер из ${toIata}:`)} items={transferPicks} k={to} />
        </>
      )}

      {kind === 'tour' && (
        <>
          <div className="vz-qd-chips">
            {POPULAR_TOURS.map(([c, ct]) => (
              <button key={c} type="button" className={tourCity === ct ? 'on' : undefined} onClick={() => setTourCity(ct)}>{getCountryName(c, language)}</button>
            ))}
          </div>
          <Picks label={l(`${tourCity} turları, biletler ve günübirlik geziler:`, `Tours, tickets and day trips in ${tourCity}:`, `Touren und Tickets in ${tourCity}:`, `Tours y entradas en ${tourCity}:`, `Экскурсии в ${tourCity}:`)} items={tourPicks} k={tourCity} />
          <a className="vz-qd-more" href={toursPath(language)}>{l('Tüm turlar sayfası ›', 'All tours ›', 'Alle Touren ›', 'Todos los tours ›', 'Все туры ›')}</a>
        </>
      )}

      {kind === 'esim' && (
        <>
          <div className="vz-formgrid vz-qd-grid">{toSel}</div>
          {esimList.length > 0 && (
            <div className="vz-qd-res">
              {esimList.map((p) => (
                React.createElement(
                  inTR ? 'div' : 'a',
                  { key: p[3], className: 'vz-qd-fare', ...(inTR ? {} : { href: `https://www.airalo.com/${p[3]}`, target: '_blank', rel: 'noopener noreferrer sponsored' }) },
                  <b>{usd(p[2])}</b>,
                  <span>{p[0] ? `${p[0]} GB` : l('Sınırsız', 'Unlimited', 'Unbegrenzt', 'Ilimitado', 'Безлимит')} · {p[1]} {l('gün', 'days', 'Tage', 'días', 'дн.')}</span>,
                  <small>{inTR ? l('Airalo fiyatı · yurt dışında açılır', 'Airalo price', 'Airalo-Preis', 'Precio Airalo', 'Цена Airalo') : 'Airalo ›'}</small>
                )
              ))}
            </div>
          )}
          <Picks label={l('eSIM firmasını seç:', 'Choose your eSIM provider:', 'eSIM-Anbieter wählen:', 'Elige tu eSIM:', 'Выберите eSIM:')} items={esimPicks} k={to} />
          {inTR && <p className="vz-trip-note" style={{ padding: 0 }}>{l('Türkiye\'den Airalo, Yesim, Saily ve GigSky sitelerine erişim engelli; Drimsim açılıyor. Diğerlerini yurt dışına çıkınca satın alabilirsin.', 'Airalo, Yesim, Saily and GigSky are blocked in Türkiye; Drimsim opens.', 'Airalo, Yesim, Saily und GigSky sind in der Türkei gesperrt.', 'Airalo, Yesim, Saily y GigSky están bloqueados en Turquía.', 'Airalo, Yesim, Saily и GigSky заблокированы в Турции.')}</p>}
        </>
      )}

      <button type="button" className="vz-qd-close" onClick={onClose} aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}>✕</button>
    </div>
  );
};

export default QuickDealPanel;
