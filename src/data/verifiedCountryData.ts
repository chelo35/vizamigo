/**
 * Vizamigo Doğrulanmış Ülke Veri Sağlayıcısı (Verified Country Data Provider)
 * 
 * vizamigo-arastirma-ajani-SKILL.md kuralları uyarınca Tier 1 & Tier 2 kaynaklarla
 * doğrulanmış, kanıt alıntılı ve şema onaylı ülke verilerini UI bileşenlerine bağlar.
 */

import TH from './countries/TH.json';
import AT from './countries/AT.json';
import UA from './countries/UA.json';
import IR from './countries/IR.json';
import YE from './countries/YE.json';
import CO from './countries/CO.json';
import BR from './countries/BR.json';
import JP from './countries/JP.json';
import DE from './countries/DE.json';
import US from './countries/US.json';
import FR from './countries/FR.json';
import ES from './countries/ES.json';
import IT from './countries/IT.json';
import TR from './countries/TR.json';
import MX from './countries/MX.json';
import GB from './countries/GB.json';
import GR from './countries/GR.json';

export interface VerifiedSource {
  url: string;
  tier: 1 | 2 | 3;
  title: string;
}

export interface VerifiedSourcedField<T = unknown> {
  value: T;
  status: 'verified' | 'conflict' | 'pending' | 'not_found';
  confidence: 'high' | 'medium' | 'low' | null;
  sources: VerifiedSource[];
  evidence_quote: string | null;
  retrieved_at: string | null;
}

export interface VerifiedCountryRecord {
  iso2: string;
  names: {
    tr: string;
    en: string;
    de: string;
    ru: string;
    es: string;
  };
  capital: VerifiedSourcedField<string>;
  currency: VerifiedSourcedField<string>;
  timezone: VerifiedSourcedField<string>;
  electricity: {
    voltage: VerifiedSourcedField<string>;
    frequency_hz: VerifiedSourcedField<number | string>;
    plug_types: VerifiedSourcedField<string[]>;
  };
  emergency: {
    police: VerifiedSourcedField<string>;
    ambulance: VerifiedSourcedField<string>;
    fire: VerifiedSourcedField<string>;
    general: VerifiedSourcedField<string | null>;
    tourist_police: VerifiedSourcedField<string | null>;
  };
  advisory: {
    agencies: Array<{
      agency: string;
      level: number | string | null;
      source: VerifiedSource;
      retrieved_at: string;
    }>;
    combined_level: number | null;
    agencies_agree: boolean | null;
    advisory_headline?: {
      tr: string;
      en: string;
      de: string;
      ru: string;
      es: string;
    };
    regional_warnings: Array<{
      area: string;
      level: number;
      reason: string;
      source: VerifiedSource;
    }>;
    risk_categories: Record<string, 'low' | 'medium' | 'high' | null>;
  };
  connectivity: {
    mobile_down_mbps: VerifiedSourcedField<number>;
    fixed_down_mbps: VerifiedSourcedField<number>;
    esim_sim_notes: VerifiedSourcedField<string | null>;
  };
  local_apps: Array<{
    name: string;
    category: 'taxi' | 'food' | 'transport' | 'payments' | 'maps' | 'other';
    available_in_country: boolean;
    source: VerifiedSource;
  }>;
  culture: {
    religion: VerifiedSourcedField<string>;
    festivals: VerifiedSourcedField<string>;
    legal_cultural_warnings: VerifiedSourcedField<string>;
    tipping: VerifiedSourcedField<string>;
  };
  highlights: Array<{
    name: {
      tr: string;
      en: string;
      de: string;
      ru: string;
      es: string;
    };
    type: string;
    sources: VerifiedSource[];
  }>;
  media: {
    images: Array<{
      role: string;
      landmark: string;
      license: string;
      author: string;
      source_url: string;
      attribution_text: string;
      focal_point: { x: number; y: number };
      alt: {
        tr: string;
        en: string;
        de: string;
        ru: string;
        es: string;
      };
      recognizability_checked: boolean;
    }>;
  };
  seo?: {
    slug: {
      tr: string;
      en: string;
      de: string;
      ru: string;
      es: string;
    };
    title: {
      tr: string;
      en: string;
      de: string;
      ru: string;
      es: string;
    };
    meta_description: {
      tr: string;
      en: string;
      de: string;
      ru: string;
      es: string;
    };
    faq: any[];
  };
  last_reviewed: string;
}

export const VERIFIED_COUNTRIES_MAP: Record<string, VerifiedCountryRecord> = {
  TH: TH as unknown as VerifiedCountryRecord,
  AT: AT as unknown as VerifiedCountryRecord,
  UA: UA as unknown as VerifiedCountryRecord,
  IR: IR as unknown as VerifiedCountryRecord,
  YE: YE as unknown as VerifiedCountryRecord,
  CO: CO as unknown as VerifiedCountryRecord,
  BR: BR as unknown as VerifiedCountryRecord,
  JP: JP as unknown as VerifiedCountryRecord,
  DE: DE as unknown as VerifiedCountryRecord,
  US: US as unknown as VerifiedCountryRecord,
  FR: FR as unknown as VerifiedCountryRecord,
  ES: ES as unknown as VerifiedCountryRecord,
  IT: IT as unknown as VerifiedCountryRecord,
  TR: TR as unknown as VerifiedCountryRecord,
  MX: MX as unknown as VerifiedCountryRecord,
  GB: GB as unknown as VerifiedCountryRecord,
  GR: GR as unknown as VerifiedCountryRecord,
};

/**
 * Returns verified record if country is part of audited pilot dataset.
 */
export function getVerifiedCountryRecord(countryCode: string): VerifiedCountryRecord | null {
  if (!countryCode) return null;
  const code = countryCode.toUpperCase();
  return VERIFIED_COUNTRIES_MAP[code] || null;
}

/**
 * Checks whether a given ISO2 country code has audited verification.
 */
export function isVerifiedCountry(countryCode: string): boolean {
  if (!countryCode) return false;
  return Boolean(VERIFIED_COUNTRIES_MAP[countryCode.toUpperCase()]);
}

/**
 * Get verified card image and landmark attribution if available.
 */
export function getVerifiedCountryVisual(countryCode: string): { image: string; landmark: string; author: string; attribution: string } | null {
  const record = getVerifiedCountryRecord(countryCode);
  if (!record || !record.media.images.length) return null;
  const cardImg = record.media.images.find(i => i.role === 'card') || record.media.images[0];
  return {
    image: cardImg.source_url,
    landmark: cardImg.landmark,
    author: cardImg.author,
    attribution: cardImg.attribution_text
  };
}
