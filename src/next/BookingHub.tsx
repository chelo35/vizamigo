import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';
import { AdTag, Flag } from './ui';
import { Picks, type PickItem } from './Picks';
import { LiveTours } from './LiveTours';
import { FareCalendar } from './FareCalendar';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { getCountryGeography } from '../data/countryGeography';
import { capitalName } from '../data/capitalNames';
import { getCrossRate } from '../data/currencyRates';
import { tpLinks, tpLogo, stay22, s22Flights, s22Cars, gygLink, STAY22_AID, TWELVEGO_AGENT } from '../data/tpPartners';
import { TOURS, PACKAGES, LIVE } from '../data/tours';
import ESIM from '../data/esimPrices.json';
import { TRANSFER_ROUTES, kiwiRouteUrl, scooterUrl } from '../data/transferRoutes';
import { PLACES, findPlace } from '../data/countryPlaces';
import { CITIES, PRICES_CHECKED, SAFETYWING_4W_USD, carCityUrl, type CarClass } from '../data/cityPrices';
import { thirdPartyAllowed } from '../utils/consent';

/* ---------- Yolculuk bilgisi: nereden, tarihler, kişi (cihazda saklanır, tüm ülke sayfalarında ortak) ---------- */

export type Trip = { from: string; d1: string; d2: string; n: number };
const TRIP_KEY = 'vz_trip_v1';
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const plusDays = (s: string, n: number) => {
  const d = new Date(`${s}T12:00:00`);
  d.setDate(d.getDate() + n);
  return iso(d);
};
const nightsOf = (t: Trip) => Math.max(1, Math.round((Date.parse(t.d2) - Date.parse(t.d1)) / 86400000));

export function useTrip(passport: string): [Trip, (p: Partial<Trip>) => void] {
  const today = iso(new Date());
  const def: Trip = { from: GEO_DATA[passport] ? passport : 'TR', d1: plusDays(today, 21), d2: plusDays(today, 28), n: 2 };
  const [trip, setTrip] = useState<Trip>(() => {
    try {
      const s = JSON.parse(localStorage.getItem(TRIP_KEY) || 'null') as Trip | null;
      if (s && s.d1 > today && s.d2 > s.d1 && GEO_DATA[s.from]) return s;
    } catch {}
    return def;
  });
  const update = (p: Partial<Trip>) =>
    setTrip((t) => {
      const n = { ...t, ...p };
      if (n.d2 <= n.d1) n.d2 = plusDays(n.d1, 7);
      try {
        localStorage.setItem(TRIP_KEY, JSON.stringify(n));
      } catch {}
      return n;
    });
  return [trip, update];
}

/** Sayfanın üstündeki tek çubuk: pasaport, nereden, tarihler, kişi. Bir kere seçilir, her şey buna göre değişir. */
export const TripBar: React.FC<{ passport: string; trip: Trip; setTrip: (p: Partial<Trip>) => void; onOpenPassport?: () => void }> = ({ passport, trip, setTrip, onOpenPassport }) => {
  const { l, language } = useI18n();
  const today = iso(new Date());
  const opts = useMemo(() => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)), [language]);
  return (
    <div className="vz-tripbar" role="group" aria-label={l('Yolculuğun', 'Your trip', 'Deine Reise', 'Tu viaje', 'Ваша поездка')}>
      <button type="button" className="vz-tb-f" onClick={onOpenPassport} disabled={!onOpenPassport}>
        <small>{l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт')}</small>
        <b><Flag code={passport} size="sm" /> {getCountryName(passport, language)}</b>
      </button>
      <label className="vz-tb-f">
        <small>{l('Nereden', 'From', 'Von', 'Desde', 'Откуда')}</small>
        <select value={trip.from} onChange={(e) => setTrip({ from: e.target.value })}>
          {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
        </select>
      </label>
      <label className="vz-tb-f">
        <small>{l('Gidiş', 'Depart', 'Hinreise', 'Ida', 'Туда')}</small>
        <input type="date" min={plusDays(today, 1)} value={trip.d1} onChange={(e) => e.target.value && setTrip({ d1: e.target.value })} />
      </label>
      <label className="vz-tb-f">
        <small>{l('Dönüş', 'Return', 'Rückreise', 'Vuelta', 'Обратно')}</small>
        <input type="date" min={plusDays(trip.d1, 1)} value={trip.d2} onChange={(e) => e.target.value && setTrip({ d2: e.target.value })} />
      </label>
      <label className="vz-tb-f sm">
        <small>{l('Kişi', 'Guests', 'Personen', 'Personas', 'Гостей')}</small>
        <select value={trip.n} onChange={(e) => setTrip({ n: Number(e.target.value) })}>
          {[1, 2, 3, 4, 5, 6].map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </label>
      <p className="vz-tb-note">{l('Pasaportu değiştirince vize, belgeler ve kalış süresi; tarihleri değiştirince fiyatlar güncellenir.', 'Change the passport to update visa rules; change dates to update prices.', 'Pass ändern aktualisiert die Einreiseregeln, Daten ändern die Preise.', 'Cambia el pasaporte para actualizar el visado y las fechas para los precios.', 'Смена паспорта обновит визовые правила, смена дат — цены.')}</p>
    </div>
  );
};

/* ---------- Rezervasyon bölümü ---------- */

type Fl = { price: number; dep: string; ret: string | null; transfers: number | null; airline?: string | null; link: string | null };
/** Sık görülen havayolları (IATA → ad); listede olmayanlar kodla gösterilir */
const AIRLINES: Record<string, string> = {
  TK: 'Turkish Airlines', PC: 'Pegasus', XQ: 'SunExpress', AJ: 'AJet', VF: 'AJet', EK: 'Emirates', QR: 'Qatar Airways', EY: 'Etihad', FZ: 'flydubai', G9: 'Air Arabia',
  SV: 'Saudia', GF: 'Gulf Air', WY: 'Oman Air', MS: 'EgyptAir', TG: 'Thai Airways', FD: 'Thai AirAsia', WE: 'Thai Smile', DD: 'Nok Air', SL: 'Thai Lion Air', PG: 'Bangkok Airways',
  SQ: 'Singapore Airlines', TR: 'Scoot', MH: 'Malaysia Airlines', AK: 'AirAsia', CX: 'Cathay Pacific', CA: 'Air China', MU: 'China Eastern', CZ: 'China Southern', AI: 'Air India', '6E': 'IndiGo',
  UL: 'SriLankan', KC: 'Air Astana', HY: 'Uzbekistan Airways', J2: 'AZAL', LH: 'Lufthansa', LX: 'Swiss', OS: 'Austrian', AF: 'Air France', KL: 'KLM', BA: 'British Airways', IB: 'Iberia',
  AZ: 'ITA Airways', LO: 'LOT', A3: 'Aegean', FR: 'Ryanair', W6: 'Wizz Air', U2: 'easyJet', VY: 'Vueling', SU: 'Aeroflot', ET: 'Ethiopian', KQ: 'Kenya Airways', RJ: 'Royal Jordanian', ME: 'MEA',
  D7: 'AirAsia X', J9: 'Jazeera Airways', XY: 'flynas', KU: 'Kuwait Airways', OD: 'Batik Air Malaysia', ID: 'Batik Air', VZ: 'Thai VietJet', VJ: 'VietJet Air', '3U': 'Sichuan Airlines', HU: 'Hainan Airlines', BR: 'EVA Air', CI: 'China Airlines', KE: 'Korean Air', OZ: 'Asiana', JL: 'Japan Airlines', NH: 'ANA', PR: 'Philippine Airlines', GA: 'Garuda', VN: 'Vietnam Airlines', BG: 'Biman', PK: 'PIA', IX: 'Air India Express', QZ: 'Indonesia AirAsia', Z2: 'AirAsia Philippines', '8M': 'Myanmar Airways'
};
type Pkg = [number, number, number, string];
const LOC: Record<string, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' };
const EU = new Set(['AT', 'BE', 'CH', 'CZ', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'NL', 'NO', 'PL', 'PT', 'SE', 'SI', 'SK', 'MT', 'CY']);
const inTurkey = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Istanbul';
  } catch {
    return false;
  }
};

/** Bölüm içi yer arama: ülkedeki her il / ada yazılabilir (ana şehir listesindeki önerilerle) */
const PlaceQ: React.FC<{ code: string; id: string; onPick: (v: string) => void }> = ({ code, id, onPick }) => {
  const { l } = useI18n();
  const [v, setV] = useState('');
  return (
    <form className="vz-bk-cityq sm" onSubmit={(e) => { e.preventDefault(); const q = v.trim(); if (q) { onPick(findPlace(code, q)?.en || q); setV(''); } }}>
      <input list={`vz-cities-${code}`} id={id} value={v} onChange={(e) => setV(e.target.value)} placeholder={l('Başka şehir ya da ada yaz…', 'Type another city or island…', 'Andere Stadt oder Insel…', 'Otra ciudad o isla…', 'Другой город или остров…')} aria-label={l('Şehir ara', 'Search city', 'Stadt suchen', 'Buscar ciudad', 'Поиск города')} />
      <button type="submit">{l('Göster', 'Show', 'Zeigen', 'Mostrar', 'Показать')}</button>
    </form>
  );
};

/** Ulaşım türü rozeti: her türün kendi rengi (tren kırmızı, otobüs mavi, feribot turkuaz…) */
const MODE_PATH: Record<string, string> = {
  train: 'M7 3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM4 11h16M8 21l-2-3M16 21l2-3',
  bus: 'M6 4h12a2 2 0 0 1 2 2v11H4V6a2 2 0 0 1 2-2zM4 11h16M7 20v-3M17 20v-3',
  ferry: 'M3 18c2 1.5 4 1.5 6 0 2 1.5 4 1.5 6 0 2 1.5 4 1.5 6 0M5 15l-1-4h16l-1 4M8 11V7h8v4M12 4v3',
  van: 'M3 16V7h12l5 5v4h-2M15 7v5h5M9 16.5h5M5 16.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0M14 16.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
  charter: 'M5 16H3v-4l2-5h14l2 5v4h-2M10 7V4h4v3M3 12h18M9.5 16.5h5M5.5 16.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0M14.5 16.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
  avia: 'M2 16l20-8-3 9-6-2-3 4v-5l9-6-11 5z',
  car: 'M5 16H3v-4l2-5h14l2 5v4h-2M3 12h18M9.5 16.5h5M5.5 16.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0M14.5 16.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
  scooter: 'M5 17a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0M15 17a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0M10 17h5l2-7h-3M14 7h3M7.5 14.5 10 10h4'
};
const ModeBadge: React.FC<{ k: string; title?: string }> = ({ k, title }) => (
  <span className={`vz-gm k-${k}`} title={title} aria-hidden={title ? undefined : true}>
    <svg viewBox="0 0 24 24"><path d={MODE_PATH[k] || MODE_PATH.bus} /></svg>
  </span>
);

/** Bölüm başlık görselleri: /images/bk/{ad}-480|960.webp */
const SEC_IMG: Record<string, string> = { 'bk-flight': 'flight', 'bk-hotel': 'hotel', 'bk-tours': 'tours', 'bk-transfer': 'transfer', 'bk-ground': 'ground', 'bk-esim': 'esim', 'bk-car': 'car', 'bk-ins': 'ins' };
const Sec: React.FC<{ id: string; icon: string; title: string; note?: string; children: React.ReactNode }> = ({ id, icon, title, note, children }) => (
  <section id={id} className={`vz-bk-sec${SEC_IMG[id] ? ' has-img' : ''}`}>
    {SEC_IMG[id] ? (
      <div className="vz-bk-banner">
        <img src={`/images/bk/${SEC_IMG[id]}-480.webp`} srcSet={`/images/bk/${SEC_IMG[id]}-480.webp 480w, /images/bk/${SEC_IMG[id]}-960.webp 960w`} sizes="(min-width: 900px) 560px, 100vw" alt="" loading="lazy" decoding="async" />
        <h3 className="vz-bk-h"><span className="vz-ic sm"><Icon name={icon as never} size={18} /></span>{title}</h3>
      </div>
    ) : (
      <h3 className="vz-bk-h"><span className="vz-ic sm"><Icon name={icon as never} size={18} /></span>{title}</h3>
    )}
    {children}
    {note && <p className="vz-bk-note">{note}</p>}
  </section>
);

export const BookingHub: React.FC<{ code: string; trip: Trip; mustSee?: string[]; setTrip?: (p: Partial<Trip>) => void }> = ({ code, trip, mustSee = [], setTrip }) => {
  const { l, language } = useI18n();
  const cur = language === 'tr' ? 'TRY' : language === 'ru' ? 'RUB' : 'EUR';
  const loc = LOC[language] || 'en-GB';
  const money = (v: number, c = cur) => {
    try {
      return new Intl.NumberFormat(loc, { style: 'currency', currency: c, maximumFractionDigits: 0 }).format(Math.round(v));
    } catch {
      return `${Math.round(v)} ${c}`;
    }
  };
  const fmtDay = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString(loc, { day: 'numeric', month: 'short', weekday: 'short' });
  const nights = nightsOf(trip);
  const fromIata = (GEO_DATA[trip.from]?.mainHub || '').split('/')[0];
  // Şehir seçici: seçilen şehir uçuş, otel, tur, transfer, araç ve scooter bölümlerini birlikte değiştirir
  const cities = CITIES[code] || [];
  const [cityId, setCityId] = useState('');
  const [cityQ, setCityQ] = useState('');
  useEffect(() => {
    setCityId('');
    setCityQ('');
  }, [code]);
  const custom = cityId.startsWith('q:') ? cityId.slice(2) : '';
  const city = custom ? { id: cityId, en: custom, iata: findPlace(code, custom)?.iata } : cities.find((c) => c.id === cityId) || cities[0];
  const toIata = city?.iata || (GEO_DATA[code]?.mainHub || '').split('/')[0];
  const countryEn = getCountryName(code, 'en');
  const geoEn = useMemo(() => getCountryGeography(code, 'en'), [code]);
  const geoLoc = useMemo(() => getCountryGeography(code, language), [code, language]);
  const cityEn = GEO_DATA[code]?.capital ? capitalName(code, 'en', GEO_DATA[code].capital) : countryEn;
  const inTR = inTurkey();

  // Uçuş: seçilen tarihlere en yakın gerçek fiyatlar (Aviasales önbelleği, sunucuda saatlerce önbelleklenir)
  const [fl, setFl] = useState<{ cur: string; res: Fl[] } | null>(null);
  const [directOnly, setDirectOnly] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  /** rt: gidiş-dönüş (kalış süresine göre), any: süre esnek, ow: sadece gidiş, ret: sadece dönüş */
  const [fmode, setFmode] = useState<'rt' | 'any' | 'ow' | 'ret'>('rt');
  const fA = fmode === 'ret' ? toIata : fromIata;
  const fB = fmode === 'ret' ? fromIata : toIata;
  const fDay = fmode === 'ret' ? trip.d2 : trip.d1;
  useEffect(() => {
    setFl(null);
    if (!fromIata || !toIata || fromIata === toIata || trip.from === code) return;
    let alive = true;
    const win = fmode === 'any' ? 7 : 3;
    const lenQ = fmode === 'rt' ? String(Math.min(30, nights)) : fmode === 'any' ? 'any' : '0';
    const t = setTimeout(() => {
      fetch(`/api/cheap-flights?from=${fA}&to=${fB}&start=${plusDays(fDay, -win)}&end=${plusDays(fDay, win)}&len=${lenQ}&cur=${cur.toLowerCase()}${directOnly ? '&direct=1' : ''}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => alive && setFl({ cur: j?.currency || cur, res: Array.isArray(j?.results) ? j.results.slice(0, 3) : [] }))
        .catch(() => alive && setFl({ cur, res: [] }));
    }, 300);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [fromIata, toIata, fA, fB, fDay, fmode, nights, cur, code, trip.from, directOnly]);
  const ddmm = (s: string) => `${s.slice(8, 10)}${s.slice(5, 7)}`;
  const aviaLink =
    fmode === 'ow' || fmode === 'ret'
      ? `https://www.aviasales.com/search/${fA}${ddmm(fDay)}${fB}${trip.n}`
      : `https://www.aviasales.com/search/${fromIata}${ddmm(trip.d1)}${toIata}${ddmm(trip.d2)}${trip.n}`;
  const oneWay = fmode === 'ow' || fmode === 'ret';
  const s22f = s22Flights(fA, fB, fDay, oneWay ? '' : trip.d2, trip.n, `cp_${code.toLowerCase()}`);
  const flightPicks: PickItem[] = [
    { id: 'aviasales', url: aviaLink },
    { id: 'kayak', url: s22f.kayak },
    { id: 'expedia', url: s22f.expedia }
  ];

  // Otel: başkent + büyük şehirler + turistik bölgeler
  const areas = useMemo(() => {
    if ((CITIES[code] || []).length > 1) return (CITIES[code] || []).map((c) => ({ en: c.en, name: (language === 'tr' && c.tr) || c.en }));
    const en = [geoEn.capital, ...geoEn.majorCities, ...geoEn.touristRegions];
    const lc = [geoLoc.capital, ...geoLoc.majorCities, ...geoLoc.touristRegions];
    const out: { en: string; name: string }[] = [];
    en.forEach((e, i) => {
      if (e && !out.some((o) => o.en === e) && out.length < 4) out.push({ en: e, name: lc[i] || e });
    });
    return out;
  }, [geoEn, geoLoc, code]);
  const hq = (place: string) => ({ address: `${place}, ${countryEn}`, checkin: trip.d1, checkout: trip.d2, adults: trip.n, campaign: `cp_${code.toLowerCase()}` });
  const hotelPicks: PickItem[] = [
    { id: 'booking', url: stay22('booking', hq(cityEn)) },
    { id: 'agoda', url: stay22('agoda', hq(cityEn)) },
    { id: 'expedia', url: stay22('expedia', hq(cityEn)) },
    { id: 'hotelscom', url: stay22('hotelscom', hq(cityEn)) }
  ];

  // Turlar: ülkedeki görülecek yerler + canlı paket turlar
  const tourDest = TOURS.find((t) => t.code === code);
  const pkg = PACKAGES.find((p) => p.code === code && LIVE[p.id]);
  const sights = mustSee.map((s) => s.split(/[:(–—-]\s/)[0].trim()).filter((s, i, a) => s && s.length < 48 && a.indexOf(s) === i).slice(0, 6);
  const gyg = (q: string) => stay22('getyourguide', { address: `${q}, ${countryEn}`, campaign: `cp_${code.toLowerCase()}_tour` });
  const tourPicks: PickItem[] = [
    { id: 'getyourguide', url: tourDest ? gygLink(tourDest.gyg, `cp_${code.toLowerCase()}`) : gyg(cityEn) },
    { id: 'klook', url: tpLinks.tours(tourDest?.search || cityEn) },
    { id: 'tiqets', url: tpLinks.tiqets() },
    { id: 'wegotrip', url: tpLinks.wegotrip() }
  ];

  // eSIM: gerçek paket fiyatları (günlük güncellenen liste)
  const esim = useMemo(() => {
    const all = ((ESIM as unknown as { p: Record<string, Pkg[]> }).p[code] || []).filter((x) => x[0] === 0 || x[0] >= 1);
    const pick = (d: number) => all.filter((x) => x[1] >= d && x[1] <= d * 2 + 2).sort((a, b) => a[2] - b[2])[0];
    const want = nights <= 8 ? [7, 15, 30] : nights <= 16 ? [15, 30, 7] : [30, 15, 7];
    return want.map(pick).filter((x, i, arr): x is Pkg => !!x && arr.findIndex((y) => y && y[3] === x[3]) === i);
  }, [code, nights]);
  const usdTo = (v: number) => money(v * getCrossRate('USD', cur));
  // FlexiRoam eSIM paketleri (Daisycon ürün verisi; ayrı parça olarak yalnızca gerekince yüklenir)
  const [flexi, setFlexi] = useState<[number, number, number, string][]>([]);
  useEffect(() => {
    let alive = true;
    import('../data/esimFlexi.json').then((m) => alive && setFlexi(((m.default as unknown as { p: Record<string, [number, number, number, string][]> }).p[code]) || [])).catch(() => {});
    return () => {
      alive = false;
    };
  }, [code]);
  // Yesim: resmî ülke sayfasındaki 30 günlük paketler (haftalık güncellenir)
  const [yesim, setYesim] = useState<{ slug: string; p: [number, number, number][] } | null>(null);
  useEffect(() => {
    let alive = true;
    import('../data/esimMore.json').then((m) => alive && setYesim(((m.default as unknown as { yesim: Record<string, { slug: string; p: [number, number, number][] }> }).yesim[code]) || null)).catch(() => {});
    return () => {
      alive = false;
    };
  }, [code]);
  const esimMin = Math.min(...(inTR ? [] : esim.map((p) => p[2])), ...flexi.map((p) => p[2]), ...(yesim?.p || []).map((p) => p[2]));
  // Sadece komisyon getiren eSIM ortakları; Airalo Türkiye'de erişime kapalı olduğu için orada gösterilmez
  const esimPicks: PickItem[] = [
    { id: 'nomad', url: tpLinks.nomad() },
    { id: 'flexiroam', url: tpLinks.flexiroam() },
    { id: 'yesim', url: yesim ? `https://yesim.app/country/${yesim.slug}/` : tpLinks.yesim() },
    { id: 'gigsky', url: tpLinks.gigsky() },
    ...(inTR ? [] : [{ id: 'airalo', url: esim[0] ? `https://www.airalo.com/${esim[0][3].split('/')[0]}` : 'https://www.airalo.com/' }])
  ];


  const s22c = s22Cars(cityEn, trip.d1, trip.d2, `cp_${code.toLowerCase()}_cars`);
  const carPicks: PickItem[] = [
    { id: 'localrent', url: tpLinks.localrent() },
    { id: 'economybookings', url: tpLinks.economybookings() },
    { id: 'bookingcars', url: s22c.booking },
    { id: 'qeeq', url: tpLinks.qeeq() },
    ...(EU.has(code) ? [{ id: 'autoeurope', url: tpLinks.autoeurope() }] : [])
  ];
  const transferPicks: PickItem[] = [
    { id: 'kiwitaxi', url: tpLinks.kiwitaxi() },
    ...(EU.has(code) ? [{ id: 'welcomepickups', url: tpLinks.welcomePickups() }] : []),
    { id: 'gettransfer', url: tpLinks.gettransfer() },
    { id: 'intui', url: 'https://intui.travel/' }
  ];
  const insPicks: PickItem[] = [
    { id: 'safetywing', url: tpLinks.safetywing() },
    { id: 'hellosafe', url: tpLinks.hellosafe() }
  ];
  const short = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString(loc, { day: 'numeric', month: 'short' });
  const dates = `${short(trip.d1)} – ${short(trip.d2)}`;
  const jump = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href')?.slice(1) || '';
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const [hotelView, setHotelView] = useState<'listview' | 'map'>('listview');
  const [hotelLive, setHotelLive] = useState(false);
  // Otel listesi (Stay22: Booking, Agoda, Expedia, Hotels.com fiyatlarıyla) bölüm ekrana yaklaşınca kendiliğinden açılır
  useEffect(() => {
    if (hotelLive) return;
    const el = document.getElementById('bk-hotel');
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setHotelLive(true); io.disconnect(); } }, { rootMargin: '400px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [hotelLive, code]);
  const [hotelPreset, setHotelPreset] = useState<'all' | 'budget' | 'rated' | 'stars'>('all');
  const [priceTotal, setPriceTotal] = useState(false);
  const budgetMax = language === 'tr' ? 3500 : 80;
  const hotelExtra: Record<string, string> = {
    priceper: priceTotal ? 'total' : 'nightly',
    ...(hotelPreset === 'budget' ? { max: String(priceTotal ? budgetMax * nightsOf(trip) : budgetMax) } : {}),
    ...(hotelPreset === 'rated' ? { minguestrating: '8' } : {}),
    ...(hotelPreset === 'stars' ? { minstarrating: '4' } : {})
  };
  // Turlar seçilen şehre göre; paket turların altında aynı tarihlerin en ucuz uçağı
  const tCity = city?.en || cityEn;
  const pkgFl = fl && fl.res.length ? [...fl.res].sort((x, y) => x.price - y.price)[0] : null;
  const [rentTab, setRentTab] = useState<'car' | 'moto'>('car');
  const [hotelArea, setHotelArea] = useState('');
  const [tourArea, setTourArea] = useState('');
  useEffect(() => {
    setHotelArea('');
    setTourArea('');
  }, [code]);
  const pickCity = (id: string) => {
    const c = cities.find((x) => x.id === id);
    setCityId(id);
    if (c) {
      setHotelArea(c.en);
      setTourArea(c.en);
    }
  };
  // Listede olmayan bir şehir/bölge: otel, tur ve haritalar o yere göre açılır
  const citySuggest = useMemo(() => {
    const g = getCountryGeography(code, 'en');
    return [...cities.map((c) => c.en), ...(PLACES[code] || []).map((p) => p.en), g.capital, ...g.majorCities, ...g.touristRegions].filter((x, i, a) => x && a.indexOf(x) === i);
  }, [code, cities]);
  const searchCity = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    const hit = cities.find((c) => c.en.toLowerCase() === q.toLowerCase() || c.id === q.toLowerCase());
    if (hit) return pickCity(hit.id);
    const name = findPlace(code, q)?.en || q;
    setCityId(`q:${name}`);
    setHotelArea(name);
    setTourArea(name);
  };
  const routes = (TRANSFER_ROUTES[code] || []).filter((r) => !cityId || custom || !r.city || r.city === cityId);
  const shownRoutes = routes.length ? routes : TRANSFER_ROUTES[code] || [];
  // Şehirler arası tren / otobüs / feribot: 12Go'nun herkese açık şehir verisi (en ucuz "x'ten başlayan" fiyat)
  type Ground = { to: string; slug: string; from: string; usd: number; modes: string[] };
  const groundCity = (city?.en || cityEn || '').trim();
  const [ground, setGround] = useState<Ground[]>([]);
  useEffect(() => {
    let off = false;
    setGround([]);
    if (!groundCity) return;
    const key = `vz12go:${groundCity.toLowerCase()}`;
    const use = (list: Ground[]) => {
      if (!off) setGround(list);
    };
    try {
      const c = sessionStorage.getItem(key);
      if (c) {
        use(JSON.parse(c));
        return;
      }
    } catch { /* yok */ }
    fetch(`/api/ground?city=${encodeURIComponent(groundCity)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { list?: Ground[] } | null) => {
        const list = j?.list || [];
        if (list.length) {
          try { sessionStorage.setItem(key, JSON.stringify(list)); } catch { /* yok */ }
        }
        use(list);
      })
      .catch(() => use([]));
    return () => { off = true; };
  }, [groundCity]);
  // 12Go ulaşım türleri: veri emojiyle gelir, sonuç sayfası vehclasses_tab ile o türe açılır
  const GMODES: { k: string; e: string; t: string }[] = [
    { k: 'train', e: '🚆', t: l('Tren', 'Train', 'Zug', 'Tren', 'Поезд') },
    { k: 'bus', e: '🚌', t: l('Otobüs', 'Bus', 'Bus', 'Autobús', 'Автобус') },
    { k: 'ferry', e: '🚢', t: l('Feribot', 'Ferry', 'Fähre', 'Ferry', 'Паром') },
    { k: 'van', e: '🚐', t: l('Minibüs', 'Minivan', 'Minivan', 'Minibús', 'Минивэн') },
    { k: 'charter', e: '🚕', t: l('Özel araç / taksi', 'Private car / taxi', 'Privatwagen / Taxi', 'Coche privado / taxi', 'Такси / частный трансфер') },
    { k: 'avia', e: '✈️', t: l('Uçak', 'Flight', 'Flug', 'Vuelo', 'Самолёт') }
  ];
  const modeOf = (emoji: string) => GMODES.find((m) => m.e.replace(/️/g, '') === emoji.replace(/️/g, ''));
  const [gMode, setGMode] = useState('');
  const [gTo, setGTo] = useState('');
  useEffect(() => {
    setGMode('');
    setGTo('');
  }, [groundCity]);
  const gSlug = (v: string) => v.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const gLink = (from: string, to: string, mode = gMode) => `https://12go.asia/en/travel/${from}/${to}?z=${TWELVEGO_AGENT}&sub_id=vz_${code.toLowerCase()}&date=${trip.d1}&people=${trip.n}${mode ? `&vehclasses_tab=${mode}` : ''}`;
  const groundUrl = (g: Ground) => gLink(g.from, g.slug);
  const gModesHere = GMODES.filter((m) => ground.some((g) => g.modes.some((x) => modeOf(x)?.k === m.k)));
  const gShown = gMode ? ground.filter((g) => g.modes.some((x) => modeOf(x)?.k === gMode)) : ground;
  const gSuggest = Array.from(new Set([...ground.map((g) => g.to), ...cities.map((c) => c.en)])).filter((x) => x.toLowerCase() !== groundCity.toLowerCase());
  const eurTo = (v: number) => money(v * getCrossRate('EUR', cur));
  const checked = new Date(`${PRICES_CHECKED}T12:00:00`).toLocaleDateString(loc, { day: 'numeric', month: 'short' });
  const insDays = nights + 1;
  const insUsd = Math.round(((SAFETYWING_4W_USD / 28) * Math.max(7, insDays)) * trip.n * 100) / 100;
  const carLabel: Record<CarClass, string> = {
    mini: l('Mini', 'Mini', 'Mini', 'Mini', 'Мини'),
    economy: l('Ekonomik', 'Economy', 'Economy', 'Económico', 'Эконом'),
    compact: l('Kompakt', 'Compact', 'Kompakt', 'Compacto', 'Компакт'),
    intermediate: l('Orta sınıf', 'Intermediate', 'Mittelklasse', 'Intermedio', 'Средний'),
    standard: l('Standart / SUV', 'Standard / SUV', 'Standard / SUV', 'Estándar / SUV', 'Стандарт / SUV')
  };

  return (
    <div className="vz-bk">
      {(
        <div className="vz-bk-city">
          <b><Flag code={code} size="sm" /> {l(`${getCountryName(code, language)}'da nereye gidiyorsun?`, `Where in ${getCountryName(code, 'en')} are you going?`, `Wohin in ${getCountryName(code, language)}?`, `¿A dónde en ${getCountryName(code, language)}?`, `Куда в ${getCountryName(code, language)}?`)}</b>
          <form className="vz-bk-cityq" onSubmit={(e) => { e.preventDefault(); searchCity(cityQ); }}>
            <input list={`vz-cities-${code}`} value={cityQ} onChange={(e) => setCityQ(e.target.value)} placeholder={l('Şehir, ada ya da bölge yaz (ör. Koh Phangan)', 'Type a city, island or region', 'Stadt, Insel oder Region', 'Ciudad, isla o región', 'Город, остров или регион')} aria-label={l('Şehir ara', 'Search city', 'Stadt suchen', 'Buscar ciudad', 'Поиск города')} />
            <datalist id={`vz-cities-${code}`}>{citySuggest.map((c) => <option key={c} value={c} />)}</datalist>
            <button type="submit">{l('Göster', 'Show', 'Zeigen', 'Mostrar', 'Показать')}</button>
          </form>
          <div className="vz-bk-chips" role="tablist" aria-label={l('Şehir', 'City', 'Stadt', 'Ciudad', 'Город')}>
            {custom && <button type="button" role="tab" aria-selected className="on">{custom}</button>}
            {cities.map((c) => (
              <button key={c.id} type="button" role="tab" aria-selected={city?.id === c.id} className={city?.id === c.id ? 'on' : ''} onClick={() => { setCityQ(''); pickCity(c.id); }}>{(language === 'tr' && c.tr) || c.en}</button>
            ))}
          </div>
          <small>{l('Uçuş, otel, tur, transfer, araç ve motor fiyatları seçtiğin şehre göre değişir.', 'Flights, hotels, tours, transfers, cars and bikes follow the city you pick.', 'Flüge, Hotels, Touren, Transfers, Autos und Roller richten sich nach der Stadt.', 'Vuelos, hoteles, tours, traslados, coches y motos según la ciudad.', 'Рейсы, отели, туры, трансферы, авто и байки — по выбранному городу.')}</small>
        </div>
      )}

      <nav className="vz-bk-jump" aria-label={l('Kategoriler', 'Categories', 'Kategorien', 'Categorías', 'Категории')}>
        <a href="#bk-flight" onClick={jump}>{l('Uçak', 'Flights', 'Flüge', 'Vuelos', 'Авиа')}</a>
        <a href="#bk-hotel" onClick={jump}>{l('Otel', 'Hotels', 'Hotels', 'Hoteles', 'Отели')}</a>
        <a href="#bk-tours" onClick={jump}>{l('Turlar', 'Tours', 'Touren', 'Tours', 'Туры')}</a>
        <a href="#bk-transfer" onClick={jump}>{l('Transfer', 'Transfer', 'Transfer', 'Traslado', 'Трансфер')}</a>
        {ground.length > 0 && <a href="#bk-ground" onClick={jump}>{l('Tren · Otobüs · Feribot', 'Train · Bus · Ferry', 'Zug · Bus · Fähre', 'Tren · Bus · Ferry', 'Поезд · Автобус · Паром')}</a>}
        <a href="#bk-esim" onClick={jump}>eSIM</a>
        <a href="#bk-car" onClick={jump}>{l('Araç', 'Car', 'Mietwagen', 'Coche', 'Авто')}</a>
        <a href="#bk-ins" onClick={jump}>{l('Sigorta', 'Insurance', 'Versicherung', 'Seguro', 'Страховка')}</a>
      </nav>


      {trip.from !== code && fromIata && toIata && (
        <Sec id="bk-flight" icon="plane" title={l(`${getCountryName(trip.from, language)} → ${getCountryName(code, language)} uçuşları`, `Flights ${getCountryName(trip.from, 'en')} → ${getCountryName(code, 'en')}`, `Flüge ${getCountryName(trip.from, language)} → ${getCountryName(code, language)}`, `Vuelos ${getCountryName(trip.from, language)} → ${getCountryName(code, language)}`, `Перелёт ${getCountryName(trip.from, language)} → ${getCountryName(code, language)}`)} note={l('Fiyatlar Aviasales’te son günlerde bulunan en düşük fiyatlar, kişi başı; birkaç saatte bir yenilenir. Kesin fiyat ödeme sayfasında.', 'Lowest fares seen on Aviasales recently, per person; refreshed every few hours. Final price at checkout.', 'Niedrigste kürzlich gesehene Preise auf Aviasales, pro Person; alle paar Stunden aktualisiert.', 'Tarifas más bajas vistas en Aviasales, por persona; se actualizan cada pocas horas.', 'Минимальные цены Aviasales, на человека; обновляются каждые несколько часов.')}>
          <div className="vz-bk-seg vz-fl-mode" role="group" aria-label={l('Uçuş türü', 'Trip type', 'Reiseart', 'Tipo de viaje', 'Тип поездки')}>
            {([
              ['rt', l('Gidiş-dönüş', 'Round trip', 'Hin & zurück', 'Ida y vuelta', 'Туда-обратно')],
              ['any', l('Süre esnek', 'Any length', 'Flexibel', 'Flexible', 'Любой срок')],
              ['ow', l('Sadece gidiş', 'One way', 'Nur Hinflug', 'Solo ida', 'Только туда')],
              ['ret', l('Sadece dönüş', 'Return only', 'Nur Rückflug', 'Solo vuelta', 'Только обратно')]
            ] as const).map(([k, t]) => (
              <button key={k} type="button" aria-pressed={fmode === k} className={fmode === k ? 'on' : ''} onClick={() => setFmode(k)}>{t}</button>
            ))}
          </div>
          <div className="vz-fl-tools">
          <button type="button" className={`vz-fl-cal${calOpen ? ' on' : ''}`} aria-expanded={calOpen} onClick={() => setCalOpen((v) => !v)}>
            <Icon name="cal" size={16} duo={false} />{l('Fiyat takvimi: en ucuz günler', 'Price calendar: cheapest days', 'Preiskalender: günstigste Tage', 'Calendario de precios', 'Календарь цен')}
          </button>
          <label className="vz-bk-toggle">
            <input type="checkbox" checked={directOnly} onChange={(e) => setDirectOnly(e.target.checked)} />
            <span>{l('Sadece aktarmasız uçuşlar', 'Direct flights only', 'Nur Direktflüge', 'Solo vuelos directos', 'Только прямые рейсы')}</span>
          </label>
          </div>
          {calOpen && (
            <div className="vz-fl-calbox">
              <FareCalendar
                key={fmode}
                from={fA}
                to={fB}
                nights={nights}
                cur={cur.toLowerCase()}
                dep={fDay}
                money={money}
                mode={fmode === 'rt' ? 'rt' : fmode === 'any' ? 'any' : 'ow'}
                onPick={(a, b) => {
                  if (fmode === 'ret') setTrip?.({ d2: a });
                  else if (fmode === 'ow') setTrip?.({ d1: a, d2: plusDays(a, nights) });
                  else setTrip?.({ d1: a, d2: b });
                  setCalOpen(false);
                }}
              />
            </div>
          )}
          {fl === null ? (
            <div className="vz-live-skel" aria-hidden="true"><i /><i /><i /></div>
          ) : fl.res.length > 0 ? (
            <div className="vz-bk-fares">
              {fl.res.map((f, i) => (
                <a key={`${f.dep}${f.ret}`} className={`vz-qd-fare${i === 0 ? ' best' : ''}`} href={f.link || aviaLink} target="_blank" rel="noopener noreferrer sponsored">
                  {i === 0 && <em>{l('En ucuz', 'Cheapest', 'Am günstigsten', 'Más barato', 'Дешевле всего')}</em>}
                  <b>{money(f.price, fl.cur)}</b>
                  {f.airline && (
                    <i className="vz-fl-air"><img src={`https://pics.avs.io/40/40/${f.airline}.png`} alt="" width={20} height={20} loading="lazy" />{AIRLINES[f.airline] || f.airline}</i>
                  )}
                  <span>{fmtDay(f.dep)}{f.ret ? ` → ${fmtDay(f.ret)}` : ''}{f.ret && fmode === 'any' ? ` · ${Math.round((Date.parse(f.ret) - Date.parse(f.dep)) / 864e5)} ${l('gece', 'nights', 'Nächte', 'noches', 'ноч.')}` : ''}</span>
                  <small>{f.transfers === 0 ? l('Direkt', 'Direct', 'Direkt', 'Directo', 'Прямой') : l(`${f.transfers ?? '?'} aktarma`, `${f.transfers ?? '?'} stop(s)`, `${f.transfers ?? '?'} Umstieg`, `${f.transfers ?? '?'} escala`, `пересадок: ${f.transfers ?? '?'}`)} · {l('Bileti al', 'Book', 'Buchen', 'Reservar', 'Купить')} ›</small>
                </a>
              ))}
            </div>
          ) : (
            <>
            {directOnly && <p className="vz-bk-op">{l('Bu tarihlerde aktarmasız uçuş fiyatı bulunamadı.', 'No direct-flight fares found for these dates.', 'Keine Direktflug-Preise für diese Daten.', 'Sin tarifas directas para estas fechas.', 'Прямых рейсов на эти даты не найдено.')}</p>}
            <a className="vz-bk-cta" href={aviaLink} target="_blank" rel="noopener noreferrer sponsored">{l(`${dates} için uçuşları canlı ara`, `Search live flights for ${dates}`, `Flüge für ${dates} live suchen`, `Buscar vuelos para ${dates}`, `Искать рейсы на ${dates}`)} <AdTag /></a>
            </>
          )}
          <Picks label={l('Diğer sitelerde karşılaştır:', 'Compare on other sites:', 'Woanders vergleichen:', 'Comparar en otros sitios:', 'Сравнить:')} items={flightPicks} k={`f${code}${trip.d1}${trip.d2}`} />
        </Sec>
      )}

      <Sec id="bk-hotel" icon="bed" title={l('Nerede kalınır?', 'Where to stay', 'Wo übernachten?', 'Dónde alojarse', 'Где остановиться')} note={l(`${nights} gece · ${trip.n} kişi. Fiyatlar seçtiğin tarihlerle ortak sitede açılır.`, `${nights} nights · ${trip.n} guests. Prices open with your dates on the partner site.`, `${nights} Nächte · ${trip.n} Personen. Preise mit deinen Daten beim Partner.`, `${nights} noches · ${trip.n} personas. Precios con tus fechas en el sitio del socio.`, `${nights} ноч. · ${trip.n} гост. Цены на ваши даты на сайте партнёра.`)}>
        <div className="vz-bk-chips" role="tablist" aria-label={l('Bölge', 'Area', 'Gegend', 'Zona', 'Район')}>
          {hotelArea && !areas.some((a) => a.en === hotelArea) && <button type="button" role="tab" aria-selected className="on">{hotelArea}</button>}
          {areas.map((a) => (
            <button key={a.en} type="button" role="tab" aria-selected={(hotelArea || areas[0]?.en) === a.en} className={(hotelArea || areas[0]?.en) === a.en ? 'on' : ''} onClick={() => setHotelArea(a.en)}>{a.name}</button>
          ))}
        </div>
        <PlaceQ code={code} id={`vz-hq-${code}`} onPick={setHotelArea} />
        {!hotelLive ? (
          <>
            <div className="vz-hq">
              {(['booking', 'agoda', 'expedia', 'hotelscom'] as const).map((id) => (
                <a key={id} className="vz-hq-card" href={stay22(id, hq((hotelArea || areas[0]?.en || cityEn)))} target="_blank" rel="noopener noreferrer sponsored">
                  <img src={tpLogo(id)} alt="" width={28} height={28} loading="lazy" />
                  <span><b>{({ booking: 'Booking.com', agoda: 'Agoda', expedia: 'Expedia', hotelscom: 'Hotels.com' } as const)[id]}</b><small>{(areas.find((x) => x.en === (hotelArea || areas[0]?.en))?.name || hotelArea || cityEn)} · {dates} · {trip.n} {l('kişi', 'guests', 'Pers.', 'pers.', 'чел.')}</small></span>
                  <em>{l('Fiyatları gör', 'See prices', 'Preise ansehen', 'Ver precios', 'Цены')} ›</em>
                </a>
              ))}
            </div>
            <button type="button" className="vz-bk-cta vz-hq-live" onClick={() => setHotelLive(true)}><Icon name="map" size={16} duo={false} />{l('Haritada otelleri ve canlı fiyatları göster', 'Show hotels and live prices on the map', 'Hotels und Live-Preise auf der Karte', 'Ver hoteles y precios en el mapa', 'Отели и цены на карте')}</button>
          </>
        ) : (
          <>
        <div className="vz-bk-seg" role="group" aria-label={l('Görünüm', 'View', 'Ansicht', 'Vista', 'Вид')}>
          <button type="button" aria-pressed={hotelView === 'listview'} className={hotelView === 'listview' ? 'on' : ''} onClick={() => setHotelView('listview')}><Icon name="doc" size={16} duo={false} />{l('Liste', 'List', 'Liste', 'Lista', 'Список')}</button>
          <button type="button" aria-pressed={hotelView === 'map'} className={hotelView === 'map' ? 'on' : ''} onClick={() => setHotelView('map')}><Icon name="map" size={16} duo={false} />{l('Harita', 'Map', 'Karte', 'Mapa', 'Карта')}</button>
        </div>
        <div className="vz-bk-filters">
          <div className="vz-bk-chips sm" role="group" aria-label={l('Hızlı seçim', 'Quick picks', 'Schnellauswahl', 'Selección rápida', 'Быстрый выбор')}>
            {([
              ['all', l('Tümü', 'All', 'Alle', 'Todos', 'Все')],
              ['budget', l(`Ekonomik (gecelik ${budgetMax.toLocaleString('tr-TR')} ₺ altı)`, `Budget (under ${budgetMax} €/night)`, `Günstig (unter ${budgetMax} €/Nacht)`, `Económico (menos de ${budgetMax} €/noche)`, `Эконом (до ${budgetMax} $/ночь)`)],
              ['rated', l('Misafir puanı 8+', 'Guest rating 8+', 'Gästebewertung 8+', 'Nota 8+', 'Оценка 8+')],
              ['stars', l('4–5 yıldız', '4–5 stars', '4–5 Sterne', '4–5 estrellas', '4–5 звёзд')]
            ] as const).map(([k, t]) => (
              <button key={k} type="button" aria-pressed={hotelPreset === k} className={hotelPreset === k ? 'on' : ''} onClick={() => setHotelPreset(k)}>{t}</button>
            ))}
          </div>
          <label className="vz-bk-toggle">
            <input type="checkbox" checked={priceTotal} onChange={(e) => setPriceTotal(e.target.checked)} />
            <span>{l(`Toplam fiyatı göster (${nights} gece, vergiler dahil)`, `Show total price (${nights} nights, taxes incl.)`, `Gesamtpreis zeigen (${nights} Nächte, inkl. Steuern)`, `Precio total (${nights} noches, impuestos incl.)`, `Итоговая цена (${nights} ноч., с налогами)`)}</span>
          </label>
        </div>
        <Stay22Frame view={hotelView} extra={hotelExtra} mode="accommodation" address={`${hotelArea || areas[0]?.en || cityEn}, ${countryEn}`} trip={trip} campaign={`cp_${code.toLowerCase()}_map`} title={l('Otel haritası ve fiyatlar', 'Hotel map and prices', 'Hotelkarte und Preise', 'Mapa de hoteles y precios', 'Карта отелей и цены')} />
          </>
        )}
        {hotelLive && <Picks label={l('Otel sitesini seç:', 'Choose a hotel site:', 'Hotelseite wählen:', 'Elige un sitio:', 'Выберите сайт:')} items={hotelPicks} k={`h${code}${trip.d1}${trip.d2}${trip.n}`} />}
      </Sec>

      <Sec id="bk-tours" icon="ticket" title={l('Turlar ve aktiviteler', 'Tours & activities', 'Touren & Aktivitäten', 'Tours y actividades', 'Экскурсии и развлечения')}>
        <div className="vz-bk-chips" role="tablist" aria-label={l('Yer', 'Place', 'Ort', 'Lugar', 'Место')}>
          {[...(tourArea && tourArea !== tCity ? [tourArea] : []), tCity, ...sights].filter((x, i, a) => a.indexOf(x) === i).map((s) => (
            <button key={s} type="button" role="tab" aria-selected={(tourArea || tCity) === s} className={(tourArea || tCity) === s ? 'on' : ''} onClick={() => setTourArea(s)}>{s === cityEn ? (GEO_DATA[code]?.capital ? capitalName(code, language, GEO_DATA[code].capital) : s) : s}</button>
          ))}
        </div>
        <PlaceQ code={code} id={`vz-tq-${code}`} onPick={setTourArea} />
        <TourShowcase q={tourArea || tCity} country={countryEn} money={(v: number, c: string) => money(v * getCrossRate(c, cur))} fallback={<Stay22Frame mode="experience" address={`${tourArea || tCity}, ${countryEn}`} trip={trip} campaign={`cp_${code.toLowerCase()}_exp`} title={l('Turlar, biletler ve fiyatlar', 'Tours, tickets and prices', 'Touren, Tickets und Preise', 'Tours, entradas y precios', 'Экскурсии, билеты и цены')} />} />
        {pkg && (
          <div className="vz-bk-pkg">
            <b>{l('Hazır paket turlar', 'Package tours', 'Pauschalrundreisen', 'Circuitos', 'Пакетные туры')} · {pkg.route}</b>
            <LiveTours pkg={pkg.id} />
            {pkgFl && (
              <a className="vz-pkg-fl" href={aviaLink} target="_blank" rel="noopener noreferrer sponsored">
                <Icon name="plane" size={16} duo={false} />
                <span>{l(`Aynı tarihlerde uçak: ${fromIata} → ${toIata}, ${dates}`, `Flights for these dates: ${fromIata} → ${toIata}, ${dates}`, `Flüge zu diesen Daten: ${fromIata} → ${toIata}, ${dates}`, `Vuelos en estas fechas: ${fromIata} → ${toIata}, ${dates}`, `Перелёт на эти даты: ${fromIata} → ${toIata}, ${dates}`)}</span>
                <b>~{money(pkgFl.price, fl!.cur)}</b>
                <small>{l('kişi başı · Aviasales', 'per person · Aviasales', 'pro Person · Aviasales', 'por persona · Aviasales', 'на человека · Aviasales')} ›</small>
              </a>
            )}
          </div>
        )}
        <Picks label={l('Tur sitesini seç:', 'Choose a tour site:', 'Tourseite wählen:', 'Elige un sitio:', 'Выберите сайт:')} items={tourPicks} k={`t${code}`} />
      </Sec>

      <Sec id="bk-transfer" icon="car" title={l(`Havalimanı transferi${toIata ? ` (${toIata})` : ''}`, `Airport transfer${toIata ? ` (${toIata})` : ''}`, `Flughafentransfer${toIata ? ` (${toIata})` : ''}`, `Traslado al aeropuerto${toIata ? ` (${toIata})` : ''}`, `Трансфер из аэропорта${toIata ? ` (${toIata})` : ''}`)}>
        {shownRoutes.length > 0 && (
          <>
            <b className="vz-bk-op">Kiwitaxi</b>
            <div className="vz-bk-fares">
              {shownRoutes.map((r) => (
                <a key={r.slug} className="vz-qd-fare" href={kiwiRouteUrl(code, r.slug, language)} target="_blank" rel="noopener noreferrer sponsored">
                  <b>~{r.cur === 'EUR' ? eurTo(r.usd) : usdTo(r.usd)}</b>
                  <span>{r.from} ({r.iata}) → {r.to}</span>
                  <small>{l('araç başı, sabit fiyat', 'per car, fixed price', 'pro Auto, Festpreis', 'por coche, precio fijo', 'за авто, фикс. цена')} ›</small>
                </a>
              ))}
            </div>
          </>
        )}
        <Picks label={l('Karşılamalı, sabit fiyatlı transfer:', 'Meet & greet, fixed price:', 'Mit Abholung, Festpreis:', 'Con recogida, precio fijo:', 'С встречей, фиксированная цена:')} items={transferPicks} k={`tr${code}`} />
      </Sec>

      {ground.length > 0 && (
        <Sec id="bk-ground" icon="transit" title={l(`${groundCity} çıkışlı tren, otobüs ve feribot`, `Trains, buses & ferries from ${groundCity}`, `Zug, Bus & Fähre ab ${groundCity}`, `Trenes, buses y ferris desde ${groundCity}`, `Поезда, автобусы и паромы из ${groundCity}`)} note={l('"’den" fiyatı, o rotadaki en ucuz seçeneğin (tür fark etmeksizin) kişi başı başlangıç fiyatıdır (12Go). Bir tür seçince o türün saat ve fiyatları seçtiğin tarihle 12Go’da açılır.', 'Lowest "from" prices via 12Go, per person. Times and final price open on 12Go with your date.', 'Ab-Preise über 12Go, pro Person. Zeiten und Endpreis mit deinem Datum auf 12Go.', 'Precios "desde" de 12Go, por persona. Horarios y precio final en 12Go con tu fecha.', 'Цены «от» через 12Go, за человека. Расписание и итоговая цена — на 12Go на вашу дату.')}>
          <div className="vz-bk-chips sm" role="tablist" aria-label={l('Ulaşım türü', 'Transport type', 'Verkehrsmittel', 'Tipo de transporte', 'Тип транспорта')}>
            <button type="button" role="tab" aria-selected={!gMode} className={!gMode ? 'on' : ''} onClick={() => setGMode('')}>{l('Hepsi', 'All', 'Alle', 'Todos', 'Все')}</button>
            {gModesHere.map((m) => (
              <button key={m.k} type="button" role="tab" aria-selected={gMode === m.k} className={gMode === m.k ? 'on' : ''} onClick={() => setGMode(m.k)}>
                <ModeBadge k={m.k} /> {m.t}
              </button>
            ))}
          </div>
          <form className="vz-bk-cityq vz-gr-q" onSubmit={(e) => { e.preventDefault(); const hit = ground.find((g) => g.to.toLowerCase() === gTo.trim().toLowerCase()); const to = hit?.slug || gSlug(gTo); if (to) window.open(gLink(ground[0]?.from || gSlug(groundCity), to), '_blank', 'noopener'); }}>
            <input list={`vz-gr-${code}`} value={gTo} onChange={(e) => setGTo(e.target.value)} placeholder={l(`${groundCity} → nereye? (ör. Krabi)`, `${groundCity} → where to? (e.g. Krabi)`, `${groundCity} → wohin? (z. B. Krabi)`, `${groundCity} → ¿a dónde? (p. ej. Krabi)`, `${groundCity} → куда? (напр. Krabi)`)} aria-label={l('Varış yeri', 'Destination', 'Ziel', 'Destino', 'Куда')} />
            <datalist id={`vz-gr-${code}`}>{gSuggest.map((c) => <option key={c} value={c} />)}</datalist>
            <button type="submit">{gMode ? l(`${GMODES.find((m) => m.k === gMode)?.t} ara`, `Find ${GMODES.find((m) => m.k === gMode)?.t}`, `${GMODES.find((m) => m.k === gMode)?.t} suchen`, `Buscar ${GMODES.find((m) => m.k === gMode)?.t}`, `Найти: ${GMODES.find((m) => m.k === gMode)?.t}`) : l('Sefer ara', 'Find trips', 'Suchen', 'Buscar', 'Найти')}</button>
          </form>
          <b className="vz-bk-op">{l('Popüler rotalar · 12Go', 'Popular routes · 12Go', 'Beliebte Strecken · 12Go', 'Rutas populares · 12Go', 'Популярные маршруты · 12Go')}</b>
          <div className="vz-bk-fares">
            {gShown.map((g) => (
              <a key={g.slug} className="vz-qd-fare" href={groundUrl(g)} target="_blank" rel="noopener noreferrer sponsored">
                {gMode ? (
                  <b className="vz-gr-see">{l(`${GMODES.find((m) => m.k === gMode)?.t} saat ve fiyatları`, `${GMODES.find((m) => m.k === gMode)?.t} times & prices`, `${GMODES.find((m) => m.k === gMode)?.t}: Zeiten & Preise`, `${GMODES.find((m) => m.k === gMode)?.t}: horarios y precios`, `${GMODES.find((m) => m.k === gMode)?.t}: расписание и цены`)} ›</b>
                ) : (
                  <b>{l('', '', 'ab ', 'desde ', 'от ')}~{usdTo(g.usd)}{l('’den', '', '', '', '')}</b>
                )}
                <span>{groundCity} → {g.to}</span>
                <small className="vz-gr-modes">{g.modes.map((x) => modeOf(x)).filter((m): m is NonNullable<typeof m> => !!m && (!gMode || m.k === gMode)).map((m) => <ModeBadge key={m.k} k={m.k} title={m.t} />)}</small>
              </a>
            ))}
          </div>
        </Sec>
      )}

      <Sec id="bk-esim" icon="phone" title={l('İnternet (eSIM)', 'Mobile data (eSIM)', 'Mobile Daten (eSIM)', 'Datos móviles (eSIM)', 'Мобильный интернет (eSIM)')} note={esim.length || flexi.length ? l('Yukarıdaki fiyatlar Airalo, FlexiRoam ve Yesim paketleri, düzenli güncellenir. Nomad ve GigSky paketleri kendi sitelerinde açılır.', 'Prices above are Airalo, FlexiRoam and Yesim plans, updated regularly. Other providers show their plans on their own sites.', 'Preise oben: Airalo-Tarife, täglich aktualisiert. Andere Anbieter zeigen ihre Tarife auf ihrer Seite.', 'Precios de planes Airalo, actualizados a diario. Otros proveedores muestran sus planes en su web.', 'Цены выше — тарифы Airalo, обновляются ежедневно. Тарифы других — на их сайтах.') : undefined}>
        {!inTR && esim.length > 0 && <b className="vz-bk-op">Airalo</b>}
        {!inTR && esim.length > 0 && (
          <div className="vz-bk-fares">
            {esim.map((p) =>
              React.createElement(
                inTR ? 'div' : 'a',
                { key: p[3], className: `vz-qd-fare${!inTR && p[2] === esimMin ? ' best' : ''}`, ...(inTR ? {} : { href: `https://www.airalo.com/${p[3]}`, target: '_blank', rel: 'noopener noreferrer sponsored' }) },
                <b>{usdTo(p[2])}</b>,
                <span>{p[0] ? `${p[0]} GB` : l('Sınırsız', 'Unlimited', 'Unbegrenzt', 'Ilimitado', 'Безлимит')} · {p[1]} {l('gün', 'days', 'Tage', 'días', 'дн.')}</span>,
                <small>{inTR ? l('Airalo · yurt dışında açılır', 'Airalo', 'Airalo', 'Airalo', 'Airalo') : 'Airalo ›'}</small>
              )
            )}
          </div>
        )}
        {flexi.length > 0 && <b className="vz-bk-op">FlexiRoam</b>}
        {flexi.length > 0 && (
          <div className="vz-bk-fares">
            {flexi.map((p) => (
              <a key={p[3]} className={`vz-qd-fare${p[2] === esimMin ? ' best' : ''}`} href={p[3]} target="_blank" rel="noopener noreferrer sponsored">
                {p[2] === esimMin && <em>{l('En ucuz', 'Cheapest', 'Am günstigsten', 'Más barato', 'Дешевле всего')}</em>}
                <b>{usdTo(p[2])}</b>
                <span>{p[0]} GB · {p[1]} {l('gün', 'days', 'Tage', 'días', 'дн.')}</span>
                <small>FlexiRoam ›</small>
              </a>
            ))}
          </div>
        )}
        {yesim && yesim.p.length > 0 && <b className="vz-bk-op">Yesim</b>}
        {yesim && yesim.p.length > 0 && (
          <div className="vz-bk-fares">
            {yesim.p.map((p) => (
              <a key={`y${p[0]}-${p[1]}`} className={`vz-qd-fare${p[2] === esimMin ? ' best' : ''}`} href={`https://yesim.app/country/${yesim.slug}/`} target="_blank" rel="noopener noreferrer sponsored">
                {p[2] === esimMin && <em>{l('En ucuz', 'Cheapest', 'Am günstigsten', 'Más barato', 'Дешевле всего')}</em>}
                <b>{usdTo(p[2])}</b>
                <span>{p[0]} GB · {p[1]} {l('gün', 'days', 'Tage', 'días', 'дн.')}</span>
                <small>Yesim ›</small>
              </a>
            ))}
          </div>
        )}
        <Picks label={l('eSIM firmasını seç:', 'Choose your eSIM:', 'eSIM wählen:', 'Elige tu eSIM:', 'Выберите eSIM:')} items={esimPicks} k={`e${code}`} />
      </Sec>

      <div className="vz-bk-two">
        <Sec id="bk-car" icon="car" title={l('Araç ve scooter kiralama', 'Car & scooter rental', 'Auto & Roller mieten', 'Coches y motos', 'Аренда авто и скутеров')}>
          {cities.some((c) => c.moto) && (
            <div className="vz-bk-chips" role="tablist" aria-label={l('Kiralık araç türü', 'Rental type', 'Mietart', 'Tipo de alquiler', 'Тип аренды')}>
              <button type="button" role="tab" aria-selected={rentTab === 'car'} className={rentTab === 'car' ? 'on' : ''} onClick={() => setRentTab('car')}><ModeBadge k="car" /> {l('Araba', 'Car', 'Auto', 'Coche', 'Авто')}</button>
              <button type="button" role="tab" aria-selected={rentTab === 'moto'} className={rentTab === 'moto' ? 'on' : ''} onClick={() => setRentTab('moto')}><ModeBadge k="scooter" /> {l('Motor / scooter', 'Motorbike / scooter', 'Motorrad / Roller', 'Moto / scooter', 'Мото / скутер')}</button>
            </div>
          )}
          {rentTab === 'car' || !cities.some((c) => c.moto) ? (
            <>
            {city?.car?.usd && (
              <>
                <b className="vz-bk-op">{city.en} · EconomyBookings · {l('günlük, yaklaşık', 'per day, approx.', 'pro Tag, ca.', 'por día, aprox.', 'в день, ок.')}</b>
                <div className="vz-bk-fares">
                  {(Object.entries(city.car.usd) as [CarClass, number][]).sort((a, b) => a[1] - b[1]).slice(0, 4).map(([k, v], i) => (
                    <a key={k} className={`vz-qd-fare${i === 0 ? ' best' : ''}`} href={carCityUrl(city.car!.path)} target="_blank" rel="noopener noreferrer sponsored">
                      <b>~{usdTo(v)}</b>
                      <span>{carLabel[k]}</span>
                      <small>{l('Araçları gör', 'See cars', 'Autos ansehen', 'Ver coches', 'Смотреть')} ›</small>
                    </a>
                  ))}
                </div>
              </>
            )}
            {cities.some((c) => c.lr) && (
              <>
                <b className="vz-bk-op">Localrent · {l('günlük, başlayan fiyat', 'per day, from', 'pro Tag, ab', 'por día, desde', 'в день, от')}</b>
                <div className="vz-bk-fares">
                  {[...cities.filter((c) => c.lr && c.id === city?.id), ...cities.filter((c) => c.lr && c.id !== city?.id)].map((c) => (
                    <a key={c.id} className={`vz-qd-fare${c.id === city?.id ? ' best' : ''}`} href={`https://localrent.com/en/${c.lr!.path}/`} target="_blank" rel="noopener noreferrer sponsored">
                      <b>{c.lr!.eur ? `~${eurTo(c.lr!.eur)}` : l('Fiyatları gör', 'See prices', 'Preise', 'Ver precios', 'Цены')}</b>
                      <span>{(language === 'tr' && c.tr) || c.en}</span>
                      <small>{l('Yerel kiralama firmaları', 'Local rental companies', 'Lokale Vermieter', 'Empresas locales', 'Местные прокаты')} ›</small>
                    </a>
                  ))}
                </div>
              </>
            )}
            {!city?.car && !cities.some((c) => c.lr) && (
              <p className="vz-bk-note">{l(`${city?.en || cityEn} için kayıtlı araç fiyatımız yok; aşağıdaki sitelerde seçtiğin tarihlerle bak.`, `No saved car prices for ${city?.en || cityEn}; check the sites below with your dates.`, `Keine gespeicherten Preise für ${city?.en || cityEn}.`, `Sin precios guardados para ${city?.en || cityEn}.`, `Нет сохранённых цен для ${city?.en || cityEn}.`)}</p>
            )}
            {city?.car && !city.car.usd && (
              <a className="vz-bk-cta" href={carCityUrl(city.car.path)} target="_blank" rel="noopener noreferrer sponsored">{l(`${city.en} araç kiralama fiyatlarını gör`, `See car rental prices in ${city.en}`, `Mietwagenpreise in ${city.en}`, `Precios de alquiler en ${city.en}`, `Цены аренды авто: ${city.en}`)} <AdTag /></a>
            )}
            </>
          ) : (
            <>
              <b className="vz-bk-op">Rentalmotorbike · {l('günlük kiralama, başlayan fiyat', 'daily rental, from', 'pro Tag, ab', 'por día, desde', 'в день, от')}</b>
              <div className="vz-bk-fares">
                {[...cities.filter((c) => c.moto && c.id === city?.id), ...cities.filter((c) => c.moto && c.id !== city?.id)].map((c) => (
                  <a key={c.id} className={`vz-qd-fare${c.id === city?.id ? ' best' : ''}`} href={scooterUrl(c.moto!.slug)} target="_blank" rel="noopener noreferrer sponsored">
                    <b>{c.moto!.eur ? `~${eurTo(c.moto!.eur)}` : l('Fiyatları gör', 'See prices', 'Preise', 'Ver precios', 'Цены')}</b>
                    <span>{(language === 'tr' && c.tr) || c.en}</span>
                    <small>{l('Motor ve scooter', 'Bikes & scooters', 'Motorräder & Roller', 'Motos y scooters', 'Мото и скутеры')} ›</small>
                  </a>
                ))}
              </div>
            </>
          )}
          <small className="vz-bk-checked">{l(`Fiyatlar ${checked} tarihinde ortak sitelerden alındı; kesin fiyat tarihe göre ortak sitede.`, `Prices checked on ${checked}; final price on the partner site.`, `Preise geprüft am ${checked}; Endpreis beim Partner.`, `Precios revisados el ${checked}; precio final en el sitio del socio.`, `Цены проверены ${checked}; итог — на сайте партнёра.`)}</small>
          <Picks label={l(`${dates}:`, `${dates}:`, `${dates}:`, `${dates}:`, `${dates}:`)} items={carPicks} k={`c${code}${trip.d1}`} />
        </Sec>
        <Sec id="bk-ins" icon="shield" title={l('Seyahat sigortası', 'Travel insurance', 'Reiseversicherung', 'Seguro de viaje', 'Страховка')}>
          <a className="vz-qd-fare best vz-ins-card" href={tpLinks.safetywing()} target="_blank" rel="noopener noreferrer sponsored">
            <em>SafetyWing Nomad Insurance</em>
            <b>~{usdTo(insUsd)}</b>
            <span>{l(`${insDays} gün · ${trip.n} kişi · 10–39 yaş`, `${insDays} days · ${trip.n} people · age 10–39`, `${insDays} Tage · ${trip.n} Pers. · 10–39 J.`, `${insDays} días · ${trip.n} pers. · 10–39 años`, `${insDays} дн. · ${trip.n} чел. · 10–39 лет`)}</span>
            <small>{l('Toplam, ABD hariç dünya geneli. Yaş artınca fiyat artar.', 'Total, worldwide excl. US. Price rises with age.', 'Gesamt, weltweit ohne USA. Preis steigt mit dem Alter.', 'Total, mundial sin EE. UU. Sube con la edad.', 'Итого, весь мир кроме США. Дороже с возрастом.')} ›</small>
          </a>
          <Picks label={l(`${nights + 1} gün · ${trip.n} kişi:`, `${nights + 1} days · ${trip.n} people:`, `${nights + 1} Tage · ${trip.n} Personen:`, `${nights + 1} días · ${trip.n} personas:`, `${nights + 1} дн. · ${trip.n} чел.:`)} items={insPicks} k={`i${code}`} />
        </Sec>
      </div>

      <p className="vz-bk-disc">{l('Bu bağlantılar iş ortağı bağlantısıdır; senin için fiyat değişmez, Vizamigo’nun ücretsiz kalmasına yardım eder. Ödeme her zaman ortak sitede yapılır.', 'These are partner links; your price stays the same and it keeps Vizamigo free. Payment always happens on the partner site.', 'Partnerlinks; dein Preis bleibt gleich. Bezahlt wird immer beim Partner.', 'Enlaces de socios; tu precio no cambia. El pago siempre se hace en el sitio del socio.', 'Партнёрские ссылки; цена для вас та же. Оплата всегда на сайте партнёра.')}</p>

    </div>
  );
};

/** Stay22 harita vitrini: fotoğraflı, tarihli canlı fiyatlar. Bölüme yaklaşınca yüklenir. */
const S22_LANG = new Set(['tr', 'en', 'de', 'es']);
export const Stay22Frame: React.FC<{ mode: 'accommodation' | 'experience'; address: string; trip: Trip; campaign: string; title: string; view?: 'listview' | 'map'; extra?: Record<string, string> }> = ({ mode, address, trip, campaign, title, view = 'listview', extra }) => {
  const { language } = useI18n();
  const ref = React.useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(thirdPartyAllowed);
  useEffect(() => {
    const f = () => setAllowed(thirdPartyAllowed());
    window.addEventListener('vz:consent', f);
    return () => window.removeEventListener('vz:consent', f);
  }, []);
  useEffect(() => {
    // sayfa açıldıktan kısa süre sonra arka planda yüklemeye başla, kişi aşağı inince hazır olsun
    const t = setTimeout(() => setOn(true), 700);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el || on) return;
    if (typeof IntersectionObserver === 'undefined') {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        setOn(true);
        io.disconnect();
      }
    }, { rootMargin: '1500px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [on]);
  const q = new URLSearchParams({
    aid: STAY22_AID,
    address,
    checkin: trip.d1,
    checkout: trip.d2,
    adults: String(trip.n),
    campaign,
    invmode: mode,
    maincolor: '0b7287',
    ljs: S22_LANG.has(language) ? language : 'en',
    currency: language === 'tr' ? 'TRY' : language === 'ru' ? 'USD' : 'EUR',
    ...(extra || {}),
    viewmode: view,
    ...(view === 'listview' ? { listviewexpand: 'true' } : {}),
    zoom: '12',
    hidemodeswitcher: 'true',
    hidesearchbar: 'true',
    hideallezbutton: 'true',
    hidebrandlogo: 'true'
  });
  return (
    <div ref={ref} className={`vz-s22${ready ? ' ready' : ''}`}>
      {!allowed && (
        <div className="vz-s22-ask">
          <p>{language === 'de' ? 'Live-Preise werden vom Partner Stay22 geladen (setzt Cookies).' : language === 'es' ? 'Los precios en vivo los carga el socio Stay22 (usa cookies).' : language === 'ru' ? 'Живые цены загружает партнёр Stay22 (использует cookies).' : language === 'tr' ? 'Canlı fiyatlar iş ortağımız Stay22’den yüklenir (çerez kullanır).' : 'Live prices are loaded from our partner Stay22 (uses cookies).'}</p>
          <button type="button" className="vz-btn vz-btn-primary sm" onClick={() => setAllowed(true)}>{language === 'de' ? 'Preise laden' : language === 'es' ? 'Cargar precios' : language === 'ru' ? 'Загрузить цены' : language === 'tr' ? 'Fiyatları yükle' : 'Load prices'}</button>
        </div>
      )}
      {allowed && on && <iframe key={q.toString()} title={title} src={`https://www.stay22.com/embed/gm?${q.toString()}`} referrerPolicy="strict-origin-when-cross-origin" onLoad={() => setTimeout(() => setReady(true), 900)} />}
      {allowed && !ready && (
        <div className="vz-s22-skel" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i}><i /><b /><s /></div>)}
        </div>
      )}
    </div>
  );
};

/** Kendi tur vitrinimiz: fotoğraf, puan, süre, fiyat bizim kartlarımızda; yalnızca "Rezervasyon" ile ortak siteye gidilir. */
type VItem = { id: string; title: string; img: string; rating: number | null; reviews: number; mins: number; price: number | null; cur: string; free: boolean; url: string };
const vCache = new Map<string, { ok: boolean; items: VItem[] }>();
export const TourShowcase: React.FC<{ q: string; country: string; money: (v: number, c: string) => string; fallback: React.ReactNode }> = ({ q, country, money, fallback }) => {
  const { l, language } = useI18n();
  const k = `${q}|${country}|${language}`;
  const [data, setData] = useState<{ ok: boolean; items: VItem[] } | null>(() => vCache.get(k) || null);
  useEffect(() => {
    const hit = vCache.get(k);
    if (hit) {
      setData(hit);
      return;
    }
    setData(null);
    let alive = true;
    fetch(`/api/viator?q=${encodeURIComponent(q)}&country=${encodeURIComponent(country)}&lang=${language}&n=12`)
      .then((r) => (r.ok ? r.json() : { ok: false }))
      .then((j) => {
        const v = { ok: !!j.ok && Array.isArray(j.items) && j.items.length > 0, items: (j.items || []) as VItem[] };
        vCache.set(k, v);
        if (alive) setData(v);
      })
      .catch(() => alive && setData({ ok: false, items: [] }));
    return () => {
      alive = false;
    };
  }, [k, q, country, language]);
  if (data && !data.ok) return <>{fallback}</>;
  if (!data)
    return (
      <div className="vz-tc-grid" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="vz-tc-card sk"><i /><b /><s /></div>)}
      </div>
    );
  const dur = (m: number) => (!m ? '' : m >= 1440 ? l(`${Math.round(m / 1440)} gün`, `${Math.round(m / 1440)} days`, `${Math.round(m / 1440)} Tage`, `${Math.round(m / 1440)} días`, `${Math.round(m / 1440)} дн.`) : m >= 60 ? l(`${Math.round(m / 60)} saat`, `${Math.round(m / 60)} h`, `${Math.round(m / 60)} Std.`, `${Math.round(m / 60)} h`, `${Math.round(m / 60)} ч`) : `${m} ${l('dk', 'min', 'Min.', 'min', 'мин')}`);
  return (
    <div className="vz-tc-grid">
      {data.items.map((t, i) => (
        <a key={t.id || i} className="vz-tc-card" href={t.url} target="_blank" rel="noopener noreferrer sponsored">
          <span className="vz-tc-img">{t.img && <img src={t.img} alt="" loading={i < 4 ? 'eager' : 'lazy'} decoding="async" />}{t.free && <em>{l('Ücretsiz iptal', 'Free cancellation', 'Kostenlos stornierbar', 'Cancelación gratuita', 'Бесплатная отмена')}</em>}</span>
          <span className="vz-tc-body">
            <b>{t.title}</b>
            <small>{t.rating ? `★ ${t.rating.toFixed(1)} (${t.reviews.toLocaleString()})` : ''}{t.rating && t.mins ? ' · ' : ''}{dur(t.mins)}</small>
            <span className="vz-tc-foot">
              {t.price != null && <span className="vz-tc-price"><small>{l('kişi başı', 'from', 'ab', 'desde', 'от')}</small> {money(t.price, t.cur)}</span>}
              <span className="vz-tc-go">{l('Rezervasyon', 'Book', 'Buchen', 'Reservar', 'Бронь')} ›</span>
            </span>
          </span>
        </a>
      ))}
      <p className="vz-bk-note" style={{ gridColumn: '1 / -1' }}>{l('Fiyatlar Viator’dan, 12 saatte bir yenilenir. Rezervasyon ve ödeme Viator’da yapılır.', 'Prices from Viator, refreshed every 12 hours. Booking and payment on Viator.', 'Preise von Viator, alle 12 Std. aktualisiert. Buchung bei Viator.', 'Precios de Viator, cada 12 horas. Reserva en Viator.', 'Цены Viator, обновляются каждые 12 часов. Бронь на Viator.')}</p>
    </div>
  );
};
