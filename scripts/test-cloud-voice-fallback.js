#!/usr/bin/env node
/**
 * Cloud voice (OpenRouter fish-audio/s2.1-pro-free:free via Supabase tts-proxy)
 * with guaranteed fallback to the browser Web Speech voice.
 *   - Static: the secret is read only from Supabase env, never hard-coded;
 *     the proxy requires a signed-in user and defaults to the requested model.
 *   - Behavioural: runs src/scripts/modules/03d-voice-tutor.js in a sandbox and
 *     proves (a) success -> cloud audio plays, browser voice untouched;
 *     (b) HTTP 429 / network error / signed-out -> browser voice speaks and a
 *     quota failure pauses cloud voice for later clicks.
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
let passed = 0;
function ok(msg) { passed++; console.log('  ✓ ' + msg); }

console.log('\n── Test Suite: Cloud Voice (fish-audio) + Browser Fallback ──');

/* ---------- static checks ---------- */
const proxy = fs.readFileSync(path.join(ROOT, 'supabase/functions/tts-proxy/index.ts'), 'utf8');
assert.ok(proxy.includes('Deno.env.get("OPENROUTER_API_KEY")'), 'proxy reads OPENROUTER_API_KEY from env');
assert.ok(!/sk-or-[A-Za-z0-9-]{8,}/.test(proxy), 'proxy must not contain a literal OpenRouter key');
assert.ok(proxy.includes('fish-audio/s2.1-pro-free:free'), 'proxy defaults to fish-audio/s2.1-pro-free:free');
assert.ok(proxy.includes('https://openrouter.ai/api/v1/audio/speech'), 'proxy targets the OpenRouter speech endpoint');
assert.ok(proxy.includes('withSupabase({ auth: "user" }'), 'proxy requires a signed-in user');
ok('tts-proxy: server-side secret, correct model/endpoint, signed-in users only');

const cfg = fs.readFileSync(path.join(ROOT, 'supabase/config.toml'), 'utf8');
assert.ok(/\[functions\.tts-proxy\][\s\S]*?verify_jwt\s*=\s*true/.test(cfg), 'config.toml registers tts-proxy with verify_jwt = true');
ok('config.toml: tts-proxy registered with verify_jwt = true');

const clientSrc = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/03d-voice-tutor.js'), 'utf8');
assert.ok(!/sk-or-[A-Za-z0-9-]{8,}/.test(clientSrc) && !/Deno\.env/.test(clientSrc), 'browser code holds no OpenRouter secret');
ok('browser bundle holds no OpenRouter secret');

/* ---------- behavioural checks ---------- */
function makeEnv(fetchImpl, signedIn) {
  const log = { browserSpoken: [], audioPlayed: [], fetchCalls: 0 };
  const store = {};
  const session = {};
  const win = {
    ClipSATCloud: {
      configured: true,
      ready: Promise.resolve(),
      getClient: () => ({ auth: { getSession: async () => ({ data: { session: signedIn ? { access_token: 'tok' } : null } }) } })
    },
    CLIPSAT_CLOUD_CONFIG: { anonKey: 'anon' },
    speechSynthesis: {
      speak(u) { log.browserSpoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); },
      cancel() {}, getVoices: () => [], onvoiceschanged: null
    },
    SpeechSynthesisUtterance: function (t) { this.text = t; },
    i18n: { getLocale: () => 'en' },
    Audio: function (url) {
      this.url = url;
      this.play = () => { log.audioPlayed.push(url); setTimeout(() => this.onended && this.onended(), 0); return Promise.resolve(); };
      this.pause = () => {};
    },
    URL: { createObjectURL: () => 'blob:fake-' + Math.random(), revokeObjectURL() {} },
    fetch: (...a) => { log.fetchCalls++; return fetchImpl(...a); },
    addEventListener() {}, matchMedia: () => ({ matches: false }),
    AbortController
  };
  win.window = win;
  const sandbox = {
    window: win, document: { createElement: () => ({ innerHTML: '', textContent: '' }), createTextNode: () => ({}), addEventListener() {}, hidden: false, querySelectorAll: () => [] },
    localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } },
    sessionStorage: { getItem: (k) => (k in session ? session[k] : null), setItem: (k, v) => { session[k] = String(v); } },
    fetch: win.fetch, Audio: win.Audio, URL: win.URL, AbortController, Promise, setTimeout, clearTimeout, console,
    Date, JSON, Math, parseInt, parseFloat, isNaN, Array, Object, String, Error, RegExp, Number
  };
  vm.runInNewContext(clientSrc, sandbox);
  return { vt: win.CSVoiceTutor, log, session };
}
const tick = (ms) => new Promise((r) => setTimeout(r, ms || 30));
const audioResp = () => Promise.resolve({ ok: true, status: 200, blob: async () => ({ size: 10, type: 'audio/mpeg' }) });
const errResp = (status) => Promise.resolve({ ok: false, status, blob: async () => ({}) });

(async () => {
  {
    const { vt, log } = makeEnv(audioResp, true);
    assert.strictEqual(vt.speak('Add three to both sides of the equation.', { alreadyConverted: true }), true);
    await tick();
    assert.strictEqual(log.fetchCalls, 1, 'one proxy request');
    assert.strictEqual(log.audioPlayed.length, 1, 'cloud audio played');
    assert.strictEqual(log.browserSpoken.length, 0, 'browser voice untouched on success');
    ok('success path: cloud audio plays, browser voice not used');
  }
  {
    const { vt, log, session } = makeEnv(() => errResp(429), true);
    vt.speak('Divide both sides by two.', { alreadyConverted: true });
    await tick();
    assert.strictEqual(log.audioPlayed.length, 0);
    assert.ok(log.browserSpoken.join(' ').includes('Divide both sides by two.'), 'browser voice speaks after 429');
    assert.ok(Number(session.clipsat_tts_pause) > Date.now(), 'cloud voice paused after rate limit');
    const before = log.fetchCalls;
    vt.speak('Second click goes straight to the browser voice.', { alreadyConverted: true });
    await tick();
    assert.strictEqual(log.fetchCalls, before, 'no proxy call while paused');
    assert.ok(log.browserSpoken.join(' ').includes('Second click'), 'browser voice used while paused');
    ok('HTTP 429: falls back to browser voice and pauses cloud voice');
  }
  {
    const { vt, log } = makeEnv(() => Promise.reject(new Error('network down')), true);
    vt.speak('Check your answer.', { alreadyConverted: true });
    await tick();
    assert.ok(log.browserSpoken.join(' ').includes('Check your answer.'), 'browser voice speaks on network error');
    ok('network error: falls back to browser voice');
  }
  {
    const { vt, log } = makeEnv(audioResp, false);
    vt.speak('Sign in not required for voice.', { alreadyConverted: true });
    await tick();
    assert.strictEqual(log.audioPlayed.length, 0);
    assert.ok(log.browserSpoken.join(' ').includes('Sign in not required'), 'browser voice speaks when signed out');
    ok('signed out: falls back to browser voice');
  }
  {
    let n = 0;
    const { vt, log } = makeEnv(() => (++n === 1 ? audioResp() : errResp(502)), true);
    const long = Array.from({ length: 30 }, (_, i) => 'This is explanation sentence number ' + (i + 1) + ' of the walkthrough.').join(' ');
    vt.speak(long, { alreadyConverted: true });
    await tick(80);
    assert.strictEqual(log.audioPlayed.length, 1, 'first chunk played from cloud');
    assert.ok(log.browserSpoken.length > 0 && log.browserSpoken.join(' ').includes('number 30'), 'remaining chunks finish on browser voice');
    ok('mid-explanation failure: remaining text continues on browser voice');
  }

  console.log(`\nAll ${passed} cloud-voice checks passed.`);
})().catch((e) => { console.error('✗ FAILED:', e.message); process.exit(1); });
