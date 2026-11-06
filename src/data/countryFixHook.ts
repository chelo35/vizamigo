/**
 * Elle doğrulanmış ülke düzeltmeleri (src/data/country-fixes/<KOD>.json) yalnızca derleme sırasında
 * (scripts/prerender-pages.ts) globalThis.__vzCountryFixes üzerinden verilir; tarayıcıda boştur.
 * Böylece ülke JSON dosyaları, sayfa içi JSON-LD ve SSS metinleri aynı düzeltilmiş veriyi kullanır.
 */
type Fixes = Record<string, Record<string, Record<string, unknown>>>;

export function deepMerge<T>(a: T, b: unknown): T {
  if (b === undefined) return a;
  if (!b || typeof b !== 'object' || Array.isArray(b) || !a || typeof a !== 'object' || Array.isArray(a)) return b as T;
  const o: Record<string, unknown> = { ...(a as Record<string, unknown>) };
  for (const [k, v] of Object.entries(b as Record<string, unknown>)) o[k] = deepMerge(o[k], v);
  return o as T;
}

export function applyCountryFix<T>(part: 'insights' | 'enc' | 'itin' | 'intel', code: string, lang: string, data: T): T {
  const fixes = (globalThis as { __vzCountryFixes?: Fixes }).__vzCountryFixes;
  const fx = fixes?.[code.toUpperCase()]?.[lang]?.[part];
  return fx ? deepMerge(data, fx) : data;
}
