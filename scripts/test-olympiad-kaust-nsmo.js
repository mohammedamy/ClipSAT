#!/usr/bin/env node
/**
 * scripts/test-olympiad-kaust-nsmo.js
 * End-to-end verification suite covering:
 * 1. AI Tutor Quota Policy: strictly 10 questions/day across Client, Supabase Edge Function, and Flask proxy,
 *    with ALL other limits (per-minute, weekly, monthly, message/prompt length, history truncation, PDF page/file size) removed.
 * 2. Reconstructed Olympiad Track (`olympiad`) with dedicated subsections for NSMO of KSA (Mawhiba) and KAUST (KMC & Academy):
 *    12 chapters, 50 practice problems, 15 Canvas explorers, 120 IX activities, 1,440-question bank, 12 shards,
 *    CBT mock exams, full bank exam specs, 12 typeset PDF worksheets + keys, 40 printable full exams + keys, and built `_site/olympiad/index.html`.
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

console.log('═══════════════════════════════════════════════════════════════════════════════');
console.log('   End-to-End Verification: Olympiad (NSMO & KAUST) + 10/Day AI Bot Policy     ');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

// ─────────────────────────────────────────────────────────────────────────────
// PART 1: AI BOT LIMIT = 20 CREDITS/DAY (text=1, photo/PDF/cam=2; paid x10) & ALL OTHER LIMITS REMOVED
// ─────────────────────────────────────────────────────────────────────────────
console.log('── Part 1: AI Bot Quota (20 credits/day: 20 text OR 10 photo/PDF OR a mix; paid x10; zero other limits) ──');

const clientAiSrc = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/03-ai-chat-and-practice-quiz.js'), 'utf8');
const edgeProxySrc = fs.readFileSync(path.join(ROOT, 'supabase/functions/ai-proxy/index.ts'), 'utf8');
const flaskAppSrc = fs.readFileSync(path.join(ROOT, 'app.py'), 'utf8');
const baseNjkSrc = fs.readFileSync(path.join(ROOT, 'src/_includes/base.njk'), 'utf8');
const pricingSrc = fs.readFileSync(path.join(ROOT, 'src/pricing/index.njk'), 'utf8');

check('Client AI Tutor enforces AI_DAILY_LIMIT = 20 credits and removes weekly/monthly/length/history/page caps', () => {
  assert.ok(/AI_DAILY_LIMIT\s*=\s*20\b/.test(clientAiSrc), 'Client must set AI_DAILY_LIMIT = 20');
  assert.ok(/AI_ATTACH_COST\s*=\s*2\b/.test(clientAiSrc), 'Client attachment cost must be 2 credits');
  assert.ok(/AI_PAID_MULTIPLIER\s*=\s*10\b/.test(clientAiSrc), 'Client paid multiplier must be 10');
  assert.ok(!/AI_WEEKLY_LIMIT|AI_MONTHLY_LIMIT/.test(clientAiSrc), 'Client must not have weekly or monthly limits');
  assert.ok(!/history\.slice\(\s*-\d+\s*\)/.test(clientAiSrc), 'Client must not truncate conversation history turns');
  assert.ok(!/MAX_FILE_BYTES|single-page PDF|1 page max/i.test(clientAiSrc), 'Client must not enforce file-size or 1-page PDF restrictions');
});

check('Client AI Quota simulation: 20 text OR 10 photo/PDF OR a mix; paid x10 via server sync', () => {
  global.window = global.window || {};
  const store = {};
  global.localStorage = {
    getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  };
  global.document = global.document || {
    getElementById: () => null,
    createElement: () => ({ appendChild: () => {}, classList: { add: () => {}, remove: () => {} }, style: {} }),
    dispatchEvent: () => {}
  };
  delete require.cache[require.resolve(path.join(ROOT, 'src/scripts/modules/03-ai-chat-and-practice-quiz.js'))];
  const aiMod = require(path.join(ROOT, 'src/scripts/modules/03-ai-chat-and-practice-quiz.js'));
  const reset = () => { Object.keys(store).forEach((k) => delete store[k]); };
  assert.strictEqual(aiMod.AI_DAILY_LIMIT, 20, 'Exported AI_DAILY_LIMIT must equal 20');
  assert.strictEqual(aiMod.AI_ATTACH_COST, 2, 'Attachment questions cost 2 credits');
  assert.strictEqual(aiMod._getAiDailyUsed(), 0, 'Fresh UTC day must start at 0');
  assert.strictEqual(aiMod._getAiCap(), 20, 'Free cap is 20 credits');

  // 20 text questions allowed, #21 blocked
  for (let i = 1; i <= 20; i++) {
    assert.ok(aiMod._getAiDailyUsed() + 1 <= aiMod._getAiCap(), 'text question #' + i + ' allowed');
    assert.strictEqual(aiMod._incAiDailyUsed(1), i);
  }
  assert.ok(aiMod._getAiDailyUsed() + 1 > aiMod._getAiCap(), 'text question #21 blocked');

  // 10 attachment questions allowed, #11 blocked
  reset();
  for (let i = 1; i <= 10; i++) {
    assert.ok(aiMod._getAiDailyUsed() + 2 <= aiMod._getAiCap(), 'attachment question #' + i + ' allowed');
    aiMod._incAiDailyUsed(2);
  }
  assert.ok(aiMod._getAiDailyUsed() + 2 > aiMod._getAiCap(), 'attachment question #11 blocked');

  // mix: 10 text + 5 attachments = 20 credits, then nothing more fits
  reset();
  for (let i = 0; i < 10; i++) aiMod._incAiDailyUsed(1);
  for (let i = 0; i < 5; i++) aiMod._incAiDailyUsed(2);
  assert.strictEqual(aiMod._getAiDailyUsed(), 20, 'mix uses exactly 20 credits');
  assert.ok(aiMod._getAiDailyUsed() + 1 > aiMod._getAiCap(), 'mix exhausts the day');

  // paid: server reports cap 200; local counter syncs to server, and the next local increment is skipped once
  reset();
  aiMod._applyServerQuota({ used: 37, cap: 200, paid: true });
  assert.strictEqual(aiMod._getAiCap(), 200, 'paid cap = 10 x 20 = 200');
  assert.strictEqual(aiMod._getAiDailyUsed(), 37, 'local counter syncs to the server count');
  assert.strictEqual(aiMod._incAiDailyUsed(2), 37, 'server already counted this call: no double count');
  assert.strictEqual(aiMod._incAiDailyUsed(2), 39, 'following calls count locally again until the next sync');
  assert.ok(/_getAiDailyUsed\(\)\s*\+\s*_aiCost\(att\)\s*>\s*_getAiCap\(\)/.test(clientAiSrc), 'send handler gates on used + cost > cap');
});

check('Supabase Edge Function ai-proxy enforces credit quota (20/day, attachment=2, paid x10) and removes per-minute/weekly/monthly/prompt caps', () => {
  assert.ok(/DAILY_CREDIT_CAP\s*=\s*20\b/.test(edgeProxySrc), 'Edge Function must set DAILY_CREDIT_CAP = 20');
  assert.ok(/ATTACHMENT_CREDIT_COST\s*=\s*2\b/.test(edgeProxySrc) && /TEXT_CREDIT_COST\s*=\s*1\b/.test(edgeProxySrc), 'text costs 1, attachment costs 2');
  assert.ok(/PAID_MULTIPLIER\s*=\s*10\b/.test(edgeProxySrc), 'paid plans get 10x');
  assert.ok(edgeProxySrc.includes('use_ai_quota'), 'Edge Function must spend credits atomically via use_ai_quota');
  assert.ok(!/PER_MINUTE_CAP|WEEKLY_CALL_CAP|MONTHLY_CALL_CAP/.test(edgeProxySrc), 'Edge Function must have zero per-minute/weekly/monthly caps');
  assert.ok(!/MAX_PROMPT_CHARS|MAX_MESSAGES\s*=|status:\s*413/.test(edgeProxySrc), 'Edge Function must not reject long prompts or message arrays with 413');
});

check('Flask fallback proxy app.py enforces DAILY_QUESTION_LIMIT = 20 and removes IP rate/size/message caps', () => {
  assert.ok(/DAILY_QUESTION_LIMIT\s*=\s*20\b/.test(flaskAppSrc), 'Flask app.py must set DAILY_QUESTION_LIMIT = 20');
  assert.ok(!/RATE_LIMIT_MAX|MAX_MESSAGE_LENGTH|MAX_MESSAGES\s*=|MAX_CONTENT_LENGTH/.test(flaskAppSrc), 'Flask app.py must have zero per-minute, message-count, or payload-length caps');
});

check('UI templates (base.njk & pricing/index.njk) reflect 20 questions or 10 photo/PDF per day and preserve compliance notice', () => {
  assert.ok(baseNjkSrc.includes('AI-generated; may contain errors; not a substitute for teacher guidance.'), 'Compliance notice must remain intact in base.njk');
  assert.ok(!/50\/week|100\/month|1-page PDF/i.test(baseNjkSrc), 'base.njk must not mention old 50/week, 100/month, or 1-page PDF limits');
  assert.ok(/20 questions or 10 photo\/PDF/.test(pricingSrc) && !/50 questions\/week|100\/month/i.test(pricingSrc), 'pricing/index.njk must reflect 20 questions or 10 photo/PDF per day without old weekly/monthly limits');
});

// ─────────────────────────────────────────────────────────────────────────────
// PART 2: OLYMPIAD TRACK RECONSTRUCTION (CORE + NSMO OF KSA + KAUST)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n── Part 2: Reconstructed Olympiad Track (Core · NSMO of KSA · KAUST KMC) ──');

const meta = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/olympiad/_meta.json'), 'utf8'));
const EXPECTED_CHAPTERS = [
  'ol-algebraic-techniques',
  'ol-modular-number-theory',
  'ol-diophantine-equations',
  'ol-combinatorics-counting',
  'ol-recurrence-probability',
  'ol-euclidean-circles',
  'ol-triangle-centers-trig',
  'ol-invariants-extremal',
  'ol-nsmo-stage1-2',
  'ol-nsmo-national-finals',
  'ol-kaust-kmc-qualifier',
  'ol-kaust-finals-academy'
];

check('_meta.json and chapter railGroupLabel/subsectionBanner define 12 chapters across 3 subsections (Core, NSMO of KSA, KAUST)', () => {
  assert.deepStrictEqual(meta.chapterOrder, EXPECTED_CHAPTERS, 'chapterOrder must match the 12 reconstructed chapters');
  const exams = (meta.meta && meta.meta.testGenerator && meta.meta.testGenerator.exams) || [];
  assert.ok(exams.some(e => /NSMO of KSA/i.test(e.examTitle)), '_meta.json testGenerator.exams must include NSMO of KSA');
  assert.ok(exams.some(e => /KAUST Mathematics Competition/i.test(e.examTitle)), '_meta.json testGenerator.exams must include KAUST KMC');

  const chsWithGroup = EXPECTED_CHAPTERS.map(slug =>
    JSON.parse(fs.readFileSync(path.join(ROOT, 'content/olympiad', `${slug}.json`), 'utf8'))
  ).filter(ch => ch.railGroupLabel && ch.subsectionBanner);
  assert.strictEqual(chsWithGroup.length, 3, 'Exactly 3 subsection lead chapters must define railGroupLabel & subsectionBanner');
  assert.strictEqual(chsWithGroup[0].id, 'ol-algebraic-techniques');
  assert.ok(/Core Olympiad/i.test(chsWithGroup[0].railGroupLabel.en), 'Subsection I must be Core Olympiad Pillars');
  assert.strictEqual(chsWithGroup[1].id, 'ol-nsmo-stage1-2');
  assert.ok(/NSMO of KSA/i.test(chsWithGroup[1].railGroupLabel.en), 'Subsection II must be NSMO of KSA');
  assert.strictEqual(chsWithGroup[2].id, 'ol-kaust-kmc-qualifier');
  assert.ok(/KAUST/i.test(chsWithGroup[2].railGroupLabel.en), 'Subsection III must be KAUST');
});

check('All 12 bilingual chapter JSONs, 15 explorer blocks, and 50-item Practice Set exist and are $-free', () => {
  let explorerBlocks = 0;
  EXPECTED_CHAPTERS.forEach(slug => {
    const raw = fs.readFileSync(path.join(ROOT, 'content/olympiad', `${slug}.json`), 'utf8');
    assert.ok(!raw.includes('$'), `${slug}.json must contain zero literal $ signs`);
    const ch = JSON.parse(raw);
    assert.strictEqual(ch.id, slug);
    assert.ok(ch.title && ch.title.en && ch.title.ar, `${slug} must have bilingual EN/AR titles`);
    (ch.content.blocks || []).forEach(b => {
      if (b.kind === 'explorer') explorerBlocks++;
    });
  });
  assert.strictEqual(explorerBlocks, 15, `Expected 15 interactive explorer blocks across 12 chapters, found ${explorerBlocks}`);

  const psRaw = fs.readFileSync(path.join(ROOT, 'content/olympiad/_practice-set.json'), 'utf8');
  assert.ok(!psRaw.includes('$'), '_practice-set.json must contain zero literal $ signs');
  const ps = JSON.parse(psRaw);
  assert.strictEqual(ps.items.length, 50, `Expected 50 graded practice items, found ${ps.items.length}`);
});

check('Built explorers (public/js/ex/olympiad.js) and IX activities (public/js/ix/olympiad.js: 120 items) exist', () => {
  const exBuilt = fs.readFileSync(path.join(ROOT, 'public/js/ex/olympiad.js'), 'utf8');
  assert.ok(exBuilt.length > 10000, 'Minified public/js/ex/olympiad.js must be built');
  [
    'olnsmostage12ExCanvas', 'olnsmonationalfinalsExCanvas',
    'olkaustkmcqualifierExCanvas', 'olkaustfinalsacademyExCanvas'
  ].forEach(cid => {
    assert.ok(exBuilt.includes(cid), `Built explorer bundle must wire ${cid}`);
  });

  const ixBuilt = fs.readFileSync(path.join(ROOT, 'public/js/ix/olympiad.js'), 'utf8');
  assert.ok(ixBuilt.length > 20000, 'Minified public/js/ix/olympiad.js must be built');
  EXPECTED_CHAPTERS.forEach(slug => {
    assert.ok(ixBuilt.includes(slug), `Built IX bundle must include lesson ${slug}`);
  });
});

check('Question bank (1,440 items, >= 500 SVG figures) and 12 topic shards in public/bank-shards/olympiad/ match', () => {
  const bankRaw = fs.readFileSync(path.join(ROOT, 'bank-data/olympiad.json'), 'utf8');
  assert.ok(!bankRaw.includes('$'), 'bank-data/olympiad.json must contain zero $ signs');
  const bank = JSON.parse(bankRaw);
  assert.strictEqual(bank.pool.length, 1440, `Expected 1,440 questions, found ${bank.pool.length}`);
  const nsmoQs = bank.pool.filter(q => /^NSMO of KSA:/.test(q.domain));
  const kaustQs = bank.pool.filter(q => /^KAUST /.test(q.domain));
  const figs = bank.pool.filter(q => q.figure);
  assert.strictEqual(nsmoQs.length, 240, `Expected 240 NSMO of KSA bank questions, found ${nsmoQs.length}`);
  assert.strictEqual(kaustQs.length, 240, `Expected 240 KAUST bank questions, found ${kaustQs.length}`);
  assert.ok(figs.length >= 500, `Expected >= 500 SVG figures in olympiad bank, found ${figs.length}`);

  const shardIndex = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/bank-shards/olympiad/_index.json'), 'utf8'));
  const shardTopics = Object.keys(shardIndex.topics || shardIndex.shards || shardIndex);
  assert.ok(shardTopics.length >= 12, `Expected 12 olympiad bank shards, found ${shardTopics.length}`);
});

check('Cross-module wiring: CBT Mock Papers, Full Bank Specs, Diagnostic Map & Home STEM Pathway', () => {
  const mockSrc = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/17-mock-exam-mode.js'), 'utf8');
  assert.ok(mockSrc.includes('NSMO of KSA (Mawhiba) — National Olympiad CBT Simulation'), '17-mock-exam-mode.js must include NSMO CBT simulation');
  assert.ok(mockSrc.includes('KAUST Mathematics Competition (KMC) — Qualifier & Thuwal Finals CBT'), '17-mock-exam-mode.js must include KAUST KMC CBT simulation');

  const diagSrc = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/27-diagnostic-test.js'), 'utf8');
  assert.ok(diagSrc.includes('/olympiad/?ch=ol-nsmo-stage1-2') && diagSrc.includes('/olympiad/?ch=ol-kaust-kmc-qualifier'), '27-diagnostic-test.js must link to reconstructed NSMO & KAUST chapters');
  assert.ok(!diagSrc.includes('?ch=oly-'), '27-diagnostic-test.js must have zero dead ?ch=oly-* links');

  const homeHtml = fs.readFileSync(path.join(ROOT, 'src/_includes/tracks/home.html'), 'utf8');
  assert.ok(homeHtml.includes("{ id: 'olympiad', code: 'OLYMP'"), 'home.html STEM pathway must open olympiad track (not ibhl)');
});

check('Printable Downloads: 12 typeset PDF worksheets + keys and 40 full exams + keys match manifest.json', () => {
  const dlDir = path.join(ROOT, 'public/downloads/olympiad');
  const manifest = JSON.parse(fs.readFileSync(path.join(dlDir, 'manifest.json'), 'utf8'));
  const wsEntries = manifest.filter(e => !e.isFullExam);
  const exEntries = manifest.filter(e => e.isFullExam);
  assert.strictEqual(wsEntries.length, 12, `Expected 12 topical worksheet entries in manifest.json, found ${wsEntries.length}`);
  assert.strictEqual(exEntries.length, 40, `Expected 40 full exam entries (4 competitions x 10 papers), found ${exEntries.length}`);

  wsEntries.forEach(e => {
    const wsPath = path.join(dlDir, e.worksheet);
    const akPath = path.join(dlDir, e.answerkey);
    assert.ok(fs.existsSync(wsPath), `Missing worksheet PDF: ${e.worksheet}`);
    assert.ok(fs.existsSync(akPath), `Missing answer key PDF: ${e.answerkey}`);
    assert.ok(fs.statSync(wsPath).size > 50000, `Worksheet PDF ${e.worksheet} should be a full typeset PDF (>50KB)`);
    assert.ok(fs.statSync(akPath).size > 100000, `Answer key PDF ${e.answerkey} should be a full typeset PDF (>100KB)`);
  });

  exEntries.forEach(e => {
    assert.ok(fs.existsSync(path.join(dlDir, e.worksheet)), `Missing full exam HTML: ${e.worksheet}`);
    assert.ok(fs.existsSync(path.join(dlDir, e.answerkey)), `Missing full answer key HTML: ${e.answerkey}`);
  });
});

check('Built SSG page _site/olympiad/index.html renders all 3 subsections, 12 chapters, and 15 canvases', () => {
  const siteHtml = fs.readFileSync(path.join(ROOT, '_site/olympiad/index.html'), 'utf8');
  assert.ok(siteHtml.includes('NSMO of KSA'), '_site/olympiad/index.html must render NSMO of KSA subsection');
  assert.ok(siteHtml.includes('KAUST'), '_site/olympiad/index.html must render KAUST subsection');
  EXPECTED_CHAPTERS.forEach(slug => {
    assert.ok(siteHtml.includes(`id="${slug}"`), `_site/olympiad/index.html must render chapter section id="${slug}"`);
  });
  [
    'olalgebraictechniquesExCanvas', 'olmodularnumbertheoryExCanvas', 'oldiophantineequationsExCanvas',
    'olcombinatoricscountingExCanvas', 'olrecurrenceprobabilityExCanvas', 'oleuclideancirclesExCanvas',
    'oltrianglecenterstrigExCanvas', 'olinvariantsextremalExCanvas', 'olnsmostage12ExCanvas',
    'olnsmonationalfinalsExCanvas', 'olkaustkmcqualifierExCanvas', 'olkaustfinalsacademyExCanvas',
    'uge_olalgebraictechniques_mainfnCanvas', 'uge_oltrianglecenterstrig_trig6Canvas', 'uge_oltrianglecenterstrig_invtrig6Canvas'
  ].forEach(cid => {
    assert.ok(siteHtml.includes(`id="${cid}"`), `_site/olympiad/index.html must render canvas id="${cid}"`);
  });
});

console.log(`\n── Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) {
  process.exit(1);
}
console.log('✅ All Olympiad (NSMO & KAUST) + 10/Day AI Quota end-to-end checks passed!');
