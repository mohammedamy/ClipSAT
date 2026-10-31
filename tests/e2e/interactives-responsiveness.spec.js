/**
 * E2E verification of interactive graph relevance, High-DPR pointer dragging,
 * hidden-chapter canvas rendering, nested-KaTeX delegation, and 360px mobile polish.
 */
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('interactives: High-DPR drag, hidden chapters, relevance & mobile responsiveness', () => {
  test('High-DPR (2x) pointer dragging works on Olympiad, Tahsili composite, and Algebra canvases with 0 errors', async ({ browser }) => {
    test.setTimeout(90000);
    const context = await browser.newContext({
      viewport: { width: 1280, height: 860 },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));

    try {
      // 1. Olympiad lab drag (verifies chApi.check fix + 2x DPR coordinates)
      await page.goto('/olympiad/', { waitUntil: 'load' });
      const olyCanvas = page.locator('#olalgebraictechniquesExCanvas');
      await olyCanvas.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      const olyBox = await olyCanvas.boundingBox();
      expect(olyBox && olyBox.width > 100 && olyBox.height > 100).toBe(true);
      const olyBefore = await olyCanvas.evaluate((c) => c.toDataURL());
      await page.mouse.move(olyBox.x + olyBox.width * 0.35, olyBox.y + olyBox.height * 0.45);
      await page.mouse.down();
      await page.mouse.move(olyBox.x + olyBox.width * 0.72, olyBox.y + olyBox.height * 0.35, { steps: 6 });
      await page.mouse.up();
      await page.waitForTimeout(150);
      const olyAfter = await olyCanvas.evaluate((c) => c.toDataURL());
      expect(olyAfter).not.toEqual(olyBefore);
      expect(errors, 'Zero pageerrors during Olympiad drag').toEqual([]);

      // 2. Tahsili Weighted Admission Composite lab (tahScoreCanvas on tah-about)
      await page.goto('/tahsili/', { waitUntil: 'load' });
      const tahCanvas = page.locator('#tahScoreCanvas');
      await expect(tahCanvas).toBeVisible();
      await tahCanvas.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      const tahCompBefore = await page.locator('#tahScoreComp').textContent();
      const tahBox = await tahCanvas.boundingBox();
      expect(tahBox && tahBox.width > 100).toBe(true);
      await page.mouse.move(tahBox.x + tahBox.width * 0.72, tahBox.y + tahBox.height * 0.45);
      await page.mouse.down();
      await page.mouse.move(tahBox.x + tahBox.width * 0.72, tahBox.y + tahBox.height * 0.18, { steps: 5 });
      await page.mouse.up();
      await page.waitForTimeout(150);
      const tahCompAfter = await page.locator('#tahScoreComp').textContent();
      expect(tahCompAfter && tahCompAfter.trim().length > 0).toBe(true);
      expect(tahCompAfter).not.toEqual(tahCompBefore);

      // 3. Algebra lineCanvas High-DPR drag on y-intercept (0, 1) -> (0, -2) updates canvas & readout
      await page.goto('/algebra/', { waitUntil: 'load' });
      await page.locator('aside.rail a[data-target="ag-linear"]').click();
      await page.waitForTimeout(200);
      const lineCanvas = page.locator('#lineCanvas');
      await lineCanvas.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      const lBox = await lineCanvas.boundingBox();
      const lineYintBefore = await page.locator('#lineYint').textContent();
      const lineSnapBefore = await lineCanvas.evaluate((c) => c.toDataURL());
      const startX = lBox.x + 30 + (lBox.width - 42) * 0.5;
      const startY = lBox.y + 14 + (lBox.height - 40) * (5 / 12); // (0, 1) in [-6, 6]
      const endY = lBox.y + 14 + (lBox.height - 40) * (8 / 12);   // (0, -2) in [-6, 6]
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX, endY, { steps: 6 });
      await page.mouse.up();
      await page.waitForTimeout(150);
      const lineSnapAfter = await lineCanvas.evaluate((c) => c.toDataURL());
      const lineYintAfter = await page.locator('#lineYint').textContent();
      expect(lineSnapAfter).not.toEqual(lineSnapBefore);
      expect(lineYintAfter).not.toEqual(lineYintBefore);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test('Hidden chapters render _buildGP / _buildFN canvases on switch and keep mainfn <select> synchronized', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));

    // 1. SAT -> switch to hidden chapter sat-quad
    await page.goto('/sat/', { waitUntil: 'load' });
    await page.locator('aside.rail a[data-target="sat-quad"]').click();
    await page.waitForTimeout(250);

    // Check mainfn <select> defaults to quadratic (not exponential)
    const satMainFnVal = await page.locator('#uge_satquad_mainfnFn').inputValue();
    expect(satMainFnVal).toBe('quadratic');

    // Check all IX canvases inside #sat-quad have non-zero clientWidth/width after becoming visible
    const satIxCanvases = await page.evaluate(async () => {
      const sec = document.getElementById('sat-quad');
      const cvs = Array.from(sec.querySelectorAll('.ix-box canvas'));
      for (const c of cvs) c.scrollIntoView({ block: 'center' });
      await new Promise((r) => setTimeout(r, 250));
      return cvs.map((c) => ({ cw: c.clientWidth, ch: c.clientHeight, w: c.width, h: c.height }));
    });
    expect(satIxCanvases.length).toBeGreaterThan(0);
    for (const dim of satIxCanvases) {
      expect(dim.cw).toBeGreaterThan(120);
      expect(dim.w).toBeGreaterThan(120);
    }

    // 2. Alg2 -> switch to hidden chapter a2-rational and verify rational default
    await page.goto('/alg2/', { waitUntil: 'load' });
    await page.locator('aside.rail a[data-target="a2-rational"]').click();
    await page.waitForTimeout(200);
    const alg2MainFnVal = await page.locator('#uge_a2rational_mainfnFn').inputValue();
    expect(alg2MainFnVal).toBe('rational');

    // 3. AP Precalculus -> switch to appc-u4 and verify Parametric Projectile Trajectory FN activity renders
    await page.goto('/appc/', { waitUntil: 'load' });
    await page.locator('aside.rail a[data-target="appc-u4"]').click();
    await page.waitForTimeout(250);
    const hasParametricFn = await page.evaluate(async () => {
      const sec = document.getElementById('appc-u4');
      const cvs = Array.from(sec.querySelectorAll('.ix-box canvas'));
      for (const c of cvs) c.scrollIntoView({ block: 'center' });
      await new Promise((r) => setTimeout(r, 250));
      return {
        textMatch: /Parametric Projectile Trajectory/i.test(sec.textContent || ''),
        canvasesReady: cvs.every((c) => c.width > 120 && c.height > 100)
      };
    });
    expect(hasParametricFn.textMatch).toBe(true);
    expect(hasParametricFn.canvasesReady).toBe(true);
    expect(errors).toEqual([]);
  });

  test('Nested KaTeX click inside .ia-match-item delegates properly and mobile 360px layout has 0 overflow', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 360, height: 800 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));

    try {
      await page.goto('/aslevel/', { waitUntil: 'load' });
      await page.waitForTimeout(250);

      // Verify zero horizontal overflow and zero .katex-error on 360px mobile
      const mobileMetrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        katexErrors: document.querySelectorAll('.katex-error').length
      }));
      expect(mobileMetrics.scrollWidth).toBeLessThanOrEqual(mobileMetrics.innerWidth + 1);
      expect(mobileMetrics.katexErrors).toBe(0);

      // Inject an .ia-match block containing nested .katex markup and click the inner span
      const matchSelected = await page.evaluate(() => {
        const host = document.querySelector('.chapter') || document.body;
        const el = document.createElement('div');
        el.className = 'ia-match';
        el.dataset.title = 'Derivative Match';
        el.dataset.pairs = '<span class="katex"><span class="katex-html"><span class="mord mathnormal">x</span></span></span>::1|<span class="katex"><span class="mord">x^2</span></span>::2x';
        host.appendChild(el);
        if (window.CSInteractive && window.CSInteractive.render) window.CSInteractive.render();
        const innerKatex = host.querySelector('.ia-match-item[data-side="left"] .katex .mord');
        if (!innerKatex) return false;
        innerKatex.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        const item = innerKatex.closest('.ia-match-item');
        return item ? item.classList.contains('ia-selected') : false;
      });
      expect(matchSelected).toBe(true);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  const wcagRoutes = [
    { url: '/tahsili/', target: 'tah-about' },
    { url: '/tahsili/', target: 'tah-geometry' },
    { url: '/olympiad/', target: 'ol-algebraic-techniques' },
    { url: '/appc/', target: 'appc-u2b' },
    { url: '/appc/', target: 'appc-u4' },
    { url: '/sat/', target: 'sat-quad' },
    { url: '/algebra/', target: 'ag-linear' }
  ];

  for (const scheme of ['light', 'dark']) {
    for (const r of wcagRoutes) {
      test(`WCAG 2.1 AA (${scheme}): ${r.url}#${r.target} explorers, figures & IX widgets have 0 violations`, async ({ browser }) => {
        test.setTimeout(90000);
        const context = await browser.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } });
        const page = await context.newPage();
        try {
          await page.goto(r.url, { waitUntil: 'load' });
          const link = page.locator(`aside.rail a[data-target="${r.target}"]`);
          if (await link.count()) await link.click();
          await page.evaluate((activeId) => {
            if (window.CS_syncScrollFocus) window.CS_syncScrollFocus();
            // Prune display:none chapters so axe-core builds its virtual tree only on visible UI + active chapter
            document.querySelectorAll('.chapter').forEach((ch) => {
              if (ch.id !== activeId) ch.remove();
            });
          }, r.target);
          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();
          expect(results.violations, `${r.url}#${r.target} (${scheme}) WCAG violations`).toEqual([]);
        } finally {
          await context.close();
        }
      });
    }
  }
});
