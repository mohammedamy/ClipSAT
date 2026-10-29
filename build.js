#!/usr/bin/env node
/**
 * ClipSAT build.js — site assembly script
 * ============================================
 * Reads the real, hand-maintained sources and writes the build artifacts
 * Eleventy needs:
 *   src/styles/main.css     → public/css/main.css   (minified)
 *   src/scripts/modules/*.js → public/js/engine.js   (concatenated, minified)
 *   src/index.njk                — home page (wraps src/_includes/tracks/home.html)
 *   src/_includes/base.njk       — shared page shell (header/nav/footer), written
 *                                   from the baseNjk template literal below
 *   src/404.html                  — redirect stub for old hash-based URLs
 *
 * Formerly (through WP10 step 3) this script regex-extracted CSS/JS/per-track
 * HTML out of a single 41K-line index.html monolith on every run — that
 * pipeline is retired (WP10 step 4, docs/PHASE1-2_TARGET_ARCHITECTURE.md).
 * Every one of the 21 subject tracks already renders from
 * content/{track}/*.json (docs/DECISIONS/0005 onward); the pieces that
 * weren't chapter-based content (CSS, JS, the homepage, this shell template)
 * are now real source files/literals a person edits directly, not
 * extraction output. See git history before this commit for the old script.
 *
 * Run: node build.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');
const csso = require('csso');

// ─── Site config ──────────────────────────────────────────────────────────────
// Base path — served at the clipsat.org root, so this is empty. Was
// '/ClipSAT' back when this was hosted at mohammedamy.github.io/ClipSAT/;
// kept as a variable (not just deleted) since ${BASE_PATH}/... is still
// used throughout this template for every internal absolute link/asset URL.
const BASE_PATH = '';

// ─── Paths ────────────────────────────────────────────────────────────────────
const ROOT      = __dirname;
const PUBLIC_CSS = path.join(ROOT, 'public', 'css', 'main.css');
const PUBLIC_JS  = path.join(ROOT, 'public', 'js', 'engine.js');
const SRC_DIR    = path.join(ROOT, 'src');

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

console.log('\nClipSAT build.js\n');

// ─── 1. Read CSS ────────────────────────────────────────────────────────────
// Real, hand-edited source at src/styles/main.css — this step reads and
// minifies it. (Formerly regex-extracted from index.html's <style> blocks.)
console.log('── Step 1: Read CSS (src/styles/main.css) ───────────');
const SRC_CSS = path.join(SRC_DIR, 'styles', 'main.css');
const cssOut = fs.readFileSync(SRC_CSS, 'utf8').trim();
const cssMinified = csso.minify(cssOut).css;
console.log(`  Minified CSS: ${cssOut.length} → ${cssMinified.length} bytes`);
write(PUBLIC_CSS, cssMinified + '\n');

// Copy self-hosted KaTeX 0.16.11 assets from node_modules/katex/dist → public/vendor/katex
const KATEX_SRC = path.join(ROOT, 'node_modules', 'katex', 'dist');
const KATEX_DEST = path.join(ROOT, 'public', 'vendor', 'katex');
if (fs.existsSync(KATEX_SRC)) {
  mkdirp(path.join(KATEX_DEST, 'contrib'));
  mkdirp(path.join(KATEX_DEST, 'fonts'));
  for (const f of ['katex.min.css', 'katex.min.js']) {
    fs.copyFileSync(path.join(KATEX_SRC, f), path.join(KATEX_DEST, f));
  }
  fs.copyFileSync(
    path.join(KATEX_SRC, 'contrib', 'auto-render.min.js'),
    path.join(KATEX_DEST, 'contrib', 'auto-render.min.js')
  );
  for (const fontFile of fs.readdirSync(path.join(KATEX_SRC, 'fonts'))) {
    fs.copyFileSync(path.join(KATEX_SRC, 'fonts', fontFile), path.join(KATEX_DEST, 'fonts', fontFile));
  }
  console.log('  ✓  public/vendor/katex (self-hosted KaTeX 0.16.11 + fonts)');
}

// ─── 2. Read JS ─────────────────────────────────────────────────────────────
// Real, hand-edited source at src/scripts/modules/*.js (Plan 5, Phase 5.012)
// — this step reads every module named in modules/manifest.json, concatenates
// them in that exact order, and minifies the result. The generated search
// index (below) is prepended onto the minified output before it's written.
//
// Until Aug 2026 this was one 19,135-line src/scripts/engine.js. It's now
// split at its top-level statement boundaries only (each module is still one
// or more complete, self-contained top-level statements/IIFEs from the
// original file) — a pure reorganization with zero behavior change, verified
// by diffing this step's output against the pre-split build byte-for-byte.
// The split does NOT reach inside any single large IIFE (e.g. 02-core-app.js
// is still ~8,400 lines) — sub-splitting a function body's internals would
// mean turning its private closure vars into shared globals, a real
// refactor, not a reorganization; deeper decoupling of individual mixed-
// concern modules (Phase 5.014, ADR 0027) and actual deferred loading of the
// pieces that decoupling frees up (Phase 5.015, ADR 0028) are separate,
// later passes. Manifest order matters and must be preserved: later modules
// rely on functions/vars earlier modules define on `window` (this is a
// classic-script file, not ES modules, so cross-module names are globals),
// and a few modules (e.g. showView) are progressively wrapped/redefined by
// several later modules in original file order — reordering the manifest
// would change which wrapper wins.
console.log('── Step 2: Read JS (src/scripts/modules/*.js) ────────');
const MODULES_DIR = path.join(SRC_DIR, 'scripts', 'modules');
const moduleManifest = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'manifest.json'), 'utf8'));
// Interactive Practice data (Plan 5 Phase 5.015, ADR 0033): one file per track
// in src/scripts/ix-data/, shipped as public/js/ix/{track}.js and loaded only on
// that track's page by 19-interactive-activities-engine-v1.js. The engine is told
// which tracks have a file (its IX_TRACKS placeholder) so no page requests a
// data file that doesn't exist.
const IX_DATA_DIR = path.join(SRC_DIR, 'scripts', 'ix-data');
const ixTracks = fs.existsSync(IX_DATA_DIR)
  ? fs.readdirSync(IX_DATA_DIR).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, '')).sort()
  : [];
const IX_PLACEHOLDER = '/*@IX_TRACKS@*/[]';
const MINIFY_OPTS = { compress: { toplevel: false }, mangle: { toplevel: false } };
let ixInjected = false;
const engineJs = moduleManifest
  .map((name) => fs.readFileSync(path.join(MODULES_DIR, name), 'utf8'))
  .join('')
  .trim()
  .replace(IX_PLACEHOLDER, () => { ixInjected = true; return JSON.stringify(ixTracks); });
console.log(`  ${moduleManifest.length} modules concatenated`);
const jsMinified = UglifyJS.minify(engineJs, MINIFY_OPTS);

// ─── 2a. Deferred modules (Plan 5, Phase 5.015) ────────────────────────────
// Modules listed in modules/deferred-manifest.json are real feature code
// (not part of the critical path every page needs at load) that ships as
// its own small public/js/<output> file instead of being folded into the
// main engine.js bundle. Nothing auto-loads these — each one's own loader
// module (still part of the main bundle, e.g. 20b-teacher-mode-loader.js)
// is what actually injects the <script> tag, on demand, the first time the
// feature is needed. See ADR 0028 for why this needed its own manifest
// rather than just being left out of manifest.json silently.
const deferredManifest = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, 'deferred-manifest.json'), 'utf8'));
// An entry may list several modules as "sources"; they ship concatenated, in order, as one file.
deferredManifest.forEach(({ source, sources, output }) => {
  let src = (sources || [source]).map((f) => fs.readFileSync(path.join(MODULES_DIR, f), 'utf8').trim()).join('\n');
  if (src.includes(IX_PLACEHOLDER)) {
    src = src.replace(IX_PLACEHOLDER, () => { ixInjected = true; return JSON.stringify(ixTracks); });
  }
  source = (sources || [source]).join(' + ');
  const minified = UglifyJS.minify(src, MINIFY_OPTS);
  const outPath = path.join(ROOT, 'public', 'js', output);
  if (minified.error) {
    console.error(`  ⚠  ${source} minification failed, shipping unminified:`, minified.error.message);
    write(outPath, src);
  } else {
    console.log(`  Minified JS: ${src.length} → ${minified.code.length} bytes (${source} → ${output})`);
    write(outPath, minified.code);
  }
});
if (ixTracks.length && !ixInjected) {
  throw new Error(`IX_TRACKS placeholder ${IX_PLACEHOLDER} not found in engine or deferred modules`);
}

// ─── 2a-ix. Per-track Interactive Practice data (ADR 0033) ─────────────────
{
  const outDir = path.join(ROOT, 'public', 'js', 'ix');
  fs.mkdirSync(outDir, { recursive: true });
  // Drop outputs whose source file was removed, so a deleted track can't keep shipping stale data.
  fs.readdirSync(outDir).filter((f) => f.endsWith('.js') && !ixTracks.includes(f.replace(/\.js$/, '')))
    .forEach((f) => fs.unlinkSync(path.join(outDir, f)));
  let before = 0, after = 0;
  ixTracks.forEach((t) => {
    const src = fs.readFileSync(path.join(IX_DATA_DIR, t + '.js'), 'utf8').trim();
    const minified = UglifyJS.minify(src, { compress: false, mangle: false });
    if (minified.error) throw new Error(`ix-data/${t}.js failed to minify: ${minified.error.message}`);
    write(path.join(outDir, t + '.js'), minified.code);
    before += src.length; after += minified.code.length;
  });
  console.log(`  Interactive Practice data: ${ixTracks.length} tracks, ${before} → ${after} bytes (public/js/ix/)`);
}

// ─── 2a-ex. Per-track canvas explorers (ADR 0039) ──────────────────────────
// src/scripts/explorers/{track}.js → public/js/ex/{track}.js. src/_data/explorerTracks.js
// lists the same directory, so base.njk only emits a <script> for tracks that have a file.
{
  const exDir = path.join(SRC_DIR, 'scripts', 'explorers');
  const outDir = path.join(ROOT, 'public', 'js', 'ex');
  const exTracks = fs.existsSync(exDir)
    ? fs.readdirSync(exDir).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, '')).sort()
    : [];
  fs.mkdirSync(outDir, { recursive: true });
  fs.readdirSync(outDir).filter((f) => f.endsWith('.js') && !exTracks.includes(f.replace(/\.js$/, '')))
    .forEach((f) => fs.unlinkSync(path.join(outDir, f)));
  let before = 0, after = 0;
  exTracks.forEach((t) => {
    const src = fs.readFileSync(path.join(exDir, t + '.js'), 'utf8').trim();
    const minified = UglifyJS.minify(src, { compress: false, mangle: false });
    if (minified.error) throw new Error(`explorers/${t}.js failed to minify: ${minified.error.message}`);
    write(path.join(outDir, t + '.js'), minified.code);
    before += src.length; after += minified.code.length;
  });
  console.log(`  Canvas explorers: ${exTracks.length} tracks, ${before} → ${after} bytes (public/js/ex/)`);
}

// ─── 2b. Generate the search index ─────────────────────────────────────────
// window.SEARCH_CHAPTER_INDEX used to be a hand-frozen array pasted into
// engine.js — it silently drifted out of sync with real content (e.g. it
// still said ibhl-t1 was "Algebra & Complex Numbers" after a content edit
// renamed the chapter to "Algebra, Proof & Complex Numbers"). Generating it
// here from the SAME data Eleventy renders the pages from means it can't
// drift again. Two sources per track:
//   1. migratedContent (content/{track}/*.json via src/_data/migratedContent.js)
//      for every real content chapter's title + a handful of "keywords" —
//      short concept phrases (rule names, definition/theorem/worked-example
//      labels) pulled from that chapter's `cards`/`callout` blocks, so a
//      search for e.g. "chain rule" or "law of cosines" can land on the
//      right chapter even when that exact phrase never appears in the
//      chapter's own title.
//   2. Each track's src/{track}/index.njk for the practiceSetId/
//      testGeneratorId/downloadsId chapter ids — these 3 utility "chapters"
//      per track are real rail/search destinations but aren't chapter JSON
//      files, so they don't come from migratedContent.
console.log('\n── Step 2b: Generate search index ────────────────────');
const migratedContent = require('./src/_data/migratedContent.js')();

// title.en/label.en strings are inconsistently pre-escaped across
// content/*.json — some tracks store a literal "&", others "&amp;" (both
// render identically as "&" once the page's own HTML rendering decodes
// them) — decode before embedding as a plain JS string here, or a track
// using "&amp;" would double-escape to a literal "&amp;" once the search
// dropdown's own _esc() escapes it again for display.
function decodeEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');
}
function stripLeadingSymbols(s) {
  return String(s || '').replace(/^[^\w؀-ۿ]+/, '').trim();
}
// "● Definition 2.1 — The derivative" → "The derivative"
// "Worked example 2.B — Product rule" → "Product rule"
// "Power rule" (no dash) → "Power rule" (used as-is)
function conceptFromLabel(label) {
  let s = stripLeadingSymbols(decodeEntities(label));
  const dash = s.lastIndexOf('—') !== -1 ? s.lastIndexOf('—') : s.indexOf(' - ');
  if (dash !== -1) s = s.slice(dash + 1).replace(/^[—-]\s*/, '').trim();
  return s;
}
function collectKeywords(chapter) {
  const out = [];
  const seen = {};
  function push(label) {
    const s = conceptFromLabel(label);
    const key = s.toLowerCase();
    if (!s || s.length < 3 || s.length > 60 || seen[key]) return;
    seen[key] = 1;
    out.push(s);
  }
  (function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node.kind === 'callout' && node.label && node.label.en) push(node.label.en);
    if (node.kind === 'cards' && Array.isArray(node.items)) {
      node.items.forEach((it) => { if (it.label && it.label.en) push(it.label.en); });
    }
    // "text" blocks' own heading (a plain string, not a {en,ar} field like
    // label) name a concept mid-chapter — e.g. calculus's Applications of
    // Derivatives chapter has a "L'Hôpital's Rule" text heading right next
    // to its Theorem 5.3 callout; only the callout's own label used to get
    // harvested here, so a search for the rule's name by itself only half-
    // worked (found via the theorem's label, missed via the heading).
    if (node.kind === 'text' && typeof node.heading === 'string') push(node.heading);
    Object.keys(node).forEach((k) => walk(node[k]));
  }(chapter.content));
  return out.slice(0, 12); // cap payload per chapter
}

const UTILITY_CHAPTERS = [
  { re: /practiceSetId\s*=\s*'([^']+)'/, title: 'Practice set' },
  { re: /testGeneratorId\s*=\s*'([^']+)'/, title: 'Test generator' },
  { re: /downloadsId\s*=\s*'([^']+)'/, title: 'Downloads' },
];

const searchIndex = [];
let keywordCount = 0;
Object.keys(migratedContent).sort().forEach((view) => {
  const mc = migratedContent[view];
  mc.chapters.forEach((ch) => {
    const title = decodeEntities((ch.title && ch.title.en) || ch.id);
    const entry = { view, chapter: ch.id, title };
    const keywords = collectKeywords(ch);
    if (keywords.length) { entry.keywords = keywords; keywordCount += keywords.length; }
    searchIndex.push(entry);
  });
  const njkPath = path.join(SRC_DIR, view, 'index.njk');
  if (fs.existsSync(njkPath)) {
    const njkSrc = fs.readFileSync(njkPath, 'utf8');
    UTILITY_CHAPTERS.forEach((u) => {
      const m = njkSrc.match(u.re);
      if (m) searchIndex.push({ view, chapter: m[1], title: u.title });
    });
  }
});
console.log(`  ${searchIndex.length} entries (${keywordCount} keywords) across ${Object.keys(migratedContent).length} tracks`);
const searchIndexJs = `window.SEARCH_CHAPTER_INDEX = ${JSON.stringify(searchIndex)};\n`;

if (jsMinified.error) {
  // Never ship broken JS: fall back to the unminified source and keep building.
  console.error('  ⚠  JS minification failed, shipping unminified engine.js:', jsMinified.error.message);
  write(PUBLIC_JS, engineJs);
} else {
  console.log(`  Minified JS: ${engineJs.length} → ${jsMinified.code.length} bytes`);
  write(PUBLIC_JS, jsMinified.code);
}
// The index ships on its own (ADR 0044): only the topic search reads it, and it loads it the
// first time the search box is used, instead of every page carrying it inside engine.js.
write(path.join(ROOT, 'public', 'js', 'search-index.js'), searchIndexJs);

// ─── 3. Write the home page template ───────────────────────────────────────
// The only page still assembled by this script — 'home' isn't a chapter-
// based track, so the content/{track}/*.json system (used by all 21 real
// subject tracks) doesn't fit it. src/_includes/tracks/home.html is itself
// a real, hand-maintained source file (not generated) — this just wraps it
// in the Eleventy front-matter every page needs. Every other track's own
// src/{slug}/index.njk is hand-maintained directly and untouched by this
// script (docs/DECISIONS/0005 onward).
console.log('\n── Step 3: Write home page template ──────────────────');
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

// ─── 4. Write base template ───────────────────────────────────────────────────
console.log('\n── Step 4: Write base.njk template ─────────────────');

const baseNjk = `<!DOCTYPE html>
<html lang="{{ 'ar' if isRtl else 'en' }}"{% if isRtl %} dir="rtl"{% endif %}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Phase 6 perf: open the connection to KaTeX's CDN as early as possible.
       Every page loads KaTeX's CSS/JS + 4 font files from here; without this
       hint the browser doesn't start DNS/TLS for that origin until it parses
       the <link>/<script> tags further down, which is exactly the resources
       Lighthouse's render-blocking-insight flags as the slowest to arrive. -->
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">

  <!-- Bespoke academic typography: Plus Jakarta Sans (UI), Newsreader (Scholarly Serif), JetBrains Mono (Math/Code), Noto Sans Arabic (RTL) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <title>{{ title }}</title>
  <meta name="description" content="{{ description }}">
  <meta name="theme-color" content="#1E3A6E">
  <meta name="application-name" content="ClipSAT">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="${BASE_PATH}/favicon.png?v=2">
  <link rel="icon" type="image/png" sizes="192x192" href="${BASE_PATH}/icon-192.png?v=2">
  <link rel="apple-touch-icon" href="${BASE_PATH}/icon-192.png?v=2">

  <!-- Canonical URL & Hreflang alternates -->
  <link rel="canonical" href="https://clipsat.org{{ '/' + trackId + '/' if trackId !== 'home' else '/' }}">
  <link rel="alternate" hreflang="en" href="https://clipsat.org{{ '/' + trackId + '/' if trackId !== 'home' else '/' }}">
  <link rel="alternate" hreflang="ar" href="https://clipsat.org{{ '/' + trackId + '/' if trackId !== 'home' else '/' }}?lang=ar">
  <link rel="alternate" hreflang="x-default" href="https://clipsat.org{{ '/' + trackId + '/' if trackId !== 'home' else '/' }}">

  <!-- Open Graph / Twitter Card -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ClipSAT">
  <meta property="og:title" content="{{ title }}">
  <meta property="og:description" content="{{ description }}">
  <meta property="og:url" content="https://clipsat.org{{ '/' + trackId + '/' if trackId !== 'home' else '/' }}">
  <meta property="og:image" content="https://clipsat.org/og-image.png">
  <meta property="og:locale" content="{{ 'ar_SA' if isRtl else 'en_US' }}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ title }}">
  <meta name="twitter:description" content="{{ description }}">
  <meta name="twitter:image" content="https://clipsat.org/og-image.png">

  <!-- Structured data: Course per subject track, Person + Organization sitewide -->
  {% if trackId != 'home' and trackId != 'privacy' and trackId != 'terms' and trackId != 'contact' and trackId != 'cookies' and trackId != 'calculator' and trackId != 'about' and trackId != 'trust' and trackId != 'pricing' %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "{{ title }}",
    "description": "{{ description }}",
    "url": "https://clipsat.org{{ '/' + trackId + '/' if trackId !== 'home' else '/' }}",
    "inLanguage": "{{ 'ar' if isRtl else 'en' }}",
    "isAccessibleForFree": true,
    "provider": {
      "@type": "Organization",
      "name": "ClipSAT",
      "sameAs": "https://clipsat.org/"
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
    "url": "https://clipsat.org/",
    "worksFor": {
      "@type": "Organization",
      "name": "ClipSAT",
      "url": "https://clipsat.org/"
    },
    "sameAs": [
      "https://wa.me/966597688647",
      "https://t.me/ClipSAT22",
      "https://www.youtube.com/@ClipSAT22"
    ]
  }
  </script>

  <!-- KaTeX (replaces MathJax — ~90 KB vs 7 × 400 KB).
       CSS loaded via preload+swap, not a plain blocking <link>: measured with
       Lighthouse (render-blocking-insight) at ~1.1s of render-blocking cost
       for a 3.4KB file, entirely network-RTT, not parse/transfer time. That
       cost buys nothing — the KaTeX/auto-render <script>s below are already
       deferred, so no math actually typesets until after the HTML parse
       completes regardless of when this CSS finishes loading. Deferring the
       CSS load to match the JS's own timing removes a full blocking
       round-trip from the critical path with no visual change: raw
       "\( ... \)" source text (present either way until the deferred JS
       runs) doesn't need this stylesheet to display. -->
  <link rel="stylesheet" href="${BASE_PATH}/vendor/katex/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossorigin="anonymous">
  <script defer src="${BASE_PATH}/vendor/katex/katex.min.js" integrity="sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg" crossorigin="anonymous"></script>
  <script defer src="${BASE_PATH}/vendor/katex/contrib/auto-render.min.js" integrity="sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk" crossorigin="anonymous"></script>

  <!-- MathJax-compatible shim + synchronous string renderer + MutationObserver, backed by KaTeX. -->
  <script>
  (function(){
    var O_IN = '\\\\(', C_IN = '\\\\)', O_DP = '\\\\[', C_DP = '\\\\]', DD = '$$';
    var KATEX_OPTS = {
      delimiters: [
        {left:'$$', right:'$$', display:true},
        {left:'\\\\[', right:'\\\\]', display:true},
        {left:'\\\\(', right:'\\\\)', display:false}
      ],
      ignoredClasses: ['katex', 'katex-display', 'katex-html', 'katex-mathml', 'sr-only'],
      throwOnError: false
    };
    function decodeEntities(s){
      return s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#(\d+);/g,function(_,n){return String.fromCharCode(parseInt(n,10));}).replace(/&amp;/g,'&');
    }
    window.CSRenderMathString = function(str){
      if(!str || typeof str !== 'string') return str;
      if(!window.katex || typeof window.katex.renderToString !== 'function') return str;
      if(str.indexOf(O_IN) === -1 && str.indexOf(O_DP) === -1 && str.indexOf(DD) === -1) return str;
      var out = '', i = 0, L = str.length;
      while(i < L){
        var i1 = str.indexOf(O_IN, i);
        var i2 = str.indexOf(O_DP, i);
        var i3 = str.indexOf(DD, i);
        var next = -1, mode = 0;
        if(i1 !== -1){ next = i1; mode = 1; }
        if(i2 !== -1 && (next === -1 || i2 < next)){ next = i2; mode = 2; }
        if(i3 !== -1 && (next === -1 || i3 < next)){ next = i3; mode = 3; }
        if(next === -1){ out += str.slice(i); break; }
        out += str.slice(i, next);
        var closeTok = mode === 1 ? C_IN : (mode === 2 ? C_DP : DD);
        var end = str.indexOf(closeTok, next + 2);
        if(end === -1){ out += str.slice(next); break; }
        var rawTex = decodeEntities(str.slice(next + 2, end));
        try {
          out += window.katex.renderToString(rawTex, { displayMode: mode !== 1, throwOnError: false });
        } catch(e){
          out += str.slice(next, end + 2);
        }
        i = end + 2;
      }
      return out;
    };
    function markScrollableMath(el){
      if(!el || !el.querySelectorAll) return;
      var list = el.querySelectorAll('.katex-display');
      for(var i=0;i<list.length;i++){
        var d=list[i];
        if(!d.offsetParent) continue;
        if(d.scrollWidth>d.clientWidth+1){
          if(!d.hasAttribute('tabindex')) d.setAttribute('tabindex','0');
          if(!d.hasAttribute('role')) d.setAttribute('role','region');
          if(!d.hasAttribute('aria-label')) d.setAttribute('aria-label','Scrollable math expression');
        }
      }
    }
    function defaultScope(){
      var els = Array.prototype.slice.call(document.querySelectorAll('.chapter.ch-active, .hero, #view-home, .deep-card, .cq-paper, .fep-body, .ix-section, .ix-sec, #pq-overlay'));
      return els.length ? els : (document.body ? [document.body] : []);
    }
    function renderEls(elements){
      (elements || defaultScope()).forEach(function(el){
        if(!el || el.nodeType !== 1) return;
        try { window.renderMathInElement(el, KATEX_OPTS); } catch(e){}
        markScrollableMath(el);
        setTimeout(function(){ markScrollableMath(el); }, 400);
      });
    }
    function whenReady(fn){
      if(typeof window.renderMathInElement === 'function'){ fn(); }
      else { setTimeout(function(){ whenReady(fn); }, 60); }
    }
    function typesetLike(elements, cb){
      var targets = elements || defaultScope();
      targets.forEach(function(el){ if(el) markScrollableMath(el); });
      whenReady(function(){ renderEls(targets); if(cb) cb(); });
    }
    window.MathJax = {
      typesetPromise: function(elements){
        return new Promise(function(resolve){ typesetLike(elements, resolve); });
      },
      typeset: function(elements){ typesetLike(elements); },
      startup: { promise: Promise.resolve() }
    };
    function hasRawMath(txt){
      if(!txt) return false;
      return txt.indexOf(O_IN) !== -1 || txt.indexOf(O_DP) !== -1 || txt.indexOf(DD) !== -1;
    }
    var pendingNodes = [];
    var moTimer = null;
    function flushPending(){
      moTimer = null;
      if(!pendingNodes.length) return;
      var batch = pendingNodes.slice();
      pendingNodes.length = 0;
      typesetLike(batch);
    }
    function queueNode(n){
      if(!n || n.nodeType !== 1) return;
      if(n === document.body || n === document.documentElement || n.tagName === 'MAIN') return;
      if(n.classList && (n.classList.contains('katex') || n.classList.contains('katex-display') || n.classList.contains('sr-only'))) return;
      if(!hasRawMath(n.textContent)) return;
      if(pendingNodes.indexOf(n) === -1) pendingNodes.push(n);
      if(!moTimer) moTimer = setTimeout(flushPending, 30);
    }
    whenReady(function(){
      if(typeof window.CSRenderAllExplorers === 'function') window.CSRenderAllExplorers();
      var initTargets = document.querySelectorAll('.chapter.ch-active, .deep-card, .ch-link, .cq-paper, .fep-body, .ix-sec, #pq-overlay');
      for(var i=0;i<initTargets.length;i++) queueNode(initTargets[i]);
      if(typeof MutationObserver !== 'undefined' && document.body){
        var mo = new MutationObserver(function(muts){
          for(var i=0;i<muts.length;i++){
            var m = muts[i];
            if(m.type === 'attributes'){
              if(m.target && m.target.classList && m.target.classList.contains('chapter') && m.target.classList.contains('ch-active')){
                queueNode(m.target);
              }
            } else if(m.addedNodes){
              for(var j=0;j<m.addedNodes.length;j++){
                var ad = m.addedNodes[j];
                if(ad.nodeType === 1) queueNode(ad);
                else if(ad.nodeType === 3 && ad.parentNode) queueNode(ad.parentNode);
              }
            }
          }
        });
        mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
      }
    });
    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        defaultScope().forEach(function(el){ markScrollableMath(el); });
      }, 200);
    });
  })();
  </script>

  <!-- JSZip (needed for export) -->
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js" crossorigin="anonymous"></script>

  <!-- Import map only — resolves the bare "three" specifier so Three.js addons
       (OrbitControls) can \`import ... from "three"\` when a 3D explorer
       dynamically import()s them on first click. Zero network/parse cost until
       that happens: an import map is inert JSON, never fetched or evaluated
       against real modules on page load. -->
  <script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"}}</script>

  <!-- Styles -->
  <link rel="stylesheet" href="${BASE_PATH}/css/main.css?v=20261026b">
</head>
<body class="track-{{ trackId }}">

  <!-- Mark the active track early so engine and CSS can read it -->
  <script>window.CLIPSAT_TRACK = '{{ trackId }}';</script>

  <!-- ====== SHARED HEADER =====
       Hand-maintained directly here — this file generates
       src/_includes/base.njk, which every page is built from. Through
       WP10 step 4 this used to be one of two independently-maintained
       copies (the other lived in the now-deleted root index.html, itself
       never served — a 2026-08-12 audit caught 3 months of silent drift
       between them: missing social icons, a missing Teacher-Mode
       whiteboard button). There is now exactly one copy, so that class of
       drift can't recur; scripts/check-shell-sync.js (which used to guard
       it) was retired for the same reason. ====== -->
  <header class="site">
    <!-- Screen-reader-only page heading — every page needs exactly one <h1>, and it
         must live inside a landmark; kept off-screen since the visual title already
         lives in the header/breadcrumb. -->
    <h1 class="sr-only">{{ title }}</h1>
    <div class="wrap nav">
      <!-- Mobile-only sign-in icon — a synced duplicate of #cloudSignInBtn (below,
           inside the hamburger panel), same pattern as .nav-select-mobile: on
           phones the real button is hidden along with the rest of .nav-links
           until the hamburger is opened, which buried sign-in behind an extra
           tap. This copy sits first in source order so it renders at the very
           left of the header (and, thanks to body.rtl's direction:rtl on
           header.site, at the mirrored "start" edge — the right — in Arabic).
           Kept in sync (icon/title/click handler) by renderAuthUI() in
           public/js/cloud-sync.js; only visible below the 760px breakpoint
           where .nav-links collapses into the hamburger menu (see main.css). -->
      <button id="cloudSignInBtnMobile" class="mobile-signin-btn" title="Sign in to sync your progress across devices" aria-label="Sign in to sync your progress across devices" onclick="window.openCloudAuthModal&&window.openCloudAuthModal()">☁️</button>
      <div class="brand" onclick="showView('home')" title="Home">
        <img id="site-logo-img" class="site-logo-img" src="${BASE_PATH}/clipsat-mark-header.png" alt="ClipSAT Logo" width="128" height="144">
        <span class="name">ClipSAT</span>
      </div>
      <select class="nav-select" id="navSelect" onchange="navSelectChange(this)" aria-label="Choose category">
        <option value="home">Overview</option>
        <optgroup label="Core Mathematics">
          <option value="calculus">Calculus</option>
          <option value="algebra">Algebra 1</option>
          <option value="alg2">Algebra 2</option>
          <option value="geo">Geometry</option>
          <option value="precalc">Pre-Calculus</option>
          <option value="linalg">Linear Algebra</option>
          <option value="mvc">Multivariable Calculus</option>
          <option value="odes">Differential Equations</option>
          <option value="mathai">Math for AI &amp; Data Science</option>
        </optgroup>
        <optgroup label="College Board AP®">
          <option value="apab">AP Calculus AB</option>
          <option value="apbc">AP Calculus BC</option>
          <option value="appc">AP Precalculus</option>
          <option value="apstats">AP Statistics</option>
        </optgroup>
        <optgroup label="Cambridge, Edexcel &amp; IB">
          <option value="igcse">IGCSE 0580</option>
          <option value="edexcel">Pearson Edexcel IGCSE (4MA1)</option>
          <option value="addmath">Additional Maths (0606/4PM1)</option>
          <option value="aslevel">Cambridge AS Level</option>
          <option value="a2level">Cambridge A2 Level</option>
          <option value="ibsl">IB Math SL (AA/AI)</option>
          <option value="ibhl">IB Math HL (AA/AI)</option>
        </optgroup>
        <optgroup label="Standardized &amp; Contest Prep">
          <option value="sat">Digital SAT</option>
          <option value="act">ACT Math</option>
          <option value="act2">ACT 2 Math Level 1</option>
          <option value="act2l2">ACT 2 Math Level 2</option>
          <option value="est">EST</option>
          <option value="est2">EST 2 Math Level 1</option>
          <option value="est2l2">EST 2 Math Level 2</option>
          <option value="olympiad">Contest Math &amp; Olympiad</option>
        </optgroup>
        <optgroup label="National &amp; Bilingual">
          <option value="qudrat">GAT Qudrat</option>
          <option value="tahsili">SAAT Tahsili</option>
          <option value="gaten">English GAT &amp; SAAT (Qiyas)</option>
        </optgroup>
      </select>
      <div class="spacer"></div>
      <button class="dm-toggle" id="dmToggle" title="Toggle dark mode" aria-label="Toggle dark mode">🌙</button>
      <button class="dm-toggle" id="fsToggle" title="Adjust text size" aria-label="Adjust text size">A</button>
      <button class="dm-toggle" id="hcToggle" title="Toggle high-contrast mode" aria-label="Toggle high-contrast mode" aria-pressed="false">◐</button>
      <button class="dm-toggle" id="i18n-toggle-btn" title="Switch to Arabic" aria-label="Switch language" onclick="i18n.setLocale(i18n.getLocale()==='ar'?'en':'ar')">🌐 عربي</button>
      <nav class="nav-links" id="navlinks">
        <span id="topic-search-wrap">
          <svg id="topic-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3a6 6 0 100 12A6 6 0 009 3zM1 9a8 8 0 1114.32 4.906l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387A8 8 0 011 9z" clip-rule="evenodd"/></svg>
          <input id="topic-search" type="search" placeholder="Search topics…" data-i18n-attr="placeholder:search.placeholder" autocomplete="off" aria-label="Search topics"
                 oninput="window.CSSearch&&window.CSSearch.onInput(this.value)"
                 onkeydown="window.CSSearch&&window.CSSearch.onKey(event)"
                 onfocus="window.CSSearch&&window.CSSearch.onInput(this.value)"
                 onblur="setTimeout(function(){window.CSSearch&&window.CSSearch.close()},200)">
          <div id="topic-search-results" role="listbox"></div>
        </span>
        <button class="mistake-nav-btn" id="cloudSignInBtn" title="Sign in to sync your progress across devices" aria-label="Sign in to sync your progress" onclick="window.openCloudAuthModal&&window.openCloudAuthModal()">☁️ <span>Sign in</span></button>
        <!-- "More" overflow menu — absorbs extra tools and secondary links so the header bar fits any page width -->
        <div class="nav-more-wrap">
          <button type="button" class="mistake-nav-btn nav-more-btn" id="navMoreBtn" aria-haspopup="true" aria-expanded="false" aria-controls="navMorePanel" title="More options" aria-label="More options">⋯ <span data-i18n="nav.more">More</span></button>
          <div class="nav-more-panel" id="navMorePanel" role="region" aria-label="More options" hidden>
            <div class="nav-more-section">
              <div class="nav-more-heading">Study Tools</div>
              <button type="button" class="nav-more-item" id="moreGlossaryBtn" onclick="window.openGlossaryModal&&window.openGlossaryModal();window.closeNavMorePanel&&window.closeNavMorePanel()" title="Bilingual Mathematics Glossary">
                <span class="nav-more-item-icon">📖</span>
                <span class="nav-more-item-text" data-i18n="nav.glossary">Glossary</span>
              </button>
              <button type="button" class="nav-more-item" id="moreFormulaBtn" onclick="window.openFormulaModal&&window.openFormulaModal();window.closeNavMorePanel&&window.closeNavMorePanel()" title="Official Reference &amp; Formula Sheets">
                <span class="nav-more-item-icon">📐</span>
                <span class="nav-more-item-text" data-i18n="nav.formulas">Formulas</span>
              </button>
              <button type="button" class="nav-more-item" id="moreMistakesBtn" onclick="openMistakes();window.closeNavMorePanel&&window.closeNavMorePanel()" title="Review mistakes" aria-label="Review mistakes">
                <span class="nav-more-item-icon">📋</span>
                <span class="nav-more-item-text"><span data-i18n="nav.mistakes">Mistakes</span><span id="mistakeBadge" style="margin-inline-start:4px;font-weight:600;color:var(--brand, #4f46e5)"></span></span>
              </button>
              <button type="button" class="nav-more-item" id="moreProgressBtn" onclick="openProgress();window.closeNavMorePanel&&window.closeNavMorePanel()" title="View your progress across tracks">
                <span class="nav-more-item-icon">📊</span>
                <span class="nav-more-item-text" data-i18n="nav.progress">Progress</span>
              </button>
              <button type="button" class="nav-more-item" id="moreWhiteboardBtn" onclick="window._ensureWhiteboard().then(function(){window.CSGamify.toggleWhiteboard();window.closeNavMorePanel&&window.closeNavMorePanel()})" title="Interactive Whiteboard">
                <span class="nav-more-item-icon">✏️</span>
                <span class="nav-more-item-text" data-i18n="nav.whiteboard">Whiteboard</span>
              </button>
              <a class="nav-more-item" href="${BASE_PATH}/calculator/" title="Graphing, 3D, scientific &amp; exam-mode calculator">
                <span class="nav-more-item-icon">🖩</span>
                <span class="nav-more-item-text" data-i18n="nav.calculator">Calculator</span>
              </a>
            </div>
            <div class="nav-more-divider"></div>
            <div class="nav-more-section">
              <div class="nav-more-heading">Teacher &amp; Classroom</div>
              <button type="button" class="nav-more-item" id="teacherModeBtn" onclick="window._ensureTeacherMode?window._ensureTeacherMode().then(function(){window.TeacherMode.toggle()}):null" title="Teacher Mode">
                <span class="nav-more-item-icon">📐</span>
                <span class="nav-more-item-text" data-i18n="nav.teacher">Teacher Mode</span>
              </button>
              <button type="button" class="nav-more-item" id="teacherViewBtn" title="Manage your classes and see student progress" onclick="window.openTeacherView&&window.openTeacherView();window.closeNavMorePanel&&window.closeNavMorePanel()" style="display:none">
                <span class="nav-more-item-icon">🏫</span>
                <span class="nav-more-item-text">Classroom View</span>
              </button>
              <button type="button" class="nav-more-item" id="shareClassroomBtn" title="Share this page to Google Classroom" onclick="window.shareToClassroom&&window.shareToClassroom();window.closeNavMorePanel&&window.closeNavMorePanel()">
                <span class="nav-more-item-icon">🏫</span>
                <span class="nav-more-item-text" data-i18n="nav.share-classroom">Share to Classroom</span>
              </button>
            </div>
            <div class="nav-more-divider"></div>
            <div class="nav-more-section">
              <a class="nav-more-item" href="${BASE_PATH}/about/" title="About ClipSAT">
                <span class="nav-more-item-icon">ℹ️</span>
                <span class="nav-more-item-text" data-i18n="nav.about">About</span>
              </a>
              <a class="nav-more-item" href="${BASE_PATH}/trust/" title="Trust &amp; Safety">
                <span class="nav-more-item-icon">🛡️</span>
                <span class="nav-more-item-text" data-i18n="nav.trust">Trust &amp; Safety</span>
              </a>
              <a class="nav-more-item" href="${BASE_PATH}/changelog.html" title="See all updates">
                <span class="nav-more-item-icon">🆕</span>
                <span class="nav-more-item-text" data-i18n="nav.whats-new-label">What's New</span>
              </a>
              <a class="nav-more-item nav-more-item-support" href="https://paypal.me/mohammedamy" target="_blank" rel="noopener" title="Support ClipSAT">
                <span class="nav-more-item-icon">☕</span>
                <span class="nav-more-item-text" data-i18n="nav.support">Support ClipSAT</span>
              </a>
            </div>
            <div class="nav-gamification">
              <span class="streak-badge" title="Daily streak">🔥 <span id="nav-streak">0</span></span>
              <span class="xp-badge" title="Total XP">⭐ <span id="nav-xp">0</span> XP</span>
            </div>
            <div id="nav-social" class="nav-social">
              <a href="https://wa.me/966597688647" class="nsoc nsoc-wa" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.15a9.9 9.9 0 0 0 5.64 1.75h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z"/></svg></a>
              <a href="https://www.youtube.com/@ClipSAT22" class="nsoc nsoc-yt" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.42-4.81ZM10 15V9l5.2 3-5.2 3Z"/></svg></a>
              <a href="https://www.tiktok.com/@clipsat22" class="nsoc nsoc-tk" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.6c-1.3 0-2.5-.4-3.5-1.1v5.9c0 3-2.2 5.2-5.1 5.2A5.1 5.1 0 0 1 6.3 14c0-2.9 2.3-5.1 5.1-5.1.3 0 .6 0 .9.1v2.7a2.4 2.4 0 0 0-.9-.2 2.4 2.4 0 1 0 2.4 2.4V3h1.7Z"/></svg></a>
              <a href="https://www.instagram.com/mohammedamy/" class="nsoc nsoc-ig" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 2c-2.72 0-3.06.01-4.12.06-1.07.05-1.8.22-2.43.46-.66.26-1.22.6-1.77 1.16-.56.55-.9 1.11-1.16 1.77-.24.63-.41 1.36-.46 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.07.22 1.8.46 2.43.26.66.6 1.22 1.16 1.77.55.56 1.11.9 1.77 1.16.63.24 1.36.41 2.43.46C8.94 21.99 9.28 22 12 22s3.06-.01 4.12-.06c1.07-.05 1.8-.22 2.43-.46.66-.26 1.22-.6 1.77-1.16.56-.55.9-1.11 1.16-1.77.24-.63.41-1.36.46-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.07-.22-1.8-.46-2.43a4.9 4.9 0 0 0-1.16-1.77 4.9 4.9 0 0 0-1.77-1.16c-.63-.24-1.36-.41-2.43-.46C15.06 2.01 14.72 2 12 2Zm0 1.8c2.67 0 2.99.01 4.04.06.97.04 1.5.21 1.85.35.47.18.8.4 1.15.74.34.35.56.68.74 1.15.14.35.31.88.35 1.85.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.97-.21 1.5-.35 1.85-.18.47-.4.8-.74 1.15-.35.34-.68.56-1.15.74-.35.14-.88.31-1.85.35-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.97-.04-1.5-.21-1.85-.35a3.1 3.1 0 0 1-1.15-.74 3.1 3.1 0 0 1-.74-1.15c-.14-.35-.31-.88-.35-1.85-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.04-.97.21-1.5.35-1.85.18-.47.4-.8.74-1.15.35-.34.68-.56 1.15-.74.35-.14.88-.31 1.85-.35C9.01 3.81 9.33 3.8 12 3.8Z"/><path fill-rule="evenodd" d="M12 7.13A4.87 4.87 0 1 0 12 16.87 4.87 4.87 0 0 0 12 7.13Zm0 8.03A3.16 3.16 0 1 1 12 8.84a3.16 3.16 0 0 1 0 6.32Z"/><path d="M17.07 5.79a1.14 1.14 0 1 0 0 2.28 1.14 1.14 0 0 0 0-2.28Z"/></svg></a>
              <a href="https://t.me/ClipSAT22" class="nsoc nsoc-tg" target="_blank" rel="noopener" aria-label="Telegram"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
            </div>
          </div>
        </div>
      </nav>
      <button class="menu-btn" id="menuBtn" aria-label="Toggle menu" aria-expanded="false" onclick="(function(btn){var n=document.getElementById('navlinks');var open=n.classList.toggle('open');btn.setAttribute('aria-expanded',open);btn.innerHTML=open?'&#10005; Close':'&#9776; Menu';})(this)">&#9776; Menu</button>
    </div>
  </header>

  <!-- Breadcrumb, formula sidebar, timer, mistake log, goal bars —
       wrapped in a labeled landmark so WCAG's "content must be contained by
       a landmark" rule passes; display:contents keeps every fixed/absolute-
       positioned child's layout exactly as if this wrapper weren't there. -->
  <div role="region" aria-label="Study tools" style="display:contents">
  {# CLS fix: bc-hidden (height:0) used to be the unconditional default,
     removed later by _updateBreadcrumb() (engine.js) once goChapter() ran —
     but every real track page opens a chapter immediately on load (see
     chapter.njk's own ch-active fix), so the breadcrumb was reserving zero
     space for content that, on 21 of 26 pages, was always about to appear.
     Render the correct final visibility straight away instead: hidden only
     on the pages that never call goChapter at all (home + the standalone
     legal/contact pages), matching the exact same page list already used
     above for the Course structured-data block. #cs-breadcrumb's own CSS
     has a fixed height regardless of content, so the text itself still
     safely populates a moment later via JS with no further shift. #}
  <nav id="cs-breadcrumb" class="{% if trackId == 'home' or trackId == 'privacy' or trackId == 'terms' or trackId == 'contact' or trackId == 'cookies' or trackId == 'calculator' or trackId == 'about' or trackId == 'trust' or trackId == 'pricing' %}bc-hidden{% endif %}" aria-label="You are here">
    <span class="bc-course" id="bc-course" onclick="showView(window._csCurrentView||'home')">Home</span>
    <span class="bc-sep" aria-hidden="true">›</span>
    <span class="bc-chapter" id="bc-chapter"></span>
  </nav>
  <aside id="formula-sidebar" aria-label="Formula quick reference">
    <div class="fsb-header">
      <span id="fsb-title">Formulas</span>
      <button type="button" onclick="toggleSidebar()" style="border:none;background:none;cursor:pointer;font-size:1rem;color:var(--muted)" title="Close" aria-label="Close formula sidebar">✕</button>
    </div>
    <div class="fsb-body" id="fsb-body"><p class="fsb-empty">Open a chapter to see its formulas here.</p></div>
  </aside>
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
  <!-- ══ Bilingual Math Glossary Modal ══ -->
  <div id="glossaryOverlay" class="glossary-overlay" role="dialog" aria-modal="true" aria-label="Bilingual Mathematics Glossary" onclick="if(event.target===this)window.closeGlossaryModal&&window.closeGlossaryModal()">
    <div class="glossary-modal">
      <div class="glossary-header">
        <h3 class="glossary-title">📖 <span data-i18n="glossary.title">Bilingual Math Glossary</span> <span style="font-size:0.9rem;font-weight:normal;color:var(--muted)">/ القاموس الرياضي</span></h3>
        <button type="button" class="glossary-close" onclick="window.closeGlossaryModal&&window.closeGlossaryModal()" aria-label="Close">✕</button>
      </div>
      <div class="glossary-search-wrap">
        <input type="search" id="glossarySearchInput" class="glossary-search-input" placeholder="Search term in English or Arabic (e.g., slope, ميل, bearing, integral)..." oninput="window.CSGlossary&&window.CSGlossary.render(this.value)">
        <div class="glossary-filters">
          <button type="button" class="glossary-filter-pill active" data-domain="all" onclick="window.CSGlossary&&window.CSGlossary.filter('all')">All / الكل</button>
          <button type="button" class="glossary-filter-pill" data-domain="algebra" onclick="window.CSGlossary&&window.CSGlossary.filter('algebra')">Algebra / الجبر</button>
          <button type="button" class="glossary-filter-pill" data-domain="geometry" onclick="window.CSGlossary&&window.CSGlossary.filter('geometry')">Geometry / الهندسة</button>
          <button type="button" class="glossary-filter-pill" data-domain="trig" onclick="window.CSGlossary&&window.CSGlossary.filter('trig')">Trigonometry / المثلثات</button>
          <button type="button" class="glossary-filter-pill" data-domain="statistics" onclick="window.CSGlossary&&window.CSGlossary.filter('statistics')">Statistics / الإحصاء</button>
          <button type="button" class="glossary-filter-pill" data-domain="calculus" onclick="window.CSGlossary&&window.CSGlossary.filter('calculus')">Calculus / التفاضل والتكامل</button>
          <button type="button" class="glossary-filter-pill" data-domain="vectors" onclick="window.CSGlossary&&window.CSGlossary.filter('vectors')">Vectors / المتجهات والمصفوفات</button>
          <button type="button" class="glossary-filter-pill" data-domain="conics" onclick="window.CSGlossary&&window.CSGlossary.filter('conics')">Conics / القطوع والأعداد المركبة</button>
          <button type="button" class="glossary-filter-pill" data-domain="combinatorics" onclick="window.CSGlossary&&window.CSGlossary.filter('combinatorics')">Combinatorics / التباديل والتوافيق</button>
        </div>
      </div>
      <div id="glossaryBody" class="glossary-body"></div>
    </div>
  </div>

  <!-- ══ Universal Formula & Reference Sheets Modal ══ -->
  <div id="formulaOverlay" class="formula-overlay" role="dialog" aria-modal="true" aria-label="Official Mathematics Reference Sheets" onclick="if(event.target===this)window.closeFormulaModal&&window.closeFormulaModal()">
    <div class="formula-modal">
      <div class="formula-header">
        <h3 class="formula-title">📐 <span data-i18n="formula.title">Official Reference &amp; Formula Sheets</span> <span style="font-size:0.9rem;font-weight:normal;color:var(--muted)">/ أوراق القوانين والمفاهيم الرسمية</span></h3>
        <button type="button" class="formula-close" onclick="window.closeFormulaModal&&window.closeFormulaModal()" aria-label="Close">✕</button>
      </div>
      <div class="formula-tabs-wrap">
        <div class="formula-tabs" role="tablist">
          <button type="button" role="tab" aria-selected="true" class="formula-tab-pill active" data-curriculum="sat" onclick="window.CSFormula&&window.CSFormula.setTab('sat', this)">🇺🇸 Digital SAT &amp; ACT</button>
          <button type="button" role="tab" aria-selected="false" class="formula-tab-pill" data-curriculum="cambridge" onclick="window.CSFormula&&window.CSFormula.setTab('cambridge', this)">🇬🇧 Cambridge IGCSE 0580</button>
          <button type="button" role="tab" aria-selected="false" class="formula-tab-pill" data-curriculum="addmath" onclick="window.CSFormula&&window.CSFormula.setTab('addmath', this)">🇬🇧 Additional Maths (0606/4PM1)</button>
          <button type="button" role="tab" aria-selected="false" class="formula-tab-pill" data-curriculum="alevel" onclick="window.CSFormula&&window.CSFormula.setTab('alevel', this)">🇬🇧 Cambridge A-Level (MF19) &amp; IB</button>
          <button type="button" role="tab" aria-selected="false" class="formula-tab-pill" data-curriculum="qudrat" onclick="window.CSFormula&&window.CSFormula.setTab('qudrat', this)">🇸🇦 قدرات وتحصيلي (Qudrat &amp; Tahsili)</button>
          <button type="button" role="tab" aria-selected="false" class="formula-tab-pill" data-curriculum="ap" onclick="window.CSFormula&&window.CSFormula.setTab('ap', this)">📊 AP Calculus &amp; Statistics</button>
          <button type="button" role="tab" aria-selected="false" class="formula-tab-pill" data-curriculum="olympiad" onclick="window.CSFormula&&window.CSFormula.setTab('olympiad', this)">🏆 Olympiad &amp; Contest Math</button>
          <button type="button" role="tab" aria-selected="false" class="formula-tab-pill" data-curriculum="univ" onclick="window.CSFormula&&window.CSFormula.setTab('univ', this)">🎓 University Math (LinAlg/MVC/ODEs)</button>
          <button type="button" role="tab" aria-selected="false" class="formula-tab-pill" data-curriculum="mathai" onclick="window.CSFormula&&window.CSFormula.setTab('mathai', this)">🤖 Math for AI &amp; Data Science</button>
        </div>
      </div>
      <div id="formulaBody" class="formula-body"></div>
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
      <div id="progress-trend"></div>
      <div id="progress-list"></div>
    </div>
  </div>
  <div id="exam-countdown-bar"></div>
  <div id="daily-goal-bar"></div>
  <div id="weak-recs"></div>

  <!-- ══ Cloud sync — sign-in modal (logic in public/js/cloud-sync.js) ══ -->
  <div id="cloud-auth-modal" role="dialog" aria-modal="true" aria-label="Sign in" onclick="if(event.target===this)closeCloudAuthModal()">
    <div id="cloud-auth-box">
      <button class="cloud-auth-close" onclick="closeCloudAuthModal()" aria-label="Close">✕</button>
      <h3>☁️ Sync Your Progress</h3>
      <p>Sign in to save your mistake log, flashcard schedule, and streaks across every device — and to use the AI tutor and question generator.</p>
      <!-- Populated by cloud-sync.js's checkBrowserHealth()/renderHealthWarning() —
           storage/cookie/pop-up-blocker issues, or a stalled/recovered sign-in
           attempt — whenever the modal opens or "Sign in with Google" is clicked. -->
      <div id="cloud-auth-health-warning" class="cloud-auth-warn" hidden></div>
      <button class="cloud-auth-google" onclick="window.cloudSignInGoogle&&window.cloudSignInGoogle()">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.87 2.69-6.64z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.94v2.34C2.43 15.98 5.48 18 9 18z"/><path fill="#FBBC05" d="M3.95 10.71a5.4 5.4 0 010-3.42V4.95H.94a9 9 0 000 8.1l3.01-2.34z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.43 2.02.94 4.95l3.01 2.34C4.66 5.16 6.65 3.58 9 3.58z"/></svg>
        Sign in with Google
      </button>
      <p class="cloud-auth-google-note">Also unlocks Google Forms export for generated quizzes.</p>
      <div class="cloud-auth-divider"><span>or use email</span></div>
      <input type="email" id="cloud-auth-email" placeholder="you@example.com" autocomplete="email" onkeydown="if(event.key==='Enter'){event.preventDefault();window.cloudSendCode&&window.cloudSendCode();}">
      <button class="cloud-auth-send" onclick="window.cloudSendCode&&window.cloudSendCode()">Send code</button>
      <div id="cloud-auth-code-step" hidden>
        <!-- No maxlength: Supabase's OTP code length is a per-project auth
             setting (this project's is 8 digits, not the 6 you'd assume by
             default) — a hardcoded maxlength here silently truncated every
             pasted code and made sign-in fail 100% of the time until this
             was caught live. inputmode/pattern still keep it numeric-only. -->
        <input type="text" id="cloud-auth-code" placeholder="Sign-in code" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" onkeydown="if(event.key==='Enter'){event.preventDefault();window.cloudVerifyCode&&window.cloudVerifyCode();}">
        <button class="cloud-auth-send" onclick="window.cloudVerifyCode&&window.cloudVerifyCode()">Verify code</button>
        <button type="button" class="cloud-auth-resend" onclick="window.cloudResetAuthStep&&window.cloudResetAuthStep()">‹ use a different email</button>
      </div>
      <p id="cloud-auth-status" class="cloud-auth-status"></p>
    </div>
  </div>

  <!-- ══ Teacher/parent view (logic in public/js/teacher-view.js) ══ -->
  <div id="teacher-view-modal" role="dialog" aria-modal="true" aria-label="Classes" onclick="if(event.target===this)closeTeacherView()">
    <div id="teacher-view-box">
      <button class="cloud-auth-close" onclick="closeTeacherView()" aria-label="Close">✕</button>
      <h3>🏫 Classes</h3>
      <p>Create a class to get a code you can share with students, or join one with a code your teacher gave you. You can do both.</p>
      <div class="tv-section">
        <h4>Join a class</h4>
        <input type="text" id="tv-join-code" placeholder="Class code, e.g. MATH7F" maxlength="12" style="text-transform:uppercase">
        <input type="text" id="tv-join-name" placeholder="Your name (optional — shown to the teacher)">
        <button class="cloud-auth-send" onclick="window.tvJoinClass&&window.tvJoinClass()">Join class</button>
        <p id="tv-join-status" class="cloud-auth-status"></p>
      </div>
      <div id="tv-my-memberships"></div>
      <div class="tv-section">
        <h4>Create a class</h4>
        <input type="text" id="tv-create-name" placeholder="Class name, e.g. Period 3 Calculus">
        <button class="cloud-auth-send" onclick="window.tvCreateClass&&window.tvCreateClass()">Create class</button>
        <p id="tv-create-status" class="cloud-auth-status"></p>
      </div>
      <div id="tv-my-classes"></div>
    </div>
  </div>

  {% include "partials/google-modals.njk" %}

  <!-- Active Recall Flashcard Backdrop & Drawer -->
  <div id="fc-backdrop" class="fc-backdrop" onclick="if(event.target===this)window.CSGamify&&window.CSGamify.closeFlashcards()" aria-hidden="true"></div>
  <aside id="flashcards-sidebar" class="fc-drawer" role="dialog" aria-modal="true" aria-label="Active Recall Flashcards">
    <div class="fc-drawer-header">
      <div class="fc-header-main">
        <div class="fc-header-title-row">
          <span class="fc-icon" aria-hidden="true">🃏</span>
          <h3 class="fc-title" data-i18n="fc.title">Active Recall Deck</h3>
        </div>
        <div class="fc-track-sub" id="fc-track-subtitle">Math Flashcards</div>
      </div>
      <div class="fc-header-meta">
        <span class="fc-stat-chip fc-chip-due" title="Due for review today">
          <span data-i18n="fc.due">Due</span>: <strong id="fc-due-num">0</strong>
        </span>
        <span class="fc-stat-chip fc-chip-mastered" title="Mastered cards (interval ≥ 6 days)">
          <span data-i18n="fc.mastered">Mastered</span>: <strong id="fc-mastered-num">0</strong>
        </span>
        <button class="fc-close-btn" type="button" onclick="window.CSGamify&&window.CSGamify.closeFlashcards()" aria-label="Close flashcards">✕</button>
      </div>
    </div>

    <!-- Lesson / Scope Selector -->
    <div class="fc-lesson-picker">
      <label for="fc-lesson-select" class="fc-lesson-label">
        <span class="fc-lesson-icon" aria-hidden="true">📖</span>
        <span data-i18n="fc.scopeChapter">Lesson</span>:
      </label>
      <select id="fc-lesson-select" class="fc-lesson-select" onchange="window.CSGamify&&window.CSGamify.onSelectLesson(this.value)" aria-label="Select Lesson">
        <option value="__current__" data-i18n="fc.currentLessonOpt">📍 Current Lesson</option>
        <option value="__all__" data-i18n="fc.allLessonsOpt">🌐 All Lessons</option>
        <option value="__starred__" data-i18n="fc.starredOpt">⭐ Starred Cards Only</option>
      </select>
    </div>

    <!-- Category Filter Pills -->
    <div class="fc-filter-pills" role="group" aria-label="Filter cards by category">
      <button type="button" class="fc-filter-pill active" data-filter="all" onclick="window.CSGamify&&window.CSGamify.setFilterType('all')" title="All cards in scope">
        <span data-i18n="fc.filterAll">All</span>
        <span class="fc-pill-badge" id="fc-badge-all">0</span>
      </button>
      <button type="button" class="fc-filter-pill" data-filter="formula" onclick="window.CSGamify&&window.CSGamify.setFilterType('formula')" title="Key Formulas">
        <span data-i18n="fc.filterFormulas">Formulas</span>
        <span class="fc-pill-badge" id="fc-badge-formula">0</span>
      </button>
      <button type="button" class="fc-filter-pill" data-filter="def" onclick="window.CSGamify&&window.CSGamify.setFilterType('def')" title="Core Definitions">
        <span data-i18n="fc.filterDefs">Definitions</span>
        <span class="fc-pill-badge" id="fc-badge-def">0</span>
      </button>
      <button type="button" class="fc-filter-pill" data-filter="thm" onclick="window.CSGamify&&window.CSGamify.setFilterType('thm')" title="Theorems & Rules">
        <span data-i18n="fc.filterTheorems">Theorems</span>
        <span class="fc-pill-badge" id="fc-badge-thm">0</span>
      </button>
      <button type="button" class="fc-filter-pill" data-filter="example" onclick="window.CSGamify&&window.CSGamify.setFilterType('example')" title="Worked Examples & Practice">
        <span data-i18n="fc.filterExamples">Examples</span>
        <span class="fc-pill-badge" id="fc-badge-example">0</span>
      </button>
      <button type="button" class="fc-filter-pill" data-filter="starred" onclick="window.CSGamify&&window.CSGamify.setFilterType('starred')" title="Starred Cards">
        <span>⭐ <span data-i18n="fc.filterStarred">Starred</span></span>
        <span class="fc-pill-badge" id="fc-badge-starred">0</span>
      </button>
      <button type="button" class="fc-filter-pill" data-filter="custom" onclick="window.CSGamify&&window.CSGamify.setFilterType('custom')" title="Custom user-created cards">
        <span>✍️ <span data-i18n="fc.filterCustom">My Cards</span></span>
        <span class="fc-pill-badge" id="fc-badge-custom">0</span>
      </button>
    </div>

    <!-- Action & Customization Toolbar -->
    <div class="fc-toolbar">
      <div class="fc-tool-actions-main">
        <button type="button" id="fc-reverse-toggle" class="fc-action-btn" onclick="window.CSGamify&&window.CSGamify.toggleReverseMode()" title="Reverse Q&A (R) — Recall concept from answer" aria-label="Reverse Mode">
          <span class="fc-btn-icon" aria-hidden="true">⇄</span>
          <span data-i18n="fc.reverseMode">Reverse</span>
        </button>
        <button type="button" id="fc-add-card-btn" class="fc-action-btn" onclick="window.CSGamify&&window.CSGamify.toggleAddCustomCard()" title="Add Custom Flashcard" aria-label="Add Card">
          <span class="fc-btn-icon" aria-hidden="true">➕</span>
          <span data-i18n="fc.addCardBtn">Add Card</span>
        </button>
        <button type="button" id="fc-text-size-btn" class="fc-action-btn" onclick="window.CSGamify&&window.CSGamify.toggleTextSize()" title="Toggle Larger Math / Text" aria-label="Text Size">
          <span class="fc-btn-icon" aria-hidden="true">A±</span>
        </button>
      </div>
      <div class="fc-tool-actions-secondary">
        <button type="button" id="fc-mode-toggle" class="fc-pill-btn" onclick="window.CSGamify&&window.CSGamify.togglePracticeMode()" title="Toggle Practice All / Due Mode">
          <span id="fc-mode-label" data-i18n="fc.modeDue">Due Only</span>
        </button>
        <button type="button" id="fc-shuffle-btn" class="fc-icon-btn" onclick="window.CSGamify&&window.CSGamify.shuffleDeck()" title="Shuffle Deck" aria-label="Shuffle Deck">🔀</button>
        <button type="button" id="fc-reset-btn" class="fc-icon-btn" onclick="window.CSGamify&&window.CSGamify.resetSRS()" title="Reset schedule for this track" aria-label="Reset schedule">↺</button>
      </div>
    </div>

    <!-- Inline Custom Card Form -->
    <div id="fc-custom-form" class="fc-custom-form" role="form" aria-label="Create Custom Card">
      <div class="fc-custom-form-inner">
        <div class="fc-custom-header">
          <strong data-i18n="fc.addCardTitle">Create Custom Flashcard</strong>
          <button type="button" class="fc-custom-close" onclick="window.CSGamify&&window.CSGamify.toggleAddCustomCard()" aria-label="Cancel">✕</button>
        </div>
        <div class="fc-custom-field">
          <label for="fc-custom-tag" data-i18n="fc.tagSelect">Category:</label>
          <select id="fc-custom-tag" class="fc-custom-select">
            <option value="Formula" data-i18n="fc.tagFormula">Formula</option>
            <option value="Definition" data-i18n="fc.tagDef">Definition</option>
            <option value="Theorem" data-i18n="fc.tagThm">Theorem / Rule</option>
            <option value="Custom" data-i18n="fc.tagCustom">Custom Note</option>
          </select>
        </div>
        <div class="fc-custom-field">
          <textarea id="fc-custom-front" class="fc-custom-textarea" rows="2" placeholder="Front: Question or concept..." data-i18n="[placeholder]fc.frontPlaceholder"></textarea>
        </div>
        <div class="fc-custom-field">
          <textarea id="fc-custom-back" class="fc-custom-textarea" rows="3" placeholder="Back: Formula, answer, or explanation..." data-i18n="[placeholder]fc.backPlaceholder"></textarea>
        </div>
        <div class="fc-custom-actions">
          <button type="button" class="fc-btn-primary fc-btn-sm" onclick="window.CSGamify&&window.CSGamify.saveCustomCard()" data-i18n="fc.saveBtn">Save Card</button>
          <button type="button" class="fc-btn-secondary fc-btn-sm" onclick="window.CSGamify&&window.CSGamify.toggleAddCustomCard()" data-i18n="fc.cancelBtn">Cancel</button>
        </div>
      </div>
    </div>

    <div class="fc-progress-wrap">
      <div class="fc-progress-meta">
        <span id="fc-card-idx" class="fc-card-idx">Card 1 of 1</span>
        <div class="fc-nav-arrows">
          <button type="button" id="fc-prev-btn" class="fc-arrow-btn" onclick="window.CSGamify&&window.CSGamify.prevCard()" title="Previous (P or ↑)" aria-label="Previous card">‹</button>
          <button type="button" id="fc-next-btn" class="fc-arrow-btn" onclick="window.CSGamify&&window.CSGamify.nextCard()" title="Next (N or ↓)" aria-label="Next card">›</button>
        </div>
      </div>
      <div class="fc-progress-track">
        <div id="fc-progress-fill" class="fc-progress-fill" style="width: 0%"></div>
      </div>
    </div>

    <div class="fc-body">
      <!-- Active Card Stage -->
      <div class="fc-stage">
        <div class="flashcard-inner" onclick="window.CSGamify&&window.CSGamify.flipCard()">
          <div class="flashcard-card" id="active-flashcard" aria-label="Active flashcard">
            <div class="fc-face front">
              <div class="fc-face-top">
                <div class="fc-face-top-left">
                  <span class="fc-card-tag" id="fc-card-tag">FORMULA</span>
                  <span class="fc-card-ch" id="fc-card-ch"></span>
                </div>
                <div class="fc-face-top-right">
                  <button type="button" id="fc-star-btn" class="fc-card-star-btn" onclick="event.stopPropagation();window.CSGamify&&window.CSGamify.toggleStarCurrent()" title="Star card (S)" aria-label="Star card">☆</button>
                </div>
              </div>
              <div class="fc-face-center">
                <div class="fc-card-text" id="fc-front-text">Loading flashcard...</div>
              </div>
              <div class="fc-face-bottom">
                <span class="fc-flip-hint">💡 <span data-i18n="fc.flipHint">Click or press Space to reveal</span></span>
              </div>
            </div>
            <div class="fc-face back">
              <div class="fc-face-top">
                <div class="fc-face-top-left">
                  <span class="fc-card-tag answer" id="fc-back-tag" data-i18n="fc.answerTag">ANSWER</span>
                </div>
                <div class="fc-face-top-right">
                  <button type="button" id="fc-delete-btn" class="fc-card-del-btn" style="display: none;" onclick="event.stopPropagation();window.CSGamify&&window.CSGamify.deleteCurrentCustomCard()" title="Delete custom card" aria-label="Delete card">🗑️</button>
                  <button type="button" id="fc-star-btn-back" class="fc-card-star-btn" onclick="event.stopPropagation();window.CSGamify&&window.CSGamify.toggleStarCurrent()" title="Star card (S)" aria-label="Star card">☆</button>
                </div>
              </div>
              <div class="fc-face-center">
                <div class="fc-card-text" id="fc-back-text"></div>
              </div>
              <div class="fc-face-bottom">
                <span class="fc-flip-hint">↺ <span data-i18n="fc.flipBackHint">Click or press Space to flip back</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rating Controls -->
      <div class="fc-controls-wrap">
        <button type="button" id="fc-btn-review" class="fc-rate-btn fc-btn-review" onclick="window.CSGamify&&window.CSGamify.recordSRS(false)">
          <span class="fc-rate-main"><span data-i18n="fc.review">Still Learning</span> (1d)</span>
          <span class="fc-rate-sub">Press 1 or ←</span>
        </button>
        <button type="button" id="fc-btn-master" class="fc-rate-btn fc-btn-master" onclick="window.CSGamify&&window.CSGamify.recordSRS(true)">
          <span class="fc-rate-main"><span data-i18n="fc.master">Mastered</span> (<span id="fc-master-interval">3d+</span>)</span>
          <span class="fc-rate-sub">Press 2 or → · +15 XP</span>
        </button>
      </div>

      <!-- All Caught Up / Empty Deck View -->
      <div id="fc-done-view" class="fc-done-view" style="display: none;">
        <div class="fc-done-icon">🎉</div>
        <h4 class="fc-done-title" data-i18n="fc.allCaughtUp">All caught up!</h4>
        <p class="fc-done-desc" data-i18n="fc.doneDesc">You have reviewed all scheduled cards for this lesson.</p>
        <div class="fc-done-actions">
          <button type="button" class="fc-btn-primary" onclick="window.CSGamify&&window.CSGamify.startPracticeAll()" data-i18n="fc.practiceAll">Study All Cards Anyway</button>
          <button type="button" class="fc-btn-secondary" onclick="window.CSGamify&&window.CSGamify.resetSRS()" data-i18n="fc.resetDeck">Reset Schedule</button>
        </div>
      </div>
    </div>

    <!-- Shortcuts Footer -->
    <div class="fc-footer">
      <div class="fc-keyboard-hints" aria-hidden="true">
        <span><kbd>Space</kbd> Flip</span>
        <span><kbd>1</kbd> Review</span>
        <span><kbd>2</kbd> Master</span>
        <span><kbd>S</kbd> Star</span>
        <span><kbd>R</kbd> Reverse</span>
        <span><kbd>Esc</kbd> Close</span>
      </div>
    </div>
  </aside>

  <!-- Flashcards Side Slide Launcher Tab (matches Formula Sidebar Toggle) -->
  <button id="fc-toggle-btn" class="fc-side-trigger" type="button" onclick="window.CSGamify&&window.CSGamify.toggleFlashcards()" aria-label="Open Flashcards" title="Active recall flashcards">
    <span class="fc-trigger-text" data-i18n="fc.btnText">CARDS</span>
    <span id="fc-due-badge" class="fc-due-badge empty" title="Cards due for review">0</span>
    <span id="fc-due-count" style="display:none">0</span>
  </button>
  </div><!-- /role="region" aria-label="Study tools" -->

  <!-- Page content — each of the 21 subject tracks' src/{slug}/index.njk
       renders its own content/{track}/*.json via the chapter/rail partials;
       the homepage includes tracks/home.html directly (see Step 3 above). -->
  {{ content | safe }}

  <!-- ============================== FOOTER ==============================
       Hand-maintained directly here, same situation as the header above —
       one copy, not two. ====== -->
  <footer class="site">
    <div class="wrap foot-grid">
      <div>
        <div class="brand">
          <img class="site-logo-img" src="${BASE_PATH}/clipsat-mark-header.png" alt="ClipSAT Logo" width="128" height="144">
          <span class="name">ClipSAT</span>
        </div>
        <p data-i18n="foot.tagline">Comprehensive, exam-aligned mathematics for Saudi national exams (Qudrat, Tahsili) and international tracks (AP, Cambridge, IB, SAT, ACT) — taught by Mr. Mohamed Abdallah.</p>
      </div>
      <div style="font-family:var(--sans); font-size:.86rem; color:var(--muted)">
        <div style="font-weight:650; color:var(--ink); margin-bottom:8px" data-i18n="foot.explore">Explore</div>
        <a href="${BASE_PATH}/calculus/">Calculus</a> ·
        <a href="${BASE_PATH}/precalc/">Precalculus</a> ·
        <a href="${BASE_PATH}/algebra/">Algebra</a> ·
        <a href="${BASE_PATH}/alg2/">Algebra 2</a> ·
        <a href="${BASE_PATH}/geo/">Geometry</a> ·
        <a href="${BASE_PATH}/linalg/">Linear Algebra</a> ·
        <a href="${BASE_PATH}/mvc/">Multivariable Calculus</a> ·
        <a href="${BASE_PATH}/odes/">Differential Equations</a> ·
        <a href="${BASE_PATH}/mathai/">Math for AI &amp; Data Science</a> ·
        <a href="${BASE_PATH}/qudrat/">GAT Qudrat</a> ·
        <a href="${BASE_PATH}/gaten/">GAT English</a> ·
        <a href="${BASE_PATH}/tahsili/">SAAT Tahsili</a> ·
        <a href="${BASE_PATH}/sat/">Digital SAT</a> ·
        <a href="${BASE_PATH}/act/">ACT Math</a> ·
        <a href="${BASE_PATH}/act2/">ACT II Level 1</a> ·
        <a href="${BASE_PATH}/act2l2/">ACT II Level 2</a> ·
        <a href="${BASE_PATH}/est/">EST I</a> ·
        <a href="${BASE_PATH}/est2/">EST II Level 1</a> ·
        <a href="${BASE_PATH}/est2l2/">EST II Level 2</a> ·
        <a href="${BASE_PATH}/aslevel/">AS Level</a> ·
        <a href="${BASE_PATH}/a2level/">A2 Level</a> ·
        <a href="${BASE_PATH}/igcse/">IGCSE 0580</a> ·
        <a href="${BASE_PATH}/edexcel/">Edexcel 4MA1</a> ·
        <a href="${BASE_PATH}/addmath/">Add Math 0606</a> ·
        <a href="${BASE_PATH}/ibsl/">IB Math AA SL</a> ·
        <a href="${BASE_PATH}/ibhl/">IB Math AA HL</a> ·
        <a href="${BASE_PATH}/apab/">AP Calculus AB</a> ·
        <a href="${BASE_PATH}/apbc/">AP Calculus BC</a> ·
        <a href="${BASE_PATH}/appc/">AP Precalculus</a> ·
        <a href="${BASE_PATH}/apstats/">AP Statistics</a> ·
        <a href="${BASE_PATH}/olympiad/">Olympiad Math</a> ·
        <a href="${BASE_PATH}/" data-i18n="foot.all-courses">All courses</a> ·
        <a href="https://wa.me/966597688647" target="_blank" rel="noopener">WhatsApp</a> ·
        <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">Telegram</a> ·
        <a href="mailto:admin@clipsat.org?subject=ClipSAT%20feedback" class="foot-report" data-i18n="foot.report">🐛 Report an error or suggestion</a> ·
        <a href="https://paypal.me/mohammedamy" target="_blank" rel="noopener" class="foot-paypal">☕ Support via PayPal</a>
      </div>
      <div style="font-family:var(--sans); font-size:.86rem; color:var(--muted)">
        <div style="font-weight:650; color:var(--ink); margin-bottom:8px" data-i18n="foot.legal">About &amp; Legal</div>
        <a href="${BASE_PATH}/about/" data-i18n="foot.about">About</a> ·
        <a href="${BASE_PATH}/trust/" data-i18n="foot.trust">Trust &amp; Safety</a> ·
        <a href="${BASE_PATH}/contact/" data-i18n="foot.contact">Contact</a> ·
        <a href="${BASE_PATH}/pricing/" data-i18n="foot.pricing">Plans &amp; Pricing</a> ·
        <a href="${BASE_PATH}/privacy/" data-i18n="foot.privacy">Privacy Policy</a> ·
        <a href="${BASE_PATH}/terms/" data-i18n="foot.terms">Terms of Service</a> ·
        <a href="${BASE_PATH}/cookies/" data-i18n="foot.cookies">Cookie Policy</a> ·
        <button type="button" class="foot-cookie-btn" onclick="window.openCookieConsent&amp;&amp;window.openCookieConsent()" data-i18n="foot.cookieSettings">Cookie Settings</button> ·
        <a href="${BASE_PATH}/rigor-standard.html" data-i18n="foot.rigor">Rigor Standard</a> ·
        <a href="${BASE_PATH}/free-tier-promise.html" data-i18n="foot.free-tier">Free-Tier Promise</a>
      </div>
    </div>
    <div class="wrap"><p class="foot-note">© <span id="yr">2026</span> ClipSAT · Mr. Mohamed Abdallah. Equations rendered with MathJax · figures drawn live on HTML canvas.</p></div>
  </footer>

  <!-- Cookie Consent Banner -->
  <div id="cookieConsentBanner" class="cookie-consent-bar" role="region" aria-label="Cookie and Privacy Consent" style="display:none">
    <div class="wrap cookie-consent-inner">
      <div class="cookie-consent-text">
        <span class="cookie-consent-icon" aria-hidden="true">🍪</span>
        <span data-i18n-html="cookie.banner.text">We use essential browser storage for your math progress and settings. With your consent, we also load cookies for advertising and analytics to support free access to ClipSAT.</span>
        <a href="${BASE_PATH}/privacy/" class="cookie-consent-link" data-i18n="cookie.banner.privacyLink">Privacy Policy</a>
      </div>
      <div class="cookie-consent-actions">
        <button type="button" id="cookieAcceptAll" class="cookie-consent-btn cookie-consent-accept" onclick="window.setCookieConsent('accepted')" data-i18n="cookie.banner.accept">Accept All</button>
        <button type="button" id="cookieEssentialOnly" class="cookie-consent-btn cookie-consent-reject" onclick="window.setCookieConsent('essential')" data-i18n="cookie.banner.essential">Essential Only</button>
      </div>
    </div>
  </div>

  <!-- ===== LEGAL (PRIVACY / TERMS) MODALS ===== -->
  <div id="legal-overlay" class="legal-overlay" role="dialog" aria-modal="true" aria-label="Legal" onclick="if(event.target===this)closeLegal()">
    <div class="legal-box">
      <button class="legal-close" onclick="closeLegal()" aria-label="Close">✕</button>
      <div id="legal-privacy" style="display:none">
        {% include "legal/privacy-content.html" %}
        <p><a href="${BASE_PATH}/privacy/">Open as a standalone page →</a></p>
      </div>
      <div id="legal-terms" style="display:none">
        {% include "legal/terms-content.html" %}
        <p><a href="${BASE_PATH}/terms/">Open as a standalone page →</a></p>
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
    <div id="cbt-palette-modal" class="cbt-palette-overlay" onclick="if(event.target===this)window.closeCBTPalette&&window.closeCBTPalette()"></div>
  </div>

  <!-- ============================== MATH HELPER CHAT (CLIPSAT AI TUTOR) ============================== -->
  <button id="chatFab" class="chat-fab teacher-head-fab" aria-label="Open ClipSAT AI Tutor chat (Drag to move)" title="ClipSAT AI Tutor (Drag to reposition)">
    <div class="chat-fab-avatar-ring">
      <img src="/teacher-avatar.jpg" alt="ClipSAT AI Tutor" class="chat-fab-avatar" width="56" height="56" draggable="false" loading="lazy">
      <span class="chat-fab-status-dot" aria-hidden="true" title="Online AI tutor"></span>
      <span class="chat-fab-badge" aria-hidden="true">AI</span>
    </div>
    <span class="chat-fab-tooltip" aria-hidden="true">ClipSAT AI Tutor</span>
  </button>

  <div id="chatPanel" class="chat-panel" role="dialog" aria-label="ClipSAT AI Tutor chat" aria-hidden="true">
    <div class="chat-head" style="flex-direction:column; align-items:stretch; gap:0">
      <div style="display:flex; align-items:center; justify-content:space-between">
        <div class="chat-title">
          <img src="/teacher-avatar.jpg" alt="" class="chat-head-avatar" width="34" height="34" aria-hidden="true">
          <span>ClipSAT AI Tutor<span class="chat-sub">AI math assistant</span></span>
        </div>
        <button id="chatClose" class="chat-close" aria-label="Close chat">&times;</button>
      </div>

    </div>
    <div id="chatBody" class="chat-body"></div>
    <div id="chatCamOverlay" class="chat-cam-overlay" aria-hidden="true" style="display:none">
      <div class="chat-cam-head">
        <span>📷 Point camera at 1 math question</span>
        <button type="button" id="chatCamClose" class="chat-cam-close" aria-label="Close camera">&times;</button>
      </div>
      <div class="chat-cam-viewport">
        <video id="chatCamVideo" autoplay playsinline muted></video>
      </div>
      <div class="chat-cam-actions">
        <button type="button" id="chatCamFlip" class="chat-cam-btn secondary" title="Switch front/back camera">🔄 Flip</button>
        <button type="button" id="chatCamSnap" class="chat-cam-btn primary">📸 Capture Question</button>
      </div>
    </div>
    <div id="chatAttachBar" class="chat-attach-bar" style="display:none" aria-live="polite">
      <img id="chatAttachThumb" class="chat-attach-thumb" alt="Attached question preview" style="display:none">
      <span id="chatAttachIcon" class="chat-attach-icon" aria-hidden="true">📄</span>
      <div id="chatAttachName" class="chat-attach-name"></div>
      <div class="chat-attach-meta" style="display:none"><div id="chatAttachSub" class="chat-attach-sub"></div></div>
      <button type="button" id="chatAttachRemove" class="chat-attach-remove" aria-label="Remove attachment" title="Remove attachment">&times;</button>
    </div>
    <div class="chat-input">
      <input type="file" id="chatFileInput" accept=".png,.jpg,.jpeg,.webp,.pdf,.docx,image/png,image/jpeg,image/webp,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display:none" aria-hidden="true">
      <input type="file" id="chatCamFallbackInput" accept="image/*" capture="environment" style="display:none" aria-hidden="true">
      <button type="button" id="chatAttachBtn" class="chat-tool-btn" aria-label="Upload image, PDF, or DOCX math question" title="Attach image, PDF, or DOCX">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      </button>
      <button type="button" id="chatCamBtn" class="chat-tool-btn" aria-label="Take a photo of a math question with camera" title="Take photo with camera">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
      </button>
      <textarea id="chatInput" rows="1" placeholder="Ask about a math problem…" aria-label="Type your math question"></textarea>
      <button id="chatSend" class="chat-send" aria-label="Send message">&rarr;</button>
    </div>
    <div class="chat-foot" style="line-height:1.4">AI-generated; may contain errors; not a substitute for teacher guidance. Free with ClipSAT Account.</div>
  </div>

  <!-- Cloud sync (optional accounts on top of the existing localStorage progress
       system — see SUPABASE_SETUP.md). cloud-config.js is a public, safe-to-commit
       project URL + anon key; cloud-sync.js no-ops entirely until it's filled in. -->
  <script src="${BASE_PATH}/js/cloud-config.js"></script>
  <script defer src="${BASE_PATH}/js/cloud-sync.js"></script>
  <!-- Teacher/parent view (Pillar 3 MVP) — reads the shared client cloud-sync.js
       exposes via window.ClipSATCloud.getClient(); no-ops until signed in. -->
  <script defer src="${BASE_PATH}/js/teacher-view.js"></script>
  <!-- Error logging (Plan 5, Phase 5.010) — reports uncaught JS errors via
       the same shared client; no-ops entirely if cloud sync isn't configured. -->
  <script defer src="${BASE_PATH}/js/error-logging.js"></script>
  <!-- Site-wide visit counter (home page's "Growing every day" section) —
       runs on every page via the same client, but only ever writes to
       #clipsat-visit-count, which only the home page has. -->
  <script defer src="${BASE_PATH}/js/visit-counter.js"></script>
  <!-- Cookieless, privacy-first analytics (Saudi PDPL / GDPR compliant) -->
  <script defer src="${BASE_PATH}/js/analytics.js"></script>

  <!-- Google Forms integration (Forms creation + shareable link — no
       Classroom auto-posting; see quiz-capture-ui.js's file header for why).
       google-config.js is a public, safe-to-commit OAuth Client ID; every
       module below no-ops entirely until it's filled in (the feature flag —
       see google-config.js). -->
  <script src="${BASE_PATH}/js/google-config.js"></script>
  <script defer src="${BASE_PATH}/js/google-integration.js"></script>
  <script defer src="${BASE_PATH}/js/math-image.js"></script>
  <script defer src="${BASE_PATH}/js/forms-api.js"></script>
  <script defer src="${BASE_PATH}/js/quiz-capture-ui.js"></script>

  <!-- Engine JS (src/scripts/engine.js — the site's core application logic) -->
  <script src="${BASE_PATH}/js/engine.js"></script>
  <script src="${BASE_PATH}/js/study-hub-extras.js"></script>
  <!-- Interactive activities, universal graph explorers, and per-track canvas explorers (ADR 0039):
       loaded only where they are used, right after engine.js so they register before init() runs.
       The dev content preview renders every track, so it loads them all. -->
  {% if trackId == 'dev-content-preview' %}<script src="${BASE_PATH}/js/ix-engine.js"></script><script src="${BASE_PATH}/js/universal-graph-explorers.js"></script>{% for t in explorerTracks %}<script src="${BASE_PATH}/js/ex/{{ t }}.js"></script>{% endfor %}{% elif trackId in explorerTracks %}{% if trackId != 'home' %}<script src="${BASE_PATH}/js/ix-engine.js"></script><script src="${BASE_PATH}/js/universal-graph-explorers.js"></script>{% endif %}<script src="${BASE_PATH}/js/ex/{{ trackId }}.js"></script>{% endif %}

  <!-- Post-engine shim: override showView() for multi-page navigation.
       ROOT CAUSE FIX (two layers):
       1. engine.js's init() now reads window.CLIPSAT_TRACK when no hash is present,
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
      est:'est',est2:'est2',est2l2:'est2l2',act2:'act2',act2l2:'act2l2',precalc:'precalc',
      appc:'appc',apstats:'apstats',ibsl:'ibsl',ibhl:'ibhl',linalg:'linalg',mvc:'mvc',odes:'odes',
      addmath:'addmath',mathai:'mathai',edexcel:'edexcel',gaten:'gaten',olympiad:'olympiad',home:''
    };
    var CURRENT = window.CLIPSAT_TRACK || 'home';

    // Belt-and-suspenders guard: stay false during DOMContentLoaded, true after.
    window._clipsatNavReady = false;
    setTimeout(function(){ window._clipsatNavReady = true; }, 0);

    // Override showView so card clicks navigate to the right page, while
    // preserving the in-page showView chain when activating CURRENT.
    var _origShowView = window.showView;
    window.showView = function(name){
      if(name === CURRENT){
        if(_origShowView) _origShowView(name);
        return;
      }
      if(!window._clipsatNavReady) return; // suppress any residual DOMContentLoaded calls
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

    // Mobile: the header copy of #navSelect is hidden below 420px (no room),
    // and the hamburger panel (#navlinks) never had a subject switcher of
    // its own — clone the (already-synced) select into it so switching
    // tracks is always reachable on a phone, not just on wider screens.
    var navlinksEl = document.getElementById('navlinks');
    if(sel && navlinksEl && !navlinksEl.querySelector('.nav-select-mobile')){
      var mobileSel = sel.cloneNode(true);
      mobileSel.removeAttribute('id');
      mobileSel.classList.add('nav-select-mobile');
      navlinksEl.insertBefore(mobileSel, navlinksEl.firstChild);
    }

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

// ─── 5. Write redirect stubs for old hash URLs ────────────────────────────────
console.log('\n── Step 5: Write old-URL redirects ─────────────────');
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

console.log('\n── Step 6: Copy worksheet topic JSON for Google Forms ──');
// tools/worksheet_gen/topics/{track}/{num}-{slug}[-ar].json are the real,
// hand-authored MCQ/FRQ sources the PDF worksheet generator reads (see
// tools/worksheet_gen/generate.py) — not something the browser ever loads.
// The Google Forms integration's worksheet fast-follow (public/js/
// quiz-capture-ui.js's ClipSATWorksheetForm) needs a predictable client-side
// URL, but the on-disk slug in the filename doesn't always match the slug
// baked into the shipped PDF's manifest.json (a few tracks' slugs drifted
// independently — e.g. a2level's "…-modulus-and-inverse.json" vs. the PDF's
// "…-modulus-inverse-worksheet.pdf"), so deriving a filename from either
// side isn't reliable. Instead, republish each file under a canonical
// {num}.json / {num}-ar.json name (both fields already live inside every
// topic JSON — see generate.py's schema docstring) that the manifest's own
// `num`/`lang` fields can always address directly, with zero string-matching
// on the human-authored title/slug text. No collisions are possible: no
// track has two topic files sharing the same (num, lang) pair.
const TOPICS_DIR = path.join(ROOT, 'tools', 'worksheet_gen', 'topics');
const WORKSHEET_DATA_DIR = path.join(ROOT, 'public', 'worksheet-data');
let wsCount = 0;
if (fs.existsSync(TOPICS_DIR)) {
  fs.readdirSync(TOPICS_DIR, { withFileTypes: true }).forEach((trackEnt) => {
    if (!trackEnt.isDirectory()) return;
    const track = trackEnt.name;
    const trackDir = path.join(TOPICS_DIR, track);
    fs.readdirSync(trackDir).forEach((fn) => {
      if (!fn.endsWith('.json')) return;
      const data = JSON.parse(fs.readFileSync(path.join(trackDir, fn), 'utf8'));
      if (!data.num) return;
      const outName = data.num + (data.lang === 'ar' ? '-ar' : '') + '.json';
      mkdirp(path.join(WORKSHEET_DATA_DIR, track));
      fs.writeFileSync(path.join(WORKSHEET_DATA_DIR, track, outName), JSON.stringify(data), 'utf8');
      wsCount++;
    });
  });
}
console.log(`  ✓  public/worksheet-data/  (${wsCount} topic files)`);

console.log('\n── Step 7: Generate per-topic question bank shards ──');
const BANK_DATA_DIR = path.join(ROOT, 'bank-data');
const BANK_SHARDS_DIR = path.join(ROOT, 'public', 'bank-shards');
const CONTENT_DIR = path.join(ROOT, 'content');
let shardCount = 0;
if (fs.existsSync(BANK_DATA_DIR)) {
  fs.readdirSync(BANK_DATA_DIR).forEach((fn) => {
    if (!fn.endsWith('.json') || fn.startsWith('_')) return;
    const track = fn.replace(/\.json$/, '');
    const raw = JSON.parse(fs.readFileSync(path.join(BANK_DATA_DIR, fn), 'utf8'));
    const pool = Array.isArray(raw)
      ? raw
      : (raw.pool || [].concat(raw.easy || [], raw.medium || [], raw.hard || []));
    if (!pool.length) return;
    const byTopic = {};
    pool.forEach((q) => {
      const tid = String(q.topic_id || 'general').replace(/[^a-zA-Z0-9_-]/g, '');
      if (!byTopic[tid]) byTopic[tid] = [];
      byTopic[tid].push(q);
    });
    // Ensure every curriculum chapter in content/<track>/*.json has a populated shard
    const trackContentDir = path.join(CONTENT_DIR, track);
    if (fs.existsSync(trackContentDir)) {
      fs.readdirSync(trackContentDir).forEach((chFile) => {
        if (!chFile.endsWith('.json') || chFile.startsWith('_')) return;
        const ch = JSON.parse(fs.readFileSync(path.join(trackContentDir, chFile), 'utf8'));
        const cid = String(ch.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
        if (!cid) return;
        if (!byTopic[cid] || !byTopic[cid].length) {
          const domains = (ch.quizWidget && Array.isArray(ch.quizWidget.domains)) ? ch.quizWidget.domains : [];
          let matched = domains.length
            ? pool.filter((q) => q.domain && domains.includes(q.domain))
            : [];
          if (!matched.length) matched = pool.slice(0, 60);
          byTopic[cid] = matched.slice(0, 180);
        }
      });
    }
    const trackShardDir = path.join(BANK_SHARDS_DIR, track);
    mkdirp(trackShardDir);
    const topicSummary = {};
    Object.keys(byTopic).forEach((tid) => {
      const items = byTopic[tid];
      topicSummary[tid] = items.length;
      fs.writeFileSync(
        path.join(trackShardDir, `${tid}.json`),
        JSON.stringify({ track, topic_id: tid, count: items.length, pool: items }),
        'utf8'
      );
      shardCount++;
    });
    fs.writeFileSync(
      path.join(trackShardDir, '_index.json'),
      JSON.stringify({ track, total: pool.length, topics: topicSummary }),
      'utf8'
    );
  });
}
console.log(`  ✓  public/bank-shards/  (${shardCount} topic shards across 31 tracks)`);

// ─── Done ─────────────────────────────────────────────────────────────────────
console.log('\n✅  Build complete!\n');
console.log('Next steps:');
console.log('  npm install');
console.log('  npm run build   (runs build.js then Eleventy)');
console.log('  npm start       (Eleventy dev server at localhost:8080)\n');
