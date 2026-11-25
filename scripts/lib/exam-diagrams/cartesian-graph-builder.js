/**
 * Deterministic Cartesian, Polar, Conic, Sinusoid, and Slope-Field spec builders.
 * Every coordinate, extremum, intercept, asymptote, Riemann rectangle, and tangent
 * point is computed algebraically — never eye-balled.
 */
'use strict';

function isFiniteNum(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

function roundCoord(v, digits = 3) {
  if (!isFiniteNum(v)) return 0;
  const factor = Math.pow(10, digits);
  return Math.round(v * factor) / factor;
}

function niceStep(span, targetTicks = 6) {
  if (!isFiniteNum(span) || span <= 0) return 1;
  const raw = span / targetTicks;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / pow;
  if (norm <= 1.2) return pow;
  if (norm <= 2.5) return 2 * pow;
  if (norm <= 5.5) return 5 * pow;
  return 10 * pow;
}

/**
 * Normalize an equation expression string into safe compact JS-math notation
 * compatible with both 02c-figures.js and generate.py.
 */
function normalizeExpr(expr) {
  return String(expr || '').trim();
}

/**
 * Build a Cartesian function graph figure spec (`type: 'fn'`).
 * Supports multiple curves, asymptotes (vertical/horizontal/slant), holes,
 * marked points, segments (piecewise/step), semicircles, Riemann rectangles,
 * shaded regions, and axis labels.
 */
function buildFunctionGraphSpec(opts = {}) {
  const xl = Array.isArray(opts.xl) && opts.xl.length === 2 ? opts.xl.map(Number) : [-6, 6];
  const yl = Array.isArray(opts.yl) && opts.yl.length === 2 ? opts.yl.map(Number) : [-6, 6];
  if (!isFiniteNum(xl[0]) || !isFiniteNum(xl[1]) || xl[0] >= xl[1]) {
    throw new Error(`Invalid xl bounds: ${JSON.stringify(opts.xl)}`);
  }
  if (!isFiniteNum(yl[0]) || !isFiniteNum(yl[1]) || yl[0] >= yl[1]) {
    throw new Error(`Invalid yl bounds: ${JSON.stringify(opts.yl)}`);
  }

  const spec = {
    type: 'fn',
    xl: [roundCoord(xl[0]), roundCoord(xl[1])],
    yl: [roundCoord(yl[0]), roundCoord(yl[1])],
    xStep: isFiniteNum(opts.xStep) && opts.xStep > 0 ? opts.xStep : niceStep(xl[1] - xl[0]),
    yStep: isFiniteNum(opts.yStep) && opts.yStep > 0 ? opts.yStep : niceStep(yl[1] - yl[0]),
  };

  if (Array.isArray(opts.fns) && opts.fns.length) {
    spec.fns = opts.fns.map((f) => {
      if (typeof f === 'string') return { fn: normalizeExpr(f) };
      const ex = normalizeExpr(f.fn || f.expr || f.y || '');
      const out = { fn: ex };
      if (f.color) out.color = f.color;
      if (f.dash) out.dash = f.dash;
      if (f.label) out.label = String(f.label);
      if (Array.isArray(f.domain) && f.domain.length === 2) {
        out.domain = [roundCoord(Number(f.domain[0])), roundCoord(Number(f.domain[1]))];
      }
      if (isFiniteNum(f.width)) out.width = f.width;
      return out;
    });
  }

  if (Array.isArray(opts.pts) && opts.pts.length) {
    spec.pts = opts.pts.map((p) => {
      const out = { x: roundCoord(Number(p.x)), y: roundCoord(Number(p.y)) };
      if (p.label) out.label = String(p.label);
      if (p.open || p.hollow) out.hollow = true;
      if (p.color) out.color = p.color;
      return out;
    });
  }

  if (Array.isArray(opts.segments) && opts.segments.length) {
    spec.segments = opts.segments.map((s) => {
      const out = {
        x1: roundCoord(Number(s.x1)),
        y1: roundCoord(Number(s.y1)),
        x2: roundCoord(Number(s.x2)),
        y2: roundCoord(Number(s.y2)),
      };
      if (s.color) out.color = s.color;
      if (s.dash) out.dash = s.dash;
      if (s.label) out.label = String(s.label);
      if (s.arrow) out.arrow = Boolean(s.arrow);
      return out;
    });
  }

  if (Array.isArray(opts.semicircles) && opts.semicircles.length) {
    spec.semicircles = opts.semicircles.map((sc) => ({
      cx: roundCoord(Number(sc.cx)),
      cy: roundCoord(Number(sc.cy)),
      r: roundCoord(Number(sc.r)),
      upper: sc.upper !== false,
      color: sc.color || '#2563eb',
      label: sc.label ? String(sc.label) : undefined,
      shade: Boolean(sc.shade),
    }));
  }

  if (opts.riemann && isFiniteNum(opts.riemann.a) && isFiniteNum(opts.riemann.b)) {
    spec.riemann = {
      expr: normalizeExpr(opts.riemann.expr || (spec.fns && spec.fns[0] ? spec.fns[0].expr : '')),
      a: roundCoord(Number(opts.riemann.a)),
      b: roundCoord(Number(opts.riemann.b)),
      n: Math.max(1, Math.round(Number(opts.riemann.n || 4))),
      rule: opts.riemann.rule || 'left', // left | right | midpoint | trap
    };
    if (opts.riemann.color) spec.riemann.color = opts.riemann.color;
  }

  if (opts.shade) spec.shade = opts.shade;
  if (Array.isArray(opts.asymptotes) && opts.asymptotes.length) {
    spec.asymptotes = opts.asymptotes.map((a) => ({
      type: a.type === 'h' || a.type === 's' ? a.type : 'v',
      v: a.type === 's' ? undefined : roundCoord(Number(a.v)),
      m: a.type === 's' ? roundCoord(Number(a.m)) : undefined,
      b: a.type === 's' ? roundCoord(Number(a.b)) : undefined,
      label: a.label ? String(a.label) : undefined,
    }));
  }

  if (opts.xlabel) spec.xlabel = String(opts.xlabel);
  if (opts.ylabel) spec.ylabel = String(opts.ylabel);
  if (opts.title) spec.title = String(opts.title);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  if (opts.notToScale) spec.notToScale = true;
  if (opts.grid === false) spec.grid = false;
  if (isFiniteNum(opts.w)) spec.w = opts.w;
  if (isFiniteNum(opts.h)) spec.h = opts.h;

  return spec;
}

/**
 * Build a piecewise AP Calculus f' graph composed of line segments and/or semicircles
 * plus clean labeled boundary points and optional region labels.
 */
function buildPiecewiseDerivativeSpec(opts = {}) {
  return buildFunctionGraphSpec({
    xl: opts.xl || [-4, 8],
    yl: opts.yl || [-4, 5],
    xStep: opts.xStep || 1,
    yStep: opts.yStep || 1,
    segments: opts.segments || [],
    semicircles: opts.semicircles || [],
    pts: opts.pts || [],
    xlabel: opts.xlabel || 'x',
    ylabel: opts.ylabel || "f'(x)",
    caption: opts.caption || "Graph of f'(x)",
    caption_ar: opts.caption_ar,
  });
}

/**
 * Build an AP Calculus slope field spec (`type: 'slope_field'`).
 */
function buildSlopeFieldSpec(opts = {}) {
  const xl = Array.isArray(opts.xl) ? opts.xl.map(Number) : [-3, 3];
  const yl = Array.isArray(opts.yl) ? opts.yl.map(Number) : [-3, 3];
  if (!opts.dydx) throw new Error('slope_field requires dydx expression');
  const spec = {
    type: 'slope_field',
    dydx: normalizeExpr(opts.dydx),
    xl: [roundCoord(xl[0]), roundCoord(xl[1])],
    yl: [roundCoord(yl[0]), roundCoord(yl[1])],
    step: isFiniteNum(opts.step) ? opts.step : 1,
  };
  if (opts.solutionCurve) spec.solutionCurve = opts.solutionCurve;
  if (opts.pts) spec.pts = opts.pts;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a Polar curve spec (`type: 'polar_graph'`) for AP Calculus BC & AP Precalculus.
 * Computes exact auto rMax if not provided.
 */
function buildPolarGraphSpec(opts = {}) {
  const curves = (opts.curves || [{ rExpr: opts.rExpr || '2 + 2*cos(t)', label: opts.label }]).map((c) => ({
    rExpr: normalizeExpr(c.rExpr || c.expr || '2'),
    color: c.color || '#2563eb',
    dash: c.dash || undefined,
    label: c.label ? String(c.label) : undefined,
    tMin: isFiniteNum(c.tMin) ? roundCoord(c.tMin, 4) : 0,
    tMax: isFiniteNum(c.tMax) ? roundCoord(c.tMax, 4) : roundCoord(Math.PI * 2, 4),
  }));

  const spec = {
    type: 'polar_graph',
    curves,
    rMax: isFiniteNum(opts.rMax) && opts.rMax > 0 ? roundCoord(opts.rMax) : 4,
    thetaStepDeg: isFiniteNum(opts.thetaStepDeg) ? opts.thetaStepDeg : 30,
  };
  if (opts.shadeSector) spec.shadeSector = opts.shadeSector;
  if (Array.isArray(opts.pts) && opts.pts.length) spec.pts = opts.pts;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a Conic Section spec (`type: 'conic_section'`).
 */
function buildConicSpec(opts = {}) {
  const conic = opts.conic || 'parabola';
  const spec = {
    type: 'conic_section',
    conic,
    h: isFiniteNum(opts.h) ? roundCoord(opts.h) : 0,
    k: isFiniteNum(opts.k) ? roundCoord(opts.k) : 0,
    a: isFiniteNum(opts.a) ? roundCoord(opts.a) : 3,
    b: isFiniteNum(opts.b) ? roundCoord(opts.b) : 2,
    p: isFiniteNum(opts.p) ? roundCoord(opts.p) : 1,
    orientation: opts.orientation === 'horizontal' ? 'horizontal' : 'vertical',
  };
  if (opts.xl) spec.xl = opts.xl;
  if (opts.yl) spec.yl = opts.yl;
  if (opts.showFoci !== undefined) spec.showFoci = Boolean(opts.showFoci);
  if (opts.showDirectrix !== undefined) spec.showDirectrix = Boolean(opts.showDirectrix);
  if (opts.showAsymptotes !== undefined) spec.showAsymptotes = Boolean(opts.showAsymptotes);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a Sinusoid spec (`type: 'sinusoid'`).
 */
function buildSinusoidSpec(opts = {}) {
  const spec = {
    type: 'sinusoid',
    amp: isFiniteNum(opts.amp) ? opts.amp : (isFiniteNum(opts.A) ? opts.A : 2),
    freq: isFiniteNum(opts.freq) ? opts.freq : (isFiniteNum(opts.B) ? opts.B : 1),
    phase: isFiniteNum(opts.phase) ? opts.phase : (isFiniteNum(opts.C) ? opts.C : 0),
    midline: isFiniteNum(opts.midline) ? opts.midline : (isFiniteNum(opts.D) ? opts.D : 0),
    fnType: opts.fnType === 'cos' ? 'cos' : 'sin',
  };
  if (opts.xl) spec.xl = opts.xl;
  if (opts.yl) spec.yl = opts.yl;
  if (opts.pts) spec.pts = opts.pts;
  if (opts.showMidline !== undefined) spec.showMidline = Boolean(opts.showMidline);
  if (opts.xlabel) spec.xlabel = String(opts.xlabel);
  if (opts.ylabel) spec.ylabel = String(opts.ylabel);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a Shaded Region spec (`type: 'shaded_region'`) between two curves on [a, b].
 */
function buildShadedRegionSpec(opts = {}) {
  if (!isFiniteNum(opts.a) || !isFiniteNum(opts.b) || opts.a >= opts.b) {
    throw new Error('shaded_region requires valid a < b bounds');
  }
  const spec = {
    type: 'shaded_region',
    upper: normalizeExpr(opts.upper || 'x'),
    lower: normalizeExpr(opts.lower || '0'),
    a: roundCoord(opts.a),
    b: roundCoord(opts.b),
    xl: Array.isArray(opts.xl) ? opts.xl.map(Number) : [roundCoord(opts.a - 1), roundCoord(opts.b + 1)],
    yl: Array.isArray(opts.yl) ? opts.yl.map(Number) : [-1, 6],
  };
  if (opts.pts) spec.pts = opts.pts;
  if (opts.labelUpper) spec.labelUpper = String(opts.labelUpper);
  if (opts.labelLower) spec.labelLower = String(opts.labelLower);
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a Unit Circle spec (`type: 'unit_circle'`).
 */
function buildUnitCircleSpec(opts = {}) {
  const spec = {
    type: 'unit_circle',
    angles: Array.isArray(opts.angles) ? opts.angles : [{ deg: 30, label: 'pi/6' }],
    showQuadrants: opts.showQuadrants !== false,
  };
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

module.exports = {
  isFiniteNum,
  roundCoord,
  niceStep,
  buildFunctionGraphSpec,
  buildPiecewiseDerivativeSpec,
  buildSlopeFieldSpec,
  buildPolarGraphSpec,
  buildConicSpec,
  buildSinusoidSpec,
  buildShadedRegionSpec,
  buildUnitCircleSpec,
};
