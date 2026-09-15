// @ts-check
const fs = require('fs');
const { defineConfig, devices } = require('@playwright/test');

// Claude Code's sandbox pre-installs one pinned Chromium build outside the
// per-@playwright/test-version cache the default launcher expects (see
// PLAYWRIGHT_BROWSERS_PATH in the sandbox docs). Detect it by path, not by
// env var, since which vars a given shell inherits varies; a CI runner or
// normal dev machine won't have this path and falls back to Playwright's
// own `npx playwright install`-managed browser.
const SANDBOX_CHROMIUM = '/opt/pw-browsers/chromium';
const sandboxChromiumExists = fs.existsSync(SANDBOX_CHROMIUM);

/**
 * Plan 5, Phase 5.009 — the regression suite that has to exist and pass
 * *before* Phase 5.011+ starts splitting index.html/engine.js apart.
 * It runs against the real `npm run build` output in _site/, not a dev
 * server, so "did the split break anything" has a real baseline to diff
 * against (see tests/e2e/README.md).
 */
module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${process.env.E2E_PORT || 8791}`,
    trace: 'retain-on-failure',
    launchOptions: sandboxChromiumExists ? { executablePath: SANDBOX_CHROMIUM } : {},
  },
  webServer: {
    command: 'node tests/e2e/static-server.js',
    port: Number(process.env.E2E_PORT || 8791),
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
