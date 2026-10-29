/**
 * Programmatic Multilingual Sitemap.xml & Robots.txt Engine for Vizamigo
 * 
 * Automatically compiles a 100% Google Search Console compliant, mobile-first indexable sitemap.xml.
 * Maps precise localized sub-directory routes (e.g. /tr/arnavutluk, /en/albania, /de/albanien)
 * and embeds bidirectional xhtml:link hreflang alternates (TR, EN, DE, RU, ES) + secure x-default fallback.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GEO_DATA } from '../src/data/geoData';
import { D } from '../src/data/passportData';
import { COUNTRY_VISUALS_MAP } from '../src/data/countryVisualsData';
import { GUIDE_IDS, GUIDE_META } from '../src/data/guides';
import { SUPPORTED_LANGUAGES } from '../src/i18n';
import { TabKey } from '../src/components/Navigation';
import {
  BASE_URL,
  buildAbsoluteLocalizedUrl,
  getHreflangAlternatesForRoute
} from '../src/utils/seoRouter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * lastmod gerçek değişiklik tarihini göstermeli; her yayında "bugün" yazmak Google'ın tarihleri
 * yok saymasına yol açar. İçerik değişince bu tarihleri elle ilerlet.
 * - SITE_UPDATED: ana sayfa, araçlar, bilgi sayfaları
 * - DATA_UPDATED: ülke verisi (vize kuralları, çeviriler) en son ne zaman değişti
 * Ülke sayfasının tarihi = max(DATA_UPDATED, o ülkenin fotoğraf/künye kontrol tarihi).
 */
const SITE_UPDATED = '2026-10-29';
const DATA_UPDATED = '2026-10-28';
const countryLastmod = (code: string): string => {
  const v = (COUNTRY_VISUALS_MAP[code] as { verifiedAt?: string } | undefined)?.verifiedAt || '';
  return /^\d{4}-\d{2}-\d{2}$/.test(v) && v > DATA_UPDATED ? v : DATA_UPDATED;
};

export interface SitemapUrlEntry {
  loc: string;
  alternates: { hreflang: string; href: string }[];
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

/**
 * Dynamically discovers all unique ISO-3166-1 alpha-2 country codes across Vizamigo datasets.
 */
export function getAllIndexedCountryCodes(): string[] {
  const codeSet = new Set<string>([
    ...Object.keys(GEO_DATA),
    ...Object.keys(D)
  ]);
  return Array.from(codeSet)
    .map((c) => c.toUpperCase())
    .filter((c) => /^[A-Z]{2}$/.test(c))
    .sort();
}

/**
 * Generates the complete X-Linked Multilingual Sitemap XML string conforming strictly
 * to Google Search Console and sitemaps.org 0.9 + xhtml namespace specifications.
 */
export function generateSitemapXml(): string {
  const entries: SitemapUrlEntry[] = [];
  const langCodes = SUPPORTED_LANGUAGES.map((l) => l.code);
  const countryCodes = getAllIndexedCountryCodes();

  // 1. Root International Gateway & Localized Home Pages (/tr, /en, /de, /ru, /es)
  const homeAlternates = getHreflangAlternatesForRoute('explore', null);

  entries.push({
    loc: `${BASE_URL}/`,
    alternates: homeAlternates,
    lastmod: SITE_UPDATED,
    changefreq: 'daily',
    priority: '1.0'
  });

  langCodes.forEach((lang) => {
    const loc = buildAbsoluteLocalizedUrl(lang, 'explore', null);
    entries.push({
      loc,
      alternates: homeAlternates,
      lastmod: SITE_UPDATED,
      changefreq: 'daily',
      priority: '1.0'
    });
  });

  // 2. Core Travel Intelligence & Mobility Tools
  const toolTabs: { tab: TabKey; priority: string; changefreq: 'daily' | 'weekly' }[] = [
    { tab: 'track', priority: '0.90', changefreq: 'daily' },    // Schengen 90/180 Calculator
    { tab: 'plan', priority: '0.90', changefreq: 'daily' },     // Route Planner & Synergy
    { tab: 'nomad', priority: '0.85', changefreq: 'daily' },    // Digital Nomad Visa Hub
    { tab: 'consular', priority: '0.80', changefreq: 'weekly' },// Consular Emergency Hotlines
    { tab: 'profile', priority: '0.70', changefreq: 'weekly' }  // Traveler Vault
  ];

  toolTabs.forEach(({ tab, priority, changefreq }) => {
    const tabAlternates = getHreflangAlternatesForRoute(tab, null);
    langCodes.forEach((lang) => {
      const loc = buildAbsoluteLocalizedUrl(lang, tab, null);
      entries.push({
        loc,
        alternates: tabAlternates,
        lastmod: SITE_UPDATED,
        changefreq,
        priority
      });
    });
  });

  // 3. Localized Country Dossiers & Visa Policy Nodes (/tr/arnavutluk, /en/albania, /de/albanien, etc.)
  countryCodes.forEach((code) => {
    const countryAlternates = getHreflangAlternatesForRoute('explore', code);
    langCodes.forEach((lang) => {
      const loc = buildAbsoluteLocalizedUrl(lang, 'explore', code);
      entries.push({
        loc,
        alternates: countryAlternates,
        lastmod: countryLastmod(code),
        changefreq: 'weekly',
        priority: '0.9'
      });
    });
  });

  // 3b. Güncel konu rehberleri (ETIAS, ETA, ESTA, Yunan adaları)
  GUIDE_IDS.forEach((id) => {
    const alts = [
      ...langCodes.map((lang) => ({ hreflang: lang, href: `${BASE_URL}/${lang}/info/${id}` })),
      { hreflang: 'x-default', href: `${BASE_URL}/en/info/${id}` }
    ];
    langCodes.forEach((lang) => {
      entries.push({ loc: `${BASE_URL}/${lang}/info/${id}`, alternates: alts as never, lastmod: GUIDE_META[id].checked, changefreq: 'weekly', priority: '0.8' });
    });
  });

  // 4. Bilgi merkezi sayfaları (/:lang/info/:page)
  const infoPages = ['terms', 'privacy', 'disclaimer', 'kvkk_gdpr', 'standards', 'attributions', 'appeals', 'passport_lost', 'crisis', 'transit', 'partners', 'airlines', 'insurance', 'community', 'api', 'mission', 'sustainability', 'careers', 'press'];
  infoPages.forEach((page) => {
    const alts = [
      ...langCodes.map((lang) => ({ hreflang: lang, href: `${BASE_URL}/${lang}/info/${page}` })),
      { hreflang: 'x-default', href: `${BASE_URL}/en/info/${page}` }
    ];
    langCodes.forEach((lang) => {
      entries.push({ loc: `${BASE_URL}/${lang}/info/${page}`, alternates: alts as never, lastmod: SITE_UPDATED, changefreq: 'monthly', priority: '0.3' });
    });
  });

  // Format valid, indented XML with strict namespaces
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  entries.forEach((entry) => {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    entry.alternates.forEach((alt) => {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />\n`;
    });
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  return xml;
}

/**
 * Generates Mobile-First Crawl-Budget Optimized robots.txt content.
 */
export function generateRobotsTxt(): string {
  const langAllowRules = SUPPORTED_LANGUAGES.map((l) => `Allow: /${l.code}/`).join('\n');

  return `# ==============================================================================
# Vizamigo Mobile-First Indexing & Crawl Budget Optimization (robots.txt)
# Active Languages: ${SUPPORTED_LANGUAGES.map((l) => l.code.toUpperCase()).join(', ')} + x-default
# ==============================================================================

User-agent: *

# Explicitly Allow Core Public Travel Content & Mobile Rendering Assets
Allow: /
${langAllowRules}
Allow: /*.css$
Allow: /*.js$
Allow: /*.webp$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.svg$
Allow: /*.ico$
Allow: /*.woff2$
Allow: /manifest.json

# Strictly Block Technical Backend Paths, Staging URLs & Unfinished Scripts
Disallow: /api/
Disallow: /backend/
Disallow: /admin/
Disallow: /staging/
Disallow: /mock/
Disallow: /mock-data/
Disallow: /scripts/
Disallow: /internal/
Disallow: /dev/
Disallow: /test/
Disallow: /draft/
Disallow: /temp/
Disallow: /tmp/
Disallow: /cache/
Disallow: /debug/
Disallow: /_next/
Disallow: /private/
Disallow: /*?*query=
Disallow: /*?*filter=
Disallow: /*?*mock=
Disallow: /*?*preview=
Disallow: /*?*debug=
Disallow: /*?*utm_*
Disallow: /*?*fbclid=
Disallow: /*?*gclid=

# Dedicated Rules for Googlebot Mobile
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /staging/
Disallow: /mock/
Disallow: /scripts/

User-agent: Googlebot-Mobile
Allow: /
Disallow: /api/
Disallow: /staging/
Disallow: /mock/
Disallow: /scripts/

User-agent: Bingbot
Allow: /

User-agent: Yandex
Allow: /

# Dynamic Multilingual X-Linked Sitemap & Host Declarations
Sitemap: ${BASE_URL}/sitemap.xml
Host: ${BASE_URL}
`;
}

// Execute when run directly via CLI (`npm run sitemap:generate`)
const isMainModule = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMainModule) {
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const robotsPath = path.join(publicDir, 'robots.txt');

  const sitemapXml = generateSitemapXml();
  const robotsTxt = generateRobotsTxt();

  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');

  console.log(`[Vizamigo Sitemap Engine] Successfully generated sitemap.xml at ${sitemapPath}`);
  console.log(`[Vizamigo Sitemap Engine] Successfully generated robots.txt at ${robotsPath}`);
  console.log(`[Vizamigo Sitemap Engine] Total URL nodes in sitemap: ${sitemapXml.match(/<url>/g)?.length || 0}`);
  console.log(`[Vizamigo Sitemap Engine] Countries indexed: ${getAllIndexedCountryCodes().length}`);
  console.log(`[Vizamigo Sitemap Engine] Active Languages: ${SUPPORTED_LANGUAGES.map((l) => l.code).join(', ')} + x-default`);
}
