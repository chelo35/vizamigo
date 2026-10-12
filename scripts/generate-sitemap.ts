/**
 * Programmatic Multilingual Sitemap.xml Generator for Vizamigo
 * Automatically generates Google Search Console compliant sitemap.xml
 * with xhtml:link hreflang cross-references across all 5 languages (TR, EN, DE, ES, RU) + x-default.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GEO_DATA } from '../src/data/geoData';
import { SUPPORTED_LANGUAGES } from '../src/i18n';
import { TabKey } from '../src/components/Navigation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://vizamigo.com';
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapUrlEntry {
  loc: string;
  alternates: { lang: string; href: string }[];
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

function buildLocalizedUrl(lang: string, tab: TabKey = 'explore', countryCode: string | null = null): string {
  if (countryCode) {
    return `${BASE_URL}/${lang}/country/${countryCode.toUpperCase()}`;
  }
  if (tab !== 'explore') {
    return `${BASE_URL}/${lang}/${tab}`;
  }
  return `${BASE_URL}/${lang}`;
}

function generateAlternates(tab: TabKey = 'explore', countryCode: string | null = null): { lang: string; href: string }[] {
  const alternates: { lang: string; href: string }[] = [];

  SUPPORTED_LANGUAGES.forEach(l => {
    alternates.push({
      lang: l.code,
      href: buildLocalizedUrl(l.code, tab, countryCode)
    });
  });

  // x-default fallback points to English
  alternates.push({
    lang: 'x-default',
    href: buildLocalizedUrl('en', tab, countryCode)
  });

  return alternates;
}

export function generateSitemapXml(): string {
  const entries: SitemapUrlEntry[] = [];
  const langCodes = SUPPORTED_LANGUAGES.map(l => l.code);
  const countryCodes = Object.keys(GEO_DATA).sort();

  // 1. Root & Localized Home Pages
  langCodes.forEach(lang => {
    const loc = `${BASE_URL}/${lang}`;
    entries.push({
      loc,
      alternates: generateAlternates('explore', null),
      lastmod: TODAY,
      changefreq: 'daily',
      priority: '1.0'
    });
  });

  // Root fallback
  entries.push({
    loc: `${BASE_URL}/`,
    alternates: generateAlternates('explore', null),
    lastmod: TODAY,
    changefreq: 'daily',
    priority: '1.0'
  });

  // 2. Core Tool Tabs
  const toolTabs: { tab: TabKey; priority: string; changefreq: 'daily' | 'weekly' }[] = [
    { tab: 'plan', priority: '0.85', changefreq: 'daily' },
    { tab: 'track', priority: '0.85', changefreq: 'daily' },
    { tab: 'consular', priority: '0.75', changefreq: 'weekly' },
    { tab: 'profile', priority: '0.60', changefreq: 'weekly' }
  ];

  toolTabs.forEach(({ tab, priority, changefreq }) => {
    langCodes.forEach(lang => {
      const loc = buildLocalizedUrl(lang, tab, null);
      entries.push({
        loc,
        alternates: generateAlternates(tab, null),
        lastmod: TODAY,
        changefreq,
        priority
      });
    });
  });

  // 3. All 199 Countries (Dossiers & Cultural Guides)
  countryCodes.forEach(code => {
    langCodes.forEach(lang => {
      const loc = buildLocalizedUrl(lang, 'explore', code);
      entries.push({
        loc,
        alternates: generateAlternates('explore', code),
        lastmod: TODAY,
        changefreq: 'daily',
        priority: '0.90'
      });
    });
  });

  // Format XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  entries.forEach(entry => {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    entry.alternates.forEach(alt => {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />\n`;
    });
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  return xml;
}

// Write to public/sitemap.xml
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemapPath = path.join(publicDir, 'sitemap.xml');
const sitemapXml = generateSitemapXml();
fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');

console.log(`[Vizamigo Sitemap Engine] Successfully generated sitemap.xml at ${sitemapPath}`);
console.log(`[Vizamigo Sitemap Engine] Total URL nodes in sitemap: ${sitemapXml.match(/<url>/g)?.length || 0}`);
console.log(`[Vizamigo Sitemap Engine] Countries indexed: ${Object.keys(GEO_DATA).length}`);
console.log(`[Vizamigo Sitemap Engine] Active Languages: ${SUPPORTED_LANGUAGES.map(l => l.code).join(', ')} + x-default`);
