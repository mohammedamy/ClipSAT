#!/usr/bin/env node
/**
 * scripts/test-figures.js
 * Unit test suite for ClipSAT's theme-aware, accessible figure renderers (Plan 10.3a).
 * Tests both window._renderFig and window.renderMathFigure across all 14 figure types.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Load compiled figures module in a simulated window environment
const figuresPath = path.join(__dirname, '..', 'public', 'js', 'figures.js');
if (!fs.existsSync(figuresPath)) {
  console.error('figures.js not found. Run "node build.js" first.');
  process.exit(1);
}

const window = {};
global.window = window;

const code = fs.readFileSync(figuresPath, 'utf8');
// Evaluate in global context
const fn = new Function('window', code);
fn(window);

console.log('── Running Plan 10.3a Figure Renderer Unit Tests ──');

let passed = 0;
let failed = 0;

function it(desc, fnTest) {
  try {
    fnTest();
    console.log(`  ✓ ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

// 1. Palette check
it('Palette defines CSS custom property variables with fallbacks', () => {
  assert.strictEqual(typeof window.FIG_INDIGO, 'string');
  assert.ok(window.FIG_INDIGO.includes('var(--fig-indigo'), 'FIG_INDIGO should use var(--fig-indigo)');
  assert.ok(window.FIG_BG.includes('var(--fig-bg'), 'FIG_BG should use var(--fig-bg)');
  assert.ok(window.FIG_INK.includes('var(--fig-ink'), 'FIG_INK should use var(--fig-ink)');
  assert.ok(window.FIG_BORDER.includes('var(--fig-border'), 'FIG_BORDER should use var(--fig-border)');
  assert.ok(window.FIG_GRID.includes('var(--fig-grid'), 'FIG_GRID should use var(--fig-grid)');
  assert.ok(window.FIG_AMBER.includes('var(--fig-amber'), 'FIG_AMBER should use var(--fig-amber)');
  assert.ok(window.FIG_TEAL.includes('var(--fig-teal'), 'FIG_TEAL should use var(--fig-teal)');
});

// 2. Export check
it('Exposes _renderFig, renderMathFigure, and _figA11yLabel on window', () => {
  assert.strictEqual(typeof window._renderFig, 'function');
  assert.strictEqual(typeof window.renderMathFigure, 'function');
  assert.strictEqual(typeof window._figA11yLabel, 'function');
});

// Fixtures for all 14 figure types
const fixtures = [
  {
    type: 'fn',
    name: 'Function Plot (fn)',
    fig: {
      type: 'fn',
      fns: [{ fn: 'x^2 - 4', label: 'f(x) = x^2 - 4' }],
      points: [{ x: 2, y: 0, label: 'Root (2,0)' }, { x: 0, y: -4, open: true }],
      xrange: [-4, 4],
      yrange: [-5, 5]
    }
  },
  {
    type: 'triangle',
    name: 'Triangle',
    fig: {
      type: 'triangle',
      vertices: [[0, 0], [4, 0], [0, 3]],
      labels: ['A', 'B', 'C'],
      sides: ['4', '5', '3'],
      angles: ['', '', '90°'],
      right: 0
    }
  },
  {
    type: 'polygon',
    name: 'Polygon / Rectangle',
    fig: {
      type: 'rect',
      vertices: [[0, 0], [6, 0], [6, 4], [0, 4]],
      labels: ['A', 'B', 'C', 'D'],
      sides: ['6', '4', '6', '4']
    }
  },
  {
    type: 'circle',
    name: 'Circle',
    fig: {
      type: 'circle',
      center: 'O',
      radius: '5',
      sector: { start_deg: 0, end_deg: 60, label: '60°' }
    }
  },
  {
    type: 'vertex_angles',
    name: 'Vertex Angles (Vertical)',
    fig: {
      type: 'vertex_angles',
      mode: 'vertical',
      labels: { 1: 'x + 10', 2: '40°' }
    }
  },
  {
    type: 'similar',
    name: 'Similar Shapes',
    fig: {
      type: 'similar',
      vertices: [[0, 0], [6, 0], [3, 4]],
      ratio: 0.6,
      left: { caption: 'Triangle 1' },
      right: { caption: 'Triangle 2' }
    }
  },
  {
    type: 'transversal',
    name: 'Transversal',
    fig: {
      type: 'transversal',
      angle: 65,
      labels: { 1: '115°', 5: 'x' }
    }
  },
  {
    type: 'bar',
    name: 'Bar Chart',
    fig: {
      type: 'bar',
      title: 'Exam Scores',
      data: [{ label: 'A', val: 12 }, { label: 'B', val: 24 }, { label: 'C', val: 18 }]
    }
  },
  {
    type: 'dots',
    name: 'Dots Diagram',
    fig: {
      type: 'dots',
      total: 15,
      groups: [{ n: 10, label: 'Blue' }, { n: 5, label: 'Red' }],
      bag: true
    }
  },
  {
    type: 'venn',
    name: 'Venn Diagram',
    fig: {
      type: 'venn',
      title: 'Probability Events',
      textA: 'P(A)=0.5',
      textB: 'P(B)=0.4'
    }
  },
  {
    type: 'scatter',
    name: 'Scatter Plot',
    fig: {
      type: 'scatter',
      title: 'Height vs Weight',
      pts: [[150, 50], [160, 58], [170, 65], [180, 75]],
      xlabel: 'Height (cm)',
      ylabel: 'Weight (kg)'
    }
  },
  {
    type: 'numberline',
    name: 'Number Line',
    fig: {
      type: 'numberline',
      range: [-3, 7],
      points: [{ x: 2, label: 'P' }, { x: 5, open: true, label: 'Q' }],
      shade: [[0, 4]]
    }
  },
  {
    type: 'geometry_3d',
    name: '3D Geometry (renderMathFigure)',
    fig: {
      type: 'geometry_3d',
      solid: 'cylinder',
      radius: 4,
      height: 10,
      labels: { r: '4', h: '10' }
    }
  },
  {
    type: 'pie',
    name: 'Pie Chart (renderMathFigure)',
    fig: {
      type: 'pie',
      title: 'Budget Allocation',
      slices: [{ label: 'Tuition', val: 60 }, { label: 'Books', val: 40 }]
    }
  }
];

// Test each fixture
fixtures.forEach(({ type, name, fig }) => {
  it(`Renders accessible SVG for ${name}`, () => {
    const svg = window._renderFig(fig);
    assert.ok(svg && svg.length > 50, `Rendered SVG should not be empty for ${type}`);
    assert.ok(svg.includes('role="img"'), `SVG for ${type} must have role="img"`);
    assert.ok(svg.includes('aria-label="'), `SVG for ${type} must have aria-label`);
    assert.ok(svg.includes('<title>'), `SVG for ${type} must have <title>`);

    // Verify accessible description is meaningful
    const label = window._figA11yLabel(fig);
    assert.ok(label && label.length > 5, `_figA11yLabel for ${type} should return descriptive text (got: "${label}")`);
    assert.notStrictEqual(label, 'Mathematical figure', `_figA11yLabel for ${type} should not fallback to generic placeholder`);

    // Verify no un-themed white background style
    assert.ok(!svg.includes('style="background:#fbfcfe'), `SVG for ${type} should not have hardcoded white background`);
  });
});

// Test open point theming
it('Open points on numberline and fn plots use FIG_BG instead of hardcoded white (#fff)', () => {
  const fnSvg = window._renderFig({
    type: 'fn',
    fns: [{ fn: 'x' }],
    points: [{ x: 1, y: 1, open: true }]
  });
  assert.ok(!fnSvg.includes('fill="#fff"'), 'Open point on fn should use FIG_BG, not #fff');

  const nlSvg = window._renderFig({
    type: 'numberline',
    range: [-2, 2],
    points: [{ x: 0, open: true }]
  });
  assert.ok(!nlSvg.includes('fill="#fff"'), 'Open point on numberline should use FIG_BG, not #fff');
});

// Test cylinder and sphere shading in 3D geometry
it('3D Geometry cylinder and sphere use theme-aware fills', () => {
  const cylSvg = window._renderFig({
    type: 'geometry_3d',
    solid: 'cylinder',
    radius: 3,
    height: 6
  });
  assert.ok(!cylSvg.includes('fill="#eef2fa"'), 'Cylinder top face should use theme fill, not hardcoded #eef2fa');

  const sphSvg = window._renderFig({
    type: 'geometry_3d',
    solid: 'sphere',
    radius: 5
  });
  assert.ok(!sphSvg.includes('stop-color="#eef2fb"'), 'Sphere gradient should use theme stop-color, not #eef2fb');
});

console.log(`\n── Figure Tests Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ All figure unit tests passed successfully!\n');
}
