'use strict';

const fs = require('fs');
const path = require('path');
const katex = require('../../node_modules/katex');

const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(ROOT, 'content', 'olympiad');
const META_PATH = path.join(OUT_DIR, '_meta.json');

const ch01_04 = require('./ch01_04_core_alg_nt_combo');
const ch05_06 = require('./ch05_06_rec_circles');
const ch07_08 = require('./ch07_08_trig_inv');
const ch09_10 = require('./ch09_10_nsmo');
const ch11_12 = require('./ch11_12_kaust');

const chapters = [
  ...ch01_04,
  ...ch05_06,
  ...ch07_08,
  ...ch09_10,
  ...ch11_12
];

const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
const expectedOrder = meta.chapterOrder;

if (chapters.length !== expectedOrder.length) {
  throw new Error(`Expected ${expectedOrder.length} chapters, got ${chapters.length}`);
}

const errors = [];

function checkString(str, loc) {
  if (typeof str !== 'string') return;
  if (str.includes('$')) {
    errors.push(`${loc}: contains forbidden '$' character`);
  }
  if (/\bwait\b/i.test(str)) {
    errors.push(`${loc}: contains drafting word 'wait': ${str.slice(0, 120)}`);
  }
  // Check KaTeX math blocks \( ... \) and \[ ... \]
  const inlineRe = /\\\(([\s\S]*?)\\\)/g;
  let m;
  while ((m = inlineRe.exec(str)) !== null) {
    try {
      katex.renderToString(m[1], { displayMode: false, throwOnError: true, strict: false });
    } catch (e) {
      errors.push(`${loc}: inline KaTeX error: ${e.message} in \\(${m[1]}\\)`);
    }
  }
  const dispRe = /\\\[([\s\S]*?)\\\]/g;
  while ((m = dispRe.exec(str)) !== null) {
    try {
      katex.renderToString(m[1], { displayMode: true, throwOnError: true, strict: false });
    } catch (e) {
      errors.push(`${loc}: display KaTeX error: ${e.message} in \\[${m[1]}\\]`);
    }
  }
}

function walk(node, loc) {
  if (node == null) return;
  if (typeof node === 'string') {
    checkString(node, loc);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, idx) => walk(item, `${loc}[${idx}]`));
    return;
  }
  if (typeof node === 'object') {
    if ('en' in node && 'ar' in node) {
      if (typeof node.en !== 'string' || !node.en.trim()) {
        errors.push(`${loc}.en: empty or non-string`);
      }
      if (typeof node.ar !== 'string' || !node.ar.trim()) {
        errors.push(`${loc}.ar: empty or non-string`);
      }
    }
    for (const [k, v] of Object.entries(node)) {
      walk(v, `${loc}.${k}`);
    }
  }
}

chapters.forEach((ch, idx) => {
  if (ch.id !== expectedOrder[idx]) {
    errors.push(`Chapter ${idx}: id '${ch.id}' !== expected '${expectedOrder[idx]}'`);
  }
  walk(ch, ch.id);
});

if (errors.length > 0) {
  console.error(`Found ${errors.length} validation errors:`);
  errors.slice(0, 40).forEach(e => console.error('  -', e));
  process.exit(1);
}

// Clean obsolete chapter JSON files (keep _meta.json and _practice-set.json)
const validFiles = new Set(['_meta.json', '_practice-set.json', ...expectedOrder.map(id => `${id}.json`)]);
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith('.json') && !validFiles.has(f)) {
    fs.unlinkSync(path.join(OUT_DIR, f));
    console.log(`Removed obsolete chapter file: ${f}`);
  }
}

for (const ch of chapters) {
  const outPath = path.join(OUT_DIR, `${ch.id}.json`);
  fs.writeFileSync(outPath, JSON.stringify(ch, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${ch.id}.json (${(ch.sections || []).length} sections)`);
}

console.log(`SUCCESS: All ${chapters.length} Olympiad chapters validated (0 KaTeX errors, 0 '$', 100% bilingual) and written!`);
