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
  },
  {
    type: 'box_plot',
    name: 'Box Plot (box_plot)',
    fig: {
      type: 'box_plot',
      title: 'Class Scores',
      min: 45,
      q1: 62,
      med: 74,
      q3: 88,
      max: 98,
      outliers: [30]
    }
  },
  {
    type: 'histogram',
    name: 'Histogram',
    fig: {
      type: 'histogram',
      title: 'Commute Times',
      bins: ['0–10', '10–20', '20–30', '30–40', '40–50'],
      freqs: [4, 12, 18, 9, 3],
      xlabel: 'Minutes'
    }
  },
  {
    type: 'dot_plot',
    name: 'Dot Plot',
    fig: {
      type: 'dot_plot',
      title: 'Siblings per Student',
      data: [0, 1, 1, 2, 2, 2, 2, 3, 3, 4],
      xlabel: 'Number of Siblings'
    }
  },
  {
    type: 'unit_circle',
    name: 'Unit Circle',
    fig: {
      type: 'unit_circle',
      title: 'Trig Reference',
      angle: 45,
      showTriangle: true
    }
  },
  {
    type: 'sinusoid',
    name: 'Sinusoid',
    fig: {
      type: 'sinusoid',
      title: 'Tidal Wave',
      amp: 3,
      period: 6.28,
      midline: 2,
      fnType: 'sin'
    }
  },
  {
    type: 'normal_curve',
    name: 'Normal Curve',
    fig: {
      type: 'normal_curve',
      title: 'Standard Normal Distribution',
      mean: 100,
      sd: 15,
      shade: [85, 115]
    }
  },
  {
    type: 'slope_field',
    name: 'Slope Field',
    fig: {
      type: 'slope_field',
      title: 'dy/dx = x - y',
      fn: 'x - y',
      xrange: [-3, 3],
      yrange: [-3, 3],
      solution: { x0: 0, y0: 1 }
    }
  },
  {
    type: 'two_way_table',
    name: 'Two-Way Table',
    fig: {
      type: 'two_way_table',
      title: 'Survey Results',
      rows: ['Grade 10', 'Grade 11'],
      cols: ['Pass', 'Fail'],
      data: [[45, 5], [48, 2]],
      highlight: { row: 0, col: 0 }
    }
  }
];

// Test each fixture
fixtures.forEach(({ type, name, fig }) => {
  it(`Renders accessible output for ${name}`, () => {
    const out = window._renderFig(fig);
    assert.ok(out && out.length > 50, `Rendered output should not be empty for ${type}`);
    if (type === 'two_way_table' || type === 'table') {
      assert.ok(out.includes('<table') && out.includes('role="table"'), `Table for ${type} must have role="table"`);
      assert.ok(out.includes('aria-label="'), `Table for ${type} must have aria-label`);
    } else {
      assert.ok(out.includes('role="img"'), `SVG for ${type} must have role="img"`);
      assert.ok(out.includes('aria-label="'), `SVG for ${type} must have aria-label`);
      assert.ok(out.includes('<title>'), `SVG for ${type} must have <title>`);
      assert.ok(!out.includes('style="background:#fbfcfe'), `SVG for ${type} should not have hardcoded white background`);
    }

    // Verify accessible description is meaningful
    const label = window._figA11yLabel(fig);
    assert.ok(label && label.length > 5, `_figA11yLabel for ${type} should return descriptive text (got: "${label}")`);
    assert.notStrictEqual(label, 'Mathematical figure', `_figA11yLabel for ${type} should not fallback to generic placeholder`);
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

// Test figureBlock schema validation (Plan 10.3c / 10.5)
it('course_schema.json validates figureBlock in chapter blocks[]', () => {
  const Ajv = require('ajv');
  const schemaPath = path.join(__dirname, '..', 'course_schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const ajv = new Ajv({ allErrors: true, strict: false });
  ajv.addSchema(schema, schema.$id);
  const validateChapter = ajv.compile({ $ref: `${schema.$id}#/definitions/chapter` });

  const testChapter = {
    id: 'test-diagrams',
    title: { en: 'Diagram Foundations', ar: null },
    content: {
      blocks: [
        {
          kind: 'figure',
          id: 'fig-unit-circle',
          title: { en: 'The Unit Circle', ar: null },
          caption: { en: 'Angles in standard position with terminal points.', ar: null },
          figure: {
            type: 'unit_circle',
            angles: [0, 30, 45, 60, 90]
          }
        }
      ]
    }
  };

  const valid = validateChapter(testChapter);
  assert.ok(valid, `Test chapter with figure block should validate against course_schema.json: ${JSON.stringify(validateChapter.errors)}`);
});

// Test SSR renderFig filter produces accessible SVG
it('renderFig SSR filter returns valid accessible SVG for figure block', () => {
  const spec = {
    type: 'box_plot',
    fiveNum: [10, 25, 40, 65, 80],
    axis: { min: 0, max: 100, step: 20 }
  };
  const svg = window._renderFig(spec);
  assert.ok(svg.includes('<svg'), 'Should return SVG markup');
  assert.ok(svg.includes('role="img"'), 'Should have role="img"');
  assert.ok(svg.includes('aria-label='), 'Should have aria-label');
  assert.ok(svg.includes('class="mfig-svg"'), 'Should have class="mfig-svg"');
  assert.ok(svg.includes('var(--fig-'), 'Should use theme-aware tokens');
});

console.log(`\n── Figure Tests Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ All figure unit tests passed successfully!\n');
}
