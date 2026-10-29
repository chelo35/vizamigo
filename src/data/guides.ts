// Güncel konu rehberleri (ETIAS, İngiltere ETA, ABD ESTA, Yunan adaları kapıda vize).
// Metinler dil başına JSON'da; kaynaklar, kontrol tarihi ve bağlı ülkeler burada.
// Bilgi değişince: JSON metnini ve `checked` tarihini güncelle, sonra `node scripts/indexnow.mjs`.
import tr from './guides/tr.json';
import en from './guides/en.json';
import de from './guides/de.json';
import es from './guides/es.json';
import ru from './guides/ru.json';
import scTr from './guides/schengen.tr.json';
import scEn from './guides/schengen.en.json';
import scDe from './guides/schengen.de.json';
import scEs from './guides/schengen.es.json';
import scRu from './guides/schengen.ru.json';

export type GuideId = 'schengen_documents' | 'etias' | 'uk_eta' | 'esta' | 'greek_islands_visa';
export interface GuideSection { h: string; p?: string[]; list?: string[] }
export interface ChecklistGroup { id: string; label: string; docs: string[] }
export interface GuideChecklist { title: string; statusLabel: string; purposeLabel: string; commonTitle: string; common: string[]; statuses: ChecklistGroup[]; purposes: ChecklistGroup[]; note: string; print: string }
export interface GuideText { title: string; short: string; metaDesc: string; answer: string; sections: GuideSection[]; faq: { q: string; a: string }[]; checklist?: GuideChecklist }

export const GUIDE_IDS: GuideId[] = ['schengen_documents', 'etias', 'uk_eta', 'esta', 'greek_islands_visa'];

const SCHENGEN = ['AT', 'BE', 'BG', 'HR', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'CY'];

export const GUIDE_META: Record<GuideId, { checked: string; icon: string; countries: string[]; sources: { label: string; url: string }[] }> = {
  schengen_documents: {
    checked: '2026-10-29',
    icon: 'doc',
    countries: SCHENGEN,
    sources: [
      { label: 'European Commission: Applying for a Schengen visa', url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy/applying-schengen-visa_en' },
      { label: 'EU Delegation to Türkiye: cascade rules (15 July 2025)', url: 'https://www.eeas.europa.eu/delegations/t%C3%BCrkiye/more-favourable-visa-rules-turkish-citizens-applying-schengen-visas_en' }
    ]
  },
  etias: {
    checked: '2026-10-29',
    icon: 'passport',
    countries: SCHENGEN,
    sources: [
      { label: 'European Union: ETIAS (travel-europe.europa.eu)', url: 'https://travel-europe.europa.eu/etias_en' },
      { label: 'European Union: EES', url: 'https://travel-europe.europa.eu/ees_en' }
    ]
  },
  uk_eta: {
    checked: '2026-10-29',
    icon: 'passport',
    countries: ['GB'],
    sources: [
      { label: 'GOV.UK: Electronic Travel Authorisation', url: 'https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta' },
      { label: 'GOV.UK: Check if you need a UK visa', url: 'https://www.gov.uk/check-uk-visa' }
    ]
  },
  esta: {
    checked: '2026-10-29',
    icon: 'passport',
    countries: ['US'],
    sources: [
      { label: 'U.S. CBP: ESTA (official)', url: 'https://esta.cbp.dhs.gov/' },
      { label: 'U.S. State Department: Visa Waiver Program', url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html' }
    ]
  },
  greek_islands_visa: {
    checked: '2026-10-29',
    icon: 'ship',
    countries: ['GR'],
    sources: [
      { label: 'Greek Consulate General in Istanbul / authorised ferry agencies', url: 'https://www.mfa.gr/missionsabroad/en/turkey-en/' }
    ]
  }
};

const ALL: Record<string, Record<GuideId, GuideText>> = {
  tr: { ...tr, schengen_documents: scTr },
  en: { ...en, schengen_documents: scEn },
  de: { ...de, schengen_documents: scDe },
  es: { ...es, schengen_documents: scEs },
  ru: { ...ru, schengen_documents: scRu }
} as never;

export const getGuide = (id: GuideId, lang: string): GuideText => (ALL[lang] || ALL.en)[id] || ALL.en[id];
export const isGuideId = (x: string): x is GuideId => (GUIDE_IDS as string[]).includes(x);
/** Bir ülkeyle ilgili rehberler (ülke sayfasında bağlantı için) */
export const guidesForCountry = (code: string): GuideId[] => GUIDE_IDS.filter((g) => GUIDE_META[g].countries.includes(code));
