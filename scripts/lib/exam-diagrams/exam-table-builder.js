/**
 * Exam-authentic Table Builders (Vertical, Horizontal Covariation/Selected-Values,
 * Two-Way Contingency with Exact Marginal Validation, Riemann Data, Euler Step Tables).
 */
'use strict';

const { isFiniteNum, roundCoord } = require('./cartesian-graph-builder');

function buildExamTableSpec(opts = {}) {
  const headers = Array.isArray(opts.headers) ? opts.headers.map(String) : [];
  const rows = Array.isArray(opts.rows) ? opts.rows.map((r) => r.map(String)) : [];
  if (!headers.length && !rows.length) {
    throw new Error('Exam table requires non-empty headers or rows');
  }
  const spec = {
    type: 'table',
    headers,
    rows,
  };
  if (opts.orientation === 'horizontal') spec.orientation = 'horizontal';
  if (opts.dir === 'rtl' || opts.dir === 'ltr') spec.dir = opts.dir;
  if (opts.caption) spec.caption = String(opts.caption);
  if (opts.caption_ar) spec.caption_ar = String(opts.caption_ar);
  if (Array.isArray(opts.headers_ar)) spec.headers_ar = opts.headers_ar.map(String);
  if (Array.isArray(opts.rows_ar)) spec.rows_ar = opts.rows_ar.map((r) => r.map(String));
  return spec;
}

/**
 * Build a horizontal Selected-Values / Covariation table where each row starts with
 * a math header cell (e.g. `\(x\)`, `\(f(x)\)`, `\(f'(x)\)`) and values march horizontally.
 */
function buildHorizontalValuesTable(opts = {}) {
  const xLabel = opts.xLabel || '\\(x\\)';
  const xVals = Array.isArray(opts.x) ? opts.x.map(String) : [];
  const seriesRows = Array.isArray(opts.series) ? opts.series : [];
  if (!xVals.length || !seriesRows.length) {
    throw new Error('Horizontal values table requires x[] and series[]');
  }
  for (const s of seriesRows) {
    if (!Array.isArray(s.values) || s.values.length !== xVals.length) {
      throw new Error(`Row "${s.label}" length mismatch against x length ${xVals.length}`);
    }
  }
  return buildExamTableSpec({
    orientation: 'horizontal',
    headers: [xLabel, ...xVals],
    rows: seriesRows.map((s) => [String(s.label), ...s.values.map(String)]),
    caption: opts.caption,
    caption_ar: opts.caption_ar,
    dir: opts.dir,
  });
}

/**
 * Build an authentic Two-Way Contingency Table with exact marginal total calculation
 * and verification (optionally hiding one unknown cell `'?'` for algebra/probability Qs).
 */
function buildTwoWayTableSpec(opts = {}) {
  const rowLabels = Array.isArray(opts.rowLabels) ? opts.rowLabels.map(String) : [];
  const colLabels = Array.isArray(opts.colLabels) ? opts.colLabels.map(String) : [];
  const counts = Array.isArray(opts.counts) ? opts.counts : [];
  if (!rowLabels.length || !colLabels.length || counts.length !== rowLabels.length) {
    throw new Error('two_way_table requires matching rowLabels, colLabels, and counts[][]');
  }
  const colTotals = colLabels.map(() => 0);
  const rowTotals = rowLabels.map(() => 0);
  let grandTotal = 0;

  counts.forEach((row, r) => {
    if (!Array.isArray(row) || row.length !== colLabels.length) {
      throw new Error(`Row ${r} column count mismatch`);
    }
    row.forEach((val, c) => {
      const n = Number(val);
      if (!isFiniteNum(n) || n < 0) throw new Error(`Invalid cell count at [${r}][${c}]: ${val}`);
      rowTotals[r] += n;
      colTotals[c] += n;
      grandTotal += n;
    });
  });

  const displayCounts = counts.map((row, r) =>
    row.map((val, c) =>
      opts.maskCell && opts.maskCell[0] === r && opts.maskCell[1] === c ? (opts.maskSymbol || '?') : String(val)
    )
  );

  const includeTotals = opts.includeTotals !== false;
  const totalTxt = opts.totalLabel || 'Total';
  const rowsList = includeTotals ? [...rowLabels, totalTxt] : rowLabels.slice();
  const colsList = includeTotals ? [...colLabels, totalTxt] : colLabels.slice();
  const dataMatrix = rowLabels.map((_, r) => [
    ...displayCounts[r],
    ...(includeTotals ? [rowTotals[r]] : []),
  ]);
  if (includeTotals) {
    dataMatrix.push([...colTotals, grandTotal]);
  }

  return {
    type: 'two_way_table',
    corner: opts.cornerLabel || '',
    rows: rowsList,
    cols: colsList,
    data: dataMatrix,
    caption: opts.caption ? String(opts.caption) : undefined,
    caption_ar: opts.caption_ar ? String(opts.caption_ar) : undefined,
    dir: opts.dir,
    _totals: { rowTotals, colTotals, grandTotal },
  };
}

/**
 * Strip internal verification metadata before embedding in JSON banks.
 */
function stripInternalMeta(spec) {
  const out = {};
  for (const [k, v] of Object.entries(spec || {})) {
    if (!k.startsWith('_')) out[k] = v;
  }
  return out;
}

/**
 * Build an Euler's Method step-tracking reference/stem table (`type: 'table'`).
 */
function buildEulerTableSpec(opts = {}) {
  const headers = opts.headers || ['Step \\(n\\)', '\\(x_n\\)', '\\(y_n\\)', '\\(\\frac{dy}{dx}\\)', '\\(\\Delta y = h \\cdot \\frac{dy}{dx}\\)'];
  const rows = Array.isArray(opts.steps) ? opts.steps.map((r) => r.map((v) => String(v))) : (opts.rows || []);
  return buildExamTableSpec({
    headers,
    rows,
    caption: opts.caption || "Euler's Method Step Table",
    caption_ar: opts.caption_ar,
  });
}

module.exports = {
  buildExamTableSpec,
  buildHorizontalValuesTable,
  buildTwoWayTableSpec,
  buildEulerTableSpec,
  stripInternalMeta,
};
