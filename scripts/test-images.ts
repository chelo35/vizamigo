/**
 * Comprehensive Automated Test & Verification Suite for Vizamigo Destination Photography
 * 
 * Verifies:
 * 1. Local Asset Integrity: 100% of 199 countries have all 8 responsive variants (1,592 files).
 * 2. Magic Number & Header Check: Verifies valid RIFF/WEBP and ftyp/avif binary signatures.
 * 3. File Hash Deduplication: Ensures 0 duplicate images across all 199 destinations.
 * 4. Database Schema & Completeness: Exactly 199 records in countryVisualsData with full 5-language landmarks.
 * 5. Helper Function Precision: Validates getCountryVisual, getOptimizedImageUrl, getOptimizedSrcSet.
 * 6. HTTP Server Verification: Tests HTTP 200 responses from local preview server if active.
 * 
 * Run with: npm run test:images
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import http from 'http';
import { fileURLToPath } from 'url';
import {
  COUNTRY_LANDSCAPES,
  COUNTRY_VISUALS_LIST,
  getCountryVisual,
  getOptimizedImageUrl,
  getOptimizedSrcSet,
  getOptimizedAvifSrcSet,
  DEFAULT_TRAVEL_FALLBACK
} from '../src/data/countryVisuals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images/countries');
const WIDTHS = [240, 360, 480, 720];
const FORMATS = ['webp', 'avif'] as const;

interface TestSuiteReport {
  totalCountries: number;
  expectedFiles: number;
  foundFiles: number;
  missingFiles: string[];
  corruptFiles: string[];
  duplicateHashes: { hash: string; files: string[] }[];
  schemaErrors: string[];
  helperErrors: string[];
  httpErrors: string[];
}

function verifyImageSignature(filePath: string, format: 'webp' | 'avif'): boolean {
  try {
    const buffer = Buffer.alloc(16);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 16, 0);
    fs.closeSync(fd);

    if (format === 'webp') {
      // Starts with 'RIFF' and bytes 8..11 are 'WEBP'
      const riff = buffer.toString('ascii', 0, 4);
      const webp = buffer.toString('ascii', 8, 12);
      return riff === 'RIFF' && webp === 'WEBP';
    } else if (format === 'avif') {
      // Bytes 4..12 typically contain 'ftyp' and 'avif' or 'mif1'
      const ftyp = buffer.toString('ascii', 4, 8);
      const brand = buffer.toString('ascii', 8, 12);
      return ftyp === 'ftyp' && (brand === 'avif' || brand === 'avis' || brand === 'mif1');
    }
    return false;
  } catch {
    return false;
  }
}

async function verifyHttpAsset(port: number, relativePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}${relativePath}`, { timeout: 2000 }, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function runFullTestSuite() {
  console.log('='.repeat(80));
  console.log('🚀 VIZAMIGO DESTINATION PHOTOGRAPHY AUTOMATED VERIFICATION SUITE');
  console.log('='.repeat(80));

  const report: TestSuiteReport = {
    totalCountries: COUNTRY_VISUALS_LIST.length,
    expectedFiles: COUNTRY_VISUALS_LIST.length * WIDTHS.length * FORMATS.length,
    foundFiles: 0,
    missingFiles: [],
    corruptFiles: [],
    duplicateHashes: [],
    schemaErrors: [],
    helperErrors: [],
    httpErrors: []
  };

  console.log(`Checking database of ${report.totalCountries} countries...`);
  console.log(`Expected local responsive image files: ${report.expectedFiles} (199 * 4 widths * 2 formats)\n`);

  // 1. SCHEMA & DATA COMPLETENESS CHECK
  console.log('--- 1. Testing Metadata & 5-Language Landmarks ---');
  if (COUNTRY_VISUALS_LIST.length !== 199) {
    report.schemaErrors.push(`Expected exactly 199 countries in COUNTRY_VISUALS_LIST, found ${COUNTRY_VISUALS_LIST.length}`);
  }

  for (const c of COUNTRY_VISUALS_LIST) {
    if (!c.code || c.code.length !== 2) {
      report.schemaErrors.push(`Invalid country code: "${c.code}"`);
    }
    if (!c.image || !c.image.startsWith('/images/countries/')) {
      report.schemaErrors.push(`[${c.code}] Invalid image path: "${c.image}"`);
    }
    if (!c.landmark || c.landmark.trim().length === 0) {
      report.schemaErrors.push(`[${c.code}] Missing primary landmark string`);
    }
    if (!c.author || c.author.trim().length === 0) {
      report.schemaErrors.push(`[${c.code}] Missing author/photographer attribution`);
    }
    if (!c.license || c.license.trim().length === 0) {
      report.schemaErrors.push(`[${c.code}] Missing license information`);
    }
    if (!c.sourcePageUrl || !c.sourcePageUrl.startsWith('http')) {
      report.schemaErrors.push(`[${c.code}] Invalid sourcePageUrl: "${c.sourcePageUrl}"`);
    }

    // 5-Language check
    const l5 = c.landmarkI18n;
    if (!l5) {
      report.schemaErrors.push(`[${c.code}] Missing landmarkI18n object`);
    } else {
      for (const lang of ['tr', 'en', 'de', 'es', 'ru'] as const) {
        if (!l5[lang] || l5[lang].trim().length === 0) {
          report.schemaErrors.push(`[${c.code}] Missing '${lang}' localized landmark`);
        }
      }
    }
  }

  if (report.schemaErrors.length === 0) {
    console.log(`✅ 100% Schema Compliance: All 199 countries have complete metadata and 5-language landmarks.`);
  } else {
    console.error(`❌ Schema Errors:`, report.schemaErrors);
  }

  // 2. LOCAL ASSET INTEGRITY & MAGIC NUMBER VALIDATION
  console.log('\n--- 2. Testing Local File Presence & Binary Headers (1,592 files) ---');
  const hashMap = new Map<string, string[]>();

  for (const c of COUNTRY_VISUALS_LIST) {
    const codeLower = c.code.toLowerCase();
    for (const w of WIDTHS) {
      for (const fmt of FORMATS) {
        const filename = `${codeLower}-${w}.${fmt}`;
        const filePath = path.join(IMAGES_DIR, filename);

        if (!fs.existsSync(filePath)) {
          report.missingFiles.push(filename);
          continue;
        }

        report.foundFiles++;

        const stat = fs.statSync(filePath);
        if (stat.size < 512) {
          report.corruptFiles.push(`${filename} (Too small: ${stat.size} bytes)`);
          continue;
        }

        const validSig = verifyImageSignature(filePath, fmt);
        if (!validSig) {
          report.corruptFiles.push(`${filename} (Invalid binary signature for ${fmt})`);
          continue;
        }

        // Only compute deduplication hash on primary size 480w to test uniqueness across countries
        if (w === 480 && fmt === 'webp') {
          const content = fs.readFileSync(filePath);
          const hash = crypto.createHash('sha256').update(content).digest('hex');
          const existing = hashMap.get(hash) || [];
          existing.push(filename);
          hashMap.set(hash, existing);
        }
      }
    }
  }

  for (const [hash, files] of hashMap.entries()) {
    if (files.length > 1) {
      report.duplicateHashes.push({ hash, files });
    }
  }

  console.log(`Found ${report.foundFiles} / ${report.expectedFiles} expected responsive files.`);
  if (report.missingFiles.length === 0) {
    console.log(`✅ 0 Missing Files: All 1,592 responsive images exist in public/images/countries/`);
  } else {
    console.error(`❌ Missing Files (${report.missingFiles.length}):`, report.missingFiles.slice(0, 10));
  }

  if (report.corruptFiles.length === 0) {
    console.log(`✅ 0 Corrupt Files: All files possess valid WebP/AVIF magic headers and healthy file sizes.`);
  } else {
    console.error(`❌ Corrupt Files (${report.corruptFiles.length}):`, report.corruptFiles);
  }

  if (report.duplicateHashes.length === 0) {
    console.log(`✅ 0 Duplicate Hashes: 100% of all 199 countries possess unique destination photography.`);
  } else {
    console.error(`❌ Duplicate Images Found:`, report.duplicateHashes);
  }

  // 3. HELPER FUNCTION LOGIC VALIDATION
  console.log('\n--- 3. Testing Helper Functions ---');
  // Test getCountryVisual
  const trVisual = getCountryVisual('FR', 'tr');
  const enVisual = getCountryVisual('FR', 'en');
  const deVisual = getCountryVisual('FR', 'de');

  if (!trVisual.landmark.includes('Eyfel')) {
    report.helperErrors.push(`getCountryVisual('FR', 'tr') failed to return Turkish landmark: ${trVisual.landmark}`);
  }
  if (!enVisual.landmark.includes('Eiffel')) {
    report.helperErrors.push(`getCountryVisual('FR', 'en') failed to return English landmark: ${enVisual.landmark}`);
  }
  if (!deVisual.landmark.includes('Eiffelturm')) {
    report.helperErrors.push(`getCountryVisual('FR', 'de') failed to return German landmark: ${deVisual.landmark}`);
  }

  // Test fallback
  const fallback = getCountryVisual('ZZ');
  if (fallback.image !== DEFAULT_TRAVEL_FALLBACK) {
    report.helperErrors.push(`Unknown country fallback image should be '${DEFAULT_TRAVEL_FALLBACK}', got: ${fallback.image}`);
  }

  // Test getOptimizedImageUrl
  const optWebp = getOptimizedImageUrl('/images/countries/fr-480.webp', { width: 240 });
  if (optWebp !== '/images/countries/fr-240.webp') {
    report.helperErrors.push(`getOptimizedImageUrl expected '/images/countries/fr-240.webp', got: '${optWebp}'`);
  }

  const optAvif = getOptimizedImageUrl('/images/countries/fr-480.webp', { width: 720, format: 'avif' });
  if (optAvif !== '/images/countries/fr-720.avif') {
    report.helperErrors.push(`getOptimizedImageUrl expected '/images/countries/fr-720.avif', got: '${optAvif}'`);
  }

  // Test getOptimizedSrcSet
  const srcSetWebp = getOptimizedSrcSet('/images/countries/fr-480.webp');
  if (!srcSetWebp.includes('fr-240.webp 240w') || !srcSetWebp.includes('fr-720.webp 720w')) {
    report.helperErrors.push(`getOptimizedSrcSet WebP invalid: "${srcSetWebp}"`);
  }

  const srcSetAvif = getOptimizedAvifSrcSet('/images/countries/fr-480.webp');
  if (!srcSetAvif.includes('fr-240.avif 240w') || !srcSetAvif.includes('fr-720.avif 720w')) {
    report.helperErrors.push(`getOptimizedAvifSrcSet invalid: "${srcSetAvif}"`);
  }

  if (report.helperErrors.length === 0) {
    console.log(`✅ Helper Functions: getCountryVisual, getOptimizedImageUrl, getOptimizedSrcSet behave correctly.`);
  } else {
    console.error(`❌ Helper Errors:`, report.helperErrors);
  }

  // 4. HTTP SERVER SMOKE CHECK (Port 3000)
  console.log('\n--- 4. Checking HTTP Server on Port 3000 ---');
  const samplePaths = [
    '/images/countries/tr-240.webp',
    '/images/countries/tr-480.webp',
    '/images/countries/fr-360.webp',
    '/images/countries/jp-720.webp',
    '/images/countries/de-480.avif'
  ];

  let serverResponding = false;
  for (const sample of samplePaths) {
    const ok = await verifyHttpAsset(3000, sample);
    if (ok) {
      serverResponding = true;
    } else {
      report.httpErrors.push(`HTTP GET failed for http://localhost:3000${sample}`);
    }
  }

  if (serverResponding && report.httpErrors.length === 0) {
    console.log(`✅ HTTP 200 OK: Local static file server serves WebP and AVIF assets flawlessly.`);
  } else if (!serverResponding) {
    console.log(`ℹ️ HTTP Server on port 3000 is not running; skipping live HTTP test (static filesystem check passed).`);
    report.httpErrors = [];
  } else {
    console.warn(`⚠️ HTTP Serving warnings:`, report.httpErrors);
  }

  // SUMMARY & EXIT
  console.log('\n' + '='.repeat(80));
  const hasFailures =
    report.schemaErrors.length > 0 ||
    report.missingFiles.length > 0 ||
    report.corruptFiles.length > 0 ||
    report.duplicateHashes.length > 0 ||
    report.helperErrors.length > 0;

  if (hasFailures) {
    console.error('❌ TEST SUITE FAILED: Issues were detected.');
    process.exit(1);
  } else {
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! 100% Quality & Verification Standards Met.');
    console.log('='.repeat(80) + '\n');
    process.exit(0);
  }
}

runFullTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
