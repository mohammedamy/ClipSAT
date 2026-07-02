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
  return p.replace(mathJaxConfigRe, '/* [MathJax config removed — KaTeX used instead] */\n');
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

  <!-- Navigation shim: convert SPA navigate() calls to page loads -->
  <script>
  (function(){
    var BASE = '${BASE_PATH}';
    var TRACK_URLS = ${navItemsJson.replace(/\n/g, '\n    ')
      .replace(/"id":/g, '"id":')};
    window.navigate = function(viewId){
      var slug = viewId.replace('view-','');
      var entry = TRACK_URLS.find(function(t){ return t.id === slug; });
      if(entry){ window.location.href = BASE + '/' + entry.slug + '/'; }
      else { window.location.href = BASE + '/'; }
    };
    // Mark the active track so CSS can highlight the nav item
    window.CLIPSAT_TRACK = '{{ trackId }}';
  })();
  </script>

  <!-- Page content (injected by Eleventy from src/_includes/tracks/*.html) -->
  {{ content | safe }}

  <!-- Activate this track's view — CSS hides all .view; only .view.active shows -->
  <script>
  (function(){
    var el = document.getElementById('view-{{ trackId }}');
    if (el) el.classList.add('active');
  })();
  </script>

  <!-- Engine JS (all inline scripts extracted from index.html) -->
  <script src="${BASE_PATH}/js/engine.js"></script>

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
