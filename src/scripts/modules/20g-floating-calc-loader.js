/**
 * ClipSAT Deferred Floating Calculator Loader
 * Keeps public/js/engine.js compact while exposing every floating calculator
 * API synchronously and lazy-loading /js/floating-calc.js on first interactive use.
 */
(function () {
  'use strict';
  var _promise = null;
  var _queue = [];

  function _ensureFloatingCalc() {
    if (window.__csFloatingCalcLoaded) return Promise.resolve();
    if (_promise) return _promise;
    _promise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = '/js/floating-calc.js?v=20261126e';
      s.onload = function () {
        window.__csFloatingCalcLoaded = true;
        var q = _queue.slice();
        _queue = [];
        q.forEach(function (fn) { try { fn(); } catch (e) {} });
        resolve();
      };
      s.onerror = function () {
        _promise = null;
        reject(new Error('floating-calc.js failed to load'));
      };
      document.head.appendChild(s);
    });
    return _promise;
  }

  window._ensureFloatingCalc = _ensureFloatingCalc;

  function _deferCall(methodName, args) {
    _queue.push(function () {
      if (typeof window[methodName] === 'function') {
        window[methodName].apply(window, args);
      }
    });
    _ensureFloatingCalc().catch(function () {});
  }

  if (!window.openFloatingCalc) {
    window.openFloatingCalc = function (mode) { _deferCall('openFloatingCalc', [mode]); };
  }
  if (!window.toggleFloatingCalc) {
    window.toggleFloatingCalc = function (mode) { _deferCall('toggleFloatingCalc', [mode]); };
  }
  if (!window.closeFloatingCalc) {
    window.closeFloatingCalc = function () {
      if (_promise) _deferCall('closeFloatingCalc', []);
    };
  }
  if (!window.clearFloatingCalc) {
    window.clearFloatingCalc = function () {
      if (_promise) _deferCall('clearFloatingCalc', []);
    };
  }
  if (!window.setFloatingCalcExpression) {
    window.setFloatingCalcExpression = function (latex, id, color) {
      _deferCall('setFloatingCalcExpression', [latex, id, color]);
    };
  }
  if (!window.setFloatingCalcLocked) {
    window.setFloatingCalcLocked = function (locked, reason) {
      window.__csPendingCalcLock = { locked: !!locked, reason: reason || '' };
    };
  }
  if (!window.isFloatingCalcLocked) {
    window.isFloatingCalcLocked = function () {
      return !!(window.__csPendingCalcLock && window.__csPendingCalcLock.locked);
    };
  }
  if (!window.getFloatingCalcInstance) {
    window.getFloatingCalcInstance = function () { return null; };
  }

  document.addEventListener('keydown', function (e) {
    if (!window.__csFloatingCalcLoaded && e.altKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      window.toggleFloatingCalc();
    }
  });
})();
