#!/usr/bin/env node
/**
 * Master curator for foundational and higher-level banks:
 * a2level, addmath, algebra, aslevel, calculus, geo, linalg, mathai, odes, precalc.
 * 
 * Goals:
 * 1. Purge irrelevant / dummy figures attached to pure algebraic or general definition items.
 * 2. Deduplicate figures across repeated problem clusters.
 * 3. Enforce 0 duplicate figures across all 10 banks.
 */
const fs = require('fs');
const path = require('path');

const BANK_DIR = path.join(__dirname, '..', '..', 'bank-data');
const TARGET_BANKS = ['a2level', 'addmath', 'algebra', 'aslevel', 'calculus', 'geo', 'linalg', 'mathai', 'odes', 'precalc'];

function getFigKey(fig) {
  if (!fig) return null;
  return typeof fig === 'object' ? JSON.stringify(fig) : String(fig);
}

function isIrrelevantFigure(q, fig) {
  if (!fig) return false;
  const text = (q.text || '').toLowerCase();
  const figStr = typeof fig === 'object' ? JSON.stringify(fig).toLowerCase() : String(fig).toLowerCase();

  // Pure algebraic, logarithmic, series, matrix or definition questions
  if (text.includes('\\ln') || text.includes('\\log') || 
      text.includes('are always:') || 
      text.includes('sum to:') || 
      text.includes('sum of interior angles') || 
      text.includes('definition') || 
      text.includes('compound angle') ||
      text.includes('\\cos(\\alpha+\\beta)') ||
      text.includes('solve \\(') && !text.includes('shown in the figure')) {
    if (figStr.includes('triangle') || figStr.includes('exp') || figStr.includes('circle')) {
      return true;
    }
  }

  // Pure numerical activation evaluation or table repetition
  if (text.includes('evaluate the output of the standard relu') && figStr.includes('relu')) {
    return false; // relevant, will be deduplicated
  }

  return false;
}

function curateBank(bankName) {
  const filePath = path.join(BANK_DIR, `${bankName}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let pool = [];
  if (Array.isArray(data)) pool = data;
  else if (Array.isArray(data.pool)) pool = data.pool;
  else if (Array.isArray(data.questions)) pool = data.questions;

  console.log(`\n=== Curating ${bankName.toUpperCase()} (Total: ${pool.length}) ===`);

  let removedIrrelevant = 0;
  for (const q of pool) {
    const fig = q.figure || q.fig || q.svg;
    if (fig && isIrrelevantFigure(q, fig)) {
      delete q.figure;
      delete q.fig;
      delete q.svg;
      removedIrrelevant++;
    }
  }
  console.log(`  Removed irrelevant figures: ${removedIrrelevant}`);

  // Deduplicate figures
  const figMap = new Map();
  for (let i = 0; i < pool.length; i++) {
    const q = pool[i];
    const fig = q.figure || q.fig || q.svg;
    if (!fig) continue;
    const k = getFigKey(fig);
    if (!figMap.has(k)) figMap.set(k, [i]);
    else figMap.get(k).push(i);
  }

  let deduplicated = 0;
  for (const [k, indices] of figMap.entries()) {
    if (indices.length <= 1) continue;
    // Keep first instance, purge duplicates on subsequent questions
    for (let j = 1; j < indices.length; j++) {
      const idx = indices[j];
      const q = pool[idx];
      delete q.figure;
      delete q.fig;
      delete q.svg;
      deduplicated++;
    }
  }
  console.log(`  Deduplicated figures: ${deduplicated}`);

  // Verification
  const verifyMap = new Set();
  let remainingDups = 0;
  for (const q of pool) {
    const fig = q.figure || q.fig || q.svg;
    if (!fig) continue;
    const k = getFigKey(fig);
    if (verifyMap.has(k)) remainingDups++;
    else verifyMap.add(k);
  }
  console.log(`  Remaining duplicate figure clusters: ${remainingDups} (Target: 0)`);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

for (const b of TARGET_BANKS) {
  curateBank(b);
}

console.log('\n--- ALL 10 FOUNDATIONAL BANKS CURATED SUCCESSFULLY ---');
