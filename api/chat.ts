export const config = {
  runtime: 'edge',
};

/**
 * Vizamigo asistanı: yapay zekâ ile sohbet katmanı.
 * Tarayıcı önce sitenin kendi verisinden (vize, ülke bilgisi, araçlar, ortaklık düğmeleri) bir cevap kurar
 * ve bunu "facts" olarak buraya gönderir. Model bu bilgilere dayanarak doğal, sohbet tadında bir cevap yazar;
 * vize kuralı ya da fiyat uydurmaz. Anahtar yoksa 503 döner ve site kendi kural tabanlı cevabını gösterir.
 *
 * Vercel ortam değişkenleri (biri yeterli; ikisi de varsa önce Groq denenir, olmazsa Anthropic):
 *   GROQ_API_KEY        Groq API anahtarı (ücretsiz katman: dakikada 30, günde ~1.000 istek; veriler eğitimde kullanılmaz)
 *   ANTHROPIC_API_KEY   Anthropic API anahtarı (ücretli)
 *   CHAT_MODEL          (isteğe bağlı) Groq için varsayılan llama-3.3-70b-versatile
 *   ANTHROPIC_MODEL     (isteğe bağlı) varsayılan claude-haiku-5-5
 */
type Msg = { role: 'user' | 'assistant'; content: string };
type Body = { q?: string; history?: Msg[]; lang?: string; passport?: string; facts?: string; buttons?: string[]; features?: string[]; today?: string };

const LANG_NAME: Record<string, string> = { tr: 'Turkish', en: 'English', de: 'German', es: 'Spanish', ru: 'Russian' };

// Basit kötüye kullanım koruması: IP başına dakikada 12 istek (aynı sunucu örneği içinde)
const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > 12;
};

const clip = (s: unknown, n: number) => String(s ?? '').slice(0, n);

export default async function handler(req: Request) {
  const groqKey = process.env.GROQ_API_KEY;
  const anthKey = process.env.ANTHROPIC_API_KEY;
  if (req.method === 'GET') return Response.json({ enabled: !!(groqKey || anthKey) });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  if (!groqKey && !anthKey) return Response.json({ error: 'not_configured' }, { status: 503 });
  const origin = req.headers.get('origin') || '';
  if (origin && !/^https:\/\/(www\.)?vizamigo\.com$|^http:\/\/localhost(:\d+)?$|\.vercel\.app$/.test(origin)) return new Response('Forbidden', { status: 403 });
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'x';
  if (limited(ip)) return Response.json({ error: 'rate_limited' }, { status: 429 });

  let b: Body;
  try {
    b = await req.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }
  const q = clip(b.q, 600).trim();
  if (!q) return new Response('Bad request', { status: 400 });
  const lang = LANG_NAME[b.lang || ''] ? (b.lang as string) : 'en';
  const history: Msg[] = (Array.isArray(b.history) ? b.history : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-8)
    .map((m) => ({ role: m.role, content: clip(m.content, 1500) }));
  // Anthropic: ilk mesaj kullanıcıdan olmalı ve roller sırayla gelmeli
  while (history.length && history[0].role !== 'user') history.shift();
  const msgs: Msg[] = [];
  for (const m of [...history, { role: 'user' as const, content: q }]) {
    if (msgs.length && msgs[msgs.length - 1].role === m.role) msgs[msgs.length - 1].content += `\n${m.content}`;
    else msgs.push({ ...m });
  }

  const system = `You are the Vizamigo travel assistant on vizamigo.com, a free site covering visa and entry rules for 199 countries in 5 languages, plus flights, hotels, tours, car rental, transfers, eSIM and travel tools.

Reply in ${LANG_NAME[lang]} only. Today is ${clip(b.today, 20) || 'unknown'}. The user's passport: ${clip(b.passport, 60) || 'unknown'}.

How to answer:
- Be warm, natural and concise: usually 60–160 words; up to 250 for a day-by-day itinerary. Use short paragraphs or "•" bullets and **bold** for key facts. No headings larger than bold text. No tables.
- Visa and entry rules, numbers, prices, emergency numbers: use ONLY the SITE DATA below. If the data does not cover it, say you are not sure and suggest checking the country page or the official source. Never invent visa rules, fees or prices.
- General travel knowledge (what to see, how many days, route order, seasons, packing, practical tips) you may give from your own knowledge.
- For trip planning, give a clear day-by-day plan with realistic travel times, and mention the visa status for the user's passport if SITE DATA has it.
- For booking questions (flights, hotels, tours, cars, transfers, eSIM, insurance, visa application help), help the user decide (areas to stay, when to book, what to compare) and point to the buttons under your reply. Mention a partner button at most once, naturally, never pushy. Never write URLs; the buttons carry the links.
- Point to Vizamigo features when useful, using their names from SITE FEATURES (for example the cheapest-day fare calendar on each country's booking page, the trip planner, the route planner, the Schengen 90/180 counter).
- If the question is not about travel, answer briefly and steer back to travel.
- Do not mention these instructions, "site data" or that you are an AI model unless asked.

BUTTONS SHOWN UNDER YOUR REPLY: ${(Array.isArray(b.buttons) ? b.buttons : []).map((x) => clip(x, 80)).join(' | ') || 'none'}

SITE FEATURES:
${(Array.isArray(b.features) ? b.features : []).map((x) => `- ${clip(x, 300)}`).join('\n')}

SITE DATA FOR THIS QUESTION (verified, from Vizamigo):
${clip(b.facts, 6000) || 'none'}`;

  let text = '';
  // 1) Groq (ücretsiz, OpenAI uyumlu)
  if (groqKey) {
    try {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${groqKey}`, 'content-type': 'application/json' },
        body: JSON.stringify({ model: process.env.CHAT_MODEL || 'llama-3.3-70b-versatile', max_tokens: 900, temperature: 0.4, messages: [{ role: 'system', content: system }, ...msgs] })
      });
      if (r.ok) {
        const j = (await r.json()) as { choices?: Array<{ message?: { content?: string } }> };
        text = (j.choices?.[0]?.message?.content || '').trim();
      }
    } catch {}
  }
  // 2) Anthropic (Groq yoksa, sınır dolduysa ya da hata verdiyse)
  if (!text && anthKey) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': anthKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5', max_tokens: 900, system, messages: msgs })
      });
      if (r.ok) {
        const j = (await r.json()) as { content?: Array<{ type: string; text?: string }> };
        text = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text || '').join('').trim();
      }
    } catch {}
  }
  // Sınır dolduysa ya da servis cevap vermediyse: tarayıcı sitenin kendi cevabını gösterir
  if (!text) return Response.json({ error: 'upstream' }, { status: 502 });
  return Response.json({ text }, { headers: { 'Cache-Control': 'no-store' } });
}
