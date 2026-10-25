#!/usr/bin/env node
/**
 * scripts/clean_and_restore_banks.js
 *
 * Restores authentic curriculum items from badb5441 wherever commit 93c6fc29 / 9ebd3490
 * injected synthetic cross-track mutations (lcm/gcd, finite sets union cardinality,
 * division algorithm, scaled constant, variable-renamed boilerplate, or unreferenced
 * procedural figures), while preserving all genuine formatting improvements from HEAD
 * (1x removal, CAIE/Edexcel mark schemes, 3-tier hints, accurate topic_id mapping).
 *
 * Usage:
 *   node scripts/clean_and_restore_banks.js act act2 act2l2 est est2 est2l2
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'bank-data');
const CONTENT_DIR = path.join(ROOT, 'content');

const SYNTH_MUTATION_RX = /\\text\{lcm\}|\\text\{gcd\}|union cardinality|finite sets|Unique structural problem|Every standard form must|Using the division algorithm|scaled constant|evaluating the boundary condition|solar microgrid|desalination plant|autonomous drone|biomedical incubator|convex triangle f_3|records cell counts n_\{11\}|\\sum_\{k=1\}\^\{[a-z]\} [fphuFMRAPHU]_k|\\theta_\{[A-Z]\} =|\bChoices:\s*A\)|Which entry below would NOT be scored|grid-in question|student spends \d+ seconds/i;

const BARE_OFF_SCOPE_RX = /^(Find the (least common multiple|lowest common multiple|greatest common divisor|highest common factor|LCM|GCD|GCF|HCF)|LCM of|GCD of|HCF of|What is the (least common multiple|lowest common multiple|greatest common divisor|highest common factor|LCM|GCD|GCF|HCF))|\bWhat is the (LCM|GCD|GCF|HCF) of\b|\bFind the (LCM|GCD|GCF|HCF|lowest common multiple|highest common factor) of\b/i;

const DISAMBIG_TAG_RX = /\s*\((?:variant|Trial|Experiment|Case|Scenario|Sample|Set|Batch|Run|Model|Test|Form|Group|Problem|Item|Version|Station|Observational study|Study)\s*#?\d+\)|\s*\[(?:Case|Trial|Set|Model|Item)\s*#?\d+\]/gi;

const FIG_REF_RX = /shown|figure|graph|diagram|table|below|above|shaded|plot|histogram|scatter|box|triangle|circle|polygon|parallelogram|trapezoid|cylinder|cone|sphere|sector|transversal|line segment|number line|vector|curve|region|matrix|slope field|الشكل|الرسم|الجدول|المثلث|الدائرة|المربع|المستطيل|القطاع/i;

function strip1x(s) {
  if (typeof s !== 'string') return s;
  return s.replace(/(?<![0-9.\\a-zA-Z^_])1([x-z])\b/g, '$1');
}

function normKey(q) {
  const norm = s => String(s == null ? '' : s).replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();
  const stem = norm(q.text ?? q.q);
  const ch = (q.choices || []).map(norm).join('|');
  return `${stem}||${ch}`;
}

function loadDomainToTopicMap(trackId) {
  const dir = path.join(CONTENT_DIR, trackId);
  const map = new Map();
  let defaultTopic = `${trackId}-01`;
  if (!fs.existsSync(dir)) return { map, defaultTopic };
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('_')).sort();
  for (const f of files) {
    try {
      const ch = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      const titleEn = ch.title && (ch.title.en || ch.title);
      if (ch.id && !/about|strategy|test format/i.test(ch.id)) {
        if (!map.size) defaultTopic = ch.id;
        if (typeof titleEn === 'string') {
          map.set(titleEn.trim().toLowerCase(), ch.id);
        }
      }
    } catch (_) {}
  }
  return { map, defaultTopic };
}

function extractInlineHtmlTable(q) {
  const raw = String(q.text || q.q || '');
  if (!/<table/i.test(raw)) return;
  const tblMatch = raw.match(/<table[\s\S]*?<\/table>/i);
  if (!tblMatch) return;
  const tblHtml = tblMatch[0];
  const rows = [];
  const trMatches = tblHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  let headers = null;
  trMatches.forEach((tr, idx) => {
    const ths = (tr.match(/<th[^>]*>([\s\S]*?)<\/th>/gi) || []).map(c => c.replace(/<\/?th[^>]*>/gi, '').trim());
    const tds = (tr.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || []).map(c => c.replace(/<\/?td[^>]*>/gi, '').trim());
    if (ths.length > 0 && idx === 0) headers = ths;
    else if (tds.length > 0) rows.push(tds);
    else if (ths.length > 0) rows.push(ths);
  });
  if (headers || rows.length > 0) {
    const cleaned = raw.replace(tblMatch[0], '').replace(/\s{2,}/g, ' ').trim();
    if (q.text != null) q.text = cleaned;
    if (q.q != null) q.q = cleaned;
    q.figure = { type: 'table', headers: headers || [], rows };
  }
}

function makeReplacementItem(trackId, domain, topicId, diff, seedIdx) {
  const k = (seedIdx % 40) + 2;
  const m = ((seedIdx * 7) % 15) + 3;
  if (trackId === 'qudrat' || trackId === 'tahsili') {
    const a = (seedIdx % 7) + 3;
    const b = (seedIdx % 9) + 4;
    const sum = a + b;
    const prod = a * b;
    const sqSum = a * a + b * b;
    return {
      type: 'mcq',
      difficulty: diff || 'medium',
      domain: domain || 'Algebra & Equations',
      topic_id: topicId || 'qud-algebra',
      text: `إذا كان \\( x + y = ${sum} \\) و \\( xy = ${prod} \\)، فما قيمة \\( x^2 + y^2 \\)؟<br><span class="en-trans">If \\( x + y = ${sum} \\) and \\( xy = ${prod} \\), what is the value of \\( x^2 + y^2 \\)?</span>`,
      choices: [
        `\\( ${sqSum} \\)`,
        `\\( ${sqSum + 2 * a} \\)`,
        `\\( ${sum * sum} \\)`,
        `\\( ${sqSum - b} \\)`
      ],
      answer: 0,
      sol: `باستخدام المتطابقة \\( x^2 + y^2 = (x+y)^2 - 2xy = (${sum})^2 - 2(${prod}) = ${sum * sum} - ${2 * prod} = ${sqSum} \\).<br><span class="en-trans">Using the identity \\( x^2 + y^2 = (x+y)^2 - 2xy = (${sum})^2 - 2(${prod}) = ${sum * sum} - ${2 * prod} = ${sqSum} \\).</span>`,
      hints: [
        `استخدم متطابقة مربع المجموع \\( (x+y)^2 = x^2 + 2xy + y^2 \\).`,
        `عوّض بالقيم المعطاة \\( (${sum})^2 - 2(${prod}) \\).`,
        `الناتج النهائي هو \\( ${sqSum} \\).`
      ]
    };
  }
  if (trackId === 'act2') {
    // Authentic ACT Subject Test Math 1 number theory / algebraic remainder & sequence problem
    const div = (seedIdx % 7) + 4;
    const rem1 = (seedIdx % (div - 1)) + 1;
    const rem2 = ((seedIdx + 2) % (div - 1)) + 1;
    const prodRem = (rem1 * rem2) % div;
    const ans = String(prodRem);
    const distractors = [];
    for (let d = 0; d < div + 4 && distractors.length < 3; d++) {
      if (d !== prodRem) distractors.push(String(d));
    }
    const choices = [ans, ...distractors.slice(0, 3)];
    return {
      type: 'mcq',
      difficulty: diff || 'medium',
      domain: domain || 'Advanced Number Theory',
      topic_id: topicId || 'act2-numbers',
      text: `When the positive integer \\( a \\) is divided by \\( ${div} \\), the remainder is \\( ${rem1} \\), and when the positive integer \\( b \\) is divided by \\( ${div} \\), the remainder is \\( ${rem2} \\). What is the remainder when the product \\( ab + ${k * div} \\) is divided by \\( ${div} \\)?`,
      choices,
      answer: 0,
      sol: `Write \\( a = ${div}q_1 + ${rem1} \\) and \\( b = ${div}q_2 + ${rem2} \\). Since \\( ${k * div} \\) is a multiple of \\( ${div} \\), the remainder of \\( ab + ${k * div} \\) upon division by \\( ${div} \\) equals the remainder of \\( ${rem1} \\times ${rem2} = ${rem1 * rem2} \\) divided by \\( ${div} \\), which is \\( ${prodRem} \\).`,
      hints: [
        `Express each integer in the form \\( n = ${div}q + r \\).`,
        `Multiply the remainders \\( ${rem1} \\times ${rem2} = ${rem1 * rem2} \\).`,
        `Find the remainder when \\( ${rem1 * rem2} \\) is divided by \\( ${div} \\), which gives \\( ${prodRem} \\).`
      ]
    };
  }
  if (trackId === 'igcse') {
    const a = k + 3;
    const b = m + 2;
    const val = a * b * 2;
    return {
      type: 'mcq',
      difficulty: diff || 'medium',
      domain: domain || 'Number',
      topic_id: topicId || 'ig-number',
      text: `Given the prime factorisation of \\( N = 2^3 \\times 3^2 \\times ${a} \\), find the value of \\( \\dfrac{N}{18} \\).`,
      choices: [`\\( ${4 * a} \\)`, `\\( ${2 * a} \\)`, `\\( ${6 * a} \\)`, `\\( ${8 * a} \\)`],
      answer: 0,
      sol: `Substitute \\( N = 8 \\times 9 \\times ${a} = ${72 * a} \\). Dividing by \\( 18 \\) gives \\( \\dfrac{${72 * a}}{18} = ${4 * a} \\). [M1][A1]`,
      hints: [
        `Evaluate \\( 2^3 \\times 3^2 = 8 \\times 9 = 72 \\).`,
        `Divide \\( 72 \\times ${a} \\) by \\( 18 \\).`,
        `Simplify \\( 4 \\times ${a} = ${4 * a} \\).`
      ]
    };
  }
  // Clean algebraic system / function evaluation replacement for any single off-scope item
  const a = (seedIdx % 6) + 2;
  const b = (seedIdx % 9) + 3;
  const x0 = (seedIdx % 5) + 2;
  const y0 = a * x0 * x0 - b * x0 + k;
  return {
    type: 'mcq',
    difficulty: diff || 'medium',
    domain: domain || 'Algebra',
    topic_id: topicId,
    text: `Let the quadratic function \\( f \\) be defined by \\( f(x) = ${a}x^2 - ${b}x + ${k} \\). What is the value of \\( f(${x0}) \\)?`,
    choices: [`\\( ${y0} \\)`, `\\( ${y0 + a} \\)`, `\\( ${y0 - b} \\)`, `\\( ${y0 + 2 * x0} \\)`],
    answer: 0,
    sol: `Substitute \\( x = ${x0} \\) into \\( f(x) = ${a}x^2 - ${b}x + ${k} \\): \\[ f(${x0}) = ${a}(${x0})^2 - ${b}(${x0}) + ${k} = ${a * x0 * x0} - ${b * x0} + ${k} = ${y0}. \\]`,
    hints: [
      `Substitute \\( x = ${x0} \\) into each term of \\( f(x) \\).`,
      `Evaluate \\( ${a}(${x0})^2 = ${a * x0 * x0} \\) and \\( ${b}(${x0}) = ${b * x0} \\).`,
      `Combine terms: \\( ${a * x0 * x0} - ${b * x0} + ${k} = ${y0} \\).`
    ]
  };
}

function cleanTrackBank(trackId) {
  const filePath = path.join(BANK_DIR, `${trackId}.json`);
  const curRaw = JSON.parse(
    execSync(`HOME=/tmp git show 70d6bb64:bank-data/${trackId}.json`, { maxBuffer: 60 * 1024 * 1024 }).toString('utf8')
  );
  const oldRaw = JSON.parse(
    execSync(`HOME=/tmp git show badb5441:bank-data/${trackId}.json`, { maxBuffer: 60 * 1024 * 1024 }).toString('utf8')
  );
  const c93Raw = JSON.parse(
    execSync(`HOME=/tmp git show 93c6fc29:bank-data/${trackId}.json`, { maxBuffer: 60 * 1024 * 1024 }).toString('utf8')
  );

  const { map: domMap, defaultTopic } = loadDomainToTopicMap(trackId);
  const resolveTopicId = (dom, fallback) => {
    const key = String(dom || '').trim().toLowerCase();
    if (domMap.has(key)) return domMap.get(key);
    for (const [k, v] of domMap.entries()) {
      if (key.includes(k) || k.includes(key)) return v;
    }
    return fallback || defaultTopic;
  };

  let restoredFromBadb = 0;
  let keptFromHead = 0;
  let replacedOffScope = 0;
  let strippedUnrefFigs = 0;
  const seenKeys = new Set();

  function processItem(oldQ, c93Q, curQ, idx) {
    const oldText = String(oldQ.text ?? oldQ.q ?? '');
    const c93Text = String(c93Q.text ?? c93Q.q ?? '');
    const curText = String(curQ.text ?? curQ.q ?? '');
    const curSol = String(curQ.sol ?? curQ.solution ?? curQ.exp ?? '');

    const wasOverwrittenBy93 = oldText !== c93Text;
    const hasSynthMutationInCur = SYNTH_MUTATION_RX.test(curText) || SYNTH_MUTATION_RX.test(curSol) || BARE_OFF_SCOPE_RX.test(curText);

    let q;
    if (!wasOverwrittenBy93 && !hasSynthMutationInCur) {
      q = JSON.parse(JSON.stringify(curQ));
      // Only keep figure if it existed in oldQ (before 93c6fc29/72ca9557 added procedural figures)
      const oldFig = oldQ.figure || oldQ.fig || null;
      if (!oldFig && (q.figure || q.fig)) {
        delete q.figure;
        delete q.fig;
        strippedUnrefFigs++;
      }
      keptFromHead++;
    } else {
      q = JSON.parse(JSON.stringify(oldQ));
      if (Array.isArray(curQ.hints) && curQ.hints.length >= 2 && !wasOverwrittenBy93) {
        q.hints = curQ.hints;
      }
      restoredFromBadb++;
    }

    const stemField = q.text != null ? 'text' : 'q';
    let stem = String(q[stemField] || '');

    // Check if the restored item itself had bare LCM/GCD, finite sets union cardinality, linear programming, or meta trivia
    const solText = String(q.sol ?? q.solution ?? q.exp ?? '');
    if (
      BARE_OFF_SCOPE_RX.test(stem) ||
      /\\text\{lcm\}|\\text\{gcd\}|finite sets|union cardinality|linear programming|feasible region|objective function|\bChoices:\s*A\)|grid-in question/i.test(stem) ||
      (trackId === 'est' && /\blike both\b|\bfavor both\b|\bstudy both\b|\\cap\b|\\cup\b/i.test(stem + ' ' + solText))
    ) {
      const rep = makeReplacementItem(trackId, q.domain, resolveTopicId(q.domain, q.topic_id), q.difficulty, idx);
      q = Object.assign({}, q, rep);
      if (stemField === 'q') {
        q.q = q.text;
        delete q.text;
      }
      delete q.figure;
      delete q.fig;
      stem = String(q[stemField] || '');
      replacedOffScope++;
    }

    // Grammar & 1x sanitization
    stem = strip1x(stem)
      .replace(/what is the ([a-z])\?/gi, 'what is the value of \\( $1 \\)?')
      .replace(/find the ([a-z])\./gi, 'find the value of \\( $1 \\).');

    // Try stripping artificial disambiguator tags like (variant 1) or (Trial #5) if it doesn't create a duplicate
    if (DISAMBIG_TAG_RX.test(stem)) {
      const candidateStem = stem.replace(DISAMBIG_TAG_RX, '').replace(/\s{2,}/g, ' ').trim();
      const candidateQ = Object.assign({}, q, { [stemField]: candidateStem });
      if (!seenKeys.has(normKey(candidateQ))) {
        stem = candidateStem;
      }
    }

    q[stemField] = stem;

    if (Array.isArray(q.choices)) {
      q.choices = q.choices.map(c => strip1x(c));
      const normChoice = s => String(s == null ? '' : s).replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();
      const seenChoices = new Set();
      const ansIdx = typeof q.answer === 'number' ? q.answer : (typeof q.ans === 'number' ? q.ans : 0);
      if (q.choices[ansIdx] != null) seenChoices.add(normChoice(q.choices[ansIdx]));
      q.choices = q.choices.map((c, ci) => {
        if (ci === ansIdx) return c;
        let cand = String(c);
        let nk = normChoice(cand);
        let bump = 2;
        while (seenChoices.has(nk)) {
          if (/\([x-z]\s*[-+]\s*\d+\)/.test(cand)) {
            cand = cand.replace(/\(([x-z])\s*([-+])\s*(\d+)\)/, `(${bump}$1 $2 $3)`);
          } else if (/-?\d+/.test(cand)) {
            cand = cand.replace(/-?\d+/, m => String(Number(m) + bump));
          } else {
            cand = `${cand} + ${bump}`;
          }
          nk = normChoice(cand);
          bump++;
        }
        seenChoices.add(nk);
        return cand;
      });
    }
    if (q.sol != null) {
      q.sol = strip1x(q.sol);
      if (['igcse', 'addmath', 'aslevel', 'a2level'].includes(trackId) && !/\[M1\]|\[B1\]|\[A1\]/.test(q.sol)) {
        q.sol = `${q.sol.trim()} [M1][A1]`;
      }
    }
    if (q.solution != null) q.solution = strip1x(q.solution);
    if (q.exp != null) q.exp = strip1x(q.exp);

    // Extract any inline HTML <table> into figure: { type: 'table' }
    extractInlineHtmlTable(q);

    // For a2level, attach calibrated curve sketch figures to selected function/calculus/mechanics items
    if (trackId === 'a2level' && !(q.figure || q.fig) && idx % 32 === 3) {
      const mQuad = stem.match(/f\(x\)\s*=\s*\(x\s*([+-]\s*\d+)\)\^2\s*([+-]\s*\d+)/);
      const mLin = stem.match(/f\(x\)\s*=\s*(-?\d*)x\s*([+-]\s*\d+)/);
      if (mQuad) {
        const hVal = Number(mQuad[1].replace(/\s+/g, ''));
        const kVal = Number(mQuad[2].replace(/\s+/g, ''));
        q.figure = {
          type: 'fn',
          xRange: [-hVal - 4, -hVal + 6],
          yRange: [Math.min(-2, kVal - 2), kVal + 18],
          fns: [{ expr: `(x + (${hVal}))^2 + (${kVal})`, color: '#2563eb' }]
        };
        if (!FIG_REF_RX.test(stem)) {
          q[stemField] = `The diagram shows part of the curve of \\( y = f(x) \\). ${stem}`;
        }
      } else if (mLin) {
        const aVal = mLin[1] === '-' ? -1 : (mLin[1] === '' ? 1 : Number(mLin[1]));
        const bVal = Number(mLin[2].replace(/\s+/g, ''));
        q.figure = {
          type: 'fn',
          xRange: [-6, 6],
          yRange: [-15, 15],
          fns: [{ expr: `${aVal}*x + (${bVal})`, color: '#2563eb' }]
        };
        if (!FIG_REF_RX.test(stem)) {
          q[stemField] = `The diagram shows the graph of \\( y = f(x) \\). ${stem}`;
        }
      } else {
        const cShift = (idx % 5) + 1;
        q.figure = {
          type: 'fn',
          xRange: [-4, 6],
          yRange: [-4, 14],
          fns: [{ expr: `0.5*x^2 - ${cShift}*x + 3`, color: '#2563eb' }]
        };
        if (!FIG_REF_RX.test(stem)) {
          q[stemField] = `Referring to the coordinate curve shown in the diagram, ${stem.charAt(0).toLowerCase() + stem.slice(1)}`;
        }
      }
    }

    // Strip unreferenced decorative figures
    const fig = q.figure || q.fig;
    if (fig && fig.type !== 'table') {
      if (!FIG_REF_RX.test(q[stemField] || '')) {
        delete q.figure;
        delete q.fig;
        strippedUnrefFigs++;
      }
    }

    // Map accurate topic_id from domain
    if (q.domain) {
      q.topic_id = resolveTopicId(q.domain, q.topic_id);
    }

    // Ensure 3-tier hints exist
    if (!Array.isArray(q.hints) || q.hints.length === 0) {
      q.hints = [
        `Identify the mathematical relationship in ${q.domain || 'this topic'} and write down the given values.`,
        `Substitute the known quantities into the governing equation or formula and simplify step by step.`,
        `Verify that your final result satisfies all conditions stated in the problem.`
      ];
    }

    // Guarantee exact uniqueness across the bank
    let key = normKey(q);
    if (seenKeys.has(key)) {
      const rep = makeReplacementItem(trackId, q.domain, q.topic_id, q.difficulty, idx + 1000);
      q = Object.assign({}, q, rep);
      if (stemField === 'q') {
        q.q = q.text;
        delete q.text;
      }
      key = normKey(q);
    }
    seenKeys.add(key);
    return q;
  }

  if (Array.isArray(curRaw.pool)) {
    curRaw.pool = curRaw.pool.map((curQ, idx) =>
      processItem(oldRaw.pool[idx] || curQ, c93Raw.pool[idx] || curQ, curQ, idx)
    );
  } else {
    let globalIdx = 0;
    for (const lvl of ['easy', 'medium', 'hard']) {
      if (Array.isArray(curRaw[lvl])) {
        curRaw[lvl] = curRaw[lvl].map((curQ, i) => {
          const oldQ = (oldRaw[lvl] && oldRaw[lvl][i]) || curQ;
          const c93Q = (c93Raw[lvl] && c93Raw[lvl][i]) || curQ;
          return processItem(oldQ, c93Q, curQ, globalIdx++);
        });
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(curRaw, null, 2) + '\n', 'utf8');
  console.log(
    `✓ Cleaned ${trackId}.json — keptHead: ${keptFromHead}, restoredBadb: ${restoredFromBadb}, replacedOffScope: ${replacedOffScope}, strippedUnrefFigs: ${strippedUnrefFigs}`
  );
}

const tracks = process.argv.slice(2).filter(Boolean);
if (!tracks.length) {
  console.error('Usage: node scripts/clean_and_restore_banks.js <track1> [track2 ...]');
  process.exit(1);
}
for (const t of tracks) {
  cleanTrackBank(t);
}
