#!/usr/bin/env node
/**
 * check-shell-sync.js — ClipSAT WP3 (docs/PHASE1-2_TARGET_ARCHITECTURE.md)
 *
 * index.html's own <header class="site">/<footer class="site"> and build.js's baseNjk
 * template's <header class="site">/<footer class="site"> are two INDEPENTENTLY
 * hand-maintained copies of the same shell markup — only the baseNjk copy actually ships
 * (see the warning comments at index.html's header/footer and build.js's baseNjk header/
 * footer). They drifted out of sync for months before a 2026-08-12 audit caught it
 * (3 missing social icons, a missing Teacher-Mode whiteboard button) — see docs/INVENTORY.md
 * §2 and §Executive-summary. "There is currently no tooling that does this for you" per
 * build.js's own comment, until this script.
 *
 * This does NOT decide which copy is authoritative or delete either one — that's a bigger
 * call (does index.html still get opened directly for preview? unconfirmed) left for a
 * future decision. It only makes drift LOUD instead of silent: extracts a structural
 * fingerprint (element ids, external link hrefs, data-i18n keys) from each copy and fails
 * with a clear diff if they've diverged.
 *
 * Usage: node scripts/check-shell-sync.js   (exit 0 = in sync, exit 1 = drift found)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX_HTML = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const BUILD_JS = fs.readFileSync(path.join(ROOT, 'build.js'), 'utf8');

function extractBetween(text, startMarker, endMarker, fromIndex = 0) {
  const start = text.indexOf(startMarker, fromIndex);
  if (start === -1) throw new Error(`Could not find "${startMarker}" — aborting, do not guess.`);
  const end = text.indexOf(endMarker, start);
  if (end === -1) throw new Error(`Could not find "${endMarker}" after "${startMarker}" — aborting.`);
  return text.slice(start, end + endMarker.length);
}

// index.html's copies are the FIRST <header class="site">/<footer class="site"> in the file.
const idxHeader = extractBetween(INDEX_HTML, '<header class="site">', '</header>');
const idxFooter = extractBetween(INDEX_HTML, '<footer class="site">', '</footer>');
// build.js's baseNjk copies are inside the template literal, same tag pattern.
const bjHeader = extractBetween(BUILD_JS, '<header class="site">', '</header>');
const bjFooter = extractBetween(BUILD_JS, '<footer class="site">', '</footer>');

function fingerprint(html) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const externalHrefs = [...html.matchAll(/\bhref="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const i18nKeys = [...html.matchAll(/data-i18n(?:-attr)?="([^"]+)"/g)].map((m) => m[1]);
  return {
    ids: new Set(ids),
    externalHrefs: new Set(externalHrefs),
    i18nKeys: new Set(i18nKeys),
  };
}

function diffSets(nameA, setA, nameB, setB) {
  const onlyInA = [...setA].filter((x) => !setB.has(x));
  const onlyInB = [...setB].filter((x) => !setA.has(x));
  const lines = [];
  if (onlyInA.length) lines.push(`  in ${nameA} but NOT ${nameB}: ${onlyInA.join(', ')}`);
  if (onlyInB.length) lines.push(`  in ${nameB} but NOT ${nameA}: ${onlyInB.join(', ')}`);
  return lines;
}

function compare(section, idxHtml, bjHtml) {
  const a = fingerprint(idxHtml);
  const b = fingerprint(bjHtml);
  const problems = [
    ...diffSets(`index.html ${section}`, a.ids, `build.js baseNjk ${section}`, b.ids).map((l) => `  [ids] ${l.trim()}`),
    ...diffSets(`index.html ${section}`, a.externalHrefs, `build.js baseNjk ${section}`, b.externalHrefs).map((l) => `  [external links] ${l.trim()}`),
    ...diffSets(`index.html ${section}`, a.i18nKeys, `build.js baseNjk ${section}`, b.i18nKeys).map((l) => `  [i18n keys] ${l.trim()}`),
  ];
  return problems;
}

const headerProblems = compare('header', idxHeader, bjHeader);
const footerProblems = compare('footer', idxFooter, bjFooter);
const all = [...headerProblems, ...footerProblems];

if (all.length === 0) {
  console.log('✅ index.html and build.js baseNjk header/footer are structurally in sync (ids, external links, i18n keys match).');
  process.exit(0);
} else {
  console.error('❌ index.html and build.js baseNjk header/footer have drifted out of sync:\n');
  console.error(all.join('\n'));
  console.error('\nboth copies are hand-maintained (see the warning comments at each) — mirror the change in the other one, then re-run this check.');
  process.exit(1);
}
