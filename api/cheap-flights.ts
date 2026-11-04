export const config = { runtime: 'edge' };

/**
 * Tarih aralığında en ucuz uçuşlar (hızlı "Ucuz uçak bileti" kutusu).
 * GET /api/cheap-flights?from=IST&to=BKK&start=2026-12-01&end=2026-12-31&len=7&cur=try
 *   len = 0 → tek yön; len > 0 → yaklaşık bu kadar günlük gidiş-dönüş (±2 gün)
 * Kaynak: Travelpayouts Data API (Aviasales önbelleği). Anahtar yalnızca sunucuda.
 */
const CURS = new Set(['eur', 'usd', 'try', 'gbp', 'rub']);
const IATA = /^[A-Z]{3}$/;
const DAY = /^\d{4}-\d{2}-\d{2}$/;
type Item = { price?: number; departure_at?: string; return_at?: string; transfers?: number; return_transfers?: number; airline?: string; link?: string };
const days = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const from = (url.searchParams.get('from') || '').toUpperCase();
  const to = (url.searchParams.get('to') || '').toUpperCase();
  const start = url.searchParams.get('start') || '';
  const end = url.searchParams.get('end') || '';
  const len = Math.max(0, Math.min(30, parseInt(url.searchParams.get('len') || '0', 10) || 0));
  const cur = (url.searchParams.get('cur') || 'eur').toLowerCase();
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=10800, stale-while-revalidate=43200',
    'X-Content-Type-Options': 'nosniff'
  });
  const send = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
  const none = { currency: cur.toUpperCase(), results: [] };
  if (!IATA.test(from) || !IATA.test(to) || from === to || !DAY.test(start) || !DAY.test(end) || !CURS.has(cur)) return send(none, 400);
  const span = days(start, end);
  if (span < 0 || span > 92) return send(none, 400);
  const token = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.TRAVELPAYOUTS_TOKEN;
  if (!token) return send(none);

  // Aralığın kapsadığı aylar (en fazla 4)
  const months: string[] = [];
  const d = new Date(`${start.slice(0, 7)}-01T00:00:00Z`);
  while (months.length < 4 && d.toISOString().slice(0, 7) <= end.slice(0, 7)) {
    months.push(d.toISOString().slice(0, 7));
    d.setUTCMonth(d.getUTCMonth() + 1);
  }

  try {
    const lists = await Promise.all(
      months.map(async (m) => {
        const q = new URLSearchParams({ origin: from, destination: to, currency: cur, departure_at: m, one_way: len ? 'false' : 'true', sorting: 'price', direct: 'false', limit: '1000', page: '1' });
        const r = await fetch(`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${q}`, { headers: { 'X-Access-Token': token, 'Accept-Encoding': 'gzip' } });
        if (!r.ok) return [] as Item[];
        const j = (await r.json()) as { success?: boolean; data?: Item[] };
        return j.success && Array.isArray(j.data) ? j.data : [];
      })
    );
    const seen = new Set<string>();
    const results = lists
      .flat()
      .filter((x) => x.price && x.departure_at)
      .map((x) => ({
        price: Math.round(x.price!),
        dep: x.departure_at!.slice(0, 10),
        ret: x.return_at ? x.return_at.slice(0, 10) : null,
        transfers: x.transfers ?? null,
        airline: x.airline || null,
        link: x.link ? `https://www.aviasales.com${x.link}` : null
      }))
      .filter((x) => x.dep >= start && x.dep <= end && (!len || (x.ret && Math.abs(days(x.dep, x.ret) - len) <= 2)))
      .sort((a, b) => a.price - b.price)
      .filter((x) => {
        const k = `${x.dep}|${x.ret}`;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, 5);
    return send({ currency: cur.toUpperCase(), results });
  } catch {
    return send(none);
  }
}
