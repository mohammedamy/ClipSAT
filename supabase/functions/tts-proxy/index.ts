// ClipSAT text-to-speech proxy (Wave 0 Hardened)
// ════════════════════════════════════════════════════════════════════════
// Turns a short hint / explanation into spoken audio using OpenRouter's
// OpenAI-compatible speech endpoint. Enforces allowlisted Origin CORS,
// POST-only, 1,200-char chunk limit, and per-user daily spend cap via
// use_ai_quota so compromised tokens cannot drain OpenRouter credits.
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const OPENROUTER_SPEECH_URL = "https://openrouter.ai/api/v1/audio/speech";
const DEFAULT_MODEL = "fish-audio/s2.1-pro-free:free";
const MAX_INPUT_CHARS = 1200;
const DAILY_TTS_BASE_CAP = 60;
const PAID_MULTIPLIER = 10;

const ALLOWED_ORIGINS = new Set([
  "https://clipsat.org",
  "https://www.clipsat.org",
]);

function resolveAllowedOrigin(req: Request): string {
  const origin = (req.headers.get("origin") || "").trim();
  if (!origin) return "https://clipsat.org";
  if (ALLOWED_ORIGINS.has(origin)) return origin;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return origin;
  return "";
}

function buildCorsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin || "https://clipsat.org",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

const ttsHandler = withSupabase({ auth: "user" }, async (req, ctx) => {
  if (req.method !== "POST") return jsonError("POST only", 405);

  const apiKey = Deno.env.get("OPENROUTER_API_KEY");
  if (!apiKey) {
    console.error("OPENROUTER_API_KEY secret is not configured");
    return jsonError("Text-to-speech is not configured on the server.", 503);
  }

  let payload: { text?: unknown; lang?: unknown };
  try {
    payload = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const text = typeof payload.text === "string" ? payload.text.trim() : "";
  if (!text) return jsonError("\"text\" must be a non-empty string", 400);
  if (text.length > MAX_INPUT_CHARS) {
    return jsonError(`"text" is too long (max ${MAX_INPUT_CHARS} characters per request)`, 413);
  }

  // Enforce daily quota cap per authenticated user to bound upstream TTS spend
  const { data: quotaRows, error: quotaErr } = await ctx.supabaseAdmin.rpc("use_ai_quota", {
    p_user_id: ctx.userClaims.id,
    p_base_cap: DAILY_TTS_BASE_CAP,
    p_cost: 1,
    p_paid_multiplier: PAID_MULTIPLIER,
  });
  const q = Array.isArray(quotaRows) ? quotaRows[0] : quotaRows;
  if (quotaErr || !q) {
    console.error("TTS quota check failed:", quotaErr);
    return jsonError("Could not verify TTS usage quota", 500);
  }
  if (!q.allowed) {
    return jsonError("Daily cloud voice limit reached; falling back to device voice.", 429);
  }

  const body: Record<string, unknown> = {
    model: Deno.env.get("TTS_MODEL") || DEFAULT_MODEL,
    input: text,
    response_format: "mp3",
  };
  const voice = Deno.env.get("TTS_VOICE") || "default";
  if (voice !== "none") body.voice = voice;

  let upstream: Response;
  try {
    upstream = await fetch(OPENROUTER_SPEECH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Title": "ClipSAT",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("OpenRouter TTS request failed:", err);
    return jsonError("Text-to-speech provider unreachable", 502);
  }

  if (!upstream.ok) {
    const errBody = await upstream.json().catch(() => ({}));
    const message = (errBody as any)?.error?.message || `Upstream HTTP ${upstream.status}`;
    console.error("OpenRouter TTS error:", upstream.status, message);
    const status = upstream.status === 429 || upstream.status === 402 ? upstream.status : 502;
    return jsonError(message, status);
  }

  const contentType = upstream.headers.get("content-type") || "audio/mpeg";
  if (!contentType.startsWith("audio/") && !contentType.startsWith("application/octet-stream")) {
    return jsonError("Unexpected response from text-to-speech provider", 502);
  }
  return new Response(upstream.body, {
    status: 200,
    headers: { "Content-Type": contentType, "Cache-Control": "private, max-age=86400" },
  });
});

export default {
  fetch: async (req: Request): Promise<Response> => {
    const allowedOrigin = resolveAllowedOrigin(req);
    if (!allowedOrigin) {
      return Response.json({ error: "Origin not allowed" }, { status: 403 });
    }
    const cors = buildCorsHeaders(allowedOrigin);
    if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
    const res = await ttsHandler(req);
    const headers = new Headers(res.headers);
    for (const [k, v] of Object.entries(cors)) headers.set(k, v);
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  },
};
