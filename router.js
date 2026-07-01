/**
 * ClipSAT Hash Router  v2.0
 * ─────────────────────────────────────────────────────────────────────────────
 * Lightweight client-side router using window.location.hash.
 *
 * URL scheme
 * ──────────
 *   /                         → home
 *   /#/course/{courseId}      → course landing (chapter 0)
 *   /#/course/{courseId}/{ch} → specific chapter index
 *
 * The router integrates with:
 *   • ClipSAT's existing showView(name) function
 *   • CourseLoader.load(courseId, chapterIdx)
 *   • Custom events 'clipsat:chapterChanged' from CourseLoader
 *
 * Public API
 * ──────────
 *   Router.navigate(path)   — programmatic navigation (updates hash + renders)
 *   Router.back()           — browser history back
 *   Router.forward()        — browser history forward
 *   Router.currentPath      — string
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

(function (global) {

  /* ── Regex: parses /#/course/sat/2 → { courseId:'sat', chapter:2 } ── */
  const COURSE_RE = /^\/course\/([a-z0-9_-]+)(?:\/(\d+))?$/;

  let _currentPath = '/';

  /* ── Render the correct view for a parsed route ── */
  function _renderRoute(path) {
    _currentPath = path || '/';

    const courseMatch = COURSE_RE.exec(_currentPath);

    if (courseMatch) {
      const courseId   = courseMatch[1];
      const chapterIdx = courseMatch[2] ? parseInt(courseMatch[2], 10) : 0;

      // Show view via existing SPA function
      if (typeof global.showView === 'function') {
        global.showView(courseId);
      } else {
        // Fallback: hide all views, show target
        document.querySelectorAll('main[id^="view-"]').forEach(el => {
          el.style.display = 'none';
        });
        const target = document.getElementById(`view-${courseId}`);
        if (target) target.style.display = '';
      }

      // Load dynamic JSON content (if not already rendered for this course+chapter)
      if (global.CourseLoader) {
        const current = CourseLoader.currentCourse;
        if (!current || current.id !== courseId) {
          CourseLoader.load(courseId, chapterIdx);
        } else if (CourseLoader.currentChapterIndex !== chapterIdx) {
          CourseLoader.renderChapter(chapterIdx);
        }
      }

    } else {
      // Home or unrecognised path → go home
      if (typeof global.showView === 'function') {
        global.showView('home');
      }
    }
  }

  /* ── Read and dispatch the current hash ── */
  function _handleHashChange() {
    const hash = location.hash; // e.g. '#/course/sat/1'
    const path = hash ? hash.slice(1) || '/' : '/';  // strip leading '#'
    _renderRoute(path);
  }

  /* ── Keep hash in sync when CourseLoader changes chapter ── */
  document.addEventListener('clipsat:chapterChanged', e => {
    const { course, index } = e.detail;
    if (!course) return;
    const expectedHash = `#/course/${course.id}/${index}`;
    if (location.hash !== expectedHash) {
      // Replace (not push) so tab-switching doesn't flood history
      history.replaceState(null, '', expectedHash);
      _currentPath = `/course/${course.id}/${index}`;
    }
  });

  /* ── Keep hash in sync when the existing showView() is called externally ── */
  // Patch showView to also update the hash (but not for 'home')
  const _origShowView = global.showView;
  if (typeof _origShowView === 'function') {
    global.showView = function (name) {
      _origShowView.apply(this, arguments);
      if (name !== 'home') {
        const hash = `#/course/${name}`;
        if (location.hash !== hash && !location.hash.startsWith(`#/course/${name}/`)) {
          history.pushState(null, '', hash);
          _currentPath = `/course/${name}`;
        }
      } else {
        history.pushState(null, '', '#/');
        _currentPath = '/';
      }
    };
  }

  /* ── Public API ── */
  const Router = {

    get currentPath() { return _currentPath; },

    /**
     * Navigate to a path programmatically.
     * @param {string} path  e.g. '/course/digital-sat/2'
     */
    navigate(path) {
      const hash = '#' + (path.startsWith('/') ? path : '/' + path);
      if (location.hash !== hash) {
        history.pushState(null, '', hash);
      }
      _renderRoute(path);
    },

    back()    { history.back(); },
    forward() { history.forward(); },

    /** Call once on DOMContentLoaded to boot the router. */
    init() {
      window.addEventListener('hashchange', _handleHashChange);
      window.addEventListener('popstate',   _handleHashChange);
      // Render initial route from current URL
      _handleHashChange();
    }
  };

  global.Router = Router;

  /* ── Auto-init on DOM ready ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Router.init());
  } else {
    // DOM already parsed
    setTimeout(() => Router.init(), 0);
  }

})(window);
