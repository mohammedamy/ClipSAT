/* The student's view of an assignment link (ADR 0047). Ships as public/js/assignment-view.js;
   22c loads it when the page is opened with ?assign=<key>.<key>… . It shows those questions at
   the top of the track page, marked on the spot with the chapter quiz's own markup and cqPick(),
   so it looks and scores like a chapter quiz. */
(function(){
'use strict';
Object.assign(_TT_STR.en,{
  avTitle:'Assignment', avIntro:'Answer every question. Each one is marked as soon as you choose an answer.',
  avLoading:'Loading the assignment…', avNoBank:'This assignment could not be loaded. Check your connection and reload the page.',
  avMissing:'question(s) in this assignment are no longer in the question bank and are not shown.',
  avNone:'None of this assignment\'s questions are in the question bank any more. Ask your teacher for a new link.',
  avShowSol:'Show solution', avDone:'When you have answered every question, go back to Google Classroom and mark the assignment as done.',
  avAnswered:'Answered:', avScore:'Score:'
});
Object.assign(_TT_STR.ar,{
  avTitle:'واجب', avIntro:'أجب عن جميع الأسئلة. تُصحَّح كل إجابة فور اختيارها.',
  avLoading:'جارٍ تحميل الواجب…', avNoBank:'تعذّر تحميل الواجب. تحقّق من الاتصال وأعد تحميل الصفحة.',
  avMissing:'سؤال (أسئلة) من هذا الواجب لم تعد في بنك الأسئلة ولا تظهر.',
  avNone:'لم يعد أيّ من أسئلة هذا الواجب في بنك الأسئلة. اطلب من معلمك رابطًا جديدًا.',
  avShowSol:'عرض الحل', avDone:'بعد الإجابة عن جميع الأسئلة، ارجع إلى Google Classroom وحدّد الواجب كمكتمل.',
  avAnswered:'تمت الإجابة:', avScore:'الدرجة:'
});

var LTR=['A','B','C','D','E','F'];
function keys(){ var loc=typeof location!=='undefined'?location:(typeof window!=='undefined'&&window.location?window.location:{search:''}); var m=/[?&]assign=([0-9a-z.]+)/.exec(loc.search); return m?m[1].split('.').filter(Boolean):null; }
function attr(s){ return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/\n/g,' '); }
function bankOf(viewId){
  var b=window.fullExamBank&&window.fullExamBank[viewId];
  if(!b) return null;
  return Array.isArray(b)?b:(b.pool||[].concat(b.easy||[],b.medium||[],b.hard||[]));
}

function render(){
  var want=keys(), viewId=window.CLIPSAT_TRACK, main=viewId&&document.getElementById('view-'+viewId);
  if(!want||!main||!window.CS_loadTrackBank) return;
  var M=window.CSQuizMath||function(s){ return String(s||''); };
  var box=document.getElementById('cs-assignment');
  if(!box){
    box=document.createElement('section');
    box.id='cs-assignment';
    box.className='wrap cs-assignment';
    box.setAttribute('dir',_ttDir());
    box.style.cssText='margin:18px auto';
    main.insertBefore(box,main.querySelector('.calc-body')||main.firstChild);
  }
  box.innerHTML='<p class="cq-msg">'+_tt('avLoading')+'</p>';
  box.scrollIntoView({block:'start'});
  window.CS_loadTrackBank(viewId).then(function(){
    var bank=bankOf(viewId);
    if(!bank){ box.innerHTML='<p class="cq-msg">'+_tt('avNoBank')+'</p>'; return; }
    var byKey={};
    bank.forEach(function(q){ var k=window.CSAssignKey(q); if(!(k in byKey)) byKey[k]=q; });
    var qs=want.map(function(k){ return byKey[k]; }).filter(Boolean), missing=want.length-qs.length;
    if(!qs.length){ box.innerHTML='<p class="cq-msg">'+_tt('avNone')+'</p>'; return; }
    var figs=[], nMcq=0;
    var h='<div class="cq-paper"><div class="cq-head"><span>'+_tt('avTitle')+'</span><span class="cq-meta">'+qs.length+' · '+_tt('questionsWord')+'</span></div>'
      +'<p class="cq-msg">'+_tt('avIntro')+'</p>';
    if(missing) h+='<p class="cq-msg cs-assign-missing">'+missing+' '+_tt('avMissing')+'</p>';
    qs.forEach(function(q,i){
      var choices=q.choices||[], sol=q.sol||q.explanation||'';
      /* multiple choice only with a valid answer index; otherwise the student checks the solution */
      var mcq=choices.length>0&&typeof q.answer==='number'&&q.answer>=0&&q.answer<choices.length;
      if(mcq) nMcq++;
      h+='<div class="cq-item"'+(mcq?' data-ans="'+q.answer+'"':'')+' data-raw="'+attr(q.text||q.q)+'">';
      var _f = q.figure || q.fig || q.table;
      if(_f){
        if(typeof _f === 'string'){
          h+='<div class="cq-figure">'+_f+'</div>';
        } else if(_f.type === 'table' || _f.headers || _f.rows){
          var _hdrs=(_f.headers||[]).map(function(th){return '<th>'+M(th!=null?String(th):'')+'</th>';}).join('');
          var _rws=(_f.rows||_f.data||[]).map(function(r){
            return '<tr>'+(Array.isArray(r)?r.map(function(c){return '<td>'+M(c!=null?String(c):'')+'</td>';}).join(''):'<td>'+M(r!=null?String(r):'')+'</td>')+'</tr>';
          }).join('');
          h+='<div class="cq-figure"><table class="exam-table">'+(_hdrs?'<thead><tr>'+_hdrs+'</tr></thead>':'')+'<tbody>'+_rws+'</tbody></table></div>';
        } else if(window._renderFig){
          h+='<div class="cq-figure">'+window._renderFig(_f)+'</div>';
        } else if(window.renderMathFigure){
          h+='<div class="cq-figure">'+window.renderMathFigure(_f)+'</div>';
        } else {
          h+='<div class="cq-figure" data-fig="'+figs.length+'"></div>'; figs.push(_f);
        }
      }
      h+='<div class="cq-row"><span class="cq-qn">'+(i+1)+'.</span><div class="cq-qt">'+M(q.text||q.q||'')+'</div></div>';
      if(mcq){
        h+='<ul class="cq-opts">'+choices.map(function(c,ci){
          var s=typeof window.CSAutoMath==='function'?window.CSAutoMath(c):String(c||'');
          return '<li class="cq-opt" onclick="cqPick(this)" data-raw="'+attr(c)+'"><span class="cq-lt">'+LTR[ci]+'.</span><span class="cq-ct">'+M(s)+'</span></li>';
        }).join('')+'</ul>';
      } else if(sol){
        h+='<button type="button" class="cq-print-btn" onclick="var s=this.nextElementSibling;s.style.display=\'block\';this.remove()">'+_tt('avShowSol')+'</button>';
      }
      if(sol) h+='<div class="cq-sol-box" style="display:none"><strong>Solution:</strong> '+M(sol)+'</div>';
      h+='</div>';
    });
    if(nMcq) h+='<div class="cq-score-bar">'+_tt('avAnswered')+' <strong class="cq-ans-v">0</strong> / '+nMcq
      +' &nbsp;|&nbsp; '+_tt('avScore')+' <strong class="cq-sv">0</strong> / '+nMcq+'</div>';
    h+='<p class="cq-msg">'+_tt('avDone')+'</p></div>';
    box.innerHTML=h;

    var paper=box.querySelector('.cq-paper');
    if(paper && nMcq > 0){
      paper.addEventListener('click', function(e){
        var opt = e.target.closest('.cq-opt');
        if(!opt) return;
        setTimeout(function(){
          var done = paper.querySelectorAll('.cq-item.cq-done').length;
          if(done === nMcq){
            _showCompletionCert(paper, nMcq, viewId);
          }
        }, 60);
      });
    }

    if(figs.length&&window._ensureFigures){
      window._ensureFigures().then(function(){
        paper.querySelectorAll('.cq-figure[data-fig]').forEach(function(el){
          var _fItem = figs[+el.getAttribute('data-fig')];
          if(_fItem && (_fItem.type === 'table' || _fItem.headers || _fItem.rows)){
            var _hdrs=(_fItem.headers||[]).map(function(th){return '<th>'+M(th!=null?String(th):'')+'</th>';}).join('');
            var _rws=(_fItem.rows||_fItem.data||[]).map(function(r){
              return '<tr>'+(Array.isArray(r)?r.map(function(c){return '<td>'+M(c!=null?String(c):'')+'</td>';}).join(''):'<td>'+M(r!=null?String(r):'')+'</td>')+'</tr>';
            }).join('');
            el.innerHTML='<table class="exam-table">'+(_hdrs?'<thead><tr>'+_hdrs+'</tr></thead>':'')+'<tbody>'+_rws+'</tbody></table>';
          } else if(window._renderFig){
            el.innerHTML=window._renderFig(_fItem);
          }
          el.removeAttribute('data-fig');
        });
      },function(err){
        paper.querySelectorAll('.cq-figure[data-fig]').forEach(function(el){ el.textContent=err.message; el.removeAttribute('data-fig'); });
      });
    }
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([box]).catch(function(){});
  },function(){ box.innerHTML='<p class="cq-msg">'+_tt('avNoBank')+'</p>'; });
}

function _genCertCode(track, score, total){
  var salt = 48271;
  var sum = 0;
  var str = (track || 'math').toLowerCase() + ':' + score + '/' + total;
  for(var i = 0; i < str.length; i++) sum = (sum * 31 + str.charCodeAt(i)) % 65535;
  var hex = (sum ^ salt).toString(16).toUpperCase().padStart(4, '0');
  return 'CLIP-' + (track || 'MATH').toUpperCase() + '-' + score + 'OF' + total + '-' + hex;
}

function _showCompletionCert(paper, total, trackId){
  if(paper.querySelector('#cs-assign-cert')) return;
  var sv = paper.querySelector('.cq-sv');
  var score = sv ? parseInt(sv.textContent, 10) : 0;
  var pct = Math.round((score / total) * 100);
  var code = _genCertCode(trackId, score, total);

  var cert = document.createElement('div');
  cert.id = 'cs-assign-cert';
  cert.className = 'cs-assign-cert';
  cert.style.cssText = 'margin-top:16px;background:var(--paper,#ffffff);border:1.5px solid var(--border,#cbd5e1);border-radius:12px;padding:18px 20px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,.07)';

  var waText = encodeURIComponent('ClipSAT Assignment Completed!\nTrack: ' + (trackId || '').toUpperCase() + '\nScore: ' + score + '/' + total + ' (' + pct + '%)\nVerification Code: ' + code);

  var isRTL = typeof _ttDir === 'function' && _ttDir() === 'rtl';
  cert.innerHTML = [
    '<div style="font-size:1.8rem;margin-bottom:4px">🎓</div>',
    '<h3 style="margin:0 0 6px;font-size:1.25rem;font-weight:800;color:var(--ink,#1e293b)">' + (isRTL?'اكتمل الواجب بنجاح!':'Assignment Completed!') + '</h3>',
    '<div style="font-size:1.15rem;font-weight:800;color:var(--indigo,#4f46e5);margin-bottom:8px">',
      (isRTL?'الدرجة النهائية: ':'Final Score: ') + '<span class="cs-cert-score">' + score + ' / ' + total + '</span> (' + pct + '%)',
    '</div>',
    '<div style="margin:8px auto 14px;display:inline-block;background:var(--subtle,#f1f5f9);padding:6px 12px;border-radius:6px;font-family:var(--mono,monospace);font-size:.85rem;color:var(--ink,#1e293b);border:1px dashed var(--border,#cbd5e1)">',
      (isRTL?'رمز التحقق: ':'Verification Code: ') + '<strong>' + code + '</strong>',
    '</div>',
    '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">',
      '<button type="button" id="cs-cert-copy" class="btn btn-primary" style="padding:6px 14px;font-size:.82rem;font-weight:600;cursor:pointer">📋 ' + (isRTL?'نسخ الرمز للمعلم':'Copy Code for Teacher') + '</button>',
      '<a href="https://wa.me/?text=' + waText + '" target="_blank" rel="noopener" class="btn btn-secondary" style="padding:6px 14px;font-size:.82rem;font-weight:600;background:#25D366;color:#fff;border-color:#25D366;text-decoration:none;display:inline-flex;align-items:center;gap:4px">💬 WhatsApp</a>',
      '<button type="button" onclick="window.print()" class="btn btn-secondary" style="padding:6px 14px;font-size:.82rem;font-weight:600;cursor:pointer">📄 ' + (isRTL?'طباعة النتيجة':'Print PDF') + '</button>',
    '</div>'
  ].join('');

  paper.appendChild(cert);
  cert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  var copyBtn = cert.querySelector('#cs-cert-copy');
  if(copyBtn){
    copyBtn.onclick = function(){
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(code).then(function(){
          copyBtn.textContent = '✓ ' + (isRTL?'تم النسخ!':'Copied!');
          setTimeout(function(){ copyBtn.textContent = '📋 ' + (isRTL?'نسخ الرمز للمعلم':'Copy Code for Teacher'); }, 2000);
        });
      }
    };
  }
}

window.CSVerifyCertCode = function(code){
  if(!code) return null;
  var m = /^CLIP-([A-Z0-9]+)-(\d+)OF(\d+)-([A-F0-9]{4})$/i.exec(String(code).trim());
  if(!m) return { valid: false, error: 'Invalid code format' };
  var track = m[1].toLowerCase(), score = parseInt(m[2], 10), total = parseInt(m[3], 10), hex = m[4].toUpperCase();
  var salt = 48271, sum = 0, str = track + ':' + score + '/' + total;
  for(var i = 0; i < str.length; i++) sum = (sum * 31 + str.charCodeAt(i)) % 65535;
  var expectedHex = (sum ^ salt).toString(16).toUpperCase().padStart(4, '0');
  if(hex !== expectedHex) return { valid: false, error: 'Tampered verification code' };
  return { valid: true, track: track, score: score, total: total, pct: Math.round((score/total)*100) };
};

window.CSAssignView={render:render, genCertCode:_genCertCode, verifyCertCode:window.CSVerifyCertCode};
render();
})();
