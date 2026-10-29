#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');

const TRACK_TAG_STYLE = {
  a2level:  { className: 'a2-tag',   badgeClassName: 'a2-paper', emoji: '📌', prefix: 'Cambridge A2 9709', badge: 'P3 · M1 · S2' },
  aslevel:  { className: 'as-tag',   badgeClassName: 'as-paper', emoji: '📌', prefix: 'Cambridge AS 9709', badge: 'P1 · M1 · S1' },
  act:      { className: 'act-tag',  badgeClassName: 'act-wt',   emoji: '🗻', prefix: 'ACT Math',          badge: '60 Q · 60 Min' },
  act2:     { className: 'act-tag',  badgeClassName: 'act-wt',   emoji: '🗻', prefix: 'ACT Math Level 1',  badge: '50 Q · 60 Min' },
  act2l2:   { className: 'act-tag',  badgeClassName: 'act-wt',   emoji: '📐', prefix: 'ACT Math Level 2',  badge: 'Level 2' },
  est:      { className: 'est-tag',  badgeClassName: 'est-wt',   emoji: '🇬🇧', prefix: 'EST I Math',        badge: 'Sec 3 & 4' },
  est2:     { className: 'est-tag',  badgeClassName: 'est-wt',   emoji: '🇬🇧', prefix: 'EST II Math Level 1', badge: '50 Q · 60 Min' },
  est2l2:   { className: 'est-tag',  badgeClassName: 'est-wt',   emoji: '📐', prefix: 'EST II Math Level 2', badge: 'Level 2' },
  apab:     { className: 'ap-tag',   badgeClassName: 'ap-wt',    emoji: '📌', prefix: 'AP Calculus AB',    badge: 'Sec I & II' },
  apbc:     { className: 'ap-tag',   badgeClassName: 'ap-wt',    emoji: '📌', prefix: 'AP Calculus BC',    badge: 'Sec I & II' },
  algebra:  { className: 'la-tag',   badgeClassName: 'la-wt',    emoji: '📌', prefix: 'Algebra I',         badge: 'Core Mastery' },
  geo:      { className: 'la-tag',   badgeClassName: 'la-wt',    emoji: '📐', prefix: 'Geometry',          badge: 'Core Mastery' },
  precalc:  { className: 'ap-tag',   badgeClassName: 'ap-wt',    emoji: '📌', prefix: 'Precalculus',       badge: 'Core Mastery' },
  calculus: { className: 'ap-tag',   badgeClassName: 'ap-wt',    emoji: '∫',  prefix: 'Calculus I–III',    badge: 'University Core' },
  linalg:   { className: 'la-tag',   badgeClassName: 'la-wt',    emoji: '📌', prefix: 'Linear Algebra',    badge: 'Core Mastery' },
  mvc:      { className: 'la-tag',   badgeClassName: 'la-wt',    emoji: '∇',  prefix: 'Multivariable Calculus', badge: 'Calc III' },
  odes:     { className: 'la-tag',   badgeClassName: 'la-wt',    emoji: '📌', prefix: 'Differential Equations', badge: 'ODE Core' }
};

function stripHtml(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\\([\s\S]*?\\\)/g, '')
    .replace(/\\\[[\s\S]*?\\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTopics(ch) {
  const topics = [];
  const blocks = (ch.content && ch.content.blocks) || [];
  for (const b of blocks) {
    if (b.kind === 'text' && b.html && b.html.en) {
      const m = b.html.en.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
      for (const h of m) {
        const clean = stripHtml(h).replace(/^\d+(\.\d+)*\s*[—·:-]?\s*/, '').trim();
        if (clean.length >= 4 && clean.length <= 55 && !topics.includes(clean)) {
          topics.push(clean);
        }
      }
    }
    if (b.kind === 'callout' && b.title && b.title.en) {
      const clean = stripHtml(b.title.en)
        .replace(/^(Definition|Theorem|Formula|Rule|Trap|Proof|Law|Property|Concept)\s*[—·:-]?\s*/i, '')
        .trim();
      if (clean.length >= 4 && clean.length <= 55 && !topics.includes(clean)) {
        topics.push(clean);
      }
    }
    if (topics.length >= 4) break;
  }
  if (topics.length < 3 && ch.quizWidget && Array.isArray(ch.quizWidget.domains)) {
    for (const d of ch.quizWidget.domains) {
      if (!topics.includes(d)) topics.push(d);
    }
  }
  if (topics.length === 0) {
    topics.push('Core Concepts', 'Worked Examples', 'Exam Practice');
  }
  return topics.slice(0, 4);
}

let updatedCount = 0;
const tracks = fs.readdirSync(CONTENT_DIR).filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory()).sort();

for (const t of tracks) {
  const meta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, t, '_meta.json'), 'utf8'));
  for (const slug of (meta.chapterOrder || [])) {
    const chPath = path.join(CONTENT_DIR, t, `${slug}.json`);
    const ch = JSON.parse(fs.readFileSync(chPath, 'utf8'));
    if (ch.chapterTag) continue;

    if (t === 'ibhl') {
      ch.chapterTag = {
        variant: 'pill',
        className: 'ibhl-tag',
        trackLabel: 'IB Mathematics HL',
        badges: [
          { text: 'P1, P2 & P3', className: 'ib-paper' },
          { text: 'AA HL', className: 'ib-aa' },
          { text: 'AI HL', className: 'ib-ai' }
        ]
      };
    } else if (t === 'ibsl') {
      ch.chapterTag = {
        variant: 'pill',
        className: 'ibsl-tag',
        trackLabel: 'IB Mathematics SL',
        badges: [
          { text: 'P1 & P2', className: 'ib-paper' },
          { text: 'AA SL', className: 'ib-aa' },
          { text: 'AI SL', className: 'ib-ai' }
        ]
      };
    } else {
      const style = TRACK_TAG_STYLE[t] || { className: 'la-tag', badgeClassName: 'la-wt', emoji: '📌', prefix: t.toUpperCase(), badge: 'Core' };
      const titleEn = stripHtml((ch.title && ch.title.en) || slug);
      ch.chapterTag = {
        variant: 'category',
        className: style.className,
        badgeClassName: style.badgeClassName,
        emoji: style.emoji,
        category: `${style.prefix} · ${titleEn}`,
        weightBadge: ch.chapterNumber ? `${style.badge} · ${ch.chapterNumber}` : style.badge,
        topics: extractTopics(ch)
      };
    }

    fs.writeFileSync(chPath, JSON.stringify(ch, null, 2) + '\n', 'utf8');
    updatedCount++;
  }
}

console.log(`✅ Populated chapterTag on ${updatedCount} chapter files.`);
