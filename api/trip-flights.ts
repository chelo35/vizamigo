export const config = { runtime: 'edge' };

/**
 * Seyahat planlayıcı: gidiş-dönüş uçuş fiyatı + ±3 gün içindeki daha ucuz tarihler.
 * GET /api/trip-flights?from=IST&to=BKK&dep=2026-12-10&ret=2026-12-17&cur=try
 * Kaynak: Travelpayouts Data API (Aviasales'te son günlerde bulunan fiyatlar, önbellek).
 * Anahtar yalnızca sunucuda: TRAVELPAYOUTS_TOKEN. Sonuç 3 saat kenarda önbelleklenir.
 */
const CURS = new Set(['eur', 'usd', 'try', 'gbp', 'rub']);
const IATA = /^[A-Z]{3}$/;
const DAY = /^\d{4}-\d{2}-\d{2}$/;
type Item = { price?: number; departure_at?: string; return_at?: string; transfers?: number; return_transfers?: number; airline?: string; link?: string };
type Out = { price: number; dep: string; ret: string | null; transfers: number | null; airline: string | null; link: string | null };

const diff = (a: string, b: string) => Math.round((Date.parse(a) - Date.parse(b)) / 86400000);

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const from = (url.searchParams.get('from') || '').toUpperCase();
  const to = (url.searchParams.get('to') || '').toUpperCase();
  const dep = url.searchParams.get('dep') || '';
  const ret = url.searchParams.get('ret') || '';
  const cur = (url.searchParams.get('cur') || 'eur').toLowerCase();
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=10800, stale-while-revalidate=43200',
    'X-Content-Type-Options': 'nosniff'
  });
  const send = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
  const none = { currency: cur.toUpperCase(), exact: null, best: null, alts: [] };

  if (!IATA.test(from) || !IATA.test(to) || from === to || !DAY.test(dep) || (ret && !DAY.test(ret)) || !CURS.has(cur)) return send(none, 400);
  if (ret && diff(ret, dep) < 0) return send(none, 400);
  const token = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.TRAVELPAYOUTS_TOKEN;
  if (!token) return send(none);

  const ask = async (p: Record<string, string>): Promise<Item[]> => {
    const q = new URLSearchParams({ origin: from, destination: to, currency: cur, sorting: 'price', direct: 'false', page: '1', ...p });
    const r = await fetch(`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${q}`, { headers: { 'X-Access-Token': token, 'Accept-Encoding': 'gzip' } });
    if (!r.ok) return [];
    const j = (await r.json()) as { success?: boolean; data?: Item[] };
    return j.success && Array.isArray(j.data) ? j.data : [];
  };
  const shape = (x: Item): Out => ({
    price: Math.round(x.price || 0),
    dep: (x.departure_at || '').slice(0, 10),
    ret: x.return_at ? x.return_at.slice(0, 10) : null,
    transfers: x.transfers ?? null,
    airline: x.airline || null,
    link: x.link ? `https://www.aviasales.com${x.link}` : null
  });

  try {
    const oneWay = !ret;
    const months = Array.from(new Set([dep.slice(0, 7), ...(ret ? [ret.slice(0, 7)] : [])]));
    // Tam tarih + aynı ay(lar) içindeki tüm fiyatlar (±3 gün önerisi için)
    const [exactList, monthList] = await Promise.all([
      ask(oneWay ? { departure_at: dep, one_way: 'true', limit: '1' } : { departure_at: dep, return_at: ret, one_way: 'false', limit: '1' }),
      ask(oneWay ? { departure_at: months[0], one_way: 'true', limit: '1000' } : { departure_at: dep.slice(0, 7), return_at: ret.slice(0, 7), one_way: 'false', limit: '1000' })
    ]);
    const all = monthList.filter((x) => x.price && x.departure_at).map(shape);
    const exact = exactList[0]?.price ? shape(exactList[0]) : all.find((x) => x.dep === dep && (oneWay || x.ret === ret)) || null;
    const near = all
      .filter((x) => Math.abs(diff(x.dep, dep)) <= 3 && (oneWay || (x.ret && Math.abs(diff(x.ret, ret)) <= 3)))
      .sort((a, b) => a.price - b.price);
    // Her tarih çifti için en ucuzunu tut, tam tarihten ucuz olanları öner
    const seen = new Set<string>();
    const alts = near
      .filter((x) => {
        const k = `${x.dep}|${x.ret}`;
        if (seen.has(k) || (x.dep === dep && (oneWay || x.ret === ret))) return false;
        seen.add(k);
        return !exact || x.price < exact.price;
      })
      .slice(0, 3);
    return send({ currency: cur.toUpperCase(), exact, best: near[0] || null, alts });
  } catch {
    return send(none);
  }
}
