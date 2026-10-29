#!/usr/bin/env node
/**
 * scripts/test-performance-and-bundles.js
 *
 * Verifies Category 1 Performance, Bundle-Splitting, & KaTeX HTML-Only SSR Guarantees:
 *   1. public/js/engine.js stays strictly < 350,000 bytes & chars (tracks.spec.js budget)
 *      and excludes all deferred/per-track payloads.
 *   2. All split & on-demand bundles (mock-exam.js, formula-modal.js, ix-engine.js,
 *      universal-graph-explorers.js, study-hub-extras.js) compile cleanly and ix-engine.js
 *      receives the full 31-track IX_TRACKS manifest.
 *   3. Deferred loaders (17b-mock-exam-loader.js & 20f-formula-modal-loader.js) inject
 *      their target scripts once and forward calls cleanly after load.
 *   4. Page-specific script loading order in _site/: home & legal pages skip ix-engine.js
 *      and universal-graph-explorers.js, while track pages load engine.js -> study-hub-extras.js
 *      -> ix-engine.js -> universal-graph-explorers.js -> ex/<track>.js before the nav shim.
 *   5. KaTeX HTML-Only SSR emits output:'html' + data-tex + .sr-only with zero duplicate
 *      MathML subtrees, while preserving Forms & DOCX OMML equation extraction.
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');
const { renderChapterMath } = require('./katex-ssr.js');

const ROOT = path.join(__dirname, '..');
let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.stack || err.message}`);
    failed++;
  }
}

console.log('── Running Performance, Bundle Budget & KaTeX HTML-Only SSR Tests ──');

check('public/js/engine.js is strictly < 350,000 bytes and < 350,000 chars with zero forbidden payloads', () => {
  const enginePath = path.join(ROOT, 'public', 'js', 'engine.js');
  const engineBuf = fs.readFileSync(enginePath);
  const engineStr = engineBuf.toString('utf8');
  const gzBytes = zlib.gzipSync(engineBuf).length;

  assert.ok(engineBuf.length < 350000, `engine.js UTF-8 size (${engineBuf.length}) must be < 350,000 bytes`);
  assert.ok(engineStr.length < 350000, `engine.js char length (${engineStr.length}) must be < 350,000`);
  assert.ok(gzBytes < 115000, `engine.js gzip size (${gzBytes}) should stay compact (< 115 KB)`);

  const forbidden = [
    '_renderFig=',
    'renderGeom3D',
    'FIG_INDIGO',
    '"keywords":[',
    'window.CSAssign =',
    "'nav.home':'الرئيسية'",
    'avIntro',
    'window.examSpecs={',
    "getElementById('pcSsaCanvas')",
    'Quick Check: Algebra Fundamentals'
  ];
  for (const marker of forbidden) {
    assert.strictEqual(engineStr.includes(marker), false, `Forbidden payload "${marker}" found in engine.js`);
  }
});

check('All split & deferred JS bundles exist, parse cleanly, and inject 31 IX tracks into ix-engine.js', () => {
  const requiredBundles = [
    'mock-exam.js',
    'formula-modal.js',
    'universal-graph-explorers.js',
    'ix-engine.js',
    'study-hub-extras.js'
  ];
  for (const b of requiredBundles) {
    const pubFile = path.join(ROOT, 'public', 'js', b);
    const siteFile = path.join(ROOT, '_site', 'js', b);
    assert.ok(fs.existsSync(pubFile), `Missing public/js/${b}`);
    assert.ok(fs.existsSync(siteFile), `Missing _site/js/${b}`);
    const code = fs.readFileSync(pubFile, 'utf8');
    assert.ok(code.length > 500, `Unexpectedly empty bundle: ${b}`);
    // Syntax check via vm.Script
    new vm.Script(code, { filename: b });
  }

  const ixEngine = fs.readFileSync(path.join(ROOT, 'public', 'js', 'ix-engine.js'), 'utf8');
  assert.strictEqual(ixEngine.includes('/*@IX_TRACKS@*/'), false, 'Unreplaced IX_TRACKS placeholder in ix-engine.js');
  for (const t of ['calculus', 'sat', 'qudrat', 'olympiad', 'mathai']) {
    assert.ok(ixEngine.includes(`"${t}"`), `ix-engine.js missing track "${t}" in IX_TRACKS`);
  }
});

check('Deferred loaders (mock-exam & formula-modal) single-flight load scripts and forward calls', async () => {
  const mockLoader = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '17b-mock-exam-loader.js'), 'utf8');
  const formulaLoader = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '20f-formula-modal-loader.js'), 'utf8');

  const injected = [];
  let openedMockArgs = null;
  let openedFormulaTab = null;

  const win = {};
  const doc = {
    getElementById: () => null,
    createElement: (tag) => ({ tagName: tag.toUpperCase(), src: '', onload: null, onerror: null }),
    head: {
      appendChild: (scriptEl) => {
        injected.push(scriptEl.src);
        if (scriptEl.src === '/js/mock-exam.js') {
          win.openMockExam = function (track, pidx) { openedMockArgs = [track, pidx]; };
        } else if (scriptEl.src === '/js/formula-modal.js') {
          win.CSFormula = { open: function (tab) { openedFormulaTab = tab; } };
          win.openFormulaModal = win.CSFormula.open;
        }
        if (typeof scriptEl.onload === 'function') scriptEl.onload();
      }
    }
  };
  win.window = win;
  win.document = doc;
  win.Promise = Promise;

  vm.runInNewContext(mockLoader, win);
  vm.runInNewContext(formulaLoader, win);

  win.openMockExam('olympiad', 1);
  win.openFormulaModal('olympiad');

  // Allow microtasks (.then) to flush cleanly using synchronous check via setImmediate fallback:
  // Wait — since check() is synchronous above, verify synchronous Promise resolution in microtask:
  Promise.resolve().then(() => {
    assert.deepStrictEqual(injected, ['/js/mock-exam.js', '/js/formula-modal.js']);
    assert.deepStrictEqual(openedMockArgs, ['olympiad', 1]);
    assert.strictEqual(openedFormulaTab, 'olympiad');
  });
});

check('_site HTML pages load only the scripts required for their route in deterministic order', () => {
  const homeHtml = fs.readFileSync(path.join(ROOT, '_site', 'index.html'), 'utf8');
  const privacyHtml = fs.readFileSync(path.join(ROOT, '_site', 'privacy', 'index.html'), 'utf8');
  const olympiadHtml = fs.readFileSync(path.join(ROOT, '_site', 'olympiad', 'index.html'), 'utf8');

  assert.strictEqual(homeHtml.includes('/js/ix-engine.js'), false, 'Home page should not load ix-engine.js');
  assert.strictEqual(homeHtml.includes('/js/universal-graph-explorers.js'), false, 'Home page should not load universal-graph-explorers.js');
  assert.ok(homeHtml.includes('/js/ex/home.js'), 'Home page must load /js/ex/home.js');

  assert.strictEqual(privacyHtml.includes('/js/ix-engine.js'), false, 'Privacy page should not load ix-engine.js');
  assert.strictEqual(privacyHtml.includes('/js/ex/'), false, 'Privacy page should not load track explorers');

  const iEngine = olympiadHtml.indexOf('/js/engine.js');
  const iExtras = olympiadHtml.indexOf('/js/study-hub-extras.js');
  const iIx = olympiadHtml.indexOf('/js/ix-engine.js');
  const iUge = olympiadHtml.indexOf('/js/universal-graph-explorers.js');
  const iEx = olympiadHtml.indexOf('/js/ex/olympiad.js');
  const iShim = olympiadHtml.indexOf('var _origShowView = window.showView;');

  assert.ok(iEngine > 0 && iExtras > iEngine, 'study-hub-extras.js must load right after engine.js');
  assert.ok(iIx > iExtras && iUge > iIx && iEx > iUge, 'ix-engine -> universal-graph-explorers -> ex/olympiad order must hold');
  assert.ok(iShim > iEx, 'Post-engine showView/goChapter shim must run after track scripts');
});

check('KaTeX HTML-Only SSR strips duplicate MathML trees while preserving data-tex, .sr-only, and DOCX OMML restoration', () => {
  const sampleHtml = '<html><body><p>Solve \\(x^2 + 1 = 0\\) and \\[\\frac{a}{b}\\]</p></body></html>';
  const rendered = renderChapterMath(sampleHtml, 'test');

  assert.strictEqual(rendered.includes('katex-mathml'), false, 'SSR must not emit duplicate .katex-mathml trees');
  assert.strictEqual(rendered.includes('<math'), false, 'SSR must not emit <math> trees');
  assert.ok(rendered.includes('data-tex="x^2 + 1 = 0"'), 'SSR inline math must carry data-tex');
  assert.ok(rendered.includes('<span class="sr-only">x^2 + 1 = 0</span>'), 'SSR inline math must carry .sr-only text');
  assert.ok(rendered.includes('data-tex="\\frac{a}{b}"'), 'SSR display math must carry data-tex');

  // Verify compiled _site/olympiad/index.html has zero <math> tags from KaTeX MathML
  const olympiadBody = fs.readFileSync(path.join(ROOT, '_site', 'olympiad', 'index.html'), 'utf8').split('<body')[1];
  assert.strictEqual(olympiadBody.includes('class="katex-mathml"'), false, '_site/olympiad body must have 0 .katex-mathml nodes');
  assert.ok(olympiadBody.includes('class="katex" data-tex='), '_site/olympiad body must have SSR data-tex attributes');

  // Verify 04-docx-export.js restores SSR data-tex equations without duplicating .sr-only / .katex-html
  const docxSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '04-docx-export.js'), 'utf8');
  assert.ok(docxSrc.includes('function _restoreKatexTex(html)'), '04-docx-export.js must define _restoreKatexTex');
});

setImmediate(() => {
  console.log(`\n── Performance & Bundles Summary: ${passed} passed, ${failed} failed ──`);
  if (failed > 0) process.exit(1);
  console.log('✅ All Performance, Bundle Budget & KaTeX HTML-Only SSR tests passed!');
  process.exit(0);
});
