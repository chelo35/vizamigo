/**
 * Havalimanı → şehir transfer rotaları (Kiwitaxi rota sayfaları).
 * from: Kiwitaxi'nin o rotadaki en düşük araç fiyatı (USD, araç başı, sabit).
 * Fiyatlar elle alınmış anlık değerlerdir; sayfada "yaklaşık, başlayan" diye gösterilir.
 * Son kontrol: 2026-11-11
 */
export type TransferRoute = { slug: string; from: string; to: string; iata: string; usd: number; city?: string };

export const KIWI_COUNTRY: Record<string, string> = { TH: 'thailand' };

export const TRANSFER_ROUTES: Record<string, TransferRoute[]> = {
  TH: [
    { city: 'bangkok', slug: 'suvarnabhumi-airport-bangkok-city', iata: 'BKK', from: 'Suvarnabhumi', to: 'Bangkok', usd: 32 },
    { city: 'bangkok', slug: 'don-mueang-airport-bangkok-city', iata: 'DMK', from: 'Don Mueang', to: 'Bangkok', usd: 32 },
    { city: 'pattaya', slug: 'taxi-from-suvarnabhumi-airport-to-pattaya', iata: 'BKK', from: 'Suvarnabhumi', to: 'Pattaya', usd: 49 },
    { city: 'phuket', slug: 'taxi-from-phuket-airport-to-patong', iata: 'HKT', from: 'Phuket', to: 'Patong', usd: 33 },
    { city: 'chiang-mai', slug: 'chiang-mai-airport-chiang-mai', iata: 'CNX', from: 'Chiang Mai', to: 'Chiang Mai', usd: 29 },
    { city: 'krabi', slug: 'krabi-airport-ao-nang', iata: 'KBV', from: 'Krabi', to: 'Ao Nang', usd: 35 }
  ]
};

const KIWI_LANGS = new Set(['en', 'de', 'es', 'ru']);
export const kiwiRouteUrl = (code: string, slug: string, lang: string) =>
  `https://kiwitaxi.com/${KIWI_LANGS.has(lang) ? lang : 'en'}/${KIWI_COUNTRY[code]}/${slug}`;

/** Motor/scooter kiralama: Rentalmotorbike (Daisycon) şehir sayfaları; tıklayınca o şehrin kiralama listesi açılır */
export const SCOOTER_CITIES: Record<string, { slug: string; name: string }[]> = {
  TH: [
    { slug: 'phuket', name: 'Phuket' },
    { slug: 'bangkok', name: 'Bangkok' },
    { slug: 'chiang-mai', name: 'Chiang Mai' },
    { slug: 'pattaya', name: 'Pattaya' }
  ]
};
export const scooterUrl = (slug: string) => `https://partners.rentalmotorbike.com/c/?si=22012&li=1928984&wi=442794&dl=${encodeURIComponent(`motorcycle-rental-${slug}`)}`;
