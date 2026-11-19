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
    async hasProcessedWebhookEvent(eventId: string): Promise<boolean> {
      return events.has(eventId);
    },
    async recordWebhookEventIfNew(m: PlanMutation): Promise<boolean> {
      if (events.has(m.eventId)) return false;
      events.add(m.eventId);
      return true;
    },
    async upsertUserPlan(m: PlanMutation): Promise<void> {
      plans.set(m.userId, m);
    },
    async findUserIdByExternalRef(customerId: string | null, subId: string | null): Promise<string | null> {
      for (const [uid, m] of plans.entries()) {
        if ((subId && m.externalSubId === subId) || (customerId && m.externalCustomerId === customerId)) {
          return uid;
        }
      }
      return null;
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

Deno.test("billing-webhook: retries succeed after transient upsert failure and recurring Stripe events resolve by customer", async () => {
  const stripeSecret = "whsec_stripe_retry_789";
  const { db, plans } = createInMemoryDb();
  const uid = "11111111-2222-4333-8444-555555555555";
  const nowSec = Math.floor(Date.now() / 1000);

  // 1. Simulate transient DB failure on first upsertUserPlan call
  let failOnce = true;
  const origUpsert = db.upsertUserPlan.bind(db);
  db.upsertUserPlan = async (m: PlanMutation) => {
    if (failOnce) {
      failOnce = false;
      throw new Error("Transient DB timeout");
    }
    return origUpsert(m);
  };

  const actBody = JSON.stringify({
    id: "evt_stripe_retry_1",
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_retry",
        client_reference_id: uid,
        customer: "cus_recurring_1",
        subscription: "sub_recurring_1",
        amount_total: 7500,
        currency: "sar",
        status: "complete",
        metadata: { user_id: uid, billing_cycle: "annual" },
      },
    },
  });
  const sig1 = await hmacSha256Hex(stripeSecret, `${nowSec}.${actBody}`);
  let threw = false;
  try {
    await handleBillingRequest(
      new Request("https://clipsat.org/functions/v1/billing-webhook", {
        method: "POST",
        headers: { "stripe-signature": `t=${nowSec},v1=${sig1}` },
        body: actBody,
      }),
      { STRIPE_WEBHOOK_SECRET: stripeSecret },
      db,
    );
  } catch {
    threw = true;
  }
  assert(threw, "first delivery with transient upsert error must throw so Stripe retries");

  // Retry of the EXACT SAME eventId must now succeed (not be swallowed as duplicate!)
  const retryRes = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook", {
      method: "POST",
      headers: { "stripe-signature": `t=${nowSec},v1=${sig1}` },
      body: actBody,
    }),
    { STRIPE_WEBHOOK_SECRET: stripeSecret },
    db,
  );
  const retryJson = await retryRes.json();
  assert(retryRes.status === 200 && retryJson.provisioned === true && plans.get(uid)?.tier === "paid", "retry after transient failure must provision Plus");

  // 2. Recurring invoice.paid WITHOUT top-level client_reference_id or metadata must resolve via customer ID
  const invBody = JSON.stringify({
    id: "evt_stripe_inv_2",
    type: "invoice.paid",
    data: {
      object: {
        id: "in_123",
        customer: "cus_recurring_1",
        subscription: "sub_recurring_1",
        amount_paid: 7500,
        currency: "sar",
        status: "paid",
      },
    },
  });
  const sig2 = await hmacSha256Hex(stripeSecret, `${nowSec}.${invBody}`);
  const invRes = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook", {
      method: "POST",
      headers: { "stripe-signature": `t=${nowSec},v1=${sig2}` },
      body: invBody,
    }),
    { STRIPE_WEBHOOK_SECRET: stripeSecret },
    db,
  );
  const invJson = await invRes.json();
  assert(invRes.status === 200 && invJson.provisioned === true && invJson.userId === uid, "recurring invoice.paid must resolve userId by customer/sub lookup");

  // 3. charge.refunded WITHOUT metadata must revert user to free via customer ID
  const refBody = JSON.stringify({
    id: "evt_stripe_ref_3",
    type: "charge.refunded",
    data: { object: { id: "ch_123", customer: "cus_recurring_1", amount_paid: 7500, currency: "sar" } },
  });
  const sig3 = await hmacSha256Hex(stripeSecret, `${nowSec}.${refBody}`);
  const refRes = await handleBillingRequest(
    new Request("https://clipsat.org/functions/v1/billing-webhook", {
      method: "POST",
      headers: { "stripe-signature": `t=${nowSec},v1=${sig3}` },
      body: refBody,
    }),
    { STRIPE_WEBHOOK_SECRET: stripeSecret },
    db,
  );
  assert(refRes.status === 200 && plans.get(uid)?.tier === "free", "charge.refunded must revert user to free via customer lookup");
});
