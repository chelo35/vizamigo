export const config = { runtime: 'edge' };

/**
 * Kendi tur vitrinimiz için Viator ürünleri (Viator Partner API, ortaklık anahtarı).
 * GET /api/viator?q=Bangkok&country=Thailand&lang=tr&n=12
 * Anahtar yoksa {ok:false} döner; sayfa o zaman yedek vitrini gösterir.
 * Sonuçlar CDN'de 12 saat saklanır (hızlı açılış, Viator'a az istek).
 * productUrl Viator'un ortaklık izini (pid/mcid) taşır; satış bize yazılır.
 */
const BASE = 'https://api.viator.com/partner';
const LANGS: Record<string, string> = { de: 'de-DE', es: 'es-ES', en: 'en-US' };

type Dest = { destinationId: number; name: string; type?: string; parentDestinationId?: number };
let DESTS: { at: number; list: Dest[] } | null = null;
const DBG: Record<string, unknown> = {};

const json = (body: unknown, status = 200, cache = 's-maxage=43200, stale-while-revalidate=86400') =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': `public, max-age=600, ${cache}` } });

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

async function destinations(key: string): Promise<Dest[]> {
  if (DESTS && Date.now() - DESTS.at < 864e5) return DESTS.list;
  const r = await fetch(`${BASE}/destinations`, { headers: { 'exp-api-key': key, Accept: 'application/json;version=2.0', 'Accept-Language': 'en-US' } });
  DBG.destStatus = r.status;
  if (!r.ok) {
    DBG.destErr = (await r.text()).slice(0, 300);
    return DESTS?.list || [];
  }
  const j = (await r.json()) as { destinations?: Dest[] };
  DBG.destCount = (j.destinations || []).length;
  DESTS = { at: Date.now(), list: j.destinations || [] };
  return DESTS.list;
}

function findDest(list: Dest[], q: string, country: string): Dest | undefined {
  const byId = new Map(list.map((d) => [d.destinationId, d]));
  const inCountry = (d: Dest) => {
    let p: Dest | undefined = d;
    for (let i = 0; i < 6 && p; i++) {
      if (norm(p.name) === norm(country)) return true;
      p = p.parentDestinationId ? byId.get(p.parentDestinationId) : undefined;
    }
    return false;
  };
  const nq = norm(q);
  const cands = list.filter((d) => norm(d.name) === nq);
  return cands.find(inCountry) || cands[0] || (norm(country) === nq ? list.find((d) => norm(d.name) === nq) : undefined);
}

type P = {
  productCode?: string;
  title?: string;
  images?: { isCover?: boolean; variants?: { url?: string; width?: number; height?: number }[] }[];
  reviews?: { totalReviews?: number; combinedAverageRating?: number };
  duration?: { fixedDurationInMinutes?: number; variableDurationFromMinutes?: number; variableDurationToMinutes?: number };
  pricing?: { summary?: { fromPrice?: number }; currency?: string };
  productUrl?: string;
  flags?: string[];
};

function pickImg(p: P): string {
  const img = p.images?.find((i) => i.isCover) || p.images?.[0];
  const v = (img?.variants || []).filter((x) => x.url && (x.width || 0) >= 360).sort((a, b) => (a.width || 0) - (b.width || 0));
  return v[0]?.url || img?.variants?.[0]?.url || '';
}

export default async function handler(req: Request) {
  const key = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env?.VIATOR_API_KEY;
  if (!key) return json({ ok: false, reason: 'no_key' }, 200, 's-maxage=300');
  const u = new URL(req.url);
  const q = (u.searchParams.get('q') || '').slice(0, 80);
  const country = (u.searchParams.get('country') || '').slice(0, 60);
  const lang = LANGS[u.searchParams.get('lang') || ''] || 'en-US';
  const n = Math.min(24, Math.max(4, Number(u.searchParams.get('n')) || 12));
  // Tür süzgeci (tekne/gemi, bisiklet, müze-bilet): yerin ürünlerinden başlığa göre süzülür; alakasız yerler (başka ülke) gelmesin diye
  const kind = (u.searchParams.get('kind') || '') as '' | 'cruise' | 'bike' | 'tickets';
  const KIND_RE: Record<string, RegExp> = {
    cruise: /cruise|boat|sail|catamaran|yacht|ferry|snorkel|island[- ]hop|kayak|canoe|raft|jet ?boat|dolphin|whale|lagoon|river|bosphorus|gondola|canal|felucca|dhow|junk|speedboat|diving|scuba/i,
    bike: /\b(bike|bicycle|cycling|biking|e-?bike|ebike)\b/i,
    tickets: /ticket|admission|entry|entrance|museum|skip[- ]the[- ]line|\bpass\b|gallery|aquarium|\bzoo\b|theme park|palace|cathedral|castle|tower|observation|\bshow\b/i
  };
  const NOT_BIKE = /quad|atv|motorbike|motorcycle|dirt bike|scooter/i;
  const NOT_TOUR = /\btransfers?\b|airport|shuttle|private car|\btaxi\b|chauffeur|pick-?up service/i;
  const keep = (p: P) => !!p.title && !NOT_TOUR.test(p.title) && (!kind || (KIND_RE[kind]?.test(p.title) && !(kind === 'bike' && NOT_BIKE.test(p.title))));
  const KW: Record<string, string> = { cruise: 'boat cruise', bike: 'bike tour', tickets: 'tickets' };
  const take = kind ? 50 : n;
  if (!q) return json({ ok: false, reason: 'no_query' }, 400, 's-maxage=60');
  const headers = { 'exp-api-key': key, Accept: 'application/json;version=2.0', 'Accept-Language': lang, 'Content-Type': 'application/json' };
  try {
    let products: P[] = [];
    const dest = findDest(await destinations(key), q, country);
    if (dest) {
      const r = await fetch(`${BASE}/products/search`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ filtering: { destination: String(dest.destinationId) }, sorting: { sort: 'DEFAULT' }, pagination: { start: 1, count: take }, currency: 'EUR' })
      });
      DBG.searchStatus = r.status;
      if (r.ok) products = (((await r.json()) as { products?: P[] }).products || []).filter(keep);
      else DBG.searchErr = (await r.text()).slice(0, 300);
    }
    if (!products.length && !(kind && dest)) {
      const r = await fetch(`${BASE}/search/freetext`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ searchTerm: `${country && norm(country) !== norm(q) ? `${q} ${country}` : q}${kind ? ` ${KW[kind]}` : ''}`, searchTypes: [{ searchType: 'PRODUCTS', pagination: { start: 1, count: take } }], currency: 'EUR' })
      });
      DBG.freeStatus = r.status;
      if (r.ok) products = (((await r.json()) as { products?: { results?: P[] } }).products?.results || []).filter(keep);
      else DBG.freeErr = (await r.text()).slice(0, 300);
    }
    const items = products
      .filter((p) => p.title && p.productUrl)
      .slice(0, kind ? 24 : n)
      .map((p) => {
        const d = p.duration || {};
        const mins = d.fixedDurationInMinutes || d.variableDurationFromMinutes || 0;
        return {
          id: p.productCode,
          title: p.title,
          img: pickImg(p),
          rating: p.reviews?.combinedAverageRating ? Math.round(p.reviews.combinedAverageRating * 10) / 10 : null,
          reviews: p.reviews?.totalReviews || 0,
          mins,
          price: p.pricing?.summary?.fromPrice ?? null,
          cur: p.pricing?.currency || 'EUR',
          free: (p.flags || []).includes('FREE_CANCELLATION'),
          url: p.productUrl
        };
      });
    if (u.searchParams.get('debug') === '1') return json({ ok: true, dest: dest?.name || null, n: items.length, dbg: DBG }, 200, 's-maxage=0');
    // Boş sonuç uzun süre CDN'de kalmasın (ör. anahtar yeni etkinleşirken)
    if (!items.length) return json({ ok: true, dest: dest?.name || null, items }, 200, 's-maxage=300');
    return json({ ok: true, dest: dest?.name || null, items });
  } catch (e) {
    return json({ ok: false, reason: 'error', msg: String(e).slice(0, 200) }, 200, 's-maxage=120');
  }
}
