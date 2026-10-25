'use strict';
/**
 * Shared helpers for Bluebook / Khan Academy-style Digital SAT item templates.
 * Every template returns ONE item: { text, ans, dists, sol, type?, fig? }.
 * - `ans` is the exact correct answer string (plain numeric for SPR-eligible items).
 * - `dists` are three plausible distractors produced by realistic student errors.
 * - `fig` is attached ONLY when the stem refers to it and it is needed to solve.
 */

function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ri(r, lo, hi) { return lo + Math.floor(r() * (hi - lo + 1)); }
function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }
function frac(n, d) {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  n /= g; d /= g;
  return d === 1 ? String(n) : `${n}/${d}`;
}
function texFrac(s) {
  const m = String(s).match(/^(-?)(\d+)\/(\d+)$/);
  return m ? `${m[1]}\\frac{${m[2]}}{${m[3]}}` : String(s);
}
function M(s) { return `\\( ${s} \\)`; }
/** Format a linear term coefficient: 1x -> x, -1x -> -x */
function co(c, v) { return c === 1 ? v : (c === -1 ? `-${v}` : `${c}${v}`); }
/** Signed constant: +5 / -5 (omit 0) */
function sg(c) { return c === 0 ? '' : (c > 0 ? ` + ${c}` : ` - ${-c}`); }
/** Signed term with variable: + 3x / - x */
function sgv(c, v) { return c === 0 ? '' : (c > 0 ? ` + ${co(c, v)}` : ` - ${co(-c, v)}`); }
function money(n) { return `\\$${Number.isInteger(n) ? n : n.toFixed(2)}`; }
function round2(x) { return Math.round(x * 100) / 100; }
function numStr(x) {
  const v = round2(x);
  return Number.isInteger(v) ? String(v) : String(v);
}
/** Distinct numeric distractors from candidate offsets/errors. */
function nd(ans, cands) {
  const out = [];
  const seen = new Set([String(ans)]);
  for (const c of cands) {
    const s = String(c);
    if (!seen.has(s) && s !== 'NaN' && s !== 'Infinity') { seen.add(s); out.push(s); }
    if (out.length === 3) break;
  }
  const fm = String(ans).match(/^(-?\d+)\/(\d+)$/);
  let k = 1;
  while (out.length < 3 && k < 60) {
    const s = fm
      ? frac(Number(fm[1]) + k, Number(fm[2]))
      : String(Number(ans) + k * (k % 2 ? 1 : -1) * 2);
    if (!seen.has(s) && s !== 'NaN') { seen.add(s); out.push(s); }
    k++;
  }
  return out;
}

module.exports = { rng, ri, pick, gcd, frac, texFrac, M, co, sg, sgv, money, round2, numStr, nd };
