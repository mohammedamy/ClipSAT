// ClipSAT AI proxy
// ════════════════════════════════════════════════════════════════════════
// Holds the OpenAI API key server-side (set via `supabase secrets set
// AI_API_KEY=...` — never in a browser bundle or git commit) and stands in
// for the AI provider so the client never sees it. Replaces the old
// pattern of embedding a (base64'd, not actually secret) key directly in
// engine.js — see src/scripts/engine.js's callSharedProxy for the client
// half of this. (Originally built against Cerebras's free tier — swapped
// to OpenAI, a real paid provider, after Cerebras's account turned out to
// need a $1,500+/mo subscription rather than the documented no-card free
// tier. This is now genuinely "activate a paid AI securely": the key is
// server-side only, gated behind sign-in, and rate-capped below — see the
// account's own OpenAI dashboard for a spend/budget limit as a second,
// independent safety net on top of the per-user cap here.)
//
// Gate: `auth: 'user'` (below) makes @supabase/server verify the caller's
// Supabase session JWT before this handler even runs — a request with no
// session, an expired session, or just the public anon/publishable key
// (not a real signed-in user) is rejected with 401 automatically. That's
// the actual "must be signed in" requirement; verify_jwt=true in
// config.toml is a cheap earlier check for a malformed/absent auth header,
// not a substitute for this.
//
// On top of "signed in", each user gets a small daily call cap (enforced
// atomically in Postgres — see try_use_ai_quota in schema.sql) so one
// account can't run up real spend by itself.
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-5.6-luna";

// Generous enough for real daily use (a student running a handful of
// practice quizzes/exams and chat-tutor turns) while bounding worst-case
// spend from one account — this matters more now than it did against a
// free-tier provider, since every call here has a real per-token cost.
// Easy to tune later without a redeploy of the client — this is the only
// place the number lives.
const DAILY_CALL_CAP = 50;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function withCors(res: Response): Response {
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(CORS_HEADERS)) headers.set(k, v);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

const aiHandler = withSupabase({ auth: "user" }, async (req, ctx) => {
  if (req.method !== "POST") return jsonError("POST only", 405);

  let payload: { messages?: Array<{ role: string; content: string }>; temperature?: number; maxTokens?: number; json?: boolean };
  try {
    payload = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  // Full conversation array, system message included — matches
  // _openrouterChatMessages()'s own signature on the client (the chat
  // tutor sends full turn history, not just a single system+user pair).
  // `temperature` is intentionally not read here — see the comment on the
  // OpenAI request body below for why it's dropped rather than forwarded.
  const { messages, maxTokens, json } = payload;
  if (!Array.isArray(messages) || !messages.length || messages.some((m) => typeof m?.content !== "string" || typeof m?.role !== "string")) {
    return jsonError("\"messages\" must be a non-empty array of {role, content}", 400);
  }

  // Atomic check-and-increment — see try_use_ai_quota's comment in schema.sql.
  const { data: allowed, error: quotaErr } = await ctx.supabaseAdmin.rpc("try_use_ai_quota", {
    p_user_id: ctx.userClaims.id,
    p_cap: DAILY_CALL_CAP,
  });
  if (quotaErr) {
    console.error("quota check failed:", quotaErr);
    return jsonError("Could not verify AI usage quota", 500);
  }
  if (!allowed) {
    return jsonError(`Daily AI limit reached (${DAILY_CALL_CAP} requests). Try again tomorrow.`, 429);
  }

  const aiKey = Deno.env.get("AI_API_KEY");
  if (!aiKey) {
    console.error("AI_API_KEY secret is not set");
    return jsonError("AI is not configured on the server", 500);
  }

  const body: Record<string, unknown> = {
    model: OPENAI_MODEL,
    messages: messages,
    // GPT-5-family models via the Chat Completions API only accept the
    // default temperature (1) — sending any other value 400s. The client
    // still sends its own `temperature` (used by the personal-key/Groq
    // path instead), deliberately dropped here rather than forwarded.
    max_completion_tokens: maxTokens ?? 2048,
    // GPT-5-family models are reasoning models by default — without this,
    // reasoning tokens can eat the whole completion budget before producing
    // an answer, the same class of bug hit and fixed for Groq's
    // qwen3.6-27b earlier. Confirmed live on this task specifically:
    // gpt-5-nano (cheapest tier) at reasoning_effort:"minimal" only
    // produced 8 of 40 requested exam questions; switching to
    // gpt-5.6-luna at "none" (the more capable budget tier of the newer
    // 5.6 family, and the only effort level below "minimal") produced 67 —
    // full compliance with the requested count, same correctness, for a
    // modest cost increase (~$0.20/$1.20 vs $0.05/$0.40 per 1M tokens).
    reasoning_effort: "none",
  };
  if (json) body.response_format = { type: "json_object" };

  let upstream: Response;
  try {
    upstream = await fetch(OPENAI_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${aiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("OpenAI request failed:", err);
    return jsonError("AI provider request failed", 502);
  }

  if (!upstream.ok) {
    const errBody = await upstream.json().catch(() => ({}));
    const message = (errBody as any)?.error?.message || `Upstream HTTP ${upstream.status}`;
    console.error("OpenAI returned error:", upstream.status, message);
    return jsonError(message, upstream.status >= 500 ? 502 : upstream.status);
  }

  const data = await upstream.json();
  const content = data?.choices?.[0]?.message?.content || "";
  return Response.json({ content });
});

export default {
  fetch: async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
    const res = await aiHandler(req);
    return withCors(res);
  },
};
