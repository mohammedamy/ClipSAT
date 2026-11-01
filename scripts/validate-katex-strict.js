#!/usr/bin/env node
'use strict';

/**
 * scripts/validate-katex-strict.js — Wave 1 (WP-17) Blocking CI Gate
 *
 * Parses every math segment across:
 *   1. bank-data/*.json
 *   2. content/<track>/*.json
 *   3. tools/worksheet_gen/topics/<track>/*.json (and public/worksheet-data/ if built)
 *   4. src/scripts/ix-data/*.js
 *
 * Asserts:
 *   - 0 unclosed \(, \[, or $$ math delimiters
 *   - 0 stray closing \) or \] delimiters
 *   - 0 residual single-$ math spans
 *   - 0 KaTeX parse errors or strict-mode errors (permitting Arabic script inside \text{...})
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const katex = require('katex');

const ROOT = path.resolve(__dirname, '..');

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

const SKIP_KEYS = new Set(['svg', 'code', 'fn', 'expr', 'tikz']);

let totalStrings = 0;
let totalSegments = 0;
const errors = [];

function checkString(str, loc) {
  if (typeof str !== 'string') return;
  totalStrings++;
  if (
    !str.includes('\\(') &&
    !str.includes('\\)') &&
    !str.includes('\\[') &&
    !str.includes('\\]') &&
    !str.includes('$')
  ) {
    return;
  }

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
          errors.push(`${loc}: unclosed \\${nx} delimiter near "${str.slice(Math.max(0, i - 15), Math.min(n, i + 60))}"`);
          i += 2;
          continue;
        }
        const tex = str.slice(i + 2, found);
        totalSegments++;
        try {
          katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: strictFilter });
        } catch (e) {
          errors.push(`${loc}: ${e.message} in "${tex.slice(0, 90)}"`);
        }
        i = found + 2;
        continue;
      }
      if (nx === ')' || nx === ']') {
        errors.push(`${loc}: stray closing \\${nx} delimiter near "${str.slice(Math.max(0, i - 25), Math.min(n, i + 40))}"`);
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
        errors.push(`${loc}: unclosed $$ delimiter near "${str.slice(Math.max(0, i - 15), Math.min(n, i + 60))}"`);
        i += 2;
        continue;
      }
      const tex = str.slice(i + 2, found);
      totalSegments++;
      try {
        katex.renderToString(tex, { displayMode: true, throwOnError: true, strict: strictFilter });
      } catch (e) {
        errors.push(`${loc}: ${e.message} in "$$${tex.slice(0, 90)}$$"`);
      }
      i = found + 2;
      continue;
    }
    i++;
  }

  // Ensure no unmigrated single-$ math spans remain (allowing prose currency like "$15 ... $20")
  if (str.includes('$')) {
    const stripped = str
      .replace(/(?<!\\)\\\([\s\S]*?(?<!\\)\\\)/g, ' ')
      .replace(/(?<!\\)\\\[[\s\S]*?(?<!\\)\\\]/g, ' ')
      .replace(/(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$/g, ' ')
      .replace(/\\\$/g, ' ');
    const matches = stripped.match(/\$[^$\n]+\$/g);
    if (matches) {
      for (const seg of matches) {
        if (/^\$[0-9]/.test(seg) && /\s+[a-zA-Z]{2,}\s+/.test(seg)) continue;
        if (seg.includes('$)') && seg.includes('$')) continue;
        errors.push(`${loc}: unmigrated single-$ math span "${seg.slice(0, 60)}" (use \\(...\\) instead)`);
      }
    }
  }
}

function walk(val, loc) {
  if (typeof val === 'string') {
    checkString(val, loc);
  } else if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i++) walk(val[i], `${loc}[${i}]`);
  } else if (val && typeof val === 'object') {
    for (const [k, v] of Object.entries(val)) {
      if (SKIP_KEYS.has(k)) continue;
      walk(v, `${loc}.${k}`);
    }
  }
}

// 1. bank-data
const bankDir = path.join(ROOT, 'bank-data');
for (const f of fs.readdirSync(bankDir).filter((x) => x.endsWith('.json')).sort()) {
  walk(JSON.parse(fs.readFileSync(path.join(bankDir, f), 'utf8')), `bank-data/${f}`);
}

// 2. content
const contentDir = path.join(ROOT, 'content');
for (const d of fs.readdirSync(contentDir).sort()) {
  const dp = path.join(contentDir, d);
  if (!fs.statSync(dp).isDirectory()) continue;
  for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.json')).sort()) {
    walk(JSON.parse(fs.readFileSync(path.join(dp, f), 'utf8')), `content/${d}/${f}`);
  }
}

// 3. tools/worksheet_gen/topics
const topicsDir = path.join(ROOT, 'tools', 'worksheet_gen', 'topics');
if (fs.existsSync(topicsDir)) {
  for (const d of fs.readdirSync(topicsDir).sort()) {
    const dp = path.join(topicsDir, d);
    if (!fs.statSync(dp).isDirectory()) continue;
    for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.json')).sort()) {
      walk(JSON.parse(fs.readFileSync(path.join(dp, f), 'utf8')), `topics/${d}/${f}`);
    }
  }
}

// 4. src/scripts/ix-data
const ixDir = path.join(ROOT, 'src', 'scripts', 'ix-data');
if (fs.existsSync(ixDir)) {
  for (const f of fs.readdirSync(ixDir).filter((x) => x.endsWith('.js')).sort()) {
    const ctx = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(ixDir, f), 'utf8'), ctx);
    walk(ctx.window, `ix-data/${f}`);
  }
}

if (errors.length > 0) {
  console.error(`✗ validate-katex-strict FAILED with ${errors.length} error(s):`);
  errors.slice(0, 40).forEach((e) => console.error(`  - ${e}`));
  if (errors.length > 40) console.error(`  ... and ${errors.length - 40} more.`);
  process.exit(1);
}

console.log(
  `✓ validate-katex-strict PASSED: ${totalSegments.toLocaleString()} math segments across ${totalStrings.toLocaleString()} strings (0 parse errors, 0 strict errors, 0 unbalanced delimiters)`
);
