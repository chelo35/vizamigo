export const config = { runtime: 'edge' };

/**
 * En ucuz uçuş fiyatı (Travelpayouts Data API, Aviasales önbelleği).
 * GET /api/flight-price?from=IST&to=TYO&cur=eur
 * Anahtar yalnızca sunucuda: TRAVELPAYOUTS_TOKEN (Vercel ortam değişkeni).
 * Anahtar yoksa ya da sonuç yoksa { price: null } döner; arayüz sessizce gizlenir.
 * Sonuç 6 saat kenarda önbelleklenir, API'ye yük bindirmez.
 */
const CURS = new Set(['eur', 'usd', 'try', 'gbp', 'rub']);
const IATA = /^[A-Z]{3}$/;

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const from = (url.searchParams.get('from') || '').toUpperCase();
  const to = (url.searchParams.get('to') || '').toUpperCase();
  const cur = (url.searchParams.get('cur') || 'eur').toLowerCase();
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
    'X-Content-Type-Options': 'nosniff'
  });
  const empty = (status = 200) => new Response(JSON.stringify({ price: null }), { status, headers });

  const token = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.TRAVELPAYOUTS_TOKEN;
  if (!IATA.test(from) || !IATA.test(to) || from === to || !CURS.has(cur)) return empty(400);
  if (!token) return empty();

  try {
    const q = new URLSearchParams({ origin: from, destination: to, currency: cur, sorting: 'price', one_way: 'true', direct: 'false', limit: '1', page: '1' });
    const r = await fetch(`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${q}`, {
      headers: { 'X-Access-Token': token, 'Accept-Encoding': 'gzip' }
    });
    if (!r.ok) return empty();
    const j = (await r.json()) as { success?: boolean; data?: Array<{ price?: number; departure_at?: string; airline?: string; transfers?: number }> };
    const f = j.data?.[0];
    if (!j.success || !f?.price) return empty();
    return new Response(
      JSON.stringify({ price: Math.round(f.price), currency: cur.toUpperCase(), date: f.departure_at?.slice(0, 10) || null, transfers: f.transfers ?? null }),
      { status: 200, headers }
    );
  } catch {
    return empty();
  }
}
