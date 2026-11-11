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
  /** en yakın havalimanı (uçuş fiyatları için) */
  iata?: string;
  /** EconomyBookings şehir sayfası yolu ve sınıf başına günlük USD */
  car?: { path: string; usd?: Partial<Record<CarClass, number>> };
  /** Rentalmotorbike şehir adı ve günlük en düşük EUR */
  moto?: { slug: string; eur?: number };
};

export const CITIES: Record<string, City[]> = {
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
