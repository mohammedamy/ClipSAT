/**
 * ClipSAT Cloud Sync — public config & early OAuth hash capture
 * ════════════════════════════════════════════════════════════════════════
 * SAFE TO COMMIT. Supabase's "anon" key is a public key by design — it
 * only identifies which Supabase project to talk to. Actual access control
 * lives entirely in supabase/schema.sql's Row Level Security policies (a
 * signed-in user can only ever read/write the rows where user_id = their
 * own auth.uid()). Never put a Supabase *service_role* key here — that one
 * really is secret and belongs server-side only, if it's ever needed.
 *
 * Fill these in after creating your Supabase project — see
 * SUPABASE_SETUP.md for the exact, one-time manual steps.
 *
 * Leaving this untouched (the placeholder URL below) keeps cloud sync
 * completely off — cloud-sync.js detects the placeholder and no-ops, so
 * ClipSAT behaves exactly as it does today until you opt in.
 */
window.CLIPSAT_CLOUD_CONFIG = {
  url: 'https://ynnqrxeprxhtdimzwxwx.supabase.co',
  // Optional same-origin reverse proxy path (served by functions/api/supabase/[[path]].js
  // when fronted by Cloudflare Pages/Workers). Used automatically as a first-party
  // failover when anti-tracking extensions (AVG AntiTrack, Avast, Brave, etc.) block
  // background XHR/fetch requests to *.supabase.co.
  proxyPath: '/api/supabase',
  // Supabase's new-format "publishable" key — the direct replacement for the
  // legacy JWT anon key, same public-by-design guarantee (RLS in schema.sql
  // is what actually protects the data).
  anonKey: 'sb_publishable_TSqeSDachPoKNA8quZskkQ_weF1bQZG'
};

/* Set to true in a local override (not this checked-in file) to see
   [ClipSATCloud] debug logs in the console while testing. */
window.CLIPSAT_CLOUD_DEBUG = false;

/* ── Early Synchronous OAuth Callback Fragment Capture ───────────────────
 * Runs synchronously BEFORE engine.js (which is non-deferred) and BEFORE
 * cloud-sync.js (which is deferred):
 *   1. Captures #access_token=...&refresh_token=... (or #error=...) returned
 *      by Google / Supabase OAuth redirect before any client-side hash router
 *      can overwrite or misinterpret location.hash.
 *   2. Immediately scrubs bearer tokens out of the browser address bar and
 *      session history via history.replaceState so tokens never leak via
 *      location.href, error logs, or third-party scripts.
 *   3. Exposes a one-time reader (__CLIPSAT_CONSUME_OAUTH_HASH__) consumed by
 *      cloud-sync.js during init(). */
(function () {
  var captured = null;
  try {
    var rawHash = window.location.hash || '';
    if (
      rawHash.length > 1 &&
      (rawHash.indexOf('access_token=') !== -1 || rawHash.indexOf('error_description=') !== -1)
    ) {
      // Handle accidental double-hash fragments (e.g. "#view/sat#access_token=...") cleanly
      var tokenPartIdx = rawHash.indexOf('access_token=');
      if (tokenPartIdx === -1) tokenPartIdx = rawHash.indexOf('error=');
      var querySlice = tokenPartIdx > 1 ? rawHash.slice(tokenPartIdx) : rawHash.slice(1);
      var params = new URLSearchParams(querySlice);
      if (params.get('access_token') || params.get('error') || params.get('error_description')) {
        captured = {
          access_token: params.get('access_token') || '',
          refresh_token: params.get('refresh_token') || '',
          expires_in: parseInt(params.get('expires_in') || '3600', 10) || 3600,
          expires_at: parseInt(params.get('expires_at') || '0', 10) || 0,
          token_type: params.get('token_type') || 'bearer',
          provider_token: params.get('provider_token') || '',
          provider_refresh_token: params.get('provider_refresh_token') || '',
          error: params.get('error') || '',
          error_description: params.get('error_description') || ''
        };
        if (window.history && typeof window.history.replaceState === 'function') {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    }
  } catch (e) {}

  window.__CLIPSAT_CONSUME_OAUTH_HASH__ = function () {
    var out = captured;
    captured = null;
    return out;
  };
})();
