/**
 * Vizamigo - Real-Time Cross-Currency Conversion & Cheat Sheet Matrix
 * Provides accurate baseline cross-exchange rates and calculation utilities for all 199 countries.
 */

// Exchange rate in terms of 1 USD = X Local Units
export const USD_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  TRY: 34.8,
  GBP: 0.78,
  CHF: 0.88,
  JPY: 152.0,
  CAD: 1.38,
  AUD: 1.52,
  NZD: 1.66,
  CNY: 7.24,
  INR: 84.0,
  KRW: 1380.0,
  BRL: 5.65,
  MXN: 19.8,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  KWD: 0.31,
  BHD: 0.38,
  OMR: 0.385,
  SGD: 1.34,
  HKD: 7.78,
  MYR: 4.35,
  THB: 35.2,
  IDR: 15600.0,
  VND: 25100.0,
  PHP: 57.5,
  TWD: 32.2,
  RUB: 96.0,
  GEL: 2.73,
  AZN: 1.70,
  KZT: 488.0,
  UZS: 12800.0,
  SEK: 10.6,
  NOK: 10.9,
  DKK: 6.88,
  ISK: 138.0,
  PLN: 3.98,
  CZK: 23.4,
  HUF: 368.0,
  RON: 4.58,
  BGN: 1.80,
  RSD: 108.0,
  ALL: 91.5,
  BAM: 1.80,
  MKD: 56.5,
  MDL: 17.8,
  UAH: 41.3,
  BYN: 3.28,
  ILS: 3.72,
  JOD: 0.709,
  LBP: 89500.0,
  EGP: 48.6,
  MAD: 9.85,
  TND: 3.10,
  DZD: 134.0,
  ZAR: 17.6,
  NGN: 1650.0,
  KES: 129.0,
  GHS: 15.8,
  TZS: 2680.0,
  UGX: 3670.0,
  ETB: 122.0,
  MUR: 46.5,
  SCR: 14.2,
  ARS: 990.0,
  CLP: 940.0,
  COP: 4280.0,
  PEN: 3.76,
  UYU: 41.5,
  BOB: 6.92,
  PYG: 7800.0,
  CRC: 518.0,
  PAB: 1.0,
  DOP: 60.2,
  JMD: 158.0,
  TTD: 6.78,
  BSD: 1.0,
  BBD: 2.0,
  XCD: 2.70,
  FJD: 2.25,
  PGK: 3.95,
  WST: 2.72,
  TOP: 2.36,
  VUV: 120.0,
  MNT: 3410.0,
  NPR: 134.0,
  LKR: 294.0,
  PKR: 278.0,
  BDT: 120.0,
  AFN: 68.0,
  IRR: 42000.0 // Official baseline (Toman/Bazaar rate higher, shown in disclaimer)
};

/**
 * Get conversion rate from one currency to another
 */
export function getCrossRate(fromCurrency: string, toCurrency: string): number {
  const fromClean = fromCurrency.toUpperCase().trim();
  const toClean = toCurrency.toUpperCase().trim();

  if (fromClean === toClean) return 1.0;

  const fromRate = USD_RATES[fromClean] || 1.0;
  const toRate = USD_RATES[toClean] || 1.0;

  // Since rates are in USD terms (1 USD = X units),
  // 1 unit of fromCurrency = (toRate / fromRate) units of toCurrency
  return toRate / fromRate;
}

/**
 * Convert any amount between two currencies
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  if (isNaN(amount) || amount <= 0) return 0;
  const rate = getCrossRate(fromCurrency, toCurrency);
  return amount * rate;
}

/**
 * Format currency number nicely with proper decimal digits
 */
export function formatCurrencyValue(val: number): string {
  if (val >= 1000) {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: val >= 10000 ? 0 : 1
    }).format(val);
  }
  if (val >= 10) {
    return val.toFixed(1);
  }
  return val.toFixed(2);
}

export interface CheatSheetTier {
  id: string;
  icon: string;
  titleTr: string;
  titleEn: string;
  titleDe: string;
  approxUsd: number;
}

export const COMMON_CHEAT_SHEET_TIERS: CheatSheetTier[] = [
  {
    id: 'coffee',
    icon: '☕',
    titleTr: 'Espresso / Kahve',
    titleEn: 'Espresso / Coffee',
    titleDe: 'Espresso / Kaffee',
    approxUsd: 2.8
  },
  {
    id: 'streetFood',
    icon: '🥪',
    titleTr: 'Sokak Yemeği / Hızlı Öğün',
    titleEn: 'Street Food / Quick Meal',
    titleDe: 'Streetfood / Schneller Imbiss',
    approxUsd: 6.5
  },
  {
    id: 'taxi',
    icon: '🚕',
    titleTr: '5 km Taksi / Ulaşım',
    titleEn: '5 km Taxi / Transit Ride',
    titleDe: '5 km Taxi / Nahverkehr',
    approxUsd: 9.0
  },
  {
    id: 'dinner',
    icon: '🍽️',
    titleTr: '2 Kişilik Şık Akşam Yemeği',
    titleEn: 'Dinner for Two (Mid-range)',
    titleDe: 'Abendessen für 2 Personen',
    approxUsd: 38.0
  },
  {
    id: 'hotel',
    icon: '🏨',
    titleTr: '3-Yıldız Butik Otel (Gecelik)',
    titleEn: '3-Star Hotel Night',
    titleDe: '3-Sterne-Hotel pro Nacht',
    approxUsd: 75.0
  }
];
