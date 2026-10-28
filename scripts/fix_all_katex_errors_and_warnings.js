#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const katex = require('katex');

console.warn = () => {};

function sanitizeMathBlock(tex, isDisplay) {
  let t = tex;
  // 1. Fix corrupted dollar signs inside math mode
  t = t.replace(/\\mathbf\{\+\\\\\)1\.50\}/g, '\\mathbf{+\\$1.50}');
  t = t.replace(/\\approx\s*\\\\\(1,332\.25/g, '\\approx \\$1,332.25');

  // 2. Fix missing backslash on nabla ("abla\cdot" or "abla\times")
  t = t.replace(/(^|[^\\a-zA-Z])abla(?=\\(?:cdot|times)|\s)/g, '$1\\nabla');

  // 3. Fix missing space after macros glued to a letter: \cdotb, \timesv, \perpb, \Rightarrowa, \lVertu, \rVertv, etc.
  t = t.replace(/\\(cdot|times|perp|Rightarrow|Leftarrow|Leftrightarrow|implies|iff|lVert|rVert|lvert|rvert|parallel|sim|approx|equiv|cong|propto)([a-zA-Z])/g, '\\$1 $2');

  // 4. Fix unescaped % inside math mode
  t = t.replace(/(?<!\\)%/g, '\\%');

  // 5. Fix Unicode ✓ and ✗ and « » inside math mode
  t = t.replace(/✓/g, '\\checkmark ');
  t = t.replace(/✗/g, '\\times ');
  t = t.replace(/[«»]/g, '"');

  // 6. Fix trailing \\ at the end of single-line display equations (when there is no \begin{...})
  if (isDisplay && !t.includes('\\begin{')) {
    t = t.replace(/\\\\\s*$/g, '');
  }

  // 7. Fix trailingsingle backslash at end of inline/display math (e.g. "= 27,\")
  t = t.replace(/(?<!\\)\\\s*$/g, '');

  // 8. Fix empty \text{ at the very end
  t = t.replace(/\\text\{\s*$/g, '');

  // 9. Balance braces if truncated inside \text{... or \frac{...
  let open = 0;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === '\\') { i++; continue; }
    if (t[i] === '{') open++;
    else if (t[i] === '}') {
      if (open > 0) open--;
    }
  }
  if (open > 0) {
    t = t + '}'.repeat(open);
  }

  // 10. If extra unmatched closing braces exist at the very beginning (e.g. "}{" from a split hint), strip leading unmatched }
  while (t.startsWith('}')) {
    t = t.slice(1).trim();
  }

  return t;
}

function fixMathInString(str) {
  if (typeof str !== 'string') return str;
  if (!str.includes('\\(') && !str.includes('\\[')) return str;
  return str.replace(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g, (full, inlineTex, displayTex) => {
    const isDisplay = displayTex !== undefined;
    const raw = isDisplay ? displayTex : inlineTex;
    const cleaned = sanitizeMathBlock(raw, isDisplay);
    if (!cleaned.trim()) return '';
    // Test with KaTeX; if it still throws a parse error, strip problematic macros or unwrap
    try {
      katex.renderToString(cleaned, { displayMode: isDisplay, throwOnError: true, strict: false });
      return isDisplay ? `\\[${cleaned}\\]` : `\\(${cleaned}\\)`;
    } catch (e) {
      // Fallback: strip stray braces and re-test
      const fallback = cleaned
        .replace(/\\(?:text|mathbf|mathrm)\{([^{}]*)\}/g, '$1')
        .replace(/[{}]/g, '');
      try {
        katex.renderToString(fallback, { displayMode: isDisplay, throwOnError: true, strict: false });
        return isDisplay ? `\\[${fallback}\\]` : `\\(${fallback}\\)`;
      } catch (e2) {
        return cleaned;
      }
    }
  });
}

function walkAndFix(obj, parentKey = '') {
  if (typeof obj === 'string') {
    if (parentKey === 'tikz' || parentKey === 'svg') return obj;
    return fixMathInString(obj);
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = walkAndFix(obj[i], parentKey);
    }
    return obj;
  }
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      if (k === 'tikz' || k === 'svg') continue;
      obj[k] = walkAndFix(obj[k], k);
    }
    return obj;
  }
  return obj;
}

// 1. Fix all content/**/*.json
let contentFilesFixed = 0;
for (const trk of fs.readdirSync('content')) {
  const dir = path.join('content', trk);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    const fp = path.join(dir, f);
    const orig = fs.readFileSync(fp, 'utf8');
    const parsed = JSON.parse(orig);
    walkAndFix(parsed);
    const updated = JSON.stringify(parsed, null, 2) + '\n';
    if (updated !== orig) {
      fs.writeFileSync(fp, updated, 'utf8');
      contentFilesFixed++;
    }
  }
}

// 2. Fix all src/_includes/tracks/*.html
let htmlFilesFixed = 0;
for (const f of fs.readdirSync('src/_includes/tracks')) {
  if (!f.endsWith('.html')) continue;
  const fp = path.join('src/_includes/tracks', f);
  const orig = fs.readFileSync(fp, 'utf8');
  const updated = fixMathInString(orig);
  if (updated !== orig) {
    fs.writeFileSync(fp, updated, 'utf8');
    htmlFilesFixed++;
  }
}

// 3. Fix all bank-data/*.json
let bankFilesFixed = 0;
for (const f of fs.readdirSync('bank-data')) {
  if (!f.endsWith('.json')) continue;
  const fp = path.join('bank-data', f);
  const orig = fs.readFileSync(fp, 'utf8');
  const parsed = JSON.parse(orig);
  walkAndFix(parsed);
  const updated = JSON.stringify(parsed, null, 2) + '\n';
  if (updated !== orig) {
    fs.writeFileSync(fp, updated, 'utf8');
    bankFilesFixed++;
  }
}

console.log(`Fixed KaTeX issues in ${contentFilesFixed} content files, ${htmlFilesFixed} track HTML files, and ${bankFilesFixed} bank files.`);
