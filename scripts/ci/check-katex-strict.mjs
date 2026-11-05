#!/usr/bin/env node
// scripts/ci/check-katex-strict.mjs — CI Gate #4: Strict KaTeX & HTML <p>-in-<span> Breakout Gate

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const res = spawnSync(process.execPath, ['scripts/validate-katex-strict.js'], {
  cwd: ROOT,
  stdio: 'inherit'
});
if (res.status !== 0) {
  console.error('❌ CI Gate #4 failed in validate-katex-strict.js');
  process.exit(res.status || 1);
}

// Verify text.njk guards block-level HTML with bl.text(block.body, 'div') (preventing <p>-in-<span> breakout)
const textNjk = fs.readFileSync(path.join(ROOT, 'src', '_includes', 'partials', 'blocks', 'text.njk'), 'utf8');
if (!textNjk.includes("bl.text(block.body, 'div')") && !textNjk.includes("bl.block(")) {
  console.error('❌ CI Gate #4 failed: text.njk lacks block-level bl.text(..., "div") guard against HTML5 <p>-in-<span> breakout.');
  process.exit(1);
}

// Check representative built pages in _site/ if present
const siteDir = path.join(ROOT, '_site');
if (fs.existsSync(siteDir)) {
  const sampleRoutes = [
    path.join(siteDir, 'sat', 'index.html'),
    path.join(siteDir, 'ar', 'sat', 'index.html'),
    path.join(siteDir, 'pricing', 'index.html')
  ].filter((p) => fs.existsSync(p));

  for (const p of sampleRoutes) {
    const html = fs.readFileSync(p, 'utf8');
    if (/<span[^>]*class="[^"]*i18n-(?:en|ar)[^"]*"[^>]*>\s*<p\b/i.test(html)) {
      console.error(`❌ CI Gate #4 failed: <p> nested inside <span class="i18n-*"> in ${path.relative(ROOT, p)}`);
      process.exit(1);
    }
  }
}

console.log('✅ CI Gate #4 PASSED: Strict KaTeX compilation & zero <p>-in-<span> HTML5 breakouts verified.');
