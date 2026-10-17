import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CountryData {
  code: string;
  nameTr: string;
  nameEn: string;
  candidatePrimary: {
    title: string;
    landmark: string;
    url: string;
    sourcePageUrl: string;
    artist: string;
    license: string;
    dimensions: string;
    source: string;
  };
}

const COUNTRIES: CountryData[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'countries_199_verified.json'), 'utf8')
);

const CACHE_DIR = path.join(__dirname, '../.cache/raw-country-images');
const OUT_DIR = path.join(__dirname, '../public/images/countries');

fs.mkdirSync(CACHE_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const WIDTHS = [240, 360, 480, 720];

async function fetchWithRetry(url: string, retries = 5, backoff = 1000): Promise<Buffer> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'VizamigoImageDownloader/1.0 (info@vizamigo.com; https://vizamigo.com)'
        }
      });
      if (res.status === 429) {
        console.warn(`HTTP 429 on ${url}. Waiting ${backoff}ms...`);
        await new Promise(r => setTimeout(r, backoff));
        backoff *= 2;
        continue;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (e: any) {
      if (i === retries - 1) throw e;
      console.warn(`Retry ${i + 1}/${retries} for ${url}: ${e.message}. Waiting ${backoff}ms...`);
      await new Promise(r => setTimeout(r, backoff));
      backoff *= 1.5;
    }
  }
  throw new Error(`Failed to download ${url} after ${retries} retries`);
}

async function processCountry(c: CountryData, index: number, total: number) {
  const codeLower = c.code.toLowerCase();
  
  // Check if all 8 target files already exist
  const allExist = WIDTHS.every(w => {
    const webpPath = path.join(OUT_DIR, `${codeLower}-${w}.webp`);
    const avifPath = path.join(OUT_DIR, `${codeLower}-${w}.avif`);
    return fs.existsSync(webpPath) && fs.existsSync(avifPath);
  });

  if (allExist) {
    console.log(`[${index + 1}/${total}] ${c.code} already processed. Skipping.`);
    return;
  }

  // 1. Get raw buffer (from cache or download)
  const cacheFile = path.join(CACHE_DIR, `${codeLower}.raw`);
  let rawBuffer: Buffer;

  if (fs.existsSync(cacheFile)) {
    rawBuffer = fs.readFileSync(cacheFile);
  } else {
    let downloadUrl = c.candidatePrimary.url;
    // For Unsplash images, ensure 1600px width source
    if (downloadUrl.includes('images.unsplash.com')) {
      const u = new URL(downloadUrl);
      u.searchParams.set('w', '1600');
      u.searchParams.set('q', '85');
      downloadUrl = u.toString();
    }
    console.log(`[${index + 1}/${total}] Downloading ${c.code} (${c.nameEn}) from ${downloadUrl}...`);
    rawBuffer = await fetchWithRetry(downloadUrl);
    fs.writeFileSync(cacheFile, rawBuffer);
    // Pause 250ms to be gentle with Wikimedia/Unsplash CDNs
    await new Promise(r => setTimeout(r, 250));
  }

  // 2. Generate responsive variants with Sharp
  for (const w of WIDTHS) {
    const webpOut = path.join(OUT_DIR, `${codeLower}-${w}.webp`);
    const avifOut = path.join(OUT_DIR, `${codeLower}-${w}.avif`);

    if (!fs.existsSync(webpOut)) {
      await sharp(rawBuffer)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 60, effort: 4 })
        .toFile(webpOut);
    }

    if (!fs.existsSync(avifOut)) {
      await sharp(rawBuffer)
        .resize({ width: w, withoutEnlargement: true })
        .avif({ quality: 55, effort: 4 })
        .toFile(avifOut);
    }
  }

  console.log(`[${index + 1}/${total}] ✅ ${c.code} generated (240w, 360w, 480w, 720w in WebP + AVIF)`);
}

async function main() {
  console.log(`Starting optimization of ${COUNTRIES.length} countries...`);
  const startTime = Date.now();
  let success = 0;
  let failed = 0;

  for (let i = 0; i < COUNTRIES.length; i++) {
    const c = COUNTRIES[i];
    try {
      await processCountry(c, i, COUNTRIES.length);
      success++;
    } catch (e: any) {
      console.error(`❌ Error on ${c.code}:`, e.message);
      failed++;
    }
  }

  const durationSec = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n========================================`);
  console.log(`Optimization completed in ${durationSec}s!`);
  console.log(`Success: ${success}, Failed: ${failed}`);

  // Calculate total disk size
  const files = fs.readdirSync(OUT_DIR);
  let totalBytes = 0;
  for (const f of files) {
    totalBytes += fs.statSync(path.join(OUT_DIR, f)).size;
  }
  const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`Total output files in ${OUT_DIR}: ${files.length}`);
  console.log(`Total storage size: ${totalMb} MB`);
  console.log(`========================================\n`);
}

main().catch(console.error);
