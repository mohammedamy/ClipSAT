#!/usr/bin/env node
/* Question-bank validator (Plan 10, Phase 10.1).

   bank-data/*.json is fetched by the browser at runtime and never passed
   through a build step, so nothing used to check it: a broken answer index,
   a duplicate choice or a KaTeX typo shipped straight to students. This runs
   in CI (npm run validate-banks) over every item in every bank.

   ERRORS (fail the build): the item cannot be answered or rendered correctly.
     - mcq without 2+ choices, answer index out of range, missing stem
     - two identical choices (after whitespace/LaTeX-delimiter normalisation)
     - exact duplicate items (identical stem and choices across the bank)
     - math that KaTeX cannot parse (it renders as red error text on the page)
   WARNINGS (printed, counted, never fail): quality signals for Plan 10.2.
     - missing or very short solutions

   Usage: node scripts/validate-banks.js [--verbose] [track ...] */
'use strict';
const fs = require('fs');
const path = require('path');
const katex = require('katex');

const ROOT = path.join(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'bank-data');
const args = process.argv.slice(2);
const verbose = args.includes('--verbose');
const only = args.filter((a) => !a.startsWith('--'));

/* Same macros the site's KaTeX setup relies on; extend if a bank needs more. */
const KATEX_OPTS = { throwOnError: true, strict: 'ignore', trust: false, macros: { '\\R': '\\mathbb{R}', '\\N': '\\mathbb{N}', '\\Z': '\\mathbb{Z}', '\\Q': '\\mathbb{Q}', '\\C': '\\mathbb{C}' } };

/* Pull every \( \), \[ \], $$ $$ segment out of a string. */
function mathSegments(s) {
  const out = [];
  const re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]|\$\$([\s\S]*?)\$\$/g;
  let m;
  while ((m = re.exec(s))) out.push({ tex: decode(m[1] ?? m[2] ?? m[3]), display: m[1] === undefined });
  return out;
}
/* Bank strings are inserted with innerHTML, so the browser decodes entities before KaTeX runs. */
function decode(s) { return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'); }
const katexCache = new Map();
function katexError(tex, display) {
  const key = (display ? 'D' : 'I') + tex;
  if (katexCache.has(key)) return katexCache.get(key);
  let err = null;
  const warn = console.warn; console.warn = () => {}; /* "No character metrics" for Arabic in \text{} is not an error */
  try { katex.renderToString(tex, { ...KATEX_OPTS, displayMode: display }); } catch (e) { err = String(e.message || e).replace(/^KaTeX parse error: /, '').slice(0, 120); }
  finally { console.warn = warn; }
  katexCache.set(key, err);
  return err;
}

const norm = (s) => String(s == null ? '' : s).replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();

/* Banks come in two shapes: {pool:[...]} and IB's {easy,medium,hard} with q/fig. */
function itemsOf(bank) {
  if (Array.isArray(bank.pool)) return bank.pool.map((q, i) => ({ q, where: `pool[${i}]` }));
  const out = [];
  for (const lvl of ['easy', 'medium', 'hard']) (bank[lvl] || []).forEach((q, i) => out.push({ q, where: `${lvl}[${i}]` }));
  return out;
}

function checkItem(q, push) {
  const stem = q.text ?? q.q;
  const isFrq = (q.type === 'frq' || q.type === 'spr');
  if (!stem || !String(stem).trim()) push('error', 'missing stem');
  if (!isFrq) {
    const ch = q.choices;
    if (!Array.isArray(ch) || ch.length < 2) push('error', `mcq has ${Array.isArray(ch) ? ch.length : 0} choices`);
    else {
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= ch.length) push('error', `answer index ${JSON.stringify(q.answer)} out of range 0..${ch.length - 1}`);
      const seen = new Map();
      ch.forEach((c, i) => {
        if (c == null || !String(c).trim()) push('error', `choice ${i} is empty`);
        const k = norm(c);
        if (seen.has(k)) push('error', `choices ${seen.get(k)} and ${i} are identical: ${k.slice(0, 40)}`);
        else seen.set(k, i);
      });
    }
  } else if (q.type === 'spr') {
    const sprAns = q.sprAnswer ?? q.ans ?? (Array.isArray(q.choices) && q.answer != null ? q.choices[q.answer] : null);
    if (sprAns == null || !String(sprAns).trim()) push('error', 'spr question missing sprAnswer or ans');
  }
  const sol = q.sol ?? q.solution ?? q.explanation;
  if (!sol || !String(sol).trim()) push('warn', 'no solution');
  else if (norm(sol).length < 25) push('warn', 'solution under 25 characters');
  const texts = [stem, sol, ...(Array.isArray(q.choices) ? q.choices : [])];
  for (const t of texts) {
    if (typeof t !== 'string') continue;
    for (const seg of mathSegments(t)) {
      const e = katexError(seg.tex, seg.display);
      if (e) push('error', `KaTeX: ${e} in ${seg.tex.slice(0, 50)}`);
    }
  }
  const fig = q.figure || q.fig;
  if (fig) {
    const rawAns = q.sprAnswer ?? (Array.isArray(q.choices) && q.answer != null ? q.choices[q.answer] : q.ans);
    const cleanAns = rawAns != null ? String(rawAns).replace(/[^0-9a-zA-Z]/g, '').trim() : '';

    if (cleanAns.length > 0 && !stem.includes(cleanAns)) {
      // Triangle/polygon sides leak
      const sides = fig.sides || (fig.shapes && fig.shapes[0] && fig.shapes[0].sides) || [];
      if (Array.isArray(sides) && sides.some(s => String(s).replace(/[^0-9a-zA-Z]/g, '').trim() === cleanAns)) {
        push('error', `figure leaks the answer "${cleanAns}" on its sides`);
      }
      // Triangle angles leak
      if (fig.type === 'triangle' && Array.isArray(fig.angles) && fig.angles.some(a => String(a).replace(/[^0-9]/g, '').trim() === cleanAns)) {
        push('error', `figure leaks the answer "${cleanAns}" on its angles`);
      }
      // Circle center or radius/diameter leak
      if (fig.type === 'circle') {
        if (/center|المركز/i.test(stem) && fig.center && String(fig.center).includes(cleanAns)) {
          push('error', `circle figure leaks center answer "${cleanAns}"`);
        }
        if (/radius|نصف القطر/i.test(stem) && fig.radius && String(fig.radius).includes(cleanAns)) {
          push('error', `circle figure leaks radius answer "${cleanAns}"`);
        }
        if (/diameter|القطر/i.test(stem) && fig.diameter && String(fig.diameter).includes(cleanAns)) {
          push('error', `circle figure leaks diameter answer "${cleanAns}"`);
        }
      }
      // Bar chart value leak on calculation/count question
      if ((fig.type === 'bar' || fig.type === 'barchart') && Array.isArray(fig.data || fig.bars)) {
        const bData = fig.data || fig.bars;
        if (bData.some(b => String(b.val).trim() === cleanAns)) {
          if (/كم عدد|كم يبلغ|فما هو|احسب|find|how many|what is the number|calculate/i.test(stem) && !/shown in the bar chart|according to the bar chart|من الرسم البياني|من الشكل/i.test(stem)) {
            push('error', `bar chart leaks answer "${cleanAns}" on question asking to find quantity`);
          }
        }
      }
    }
    // Line slope or equation leaks in function labels
    if (fig.type === 'fn' && Array.isArray(fig.fns)) {
      if (/slope|equation of (?:the )?line|ميل المستقيم|معادلة المستقيم/i.test(stem)) {
        if (fig.fns.some(fn => fn.label && /y\s*=\s*-?\d/.test(fn.label))) {
          push('error', 'line figure leaks slope/equation in its curve label');
        }
      }
    }
    // Solved roots on pure solve questions
    if (fig.type === 'fn' && Array.isArray(fig.points)) {
      if (/solve|root|roots|zeros?|solutions?|أصفار|حل المعادلة|جذور/i.test(stem) && !/graph|shown|figure|تمثيل/i.test(stem)) {
        if (fig.points.some(p => (p.label && /x\s*=\s*-?\d+/.test(p.label)) || (p.y === 0 && cleanAns && String(p.x) === cleanAns))) {
          push('error', 'figure leaks quadratic roots on pure solve question');
        }
      }
    }
    // Pure solve inequality numberline
    if (fig.type === 'numberline' && /solve|solutions?|for what values|حل المتباينة|مجموعة حل/i.test(stem) && !/number line|graph|shown|figure|خط الأعداد|ممثلة/i.test(stem)) {
      push('error', 'numberline figure solves inequality on pure solve question');
    }
    // 3D geometry on non-3D question
    if (fig.type === 'geometry_3d') {
      if (/box\s*plot|boxplot|Q_1|IQR|الربيع|probability|احتمال|drawn|pens?|balls?|tiles?|صندوق.*كرة|cost|price|\$|sells?|bought|شراء|سعر|علب عصير/i.test(stem)) {
        push('error', 'geometry_3d figure attached to non-3D question');
      }
    }
    // Trig evaluation with non-trig graph
    if (fig.type === 'fn' || fig.type === 'function_graph') {
      const isPureTrig = /\\(?:cos|sin|tan|sec|csc|cot)\s*\(\s*-?\d+/i.test(stem) && !/(graph|curve|period|amplitude)/i.test(stem);
      if (isPureTrig) {
        push('error', 'figure is a function graph on a pure trig evaluation question');
      }
    }
    // Matrix structure table leaking dimension in caption
    if (fig.type === 'table' && fig.caption && fig.caption.includes('Matrix Structure')) {
      push('error', 'matrix structure table leaks dimensions in caption');
    }
  }
}

function main() {
  const files = fs.readdirSync(BANK_DIR).filter((f) => f.endsWith('.json')).sort()
    .filter((f) => !only.length || only.includes(f.replace(/\.json$/, '')));
  let errors = 0, warns = 0, items = 0;
  const warnKinds = {};
  for (const f of files) {
    const bank = JSON.parse(fs.readFileSync(path.join(BANK_DIR, f), 'utf8'));
    const list = itemsOf(bank);
    const dup = new Map();
    let fe = 0;
    for (const { q, where } of list) {
      items++;
      const push = (lvl, msg) => {
        if (lvl === 'error') { errors++; fe++; if (fe <= 15 || verbose) console.log(`  ✗ ${f} ${where}: ${msg}`); }
        else { warns++; warnKinds[msg.replace(/\d+/g, 'N')] = (warnKinds[msg.replace(/\d+/g, 'N')] || 0) + 1; if (verbose) console.log(`  ⚠ ${f} ${where}: ${msg}`); }
      };
      checkItem(q, push);
      const key = norm(q.text ?? q.q) + '||' + (q.choices || []).map(norm).join('|');
      if (dup.has(key)) push('error', `exact duplicate of ${dup.get(key)}`); else dup.set(key, where);
    }
    if (fe > 15 && !verbose) console.log(`  … ${fe - 15} more errors in ${f} (use --verbose)`);
  }
  console.log(`\nChecked ${items} items in ${files.length} bank(s): ${errors} error(s), ${warns} warning(s).`);
  for (const [k, n] of Object.entries(warnKinds).sort((a, b) => b[1] - a[1]).slice(0, 6)) console.log(`  warn × ${n}: ${k}`);
  if (errors) { console.log('\n❌ Bank validation failed.'); process.exit(1); }
  console.log('✅ Bank validation passed.');
}
main();
