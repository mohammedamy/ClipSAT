/**
 * Automated Deno unit tests for `supabase/functions/tts-proxy/index.ts` (WP-47)
 */
import app, {
  DAILY_TTS_BASE_CAP,
  MAX_INPUT_CHARS,
  PAID_MULTIPLIER,
  resolveAllowedOrigin,
  resolveVoiceConfig,
} from "./index.ts";

function assert(cond: unknown, msg: string): void {
  if (!cond) throw new Error(msg);
}

Deno.test("tts-proxy: enforces 1200-char ceiling, metered quota constants, and Arabic voice routing", () => {
  assert(MAX_INPUT_CHARS === 1200, "TTS input limit must be 1,200 chars");
  assert(DAILY_TTS_BASE_CAP === 60 && PAID_MULTIPLIER === 10, "TTS must be metered via dedicated quota");
  const arCfg = resolveVoiceConfig("ar-SA", "en_voice", "ar_voice");
  assert(arCfg.isArabic === true && arCfg.lang === "ar" && arCfg.voice === "ar_voice", "ar-SA must route to Arabic voice");
  const enCfg = resolveVoiceConfig("en-US", "en_voice", "ar_voice");
  assert(enCfg.isArabic === false && enCfg.lang === "en" && enCfg.voice === "en_voice", "en-US must route to English voice");
});

Deno.test("tts-proxy: rejects untrusted origins with HTTP 403", async () => {
  assert(resolveAllowedOrigin(new Request("https://x.io", { headers: { origin: "https://attacker.tld" } })) === "", "untrusted origin rejected");
  const forbidden = await app.fetch(new Request("https://ynnqrxeprxhtdimzwxwx.supabase.co/functions/v1/tts-proxy", {
    method: "POST",
    headers: { origin: "https://attacker.tld" },
  }));
  assert(forbidden.status === 403, "untrusted origin must return HTTP 403");
});

Deno.test("tts-proxy: serves CORS preflight for clipsat.org and rejects unauthenticated POST", async () => {
  const preflight = await app.fetch(new Request("https://ynnqrxeprxhtdimzwxwx.supabase.co/functions/v1/tts-proxy", {
    method: "OPTIONS",
    headers: { origin: "https://clipsat.org" },
  }));
  assert(preflight.status === 200, "clipsat.org OPTIONS preflight must return HTTP 200");
  assert(preflight.headers.get("Access-Control-Allow-Origin") === "https://clipsat.org", "CORS header must echo clipsat.org");

  const unauth = await app.fetch(new Request("https://ynnqrxeprxhtdimzwxwx.supabase.co/functions/v1/tts-proxy", {
    method: "POST",
    headers: { origin: "https://clipsat.org", "content-type": "application/json" },
    body: JSON.stringify({ text: "Solve 2x + 1 = 5" }),
  }));
  assert(unauth.status === 401 || unauth.status === 500, "missing bearer token must not succeed");
});
