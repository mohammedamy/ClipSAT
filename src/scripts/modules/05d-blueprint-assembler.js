/* ── Blueprint assembler: build a test/paper slot by slot ──────────────
   A model asked for "a full ACT paper" drifts from the real exam: wrong topic
   mix, wrong difficulty profile, wrong counts per part. Here the code decides
   the paper and the model only fills slots:

   1. plan()  — every question is a slot {part, topic, difficulty, type, calc}.
      Topic counts come from the blueprint weights (largest-remainder rounding
      over all slots of a type), difficulty counts from the blueprint mix per
      part; ascending exams (ACT) run easy → hard.
   2. fill()  — slots are generated in small per-topic batches, each question
      tied to its slot, then reviewed (05b) with the slot's topic and difficulty
      as targets: a question that tests another topic or sits at another
      difficulty is rejected like a wrong one. Empty slots get one more AI
      round, then a question from the checked bank with the same topic and
      difficulty. The result matches the blueprint exactly.
   3. complianceHTML() — the plan vs. the paper, shown above it. */
(function(){
  function largestRemainder(weights,total){
    var sum=weights.reduce(function(a,b){return a+b;},0)||1;
    var raw=weights.map(function(w){ return w/sum*total; });
    var out=raw.map(Math.floor), left=total-out.reduce(function(a,b){return a+b;},0);
    raw.map(function(r,i){ return {i:i,f:r-Math.floor(r)+Math.random()*1e-6}; })
      .sort(function(a,b){ return b.f-a.f; }).slice(0,left).forEach(function(x){ out[x.i]++; });
    return out;
  }
  function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  var LEVEL={easy:'easy',medium:'medium',hard:'hard',basic:'easy',intermediate:'medium',advanced:'hard'};
  var RANK={easy:0,medium:1,hard:2};

  /* parts: [{title,q,type,calc,time,notes}]; level: 'all' or one difficulty. */
  function plan(bp,parts,level){
    var slots=[], lv=LEVEL[String(level||'all').toLowerCase()];
    parts.forEach(function(p,pi){
      var mix=lv?[lv==='easy'?1:0,lv==='medium'?1:0,lv==='hard'?1:0]:[bp.difficulty.easy,bp.difficulty.medium,bp.difficulty.hard];
      var dc=largestRemainder(mix,p.q), diffs=[];
      ['easy','medium','hard'].forEach(function(d,k){ for(var j=0;j<dc[k];j++) diffs.push(d); });
      if(bp.order!=='ascending') shuffle(diffs);
      var aos=[];
      if(bp.ao){
        var names=Object.keys(bp.ao), ac=largestRemainder(names.map(function(a){ return bp.ao[a].weight; }),p.q);
        names.forEach(function(a,k){ for(var j=0;j<ac[k];j++) aos.push(a); });
        shuffle(aos);
      }
      diffs.forEach(function(d,j){ slots.push({part:pi,type:p.type==='frq'?'frq':'mcq',calc:p.calc,difficulty:d,ao:aos[j]}); });
    });
    /* Topics are shared out over all slots of a type; with bp.calcWeights ({nocalc:[…], calc:[…]},
       aligned with bp.topics) the calculator and non-calculator slots each get their own mix. */
    function assign(group,weights){
      if(!group.length) return;
      var counts=largestRemainder(weights,group.length), topics=[];
      counts.forEach(function(c,ti){ for(var j=0;j<c;j++) topics.push(ti); });
      shuffle(topics).forEach(function(ti,k){ group[k].topic=ti; });
    }
    var overall=bp.topics.map(function(t){return t.weight;});
    ['mcq','frq'].forEach(function(type){
      var ofType=slots.filter(function(s){ return s.type===type; });
      if(bp.calcWeights){
        assign(ofType.filter(function(s){ return s.calc===false; }),bp.calcWeights.nocalc);
        assign(ofType.filter(function(s){ return s.calc===true; }),bp.calcWeights.calc);
        assign(ofType.filter(function(s){ return s.calc!==false&&s.calc!==true; }),overall);
      } else assign(ofType,overall);
    });
    slots.forEach(function(s,i){ s.id=i; });
    return slots;
  }

  function parseQuestions(raw){
    var p;
    try{ p=JSON.parse(raw); }catch(e){
      var m=String(raw).match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      try{ p=m?JSON.parse(m[0]):[]; }catch(e2){ p=[]; }
    }
    return Array.isArray(p)?p:((p&&p.questions)||[]);
  }

  var DIFF_TEXT='Difficulty means: easy = a routine one- or two-step question most prepared students answer correctly; '+
    'medium = several steps or combining two ideas; hard = multi-step, non-routine or the hardest style this exam actually uses. '+
    'Match the real exam\'s question style for that difficulty.';

  /* Generate + review one round for the given slots. Resolves {byId, dropped}. */
  function round(slots,bp,ctx){
    var batches=[], byTopic={};
    slots.forEach(function(s){ var k=s.topic+'|'+s.type; (byTopic[k]=byTopic[k]||[]).push(s); });
    Object.keys(byTopic).forEach(function(k){ var a=byTopic[k]; for(var i=0;i<a.length;i+=8) batches.push(a.slice(i,i+8)); });
    var byId={}, dropped=[], done=0;
    function one(batch){
      var t=bp.topics[batch[0].topic];
      var want=batch.map(function(s){
        var o={slot:s.id,type:s.type,topic:t.name,topic_covers:t.desc,difficulty:s.difficulty,calculator:s.calc===undefined?'as on the real exam':(s.calc?'allowed':'NOT allowed')};
        if(s.ao) o.assessment_objective=s.ao+' — '+bp.ao[s.ao].desc;
        return o;
      });
      var user='Write exactly one question for EACH slot below, following each slot\'s topic, difficulty, type and calculator rule exactly. '+
        DIFF_TEXT+(bp.exclude?' '+bp.exclude+' Never write questions on excluded content.':'')+
        (ctx.options?' Every multiple-choice question has exactly '+ctx.options+' answer choices, as on the real exam.':'')+
        ' Every question must test a different skill or idea from the others; never write the same question twice with different numbers, names or context.'+
        ' Every question object must include "slot" (the slot number given). Return JSON: {"questions":[...]}.'+
        (ctx.avoid&&ctx.avoid.length?'\nThe paper already contains the questions below. Do not repeat any of them, rephrase them, or test the same idea by the same method:\n- '+ctx.avoid.slice(0,80).join('\n- '):'')+
        '\nSlots:\n'+JSON.stringify(want);
      return ctx.generate(ctx.system,user).then(function(raw){
        var qs=parseQuestions(raw).filter(function(q){ return q&&typeof q.slot==='number'; });
        var slotById={}; batch.forEach(function(s){ slotById[s.id]=s; });
        qs=qs.filter(function(q){ return slotById[q.slot]&&slotById[q.slot].type===(q.type==='frq'?'frq':'mcq'); });
        var wrongCount=qs.filter(function(q){ return q.type!=='frq'&&ctx.options&&Array.isArray(q.choices)&&q.choices.length!==ctx.options; });
        wrongCount.forEach(function(q){ dropped.push({q:q,reason:'wrong number of answer choices for this exam'}); });
        qs=qs.filter(function(q){ return wrongCount.indexOf(q)<0; });
        qs.forEach(function(q){ var s=slotById[q.slot]; q.domain=t.name; q._target={topic:t.name+' — '+t.desc,difficulty:s.difficulty}; });
        return window.ClipSATVerifyAI.verify(qs,{call:ctx.review,syllabus:ctx.syllabus,level:'all'});
      }).then(function(res){
        res.kept.forEach(function(q){ if(!byId[q.slot]) byId[q.slot]=q; });
        dropped=dropped.concat(res.dropped);
      }).catch(function(){}).then(function(){ done++; if(ctx.progress) ctx.progress(done,batches.length); });
    }
    /* three calls in flight at a time */
    var queue=batches.slice(), running=[];
    function next(){ if(!queue.length) return Promise.resolve(); return one(queue.shift()).then(next); }
    for(var w=0;w<Math.min(3,batches.length);w++) running.push(next());
    return Promise.all(running).then(function(){ return {byId:byId,dropped:dropped}; });
  }

  function loadBanks(viewId,bp){
    var tracks={}; tracks[viewId]=1;
    bp.topics.forEach(function(t){ t.bank.forEach(function(b){ var m=/^([a-z0-9]+):/.exec(b); if(m) tracks[m[1]]=1; }); });
    return Promise.all(Object.keys(tracks).map(function(tr){ return window.CS_loadTrackBank?window.CS_loadTrackBank(tr):null; }))
      .then(function(){ return window.fullExamBank||{}; });
  }
  function bankPick(viewId,topic,slot,used,banks,options,accept){
    var cands=[];
    topic.bank.forEach(function(ref){
      var m=/^([a-z0-9]+):(.*)$/.exec(ref), tr=m?m[1]:viewId, dom=m?m[2]:ref;
      ((banks[tr]&&banks[tr].pool)||[]).forEach(function(q){
        if(q.domain!==dom||used.has(q)||(q.type||'mcq')!==(slot.type==='frq'?'frq':'mcq')) return;
        /* an MCQ must have exactly as many options as the exam uses (4-option exams skip old 5-option items) */
        if(slot.type!=='frq'&&options&&q.choices&&q.choices.length!==options) return;
        cands.push(q);
      });
    });
    var exact=cands.filter(function(q){ return String(q.difficulty||'').toLowerCase()===slot.difficulty; });
    var pool=shuffle(exact.length?exact:cands), q=null;
    for(var i=0;i<pool.length&&!q;i++) if(!accept||accept(pool[i])) q=pool[i];
    if(!q) return null;
    used.add(q);
    var c={}; for(var k in q) if(Object.prototype.hasOwnProperty.call(q,k)) c[k]=q[k];
    c.domain=topic.name; c._fromBank=true; c._bankDifficulty=String(q.difficulty||'').toLowerCase();
    return c;
  }

  /* fill(ctx) → Promise<{slots, dropped, aiCount, bankCount, empty}>
     ctx: {viewId, blueprint, slots, system, syllabus, options (MCQ option count), generate(sys,user), review(sys,user), progress(done,total,phase)} */
  function fill(ctx){
    var bp=ctx.blueprint, slots=ctx.slots, dropped=[], repeats=0, R=window.ClipSATRedundancy;
    function prog(phase){ return function(d,t){ if(ctx.progress) ctx.progress(d,t,phase); }; }
    function clear(s,reason){ dropped.push({q:s.q,reason:reason}); s.q=null; repeats++; }
    /* No repeated questions or ideas: local check, then one examiner review of the whole paper. */
    function dedupe(){
      if(!R) return;
      var filled=slots.filter(function(s){ return s.q; });
      R.findRepeats(filled.map(function(s){ return s.q; })).forEach(function(r){ clear(filled[r.index],r.reason); });
      filled=slots.filter(function(s){ return s.q; });
      return R.examinerReview(filled.map(function(s){ return s.q; }),ctx.review).then(function(reps){
        reps.forEach(function(r){ if(filled[r.index].q) clear(filled[r.index],'tests the same idea as another question in the paper'); });
      });
    }
    return round(slots,bp,Object.assign({},ctx,{progress:prog('writing')})).then(function(r1){
      dropped=dropped.concat(r1.dropped);
      slots.forEach(function(s){ if(r1.byId[s.id]) s.q=r1.byId[s.id]; });
      return dedupe();
    }).then(function(){
      var missing=slots.filter(function(s){ return !s.q; });
      if(!missing.length) return;
      var keep=R?R.tracker(slots.filter(function(s){ return s.q; }).map(function(s){ return s.q; })):null;
      return round(missing,bp,Object.assign({},ctx,{progress:prog('rewriting rejected or repeated questions'),avoid:keep?keep.stems():[]})).then(function(r2){
        dropped=dropped.concat(r2.dropped);
        missing.forEach(function(s){
          var q=r2.byId[s.id]; if(!q) return;
          if(keep&&!keep.add(q)){ dropped.push({q:q,reason:'repeats the idea of an earlier question'}); repeats++; return; }
          s.q=q;
        });
      });
    }).then(function(){
      var missing=slots.filter(function(s){ return !s.q; });
      if(!missing.length) return;
      var keep=R?R.tracker(slots.filter(function(s){ return s.q; }).map(function(s){ return s.q; })):null;
      return loadBanks(ctx.viewId,bp).then(function(banks){
        var used=new Set();
        missing.forEach(function(s){
          var q=bankPick(ctx.viewId,bp.topics[s.topic],s,used,banks,ctx.options,keep?keep.accepts:null);
          if(q){ if(keep) keep.add(q); s.q=q; }
        });
      });
    }).then(function(){
      var ai=slots.filter(function(s){ return s.q&&!s.q._fromBank; }).length;
      var bank=slots.filter(function(s){ return s.q&&s.q._fromBank; }).length;
      return {slots:slots,dropped:dropped,repeats:repeats,aiCount:ai,bankCount:bank,empty:slots.length-ai-bank};
    });
  }

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function complianceHTML(bp,res){
    var slots=res.slots, n=slots.length;
    var rows=bp.topics.map(function(t,ti){
      var planned=slots.filter(function(s){ return s.topic===ti; }).length;
      var got=slots.filter(function(s){ return s.topic===ti&&s.q; }).length;
      return {t:t,planned:planned,got:got};
    });
    var wsum=bp.topics.reduce(function(a,t){return a+t.weight;},0)||1;
    var dcount={easy:0,medium:0,hard:0};
    slots.forEach(function(s){ if(s.q) dcount[s.difficulty]++; });
    var h='<details class="bp-compliance" open><summary>Exam blueprint — how this paper matches the real exam</summary>';
    h+='<table class="bp-table"><thead><tr><th>Topic</th><th>Exam weight</th><th>Questions</th></tr></thead><tbody>';
    rows.forEach(function(r){
      h+='<tr><td>'+esc(r.t.name)+'</td><td>'+(r.t.weight/wsum*100).toFixed(1)+'%</td><td>'+r.got+(r.got!==r.planned?' of '+r.planned:'')+'</td></tr>';
    });
    h+='</tbody></table>';
    h+='<p class="bp-note">Difficulty: '+dcount.easy+' easy · '+dcount.medium+' medium · '+dcount.hard+' hard'+
      (bp.order==='ascending'?' (ordered easy → hard, as on the real exam)':'')+'. ';
    if(bp.ao){
      var ac={};
      slots.forEach(function(s){ if(s.q&&s.ao) ac[s.ao]=(ac[s.ao]||0)+1; });
      h+='Assessment objectives: '+Object.keys(bp.ao).map(function(a){ return a+' '+(ac[a]||0)+' (target '+bp.ao[a].weight+'%)'; }).join(' · ')+'. ';
    }
    h+=res.aiCount+' AI-written question'+(res.aiCount===1?'':'s')+' passed review';
    if(res.bankCount) h+=', '+res.bankCount+' slot'+(res.bankCount===1?' was':'s were')+' filled from the checked question bank';
    if(res.empty) h+=', '+res.empty+' slot'+(res.empty===1?'':'s')+' could not be filled';
    h+='. '+res.dropped.length+' generated question'+(res.dropped.length===1?' was':'s were')+' rejected in review'+
      (res.repeats?' ('+res.repeats+' for repeating a question or idea already in the paper)':'')+
      '. No question or idea appears twice.</p>';
    h+='<p class="bp-source">'+(bp.provisional?'⚠ ':'')+'Source: '+esc(bp.source)+'</p></details>';
    return h;
  }

  window.ClipSATAssembler={plan:plan,fill:fill,complianceHTML:complianceHTML,_largestRemainder:largestRemainder};
})();
