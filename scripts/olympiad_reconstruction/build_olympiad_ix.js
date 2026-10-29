#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const { part1 } = require('./ix_part1_ch01_06');
const { part2 } = require('./ix_part2_ch07_12');

const CHAPTER_ORDER = [
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

const all = Object.assign({}, part1, part2);
const lines = [
  '/* Interactive Practice data for /olympiad/ - one entry per chapter section id.',
  '   Ground-up Olympiad, NSMO of KSA (Mawhiba), and KAUST (KMC & Academy) interactive suite.',
  '   Shipped as public/js/ix/olympiad.js and loaded on /olympiad/ by',
  '   src/scripts/modules/19-interactive-activities-engine-v1.js. */',
  '(window.__ixData = window.__ixData || []).push(function (D) {'
];

let totalActivities = 0;
for (const chId of CHAPTER_ORDER) {
  const list = all[chId];
  if (!Array.isArray(list) || list.length !== 10) {
    throw new Error(`Expected 10 activities for ${chId}, got ${list ? list.length : 'undefined'}`);
  }
  const rawJson = JSON.stringify(list, null, 2);
  if (rawJson.includes('$')) {
    throw new Error(`Forbidden '$' found in ${chId} interactive data`);
  }
  if (/\bwait\s*[—:,]|\btemp\b/i.test(rawJson)) {
    throw new Error(`Drafting string ('wait:'/'temp') found in ${chId}`);
  }
  lines.push(`D[${JSON.stringify(chId)}] = ${rawJson};`);
  totalActivities += list.length;
}
lines.push('});\n');

const outPath = path.join(__dirname, '..', '..', 'src', 'scripts', 'ix-data', 'olympiad.js');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`Wrote ${outPath} (${CHAPTER_ORDER.length} chapters, ${totalActivities} interactive activities).`);
