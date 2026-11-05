// tests/e2e/a11y-axe.spec.ts — CI Gate #11: WCAG 2.1 / 2.2 AA Accessibility & Focus-Trap Gate

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  { name: 'Home (EN)', url: '/' },
  { name: 'Digital SAT Hub (EN)', url: '/sat/' },
  { name: 'Digital SAT Hub (AR RTL)', url: '/ar/sat/' },
  { name: 'GAT Qudrat Hub (AR RTL)', url: '/ar/qudrat/' },
  { name: 'Pricing & SAR Checkout', url: '/pricing/' }
];

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe.configure({ mode: 'parallel' });

for (const route of ROUTES) {
  test(`WCAG 2.2 AA & hidden-overlay inertness: ${route.name}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    try {
      await page.goto(route.url, { waitUntil: 'load' });
      await page.evaluate(() => {
        const w = window as unknown as { CS_syncScrollFocus?: () => void };
        if (typeof w.CS_syncScrollFocus === 'function') w.CS_syncScrollFocus();
      });

      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      const blocking = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious' || v.impact === 'moderate'
      );
      expect(
        blocking,
        `${route.name} failed WCAG AA scan: ${blocking.map((v) => `${v.id} (${v.impact})`).join(', ')}`
      ).toEqual([]);

      // Verify closed overlays do not expose invisible keyboard Tab stops
      const leakedTabStops = await page.evaluate(() => {
        const closedIds = ['glossaryOverlay', 'formulaOverlay', 'calcModal'];
        let leaked = 0;
        for (const id of closedIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const cs = window.getComputedStyle(el);
          const isClosed =
            el.hasAttribute('hidden') ||
            el.hasAttribute('inert') ||
            cs.display === 'none' ||
            cs.visibility === 'hidden';
          if (!isClosed && cs.opacity === '0') {
            leaked += el.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]').length;
          }
        }
        return leaked;
      });
      expect(leakedTabStops).toBe(0);
    } finally {
      await context.close();
    }
  });
}
