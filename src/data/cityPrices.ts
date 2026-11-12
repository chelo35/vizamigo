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
  /** Localrent şehir sayfası (localrent.com/en/{path}/) ve günlük başlayan fiyat, EUR */
  lr?: { path: string; eur?: number };
  /** Rentalmotorbike şehir adı ve günlük en düşük EUR */
  moto?: { slug: string; eur?: number };
};

export const CITIES: Record<string, City[]> = {
  FR: [
    { id: 'paris', en: 'Paris', iata: 'CDG', car: { path: 'europe/france/paris', usd: { mini: 15, economy: 17, compact: 27, intermediate: 29, standard: 44 } }, lr: { path: 'france/paris' }, moto: { slug: 'ile-de-france', eur: 16.42 } },
    { id: 'nice', en: 'Nice', iata: 'NCE', car: { path: 'europe/france/nice', usd: { mini: 10, economy: 14, compact: 16, intermediate: 22, standard: 25 } }, lr: { path: 'france/nice', eur: 15.21 } },
    { id: 'lyon', en: 'Lyon', iata: 'LYS', lr: { path: 'france/lyon', eur: 21.36 } },
    { id: 'marseille', en: 'Marseille', iata: 'MRS', tr: 'Marsilya', lr: { path: 'france/marseille', eur: 19.89 } },
    { id: 'bordeaux', en: 'Bordeaux', iata: 'BOD', lr: { path: 'france/bordeaux', eur: 14.74 } },
    { id: 'strasbourg', en: 'Strasbourg', iata: 'SXB', tr: 'Strazburg' }
  ],
  ES: [
    { id: 'madrid', en: 'Madrid', iata: 'MAD', lr: { path: 'spain/madrid', eur: 36.33 }, moto: { slug: 'madrid' } },
    { id: 'barcelona', en: 'Barcelona', iata: 'BCN', lr: { path: 'spain/barcelona' }, moto: { slug: 'barcelona', eur: 14 } },
    { id: 'malaga', en: 'Malaga', iata: 'AGP', lr: { path: 'spain/malaga', eur: 14.81 }, moto: { slug: 'malaga', eur: 20 } },
    { id: 'palma', en: 'Palma de Mallorca', iata: 'PMI', tr: 'Mallorca', lr: { path: 'spain/palma' }, moto: { slug: 'mallorca', eur: 16 } },
    { id: 'tenerife', en: 'Tenerife', iata: 'TFS', lr: { path: 'spain/tenerife', eur: 35.35 }, moto: { slug: 'tenerife', eur: 10 } },
    { id: 'alicante', en: 'Alicante', iata: 'ALC', lr: { path: 'spain/alicante', eur: 21.34 } },
    { id: 'seville', en: 'Seville', iata: 'SVQ', tr: 'Sevilla', lr: { path: 'spain/seville', eur: 25.64 } }
  ],
  US: [
    { id: 'new-york', en: 'New York', iata: 'JFK', moto: { slug: 'new-york', eur: 64.22 } },
    { id: 'los-angeles', en: 'Los Angeles', iata: 'LAX', car: { path: 'north-america/usa-california/los-angeles', usd: { economy: 27, compact: 28, intermediate: 29, standard: 30 } }, moto: { slug: 'california', eur: 60.75 } },
    { id: 'miami', en: 'Miami', iata: 'MIA', car: { path: 'north-america/usa-florida/miami' }, moto: { slug: 'florida', eur: 64.22 } },
    { id: 'orlando', en: 'Orlando', iata: 'MCO', car: { path: 'north-america/usa-florida/orlando' }, moto: { slug: 'florida', eur: 64.22 } },
    { id: 'las-vegas', en: 'Las Vegas', iata: 'LAS', car: { path: 'north-america/usa-nevada/las-vegas' }, moto: { slug: 'nevada', eur: 64.22 } },
    { id: 'san-francisco', en: 'San Francisco', iata: 'SFO', car: { path: 'north-america/usa-california/san-francisco', usd: { economy: 27, compact: 28, intermediate: 29, standard: 32 } }, moto: { slug: 'california', eur: 60.75 } }
  ],
  TR: [
    { id: 'istanbul', en: 'Istanbul', iata: 'IST', tr: 'İstanbul', lr: { path: 'turkey/istanbul', eur: 23 } },
    { id: 'antalya', en: 'Antalya', iata: 'AYT', lr: { path: 'turkey/antalya', eur: 12.96 }, moto: { slug: 'antalya', eur: 18 } },
    { id: 'bodrum', en: 'Bodrum', iata: 'BJV', lr: { path: 'turkey/bodrum', eur: 26.25 } },
    { id: 'dalaman', en: 'Fethiye', iata: 'DLM', lr: { path: 'turkey/fethiye', eur: 25.58 } },
    { id: 'izmir', en: 'Izmir', iata: 'ADB', tr: 'İzmir', lr: { path: 'turkey/izmir', eur: 17.6 } },
    { id: 'cappadocia', en: 'Cappadocia', iata: 'NAV', tr: 'Kapadokya', lr: { path: 'turkey/kayseri', eur: 20 } }
  ],
  IT: [
    { id: 'rome', en: 'Rome', iata: 'FCO', tr: 'Roma', lr: { path: 'italy/rome', eur: 10.63 }, moto: { slug: 'roma', eur: 20 } },
    { id: 'milan', en: 'Milan', iata: 'MXP', tr: 'Milano', lr: { path: 'italy/milan', eur: 22 }, moto: { slug: 'milano', eur: 9 } },
    { id: 'venice', en: 'Venice', iata: 'VCE', tr: 'Venedik', lr: { path: 'italy/venice' } },
    { id: 'florence', en: 'Florence', iata: 'FLR', tr: 'Floransa', lr: { path: 'italy/florence' } },
    { id: 'naples', en: 'Naples', iata: 'NAP', tr: 'Napoli', lr: { path: 'italy/naples' } }
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
