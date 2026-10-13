const { test, expect } = require('@playwright/test');

test.describe('Phase 3 Features', () => {
  test('Pricing page renders SAR options, 30-day trial, and switcher', async ({ page }) => {
    await page.goto('/pricing/');
    await expect(page.locator('.cs-pricing-h1')).toBeVisible();

    // Default annual pricing
    const priceAmount = page.locator('#plan-price-amount');
    await expect(priceAmount).toHaveText('75');
    await expect(page.locator('#plan-price-period')).toHaveText('/year');

    // Switch to monthly
    await page.click('#toggle-monthly');
    await expect(priceAmount).toHaveText('15');
    await expect(page.locator('#plan-price-period')).toHaveText('/month');

    // Free-tier promise card
    await expect(page.locator('.cs-free-tier-callout')).toBeVisible();
  });

  test('Visitor counter displays baseline 15,000+ on home page', async ({ page }) => {
    await page.goto('/');
    const counter = page.locator('#clipsat-visit-count');
    await expect(counter).toBeVisible();
    const text = await counter.textContent();
    expect(text).toMatch(/15,000\+/);
  });

  test('Diagnostic test modal opens on track page', async ({ page }) => {
    await page.goto('/sat/');
    const diagBtn = page.locator('.cs-diagnostic-btn');
    await expect(diagBtn).toBeVisible();

    await diagBtn.click();
    const overlay = page.locator('#cs-diagnostic-overlay');
    await expect(overlay).toBeVisible();
    await expect(overlay.locator('.cs-diag-card')).toBeVisible();
  });

  test('Teacher view export functions are exposed globally', async ({ page }) => {
    await page.goto('/');
    const hasExports = await page.evaluate(() => {
      return typeof window.tvExportCSV === 'function' && typeof window.tvExportExcel === 'function';
    });
    expect(hasExports).toBe(true);
  });

  test('Cookieless analytics module is registered', async ({ page }) => {
    await page.goto('/');
    const hasAnalytics = await page.evaluate(() => {
      return typeof window.ClipSATAnalytics === 'object' && typeof window.ClipSATAnalytics.track === 'function';
    });
    expect(hasAnalytics).toBe(true);
  });
});
