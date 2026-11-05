// Güncel konu rehberleri (ETIAS, İngiltere ETA, ABD ESTA, Yunan adaları kapıda vize).
// Metinler dil başına JSON'da; kaynaklar, kontrol tarihi ve bağlı ülkeler burada.
// Bilgi değişince: JSON metnini ve `checked` tarihini güncelle, sonra `node scripts/indexnow.mjs`.
import { getPassportItems } from '../utils/calculator';
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

export type GuideId = 'schengen_documents' | 'etias' | 'uk_eta' | 'esta' | 'greek_islands_visa' | 'visa_free_tr' | 'id_card_travel' | 'visa_fees' | 'visa_appointments';
export interface GuideSection { h: string; p?: string[]; list?: string[]; table?: { head: string[]; rows: string[][] } }
export interface ChecklistGroup { id: string; label: string; docs: string[] }
export interface GuideChecklist { title: string; statusLabel: string; purposeLabel: string; commonTitle: string; common: string[]; statuses: ChecklistGroup[]; purposes: ChecklistGroup[]; note: string; print: string }
export interface GuideText { title: string; short: string; metaDesc: string; answer: string; sections: GuideSection[]; faq: { q: string; a: string }[]; checklist?: GuideChecklist }

export const GUIDE_IDS: GuideId[] = ['visa_fees', 'visa_appointments', 'visa_free_tr', 'id_card_travel', 'schengen_documents', 'etias', 'uk_eta', 'esta', 'greek_islands_visa'];
/** Ülke listesi gösteren rehberler: listeyi canlı vize verisinden üretir (elle güncellemek gerekmez). */
export type GuideListGroup = 'id' | 'free' | 'voa' | 'evisa' | 'eta';

const SCHENGEN = ['AT', 'BE', 'BG', 'HR', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'CY'];

export const GUIDE_META: Record<GuideId, { checked: string; icon: string; countries: string[]; sources: { label: string; url: string }[]; list?: { passport: string; byLang?: Record<string, string>; groups: GuideListGroup[] }; langs?: string[] }> = {
  visa_fees: {
    checked: '2026-11-05',
    icon: 'wallet',
    countries: [],
    langs: ['tr', 'en'],
    sources: [
      { label: 'European Commission: Applying for a Schengen visa', url: 'https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en' },
      { label: 'GOV.UK: Standard Visitor visa', url: 'https://www.gov.uk/standard-visitor/apply-standard-visitor-visa' },
      { label: 'IRCC: Visitor visa fees', url: 'https://ircc.canada.ca/english/information/fees/result.asp?lob=trv' },
      { label: 'Ireland DFA: Visas for Ireland', url: 'https://api.ireland.ie/en/dfa/visas-for-ireland/' },
      { label: 'Chinese Visa Application Service Center İstanbul: fees (1 Jul 2026)', url: 'https://www.visaforchina.cn/IST3_EN/upload/20250330/c1f33fb2305d4a40b268242b949340b1.pdf' },
      { label: 'İsveç Başkonsolosluğu: başvuru ücretleri', url: 'https://www.swedenabroad.se/tr/about-sweden-non-swedish-citizens/t%C3%BCrk%C3%A7e/%C4%B0sve%C3%A7e-gitmek/%C4%B0sve%C3%A7i-ziyaret-etmek/ba%C5%9Fvuru-%C3%BCcretleri/' },
      { label: 'Yunanistan Dışişleri: vizeler (Ankara)', url: 'https://www.mfa.gr/turkey/tr/visas.html?mission=ank' },
      { label: 'Macaristan İstanbul Başkonsolosluğu: ücretler (2025)', url: 'https://isztambul.mfa.gov.hu/asset/view/194999/2025%20Konsolosluk%20ve%20vize%20%C3%BCcretleri%20TR_2025.02.01.pdf' }
    ]
  },
  visa_appointments: {
    checked: '2026-11-05',
    icon: 'cal',
    countries: [],
    langs: ['tr', 'en'],
    sources: [
      { label: 'European Commission: Applying for a Schengen visa', url: 'https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en' },
      { label: 'iDATA: Almanya başvuru takip', url: 'https://idata.com.tr/de/tr/p/basvuru-takip-de' },
      { label: 'BLS International: İspanya başvuru durumu', url: 'https://turkey.blsspainglobal.com/Global/bls/VisaApplicationStatus' },
      { label: 'VFS Global: Belçika başvuru takibi', url: 'https://visa.vfsglobal.com/tur/en/bel/track-application' },
      { label: 'U.S. visa appointments (ustraveldocs)', url: 'https://www.ustraveldocs.com/tr/en/nonimmigrant-visa' }
    ]
  },
  id_card_travel: {
    checked: '2026-11-05',
    icon: 'user',
    countries: [],
    list: { passport: 'TR', byLang: { de: 'DE', es: 'ES' }, groups: ['id'] },
    sources: [
      { label: 'T.C. Dışişleri Bakanlığı: Türk vatandaşlarının tabi olduğu vize uygulamaları', url: 'https://www.mfa.gov.tr/turk-vatandaslarinin-tabi-oldugu-vize-uygulamalari.tr.mfa' },
      { label: 'Azerbaycan Devlet Göç Hizmeti (kimlikle giriş)', url: 'https://migration.gov.az/en/news_detail/14495' },
      { label: 'T.C. Ticaret Bakanlığı: Türkiye–Moldova pasaportsuz seyahat (19 Şubat 2019)', url: 'https://ticaret.gov.tr/blog/ulkelerden-ticari-haberler/moldovya/turkiye-ve-moldova-arasinda-pasaportsuz-seyahat-uygulamasi-19-subat-2019-tarihi-i' },
      { label: 'Auswärtiges Amt: Türkei – Einreise und Zoll (Personalausweis)', url: 'https://www.auswaertiges-amt.de/de/service/laender/tuerkei-node/tuerkeisicherheit-201962' },
      { label: 'Auswärtiges Amt: Montenegro – Einreise und Zoll', url: 'https://www.auswaertiges-amt.de/de/216330' }
    ]
  },
  visa_free_tr: {
    checked: '2026-11-05',
    icon: 'passport',
    countries: [],
    list: { passport: 'TR', groups: ['id', 'free', 'voa', 'evisa', 'eta'] },
    sources: [
      { label: 'T.C. Dışişleri Bakanlığı: Türk vatandaşlarının tabi olduğu vize uygulamaları', url: 'https://www.mfa.gov.tr/turk-vatandaslarinin-tabi-oldugu-vize-uygulamalari.tr.mfa' },
      { label: 'Vizamigo: ülke ülke resmî kaynaklarla doğrulanan vize verisi (her ülke sayfasında kaynak bağlantısı)', url: 'https://www.vizamigo.com/tr' }
    ]
  },
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

/** Liste rehberleri için ülke grupları: [ülke kodu, kalış günü ya da kod][] */
export function guideGroups(id: GuideId, lang = 'tr'): Record<GuideListGroup, [string, string][]> | null {
  const L = GUIDE_META[id].list;
  if (!L) return null;
  const passport = L.byLang?.[lang] || L.passport;
  const out: Record<GuideListGroup, [string, string][]> = { id: [], free: [], voa: [], evisa: [], eta: [] };
  for (const x of getPassportItems(passport)) {
    const g: GuideListGroup | null = x.id ? 'id' : x.cat === 'free' ? 'free' : x.cat === 'voa' ? 'voa' : x.cat === 'evisa' ? 'evisa' : x.cat === 'eta' ? 'eta' : null;
    if (g && L.groups.includes(g)) out[g].push([x.c, x.v]);
  }
  const days = (v: string) => (/^\d+$/.test(v) ? Number(v) : 0);
  for (const k of Object.keys(out) as GuideListGroup[]) out[k].sort((a, b) => days(b[1]) - days(a[1]) || a[0].localeCompare(b[0]));
  return out;
}

const fill = (t: string, n: Record<string, number>) => t.replace(/\{(free|id|voa|evisa|eta|easy)\}/g, (_, k) => String(n[k] ?? ''));

export const getGuide = (id: GuideId, lang: string): GuideText => {
  const g = (ALL[lang] || ALL.en)[id] || ALL.en[id];
  const gr = guideGroups(id, lang);
  if (!gr) return g;
  const n = { id: gr.id.length, free: gr.free.length + gr.id.length, voa: gr.voa.length, evisa: gr.evisa.length, eta: gr.eta.length, easy: gr.voa.length + gr.evisa.length + gr.eta.length };
  const f = (t: string) => fill(t, n);
  return { ...g, title: f(g.title), metaDesc: f(g.metaDesc), answer: f(g.answer), sections: g.sections.map((s) => ({ ...s, h: f(s.h), p: s.p?.map(f), list: s.list?.map(f) })), faq: g.faq.map((q) => ({ q: f(q.q), a: f(q.a) })) };
};
/** Bir dilde yayımlanan rehberler (Türkiye'ye özgü rehberler yalnızca tr/en) */
export const guideIdsFor = (lang: string): GuideId[] => GUIDE_IDS.filter((g) => !GUIDE_META[g].langs || GUIDE_META[g].langs!.includes(lang));
export const isGuideId = (x: string): x is GuideId => (GUIDE_IDS as string[]).includes(x);
/** Bir ülkeyle ilgili rehberler (ülke sayfasında bağlantı için) */
export const guidesForCountry = (code: string): GuideId[] => GUIDE_IDS.filter((g) => GUIDE_META[g].countries.includes(code));
