#!/usr/bin/env node
/**
 * ClipSAT Phase 1 — Content Extraction Script
 * ============================================
 * Reads index.html and splits it into:
 *   public/css/main.css          — all inline styles
 *   public/js/engine.js          — all inline scripts
 *   src/_includes/tracks/*.html  — per-track <main> HTML
 *   src/{slug}/index.njk         — per-track Eleventy pages
 *   src/index.njk                — home page
 *   DEDUP_LOG.md                 — duplicate-removal log
 *
 * Run: node build.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Site config ──────────────────────────────────────────────────────────────
// Base path for GitHub Pages (repo is served at /ClipSAT/ not at root /)
const BASE_PATH = '/ClipSAT';

// ─── Paths ────────────────────────────────────────────────────────────────────
const ROOT      = __dirname;
const SRC_HTML  = path.join(ROOT, 'index.html');
const PUBLIC_CSS = path.join(ROOT, 'public', 'css', 'main.css');
const PUBLIC_JS  = path.join(ROOT, 'public', 'js', 'engine.js');
const TRACKS_DIR = path.join(ROOT, 'src', '_includes', 'tracks');
const SRC_DIR    = path.join(ROOT, 'src');
const DEDUP_LOG  = path.join(ROOT, 'DEDUP_LOG.md');

// ─── Track metadata ───────────────────────────────────────────────────────────
// Maps view-ID → { slug, title, description }
const TRACK_META = {
  'home':     { slug: '',        title: 'Home',                   desc: 'ClipSAT – Math exam prep by Mr. Mohamed Abdallah' },
  'calculus': { slug: 'calculus', title: 'Calculus',              desc: 'AP Calculus AB/BC and Cambridge AS & A-Level Calculus exam prep' },
  'algebra':  { slug: 'algebra',  title: 'Algebra',               desc: 'Algebra exam prep – SAT, ACT, Cambridge and IB' },
  'apab':     { slug: 'apab',     title: 'AP Calculus AB',        desc: 'AP Calculus AB exam preparation' },
  'apbc':     { slug: 'apbc',     title: 'AP Calculus BC',        desc: 'AP Calculus BC exam preparation' },
  'igcse':    { slug: 'igcse',    title: 'IGCSE Math',            desc: 'Cambridge IGCSE Mathematics exam prep' },
  'alg2':     { slug: 'alg2',     title: 'Algebra 2',             desc: 'Algebra 2 exam preparation' },
  'geo':      { slug: 'geo',      title: 'Geometry',              desc: 'Geometry exam preparation' },
  'qudrat':   { slug: 'qudrat',   title: 'Qudrat',                desc: 'اختبار القدرات – رياضيات' },
  'tahsili':  { slug: 'tahsili',  title: 'Tahsili',               desc: 'اختبار التحصيلي – رياضيات' },
  'sat':      { slug: 'sat',      title: 'SAT Math',              desc: 'SAT Math exam preparation' },
  'act':      { slug: 'act',      title: 'ACT Math',              desc: 'ACT Math exam preparation' },
  'aslevel':  { slug: 'aslevel',  title: 'AS Level',              desc: 'Cambridge AS Level Mathematics' },
  'a2level':  { slug: 'a2level',  title: 'A2 Level',              desc: 'Cambridge A2 Level Mathematics' },
  'est':      { slug: 'est',      title: 'EST Math I',            desc: 'EST Mathematics I exam preparation' },
  'est2':     { slug: 'est2',     title: 'EST Math II',           desc: 'EST Mathematics II exam preparation' },
  'act2':     { slug: 'act2',     title: 'ACT Math 2',            desc: 'ACT Math advanced preparation' },
  'precalc':  { slug: 'precalc',  title: 'Pre-Calculus',          desc: 'Pre-Calculus exam preparation' },
  'appc':     { slug: 'appc',     title: 'AP Pre-Calculus',       desc: 'AP Pre-Calculus exam preparation' },
  'apstats':  { slug: 'apstats',  title: 'AP Statistics',         desc: 'AP Statistics exam preparation' },
  'ibsl':     { slug: 'ibsl',     title: 'IB SL Math',            desc: 'IB Mathematics Standard Level' },
  'ibhl':     { slug: 'ibhl',     title: 'IB HL Math',            desc: 'IB Mathematics Higher Level' },
};

// RTL tracks (Arabic)
const RTL_TRACKS = new Set(['qudrat', 'tahsili']);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(filePath, content) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  const kb = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);
  console.log(`  ✓  ${path.relative(ROOT, filePath)}  (${kb} KB)`);
}

// ─── Read source ──────────────────────────────────────────────────────────────
console.log('\nClipSAT build.js — Phase 1 extraction\n');
console.log(`Reading ${SRC_HTML} …`);
const html = fs.readFileSync(SRC_HTML, 'utf8');
console.log(`  ${(html.length / 1024 / 1024).toFixed(2)} MB, ${html.split('\n').length} lines\n`);

// ─── 1. Extract CSS ───────────────────────────────────────────────────────────
console.log('── Step 1: Extract CSS ──────────────────────────────');
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!cssMatch) {
  console.error('ERROR: Could not find <style> block'); process.exit(1);
}
write(PUBLIC_CSS, cssMatch[1].trim() + '\n');

// ─── 2. Extract <main> blocks ─────────────────────────────────────────────────
console.log('\n── Step 2: Extract per-track <main> blocks ─────────');
mkdirp(TRACKS_DIR);

// Find every <main id="view-X"> … </main> pair
const mainRegex = /<main\s+id="view-([^"]+)"[^>]*>([\s\S]*?)<\/main>/g;
const tracks = {};
let m;
while ((m = mainRegex.exec(html)) !== null) {
  const trackId = m[1];           // e.g. "calculus"
  const content = m[2];           // inner HTML
  tracks[trackId] = content;
}

const found = Object.keys(tracks);
console.log(`  Found ${found.length} tracks: ${found.join(', ')}`);

// Dedup log entries
const dedupEntries = [];

// Write each track HTML include
for (const [trackId, content] of Object.entries(tracks)) {
  let processed = content;

  // ── DUP-001: Remove duplicate FTC theorem block in calculus ──────────────
  if (trackId === 'calculus') {
    const FTC_MARKER = 'id="ftc-theorem"';
    const firstIdx  = processed.indexOf(FTC_MARKER);
    const secondIdx = processed.indexOf(FTC_MARKER, firstIdx + 1);
    if (firstIdx !== -1 && secondIdx !== -1) {
      // Find the enclosing .theorem block for the second occurrence
      // Walk back from secondIdx to find opening <div class="theorem"
      const prefix = processed.slice(0, secondIdx);
      const blockStart = prefix.lastIndexOf('<div class="theorem"');
      // Walk forward from secondIdx to find the matching </div>
      let depth = 0;
      let pos = blockStart;
      let blockEnd = -1;
      while (pos < processed.length) {
        if (processed.startsWith('<div', pos) && processed[pos + 4].match(/[\s>]/)) depth++;
        else if (processed.startsWith('</div>', pos)) {
          depth--;
          if (depth === 0) { blockEnd = pos + 6; break; }
        }
        pos++;
      }
      if (blockStart !== -1 && blockEnd !== -1) {
        const removed = processed.slice(blockStart, blockEnd);
        processed = processed.slice(0, blockStart) + processed.slice(blockEnd);
        dedupEntries.push({
          id: 'DUP-001',
          track: 'calculus',
          type: 'Duplicate theorem block',
          tag: FTC_MARKER,
          chars: removed.length,
          note: 'Second occurrence of id="ftc-theorem" .theorem block removed',
        });
        console.log(`  ✓  DUP-001: removed duplicate FTC block in calculus (${removed.length} chars)`);
      }
    } else if (firstIdx === -1) {
      console.log(`  ℹ  DUP-001: id="ftc-theorem" not found in calculus — may already be fixed`);
    } else {
      console.log(`  ℹ  DUP-001: only one occurrence of id="ftc-theorem" found — no duplicate to remove`);
    }
  }

  // Wrap content back in a <main> for the include file
  const meta = TRACK_META[trackId] || {};
  const dir  = meta.dir || (RTL_TRACKS.has(trackId) ? ' dir="rtl"' : '');
  const mainHtml = `<main id="view-${trackId}" class="view"${dir}>\n${processed}\n</main>\n`;
  write(path.join(TRACKS_DIR, `${trackId}.html`), mainHtml);
}

// ─── 3. Extract all inline <script> blocks → engine.js ───────────────────────
console.log('\n── Step 3: Extract JS → engine.js ──────────────────');

// Collect all inline <script> blocks (no src="" attribute)
const scriptParts = [];
const inlineScriptRe = /<script(?:\s+(?!src)[a-z-]+(?:="[^"]*")?)*\s*>([\s\S]*?)<\/script>/g;
let sm;
while ((sm = inlineScriptRe.exec(html)) !== null) {
  const inner = sm[1].trim();
  if (inner.length > 0) {
    scriptParts.push(inner);
  }
}
console.log(`  Found ${scriptParts.length} inline script blocks`);

// Remove the MathJax config block (we replace it with KaTeX)
const mathJaxConfigRe = /window\.MathJax\s*=\s*\{[\s\S]*?\};\s*/;
const engineParts = scriptParts.map(p => {
  // Strip MathJax config from the first script block
  return p.replace(mathJaxConfigRe, '/* [MathJax config removed — KaTeX used instead] */');
});

const engineJs = engineParts.join('\n\n/* ─────────────────────────────────────────────── */\n\n');
write(PUBLIC_JS, engineJs);

// ─── 4. Write DEDUP_LOG.md ────────────────────────────────────────────────────
console.log('\n── Step 4: Write DEDUP_LOG.md ───────────────────────');
const dedupRows = dedupEntries.length > 0
  ? dedupEntries.map(e =>
      `| ${e.id} | ${e.track} | ${e.type} | \`${e.tag}\` | ${e.chars} chars | ${e.note} |`
    ).join('\n')
  : '| — | — | — | — | — | *No duplicates removed in this build* |';

const dedupMd = `# ClipSAT Dedup Log

Records every duplicate content block removed during Phase 1 extraction.
Each entry is logged here BEFORE removal so changes are auditable.

## Summary

| ID | Track | Type | Identifier | Size | Notes |
|----|-------|------|-----------|------|-------|
${dedupRows}

## Build history

| Date | Script version | Tracks processed | Dups removed |
|------|---------------|-----------------|-------------|
| ${new Date().toISOString().slice(0,10)} | build.js v1.0 | ${found.length} | ${dedupEntries.length} |
`;
write(DEDUP_LOG, dedupMd);

// ─── 5. Write Eleventy page templates ─────────────────────────────────────────
console.log('\n── Step 5: Write Eleventy page templates ────────────');

// Navigation items for the sidebar (all non-home tracks)
const navItems = Object.entries(TRACK_META)
  .filter(([id]) => id !== 'home')
  .map(([id, meta]) => ({ id, slug: meta.slug, title: meta.title }));

// Home page
const homeNjk = `---
layout: base.njk
trackId: home
title: "ClipSAT · Math by Mr. Mohamed Abdallah"
description: "ClipSAT – Cambridge, SAT, ACT, IB & EST Math prep by Mr. Mohamed Abdallah"
isRtl: false
---
{% include "tracks/home.html" %}
`;
write(path.join(SRC_DIR, 'index.njk'), homeNjk);

// Per-track pages
for (const [trackId, meta] of Object.entries(TRACK_META)) {
  if (trackId === 'home') continue;
  if (!tracks[trackId]) {
    console.warn(`  ⚠  No content found for track "${trackId}" — skipping page`);
    continue;
  }
  const isRtl = RTL_TRACKS.has(trackId);
  const nunjucks = `---
layout: base.njk
trackId: ${trackId}
title: "${meta.title} · ClipSAT"
description: "${meta.desc}"
isRtl: ${isRtl}
---
{% include "tracks/${trackId}.html" %}
`;
  write(path.join(SRC_DIR, meta.slug, 'index.njk'), nunjucks);
}

// ─── 6. Write base template ───────────────────────────────────────────────────
console.log('\n── Step 6: Write base.njk template ─────────────────');
const navItemsJson = JSON.stringify(navItems, null, 2);

const baseNjk = `<!DOCTYPE html>
<html lang="{{ 'ar' if isRtl else 'en' }}"{% if isRtl %} dir="rtl"{% endif %}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ title }}</title>
  <meta name="description" content="{{ description }}">
  <meta name="theme-color" content="#1E3A6E">
  <meta name="application-name" content="ClipSAT">

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
  <link rel="apple-touch-icon" href="/icon-192.png">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://mohammedamy.github.io/ClipSAT{{ '/' + trackId + '/' if trackId !== 'home' else '/' }}">

  <!-- KaTeX (replaces MathJax — ~90 KB vs 7 × 400 KB) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.css" crossorigin="anonymous">
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.js" crossorigin="anonymous"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/contrib/auto-render.min.js" crossorigin="anonymous"
    onload="renderMathInElement(document.body,{delimiters:[{left:'\\\\(',right:'\\\\)',display:false},{left:'\\\\[',right:'\\\\]',display:true}],throwOnError:false});"></script>

  <!-- JSZip (needed for export) -->
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>

  <!-- External question bank supplements -->
  <script src="${BASE_PATH}/question_banks/algebra_bank_ch1_word_problems.js"></script>
  <script src="${BASE_PATH}/question_banks/calc_bank_ch1_trig.js"></script>
  <script src="${BASE_PATH}/question_banks/calc_bank_ch2_relations.js"></script>
  <script src="${BASE_PATH}/question_banks/calc_bank_ch3_polygons.js"></script>

  <!-- Styles -->
  <link rel="stylesheet" href="${BASE_PATH}/css/main.css">
</head>
<body class="track-{{ trackId }}">

  <!-- Mark the active track early so engine and CSS can read it -->
  <script>window.CLIPSAT_TRACK = '{{ trackId }}';</script>

  <!-- ====== SHARED HEADER (extracted from index.html global wrapper) ====== -->
  <header class="site">
    <div class="wrap nav">
      <div class="brand" onclick="showView('home')" title="Home">
        <img id="site-logo-img" class="site-logo-img" src="${BASE_PATH}/clipsat-logo.jpg" alt="ClipSAT Logo">
        <span class="name">ClipSAT</span>
        <span class="sub">by Mr. Mohamed Abdallah</span>
      </div>
      <select class="nav-select" id="navSelect" onchange="navSelectChange(this)" aria-label="Choose category">
        <option value="home">🏠 Home</option>
        <optgroup label="── Core Math ──">
          <option value="calculus">Calculus</option>
          <option value="algebra">Algebra 1</option>
          <option value="alg2">Algebra 2</option>
          <option value="geo">Geometry</option>
          <option value="precalc">Pre-Calculus</option>
        </optgroup>
        <optgroup label="── AP Courses ──">
          <option value="apab">AP Calculus AB</option>
          <option value="apbc">AP Calculus BC</option>
          <option value="appc">AP Precalculus</option>
          <option value="apstats">AP Statistics</option>
        </optgroup>
        <optgroup label="── International ──">
          <option value="igcse">IGCSE 0580</option>
          <option value="aslevel">Cambridge AS Level</option>
          <option value="a2level">Cambridge A2 Level</option>
          <option value="ibsl">IB Math SL (AA/AI)</option>
          <option value="ibhl">IB Math HL (AA/AI)</option>
        </optgroup>
        <optgroup label="── Standardized Tests ──">
          <option value="sat">Digital SAT</option>
          <option value="act">ACT Math</option>
          <option value="act2">ACT Math 2</option>
          <option value="est">EST</option>
          <option value="est2">EST 2</option>
        </optgroup>
        <optgroup label="── Arabic Exams ──">
          <option value="qudrat">GAT Qudrat</option>
          <option value="tahsili">SAAT Tahsili</option>
        </optgroup>
      </select>
      <div class="spacer"></div>
      <button class="dm-toggle" id="dmToggle" title="Toggle dark mode" aria-label="Toggle dark mode">🌙</button>
      <nav class="nav-links" id="navlinks">
        <span id="topic-search-wrap">
          <svg id="topic-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3a6 6 0 100 12A6 6 0 009 3zM1 9a8 8 0 1114.32 4.906l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387A8 8 0 011 9z" clip-rule="evenodd"/></svg>
          <input id="topic-search" type="search" placeholder="Search topics…" autocomplete="off" aria-label="Search topics"
                 oninput="window.CSSearch&&window.CSSearch.onInput(this.value)"
                 onkeydown="window.CSSearch&&window.CSSearch.onKey(event)"
                 onfocus="window.CSSearch&&window.CSSearch.onInput(this.value)"
                 onblur="setTimeout(function(){window.CSSearch&&window.CSSearch.close()},200)">
          <div id="topic-search-results" role="listbox"></div>
        </span>
        <button class="mistake-nav-btn" id="mistakeBtn" onclick="openMistakes()" title="Review mistakes">📋 Mistakes</button>
        <button class="mistake-nav-btn" id="teacherModeBtn" onclick="window.TeacherMode&&window.TeacherMode.toggle()" title="Teacher Mode" style="background:var(--panel);color:var(--text);border:1px solid var(--border)">📐 Teacher</button>
        <a class="whats-new-btn" href="${BASE_PATH}/changelog.html" title="See all updates">🆕 What's New</a>
        <a class="whats-new-btn" href="https://paypal.me/mohammedamy" target="_blank" rel="noopener" style="background:#003087;color:#fff;border-color:#003087">☕ Support</a>
        <div class="nav-gamification">
          <span class="streak-badge" title="Daily streak">🔥 <span id="nav-streak">0</span></span>
          <span class="xp-badge" title="Total XP">⭐ <span id="nav-xp">0</span> XP</span>
        </div>
      </nav>
      <div id="nav-social" class="nav-social">
        <a href="https://wa.me/966597688647" class="nsoc nsoc-wa" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.15a9.9 9.9 0 0 0 5.64 1.75h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z"/></svg></a>
        <a href="https://www.youtube.com/@ClipSAT22" class="nsoc nsoc-yt" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.42-4.81ZM10 15V9l5.2 3-5.2 3Z"/></svg></a>
        <a href="https://t.me/ClipSAT22" class="nsoc nsoc-tg" target="_blank" rel="noopener" aria-label="Telegram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
      </div>
      <button class="menu-btn" id="menuBtn" aria-label="Toggle menu" aria-expanded="false" onclick="(function(btn){var n=document.getElementById('navlinks');var open=n.classList.toggle('open');btn.setAttribute('aria-expanded',open);btn.innerHTML=open?'&#10005; Close':'&#9776; Menu';})(this)">&#9776; Menu</button>
    </div>
  </header>

  <!-- Breadcrumb, formula sidebar, timer, mistake log, goal bars -->
  <div id="cs-breadcrumb" class="bc-hidden" aria-label="You are here">
    <span class="bc-course" id="bc-course" onclick="showView(window._csCurrentView||'home')">Home</span>
    <span class="bc-sep" aria-hidden="true">›</span>
    <span class="bc-chapter" id="bc-chapter"></span>
  </div>
  <div id="formula-sidebar" aria-label="Formula quick reference">
    <div class="fsb-header">
      <span id="fsb-title">Formulas</span>
      <button onclick="toggleSidebar()" style="border:none;background:none;cursor:pointer;font-size:1rem;color:var(--muted)" title="Close">✕</button>
    </div>
    <div class="fsb-body" id="fsb-body"><p class="fsb-empty">Open a chapter to see its formulas here.</p></div>
  </div>
  <button id="fsb-toggle" onclick="toggleSidebar()" title="Formula quick reference">FORMULAS</button>
  <div id="exam-timer-bar">
    <span>⏱ Exam Timer: <span id="etd">00:00</span></span>
    <div class="timer-controls">
      <button class="tbtn" onclick="timerSetTime(60)">60 min</button>
      <button class="tbtn" onclick="timerSetTime(90)">90 min</button>
      <button class="tbtn" onclick="timerSetTime(120)">120 min</button>
      <button class="tbtn" id="timerPauseBtn" onclick="timerPause()">⏸ Pause</button>
      <button class="tbtn" onclick="timerStop()">✕ Stop</button>
    </div>
  </div>
  <div id="mistake-overlay" role="dialog" aria-modal="true" aria-label="Mistake log" onclick="if(event.target===this)closeMistakes()">
    <div id="mistake-box">
      <button id="mistake-close" onclick="closeMistakes()" aria-label="Close">✕</button>
      <h2>📋 Mistake Log</h2>
      <p class="mc" id="mistake-count">0 mistakes recorded</p>
      <div style="margin-bottom:12px;">
        <button class="mistake-nav-btn" onclick="reviewMistakes()">🔁 Quiz Me On Mistakes</button>
        <button class="mistake-clear-btn" onclick="clearMistakes()">🗑 Clear All</button>
      </div>
      <div id="mistake-list"></div>
    </div>
  </div>
  <div id="exam-countdown-bar"></div>
  <div id="daily-goal-bar"></div>
  <div id="weak-recs"></div>

  <!-- Page content (injected by Eleventy from src/_includes/tracks/*.html) -->
  {{ content | safe }}

  <!-- Engine JS (all inline scripts extracted from index.html) -->
  <script src="${BASE_PATH}/js/engine.js"></script>

  <!-- Post-engine shim: override showView() for multi-page navigation.
       ROOT CAUSE FIX (two layers):
       1. index.html init() now reads window.CLIPSAT_TRACK when no hash is present,
          so it calls showView('calculus') instead of showView('home') on track pages.
          That hits the "name===CURRENT" guard and is a no-op — no redirect.
       2. Belt-and-suspenders: _clipsatNavReady flag blocks any showView('home') call
          that fires before the first macrotask (i.e. during DOMContentLoaded). -->
  <script>
  (function(){
    var BASE = '${BASE_PATH}';
    var URLS = {
      calculus:'calculus',algebra:'algebra',apab:'apab',apbc:'apbc',
      igcse:'igcse',alg2:'alg2',geo:'geo',qudrat:'qudrat',tahsili:'tahsili',
      sat:'sat',act:'act',aslevel:'aslevel',a2level:'a2level',
      est:'est',est2:'est2',act2:'act2',precalc:'precalc',
      appc:'appc',apstats:'apstats',ibsl:'ibsl',ibhl:'ibhl',home:''
    };
    var CURRENT = window.CLIPSAT_TRACK || 'home';

    // Belt-and-suspenders guard: stay false during DOMContentLoaded, true after.
    window._clipsatNavReady = false;
    setTimeout(function(){ window._clipsatNavReady = true; }, 0);

    // Override showView so card clicks navigate to the right page
    window.showView = function(name){
      if(!window._clipsatNavReady) return; // suppress any residual DOMContentLoaded calls
      if(name === CURRENT) return;
      var dest = URLS[name];
      if(dest !== undefined){ window.location.href = BASE + (dest ? '/'+dest+'/' : '/'); }
    };
    // Also patch navigate() for any legacy callers
    window.navigate = function(viewId){
      window.showView((viewId || '').replace('view-',''));
    };

    // Re-activate this track's view
    var el = document.getElementById('view-' + CURRENT);
    if(el) el.classList.add('active');

    // Sync nav dropdown to current track
    var sel = document.getElementById('navSelect');
    if(sel) sel.value = CURRENT;

    // Auto-open first chapter so content is visible immediately
    if(CURRENT !== 'home' && window.goChapter) {
      var firstLink = document.querySelector('#view-' + CURRENT + ' .rail a[data-target]');
      if(firstLink) window.goChapter(firstLink.getAttribute('data-target'), CURRENT);
    }
  })();
  </script>

</body>
</html>
`;
write(path.join(SRC_DIR, '_includes', 'base.njk'), baseNjk);

// ─── 7. Write redirect stubs for old hash URLs ────────────────────────────────
console.log('\n── Step 7: Write old-URL redirects ─────────────────');
// GitHub Pages doesn't support server redirects, so we write a 404 page
// that reads the hash and redirects JS-side.
const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting… – ClipSAT</title>
  <script>
    // Redirect old hash-based URLs to clean paths
    // e.g. /#view-calculus → /calculus/
    var hash = window.location.hash.replace('#','').replace('view-','');
    if(hash){ window.location.replace('/' + hash + '/'); }
    else { window.location.replace('/'); }
  </script>
</head>
<body>Redirecting…</body>
</html>`;
write(path.join(SRC_DIR, '404.html'), redirectHtml);

// ─── Done ─────────────────────────────────────────────────────────────────────
console.log('\n✅  Extraction complete!\n');
console.log('Next steps:');
console.log('  npm install');
console.log('  npm run build   (runs build.js then Eleventy)');
console.log('  npm start       (Eleventy dev server at localhost:8080)\n');
