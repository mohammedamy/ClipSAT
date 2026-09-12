/**
 * ClipSAT — site-wide visit counter  v1.1
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
 *
 * v1.1: v1.0 showed a real number on the very first page of a tab session
 * (the increment's own return value), then went blank ("—") on every later
 * page/reload in that SAME session — because that later view skips the
 * increment (correctly, to avoid double-counting) and instead re-reads the
 * total from Supabase, and if that read is slow, blocked, or fails for any
 * reason (cloud-sync.js documents real cases of browser extensions
 * silently blocking requests to *.supabase.co), nothing ever replaces the
 * page's static "—" placeholder. Fixed by caching the last known number in
 * sessionStorage the moment it's known, and rendering that cached value
 * immediately and unconditionally — no network round trip required just to
 * redisplay a number this tab already saw. The live read-only re-fetch
 * still runs in the background and updates the number further if it
 * succeeds, but is no longer the only thing standing between the visitor
 * and a blank counter.
 */
(function () {
  'use strict';

  // Bumped only if this counting scheme itself changes shape (e.g. a
  // different session semantic) — lets a future version invalidate old
  // sessionStorage entries cleanly instead of reusing a key with a
  // different meaning.
  var COUNTED_KEY = 'clipsat_visit_counted_v1';
  var CACHE_KEY   = 'clipsat_visit_count_cache_v1';

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

  function getCachedCount() {
    try { return toNum(sessionStorage.getItem(CACHE_KEY)); }
    catch (e) { return null; }
  }
  function setCachedCount(n) {
    try { sessionStorage.setItem(CACHE_KEY, String(n)); } catch (e) {}
  }

  function alreadyCountedThisSession() {
    try { return sessionStorage.getItem(COUNTED_KEY) === '1'; }
    catch (e) { return true; } // storage blocked (private mode/policy) — don't retry every page
  }
  function markCountedThisSession() {
    try { sessionStorage.setItem(COUNTED_KEY, '1'); } catch (e) {}
  }

  // Best-effort background refresh of the running total — used once this
  // tab has already counted its own visit, or if the increment call itself
  // failed. Purely additive: on success it updates the (already-rendered,
  // possibly cached) number; on failure or timeout it changes nothing,
  // since renderCount() from the cache already ran synchronously in run().
  function refreshCurrentTotal(sb) {
    if (!document.getElementById('clipsat-visit-count')) return; // nothing to show on this page
    sb.from('site_visits').select('count').eq('id', 1).maybeSingle().then(
      function (res) {
        var n = res && res.data ? toNum(res.data.count) : null;
        if (n !== null) { setCachedCount(n); renderCount(n); }
      },
      function () {} // network/RLS hiccup — leave whatever's already rendered alone
    );
  }

  function run() {
    // Render whatever this tab already knows RIGHT NOW, with no network
    // dependency — see the v1.1 note above for why this line is the fix.
    var cached = getCachedCount();
    if (cached !== null) renderCount(cached);

    var cloud = window.ClipSATCloud;
    if (!cloud || !cloud.configured) return; // no Supabase project configured — nothing to count against
    cloud.ready.then(function () {
      var sb = cloud.getClient();
      if (!sb) return;

      if (alreadyCountedThisSession()) { refreshCurrentTotal(sb); return; }

      // Mark counted before the call resolves, not after: a fast double
      // navigation (or a re-run of this script) shouldn't double-increment.
      // The rare cost is a missed increment if the request itself never
      // reaches the server (e.g. fully offline) — never a duplicate one.
      markCountedThisSession();
      sb.rpc('increment_site_visits').then(
        function (res) {
          var n = res && !res.error ? toNum(res.data) : null;
          if (n !== null) { setCachedCount(n); renderCount(n); } else refreshCurrentTotal(sb);
        },
        function () { refreshCurrentTotal(sb); }
      );
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
