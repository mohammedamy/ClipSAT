/**
 * Pillar 4 — automated WCAG 2.1 AA sweep (axe-core), home page + every track.
 *
 * Each page is scanned with EVERY chapter forced visible, not just the one
 * the page opens on: chapters are panel-mode (display:none until chosen in
 * the rail), and axe skips hidden content, so a default-view scan only ever
 * checks one chapter per track and reported zero violations while 20+
 * chapters of real content went unchecked. Forcing .chapter visible checks
 * all of it in one pass per page instead of one pass per chapter.
 *
 * Both colour schemes are scanned because body.dark / the theme switcher
 * swap every text and background token, so a contrast pass in light mode
 * says nothing about dark mode.
 *
 * Tags: wcag2a, wcag2aa, wcag21a, wcag21aa — the WCAG 2.1 AA conformance
 * target on the roadmap. Best-practice-only rules are deliberately not
 * included; they are advisory, not conformance failures.
 */
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs');
const path = require('path');

const BANK_DATA_DIR = path.join(__dirname, '..', '..', 'bank-data');
const SITE_DIR = path.join(__dirname, '..', '..', '_site');

// Same track discovery as tracks.spec.js: bank-data/*.json filtered to
// tracks that actually built a page.
const TRACKS = fs
  .readdirSync(BANK_DATA_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .filter((track) => fs.existsSync(path.join(SITE_DIR, track, 'index.html')))
  .sort();

const PAGES = [{ name: 'home', url: '/' }, ...TRACKS.map((t) => ({ name: t, url: `/${t}/` }))];
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

function describeViolations(violations) {
  return violations
    .map((v) => {
      const nodes = v.nodes
        .slice(0, 5)
        .map((n) => `    - ${n.target.join(' ')}\n      ${(n.failureSummary || '').split('\n').slice(1).join(' ').trim()}`)
        .join('\n');
      const more = v.nodes.length > 5 ? `\n    … and ${v.nodes.length - 5} more` : '';
      return `  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'})\n${nodes}${more}`;
    })
    .join('\n');
}

test.describe.configure({ mode: 'parallel' });

for (const scheme of ['light', 'dark']) {
  for (const pg of PAGES) {
    test(`a11y (${scheme}): ${pg.name} has no WCAG 2.1 AA violations`, async ({ browser }) => {
      // A track page with every chapter visible is a large DOM (thousands of
      // KaTeX nodes), so axe needs well over the suite's default 30s.
      test.setTimeout(240000);
      // axe-core/playwright requires a page from browser.newContext().
      const context = await browser.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } });
      const page = await context.newPage();
      try {
        await page.goto(pg.url, { waitUntil: 'load' });
        await page.addStyleTag({ content: '.chapter{display:block!important}' });
        // Newly visible wide equations only become scrollable (and so only
        // need a tab stop) once laid out — run the same sync the page runs
        // on every chapter switch (src/scripts/modules/26-scroll-region-a11y.js).
        await page.evaluate(() => window.CS_syncScrollFocus && window.CS_syncScrollFocus());

        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
        expect(
          results.violations,
          `${pg.name} (${scheme}) has WCAG 2.1 AA violations:\n${describeViolations(results.violations)}`
        ).toEqual([]);
      } finally {
        await context.close();
      }
    });
  }
}
