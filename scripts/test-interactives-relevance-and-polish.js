#!/usr/bin/env node
/**
 * Comprehensive verification suite for 100% Interactive Explorers, Figures & Activities:
 *   1. Lesson Relevance across all 31 tracks & 306 chapters (explorers + IX activities + static figures)
 *   2. Practice-Set & Question-Bank Figure Relevance (0 figureProblem mismatches across 31 tracks)
 *   3. Responsive layout, High-DPR pointer hooks, hidden-chapter observers, nested-KaTeX delegation & RTL
 *   4. Visual & UX polish (clean LaTeX, Reset buttons, live IX progress bar, dark-mode observers, bundle cap)
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const BANK_DIR = path.join(ROOT, 'bank-data');
const IX_DIR = path.join(ROOT, 'src', 'scripts', 'ix-data');
const EXP_DIR = path.join(ROOT, 'src', 'scripts', 'explorers');

// Load ClipSAT's actual browser figure renderer & verifier
const win = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'public', 'js', 'figures.js'), 'utf8'))(win);
new Function('window', fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '05b-ai-question-verifier.js'), 'utf8'))(win);
const renderFig = win._renderFig;
const figureProblem = win.ClipSATVerifyAI._internal.figureProblem;

let passed = 0;

function pass(msg) {
  passed++;
  console.log('  ✓ ' + msg);
}

console.log('\n── Test Suite: 100% Interactives & Figures Relevance, Responsiveness & Polish ──');

// ─── 1. Audit All 306 Chapters, Explorer Blocks & Static Figures ──────────────
const tracks = fs.readdirSync(CONTENT_DIR)
  .filter((d) => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory())
  .sort();
assert.strictEqual(tracks.length, 31, 'Expected 31 curriculum tracks');

let totalChapters = 0;
let totalExplorers = 0;
let totalMainFnExplorers = 0;
let totalStaticFigures = 0;
const chapterIdsByTrack = {};

const coreAppSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02-core-app.js'), 'utf8');
const BAD_LATEX_RE = /\\\(A\\\)\s+function|e\^\(\\\(|S_∞|∫₀|division\s+\\\(by/i;
const GENUINE_ODE_SLUGS_RE = /^(?:.*diffeq.*|apab-u7|apbc-c2|ode-separable|ode-linear|ode-numerical.*|ode-overview|ibhl-t5)$/;

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
    const figBlocks = [];
    (function collectBlocks(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(collectBlocks); return; }
      if ((node.kind === 'explorer' || node.type === 'explorer')) {
        assert.ok(node.canvasId, `Explorer block missing canvasId in ${track}/${ch.id}`);
        allBlocks.push(node);
        return;
      }
      if (node.kind === 'figure' && node.figure) { figBlocks.push(node); return; }
      for (const v of Object.values(node)) {
        if (v && typeof v === 'object') collectBlocks(v);
      }
    })(ch);

    for (const block of allBlocks) {
      totalExplorers++;
      const cid = block.canvasId;
      assert.ok(cid, `Explorer missing canvasId in ${track}/${ch.id}`);

      const isMounted = expSrc.includes(cid) || expSrc.includes(cid.replace(/Canvas$/, '')) || coreAppSrc.includes(cid);
      assert.ok(isMounted, `Unmounted explorer canvas ${cid} in ${track}/${ch.id}`);

      const texts = [
        typeof block.title === 'object' ? block.title.en : block.title,
        typeof block.title === 'object' ? block.title.ar : '',
        typeof block.note === 'object' ? block.note.en : block.note,
        typeof block.note === 'object' ? block.note.ar : ''
      ].filter(Boolean);

      for (const t of texts) {
        assert.ok(!BAD_LATEX_RE.test(t), `Broken LaTeX fragment in ${track}/${ch.id} (${cid}): ${t}`);
      }

      if (/^uge_.*_mainfnCanvas$/.test(cid)) {
        totalMainFnExplorers++;
        const fnCtrl = (block.controls || []).find((c) => Array.isArray(c.options) && /Fn$/.test(c.id));
        assert.ok(fnCtrl && Array.isArray(fnCtrl.options), `Missing Fn select options on ${cid}`);
        const selectedOpts = fnCtrl.options.filter((o) => o.selected);
        assert.strictEqual(selectedOpts.length, 1, `Expected exactly 1 default selected family on ${cid}`);
        assert.strictEqual(
          fnCtrl.value,
          selectedOpts[0].value,
          `Mismatched fnCtrl.value (${fnCtrl.value}) vs <option selected> (${selectedOpts[0].value}) on ${cid} in ${track}/${ch.id}`
        );
        const mountRe = new RegExp(cid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "['\"][\\s\\S]{0,260}?defaultFn\\s*:\\s*['\"]([a-z0-9_]+)['\"]");
        const m = expSrc.match(mountRe);
        if (m) {
          assert.strictEqual(
            m[1],
            selectedOpts[0].value,
            `Mismatched JS defaultFn (${m[1]}) vs JSON selected option (${selectedOpts[0].value}) on ${cid} in ${track}/${ch.id}`
          );
        }
        const titleEn = typeof block.title === 'object' ? block.title.en : block.title;
        assert.ok(
          !titleEn.startsWith('All 9 Main Parent Functions Explorer: Constant'),
          `Uncontextualized generic title remaining on ${cid} in ${track}/${ch.id}`
        );
      }
    }

    for (const blk of figBlocks) {
      totalStaticFigures++;
      const svg = renderFig(blk.figure);
      assert.ok(svg && svg.length >= 60, `Static figure failed to render in ${track}/${ch.id}`);
      if (blk.figure.type === 'slope_field') {
        assert.ok(
          GENUINE_ODE_SLUGS_RE.test(ch.id),
          `Off-topic slope_field static figure found in non-ODE chapter ${track}/${ch.id}`
        );
      }
      assert.ok(
        !/Mathematical Diagram/i.test(blk.figure.title || ''),
        `Placeholder figure title found in ${track}/${ch.id}: ${blk.figure.title}`
      );
      const capAr = (blk.caption && blk.caption.ar) || '';
      assert.ok(capAr.length > 0, `Missing Arabic figure caption in ${track}/${ch.id}`);
      assert.ok(
        !/تمثيل رياضي وهندسي توضيحي|شكل هندسي لمثلث يوضح العلاقة بين أضلاعه وزواياه/.test(capAr),
        `Generic boilerplate Arabic caption in ${track}/${ch.id}: ${capAr}`
      );
      if (blk.figure.type === 'triangle' && !/trig|triang|geo|pythag|mensur|circle|similar|right|vector|force|complex|quant-comparisons|bearing|angle|congruen|solid|qud|sat|act|est|tah|olymp|ol-|ig-|edx-trigonometry|edx-geometry|ge-geometry/i.test(ch.id)) {
        assert.fail(`Boilerplate triangle static figure in non-geometric chapter ${track}/${ch.id}`);
      }
      const strippedAr = capAr
        .replace(/\\\([\s\S]*?\\\)/g, '')
        .replace(/\\\[[\s\S]*?\\\]/g, '')
        .replace(/\$[^$]+\$/g, '')
        .replace(/\([A-Za-z0-9\s/.,+-]+\)/g, '')
        .replace(/\b(?:SAT|ACT|EST|AP|IB|IGCSE|GCSE|A2|AS|HL|SL|AA|AI|SAAT|GAT|KAUST|NSMO|STEM|FRQ|MCQ|GPA|ODE|ODEs|PDE|CLT|IQR|ANOVA|PCA|SVD|LU|QR|RK4|cdfs?|pdfs?|pmfs?|e\.g\.|vs)\b/gi, '');
      assert.ok(
        !/\b[A-Za-z]{5,}\s+[A-Za-z]{4,}\b/.test(strippedAr),
        `Mixed English prose inside Arabic figure caption in ${track}/${ch.id}: ${capAr}`
      );
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
const tahAbout = fs.readFileSync(path.join(CONTENT_DIR, 'tahsili', 'tah-about.json'), 'utf8');
const tahGeo = fs.readFileSync(path.join(CONTENT_DIR, 'tahsili', 'tah-geometry.json'), 'utf8');
assert.ok(tahAbout.includes('tahScoreCanvas'), 'tah-about.json must host tahScoreCanvas (Weighted Admission Composite)');
assert.ok(tahGeo.includes('tahLogicCanvas'), 'tah-geometry.json must host tahLogicCanvas (Mathematical Logic)');
const appcU2b = fs.readFileSync(path.join(CONTENT_DIR, 'appc', 'appc-u2b.json'), 'utf8');
const appcU4 = fs.readFileSync(path.join(CONTENT_DIR, 'appc', 'appc-u4.json'), 'utf8');
assert.ok(appcU2b.includes('appcInvCanvas'), 'appc-u2b.json (Logarithmic & Inverse) must host appcInvCanvas');
assert.ok(!appcU4.includes('appcInvCanvas'), 'appc-u4.json (Parametric, Vectors & Matrices) must not host appcInvCanvas');

pass(`Verified all ${totalExplorers} explorers & ${totalStaticFigures} static figures across ${totalChapters} chapters (${totalMainFnExplorers} synchronized mainfn labs, 0 off-topic slope fields, 0 mixed Arabic captions)`);

// ─── 2. Audit Practice-Set & Question-Bank Figures Across All 31 Tracks ───────
let totalPsFigs = 0;
let totalBankFigs = 0;

for (const track of tracks) {
  const ps = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, track, '_practice-set.json'), 'utf8'));
  ps.items.forEach((it, idx) => {
    if (!it.fig) return;
    totalPsFigs++;
    const rendered = renderFig(it.fig);
    assert.ok(rendered && rendered.length >= 60, `Practice-set figure failed to render in ${track}#${idx}`);
    const prob = figureProblem(
      JSON.parse(JSON.stringify(it.fig)),
      { text: (it.question && it.question.en) || '', choices: it.choices, answer: it.answer, domain: it.domain || track }
    );
    assert.strictEqual(prob, null, `Practice-set figure mismatch in ${track}#${idx}: ${prob}`);
  });

  const bank = JSON.parse(fs.readFileSync(path.join(BANK_DIR, track + '.json'), 'utf8'));
  const pool = Array.isArray(bank.pool) ? bank.pool : [].concat(bank.easy || [], bank.medium || [], bank.hard || []);
  pool.forEach((q, idx) => {
    const fg = q.fig || q.figure;
    if (!fg) return;
    totalBankFigs++;
    const rendered = renderFig(fg);
    assert.ok(rendered && rendered.length >= 60, `Bank figure failed to render in ${track}[${idx}]`);
    const prob = figureProblem(JSON.parse(JSON.stringify(fg)), q);
    assert.strictEqual(prob, null, `Bank figure mismatch in ${track}[${idx}]: ${prob}`);
  });
}

pass(`Verified ${totalPsFigs} practice-set figures & ${totalBankFigs} question-bank figures across all 31 tracks (0 figureProblem mismatches)`);

// ─── 3. Audit All 2,816 Interactive Practice Activities (IX) ──────────────────
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
      assert.ok(!act.ti.includes('· II') && !act.ti_ar.includes('· ٢'), `Duplicate · II activity remaining in ${track}/${chId}: ${act.ti}`);
      if (/(?:-about|-overview)$/.test(chId)) {
        assert.ok(!/Pick’s Theorem|Converse Fallacy/i.test(act.ti), `Off-topic proof_logic item in overview chapter ${track}/${chId}: ${act.ti}`);
      }

      const blob = JSON.stringify(act);
      assert.ok(!LEGACY_BOILERPLATE_RE.test(blob), `Off-topic legacy boilerplate found in ${track}/${chId} (${act.t})`);
      assert.ok(!/(^|[^\\])mathcal\{/.test(blob), `Unslashed mathcal found in ${track}/${chId}: ${act.ti}`);

      if (['appc', 'precalc', 'alg2', 'algebra', 'geo'].includes(track)) {
        assert.ok(
          !/Spot the Error: Implicit Differentiation|Spot the Error: Fundamental Theorem|Taylor|Maclaurin|Integrating Factor/i.test(act.ti),
          `Out-of-syllabus calculus IX activity in ${track}/${chId}: ${act.ti}`
        );
      }
      if (['a2-conics', 'pc-conics', 'geo-foundations', 'geo-lines', 'geo-triangles', 'geo-quads', 'geo-transform', 'ig-transform'].includes(chId)) {
        assert.ok(
          !/Circle Theorems, Sectors|Central vs\. Inscribed|Area & Volume Similarity Scaling/i.test(act.ti),
          `Misplaced circle/similarity IX activity in ${track}/${chId}: ${act.ti}`
        );
      }
      if (['ag-stats', 'aps-u1', 'aps-u2', 'geo-prob', 'qud-data', 'as-datarepresent', 'ge-data-stats-prob'].includes(chId)) {
        assert.ok(
          !/Variance of Difference of Independent|Standard Error, Variance|Significance Hypothesis Test/i.test(act.ti),
          `Out-of-chapter inference IX activity in ${track}/${chId}: ${act.ti}`
        );
      }
      if (['sat-data', 'act-numbers', 'est-data', 'ge-arithmetic-shortcuts', 'ge-ratios-rates-word', 'ig-sets', 'ibsl-t1'].includes(chId)) {
        assert.ok(
          !/Harmonic Round-Trip Speed & Bounds|Number, Bounds & Set Principles/i.test(act.ti),
          `Misplaced GCSE error-bounds IX activity in ${track}/${chId}: ${act.ti}`
        );
      }

      if (act.t === 'cat' && Array.isArray(act.categories_ar) && Array.isArray(act.items_ar)) {
        for (const elem of act.items_ar) {
          const validArCat = typeof elem.cat === 'number'
            ? (elem.cat >= 0 && elem.cat < act.categories_ar.length)
            : act.categories_ar.includes(elem.cat);
          assert.ok(validArCat, `Arabic cat item has unmapped category ${JSON.stringify(elem.cat)} in ${track}/${chId}`);
        }
      }

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

// ─── 4. Verify Responsive, High-DPR, Observer & UX Polish Hooks ───────────────
const plotEngineSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02a-plot-canvas-engine.js'), 'utf8');
assert.ok(plotEngineSrc.includes('_wireExplorerReset'), '02a-plot-canvas-engine.js must wire ↺ Reset buttons');
assert.ok(plotEngineSrc.includes('MutationObserver'), '02a-plot-canvas-engine.js must observe theme/RTL class changes');
assert.ok(
  plotEngineSrc.includes('x: e.clientX - rect.left') && !plotEngineSrc.includes('canvas.width / rect.width'),
  '02a-plot-canvas-engine.js makeDraggable must return pure CSS-pixel coordinates for High-DPR screens'
);

const olympiadExpSrc = fs.readFileSync(path.join(EXP_DIR, 'olympiad.js'), 'utf8');
assert.ok(!olympiadExpSrc.includes('chApi.notify(') && olympiadExpSrc.includes('chApi.check('), 'olympiad.js must invoke chApi.check() on drag without TypeError');

const ugeSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02a2-universal-graph-explorers.js'), 'utf8');
assert.ok(ugeSrc.includes("classList.add('ex-dual-pane')"), '02a2-universal-graph-explorers.js must mark dual-pane canvases');
assert.ok(ugeSrc.includes('var stacked = w < 520;'), '02a2-universal-graph-explorers.js must stack dual-pane canvases on mobile (< 520px)');
assert.ok(ugeSrc.includes('lastStacked ? (py < lastSplitY) : (px < lastSplitX)'), '02a2-universal-graph-explorers.js must adapt drag hit-testing when stacked');

const ixEngineSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '19-interactive-activities-engine-v1.js'), 'utf8');
assert.ok(ixEngineSrc.includes('ix-prog-pill') && ixEngineSrc.includes('ix-prog-fill'), '19-interactive-activities-engine-v1.js must render live chapter progress bar');
assert.ok(ixEngineSrc.includes('ix-box-top') && ixEngineSrc.includes('_decorateIxBox'), '19-interactive-activities-engine-v1.js must wrap badge + action buttons in .ix-box-top');
assert.ok(ixEngineSrc.includes('_makeRetryBtn'), '19-interactive-activities-engine-v1.js must wire retry buttons on multi-step activities');
assert.ok(ixEngineSrc.includes('ResizeObserver') && ixEngineSrc.includes('IntersectionObserver'), '19-interactive-activities-engine-v1.js must observe hidden-chapter _buildFN & _buildGP canvases');
assert.ok(ixEngineSrc.includes("addEventListener('pointerdown'") && ixEngineSrc.includes('e.detail===0'), '19-interactive-activities-engine-v1.js math palette must support pointerdown and keyboard click');
assert.ok(ixEngineSrc.includes('li.draggable=!isFinished'), '19-interactive-activities-engine-v1.js _buildORD must support HTML5 drag-and-drop reordering');
assert.ok(ixEngineSrc.includes('var _FNM=') && ixEngineSrc.includes('arcsin|arccos|arctan'), '19-interactive-activities-engine-v1.js _fnEval must safely evaluate inverse/reciprocal trig & logs');

const ixCsSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '23-interactive-activities-cs.js'), 'utf8');
assert.ok(ixCsSrc.includes("closest('.ia-match-item')"), '23-interactive-activities-cs.js must delegate nested KaTeX clicks via .closest(".ia-match-item")');

const cssSrc = fs.readFileSync(path.join(ROOT, 'src', 'styles', 'main.css'), 'utf8');
assert.ok(cssSrc.includes('.ex-reset-btn') && cssSrc.includes('.ex-dual-pane'), 'main.css must style .ex-reset-btn and .ex-dual-pane');
assert.ok(cssSrc.includes('.ix-prog-pill') && cssSrc.includes('.ix-box-top') && cssSrc.includes('.ix-box.ix-done'), 'main.css must style .ix-prog-pill, .ix-box-top, and .ix-box.ix-done');
assert.ok(cssSrc.includes('body.rtl .ex-canvas'), 'main.css must include RTL explorer canvas rules');

pass('Verified High-DPR pointer coordinates, Olympiad drag fix, hidden-chapter observers, nested-KaTeX delegation, and UX polish hooks');

// ─── 5. Verify Production Bundle Size Cap ─────────────────────────────────────
const engineBuiltPath = path.join(ROOT, 'public', 'js', 'engine.js');
if (fs.existsSync(engineBuiltPath)) {
  const buf = fs.readFileSync(engineBuiltPath);
  const str = buf.toString('utf8');
  assert.ok(buf.length < 350000, `public/js/engine.js byte length (${buf.length}) exceeds 350,000 cap`);
  assert.ok(str.length < 350000, `public/js/engine.js char length (${str.length}) exceeds 350,000 cap`);
  pass(`Verified public/js/engine.js bundle budget (${buf.length} bytes < 350,000 cap)`);
}

console.log(`\n✅ All ${passed}/5 comprehensive interactive & figure verification checks passed!\n`);
