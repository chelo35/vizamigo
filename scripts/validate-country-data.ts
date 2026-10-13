import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const SCHEMA_PATH = path.join(projectRoot, 'src/data/schemas/country.schema.json');
const COUNTRIES_DIR = path.join(projectRoot, 'src/data/countries');

interface SourceItem {
  url: string;
  tier: 1 | 2 | 3;
  title: string;
}

interface SourcedField<T = unknown> {
  value: T;
  status: 'verified' | 'conflict' | 'pending' | 'not_found';
  confidence: 'high' | 'medium' | 'low' | null;
  sources: SourceItem[];
  evidence_quote: string | null;
  retrieved_at: string | null;
}

interface ValidationResult {
  file: string;
  iso2: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    verifiedFields: number;
    notFoundFields: number;
    pendingFields: number;
    conflictFields: number;
  };
}

function validateSourced(fieldName: string, obj: any, errors: string[], stats: ValidationResult['stats']) {
  if (!obj || typeof obj !== 'object') {
    errors.push(`Field '${fieldName}' must be a sourced object.`);
    return;
  }
  const validStatuses = ['verified', 'conflict', 'pending', 'not_found'];
  if (!validStatuses.includes(obj.status)) {
    errors.push(`Field '${fieldName}' has invalid status: '${obj.status}'.`);
    return;
  }

  if (obj.status === 'verified') {
    stats.verifiedFields++;
    if (!Array.isArray(obj.sources) || obj.sources.length === 0) {
      errors.push(`Field '${fieldName}' is 'verified' but has no sources.`);
    } else {
      for (const [idx, s] of obj.sources.entries()) {
        if (!s.url || !s.url.startsWith('http')) {
          errors.push(`Field '${fieldName}' source[${idx}] must have a valid HTTP(S) URL.`);
        }
        if (![1, 2, 3].includes(s.tier)) {
          errors.push(`Field '${fieldName}' source[${idx}] tier must be 1, 2, or 3.`);
        }
        if (!s.title) {
          errors.push(`Field '${fieldName}' source[${idx}] must have a title.`);
        }
      }
    }
    if (!obj.evidence_quote || typeof obj.evidence_quote !== 'string') {
      errors.push(`Field '${fieldName}' is 'verified' but lacks an evidence_quote.`);
    } else if (obj.evidence_quote.length > 120) {
      errors.push(`Field '${fieldName}' evidence_quote exceeds 120 characters (${obj.evidence_quote.length}).`);
    }
    if (!obj.retrieved_at || !/^\d{4}-\d{2}-\d{2}$/.test(obj.retrieved_at)) {
      errors.push(`Field '${fieldName}' must have a valid retrieved_at date (YYYY-MM-DD).`);
    }
    if (!['high', 'medium', 'low'].includes(obj.confidence)) {
      errors.push(`Field '${fieldName}' is 'verified' but has invalid confidence: '${obj.confidence}'.`);
    }
  } else if (obj.status === 'not_found') {
    stats.notFoundFields++;
    if (obj.value !== null) {
      errors.push(`Field '${fieldName}' has status 'not_found' but value is not null.`);
    }
  } else if (obj.status === 'pending') {
    stats.pendingFields++;
  } else if (obj.status === 'conflict') {
    stats.conflictFields++;
  }
}

function validateCountryRecord(filePath: string): ValidationResult {
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  let data: any;
  const errors: string[] = [];
  const warnings: string[] = [];
  const stats = { verifiedFields: 0, notFoundFields: 0, pendingFields: 0, conflictFields: 0 };

  try {
    data = JSON.parse(content);
  } catch (err: any) {
    return {
      file: fileName,
      iso2: 'UNKNOWN',
      valid: false,
      errors: [`JSON parse error: ${err.message}`],
      warnings: [],
      stats
    };
  }

  // 1. ISO2
  if (!data.iso2 || !/^[A-Z]{2}$/.test(data.iso2)) {
    errors.push(`Invalid or missing iso2 code: '${data.iso2}'`);
  }

  // 2. Names (5 languages)
  const reqLangs = ['tr', 'en', 'de', 'ru', 'es'];
  if (!data.names || typeof data.names !== 'object') {
    errors.push('Missing names object');
  } else {
    for (const l of reqLangs) {
      if (!data.names[l]) errors.push(`Missing translation for language '${l}' in names.`);
    }
  }

  // 3. Core Sourced Fields
  validateSourced('capital', data.capital, errors, stats);
  validateSourced('currency', data.currency, errors, stats);
  validateSourced('timezone', data.timezone, errors, stats);

  // 4. Electricity
  if (data.electricity) {
    validateSourced('electricity.voltage', data.electricity.voltage, errors, stats);
    validateSourced('electricity.frequency_hz', data.electricity.frequency_hz, errors, stats);
    validateSourced('electricity.plug_types', data.electricity.plug_types, errors, stats);
  } else {
    errors.push('Missing electricity object');
  }

  // 5. Emergency
  if (data.emergency) {
    validateSourced('emergency.police', data.emergency.police, errors, stats);
    validateSourced('emergency.ambulance', data.emergency.ambulance, errors, stats);
    validateSourced('emergency.fire', data.emergency.fire, errors, stats);
    validateSourced('emergency.general', data.emergency.general, errors, stats);
    validateSourced('emergency.tourist_police', data.emergency.tourist_police, errors, stats);
  } else {
    errors.push('Missing emergency object');
  }

  // 6. Advisory
  if (!data.advisory || !Array.isArray(data.advisory.agencies)) {
    errors.push('Missing advisory.agencies array');
  } else {
    for (const [idx, ag] of data.advisory.agencies.entries()) {
      if (!['US_STATE', 'UK_FCDO', 'DE_AA', 'CA_GAC', 'AU_DFAT', 'TR_MFA'].includes(ag.agency)) {
        errors.push(`advisory.agencies[${idx}] invalid agency '${ag.agency}'`);
      }
      if (!ag.source || !ag.source.url) {
        errors.push(`advisory.agencies[${idx}] missing source.url`);
      }
      if (!ag.retrieved_at) {
        errors.push(`advisory.agencies[${idx}] missing retrieved_at`);
      }
    }
  }

  // 7. Media Images
  if (!data.media || !Array.isArray(data.media.images) || data.media.images.length === 0) {
    errors.push('Missing or empty media.images array');
  } else {
    for (const [idx, img] of data.media.images.entries()) {
      if (!img.landmark) errors.push(`media.images[${idx}] missing landmark`);
      if (!img.license) errors.push(`media.images[${idx}] missing license`);
      if (!img.source_url) errors.push(`media.images[${idx}] missing source_url`);
      if (!img.attribution_text) errors.push(`media.images[${idx}] missing attribution_text`);
      if (!img.alt || typeof img.alt !== 'object') {
        errors.push(`media.images[${idx}] missing localized alt object`);
      }
    }
  }

  // 8. Last Reviewed
  if (!data.last_reviewed || !/^\d{4}-\d{2}-\d{2}$/.test(data.last_reviewed)) {
    errors.push('Missing or invalid last_reviewed date (YYYY-MM-DD)');
  }

  return {
    file: fileName,
    iso2: data.iso2 || 'UNKNOWN',
    valid: errors.length === 0,
    errors,
    warnings,
    stats
  };
}

export function runValidation() {
  console.log('🔍 [Vizamigo Data Gate] Validating verified country records against schema...');
  if (!fs.existsSync(COUNTRIES_DIR)) {
    console.error(`❌ Countries directory does not exist: ${COUNTRIES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(COUNTRIES_DIR).filter(f => f.endsWith('.json'));
  if (files.length === 0) {
    console.warn(`⚠️ No country JSON files found in ${COUNTRIES_DIR}`);
    return;
  }

  let allValid = true;
  let totalVerified = 0;
  let totalNotFound = 0;

  for (const f of files) {
    const fullPath = path.join(COUNTRIES_DIR, f);
    const res = validateCountryRecord(fullPath);
    if (!res.valid) {
      allValid = false;
      console.error(`❌ [${res.iso2}] ${res.file} FAILED (${res.errors.length} errors):`);
      res.errors.forEach(e => console.error(`   - ${e}`));
    } else {
      totalVerified += res.stats.verifiedFields;
      totalNotFound += res.stats.notFoundFields;
      console.log(`✅ [${res.iso2}] ${res.file} PASSED (Verified: ${res.stats.verifiedFields}, Not Found: ${res.stats.notFoundFields})`);
    }
  }

  console.log('\n========================================');
  console.log(`📊 Summary: ${files.length} records processed.`);
  console.log(`   Total Verified Fields: ${totalVerified}`);
  console.log(`   Total Not Found (Null) Fields: ${totalNotFound}`);
  console.log(`   Overall Status: ${allValid ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log('========================================\n');

  if (!allValid) {
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runValidation();
}
