// ClipSAT Google token refresh
// ════════════════════════════════════════════════════════════════════════
// Lets one "Sign in with Google" (via cloud-sync.js, a Supabase OAuth
// sign-in) also cover Google Forms/Drive access, instead of the separate
// GIS-popup connect flow google-integration.js used to always require.
//
// Supabase hands the client a Google refresh token exactly once, right
// after sign-in — it does not store or refresh it for you (that's by
// Supabase's own design; see their docs on provider tokens). cloud-sync.js
// captures it at that moment and stores it in google_oauth_tokens (the
// client can only ever WRITE that row, never read it back — see
// schema.sql). This function is the only thing that ever reads it: given
// a valid Supabase session, look up the caller's stored refresh token and
// exchange it with Google for a fresh, short-lived access token.
//
// Google's OAuth2 refresh-token exchange requires the client SECRET (the
// public Client ID alone isn't enough for this specific grant type) —
// that's why this can't just happen in the browser the way the original
// GIS token-client flow did; it needs a place to hold a real secret,
// which is what this function is for.
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
// Same public Client ID already used client-side in google-config.js —
// not a secret (see that file's own comment on why), safe to hardcode.
const GOOGLE_CLIENT_ID = "671186559851-fj25ijo5lo3vcfdnvmkh7oa04lhkfboo.apps.googleusercontent.com";

function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
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

const tokenHandler = withSupabase({ auth: "user" }, async (_req, ctx) => {
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
    // Not an error exactly — this user signed in with email, or with
    // Google before this feature existed, or hasn't granted Forms/Drive
    // scopes yet. The client falls back to the old GIS popup flow on this.
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
    // invalid_grant means the refresh token itself is dead (revoked by the
    // user in their Google account, or Google expired it) — clean up the
    // stale row so future attempts fail fast via the 404 path above
    // instead of repeating this same failed exchange every time.
    if ((data as any)?.error === "invalid_grant") {
      await ctx.supabaseAdmin.from("google_oauth_tokens").delete().eq("user_id", ctx.userClaims.id);
    }
    console.error("Google token refresh failed:", upstream.status, data);
    return jsonError((data as any)?.error_description || (data as any)?.error || "Google token refresh failed", 502);
  }

  // access_token only — the refresh_token itself never leaves this function.
  return Response.json({
    access_token: (data as any).access_token,
    expires_in: (data as any).expires_in,
    scope: (data as any).scope,
  });
});

export default {
  fetch: async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
    const res = await tokenHandler(req);
    return withCors(res);
  },
};
