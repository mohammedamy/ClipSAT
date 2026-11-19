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

const fs = require('fs');
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
const ROOT = __dirname;
const PUBLIC_CSS = path.join(ROOT, 'public', 'css', 'main.css');
const PUBLIC_JS = path.join(ROOT, 'public', 'js', 'engine.js');
const SRC_DIR = path.join(ROOT, 'src');
const INCLUDES_DIR = path.join(SRC_DIR, '_includes');

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

// Clean _site/ before rebuild so stale pre-offload binaries or old paginated routes never accumulate
const SITE_OUT_DIR = path.join(ROOT, '_site');
if (fs.existsSync(SITE_OUT_DIR)) {
  fs.rmSync(SITE_OUT_DIR, { recursive: true, force: true });
}

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
const SOURCEMAP_DIR = path.join(ROOT, 'artifacts', 'sourcemaps');
mkdirp(SOURCEMAP_DIR);
const MINIFY_OPTS = { compress: { toplevel: false }, mangle: { toplevel: false } };
let ixInjected = false;
const engineSources = {};
const engineModuleOffsets = [];
let runningLine = 1;
const enginePieces = moduleManifest.map((name, idx) => {
  let piece = fs.readFileSync(path.join(MODULES_DIR, name), 'utf8');
  if (idx === 0) piece = piece.replace(/^\s+/, '');
  if (idx === moduleManifest.length - 1) piece = piece.replace(/\s+$/, '');
  if (piece.includes(IX_PLACEHOLDER)) {
    piece = piece.replace(IX_PLACEHOLDER, () => { ixInjected = true; return JSON.stringify(ixTracks); });
  }
  engineSources[name] = piece;
  const newlineCount = (piece.match(/\n/g) || []).length;
  engineModuleOffsets.push({
    module: `src/scripts/modules/${name}`,
    startLine: runningLine,
    endLine: runningLine + newlineCount,
  });
  runningLine += newlineCount;
  return piece;
});
const engineJs = enginePieces.join('');
fs.writeFileSync(path.join(SOURCEMAP_DIR, 'engine.js.modules.json'), JSON.stringify(engineModuleOffsets, null, 2), 'utf8');
console.log(`  ${moduleManifest.length} modules concatenated`);
const jsMinified = UglifyJS.minify(
  { 'engine.bundle.js': engineJs },
  Object.assign({}, MINIFY_OPTS, { sourceMap: { filename: 'engine.js' } })
);

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
  const srcList = sources || [source];
  const defOffsets = [];
  let defLine = 1;
  const defPieces = srcList.map((f) => {
    let part = fs.readFileSync(path.join(MODULES_DIR, f), 'utf8').trim();
    if (part.includes(IX_PLACEHOLDER)) {
      part = part.replace(IX_PLACEHOLDER, () => { ixInjected = true; return JSON.stringify(ixTracks); });
    }
    const lines = (part.match(/\n/g) || []).length + 1;
    defOffsets.push({
      module: `src/scripts/modules/${f}`,
      startLine: defLine,
      endLine: defLine + lines - 1,
    });
    defLine += lines;
    return part;
  });
  let src = defPieces.join('\n');
  fs.writeFileSync(path.join(SOURCEMAP_DIR, `${output}.modules.json`), JSON.stringify(defOffsets, null, 2), 'utf8');
  source = srcList.join(' + ');
  const minified = UglifyJS.minify(
    { [output]: src },
    Object.assign({}, MINIFY_OPTS, { sourceMap: { filename: output } })
  );
  const outPath = path.join(ROOT, 'public', 'js', output);
  if (minified.error) {
    console.error(`  ⚠  ${source} minification failed, shipping unminified:`, minified.error.message);
    write(outPath, src);
  } else {
    console.log(`  Minified JS: ${src.length} → ${minified.code.length} bytes (${source} → ${output})`);
    write(outPath, minified.code);
    if (minified.map) {
      fs.writeFileSync(path.join(SOURCEMAP_DIR, `${output}.map`), minified.map, 'utf8');
    }
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
    if (node.kind === 'callout' && node.label) {
      if (node.label.en) push(node.label.en);
      if (node.label.ar) push(node.label.ar);
    }
    if (node.kind === 'cards' && Array.isArray(node.items)) {
      node.items.forEach((it) => {
        if (it.label && it.label.en) push(it.label.en);
        if (it.label && it.label.ar) push(it.label.ar);
      });
    }
    if (node.kind === 'text' && typeof node.heading === 'string') push(node.heading);
    Object.keys(node).forEach((k) => walk(node[k]));
  }(chapter.content));
  return out.slice(0, 18); // cap bilingual payload per chapter
}

const UTILITY_CHAPTERS = [
  { re: /practiceSetId\s*=\s*'([^']+)'/, title: 'Practice set', titleAr: 'مجموعة تدريبية', suffix: 'practice/' },
  { re: /testGeneratorId\s*=\s*'([^']+)'/, title: 'Test generator', titleAr: 'مولّد الاختبارات', suffix: '#testgen' },
  { re: /downloadsId\s*=\s*'([^']+)'/, title: 'Downloads', titleAr: 'التنزيلات', suffix: '#downloads' },
];

const searchIndex = [];
let keywordCount = 0;
Object.keys(migratedContent).sort().forEach((view) => {
  const mc = migratedContent[view];
  mc.chapters.forEach((ch) => {
    const title = decodeEntities((ch.title && ch.title.en) || ch.id);
    const titleAr = (ch.title && ch.title.ar) ? decodeEntities(ch.title.ar) : undefined;
    const entry = { view, chapter: ch.id, title, url: `/${view}/${ch.id}/` };
    if (titleAr) entry.titleAr = titleAr;
    const keywords = collectKeywords(ch);
    if (keywords.length) { entry.keywords = keywords; keywordCount += keywords.length; }
    searchIndex.push(entry);
  });
  const njkPath = path.join(SRC_DIR, view, 'index.njk');
  if (fs.existsSync(njkPath)) {
    const njkSrc = fs.readFileSync(njkPath, 'utf8');
    UTILITY_CHAPTERS.forEach((u) => {
      const m = njkSrc.match(u.re);
      if (m) {
        const url = u.suffix === 'practice/' ? `/${view}/practice/` : `/${view}/#${m[1]}`;
        searchIndex.push({ view, chapter: m[1], title: u.title, titleAr: u.titleAr, url });
      }
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
  if (jsMinified.map) {
    fs.writeFileSync(path.join(SOURCEMAP_DIR, 'engine.js.map'), jsMinified.map, 'utf8');
  }
}
// The index ships on its own (ADR 0044): only the topic search reads it, and it loads it the
// first time the search box is used, instead of every page carrying it inside engine.js.
write(path.join(ROOT, 'public', 'js', 'search-index.js'), searchIndexJs);

// Emit lightweight per-track Flashcard JSON packs (public/data/flashcards/{track}.json)
// so Flashcards work on both Track Syllabus Hubs and single-chapter SSG routes ("All Lessons").
const FLASHCARDS_DIR = path.join(ROOT, 'public', 'data', 'flashcards');
fs.mkdirSync(FLASHCARDS_DIR, { recursive: true });
let fcTrackCount = 0, fcCardTotal = 0;
const _metaFrontRe = /^(?:format|calculator|delivery|questions|duration|scoring|sections|time|papers?|marks?|grade|exam\s*code|المدة|الأسئلة|الآلة\s*الحاسبة|التسليم|التصحيح|الأقسام|النمط|نظام\s*الاختبار)\b/i;
Object.keys(migratedContent).sort().forEach((view) => {
  const mc = migratedContent[view];
  const deck = [];
  const seen = new Set();
  mc.chapters.forEach((ch) => {
    const chId = ch.id || '';
    const chTitleEn = (ch.title && ch.title.en) || chId;
    const chTitleAr = (ch.title && ch.title.ar) || chTitleEn;
    const blocks = (ch.content && Array.isArray(ch.content.blocks)) ? ch.content.blocks : [];
    function pushCard(frontEn, frontAr, backEn, backAr, tag) {
      if (deck.length >= 45) return;
      const fEn = String(frontEn || '').replace(/^[●▲◆■\s]+/, '').trim();
      const bEn = String(backEn || '').trim();
      if (!fEn || !bEn || _metaFrontRe.test(fEn.replace(/<[^>]*>/g, '').trim())) return;
      if (bEn.length > 480) return;
      const key = `${chId}:${tag}:${fEn.slice(0, 48)}`;
      if (seen.has(key)) return;
      seen.add(key);
      const fAr = String(frontAr || fEn).replace(/^[●▲◆■\s]+/, '').trim();
      const bAr = String(backAr || bEn).trim();
      deck.push({
        id: `${view}:${chId}:${tag}:${deck.length}`,
        ch: chId,
        chEn: chTitleEn,
        chAr: chTitleAr,
        tag,
        f: fEn,
        f_ar: fAr,
        b: bEn,
        b_ar: bAr.length <= 540 ? bAr : bEn,
      });
    }
    blocks.forEach((bl) => {
      if (!bl || typeof bl !== 'object') return;
      if (bl.kind === 'cards' && Array.isArray(bl.items)) {
        bl.items.forEach((it) => {
          if (!it || !it.label) return;
          const val = it.value || it.body;
          if (!val) return;
          pushCard(it.label.en, it.label.ar, val.en, val.ar, 'Formula');
        });
      } else if (bl.kind === 'callout' && bl.label && bl.body) {
        const v = String(bl.style || bl.variant || '').toLowerCase();
        const tag = v === 'def' ? 'Definition' : (v === 'thm' || v === 'law' || v === 'rule' || v === 'formula' ? 'Theorem' : '');
        if (tag) pushCard(bl.label.en, bl.label.ar, bl.body.en, bl.body.ar, tag);
      }
    });
  });
  write(path.join(FLASHCARDS_DIR, `${view}.json`), JSON.stringify(deck));
  fcTrackCount++;
  fcCardTotal += deck.length;
});
console.log(`  ✓  public/data/flashcards/  (${fcCardTotal} cards across ${fcTrackCount} tracks)`);

// ─── 3–5. Verify canonical Eleventy templates & modular shell (WP-24) ───────
// Templates in src/index.njk, src/404.html, src/_includes/base.njk, and
// src/_includes/shell/*.njk are hand-maintained canonical source files and
// are never overwritten from string literals during build.js.
console.log('\n── Step 3: Verify canonical templates & modular shell partials ──');
const REQUIRED_TEMPLATES = [
  path.join(SRC_DIR, 'index.njk'),
  path.join(SRC_DIR, '404.html'),
  path.join(INCLUDES_DIR, 'base.njk'),
  path.join(INCLUDES_DIR, 'shell', 'head.njk'),
  path.join(INCLUDES_DIR, 'shell', 'header.njk'),
  path.join(INCLUDES_DIR, 'shell', 'study-tools.njk'),
  path.join(INCLUDES_DIR, 'shell', 'modals-fragment.html'),
  path.join(INCLUDES_DIR, 'shell', 'footer.njk'),
  path.join(INCLUDES_DIR, 'shell', 'overlays-and-chat.njk'),
  path.join(INCLUDES_DIR, 'shell', 'scripts.njk'),
];
REQUIRED_TEMPLATES.forEach((tplPath) => {
  if (!fs.existsSync(tplPath)) {
    throw new Error(`Missing required canonical template: ${path.relative(ROOT, tplPath)}`);
  }
});
const combinedShellSrc = [
  'base.njk',
  'shell/head.njk',
  'shell/header.njk',
  'shell/study-tools.njk',
  'shell/modals-fragment.html',
  'shell/footer.njk',
  'shell/overlays-and-chat.njk',
  'shell/scripts.njk',
].map((rel) => fs.readFileSync(path.join(INCLUDES_DIR, rel), 'utf8')).join('\n');

// Emit shared closed study/auth/flashcard modals, overlays, dropdowns & route nav helper (/js/shell-modals.js)
{
  const fullFrag = fs.readFileSync(path.join(INCLUDES_DIR, 'shell', 'modals-fragment.html'), 'utf8');
  function extractSection(name) {
    const re = new RegExp(`<!--\\s*@SECTION:${name}\\s*-->([\\s\\S]*?)<!--\\s*@ENDSECTION:${name}\\s*-->`);
    const m = fullFrag.match(re);
    if (!m) throw new Error(`Missing @SECTION:${name} in modals-fragment.html`);
    return m[1]
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\n\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }
  const modalsHtml = extractSection('modals');
  const studyChromeHtml = extractSection('studyChrome');
  const navMoreHtml = extractSection('navMore');
  const overlaysHtml = extractSection('overlays');

  const NAV_TREE_DATA = [
    {
      id: 'exams',
      en: 'Standardized & National Exams',
      ar: 'الاختبارات المعيارية والوطنية',
      groups: [
        {
          id: 'us-exams',
          en: 'Digital SAT & ACT',
          ar: 'اختبارات SAT و ACT',
          tracks: [
            { id: 'sat', code: 'SAT', en: 'Digital SAT Math', ar: 'اختبار SAT الرقمي' },
            { id: 'act', code: 'ACT', en: 'ACT Math', ar: 'اختبار ACT للرياضيات' },
            { id: 'act2', code: 'ACT-L1', en: 'ACT II Math Level 1', ar: 'اختبار ACT II المستوى 1' },
            { id: 'act2l2', code: 'ACT-L2', en: 'ACT II Math Level 2', ar: 'اختبار ACT II المستوى 2' }
          ]
        },
        {
          id: 'est-exams',
          en: 'Egyptian Scholastic Test (EST)',
          ar: 'الدبلومة الأمريكية (EST)',
          tracks: [
            { id: 'est', code: 'EST', en: 'EST I Math', ar: 'اختبار EST I للرياضيات' },
            { id: 'est2', code: 'EST-L1', en: 'EST II Math Level 1', ar: 'اختبار EST II المستوى 1' },
            { id: 'est2l2', code: 'EST-L2', en: 'EST II Math Level 2', ar: 'اختبار EST II المستوى 2' }
          ]
        },
        {
          id: 'saudi-qiyas',
          en: 'Saudi ETEC / Qiyas',
          ar: 'اختبارات قياس الوطنية',
          tracks: [
            { id: 'qudrat', code: 'QUDRAT', en: 'GAT Qudrat', ar: 'اختبار القدرات العامة' },
            { id: 'tahsili', code: 'TAHSILI', en: 'SAAT Tahsili', ar: 'الاختبار التحصيلي' },
            { id: 'gaten', code: 'QIYAS-EN', en: 'English GAT & SAAT', ar: 'قدرات وتحصيلي بالإنجليزية' }
          ]
        }
      ]
    },
    {
      id: 'intl',
      en: 'International Curricula',
      ar: 'المناهج الدولية',
      groups: [
        {
          id: 'ap-courses',
          en: 'College Board AP®',
          ar: 'مقررات AP المتقدمة',
          tracks: [
            { id: 'apab', code: 'AP-AB', en: 'AP Calculus AB', ar: 'تفاضل وتكامل AP AB' },
            { id: 'apbc', code: 'AP-BC', en: 'AP Calculus BC', ar: 'تفاضل وتكامل AP BC' },
            { id: 'appc', code: 'AP-PC', en: 'AP Precalculus', ar: 'ما قبل التفاضل AP' },
            { id: 'apstats', code: 'AP-STAT', en: 'AP Statistics', ar: 'الإحصاء المتقدم AP' }
          ]
        },
        {
          id: 'uk-cambridge',
          en: 'Cambridge & Pearson Edexcel',
          ar: 'مناهج كامبريدج وإدكسل',
          tracks: [
            { id: 'igcse', code: '0580', en: 'Cambridge IGCSE 0580', ar: 'كامبريدج IGCSE 0580' },
            { id: 'edexcel', code: '4MA1', en: 'Pearson Edexcel 4MA1', ar: 'إدكسل IGCSE 4MA1' },
            { id: 'addmath', code: '0606', en: 'Additional Maths', ar: 'الرياضيات الإضافية 0606' },
            { id: 'aslevel', code: 'AS', en: 'Cambridge AS Level', ar: 'مستوى كامبريدج AS' },
            { id: 'a2level', code: 'A2', en: 'Cambridge A2 Level', ar: 'مستوى كامبريدج A2' }
          ]
        },
        {
          id: 'ib-diploma',
          en: 'IB Diploma Programme',
          ar: 'البكالوريا الدولية (IB)',
          tracks: [
            { id: 'ibsl', code: 'IB-SL', en: 'IB Math SL (AA/AI)', ar: 'رياضيات IB المستوى القياسي SL' },
            { id: 'ibhl', code: 'IB-HL', en: 'IB Math HL (AA/AI)', ar: 'رياضيات IB المستوى العالي HL' }
          ]
        }
      ]
    },
    {
      id: 'secondary',
      en: 'Secondary & Olympiad',
      ar: 'المرحلة الثانوية والأولمبياد',
      groups: [
        {
          id: 'sec-foundations',
          en: 'Secondary Foundations',
          ar: 'تأسيس المرحلة الثانوية',
          tracks: [
            { id: 'algebra', code: 'ALG-1', en: 'Algebra 1', ar: 'الجبر 1' },
            { id: 'geo', code: 'GEO', en: 'Geometry', ar: 'الهندسة' },
            { id: 'alg2', code: 'ALG-2', en: 'Algebra 2', ar: 'الجبر 2' },
            { id: 'precalc', code: 'PRECALC', en: 'Pre-Calculus', ar: 'ما قبل التفاضل والتكامل' }
          ]
        },
        {
          id: 'contest-olympiad',
          en: 'Olympiad & Competitions',
          ar: 'المسابقات والأولمبياد',
          tracks: [
            { id: 'olympiad', code: 'NSMO', en: 'Olympiad · NSMO & KAUST', ar: 'الأولمبياد · نسما وكاوست' }
          ]
        }
      ]
    },
    {
      id: 'university',
      en: 'University & Applied STEM',
      ar: 'الرياضيات الجامعية والتطبيقية',
      groups: [
        {
          id: 'univ-calc',
          en: 'Calculus & Differential Equations',
          ar: 'التفاضل والمعادلات التفاضلية',
          tracks: [
            { id: 'calculus', code: 'CALC', en: 'Calculus', ar: 'التفاضل والتكامل' },
            { id: 'mvc', code: 'MVC', en: 'Multivariable Calculus', ar: 'تفاضل متعدد المتغيرات' },
            { id: 'odes', code: 'ODEs', en: 'Differential Equations', ar: 'المعادلات التفاضلية' }
          ]
        },
        {
          id: 'univ-linear-ai',
          en: 'Linear Algebra & AI Math',
          ar: 'الجبر الخطي والذكاء الاصطناعي',
          tracks: [
            { id: 'linalg', code: 'LINALG', en: 'Linear Algebra', ar: 'الجبر الخطي' },
            { id: 'mathai', code: 'MATH-AI', en: 'Math for AI & Data Science', ar: 'رياضيات الذكاء الاصطناعي' }
          ]
        }
      ]
    }
  ];

  const shellModalsSrc = `(function(){
  var m = document.getElementById('cs-study-modals-mount');
  if (m) m.outerHTML = ${JSON.stringify(modalsHtml)};
  var sc = document.getElementById('cs-study-chrome-mount');
  if (sc) sc.outerHTML = ${JSON.stringify(studyChromeHtml)};
  var ov = document.getElementById('cs-overlays-mount');
  if (ov) ov.outerHTML = ${JSON.stringify(overlaysHtml)};
  var nm = document.getElementById('navMorePanel');
  if (nm && !nm.firstChild) nm.innerHTML = ${JSON.stringify(navMoreHtml)};

  var TREE_DATA = ${JSON.stringify(NAV_TREE_DATA)};
  var TRACK_IDX = {};
  (function(){
    for (var ci = 0; ci < TREE_DATA.length; ci++) {
      var cat = TREE_DATA[ci];
      for (var gi = 0; gi < cat.groups.length; gi++) {
        var grp = cat.groups[gi];
        for (var ti = 0; ti < grp.tracks.length; ti++) {
          var tr = grp.tracks[ti];
          TRACK_IDX[tr.id] = { catId: cat.id, grpId: grp.id, track: tr };
        }
      }
    }
  })();

  function _escHtml(s){
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function _isArLocale(){
    if (window.i18n && typeof window.i18n.getLocale === 'function') {
      return window.i18n.getLocale() === 'ar';
    }
    return window.CLIPSAT_LOCALE === 'ar' || (document.body && document.body.classList.contains('rtl'));
  }

  function _chevSvg(){
    return '<svg class="nav-tree-chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M4.2 2.2L8.4 6l-4.2 3.8-.9-1L6.3 6 3.3 3.2z"/></svg>';
  }

  function _initNavTree(){
    var wrap = document.getElementById('navTreeWrap');
    var btn = document.getElementById('navTreeBtn');
    var panel = document.getElementById('navTreePanel');
    var codeEl = document.getElementById('navTreeCode');
    var labelEl = document.getElementById('navTreeLabel');
    if (!wrap || !btn || !panel) return null;

    var state = {
      activeTrack: window.CLIPSAT_TRACK || 'home',
      expCats: {},
      expGrps: {},
      allExpanded: false,
      query: ''
    };

    function seedExpansion(trackId){
      state.expCats = {};
      state.expGrps = {};
      state.allExpanded = false;
      var meta = TRACK_IDX[trackId];
      if (meta) {
        state.expCats[meta.catId] = true;
        state.expGrps[meta.grpId] = true;
      } else {
        state.expCats.exams = true;
        state.expGrps['us-exams'] = true;
      }
    }
    function expandAllBranches(){
      for (var ci = 0; ci < TREE_DATA.length; ci++) {
        var cat = TREE_DATA[ci];
        state.expCats[cat.id] = true;
        for (var gi = 0; gi < cat.groups.length; gi++) {
          state.expGrps[cat.groups[gi].id] = true;
        }
      }
      state.allExpanded = true;
    }
    function _syncAllExpandedFlag(){
      var allOn = true;
      for (var ci = 0; ci < TREE_DATA.length; ci++) {
        var cat = TREE_DATA[ci];
        if (!state.expCats[cat.id]) { allOn = false; break; }
        for (var gi = 0; gi < cat.groups.length; gi++) {
          if (!state.expGrps[cat.groups[gi].id]) { allOn = false; break; }
        }
        if (!allOn) break;
      }
      state.allExpanded = allOn;
    }
    seedExpansion(state.activeTrack);

    function trackUrl(trackId){
      var ar = _isArLocale();
      if (!trackId || trackId === 'home') return ar ? '/ar/' : '/';
      return (ar ? '/ar/' : '/') + encodeURIComponent(trackId) + '/';
    }

    function updateTrigger(){
      var ar = _isArLocale();
      var meta = TRACK_IDX[state.activeTrack];
      btn.setAttribute('aria-label', ar ? 'اختر المسار الدراسي' : 'Choose course track');
      panel.setAttribute('aria-label', ar ? 'شجرة المسارات الدراسية' : 'Curriculum tracks tree');
      if (meta) {
        if (codeEl) {
          codeEl.textContent = meta.track.code;
          codeEl.hidden = false;
        }
        if (labelEl) {
          labelEl.removeAttribute('data-i18n');
          labelEl.textContent = ar ? meta.track.ar : meta.track.en;
        }
      } else {
        if (codeEl) {
          codeEl.textContent = '';
          codeEl.hidden = true;
        }
        if (labelEl) {
          labelEl.setAttribute('data-i18n', 'nav.overview');
          labelEl.textContent = ar ? 'نظرة عامة' : 'Overview';
        }
      }
    }

    function buildTreeShell(prefix, filterId){
      var ar = _isArLocale();
      var filterLbl = ar ? 'تصفية المسارات في الشجرة' : 'Filter courses in menu tree';
      var filterPh = ar ? 'تصفية الـ 31 مسارًا…' : 'Filter all 31 courses…';
      var expText = state.allExpanded ? (ar ? 'طي الكل' : 'Collapse') : (ar ? 'توسيع الكل' : 'Expand all');
      return ''
        + '<div class="nav-tree-toolbar">'
        +   '<label class="sr-only" for="' + filterId + '">' + _escHtml(filterLbl) + '</label>'
        +   '<div class="nav-tree-search-wrap">'
        +     '<svg class="nav-tree-search-ico" width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9 3a6 6 0 100 12A6 6 0 009 3zM1 9a8 8 0 1114.32 4.906l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387A8 8 0 011 9z" clip-rule="evenodd"/></svg>'
        +     '<input id="' + filterId + '" type="search" class="nav-tree-filter" autocomplete="off" value="' + _escHtml(state.query) + '" placeholder="' + _escHtml(filterPh) + '">'
        +   '</div>'
        +   '<button type="button" class="nav-tree-expall">' + _escHtml(expText) + '</button>'
        + '</div>'
        + '<div class="nav-tree-scroll" data-tree-prefix="' + prefix + '"></div>';
    }

    function matchesQuery(q, fields){
      if (!q) return true;
      for (var i = 0; i < fields.length; i++) {
        if (String(fields[i] || '').toLowerCase().indexOf(q) !== -1) return true;
      }
      return false;
    }

    function renderTreeBody(container){
      if (!container) return;
      var ar = _isArLocale();
      var q = String(state.query || '').trim().toLowerCase();
      var isHome = !TRACK_IDX[state.activeTrack];
      var homeLabel = ar ? 'الصفحة الرئيسية · نظرة عامة (31 مسارًا)' : 'Overview · All 31 Tracks';

      var html = '<a href="' + _escHtml(trackUrl('home')) + '" data-track="home" class="nav-tree-overview"'
        + (isHome ? ' aria-current="page"' : '') + '>'
        + '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.7 2.3a1 1 0 00-1.4 0l-7 7a1 1 0 001.4 1.4L4 10.4V17a1 1 0 001 1h3.5v-4.5h3V18H15a1 1 0 001-1v-6.6l.3.3a1 1 0 001.4-1.4l-7-7z"/></svg>'
        + '<span>' + _escHtml(homeLabel) + '</span>'
        + '</a>';

      html += '<ul class="nav-tree-root">';
      var totalMatches = 0;

      for (var ci = 0; ci < TREE_DATA.length; ci++) {
        var cat = TREE_DATA[ci];
        var catMatchesDirect = matchesQuery(q, [cat.en, cat.ar, cat.id]);
        var catHtml = '';
        var catTrackCount = 0;
        var catVisTracks = 0;

        for (var gi = 0; gi < cat.groups.length; gi++) {
          var grp = cat.groups[gi];
          catTrackCount += grp.tracks.length;
          var grpMatchesDirect = catMatchesDirect || matchesQuery(q, [grp.en, grp.ar, grp.id]);
          var leavesHtml = '';
          var visLeaves = 0;

          for (var ti = 0; ti < grp.tracks.length; ti++) {
            var tr = grp.tracks[ti];
            var hit = grpMatchesDirect || matchesQuery(q, [tr.id, tr.code, tr.en, tr.ar]);
            if (!hit) continue;
            visLeaves++;
            catVisTracks++;
            totalMatches++;
            var isCur = state.activeTrack === tr.id;
            leavesHtml += '<li class="nav-tree-item">'
              + '<a href="' + _escHtml(trackUrl(tr.id)) + '" data-track="' + _escHtml(tr.id) + '" data-prefetch="1" class="nav-tree-leaf"'
              + (isCur ? ' aria-current="page"' : '') + '>'
              + '<span class="nav-tree-leaf-code">' + _escHtml(tr.code) + '</span>'
              + '<span class="nav-tree-leaf-title">' + _escHtml(ar ? tr.ar : tr.en) + '</span>'
              + '</a>'
              + '</li>';
          }

          if (!visLeaves) continue;
          var grpExpanded = q ? true : Boolean(state.allExpanded || state.expGrps[grp.id]);
          catHtml += '<li class="nav-tree-sub">'
            + '<button type="button" class="nav-tree-sub-btn" data-grp="' + _escHtml(grp.id) + '" aria-expanded="' + (grpExpanded ? 'true' : 'false') + '">'
            + _chevSvg()
            + '<span class="nav-tree-sub-title">' + _escHtml(ar ? grp.ar : grp.en) + '</span>'
            + '<span class="nav-tree-count">' + visLeaves + '</span>'
            + '</button>'
            + '<ul class="nav-tree-leaves"' + (grpExpanded ? '' : ' hidden') + '>'
            + leavesHtml
            + '</ul>'
            + '</li>';
        }

        if (!catVisTracks) continue;
        var catExpanded = q ? true : Boolean(state.allExpanded || state.expCats[cat.id]);
        html += '<li class="nav-tree-cat">'
          + '<button type="button" class="nav-tree-cat-btn" data-cat="' + _escHtml(cat.id) + '" aria-expanded="' + (catExpanded ? 'true' : 'false') + '">'
          + _chevSvg()
          + '<span class="nav-tree-cat-title">' + _escHtml(ar ? cat.ar : cat.en) + '</span>'
          + '<span class="nav-tree-count">' + (q ? catVisTracks : catTrackCount) + '</span>'
          + '</button>'
          + '<ul class="nav-tree-sublist"' + (catExpanded ? '' : ' hidden') + '>'
          + catHtml
          + '</ul>'
          + '</li>';
      }

      html += '</ul>';
      if (!totalMatches && q) {
        html += '<p class="nav-tree-empty" role="status">' + _escHtml(ar ? 'لا توجد مسارات مطابقة.' : 'No matching tracks found.') + '</p>';
      }
      container.innerHTML = html;
    }

    function renderPanel(){
      var hadScroll = panel.querySelector('.nav-tree-scroll');
      if (!hadScroll) {
        panel.innerHTML = buildTreeShell('desk', 'navTreeFilter');
      } else {
        var ar = _isArLocale();
        var expBtn = panel.querySelector('.nav-tree-expall');
        if (expBtn) expBtn.textContent = state.allExpanded ? (ar ? 'طي الكل' : 'Collapse') : (ar ? 'توسيع الكل' : 'Expand all');
        var flt = panel.querySelector('.nav-tree-filter');
        if (flt) {
          flt.setAttribute('placeholder', ar ? 'تصفية الـ 31 مسارًا…' : 'Filter all 31 courses…');
        }
      }
      renderTreeBody(panel.querySelector('.nav-tree-scroll'));
    }

    function syncMobileTree(){
      var mobileWrap = document.getElementById('navTreeMobile');
      if (!mobileWrap) return;
      var ar = _isArLocale();
      var mobBtn = mobileWrap.querySelector('.nav-tree-mobile-btn');
      var mobPanel = mobileWrap.querySelector('.nav-tree-mobile-body');
      var meta = TRACK_IDX[state.activeTrack];
      if (mobBtn) {
        var lblEl = mobBtn.querySelector('.nav-tree-mobile-lbl');
        if (lblEl) {
          lblEl.textContent = (ar ? 'المسار: ' : 'Course: ') + (meta ? (ar ? meta.track.ar : meta.track.en) : (ar ? 'نظرة عامة' : 'Overview'));
        }
      }
      if (mobPanel) {
        if (!mobPanel.querySelector('.nav-tree-scroll')) {
          mobPanel.innerHTML = buildTreeShell('mob', 'navTreeMobileFilter');
        } else {
          var expBtn = mobPanel.querySelector('.nav-tree-expall');
          if (expBtn) expBtn.textContent = state.allExpanded ? (ar ? 'طي الكل' : 'Collapse') : (ar ? 'توسيع الكل' : 'Expand all');
          var flt = mobPanel.querySelector('.nav-tree-filter');
          if (flt) flt.setAttribute('placeholder', ar ? 'تصفية الـ 31 مسارًا…' : 'Filter all 31 courses…');
        }
        renderTreeBody(mobPanel.querySelector('.nav-tree-scroll'));
      }
    }

    function renderAll(){
      updateTrigger();
      renderPanel();
      syncMobileTree();
    }

    function closePanel(restoreFocus){
      if (panel.hidden) return;
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      if (restoreFocus) {
        try { btn.focus(); } catch(e){}
      }
    }

    function openPanel(){
      if (typeof window.closeNavMorePanel === 'function') window.closeNavMorePanel();
      renderPanel();
      panel.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      var curLeaf = panel.querySelector('[aria-current="page"]');
      if (curLeaf && typeof curLeaf.scrollIntoView === 'function') {
        try { curLeaf.scrollIntoView({ block: 'nearest' }); } catch(e){}
      }
      var inp = document.getElementById('navTreeFilter');
      if (inp && window.innerWidth > 760) {
        setTimeout(function(){ try { inp.focus(); } catch(e){} }, 10);
      }
    }

    function handleTreeInteraction(rootEl, isMobile){
      rootEl.addEventListener('input', function(e){
        var flt = e.target.closest && e.target.closest('.nav-tree-filter');
        if (!flt) return;
        state.query = flt.value || '';
        renderTreeBody(rootEl.querySelector('.nav-tree-scroll'));
      });

      rootEl.addEventListener('click', function(e){
        var expAll = e.target.closest && e.target.closest('.nav-tree-expall');
        if (expAll) {
          e.stopPropagation();
          if (state.allExpanded) seedExpansion(state.activeTrack);
          else expandAllBranches();
          renderAll();
          return;
        }
        var catBtn = e.target.closest && e.target.closest('.nav-tree-cat-btn');
        if (catBtn) {
          e.stopPropagation();
          var cid = catBtn.getAttribute('data-cat');
          var nextCat = catBtn.getAttribute('aria-expanded') !== 'true';
          state.expCats[cid] = nextCat;
          _syncAllExpandedFlag();
          renderAll();
          return;
        }
        var subBtn = e.target.closest && e.target.closest('.nav-tree-sub-btn');
        if (subBtn) {
          e.stopPropagation();
          var gid = subBtn.getAttribute('data-grp');
          var nextGrp = subBtn.getAttribute('aria-expanded') !== 'true';
          state.expGrps[gid] = nextGrp;
          _syncAllExpandedFlag();
          renderAll();
          return;
        }
        var leaf = e.target.closest && e.target.closest('a[data-track]');
        if (leaf) {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
          var tid = leaf.getAttribute('data-track');
          if (!tid) return;
          e.preventDefault();
          closePanel(false);
          if (isMobile) {
            var nl = document.getElementById('navlinks');
            var mb = document.getElementById('menuBtn');
            if (nl) nl.classList.remove('open');
            if (mb) mb.setAttribute('aria-expanded', 'false');
          }
          if (window.showView) window.showView(tid);
          else window.location.href = leaf.getAttribute('href') || trackUrl(tid);
        }
      });

      rootEl.addEventListener('keydown', function(e){
        var focusables = Array.prototype.slice.call(
          rootEl.querySelectorAll('input.nav-tree-filter, button.nav-tree-expall, a.nav-tree-overview, button.nav-tree-cat-btn, button.nav-tree-sub-btn, a.nav-tree-leaf')
        ).filter(function(el){ return el.offsetParent !== null; });
        var cur = document.activeElement;
        var idx = focusables.indexOf(cur);
        if (e.key === 'Escape') {
          var flt = rootEl.querySelector('.nav-tree-filter');
          if (flt && flt.value) {
            e.preventDefault();
            e.stopPropagation();
            state.query = '';
            flt.value = '';
            renderTreeBody(rootEl.querySelector('.nav-tree-scroll'));
            return;
          }
          if (!isMobile) {
            e.preventDefault();
            e.stopPropagation();
            closePanel(true);
          }
          return;
        }
        if (e.key === 'ArrowDown' && focusables.length) {
          e.preventDefault();
          focusables[(idx + 1) % focusables.length].focus();
          return;
        }
        if (e.key === 'ArrowUp' && focusables.length) {
          e.preventDefault();
          focusables[(idx - 1 + focusables.length) % focusables.length].focus();
          return;
        }
        if (e.key === 'Home' && cur && cur.tagName !== 'INPUT' && focusables.length) {
          e.preventDefault();
          focusables[0].focus();
          return;
        }
        if (e.key === 'End' && cur && cur.tagName !== 'INPUT' && focusables.length) {
          e.preventDefault();
          focusables[focusables.length - 1].focus();
          return;
        }
        if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && cur && cur.matches && cur.matches('.nav-tree-cat-btn, .nav-tree-sub-btn')) {
          var ar = _isArLocale();
          var expandKey = ar ? 'ArrowLeft' : 'ArrowRight';
          var collapseKey = ar ? 'ArrowRight' : 'ArrowLeft';
          var isExp = cur.getAttribute('aria-expanded') === 'true';
          var catAttr = cur.getAttribute('data-cat');
          var grpAttr = cur.getAttribute('data-grp');
          if (e.key === expandKey && !isExp) {
            e.preventDefault();
            if (catAttr) state.expCats[catAttr] = true;
            if (grpAttr) state.expGrps[grpAttr] = true;
            renderAll();
            var nextBtn = rootEl.querySelector(catAttr ? '[data-cat="' + catAttr + '"]' : '[data-grp="' + grpAttr + '"]');
            if (nextBtn) nextBtn.focus();
          } else if (e.key === collapseKey && isExp) {
            e.preventDefault();
            if (catAttr) state.expCats[catAttr] = false;
            if (grpAttr) state.expGrps[grpAttr] = false;
            renderAll();
            var curBtn = rootEl.querySelector(catAttr ? '[data-cat="' + catAttr + '"]' : '[data-grp="' + grpAttr + '"]');
            if (curBtn) curBtn.focus();
          }
        }
      });
    }

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      if (panel.hidden) openPanel();
      else closePanel(false);
    });

    btn.addEventListener('keydown', function(e){
      if (e.key === 'ArrowDown' && panel.hidden) {
        e.preventDefault();
        openPanel();
      }
    });

    document.addEventListener('click', function(e){
      if (!panel.hidden && !wrap.contains(e.target)) closePanel(false);
    });

    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && !panel.hidden && !panel.contains(document.activeElement)) {
        closePanel(true);
      }
    });

    handleTreeInteraction(panel, false);

    var navlinksEl = document.getElementById('navlinks');
    if (navlinksEl && !document.getElementById('navTreeMobile')) {
      var mobDiv = document.createElement('div');
      mobDiv.id = 'navTreeMobile';
      mobDiv.className = 'nav-tree-mobile';
      mobDiv.innerHTML = ''
        + '<button type="button" class="nav-tree-mobile-btn" id="navTreeMobileBtn" aria-expanded="false" aria-controls="navTreeMobilePanel">'
        +   '<span class="nav-tree-mobile-lbl"></span>'
        +   '<svg class="nav-tree-caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" d="M6 8.4L1.4 3.8l1-1L6 6.4l3.6-3.6 1 1z"/></svg>'
        + '</button>'
        + '<div class="nav-tree-mobile-body" id="navTreeMobilePanel" hidden></div>';
      navlinksEl.insertBefore(mobDiv, navlinksEl.firstChild);
      var mobBtnEl = document.getElementById('navTreeMobileBtn');
      var mobPanelEl = document.getElementById('navTreeMobilePanel');
      if (mobBtnEl && mobPanelEl) {
        mobBtnEl.addEventListener('click', function(e){
          e.stopPropagation();
          var open = mobPanelEl.hidden;
          mobPanelEl.hidden = !open;
          mobBtnEl.setAttribute('aria-expanded', open ? 'true' : 'false');
          if (open) syncMobileTree();
        });
        handleTreeInteraction(mobPanelEl, true);
      }
    }

    renderAll();

    document.addEventListener('clipsat:view-change', function(ev){
      var v = ev && ev.detail && ev.detail.view;
      if (v) {
        state.activeTrack = v;
        seedExpansion(v);
        renderAll();
      }
    });

    document.addEventListener('clipsat:locale-changed', function(){
      renderAll();
    });

    var langBtn = document.getElementById('i18n-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', function(){
        setTimeout(renderAll, 20);
      });
    }

    return {
      open: openPanel,
      close: function(){ closePanel(false); },
      setActive: function(trackId){
        if (trackId) {
          state.activeTrack = trackId;
          seedExpansion(trackId);
          renderAll();
        }
      },
      refresh: renderAll,
      getData: function(){ return TREE_DATA; }
    };
  }

  window.CSNavTree = _initNavTree();

  window.__csInitRouteNav = function(_origShowView) {
    var BASE = '';
    var URLS = {
      calculus:'calculus',algebra:'algebra',apab:'apab',apbc:'apbc',
      igcse:'igcse',alg2:'alg2',geo:'geo',qudrat:'qudrat',tahsili:'tahsili',
      sat:'sat',act:'act',aslevel:'aslevel',a2level:'a2level',
      est:'est',est2:'est2',est2l2:'est2l2',act2:'act2',act2l2:'act2l2',precalc:'precalc',
      appc:'appc',apstats:'apstats',ibsl:'ibsl',ibhl:'ibhl',linalg:'linalg',mvc:'mvc',odes:'odes',
      addmath:'addmath',mathai:'mathai',edexcel:'edexcel',gaten:'gaten',olympiad:'olympiad',home:''
    };
    var CURRENT = window.CLIPSAT_TRACK || 'home';
    var ACTIVE_CH = window.CLIPSAT_CHAPTER_ID || '';
    var IS_AR_ROUTE = window.CLIPSAT_LOCALE === 'ar';

    window._clipsatNavReady = false;
    setTimeout(function(){ window._clipsatNavReady = true; }, 0);

    window.showView = function(name){
      if(typeof window.closeFloatingCalc === 'function') window.closeFloatingCalc();
      if(name === CURRENT && !ACTIVE_CH){
        if(_origShowView) _origShowView(name);
        return;
      }
      if(!window._clipsatNavReady) return;
      var dest = URLS[name];
      if(dest !== undefined){
        if(!dest){ window.location.href = BASE + (IS_AR_ROUTE ? '/ar/' : '/'); return; }
        window.location.href = BASE + (IS_AR_ROUTE ? '/ar/' + dest + '/' : '/' + dest + '/');
      }
    };
    window.navigate = function(viewId){
      window.showView((viewId || '').replace('view-',''));
    };

    var el = document.getElementById('view-' + CURRENT);
    if(el) el.classList.add('active');

    if (window.CSNavTree && typeof window.CSNavTree.setActive === 'function') {
      window.CSNavTree.setActive(CURRENT);
    }

    if(ACTIVE_CH && window.goChapter){
      window.goChapter(ACTIVE_CH, CURRENT);
    } else if(CURRENT !== 'home' && el && el.hasAttribute('data-syllabus-hub')) {
      var hubParams = new URLSearchParams(window.location.search);
      var hubReq = hubParams.get('ch') || (window.location.hash ? window.location.hash.slice(1) : '');
      var hubSafe = hubReq
        ? ((window.CSS && typeof window.CSS.escape === 'function') ? window.CSS.escape(hubReq) : String(hubReq).replace(/[^a-zA-Z0-9_-]/g, ''))
        : '';
      if(hubSafe){
        var localSec = document.getElementById(hubReq);
        if(localSec && typeof localSec.scrollIntoView === 'function'){
          localSec.classList.add('ch-active');
          localSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          var hubLink = document.querySelector('#view-' + CURRENT + ' .rail a[data-target="' + hubSafe + '"]');
          var hubHref = hubLink ? hubLink.getAttribute('href') : '';
          if(hubHref && hubHref.charAt(0) === '/'){
            window.location.replace(hubHref);
          }
        }
      }
    } else if(CURRENT !== 'home' && window.goChapter && el && !el.hasAttribute('data-syllabus-hub')) {
      var params = new URLSearchParams(window.location.search);
      var requestedCh = params.get('ch') || (window.location.hash ? window.location.hash.slice(1) : '');
      var safeCh = requestedCh
        ? ((window.CSS && typeof window.CSS.escape === 'function') ? window.CSS.escape(requestedCh) : String(requestedCh).replace(/[^a-zA-Z0-9_-]/g, ''))
        : '';
      var targetLink = safeCh
        ? document.querySelector('#view-' + CURRENT + ' .rail a[data-target="' + safeCh + '"]')
        : null;
      var openLink = targetLink || document.querySelector('#view-' + CURRENT + ' .rail a[data-target]');
      if(openLink) window.goChapter(openLink.getAttribute('data-target'), CURRENT);
    }
  };
})();\n`;
  const minModals = UglifyJS.minify(shellModalsSrc, MINIFY_OPTS);
  write(path.join(ROOT, 'public', 'js', 'shell-modals.js'), minModals.error ? shellModalsSrc : minModals.code);
}

const REQUIRED_SHELL_MARKERS = [
  'data-curriculum="olympiad"',
  'data-curriculum="univ"',
  'href="/calculus/"', 'href="/algebra/"', 'href="/apab/"', 'href="/apbc/"',
  'href="/igcse/"', 'href="/alg2/"', 'href="/geo/"', 'href="/qudrat/"',
  'href="/tahsili/"', 'href="/sat/"', 'href="/act/"', 'href="/aslevel/"',
  'href="/a2level/"', 'href="/est/"', 'href="/est2/"', 'href="/est2l2/"',
  'href="/act2/"', 'href="/act2l2/"', 'href="/precalc/"', 'href="/appc/"',
  'href="/apstats/"', 'href="/ibsl/"', 'href="/ibhl/"', 'href="/linalg/"',
  'href="/mvc/"', 'href="/odes/"', 'href="/addmath/"', 'href="/mathai/"',
  'href="/edexcel/"', 'href="/gaten/"', 'href="/olympiad/"',
];
REQUIRED_SHELL_MARKERS.forEach((marker) => {
  if (!combinedShellSrc.includes(marker)) {
    throw new Error(`Modular shell missing required marker: ${marker}`);
  }
});
console.log(`  ✓  Verified ${REQUIRED_TEMPLATES.length} canonical templates & ${REQUIRED_SHELL_MARKERS.length} shell markers`);

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
const CLIENT_STRIP_KEYS = new Set([
  'educational_aim',
  'exam_archetype',
  'sympy_cert',
  'educator_review_hash',
  'sympy_verified',
]);
function toClientBankItem(q) {
  const out = {};
  for (const k of Object.keys(q)) {
    if (!CLIENT_STRIP_KEYS.has(k)) out[k] = q[k];
  }
  return out;
}
let shardCount = 0;
if (fs.existsSync(BANK_DATA_DIR)) {
  if (fs.existsSync(BANK_SHARDS_DIR)) {
    fs.rmSync(BANK_SHARDS_DIR, { recursive: true, force: true });
  }
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
      byTopic[tid].push(toClientBankItem(q));
    });
    const canonicalTopics = Object.keys(byTopic);
    const chapterAliases = {};
    // Ensure every curriculum chapter in content/<track>/*.json resolves cleanly
    // without duplicating items on disk when cid != canonical topic_id.
    const trackContentDir = path.join(CONTENT_DIR, track);
    if (fs.existsSync(trackContentDir)) {
      fs.readdirSync(trackContentDir).forEach((chFile) => {
        if (!chFile.endsWith('.json') || chFile.startsWith('_')) return;
        const ch = JSON.parse(fs.readFileSync(path.join(trackContentDir, chFile), 'utf8'));
        const cid = String(ch.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
        if (!cid || (byTopic[cid] && byTopic[cid].length)) return;
        const domains = (ch.quizWidget && Array.isArray(ch.quizWidget.domains)) ? ch.quizWidget.domains : [];
        let matchedTopics = [];
        if (domains.length) {
          matchedTopics = canonicalTopics.filter((tid) =>
            byTopic[tid].some((q) => q.domain && domains.includes(q.domain))
          );
        }
        if (!matchedTopics.length) {
          matchedTopics = canonicalTopics.slice(0, 2);
        }
        chapterAliases[cid] = matchedTopics;
      });
    }
    const trackShardDir = path.join(BANK_SHARDS_DIR, track);
    mkdirp(trackShardDir);
    const topicSummary = {};
    canonicalTopics.forEach((tid) => {
      const items = byTopic[tid];
      topicSummary[tid] = items.length;
      fs.writeFileSync(
        path.join(trackShardDir, `${tid}.json`),
        JSON.stringify({ track, topic_id: tid, count: items.length, pool: items }),
        'utf8'
      );
      shardCount++;
    });
    Object.keys(chapterAliases).forEach((cid) => {
      const aliasTopics = chapterAliases[cid];
      topicSummary[cid] = aliasTopics.reduce((acc, t) => acc + (byTopic[t] ? byTopic[t].length : 0), 0);
      fs.writeFileSync(
        path.join(trackShardDir, `${cid}.json`),
        JSON.stringify({ track, topic_id: cid, aliasTopics }),
        'utf8'
      );
      shardCount++;
    });
    fs.writeFileSync(
      path.join(trackShardDir, '_index.json'),
      JSON.stringify({
        track,
        schemaVersion: raw.schemaVersion || 2,
        quarantined: Boolean(raw.quarantined),
        total: pool.length,
        canonicalTopics,
        chapterAliases,
        letters: raw.letters || null,
        sections: raw.sections || null,
        topics: topicSummary,
      }),
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
