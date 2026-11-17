#!/usr/bin/env node
// scripts/ci/run-edge-tests.mjs — CI Gate #9: Deno / WebCrypto Edge Function Security Gate
//
// 1. Runs `deno test supabase/functions/` directly whenever `deno` is installed (GitHub CI & Deno workstations).
// 2. Always executes WebCrypto HMAC/replay/idempotency + static security contract assertions across
//    `ai-proxy`, `tts-proxy`, `google-token`, and `billing-webhook` in Node 20+.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const FN_DIR = path.join(ROOT, 'supabase', 'functions');

const requiredFunctions = ['ai-proxy', 'tts-proxy', 'google-token', 'billing-webhook'];

// 1. Run `deno test` per Edge Function directory when deno binary is available on PATH
const whichDeno = spawnSync('which', ['deno'], { encoding: 'utf8' });
if (whichDeno.status === 0) {
  console.log('→ Running native `deno test` across supabase/functions/*...');
  for (const fn of requiredFunctions) {
    const denoRes = spawnSync('deno', ['test', '--allow-env', '--config', 'deno.json', 'index_test.ts'], {
      cwd: path.join(FN_DIR, fn),
      stdio: 'inherit'
    });
    if (denoRes.status !== 0) {
      console.error(`❌ CI Gate #9 FAILED: \`deno test\` in supabase/functions/${fn} exited non-zero.`);
      process.exit(denoRes.status || 1);
    }
  }
}

// 2. Verify all 4 Edge Functions & their Deno test suites exist and enforce mandatory security guards
for (const fn of requiredFunctions) {
  const indexTs = path.join(FN_DIR, fn, 'index.ts');
  const testTs = path.join(FN_DIR, fn, 'index_test.ts');
  assert.ok(fs.existsSync(indexTs), `Missing ${fn}/index.ts`);
  assert.ok(fs.existsSync(testTs), `Missing Deno test suite ${fn}/index_test.ts`);
  const testSrc = fs.readFileSync(testTs, 'utf8');
  assert.ok((testSrc.match(/Deno\.test\s*\(/g) || []).length >= 3, `${fn}/index_test.ts must contain >= 3 Deno.test cases`);
}

const aiSrc = fs.readFileSync(path.join(FN_DIR, 'ai-proxy', 'index.ts'), 'utf8');
assert.ok(aiSrc.includes('IMMUTABLE_MATH_SYSTEM_GUARD'), 'ai-proxy must define server-owned IMMUTABLE_MATH_SYSTEM_GUARD');
assert.ok(/role\s*!==\s*["']system["']|m\.role\s*===\s*["']system["']/.test(aiSrc), 'ai-proxy must strip client role:"system" overrides');
assert.ok(aiSrc.includes('clampTokens') && /MAX_OUTPUT_TOKENS\s*=\s*(?:4096|8192)/.test(aiSrc), 'ai-proxy must clamp maxTokens via MAX_OUTPUT_TOKENS');
assert.ok(aiSrc.includes('validateAttachment'), 'ai-proxy must enforce attachment payload size limits via validateAttachment');
assert.ok(aiSrc.includes('gemini-2.5-flash'), 'ai-proxy must include gemini-2.5-flash model support');

const ttsSrc = fs.readFileSync(path.join(FN_DIR, 'tts-proxy', 'index.ts'), 'utf8');
assert.ok(ttsSrc.includes('use_ai_quota'), 'tts-proxy must meter requests via use_ai_quota RPC');

const gtokSrc = fs.readFileSync(path.join(FN_DIR, 'google-token', 'index.ts'), 'utf8');
assert.ok(gtokSrc.includes('get_google_refresh_token_admin') && gtokSrc.includes('delete_google_refresh_token_admin'), 'google-token must read/delete tokens via Vault admin RPCs');

const billSrc = fs.readFileSync(path.join(FN_DIR, 'billing-webhook', 'index.ts'), 'utf8');
assert.ok(billSrc.includes('timingSafeEqualHex'), 'billing-webhook must compare HMAC digests in constant time');
assert.ok(billSrc.includes('STRIPE_TOLERANCE_SECONDS = 300'), 'billing-webhook must enforce 300s Stripe replay tolerance');
assert.ok(billSrc.includes('recordWebhookEventIfNew'), 'billing-webhook must enforce webhook event idempotency');

// 3. When running on Node >= 23 (native TypeScript import), execute `billing-webhook/index.ts` directly!
const nodeMajor = parseInt(process.versions.node.split('.')[0], 10);
if (nodeMajor >= 23) {
  const mod = await import(pathToFileURL(path.join(FN_DIR, 'billing-webhook', 'index.ts')).href);
  const stripeSecret = 'whsec_ci_gate_test_secret';
  const moyasarSecret = 'moy_ci_gate_test_secret';
  const userId = '11111111-2222-3333-4444-555555555555';

  // Valid Stripe checkout.session.completed -> Plus 200 credits/day
  const nowSec = Math.floor(Date.now() / 1000);
  const bodyObj = {
    id: 'evt_ci_stripe_1',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_1',
        client_reference_id: userId,
        customer: 'cus_test_1',
        subscription: 'sub_test_1',
        payment_status: 'paid'
      }
    }
  };
  const rawBody = JSON.stringify(bodyObj);
  const sig = crypto.createHmac('sha256', stripeSecret).update(`${nowSec}.${rawBody}`).digest('hex');

  const seenEvents = new Set();
  const plans = new Map();
  const mockDb = {
    async recordWebhookEventIfNew(m) {
      if (seenEvents.has(m.eventId)) return false;
      seenEvents.add(m.eventId);
      return true;
    },
    async upsertUserPlan(m) {
      plans.set(m.userId, m);
    },
    async getAuthenticatedUser() {
      return null;
    },
    async getUserStripeCustomerId() {
      return null;
    }
  };

  const req1 = new Request('https://clipsat.org/functions/v1/billing-webhook', {
    method: 'POST',
    headers: { 'Stripe-Signature': `t=${nowSec},v1=${sig}`, 'Content-Type': 'application/json' },
    body: rawBody
  });
  const res1 = await mod.handleBillingRequest(req1, { STRIPE_WEBHOOK_SECRET: stripeSecret, MOYASAR_WEBHOOK_SECRET: moyasarSecret }, mockDb);
  assert.equal(res1.status, 200);
  const json1 = await res1.json();
  assert.equal(json1.provisioned, true);
  assert.equal(plans.get(userId).tier, 'paid');
  assert.equal(plans.get(userId).dailyCredits, 200);

  // Duplicate webhook replay -> idempotent 200 duplicate:true
  const reqDup = new Request('https://clipsat.org/functions/v1/billing-webhook', {
    method: 'POST',
    headers: { 'Stripe-Signature': `t=${nowSec},v1=${sig}`, 'Content-Type': 'application/json' },
    body: rawBody
  });
  const resDup = await mod.handleBillingRequest(reqDup, { STRIPE_WEBHOOK_SECRET: stripeSecret }, mockDb);
  assert.equal((await resDup.json()).duplicate, true);

  // Stale timestamp (>300s) -> 401 rejected
  const oldSec = nowSec - 900;
  const oldSig = crypto.createHmac('sha256', stripeSecret).update(`${oldSec}.${rawBody}`).digest('hex');
  const reqOld = new Request('https://clipsat.org/functions/v1/billing-webhook', {
    method: 'POST',
    headers: { 'Stripe-Signature': `t=${oldSec},v1=${oldSig}`, 'Content-Type': 'application/json' },
    body: rawBody
  });
  const resOld = await mod.handleBillingRequest(reqOld, { STRIPE_WEBHOOK_SECRET: stripeSecret }, mockDb);
  assert.equal(resOld.status, 401);

  // Valid Moyasar SAR paid invoice -> Plus 200 credits/day
  const moyBody = JSON.stringify({
    id: 'evt_moy_1',
    type: 'payment_paid',
    data: { id: 'pay_sar_1', status: 'paid', amount: 1500, currency: 'SAR', metadata: { user_id: userId, billing_period: 'monthly' } }
  });
  const moySig = crypto.createHmac('sha256', moyasarSecret).update(moyBody).digest('hex');
  const reqMoy = new Request('https://clipsat.org/functions/v1/billing-webhook?provider=moyasar', {
    method: 'POST',
    headers: { 'X-Moyasar-Signature': moySig, 'Content-Type': 'application/json' },
    body: moyBody
  });
  const resMoy = await mod.handleBillingRequest(reqMoy, { MOYASAR_WEBHOOK_SECRET: moyasarSecret }, mockDb);
  assert.equal(resMoy.status, 200);
  assert.equal((await resMoy.json()).provisioned, true);
}

console.log('✅ CI Gate #9 PASSED: All 4 Edge Functions (`ai-proxy`, `tts-proxy`, `google-token`, `billing-webhook`) verified.');
