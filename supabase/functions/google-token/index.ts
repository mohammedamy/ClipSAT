// ClipSAT Google token refresh (Wave 0 Hardened)
// ════════════════════════════════════════════════════════════════════════
// Exchanges a stored Google OAuth refresh token for a short-lived access
// token on behalf of an authenticated ClipSAT user. Enforces allowlisted
// Origin CORS and POST-only method validation.
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CLIENT_ID = "671186559851-fj25ijo5lo3vcfdnvmkh7oa04lhkfboo.apps.googleusercontent.com";

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

const tokenHandler = withSupabase({ auth: "user" }, async (req, ctx) => {
  if (req.method !== "POST") return jsonError("POST only", 405);

  const { data: row, error: readErr } = await ctx.supabaseAdmin
    .from("google_oauth_tokens")
    .select("refresh_token")
    .eq("user_id", ctx.userClaims.id)
    .maybeSingle();

  if (readErr) {
    console.error("google_oauth_tokens read failed:", readErr);
    return jsonError("Could not look up your Google connection", 500);
  }
  if (!row) {
    return jsonError("No Google account linked to this session", 404);
  }

  const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");
  if (!clientSecret) {
    console.error("GOOGLE_CLIENT_SECRET secret is not set");
    return jsonError("Google integration is not configured on the server", 500);
  }

  let upstream: Response;
  try {
    upstream = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: clientSecret,
        refresh_token: row.refresh_token,
        grant_type: "refresh_token",
      }),
    });
  } catch (err) {
    console.error("Google token refresh request failed:", err);
    return jsonError("Google token refresh request failed", 502);
  }

  const data = await upstream.json().catch(() => ({}));

  if (!upstream.ok) {
    if ((data as any)?.error === "invalid_grant") {
      await ctx.supabaseAdmin.from("google_oauth_tokens").delete().eq("user_id", ctx.userClaims.id);
    }
    console.error("Google token refresh failed:", upstream.status, data);
    return jsonError((data as any)?.error_description || (data as any)?.error || "Google token refresh failed", 502);
  }

  return Response.json({
    access_token: (data as any).access_token,
    expires_in: (data as any).expires_in,
    scope: (data as any).scope,
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
    const res = await tokenHandler(req);
    const headers = new Headers(res.headers);
    for (const [k, v] of Object.entries(cors)) headers.set(k, v);
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  },
};
