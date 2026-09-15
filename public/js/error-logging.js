/**
 * ClipSAT Error Logging  v1.0  (Plan 5, Phase 5.010)
 * ════════════════════════════════════════════════════════════════════════
 * The "error logging" half of Phase 5.010's basic uptime/error-monitoring
 * pair (the other half is .github/workflows/uptime-check.yml). Catches
 * uncaught JS errors and unhandled promise rejections from any page and
 * reports them to Supabase via the log_client_error() RPC (see
 * supabase/schema.sql) — same "read the live repo, not a guess" shape as
 * cloud-sync.js: reuses its already-initialized client instead of creating
 * a second one, and no-ops completely if cloud sync was never configured,
 * so a site with no Supabase project behaves exactly as before.
 *
 * This is a report-only channel: log_client_error() writes through a
 * SECURITY DEFINER function with no SELECT policy on the table it writes
 * to, so nothing here can ever read back what other visitors' browsers
 * reported — see the schema comment for the full access-control story.
 *
 * Deliberately NOT loaded on cloud-config.js/cloud-sync.js's own dynamic
 * <script> failures — if the CDN or Supabase project itself is down,
 * there's no client to report through anyway. That gap is exactly what
 * uptime-check.yml's periodic external check covers instead.
 */
(function () {
  'use strict';

  // Per-tab-session cap: the real defense against a runaway error loop
  // (the same bug throwing hundreds of times a second) flooding writes —
  // schema.sql's per-row size limits are just a backstop, not the primary
  // guard. Once tripped, this tab reports nothing else for the rest of the
  // session; it isn't meant to catch every occurrence, just prove one is
  // happening.
  var MAX_PER_SESSION = 8;
  var CAP_KEY = 'clipsat_err_log_count_v1';

  // In-memory only (not sessionStorage): dedupes repeats of the exact same
  // error within this page view without adding another storage round trip
  // to the hot path of an error handler. A reload naturally resets it,
  // which is fine — the session cap above is what bounds total volume
  // across a whole tab session, not this.
  var seenThisPage = {};

  function log(msg) { if (window.CLIPSAT_CLOUD_DEBUG) { try { console.log('[ClipSATErrorLog]', msg); } catch (e) {} } }

  function readCount() {
    try { return parseInt(sessionStorage.getItem(CAP_KEY), 10) || 0; } catch (e) { return 0; }
  }
  function bumpCount() {
    try { sessionStorage.setItem(CAP_KEY, String(readCount() + 1)); } catch (e) {}
  }

  function report(fields) {
    var key = fields.message + '|' + fields.source + '|' + fields.line;
    if (seenThisPage[key]) return;
    seenThisPage[key] = true;

    if (readCount() >= MAX_PER_SESSION) { log('session cap reached, dropping: ' + fields.message); return; }
    bumpCount();

    // Checked at report time, not at module-load time: cloud-sync.js's
    // Supabase SDK <script> tag loads asynchronously, so window.ClipSATCloud
    // may not be the real (configured) object yet on the very first tick —
    // but an error can happen anywhere in the session, by which point
    // cloud-sync.js has long since finished initializing. Same tolerance
    // for "might miss the very first instant" as visit-counter.js already
    // accepts (see its v1.1 comment) — not worth a retry/poll loop for a
    // best-effort diagnostic channel.
    var cloud = window.ClipSATCloud;
    if (!cloud || !cloud.configured) { log('cloud sync not configured, dropping: ' + fields.message); return; }

    cloud.ready.then(function () {
      var sb = cloud.getClient();
      if (!sb) return;
      sb.rpc('log_client_error', {
        p_message: fields.message,
        p_track: window.CLIPSAT_TRACK || null,
        p_source: fields.source,
        p_line: fields.line,
        p_col: fields.col,
        p_stack: fields.stack,
        p_page_url: location.href,
        p_user_agent: navigator.userAgent
      }).then(
        function (res) { if (res && res.error) log('RPC error: ' + res.error.message); },
        function (err) { log('RPC threw: ' + (err && err.message)); }
      );
    }, function () {});
  }

  window.addEventListener('error', function (evt) {
    // Ignore resource-load errors (a failed <img>/<script>/<link> also fires
    // 'error', but with no .message/.error — that's a broken asset, not a
    // JS bug, and reporting every ad-blocker-blocked request would drown
    // out real errors under this suite's own session cap).
    if (!evt || !evt.message) return;
    report({
      message: String(evt.message).slice(0, 500),
      source: evt.filename || null,
      line: evt.lineno || null,
      col: evt.colno || null,
      stack: evt.error && evt.error.stack ? String(evt.error.stack).slice(0, 2000) : null
    });
  });

  window.addEventListener('unhandledrejection', function (evt) {
    var reason = evt && evt.reason;
    var message = reason instanceof Error ? reason.message : String(reason);
    report({
      message: ('Unhandled rejection: ' + message).slice(0, 500),
      source: null,
      line: null,
      col: null,
      stack: reason instanceof Error && reason.stack ? String(reason.stack).slice(0, 2000) : null
    });
  });
})();
