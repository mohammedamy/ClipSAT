/* Plan 5, Phase 5.015 — CSExport (docx export, formerly 04-docx-export.js in
   the eager bundle) is now loaded on demand, same pattern as ADR 0028's
   TeacherMode defer. Verified safe before writing this: every real
   cross-module dependent (03-ai-chat-and-practice-quiz.js,
   22-assignments-reports-search.js, 20b-teacher-mode.js) checks
   `window.CSExport && ...` INSIDE a function body, evaluated at call time
   when the surrounding feature actually runs — never once, synchronously,
   at module-load time the way ADR 0027/0028's TeacherMode decorator did.
   That "ran once, silently gives up forever" shape is exactly what made
   TeacherMode's defer need a fix; it doesn't exist here, so no equivalent
   fix is needed for CSExport's dependents.

   Two of those three dependents (22's CSAssign/CSReport) are only
   reachable through buttons Teacher Mode's own UI renders — already gated
   behind _ensureTeacherMode() — so this loader's own success handler also
   kicks off CSExport's load in parallel whenever Teacher Mode loads,
   rather than needing a separate trigger for them. The third
   (03's printPQResult) has no caller anywhere in the codebase today —
   dead code, left alone, not a reason to add a trigger for it.

   The real, common-case trigger is downloads-block.njk's own two buttons
   (docx download, print chapter), present on every track's downloads
   section — wired directly below. */
(function(){
  var _promise = null;
  function _ensureCSExport(){
    if (window.CSExport) return Promise.resolve();
    if (_promise) return _promise;
    _promise = new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = '/js/docx-export.js';
      s.onload = function(){ resolve(); };
      s.onerror = function(){ _promise = null; reject(new Error('docx-export.js failed to load')); };
      document.head.appendChild(s);
    });
    return _promise;
  }
  window._ensureCSExport = _ensureCSExport;
})();
