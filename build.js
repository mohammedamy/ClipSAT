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
const UglifyJS = require('uglify-js');
const csso = require('csso');

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

// RTL tracks (Arabic) — intentionally empty: Qudrat and Tahsili content is
// bilingual (Arabic exam names, English math), and the site chrome/rail was
// never built for RTL, so forcing dir="rtl" broke the layout. Both tracks
// now render left-to-right like every other track.
const RTL_TRACKS = new Set([]);

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
let cssOut = cssMatch[1].trim();
// A second, later <style id="cs-gamify-styles"> block holds the gamification/
// flashcard CSS. The regex above is non-global and only grabs the first
// <style> tag, so this block was silently dropped from every built page —
// flashcards/badges rendered unstyled. Matched by its specific id so this
// never accidentally captures the many `<style>` fragments that appear
// inside JS strings (print/export templates) elsewhere in the file.
const gamifyCssMatch = html.match(/<style id="cs-gamify-styles">([\s\S]*?)<\/style>/);
if (gamifyCssMatch) {
  console.log('  ✓  found second style block (cs-gamify-styles)');
  cssOut += '\n\n' + gamifyCssMatch[1].trim();
} else {
  console.log('  ℹ  no cs-gamify-styles block found — may have been removed/renamed');
}
const cssMinified = csso.minify(cssOut).css;
console.log(`  Minified CSS: ${cssOut.length} → ${cssMinified.length} bytes`);
write(PUBLIC_CSS, cssMinified + '\n');

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

// Full cross-track chapter search index — built here because this is the
// only point in the pipeline that ever sees all 21 tracks' content at once.
// On the multi-page site, each page's DOM only contains its OWN <main
// id="view-X">, so a runtime DOM scan (see engine.js's _buildIdx) can only
// ever find the CURRENT page's chapters — search silently only worked for
// whichever track you happened to be on. This precomputed list is injected
// into engine.js and merged with the runtime scan so every chapter across
// every track is always searchable, regardless of which page loaded it.
const searchChapterIndex = [];
function stripTags(html) {
  return html
    .replace(/<span[^>]*class="[^"]*\b(?:num|ch-num|number|accuracy-badge)\b[^"]*"[^>]*>[\s\S]*?<\/span>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/[✓●☆★🔒🔓]/g, '')
    .trim();
}
function extractChapterLinks(trackId, html) {
  const re = /<a\s+data-target="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  const seen = new Set();
  let mm;
  while ((mm = re.exec(html)) !== null) {
    const chId = mm[1];
    if (seen.has(chId)) continue;
    seen.add(chId);
    const title = stripTags(mm[2]);
    if (!title || title.length < 2) continue;
    searchChapterIndex.push({ view: trackId, chapter: chId, title });
  }
}

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

  extractChapterLinks(trackId, processed);

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

// Prepend the precomputed cross-track search index (see Step 2) so it's
// defined before _buildIdx() (further down in engineParts) runs.
console.log(`  Search index: ${searchChapterIndex.length} chapters across ${found.length} tracks`);
engineParts.unshift(
  `window.SEARCH_CHAPTER_INDEX = ${JSON.stringify(searchChapterIndex)};`
);

const engineJs = engineParts.join('\n\n/* ─────────────────────────────────────────────── */\n\n');
const jsMinified = UglifyJS.minify(engineJs, { compress: false, mangle: false });
if (jsMinified.error) {
  // Never ship broken JS: fall back to the unminified source and keep building.
  console.error('  ⚠  JS minification failed, shipping unminified engine.js:', jsMinified.error.message);
  write(PUBLIC_JS, engineJs);
} else {
  console.log(`  Minified JS: ${engineJs.length} → ${jsMinified.code.length} bytes`);
  write(PUBLIC_JS, jsMinified.code);
}

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
  <link rel="icon" type="image/png" sizes="32x32" href="/ClipSAT/favicon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/ClipSAT/icon-192.png">
  <link rel="apple-touch-icon" href="/ClipSAT/icon-192.png">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://mohammedamy.github.io/ClipSAT{{ '/' + trackId + '/' if trackId !== 'home' else '/' }}">

  <!-- Open Graph / Twitter Card -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ClipSAT">
  <meta property="og:title" content="{{ title }}">
  <meta property="og:description" content="{{ description }}">
  <meta property="og:url" content="https://mohammedamy.github.io/ClipSAT{{ '/' + trackId + '/' if trackId !== 'home' else '/' }}">
  <meta property="og:image" content="https://mohammedamy.github.io/ClipSAT/clipsat-logo.jpg">
  <meta property="og:locale" content="{{ 'ar_SA' if isRtl else 'en_US' }}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{{ title }}">
  <meta name="twitter:description" content="{{ description }}">
  <meta name="twitter:image" content="https://mohammedamy.github.io/ClipSAT/clipsat-logo.jpg">

  <!-- Structured data: Course per subject track, Person + Organization sitewide -->
  {% if trackId != 'home' and trackId != 'privacy' and trackId != 'terms' and trackId != 'contact' and trackId != 'cookies' %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "{{ title }}",
    "description": "{{ description }}",
    "provider": {
      "@type": "Organization",
      "name": "ClipSAT",
      "sameAs": "https://mohammedamy.github.io/ClipSAT/"
    }
  }
  </script>
  {% endif %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohamed Abdallah",
    "jobTitle": "Mathematics Teacher",
    "url": "https://mohammedamy.github.io/ClipSAT/",
    "worksFor": {
      "@type": "Organization",
      "name": "ClipSAT",
      "url": "https://mohammedamy.github.io/ClipSAT/"
    },
    "sameAs": [
      "https://wa.me/966597688647",
      "https://t.me/ClipSAT22",
      "https://www.youtube.com/@ClipSAT22"
    ]
  }
  </script>

  <!-- KaTeX (replaces MathJax — ~90 KB vs 7 × 400 KB) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.css" crossorigin="anonymous">
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.js" crossorigin="anonymous"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/contrib/auto-render.min.js" crossorigin="anonymous"
    onload="renderMathInElement(document.body,{delimiters:[{left:'\\\\(',right:'\\\\)',display:false},{left:'\\\\[',right:'\\\\]',display:true}],throwOnError:false});"></script>

  <!-- MathJax-compatible shim, backed by KaTeX.
       engine.js (extracted from index.html) was written against the MathJax
       API and calls window.MathJax.typesetPromise(...)/typeset(...) in ~20
       places to re-render math after DYNAMICALLY inserting content (chapter
       quiz generation, the AI chat panel, practice-quiz-from-mistakes,
       flashcard review, etc.). The KaTeX auto-render script above only
       renders document.body ONCE on initial load, so none of those dynamic
       call sites had any effect — new math showed up as raw "\\( ... \\)"
       source text. This shim gives window.MathJax the same call signature,
       implemented with KaTeX's renderMathInElement, so every existing call
       site keeps working without changes. It waits for renderMathInElement
       to exist (KaTeX's script tags are deferred) before doing anything. -->
  <script>
  (function(){
    var KATEX_OPTS = {
      delimiters: [
        {left:'\\\\(', right:'\\\\)', display:false},
        {left:'\\\\[', right:'\\\\]', display:true}
      ],
      throwOnError: false
    };
    function renderEls(elements){
      (elements || [document.body]).forEach(function(el){
        if(!el) return;
        try { window.renderMathInElement(el, KATEX_OPTS); } catch(e){}
      });
    }
    function whenReady(fn){
      if(typeof window.renderMathInElement === 'function'){ fn(); }
      else { setTimeout(function(){ whenReady(fn); }, 100); }
    }
    window.MathJax = {
      typesetPromise: function(elements){
        return new Promise(function(resolve){
          whenReady(function(){ renderEls(elements); resolve(); });
        });
      },
      typeset: function(elements){ whenReady(function(){ renderEls(elements); }); },
      startup: { promise: Promise.resolve() }
    };
  })();
  </script>

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
        <img id="site-logo-img" class="site-logo-img" src="${BASE_PATH}/clipsat-mark.png" alt="ClipSAT Logo">
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
        <button class="mistake-nav-btn" id="progressBtn" onclick="openProgress()" title="View your progress across tracks">📊 Progress</button>
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
      <span class="tcustom"><input type="number" id="timerCustomMin" min="1" max="300" placeholder="min" aria-label="Custom minutes"><button class="tbtn" onclick="timerSetCustom()">Start</button></span>
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
  <div id="progress-overlay" role="dialog" aria-modal="true" aria-label="Your progress" onclick="if(event.target===this)closeProgress()">
    <div id="progress-box">
      <button id="progress-close" onclick="closeProgress()" aria-label="Close">✕</button>
      <h2>📊 Your Progress</h2>
      <p class="mc" id="progress-count">Across your visited tracks</p>
      <div id="progress-summary"></div>
      <div id="progress-list"></div>
    </div>
  </div>
  <div id="exam-countdown-bar"></div>
  <div id="daily-goal-bar"></div>
  <div id="weak-recs"></div>

  <!-- Active Recall Flashcard Sidebar -->
  <div id="flashcards-sidebar">
    <div class="fsb-header">
      <span>Active Recall Deck <span id="fc-due-count" title="Cards due for review" style="display:inline-block;min-width:1.4em;padding:1px 6px;border-radius:999px;background:rgba(255,255,255,.25);font-size:.78em;font-weight:700">0</span></span>
    </div>
    <div class="fc-box">
      <div class="flashcard-inner" onclick="this.querySelector('.flashcard-card').classList.toggle('flipped')">
        <div class="flashcard-card" id="active-flashcard">
          <div class="fc-face front">
            <div class="fc-label" style="font-size: 10px; text-transform: uppercase; color:#94a3b8; margin-bottom: 8px;">Active Recall Question</div>
            <span id="fc-front-text">Click to show flashcard</span>
          </div>
          <div class="fc-face back">
            <span id="fc-back-text">Back side</span>
          </div>
        </div>
      </div>
      <div class="fc-actions">
        <button class="fc-btn" onclick="window.CSGamify.recordSRS(false)">Review (1d)</button>
        <button class="fc-btn success" onclick="window.CSGamify.recordSRS(true)">Mastered (3d)</button>
      </div>
    </div>
  </div>
  <div id="fc-toggle-btn" onclick="document.getElementById('flashcards-sidebar').classList.toggle('open')">FLASHCARDS</div>

  <!-- Page content (injected by Eleventy from src/_includes/tracks/*.html) -->
  {{ content | safe }}

  <!-- ============================== FOOTER ============================== -->
  <footer class="site">
    <div class="wrap foot-grid">
      <div>
        <div class="brand">
          <img class="site-logo-img" src="${BASE_PATH}/clipsat-mark.png" alt="ClipSAT Logo">
          <span class="name">ClipSAT</span>
        </div>
        <p>Exam-ready mathematics for IGCSE, A-Level, the Digital SAT, ACT, and AP — taught by Mr. Mohamed Abdallah.</p>
      </div>
      <div style="font-family:var(--sans); font-size:.86rem; color:var(--muted)">
        <div style="font-weight:650; color:var(--ink); margin-bottom:8px">Explore</div>
        <a onclick="showView('calculus')">Calculus</a> ·
        <a onclick="showView('algebra')">Algebra</a> ·
        <a onclick="showView('alg2')">Algebra 2</a> ·
        <a onclick="showView('geo')">Geometry</a> ·
        <a onclick="showView('qudrat')">GAT Qudrat</a> ·
        <a onclick="showView('tahsili')">SAAT Tahsili</a> ·
        <a onclick="showView('sat')">Digital SAT</a> ·
        <a onclick="showView('act')">ACT Math</a> ·
        <a onclick="showView('aslevel')">AS Level</a> ·
        <a onclick="showView('a2level')">A2 Level</a> ·
        <a onclick="showView('apab')">AP Calculus AB</a> ·
        <a onclick="showView('apbc')">AP Calculus BC</a> ·
        <a onclick="showView('igcse')">IGCSE 0580</a> ·
        <a href="${BASE_PATH}/">All courses</a> ·
        <a href="https://wa.me/966597688647" target="_blank" rel="noopener">WhatsApp</a> ·
        <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">Telegram</a> · <a href="https://paypal.me/mohammedamy" target="_blank" rel="noopener" style="color:#003087;font-weight:600">☕ Support via PayPal</a>
      </div>
      <div style="font-family:var(--sans); font-size:.86rem; color:var(--muted)">
        <div style="font-weight:650; color:var(--ink); margin-bottom:8px">Legal</div>
        <a href="/ClipSAT/contact/">Contact</a> ·
        <a href="/ClipSAT/privacy/">Privacy Policy</a> ·
        <a href="/ClipSAT/terms/">Terms of Service</a> ·
        <a href="/ClipSAT/cookies/">Cookie Policy</a>
      </div>
    </div>
    <div class="wrap"><p class="foot-note">© <span id="yr">2026</span> ClipSAT · Mr. Mohamed Abdallah. Equations rendered with MathJax · figures drawn live on HTML canvas.</p></div>
  </footer>

  <!-- ===== LEGAL (PRIVACY / TERMS) MODALS ===== -->
  <div id="legal-overlay" class="legal-overlay" role="dialog" aria-modal="true" aria-label="Legal" onclick="if(event.target===this)closeLegal()">
    <div class="legal-box">
      <button class="legal-close" onclick="closeLegal()" aria-label="Close">✕</button>
      <div id="legal-privacy" style="display:none">
        {% include "legal/privacy-content.html" %}
        <p><a href="/ClipSAT/privacy/">Open as a standalone page →</a></p>
      </div>
      <div id="legal-terms" style="display:none">
        {% include "legal/terms-content.html" %}
        <p><a href="/ClipSAT/terms/">Open as a standalone page →</a></p>
      </div>
    </div>
  </div>

  <!-- ══ Mock exam overlay ══ -->
  <div id="mock-exam-overlay">
    <div id="mock-exam-header">
      <h3 id="mock-exam-title">Mock Exam</h3>
      <span id="mock-exam-timer">--:--</span>
      <button class="mock-exit-btn" onclick="exitMockExam()" style="margin-left:12px;padding:4px 12px;font-size:.82rem">&#x2715; Exit</button>
    </div>
    <div id="mock-exam-body"></div>
    <div id="mock-exam-footer">
      <button class="mock-exit-btn" onclick="exitMockExam()">Exit Without Submitting</button>
      <button class="mock-submit-btn" onclick="submitMockExam()">Submit Paper &#x2713;</button>
    </div>
  </div>

  <!-- ============================== MATH HELPER CHAT ============================== -->
  <button id="chatFab" class="chat-fab" aria-label="Open Ask Mr. Mohamed math chat">
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="#ffffff"/><path d="M8 9h8M8 12h5" stroke="#1E3A6E" stroke-width="1.5" stroke-linecap="round"/></svg>
    Ask Mr. Mohamed
  </button>

  <div id="chatPanel" class="chat-panel" role="dialog" aria-label="Ask Mr. Mohamed math chat" aria-hidden="true">
    <div class="chat-head" style="flex-direction:column; align-items:stretch; gap:0">
      <div style="display:flex; align-items:center; justify-content:space-between">
        <div class="chat-title">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="#ffffff"/><path d="M8 9h8M8 12h5" stroke="#1E3A6E" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span>Ask Mr. Mohamed<span class="chat-sub">ClipSAT math tutor</span></span>
        </div>
        <button id="chatClose" class="chat-close" aria-label="Close chat">&times;</button>
      </div>

    </div>
    <div id="chatBody" class="chat-body"></div>
    <div class="chat-input">
      <textarea id="chatInput" rows="1" placeholder="Ask about a math problem…" aria-label="Type your math question"></textarea>
      <button id="chatSend" class="chat-send" aria-label="Send message">&rarr;</button>
    </div>
    <div class="chat-foot">AI tutor · double-check key steps yourself &nbsp;·&nbsp; <button onclick="openAISettings()" style="background:none;border:none;cursor:pointer;color:var(--indigo);font-size:.78rem;padding:0;font-family:inherit">⚙️ API Key</button></div>
  </div>

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

    // Open the chapter requested via ?ch= (cross-track search result landing
    // here after a real page navigation — see CSSearch.go()), else the first
    // chapter so content is visible immediately.
    if(CURRENT !== 'home' && window.goChapter) {
      var requestedCh = new URLSearchParams(window.location.search).get('ch');
      var targetLink = requestedCh
        ? document.querySelector('#view-' + CURRENT + ' .rail a[data-target="' + requestedCh + '"]')
        : null;
      var openLink = targetLink || document.querySelector('#view-' + CURRENT + ' .rail a[data-target]');
      if(openLink) window.goChapter(openLink.getAttribute('data-target'), CURRENT);
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
