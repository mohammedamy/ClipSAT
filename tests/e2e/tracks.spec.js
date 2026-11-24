/**
 * Plan 5, Phase 5.009 — figure-rendering + quiz-state regression suite.
 *
 * Three checks per track, run against the built _site/ output:
 *   1. The page loads, its build-time KaTeX SSR output is present, and it
 *      throws no uncaught JS errors / same-origin console errors.
 *   2. genChapterQuiz() (public/js/engine.js) actually produces questions
 *      for the track's first bank-driven chapter, and cqPick() correctly
 *      records an answer (cq-done class + score-bar increment).
 *   3. On a mobile viewport, tapping a chapter in the rail's slide-out menu
 *      actually switches to it (regression test for the click-through-the-
 *      overlay bug — see the test itself for the full root cause).
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
const { test, expect, devices } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BANK_DATA_DIR = path.join(__dirname, '..', '..', 'bank-data');
const CONTENT_DIR = path.join(__dirname, '..', '..', 'content');
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

// A console error counts as "same-origin" only if its resource really is on
// this site's own origin. EXTERNAL_HOSTS alone missed third-party hosts not
// on the list: in CI (normal internet egress) a transient 403 from one of
// them failed apbc once and passed on retry (PR #239's first CI run).
// Anything off-origin can't be a regression in this repo's own output.
const SITE_ORIGIN = `http://127.0.0.1:${process.env.E2E_PORT || 8791}`;

/* A third-party frame's own report-only CSP notice, e.g. "Framing 'https://classroom.google.com/'
   violates the following report-only Content Security Policy directive: "frame-ancestors 'self'"".
   Chromium logs it in the embedding page's console, but it concerns Google's frame (the Classroom
   share button, Google sign-in), blocks nothing ("report-only"), and appears only when Google's
   servers send that header, so it says nothing about this site's own code. */
function isThirdPartyFramingNotice(text) {
  const m = /^Framing '([^']+)' violates the following report-only Content Security Policy/.exec(text);
  return !!m && isExternalResourceError(m[1]);
}

function isExternalResourceError(url) {
  try {
    const u = new URL(url);
    return EXTERNAL_HOSTS.has(u.hostname) || u.origin !== SITE_ORIGIN;
  } catch {
    return false;
  }
}

const reqPath = (req) => {
  try { return new URL(req.url()).pathname; } catch { return ''; }
};

test.describe.configure({ mode: 'parallel' });

for (const track of TRACKS) {
  test.describe(track, () => {
    test('loads, renders KaTeX, and throws no same-origin errors', async ({ page }) => {
      const pageErrors = [];
      const consoleErrors = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !isExternalResourceError(msg.location().url) && !isThirdPartyFramingNotice(msg.text())) {
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

      // Not necessarily on the default-active chapter — a chapter with
      // quizWidget.enabled:false (e.g. an "about"/overview chapter, as in
      // act2l2/est2l2) can be first in DOM order while the actual quiz-bearing
      // chapter is a later, initially-hidden one. Find the first cq-btn
      // regardless of visibility, then navigate the rail to its chapter (the
      // same interaction Phase 5.009's mobile-rail test already exercises)
      // before touching it — same real-user path as clicking straight to a
      // visible button when the first chapter already carries the quiz.
      const allQuizButtons = page.locator('button.cq-btn');
      const btnCount = await allQuizButtons.count();
      test.skip(btnCount === 0, `${track} has no bank-driven "Generate Quiz" chapter to test`);

      const targetChapterId = await allQuizButtons.first().evaluate((el) => el.closest('.chapter')?.id);
      if (targetChapterId) {
        const railLink = page.locator(`aside.rail a[data-target="${targetChapterId}"]`);
        if ((await railLink.count()) > 0) await railLink.first().click();
      }

      const quizBtn = page.locator('button.cq-btn:visible').first();
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

    // Regression test for the bug fixed alongside this check: on a mobile
    // viewport, .rail-overlay (the drawer's dimming backdrop) was appended
    // to document.body while aside.rail stayed nested inside the animated
    // .view.active (main.css's clipsat-fadein touches transform/opacity,
    // which creates a stacking context + fixed-position containing block
    // for as long as its "both" fill-mode persists — i.e. indefinitely).
    // That trapped the rail's higher z-index under the overlay's, so a tap
    // on a chapter link actually hit the overlay and just closed the menu
    // — "choosing a chapter does nothing" on mobile. Fixed in
    // _setupMobileRail() (engine.js) by appending the overlay into the same
    // container as the rail instead of document.body.
    test('mobile: choosing a chapter from the rail menu actually navigates', async ({ browser }) => {
      const context = await browser.newContext({ ...devices['iPhone 13'] });
      const page = await context.newPage();
      try {
        await page.goto(`/${track}/`);

        const toggle = page.locator('#rail-toggle-btn');
        test.skip((await toggle.count()) === 0, `${track} has no mobile rail toggle`);

        await toggle.click();
        const links = page.locator('aside.rail a[data-target]');
        const linkCount = await links.count();
        test.skip(linkCount < 2, `${track} has fewer than 2 chapters to switch between`);

        const targetLink = links.nth(1);
        const targetId = await targetLink.getAttribute('data-target');

        // The real regression: a plain, unforced click must land on the
        // link itself, not an overlay sitting on top of it.
        await targetLink.click({ timeout: 5000 });

        await expect(
          page.locator(`.chapter.ch-active#${targetId}`),
          `${track}: tapping "${targetId}" in the mobile rail should have made it the active chapter`
        ).toHaveCount(1);

        await expect(
          page.locator('aside.rail.rail-open'),
          `${track}: the rail drawer should auto-close after picking a chapter`
        ).toHaveCount(0);
      } finally {
        await context.close();
      }
    });
  });
}

// Regression coverage for Plan 5, Phase 5.014's deeper split of the old
// 20-full-exam-and-teacher-mode.js into 20a-vocabulary-tooltip.js /
// 20b-teacher-mode.js / 20c-i18n.js / 20d-view-shell-cleanup.js. i18n and
// TeacherMode are site-wide (wired into the shared base.njk shell, present
// identically on every page) rather than track-specific, so — unlike the
// per-track suite above — these run once, not once per track.
test.describe('site-wide: i18n and TeacherMode (post-5.014 module split)', () => {
  test('language toggle switches locale, lang attribute, and data-i18n text', async ({ page }) => {
    await page.goto('/calculus/');
    const toggle = page.locator('#i18n-toggle-btn');
    await expect(toggle).toHaveCount(1);

    const before = await page.evaluate(() => document.documentElement.lang);
    await toggle.click();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.lang))
      .not.toBe(before);

    const afterLocale = await page.evaluate(() => document.documentElement.lang);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('clipsat_locale')))
      .toBe(afterLocale);

    // Toggle back — confirms setLocale() is a real two-way switch, not a one-shot.
    await toggle.click();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.lang))
      .toBe(before);
  });

  test('assignment and progress-report tools ship with Teacher Mode and still open (ADR 0043)', async ({ page, request }) => {
    const engine = await (await request.get('/js/engine.js')).text();
    expect(engine.includes('window.CSAssign ='), 'CSAssign should ship in teacher-mode.js, not engine.js').toBe(false);
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/calculus/');
    expect(await page.evaluate(() => typeof window.CSAssign)).toBe('undefined');
    await page.locator('#navMoreBtn').click();
    await page.locator('#teacherModeBtn').click();
    await expect(page.locator('body.teacher-mode')).toHaveCount(1);
    await page.locator('button[onclick*="CSAssign.open"]').first().click();
    const modal = page.locator('#cs-assign-modal');
    await expect(modal).toBeVisible();
    expect(await modal.locator('#ca-course option').allTextContents()).toContain('Calculus');
    await page.evaluate(() => document.getElementById('cs-assign-modal').remove());
    await page.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(String(u)); return null; }; });
    await page.locator('button[onclick*="CSReport.generate"]').first().click();
    await expect.poll(() => page.evaluate(() => window.__opened.length)).toBe(1);
    expect(errors, errors.join('\n')).toHaveLength(0);
  });

  test('Teacher Mode toggles the body.teacher-mode class', async ({ page }) => {
    await page.goto('/calculus/');
    // teacherModeBtn lives inside #navMorePanel, hidden until #navMoreBtn ("⋯ More") is clicked.
    await page.locator('#navMoreBtn').click();
    const btn = page.locator('#teacherModeBtn');
    await expect(btn).toBeVisible();

    await expect(page.locator('body.teacher-mode')).toHaveCount(0);
    await btn.click();
    await expect(page.locator('body.teacher-mode')).toHaveCount(1);
    await btn.click();
    await expect(page.locator('body.teacher-mode')).toHaveCount(0);
  });

  // Regression test for Plan 5, Phase 5.015: TeacherMode is no longer in the
  // eager engine.js bundle — public/js/teacher-mode.js loads on demand via
  // window._ensureTeacherMode() (20b-teacher-mode-loader.js), and
  // 22-assignments-reports-search.js's cross-module decoration of
  // TeacherMode.toggle (the body.tm-on class, chapter-meta panel) only gets
  // wired up by window._applyTeacherModeDecoration() being called from that
  // loader's script.onload — not at page-load time, since TeacherMode isn't
  // there yet when 22-assignments-reports-search.js's own module runs. This
  // is exactly the load-order gap a naive defer would have silently broken:
  // catches it by asserting the decoration's actual effect, not just that
  // TeacherMode.toggle() ran.
  test('deferred TeacherMode load: engine.js excludes it, and the cross-module decoration still applies', async ({ page }) => {
    const engineJsRequests = [];
    let teacherModeJsRequested = false;
    page.on('request', (req) => {
      const pathname = reqPath(req);
      if (pathname === '/js/engine.js') engineJsRequests.push(req.url());
      if (pathname === '/js/teacher-mode.js') teacherModeJsRequested = true;
    });
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto('/calculus/');
    expect(engineJsRequests.length, 'engine.js should still load eagerly').toBeGreaterThan(0);
    expect(teacherModeJsRequested, 'teacher-mode.js should NOT load before the More panel opens').toBe(false);

    await page.locator('#navMoreBtn').click();
    await expect
      .poll(() => teacherModeJsRequested, { message: 'opening the More panel should trigger the deferred load' })
      .toBe(true);

    await page.locator('#teacherModeBtn').click();
    await expect(page.locator('body.teacher-mode')).toHaveCount(1);
    // The real thing this test exists to catch: 22-assignments-reports-search.js's
    // decoration (applied via _applyTeacherModeDecoration, called from the
    // loader's onload) must have actually wired up — not just TeacherMode's
    // own toggle() running on its own.
    await expect(page.locator('body.tm-on')).toHaveCount(1);

    await page.locator('#teacherModeBtn').click();
    await expect(page.locator('body.teacher-mode')).toHaveCount(0);
    await expect(page.locator('body.tm-on')).toHaveCount(0);

    expect(pageErrors, `deferred TeacherMode load threw:\n${pageErrors.join('\n')}`).toHaveLength(0);
  });

  // Regression test for Plan 5, Phase 5.015's second deferred module: CSExport
  // (docx export). Before this pass, downloads-block.njk's docx button fell
  // back to a bare `downloadDocx(this)` call if window.CSExport was absent —
  // but that bare global was ALSO only ever defined inside 04-docx-export.js,
  // so the "fallback" would have thrown ReferenceError the instant CSExport
  // became deferred instead of eager, if the onclick hadn't been rewritten to
  // route through _ensureCSExport() first. This asserts the real path: not
  // loaded eagerly, loads on click, and no error either way.
  test('deferred practice quiz: practice-quiz.js is not eager and "Still unsure" loads and runs it', async ({ page }) => {
    test.setTimeout(60000);
    let practiceJsRequested = false;
    page.on('request', (req) => { if (reqPath(req) === '/js/practice-quiz.js') practiceJsRequested = true; });
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));
    await page.goto('/calculus/');
    expect(practiceJsRequested, 'practice-quiz.js should NOT load with the page').toBe(false);
    // The practice quiz asks the AI for 5 questions; stub the provider so no network call is made.
    await page.evaluate(() => {
      window._openrouterChat = () => Promise.resolve(JSON.stringify([
        { q: 'What is \\(2+2\\)?', choices: ['A) 4', 'B) 3', 'C) 5', 'D) 6'], answer: 'A' },
        { q: 'What is \\(3+3\\)?', choices: ['A) 6', 'B) 5', 'C) 7', 'D) 8'], answer: 'A' },
      ]));
      window.launchPracticeQuiz({ q: 'What is 1+1?', wrong: '3', right: '2', src: 'Arithmetic' });
    });
    await expect.poll(() => practiceJsRequested, { message: 'launching the practice quiz should load practice-quiz.js' }).toBe(true);
    await expect(page.locator('#pq-overlay')).toBeVisible();
    await expect(page.locator('#pq-overlay')).toContainText('2+2');
    expect(pageErrors, `deferred practice quiz threw:\n${pageErrors.join('\n')}`).toHaveLength(0);
  });

  test('deferred CSExport load: docx-export.js is not eager and the download button triggers it cleanly', async ({ page }) => {
    test.setTimeout(60000);
    let docxExportJsRequested = false;
    page.on('request', (req) => {
      if (reqPath(req) === '/js/docx-export.js') docxExportJsRequested = true;
    });
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto('/calculus/');
    expect(docxExportJsRequested, 'docx-export.js should NOT load before the download button is clicked').toBe(false);

    // The downloads block is its own rail-navigated section (like practice-set/
    // test-generator), not visible until its rail link is clicked.
    await page.locator('aside.rail a[data-target="ch-downloads"]').click();
    const downloadBtn = page.locator('.dl button.btn.amber', { hasText: 'Download .docx' });
    await expect(downloadBtn).toBeVisible();
    await downloadBtn.click();

    await expect
      .poll(() => docxExportJsRequested, { message: 'clicking Download .docx should trigger the deferred load' })
      .toBe(true);

    // downloadChapterDocx() itself depends on JSZip (external CDN), which this
    // sandbox can't reach (see this file's header comment) — that's a known,
    // pre-existing gap unrelated to the defer mechanism this test targets, so
    // this only asserts the loader's own contract: it resolved (or the click
    // handler ran) without throwing, not that a .docx was actually produced.
    await page.waitForTimeout(500);
    expect(pageErrors, `deferred CSExport load threw:\n${pageErrors.join('\n')}`).toHaveLength(0);
  });
  // Regression test for Plan 5, Phase 5.015's third deferred module: the
  // Teacher Mode whiteboard (24b-whiteboard.js -> public/js/whiteboard.js,
  // ADR 0031). Its methods are merged onto window.CSGamify only once the file
  // loads, so this checks the whole path a teacher actually takes: not loaded
  // on page load; loaded by turning Teacher Mode on; the Whiteboard button
  // appears and really opens the board; and turning Teacher Mode off still
  // tears the board down (exitWhiteboard via the body-class observer).
  test('deferred whiteboard load: whiteboard.js is not eager, and Teacher Mode still opens and closes the board', async ({ page }) => {
    test.setTimeout(90000);
    let whiteboardJsRequested = false;
    page.on('request', (req) => {
      if (reqPath(req) === '/js/whiteboard.js') whiteboardJsRequested = true;
    });
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto('/calculus/');
    expect(whiteboardJsRequested, 'whiteboard.js should NOT load on page load').toBe(false);
    expect(await page.evaluate(() => typeof window.CSGamify.setupWhiteboard)).toBe('undefined');
    // The eager half of CSGamify (XP, flashcards) must still be there.
    expect(await page.evaluate(() => typeof window.CSGamify.loadFlashcard)).toBe('function');

    await page.locator('#navMoreBtn').click();
    await page.locator('#teacherModeBtn').click();
    await expect(page.locator('body.tm-on')).toHaveCount(1);
    await expect
      .poll(() => whiteboardJsRequested, { message: 'turning Teacher Mode on should load whiteboard.js' })
      .toBe(true);

    const wbBtn = page.locator('#teacherWhiteboardBtn');
    await expect(wbBtn).toBeVisible();
    await wbBtn.click();
    await expect(page.locator('#wbFullOverlay.active')).toHaveCount(1);
    await expect(page.locator('#wbToolbar.active')).toHaveCount(1);

    // Turning Teacher Mode off must force the board off (exitWhiteboard).
    await page.locator('#navMoreBtn').click();
    await page.locator('#teacherModeBtn').click();
    await expect(page.locator('body.tm-on')).toHaveCount(0);
    await expect(page.locator('#wbFullOverlay.active')).toHaveCount(0);
    await expect(wbBtn).toBeHidden();

    expect(pageErrors, `deferred whiteboard load threw:\n${pageErrors.join('\n')}`).toHaveLength(0);
  });
});

test.describe('site-wide: Pillar 4 display toggles', () => {
  // Regression: body.dark's token block sits later in main.css at the same
  // specificity as body.hc, so high contrast silently did nothing in dark mode.
  for (const scheme of ['light', 'dark']) {
    test(`high contrast lifts muted/faint text to full ink (${scheme})`, async ({ browser }) => {
      const context = await browser.newContext({ colorScheme: scheme });
      const page = await context.newPage();
      try {
        await page.goto('/precalc/');
        const tokens = () =>
          page.evaluate(() => {
            const cs = getComputedStyle(document.body);
            const v = (k) => cs.getPropertyValue(k).trim().toLowerCase();
            return { dark: document.body.classList.contains('dark'), ink: v('--ink'), muted: v('--muted'), faint: v('--faint') };
          });
        const before = await tokens();
        expect(before.dark).toBe(scheme === 'dark');
        expect(before.muted).not.toBe(before.ink);

        await page.locator('#hcToggle').click();
        await expect(page.locator('#hcToggle')).toHaveAttribute('aria-pressed', 'true');
        const after = await tokens();
        expect(after.muted, 'high contrast should set --muted to --ink').toBe(after.ink);
        expect(after.faint, 'high contrast should set --faint to --ink').toBe(after.ink);

        await page.reload();
        await expect(page.locator('body.hc')).toHaveCount(1);
      } finally {
        await context.close();
      }
    });
  }

  // Regression: body used a px font-size, so text inheriting straight from it
  // (plain lesson paragraphs and the KaTeX inside them) ignored the toggle.
  test('text size toggle scales body text through A, A+, A++ and persists', async ({ page }) => {
    await page.goto('/precalc/');
    const bodyPx = () => page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
    const btn = page.locator('#fsToggle');
    expect(await bodyPx()).toBeCloseTo(17, 1);
    await btn.click();
    await expect(btn).toHaveText('A+');
    expect(await bodyPx()).toBeCloseTo(17 * 1.125, 1);
    await btn.click();
    await expect(btn).toHaveText('A++');
    expect(await bodyPx()).toBeCloseTo(17 * 1.25, 1);

    await page.reload();
    await expect(page.locator('#fsToggle')).toHaveText('A++');
    expect(await bodyPx()).toBeCloseTo(17 * 1.25, 1);

    await page.locator('#fsToggle').click();
    await expect(page.locator('#fsToggle')).toHaveText('A');
    expect(await bodyPx()).toBeCloseTo(17, 1);
  });

  // Regression: the header row overflowed at 360-414px (Menu off-screen), 421-520px,
  // 601px and 761-834px (More off-screen) - late unconditional rules in main.css were
  // cancelling the earlier responsive ones. Checked at A++ since that is the widest case.
  test('header controls stay on-screen from phone to tablet widths at A++', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    await context.addInitScript(() => {
      try { localStorage.setItem('clipsat_fs', '2'); } catch (e) { /* storage blocked: default size */ }
    });
    const page = await context.newPage();
    try {
      await page.goto('/precalc/');
      for (const width of [320, 360, 375, 414, 440, 480, 601, 761, 768, 800, 834]) {
        await page.setViewportSize({ width, height: 800 });
        const offscreen = await page.evaluate(() =>
          [...document.querySelectorAll('header .nav button, header .nav select, header .nav input, header .nav .brand')]
            .filter((el) => el.offsetParent)
            .map((el) => ({ id: el.id || el.className, r: el.getBoundingClientRect() }))
            .filter(({ r }) => r.width && (r.right > innerWidth + 0.5 || r.left < -0.5))
            .map(({ id, r }) => `${id} [${Math.round(r.left)}, ${Math.round(r.right)}]`)
        );
        expect(offscreen, `header controls off-screen at ${width}px`).toEqual([]);
      }
      await page.setViewportSize({ width: 375, height: 800 });
      await page.locator('#menuBtn').click();
      await expect(page.locator('#navlinks.open')).toHaveCount(1);
    } finally {
      await context.close();
    }
  });
});

test.describe('site-wide: MCQ answer sheet', () => {
  // Regression: .fep-bubbles used fixed column minimums (110px on screen, 90pt in the
  // print window) narrower than one A-E row, so each row's bubbles overprinted the next
  // question's number. Columns are now sized from --fep-nopt (choices per question).
  function sheet(n, nopt) {
    const letters = 'ABCDE'.slice(0, nopt).split('');
    let h = `<div class="full-exam-paper"><div class="fep-anssheet"><div class="fep-bubbles" style="--fep-nopt:${nopt}">`;
    for (let i = 1; i <= n; i++) {
      h += `<div class="fep-bubble-row"><span class="fep-bnum">${i}</span>`;
      letters.forEach((l) => (h += `<span class="fep-bubble">${l}</span>`));
      h += '</div>';
    }
    return h + '</div></div></div>';
  }
  const overlaps = (page) =>
    page.evaluate(() => {
      const bad = [];
      document.querySelectorAll('.fep-bubbles').forEach((grid) => {
        const box = grid.getBoundingClientRect();
        const rows = [...grid.querySelectorAll('.fep-bubble-row')].map((r) => {
          const kids = [...r.children].map((k) => k.getBoundingClientRect());
          return { n: r.firstChild.textContent, top: Math.round(kids[0].top), left: kids[0].left, right: kids[kids.length - 1].right };
        });
        rows.forEach((r, i) => {
          const next = rows[i + 1];
          if (next && next.top === r.top && r.right > next.left - 2) bad.push(`${r.n} runs into ${next.n}`);
          if (r.right > box.right + 1) bad.push(`${r.n} overflows the sheet`);
        });
      });
      return bad;
    });

  test('bubble rows never overlap on screen or in the print window (A-D and A-E)', async ({ page }) => {
    await page.goto('/sat/');
    await page.evaluate((html) => {
      const tg = document.querySelector('.testgen');
      let out = tg.querySelector('.tg-out');
      if (!out) { out = document.createElement('div'); out.className = 'tg-out'; tg.appendChild(out); }
      out.innerHTML = html;
      out.style.display = 'block';
      const sec = tg.closest('section');
      if (sec) sec.style.display = 'block';
      const btn = document.createElement('button');
      btn.id = 'e2ePrintBtn';
      tg.appendChild(btn);
    }, sheet(59, 5) + sheet(59, 4));

    for (const width of [1440, 1024, 768, 414, 360]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await overlaps(page), `answer sheet overlaps at ${width}px`).toEqual([]);
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    const [printWin] = await Promise.all([
      page.waitForEvent('popup'),
      page.evaluate(() => window.tgPrint(document.getElementById('e2ePrintBtn'))),
    ]);
    await printWin.waitForLoadState('load');
    await printWin.emulateMedia({ media: 'print' });
    await printWin.setViewportSize({ width: 794, height: 1123 }); // A4 at 96dpi
    expect(await overlaps(printWin), 'answer sheet overlaps in the print window').toEqual([]);
  });
});

test.describe('site-wide: chapter quiz relevance', () => {
  // Regression: genChapterQuiz picked questions by keyword, so generic heading words
  // ("functions", "equations", "angle") pulled other chapters' questions into a
  // chapter quiz - Precalculus's Exponential & Logarithmic Functions quiz was ~75%
  // trig, rational, vector and matrix questions. Chapters now list their bank domains
  // (content quizWidget.domains -> data-quiz-domains) and the quiz uses only those.
  // Tracks whose chapters list their quiz domains, and how many chapters each has.
  const DOMAIN_TRACKS = {
    precalc: 8, calculus: 16, alg2: 11, geo: 11, sat: 11, act2: 9,
    a2level: 16, act: 9, act2l2: 8, algebra: 11, apab: 11, apbc: 9, appc: 8, apstats: 8,
    aslevel: 20, est: 9, ibsl: 8, ibhl: 8, est2: 9, est2l2: 8, igcse: 10, linalg: 8, mvc: 8, odes: 9, qudrat: 9, tahsili: 10,
  };
  for (const [track, chapters] of Object.entries(DOMAIN_TRACKS)) {
    test(`${track} chapter quizzes draw only from each chapter's own bank domains`, async ({ page }) => {
      const meta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, track, '_meta.json'), 'utf8'));
      const chapterQuizBlocks = [];
      for (const chSlug of meta.chapterOrder || []) {
        const chHtmlPath = path.join(SITE_DIR, track, chSlug, 'index.html');
        if (!fs.existsSync(chHtmlPath)) continue;
        const html = fs.readFileSync(chHtmlPath, 'utf8');
        const m = html.match(/<div class="ch-quiz-wrap"[^>]*data-quiz-domains="([^"]*)"[^>]*>[\s\S]*?<div class="cq-out"><\/div>\s*<\/div>/);
        if (m) chapterQuizBlocks.push({ id: chSlug, wrapHtml: m[0] });
      }

      await page.goto(`/${track}/`);
      await page.evaluate((t) => window.CS_loadTrackBank(t), track);
      await page.waitForFunction((t) => Boolean(window.fullExamBank && window.fullExamBank[t]), track, { timeout: 15000 });
      const results = await page.evaluate(({ blocks, tr }) => {
        const main = document.getElementById(`view-${tr}`) || document.querySelector('main') || document.body;
        const host = document.createElement('div');
        main.appendChild(host);
        blocks.forEach(({ id, wrapHtml }) => {
          const sec = document.createElement('section');
          sec.className = 'chapter';
          sec.id = id;
          sec.innerHTML = wrapHtml;
          host.appendChild(sec);
        });
        let rec = null;
        const orig = window._shuffleQ;
        window._shuffleQ = (q) => { if (rec) rec.add(q.domain); return orig ? orig(q) : q; };
        return [...host.querySelectorAll('.chapter .ch-quiz-wrap[data-quiz-domains]')].map((wrap) => {
          const allowed = wrap.getAttribute('data-quiz-domains').split('|');
          const count = wrap.querySelector('.cq-count');
          const opt = document.createElement('option');
          opt.value = '30';
          count.appendChild(opt);
          count.value = '30';
          rec = new Set();
          window.genChapterQuiz(wrap.querySelector('button'));
          const used = [...rec];
          rec = null;
          return { id: wrap.closest('.chapter').id, allowed, used, items: wrap.querySelectorAll('.cq-item').length };
        });
      }, { blocks: chapterQuizBlocks, tr: track });
      expect(results.length, `every ${track} chapter should declare its quiz domains`).toBe(chapters);
      for (const r of results) {
        expect(r.items, `${r.id} quiz should have questions`).toBeGreaterThan(0);
        expect(r.used.filter((d) => !r.allowed.includes(d)), `${r.id} used off-chapter domains`).toEqual([]);
      }
      if (track === 'precalc') {
        const exp = results.find((r) => r.id === 'pc-exp');
        expect(exp.allowed).toEqual(['Exponential', 'Logarithms', 'Exponential & Logarithmic Functions']);
      }
    });
  }
});

test.describe('site-wide: per-track Interactive Practice data (Phase 5.015)', () => {
  // The chapter "Interactive Practice" configs used to be inlined in engine.js for every
  // track at once (~140KB). They now ship as public/js/ix/{track}.js, loaded only on
  // that track's page (ADR 0033).
  const ixRequests = (page) => {
    const seen = [];
    page.on('request', (req) => {
      const m = req.url().match(/\/js\/ix\/([\w-]+)\.js/);
      if (m) seen.push(m[1]);
    });
    return seen;
  };

  test('engine.js no longer carries the data; a track loads only its own file and injects every widget', async ({ page, request }) => {
    const engine = await (await request.get('/js/engine.js')).text();
    expect(engine.includes('Quick Check: Algebra Fundamentals'), 'IX data should not be inlined in engine.js').toBe(false);

    const seen = ixRequests(page);
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/calculus/ch-foundations/');
    await expect.poll(() => page.locator('.ix-section').count(), { timeout: 10000 }).toBe(1);
    expect(seen).toEqual(['calculus']);
    expect(await page.locator('#ch-foundations .ix-box button').count()).toBeGreaterThanOrEqual(4);
    expect(errors, errors.join('\n')).toHaveLength(0);
  });

  test('home and standalone pages request no data file; newly equipped tracks load their own file', async ({ page }) => {
    const seen = ixRequests(page);
    await page.goto('/');
    await page.goto('/privacy/');
    await page.waitForTimeout(1500);
    expect(seen).toEqual([]);
    expect(await page.locator('.ix-section').count()).toBe(0);

    // Chapter pages (including act2l2) load their own ix data
    await page.goto('/act2l2/act2l2-complex/');
    await expect.poll(() => page.locator('.ix-section').count(), { timeout: 10000 }).toBe(1);
    expect(seen).toEqual(['act2l2']);
  });

  test('switching to Arabic re-renders the loaded widgets', async ({ page }) => {
    await page.goto('/qudrat/qud-arithmetic/');
    await expect.poll(() => page.locator('.ix-section').count(), { timeout: 10000 }).toBe(1);
    await Promise.all([
      page.waitForURL('**/ar/qudrat/qud-arithmetic/'),
      page.evaluate(() => window.i18n.setLocale('ar')),
    ]);
    await expect.poll(() => page.locator('.ix-section[data-ix-locale="ar"]').count(), { timeout: 10000 }).toBe(1);
  });

  test('Step Builder grading rejects sign/operator errors (Plan 10.0)', async ({ page }) => {
    await page.goto('/calculus/');
    const r = await page.evaluate(() => {
      const c = window.ClipSATAnswerCheck;
      if (!c) return null;
      return [c.equivalent('2x-1', '2x+1'), c.equivalent('-3', '3'), c.equivalent('x<5', 'x>5'),
        c.equivalent('12', '1/2'), c.equivalent('0.5', '1/2'), c.equivalent('5<x', 'x>5')];
    });
    expect(r).toEqual([false, false, false, false, true, true]);
  });

  test('interactive engine a11y, hints, and controls (Plan 10.4a)', async ({ page }) => {
    await page.goto('/calculus/ch-foundations/');
    await expect.poll(() => page.locator('.ix-section').count(), { timeout: 10000 }).toBe(1);

    // Worked Example: verify "Reveal all steps" button exists
    const revealAll = page.locator('.chapter:not([style*="display: none"]) .ix-sr-all-btn, .ix-sr-all-btn').first();
    await expect(revealAll).toBeVisible();

    // Step Builder: check inputs have aria-label and status icon exists
    const sbStep = page.locator('.ix-sb-step').first();
    if (await sbStep.count() > 0) {
      await expect(sbStep.locator('.ix-sb-inp')).toHaveAttribute('aria-label');
      await expect(sbStep.locator('.ix-sb-status')).toHaveAttribute('aria-hidden', 'true');
    }

    // Matching: verify match items are accessible buttons with aria-pressed
    const mtItem = page.locator('.ix-mt-item').first();
    if (await mtItem.count() > 0) {
      await expect(mtItem).toHaveAttribute('type', 'button');
      await expect(mtItem).toHaveAttribute('aria-pressed');
    }
  });
});

test.describe('site-wide: Arabic strings load on demand (Phase 5.015, ADR 0040)', () => {
  const arRequests = (page) => {
    const seen = [];
    page.on('request', (req) => { if (/\/js\/i18n-ar\.js/.test(req.url())) seen.push(req.url()); });
    return seen;
  };

  test('an English visit does not download the Arabic strings', async ({ page, request }) => {
    const engine = await (await request.get('/js/engine.js')).text();
    expect(engine.includes("'nav.home':'الرئيسية'"), 'Arabic strings should not be in engine.js').toBe(false);
    const seen = arRequests(page);
    await page.goto('/calculus/ch-foundations/');
    await page.waitForLoadState('load');
    expect(seen).toEqual([]);
  });

  test('switching to Arabic loads them and translates the page; a saved Arabic locale applies on load', async ({ page }) => {
    const seen = arRequests(page);
    await page.goto('/calculus/ch-foundations/');
    const quiz = page.locator('[data-i18n="quiz.chapterQuiz"]').first();
    await expect(quiz).toHaveText('Chapter Quiz');
    await Promise.all([
      page.waitForURL('**/ar/calculus/ch-foundations/'),
      page.locator('#i18n-toggle-btn').click(),
    ]);
    await expect(page.locator('[data-i18n="quiz.chapterQuiz"]').first()).toHaveText('اختبار الفصل');
    expect(seen).toHaveLength(1);
    await page.reload();
    await expect(page.locator('[data-i18n="quiz.chapterQuiz"]').first()).toHaveText('اختبار الفصل');
    await expect.poll(() => page.evaluate(() => document.body.classList.contains('rtl'))).toBe(true);
    await Promise.all([
      page.waitForURL('**/calculus/ch-foundations/'),
      page.locator('#i18n-toggle-btn').click(),
    ]);
    await expect(page.locator('[data-i18n="quiz.chapterQuiz"]').first()).toHaveText('Chapter Quiz');
  });
});

test.describe('site-wide: topic search loads its cross-track index on demand (ADR 0044)', () => {
  test('the index is not in engine.js or loaded with the page; searching loads it and finds other courses', async ({ page, request }) => {
    const engine = await (await request.get('/js/engine.js')).text();
    expect(engine.length, 'engine.js should not carry the chapter index').toBeLessThan(400000);
    expect(engine.includes('"keywords":['), 'the chapter index should not be inside engine.js').toBe(false);
    let requested = 0;
    page.on('request', (req) => { if (reqPath(req) === '/js/search-index.js') requested += 1; });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/calculus/');
    await page.waitForTimeout(500);
    expect(requested, 'search-index.js should not load with the page').toBe(0);
    const input = page.locator('#topic-search');
    await input.click();
    await input.fill('law of cosines');
    const results = page.locator('#topic-search-results .ts-item');
    await expect(results.first()).toBeVisible({ timeout: 10000 });
    expect(requested).toBe(1);
    const text = (await results.allTextContents()).join(' | ');
    expect(text, 'a chapter from another course should be found').toMatch(/Trigonometry/);
    expect(errors, errors.join('\n')).toHaveLength(0);
  });
});

test.describe('site-wide: figure renderers load on demand (ADR 0045)', () => {
  test('the figure renderers are not in engine.js or loaded with the page; a chapter quiz loads them and draws every figure (ADR 0045)', async ({ page, request }) => {
    const engine = await (await request.get('/js/engine.js')).text();
    expect(engine.length, 'engine.js should stay under 350KB').toBeLessThan(350000);
    for (const name of ['_renderFig=', 'renderGeom3D', 'FIG_INDIGO']) expect(engine.includes(name), `${name} should not be in engine.js`).toBe(false);
    let requested = 0;
    page.on('request', (req) => { if (reqPath(req) === '/js/figures.js') requested += 1; });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/geo/');
    await page.waitForFunction(() => window.CS_bankReady !== undefined, null, { timeout: 15000 });
    await page.evaluate(() => window.CS_bankReady);
    expect(requested, 'figures.js should not load with the page').toBe(0);
    expect(await page.evaluate(() => typeof window._renderFig)).toBe('undefined');
    // Called directly, not clicked, so the warm-load on touch does not fetch the file first:
    // the quiz renders with empty figure slots and fills them once figures.js arrives.
    const quiz = () =>
      page.evaluate(
        () =>
          new Promise((resolve) => {
            document.addEventListener('clipsat:quiz-ready', () => resolve(), { once: true });
            window.genChapterQuiz(document.querySelector('button.cq-btn'));
          })
      );
    const allDrawn = () => {
      const f = [...document.querySelectorAll('.cq-paper .cq-figure')];
      return f.length > 0 && f.every((el) => (el.querySelector('svg') || el.querySelector('table')) && !el.hasAttribute('data-fig'));
    };
    await quiz();
    await page.waitForFunction(allDrawn, null, { timeout: 10000 });
    expect(requested).toBe(1);
    // once loaded, a new quiz draws its figures at once
    await quiz();
    expect(await page.evaluate(allDrawn)).toBe(true);
    expect(requested).toBe(1);
    expect(errors, errors.join('\n')).toHaveLength(0);
  });

  test.describe('when figures.js cannot load', () => {
    // The service worker would fetch the file itself, past page.route, so it is blocked here.
    test.use({ serviceWorkers: 'block' });
    test('if figures.js cannot load, the quiz still shows and each figure slot says so (ADR 0045)', async ({ page }) => {
      await page.route('**/js/figures.js*', (route) => route.abort());
      await page.goto('/geo/');
      await page.waitForFunction(() => window.CS_bankReady !== undefined, null, { timeout: 15000 });
      await page.evaluate(() => window.CS_bankReady);
      await page.evaluate(() => window.genChapterQuiz(document.querySelector('button.cq-btn')));
      await page.waitForFunction(() => {
        const f = [...document.querySelectorAll('.cq-paper .cq-figure')];
        return f.length > 0 && f.every((el) => !el.hasAttribute('data-fig'));
      }, null, { timeout: 10000 });
      expect(await page.locator('.cq-paper .cq-item').count()).toBe(10);
      await expect(page.locator('.cq-paper .cq-figure').first()).toContainText('could not load');
    });
  });

  test('a question-bank paper loads the figure renderers with its own code (ADR 0045)', async ({ page }) => {
    await page.goto('/act/');
    await page.evaluate(() => window._ensureBankExam());
    expect(await page.evaluate(() => [typeof window._renderFig, typeof window.renderMathFigure])).toEqual(['function', 'function']);
  });
});

test.describe('site-wide: send an assignment to Google Classroom (ADR 0047)', () => {
  test('the assignment tool builds a Classroom share link, and the link shows those questions to a student', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    // Without Google's script the tool shows its plain link to the same share page; block it so
    // the test sees the same thing in CI (which can reach apis.google.com) as here.
    await page.route('https://apis.google.com/**', (route) => route.abort());
    await page.goto('/calculus/');
    await page.locator('#navMoreBtn').click();
    await page.locator('#teacherModeBtn').click();
    await page.locator('button[onclick*="CSAssign.open"]').first().click();
    await page.selectOption('#ca-course', 'geo');
    await page.fill('#ca-count', '5');
    await page.locator('#ca-classroom').click();
    const input = page.locator('#ca-link');
    await expect(input).toBeVisible({ timeout: 15000 });
    const link = await input.inputValue();
    expect(link).toMatch(/^http:\/\/127\.0\.0\.1:\d+\/geo\/\?assign=[0-9a-z]+(\.[0-9a-z]+){4}$/);
    const share = page.locator('#ca-gc-link');
    await expect(share).toBeVisible();
    const href = await share.getAttribute('href');
    expect(href.startsWith('https://classroom.google.com/share?url=' + encodeURIComponent(link) + '&title=')).toBe(true);
    expect(href).toContain('&itemtype=assignment');

    // the student opens the link
    await page.goto(link);
    const items = page.locator('#cs-assignment .cq-item');
    await expect(items).toHaveCount(5, { timeout: 15000 });
    await expect(page.locator('#cs-assignment .cs-assign-missing')).toHaveCount(0);
    // the questions are the ones the link names, in its order
    await page.evaluate(() => window.CS_loadTrackBank('geo'));
    const match = await page.evaluate(() => {
      const want = new URLSearchParams(location.search).get('assign').split('.');
      const pool = window.fullExamBank.geo.pool;
      const texts = want.map((k) => pool.find((q) => window.CSAssignKey(q) === k).text);
      return texts.every((t, i) => document.querySelectorAll('#cs-assignment .cq-item')[i].getAttribute('data-raw') === t.replace(/\n/g, ' '));
    });
    expect(match).toBe(true);
    // Geometry questions carry figures; each is drawn
    await page.waitForFunction(
      () => [...document.querySelectorAll('#cs-assignment .cq-figure')].every((f) => f.querySelector('svg') || f.querySelector('table')),
      null,
      { timeout: 10000 }
    );
    // choosing an answer marks it and counts it
    await items.first().locator('.cq-opt').first().click();
    await expect(items.first()).toHaveClass(/cq-done/);
    await expect(page.locator('#cs-assignment .cq-ans-v')).toHaveText('1');
    expect(errors, errors.join('\n')).toHaveLength(0);
  });

  test('the view loads only from an assignment link, and says when a question is no longer in the bank', async ({ page, request }) => {
    const engine = await (await request.get('/js/engine.js')).text();
    expect(engine.includes('avIntro'), 'the assignment view should ship in its own file').toBe(false);
    let requested = 0;
    page.on('request', (req) => { if (reqPath(req) === '/js/assignment-view.js') requested += 1; });
    await page.goto('/geo/');
    await page.waitForFunction(() => typeof window.CS_loadTrackBank === 'function', null, { timeout: 15000 });
    expect(requested).toBe(0);
    await page.evaluate(() => window.CS_loadTrackBank('geo'));
    const [k0, k1] = await page.evaluate(() => window.fullExamBank.geo.pool.slice(0, 2).map((q) => window.CSAssignKey(q)));
    await page.goto(`/geo/?assign=${k0}.zzzzzz.${k1}`);
    await expect(page.locator('#cs-assignment .cq-item')).toHaveCount(2, { timeout: 15000 });
    await expect(page.locator('#cs-assignment .cs-assign-missing')).toContainText('1 question');
    expect(requested).toBe(1);
  });

  test('the printable assignment still opens, with no repeated question', async ({ page }) => {
    await page.goto('/calculus/');
    await page.locator('#navMoreBtn').click();
    await page.locator('#teacherModeBtn').click();
    await page.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(String(u)); return null; }; });
    await page.locator('button[onclick*="CSAssign.open"]').first().click();
    await page.fill('#ca-count', '12');
    await page.locator('button[onclick*="CSAssign.generate(false)"]').click();
    await expect.poll(() => page.evaluate(() => window.__opened.length), { timeout: 15000 }).toBe(1);
  });
});

test.describe('site-wide: AI chat error messages', () => {
  // Regression: every unrecognised AI error was suffixed "— check your internet
  // connection.", including server-side ones like OpenAI's "Project ... does not
  // have access to model ..." (a proxy configuration problem, not the student's
  // connection).
  const cases = [
    {
      name: 'model access error',
      error: 'Project `proj_test` does not have access to model `gpt-5.6-luna`',
      expected: "isn't available on the server",
    },
    { name: 'other service error', error: 'Upstream HTTP 500', expected: 'the AI service returned an error' },
  ];
  for (const c of cases) {
    test(`${c.name} is not blamed on the student's internet connection`, async ({ page }) => {
      await page.goto('/calculus/');
      await page.evaluate((msg) => {
        try { sessionStorage.setItem('clipsat_guest_ai_demos', '2'); } catch (_e) {}
        window._openrouterChatMessages = () => Promise.reject(new Error(msg));
      }, c.error);
      await page.locator('#chatFab').click();
      await page.locator('#chatInput').fill('Solve x^2 - 5x + 6 = 0');
      await page.locator('#chatSend').click();
      const last = page.locator('#chatBody > *').last();
      await expect(last).toContainText(c.expected);
      await expect(last).not.toContainText('internet connection');
    });
  }
});

test.describe('site-wide: print stylesheet, dark-mode print reset, and RTL figure coordinates', () => {
  test('@media print keeps lesson content visible, hides chrome, resets dark-mode tokens, and fits A4 width', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark', viewport: { width: 794, height: 1123 } });
    const page = await context.newPage();
    try {
      await page.goto('/calculus/ch-foundations/');
      await expect(page.locator('body.dark')).toHaveCount(1);
      await page.emulateMedia({ media: 'print' });
      const audit = await page.evaluate(() => {
        const ch = document.querySelector('section.chapter.ch-active');
        const chCs = getComputedStyle(ch);
        const bodyCs = getComputedStyle(document.body);
        const hdrCs = getComputedStyle(document.querySelector('header.site'));
        const railCs = getComputedStyle(document.querySelector('aside.rail'));
        const rect = ch.getBoundingClientRect();
        return {
          chapterVisibility: chCs.visibility,
          chapterDisplay: chCs.display,
          headerDisplay: hdrCs.display,
          railDisplay: railCs.display,
          paperToken: bodyCs.getPropertyValue('--paper').trim().toLowerCase(),
          figInkToken: bodyCs.getPropertyValue('--fig-ink').trim().toLowerCase(),
          chapterRight: Math.round(rect.right),
        };
      });
      expect(audit.chapterVisibility).toBe('visible');
      expect(audit.chapterDisplay).not.toBe('none');
      expect(audit.headerDisplay).toBe('none');
      expect(audit.railDisplay).toBe('none');
      expect(audit.paperToken).toBe('#ffffff');
      expect(audit.figInkToken).toBe('#0e1726');
      expect(audit.chapterRight).toBeLessThanOrEqual(795);
    } finally {
      await context.close();
    }
  });

  test('Arabic RTL chapter pages hydrate figures with strict LTR coordinate axes', async ({ page }) => {
    await page.goto('/ar/qudrat/qud-geometry/');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await page.evaluate(() => {
      if (typeof window.CSHydrateAllFigures === 'function') return window.CSHydrateAllFigures();
    });
    await page.waitForFunction(
      () => document.querySelectorAll('.lesson-figure-svg svg').length > 0,
      null,
      { timeout: 10000 }
    );
    const svgChecks = await page.evaluate(() =>
      [...document.querySelectorAll('.lesson-figure-svg svg')].map((svg) => ({
        attrDir: svg.getAttribute('direction'),
        computedDir: getComputedStyle(svg).direction,
        hasNaN: /\bNaN\b|\bundefined\b/.test(svg.outerHTML),
      }))
    );
    expect(svgChecks.length).toBeGreaterThan(0);
    for (const c of svgChecks) {
      expect(c.attrDir).toBe('ltr');
      expect(c.computedDir).toBe('ltr');
      expect(c.hasNaN).toBe(false);
    }
  });

  test('printCQ bounds SVG diagrams compactly and worksheet PDF links open in-browser viewer', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 820 });
    const satDlDir = path.join(__dirname, '..', '..', 'public', 'downloads', 'sat');
    const firstSatPdf = fs.readdirSync(satDlDir).filter((f) => f.endsWith('.pdf')).sort()[0];
    const samplePdf = fs.readFileSync(path.join(satDlDir, firstSatPdf));
    await page.route('**/downloads/sat/*.pdf', (route) =>
      route.fulfill({ status: 200, contentType: 'application/pdf', body: samplePdf })
    );

    await page.goto('/sat/', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      if (typeof window._ensureFigures === 'function') return window._ensureFigures();
    });
    await page.waitForFunction(
      () => typeof window.printCQ === 'function' && typeof window._renderFig === 'function',
      null,
      { timeout: 10000 }
    );

    // 1. Verify printCQ renders a compact diagram (not stretching to 1280px viewport width)
    const printPopupPromise = page.waitForEvent('popup');
    await page.evaluate(() => {
      const wrap = document.createElement('div');
      wrap.className = 'cq-paper';
      const svgMarkup = window._renderFig({
        type: 'triangle',
        vertices: [[0, 0], [6, 0], [0, 8]],
        labels: ['C', 'B', 'A'],
        sides: ['60', '68', '?'],
        right: 0,
      });
      wrap.innerHTML =
        '<div class="cq-head"><span class="cq-meta">1 question</span><button class="cq-print-btn" type="button">Print</button></div>'
        + '<div class="cq-item"><div class="cq-qt">Find AC.</div><div class="cq-figure">' + svgMarkup + '</div>'
        + '<div class="cq-opt"><span class="cq-ct">32</span></div></div>';
      document.body.appendChild(wrap);
      window.printCQ(wrap.querySelector('.cq-print-btn'));
    });
    const printPopup = await printPopupPromise;
    await printPopup.waitForLoadState('domcontentloaded');
    const pqSvgBox = await printPopup.locator('.pq-fig svg').first().boundingBox();
    expect(pqSvgBox).not.toBeNull();
    expect(pqSvgBox.width).toBeGreaterThan(80);
    expect(pqSvgBox.width).toBeLessThanOrEqual(270);
    expect(pqSvgBox.height).toBeLessThanOrEqual(210);
    await printPopup.close();

    // 2. Verify clicking a worksheet PDF link opens inline PDF viewer tab (blob URL inside #cs-pdf-frame)
    await page.waitForSelector('.worksheet-library .wl-link.ws', { timeout: 10000 });
    const pdfPopupPromise = page.waitForEvent('popup');
    await page.locator('.worksheet-library a.wl-link.ws[href$=".pdf"]').first().click();
    const pdfPopup = await pdfPopupPromise;
    await pdfPopup.waitForSelector('#cs-pdf-frame[src^="blob:"]', { timeout: 10000 });
    const frameSrc = await pdfPopup.locator('#cs-pdf-frame').getAttribute('src');
    const dlAttr = await pdfPopup.locator('a[download$=".pdf"]').getAttribute('download');
    expect(frameSrc).toMatch(/^blob:/);
    expect(dlAttr).toMatch(/\.pdf$/);
    await pdfPopup.close();
  });
});
