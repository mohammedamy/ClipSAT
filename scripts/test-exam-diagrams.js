#!/usr/bin/env node
/**
 * Unit & integration tests for scripts/lib/exam-diagrams/ + 02c-figures.js runtime.
 * Verifies every diagram/table builder produces valid specs that render cleanly
 * without NaN coordinates, undefined attrs, or exceptions.
 */
'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const lib = require('./lib/exam-diagrams');

// Load 02c-figures.js inside a clean window sandbox (matching .eleventy.js VM behavior)
const sandbox = {
  window: {},
  Math,
  JSON,
  Array,
  Object,
  Number,
  String,
  Boolean,
  isFinite,
  isNaN,
  parseFloat,
  parseInt,
  console,
};
sandbox.window = sandbox;
const figuresJs = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '02c-figures.js'), 'utf8');
vm.runInNewContext(figuresJs, sandbox, { filename: '02c-figures.js' });

const tests = [];
function it(name, fn) { tests.push({ name, fn }); }

it('buildFunctionGraphSpec produces finite fn + riemann + semicircles + segments SVG', () => {
  const spec = lib.buildPiecewiseDerivativeSpec({
    xl: [-3, 7],
    yl: [-3, 4],
    segments: [{ x1: -3, y1: -2, x2: 1, y2: 2 }, { x1: 5, y1: 0, x2: 7, y2: -2 }],
    semicircles: [{ cx: 3, cy: 0, r: 2, upper: true, shade: true }],
    pts: [{ x: 1, y: 2, label: '(1, 2)' }, { x: 3, y: 2, label: '(3, 2)' }],
  });
  assert.deepStrictEqual(lib.validateFigureSpec(spec), []);
  const html = sandbox._renderFig(spec);
  assert.ok(html.includes('<svg') && html.includes('<path d="M'), 'Semicircle path must render');
  assert.ok(!/NaN|undefined/.test(html), 'SVG must contain zero NaN/undefined');
});

it('buildFunctionGraphSpec renders Riemann trapezoids cleanly', () => {
  const spec = lib.buildFunctionGraphSpec({
    xl: [0, 5],
    yl: [0, 10],
    fns: [{ expr: '0.4*x^2 + 1' }],
    riemann: { expr: '0.4*x^2 + 1', a: 1, b: 4, n: 3, rule: 'trap' },
  });
  assert.deepStrictEqual(lib.validateFigureSpec(spec), []);
  const html = sandbox._renderFig(spec);
  assert.ok(html.includes('<polygon'), 'Trapezoidal Riemann sum must render polygons');
  assert.ok(!/NaN|undefined/.test(html));
});

it('buildPolarGraphSpec renders polar rose/cardioid SVG cleanly', () => {
  const spec = lib.buildPolarGraphSpec({
    curves: [{ rExpr: '2 + 2*cos(t)', label: 'r = 2 + 2 cos θ' }],
    rMax: 4,
    pts: [{ r: 4, theta: 0, label: '(4, 0)' }],
  });
  assert.deepStrictEqual(lib.validateFigureSpec(spec), []);
  const html = sandbox._renderFig(spec);
  assert.ok(html.includes('<svg') && html.includes('<polyline'), 'Polar graph must render polyline');
  assert.ok(!/NaN|undefined/.test(html));
});

it('buildGroupedBarSpec renders grouped_bar and multi_line cleanly', () => {
  const gSpec = lib.buildGroupedBarSpec({
    categories: ['2022', '2023', '2024'],
    series: [{ name: 'School A', values: [42, 55, 61] }, { name: 'School B', values: [38, 49, 64] }],
  });
  assert.deepStrictEqual(lib.validateFigureSpec(gSpec), []);
  const gHtml = sandbox._renderFig(gSpec);
  assert.ok(gHtml.includes('<rect') && !/NaN|undefined/.test(gHtml));

  const mSpec = lib.buildGroupedBarSpec({
    line: true,
    categories: ['Q1', 'Q2', 'Q3'],
    series: [{ name: 'Model', values: [12, 18, 25] }],
  });
  const mHtml = sandbox._renderFig(mSpec);
  assert.ok(mHtml.includes('<polyline') && !/NaN|undefined/.test(mHtml));
});

it('buildRightTriangleSpec and geometry builders solve coordinates accurately', () => {
  const tri = lib.buildRightTriangleSpec({ verts: ['C', 'B', 'A'], rightAngleAt: 'C', base: 8, height: 6, hypLabel: '10', baseLabel: '8', heightLabel: '6' });
  assert.deepStrictEqual(tri.coords, [[0, 0], [8, 0], [0, 6]]);
  const html = sandbox._renderFig(tri);
  assert.ok(html.includes('<svg') && !/NaN|undefined/.test(html));
});

it('buildHorizontalValuesTable and buildTwoWayTableSpec compute exact totals and render .exam-table-wrap', () => {
  const hTbl = lib.buildHorizontalValuesTable({
    x: [0, 2, 5, 8],
    series: [{ label: '\\(f(t)\\)', values: [3, 7, 4, -2] }, { label: "\\(f'(t)\\)", values: [2, 1, -3, -1] }],
  });
  assert.deepStrictEqual(lib.validateFigureSpec(hTbl), []);
  const hHtml = sandbox._renderFig(hTbl);
  assert.ok(hHtml.includes('exam-table-wrap') && hHtml.includes('exam-table-horiz'));

  const tw = lib.buildTwoWayTableSpec({
    rowLabels: ['Grade 10', 'Grade 11'],
    colLabels: ['STEM', 'Humanities'],
    counts: [[42, 18], [35, 25]],
  });
  assert.strictEqual(tw._totals.grandTotal, 120);
  const cleanTw = lib.stripInternalMeta(tw);
  assert.deepStrictEqual(lib.validateFigureSpec(cleanTw), []);
  const twHtml = sandbox._renderFig(cleanTw);
  assert.ok(twHtml.includes('exam-table-wrap') && twHtml.includes('120'));
});

it('buildBoxPlotSpec validates five-number summary order and renders SVG', () => {
  const bx = lib.buildBoxPlotSpec({ label: 'Set A', min: 10, q1: 15, med: 22, q3: 29, max: 35 });
  assert.deepStrictEqual(lib.validateFigureSpec(bx), []);
  const html = sandbox._renderFig(bx);
  assert.ok(html.includes('<svg') && !/NaN|undefined/.test(html));
  assert.throws(() => lib.buildBoxPlotSpec({ min: 20, q1: 15, med: 22, q3: 29, max: 35 }));
});

let passed = 0;
for (const t of tests) {
  t.fn();
  passed++;
  console.log(`  PASS  ${t.name}`);
}
console.log(`\nAll ${passed}/${tests.length} exam-diagrams tests passed.`);
