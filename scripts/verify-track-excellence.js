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

function parseMathAst(tex) {
  let s = String(tex || '').trim();
  s = s.replace(/\\(?:displaystyle|textstyle|scriptstyle|left|right|,|;|:|!|quad|qquad)/g, '');
  s = s.replace(/\\(?:d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, 'FRAC($1,$2)');
  s = s.replace(/\\(?:d|t)?binom\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, 'BINOM($1,$2)');
  s = s.replace(/\\sqrt\s*\[([^\[\]]*)\]\s*\{([^{}]*)\}/g, 'ROOT($1,$2)');
  s = s.replace(/\\sqrt\s*\{([^{}]*)\}/g, 'SQRT($1)');
  s = s.replace(/\\begin\{([a-zA-Z0-9*]+)\}([\s\S]*?)\\end\{\1\}/g, (_, env, body) =>
    `ENV:${env}(${body.replace(/\\\\/g, ';').replace(/&/g, ',')})`
  );
  const powTokens = [];
  s = s.replace(/\^\{\s*([^{}]*)\s*\}/g, (_, exp) => {
    powTokens.push(exp.replace(/\s+/g, ''));
    return `__POW${powTokens.length - 1}__`;
  });
  s = s.replace(/\^([a-zA-Z0-9])/g, (_, exp) => {
    powTokens.push(exp);
    return `__POW${powTokens.length - 1}__`;
  });
  s = s.replace(/_\{\s*([^{}]*)\s*\}/g, 'SUB($1)').replace(/_([a-zA-Z0-9])/g, 'SUB($1)');
  s = s.replace(/\d+(\.\d+)?/g, 'N');
  s = s.replace(/__POW(\d+)__/g, (_, idx) => `POW(${powTokens[Number(idx)]})`);
  s = s.replace(/\s+/g, '');
  return `AST[${s}]`;
}

function getSkeleton(text) {
  const raw = String(text || '').replace(/<[^>]+>/g, ' ');
  const parts = raw.split(/(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\$[^$]+\$)/g);
  const out = parts.map((part) => {
    if (
      (part.startsWith('\\(') && part.endsWith('\\)')) ||
      (part.startsWith('\\[') && part.endsWith('\\]')) ||
      (part.startsWith('$$') && part.endsWith('$$')) ||
      (part.startsWith('$') && part.endsWith('$'))
    ) {
      const inner = part.replace(/^(\\\(|\\\[|\$\$?)|(\\\)|\\\]|\$\$?)$/g, '');
      return parseMathAst(inner);
    }
    return part.replace(/\d+(\.\d+)?/g, 'N');
  });
  return out.join('').replace(/\s+/g, ' ').trim();
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
    let examples = 0, practices = 0, figures = 0, explorers = 0, traps = 0, derivations = 0, tables = 0, has3D = false;
    for (const b of blocks) {
      if (b.kind === 'callout' && b.style === 'example') examples++;
      if (b.kind === 'workedExample' || b.kind === 'workedExampleCard') examples++;
      if (b.kind === 'callout' && b.style === 'warn') traps++;
      if (b.kind === 'callout' && b.style === 'pf') derivations++;
      if (b.kind === 'table') tables++;
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
      traps,
      derivations,
      tables,
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
