/**
 * Fenomen (iş ortağı) bağlantıları: vizamigo.com/...?ref=gezengenc
 * - Kod 30 gün tarayıcıda saklanır (son tıklanan bağlantı geçerli).
 * - Ziyaretçi bir ortak bağlantısına tıklayınca kod, ağın alt kimlik alanına eklenir:
 *   Daisycon → ws, Awin → clickref, Stay22 → campaign (sonuna "-r-kod"), GetYourGuide (Stay22) → cmp.
 * - Raporlarda satışlar koda göre ayrılır; komisyonun payı aylık hesaplanır.
 * Desteklenmeyen: VisaHQ portalı ve Travelpayouts Drive'ın kendi çevirdiği bağlantılar.
 */
const KEY = 'vz_ref';
const DAYS = 30;
const VALID = /^[a-z0-9][a-z0-9_-]{1,29}$/;

type Stored = { ref: string; ts: number };

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Stored;
    if (!s?.ref || !VALID.test(s.ref) || Date.now() - s.ts > DAYS * 864e5) return null;
    return s;
  } catch {
    return null;
  }
}

/** Sayfa açılışında ?ref= varsa kaydeder ve adres çubuğundan temizler (paylaşılan bağlantılar sade kalsın). */
export function captureRef(): void {
  if (typeof window === 'undefined') return;
  try {
    const u = new URL(window.location.href);
    const raw = (u.searchParams.get('ref') || '').trim().toLowerCase();
    if (!raw) return;
    if (VALID.test(raw)) localStorage.setItem(KEY, JSON.stringify({ ref: raw, ts: Date.now() }));
    u.searchParams.delete('ref');
    window.history.replaceState(window.history.state, '', u.pathname + (u.search || '') + u.hash);
  } catch {}
}

export function currentRef(): string | null {
  return read()?.ref || null;
}

/** Ortak bağlantısına fenomen kodunu ekler; kod yoksa veya ağ desteklemiyorsa bağlantıyı değiştirmez. */
export function tagRef(url: string, ref = currentRef()): string {
  if (!ref) return url;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return url;
  }
  const host = u.hostname.replace(/^www\./, '');
  const is = (d: string) => host === d || host.endsWith('.' + d);
  const tag = `r-${ref}`;
  if (is('glp8.net') || is('lt45.net') || is('daisycon.com')) {
    u.searchParams.set('ws', tag);
  } else if (is('awin1.com')) {
    u.searchParams.set('clickref', tag);
  } else if (is('stay22.com')) {
    const c = u.searchParams.get('campaign') || 'vizamigo_site';
    if (!c.includes(tag)) u.searchParams.set('campaign', `${c}-${tag}`.slice(0, 100));
  } else if (is('getyourguide.com') && u.searchParams.get('partner_id')) {
    const c = u.searchParams.get('cmp') || '';
    if (!c.includes(tag)) u.searchParams.set('cmp', `${c}-${tag}`);
  } else {
    return url;
  }
  return u.toString();
}
