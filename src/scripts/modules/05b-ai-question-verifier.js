/* ── AI question verifier ─────────────────────────────────────────────
   AI-written exam questions used to be shown exactly as the model returned
   them, answer key included, so a confident but wrong key reached students
   unchecked. Every AI question now passes three gates before it is shown,
   and a question that fails any gate is dropped:

   1. Structure — an MCQ has at least 3 non-empty options, an in-range integer
      key, and no two options that read the same.
   2. Key consistency — the prompt asks for "answerValue" (the final answer
      from the worked solution, as plain-text math) and "choiceValues" (each
      option's value). The keyed option must equal answerValue and no other
      option may. Plain numbers and fractions are compared directly; other
      expressions go through ClipSATSymbolicCheck (numeric sampling). A pair
      that cannot be evaluated leaves the question "unchecked", not dropped.
   3. Independent re-solve — a second, temperature-0 call sees only each
      question and its options (no key, no solution) and picks an answer.
      If it disagrees with the key, the question is dropped. Numeric FRQs
      are re-solved the same way against numericAnswer.

   A question that passes gate 3, and gate 2 wherever gate 2 could be
   evaluated, is marked q._verified = true; the renderers show a badge. */
(function(){
  function norm(s){
    return String(s==null?'':s)
      .replace(/\\\(|\\\)|\\\[|\\\]|\\left|\\right|\\,|\\;|\\!|\s+/g,'')
      .replace(/\.$/,'').toLowerCase();
  }
  var NUM_RE=/^\s*(-?\d+(?:\.\d+)?)\s*(?:\/\s*(-?\d+(?:\.\d+)?))?\s*$/;
  function plainNumber(v){
    if(typeof v==='number') return isFinite(v)?v:null;
    var m=NUM_RE.exec(String(v==null?'':v));
    if(!m) return null;
    var a=parseFloat(m[1]), b=m[2]!=null?parseFloat(m[2]):1;
    return b===0?null:a/b;
  }
  /* Resolves to 'equivalent' | 'different' | 'unverifiable'. */
  function sameValue(a,b,vars){
    var na=plainNumber(a), nb=plainNumber(b);
    if(na!==null&&nb!==null){
      return Promise.resolve(Math.abs(na-nb)<=1e-9+1e-6*Math.abs(na)?'equivalent':'different');
    }
    if(a==null||b==null||a===''||b==='') return Promise.resolve('unverifiable');
    if(!window.ClipSATSymbolicCheck) return Promise.resolve('unverifiable');
    return window.ClipSATSymbolicCheck.check(String(a),String(b),vars);
  }

  function structural(q){
    if(!q||typeof q.text!=='string'||!q.text.trim()) return 'no question text';
    if(q.type==='frq') return null;
    if(!Array.isArray(q.choices)||q.choices.length<3) return 'fewer than 3 options';
    if(q.choices.some(function(c){return !norm(c);})) return 'an empty option';
    if(typeof q.answer!=='number'||q.answer%1!==0||q.answer<0||q.answer>=q.choices.length) return 'no valid answer key';
    var seen={};
    for(var i=0;i<q.choices.length;i++){
      var k=norm(q.choices[i]);
      if(seen[k]) return 'two identical options';
      seen[k]=1;
    }
    return null;
  }

  /* Gate 2. Resolves to null (passed), 'unchecked', or a failure reason. */
  function keyConsistency(q){
    if(q.type==='frq') return Promise.resolve(null);
    var cv=q.choiceValues, av=q.answerValue;
    if(!Array.isArray(cv)||cv.length!==q.choices.length||av==null||av==='') return Promise.resolve('unchecked');
    var vars=Array.isArray(q.answerVars)&&q.answerVars.length?q.answerVars:['x'];
    return Promise.all(cv.map(function(v){ return v==null?Promise.resolve('unverifiable'):sameValue(av,v,vars); })).then(function(res){
      if(res[q.answer]==='different') return 'the marked option does not match the worked answer';
      for(var i=0;i<res.length;i++){
        if(i!==q.answer&&res[i]==='equivalent') return 'more than one option equals the answer';
      }
      return res[q.answer]==='equivalent'?null:'unchecked';
    });
  }

  function solverPrompt(){
    return 'You are a meticulous mathematics examiner checking an answer key. For each question, work it out '+
      'carefully and independently, step by step in your head, then report ONLY your final result. '+
      'Return ONLY valid JSON: {"answers":[{"i":0,"choice":2},{"i":3,"value":12.5}]} where "i" is the question '+
      'index given, "choice" is the 0-based index of the correct option for multiple-choice questions, and '+
      '"value" is the final number for free-response questions. If a question is ambiguous or has no correct '+
      'option, use "choice":null.';
  }

  /* Gate 3. Resolves to a map index -> {choice|value} (empty map on failure). */
  function blindSolve(items,call){
    var payload=items.map(function(it){
      var q=it.q, o={i:it.i,question:q.text};
      if(q.type==='frq') o.type='free-response (give one number)';
      else o.options=q.choices;
      if(q.figure) o.figure=q.figure;
      return o;
    });
    if(!payload.length) return Promise.resolve({});
    return call(solverPrompt(),'Questions:\n'+JSON.stringify(payload)).then(function(raw){
      var parsed;
      try{ parsed=JSON.parse(raw); }catch(e){
        var m=String(raw).match(/\{[\s\S]*\}/);
        try{ parsed=m?JSON.parse(m[0]):{}; }catch(e2){ parsed={}; }
      }
      var out={};
      (parsed.answers||[]).forEach(function(a){ if(a&&typeof a.i==='number') out[a.i]=a; });
      return out;
    }).catch(function(){ return {}; });
  }

  /* verify(questions, {call}) → Promise<{kept, dropped:[{q,reason}], checked, total}>
     `call(system, user)` must resolve to the model's raw text reply; the
     caller supplies it so this module stays independent of the provider. */
  function verify(qs,opts){
    var call=opts&&opts.call;
    var dropped=[], live=[];
    (qs||[]).forEach(function(q,i){
      var bad=structural(q);
      if(bad) dropped.push({q:q,reason:bad}); else live.push({q:q,i:i});
    });
    return Promise.all(live.map(function(it){ return keyConsistency(it.q).then(function(r){ it.key=r; return it; }); }))
      .then(function(items){
        var ok=[];
        items.forEach(function(it){
          if(it.key&&it.key!=='unchecked') dropped.push({q:it.q,reason:it.key}); else ok.push(it);
        });
        var solvable=ok.filter(function(it){ return it.q.type!=='frq'||typeof it.q.numericAnswer==='number'; });
        return (call?blindSolve(solvable,call):Promise.resolve({})).then(function(ans){
          var kept=[];
          ok.forEach(function(it){
            var q=it.q, a=ans[it.i], agreed=null;
            if(a){
              if(q.type==='frq'){
                var v=plainNumber(a.value);
                if(v!==null){
                  var tol=typeof q.tolerance==='number'?q.tolerance:1e-6+1e-4*Math.abs(q.numericAnswer);
                  agreed=Math.abs(v-q.numericAnswer)<=tol;
                }
              } else if(typeof a.choice==='number'){
                agreed=a.choice===q.answer;
              }
            }
            if(agreed===false){ dropped.push({q:q,reason:'an independent re-solve got a different answer'}); return; }
            q._verified=(agreed===true)&&(it.key!=='unchecked'||q.type==='frq');
            kept.push(q);
          });
          return {kept:kept,dropped:dropped,checked:kept.filter(function(q){return q._verified;}).length,total:(qs||[]).length};
        });
      });
  }

  /* One-line summary shown above a generated test or paper. */
  function summaryHTML(res,shown){
    var n=res.dropped.length;
    var s='<p class="aiq-verify-summary" style="font-size:.85rem;color:var(--muted);margin:6px 0 12px">'+
      '✓ Every question below was checked before it was shown: '+res.checked+' of '+shown+' passed all checks';
    if(shown>res.checked) s+=' (the rest could not be fully checked automatically and are marked “unchecked”)';
    s+='. ';
    if(n) s+=n+' generated question'+(n===1?' was':'s were')+' removed because '+(n===1?'it':'they')+' failed a check.';
    return s+'</p>';
  }
  function badgeHTML(q){
    return q._verified
      ? '<span class="aiq-badge aiq-badge-ok" title="Answer key matched the worked answer and an independent re-solve">✓ Checked</span>'
      : '<span class="aiq-badge aiq-badge-unchecked" title="Could not be fully verified automatically — check the solution">⚠ Unchecked</span>';
  }

  window.ClipSATVerifyAI={verify:verify,summaryHTML:summaryHTML,badgeHTML:badgeHTML,
    _internal:{structural:structural,keyConsistency:keyConsistency,plainNumber:plainNumber}};
})();
