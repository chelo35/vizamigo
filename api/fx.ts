export const config = {
  runtime: 'edge',
};

// Fallback rates if upstream fails (guarantees zero breakage for core traveler currencies)
const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  TRY: 35.8,
  GBP: 0.77,
  JPY: 152.4,
  CAD: 1.39,
  AUD: 1.51,
  CHF: 0.86,
  CNY: 7.12,
  AED: 3.67,
  THB: 33.7,
  BAM: 1.8,
  RSD: 107.5,
  GEL: 2.73,
  AZN: 1.7,
};

/**
 * Same-Origin Vercel Edge-Cached FX Rates Proxy
 * Zero cold-start latency, globally replicated at edge locations.
 * Serves with aggressive Vercel edge caching:
 * s-maxage=3600, stale-while-revalidate=86400
 */
export default async function handler(req: Request) {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    'X-Content-Type-Options': 'nosniff',
  });

  try {
    const upstreamRes = await fetch('https://open.er-api.com/v6/latest/USD', {
      headers: { 'User-Agent': 'Vizamigo-FxEdge/1.0' },
    });

    if (upstreamRes.ok) {
      const data = await upstreamRes.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers,
      });
    }
  } catch (err) {
    console.error('[FX Edge Proxy Error]', err);
  }

  // Graceful fallback response on upstream failure
  return new Response(
    JSON.stringify({
      result: 'fallback',
      rates: FALLBACK_RATES,
      time_last_update_utc: new Date().toUTCString(),
    }),
    { status: 200, headers }
  );
}
