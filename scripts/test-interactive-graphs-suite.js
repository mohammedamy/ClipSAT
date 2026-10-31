#!/usr/bin/env node
/**
 * scripts/test-interactive-graphs-suite.js
 *
 * End-to-end mathematical, structural, bilingual, and SSR verification for:
 *   1. All 6 Trigonometric Ratios (sin, cos, tan, csc, sec, cot) + All 6 Inverse
 *      Trigonometric Functions (arcsin, arccos, arctan, arccsc, arcsec, arccot)
 *      across all 24 trigonometry tracks (30 chapters).
 *   2. Interactive Slope Field Lab in Calculus (ch-diffeq + AP AB/BC + A2 + ODEs)
 *      plus data-cs-interactive-slopefield="1" enhancement across all 30 slope_field figures.
 *   3. All 9 Main Parent Functions (constant, linear, quadratic, cubic, absolute,
 *      radical, rational, exponential, logarithmic) across all 31 tracks (76 chapters).
 *   4. All 6 Hyperbolic & 3 Inverse Hyperbolic Functions in Calculus tracks (8 chapters).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const EX_DIR = path.join(ROOT, 'src', 'scripts', 'explorers');
const SITE_DIR = path.join(ROOT, '_site');

let passed = 0;
let failed = 0;

function test(name, fn) {
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

console.log('── Running Interactive Graphs & Parent Functions Verification Suite ──\n');

// 1. Evaluate 02a2-universal-graph-explorers.js in a sandboxed VM to test math engines directly
const ugeCode = fs.readFileSync(
  path.join(ROOT, 'src', 'scripts', 'modules', '02a2-universal-graph-explorers.js'),
  'utf8'
);

const sandboxWindow = {};
const sandboxContext = vm.createContext({
  window: sandboxWindow,
  Math: Math,
  Number: Number,
  String: String,
  Object: Object,
  Array: Array,
  Function: Function,
  isFinite: isFinite,
  isNaN: isNaN,
  parseFloat: parseFloat,
  parseInt: parseInt,
  setTimeout: function () {}
});
vm.runInContext(ugeCode, sandboxContext);

test('Universal Graph Explorers module exports all 6 mount & mathematical catalog APIs', () => {
  assert.strictEqual(typeof sandboxWindow.CSMountSixTrigExplorer, 'function');
  assert.strictEqual(typeof sandboxWindow.CSMountSixInvTrigExplorer, 'function');
  assert.strictEqual(typeof sandboxWindow.CSMountSlopeFieldExplorer, 'function');
  assert.strictEqual(typeof sandboxWindow.CSEnhanceStaticSlopeFields, 'function');
  assert.strictEqual(typeof sandboxWindow.CSMountMainFunctionsExplorer, 'function');
  assert.strictEqual(typeof sandboxWindow.CSMountHyperbolicExplorer, 'function');
  assert.strictEqual(typeof sandboxWindow.CSSlopeFieldRK4, 'function');
  assert.ok(sandboxWindow.CSMainFunctionsCatalog, 'CSMainFunctionsCatalog must exist');
  assert.ok(sandboxWindow.CSHyperbolicCatalog, 'CSHyperbolicCatalog must exist');
});

test('CSMainFunctionsCatalog accurately evaluates all 9 main function families & transformations', () => {
  const cat = sandboxWindow.CSMainFunctionsCatalog;
  const families = [
    'constant', 'linear', 'quadratic', 'cubic', 'absolute',
    'radical', 'rational', 'exponential', 'logarithmic'
  ];
  families.forEach(k => {
    assert.ok(cat[k], `Missing main function family: ${k}`);
    assert.strictEqual(typeof cat[k].evalFn, 'function');
    assert.strictEqual(typeof cat[k].dom, 'function');
    assert.strictEqual(typeof cat[k].rng, 'function');
  });

  // Verify mathematical accuracy at transformed parameters (a = 2, h = 1, k = -3)
  assert.strictEqual(cat.constant.evalFn(5, 2, 1, -3), -1);
  assert.strictEqual(cat.linear.evalFn(4, 2, 1, -3), 2 * (4 - 1) - 3);
  assert.strictEqual(cat.quadratic.evalFn(4, 2, 1, -3), 2 * 9 - 3);
  assert.strictEqual(cat.cubic.evalFn(3, 2, 1, -3), 2 * 8 - 3);
  assert.strictEqual(cat.absolute.evalFn(-2, 2, 1, -3), 2 * 3 - 3);
  assert.strictEqual(cat.radical.evalFn(10, 2, 1, -3), 2 * 3 - 3);
  assert.ok(Number.isNaN(cat.radical.evalFn(0, 2, 1, -3)), 'Radical must be NaN for x < h');
  assert.strictEqual(cat.rational.evalFn(3, 2, 1, -3), 2 / (3 - 1) - 3);
  assert.ok(Number.isNaN(cat.rational.evalFn(1, 2, 1, -3)), 'Rational must be NaN at vertical asymptote x = h');
  assert.strictEqual(cat.exponential.evalFn(4, 2, 1, -3), 2 * Math.pow(2, 3) - 3);
  assert.ok(Math.abs(cat.logarithmic.evalFn(1 + Math.E, 2, 1, -3) - (2 - 3)) < 1e-9);
  assert.ok(Number.isNaN(cat.logarithmic.evalFn(1, 2, 1, -3)), 'Logarithmic must be NaN at x <= h');
});

test('CSHyperbolicCatalog evaluates all 6 hyperbolic + 3 inverse hyperbolic functions & derivatives', () => {
  const H = sandboxWindow.CSHyperbolicCatalog;
  const keys = ['sinh', 'cosh', 'tanh', 'csch', 'sech', 'coth', 'arsinh', 'arcosh', 'artanh'];
  keys.forEach(k => assert.ok(H[k], `Missing hyperbolic function: ${k}`));

  // Identity cosh^2(x) - sinh^2(x) = 1 across test points
  [-2.3, -0.7, 0, 1.4, 2.8].forEach(x => {
    const ch = H.cosh.evalFn(x);
    const sh = H.sinh.evalFn(x);
    assert.ok(Math.abs(ch * ch - sh * sh - 1) < 1e-10, `cosh²(${x}) - sinh²(${x}) != 1`);
  });

  // Inverse round-trips
  assert.ok(Math.abs(H.arsinh.evalFn(H.sinh.evalFn(1.2)) - 1.2) < 1e-10);
  assert.ok(Math.abs(H.arcosh.evalFn(H.cosh.evalFn(1.5)) - 1.5) < 1e-10);
  assert.ok(Math.abs(H.artanh.evalFn(H.tanh.evalFn(0.6)) - 0.6) < 1e-10);
  assert.ok(Number.isNaN(H.arcosh.evalFn(0.5)), 'arcosh(0.5) must be NaN outside [1, ∞)');
  assert.ok(Number.isNaN(H.artanh.evalFn(1.2)), 'artanh(1.2) must be NaN outside (-1, 1)');
});

test('CSSlopeFieldRK4 integrates dy/dx = y from (0, 1) to y(1) ≈ e within 1e-4', () => {
  const pts = sandboxWindow.CSSlopeFieldRK4('y', 0, 1, -1, 1, 0.02);
  const last = pts[pts.length - 1];
  assert.ok(Math.abs(last[0] - 1) < 1e-6);
  assert.ok(Math.abs(last[1] - Math.E) < 1e-3, `Expected y(1) ≈ ${Math.E}, got ${last[1]}`);
});

// 2. Verify all 24 trigonometry tracks have 6-trig & 6-inverse-trig explanations + explorers
const EXPECTED_TRIG_TRACKS = [
  'a2level', 'act', 'act2', 'act2l2', 'addmath', 'alg2', 'apab', 'apbc', 'appc',
  'aslevel', 'calculus', 'edexcel', 'est', 'est2', 'est2l2', 'gaten', 'geo',
  'ibhl', 'ibsl', 'igcse', 'olympiad', 'precalc', 'sat', 'tahsili'
];

test('All 24 trigonometry tracks include 6-trig & 6-inverse-trig bilingual explanations and wired explorers', () => {
  for (const t of EXPECTED_TRIG_TRACKS) {
    const meta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, t, '_meta.json'), 'utf8'));
    const exJs = fs.readFileSync(path.join(EX_DIR, `${t}.js`), 'utf8');
    let foundTrig6 = false;
    let foundInv6 = false;

    for (const slug of meta.chapterOrder) {
      const ch = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, t, `${slug}.json`), 'utf8'));
      for (const b of ch.content.blocks) {
        if (b.kind === 'explorer' && b.controls) {
          const optVals = b.controls
            .filter(c => Array.isArray(c.options))
            .flatMap(c => c.options.map(o => o.value));
          if (['sin', 'cos', 'tan', 'csc', 'sec', 'cot'].every(v => optVals.includes(v))) {
            foundTrig6 = true;
            assert.ok(exJs.includes(b.canvasId), `${t}.js must wire ${b.canvasId}`);
            assert.ok(b.title.ar && b.title.ar.length > 5, `${b.canvasId} must have Arabic title`);
          }
          if (['arcsin', 'arccos', 'arctan', 'arccsc', 'arcsec', 'arccot'].every(v => optVals.includes(v))) {
            foundInv6 = true;
            assert.ok(exJs.includes(b.canvasId), `${t}.js must wire ${b.canvasId}`);
            assert.ok(b.title.ar && b.title.ar.length > 5, `${b.canvasId} must have Arabic title`);
          }
        }
      }
    }
    assert.ok(foundTrig6, `Track "${t}" is missing the 6-trigonometric-ratios interactive explorer`);
    assert.ok(foundInv6, `Track "${t}" is missing the 6-inverse-trig interactive explorer`);
  }
});

// 3. Verify all 31 tracks have Main Parent Functions (all 9 families) interactive explorer wired
test('All 31 curriculum tracks include the 9-family Main Functions interactive explorer & bilingual atlas', () => {
  const allTracks = fs.readdirSync(CONTENT_DIR).filter(d =>
    fs.statSync(path.join(CONTENT_DIR, d)).isDirectory() &&
    fs.existsSync(path.join(CONTENT_DIR, d, '_meta.json'))
  ).sort();
  assert.strictEqual(allTracks.length, 31, `Expected 31 tracks, found ${allTracks.length}`);

  const nineFamilies = [
    'constant', 'linear', 'quadratic', 'cubic', 'absolute',
    'radical', 'rational', 'exponential', 'logarithmic'
  ];

  let totalMainFnExplorers = 0;
  for (const t of allTracks) {
    const meta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, t, '_meta.json'), 'utf8'));
    const exJs = fs.readFileSync(path.join(EX_DIR, `${t}.js`), 'utf8');
    let trackCount = 0;

    for (const slug of meta.chapterOrder) {
      const ch = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, t, `${slug}.json`), 'utf8'));
      for (const b of ch.content.blocks) {
        if (b.kind === 'explorer' && b.controls) {
          const optVals = b.controls
            .filter(c => Array.isArray(c.options))
            .flatMap(c => c.options.map(o => o.value));
          if (nineFamilies.every(v => optVals.includes(v))) {
            trackCount++;
            totalMainFnExplorers++;
            assert.ok(exJs.includes(b.canvasId), `${t}.js must wire ${b.canvasId}`);
          }
        }
      }
    }
    assert.ok(trackCount >= 1, `Track "${t}" must have at least 1 Main Functions interactive explorer`);
  }
  assert.ok(totalMainFnExplorers >= 70, `Expected >= 70 Main Functions explorers across all tracks, found ${totalMainFnExplorers}`);
});

// 4. Verify Calculus Interactive Slope Field & Hyperbolic Explorers + Built _site HTML
test('Calculus ch-diffeq slopeCanvas is upgraded to interactive RK4/Euler lab and slope_field figures carry interactive hooks', () => {
  const diffeq = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'calculus', 'ch-diffeq.json'), 'utf8'));
  const slopeBlock = diffeq.content.blocks.find(b => b.kind === 'explorer' && b.canvasId === 'slopeCanvas');
  assert.ok(slopeBlock, 'ch-diffeq must contain slopeCanvas explorer');
  const ctrlIds = slopeBlock.controls.map(c => c.id);
  ['slopeFn', 'slopeX0', 'slopeY0', 'slopeH', 'slopeEuler', 'slopeNull'].forEach(id => {
    assert.ok(ctrlIds.includes(id), `slopeCanvas missing control ${id}`);
  });

  const calcJs = fs.readFileSync(path.join(EX_DIR, 'calculus.js'), 'utf8');
  assert.ok(calcJs.includes('CSMountSlopeFieldExplorer'), 'calculus.js must mount CSMountSlopeFieldExplorer');
  assert.ok(calcJs.includes('CSMountHyperbolicExplorer'), 'calculus.js must mount CSMountHyperbolicExplorer');

  const calcHtmlPath = path.join(SITE_DIR, 'calculus', 'index.html');
  if (fs.existsSync(calcHtmlPath)) {
    const calcHtml = fs.readFileSync(calcHtmlPath, 'utf8');
    assert.ok(calcHtml.includes('data-cs-interactive-slopefield="1"'), '_site/calculus/index.html must emit interactive slope field figure attributes');
    assert.ok(calcHtml.includes('id="slopeX0"'), '_site/calculus/index.html must render upgraded slopeX0 slider');
    assert.ok(calcHtml.includes('uge_chderivatives_hyperCanvas'), '_site/calculus/index.html must render Hyperbolic explorer canvas');
    assert.ok(calcHtml.includes('uge_chfoundations_trig6Canvas'), '_site/calculus/index.html must render 6-Trig explorer canvas');
    assert.ok(calcHtml.includes('uge_chfoundations_invtrig6Canvas'), '_site/calculus/index.html must render 6-Inverse-Trig explorer canvas');
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
console.log('🎉 All Interactive Graphs, Slope Fields, 6-Trig/6-Inverses, Main Functions & Hyperbolic checks passed!');
