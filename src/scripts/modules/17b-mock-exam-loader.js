/* Deferred Loader for CBT Mock Exam Simulator (17-mock-exam-mode.js -> /js/mock-exam.js)
   Keeps public/js/engine.js strictly under the 350 KB CI budget while loading
   the full CBT simulator transparently on first click. */
(function(){
  'use strict';

  var _promise = null;
  function _ensureMockExam(){
    if (window._mockExamLoaded) return Promise.resolve();
    if (_promise) return _promise;
    _promise = new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = '/js/mock-exam.js';
      s.onload = function(){
        window._mockExamLoaded = true;
        resolve();
      };
      s.onerror = function(){
        _promise = null;
        reject(new Error('mock-exam.js failed to load'));
      };
      document.head.appendChild(s);
    });
    return _promise;
  }
  window._ensureMockExam = _ensureMockExam;

  function _forward(methodName){
    var stub = function(){
      var args = Array.prototype.slice.call(arguments);
      _ensureMockExam().then(function(){
        if (typeof window[methodName] === 'function' && window[methodName] !== stub){
          window[methodName].apply(window, args);
        }
      });
    };
    window[methodName] = stub;
  }

  _forward('openMockExam');
  _forward('openDownloadExamCBT');
  _forward('closeMockExam');
  _forward('exitMockExam');
  _forward('submitMockExam');
  _forward('retakeCurrentCBTExam');
  _forward('cbtFilterReview');
})();
