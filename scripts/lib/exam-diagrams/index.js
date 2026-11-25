/**
 * Unified Entry Point & Spec Validator for ClipSAT Exam-Authentic Diagram & Table Builders.
 */
'use strict';

const cartesian = require('./cartesian-graph-builder');
const geometry = require('./geometry-figure-builder');
const stats = require('./stats-calculus-visual-builder');
const tables = require('./exam-table-builder');

const KNOWN_TYPES = new Set([
  'fn', 'axes', 'graph', 'function_graph', 'functionGraph', 'fn_graph', 'plot',
  'slope_field', 'slopeField', 'slopefield',
  'polar_graph', 'polarGraph', 'polar',
  'conic_section', 'conic', 'sinusoid', 'shaded_region', 'qudrat_shaded',
  'unit_circle', 'unitCircle', 'unitcircle',
  'triangle', 'circle', 'circle_sector', 'circle_chord', 'circle_chords_similarity', 'circle_tangent_segment', 'circle_inscribed_rect', 'square_circumscribed_circle', 'polygon', 'rect',
  'transversal', 'lines', 'vertex_angles', 'geometry_2d', 'geometry2d', 'geom2d',
  'solid', '3d_solid', 'geometry_3d', 'geometry3d', 'geom3d',
  'nested_triangles', 'thales', 'triangle_transversal', 'bowtie', 'hourglass',
  'right_triangle_altitude', 'altitude_hypotenuse', 'geometric_mean',
  'shadow_similarity', 'indirect_measurement', 'angle_bisector',
  'overlapping_triangles', 'inverted_similar', 'trapezoid_diagonals', 'similar',
  'bar', 'bars', 'bar_chart', 'barChart', 'barchart',
  'grouped_bar', 'groupedBar', 'multi_line', 'multiLine',
  'histogram', 'boxplot', 'box_plot', 'boxPlot', 'box', 'dot_plot', 'dotPlot', 'dotplot', 'dots',
  'scatter', 'scatter_plot', 'scatterPlot', 'scatterplot',
  'normal_curve', 'normalCurve', 'normal_dist', 'normalDist', 'normal',
  'pie', 'pie_chart', 'pieChart', 'numberline', 'number_line', 'numberLine', 'venn', 'venn_populated',
  'cumulative_frequency', 'cumulativeFrequency', 'cumulative_freq', 'cumulativeFreq', 'ogive',
  'tree_diagram', 'treeDiagram', 'tree', 'bearings', 'bearing', 'bearingDiagram', 'bearing_diagram',
  'sign_chart', 'signChart', 'transformation_grid', 'transformationGrid', 'transformation',
  'voronoi', 'argand', 'argand_diagram', 'complex_plane', 'network_graph', 'weighted_graph', 'graph_network',
  'table', 'two_way_table', 'twoWayTable', 'twowaytable',
]);

/**
 * Validate structural integrity of a compact figure spec before embedding into banks/content.
 * Returns array of error strings (empty array = valid).
 */
function validateFigureSpec(spec) {
  const errs = [];
  if (!spec || typeof spec !== 'object') {
    return ['Figure spec must be a non-null object'];
  }
  if (!spec.type || !KNOWN_TYPES.has(spec.type)) {
    errs.push(`Unknown or missing figure.type: "${spec.type}"`);
    return errs;
  }

  if (spec.type === 'fn' || spec.type === 'function_graph' || spec.type === 'axes' || spec.type === 'graph') {
    if (Array.isArray(spec.xl) && (spec.xl.length !== 2 || spec.xl[0] >= spec.xl[1])) {
      errs.push(`Invalid xl in fn spec: ${JSON.stringify(spec.xl)}`);
    }
    if (Array.isArray(spec.yl) && (spec.yl.length !== 2 || spec.yl[0] >= spec.yl[1])) {
      errs.push(`Invalid yl in fn spec: ${JSON.stringify(spec.yl)}`);
    }
    if (Array.isArray(spec.pts)) {
      for (const p of spec.pts) {
        if (!cartesian.isFiniteNum(Number(p.x)) || !cartesian.isFiniteNum(Number(p.y))) {
          errs.push(`Non-finite point in fn spec: ${JSON.stringify(p)}`);
        }
      }
    }
  }

  if (spec.type === 'polar_graph') {
    if (!Array.isArray(spec.curves) || !spec.curves.length) {
      errs.push('polar_graph requires non-empty curves[]');
    }
  }

  if (spec.type === 'table' || spec.type === 'two_way_table' || spec.type === 'twoWayTable' || spec.type === 'twowaytable') {
    if (Array.isArray(spec.data) && Array.isArray(spec.rows) && Array.isArray(spec.cols)) {
      if (!spec.rows.length || !spec.cols.length || spec.data.length !== spec.rows.length) {
        errs.push('two_way_table rows/cols/data mismatch');
      }
      return errs;
    }
    const hLen = Array.isArray(spec.headers) ? spec.headers.length : 0;
    const rows = Array.isArray(spec.rows) ? spec.rows : [];
    const dataLen = Array.isArray(spec.data) ? spec.data.length : 0;
    const altColLen = (spec.col_headers || spec.colLabels || spec.col_labels || spec.columnLabels || spec.labels || []).length || 0;
    const altRowLen = (spec.row_headers || spec.rowLabels || spec.row_labels || spec.categories || []).length || 0;
    if (!hLen && !altColLen && !rows.length && !altRowLen && !dataLen) {
      errs.push('Table has empty headers and empty rows');
    }
    if (hLen && rows.some((r) => Array.isArray(r) && r.length !== hLen)) {
      errs.push('Table row column count does not match headers length');
    }
  }

  if (spec.type === 'boxplot') {
    const boxes = Array.isArray(spec.boxes) ? spec.boxes : [spec];
    for (const bx of boxes) {
      if (!(Number(bx.min) <= Number(bx.q1) && Number(bx.q1) <= Number(bx.med) && Number(bx.med) <= Number(bx.q3) && Number(bx.q3) <= Number(bx.max))) {
        errs.push(`Boxplot summary out of order: ${JSON.stringify(bx)}`);
      }
    }
  }

  return errs;
}

module.exports = {
  ...cartesian,
  ...geometry,
  ...stats,
  ...tables,
  KNOWN_TYPES,
  validateFigureSpec,
};
