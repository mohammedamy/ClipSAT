#!/usr/bin/env node
// scripts/ci/validate-figures-and-pdfs.mjs — CI Gate #6: Figure Fidelity, Worksheets & 768 PDFs Gate

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const figRes = spawnSync(process.execPath, ['scripts/validate-figures.js'], {
  cwd: ROOT,
  stdio: 'inherit'
});
if (figRes.status !== 0) {
  console.error('❌ CI Gate #6 failed in validate-figures.js');
  process.exit(figRes.status || 1);
}

const errors = [];

// Verify all 384 worksheet JSONs (>= 25 unique items, 0 intra-sheet duplicates)
const tpRoot = path.join(ROOT, 'tools', 'worksheet_gen', 'topics');
let wsCount = 0;
for (const tr of fs.readdirSync(tpRoot).sort()) {
  const dp = path.join(tpRoot, tr);
  if (!fs.statSync(dp).isDirectory()) continue;
  for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.json'))) {
    wsCount++;
    const ws = JSON.parse(fs.readFileSync(path.join(dp, f), 'utf8'));
    const qs = (ws.sections || []).flatMap((s) => s.questions || []);
    if (qs.length < 25) {
      errors.push(`Worksheet ${tr}/${f} has only ${qs.length} questions (< 25 minimum)`);
    }
    const seen = new Set();
    for (const q of qs) {
      const key = String(q.q || q.text || '').toLowerCase().replace(/\s+/g, ' ').trim();
      if (seen.has(key)) errors.push(`Duplicate intra-worksheet question in ${tr}/${f}`);
      seen.add(key);
    }
  }
}

// Verify all 768 PDFs >= 35 KB and 0 stray notebooks / unrendered linalg headers
const dlRoot = path.join(ROOT, 'public', 'downloads');
let pdfCount = 0;
for (const tr of fs.readdirSync(dlRoot).sort()) {
  const dp = path.join(dlRoot, tr);
  if (!fs.statSync(dp).isDirectory()) continue;
  for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.pdf'))) {
    pdfCount++;
    const sz = fs.statSync(path.join(dp, f)).size;
    if (sz < 35000) {
      errors.push(`Stub PDF (< 35 KB): public/downloads/${tr}/${f} (${sz} bytes)`);
    }
  }
}
if (pdfCount < 768) {
  errors.push(`Expected >= 768 PDFs in public/downloads/, found ${pdfCount}`);
}
if (fs.existsSync(path.join(dlRoot, 'sat', 'generate_all_sat_pdfs.ipynb'))) {
  errors.push('Stray notebook public/downloads/sat/generate_all_sat_pdfs.ipynb must not exist');
}

if (errors.length > 0) {
  console.error(`❌ CI Gate #6 FAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 25)) console.error('  -', e);
  process.exit(1);
}

console.log(`✅ CI Gate #6 PASSED: All figures, ${wsCount} worksheets & ${pdfCount} PDFs (>= 35 KB) verified.`);
