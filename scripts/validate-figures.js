#!/usr/bin/env node
/**
 * scripts/validate-figures.js
 * Wave 1 — WP-18 Figure Integrity & Non-Boilerplate Validator
 *
 * Verifies across bank-data/*.json, content/<track>/*.json, and
 * tools/worksheet_gen/topics/<track>/*.json:
 *   1. Every bank has >= 250 clean figures.
 *   2. Zero canned boilerplate figures ("Quantitative Reference Profile",
 *      "Discrete Term / Magnitude Comparison", "Diagnostic Function Check", "Item I").
 *   3. Every figure renders valid SVG/HTML via window._renderFig with 0 NaN/undefined.
 *   4. Zero figureProblem structural/leak mismatches across all banks and practice sets.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'bank-data');
const CONTENT_DIR = path.join(ROOT, 'content');
const WS_DIR = path.join(ROOT, 'tools', 'worksheet_gen', 'topics');

const win = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02c-figures.js'), 'utf8'))(win);
new Function('window', fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '05b-ai-question-verifier.js'), 'utf8'))(win);
const renderFig = win._renderFig;
const figureProblem = win.ClipSATVerifyAI._internal.figureProblem;

const BANNED_TITLES = new Set([
  'Quantitative Reference Profile',
  'Discrete Term / Magnitude Comparison',
  'Diagnostic Function Check'
]);

let errors = 0;
let checked = 0;

function fail(where, msg) {
  errors++;
  if (errors <= 25) console.error(`  ✗ ${where}: ${msg}`);
}

function checkFigure(fig, qContext, where) {
  checked++;
  if (!fig || typeof fig !== 'object') {
    fail(where, 'figure is not an object');
    return;
  }
  if (fig.title && BANNED_TITLES.has(fig.title)) {
    fail(where, `banned canned boilerplate figure title "${fig.title}"`);
  }
  const js = JSON.stringify(fig);
  if (js.includes('"Item I"') && js.includes('"Item II"')) {
    fail(where, 'banned canned "Item I / Item II" figure');
  }
  const html = renderFig(fig);
  if (!html || html.length < 40) {
    fail(where, 'window._renderFig returned empty or truncated output');
    return;
  }
  if (/\bNaN\b|\bundefined\b/.test(html)) {
    fail(where, 'rendered figure output contains NaN or undefined');
  }
  if (qContext) {
    const fp = figureProblem(JSON.parse(JSON.stringify(fig)), qContext);
    if (fp) fail(where, `figureProblem: ${fp}`);
  }
}

// 1. Validate all 31 question banks
for (const f of fs.readdirSync(BANK_DIR).filter((x) => x.endsWith('.json')).sort()) {
  const bank = JSON.parse(fs.readFileSync(path.join(BANK_DIR, f), 'utf8'));
  const pool = bank.pool || [];
  let bankFigs = 0;
  pool.forEach((q, idx) => {
    if (!q.figure) return;
    bankFigs++;
    checkFigure(q.figure, q, `bank-data/${f}[${idx}] (${q.id})`);
  });
  if (bankFigs < 250) {
    fail(`bank-data/${f}`, `expected >= 250 figures, found ${bankFigs}`);
  }
}

// 2. Validate content/<track>/*.json (static figures + _practice-set.json)
for (const tr of fs.readdirSync(CONTENT_DIR).sort()) {
  const td = path.join(CONTENT_DIR, tr);
  if (!fs.statSync(td).isDirectory()) continue;
  for (const fn of fs.readdirSync(td).filter((x) => x.endsWith('.json')).sort()) {
    const fp = path.join(td, fn);
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
    if (fn === '_practice-set.json') {
      (data.items || []).forEach((it, idx) => {
        const fg = it.figure || it.fig;
        if (!fg) return;
        const qCtx = {
          text: (it.question && it.question.en) || '',
          choices: it.choices,
          answer: it.answer,
          domain: it.domain || tr
        };
        checkFigure(fg, qCtx, `content/${tr}/${fn}[${idx}]`);
      });
    } else if (!fn.startsWith('_')) {
      (function scanBlocks(node) {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) { node.forEach(scanBlocks); return; }
        if (node.kind === 'figure' && node.figure) {
          checkFigure(node.figure, null, `content/${tr}/${fn}`);
          return;
        }
        for (const v of Object.values(node)) {
          if (v && typeof v === 'object') scanBlocks(v);
        }
      })(data);
    }
  }
}

// 3. Validate tools/worksheet_gen/topics/<track>/*.json
for (const tr of fs.readdirSync(WS_DIR).sort()) {
  const td = path.join(WS_DIR, tr);
  if (!fs.statSync(td).isDirectory()) continue;
  for (const fn of fs.readdirSync(td).filter((x) => x.endsWith('.json')).sort()) {
    const ws = JSON.parse(fs.readFileSync(path.join(td, fn), 'utf8'));
    (ws.sections || []).forEach((sec, si) => {
      (sec.questions || []).forEach((wq, qi) => {
        const fg = wq.figure || wq.fig;
        if (!fg) return;
        const qCtx = {
          text: String(wq.q || wq.text || ''),
          choices: wq.choices,
          answer: typeof wq.correct === 'number' ? wq.correct : wq.answer
        };
        checkFigure(fg, qCtx, `worksheets/${tr}/${fn} s${si}q${qi}`);
      });
    });
  }
}

console.log(`Checked ${checked.toLocaleString()} figures across banks, chapters, practice sets & worksheets: ${errors} error(s).`);
if (errors > 0) {
  console.error('❌ Figure validation failed.');
  process.exit(1);
}
console.log('✅ Figure validation passed.');
