/**
 * Every canvas explorer has a working non-visual equivalent (ADR 0038): its
 * "View as data" panel describes the current state in words and a table, is
 * filled even when opened before the canvas has scrolled into view, and
 * follows the explorer's first slider.
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const CONTENT = path.join(__dirname, '..', '..', 'content');
const tracks = fs.readdirSync(CONTENT).filter((t) => fs.existsSync(path.join(CONTENT, t, '_meta.json')));

test.describe('canvas explorers: non-visual equivalents', () => {
  for (const track of tracks) {
    test(`${track}: every explorer's "View as data" panel is filled and follows its slider`, async ({ page }) => {
      test.setTimeout(120000);
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`/${track}/`);
      const targets = await page.locator('aside.rail a[data-target]').evaluateAll((as) => as.map((a) => a.getAttribute('data-target')));
      const results = [];
      for (const target of targets) {
        // Open the chapter from the rail, then press "View as data" WITHOUT scrolling to the canvas.
        await page.evaluate((tg) => { const a = document.querySelector(`aside.rail a[data-target="${tg}"]`); if (a) a.click(); window.scrollTo(0, 0); }, target);
        const found = await page.evaluate(async (tg) => {
          const out = [];
          const sec = document.getElementById(tg);
          if (!sec) return out;
          for (const ex of sec.querySelectorAll('.explorer')) {
            const title = ((ex.querySelector('.et') || {}).textContent || '').trim().slice(0, 60);
            const btn = ex.querySelector('.ex-data-btn');
            const panel = btn && document.getElementById(btn.getAttribute('aria-controls'));
            if (!btn || !panel) { out.push({ title, problem: 'no "View as data" panel' }); continue; }
            btn.click();
            await new Promise((r) => setTimeout(r, 60));
            const desc = ((panel.querySelector('p') || {}).textContent || '').trim();
            const rows = panel.querySelectorAll('tbody tr').length;
            let follows = null;
            const slider = ex.querySelector('input[type=range]');
            if (slider) {
              const before = panel.textContent;
              slider.value = String(+slider.value === +slider.max ? slider.min : slider.max);
              slider.dispatchEvent(new Event('input', { bubbles: true }));
              slider.dispatchEvent(new Event('change', { bubbles: true }));
              await new Promise((r) => setTimeout(r, 80));
              follows = panel.textContent !== before;
            }
            if (desc.length < 10) out.push({ title, problem: 'empty description' });
            else if (rows < 1) out.push({ title, problem: 'empty data table' });
            else if (follows === false) out.push({ title, problem: 'does not change when the first slider moves' });
            else out.push({ title, ok: true });
          }
          return out;
        }, target);
        results.push(...found);
      }
      const problems = results.filter((r) => !r.ok);
      expect(problems, `explorers without a working non-visual equivalent on ${track}`).toEqual([]);
      expect(errors, `page errors on ${track}`).toEqual([]);
    });
  }
});

test.describe('canvas explorers: per-track files (Phase 5.015, ADR 0039)', () => {
  const exRequests = (page) => {
    const seen = [];
    page.on('request', (req) => {
      const m = req.url().match(/\/js\/ex\/([\w-]+)\.js/);
      if (m) seen.push(m[1]);
    });
    return seen;
  };

  test('engine.js no longer carries track explorers; a track loads only its own file', async ({ page, request }) => {
    const engine = await (await request.get('/js/engine.js')).text();
    expect(engine.includes("getElementById('pcSsaCanvas')"), 'track explorers should not be in engine.js').toBe(false);
    const seen = exRequests(page);
    await page.goto('/precalc/');
    await page.waitForLoadState('load');
    expect(seen).toEqual(['precalc']);
  });

  test('the home page requests no explorer file', async ({ page }) => {
    const seen = exRequests(page);
    await page.goto('/');
    await page.waitForLoadState('load');
    expect(seen).toEqual([]);
  });

  test('a moved explorer repaints in the new theme colours', async ({ page }) => {
    await page.goto('/algebra/');
    const cv = page.locator('canvas').first();
    await cv.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const snap = () => cv.evaluate((c) => c.toDataURL());
    const before = await snap();
    // The same path the dark theme takes: new CSS colour tokens, then CSPlotRefresh() redraws.
    await page.evaluate(() => {
      const r = document.documentElement.style;
      r.setProperty('--indigo', '#ff0000'); r.setProperty('--amber-2', '#00aa00'); r.setProperty('--ink', '#0000ff');
      window.CSPlotRefresh();
    });
    await page.waitForTimeout(400);
    expect(await snap()).not.toEqual(before);
  });
});
