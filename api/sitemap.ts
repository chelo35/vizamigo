import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export interface VercelServerlessRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
  body?: any;
}

export interface VercelServerlessResponse extends ServerResponse {
  status: (code: number) => VercelServerlessResponse;
  send: (body: any) => void;
  json: (body: any) => void;
}

/**
 * Dynamic Multilingual Edge / Serverless Sitemap Handler
 * Serves clean 200 OK with `Content-Type: text/xml` and aggressive edge-caching headers
 * to guarantee 100% compliance with Google Search Console validation bots.
 */
export default async function handler(req: VercelServerlessRequest, res: VercelServerlessResponse) {
  try {
    // 1. Set pristine XML & edge-caching headers
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // 2. Locate compiled sitemap from public directory
    const candidates = [
      path.join(process.cwd(), 'public', 'sitemap.xml'),
      path.join(process.cwd(), 'dist', 'sitemap.xml'),
      path.join(__dirname, '..', 'public', 'sitemap.xml')
    ];

    for (const p of candidates) {
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf-8');
        return res.status ? res.status(200).send(content) : res.end(content);
      }
    }

    // Dynamic fallback if static file is absent
    const { generateSitemapXml } = await import('../scripts/generate-sitemap');
    const dynamicXml = generateSitemapXml();
    return res.status ? res.status(200).send(dynamicXml) : res.end(dynamicXml);
  } catch (error) {
    console.error('[Vizamigo Sitemap Edge Error]', error);
    res.setHeader('Content-Type', 'text/plain');
    if (res.status) {
      return res.status(500).send('Error serving sitemap');
    }
    res.statusCode = 500;
    return res.end('Error serving sitemap');
  }
}
