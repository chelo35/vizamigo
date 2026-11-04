export const config = { runtime: 'edge' };

/**
 * Ucuz tarih takvimi: bir ayın her gidiş günü için bulunan en ucuz gidiş-dönüş fiyatı.
 * GET /api/fare-calendar?from=IST&to=BKK&month=2026-12&len=7&cur=try
 *   len = kalış (gece); ±1 gece tolerans. len=0 → tek yön.
 * Kaynak: Travelpayouts Data API (Aviasales önbelleği). Anahtar yalnızca sunucuda.
 */
const CURS = new Set(['eur', 'usd', 'try', 'gbp', 'rub']);
const IATA = /^[A-Z]{3}$/;
const MONTH = /^\d{4}-\d{2}$/;
type Item = { price?: number; departure_at?: string; return_at?: string; transfers?: number; link?: string };
const days = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

export default async function handler(req: Request) {
  const u = new URL(req.url);
  const from = (u.searchParams.get('from') || '').toUpperCase();
  const to = (u.searchParams.get('to') || '').toUpperCase();
  const month = u.searchParams.get('month') || '';
  const len = Math.max(0, Math.min(30, parseInt(u.searchParams.get('len') || '0', 10) || 0));
  const cur = (u.searchParams.get('cur') || 'eur').toLowerCase();
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
    'X-Content-Type-Options': 'nosniff'
  });
  const send = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
  const none = { currency: cur.toUpperCase(), month, days: {} as Record<string, unknown>, cheapest: null };
  if (!IATA.test(from) || !IATA.test(to) || from === to || !MONTH.test(month) || !CURS.has(cur)) return send(none, 400);
  const token = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.TRAVELPAYOUTS_TOKEN;
  if (!token) return send(none);

  try {
    const q = new URLSearchParams({ origin: from, destination: to, currency: cur, departure_at: month, one_way: len ? 'false' : 'true', sorting: 'price', direct: 'false', limit: '1000', page: '1' });
    const r = await fetch(`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${q}`, { headers: { 'X-Access-Token': token, 'Accept-Encoding': 'gzip' } });
    const j = r.ok ? ((await r.json()) as { success?: boolean; data?: Item[] }) : null;
    const list = j?.success && Array.isArray(j.data) ? j.data : [];
    const out: Record<string, { price: number; ret: string | null; transfers: number | null; link: string | null }> = {};
    for (const x of list) {
      if (!x.price || !x.departure_at) continue;
      const dep = x.departure_at.slice(0, 10);
      if (dep.slice(0, 7) !== month) continue;
      const ret = x.return_at ? x.return_at.slice(0, 10) : null;
      if (len && (!ret || Math.abs(days(dep, ret) - len) > 1)) continue;
      const price = Math.round(x.price);
      if (!out[dep] || price < out[dep].price) out[dep] = { price, ret, transfers: x.transfers ?? null, link: x.link ? `https://www.aviasales.com${x.link}` : null };
    }
    let cheapest: string | null = null;
    for (const d of Object.keys(out)) if (!cheapest || out[d].price < out[cheapest].price) cheapest = d;
    return send({ currency: cur.toUpperCase(), month, days: out, cheapest });
  } catch {
    return send(none);
  }
}
