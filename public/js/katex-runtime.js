(function () {
  'use strict';
  var O_IN = '\\(', C_IN = '\\)', O_DP = '\\[', C_DP = '\\]', DD = '$$';
  var KATEX_OPTS = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ],
    ignoredClasses: ['katex', 'katex-display', 'katex-html', 'katex-mathml', 'sr-only'],
    output: 'html',
    throwOnError: false
  };

  function decodeEntities(s) {
    return s
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(parseInt(n, 10)); })
      .replace(/&amp;/g, '&');
  }

  window.CSRenderMathString = function (str) {
    if (!str || typeof str !== 'string') return str;
    if (!window.katex || typeof window.katex.renderToString !== 'function') return str;
    if (str.indexOf(O_IN) === -1 && str.indexOf(O_DP) === -1 && str.indexOf(DD) === -1) return str;
    var out = '', i = 0, L = str.length;
    while (i < L) {
      var i1 = str.indexOf(O_IN, i);
      var i2 = str.indexOf(O_DP, i);
      var i3 = str.indexOf(DD, i);
      var next = -1, mode = 0;
      if (i1 !== -1) { next = i1; mode = 1; }
      if (i2 !== -1 && (next === -1 || i2 < next)) { next = i2; mode = 2; }
      if (i3 !== -1 && (next === -1 || i3 < next)) { next = i3; mode = 3; }
      if (next === -1) { out += str.slice(i); break; }
      out += str.slice(i, next);
      var closeTok = mode === 1 ? C_IN : (mode === 2 ? C_DP : DD);
      var end = str.indexOf(closeTok, next + 2);
      if (end === -1) { out += str.slice(next); break; }
      var rawTex = decodeEntities(str.slice(next + 2, end));
      try {
        out += window.katex.renderToString(rawTex, { displayMode: mode !== 1, output: 'html', throwOnError: false });
      } catch (e) {
        out += str.slice(next, end + 2);
      }
      i = end + 2;
    }
    return out;
  };

  function markScrollableMath(el) {
    if (!el || !el.querySelectorAll) return;
    var list = el.querySelectorAll('.katex-display');
    for (var i = 0; i < list.length; i++) {
      var d = list[i];
      if (!d.offsetParent) continue;
      if (d.scrollWidth > d.clientWidth + 1) {
        if (!d.hasAttribute('tabindex')) d.setAttribute('tabindex', '0');
        if (!d.hasAttribute('role')) d.setAttribute('role', 'region');
        if (!d.hasAttribute('aria-label')) d.setAttribute('aria-label', 'Scrollable math expression');
      }
    }
  }

  function hasRawMath(txt) {
    if (!txt) return false;
    return txt.indexOf(O_IN) !== -1 || txt.indexOf(O_DP) !== -1 || txt.indexOf(DD) !== -1;
  }

  function defaultScope() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.chapter.ch-active, .hero, #view-home, .deep-card, .cq-paper, .fep-body, .ix-section, .ix-sec, #pq-overlay'));
    return els.length ? els : (document.body ? [document.body] : []);
  }

  function typesetSingle(el) {
    if (!el || el.nodeType !== 1 || typeof window.renderMathInElement !== 'function') return;
    if (hasRawMath(el.textContent)) {
      try { window.renderMathInElement(el, KATEX_OPTS); } catch (e) {}
    }
    markScrollableMath(el);
  }

  function typesetElements(elements, cb) {
    var targets = elements || defaultScope();
    targets.forEach(typesetSingle);
    if (cb) cb();
  }

  window.CSRenderMathIn = function (el) {
    typesetSingle(el || document.body);
  };

  window.MathJax = {
    typesetPromise: function (elements) {
      return new Promise(function (resolve) { typesetElements(elements, resolve); });
    },
    typeset: function (elements) { typesetElements(elements); },
    startup: { promise: Promise.resolve() }
  };

  var _blockIO = null;
  function observeChapterBlocks() {
    var activeCh = document.querySelector('.chapter.ch-active');
    if (!activeCh) {
      typesetElements();
      return;
    }
    if (typeof window.IntersectionObserver !== 'function') {
      typesetElements([activeCh]);
      return;
    }
    if (_blockIO) _blockIO.disconnect();
    _blockIO = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          _blockIO.unobserve(entries[i].target);
          typesetSingle(entries[i].target);
        }
      }
    }, { rootMargin: '400px 0px' });

    var kids = activeCh.children;
    for (var j = 0; j < kids.length; j++) {
      if (hasRawMath(kids[j].textContent)) {
        _blockIO.observe(kids[j]);
      }
    }
  }

  function initOnReady() {
    if (typeof window.CSRenderAllExplorers === 'function') window.CSRenderAllExplorers();
    observeChapterBlocks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOnReady);
  } else {
    initOnReady();
  }

  document.addEventListener('clipsat:chapter-change', function () {
    observeChapterBlocks();
  });

  // Hydrate revealed solutions, worked-example cards, progressive hints & <details> on click
  document.addEventListener('click', function (ev) {
    var btn = ev.target && ev.target.closest
      ? ev.target.closest('.sol-toggle, .we-toggle-btn, .pp-hint-btn, summary')
      : null;
    if (!btn) return;
    var box = btn.closest('.problem, .we-card, .worked-example-card, .practice-problem, details') || btn.parentElement;
    if (box) {
      setTimeout(function () { typesetSingle(box); }, 0);
    }
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      defaultScope().forEach(function (el) { markScrollableMath(el); });
    }, 200);
  });
})();
