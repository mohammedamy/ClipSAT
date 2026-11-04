#!/usr/bin/env node
'use strict';

/**
 * scripts/test-wave2-verification.js — Wave 2 (WP-21 through WP-32) Verification Suite
 *
 * Verifies every Wave 2 architectural, performance, SSG de-monolith, R2 offload,
 * SW LRU, delta+tombstone sync, mobile/RTL UX, WCAG 2.2 AA, 612-page SEO,
 * AI Tutor guest demo, and 900+ workedExampleCard acceptance criterion.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function dirSizeBytes(dir) {
  let total = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) total += dirSizeBytes(full);
    else if (ent.isFile()) total += fs.statSync(full).size;
  }
  return total;
}

console.log('Running Wave 2 Verification Suite (WP-21 through WP-32)...');

const contentDir = path.join(ROOT, 'content');
const tracks = fs
  .readdirSync(contentDir)
  .filter((d) => fs.statSync(path.join(contentDir, d)).isDirectory())
  .sort();
assert.strictEqual(tracks.length, 31, `Expected 31 tracks in content/, found ${tracks.length}`);

// ── WP-21: Per-Chapter Locale-Split Eleventy SSG (< 95 KB HTML, < 3,500 DOM nodes)
{
  assert(exists('_site'), 'WP-21: _site/ must exist prior to running Wave 2 verification');
  let enChapters = 0;
  let arChapters = 0;
  let maxHtmlBytes = 0;
  let maxHtmlFile = '';
  let maxDomNodes = 0;
  let maxDomFile = '';

  function checkCurriculumHtml(relPath) {
    const full = path.join(ROOT, '_site', relPath);
    assert(fs.existsSync(full), `WP-21: Missing built SSG route _site/${relPath}`);
    const stat = fs.statSync(full);
    if (stat.size > maxHtmlBytes) {
      maxHtmlBytes = stat.size;
      maxHtmlFile = relPath;
    }
    assert(
      stat.size < 97280,
      `WP-21: _site/${relPath} is ${(stat.size / 1024).toFixed(1)} KB (>= 95 KB ceiling)`
    );
    const html = fs.readFileSync(full, 'utf8');
    const domNodes = (html.match(/<[a-zA-Z][^>]*>/g) || []).length;
    if (domNodes > maxDomNodes) {
      maxDomNodes = domNodes;
      maxDomFile = relPath;
    }
    assert(
      domNodes < 3500,
      `WP-21: _site/${relPath} has ${domNodes} DOM nodes (>= 3,500 ceiling)`
    );
  }

  for (const tr of tracks) {
    checkCurriculumHtml(`${tr}/index.html`);
    checkCurriculumHtml(`ar/${tr}/index.html`);
    checkCurriculumHtml(`${tr}/practice/index.html`);
    checkCurriculumHtml(`ar/${tr}/practice/index.html`);
    const meta = JSON.parse(read(`content/${tr}/_meta.json`));
    for (const cid of meta.chapterOrder) {
      enChapters++;
      arChapters++;
      checkCurriculumHtml(`${tr}/${cid}/index.html`);
      checkCurriculumHtml(`ar/${tr}/${cid}/index.html`);
    }
  }

  assert.strictEqual(enChapters + arChapters, 612, `WP-21: Expected 612 EN+AR chapter routes, found ${enChapters + arChapters}`);
  const scriptsNjk = read('src/_includes/shell/scripts.njk');
  assert(scriptsNjk.includes("link.rel = 'prefetch'"), 'WP-21: Hover/focus chapter prefetch must be wired in shell/scripts.njk');
  const pkg = JSON.parse(read('package.json'));
  assert(pkg.scripts.build.includes('--max-old-space-size=512'), 'WP-21: Eleventy build must run under --max-old-space-size=512');
  console.log(
    `  ✓ WP-21: 612 EN+AR chapter pages + 62 hubs + practice routes verified (max ${(maxHtmlBytes / 1024).toFixed(1)} KB [${maxHtmlFile}], max ${maxDomNodes} DOM nodes [${maxDomFile}])`
  );
}

// ── WP-22: Zero Eager Bank Fetch, Zero Subtree MutationObservers & Lazy Flashcards
{
  const qbSrc = read('src/scripts/modules/02e-question-bank-and-syllabus.js');
  assert(
    /window\.CS_bankReady\s*=\s*Promise\.resolve\(null\)/.test(qbSrc),
    'WP-22: 02e-question-bank-and-syllabus.js must not eagerly fetch monolithic /bank-data/*.json on boot'
  );
  assert(qbSrc.includes('CS_loadTopicShard'), 'WP-22: 02e must define lazy CS_loadTopicShard');
  assert(!exists('_site/bank-data'), 'WP-22: Monolithic bank-data/ must not be copied to _site/');

  for (const tr of tracks) {
    assert(
      exists(`public/bank-shards/${tr}/_index.json`),
      `WP-22: Missing shard index public/bank-shards/${tr}/_index.json`
    );
  }

  const modDir = path.join(ROOT, 'src/scripts/modules');
  for (const f of fs.readdirSync(modDir).filter((x) => x.endsWith('.js'))) {
    const src = fs.readFileSync(path.join(modDir, f), 'utf8');
    assert(
      !/\.observe\s*\([^)]*subtree\s*:\s*true/.test(src),
      `WP-22: Global subtree:true MutationObserver found in src/scripts/modules/${f}`
    );
  }
  const katexRt = read('public/js/katex-runtime.js');
  assert(!/MutationObserver/.test(katexRt), 'WP-22: katex-runtime.js must not attach a MutationObserver');

  const gamify = read('src/scripts/modules/24-gamification.js');
  assert(gamify.includes('CLIPSAT_FC_COUNT'), 'WP-22: 24-gamification.js must paint initial badge from precomputed CLIPSAT_FC_COUNT');

  const engineBytes = fs.statSync(path.join(ROOT, 'public/js/engine.js')).size;
  assert(engineBytes < 350000, `WP-22: public/js/engine.js (${engineBytes} bytes) exceeds 350,000-byte budget`);
  assert(exists('artifacts/sourcemaps/engine.js.map'), 'WP-22: Private source map artifacts/sourcemaps/engine.js.map must be generated');
  console.log(`  ✓ WP-22: Lazy shard loader, 0 subtree MutationObservers, lazy flashcards & engine.js (${(engineBytes / 1024).toFixed(1)} KB) verified`);
}

// ── WP-23: Cloudflare R2 Offload & _site/ < 70 MB Budget
{
  assert(exists('scripts/upload-r2-assets.sh'), 'WP-23: scripts/upload-r2-assets.sh must exist');
  for (const mod of [
    'src/scripts/modules/02e-question-bank-and-syllabus.js',
    'src/scripts/modules/15-pwa-and-exam-dates-data.js',
    'src/scripts/modules/17-mock-exam-mode.js'
  ]) {
    assert(read(mod).includes('CLIPSAT_CDN_BASE'), `WP-23: ${mod} must support CLIPSAT_CDN_BASE R2 prefix`);
  }
  const gitignore = read('.gitignore');
  assert(gitignore.includes('public/bank-shards/') && gitignore.includes('artifacts/sourcemaps/'), 'WP-23: .gitignore must exclude generated shards & sourcemaps');

  const siteBytes = dirSizeBytes(path.join(ROOT, '_site'));
  const siteMiB = siteBytes / (1024 * 1024);
  assert(siteMiB < 70, `WP-23: _site/ size is ${siteMiB.toFixed(1)} MiB (>= 70 MiB ceiling)`);
  console.log(`  ✓ WP-23: R2 CDN prefixing & _site/ size (${siteMiB.toFixed(1)} MiB < 70 MiB) verified`);
}

// ── WP-24: Modular Shell, Standalone Eleventy Pages & CustomEvent Bus
{
  for (const p of ['head.njk', 'header.njk', 'study-tools.njk', 'modals-fragment.html', 'footer.njk', 'overlays-and-chat.njk', 'scripts.njk']) {
    assert(exists(`src/_includes/shell/${p}`), `WP-24: Missing modular shell partial src/_includes/shell/${p}`);
  }
  for (const pg of ['changelog.html', 'rigor-standard.html', 'free-tier-promise.html']) {
    assert(exists(`_site/${pg}`), `WP-24: Missing built standalone page _site/${pg}`);
  }
  const buildJs = read('build.js');
  assert(!/write\([^)]*base\.njk/.test(buildJs), 'WP-24: build.js must not overwrite src/_includes/base.njk from string literals');

  const modDir = path.join(ROOT, 'src/scripts/modules');
  for (const f of fs.readdirSync(modDir).filter((x) => x.endsWith('.js'))) {
    const src = fs.readFileSync(path.join(modDir, f), 'utf8');
    assert(
      !/var\s+_orig(?:ShowView|GoChapter|CqPick|GenChapterQuiz|GenFullExam)\s*=\s*window\./.test(src),
      `WP-24: Legacy global monkey-patch chain found in src/scripts/modules/${f}`
    );
  }
  const coreApp = read('src/scripts/modules/02-core-app.js');
  assert(coreApp.includes('clipsat:view-change') && coreApp.includes('clipsat:chapter-change'), 'WP-24: 02-core-app.js must emit CustomEvents');
  console.log('  ✓ WP-24: Modular shell templates, standalone pages & zero monkey-patch chains verified');
}

// ── WP-25: Service Worker Cache Precision & 60-Entry LRU Cap
{
  const sw = read('sw.js');
  assert(!sw.includes('cdnjs.cloudflare.com'), 'WP-25: sw.js must not precache unused cdnjs assets');
  assert(/MAX_DYNAMIC_ITEMS\s*=\s*60/.test(sw), 'WP-25: sw.js must enforce MAX_DYNAMIC_ITEMS = 60');
  assert(sw.includes('trimCache'), 'WP-25: sw.js must implement trimCache LRU eviction');
  assert(sw.includes('/bank-shards/'), 'WP-25: sw.js must cache /bank-shards/ via SWR');
  const stamp = read('scripts/stamp-sw-version.js');
  assert(stamp.includes("'vendor'"), 'WP-25: stamp-sw-version.js must hash vendor/ directory');
  assert(exists('_site/_redirects'), 'WP-25: _site/_redirects must be emitted');
  console.log('  ✓ WP-25: Service Worker 60-item LRU cap, vendor hashing & _redirects verified');
}

// ── WP-26: Delta + Tombstone Cloud Sync & Storage LRU Caps
{
  const cs = read('public/js/cloud-sync.js');
  assert(cs.includes('pushDelta') && cs.includes('_dirtyDelta'), 'WP-26: cloud-sync.js must implement dirty-record delta queue');
  assert(cs.includes('deleted_at'), 'WP-26: cloud-sync.js must support soft-delete tombstones (deleted_at)');
  assert(
    exists('supabase/migrations/20261104120000_wave2_mistake_tombstones.sql'),
    'WP-26: Tombstone SQL migration must exist'
  );
  const ml = read('src/scripts/modules/09-mastery-log.js');
  assert(!ml.includes("setItem('clipsat_mistakes'"), 'WP-26: 09-mastery-log.js must not duplicate writes to legacy clipsat_mistakes');
  assert(/MAX_ENTRIES\s*=\s*1000/.test(ml), 'WP-26: 09-mastery-log.js must enforce 1,000-entry LRU cap');
  console.log('  ✓ WP-26: Delta+tombstone cloud sync & 1,000-entry storage LRU caps verified');
}

// ── WP-27 & WP-28: Mobile Fold/UX, Reading Progress Bar, 68ch & Full Arabic Chrome Parity
{
  const css = read('src/styles/main.css');
  assert(css.includes('.cs-reading-progress') && css.includes('68ch'), 'WP-27: main.css must define reading progress bar & 68ch prose measure');
  assert(css.includes('order: -1') && css.includes('.hero-copy'), 'WP-27: Mobile hero copy must sit above graph via order: -1');
  assert(css.includes('Noto Sans Arabic') && css.includes('inset-inline'), 'WP-28: main.css must apply Noto Sans Arabic & logical inset-inline properties');

  // Verify every data-i18n key in shell templates exists in 20e-i18n-ar.js
  const arDictSrc = read('src/scripts/modules/20e-i18n-ar.js');
  const shellCombined = [
    'src/_includes/shell/header.njk',
    'src/_includes/shell/study-tools.njk',
    'src/_includes/shell/modals-fragment.html',
    'src/_includes/shell/footer.njk',
    'src/_includes/shell/overlays-and-chat.njk'
  ].map(read).join('\n');
  const keyMatches = [...shellCombined.matchAll(/data-i18n(?:-html)?="([a-zA-Z0-9_.-]+)"/g)].map((m) => m[1]);
  for (const k of new Set(keyMatches)) {
    assert(
      arDictSrc.includes(`'${k}':`) || arDictSrc.includes(`"${k}":`),
      `WP-28: Missing Arabic translation for UI key "${k}" in 20e-i18n-ar.js`
    );
  }
  const searchIdx = read('public/js/search-index.js');
  assert(searchIdx.includes('"titleAr":') && searchIdx.includes('"url":'), 'WP-28: search-index.js must include Arabic titleAr and chapter url');
  console.log(`  ✓ WP-27/28: Mobile reading UX, RTL logical CSS & 100% Arabic chrome parity (${new Set(keyMatches).size} shell keys) verified`);
}

// ── WP-29 & WP-30: WCAG 2.2 AA, Spoken Math, Hreflang, Sitemap & Unique <h1>
{
  const css = read('src/styles/main.css');
  assert(css.includes('.skip-link') && css.includes('#15803d'), 'WP-29: main.css must include .skip-link and darkened #15803d WCAG AA green');
  const { texToSpeech } = require('./katex-ssr.js');
  assert(texToSpeech('\\frac{a}{b}').includes('fraction a over b'), 'WP-29: texToSpeech must convert LaTeX fractions into spoken screen-reader math');

  const sitemap = read('_site/sitemap.xml');
  const locCount = (sitemap.match(/<loc>/g) || []).length;
  assert(locCount >= 800, `WP-30: _site/sitemap.xml must list >= 800 indexable URLs, found ${locCount}`);
  assert(sitemap.includes('hreflang="ar"') && sitemap.includes('hreflang="en"'), 'WP-30: sitemap.xml must include bidirectional hreflang links');

  // Assert exactly 1 <h1> on representative routes across home, utility, hub, EN chapter, AR chapter, practice
  const h1Routes = [
    '_site/index.html',
    '_site/calculator/index.html',
    '_site/privacy/index.html',
    '_site/sat/index.html',
    '_site/sat/sat-linear/index.html',
    '_site/ar/qudrat/qud-about/index.html',
    '_site/sat/practice/index.html'
  ];
  for (const r of h1Routes) {
    const html = read(r).replace(/<script[\s\S]*?<\/script>/gi, '');
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    assert.strictEqual(h1Count, 1, `WP-30: Expected exactly 1 <h1> in ${r}, found ${h1Count}`);
  }
  const chHtml = read('_site/sat/sat-linear/index.html');
  assert(chHtml.includes('"@type": "LearningResource"'), 'WP-30: Chapter route must emit LearningResource JSON-LD');
  console.log(`  ✓ WP-29/30: WCAG 2.2 AA tokens, spoken math, unique <h1> & sitemap (${locCount} URLs) verified`);
}

// ── WP-31 & WP-32: AI Tutor Guest Demo, Mobile Teacher Drawer & 900+ Worked Examples
{
  const chatSrc = read('src/scripts/modules/03-ai-chat-and-practice-quiz.js');
  assert(chatSrc.includes('clipsat_guest_ai_demos') && chatSrc.includes('chatGuestBanner'), 'WP-31: AI Tutor must provide clear Guest Banner & 2-question anonymous demo mode');
  const tmSrc = read('src/scripts/modules/20b-teacher-mode.js');
  assert(!tmSrc.includes('cdn.jsdelivr.net/npm/mathjax'), 'WP-31: 20b-teacher-mode.js must not inject MathJax 3.2.2 CDN');
  assert(tmSrc.includes('tm-drawer-toggle') && tmSrc.includes('tm-drawer-open'), 'WP-31: 20b-teacher-mode.js must support collapsible mobile toolbar');
  const tvSrc = read('public/js/teacher-view.js');
  for (const tr of ['addmath', 'mathai', 'edexcel', 'gaten', 'olympiad', 'linalg', 'odes']) {
    assert(tvSrc.includes(tr), `WP-31: public/js/teacher-view.js must support track "${tr}"`);
  }

  let totalWeCards = 0;
  let chapterCount = 0;
  for (const tr of tracks) {
    const meta = JSON.parse(read(`content/${tr}/_meta.json`));
    for (const cid of meta.chapterOrder) {
      chapterCount++;
      const ch = JSON.parse(read(`content/${tr}/${cid}.json`));
      const weCount = ((ch.content && ch.content.blocks) || []).filter((b) => b.kind === 'workedExampleCard').length;
      assert(weCount >= 3, `WP-32: ${tr}/${cid} has only ${weCount} workedExampleCard blocks (< 3 minimum)`);
      totalWeCards += weCount;
    }
  }
  assert(totalWeCards >= 918, `WP-32: Expected >= 918 workedExampleCard blocks across 306 chapters, found ${totalWeCards}`);
  console.log(`  ✓ WP-31/32: Guest AI demo, responsive Teacher Mode & ${totalWeCards.toLocaleString()} workedExampleCards across ${chapterCount} chapters verified`);
}

console.log('✅ ALL Wave 2 (WP-21 through WP-32) verification checks PASSED!');
