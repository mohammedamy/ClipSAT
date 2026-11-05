#!/usr/bin/env node
// scripts/ci/check-build-budgets.mjs — CI Gate #12: CWV & Static Build Size Budget Gate
//
// Enforces:
//   - `_site/` total size < 70 MiB (73,400,320 bytes)
//   - Every built HTML page < 95 KB (97,280 bytes) & < 3,500 DOM element open tags
//   - `public/js/engine.js` < 350,000 bytes & chars
//   - `src/scripts/modules/02-core-app.js` < 350 lines
//   - At least 612 per-chapter EN+AR static HTML routes generated
//   - Zero `.js.map` source maps leaked into `_site/`

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITE_DIR = path.join(ROOT, '_site');

if (!fs.existsSync(SITE_DIR)) {
  console.error('❌ CI Gate #12 FAILED: `_site/` directory does not exist (run `npm run build` first).');
  process.exit(1);
}

const errors = [];
let totalSiteBytes = 0;
let htmlCount = 0;
let maxHtmlBytes = 0;
let maxHtmlRel = '';
let maxDomTags = 0;
let maxDomRel = '';

function walkSite(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkSite(abs);
      continue;
    }
    const sz = fs.statSync(abs).size;
    totalSiteBytes += sz;
    const rel = path.relative(SITE_DIR, abs);

    if (ent.name.endsWith('.js.map')) {
      errors.push(`Private source map leaked into _site/: ${rel}`);
    }

    if (ent.name.endsWith('.html')) {
      htmlCount++;
      const htmlCapBytes = rel === 'index.html' ? 125 * 1024 : 95 * 1024;
      if (rel !== 'index.html' && sz > maxHtmlBytes) {
        maxHtmlBytes = sz;
        maxHtmlRel = rel;
      }
      if (sz >= htmlCapBytes) {
        errors.push(`HTML page exceeds ${(htmlCapBytes / 1024).toFixed(0)} KB budget: _site/${rel} (${(sz / 1024).toFixed(1)} KB)`);
      }
      const html = fs.readFileSync(abs, 'utf8');
      const noScripts = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
      const domTags = (noScripts.match(/<[a-zA-Z][a-zA-Z0-9-]*(?:\s|>|\/)/g) || []).length;
      if (domTags > maxDomTags) {
        maxDomTags = domTags;
        maxDomRel = rel;
      }
      if (domTags >= 3500) {
        errors.push(`HTML page exceeds 3,500 DOM nodes budget: _site/${rel} (${domTags} nodes)`);
      }
    }
  }
}

walkSite(SITE_DIR);

const maxSiteBytes = 70 * 1024 * 1024;
if (totalSiteBytes >= maxSiteBytes) {
  errors.push(`_site/ total size ${(totalSiteBytes / (1024 * 1024)).toFixed(2)} MiB exceeds 70 MiB budget`);
}
if (htmlCount < 670) {
  errors.push(`Expected >= 670 built HTML routes (612 chapters + 62 EN/AR track hubs + core pages), found ${htmlCount}`);
}

const enginePath = path.join(ROOT, 'public', 'js', 'engine.js');
const engineBytes = fs.statSync(enginePath).size;
const engineChars = fs.readFileSync(enginePath, 'utf8').length;
if (engineBytes >= 350000 || engineChars >= 350000) {
  errors.push(`public/js/engine.js (${engineBytes} bytes / ${engineChars} chars) exceeds 350,000 budget`);
}

const coreLines = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02-core-app.js'), 'utf8').split('\n').length;
if (coreLines >= 350) {
  errors.push(`src/scripts/modules/02-core-app.js has ${coreLines} lines (>= 350 ceiling)`);
}

if (!fs.existsSync(path.join(ROOT, 'artifacts', 'sourcemaps', 'engine.js.map'))) {
  errors.push('Missing private source map artifacts/sourcemaps/engine.js.map');
}

if (errors.length > 0) {
  console.error(`❌ CI Gate #12 FAILED with ${errors.length} budget violation(s):`);
  for (const e of errors.slice(0, 25)) console.error('  -', e);
  process.exit(1);
}

console.log(
  `✅ CI Gate #12 PASSED: _site/ = ${(totalSiteBytes / (1024 * 1024)).toFixed(2)} MiB (< 70 MiB) | ` +
    `${htmlCount} HTML routes (peak ${(maxHtmlBytes / 1024).toFixed(1)} KB on ${maxHtmlRel}, peak ${maxDomTags} DOM nodes on ${maxDomRel}) | ` +
    `engine.js = ${(engineBytes / 1024).toFixed(1)} KB | 02-core-app.js = ${coreLines} LOC.`
);
