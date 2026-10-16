#!/usr/bin/env node
/**
 * scripts/enrich_aslevel_diagrams.js
 * Enriches Cambridge AS Level (aslevel.json) question bank with authentic,
 * verified geometric diagrams (Circular Measure sectors) and statistical
 * distributions (Normal Distribution shaded bell curves).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const bankPath = path.join(__dirname, '..', 'bank-data', 'aslevel.json');
const data = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
const pool = data.pool || [];

let enrichedCM = 0;
let enrichedNorm = 0;

pool.forEach(q => {
  if (q.fig || q.figure) return;
  const t = q.text || q.q || '';
  const cleanAns = String(q.answer != null && q.choices ? q.choices[q.answer] : (q.answer || '')).trim();

  // 1. Circular Measure: Sector Diagrams
  if (q.domain === 'Circular Measure') {
    const mR = t.match(/radius[^\d]+(\d+(?:\.\d+)?)/i);
    const mA = t.match(/angle[^\d]+(\d+(?:\.\d+)?)[^\d]+rad/i);
    if (mR && mA) {
      let r = mR[1];
      const theta = parseFloat(mA[1]);
      // Guard against leaking radius if question asks to find radius
      if (/find (?:the )?radius|calculate (?:the )?radius|what is (?:the )?radius/i.test(t)) {
        r = 'r';
      }
      if (theta > 0 && theta < Math.PI * 2) {
        let deg = Math.round(theta * 180 / Math.PI);
        if (deg < 10) deg = 10;
        if (deg > 350) deg = 350;
        q.figure = {
          type: 'circle',
          center: 'O',
          radius: r,
          sector: {
            start_deg: 0,
            end_deg: deg,
            label: theta + ' rad'
          }
        };
        enrichedCM++;
      }
    }
  }

  // 2. Normal Distribution: Shaded Bell Curves
  if (q.domain === 'Normal Distribution') {
    const m = t.match(/N\s*\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?|\d+\^2)\s*\)/);
    if (m) {
      const mu = parseFloat(m[1]);
      let variance = m[2];
      let sigma;
      if (variance.includes('^2')) sigma = parseFloat(variance.replace('^2', ''));
      else sigma = Math.sqrt(parseFloat(variance));

      let shade = null;
      const mLess = t.match(/P\s*\(\s*X\s*<\s*([0-9.]+)\s*\)/);
      const mGreater = t.match(/P\s*\(\s*X\s*>\s*([0-9.]+)\s*\)/);
      const mBetween = t.match(/P\s*\(\s*([0-9.]+)\s*<\s*X\s*<\s*([0-9.]+)\s*\)/);

      if (mLess) {
        const k = parseFloat(mLess[1]);
        shade = [Math.round((mu - 3.5 * sigma) * 10) / 10, k];
      } else if (mGreater) {
        const k = parseFloat(mGreater[1]);
        shade = [k, Math.round((mu + 3.5 * sigma) * 10) / 10];
      } else if (mBetween) {
        shade = [parseFloat(mBetween[1]), parseFloat(mBetween[2])];
      }

      if (shade && sigma > 0) {
        q.figure = {
          type: 'normal_curve',
          title: 'X ~ N(' + mu + ', ' + variance + ')',
          mean: mu,
          sd: Math.round(sigma * 100) / 100,
          shade: shade
        };
        enrichedNorm++;
      }
    }
  }
});

fs.writeFileSync(bankPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`Enriched aslevel.json:`);
console.log(`  Circular Measure sectors: ${enrichedCM}`);
console.log(`  Normal Distribution curves: ${enrichedNorm}`);
console.log(`  Total new diagrams: ${enrichedCM + enrichedNorm}`);
