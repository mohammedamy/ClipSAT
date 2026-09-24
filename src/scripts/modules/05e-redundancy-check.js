/* ── Redundancy check: no repeated questions or repeated ideas in one paper ──
   Used by the blueprint assembler (AI papers and bank fills), the bank full-exam
   builder and the bank practice test.

   Two layers:
   1. A local check. Two questions are the same question when their normalised text
      matches. They test the same idea when their text matches once numbers and
      single-letter names are masked — the "same question with new numbers" pattern —
      or when their masked word pairs overlap by 75% or more.
   2. An examiner review (AI papers only). The whole paper goes to the reviewer model
      once, which names any question that tests the same skill by the same method
      as an earlier one. The assembler rewrites those slots with the rest of the paper
      listed as "do not repeat". */
(function(){
  function plain(q){
    var t=typeof q==='string'?q:((q&&(q.text||q.q))||'');
    return String(t).replace(/<[^>]*>/g,' ').replace(/\\[()\[\]]/g,' ').replace(/\\(?:left|right|displaystyle|,|;|!|quad)/g,' ')
      .replace(/\\([a-zA-Z]+)/g,' $1 ').replace(/[{}$]/g,' ').toLowerCase();
  }
  /* exact text, numbers kept */
  function exactKey(q){ return plain(q).replace(/[^a-z0-9.+\-*/=<>^%]+/g,' ').replace(/\s+/g,' ').trim(); }
  /* numbers → #, single-letter names → v: the question's template */
  function templateTokens(q){
    return plain(q).replace(/\d+(?:[.,]\d+)?/g,' # ').replace(/\b[a-z]\b/g,' v ').replace(/[+\-]/g,' ± ')
      .replace(/([±*/=<>^%()])/g,' $1 ').replace(/[^a-z#v±*/=<>^%()]+/g,' ').trim().split(/\s+/).filter(Boolean);
  }
  function pairs(tokens){ var s={}; for(var i=0;i+1<tokens.length;i++) s[tokens[i]+' '+tokens[i+1]]=1; return s; }
  function jaccard(a,b){
    var n=0,u=0,k;
    for(k in a){ u++; if(b[k]) n++; }
    for(k in b) if(!a[k]) u++;
    return u?n/u:0;
  }
  function sig(q){
    var t=templateTokens(q);
    return {exact:exactKey(q),tpl:t.join(' '),pairs:pairs(t),len:t.length,fig:!!(q&&(q.figure||q.fig))};
  }
  /* Returns '' or the reason two questions are redundant. Short generic stems that lean
     on a figure ("In the figure above, what is x?") are left to the examiner review. */
  function compare(a,b){
    if(!a.exact||!b.exact) return '';
    if(a.exact===b.exact) return 'repeats an earlier question';
    if(a.len<6&&(a.fig||b.fig)) return '';
    if(a.tpl===b.tpl) return 'repeats the idea of an earlier question with different numbers';
    if(Math.min(a.len,b.len)>=6&&jaccard(a.pairs,b.pairs)>=0.75) return 'repeats the idea of an earlier question';
    return '';
  }
  function redundantWith(q,others){
    var s=sig(q);
    for(var i=0;i<others.length;i++){ var r=compare(s,others[i]._sig||(others[i]._sig=sig(others[i].q||others[i]))); if(r) return r; }
    return '';
  }
  /* list: questions in paper order → [{index, reason}] for every later repeat */
  function findRepeats(list){
    var kept=[], out=[];
    list.forEach(function(q,i){
      var r=redundantWith(q,kept);
      if(r) out.push({index:i,reason:r}); else kept.push({q:q});
    });
    return out;
  }
  /* A tracker for incremental picking (bank builders): add(q) → false when q repeats. */
  function tracker(seed){
    var kept=(seed||[]).map(function(q){ return {q:q}; });
    return {
      accepts:function(q){ return !redundantWith(q,kept); },
      add:function(q){ if(redundantWith(q,kept)) return false; kept.push({q:q}); return true; },
      stems:function(){ return kept.map(function(k){ return plain(k.q).replace(/\s+/g,' ').trim().slice(0,160); }); }
    };
  }

  var REVIEW_SYS='You are the chief examiner checking one exam paper for redundancy before it is printed. '+
    'Two questions are redundant when they test the same skill solved by the same method: the same question with '+
    'different numbers, names or context, or a rephrasing of it. Different skills within one topic are NOT redundant. '+
    'Return ONLY JSON: {"repeats":[{"i":<later question number>,"same_as":<earlier question number>}]} — '+
    'an empty list when every question tests a different idea.';
  /* questions → Promise<[{index, same_as}]> via the reviewer model */
  function examinerReview(questions,call){
    if(!call||questions.length<2) return Promise.resolve([]);
    var body=questions.map(function(q,i){
      return {i:i,topic:q.domain||'',question:plain(q).replace(/\s+/g,' ').trim().slice(0,300)};
    });
    return new Promise(function(res){ res(call(REVIEW_SYS,'Paper:\n'+JSON.stringify(body))); }).then(function(raw){
      var p; try{ p=JSON.parse(raw); }catch(e){ var m=String(raw||'').match(/\{[\s\S]*\}/); try{ p=m?JSON.parse(m[0]):{}; }catch(e2){ p={}; } }
      return ((p&&p.repeats)||[]).filter(function(r){
        return r&&typeof r.i==='number'&&typeof r.same_as==='number'&&r.i!==r.same_as&&r.i>=0&&r.i<questions.length&&r.same_as>=0&&r.same_as<questions.length;
      }).map(function(r){ return {index:Math.max(r.i,r.same_as),same_as:Math.min(r.i,r.same_as)}; });
    }).catch(function(){ return []; });
  }

  window.ClipSATRedundancy={findRepeats:findRepeats,tracker:tracker,examinerReview:examinerReview,_sig:sig,_compare:compare};
})();
