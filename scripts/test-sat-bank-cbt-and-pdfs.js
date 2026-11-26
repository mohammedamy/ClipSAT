#!/usr/bin/env node
/**
 * scripts/test-sat-bank-cbt-and-pdfs.js
 * Verifies the complete Digital SAT Question Bank conversion (ALL EASY, ALL MEDIUM, ALL HARD):
 *   1. All 3 CBT index JSONs (770 + 680 + 645 = 2,095 items) and 85 shards exist and are valid.
 *   2. 100% resolved MCQ & multi-answer SPR keys (incl. fractional/decimal anchor cases).
 *   3. All 6 ClipSAT-branded vector PDFs exist, meet size bounds, carry ClipSAT branding,
 *      and the 3 student practice PDFs contain zero answer/rationale spoilers.
 *   4. CBT simulator exposes openSatBankCBT, PAPERS.sat has 7 entries, loader forwards it,
 *      and _site/sat/index.html + _site/ar/sat/index.html render the CBT + PDF download links.
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const PACK_DIR = path.join(ROOT, 'public', 'downloads', 'sat', 'bank-packs');
const CBT_DIR = path.join(PACK_DIR, 'cbt');

let passed = 0;
let failed = 0;

function check(label, fn) {
  try {
    fn();
    console.log(`  ✓ ${label}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${label}`);
    console.error(`    ${err.stack || err.message}`);
    failed++;
  }
}

console.log('\n── Running SAT Bank (Easy/Medium/Hard) CBT & ClipSAT PDFs Verification ──');

const EXPECTED_TIERS = [
  { tier: 'easy', total: 770, mcq: 657, spr: 113 },
  { tier: 'medium', total: 680, mcq: 522, spr: 158 },
  { tier: 'hard', total: 645, mcq: 413, spr: 232 },
];

check('All 3 CBT tier index JSONs & shards exist with exact counts (2,095 total items)', () => {
  let grandTotal = 0;
  for (const cfg of EXPECTED_TIERS) {
    const idxPath = path.join(CBT_DIR, `${cfg.tier}-index.json`);
    assert.ok(fs.existsSync(idxPath), `Missing ${idxPath}`);
    const idxData = JSON.parse(fs.readFileSync(idxPath, 'utf8'));
    assert.strictEqual(idxData.total, cfg.total, `${cfg.tier} total mismatch`);
    assert.strictEqual(idxData.mcqCount, cfg.mcq, `${cfg.tier} mcqCount mismatch`);
    assert.strictEqual(idxData.sprCount, cfg.spr, `${cfg.tier} sprCount mismatch`);
    assert.strictEqual(idxData.items.length, cfg.total, `${cfg.tier} items.length mismatch`);

    const numShards = Math.ceil(cfg.total / idxData.shardSize);
    const loadedShards = {};
    for (let s = 0; s < numShards; s++) {
      const pad = String(s).padStart(2, '0');
      const shPath = path.join(CBT_DIR, `${cfg.tier}-${pad}.json`);
      assert.ok(fs.existsSync(shPath), `Missing shard ${shPath}`);
      loadedShards[s] = JSON.parse(fs.readFileSync(shPath, 'utf8'));
    }

    for (let i = 0; i < idxData.items.length; i++) {
      const it = idxData.items[i];
      assert.strictEqual(it.idx, i, `${cfg.tier} idx sequence mismatch at ${i}`);
      assert.ok(['Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry'].includes(it.domain),
        `Invalid domain on ${it.id}: ${it.domain}`);
      if (it.type === 'mcq') {
        assert.ok(Number.isInteger(it.answer) && it.answer >= 0 && it.answer <= 3, `Bad MCQ answer on ${it.id}`);
      } else {
        assert.strictEqual(it.type, 'spr');
        assert.ok(it.sprAnswer && Array.isArray(it.sprAnswers) && it.sprAnswers.length >= 1, `Missing SPR answers on ${it.id}`);
      }

      const sh = loadedShards[Math.floor(i / idxData.shardSize)];
      const asset = sh.items[String(i)];
      assert.ok(asset && asset.stem && asset.stem.src.startsWith('data:image/png;base64,'), `Missing stem PNG for ${it.id}`);
      assert.ok(asset.sol && asset.sol.src.startsWith('data:image/png;base64,'), `Missing sol PNG for ${it.id}`);
      if (it.type === 'mcq') {
        assert.ok(Array.isArray(asset.choices) && asset.choices.length === 4, `Expected 4 choice PNGs for ${it.id}`);
        for (const ch of asset.choices) {
          assert.ok(ch && ch.src.startsWith('data:image/png;base64,') && ch.w > 0 && ch.h > 0, `Invalid choice PNG on ${it.id}`);
        }
      }
    }
    grandTotal += idxData.total;
  }
  assert.strictEqual(grandTotal, 2095, 'Grand total across Easy+Medium+Hard must equal 2,095');
});

check('Tricky multi-answer and vector-fraction SPR anchor items resolved accurately', () => {
  const med = JSON.parse(fs.readFileSync(path.join(CBT_DIR, 'medium-index.json'), 'utf8'));
  const hard = JSON.parse(fs.readFileSync(path.join(CBT_DIR, 'hard-index.json'), 'utf8'));
  const byId = new Map([...med.items, ...hard.items].map((x) => [x.id, x]));

  assert.ok(byId.get('002dba45').sprAnswers.includes('3/17'));
  assert.ok(byId.get('a4f61d75').sprAnswers.includes('7') && byId.get('a4f61d75').sprAnswers.includes('13'));
  assert.ok(byId.get('9ee22c16').sprAnswers.includes('3540'));
  assert.ok(byId.get('40c09d66').sprAnswers.includes('7/6'));
  assert.ok(byId.get('eeb4143c').sprAnswers.includes('10/3') && byId.get('eeb4143c').sprAnswers.includes('25/6'));
  assert.ok(byId.get('fb58c0db').sprAnswers.includes('1/6'));
});

check('All 6 ClipSAT-branded vector PDFs exist, fit < 48 MB, carry ClipSAT branding, and practice PDFs are spoiler-free', () => {
  for (const cfg of EXPECTED_TIERS) {
    const prac = path.join(PACK_DIR, `clipsat-sat-all-${cfg.tier}-practice.pdf`);
    const ak = path.join(PACK_DIR, `clipsat-sat-all-${cfg.tier}-answerkey.pdf`);
    for (const p of [prac, ak]) {
      assert.ok(fs.existsSync(p), `Missing PDF ${p}`);
      const sz = fs.statSync(p).size;
      assert.ok(sz > 3 * 1024 * 1024 && sz < 48 * 1024 * 1024, `PDF size out of bounds (${(sz / 1048576).toFixed(2)} MB): ${p}`);
    }
    const pracCheck = execFileSync('/usr/bin/python3', [
      '-c',
      `import fitz, sys
d = fitz.open(sys.argv[1])
p0 = d[0].get_text("text")
assert "ClipSAT" in p0 and "clipsat.org" in p0, "Missing ClipSAT branding on page 1"
spoilers = sum(1 for pg in d if "Rationale" in pg.get_text("text") or "Correct Answer:" in pg.get_text("text"))
print(f"{len(d)}|{spoilers}")`,
      prac
    ], { encoding: 'utf8' }).trim();
    const [pages, spoilers] = pracCheck.split('|').map(Number);
    assert.ok(pages >= 50, `Practice PDF ${cfg.tier} unexpectedly short (${pages} pages)`);
    assert.strictEqual(spoilers, 0, `Practice PDF ${cfg.tier} leaked Rationale/Correct Answer on ${spoilers} page(s)`);
  }
});

check('CBT simulator & loader wire openSatBankCBT, 7 SAT papers, and multi-answer SPR matching', () => {
  const loaderSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '17b-mock-exam-loader.js'), 'utf8');
  assert.ok(loaderSrc.includes("_forward('openSatBankCBT')"), '17b-mock-exam-loader.js must forward openSatBankCBT');

  const cbtSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '17-mock-exam-mode.js'), 'utf8');
  const win = { window: null, document: { getElementById: () => null, querySelectorAll: () => [], body: { classList: { add() {}, remove() {}, contains: () => false } } }, localStorage: { getItem: () => null, setItem() {}, removeItem() {} } };
  win.window = win;
  vm.runInNewContext(cbtSrc, { window: win, document: win.document, localStorage: win.localStorage, console, Math, Object, Array, Number, String, Boolean, Set, Promise, JSON, parseInt, parseFloat, isNaN, setInterval, clearInterval });

  assert.strictEqual(typeof win.openSatBankCBT, 'function', 'window.openSatBankCBT must be defined');
  assert.strictEqual(win.CSMockExamConfig.PAPERS.sat.length, 7, 'PAPERS.sat must include 4 standard + 3 bank tiers');
  assert.strictEqual(win.CSSatAdaptive.matchSprValue('3/17', ['3/17', '.1764', '.1765']), true);
  assert.strictEqual(win.CSSatAdaptive.matchSprValue('0.1765', ['3/17', '.1764', '.1765']), true);
  assert.strictEqual(win.CSSatAdaptive.matchSprValue('3540', ['3,540', '3540']), true);
  assert.strictEqual(win.CSSatAdaptive.matchSprValue('13', ['7', '8', '13']), true);
  assert.strictEqual(win.CSSatAdaptive.matchSprValue('99', ['7', '8', '13']), false);
});

check('Built _site/sat/index.html & _site/ar/sat/index.html expose Easy/Medium/Hard CBT & ClipSAT PDF links', () => {
  for (const rel of ['sat/index.html', path.join('ar', 'sat', 'index.html')]) {
    const p = path.join(ROOT, '_site', rel);
    assert.ok(fs.existsSync(p), `Missing _site/${rel}`);
    const html = fs.readFileSync(p, 'utf8');
    for (const tier of ['easy', 'medium', 'hard']) {
      assert.ok(html.includes(`openSatBankCBT('${tier}')`), `_site/${rel} missing openSatBankCBT('${tier}')`);
      assert.ok(html.includes(`/downloads/sat/bank-packs/clipsat-sat-all-${tier}-practice.pdf`), `_site/${rel} missing ${tier} practice PDF link`);
      assert.ok(html.includes(`/downloads/sat/bank-packs/clipsat-sat-all-${tier}-answerkey.pdf`), `_site/${rel} missing ${tier} answerkey PDF link`);
    }
  }
});

console.log(`\n── SAT Bank Verification Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) process.exit(1);
console.log('✅ All SAT Bank CBT & ClipSAT PDF checks passed!\n');
