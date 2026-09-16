function clearMistakes(){
  if(!confirm('Clear all '+_mistakes.length+' recorded mistakes?')) return;
  _mistakes = []; _saveMistakes();
  var btn = document.getElementById('mistakeBtn');
  if(btn) btn.textContent = '📋 Mistakes';
  openMistakes();
}

function reviewMistakeAt(startIdx){
  if(_mistakes.length===0) return;
  closeMistakes();
  var stack=[_mistakes[startIdx]].concat(
    _mistakes.filter(function(_,i){return i!==startIdx;}).slice().reverse()
  );
  var idx=0, removed=[];
  function showCard(){
    if(idx>=stack.length){
      if(removed.length>0){
        _mistakes=_mistakes.filter(function(m){return removed.indexOf(m)===-1;});
        _saveMistakes();
      }
      var ov=document.getElementById('mq-review-overlay');
      if(ov) ov.innerHTML='<div style="background:var(--panel);border-radius:14px;padding:32px;text-align:center;max-width:480px;margin:auto">'
        +'<div style="font-size:2.5rem;margin-bottom:12px">&#127881;</div>'
        +'<h3 style="color:var(--indigo);margin:0 0 8px">Done!</h3>'
        +'<p style="color:var(--muted)">Cleared <b>'+removed.length+'</b> mistake'+(removed.length!==1?'s':'')+'.</p>'
        +'<button onclick="window._closeMqReview()" style="margin-top:16px;padding:10px 28px;background:var(--indigo);color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700">Close</button>'
        +'</div>';
      return;
    }
    var m=stack[idx];
    var ov=document.getElementById('mq-review-overlay');
    if(!ov) return;
    var aiPrompt='I got this question wrong. Please explain it step by step.\nQuestion: '+m.q+'\nI answered: '+m.wrong+'\nCorrect answer: '+m.right;
    ov.innerHTML='<div style="background:var(--panel);border-radius:14px;padding:24px 28px;max-width:560px;width:90%;margin:auto">'
      +'<div style="font-size:.78rem;color:var(--muted);margin-bottom:14px">Mistake '+(idx+1)+' of '+stack.length
      +(m.src?' &middot; '+escHtml(m.src):'')+'</div>'
      +'<p style="font-size:.95rem;line-height:1.6;margin:0 0 18px;color:var(--ink)">'+escHtml(m.q)+'</p>'
      +'<div style="background:#fee2e2;border-radius:8px;padding:10px 14px;margin-bottom:10px">'
      +'<span style="font-size:.75rem;font-weight:700;color:#b91c1c;display:block;margin-bottom:4px">&#x2717; Your answer</span>'
      +'<span style="color:#7f1d1d">'+escHtml(m.wrong)+'</span></div>'
      +'<div style="background:#dcfce7;border-radius:8px;padding:10px 14px;margin-bottom:16px">'
      +'<span style="font-size:.75rem;font-weight:700;color:#15803d;display:block;margin-bottom:4px">&#x2713; Correct answer</span>'
      +'<span style="color:#14532d">'+escHtml(m.right)+'</span></div>'
      +'<div style="display:flex;gap:8px;margin-bottom:10px">'
      +'<button onclick="mqGotIt()" style="flex:1;padding:10px;background:#16a34a;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700">&#x2713; Got it!</button>'
      +'<button onclick="mqStillUnsure()" style="flex:1;padding:10px;background:var(--paper-2);color:var(--ink);border:1px solid var(--line);border-radius:8px;cursor:pointer">Still unsure</button>'
      +'</div>'
      +'<button onclick="window._closeMqReview();window.openChatWith(this.dataset.p)" data-p="'+aiPrompt.replace(/"/g,'&quot;')+'" '
      +'style="width:100%;padding:8px;background:#eff6ff;border:1.5px solid #3b82f6;border-radius:8px;cursor:pointer;color:#1d4ed8;font-weight:600;margin-bottom:6px">&#129302; I don\'t get it &#8212; explain this</button>'
      +'<button onclick="window._closeMqReview()" style="display:block;width:100%;padding:6px;background:transparent;border:none;color:var(--muted);cursor:pointer;font-size:.8rem">Exit review</button>'
      +'</div>';
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([ov]).catch(function(){});
  }
  window.mqGotIt=function(){removed.push(stack[idx]);idx++;showCard();};
  window.mqStillUnsure=function(){
    var m=stack[idx];
    idx++;
    window._pqMistake=m;
    launchPracticeQuiz(m);
  };
  var existing=document.getElementById('mq-review-overlay');
  if(existing) existing.remove();
  var ov=document.createElement('div');
  ov.id='mq-review-overlay';
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:99500;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto';
  document.body.appendChild(ov);
  showCard();
}
window._closeMqReview=function(){var o=document.getElementById('mq-review-overlay');if(o)o.remove();};
function reviewMistakes(){
  if(_mistakes.length===0){ alert('No mistakes to review yet! Answer some quiz questions first.'); return; }
  closeMistakes();
  // Build flashcard-style review from stored mistakes
  // Pick up to 5 random mistakes for a focused session
  var all = _mistakes.slice();
  for(var i=all.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=all[i];all[i]=all[j];all[j]=t;}
  var stack = all.slice(0,5);
  var idx = 0;
  var removed = [];

  function showCard(){
    if(idx >= stack.length){
      // Done
      if(removed.length > 0){
        _mistakes = _mistakes.filter(function(m){
          return removed.indexOf(m) === -1;
        });
        _saveMistakes();
      }
      var overlay = document.getElementById('mq-review-overlay');
      if(overlay){
        overlay.innerHTML = '<div style="background:var(--panel);border-radius:14px;padding:32px;text-align:center;max-width:480px;margin:auto">'
          + '<div style="font-size:2.5rem;margin-bottom:12px">🎉</div>'
          + '<h3 style="color:var(--indigo);margin:0 0 8px">Review Complete!</h3>'
          + '<p style="color:var(--muted)">Reviewed <b>'+stack.length+'</b> mistake'+(stack.length!==1?'s':'')
          +'.<br>Cleared <b>'+removed.length+'</b> you got right.</p>'
          + '<button onclick="window._closeMqReview()" '
          + 'style="margin-top:16px;padding:10px 28px;background:var(--indigo);color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700">Done</button>'
          + '</div>';
      }
      return;
    }
    var m = stack[idx];
    var overlay = document.getElementById('mq-review-overlay');
    if(!overlay) return;
    var progress = '<div style="font-size:.78rem;color:var(--muted);margin-bottom:14px">Mistake '+(idx+1)+' of '+stack.length+'</div>';
    /* auto-wrap raw LaTeX (no delimiters) so MathJax can typeset it */
    var _wm = function(s){
      if(!s) return '';
      s = String(s);
      if(s.indexOf('\\(')===-1 && s.indexOf('\\[')===-1 && /\\[a-zA-Z{([\\]/.test(s)) s='\\('+s+'\\)';
      return s;
    };
    var qText = _wm(m.q || '(Question text not saved)');
    var wrongTxt = _wm(m.wrong || '?');
    var rightTxt = _wm(m.right || '?');
    var src = m.src ? '<div style="font-size:.75rem;color:var(--muted);margin-bottom:10px">📚 '+m.src+'</div>' : '';
    overlay.innerHTML = '<div style="background:var(--panel);border-radius:14px;padding:24px 28px;max-width:560px;width:90%;margin:auto;position:relative">'
      + '<button onclick="window._closeMqReview&&window._closeMqReview()" style="position:absolute;top:10px;right:14px;background:none;border:none;font-size:1.4rem;line-height:1;cursor:pointer;color:var(--muted);padding:2px 6px;border-radius:4px" title="Close">&times;</button>'
      + progress + src
      + '<p style="font-size:.95rem;line-height:1.6;margin:0 0 18px;color:var(--ink)">'+qText+'</p>'
      + '<div style="background:#fee2e2;border-radius:8px;padding:10px 14px;margin-bottom:10px">'
      + '<span style="font-size:.75rem;font-weight:700;color:#b91c1c;display:block;margin-bottom:4px">✗ Your answer</span>'
      + '<span style="color:#7f1d1d">'+wrongTxt+'</span></div>'
      + '<div style="background:#dcfce7;border-radius:8px;padding:10px 14px;margin-bottom:20px">'
      + '<span style="font-size:.75rem;font-weight:700;color:#15803d;display:block;margin-bottom:4px">✓ Correct answer</span>'
      + '<span style="color:#14532d">'+rightTxt+'</span></div>'
      + '<div style="display:flex;gap:10px">'
      + '<button onclick="mqGotIt()" style="flex:1;padding:10px;background:#16a34a;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700">✓ Got it!</button>'
      + '<button onclick="mqStillUnsure()" style="flex:1;padding:10px;background:var(--paper-2);color:var(--ink);border:1px solid var(--line);border-radius:8px;cursor:pointer">Still unsure</button>'
      + '</div>'
      + '<button onclick="window._closeMqReview()" '
      + 'style="display:block;width:100%;margin-top:10px;padding:6px;background:transparent;border:none;color:var(--muted);cursor:pointer;font-size:.8rem">Exit review</button>'
      + '</div>';
    if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([overlay]).catch(function(){});
  }

  window.mqGotIt = function(){
    removed.push(stack[idx]);
    idx++;
    showCard();
  };
  window.mqStillUnsure = function(){
    var m = stack[idx];
    idx++;
    /* Launch AI practice quiz on this specific mistake */
    window._pqMistake = m;
    launchPracticeQuiz(m);
  };

  // Create overlay
  var existing = document.getElementById('mq-review-overlay');
  if(existing) existing.remove();
  var ov = document.createElement('div');
  ov.id = 'mq-review-overlay';
  ov.style.cssText = 'position:fixed;inset:0;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:99500;display:flex;align-items:center;justify-content:center;padding:16px';
  document.body.appendChild(ov);
  showCard();
}
/* Tag-aware escape — mirrors _maths()'s algorithm (PR #54's inline-math
   angle-bracket fix). Question text can legitimately contain either real
   HTML markup (quantitative-comparison questions' <strong>/<br>/<em>, e.g.
   in reviewMistakeAt's "Quiz me on this" review, which reuses this exact
   m.q/m.wrong/m.right data) or bare "<"/">" used as a math comparison
   operator (e.g. "0 < 5 < 11") — sometimes both in the same string. A
   blind escape breaks the first case (visible literal "<strong>" text);
   this only escapes "<"/">" that aren't the start of a real tag. */
function escHtml(s){
  if(!s) return '';
  s = String(s);
  var out='', i=0, L=s.length;
  while(i<L){
    if(s[i]==='<' && i+1<L && (s[i+1]==='/' || /[a-zA-Z]/.test(s[i+1]))){
      var tj=s.indexOf('>', i);
      if(tj!==-1){ out+=s.slice(i, tj+1); i=tj+1; continue; }
    }
    var c=s[i];
    if(c==='&') out+='&amp;';
    else if(c==='<') out+='&lt;';
    else if(c==='>') out+='&gt;';
    else out+=c;
    i++;
  }
  return out;
}

// Update button count on load
(function(){
  var btn = document.getElementById('mistakeBtn');
  if(btn && _mistakes.length > 0) btn.textContent = '📋 Mistakes ('+_mistakes.length+')';
})();

/* ── EXAM TIMER ── */
