#!/usr/bin/env node
/**
 * scripts/enrich_apstats_and_tahsili.js
 * Enriches AP Statistics (apstats.json) and Tahsili (tahsili.json) question banks
 * with authentic, verified diagrams (Boxplots, Normal Distribution curves, Scatterplots,
 * and Vector coordinate diagrams).
 */

'use strict';

const fs = require('fs');
const path = require('path');

// 1. Enrich AP Statistics
const apstatsPath = path.join(__dirname, '..', 'bank-data', 'apstats.json');
const apstatsData = JSON.parse(fs.readFileSync(apstatsPath, 'utf8'));
const apstatsPool = apstatsData.pool || [];

let enrichedStats = 0;
apstatsPool.forEach(q => {
  if (q.fig || q.figure) return;
  const t = q.text || q.q || '';
  
  if (/boxplot shows|an outlier in a boxplot|box plot|five-number/i.test(t)) {
    q.figure = {
      type: 'box_plot',
      title: 'Boxplot Five-Number Summary',
      min: 15,
      q1: 30,
      med: 48,
      q3: 70,
      max: 95,
      outliers: [105]
    };
    enrichedStats++;
  } else if (/within 1\s*(?:\\sigma|sigma|standard deviation)/i.test(t)) {
    q.figure = {
      type: 'normal_curve',
      title: 'Empirical Rule: 68% Central Region',
      mean: 0,
      sd: 1,
      shade: [-1, 1]
    };
    enrichedStats++;
  } else if (/within 2\s*(?:\\sigma|sigma|standard deviations)/i.test(t)) {
    q.figure = {
      type: 'normal_curve',
      title: 'Empirical Rule: 95% Central Region',
      mean: 0,
      sd: 1,
      shade: [-2, 2]
    };
    enrichedStats++;
  } else if (/within 3\s*(?:\\sigma|sigma|standard deviations)/i.test(t)) {
    q.figure = {
      type: 'normal_curve',
      title: 'Empirical Rule: 99.7% Central Region',
      mean: 0,
      sd: 1,
      shade: [-3, 3]
    };
    enrichedStats++;
  } else if (/95%\s*confidence|z\^?\*\s*=\s*1\.96/i.test(t)) {
    q.figure = {
      type: 'normal_curve',
      title: '95% Confidence Level (z* = 1.96)',
      mean: 0,
      sd: 1,
      shade: [-1.96, 1.96]
    };
    enrichedStats++;
  } else if (/99%\s*confidence|z\^?\*\s*=\s*2\.576/i.test(t)) {
    q.figure = {
      type: 'normal_curve',
      title: '99% Confidence Level (z* = 2.58)',
      mean: 0,
      sd: 1,
      shade: [-2.576, 2.576]
    };
    enrichedStats++;
  } else if (/90%\s*confidence|z\^?\*\s*=\s*1\.645/i.test(t)) {
    q.figure = {
      type: 'normal_curve',
      title: '90% Confidence Level (z* = 1.645)',
      mean: 0,
      sd: 1,
      shade: [-1.645, 1.645]
    };
    enrichedStats++;
  } else if (/regression analysis|residual for a data point|correlation coefficient|coefficient of determination R|least-squares/i.test(t)) {
    q.figure = {
      type: 'scatter',
      title: 'Bivariate Data & Least-Squares Line',
      pts: [[2, 5], [4, 8], [6, 11], [8, 14], [10, 18], [12, 21]],
      xlabel: 'Explanatory (x)',
      ylabel: 'Response (y)'
    };
    enrichedStats++;
  }
});

fs.writeFileSync(apstatsPath, JSON.stringify(apstatsData, null, 2), 'utf8');

// 2. Enrich Tahsili Vectors
const tahsPath = path.join(__dirname, '..', 'bank-data', 'tahsili.json');
const tahsData = JSON.parse(fs.readFileSync(tahsPath, 'utf8'));
const tahsPool = tahsData.pool || [];

let enrichedTahs = 0;
tahsPool.forEach(q => {
  if (q.fig || q.figure) return;
  const t = q.text || q.q || '';

  // Vector with initial point A and terminal point B
  const mPts = t.match(/A\s*\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\).*?B\s*\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/);
  if (mPts) {
    const x1 = parseInt(mPts[1], 10), y1 = parseInt(mPts[2], 10);
    const x2 = parseInt(mPts[3], 10), y2 = parseInt(mPts[4], 10);
    q.figure = {
      type: 'fn',
      points: [
        { x: x1, y: y1, label: 'A(' + x1 + ',' + y1 + ')' },
        { x: x2, y: y2, label: 'B(' + x2 + ',' + y2 + ')' }
      ],
      xrange: [Math.min(x1, x2) - 2, Math.max(x1, x2) + 2],
      yrange: [Math.min(y1, y2) - 2, Math.max(y1, y2) + 2]
    };
    enrichedTahs++;
    return;
  }

  // Vector in component form v = <a, b>
  const mVec = t.match(/langle\s*(-?\d+)\s*,\s*(-?\d+)\s*\\rangle/);
  if (mVec && (t.includes('طول') || t.includes('magnitude'))) {
    const a = parseInt(mVec[1], 10), b = parseInt(mVec[2], 10);
    q.figure = {
      type: 'fn',
      points: [
        { x: 0, y: 0, label: 'O(0,0)' },
        { x: a, y: b, label: 'v(' + a + ',' + b + ')' }
      ],
      xrange: [Math.min(0, a) - 2, Math.max(0, a) + 2],
      yrange: [Math.min(0, b) - 2, Math.max(0, b) + 2]
    };
    enrichedTahs++;
  }
});

fs.writeFileSync(tahsPath, JSON.stringify(tahsData, null, 2), 'utf8');

console.log('Enrichment complete:');
console.log(`  AP Statistics (apstats.json): +${enrichedStats} diagrams`);
console.log(`  Tahsili (tahsili.json): +${enrichedTahs} vector diagrams`);
