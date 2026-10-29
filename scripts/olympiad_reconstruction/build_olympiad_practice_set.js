'use strict';

const fs = require('fs');
const path = require('path');
const katex = require('../../node_modules/katex');

const ROOT = path.resolve(__dirname, '../..');
const OUT_PATH = path.join(ROOT, 'content', 'olympiad', '_practice-set.json');
const FIGURES_PATH = path.join(ROOT, 'public', 'js', 'figures.js');

const part1 = require('./pset_part1_basic_inter');
const part2 = require('./pset_part2_inter_adv');
const items = [...part1, ...part2];

// Load figures.js SSR renderer
const figCode = fs.readFileSync(FIGURES_PATH, 'utf8');
const figWin = {};
new Function('window', figCode)(figWin);
const renderFig = figWin._renderFig;
if (typeof renderFig !== 'function') {
  throw new Error('Failed to load window._renderFig from public/js/figures.js');
}

const errors = [];
if (items.length !== 54) {
  errors.push(`Expected 54 items, got ${items.length}`);
}

const counts = { Basic: 0, Intermediate: 0, Advanced: 0 };
let figCount = 0;

function checkKaTeX(str, loc) {
  if (str.includes('$')) errors.push(`${loc}: contains '$'`);
  if (/\bwait\b/i.test(str) && !/wait-free|waiting|waits/i.test(str)) {
    errors.push(`${loc}: contains drafting 'wait'`);
  }
  const inlineRe = /\\\(([\s\S]*?)\\\)/g;
  let m;
  while ((m = inlineRe.exec(str)) !== null) {
    try {
      katex.renderToString(m[1], { displayMode: false, throwOnError: true, strict: 'ignore' });
    } catch (e) {
      errors.push(`${loc}: inline KaTeX error: ${e.message}`);
    }
  }
  const dispRe = /\\\[([\s\S]*?)\\\]/g;
  while ((m = dispRe.exec(str)) !== null) {
    try {
      katex.renderToString(m[1], { displayMode: true, throwOnError: true, strict: 'ignore' });
    } catch (e) {
      errors.push(`${loc}: display KaTeX error: ${e.message}`);
    }
  }
}

items.forEach((it, idx) => {
  const num = idx + 1;
  if (it.number !== num) errors.push(`Item ${idx}: number ${it.number} !== ${num}`);
  if (!counts.hasOwnProperty(it.difficulty)) {
    errors.push(`Item #${num}: invalid difficulty ${it.difficulty}`);
  } else {
    counts[it.difficulty]++;
  }
  for (const lang of ['en', 'ar']) {
    if (!it.question || typeof it.question[lang] !== 'string' || it.question[lang].length < 40) {
      errors.push(`Item #${num}.question.${lang} too short or missing`);
    } else {
      checkKaTeX(it.question[lang], `Item #${num}.question.${lang}`);
    }
    if (!it.solution || typeof it.solution[lang] !== 'string' || it.solution[lang].length < 200) {
      errors.push(`Item #${num}.solution.${lang} < 200 chars (${it.solution?.[lang]?.length})`);
    } else {
      checkKaTeX(it.solution[lang], `Item #${num}.solution.${lang}`);
    }
  }
  if (it.fig) {
    figCount++;
    const svg = renderFig(it.fig);
    if (!svg || !svg.includes('<svg') || svg.includes('NaN') || svg.includes('undefined')) {
      errors.push(`Item #${num}.fig (${it.fig.type}) failed SVG render: ${String(svg).slice(0, 120)}`);
    }
  }
});

if (counts.Basic !== 18 || counts.Intermediate !== 18 || counts.Advanced !== 18) {
  errors.push(`Expected 18/18/18 split, got ${JSON.stringify(counts)}`);
}

if (errors.length > 0) {
  console.error('Practice set validation failed:');
  errors.forEach(e => console.error('  -', e));
  process.exit(1);
}

const practiceSet = {
  variant: 'standard',
  heading: 'Practice set',
  introText: 'Fifty-four graded Mathematical Olympiad problems spanning all three subsections — Core International Olympiad Pillars (Ch 1–8), NSMO of KSA / Mawhiba (Ch 9–10), and KAUST Mathematics Competition & Academy (Ch 11–12). Click any problem for the complete step-by-step Olympiad proof and solution.',
  items
};

fs.writeFileSync(OUT_PATH, JSON.stringify(practiceSet, null, 2) + '\n', 'utf8');
console.log(`SUCCESS: Wrote 54 Olympiad practice-set problems (${JSON.stringify(counts)}, ${figCount} valid SVG figures)!`);
