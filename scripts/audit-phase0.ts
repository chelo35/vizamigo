/**
 * Phase 0 Technical Auditor & Image Hasher
 * Runs automated network, header, dimension, and perceptual hash (dHash) analysis on all 199 countries.
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { COUNTRY_LANDSCAPES, getCountryVisual } from '../src/data/countryVisuals';
import { getCountryName } from '../src/data/passportData';

interface CountryAuditRecord {
  code: string;
  nameTr: string;
  nameEn: string;
  landmark: string;
  url: string;
  photoId: string;
  httpStatus: number;
  contentType: string;
  byteSize: number;
  width: number;
  height: number;
  dHash: string;
  dupGroupId: string;
  dupCount: number;
  dupCountries: string[];
}

function extractPhotoId(url: string): string {
  const match = url.match(/photo-[0-9a-f-]+/i);
  return match ? match[0].toLowerCase() : url;
}

function computeDHashFromBuffer(data: Buffer): string {
  // data is 72 raw grayscale bytes (9 wide x 8 high)
  let binary = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const left = data[row * 9 + col];
      const right = data[row * 9 + col + 1];
      binary += left > right ? '1' : '0';
    }
  }
  let hex = '';
  for (let i = 0; i < 64; i += 4) {
    hex += parseInt(binary.substr(i, 4), 2).toString(16);
  }
  return hex;
}

function hammingDistance(hex1: string, hex2: string): number {
  if (hex1.length !== 16 || hex2.length !== 16) return 99;
  let dist = 0;
  for (let i = 0; i < 16; i++) {
    const v1 = parseInt(hex1[i], 16);
    const v2 = parseInt(hex2[i], 16);
    let xor = v1 ^ v2;
    while (xor > 0) {
      if (xor & 1) dist++;
      xor >>= 1;
    }
  }
  return dist;
}

async function fetchImageBuffer(url: string): Promise<{
  status: number;
  contentType: string;
  buffer: Buffer;
}> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        },
        timeout: 15000
      },
      (res) => {
        // Follow redirects if any
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchImageBuffer(res.headers.location).then(resolve).catch(reject);
          return;
        }

        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode || 0,
            contentType: res.headers['content-type'] || '',
            buffer: Buffer.concat(chunks)
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
    req.on('error', reject);
  });
}

async function run() {
  console.log('🚀 Starting Phase 0 Technical Image Audit for 199 countries...');
  const countryCodes = Object.keys(COUNTRY_LANDSCAPES);
  console.log(`Total countries in dataset: ${countryCodes.length}`);

  const records: CountryAuditRecord[] = [];

  // Concurrency worker
  const BATCH_SIZE = 10;
  for (let i = 0; i < countryCodes.length; i += BATCH_SIZE) {
    const batch = countryCodes.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (code) => {
      const visual = getCountryVisual(code);
      const nameTr = getCountryName(code, 'tr');
      const nameEn = getCountryName(code, 'en');
      const photoId = extractPhotoId(visual.image);

      try {
        const { status, contentType, buffer } = await fetchImageBuffer(visual.image);
        let width = 0;
        let height = 0;
        let dHash = '';

        if (buffer.length > 0) {
          try {
            const meta = await sharp(buffer).metadata();
            width = meta.width || 0;
            height = meta.height || 0;

            const rawGray = await sharp(buffer)
              .grayscale()
              .resize(9, 8, { fit: 'fill' })
              .raw()
              .toBuffer();
            dHash = computeDHashFromBuffer(rawGray);
          } catch (e: any) {
            console.warn(`Sharp processing error for ${code}:`, e.message);
          }
        }

        return {
          code,
          nameTr,
          nameEn,
          landmark: visual.landmark,
          url: visual.image,
          photoId,
          httpStatus: status,
          contentType,
          byteSize: buffer.length,
          width,
          height,
          dHash,
          dupGroupId: '',
          dupCount: 1,
          dupCountries: []
        };
      } catch (err: any) {
        return {
          code,
          nameTr,
          nameEn,
          landmark: visual.landmark,
          url: visual.image,
          photoId,
          httpStatus: 0,
          contentType: '',
          byteSize: 0,
          width: 0,
          height: 0,
          dHash: '',
          dupGroupId: '',
          dupCount: 1,
          dupCountries: []
        };
      }
    });

    const results = await Promise.all(promises);
    records.push(...results);
    process.stdout.write(`Processed ${records.length}/${countryCodes.length} countries...\r`);
  }

  console.log('\n\n🔍 Analyzing Duplicate Groups (Photo ID & dHash Perceptual Similarity)...');

  // 1. Group by Photo ID
  const idGroups = new Map<string, CountryAuditRecord[]>();
  for (const r of records) {
    const list = idGroups.get(r.photoId) || [];
    list.push(r);
    idGroups.set(r.photoId, list);
  }

  // 2. Cross-check dHash distance across all items (even with different photo IDs)
  // Union-Find / Disjoint Set
  const parent = new Map<string, string>();
  records.forEach((r) => parent.set(r.code, r.code));

  function find(c: string): string {
    if (parent.get(c) === c) return c;
    const root = find(parent.get(c)!);
    parent.set(c, root);
    return root;
  }

  function union(c1: string, c2: string) {
    const root1 = find(c1);
    const root2 = find(c2);
    if (root1 !== root2) parent.set(root1, root2);
  }

  // Union by identical Photo ID
  for (const [id, grp] of idGroups.entries()) {
    if (grp.length > 1 && !id.includes('placeholder')) {
      for (let j = 1; j < grp.length; j++) {
        union(grp[0].code, grp[j].code);
      }
    }
  }

  // Union by perceptual hash (Hamming distance <= 4)
  for (let a = 0; a < records.length; a++) {
    for (let b = a + 1; b < records.length; b++) {
      const rA = records[a];
      const rB = records[b];
      if (rA.dHash && rB.dHash) {
        const dist = hammingDistance(rA.dHash, rB.dHash);
        if (dist <= 4) {
          union(rA.code, rB.code);
        }
      }
    }
  }

  // Group by disjoint set roots
  const clusters = new Map<string, string[]>();
  for (const r of records) {
    const root = find(r.code);
    const list = clusters.get(root) || [];
    list.push(r.code);
    clusters.set(root, list);
  }

  // Assign cluster IDs (DUP-01, DUP-02, etc.) sorted by size descending
  const duplicateClusters = Array.from(clusters.values())
    .filter((list) => list.length > 1)
    .sort((a, b) => b.length - a.length);

  const clusterIdMap = new Map<string, { id: string; count: number; members: string[] }>();
  duplicateClusters.forEach((members, idx) => {
    const id = `TEKRAR-${String(idx + 1).padStart(2, '0')}`;
    for (const code of members) {
      clusterIdMap.set(code, { id, count: members.length, members });
    }
  });

  for (const r of records) {
    const dupInfo = clusterIdMap.get(r.code);
    if (dupInfo) {
      r.dupGroupId = dupInfo.id;
      r.dupCount = dupInfo.count;
      r.dupCountries = dupInfo.members;
    } else {
      r.dupGroupId = 'TEKİL';
      r.dupCount = 1;
      r.dupCountries = [r.code];
    }
  }

  const outPath = path.resolve(process.cwd(), 'audit_raw.json');
  fs.writeFileSync(outPath, JSON.stringify(records, null, 2), 'utf-8');
  console.log(`✅ Saved technical audit data to ${outPath}`);

  console.log(`\nDuplicate Clusters Summary:`);
  console.log(`Total Duplicate Clusters: ${duplicateClusters.length}`);
  let totalCountriesInDuplicates = 0;
  duplicateClusters.forEach((members, idx) => {
    totalCountriesInDuplicates += members.length;
    console.log(`  - TEKRAR-${String(idx + 1).padStart(2, '0')}: ${members.length} ülke -> [${members.join(', ')}]`);
  });
  console.log(`Total Countries with Duplicate Photos: ${totalCountriesInDuplicates} / 199 (${((totalCountriesInDuplicates/199)*100).toFixed(1)}%)`);
  console.log(`Unique Photo Countries: ${199 - totalCountriesInDuplicates}`);
}

run().catch((err) => {
  console.error('Fatal error during audit:', err);
  process.exit(1);
});
