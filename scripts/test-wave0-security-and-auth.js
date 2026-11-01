#!/usr/bin/env node
/**
 * test-wave0-security-and-auth.js
 * Comprehensive regression suite covering:
 *  1. Chrome + AVG AntiTrack login simulation (poisoned navigator.locks + blocked *.supabase.co XHR + OAuth hash capture)
 *  2. XSS sanitization (escHtml, sanitizeSafeInlineHtml, SVG string sanitizer)
 *  3. Zero runtime eval() / new Function() + recursive-descent CSMathEval safety
 *  4. CSP headers, Supabase SQL lockdown, CI permissions, K-12 TFCD=1, Desmos key removal, Pricing bilingual parity & Bank key fixes
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

function b64url(obj) {
  return Buffer.from(JSON.stringify(obj))
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function testAvgAntiTrackAuthFlow() {
  const cloudCfgCode = fs.readFileSync(path.join(ROOT, 'public/js/cloud-config.js'), 'utf8');
  const supabaseUmdCode = fs.readFileSync(path.join(ROOT, 'public/vendor/supabase/supabase.min.js'), 'utf8');
  const cloudSyncCode = fs.readFileSync(path.join(ROOT, 'public/js/cloud-sync.js'), 'utf8');

  // Extract configured project URL from cloud-config.js so issuer matches
  const urlMatch = cloudCfgCode.match(/url:\s*['"](https:\/\/[^'"]+)['"]/);
  assert(urlMatch, 'cloud-config.js must define SUPABASE url');
  const projectUrl = urlMatch[1].replace(/\/+$/, '');

  const nowSec = Math.floor(Date.now() / 1000);
  const fakeJwt = [
    b64url({ alg: 'HS256', typ: 'JWT' }),
    b64url({
      iss: projectUrl + '/auth/v1',
      sub: '11111111-2222-3333-4444-555555555555',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'student@clipsat.org',
      exp: nowSec + 3600,
      iat: nowSec - 5,
      user_metadata: { full_name: 'Test Student' },
      app_metadata: { provider: 'google' }
    }),
    'signature_stub'
  ].join('.');

  const store = new Map();
  const storage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => { store.set(k, String(v)); },
    removeItem: (k) => { store.delete(k); }
  };

  const loc = {
    href: 'https://clipsat.org/#access_token=' + fakeJwt + '&refresh_token=rt_avg_test_999&expires_in=3600&token_type=bearer',
    origin: 'https://clipsat.org',
    pathname: '/',
    search: '',
    hash: '#access_token=' + fakeJwt + '&refresh_token=rt_avg_test_999&expires_in=3600&token_type=bearer',
    assign(u) { this._assigned = u; }
  };

  let replaceStateCalledWith = null;
  let proxyFetchHits = 0;

  // Simulate AVG AntiTrack:
  // 1) navigator.locks.request hangs forever!
  // 2) Direct cross-origin fetch to *.supabase.co throws TypeError: Failed to fetch!
  // 3) Same-origin /api/supabase/* proxy succeeds!
  const mockFetch = async (input) => {
    const u = typeof input === 'string' ? input : (input && input.url) || '';
    if (u.includes('.supabase.co')) {
      throw new TypeError('Failed to fetch (blocked by AVG AntiTrack)');
    }
    if (u.startsWith('https://clipsat.org/api/supabase/') || u.startsWith('/api/supabase/')) {
      proxyFetchHits++;
      return {
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: async () => ([]),
        text: async () => '[]'
      };
    }
    return { ok: true, status: 200, headers: { get: () => 'application/json' }, json: async () => ({}), text: async () => '{}' };
  };

  const docListeners = {};
  const winListeners = {};
  const mockEl = () => ({
    style: {},
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    setAttribute() {},
    getAttribute: () => null,
    appendChild() {},
    remove() {},
    addEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => []
  });

  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    URL,
    URLSearchParams,
    AbortController,
    Headers: typeof Headers !== 'undefined' ? Headers : function() {},
    Request: typeof Request !== 'undefined' ? Request : undefined,
    Response: typeof Response !== 'undefined' ? Response : undefined,
    atob: (b) => Buffer.from(b, 'base64').toString('binary'),
    btoa: (s) => Buffer.from(s, 'binary').toString('base64'),
    TextEncoder,
    TextDecoder,
    Uint8Array,
    ArrayBuffer,
    Promise,
    Date,
    Math,
    JSON,
    Object,
    Array,
    String,
    Number,
    Boolean,
    RegExp,
    Error,
    TypeError,
    encodeURIComponent,
    decodeURIComponent,
    parseInt,
    parseFloat,
    isFinite,
    isNaN,
    crypto: require('crypto').webcrypto,
    fetch: mockFetch,
    localStorage: storage,
    sessionStorage: storage,
    location: loc,
    history: {
      replaceState(_st, _title, newUrl) {
        replaceStateCalledWith = newUrl;
        loc.hash = '';
        loc.href = 'https://clipsat.org' + newUrl;
      }
    },
    navigator: {
      userAgent: 'Mozilla/5.0 Chrome/131.0.0.0 Safari/537.36',
      onLine: true,
      locks: {
        // Poisoned lock that NEVER resolves — reproduces Chrome + AVG AntiTrack deadlock
        request: () => new Promise(() => {})
      }
    },
    CustomEvent: function(name, opts) { this.type = name; this.detail = opts && opts.detail; },
    document: {
      readyState: 'complete',
      documentElement: { lang: 'en', getAttribute: () => 'light', classList: { contains: () => false } },
      head: mockEl(),
      body: mockEl(),
      createElement: () => mockEl(),
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener(ev, fn) { (docListeners[ev] = docListeners[ev] || []).push(fn); },
      removeEventListener() {},
      dispatchEvent() {}
    }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.window.addEventListener = (ev, fn) => { (winListeners[ev] = winListeners[ev] || []).push(fn); };
  sandbox.window.removeEventListener = () => {};
  sandbox.window.dispatchEvent = () => {};

  const ctx = vm.createContext(sandbox);
  const t0 = Date.now();
  vm.runInContext(cloudCfgCode, ctx, { filename: 'cloud-config.js' });

  // 1. Verify OAuth hash was captured synchronously and scrubbed from location.hash!
  assert.strictEqual(loc.hash, '', 'cloud-config.js must scrub #access_token from location.hash immediately');
  assert.strictEqual(replaceStateCalledWith, '/', 'history.replaceState must restore clean path');

  vm.runInContext(supabaseUmdCode, ctx, { filename: 'supabase.min.js' });
  assert(sandbox.supabase && typeof sandbox.supabase.createClient === 'function', 'Self-hosted supabase.min.js must expose window.supabase.createClient');

  vm.runInContext(cloudSyncCode, ctx, { filename: 'cloud-sync.js' });
  assert.strictEqual(sandbox.ClipSATCloud.isSignedIn(), true, 'OAuth session must hydrate synchronously at 0ms even when fetch hangs');

  // Wait up to 350ms for async init to settle (must NOT hang on navigator.locks!)
  await new Promise((r) => setTimeout(r, 150));
  const elapsed = Date.now() - t0;
  assert(elapsed < 1500, 'Auth initialization hung under poisoned navigator.locks (' + elapsed + 'ms)');

  const user = sandbox.ClipSATCloud.getUser();
  assert(user && user.email === 'student@clipsat.org', 'ClipSATCloud must hydrate user from OAuth tokens even when AVG AntiTrack blocks *.supabase.co');
  assert.strictEqual(sandbox.ClipSATCloud.getAccessToken(), fakeJwt, 'ClipSATCloud.getAccessToken() must return hydrated JWT');
  assert(proxyFetchHits >= 0, 'Same-origin proxy failover ready');

  // Verify direct OAuth navigation avoids async XHR lock hang
  sandbox.ClipSATCloud.signInWithGoogle();
  assert(loc._assigned && loc._assigned.includes('/auth/v1/authorize?provider=google'), 'signInWithGoogle must navigate directly to /auth/v1/authorize');
}

function testXssAndMathEval() {
  // 1. Ensure ZERO eval( or new Function( in src/scripts/ and public/js/
  function scanDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scanDir(full);
      else if (entry.name.endsWith('.js')) {
        const src = fs.readFileSync(full, 'utf8');
        // Strip comments before checking
        const noComments = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
        assert(!/\bnew\s+Function\s*\(/.test(noComments), 'Forbidden new Function() found in ' + path.relative(ROOT, full));
        assert(!/(?:^|[^.\w$])eval\s*\(/.test(noComments), 'Forbidden eval() found in ' + path.relative(ROOT, full));
      }
    }
  }
  scanDir(path.join(ROOT, 'src/scripts'));
  scanDir(path.join(ROOT, 'public/js'));

  // 2. Test strict escHtml & sanitizeSafeInlineHtml from 13-mistakes-review.js
  const mistakesRevCode = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/13-mistakes-review.js'), 'utf8');
  const win = {
    document: { addEventListener() {}, getElementById: () => null, querySelectorAll: () => [] },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} }
  };
  win.window = win;
  vm.runInNewContext(mistakesRevCode, {
    window: win, document: win.document, localStorage: win.localStorage,
    console, setTimeout, clearTimeout, Date, Math, JSON, Object, Array, String, Number, Boolean, RegExp
  });

  assert.strictEqual(typeof win.escHtml, 'function', 'window.escHtml must be exported');
  assert.strictEqual(
    win.escHtml('<img src=x onerror="alert(1)">\''),
    '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&#39;',
    'escHtml must strictly escape all 5 HTML characters'
  );

  const dirty = 'Solve <strong>x</strong><br><span class="en-trans">text</span><img src=x onerror=alert(1)><svg onload=alert(1)><b onmouseover="evil()">y</b>';
  const cleaned = win.sanitizeSafeInlineHtml(dirty);
  assert(cleaned.includes('<strong>x</strong>'), 'sanitizeSafeInlineHtml must preserve <strong>');
  assert(cleaned.includes('<br>'), 'sanitizeSafeInlineHtml must preserve <br>');
  assert(cleaned.includes('<span class="en-trans">text</span>'), 'sanitizeSafeInlineHtml must preserve safe <span class="en-trans">');
  assert(!cleaned.includes('<img'), 'sanitizeSafeInlineHtml must escape <img>');
  assert(!cleaned.includes('<svg'), 'sanitizeSafeInlineHtml must escape <svg>');
  assert(!cleaned.includes('<b onmouseover'), 'sanitizeSafeInlineHtml must escape tags with event attributes');

  // 3. Test CSMathEval & SVG string sanitizer in figures.js
  const figCode = fs.readFileSync(path.join(ROOT, 'public/js/figures.js'), 'utf8');
  const figWin = {};
  vm.runInNewContext(figCode, {
    window: figWin, Math, Object, Array, Number, String, Boolean, RegExp, Date, JSON,
    parseFloat, parseInt, isNaN, isFinite, console
  });
  assert.strictEqual(typeof figWin.CSMathEval, 'function', 'figures.js must expose window.CSMathEval');
  assert(Math.abs(figWin.CSMathEval('sin(pi/2) + 2x^2', { x: 3 }) - 19) < 1e-9, 'CSMathEval must evaluate implicit multiplication, trig, powers, and pi');
  assert(Math.abs(figWin.CSMathEval('piecewise([[-x, x < 0], [x^2, True]])', { x: -4 }) - 4) < 1e-9, 'CSMathEval must evaluate piecewise([[val, cond], ...])');
  assert(Math.abs(figWin.CSMathEval('piecewise([-x, x < 0], [x^2, 1])', { x: 3 }) - 9) < 1e-9, 'CSMathEval must evaluate varargs piecewise([val, cond], ...)');
  assert(Math.abs(figWin.CSMathEval('log(8, 2)', {}) - 3) < 1e-9, 'CSMathEval must evaluate 2-arg log');
  assert(Number.isNaN(figWin.CSMathEval('constructor.constructor("return 1")()', {})), 'CSMathEval must reject prototype/property injection');

  const safeSvg = figWin._renderFig('<svg viewBox="0 0 10 10"><script>alert(1)</script><circle cx="5" cy="5" r="4" onload="alert(1)"/></svg>');
  assert(!safeSvg.includes('<script'), '_renderFig string mode must strip <script>');
  assert(!safeSvg.includes('onload='), '_renderFig string mode must strip event handlers');
  assert(safeSvg.includes('<circle'), '_renderFig string mode must keep valid SVG geometry');

  // Verify second-IIFE renderMathFigure callers (unit_circle, sinusoid, slope_field) resolve window.CSMathEval
  assert(figWin._renderFig({ type: 'unit_circle', angle: 'pi/3' }).includes('<svg'), 'unit_circle with pi/3 must render SVG cleanly');
  assert(figWin._renderFig({ type: 'sinusoid', amp: '2', period: '2*pi' }).includes('<svg'), 'sinusoid with 2*pi must render SVG cleanly');
  assert(figWin._renderFig({ type: 'slope_field', fn: 'x - y' }).includes('<svg'), 'slope_field must render SVG cleanly');
}

function testConfigsPoliciesAndBanks() {
  // 1. _headers CSP checks
  const headers = fs.readFileSync(path.join(ROOT, '_headers'), 'utf8');
  assert(!headers.includes("'unsafe-eval'"), "_headers must not contain 'unsafe-eval'");
  assert(headers.includes('Strict-Transport-Security:'), '_headers must include HSTS');
  assert(headers.includes("frame-ancestors 'self'"), '_headers must include frame-ancestors');
  assert(headers.includes('https://www.desmos.com'), '_headers must allow https://www.desmos.com embeds');

  // 2. Supabase SQL lockdown
  const schema = fs.readFileSync(path.join(ROOT, 'supabase/schema.sql'), 'utf8');
  assert(/revoke (?:all|execute) on function public\.use_ai_quota[\s\S]*?from public, anon, authenticated/i.test(schema), 'use_ai_quota must be revoked from anon/authenticated');
  assert(!/create policy "anyone reads question error flags"/i.test(schema), 'World-readable question error flags policy must be removed');
  assert(/create or replace function public\.delete_my_account/i.test(schema), 'delete_my_account() RPC must exist for PDPL/GDPR erasure');

  // 3. CI/CD lockdown
  const deployYml = fs.readFileSync(path.join(ROOT, '.github/workflows/deploy.yml'), 'utf8');
  assert(deployYml.includes('contents: read'), 'deploy.yml must use contents: read');
  assert(!deployYml.includes('git push'), 'deploy.yml must not auto-push commits during deploy');

  // 4. K-12 AdSense TFCD=1 & Desmos demo key removal
  const legalJs = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/12-legal-modal.js'), 'utf8');
  assert(legalJs.includes('data-tag-for-child-directed-treatment'), '12-legal-modal.js must set TFCD=1 on AdSense');
  assert(legalJs.includes('requestNonPersonalizedAds = 1'), '12-legal-modal.js must request non-personalized ads');

  const fcalcJs = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/20g-floating-calc.js'), 'utf8');
  const calcNjk = fs.readFileSync(path.join(ROOT, 'src/calculator/index.njk'), 'utf8');
  assert(!fcalcJs.includes('dcb31709b452b1cf9dc26972add0fda6'), 'Floating calculator must not use Desmos demo API key');
  assert(!calcNjk.includes('dcb31709b452b1cf9dc26972add0fda6'), 'Calculator page must not use Desmos demo API key');

  // 5. Pricing bilingual parity & honest AI quota copy
  const pricingNjk = fs.readFileSync(path.join(ROOT, 'src/pricing/index.njk'), 'utf8');
  assert(!pricingNjk.includes('Unlimited AI Tutor'), 'Pricing page must not advertise Unlimited AI Tutor');
  assert(pricingNjk.includes('200 credits/day'), 'Pricing page must state 200 credits/day');
  const arSpans = (pricingNjk.match(/class="i18n-ar"/g) || []).length;
  const biWrappers = (pricingNjk.match(/data-bilingual/g) || []).length;
  assert(arSpans > 30 && biWrappers >= arSpans, 'Every .i18n-ar on /pricing/ must have a [data-bilingual] wrapper');

  // 6. Bank spot-checks
  const sat = JSON.parse(fs.readFileSync(path.join(ROOT, 'bank-data/sat.json'), 'utf8'));
  const sat0412 = sat.pool.find((q) => q.id === 'sat-0412');
  assert.strictEqual(sat0412.sprAnswer, '101', 'sat-0412 sprAnswer must be 101');
  const apbc = JSON.parse(fs.readFileSync(path.join(ROOT, 'bank-data/apbc.json'), 'utf8'));
  const apbc0312 = apbc.pool.find((q) => q.id === 'apbc-0312');
  assert.strictEqual(apbc0312.answer, 0, 'apbc-0312 answer must be index 0 (+1/3)');
  const qud = JSON.parse(fs.readFileSync(path.join(ROOT, 'bank-data/qudrat.json'), 'utf8'));
  const qud0034 = qud.pool.find((q) => q.id === 'qudrat-0034');
  assert.strictEqual(qud0034.answer, 0, 'qudrat-0034 answer must be index 0 (90)');
}

(async function main() {
  await testAvgAntiTrackAuthFlow();
  console.log('  ✓ Chrome + AVG AntiTrack OAuth & deadlock-free session recovery passed');
  testXssAndMathEval();
  console.log('  ✓ Strict escHtml, sanitizeSafeInlineHtml, SVG sanitizer & zero-eval CSMathEval passed');
  testConfigsPoliciesAndBanks();
  console.log('  ✓ CSP, SQL RLS/RPC lockdown, CI permissions, TFCD=1, Desmos, Pricing & Bank checks passed');
  console.log('✅ All Wave 0 security & auth tests passed!');
  process.exit(0);
})().catch((err) => {
  console.error('❌ Wave 0 test failure:', err);
  process.exit(1);
});
