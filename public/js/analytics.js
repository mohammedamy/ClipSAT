/**
 * ClipSAT — Privacy-First Cookieless Telemetry & Funnel Analytics  v2.0 (WP-46)
 * ══════════════════════════════════════════════════════════════════════════════
 * Compliant with Saudi Personal Data Protection Law (PDPL), GDPR, and K-12 COPPA:
 *   - Zero cookies, zero device fingerprinting, zero persistent client IDs.
 *   - Zero IP addresses, emails, tokens, query strings, or URL hashes transmitted.
 *   - Aggregate funnel events (`track_start`, `diagnostic_complete`, `mock_exam_complete`,
 *     `tutor_query`, `checkout_start`, `export_download`) + anonymized 3PL `item_calibration`.
 */
(function () {
  'use strict';

  var MAX_QUEUE = 50;
  var MAX_CALIBRATION_PER_SESSION = 60;
  var _eventsQueue = [];
  var _pendingBeaconBatch = [];
  var _calibrationSent = 0;

  var PII_KEY_RE = /(email|user_?id|student_?id|teacher_?id|name|token|jwt|secret|password|ip|phone|auth)/i;
  var EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

  function cleanPath(rawPath) {
    var p = String(rawPath || '/').split('?')[0].split('#')[0];
    return p.slice(0, 120) || '/';
  }

  function scrubProps(rawProps) {
    var out = {};
    if (!rawProps || typeof rawProps !== 'object') return out;
    var keys = Object.keys(rawProps);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (PII_KEY_RE.test(k)) continue;
      var v = rawProps[k];
      if (v === null || v === undefined) continue;
      if (typeof v === 'number' || typeof v === 'boolean') {
        out[k] = v;
      } else if (typeof v === 'string') {
        var cleaned = v.split('?')[0].split('#')[0].replace(EMAIL_RE, '[redacted]').slice(0, 120);
        out[k] = cleaned;
      }
    }
    return out;
  }

  function hasAnalyticsConsent() {
    try {
      var raw = window.localStorage && window.localStorage.getItem('clipsat_cookie_consent');
      if (!raw) return false;
      if (raw === 'all' || raw === 'accepted') return true;
      var parsed = JSON.parse(raw);
      return Boolean(parsed && parsed.analytics === true);
    } catch (e) {
      return false;
    }
  }

  function dispatchItemCalibration(safeProps) {
    if (_calibrationSent >= MAX_CALIBRATION_PER_SESSION) return;
    var cloud = window.ClipSATCloud;
    if (!cloud || !cloud.configured || typeof cloud.getClient !== 'function') return;
    var sb = cloud.getClient();
    if (!sb || typeof sb.rpc !== 'function') return;
    var track = String(safeProps.track || '').trim();
    var itemId = String(safeProps.item_id || '').trim();
    if (!track || !itemId) return;
    _calibrationSent++;
    sb.rpc('log_item_calibration', {
      p_track: track,
      p_item_id: itemId,
      p_correct: Boolean(safeProps.correct),
      p_dwell_ms: Math.max(0, Math.min(3600000, Math.round(Number(safeProps.dwell_ms) || 0))),
      p_rapid_guess: Boolean(safeProps.rapid_guess),
      p_theta_est: typeof safeProps.theta_est === 'number' && isFinite(safeProps.theta_est) ? safeProps.theta_est : null
    }).then(function () {}, function () {});
  }

  function flushBeaconBatch() {
    if (!_pendingBeaconBatch.length) return false;
    var endpoint = window.CLIPSAT_TELEMETRY_ENDPOINT;
    if (!endpoint || typeof endpoint !== 'string') return false;
    if (!hasAnalyticsConsent()) {
      _pendingBeaconBatch.length = 0;
      return false;
    }
    var payload = JSON.stringify({
      schema: 1,
      cookieless: true,
      events: _pendingBeaconBatch.splice(0, 25)
    });
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        var blob = typeof Blob === 'function' ? new Blob([payload], { type: 'application/json' }) : payload;
        return navigator.sendBeacon(endpoint, blob);
      }
      if (typeof window.fetch === 'function') {
        window.fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
          credentials: 'omit'
        }).catch(function () {});
        return true;
      }
    } catch (e) {}
    return false;
  }

  function sendEvent(name, props) {
    if (!name || typeof name !== 'string') return;
    var eventName = name.slice(0, 64);
    var safeProps = scrubProps(props);
    var locPath = (typeof window !== 'undefined' && window.location) ? window.location.pathname : '/';
    safeProps.path = cleanPath(safeProps.path || locPath);
    safeProps.locale = (typeof window !== 'undefined' && window.i18n && typeof window.i18n.getLocale === 'function')
      ? window.i18n.getLocale()
      : ((typeof document !== 'undefined' && document.documentElement && document.documentElement.lang === 'ar') ? 'ar' : 'en');

    // 1. Anonymized 3PL item-difficulty calibration telemetry (zero PII)
    if (eventName === 'item_calibration') {
      dispatchItemCalibration(safeProps);
    }

    // 2. Optional self-hosted Plausible / Umami hooks (only when consented)
    if (hasAnalyticsConsent()) {
      if (typeof window.plausible === 'function') {
        try { window.plausible(eventName, { props: safeProps }); } catch (e) {}
      } else if (window.umami && typeof window.umami.track === 'function') {
        try { window.umami.track(eventName, safeProps); } catch (e) {}
      }
      if (window.CLIPSAT_TELEMETRY_ENDPOINT) {
        _pendingBeaconBatch.push({ event: eventName, props: safeProps, ts: Math.floor(Date.now() / 1000) });
        if (_pendingBeaconBatch.length >= 10) flushBeaconBatch();
      }
    }

    // 3. Bounded in-memory diagnostic ring buffer (last 50 events, never persisted to cookies/storage)
    _eventsQueue.push({ event: eventName, props: safeProps, timestamp: Date.now() });
    if (_eventsQueue.length > MAX_QUEUE) _eventsQueue.shift();

    try {
      if (typeof CustomEvent === 'function' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('clipsat:analytics', { detail: { event: eventName, props: safeProps } }));
      }
    } catch (e) {}
  }

  window.ClipSATAnalytics = {
    track: sendEvent,
    flush: flushBeaconBatch,
    scrubProps: scrubProps,
    getQueue: function () { return _eventsQueue.slice(); }
  };

  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flushBeaconBatch();
    });
    document.addEventListener('DOMContentLoaded', function () {
      var raw = (window.location && window.location.pathname) ? window.location.pathname.replace(/^\/|\/$/g, '') : '';
      var parts = raw.split('/').filter(Boolean);
      var trackSlug = (parts[0] === 'ar') ? (parts[1] || '') : (parts[0] || '');
      if (trackSlug && trackSlug !== 'index.html' && trackSlug !== 'pricing' && trackSlug !== 'calculator') {
        sendEvent('track_start', { track: trackSlug });
      }
    });
  }
})();
