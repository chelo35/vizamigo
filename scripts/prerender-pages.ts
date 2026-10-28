/**
 * Derlemeden sonra her ülke sayfası için hazır HTML üretir (dist/<dil>/<ülke>/index.html).
 *
 * Arama motorları ve bağlantı önizlemeleri JavaScript beklemeden doğru başlığı, açıklamayı,
 * kanonik adresi, dil alternatiflerini ve sayfanın özet metnini görür. React yüklenince
 * aynı içerik canlı uygulamayla değişir. Vercel önce dosyaya baktığı için yönlendirme
 * kuralına dokunmak gerekmez.
 *
 * Hata olursa derlemeyi bozmaz: uyarı yazar ve çıkar.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function main() {
  const tplPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(tplPath)) {
    console.warn('[prerender] dist/index.html yok, atlandı');
    return;
  }
  const tpl = fs.readFileSync(tplPath, 'utf8');

  const { GEO_DATA } = await import('../src/data/geoData');
  const { getCountryName, countryToRegion, getRegionName } = await import('../src/data/passportData');
  const { getCountrySeoMeta } = await import('../src/utils/schemaGenerator');
  const { buildLocalizedPath, buildAbsoluteLocalizedUrl, getHreflangAlternatesForRoute, CORE_SEO_LANGUAGES } = await import('../src/utils/seoRouter');

  const OG: Record<string, string> = { tr: 'tr_TR', en: 'en_US', de: 'de_DE', es: 'es_ES', ru: 'ru_RU' };
  const EYEBROW: Record<string, string> = { tr: 'Vize rehberi', en: 'Visa guide', de: 'Visa-Ratgeber', es: 'Guía de visados', ru: 'Визовый гид' };
  const HOME_TITLE: Record<string, string> = {
    tr: 'Vizamigo - 199 Ülke Vize Rejimi ve Küresel Pasaport Rehberi',
    en: 'Vizamigo - Global Visa Policy & Passport Mobility Guide',
    de: 'Vizamigo - Weltweite Visabestimmungen & Reisepass-Guide',
    es: 'Vizamigo - Política Global de Visados y Guía de Pasaportes',
    ru: 'Vizamigo - Глобальный визовый режим и гид по паспортам'
  };
  const CAPITAL: Record<string, string> = { tr: 'Başkent', en: 'Capital', de: 'Hauptstadt', es: 'Capital', ru: 'Столица' };

  const render = (lang: string, code: string | null) => {
    let html = tpl;
    const canonical = buildAbsoluteLocalizedUrl(lang as never, 'explore', code);
    const alts = getHreflangAlternatesForRoute('explore', code);
    let title = '';
    let desc = '';
    let body = '';
    if (!code) {
      title = HOME_TITLE[lang] || '';
    }
    if (code) {
      const meta = getCountrySeoMeta(code, lang as never, 'TR');
      const name = getCountryName(code, lang);
      title = meta.title;
      desc = meta.description;
      const region = getRegionName(countryToRegion[code] || '', lang);
      const cap = (GEO_DATA as Record<string, { capital?: string }>)[code]?.capital;
      body =
        `<span class="vzs-eye">${esc([EYEBROW[lang], region].filter(Boolean).join(' · ').toLocaleUpperCase(lang))}</span>` +
        `<h1 class="vzs-h1">${esc(name)}<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"> — ${esc(meta.h1.replace(name, '').trim())}</span></h1>` +
        `<p class="vzs-lead">${esc(desc)}</p>` +
        (cap && lang === 'tr' ? `<p class="vzs-lead">${CAPITAL[lang]}: ${esc(cap)}</p>` : '');
    }

    // <html lang>
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
    if (title) {
      html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
      if (desc) html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
      html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
      if (desc) html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
      html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
      if (desc) html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
    }
    html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`);
    html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
    html = html.replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${OG[lang] || 'en_US'}$2`);
    // dil alternatifleri: eskileri çıkar, bu sayfanınkini koy
    html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" data-dynamic-hreflang="true" \/>/g, '');
    const altTags = alts.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" data-dynamic-hreflang="true" />`).join('\n    ');
    html = html.replace(/(<link rel="canonical" href="[^"]*" \/>)/, `$1\n    ${altTags}`);
    if (body) {
      html = html.replace(/<span class="vzs-eye" id="vzs-eye">[\s\S]*?<div class="vzs-search"><\/div>/, body);
      // ülke sayfasında dil başlığını değiştiren küçük betik gerekmez
      html = html.replace(/<script>\s*\(function \(\) \{\s*try \{\s*var m = location\.pathname[\s\S]*?<\/script>/, '');
    }
    return html;
  };

  let n = 0;
  for (const lang of CORE_SEO_LANGUAGES) {
    // dil ana sayfası
    const home = path.join(DIST, buildLocalizedPath(lang, 'explore', null), 'index.html');
    fs.mkdirSync(path.dirname(home), { recursive: true });
    fs.writeFileSync(home, render(lang, null));
    n++;
    for (const code of Object.keys(GEO_DATA)) {
      const out = path.join(DIST, buildLocalizedPath(lang, 'explore', code), 'index.html');
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, render(lang, code));
      n++;
    }
  }
  console.log(`[prerender] ${n} sayfa yazıldı`);
}

main().catch((e) => {
  console.warn('[prerender] atlandı:', e instanceof Error ? e.message : e);
});
