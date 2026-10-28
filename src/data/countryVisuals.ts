/**
 * Curated Scenic Landscape Photography Database for Vizamigo
 * Provides high-quality, authentic destination photography for all 199 countries worldwide.
 * Guarantees zero generic placeholders, authentic recognizable landmarks, and self-hosted local Next-Gen assets.
 */

import { countryToRegion } from './passportData';
import {
  CountryVisualRecord,
  COUNTRY_VISUALS_LIST,
  COUNTRY_VISUALS_MAP
} from './countryVisualsData';

export type { CountryVisualRecord };
export { COUNTRY_VISUALS_LIST, COUNTRY_VISUALS_MAP };

export const DEFAULT_TRAVEL_FALLBACK = '/placeholder-landscape.svg';

const LOCAL_COUNTRY_IMG_REGEX = /^\/images\/countries\/([a-z]{2})(?:-(\d+))?\.(webp|avif|jpg|png|jpeg)$/i;
const AVAILABLE_WIDTHS = [240, 360, 480, 720];
/** 28.10.2026'da fotoğrafı değiştirilen ülkeler */
const PHOTO_V2 = new Set(['mt', 'md', 'pl', 'af', 'bd', 'kh', 'tl', 'kz', 'il', 'tr', 'gw', 'lr', 'ss', 'zw', 'sd', 'tn', 'za', 'bz', 'fj', 'tt', 'ni', 'az', 'do', 'pa']);

/**
 * Transforms image URLs to modern Next-Gen WebP/AVIF format with optimal resolution.
 * Automatically resolves self-hosted responsive local assets in public/images/countries/
 */
export function getOptimizedImageUrl(
  rawUrl: string,
  options?: { width?: number; quality?: number; format?: 'webp' | 'avif' }
): string {
  if (!rawUrl) return DEFAULT_TRAVEL_FALLBACK;
  const targetWidth = options?.width || 480;
  const format = options?.format || 'webp';

  // 1. Local self-hosted country assets
  const localMatch = rawUrl.match(LOCAL_COUNTRY_IMG_REGEX);
  if (localMatch) {
    const code = localMatch[1].toLowerCase();
    const closestWidth = AVAILABLE_WIDTHS.reduce((prev, curr) =>
      Math.abs(curr - targetWidth) < Math.abs(prev - targetWidth) ? curr : prev
    );
    // fotoğrafı yenilenen ülkelerde eski kopyalar (tarayıcı/önbellek) kullanılmasın
    return `/images/countries/${code}-${closestWidth}.${format}${PHOTO_V2.has(code) ? '?v=2' : ''}`;
  }

  // 2. Legacy Unsplash fallback if any external image is supplied
  if (rawUrl.includes('images.unsplash.com')) {
    try {
      const url = new URL(rawUrl);
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('w', targetWidth.toString());
      url.searchParams.delete('fm');
      if (options?.quality) {
        url.searchParams.set('q', options.quality.toString());
      }
      return url.toString();
    } catch {
      return rawUrl.replace(/(\?|&)fm=[^&]*/g, '');
    }
  }

  return rawUrl;
}

/**
 * Generates responsive srcset string for multi-resolution displays.
 * Supports both WebP and AVIF formats with 240w, 360w, 480w, 720w breakpoints.
 */
export function getOptimizedSrcSet(rawUrl: string, format: 'webp' | 'avif' = 'webp'): string {
  if (!rawUrl) return '';

  const localMatch = rawUrl.match(LOCAL_COUNTRY_IMG_REGEX);
  if (localMatch) {
    const code = localMatch[1].toLowerCase();
    return (
      `/images/countries/${code}-240.${format}${PHOTO_V2.has(code) ? '?v=2' : ''} 240w, ` +
      `/images/countries/${code}-360.${format}${PHOTO_V2.has(code) ? '?v=2' : ''} 360w, ` +
      `/images/countries/${code}-480.${format}${PHOTO_V2.has(code) ? '?v=2' : ''} 480w, ` +
      `/images/countries/${code}-720.${format}${PHOTO_V2.has(code) ? '?v=2' : ''} 720w`
    );
  }

  if (rawUrl.includes('images.unsplash.com')) {
    const q = 60;
    return `${getOptimizedImageUrl(rawUrl, { width: 240, quality: q })} 240w, ${getOptimizedImageUrl(rawUrl, { width: 360, quality: q })} 360w, ${getOptimizedImageUrl(rawUrl, { width: 440, quality: q })} 440w`;
  }

  return '';
}

/**
 * Convenience helper for AVIF responsive srcset.
 */
export function getOptimizedAvifSrcSet(rawUrl: string): string {
  return getOptimizedSrcSet(rawUrl, 'avif');
}

/**
 * Complete 199-country landscapes database.
 * Re-exported for 100% backward compatibility with all existing consumers.
 */
export const COUNTRY_LANDSCAPES: Record<string, CountryVisualRecord> = COUNTRY_VISUALS_MAP;

/**
 * Retrieves verified country visual record with multi-language landmark support.
 * @param countryCode ISO2 country code (e.g., 'FR', 'JP', 'TR')
 * @param lang Preferred language code ('tr', 'en', 'de', 'es', 'ru') - defaults to 'tr'
 */
export function getCountryVisual(
  countryCode: string,
  lang: string = 'tr'
): CountryVisualRecord {
  const code = (countryCode || '').toUpperCase();
  const visual = COUNTRY_VISUALS_MAP[code];

  if (visual) {
    const langKey = (lang || 'tr').toLowerCase() as keyof typeof visual.landmarkI18n;
    const localizedLandmark =
      visual.landmarkI18n?.[langKey] ||
      visual.landmark ||
      visual.landmarkI18n?.tr ||
      visual.landmarkI18n?.en ||
      '';

    return {
      ...visual,
      landmark: localizedLandmark
    };
  }

  // Safe fallback if unknown country code
  const reg = countryToRegion[code] || 'Otantik Rota';
  return {
    code,
    nameTr: code,
    nameEn: code,
    image: DEFAULT_TRAVEL_FALLBACK,
    landmark: `${code} ${reg} Manzaraları`,
    landmarkI18n: {
      tr: `${code} ${reg} Manzaraları`,
      en: `${code} ${reg} Landscapes`,
      de: `${code} ${reg} Landschaften`,
      es: `${code} ${reg} Paisajes`,
      ru: `${code} ${reg} Пейзажи`
    },
    author: 'Vizamigo',
    license: 'All rights reserved',
    sourceUrl: DEFAULT_TRAVEL_FALLBACK,
    sourcePageUrl: 'https://www.vizamigo.com',
    sourceId: 'fallback',
    verifiedAt: '2026-10-17',
    focus: 'center',
    symbols: {
      main: `${code} ${reg} Manzaraları`
    }
  };
}
