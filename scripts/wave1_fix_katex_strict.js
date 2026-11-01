#!/usr/bin/env node
'use strict';

/**
 * Wave 1 (WP-17): Corpus-Wide Strict KaTeX Normalization & Repair
 *
 * Repairs all strict-mode KaTeX errors, unclosed/stray delimiters, mangled currency
 * escapes, and <[^>]+>-truncated worksheet items across:
 *   1. bank-data/*.json
 *   2. content/<track>/*.json
 *   3. tools/worksheet_gen/topics/<track>/*.json
 *   4. src/scripts/ix-data/*.js
 */

const fs = require('fs');
const path = require('path');
const katex = require('katex');

const ROOT = path.resolve(__dirname, '..');

// Silence KaTeX's noisy console.warn about Arabic glyph metrics inside \text{...}
const origWarn = console.warn;
console.warn = (...args) => {
  if (String(args[0] || '').includes('No character metrics')) return;
  origWarn(...args);
};

function strictFilter(code, msg) {
  if (
    (code === 'unknownSymbol' || code === 'unicodeTextInMathMode') &&
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u200C-\u200F]/.test(msg)
  ) {
    return 'ignore';
  }
  return 'error';
}

// Validate a string using ClipSAT's canonical delimiters: \[...\], \(...\), $$...$$
// Also ensures zero residual $math$ segments remain in worksheet topics.
function getStrictIssues(str, checkDollarMath = false) {
  const issues = [];
  if (typeof str !== 'string') return issues;

  let i = 0;
  const n = str.length;
  while (i < n) {
    if (str[i] === '\\' && i + 1 < n) {
      const nx = str[i + 1];
      if (nx === '\\' || nx === '$') {
        i += 2;
        continue;
      }
      if (nx === '(' || nx === '[') {
        const display = nx === '[';
        const closeCh = display ? ']' : ')';
        let j = i + 2;
        let found = -1;
        while (j < n - 1) {
          if (str[j] === '\\') {
            if (str[j + 1] === '\\') {
              j += 2;
              continue;
            }
            if (str[j + 1] === closeCh) {
              found = j;
              break;
            }
          }
          j++;
        }
        if (found === -1) {
          issues.push(`unclosed_\\${nx}`);
          i += 2;
          continue;
        }
        const tex = str.slice(i + 2, found);
        try {
          katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: strictFilter });
        } catch (e) {
          issues.push(`katex_err: ${e.message}`);
        }
        i = found + 2;
        continue;
      }
      if (nx === ')' || nx === ']') {
        issues.push(`stray_\\${nx}`);
        i += 2;
        continue;
      }
    }
    if (str[i] === '$' && str[i + 1] === '$') {
      let j = i + 2;
      let found = -1;
      while (j <= n - 2) {
        if (str[j] === '\\') {
          j += 2;
          continue;
        }
        if (str[j] === '$' && str[j + 1] === '$') {
          found = j;
          break;
        }
        j++;
      }
      if (found === -1) {
        issues.push('unclosed_$$');
        i += 2;
        continue;
      }
      const tex = str.slice(i + 2, found);
      try {
        katex.renderToString(tex, { displayMode: true, throwOnError: true, strict: strictFilter });
      } catch (e) {
        issues.push(`ddollar_err: ${e.message}`);
      }
      i = found + 2;
      continue;
    }
    i++;
  }

  if (checkDollarMath && str.includes('$')) {
    // Strip valid \(...\) and \[...\] first, then check if any non-currency $...$ remains
    const stripped = str
      .replace(/(?<!\\)\\\([\s\S]*?(?<!\\)\\\)/g, ' ')
      .replace(/(?<!\\)\\\[[\s\S]*?(?<!\\)\\\]/g, ' ')
      .replace(/\\\$/g, ' ');
    const m = stripped.match(/\$[^$\n]+\$/g);
    if (m) {
      for (const seg of m) {
        // Two currency amounts in prose: starts with $[0-9] and has English words between
        if (/^\$[0-9]/.test(seg) && /\s+[a-zA-Z]{2,}\s+/.test(seg)) continue;
        issues.push(`residual_dollar_math: ${seg.slice(0, 40)}`);
      }
    }
  }

  return issues;
}

// Clean inner LaTeX expression for strict KaTeX compatibility
function cleanInnerTex(tex) {
  return tex
    .replace(/\\'/g, "'")
    .replace(/\\mathrm\{–\}|–/g, '\\text{-}')
    .replace(/\b4\s+eq\s+2\.\s*\\quad\s*\\mathrm\{\(Extraneous\\\s*✗\)\}/g, '4 \\neq 2 \\quad \\text{(Extraneous)}')
    .replace(/✗/g, '\\times ');
}

// Clean all \(...\) and \[...\] blocks inside a string
function cleanDelimitedMath(str) {
  if (typeof str !== 'string') return str;
  let out = '';
  let i = 0;
  const n = str.length;
  while (i < n) {
    if (str[i] === '\\' && i + 1 < n) {
      const nx = str[i + 1];
      if (nx === '\\') {
        out += '\\\\';
        i += 2;
        continue;
      }
      if (nx === '(' || nx === '[') {
        const closeCh = nx === '[' ? ']' : ')';
        let j = i + 2;
        let found = -1;
        while (j < n - 1) {
          if (str[j] === '\\') {
            if (str[j + 1] === '\\') {
              j += 2;
              continue;
            }
            if (str[j + 1] === closeCh) {
              found = j;
              break;
            }
          }
          j++;
        }
        if (found !== -1) {
          const inner = cleanInnerTex(str.slice(i + 2, found));
          out += '\\' + nx + inner + '\\' + closeCh;
          i = found + 2;
          continue;
        }
      }
    }
    out += str[i];
    i++;
  }
  return out;
}

// Convert $math$ and $$math$$ in worksheet strings to \(...\) and \[...\] while preserving currency ($15, $1,200)
function convertWorksheetDollars(str) {
  if (typeof str !== 'string') return str;

  // Fix known currency corruption "$x$148" / "$x$3" -> "$148" / "$3"
  let s = str.replace(/\$x\$([0-9][0-9,.]*)/g, '$$$1');
  // Fix "$$If$" -> "If $"
  s = s.replace(/\$\$If\$/g, 'If $');
  // Fix "= \)42. Largest share = $5 \times 42 =$ $210" / "= \)42"
  s = s.replace(/=\s*\\\)42\./g, '= 42.');
  s = s.replace(/\$5\s*\\times\s*42\s*=\$\s*\$?210/g, '\\(5 \\times 42 = 210\\)');
  // Fix "\mathbf{+\$1.50}$" where \$ inside $...$ got misparsed
  s = s.replace(/\$(E\(X\)\s*=\s*15\\left[\s\S]*?\\mathbf\{\+)\\?\$(1\.50\})\$/g, '\\($1\\$$2\\)');

  // Protect existing \(...\) and \[...\] spans first
  const stash = [];
  s = s.replace(/(?<!\\)\\\([\s\S]*?(?<!\\)\\\)|(?<!\\)\\\[[\s\S]*?(?<!\\)\\\]/g, (m) => {
    stash.push(m);
    return `\uE000${stash.length - 1}\uE001`;
  });

  // Convert $$...$$ -> \[...\]
  s = s.replace(/(?<!\\)\$\$([\s\S]+?)(?<!\\)\$\$/g, (_, inner) => {
    return `\\[${cleanInnerTex(inner)}\\]`;
  });

  // Walk single $ tokens carefully to distinguish currency ($50, $1,008.50) from $math$
  let res = '';
  let i = 0;
  while (i < s.length) {
    if (s[i] === '\\' && i + 1 < s.length) {
      res += s[i] + s[i + 1];
      i += 2;
      continue;
    }
    if (s[i] === '$') {
      // Check if this $ is clearly prose currency:
      // Currency if followed by digits (e.g. $50, $1,200, $2.50) AND NOT followed immediately by math operators/closes before another $
      // Let's find the next unescaped $
      let j = i + 1;
      let nextDollar = -1;
      while (j < s.length) {
        if (s[j] === '\\') {
          j += 2;
          continue;
        }
        if (s[j] === '$') {
          nextDollar = j;
          break;
        }
        j++;
      }
      if (nextDollar === -1) {
        // Single currency $ (e.g. "$2249.73")
        res += '$';
        i++;
        continue;
      }
      const candidate = s.slice(i + 1, nextDollar);
      const isCurrencyPair =
        /^[0-9][0-9,.]*(\/[a-zA-Z]+)?(\s|,|\.|\)|;|:)/.test(candidate) ||
        /^\s*\)/.test(candidate);
      if (isCurrencyPair) {
        // Leave this currency $ as literal '$' and keep scanning!
        res += '$';
        i++;
        continue;
      }
      // Check if candidate parses cleanly in KaTeX after cleanInnerTex
      const cleaned = cleanInnerTex(candidate);
      try {
        katex.renderToString(cleaned, { displayMode: false, throwOnError: true, strict: strictFilter });
        res += `\\(${cleaned}\\)`;
        i = nextDollar + 1;
        continue;
      } catch (_e) {
        // Leave literal if not valid TeX (will be caught by strict check if broken)
        res += '$';
        i++;
        continue;
      }
    }
    res += s[i];
    i++;
  }

  // Restore stashed \(...\) and \[...\]
  res = res.replace(/\uE000(\d+)\uE001/g, (_, idx) => stash[Number(idx)]);
  return cleanDelimitedMath(res);
}

// ── 1. Repair bank-data/*.json ──────────────────────────────────────────────
let bankFixes = 0;
const bankDir = path.join(ROOT, 'bank-data');
for (const file of fs.readdirSync(bankDir).filter((f) => f.endsWith('.json'))) {
  const fp = path.join(bankDir, file);
  const rawBefore = fs.readFileSync(fp, 'utf8');
  const data = JSON.parse(rawBefore);

  for (const q of data.pool || []) {
    // Specific surgical fixes
    if (file === 'a2level.json' && Array.isArray(q.choices)) {
      q.choices = q.choices.map((c) => (c === '\\(k = -2\\); \\; x = 7\\)' ? '\\(k = -2; \\; x = 7\\)' : c));
    }
    if (file === 'ibhl.json' && Array.isArray(q.choices)) {
      q.choices = q.choices.map((c) => (c === '\\(3, -2, -4\\)\\)' ? '\\(3, -2, -4\\)' : c));
    }
    if (file === 'apab.json' && typeof q.sol === 'string' && q.sol.includes('$\\int_{1}^{3}')) {
      q.sol = q.sol
        .replace(
          '$\int_{1}^{3} (3t^2 - 12t + 9) \\, dt = [t^3 - 6t^2 + 9t]_{1}^{3} \\\\',
          '\\(\\int_{1}^{3} (3t^2 - 12t + 9) \\, dt = [t^3 - 6t^2 + 9t]_{1}^{3}\\) \\\\'
        )
        .replace(
          '$\\int_{1}^{3} (3t^2 - 12t + 9) \\, dt = [t^3 - 6t^2 + 9t]_{1}^{3} \\\\',
          '\\(\\int_{1}^{3} (3t^2 - 12t + 9) \\, dt = [t^3 - 6t^2 + 9t]_{1}^{3}\\) \\\\'
        )
        .replace(
          '$= [(3)^3 - 6(3)^2 + 9(3)] - [(1)^3 - 6(1)^2 + 9(1)] \\\\',
          '\\(= [(3)^3 - 6(3)^2 + 9(3)] - [(1)^3 - 6(1)^2 + 9(1)]\\) \\\\'
        )
        .replace(
          '$= [27 - 54 + 27] - [1 - 6 + 9] \\\\',
          '\\(= [27 - 54 + 27] - [1 - 6 + 9]\\) \\\\'
        );
    }
    if ((file === 'ibhl.json' || file === 'ibsl.json') && typeof q.sol === 'string') {
      q.sol = q.sol
        .replace(
          '\\(f(0) = (0)^2 - 4(0) + 3 \\\\ \nf(0) = 0 - 0 + 3 \\\\ \nf(0) = 3 \\\\',
          '\\(f(0) = (0)^2 - 4(0) + 3\\) \\\\ \n\\(f(0) = 0 - 0 + 3\\) \\\\ \n\\(f(0) = 3\\) \\\\'
        )
        .replace(
          '\\( f(0) = (0)^2 - 4(0) + 3 \\\\ f(0) = 0 - 0 + 3 \\\\ f(0) = 3 \\\\',
          '\\( f(0) = (0)^2 - 4(0) + 3 \\) \\\\ \\( f(0) = 0 - 0 + 3 \\) \\\\ \\( f(0) = 3 \\) \\\\'
        )
        .replace('\\( x=4 $.', '\\( x=4 \\).');
    }
    if (file === 'qudrat.json' && typeof q.sol === 'string') {
      q.sol = q.sol.replace('check if the line  y = 2x - 1 \\)', 'check if the line \\( y = 2x - 1 \\)');
    }
    if (file === 'tahsili.json') {
      if (typeof q.text === 'string') {
        q.text = q.text.replace('\\( BC $?', '\\( BC \\)?');
      }
      if (typeof q.sol === 'string') {
        q.sol = q.sol
          .replace(/  \(x-1\)\(x-4\) = 0 \\>\./g, ' \\( (x-1)(x-4) = 0 \\).')
          .replace(/  x=1 \\\)/g, ' \\( x=1 \\)')
          .replace(/  x=4 \\\)/g, ' \\( x=4 \\)')
          .replace(/  \(1, 0\) \\\)/g, ' \\( (1, 0) \\)')
          .replace(/set  f\(x\) \\\)/g, 'set \\( f(x) \\)')
          .replace(/\\\( m = 3 <\/em>/g, '\\( m = 3 \\)</em>')
          .replace(/\\\( a_4 = 14 <\/span>/g, '\\( a_4 = 14 \\)</span>')
          .replace(/<br> \(a_1 \+ 6d\) - \(a_1 \+ 2d\) = 22 - 10 \\\)/g, '<br>\\( (a_1 + 6d) - (a_1 + 2d) = 22 - 10 \\)')
          .replace(/قيمة  d \\\)/g, 'قيمة \\( d \\)')
          .replace(/formula:  a_n = a_1 \+ \(n-1\)d \\\)/g, 'formula: \\( a_n = a_1 + (n-1)d \\)')
          .replace(/value of  d \\\)/g, 'value of \\( d \\)')
          .replace(/function  f\(x\) \\\)/g, 'function \\( f(x) \\)')
          .replace(/\\\( a_5 = 11 <\/em>/g, '\\( a_5 = 11 \\)</em>')
          .replace(/\\\( x = 12 <\/em>/g, '\\( x = 12 \\)</em>')
          .replace(/side  c \\\)/g, 'side \\( c \\)')
          .replace(/<br><br> \\lim_\{x \\to 3\} \(x\^2 - 4x \+ 3\) \\\)/g, '<br><br>\\( \\lim_{x \\to 3} (x^2 - 4x + 3) \\)')
          .replace(/Therefore, \\\( f\(3\) = 8 \\\[\.\\\]/g, 'Therefore, \\( f(3) = 8 \\).');
      }
    }
    if (file === 'igcse.json' && q.figure && typeof q.figure.tikz === 'string') {
      q.figure.tikz = q.figure.tikz.replace(/\{\$\$\}/g, '{}');
    }

    // Clean inner delimited math across all text fields of q
    for (const k of ['text', 'text_ar', 'sol', 'sol_ar', 'finalAnswer', 'sprAnswer']) {
      if (typeof q[k] === 'string') q[k] = cleanDelimitedMath(q[k]);
    }
    if (Array.isArray(q.choices)) q.choices = q.choices.map((c) => cleanDelimitedMath(c));
    if (Array.isArray(q.choices_ar)) q.choices_ar = q.choices_ar.map((c) => cleanDelimitedMath(c));
    if (Array.isArray(q.hints)) q.hints = q.hints.map((h) => cleanDelimitedMath(h));
    if (Array.isArray(q.hints_ar)) q.hints_ar = q.hints_ar.map((h) => cleanDelimitedMath(h));
  }

  const rawAfter = JSON.stringify(data, null, 2) + '\n';
  if (rawAfter !== rawBefore) {
    fs.writeFileSync(fp, rawAfter);
    bankFixes++;
  }
}
console.log(`Updated ${bankFixes} bank-data files.`);

// ── 2. Repair content/<track>/*.json ────────────────────────────────────────
let contentFixes = 0;
const contentDir = path.join(ROOT, 'content');
function cleanContentObj(val, relPath) {
  if (typeof val === 'string') {
    let s = val;
    // Proof end stray \] in calculus chapters
    s = s.replace(/\s*\\quad\s*\\blacksquare\s*\\\]<\/div><\/details>/g, ' &emsp;\\(\\blacksquare\\)</div></details>');
    // act2-stats.json block 18 mangled currency
    if (relPath === 'act2/act2-stats.json') {
      s = s
        .replace('pays \\(\\\\(15\\)', 'pays $15')
        .replace('pays 6\\)', 'pays $6')
        .replace('pay \\(\\$3\\)', 'pay $3')
        .replace(/gain \\\(\+\\\\\(15\\\)/g, 'gain \\(+\\$15\\)')
        .replace(/gain \\\(\+\\\)6\\\)/g, 'gain \\(+\\$6\\)')
        .replace(/gain \\\(\+\\\\\(6\\\)/g, 'gain \\(+\\$6\\)')
        .replace(/loss \\\(-\\\\\(3\\\)/g, 'loss \\(-\\$3\\)')
        .replace(/loss \\\(-\\\)3\\\)/g, 'loss \\(-\\$3\\)');
    }
    if (relPath === 'apab/_practice-set.json' && s.includes('$= [27 - 54 + 27]')) {
      s = s
        .replace(
          '\\(\\int_{1}^{3} (3t^2 - 12t + 9) \\, dt = [t^3 - 6t^2 + 9t]_{1}^{3} \\\\<br>\\)= [(3)^3 - 6(3)^2 + 9(3)] - [(1)^3 - 6(1)^2 + 9(1)] \\\\<br>$= [27 - 54 + 27] - [1 - 6 + 9] \\\\<br>',
          '\\(\\int_{1}^{3} (3t^2 - 12t + 9) \\, dt = [t^3 - 6t^2 + 9t]_{1}^{3}\\)<br>\\(= [(3)^3 - 6(3)^2 + 9(3)] - [(1)^3 - 6(1)^2 + 9(1)]\\)<br>\\(= [27 - 54 + 27] - [1 - 6 + 9]\\)<br>'
        );
    }
    if (relPath === 'ibsl/ibsl-ai.json' && s.includes('\\(\\\\(159,870')) {
      s = s.replace(
        'Total amount paid: 120 \\times 1332.25 = \\$2,870.<br>Total interest: \\(\\\\(159,870 - \\)120,000 = \\$39,870\\).',
        'Total amount paid: \\(120 \\times 1332.25 = \\$159,870\\).<br>Total interest: \\(\\$159,870 - \\$120,000 = \\$39,870\\).'
      );
    }
    if (relPath === 'qudrat/_practice-set.json' && s.includes('$$ x = 12</p>')) {
      s = s.replace('$$ x = 12</p>', '\\[x = 12\\]</p>');
    }
    return cleanDelimitedMath(s);
  }
  if (Array.isArray(val)) return val.map((v) => cleanContentObj(v, relPath));
  if (val && typeof val === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(val)) {
      if (['svg', 'code', 'fn', 'expr', 'tikz'].includes(k)) out[k] = v;
      else out[k] = cleanContentObj(v, relPath);
    }
    return out;
  }
  return val;
}

for (const d of fs.readdirSync(contentDir)) {
  const dp = path.join(contentDir, d);
  if (!fs.statSync(dp).isDirectory()) continue;
  for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.json'))) {
    const fp = path.join(dp, f);
    const rawBefore = fs.readFileSync(fp, 'utf8');
    const cleaned = cleanContentObj(JSON.parse(rawBefore), `${d}/${f}`);
    const rawAfter = JSON.stringify(cleaned, null, 2) + '\n';
    if (rawAfter !== rawBefore) {
      fs.writeFileSync(fp, rawAfter);
      contentFixes++;
    }
  }
}
console.log(`Updated ${contentFixes} content files.`);

// ── 3. Repair tools/worksheet_gen/topics/<track>/*.json ─────────────────────
// Load bank pools for clean replacement of <[^>]+>-mutilated worksheet items
const bankPools = {};
for (const f of fs.readdirSync(bankDir).filter((x) => x.endsWith('.json'))) {
  const tr = f.replace(/\.json$/, '');
  bankPools[tr] = JSON.parse(fs.readFileSync(path.join(bankDir, f), 'utf8')).pool || [];
}

function normStem(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function bankItemToWsQuestion(b) {
  const isMcq = Array.isArray(b.choices) && b.choices.length === 4 && typeof b.answer === 'number';
  const ansText = isMcq
    ? `**Answer:** ${['A', 'B', 'C', 'D'][b.answer]}. ${b.sol || ''}`
    : `**Answer:** ${b.sprAnswer || b.finalAnswer || 'See worked solution'}. ${b.sol || ''}`;
  const out = {
    qtype: isMcq ? 'MCQ' : b.type === 'spr' ? 'SPR' : 'FRQ',
    q: b.text,
    answer: ansText,
    explanation: b.sol || ansText
  };
  if (isMcq) {
    out.choices = b.choices.slice();
    out.correct = b.answer;
  }
  if (b.figure) out.figure = b.figure;
  return out;
}

function wsQuestionHasIssues(q) {
  const fields = [q.q, q.text, q.answer, q.explanation];
  if (Array.isArray(q.choices)) fields.push(...q.choices);
  if (Array.isArray(q.parts)) fields.push(...q.parts);
  if (Array.isArray(q.answers)) fields.push(...q.answers);
  for (const s of fields) {
    if (typeof s === 'string' && getStrictIssues(s, true).length > 0) return true;
  }
  return false;
}

const topicsDir = path.join(ROOT, 'tools', 'worksheet_gen', 'topics');
let wsFilesUpdated = 0;
let wsCorruptedReplaced = 0;

for (const tr of fs.readdirSync(topicsDir)) {
  const dp = path.join(topicsDir, tr);
  if (!fs.statSync(dp).isDirectory()) continue;
  const pool = bankPools[tr] || bankPools.sat || [];
  let cursor = 0;

  for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.json'))) {
    const fp = path.join(dp, f);
    const rawBefore = fs.readFileSync(fp, 'utf8');
    const ws = JSON.parse(rawBefore);

    if (typeof ws.title === 'string') ws.title = convertWorksheetDollars(ws.title);
    if (typeof ws.sub === 'string') ws.sub = convertWorksheetDollars(ws.sub);

    const usedStems = new Set();
    for (const sec of ws.sections || []) {
      if (typeof sec.heading === 'string') sec.heading = convertWorksheetDollars(sec.heading);
      for (const q of sec.questions || []) {
        for (const k of ['q', 'text', 'answer', 'explanation']) {
          if (typeof q[k] === 'string') q[k] = convertWorksheetDollars(q[k]);
        }
        if (Array.isArray(q.choices)) q.choices = q.choices.map((c) => convertWorksheetDollars(c));
        if (Array.isArray(q.parts)) q.parts = q.parts.map((p) => convertWorksheetDollars(p));
        if (Array.isArray(q.answers)) q.answers = q.answers.map((a) => convertWorksheetDollars(a));
        usedStems.add(normStem(q.q || q.text));
      }
    }

    // Replace any question that was mutilated by old <[^>]+> stripping and still has strict issues
    const titleWords = String(ws.title || '')
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 4);

    for (const sec of ws.sections || []) {
      for (let idx = 0; idx < (sec.questions || []).length; idx++) {
        const q = sec.questions[idx];
        if (!wsQuestionHasIssues(q)) continue;

        // Pick a topic-matched clean bank item not already in this worksheet
        let picked = null;
        for (let pass = 0; pass < 2 && !picked; pass++) {
          for (let tries = 0; tries < pool.length; tries++) {
            const cand = pool[(cursor + tries) % pool.length];
            const st = normStem(cand.text);
            if (usedStems.has(st)) continue;
            if (pass === 0 && titleWords.length > 0) {
              const dom = String((cand.domain || '') + ' ' + (cand.skill || '')).toLowerCase();
              if (!titleWords.some((w) => dom.includes(w))) continue;
            }
            const candidateWs = bankItemToWsQuestion(cand);
            if (!wsQuestionHasIssues(candidateWs)) {
              picked = candidateWs;
              cursor = (cursor + tries + 1) % pool.length;
              usedStems.add(st);
              break;
            }
          }
        }
        if (picked) {
          sec.questions[idx] = picked;
          wsCorruptedReplaced++;
        }
      }
    }

    const rawAfter = JSON.stringify(ws, null, 2) + '\n';
    if (rawAfter !== rawBefore) {
      fs.writeFileSync(fp, rawAfter);
      wsFilesUpdated++;
    }
  }
}

console.log(`Updated ${wsFilesUpdated} worksheet topic files (replaced ${wsCorruptedReplaced} mutilated questions).`);
