/**
 * Derlemeden sonra her sayfa için hazır HTML üretir:
 *   dist/<dil>/index.html, dist/<dil>/<ülke>/index.html, dist/<dil>/<araç>/index.html,
 *   dist/<dil>/info/<sayfa>/index.html ve dist/404.html.
 *
 * Arama motorları ve bağlantı önizlemeleri JavaScript beklemeden doğru başlığı, açıklamayı,
 * kanonik adresi, dil alternatiflerini, sayfanın özetini ve iç bağlantıları görür. React
 * yüklenince aynı içerik canlı uygulamayla değişir. Vercel önce dosyaya baktığı için
 * yönlendirme kuralına dokunmak gerekmez.
 *
 * Hata olursa derlemeyi bozmaz: uyarı yazar ve çıkar.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { applyDict } from './data-i18n';
const DIST = path.resolve(__dirname, '../dist');

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function main() {
  const tplPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(tplPath)) {
    console.warn('[prerender] dist/index.html yok, atlandı');
    return;
  }
  const tpl = fs.readFileSync(tplPath, 'utf8');

  // Vite manifest: sayfanın ihtiyaç duyduğu parçaları erkenden indir (bekleme zincirini kısaltır)
  type ME = { file: string; imports?: string[] };
  const manPath = path.join(DIST, '.vite', 'manifest.json');
  const man: Record<string, ME> = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, 'utf8')) : {};
  const walk = (key: string, seen = new Set<string>()): Set<string> => {
    const e = man[key];
    if (!e || seen.has(key)) return seen;
    seen.add(key);
    (e.imports || []).forEach((i) => walk(i, seen));
    return seen;
  };
  const preloadFor = (entry: string) =>
    [...walk(entry)]
      .map((k) => man[k].file)
      .filter((f) => f.endsWith('.js') && !tpl.includes(f))
      .map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`)
      .join('\n    ');
  const PRE: Record<string, string> = {
    country: preloadFor('src/next/CountryPage.tsx'),
    plan: preloadFor('src/next/RoutePage.tsx'),
    track: preloadFor('src/next/WalletPage.tsx'),
    nomad: preloadFor('src/next/ToolsHub.tsx'),
    consular: preloadFor('src/next/ToolsHub.tsx'),
    profile: preloadFor('src/next/ProfilePage.tsx'),
    info: preloadFor('src/next/InfoPage.tsx')
  };
  const { getCountryVisual, getOptimizedImageUrl } = await import('../src/data/countryVisuals');
  const { generateCountryJsonLd } = await import('../src/utils/countrySchemaGenerator');
  const { GUIDE_IDS, GUIDE_META, getGuide } = await import('../src/data/guides');

  const { GEO_DATA } = await import('../src/data/geoData');
  const { getCountryName, countryToRegion, getRegionName } = await import('../src/data/passportData');
  const { getCountrySeoMeta } = await import('../src/utils/schemaGenerator');
  const { buildLocalizedPath, buildAbsoluteLocalizedUrl, getHreflangAlternatesForRoute, CORE_SEO_LANGUAGES, BASE_URL } = await import('../src/utils/seoRouter');
  const { getTabSeo } = await import('../src/utils/tabSeo');

  const LANGS = CORE_SEO_LANGUAGES as readonly string[];
  const allCodes = Object.keys(GEO_DATA).sort();
  const OG: Record<string, string> = { tr: 'tr_TR', en: 'en_US', de: 'de_DE', es: 'es_ES', ru: 'ru_RU' };
  const EYEBROW: Record<string, string> = { tr: 'Vize rehberi', en: 'Visa guide', de: 'Visa-Ratgeber', es: 'Guía de visados', ru: 'Визовый гид' };
  const HOME_TITLE: Record<string, string> = {
    tr: 'Vizamigo - 199 Ülke Vize Rejimi ve Küresel Pasaport Rehberi',
    en: 'Vizamigo - Global Visa Policy & Passport Mobility Guide',
    de: 'Vizamigo - Weltweite Visabestimmungen & Reisepass-Guide',
    es: 'Vizamigo - Política Global de Visados y Guía de Pasaportes',
    ru: 'Vizamigo - Глобальный визовый режим и гид по паспортам'
  };
  const HOME_DESC: Record<string, string> = {
    tr: '199 ülkenin güncel vize kuralları ve kalış süreleri, pasaport karşılaştırma, Schengen 90/180 gün sayacı, rota planlayıcı, acil durum numaraları ve dijital göçebe rehberi.',
    en: 'Up-to-date visa rules and stay limits for 199 countries, passport comparison, Schengen 90/180 calculator, route planner, emergency numbers and a digital nomad guide.',
    de: 'Aktuelle Visaregeln und Aufenthaltsdauer für 199 Länder, Passvergleich, Schengen-Rechner 90/180, Routenplaner, Notrufnummern und Nomaden-Guide.',
    es: 'Reglas de visado y estancia para 199 países, comparación de pasaportes, calculadora Schengen 90/180, planificador de rutas, emergencias y guía para nómadas digitales.',
    ru: 'Актуальные визовые правила и сроки пребывания для 199 стран, сравнение паспортов, калькулятор Шенгена 90/180, планировщик маршрута и экстренные номера.'
  };
  const CAPITAL: Record<string, string> = { tr: 'Başkent', en: 'Capital', de: 'Hauptstadt', es: 'Capital', ru: 'Столица' };
  const UI: Record<string, { home: string; countries: string; tools: string; region: string }> = {
    tr: { home: 'Ana sayfa', countries: 'Ülkelere göre vize rehberi', tools: 'Araçlar', region: 'Aynı bölgedeki ülkeler' },
    en: { home: 'Home', countries: 'Visa guide by country', tools: 'Tools', region: 'Countries in the same region' },
    de: { home: 'Startseite', countries: 'Visa-Ratgeber nach Land', tools: 'Tools', region: 'Länder in derselben Region' },
    es: { home: 'Inicio', countries: 'Guía de visados por país', tools: 'Herramientas', region: 'Países de la misma región' },
    ru: { home: 'Главная', countries: 'Визовый гид по странам', tools: 'Инструменты', region: 'Страны того же региона' }
  };
  const TABS = ['plan', 'track', 'nomad', 'profile', 'consular'] as const;
  // bilgi sayfaları (yedekleme aracı hariç)
  const INFO: Record<string, [string, string]> = {
    terms: ['Kullanım koşulları', 'Terms of use'], privacy: ['Gizlilik politikası', 'Privacy policy'], disclaimer: ['Sorumluluk reddi', 'Disclaimer'],
    kvkk_gdpr: ['KVKK ve GDPR', 'KVKK & GDPR'], standards: ['Kaynaklar ve doğrulama', 'Sources & verification'], attributions: ['Görsel kaynakları', 'Photo credits'],
    appeals: ['Vize reddine itiraz', 'Visa refusal appeals'], passport_lost: ['Yurt dışında pasaport kaybı', 'Lost passport abroad'], crisis: ['Kriz masası', 'Crisis desk'],
    transit: ['Transit kuralları', 'Transit rules'], partners: ['Acenteler', 'Agencies'], airlines: ['Havayolları', 'Airlines'], insurance: ['Seyahat sigortası', 'Travel insurance'],
    community: ['Topluluk', 'Community'], api: ['Kurumsal API', 'Business API'], mission: ['Misyonumuz', 'Our mission'], sustainability: ['Sürdürülebilirlik', 'Sustainability'],
    careers: ['Kariyer', 'Careers'], press: ['İletişim', 'Contact']
  };

  const tabName = (t: string, lang: string) => (getTabSeo(t, lang)?.title || t).replace(/ \| Vizamigo$/, '').split(':')[0];
  const tabLinks = (lang: string) => TABS.map((t) => `<a href="${buildLocalizedPath(lang as never, t, null)}">${esc(tabName(t, lang))}</a>`).join(' · ');
  const countryLinks = (lang: string, codes: string[]) =>
    codes.map((c) => `<a href="${buildLocalizedPath(lang as never, 'explore', c)}">${esc(getCountryName(c, lang))}</a>`).join(' · ');
  const navBlock = (lang: string, inner: string) => `<nav class="vzs-wrap vzs-links" aria-label="${esc(UI[lang].countries)}">${inner}</nav>`;
  const homeLink = (lang: string) => `<a href="${buildLocalizedPath(lang as never, 'explore', null)}">${esc(UI[lang].home)}</a>`;
  const eyebrow = (lang: string, parts: string[]) => `<span class="vzs-eye">${esc(parts.filter(Boolean).join(' · ').toLocaleUpperCase(lang))}</span>`;
  const h1 = (main: string, rest = '') =>
    `<h1 class="vzs-h1">${esc(main)}${rest ? `<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"> — ${esc(rest)}</span>` : ''}</h1>`;
  const lead = (t: string) => `<p class="vzs-lead">${esc(t)}</p>`;

  type Opts = { lang: string; canonical: string; alts: { hreflang: string; href: string }[]; title: string; desc?: string; body?: string; nav?: string; noindex?: boolean; head?: string; hero?: string };
  const build = ({ lang, canonical, alts, title, desc = '', body = '', nav = '', noindex, head = '', hero = '' }: Opts) => {
    let html = tpl;
    if (head) html = html.replace('</head>', `    ${head}\n  </head>`);
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
    html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
    html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
    if (desc) {
      html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
      html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
      html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
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
      // dil başlığını değiştiren küçük betik gerekmez
      html = html.replace(/<script>\s*\(function \(\) \{\s*try \{\s*var m = location\.pathname[\s\S]*?<\/script>/, '');
    }
    if (hero) {
      html = html.replace(/<section class="vzs-hero">[\s\S]*?<div class="vzs-sea"><\/div><\/section>/, `${hero}${nav}`);
      html = html.replace(/<script>\s*\(function \(\) \{\s*try \{\s*var m = location\.pathname[\s\S]*?<\/script>/, '');
    } else if (nav) html = html.replace('<div class="vzs-sea"></div></section>', `<div class="vzs-sea"></div></section>${nav}`);
    if (noindex) html = html.replace(/(<meta name="robots" content=")[^"]*(")/, '$1noindex, follow$2');
    return html;
  };
  const write = (rel: string, html: string) => {
    const out = path.join(DIST, rel);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  };

  const FAQ_TITLE: Record<string, string> = { tr: 'Sık sorulan sorular', en: 'Frequently asked questions', de: 'Häufige Fragen', es: 'Preguntas frecuentes', ru: 'Частые вопросы' };
  let n = 0;
  for (const lang of LANGS) {
    // dil ana sayfası: başlık, açıklama ve bütün ülkelere bağlantı (Google sayfaları bulsun)
    write(path.join(buildLocalizedPath(lang as never, 'explore', null), 'index.html'), build({
      lang,
      canonical: buildAbsoluteLocalizedUrl(lang as never, 'explore', null),
      alts: getHreflangAlternatesForRoute('explore', null),
      title: HOME_TITLE[lang],
      desc: HOME_DESC[lang],
      nav: navBlock(lang, `<h2>${esc(UI[lang].countries)}</h2><p>${countryLinks(lang, allCodes)}</p><h2>${esc(UI[lang].tools)}</h2><p>${tabLinks(lang)}</p>`)
    }));
    n++;

    // ülke sayfaları
    for (const code of allCodes) {
      const meta = getCountrySeoMeta(code, lang as never, 'TR');
      const name = getCountryName(code, lang);
      const reg = countryToRegion[code] || '';
      const region = getRegionName(reg, lang);
      const cap = (GEO_DATA as Record<string, { capital?: string }>)[code]?.capital;
      const near = allCodes.filter((c) => c !== code && reg && countryToRegion[c] === reg).slice(0, 12);
      const ld = generateCountryJsonLd({ countryCode: code, language: lang as never, currentPassport: 'TR' });
      // görünür SSS: yapılandırılmış verideki soru-cevaplar sayfada da yazılı olsun (Google kuralı;
      // JavaScript çalıştırmayan yapay zekâ tarayıcıları da bu metni okur)
      const faqNode = ((ld as { '@graph'?: Array<Record<string, unknown>> })['@graph'] || [ld as Record<string, unknown>]).find((x) => x['@type'] === 'FAQPage') as
        | { mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }> }
        | undefined;
      const faqHtml = faqNode?.mainEntity?.length
        ? `<section class="vzs-faq"><h2>${esc(FAQ_TITLE[lang] || FAQ_TITLE.en)}</h2>${faqNode.mainEntity.map((q) => `<h3>${esc(q.name)}</h3><p>${esc(q.acceptedAnswer.text)}</p>`).join('')}</section>`
        : '';
      write(path.join(buildLocalizedPath(lang as never, 'explore', code), 'index.html'), build({
        lang,
        canonical: buildAbsoluteLocalizedUrl(lang as never, 'explore', code),
        alts: getHreflangAlternatesForRoute('explore', code),
        title: meta.title,
        desc: meta.description,
        head: `<script type="application/ld+json" id="vizamigo-jsonld-schema" data-code="${code}" data-lang="${lang}" data-pass="TR">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n    ${PRE.country}\n    <link rel="preload" as="image" fetchpriority="high" imagesrcset="${getOptimizedImageUrl(getCountryVisual(code, lang).image, { width: 480 })} 480w, ${getOptimizedImageUrl(getCountryVisual(code, lang).image, { width: 720 })} 720w" imagesizes="100vw" />`,
        // uygulamanın ülke başlığıyla aynı ölçüde fotoğraflı başlık: ilk boyama erken, kayma yok
        hero: (() => {
          const v = getCountryVisual(code, lang);
          const s480 = getOptimizedImageUrl(v.image, { width: 480 });
          const s720 = getOptimizedImageUrl(v.image, { width: 720 });
          return `<section class="vzs-chero"><img src="${s720}" srcset="${s480} 480w, ${s720} 720w" sizes="100vw" alt="" fetchpriority="high" /><div class="vzs-wrap vzs-chero-in">${eyebrow(lang, [EYEBROW[lang], region])}${h1(name, meta.h1.replace(name, '').trim())}${cap ? `<p>${esc(cap)}</p>` : ''}</div></section>`;
        })(),
        nav: navBlock(lang, `${lead(meta.description)}${faqHtml}<p>${homeLink(lang)} · ${tabLinks(lang)}</p>${near.length ? `<h2>${esc(UI[lang].region)}</h2><p>${countryLinks(lang, near)}</p>` : ''}`)
      }));
      n++;
    }

    // araç sayfaları
    for (const tab of TABS) {
      const seo = getTabSeo(tab, lang)!;
      const clean = seo.title.replace(/ \| Vizamigo$/, '');
      const [main, rest = ''] = clean.split(': ');
      write(path.join(buildLocalizedPath(lang as never, tab, null), 'index.html'), build({
        lang,
        canonical: buildAbsoluteLocalizedUrl(lang as never, tab, null),
        alts: getHreflangAlternatesForRoute(tab, null),
        title: seo.title,
        desc: seo.desc,
        head: PRE[tab] || '',
        body: eyebrow(lang, ['Vizamigo']) + h1(main, rest) + lead(seo.desc),
        nav: navBlock(lang, `<p>${homeLink(lang)} · ${tabLinks(lang)}</p>`)
      }));
      n++;
    }

    // güncel konu rehberleri (ETIAS, ETA, ESTA, Yunan adaları): tam metin önceden yazılı
    for (const id of GUIDE_IDS) {
      const g = getGuide(id, lang);
      const meta = GUIDE_META[id];
      const url = `${BASE_URL}/${lang}/info/${id}`;
      const ld = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Article', headline: g.title, description: g.metaDesc, inLanguage: lang, datePublished: '2026-10-29', dateModified: meta.checked, mainEntityOfPage: url, author: { '@type': 'Organization', name: 'Vizamigo', url: BASE_URL }, publisher: { '@type': 'Organization', name: 'Vizamigo', url: BASE_URL } },
          { '@type': 'FAQPage', mainEntity: g.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
        ]
      };
      const secs = g.sections.map((x) => `<h2>${esc(x.h)}</h2>${(x.p || []).map((t) => `<p>${esc(t)}</p>`).join('')}${x.list ? `<ul>${x.list.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}`).join('');
      const faq = `<section class="vzs-faq"><h2>${esc(FAQ_TITLE[lang] || FAQ_TITLE.en)}</h2>${g.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>`;
      const src = `<p>${meta.sources.map((x) => `<a href="${esc(x.url)}" rel="noopener">${esc(x.label)}</a>`).join(' · ')} · ${esc(meta.checked)}</p>`;
      const others = GUIDE_IDS.filter((o) => o !== id).map((o) => `<a href="/${lang}/info/${o}">${esc(getGuide(o, lang).short)}</a>`).join(' · ');
      write(path.join(lang, 'info', id, 'index.html'), build({
        lang,
        canonical: url,
        alts: [...LANGS.map((c) => ({ hreflang: c, href: `${BASE_URL}/${c}/info/${id}` })), { hreflang: 'x-default', href: `${BASE_URL}/en/info/${id}` }],
        title: `${g.title} | Vizamigo`,
        desc: g.metaDesc,
        head: `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n    ${PRE.info}`,
        body: eyebrow(lang, ['Vizamigo']) + h1(g.title) + lead(g.answer),
        nav: navBlock(lang, `${secs}${faq}${src}<p>${others}</p><p>${homeLink(lang)} · ${tabLinks(lang)}</p>`)
      }));
      n++;
    }

    // bilgi sayfaları
    for (const [id, [trT, enT]] of Object.entries(INFO)) {
      const t = lang === 'tr' ? trT : enT;
      write(path.join(lang, 'info', id, 'index.html'), build({
        lang,
        canonical: `${BASE_URL}/${lang}/info/${id}`,
        alts: [...LANGS.map((c) => ({ hreflang: c, href: `${BASE_URL}/${c}/info/${id}` })), { hreflang: 'x-default', href: `${BASE_URL}/en/info/${id}` }],
        title: `${t} | Vizamigo`,
        head: PRE.info,
        body: eyebrow(lang, ['Vizamigo']) + h1(t),
        nav: navBlock(lang, `<p>${homeLink(lang)} · ${tabLinks(lang)}</p>`)
      }));
      n++;
    }
  }

  // olmayan adresler için; arama motoru dizine almasın
  write('404.html', build({ lang: 'tr', canonical: `${BASE_URL}/`, alts: getHreflangAlternatesForRoute('explore', null), title: 'Sayfa bulunamadı | Vizamigo', noindex: true }));
  // ülke sayfası verisi: ülke başına küçük JSON (sayfa 1,6 MB'lık dosyayı beklemesin)
  {
    const { getCountryInsights } = await import('../src/data/countryInsights');
    const { getCountryTravelIntelligence } = await import('../src/data/countryTravelIntelligence');
    const { getCountryEncyclopedia } = await import('../src/data/countryEncyclopedia');
    const { getCountryItinerary } = await import('../src/data/countryItineraries');
    const { getVerifiedCountryRecord } = await import('../src/data/verifiedCountryData');
    const { getCountryNomadApps } = await import('../src/data/rideAndDeliveryApps');
    const { loadDict, DATA_LANGS } = await import('./data-i18n');
    const dicts: Record<string, Record<string, string>> = {};
    for (const l of DATA_LANGS) dicts[l] = loadDict(path.resolve(DIST, '..'), l);
    const plugs: Record<string, string[]> = {};
    let files = 0;
    for (const code of allCodes) {
      const intel = getCountryTravelIntelligence(code, getCountryName(code, 'en'));
      plugs[code] = intel.plugs.types;
      const insEn = getCountryInsights(code, 'en');
      write(path.join('data', 'country', 'x', `${code}.json`), JSON.stringify({ intel, verified: getVerifiedCountryRecord(code), apps: getCountryNomadApps(code, insEn.transport.popularRideApps || []) }));
      files++;
      for (const lang of LANGS) {
        const local = { insights: getCountryInsights(code, lang), enc: getCountryEncyclopedia(code, lang as never), itin: getCountryItinerary(code, lang as never) };
        const dict = dicts[lang];
        // Türkçe dışı dillerde, Türkçe kalmış metinleri sözlükten çevir (dilden bağımsız intel dahil)
        const out = dict && Object.keys(dict).length ? { ...applyDict(local, dict), intel: applyDict(intel, dict) } : local;
        write(path.join('data', 'country', lang, `${code}.json`), JSON.stringify(out));
        files++;
      }
    }
    write(path.join('data', 'plugs.json'), JSON.stringify(plugs));
    console.log(`[prerender] ${files} ülke veri dosyası yazıldı`);
  }

  // manifest yalnızca derleme içindi; yayına çıkmasın
  try {
    fs.rmSync(path.join(DIST, '.vite'), { recursive: true, force: true });
  } catch {}
  console.log(`[prerender] ${n} sayfa yazıldı`);
}

main().catch((e) => {
  console.warn('[prerender] atlandı:', e instanceof Error ? e.message : e);
});
