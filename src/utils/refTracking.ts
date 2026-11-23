/**
 * Fenomen (iş ortağı) bağlantıları: vizamigo.com/...?ref=gezengenc
 * - Kod 30 gün tarayıcıda saklanır (son tıklanan bağlantı geçerli).
 * - Ziyaretçi bir ortak bağlantısına tıklayınca kod, ağın alt kimlik alanına eklenir:
 *   Daisycon → ws, Awin → clickref, Admitad (/g/… bağlantıları) → subid, Stay22 → campaign (sonuna "-r-kod"), GetYourGuide (Stay22) → cmp,
 *   CJ (Daytrip) → sid, Viator → campaign, 12Go → sub_id, TourRadar → utm_campaign, Travelpayouts (/api/tp) → sub_id (analytics.ts, başına "r-kod-").
 * - Raporlarda satışlar koda göre ayrılır; komisyonun payı aylık hesaplanır.
 * Desteklenmeyen: VisaHQ portalı (beyaz etiket) ve SafetyWing elçi bağlantısı (alt kimlik alanı yok).
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
    if (VALID.test(raw)) {
      localStorage.setItem(KEY, JSON.stringify({ ref: raw, ts: Date.now() }));
      refBeacon('visit', '', raw);
    }
    u.searchParams.delete('ref');
    window.history.replaceState(window.history.state, '', u.pathname + (u.search || '') + u.hash);
  } catch {}
}

export function currentRef(): string | null {
  return read()?.ref || null;
}

/**
 * Fenomen paneli sayacı (/api/ref-hit → Supabase ref_events).
 * visit: ?ref= bağlantısıyla gelinen ziyaret; out: kodlu ziyaretçinin ortak siteye gitmesi
 * (aynı ortak alan adı için oturum başına bir kez sayılır).
 */
export function refBeacon(kind: 'visit' | 'out', target = '', ref = currentRef()): void {
  if (!ref || typeof navigator === 'undefined') return;
  try {
    if (kind === 'out') {
      const k = `vz_out_${target}`;
      if (sessionStorage.getItem(k)) return;
      sessionStorage.setItem(k, '1');
    }
    const seg = location.pathname.split('/').filter(Boolean);
    const body = JSON.stringify({ r: ref, k: kind, t: target, p: location.pathname, l: ['en', 'de', 'es', 'ru', 'pt'].includes(seg[0]) ? seg[0] : 'tr' });
    if (navigator.sendBeacon) navigator.sendBeacon('/api/ref-hit', new Blob([body], { type: 'text/plain' }));
    else fetch('/api/ref-hit', { method: 'POST', body, keepalive: true }).catch(() => {});
  } catch {}
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
  } else if (/^\/g\/[a-z0-9]{20,}\/?$/.test(u.pathname)) {
    // Admitad: her programın kendi kısa alan adı var, yol biçimi aynı
    u.searchParams.set('subid', tag);
  } else if (is('stay22.com')) {
    const c = u.searchParams.get('campaign') || 'vizamigo_site';
    if (!c.includes(tag)) u.searchParams.set('campaign', `${c}-${tag}`.slice(0, 100));
  } else if (is('getyourguide.com') && u.searchParams.get('partner_id')) {
    const c = u.searchParams.get('cmp') || '';
    if (!c.includes(tag)) u.searchParams.set('cmp', `${c}-${tag}`);
  } else if (/^(tkqlhce|anrdoezrs|dpbolvw|jdoqocy|kqzyfj)\.com$/.test(host) && /^\/click-\d+-\d+/.test(u.pathname)) {
    // CJ (ör. Daytrip): alt kimlik alanı sid
    u.searchParams.set('sid', tag);
  } else if (is('viator.com') && u.searchParams.get('pid')) {
    // Viator ortaklık bağlantısı: pid/mcid/medium'a dokunma, takip alanı campaign
    const c = u.searchParams.get('campaign') || '';
    if (!c.includes(tag)) u.searchParams.set('campaign', (c ? `${c}-${tag}` : tag).slice(0, 100));
  } else if (is('tourradar.com') && u.searchParams.get('utm_source')) {
    // TourRadar elçi bağlantısı: fenomen kodu utm_campaign'e eklenir
    const c = u.searchParams.get('utm_campaign') || '';
    if (!c.includes(tag)) u.searchParams.set('utm_campaign', (c ? `${c}-${tag}` : tag).slice(0, 100));
  } else if ((is('12go.asia') || is('12go.co')) && u.searchParams.get('z')) {
    // 12Go doğrudan ortaklık: alt kimlik alanı sub_id (rezervasyon raporunda görünür)
    const c = u.searchParams.get('sub_id') || '';
    if (!c.includes(tag)) u.searchParams.set('sub_id', (c ? `${c}-${tag}` : tag).slice(0, 60));
  } else {
    return url;
  }
  return u.toString();
}
