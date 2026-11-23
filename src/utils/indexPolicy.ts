/**
 * Arama motoru dizinleme kuralları (Çelebi, 23 Kasım 2026 — "index bloat" temizliği).
 * Bu sayfalar silinmez; kullanıcılar site içinden açabilir. Yalnızca <meta name="robots" content="noindex, follow">
 * alırlar ve sitemap.xml'e girmezler. Aynı kural sitemap üreticisi, prerender ve istemci tarafı SeoHead'de kullanılır.
 */

/** Arama değeri olmayan kurumsal/yasal bilgi sayfaları (/:lang/info/:id). */
export const NOINDEX_INFO_IDS = new Set(['disclaimer', 'attributions', 'kvkk_gdpr', 'standards', 'careers', 'press', 'community']);

/** İkincil hedef pasaport kombinasyonları (/:lang/:ulke/:pasaport) — şimdilik dizin dışı. */
export const NOINDEX_SECONDARY_PASSPORTS: Record<string, string[]> = {
  de: ['osterreich', 'schweiz'],
  en: ['canada', 'united-kingdom', 'india', 'australia'],
  es: ['colombia', 'mexico', 'argentina'],
  ru: ['ukraina', 'kazakhstan']
};

/** Yolun (ör. "/de/argentinien/schweiz" ya da tam URL) dizin dışı tutulması gerekiyorsa true. */
export function isNoindexPath(input: string): boolean {
  let p = input || '/';
  try {
    if (/^https?:\/\//i.test(p)) p = new URL(p).pathname;
  } catch {
    /* yol olarak devam */
  }
  p = p.replace(/[?#].*$/, '');
  const seg = p.split('/').filter(Boolean).map((s) => {
    try {
      return decodeURIComponent(s).toLowerCase();
    } catch {
      return s.toLowerCase();
    }
  });
  if (seg.length === 2 && seg[1] === 'profile') return true;
  if (seg.length === 3 && seg[1] === 'info') return NOINDEX_INFO_IDS.has(seg[2]);
  if (seg.length === 3) return (NOINDEX_SECONDARY_PASSPORTS[seg[0]] || []).includes(seg[2]);
  return false;
}
