/* Plan 5, Phase 5.015 — the first real deferred-loading win: TeacherMode
   itself (formerly this file's position in the eager bundle) is no longer
   part of public/js/engine.js. build.js now ships it separately as
   public/js/teacher-mode.js and this small loader fetches it on demand.

   Trigger points, both funneled through _ensureTeacherMode() so there's
   exactly one load path to reason about:
   1. #navMoreBtn's own click handler (02-core-app.js) calls this eagerly,
      well before the user could reach #teacherModeBtn inside the panel it
      reveals — the common case finishes loading with time to spare.
   2. #teacherModeBtn's onclick (base.njk) also calls it directly, as a
      safety net for the edge case of an extremely fast click sequence
      racing the network load from (1) — _ensureTeacherMode() is a no-op
      once loading has started, so this never double-fetches.

   window._applyTeacherModeDecoration (22-assignments-reports-search.js)
   already ran once at that module's own load time and found window.
   TeacherMode absent (a no-op, since TeacherMode is never eager anymore) —
   the .then() below is what actually wires up that cross-module decoration
   for real, once TeacherMode's script has finished loading.

   Also kicks off CSExport's own deferred load (04b-docx-export-loader.js)
   in parallel, not chained — TeacherMode's UI renders buttons for
   CSAssign.open()/CSReport.generate()/docx-export that all need CSExport
   (verified: 22-assignments-reports-search.js's CSAssign/CSReport methods
   and TeacherMode's own docx/print buttons), and those are only reachable
   through Teacher Mode's panel, so there's no separate real trigger for
   them — this is it. Doesn't block TeacherMode's own toggle either way.

   Same for the Teacher Mode whiteboard (whiteboard.js, ADR 0031): it is only
   usable inside Teacher Mode, so its load starts here too, in parallel. */
(function(){
  var _promise = null;
  function _ensureTeacherMode(){
    if (window._ensureCSExport) window._ensureCSExport().catch(function(){});
    if (window._ensureWhiteboard) window._ensureWhiteboard().catch(function(){});
    if (window.TeacherMode) return Promise.resolve();
    if (_promise) return _promise;
    _promise = new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = '/js/teacher-mode.js';
      s.onload = function(){
        if (window._applyTeacherModeDecoration) window._applyTeacherModeDecoration();
        resolve();
      };
      s.onerror = function(){ _promise = null; reject(new Error('teacher-mode.js failed to load')); };
      document.head.appendChild(s);
    });
    return _promise;
  }
  window._ensureTeacherMode = _ensureTeacherMode;
})();
