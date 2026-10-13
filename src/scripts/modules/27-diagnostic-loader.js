/* Diagnostic Assessment Deferred Loader — ClipSAT
   Keeps engine.js strictly under 350KB by loading diagnostic-test.js on demand.
   Also hosts the lightweight zero-cookie video facade playback handler.
*/
(function() {
  'use strict';

  var _promise = null;
  function _ensureDiagnosticTest() {
    if (window._diagnosticLoaded) return Promise.resolve();
    if (_promise) return _promise;
    _promise = new Promise(function(resolve, reject) {
      var s = document.createElement('script');
      s.src = '/js/diagnostic-test.js';
      s.onload = function() {
        window._diagnosticLoaded = true;
        resolve();
      };
      s.onerror = function() {
        _promise = null;
        reject(new Error('diagnostic-test.js failed to load'));
      };
      document.head.appendChild(s);
    });
    return _promise;
  }
  window._ensureDiagnosticTest = _ensureDiagnosticTest;

  window.openDiagnosticTest = function(trackId) {
    _ensureDiagnosticTest().then(function() {
      if (typeof window.openDiagnosticTest === 'function') {
        window.openDiagnosticTest(trackId);
      }
    });
  };

  // Video facade global click handler (zero cookies until play)
  window.playVideoFacade = function(el) {
    if (!el) return;
    var vid = el.getAttribute('data-video-id');
    var label = el.getAttribute('aria-label') || 'Video lesson';
    if (!vid) return;
    el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(vid) + '?autoplay=1&rel=0" title="' + encodeURIComponent(label) + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    el.classList.add('cs-video-playing');
    if (window.ClipSATAnalytics) {
      window.ClipSATAnalytics.track('video_play', { video_id: vid });
    }
  };
})();
