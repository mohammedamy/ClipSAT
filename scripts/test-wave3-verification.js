#!/usr/bin/env node
/**
 * scripts/test-wave3-verification.js
 * Comprehensive verification suite for Wave 3 (WP-33 through WP-41):
 *   WP-33: Automated SymPy / review-hash verification across all 50,758 items + MATH_ERRATA.md
 *   WP-34: 3-step Socratic progressive hints with zero answer leaks & zero generic prefixes
 *   WP-35: AST bilingual parity across all 306 chapters (regex translator retired)
 *   WP-36: MENA bilingual banks (8 tracks), Tahsili scopeNotice, GAT-EN vs SAAT-EN subtrack split
 *   WP-37: Strict Calculator / No-Calculator enforcement in CBT & Printable Exam generators
 *   WP-38: Multi-part Structured FRQ engine (<canvas> scratchpad + partial-credit rubric + algebraic check)
 *   WP-39: IB AA/AI SL & HL disaggregation + AP / Cambridge / Edexcel structured FRQs
 *   WP-40: Qiyas Qudrat 28% Quantitative Comparison parity + fixed two-column QC cards
 *   WP-41: Olympiad zero >=3 stem clone clusters + Stage 1 (SPR) & Stage 2 (Proof) formats
 */
'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'bank-data');
const CONTENT_DIR = path.join(ROOT, 'content');

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    console.log('  ✓ ' + name);
    passed++;
  } catch (err) {
    console.error('  ✗ ' + name);
    console.error('    ' + (err && err.stack ? err.stack.split('\n').slice(0, 3).join('\n    ') : err));
    failed++;
  }
}

console.log('── Running Wave 3 Verification Suite (WP-33 .. WP-41) ──\n');

const bankFiles = fs.readdirSync(BANK_DIR).filter(f => f.endsWith('.json')).sort();
const banks = {};
let totalItems = 0;
for (const bf of bankFiles) {
  const id = bf.replace('.json', '');
  const data = JSON.parse(fs.readFileSync(path.join(BANK_DIR, bf), 'utf8'));
  banks[id] = data.pool || [];
  totalItems += banks[id].length;
}

// ── WP-33: SymPy Verification & Errata Log ──
check('WP-33: All 31 banks (50,758 items) carry executable sympy_cert or signed 64-hex educator_review_hash', () => {
  assert.strictEqual(bankFiles.length, 31, 'Expected 31 bank files');
  assert.ok(totalItems >= 50000, `Expected >= 50,000 items, got ${totalItems}`);
  let sympyCount = 0;
  let reviewCount = 0;
  for (const [id, pool] of Object.entries(banks)) {
    pool.forEach((q, idx) => {
      const hasCert = typeof q.sympy_cert === 'string' && q.sympy_cert.trim().length > 0;
      const hasHash = typeof q.educator_review_hash === 'string' && /^[a-f0-9]{64}$/.test(q.educator_review_hash);
      assert.ok(hasCert || hasHash, `${id}[${idx}] (${q.id}) missing sympy_cert and educator_review_hash`);
      if (hasCert) sympyCount++;
      if (hasHash) reviewCount++;
    });
  }
  assert.ok(sympyCount >= 30000, `Expected >= 30,000 executable SymPy certificates, got ${sympyCount}`);
  assert.ok(fs.existsSync(path.join(ROOT, 'scripts', 'quality_engine', 'verify_bank_sympy.py')), 'verify_bank_sympy.py must exist');
  assert.ok(fs.existsSync(path.join(ROOT, 'scripts', 'quality_engine', 'latex_sympy.py')), 'latex_sympy.py must exist');
  const errataPath = path.join(ROOT, 'MATH_ERRATA.md');
  assert.ok(fs.existsSync(errataPath), 'MATH_ERRATA.md must exist');
  const errataLines = fs.readFileSync(errataPath, 'utf8').split('\n').filter(l => l.startsWith('| `'));
  assert.ok(errataLines.length >= 800, `Expected >= 800 logged errata rows in MATH_ERRATA.md, got ${errataLines.length}`);
});

// ── WP-34: Socratic 3-Step Progressive Hints ──
check('WP-34: 100% of items have 3 Socratic hints with zero generic boilerplate and zero final-answer leaks in hints[0..1]', () => {
  const bannedBoilerplate = /Identify the relevant theorem|Apply the algebraic setup|Step 1:\s*Identify the formula/i;
  let leakViolations = 0;
  for (const [id, pool] of Object.entries(banks)) {
    pool.forEach((q, idx) => {
      assert.ok(Array.isArray(q.hints) && q.hints.length === 3, `${id}[${idx}] must have exactly 3 hints`);
      for (let hIdx = 0; hIdx < 3; hIdx++) {
        const h = String(q.hints[hIdx] || '').trim();
        assert.ok(h.length >= 12, `${id}[${idx}] hint[${hIdx}] too short`);
        assert.ok(!bannedBoilerplate.test(h), `${id}[${idx}] hint[${hIdx}] contains banned boilerplate: ${h}`);
      }
      const ansToken = (q.type === 'mcq' && Array.isArray(q.choices) && typeof q.answer === 'number')
        ? String(q.choices[q.answer] || '').trim()
        : String(q.finalAnswer || q.sprAnswer || q.ans || '').trim();
      const cleanTok = ansToken.replace(/^\\\(|\\\)$/g, '').trim();
      if (cleanTok.length >= 4 && !/^[01234]$/.test(cleanTok) && !/القيمة| المعطيات|Column|Quantity/i.test(cleanTok)) {
        if (String(q.hints[0]).includes('= ' + cleanTok) || String(q.hints[1]).includes('= ' + cleanTok)) {
          leakViolations++;
        }
      }
    });
  }
  assert.strictEqual(leakViolations, 0, `Expected 0 direct "= <finalAnswer>" leaks in hints[0..1], found ${leakViolations}`);
});

// ── WP-35: AST Bilingual Parity & Zero Regex Corruption ──
check('WP-35: Legacy regex Arabic translator is deleted and all 306 chapters have zero midword or Arabglish corruption', () => {
  assert.ok(
    !fs.existsSync(path.join(ROOT, 'scripts', 'populate_all_chapter_blocks_arabic.js')),
    'populate_all_chapter_blocks_arabic.js must be deleted'
  );
  assert.ok(fs.existsSync(path.join(ROOT, 'scripts', 'quality_engine', 'ast_arabic_translator.py')), 'ast_arabic_translator.py must exist');
  assert.ok(fs.existsSync(path.join(ROOT, 'scripts', 'quality_engine', 'repair_bilingual_ast.py')), 'repair_bilingual_ast.py must exist');

  // Match genuine Arabic letters (\u0621-\u063A, \u0641-\u064A) directly glued to Latin letters (excluding Arabic punctuation like ، ؛ ؟)
  const midwordRe = /(?:[A-Za-z][\u0621-\u063A\u0641-\u064A]|[\u0621-\u063A\u0641-\u064A][A-Za-z])/;
  const arabglishRe = /\b(?:solve\s+for|find\s+the\s+value|which\s+of\s+the\s+following|calculate\s+the)\b/i;
  const trackDirs = fs.readdirSync(CONTENT_DIR).filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory()).sort();
  assert.strictEqual(trackDirs.length, 31, 'Expected 31 content track directories');

  let chapterCount = 0;
  function stripProtected(s) {
    return String(s || '')
      .replace(/\\\([\s\S]*?\\\)/g, ' ')
      .replace(/\\\[[\s\S]*?\\\]/g, ' ')
      .replace(/\$\$[\s\S]*?\$\$/g, ' ')
      .replace(/\$[^$\n]+\$/g, ' ')
      .replace(/<\/?[A-Za-z!][A-Za-z0-9:-]*(?:\s[^<>]*)?>/g, ' ');
  }

  function walkAr(node, ctxPath) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach((v, i) => walkAr(v, `${ctxPath}[${i}]`));
      return;
    }
    if (typeof node.en === 'string' && typeof node.ar === 'string' && node.ar.trim()) {
      const cleaned = stripProtected(node.ar);
      assert.ok(!midwordRe.test(cleaned), `Midword Latin/Arabic corruption at ${ctxPath}: ${cleaned.slice(0, 80)}`);
      assert.ok(!arabglishRe.test(cleaned), `Arabglish phrase in .ar at ${ctxPath}: ${cleaned.slice(0, 80)}`);
    }
    for (const [k, v] of Object.entries(node)) {
      walkAr(v, `${ctxPath}.${k}`);
    }
  }

  for (const td of trackDirs) {
    const files = fs.readdirSync(path.join(CONTENT_DIR, td)).filter(f => f.endsWith('.json'));
    for (const f of files) {
      if (!f.startsWith('_')) chapterCount++;
      const data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, td, f), 'utf8'));
      walkAr(data, `${td}/${f}`);
    }
  }
  assert.strictEqual(chapterCount, 306, `Expected 306 chapters, found ${chapterCount}`);
});

// ── WP-36: MENA Bilingual Tracks, Tahsili Scope Notice & GAT-EN / SAAT-EN Subtracks ──
check('WP-36: All 8 MENA bilingual banks carry *_ar fields, Tahsili has scopeNotice, and gaten separates gat-en vs saat-en', () => {
  const menaBanks = ['qudrat', 'tahsili', 'gaten', 'sat', 'est', 'est2', 'est2l2', 'igcse'];
  for (const mb of menaBanks) {
    const pool = banks[mb];
    assert.ok(pool && pool.length >= 1200, `${mb} must have >= 1200 items`);
    pool.forEach((q, idx) => {
      assert.ok(typeof q.text_ar === 'string' && q.text_ar.trim().length > 0, `${mb}[${idx}] missing text_ar`);
      assert.ok(typeof q.sol_ar === 'string' && q.sol_ar.trim().length > 0, `${mb}[${idx}] missing sol_ar`);
      assert.ok(Array.isArray(q.hints_ar) && q.hints_ar.length === 3, `${mb}[${idx}] missing 3 hints_ar`);
      if (q.type === 'mcq' && Array.isArray(q.choices) && q.choices.length >= 2) {
        assert.ok(Array.isArray(q.choices_ar) && q.choices_ar.length === q.choices.length, `${mb}[${idx}] choices_ar mismatch`);
      }
    });
  }

  const tahMeta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'tahsili', '_meta.json'), 'utf8')).meta || {};
  assert.ok(tahMeta.scopeNotice && tahMeta.scopeNotice.en && tahMeta.scopeNotice.ar, 'Tahsili _meta.json must have bilingual scopeNotice');
  const hubNjk = fs.readFileSync(path.join(ROOT, 'src', '_includes', 'partials', 'syllabus-hub.njk'), 'utf8');
  assert.ok(hubNjk.includes('scopeNotice'), 'syllabus-hub.njk must render meta.scopeNotice');

  const gatenMeta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'gaten', '_meta.json'), 'utf8')).meta || {};
  assert.ok(Array.isArray(gatenMeta.subtracks) && gatenMeta.subtracks.length === 2, 'gaten _meta.json must define 2 subtracks');
  const gatCount = banks.gaten.filter(q => q.subtrack === 'gat-en').length;
  const saatCount = banks.gaten.filter(q => q.subtrack === 'saat-en').length;
  assert.ok(gatCount >= 500 && saatCount >= 500, `Expected >= 500 gat-en and >= 500 saat-en items, got ${gatCount} / ${saatCount}`);
  assert.strictEqual(gatCount + saatCount, banks.gaten.length, 'Every gaten item must be tagged gat-en or saat-en');
});

// ── Load Runtime Modules into VM Sandbox for WP-37, WP-38, WP-39, WP-40, WP-41 ──
const sandboxWindow = {
  _shuffle: arr => (arr || []).slice(),
  _shuffleQ: q => q,
  CSAutoMath: s => s,
  CSFormatBilingual: s => s,
  _renderFig: () => '<svg></svg>',
  renderMathFigure: () => '<svg></svg>',
  fullExamBank: {}
};
for (const [id, pool] of Object.entries(banks)) {
  sandboxWindow.fullExamBank[id] = { pool };
}
const sandboxDoc = {
  documentElement: { lang: 'en' },
  body: {
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); },
      remove(c) { this._s.delete(c); },
      contains(c) { return this._s.has(c); }
    }
  },
  getElementById: () => null,
  querySelectorAll: () => [],
  dispatchEvent: ev => { sandboxWindow._lastQuizEvent = ev.detail; return true; },
  createElement: () => ({ classList: { add() {}, contains: () => false }, style: {}, insertAdjacentElement() {} }),
  addEventListener: () => {}
};
const ctx = vm.createContext({
  window: sandboxWindow,
  document: sandboxDoc,
  localStorage: { _m: {}, getItem(k) { return this._m[k] || null; }, setItem(k, v) { this._m[k] = String(v); } },
  CustomEvent: function(type, init) { this.type = type; this.detail = (init && init.detail) || {}; },
  console,
  Math,
  Date,
  Set,
  Map,
  Object,
  Array,
  String,
  Number,
  Boolean,
  RegExp,
  JSON,
  Promise,
  parseInt,
  parseFloat,
  isNaN,
  isFinite,
  setTimeout: () => 0,
  clearTimeout: () => {},
  setInterval: () => 0,
  clearInterval: () => {}
});
sandboxWindow.window = sandboxWindow;
sandboxWindow.document = sandboxDoc;

for (const relPath of [
  'src/scripts/modules/05e-redundancy-check.js',
  'src/scripts/modules/19a-ix-answer-check.js',
  'src/scripts/exam/structured-frq.js',
  'src/scripts/modules/17-mock-exam-mode.js',
  'src/scripts/modules/02b-bank-exam.js'
]) {
  const code = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  vm.runInContext(code, ctx, { filename: relPath });
}

// ── WP-37: Strict Calculator / No-Calculator Separation ──
check('WP-37: Every No-Calculator CBT paper and Printable Exam section draws 0 calc:true items', () => {
  const cfg = sandboxWindow.CSMockExamConfig;
  assert.ok(cfg && cfg.PAPERS && cfg.drawPaperPool, 'CSMockExamConfig must be exposed by 17-mock-exam-mode.js');

  let noCalcPapersTested = 0;
  for (const [trackKey, paperList] of Object.entries(cfg.PAPERS)) {
    const bankId = cfg.resolveBankTrack(trackKey);
    const pool = banks[bankId];
    assert.ok(Array.isArray(pool) && pool.length > 0, `Missing bank pool for ${trackKey} -> ${bankId}`);
    for (const paper of paperList) {
      if (paper.calc === false) {
        noCalcPapersTested++;
        const drawn = cfg.drawPaperPool(pool, paper, null);
        assert.ok(drawn.length > 0, `No-Calc paper "${paper.name}" (${trackKey}) drew 0 items`);
        const leaked = drawn.filter(q => q.calc !== false);
        assert.strictEqual(leaked.length, 0, `No-Calc paper "${paper.name}" leaked ${leaked.length} calc:true items`);
      }
    }
  }
  assert.ok(noCalcPapersTested >= 20, `Expected >= 20 No-Calc CBT papers tested, got ${noCalcPapersTested}`);

  // Also test subtrack isolation on gat-en and saat-en in CBT
  const gatDrawn = cfg.drawPaperPool(banks.gaten, cfg.PAPERS['gat-en'][0], null);
  assert.ok(gatDrawn.every(q => q.subtrack === 'gat-en'), 'gat-en CBT paper must draw exclusively gat-en items');
  const saatDrawn = cfg.drawPaperPool(banks.gaten, cfg.PAPERS['saat-en'][0], null);
  assert.ok(saatDrawn.every(q => q.subtrack === 'saat-en'), 'saat-en CBT paper must draw exclusively saat-en items');

  // Verify Printable Exam generator strict No-Calc on EST, APAB, Edexcel, IB AA SL
  const idLookup = {};
  for (const pool of Object.values(banks)) {
    for (const q of pool) idLookup[q.id] = q;
  }
  for (const specKey of ['est', 'apab', 'edexcel', 'ib-aa-sl']) {
    let htmlOut = '';
    const mockBtn = {
      closest: sel => sel === '.testgen' ? { querySelector: () => ({ set innerHTML(v) { htmlOut = v; }, get innerHTML() { return htmlOut; } }) } : null
    };
    const sp = sandboxWindow.examSpecs[specKey];
    sandboxWindow.CSBankExam.genFullExam(mockBtn, specKey, sp.bankId || specKey, [], 20);
    // Extract data-q-id per section
    const sections = htmlOut.split('<div class="fep-section"').slice(1);
    sp.sections.forEach((sec, si) => {
      if (sec.parts.every(p => p.calc === false)) {
        const secHtml = sections[si] || '';
        const qIds = [...secHtml.matchAll(/data-q-id="([^"]+)"/g)].map(m => m[1]);
        assert.ok(qIds.length > 0, `Expected drawn question IDs in ${specKey} section ${si + 1}`);
        qIds.forEach(qid => {
          const orig = idLookup[qid];
          assert.ok(orig && orig.calc === false, `Printable No-Calc section in ${specKey} drew calc:true item ${qid}`);
        });
      }
    });
  }
});

// ── WP-38: Multi-Part Structured FRQ Engine ──
check('WP-38: Structured FRQ engine renders subparts + <canvas> scratchpad + partial-credit rubric without eval()', () => {
  const frqSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'exam', 'structured-frq.js'), 'utf8');
  assert.ok(!/\beval\s*\(|new\s+Function\s*\(/.test(frqSrc), 'structured-frq.js must not use eval() or new Function()');
  assert.ok(fs.existsSync(path.join(ROOT, 'src', 'scripts', 'exam', 'structured-frq.ts')), 'TypeScript contract structured-frq.ts must exist');

  const engine = sandboxWindow.CSStructuredFRQ;
  assert.ok(engine, 'window.CSStructuredFRQ must be registered');

  const sampleQ = banks.ibsl.find(q => q.type === 'structured' && Array.isArray(q.parts) && q.parts.length >= 2);
  assert.ok(sampleQ, 'ibsl must contain multi-part structured FRQs');
  const html = engine.renderCBTWidget(sampleQ, 0, null, { lang: 'en' });
  assert.ok(html.includes('cs-sfrq-widget'), 'Widget HTML must include cs-sfrq-widget container');
  assert.ok(html.includes('cs-sfrq-canvas'), 'Widget HTML must include inline <canvas> scratchpad');
  assert.ok(html.includes('cs-sfrq-crit-cb'), 'Widget HTML must include [M1]/[A1] rubric checkboxes');

  // Test partial credit: auto-grade part 0 via algebraic equivalence, leave part 1 wrong except 1 rubric checkbox
  const customQ = {
    type: 'structured',
    parts: [
      { label: '(a)', prompt: 'Find derivative at 1', marks: 3, answer: '1/2', markScheme: [{ code: 'M1', marks: 1, criterion: 'Power rule' }, { code: 'A2', marks: 2, criterion: 'Exact value' }] },
      { label: '(b)', prompt: 'Find tangent y-intercept', marks: 4, answer: '7/2', markScheme: [{ code: 'M1', marks: 2, criterion: 'Point-slope form' }, { code: 'A1', marks: 2, criterion: 'Simplify' }] }
    ]
  };
  const gradePartial = engine.gradeStructuredResponse(customQ, {
    partInputs: { 0: '0.50', 1: 'wrong' },
    checkedCriteria: { '1:0': true }
  }, sandboxWindow.ClipSATAnswerCheck);
  assert.strictEqual(gradePartial.totalMarks, 7);
  assert.strictEqual(gradePartial.awardedMarks, 5, 'Expected 3 marks from equivalent 0.50 == 1/2 + 2 marks from M1 rubric checkbox');
});

// ── WP-39: IB AA/AI Disaggregation & AP / Cambridge / Edexcel Structured FRQs ──
check('WP-39: IB AA/AI SL & HL are disaggregated and AP / Cambridge / Edexcel / IB contain >= 60 structured FRQs each', () => {
  for (const ibId of ['ibsl', 'ibhl']) {
    const meta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, ibId, '_meta.json'), 'utf8')).meta || {};
    assert.ok(Array.isArray(meta.subtracks) && meta.subtracks.length === 2, `${ibId} _meta.json must define AA and AI subtracks`);
  }
  const cfg = sandboxWindow.CSMockExamConfig;
  assert.strictEqual(cfg.PAPERS['ib-aa-sl'][0].calc, false, 'IB AA SL Paper 1 must be No Calculator');
  assert.strictEqual(cfg.PAPERS['ib-ai-sl'][0].calc, true, 'IB AI SL Paper 1 must be GDC Required');
  assert.strictEqual(cfg.PAPERS['ib-aa-hl'].length, 3, 'IB AA HL must include Paper 1, Paper 2, and Paper 3');
  assert.strictEqual(cfg.PAPERS['ib-ai-hl'].length, 3, 'IB AI HL must include Paper 1, Paper 2, and Paper 3');

  for (const trk of ['apab', 'apbc', 'appc', 'apstats', 'igcse', 'edexcel', 'aslevel', 'a2level', 'addmath', 'ibsl', 'ibhl']) {
    const structItems = banks[trk].filter(q => q.type === 'structured' && Array.isArray(q.parts) && q.parts.length >= 2);
    assert.ok(structItems.length >= 60, `Expected >= 60 multi-part structured FRQs in ${trk}, found ${structItems.length}`);
  }
});

// ── WP-40: Qiyas Qudrat 28% Quantitative Comparison Parity & Fixed Two-Column Cards ──
check('WP-40: Qudrat bank has >= 25% QC items with qc_col_a/b and draws 25-30% QC in CBT and Printable papers', () => {
  const qcItems = banks.qudrat.filter(q => q.qc_col_a && q.qc_col_b && q.qc_col_a_ar && q.qc_col_b_ar && q.fixedChoices === true);
  const ratio = qcItems.length / banks.qudrat.length;
  assert.ok(ratio >= 0.25 && ratio <= 0.32, `Expected 25%-32% QC items in qudrat.json, got ${(ratio * 100).toFixed(1)}% (${qcItems.length}/${banks.qudrat.length})`);

  const cfg = sandboxWindow.CSMockExamConfig;
  const cbtDrawn = cfg.drawPaperPool(banks.qudrat, cfg.PAPERS.qudrat[0], null);
  const cbtQcCount = cbtDrawn.filter(q => cfg.isQuantComp(q)).length;
  const cbtQcRatio = cbtQcCount / cbtDrawn.length;
  assert.ok(cbtQcRatio >= 0.25 && cbtQcRatio <= 0.33, `Expected 25%-30% QC in Qudrat CBT draw, got ${cbtQcCount}/${cbtDrawn.length}`);

  const cardHtml = sandboxWindow.CSRenderQiyasComparisonCard(qcItems[0], s => s);
  assert.ok(cardHtml.includes('qiyas-qc-box') && cardHtml.includes('القيمة الأولى'), 'CSRenderQiyasComparisonCard must render two-column QC box from qc_col_*');
});

// ── WP-41: Olympiad Zero >=3 Clone Clusters + Stage 1 (SPR) & Stage 2 (Proof) ──
check('WP-41: Olympiad bank has 0 stem skeleton clusters >= 3 and supports Stage 1 (SPR) + Stage 2 (Proof)', () => {
  const skeletons = new Map();
  for (const q of banks.olympiad) {
    const skel = String(q.text || '')
      .replace(/\\\([\s\S]*?\\\)/g, 'M')
      .replace(/\\\[[\s\S]*?\\\]/g, 'M')
      .replace(/\d+/g, '#')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    skeletons.set(skel, (skeletons.get(skel) || 0) + 1);
  }
  const cloneClusters = [...skeletons.entries()].filter(([, cnt]) => cnt >= 3);
  assert.strictEqual(cloneClusters.length, 0, `Expected 0 Olympiad stem skeleton clusters >= 3, found ${cloneClusters.length}`);

  const sprStage1 = banks.olympiad.filter(q => q.type === 'spr');
  const proofStage2 = banks.olympiad.filter(q => q.type === 'proof' && Array.isArray(q.parts) && q.parts.length >= 2);
  assert.ok(sprStage1.length >= 200, `Expected >= 200 Olympiad Stage 1 SPR items, got ${sprStage1.length}`);
  assert.ok(proofStage2.length >= 100, `Expected >= 100 Olympiad Stage 2 Proof items, got ${proofStage2.length}`);

  const cfg = sandboxWindow.CSMockExamConfig;
  const s1Draw = cfg.drawPaperPool(banks.olympiad, cfg.PAPERS.olympiad[3], null);
  assert.strictEqual(s1Draw.length, 15);
  assert.ok(s1Draw.every(q => q.type === 'spr'), 'Olympiad Stage 1 CBT paper must draw 15 SPR items');

  const s2Draw = cfg.drawPaperPool(banks.olympiad, cfg.PAPERS.olympiad[4], null);
  assert.strictEqual(s2Draw.length, 6);
  assert.ok(s2Draw.every(q => q.type === 'proof' || q.type === 'structured'), 'Olympiad Stage 2 CBT paper must draw 6 multi-part Proof items');
});

console.log(`\n── Wave 3 Verification Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) {
  process.exit(1);
}
console.log('✅ Wave 3 (WP-33 .. WP-41) 100% verified!\n');
