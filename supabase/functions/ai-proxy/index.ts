// ClipSAT AI proxy
// ════════════════════════════════════════════════════════════════════════
// Holds AI API keys server-side (GEMINI_API_KEY from Google AI Studio as
// primary provider running gemini-3.8-flash via the Gemini Interactions API
// [interactions.create / POST /v1beta/interactions], with automatic fallback
// if a key/region requires gemini-flash-latest, and fallback to
// GROQ_API_KEY or AI_API_KEY/OPENAI_API_KEY — set via `supabase secrets set`
// and never in a browser bundle, client code, localStorage, or git commit).
//
// Supports multimodal single-question inputs:
// - Inline images (image/png, image/jpeg, image/webp) — printed or handwritten
// - 1-page PDF documents (application/pdf)
// - 1-page DOCX documents (extracted text + optional embedded diagram image)
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const GEMINI_INTERACTIONS_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
const GEMINI_GENERATE_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const DAILY_CALL_CAP = 10;

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
    return null;
  }
  if (att.type === "document") {
    const mime = (att.mime_type || "").toLowerCase();
    if (mime !== "application/pdf") {
      return "Only PDF documents are supported for direct document upload.";
    }
    if (typeof att.data !== "string" || !att.data.length) {
      return "Missing PDF document data.";
    }
    return null;
  }
  if (att.type === "docx_text") {
    const hasText = typeof att.extracted_text === "string" && att.extracted_text.trim().length > 0;
    const hasImg = typeof att.image_data === "string" && att.image_data.length > 0;
    if (!hasText && !hasImg) {
      return "The uploaded DOCX file appears to be empty.";
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
  if (Array.isArray((obj as any).candidates)) {
    const candParts = (obj as any).candidates?.[0]?.content?.parts;
    if (Array.isArray(candParts)) {
      const parts: string[] = [];
      for (const p of candParts) {
        if (p && typeof p.text === "string" && !p.thought) {
          parts.push(p.text);
        }
      }
      if (parts.length) return parts.join("\n");
    }
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

  // Content safety & prompt injection filter
  const safetyViolation = checkContentSafety(messages, attachment);
  if (safetyViolation) {
    return jsonError(safetyViolation, 400);
  }

  // Atomic per-user check-and-increment daily quota: strictly 10 questions per day (only limit enforced)
  const { data: allowed, error: quotaErr } = await ctx.supabaseAdmin.rpc("try_use_ai_quota", {
    p_user_id: ctx.userClaims.id,
    p_cap: DAILY_CALL_CAP,
  });
  if (quotaErr) {
    console.error("quota check failed:", quotaErr);
    return jsonError("Could not verify AI usage quota", 500);
  }
  if (!allowed) {
    return jsonError(`Daily AI limit reached (${DAILY_CALL_CAP} questions per day). Try again tomorrow.`, 429);
  }

  // Server secret handling:
  // Priority 1: GEMINI_API_KEY (or GOOGLE_API_KEY, or AI_API_KEY if AI_PROVIDER=gemini or key starts with AIza) -> Gemini 3.8 Flash
  // Priority 2: GROQ_API_KEY -> Groq fallback (with Llama 4 Scout vision support for image attachments)
  // Priority 3: AI_API_KEY / OPENAI_API_KEY -> OpenAI-compatible fallback
  const rawAiKey = Deno.env.get("AI_API_KEY") || "";
  const geminiKey =
    Deno.env.get("GEMINI_API_KEY") ||
    Deno.env.get("GOOGLE_API_KEY") ||
    ((Deno.env.get("AI_PROVIDER") === "gemini" || rawAiKey.startsWith("AIza")) ? rawAiKey : "");

  if (geminiKey) {
    const preferredModel = Deno.env.get("GEMINI_MODEL") || "gemini-3.8-flash";
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

    if (!steps.length || steps[steps.length - 1].type !== "user_input") {
      steps.push({
        type: "user_input",
        content: [{ type: "text", text: "Please solve this math question step by step." }],
      });
    }

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

    // Try Gemini Interactions API with preferred model (gemini-3.8-flash), then fallback to gemini-flash-latest
    const interactionModels = preferredModel === "gemini-flash-latest"
      ? ["gemini-flash-latest"]
      : [preferredModel, "gemini-flash-latest"];

    let lastErrorMsg = "";
    let lastStatus = 502;

    for (const modelCandidate of interactionModels) {
      const reqParams: Record<string, unknown> = {
        model: modelCandidate,
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

      try {
        const gemRes = await fetch(GEMINI_INTERACTIONS_URL, {
          method: "POST",
          headers: {
            "x-goog-api-key": geminiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqParams),
        });
        if (gemRes.ok) {
          const interaction = await gemRes.json();
          const content = extractGeminiInteractionText(interaction);
          if (content) {
            return Response.json({ content, model: modelCandidate });
          }
        } else {
          const errData = await gemRes.json().catch(() => ({}));
          lastErrorMsg = (errData as any)?.error?.message || `Gemini HTTP ${gemRes.status}`;
          lastStatus = gemRes.status;
          // If unauthorized or quota exceeded on the key itself, don't retry unless model not found
          if (gemRes.status === 401 || gemRes.status === 403 || gemRes.status === 429) {
            break;
          }
        }
      } catch (err) {
        lastErrorMsg = err instanceof Error ? err.message : String(err);
      }
    }

    // Secondary Gemini endpoint fallback (:generateContent on gemini-flash-latest) in case /v1beta/interactions is restricted on the user's key
    try {
      const contents = steps.map((st) => ({
        role: st.type === "model_output" ? "model" : "user",
        parts: st.content.map((c) => {
          if (c.type === "image" || c.type === "document") {
            return {
              inline_data: {
                mime_type: c.mime_type,
                data: c.data,
              },
            };
          }
          return { text: String(c.text || "") };
        }),
      }));
      const gcBody: Record<string, unknown> = {
        contents,
        generationConfig: {
          maxOutputTokens: maxTokens ?? 2500,
          temperature: payload.temperature ?? 0.4,
        },
      };
      if (systemParts.length > 0) {
        gcBody.systemInstruction = {
          parts: [{ text: systemParts.join("\n\n") }],
        };
      }
      if (json) {
        (gcBody.generationConfig as Record<string, unknown>).responseMimeType = "application/json";
      }
      const gcRes = await fetch(`${GEMINI_GENERATE_BASE}/gemini-flash-latest:generateContent`, {
        method: "POST",
        headers: {
          "x-goog-api-key": geminiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gcBody),
      });
      if (gcRes.ok) {
        const gcData = await gcRes.json();
        const content = extractGeminiInteractionText(gcData);
        if (content) {
          return Response.json({ content, model: "gemini-flash-latest" });
        }
      } else {
        const errData = await gcRes.json().catch(() => ({}));
        lastErrorMsg = (errData as any)?.error?.message || lastErrorMsg || `Gemini HTTP ${gcRes.status}`;
        lastStatus = gcRes.status;
      }
    } catch (err) {
      if (!lastErrorMsg) lastErrorMsg = err instanceof Error ? err.message : String(err);
    }

    console.error("Gemini API error:", lastStatus, lastErrorMsg);
    return jsonError(lastErrorMsg || "Gemini API request failed", lastStatus >= 500 ? 502 : lastStatus);
  }

  // Fallback to GROQ_API_KEY or AI_API_KEY / OPENAI_API_KEY if GEMINI_API_KEY is not set
  const groqKey = Deno.env.get("GROQ_API_KEY");
  const aiKey = groqKey || rawAiKey || Deno.env.get("OPENAI_API_KEY");
  if (!aiKey) {
    console.error("No AI API key secret configured (GEMINI_API_KEY, GROQ_API_KEY, or AI_API_KEY)");
    return jsonError("AI is not configured on the server. Please set GEMINI_API_KEY in Supabase secrets.", 500);
  }

  if (attachment && attachment.type === "document") {
    return jsonError(
      "Direct 1-page PDF reading requires GEMINI_API_KEY in Supabase secrets. Please set GEMINI_API_KEY or upload an image/screenshot of the question.",
      400,
    );
  }

  const isGroq = !!groqKey || Deno.env.get("AI_PROVIDER") === "groq";
  const targetUrl = isGroq ? GROQ_URL : OPENAI_URL;
  const hasImageAttachment = !!(
    attachment &&
    ((attachment.type === "image" && attachment.data) ||
      (attachment.type === "docx_text" && attachment.image_data))
  );
  const targetModel = isGroq
    ? (hasImageAttachment
      ? (Deno.env.get("GROQ_VISION_MODEL") || "meta-llama/llama-4-scout-17b-16e-instruct")
      : (Deno.env.get("GROQ_MODEL") || "llama-3.3-70b-versatile"))
    : (Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini");

  const outboundMessages = messages.map((m, idx) => {
    if (idx === messages.length - 1 && m.role === "user" && attachment) {
      if (attachment.type === "image" && attachment.data) {
        const normMime = attachment.mime_type === "image/jpg" ? "image/jpeg" : (attachment.mime_type || "image/jpeg");
        return {
          role: "user",
          content: [
            { type: "text", text: m.content },
            { type: "image_url", image_url: { url: `data:${normMime};base64,${attachment.data}` } },
          ],
        };
      }
      if (attachment.type === "docx_text") {
        const textWithDocx = attachment.extracted_text
          ? `${m.content}\n\n[Attached 1-Page DOCX Question]:\n${attachment.extracted_text}`
          : m.content;
        if (attachment.image_data) {
          const normMime = attachment.image_mime_type === "image/jpg" ? "image/jpeg" : (attachment.image_mime_type || "image/png");
          return {
            role: "user",
            content: [
              { type: "text", text: textWithDocx },
              { type: "image_url", image_url: { url: `data:${normMime};base64,${attachment.image_data}` } },
            ],
          };
        }
        return { role: "user", content: textWithDocx };
      }
    }
    return m;
  });

  const body: Record<string, unknown> = {
    model: targetModel,
    messages: outboundMessages,
  };

  if (isGroq) {
    body.max_tokens = maxTokens ?? 2048;
    body.temperature = payload.temperature ?? 0.5;
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
  return Response.json({ content, model: targetModel });
});

export default {
  fetch: async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
    const res = await aiHandler(req);
    return withCors(res);
  },
};
