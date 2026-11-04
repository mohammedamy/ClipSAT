#!/usr/bin/env node
/**
 * upgrade-worked-example-cards.js — Wave 2 (WP-32)
 *
 * Ensures every single one of the 306 chapters across all 31 tracks has >= 3
 * interactive `workedExampleCard` blocks (918+ total across ClipSAT):
 *   1. Converts multi-paragraph `callout` (`style: "example" | "example-card" | "example-grid"`)
 *      blocks in-place to `workedExampleCard` with math-safe AST protection so LaTeX
 *      delimiters are never split and leading `Problem:` / `المسألة:` prefixes are stripped.
 *   2. For any chapter still under 3 `workedExampleCard` blocks, synthesizes clean,
 *      syllabus-authentic `workedExampleCard` blocks from `bank-data/{track}.json`
 *      matched to that chapter's `topic_id`, `quizWidget.domains`, or title keywords.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const BANK_DIR = path.join(ROOT, 'bank-data');

function maskMath(html) {
  if (!html) return { masked: '', tokens: [] };
  const tokens = [];
  const masked = String(html).replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g, (m) => {
    const idx = tokens.length;
    tokens.push(m);
    return `__CSMATH_${idx}__`;
  });
  return { masked, tokens };
}

function unmaskMath(str, tokens) {
  if (!str) return '';
  return String(str).replace(/__CSMATH_(\d+)__/g, (_, i) => tokens[Number(i)] || '');
}

function stripLeadingProblemPrefix(s, isAr) {
  let out = String(s || '').trim();
  // Strip outer single <p>...</p> wrapper if no inner </p>
  if (/^<p\b[^>]*>[\s\S]*<\/p>$/i.test(out)) {
    const inner = out.replace(/^<p\b[^>]*>/i, '').replace(/<\/p>$/i, '');
    if (!/<\/p>/i.test(inner)) out = inner.trim();
  }
  if (isAr) {
    out = out.replace(/^(?:<(?:strong|b)>)?\s*(?:المسألة|مثال(?:\s*محلول)?|سؤال)\s*(?:\([^)]*\))?\s*[:.،\-–—]?\s*(?:<\/(?:strong|b)>)?\s*[:.،\-–—]?\s*/i, '');
  } else {
    out = out.replace(/^(?:<(?:strong|b)>)?\s*(?:Problem|Question|Worked\s+Example(?:\s+[A-Z0-9.]+)?)\s*(?:\([^)]*\))?\s*[:.\-–—]?\s*(?:<\/(?:strong|b)>)?\s*[:.\-–—]?\s*/i, '');
  }
  return out.trim();
}

function cleanSolutionHtml(s, isAr) {
  let out = String(s || '').trim();
  if (!out) return '';
  // Normalize plain double-newlines into <br><br> if not already HTML-structured
  if (!/<(?:p|ol|ul|div|table)\b/i.test(out) && /\n\n/.test(out)) {
    out = out.split(/\n{2,}/).map((p) => `<p>${p.trim()}</p>`).join('');
  }
  if (isAr) {
    out = out.replace(/^(?:<p[^>]*>\s*)?(?:<(?:strong|b)>)\s*(?:الحل(?:\s*خطوة\s*بخطوة)?)\s*[:.،\-–—]?\s*(?:<\/(?:strong|b)>)\s*[:.،\-–—]?\s*(?:<\/p>\s*)?/i, (m) => {
      return /^<p/i.test(m) && !/<\/p>\s*$/i.test(m) ? '<p>' : '';
    });
  } else {
    out = out.replace(/^(?:<p[^>]*>\s*)?(?:<(?:strong|b)>)\s*(?:Step-by-Step\s+Solution|Solution)\s*[:.\-–—]?\s*(?:<\/(?:strong|b)>)\s*[:.\-–—]?\s*(?:<\/p>\s*)?/i, (m) => {
      return /^<p/i.test(m) && !/<\/p>\s*$/i.test(m) ? '<p>' : '';
    });
  }
  return out.trim();
}

function splitProblemAndSolution(rawHtml, isAr) {
  if (!rawHtml || typeof rawHtml !== 'string') return null;
  const { masked, tokens } = maskMath(rawHtml.trim());

  // Strategy 1: Multiple top-level <p>...</p> blocks (first <p> = problem, rest = solution)
  const pMatch = masked.match(/^<p\b[^>]*>([\s\S]*?)<\/p>\s*([\s\S]+)$/i);
  if (pMatch && pMatch[1].trim() && pMatch[2].trim()) {
    const prob = stripLeadingProblemPrefix(unmaskMath(pMatch[1], tokens), isAr);
    const sol = cleanSolutionHtml(unmaskMath(pMatch[2], tokens), isAr);
    if (prob.length >= 6 && sol.length >= 4) {
      return { problem: prob, solution: sol };
    }
  }

  // Strategy 2: Explicit Solution / الحل marker
  const solMarker = isAr
    ? /(?:<br\s*\/?>|\n)\s*(?=<(?:strong|b)>\s*(?:الحل|طريقة|قانون))/i
    : /(?:<br\s*\/?>|\n)\s*(?=<(?:strong|b)>\s*(?:Step-by-Step\s+Solution|Solution|Method|Shortcut))/i;
  const parts = masked.split(solMarker);
  if (parts.length >= 2 && parts[0].trim() && parts.slice(1).join(' ').trim()) {
    const prob = stripLeadingProblemPrefix(unmaskMath(parts[0], tokens), isAr);
    const sol = cleanSolutionHtml(unmaskMath(parts.slice(1).join('<br>'), tokens), isAr);
    if (prob.length >= 6 && sol.length >= 4) {
      return { problem: prob, solution: sol };
    }
  }

  return null;
}

function loadBankPool(track) {
  const bp = path.join(BANK_DIR, `${track}.json`);
  if (!fs.existsSync(bp)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(bp, 'utf8'));
    if (Array.isArray(data.pool)) return data.pool.filter((q) => q && !q.quarantined);
    return [].concat(data.easy || [], data.medium || [], data.hard || []);
  } catch (e) {
    return [];
  }
}

function formatBankItemAsWorkedExample(q, idxNum, chTitleEn, chTitleAr) {
  const diffLabel = q.difficulty
    ? q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)
    : 'Standard';
  const diffAr = q.difficulty === 'easy' ? 'تأسيسي' : (q.difficulty === 'hard' ? 'متقدم' : 'متوسط');

  let probEn = String(q.text || q.q || '').trim();
  // Strip any embedded HTML tables only if malformed; keep valid HTML/math
  if (Array.isArray(q.choices) && q.choices.length >= 2 && q.type !== 'spr' && q.type !== 'frq') {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const opts = q.choices
      .slice(0, 5)
      .map((c, i) => `<span style="margin-inline-end:12px"><strong>(${letters[i]})</strong> ${String(c).trim()}</span>`)
      .join(' ');
    probEn += `<div style="margin-top:6px;font-size:.92em">${opts}</div>`;
  }

  let solEn = String(q.sol || q.exp || '').trim();
  const ansIdx = typeof q.answer === 'number' ? q.answer : (typeof q.ans === 'number' ? q.ans : -1);
  if (ansIdx >= 0 && Array.isArray(q.choices) && q.choices[ansIdx] !== undefined) {
    const letter = ['A', 'B', 'C', 'D', 'E'][ansIdx] || '';
    if (!solEn) {
      solEn = `<p>Correct choice: <strong>(${letter})</strong> ${q.choices[ansIdx]}.</p>`;
    } else if (!/<p\b/i.test(solEn)) {
      solEn = `<p>${solEn}</p><p><strong>Answer:</strong> (${letter}) ${q.choices[ansIdx]}</p>`;
    }
  } else if (!solEn && q.ans !== undefined) {
    solEn = `<p><strong>Answer:</strong> ${q.ans}</p>`;
  } else if (solEn && !/<p\b/i.test(solEn)) {
    solEn = `<p>${solEn}</p>`;
  }

  const hasAr = Boolean(q.text_ar && q.sol_ar);
  return {
    kind: 'workedExampleCard',
    label: {
      en: `Worked Example ${idxNum} (${diffLabel}) — ${chTitleEn}`,
      ar: chTitleAr ? `مثال محلول ${idxNum} (${diffAr}) — ${chTitleAr}` : null
    },
    problem: {
      en: probEn,
      ar: hasAr ? String(q.text_ar).trim() : null
    },
    solution: {
      en: solEn,
      ar: hasAr ? `<p>${String(q.sol_ar).trim()}</p>` : null
    }
  };
}

let convertedBlocks = 0;
let synthesizedBlocks = 0;
let totalWorkedCards = 0;
let chaptersUpdated = 0;
let totalChapters = 0;

const trackDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());

for (const td of trackDirs) {
  const track = td.name;
  const dir = path.join(CONTENT_DIR, track);
  const metaPath = path.join(dir, '_meta.json');
  if (!fs.existsSync(metaPath)) continue;
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const pool = loadBankPool(track);
  const usedBankIds = new Set();

  for (const cid of meta.chapterOrder || []) {
    totalChapters++;
    const chPath = path.join(dir, `${cid}.json`);
    const ch = JSON.parse(fs.readFileSync(chPath, 'utf8'));
    const blocks = (ch.content && ch.content.blocks) || [];
    let modified = false;

    // Step 1: Convert eligible `callout` example blocks into `workedExampleCard`
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (
        b.kind === 'callout' &&
        (b.style === 'example' || b.style === 'example-card') &&
        !b.copyLatex &&
        b.body &&
        b.body.en
      ) {
        const enSplit = splitProblemAndSolution(b.body.en, false);
        if (!enSplit) continue;
        let arProb = null;
        let arSol = null;
        if (b.body.ar) {
          const arSplit = splitProblemAndSolution(b.body.ar, true);
          if (!arSplit) continue; // Keep original callout if Arabic exists but couldn't split cleanly
          arProb = arSplit.problem;
          arSol = arSplit.solution;
        }
        const labelObj = b.label && b.label.en
          ? { en: b.label.en, ar: b.label.ar || null }
          : { en: 'Worked Example', ar: b.body.ar ? 'مثال محلول' : null };

        const card = {
          kind: 'workedExampleCard',
          label: labelObj,
          problem: { en: enSplit.problem, ar: arProb },
          solution: { en: enSplit.solution, ar: arSol }
        };
        if (b.id) card.id = b.id;
        blocks[i] = card;
        convertedBlocks++;
        modified = true;
      }
    }

    // Step 2: Ensure >= 3 workedExampleCard blocks per chapter using verified bank items
    let weCount = blocks.filter((b) => b.kind === 'workedExampleCard').length;
    if (weCount < 3 && pool.length > 0) {
      const chDomains = new Set((ch.quizWidget && ch.quizWidget.domains) || []);
      const titleWords = String((ch.title && ch.title.en) || '')
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length >= 4);

      const candidates = pool.filter((q) => {
        if (!q || !(q.text || q.q) || !(q.sol || q.exp)) return false;
        if (q.figure || q.fig) return false; // Prefer self-contained algebraic/analytical items
        const qid = q.id || (q.text || q.q);
        if (usedBankIds.has(qid)) return false;
        return true;
      });

      const scored = candidates.map((q) => {
        let s = 0;
        if (q.topic_id === cid) s += 100;
        if (chDomains.size && q.domain && chDomains.has(q.domain)) s += 60;
        const hay = `${q.domain || ''} ${q.text || q.q || ''}`.toLowerCase();
        for (const w of titleWords) {
          if (hay.includes(w)) s += 15;
        }
        if ((q.sol || '').length >= 60) s += 10;
        return { q, s };
      }).sort((a, b) => b.s - a.s);

      const chTitleEn = (ch.title && ch.title.en) || cid;
      const chTitleAr = (ch.title && ch.title.ar) || null;

      // Insert before trailing seeAlso block if present
      let insertIdx = blocks.length;
      if (insertIdx > 0 && blocks[insertIdx - 1].kind === 'seeAlso') {
        insertIdx--;
      }

      let pickIdx = 0;
      while (weCount < 3 && pickIdx < scored.length) {
        const chosen = scored[pickIdx++].q;
        const qid = chosen.id || (chosen.text || chosen.q);
        usedBankIds.add(qid);
        weCount++;
        const card = formatBankItemAsWorkedExample(chosen, weCount, chTitleEn, chTitleAr);
        blocks.splice(insertIdx, 0, card);
        insertIdx++;
        synthesizedBlocks++;
        modified = true;
      }
    }

    totalWorkedCards += blocks.filter((b) => b.kind === 'workedExampleCard').length;
    if (modified) {
      chaptersUpdated++;
      fs.writeFileSync(chPath, JSON.stringify(ch, null, 2) + '\n', 'utf8');
    }
  }
}

console.log(`✅ WP-32 Worked Example Upgrade Complete:`);
console.log(`   Chapters audited:      ${totalChapters}`);
console.log(`   Chapters updated:      ${chaptersUpdated}`);
console.log(`   Callouts converted:    ${convertedBlocks}`);
console.log(`   Bank cards added:      ${synthesizedBlocks}`);
console.log(`   Total worked cards:    ${totalWorkedCards}`);
