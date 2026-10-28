/**
 * Ülke sayfasının ağır verisi (ülke bilgileri, seyahat bilgisi, ansiklopedi, gezi planı,
 * doğrulanmış kayıt, uygulamalar) artık tek bir 1,6 MB'lık dosyadan değil, ülke başına
 * küçük JSON dosyalarından gelir:
 *   /data/country/x/<KOD>.json      → dilden bağımsız (intel, verified, apps)
 *   /data/country/<dil>/<KOD>.json  → dile bağlı (insights, enc, itin)
 *   /data/plugs.json                → bütün ülkelerin fiş tipleri (adaptör kontrolü)
 * Dosyalar derleme sonunda üretilir (scripts/prerender-pages.ts). Geliştirme ortamında ya da
 * dosya alınamazsa modüller dinamik olarak yüklenir; sayfa her durumda çalışır.
 */
import type { CountryFullInsights } from '../data/countryInsights';
import type { getCountryTravelIntelligence } from '../data/countryTravelIntelligence';
import type { getCountryEncyclopedia } from '../data/countryEncyclopedia';
import type { getCountryItinerary } from '../data/countryItineraries';
import type { getVerifiedCountryRecord } from '../data/verifiedCountryData';
import type { getCountryNomadApps } from '../data/rideAndDeliveryApps';

export interface CountryBundle {
  insights: CountryFullInsights;
  intel: ReturnType<typeof getCountryTravelIntelligence>;
  enc: ReturnType<typeof getCountryEncyclopedia>;
  itin: ReturnType<typeof getCountryItinerary>;
  verified: ReturnType<typeof getVerifiedCountryRecord>;
  apps: ReturnType<typeof getCountryNomadApps>;
  plugs: Record<string, string[]>;
}

const cache = new Map<string, Promise<CountryBundle>>();

const getJson = async <T,>(url: string): Promise<T | null> => {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    if (!(r.headers.get('content-type') || '').includes('json')) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
};

async function fromModules(code: string, lang: string): Promise<CountryBundle> {
  const [ins, ti, en, it, ve, ra, pd] = await Promise.all([
    import('../data/countryInsights'),
    import('../data/countryTravelIntelligence'),
    import('../data/countryEncyclopedia'),
    import('../data/countryItineraries'),
    import('../data/verifiedCountryData'),
    import('../data/rideAndDeliveryApps'),
    import('../data/passportData')
  ]);
  const insights = ins.getCountryInsights(code, lang);
  const plugs: Record<string, string[]> = {};
  return {
    insights,
    intel: ti.getCountryTravelIntelligence(code, pd.getCountryName(code, 'en')),
    enc: en.getCountryEncyclopedia(code, lang as never),
    itin: it.getCountryItinerary(code, lang as never),
    verified: ve.getVerifiedCountryRecord(code),
    apps: ra.getCountryNomadApps(code, insights.transport.popularRideApps || []),
    plugs: new Proxy(plugs, {
      get: (t, k: string) => t[k] || (t[k] = ti.getCountryTravelIntelligence(k, pd.getCountryName(k, 'en')).plugs.types)
    })
  };
}

export function loadCountryBundle(code: string, lang: string): Promise<CountryBundle> {
  const key = `${lang}|${code}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const p = (async () => {
    const [shared, local, plugs] = await Promise.all([
      getJson<Pick<CountryBundle, 'intel' | 'verified' | 'apps'>>(`/data/country/x/${code}.json`),
      getJson<Pick<CountryBundle, 'insights' | 'enc' | 'itin'>>(`/data/country/${lang}/${code}.json`),
      getJson<Record<string, string[]>>('/data/plugs.json')
    ]);
    if (shared && local && plugs) return { ...shared, ...local, plugs } as CountryBundle;
    return fromModules(code, lang);
  })();
  cache.set(key, p);
  p.catch(() => cache.delete(key));
  return p;
}
