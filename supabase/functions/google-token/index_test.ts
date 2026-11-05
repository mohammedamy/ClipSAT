/**
 * Automated Deno unit tests for `supabase/functions/google-token/index.ts` (WP-47)
 */
import app, { GOOGLE_CLIENT_ID, resolveAllowedOrigin } from "./index.ts";

function assert(cond: unknown, msg: string): void {
  if (!cond) throw new Error(msg);
}

Deno.test("google-token: configures valid Google OAuth client ID", () => {
  assert(GOOGLE_CLIENT_ID.endsWith(".apps.googleusercontent.com"), "GOOGLE_CLIENT_ID must be configured");
});

Deno.test("google-token: rejects phishing origins with HTTP 403", async () => {
  assert(resolveAllowedOrigin(new Request("https://x.io", { headers: { origin: "https://phishing.site" } })) === "", "phishing origin must be rejected");
  const res = await app.fetch(new Request("https://ynnqrxeprxhtdimzwxwx.supabase.co/functions/v1/google-token", {
    method: "POST",
    headers: { origin: "https://phishing.site" },
  }));
  assert(res.status === 403, "disallowed origin must receive HTTP 403");
});

Deno.test("google-token: answers OPTIONS preflight for clipsat.org and rejects unauthenticated POST", async () => {
  const opt = await app.fetch(new Request("https://ynnqrxeprxhtdimzwxwx.supabase.co/functions/v1/google-token", {
    method: "OPTIONS",
    headers: { origin: "https://clipsat.org" },
  }));
  assert(opt.status === 200, "OPTIONS preflight must return HTTP 200");

  const unauth = await app.fetch(new Request("https://ynnqrxeprxhtdimzwxwx.supabase.co/functions/v1/google-token", {
    method: "POST",
    headers: { origin: "https://clipsat.org", "content-type": "application/json" },
    body: JSON.stringify({ action: "refresh" }),
  }));
  assert(unauth.status === 401 || unauth.status === 500, "unauthenticated POST must not return tokens");
});
