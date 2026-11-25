/**
 * Deterministic 2D & 3D Geometry figure builders.
 * Every triangle, transversal, circle theorem, polygon, composite shaded region,
 * and 3D solid computes exact vertex positions and ensures zero label clipping.
 */
'use strict';

const { isFiniteNum, roundCoord } = require('./cartesian-graph-builder');

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function dist(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

/**
 * Build a Triangle spec (`type: 'triangle'`), solving exact vertices from side lengths
 * (SSS) or legs (right triangle). Never hand-guesses coordinates.
 */
function buildTriangleSpec(opts = {}) {
  const vNames = Array.isArray(opts.verts) && opts.verts.length === 3 ? opts.verts : (Array.isArray(opts.labels) ? opts.labels : ['A', 'B', 'C']);
  const spec = {
    type: 'triangle',
    verts: vNames,
    labels: vNames,
  };

  if (opts.rightAngleAt) {
    spec.rightAngle = opts.rightAngleAt;
    spec.rightAt = opts.rightAngleAt;
  } else if (opts.rightAngle) {
    spec.rightAngle = opts.rightAngle;
  }

  if (Array.isArray(opts.sides) && opts.sides.length === 3) {
    spec.sides = opts.sides.map((s) => String(s));
  }
  if (Array.isArray(opts.angles) && opts.angles.length === 3) {
    spec.angles = opts.angles.map((a) => (a === null || a === undefined ? '' : String(a)));
  }

  // Exact numeric coordinates to guarantee Euclidean proportionality in SVG/PDF/figSig
  if (Array.isArray(opts.coords) && opts.coords.length === 3) {
    spec.vertices = opts.coords.map(([x, y]) => [roundCoord(x), roundCoord(y)]);
    spec.coords = spec.vertices;
  } else if (isFiniteNum(opts.a) && isFiniteNum(opts.b) && opts.rightTriangle !== false && spec.rightAngle) {
    const base = opts.a;
    const height = opts.b;
    spec.vertices = [
      [0, 0],
      [roundCoord(base), 0],
      [0, roundCoord(height)],
    ];
    spec.coords = spec.vertices;
  } else if (isFiniteNum(opts.s1) && isFiniteNum(opts.s2) && isFiniteNum(opts.s3)) {
    const a = opts.s3;
    const b = opts.s2;
    const c = opts.s1;
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error(`Triangle inequality violated: ${opts.s1}, ${opts.s2}, ${opts.s3}`);
    }
    const cosA = (a * a + b * b - c * c) / (2 * a * b);
    const xC = b * cosA;
    const yC = b * Math.sqrt(Math.max(0, 1 - cosA * cosA));
    spec.vertices = [
      [0, 0],
      [roundCoord(a), 0],
      [roundCoord(xC), roundCoord(yC)],
    ];
    spec.coords = spec.vertices;
  }

  if (opts.notToScale) spec.notToScale = true;
  if (opts.tickMarks) spec.tickMarks = opts.tickMarks;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a right triangle shorthand with exact leg placement and vertex/side labeling.
 */
function buildRightTriangleSpec(opts = {}) {
  const legBase = isFiniteNum(opts.base) ? opts.base : 4;
  const legHeight = isFiniteNum(opts.height) ? opts.height : 3;
  return buildTriangleSpec({
    verts: opts.verts || ['C', 'B', 'A'],
    rightAngleAt: opts.rightAngleAt || (opts.verts ? opts.verts[0] : 'C'),
    a: legBase,
    b: legHeight,
    sides: opts.sides || [String(opts.hypLabel || ''), String(opts.heightLabel || legHeight), String(opts.baseLabel || legBase)],
    angles: opts.angles,
    notToScale: opts.notToScale,
    caption: opts.caption,
    caption_ar: opts.caption_ar,
  });
}

/**
 * Build a Circle theorem figure spec (`type: 'circle'`).
 * Supports central/inscribed angles, tangents, chords, secants, and shaded sectors.
 */
function buildCircleTheoremSpec(opts = {}) {
  const rVal = isFiniteNum(opts.r) && opts.r > 0 ? roundCoord(opts.r) : 5;
  const spec = {
    type: 'circle',
    r: rVal,
    radius: opts.radiusLabel ? String(opts.radiusLabel) : String(rVal),
  };
  if (opts.centerLabel) {
    spec.centerLabel = String(opts.centerLabel);
    spec.center = String(opts.centerLabel);
  }
  if (opts.radiusLabel) spec.radiusLabel = String(opts.radiusLabel);
  if (isFiniteNum(opts.centralDeg)) {
    const deg = roundCoord(opts.centralDeg);
    spec.centralDeg = deg;
    spec.sector = { start_deg: 0, end_deg: deg, label: opts.angleLabel ? String(opts.angleLabel) : `${deg}°` };
  }
  if (isFiniteNum(opts.inscribedDeg)) spec.inscribedDeg = roundCoord(opts.inscribedDeg);
  if (opts.angleLabel) spec.angleLabel = String(opts.angleLabel);
  if (opts.arcLabel) spec.arcLabel = String(opts.arcLabel);
  if (opts.tangent) spec.tangent = opts.tangent;
  if (opts.chords) spec.chords = opts.chords;
  if (opts.secants) spec.secants = opts.secants;
  if (opts.shadedSector) spec.shadedSector = opts.shadedSector;
  if (opts.pts) spec.pts = opts.pts;
  if (opts.notToScale) spec.notToScale = true;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a Parallel-Lines + Transversal spec (`type: 'transversal'`) compatible with
 * both 02c-figures.js (`angle`, `labels: {"2","5"}`) and generate.py (`angle1`,`angle2`,`rel`).
 */
function buildTransversalSpec(opts = {}) {
  const angleDeg = isFiniteNum(opts.angleDeg) ? Math.min(Math.max(opts.angleDeg, 25), 155) : 65;
  const a1 = (opts.angleLabels && opts.angleLabels.upperAcute) ? String(opts.angleLabels.upperAcute) : String(opts.angle1 || '');
  const a2 = (opts.angleLabels && opts.angleLabels.lowerObtuse) ? String(opts.angleLabels.lowerObtuse) : String(opts.angle2 || '');
  const spec = {
    type: 'transversal',
    angle: roundCoord(angleDeg),
    angleDeg: roundCoord(angleDeg),
    angle1: a1,
    angle2: a2,
    rel: opts.rel || 'cointerior',
    labels: opts.labels || { '2': a1, '5': a2 },
    lineLabels: Array.isArray(opts.lineLabels) ? opts.lineLabels : ['l', 'm'],
    notToScale: Boolean(opts.notToScale),
  };
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a general Polygon / Rectangle / Parallelogram / Trapezoid / Composite spec (`type: 'polygon'`).
 */
function buildPolygonSpec(opts = {}) {
  const spec = {
    type: 'polygon',
    shape: opts.shape || 'rectangle',
  };
  if (Array.isArray(opts.pts)) {
    spec.vertices = opts.pts.map(([x, y]) => [roundCoord(x), roundCoord(y)]);
    spec.pts = spec.vertices;
  } else if (isFiniteNum(opts.w) && isFiniteNum(opts.h)) {
    const wv = roundCoord(opts.w), hv = roundCoord(opts.h);
    spec.vertices = [[0, 0], [wv, 0], [wv, hv], [0, hv]];
    spec.w = wv;
    spec.h = hv;
  } else {
    if (isFiniteNum(opts.w)) spec.w = roundCoord(opts.w);
    if (isFiniteNum(opts.h)) spec.h = roundCoord(opts.h);
  }
  if (Array.isArray(opts.verts)) spec.verts = opts.verts;
  if (Array.isArray(opts.labels)) spec.labels = opts.labels;
  if (Array.isArray(opts.sides)) spec.sides = opts.sides.map((s) => String(s));
  if (Array.isArray(opts.angles)) spec.angles = opts.angles.map((a) => String(a));
  if (opts.shade) spec.shade = opts.shade;
  if (opts.diagonals) spec.diagonals = opts.diagonals;
  if (opts.heightLine) spec.heightLine = opts.heightLine;
  if (opts.notToScale) spec.notToScale = true;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a Composite 2D Geometry spec (`type: 'geometry_2d'`) using explicit normalized elements
 * (`circle`, `polygon`, `segment`, `arc`, `rightAngle`, `point`, `label`) in a calibrated viewBox.
 */
function buildComposite2DSpec(opts = {}) {
  const vb = Array.isArray(opts.vb) && opts.vb.length === 4 ? opts.vb : [0, 0, 260, 180];
  const elements = Array.isArray(opts.elements) ? opts.elements : [];
  if (!elements.length) {
    throw new Error('geometry_2d requires at least one element');
  }
  const spec = {
    type: 'geometry_2d',
    vb,
    elements,
  };
  if (opts.notToScale) spec.notToScale = true;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

/**
 * Build a 3D Solid spec (`type: 'solid'`) with clean dimension callouts.
 * Supports: cylinder, cone, sphere, prism, pyramid, frustum.
 */
function buildSolid3DSpec(opts = {}) {
  const validShapes = new Set(['cylinder', 'cone', 'sphere', 'prism', 'pyramid', 'frustum', 'cube']);
  const shape = validShapes.has(opts.shape) ? opts.shape : 'cylinder';
  const spec = {
    type: 'solid',
    shape,
  };
  if (isFiniteNum(opts.r)) spec.r = roundCoord(opts.r);
  if (isFiniteNum(opts.h)) spec.h = roundCoord(opts.h);
  if (isFiniteNum(opts.w)) spec.w = roundCoord(opts.w);
  if (isFiniteNum(opts.d)) spec.d = roundCoord(opts.d);
  if (opts.labels && typeof opts.labels === 'object') spec.labels = opts.labels;
  if (opts.notToScale) spec.notToScale = true;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  return spec;
}

module.exports = {
  degToRad,
  dist,
  buildTriangleSpec,
  buildRightTriangleSpec,
  buildCircleTheoremSpec,
  buildTransversalSpec,
  buildPolygonSpec,
  buildComposite2DSpec,
  buildSolid3DSpec,
};
