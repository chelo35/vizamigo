/** Metin içinde geçen başkent ve simge yapı adlarının dil karşılıkları (Türkçe -> hedef dil). */
export async function buildExtras(lang: string): Promise<Record<string, string>> {
  const { GEO_DATA } = await import('../src/data/geoData');
  const { capitalName } = await import('../src/data/capitalNames');
  const { COUNTRY_VISUALS_LIST } = await import('../src/data/countryVisualsData');
  const out: Record<string, string> = {};
  for (const [c, g] of Object.entries(GEO_DATA)) {
    const t = (g as { capital: string }).capital;
    // yaygın kelimelerle karışabilecek adlar metin içinde değiştirilmez
    if (t && !['Sana', 'Roma', 'Male', 'Victoria'].includes(t)) out[t] = capitalName(c, lang, t);
  }
  for (const v of COUNTRY_VISUALS_LIST as { landmarkI18n?: Record<string, string>; symbols?: { main?: string } }[]) {
    const tr = v.landmarkI18n?.tr;
    const to = v.landmarkI18n?.[lang];
    if (tr && to && tr.length >= 6) out[tr] = to;
  }
  return out;
}
