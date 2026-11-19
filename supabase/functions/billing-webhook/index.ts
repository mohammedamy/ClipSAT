/**
 * ClipSAT — Automated SAR Billing & Webhook Provisioning Edge Function (WP-45)
 * ════════════════════════════════════════════════════════════════════════════
 * Supports:
 *  1. Moyasar SAR Webhooks (Mada, Apple Pay, STC Pay, Cards) — HMAC-SHA256 via `X-Moyasar-Signature`
 *  2. Stripe Global Webhooks — HMAC-SHA256 via `Stripe-Signature` (`t=...,v1=...`, ±300s replay window)
 *  3. Authenticated Checkout & Customer Billing Portal session creation (`X-ClipSAT-Action`)
 *
 * Security invariants:
 *  - Constant-time HMAC comparison (`timingSafeEqualHex`) on raw request bytes
 *  - Replay-attack protection (300s timestamp window on Stripe + `billing_webhook_events` idempotency)
 *  - Strict CORS origin allowlist for browser-initiated checkout/portal actions
 *  - Server-enforced Plus entitlements (`tier = 'paid'`, `daily_credits = 200`, `trial_ends_at`, `paid_until`)
 */

const MAX_WEBHOOK_BYTES = 262_144; // 256 KB
const STRIPE_TOLERANCE_SECONDS = 300;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_ORIGINS = new Set([
  "https://clipsat.org",
  "https://www.clipsat.org",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:8791",
]);

export function corsHeadersFor(origin: string | null): Record<string, string> | null {
  if (!origin) {
    return {
      "Access-Control-Allow-Origin": "https://clipsat.org",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-clipsat-action",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Vary": "Origin",
    };
  }
  if (!ALLOWED_ORIGINS.has(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-clipsat-action",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function jsonResp(status: number, body: Record<string, unknown>, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

export async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function timingSafeEqualHex(aHex: string, bHex: string): boolean {
  const a = String(aHex || "").trim().toLowerCase();
  const b = String(bHex || "").trim().toLowerCase();
  if (a.length !== 64 || b.length !== 64) return false;
  if (!/^[0-9a-f]{64}$/.test(a) || !/^[0-9a-f]{64}$/.test(b)) return false;
  let diff = 0;
  for (let i = 0; i < 64; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifyStripeSignature(
  rawBody: string,
  sigHeader: string | null,
  webhookSecret: string,
  nowEpochSec = Math.floor(Date.now() / 1000),
): Promise<{ valid: boolean; reason?: string }> {
  if (!sigHeader || !webhookSecret) return { valid: false, reason: "missing_signature_or_secret" };
  let timestamp = 0;
  const v1Sigs: string[] = [];
  for (const part of sigHeader.split(",")) {
    const eq = part.indexOf("=");
    if (eq <= 0) continue;
    const k = part.slice(0, eq).trim();
    const v = part.slice(eq + 1).trim();
    if (k === "t") timestamp = Number.parseInt(v, 10);
    if (k === "v1" && v) v1Sigs.push(v);
  }
  if (!Number.isFinite(timestamp) || timestamp <= 0 || v1Sigs.length === 0) {
    return { valid: false, reason: "malformed_stripe_signature" };
  }
  if (Math.abs(nowEpochSec - timestamp) > STRIPE_TOLERANCE_SECONDS) {
    return { valid: false, reason: "timestamp_out_of_tolerance" };
  }
  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = await hmacSha256Hex(webhookSecret, signedPayload);
  for (const candidate of v1Sigs) {
    if (timingSafeEqualHex(expected, candidate)) {
      return { valid: true };
    }
  }
  return { valid: false, reason: "signature_mismatch" };
}

export async function verifyMoyasarSignature(
  rawBody: string,
  sigHeader: string | null,
  webhookSecret: string,
): Promise<{ valid: boolean; reason?: string }> {
  if (!sigHeader || !webhookSecret) return { valid: false, reason: "missing_signature_or_secret" };
  const expected = await hmacSha256Hex(webhookSecret, rawBody);
  if (!timingSafeEqualHex(expected, sigHeader)) {
    return { valid: false, reason: "signature_mismatch" };
  }
  return { valid: true };
}

export interface PlanMutation {
  eventId: string;
  provider: "stripe" | "moyasar";
  eventType: string;
  userId: string;
  tier: "paid" | "free";
  dailyCredits: number;
  paidUntilIso: string;
  trialEndsAtIso: string | null;
  externalCustomerId: string | null;
  externalSubId: string | null;
  cancelAtPeriodEnd: boolean;
  amountHalala: number | null;
  currency: string;
}

export function normalizeStripeEvent(
  evt: Record<string, unknown>,
  nowMs = Date.now(),
  fallbackUserId?: string | null,
): PlanMutation | null {
  const eventId = String(evt.id || "").trim();
  const eventType = String(evt.type || "").trim();
  const dataObj = ((evt.data as Record<string, unknown>)?.object || {}) as Record<string, unknown>;
  if (!eventId || !eventType) return null;

  const meta = (dataObj.metadata || {}) as Record<string, unknown>;
  const subDetailsMeta = ((dataObj.subscription_details as Record<string, unknown>)?.metadata || {}) as Record<string, unknown>;
  const parentSubMeta = (((dataObj.parent as Record<string, unknown>)?.subscription_details as Record<string, unknown>)?.metadata || {}) as Record<string, unknown>;
  const firstLineMeta = ((((dataObj.lines as Record<string, unknown>)?.data as Array<Record<string, unknown>>)?.[0]?.metadata) || {}) as Record<string, unknown>;
  const rawUid = String(
    dataObj.client_reference_id ||
    meta.user_id ||
    subDetailsMeta.user_id ||
    parentSubMeta.user_id ||
    firstLineMeta.user_id ||
    fallbackUserId ||
    "",
  ).trim();
  if (!UUID_RE.test(rawUid)) return null;

  const customerId = typeof dataObj.customer === "string" ? dataObj.customer : null;
  const subId = typeof dataObj.subscription === "string"
    ? dataObj.subscription
    : (typeof dataObj.id === "string" && eventType.startsWith("customer.subscription.") ? dataObj.id : null);
  const amountTotal = typeof dataObj.amount_total === "number"
    ? dataObj.amount_total
    : (typeof dataObj.amount_paid === "number" ? dataObj.amount_paid : null);
  const currency = String(dataObj.currency || "SAR").toUpperCase();

  if (
    eventType === "checkout.session.completed" ||
    eventType === "invoice.paid" ||
    eventType === "customer.subscription.updated" ||
    eventType === "customer.subscription.created"
  ) {
    const status = String(dataObj.status || "active");
    if (status === "canceled" || status === "unpaid" || status === "incomplete_expired") {
      return {
        eventId,
        provider: "stripe",
        eventType,
        userId: rawUid,
        tier: "free",
        dailyCredits: 20,
        paidUntilIso: new Date(nowMs).toISOString(),
        trialEndsAtIso: null,
        externalCustomerId: customerId,
        externalSubId: subId,
        cancelAtPeriodEnd: false,
        amountHalala: amountTotal,
        currency,
      };
    }
    const periodEndSec = typeof dataObj.current_period_end === "number" ? dataObj.current_period_end : 0;
    const trialEndSec = typeof dataObj.trial_end === "number" ? dataObj.trial_end : 0;
    const cycle = String(meta.billing_cycle || (amountTotal && amountTotal >= 6000 ? "annual" : "monthly"));
    const fallbackDays = cycle === "annual" ? 366 : 31;
    const paidUntilMs = periodEndSec > 0 ? periodEndSec * 1000 : nowMs + fallbackDays * 86_400_000;
    const trialEndsAtIso = trialEndSec > 0
      ? new Date(trialEndSec * 1000).toISOString()
      : (meta.trial === "true" ? new Date(nowMs + 30 * 86_400_000).toISOString() : null);

    return {
      eventId,
      provider: "stripe",
      eventType,
      userId: rawUid,
      tier: "paid",
      dailyCredits: 200,
      paidUntilIso: new Date(paidUntilMs).toISOString(),
      trialEndsAtIso,
      externalCustomerId: customerId,
      externalSubId: subId,
      cancelAtPeriodEnd: Boolean(dataObj.cancel_at_period_end),
      amountHalala: amountTotal,
      currency,
    };
  }

  if (eventType === "customer.subscription.deleted" || eventType === "charge.refunded") {
    return {
      eventId,
      provider: "stripe",
      eventType,
      userId: rawUid,
      tier: "free",
      dailyCredits: 20,
      paidUntilIso: new Date(nowMs).toISOString(),
      trialEndsAtIso: null,
      externalCustomerId: customerId,
      externalSubId: subId,
      cancelAtPeriodEnd: false,
      amountHalala: amountTotal,
      currency,
    };
  }

  return null;
}

export function normalizeMoyasarEvent(evt: Record<string, unknown>, nowMs = Date.now()): PlanMutation | null {
  const eventId = String(evt.id || "").trim();
  const eventType = String(evt.type || "").trim();
  const dataObj = ((evt.data || evt) as Record<string, unknown>);
  const meta = (dataObj.metadata || {}) as Record<string, unknown>;
  const rawUid = String(meta.user_id || "").trim();
  const paymentId = String(dataObj.id || eventId).trim();
  if (!paymentId || !eventType || !UUID_RE.test(rawUid)) return null;

  const amountHalala = typeof dataObj.amount === "number" ? dataObj.amount : null;
  const currency = String(dataObj.currency || "SAR").toUpperCase();
  const status = String(dataObj.status || "").toLowerCase();

  if ((eventType === "payment_paid" || eventType === "invoice_paid") && (status === "paid" || status === "")) {
    const isAnnual = meta.billing_cycle === "annual" || (amountHalala !== null && amountHalala >= 6000);
    const days = isAnnual ? 366 : 31;
    const trialDays = meta.trial === "true" ? 30 : 0;
    const totalDays = days + trialDays;
    return {
      eventId: eventId || `moyasar_${paymentId}_paid`,
      provider: "moyasar",
      eventType,
      userId: rawUid,
      tier: "paid",
      dailyCredits: 200,
      paidUntilIso: new Date(nowMs + totalDays * 86_400_000).toISOString(),
      trialEndsAtIso: trialDays > 0 ? new Date(nowMs + trialDays * 86_400_000).toISOString() : null,
      externalCustomerId: null,
      externalSubId: paymentId,
      cancelAtPeriodEnd: false,
      amountHalala,
      currency,
    };
  }

  if (eventType === "payment_refunded" || eventType === "payment_voided" || status === "refunded") {
    return {
      eventId: eventId || `moyasar_${paymentId}_refunded`,
      provider: "moyasar",
      eventType,
      userId: rawUid,
      tier: "free",
      dailyCredits: 20,
      paidUntilIso: new Date(nowMs).toISOString(),
      trialEndsAtIso: null,
      externalCustomerId: null,
      externalSubId: paymentId,
      cancelAtPeriodEnd: false,
      amountHalala,
      currency,
    };
  }

  return null;
}

export interface BillingDbAdapter {
  hasProcessedWebhookEvent?(eventId: string): Promise<boolean>;
  recordWebhookEventIfNew(mutation: PlanMutation): Promise<boolean>;
  upsertUserPlan(mutation: PlanMutation): Promise<void>;
  findUserIdByExternalRef?(customerId: string | null, subId: string | null): Promise<string | null>;
  getUserFromJwt(jwt: string): Promise<{ id: string; email?: string } | null>;
  getUserPlan(userId: string): Promise<Record<string, unknown> | null>;
}

function createSupabaseRestAdapter(supabaseUrl: string, serviceRoleKey: string): BillingDbAdapter {
  const baseUrl = supabaseUrl.replace(/\/+$/, "");
  const adminHeaders = {
    "apikey": serviceRoleKey,
    "Authorization": `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };

  return {
    async hasProcessedWebhookEvent(eventId: string): Promise<boolean> {
      const res = await fetch(
        `${baseUrl}/rest/v1/billing_webhook_events?event_id=eq.${encodeURIComponent(eventId)}&select=event_id&limit=1`,
        { headers: adminHeaders },
      );
      if (!res.ok) return false;
      const rows = await res.json();
      return Array.isArray(rows) && rows.length > 0;
    },

    async recordWebhookEventIfNew(m: PlanMutation): Promise<boolean> {
      const res = await fetch(`${baseUrl}/rest/v1/billing_webhook_events`, {
        method: "POST",
        headers: { ...adminHeaders, "Prefer": "resolution=ignore-duplicates,return=representation" },
        body: JSON.stringify({
          event_id: m.eventId,
          provider: m.provider,
          event_type: m.eventType,
          user_id: m.userId,
          amount_halala: m.amountHalala,
          currency: m.currency,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to record billing_webhook_events: ${res.status} ${txt}`);
      }
      const rows = await res.json();
      return Array.isArray(rows) && rows.length > 0;
    },

    async upsertUserPlan(m: PlanMutation): Promise<void> {
      const res = await fetch(`${baseUrl}/rest/v1/ai_plans?on_conflict=user_id`, {
        method: "POST",
        headers: { ...adminHeaders, "Prefer": "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({
          user_id: m.userId,
          tier: m.tier,
          paid_until: m.paidUntilIso,
          provider: m.provider,
          external_customer_id: m.externalCustomerId,
          external_sub_id: m.externalSubId,
          daily_credits: m.dailyCredits,
          trial_ends_at: m.trialEndsAtIso,
          cancel_at_period_end: m.cancelAtPeriodEnd,
          updated_at: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to upsert ai_plans: ${res.status} ${txt}`);
      }
    },

    async getUserFromJwt(jwt: string): Promise<{ id: string; email?: string } | null> {
      if (!jwt) return null;
      const res = await fetch(`${baseUrl}/auth/v1/user`, {
        headers: { "apikey": serviceRoleKey, "Authorization": `Bearer ${jwt}` },
      });
      if (!res.ok) return null;
      const u = await res.json();
      return u && typeof u.id === "string" ? { id: u.id, email: u.email } : null;
    },

    async getUserPlan(userId: string): Promise<Record<string, unknown> | null> {
      const res = await fetch(
        `${baseUrl}/rest/v1/ai_plans?user_id=eq.${encodeURIComponent(userId)}&select=*`,
        { headers: adminHeaders },
      );
      if (!res.ok) return null;
      const rows = await res.json();
      return Array.isArray(rows) && rows[0] ? rows[0] : null;
    },

    async findUserIdByExternalRef(customerId: string | null, subId: string | null): Promise<string | null> {
      if (subId) {
        const res = await fetch(
          `${baseUrl}/rest/v1/ai_plans?external_sub_id=eq.${encodeURIComponent(subId)}&select=user_id&limit=1`,
          { headers: adminHeaders },
        );
        if (res.ok) {
          const rows = await res.json();
          if (Array.isArray(rows) && rows[0]?.user_id) return String(rows[0].user_id);
        }
      }
      if (customerId) {
        const res = await fetch(
          `${baseUrl}/rest/v1/ai_plans?external_customer_id=eq.${encodeURIComponent(customerId)}&select=user_id&limit=1`,
          { headers: adminHeaders },
        );
        if (res.ok) {
          const rows = await res.json();
          if (Array.isArray(rows) && rows[0]?.user_id) return String(rows[0].user_id);
        }
      }
      return null;
    },
  };
}

export interface BillingEnv {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  MOYASAR_WEBHOOK_SECRET?: string;
  STRIPE_SECRET_KEY?: string;
  MOYASAR_SECRET_KEY?: string;
}

export async function handleBillingRequest(
  req: Request,
  env: BillingEnv,
  customDb?: BillingDbAdapter,
): Promise<Response> {
  const origin = req.headers.get("origin");
  const action = req.headers.get("x-clipsat-action");

  if (req.method === "OPTIONS") {
    const cors = corsHeadersFor(origin);
    if (!cors) return jsonResp(403, { error: "Origin not allowed" });
    return new Response(null, { status: 204, headers: cors });
  }

  if (req.method !== "POST") {
    return jsonResp(405, { error: "Method not allowed" });
  }

  const contentLength = Number(req.headers.get("content-length") || "0");
  if (contentLength > MAX_WEBHOOK_BYTES) {
    return jsonResp(413, { error: "Payload too large" });
  }

  const rawBody = await req.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_WEBHOOK_BYTES) {
    return jsonResp(413, { error: "Payload too large" });
  }

  const db = customDb || createSupabaseRestAdapter(
    env.SUPABASE_URL || "",
    env.SUPABASE_SERVICE_ROLE_KEY || "",
  );

  // ── Branch A: Browser-initiated Checkout or Billing Portal Session ──
  if (action === "create-checkout" || action === "customer-portal") {
    const cors = corsHeadersFor(origin);
    if (!cors) return jsonResp(403, { error: "Origin not allowed" });

    const authHeader = req.headers.get("authorization") || "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "").trim();
    const user = await db.getUserFromJwt(jwt);
    if (!user) return jsonResp(401, { error: "Sign in required before starting ClipSAT Plus checkout." }, cors);

    let payload: Record<string, unknown> = {};
    try {
      payload = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      return jsonResp(400, { error: "Invalid JSON body" }, cors);
    }

    if (action === "customer-portal") {
      const plan = await db.getUserPlan(user.id);
      if (
        plan &&
        plan.provider === "stripe" &&
        typeof plan.external_customer_id === "string" &&
        env.STRIPE_SECRET_KEY
      ) {
        const form = new URLSearchParams({
          customer: plan.external_customer_id,
          return_url: "https://clipsat.org/pricing/",
        });
        const portalRes = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: form.toString(),
        });
        if (portalRes.ok) {
          const portalJson = await portalRes.json();
          return jsonResp(200, { ok: true, url: portalJson.url, plan }, cors);
        }
      }
      return jsonResp(200, { ok: true, url: null, plan }, cors);
    }

    const provider = payload.provider === "stripe" ? "stripe" : "moyasar";
    const cycle = payload.cycle === "monthly" ? "monthly" : "annual";
    const amountHalala = cycle === "annual" ? 7500 : 1500;
    const desc = cycle === "annual"
      ? "ClipSAT Plus — Annual Plan (75 SAR/year · 200 AI credits/day)"
      : "ClipSAT Plus — Monthly Plan (15 SAR/month · 200 AI credits/day)";

    if (provider === "moyasar" && env.MOYASAR_SECRET_KEY) {
      const basicAuth = btoa(`${env.MOYASAR_SECRET_KEY}:`);
      const moyRes = await fetch("https://api.moyasar.com/v1/invoices", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountHalala,
          currency: "SAR",
          description: desc,
          callback_url: "https://clipsat.org/pricing/?checkout=success",
          back_url: "https://clipsat.org/pricing/",
          metadata: {
            user_id: user.id,
            email: user.email || "",
            billing_cycle: cycle,
            trial: "true",
          },
        }),
      });
      if (moyRes.ok) {
        const inv = await moyRes.json();
        return jsonResp(200, { ok: true, configured: true, provider: "moyasar", url: inv.url }, cors);
      }
    }

    if (provider === "stripe" && env.STRIPE_SECRET_KEY) {
      const form = new URLSearchParams({
        "mode": "subscription",
        "success_url": "https://clipsat.org/pricing/?checkout=success",
        "cancel_url": "https://clipsat.org/pricing/?checkout=cancelled",
        "client_reference_id": user.id,
        "customer_email": user.email || "",
        "metadata[user_id]": user.id,
        "metadata[billing_cycle]": cycle,
        "metadata[trial]": "true",
        "subscription_data[trial_period_days]": "30",
        "subscription_data[metadata][user_id]": user.id,
        "subscription_data[metadata][billing_cycle]": cycle,
        "line_items[0][quantity]": "1",
        "line_items[0][price_data][currency]": "sar",
        "line_items[0][price_data][unit_amount]": String(amountHalala),
        "line_items[0][price_data][recurring][interval]": cycle === "annual" ? "year" : "month",
        "line_items[0][price_data][product_data][name]": desc,
      });
      const stRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      });
      if (stRes.ok) {
        const sess = await stRes.json();
        return jsonResp(200, { ok: true, configured: true, provider: "stripe", url: sess.url }, cors);
      }
    }

    return jsonResp(200, { ok: true, configured: false, fallback: "whatsapp", provider, cycle }, cors);
  }

  // ── Branch B: Server-to-Server Signed Payment Webhooks (Stripe & Moyasar) ──
  const url = new URL(req.url);
  const stripeSig = req.headers.get("stripe-signature");
  const moyasarSig = req.headers.get("x-moyasar-signature");
  const queryProvider = url.searchParams.get("provider");

  let mutation: PlanMutation | null = null;

  if (stripeSig || queryProvider === "stripe") {
    const check = await verifyStripeSignature(rawBody, stripeSig, env.STRIPE_WEBHOOK_SECRET || "");
    if (!check.valid) {
      return jsonResp(401, { error: "Invalid Stripe webhook signature", reason: check.reason });
    }
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return jsonResp(400, { error: "Malformed JSON webhook body" });
    }
    mutation = normalizeStripeEvent(parsed);
    if (!mutation && db.findUserIdByExternalRef) {
      const dataObj = ((parsed.data as Record<string, unknown>)?.object || {}) as Record<string, unknown>;
      const customerId = typeof dataObj.customer === "string" ? dataObj.customer : null;
      const subId = typeof dataObj.subscription === "string"
        ? dataObj.subscription
        : (typeof dataObj.id === "string" && String(parsed.type || "").startsWith("customer.subscription.") ? dataObj.id : null);
      if (customerId || subId) {
        const lookedUpUid = await db.findUserIdByExternalRef(customerId, subId);
        if (lookedUpUid) {
          mutation = normalizeStripeEvent(parsed, Date.now(), lookedUpUid);
        }
      }
    }
  } else if (moyasarSig || queryProvider === "moyasar") {
    const check = await verifyMoyasarSignature(rawBody, moyasarSig, env.MOYASAR_WEBHOOK_SECRET || "");
    if (!check.valid) {
      return jsonResp(401, { error: "Invalid Moyasar webhook signature", reason: check.reason });
    }
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return jsonResp(400, { error: "Malformed JSON webhook body" });
    }
    mutation = normalizeMoyasarEvent(parsed);
  } else {
    return jsonResp(401, { error: "Missing webhook cryptographic signature header" });
  }

  if (!mutation) {
    return jsonResp(200, { ok: true, ignored: true });
  }

  // Check prior processing BEFORE mutating; record idempotency marker AFTER
  // upsertUserPlan succeeds so transient DB errors are safely retried by Stripe/Moyasar.
  if (db.hasProcessedWebhookEvent) {
    const alreadyDone = await db.hasProcessedWebhookEvent(mutation.eventId);
    if (alreadyDone) {
      return jsonResp(200, { ok: true, duplicate: true, eventId: mutation.eventId });
    }
    await db.upsertUserPlan(mutation);
    await db.recordWebhookEventIfNew(mutation);
  } else {
    await db.upsertUserPlan(mutation);
    const isNew = await db.recordWebhookEventIfNew(mutation);
    if (!isNew) {
      return jsonResp(200, { ok: true, duplicate: true, eventId: mutation.eventId });
    }
  }

  return jsonResp(200, {
    ok: true,
    provisioned: true,
    provider: mutation.provider,
    userId: mutation.userId,
    tier: mutation.tier,
    dailyCredits: mutation.dailyCredits,
  });
}

declare const Deno: {
  env: { get(k: string): string | undefined };
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
} | undefined;

if (typeof Deno !== "undefined" && (import.meta as unknown as { main?: boolean }).main) {
  Deno.serve((req: Request) =>
    handleBillingRequest(req, {
      SUPABASE_URL: Deno.env.get("SUPABASE_URL"),
      SUPABASE_SERVICE_ROLE_KEY: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
      STRIPE_WEBHOOK_SECRET: Deno.env.get("STRIPE_WEBHOOK_SECRET"),
      MOYASAR_WEBHOOK_SECRET: Deno.env.get("MOYASAR_WEBHOOK_SECRET"),
      STRIPE_SECRET_KEY: Deno.env.get("STRIPE_SECRET_KEY"),
      MOYASAR_SECRET_KEY: Deno.env.get("MOYASAR_SECRET_KEY"),
    })
  );
}
