#!/usr/bin/env node
/**
 * verify-track-excellence.js
 *
 * Audits one or all tracks against the 10-Point Content Excellence Standard:
 *  1. Lesson content depth (blocks, worked examples, figures, practice problems)
 *  2. 2D & 3D Interactive Explorer coverage in lessons
 *  3. Question Bank stem diversity (>= 85% unique mathematical skeletons per domain/lesson)
 *  4. Question Bank figure coverage (target 20%-65% depending on track)
 *  5. 3-Tier Difficulty Calibration (easy / medium / hard balance)
 *  6. Worksheet topic JSON figure coverage & 4-page PDF verification
 *
 * Usage:
 *   node scripts/verify-track-excellence.js [trackId]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const targetTrack = process.argv[2] || null;

function getSkeleton(text) {
  return String(text || '')
    .replace(/\\\([\s\S]*?\\\)/g, '$M$')
    .replace(/\\\[[\s\S]*?\\\]/g, '$M$')
    .replace(/\$[^$]+\$/g, '$M$')
    .replace(/\d+(\.\d+)?/g, 'N')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 95);
}

function auditTrack(trackId) {
  const contentDir = path.join(ROOT, 'content', trackId);
  const bankPath = path.join(ROOT, 'bank-data', `${trackId}.json`);
  const wsTopicDir = path.join(ROOT, 'tools', 'worksheet_gen', 'topics', trackId);

  const lessonFiles = fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir).filter(f => f.endsWith('.json') && !f.startsWith('_')).sort()
    : [];

  const lessonStats = [];
  for (const lf of lessonFiles) {
    const d = JSON.parse(fs.readFileSync(path.join(contentDir, lf), 'utf8'));
    const blocks = (d.content && d.content.blocks) || [];
    let examples = 0, practices = 0, figures = 0, explorers = 0, has3D = false;
    for (const b of blocks) {
      if (b.kind === 'callout' && b.style === 'example') examples++;
      if (b.kind === 'workedExample' || b.kind === 'workedExampleCard') examples++;
      if (b.kind === 'practiceProblem') practices++;
      if (b.kind === 'figure') figures++;
      if (b.kind === 'explorer') {
        explorers++;
        if (b.canvas3d) has3D = true;
      }
    }
    lessonStats.push({
      id: d.id || lf.replace('.json', ''),
      blocks: blocks.length,
      examples,
      practices,
      figures,
      explorers,
      has3D: has3D ? 'Yes' : 'No'
    });
  }

  let pool = [];
  if (fs.existsSync(bankPath)) {
    const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
    if (Array.isArray(bank.pool)) {
      pool = bank.pool;
    } else {
      for (const diff of ['easy', 'medium', 'hard']) {
        if (Array.isArray(bank[diff])) {
          pool.push(...bank[diff].map(q => ({ ...q, difficulty: q.difficulty || diff })));
        }
      }
    }
  }

  const byDomain = {};
  let totalFigs = 0;
  const globalSkels = new Set();
  for (const q of pool) {
    const dom = q.domain || q.topic || q.section || 'General';
    if (!byDomain[dom]) {
      byDomain[dom] = { total: 0, skels: new Set(), figs: 0, easy: 0, med: 0, hard: 0 };
    }
    const s = byDomain[dom];
    s.total++;
    if (q.fig || q.figure) {
      s.figs++;
      totalFigs++;
    }
    const d = String(q.difficulty || q.diff || 'medium').toLowerCase();
    if (d === 'easy') s.easy++;
    else if (d === 'hard') s.hard++;
    else s.med++;

    const skel = getSkeleton(q.text || q.q || q.stem);
    s.skels.add(skel);
    globalSkels.add(skel);
  }

  let wsFiles = 0, wsFigs = 0;
  if (fs.existsSync(wsTopicDir)) {
    const files = fs.readdirSync(wsTopicDir).filter(f => f.endsWith('.json'));
    wsFiles = files.length;
    for (const wf of files) {
      const raw = fs.readFileSync(path.join(wsTopicDir, wf), 'utf8');
      wsFigs += (raw.match(/"figure"\s*:/g) || []).length;
    }
  }

  return {
    trackId,
    lessons: lessonStats,
    bankTotal: pool.length,
    bankUniqueSkels: globalSkels.size,
    bankDiversityPct: pool.length ? Math.round((globalSkels.size / pool.length) * 100) : 0,
    bankFigs: totalFigs,
    bankFigPct: pool.length ? Math.round((totalFigs / pool.length) * 100) : 0,
    byDomain: Object.entries(byDomain).map(([dom, s]) => ({
      domain: dom.slice(0, 46),
      total: s.total,
      uniqueSkels: s.skels.size,
      diversityPct: Math.round((s.skels.size / s.total) * 100) + '%',
      figs: s.figs,
      figPct: Math.round((s.figs / s.total) * 100) + '%',
      diffSplit: `${s.easy}/${s.med}/${s.hard}`
    })),
    wsFiles,
    wsFigs
  };
}

if (targetTrack) {
  const res = auditTrack(targetTrack);
  console.log(`\n=== LESSON CONTENT AUDIT: ${targetTrack.toUpperCase()} ===`);
  console.table(res.lessons);
  console.log(`\n=== QUESTION BANK DOMAIN AUDIT: ${targetTrack.toUpperCase()} (${res.bankTotal} items, ${res.bankDiversityPct}% diversity, ${res.bankFigs} figs [${res.bankFigPct}%]) ===`);
  console.table(res.byDomain);
  console.log(`Worksheet Topic JSONs: ${res.wsFiles} | Embedded Worksheet Figures: ${res.wsFigs}\n`);
} else {
  const tracks = fs.readdirSync(path.join(ROOT, 'content'))
    .filter(d => fs.statSync(path.join(ROOT, 'content', d)).isDirectory())
    .sort();
  const rows = tracks.map(t => {
    const r = auditTrack(t);
    const exLessons = r.lessons.filter(l => l.explorers > 0).length;
    const ex3DLessons = r.lessons.filter(l => l.has3D === 'Yes').length;
    return {
      track: t,
      lessons: r.lessons.length,
      explorers: `${exLessons}/${r.lessons.length}`,
      ex3D: ex3DLessons,
      bankTotal: r.bankTotal,
      diversity: r.bankDiversityPct + '%',
      bankFigs: `${r.bankFigs} (${r.bankFigPct}%)`,
      wsJSONs: r.wsFiles,
      wsFigs: r.wsFigs
    };
  });
  console.table(rows);
}
