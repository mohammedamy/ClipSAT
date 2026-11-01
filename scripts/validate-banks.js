#!/usr/bin/env node
/**
 * scripts/validate-banks.js
 * Canonical Question Schema v2 Validator (Wave 1 — WP-14, WP-15, WP-16, WP-18)
 *
 * Enforces:
 *   1. AJV JSON Schema v2 validation on every bank ({ schemaVersion: 2, track, pool })
 *      and every item (type in mcq|spr|frq, text, sol, difficulty, domain, 0 shadow fields).
 *   2. Globally unique item IDs across all 31 banks and 0 intra-bank duplicate stems.
 *   3. 4-choice standard on MCQs (answer in 0..3, 4 distinct non-empty choices),
 *      sprAnswer on SPR items.
 *   4. KaTeX parseability on stem, choices, sol, and hints.
 *   5. Non-leaking, valid figure checks on every item with q.figure.
 *   6. Answer-key uniformity (Pearson chi^2 < 4.0 across 4-choice MCQs per bank)
 *      and < 5% cross-bank stem overlap between any pair of distinct tracks.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const katex = require('katex');

const ROOT = path.join(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'bank-data');
const args = process.argv.slice(2);
const verbose = args.includes('--verbose');
const only = args.filter((a) => !a.startsWith('--'));

const SHADOW_FIELDS = ['correct', 'ans', 'q', 'fig', 'solution', 'exp', 'expl', 'explanation', 'diff', 'ch', 'topic', 'letters'];

const BANK_SCHEMA_V2 = {
  type: 'object',
  required: ['schemaVersion', 'track', 'pool'],
  additionalProperties: false,
  properties: {
    schemaVersion: { const: 2 },
    track: { type: 'string', minLength: 2 },
    pool: {
      type: 'array',
      minItems: 1200,
      items: {
        type: 'object',
        required: ['id', 'type', 'domain', 'difficulty', 'text', 'sol'],
        additionalProperties: false,
        properties: {
          id: { type: 'string', minLength: 3 },
          type: { enum: ['mcq', 'spr', 'frq'] },
          domain: { type: 'string', minLength: 1 },
          difficulty: { enum: ['easy', 'medium', 'hard'] },
          text: { type: 'string', minLength: 3 },
          sol: { type: 'string', minLength: 1 },
          topic_id: { type: 'string' },
          subskill_id: { type: 'string' },
          educational_aim: { type: 'string' },
          exam_archetype: { type: 'string' },
          choices: { type: 'array', items: { type: 'string', minLength: 1 }, minItems: 2, maxItems: 4 },
          answer: { type: 'integer', minimum: 0, maximum: 3 },
          sprAnswer: { type: 'string', minLength: 1 },
          finalAnswer: { type: 'string', minLength: 1 },
          hints: { type: 'array', items: { type: 'string' } },
          figure: { type: 'object' },
          marks: { type: 'number' },
          paper: { type: 'string' },
          course: { type: 'string' },
          ibSection: { type: 'string' },
          calc: { type: 'boolean' },
          calculator: { type: 'boolean' },
          sympy_verified: { type: 'boolean' },
          fixedChoices: { type: 'boolean' }
        }
      }
    }
  }
};

const ajv = new Ajv({ allErrors: false });
const validateBankSchema = ajv.compile(BANK_SCHEMA_V2);

const KATEX_OPTS = {
  throwOnError: true,
  strict: 'ignore',
  trust: false,
  macros: { '\\R': '\\mathbb{R}', '\\N': '\\mathbb{N}', '\\Z': '\\mathbb{Z}', '\\Q': '\\mathbb{Q}', '\\C': '\\mathbb{C}' }
};

function mathSegments(s) {
  const out = [];
  const re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]|\$\$([\s\S]*?)\$\$/g;
  let m;
  while ((m = re.exec(s))) out.push({ tex: decode(m[1] ?? m[2] ?? m[3]), display: m[1] === undefined });
  return out;
}
function decode(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
}
const katexCache = new Map();
function katexError(tex, display) {
  const key = (display ? 'D' : 'I') + tex;
  if (katexCache.has(key)) return katexCache.get(key);
  let err = null;
  const warn = console.warn;
  console.warn = () => {};
  try {
    katex.renderToString(tex, { ...KATEX_OPTS, displayMode: display });
  } catch (e) {
    err = String(e.message || e).replace(/^KaTeX parse error: /, '').slice(0, 120);
  } finally {
    console.warn = warn;
  }
  katexCache.set(key, err);
  return err;
}

const norm = (s) => String(s == null ? '' : s).replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();

function checkItem(q, push) {
  for (const sf of SHADOW_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(q, sf)) {
      push('error', `legacy shadow field "${sf}" present`);
    }
  }
  const stem = q.text;
  const isFrq = q.type === 'frq' || q.type === 'spr';
  if (!stem || !String(stem).trim()) push('error', 'missing stem');
  if (!isFrq) {
    const ch = q.choices;
    if (!Array.isArray(ch) || ch.length !== 4) {
      push('error', `mcq must have 4 choices, got ${Array.isArray(ch) ? ch.length : 0}`);
    } else {
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= ch.length) {
        push('error', `answer index ${JSON.stringify(q.answer)} out of range 0..${ch.length - 1}`);
      }
      const seen = new Map();
      ch.forEach((c, i) => {
        if (c == null || !String(c).trim()) push('error', `choice ${i} is empty`);
        const k = norm(c);
        if (seen.has(k)) push('error', `choices ${seen.get(k)} and ${i} are identical: ${k.slice(0, 40)}`);
        else seen.set(k, i);
      });
    }
  } else if (q.type === 'spr') {
    if (q.sprAnswer == null || !String(q.sprAnswer).trim()) {
      push('error', 'spr question missing sprAnswer');
    }
  }
  const sol = q.sol;
  if (!sol || !String(sol).trim()) push('warn', 'no solution');
  else if (norm(sol).length < 25) push('warn', 'solution under 25 characters');

  const texts = [stem, sol, ...(Array.isArray(q.choices) ? q.choices : []), ...(Array.isArray(q.hints) ? q.hints : [])];
  for (const t of texts) {
    if (typeof t !== 'string') continue;
    for (const seg of mathSegments(t)) {
      const e = katexError(seg.tex, seg.display);
      if (e) push('error', `KaTeX: ${e} in ${seg.tex.slice(0, 50)}`);
    }
  }

  const fig = q.figure;
  if (fig) {
    const rawAns = q.sprAnswer ?? (Array.isArray(q.choices) && q.answer != null ? q.choices[q.answer] : q.finalAnswer);
    const cleanAns = rawAns != null ? String(rawAns).replace(/[^0-9a-zA-Z]/g, '').trim() : '';

    if (cleanAns.length > 0 && !stem.includes(cleanAns)) {
      const sides = fig.sides || (fig.shapes && fig.shapes[0] && fig.shapes[0].sides) || [];
      if (Array.isArray(sides) && sides.some((s) => String(s).replace(/[^0-9a-zA-Z]/g, '').trim() === cleanAns)) {
        push('error', `figure leaks the answer "${cleanAns}" on its sides`);
      }
      if (fig.type === 'triangle' && Array.isArray(fig.angles) && fig.angles.some((a) => String(a).replace(/[^0-9]/g, '').trim() === cleanAns)) {
        push('error', `figure leaks the answer "${cleanAns}" on its angles`);
      }
      if (fig.type === 'circle') {
        if (/center|المركز/i.test(stem) && fig.center && String(fig.center).includes(cleanAns)) push('error', `circle figure leaks center answer "${cleanAns}"`);
        if (/radius|نصف القطر/i.test(stem) && fig.radius && String(fig.radius).includes(cleanAns)) push('error', `circle figure leaks radius answer "${cleanAns}"`);
        if (/diameter|القطر/i.test(stem) && fig.diameter && String(fig.diameter).includes(cleanAns)) push('error', `circle figure leaks diameter answer "${cleanAns}"`);
      }
      if ((fig.type === 'bar' || fig.type === 'barchart') && Array.isArray(fig.data || fig.bars)) {
        const bData = fig.data || fig.bars;
        if (bData.some((b) => String(b.val).trim() === cleanAns)) {
          if (/كم عدد|كم يبلغ|فما هو|احسب|find|how many|what is the number|calculate/i.test(stem) && !/shown in the bar chart|according to the bar chart|من الرسم البياني|من الشكل/i.test(stem)) {
            push('error', `bar chart leaks answer "${cleanAns}" on question asking to find quantity`);
          }
        }
      }
    }
    if (fig.type === 'fn' && Array.isArray(fig.fns)) {
      if (/slope|equation of (?:the )?line|ميل المستقيم|معادلة المستقيم/i.test(stem)) {
        if (fig.fns.some((fn) => fn.label && /y\s*=\s*-?\d/.test(fn.label))) {
          push('error', 'line figure leaks slope/equation in its curve label');
        }
      }
    }
    if (fig.type === 'fn' && Array.isArray(fig.points)) {
      if (/solve|root|roots|zeros?|solutions?|أصفار|حل المعادلة|جذور/i.test(stem) && !/graph|shown|figure|تمثيل/i.test(stem)) {
        if (fig.points.some((p) => (p.label && /x\s*=\s*-?\d+/.test(p.label)) || (p.y === 0 && cleanAns && String(p.x) === cleanAns))) {
          push('error', 'figure leaks quadratic roots on pure solve question');
        }
      }
    }
    if (fig.type === 'numberline' && /solve|solutions?|for what values|حل المتباينة|مجموعة حل/i.test(stem) && !/number line|graph|shown|figure|خط الأعداد|ممثلة/i.test(stem)) {
      push('error', 'numberline figure solves inequality on pure solve question');
    }
    if (fig.type === 'geometry_3d') {
      if (/box\s*plot|boxplot|Q_1|IQR|الربيع|probability|احتمال|drawn|pens?|balls?|tiles?|صندوق.*كرة|cost|price|\$|sells?|bought|شراء|سعر|علب عصير/i.test(stem)) {
        push('error', 'geometry_3d figure attached to non-3D question');
      }
    }
    if (fig.type === 'fn' || fig.type === 'function_graph') {
      const isPureTrig = /\\(?:cos|sin|tan|sec|csc|cot)\s*\(\s*-?\d+/i.test(stem) && !/(graph|curve|period|amplitude)/i.test(stem);
      if (isPureTrig) push('error', 'figure is a function graph on a pure trig evaluation question');
    }
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
  const globalIds = new Map();
  const trackStemSets = new Map();

  for (const f of files) {
    const trackSlug = f.replace(/\.json$/, '');
    const bank = JSON.parse(fs.readFileSync(path.join(BANK_DIR, f), 'utf8'));
    let fe = 0;
    const pushBankErr = (msg) => {
      errors++; fe++;
      if (fe <= 15 || verbose) console.log(`  ✗ ${f}: ${msg}`);
    };

    if (!validateBankSchema(bank)) {
      const firstErr = (validateBankSchema.errors || [])[0];
      pushBankErr(`Schema v2 violation at ${firstErr ? firstErr.instancePath : ''}: ${firstErr ? firstErr.message : 'invalid'}`);
    }
    if (bank.track !== trackSlug) {
      pushBankErr(`bank.track "${bank.track}" does not match filename "${trackSlug}"`);
    }

    const pool = Array.isArray(bank.pool) ? bank.pool : [];
    const localStems = new Map();
    const ansCounts = [0, 0, 0, 0];
    let nMcq4 = 0;

    pool.forEach((q, i) => {
      items++;
      const where = `pool[${i}]`;
      const push = (lvl, msg) => {
        if (lvl === 'error') {
          errors++; fe++;
          if (fe <= 15 || verbose) console.log(`  ✗ ${f} ${where} (${q.id}): ${msg}`);
        } else {
          warns++;
          warnKinds[msg.replace(/\d+/g, 'N')] = (warnKinds[msg.replace(/\d+/g, 'N')] || 0) + 1;
          if (verbose) console.log(`  ⚠ ${f} ${where}: ${msg}`);
        }
      };

      if (globalIds.has(q.id)) {
        push('error', `globally duplicate id "${q.id}" (already in ${globalIds.get(q.id)})`);
      } else {
        globalIds.set(q.id, `${f}:${where}`);
      }

      checkItem(q, push);

      const sKey = norm(q.text).toLowerCase();
      if (localStems.has(sKey)) {
        push('error', `duplicate stem of ${localStems.get(sKey)}`);
      } else {
        localStems.set(sKey, where);
      }

      if (q.type === 'mcq' && Array.isArray(q.choices) && q.choices.length === 4 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4) {
        ansCounts[q.answer]++;
        nMcq4++;
      }
    });

    trackStemSets.set(trackSlug, new Set(localStems.keys()));

    if (nMcq4 >= 100) {
      const exp = nMcq4 / 4;
      const chi2 = ansCounts.reduce((acc, c) => acc + ((c - exp) * (c - exp)) / exp, 0);
      if (chi2 >= 4.0) {
        pushBankErr(`MCQ answer-key distribution [${ansCounts.join(',')}] fails chi^2 < 4.0 (chi^2 = ${chi2.toFixed(2)})`);
      }
    }

    if (fe > 15 && !verbose) console.log(`  … ${fe - 15} more errors in ${f} (use --verbose)`);
  }

  // Cross-bank clone guard (> 5% overlap between any two tracks)
  const slugs = [...trackStemSets.keys()];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      const a = trackStemSets.get(slugs[i]);
      const b = trackStemSets.get(slugs[j]);
      let shared = 0;
      for (const s of a) if (b.has(s)) shared++;
      const ratio = shared / Math.min(a.size, b.size);
      if (ratio > 0.05) {
        errors++;
        console.log(`  ✗ Cross-bank clone violation: ${slugs[i]} & ${slugs[j]} share ${shared} stems (${(ratio * 100).toFixed(1)}% > 5%)`);
      }
    }
  }

  console.log(`\nChecked ${items} items in ${files.length} bank(s) (Schema v2 + Chi² + Cross-Bank): ${errors} error(s), ${warns} warning(s).`);
  for (const [k, n] of Object.entries(warnKinds).sort((a, b) => b[1] - a[1]).slice(0, 6)) console.log(`  warn × ${n}: ${k}`);
  if (errors) { console.log('\n❌ Bank validation failed.'); process.exit(1); }
  console.log('✅ Bank validation passed (Canonical Schema v2).');
}
main();
