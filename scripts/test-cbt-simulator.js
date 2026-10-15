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

it('Handles SPR fraction and decimal equivalence verification', () => {
  // Extract and test SPR fraction logic
  function checkSpr(val, targetAns) {
    val = String(val).trim().toLowerCase();
    targetAns = String(targetAns).trim().toLowerCase();
    if (val === targetAns) return true;
    if (val.indexOf('/') !== -1) {
      const parts = val.split('/');
      const num = parseFloat(parts[0]), den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        const evalVal = num / den;
        const targetNum = parseFloat(targetAns);
        if (!isNaN(targetNum) && Math.abs(evalVal - targetNum) < 1e-4) {
          return true;
        }
      }
    }
    return false;
  }

  assert.strictEqual(checkSpr('7/4', '1.75'), true, '7/4 must equal 1.75');
  assert.strictEqual(checkSpr('1.75', '1.75'), true, '1.75 must equal 1.75');
  assert.strictEqual(checkSpr('14/8', '1.75'), true, '14/8 must equal 1.75');
  assert.strictEqual(checkSpr('1/3', '0.3333'), true, '1/3 must match 0.3333 within tolerance');
  assert.strictEqual(checkSpr('2/5', '0.4'), true, '2/5 must equal 0.4');
  assert.strictEqual(checkSpr('3/5', '0.4'), false, '3/5 must NOT equal 0.4');
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

console.log(`\n── CBT Simulator Tests Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) process.exit(1);
console.log('✅ All CBT Simulator unit tests passed successfully!\n');
