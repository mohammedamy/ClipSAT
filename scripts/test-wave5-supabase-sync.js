#!/usr/bin/env node
/**
 * scripts/test-wave5-supabase-sync.js
 * Verification suite for Wave 5:
 *   1. /account/ & /ar/account/ get_my_daily_usage() array unwrapping, ai_cap/tts_cap, ai_plans fallback, Sync & Delete buttons
 *   2. /pricing/ & /ar/pricing/ openCloudAuthModal() fix + ClipSATCloud.ready entitlement check + clipsat:auth-changed
 *   3. public/js/cloud-sync.js syncing mock_exam_attempts & user_study_data + /ar/account/ modal link routing
 *   4. public/js/teacher-view.js #teacher-view-modal/.show fix, Arabic RTL localization, mock exam summary & Custom Cart hook
 *   5. SQL migration 20261120000000 & schema.sql security advisors, coalesce(v_paid, false), RLS + (select auth.uid())
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

function makeMockEl(initial) {
  const attrs = Object.assign({}, (initial && initial.attrs) || {});
  const classes = new Set((initial && initial.classes) || []);
  return {
    hidden: false,
    textContent: '',
    innerHTML: '',
    value: '',
    checked: false,
    options: [],
    style: {},
    className: '',
    attributes: attrs,
    setAttribute(k, v) { attrs[k] = String(v); },
    getAttribute(k) { return Object.prototype.hasOwnProperty.call(attrs, k) ? attrs[k] : null; },
    removeAttribute(k) { delete attrs[k]; },
    hasAttribute(k) { return Object.prototype.hasOwnProperty.call(attrs, k); },
    classList: {
      add(c) { classes.add(c); },
      remove(c) { classes.delete(c); },
      toggle(c, force) {
        if (force === true) classes.add(c);
        else if (force === false) classes.delete(c);
        else if (classes.has(c)) classes.delete(c);
        else classes.add(c);
        return classes.has(c);
      },
      contains(c) { return classes.has(c); }
    },
    appendChild() {},
    insertAdjacentHTML() {},
    addEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    click() {},
    focus() {}
  };
}

function testAccountPages() {
  for (const rel of ['src/account/index.njk', 'src/ar/account/index.njk']) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert(src.includes('Array.isArray(raw) ? raw[0] : raw'), `${rel} must unwrap PostgREST array response from get_my_daily_usage`);
    assert(src.includes('d.ai_cap') && src.includes('d.tts_cap'), `${rel} must read ai_cap and tts_cap columns`);
    assert(src.includes('loadAiPlansFallback'), `${rel} must include ai_plans fallback`);
    assert(src.includes('acct-delete-btn') && src.includes('cloudDeleteMyAccount'), `${rel} must expose self-service Delete My Cloud Account button`);
    assert(src.includes('acct-sync-btn'), `${rel} must expose Sync Progress Now button`);
    assert(src.includes("addEventListener('clipsat:auth-changed'"), `${rel} must re-render on clipsat:auth-changed`);
  }

  // Extract inline <script> from src/account/index.njk and run in VM with array-returning RPC
  const enAcct = fs.readFileSync(path.join(ROOT, 'src/account/index.njk'), 'utf8');
  const scriptMatch = enAcct.match(/<script>([\s\S]*?)<\/script>/);
  assert(scriptMatch, 'src/account/index.njk must contain inline script');

  const els = {};
  for (const id of [
    'account-gate', 'account-gate-msg', 'account-signin-btn', 'account-content',
    'account-email', 'account-provider', 'account-plan-badge', 'account-plan-expiry',
    'acct-ai-usage-label', 'acct-tts-usage-label', 'acct-ai-usage-bar', 'acct-tts-usage-bar',
    'acct-classes-list', 'acct-google-status', 'acct-sync-btn', 'acct-export-btn',
    'acct-delete-btn', 'acct-action-status', 'account-signout-btn'
  ]) {
    els[id] = makeMockEl();
  }

  const fakeUser = { id: 'aaaaaaaa-0000-4000-8000-000000000001', email: 'plus@clipsat.org' };
  const fakeSb = {
    auth: { onAuthStateChange() {} },
    rpc(fn) {
      if (fn === 'get_my_daily_usage') {
        return Promise.resolve({
          data: [{
            tier: 'paid',
            paid: true,
            paid_until: '2027-06-01T00:00:00Z',
            trial_ends_at: null,
            cancel_at_period_end: false,
            ai_used: 14,
            ai_cap: 200,
            tts_used: 3,
            tts_cap: 600
          }],
          error: null
        });
      }
      return Promise.resolve({ data: null, error: null });
    },
    from() {
      return {
        select() { return this; },
        eq() { return Promise.resolve({ data: [], error: null }); }
      };
    }
  };

  const win = {
    ClipSATCloud: {
      configured: true,
      ready: Promise.resolve(),
      isSignedIn: () => true,
      getUser: () => fakeUser,
      currentProvider: () => 'google',
      requireAuth: () => Promise.resolve(fakeUser),
      getClient: () => fakeSb,
      signOut: () => Promise.resolve(),
      syncNow() {},
      pullAndMerge: () => Promise.resolve()
    },
    document: {
      documentElement: { lang: 'en', dir: 'ltr' },
      getElementById: (id) => els[id] || null,
      addEventListener() {},
      body: makeMockEl()
    },
    localStorage: { length: 0, key: () => null, getItem: () => null },
    setTimeout, clearTimeout, Date, Math, Number, String, Array, Object, JSON, Promise, Blob, URL
  };
  win.window = win;
  const ctx = vm.createContext(Object.assign({}, win, { console }));
  vm.runInContext(scriptMatch[1], ctx);

  return new Promise((resolve) => setImmediate(resolve)).then(() => new Promise((r) => setTimeout(r, 30))).then(() => {
    assert.strictEqual(els['account-plan-badge'].textContent, 'ClipSAT Plus', 'Account badge must show ClipSAT Plus when get_my_daily_usage returns array row');
    assert.strictEqual(els['acct-ai-usage-label'].textContent, '14 / 200', 'AI usage label must read ai_cap (200)');
    assert.strictEqual(els['acct-tts-usage-label'].textContent, '3 / 600', 'TTS usage label must read tts_cap (600)');
    assert.strictEqual(els['acct-ai-usage-bar'].style.width, '7%', 'AI usage bar width must reflect 14/200');
  });
}

function testPricingPages() {
  for (const rel of ['src/pricing/index.njk', 'src/ar/pricing/index.njk']) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert(!/\bopenCloudAuth\s*\(/.test(src), `${rel} must not call nonexistent openCloudAuth()`);
    assert(src.includes('openCloudAuthModal'), `${rel} must call openCloudAuthModal()`);
    assert(src.includes('cloud.ready') && src.includes("addEventListener('clipsat:auth-changed'"), `${rel} must await ClipSATCloud.ready and listen to clipsat:auth-changed`);
  }
}

async function testCloudSyncExtensions() {
  const cloudCfgCode = fs.readFileSync(path.join(ROOT, 'public/js/cloud-config.js'), 'utf8');
  const cloudSyncCode = fs.readFileSync(path.join(ROOT, 'public/js/cloud-sync.js'), 'utf8');

  assert(cloudSyncCode.includes('clipsat_cbt_history'), 'cloud-sync.js must watch clipsat_cbt_history');
  assert(cloudSyncCode.includes('clipsat_custom_cards') && cloudSyncCode.includes('clipsat_starred_cards') && cloudSyncCode.includes('clipsat_badges'), 'cloud-sync.js must watch custom cards, starred cards, and badges');
  assert(cloudSyncCode.includes("'/ar/account/'"), 'cloud-sync.js must route modal account link to /ar/account/ in RTL mode');

  const store = new Map();
  store.set('clipsat_cbt_history', JSON.stringify([{ track: 'sat', paper: 'SAT Local', score: 35, total: 44, pct: 80, scaled: '700', ts: 1700000001000 }]));
  store.set('clipsat_custom_cards', JSON.stringify([{ id: 'local-1', f: 'a', b: 'b', createdAt: 100 }]));
  store.set('clipsat_starred_cards', JSON.stringify({ 'sat:card1': true }));
  store.set('clipsat_badges', JSON.stringify({ xp_100: 1700000000000 }));

  const upserts = {};
  function makeQueryChain(tbl) {
    const q = {
      select() { return q; },
      eq() { return q; },
      is() { return q; },
      order() { return q; },
      limit() { return q; },
      maybeSingle() {
        if (tbl === 'profiles') return Promise.resolve({ data: { xp: 150, streak: 4 }, error: null });
        if (tbl === 'user_study_data') {
          return Promise.resolve({
            data: {
              custom_cards: [{ id: 'cloud-1', f: 'c', b: 'd', createdAt: 200 }],
              starred_cards: { 'calculus:card2': true },
              badges: { streak_3: 1700000002000 }
            },
            error: null
          });
        }
        return Promise.resolve({ data: null, error: null });
      },
      upsert(rows) {
        upserts[tbl] = rows;
        return Promise.resolve({ error: null });
      },
      then(onOk, onErr) {
        if (tbl === 'mock_exam_attempts') {
          return Promise.resolve({
            data: [{ track: 'sat', paper: 'SAT Cloud', score: 40, total: 44, pct: 91, scaled: '750', attempt_ts: 1700000009000 }],
            error: null
          }).then(onOk, onErr);
        }
        return Promise.resolve({ data: [], error: null }).then(onOk, onErr);
      }
    };
    return q;
  }

  const uid = '11111111-2222-3333-4444-555555555555';
  const b64u = (o) => Buffer.from(JSON.stringify(o)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const nowSec = Math.floor(Date.now() / 1000);
  const jwt = [
    b64u({ alg: 'HS256', typ: 'JWT' }),
    b64u({ iss: 'https://ynnqrxeprxhtdimzwxwx.supabase.co/auth/v1', sub: uid, aud: 'authenticated', email: 'ar@clipsat.org', exp: nowSec + 3600 }),
    'sig'
  ].join('.');

  const accountLinkEl = makeMockEl({ attrs: { href: '/account/' } });
  const accountViewEl = makeMockEl();
  accountViewEl.querySelector = (sel) => (sel === 'a[href$="/account/"]' ? accountLinkEl : null);
  const docEls = {
    'cloudSignInBtn': makeMockEl(),
    'cloud-auth-signin-view': makeMockEl(),
    'cloud-auth-account-view': accountViewEl,
    'cloud-auth-account-email': makeMockEl(),
    'cloud-auth-modal-title': makeMockEl()
  };

  const sandbox = {
    console, setTimeout, clearTimeout, setInterval, clearInterval,
    URL, URLSearchParams, AbortController, Headers, Request, Response,
    TextEncoder, TextDecoder, Uint8Array, ArrayBuffer, Promise, Date, Math, JSON, Object, Array, String, Number, Boolean, RegExp, Error, TypeError,
    atob: (b) => Buffer.from(b, 'base64').toString('binary'),
    btoa: (s) => Buffer.from(s, 'binary').toString('base64'),
    encodeURIComponent, decodeURIComponent, parseInt, parseFloat, isFinite, isNaN,
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => { store.set(k, String(v)); },
      removeItem: (k) => { store.delete(k); }
    },
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    location: {
      href: 'https://clipsat.org/ar/#access_token=' + jwt + '&refresh_token=rt1&expires_in=3600',
      origin: 'https://clipsat.org',
      pathname: '/ar/',
      search: '',
      hash: '#access_token=' + jwt + '&refresh_token=rt1&expires_in=3600',
      assign() {}
    },
    history: { replaceState() {} },
    navigator: { userAgent: 'node', onLine: true },
    CustomEvent: function (t, o) { this.type = t; this.detail = o && o.detail; },
    supabase: {
      createClient: () => ({
        auth: {
          onAuthStateChange() {},
          setSession: () => Promise.resolve({ data: { session: { access_token: jwt, user: { id: uid, email: 'ar@clipsat.org' } } }, error: null }),
          getSession: () => Promise.resolve({ data: { session: null }, error: null })
        },
        from: (tbl) => makeQueryChain(tbl),
        rpc: () => Promise.resolve({ data: null, error: null })
      })
    },
    document: {
      readyState: 'complete',
      documentElement: { lang: 'ar', dir: 'rtl', getAttribute: () => 'light', classList: { contains: () => false } },
      head: makeMockEl(),
      body: makeMockEl(),
      createElement: () => makeMockEl(),
      createTextNode: () => ({}),
      getElementById: (id) => docEls[id] || null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {}
    }
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.window.addEventListener = () => {};
  sandbox.window.removeEventListener = () => {};

  const ctx = vm.createContext(sandbox);
  vm.runInContext(cloudCfgCode, ctx);
  vm.runInContext(cloudSyncCode, ctx);

  await sandbox.ClipSATCloud.ready;
  await sandbox.ClipSATCloud.pullAndMerge();

  assert.strictEqual(accountLinkEl.getAttribute('href'), '/ar/account/', 'Modal account link must point to /ar/account/ in Arabic RTL');

  const mergedCbt = JSON.parse(store.get('clipsat_cbt_history'));
  assert.strictEqual(mergedCbt.length, 2, 'pullAndMerge must union local + cloud CBT mock attempts');
  assert.strictEqual(mergedCbt[0].paper, 'SAT Cloud', 'Newest mock attempt must sort first');

  const mergedCards = JSON.parse(store.get('clipsat_custom_cards'));
  assert.strictEqual(mergedCards.length, 2, 'pullAndMerge must union local + cloud custom flashcards');

  const mergedStars = JSON.parse(store.get('clipsat_starred_cards'));
  assert(mergedStars['sat:card1'] && mergedStars['calculus:card2'], 'pullAndMerge must union starred flashcards');

  const mergedBadges = JSON.parse(store.get('clipsat_badges'));
  assert(mergedBadges.xp_100 && mergedBadges.streak_3, 'pullAndMerge must union badges map');

  sandbox.ClipSATCloud.syncNow();
  assert(Array.isArray(upserts.mock_exam_attempts) && upserts.mock_exam_attempts.length === 2, 'syncNow must upsert merged mock_exam_attempts');
  assert(upserts.user_study_data && Array.isArray(upserts.user_study_data.custom_cards), 'syncNow must upsert user_study_data');
}

function testTeacherViewAndSql() {
  const tvJs = fs.readFileSync(path.join(ROOT, 'public/js/teacher-view.js'), 'utf8');
  assert(!tvJs.includes("getElementById('teacherViewModal')"), 'teacher-view.js must not reference wrong ID teacherViewModal');
  assert(tvJs.includes("getElementById('teacher-view-modal')") && tvJs.includes("m.classList.contains('show')"), 'teacher-view.js must use #teacher-view-modal and .show');
  assert(tvJs.includes('mock_exam_attempts'), 'teacher-view.js must query mock_exam_attempts');
  assert(tvJs.includes('tvOpenCustomCart'), 'teacher-view.js must expose tvOpenCustomCart shortcut');
  assert(tvJs.includes('syncModalLocale') && tvJs.includes('الفصول الدراسية'), 'teacher-view.js must localize UI for Arabic RTL');
  assert(tvJs.includes('safeCsvCell') && tvJs.includes('escT') && tvJs.includes('p_consent'), 'teacher-view.js must preserve CSV formula escaping, HTML escaping & p_consent');

  const mig5 = fs.readFileSync(path.join(ROOT, 'supabase/migrations/20261120000000_wave5_supabase_security_sync_and_perf.sql'), 'utf8');
  const schemaSql = fs.readFileSync(path.join(ROOT, 'supabase/schema.sql'), 'utf8');
  const mig0 = fs.readFileSync(path.join(ROOT, 'supabase/migrations/20261119000000_phase0_rls_quota_and_assignment_hardening.sql'), 'utf8');

  assert(mig5.includes('drop function if exists public.try_use_ai_quota'), 'Wave 5 migration must drop obsolete try_use_ai_quota');
  assert(mig5.includes('revoke all on function public.handle_new_user() from public, anon, authenticated'), 'Wave 5 migration must revoke handle_new_user from public/anon/authenticated');
  assert(mig5.includes('create table if not exists public.mock_exam_attempts') && mig5.includes('create table if not exists public.user_study_data'), 'Wave 5 migration must create sync tables');
  assert(mig5.includes('(select auth.uid())'), 'Wave 5 migration must optimize policies with (select auth.uid())');
  assert(mig0.includes('v_paid := coalesce(') && schemaSql.includes('v_paid := coalesce('), 'get_my_daily_usage must coalesce v_paid to false');
  assert(schemaSql.includes('public.mock_exam_attempts') && schemaSql.includes('public.user_study_data'), 'schema.sql must mirror Wave 5 tables');
}

(async function main() {
  await testAccountPages();
  console.log('  ✓ /account/ & /ar/account/ RPC array unwrapping, ai_cap/tts_cap, fallback & buttons passed');
  testPricingPages();
  console.log('  ✓ /pricing/ & /ar/pricing/ openCloudAuthModal & entitlement observer passed');
  await testCloudSyncExtensions();
  console.log('  ✓ cloud-sync.js mock_exam_attempts & user_study_data union merge, push & AR link passed');
  testTeacherViewAndSql();
  console.log('  ✓ teacher-view.js modal fix, Arabic localization, mock exam scores & SQL security checks passed');
  console.log('✅ All Wave 5 Supabase sync & security tests passed!');
})().catch((err) => {
  console.error('❌ Wave 5 test failed:', err);
  process.exit(1);
});
