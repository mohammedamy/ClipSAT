#!/usr/bin/env node
/**
 * scripts/convert_sat_spr.js
 * Converts 25% (412 questions) of clean numerical items across all 10 domains in bank-data/sat.json
 * to native Student-Produced Responses (type: "spr") with sprAnswer and ans attributes.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const satPath = path.join(__dirname, '..', 'bank-data', 'sat.json');
const satData = JSON.parse(fs.readFileSync(satPath, 'utf8'));

const domainDiffs = {};

satData.pool.forEach((q, idx) => {
  const ansStr = (q.choices && q.choices[q.answer] != null) ? String(q.choices[q.answer]).trim() : '';
  const cleanAns = ansStr.replace(/\\\(|\\\)|\$|\\frac\{(\d+)\}\{(\d+)\}/g, (m, a, b) => b ? a + '/' + b : '').trim();
  const isNumerical = /^[-+]?\d+(?:\.\d+)?(?:\/\d+)?$/.test(cleanAns);
  const isWhich = /which of the following|which (equation|expression|statement|graph|point|pair|function)/i.test(q.text || '');

  if (isNumerical && !isWhich) {
    if (!domainDiffs[q.domain]) domainDiffs[q.domain] = { easy: [], medium: [], hard: [] };
    const diff = q.difficulty || 'medium';
    if (domainDiffs[q.domain][diff]) {
      domainDiffs[q.domain][diff].push({ idx, ans: cleanAns });
    }
  }
});

let totalConverted = 0;
const convertedIndices = new Set();

for (const [dom, diffs] of Object.entries(domainDiffs)) {
  const target = (dom === 'Linear Equations in One Variable & Systems of Equations' || dom === 'Equivalent Expressions & Quadratic Equations') ? 42 : 41;
  const picked = [];
  let eI = 0, mI = 0, hI = 0;
  while (picked.length < target) {
    let added = false;
    if (eI < diffs.easy.length && picked.length < target) { picked.push(diffs.easy[eI++]); added = true; }
    if (mI < diffs.medium.length && picked.length < target) { picked.push(diffs.medium[mI++]); added = true; }
    if (hI < diffs.hard.length && picked.length < target) { picked.push(diffs.hard[hI++]); added = true; }
    if (!added) break;
  }
  picked.forEach(p => {
    convertedIndices.add(p.idx);
    const item = satData.pool[p.idx];
    item.type = 'spr';
    item.sprAnswer = p.ans;
    item.ans = p.ans;
  });
  totalConverted += picked.length;
}

fs.writeFileSync(satPath, JSON.stringify(satData, null, 2) + '\n', 'utf8');
console.log(`Successfully converted ${totalConverted} questions in sat.json to type: "spr" (${(totalConverted / satData.pool.length * 100).toFixed(1)}%).`);
