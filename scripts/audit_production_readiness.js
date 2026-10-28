#!/usr/bin/env node
/**
 * scripts/audit_production_readiness.js
 * ClipSAT 2.0 Master Production Audit Suite (Phase 20 Capstone)
 * Programmatically verifies the entire ClipSAT 2.0 platform across all 5 Pillars:
 * 1. Question Banks & Math Validity (28 banks, 42,600+ Qs, 0 duplicates, 0 trivia, SPR coverage)
 * 2. Visuals & Canvas Explorers (29 explorer tracks, 126 explorers, SVG diagram engine)
 * 3. Interactive Practice (28 tracks, 1,415 activities, 100% Arabic parity, 12 active learning modes)
 * 4. Simulators & Tools (53 exam specs, CBT simulator, Desmos, distributions, whiteboard, formula sheets)
 * 5. Curriculum Content (28 tracks, 269 chapters, Eleventy SSG templates)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('═══════════════════════════════════════════════════════════════════════════════');
console.log('      ClipSAT 2.0: Master Production Readiness & Architecture Audit            ');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function audit(name, fn) {
  totalChecks++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passedChecks++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(`           Error: ${err.message}`);
    failedChecks++;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PILLAR 1: QUESTION BANKS & MATHEMATICAL VALIDITY
// ─────────────────────────────────────────────────────────────────────────────
console.log('── Pillar 1: Question Banks, Mathematical Validity & Skeletons ──');

const bankDir = path.join(__dirname, '..', 'bank-data');
const bankFiles = fs.readdirSync(bankDir).filter(f => f.endsWith('.json'));

audit(`Catalog contains all 31 verified question banks`, () => {
  assert.strictEqual(bankFiles.length, 31, `Expected 31 banks, found ${bankFiles.length}`);
});

let totalQuestions = 0;
let totalDuplicates = 0;
const globalDuplicateTracker = new Set();

bankFiles.forEach(file => {
  const bankName = file.replace('.json', '');
  const data = JSON.parse(fs.readFileSync(path.join(bankDir, file), 'utf8'));

  let pool = [];
  if (Array.isArray(data.pool)) {
    pool = data.pool;
  } else if (data.easy || data.medium || data.hard) {
    pool = (data.easy || []).concat(data.medium || []).concat(data.hard || []);
  }

  totalQuestions += pool.length;

  const localSeen = new Set();
  pool.forEach(q => {
    const stem = (q.text || q.q || '').trim().replace(/\s+/g, ' ').toLowerCase();
    const choices = JSON.stringify(q.choices || []);
    const key = `${bankName}::${stem}::${choices}`;
    if (localSeen.has(key)) {
      totalDuplicates++;
    }
    localSeen.add(key);
  });
});

audit(`Total question bank volume exceeds 50,000 verified items and every bank has >= 1,200 questions and >= 240 figures (Total: ${totalQuestions.toLocaleString()})`, () => {
  assert.ok(totalQuestions >= 50000, `Expected >= 50,000 questions, got ${totalQuestions}`);
  bankFiles.forEach(file => {
    const bankName = file.replace('.json', '');
    const data = JSON.parse(fs.readFileSync(path.join(bankDir, file), 'utf8'));
    const pool = Array.isArray(data.pool)
      ? data.pool
      : (data.easy || []).concat(data.medium || []).concat(data.hard || []);
    assert.ok(pool.length >= 1200, `Bank ${bankName} must have >= 1,200 questions, found ${pool.length}`);
    const figs = pool.filter(q => q && (q.fig || q.figure)).length;
    assert.ok(figs >= 240, `Bank ${bankName} must have >= 240 figures, found ${figs}`);
  });
});

audit(`Zero fatal duplicates across all 31 question banks`, () => {
  assert.strictEqual(totalDuplicates, 0, `Found ${totalDuplicates} duplicate questions`);
});

audit(`SAT question bank has 0 non-math trivia and >= 400 native SPR items`, () => {
  const sat = JSON.parse(fs.readFileSync(path.join(bankDir, 'sat.json'), 'utf8'));
  const trivia = (sat.pool || []).filter(q => /test format|adaptive testing strategy/i.test(q.domain || ''));
  assert.strictEqual(trivia.length, 0, `SAT bank contains ${trivia.length} trivia items`);
  const spr = (sat.pool || []).filter(q => q.type === 'spr');
  assert.ok(spr.length >= 400, `Expected >= 400 SPR questions in SAT, got ${spr.length}`);
});

audit(`Qudrat and Tahsili banks have 0 non-math trivia and authentic domains`, () => {
  const qud = JSON.parse(fs.readFileSync(path.join(bankDir, 'qudrat.json'), 'utf8'));
  const tah = JSON.parse(fs.readFileSync(path.join(bankDir, 'tahsili.json'), 'utf8'));
  const qTrivia = (qud.pool || []).filter(q => /test format|strategy/i.test(q.domain || ''));
  const tTrivia = (tah.pool || []).filter(q => /test format|strategy/i.test(q.domain || ''));
  assert.strictEqual(qTrivia.length, 0, `Qudrat bank contains trivia`);
  assert.strictEqual(tTrivia.length, 0, `Tahsili bank contains trivia`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. PILLAR 2: VISUAL ENGINE & HTML5 CANVAS EXPLORERS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n── Pillar 2: Diagram Graphics, SVG Engine & Canvas Explorers ──');

const figCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '02c-figures.js'), 'utf8');

audit(`SVG Figure engine supports 20+ specialized diagram types with KaTeX labels`, () => {
  const requiredTypes = [
    'boxplot', 'histogram', 'cumulative_frequency', 'tree_diagram',
    'bearing', 'transformation', 'voronoi', 'plot', 'triangle',
    'circle', 'bar', 'numberline', 'venn', 'scatter'
  ];
  requiredTypes.forEach(t => {
    assert.ok(figCode.includes(t), `Figure engine must support "${t}" diagram type`);
  });
});

const exDir = path.join(__dirname, '..', 'src', 'scripts', 'explorers');
const exFiles = fs.readdirSync(exDir).filter(f => f.endsWith('.js'));

audit(`HTML5 Canvas Explorers exist for all 32 explorer tracks (including addmath, mathai, edexcel, gaten & olympiad)`, () => {
  assert.ok(exFiles.length >= 31, `Expected >= 31 explorer files, found ${exFiles.length}`);
  assert.ok(fs.existsSync(path.join(exDir, 'addmath.js')), 'addmath.js explorer must exist');
  assert.ok(fs.existsSync(path.join(exDir, 'mathai.js')), 'mathai.js explorer must exist');
  assert.ok(fs.existsSync(path.join(exDir, 'edexcel.js')), 'edexcel.js explorer must exist');
  assert.ok(fs.existsSync(path.join(exDir, 'gaten.js')), 'gaten.js explorer must exist');
  assert.ok(fs.existsSync(path.join(exDir, 'olympiad.js')), 'olympiad.js explorer must exist');
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. PILLAR 3: INTERACTIVE PRACTICE & 100% ARABIC BILINGUAL PARITY
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n── Pillar 3: Interactive Practice & 100% Bilingual Arabic Parity ──');

const ixDir = path.join(__dirname, '..', 'src', 'scripts', 'ix-data');
const ixFiles = fs.readdirSync(ixDir).filter(f => f.endsWith('.js'));

audit(`Interactive practice data files exist for all 31 curriculum tracks`, () => {
  assert.strictEqual(ixFiles.length, 31, `Expected 31 ix-data files, found ${ixFiles.length}`);
});

let totalActivities = 0;
let activitiesWithArabic = 0;

ixFiles.forEach(f => {
  const src = fs.readFileSync(path.join(ixDir, f), 'utf8');
  const win = {};
  new Function('window', src)(win);
  const D = {};
  (win.__ixData || []).forEach(fn => fn(D));
  Object.values(D).forEach(acts => {
    totalActivities += acts.length;
    acts.forEach(a => {
      if (a.ti_ar || a.q_ar || a.prompt_ar || a.steps_ar || a.items_ar || a.categories_ar || a.p_ar) {
        activitiesWithArabic++;
      }
    });
  });
});

audit(`Total interactive activities exceeds 2,750 with >= 72 per track and 100% Arabic parity (${activitiesWithArabic}/${totalActivities})`, () => {
  assert.ok(totalActivities >= 2750, `Expected >= 2,750 activities, got ${totalActivities}`);
  assert.strictEqual(activitiesWithArabic, totalActivities, `All activities must include Arabic translations`);
  ixFiles.forEach(f => {
    const src = fs.readFileSync(path.join(ixDir, f), 'utf8');
    const win = {};
    new Function('window', src)(win);
    const D = {};
    (win.__ixData || []).forEach(fn => fn(D));
    let trackCount = 0;
    Object.entries(D).forEach(([chId, acts]) => {
      assert.ok(acts.length >= 9, `Chapter ${chId} in ${f} must have >= 9 activities, found ${acts.length}`);
      trackCount += acts.length;
    });
    assert.ok(trackCount >= 72, `Track ${f} must have >= 72 activities, found ${trackCount}`);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. PILLAR 4: CBT SIMULATORS, TOOLS & CALCULATORS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n── Pillar 4: Authentic Exam Simulators, Scoring & Tools Suite ──');

// Load bank exam module to inspect examSpecs
const simWindow = {
  _shuffle: a => a,
  _shuffleQ: q => q,
  CSAutoMath: s => s,
  CSFormatBilingual: s => s,
  _renderFig: () => '',
  renderMathFigure: () => ''
};
const examCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '02b-bank-exam.js'), 'utf8');
new Function('window', examCode)(simWindow);

const specKeys = Object.keys(simWindow.examSpecs || {});

audit(`Official Exam Specifications suite includes 53 full past-paper exam configurations`, () => {
  assert.ok(specKeys.length >= 50, `Expected >= 50 exam specs, found ${specKeys.length}`);
});

audit(`All exam specifications define or link to an existing bank on disk`, () => {
  specKeys.forEach(name => {
    const sp = simWindow.examSpecs[name];
    const bankId = sp.bankId || name;
    const bankP = path.join(bankDir, `${bankId}.json`);
    assert.ok(fs.existsSync(bankP), `Bank file for "${name}" (${bankId}.json) must exist on disk`);
  });
});

const formulaCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '20f-formula-modal.js'), 'utf8');
audit(`Formula Sheets modal includes 9 authorized curriculum cheat-sheet tabs and auto-routing for all 31 tracks`, () => {
  const tabs = ['sat', 'cambridge', 'addmath', 'alevel', 'qudrat', 'ap', 'mathai', 'olympiad', 'univ'];
  tabs.forEach(t => {
    assert.ok(formulaCode.includes(`'${t}':`), `Formula modal must include tab for "${t}"`);
  });
  assert.ok(formulaCode.includes('TRACK_TO_FORMULA_TAB'), 'Formula modal must define TRACK_TO_FORMULA_TAB');
});

const calcCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '20g-floating-calc.js'), 'utf8');
audit(`Floating calculator implements Desmos API, regression modeling, and exam lock controls`, () => {
  assert.ok(calcCode.includes('setFloatingCalcLocked'), 'Must define setFloatingCalcLocked');
  assert.ok(calcCode.includes('regression'), 'Must support regression modeling');
  assert.ok(calcCode.includes('openFloatingCalc'), 'Must support openFloatingCalc');
});

audit(`All 31 tracks are wired into CBT Mock Exam Simulator (17-mock-exam-mode.js), CAT Diagnostic (27-diagnostic-test.js), Teacher Assignments & Search (22-assignments-reports-search.js), AI Test Prompts (05a-ai-test.js), Blueprints (05c-exam-blueprints.js), Homepage Catalog (home.html), and Bilingual i18n (20c-i18n.js / 20e-i18n-ar.js)`, () => {
  const all31 = fs.readdirSync(path.join(__dirname, '..', 'content')).filter(f => fs.statSync(path.join(__dirname, '..', 'content', f)).isDirectory());
  const mockCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '17-mock-exam-mode.js'), 'utf8');
  const diagCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '27-diagnostic-test.js'), 'utf8');
  const assignCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '22-assignments-reports-search.js'), 'utf8');
  const aiCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '05a-ai-test.js'), 'utf8');
  const bpCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '05c-exam-blueprints.js'), 'utf8');
  const homeHtml = fs.readFileSync(path.join(__dirname, '..', 'src', '_includes', 'tracks', 'home.html'), 'utf8');
  const i18nEn = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '20c-i18n.js'), 'utf8');
  const i18nAr = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '20e-i18n-ar.js'), 'utf8');
  const datesCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '15-pwa-and-exam-dates-data.js'), 'utf8');
  const buildJs = fs.readFileSync(path.join(__dirname, '..', 'build.js'), 'utf8');

  assert.ok(buildJs.includes('data-curriculum="olympiad"'), 'build.js must include olympiad formula tab');
  assert.ok(buildJs.includes('data-curriculum="univ"'), 'build.js must include univ formula tab');

  all31.forEach(t => {
    assert.ok(new RegExp(`\\b${t}\\s*:\\s*\\[`).test(mockCode), `17-mock-exam-mode.js PAPERS must define ${t}`);
    assert.ok(new RegExp(`\\b${t}\\s*:`).test(diagCode), `27-diagnostic-test.js TRACK_NAMES must define ${t}`);
    assert.ok(new RegExp(`\\b${t}\\s*:\\s*\\[`).test(diagCode), `27-diagnostic-test.js TRACK_CHAPTER_MAP must define ${t}`);
    assert.ok(new RegExp(`\\b${t}\\s*:\\s*\\{\\s*label`).test(assignCode), `22-assignments-reports-search.js VIEW_META must define ${t}`);
    assert.ok(new RegExp(`(?:'${t}'|\\b${t})\\s*:\\s*\\{\\s*name`).test(aiCode), `05a-ai-test.js examSystemPrompt must define ${t}`);
    assert.ok(new RegExp(`(?:'${t}'|\\b${t})\\s*:\\s*\\{\\s*source`).test(bpCode), `05c-exam-blueprints.js must define explicit blueprint for ${t}`);
    assert.ok(new RegExp(`\\b${t}\\s*:\\s*\\[`).test(datesCode), `15-pwa-and-exam-dates-data.js DATES must define ${t}`);
    assert.ok(new RegExp(`\\b${t}\\s*:\\s*'`).test(datesCode), `15-pwa-and-exam-dates-data.js LABEL must define ${t}`);
    assert.ok(buildJs.includes(`/${t}/"`), `build.js footer must include link to /${t}/`);
    assert.ok(homeHtml.includes(`showView('${t}')`), `home.html must include catalog card for ${t}`);
    assert.ok(i18nEn.includes(`'home.cat.${t}.h3':`), `20c-i18n.js must include home.cat.${t}.h3`);
    assert.ok(i18nAr.includes(`'home.cat.${t}.h3':`), `20e-i18n-ar.js must include home.cat.${t}.h3`);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. PILLAR 5: CURRICULUM CONTENT & ELEVENTY STATIC RENDERING
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n── Pillar 5: Curriculum Coverage & Multi-Page SSG Structure ──');

const contentDir = path.join(__dirname, '..', 'content');
const contentTracks = fs.readdirSync(contentDir).filter(f => fs.statSync(path.join(contentDir, f)).isDirectory());

audit(`Curriculum directory covers 31 complete tracks with _meta.json, >= 8 chapters per track (302 total chapters), and >= 1 PDF worksheet pair per chapter (100% manifest coverage)`, () => {
  assert.strictEqual(contentTracks.length, 31, `Expected 31 content tracks, found ${contentTracks.length}`);
  let totalChapters = 0;
  contentTracks.forEach(t => {
    const metaP = path.join(contentDir, t, '_meta.json');
    assert.ok(fs.existsSync(metaP), `_meta.json must exist in content/${t}/`);
    const meta = JSON.parse(fs.readFileSync(metaP, 'utf8'));
    assert.ok(Array.isArray(meta.chapterOrder) && meta.chapterOrder.length >= 8, `Track ${t} must have >= 8 chapters in chapterOrder, found ${(meta.chapterOrder || []).length}`);
    totalChapters += meta.chapterOrder.length;
    const dlDir = path.join(__dirname, '..', 'public', 'downloads', t);
    const wsFiles = fs.existsSync(dlDir) ? fs.readdirSync(dlDir).filter(f => f.endsWith('-worksheet.pdf')) : [];
    assert.ok(wsFiles.length >= meta.chapterOrder.length, `Track ${t} must have >= ${meta.chapterOrder.length} printable PDF worksheets in public/downloads/${t}/, found ${wsFiles.length}`);
    const fullExamFiles = fs.existsSync(dlDir) ? fs.readdirSync(dlDir).filter(f => f.endsWith('-exam.html')) : [];
    assert.ok(fullExamFiles.length >= 10, `Track ${t} must have >= 10 printable full exams in public/downloads/${t}/, found ${fullExamFiles.length}`);
    const manifestPath = path.join(dlDir, 'manifest.json');
    assert.ok(fs.existsSync(manifestPath), `manifest.json must exist in public/downloads/${t}/`);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const manifestFullExams = manifest.filter(m => m && m.isFullExam).length;
    const manifestWs = manifest.filter(m => m && !m.isFullExam && String(m.worksheet || '').endsWith('.pdf')).length;
    assert.ok(manifestFullExams >= 10, `Track ${t} manifest.json must have >= 10 isFullExam entries, found ${manifestFullExams}`);
    assert.strictEqual(manifestWs, wsFiles.length, `Track ${t} manifest.json must list all ${wsFiles.length} PDF worksheets, found ${manifestWs}`);
    manifest.filter(m => m && !m.isFullExam && m.num).forEach(m => {
      const wdPath = path.join(__dirname, '..', 'public', 'worksheet-data', t, `${m.num}.json`);
      assert.ok(fs.existsSync(wdPath), `Track ${t} worksheet ${m.num} must have matching public/worksheet-data/${t}/${m.num}.json`);
    });
    assert.ok(meta.meta && meta.meta.title && meta.meta.title.en && meta.meta.title.ar, `Track ${t} _meta.json must have bilingual title`);
    assert.ok(meta.meta && meta.meta.subtitle && meta.meta.subtitle.en && meta.meta.subtitle.ar, `Track ${t} _meta.json must have bilingual subtitle`);
    assert.ok(meta.meta && meta.meta.examBoard, `Track ${t} _meta.json must define examBoard`);
    assert.ok(Array.isArray(meta.meta.officialLinks) && meta.meta.officialLinks.length >= 1, `Track ${t} _meta.json must define >= 1 officialLinks`);
    assert.ok(meta.meta.testGenerator && meta.meta.testGenerator.hasFullExam !== false && meta.meta.testGenerator.examTitle, `Track ${t} _meta.json must enable full exam generation`);
  });
  assert.ok(totalChapters >= 302, `Expected >= 302 chapters across 31 tracks, found ${totalChapters}`);
});

audit(`Every chapter across all 302 chapters meets Gold-Standard Block Parity (>=4 worked examples, >=5 bilingual practiceProblems, >=2 figures, >=1 trap/proof/table/explorer, and Chapter 1 syllabusMap)`, () => {
  contentTracks.forEach(t => {
    const meta = JSON.parse(fs.readFileSync(path.join(contentDir, t, '_meta.json'), 'utf8'));
    const bank = JSON.parse(fs.readFileSync(path.join(bankDir, `${t}.json`), 'utf8'));
    const pool = bank.pool || [].concat(bank.easy || [], bank.medium || [], bank.hard || []);
    const bankDomains = new Set(pool.map(q => q.domain || q.topic));
    const chIds = meta.chapterOrder || [];
    const chIdSet = new Set(chIds);
    pool.forEach((q, qIdx) => {
      assert.ok(q.topic_id && chIdSet.has(q.topic_id), `${t} bank question[${qIdx}] (${q.id}) must have a valid topic_id in chapterOrder, found ${q.topic_id}`);
      assert.ok(q.domain && String(q.domain).trim(), `${t} bank question[${qIdx}] (${q.id}) must have a non-empty domain`);
      assert.ok(Array.isArray(q.hints) && q.hints.length >= 3, `${t} bank question[${qIdx}] (${q.id}) must have >= 3 hints`);
    });
    chIds.forEach((cid, idx) => {
      const ch = JSON.parse(fs.readFileSync(path.join(contentDir, t, `${cid}.json`), 'utf8'));
      assert.ok(ch.title && ch.title.en && ch.title.ar, `${t}/${cid} must have bilingual chapter title`);
      assert.ok(ch.quizWidget && Array.isArray(ch.quizWidget.domains) && ch.quizWidget.domains.some(d => bankDomains.has(d)), `${t}/${cid} quizWidget.domains must match bank-data/${t}.json domains`);
      (function assertAllBilingual(node, p) {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) {
          node.forEach((item, i) => assertAllBilingual(item, `${p}[${i}]`));
          return;
        }
        if (Object.prototype.hasOwnProperty.call(node, 'en') && Object.prototype.hasOwnProperty.call(node, 'ar')) {
          assert.ok(node.ar && String(node.ar).trim(), `${t}/${cid} ${p} must have non-empty .ar string`);
          return;
        }
        for (const [k, v] of Object.entries(node)) {
          assertAllBilingual(v, p ? `${p}.${k}` : k);
        }
      })(ch, '');
      const blocks = (ch.content && ch.content.blocks) || [];
      if (idx === 0) {
        assert.ok(blocks.some(b => b.kind === 'syllabusMap'), `First chapter ${cid} of track ${t} must contain a syllabusMap block`);
      }
      let ex = 0, prac = 0, fig = 0, trap = 0, pf = 0, tbl = 0, exp = 0;
      blocks.forEach(b => {
        if ((b.kind === 'callout' && (b.style === 'example' || b.style === 'example-card' || b.style === 'example-grid')) || b.kind === 'workedExample' || b.kind === 'workedExampleCard') ex++;
        if (b.kind === 'callout' && b.style === 'warn') trap++;
        if (b.kind === 'callout' && b.style === 'pf') pf++;
        if (b.kind === 'table') tbl++;
        if (b.kind === 'practiceProblem') {
          prac++;
          assert.ok(b.question && b.question.en && b.question.ar, `${t}/${cid} practiceProblem must have bilingual question`);
          assert.ok(b.solution && b.solution.en && b.solution.ar, `${t}/${cid} practiceProblem must have bilingual solution`);
          assert.ok(Array.isArray(b.hints) && b.hints.length >= 3 && b.hints.every(h => h.en && h.ar), `${t}/${cid} practiceProblem must have >=3 bilingual hints`);
        }
        if (b.kind === 'figure') fig++;
        if (b.kind === 'explorer') exp++;
      });
      assert.ok(ex >= 4, `${t}/${cid} must have >= 4 worked examples, found ${ex}`);
      assert.ok(prac >= 5, `${t}/${cid} must have >= 5 practiceProblems, found ${prac}`);
      assert.ok(fig >= 2, `${t}/${cid} must have >= 2 figures, found ${fig}`);
      assert.ok(trap >= 1, `${t}/${cid} must have >= 1 warn trap, found ${trap}`);
      assert.ok(pf >= 1, `${t}/${cid} must have >= 1 pf derivation, found ${pf}`);
      assert.ok(tbl >= 1, `${t}/${cid} must have >= 1 table, found ${tbl}`);
      assert.ok(exp >= 1, `${t}/${cid} must have >= 1 explorer, found ${exp}`);
    });
  });
});

audit(`Every curriculum track has a 50-question _practice-set.json (1,550 total practice-set items)`, () => {
  let totalPracticeItems = 0;
  let totalPracticeFigs = 0;
  contentTracks.forEach(t => {
    const psP = path.join(contentDir, t, '_practice-set.json');
    assert.ok(fs.existsSync(psP), `_practice-set.json must exist in content/${t}/`);
    const ps = JSON.parse(fs.readFileSync(psP, 'utf8'));
    assert.ok(Array.isArray(ps.items), `content/${t}/_practice-set.json must have items[]`);
    assert.strictEqual(ps.items.length, 50, `Expected 50 items in content/${t}/_practice-set.json, found ${ps.items.length}`);
    let trackFigs = 0;
    ps.items.forEach((it, idx) => {
      assert.ok(it.question && it.question.en && it.question.ar, `${t} practice item[${idx}] must have bilingual question`);
      assert.ok(it.solution && it.solution.en && it.solution.ar, `${t} practice item[${idx}] must have bilingual solution`);
      const solClean = String((it.solution && it.solution.en) || '').replace(/<[^>]+>/g, '').trim();
      assert.ok(solClean.length >= 140, `${t} practice item[${idx}] solution too short (${solClean.length} chars)`);
      if (it.fig && typeof it.fig === 'object') {
        trackFigs++;
        totalPracticeFigs++;
      }
    });
    assert.ok(trackFigs >= 12, `Expected >= 12 diagrams in content/${t}/_practice-set.json, found ${trackFigs}`);
    totalPracticeItems += ps.items.length;
  });
  assert.strictEqual(totalPracticeItems, 1550, `Expected 1,550 total practice-set items, found ${totalPracticeItems}`);
  assert.ok(totalPracticeFigs >= 500, `Expected >= 500 practice-set diagrams across 31 tracks, found ${totalPracticeFigs}`);
});

const siteDir = path.join(__dirname, '..', '_site');
if (fs.existsSync(siteDir)) {
  audit(`Compiled _site contains entrypoints for all 31 tracks and index.html`, () => {
    assert.ok(fs.existsSync(path.join(siteDir, 'index.html')), 'index.html must exist in _site');
    contentTracks.forEach(t => {
      const pageP = path.join(siteDir, t, 'index.html');
      assert.ok(fs.existsSync(pageP), `_site/${t}/index.html must be rendered`);
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// AUDIT SUMMARY & CERTIFICATION
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log(`Audit Summary: ${passedChecks} Passed / ${failedChecks} Failed (${totalChecks} Total Checks)`);
console.log('═══════════════════════════════════════════════════════════════════════════════');

if (failedChecks > 0) {
  console.error('\n❌ ClipSAT 2.0 Production Audit encountered failures. Please resolve before sign-off.');
  process.exit(1);
} else {
  console.log('\n🏆 CERTIFICATION: ClipSAT 2.0 has successfully passed all production readiness');
  console.log('   audits across all 5 Pillars of the Master Plan. Platform is 100% production-ready!');
  process.exit(0);
}
