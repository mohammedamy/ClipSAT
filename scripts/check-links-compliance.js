#!/usr/bin/env node
/**
 * scripts/check-links-compliance.js
 * Scans generated HTML pages in _site for internal link validity, ensuring zero 404s.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const siteDir = path.join(__dirname, '..', '_site');
const pages = [
  'index.html',
  'about/index.html',
  'trust/index.html',
  'pricing/index.html',
  'privacy/index.html',
  'terms/index.html',
  'cookies/index.html',
  'contact/index.html'
];

console.log('── Checking internal links across policy & compliance pages ──\n');

let totalChecked = 0;
let errors = 0;

pages.forEach(relPage => {
  const fullPagePath = path.join(siteDir, relPage);
  if (!fs.existsSync(fullPagePath)) {
    console.error(`Missing page: ${relPage}`);
    errors++;
    return;
  }

  let html = fs.readFileSync(fullPagePath, 'utf8');
  // Strip <script> and <style> contents so inline JS templates aren't parsed as static hrefs
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Match href="/..."
  const hrefMatches = html.matchAll(/href="(\/[^"#?]*)(?:#[^"]*)?(?:\?[^"]*)?"/g);

  for (const match of hrefMatches) {
    const targetUrl = match[1];
    totalChecked++;

    // Check if target exists in _site
    let testPath;
    if (targetUrl.endsWith('/')) {
      testPath = path.join(siteDir, targetUrl, 'index.html');
    } else if (path.extname(targetUrl)) {
      testPath = path.join(siteDir, targetUrl);
    } else {
      testPath = path.join(siteDir, targetUrl, 'index.html');
      if (!fs.existsSync(testPath)) {
        testPath = path.join(siteDir, targetUrl + '.html');
      }
    }

    if (!fs.existsSync(testPath)) {
      console.error(`[404 Broken Link] in ${relPage}: ${targetUrl} (looked at ${testPath})`);
      errors++;
    }
  }
});

console.log(`Checked ${totalChecked} internal links across ${pages.length} pages: ${errors} errors.`);
if (errors > 0) {
  process.exit(1);
} else {
  console.log('✅ All internal links resolved successfully (0 broken links, 0 404s)!');
}
