/* Stale-Service-Worker self-heal: served at root (/sh.js) so older SWs use networkFirst. */
(function () {
  var EXPECTED = '20261126b';
  if (typeof window === 'undefined' || window.__CS_ENGINE_V === EXPECTED || typeof sessionStorage === 'undefined') {
    return;
  }
  try {
    if (sessionStorage.getItem('cs_sw_bust') === EXPECTED) return;
    sessionStorage.setItem('cs_sw_bust', EXPECTED);
    var purge = (typeof caches !== 'undefined' && caches.keys)
      ? caches.keys().then(function (keys) {
          return Promise.all(keys.map(function (k) { return caches.delete(k); }));
        })
      : Promise.resolve();
    var unreg = (typeof navigator !== 'undefined' && navigator.serviceWorker && navigator.serviceWorker.getRegistrations)
      ? navigator.serviceWorker.getRegistrations().then(function (regs) {
          return Promise.all(regs.map(function (r) { return r.unregister(); }));
        })
      : Promise.resolve();
    Promise.all([purge, unreg]).then(
      function () { location.reload(); },
      function () { location.reload(); }
    );
  } catch (e) {}
})();
