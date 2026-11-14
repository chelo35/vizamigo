export const config = { runtime: 'edge' };

/**
 * Ortaklık yönlendirmesi (Travelpayouts Drive betiğinin yerine).
 * GET /api/tp?u=<hedef adres>&c=<kampanya/sub_id>
 * Travelpayouts Links API ile ortaklık bağlantısı üretir ve 302 ile yönlendirir.
 * Drive betiği sayfada sürekli tarama yapıp ana iş parçacığını yarım saniyeye kadar kilitliyordu
 * (hızlı kaydırmada sayfa boş görünüyordu); bağlantı artık yalnızca tıklanınca, sunucuda üretilir.
 * Üretilemezse ziyaretçi yine hedef siteye gider (bağlantı hiç kırılmaz).
 */
const TRS = 586306; // Travelpayouts proje (Vizamigo)
const MARKER = 788708; // Travelpayouts ortak numarası
const HOSTS = [
  'aviasales.com', 'kiwi.com', 'klook.com', 'yesim.app', 'kiwitaxi.com', 'localrent.com', 'welcomepickups.com', 'tiqets.com',
  'gigsky.com', 'airalo.com', 'gettransfer.com', 'drimsim.com', 'getrentacar.com', 'airhelp.com', 'gocity.com', 'economybookings.com',
  'bikesbooking.com', 'qeeq.com', 'wegotrip.com', 'autoeurope.eu', 'radicalstorage.com', 'intui.travel', 'compensair.com', 'saily.com', 'kkday.com'
];
const allowed = (h: string) => HOSTS.some((d) => h === d || h.endsWith(`.${d}`));

export default async function handler(req: Request): Promise<Response> {
  const q = new URL(req.url).searchParams;
  const raw = q.get('u') || '';
  const sub = (q.get('c') || 'vz').replace(/[^\w-]/g, '').slice(0, 40) || 'vz';
  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return Response.redirect('https://www.vizamigo.com/', 302);
  }
  if (target.protocol !== 'https:' || !allowed(target.hostname)) return Response.redirect('https://www.vizamigo.com/', 302);
  const go = (to: string, cache = 's-maxage=86400, stale-while-revalidate=604800') =>
    new Response(null, { status: 302, headers: { Location: to, 'Cache-Control': `public, max-age=0, ${cache}`, 'X-Robots-Tag': 'noindex' } });
  const token = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.TRAVELPAYOUTS_TOKEN;
  if (!token) return go(target.toString(), 's-maxage=60');
  try {
    const r = await fetch('https://api.travelpayouts.com/links/v1/create', {
      method: 'POST',
      headers: { 'X-Access-Token': token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ trs: TRS, marker: MARKER, shorten: false, links: [{ url: target.toString(), sub_id: sub }] })
    });
    const j = (await r.json().catch(() => null)) as { result?: { links?: { partner_url?: string; code?: string }[] } } | null;
    const p = j?.result?.links?.[0]?.partner_url;
    if (q.get('debug') === '1') return new Response(JSON.stringify({ status: r.status, j }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    if (p && /^https:\/\//.test(p)) return go(p);
    return go(target.toString(), 's-maxage=600');
  } catch {
    return go(target.toString(), 's-maxage=120');
  }
}
