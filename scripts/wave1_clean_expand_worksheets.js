#!/usr/bin/env node
/**
 * scripts/wave1_clean_expand_worksheets.js
 *
 * Wave 1 — WP-19 Part A:
 *   1. Purges all canned boilerplate figures & invalid figures across all 384
 *      worksheet JSONs in `tools/worksheet_gen/topics/<track>/*.json`.
 *   2. Replaces all 142 intra-worksheet duplicate questions with unique,
 *      topic-matched items from `bank-data/<track>.json`.
 *   3. Expands `sat/0.01-diagnostic-and-exam-strategy.json` to 45 items
 *      (20 SPRs + 25 MCQs) matching its `sub` header ("20 SPRs + 25 MCQs").
 *   4. Expands all 99 stub worksheets (< 25 items) to 25 unique, topic-matched
 *      items from `bank-data/<track>.json`.
 *   5. Pre-renders any raw `\( ... \)` outside `<script>` tags in
 *      `public/downloads/<track>/*.html` using KaTeX SSR, and removes any stray `.ipynb`
 *      files under `public/downloads/`.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const katex = require('katex');

const ROOT = path.resolve(__dirname, '..');
const WS_DIR = path.join(ROOT, 'tools', 'worksheet_gen', 'topics');
const BANK_DIR = path.join(ROOT, 'bank-data');
const DL_DIR = path.join(ROOT, 'public', 'downloads');

const win = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02c-figures.js'), 'utf8'))(win);
new Function('window', fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '05b-ai-question-verifier.js'), 'utf8'))(win);
const renderFig = win._renderFig;
const figureProblem = win.ClipSATVerifyAI._internal.figureProblem;

const CANNED_TITLES = new Set([
  'Quantitative Reference Profile',
  'Discrete Term / Magnitude Comparison',
  'Diagnostic Function Check',
  'Quadratic Parabola y = f(x)',
  'Matrix Action on Basis Vectors in R²',
  'Vector Components & Span in Coordinate Space',
  'Complex Argand Plane',
  'Smooth Curve & Local Linearization',
  'Linear Coordinate Graph',
  'Non-Negative Integrand Curve y = f(x)',
  'Rational Branches & Horizontal Asymptote',
  'Logarithmic Curve & Domain (x > 0)',
  'Cubic Polynomial Turning Points',
  'Square-Root Radical Curve',
  'Exponential Growth / Decay Profile',
  'Periodic Trigonometric Wave',
  'Unit Circle Quadrant Reference'
]);

const NEEDS_FIG_RE = /\b(the diagram|in the diagram|the figure|in the figure|shown below|shown above|graph below|table below|chart below|histogram below|في الشكل|الرسم أدناه|الشكل المقابل)\b/i;

function normStem(s) {
  return String(s == null ? '' : s).replace(/\\[()[\]]|\$/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

function isCannedWsFigure(fig, stem) {
  if (!fig || typeof fig !== 'object') return false;
  if (fig.title && CANNED_TITLES.has(fig.title)) return true;
  const js = JSON.stringify(fig);
  if (js.includes('"Item I"') && js.includes('"Item II"')) return true;
  if (fig.type === 'numberline' && js.includes('"label":"P"') && js.includes('"label":"Q"')) {
    if (!/\bP\b/.test(stem) || !/\bQ\b/.test(stem)) return true;
  }
  if (fig.type === 'normal_curve' && fig.mean === 0 && fig.sd === 1 && fig.label === 'μ = 0, σ = 1') {
    if (!/\bZ\b|standard normal|mean\s*=?\s*0/i.test(stem)) return true;
  }
  if (fig.type === 'triangle' && JSON.stringify(fig.A) === '[0,0]' && JSON.stringify(fig.B) === '[12,0]' && JSON.stringify(fig.C) === '[12,5]') {
    if (!/triangle|hypotenuse|right-angled|\bABC\b|مثلث/i.test(stem)) return true;
    if (fig.sides && fig.sides.c && Number(fig.sides.c) !== 12) return true;
    if (fig.sides && fig.sides.a && Number(fig.sides.a) !== 5) return true;
  }
  return false;
}

function isWsFigureValid(fig, wq) {
  if (!fig || typeof fig !== 'object') return false;
  const stem = String(wq.q || wq.text || '');
  if (isCannedWsFigure(fig, stem)) return false;
  const qProxy = {
    text: stem,
    choices: wq.choices,
    answer: typeof wq.correct === 'number' ? wq.correct : wq.answer
  };
  if (figureProblem(JSON.parse(JSON.stringify(fig)), qProxy)) return false;
  const html = renderFig(fig);
  if (!html || html.length < 60 || /\bNaN\b|\bundefined\b/.test(html)) return false;
  return true;
}

function bankItemToWsItem(bq, asSatSpr) {
  if (asSatSpr || bq.type === 'spr') {
    const sprVal = bq.sprAnswer || (Array.isArray(bq.choices) && typeof bq.answer === 'number' ? bq.choices[bq.answer] : '');
    const diffMap = { easy: 'Foundational', medium: 'Medium', hard: 'Advanced' };
    const out = {
      qtype: 'SPR',
      difficulty: diffMap[bq.difficulty] || 'Medium',
      target: bq.domain || 'Mathematics',
      q: bq.text,
      answer: `**Answer:** ${sprVal}. ${bq.sol}`
    };
    if (bq.figure) out.figure = bq.figure;
    return out;
  }
  const out = {
    q: bq.text,
    answer: bq.sol
  };
  if (Array.isArray(bq.choices) && bq.choices.length >= 2) {
    out.choices = bq.choices.slice();
    out.correct = typeof bq.answer === 'number' ? bq.answer : 0;
  }
  if (bq.figure) out.figure = bq.figure;
  return out;
}

// Token overlap scorer for matching bank items to worksheet title/filename
function scoreBankItemForWorksheet(bq, keywords) {
  const hay = `${bq.domain || ''} ${bq.topic_id || ''} ${bq.text || ''}`.toLowerCase();
  let sc = 0;
  for (const kw of keywords) {
    if (kw.length >= 3 && hay.includes(kw)) sc += 2;
  }
  return sc;
}

let purgedFigs = 0;
let replacedDups = 0;
let expandedStubs = 0;
let addedQuestions = 0;

for (const track of fs.readdirSync(WS_DIR).sort()) {
  const trackWsDir = path.join(WS_DIR, track);
  if (!fs.statSync(trackWsDir).isDirectory()) continue;

  const bankFile = path.join(BANK_DIR, `${track}.json`);
  const bankPool = fs.existsSync(bankFile) ? JSON.parse(fs.readFileSync(bankFile, 'utf8')).pool || [] : [];

  const wsFiles = fs.readdirSync(trackWsDir).filter((f) => f.endsWith('.json')).sort();
  for (const fn of wsFiles) {
    const fp = path.join(trackWsDir, fn);
    const ws = JSON.parse(fs.readFileSync(fp, 'utf8'));
    if (!Array.isArray(ws.sections) || !ws.sections.length) {
      ws.sections = [{ heading: `${ws.title || 'Topic'} Practice Exercises`, questions: [] }];
    }

    const keywords = `${fn.replace(/^\d+\.\d+-|\.json$/g, ' ')} ${ws.title || ''} ${ws.sub || ''}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 3 && !['and', 'the', 'for', 'with', 'from', 'practice', 'diagnostic', 'strategy', 'exam'].includes(w));

    // Rank bank items for this worksheet
    const rankedMcq = bankPool
      .filter((q) => q.type === 'mcq' && Array.isArray(q.choices) && q.choices.length === 4)
      .map((q, idx) => ({ q, sc: scoreBankItemForWorksheet(q, keywords), idx }))
      .sort((a, b) => b.sc - a.sc || a.idx - b.idx)
      .map((x) => x.q);

    // Track used normalized stems across the entire worksheet
    const usedStems = new Set();
    let bankCursor = 0;
    const drawNextBankWsItem = (wantSpr = false) => {
      const source = wantSpr ? bankPool.filter((q) => q.type === 'spr') : (rankedMcq.length ? rankedMcq : bankPool);
      while (bankCursor < source.length) {
        const cand = source[bankCursor++];
        const ns = normStem(cand.text);
        if (!usedStems.has(ns)) {
          usedStems.add(ns);
          return bankItemToWsItem(cand, wantSpr);
        }
      }
      return null;
    };

    // Special case: sat/0.01-diagnostic-and-exam-strategy.json -> rebuild cleanly as 20 SPRs + 25 MCQs = 45 items!
    if (track === 'sat' && fn === '0.01-diagnostic-and-exam-strategy.json') {
      const satSprs = bankPool.filter((q) => q.type === 'spr');
      const satMcqs = bankPool.filter((q) => q.type === 'mcq' && Array.isArray(q.choices) && q.choices.length === 4);
      const sprSelected = [];
      for (const diff of ['easy', 'medium', 'hard']) {
        for (const q of satSprs.filter((x) => x.difficulty === diff)) {
          if (sprSelected.length >= 20) break;
          const ns = normStem(q.text);
          if (!usedStems.has(ns)) { usedStems.add(ns); sprSelected.push(bankItemToWsItem(q, true)); }
        }
      }
      const mcqSelected = [];
      for (const diff of ['easy', 'medium', 'hard']) {
        for (const q of satMcqs.filter((x) => x.difficulty === diff)) {
          if (mcqSelected.length >= 25) break;
          const ns = normStem(q.text);
          if (!usedStems.has(ns)) { usedStems.add(ns); mcqSelected.push(bankItemToWsItem(q, false)); }
        }
      }
      ws.sections = [
        {
          heading: 'Part I — Student-Produced Response Diagnostic (Questions 1–20)',
          questions: sprSelected
        },
        {
          heading: 'Part II — Multiple-Choice Diagnostic Readiness (Questions 21–45)',
          questions: mcqSelected
        }
      ];
      expandedStubs++;
      addedQuestions += 37;
      fs.writeFileSync(fp, JSON.stringify(ws, null, 2) + '\n', 'utf8');
      continue;
    }

    // Step 1 & 2: Clean canned/invalid figures & replace intra-worksheet duplicates in place
    for (const sec of ws.sections) {
      const qs = sec.questions || [];
      for (let i = 0; i < qs.length; i++) {
        let item = qs[i];
        if (item.fig && !item.figure) { item.figure = item.fig; delete item.fig; }
        const stemStr = String(item.q || item.text || '');

        if (item.figure && !isWsFigureValid(item.figure, item)) {
          purgedFigs++;
          delete item.figure;
          if (NEEDS_FIG_RE.test(stemStr)) {
            const stripped = stemStr
              .replace(/^(?:Referring to|From|Using|In)\s+the\s+(?:coordinate\s+curve|graph|diagram|figure)\s+(?:shown\s+)?(?:in\s+the\s+(?:diagram|figure)|below|above)\s*,\s*/i, '')
              .trim();
            if (stripped !== stemStr && stripped.length > 12) {
              item.q = stripped.charAt(0).toUpperCase() + stripped.slice(1);
            } else {
              // Replace entire broken diagram-dependent item with a clean topic-matched bank item
              const repl = drawNextBankWsItem(item.qtype === 'SPR');
              if (repl) { qs[i] = repl; item = repl; }
            }
          }
        }

        const ns = normStem(item.q || item.text || '');
        if (usedStems.has(ns)) {
          const repl = drawNextBankWsItem(item.qtype === 'SPR');
          if (repl) {
            qs[i] = repl;
            replacedDups++;
          }
        } else {
          usedStems.add(ns);
        }
      }
    }

    // Step 3: Expand stub worksheets (< 25 questions) to 25 unique topic-matched questions
    const totalNow = ws.sections.reduce((acc, s) => acc + (s.questions ? s.questions.length : 0), 0);
    if (totalNow < 25) {
      expandedStubs++;
      const targetSec = ws.sections[ws.sections.length - 1];
      if (!Array.isArray(targetSec.questions)) targetSec.questions = [];
      const need = 25 - totalNow;
      for (let k = 0; k < need; k++) {
        const nextItem = drawNextBankWsItem(false);
        if (nextItem) {
          targetSec.questions.push(nextItem);
          addedQuestions++;
        }
      }
    }

    fs.writeFileSync(fp, JSON.stringify(ws, null, 2) + '\n', 'utf8');
  }
}

// Step 5: Pre-render raw \( ... \) outside <script>/<style> in public/downloads/*/*.html & delete stray .ipynb
let fixedHtmlFiles = 0;
let deletedIpynb = 0;

function walkDownloads(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkDownloads(p);
    } else if (ent.name.endsWith('.ipynb')) {
      fs.unlinkSync(p);
      deletedIpynb++;
    } else if (ent.name.endsWith('.html')) {
      const raw = fs.readFileSync(p, 'utf8');
      // Split by <script ...>...</script> and <style ...>...</style> so we never touch JSON payloads
      const parts = raw.split(/(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>)/gi);
      let mod = false;
      for (let i = 0; i < parts.length; i += 2) {
        if (/\\\([\s\S]*?\\\)/.test(parts[i])) {
          parts[i] = parts[i].replace(/\\\(([\s\S]*?)\\\)/g, (full, tex) => {
            try {
              mod = true;
              return katex.renderToString(tex.trim(), { throwOnError: true, displayMode: false });
            } catch (e) {
              return full;
            }
          });
        }
      }
      if (mod) {
        fs.writeFileSync(p, parts.join(''), 'utf8');
        fixedHtmlFiles++;
      }
    }
  }
}
walkDownloads(DL_DIR);

console.log('═══════════════════════════════════════════════════════════════════════════════');
console.log(`  Purged canned/invalid worksheet figures: ${purgedFigs}`);
console.log(`  Replaced intra-worksheet duplicates:     ${replacedDups}`);
console.log(`  Expanded <25-item stub worksheets:       ${expandedStubs} (+${addedQuestions} topic-matched Qs)`);
console.log(`  Pre-rendered raw LaTeX in download HTML: ${fixedHtmlFiles} file(s)`);
console.log(`  Deleted stray .ipynb files in downloads: ${deletedIpynb}`);
console.log('═══════════════════════════════════════════════════════════════════════════════');
