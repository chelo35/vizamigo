/**
 * Havalimanı → şehir transfer rotaları (Kiwitaxi rota sayfaları).
 * from: Kiwitaxi'nin o rotadaki en düşük araç fiyatı (USD, araç başı, sabit).
 * Fiyatlar elle alınmış anlık değerlerdir; sayfada "yaklaşık, başlayan" diye gösterilir.
 * Son kontrol: 2026-11-11
 */
export type TransferRoute = { slug: string; from: string; to: string; iata: string; usd: number };

export const KIWI_COUNTRY: Record<string, string> = { TH: 'thailand' };

export const TRANSFER_ROUTES: Record<string, TransferRoute[]> = {
  TH: [
    { slug: 'suvarnabhumi-airport-bangkok-city', iata: 'BKK', from: 'Suvarnabhumi', to: 'Bangkok', usd: 32 },
    { slug: 'don-mueang-airport-bangkok-city', iata: 'DMK', from: 'Don Mueang', to: 'Bangkok', usd: 32 },
    { slug: 'taxi-from-suvarnabhumi-airport-to-pattaya', iata: 'BKK', from: 'Suvarnabhumi', to: 'Pattaya', usd: 49 },
    { slug: 'taxi-from-phuket-airport-to-patong', iata: 'HKT', from: 'Phuket', to: 'Patong', usd: 33 },
    { slug: 'chiang-mai-airport-chiang-mai', iata: 'CNX', from: 'Chiang Mai', to: 'Chiang Mai', usd: 29 },
    { slug: 'krabi-airport-ao-nang', iata: 'KBV', from: 'Krabi', to: 'Ao Nang', usd: 35 }
  ]
};

const KIWI_LANGS = new Set(['en', 'de', 'es', 'ru']);
export const kiwiRouteUrl = (code: string, slug: string, lang: string) =>
  `https://kiwitaxi.com/${KIWI_LANGS.has(lang) ? lang : 'en'}/${KIWI_COUNTRY[code]}/${slug}`;
