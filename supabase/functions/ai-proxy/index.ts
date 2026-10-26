// ClipSAT AI proxy
// ════════════════════════════════════════════════════════════════════════
// Holds AI API keys server-side (GEMINI_API_KEY from Google AI Studio as
// primary provider running gemini-3.8-flash via the Gemini Interactions API,
// with fallback to GROQ_API_KEY or AI_API_KEY/OPENAI_API_KEY — set via
// `supabase secrets set ...` and never in a browser bundle, client code,
// localStorage, or git commit).
//
// Supports multimodal single-question inputs:
// - Inline images (image/png, image/jpeg, image/webp) — printed or handwritten
// - 1-page PDF documents (application/pdf)
// - 1-page DOCX documents (extracted text + optional embedded diagram image)
//
// Security & Abuse Protections:
// 1. Session Gate: `auth: 'user'` verifies the caller's Supabase session JWT.
//    Unauthenticated or anonymous requests are rejected with 401.
// 2. Per-User Quota: Atomic daily call cap in Postgres (try_use_ai_quota).
// 3. Per-IP Rate Limiting: Sliding window limit (25 req/min) per client IP.
// 4. Input Length & Attachment Size Limits: Max 2,000 chars per user message,
//    8,000 chars total text, and max ~4.5 MB base64 for 1-page image/PDF.
// 5. Content Filtering: Blocks prompt injection attacks and malicious scripts.
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";
import { GoogleGenAI } from "@google/genai";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const DAILY_CALL_CAP = 50;
const MAX_USER_MSG_CHARS = 2500;
const MAX_TOTAL_PROMPT_CHARS = 12000;
const MAX_ATTACHMENT_BASE64_CHARS = 6_000_000; // ~4.5 MB binary max
const MAX_DOCX_TEXT_CHARS = 6_000; // 1-page DOCX text limit

const ALLOWED_IMAGE_MIMES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);

interface AttachmentPayload {
  type: "image" | "document" | "docx_text";
  mime_type?: string;
  data?: string; // base64 string without data: prefix
  extracted_text?: string;
  image_data?: string;
  image_mime_type?: string;
  filename?: string;
}

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

// Basic content & injection filtering
const DISALLOWED_PATTERNS = [
  /ignore (all )?(previous|prior) instructions/i,
  /reveal (your|the) (system|developer) prompt/i,
  /disregard (all )?(prior|previous)/i,
  /<script[\s>]/i,
  /javascript:/i,
];

function checkTextSafety(text: string): string | null {
  for (const pattern of DISALLOWED_PATTERNS) {
    if (pattern.test(text)) {
      return "Message contains disallowed patterns or prompt injection.";
    }
  }
  return null;
}

function checkContentSafety(
  messages: Array<{ role: string; content: string }>,
  attachment?: AttachmentPayload | null,
): string | null {
  for (const m of messages) {
    if (m.role === "user") {
      const violation = checkTextSafety(m.content);
      if (violation) return violation;
    }
  }
  if (attachment?.extracted_text) {
    const violation = checkTextSafety(attachment.extracted_text);
    if (violation) return violation;
  }
  return null;
}

function validateAttachment(att?: AttachmentPayload | null): string | null {
  if (!att) return null;
  if (typeof att !== "object") return "Invalid attachment format.";
  if (att.type === "image") {
    const mime = (att.mime_type || "image/jpeg").toLowerCase();
    if (!ALLOWED_IMAGE_MIMES.has(mime)) {
      return "Unsupported image type. Please upload PNG, JPEG, or WebP.";
    }
    if (typeof att.data !== "string" || !att.data.length) {
      return "Missing image data.";
    }
    if (att.data.length > MAX_ATTACHMENT_BASE64_CHARS) {
      return "Image file is too large (max 4 MB).";
    }
    return null;
  }
  if (att.type === "document") {
    const mime = (att.mime_type || "").toLowerCase();
    if (mime !== "application/pdf") {
      return "Only 1-page PDF documents are supported for direct document upload.";
    }
    if (typeof att.data !== "string" || !att.data.length) {
      return "Missing PDF document data.";
    }
    if (att.data.length > MAX_ATTACHMENT_BASE64_CHARS) {
      return "PDF file is too large (max 4 MB / 1 page).";
    }
    return null;
  }
  if (att.type === "docx_text") {
    const hasText = typeof att.extracted_text === "string" && att.extracted_text.trim().length > 0;
    const hasImg = typeof att.image_data === "string" && att.image_data.length > 0;
    if (!hasText && !hasImg) {
      return "The uploaded DOCX file appears to be empty.";
    }
    if (att.extracted_text && att.extracted_text.length > MAX_DOCX_TEXT_CHARS) {
      return "DOCX content exceeds the 1-page single-question limit.";
    }
    if (att.image_data && att.image_data.length > MAX_ATTACHMENT_BASE64_CHARS) {
      return "Embedded image in DOCX is too large.";
    }
    return null;
  }
  return "Unsupported attachment type.";
}

function extractGeminiInteractionText(interaction: unknown): string {
  const obj = interaction as Record<string, unknown> | null;
  if (!obj) return "";
  if (typeof obj.output_text === "string" && obj.output_text.trim()) {
    return obj.output_text;
  }
  if (Array.isArray(obj.outputs)) {
    const parts: string[] = [];
    for (const out of obj.outputs) {
      if (out && typeof out === "object" && (out as any).type === "text" && typeof (out as any).text === "string") {
        parts.push((out as any).text);
      }
    }
    if (parts.length) return parts.join("\n");
  }
  if (Array.isArray(obj.steps)) {
    const parts: string[] = [];
    for (const step of obj.steps) {
      if (step && typeof step === "object" && (step as any).type === "model_output" && Array.isArray((step as any).content)) {
        for (const c of (step as any).content) {
          if (c && typeof c === "object" && (c as any).type === "text" && typeof (c as any).text === "string") {
            parts.push((c as any).text);
          }
        }
      }
    }
    if (parts.length) return parts.join("\n");
  }
  return "";
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

  let payload: {
    messages?: Array<{ role: string; content: string }>;
    temperature?: number;
    maxTokens?: number;
    json?: boolean;
    attachment?: AttachmentPayload | null;
  };
  try {
    payload = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const { messages, maxTokens, json, attachment } = payload;
  if (!Array.isArray(messages) || !messages.length || messages.some((m) => typeof m?.content !== "string" || typeof m?.role !== "string")) {
    return jsonError("\"messages\" must be a non-empty array of {role, content}", 400);
  }

  // Validate optional multimodal attachment
  const attErr = validateAttachment(attachment);
  if (attErr) {
    return jsonError(attErr, 400);
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
  const safetyViolation = checkContentSafety(messages, attachment);
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

  // Server secret handling:
  // Priority 1: GEMINI_API_KEY (or GOOGLE_API_KEY, or AI_API_KEY if AI_PROVIDER=gemini or key starts with AIza) -> Gemini 3.8 Flash
  // Priority 2: GROQ_API_KEY -> Groq fallback
  // Priority 3: AI_API_KEY / OPENAI_API_KEY -> OpenAI-compatible fallback
  const rawAiKey = Deno.env.get("AI_API_KEY") || "";
  const geminiKey =
    Deno.env.get("GEMINI_API_KEY") ||
    Deno.env.get("GOOGLE_API_KEY") ||
    ((Deno.env.get("AI_PROVIDER") === "gemini" || rawAiKey.startsWith("AIza")) ? rawAiKey : "");

  if (geminiKey) {
    const geminiModel = Deno.env.get("GEMINI_MODEL") || "gemini-3.8-flash";
    const systemParts: string[] = [];
    const steps: Array<{ type: "user_input" | "model_output"; content: Array<Record<string, unknown>> }> = [];

    for (const m of messages) {
      if (m.role === "system") {
        if (m.content.trim()) systemParts.push(m.content.trim());
      } else if (m.role === "assistant") {
        steps.push({
          type: "model_output",
          content: [{ type: "text", text: m.content }],
        });
      } else {
        steps.push({
          type: "user_input",
          content: [{ type: "text", text: m.content }],
        });
      }
    }

    if (json) {
      systemParts.push("IMPORTANT: Return ONLY valid JSON with no markdown code fences or extra commentary.");
    }

    // Ensure there is at least one user_input step
    if (!steps.length || steps[steps.length - 1].type !== "user_input") {
      steps.push({
        type: "user_input",
        content: [{ type: "text", text: "Please solve this math question step by step." }],
      });
    }

    // Attach multimodal payload (image, 1-page PDF, or 1-page DOCX) to the latest user_input step
    if (attachment) {
      const lastStep = steps[steps.length - 1];
      if (attachment.type === "image" && attachment.data) {
        const normMime = attachment.mime_type === "image/jpg" ? "image/jpeg" : (attachment.mime_type || "image/jpeg");
        lastStep.content.push({
          type: "image",
          data: attachment.data,
          mime_type: normMime,
        });
      } else if (attachment.type === "document" && attachment.data) {
        lastStep.content.push({
          type: "document",
          data: attachment.data,
          mime_type: "application/pdf",
        });
      } else if (attachment.type === "docx_text") {
        if (attachment.extracted_text) {
          lastStep.content.push({
            type: "text",
            text: `\n\n[Attached 1-Page DOCX Question (${attachment.filename || "question.docx"})]:\n${attachment.extracted_text}`,
          });
        }
        if (attachment.image_data) {
          const normMime = attachment.image_mime_type === "image/jpg"
            ? "image/jpeg"
            : (attachment.image_mime_type || "image/png");
          lastStep.content.push({
            type: "image",
            data: attachment.image_data,
            mime_type: normMime,
          });
        }
      }
    }

    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const reqParams: Record<string, unknown> = {
        model: geminiModel,
        input: steps,
        store: false,
        generation_config: {
          max_output_tokens: maxTokens ?? 2500,
          thinking_level: "low",
        },
      };
      if (systemParts.length > 0) {
        reqParams.system_instruction = systemParts.join("\n\n");
      }

      const interaction = await ai.interactions.create(reqParams as any);
      const content = extractGeminiInteractionText(interaction);
      return Response.json({ content, model: geminiModel });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("Gemini Interactions API error:", errMsg);
      return jsonError(`Gemini API error: ${errMsg}`, 502);
    }
  }

  // Fallback to GROQ_API_KEY or AI_API_KEY / OPENAI_API_KEY if GEMINI_API_KEY is not set
  const groqKey = Deno.env.get("GROQ_API_KEY");
  const aiKey = groqKey || rawAiKey || Deno.env.get("OPENAI_API_KEY");
  if (!aiKey) {
    console.error("No AI API key secret configured (GEMINI_API_KEY, GROQ_API_KEY, or AI_API_KEY)");
    return jsonError("AI is not configured on the server. Please set GEMINI_API_KEY in Supabase secrets.", 500);
  }

  if (attachment && (attachment.type === "image" || attachment.type === "document")) {
    return jsonError(
      "Image/PDF question reading requires GEMINI_API_KEY (gemini-3.8-flash) to be configured in Supabase secrets.",
      400,
    );
  }

  const isGroq = !!groqKey || Deno.env.get("AI_PROVIDER") === "groq";
  const targetUrl = isGroq ? GROQ_URL : OPENAI_URL;
  const targetModel = isGroq
    ? (Deno.env.get("GROQ_MODEL") || "llama-3.3-70b-versatile")
    : (Deno.env.get("OPENAI_MODEL") || "gpt-6-luna");

  const outboundMessages = messages.map((m, idx) => {
    if (idx === messages.length - 1 && m.role === "user" && attachment?.type === "docx_text" && attachment.extracted_text) {
      return {
        role: m.role,
        content: `${m.content}\n\n[Attached 1-Page DOCX Question]:\n${attachment.extracted_text}`,
      };
    }
    return m;
  });

  const body: Record<string, unknown> = {
    model: targetModel,
    messages: outboundMessages,
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
