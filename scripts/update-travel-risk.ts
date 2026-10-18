import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as jsonParse } from 'jsonc-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const countriesDir = path.join(projectRoot, 'src/data/countries');

/**
 * Normalise agency level to a numeric 1‑4 scale.
 * US_STATE uses numeric levels directly.
 * UK_FCDO uses numeric levels (1‑4).
 * DE_AA uses textual levels; we map known strings.
 */
function mapLevel(agency: string, level: any): number | null {
  if (typeof level === 'number') return level;
  if (typeof level === 'string') {
    const lowered = level.toLowerCase();
    if (lowered.includes('unbedenklich') || lowered.includes('low')) return 1;
    if (lowered.includes('hinweis') || lowered.includes('medium')) return 2;
    if (lowered.includes('warnung') || lowered.includes('high')) return 3;
    if (lowered.includes('vermeiden') || lowered.includes('avoid')) return 4;
  }
  return null;
}

function computeCombinedLevel(agencies: any[]): number | null {
  const levels: number[] = [];
  for (const ag of agencies) {
    const mapped = mapLevel(ag.agency, ag.level);
    if (mapped !== null) levels.push(mapped);
  }
  if (levels.length === 0) return null;
  // Conservative: use the highest risk level among agencies.
  return Math.max(...levels);
}

function updateCountryFile(filePath: string): boolean {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const errors: any[] = [];
  const data = jsonParse(raw, errors, { allowTrailingComma: true });
  if (errors.length) {
    console.warn(`⚠️ Skipping ${filePath}: JSON parse errors`);
    return false;
  }

  // Preserve existing field if already present.
  if (data.travelRiskLevel !== undefined) return false;

  // Prefer explicit combined_level if present.
  let combined = data.advisory?.combined_level;
  if (combined === undefined) {
    const agencies = data.advisory?.agencies;
    if (Array.isArray(agencies)) {
      combined = computeCombinedLevel(agencies);
    }
  }

  if (combined !== undefined && combined !== null) {
    data.travelRiskLevel = combined;
    const formatted = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, formatted + '\n');
    return true;
  }
  return false;
}

function main() {
  const files = fs.readdirSync(countriesDir).filter(f => f.endsWith('.json'));
  let updated = 0;
  for (const f of files) {
    const fp = path.join(countriesDir, f);
    if (updateCountryFile(fp)) updated++;
  }
  console.log(`✅ Updated ${updated} country files with travelRiskLevel`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
