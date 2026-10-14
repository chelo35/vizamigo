import { useEffect, useState } from 'react';

/**
 * Vizamigo - Real-Time Cross-Currency Conversion & Cheat Sheet Matrix
 * Automatically syncs live rates from open.er-api.com (with localStorage cache & instant fallback)
 * for all 160+ world currencies across 199 countries.
 */

// Baseline fallback rates (1 USD = X Local Units) — updated when live API responds
export const USD_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.86,
  TRY: 41.25,
  GBP: 0.74,
  CHF: 0.84,
  JPY: 148.5,
  CAD: 1.37,
  AUD: 1.49,
  NZD: 1.63,
  CNY: 7.08,
  INR: 85.4,
  KRW: 1365.0,
  BRL: 5.58,
  MXN: 19.6,
  AED: 3.6725,
  SAR: 3.75,
  QAR: 3.64,
  KWD: 0.306,
  BHD: 0.376,
  OMR: 0.385,
  SGD: 1.31,
  HKD: 7.78,
  MYR: 4.28,
  THB: 33.4,
  IDR: 15550.0,
  VND: 25350.0,
  PHP: 56.8,
  TWD: 31.9,
  RUB: 95.5,
  GEL: 2.72,
  AZN: 1.70,
  KZT: 492.0,
  UZS: 12850.0,
  SEK: 10.25,
  NOK: 10.65,
  DKK: 6.42,
  ISK: 136.0,
  PLN: 3.84,
  CZK: 22.6,
  HUF: 356.0,
  RON: 4.32,
  BGN: 1.68,
  RSD: 101.5,
  ALL: 86.5,
  BAM: 1.68,
  MKD: 53.2,
  MDL: 17.6,
  UAH: 41.8,
  BYN: 3.28,
  ILS: 3.68,
  JOD: 0.709,
  LBP: 89500.0,
  EGP: 49.2,
  MAD: 9.65,
  TND: 3.06,
  DZD: 133.5,
  ZAR: 17.4,
  NGN: 1640.0,
  KES: 129.0,
  GHS: 15.9,
  TZS: 2710.0,
  UGX: 3680.0,
  ETB: 124.0,
  MUR: 46.2,
  SCR: 14.1,
  ARS: 1050.0,
  CLP: 945.0,
  COP: 4250.0,
  PEN: 3.74,
  UYU: 42.1,
  BOB: 6.92,
  PYG: 7850.0,
  CRC: 515.0,
  PAB: 1.0,
  DOP: 60.5,
  JMD: 158.0,
  TTD: 6.78,
  BSD: 1.0,
  BBD: 2.0,
  XCD: 2.70,
  FJD: 2.24,
  PGK: 3.98,
  WST: 2.72,
  TOP: 2.36,
  VUV: 120.0,
  MNT: 3420.0,
  NPR: 136.5,
  LKR: 293.0,
  PKR: 279.0,
  BDT: 121.0,
  AFN: 68.0,
  IRR: 42000.0,
  AMD: 388.0,
  KGS: 86.8,
  TJS: 10.9,
  TMT: 3.5,
  IQD: 1310.0,
  SYP: 13000.0,
  YER: 250.0,
  KHR: 4060.0,
  LAK: 21900.0,
  MMK: 2100.0,
  BND: 1.31,
  MOP: 8.01,
  MVR: 15.4
};

const STORAGE_KEY = 'vizamigo_live_fx_v2';
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

interface StoredFxPayload {
  rates: Record<string, number>;
  updatedAt: number;
  providerUpdatedAt?: string;
}

let isLiveLoaded = false;
let lastUpdatedTimestamp: number | null = null;
let inflightPromise: Promise<boolean> | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((cb) => {
    try {
      cb();
    } catch {}
  });
}

// Hydrate from localStorage immediately at module load if available
try {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: StoredFxPayload = JSON.parse(raw);
      if (parsed && parsed.rates && typeof parsed.rates === 'object') {
        Object.entries(parsed.rates).forEach(([code, val]) => {
          if (typeof val === 'number' && val > 0) {
            USD_RATES[code] = val;
          }
        });
        isLiveLoaded = true;
        lastUpdatedTimestamp = parsed.updatedAt || Date.now();
      }
    }
  }
} catch {}

/**
 * Fetches live exchange rates from open.er-api.com (free, no API key required, 160+ currencies)
 * with fallback to frankfurter.app.
 */
export async function refreshCurrencyRates(force = false): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  if (!force && isLiveLoaded && lastUpdatedTimestamp && Date.now() - lastUpdatedTimestamp < CACHE_TTL_MS) {
    return true;
  }

  if (inflightPromise) return inflightPromise;

  inflightPromise = (async () => {
    // 1. Try Same-Origin Edge Cache endpoint (/api/fx) to eliminate 924ms cross-origin DNS/SSL bottleneck
    try {
      const res = await fetch('/api/fx');
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates && typeof data.rates === 'object') {
          Object.entries(data.rates as Record<string, number>).forEach(([code, val]) => {
            if (typeof val === 'number' && val > 0) {
              USD_RATES[code.toUpperCase()] = val;
            }
          });
          isLiveLoaded = true;
          lastUpdatedTimestamp = Date.now();
          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({
                rates: USD_RATES,
                updatedAt: lastUpdatedTimestamp,
                providerUpdatedAt: data.time_last_update_utc
              } satisfies StoredFxPayload)
            );
          } catch {}
          notifyListeners();
          return true;
        }
      }
    } catch {}

    // 2. Direct upstream fallback: open.er-api.com
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates && typeof data.rates === 'object') {
          Object.entries(data.rates as Record<string, number>).forEach(([code, val]) => {
            if (typeof val === 'number' && val > 0) {
              USD_RATES[code.toUpperCase()] = val;
            }
          });
          isLiveLoaded = true;
          lastUpdatedTimestamp = Date.now();
          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({
                rates: USD_RATES,
                updatedAt: lastUpdatedTimestamp,
                providerUpdatedAt: data.time_last_update_utc
              } satisfies StoredFxPayload)
            );
          } catch {}
          notifyListeners();
          return true;
        }
      }
    } catch {}

    // Fallback: Frankfurter ECB API
    try {
      const res2 = await fetch('https://api.frankfurter.app/latest?from=USD');
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && data2.rates && typeof data2.rates === 'object') {
          USD_RATES.USD = 1.0;
          Object.entries(data2.rates as Record<string, number>).forEach(([code, val]) => {
            if (typeof val === 'number' && val > 0) {
              USD_RATES[code.toUpperCase()] = val;
            }
          });
          isLiveLoaded = true;
          lastUpdatedTimestamp = Date.now();
          try {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({
                rates: USD_RATES,
                updatedAt: lastUpdatedTimestamp
              } satisfies StoredFxPayload)
            );
          } catch {}
          notifyListeners();
          return true;
        }
      }
    } catch {}

    return false;
  })().finally(() => {
    inflightPromise = null;
  });

  return inflightPromise;
}

// Defer background fetch to requestIdleCallback so initial paint (FCP/LCP) is NEVER delayed
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => refreshCurrencyRates(false), { timeout: 3500 });
  } else {
    setTimeout(() => refreshCurrencyRates(false), 2500);
  }
}

export function getCurrencyMeta(): { isLive: boolean; updatedAt: number | null } {
  return { isLive: isLiveLoaded, updatedAt: lastUpdatedTimestamp };
}

/**
 * React hook that subscribes to live currency updates and triggers a re-render when rates arrive.
 */
export function useLiveCurrencyRates() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    listeners.add(handler);
    refreshCurrencyRates(false);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  return {
    isLive: isLiveLoaded,
    updatedAt: lastUpdatedTimestamp,
    refresh: () => refreshCurrencyRates(true)
  };
}

/**
 * Get conversion rate from one currency to another
 */
export function getCrossRate(fromCurrency: string, toCurrency: string): number {
  const fromClean = fromCurrency.toUpperCase().trim();
  const toClean = toCurrency.toUpperCase().trim();

  if (fromClean === toClean) return 1.0;

  const fromRate = USD_RATES[fromClean] || 1.0;
  const toRate = USD_RATES[toClean] || 1.0;

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
    return val.toFixed(2);
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
