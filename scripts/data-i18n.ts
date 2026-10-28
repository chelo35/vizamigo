/**
 * Ülke verisindeki Türkçe kalmış metinleri hedef dile çevirmek için ortak yardımcılar.
 * Çeviri sözlükleri: src/data/i18n-data/<dil>.json  (Türkçe metin -> çeviri)
 * - scripts/translate-country-data.ts sözlükleri doldurur (Gemini ile, eksik olanları).
 * - scripts/prerender-pages.ts ülke JSON dosyalarını yazarken sözlüğü uygular.
 */
import fs from 'fs';
import path from 'path';

export const DATA_LANGS = ['en', 'de', 'es', 'ru'] as const;
export type DataLang = (typeof DATA_LANGS)[number];

/** Çevrilmeyecek alanlar (arama sorgusu, bağlantı, kod vb.) */
export const SKIP_KEYS = new Set(['mapsQuery', 'googleMapsQuery', 'url', 'id', 'code', 'iso', 'logoText', 'logoBg', 'logoColor']);

const TR_CHARS = /[ğĞıİşŞ]/;
const TR_WORDS = /(^|[\s(“"'])(ve|bir|için|ile|olarak|gibi|değil|olan|çok|veya|ama|sonra|önce|mutlaka|şehir|yerel|günü|saat|kesinlikle|ancak|çünkü|daha|en|bu|şu|var|yok|mı|mi)(?=[\s.,;:!?)”"']|$)/i;

/** Metin Türkçe görünüyor mu? (Almanca/İspanyolca ö, ü, ç tek başına yetmez) */
export function looksTurkish(s: string): boolean {
  if (!s || s.length < 3 || !/[a-zA-ZğüşıöçĞÜŞİÖÇ]/.test(s)) return false;
  if (/^https?:\/\//.test(s)) return false;
  return TR_CHARS.test(s) || TR_WORDS.test(s);
}

export const dictPath = (root: string, lang: string) => path.join(root, 'src', 'data', 'i18n-data', `${lang}.json`);

export function loadDict(root: string, lang: string): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(dictPath(root, lang), 'utf8'));
  } catch {
    return {};
  }
}

/** Nesnedeki çevrilebilir Türkçe metinleri toplar */
export function collect(o: unknown, out: Set<string>, key = ''): void {
  if (SKIP_KEYS.has(key)) return;
  if (typeof o === 'string') {
    if (looksTurkish(o)) out.add(o);
  } else if (Array.isArray(o)) {
    for (const v of o) collect(v, out, key);
  } else if (o && typeof o === 'object') {
    for (const [k, v] of Object.entries(o)) {
      // *Tr alanları zaten dile göre seçiliyor; Türkçe arayüz için kalsın
      if (/Tr$/.test(k)) continue;
      collect(v, out, k);
    }
  }
}

/** Sözlüğü nesneye uygular (kopya döner) */
export function applyDict<T>(o: T, dict: Record<string, string>, key = ''): T {
  if (SKIP_KEYS.has(key)) return o;
  if (typeof o === 'string') return ((dict[o] ?? o) as unknown) as T;
  if (Array.isArray(o)) return (o.map((v) => applyDict(v, dict, key)) as unknown) as T;
  if (o && typeof o === 'object') {
    const r: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(o as Record<string, unknown>)) r[k] = /Tr$/.test(k) ? v : applyDict(v, dict, k);
    return r as T;
  }
  return o;
}
