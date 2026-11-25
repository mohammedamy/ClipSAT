/**
 * Statistics, Probability, Calculus & Number-Line visual spec builders.
 * Produces compact, data-exact figure objects compatible with 02c-figures.js and generate.py.
 */
'use strict';

const { isFiniteNum, roundCoord } = require('./cartesian-graph-builder');

function buildBarChartSpec(opts = {}) {
  const labels = Array.isArray(opts.labels) ? opts.labels.map(String) : [];
  const values = Array.isArray(opts.values) ? opts.values.map(Number) : [];
  if (!labels.length || labels.length !== values.length) {
    throw new Error('bar_chart requires equal-length labels and values');
  }
  const spec = {
    type: 'bars',
    labels,
    values: values.map((v) => roundCoord(v)),
  };
  if (opts.xLabel) spec.xLabel = String(opts.xLabel);
  if (opts.yLabel) spec.yLabel = String(opts.yLabel);
  if (isFiniteNum(opts.yMax)) spec.yMax = opts.yMax;
  if (opts.title) spec.title = String(opts.title);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

function buildGroupedBarSpec(opts = {}) {
  const categories = Array.isArray(opts.categories) ? opts.categories.map(String) : [];
  const series = Array.isArray(opts.series) ? opts.series : [];
  if (!categories.length || !series.length) {
    throw new Error('grouped_bar requires non-empty categories and series');
  }
  const spec = {
    type: opts.line ? 'multi_line' : 'grouped_bar',
    categories,
    series: series.map((s) => ({
      name: String(s.name || ''),
      values: (s.values || []).map((v) => roundCoord(Number(v))),
      color: s.color || undefined,
    })),
  };
  if (opts.xLabel) spec.xLabel = String(opts.xLabel);
  if (opts.yLabel) spec.yLabel = String(opts.yLabel);
  if (opts.title) spec.title = String(opts.title);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

function buildHistogramSpec(opts = {}) {
  const bins = Array.isArray(opts.bins) ? opts.bins : [];
  if (!bins.length) throw new Error('histogram requires non-empty bins');
  const spec = {
    type: 'histogram',
    bins: bins.map((b) => ({
      label: String(b.label),
      count: Math.max(0, Number(b.count)),
    })),
  };
  if (opts.xLabel) spec.xLabel = String(opts.xLabel);
  if (opts.yLabel) spec.yLabel = String(opts.yLabel);
  if (opts.title) spec.title = String(opts.title);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

function buildBoxPlotSpec(opts = {}) {
  const boxes = Array.isArray(opts.boxes)
    ? opts.boxes
    : [{ label: opts.label || 'Data', min: opts.min, q1: opts.q1, med: opts.med, q3: opts.q3, max: opts.max }];
  for (const bx of boxes) {
    if (!(bx.min <= bx.q1 && bx.q1 <= bx.med && bx.med <= bx.q3 && bx.q3 <= bx.max)) {
      throw new Error(`Invalid five-number summary order in boxplot: ${JSON.stringify(bx)}`);
    }
  }
  const spec = {
    type: 'boxplot',
    boxes: boxes.map((bx) => ({
      label: String(bx.label || ''),
      min: roundCoord(Number(bx.min)),
      q1: roundCoord(Number(bx.q1)),
      med: roundCoord(Number(bx.med)),
      q3: roundCoord(Number(bx.q3)),
      max: roundCoord(Number(bx.max)),
    })),
  };
  if (opts.xLabel) spec.xLabel = String(opts.xLabel);
  if (opts.range) spec.range = opts.range;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

function buildDotPlotSpec(opts = {}) {
  const counts = opts.counts && typeof opts.counts === 'object' ? opts.counts : {};
  const keys = Object.keys(counts).sort((a, b) => Number(a) - Number(b));
  if (!keys.length) throw new Error('dot_plot requires counts map { value: freq }');
  const data = [];
  for (const k of keys) {
    const n = Number(counts[k]) || 0;
    for (let i = 0; i < n; i++) data.push(Number(k));
  }
  const spec = {
    type: 'dot_plot',
    data,
    counts,
  };
  if (opts.xLabel) spec.xLabel = String(opts.xLabel);
  if (opts.title) spec.title = String(opts.title);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

function buildScatterSpec(opts = {}) {
  const pts = Array.isArray(opts.pts) ? opts.pts : [];
  if (pts.length < 3) throw new Error('scatter requires at least 3 data points');
  const spec = {
    type: 'scatter',
    pts: pts.map((p) => (Array.isArray(p) ? [roundCoord(Number(p[0])), roundCoord(Number(p[1]))] : [roundCoord(Number(p.x)), roundCoord(Number(p.y))])),
  };
  if (opts.line) spec.line = opts.line;
  if (opts.xl) spec.xl = opts.xl;
  if (opts.yl) spec.yl = opts.yl;
  if (opts.xLabel) spec.xLabel = String(opts.xLabel);
  if (opts.yLabel) spec.yLabel = String(opts.yLabel);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

function buildNormalCurveSpec(opts = {}) {
  const mu = isFiniteNum(opts.mean) ? Number(opts.mean) : (isFiniteNum(opts.mu) ? Number(opts.mu) : 0);
  const sigma = isFiniteNum(opts.sd) && opts.sd > 0 ? Number(opts.sd) : (isFiniteNum(opts.sigma) && opts.sigma > 0 ? Number(opts.sigma) : 1);
  const spec = {
    type: 'normal_curve',
    mean: roundCoord(mu),
    sd: roundCoord(sigma),
  };
  if (Array.isArray(opts.shadeRange) && opts.shadeRange.length === 2) {
    spec.shadeRange = [roundCoord(Number(opts.shadeRange[0])), roundCoord(Number(opts.shadeRange[1]))];
  }
  if (opts.showRule !== undefined) spec.showRule = Boolean(opts.showRule);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

function buildPieChartSpec(opts = {}) {
  const slices = Array.isArray(opts.slices) ? opts.slices : [];
  if (!slices.length) throw new Error('pie requires non-empty slices');
  const spec = {
    type: 'pie',
    slices: slices.map((s) => ({
      label: String(s.label),
      value: roundCoord(Number(s.value)),
      color: s.color || undefined,
    })),
  };
  if (opts.title) spec.title = String(opts.title);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

function buildNumberLineSpec(opts = {}) {
  const min = isFiniteNum(opts.min) ? Number(opts.min) : -5;
  const max = isFiniteNum(opts.max) ? Number(opts.max) : 5;
  if (min >= max) throw new Error('numberline requires min < max');
  const spec = {
    type: 'numberline',
    min: roundCoord(min),
    max: roundCoord(max),
    step: isFiniteNum(opts.step) && opts.step > 0 ? opts.step : 1,
  };
  if (Array.isArray(opts.intervals)) spec.intervals = opts.intervals;
  if (Array.isArray(opts.pts)) spec.pts = opts.pts;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

function buildVennSpec(opts = {}) {
  const spec = {
    type: 'venn',
    sets: Array.isArray(opts.sets) ? opts.sets : [{ label: 'A', only: 10 }, { label: 'B', only: 8 }],
    both: isFiniteNum(opts.both) ? opts.both : 4,
    outside: isFiniteNum(opts.outside) ? opts.outside : 0,
  };
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

module.exports = {
  buildBarChartSpec,
  buildGroupedBarSpec,
  buildHistogramSpec,
  buildBoxPlotSpec,
  buildDotPlotSpec,
  buildScatterSpec,
  buildNormalCurveSpec,
  buildPieChartSpec,
  buildNumberLineSpec,
  buildVennSpec,
};
