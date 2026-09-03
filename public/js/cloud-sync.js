/**
 * ClipSAT Cloud Sync  v1.0
 * ════════════════════════════════════════════════════════════════════════
 * Adds OPTIONAL cross-device accounts on top of ClipSAT's existing
 * localStorage-only progress system — without touching engine.js.
 *
 * How it works
 * ────────────
 *   ClipSAT already keeps every bit of a student's progress in a handful
 *   of known localStorage keys: the mistake log (clipsat_mistakes_v2),
 *   SRS flashcard schedule (clipsat_srs_state), chapter visit counts
 *   (clipsat_visited), XP/streak, daily-goal tracking, and the exam date.
 *   This module treats those keys as the single source of truth on-device
 *   and mirrors them to Supabase:
 *
 *     - On sign-in: pull the cloud copy and MERGE it into localStorage
 *       (newest-record-wins per entry, union of ids/keys), so anything
 *       already on this device survives untouched.
 *     - On every write to a watched key: debounce ~4s, then push the
 *       current value up to Supabase.
 *
 *   Every existing ClipSAT function (ML.add, CSGamify, the daily-goal
 *   bar, …) keeps reading/writing localStorage exactly as it does today —
 *   this module only listens in from the outside. If cloud-config.js is
 *   left at its placeholder values, this whole file no-ops on load and
 *   ClipSAT behaves exactly as it does right now.
 *
 * Setup (see SUPABASE_SETUP.md for the full walkthrough)
 * ─────
 *   1. Create a free Supabase project.
 *   2. Run supabase/schema.sql once, in that project's SQL editor.
 *   3. Fill in public/js/cloud-config.js with the project URL + anon key.
 *
 * Public API — window.ClipSATCloud
 * ─────────────────────────────────
 *   .configured               → bool, false until cloud-config.js is filled in
 *   .signInWithEmail(email)   → emails a one-time code, returns a Promise
 *   .verifyEmailCode(email,code) → verifies that code and signs in, returns a Promise
 *   .signOut()
 *   .isSignedIn()             → bool
 *   .currentEmail()           → string | null
 *   .syncNow()                → force an immediate push (normally automatic)
 */
(function () {
  'use strict';

  var CFG = window.CLIPSAT_CLOUD_CONFIG;
  if (!CFG || !CFG.url || !CFG.anonKey || CFG.url.indexOf('YOUR-PROJECT') !== -1) {
    // Not configured yet — fail silent. ClipSAT works exactly as before.
    window.ClipSATCloud = { configured: false };
    return;
  }

  var WATCHED_KEYS = [
    'clipsat_mistakes_v2', 'clipsat_srs_state', 'clipsat_visited', 'clipsat_accuracy_v1',
    'clipsat_xp', 'clipsat_streak', 'clipsat_exam_date',
    'clipsat_daily_goal', 'clipsat_dg_today', 'clipsat_dg_streak', 'clipsat_dg_last'
  ];

  var sb = null;
  var pushTimer = null;
  var _cachedUser = null;
  // Resolves once the initial getSession() check below has settled (signed
  // in or not) — exposed on window.ClipSATCloud.ready so callers made in the
  // first instant after page load (e.g. engine.js's AI proxy call) can wait
  // on it instead of racing isSignedIn()/getClient() while the SDK is still
  // loading from its CDN <script> tag.
  var _readyResolve;
  var _readyPromise = new Promise(function (resolve) { _readyResolve = resolve; });

  function log(msg) { if (window.CLIPSAT_CLOUD_DEBUG) { try { console.log('[ClipSATCloud]', msg); } catch (e) {} } }

  function loadSDK(cb) {
    if (window.supabase) { cb(); return; }
    var s = document.createElement('script');
    // Pinned, NOT floating "@2" — floating always serves whatever the
    // newest 2.x release happens to be, which silently broke Google
    // sign-in here: the OAuth round-trip completed successfully (Supabase's
    // own Auth Logs showed a clean Login event, no errors) and the tokens
    // genuinely landed in the URL on return, but detectSessionInUrl() never
    // turned them into a session — confirmed live, including with a
    // freshly-constructed client mid-page, ruling out any timing/init-order
    // issue on ClipSAT's own side. 2.112.4 (pulled by "@2" as of 2026-08-28)
    // shipped two auth-lock/refresh-coordination fixes 4 days prior
    // (supabase/supabase-js #2616, #2627) touching exactly this code path.
    // Pinned to 2.112.3 (2026-08-11), the last release before those,
    // instead of chasing the exact regression in a 212KB minified bundle.
    // If Google sign-in is confirmed working again, this can very likely
    // move forward past 2.112.4 too — re-test before assuming it's still
    // broken there.
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.112.3/dist/umd/supabase.min.js';
    s.onload = cb;
    s.onerror = function () { log('failed to load Supabase SDK from CDN — staying local-only'); };
    document.head.appendChild(s);
  }

  // ── "Only works in incognito" root cause ───────────────────────────────
  // Two real, confirmed failure modes both land here, and neither ever
  // showed up in incognito (a fresh profile has no extensions running by
  // default, and no leftover localStorage from before the SDK pin above):
  //
  //  1. A browser extension silently drops requests to *.supabase.co (or
  //     otherwise interferes with the page) in the user's normal profile —
  //     confirmed live not to require an ad blocker specifically: a plain
  //     Chrome profile with zero ad blockers still failed until every
  //     extension was disabled, narrowing it to *some* other extension
  //     (password manager / privacy-VPN / shopping-coupon tools are the
  //     common culprits — anything injecting a content script into every
  //     page). getSession() then never resolves OR rejects; it just
  //     hangs forever. Nothing downstream ever ran: _readyResolve() never
  //     fired (so anything awaiting window.ClipSATCloud.ready — e.g. the
  //     AI proxy call — hung too), and renderAuthUI() never ran, so the
  //     sign-in button's own click handler might not even be wired up yet
  //     depending on timing. Fixed by racing getSession() against a
  //     timeout below, so the module always finishes initializing either
  //     way and the user sees an actionable warning instead of nothing.
  //
  //  2. A leftover, unparseable session object sits in this browser's
  //     localStorage from before the SDK pin at the top of this file
  //     (the floating "@2" that broke detectSessionInUrl() — see that
  //     comment) — supabase-js's storage layer can throw synchronously
  //     while trying to read/parse it, rejecting getSession() outright.
  //     Recovered below by clearing just the Supabase auth storage keys
  //     and retrying once — the user ends up signed out (same as a fresh
  //     incognito session) instead of permanently stuck.
  var GETSESSION_TIMEOUT_MS = 8000;
  var _healthNotice = null; // set if init() had to recover from #1/#2 above — surfaced next time the sign-in modal opens

  function clearStaleAuthStorage() {
    try {
      Object.keys(localStorage).forEach(function (k) {
        // supabase-js's own storage key shape: sb-<project-ref>-auth-token
        if (k.indexOf('sb-') === 0 && k.indexOf('-auth-token') !== -1) localStorage.removeItem(k);
      });
    } catch (e) {}
  }

  function getSessionWithRecovery() {
    var timedOut = false;
    return Promise.race([
      sb.auth.getSession(),
      new Promise(function (resolve) {
        setTimeout(function () { timedOut = true; resolve({ data: { session: null } }); }, GETSESSION_TIMEOUT_MS);
      })
    ]).then(function (r) {
      if (timedOut) {
        log('getSession() did not respond within ' + GETSESSION_TIMEOUT_MS + 'ms — treating as signed-out (likely a blocked request)');
        _healthNotice = 'stalled';
      }
      return r;
    })['catch'](function (err) {
      log('getSession() threw (' + (err && err.message) + ') — clearing local auth storage and retrying once');
      _healthNotice = 'corrupted';
      clearStaleAuthStorage();
      return sb.auth.getSession()['catch'](function () { return { data: { session: null } }; });
    });
  }

  function init() {
    sb = window.supabase.createClient(CFG.url, CFG.anonKey);

    getSessionWithRecovery().then(function (r) {
      if (r.data && r.data.session) onSignedIn();
      else renderAuthUI();
      _readyResolve();
    });

    sb.auth.onAuthStateChange(function (event, session) {
      if (event === 'SIGNED_IN' && session) { onSignedIn(); maybeStoreGoogleRefreshToken(session); restorePostSignInHash(); }
      if (event === 'SIGNED_OUT') { _cachedUser = null; log('signed out — local progress untouched'); renderAuthUI(); }
    });

    watchLocalStorage();
    renderAuthUI();
  }

  // ── Sign-in flow: a one-time code, typed in rather than a clickable
  // link. ClipSAT never sees or stores a password.
  //
  // Why a code instead of a link: Supabase magic links are single-use, and
  // email security scanners (Outlook Safe Links, some corporate/Gmail mail
  // filters) silently "pre-visit" links in incoming mail to check them for
  // safety — that pre-visit consumes the one-time token before the user
  // ever clicks it, so the real click always fails with otp_expired even
  // seconds after the email arrives. A code the user has to type by hand
  // can't be consumed that way. Same underlying Supabase call either way —
  // signInWithOtp() emails both a link and a code by default; this flow
  // just asks the user to act on the code. See SUPABASE_SETUP.md for the
  // one-time email-template change needed so the code actually appears
  // in the email (Supabase's default template only shows the link).
  function signInWithEmail(email) {
    return sb.auth.signInWithOtp({ email: email });
  }
  function verifyEmailCode(email, token) {
    return sb.auth.verifyOtp({ email: email, token: token, type: 'email' });
  }

  // ── Sign-in flow: Google (one click, no code to type) ─────────────────
  // Redirects the whole page to Google's consent screen and back — not a
  // popup, since Supabase's own OAuth helper is redirect-based.
  //
  // Deliberately requests ONLY basic identity scopes here, not Forms/Drive.
  // Earlier this sign-in also requested the Forms/Drive scopes up front
  // (one click covers everything). The problem: Google treats Forms/Drive
  // as sensitive/restricted scopes, and for an unverified app requesting
  // them, Google refuses to show consent-screen branding at all — every
  // user saw a scary "ynnqrxeprxhtdimzwxwx.supabase.co wants access to
  // your Google Account" screen (raw project URL, no ClipSAT name/logo)
  // on every sign-in, confirmed live in the browser. Proper OAuth
  // verification for those scopes is a separate, slower fix (Google
  // review). Splitting the scopes fixes it for everyone immediately: this
  // flow now only ever asks for email/profile, which Google always
  // branding-shows cleanly, no verification required. Forms/Drive access
  // is requested incrementally, only when actually needed, via
  // google-integration.js's ensureScopes() — see its own GIS popup flow
  // and trySupabaseGoogleToken() (now just a no-op fallback here since
  // maybeStoreGoogleRefreshToken() below never gets a refresh token to
  // store without offline+consent, and that's fine).
  var POST_SIGNIN_HASH_KEY = 'clipsat_post_google_signin_hash';
  function signInWithGoogle() {
    // ClipSAT's own view router uses a URL hash (#view/...) for
    // navigation. Google's OAuth redirect ALSO delivers its result via a
    // URL hash (#access_token=...) appended to whatever redirectTo was
    // given — confirmed live: redirecting back to a page that already had
    // its own hash produced one malformed fragment
    // ("#view/est/est-about#access_token=...") that supabase-js's
    // OAuth-callback detector doesn't recognize at all, so the session
    // silently never got established despite the token clearly being
    // present in the URL. Strip the hash before redirecting (so
    // Supabase's own callback-hash lands clean) and save it here to
    // restore the user's place afterward — see the SIGNED_IN handler.
    try { sessionStorage.setItem(POST_SIGNIN_HASH_KEY, window.location.hash || ''); } catch (e) {}
    return sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'email profile',
        redirectTo: window.location.href.split('#')[0]
      }
    });
  }

  // Restores the pre-sign-in hash-route saved above. Safe to call
  // unconditionally on every SIGNED_IN event (including plain email
  // sign-in, which never redirects at all) — sessionStorage simply won't
  // have this key set in that case, so it's a no-op.
  function restorePostSignInHash() {
    var saved;
    try { saved = sessionStorage.getItem(POST_SIGNIN_HASH_KEY); sessionStorage.removeItem(POST_SIGNIN_HASH_KEY); } catch (e) { saved = null; }
    if (!saved) return;
    try { history.replaceState(null, '', window.location.pathname + window.location.search + saved); }
    catch (e) { window.location.hash = saved; }
  }

  // Captures Google's OAuth refresh token the moment it's handed to us, IF
  // one is present, and stores it via supabase/functions/google-token's
  // backing table, so google-integration.js can get fresh Forms/Drive
  // access tokens later without ever prompting the user again. Since
  // signInWithGoogle() above no longer requests access_type:'offline' +
  // prompt:'consent' (see its comment), Google no longer hands back a
  // refresh token here at all — session.provider_refresh_token is always
  // absent now, so this is currently a permanent no-op. Left in place
  // rather than removed: harmless, and would spring back to life on its
  // own if those query params are ever restored (e.g. once/if the app
  // completes Google's OAuth verification for Forms/Drive and it becomes
  // safe to request them up front again). Fire-and-forget either way: on
  // failure the user just falls back to google-integration.js's own GIS
  // popup when they try to use Forms — not fatal to sign-in itself.
  function maybeStoreGoogleRefreshToken(session) {
    if (!session.provider_refresh_token) return;
    sb.from('google_oauth_tokens')
      .upsert({ user_id: session.user.id, refresh_token: session.provider_refresh_token, updated_at: new Date().toISOString() })
      .then(function (r) { log(r.error ? ('failed to store Google refresh token: ' + r.error.message) : 'Google refresh token stored'); });
  }

  function signOut() { return sb.auth.signOut(); }
  function currentEmail() { return _cachedUser ? _cachedUser.email : null; }
  // 'google' | 'email' | null — which provider the CURRENT session came
  // through. google-integration.js uses this to decide whether it's worth
  // even trying supabase/functions/google-token before falling back to its
  // own popup flow.
  function currentProvider() {
    if (!_cachedUser) return null;
    var identities = _cachedUser.identities || [];
    var hasGoogle = identities.some(function (i) { return i.provider === 'google'; });
    return hasGoogle ? 'google' : (_cachedUser.app_metadata && _cachedUser.app_metadata.provider) || 'email';
  }

  function onSignedIn() {
    sb.auth.getUser().then(function (r) {
      _cachedUser = r.data ? r.data.user : null;
      renderAuthUI();
      pullAndMerge();
    });
  }

  // ── Pull cloud data and merge into localStorage (newest wins, nothing dropped) ──
  function pullAndMerge() {
    var uid = _cachedUser && _cachedUser.id;
    if (!uid) return;

    Promise.all([
      sb.from('profiles').select('*').eq('user_id', uid).maybeSingle(),
      sb.from('mistakes').select('*').eq('user_id', uid),
      sb.from('srs_state').select('*').eq('user_id', uid),
      sb.from('chapter_visits').select('*').eq('user_id', uid),
      sb.from('accuracy').select('*').eq('user_id', uid)
    ]).then(function (results) {
      mergeProfile(results[0] && results[0].data);
      mergeMistakes((results[1] && results[1].data) || []);
      mergeSrsState((results[2] && results[2].data) || []);
      mergeVisits((results[3] && results[3].data) || []);
      mergeAccuracy((results[4] && results[4].data) || []);
      log('pulled + merged cloud data for ' + uid);
    })['catch'](function (e) { log('pull failed: ' + (e && e.message)); });
  }

  function mergeProfile(row) {
    if (!row) return;
    var localXp = parseInt(localStorage.getItem('clipsat_xp') || '0', 10);
    if (typeof row.xp === 'number' && row.xp > localXp) localStorage.setItem('clipsat_xp', String(row.xp));

    var localStreak = parseInt(localStorage.getItem('clipsat_streak') || '0', 10);
    if (typeof row.streak === 'number' && row.streak > localStreak) localStorage.setItem('clipsat_streak', String(row.streak));

    if (row.exam_date && !localStorage.getItem('clipsat_exam_date')) {
      localStorage.setItem('clipsat_exam_date', row.exam_date);
    }
    if (row.daily_goal) localStorage.setItem('clipsat_daily_goal', String(row.daily_goal));

    var localDgStreak = parseInt(localStorage.getItem('clipsat_dg_streak') || '0', 10);
    if (typeof row.dg_streak === 'number' && row.dg_streak > localDgStreak) {
      localStorage.setItem('clipsat_dg_streak', String(row.dg_streak));
    }
  }

  function mergeMistakes(rows) {
    if (!rows.length) return;
    var local = safeParse('clipsat_mistakes_v2', []);
    var byId = {};
    local.forEach(function (m) { byId[m.id] = m; });
    rows.forEach(function (r) {
      var existing = byId[r.id];
      if (!existing || r.ts > existing.ts) {
        byId[r.id] = {
          id: r.id, viewId: r.view_id || '', q: r.q || '', wrong: r.wrong || '',
          right: r.correct || '', domain: r.domain || '', src: r.src || '',
          ts: r.ts, reviewedAt: r.reviewed_at || 0, easeFactor: r.ease_factor || 2.5,
          interval: r.interval_days || 1, nextReview: r.next_review || (r.ts + 86400000)
        };
      }
    });
    localStorage.setItem('clipsat_mistakes_v2', JSON.stringify(objectValues(byId)));
  }

  function mergeSrsState(rows) {
    if (!rows.length) return;
    var local = safeParse('clipsat_srs_state', {});
    rows.forEach(function (r) {
      var existing = local[r.card_id];
      if (!existing || (r.due || 0) > (existing.due || 0)) {
        local[r.card_id] = { due: r.due, interval: r.interval_days };
      }
    });
    localStorage.setItem('clipsat_srs_state', JSON.stringify(local));
  }

  function mergeVisits(rows) {
    if (!rows.length) return;
    var local = safeParse('clipsat_visited', {});
    rows.forEach(function (r) { local[r.track] = Math.max(local[r.track] || 0, r.count || 0); });
    localStorage.setItem('clipsat_visited', JSON.stringify(local));
  }

  // Same "max wins" merge strategy as mergeVisits above — a rare same-day,
  // two-device race can under-count by a few attempts, which is an
  // acceptable trade-off for a progress heatmap (matches the rest of this
  // file's precedent; no bucket-level timestamp exists to do better).
  function mergeAccuracy(rows) {
    if (!rows.length) return;
    var local = safeParse('clipsat_accuracy_v1', {});
    rows.forEach(function (r) {
      local[r.track] = local[r.track] || {};
      local[r.track][r.domain] = local[r.track][r.domain] || {};
      var existing = local[r.track][r.domain][r.day] || { c: 0, t: 0 };
      local[r.track][r.domain][r.day] = {
        c: Math.max(existing.c, r.correct || 0),
        t: Math.max(existing.t, r.total || 0)
      };
    });
    localStorage.setItem('clipsat_accuracy_v1', JSON.stringify(local));
  }

  // ── Push on change: wrap localStorage.setItem for the keys we care about ──
  function watchLocalStorage() {
    var origSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (key, value) {
      origSetItem(key, value);
      if (WATCHED_KEYS.indexOf(key) !== -1) schedulePush();
    };
  }

  function schedulePush() {
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushAll, 4000); // debounce rapid writes (e.g. answering several quiz questions in a row)
  }

  function pushAll() {
    var uid = _cachedUser && _cachedUser.id;
    if (!uid) return; // not signed in — stay local-only, nothing to push

    var nowIso = new Date().toISOString();
    var dgToday = safeParse('clipsat_dg_today', {});

    sb.from('profiles').upsert({
      user_id: uid,
      xp: parseInt(localStorage.getItem('clipsat_xp') || '0', 10),
      streak: parseInt(localStorage.getItem('clipsat_streak') || '0', 10),
      daily_goal: parseInt(localStorage.getItem('clipsat_daily_goal') || '10', 10),
      dg_today: (dgToday && dgToday.count) || 0,
      dg_today_date: (dgToday && dgToday.date) || null,
      dg_streak: parseInt(localStorage.getItem('clipsat_dg_streak') || '0', 10),
      exam_date: localStorage.getItem('clipsat_exam_date') || null,
      updated_at: nowIso
    }).then(noop, function (e) { log('profile push failed: ' + (e && e.message)); });

    var mistakes = safeParse('clipsat_mistakes_v2', []);
    if (mistakes.length) {
      sb.from('mistakes').upsert(mistakes.map(function (m) {
        return {
          user_id: uid, id: m.id, view_id: m.viewId, q: m.q, wrong: m.wrong,
          correct: m.right, domain: m.domain, src: m.src, ts: m.ts,
          reviewed_at: m.reviewedAt, ease_factor: m.easeFactor,
          interval_days: m.interval, next_review: m.nextReview, updated_at: nowIso
        };
      })).then(noop, function (e) { log('mistakes push failed: ' + (e && e.message)); });
    }

    var srs = safeParse('clipsat_srs_state', {});
    var srsRows = Object.keys(srs).map(function (id) {
      return { user_id: uid, card_id: id, due: srs[id].due, interval_days: srs[id].interval, updated_at: nowIso };
    });
    if (srsRows.length) sb.from('srs_state').upsert(srsRows).then(noop, function (e) { log('srs push failed: ' + (e && e.message)); });

    var visited = safeParse('clipsat_visited', {});
    var visitRows = Object.keys(visited).map(function (track) {
      return { user_id: uid, track: track, count: visited[track], updated_at: nowIso };
    });
    if (visitRows.length) sb.from('chapter_visits').upsert(visitRows).then(noop, function (e) { log('visits push failed: ' + (e && e.message)); });

    var accuracy = safeParse('clipsat_accuracy_v1', {});
    var accRows = [];
    Object.keys(accuracy).forEach(function (track) {
      Object.keys(accuracy[track]).forEach(function (domain) {
        Object.keys(accuracy[track][domain]).forEach(function (day) {
          var b = accuracy[track][domain][day];
          accRows.push({ user_id: uid, track: track, domain: domain, day: day, correct: b.c, total: b.t, updated_at: nowIso });
        });
      });
    });
    if (accRows.length) sb.from('accuracy').upsert(accRows).then(noop, function (e) { log('accuracy push failed: ' + (e && e.message)); });

    log('pushed to cloud');
  }

  function noop() {}
  function safeParse(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key) || 'null'); return v === null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function objectValues(obj) { return Object.keys(obj).map(function (k) { return obj[k]; }); }

  // ── Auth UI hook — button + modal markup live in base.njk (build.js) ──────
  function renderAuthUI() {
    var btn = document.getElementById('cloudSignInBtn');
    // Mobile header copy (base.njk) — icon-only, always visible at the very
    // left of the header below the 760px breakpoint instead of hidden inside
    // the hamburger panel with the rest of .nav-links. Mirrors this same
    // signed-in/out state so a phone user isn't shown a "Sign in" icon while
    // actually signed in.
    var mobileBtn = document.getElementById('cloudSignInBtnMobile');
    if (!btn && !mobileBtn) return;
    if (btn) {
      // Built via DOM nodes (not innerHTML/textContent-of-the-whole-button) for two
      // reasons: it avoids ever needing to HTML-escape the user's own email, and it
      // keeps the label in its own <span> so the header's icon-only responsive CSS
      // (#cloudSignInBtn span{display:none} below ~1350px) can hide just the text
      // and leave the ☁️ icon — a plain textContent assignment here would silently
      // wipe that span back out on every auth-state change and undo the CSS rule.
      btn.textContent = '';
      btn.appendChild(document.createTextNode('☁️ '));
      var label = document.createElement('span');
      label.textContent = _cachedUser ? (_cachedUser.email || 'Synced') : 'Sign in';
      btn.appendChild(label);
    }
    if (_cachedUser) {
      var signedInTitle = 'Signed in — click to sign out';
      var signedInLabel = 'Signed in as ' + (_cachedUser.email || 'a synced account') + ' — click to sign out';
      var doSignOut = function () {
        if (window.confirm('Sign out of cloud sync? Your progress stays on this device.')) signOut();
      };
      if (btn) { btn.title = signedInTitle; btn.setAttribute('aria-label', signedInLabel); btn.onclick = doSignOut; }
      if (mobileBtn) {
        mobileBtn.classList.add('signed-in');
        mobileBtn.title = signedInTitle;
        mobileBtn.setAttribute('aria-label', signedInLabel);
        mobileBtn.onclick = doSignOut;
      }
    } else {
      var signedOutTitle = 'Sign in to sync your progress across devices';
      var doSignIn = function () { window.openCloudAuthModal(); };
      if (btn) { btn.title = signedOutTitle; btn.setAttribute('aria-label', signedOutTitle); btn.onclick = doSignIn; }
      if (mobileBtn) {
        mobileBtn.classList.remove('signed-in');
        mobileBtn.title = signedOutTitle;
        mobileBtn.setAttribute('aria-label', signedOutTitle);
        mobileBtn.onclick = doSignIn;
      }
    }
  }

  // ── Browser health check — storage, cookies, pop-ups ────────────────────
  // Returns an array of issue codes (empty = all clear). Run at modal-open
  // time (cheap, no popup) and again right when the Google button is
  // clicked (adds the popup test, which needs a user gesture to be
  // trustworthy — see checkPopups() below).
  function checkStorage() {
    try {
      var k = '__clipsat_health_check__';
      localStorage.setItem(k, '1');
      var ok = localStorage.getItem(k) === '1';
      localStorage.removeItem(k);
      return ok;
    } catch (e) { return false; }
  }
  function checkPopups() {
    // Opens and immediately closes a 1x1 "canary" window in the same
    // synchronous tick as the user's click — same technique used across
    // the web to detect a pop-up blocker without actually showing the
    // user anything (closing before the next paint means it typically
    // never becomes visible at all in Chrome/Firefox/Edge/Safari).
    // window.open() returns null outright when blocked; some blockers
    // instead return a window that's already .closed, or a
    // window whose own properties throw on access (COOP/sandboxing) —
    // all three are treated as "blocked".
    try {
      var w = window.open('', '', 'width=1,height=1,left=-2000,top=-2000');
      if (!w) return false;
      var blocked = false;
      try { blocked = w.closed; } catch (e) { blocked = true; }
      try { w.close(); } catch (e) {}
      return !blocked;
    } catch (e) { return false; }
  }
  function checkBrowserHealth(includePopupTest) {
    var issues = [];
    if (!checkStorage()) issues.push('storage');
    if (!navigator.cookieEnabled) issues.push('cookies');
    if (includePopupTest && !checkPopups()) issues.push('popup');
    return issues;
  }

  var HEALTH_MESSAGES = {
    storage: 'This browser is blocking local storage for this site, which sign-in needs to remember you’re signed in. Try turning off browser extensions (any of them — not just ad/content blockers) for this site, allow site data, or use a non-private window.',
    cookies: 'Cookies appear to be disabled in this browser, which can prevent signing in. Try enabling cookies for this site.',
    popup: 'Pop-ups appear to be blocked. Google sign-in itself doesn’t need one, but Forms export and some AI features do — consider allowing pop-ups for this site.',
    stalled: 'Nothing happened after the last sign-in attempt — this usually means a browser extension (not necessarily an ad blocker — password managers, VPN/privacy tools, and shopping extensions can all do this) is silently blocking the connection. Try disabling your extensions for this site one at a time, or use a private/incognito window.',
    corrupted: 'Cleared an old, corrupted sign-in session that was stuck in this browser. Please try signing in again.',
    error: 'Something went wrong starting sign-in. If this keeps happening, try disabling your browser extensions (any of them, not just ad blockers) for this site, or use a private/incognito window.'
  };
  function renderHealthWarning(issues) {
    var box = document.getElementById('cloud-auth-health-warning');
    if (!box) return;
    if (!issues || !issues.length) { box.hidden = true; box.textContent = ''; return; }
    box.innerHTML = '';
    issues.forEach(function (code) {
      var p = document.createElement('p');
      p.textContent = '⚠️ ' + (HEALTH_MESSAGES[code] || code);
      box.appendChild(p);
    });
    box.hidden = false;
  }

  window.openCloudAuthModal = function () {
    var m = document.getElementById('cloud-auth-modal');
    if (m) m.classList.add('show');
    // Surface anything init() had to recover from, once, then clear it —
    // this is the modal's first real chance to tell the user about it.
    var issues = checkBrowserHealth(false);
    if (_healthNotice) { issues.push(_healthNotice); _healthNotice = null; }
    renderHealthWarning(issues);
  };
  window.closeCloudAuthModal = function () {
    var m = document.getElementById('cloud-auth-modal');
    if (m) m.classList.remove('show');
  };

  // Wraps signInWithGoogle() with the pop-up test (needs this exact click
  // to be a trustworthy user gesture, so it can't run at modal-open time)
  // and a stall watchdog: signInWithOAuth() should redirect the whole page
  // almost immediately, so if we're still here after a few seconds, either
  // the promise is hanging (a blocked request — the same failure mode
  // getSessionWithRecovery() guards against above, just mid-sign-in
  // instead of at load) or it resolved with an error. Either way the user
  // gets an actionable message instead of a dead button.
  var GOOGLE_SIGNIN_STALL_MS = 4000;
  window.cloudSignInGoogle = function () {
    if (!window.ClipSATCloud || !window.ClipSATCloud.signInWithGoogle) return;
    var issues = checkBrowserHealth(true);
    renderHealthWarning(issues);
    var status = document.getElementById('cloud-auth-status');
    if (status) status.textContent = 'Redirecting to Google…';
    var settled = false;
    var stallTimer = setTimeout(function () {
      if (settled) return;
      if (status) status.textContent = '';
      renderHealthWarning(issues.length ? issues : ['stalled']);
    }, GOOGLE_SIGNIN_STALL_MS);
    window.ClipSATCloud.signInWithGoogle().then(function (r) {
      settled = true;
      clearTimeout(stallTimer);
      // A normal, unblocked redirect never gets here — the page navigates
      // away first. Reaching this .then() with an error means the request
      // itself completed but Google/Supabase rejected it (not a pop-up or
      // storage problem), so show that error message specifically instead
      // of the generic health warning list.
      if (r && r.error) {
        if (status) status.textContent = '';
        renderHealthWarning(['error']);
        log('signInWithGoogle error: ' + r.error.message);
      }
    })['catch'](function (e) {
      settled = true;
      clearTimeout(stallTimer);
      if (status) status.textContent = '';
      renderHealthWarning(['error']);
      log('signInWithGoogle threw: ' + (e && e.message));
    });
  };
  // Step 1: email a one-time code.
  window.cloudSendCode = function () {
    var input = document.getElementById('cloud-auth-email');
    var status = document.getElementById('cloud-auth-status');
    if (!input || !input.value) return;
    if (status) status.textContent = 'Sending…';
    signInWithEmail(input.value.trim()).then(function (r) {
      if (!status) return;
      if (r && r.error) { status.textContent = r.error.message; return; }
      status.textContent = 'Check your email for a sign-in code.';
      var codeStep = document.getElementById('cloud-auth-code-step');
      if (codeStep) codeStep.hidden = false;
      var codeInput = document.getElementById('cloud-auth-code');
      if (codeInput) codeInput.focus();
    });
  };
  // Step 2: verify the code the user typed in and complete sign-in.
  window.cloudVerifyCode = function () {
    var emailInput = document.getElementById('cloud-auth-email');
    var codeInput = document.getElementById('cloud-auth-code');
    var status = document.getElementById('cloud-auth-status');
    if (!emailInput || !emailInput.value || !codeInput || !codeInput.value) return;
    if (status) status.textContent = 'Verifying…';
    verifyEmailCode(emailInput.value.trim(), codeInput.value.trim()).then(function (r) {
      if (!status) return;
      if (r && r.error) { status.textContent = r.error.message; return; }
      status.textContent = 'Signed in!';
      setTimeout(function () { window.closeCloudAuthModal && window.closeCloudAuthModal(); }, 700);
    });
  };
  // "Use a different email" — back out of the code step without closing the modal.
  window.cloudResetAuthStep = function () {
    var codeStep = document.getElementById('cloud-auth-code-step');
    var codeInput = document.getElementById('cloud-auth-code');
    var status = document.getElementById('cloud-auth-status');
    var emailInput = document.getElementById('cloud-auth-email');
    if (codeStep) codeStep.hidden = true;
    if (codeInput) codeInput.value = '';
    if (status) status.textContent = '';
    if (emailInput) emailInput.focus();
  };

  window.ClipSATCloud = {
    configured: true,
    signInWithEmail: signInWithEmail,
    signInWithGoogle: signInWithGoogle,
    verifyEmailCode: verifyEmailCode,
    signOut: signOut,
    isSignedIn: function () { return !!_cachedUser; },
    currentEmail: currentEmail,
    currentProvider: currentProvider,
    currentUserId: function () { return _cachedUser ? _cachedUser.id : null; },
    syncNow: pushAll,
    // Exposed so other optional modules (teacher-view.js) share this exact
    // authenticated client instead of each creating their own — avoids
    // duplicate-GoTrueClient warnings and keeps auth state in one place.
    getClient: function () { return sb; },
    // See the declaration above — resolves once the initial session check
    // has settled, whether signed in or not.
    ready: _readyPromise
  };

  loadSDK(init);
})();
