/**
 * Fenomen paneli için ortak firma kataloğu (src/data/tpPartners.ts TpId'leriyle aynı anahtarlar).
 * "_" ile başlayan dosya Vercel'de uç nokta olmaz; ortak.ts ve ortak-sync.ts içe aktarır.
 * tracked=false: ortak bağlantısında alt kimlik alanı yok, rezervasyon fenomene yazılamıyor (yalnız tıklama sayılır).
 */
export type Lang = 'tr' | 'en' | 'de' | 'es' | 'ru' | 'pt';
export const LANGS: Lang[] = ['tr', 'en', 'de', 'es', 'ru', 'pt'];

type L6 = Record<Lang, string>;
const l = (tr: string, en: string, de: string, es: string, ru: string, pt: string): L6 => ({ tr, en, de, es, ru, pt });

export const CATS: Record<string, L6> = {
  flight: l('Uçak bileti', 'Flights', 'Flüge', 'Vuelos', 'Авиабилеты', 'Voos'),
  hotel: l('Otel ve konaklama', 'Hotels & stays', 'Hotels & Unterkünfte', 'Hoteles y alojamiento', 'Отели и жильё', 'Hotéis e hospedagem'),
  package: l('Paket turlar', 'Package tours', 'Pauschalreisen', 'Viajes organizados', 'Туры', 'Pacotes de viagem'),
  tour: l('Tur, aktivite ve biletler', 'Tours, activities & tickets', 'Touren, Aktivitäten & Tickets', 'Tours, actividades y entradas', 'Экскурсии, активности и билеты', 'Passeios, atividades e ingressos'),
  transfer: l('Havalimanı transferi ve taksi', 'Airport transfers & taxis', 'Flughafentransfer & Taxi', 'Traslados y taxis', 'Трансферы и такси', 'Transfers e táxis'),
  car: l('Araç kiralama', 'Car rental', 'Mietwagen', 'Alquiler de coches', 'Аренда авто', 'Aluguel de carros'),
  bike: l('Motor ve bisiklet kiralama', 'Scooter & bike rental', 'Roller- & Fahrradverleih', 'Alquiler de motos y bicis', 'Аренда мото и велосипедов', 'Aluguel de motos e bicicletas'),
  train: l('Tren ve otobüs', 'Trains & buses', 'Bahn & Bus', 'Trenes y autobuses', 'Поезда и автобусы', 'Trens e ônibus'),
  ferry: l('Feribot', 'Ferries', 'Fähren', 'Ferris', 'Паромы', 'Balsas'),
  esim: l('eSIM ve internet', 'eSIM & data', 'eSIM & Daten', 'eSIM y datos', 'eSIM и интернет', 'eSIM e dados'),
  insurance: l('Seyahat sigortası', 'Travel insurance', 'Reiseversicherung', 'Seguro de viaje', 'Страховка', 'Seguro viagem'),
  claim: l('Uçuş tazminatı', 'Flight compensation', 'Flugentschädigung', 'Compensación de vuelos', 'Компенсации за рейсы', 'Indenização de voos'),
  extra: l('Diğer hizmetler', 'Other services', 'Weitere Leistungen', 'Otros servicios', 'Другие услуги', 'Outros serviços')
};
export const CAT_ORDER = ['flight', 'hotel', 'package', 'tour', 'transfer', 'car', 'bike', 'train', 'ferry', 'esim', 'insurance', 'claim', 'extra'];

type P = { n: string; c: string; tracked?: boolean };
export const PARTNERS: Record<string, P> = {
  aviasales: { n: 'Aviasales', c: 'flight' }, kiwi: { n: 'Kiwi.com', c: 'flight' }, tripcom: { n: 'Trip.com', c: 'flight' },
  booking: { n: 'Booking.com', c: 'hotel' }, agoda: { n: 'Agoda', c: 'hotel' }, expedia: { n: 'Expedia', c: 'hotel' }, hotelscom: { n: 'Hotels.com', c: 'hotel' },
  vrbo: { n: 'Vrbo', c: 'hotel' }, kayak: { n: 'Kayak', c: 'hotel' }, hostelworld: { n: 'Hostelworld', c: 'hotel' }, roam: { n: 'Stay22', c: 'hotel' },
  tourradar: { n: 'TourRadar', c: 'package' },
  getyourguide: { n: 'GetYourGuide', c: 'tour' }, viator: { n: 'Viator', c: 'tour' }, klook: { n: 'Klook', c: 'tour' }, tiqets: { n: 'Tiqets', c: 'tour' },
  gocity: { n: 'Go City', c: 'tour' }, wegotrip: { n: 'WeGoTrip', c: 'tour' }, kkday: { n: 'KKday', c: 'tour' }, feverup: { n: 'Fever', c: 'tour' }, raynatours: { n: 'Rayna Tours', c: 'tour' },
  kiwitaxi: { n: 'Kiwitaxi', c: 'transfer' }, welcomepickups: { n: 'Welcome Pickups', c: 'transfer' }, gettransfer: { n: 'GetTransfer', c: 'transfer' },
  daytrip: { n: 'Daytrip', c: 'transfer' }, intui: { n: 'intui.travel', c: 'transfer' }, avitovip: { n: 'AvitoVIP', c: 'transfer' },
  discovercars: { n: 'DiscoverCars', c: 'car' }, localrent: { n: 'Localrent', c: 'car' }, economybookings: { n: 'EconomyBookings', c: 'car' },
  getrentacar: { n: 'GetRentacar', c: 'car' }, qeeq: { n: 'QEEQ', c: 'car' }, autoeurope: { n: 'AutoEurope', c: 'car' },
  bookingcars: { n: 'Booking.com Cars', c: 'car' }, expediacars: { n: 'Expedia Cars', c: 'car' }, woopdrive: { n: 'WoopDrive', c: 'car' },
  bikesbooking: { n: 'BikesBooking', c: 'bike' }, rentalmotorbike: { n: 'Rentalmotorbike', c: 'bike' },
  twelvego: { n: '12Go', c: 'train' }, omio: { n: 'Omio', c: 'train' }, italiarail: { n: 'Italiarail', c: 'train' },
  ferryhopper: { n: 'Ferryhopper', c: 'ferry' },
  airalo: { n: 'Airalo', c: 'esim' }, yesim: { n: 'Yesim', c: 'esim' }, saily: { n: 'Saily', c: 'esim' }, gigsky: { n: 'GigSky', c: 'esim' },
  drimsim: { n: 'Drimsim', c: 'esim' }, nomad: { n: 'Nomad eSIM', c: 'esim' }, flexiroam: { n: 'FlexiRoam', c: 'esim' },
  safetywing: { n: 'SafetyWing', c: 'insurance', tracked: false }, hellosafe: { n: 'HelloSafe', c: 'insurance' }, visahq: { n: 'VisaHQ', c: 'extra', tracked: false },
  airhelp: { n: 'AirHelp', c: 'claim' }, compensair: { n: 'Compensair', c: 'claim' }, lennuabi: { n: 'Lennuabi', c: 'claim' },
  radicalstorage: { n: 'Radical Storage', c: 'extra' }, sanatoriums: { n: 'Sanatoriums', c: 'extra' }
};

const KEYS = Object.keys(PARTNERS).sort((a, b) => b.length - a.length);
const flat = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Tıklama kaydındaki hedef (yeni: TpId; eski: "travelpayouts:yesim.app", "stay22:allez" …) → katalog anahtarı */
export function partnerKey(target: string | null | undefined): string {
  const t = String(target || '').toLowerCase();
  if (!t) return 'unknown';
  if (PARTNERS[t]) return t;
  if (t.startsWith('stay22:')) return t.includes('agoda') ? 'agoda' : t.includes('expedia') ? 'expedia' : t.includes('hotels') ? 'hotelscom' : 'booking';
  if (t.startsWith('awin:')) return t.endsWith('128757') ? 'hellosafe' : 'ferryhopper';
  if (t.startsWith('cj:')) return 'daytrip';
  const host = t.replace(/^travelpayouts:/, '');
  const h = flat(host);
  for (const k of KEYS) if (h.includes(k) || h.includes(flat(PARTNERS[k].n))) return k;
  return 'unknown';
}

/** Travelpayouts program adından katalog anahtarı (ör. "Yesim", "Kiwitaxi", "Localrent EN") */
export function partnerFromName(name: string): string {
  const n = flat(name);
  for (const k of KEYS) if (n.includes(k) || n.includes(flat(PARTNERS[k].n))) return k;
  return 'unknown';
}

export const partnerName = (k: string, fallback = '') => PARTNERS[k]?.n || fallback || '—';
export const partnerCat = (k: string) => PARTNERS[k]?.c || 'extra';
