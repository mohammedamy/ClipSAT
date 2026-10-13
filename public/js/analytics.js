/**
 * ClipSAT — Cookieless Analytics  v1.0
 * ════════════════════════════════════════════════════════════════════════
 * Privacy-first, cookieless telemetry compliant with Saudi Personal Data
 * Protection Law (PDPL) and GDPR:
 *   - No cookies, no device fingerprinting, no persistent tracking IDs.
 *   - No IP addresses or personal identifying information transmitted or stored.
 *   - Compatible with Plausible (window.plausible) and Umami (window.umami).
 *
 * Tracks high-level educational interaction events:
 *   - track_start: student visits/begins a study track
 *   - diagnostic_complete: student finishes a diagnostic assessment
 *   - tutor_query: student interacts with AI tutor
 *   - export_download: teacher or student exports Word/PDF/CSV
 *   - whatsapp_click: student clicks WhatsApp tutoring CTA
 */
(function() {
  'use strict';

  var _eventsQueue = [];

  function sendEvent(name, props) {
    props = props || {};
    props.path = window.location.pathname;
    props.locale = (window.i18n && typeof window.i18n.getLocale === 'function') ? window.i18n.getLocale() : 'en';

    // 1. Check for Plausible Analytics
    if (typeof window.plausible === 'function') {
      try {
        window.plausible(name, { props: props });
        return;
      } catch (e) {}
    }

    // 2. Check for Umami Analytics
    if (window.umami && typeof window.umami.track === 'function') {
      try {
        window.umami.track(name, props);
        return;
      } catch (e) {}
    }

    // 3. Keep in lightweight local event queue (last 50 events)
    _eventsQueue.push({ event: name, props: props, timestamp: Date.now() });
    if (_eventsQueue.length > 50) _eventsQueue.shift();

    // Custom dispatch event for extensible listeners
    try {
      window.dispatchEvent(new CustomEvent('clipsat:analytics', { detail: { event: name, props: props } }));
    } catch (e) {}
  }

  window.ClipSATAnalytics = {
    track: sendEvent,
    getQueue: function() { return _eventsQueue.slice(); }
  };

  // Auto-track track visits
  document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path && path !== 'index.html' && !path.includes('/')) {
      sendEvent('track_start', { track: path });
    }
  });
})();
