// ClipSAT text-to-speech proxy
// ════════════════════════════════════════════════════════════════════════
// Turns a short hint / explanation into spoken audio using OpenRouter's
// OpenAI-compatible speech endpoint (default model:
// fish-audio/s2.1-pro-free:free). The OpenRouter key lives ONLY in the
// Supabase secret OPENROUTER_API_KEY — never in the browser bundle,
// localStorage, or git.
//
// The browser (src/scripts/modules/03d-voice-tutor.js) treats ANY non-200
// answer from here as "use the built-in browser voice instead", so rate
// limits (429), exhausted credits (402), outages (5xx) or a missing secret
// (503) never leave the learner without audio.
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const OPENROUTER_SPEECH_URL = "https://openrouter.ai/api/v1/audio/speech";
const DEFAULT_MODEL = "fish-audio/s2.1-pro-free:free";
// One request = one short chunk (the client splits long explanations).
const MAX_INPUT_CHARS = 1200;

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

const ttsHandler = withSupabase({ auth: "user" }, async (req, _ctx) => {
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

  const body: Record<string, unknown> = {
    model: Deno.env.get("TTS_MODEL") || DEFAULT_MODEL,
    input: text,
    response_format: "mp3",
  };
  const voice = Deno.env.get("TTS_VOICE");
  if (voice) body.voice = voice;

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
    // Preserve 402/429 so the client can pause cloud voice for a while;
    // everything else upstream is reported as 502.
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
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
    const res = await ttsHandler(req);
    return withCors(res);
  },
};
