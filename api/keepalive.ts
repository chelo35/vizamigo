export const config = { runtime: 'edge' };

/**
 * Supabase ücretsiz projesi 7 gün hareketsiz kalınca duraklatılıyor (giriş/üyelik durur).
 * Vercel Cron bunu günde bir çağırır; Supabase'e iki hafif istek gider.
 */
export default async function handler() {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
  // Herkese açık değerler (tarayıcı paketinde zaten var): yayın anahtarı gizli değildir.
  const url = env.VITE_SUPABASE_URL || env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
  const key = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || 'sb_publishable_nINWLrE2ocJ4XuueayQ94g_SeEC_kLk';
  const out: Record<string, number | string> = {};
  if (url && key) {
    const h = { apikey: key, Authorization: `Bearer ${key}` };
    try {
      out.auth = (await fetch(`${url}/auth/v1/health`, { headers: h })).status;
    } catch {
      out.auth = 'err';
    }
    try {
      // Gerçek bir veritabanı sorgusu: Supabase hareketliliği buna göre sayar (RLS boş liste döndürür)
      out.rest = (await fetch(`${url}/rest/v1/reports?select=id&limit=1`, { headers: h })).status;
    } catch {
      out.rest = 'err';
    }
  } else out.skip = 'no env';
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
