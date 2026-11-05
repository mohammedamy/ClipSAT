// tests/e2e/wave4-cbt-cat-rtl-offline.spec.js — CI Gate #10: Wave 4 CBT, 3PL CAT, RTL & Checkout E2E

const { test, expect } = require('@playwright/test');

test.describe('Wave 4 E2E: 2-Stage Adaptive SAT, 3PL CAT, RTL Ergonomics & SAR Checkout', () => {
  test('2-Stage Adaptive Digital SAT (CSSatAdaptive) routes Module 1 -> Hard vs Standard Module 2', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(e.message));

    await page.goto('/sat/', { waitUntil: 'load' });
    await page.addScriptTag({ url: '/js/mock-exam.js' });
    await page.waitForFunction(() => Boolean(window.CSSatAdaptive));

    const result = await page.evaluate(() => {
      const pool = [];
      const domains = ['Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry'];
      for (let i = 0; i < 160; i++) {
        const b = -2.0 + (i / 159) * 4.2;
        const isSpr = i % 4 === 0;
        pool.push({
          id: 'e2e-sat-' + i,
          type: isSpr ? 'spr' : 'mcq',
          domain: domains[i % 4],
          difficulty: b < -0.5 ? 'easy' : b > 0.7 ? 'hard' : 'medium',
          text: 'Solve for x: \\( x = ' + i + ' \\)',
          sol: '\\( x = ' + i + ' \\)',
          choices: isSpr ? undefined : ['1', '2', '3', '4'],
          answer: isSpr ? undefined : 0,
          sprAnswer: isSpr ? String(i) : undefined,
          irt: { a: 1.35, b: Number(b.toFixed(2)), c: isSpr ? 0.0 : 0.25 }
        });
      }
      const m1 = window.CSSatAdaptive.drawSatAdaptiveModule(pool, { stage: 1 });
      const highRoute = window.CSSatAdaptive.routeSatModule2(m1, m1.map(() => true), pool);
      const lowRoute = window.CSSatAdaptive.routeSatModule2(m1, m1.map(() => false), pool);
      const highScaled = window.CSSatAdaptive.thetaToSatScaled(highRoute.m1Theta, highRoute.m1Sem, 'hard');
      const lowScaled = window.CSSatAdaptive.thetaToSatScaled(lowRoute.m1Theta, lowRoute.m1Sem, 'standard');
      return {
        m1Count: m1.length,
        highTrack: highRoute.routedTrack,
        lowTrack: lowRoute.routedTrack,
        highTheta: highRoute.m1Theta,
        lowTheta: lowRoute.m1Theta,
        highScore: highScaled.score,
        lowScore: lowScaled.score
      };
    });

    expect(result.m1Count).toBe(22);
    expect(result.highTrack).toBe('hard');
    expect(result.lowTrack).toBe('standard');
    expect(result.highTheta).toBeGreaterThan(0.15);
    expect(result.lowTheta).toBeLessThan(0.15);
    expect(result.highScore).toBeGreaterThan(result.lowScore);
    expect(pageErrors).toEqual([]);
  });

  test('3PL Bayesian EAP Diagnostic CAT (CSDiagnosticCAT) converges SEM and down-weights rapid guesses', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(e.message));

    await page.goto('/sat/', { waitUntil: 'load' });
    await page.addScriptTag({ url: '/js/diagnostic-test.js' });
    await page.waitForFunction(() => Boolean(window.CSDiagnosticCAT));

    const catStats = await page.evaluate(() => {
      const cat = window.CSDiagnosticCAT;
      const items = [];
      const outcomes = [];
      const dwell = {};
      for (let i = 0; i < 15; i++) {
        const b = -1.4 + i * 0.2;
        items.push({ id: 'cat-' + i, type: 'mcq', irt: { a: 1.65, b, c: 0.25 } });
        outcomes.push(b <= 0.4);
        dwell[i] = 12000;
      }
      const post = cat.computeEAPPosterior(items, outcomes, dwell);
      const hardItem = [{ id: 'hard-1', type: 'mcq', irt: { a: 1.7, b: 1.8, c: 0.25 } }];
      const rapid = cat.computeEAPPosterior(hardItem, [true], { 0: 600 });
      const thoughtful = cat.computeEAPPosterior(hardItem, [true], { 0: 15000 });
      return { sem: post.sem, rapidTheta: rapid.theta, thoughtfulTheta: thoughtful.theta };
    });

    expect(catStats.sem).toBeLessThanOrEqual(0.42);
    expect(catStats.rapidTheta).toBeLessThan(catStats.thoughtfulTheta);
    expect(pageErrors).toEqual([]);
  });

  test('Mobile Arabic RTL (/ar/qudrat/) & /pricing/ SAR checkout render with 0 horizontal overflow and 0 errors', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(e.message));

    try {
      await page.goto('/ar/qudrat/', { waitUntil: 'load' });
      const rtlCheck = await page.evaluate(() => ({
        dir: document.documentElement.getAttribute('dir'),
        lang: document.documentElement.getAttribute('lang'),
        overflowPx: document.documentElement.scrollWidth - window.innerWidth
      }));
      expect(rtlCheck.dir).toBe('rtl');
      expect(rtlCheck.lang).toBe('ar');
      expect(rtlCheck.overflowPx).toBeLessThanOrEqual(2);

      await page.goto('/pricing/', { waitUntil: 'load' });
      const hasCheckoutFn = await page.evaluate(() => typeof window.openPlusCheckout === 'function');
      expect(hasCheckoutFn).toBe(true);
      expect(pageErrors).toEqual([]);
    } finally {
      await context.close();
    }
  });
});
