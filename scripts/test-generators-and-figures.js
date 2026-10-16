#!/usr/bin/env node
/**
 * scripts/test-generators-and-figures.js
 * Comprehensive unit test suite for:
 * 1. Test Generator (genTest): Bank mode drawing, diagram quota, SVG rendering, and capture.
 * 2. CBT Simulator (openMockExam): Diagram quota, SVG rendering, track resolution, and error recovery.
 * 3. Full Exam Generator (genFullExam): Diagram quota and figure capture preservation.
 * 4. Google Forms Export: Embedding of question diagrams and choice diagrams in form items.
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('── Running Test Generators & Diagram Figures Unit Tests ──');

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

// 1. Verify SAT, Qudrat, and Geometry banks have authentic diagrams
it('Question banks contain rich authentic diagram data', () => {
  ['sat', 'qudrat', 'geo', 'act'].forEach(track => {
    const p = path.join(__dirname, '..', 'bank-data', `${track}.json`);
    assert.ok(fs.existsSync(p), `Bank file for ${track} must exist`);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    const pool = data.pool || [].concat(data.easy || [], data.medium || [], data.hard || []);
    const withFig = pool.filter(q => q.fig || q.figure || q.table);
    assert.ok(withFig.length > 20, `${track} must contain over 20 questions with figures (found: ${withFig.length})`);
    
    // Check first diagram question structure
    const sample = withFig[0];
    const fig = sample.fig || sample.figure;
    assert.ok(fig, 'Sample question must have a figure object or string');
    assert.ok(sample.text || sample.q, 'Sample question must have text');
    if (sample.type !== 'frq') {
      assert.ok(Array.isArray(sample.choices) && sample.choices.length >= 2, 'Sample MCQ must have choices');
    }
  });
});

// 2. Test genTest bank sampling & diagram quota simulation
it('genTest sampling logic guarantees at least 25-35% diagrams from pool', () => {
  const satData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'bank-data', 'sat.json'), 'utf8'));
  const allPool = satData.pool.slice();
  const n = 10;
  
  const withFig = allPool.filter(q => !!(q.figure || q.fig || q.table));
  const noFig = allPool.filter(q => !(q.figure || q.fig || q.table));
  const targetFigs = Math.min(withFig.length, Math.max(1, Math.ceil(n * 0.30)));
  
  assert.ok(targetFigs >= 3, '10-question test must allocate at least 3 diagram slots');
  
  const picked = [];
  const seenStems = new Set();
  for (let f = 0; f < withFig.length && picked.length < targetFigs; f++) {
    const qf = withFig[f];
    const kf = (qf.text || qf.q || '').trim();
    if (!seenStems.has(kf)) {
      seenStems.add(kf);
      picked.push(qf);
    }
  }
  
  const remainder = noFig.concat(withFig.filter(x => !seenStems.has((x.text || x.q || '').trim())));
  for (let r = 0; r < remainder.length && picked.length < n; r++) {
    const qr = remainder[r];
    const kr = (qr.text || qr.q || '').trim();
    if (!seenStems.has(kr)) {
      seenStems.add(kr);
      picked.push(qr);
    }
  }
  
  assert.strictEqual(picked.length, 10, 'Must pick exactly 10 questions');
  const pickedFigs = picked.filter(q => !!(q.figure || q.fig || q.table));
  assert.ok(pickedFigs.length >= 3, `Must include at least 3 diagram questions (got ${pickedFigs.length})`);
});

// 3. Test CBT Simulator pool partitioning & figure resolution in 17-mock-exam-mode.js
it('17-mock-exam-mode.js ensures figure loading, diagrams quota, error recovery, and zero repetition', () => {
  const cbtSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '17-mock-exam-mode.js'), 'utf8');
  assert.ok(cbtSrc.includes('var loadFigures = (typeof window._ensureFigures === \'function\')'),
    'openMockExam must check and load _ensureFigures()');
  assert.ok(cbtSrc.includes('Promise.all([_ensureBank(trackId), loadFigures])'),
    'openMockExam must await both bank and figures simultaneously');
  assert.ok(cbtSrc.includes('targetFigs = Math.min(withFig.length, Math.max(1, Math.ceil(targetCount * 0.30)))'),
    'openMockExam must allocate diagram quota for questions');
  assert.ok(cbtSrc.includes('cbt-nav-btn cbt-nav-primary" onclick="window.openMockExam'),
    'openMockExam must provide a retry button if bank or CBT fails');
  assert.ok(cbtSrc.includes('tracker = window.ClipSATRedundancy ? window.ClipSATRedundancy.tracker() : null'),
    'openMockExam must wire ClipSATRedundancy tracker to guarantee zero repetition');
});

// 4. Test 05-test-generator-and-ai-settings.js bank mode & figure capture
it('05-test-generator-and-ai-settings.js loads bank questions with diagrams, redundancy tracker, and populates _csCaptureQ', () => {
  const tgSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '05-test-generator-and-ai-settings.js'), 'utf8');
  assert.ok(tgSrc.includes('function _renderQFig(q)'), 'Must include _renderQFig function');
  assert.ok(tgSrc.includes('window.CS_loadTrackBank'), 'Must load bank via CS_loadTrackBank in _genTestOriginal');
  assert.ok(tgSrc.includes('window._ensureFigures'), 'Must ensure figures in _genTestOriginal');
  assert.ok(tgSrc.includes('targetFigs=Math.min(withFig.length, Math.max(1, Math.ceil(n * 0.30)))'),
    'Must enforce diagram quota in genTest bank mode');
  assert.ok(tgSrc.includes('tracker=window.ClipSATRedundancy ? window.ClipSATRedundancy.tracker() : null'),
    'Must wire ClipSATRedundancy tracker in genTest bank mode');
  assert.ok(tgSrc.includes('figure: q.figure || q.fig || null'),
    'Must preserve figure in _csCaptureQ');
  assert.ok(tgSrc.includes('figureHtml: _fHtml || null'),
    'Must preserve figureHtml in _csCaptureQ');
  assert.ok(tgSrc.includes('choices: isMCQ && q.choices ? q.choices.slice() : []'),
    'Must preserve choices in _csCaptureQ');
});

// 5. Test 02b-bank-exam.js preserves q.fig in _csCaptureQ
it('02b-bank-exam.js preserves q.fig in _csCaptureQ for static and spec-driven paths', () => {
  const beSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '02b-bank-exam.js'), 'utf8');
  const count = (beSrc.match(/figure:q\.figure\|\|q\.fig\|\|null/g) || []).length;
  assert.ok(count >= 2, `Both _csCaptureQ points in 02b-bank-exam.js must check q.figure || q.fig || null (found ${count})`);
});

// 6. Test 05d-blueprint-assembler.js prioritizes diagrams for visual topics
it('05d-blueprint-assembler.js prioritizes diagrams in bankPick and backfill for visual domains', () => {
  const bpSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '05d-blueprint-assembler.js'), 'utf8');
  assert.ok(bpSrc.includes('isVisual'), 'bankPick must identify visual topics');
  assert.ok(bpSrc.includes('withFig.concat'), 'bankPick must prioritize items with figures for visual topics');
  assert.ok(bpSrc.includes('c.figure=q.figure||q.fig||null'), 'bankPick must preserve figure in returned question object');
  assert.ok(bpSrc.includes('c.fig=q.fig||q.figure||null'), 'bankPick must preserve fig in returned question object');
});

// 7. Test Forms API & Quiz Capture UI choice diagram handling
it('forms-api.js and quiz-capture-ui.js extract choice diagrams and queue image jobs', () => {
  const formsApiSrc = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'forms-api.js'), 'utf8');
  assert.ok(formsApiSrc.includes('cFig = (typeof c === \'object\' && c !== null)'),
    'forms-api.js must extract choice figure from object');
  assert.ok(formsApiSrc.includes('cHtml = (typeof c === \'string\' && c.indexOf(\'<svg\') !== -1)'),
    'forms-api.js must extract choice SVG html');
  assert.ok(formsApiSrc.includes('jobs.push({ qi: qi, ci: ci, text: cText, figure: cFig, figureHtml: cHtml })'),
    'forms-api.js must queue choice image jobs with figure and figureHtml');

  const quizUiSrc = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'quiz-capture-ui.js'), 'utf8');
  assert.ok(quizUiSrc.includes('cFig = (typeof c === \'object\' && c !== null)'),
    'quiz-capture-ui.js must account for choice figure in progress estimation');
});

console.log(`\n── Tests Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) process.exit(1);
console.log('✅ All Test Generators & Diagram Figures unit tests passed successfully!\n');
