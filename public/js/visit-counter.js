/**
 * ClipSAT — site-wide visit counter  v1.0
 * ════════════════════════════════════════════════════════════════════════
 * Replaces the old hits.sh badge on the home page. That badge was a single
 * third-party <img>, loading="lazy", placed in the very last section of the
 * home page — so it undercounted by construction:
 *   - It never fired for a visitor whose first page was any OTHER page
 *     (a track page like /qudrat/, a shared link, a search result) — only
 *     the home page carried the badge at all.
 *   - Even on the home page, loading="lazy" meant it only ever requested
 *     the image once a viewer scrolled all the way to the bottom, so most
 *     home-page visits weren't counted either.
 *   - It was a raw hit counter (one increment per image load, no dedupe),
 *     so reloads inflated it while ad blockers/privacy extensions —
 *     exactly the kind of tool that targets a third-party "hit counter"
 *     domain — silently suppressed it.
 *
 * This version counts real site visits instead: it runs from every page
 * (loaded site-wide, same as cloud-sync.js), increments once per browser
 * TAB SESSION rather than once per page view (so clicking between /qudrat/
 * and /odes/ in the same tab counts as one visit, not two), and reads the
 * live total straight from ClipSAT's own Supabase project — the same
 * backend cloud-sync.js already talks to for optional cross-device sync
 * (see supabase/schema.sql's site_visits table + increment_site_visits()).
 *
 * No personal data is attached to the increment: the RPC call takes no
 * arguments, and the table has no user_id/IP/device column — see
 * schema.sql's comment on site_visits for the full access-control story
 * (anyone can read the total; nothing but the SECURITY DEFINER function
 * below can change it).
 *
 * If cloud-config.js is left at its placeholder (cloud sync not set up),
 * this whole file no-ops, exactly like cloud-sync.js does — nothing here
 * ever requires a Supabase project to exist.
 */
(function () {
  'use strict';

  // Bumped only if this counting scheme itself changes shape (e.g. a
  // different session semantic) — lets a future version invalidate old
  // sessionStorage flags cleanly instead of reusing a key with different meaning.
  var COUNTED_KEY = 'clipsat_visit_counted_v1';

  function toNum(v) {
    if (typeof v === 'number') return v;
    if (typeof v === 'string' && v !== '') { var n = Number(v); return isNaN(n) ? null : n; }
    return null;
  }

  function renderCount(n) {
    var el = document.getElementById('clipsat-visit-count');
    if (!el || n === null) return;
    try { el.textContent = n.toLocaleString(); }
    catch (e) { el.textContent = String(n); }
  }

  function alreadyCountedThisSession() {
    try { return sessionStorage.getItem(COUNTED_KEY) === '1'; }
    catch (e) { return true; } // storage blocked (private mode/policy) — don't retry every page
  }
  function markCountedThisSession() {
    try { sessionStorage.setItem(COUNTED_KEY, '1'); } catch (e) {}
  }

  // Read-only fetch of the current running total, for pages/sessions that
  // aren't incrementing it themselves right now (already counted this
  // session, or the increment call failed) but still want to display it.
  function readCurrentTotal(sb) {
    if (!document.getElementById('clipsat-visit-count')) return; // nothing to show on this page
    sb.from('site_visits').select('count').eq('id', 1).single().then(function (res) {
      if (res && res.data) renderCount(toNum(res.data.count));
    })['catch'](function () {});
  }

  function run() {
    var cloud = window.ClipSATCloud;
    if (!cloud || !cloud.configured) return; // no Supabase project configured — nothing to count against
    cloud.ready.then(function () {
      var sb = cloud.getClient();
      if (!sb) return;

      if (alreadyCountedThisSession()) { readCurrentTotal(sb); return; }

      // Mark counted before the call resolves, not after: a fast double
      // navigation (or a re-run of this script) shouldn't double-increment.
      // The rare cost is a missed increment if the request itself never
      // reaches the server (e.g. fully offline) — never a duplicate one.
      markCountedThisSession();
      sb.rpc('increment_site_visits').then(function (res) {
        var n = res && !res.error ? toNum(res.data) : null;
        if (n !== null) renderCount(n); else readCurrentTotal(sb);
      })['catch'](function () { readCurrentTotal(sb); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
