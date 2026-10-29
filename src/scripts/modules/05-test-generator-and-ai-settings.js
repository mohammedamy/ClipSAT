(function(){
'use strict';

/* ── helpers ───────────────────────────────────────────────────── */
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
window.esc = window.esc || esc;

/* ── AI Settings ────────────────────────────────────────────────────
   All AI features route through the server-side Supabase AI proxy, which
   requires signing in with a free account. Personal client-side keys are
   deprecated and removed for security. */
window.openAISettings=function(){
  if(window.openCloudAuthModal) window.openCloudAuthModal();
};
window.closeAISettings=function(){};
window.saveAISettings=function(){};
window.aiEnabled=function(){ return window._openrouterEnabled?window._openrouterEnabled():false; };

/* AI generates the test when AI is available, unless the visitor picks
   "Question bank" in the .tg-source select (test-generator.njk). Every AI
   question is reviewed (05b-ai-question-verifier.js) before it is shown. */
function aiSourceChosen(btn){
  var box=btn&&btn.closest('.testgen');
  var sel=box&&box.querySelector('.tg-source');
  if(sel&&sel.value==='bank') return false;
  return window.aiEnabled();
}
/* The AI exam pipeline — AI tests and papers (05a), review (05b), blueprints (05c),
   assembler (05d) — ships as
   public/js/ai-exam.js and loads the first time an AI test or paper is generated
   (Plan 5 Phase 5.015, ADR 0037). Touching a test generator warms the load. */
var _aiExamPromise=null;
window._ensureAIExam=function(){
  var figsReady = (typeof window._ensureFigures === 'function') ? window._ensureFigures().catch(function(){}) : Promise.resolve();
  if(window.CSAITest&&window.ClipSATAssembler&&window.ClipSATBlueprints&&window.ClipSATVerifyAI&&window.CSBankExam) return figsReady;
  if(_aiExamPromise) return Promise.all([_aiExamPromise, figsReady]);
  /* the AI pipeline reads window.examSpecs, which ships in bank-exam.js (ADR 0042) */
  _aiExamPromise=Promise.all([window._ensureBankExam(), figsReady]).then(function(){ return new Promise(function(resolve,reject){
    var s=document.createElement('script');
    s.src='/js/ai-exam.js?v=20261022d';
    s.onload=function(){ (window.ClipSATAssembler&&window.CSAITest)?resolve():reject(new Error('ai-exam.js did not register')); };
    s.onerror=function(){ reject(new Error('The exam generator could not load. Check your connection and try again.')); };
    document.head.appendChild(s);
  }); }).catch(function(err){ _aiExamPromise=null; throw err; });
  return _aiExamPromise;
};
['pointerdown','focusin'].forEach(function(ev){
  document.addEventListener(ev,function(e){
    if(!window.ClipSATAssembler&&e.target&&e.target.closest&&e.target.closest('.testgen')&&window.aiEnabled&&window.aiEnabled())
      window._ensureAIExam().catch(function(){});
  },true);
});
/* The SVG figure renderers (window.renderMathFigure) ship in public/js/figures.js
   (02c-figures.js) with 02's _renderFig, and load on demand (ADR 0045). */

/* ── genTest: the question bank here; the AI path lives in 05a-ai-test.js, which ships
   inside public/js/ai-exam.js and loads the first time an AI test is generated (ADR 0041). ── */
function _runAI(btn,run,optViewId){
  var out=(optViewId&&document.getElementById(optViewId+'-exam-out'))||(btn&&btn.closest('.testgen')&&btn.closest('.testgen').querySelector('.tg-out'));
  if(out&&!window.CSAITest) out.innerHTML='<div class="ai-gen-loading"><div class="ai-spinner"></div><p>Loading the exam generator…</p></div>';
  return window._ensureAIExam().then(run).catch(function(err){
    if(out) out.innerHTML='<p class="tg-empty" style="color:#dc2626">Error: '+esc(err.message)+'</p>';
  });
}
function _renderQFig(q){
  var f = q.figure || q.fig || q.table;
  if(!f) return '';
  if(typeof f === 'string') return f;
  if(f.type === 'table' || Array.isArray(f.headers) || Array.isArray(f.rows)){
    var hdrs = (Array.isArray(f.headers)?f.headers:[]).map(function(th){
      return '<th>' + (typeof window._autoMath === 'function' ? window._autoMath(th != null ? String(th) : '') : th) + '</th>';
    }).join('');
    var rawRows = Array.isArray(f.rows) ? f.rows : (Array.isArray(f.data) ? f.data : []);
    var rws = rawRows.map(function(r){
      return '<tr>' + (Array.isArray(r) ? r.map(function(c){
        return '<td>' + (typeof window._autoMath === 'function' ? window._autoMath(c != null ? String(c) : '') : c) + '</td>';
      }).join('') : '<td>' + String(r) + '</td>') + '</tr>';
    }).join('');
    return '<div class="table-wrap"><table class="exam-table">' + (hdrs ? '<thead><tr>' + hdrs + '</tr></thead>' : '') + '<tbody>' + rws + '</tbody></table></div>';
  }
  if(typeof window._renderFig === 'function') return window._renderFig(f);
  if(typeof window.renderMathFigure === 'function') return window.renderMathFigure(f);
  return '';
}

window.genTest=function(btn, optTrackId){
  var box=btn.closest('.testgen'); if(!box) return;
  if(!aiSourceChosen(btn)) return _genTestOriginal(btn, optTrackId);
  return _runAI(btn,function(){ return window.CSAITest.genTest(btn, optTrackId); });
};

// Generates practice test: draws from real question bank with guaranteed diagrams when available, falls back to DOM practice problems
function _genTestOriginal(btn, optTrackId){
  var box=btn.closest('.testgen'); if(!box) return;
  var view=btn.closest('main[id^="view-"]');
  var trackId=String(optTrackId || (view && view.id.replace('view-','')) || window.CLIPSAT_TRACK || 'sat').toLowerCase().trim();
  if(!trackId || trackId==='home') trackId='sat';

  var out=box.querySelector('.tg-out');
  if(!out){
    var nextSib=box.nextElementSibling;
    if(nextSib && nextSib.classList && nextSib.classList.contains('tg-out')) out=nextSib;
  }
  if(!out){
    var sec=btn.closest('section');
    if(sec){ var outs=sec.querySelectorAll('.tg-out'); out=outs[outs.length-1]; }
  }

  var n=parseInt(box.querySelector('.tg-count').value,10)||10;
  var lvl=box.querySelector('.tg-level').value;
  var lvlMap={basic:'easy',intermediate:'medium',advanced:'hard',easy:'easy',medium:'medium',hard:'hard'};
  var lvlNorm=lvlMap[String(lvl||'all').toLowerCase()]||String(lvl||'all').toLowerCase();

  if(out) out.innerHTML='<div class="ai-gen-loading"><div class="ai-spinner"></div><p>Assembling practice test from question bank…</p></div>';

  var loadBank=(window.fullExamBank && window.fullExamBank[trackId] && window.fullExamBank[trackId].pool)
    ? Promise.resolve(window.fullExamBank[trackId])
    : (window.CS_loadTrackBank ? window.CS_loadTrackBank(trackId) : Promise.resolve(null));

  var loadFigs=(typeof window._ensureFigures==='function')
    ? window._ensureFigures().catch(function(){})
    : Promise.resolve();
  var loadBankExam=(typeof window._ensureBankExam==='function')
    ? window._ensureBankExam().catch(function(){})
    : Promise.resolve();

  Promise.all([loadBank, loadFigs, loadBankExam]).then(function(res){
    var bank=res[0];
    var isIBTrack=(trackId==='ibsl'||trackId==='ibhl');
    if(bank && (bank.pool || bank.easy || bank.medium || bank.hard)){
      var allPool=[];
      if(Array.isArray(bank.pool) && bank.pool.length){
        allPool=bank.pool.slice();
      } else {
        var _cvt=function(a,diff){
          return (a||[]).map(function(q){
            return Object.assign({}, q, {
              type: q.type || 'mcq',
              difficulty: q.difficulty || diff,
              domain: q.domain || q.topic || 'Mathematics',
              text: q.text || q.q || '',
              choices: q.choices || [],
              answer: q.answer,
              ans: q.ans,
              sol: q.sol || q.exp || q.expl || '',
              figure: q.figure || q.fig,
              marks: q.marks,
              paper: q.paper,
              course: q.course,
              ibSection: q.ibSection,
              calc: q.calc
            });
          });
        };
        allPool=_cvt(bank.easy,'easy').concat(_cvt(bank.medium,'medium')).concat(_cvt(bank.hard,'hard'));
      }

      // Filter out meta trivia
      allPool=allPool.filter(function(q){
        var d=(q.domain||q.topic||'').toLowerCase();
        return d.indexOf('format')===-1 && d.indexOf('strategy')===-1 && d.indexOf('overview')===-1;
      });

      var pool=(lvlNorm==='all') ? allPool.slice() : allPool.filter(function(q){
        return String(q.difficulty||'').toLowerCase()===lvlNorm;
      });
      if(!pool.length) pool=allPool.slice();

      /* For IB tracks (ibsl / ibhl), prioritize authentic multi-part FRQ items first */
      if(isIBTrack){
        var ibFrqPool = pool.filter(function(q){ return q.type === 'frq'; });
        var ibOtherPool = pool.filter(function(q){ return q.type !== 'frq'; });
        pool = ibFrqPool.concat(ibOtherPool);
      }

      // Guarantee healthy presence of diagrams and graphs (target ~25%-35% diagrams)
      var withFig=pool.filter(function(q){ return !!(q.figure || q.fig || q.table); });
      var noFig=pool.filter(function(q){ return !(q.figure || q.fig || q.table); });

      if(isIBTrack){
        /* Shuffle within FRQ and non-FRQ buckets so structured IB FRQs always take priority */
        var wfFrq=withFig.filter(function(q){return q.type==='frq';}), wfOth=withFig.filter(function(q){return q.type!=='frq';});
        var nfFrq=noFig.filter(function(q){return q.type==='frq';}), nfOth=noFig.filter(function(q){return q.type!=='frq';});
        var _shuf=function(arr){for(var i=arr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[j];arr[j]=t;}return arr;};
        withFig=_shuf(wfFrq).concat(_shuf(wfOth));
        noFig=_shuf(nfFrq).concat(_shuf(nfOth));
      } else {
        for(var wf=withFig.length-1;wf>0;wf--){var rwf=Math.floor(Math.random()*(wf+1));var twf=withFig[wf];withFig[wf]=withFig[rwf];withFig[rwf]=twf;}
        for(var nf=noFig.length-1;nf>0;nf--){var rnf=Math.floor(Math.random()*(nf+1));var tnf=noFig[nf];noFig[nf]=noFig[rnf];noFig[rnf]=tnf;}
      }

      var targetFigs=Math.min(withFig.length, Math.max(1, Math.ceil(n * 0.30)));
      if(isIBTrack) targetFigs=Math.min(withFig.length, Math.max(1, Math.ceil(n * 0.45)));
      var pick=[];
      var tracker=window.ClipSATRedundancy ? window.ClipSATRedundancy.tracker() : null;
      var seenStems=new Set();

      for(var f=0;f<withFig.length && pick.length<targetFigs;f++){
        var qf=withFig[f], kf=(qf.text||qf.q||'').trim();
        if(!seenStems.has(kf) && (!tracker || tracker.add(qf))){
          seenStems.add(kf);
          pick.push(qf);
        }
      }

      var remainder=noFig.concat(withFig.filter(function(x){ return pick.indexOf(x)===-1; }));
      for(var r=0;r<remainder.length && pick.length<n;r++){
        var qr=remainder[r], kr=(qr.text||qr.q||'').trim();
        if(!seenStems.has(kr) && (!tracker || tracker.add(qr))){
          seenStems.add(kr);
          pick.push(qr);
        }
      }

      if(pick.length<n && allPool.length>pick.length){
        for(var a=0;a<allPool.length && pick.length<n;a++){
          var qa=allPool[a], ka=(qa.text||qa.q||'').trim();
          if(!seenStems.has(ka) && (!tracker || tracker.add(qa))){
            seenStems.add(ka);
            pick.push(qa);
          }
        }
      }

      /* If still under n due to strict idea template filtering, backfill from non-duplicate items */
      if(pick.length<n && pool.length>pick.length){
        for(var b=0;b<pool.length && pick.length<n;b++){
          var qb=pool[b], kb=(qb.text||qb.q||'').trim();
          if(!seenStems.has(kb) && (!tracker || tracker.add(qb))){
            seenStems.add(kb);
            pick.push(qb);
          }
        }
      }

      // Shuffle picked so diagram questions are distributed naturally
      for(var s=pick.length-1;s>0;s--){var js=Math.floor(Math.random()*(s+1));var ts=pick[s];pick[s]=pick[js];pick[js]=ts;}

      /* MANDATORY PRE-DISPLAY EXAMINER REVISION PASS */
      var revReport=null;
      if(window.CSExamRevisionPass){
        var revRes=window.CSExamRevisionPass(pick, {
          viewId: trackId,
          isIB: isIBTrack,
          fallbackPool: allPool
        });
        pick = revRes.items;
        revReport = revRes.report;
      }

      if(out){
        out.innerHTML='';
        if(revReport && window.CSRenderRevisionBanner){
          out.insertAdjacentHTML('beforeend', window.CSRenderRevisionBanner(revReport, isIBTrack));
        }
        var head=document.createElement('div'); head.className='tg-head';
        var lvlLabel=(lvl==='all'?'all levels':lvl);
        head.innerHTML='<span class="tg-title">'+(isIBTrack?'IB DP Written Practice Paper ('+trackId.toUpperCase()+')':'Generated test ('+trackId.toUpperCase()+')')+'</span><span class="tg-meta">'+pick.length+' question'+(pick.length===1?'':'s')+(revReport&&isIBTrack?' · ['+revReport.totalMarks+' marks]':'')+' · '+lvlLabel+'</span>';
        out.appendChild(head);

        var _csCaptureQ=[];
        var letters=['A','B','C','D','E'];
        var _fmtBi=window.CSFormatBilingual || function(str){ return str; };
        var _autoMath=window.CSAutoMath || function(str){ return str; };

        pick.forEach(function(q, idx){
          var isMCQ=!isIBTrack && (q.type==='mcq'||(!q.type && q.choices && q.choices.length));
          var _fHtml=_renderQFig(q);
          var qText=(q.text||q.q||'').trim();
          var qDiff=q.difficulty||lvlNorm;
          if(qDiff==='all') qDiff='medium';
          var qMarks=Number(q.marks)||(isIBTrack?6:1);

          var chHtml='';
          if(isMCQ && q.choices && q.choices.length){
            chHtml='<div class="tg-choices-list" style="margin:12px 0;display:flex;flex-direction:column;gap:6px">';
            q.choices.forEach(function(ch, ci){
              var letStr=letters[ci]||String.fromCharCode(65+ci);
              chHtml+='<div class="tg-choice-item" style="display:flex;align-items:flex-start;gap:8px;padding:8px 12px;background:var(--paper-2,#f8fafc);border:1px solid var(--border,#e2e8f0);border-radius:6px;font-size:.95rem">'
                + '<span style="font-weight:700;color:var(--indigo,#1e3e70);min-width:20px">'+letStr+'.</span>'
                + '<span style="flex:1">'+_fmtBi(_autoMath(String(ch!=null?ch:'')))+'</span>'
                + '</div>';
            });
            chHtml+='</div>';
          }

          var ansLabel=(isMCQ && q.answer!=null && letters[q.answer])?(' ('+letters[q.answer]+')'):(q.ans?(' ['+q.ans+']'):'');
          var solText=q.sol||q.exp||q.expl||('Answer: '+(q.ans||q.answer||'N/A'));

          var hintHtml = (window.CSHintEngine && typeof window.CSHintEngine.renderHintWidget === 'function')
            ? window.CSHintEngine.renderHintWidget(q, 'tg-' + (idx + 1))
            : '';

          var probHtml='<div class="problem bank-problem" data-qid="'+(idx+1)+'">'
            + '<div class="problem-head" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;margin-bottom:8px">'
            + '  <div style="display:flex;align-items:center;gap:6px"><span class="pn">'+(idx+1)+'</span>'
            + '  <span class="lvl '+qDiff+'">'+qDiff.charAt(0).toUpperCase()+qDiff.slice(1)+'</span>'
            + (isIBTrack?'<span style="font-weight:700;font-size:.82rem;color:#1e293b">[Maximum mark: '+qMarks+']</span>':'')
            + (isIBTrack&&q.paper?'<span style="font-size:.74rem;background:#eef2ff;color:#312e81;padding:2px 7px;border-radius:4px;border:1px solid #c7d2fe">'+esc(q.paper)+(q.ibSection?' · '+esc(q.ibSection):'')+'</span>':'')
            + '  </div>'
            + '  <span class="p-domain" style="font-size:.76rem;color:var(--muted,#64748b);background:var(--paper-2,#f1f5f9);padding:2px 8px;border-radius:4px">'+esc(q.domain||q.topic||'Mathematics')+'</span>'
            + '</div>'
            + '<div class="pq">'
            + (_fHtml?'<div class="mfig" style="margin:10px auto 14px;text-align:center">'+_fHtml+'</div>':'')
            + '<div class="pq-stem" style="font-size:1rem;line-height:1.6;white-space:pre-line">'+_fmtBi(_autoMath(qText))+'</div>'
            + chHtml
            + '</div>'
            + hintHtml
            + '<button type="button" class="sol-toggle" onclick="this.parentElement.classList.toggle(\'open\')"><span class="tw">▸</span> '+(isIBTrack?'Show Official IB Markscheme':'Show solution')+'</button>'
            + '<div class="sol"><div class="sol-inner" style="padding:10px 14px;background:var(--paper-2,#f8fafc);border-radius:6px;border-left:3px solid var(--indigo,#1e3e70);margin-top:8px;white-space:pre-line"><strong>'+(isIBTrack?'Official IB Markscheme ['+qMarks+' marks]':'Answer')+ansLabel+':</strong><br>'+_fmtBi(_autoMath(solText))+'</div></div>'
            + '</div>';

          out.insertAdjacentHTML('beforeend', probHtml);

          var _tgAns = !isMCQ ? (q.ans != null ? String(q.ans) : (q.sprAnswer != null ? String(q.sprAnswer) : (q.answer != null ? String(q.answer) : ''))) : '';
          _csCaptureQ.push({
            text: qText,
            choices: isMCQ && q.choices ? q.choices.slice() : [],
            correctIndex: isMCQ && q.answer!=null ? q.answer : null,
            type: isMCQ ? 'mcq' : (q.type === 'spr' ? 'spr' : 'frq'),
            points: qMarks,
            ans: _tgAns,
            sol: q.sol || q.exp || '',
            figure: q.figure || q.fig || null,
            figureHtml: _fHtml || null
          });
        });

        var ans=box.querySelector('.tg-ans');if(ans){ans.setAttribute('data-state','hidden');ans.textContent='Show all answers';}
        if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){});
        out.scrollIntoView({behavior:'smooth',block:'nearest'});
        if(pick.length) document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genTest-bank',title:'Generated test ('+trackId.toUpperCase()+')',trackId:trackId,questions:_csCaptureQ,outEl:out}}));
        return;
      }
    }

    // Fallback: scrape from section practice problems
    _genTestLegacy(btn);
  }).catch(function(err){
    console.error('genTest error:', err);
    _genTestLegacy(btn);
  });
}

function _genTestLegacy(btn){
  var box=btn.closest('.testgen'); if(!box) return;
  var view=btn.closest('main[id^="view-"]'); if(!view) return;
  var practice=view.querySelector('section[id$="-practice"]'); if(!practice) return;
  var pool=Array.prototype.slice.call(practice.querySelectorAll('.problem'));
  var n=parseInt(box.querySelector('.tg-count').value,10)||10;
  var lvl=box.querySelector('.tg-level').value;
  var lvlMap={basic:'easy',intermediate:'medium',advanced:'hard',easy:'easy',medium:'medium',hard:'hard'};
  var lvlNorm=lvlMap[String(lvl||'all').toLowerCase()]||String(lvl||'all').toLowerCase();
  var filtered=(lvlNorm==='all')?pool.slice():pool.filter(function(p){
    var L=p.querySelector('.lvl');
    if(!L) return false;
    var lt=L.textContent.trim().toLowerCase();
    var ltNorm=lvlMap[lt]||lt;
    return ltNorm===lvlNorm;
  });
  if(!filtered.length) filtered=pool.slice();
  // shuffle
  for(var i=filtered.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=filtered[i];filtered[i]=filtered[j];filtered[j]=t;}
  var _ideas=window.ClipSATRedundancy?window.ClipSATRedundancy.tracker():null, pick=[], skipped=[];
  var pickedStems=new Set();
  function _stem(el){ var pq=el.querySelector('.pq')||el; return (pq.textContent||'').trim(); }

  for(var _i=0;_i<filtered.length&&pick.length<n;_i++){
    var st=_stem(filtered[_i]);
    if(pickedStems.has(st)) continue;
    var _body=filtered[_i].cloneNode(true); var _sol=_body.querySelector('.sol'); if(_sol) _sol.remove();
    if(!_ideas||_ideas.add(_body.textContent)){
      pick.push(filtered[_i]);
      pickedStems.add(st);
    } else {
      skipped.push(filtered[_i]);
    }
  }
  if(pick.length<n && skipped.length){
    for(var _j=0;_j<skipped.length&&pick.length<n;_j++){
      var stj=_stem(skipped[_j]);
      if(!pickedStems.has(stj)){
        pick.push(skipped[_j]);
        pickedStems.add(stj);
      }
    }
  }
  if(pick.length<n && pool.length>pick.length){
    for(var _k=0;_k<pool.length&&pick.length<n;_k++){
      var stk=_stem(pool[_k]);
      if(!pickedStems.has(stk)){
        pick.push(pool[_k]);
        pickedStems.add(stk);
      }
    }
  }
  var out=box.querySelector('.tg-out');
  if(!out){
    var nextSib=box.nextElementSibling;
    if(nextSib && nextSib.classList && nextSib.classList.contains('tg-out')) out=nextSib;
  }
  if(!out) return;
  out.innerHTML='';
  var head=document.createElement('div'); head.className='tg-head';
  var lvlLabel=(lvl==='all'?'all levels':lvl);
  head.innerHTML='<span class="tg-title">Generated test</span><span class="tg-meta">'+pick.length+' question'+(pick.length===1?'':'s')+' · '+lvlLabel+'</span>';
  out.appendChild(head);
  if(!pick.length){var e=document.createElement('p');e.className='tg-empty';e.textContent='No questions match that filter.';out.appendChild(e);return;}
  var _csCaptureQ=[];
  pick.forEach(function(p,idx){
    var c=p.cloneNode(true);c.classList.remove('open');
    var pn=c.querySelector('.pn');if(pn) pn.textContent=(idx+1);
    var st=c.querySelector('.sol-toggle');
    if(st){var tw=st.querySelector('.tw');if(tw) tw.textContent='▸';if(st.childNodes[1]) st.childNodes[1].textContent=' Show solution';}
    out.appendChild(c);
    var pq=c.querySelector('.pq');
    var solEl=c.querySelector('.sol');
    var figEl=c.querySelector('.mfig, .cq-figure, .fep-figure, .figure-container, svg');
    var _fHtml=figEl?(figEl.tagName.toLowerCase()==='svg'?figEl.outerHTML:figEl.innerHTML):null;
    _csCaptureQ.push({text:pq?pq.innerHTML:'',choices:[],correctIndex:null,type:'frq',points:1,ans:'',sol:solEl?solEl.innerHTML:'',figure:null,figureHtml:_fHtml});
  });
  var ans=box.querySelector('.tg-ans');if(ans){ans.setAttribute('data-state','hidden');ans.textContent='Show all answers';}
  if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]);
  out.scrollIntoView({behavior:'smooth',block:'nearest'});
  if(pick.length) document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genTest-legacy',title:'Generated test',trackId:(view&&view.id.replace('view-',''))||'',questions:_csCaptureQ,outEl:out}}));
}

/* ── tgReveal override (works with AI questions too) ── */
window.tgReveal=function(btn){
  var box=btn.closest('.testgen');
  var out=box.querySelector('.tg-out');
  var show=btn.getAttribute('data-state')!=='shown';
  // Standard problems
  out.querySelectorAll('.problem').forEach(function(p){
    p.classList.toggle('open',show);
    var st=p.querySelector('.sol-toggle');if(st&&st.childNodes[1]) st.childNodes[1].textContent=' '+(show?'Hide solution':'Show solution');
  });
  // AI questions
  out.querySelectorAll('.aiq-solution').forEach(function(sol){
    sol.classList.toggle('open',show);
    var tb=sol.previousElementSibling;
    if(tb&&tb.classList.contains('aiq-sol-toggle')) tb.textContent=show?'▾ Hide solution':'▸ Show solution';
  });
  btn.setAttribute('data-state',show?'shown':'hidden');
  btn.textContent=show?'Hide all answers':'Show all answers';
  if(show&&window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){});
};

/* ── genFullExam: the question bank in 02; the AI path in 05a-ai-test.js ───────────────────────── */
var _origGenFullExam=window.genFullExam;
window.genFullExam=function(btn,examName,viewId,sectionTitles,qPerSection){
  if(!aiSourceChosen(btn)) return _origGenFullExam&&_origGenFullExam(btn,examName,viewId,sectionTitles,qPerSection);
  return _runAI(btn,function(){ return window.CSAITest.genFullExam(btn,examName,viewId,sectionTitles,qPerSection); }, viewId);
};

/* ── Show AI badge in nav when enabled ───────────────── */
(function(){
  var btn=document.querySelector('.ai-settings-btn');
  if(!btn) return;
  btn.textContent='⚙ AI ✓';
  btn.style.background='linear-gradient(135deg,#16a34a,#0891b2)';
})();

})(); // end IIFE

/* ─────────────────────────────────────────────── */

