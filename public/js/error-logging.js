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

  function sanitizeErrorText(str, maxLen) {
    if (!str) return null;
    return String(str)
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
      .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [redacted-token]')
      .replace(/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{4,}\.[A-Za-z0-9_-]{2,}/g, '[redacted-jwt]')
      .replace(/access_token=[^&\s#]+/gi, 'access_token=[redacted]')
      .replace(/refresh_token=[^&\s#]+/gi, 'refresh_token=[redacted]')
      .replace(/(https?:\/\/[^\s?#]+)\?[^\s#]+/gi, '$1?[redacted]')
      .replace(/\?assign=[0-9a-z._-]+/gi, '?assign=[redacted]')
      .slice(0, maxLen || 2000);
  }

  function report(fields) {
    var cleanMsg = sanitizeErrorText(fields.message, 500) || '';
    var cleanStack = sanitizeErrorText(fields.stack, 2000);
    var cleanSource = fields.source ? String(fields.source).split('?')[0].split('#')[0].slice(0, 500) : null;
    var key = cleanMsg + '|' + cleanSource + '|' + fields.line;
    if (seenThisPage[key]) return;
    seenThisPage[key] = true;

    if (readCount() >= MAX_PER_SESSION) { log('session cap reached, dropping: ' + cleanMsg); return; }
    bumpCount();

    var cloud = window.ClipSATCloud;
    if (!cloud || !cloud.configured) { log('cloud sync not configured, dropping: ' + cleanMsg); return; }

    cloud.ready.then(function () {
      var sb = cloud.getClient();
      if (!sb) return;
      sb.rpc('log_client_error', {
        p_message: cleanMsg,
        p_track: window.CLIPSAT_TRACK || null,
        p_source: cleanSource,
        p_line: fields.line,
        p_col: fields.col,
        p_stack: cleanStack,
        p_page_url: location.origin + location.pathname,
        p_user_agent: String(navigator.userAgent || '').slice(0, 200)
      }).then(
        function (res) { if (res && res.error) log('RPC error: ' + res.error.message); },
        function (err) { log('RPC threw: ' + (err && err.message)); }
      );
    }, function () {});
  }

  window.ClipSATErrorLog = {
    sanitizeErrorText: sanitizeErrorText
  };

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
