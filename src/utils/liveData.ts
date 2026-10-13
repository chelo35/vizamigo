/**
 * Vizamigo - Canlı Veri Katmanı
 * - Döviz: open.er-api.com (ücretsiz, anahtarsız, CORS açık) → USD_RATES tablosunu canlı değerlerle günceller.
 * - Hava durumu: Open-Meteo (ücretsiz, anahtarsız) → koordinat bazlı anlık ölçüm.
 */
import { useEffect, useState } from 'react';
import { USD_RATES } from '../data/currencyRates';

// ======================= LIVE FX =======================
const FX_CACHE_KEY = 'vz_live_fx_v1';
const FX_TTL_MS = 3 * 60 * 60 * 1000; // 3 saat

let fxUpdatedAt: number | null = null;
let fxFetching: Promise<void> | null = null;
const fxListeners = new Set<() => void>();

function applyRates(rates: Record<string, number>, ts: number) {
  Object.entries(rates).forEach(([code, val]) => {
    if (typeof val === 'number' && val > 0) USD_RATES[code] = val;
  });
  fxUpdatedAt = ts;
  fxListeners.forEach((fn) => fn());
}

// Senkron önbellek yüklemesi: ilk render bile son canlı kurları kullanır
try {
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(FX_CACHE_KEY) : null;
  if (raw) {
    const parsed = JSON.parse(raw) as { ts: number; rates: Record<string, number> };
    if (parsed?.rates) applyRates(parsed.rates, parsed.ts);
  }
} catch {}

export function refreshLiveFx(force = false): Promise<void> {
  if (!force && fxUpdatedAt && Date.now() - fxUpdatedAt < FX_TTL_MS) return Promise.resolve();
  if (fxFetching) return fxFetching;
  fxFetching = fetch('https://open.er-api.com/v6/latest/USD')
    .then((r) => r.json())
    .then((data) => {
      if (data?.result === 'success' && data.rates) {
        const ts = Date.now();
        applyRates(data.rates, ts);
        try {
          localStorage.setItem(FX_CACHE_KEY, JSON.stringify({ ts, rates: data.rates }));
        } catch {}
      }
    })
    .catch(() => {})
    .finally(() => {
      fxFetching = null;
    });
  return fxFetching;
}

/** Canlı kurlar güncellendiğinde bileşeni yeniden çizer. */
export function useLiveFx(): { updatedAt: number | null } {
  const [, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick((t) => t + 1);
    fxListeners.add(fn);
    refreshLiveFx();
    return () => {
      fxListeners.delete(fn);
    };
  }, []);
  return { updatedAt: fxUpdatedAt };
}

// ======================= LIVE WEATHER =======================
export interface LiveWeather {
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  windKmh: number;
  code: number;
  isDay: boolean;
}

const weatherCache = new Map<string, { ts: number; data: LiveWeather }>();
const WX_TTL_MS = 15 * 60 * 1000;
const keyOf = (lat: number, lng: number) => `${lat.toFixed(2)},${lng.toFixed(2)}`;

export function weatherCodeInfo(code: number, isDay = true): { icon: string; tr: string; en: string; de: string; es: string; ru: string } {
  if (code === 0) return { icon: isDay ? '☀️' : '🌙', tr: 'Açık', en: 'Clear', de: 'Klar', es: 'Despejado', ru: 'Ясно' };
  if (code <= 2) return { icon: isDay ? '🌤️' : '☁️', tr: 'Az Bulutlu', en: 'Mostly Clear', de: 'Leicht bewölkt', es: 'Poco nuboso', ru: 'Малооблачно' };
  if (code === 3) return { icon: '☁️', tr: 'Kapalı', en: 'Overcast', de: 'Bedeckt', es: 'Cubierto', ru: 'Пасмурно' };
  if (code <= 48) return { icon: '🌫️', tr: 'Sisli', en: 'Fog', de: 'Nebel', es: 'Niebla', ru: 'Туман' };
  if (code <= 57) return { icon: '🌦️', tr: 'Çisenti', en: 'Drizzle', de: 'Nieselregen', es: 'Llovizna', ru: 'Морось' };
  if (code <= 67) return { icon: '🌧️', tr: 'Yağmurlu', en: 'Rain', de: 'Regen', es: 'Lluvia', ru: 'Дождь' };
  if (code <= 77) return { icon: '🌨️', tr: 'Karlı', en: 'Snow', de: 'Schnee', es: 'Nieve', ru: 'Снег' };
  if (code <= 82) return { icon: '🌧️', tr: 'Sağanak', en: 'Showers', de: 'Schauer', es: 'Chubascos', ru: 'Ливень' };
  if (code <= 86) return { icon: '🌨️', tr: 'Kar Sağanağı', en: 'Snow Showers', de: 'Schneeschauer', es: 'Chubascos de nieve', ru: 'Снегопад' };
  return { icon: '⛈️', tr: 'Gök Gürültülü', en: 'Thunderstorm', de: 'Gewitter', es: 'Tormenta', ru: 'Гроза' };
}

/** Birden fazla koordinat için tek istekte canlı hava durumu (Open-Meteo toplu sorgu). */
export async function fetchLiveWeatherBatch(coords: { lat: number; lng: number }[]): Promise<Record<string, LiveWeather>> {
  const out: Record<string, LiveWeather> = {};
  const now = Date.now();
  const missing: { lat: number; lng: number }[] = [];
  coords.forEach((c) => {
    const k = keyOf(c.lat, c.lng);
    const hit = weatherCache.get(k);
    if (hit && now - hit.ts < WX_TTL_MS) out[k] = hit.data;
    else if (!missing.find((m) => keyOf(m.lat, m.lng) === k)) missing.push(c);
  });

  for (let i = 0; i < missing.length; i += 50) {
    const chunk = missing.slice(i, i + 50);
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${chunk.map((c) => c.lat.toFixed(3)).join(',')}` +
      `&longitude=${chunk.map((c) => c.lng.toFixed(3)).join(',')}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      const arr = Array.isArray(json) ? json : [json];
      arr.forEach((entry: any, idx: number) => {
        const cur = entry?.current;
        if (!cur) return;
        const data: LiveWeather = {
          tempC: Math.round(cur.temperature_2m),
          feelsLikeC: Math.round(cur.apparent_temperature),
          humidity: Math.round(cur.relative_humidity_2m),
          windKmh: Math.round(cur.wind_speed_10m),
          code: cur.weather_code,
          isDay: cur.is_day === 1
        };
        const k = keyOf(chunk[idx].lat, chunk[idx].lng);
        weatherCache.set(k, { ts: now, data });
        out[k] = data;
      });
    } catch {}
  }
  return out;
}

/** Koordinat listesi için canlı hava durumu hook'u. Anahtar: "lat,lng" (2 ondalık). */
export function useLiveWeather(coords: { lat: number; lng: number }[]): Record<string, LiveWeather> {
  const [data, setData] = useState<Record<string, LiveWeather>>({});
  const sig = coords.map((c) => keyOf(c.lat, c.lng)).join('|');
  useEffect(() => {
    if (!coords.length) return;
    let alive = true;
    fetchLiveWeatherBatch(coords).then((res) => {
      if (alive) setData((prev) => ({ ...prev, ...res }));
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);
  return data;
}

export const liveWeatherKey = keyOf;
