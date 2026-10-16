#!/usr/bin/env node
/**
 * scripts/test-exam-modular-specs.js
 * Unit test suite for Pillar 5 Curricular & Regional Precision:
 * - Cambridge 9709 Modular Papers (P1, P2, P3, P4, P5, P6)
 * - IB AA/AI Disaggregated Pathways (SL & HL)
 * - Pearson Edexcel IGCSE (4MA1) & IAL Modular (WMA11-14, WME01, WST01)
 * - Saudi GAT & SAAT English Medium
 * - Competition Math (Mawhiba / Kangaroo Arabia & AMC 10/12)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('── Running Pillar 5 Modular Exam Specs & Blueprints Unit Tests ──');

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

// Set up simulated browser environment
const window = {
  _shuffle: function(arr) { return (arr || []).slice(); },
  CSFormatBilingual: function(s) {
    if (!s && s !== 0) return '';
    var str = String(s).trim();
    var m = /^(.*?)\s*<br\s*\/?>\s*<em>(.*?)<\/em>$/is.exec(str);
    if (m) {
      return '<span class="q-lang-wrap"><span class="q-lang-ar" dir="rtl">' + m[1].trim() + '</span><span class="q-lang-en" dir="ltr">' + m[2].trim() + '</span></span>';
    }
    return s;
  }
};
global.window = window;
global.document = {
  getElementById: () => ({ src: 'img/logo.png' }),
  querySelectorAll: () => [],
  dispatchEvent: () => true,
  body: {
    classList: {
      _classes: new Set(),
      add: function(c) { this._classes.add(c); },
      remove: function(c) { this._classes.delete(c); },
      contains: function(c) { return this._classes.has(c); }
    }
  }
};
global.localStorage = {
  _data: {},
  setItem: function(k, v) { this._data[k] = String(v); },
  getItem: function(k) { return this._data[k] || null; }
};

// Load modules in order: 05c (blueprints) -> 02b (bank exam) -> 05a (ai test)
const bpCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '05c-exam-blueprints.js'), 'utf8');
const bpFn = new Function('window', bpCode);
bpFn(window);

const examCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '02b-bank-exam.js'), 'utf8');
const examFn = new Function('window', examCode);
examFn(window);

const aiCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '05a-ai-test.js'), 'utf8');
const aiFn = new Function('window', aiCode);
aiFn(window);

// 1. Verify Blueprints Existence & Completeness
it('Blueprints exist for all modular Cambridge 9709 papers', () => {
  const papers = [
    'Cambridge AS Level — Paper 1 (Pure 1)',
    'Cambridge AS Level — Paper 2 (Pure 2)',
    'Cambridge AS Level — Paper 4 (Mechanics)',
    'Cambridge AS Level — Paper 5 (Statistics 1)',
    'Cambridge A Level — Paper 3 (Pure 3)',
    'Cambridge A Level — Paper 4 (Mechanics)',
    'Cambridge A Level — Paper 6 (Statistics 2)'
  ];
  papers.forEach(p => {
    const bp = window.ClipSATBlueprints.get(p);
    assert.ok(bp, `Blueprint should exist for ${p}`);
    assert.ok(bp.topics && bp.topics.length >= 4, `${p} should have at least 4 syllabus topics`);
  });
});

it('Blueprints exist for IB AA and AI pathways (SL & HL)', () => {
  const ibExams = [
    'IB Math SL (AA)',
    'IB Math SL (AI)',
    'IB Math HL (AA)',
    'IB Math HL (AI)'
  ];
  ibExams.forEach(e => {
    const bp = window.ClipSATBlueprints.get(e);
    assert.ok(bp, `Blueprint should exist for ${e}`);
    assert.ok(bp.topics && bp.topics.length >= 5, `${e} should have at least 5 syllabus topics`);
  });
  // Verify trackId alias resolution
  assert.strictEqual(window.ClipSATBlueprints.get('ibslaa'), window.ClipSATBlueprints.get('IB Math SL (AA)'));
  assert.strictEqual(window.ClipSATBlueprints.get('ibslai'), window.ClipSATBlueprints.get('IB Math SL (AI)'));
  assert.strictEqual(window.ClipSATBlueprints.get('ibhlaa'), window.ClipSATBlueprints.get('IB Math HL (AA)'));
  assert.strictEqual(window.ClipSATBlueprints.get('ibhlai'), window.ClipSATBlueprints.get('IB Math HL (AI)'));
});

it('Blueprints exist for Pearson Edexcel IGCSE (4MA1) and IAL modular units', () => {
  const edexcelExams = [
    'Edexcel IGCSE (4MA1) — Paper 1H',
    'Edexcel IGCSE (4MA1) — Paper 2H',
    'Edexcel IAL — Pure Mathematics 1 (WMA11)',
    'Edexcel IAL — Pure Mathematics 2 (WMA12)',
    'Edexcel IAL — Pure Mathematics 3 (WMA13)',
    'Edexcel IAL — Pure Mathematics 4 (WMA14)',
    'Edexcel IAL — Mechanics 1 (WME01)',
    'Edexcel IAL — Statistics 1 (WST01)'
  ];
  edexcelExams.forEach(e => {
    const bp = window.ClipSATBlueprints.get(e);
    assert.ok(bp, `Blueprint should exist for ${e}`);
    assert.ok(bp.topics && bp.topics.length >= 4, `${e} should have at least 4 syllabus topics`);
  });
});

it('Blueprints exist for English GAT, SAAT, and Competition Math', () => {
  const menaExams = [
    'GAT Quantitative (English Medium)',
    'SAAT Mathematics (English Medium)',
    'Mawhiba & Kangaroo Math Arabia (Senior)',
    'AMC 10/12 Mathematics Competition'
  ];
  menaExams.forEach(e => {
    const bp = window.ClipSATBlueprints.get(e);
    assert.ok(bp, `Blueprint should exist for ${e}`);
    assert.ok(bp.topics && bp.topics.length >= 3, `${e} should have at least 3 topics`);
  });
});

// 2. Verify window.examSpecs Definitions
it('window.examSpecs defines complete metadata, timing, and sections for all new papers', () => {
  const allSpecs = [
    'Cambridge AS Level — Paper 1 (Pure 1)',
    'Cambridge AS Level — Paper 2 (Pure 2)',
    'Cambridge AS Level — Paper 4 (Mechanics)',
    'Cambridge AS Level — Paper 5 (Statistics 1)',
    'Cambridge A Level — Paper 3 (Pure 3)',
    'Cambridge A Level — Paper 4 (Mechanics)',
    'Cambridge A Level — Paper 6 (Statistics 2)',
    'IB Math SL (AA)',
    'IB Math SL (AI)',
    'IB Math HL (AA)',
    'IB Math HL (AI)',
    'Edexcel IGCSE (4MA1) — Paper 1H',
    'Edexcel IGCSE (4MA1) — Paper 2H',
    'Edexcel IAL — Pure Mathematics 1 (WMA11)',
    'Edexcel IAL — Pure Mathematics 2 (WMA12)',
    'Edexcel IAL — Pure Mathematics 3 (WMA13)',
    'Edexcel IAL — Pure Mathematics 4 (WMA14)',
    'Edexcel IAL — Mechanics 1 (WME01)',
    'Edexcel IAL — Statistics 1 (WST01)',
    'GAT Quantitative (English Medium)',
    'SAAT Mathematics (English Medium)',
    'Mawhiba & Kangaroo Math Arabia (Senior)',
    'AMC 10/12 Mathematics Competition'
  ];

  allSpecs.forEach(name => {
    const sp = window.examSpecs[name];
    assert.ok(sp, `examSpecs should have definition for "${name}"`);
    assert.ok(sp.bankId, `"${name}" must specify an explicit bankId to guarantee bank retrieval`);
    const bankFilePath = path.join(__dirname, '..', 'bank-data', `${sp.bankId}.json`);
    assert.ok(fs.existsSync(bankFilePath), `bank file for "${name}" (${sp.bankId}.json) must exist on disk`);
    assert.ok(sp.title, `"${name}" must have a title`);
    assert.ok(sp.totalTime, `"${name}" must have totalTime`);
    assert.ok(sp.instructions && sp.instructions.length >= 2, `"${name}" must have instructions`);
    assert.ok(sp.sections && sp.sections.length >= 1, `"${name}" must have sections`);
    sp.sections.forEach(sec => {
      assert.ok(sec.parts && sec.parts.length >= 1, `Section "${sec.title}" in "${name}" must have parts`);
      sec.parts.forEach(p => {
        assert.ok(typeof p.q === 'number' && p.q > 0, `Part in "${name}" must have positive q count`);
      });
    });
  });
});

// 3. Test Full Exam Generation with Simulated Question Banks
it('bankGenFullExam renders clean examination paper with cover, instructions, and questions', () => {
  // Prepopulate mock bank
  const asBank = require('../bank-data/aslevel.json');
  window.fullExamBank = {
    aslevel: asBank
  };

  let renderedHtml = '';
  const mockBtn = {
    closest: () => ({
      querySelector: () => ({
        set innerHTML(val) { renderedHtml = val; },
        get innerHTML() { return renderedHtml; }
      })
    })
  };

  window.CSBankExam.genFullExam(mockBtn, 'Cambridge AS Level — Paper 4 (Mechanics)', 'aslevel', [], 8);

  assert.ok(renderedHtml.includes('full-exam-paper'), 'Should render full-exam-paper wrapper');
  assert.ok(renderedHtml.includes('Cambridge AS Level 9709 — Paper 4 Mechanics'), 'Should include official exam title');
  assert.ok(renderedHtml.includes('Forces &amp; Equilibrium') || renderedHtml.includes('Newton') || renderedHtml.includes('Mechanics'), 'Should draw mechanics domains');
  assert.ok(renderedHtml.includes('fep-cover-page'), 'Should include official cover page');
  assert.ok(renderedHtml.includes('fep-score-box-big'), 'Should include examiner score box');
  assert.ok(renderedHtml.includes('Working Space:'), 'Mechanics FRQ paper should render working spaces');
});

it('GAT Quantitative (English Medium) sets English language mode and renders clean English', () => {
  const qudBank = require('../bank-data/qudrat.json');
  window.fullExamBank = {
    qudrat: qudBank
  };

  let renderedHtml = '';
  const mockBtn = {
    closest: () => ({
      querySelector: () => ({
        set innerHTML(val) { renderedHtml = val; },
        get innerHTML() { return renderedHtml; }
      })
    })
  };

  window.CSBankExam.genFullExam(mockBtn, 'GAT Quantitative (English Medium)', 'qudrat', [], 10);

  assert.ok(global.document.body.classList.contains('cs-lang-en'), 'Should switch body to cs-lang-en');
  assert.ok(renderedHtml.includes('GAT General Aptitude Test — Quantitative Section (English)'), 'Should include English title');
  assert.ok(renderedHtml.includes('q-lang-en'), 'Should include English question spans');
  assert.ok(renderedHtml.includes('fep-anssheet'), 'Multiple choice exam should include answer bubble sheet');
});

console.log(`\n── Modular Exam Specs Summary: ${passed} passed, ${failed} failed ──`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ All Pillar 5 modular exam specs tests passed successfully!\n');
  process.exit(0);
}
