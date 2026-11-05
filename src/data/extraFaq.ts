import data from './extraFaq.json';

export interface ExtraFaq { q: string; a: string; u?: string; h?: string; d?: string; p?: string[] }

/** Arama sorularından eklenen, kaynaklı ek SSS (ülke sayfası + JSON-LD + önceden işlenmiş HTML). */
export function getExtraFaq(code: string, lang: string, passport: string): ExtraFaq[] {
  const byLang = (data as unknown as Record<string, Record<string, ExtraFaq[]>>)[lang];
  const list = byLang?.[code.toUpperCase()] || [];
  return list.filter((f) => !f.p || f.p.includes(passport.toUpperCase()));
}
