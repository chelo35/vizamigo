import type { IncomingMessage, ServerResponse } from 'http';

export interface VercelServerlessRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
}

export interface VercelServerlessResponse extends ServerResponse {
  status: (code: number) => VercelServerlessResponse;
  send: (body: any) => void;
  json: (body: any) => void;
}

let cachedRates: any = null;
let cacheTime = 0;

/**
 * Same-Origin Edge-Cached FX Rates Proxy
 * Eliminates 924ms critical chain bottleneck on initial render.
 * Serves with aggressive Vercel edge caching (s-maxage=86400, stale-while-revalidate=43200).
 */
export default async function handler(req: VercelServerlessRequest, res: VercelServerlessResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200');

  const now = Date.now();
  if (cachedRates && now - cacheTime < 3600 * 1000) {
    return res.status ? res.status(200).json(cachedRates) : res.end(JSON.stringify(cachedRates));
  }

  try {
    const upstreamRes = await fetch('https://open.er-api.com/v6/latest/USD', {
      headers: { 'User-Agent': 'Vizamigo-FxProxy/1.0' }
    });

    if (upstreamRes.ok) {
      cachedRates = await upstreamRes.json();
      cacheTime = now;
      return res.status ? res.status(200).json(cachedRates) : res.end(JSON.stringify(cachedRates));
    }
  } catch (err) {
    console.error('[FX Proxy Error]', err);
  }

  if (cachedRates) {
    return res.status ? res.status(200).json(cachedRates) : res.end(JSON.stringify(cachedRates));
  }

  return res.status ? res.status(502).json({ error: 'Failed to fetch FX rates' }) : res.end(JSON.stringify({ error: 'Failed to fetch FX rates' }));
}
