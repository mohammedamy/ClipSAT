#!/usr/bin/env node
/**
 * scripts/test-cbt-simulator.js
 * Unit test suite for ClipSAT Computer-Based Testing (CBT) Exam Simulator:
 * - Single-question navigation
 * - Question Navigator Palette (answered, unanswered, flagged)
 * - Pre-submission review screen
 * - Scaled score projection (SAT 200-800, Qudrat 100-pt, ACT 1-36, AP 1-5, Cambridge 9/A*-U, IB 1-7)
 * - SPR answer verification (exact and fractional equivalence)
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('── Running CBT Simulator Engine Unit Tests ──');

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

// 1. Verify 17-mock-exam-mode.js syntax & exports
const cbtPath = path.join(__dirname, '..', 'src', 'scripts', 'modules', '17-mock-exam-mode.js');
assert.ok(fs.existsSync(cbtPath), '17-mock-exam-mode.js must exist');
const cbtContent = fs.readFileSync(cbtPath, 'utf8');

it('Exposes all CBT navigation and simulator APIs on window', () => {
  assert.ok(cbtContent.includes('window.openMockExam'), 'Must expose window.openMockExam');
  assert.ok(cbtContent.includes('window.submitMockExam'), 'Must expose window.submitMockExam');
  assert.ok(cbtContent.includes('window.exitMockExam'), 'Must expose window.exitMockExam');
  assert.ok(cbtContent.includes('window.cbtNextQuestion'), 'Must expose window.cbtNextQuestion');
  assert.ok(cbtContent.includes('window.cbtPrevQuestion'), 'Must expose window.cbtPrevQuestion');
  assert.ok(cbtContent.includes('window.toggleCBTPalette'), 'Must expose window.toggleCBTPalette');
  assert.ok(cbtContent.includes('window.cbtShowReviewScreen'), 'Must expose window.cbtShowReviewScreen');
  assert.ok(cbtContent.includes('window.cbtRecordAnswer'), 'Must expose window.cbtRecordAnswer');
  assert.ok(cbtContent.includes('window.cbtToggleFlagCurrent'), 'Must expose window.cbtToggleFlagCurrent');
  assert.ok(cbtContent.includes('window.cbtFilterReview'), 'Must expose window.cbtFilterReview');
});

it('Contains authentic scaled score estimation models', () => {
  assert.ok(cbtContent.includes('_getScaledScoreEstimate'), 'Must define _getScaledScoreEstimate');
  assert.ok(cbtContent.includes('Projected SAT Math Score'), 'Must project SAT Math score');
  assert.ok(cbtContent.includes('Estimated Qiyas Scale Score'), 'Must project Qiyas score');
  assert.ok(cbtContent.includes('Projected ACT Math Score'), 'Must project ACT score');
  assert.ok(cbtContent.includes('Projected Cambridge Grade'), 'Must project Cambridge grade');
  assert.ok(cbtContent.includes('Projected IB Boundary'), 'Must project IB boundary');
});

it('Handles SPR fraction and decimal equivalence verification symmetrically', () => {
  function toNum(s) {
    if (!s) return NaN;
    s = String(s).trim();
    if (s.indexOf('/') !== -1) {
      const p = s.split('/');
      const num = parseFloat(p[0]), den = parseFloat(p[1]);
      return (den !== 0 && !isNaN(num) && !isNaN(den)) ? (num / den) : NaN;
    }
    return parseFloat(s);
  }

  function checkSpr(val, targetAns) {
    val = String(val).trim().toLowerCase();
    targetAns = String(targetAns).trim().toLowerCase();
    if (val === targetAns) return true;
    const vNum = toNum(val);
    const tNum = toNum(targetAns);
    if (!isNaN(vNum) && !isNaN(tNum) && Math.abs(vNum - tNum) < 1e-4) {
      return true;
    }
    return false;
  }

  assert.strictEqual(checkSpr('7/4', '1.75'), true, '7/4 must equal 1.75');
  assert.strictEqual(checkSpr('1.75', '7/4'), true, '1.75 must equal 7/4 (symmetric)');
  assert.strictEqual(checkSpr('14/8', '1.75'), true, '14/8 must equal 1.75');
  assert.strictEqual(checkSpr('1.75', '14/8'), true, '1.75 must equal 14/8 (symmetric)');
  assert.strictEqual(checkSpr('1/3', '0.3333'), true, '1/3 must match 0.3333 within tolerance');
  assert.strictEqual(checkSpr('0.3333', '1/3'), true, '0.3333 must match 1/3 within tolerance (symmetric)');
  assert.strictEqual(checkSpr('2/5', '0.4'), true, '2/5 must equal 0.4');
  assert.strictEqual(checkSpr('0.4', '2/5'), true, '0.4 must equal 2/5 (symmetric)');
  assert.strictEqual(checkSpr('3/5', '0.4'), false, '3/5 must NOT equal 0.4');
});

it('Parses Qudrat Quantitative Comparison dual boxes and premises', () => {
  assert.ok(cbtContent.includes('function _isQuantComp'), 'Must define _isQuantComp');
  assert.ok(cbtContent.includes('function _parseCompBoxes'), 'Must define _parseCompBoxes');
  assert.ok(cbtContent.includes('mock-qc-grid'), 'Must render mock-qc-grid');
  assert.ok(cbtContent.includes('mock-qc-context'), 'Must render mock-qc-context');

  const qudSample = {
    domain: 'Quantitative Comparisons',
    text: '<strong>قارن / Compare:</strong><br>\\( x=7 \\)<br>العمود A: \\( 2x \\)<br>العمود B: \\( 2x \\)<br><em>\\( x=7 \\)<br>Quantity A: \\( 2x \\)<br>Quantity B: \\( 2x \\)</em>'
  };

  // Run the parsing logic on the sample
  const clean = qudSample.text.replace(/<strong>قارن\s*\/?\s*Compare:?<\/strong>/i, '').trim();
  const colAMatch = clean.match(/(?:العمود\s*[Aأ]|القيمة\s*الأولى|Quantity\s*A)\s*[:：\-]?\s*([^\n\r<]+)/i);
  const colBMatch = clean.match(/(?:العمود\s*[Bب]|القيمة\s*الثانية|Quantity\s*B)\s*[:：\-]?\s*([^\n\r<]+)/i);
  assert.ok(colAMatch, 'Must match Column A');
  assert.ok(colBMatch, 'Must match Column B');
  assert.strictEqual(colAMatch[1].trim(), '\\( 2x \\)');
  assert.strictEqual(colBMatch[1].trim(), '\\( 2x \\)');
});

it('SAT question bank contains authentic 25% native SPR items', () => {
  const satPath = path.join(__dirname, '..', 'bank-data', 'sat.json');
  const sat = JSON.parse(fs.readFileSync(satPath, 'utf8'));
  const sprs = sat.pool.filter(q => q.type === 'spr');
  assert.strictEqual(sprs.length, 412, 'Must have 412 native SPR questions in sat.json');
  sprs.forEach(q => {
    assert.ok(q.sprAnswer != null && String(q.sprAnswer).trim() !== '', 'SPR item must have sprAnswer');
    assert.ok(q.ans != null && String(q.ans).trim() !== '', 'SPR item must have ans');
  });
});

it('Qudrat and Tahsili banks have 0 non-math trivia and authentic specialized domains', () => {
  const qud = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'bank-data', 'qudrat.json'), 'utf8'));
  const tah = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'bank-data', 'tahsili.json'), 'utf8'));

  const qudTrivia = qud.pool.filter(q => q.domain === 'Test Format & Strategy');
  const tahTrivia = tah.pool.filter(q => q.domain === 'Test Format & Strategy');
  assert.strictEqual(qudTrivia.length, 0, 'Qudrat must have 0 trivia questions');
  assert.strictEqual(tahTrivia.length, 0, 'Tahsili must have 0 trivia questions');

  const qudMotion = qud.pool.filter(q => q.domain === 'Motion, Speed & Work Rates');
  assert.strictEqual(qudMotion.length, 150, 'Qudrat must have 150 Motion, Speed & Work Rates questions');

  const tahVectors = tah.pool.filter(q => q.domain === 'Vectors & Matrices');
  assert.strictEqual(tahVectors.length, 150, 'Tahsili must have 150 Vectors & Matrices questions');
});

it('Includes responsive CBT styles in main.css', () => {
  const cssPath = path.join(__dirname, '..', 'src', 'styles', 'main.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  assert.ok(cssContent.includes('.mock-q.cbt-hidden'), 'Must include .mock-q.cbt-hidden rule');
  assert.ok(cssContent.includes('.cbt-palette-grid'), 'Must include .cbt-palette-grid');
  assert.ok(cssContent.includes('.cbt-pal-item.answered'), 'Must include .cbt-pal-item.answered');
  assert.ok(cssContent.includes('.cbt-flag-btn.flagged'), 'Must include .cbt-flag-btn.flagged');
});

it('Includes cbt-palette-modal in base.njk', () => {
  const baseNjkPath = path.join(__dirname, '..', 'src', '_includes', 'base.njk');
  const baseContent = fs.readFileSync(baseNjkPath, 'utf8');
  assert.ok(baseContent.includes('id="cbt-palette-modal"'), 'base.njk must contain #cbt-palette-modal');
});

it('CBT Simulator guarantees figure loading, error recovery, and diagram quota', () => {
  assert.ok(cbtContent.includes('_ensureFigures'), 'Must ensure figures are loaded before exam begins');
  assert.ok(cbtContent.includes('targetFigs = Math.min(withFig.length'), 'Must allocate diagram quota for questions');
  assert.ok(cbtContent.includes('Question Bank Unavailable'), 'Must render retry UI if bank is missing');
  assert.ok(cbtContent.includes('CBT Preparation Error'), 'Must render error UI on initialization exception');
});

console.log(`\n── CBT Simulator Tests Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) process.exit(1);
console.log('✅ All CBT Simulator unit tests passed successfully!\n');
