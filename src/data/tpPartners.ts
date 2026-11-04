/**
 * Travelpayouts iş ortakları (Vizamigo projesi, Drive ile otomatik ortaklık bağlantısı).
 *
 * Kural: sitede yalnızca Travelpayouts kataloğunda bulunan markalara yönlendirme yapılır.
 * Bağlantılar markanın kendi adresine düz bağlantıdır; sayfaya eklenen Travelpayouts Drive
 * betiği (index.html) tıklamada bunları otomatik olarak ortaklık bağlantısına çevirir.
 * Böylece ek kod yükü olmadan her tıklama gelir sağlar.
 *
 * Logolar: markanın kendi sitesindeki simge (favicon), Google'ın simge servisinden,
 * küçük boyutta ve "lazy" yüklenir.
 */

export type TpId =
  | 'safetywing'
  | 'hellosafe'
  | 'tourradar'
  | 'aviasales'
  | 'tripcom'
  | 'kiwi'
  | 'omio'
  | 'twelvego'
  | 'booking'
  | 'agoda'
  | 'expedia'
  | 'hostelworld'
  | 'kiwitaxi'
  | 'welcomepickups'
  | 'gettransfer'
  | 'intui'
  | 'discovercars'
  | 'localrent'
  | 'getyourguide'
  | 'viator'
  | 'klook'
  | 'tiqets'
  | 'airalo'
  | 'yesim'
  | 'saily'
  | 'airhelp'
  | 'radicalstorage'
  | 'economybookings'
  | 'getrentacar'
  | 'qeeq'
  | 'autoeurope'
  | 'bikesbooking'
  | 'gocity'
  | 'wegotrip'
  | 'kkday'
  | 'gigsky'
  | 'drimsim'
  | 'compensair'
  | 'hotelscom'
  | 'kayak'
  | 'bookingcars'
  | 'expediacars';

export interface TpBrand {
  name: string;
  domain: string;
  /** Travelpayouts katalogundaki komisyon (bilgi amaçlı) */
  rate: string;
}

export const TP: Record<TpId, TpBrand> = {
  aviasales: { name: 'Aviasales', domain: 'aviasales.com', rate: '1.1–1.3%' },
  tripcom: { name: 'Trip.com', domain: 'trip.com', rate: '1–5.5%' },
  kiwi: { name: 'Kiwi.com', domain: 'kiwi.com', rate: '3%' },
  omio: { name: 'Omio', domain: 'omio.com', rate: '6%' },
  twelvego: { name: '12Go', domain: '12go.asia', rate: '4–5.5%' },
  booking: { name: 'Booking.com', domain: 'booking.com', rate: '3–5%' },
  agoda: { name: 'Agoda', domain: 'agoda.com', rate: '1–6%' },
  expedia: { name: 'Expedia', domain: 'expedia.com', rate: '1.35–3.6%' },
  hostelworld: { name: 'Hostelworld', domain: 'hostelworld.com', rate: '40% rev share' },
  kiwitaxi: { name: 'Kiwitaxi', domain: 'kiwitaxi.com', rate: '9–11%' },
  welcomepickups: { name: 'Welcome Pickups', domain: 'welcomepickups.com', rate: '8–9%' },
  gettransfer: { name: 'GetTransfer', domain: 'gettransfer.com', rate: '4–25%' },
  intui: { name: 'intui.travel', domain: 'intui.travel', rate: '10%' },
  discovercars: { name: 'DiscoverCars', domain: 'discovercars.com', rate: '23–54%' },
  localrent: { name: 'Localrent', domain: 'localrent.com', rate: '7.5–10%' },
  getyourguide: { name: 'GetYourGuide', domain: 'getyourguide.com', rate: '8%' },
  viator: { name: 'Viator', domain: 'viator.com', rate: '8%' },
  klook: { name: 'Klook', domain: 'klook.com', rate: '2–5%' },
  tiqets: { name: 'Tiqets', domain: 'tiqets.com', rate: '3.5–8%' },
  airalo: { name: 'Airalo', domain: 'airalo.com', rate: '12%' },
  yesim: { name: 'Yesim', domain: 'yesim.app', rate: '18%' },
  saily: { name: 'Saily', domain: 'saily.com', rate: '15%' },
  airhelp: { name: 'AirHelp', domain: 'airhelp.com', rate: '15–16.6%' },
  radicalstorage: { name: 'Radical Storage', domain: 'radicalstorage.com', rate: '8%' },
  economybookings: { name: 'Economybookings', domain: 'economybookings.com', rate: '3–8%' },
  getrentacar: { name: 'GetRentacar', domain: 'getrentacar.com', rate: '10%' },
  qeeq: { name: 'QEEQ', domain: 'qeeq.com', rate: '5–10%' },
  autoeurope: { name: 'AutoEurope', domain: 'autoeurope.eu', rate: '4.4–8%' },
  bikesbooking: { name: 'BikesBooking', domain: 'bikesbooking.com', rate: '4%' },
  gocity: { name: 'Go City', domain: 'gocity.com', rate: '3.4–6%' },
  wegotrip: { name: 'WeGoTrip', domain: 'wegotrip.com', rate: '6.6–41.5%' },
  kkday: { name: 'KKday', domain: 'kkday.com', rate: '1–3%' },
  gigsky: { name: 'GigSky', domain: 'gigsky.com', rate: '20%' },
  drimsim: { name: 'Drimsim', domain: 'drimsim.com', rate: '€8' },
  compensair: { name: 'Compensair', domain: 'compensair.com', rate: '€5–12' },
  safetywing: { name: 'SafetyWing', domain: 'safetywing.com', rate: '10%' },
  hellosafe: { name: 'HelloSafe', domain: 'hellosafe.com', rate: '10–20%' },
  tourradar: { name: 'TourRadar', domain: 'tourradar.com', rate: 'TourRadar' },
  hotelscom: { name: 'Hotels.com', domain: 'hotels.com', rate: '1.35–3.6%' },
  kayak: { name: 'Kayak', domain: 'kayak.com', rate: 'Stay22' },
  bookingcars: { name: 'Booking.com Cars', domain: 'booking.com', rate: 'Stay22' },
  expediacars: { name: 'Expedia', domain: 'expedia.com', rate: 'Stay22' }
};

/**
 * Vizamigo projesinde bağlı olmayan (trafik şartı yüzünden kilitli) markalar.
 * Travelpayouts: "en az 3 ay üst üste düzenli trafik" sonrası "Submit for review".
 * Kilit açılınca buradan çıkar; bağlantılar otomatik olarak markanın kendisine döner.
 * Kontrol: 4 Kasım 2026 (25 bağlı program, 20 kilitli).
 */
export const LOCKED = new Set<TpId>(['tripcom', 'omio', 'twelvego', 'hostelworld', 'discovercars', 'getyourguide', 'viator']);
const LOCKED_HOSTS = ['trip.com', 'omio.com', '12go.asia', '12go.co', 'agoda.com', 'expedia.com', 'hostelworld.com', 'discovercars.com', 'getyourguide.com', 'viator.com', 'tripadvisor.com', 'hotels.com', 'vrbo.com', 'rentalcars.com', 'skyscanner.com', 'skyscanner.net'];

/**
 * Stay22 (aid: vizamigo): Booking, Agoda, Expedia, Hotels.com, Vrbo rezervasyonlarından komisyon.
 * Biçim: https://www.stay22.com/allez/{provider}?aid=…&address=…&checkin=…&checkout=…&adults=…
 * Belgeler: https://dev.stay22.com/docs/allez/parameters
 */
export const STAY22_AID = 'vizamigo';
export type Stay22Provider = 'booking' | 'agoda' | 'expedia' | 'hotelscom' | 'vrbo' | 'roam' | 'getyourguide' | 'kayak';
export function stay22(provider: Stay22Provider, o: { address?: string; checkin?: string; checkout?: string; adults?: number; link?: string; campaign?: string } = {}): string {
  const q = new URLSearchParams({ aid: STAY22_AID });
  if (o.link) q.set('link', o.link);
  if (o.address) q.set('address', o.address);
  if (o.checkin) q.set('checkin', o.checkin);
  if (o.checkout) q.set('checkout', o.checkout);
  if (o.adults) q.set('adults', String(o.adults));
  q.set('campaign', o.campaign || 'vizamigo_site');
  return `https://www.stay22.com/allez/${provider}?${q}`;
}
/**
 * GetYourGuide (Stay22): Türkiye'deki ziyaretçide Stay22 getyourguide.com.tr'ye yönlendiriyor ve o alan adı
 * her sayfayı ana sayfaya atıyor (4 Kasım 2026 testi). Türkiye'de aynı Stay22 ortaklık parametreleriyle
 * doğrudan getyourguide.com/tr-tr/… sayfasına gidilir; diğer ülkelerde normal Stay22 bağlantısı.
 */
const GYG_STAY22_PARTNER = 'ZM6TN20';
const inTurkey = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Europe/Istanbul';
  } catch {
    return false;
  }
};
/** GetYourGuide araması (sayfa yoksa): Türkiye'de doğrudan /tr-tr/s/?q=, başka yerde Stay22 address. */
export function gygSearch(q: string, campaign: string): string {
  if (!inTurkey()) return stay22('getyourguide', { address: q, campaign });
  const p = new URLSearchParams({ q, partner_id: GYG_STAY22_PARTNER, cmp: `${STAY22_AID}-${campaign}_${STAY22_AID}`, partner_visitor_id: STAY22_AID, psrc: 'partner_api' });
  return `https://www.getyourguide.com/tr-tr/s/?${p}`;
}
export function gygLink(pageUrl: string, campaign: string): string {
  if (!inTurkey()) return stay22('getyourguide', { link: pageUrl, campaign });
  const u = new URL(pageUrl);
  const q = new URLSearchParams({ partner_id: GYG_STAY22_PARTNER, cmp: `${STAY22_AID}-${campaign}_${STAY22_AID}`, partner_visitor_id: STAY22_AID, psrc: 'partner_api' });
  return `https://www.getyourguide.com/tr-tr${u.pathname}?${q}`;
}
const mdY = (d: string) => `${d.slice(5, 7)}/${d.slice(8, 10)}/${d.slice(0, 4)}`;
/** Uçuş: Kayak ve Expedia (Stay22 üzerinden, komisyonlu) */
export const s22Flights = (from: string, to: string, dep: string, ret?: string, n = 1, campaign = 'site') => ({
  kayak: stay22('kayak', { link: `https://www.kayak.com/flights/${from}-${to}/${dep}${ret ? `/${ret}` : ''}${n > 1 ? `/${n}adults` : ''}`, campaign }),
  expedia: stay22('expedia', {
    link: `https://www.expedia.com/Flights-Search?trip=${ret ? 'roundtrip' : 'oneway'}&leg1=from:${from},to:${to},departure:${mdY(dep)}TANYT${ret ? `&leg2=from:${to},to:${from},departure:${mdY(ret)}TANYT` : ''}&passengers=adults:${n}`,
    campaign
  })
});
/** Araç: Booking Cars ve Expedia (Stay22 üzerinden, komisyonlu) */
export const s22Cars = (city: string, dep?: string, ret?: string, campaign = 'site') => ({
  booking: stay22('booking', { link: `https://cars.booking.com/search-results?locationName=${encodeURIComponent(city)}`, campaign }),
  expedia: stay22('expedia', { link: `https://www.expedia.com/carsearch?locn=${encodeURIComponent(city)}${dep ? `&date1=${mdY(dep)}` : ''}${ret ? `&date2=${mdY(ret)}` : ''}`, campaign })
});
/** Seyahat ürünleri (Stay22 Retail): arama kelimesiyle en uygun mağaza */
export const s22Retail = (search: string, campaign = 'packing') =>
  `https://www.stay22.com/allez/retail?${new URLSearchParams({ aid: STAY22_AID, search, campaign })}`;
const STAY22_HOSTS: [string, Stay22Provider][] = [['booking.com', 'booking'], ['agoda.com', 'agoda'], ['expedia.com', 'expedia'], ['hotels.com', 'hotelscom'], ['vrbo.com', 'vrbo']];

/** Komisyon getirmeyen (kilitli) bir marka bağlantısını, bağlı bir alternatife çevirir. Otel bağlantıları hizmet için olduğu gibi kalır. */
/** SafetyWing elçi bağlantısı (Nomad Insurance, %10). */
const SW_REF = '26626704';
export const SAFETYWING = `https://safetywing.com/nomad-insurance?referenceID=${SW_REF}&utm_source=${SW_REF}&utm_medium=Ambassador`;

export function routeLink(url: string): string {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return url;
  }
  const host = u.hostname.replace(/^www\./, '');
  const is = (d: string) => host === d || host.endsWith('.' + d);
  // Otel siteleri → Stay22 üzerinden (komisyonlu)
  // SafetyWing: her bağlantıya elçi kodu
  if (is('safetywing.com')) {
    if (!u.searchParams.get('referenceID')) {
      u.searchParams.set('referenceID', SW_REF);
      u.searchParams.set('utm_source', SW_REF);
      u.searchParams.set('utm_medium', 'Ambassador');
    }
    return u.toString();
  }
  const s22 = STAY22_HOSTS.find(([d]) => is(d));
  if (s22) return stay22(s22[1], { link: url });
  if (!LOCKED_HOSTS.some(is)) return url;
  const q = u.searchParams.get('q') || u.searchParams.get('text') || u.searchParams.get('query') || u.searchParams.get('destination') || '';
  // Uçuş: Trip.com / Skyscanner → Aviasales
  if ((is('trip.com') && u.pathname.startsWith('/flights')) || is('skyscanner.com') || is('skyscanner.net')) return 'https://www.aviasales.com/';
  // Araç kiralama: DiscoverCars / Rentalcars → Economybookings
  if (is('discovercars.com') || is('rentalcars.com')) return 'https://www.economybookings.com/';
  // Tur ve aktivite: GetYourGuide / Viator / Tripadvisor → Klook araması
  if (is('getyourguide.com') && q) return stay22('getyourguide', { address: q });
  if (is('getyourguide.com') || is('viator.com') || is('tripadvisor.com')) return q ? `https://www.klook.com/search/result/?query=${encodeURIComponent(q)}` : 'https://www.klook.com/';
  // Tren ve otobüs: Omio / 12Go → Kiwi.com (tren + otobüs + uçak)
  if (is('omio.com') || is('12go.asia') || is('12go.co')) return 'https://www.kiwi.com/en/';
  // Otel: bağlı otel markası yok; kullanıcı seçebilsin diye Booking, Agoda, Trip.com, Expedia vb. olduğu gibi kalır
  return url;
}

/** Markanın kendi simgesi (64px) */
export const tpLogo = (id: TpId): string => `https://www.google.com/s2/favicons?domain=${TP[id].domain}&sz=64`;

/** Bir bağlantının hangi Travelpayouts markasına gittiğini bulur (logo göstermek için) */
export function tpIdFromUrl(url: string | undefined): TpId | undefined {
  if (!url) return undefined;
  let host = '';
  try {
    host = new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return undefined;
  }
  if (host === 'stay22.com') {
    const prov = url.match(/\/allez\/([a-z]+)/)?.[1];
    return prov === 'hotelscom' ? 'hotelscom' : prov && prov in TP ? (prov as TpId) : 'booking';
  }
  return (Object.keys(TP) as TpId[]).find((id) => host === TP[id].domain || host.endsWith('.' + TP[id].domain));
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Tarihi Aviasales'in istediği GGAA biçimine çevirir (yoksa 30 gün sonrası) */
const ddmm = (date?: string) => {
  const d = date ? new Date(date) : new Date(Date.now() + 30 * 864e5);
  if (isNaN(d.getTime())) return ddmm();
  return `${String(d.getDate()).padStart(2, '0')}${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const ASIA_RAIL = new Set(['TH', 'VN', 'KH', 'LA', 'MY', 'ID', 'PH', 'SG', 'MM', 'JP', 'KR', 'TW', 'CN', 'IN', 'LK', 'NP']);
const EU_RAIL = new Set([
  'AT', 'BE', 'BG', 'CH', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'NL',
  'NO', 'PL', 'PT', 'RO', 'RS', 'SE', 'SI', 'SK', 'BA', 'ME', 'MK', 'AL', 'TR', 'US', 'CA', 'BR', 'MX'
]);

/** Ülkeye ve hub havalimanına göre hazır arama bağlantıları */
export const tpLinks = {
  /** Aviasales uçuş araması: IATA kodlarıyla, ör. IST2811NRT1 */
  flights: (fromIata: string | undefined, toIata: string | undefined, date?: string) =>
    fromIata && toIata && /^[A-Z]{3}$/.test(fromIata) && /^[A-Z]{3}$/.test(toIata)
      ? `https://www.aviasales.com/search/${fromIata}${ddmm(date)}${toIata}1`
      : `https://www.aviasales.com/`,
  tripFlights: () => `https://www.aviasales.com/`,
  kiwi: () => `https://www.kiwi.com/en/`,
  /** Kara/deniz yolu: Asya için 12Go, Avrupa/Amerika için Omio, diğerleri için Kiwi */
  ground: (fromCode: string, toCode: string): { id: TpId; url: string } =>
    ASIA_RAIL.has(toCode) || ASIA_RAIL.has(fromCode)
      ? (LOCKED.has('twelvego') ? { id: 'kiwi', url: `https://www.kiwi.com/en/` } : { id: 'twelvego', url: `https://12go.asia/en` })
      : EU_RAIL.has(toCode) && EU_RAIL.has(fromCode) && !LOCKED.has('omio')
        ? { id: 'omio', url: `https://www.omio.com/` }
        : { id: 'kiwi', url: `https://www.kiwi.com/en/` },
  booking: (place: string) => stay22('booking', { address: place }),
  agoda: (place?: string) => stay22('agoda', { address: place }),
  tripHotels: () => `https://www.trip.com/hotels/`,
  expedia: (place: string) => stay22('expedia', { address: place }),
  hostelworld: () => `https://www.hostelworld.com/`,
  kiwitaxi: () => `https://kiwitaxi.com/`,
  welcomePickups: () => `https://www.welcomepickups.com/`,
  gettransfer: () => `https://gettransfer.com/`,
  discovercars: (country: string) => (LOCKED.has('discovercars') ? `https://www.economybookings.com/` : `https://www.discovercars.com/${slug(country)}`),
  economybookings: () => `https://www.economybookings.com/`,
  getrentacar: () => `https://getrentacar.com/`,
  qeeq: () => `https://www.qeeq.com/`,
  autoeurope: () => `https://www.autoeurope.eu/`,
  bikesbooking: () => `https://bikesbooking.com/`,
  gocity: () => `https://gocity.com/`,
  wegotrip: () => `https://wegotrip.com/`,
  kkday: () => `https://www.kkday.com/`,
  gigsky: () => `https://www.gigsky.com/`,
  drimsim: () => `https://drimsim.com/`,
  compensair: () => `https://www.compensair.com/`,
  safetywing: () => SAFETYWING,
  // HelloSafe (Awin, yayıncı 3138284): sigorta karşılaştırma, 20+ dil
  hellosafe: () => 'https://www.awin1.com/cread.php?awinmid=128757&awinaffid=3138284&clickref=vizamigo',
  /** Tur/bilet araması: kilitliyse Klook */
  tours: (place: string) => (LOCKED.has('getyourguide') ? `https://www.klook.com/search/result/?query=${encodeURIComponent(place)}` : `https://www.getyourguide.com/s/?q=${encodeURIComponent(place)}`),
  localrent: () => `https://localrent.com/`,
  getyourguide: (place: string) => routeLink(`https://www.getyourguide.com/s/?q=${encodeURIComponent(place)}`),
  viator: (place: string) => routeLink(`https://www.viator.com/searchResults/all?text=${encodeURIComponent(place)}`),
  klook: () => `https://www.klook.com/`,
  tiqets: () => `https://www.tiqets.com/`,
  airalo: (countrySlug: string) => `https://www.airalo.com/${countrySlug}-esim`,
  yesim: () => `https://yesim.app/`,
  saily: () => `https://saily.com/`,
  airhelp: () => `https://www.airhelp.com/`,
  radicalStorage: () => `https://radicalstorage.com/`
};

/** TourRadar sayfası, ortaklık izi ile (widget ile aynı parametreler). */
export const tourRadarLink = (path: string, campaign: string) =>
  `https://www.tourradar.com${path}${path.includes('?') ? '&' : '?'}utm_source=partner-traveller-1458560&utm_medium=ambassador&utm_campaign=${encodeURIComponent(campaign)}`;
