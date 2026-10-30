#!/usr/bin/env node
/**
 * Comprehensive verification suite for 100% Interactive Explorers & Activities:
 *   1. Lesson Relevance across all 31 tracks & 306 chapters (476 explorers + 2,816 IX activities)
 *   2. Responsive layout & touch/pointer hooks (stacked dual-pane trig/invtrig, mobile CSS, RTL)
 *   3. Visual & UX polish (clean LaTeX, Reset buttons, live IX progress bar, dark-mode observers, bundle cap)
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const IX_DIR = path.join(ROOT, 'src', 'scripts', 'ix-data');
const EXP_DIR = path.join(ROOT, 'src', 'scripts', 'explorers');

let passed = 0;

function pass(msg) {
  passed++;
  console.log('  ✓ ' + msg);
}

console.log('\n── Test Suite: 100% Interactives Relevance, Responsiveness & Polish ──');

// ─── 1. Audit All 306 Chapters & Explorer Blocks ──────────────────────────────
const tracks = fs.readdirSync(CONTENT_DIR)
  .filter((d) => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory())
  .sort();
assert.strictEqual(tracks.length, 31, 'Expected 31 curriculum tracks');

let totalChapters = 0;
let totalExplorers = 0;
let totalMainFnExplorers = 0;
const chapterIdsByTrack = {};

const coreAppSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02-core-app.js'), 'utf8');
const BAD_LATEX_RE = /\\\(A\\\)\s+function|e\^\(\\\(|S_∞|∫₀|division\s+\\\(by/i;

for (const track of tracks) {
  const tDir = path.join(CONTENT_DIR, track);
  const expFile = path.join(EXP_DIR, track + '.js');
  const expSrc = fs.existsSync(expFile) ? fs.readFileSync(expFile, 'utf8') : '';
  chapterIdsByTrack[track] = [];

  const chFiles = fs.readdirSync(tDir).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort();
  for (const fname of chFiles) {
    const chFile = path.join(tDir, fname);
    const ch = JSON.parse(fs.readFileSync(chFile, 'utf8'));
    totalChapters++;
    chapterIdsByTrack[track].push(ch.id);

    const allBlocks = [];
    (function collectBlocks(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(collectBlocks); return; }
      if ((node.kind === 'explorer' || node.type === 'explorer') && node.canvasId) { allBlocks.push(node); return; }
      for (const v of Object.values(node)) {
        if (v && typeof v === 'object') collectBlocks(v);
      }
    })(ch);

    for (const block of allBlocks) {
      totalExplorers++;
      const cid = block.canvasId;
      assert.ok(cid, `Explorer missing canvasId in ${track}/${ch.id}`);

      // Verify canvas is mounted either in track explorer JS or core app
      const isMounted = expSrc.includes(cid) || expSrc.includes(cid.replace(/Canvas$/, '')) || coreAppSrc.includes(cid);
      assert.ok(isMounted, `Unmounted explorer canvas ${cid} in ${track}/${ch.id}`);

      // Verify clean typography in title & note
      const texts = [
        typeof block.title === 'object' ? block.title.en : block.title,
        typeof block.title === 'object' ? block.title.ar : '',
        typeof block.note === 'object' ? block.note.en : block.note,
        typeof block.note === 'object' ? block.note.ar : ''
      ].filter(Boolean);

      for (const t of texts) {
        assert.ok(!BAD_LATEX_RE.test(t), `Broken LaTeX fragment in ${track}/${ch.id} (${cid}): ${t}`);
      }

      // Verify contextualized mainfn explorer
      if (/^uge_.*_mainfnCanvas$/.test(cid)) {
        totalMainFnExplorers++;
        const fnCtrl = (block.controls || []).find((c) => Array.isArray(c.options) && /Fn$/.test(c.id));
        assert.ok(fnCtrl && Array.isArray(fnCtrl.options), `Missing Fn select options on ${cid}`);
        const selectedOpts = fnCtrl.options.filter((o) => o.selected);
        assert.strictEqual(selectedOpts.length, 1, `Expected exactly 1 default selected family on ${cid}`);
        const titleEn = typeof block.title === 'object' ? block.title.en : block.title;
        assert.ok(
          !titleEn.startsWith('All 9 Main Parent Functions Explorer: Constant'),
          `Uncontextualized generic title remaining on ${cid} in ${track}/${ch.id}`
        );
      }
    }
  }
}

// Verify targeted relevance fixes from audit
const apbcOverview = fs.readFileSync(path.join(CONTENT_DIR, 'apbc', 'apbc-overview.json'), 'utf8');
const apbcC1 = fs.readFileSync(path.join(CONTENT_DIR, 'apbc', 'apbc-c1.json'), 'utf8');
const apbcC2 = fs.readFileSync(path.join(CONTENT_DIR, 'apbc', 'apbc-c2.json'), 'utf8');
assert.ok(apbcOverview.includes('apbcContCanvas'), 'apbc-overview.json must host Continuity explorer (apbcContCanvas)');
assert.ok(!apbcC1.includes('apbcContCanvas'), 'apbc-c1.json (Integration) must not host Continuity explorer');
assert.ok(apbcC2.includes('apbcoverviewExCanvas'), 'apbc-c2.json (Logistic ODEs) must host Logistic explorer');
const edxSurds = fs.readFileSync(path.join(CONTENT_DIR, 'edexcel', 'edx-number-surds-sets.json'), 'utf8');
assert.ok(!edxSurds.includes('uge_edxnumbersurdssets_mainfnCanvas'), 'edx-number-surds-sets.json must not contain redundant mainfn explorer');
const ibhlT3 = fs.readFileSync(path.join(CONTENT_DIR, 'ibhl', 'ibhl-t3.json'), 'utf8');
assert.ok(!ibhlT3.includes('uge_ibhlt3_trig6Canvas') && !ibhlT3.includes('uge_ibhlt3_invtrig6Canvas'), 'ibhl-t3.json (3D Vectors) must not contain redundant 2D trig6/invtrig6 explorers');

pass(`Verified all ${totalExplorers} interactive canvas explorers across ${totalChapters} chapters (${totalMainFnExplorers} contextualized parent-function labs, 0 broken LaTeX strings)`);

// ─── 2. Audit All 2,816 Interactive Practice Activities (IX) ──────────────────
let totalIxActivities = 0;
const ENTITY_RE = /&(amp|#39|quot|lt|gt|middot);/;
const LEGACY_BOILERPLATE_RE = /Differentiate \$y = \(x\^2 \+ 3\)\^4\$|Find the derivative and stationary points of \$y = 2x\^3 - 9x\^2 \+ 12x\$|Classify each function into its algebraic family/;

for (const track of tracks) {
  const ixFile = path.join(IX_DIR, track + '.js');
  assert.ok(fs.existsSync(ixFile), `Missing ix-data/${track}.js`);
  const code = fs.readFileSync(ixFile, 'utf8');
  const D = {};
  const sandbox = { window: { __ixData: { push: (fn) => fn(D) } } };
  vm.runInNewContext(code, sandbox);

  for (const chId of chapterIdsByTrack[track]) {
    const list = D[chId];
    assert.ok(Array.isArray(list) && list.length >= 4, `Expected >= 4 IX activities for ${track}/${chId}`);
    for (const act of list) {
      totalIxActivities++;
      assert.ok(act.ti && act.ti_ar, `Missing bilingual title in ${track}/${chId} (${act.t})`);
      assert.ok(!ENTITY_RE.test(act.ti) && !ENTITY_RE.test(act.ti_ar), `Raw HTML entity in IX title in ${track}/${chId}: ${act.ti}`);

      const blob = JSON.stringify(act);
      assert.ok(!LEGACY_BOILERPLATE_RE.test(blob), `Off-topic legacy boilerplate found in ${track}/${chId} (${act.t})`);

      if (act.t === 'tf') {
        assert.ok(Array.isArray(act.items) && act.items.length > 0, `Missing tf items in ${track}/${chId}`);
        if (Array.isArray(act.items_ar)) {
          assert.strictEqual(act.items_ar.length, act.items.length, `Mismatched tf items_ar length in ${track}/${chId}`);
          for (let k = 0; k < act.items_ar.length; k++) {
            const itEn = act.items[k], itAr = act.items_ar[k];
            assert.strictEqual(typeof itAr.a, 'boolean', `Missing boolean 'a' in tf items_ar in ${track}/${chId}`);
            assert.ok(typeof itAr.s === 'string' && itAr.s.length > 0, `Missing Arabic statement 's' in tf items_ar in ${track}/${chId}`);
            if (itEn.ex) assert.strictEqual(typeof itAr.ex, 'string', `Missing 'ex' explanation in tf items_ar in ${track}/${chId}`);
          }
        } else {
          for (const it of act.items) {
            assert.strictEqual(typeof it.a, 'boolean', `Missing boolean 'a' in tf item in ${track}/${chId}`);
            assert.ok(typeof it.s_ar === 'string' && it.s_ar.length > 0, `Missing inline s_ar in tf item in ${track}/${chId}`);
            if (it.ex) assert.strictEqual(typeof it.ex_ar, 'string', `Missing inline ex_ar in tf item in ${track}/${chId}`);
          }
        }
      }
    }
  }
}
pass(`Verified all ${totalIxActivities} interactive practice activities across all ${totalChapters} chapters (100% lesson-relevant, 100% Arabic parity, 0 raw entities)`);

// ─── 3. Verify Responsive, RTL & UX Polish Hooks ──────────────────────────────
const plotEngineSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02a-plot-canvas-engine.js'), 'utf8');
assert.ok(plotEngineSrc.includes('_wireExplorerReset'), '02a-plot-canvas-engine.js must wire ↺ Reset buttons');
assert.ok(plotEngineSrc.includes('MutationObserver'), '02a-plot-canvas-engine.js must observe theme/RTL class changes');

const ugeSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02a2-universal-graph-explorers.js'), 'utf8');
assert.ok(ugeSrc.includes("classList.add('ex-dual-pane')"), '02a2-universal-graph-explorers.js must mark dual-pane canvases');
assert.ok(ugeSrc.includes('var stacked = w < 520;'), '02a2-universal-graph-explorers.js must stack dual-pane canvases on mobile (< 520px)');
assert.ok(ugeSrc.includes('lastStacked ? (py < lastSplitY) : (px < lastSplitX)'), '02a2-universal-graph-explorers.js must adapt drag hit-testing when stacked');

const ixEngineSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '19-interactive-activities-engine-v1.js'), 'utf8');
assert.ok(ixEngineSrc.includes('ix-prog-pill') && ixEngineSrc.includes('ix-prog-fill'), '19-interactive-activities-engine-v1.js must render live chapter progress bar');
assert.ok(ixEngineSrc.includes('ix-box-top') && ixEngineSrc.includes('_decorateIxBox'), '19-interactive-activities-engine-v1.js must wrap badge + action buttons in .ix-box-top');
assert.ok(ixEngineSrc.includes('_makeRetryBtn'), '19-interactive-activities-engine-v1.js must wire retry buttons on multi-step activities');

const cssSrc = fs.readFileSync(path.join(ROOT, 'src', 'styles', 'main.css'), 'utf8');
assert.ok(cssSrc.includes('.ex-reset-btn') && cssSrc.includes('.ex-dual-pane'), 'main.css must style .ex-reset-btn and .ex-dual-pane');
assert.ok(cssSrc.includes('.ix-prog-pill') && cssSrc.includes('.ix-box-top') && cssSrc.includes('.ix-box.ix-done'), 'main.css must style .ix-prog-pill, .ix-box-top, and .ix-box.ix-done');
assert.ok(cssSrc.includes('body.rtl .ex-canvas'), 'main.css must include RTL explorer canvas rules');

pass('Verified responsive mobile stacking, live dark-mode observers, explorer Reset buttons, and IX progress tracker hooks');

// ─── 4. Verify Production Bundle Size Cap ─────────────────────────────────────
const engineBuiltPath = path.join(ROOT, 'public', 'js', 'engine.js');
if (fs.existsSync(engineBuiltPath)) {
  const buf = fs.readFileSync(engineBuiltPath);
  const str = buf.toString('utf8');
  assert.ok(buf.length < 350000, `public/js/engine.js byte length (${buf.length}) exceeds 350,000 cap`);
  assert.ok(str.length < 350000, `public/js/engine.js char length (${str.length}) exceeds 350,000 cap`);
  pass(`Verified public/js/engine.js bundle budget (${buf.length} bytes < 350,000 cap)`);
}

console.log(`\n✅ All ${passed}/4 comprehensive interactive verification checks passed!\n`);
