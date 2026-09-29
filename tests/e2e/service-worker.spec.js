/**
 * Plan 5 Phase 5.017 (ADR 0046): the service worker serves the site's JS/CSS cache-first, and a
 * deploy that changes any of them reaches a returning visitor.
 *
 * Each test serves _site from its own server, with an empty "deploy" directory laid over it, so
 * a test can change a file the way a deploy would without touching _site.
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createServer, ROOT } = require('./static-server.js');
const { stampedSw } = require('../../scripts/stamp-sw-version.js');

test.describe.configure({ mode: 'parallel' });

let deployDir, server, base;
test.beforeEach(async () => {
  deployDir = fs.mkdtempSync(path.join(os.tmpdir(), 'clipsat-sw-'));
  server = createServer([deployDir, ROOT]);
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
test.afterEach(async () => {
  await new Promise((r) => server.close(r));
  fs.rmSync(deployDir, { recursive: true, force: true });
});

/* The first visit installs the service worker; it controls the page from the next load on. */
async function visitUnderServiceWorker(page, url) {
  await page.goto(base + url);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
}

const cacheNames = (page) => page.evaluate(() => caches.keys());

test('the built sw.js carries the hash of the files it caches', () => {
  const built = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  expect(built).toBe(stampedSw([ROOT]));
  expect(built).toMatch(/const SW_VERSION = 'v[\d.]+-[0-9a-f]{12}';/);
});

test('a deploy that changes engine.js reaches a returning visitor', async ({ page }) => {
  await visitUnderServiceWorker(page, '/geo/');
  const before = await cacheNames(page);
  expect(await page.evaluate(() => window.__deployMarker)).toBeUndefined();

  // Deploy: a changed engine.js, and sw.js rebuilt as the build stamps it.
  const engine = fs.readFileSync(path.join(ROOT, 'js', 'engine.js'), 'utf8');
  fs.mkdirSync(path.join(deployDir, 'js'));
  fs.writeFileSync(path.join(deployDir, 'js', 'engine.js'), engine + '\nwindow.__deployMarker=1;\n');
  fs.writeFileSync(path.join(deployDir, 'sw.js'), stampedSw([deployDir, ROOT]));

  // The next load finds the new sw.js; once it activates, the old caches are gone.
  await page.reload();
  await expect
    .poll(async () => (await cacheNames(page)).some((n) => before.includes(n)), { timeout: 15000 })
    .toBe(false);
  await page.reload();
  expect(await page.evaluate(() => window.__deployMarker)).toBe(1);
});

test('a returning visit loads the JS and CSS from the cache, including on-demand files', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await visitUnderServiceWorker(page, '/geo/');
  await page.evaluate(() => window._ensureFigures());
  for (const k of Object.keys(server.hits)) delete server.hits[k];

  await page.reload();
  await page.waitForFunction(() => !!window.CSExplorerKit);
  await page.evaluate(() => window._ensureFigures());
  expect(server.hits['/geo/'], 'the page itself is still fetched fresh').toBe(1);
  for (const f of ['/js/engine.js', '/js/ex/geo.js', '/css/main.css', '/js/figures.js']) {
    expect(server.hits[f] || 0, `${f} should come from the cache`).toBe(0);
  }
  expect(errors, errors.join('\n')).toHaveLength(0);
});

test('offline, a visited track page still loads with its explorers and figures', async ({ page, context }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await visitUnderServiceWorker(page, '/geo/');
  await page.evaluate(() => window._ensureFigures());

  await context.setOffline(true);
  await page.reload();
  await page.waitForFunction(() => !!window.CSExplorerKit);
  expect(await page.evaluate(() => window._ensureFigures().then(() => typeof window._renderFig))).toBe('function');
  expect(errors, errors.join('\n')).toHaveLength(0);
});
