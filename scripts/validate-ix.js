#!/usr/bin/env node
/* Interactive Practice data validator (Plan 10, Phase 10.1).

   src/scripts/ix-data/*.js is plain JS shipped as-is to the browser; a bad
   answer index, an empty matching column, a KaTeX typo or an explorer curve
   that never draws only showed up when someone happened to open that lesson.
   This loads every track's data the same way the page does (a fake window
   with __ixData) and checks each entry against the shapes the engine in
   src/scripts/modules/19-interactive-activities-engine-v1.js expects.

   ERRORS (fail CI): unknown type; qc without 2+ options or answer out of
   range; duplicate qc options; tf item without boolean a; mt with <2 pairs or
   duplicate sides; sb/sr without steps or sb step without answer; fn with
   no curves, bad ranges, or a curve that is never drawable; any KaTeX parse
   error; English/Arabic arrays of different length.
   WARNINGS: the same activity title twice in one lesson.

   Usage: node scripts/validate-ix.js [--verbose] [track ...] */
'use strict';
const fs = require('fs');
const path = require('path');
const katex = require('katex');

const DIR = path.join(__dirname, '..', 'src', 'scripts', 'ix-data');
const args = process.argv.slice(2);
const verbose = args.includes('--verbose');
const only = args.filter((a) => !a.startsWith('--'));
const TYPES = new Set(['qc', 'mt', 'tf', 'sb', 'sr', 'fn', 'num', 'ord', 'cat', 'gp', 'se', 'ms']);

const cache = new Map();
function katexErrors(str) {
  const errs = [];
  if (typeof str !== 'string') return errs;
  const re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
  let m;
  while ((m = re.exec(str))) {
    const tex = (m[1] ?? m[2]).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    if (!cache.has(tex)) {
      let e = null;
      const w = console.warn; console.warn = () => {};
      try { katex.renderToString(tex, { throwOnError: true, strict: 'ignore', displayMode: m[1] === undefined }); }
      catch (x) { e = String(x.message).replace(/^KaTeX parse error: /, '').slice(0, 100); }
      finally { console.warn = w; }
      cache.set(tex, e);
    }
    if (cache.get(tex)) errs.push(`KaTeX: ${cache.get(tex)} in ${tex.slice(0, 50)}`);
  }
  return errs;
}

/* Same evaluation the engine's _fnEval does, so "never drawable" means the page draws nothing. */
function fnEval(expr, x, params) {
  try {
    let e = String(expr);
    Object.keys(params || {}).forEach((k) => { e = e.replace(new RegExp('\\b' + k + '\\b', 'g'), '(' + params[k] + ')'); });
    e = e.replace(/\^/g, '**').replace(/sin\(/g, 'Math.sin(').replace(/cos\(/g, 'Math.cos(').replace(/tan\(/g, 'Math.tan(')
      .replace(/sqrt\(/g, 'Math.sqrt(').replace(/abs\(/g, 'Math.abs(').replace(/ln\(/g, 'Math.log(')
      .replace(/exp\(/g, 'Math.exp(').replace(/\bpi\b/g, 'Math.PI');
    return (new Function('x', 'return (' + e + ')'))(x); // eslint-disable-line no-new-func
  } catch (err) { return NaN; }
}

const norm = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();

function checkEntry(c, push) {
  if (!c || !TYPES.has(c.t)) return push('error', `unknown type ${c && c.t}`);
  if (!norm(c.ti)) push('error', 'missing title');
  for (const k of ['o', 'p', 'items', 'steps', 'categories', 'targets', 'reasons', 'parts']) {
    if (Array.isArray(c[k]) && Array.isArray(c[k + '_ar']) && c[k].length !== c[k + '_ar'].length) push('error', `${k} and ${k}_ar lengths differ`);
  }
  if (c.t === 'qc') {
    if (!Array.isArray(c.o) || c.o.length < 2) push('error', 'qc needs 2+ options');
    else {
      if (!Number.isInteger(c.a) || c.a < 0 || c.a >= c.o.length) push('error', `qc answer ${c.a} out of range`);
      if (new Set(c.o.map(norm)).size !== c.o.length) push('error', 'qc has duplicate options');
    }
    if (!norm(c.q)) push('error', 'qc missing question');
  } else if (c.t === 'tf') {
    if (!Array.isArray(c.items) || !c.items.length) push('error', 'tf has no items');
    else c.items.forEach((it, i) => { if (typeof it.a !== 'boolean') push('error', `tf item ${i} answer is not true/false`); if (!norm(it.s)) push('error', `tf item ${i} has no statement`); });
  } else if (c.t === 'mt') {
    if (!Array.isArray(c.p) || c.p.length < 2) push('error', 'mt needs 2+ pairs');
    else {
      if (new Set(c.p.map((x) => norm(x.l))).size !== c.p.length) push('error', 'mt has duplicate left items');
      if (new Set(c.p.map((x) => norm(x.r))).size !== c.p.length) push('error', 'mt has duplicate right items (two correct matches)');
    }
  } else if (c.t === 'sb') {
    if (!Array.isArray(c.steps) || !c.steps.length) push('error', 'sb has no steps');
    else c.steps.forEach((s, i) => { if (!norm(s.a)) push('error', `sb step ${i} has no answer`); if (!norm(s.l)) push('error', `sb step ${i} has no prompt`); });
  } else if (c.t === 'sr') {
    if (!Array.isArray(c.steps) || c.steps.length < 2) push('error', 'sr needs 2+ steps');
  } else if (c.t === 'fn') {
    const xr = c.xrange, yr = c.yrange;
    if (!Array.isArray(xr) || !Array.isArray(yr) || !(xr[1] > xr[0]) || !(yr[1] > yr[0])) push('error', 'fn has invalid xrange/yrange');
    else if (!Array.isArray(c.fns) || !c.fns.length) push('error', 'fn has no curves');
    else {
      const params = {};
      (c.params || []).forEach((p) => {
        params[p.name] = p.default;
        if (!(p.max > p.min) || p.default < p.min || p.default > p.max) push('error', `fn slider ${p.name} default/min/max inconsistent`);
      });
      c.fns.forEach((f, i) => {
        let visible = 0;
        for (let k = 0; k <= 200; k++) {
          const x = xr[0] + (k / 200) * (xr[1] - xr[0]);
          const y = fnEval(f.expr, x, params);
          if (isFinite(y) && y >= yr[0] && y <= yr[1]) visible++;
        }
        if (visible < 5) push('error', `fn curve ${i} (${String(f.expr).slice(0, 40)}) is never drawn in the window at default sliders`);
      });
    }
  } else if (c.t === 'num') {
    if (c.a == null || !norm(c.a)) push('error', 'num has no answer');
    if (c.tol != null && (typeof c.tol !== 'number' || c.tol < 0)) push('error', 'num tolerance must be non-negative number');
  } else if (c.t === 'ord') {
    const it = c.items || c.steps;
    if (!Array.isArray(it) || it.length < 2) push('error', 'ord needs 2+ items to order');
    else it.forEach((s, i) => { if (!norm(s)) push('error', `ord item ${i} is empty`); });
  } else if (c.t === 'cat') {
    if (!Array.isArray(c.categories) || c.categories.length < 2) push('error', 'cat needs 2+ categories');
    if (!Array.isArray(c.items) || c.items.length < 2) push('error', 'cat needs 2+ items to categorize');
    else {
      c.items.forEach((it, i) => {
        const stmt = it.s || it.text || it;
        if (!norm(stmt)) push('error', `cat item ${i} has no statement`);
        const validCat = typeof it.cat === 'number'
          ? (Number.isInteger(it.cat) && it.cat >= 0 && it.cat < c.categories.length)
          : (typeof it.cat === 'string' && c.categories.includes(it.cat));
        if (!validCat) push('error', `cat item ${i} category "${it.cat}" is invalid for given categories`);
      });
    }
  } else if (c.t === 'gp') {
    if (!Array.isArray(c.targets) || !c.targets.length) push('error', 'gp has no targets');
    else c.targets.forEach((tgt, i) => {
      const pt = tgt.target;
      if (!Array.isArray(pt) || pt.length !== 2 || typeof pt[0] !== 'number' || typeof pt[1] !== 'number') {
        push('error', `gp target ${i} coordinate is invalid`);
      }
    });
    if (c.xrange && (!Array.isArray(c.xrange) || !(c.xrange[1] > c.xrange[0]))) push('error', 'gp invalid xrange');
    if (c.yrange && (!Array.isArray(c.yrange) || !(c.yrange[1] > c.yrange[0]))) push('error', 'gp invalid yrange');
  } else if (c.t === 'se') {
    if (!Array.isArray(c.steps) || c.steps.length < 2) push('error', 'se needs 2+ steps');
    else if (typeof c.errorStep !== 'number' || c.errorStep < 0 || c.errorStep > c.steps.length) {
      push('error', `se errorStep ${c.errorStep} out of range (0..${c.steps.length})`);
    }
    if (c.reasons) {
      if (!Array.isArray(c.reasons) || !c.reasons.length) push('error', 'se reasons must be non-empty array');
      if (typeof c.correctReason !== 'number' || c.correctReason < 0 || c.correctReason >= c.reasons.length) {
        push('error', `se correctReason ${c.correctReason} out of range`);
      }
    }
  } else if (c.t === 'ms') {
    if (!Array.isArray(c.parts) || !c.parts.length) push('error', 'ms needs 1+ parts');
    else c.parts.forEach((pt, i) => {
      if (!Array.isArray(pt.rubric) || !pt.rubric.length) push('error', `ms part ${i} has no rubric`);
      else pt.rubric.forEach((rb, j) => {
        if (!norm(rb.text)) push('error', `ms part ${i} rubric ${j} has no text`);
      });
    });
  }
  /* KaTeX over every string in the entry, including _ar fields and nested items */
  (function walk(v) {
    if (typeof v === 'string') katexErrors(v).forEach((e) => push('error', e));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.keys(v).forEach((k) => { if (k !== 'expr') walk(v[k]); });
  })(c);
}

function loadTrack(file) {
  const src = fs.readFileSync(path.join(DIR, file), 'utf8');
  const window = {};
  new Function('window', src)(window); // eslint-disable-line no-new-func
  const D = {};
  (window.__ixData || []).forEach((f) => f(D));
  return D;
}

function main() {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.js')).sort()
    .filter((f) => !only.length || only.includes(f.replace(/\.js$/, '')));
  let errors = 0, warns = 0, entries = 0, lessons = 0;
  for (const f of files) {
    let D;
    try { D = loadTrack(f); } catch (e) { console.log(`  ✗ ${f}: does not load: ${e.message}`); errors++; continue; }
    for (const [id, cfg] of Object.entries(D)) {
      lessons++;
      const list = Array.isArray(cfg) ? cfg : [cfg];
      const titles = new Set();
      list.forEach((c, i) => {
        entries++;
        const push = (lvl, msg) => {
          if (lvl === 'error') { errors++; console.log(`  ✗ ${f} ${id}[${i}] ${c && c.t}: ${msg}`); }
          else { warns++; if (verbose) console.log(`  ⚠ ${f} ${id}[${i}]: ${msg}`); }
        };
        checkEntry(c, push);
        if (c && titles.has(norm(c.ti))) push('warn', `title repeated in lesson: ${c.ti}`);
        if (c) titles.add(norm(c.ti));
      });
    }
  }
  console.log(`\nChecked ${entries} activities in ${lessons} lessons across ${files.length} track file(s): ${errors} error(s), ${warns} warning(s).`);
  if (errors) { console.log('❌ Interactive data validation failed.'); process.exit(1); }
  console.log('✅ Interactive data validation passed.');
}
main();
