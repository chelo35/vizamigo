import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface BatchCountryCandidate {
  code: string;
  nameTr: string;
  nameEn: string;
  phase0Status: string;
  phase0Reason: string;
  oldImageUrl: string;
  symbols: {
    main: string;
    alt1: string;
    alt2: string;
  };
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
  candidateAlt: {
    title: string;
    landmark: string;
    url: string;
    sourcePageUrl: string;
    artist: string;
    license: string;
    dimensions: string;
    source: string;
  };
  verificationMethod: string;
  confidence: string;
}

export const BATCH_9_DATA: BatchCountryCandidate[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'batch9_data.json'), 'utf8')
);

function generateHtmlReport(data: BatchCountryCandidate[]): string {
  const rows = data.map((c, index) => {
    const isOk = c.phase0Status === 'OK';
    const statusBadge = isOk
      ? `<span class="badge px-2 py-0.5 rounded text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/80">MEVCUT OK</span>`
      : `<span class="badge px-2 py-0.5 rounded text-xs font-semibold bg-rose-950/60 text-rose-400 border border-rose-800/80">DEĞİŞECEK</span>`;

    const confClass = c.confidence === 'Yüksek'
      ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50'
      : c.confidence === 'Orta'
      ? 'bg-amber-900/40 text-amber-300 border-amber-700/50'
      : 'bg-rose-900/40 text-rose-300 border-rose-700/50';

    return `
      <tr class="border-b border-slate-800 hover:bg-slate-900/40 transition">
        <td class="p-4 align-top w-48">
          <div class="flex items-center gap-2">
            <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">${c.code}</span>
            <span class="text-xs text-slate-500 font-mono">#${index + 161}</span>
          </div>
          <div class="font-bold text-white text-base mt-1">${c.nameTr}</div>
          <div class="text-xs text-slate-400">${c.nameEn}</div>
          <div class="mt-2">${statusBadge}</div>
        </td>

        <td class="p-4 align-top w-56">
          <div class="relative w-44 h-28 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow">
            <img src="${c.oldImageUrl}" alt="${c.nameTr} Eski" class="w-full h-full object-cover" loading="lazy" referrerpolicy="no-referrer" />
          </div>
          <div class="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
            ${isOk ? '<span class="text-emerald-400 font-semibold">Doğrulanmış Orijinal</span>' : `<span class="text-rose-400">${c.phase0Reason}</span>`}
          </div>
        </td>

        <td class="p-4 align-top w-72">
          <div class="text-xs space-y-1.5">
            <div class="font-semibold text-amber-300 flex items-start gap-1">
              <span>⭐️ 1.</span> <span>${c.candidatePrimary.landmark}</span>
            </div>
            <div class="text-slate-300 flex items-start gap-1 pl-1">
              <span>🔹 2.</span> <span>${c.candidateAlt.landmark}</span>
            </div>
          </div>
        </td>

        <td class="p-4 align-top w-72">
          <div class="relative w-56 h-36 rounded-lg overflow-hidden border-2 border-emerald-500/60 shadow-lg group bg-slate-900">
            <img src="${c.candidatePrimary.url}" alt="${c.candidatePrimary.landmark}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" referrerpolicy="no-referrer" />
          </div>
          <div class="mt-2 text-xs">
            <div class="font-semibold text-emerald-300">${c.candidatePrimary.landmark}</div>
            <div class="text-slate-400 text-[11px] mt-0.5">📐 ${c.candidatePrimary.dimensions} px</div>
            <div class="text-slate-400 text-[11px]">👤 ${c.candidatePrimary.artist}</div>
            <div class="text-slate-400 text-[11px]">📜 ${c.candidatePrimary.license}</div>
            <a href="${c.candidatePrimary.sourcePageUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline text-[11px] inline-flex items-center gap-1 mt-1">
              🔗 Kaynak (${c.candidatePrimary.source})
            </a>
          </div>
        </td>

        <td class="p-4 align-top w-72">
          <div class="relative w-56 h-36 rounded-lg overflow-hidden border border-slate-700 shadow group bg-slate-900">
            <img src="${c.candidateAlt.url}" alt="${c.candidateAlt.landmark}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" referrerpolicy="no-referrer" />
          </div>
          <div class="mt-2 text-xs">
            <div class="font-semibold text-slate-300">${c.candidateAlt.landmark}</div>
            <div class="text-slate-400 text-[11px] mt-0.5">📐 ${c.candidateAlt.dimensions} px</div>
            <div class="text-slate-400 text-[11px]">👤 ${c.candidateAlt.artist}</div>
            <div class="text-slate-400 text-[11px]">📜 ${c.candidateAlt.license}</div>
            <a href="${c.candidateAlt.sourcePageUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline text-[11px] inline-flex items-center gap-1 mt-1">
              🔗 Kaynak (${c.candidateAlt.source})
            </a>
          </div>
        </td>

        <td class="p-4 align-top w-56">
          <div class="inline-block px-2 py-0.5 text-xs font-semibold rounded border ${confClass}">
            ${c.confidence}
          </div>
          <div class="text-xs text-slate-400 mt-2 leading-relaxed">
            ${c.verificationMethod}
          </div>
        </td>
      </tr>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Vizamigo - Batch 9 Ülke Sembol ve Aday Görsel Denetimi (161-180)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-8">
  <div class="max-w-[1700px] mx-auto">
    <div class="mb-8 border-b border-slate-800 pb-6">
      <div class="flex items-center gap-3 mb-2">
        <span class="px-3 py-1 bg-blue-600/30 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/40">FAZ 1 — BATCH 9 / 10</span>
      </div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Batch 9: Ülke 161–180 Sembol Listesi ve Aday Görseller</h1>
      <p class="text-slate-400 mt-2 text-sm leading-relaxed max-w-4xl">
        Kuzey, Orta ve Güney Amerika ile Karayipler ülkeleri (Guatemala, Honduras, Haiti, Jamaika, Saint Kitts ve Nevis, Saint Lucia, Meksika, Nikaragua, Panama, El Salvador, Trinidad ve Tobago, Amerika Birleşik Devletleri, Saint Vincent ve Grenadinler, Arjantin, Bolivya, Brezilya, Şili, Kolombiya, Ekvador, Guyana) için sembol eşleştirmeleri ve resmi Wikimedia Commons API kaynaklı doğrulanmış aday görseller.
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div class="text-xs text-slate-400 font-medium">Toplam Ülke</div>
          <div class="text-2xl font-bold text-white mt-1">20</div>
          <div class="text-[11px] text-slate-500 mt-0.5">Sıra #161 - #180</div>
        </div>
        <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div class="text-xs text-slate-400 font-medium">Değişecek / Yenilenecek</div>
          <div class="text-2xl font-bold text-rose-400 mt-1">18</div>
          <div class="text-[11px] text-slate-500 mt-0.5">Tokyo replikası / Halong / Dalga / Bisiklet kopyaları</div>
        </div>
        <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div class="text-xs text-slate-400 font-medium">Mevcut Korunan (OK)</div>
          <div class="text-2xl font-bold text-emerald-400 mt-1">2</div>
          <div class="text-[11px] text-slate-500 mt-0.5">BR (Brezilya - Rio), CO (Kolombiya - Cartagena)</div>
        </div>
        <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div class="text-xs text-slate-400 font-medium">Doğrulama Güveni</div>
          <div class="text-2xl font-bold text-emerald-400 mt-1">%100</div>
          <div class="text-[11px] text-slate-500 mt-0.5">20/20 Yüksek Güven</div>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto bg-slate-900/40 border border-slate-800 rounded-2xl shadow-xl">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400">
            <th class="p-4">Ülke</th>
            <th class="p-4">Mevcut Görsel (Faz 0)</th>
            <th class="p-4">Temsili Turistik Semboller</th>
            <th class="p-4 text-emerald-400 font-bold">Önerilen Ana Aday</th>
            <th class="p-4 text-slate-300">Alternatif Aday</th>
            <th class="p-4">Doğrulama & Güven</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>

    <div class="mt-8 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-white">Batch 9 Değerlendirme Özeti</h3>
        <p class="text-xs text-slate-400 mt-1">
          ABD'deki Tokyo replika Özgürlük Heykeli, Meksika'daki Halong Körfezi kopyası, Arjantin'deki bisiklet yarışı, Bolivya ve Şili'deki sisli çam ormanı tekrarları özgün dünya harikaları ve milli parklarıyla yenilendi.
        </p>
      </div>
      <div class="text-xs text-slate-400 font-mono">
        Vizamigo Country Visuals Audit - Phase 1 Batch 9
      </div>
    </div>
  </div>
</body>
</html>`;
}

function main() {
  const html = generateHtmlReport(BATCH_9_DATA);
  const outPath = path.join(process.cwd(), 'batch-9.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`Generated report at ${outPath}`);
}

main();
