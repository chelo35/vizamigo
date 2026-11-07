/**
 * Ülkeye özel paylaşım görseli (WhatsApp, Facebook, X, Telegram önizlemesi): fotoğraf + bayrak + vize durumu.
 * GET /api/og?c=TH&t=Tayland&b=30%20gün%20vizesiz&s=Türkiye%20pasaportuyla&tone=ok
 * CDN'de uzun süre önbelleklenir. Fotoğraf ve bayrak sitenin kendi dosyalarından gelir.
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';


type V = { type: string; props: Record<string, unknown> };
const h = (type: string, props: Record<string, unknown>, ...children: unknown[]): V => ({ type, props: { ...props, children: children.length <= 1 ? children[0] : children } });

const TONE: Record<string, string> = { ok: '#1f9d6b', sea: '#0d8a8f', sun: '#c58a12', warn: '#c0392b' };
const fontCache: { data?: Array<{ name: string; data: ArrayBuffer; weight: 400 | 800; style: 'normal' }> } = {};

async function fonts(origin: string) {
  if (fontCache.data) return fontCache.data;
  const list: Array<[string, 400 | 800]> = [['latin', 800], ['latin', 400], ['latin-ext', 800], ['latin-ext', 400], ['cyrillic', 800], ['cyrillic', 400]];
  fontCache.data = await Promise.all(
    list.map(async ([s, w]) => ({ name: s === 'cyrillic' ? 'NotoCyr' : s === 'latin-ext' ? 'NotoExt' : 'Noto', data: await fetch(`${origin}/og-fonts/noto-sans-${s}-${w}-normal.woff`).then((r) => r.arrayBuffer()), weight: w, style: 'normal' as const }))
  );
  return fontCache.data;
}

const clean = (v: string | null, n: number) => (v || '').replace(/\s+/g, ' ').trim().slice(0, n);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = url.origin;
  const c = (url.searchParams.get('c') || '').toLowerCase().replace(/[^a-z]/g, '').slice(0, 2);
  const title = clean(url.searchParams.get('t'), 40) || 'Vizamigo';
  const badge = clean(url.searchParams.get('b'), 40);
  const sub = clean(url.searchParams.get('s'), 70);
  const tone = TONE[url.searchParams.get('tone') || ''] || TONE.sea;
  // satori resimleri veri adresi olarak alır; sitenin kendi dosyalarını indirip gömüyoruz
  const toData = async (u: string, mime: string) => {
    try {
      const r = await fetch(u);
      if (!r.ok) return '';
      return `data:${mime};base64,${Buffer.from(await r.arrayBuffer()).toString('base64')}`;
    } catch {
      return '';
    }
  };
  const [photo, flag] = c ? await Promise.all([toData(`${origin}/og-img/${c}.jpg`, 'image/jpeg'), toData(`${origin}/og-img/f-${c}.png`, 'image/png')]) : ['', ''];
  const big = title.length > 16 ? 76 : 96;

  const el = h(
    'div',
    { style: { width: '100%', height: '100%', display: 'flex', position: 'relative', fontFamily: 'Noto, NotoExt, NotoCyr', background: '#0a3f4a' } },
    photo ? h('img', { src: photo, width: 1200, height: 630, style: { position: 'absolute', left: 0, top: 0, width: 1200, height: 630, objectFit: 'cover' } }) : null,
    h('div', { style: { position: 'absolute', left: 0, top: 0, width: 1200, height: 630, display: 'flex', background: 'linear-gradient(90deg, rgba(6,30,40,.92) 0%, rgba(6,30,40,.70) 45%, rgba(6,30,40,.15) 100%)' } }),
    h(
      'div',
      { style: { position: 'absolute', left: 64, top: 56, right: 64, bottom: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white' } },
      h('div', { style: { display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 800, letterSpacing: -0.5 } }, 'Vizamigo'),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column' } },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center' } },
          flag ? h('img', { src: flag, width: 84, height: 84, style: { width: 84, height: 84, borderRadius: 42, marginRight: 24, border: '4px solid rgba(255,255,255,.9)' } }) : null,
          h('div', { style: { fontSize: big, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 } }, title)
        ),
        badge ? h('div', { style: { display: 'flex', marginTop: 26 } }, h('div', { style: { display: 'flex', background: tone, color: 'white', fontSize: 44, fontWeight: 800, padding: '12px 28px', borderRadius: 22 } }, badge)) : null,
        sub ? h('div', { style: { display: 'flex', fontSize: 32, marginTop: 20, opacity: 0.92 } }, sub) : null
      ),
      h('div', { style: { display: 'flex', fontSize: 26, opacity: 0.85 } }, 'vizamigo.com')
    )
  );

  try {
    // satori yalnızca PNG/JPEG resim alır; resimleri önceden indirip veri adresine çeviriyoruz
    const svg = await satori(el as never, { width: 1200, height: 630, fonts: await fonts(origin) });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    return new Response(png, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable' } });
  } catch {
    return Response.redirect(`${origin}/logo.png`, 302);
  }
}
