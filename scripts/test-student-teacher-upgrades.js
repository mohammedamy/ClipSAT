#!/usr/bin/env node
/**
 * Unit Tests for Student & Teacher Pedagogical Upgrades:
 * 1. window.CSTwinProblem ("Try a Similar Problem" on worked examples)
 * 2. window.CSExampleGrapher ("Graph in Calculator" expression extraction & Desmos queueing)
 * 3. window.CSDailyPlan ("Today's 15-Minute Study Plan" routine generator)
 * 4. window.CSGradebook (Class Roster Gradebook, cryptographic code verification, item-analysis heatmap & CSV export)
 * 5. window.CSCustomCart (Custom Worksheet & Assignment Cart Builder across all 31 tracks)
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('  ✓ ' + name);
    passed++;
  } catch (err) {
    console.error('  ✗ ' + name + ': ' + err.message);
    failed++;
  }
}

console.log('── Running Student & Teacher Pedagogical Upgrades Unit Tests ──');

// 1. Verify Nunjucks templates include Try a Similar Problem & Graph in Calculator buttons
test('worked-example-card.njk and callout.njk include CSTwinProblem and CSExampleGrapher action buttons', () => {
  const weCard = fs.readFileSync(path.join(ROOT, 'src/_includes/partials/blocks/worked-example-card.njk'), 'utf8');
  const callout = fs.readFileSync(path.join(ROOT, 'src/_includes/partials/blocks/callout.njk'), 'utf8');
  assert(weCard.includes('window.CSTwinProblem&&window.CSTwinProblem.open(this)'), 'Missing CSTwinProblem in worked-example-card.njk');
  assert(weCard.includes('window.CSExampleGrapher&&window.CSExampleGrapher.graphFromExample(this)'), 'Missing CSExampleGrapher in worked-example-card.njk');
  assert(callout.includes('window.CSTwinProblem&&window.CSTwinProblem.open(this)'), 'Missing CSTwinProblem in callout.njk');
  assert(callout.includes('window.CSExampleGrapher&&window.CSExampleGrapher.graphFromExample(this)'), 'Missing CSExampleGrapher in callout.njk');
});

// 2. Load 16-enhancement-features.js & 22b-assign-report.js in a mock browser environment
const store = {};
const mockWindow = {
  CLIPSAT_TRACK: 'sat',
  document: {
    readyState: 'complete',
    documentElement: { lang: 'en', getAttribute: () => 'light', classList: { contains: () => false } },
    body: {
      classList: { contains: () => false, toggle: () => {} },
      appendChild: () => {}
    },
    head: { appendChild: () => {} },
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: () => ({
      style: {},
      classList: { add: () => {}, remove: () => {}, toggle: () => false },
      setAttribute: () => {},
      appendChild: () => {},
      querySelector: () => null,
      querySelectorAll: () => []
    })
  },
  localStorage: {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
  },
  ML: {
    getAll: () => [{ id: 'm1', domain: 'Linear Equations', q: 'Solve 2x=4', wrong: '1', right: '2' }],
    dueForReview: () => [{ id: 'm1', domain: 'Linear Equations', q: 'Solve 2x=4', wrong: '1', right: '2' }],
    weakDomains: () => ['Linear Equations'],
    add: (m) => { store._lastMistake = m; }
  },
  _shuffle: (arr) => arr.slice(),
  _shuffleQ: (q) => q,
  fullExamBank: {
    sat: {
      pool: [
        { id: 'sat-q1', topic_id: 'sat-ch1', domain: 'Algebra', difficulty: 'Easy', text: 'Solve \\(2x + 3 = 11\\)', choices: ['2', '4', '5', '6'], answer: 1, sol: 'Subtract 3 to get 2x=8, so x=4.' },
        { id: 'sat-q2', topic_id: 'sat-ch1', domain: 'Algebra', difficulty: 'Hard', text: 'Solve \\(3x - 5 = 16\\)', choices: ['5', '6', '7', '8'], answer: 2, sol: 'Add 5 to get 3x=21, so x=7.' },
        { id: 'sat-q3', topic_id: 'sat-ch2', domain: 'Geometry', difficulty: 'Medium', text: 'Find the area of a circle with radius 3.', choices: ['3\\pi', '6\\pi', '9\\pi', '12\\pi'], answer: 2, sol: 'Area = \\pi r^2 = 9\\pi.' }
      ]
    }
  },
  _TT_STR: { en: {}, ar: {} },
  _tt: (k) => k,
  _ttAr: () => false,
  _ttDir: () => 'ltr',
  CSViewMeta: {
    sat: { label: 'Digital SAT Math' },
    calculus: { label: 'Calculus' }
  }
};
mockWindow.window = mockWindow;

const enhCode = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/16-enhancement-features.js'), 'utf8');
new Function('window', 'document', 'localStorage', enhCode)(mockWindow, mockWindow.document, mockWindow.localStorage);

const assignCode = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/22b-assign-report.js'), 'utf8');
new Function('window', 'document', 'localStorage', '_TT_STR', '_tt', '_ttAr', '_ttDir', assignCode)(
  mockWindow, mockWindow.document, mockWindow.localStorage, mockWindow._TT_STR, mockWindow._tt, mockWindow._ttAr, mockWindow._ttDir
);

test('window.CSTwinProblem.findMatchingQuestion matches chapter topic_id and cycles without immediate duplicates', () => {
  assert(mockWindow.CSTwinProblem, 'window.CSTwinProblem not exposed');
  const q1 = mockWindow.CSTwinProblem.findMatchingQuestion('sat', 'sat-ch1', ['Algebra']);
  const q2 = mockWindow.CSTwinProblem.findMatchingQuestion('sat', 'sat-ch1', ['Algebra']);
  assert(q1 && q1.topic_id === 'sat-ch1', 'Did not filter by chapter topic_id');
  assert(q2 && q2.topic_id === 'sat-ch1', 'Second call did not filter by chapter topic_id');
  assert.notStrictEqual(q1.id, q2.id, 'Should cycle through available topic questions before repeating');
});

test('window.CSExampleGrapher.extractExpressions extracts functions and equations for Desmos plotting', () => {
  assert(mockWindow.CSExampleGrapher, 'window.CSExampleGrapher not exposed');
  const fakeContainer = {
    textContent: 'Worked Example: Consider the quadratic function f(x) = 2x^2 - 4x + 1 and the line y = 3x - 2 where x > 0.',
    querySelectorAll: () => []
  };
  const exprs = mockWindow.CSExampleGrapher.extractExpressions(fakeContainer);
  assert(Array.isArray(exprs) && exprs.length >= 2, 'Expected at least 2 extracted expressions');
  assert(exprs[0].includes('y = 2x^2 - 4x + 1'), 'Expected f(x) converted to y = 2x^2 - 4x + 1, got: ' + exprs[0]);
  assert(exprs[1].includes('y = 3x - 2'), 'Expected y = 3x - 2, got: ' + exprs[1]);
});

test('window.CSDailyPlan.getPlanSummary aggregates due Leitner mistakes and priority focus topic', () => {
  assert(mockWindow.CSDailyPlan, 'window.CSDailyPlan not exposed');
  const summary = mockWindow.CSDailyPlan.getPlanSummary();
  assert.strictEqual(summary.trackId, 'sat');
  assert.strictEqual(summary.dueMistakes, 1);
  assert.strictEqual(summary.focusTopic, 'Linear Equations');
});

test('window.CSGradebook verifies valid vs tampered codes, computes stats & item-analysis miss counts, and exports CSV', () => {
  assert(mockWindow.CSGradebook, 'window.CSGradebook not exposed');
  const sampleText = mockWindow.CSGradebook.generateSampleRoster('SAT');
  const entries = mockWindow.CSGradebook.parseSubmissions(sampleText);
  assert.strictEqual(entries.length, 12, 'Sample roster should contain 12 students');
  assert(entries.every(e => e.valid), 'All sample roster codes must be cryptographically valid');

  // Test tampered code detection
  const tamperedEntries = mockWindow.CSGradebook.parseSubmissions('Fake Student | CLIP-SAT-10OF10-0000 | Missed: Q1');
  assert.strictEqual(tamperedEntries.length, 1);
  assert.strictEqual(tamperedEntries[0].valid, false, 'Tampered code must be flagged invalid');

  // Verify stats & item heatmap on the 12-student sample
  const stats = mockWindow.CSGradebook.computeStats(entries);
  assert.strictEqual(stats.totalStudents, 12);
  assert.strictEqual(stats.validCount, 12);
  assert(stats.meanPct >= 75 && stats.meanPct <= 85, 'Expected mean around 80%');
  assert(stats.itemMissCounts[7] >= 6, 'Question 7 should be identified as a high-miss item in the heatmap');

  // Verify CSV export
  const csv = mockWindow.CSGradebook.toCSV(entries);
  assert(csv.includes('"Student Name","Track","Score","Total","Percentage","Grade","Verification Status","Verification Code","Missed Questions"'));
  assert(csv.includes('"Ahmed Al-Mansoor","SAT","10","10","100%","A","Verified"'));
});

test('window.CSCustomCart filters bank questions and manages cart ordering and deduplication', () => {
  assert(mockWindow.CSCustomCart, 'window.CSCustomCart not exposed');
  mockWindow.CSCustomCart.clear();
  const easyMatches = mockWindow.CSCustomCart.filterBank('sat', 'Algebra', 'Easy', '');
  assert.strictEqual(easyMatches.length, 1);
  assert.strictEqual(easyMatches[0].id, 'sat-q1');

  const allMatches = mockWindow.CSCustomCart.filterBank('sat', 'all', 'all', '');
  assert.strictEqual(allMatches.length, 3);

  // Add two items and test deduplication + reordering
  assert.strictEqual(mockWindow.CSCustomCart.addQuestion(allMatches[0], 'sat'), true);
  assert.strictEqual(mockWindow.CSCustomCart.addQuestion(allMatches[0], 'sat'), false, 'Duplicate add should return false');
  assert.strictEqual(mockWindow.CSCustomCart.addQuestion(allMatches[2], 'sat'), true);
  assert.strictEqual(mockWindow.CSCustomCart.getCart().length, 2);

  mockWindow.CSCustomCart.moveItem(1, -1);
  assert.strictEqual(mockWindow.CSCustomCart.getCart()[0].id, 'sat-q3', 'Second item should move to index 0');
  mockWindow.CSCustomCart.removeAt(0);
  assert.strictEqual(mockWindow.CSCustomCart.getCart().length, 1);
});

console.log(`\n── Student & Teacher Upgrades Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) process.exit(1);
console.log('✅ All Student & Teacher pedagogical upgrade unit tests passed!');
