import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(projectRoot, '.env.local') });
dotenv.config({ path: path.join(projectRoot, '.env') });

const LOCALES_DIR = path.join(projectRoot, 'src', 'i18n', 'locales');
const TR_FILE = path.join(LOCALES_DIR, 'tr.ts');
const EN_FILE = path.join(LOCALES_DIR, 'en.ts');
const DE_FILE = path.join(LOCALES_DIR, 'de.ts');

function extractObjectFromTs(filePath: string): Record<string, string> {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Simple evaluator: import module or evaluate JSON-like object
  const match = content.match(/export\s+const\s+\w+:\s*AppTranslations\s*=\s*({[\s\S]*});?\s*$/);
  if (!match) {
    throw new Error(`Could not parse translations from ${filePath}`);
  }
  // Use Function to safely evaluate JS object literal
  const fn = new Function(`return ${match[1]};`);
  return fn() as Record<string, string>;
}

function writeObjectToTs(filePath: string, varName: string, data: Record<string, string>): void {
  const keys = Object.keys(data);
  const lines: string[] = [
    `import { AppTranslations } from '../types';`,
    '',
    `export const ${varName}: AppTranslations = {`
  ];

  for (const key of keys) {
    const val = data[key];
    const escaped = val.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    lines.push(`  ${key}: '${escaped}',`);
  }

  lines.push('};');
  lines.push('');

  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
}

async function translateWithGemini(
  ai: GoogleGenAI,
  itemsToTranslate: Record<string, string>,
  targetLanguage: 'English' | 'German'
): Promise<Record<string, string>> {
  const prompt = `
You are an expert professional translator specializing in travel, visas, passports, residency, digital nomad lifestyle, and consular information.

Translate the following Turkish UI strings into natural, precise, and idiomatic ${targetLanguage}.
Domain context:
- Visa & Passport Guide ("Vizamigo" / "VisaKompass")
- Visa on Arrival (VoA), Electronic Travel Authorization (ETA), eVisa, Schengen 90/180 rules, dual citizenship.
- Keep UI tone friendly, trustworthy, and concise.
- Preserve any variables or technical terms where appropriate.

Input (JSON):
${JSON.stringify(itemsToTranslate, null, 2)}

Output MUST be a single raw JSON object mapping the exact same keys to the translated ${targetLanguage} strings. No markdown backticks, no commentary.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });

  const text = response.text || '';
  const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleaned);
}

async function main() {
  console.log('🌐 Vizamigo i18n Gemini Auto-Translator');
  console.log('========================================');

  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyPlaceholder = !apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '';

  const trObj = extractObjectFromTs(TR_FILE);
  const enObj = extractObjectFromTs(EN_FILE);
  const deObj = extractObjectFromTs(DE_FILE);

  const trKeys = Object.keys(trObj);
  const missingInEn = trKeys.filter(k => !(k in enObj));
  const missingInDe = trKeys.filter(k => !(k in deObj));

  console.log(`📋 Türkçe Anahtar Sayısı: ${trKeys.length}`);
  console.log(`🔍 İngilizce Eksik Anahtar: ${missingInEn.length}`);
  console.log(`🔍 Almanca Eksik Anahtar: ${missingInDe.length}`);

  if (missingInEn.length === 0 && missingInDe.length === 0 && !process.argv.includes('--force')) {
    console.log('✅ Tüm diller Türkçe kaynak ile tam senkronize durumda!');
    console.log('ℹ️ Tüm anahtarları Gemini ile yeniden çevirmek için: npm run i18n:translate -- --force');
    return;
  }

  if (isKeyPlaceholder) {
    console.warn('\n⚠️  GEMINI_API_KEY bulunamadı veya geçersiz.');
    console.warn('Lütfen .env.local dosyanıza geçerli bir GEMINI_API_KEY tanımlayın:');
    console.warn('  GEMINI_API_KEY="AIzaSy..."');
    console.warn('Ardından komutu tekrar çalıştırın: npm run i18n:translate\n');
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  const enBatch: Record<string, string> = {};
  for (const k of process.argv.includes('--force') ? trKeys : missingInEn) {
    enBatch[k] = trObj[k];
  }

  const deBatch: Record<string, string> = {};
  for (const k of process.argv.includes('--force') ? trKeys : missingInDe) {
    deBatch[k] = trObj[k];
  }

  if (Object.keys(enBatch).length > 0) {
    console.log(`🤖 Gemini ile İngilizce çeviri yapılıyor (${Object.keys(enBatch).length} anahtar)...`);
    try {
      const translatedEn = await translateWithGemini(ai, enBatch, 'English');
      const updatedEn = { ...enObj, ...translatedEn };
      writeObjectToTs(EN_FILE, 'en', updatedEn);
      console.log('✅ İngilizce (en.ts) başarıyla güncellendi.');
    } catch (err) {
      console.error('❌ İngilizce çevirisi sırasında hata oluştu:', err);
    }
  }

  if (Object.keys(deBatch).length > 0) {
    console.log(`🤖 Gemini ile Almanca çeviri yapılıyor (${Object.keys(deBatch).length} anahtar)...`);
    try {
      const translatedDe = await translateWithGemini(ai, deBatch, 'German');
      const updatedDe = { ...deObj, ...translatedDe };
      writeObjectToTs(DE_FILE, 'de', updatedDe);
      console.log('✅ Almanca (de.ts) başarıyla güncellendi.');
    } catch (err) {
      console.error('❌ Almanca çevirisi sırasında hata oluştu:', err);
    }
  }

  console.log('\n🎉 Senkronizasyon tamamlandı!');
}

main().catch(err => {
  console.error('Beklenmeyen hata:', err);
  process.exit(1);
});
