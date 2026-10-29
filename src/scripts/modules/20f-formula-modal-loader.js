/* Deferred Loader for Official Formula & Reference Sheets (20f-formula-modal.js -> /js/formula-modal.js)
   Keeps public/js/engine.js strictly under the 350 KB CI budget while loading
   all curriculum formula sheets on first click. */
(function(){
  'use strict';

  var _promise = null;
  function _ensureFormulaModal(){
    if (window._formulaModalLoaded) return Promise.resolve();
    if (_promise) return _promise;
    _promise = new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = '/js/formula-modal.js';
      s.onload = function(){
        window._formulaModalLoaded = true;
        resolve();
      };
      s.onerror = function(){
        _promise = null;
        reject(new Error('formula-modal.js failed to load'));
      };
      document.head.appendChild(s);
    });
    return _promise;
  }
  window._ensureFormulaModal = _ensureFormulaModal;

  var stubFormula = {
    activeTab: 'sat',
    open: function(tab){
      _ensureFormulaModal().then(function(){
        if (window.CSFormula && window.CSFormula !== stubFormula && typeof window.CSFormula.open === 'function'){
          window.CSFormula.open(tab);
        }
      });
    },
    close: function(){
      var overlay = document.getElementById('formulaOverlay');
      if (overlay){
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
      }
    },
    setTab: function(tabKey, btn){
      _ensureFormulaModal().then(function(){
        if (window.CSFormula && window.CSFormula !== stubFormula && typeof window.CSFormula.setTab === 'function'){
          window.CSFormula.setTab(tabKey, btn);
        }
      });
    },
    render: function(){
      _ensureFormulaModal().then(function(){
        if (window.CSFormula && window.CSFormula !== stubFormula && typeof window.CSFormula.render === 'function'){
          window.CSFormula.render();
        }
      });
    }
  };

  window.CSFormula = stubFormula;
  window.openFormulaModal = stubFormula.open;
  window.closeFormulaModal = stubFormula.close;
})();
