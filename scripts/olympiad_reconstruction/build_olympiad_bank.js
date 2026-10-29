#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const { generateCh01To04 } = require('./bank_ch01_04');
const { generateCh05To08 } = require('./bank_ch05_08');
const { generateCh09To12 } = require('./bank_ch09_12');

const ROOT = path.resolve(__dirname, '../..');
const OUT_FILE = path.join(ROOT, 'bank-data/olympiad.json');
const FIG_SRC = path.join(ROOT, 'src/scripts/modules/02c-figures.js');

function main() {
  const part1 = generateCh01To04(1);
  const part2 = generateCh05To08(part1.length + 1);
  const part3 = generateCh09To12(part1.length + part2.length + 1);
  const pool = [...part1, ...part2, ...part3];

  if (pool.length !== 1440) {
    throw new Error(`Expected 1440 Olympiad bank items, got ${pool.length}`);
  }

  // Verify per-chapter and per-difficulty counts
  const byTopic = new Map();
  for (const q of pool) {
    if (!byTopic.has(q.topic_id)) byTopic.set(q.topic_id, { easy: 0, medium: 0, hard: 0, figs: 0 });
    const entry = byTopic.get(q.topic_id);
    entry[q.difficulty]++;
    if (q.fig) entry.figs++;
  }
  if (byTopic.size !== 12) {
    throw new Error(`Expected 12 Olympiad chapters in bank, got ${byTopic.size}`);
  }
  for (const [tid, counts] of byTopic.entries()) {
    if (counts.easy !== 40 || counts.medium !== 40 || counts.hard !== 40) {
      throw new Error(`Chapter ${tid} has unbalanced tiers: ${JSON.stringify(counts)}`);
    }
  }

  // Check zero '$', zero drafting strings, and render every figure via 02c-figures.js
  const sandbox = { window: {}, console };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(FIG_SRC, 'utf8'), sandbox);
  if (typeof sandbox.window._renderFig !== 'function') {
    throw new Error('window._renderFig failed to initialize from 02c-figures.js');
  }

  let totalFigs = 0;
  const stemSet = new Set();
  for (let i = 0; i < pool.length; i++) {
    const q = pool[i];
    const serialized = JSON.stringify(q);
    if (serialized.includes('$')) {
      throw new Error(`Dollar sign '$' found in ${q.id}: ${q.text}`);
    }
    if (/\bwait\s*[—:,]|\btemp\b|NaN|undefined/.test(serialized)) {
      throw new Error(`Drafting artifact or NaN/undefined found in ${q.id}`);
    }
    const normStem = q.text.toLowerCase().replace(/\s+/g, ' ').trim();
    if (stemSet.has(normStem)) {
      throw new Error(`Duplicate stem found at ${q.id}: ${q.text.slice(0, 80)}`);
    }
    stemSet.add(normStem);

    if (!Array.isArray(q.hints) || q.hints.length !== 3) {
      throw new Error(`${q.id} does not have 3 progressive hints`);
    }

    if (q.fig) {
      totalFigs++;
      const html = sandbox.window._renderFig(q.fig);
      if (!html || (!html.includes('<svg') && !html.includes('<table'))) {
        throw new Error(`Figure failed to render SVG/table on ${q.id} (${q.fig.type})`);
      }
      if (/NaN|undefined/.test(html)) {
        throw new Error(`Rendered figure HTML contains NaN/undefined on ${q.id} (${q.fig.type})`);
      }
    }
  }

  const bank = {
    letters: ['A', 'B', 'C', 'D'],
    sections: [
      {
        title: 'Section I — Core Mathematical Olympiad (AMC 10/12, AIME, BMO & IMO Foundations)',
        time: '60 minutes',
        notes: 'Algebraic Techniques, Vieta & Inequalities · Modular Number Theory & Diophantine Equations · Bijective Combinatorics, Recurrences, Circle & Triangle Geometry, Invariants & Games'
      },
      {
        title: 'Section II — NSMO of KSA (أولمبياد العلوم والرياضيات الوطني — موهبة)',
        time: '60 minutes',
        notes: 'Mawhiba Stage 1 National Screening · Stage 2 Regional Qualifiers · Riyadh National Finals & Saudi IMO Team Selection Pathway'
      },
      {
        title: 'Section III — KAUST Mathematics Competition (KMC) & KAUST Academy',
        time: '60 minutes',
        notes: 'KAUST Regional Qualifier (Polynomial Interpolation, Lattice Geometry, Floor Sums) · Thuwal Campus Individual, Three-Seat Team Relay & KAUST Academy Synthesis'
      }
    ],
    pool
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(bank, null, 2) + '\n', 'utf8');
  console.log(`✅ Wrote ${pool.length} Olympiad/NSMO/KAUST questions (${totalFigs} verified SVG figures) across ${byTopic.size} chapters to ${OUT_FILE}`);
}

main();
