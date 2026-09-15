/**
 * Plan 5, Phase 5.009 — figure-rendering + quiz-state regression suite.
 *
 * Two checks per track, run against the built _site/ output:
 *   1. The page loads, its build-time KaTeX SSR output is present, and it
 *      throws no uncaught JS errors / same-origin console errors.
 *   2. genChapterQuiz() (public/js/engine.js) actually produces questions
 *      for the track's first bank-driven chapter, and cqPick() correctly
 *      records an answer (cq-done class + score-bar increment).
 *
 * Both hooks were picked from engine.js itself rather than guessed:
 *   - window.CS_bankReady is the promise CS_loadTrackBank() assigns
 *     (engine.js ~L2666) — awaiting it avoids racing the bank-data fetch,
 *     which is what made an early manual pass look "broken" when it
 *     wasn't (see AGENTS.md / plan5 PR description for the false alarm).
 *   - the 'clipsat:quiz-ready' CustomEvent (engine.js ~L9353) is what
 *     genChapterQuiz() dispatches once it finishes rendering, so tests
 *     wait on that instead of polling for DOM nodes.
 *
 * Known environment gap: cdnjs.cloudflare.com / cdn.jsdelivr.net /
 * apis.google.com are unreachable from Claude Code's own sandboxed dev
 * container (outbound network policy), so KaTeX's *live* auto-render,
 * Supabase, and Google Sign-In never load there and are excluded from
 * the console-error assertion below. None of that affects this suite's
 * actual job (catching a monolith-split regression) because build-time
 * KaTeX SSR and genChapterQuiz/cqPick are same-origin, dependency-free
 * vanilla JS. In GitHub Actions or a normal dev machine, with ordinary
 * internet egress, those libraries load and this suite exercises the
 * real thing end to end.
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BANK_DATA_DIR = path.join(__dirname, '..', '..', 'bank-data');
const SITE_DIR = path.join(__dirname, '..', '..', '_site');

// bank-data/*.json is the real source of truth for "what track exists" —
// it's what CS_loadTrackBank()/genChapterQuiz() read from, and unlike
// scanning _site/ it can't accidentally pick up copied asset directories
// (css/, js/, bank-data/, downloads/, worksheet-data/, ...).
const TRACKS = fs
  .readdirSync(BANK_DATA_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''))
  .filter((track) => fs.existsSync(path.join(SITE_DIR, track, 'index.html')))
  .sort();

const EXTERNAL_HOSTS = new Set([
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'apis.google.com',
  'accounts.google.com',
  'www.googletagmanager.com',
  'www.google-analytics.com',
]);

function isExternalResourceError(url) {
  try {
    return EXTERNAL_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

test.describe.configure({ mode: 'parallel' });

for (const track of TRACKS) {
  test.describe(track, () => {
    test('loads, renders KaTeX, and throws no same-origin errors', async ({ page }) => {
      const pageErrors = [];
      const consoleErrors = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !isExternalResourceError(msg.location().url)) {
          consoleErrors.push(msg.text());
        }
      });

      const response = await page.goto(`/${track}/`);
      expect(response?.status(), `${track} should return HTTP 200`).toBe(200);

      const bodyClass = await page.locator('body').getAttribute('class');
      expect(bodyClass || '', `${track} body should carry its track class`).toMatch(
        new RegExp(`\\btrack-${track}\\b`)
      );

      const katexCount = await page.locator('.katex').count();
      expect(katexCount, `${track} should have build-time KaTeX SSR output (Phase 5.006)`).toBeGreaterThan(0);

      expect(pageErrors, `${track} threw uncaught JS errors:\n${pageErrors.join('\n')}`).toHaveLength(0);
      expect(
        consoleErrors,
        `${track} logged same-origin console errors:\n${consoleErrors.join('\n')}`
      ).toHaveLength(0);
    });

    test('generates a chapter quiz and records an answer', async ({ page }) => {
      await page.addInitScript(() => {
        document.addEventListener(
          'clipsat:quiz-ready',
          () => {
            window.__quizReady = true;
          },
          { once: true }
        );
      });

      await page.goto(`/${track}/`);

      // genChapterQuiz reads window.fullExamBank, which CS_loadTrackBank()
      // populates asynchronously — wait for its promise, don't guess a delay.
      await page.waitForFunction(() => window.CS_bankReady !== undefined, null, { timeout: 15000 });
      await page.evaluate(() => window.CS_bankReady);

      const quizButtons = page.locator('button.cq-btn');
      const btnCount = await quizButtons.count();
      test.skip(btnCount === 0, `${track} has no bank-driven "Generate Quiz" chapters to test`);

      const quizBtn = quizButtons.first();
      await quizBtn.scrollIntoViewIfNeeded();
      await quizBtn.click();
      await page.waitForFunction(() => window.__quizReady === true, null, { timeout: 10000 });

      const wrap = quizBtn.locator('xpath=ancestor::*[contains(concat(" ", @class, " "), " ch-quiz-wrap ")]');
      const out = wrap.locator('.cq-out');

      await expect(
        out.locator('.cq-msg'),
        `${track}'s first quiz-bank chapter produced no questions`
      ).toHaveCount(0);

      const items = out.locator('.cq-item');
      const itemCount = await items.count();
      expect(itemCount, `${track} generated an empty quiz`).toBeGreaterThan(0);

      const firstItem = items.first();
      await firstItem.locator('.cq-opt').first().click();
      await expect(firstItem, `${track}: cqPick() should mark the question answered`).toHaveClass(/cq-done/);
      await expect(
        out.locator('.cq-ans-v'),
        `${track}: score bar should reflect the recorded answer`
      ).toHaveText('1');
    });
  });
}
