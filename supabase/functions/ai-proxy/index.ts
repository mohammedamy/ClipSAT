// ClipSAT AI proxy
// ════════════════════════════════════════════════════════════════════════
// Holds AI API keys server-side (GROQ_API_KEY or AI_API_KEY/OPENAI_API_KEY
// set via `supabase secrets set ...` — never in a browser bundle, client code,
// localStorage, or git commit) and stands in for the AI provider.
//
// Security & Abuse Protections:
// 1. Session Gate: `auth: 'user'` verifies the caller's Supabase session JWT.
//    Unauthenticated or anonymous requests are rejected with 401.
// 2. Per-User Quota: Atomic daily call cap in Postgres (try_use_ai_quota).
// 3. Per-IP Rate Limiting: Sliding window limit (25 req/min) per client IP.
// 4. Input Length Limits: Max 2,000 chars per user message, 8,000 chars total.
// 5. Content Filtering: Blocks prompt injection attacks and malicious scripts.
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const DAILY_CALL_CAP = 50;
const MAX_USER_MSG_CHARS = 2000;
const MAX_TOTAL_PROMPT_CHARS = 8000;

// Per-IP rate limiting: 25 requests per 60-second window
const ipRateMap = new Map<string, { count: number; resetAt: number }>();
function checkIpRateLimit(ip: string, maxReq = 25, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = ipRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxReq) {
    return false;
  }
  entry.count++;
  return true;
}

const DISALLOWED_PATTERNS = [
  /ignore (all )?(previous|prior) instructions/i,
  /reveal (your|the) (system|developer) prompt/i,
  /disregard (all )?(prior|previous)/i,
  /you are now (an?|in) (unrestricted|developer|dan|jailbreak)/i,
  /(?:override|bypass|disable) (all )?(rules|instructions|safety|guidelines)/i,
  /<script[\s>]/i,
  /javascript:/i,
];

function checkContentSafety(messages: Array<{ role: string; content: string }>): string | null {
  for (const m of messages) {
    if (m.role === "user") {
      for (const pattern of DISALLOWED_PATTERNS) {
        if (pattern.test(m.content)) {
          return "Message contains disallowed patterns or prompt injection.";
        }
      }
    }
  }
  return null;
}

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

  // Per-IP rate check
  const clientIp = req.headers.get("cf-connecting-ip") ||
                   req.headers.get("x-real-ip") ||
                   req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
                   "unknown-ip";

  if (!checkIpRateLimit(clientIp)) {
    return jsonError("Too many requests from this IP. Please wait a minute before trying again.", 429);
  }

  let payload: { messages?: Array<{ role: string; content: string }>; temperature?: number; maxTokens?: number; json?: boolean };
  try {
    payload = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const { messages, maxTokens, json } = payload;
  if (!Array.isArray(messages) || !messages.length || messages.some((m) => typeof m?.content !== "string" || typeof m?.role !== "string")) {
    return jsonError("\"messages\" must be a non-empty array of {role, content}", 400);
  }

  // Input length limits
  let totalChars = 0;
  for (const m of messages) {
    if (m.role === "user" && m.content.length > MAX_USER_MSG_CHARS) {
      return jsonError(`User message exceeds limit of ${MAX_USER_MSG_CHARS} characters.`, 400);
    }
    totalChars += m.content.length;
  }
  if (totalChars > MAX_TOTAL_PROMPT_CHARS) {
    return jsonError(`Total prompt exceeds limit of ${MAX_TOTAL_PROMPT_CHARS} characters.`, 400);
  }

  // Content safety & prompt injection filter
  const safetyViolation = checkContentSafety(messages);
  if (safetyViolation) {
    return jsonError(safetyViolation, 400);
  }

  // Atomic per-user check-and-increment quota
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

  // Server secret handling: GROQ_API_KEY (priority) or AI_API_KEY/OPENAI_API_KEY
  const groqKey = Deno.env.get("GROQ_API_KEY");
  const aiKey = groqKey || Deno.env.get("AI_API_KEY") || Deno.env.get("OPENAI_API_KEY");
  if (!aiKey) {
    console.error("No AI API key secret configured (GROQ_API_KEY or AI_API_KEY)");
    return jsonError("AI is not configured on the server", 500);
  }

  const isGroq = !!groqKey || Deno.env.get("AI_PROVIDER") === "groq";
  const targetUrl = isGroq ? GROQ_URL : OPENAI_URL;
  const targetModel = isGroq
    ? (Deno.env.get("GROQ_MODEL") || "llama-3.3-70b-versatile")
    : (Deno.env.get("OPENAI_MODEL") || "gpt-6-luna");

  const body: Record<string, unknown> = {
    model: targetModel,
    messages: messages,
    reasoning_effort: "none",
  };

  if (isGroq) {
    body.max_tokens = maxTokens ?? 2048;
    body.temperature = payload.temperature ?? 0.7;
  } else {
    body.max_completion_tokens = maxTokens ?? 2048;
  }

  if (json) body.response_format = { type: "json_object" };

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${aiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("AI provider request failed:", err);
    return jsonError("AI provider request failed", 502);
  }

  if (!upstream.ok) {
    const errBody = await upstream.json().catch(() => ({}));
    const message = (errBody as any)?.error?.message || `Upstream HTTP ${upstream.status}`;
    console.error("AI provider returned error:", upstream.status, message);
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
