/**
 * ClipSAT Google Integration — auth core  v1.0
 * ════════════════════════════════════════════════════════════════════════
 * Thin wrapper around Google Identity Services' (GIS) OAuth 2.0 token
 * client. ClipSAT is a static site with no backend, so this is the only
 * flow that makes sense: a public "Web application" OAuth Client ID (no
 * client secret, no server-side code exchange) that hands back a short-
 * lived Bearer access token straight in the browser.
 *
 * Token lifecycle — deliberately NOT the same pattern as cloud-sync.js's
 * long-lived session:
 *   - The access token lives ONLY in a module-scope variable, never in
 *     localStorage. Google's own guidance for GIS token clients is that
 *     these tokens are short-lived (~1h) by design; persisting one across
 *     page loads defeats that and just leaves a stale/expired value lying
 *     around in a place a page-load-time JS bug (or an XSS bug elsewhere
 *     on a page that embeds untrusted content) could read.
 *   - A tiny sessionStorage FLAG (not the token) remembers "this tab
 *     already connected once" so a same-tab reload can silently reacquire
 *     a token (prompt:'') instead of forcing a fresh popup. Closing the
 *     tab clears it — reconnecting is one click, acceptable for a
 *     teacher-tool used in one sitting.
 *   - Scopes are requested INCREMENTALLY, not all upfront: each action asks
 *     only for what it specifically needs. ensureScopes() only prompts when
 *     the currently-held token doesn't already cover what's being asked for.
 *
 * Public API — window.ClipSATGoogle
 * ─────────────────────────────────
 *   .configured                 → bool, false until google-config.js is filled in
 *   .isSignedIn()                → bool — do we hold a live access token right now
 *   .ensureScopes(scopes)        → Promise<string> resolves with the access token,
 *                                   reusing a cached token if it already covers
 *                                   `scopes`, otherwise opens the GIS consent popup
 *   .getToken()                  → string | null — current access token, if any
 *   .signOut()                   → revokes the token, clears in-memory + session state
 *   .grantedScopes()             → string[] — scopes the current token actually covers
 */
(function () {
  'use strict';

  var CFG = window.CLIPSAT_GOOGLE_CONFIG;
  if (!CFG || !CFG.clientId || CFG.clientId.indexOf('YOUR-CLIENT-ID') !== -1) {
    // Not configured yet — fail silent. ClipSAT works exactly as before.
    window.ClipSATGoogle = { configured: false };
    return;
  }

  var SESSION_FLAG = 'clipsat_google_connected_session';
  var GIS_SRC = 'https://accounts.google.com/gsi/client';

  var _token = null;          // current access token, in-memory only
  var _tokenScopes = [];      // scopes the current token was granted for
  var _tokenClient = null;    // google.accounts.oauth2 token client, created lazily
  var _gisReady = null;       // Promise, resolves once GIS script has loaded

  function log(msg) { if (window.CLIPSAT_GOOGLE_DEBUG) { try { console.log('[ClipSATGoogle]', msg); } catch (e) {} } }

  function loadGIS() {
    if (_gisReady) return _gisReady;
    _gisReady = new Promise(function (resolve, reject) {
      if (window.google && window.google.accounts && window.google.accounts.oauth2) { resolve(); return; }
      var s = document.createElement('script');
      s.src = GIS_SRC;
      s.async = true;
      s.defer = true;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('Failed to load Google Identity Services — check your connection.')); };
      document.head.appendChild(s);
    });
    return _gisReady;
  }

  function scopesCovered(have, need) {
    return need.every(function (s) { return have.indexOf(s) !== -1; });
  }

  function getTokenClient(scopeStr) {
    // GIS's initTokenClient bakes the scope list in at creation time, so a
    // wider scope request needs a fresh client rather than reusing one
    // created for a narrower set.
    if (_tokenClient && _tokenClient._scopeStr === scopeStr) return _tokenClient;
    var client = window.google.accounts.oauth2.initTokenClient({
      client_id: CFG.clientId,
      scope: scopeStr,
      callback: '' // set per-request below
    });
    client._scopeStr = scopeStr;
    _tokenClient = client;
    return client;
  }

  // scopes: array of full scope URLs. Returns a Promise<string> (the access token).
  // silent: if true, requests with prompt:'' (no popup) — used for same-tab reload
  // reacquire; a failure here should be swallowed by the caller, not surfaced as an error.
  function requestToken(scopes, silent) {
    return loadGIS().then(function () {
      return new Promise(function (resolve, reject) {
        var scopeStr = scopes.join(' ');
        var client = getTokenClient(scopeStr);
        client.callback = function (resp) {
          if (resp && resp.error) {
            reject(new Error(resp.error === 'popup_closed_by_user' || resp.error === 'access_denied'
              ? 'Sign-in was cancelled.'
              : ('Google sign-in failed: ' + resp.error)));
            return;
          }
          _token = resp.access_token;
          _tokenScopes = scopeStr.split(' ');
          try { sessionStorage.setItem(SESSION_FLAG, '1'); } catch (e) {}
          log('token acquired for scopes: ' + scopeStr);
          resolve(_token);
        };
        client.error_callback = function (err) {
          reject(new Error('Google sign-in failed: ' + (err && err.type ? err.type : 'unknown error')));
        };
        client.requestAccessToken(silent ? { prompt: '' } : {});
      });
    });
  }

  window.ClipSATGoogle = {
    configured: true,

    isSignedIn: function () { return !!_token; },

    grantedScopes: function () { return _tokenScopes.slice(); },

    getToken: function () { return _token; },

    ensureScopes: function (scopes) {
      if (_token && scopesCovered(_tokenScopes, scopes)) {
        return Promise.resolve(_token);
      }
      // If broader scopes are needed than what's cached, request the UNION so
      // a later call never shrinks back down from what was already granted
      // earlier in this session.
      var union = scopes.slice();
      _tokenScopes.forEach(function (s) { if (union.indexOf(s) === -1) union.push(s); });
      return requestToken(union, false);
    },

    // Called once at page load by quiz-capture-ui.js to silently restore a
    // connection within the same tab session, without a popup.
    trySilentRestore: function (scopes) {
      var had;
      try { had = sessionStorage.getItem(SESSION_FLAG) === '1'; } catch (e) { had = false; }
      if (!had) return Promise.resolve(null);
      return requestToken(scopes, true).catch(function () { return null; });
    },

    signOut: function () {
      if (_token && window.google && window.google.accounts && window.google.accounts.oauth2) {
        try { window.google.accounts.oauth2.revoke(_token, function () { log('token revoked'); }); } catch (e) {}
      }
      _token = null;
      _tokenScopes = [];
      try { sessionStorage.removeItem(SESSION_FLAG); } catch (e) {}
    }
  };
})();
