export const config = { runtime: 'edge' };

/**
 * Çok şehirli rota: her ayak için o tarihe en yakın (±3 gün) en ucuz tek yön bilet.
 * GET /api/multi-city?legs=IST-FCO-2026-12-01,FCO-CDG-2026-12-05,CDG-IST-2026-12-09&cur=try
 * Kaynak: Travelpayouts Data API (Aviasales önbelleği). Anahtar yalnızca sunucuda.
 */
const CURS = new Set(['eur', 'usd', 'try', 'gbp', 'rub']);
const LEG = /^([A-Z]{3})-([A-Z]{3})-(\d{4}-\d{2}-\d{2})$/;
type Item = { price?: number; departure_at?: string; transfers?: number; airline?: string; link?: string };
const days = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

export default async function handler(req: Request) {
  const u = new URL(req.url);
  const cur = (u.searchParams.get('cur') || 'eur').toLowerCase();
  const legs = (u.searchParams.get('legs') || '').split(',').map((x) => x.trim().toUpperCase().replace(/(\d{4})-(\d{2})-(\d{2})$/, '$1-$2-$3')).filter(Boolean).slice(0, 6);
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=10800, stale-while-revalidate=43200',
    'X-Content-Type-Options': 'nosniff'
  });
  const send = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
  const parsed = legs.map((l) => LEG.exec(l));
  if (!CURS.has(cur) || !legs.length || parsed.some((m) => !m || m[1] === m[2])) return send({ currency: cur.toUpperCase(), legs: [] }, 400);
  const token = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.TRAVELPAYOUTS_TOKEN;
  if (!token) return send({ currency: cur.toUpperCase(), legs: parsed.map(() => null) });

  const one = async (from: string, to: string, date: string) => {
    try {
      const months = new Set([date.slice(0, 7)]);
      const lo = new Date(`${date}T12:00:00Z`);
      lo.setUTCDate(lo.getUTCDate() - 3);
      const hi = new Date(`${date}T12:00:00Z`);
      hi.setUTCDate(hi.getUTCDate() + 3);
      months.add(lo.toISOString().slice(0, 7));
      months.add(hi.toISOString().slice(0, 7));
      const lists = await Promise.all(
        [...months].map(async (m) => {
          const q = new URLSearchParams({ origin: from, destination: to, currency: cur, departure_at: m, one_way: 'true', sorting: 'price', direct: 'false', limit: '1000', page: '1' });
          const r = await fetch(`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${q}`, { headers: { 'X-Access-Token': token, 'Accept-Encoding': 'gzip' } });
          if (!r.ok) return [] as Item[];
          const j = (await r.json()) as { success?: boolean; data?: Item[] };
          return j.success && Array.isArray(j.data) ? j.data : [];
        })
      );
      const cands = lists
        .flat()
        .filter((x) => x.price && x.departure_at && Math.abs(days(date, x.departure_at.slice(0, 10))) <= 3)
        .map((x) => ({ price: Math.round(x.price!), dep: x.departure_at!.slice(0, 10), transfers: x.transfers ?? null, airline: x.airline || null, link: x.link ? `https://www.aviasales.com${x.link}` : null }));
      if (!cands.length) return null;
      const exact = cands.filter((c) => c.dep === date).sort((a, b) => a.price - b.price)[0] || null;
      const best = cands.sort((a, b) => a.price - b.price)[0];
      return { exact, best };
    } catch {
      return null;
    }
  };

  const res = await Promise.all(parsed.map((m) => one(m![1], m![2], m![3])));
  return send({ currency: cur.toUpperCase(), legs: res });
}
