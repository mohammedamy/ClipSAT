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
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    s.onload = cb;
    s.onerror = function () { log('failed to load Supabase SDK from CDN — staying local-only'); };
    document.head.appendChild(s);
  }

  function init() {
    sb = window.supabase.createClient(CFG.url, CFG.anonKey);

    sb.auth.getSession().then(function (r) {
      if (r.data && r.data.session) onSignedIn();
      else renderAuthUI();
      _readyResolve();
    });

    sb.auth.onAuthStateChange(function (event, session) {
      if (event === 'SIGNED_IN' && session) { onSignedIn(); maybeStoreGoogleRefreshToken(session); }
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
  // popup, since Supabase's own OAuth helper is redirect-based. Requests
  // the Forms/Drive scopes RIGHT HERE at sign-in time (not incrementally,
  // unlike google-integration.js's own standalone flow) specifically so
  // this one sign-in also covers Google Forms — see
  // maybeStoreGoogleRefreshToken()/google-integration.js for the other
  // half of that. access_type:'offline' + prompt:'consent' are both
  // required to actually get a refresh_token back from Google — omitting
  // either one is a common way to silently NOT get one (Google only issues
  // a refresh token on a forced/first consent, not a routine sign-in).
  var GOOGLE_SCOPES = 'https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/forms.responses.readonly';
  function signInWithGoogle() {
    return sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: GOOGLE_SCOPES,
        queryParams: { access_type: 'offline', prompt: 'consent' },
        redirectTo: window.location.href
      }
    });
  }

  // Captures Google's OAuth refresh token the moment it's handed to us
  // (only present right after a fresh Google sign-in with the params
  // above — Google omits it on routine session refreshes) and stores it
  // via supabase/functions/google-token's backing table, so
  // google-integration.js can get fresh Forms/Drive access tokens later
  // without ever prompting the user again. Fire-and-forget: on failure the
  // user just falls back to the old separate Google-connect popup when
  // they try to use Forms — not fatal to sign-in itself.
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
    if (!btn) return;
    // Built via DOM nodes (not innerHTML/textContent-of-the-whole-button) for two
    // reasons: it avoids ever needing to HTML-escape the user's own email, and it
    // keeps the label in its own <span> so the header's icon-only responsive CSS
    // (#cloudSignInBtn span{display:none} below ~1350px) can hide just the text
    // and leave the ☁️ icon — a plain textContent assignment here would silently
    // wipe that span back out on every auth-state change and undo the CSS rule.
    btn.textContent = '';
    btn.appendChild(document.createTextNode('☁️ '));
    var label = document.createElement('span');
    if (_cachedUser) {
      label.textContent = _cachedUser.email || 'Synced';
      btn.title = 'Signed in — click to sign out';
      btn.setAttribute('aria-label', 'Signed in as ' + (_cachedUser.email || 'a synced account') + ' — click to sign out');
      btn.onclick = function () {
        if (window.confirm('Sign out of cloud sync? Your progress stays on this device.')) signOut();
      };
    } else {
      label.textContent = 'Sign in';
      btn.title = 'Sign in to sync your progress across devices';
      btn.setAttribute('aria-label', 'Sign in to sync your progress across devices');
      btn.onclick = function () { window.openCloudAuthModal(); };
    }
    btn.appendChild(label);
  }

  window.openCloudAuthModal = function () {
    var m = document.getElementById('cloud-auth-modal');
    if (m) m.classList.add('show');
  };
  window.closeCloudAuthModal = function () {
    var m = document.getElementById('cloud-auth-modal');
    if (m) m.classList.remove('show');
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
