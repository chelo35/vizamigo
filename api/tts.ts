/**
 * Asistanın doğal sesi: Microsoft Edge'in ücretsiz sinir ağı sesleriyle (Emel, Ava, Katja, Elvira, Svetlana)
 * metni MP3'e çevirir. GET /api/tts?l=tr&t=metin
 * Aynı cümle CDN'de önbelleğe alınır (tekrar sorulduğunda anında gelir). Ziyaretçi hiçbir ayar yapmaz.
 * Hata olursa 502 döner; tarayıcı o zaman cihazın kendi sesine geçer.
 */
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const VOICE: Record<string, string> = {
  tr: 'tr-TR-EmelNeural',
  en: 'en-US-AvaNeural',
  de: 'de-DE-KatjaNeural',
  es: 'es-ES-ElviraNeural',
  ru: 'ru-RU-SvetlanaNeural'
};
// seçilebilir sesler (dil + kısa ad); çok dilli sesler Türkçe de konuşur
const MULTI: Record<string, string> = {
  ava: 'en-US-AvaMultilingualNeural', emma: 'en-US-EmmaMultilingualNeural', andrew: 'en-US-AndrewMultilingualNeural', brian: 'en-US-BrianMultilingualNeural',
  seraphina: 'de-DE-SeraphinaMultilingualNeural', florian: 'de-DE-FlorianMultilingualNeural', vivienne: 'fr-FR-VivienneMultilingualNeural', remy: 'fr-FR-RemyMultilingualNeural',
  thalita: 'pt-BR-ThalitaMultilingualNeural', william: 'en-AU-WilliamMultilingualNeural'
};
const CHOICE: Record<string, Record<string, string>> = {
  tr: { emel: 'tr-TR-EmelNeural', ahmet: 'tr-TR-AhmetNeural', ...MULTI },
  en: { ava: 'en-US-AvaNeural', emma: 'en-US-EmmaNeural', jenny: 'en-US-JennyNeural', aria: 'en-US-AriaNeural', sonia: 'en-GB-SoniaNeural', libby: 'en-GB-LibbyNeural', andrew: 'en-US-AndrewNeural', brian: 'en-US-BrianNeural', ryan: 'en-GB-RyanNeural' },
  de: { katja: 'de-DE-KatjaNeural', amala: 'de-DE-AmalaNeural', seraphina: MULTI.seraphina, conrad: 'de-DE-ConradNeural', florian: MULTI.florian, killian: 'de-DE-KillianNeural' },
  es: { elvira: 'es-ES-ElviraNeural', ximena: 'es-ES-XimenaNeural', dalia: 'es-MX-DaliaNeural', alvaro: 'es-ES-AlvaroNeural', jorge: 'es-MX-JorgeNeural' },
  ru: { svetlana: 'ru-RU-SvetlanaNeural', dmitry: 'ru-RU-DmitryNeural' }
};

type Req = { query: Record<string, string | string[] | undefined>; headers: Record<string, string | string[] | undefined> };
type Res = { status: (n: number) => Res; setHeader: (k: string, v: string) => void; send: (b: unknown) => void; end: (b?: unknown) => void };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || '';

function synth(voice: string, text: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const tts = new MsEdgeTTS();
    const timer = setTimeout(() => {
      try {
        tts.close();
      } catch {}
      reject(new Error('timeout'));
    }, 15000);
    tts
      .setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
      .then(() => {
        const { audioStream } = tts.toStream(text, { rate: '-4%' });
        const parts: Buffer[] = [];
        audioStream.on('data', (d: Buffer) => parts.push(d));
        audioStream.on('end', () => {
          clearTimeout(timer);
          try {
            tts.close();
          } catch {}
          resolve(Buffer.concat(parts));
        });
        audioStream.on('error', (e: Error) => {
          clearTimeout(timer);
          reject(e);
        });
      })
      .catch((e) => {
        clearTimeout(timer);
        reject(e);
      });
  });
}

export default async function handler(req: Req, res: Res) {
  const lang = one(req.query.l).slice(0, 2);
  const text = one(req.query.t).replace(/[<>&]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 400);
  // yalnızca kendi sitemizden gelen istekler (başka siteler ücretsiz ses servisi gibi kullanmasın)
  const ref = one(req.headers.referer) || one(req.headers.origin);
  if (ref && !/^https:\/\/(www\.)?vizamigo\.com\b|^https:\/\/[a-z0-9-]+\.vercel\.app\b|^http:\/\/localhost\b/.test(ref)) {
    res.status(403).end();
    return;
  }
  const pick = one(req.query.v).toLowerCase();
  const voice = (pick && CHOICE[lang]?.[pick]) || VOICE[lang];
  if (!VOICE[lang] || !text) {
    res.status(400).end();
    return;
  }
  try {
    const mp3 = await synth(voice, text);
    if (!mp3.length) throw new Error('empty');
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=2592000, immutable');
    res.status(200).send(mp3);
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).end();
  }
}
