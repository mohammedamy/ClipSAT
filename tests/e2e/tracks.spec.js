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

function isExternalResourceError(url) {
  try {
    const u = new URL(url);
    return EXTERNAL_HOSTS.has(u.hostname) || u.origin !== SITE_ORIGIN;
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
      const url = req.url();
      if (url.endsWith('/js/engine.js')) engineJsRequests.push(url);
      if (url.endsWith('/js/teacher-mode.js')) teacherModeJsRequested = true;
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
  test('deferred CSExport load: docx-export.js is not eager and the download button triggers it cleanly', async ({ page }) => {
    let docxExportJsRequested = false;
    page.on('request', (req) => {
      if (req.url().endsWith('/js/docx-export.js')) docxExportJsRequested = true;
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
    let whiteboardJsRequested = false;
    page.on('request', (req) => {
      if (req.url().endsWith('/js/whiteboard.js')) whiteboardJsRequested = true;
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
  const DOMAIN_TRACKS = { precalc: 8, calculus: 16 };
  for (const [track, chapters] of Object.entries(DOMAIN_TRACKS)) {
    test(`${track} chapter quizzes draw only from each chapter's own bank domains`, async ({ page }) => {
      await page.goto(`/${track}/`);
      await page.waitForFunction((t) => window.fullExamBank && window.fullExamBank[t], track, { timeout: 15000 });
      const results = await page.evaluate(() => {
        let rec = null;
        const orig = window._shuffleQ;
        window._shuffleQ = (q) => { if (rec) rec.add(q.domain); return orig ? orig(q) : q; };
        return [...document.querySelectorAll('.chapter .ch-quiz-wrap[data-quiz-domains]')].map((wrap) => {
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
      });
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
    await page.goto('/calculus/');
    await expect.poll(() => page.locator('.ix-section').count(), { timeout: 10000 }).toBe(16);
    expect(seen).toEqual(['calculus']);
    expect(await page.locator('#ch-foundations .ix-box button').count()).toBeGreaterThanOrEqual(4);
    expect(errors, errors.join('\n')).toHaveLength(0);
  });

  test('home and a track without Interactive Practice request no data file', async ({ page }) => {
    const seen = ixRequests(page);
    await page.goto('/');
    await page.goto('/act2l2/');
    await page.waitForTimeout(1500);
    expect(seen).toEqual([]);
    expect(await page.locator('.ix-section').count()).toBe(0);
  });

  test('switching to Arabic re-renders the loaded widgets', async ({ page }) => {
    await page.goto('/qudrat/');
    await expect.poll(() => page.locator('.ix-section').count(), { timeout: 10000 }).toBe(8);
    await page.evaluate(() => window.i18n.setLocale('ar'));
    await expect.poll(() => page.locator('.ix-section[data-ix-locale="ar"]').count()).toBe(8);
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
