import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';
import { AdTag, Flag } from './ui';
import { Picks, type PickItem } from './Picks';
import { LiveTours } from './LiveTours';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { getCountryGeography } from '../data/countryGeography';
import { capitalName } from '../data/capitalNames';
import { getCrossRate } from '../data/currencyRates';
import { tpLinks, stay22, s22Flights, s22Cars, gygLink, RAYNA_COUNTRIES } from '../data/tpPartners';
import { TOURS, PACKAGES, LIVE } from '../data/tours';
import ESIM from '../data/esimPrices.json';

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

type Fl = { price: number; dep: string; ret: string | null; transfers: number | null; link: string | null };
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

const Sec: React.FC<{ id: string; icon: string; title: string; note?: string; children: React.ReactNode }> = ({ id, icon, title, note, children }) => (
  <section id={id} className="vz-bk-sec">
    <h3 className="vz-bk-h"><span className="vz-ic sm"><Icon name={icon as never} size={18} /></span>{title}</h3>
    {children}
    {note && <p className="vz-bk-note">{note}</p>}
  </section>
);

export const BookingHub: React.FC<{ code: string; trip: Trip; mustSee?: string[] }> = ({ code, trip, mustSee = [] }) => {
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
  const toIata = (GEO_DATA[code]?.mainHub || '').split('/')[0];
  const countryEn = getCountryName(code, 'en');
  const geoEn = useMemo(() => getCountryGeography(code, 'en'), [code]);
  const geoLoc = useMemo(() => getCountryGeography(code, language), [code, language]);
  const cityEn = GEO_DATA[code]?.capital ? capitalName(code, 'en', GEO_DATA[code].capital) : countryEn;
  const inTR = inTurkey();

  // Uçuş: seçilen tarihlere en yakın gerçek fiyatlar (Aviasales önbelleği, sunucuda saatlerce önbelleklenir)
  const [fl, setFl] = useState<{ cur: string; res: Fl[] } | null>(null);
  useEffect(() => {
    setFl(null);
    if (!fromIata || !toIata || fromIata === toIata || trip.from === code) return;
    let alive = true;
    const t = setTimeout(() => {
      fetch(`/api/cheap-flights?from=${fromIata}&to=${toIata}&start=${plusDays(trip.d1, -3)}&end=${plusDays(trip.d1, 3)}&len=${Math.min(30, nights)}&cur=${cur.toLowerCase()}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => alive && setFl({ cur: j?.currency || cur, res: Array.isArray(j?.results) ? j.results.slice(0, 3) : [] }))
        .catch(() => alive && setFl({ cur, res: [] }));
    }, 300);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [fromIata, toIata, trip.d1, nights, cur, code, trip.from]);
  const ddmm = (s: string) => `${s.slice(8, 10)}${s.slice(5, 7)}`;
  const aviaLink = `https://www.aviasales.com/search/${fromIata}${ddmm(trip.d1)}${toIata}${ddmm(trip.d2)}${trip.n}`;
  const s22f = s22Flights(fromIata, toIata, trip.d1, trip.d2, trip.n, `cp_${code.toLowerCase()}`);
  const flightPicks: PickItem[] = [
    { id: 'aviasales', url: aviaLink },
    { id: 'kayak', url: s22f.kayak },
    { id: 'expedia', url: s22f.expedia }
  ];

  // Otel: başkent + büyük şehirler + turistik bölgeler
  const areas = useMemo(() => {
    const en = [geoEn.capital, ...geoEn.majorCities, ...geoEn.touristRegions];
    const lc = [geoLoc.capital, ...geoLoc.majorCities, ...geoLoc.touristRegions];
    const out: { en: string; name: string }[] = [];
    en.forEach((e, i) => {
      if (e && !out.some((o) => o.en === e) && out.length < 4) out.push({ en: e, name: lc[i] || e });
    });
    return out;
  }, [geoEn, geoLoc]);
  const hq = (place: string) => ({ address: `${place}, ${countryEn}`, checkin: trip.d1, checkout: trip.d2, adults: trip.n, campaign: `cp_${code.toLowerCase()}` });
  const hotelPicks: PickItem[] = [
    { id: 'booking', url: stay22('booking', hq(cityEn)) },
    { id: 'agoda', url: stay22('agoda', hq(cityEn)) },
    { id: 'expedia', url: stay22('expedia', hq(cityEn)) },
    { id: 'hotelscom', url: stay22('hotelscom', hq(cityEn)) },
    { id: 'hostelworld', url: `https://www.hostelworld.com/find/?search_keywords=${encodeURIComponent(cityEn)}` }
  ];

  // Turlar: ülkedeki görülecek yerler + canlı paket turlar
  const tourDest = TOURS.find((t) => t.code === code);
  const pkg = PACKAGES.find((p) => p.code === code && LIVE[p.id]);
  const sights = mustSee.map((s) => s.split(/[:(–—-]\s/)[0].trim()).filter((s, i, a) => s && s.length < 48 && a.indexOf(s) === i).slice(0, 6);
  const gyg = (q: string) => stay22('getyourguide', { address: `${q}, ${countryEn}`, campaign: `cp_${code.toLowerCase()}_tour` });
  const tourPicks: PickItem[] = [
    ...(RAYNA_COUNTRIES.has(code) ? [{ id: 'raynatours', url: tpLinks.raynatours() }] : []),
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
  const esimPicks: PickItem[] = [
    { id: 'nomad', url: tpLinks.nomad() },
    { id: 'flexiroam', url: tpLinks.flexiroam() },
    { id: 'drimsim', url: tpLinks.drimsim() },
    { id: 'airalo', url: esim[0] ? `https://www.airalo.com/${esim[0][3].split('/')[0]}` : 'https://www.airalo.com/', blocked: inTR },
    { id: 'saily', url: tpLinks.saily(), blocked: inTR }
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

  return (
    <div className="vz-bk">
      <nav className="vz-bk-jump" aria-label={l('Kategoriler', 'Categories', 'Kategorien', 'Categorías', 'Категории')}>
        <a href="#bk-flight">{l('Uçak', 'Flights', 'Flüge', 'Vuelos', 'Авиа')}</a>
        <a href="#bk-hotel">{l('Otel', 'Hotels', 'Hotels', 'Hoteles', 'Отели')}</a>
        <a href="#bk-tours">{l('Turlar', 'Tours', 'Touren', 'Tours', 'Туры')}</a>
        <a href="#bk-transfer">{l('Transfer', 'Transfer', 'Transfer', 'Traslado', 'Трансфер')}</a>
        <a href="#bk-esim">eSIM</a>
        <a href="#bk-car">{l('Araç', 'Car', 'Mietwagen', 'Coche', 'Авто')}</a>
        <a href="#bk-ins">{l('Sigorta', 'Insurance', 'Versicherung', 'Seguro', 'Страховка')}</a>
      </nav>

      {trip.from !== code && fromIata && toIata && (
        <Sec id="bk-flight" icon="plane" title={l(`${getCountryName(trip.from, language)} → ${getCountryName(code, language)} uçuşları`, `Flights ${getCountryName(trip.from, 'en')} → ${getCountryName(code, 'en')}`, `Flüge ${getCountryName(trip.from, language)} → ${getCountryName(code, language)}`, `Vuelos ${getCountryName(trip.from, language)} → ${getCountryName(code, language)}`, `Перелёт ${getCountryName(trip.from, language)} → ${getCountryName(code, language)}`)} note={l('Fiyatlar Aviasales’te son günlerde bulunan en düşük fiyatlar, kişi başı; birkaç saatte bir yenilenir. Kesin fiyat ödeme sayfasında.', 'Lowest fares seen on Aviasales recently, per person; refreshed every few hours. Final price at checkout.', 'Niedrigste kürzlich gesehene Preise auf Aviasales, pro Person; alle paar Stunden aktualisiert.', 'Tarifas más bajas vistas en Aviasales, por persona; se actualizan cada pocas horas.', 'Минимальные цены Aviasales, на человека; обновляются каждые несколько часов.')}>
          {fl === null ? (
            <div className="vz-live-skel" aria-hidden="true"><i /><i /><i /></div>
          ) : fl.res.length > 0 ? (
            <div className="vz-bk-fares">
              {fl.res.map((f, i) => (
                <a key={`${f.dep}${f.ret}`} className={`vz-qd-fare${i === 0 ? ' best' : ''}`} href={f.link || aviaLink} target="_blank" rel="noopener noreferrer sponsored">
                  {i === 0 && <em>{l('En ucuz', 'Cheapest', 'Am günstigsten', 'Más barato', 'Дешевле всего')}</em>}
                  <b>{money(f.price, fl.cur)}</b>
                  <span>{fmtDay(f.dep)}{f.ret ? ` → ${fmtDay(f.ret)}` : ''}</span>
                  <small>{f.transfers === 0 ? l('Direkt', 'Direct', 'Direkt', 'Directo', 'Прямой') : l(`${f.transfers ?? '?'} aktarma`, `${f.transfers ?? '?'} stop(s)`, `${f.transfers ?? '?'} Umstieg`, `${f.transfers ?? '?'} escala`, `пересадок: ${f.transfers ?? '?'}`)} · {l('Bileti al', 'Book', 'Buchen', 'Reservar', 'Купить')} ›</small>
                </a>
              ))}
            </div>
          ) : (
            <a className="vz-bk-cta" href={aviaLink} target="_blank" rel="noopener noreferrer sponsored">{l(`${dates} için uçuşları canlı ara`, `Search live flights for ${dates}`, `Flüge für ${dates} live suchen`, `Buscar vuelos para ${dates}`, `Искать рейсы на ${dates}`)} <AdTag /></a>
          )}
          <Picks label={l('Diğer sitelerde karşılaştır:', 'Compare on other sites:', 'Woanders vergleichen:', 'Comparar en otros sitios:', 'Сравнить:')} items={flightPicks} k={`f${code}${trip.d1}${trip.d2}`} />
        </Sec>
      )}

      <Sec id="bk-hotel" icon="bed" title={l('Nerede kalınır?', 'Where to stay', 'Wo übernachten?', 'Dónde alojarse', 'Где остановиться')} note={l(`${nights} gece · ${trip.n} kişi. Fiyatlar seçtiğin tarihlerle ortak sitede açılır.`, `${nights} nights · ${trip.n} guests. Prices open with your dates on the partner site.`, `${nights} Nächte · ${trip.n} Personen. Preise mit deinen Daten beim Partner.`, `${nights} noches · ${trip.n} personas. Precios con tus fechas en el sitio del socio.`, `${nights} ноч. · ${trip.n} гост. Цены на ваши даты на сайте партнёра.`)}>
        <div className="vz-bk-cards">
          {areas.map((a) => (
            <a key={a.en} className="vz-bk-card" href={stay22('booking', hq(a.en))} target="_blank" rel="noopener noreferrer sponsored">
              <span className="vz-ic"><Icon name="bed" size={20} /></span>
              <b>{a.name}</b>
              <small>{dates}</small>
              <span className="vz-bk-go">{l('Otelleri ve fiyatları gör', 'See hotels & prices', 'Hotels & Preise', 'Ver hoteles y precios', 'Отели и цены')} ›</span>
            </a>
          ))}
        </div>
        <Picks label={l('Otel sitesini seç:', 'Choose a hotel site:', 'Hotelseite wählen:', 'Elige un sitio:', 'Выберите сайт:')} items={hotelPicks} k={`h${code}${trip.d1}${trip.d2}${trip.n}`} />
      </Sec>

      <Sec id="bk-tours" icon="ticket" title={l('Turlar ve aktiviteler', 'Tours & activities', 'Touren & Aktivitäten', 'Tours y actividades', 'Экскурсии и развлечения')}>
        {sights.length > 0 && (
          <div className="vz-bk-cards">
            {sights.map((s) => (
              <a key={s} className="vz-bk-card" href={gyg(s)} target="_blank" rel="noopener noreferrer sponsored">
                <span className="vz-ic"><Icon name="landmark" size={20} /></span>
                <b>{s}</b>
                <span className="vz-bk-go">{l('Tur ve bilet bul', 'Find tours & tickets', 'Touren & Tickets', 'Tours y entradas', 'Экскурсии и билеты')} ›</span>
              </a>
            ))}
          </div>
        )}
        {pkg && (
          <div className="vz-bk-pkg">
            <b>{l('Hazır paket turlar', 'Package tours', 'Pauschalrundreisen', 'Circuitos', 'Пакетные туры')} · {pkg.route}</b>
            <LiveTours pkg={pkg.id} />
          </div>
        )}
        <Picks label={l('Tur sitesini seç:', 'Choose a tour site:', 'Tourseite wählen:', 'Elige un sitio:', 'Выберите сайт:')} items={tourPicks} k={`t${code}`} />
      </Sec>

      <Sec id="bk-transfer" icon="car" title={l(`Havalimanı transferi${toIata ? ` (${toIata})` : ''}`, `Airport transfer${toIata ? ` (${toIata})` : ''}`, `Flughafentransfer${toIata ? ` (${toIata})` : ''}`, `Traslado al aeropuerto${toIata ? ` (${toIata})` : ''}`, `Трансфер из аэропорта${toIata ? ` (${toIata})` : ''}`)}>
        <Picks label={l('Karşılamalı, sabit fiyatlı transfer:', 'Meet & greet, fixed price:', 'Mit Abholung, Festpreis:', 'Con recogida, precio fijo:', 'С встречей, фиксированная цена:')} items={transferPicks} k={`tr${code}`} />
      </Sec>

      <Sec id="bk-esim" icon="phone" title={l('İnternet (eSIM)', 'Mobile data (eSIM)', 'Mobile Daten (eSIM)', 'Datos móviles (eSIM)', 'Мобильный интернет (eSIM)')} note={esim.length ? l('Paket fiyatları Airalo listesinden, günlük güncellenir.', 'Plan prices from Airalo, updated daily.', 'Preise von Airalo, täglich aktualisiert.', 'Precios de Airalo, actualizados a diario.', 'Цены Airalo, обновляются ежедневно.') : undefined}>
        {esim.length > 0 && (
          <div className="vz-bk-fares">
            {esim.map((p) =>
              React.createElement(
                inTR ? 'div' : 'a',
                { key: p[3], className: 'vz-qd-fare', ...(inTR ? {} : { href: `https://www.airalo.com/${p[3]}`, target: '_blank', rel: 'noopener noreferrer sponsored' }) },
                <b>{usdTo(p[2])}</b>,
                <span>{p[0] ? `${p[0]} GB` : l('Sınırsız', 'Unlimited', 'Unbegrenzt', 'Ilimitado', 'Безлимит')} · {p[1]} {l('gün', 'days', 'Tage', 'días', 'дн.')}</span>,
                <small>{inTR ? l('Airalo · yurt dışında açılır', 'Airalo', 'Airalo', 'Airalo', 'Airalo') : 'Airalo ›'}</small>
              )
            )}
          </div>
        )}
        <Picks label={l('eSIM firmasını seç:', 'Choose your eSIM:', 'eSIM wählen:', 'Elige tu eSIM:', 'Выберите eSIM:')} items={esimPicks} k={`e${code}`} />
      </Sec>

      <div className="vz-bk-two">
        <Sec id="bk-car" icon="car" title={l('Araç ve scooter kiralama', 'Car & scooter rental', 'Auto & Roller mieten', 'Coches y motos', 'Аренда авто и скутеров')}>
          <Picks label={l(`${dates}:`, `${dates}:`, `${dates}:`, `${dates}:`, `${dates}:`)} items={carPicks} k={`c${code}${trip.d1}`} />
        </Sec>
        <Sec id="bk-ins" icon="shield" title={l('Seyahat sigortası', 'Travel insurance', 'Reiseversicherung', 'Seguro de viaje', 'Страховка')}>
          <Picks label={l(`${nights + 1} gün · ${trip.n} kişi:`, `${nights + 1} days · ${trip.n} people:`, `${nights + 1} Tage · ${trip.n} Personen:`, `${nights + 1} días · ${trip.n} personas:`, `${nights + 1} дн. · ${trip.n} чел.:`)} items={insPicks} k={`i${code}`} />
        </Sec>
      </div>

      <p className="vz-bk-disc">{l('Bu bağlantılar iş ortağı bağlantısıdır; senin için fiyat değişmez, Vizamigo’nun ücretsiz kalmasına yardım eder. Ödeme her zaman ortak sitede yapılır.', 'These are partner links; your price stays the same and it keeps Vizamigo free. Payment always happens on the partner site.', 'Partnerlinks; dein Preis bleibt gleich. Bezahlt wird immer beim Partner.', 'Enlaces de socios; tu precio no cambia. El pago siempre se hace en el sitio del socio.', 'Партнёрские ссылки; цена для вас та же. Оплата всегда на сайте партнёра.')}</p>

    </div>
  );
};
