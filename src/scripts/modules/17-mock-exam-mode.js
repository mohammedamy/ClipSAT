(function(){
  "use strict";

  var _tmr = null, _secs = 0, _totalSecs = 0;

  var PAPERS = {
    qudrat: [
      { name: 'القسم الكمي — اختبار محوسب كامل (Qudrat CBT)', minutes: 25, qCount: 24, calc: false, domains: ['arithmetic', 'algebra', 'geometry', 'ratio', 'percent', 'speed', 'comparison'] },
      { name: 'قسم المقارنات الرياضية (Quantitative Comparisons)', minutes: 20, qCount: 20, calc: false, domains: ['comparison', 'arithmetic', 'geometry'] }
    ],
    tahsili: [
      { name: 'رياضيات التحصيلي — اختبار محوسب تجريبي (SAAT Math CBT)', minutes: 25, qCount: 22, calc: false, domains: ['functions', 'algebra', 'trig', 'vectors', 'matrices', 'calculus', 'probability'] }
    ],
    sat: [
      { name: 'Digital SAT® Math — Module 1 (Standard Stage)', minutes: 35, qCount: 22, calc: true, domains: ['algebra', 'advanced', 'problem-solving', 'geometry', 'trigonometry'] },
      { name: 'Digital SAT® Math — Module 2 (Adaptive Stage)', minutes: 35, qCount: 22, calc: true, domains: ['algebra', 'advanced', 'problem-solving', 'geometry', 'trigonometry'] }
    ],
    igcse: [
      { name: 'Cambridge IGCSE® 0580 — Paper 2 (Non-Calculator)', minutes: 90, qCount: 20, calc: false, domains: ['number', 'algebra', 'geometry', 'trigonometry', 'probability', 'statistics'] },
      { name: 'Cambridge IGCSE® 0580 — Paper 4 (Calculator Allowed)', minutes: 120, qCount: 24, calc: true, domains: ['number', 'algebra', 'mensuration', 'geometry', 'trigonometry', 'statistics'] }
    ],
    act: [
      { name: 'ACT® Mathematics — Enhanced 4-Choice CBT', minutes: 50, qCount: 45, calc: true, domains: ['pre-algebra', 'elementary-algebra', 'intermediate-algebra', 'coordinate-geometry', 'plane-geometry', 'trigonometry'] }
    ],
    est: [
      { name: 'EST I — Mathematics Section (Egyptian Scholastic Test)', minutes: 55, qCount: 38, calc: true, domains: ['algebra', 'functions', 'geometry', 'statistics'] }
    ],
    est2: [
      { name: 'EST II — Mathematics Level 1', minutes: 60, qCount: 50, calc: true, domains: ['algebra', 'geometry', 'trigonometry', 'statistics'] }
    ],
    est2l2: [
      { name: 'EST II — Mathematics Level 2 (Advanced)', minutes: 60, qCount: 50, calc: true, domains: ['algebra', 'complex', 'vectors', 'matrices', 'calculus', 'trigonometry'] }
    ],
    apab: [
      { name: 'AP® Calculus AB — Section I Part A (Non-Calculator)', minutes: 60, qCount: 28, calc: false, domains: ['limits', 'derivatives', 'integrals', 'applications'] },
      { name: 'AP® Calculus AB — Section I Part B (Graphing Calculator)', minutes: 40, qCount: 14, calc: true, domains: ['derivatives', 'integrals', 'applications'] }
    ],
    apbc: [
      { name: 'AP® Calculus BC — Section I Part A (Non-Calculator)', minutes: 60, qCount: 28, calc: false, domains: ['derivatives', 'integrals', 'series', 'parametrics', 'polars'] },
      { name: 'AP® Calculus BC — Section I Part B (Graphing Calculator)', minutes: 40, qCount: 14, calc: true, domains: ['derivatives', 'integrals', 'series', 'vector-calculus'] }
    ],
    appc: [
      { name: 'AP® Precalculus — Section I Part A (Non-Calculator)', minutes: 65, qCount: 28, calc: false, domains: ['polynomials', 'rationals', 'exponential', 'logarithmic', 'trigonometry'] },
      { name: 'AP® Precalculus — Section I Part B (Graphing Calculator)', minutes: 40, qCount: 12, calc: true, domains: ['trigonometry', 'parameters', 'matrices'] }
    ],
    apstats: [
      { name: 'AP® Statistics — Section I Multiple Choice', minutes: 90, qCount: 40, calc: true, domains: ['exploring-data', 'sampling-experimentation', 'probability', 'inference'] }
    ],
    aslevel: [
      { name: 'Paper 1 — Pure Maths 1 (Cambridge 9709)', minutes: 105, qCount: 12, calc: true, domains: ['pure', 'algebra', 'quadratic', 'trigonometry', 'sequence', 'series', 'differentiation', 'integration'] },
      { name: 'Paper 4 — Mechanics 1 (Cambridge 9709)', minutes: 75, qCount: 10, calc: true, domains: ['mechanic', 'forces', 'newton', 'energy', 'kinematics', 'work', 'power'] },
      { name: 'Paper 5 — Statistics 1 (Cambridge 9709)', minutes: 75, qCount: 10, calc: true, domains: ['statistic', 'normal', 'binomial', 'permutation', 'combination', 'probability'] }
    ],
    a2level: [
      { name: 'Paper 3 — Pure Maths 3 (Cambridge 9709)', minutes: 110, qCount: 12, calc: true, domains: ['pure', 'complex', 'vector', 'differential equation', 'integration', 'series', 'numerical'] },
      { name: 'Paper 6 — Statistics 2 (Cambridge 9709)', minutes: 75, qCount: 10, calc: true, domains: ['poisson', 'continuous random', 'sampling', 'hypothesis', 'estimation'] }
    ],
    ibsl: [
      { name: 'IB Math SL — Paper 1 (Non-Calculator)', minutes: 90, qCount: 12, calc: false, domains: ['algebra', 'functions', 'trigonometry', 'calculus', 'statistics'] },
      { name: 'IB Math SL — Paper 2 (GDC Required)', minutes: 90, qCount: 12, calc: true, domains: ['functions', 'trigonometry', 'calculus', 'statistics', 'vectors'] }
    ],
    ibhl: [
      { name: 'IB Math HL — Paper 1 (Non-Calculator)', minutes: 120, qCount: 14, calc: false, domains: ['algebra', 'functions', 'trigonometry', 'vectors', 'calculus'] },
      { name: 'IB Math HL — Paper 2 (GDC Required)', minutes: 120, qCount: 14, calc: true, domains: ['functions', 'complex', 'vectors', 'calculus', 'statistics'] }
    ]
  };

  function _ensureBank(viewId){
    if(window.fullExamBank && window.fullExamBank[viewId] && window.fullExamBank[viewId].pool){
      return Promise.resolve(window.fullExamBank[viewId]);
    }
    if(window.CS_loadTrackBank){
      return window.CS_loadTrackBank(viewId);
    }
    return fetch('/bank-data/' + viewId + '.json')
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(d){
        if(d){
          window.fullExamBank = window.fullExamBank || {};
          window.fullExamBank[viewId] = d;
        }
        return d;
      })
      .catch(function(){ return null; });
  }

  function _renderQFig(q){
    var f = q.figure || q.fig || q.table;
    if(!f) return '';
    if(typeof f === 'string') return f;
    if(f.type === 'table' || f.headers || f.rows){
      var hdrs = (f.headers||[]).map(function(th){
        return '<th>' + (typeof window._autoMath === 'function' ? window._autoMath(th != null ? String(th) : '') : th) + '</th>';
      }).join('');
      var rws = (f.rows || f.data || []).map(function(r){
        return '<tr>' + (Array.isArray(r) ? r.map(function(c){
          return '<td>' + (typeof window._autoMath === 'function' ? window._autoMath(c != null ? String(c) : '') : c) + '</td>';
        }).join('') : '<td>' + String(r) + '</td>') + '</tr>';
      }).join('');
      return '<div class="table-wrap"><table class="exam-table">' + (hdrs ? '<thead><tr>' + hdrs + '</tr></thead>' : '') + '<tbody>' + rws + '</tbody></table></div>';
    }
    if(window._renderFig) return window._renderFig(f);
    if(window.renderMathFigure) return window.renderMathFigure(f);
    return '';
  }

  function _isQuantComp(q){
    var t = (q.text || q.q || '').trim();
    return (t.indexOf('قارن بين') !== -1 || (t.indexOf('القيمة الأولى') !== -1 && t.indexOf('القيمة الثانية') !== -1) || (q.val1 && q.val2));
  }

  function _parseCompBoxes(q){
    var t = (q.text || q.q || '').trim();
    var val1 = q.val1 || '', val2 = q.val2 || '';
    if(!val1 && !val2){
      var m1 = t.match(/القيمة الأولى\s*[:：\-]?\s*([^\n\r]+)/);
      var m2 = t.match(/القيمة الثانية\s*[:：\-]?\s*([^\n\r]+)/);
      if(m1 && m2){
        val1 = m1[1].replace(/قارن بين|المعطيات/g, '').trim();
        val2 = m2[1].replace(/قارن بين|المعطيات/g, '').trim();
      }
    }
    return { val1: val1, val2: val2 };
  }

  window.openMockExam = function(viewId, pidx){
    viewId = String(viewId || '').toLowerCase().trim();
    pidx = parseInt(pidx, 10) || 0;

    var overlay = document.getElementById('mock-exam-overlay');
    if(!overlay) return;

    var body = document.getElementById('mock-exam-body');
    if(body){
      body.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--muted)"><div class="ai-spinner" style="margin:0 auto 16px"></div><p>Loading examination question bank…</p></div>';
    }
    overlay.classList.add('show');

    _ensureBank(viewId).then(function(bank){
      if(!bank){
        alert('Question bank for "' + viewId.toUpperCase() + '" is not available.');
        overlay.classList.remove('show');
        return;
      }

      var papers = PAPERS[viewId] || [
        { name: viewId.toUpperCase() + ' Comprehensive CBT Practice', minutes: 45, qCount: 15, calc: true }
      ];
      var paper = papers[pidx] || papers[0];
      var domainFilter = paper.domains || null;

      // Extract pool
      var allPool = [];
      if(Array.isArray(bank.pool) && bank.pool.length){
        allPool = bank.pool.slice();
      } else if(bank.easy || bank.medium || bank.hard){
        var cvt = function(a, diff){
          return (a || []).map(function(q){
            return Object.assign({}, q, {
              type: q.type || 'mcq',
              difficulty: diff,
              domain: q.domain || 'Mathematics',
              text: q.text || q.q || '',
              choices: q.choices || [],
              answer: q.answer,
              sol: q.sol || q.expl || ''
            });
          });
        };
        allPool = cvt(bank.easy, 'easy').concat(cvt(bank.medium, 'medium')).concat(cvt(bank.hard, 'hard'));
      }

      // Filter out meta trivia
      allPool = allPool.filter(function(q){
        var d = (q.domain || '').toLowerCase();
        return d.indexOf('format') === -1 && d.indexOf('strategy') === -1 && d.indexOf('overview') === -1;
      });

      // Filter by paper domains if specified
      var pool = allPool;
      if(domainFilter && domainFilter.length){
        var filtered = allPool.filter(function(q){
          var d = ((q.domain || '') + ' ' + (q.text || q.q || '')).toLowerCase();
          return domainFilter.some(function(f){ return d.indexOf(f.toLowerCase()) !== -1; });
        });
        if(filtered.length >= 8) pool = filtered;
      }

      // Shuffle pool
      for(var i = pool.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
      }

      var targetCount = Math.min(paper.qCount || 20, pool.length);
      var picked = [];
      var seenKeys = new Set();
      for(var p = 0; p < pool.length && picked.length < targetCount; p++){
        var qObj = pool[p];
        var k = (qObj.text || qObj.q || '').trim();
        if(!seenKeys.has(k)){
          seenKeys.add(k);
          picked.push(qObj);
        }
      }

      if(picked.length < targetCount && allPool.length > picked.length){
        for(var a = 0; a < allPool.length && picked.length < targetCount; a++){
          var qA = allPool[a];
          var kA = (qA.text || qA.q || '').trim();
          if(!seenKeys.has(kA)){
            seenKeys.add(kA);
            picked.push(qA);
          }
        }
      }

      pool = picked.map(function(q){ return window._shuffleQ ? window._shuffleQ(q) : q; });
      if(!pool.length){
        alert('No questions available for this paper.');
        overlay.classList.remove('show');
        return;
      }

      // Render Header Tools
      var titleEl = document.getElementById('mock-exam-title');
      if(titleEl){
        var calcBadge = paper.calc
          ? '<span style="background:rgba(255,255,255,.18);padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:600">🖩 Calculator Allowed</span>'
          : '<span style="background:#b91c1c;padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:700">🚫 No Calculator</span>';
        titleEl.innerHTML = '<span>' + paper.name + '</span> ' + calcBadge;
      }

      // Header tools buttons
      var hdr = document.getElementById('mock-exam-header');
      if(hdr){
        var toolsDiv = hdr.querySelector('.mock-tools-wrap');
        if(!toolsDiv){
          toolsDiv = document.createElement('div');
          toolsDiv.className = 'mock-tools-wrap';
          toolsDiv.style.cssText = 'display:flex;align-items:center;gap:8px;margin-left:auto;margin-right:12px';
          var timerEl = document.getElementById('mock-exam-timer');
          if(timerEl) hdr.insertBefore(toolsDiv, timerEl);
        }
        var calcBtnHtml = (paper.calc !== false)
          ? '<button type="button" class="hdr-btn" onclick="window.toggleFloatingCalc&&window.toggleFloatingCalc()" style="padding:4px 10px;font-size:.78rem;background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);border-radius:6px;cursor:pointer">🧮 Calculator</button>'
          : '';
        toolsDiv.innerHTML = calcBtnHtml
          + '<button type="button" class="hdr-btn" onclick="window.openFormulaModal&&window.openFormulaModal()" style="padding:4px 10px;font-size:.78rem;background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);border-radius:6px;cursor:pointer">📐 Formulas</button>'
          + '<button type="button" class="hdr-btn" onclick="window.toggleWhiteboard&&window.toggleWhiteboard()" style="padding:4px 10px;font-size:.78rem;background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);border-radius:6px;cursor:pointer">✏️ Scratchpad</button>';
      }

      _secs = (paper.minutes || 45) * 60;
      _totalSecs = _secs;

      var h = '';
      var letters = (bank.letters && bank.letters.length) ? bank.letters : ['A', 'B', 'C', 'D'];

      pool.forEach(function(q, i){
        var isComp = _isQuantComp(q);
        var figHtml = _renderQFig(q);
        var qText = (q.text || q.q || '').trim();

        h += '<div class="mock-q" id="mock-q-' + i + '">'
          + '<div class="mq-num">'
          + '<span>Question ' + (i + 1) + ' of ' + pool.length + '</span>'
          + '<span style="font-size:.75rem;color:var(--faint);margin-left:8px">' + (q.domain || '') + '</span>'
          + '</div>';

        if(figHtml){
          h += '<div class="mock-q-figure" style="margin-bottom:12px">' + figHtml + '</div>';
        }

        if(isComp){
          var comp = _parseCompBoxes(q);
          h += '<div class="mq-text" dir="rtl" style="font-weight:700;margin-bottom:10px">قارن بين القيمتين التاليتين:</div>'
            + '<div class="mock-qc-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">'
            + '<div class="mock-qc-box" style="background:var(--paper-2,#f8fafc);border:1.5px solid var(--border,#cbd5e1);border-radius:8px;padding:12px;text-align:center">'
            + '<div style="font-size:.8rem;font-weight:700;color:var(--indigo,#1e3e70);margin-bottom:4px">القيمة الأولى (Column A)</div>'
            + '<div style="font-size:1rem;font-weight:600">' + (comp.val1 || qText) + '</div>'
            + '</div>'
            + '<div class="mock-qc-box" style="background:var(--paper-2,#f8fafc);border:1.5px solid var(--border,#cbd5e1);border-radius:8px;padding:12px;text-align:center">'
            + '<div style="font-size:.8rem;font-weight:700;color:var(--amber,#9e6515);margin-bottom:4px">القيمة الثانية (Column B)</div>'
            + '<div style="font-size:1rem;font-weight:600">' + (comp.val2 || '—') + '</div>'
            + '</div>'
            + '</div>';
        } else {
          h += '<div class="mq-text">' + qText + '</div>';
        }

        var isSPR = (q.type === 'spr' || q.isSPR);
        if(isSPR){
          h += '<div class="mock-spr-wrap" style="margin:12px 0">'
            + '<label style="display:block;font-size:.82rem;color:var(--muted);margin-bottom:4px">Student-Produced Response (Grid-in):</label>'
            + '<input type="text" class="mock-spr-input" name="mq' + i + '" placeholder="e.g. 7/4 or 1.75" style="width:160px;padding:8px 12px;border:1.5px solid var(--border,#cbd5e1);border-radius:6px;font-family:var(--mono,monospace);font-size:1rem">'
            + '</div>';
        } else if(q.choices && q.choices.length){
          h += '<div class="mock-choices-list" style="display:flex;flex-direction:column;gap:6px">';
          q.choices.forEach(function(c, ci){
            var letLabel = letters[ci] || String.fromCharCode(65 + ci);
            var chText = (typeof window.CSAutoMath === 'function' ? window.CSAutoMath(c) : String(c || ''));
            h += '<label class="mock-choice-row" style="display:flex;align-items:flex-start;gap:8px;padding:8px 12px;border:1px solid var(--border,#e2e8f0);border-radius:8px;cursor:pointer;transition:background .15s ease">'
              + '<input type="radio" name="mq' + i + '" value="' + ci + '" style="margin-top:4px">'
              + '<span style="font-weight:700;color:var(--indigo,#1e3e70)">' + letLabel + '.</span>'
              + '<span style="flex:1">' + chText + '</span>'
              + '</label>';
          });
          h += '</div>';
        } else {
          h += '<div style="margin:12px 0"><textarea class="mock-frq-area" name="mq' + i + '" placeholder="Type your algebraic derivation, proof, or numerical answer here..." style="width:100%;min-height:90px;padding:8px 12px;border:1px solid var(--border,#cbd5e1);border-radius:8px;font-family:var(--sans);font-size:.9rem"></textarea></div>';
        }

        h += '</div>';
      });

      body.innerHTML = h;
      body.setAttribute('data-pool', JSON.stringify(pool.map(function(q){
        return {
          answer: q.answer,
          ans: q.ans || q.answer,
          type: q.type || 'mcq',
          sol: q.sol || q.expl || ''
        };
      })));

      // Render math
      if(window.renderMathInElement){
        try {
          window.renderMathInElement(body, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '\\[', right: '\\]', display: true},
              {left: '\\(', right: '\\)', display: false},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        } catch(e){}
      } else if(window.MathJax && MathJax.typesetPromise){
        MathJax.typesetPromise([body]).catch(function(){});
      }

      if(_tmr) clearInterval(_tmr);
      _renderTimer();
      _tmr = setInterval(function(){
        _secs--;
        _renderTimer();
        if(_secs <= 0){
          clearInterval(_tmr);
          _tmr = null;
          submitMockExam();
        }
      }, 1000);
    });
  };

  function _renderTimer(){
    var el = document.getElementById('mock-exam-timer');
    if(!el) return;
    var m = Math.floor(Math.max(0, _secs) / 60);
    var s = Math.max(0, _secs) % 60;
    el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    el.style.color = _secs < 300 ? '#fca5a5' : '#ffffff';
  }

  window.submitMockExam = function(){
    if(_tmr){ clearInterval(_tmr); _tmr = null; }
    var body = document.getElementById('mock-exam-body');
    if(!body) return;

    var pool = JSON.parse(body.getAttribute('data-pool') || '[]');
    var qs = body.querySelectorAll('.mock-q');
    var correct = 0, totalGraded = 0;

    qs.forEach(function(qEl, i){
      var meta = pool[i] || {};
      var isSPR = (meta.type === 'spr');
      var radios = qEl.querySelectorAll('input[type=radio]');
      var sprInput = qEl.querySelector('.mock-spr-input');

      if(isSPR && sprInput){
        totalGraded++;
        var val = sprInput.value.trim().toLowerCase();
        var targetAns = String(meta.ans != null ? meta.ans : meta.answer).trim().toLowerCase();
        var isRight = (val === targetAns);

        // evaluate fraction equivalence (e.g. 7/4 vs 1.75)
        if(!isRight && val.indexOf('/') !== -1){
          var parts = val.split('/');
          var num = parseFloat(parts[0]), den = parseFloat(parts[1]);
          if(!isNaN(num) && !isNaN(den) && den !== 0){
            var evalVal = num / den;
            var targetNum = parseFloat(targetAns);
            if(!isNaN(targetNum) && Math.abs(evalVal - targetNum) < 1e-4){
              isRight = true;
            }
          }
        }

        if(isRight){
          correct++;
          sprInput.style.borderColor = '#16a34a';
          sprInput.style.background = '#f0fdf4';
        } else {
          sprInput.style.borderColor = '#dc2626';
          sprInput.style.background = '#fef2f2';
        }

        var resBox = document.createElement('div');
        resBox.style.cssText = 'margin-top:10px;padding:10px 14px;border-radius:8px;font-size:.85rem;line-height:1.6;' + (isRight ? 'background:#f0fdf4;border:1px solid #86efac;color:#166534' : 'background:#fef2f2;border:1px solid #fca5a5;color:#991b1b');
        resBox.innerHTML = '<strong>' + (isRight ? '✓ Correct Answer' : '✗ Incorrect') + '</strong> · Correct answer: <code>' + targetAns + '</code>'
          + (meta.sol ? '<div style="margin-top:6px;border-top:1px dashed rgba(0,0,0,.15);padding-top:6px"><strong>Explanation:</strong> ' + meta.sol + '</div>' : '');
        qEl.appendChild(resBox);

      } else if(radios.length){
        totalGraded++;
        var chosen = -1;
        radios.forEach(function(r){ if(r.checked) chosen = parseInt(r.value, 10); });
        var isRight = (chosen === meta.answer);
        if(isRight) correct++;

        radios.forEach(function(r, ci){
          var row = r.closest('.mock-choice-row');
          if(!row) return;
          if(ci === meta.answer){
            row.style.background = '#f0fdf4';
            row.style.borderColor = '#22c55e';
            row.style.fontWeight = '700';
          } else if(ci === chosen && !isRight){
            row.style.background = '#fef2f2';
            row.style.borderColor = '#ef4444';
          }
        });

        var resBox = document.createElement('div');
        resBox.style.cssText = 'margin-top:10px;padding:10px 14px;border-radius:8px;font-size:.85rem;line-height:1.6;' + (isRight ? 'background:#f0fdf4;border:1px solid #86efac;color:#166534' : 'background:#fef2f2;border:1px solid #fca5a5;color:#991b1b');
        resBox.innerHTML = '<strong>' + (isRight ? '✓ Correct' : '✗ Incorrect') + '</strong>'
          + (meta.sol ? '<div style="margin-top:6px;border-top:1px dashed rgba(0,0,0,.15);padding-top:6px"><strong>Explanation:</strong> ' + meta.sol + '</div>' : '');
        qEl.appendChild(resBox);
      }
    });

    var pct = totalGraded ? Math.round((correct / totalGraded) * 100) : 0;
    var title = document.getElementById('mock-exam-title');
    if(title){
      title.innerHTML = 'Exam Completed — <strong>Score: ' + correct + '/' + totalGraded + ' (' + pct + '%)</strong>';
    }

    var footer = document.getElementById('mock-exam-footer');
    if(footer){
      footer.innerHTML = '<button class="mock-exit-btn" onclick="exitMockExam()" style="background:var(--indigo,#132746);color:#fff;border:none;padding:10px 24px;font-weight:700">Close CBT Simulator</button>';
    }

    if(window.renderMathInElement){
      try { window.renderMathInElement(body, { delimiters: [{left:'$$',right:'$$',display:true},{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}], throwOnError:false }); } catch(e){}
    } else if(window.MathJax && MathJax.typesetPromise){
      MathJax.typesetPromise([body]).catch(function(){});
    }

    body.scrollTop = 0;
  };

  window.exitMockExam = function(){
    if(_tmr){ clearInterval(_tmr); _tmr = null; }
    var overlay = document.getElementById('mock-exam-overlay');
    if(overlay) overlay.classList.remove('show');
  };

})();
