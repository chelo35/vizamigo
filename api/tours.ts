export const config = { runtime: 'edge' };

/**
 * Canlı paket turlar (TourRadar). Fiyat, indirim, en yakın/en ucuz çıkış tarihi ve kalan yer.
 * GET /api/tours?q=Thailand&c=TH&min=7&max=14&cur=EUR&n=3&cmp=pkg_thailand-10
 *   q   = arama metni (İngilizce), c = ziyaret edilen ülkeler (ISO, virgülle), min/max = gün
 * Kaynak: TourRadar'ın ortaklık widget'ının kullandığı herkese açık uç nokta.
 * Bağlantılar widget ile aynı ortaklık izini taşır (utm_source=partner-vizamigo).
 */
const MCP = 'https://ai.tourradar.com/mcp/main';
const PARTNER = 'vizamigo';
const CURS = new Set(['EUR', 'USD', 'GBP', 'AUD', 'NZD', 'CAD']);
const ISO = /^[A-Z]{2}$/;

type RawTour = {
  tour_id?: number;
  tour_name?: string;
  tour_length_days?: number;
  operator?: { name?: string };
  image?: { url?: string }[];
  tour_url?: string;
  reviews_count?: number;
  start_city?: { city_name?: string };
  ratings?: { overall?: number };
  prices?: { currency?: string; price?: number; discount_percentage?: number; discount_amount?: number };
};
type RawDep = {
  date?: string;
  availability?: number;
  prices?: { currency?: string; price_base?: number; price_total?: number };
};

let rpc = 0;
async function call<T>(name: string, args: Record<string, unknown>): Promise<T | null> {
  const r = await fetch(MCP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id: ++rpc, method: 'tools/call', params: { name, arguments: args } })
  });
  if (!r.ok) return null;
  const text = (await r.text()).trim();
  let msg: { result?: { structuredContent?: unknown; content?: { type?: string; text?: string }[] } } | null = null;
  if (text.startsWith('{')) msg = JSON.parse(text);
  else for (const line of text.split('\n')) if (line.startsWith('data:')) msg = JSON.parse(line.slice(5));
  const res = msg?.result;
  if (!res) return null;
  if (res.structuredContent) return res.structuredContent as T;
  const t = res.content?.find((c) => c.type === 'text')?.text;
  return t ? (JSON.parse(t) as T) : null;
}

const tag = (u: string, cmp: string, id?: number) => {
  try {
    const url = new URL(u);
    url.searchParams.set('utm_source', `partner-${PARTNER}`);
    url.searchParams.set('utm_medium', 'affiliate_widget');
    url.searchParams.set('utm_campaign', cmp);
    if (id) url.searchParams.set('utm_content', String(id));
    return url.toString();
  } catch {
    return u;
  }
};

const ymd = (d: Date) => d.toISOString().slice(0, 10);

export default async function handler(req: Request) {
  const u = new URL(req.url);
  const q = (u.searchParams.get('q') || '').slice(0, 80).trim();
  const countries = (u.searchParams.get('c') || '').toUpperCase().split(',').filter((x) => ISO.test(x)).slice(0, 8);
  const min = Math.max(1, Math.min(60, parseInt(u.searchParams.get('min') || '1', 10) || 1));
  const max = Math.max(min, Math.min(90, parseInt(u.searchParams.get('max') || '60', 10) || 60));
  const cur = (u.searchParams.get('cur') || 'EUR').toUpperCase();
  const n = Math.max(1, Math.min(6, parseInt(u.searchParams.get('n') || '3', 10) || 3));
  const cmp = (u.searchParams.get('cmp') || 'tours').replace(/[^a-z0-9_-]/gi, '').slice(0, 40) || 'tours';
  const deals = u.searchParams.get('deals') === '1';
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
    'X-Content-Type-Options': 'nosniff'
  });
  const send = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
  if (!q || !CURS.has(cur)) return send({ currency: cur, tours: [] }, 400);

  try {
    const args: Record<string, unknown> = { textSearch: q, display_mode: 'listing', currency: cur, duration: { min, max } };
    if (countries.length) args.countries = { values: countries, operator: 'OR' };
    if (deals) args.discount = { min: 1, max: 100 };
    const found = await call<{ tours?: RawTour[] }>('vertex-tour-search', args);
    // İyi puanlı ve yorumu olan turlar önce; aynı puanda indirimli/ucuz olan
    const names = new Set<string>();
    const list = (found?.tours || [])
      .filter((t) => t.tour_id && t.tour_name && t.prices?.price)
      .filter((t) => {
        const k = t.tour_name!.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
        if (names.has(k)) return false;
        names.add(k);
        return true;
      })
      .sort((a, b) => {
        const sa = (a.ratings?.overall || 0) * Math.min(1, (a.reviews_count || 0) / 10) + (a.prices?.discount_percentage || 0) / 100;
        const sb = (b.ratings?.overall || 0) * Math.min(1, (b.reviews_count || 0) / 10) + (b.prices?.discount_percentage || 0) / 100;
        return sb - sa;
      })
      .slice(0, n);

    const today = new Date();
    const start = ymd(new Date(today.getTime() + 3 * 86400000));
    const end = ymd(new Date(today.getTime() + 150 * 86400000));
    const tours = await Promise.all(
      list.map(async (t) => {
        let dep: { date: string; price: number; orig: number | null; seats: number | null } | null = null;
        try {
          const d = await call<{ items?: RawDep[] }>('b2b-tour-departures', { tourId: t.tour_id, dateRange: { start, end }, currency: cur });
          const items = (d?.items || []).filter((x) => x.date && x.prices?.price_total && (x.availability ?? 1) > 0);
          // Yakın tarihlerden (ilk 10 çıkış) en ucuzu; eşitse en yakını
          items.sort((a, b) => a.date!.localeCompare(b.date!));
          const best = items.slice(0, 10).sort((a, b) => a.prices!.price_total! - b.prices!.price_total! || a.date!.localeCompare(b.date!))[0];
          if (best) {
            const base = best.prices!.price_base || 0;
            const total = best.prices!.price_total!;
            dep = { date: best.date!, price: Math.round(total), orig: base > total ? Math.round(base) : null, seats: typeof best.availability === 'number' ? best.availability : null };
          }
        } catch {}
        const p = t.prices!;
        const price = Math.round(p.price!);
        const orig = p.discount_amount ? Math.round(p.price! + p.discount_amount) : null;
        const img = t.image?.[0]?.url || '';
        return {
          id: t.tour_id!,
          name: t.tour_name!,
          days: t.tour_length_days || null,
          op: t.operator?.name || '',
          img: img.replace('/1500x800/', '/360x210/'),
          img2: img.replace('/1500x800/', '/750x400/'),
          rating: t.ratings?.overall ?? null,
          reviews: t.reviews_count ?? null,
          from: t.start_city?.city_name || '',
          price,
          orig,
          disc: p.discount_percentage || 0,
          url: tag(t.tour_url || `https://www.tourradar.com/t/${t.tour_id}`, cmp, t.tour_id),
          dep
        };
      })
    );
    return send({ currency: cur, tours });
  } catch {
    return send({ currency: cur, tours: [] });
  }
}
