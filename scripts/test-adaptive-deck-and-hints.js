#!/usr/bin/env node
/**
 * scripts/test-adaptive-deck-and-hints.js
 * Unit test suite for Pillar 5 Architecture & Learning Loop Upgrades:
 * 1. Modularized 02-core-app.js (02a-plot-canvas-engine.js, 02d-exam-print-and-lang.js, 02e-question-bank-and-syllabus.js, 02-core-app.js)
 * 2. Progressive 3-Tier Hint Engine (03c-progressive-hints.js / window.CSHintEngine)
 * 3. Leitner 4-Box Spaced-Repetition Adaptive Mistake Deck (09-mastery-log.js, 10-mistakes-store.js, 13-mistakes-review.js)
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('── Running Modular Engine, Progressive Hints & Adaptive Mistake Deck Unit Tests ──');

let passed = 0;
let failed = 0;

function it(desc, fnTest) {
  try {
    fnTest();
    console.log(`  ✓ ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

const modulesDir = path.join(__dirname, '..', 'src', 'scripts', 'modules');

// 1. Verify 02-core-app.js modularization
it('02-core-app.js is split into focused sub-modules registered in manifest.json', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(modulesDir, 'manifest.json'), 'utf8'));
  const expectedModules = [
    '02a-plot-canvas-engine.js',
    '02d-exam-print-and-lang.js',
    '02e-question-bank-and-syllabus.js',
    '02-core-app.js',
    '03c-progressive-hints.js'
  ];
  expectedModules.forEach(m => {
    assert.ok(manifest.includes(m), `manifest.json must include ${m}`);
    assert.ok(fs.existsSync(path.join(modulesDir, m)), `${m} must exist on disk`);
  });

  const coreLines = fs.readFileSync(path.join(modulesDir, '02-core-app.js'), 'utf8').split('\n').length;
  assert.ok(coreLines < 350, `02-core-app.js should be slimmed under 350 lines (got ${coreLines})`);
});

// 2. Test Progressive 3-Tier Hint Engine (window.CSHintEngine)
it('window.CSHintEngine synthesizes 3 progressive hints and redacts final answers on Tiers 1-2', () => {
  const window = {};
  const document = {
    documentElement: { lang: 'en', dir: 'ltr' },
    body: { classList: { contains: () => false } }
  };
  const hintCode = fs.readFileSync(path.join(modulesDir, '03c-progressive-hints.js'), 'utf8');
  const fn = new Function('window', 'document', hintCode);
  fn(window, document);

  assert.ok(window.CSHintEngine, 'window.CSHintEngine must be exposed');
  assert.strictEqual(typeof window.CSHintEngine.buildHints, 'function');
  assert.strictEqual(typeof window.CSHintEngine.renderHintWidget, 'function');
  assert.strictEqual(typeof window.CSHintEngine.revealNext, 'function');

  const sampleQ = {
    domain: 'Quadratic Equations',
    text: 'Find the positive root of $x^2 - 5x - 14 = 0$.',
    choices: ['2', '5', '7', '14'],
    answer: 2,
    sol: 'Step 1: Factor the quadratic equation as $(x - 7)(x + 2) = 0$. Step 2: Set each factor to zero to obtain $x = 7$ or $x = -2$. Since $x > 0$, the positive root is $7$.'
  };

  const hints = window.CSHintEngine.buildHints(sampleQ);
  assert.strictEqual(hints.length, 3, 'Must produce exactly 3 progressive hint tiers');
  assert.ok(!hints[0].includes('is 7'), 'Tier 1 hint must not leak the final answer');
  assert.ok(hints[2].length > 15, 'Tier 3 hint must provide verification guidance');

  const widgetHtml = window.CSHintEngine.renderHintWidget(sampleQ, 'test-q-1');
  assert.ok(widgetHtml.includes('cs-hint-wrap'), 'Widget HTML must contain .cs-hint-wrap container');
  assert.ok(widgetHtml.includes('data-tier="1"'), 'Widget HTML must include Tier 1 step');
  assert.ok(widgetHtml.includes('data-tier="2"'), 'Widget HTML must include Tier 2 step');
  assert.ok(widgetHtml.includes('data-tier="3"'), 'Widget HTML must include Tier 3 step');
});

// 3. Test Leitner 4-Box Adaptive Mistake Deck (window.ML)
it('window.ML implements Leitner 4-Box progression, root-cause error tags, and due prioritization', () => {
  const store = {};
  const localStorage = {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  };
  const document = {
    getElementById: () => null
  };
  const window = {};
  const mlCode = fs.readFileSync(path.join(modulesDir, '09-mastery-log.js'), 'utf8');
  const fn = new Function('window', 'document', 'localStorage', mlCode);
  fn(window, document, localStorage);

  assert.ok(window.ML, 'window.ML must be exposed');

  // Log a wrong answer -> starts in Box 1 (immediately due)
  window.ML.add({
    id: 'sat-alg-q1',
    viewId: 'sat',
    domain: 'Linear Equations',
    q: 'Solve $2x + 3 = 11$.',
    right: '4',
    wrong: '7',
    choices: ['2', '4', '7', '8'],
    sol: 'Subtract 3 from both sides: $2x = 8 \\implies x = 4$.',
    errorTag: 'algebra'
  });

  let stats = window.ML.getDeckStats();
  assert.strictEqual(stats.total, 1, 'Must record 1 mistake in deck');
  assert.strictEqual(stats.boxCounts[1], 1, 'New mistake must start in Leitner Box 1');
  assert.strictEqual(stats.dueNow, 1, 'Box 1 mistake must be immediately due');
  assert.strictEqual(stats.tagCounts.algebra, 1, 'Error tag must be counted');

  // Promote from Box 1 -> Box 2 via unassisted correct review
  const p1 = window.ML.recordReview('sat-alg-q1', true, 0);
  assert.strictEqual(p1.box, 2, 'Correct unassisted review must promote Box 1 -> Box 2');

  // Promote from Box 2 -> Box 3
  const p2 = window.ML.recordReview('sat-alg-q1', true, 0);
  assert.strictEqual(p2.box, 3, 'Second correct unassisted review must promote Box 2 -> Box 3');

  // Promote from Box 3 -> Box 4 (Mastered)
  const p3 = window.ML.recordReview('sat-alg-q1', true, 0);
  assert.strictEqual(p3.box, 4, 'Third correct unassisted review must promote Box 3 -> Box 4 (Mastered)');

  // Demote back to Box 1 on wrong review
  const demoted = window.ML.recordReview('sat-alg-q1', false, 0);
  assert.strictEqual(demoted.box, 1, 'Incorrect review must reset item to Leitner Box 1');

  // Change root-cause tag
  window.ML.setErrorTag('sat-alg-q1', 'trap');
  stats = window.ML.getDeckStats();
  assert.strictEqual(stats.tagCounts.trap, 1, 'Updated root-cause error tag must persist');
});

// 4. Verify Adaptive Mistake Deck UI hooks in 10-mistakes-store.js and 13-mistakes-review.js
it('10-mistakes-store.js and 13-mistakes-review.js expose interactive Adaptive Mistake Deck controls', () => {
  const s10 = fs.readFileSync(path.join(modulesDir, '10-mistakes-store.js'), 'utf8');
  const s13 = fs.readFileSync(path.join(modulesDir, '13-mistakes-review.js'), 'utf8');

  assert.ok(s10.includes('Leitner Spaced-Repetition Mistake Deck'), '10-mistakes-store.js must render Leitner 4-Box banner');
  assert.ok(s10.includes('window.tagMistakeError'), '10-mistakes-store.js must expose window.tagMistakeError');
  assert.ok(s10.includes('window.filterMistakesByBox'), '10-mistakes-store.js must expose window.filterMistakesByBox');
  assert.ok(s13.includes('window.launchAdaptiveMistakeDeck'), '13-mistakes-review.js must expose window.launchAdaptiveMistakeDeck');
  assert.ok(s13.includes('window._mdeckPick'), '13-mistakes-review.js must expose window._mdeckPick');
  assert.ok(s13.includes('window.CSHintEngine.renderHintWidget'), '13-mistakes-review.js must integrate progressive 3-tier hints');
});

// 5. Test Zero-API Client-Side Voice Tutor (window.CSVoiceTutor) in English & Arabic
it('window.CSVoiceTutor converts LaTeX math to natural speech in English & Arabic and wires 🔊 buttons across all 4 surfaces', () => {
  const window = {};
  const document = {
    hidden: false,
    addEventListener: () => {}
  };
  const voiceCode = fs.readFileSync(path.join(modulesDir, '03d-voice-tutor.js'), 'utf8');
  const fn = new Function('window', 'document', voiceCode);
  fn(window, document);

  assert.ok(window.CSVoiceTutor, 'window.CSVoiceTutor must be exposed');
  assert.strictEqual(typeof window.CSVoiceTutor.latexToSpeech, 'function');
  assert.strictEqual(typeof window.CSVoiceTutor.extractSpeechText, 'function');
  assert.strictEqual(typeof window.CSVoiceTutor.speakTier, 'function');
  assert.strictEqual(typeof window.CSVoiceTutor.speakCurrentHint, 'function');
  assert.strictEqual(typeof window.CSVoiceTutor.speakProblemSolution, 'function');
  assert.strictEqual(typeof window.CSVoiceTutor.explainExplorer, 'function');
  assert.strictEqual(typeof window.CSVoiceTutor.explainIxBox, 'function');

  // English LaTeX-to-Speech checks
  const enQuad = window.CSVoiceTutor.latexToSpeech(
    'Use the quadratic formula \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\) and check \\(\\int_0^{\\pi} \\sin(x)\\,dx = 2\\).',
    'en'
  );
  assert.ok(enQuad.includes('plus or minus'), `Expected "plus or minus" in: ${enQuad}`);
  assert.ok(enQuad.includes('square root of'), `Expected "square root of" in: ${enQuad}`);
  assert.ok(enQuad.includes('b squared'), `Expected "b squared" in: ${enQuad}`);
  assert.ok(enQuad.includes('over 2 a') || enQuad.includes('over 2a'), `Expected denominator in: ${enQuad}`);
  assert.ok(enQuad.includes('integral from 0 to pi'), `Expected definite integral in: ${enQuad}`);
  assert.ok(!enQuad.includes('\\frac') && !enQuad.includes('\\sqrt'), `Must not leave raw LaTeX commands in: ${enQuad}`);

  // Arabic LaTeX-to-Speech checks
  const arSpeech = window.CSVoiceTutor.latexToSpeech(
    'عوّض في القانون \\(x = \\frac{1}{2} + \\sqrt{x^2 + 5}\\) عندما \\(\\theta = 90^\\circ\\).',
    'ar'
  );
  assert.ok(arSpeech.includes('نصف'), `Expected "نصف" for 1/2 in Arabic: ${arSpeech}`);
  assert.ok(arSpeech.includes('الجذر التربيعي'), `Expected "الجذر التربيعي" in Arabic: ${arSpeech}`);
  assert.ok(arSpeech.includes('تربيع'), `Expected "تربيع" in Arabic: ${arSpeech}`);
  assert.ok(arSpeech.includes('ثيتا'), `Expected "ثيتا" in Arabic: ${arSpeech}`);
  assert.ok(arSpeech.includes('درجة'), `Expected "درجة" in Arabic: ${arSpeech}`);

  // Verify 🔊 button wiring across templates & modules
  const partialsDir = path.join(__dirname, '..', 'src', '_includes', 'partials');
  const probNjk = fs.readFileSync(path.join(partialsDir, 'blocks', 'practice-problem.njk'), 'utf8');
  const psetNjk = fs.readFileSync(path.join(partialsDir, 'practice-set.njk'), 'utf8');
  const expNjk = fs.readFileSync(path.join(partialsDir, 'blocks', 'explorer.njk'), 'utf8');
  const ixEngine = fs.readFileSync(path.join(modulesDir, '19-interactive-activities-engine-v1.js'), 'utf8');

  assert.ok(probNjk.includes('CSVoiceTutor.speakTier') && probNjk.includes('CSVoiceTutor.speakProblemSolution'), 'practice-problem.njk must wire CSVoiceTutor on hints and solutions');
  assert.ok(psetNjk.includes('CSVoiceTutor.speakProblemSolution'), 'practice-set.njk must wire CSVoiceTutor on solutions');
  assert.ok(expNjk.includes('CSVoiceTutor.explainExplorer'), 'explorer.njk must wire CSVoiceTutor.explainExplorer');
  assert.ok(ixEngine.includes('CSVoiceTutor.explainIxBox'), '19-interactive-activities-engine-v1.js must wire CSVoiceTutor.explainIxBox');
});

// 6. Test Universal Error Flag, Auto-Revision & Deploy Sync Manager (window.CSErrorFlagManager)
it('window.CSErrorFlagManager wires 🚩 Report Error across examples/quizzes/exams, submits flags, and auto-clears after fix', () => {
  const store = {};
  const localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  };
  const window = { CLIPSAT_TRACK: 'sat', localStorage };
  const document = {
    readyState: 'loading',
    addEventListener: () => {},
    getElementById: () => null,
    head: { appendChild: () => {} },
    body: { querySelectorAll: () => [], appendChild: () => {} },
    createElement: () => ({ style: {}, setAttribute: () => {}, appendChild: () => {} })
  };
  const flagCode = fs.readFileSync(path.join(modulesDir, '03e-error-flag-manager.js'), 'utf8');
  const fn = new Function('window', 'document', 'localStorage', flagCode);
  fn(window, document, localStorage);

  assert.ok(window.CSErrorFlagManager, 'window.CSErrorFlagManager must be exposed');
  const btnHtml = window.CSErrorFlagManager.renderFlagButton('sat-test-q1');
  assert.ok(btnHtml.includes('cs-flag-btn') && btnHtml.includes('Report Error'), 'renderFlagButton must produce a .cs-flag-btn');

  // Submit a flag and verify it is stored in openFlags
  const rec = window.CSErrorFlagManager.submitFlag({
    card: null,
    flagId: 'sat:bank-exam:sat-test-q1',
    track: 'sat',
    topicId: 'sat-linear',
    sourceType: 'bank-exam',
    itemId: 'sat-test-q1',
    prompt: 'Solve 2x + 4 = 10.',
    choices: ['2', '3', '4', '5'],
    solution: '2x = 6 so x = 3.',
    hints: ['Subtract 4', 'Divide by 2', 'x = 3'],
    contentSignature: 'abcd1234'
  }, 'math_font', 'Test flag note');

  assert.ok(rec && rec.flagId === 'sat:bank-exam:sat-test-q1', 'submitFlag must return flag record');
  assert.strictEqual(window.CSErrorFlagManager.getOpenFlags().length, 1, 'Open flags count must be 1 after flagging');

  // Remove flag after fix and verify openFlags is 0
  window.CSErrorFlagManager.removeFlag('sat:bank-exam:sat-test-q1');
  assert.strictEqual(window.CSErrorFlagManager.getOpenFlags().length, 0, 'Open flags count must be 0 after removal');

  // Verify 🚩 Report Error wiring across hint widget, AI exam, interactive activities, and Nunjucks partials
  const hintCode = fs.readFileSync(path.join(modulesDir, '03c-progressive-hints.js'), 'utf8');
  const aiExamCode = fs.readFileSync(path.join(modulesDir, '05a-ai-test.js'), 'utf8');
  const ixEngine = fs.readFileSync(path.join(modulesDir, '19-interactive-activities-engine-v1.js'), 'utf8');
  assert.ok(hintCode.includes('CSErrorFlagManager.openReportPopover'), '03c-progressive-hints.js must wire 🚩 Report Error');
  assert.ok(aiExamCode.includes('CSErrorFlagManager.openReportPopover'), '05a-ai-test.js must wire 🚩 Report Error');
  assert.ok(ixEngine.includes('CSErrorFlagManager.openReportPopover'), '19-interactive-activities-engine-v1.js must wire 🚩 Report Error');
});

console.log(`\n── Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) process.exit(1);
console.log('✅ All Modular Engine, Progressive Hints & Adaptive Mistake Deck unit tests passed!\n');
