export const config = { runtime: 'edge' };

/**
 * Daisycon API bağlantısı (bir kez): https://www.vizamigo.com/api/daisycon-auth
 * OAuth yetkilendirme kodu + PKCE. Daisycon'da kayıtlı uygulamanın yönlendirme adresi tam olarak bu adres olmalı.
 * Başarılı girişte yenileme anahtarı Supabase ref_secrets (key=daisycon_refresh) tablosuna yazılır; /api/ortak-sync onu kullanır ve yeniler.
 * Güvenlik: bağlantı zaten varsa yeniden bağlanmaya izin verilmez (yenilemek için Supabase'de satır silinir).
 */
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
const SB = env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const sbh = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };
const REDIRECT = 'https://www.vizamigo.com/api/daisycon-auth';

const page = (msg: string, status = 200) =>
  new Response(`<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><body style="font:16px system-ui;padding:40px;max-width:640px;margin:auto"><h2>Daisycon bağlantısı</h2><p>${msg}</p></body>`, {
    status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }
  });
const b64url = (buf: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export default async function handler(req: Request): Promise<Response> {
  const id = env.DAISYCON_CLIENT_ID, sec = env.DAISYCON_CLIENT_SECRET;
  if (!id || !sec || !KEY) return page('Vercel ortam değişkenleri eksik (DAISYCON_CLIENT_ID / DAISYCON_CLIENT_SECRET).', 500);
  const u = new URL(req.url);
  const existing = ((await (await fetch(`${SB}/rest/v1/ref_secrets?key=eq.daisycon_refresh&select=updated_at`, { headers: sbh })).json()) as { updated_at: string }[])[0];
  const code = u.searchParams.get('code');

  if (!code) {
    if (existing) return page(`Daisycon zaten bağlı (son yenileme: ${existing.updated_at}). Yeniden bağlamak için Supabase'de ref_secrets tablosundaki daisycon_refresh satırını silin.`);
    const verifier = b64url(crypto.getRandomValues(new Uint8Array(48)));
    const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
    const state = b64url(crypto.getRandomValues(new Uint8Array(16)));
    const auth = `https://login.daisycon.com/oauth/authorize?${new URLSearchParams({ response_type: 'code', client_id: id, redirect_uri: REDIRECT, code_challenge: challenge, code_challenge_method: 'S256', state })}`;
    return new Response(null, { status: 302, headers: { Location: auth, 'Set-Cookie': `dc_pkce=${verifier}.${state}; Path=/api/daisycon-auth; Max-Age=900; HttpOnly; Secure; SameSite=Lax`, 'Cache-Control': 'no-store' } });
  }

  if (existing) return page('Daisycon zaten bağlı.');
  const ck = (req.headers.get('cookie') || '').match(/(?:^|;\s*)dc_pkce=([^;]+)/)?.[1] || '';
  const [verifier, state] = ck.split('.');
  if (!verifier || state !== u.searchParams.get('state')) return page('Oturum doğrulanamadı; lütfen bu sayfayı baştan açın.', 400);
  const r = await fetch('https://login.daisycon.com/oauth/access-token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, client_id: id, client_secret: sec, redirect_uri: REDIRECT, code_verifier: verifier }).toString()
  });
  const j = (await r.json().catch(() => ({}))) as { refresh_token?: string; error?: string; error_description?: string };
  if (!j.refresh_token) return page(`Daisycon anahtar vermedi: ${r.status} ${j.error || ''} ${j.error_description || ''}`, 502);
  await fetch(`${SB}/rest/v1/ref_secrets?on_conflict=key`, { method: 'POST', headers: { ...sbh, Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ key: 'daisycon_refresh', value: j.refresh_token, updated_at: new Date().toISOString() }) });
  return new Response(`<!doctype html><meta charset="utf-8"><body style="font:16px system-ui;padding:40px">✓ Daisycon bağlandı. Bu sekmeyi kapatabilirsiniz.</body>`, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Set-Cookie': 'dc_pkce=; Path=/api/daisycon-auth; Max-Age=0' }
  });
}
