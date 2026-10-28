/**
 * Ülke verisinde Türkçe kalmış metinleri (yemekler, ipuçları, dolandırıcılık uyarıları, gezi
 * planı vb.) İngilizce, Almanca, İspanyolca ve Rusçaya çevirir; sonucu
 * src/data/i18n-data/<dil>.json sözlüğüne yazar. Yalnızca sözlükte olmayanları çevirir;
 * istediğin kadar tekrar çalıştırabilirsin (kaldığı yerden devam eder).
 *
 * Kullanım:  npx tsx scripts/translate-country-data.ts [en de es ru]
 * Anahtar:   .env.local içindeki GEMINI_API_KEY (ekrana yazılmaz)
 */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { DATA_LANGS, collect, dictPath, loadDict, type DataLang } from './data-i18n';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
dotenv.config({ path: path.join(ROOT, '.env.local') });
dotenv.config({ path: path.join(ROOT, '.env') });

const NAMES: Record<DataLang, string> = { en: 'English', de: 'German', es: 'Spanish', ru: 'Russian' };
const BATCH = 80;
const PARALLEL = 4;

async function main() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY bulunamadı (.env.local)');
  const ai = new GoogleGenAI({ apiKey: key });
  const want = (process.argv.slice(2).filter((a) => (DATA_LANGS as readonly string[]).includes(a)) as DataLang[]);
  const langs = want.length ? want : [...DATA_LANGS];

  const { GEO_DATA } = await import('../src/data/geoData');
  const { getCountryName } = await import('../src/data/passportData');
  const { getCountryInsights } = await import('../src/data/countryInsights');
  const { getCountryTravelIntelligence } = await import('../src/data/countryTravelIntelligence');
  const { getCountryEncyclopedia } = await import('../src/data/countryEncyclopedia');
  const { getCountryItinerary } = await import('../src/data/countryItineraries');
  const codes = Object.keys(GEO_DATA).sort();

  // dilden bağımsız kısım (her dilde aynı Türkçe metin)
  const shared = new Set<string>();
  for (const code of codes) collect(getCountryTravelIntelligence(code, getCountryName(code, 'en')), shared);

  for (const lang of langs) {
    const dict = loadDict(ROOT, lang);
    const all = new Set<string>(shared);
    for (const code of codes) {
      collect({ insights: getCountryInsights(code, lang), enc: getCountryEncyclopedia(code, lang as never), itin: getCountryItinerary(code, lang as never) }, all);
    }
    const todo = [...all].filter((s) => !(s in dict));
    console.log(`[${lang}] toplam ${all.size} metin, çevrilecek ${todo.length}`);
    const batches: string[][] = [];
    for (let i = 0; i < todo.length; i += BATCH) batches.push(todo.slice(i, i + BATCH));
    let done = 0;
    const save = () => {
      fs.mkdirSync(path.dirname(dictPath(ROOT, lang)), { recursive: true });
      const sorted = Object.fromEntries(Object.entries(dict).sort(([a], [b]) => a.localeCompare(b)));
      fs.writeFileSync(dictPath(ROOT, lang), JSON.stringify(sorted, null, 0) + '\n');
    };
    const work = async (items: string[]) => {
      for (let attempt = 1; attempt <= 4; attempt++) {
        try {
          const out = await translate(ai, items, NAMES[lang]);
          items.forEach((s, i) => {
            const t = out[i];
            if (typeof t === 'string' && t.trim()) dict[s] = t.trim();
          });
          return;
        } catch (e) {
          if (attempt === 4) console.warn(`[${lang}] parti atlandı:`, e instanceof Error ? e.message : e);
          await new Promise((r) => setTimeout(r, 2000 * attempt));
        }
      }
    };
    for (let i = 0; i < batches.length; i += PARALLEL) {
      await Promise.all(batches.slice(i, i + PARALLEL).map(work));
      done += batches.slice(i, i + PARALLEL).reduce((n, b) => n + b.length, 0);
      save();
      process.stdout.write(`\r[${lang}] ${done}/${todo.length}`);
    }
    save();
    console.log(`\n[${lang}] bitti, sözlükte ${Object.keys(dict).length} çeviri`);
  }
}

async function translate(ai: GoogleGenAI, items: string[], target: string): Promise<string[]> {
  const prompt = `You translate short Turkish texts from a travel and visa guide (Vizamigo) into natural, concise ${target}.
Rules:
- Translate every item. Keep proper nouns (places, dishes, drinks, brands, people) in their usual ${target} or local spelling; you may add a short ${target} explanation in parentheses only if the Turkish text already has one.
- Keep numbers, currencies, emojis, phone numbers and line breaks.
- Do not add commentary.
Return ONLY a JSON array of ${items.length} strings, in the same order.

Input:
${JSON.stringify(items)}`;
  const res = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { responseMimeType: 'application/json', temperature: 0.2 }
  });
  const text = (res.text || '').replace(/```json|```/g, '').trim();
  const arr = JSON.parse(text);
  if (!Array.isArray(arr) || arr.length !== items.length) throw new Error(`beklenen ${items.length}, gelen ${Array.isArray(arr) ? arr.length : 'dizi değil'}`);
  return arr;
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
