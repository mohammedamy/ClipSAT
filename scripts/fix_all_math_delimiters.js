#!/usr/bin/env node
/**
 * scripts/fix_all_math_delimiters.js
 * Scans all content JSONs and bank-data JSONs to:
 * 1. Repair legacy "USD 6$" / "USD 8\(cm" corruptions in _practice-set.json
 * 2. Repair unwrapped English prose inside \(...\) (e.g. "local minimum at",
 *    "Divide equation (2) by equation (1):", "{, so the statement is }false",
 *    and HTML tags inside \(...\))
 * 3. Convert all genuine inline math $...$ and display math $$...$$ into
 *    canonical \(...\) and \[...\] while preserving literal currency dollar
 *    signs ($2,400, $12, $8, etc.) so two currency amounts in a paragraph
 *    are NEVER paired as LaTeX math mode.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function walk(dir, exts) {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p, exts));
    else if (exts.some(e => p.endsWith(e))) out.push(p);
  }
  return out;
}

function isGenuineInlineMath(inner) {
  if (!inner || !inner.trim()) return false;
  const trimmed = inner.trim();
  if (trimmed.length > 200) return false;

  // If it starts with a currency number followed by punctuation/closing paren/space + prose words:
  // e.g. "2,400. If adult tickets cost ", "11.50, while 2 pretzels and 4 sodas cost ", "50) and the slope"
  if (/^\d[\d,]*(?:\.\d+)?(?:\s*[,.;:!?)%]|\s+[a-zA-Z\u0600-\u06FF]{2,})/.test(trimmed)) {
    return false;
  }

  // Strip valid LaTeX commands like \text{...}, \frac, \sqrt, etc.
  const withoutLatex = trimmed
    .replace(/\\(?:text|textbf|textit|mathrm|mathbf|operatorname|mbox)\s*\{[^}]*\}/g, '')
    .replace(/\\[a-zA-Z]+/g, '');

  // If remaining text has 2 or more space-separated English prose words (3+ letters), it is prose between currency signs
  const proseMatches = withoutLatex.match(/[a-zA-Z]{3,}(?:\s+[a-zA-Z]{2,})+/g) || [];
  const allowedWords = new Set(['and', 'or', 'for', 'if', 'where', 'mod', 'sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'log', 'exp', 'lim', 'max', 'min', 'det', 'gcd', 'lcm']);
  for (const seq of proseMatches) {
    const words = seq.trim().split(/\s+/).filter(w => !allowedWords.has(w.toLowerCase()));
    if (words.length >= 2) return false;
  }
  if (/[\u0600-\u06FF]{2,}\s+[\u0600-\u06FF]{2,}/.test(withoutLatex)) {
    return false;
  }
  return true;
}

function fixSpecificCorruptions(str) {
  if (typeof str !== 'string') return str;
  let s = str;

  // 1. Repair legacy "USD <num>$" where $...$ around a pure number was corrupted into "USD <num>$"
  s = s.replace(/A cuboid has a length of USD 8\\\(cm, a width of USD 5\\\) cm, and a height of USD 3\$ cm\./g,
    'A cuboid has a length of \\(8\\) cm, a width of \\(5\\) cm, and a height of \\(3\\) cm.');
  s = s.replace(/Given: length = USD 8\$ cm, width = USD 5\$ cm, height = USD 3\$ cm\./g,
    'Given: length = \\(8\\) cm, width = \\(5\\) cm, height = \\(3\\) cm.');
  s = s.replace(/USD (\d+(?:\.\d+)?)\$/g, '\\($1\\)');
  // Also repair \(USD 80\) inside math mode -> \(\$80\) and \mathbf{USD 64} -> \mathbf{\$64}
  s = s.replace(/\\mathbf\{USD\s+(\d[\d,.]*)\}/g, '\\mathbf{\\$$1}');
  s = s.replace(/\\frac\{USD\s+(\d[\d,.]*)\}/g, '\\frac{\\$$1}');
  s = s.replace(/USD\s+(\d[\d,.]*)(?=[+\-*/=\\\s)\]}])/g, function(m, num, offset, full) {
    // Check if we're inside \( ... \) or \[ ... \]
    return '$' + num;
  });

  // 2. Repair unwrapped prose inside \( ... \) across bank-data and content
  // a) apab.json: \(local minimum at x=-\frac{2}{3}, local maximum at x=\frac{2}{3}\)
  s = s.replace(/\\\(\s*local (minimum|maximum) at (x=[^,]+),\s*local (minimum|maximum) at (x=[^)\\]+)\\\)/gi,
    'Local $1 at \\($2\\), local $3 at \\($4\\)');

  // b) appc.json & appc-u2.json: \( 54 = a \cdot b^3 \\ Divide equation (2) by equation (1): \\ \frac{54}{6} = ... \)
  s = s.replace(/\\\\\s*Divide equation \(2\) by equation \(1\):\s*\\\\/g,
    '\\) Divide equation (2) by equation (1): \\(');

  // c) appc.json & est2.json & est2-about.json: \\ Therefore, the value of A \) or \\ Therefore, the value of g(4) \)
  s = s.replace(/\\\\\s*Therefore,\s*the value of\s+([A-Za-z0-9()]+)\s*\\\)/g,
    '\\) Therefore, the value of \\($1\\)');

  // d) calculus.json .pool[18]: For convergence, we require this limit to be less than 1: inside \( ... \)
  s = s.replace(/(\\cdot 1)\s+For convergence, we require this limit to be less than 1:\s+(\\left\|)/g,
    '$1\\)\n\nFor convergence, we require this limit to be less than 1:\n\n\\($2');

  // e) ibhl.json: \( P(-3)=-3{, so the statement is }false. \)
  s = s.replace(/\\\(\s*(P\([^)]+\)\s*=\s*[-+]?\d+)\s*\{,\s*so the statement is\s*\}\s*false\.?\s*\\\)/g,
    '\\($1\\), so the statement is false.');

  // f) ibsl.json .medium[33]: prose lines wrapped inside \( ... \)
  s = s.replace(/\\\(\s*We are given that the graph passes through the point\s*(\([^)]+\))\s*\\\)/g,
    'We are given that the graph passes through the point \\($1\\)');
  s = s.replace(/\\\(\s*Substitute these values into the function equation:\s*([\s\S]*?)\s*To solve for k\s*\\\)/g,
    'Substitute these values into the function equation: \\($1\\). To solve for \\(k\\)');
  s = s.replace(/\\\(\s*(-2 \+ 6 = k\s+4 = k)\s+Therefore, the value of k\s*\\\)/g,
    '\\(-2 + 6 = k \\implies k = 4\\). Therefore, the value of \\(k\\)');

  // g) qudrat.json: \(90^\circ<br><span class="en-trans">90°</span>\)
  s = s.replace(/\\\(\s*([0-9.]+\^\\circ)\s*<br>\s*<span class="en-trans">([^<]+)<\/span>\s*\\\)/g,
    '\\($1\\)<br><span class="en-trans">$2</span>');

  return s;
}

function normalizeMathDelimiters(rawStr) {
  if (typeof rawStr !== 'string') return rawStr;
  let str = fixSpecificCorruptions(rawStr);
  if (!str.includes('$')) return str;

  // 1. Convert $$ ... $$ to \[ ... \]
  let s = str.replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]');

  // 2. Walk through string respecting existing \( ... \) and \[ ... \]
  let out = '';
  let i = 0;
  const L = s.length;
  while (i < L) {
    if (s.slice(i, i + 2) === '\\(') {
      const end = s.indexOf('\\)', i + 2);
      if (end !== -1) {
        // Inside math mode: ensure any unescaped $ is escaped as \$
        const innerMath = s.slice(i + 2, end).replace(/(?<!\\)\$/g, '\\$');
        out += '\\(' + innerMath + '\\)';
        i = end + 2;
        continue;
      }
    }
    if (s.slice(i, i + 2) === '\\[') {
      const end = s.indexOf('\\]', i + 2);
      if (end !== -1) {
        const innerMath = s.slice(i + 2, end).replace(/(?<!\\)\$/g, '\\$');
        out += '\\[' + innerMath + '\\]';
        i = end + 2;
        continue;
      }
    }
    // Outside math mode: if we see \$, convert to literal $ so no raw backslash appears in HTML
    if (s.slice(i, i + 2) === '\\$') {
      out += '$';
      i += 2;
      continue;
    }
    // If we see an unescaped $ outside math mode
    if (s[i] === '$') {
      let nextDollar = -1;
      for (let j = i + 1; j < L; j++) {
        if (s[j] === '\n') break;
        if (s.slice(j, j + 2) === '\\(' || s.slice(j, j + 2) === '\\[') break;
        if (s[j] === '\\' && j + 1 < L) { j++; continue; }
        if (s[j] === '$') { nextDollar = j; break; }
      }
      if (nextDollar !== -1) {
        const inner = s.slice(i + 1, nextDollar);
        if (isGenuineInlineMath(inner)) {
          out += '\\(' + inner + '\\)';
          i = nextDollar + 1;
          continue;
        }
      }
      // Literal currency $ outside math mode
      out += '$';
      i++;
      continue;
    }
    out += s[i];
    i++;
  }
  return out;
}

function processJsonFiles(dirPath, label) {
  const files = walk(dirPath, ['.json']);
  let modifiedFiles = 0;
  let modifiedStrings = 0;

  for (const f of files) {
    const raw = fs.readFileSync(f, 'utf8');
    const obj = JSON.parse(raw);
    let fileChanged = false;

    function visit(node) {
      if (Array.isArray(node)) {
        for (let i = 0; i < node.length; i++) {
          if (typeof node[i] === 'string') {
            const fixed = normalizeMathDelimiters(node[i]);
            if (fixed !== node[i]) {
              node[i] = fixed;
              fileChanged = true;
              modifiedStrings++;
            }
          } else if (node[i] && typeof node[i] === 'object') {
            visit(node[i]);
          }
        }
      } else if (node && typeof node === 'object') {
        for (const k of Object.keys(node)) {
          if (typeof node[k] === 'string') {
            const fixed = normalizeMathDelimiters(node[k]);
            if (fixed !== node[k]) {
              node[k] = fixed;
              fileChanged = true;
              modifiedStrings++;
            }
          } else if (node[k] && typeof node[k] === 'object') {
            visit(node[k]);
          }
        }
      }
    }

    visit(obj);
    if (fileChanged) {
      fs.writeFileSync(f, JSON.stringify(obj, null, 2) + '\n', 'utf8');
      modifiedFiles++;
    }
  }
  console.log(`[${label}] Updated ${modifiedStrings} strings across ${modifiedFiles} files.`);
}

processJsonFiles(path.join(ROOT, 'content'), 'content');
processJsonFiles(path.join(ROOT, 'bank-data'), 'bank-data');
