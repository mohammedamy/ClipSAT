#!/usr/bin/env node
/**
 * Regression suite enforcing 100% College Board Digital SAT specification compatibility
 * and zero redundancy across all 6 Digital SAT curriculum surfaces:
 *   1. bank-data/sat.json (1,605 items, 562/562/241/240 weights, 0 repeats)
 *   2. content/sat/_practice-set.json (50 items, 18/17/8/7 weights, >=18 figs, 0 repeats)
 *   3. content/sat/sat-*.json (11 chapters, 0 out-of-scope blocks, 0 dup PPs, 100% AR parity)
 *   4. src/scripts/ix-data/sat.js (11 chapters, CB timing/US notation/scope, 100% AR parity)
 *   5. tools/worksheet_gen/topics/sat/*.json & 22 PDFs (495 unique skeletons, >=35 KB PDFs)
 *   6. public/downloads/sat/full-exam-digital-sat-math-01..20 + manifest.json (880 disjoint items)
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function check(label, fn) {
  fn();
  console.log(`  ✓ ${label}`);
}

console.log('\n── Running College Board Digital SAT Compatibility & Zero-Redundancy Suite ──');

// Load ClipSATRedundancy detector
const redSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '05e-redundancy-check.js'), 'utf8');
const redWin = {};
new Function('window', redSrc)(redWin);
const Redundancy = redWin.ClipSATRedundancy;
assert.ok(Redundancy && typeof Redundancy.findRepeats === 'function', 'ClipSATRedundancy must load');

// 1. bank-data/sat.json
check('bank-data/sat.json satisfies exact CB weights (562/562/241/240), SPR rules, chi^2 < 4, and 0 repeats', () => {
  const bank = JSON.parse(fs.readFileSync(path.join(ROOT, 'bank-data', 'sat.json'), 'utf8'));
  const pool = bank.pool;
  assert.strictEqual(pool.length, 1605);

  const domCounts = {};
  const diffCounts = { easy: 0, medium: 0, hard: 0 };
  const choiceDist = [0, 0, 0, 0];
  const skCounts = {};
  let sprCount = 0;

  const DOMAIN_TO_TOPICS = {
    'Algebra': ['sat-linear', 'sat-linfun', 'sat-desmos', 'sat-about'],
    'Advanced Math': ['sat-quad', 'sat-expoly', 'sat-functions', 'sat-desmos'],
    'Problem-Solving and Data Analysis': ['sat-data', 'sat-stats', 'sat-condprob'],
    'Geometry and Trigonometry': ['sat-geo', 'sat-desmos'],
  };

  for (const q of pool) {
    domCounts[q.domain] = (domCounts[q.domain] || 0) + 1;
    diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
    assert.strictEqual(q.calc, true, `Item ${q.id} must allow calculator`);

    if (q.type === 'spr') {
      sprCount++;
      const a = String(q.sprAnswer || '').trim();
      const maxLen = a.startsWith('-') ? 6 : 5;
      assert.ok((/^-?\d+(\.\d+)?$/.test(a) || /^-?\d+\/\d+$/.test(a)) && a.length <= maxLen,
        `Invalid Bluebook SPR answer on ${q.id}: "${a}"`);
      assert.ok(!/which of the following|which statement|which equation|which expression/i.test(q.text),
        `SPR ${q.id} has MCQ stem phrasing`);
    } else {
      assert.ok(Array.isArray(q.choices) && q.choices.length === 4, `${q.id} must have 4 choices`);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, `${q.id} bad answer idx`);
      choiceDist[q.answer]++;
    }

    const allowedTopics = DOMAIN_TO_TOPICS[q.domain] || [];
    assert.ok(allowedTopics.includes(q.topic_id), `Domain/topic_id mismatch on ${q.id}: ${q.domain} vs ${q.topic_id}`);
    assert.ok(Array.isArray(q.hints) && q.hints.length === 3 && q.hints.every(h => String(h).trim().length >= 12),
      `Invalid hints on ${q.id}`);

    const sk = String(q.text).replace(/-?\d+(\.\d+)?/g, 'N').replace(/\s+/g, ' ').trim();
    skCounts[sk] = (skCounts[sk] || 0) + 1;
  }

  const sat0412 = pool.find(q => q.id === 'sat-0412');
  assert.ok(sat0412 && sat0412.sprAnswer === '101', 'Regression anchor sat-0412 must have sprAnswer 101');
  assert.deepStrictEqual(domCounts, {
    'Algebra': 562,
    'Advanced Math': 562,
    'Problem-Solving and Data Analysis': 241,
    'Geometry and Trigonometry': 240,
  });
  assert.deepStrictEqual(diffCounts, { easy: 535, medium: 535, hard: 535 });
  assert.strictEqual(sprCount, 402);

  const mcqTotal = choiceDist.reduce((a, b) => a + b, 0);
  const exp = mcqTotal / 4;
  const chi2 = choiceDist.reduce((acc, c) => acc + ((c - exp) ** 2) / exp, 0);
  assert.ok(chi2 < 4.0, `MCQ choice bias chi^2 too high: ${chi2}`);

  const maxSk = Math.max(...Object.values(skCounts));
  assert.strictEqual(maxSk, 1, `Expected max_items_sharing_one_skeleton === 1, got ${maxSk}`);
  const repeats = Redundancy.findRepeats(pool);
  assert.strictEqual(repeats.length, 0, `Unexpected bank repeats: ${repeats.length}`);
});

// 2. content/sat/_practice-set.json
check('content/sat/_practice-set.json has 50 unique CB items, >=18 figures, 100% Arabic parity, and 0 repeats', () => {
  const ps = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'sat', '_practice-set.json'), 'utf8'));
  const items = ps.items || [];
  assert.strictEqual(items.length, 50);

  const bannedRe = /\\log\b|\\ln\b|\blogarithm|\basymptote|\bpiecewise|cosine rule|sine rule|\\csc\b|\\sec\b|\\cot\b|\\arcsin|\\arccos|\\arctan|y\s*=\s*mx\s*\+\s*c|normal vector|\bgradient\b|\bcomplex\b/i;
  let figCount = 0;
  items.forEach((it, idx) => {
    assert.strictEqual(it.number, idx + 1, `Expected sequence number ${idx + 1}, got ${it.number}`);
    assert.ok(['Basic', 'Intermediate', 'Advanced'].includes(it.difficulty), `Bad difficulty at #${idx + 1}`);
    assert.ok(it.question && it.question.en && it.question.ar, `Missing bilingual question at #${idx + 1}`);
    assert.ok(it.solution && it.solution.en && it.solution.ar, `Missing bilingual solution at #${idx + 1}`);
    if (it.fig) figCount++;
    assert.ok(!bannedRe.test(it.question.en + ' ' + it.solution.en), `Banned CB scope token in practice set #${idx + 1}`);
    const arStr = String(it.question.ar) + ' ' + String(it.solution.ar);
    assert.ok(!/\\text\{[^{}]*[\u0600-\u06FF][^{}]*\}/.test(arStr), `Arabic inside \\text{} in practice set #${idx + 1}`);
  });
  assert.ok(figCount >= 18, `Expected >=18 figures in _practice-set, got ${figCount}`);

  const mapped = items.map((it, idx) => ({
    id: `ps-${idx}`,
    text: it.question.en,
    type: 'spr',
    choices: [],
    figure: it.fig || null,
  }));
  const repeats = Redundancy.findRepeats(mapped);
  assert.strictEqual(repeats.length, 0, `Unexpected _practice-set repeats: ${repeats.length}`);
});

// 3. content/sat/sat-*.json (11 chapters)
check('content/sat/sat-*.json (11 chapters) have 0 banned scope hits, 0 dup PPs, 100% Arabic parity', () => {
  const meta = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'sat', '_meta.json'), 'utf8'));
  assert.strictEqual(meta.chapterOrder.length, 11);

  const bannedRe = /\\log\b|\\ln\b|\blogarithm|\basymptote|\bpiecewise|cosine rule|sine rule|\\csc\b|\\sec\b|\\cot\b|\\arcsin|\\arccos|\\arctan|y\s*=\s*mx\s*\+\s*c|normal vector|\bgradient\b/i;
  const ppSkeletons = new Set();

  for (const slug of meta.chapterOrder) {
    const doc = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'sat', `${slug}.json`), 'utf8'));
    const txt = JSON.stringify(doc.content.blocks);
    assert.ok(!bannedRe.test(txt), `Banned scope token in ${slug}.json: ${txt.match(bannedRe)}`);

    for (const b of doc.content.blocks) {
      if (b.kind === 'practiceProblem') {
        const sk = String((b.question && b.question.en) || '').replace(/<[^>]+>/g, ' ').replace(/-?\d+(\.\d+)?/g, 'N').replace(/\s+/g, ' ').trim();
        assert.ok(!ppSkeletons.has(sk), `Duplicate practiceProblem skeleton in ${slug}.json`);
        ppSkeletons.add(sk);
      }
      if (b.kind === 'explorer' && /mainfn/.test(b.canvasId || '')) {
        const optVals = (b.controls || []).flatMap(c => (c.options || []).map(o => o.value));
        assert.ok(!optVals.includes('logarithmic') && !optVals.includes('rational'),
          `${slug} ${b.canvasId} must omit logarithmic & rational`);
      }
    }

    (function walk(o) {
      if (Array.isArray(o)) o.forEach(walk);
      else if (o && typeof o === 'object') {
        if ('en' in o && 'ar' in o && o.en && String(o.en).trim()) {
          assert.ok(o.ar && String(o.ar).trim().length > 0, `Null/empty .ar in ${slug}.json`);
          assert.ok(!/\\text\{[^{}]*[\u0600-\u06FF][^{}]*\}/.test(String(o.ar)), `Arabic inside \\text{} in ${slug}.json`);
        } else {
          Object.values(o).forEach(walk);
        }
      }
    })(doc.content.blocks);
  }
});

// 4. src/scripts/ix-data/sat.js
check('src/scripts/ix-data/sat.js has 11 chapters matching CB timing/terminology/scope and 100% Arabic parity', () => {
  const ixWin = {};
  new Function('window', fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'ix-data', 'sat.js'), 'utf8'))(ixWin);
  const D = {};
  ixWin.__ixData.forEach(fn => fn(D));
  assert.strictEqual(Object.keys(D).length, 11);

  const badRe = /\\log\b|\\ln\b|\blogarithm|\basymptote|\bpiecewise|cosine rule|sine rule|\\csc\b|\\sec\b|\\cot\b|\\arcsin|\\arccos|\\arctan|y\s*=\s*mx\s*\+\s*c|\bgradient\b|normal vector|\bcomplex\b|f\^\{-1\}|binomial|z-score|p-value|\bVar\(|standard error|25-question|38-minute|45-question|68-minute|91 seconds|Tree Diagram|AB\\sin|2\\sin\\theta|sin\(2\\theta\)/i;
  for (const [ch, arr] of Object.entries(D)) {
    arr.forEach((act, idx) => {
      const s = JSON.stringify(act);
      assert.ok(!badRe.test(s), `Out-of-scope token in ix-data ${ch}[${idx}]: ${s.match(badRe)}`);
      assert.ok(act.ti_ar && act.ti_ar.length > 0, `Missing ti_ar in ${ch}[${idx}]`);
      const arStr = JSON.stringify([act.ti_ar, act.q_ar, act.o_ar, act.ex_ar, act.steps_ar, act.p_ar, act.reasons_ar, act.items_ar, act.categories_ar, act.prompt_ar]);
      const clean = arStr.replace(/\\\\\(.*?\\\\\)|\\\\\[.*?\\\\\]/g, ' ');
      const eng = (clean.match(/\b[A-Za-z]{2,}\b/g) || []).filter(w => !['SAT', 'Desmos', 'MOE', 'LHS', 'RHS', 'SOHCAHTOA', 'cat', 'ex', 'null', 'false', 'true'].includes(w));
      assert.strictEqual(eng.length, 0, `Untranslated English in ${ch}[${idx}] AR: ${eng.join(',')}`);
    });
  }
});

// 5. Worksheets (495 unique skeletons) & 22 PDFs
check('11 SAT worksheets have 495 globally unique skeletons, 0 bare $ currency, and 22 PDFs >= 35 KB', () => {
  const wsDir = path.join(ROOT, 'tools', 'worksheet_gen', 'topics', 'sat');
  const dlDir = path.join(ROOT, 'public', 'downloads', 'sat');
  const wsFiles = fs.readdirSync(wsDir).filter(f => f.endsWith('.json')).sort();
  assert.strictEqual(wsFiles.length, 11);

  const sks = new Set();
  let totalQ = 0;
  for (const wf of wsFiles) {
    const doc = JSON.parse(fs.readFileSync(path.join(wsDir, wf), 'utf8'));
    let spr = 0, mcq = 0;
    for (const sec of doc.sections) {
      for (const q of sec.questions) {
        totalQ++;
        if (q.qtype === 'MCQ') mcq++; else spr++;
        const txt = [q.q, q.answer, ...(q.choices || [])].join(' ');
        assert.ok(!/\$\d|\\\$/.test(txt), `Currency delimiter bug in ${wf}`);
        const sk = String(q.q).replace(/\\?\$|\bUSD\b|\bdollars?\b/g, '').replace(/-?\d+(?:\.\d+)?/g, 'N').replace(/\s+/g, ' ').trim().toLowerCase();
        assert.ok(!sks.has(sk), `Duplicate worksheet skeleton in ${wf}: ${q.q}`);
        sks.add(sk);
      }
    }
    assert.strictEqual(spr, 20, `${wf} expected 20 SPR, got ${spr}`);
    assert.strictEqual(mcq, 25, `${wf} expected 25 MCQ, got ${mcq}`);
  }
  assert.strictEqual(totalQ, 495);
  assert.strictEqual(sks.size, 495);

  const pdfs = fs.readdirSync(dlDir).filter(f => f.endsWith('.pdf'));
  assert.strictEqual(pdfs.length, 22, `Expected 22 PDFs in public/downloads/sat/, found ${pdfs.length}`);
  for (const pdf of pdfs) {
    const sz = fs.statSync(path.join(dlDir, pdf)).size;
    assert.ok(sz >= 35000, `PDF ${pdf} suspiciously small (${sz} bytes)`);
  }
});

// 6. 20 Full Printable Exams & manifest.json
check('20 printable SAT full exams (40 HTMLs, 880 disjoint items) & manifest.json (34 entries incl. 3 Practice Banks) pass scope checks', () => {
  const dlDir = path.join(ROOT, 'public', 'downloads', 'sat');
  const manifest = JSON.parse(fs.readFileSync(path.join(dlDir, 'manifest.json'), 'utf8'));
  assert.strictEqual(manifest.length, 34);
  assert.strictEqual(manifest.filter(e => e.isPracticeBank).length, 3);
  assert.strictEqual(manifest.filter(e => e.isFullExam && !e.isPracticeBank).length, 20);
  assert.strictEqual(manifest.filter(e => !e.isFullExam).length, 11);

  const seenExamStems = new Set();
  for (let i = 1; i <= 20; i++) {
    const pad = String(i).padStart(2, '0');
    const examFile = path.join(dlDir, `full-exam-digital-sat-math-${pad}-exam.html`);
    const akFile = path.join(dlDir, `full-exam-digital-sat-math-${pad}-answerkey.html`);
    assert.ok(fs.existsSync(examFile) && fs.existsSync(akFile), `Missing full exam #${pad}`);
    const html = fs.readFileSync(examFile, 'utf8');
    const matches = [...html.matchAll(/class="fep-qbody">([\s\S]*?)<\/div>/g)];
    assert.strictEqual(matches.length, 44, `Full exam #${pad} must have 44 questions`);
    for (const m of matches) {
      const plain = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      assert.ok(!seenExamStems.has(plain), `Duplicate question across full exam #${pad}`);
      seenExamStems.add(plain);
    }
  }
  assert.strictEqual(seenExamStems.size, 880);
});

console.log('\n🎉 All 6 College Board Digital SAT specification & zero-redundancy checks passed!\n');
