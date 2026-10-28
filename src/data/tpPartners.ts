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
  | 'radicalstorage';

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
  radicalstorage: { name: 'Radical Storage', domain: 'radicalstorage.com', rate: '8%' }
};

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
  tripFlights: () => `https://www.trip.com/flights/`,
  kiwi: () => `https://www.kiwi.com/en/`,
  /** Kara/deniz yolu: Asya için 12Go, Avrupa/Amerika için Omio, diğerleri için Kiwi */
  ground: (fromCode: string, toCode: string): { id: TpId; url: string } =>
    ASIA_RAIL.has(toCode) || ASIA_RAIL.has(fromCode)
      ? { id: 'twelvego', url: `https://12go.asia/en` }
      : EU_RAIL.has(toCode) && EU_RAIL.has(fromCode)
        ? { id: 'omio', url: `https://www.omio.com/` }
        : { id: 'kiwi', url: `https://www.kiwi.com/en/` },
  booking: (place: string) => `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(place)}`,
  agoda: () => `https://www.agoda.com/`,
  tripHotels: () => `https://www.trip.com/hotels/`,
  expedia: (place: string) => `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(place)}`,
  hostelworld: () => `https://www.hostelworld.com/`,
  kiwitaxi: () => `https://kiwitaxi.com/`,
  welcomePickups: () => `https://www.welcomepickups.com/`,
  gettransfer: () => `https://gettransfer.com/`,
  discovercars: (country: string) => `https://www.discovercars.com/${slug(country)}`,
  localrent: () => `https://localrent.com/`,
  getyourguide: (place: string) => `https://www.getyourguide.com/s/?q=${encodeURIComponent(place)}`,
  viator: (place: string) => `https://www.viator.com/searchResults/all?text=${encodeURIComponent(place)}`,
  klook: () => `https://www.klook.com/`,
  tiqets: () => `https://www.tiqets.com/`,
  airalo: (countrySlug: string) => `https://www.airalo.com/${countrySlug}-esim`,
  yesim: () => `https://yesim.app/`,
  saily: () => `https://saily.com/`,
  airhelp: () => `https://www.airhelp.com/`,
  radicalStorage: () => `https://radicalstorage.com/`
};
