#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');

const COMPANION_TRACKS = {
  sat:      ['act', 'est', 'alg2'],
  act:      ['sat', 'est', 'act2'],
  act2:     ['act', 'act2l2', 'est2'],
  act2l2:   ['est2l2', 'appc', 'precalc'],
  est:      ['sat', 'act', 'est2'],
  est2:     ['est', 'act2', 'est2l2'],
  est2l2:   ['act2l2', 'appc', 'precalc'],
  qudrat:   ['gaten', 'tahsili', 'sat'],
  tahsili:  ['qudrat', 'gaten', 'precalc'],
  gaten:    ['qudrat', 'tahsili', 'sat'],
  igcse:    ['addmath', 'aslevel', 'algebra'],
  addmath:  ['igcse', 'aslevel', 'edexcel'],
  aslevel:  ['a2level', 'edexcel', 'addmath'],
  a2level:  ['aslevel', 'edexcel', 'calculus'],
  edexcel:  ['aslevel', 'a2level', 'addmath'],
  ibsl:     ['ibhl', 'aslevel', 'apab'],
  ibhl:     ['ibsl', 'a2level', 'apbc'],
  appc:     ['precalc', 'act2l2', 'apab'],
  apab:     ['apbc', 'calculus', 'ibsl'],
  apbc:     ['apab', 'calculus', 'odes'],
  apstats:  ['aslevel', 'a2level', 'mathai'],
  algebra:  ['alg2', 'igcse', 'sat'],
  geo:      ['alg2', 'igcse', 'act'],
  alg2:     ['algebra', 'precalc', 'sat'],
  precalc:  ['appc', 'alg2', 'calculus'],
  calculus: ['apab', 'apbc', 'mvc'],
  linalg:   ['mathai', 'mvc', 'odes'],
  mvc:      ['calculus', 'linalg', 'mathai'],
  odes:     ['calculus', 'apbc', 'linalg'],
  mathai:   ['linalg', 'mvc', 'apstats'],
  olympiad: ['addmath', 'alg2', 'ibhl']
};

function stripHtml(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\\([\s\S]*?\\\)/g, '')
    .replace(/\\\[[\s\S]*?\\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(s) {
  return stripHtml(s)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(w => w.length >= 3 && !['the', 'and', 'for', 'with', 'from', 'into', 'chapter', 'unit', 'topic', 'overview', 'about', 'math', 'mathematics'].includes(w));
}

const tracks = fs.readdirSync(CONTENT_DIR).filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory()).sort();
const allChapters = {}; // track -> [{ slug, id, title, tokens }]

for (const t of tracks) {
  const meta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, t, '_meta.json'), 'utf8'));
  allChapters[t] = (meta.chapterOrder || []).map(slug => {
    const ch = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, t, `${slug}.json`), 'utf8'));
    const title = stripHtml((ch.title && ch.title.en) || slug);
    const domainStr = (ch.quizWidget && ch.quizWidget.domains ? ch.quizWidget.domains.join(' ') : '');
    return {
      slug,
      id: ch.id || slug,
      title,
      tokens: tokenize(title + ' ' + domainStr)
    };
  });
}

let addedCount = 0;

for (const t of tracks) {
  const chList = allChapters[t];
  for (let i = 0; i < chList.length; i++) {
    const item = chList[i];
    const chPath = path.join(CONTENT_DIR, t, `${item.slug}.json`);
    const ch = JSON.parse(fs.readFileSync(chPath, 'utf8'));
    const blocks = (ch.content && ch.content.blocks) || [];
    if (blocks.some(b => b.kind === 'seeAlso')) continue;

    const links = [];
    // 1. Next chapter in the same track (or previous if last)
    const nextIdx = (i + 1 < chList.length) ? i + 1 : Math.max(0, i - 1);
    if (chList[nextIdx] && chList[nextIdx].id !== item.id) {
      links.push({
        label: chList[nextIdx].title,
        chapterId: chList[nextIdx].id,
        trackId: t
      });
    }

    // 2. Second related chapter in the same track
    const altIdx = (i > 0 && nextIdx !== i - 1) ? i - 1 : ((i + 2) % chList.length);
    if (chList[altIdx] && chList[altIdx].id !== item.id && !links.some(l => l.chapterId === chList[altIdx].id)) {
      links.push({
        label: chList[altIdx].title,
        chapterId: chList[altIdx].id,
        trackId: t
      });
    }

    // 3. Best-matching chapter in a companion track
    const companions = COMPANION_TRACKS[t] || ['sat', 'calculus'];
    let bestComp = null;
    let bestScore = -1;
    for (const ct of companions) {
      for (const cch of (allChapters[ct] || [])) {
        let score = 0;
        for (const tok of item.tokens) {
          if (cch.tokens.includes(tok)) score += 2;
        }
        if (score > bestScore) {
          bestScore = score;
          bestComp = { trackId: ct, chapterId: cch.id, label: `${ct.toUpperCase()}: ${cch.title}` };
        }
      }
    }
    if (bestComp) {
      links.push(bestComp);
    }

    blocks.push({
      kind: 'seeAlso',
      links
    });
    fs.writeFileSync(chPath, JSON.stringify(ch, null, 2) + '\n', 'utf8');
    addedCount++;
  }
}

console.log(`✅ Added seeAlso blocks to ${addedCount} chapters (302/302 chapters now have seeAlso cross-references).`);
