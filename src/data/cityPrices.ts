/**
 * Ülke içi şehirler ve şehir bazlı yaklaşık fiyatlar (ortak sitelerin kendi sayfalarından elle/haftalık toplanır).
 * Fiyatlar "yaklaşık, başlayan" olarak gösterilir; kesin fiyat ortak sitede.
 */
export const PRICES_CHECKED = '2026-11-11';

/** SafetyWing Nomad Insurance Essential, 10–39 yaş, 4 hafta (ABD hariç), USD — safetywing.com/nomad-insurance */
export const SAFETYWING_4W_USD = 62.72;

export type CarClass = 'mini' | 'economy' | 'compact' | 'intermediate' | 'standard';
export type City = {
  id: string;
  en: string;
  /** Türkçe ad (farklıysa) */
  tr?: string;
  /** en yakın havalimanı (uçuş fiyatları için) */
  iata?: string;
  /** EconomyBookings şehir sayfası yolu ve sınıf başına günlük USD */
  car?: { path: string; usd?: Partial<Record<CarClass, number>> };
  /** Rentalmotorbike şehir adı ve günlük en düşük EUR */
  moto?: { slug: string; eur?: number };
};

export const CITIES: Record<string, City[]> = {
  FR: [
    { id: 'paris', en: 'Paris', iata: 'CDG' },
    { id: 'nice', en: 'Nice', iata: 'NCE' },
    { id: 'lyon', en: 'Lyon', iata: 'LYS' },
    { id: 'marseille', en: 'Marseille', iata: 'MRS', tr: 'Marsilya' },
    { id: 'bordeaux', en: 'Bordeaux', iata: 'BOD' },
    { id: 'strasbourg', en: 'Strasbourg', iata: 'SXB', tr: 'Strazburg' }
  ],
  ES: [
    { id: 'madrid', en: 'Madrid', iata: 'MAD' },
    { id: 'barcelona', en: 'Barcelona', iata: 'BCN' },
    { id: 'malaga', en: 'Malaga', iata: 'AGP' },
    { id: 'palma', en: 'Palma de Mallorca', iata: 'PMI', tr: 'Mallorca' },
    { id: 'tenerife', en: 'Tenerife', iata: 'TFS' },
    { id: 'alicante', en: 'Alicante', iata: 'ALC' },
    { id: 'seville', en: 'Seville', iata: 'SVQ', tr: 'Sevilla' }
  ],
  US: [
    { id: 'new-york', en: 'New York', iata: 'JFK' },
    { id: 'los-angeles', en: 'Los Angeles', iata: 'LAX' },
    { id: 'miami', en: 'Miami', iata: 'MIA' },
    { id: 'orlando', en: 'Orlando', iata: 'MCO' },
    { id: 'las-vegas', en: 'Las Vegas', iata: 'LAS' },
    { id: 'san-francisco', en: 'San Francisco', iata: 'SFO' }
  ],
  TR: [
    { id: 'istanbul', en: 'Istanbul', iata: 'IST', tr: 'İstanbul' },
    { id: 'antalya', en: 'Antalya', iata: 'AYT' },
    { id: 'bodrum', en: 'Bodrum', iata: 'BJV' },
    { id: 'dalaman', en: 'Fethiye', iata: 'DLM' },
    { id: 'izmir', en: 'Izmir', iata: 'ADB', tr: 'İzmir' },
    { id: 'cappadocia', en: 'Cappadocia', iata: 'NAV', tr: 'Kapadokya' }
  ],
  IT: [
    { id: 'rome', en: 'Rome', iata: 'FCO', tr: 'Roma' },
    { id: 'milan', en: 'Milan', iata: 'MXP', tr: 'Milano' },
    { id: 'venice', en: 'Venice', iata: 'VCE', tr: 'Venedik' },
    { id: 'florence', en: 'Florence', iata: 'FLR', tr: 'Floransa' },
    { id: 'naples', en: 'Naples', iata: 'NAP', tr: 'Napoli' }
  ],
  TH: [
    { id: 'bangkok', en: 'Bangkok', iata: 'BKK', car: { path: 'asia/thailand/bangkok', usd: { mini: 19, economy: 21, compact: 22, intermediate: 33, standard: 45 } }, moto: { slug: 'bangkok', eur: 27.77 } },
    { id: 'phuket', en: 'Phuket', iata: 'HKT', car: { path: 'asia/thailand/phuket' }, moto: { slug: 'phuket', eur: 5 } },
    { id: 'chiang-mai', en: 'Chiang Mai', iata: 'CNX', car: { path: 'asia/thailand/chiang-mai', usd: { mini: 18, economy: 18, compact: 25, intermediate: 27, standard: 45 } }, moto: { slug: 'chiang-mai', eur: 43.39 } },
    { id: 'pattaya', en: 'Pattaya', iata: 'BKK', moto: { slug: 'pattaya' } },
    { id: 'krabi', en: 'Krabi', iata: 'KBV', car: { path: 'asia/thailand/krabi', usd: { economy: 17, compact: 18, mini: 19, intermediate: 29, standard: 32 } } },
    { id: 'koh-samui', en: 'Koh Samui', iata: 'USM', car: { path: 'asia/thailand/koh-samui' } }
  ]
};

export const carCityUrl = (path: string) => `https://www.economybookings.com/car-rental/${path}`;
