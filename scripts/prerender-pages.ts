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
import { applyDict, loadDict, makeSubstTranslator, mapStrings, DATA_LANGS } from './data-i18n';
import { buildExtras } from './i18n-extras';
const DIST = path.resolve(__dirname, '../dist');

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function main() {
  // Elle doğrulanmış ülke düzeltmeleri: veri üreticileri (getCountryInsights vb.) derleme boyunca bunları uygular
  {
    const dir = path.join(process.cwd(), 'src', 'data', 'country-fixes');
    const all: Record<string, unknown> = {};
    if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) if (/^[A-Z]{2}\.json$/.test(f)) { try { all[f.slice(0, 2)] = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch { console.warn('[prerender] okunamadı:', f); } }
    (globalThis as { __vzCountryFixes?: unknown }).__vzCountryFixes = all;
  }
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
  const { GUIDE_IDS, GUIDE_META, getGuide, guideGroups, guideIdsFor, sourceLabel } = await import('../src/data/guides');

  const { GEO_DATA } = await import('../src/data/geoData');
  // İspanyolca/Rusça/Almanca otomatik çeviri sözlükleri tarayıcıda sonradan yüklenir; derlemede baştan yükle
  {
    const { loadLanguageDictionary } = await import('../src/i18n');
    for (const l of ['de', 'es', 'ru'] as const) await loadLanguageDictionary(l);
  }
  const { capitalName } = await import('../src/data/capitalNames');
  // Türkçe dışı sayfalarda Türkçe kalmış veri metinlerini çevir: sözlük (cümle içi parçalar dahi) + başkent adları
  const SUBST: Record<string, (s: string) => string> = {};
  const DICTS: Record<string, Record<string, string>> = {};
  for (const l of DATA_LANGS) {
    DICTS[l] = loadDict(path.resolve(DIST, '..'), l);
    SUBST[l] = makeSubstTranslator(DICTS[l], await buildExtras(l));
  }
  const trOut = (lang: string, html: string) => (SUBST[lang] ? SUBST[lang](html) : html);
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
  const INFO: Record<string, [string, string, string, string, string]> = {
    terms: ['Kullanım koşulları', 'Terms of use', 'Nutzungsbedingungen', 'Condiciones de uso', 'Условия использования'],
    privacy: ['Gizlilik politikası', 'Privacy policy', 'Datenschutzerklärung', 'Política de privacidad', 'Политика конфиденциальности'],
    disclaimer: ['Sorumluluk reddi', 'Disclaimer', 'Haftungsausschluss', 'Aviso legal', 'Отказ от ответственности'],
    kvkk_gdpr: ['KVKK ve GDPR', 'KVKK & GDPR', 'KVKK & DSGVO', 'KVKK y RGPD', 'KVKK и GDPR'],
    standards: ['Kaynaklar ve doğrulama', 'Sources & verification', 'Quellen & Überprüfung', 'Fuentes y verificación', 'Источники и проверка'],
    attributions: ['Görsel kaynakları', 'Photo credits', 'Bildnachweise', 'Créditos de las fotos', 'Источники фотографий'],
    appeals: ['Vize reddine itiraz', 'Visa refusal appeals', 'Widerspruch gegen Visumablehnung', 'Recurso contra la denegación de visado', 'Обжалование отказа в визе'],
    passport_lost: ['Yurt dışında pasaport kaybı', 'Lost passport abroad', 'Reisepass im Ausland verloren', 'Pasaporte perdido en el extranjero', 'Потеря паспорта за границей'],
    crisis: ['Kriz masası', 'Crisis desk', 'Krisenhilfe', 'Centro de crisis', 'Кризисный центр'],
    transit: ['Transit kuralları', 'Transit rules', 'Transitbestimmungen', 'Normas de tránsito', 'Правила транзита'],
    partners: ['Acenteler', 'Agencies', 'Reisebüros', 'Agencias', 'Агентства'],
    airlines: ['Havayolları', 'Airlines', 'Fluggesellschaften', 'Aerolíneas', 'Авиакомпании'],
    insurance: ['Seyahat sigortası', 'Travel insurance', 'Reiseversicherung', 'Seguro de viaje', 'Туристическая страховка'],
    community: ['Topluluk', 'Community', 'Community', 'Comunidad', 'Сообщество'],
    api: ['Kurumsal API', 'Business API', 'Business-API', 'API para empresas', 'API для бизнеса'],
    mission: ['Misyonumuz', 'Our mission', 'Unsere Mission', 'Nuestra misión', 'Наша миссия'],
    sustainability: ['Sürdürülebilirlik', 'Sustainability', 'Nachhaltigkeit', 'Sostenibilidad', 'Устойчивое развитие'],
    careers: ['Kariyer', 'Careers', 'Karriere', 'Empleo', 'Карьера'],
    press: ['İletişim', 'Contact', 'Kontakt', 'Contacto', 'Контакты']
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

  const TPL_I18N: Record<string, { app: string; site: string; ogAlt: string; kw: string }> = {
    en: { app: 'Visa-free access worldwide, passport comparison, Schengen 90/180-day calculator, consular emergency guide and travel safety updates.', site: 'Passport, Visa & Global Travel Guide', ogAlt: 'Passport & Visa Assistant', kw: 'visa requirements, visa-free countries, passport, Schengen 90/180 calculator, lost passport abroad, consular emergency, digital nomad visa, travel guide' },
    de: { app: 'Visumfreie Einreise weltweit, Reisepass-Vergleich, Schengen-90/180-Tage-Rechner, Notfallhilfe der Konsulate und Reisesicherheit.', site: 'Reisepass-, Visa- & Reiseführer weltweit', ogAlt: 'Reisepass- & Visa-Assistent', kw: 'Einreisebestimmungen, Visum, visumfreie Länder, Reisepass, Schengen 90/180 Rechner, Reisepass verloren, Konsulat Notfall, Digital-Nomaden-Visum, Reiseführer' },
    es: { app: 'Viajes sin visado en todo el mundo, comparación de pasaportes, calculadora Schengen 90/180 días, guía consular de emergencia y seguridad de viaje.', site: 'Guía mundial de pasaportes, visados y viajes', ogAlt: 'Asistente de pasaportes y visados', kw: 'requisitos de visado, países sin visa, pasaporte, calculadora Schengen 90/180, pasaporte perdido, emergencia consular, visa de nómada digital, guía de viaje' },
    ru: { app: 'Безвизовые страны по всему миру, сравнение паспортов, калькулятор Шенгена 90/180 дней, консульская помощь и безопасность поездок.', site: 'Паспорта, визы и путешествия по всему миру', ogAlt: 'Помощник по паспортам и визам', kw: 'визовые требования, безвизовые страны, паспорт, калькулятор Шенгена 90/180, потеря паспорта, консульская помощь, виза цифрового кочевника, путеводитель' }
  };

  type Opts = { lang: string; canonical: string; alts: { hreflang: string; href: string }[]; title: string; desc?: string; body?: string; nav?: string; noindex?: boolean; head?: string; hero?: string; ogImage?: string; ogAlt?: string };
  const build = ({ lang, canonical, alts, title, desc = '', body = '', nav = '', noindex, head = '', hero = '', ogImage, ogAlt }: Opts) => {
    let html = tpl;
    if (ogImage) {
      // ülkeye özel paylaşım görseli (sosyal medyada ve aramada daha çok tıklanır)
      html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${ogImage}$2`);
      html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${ogImage}$2`);
      html = html.replace(/\s*<meta property="og:image:(width|height)" content="[^"]*" \/>/g, '');
      if (ogAlt) html = html.replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${esc(ogAlt)}$2`);
    }
    if (lang !== 'tr') {
      // şablonun Türkçe site tanımlarını sayfa diline çevir (JSON-LD ve paylaşım görseli metni)
      const T = TPL_I18N[lang] || TPL_I18N.en;
      html = html.replace('"Küresel vize serbestisi, çifte pasaport kıyaslama, Schengen 90/180 gün sayacı, acil durum konsolosluk rehberi ve seyahat güvenlik istihbaratı."', JSON.stringify(T.app));
      html = html.replace('"Akıllı Pasaport, Vize & Küresel Seyahat Rehberi"', JSON.stringify(T.site));
      html = html.replace('content="Vizamigo - Akıllı Pasaport & Vize Asistanı"', `content="${esc('Vizamigo - ' + T.ogAlt)}"`);
      html = html.replace(/(<meta name="keywords" content=")[^"]*(")/, `$1${esc(T.kw)}$2`);
      if (!desc) desc = T.app;
    }
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
      html = html.replace(/<span class="vzs-eye" id="vzs-eye">[\s\S]*?<div class="vzs-search"><\/div>\s*<div class="vzs-chips"><\/div>/, body);
      // dil başlığını değiştiren küçük betik gerekmez
      html = html.replace(/<script>\s*\(function \(\) \{\s*try \{\s*var m = location\.pathname[\s\S]*?<\/script>/, '');
    }
    if (hero) {
      html = html.replace(/<section class="vzs-hero">[\s\S]*?<div class="vzs-sea"><\/div><\/section>/, `${hero}${nav}`);
      html = html.replace(/<script>\s*\(function \(\) \{\s*try \{\s*var m = location\.pathname[\s\S]*?<\/script>/, '');
    } else if (nav) html = html.replace('<div class="vzs-sea"></div></section>', `<div class="vzs-sea"></div></section>${nav}`);
    if (lang !== 'tr' && !body && !hero) {
      // ana sayfanın sabit karşılama metni: tarayıcıdaki küçük betiği beklemeden sayfa dilinde olsun
      const m = html.match(/var t = (\{ en: \[[\s\S]*?\] \})\[m && m\[1\]\];/);
      try {
        const t = m ? (Function(`return ${m[1]}`)() as Record<string, string[]>)[lang] : null;
        if (t) {
          html = html.replace(/(<span class="vzs-eye" id="vzs-eye">)[^<]*(<\/span>)/, `$1${esc(t[0])}$2`);
          html = html.replace(/(<h1 class="vzs-h1" id="vzs-h1">)[^<]*(<\/h1>)/, `$1${esc(t[1])}$2`);
          html = html.replace(/(<p class="vzs-lead" id="vzs-lead">)[^<]*(<\/p>)/, `$1${esc(t[2])}$2`);
        }
      } catch {}
    }
    if (noindex) html = html.replace(/(<meta name="robots" content=")[^"]*(")/, '$1noindex, follow$2');
    return lang === 'tr' ? html : trOut(lang, html);
  };
  const write = (rel: string, html: string) => {
    const out = path.join(DIST, rel);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  };

  const { LANG_PASS, PASSPORT_PAGES } = await import('../src/data/passportPages');
  const { buildPassportPath } = await import('../src/utils/seoRouter');
  const PP_TITLE: Record<string, string> = { tr: 'Diğer pasaportlar', en: 'Entry rules for other passports', de: 'Einreise mit anderen Pässen', es: 'Requisitos para otros pasaportes', ru: 'Правила для других паспортов' };
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

    // ülke sayfaları: dilin ana pasaportu (tr→TR, en→US, de→DE, es→ES, ru→RU) + pasaporta özel sayfalar
    const renderCountry = (code: string, pass: string, passPage: boolean) => {
      const relPath = passPage ? buildPassportPath(lang as never, code, pass) : buildLocalizedPath(lang as never, 'explore', code);
      const ppList = PASSPORT_PAGES[lang as 'en'].filter((p) => p !== code && p !== pass);
      const ppNav = ppList.length || passPage
        ? `<h2>${esc(PP_TITLE[lang])}</h2><p>${passPage ? `<a href="${buildLocalizedPath(lang as never, 'explore', code)}">${esc(getCountryName(code, lang))}: ${esc(getCountryName(LANG_PASS[lang as 'en'], lang))}</a> · ` : ''}${ppList.map((p) => `<a href="${buildPassportPath(lang as never, code, p)}">${esc(getCountryName(p, lang))}</a>`).join(' · ')}</p>`
        : '';
      const meta = getCountrySeoMeta(code, lang as never, pass);
      const name = getCountryName(code, lang);
      const reg = countryToRegion[code] || '';
      const region = getRegionName(reg, lang);
      const cap = (GEO_DATA as Record<string, { capital?: string }>)[code]?.capital;
      const near = allCodes.filter((c) => c !== code && reg && countryToRegion[c] === reg).slice(0, 12);
      const ld = generateCountryJsonLd({ countryCode: code, language: lang as never, currentPassport: pass });
      // görünür SSS: yapılandırılmış verideki soru-cevaplar sayfada da yazılı olsun (Google kuralı;
      // JavaScript çalıştırmayan yapay zekâ tarayıcıları da bu metni okur)
      const faqNode = ((ld as { '@graph'?: Array<Record<string, unknown>> })['@graph'] || [ld as Record<string, unknown>]).find((x) => x['@type'] === 'FAQPage') as
        | { mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }> }
        | undefined;
      const faqHtml = faqNode?.mainEntity?.length
        ? `<section class="vzs-faq"><h2>${esc(FAQ_TITLE[lang] || FAQ_TITLE.en)}</h2>${faqNode.mainEntity.map((q) => `<h3>${esc(q.name)}</h3><p>${esc(q.acceptedAnswer.text)}</p>`).join('')}</section>`
        : '';
      write(path.join(relPath, 'index.html'), build({
        lang,
        canonical: BASE_URL + relPath,
        alts: passPage ? [{ hreflang: lang, href: BASE_URL + relPath }] : getHreflangAlternatesForRoute('explore', code),
        title: meta.title,
        desc: meta.description,
        ogImage: BASE_URL + getOptimizedImageUrl(getCountryVisual(code, lang).image, { width: 720 }),
        ogAlt: [name, getCountryVisual(code, lang).landmark].filter(Boolean).join(': '),
        head: `<script type="application/ld+json" id="vizamigo-jsonld-schema" data-code="${code}" data-lang="${lang}" data-pass="${pass}">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n    ${PRE.country}\n    <link rel="preload" as="image" fetchpriority="high" imagesrcset="${getOptimizedImageUrl(getCountryVisual(code, lang).image, { width: 480 })} 480w, ${getOptimizedImageUrl(getCountryVisual(code, lang).image, { width: 720 })} 720w" imagesizes="100vw" />`,
        // uygulamanın ülke başlığıyla aynı ölçüde fotoğraflı başlık: ilk boyama erken, kayma yok
        hero: (() => {
          const v = getCountryVisual(code, lang);
          const s480 = getOptimizedImageUrl(v.image, { width: 480 });
          const s720 = getOptimizedImageUrl(v.image, { width: 720 });
          return `<section class="vzs-chero"><img src="${s720}" srcset="${s480} 480w, ${s720} 720w" sizes="100vw" alt="${esc([name, v.landmark].filter(Boolean).join(': '))}" fetchpriority="high" /><div class="vzs-wrap vzs-chero-in">${eyebrow(lang, [EYEBROW[lang], region])}${h1(name, meta.h1.replace(name, '').trim())}${cap ? `<p>${esc(cap)}</p>` : ''}</div></section>`;
        })(),
        nav: navBlock(lang, `${lead(meta.description)}${faqHtml}${ppNav}<p>${homeLink(lang)} · ${tabLinks(lang)}</p>${near.length ? `<h2>${esc(UI[lang].region)}</h2><p>${countryLinks(lang, near)}</p>` : ''}`)
      }));
      n++;
    };
    for (const code of allCodes) {
      renderCountry(code, LANG_PASS[lang as 'en'], false);
      for (const p of PASSPORT_PAGES[lang as 'en']) if (p !== code) renderCountry(code, p, true);
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
    for (const id of guideIdsFor(lang)) {
      const g = getGuide(id, lang);
      const gl = GUIDE_META[id].langs || LANGS;
      const meta = GUIDE_META[id];
      const url = `${BASE_URL}/${lang}/info/${id}`;
      const ld = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Article', headline: g.title, description: g.metaDesc, inLanguage: lang, datePublished: '2026-10-29', dateModified: meta.checked, mainEntityOfPage: url, author: { '@type': 'Organization', name: 'Vizamigo', url: BASE_URL }, publisher: { '@type': 'Organization', name: 'Vizamigo', url: BASE_URL } },
          { '@type': 'FAQPage', mainEntity: g.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
        ]
      };
      const secs = g.sections.map((x) => `<h2>${esc(x.h)}</h2>${(x.p || []).map((t) => `<p>${esc(t)}</p>`).join('')}${x.list ? `<ul>${x.list.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}${x.table ? `<table><thead><tr>${x.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${x.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : ''}`).join('');
      const c = g.checklist;
      const ul = (xs: string[]) => `<ul>${xs.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
      const check = c ? `<h2>${esc(c.title)}</h2><h3>${esc(c.commonTitle)}</h3>${ul(c.common)}${[...c.statuses, ...c.purposes].map((x) => `<h3>${esc(x.label)}</h3>${ul(x.docs)}`).join('')}<p>${esc(c.note)}</p>` : '';
      const faq = `<section class="vzs-faq"><h2>${esc(FAQ_TITLE[lang] || FAQ_TITLE.en)}</h2>${g.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>`;
      const src = `<p>${meta.sources.map((x) => `<a href="${esc(x.url)}" rel="noopener">${esc(sourceLabel(x.label, lang))}</a>`).join(' · ')} · ${esc(meta.checked)}</p>`;
      const GL: Record<string, string[]> = { tr: ['Kimlikle gidilebilen ülkeler', 'Vizesiz ülkeler', 'Kapıda vize', 'E-vize', 'Elektronik izin (ETA)'], en: ['ID card accepted', 'Visa-free countries', 'Visa on arrival', 'eVisa', 'Travel authorisation (ETA)'], de: ['Mit Personalausweis', 'Visumfreie Länder', 'Visum bei Ankunft', 'eVisum', 'Reisegenehmigung (ETA)'], es: ['Con DNI', 'Países sin visado', 'Visado a la llegada', 'eVisa', 'Autorización (ETA)'], ru: ['По ID-карте', 'Без визы', 'Виза по прилёте', 'Электронная виза', 'Разрешение ETA'] };
      const DAY: Record<string, string> = { tr: 'gün', en: 'days', de: 'Tage', es: 'días', ru: 'дн.' };
      const gr = guideGroups(id, lang);
      const list = gr ? (['id', 'free', 'voa', 'evisa', 'eta'] as const).filter((k) => GUIDE_META[id].list!.groups.includes(k) && gr[k].length).map((k) => `<h2>${esc((GL[lang] || GL.en)[['id', 'free', 'voa', 'evisa', 'eta'].indexOf(k)])} (${gr[k].length})</h2><ul>${gr[k].map(([c, v]) => `<li><a href="${buildLocalizedPath(lang as never, 'explore', c)}">${esc(getCountryName(c, lang))}</a>${/^\d+$/.test(v) ? ` · ${v} ${DAY[lang] || DAY.en}` : ''}</li>`).join('')}</ul>`).join('') : '';
      const others = guideIdsFor(lang).filter((o) => o !== id).map((o) => `<a href="/${lang}/info/${o}">${esc(getGuide(o, lang).short)}</a>`).join(' · ');
      write(path.join(lang, 'info', id, 'index.html'), build({
        lang,
        canonical: url,
        alts: [...gl.map((c) => ({ hreflang: c, href: `${BASE_URL}/${c}/info/${id}` })), { hreflang: 'x-default', href: `${BASE_URL}/${gl.includes('en') ? 'en' : gl[0]}/info/${id}` }],
        title: `${g.title} | Vizamigo`,
        desc: g.metaDesc,
        head: `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n    ${PRE.info}`,
        body: eyebrow(lang, ['Vizamigo']) + h1(g.title) + lead(g.answer),
        nav: navBlock(lang, `${check}${list}${secs}${faq}${src}<p>${others}</p><p>${homeLink(lang)} · ${tabLinks(lang)}</p>`)
      }));
      n++;
    }

    // turlar sayfası (sosyal medyada paylaşılacak): /tr/turlar, /en/tours …
    {
      const { TOURS, TOURS_SLUG, toursPath, PACKAGES, routeName } = await import('../src/data/tours');
      const ix = ({ tr: 0, en: 1, de: 2, es: 3, ru: 4 } as Record<string, number>)[lang] ?? 1;
      const T = ({ tr: ['Paket turlar ve aktiviteler: Tayland, Balkanlar, Mısır, İtalya, Türkiye', 'Tayland, İstanbul, Kapadokya, Mısır, İtalya, Balkanlar, Dubai ve daha fazlasında tur, müze bileti ve günübirlik geziler. Ücretsiz iptalli turları karşılaştır.'], en: ['Multi-day tours & activities: Thailand, the Balkans, Egypt, Italy, Türkiye', 'Tours, museum tickets and day trips in Thailand, Istanbul, Cappadocia, Egypt, Italy, the Balkans, Dubai and more. Compare tours with free cancellation.'], de: ['Touren & Aktivitäten: Thailand, Istanbul, Ägypten, Italien, Balkan', 'Touren, Museumstickets und Tagesausflüge in Thailand, Istanbul, Kappadokien, Ägypten, Italien, auf dem Balkan, in Dubai und mehr.'], es: ['Tours y actividades: Tailandia, Estambul, Egipto, Italia, los Balcanes', 'Tours, entradas y excursiones en Tailandia, Estambul, Capadocia, Egipto, Italia, los Balcanes, Dubái y más.'], ru: ['Экскурсии и туры: Таиланд, Стамбул, Египет, Италия, Балканы', 'Экскурсии, билеты в музеи и однодневные поездки: Таиланд, Стамбул, Каппадокия, Египет, Италия, Балканы, Дубай и другие.'] } as Record<string, [string, string]>)[lang];
      const list = PACKAGES.map((p) => `<section id="${p.id}"><h2>${esc(p.name[ix])} (${p.days})</h2><p>${esc(routeName(p.route, lang))}</p></section>`).join('') + TOURS.map((t) => `<section id="${t.id}"><h2>${esc(t.name[ix])}</h2><p>${esc(t.pitch[ix])}</p></section>`).join('');
      write(path.join(lang, TOURS_SLUG[lang] || 'tours', 'index.html'), build({
        lang,
        canonical: `${BASE_URL}${toursPath(lang)}`,
        alts: [...LANGS.map((c) => ({ hreflang: c, href: `${BASE_URL}${toursPath(c)}` })), { hreflang: 'x-default', href: `${BASE_URL}${toursPath('en')}` }],
        title: `${T[0]} | Vizamigo`,
        desc: T[1],
        head: PRE.info,
        body: eyebrow(lang, ['Vizamigo']) + h1(T[0]) + lead(T[1]),
        nav: navBlock(lang, `${list}<p>${homeLink(lang)} · ${tabLinks(lang)}</p>`)
      }));
      n++;
    }

    // bilgi sayfaları
    for (const [id, names] of Object.entries(INFO)) {
      const t = names[Math.max(0, ['tr', 'en', 'de', 'es', 'ru'].indexOf(lang))];
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
    const dicts = DICTS;
    const FIX_DIR = path.join(process.cwd(), 'src', 'data', 'country-fixes');
    const COUNTRY_FIXES: Record<string, Record<string, unknown>> = {};
    Object.assign(COUNTRY_FIXES, (globalThis as { __vzCountryFixes?: Record<string, Record<string, unknown>> }).__vzCountryFixes || {});
    const deepMerge = <T,>(a: T, b: unknown): T => {
      if (!b || typeof b !== 'object' || Array.isArray(b) || !a || typeof a !== 'object' || Array.isArray(a)) return (b === undefined ? a : b) as T;
      const o: Record<string, unknown> = { ...(a as Record<string, unknown>) };
      for (const [k, v] of Object.entries(b as Record<string, unknown>)) o[k] = deepMerge(o[k], v);
      return o as T;
    };
    const plugs: Record<string, string[]> = {};
    let files = 0;
    for (const code of allCodes) {
      const intel0 = getCountryTravelIntelligence(code, getCountryName(code, 'en'));
      const trIntelFix = (COUNTRY_FIXES[code]?.tr as { intel?: unknown } | undefined)?.intel;
      const intel = trIntelFix ? deepMerge(intel0, trIntelFix) : intel0;
      plugs[code] = intel.plugs.types;
      const insEn = getCountryInsights(code, 'en');
      write(path.join('data', 'country', 'x', `${code}.json`), JSON.stringify({ intel, verified: getVerifiedCountryRecord(code), apps: getCountryNomadApps(code, insEn.transport.popularRideApps || []) }));
      files++;
      for (const lang of LANGS) {
        const local = { insights: getCountryInsights(code, lang), enc: getCountryEncyclopedia(code, lang as never), itin: getCountryItinerary(code, lang as never) };
        const dict = dicts[lang];
        // Türkçe dışı dillerde, Türkçe kalmış metinleri sözlükten çevir (dilden bağımsız intel dahil)
        let out = dict && Object.keys(dict).length ? { ...applyDict(local, dict), intel: applyDict(intel, dict) } : local;
        if (lang !== 'tr' && SUBST[lang]) {
          out = mapStrings(out, SUBST[lang]);
          const geo = (out as { enc?: { geography?: { capital?: string } } }).enc?.geography;
          if (geo && GEO_DATA[code]) geo.capital = capitalName(code, lang, GEO_DATA[code].capital);
        }
        // Elle doğrulanmış ülke düzeltmeleri (src/data/country-fixes/<KOD>.json): şablondan gelen alanların yerine geçer
        const fix = COUNTRY_FIXES[code]?.[lang] as { intel?: unknown } | undefined;
        if (fix) {
          // intel düzeltmesi varsa tam intel'in üzerine uygulanır (Türkçe dosyada intel ayrıca x/ dosyasından gelir)
          if (fix.intel && !(out as { intel?: unknown }).intel) out = { ...out, intel };
          out = deepMerge(out, fix);
        }
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
