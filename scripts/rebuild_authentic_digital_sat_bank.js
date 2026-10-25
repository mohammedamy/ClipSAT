#!/usr/bin/env node
/**
 * scripts/rebuild_authentic_digital_sat_bank.js
 *
 * Rebuilds bank-data/sat.json using ONLY content in the style of the official
 * College Board Digital SAT (Bluebook practice tests, Khan Academy Official
 * Digital SAT Prep, College Board Educator Question Bank).
 *
 * 1. Starts from the last hand-authored bank (commit badb5441), using the
 *    4f0230a8 version of an item only when it has the same answer and no
 *    procedural mutation.
 * 2. Removes every item that is outside the Digital SAT or that a real paper
 *    would never contain:
 *      - sets / set operations / Venn diagrams, numerical LCM / GCD / division
 *        algorithm, linear programming;
 *      - logs, normal distribution, IQR / box plots, advanced trig, permutations,
 *        combinations, Bayes, symbolic P(A|B) event algebra;
 *      - asymptotes, piecewise continuity, formal inverse functions, even/odd jargon;
 *      - meta test-taking trivia (Desmos button tips, grid-in rules, pacing,
 *        "testing answer choices", stems containing "Choices: A) ...").
 * 3. SPR (student-produced response) items never contain choices or
 *    "which of the following" wording, and their answers fit the official
 *    answer box (<= 5 characters, 6 if negative).
 * 4. A figure is kept ONLY when the stem refers to it and it is needed.
 * 5. Gaps are filled with parametric templates modeled on official item types
 *    (scripts/sat_generators/bluebook_*.js).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { rng, frac } = require('./sat_generators/bluebook_core');
const ALG = require('./sat_generators/bluebook_algebra');
const ADV = require('./sat_generators/bluebook_advanced');
const PG = require('./sat_generators/bluebook_psda_geo');

const ROOT = path.join(__dirname, '..');
const BANK_PATH = path.join(ROOT, 'bank-data', 'sat.json');

function gitShow(rev) {
  return JSON.parse(execSync(`git show ${rev}:bank-data/sat.json`, {
    cwd: ROOT, env: { ...process.env, HOME: '/tmp' }, maxBuffer: 64 * 1024 * 1024
  }).toString('utf8')).pool;
}

/* ── 1. Banned-content filter (stem + choices) ── */
const BANNED = new RegExp([
  String.raw`\\log`, String.raw`\\ln\b`, 'logarithm', 'normal dist', 'normal random', 'z-score', 'standardized score', String.raw`68-95-99\.7`, 'bell-shaped',
  'interquartile', String.raw`\bIQR\b`, String.raw`box\s*plot`, 'boxplot', 'quartile', 'cumulative frequency',
  'law of sines', 'law of cosines', 'sinusoid', 'amplitude', 'phase shift', String.raw`\\sec\b`, String.raw`\\csc\b`, String.raw`\\cot\b`, 'arcsin', 'arccos', 'arctan', 'polar coordinates', 'unit circle', 'reference angle',
  'permutation', 'combination', 'factorial', String.raw`\\binom`, 'bayes', 'binomial', 'poisson', 'variance', 'complex number', 'imaginary',
  'finite sets', 'cardinality', String.raw`\\cap\b`, String.raw`\\cup\b`, String.raw`\bsubset\b`, 'Venn', String.raw`\bset A\b`, String.raw`\bset B\b`,
  String.raw`P\(A`, String.raw`P\(B`, String.raw`P\(E`, 'mutually exclusive', 'independent events', String.raw`Events \\\( A`, String.raw`events \\\( A`, String.raw`P\(\\text\{not`,
  'least common multiple', String.raw`\blcm\b`, String.raw`\bgcd\b`, 'greatest common', 'division algorithm', 'prime factorization', 'quotient and remainder', 'remainder when',
  String.raw`maximize.*profit`, String.raw`minimize.*cost`, 'feasible region', 'objective function', 'full capacity', 'production resources', 'maximum possible value of',
  'asymptote', 'hole at', 'removable discontinuity', 'piecewise', 'continuous at', String.raw`\blimit\b`, String.raw`\\lim\b`, String.raw`\\begin\{cases\}[^]*x\s*<`,
  String.raw`f\^\{-1\}`, String.raw`\^\{-1\}\(`, 'inverse function', 'invertible', 'even function', 'odd function', 'one-to-one', 'bijective', 'injective', String.raw`f\(-x\)`,
  'scaled constant', String.raw`K\(y\)`, 'inversely proportional', 'varies inversely', 'records cell counts', 'holds for real', 'restricts the positive integer', String.raw`positive integers [A-Z] =`, String.raw`Two positive quantities`,
  'Desmos', 'slider', 'grid-in', 'grid in', 'student-produced', 'time-management', 'pacing', String.raw`\bPOE\b`, 'process of elimination', 'Choices:', 'a problem asks', 'A problem gives', 'scored as correct', String.raw`spends \d+ seconds`, 'Per the chapter',
  'Testing choice', 'answer choice', 'eliminat', 'calculator', 'answer box', 'question asks for', 'fastest', 'plugging', 'backsolv', 'strategy', 'minutes left', 'per question',
  'hexagon', 'octagon', 'distance between the parallel lines', 'Remainder Theorem', 'synthetic division', String.raw`\bmatrix`, 'determinant', String.raw`\bvector`, 'sequence', 'directrix', 'ellipse', 'hyperbola',
  'inscribed within a sphere', String.raw`\b(?:like|likes|study|studies|take|takes|play|plays|own|owns|speak|speaks) both\b`, 'in both', 'both selected', String.raw`selected at random from \d+ men`, 'concentric', 'chords, AB and CD', 'PA = 6, PB = 8'
].join('|'), 'i');

const SOL_BANNED = /\\binom|ways to choose|choose \d+ from|\\sin\s*\(?2x|\\cos\s*\(?2x|double[- ]angle|\\sin\^2|\\cos\^2|\bnCr\b|C\(\d+,\s*\d+\)|flipped \d+ times|exactly \d+ heads|with replacement|without replacement|\\mathcal\{N\}|\\log|\\ln\b|\\cap\b|\\cup\b|linear programming|on region|reference angle|quadrant|study both|take both/i;

const FIG_REF = /\b(shown|figure|table|graph of the (?:linear |quadratic |exponential )?function [a-z] is shown|scatterplot|bar graph|bar chart|histogram|dot plot|diagram)\b/i;

function stemAndChoices(q) { return `${q.text || ''} ${(q.choices || []).join(' ')}`; }

function isCleanSprAnswer(a) {
  const s = String(a == null ? '' : a).trim();
  if (!/^-?\d+(\.\d+)?$/.test(s) && !/^-?\d+\/\d+$/.test(s)) return false;
  return s.length <= (s.startsWith('-') ? 6 : 5);
}
const SPR_BAD_STEM = /which of the following|which statement|which equation|which expression|which function|which inequality|which value|which pair|which (?:graph|table|point)|choices|choice is|entry below|would not be/i;

/* ── 2. Bluebook voice + table/figure clean-up ── */
function cleanVoice(t) {
  let s = String(t || '').trim();
  s = s.replace(/(?<![0-9.\\a-zA-Z])1([xyabkmnt])\b/g, '$1');
  s = s.replace(/^Solve for \\\(\s*([a-zA-Z])\s*\\\):\s*(\\\([\s\S]+?\\\))\s*\.?$/i, 'If $2, what is the value of \\( $1 \\)?');
  s = s.replace(/^Simplify:\s*(\\\([\s\S]+?\\\))\s*\.?$/i, 'Which expression is equivalent to $1?');
  s = s.replace(/\{fig_placeholder\}/g, '').replace(/\s+\n/g, '\n').trim();
  s = s.replace(/ is shown below\./g, ' is shown.').replace(/ shown below/g, ' shown').replace(/ in the table below/g, ' in the table').replace(/The table below/g, 'The table').replace(/the figure below/gi, 'the figure').replace(/ shown above/g, ' shown').replace(/The bar chart above/g, 'The bar graph').replace(/ (below|above)(?= (?:shows|displays|gives|summarizes|lists|represents|records))/g, '');
  return s;
}

function htmlTableToFigure(q) {
  const m = (q.text || '').match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (!m) return;
  const strip = (x) => x.replace(/<[^>]+>/g, '').trim();
  const headers = [...m[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(x => strip(x[1]));
  const body = (m[1].match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i) || [null, m[1]])[1];
  const rows = [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
    .filter(x => !/<th/i.test(x[1]))
    .map(x => [...x[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(c => strip(c[1])))
    .filter(rw => rw.length);
  q.text = q.text.replace(/<table[^>]*>[\s\S]*?<\/table>/i, ' ').replace(/:\s+(?=[A-Z])/, '. The results are shown in the table. ').replace(/\s+/g, ' ').trim();
  if (!/table/i.test(q.text)) q.text = q.text.replace(/\.\s/, '. The data are shown in the table. ');
  q.figure = { type: 'table', headers, rows };
  delete q.fig;
}

const ALLOWED_FIG = new Set(['fn', 'graph', 'table', 'two_way_table', 'scatter', 'bar', 'triangle', 'circle', 'circle_sector', 'transversal', 'geometry_3d', 'rect', 'polygon']);

function normalizeFigure(q) {
  if (q.fig && !q.figure) { q.figure = q.fig; }
  delete q.fig;
  const f = q.figure;
  if (!f) return;
  const t = f.type || '';
  const needed = FIG_REF.test(q.text || '') || /^In the (figure|triangle) shown/i.test(q.text || '');
  if (!ALLOWED_FIG.has(t) || !needed) { delete q.figure; return; }
  if (t === 'table' && /Option 1|Group A/.test(JSON.stringify(f))) delete q.figure; // generic placeholder tables never match the stem
}

/* ── 3. Load + filter base items ── */
const poolB = gitShow('badb5441');
const pool4 = gitShow('4f0230a8');
const BROKEN_IDX = new Set([851]); // triangle whose labeled measures contradict its answer
const items = [];
const seenText = new Set();
const answerOf = (q) => String(q.sprAnswer != null ? q.sprAnswer : (Array.isArray(q.choices) && typeof q.answer === 'number' ? q.choices[q.answer] : '')).replace(/\s+/g, '');

for (let i = 60; i < poolB.length; i++) {
  if (BROKEN_IDX.has(i)) continue;
  const qb = poolB[i];
  if (qb.domain === ADV.DESMOS) continue; // whole meta-strategy domain is regenerated below
  const q4 = pool4[i];
  const use4 = q4 && !BANNED.test(stemAndChoices(q4)) && answerOf(q4) === answerOf(qb) && q4.domain === qb.domain;
  const q = JSON.parse(JSON.stringify(use4 ? q4 : qb));
  q.text = (q.text || q.q || '').trim();
  if (!q.text || BANNED.test(stemAndChoices(q))) continue;
  /* Solutions reveal hidden off-scope methods (counting combinations, double-angle identities…). */
  if (SOL_BANNED.test(`${q.text} ${q.sol || q.solution || q.exp || ''}`)) continue;
  if (/\\log|\\ln\b|box_plot|normal_curve|venn|tree_diagram|unit_circle|numberline/i.test(JSON.stringify(q.figure || q.fig || ''))) { delete q.figure; delete q.fig; }
  htmlTableToFigure(q);
  q.text = cleanVoice(q.text);
  normalizeFigure(q);
  if (/\b(shown|figure|diagram)\b/i.test(q.text) && !q.figure) continue; // stem needs a figure it doesn't have

  q.difficulty = ['easy', 'medium', 'hard'].includes(String(q.difficulty).toLowerCase()) ? String(q.difficulty).toLowerCase() : 'medium';
  const isSpr = q.type === 'spr' || q.type === 'frq' || q.sprAnswer != null;
  if (isSpr) {
    const a = String(q.sprAnswer != null ? q.sprAnswer : (q.choices || [])[q.answer] || '').trim();
    if (!isCleanSprAnswer(a) || SPR_BAD_STEM.test(q.text)) continue;
    q.type = 'spr';
    q.sprAnswer = a;
  } else {
    q.type = 'mcq';
    delete q.sprAnswer;
  }
  if (!Array.isArray(q.choices) || q.choices.length !== 4 || typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
    if (q.type !== 'spr') continue;
  }
  if (Array.isArray(q.choices) && new Set(q.choices.map(c => String(c).replace(/\s+/g, ''))).size !== q.choices.length) continue;
  q.sol = String(q.sol || q.solution || q.exp || '').trim();
  if (q.sol.length < 32) continue;
  const key = q.text.replace(/\s+/g, ' ');
  if (seenText.has(key)) continue;
  seenText.add(key);
  delete q.q; delete q.solution; delete q.exp;
  items.push(q);
}

/* Cap near-identical word-problem clones (same skeleton with new numbers). */
const SKEL_CAP = 3;
function skeleton(t) { return String(t).replace(/-?\d+(\.\d+)?/g, 'N').replace(/\s+/g, ' ').slice(0, 70); }
const skelCount = {};
const base = items.filter(q => {
  const k = skeleton(q.text);
  skelCount[k] = (skelCount[k] || 0) + 1;
  return skelCount[k] <= SKEL_CAP;
});
console.log(`Base items kept after Digital SAT compliance filter: ${base.length}`);

/* ── 4. Fill gaps with official-style templates ── */
const TARGET = 55;
const DESMOS_TARGET = 40;
const GENS = {
  [ALG.LIN_EQ]: ALG.linEq, [ALG.LIN_FN]: ALG.linFn,
  [ADV.QUAD]: ADV.quad, [ADV.EXPO]: ADV.expo, [ADV.NONLIN]: ADV.nonlin, [ADV.DESMOS]: ADV.desmos,
  [PG.RATIO]: PG.ratio, [PG.STATS]: PG.stats, [PG.PROB]: PG.prob, [PG.GEO]: PG.geo
};
const DOMAINS = Object.keys(GENS);

function choiceText(s) {
  const v = String(s);
  if (/^-?\d+\/\d+$/.test(v)) { const [n, d] = v.split('/'); return `\\( ${n.startsWith('-') ? '-' : ''}\\frac{${n.replace('-', '')}}{${d}} \\)`; }
  return v;
}

const R = rng(20261025);
let genId = 0;
const generated = [];
for (const dom of DOMAINS) {
  for (const diff of ['easy', 'medium', 'hard']) {
    const target = dom === ADV.DESMOS ? DESMOS_TARGET : TARGET;
    let have = base.filter(q => q.domain === dom && q.difficulty === diff).length;
    const fallbackOrder = diff === 'easy' ? ['easy', 'medium'] : (diff === 'medium' ? ['medium', 'easy', 'hard'] : ['hard', 'medium']);
    const tplSets = fallbackOrder.map(d => (GENS[dom][d] || [])).filter(a => a.length);
    if (!tplSets.length) continue;
    const tpls = tplSets[0];
    const minFig = (dom === PG.GEO || dom === ADV.DESMOS) ? 8 : 0;
    let figGen = 0;
    let guard = 0;
    let ti = 0;
    while ((have < target || figGen < minFig) && guard < 8000) {
      guard++;
      const fn = tpls[ti++ % tpls.length];
      const it = fn(R);
      if (!it || !it.text || it.ans == null || it.ans === '') continue;
      it.text = cleanVoice(it.text);
      if (have >= target && !it.fig) continue;
      const key = it.text.replace(/\s+/g, ' ') + (it.fig ? JSON.stringify(it.fig) : '');
      if (seenText.has(key)) continue;
      const sk = 'G:' + String(it.text).replace(/-?\d+(\.\d+)?/g, 'N').replace(/\s+/g, ' ');
      skelCount[sk] = (skelCount[sk] || 0) + 1;
      if (skelCount[sk] > 5) continue;
      seenText.add(key);
      const dists = (it.dists || []).map(String).filter(d => d !== String(it.ans));
      if (dists.length < 3) continue;
      const canSpr = it.type !== 'mcq' && !fn.mcqOnly && isCleanSprAnswer(it.ans) && !SPR_BAD_STEM.test(it.text);
      const makeSpr = canSpr && R() < 0.4;
      const opts = [String(it.ans), ...dists.slice(0, 3)];
      const rot = Math.floor(R() * 4);
      const choices = [0, 1, 2, 3].map(k => choiceText(opts[(k + rot) % 4]));
      const answer = choices.indexOf(choiceText(String(it.ans)));
      if (new Set(choices).size !== 4) continue;
      const tcKey = it.text.replace(/\s+/g, ' ') + '|' + choices.slice().sort().join('|');
      if (seenText.has(tcKey)) continue;
      seenText.add(tcKey);
      const q = {
        id: `sat-bb-${String(++genId).padStart(4, '0')}`,
        domain: dom,
        difficulty: diff,
        type: makeSpr ? 'spr' : 'mcq',
        text: it.text,
        choices,
        answer,
        sol: it.sol.length >= 32 ? it.sol : `${it.sol} This gives the answer ${it.ans}.`
      };
      if (makeSpr) q.sprAnswer = String(it.ans);
      if (it.fig) { q.figure = it.fig; figGen++; }
      generated.push(q);
      have++;
    }
  }
}

/* ── 5. Balance each domain/difficulty cell to its target and write ── */
const all = base.concat(generated);
const finalPool = [];
for (const dom of DOMAINS) {
  for (const diff of ['easy', 'medium', 'hard']) {
    const target = dom === ADV.DESMOS ? DESMOS_TARGET : TARGET;
    const cell = all.filter(q => q.domain === dom && q.difficulty === diff);
    const genFig = cell.filter(q => q.figure && String(q.id || '').startsWith('sat-bb-'));
    const rest = cell.filter(q => !genFig.includes(q));
    finalPool.push(...genFig.concat(rest).slice(0, target));
  }
}
finalPool.forEach((q, i) => { if (!q.id) q.id = `sat-${String(i + 1).padStart(4, '0')}`; });
/* Chapter (topic) tag used by chapter practice and worksheets — always derived from the domain. */
const TOPIC_OF = {
  [ALG.LIN_EQ]: 'sat-linear', [ALG.LIN_FN]: 'sat-linfun', [ADV.QUAD]: 'sat-quad', [ADV.EXPO]: 'sat-expoly',
  [PG.RATIO]: 'sat-data', [PG.GEO]: 'sat-geo', [ADV.DESMOS]: 'sat-desmos', [ADV.NONLIN]: 'sat-functions',
  [PG.STATS]: 'sat-stats', [PG.PROB]: 'sat-condprob'
};
finalPool.forEach(q => { q.topic_id = TOPIC_OF[q.domain]; });
const ids = new Set();
finalPool.forEach((q, i) => { if (ids.has(q.id)) q.id = `${q.id}-${i}`; ids.add(q.id); });

fs.writeFileSync(BANK_PATH, JSON.stringify({ pool: finalPool }, null, 2) + '\n');

const summary = {};
finalPool.forEach(q => {
  const s = summary[q.domain] || (summary[q.domain] = { easy: 0, medium: 0, hard: 0, spr: 0, fig: 0 });
  s[q.difficulty]++;
  if (q.type === 'spr') s.spr++;
  if (q.figure) s.fig++;
});
console.log(`Generated ${generated.length} template items. Final bank: ${finalPool.length} items.`);
Object.entries(summary).forEach(([d, s]) => console.log(`  ${d}: E${s.easy} M${s.medium} H${s.hard} | SPR ${s.spr} | figures ${s.fig}`));
