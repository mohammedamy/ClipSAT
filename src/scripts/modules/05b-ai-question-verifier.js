/* ── AI question review ───────────────────────────────────────────────
   AI-written test and exam questions used to be shown exactly as the model
   returned them, answer key included, so wrong or off-topic questions reached
   students. Every AI question is now reviewed before it is shown, and ONLY
   questions the review confirms are shown:

   1. Structure — an MCQ has at least 3 non-empty options, an in-range integer
      key, and no two options that read the same (after stripping "A." style
      letter prefixes the model wrote into the options). Triangle/polygon
      figures are checked in code: numeric side labels must be in proportion to
      the sides as drawn, satisfy the triangle inequality, and a marked right
      angle must be 90° with a² + b² = c² and the hypotenuse longest.
   2. Key consistency — the prompt asks for "answerValue" (the final answer of
      the worked solution) and "choiceValues" (each option's value) as plain-text
      math. The keyed option must equal answerValue and no other option may.
      Numbers and fractions are compared directly; other expressions go through
      ClipSATSymbolicCheck. A pair that cannot be evaluated is left to gate 3.
   3. Independent review — a second, temperature-0 call sees only each question
      and its options (never the key or the solution). It solves each question
      and judges whether it is in the track's syllabus, at the requested level,
      and well posed. A question is dropped if the reviewer's answer differs from
      the key, if any judgement is false, or if the review did not return a
      verdict for it (a failed review call drops everything rather than showing
      unreviewed questions). FRQs are compared via numericAnswer or answerExpr;
      an FRQ with neither cannot be confirmed and is dropped. */
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

  /* AI replies often write the letter into the option ("A. 12"). The renderer adds its own letter
     and shuffles, which produced "A  B. 18" with letters that no longer match. Strip such prefixes
     when most options carry one. */
  var LETTER_RE=/^\s*\(?([A-Ea-e])[.):]\s+/;
  function stripLetterPrefixes(q){
    if(!q||!Array.isArray(q.choices)) return;
    var hits=q.choices.filter(function(c){ return LETTER_RE.test(String(c)); }).length;
    if(hits*2>=q.choices.length) q.choices=q.choices.map(function(c){ return String(c).replace(LETTER_RE,''); });
  }

  /* Deterministic figure checks for triangles/polygons (renderMathFigure draws side i from
     pts[i] to pts[i+1]). Returns a failure reason or null. */
  function num(lbl){
    var m=/^\s*(-?\d+(?:\.\d+)?)/.exec(String(lbl==null?'':lbl));
    return m?parseFloat(m[1]):null;
  }
  function figureProblem(fig){
    if(!fig||fig.type!=='geometry_2d'||!Array.isArray(fig.shapes)) return null;
    for(var k=0;k<fig.shapes.length;k++){
      var sh=fig.shapes[k];
      if(!sh||(sh.shape!=='triangle'&&sh.shape!=='polygon')||!Array.isArray(sh.pts)||sh.pts.length<3) continue;
      var P=sh.pts, n=P.length;
      var drawn=P.map(function(p,i){ var q2=P[(i+1)%n]; return Math.hypot(q2[0]-p[0],q2[1]-p[1]); });
      var lab=(sh.sides||[]).map(num);
      var ratios=[];
      lab.forEach(function(v,i){ if(v!==null&&v>0&&i<n&&drawn[i]>0) ratios.push(v/drawn[i]); });
      if(ratios.length>=2){
        var hi=Math.max.apply(null,ratios), lo=Math.min.apply(null,ratios);
        if(hi/lo>1.25) return 'the figure\'s side labels do not match the shape drawn';
      }
      if(sh.shape==='triangle'&&n===3){
        var L=[0,1,2].map(function(i){ return lab[i]!=null?lab[i]:null; });
        if(L.every(function(v){ return v!==null&&v>0; })){
          var srt=L.slice().sort(function(a,b){return a-b;});
          if(srt[0]+srt[1]<=srt[2]) return 'the figure\'s side lengths cannot form a triangle';
        }
        if(sh.right_angle!=null){
          var ri=((sh.right_angle%3)+3)%3, A=P[ri], B=P[(ri+1)%3], C=P[(ri+2)%3];
          var u=[B[0]-A[0],B[1]-A[1]], v=[C[0]-A[0],C[1]-A[1]];
          var cos=(u[0]*v[0]+u[1]*v[1])/((Math.hypot(u[0],u[1])*Math.hypot(v[0],v[1]))||1);
          if(Math.abs(cos)>0.09) return 'the figure marks a right angle that is not 90°';
          // legs are the sides meeting at the right-angle vertex; the hypotenuse is opposite it
          var leg1=L[ri], leg2=L[(ri+2)%3], hyp=L[(ri+1)%3];
          if(leg1!=null&&leg2!=null&&hyp!=null&&Math.abs(leg1*leg1+leg2*leg2-hyp*hyp)>0.02*hyp*hyp) return 'the figure\'s right triangle fails a² + b² = c²';
          if(hyp!=null&&((leg1!=null&&leg1>=hyp)||(leg2!=null&&leg2>=hyp))) return 'the figure labels a leg as long as or longer than the hypotenuse';
        }
      }
    }
    return null;
  }

  function structural(q){
    if(!q||typeof q.text!=='string'||!q.text.trim()) return 'no question text';
    var fp=figureProblem(q.figure);
    if(fp) return fp;
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

  function solverPrompt(ctx){
    var syl=ctx&&ctx.syllabus?ctx.syllabus:'the course the questions were written for';
    var lvl=ctx&&ctx.level&&ctx.level!=='all'?ctx.level:null;
    return 'You are a strict, meticulous mathematics examiner reviewing questions before they are given to students. '+
      'You have NOT seen the answer key. For each question: (1) solve it yourself carefully, step by step in your head; '+
      '(2) judge whether it belongs to this syllabus: '+syl+'; '+
      (lvl?'(3) judge whether its difficulty fits the requested level "'+lvl+'"; ':'(3) set level_ok to true; ')+
      '(4) judge whether it is well posed: unambiguous, all needed information given, notation correct, and '+
      '(for multiple choice) exactly one option correct; (5) if a "figure" is given, judge whether it is the right '+
      'kind of diagram for the question and consistent with it (every label agrees with the text, the shape is '+
      'geometrically possible); set figure_ok to true when there is no figure. Be strict: when in doubt, mark it false.\n'+
      'Return ONLY valid JSON: {"answers":[{"i":0,"choice":2,"in_syllabus":true,"level_ok":true,"well_posed":true,"figure_ok":true,"issue":""},'+
      '{"i":3,"value":12.5,"in_syllabus":true,"level_ok":true,"well_posed":true,"figure_ok":true,"issue":""}]}. '+
      '"i" is the question index given. For multiple choice give "choice" (0-based index of the correct option, or null '+
      'if no option is correct). For free response give "value" (the final number) when the answer is a single number, '+
      'otherwise "expr" (the final expression as plain-text math: * for multiplication, ^ for powers, sqrt()/sin()/ln()). '+
      '"issue" is a short reason whenever any judgement is false.';
  }

  /* Review call. Resolves to a map index -> reviewer verdict (empty map on failure). */
  function review(items,call,ctx){
    var payload=items.map(function(it){
      var q=it.q, o={i:it.i,question:q.text};
      if(q.type==='frq') o.type='free-response';
      else o.options=q.choices;
      if(q.figure) o.figure=q.figure;
      return o;
    });
    if(!payload.length) return Promise.resolve({});
    return call(solverPrompt(ctx),'Questions:\n'+JSON.stringify(payload)).then(function(raw){
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

  /* Does the reviewer's own answer match the question's key? Resolves true/false. */
  function agrees(q,a){
    if(q.type!=='frq') return Promise.resolve(typeof a.choice==='number'&&a.choice===q.answer);
    if(typeof q.numericAnswer==='number'){
      var v=plainNumber(a.value!=null?a.value:a.expr);
      if(v===null) return Promise.resolve(false);
      var tol=typeof q.tolerance==='number'?q.tolerance:1e-6+1e-4*Math.abs(q.numericAnswer);
      return Promise.resolve(Math.abs(v-q.numericAnswer)<=tol);
    }
    if(typeof q.answerExpr==='string'&&q.answerExpr.trim()){
      var vars=Array.isArray(q.answerVars)&&q.answerVars.length?q.answerVars:['x'];
      var given=a.expr!=null?a.expr:a.value;
      return sameValue(q.answerExpr,given,vars).then(function(r){ return r==='equivalent'; });
    }
    return Promise.resolve(false); // an FRQ with no checkable final answer cannot be confirmed
  }

  /* verify(questions, {call, syllabus, level}) → Promise<{kept, dropped:[{q,reason}], total}>
     A question is shown only when it passes every gate AND the reviewer confirmed it:
     same answer as the key, in the syllabus, at the level, well posed. Anything the
     review could not confirm (including a failed review call) is dropped, not shown.
     `call(system, user)` must resolve to the model's raw text reply. */
  function verify(qs,opts){
    var call=opts&&opts.call, ctx={syllabus:opts&&opts.syllabus,level:opts&&opts.level};
    var dropped=[], live=[];
    (qs||[]).forEach(function(q,i){
      stripLetterPrefixes(q);
      var bad=structural(q);
      if(bad) dropped.push({q:q,reason:bad}); else live.push({q:q,i:i});
    });
    return Promise.all(live.map(function(it){ return keyConsistency(it.q).then(function(r){ it.key=r; return it; }); }))
      .then(function(items){
        var ok=[];
        items.forEach(function(it){
          if(it.key&&it.key!=='unchecked') dropped.push({q:it.q,reason:it.key}); else ok.push(it);
        });
        return (call?review(ok,call,ctx):Promise.resolve({})).then(function(ans){
          return Promise.all(ok.map(function(it){
            var a=ans[it.i];
            if(!a) return {it:it,reason:'the review could not confirm it'};
            if(a.in_syllabus===false) return {it:it,reason:'outside the syllabus'};
            if(a.level_ok===false) return {it:it,reason:'not at the requested level'};
            if(a.well_posed===false) return {it:it,reason:'ambiguous or badly posed'};
            if(a.figure_ok===false) return {it:it,reason:'the figure does not match the question'};
            return agrees(it.q,a).then(function(same){ return {it:it,reason:same?null:'the review got a different answer'}; });
          })).then(function(results){
            var kept=[];
            results.forEach(function(r){
              if(r.reason) dropped.push({q:r.it.q,reason:r.reason});
              else { r.it.q._verified=true; kept.push(r.it.q); }
            });
            return {kept:kept,dropped:dropped,total:(qs||[]).length};
          });
        });
      });
  }

  /* One-line summary shown above a generated test or paper. */
  function summaryHTML(res,shown){
    var n=res.dropped.length;
    var s='<p class="aiq-verify-summary" style="font-size:.85rem;color:var(--muted);margin:6px 0 12px">'+
      '✓ All '+shown+' question'+(shown===1?'':'s')+' below passed review before being shown: the answer key was '+
      'confirmed by an independent re-solve, and each question was checked for syllabus fit, level and clarity. ';
    if(n){
      var by={};
      res.dropped.forEach(function(d){ by[d.reason]=(by[d.reason]||0)+1; });
      s+=n+' generated question'+(n===1?' was':'s were')+' removed ('+Object.keys(by).map(function(k){ return by[k]+' '+k; }).join('; ')+').';
    }
    return s+'</p>';
  }
  function badgeHTML(q){
    return q._verified
      ? '<span class="aiq-badge aiq-badge-ok" title="Answer confirmed by an independent re-solve; checked for syllabus fit, level and clarity">✓ Reviewed</span>'
      : '';
  }

  window.ClipSATVerifyAI={verify:verify,summaryHTML:summaryHTML,badgeHTML:badgeHTML,
    _internal:{structural:structural,keyConsistency:keyConsistency,plainNumber:plainNumber,figureProblem:figureProblem,stripLetterPrefixes:stripLetterPrefixes}};
})();
