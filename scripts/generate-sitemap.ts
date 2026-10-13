/**
 * Programmatic Multilingual Sitemap.xml & Robots.txt Engine for Vizamigo
 * Automatically generates Google Search Console & Mobile-First Indexing compliant sitemap.xml
 * with xhtml:link hreflang cross-references across all active languages (TR, EN, DE, RU, ES) + x-default.
 * Dynamically adapts in real-time whenever a new language or country node is added to the database.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GEO_DATA } from '../src/data/geoData';
import { D } from '../src/data/passportData';
import { SUPPORTED_LANGUAGES } from '../src/i18n';
import { TabKey } from '../src/components/Navigation';
import {
  BASE_URL,
  buildAbsoluteLocalizedUrl,
  getHreflangAlternatesForRoute
} from '../src/utils/seoRouter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODAY = new Date().toISOString().split('T')[0];

export interface SitemapUrlEntry {
  loc: string;
  alternates: { hreflang: string; href: string }[];
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

/**
 * Dynamically discovers all unique ISO-3166-1 alpha-2 country codes across Vizamigo datasets.
 * Adding a country to GEO_DATA or D automatically registers it in the sitemap.
 */
export function getAllIndexedCountryCodes(): string[] {
  const codeSet = new Set<string>([
    ...Object.keys(GEO_DATA),
    ...Object.keys(D)
  ]);
  return Array.from(codeSet)
    .map(c => c.toUpperCase())
    .filter(c => /^[A-Z]{2}$/.test(c))
    .sort();
}

/**
 * Generates the complete X-Linked Multilingual Sitemap XML string.
 */
export function generateSitemapXml(): string {
  const entries: SitemapUrlEntry[] = [];
  const langCodes = SUPPORTED_LANGUAGES.map(l => l.code);
  const countryCodes = getAllIndexedCountryCodes();

  // 1. Root International Gateway & Localized Home Pages (/tr, /en, /de, /ru, /es)
  const homeAlternates = getHreflangAlternatesForRoute('explore', null);

  entries.push({
    loc: `${BASE_URL}`,
    alternates: homeAlternates,
    lastmod: TODAY,
    changefreq: 'daily',
    priority: '1.0'
  });

  langCodes.forEach(lang => {
    const loc = buildAbsoluteLocalizedUrl(lang, 'explore', null);
    entries.push({
      loc,
      alternates: homeAlternates,
      lastmod: TODAY,
      changefreq: 'daily',
      priority: '1.0'
    });
  });

  // 2. Core Travel & Visa Intelligence Tools (Schengen Calculator, Route Planner, Digital Nomad, Consular Desk, Profile)
  const toolTabs: { tab: TabKey; priority: string; changefreq: 'daily' | 'weekly' }[] = [
    { tab: 'track', priority: '0.90', changefreq: 'daily' },    // Schengen 90/180 Calculator
    { tab: 'plan', priority: '0.90', changefreq: 'daily' },     // Multi-Passport Synergy & Route Planner
    { tab: 'nomad', priority: '0.85', changefreq: 'daily' },    // Digital Nomad Visa & Tax Hub
    { tab: 'consular', priority: '0.80', changefreq: 'weekly' },// Consular Crisis Desk & Emergency Hotlines
    { tab: 'profile', priority: '0.70', changefreq: 'weekly' }  // Traveler Vault
  ];

  toolTabs.forEach(({ tab, priority, changefreq }) => {
    const tabAlternates = getHreflangAlternatesForRoute(tab, null);
    langCodes.forEach(lang => {
      const loc = buildAbsoluteLocalizedUrl(lang, tab, null);
      entries.push({
        loc,
        alternates: tabAlternates,
        lastmod: TODAY,
        changefreq,
        priority
      });
    });
  });

  // 3. All 199+ Country Dossiers & Visa Policy Pages across all 5 languages
  countryCodes.forEach(code => {
    const countryAlternates = getHreflangAlternatesForRoute('explore', code);
    langCodes.forEach(lang => {
      const loc = buildAbsoluteLocalizedUrl(lang, 'explore', code);
      entries.push({
        loc,
        alternates: countryAlternates,
        lastmod: TODAY,
        changefreq: 'daily',
        priority: '0.9'
      });
    });
  });

  // Format XML with strict xmlns and xmlns:xhtml namespaces
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  entries.forEach(entry => {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    entry.alternates.forEach(alt => {
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
 * Generates the Mobile-First Crawl-Budget Optimized robots.txt content.
 */
export function generateRobotsTxt(): string {
  const langAllowRules = SUPPORTED_LANGUAGES.map(l => `Allow: /${l.code}/`).join('\n');

  return `# ==============================================================================
# Vizamigo Mobile-First Indexing & Crawl Budget Optimization (robots.txt)
# Active Languages: ${SUPPORTED_LANGUAGES.map(l => l.code.toUpperCase()).join(', ')} + x-default
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

# Strictly Block Technical Backend Paths, Staging URLs, Mock Routes & Unfinished Scripts
Disallow: /api/
Disallow: /backend/
Disallow: /admin/
Disallow: /staging/
Disallow: /mock/
Disallow: /mock-data/
Disallow: /scripts/
Disallow: /unfinished/
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

# Dedicated Rules for Google Mobile & International Search Crawlers
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
  console.log(`[Vizamigo Sitemap Engine] Active Languages: ${SUPPORTED_LANGUAGES.map(l => l.code).join(', ')} + x-default`);
}

