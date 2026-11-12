export const config = { runtime: 'edge' };

/**
 * Şehirler arası tren / otobüs / feribot: 12Go ortaklık programının herkese açık şehir verisi.
 * GET /api/ground?city=Bangkok
 * Döner: { ok, list: [{ to, slug, from, usd, modes }] }  (slug/from: 12Go şehir adresleri)
 * CDN'de 12 saat saklanır. Fiyat "x'ten başlayan" en düşük fiyattır, kişi başı USD.
 */
const AGENT = '17478120';

export default async function handler(req: Request): Promise<Response> {
  const city = (new URL(req.url).searchParams.get('city') || '').trim().slice(0, 80);
  const out = (body: unknown, cache = 's-maxage=43200, stale-while-revalidate=86400') =>
    new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': `public, max-age=3600, ${cache}` } });
  if (!city) return out({ ok: false, list: [] }, 's-maxage=60');
  try {
    const r = await fetch(`https://agent.12go.asia/api/widget/1.0?city=${encodeURIComponent(city)}&agent=${AGENT}&lang=en&fxcode=USD&width=400&wl=12go.asia&sub_id=vz`, { headers: { Accept: 'application/json' } });
    if (!r.ok) return out({ ok: false, list: [] }, 's-maxage=300');
    const j = (await r.json()) as { destinations?: { from: string; price: string; transport?: string[]; href: string }[] };
    const list = [];
    for (const d of j.destinations || []) {
      const m = String(d.href || '').match(/\/travel\/([^/?]+)\/([^/?]+)/);
      const usd = parseFloat(String(d.price || '').replace(/[^\d.]/g, ''));
      if (m && usd > 0) list.push({ to: d.from, slug: m[1], from: m[2], usd, modes: (d.transport || []).slice(0, 6) });
    }
    return out({ ok: true, list }, list.length ? undefined : 's-maxage=3600');
  } catch {
    return out({ ok: false, list: [] }, 's-maxage=300');
  }
}
