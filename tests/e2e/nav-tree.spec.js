// tests/e2e/nav-tree.spec.js — Header Collapsible Curriculum Menu Tree E2E + WCAG 2.2 AA
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('Header Collapsible Curriculum Menu Tree', () => {
  test('renders 31 tracks in 3-level tree on /sat/, auto-expands active branch, filters, and navigates', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/sat/', { waitUntil: 'load' });

    const btn = page.locator('#navTreeBtn');
    await expect(btn).toBeVisible();
    await expect(page.locator('#navTreeCode')).toHaveText('SAT');
    await expect(page.locator('#navTreeLabel')).toHaveText('Digital SAT Math');

    await btn.click();
    const panel = page.locator('#navTreePanel');
    await expect(panel).toBeVisible();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');

    // All 31 tracks present when Expand All is toggled, and active branch starts open
    const examsBtn = panel.locator('[data-cat="exams"]');
    const satGrpBtn = panel.locator('[data-grp="us-exams"]');
    const intlBtn = panel.locator('[data-cat="intl"]');
    await expect(examsBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(satGrpBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(intlBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(panel.locator('[data-track="sat"]')).toHaveAttribute('aria-current', 'page');

    // Expand all shows all 31 leaves; clicking Collapse restores only the active branch
    await panel.locator('.nav-tree-expall').click();
    await expect(panel.locator('.nav-tree-leaf')).toHaveCount(31);
    await panel.locator('.nav-tree-expall').click();
    await expect(intlBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(panel.locator('[data-cat="university"]')).toHaveAttribute('aria-expanded', 'false');

    // Filter narrows live across English and Arabic labels
    const filter = page.locator('#navTreeFilter');
    await filter.fill('Multivariable');
    await expect(panel.locator('.nav-tree-leaf')).toHaveCount(1);
    await expect(panel.locator('[data-track="mvc"]')).toBeVisible();

    await filter.fill('القدرات');
    await expect(panel.locator('[data-track="qudrat"]')).toBeVisible();

    // First Escape clears active filter; second Escape closes panel
    await filter.press('Escape');
    await expect(filter).toHaveValue('');
    await expect(panel).toBeVisible();
    await filter.press('Escape');
    await expect(panel).toBeHidden();
    await expect(btn).toHaveAttribute('aria-expanded', 'false');

    // Reopen, expand University -> Calculus, click Multivariable Calculus leaf
    await btn.click();
    await panel.locator('[data-cat="university"]').click();
    await panel.locator('[data-grp="univ-calc"]').click();
    await Promise.all([
      page.waitForURL(/\/mvc\/$/),
      panel.locator('[data-track="mvc"]').click(),
    ]);
    await expect(page.locator('#navTreeCode')).toHaveText('MVC');
    await expect(page.locator('#navTreeLabel')).toHaveText('Multivariable Calculus');
    expect(errors).toEqual([]);
  });

  test('works inside mobile drawer in Arabic RTL (/ar/qudrat/) with zero horizontal overflow', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    try {
      await page.goto('/ar/qudrat/', { waitUntil: 'load' });
      const overflowPx = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflowPx).toBeLessThanOrEqual(2);

      await expect(page.locator('#navTreeWrap')).toBeHidden();
      await page.locator('#menuBtn').click();

      const mobBtn = page.locator('#navTreeMobileBtn');
      await expect(mobBtn).toBeVisible();
      await mobBtn.click();
      const mobPanel = page.locator('#navTreeMobilePanel');
      await expect(mobPanel).toBeVisible();
      await expect(mobPanel.locator('[data-track="qudrat"]')).toHaveAttribute('aria-current', 'page');

      // Expand Digital SAT & ACT subgroup (starts collapsed when viewing Qudrat) before clicking SAT
      await mobPanel.locator('[data-grp="us-exams"]').click();
      await Promise.all([
        page.waitForURL(/\/ar\/sat\/$/),
        mobPanel.locator('[data-track="sat"]').click(),
      ]);
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    } finally {
      await context.close();
    }
  });

  for (const mode of [
    { name: 'Light EN (/sat/)', url: '/sat/', dark: false },
    { name: 'Dark EN (/sat/)', url: '/sat/', dark: true },
    { name: 'Light AR RTL (/ar/sat/)', url: '/ar/sat/', dark: false },
  ]) {
    test(`WCAG 2.2 AA open-tree scan (${mode.name})`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      const page = await context.newPage();
      try {
        await page.goto(mode.url, { waitUntil: 'load' });
        if (mode.dark) {
          await page.evaluate(() => {
            document.body.classList.add('dark');
          });
        }
        await page.locator('#navTreeBtn').click();
        await expect(page.locator('#navTreePanel')).toBeVisible();

        const results = await new AxeBuilder({ page })
          .include('#navTreeWrap')
          .withTags(WCAG_TAGS)
          .analyze();
        const blocking = results.violations.filter(
          (v) => v.impact === 'critical' || v.impact === 'serious' || v.impact === 'moderate'
        );
        expect(
          blocking,
          `${mode.name} open nav tree violations: ${blocking.map((v) => `${v.id} (${v.impact})`).join(', ')}`
        ).toEqual([]);
      } finally {
        await context.close();
      }
    });
  }
});
