/**
 * ClipSAT Cloud Sync  v2.1 — Anti-Tracking Resilient Edition
 * ════════════════════════════════════════════════════════════════════════
 * Adds OPTIONAL cross-device accounts on top of ClipSAT's existing
 * localStorage-only progress system — without touching engine.js.
 *
 * Chrome + AVG AntiTrack / Privacy-Extension Hardening (6 Layers)
 * ─────────────────────────────────────────────────────────────────
 *   1. Self-hosted first-party SDK (/vendor/supabase/supabase.min.js) so
 *      third-party CDN blockers never prevent Supabase client startup, with
 *      guaranteed ClipSATCloud.ready settlement on any load failure.
 *   2. Custom in-memory timed mutex (never touches navigator.locks, which
 *      deadlocks when AVG AntiTrack's Chrome content script hooks page async
 *      APIs) + endpoint-aware AbortController timeouts (90s–120s for ai-proxy,
 *      30s for tts-proxy, 8s for auth/REST) with zero reentrant getUser() calls.
 *   3. Dedicated blob: Web Worker self.fetch + XMLHttpRequest transport chain:
 *      Chrome never injects extension content scripts into Dedicated Workers,
 *      bypassing AVG AntiTrack's main-world window.fetch / ATTray IPC hooks.
 *   4. Synchronous OAuth fragment capture (in cloud-config.js) + zero-XHR
 *      local JWT claim validation & session hydration fallback, plus 0ms
 *      in-memory getActiveSession() fast path for fresh tokens.
 *   5. Direct top-level navigation to /auth/v1/authorize for Google Sign-In
 *      (zero pre-redirect XHR, zero lock wait, no synthetic popup canary).
 *   6. Parallel 5.5s reachability detector on initial long-running AI calls +
 *      automatic same-origin /api/supabase/* failover and anti-tracking UI tips.
 */
(function () {
  'use strict';

  var CFG = window.CLIPSAT_CLOUD_CONFIG;
  if (!CFG || !CFG.url || !CFG.anonKey || CFG.url.indexOf('YOUR-PROJECT') !== -1) {
    window.ClipSATCloud = { configured: false, ready: Promise.resolve() };
    return;
  }

  var WATCHED_KEYS = [
    'clipsat_mistakes_v2', 'clipsat_srs_state', 'clipsat_visited', 'clipsat_accuracy_v1',
    'clipsat_xp', 'clipsat_streak', 'clipsat_exam_date',
    'clipsat_daily_goal', 'clipsat_dg_today', 'clipsat_dg_streak', 'clipsat_dg_last'
  ];
  var DELETED_MISTAKES_KEY = 'clipsat_mistakes_deleted_v1';
  var POST_SIGNIN_HASH_KEY = 'clipsat_post_google_signin_hash';

  var DIRECT_URL = String(CFG.url).replace(/\/+$/, '');
  var PROJECT_REF = (function () {
    var m = /^https?:\/\/([a-z0-9-]+)\.supabase\.co$/i.exec(DIRECT_URL);
    return m ? m[1] : 'clipsat';
  })();
  var AUTH_STORAGE_KEY = 'sb-' + PROJECT_REF + '-auth-token';
  var PROXY_BASE_URL = (function () {
    try {
      if (!CFG.proxyPath || typeof window.location === 'undefined' || !/^https?:$/i.test(window.location.protocol)) {
        return '';
      }
      return window.location.origin + String(CFG.proxyPath).replace(/\/+$/, '');
    } catch (e) {
      return '';
    }
  })();

  var sb = null;
  var pushTimer = null;
  var _cachedUser = null;
  var _cachedSession = null;
  var _useFirstPartyProxy = false;
  var _proxyAvailability = null; // null = untested, true = working, false = unavailable (e.g. raw GitHub Pages 404/405)
  var _directReachable = false;
  var _antiTrackDetected = false;
  var _healthNotice = null;
  var _explicitSignOut = false;

  var _readySettled = false;
  var _readyResolve;
  var _readyPromise = new Promise(function (resolve) {
    _readyResolve = function () {
      if (!_readySettled) {
        _readySettled = true;
        resolve();
      }
    };
  });

  function log(msg) {
    if (window.CLIPSAT_CLOUD_DEBUG) {
      try { console.log('[ClipSATCloud]', msg); } catch (e) {}
    }
  }

  function noop() {}

  function safeSetItem(origSet, key, val) {
    try {
      (origSet || localStorage.setItem.bind(localStorage))(key, val);
      return true;
    } catch (e) {
      log('localStorage.setItem failed for ' + key + ': ' + (e && e.message));
      return false;
    }
  }

  function safeParse(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      var v = JSON.parse(raw);
      return v === null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }

  function objectValues(obj) {
    return Object.keys(obj).map(function (k) { return obj[k]; });
  }

  /* ── Layer 2A: Non-navigator.locks In-Memory Timed Mutex ─────────────────
   * Replaces GoTrue's default navigator.locks.request(), which hangs forever
   * in Chrome when AVG AntiTrack or privacy extensions hook page locks/storage
   * or when a reentrant auth listener triggers an inner lock acquisition. */
  var _lockQueues = {};
  function inMemoryTimedLock(name, acquireTimeout, fn) {
    var prev = _lockQueues[name] || Promise.resolve();
    var releaseNext;
    var gate = new Promise(function (resolve) { releaseNext = resolve; });
    _lockQueues[name] = prev.then(function () { return gate; }, function () { return gate; });

    var waitMs = (typeof acquireTimeout === 'number' && acquireTimeout > 0) ? Math.min(acquireTimeout, 5000) : 5000;
    var waitRace = Promise.race([
      prev,
      new Promise(function (resolve) { setTimeout(resolve, waitMs); })
    ]);

    return waitRace.then(function () {
      var safetyTimer = setTimeout(releaseNext, 9500);
      return Promise.resolve().then(fn).then(
        function (res) { clearTimeout(safetyTimer); releaseNext(); return res; },
        function (err) { clearTimeout(safetyTimer); releaseNext(); throw err; }
      );
    });
  }

  /* ── Layer 2B, 3 & 6: Unhooked Worker/XHR Fetch + Endpoint-Aware Timeouts + Proxy Failover ── */
  var DEFAULT_FETCH_TIMEOUT_MS = 8000;
  var AI_PROXY_TIMEOUT_MS = 90000;
  var TTS_PROXY_TIMEOUT_MS = 30000;
  var EDGE_FN_TIMEOUT_MS = 25000;
  var REACHABILITY_PROBE_TIMEOUT_MS = 4500;

  var _fetchWorker = null;
  var _workerDisabled = false;
  var _workerSeq = 0;
  var _workerPending = {};

  var WORKER_SOURCE = [
    'var ctrls = {};',
    'self.onmessage = function(ev) {',
    '  var m = ev.data || {};',
    '  if (m.type === "abort") {',
    '    var c = ctrls[m.id];',
    '    if (c) { delete ctrls[m.id]; try { c.abort(); } catch (e) {} }',
    '    return;',
    '  }',
    '  if (m.type !== "fetch") return;',
    '  var id = m.id;',
    '  var ctrl = typeof AbortController === "function" ? new AbortController() : null;',
    '  if (ctrl) ctrls[id] = ctrl;',
    '  var fo = { method: m.method || "GET", headers: m.headers || {} };',
    '  if (m.mode) fo.mode = m.mode;',
    '  if (m.credentials) fo.credentials = m.credentials;',
    '  if (m.redirect) fo.redirect = m.redirect;',
    '  if (m.body !== undefined && m.body !== null) fo.body = m.body;',
    '  if (ctrl) fo.signal = ctrl.signal;',
    '  self.fetch(m.url, fo).then(function(res) {',
    '    var hdrs = [];',
    '    if (res.headers && typeof res.headers.forEach === "function") {',
    '      res.headers.forEach(function(v, k) { hdrs.push([k, v]); });',
    '    }',
    '    return res.arrayBuffer().then(function(buf) {',
    '      delete ctrls[id];',
    '      self.postMessage({ id: id, ok: true, status: res.status, statusText: res.statusText || "", headers: hdrs, body: buf }, [buf]);',
    '    });',
    '  })["catch"](function(err) {',
    '    delete ctrls[id];',
    '    self.postMessage({ id: id, ok: false, name: (err && err.name) || "TypeError", message: (err && err.message) || "Failed to fetch" });',
    '  });',
    '};'
  ].join('\n');

  function extractUrl(input) {
    if (typeof input === 'string') return input;
    if (input && typeof input.url === 'string') return input.url;
    if (input && typeof input.href === 'string') return input.href;
    return String(input || '');
  }

  function resolveAbsoluteUrl(rawUrl) {
    var s = String(rawUrl || '');
    if (/^https?:\/\//i.test(s)) return s;
    try {
      if (typeof window !== 'undefined' && window.location && window.location.href) {
        return new URL(s, window.location.href).href;
      }
    } catch (e) {}
    return s;
  }

  function resolveTimeoutMs(rawUrl, opts) {
    if (opts && typeof opts.timeoutMs === 'number' && opts.timeoutMs > 0) {
      return opts.timeoutMs;
    }
    var u = String(rawUrl || '');
    if (u.indexOf('/functions/v1/ai-proxy') !== -1) return AI_PROXY_TIMEOUT_MS;
    if (u.indexOf('/functions/v1/tts-proxy') !== -1) return TTS_PROXY_TIMEOUT_MS;
    if (u.indexOf('/functions/v1/') !== -1) return EDGE_FN_TIMEOUT_MS;
    return DEFAULT_FETCH_TIMEOUT_MS;
  }

  function serializeHeaders(hdrs) {
    var out = {};
    if (!hdrs) return out;
    if (typeof hdrs.forEach === 'function' && !Array.isArray(hdrs)) {
      hdrs.forEach(function (v, k) {
        if (v !== undefined) out[String(k)] = String(v);
      });
      return out;
    }
    if (Array.isArray(hdrs)) {
      for (var i = 0; i < hdrs.length; i++) {
        var pair = hdrs[i];
        if (pair && pair.length >= 2 && pair[1] !== undefined) {
          out[String(pair[0])] = String(pair[1]);
        }
      }
      return out;
    }
    if (typeof hdrs === 'object') {
      var keys = Object.keys(hdrs);
      for (var j = 0; j < keys.length; j++) {
        var k = keys[j];
        if (hdrs[k] !== undefined) out[k] = String(hdrs[k]);
      }
    }
    return out;
  }

  function normalizeFetchOptions(input, initOpts) {
    var base = {};
    if (input && typeof input === 'object' && typeof input.url === 'string') {
      if (input.method) base.method = input.method;
      if (input.mode) base.mode = input.mode;
      if (input.credentials) base.credentials = input.credentials;
      if (input.redirect) base.redirect = input.redirect;
      if (input.headers) base.headers = serializeHeaders(input.headers);
    }
    var extra = initOpts || {};
    var mergedHeaders = Object.assign({}, base.headers || {}, serializeHeaders(extra.headers));
    var out = Object.assign(base, extra);
    out.headers = mergedHeaders;
    delete out.timeoutMs;
    if (typeof URLSearchParams === 'function' && out.body instanceof URLSearchParams) {
      out.body = out.body.toString();
      if (!out.headers['Content-Type'] && !out.headers['content-type']) {
        out.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      }
    }
    return out;
  }

  function isCloneableBody(body) {
    if (body === undefined || body === null || typeof body === 'string') return true;
    if (typeof ArrayBuffer === 'function' && (body instanceof ArrayBuffer || ArrayBuffer.isView(body))) return true;
    if (typeof Blob === 'function' && body instanceof Blob) return true;
    return false;
  }

  function isNullBodyStatus(status) {
    return status === 101 || status === 204 || status === 205 || status === 304;
  }

  function buildFetchResponse(status, statusText, headersList, arrayBuf) {
    var safeStatus = status || 200;
    var bodyArg = isNullBodyStatus(safeStatus) ? null : (arrayBuf || new ArrayBuffer(0));
    if (typeof Response === 'function') {
      return new Response(bodyArg, {
        status: safeStatus,
        statusText: statusText || '',
        headers: headersList || []
      });
    }
    var textVal = '';
    try {
      if (bodyArg && typeof TextDecoder === 'function') {
        textVal = new TextDecoder('utf-8').decode(new Uint8Array(bodyArg));
      }
    } catch (e) {}
    var hdrMap = {};
    (headersList || []).forEach(function (pair) {
      if (pair && pair[0]) hdrMap[String(pair[0]).toLowerCase()] = String(pair[1] || '');
    });
    return {
      ok: safeStatus >= 200 && safeStatus < 300,
      status: safeStatus,
      statusText: statusText || '',
      headers: {
        get: function (k) { return hdrMap[String(k || '').toLowerCase()] || null; },
        forEach: function (fn) { Object.keys(hdrMap).forEach(function (k) { fn(hdrMap[k], k); }); }
      },
      text: function () { return Promise.resolve(textVal); },
      json: function () {
        try { return Promise.resolve(textVal ? JSON.parse(textVal) : {}); }
        catch (err) { return Promise.reject(err); }
      },
      arrayBuffer: function () { return Promise.resolve(bodyArg || new ArrayBuffer(0)); },
      blob: function () {
        return typeof Blob === 'function'
          ? Promise.resolve(new Blob([bodyArg || new ArrayBuffer(0)], { type: hdrMap['content-type'] || '' }))
          : Promise.reject(new Error('Blob unavailable'));
      },
      clone: function () { return buildFetchResponse(safeStatus, statusText, headersList, arrayBuf); }
    };
  }

  function createAbortError() {
    var e = new Error('The operation was aborted.');
    e.name = 'AbortError';
    return e;
  }

  function canUseWorkerFetch(opts) {
    if (_workerDisabled) return false;
    if (typeof window !== 'undefined' && window.__CLIPSAT_DISABLE_WORKER_FETCH__) return false;
    if (typeof Worker !== 'function' || typeof Blob !== 'function' || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
      return false;
    }
    return isCloneableBody(opts && opts.body);
  }

  function getFetchWorker() {
    if (_fetchWorker) return _fetchWorker;
    try {
      var blob = new Blob([WORKER_SOURCE], { type: 'application/javascript' });
      var blobUrl = URL.createObjectURL(blob);
      var w = new Worker(blobUrl);
      setTimeout(function () {
        try { URL.revokeObjectURL(blobUrl); } catch (e) {}
      }, 5000);
      w.onmessage = function (ev) {
        var d = ev && ev.data;
        if (!d || !d.id) return;
        var entry = _workerPending[d.id];
        if (!entry) return;
        delete _workerPending[d.id];
        entry.cleanup();
        if (d.ok) {
          entry.resolve(buildFetchResponse(d.status, d.statusText, d.headers, d.body));
        } else {
          var err = (d.name === 'AbortError') ? createAbortError() : new TypeError(d.message || 'Failed to fetch');
          entry.reject(err);
        }
      };
      w.onerror = function (ev) {
        if (ev && typeof ev.preventDefault === 'function') ev.preventDefault();
        _workerDisabled = true;
        try { w.terminate(); } catch (e) {}
        _fetchWorker = null;
        var ids = Object.keys(_workerPending);
        for (var i = 0; i < ids.length; i++) {
          var pending = _workerPending[ids[i]];
          delete _workerPending[ids[i]];
          pending.cleanup();
          var wErr = new Error('Worker fetch unavailable');
          wErr._workerFailed = true;
          pending.reject(wErr);
        }
      };
      _fetchWorker = w;
      return w;
    } catch (e) {
      _workerDisabled = true;
      return null;
    }
  }

  function workerFetch(url, opts, timeoutMs) {
    var ms = timeoutMs || DEFAULT_FETCH_TIMEOUT_MS;
    var extSignal = opts && opts.signal;
    if (extSignal && extSignal.aborted) {
      return Promise.reject(createAbortError());
    }
    var w = getFetchWorker();
    if (!w) {
      var initErr = new Error('Worker fetch unavailable');
      initErr._workerFailed = true;
      return Promise.reject(initErr);
    }

    var id = ++_workerSeq;
    var absUrl = resolveAbsoluteUrl(url);

    return new Promise(function (resolve, reject) {
      var onExtAbort = null;
      var timer = setTimeout(function () {
        if (!_workerPending[id]) return;
        delete _workerPending[id];
        cleanup();
        try { w.postMessage({ type: 'abort', id: id }); } catch (e) {}
        reject(new TypeError('Failed to fetch (request timed out after ' + ms + 'ms)'));
      }, ms);

      function cleanup() {
        clearTimeout(timer);
        if (extSignal && onExtAbort && typeof extSignal.removeEventListener === 'function') {
          try { extSignal.removeEventListener('abort', onExtAbort); } catch (e) {}
        }
      }

      if (extSignal && typeof extSignal.addEventListener === 'function') {
        onExtAbort = function () {
          if (!_workerPending[id]) return;
          delete _workerPending[id];
          cleanup();
          try { w.postMessage({ type: 'abort', id: id }); } catch (e) {}
          reject(createAbortError());
        };
        extSignal.addEventListener('abort', onExtAbort);
      }

      _workerPending[id] = { resolve: resolve, reject: reject, cleanup: cleanup };

      try {
        w.postMessage({
          type: 'fetch',
          id: id,
          url: absUrl,
          method: (opts && opts.method) || 'GET',
          mode: (opts && opts.mode) || 'cors',
          credentials: opts && opts.credentials,
          redirect: opts && opts.redirect,
          headers: (opts && opts.headers) || {},
          body: (opts && opts.body !== undefined) ? opts.body : null
        });
      } catch (postErr) {
        delete _workerPending[id];
        cleanup();
        postErr._workerFailed = true;
        reject(postErr);
      }
    });
  }

  function xhrFetch(url, opts, timeoutMs) {
    var ms = timeoutMs || DEFAULT_FETCH_TIMEOUT_MS;
    var extSignal = opts && opts.signal;
    if (extSignal && extSignal.aborted) {
      return Promise.reject(createAbortError());
    }
    if (typeof XMLHttpRequest !== 'function') {
      var noXhr = new Error('XMLHttpRequest unavailable');
      noXhr._xhrUnavailable = true;
      return Promise.reject(noXhr);
    }

    return new Promise(function (resolve, reject) {
      var settled = false;
      var xhr = new XMLHttpRequest();
      var onExtAbort = null;

      function finish(fn, arg) {
        if (settled) return;
        settled = true;
        if (extSignal && onExtAbort && typeof extSignal.removeEventListener === 'function') {
          try { extSignal.removeEventListener('abort', onExtAbort); } catch (e) {}
        }
        fn(arg);
      }

      try {
        xhr.open((opts && opts.method) || 'GET', resolveAbsoluteUrl(url), true);
        xhr.responseType = 'arraybuffer';
        xhr.timeout = ms;
        if (opts && opts.credentials === 'include') xhr.withCredentials = true;

        var hdrs = (opts && opts.headers) || {};
        var hKeys = Object.keys(hdrs);
        for (var i = 0; i < hKeys.length; i++) {
          var hk = hKeys[i];
          var low = hk.toLowerCase();
          if (low === 'host' || low === 'origin' || low === 'content-length') continue;
          try { xhr.setRequestHeader(hk, hdrs[hk]); } catch (e) {}
        }

        if (extSignal && typeof extSignal.addEventListener === 'function') {
          onExtAbort = function () {
            try { xhr.abort(); } catch (e) {}
            finish(reject, createAbortError());
          };
          extSignal.addEventListener('abort', onExtAbort);
        }

        xhr.onload = function () {
          var rawHdrs = xhr.getAllResponseHeaders() || '';
          var parsedHdrs = [];
          rawHdrs.trim().split(/[\r\n]+/).forEach(function (line) {
            var idx = line.indexOf(':');
            if (idx > 0) {
              parsedHdrs.push([line.slice(0, idx).trim(), line.slice(idx + 1).trim()]);
            }
          });
          finish(resolve, buildFetchResponse(xhr.status, xhr.statusText, parsedHdrs, xhr.response));
        };
        xhr.onerror = function () {
          finish(reject, new TypeError('Failed to fetch'));
        };
        xhr.ontimeout = function () {
          finish(reject, new TypeError('Failed to fetch (request timed out after ' + ms + 'ms)'));
        };
        xhr.onabort = function () {
          finish(reject, createAbortError());
        };
        xhr.send((opts && opts.body !== undefined) ? opts.body : null);
      } catch (syncErr) {
        finish(reject, syncErr);
      }
    });
  }

  function nativeFetchWithTimeout(url, options, timeoutMs) {
    var ms = timeoutMs || DEFAULT_FETCH_TIMEOUT_MS;
    var opts = Object.assign({}, options || {});
    delete opts.timeoutMs;
    var ctrl = (!opts.signal && typeof AbortController === 'function') ? new AbortController() : null;
    if (ctrl) opts.signal = ctrl.signal;

    return new Promise(function (resolve, reject) {
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        if (ctrl) { try { ctrl.abort(); } catch (e) {} }
        reject(new TypeError('Failed to fetch (request timed out after ' + ms + 'ms)'));
      }, ms);

      try {
        fetch(url, opts).then(
          function (res) {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            resolve(res);
          },
          function (err) {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            reject(err);
          }
        );
      } catch (syncErr) {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(syncErr);
        }
      }
    });
  }

  function transportFetch(url, opts, timeoutMs) {
    if (canUseWorkerFetch(opts)) {
      var startedAt = Date.now();
      return workerFetch(url, opts, timeoutMs)['catch'](function (err) {
        if (err && err.name === 'AbortError') throw err;
        // Immediate fallback if Worker couldn't boot or failed rapidly (< 3s) while XHR is available
        if (err && (err._workerFailed || (Date.now() - startedAt < 3000))) {
          if (typeof XMLHttpRequest === 'function' && isCloneableBody(opts && opts.body)) {
            return xhrFetch(url, opts, timeoutMs)['catch'](function () {
              return nativeFetchWithTimeout(url, opts, timeoutMs);
            });
          }
          return nativeFetchWithTimeout(url, opts, timeoutMs);
        }
        throw err;
      });
    }
    if (typeof XMLHttpRequest === 'function' && isCloneableBody(opts && opts.body) && !(typeof window !== 'undefined' && window.__CLIPSAT_DISABLE_XHR_FETCH__)) {
      return xhrFetch(url, opts, timeoutMs)['catch'](function (xhrErr) {
        if (xhrErr && xhrErr.name === 'AbortError') throw xhrErr;
        return nativeFetchWithTimeout(url, opts, timeoutMs);
      });
    }
    return nativeFetchWithTimeout(url, opts, timeoutMs);
  }

  function rewriteToProxy(targetUrl) {
    if (!PROXY_BASE_URL) return null;
    var s = String(targetUrl || '');
    if (s.indexOf(DIRECT_URL) === 0) {
      return PROXY_BASE_URL + s.slice(DIRECT_URL.length);
    }
    return null;
  }

  function probeDirectReachability() {
    if (_directReachable) return Promise.resolve(true);
    return transportFetch(
      DIRECT_URL + '/auth/v1/settings',
      { method: 'GET', mode: 'cors', headers: { apikey: CFG.anonKey } },
      REACHABILITY_PROBE_TIMEOUT_MS
    ).then(function () {
      _directReachable = true;
      _antiTrackDetected = false;
      return true;
    })['catch'](function () {
      return false;
    });
  }

  function fetchDirectWithStallGuard(rawUrl, normOpts, timeoutMs) {
    var canProbe = (typeof Worker === 'function' || typeof XMLHttpRequest === 'function');
    if (_directReachable || timeoutMs <= 12000 || !canProbe) {
      return transportFetch(rawUrl, normOpts, timeoutMs).then(function (res) {
        _directReachable = true;
        _antiTrackDetected = false;
        return res;
      });
    }

    // For long-running AI calls (> 12s) when direct reachability hasn't been confirmed yet:
    // keep the full 90s–120s budget if *.supabase.co responds to a lightweight 4.5s health
    // ping, OR fail fast (~6s) if AVG AntiTrack's socket filter is stalling all traffic.
    var localAbort = (typeof AbortController === 'function' && !normOpts.signal) ? new AbortController() : null;
    var guardedOpts = localAbort ? Object.assign({}, normOpts, { signal: localAbort.signal }) : normOpts;

    return new Promise(function (resolve, reject) {
      var done = false;
      var probeDelay = setTimeout(function () {
        if (done || _directReachable) return;
        probeDirectReachability().then(function (reachable) {
          if (done || reachable) return;
          done = true;
          if (localAbort) { try { localAbort.abort(); } catch (e) {} }
          reject(new TypeError('Failed to fetch (blocked by browser anti-tracking extension)'));
        });
      }, 1500);

      transportFetch(rawUrl, guardedOpts, timeoutMs).then(
        function (res) {
          if (done) return;
          done = true;
          clearTimeout(probeDelay);
          _directReachable = true;
          _antiTrackDetected = false;
          resolve(res);
        },
        function (err) {
          if (done) return;
          done = true;
          clearTimeout(probeDelay);
          reject(err);
        }
      );
    });
  }

  function resilientSupabaseFetch(input, initOpts) {
    var rawUrl = extractUrl(input);
    var timeoutMs = resolveTimeoutMs(rawUrl, initOpts);
    var normOpts = normalizeFetchOptions(input, initOpts);
    var proxiedUrl = rewriteToProxy(rawUrl);

    if (_useFirstPartyProxy && proxiedUrl) {
      return transportFetch(proxiedUrl, normOpts, timeoutMs);
    }

    var primaryPromise = (rawUrl.indexOf(DIRECT_URL) === 0)
      ? fetchDirectWithStallGuard(rawUrl, normOpts, timeoutMs)
      : transportFetch(rawUrl, normOpts, timeoutMs);

    return primaryPromise['catch'](function (err) {
      if (rawUrl.indexOf(DIRECT_URL) === 0 && (!err || err.name !== 'AbortError')) {
        _antiTrackDetected = true;
        log('Direct request to *.supabase.co blocked/timed out (' + (err && err.message) + ')');
        if (proxiedUrl && _proxyAvailability !== false) {
          var proxyTimeout = (_proxyAvailability === true) ? timeoutMs : Math.min(timeoutMs, 6500);
          return transportFetch(proxiedUrl, normOpts, proxyTimeout).then(function (proxyRes) {
            if (proxyRes.status === 404 || proxyRes.status === 405) {
              _proxyAvailability = false;
              throw err;
            }
            _proxyAvailability = true;
            _useFirstPartyProxy = true;
            _antiTrackDetected = false;
            log('Switched seamlessly to first-party /api/supabase proxy');
            return proxyRes;
          })['catch'](function () {
            throw err;
          });
        }
      }
      throw err;
    });
  }

  /* ── Layer 3: Local JWT Validation & Zero-XHR OAuth Hydration ──────────── */
  function decodeJwtPayload(jwt) {
    try {
      var parts = String(jwt || '').split('.');
      if (parts.length !== 3) return null;
      var b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4 !== 0) b64 += '=';
      var bin = atob(b64);
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      var jsonStr = (typeof TextDecoder === 'function')
        ? new TextDecoder('utf-8').decode(bytes)
        : decodeURIComponent(escape(bin));
      return JSON.parse(jsonStr);
    } catch (e) {
      return null;
    }
  }

  function isValidUuid(s) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(s || ''));
  }

  function buildSessionFromOAuthTokens(oauth) {
    if (!oauth || !oauth.access_token || !oauth.refresh_token) return null;
    var claims = decodeJwtPayload(oauth.access_token);
    if (!claims || !isValidUuid(claims.sub)) return null;

    var nowSec = Math.floor(Date.now() / 1000);
    if (claims.exp && claims.exp <= nowSec) return null;
    if (claims.iss && String(claims.iss).indexOf(DIRECT_URL + '/auth/v1') !== 0) return null;
    if (claims.aud && claims.aud !== 'authenticated') return null;

    var expSec = claims.exp || (nowSec + (oauth.expires_in || 3600));
    var appMeta = (claims.app_metadata && typeof claims.app_metadata === 'object')
      ? claims.app_metadata
      : { provider: 'google', providers: ['google'] };
    var userMeta = (claims.user_metadata && typeof claims.user_metadata === 'object')
      ? claims.user_metadata
      : {};
    var providerName = appMeta.provider || 'google';
    var email = claims.email || userMeta.email || '';

    var user = {
      id: claims.sub,
      aud: claims.aud || 'authenticated',
      role: claims.role || 'authenticated',
      email: email,
      email_confirmed_at: new Date().toISOString(),
      phone: claims.phone || '',
      app_metadata: appMeta,
      user_metadata: userMeta,
      identities: [{ provider: providerName, id: claims.sub, user_id: claims.sub }]
    };

    var session = {
      access_token: oauth.access_token,
      refresh_token: oauth.refresh_token,
      token_type: oauth.token_type || 'bearer',
      expires_in: Math.max(60, expSec - nowSec),
      expires_at: expSec,
      user: user
    };
    if (oauth.provider_token) session.provider_token = oauth.provider_token;
    if (oauth.provider_refresh_token) session.provider_refresh_token = oauth.provider_refresh_token;
    return session;
  }

  function persistLocalSession(session) {
    if (!session || !session.access_token || !session.user) return;
    _cachedSession = session;
    _cachedUser = session.user;
    safeSetItem(null, AUTH_STORAGE_KEY, JSON.stringify(session));
  }

  function readPersistedSessionFallback() {
    try {
      var raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      // Unparseable JSON falls into catch below; valid shape check:
      var sess = (parsed && parsed.currentSession) ? parsed.currentSession : parsed;
      if (!sess || typeof sess !== 'object' || !sess.access_token || !sess.user || !isValidUuid(sess.user.id)) {
        // Truly malformed legacy entry — remove only this broken key
        localStorage.removeItem(AUTH_STORAGE_KEY);
        _healthNotice = 'corrupted';
        return null;
      }
      var claims = decodeJwtPayload(sess.access_token);
      var nowSec = Math.floor(Date.now() / 1000);
      var exp = (claims && claims.exp) || sess.expires_at || 0;
      // Keep session if token is still valid (with 30s clock-skew grace)
      if (exp > 0 && exp + 30 < nowSec) {
        return null; // Expired token; requires online refresh
      }
      return sess;
    } catch (e) {
      // Corrupted JSON in AUTH_STORAGE_KEY — clean up so SDK doesn't crash
      try { localStorage.removeItem(AUTH_STORAGE_KEY); } catch (_) {}
      _healthNotice = 'corrupted';
      return null;
    }
  }

  /* ── Layer 1: Self-Hosted First-Party SDK Loader with Zero-SDK Fallback ──── */
  function loadSDK(cb) {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      cb();
      return;
    }
    var localScript = document.createElement('script');
    localScript.src = '/vendor/supabase/supabase.min.js';
    localScript.onload = function () {
      if (window.supabase && typeof window.supabase.createClient === 'function') {
        cb();
      } else {
        activateZeroSdkFallback();
      }
    };
    localScript.onerror = function () {
      activateZeroSdkFallback();
    };
    document.head.appendChild(localScript);
  }

  function activateZeroSdkFallback() {
    log('failed to load Supabase SDK — activating zero-SDK local OAuth fallback');
    var captured = (typeof window.__CLIPSAT_CONSUME_OAUTH_HASH__ === 'function')
      ? window.__CLIPSAT_CONSUME_OAUTH_HASH__()
      : null;
    var localSess = (captured && buildSessionFromOAuthTokens(captured)) || readPersistedSessionFallback();
    if (localSess) {
      persistLocalSession(localSess);
      restorePostSignInHash();
    }
    renderAuthUI();
    _readyResolve();
  }

  function hydrateSignedInSession(session, isFreshOAuth) {
    if (!session || !session.user) return;
    _cachedSession = session;
    _cachedUser = session.user;
    renderAuthUI();
    if (isFreshOAuth) {
      maybeStoreGoogleRefreshToken(session);
      restorePostSignInHash();
    }
    // Defer pullAndMerge to a clean macrotask — NEVER run Supabase queries synchronously
    // inside onAuthStateChange or lock callbacks (prevents GoTrue v2 lock reentrancy).
    setTimeout(pullAndMerge, 0);
  }

  function init() {
    var capturedOAuth = (typeof window.__CLIPSAT_CONSUME_OAUTH_HASH__ === 'function')
      ? window.__CLIPSAT_CONSUME_OAUTH_HASH__()
      : null;

    // Validate any existing persisted storage before creating the client so
    // malformed pre-v2 JSON never causes supabase-js to throw on startup.
    var persistedBeforeInit = readPersistedSessionFallback();

    sb = window.supabase.createClient(DIRECT_URL, CFG.anonKey, {
      auth: {
        storageKey: AUTH_STORAGE_KEY,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false, // Handled deterministically below so AVG AntiTrack cannot drop tokens!
        lock: inMemoryTimedLock
      },
      realtime: {
        // Guard against privacy suites / hardened WebViews that strip window.WebSocket:
        // @supabase/realtime-js@2.112+ throws synchronously in createClient() if transport is missing.
        transport: (typeof WebSocket === 'function')
          ? WebSocket
          : function NoopWebSocket() { this.readyState = 3; this.close = function () {}; }
      },
      global: {
        fetch: resilientSupabaseFetch
      }
    });

    sb.auth.onAuthStateChange(function (event, session) {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session && session.user) {
        _cachedSession = session;
        _cachedUser = session.user;
        renderAuthUI();
        if (event === 'SIGNED_IN') {
          setTimeout(function () {
            maybeStoreGoogleRefreshToken(session);
            restorePostSignInHash();
            pullAndMerge();
          }, 0);
        }
      } else if (event === 'SIGNED_OUT') {
        if (!_explicitSignOut && _cachedSession && _cachedUser) {
          var chkClaims = decodeJwtPayload(_cachedSession.access_token);
          var chkNow = Math.floor(Date.now() / 1000);
          if (!chkClaims || !chkClaims.exp || chkClaims.exp + 30 > chkNow) {
            // Spurious internal GoTrue SIGNED_OUT caused by a blocked refresh XHR —
            // keep the verified local session alive!
            persistLocalSession(_cachedSession);
            return;
          }
        }
        _cachedSession = null;
        _cachedUser = null;
        log('signed out — local progress untouched');
        renderAuthUI();
      }
    });

    watchLocalStorage();
    renderAuthUI();

    // Case A: Returning from Google OAuth redirect with #access_token=...
    if (capturedOAuth && capturedOAuth.access_token) {
      var localHydrated = buildSessionFromOAuthTokens(capturedOAuth);
      if (localHydrated) {
        // Hydrate at 0ms so Google Sign-In succeeds instantaneously even when
        // AVG AntiTrack hangs or drops *.supabase.co background XHRs!
        persistLocalSession(localHydrated);
        hydrateSignedInSession(localHydrated, true);
        _readyResolve();
      }
      Promise.race([
        sb.auth.setSession({
          access_token: capturedOAuth.access_token,
          refresh_token: capturedOAuth.refresh_token
        }),
        new Promise(function (resolve) {
          setTimeout(function () { resolve({ data: { session: null }, error: new Error('SET_SESSION_TIMEOUT') }); }, 4500);
        })
      ]).then(function (res) {
        if (res && res.data && res.data.session && res.data.session.user) {
          persistLocalSession(res.data.session);
          hydrateSignedInSession(res.data.session, !localHydrated);
        } else if (!localHydrated) {
          _healthNotice = 'error';
          renderAuthUI();
        }
        _readyResolve();
      })['catch'](function () {
        if (!localHydrated) {
          _healthNotice = 'error';
          renderAuthUI();
        }
        _readyResolve();
      });
      return;
    }

    if (capturedOAuth && (capturedOAuth.error || capturedOAuth.error_description)) {
      log('OAuth callback returned error: ' + (capturedOAuth.error_description || capturedOAuth.error));
      _healthNotice = 'error';
    }

    // Case B: Normal page load — hydrate valid persisted session at 0ms, then refresh in background
    if (persistedBeforeInit && persistedBeforeInit.user) {
      hydrateSignedInSession(persistedBeforeInit, false);
    }
    Promise.race([
      sb.auth.getSession(),
      new Promise(function (resolve) {
        setTimeout(function () { resolve({ _timedOut: true, data: { session: null } }); }, 5000);
      })
    ]).then(function (r) {
      var liveSession = r && r.data && r.data.session;
      if (liveSession && liveSession.user) {
        hydrateSignedInSession(liveSession, false);
      } else if (persistedBeforeInit && persistedBeforeInit.user) {
        // Network refresh was blocked by AVG AntiTrack, but stored JWT is still valid!
        // Keep the user signed in rather than wiping their session.
        log('Preserved valid persisted session while network refresh was blocked');
        hydrateSignedInSession(persistedBeforeInit, false);
      } else {
        if (r && r._timedOut) {
          _antiTrackDetected = true;
          _healthNotice = 'stalled';
        }
        renderAuthUI();
      }
      _readyResolve();
    })['catch'](function () {
      if (persistedBeforeInit && persistedBeforeInit.user) {
        hydrateSignedInSession(persistedBeforeInit, false);
      } else {
        renderAuthUI();
      }
      _readyResolve();
    });
  }

  /* ── Sign-in Flows ─────────────────────────────────────────────────────── */
  function signInWithEmail(email) {
    if (!sb) return Promise.reject(new Error('Auth SDK unavailable'));
    return sb.auth.signInWithOtp({ email: email });
  }

  function verifyEmailCode(email, token) {
    if (!sb) return Promise.reject(new Error('Auth SDK unavailable'));
    return sb.auth.verifyOtp({ email: email, token: token, type: 'email' });
  }

  /* ── Layer 4: Direct Top-Level Google OAuth Navigation ───────────────────
   * Navigates straight to Supabase GoTrue's /auth/v1/authorize endpoint on
   * the top-level window without acquiring any SDK lock, making any background
   * XHR, or opening any synthetic popup canary. AVG AntiTrack never blocks
   * user-initiated top-level OAuth navigations, and Layer 3 hydrates the
   * returned #access_token fragment on return even if XHRs remain blocked. */
  function signInWithGoogle() {
    try { sessionStorage.setItem(POST_SIGNIN_HASH_KEY, window.location.hash || ''); } catch (e) {}
    var redirectTo = window.location.href.split('#')[0];
    var authBase = (_useFirstPartyProxy && PROXY_BASE_URL) ? PROXY_BASE_URL : DIRECT_URL;
    var authorizeUrl = authBase + '/auth/v1/authorize'
      + '?provider=google'
      + '&scopes=' + encodeURIComponent('email profile')
      + '&redirect_to=' + encodeURIComponent(redirectTo);

    window.location.assign(authorizeUrl);
    return Promise.resolve({ data: { provider: 'google', url: authorizeUrl }, error: null });
  }

  function restorePostSignInHash() {
    var saved;
    try {
      saved = sessionStorage.getItem(POST_SIGNIN_HASH_KEY);
      sessionStorage.removeItem(POST_SIGNIN_HASH_KEY);
    } catch (e) { saved = null; }
    if (!saved || saved.indexOf('access_token=') !== -1) return;
    try { history.replaceState(null, '', window.location.pathname + window.location.search + saved); }
    catch (e) { window.location.hash = saved; }
  }

  function maybeStoreGoogleRefreshToken(session) {
    if (!sb || !session || !session.provider_refresh_token || !session.user) return;
    sb.rpc('upsert_google_refresh_token', {
      p_refresh_token: session.provider_refresh_token
    }).then(function (r) {
      log(r && r.error ? ('failed to store Vault Google refresh token: ' + r.error.message) : 'Google refresh token stored in Vault');
    }, noop);
  }

  function signOut() {
    _explicitSignOut = true;
    _cachedSession = null;
    _cachedUser = null;
    try { localStorage.removeItem(AUTH_STORAGE_KEY); } catch (e) {}
    renderAuthUI();
    if (!sb) {
      _explicitSignOut = false;
      return Promise.resolve({ error: null });
    }
    return sb.auth.signOut().then(
      function (r) { _explicitSignOut = false; return r; },
      function () { _explicitSignOut = false; return { error: null }; }
    );
  }

  function deleteMyAccount() {
    if (!sb || !_cachedUser) return Promise.reject(new Error('NOT_SIGNED_IN'));
    return sb.rpc('delete_my_account').then(function (res) {
      if (res && res.error) throw new Error(res.error.message);
      return signOut();
    });
  }

  function currentEmail() { return _cachedUser ? _cachedUser.email : null; }

  function currentProvider() {
    if (!_cachedUser) return null;
    var identities = _cachedUser.identities || [];
    var hasGoogle = identities.some(function (i) { return i.provider === 'google'; });
    return hasGoogle ? 'google' : (_cachedUser.app_metadata && _cachedUser.app_metadata.provider) || 'email';
  }

  function getActiveSession() {
    if (_cachedSession && _cachedSession.access_token && _cachedUser) {
      var claims = decodeJwtPayload(_cachedSession.access_token);
      var nowSec = Math.floor(Date.now() / 1000);
      var exp = (claims && claims.exp) || _cachedSession.expires_at || 0;
      if (exp > nowSec + 90) {
        return Promise.resolve({ data: { session: _cachedSession }, error: null });
      }
    }
    if (sb) {
      return Promise.race([
        sb.auth.getSession(),
        new Promise(function (resolve) { setTimeout(function () { resolve(null); }, 2500); })
      ]).then(function (r) {
        if (r && r.data && r.data.session && r.data.session.access_token) {
          _cachedSession = r.data.session;
          if (r.data.session.user) _cachedUser = r.data.session.user;
          return { data: { session: r.data.session }, error: null };
        }
        var fallback = _cachedSession || readPersistedSessionFallback();
        return { data: { session: fallback || null }, error: null };
      })['catch'](function () {
        var fallback = _cachedSession || readPersistedSessionFallback();
        return { data: { session: fallback || null }, error: null };
      });
    }
    var local = _cachedSession || readPersistedSessionFallback();
    return Promise.resolve({ data: { session: local || null }, error: null });
  }

  function getFunctionUrl(fnName) {
    var clean = String(fnName || '').replace(/^\/+/, '');
    if (_useFirstPartyProxy && PROXY_BASE_URL) {
      return PROXY_BASE_URL + '/functions/v1/' + clean;
    }
    return DIRECT_URL + '/functions/v1/' + clean;
  }

  /* ── Pull Cloud Data & Merge into localStorage (Tombstone-Aware) ───────── */
  function pullAndMerge() {
    var uid = _cachedUser && _cachedUser.id;
    if (!uid || !sb) return;

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
    if (typeof row.xp === 'number' && row.xp > localXp) safeSetItem(null, 'clipsat_xp', String(row.xp));

    var localStreak = parseInt(localStorage.getItem('clipsat_streak') || '0', 10);
    if (typeof row.streak === 'number' && row.streak > localStreak) safeSetItem(null, 'clipsat_streak', String(row.streak));

    if (row.exam_date && !localStorage.getItem('clipsat_exam_date')) {
      safeSetItem(null, 'clipsat_exam_date', row.exam_date);
    }
    if (row.daily_goal) safeSetItem(null, 'clipsat_daily_goal', String(row.daily_goal));

    var localDgStreak = parseInt(localStorage.getItem('clipsat_dg_streak') || '0', 10);
    if (typeof row.dg_streak === 'number' && row.dg_streak > localDgStreak) {
      safeSetItem(null, 'clipsat_dg_streak', String(row.dg_streak));
    }
  }

  function mergeMistakes(rows) {
    if (!rows.length) return;
    var deletedMap = safeParse(DELETED_MISTAKES_KEY, {});
    var local = safeParse('clipsat_mistakes_v2', []);
    var byId = {};
    local.forEach(function (m) { if (m && m.id) byId[m.id] = m; });
    rows.forEach(function (r) {
      if (!r || !r.id || r.deleted_at) return;
      var deletedAt = deletedMap[r.id] || 0;
      if (deletedAt && deletedAt >= (r.ts || 0)) return; // Respect local deletion tombstone!
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
    safeSetItem(null, 'clipsat_mistakes_v2', JSON.stringify(objectValues(byId)));
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
    safeSetItem(null, 'clipsat_srs_state', JSON.stringify(local));
  }

  function mergeVisits(rows) {
    if (!rows.length) return;
    var local = safeParse('clipsat_visited', {});
    rows.forEach(function (r) { local[r.track] = Math.max(local[r.track] || 0, r.count || 0); });
    safeSetItem(null, 'clipsat_visited', JSON.stringify(local));
  }

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
    safeSetItem(null, 'clipsat_accuracy_v1', JSON.stringify(local));
  }

  /* ── Watch localStorage & Record Mistake Tombstones ────────────────────── */
  function watchLocalStorage() {
    var origSetItem = localStorage.setItem.bind(localStorage);
    var origRemoveItem = localStorage.removeItem.bind(localStorage);

    function recordMistakeRemovals(prevArr, nextArr) {
      if (!Array.isArray(prevArr) || !prevArr.length) return;
      var nextIds = {};
      (nextArr || []).forEach(function (m) { if (m && m.id) nextIds[m.id] = true; });
      var deletedMap = safeParse(DELETED_MISTAKES_KEY, {});
      var nowMs = Date.now();
      var changed = false;
      prevArr.forEach(function (m) {
        if (m && m.id && !nextIds[m.id]) {
          deletedMap[m.id] = nowMs;
          changed = true;
        }
      });
      if (changed) safeSetItem(origSetItem, DELETED_MISTAKES_KEY, JSON.stringify(deletedMap));
    }

    localStorage.setItem = function (key, value) {
      if (key === 'clipsat_mistakes_v2') {
        var prevMistakes = safeParse('clipsat_mistakes_v2', []);
        var nextMistakes = [];
        try { nextMistakes = JSON.parse(value || '[]') || []; } catch (e) {}
        recordMistakeRemovals(prevMistakes, nextMistakes);
      }
      origSetItem(key, value);
      if (WATCHED_KEYS.indexOf(key) !== -1) schedulePush();
    };

    localStorage.removeItem = function (key) {
      if (key === 'clipsat_mistakes_v2') {
        var prevMistakes = safeParse('clipsat_mistakes_v2', []);
        recordMistakeRemovals(prevMistakes, []);
      }
      origRemoveItem(key);
      if (WATCHED_KEYS.indexOf(key) !== -1) schedulePush();
    };
  }

  function schedulePush() {
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushAll, 4000);
  }

  function pushAll() {
    var uid = _cachedUser && _cachedUser.id;
    if (!uid || !sb) return;

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

    // Propagate local mistake deletions/clears to Supabase so cleared items never resurrect
    var deletedMap = safeParse(DELETED_MISTAKES_KEY, {});
    var currentIds = {};
    mistakes.forEach(function (m) { if (m && m.id) currentIds[m.id] = true; });
    var idsToDelete = Object.keys(deletedMap).filter(function (id) { return !currentIds[id]; });
    if (idsToDelete.length) {
      sb.from('mistakes').delete().eq('user_id', uid)['in']('id', idsToDelete.slice(0, 200))
        .then(function (res) {
          if (!res || !res.error) {
            // Prune tombstones older than 30 days once synced
            var cutoff = Date.now() - 30 * 86400000;
            var nextDeleted = {};
            Object.keys(deletedMap).forEach(function (id) {
              if (deletedMap[id] > cutoff && !currentIds[id]) nextDeleted[id] = deletedMap[id];
            });
            safeSetItem(null, DELETED_MISTAKES_KEY, JSON.stringify(nextDeleted));
          }
        }, function (e) { log('mistakes delete sync failed: ' + (e && e.message)); });
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

  /* ── Auth UI Hook ──────────────────────────────────────────────────────── */
  function renderAuthUI() {
    var btn = document.getElementById('cloudSignInBtn');
    var mobileBtn = document.getElementById('cloudSignInBtnMobile');
    if (!btn && !mobileBtn) return;
    if (btn) {
      btn.textContent = '';
      btn.appendChild(document.createTextNode('☁️ '));
      var label = document.createElement('span');
      label.textContent = _cachedUser ? (_cachedUser.email || 'Synced') : 'Sign in';
      btn.appendChild(label);
    }
    if (_cachedUser) {
      var signedInTitle = 'Signed in — click to manage cloud sync & account';
      var signedInLabel = 'Signed in as ' + (_cachedUser.email || 'a synced account') + ' — click to manage account';
      var openAccount = function () { window.openCloudAuthModal(); };
      if (btn) { btn.title = signedInTitle; btn.setAttribute('aria-label', signedInLabel); btn.onclick = openAccount; }
      if (mobileBtn) {
        mobileBtn.classList.add('signed-in');
        mobileBtn.title = signedInTitle;
        mobileBtn.setAttribute('aria-label', signedInLabel);
        mobileBtn.onclick = openAccount;
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
    syncModalAccountView();
  }

  function syncModalAccountView() {
    var signInView = document.getElementById('cloud-auth-signin-view');
    var accountView = document.getElementById('cloud-auth-account-view');
    var emailSpan = document.getElementById('cloud-auth-account-email');
    var titleEl = document.getElementById('cloud-auth-modal-title');
    if (signInView) signInView.hidden = !!_cachedUser;
    if (accountView) accountView.hidden = !_cachedUser;
    if (emailSpan && _cachedUser) emailSpan.textContent = _cachedUser.email || 'Signed-in student';
    if (titleEl) titleEl.textContent = _cachedUser ? '☁️ Cloud Account & Privacy' : '☁️ Sync Your Progress';
  }

  /* ── Browser Health Check (No Synthetic Popup Canary on Google Sign-In) ── */
  function checkStorage() {
    try {
      var k = '__clipsat_health_check__';
      localStorage.setItem(k, '1');
      var ok = localStorage.getItem(k) === '1';
      localStorage.removeItem(k);
      return ok;
    } catch (e) { return false; }
  }

  function checkBrowserHealth() {
    var issues = [];
    if (!checkStorage()) issues.push('storage');
    if (!navigator.cookieEnabled) issues.push('cookies');
    return issues;
  }

  var HEALTH_MESSAGES = {
    storage: 'This browser is blocking local storage for this site, which sign-in needs to remember your session. Allow site data or pause storage-blocking extensions for clipsat.org.',
    cookies: 'Cookies appear to be disabled in this browser, which can prevent signing in. Enable cookies for clipsat.org and try again.',
    stalled: 'An anti-tracking browser extension (such as AVG AntiTrack, Avast, or Brave Shields) blocked background requests to our auth server. Use "Sign in with Google" below (which works directly even with AVG AntiTrack active), or add clipsat.org to Allowed Websites in AVG AntiTrack for email-code sign-in.',
    corrupted: 'Cleared an old, corrupted sign-in session in this browser. Please sign in again.',
    error: 'Email sign-in could not reach the auth server — AVG AntiTrack or a privacy extension is likely blocking background requests to supabase.co. Click "Sign in with Google" below (works with AVG AntiTrack active), or allow clipsat.org in AVG AntiTrack.'
  };

  function renderHealthWarning(issues) {
    var box = document.getElementById('cloud-auth-health-warning');
    if (!box) return;
    if (!issues || !issues.length) {
      box.hidden = true;
      box.textContent = '';
      return;
    }
    box.textContent = '';
    var showAntiTrackHelper = false;
    issues.forEach(function (code) {
      if (code === 'stalled' || code === 'error') showAntiTrackHelper = true;
      var p = document.createElement('p');
      p.textContent = '⚠️ ' + (HEALTH_MESSAGES[code] || code);
      box.appendChild(p);
    });
    if (showAntiTrackHelper || _antiTrackDetected) {
      var actions = document.createElement('div');
      actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:8px';

      var googleFastBtn = document.createElement('button');
      googleFastBtn.type = 'button';
      googleFastBtn.textContent = '✓ Sign in with Google (works with AVG AntiTrack)';
      googleFastBtn.style.cssText = 'padding:6px 12px;border-radius:6px;border:none;background:#1d4ed8;color:#fff;font-weight:600;font-size:.8rem;cursor:pointer';
      googleFastBtn.onclick = function () { window.cloudSignInGoogle(); };
      actions.appendChild(googleFastBtn);

      var copyDomainBtn = document.createElement('button');
      copyDomainBtn.type = 'button';
      copyDomainBtn.textContent = '📋 Copy clipsat.org for AVG Allowlist';
      copyDomainBtn.style.cssText = 'padding:6px 10px;border-radius:6px;border:1px solid currentColor;background:transparent;color:inherit;font-size:.78rem;cursor:pointer';
      copyDomainBtn.onclick = function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('clipsat.org').then(function () {
            copyDomainBtn.textContent = '✓ Copied clipsat.org';
          })['catch'](noop);
        }
      };
      actions.appendChild(copyDomainBtn);
      box.appendChild(actions);
    }
    box.hidden = false;
  }

  function checkAgeConsentOrWarn() {
    var cb = document.getElementById('cloud-auth-age-consent');
    if (cb && !cb.checked) {
      var status = document.getElementById('cloud-auth-status');
      if (status) status.textContent = 'Please confirm age (13+) or parent/guardian permission above before signing in.';
      cb.focus();
      return false;
    }
    return true;
  }

  window.openCloudAuthModal = function () {
    syncModalAccountView();
    var m = document.getElementById('cloud-auth-modal');
    if (m) m.classList.add('show');
    var status = document.getElementById('cloud-auth-status');
    if (status) status.textContent = '';
    var issues = checkBrowserHealth();
    if (_healthNotice) {
      // Notice 'stalled' on passive background check only matters if user isn't signed in
      if (!_cachedUser) issues.push(_healthNotice);
      _healthNotice = null;
    }
    renderHealthWarning(_cachedUser ? [] : issues);
  };

  window.closeCloudAuthModal = function () {
    var m = document.getElementById('cloud-auth-modal');
    if (m) m.classList.remove('show');
  };

  window.cloudSyncNow = function () {
    var status = document.getElementById('cloud-auth-status');
    if (status) status.textContent = 'Syncing progress…';
    pushAll();
    pullAndMerge().then(function () {
      if (status) status.textContent = '✓ Progress synced across devices.';
    })['catch'](function () {
      if (status) status.textContent = 'Saved locally — cloud sync will retry automatically.';
    });
  };

  window.cloudSignOut = function () {
    var status = document.getElementById('cloud-auth-status');
    signOut().then(function () {
      if (status) status.textContent = 'Signed out — local progress stays on this device.';
      syncModalAccountView();
    });
  };

  window.cloudDeleteMyAccount = function () {
    if (!window.confirm('Permanently delete your ClipSAT cloud account, synced progress, and any stored Google Forms token? Local progress on this browser stays unless you clear site data. This cannot be undone.')) {
      return;
    }
    var status = document.getElementById('cloud-auth-status');
    if (status) status.textContent = 'Deleting cloud account…';
    deleteMyAccount().then(function (r) {
      if (r && r.error) {
        if (status) status.textContent = 'Could not delete account right now: ' + (r.error.message || 'network error');
        return;
      }
      if (status) status.textContent = '✓ Your cloud account and synced data have been permanently deleted.';
      syncModalAccountView();
    });
  };

  window.cloudSignInGoogle = function () {
    if (!checkAgeConsentOrWarn()) return;
    var issues = checkBrowserHealth();
    if (issues.indexOf('storage') !== -1) {
      renderHealthWarning(issues);
      return;
    }
    var status = document.getElementById('cloud-auth-status');
    if (status) status.textContent = 'Redirecting to Google…';
    signInWithGoogle();
  };

  var EMAIL_STEP_STALL_MS = 8000;
  function withStallGuard(promise, status, onOk) {
    var settled = false;
    var stallTimer = setTimeout(function () {
      if (settled) return;
      if (status) status.textContent = '';
      renderHealthWarning(['stalled']);
    }, EMAIL_STEP_STALL_MS);
    promise.then(function (r) {
      settled = true;
      clearTimeout(stallTimer);
      if (r && r.error) {
        if (/fetch|network|abort/i.test(r.error.message || '')) {
          if (status) status.textContent = '';
          renderHealthWarning(['stalled']);
          return;
        }
        if (status) status.textContent = r.error.message;
        return;
      }
      onOk(r);
    }, function (e) {
      settled = true;
      clearTimeout(stallTimer);
      if (status) status.textContent = '';
      renderHealthWarning(['error']);
      log('email sign-in step threw: ' + (e && e.message));
    });
  }

  window.cloudSendCode = function () {
    if (!checkAgeConsentOrWarn()) return;
    var input = document.getElementById('cloud-auth-email');
    var status = document.getElementById('cloud-auth-status');
    if (!input || !input.value) return;
    if (status) status.textContent = 'Sending…';
    withStallGuard(signInWithEmail(input.value.trim()), status, function () {
      status.textContent = 'Check your email for a sign-in code.';
      var codeStep = document.getElementById('cloud-auth-code-step');
      if (codeStep) codeStep.hidden = false;
      var codeInput = document.getElementById('cloud-auth-code');
      if (codeInput) codeInput.focus();
    });
  };

  window.cloudVerifyCode = function () {
    var emailInput = document.getElementById('cloud-auth-email');
    var codeInput = document.getElementById('cloud-auth-code');
    var status = document.getElementById('cloud-auth-status');
    if (!emailInput || !emailInput.value || !codeInput || !codeInput.value) return;
    if (status) status.textContent = 'Verifying…';
    withStallGuard(verifyEmailCode(emailInput.value.trim(), codeInput.value.trim()), status, function (r) {
      if (r && r.data && r.data.session) {
        persistLocalSession(r.data.session);
        hydrateSignedInSession(r.data.session, false);
      }
      status.textContent = 'Signed in!';
      setTimeout(function () { window.closeCloudAuthModal && window.closeCloudAuthModal(); }, 700);
    });
  };

  /* ── Email + password (alongside Google and one-time code) ─────────────── */
  function readPasswordCreds() {
    var e = document.getElementById('cloud-auth-email');
    var p = document.getElementById('cloud-auth-password');
    return { email: e ? e.value.trim() : '', password: p ? p.value : '' };
  }
  function finishPasswordSession(status, session, msg) {
    if (session) {
      persistLocalSession(session);
      hydrateSignedInSession(session, false);
    }
    status.textContent = msg;
    setTimeout(function () { window.closeCloudAuthModal && window.closeCloudAuthModal(); }, 700);
  }
  window.cloudSignInPassword = function () {
    if (!checkAgeConsentOrWarn()) return;
    var c = readPasswordCreds();
    var status = document.getElementById('cloud-auth-status');
    if (!c.email || !c.password) { if (status) status.textContent = 'Enter your email and password.'; return; }
    if (!sb) { renderHealthWarning(['error']); return; }
    if (status) status.textContent = 'Signing in…';
    withStallGuard(sb.auth.signInWithPassword({ email: c.email, password: c.password }), status, function (r) {
      finishPasswordSession(status, r && r.data && r.data.session, 'Signed in!');
    });
  };
  window.cloudSignUpPassword = function () {
    if (!checkAgeConsentOrWarn()) return;
    var c = readPasswordCreds();
    var status = document.getElementById('cloud-auth-status');
    if (!c.email || !c.password) { if (status) status.textContent = 'Enter an email and a password.'; return; }
    if (c.password.length < 8) { if (status) status.textContent = 'Password must be at least 8 characters.'; return; }
    if (!sb) { renderHealthWarning(['error']); return; }
    if (status) status.textContent = 'Creating account…';
    withStallGuard(sb.auth.signUp({
      email: c.email,
      password: c.password,
      options: { emailRedirectTo: window.location.href.split('#')[0] }
    }), status, function (r) {
      if (r && r.data && r.data.session) {
        finishPasswordSession(status, r.data.session, 'Account created — signed in!');
      } else {
        // "Confirm email" is on: no session until the emailed link is clicked.
        status.textContent = 'Check your email to confirm your account, then sign in.';
      }
    });
  };

  /* ── Protected-route guard (CLIENT-SIDE ONLY) ──────────────────────────
   * Static site: this hides UI from signed-out visitors; it does not protect
   * data. Real enforcement is RLS + verify_jwt on the edge functions.
   * Uses the cached session (no extra getUser() call — see the reentrancy
   * note at the top of this file). Resolves to the user, or null after
   * opening the sign-in modal. */
  function requireAuth() {
    return _readyPromise.then(function () {
      if (!_cachedUser && window.openCloudAuthModal) window.openCloudAuthModal();
      return _cachedUser || null;
    });
  }

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
    requireAuth: requireAuth,
    deleteMyAccount: deleteMyAccount,
    isSignedIn: function () { return !!_cachedUser; },
    getUser: function () { return _cachedUser; },
    getSession: getActiveSession,
    getAccessToken: function () { return (_cachedSession && _cachedSession.access_token) || null; },
    getFunctionUrl: getFunctionUrl,
    fetch: resilientSupabaseFetch,
    isAntiTrackDetected: function () { return !!_antiTrackDetected; },
    currentEmail: currentEmail,
    currentProvider: currentProvider,
    currentUserId: function () { return _cachedUser ? _cachedUser.id : null; },
    pullAndMerge: pullAndMerge,
    syncNow: pushAll,
    getClient: function () { return sb; },
    ready: _readyPromise
  };

  loadSDK(init);
})();
