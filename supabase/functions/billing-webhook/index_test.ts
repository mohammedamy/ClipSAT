/**
 * Automated Deno unit tests for `supabase/functions/billing-webhook/index.ts` (WP-45 & WP-47)
 */
import {
  BillingDbAdapter,
  handleBillingRequest,
  hmacSha256Hex,
  PlanMutation,
  verifyMoyasarSignature,
  verifyStripeSignature,
} from "./index.ts";

function assert(cond: unknown, msg: string): void {
  if (!cond) throw new Error(msg);
}

function createInMemoryDb(): { db: BillingDbAdapter; plans: Map<string, PlanMutation>; events: Set<string> } {
  const events = new Set<string>();
  const plans = new Map<string, PlanMutation>();
  const db: BillingDbAdapter = {
    async recordWebhookEventIfNew(m: PlanMutation): Promise<boolean> {
      if (events.has(m.eventId)) return false;
      events.add(m.eventId);
      return true;
    },
    async upsertUserPlan(m: PlanMutation): Promise<void> {
      plans.set(m.userId, m);
    },
    async getUserFromJwt(jwt: string) {
      return jwt === "valid-user-jwt" ? { id: "11111111-2222-4333-8444-555555555555", email: "student@clipsat.org" } : null;
    },
    async getUserPlan(userId: string) {
      const m = plans.get(userId);
      return m ? { user_id: userId, tier: m.tier, paid_until: m.paidUntilIso, daily_credits: m.dailyCredits, provider: m.provider } : null;
    },
  };
  return { db, plans, events };
}

Deno.test("billing-webhook: verifies Moyasar HMAC-SHA256, provisions 200 credits/day, and deduplicates replays", async () => {
  const secret = "whsec_moyasar_test_secret_123";
  const { db, plans } = createInMemoryDb();
  const uid = "11111111-2222-4333-8444-555555555555";
  const body = JSON.stringify({
    id: "evt_moy_001",
    type: "payment_paid",
    data: {
      id: "pay_moy_999",
      status: "paid",
      amount: 7500,
      currency: "SAR",
      metadata: { user_id: uid, billing_cycle: "annual", trial: "true" },
    },
  });

  // 1. Forged signature must fail with 401
  const badRes = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook?provider=moyasar", {
      method: "POST",
      headers: { "x-moyasar-signature": "0".repeat(64) },
      body,
    }),
    { MOYASAR_WEBHOOK_SECRET: secret },
    db,
  );
  assert(badRes.status === 401, "forged Moyasar signature must return 401");

  // 2. Valid signature provisions Plus (`tier = 'paid'`, `dailyCredits = 200`)
  const validSig = await hmacSha256Hex(secret, body);
  const okRes = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook?provider=moyasar", {
      method: "POST",
      headers: { "x-moyasar-signature": validSig },
      body,
    }),
    { MOYASAR_WEBHOOK_SECRET: secret },
    db,
  );
  assert(okRes.status === 200, "valid Moyasar webhook must return 200");
  const okJson = await okRes.json();
  assert(okJson.provisioned === true && okJson.dailyCredits === 200, "must provision 200 daily credits");
  assert(plans.get(uid)?.tier === "paid", "user plan must be upgraded to paid");

  // 3. Duplicate webhook delivery is idempotent no-op
  const dupRes = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook?provider=moyasar", {
      method: "POST",
      headers: { "x-moyasar-signature": validSig },
      body,
    }),
    { MOYASAR_WEBHOOK_SECRET: secret },
    db,
  );
  const dupJson = await dupRes.json();
  assert(dupJson.duplicate === true, "replayed eventId must be marked duplicate");
});

Deno.test("billing-webhook: verifies Stripe signature, blocks stale replay timestamps, and handles subscription cancellation", async () => {
  const stripeSecret = "whsec_stripe_test_secret_456";
  const { db, plans } = createInMemoryDb();
  const uid = "11111111-2222-4333-8444-555555555555";
  const nowSec = Math.floor(Date.now() / 1000);

  const actBody = JSON.stringify({
    id: "evt_stripe_act_1",
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_1",
        client_reference_id: uid,
        customer: "cus_123",
        subscription: "sub_123",
        amount_total: 7500,
        currency: "sar",
        status: "complete",
        metadata: { user_id: uid, billing_cycle: "annual", trial: "true" },
      },
    },
  });

  // Stale timestamp (>300s old) must be rejected
  const staleTs = nowSec - 900;
  const staleSig = await hmacSha256Hex(stripeSecret, `${staleTs}.${actBody}`);
  const staleCheck = await verifyStripeSignature(actBody, `t=${staleTs},v1=${staleSig}`, stripeSecret, nowSec);
  assert(staleCheck.valid === false && staleCheck.reason === "timestamp_out_of_tolerance", "stale Stripe replay must fail");

  // Fresh signature activates Plus
  const freshSig = await hmacSha256Hex(stripeSecret, `${nowSec}.${actBody}`);
  const res1 = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook", {
      method: "POST",
      headers: { "stripe-signature": `t=${nowSec},v1=${freshSig}` },
      body: actBody,
    }),
    { STRIPE_WEBHOOK_SECRET: stripeSecret },
    db,
  );
  assert(res1.status === 200 && plans.get(uid)?.tier === "paid", "Stripe checkout must activate Plus");

  // Subscription deletion reverts cleanly to Free floor (20 credits/day)
  const delBody = JSON.stringify({
    id: "evt_stripe_del_2",
    type: "customer.subscription.deleted",
    data: { object: { id: "sub_123", metadata: { user_id: uid } } },
  });
  const delSig = await hmacSha256Hex(stripeSecret, `${nowSec}.${delBody}`);
  const res2 = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook", {
      method: "POST",
      headers: { "stripe-signature": `t=${nowSec},v1=${delSig}` },
      body: delBody,
    }),
    { STRIPE_WEBHOOK_SECRET: stripeSecret },
    db,
  );
  assert(res2.status === 200 && plans.get(uid)?.tier === "free" && plans.get(uid)?.dailyCredits === 20, "cancellation must revert to Free floor (20 credits/day)");
  const moyCheck = await verifyMoyasarSignature("{}", null, "sec");
  assert(moyCheck.valid === false, "missing Moyasar signature must fail");
});

Deno.test("billing-webhook: blocks untrusted browser origins on checkout actions and requires auth", async () => {
  const { db } = createInMemoryDb();
  const forbidden = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook", {
      method: "POST",
      headers: {
        origin: "https://evil-phishing.site",
        "x-clipsat-action": "create-checkout",
      },
      body: JSON.stringify({ provider: "moyasar" }),
    }),
    {},
    db,
  );
  assert(forbidden.status === 403, "untrusted browser origin must return HTTP 403");

  const unauth = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook", {
      method: "POST",
      headers: {
        origin: "https://clipsat.org",
        "x-clipsat-action": "create-checkout",
      },
      body: JSON.stringify({ provider: "moyasar" }),
    }),
    {},
    db,
  );
  assert(unauth.status === 401, "unauthenticated checkout session creation must return HTTP 401");
});
