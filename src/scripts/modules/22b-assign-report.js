/* Teacher tools: CSAssign (build an assignment) and CSReport (progress report). Moved verbatim
   from 22-assignments-reports-search.js (Plan 5 Phase 5.015, ADR 0043). Their only buttons are
   in Teacher Mode's panel, so they ship inside public/js/teacher-mode.js, which loads when
   Teacher Mode is opened (20b-teacher-mode-loader.js). */
(function(){
'use strict';
var VIEW_META = window.CSViewMeta || {};


/* ══ Teacher Assignment Generator ════════════════════════════════ */
window.CSAssign = {
  open: function(){
    if(document.getElementById('cs-assign-modal')) return;
    var overlay=document.createElement('div');
    overlay.id='cs-assign-modal';
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center';
    /* Build course options from VIEW_META — every track, independent of which
       track's question bank JSON has actually been fetched so far */
    var trackKeys=(typeof VIEW_META!=='undefined'?Object.keys(VIEW_META):[]).filter(function(k){return k!=='home';});
    var courseOpts=trackKeys.length
      ? trackKeys.map(function(k){return '<option value="'+k+'">'+(VIEW_META[k].label||k.toUpperCase())+'</option>';}).join('')
      : '<option value="calculus">Calculus</option><option value="algebra">Algebra</option><option value="sat">SAT</option><option value="est">EST</option>';
    var _ar=_ttAr(), _dir=_ar?'rtl':'ltr';
    overlay.innerHTML='<div dir="'+_dir+'" style="background:#fff;border-radius:14px;padding:28px 32px;max-width:480px;width:94%;box-shadow:0 8px 40px rgba(0,0,0,.3);font-family:Calibri,Arial,sans-serif;'+(_ar?'text-align:right':'')+'">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">'
      +'<h2 style="margin:0;font-size:17px;color:#1a1a2e">'+_tt('assignModalTitle')+'</h2>'
      +'<button onclick="document.getElementById(\'cs-assign-modal\').remove()" aria-label="Close" style="background:none;border:none;font-size:20px;cursor:pointer;color:#888">✕</button></div>'
      +'<label style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#566173;margin-bottom:4px">'+_tt('courseLabel')+'</label>'
      +'<select id="ca-course" style="width:100%;padding:8px 10px;border:1.5px solid #e2e8f0;border-radius:8px;margin-bottom:14px;font-size:14px">'+courseOpts+'</select>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">'
      +'<div><label style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#566173;margin-bottom:4px">'+_tt('questionsLabel')+'</label>'
      +'<input id="ca-count" type="number" value="10" min="3" max="40" style="width:100%;padding:8px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px"></div>'
      +'<div><label style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#566173;margin-bottom:4px">'+_tt('difficultyLabel')+'</label>'
      +'<select id="ca-diff" style="width:100%;padding:8px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px">'
      +'<option value="all">'+_tt('allLevels')+'</option><option value="easy">'+_tt('easy')+'</option><option value="medium">'+_tt('medium')+'</option><option value="hard">'+_tt('hard')+'</option></select></div></div>'
      +'<div style="display:flex;gap:10px;margin-top:6px">'
      +'<button onclick="window.CSAssign.generate(false)" style="flex:1;padding:10px;background:#1a1a2e;color:#fff;border:none;border-radius:9px;cursor:pointer;font-size:14px;font-weight:600">'+_tt('genAssignBtn')+'</button>'
      +'<button onclick="window.CSAssign.generate(true)" style="flex:1;padding:10px;background:#166534;color:#fff;border:none;border-radius:9px;cursor:pointer;font-size:14px;font-weight:600">'+_tt('genAssignKeyBtn')+'</button>'
      +'</div></div>';
    document.body.appendChild(overlay);
  },
  generate: function(withKey){
    var courseEl=document.getElementById('ca-course');
    var countEl=document.getElementById('ca-count');
    var diffEl=document.getElementById('ca-diff');
    if(!courseEl||!countEl) return;
    var viewId=courseEl.value;
    var n=Math.min(40,Math.max(3,parseInt(countEl.value,10)||10));
    var diff=diffEl?diffEl.value:'all';
    /* The chosen course's bank may not be the current page's track, so it may
       not be loaded yet — fetch it on demand (CS_loadTrackBank caches, so this
       is a no-op if it's already loaded). */
    window.CS_loadTrackBank(viewId).then(function(){
    /* fullExamBank entries are objects: {pool:[...], letters:[], sections:[]}
       NOT plain arrays — must extract .pool to get the question array */
    /* Gated by the CHOSEN course (viewId), not the current page — see _ttAr()'s
       track-override comment: a teacher can open this modal from any page but
       target a different course in the dropdown. */
    var _ar=_ttAr(viewId), _dir=_ar?'rtl':'ltr';
    var bankObj=window.fullExamBank&&window.fullExamBank[viewId];
    if(!bankObj){alert(_tt('noBankFound',viewId)+viewId);return;}
    var bank=Array.isArray(bankObj)?bankObj:(bankObj.pool||bankObj.easy&&[].concat(bankObj.easy||[],bankObj.medium||[],bankObj.hard||[])||[]);
    if(!bank.length){alert(_tt('noQuestionsInBankPrefix',viewId)+viewId+_tt('noQuestionsInBankSuffix',viewId));return;}
    /* Filter by difficulty */
    var pool=bank.filter(function(q){
      if(diff==='all') return true;
      return (q.difficulty||q.diff||'medium').toLowerCase().indexOf(diff)!==-1;
    });
    if(!pool.length) pool=bank;
    /* Shuffle */
    function shuf(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
    var selected=shuf(pool).slice(0,n);
    selected=selected.map(function(q){return window._shuffleQ?window._shuffleQ(q):q;}); /* randomize correct-answer position */
    var _ie = window.CSExport&&typeof window.CSExport._inlineMjxPaths==='function' ? window.CSExport._inlineMjxPaths : function(x){return x;};
    var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
    /* Build question rows + answer key */
    function optLetter(i){return String.fromCharCode(65+i);}
    function _mesc(s){return String(s||'').replace(/&(?![a-zA-Z#])/g,'&amp;');}
    var qHtml='', keyHtml='';
    selected.forEach(function(q,i){
      var stem=_mesc(q.text||q.q||q.stem||q.question||'');
      var opts=q.choices||q.options||[];
      var ans=q.answer!=null?q.answer:q.correct;
      var optHtml=opts.map(function(o,j){
        var s=String(o||'');
        if(s.indexOf('\\(')===-1&&s.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(s)){s='\\('+s+'\\)';}
        return '<div style="margin:3px 0 3px 12px">'+optLetter(j)+'. '+_mesc(s)+'</div>';
      }).join('');
      qHtml+='<div style="margin-bottom:18pt;page-break-inside:avoid">'
        +'<p style="margin:0 0 4pt;font-weight:700">Q'+(i+1)+'. '+stem+'</p>'
        +optHtml
        +'</div>';
      var ansLabel=typeof ans==='number'?optLetter(ans):_mesc(String(ans||''));
      keyHtml+='<tr>'
        +'<td style="padding:5px 9px;border:1px solid #e2e8f0;text-align:center;font-weight:700">'+(i+1)+'</td>'
        +'<td style="padding:5px 9px;border:1px solid #e2e8f0;text-align:center;color:#166534;font-weight:700">'+ansLabel+'</td>'
        +'<td style="padding:5px 9px;border:1px solid #e2e8f0">'+stem.slice(0,60)+'…</td></tr>';
    });
    var _logoUrl=(document.getElementById('site-logo-img')||{src:''}).src;
    var logoTag=_logoUrl?'<img class="hdr-logo-img" src="'+_logoUrl+'" alt="ClipSAT">':'';
    var css='@page{margin:20mm 18mm 24mm}body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#111;margin:0;padding-left:24pt}'
      +'.hdr{border-bottom:2.5pt solid #1a1a2e;display:flex;align-items:center;justify-content:space-between;padding:8pt 0 10pt;margin-bottom:18pt}'
      +'.hdr-brand{display:flex;align-items:center;gap:9pt}'
      +'.hdr-logo-img{height:34pt;width:auto;object-fit:contain;flex-shrink:0}'
      +'.brand{font-size:16pt;font-weight:700;color:#1a1a2e;font-family:Georgia,serif}'
      +'.brand span{font-size:8.5pt;color:#566173;display:block;letter-spacing:.12em;text-transform:uppercase}'
      +'.info-box{background:#f8fafc;border:1.5pt solid #e2e8f0;border-radius:8pt;padding:9pt 14pt;margin-bottom:16pt;display:grid;grid-template-columns:repeat(3,1fr);gap:8pt}'
      +'.ib-label{font-size:7.5pt;text-transform:uppercase;letter-spacing:.08em;color:#566173}'
      +'.ib-val{font-size:10pt;font-weight:700;color:#1a1a2e;border-bottom:1.5pt solid #cbd5e1;padding-bottom:5pt}'
      +'h2.sect{color:#1a1a2e;font-size:12pt;border-bottom:2pt solid #e2e8f0;padding-bottom:4pt;margin:16pt 0 12pt}'
      +'table{width:100%;border-collapse:collapse;font-size:10pt}'
      +'th{background:#1a1a2e;color:#fff;padding:7px;text-align:left;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
      +'@media print{.no-print{display:none!important}}'
      /* Qudrat/Tahsili + Arabic mode only — see _ttAr(). Math stays LTR. */
      +'body[dir="rtl"]{direction:rtl;text-align:right;padding-left:0;padding-right:24pt}'
      +'body[dir="rtl"] .hdr{direction:rtl}'
      +'body[dir="rtl"] th{text-align:right}'
      +'body[dir="rtl"] mjx-container,body[dir="rtl"] .MathJax{direction:ltr}';
    var html='<!DOCTYPE html><html lang="'+(_dir==='rtl'?'ar':'en')+'" dir="'+_dir+'"><head><meta charset="UTF-8"><title>'+_tt('assignmentDocTitle',viewId)+'</title><style>'+css+'</style>'
      +'<script>MathJax={tex:{inlineMath:[["\\\\(","\\\\)"]],displayMath:[["\\\\[","\\\\]"]],tags:"none"},svg:{fontCache:"global",scale:1},options:{skipHtmlTags:["script","noscript","style","textarea","pre","code"]}};<\/script>'
      +'<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js"><\/script>'
      +'</head><body dir="'+_dir+'">'
      +'<div class="hdr"><div class="hdr-brand">'+logoTag+'<div class="brand">ClipSAT<span>'+_tt('assignmentWord',viewId)+' — '+viewId.toUpperCase()+'</span></div></div>'
      +'<div style="text-align:right;font-size:8.5pt;color:#566173">'+_tt('dateLabel',viewId)+' <strong>'+today+'</strong></div></div>'
      +'<div class="info-box">'
      +'<div><div class="ib-label">'+_tt('studentName',viewId)+'</div><div class="ib-val">&nbsp;</div></div>'
      +'<div><div class="ib-label">'+_tt('classGrade',viewId)+'</div><div class="ib-val">&nbsp;</div></div>'
      +'<div><div class="ib-label">'+_tt('scoreLabel',viewId)+'</div><div class="ib-val">&nbsp; / '+n+'</div></div>'
      +'</div>'
      +'<h2 class="sect">'+_tt('questionsHeadingPrefix',viewId)+viewId.toUpperCase()+' ('+n+' '+_tt('questionsWord',viewId)+( diff!=='all'?' · '+diff[0].toUpperCase()+diff.slice(1):'')+' )</h2>'
      +qHtml;
    if(withKey){
      html+='<div style="page-break-before:always"></div>'
        +'<h2 class="sect" style="color:#166534">'+_tt('answerKeyHeading',viewId)+'</h2>'
        +'<table><tr><th style="width:40px">'+_tt('colNum',viewId)+'</th><th style="width:60px">'+_tt('colAnswer',viewId)+'</th><th>'+_tt('colQuestionExcerpt',viewId)+'</th></tr>'+keyHtml+'</table>';
    }
    html+='<div class="no-print" style="margin-top:20pt;text-align:center"><button onclick="window.print()" style="background:#1a1a2e;color:#fff;border:none;border-radius:7pt;padding:8pt 22pt;cursor:pointer;font-size:11pt">'+_tt('printPdf',viewId)+'</button></div>'
      +'<script>MathJax.startup.promise.then(function(){setTimeout(function(){try{window.print();}catch(e){}},400);});<\/script>'
      +'</body></html>';
    document.getElementById('cs-assign-modal').remove();
    var blob=new Blob([html],{type:'text/html'}); var url=URL.createObjectURL(blob);
    var w=window.open(url,'_blank','width=850,height=750');
    setTimeout(function(){URL.revokeObjectURL(url);},60000);
    });
  }
};

/* ══ Student Progress Report ═════════════════════════════════════ */
window.CSReport = {
  generate: function(){
    var _ie = window.CSExport&&typeof window.CSExport._inlineMjxPaths==='function' ? window.CSExport._inlineMjxPaths : function(x){return x;};
    /* Gather mastery data */
    var masteryData = {};
    var totalCorrect=0, totalAttempted=0;
    if(window.Mastery && typeof Mastery.getAll==='function'){
      masteryData = Mastery.getAll();
    } else if(window.Mastery && typeof Mastery.data==='object'){
      masteryData = Mastery.data;
    }
    /* Gather mistake log */
    var mistakes = [];
    try{
      var stored = localStorage.getItem('clipsat_mistakes_v2')||localStorage.getItem('cs_mistakes')||'[]';
      var raw = JSON.parse(stored);
      if(Array.isArray(raw)) mistakes = raw.slice(-30);
    }catch(e){}
    /* Gather score history */
    var history = [];
    try{
      var hs = JSON.parse(localStorage.getItem('cs_score_history')||'[]');
      if(Array.isArray(hs)) history = hs.slice(-20);
    }catch(e){}
    /* Build mastery rows */
    var masteryRows='', bestTopic='—', worstTopic='—', bestPct=0, worstPct=101;
    Object.keys(masteryData).forEach(function(k){
      var d=masteryData[k];
      var correct=d.correct||d.right||0;
      var attempted=d.attempted||d.total||correct;
      if(!attempted) return;
      var pct=Math.round(correct/attempted*100);
      totalCorrect+=correct; totalAttempted+=attempted;
      if(pct>bestPct){bestPct=pct;bestTopic=k;}
      if(pct<worstPct){worstPct=pct;worstTopic=k;}
      var bar='<div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;width:80px;display:inline-block;vertical-align:middle">'
        +'<div style="height:100%;width:'+pct+'%;background:'+(pct>=70?'#16a34a':pct>=50?'#ca8a04':'#ef4444')+';-webkit-print-color-adjust:exact;print-color-adjust:exact"></div></div>';
      masteryRows+='<tr><td style="padding:5px 8px;border:1px solid #e2e8f0">'+k+'</td>'
        +'<td style="padding:5px 8px;border:1px solid #e2e8f0;text-align:center">'+attempted+'</td>'
        +'<td style="padding:5px 8px;border:1px solid #e2e8f0;text-align:center">'+correct+'</td>'
        +'<td style="padding:5px 8px;border:1px solid #e2e8f0;text-align:center">'+pct+'% '+bar+'</td></tr>';
    });
    if(!masteryRows) masteryRows='<tr><td colspan="4" style="padding:12px;text-align:center;color:#888">'+_tt('noMasteryYet')+'</td></tr>';
    var overallPct = totalAttempted ? Math.round(totalCorrect/totalAttempted*100) : 0;
    /* Build mistake rows */
    var mistakeRows='';
    mistakes.forEach(function(m){
      mistakeRows+='<tr><td style="padding:5px 8px;border:1px solid #e2e8f0">'+String(m.q||m.question||'').slice(0,80)+'</td>'
        +'<td style="padding:5px 8px;border:1px solid #e2e8f0">'+String(m.wrong||m.chosen||'')+'</td>'
        +'<td style="padding:5px 8px;border:1px solid #e2e8f0;color:#166534;font-weight:700">'+String(m.right||m.correct||m.answer||'')+'</td></tr>';
    });
    if(!mistakeRows) mistakeRows='<tr><td colspan="3" style="padding:12px;text-align:center;color:#888">'+_tt('noMistakesYet')+'</td></tr>';
    /* Build score history */
    var histRows='';
    history.forEach(function(h){
      var pct=h.total?Math.round(h.score/h.total*100):0;
      histRows+='<tr><td style="padding:5px 8px;border:1px solid #e2e8f0">'+String(h.date||'').slice(0,10)+'</td>'
        +'<td style="padding:5px 8px;border:1px solid #e2e8f0">'+String(h.topic||h.view||'General')+'</td>'
        +'<td style="padding:5px 8px;border:1px solid #e2e8f0;text-align:center">'+String(h.score||0)+'/'+String(h.total||0)+'</td>'
        +'<td style="padding:5px 8px;border:1px solid #e2e8f0;text-align:center;color:'+(pct>=60?'#166534':'#991b1b')+';font-weight:700">'+pct+'%</td></tr>';
    });
    if(!histRows) histRows='<tr><td colspan="4" style="padding:12px;text-align:center;color:#888">'+_tt('noScoreHistoryYet')+'</td></tr>';
    var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
    var _logoUrl=(document.getElementById('site-logo-img')||{src:''}).src;
    var logoTag=_logoUrl?'<img class="hdr-logo-img" src="'+_logoUrl+'" alt="ClipSAT">':'';
    var _dir=_ttDir();
    var html='<!DOCTYPE html><html lang="'+(_dir==='rtl'?'ar':'en')+'" dir="'+_dir+'"><head><meta charset="UTF-8"><title>'+_tt('progressReportDocTitle')+'</title>'
      +'<style>@page{margin:20mm 18mm 24mm}body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#111;margin:0}'
      +'.hdr{border-bottom:2.5pt solid #1a1a2e;display:flex;align-items:center;justify-content:space-between;padding:8pt 0 10pt;margin-bottom:18pt}'
      +'.hdr-brand{display:flex;align-items:center;gap:9pt}'
      +'.hdr-logo-img{height:34pt;width:auto;object-fit:contain;flex-shrink:0}'
      +'.brand{font-size:17pt;font-weight:700;color:#1a1a2e;font-family:Georgia,serif}'
      +'.brand span{font-size:8.5pt;color:#566173;display:block;letter-spacing:.12em;text-transform:uppercase}'
      +'.stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10pt;margin-bottom:18pt}'
      +'.stat-card{border:1.5pt solid #e2e8f0;border-radius:8pt;padding:10pt;text-align:center}'
      +'.stat-num{font-size:18pt;font-weight:700;color:#1a1a2e}'
      +'.stat-lbl{font-size:8pt;letter-spacing:.08em;text-transform:uppercase;color:#566173}'
      +'h3{color:#1a1a2e;font-size:11pt;border-bottom:1.5pt solid #e2e8f0;padding-bottom:4pt;margin:16pt 0 8pt}'
      +'table{width:100%;border-collapse:collapse;font-size:10pt;margin-bottom:14pt}'
      +'th{background:#1a1a2e;color:#fff;padding:6px 8px;text-align:left;border:1px solid #1a1a2e;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
      +'.footer{border-top:1pt solid #e2e8f0;padding-top:6pt;font-size:8pt;color:#888;text-align:center;margin-top:24pt}'
      +'@media print{.no-print{display:none!important}}'
      /* Qudrat/Tahsili + Arabic mode only — see _ttAr(). */
      +'body[dir="rtl"]{direction:rtl;text-align:right}'
      +'body[dir="rtl"] .hdr{direction:rtl}'
      +'body[dir="rtl"] th{text-align:right}'
      +'</style></head><body dir="'+_dir+'">'
      +'<div class="hdr">'
      +'<div class="hdr-brand">'+logoTag+'<div class="brand">ClipSAT<span>'+_tt('progressReportSubtitle')+'</span></div></div>'
      +'<div style="text-align:right;font-size:8.5pt;color:#566173">'+_tt('dateLabel')+' <strong>'+today+'</strong></div></div>'
      +'<div class="stat-grid">'
      +'<div class="stat-card"><div class="stat-num">'+totalAttempted+'</div><div class="stat-lbl">'+_tt('questionsAttempted')+'</div></div>'
      +'<div class="stat-card"><div class="stat-num">'+overallPct+'%</div><div class="stat-lbl">'+_tt('overallAccuracy')+'</div></div>'
      +'<div class="stat-card"><div class="stat-num">'+mistakes.length+'</div><div class="stat-lbl">'+_tt('mistakesLogged')+'</div></div>'
      +'</div>'
      +'<div style="background:#f8fafc;border:1.5pt solid #e2e8f0;border-radius:8pt;padding:10pt 14pt;margin-bottom:16pt;display:grid;grid-template-columns:1fr 1fr;gap:8pt">'
      +'<div><span style="font-size:8pt;text-transform:uppercase;letter-spacing:.08em;color:#566173">'+_tt('strongestTopic')+'</span><br><strong>'+bestTopic+'</strong>'+(bestPct?(' — '+bestPct+'%'):'')+'</div>'
      +'<div><span style="font-size:8pt;text-transform:uppercase;letter-spacing:.08em;color:#566173">'+_tt('needsMostWork')+'</span><br><strong>'+worstTopic+'</strong>'+(worstPct<101?(' — '+worstPct+'%'):'')+'</div>'
      +'</div>'
      +'<h3>'+_tt('topicMastery')+'</h3>'
      +'<table><tr><th>'+_tt('colTopic')+'</th><th>'+_tt('colAttempted')+'</th><th>'+_tt('colCorrect')+'</th><th>'+_tt('colAccuracy')+'</th></tr>'+masteryRows+'</table>'
      +'<h3>'+_tt('recentScoreHistory')+'</h3>'
      +'<table><tr><th>'+_tt('colDate')+'</th><th>'+_tt('colTopic')+'</th><th>'+_tt('colScore')+'</th><th>'+_tt('colPercent')+'</th></tr>'+histRows+'</table>'
      +'<h3>'+_tt('recentMistakes')+'</h3>'
      +'<table><tr><th>'+_tt('colQuestion')+'</th><th>'+_tt('colYourAnswer')+'</th><th>'+_tt('colCorrectAnswer')+'</th></tr>'+mistakeRows+'</table>'
      +'<div class="footer">'+_tt('reportFooter')+today+'</div>'
      +'<div class="no-print" style="margin-top:20pt;text-align:center"><button onclick="window.print()" style="background:#1a1a2e;color:#fff;border:none;border-radius:7pt;padding:8pt 22pt;cursor:pointer;font-size:11pt">'+_tt('printPdf')+'</button></div>'
      +'</body></html>';
    html=_ie(html);
    var blob=new Blob([html],{type:'text/html'}); var url=URL.createObjectURL(blob);
    var w=window.open(url,'_blank','width=850,height=750');
    setTimeout(function(){URL.revokeObjectURL(url);},60000);
    if(w) setTimeout(function(){try{w.focus();}catch(e){}},400);
  }
};

}());
