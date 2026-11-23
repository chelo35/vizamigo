export const config = { runtime: 'edge' };

/**
 * Fenomen paneli için tıklama kaydı (sendBeacon).
 *  k=visit : ?ref=kod bağlantısıyla siteye gelen ziyaret (captureRef)
 *  k=out   : kodlu ziyaretçinin bir ortak siteye (uçak, otel, eSIM …) gitmesi
 * Veriler Supabase ref_events tablosunda; tabloya yalnızca sunucu (service role) yazar/okur.
 */
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
const SB = env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const VALID = /^[a-z0-9][a-z0-9_-]{1,29}$/;
const BOT = /bot|crawl|spider|preview|facebookexternalhit|slurp|bing|yandex|headless|lighthouse/i;

export default async function handler(req: Request): Promise<Response> {
  const ok = new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  if (req.method !== 'POST' || !KEY) return ok;
  if (BOT.test(req.headers.get('user-agent') || '')) return ok;
  let d: { r?: string; k?: string; t?: string; p?: string; l?: string } = {};
  try {
    d = JSON.parse(await req.text());
  } catch {
    return ok;
  }
  const ref = String(d.r || '').toLowerCase();
  const kind = d.k === 'out' ? 'out' : d.k === 'visit' ? 'visit' : '';
  if (!VALID.test(ref) || !kind) return ok;
  const row = {
    ref,
    kind,
    target: String(d.t || '').slice(0, 80) || null,
    path: String(d.p || '').slice(0, 160) || null,
    lang: String(d.l || '').slice(0, 5) || null,
    country: (req.headers.get('x-vercel-ip-country') || '').slice(0, 2) || null
  };
  try {
    await fetch(`${SB}/rest/v1/ref_events`, {
      method: 'POST',
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(row)
    });
  } catch {}
  return ok;
}
