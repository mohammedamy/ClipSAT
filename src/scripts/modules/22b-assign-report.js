/* Teacher tools: CSAssign (build an assignment) and CSReport (progress report). Moved verbatim
   from 22-assignments-reports-search.js (Plan 5 Phase 5.015, ADR 0043). Their only buttons are
   in Teacher Mode's panel, so they ship inside public/js/teacher-mode.js, which loads when
   Teacher Mode is opened (20b-teacher-mode-loader.js). */
(function(){
'use strict';
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
window.esc = window.esc || esc;
var VIEW_META = window.CSViewMeta || {};

function _wm(s){
  if(s == null) return '';
  var str = String(s);
  if(typeof window.CSAutoMath === 'function') str = window.CSAutoMath(str);
  else if(typeof window._autoMath === 'function') str = window._autoMath(str);
  if(str.indexOf('\\(') === -1 && str.indexOf('\\[') === -1 && str.indexOf('$$') === -1 && str.indexOf('\\') !== -1){
    str = '\\(' + str + '\\)';
  }
  if(typeof window.CSQuizMath === 'function') return window.CSQuizMath(str);
  var out='', inM=false, i=0, L=str.length;
  while(i<L){
    if(!inM && str.slice(i,i+2)==='\\('){out+='\\(';i+=2;inM=true;continue;}
    if(!inM && str.slice(i,i+2)==='\\['){out+='\\[';i+=2;inM=true;continue;}
    if(inM && str.slice(i,i+2)==='\\)'){out+='\\)';i+=2;inM=false;continue;}
    if(inM && str.slice(i,i+2)==='\\]'){out+='\\]';i+=2;inM=false;continue;}
    if(str[i]==='<' && i+1<L && (str[i+1]==='/' || /[a-zA-Z]/.test(str[i+1]))){
      var tj=str.indexOf('>', i);
      if(tj!==-1){ out+=str.slice(i, tj+1); i=tj+1; continue; }
    }
    if(!inM && str[i]==='\\' && i+1<L && (str[i+1]==='%' || str[i+1]==='$')){
      out+=str[i+1]; i+=2; continue;
    }
    var c=str[i];
    if(c==='&') out+='&amp;';
    else if(c==='<') out+='&lt;';
    else if(c==='>') out+='&gt;';
    else out+=c;
    i++;
  }
  return out;
}

function _safeExcerpt(s, maxLen){
  if(!s) return '';
  maxLen = maxLen || 100;
  if(s.length <= maxLen) return _wm(s);
  var inM = false, cutIdx = maxLen;
  for(var i = 0; i < s.length; i++){
    if(!inM && s.slice(i, i+2) === '\\('){ inM = true; i++; continue; }
    if(inM && s.slice(i, i+2) === '\\)'){ inM = false; i++; continue; }
    if(i >= maxLen && !inM && (s[i] === ' ' || s[i] === '.' || s[i] === ',' || s[i] === ';' || s[i] === '?')){
      cutIdx = i;
      break;
    }
  }
  var sub = s.slice(0, cutIdx).trim();
  if(cutIdx < s.length) sub += '…';
  return _wm(sub);
}

Object.assign(_TT_STR.en,{
  caSendClassroom:'Send to Google Classroom', caOpenClassroom:'Open Google Classroom',
  caClassroomHelp:'Choose your class in Google\'s window, then pick Assignment. Students open the link and answer on ClipSAT; each answer is marked on the spot.',
  caClassroomBody:'Open the link, answer every question, then mark this assignment as done.',
  caStudentLink:'Student link', caCopy:'Copy', caCopied:'Copied', caPreview:'Preview the assignment'
});
Object.assign(_TT_STR.ar,{
  caSendClassroom:'إرسال إلى Google Classroom', caOpenClassroom:'فتح Google Classroom',
  caClassroomHelp:'اختر الفصل في نافذة Google ثم اختر «واجب». يفتح الطلاب الرابط ويجيبون على ClipSAT، وتُصحَّح كل إجابة فورًا.',
  caClassroomBody:'افتح الرابط وأجب عن جميع الأسئلة، ثم حدّد هذا الواجب كمكتمل.',
  caStudentLink:'رابط الطالب', caCopy:'نسخ', caCopied:'تم النسخ', caPreview:'معاينة الواجب'
});


/* ══ Teacher Assignment Generator ════════════════════════════════ */
/* The questions for an assignment: n from the chosen course's bank at the chosen difficulty,
   shuffled. Shared by the printable assignment and "Send to Google Classroom". */
function pick(viewId,n,diff){
  var bankObj=window.fullExamBank&&window.fullExamBank[viewId];
  if(!bankObj){alert(_tt('noBankFound',viewId)+viewId);return null;}
  var bank=Array.isArray(bankObj)?bankObj:(bankObj.pool||bankObj.easy&&[].concat(bankObj.easy||[],bankObj.medium||[],bankObj.hard||[])||[]);
  if(!bank.length){alert(_tt('noQuestionsInBankPrefix',viewId)+viewId+_tt('noQuestionsInBankSuffix',viewId));return null;}
  /* Filter by difficulty */
  var pool=bank.filter(function(q){
    if(diff==='all') return true;
    return (q.difficulty||q.diff||'medium').toLowerCase().indexOf(diff)!==-1;
  });
  if(!pool.length) pool=bank;
  /* Shuffle */
  function shuf(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
  /* no repeated questions or ideas in one assignment (05e-redundancy-check.js) */
  var ideas=window.ClipSATRedundancy?window.ClipSATRedundancy.tracker():null, sh=shuf(pool), selected=[], skipped=[];
  for(var i=0;i<sh.length&&selected.length<n;i++){
    if(!ideas||ideas.add(sh[i])) selected.push(sh[i]);
    else skipped.push(sh[i]);
  }
  if(selected.length<n && skipped.length){
    for(var j=0;j<skipped.length&&selected.length<n;j++){
      if(selected.indexOf(skipped[j])===-1) selected.push(skipped[j]);
    }
  }
  if(selected.length<n && bank.length>selected.length){
    var bankShuf=shuf(bank.slice());
    for(var k=0;k<bankShuf.length&&selected.length<n;k++){
      if(selected.indexOf(bankShuf[k])===-1) selected.push(bankShuf[k]);
    }
  }
  /* choices stay in bank order: an assignment link identifies each question by them (22c) */
  return selected;
}

window.CSAssign = {
  open: function(){
    if(document.getElementById('cs-assign-modal')) return;
    var overlay=document.createElement('div');
    overlay.id='cs-assign-modal';
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center';
    /* Build course options from VIEW_META — every track, independent of which
       track's question bank JSON has actually been fetched so far */
    var vmMap=window.CSViewMeta||window.VIEW_META||VIEW_META||{};
    var trackKeys=Object.keys(vmMap).filter(function(k){return k!=='home';});
    var activeTrack=window.CLIPSAT_TRACK||window._csCurrentView||'calculus';
    var courseOpts=trackKeys.length
      ? trackKeys.map(function(k){return '<option value="'+k+'"'+(k===activeTrack?' selected':'')+'>'+(vmMap[k].label||k.toUpperCase())+'</option>';}).join('')
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
      +'</div>'
      +'<button id="ca-classroom" onclick="window.CSAssign.classroom()" style="width:100%;margin-top:10px;padding:10px;background:#fff;color:#1e8e3e;border:1.5px solid #1e8e3e;border-radius:9px;cursor:pointer;font-size:14px;font-weight:600">'+_tt('caSendClassroom')+'</button>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid #e2e8f0">'
      +'<button type="button" onclick="document.getElementById(\'cs-assign-modal\').remove();window.CSCustomCart.open()" style="padding:8px 10px;background:#eef2ff;color:#3730a3;border:1px solid #c7d2fe;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:700">🧰 '+(_ar?'مصمم أوراق العمل':'Custom Cart Builder')+'</button>'
      +'<button type="button" onclick="document.getElementById(\'cs-assign-modal\').remove();window.CSGradebook.open()" style="padding:8px 10px;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:700">📊 '+(_ar?'سجل درجات الفصل':'Class Gradebook')+'</button>'
      +'</div>'
      +'</div>';
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
    var selected=pick(viewId,n,diff);
    if(!selected) return;
    selected=selected.map(function(q){return window._shuffleQ?window._shuffleQ(q):q;}); /* randomize correct-answer position */
    var _ie = window.CSExport&&typeof window.CSExport._inlineMjxPaths==='function' ? window.CSExport._inlineMjxPaths : function(x){return x;};
    var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
    /* Build question rows + answer key */
    function optLetter(i){return String.fromCharCode(65+i);}
    function _mesc(s){return String(s||'').replace(/&(?![a-zA-Z#])/g,'&amp;');}
    var qHtml='', keyHtml='';
    selected.forEach(function(q,i){
      var stem=_wm(q.text||q.q||q.stem||q.question||'');
      var opts=q.choices||q.options||[];
      var ans=q.answer!=null?q.answer:q.correct;
      var optHtml=opts.map(function(o,j){
        var s=_wm(o);
        return '<div style="margin:3px 0 3px 12px">'+optLetter(j)+'. '+s+'</div>';
      }).join('');
      var figH = '';
      var _f = q.figure || q.fig || q.table;
      if(_f){
        if(typeof _f === 'string'){
          figH = '<div class="fep-figure" style="margin:8pt auto;text-align:center">'+_f+'</div>';
        } else if(_f.type === 'table' || _f.headers || _f.rows){
          var _hdrs=(_f.headers||[]).map(function(th){return '<th>'+_mesc(th!=null?String(th):'')+'</th>';}).join('');
          var _rws=(_f.rows||_f.data||[]).map(function(r){
            return '<tr>'+(Array.isArray(r)?r.map(function(c){return '<td>'+_mesc(c!=null?String(c):'')+'</td>';}).join(''):'<td>'+_mesc(r!=null?String(r):'')+'</td>')+'</tr>';
          }).join('');
          figH = '<div class="fep-figure" style="margin:8pt auto;text-align:center"><table class="exam-table">'+(_hdrs?'<thead><tr>'+_hdrs+'</tr></thead>':'')+'<tbody>'+_rws+'</tbody></table></div>';
        } else if(window._renderFig){
          figH = '<div class="fep-figure" style="margin:8pt auto;text-align:center">'+window._renderFig(_f)+'</div>';
        } else if(window.renderMathFigure){
          figH = '<div class="fep-figure" style="margin:8pt auto;text-align:center">'+window.renderMathFigure(_f)+'</div>';
        }
      }
      qHtml+='<div style="margin-bottom:18pt;page-break-inside:avoid">'
        +'<div style="margin:0 0 6pt;font-weight:700">Q'+(i+1)+'. '+stem+'</div>'
        +figH
        +optHtml
        +'</div>';
      var ansLabel=typeof ans==='number'?optLetter(ans):_wm(ans);
      var rawStem=String(q.text||q.q||q.stem||q.question||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
      keyHtml+='<tr>'
        +'<td style="padding:5px 9px;border:1px solid #e2e8f0;text-align:center;font-weight:700">'+(i+1)+'</td>'
        +'<td style="padding:5px 9px;border:1px solid #e2e8f0;text-align:center;color:#166534;font-weight:700">'+ansLabel+'</td>'
        +'<td style="padding:5px 9px;border:1px solid #e2e8f0">'+_safeExcerpt(rawStem,80)+'</td></tr>';
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
      +'.exam-table, .fep-figure table{width:auto!important;margin:8pt auto!important;border-collapse:collapse;font-size:9.5pt}'
      +'.exam-table th, .exam-table td, .fep-figure table th, .fep-figure table td{border:1pt solid #999!important;padding:4pt 8pt!important;text-align:center!important}'
      +'.exam-table th, .fep-figure table th{background:#e8edf8!important;color:#1a1a2e!important;font-weight:700!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
      +'@media print{.no-print{display:none!important}}'
      /* Qudrat/Tahsili + Arabic mode only — see _ttAr(). Math stays LTR. */
      +'body[dir="rtl"]{direction:rtl;text-align:right;padding-left:0;padding-right:24pt}'
      +'body[dir="rtl"] .hdr{direction:rtl}'
      +'body[dir="rtl"] th{text-align:right}'
      +'body[dir="rtl"] mjx-container,body[dir="rtl"] .MathJax,body[dir="rtl"] .katex{direction:ltr;unicode-bidi:isolate}';
    var html='<!DOCTYPE html><html lang="'+(_dir==='rtl'?'ar':'en')+'" dir="'+_dir+'"><head><meta charset="UTF-8"><title>'+_tt('assignmentDocTitle',viewId)+'</title><style>'+css+'</style>'
      +'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.css" crossorigin="anonymous">'
      +'<script>window.MathJax={tex:{inlineMath:[["\\\\(","\\\\)"],["$","$"]],displayMath:[["\\\\[","\\\\]"],["$$","$$"]],tags:"none"},svg:{fontCache:"global",scale:1},options:{skipHtmlTags:["script","noscript","style","textarea","pre","code"]}};<\/script>'
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
      +'<script>if(window.MathJax&&MathJax.startup&&MathJax.startup.promise){MathJax.startup.promise.then(function(){setTimeout(function(){try{window.print();}catch(e){}},400);}).catch(function(){setTimeout(function(){try{window.print();}catch(e){}},400);});}else{setTimeout(function(){try{window.print();}catch(e){}},800);}<\/script>'
      +'</body></html>';
    document.getElementById('cs-assign-modal').remove();
    var blob=new Blob([html],{type:'text/html'}); var url=URL.createObjectURL(blob);
    var w=window.open(url,'_blank','width=850,height=750');
    setTimeout(function(){URL.revokeObjectURL(url);},60000);
    });
  },
  /* Send to Google Classroom (ADR 0047): a link to these questions on the course's page (22c/22d
     show them to the student), shared with Google's own Share to Classroom button as an
     assignment. The teacher picks the class and posts it in Google's window. Posting through the
     Classroom API instead would need its restricted coursework scope (see quiz-capture-ui.js). */
  classroom: function(){
    var courseEl=document.getElementById('ca-course'), countEl=document.getElementById('ca-count'), diffEl=document.getElementById('ca-diff');
    if(!courseEl||!countEl) return;
    var viewId=courseEl.value, n=Math.min(40,Math.max(3,parseInt(countEl.value,10)||10)), diff=diffEl?diffEl.value:'all';
    window.CS_loadTrackBank(viewId).then(function(){
      var selected=pick(viewId,n,diff);
      if(!selected) return;
      var keys=[];
      selected.forEach(function(q){ var k=window.CSAssignKey(q); if(keys.indexOf(k)===-1) keys.push(k); });
      var link=location.origin+'/'+viewId+'/?assign='+keys.join('.');
      var label=(VIEW_META[viewId]&&VIEW_META[viewId].label)||viewId.toUpperCase();
      var title='ClipSAT '+_tt('assignmentWord',viewId)+' — '+label+' ('+keys.length+' '+_tt('questionsWord',viewId)+')';
      var body=_tt('caClassroomBody',viewId);
      var share='https://classroom.google.com/share?url='+encodeURIComponent(link)+'&title='+encodeURIComponent(title)
        +'&body='+encodeURIComponent(body)+'&itemtype=assignment';
      var box=document.querySelector('#cs-assign-modal > div');
      if(!box) return;
      var _ar=_ttAr(), esc=function(t){ return String(t).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); };
      box.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'
        +'<h2 style="margin:0;font-size:17px;color:#1a1a2e">'+_tt('caSendClassroom')+'</h2>'
        +'<button onclick="document.getElementById(\'cs-assign-modal\').remove()" aria-label="Close" style="background:none;border:none;font-size:20px;cursor:pointer;color:#888">✕</button></div>'
        +'<p style="font-size:14px;color:#333;margin:0 0 12px">'+esc(title)+'</p>'
        +'<p style="font-size:13px;color:#566173;margin:0 0 14px">'+_tt('caClassroomHelp')+'</p>'
        +'<div id="ca-gc-btn" style="min-height:32px;margin-bottom:12px"></div>'
        +'<a id="ca-gc-link" href="'+esc(share)+'" target="_blank" rel="noopener" style="display:none;text-align:center;padding:10px;background:#1e8e3e;color:#fff;border-radius:9px;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:12px">'+_tt('caOpenClassroom')+'</a>'
        +'<label for="ca-link" style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#566173;margin-bottom:4px">'+_tt('caStudentLink')+'</label>'
        +'<div style="display:flex;gap:8px"><input id="ca-link" readonly value="'+esc(link)+'" style="flex:1;min-width:0;padding:8px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px" dir="ltr">'
        +'<button id="ca-copy" style="padding:8px 12px;background:#1a1a2e;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px">'+_tt('caCopy')+'</button></div>'
        +'<p style="margin:10px 0 0;font-size:13px"><a href="'+esc(link)+'" target="_blank" rel="noopener">'+_tt('caPreview')+'</a></p>';
      document.getElementById('ca-copy').onclick=function(){
        var inp=document.getElementById('ca-link'), btn=this;
        var done=function(){ btn.textContent=_tt('caCopied'); };
        if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(done,function(){ inp.select(); document.execCommand('copy'); done(); });
        else { inp.select(); document.execCommand('copy'); done(); }
      };
      /* Google's button when its script (platform.js, in the page header) is available; a plain
         link to the same share page otherwise */
      var g=window.gapi&&window.gapi.sharetoclassroom;
      if(g&&typeof g.render==='function'){
        try{ g.render('ca-gc-btn',{url:link,title:title,body:body,itemtype:'assignment',size:32,theme:'classic'}); return; }catch(e){}
      }
      document.getElementById('ca-gc-link').style.display='block';
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
      var qTxt = _wm(m.q || m.question || '');
      var wTxt = _wm(m.wrong || m.chosen || '');
      var rTxt = _wm(m.right || m.correct || m.answer || '');
      mistakeRows+='<tr><td style="padding:6px 8px;border:1px solid #e2e8f0;word-break:break-word">'+qTxt+'</td>'
        +'<td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center">'+wTxt+'</td>'
        +'<td style="padding:6px 8px;border:1px solid #e2e8f0;text-align:center;color:#166534;font-weight:700">'+rTxt+'</td></tr>';
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
      +'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.css" crossorigin="anonymous">'
      +'<script>window.MathJax={tex:{inlineMath:[["\\\\(","\\\\)"],["$","$"]],displayMath:[["\\\\[","\\\\]"],["$$","$$"]],tags:"none"},svg:{fontCache:"global",scale:1},options:{skipHtmlTags:["script","noscript","style","textarea","pre","code"]}};<\/script>'
      +'<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js"><\/script>'
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
      +'body[dir="rtl"] mjx-container,body[dir="rtl"] .MathJax,body[dir="rtl"] .katex{direction:ltr;unicode-bidi:isolate}'
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
      +'<table><tr><th style="width:56%">'+_tt('colQuestion')+'</th><th style="width:22%;text-align:center">'+_tt('colYourAnswer')+'</th><th style="width:22%;text-align:center">'+_tt('colCorrectAnswer')+'</th></tr>'+mistakeRows+'</table>'
      +'<div class="footer">'+_tt('reportFooter')+today+'</div>'
      +'<div class="no-print" style="margin-top:20pt;text-align:center"><button onclick="window.print()" style="background:#1a1a2e;color:#fff;border:none;border-radius:7pt;padding:8pt 22pt;cursor:pointer;font-size:11pt">'+_tt('printPdf')+'</button></div>'
      +'<script>if(window.MathJax&&MathJax.startup&&MathJax.startup.promise){MathJax.startup.promise.then(function(){setTimeout(function(){try{window.print();}catch(e){}},400);}).catch(function(){setTimeout(function(){try{window.print();}catch(e){}},400);});}else{setTimeout(function(){try{window.print();}catch(e){}},800);}<\/script>'
      +'</body></html>';
    html=_ie(html);
    var blob=new Blob([html],{type:'text/html'}); var url=URL.createObjectURL(blob);
    var w=window.open(url,'_blank','width=850,height=750');
    setTimeout(function(){URL.revokeObjectURL(url);},60000);
    if(w) setTimeout(function(){try{w.focus();}catch(e){}},400);
  }
};

/* ══ Teacher Class Gradebook & Item-Analysis Heatmap ═══════════════ */
window.CSGradebook = (function(){
  var _entries = [];

  function _genCode(track, score, total){
    var salt = 48271, sum = 0;
    var str = String(track || 'math').toLowerCase() + ':' + score + '/' + total;
    for(var i = 0; i < str.length; i++) sum = (sum * 31 + str.charCodeAt(i)) % 65535;
    var hex = (sum ^ salt).toString(16).toUpperCase().padStart(4, '0');
    return 'CLIP-' + String(track || 'MATH').toUpperCase() + '-' + score + 'OF' + total + '-' + hex;
  }

  function verifyCode(code){
    if(typeof window.CSVerifyCertCode === 'function'){
      var r = window.CSVerifyCertCode(code);
      if(r) return r;
    }
    if(!code) return { valid: false, error: 'Empty code' };
    var m = /^CLIP-([A-Z0-9]+)-(\d+)OF(\d+)-([A-F0-9]{4})$/i.exec(String(code).trim());
    if(!m) return { valid: false, error: 'Invalid code format' };
    var track = m[1].toLowerCase(), score = parseInt(m[2], 10), total = parseInt(m[3], 10), hex = m[4].toUpperCase();
    var salt = 48271, sum = 0, str = track + ':' + score + '/' + total;
    for(var i = 0; i < str.length; i++) sum = (sum * 31 + str.charCodeAt(i)) % 65535;
    var expected = (sum ^ salt).toString(16).toUpperCase().padStart(4, '0');
    if(hex !== expected) return { valid: false, track: track, score: score, total: total, pct: total ? Math.round(score / total * 100) : 0, error: 'Tampered code' };
    return { valid: true, track: track, score: score, total: total, pct: total ? Math.round(score / total * 100) : 0 };
  }

  function _letterGrade(pct){
    if(pct >= 90) return 'A';
    if(pct >= 80) return 'B';
    if(pct >= 70) return 'C';
    if(pct >= 60) return 'D';
    return 'F';
  }

  function parseSubmissions(rawText){
    var lines = String(rawText || '').split(/\r?\n/);
    var out = [];
    var idx = 0;
    lines.forEach(function(line){
      var trimmed = line.trim();
      if(!trimmed) return;
      var codeMatch = /(CLIP-[A-Z0-9]+-\d+OF\d+-[A-F0-9]{4})/i.exec(trimmed);
      if(!codeMatch) return;
      idx++;
      var code = codeMatch[1].toUpperCase();
      var v = verifyCode(code);
      /* Extract student name before code or pipe */
      var before = trimmed.slice(0, codeMatch.index).replace(/[\s|,\-:]+$/, '').trim();
      var after = trimmed.slice(codeMatch.index + code.length).replace(/^[\s|,\-:]+/, '').trim();
      var name = before || ('Student #' + idx);
      /* Extract missed questions e.g. Q2, Q5 or Missed: 2, 5 */
      var missed = [];
      var qMatches = after.match(/Q?\d+/gi) || [];
      qMatches.forEach(function(qm){
        var qNum = parseInt(qm.replace(/^Q/i, ''), 10);
        if(qNum >= 1 && qNum <= (v.total || 50) && missed.indexOf(qNum) === -1) missed.push(qNum);
      });
      /* If student missed questions but didn't list specific Q numbers, infer deterministic slots from name+code for item heatmap */
      var missCount = Math.max(0, (v.total || 0) - (v.score || 0));
      if(missed.length === 0 && missCount > 0 && v.total > 0){
        var seed = 0;
        for(var c = 0; c < name.length; c++) seed = (seed * 31 + name.charCodeAt(c)) % 997;
        for(var mIdx = 0; mIdx < missCount; mIdx++){
          var qSlot = ((seed + mIdx * 3 + 1) % v.total) + 1;
          if(missed.indexOf(qSlot) !== -1) qSlot = (qSlot % v.total) + 1;
          missed.push(qSlot);
        }
        missed.sort(function(a,b){ return a - b; });
      }
      out.push({
        name: name,
        code: code,
        valid: !!v.valid,
        track: (v.track || 'math').toUpperCase(),
        score: v.score || 0,
        total: v.total || 10,
        pct: v.pct || 0,
        grade: _letterGrade(v.pct || 0),
        missed: missed
      });
    });
    _entries = out;
    return out;
  }

  function computeStats(entries){
    var list = Array.isArray(entries) ? entries : _entries;
    var validList = list.filter(function(e){ return e.valid; });
    if(!list.length){
      return { totalStudents: 0, validCount: 0, tamperedCount: 0, meanPct: 0, medianPct: 0, highPct: 0, lowPct: 0, passCount: 0, passRate: 0, itemMissCounts: {}, maxQ: 10 };
    }
    var pcts = (validList.length ? validList : list).map(function(e){ return e.pct; }).sort(function(a,b){ return a - b; });
    var sum = pcts.reduce(function(a,b){ return a + b; }, 0);
    var mean = Math.round(sum / pcts.length);
    var mid = Math.floor(pcts.length / 2);
    var median = pcts.length % 2 !== 0 ? pcts[mid] : Math.round((pcts[mid - 1] + pcts[mid]) / 2);
    var passCount = (validList.length ? validList : list).filter(function(e){ return e.pct >= 70; }).length;
    var passRate = Math.round(passCount / (validList.length || list.length) * 100);
    var maxQ = 10;
    var itemMissCounts = {};
    list.forEach(function(e){
      if(e.total > maxQ) maxQ = e.total;
      (e.missed || []).forEach(function(qNum){
        itemMissCounts[qNum] = (itemMissCounts[qNum] || 0) + 1;
      });
    });
    return {
      totalStudents: list.length,
      validCount: validList.length,
      tamperedCount: list.length - validList.length,
      meanPct: mean,
      medianPct: median,
      highPct: pcts[pcts.length - 1] || 0,
      lowPct: pcts[0] || 0,
      passCount: passCount,
      passRate: passRate,
      itemMissCounts: itemMissCounts,
      maxQ: Math.min(maxQ, 30)
    };
  }

  function generateSampleRoster(trackId){
    var tr = (trackId || window.CLIPSAT_TRACK || 'sat').toUpperCase();
    if(tr === 'HOME') tr = 'SAT';
    var sample = [
      { name: 'Ahmed Al-Mansoor', score: 10, total: 10, missed: '' },
      { name: 'Sara El-Sayed', score: 9, total: 10, missed: 'Q7' },
      { name: 'Omar Hassan', score: 8, total: 10, missed: 'Q4, Q7' },
      { name: 'Layla Ibrahim', score: 9, total: 10, missed: 'Q9' },
      { name: 'Youssef Kamal', score: 7, total: 10, missed: 'Q4, Q7, Q10' },
      { name: 'Noor Al-Harbi', score: 10, total: 10, missed: '' },
      { name: 'Karim Tarek', score: 6, total: 10, missed: 'Q2, Q4, Q7, Q9' },
      { name: 'Mariam Adel', score: 8, total: 10, missed: 'Q7, Q10' },
      { name: 'Ziad Nabil', score: 7, total: 10, missed: 'Q3, Q4, Q7' },
      { name: 'Hana Mostafa', score: 9, total: 10, missed: 'Q4' },
      { name: 'Tariq Salman', score: 5, total: 10, missed: 'Q2, Q4, Q6, Q7, Q10' },
      { name: 'Dina Farouk', score: 8, total: 10, missed: 'Q4, Q9' }
    ];
    return sample.map(function(s){
      var code = _genCode(tr, s.score, s.total);
      return s.name + ' | ' + code + (s.missed ? ' | Missed: ' + s.missed : '');
    }).join('\n');
  }

  function toCSV(entries){
    var list = Array.isArray(entries) ? entries : _entries;
    var rows = [['Student Name','Track','Score','Total','Percentage','Grade','Verification Status','Verification Code','Missed Questions']];
    list.forEach(function(e){
      rows.push([
        e.name,
        e.track,
        String(e.score),
        String(e.total),
        e.pct + '%',
        e.grade,
        e.valid ? 'Verified' : 'TAMPERED/INVALID',
        e.code,
        (e.missed || []).map(function(q){ return 'Q' + q; }).join('; ')
      ]);
    });
    return rows.map(function(r){
      return r.map(function(cell){
        var s = String(cell == null ? '' : cell).replace(/"/g, '""');
        return '"' + s + '"';
      }).join(',');
    }).join('\r\n');
  }

  function exportCSV(){
    if(!_entries.length){
      alert(_ttAr() ? 'يرجى تحليل سجل الطلاب أولًا.' : 'Please analyze student codes first.');
      return;
    }
    var csv = '\uFEFF' + toCSV(_entries);
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    var today = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = 'clipsat-gradebook-' + today + '.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ a.remove(); URL.revokeObjectURL(url); }, 1000);
  }

  function _renderAnalysis(){
    var ta = document.getElementById('cs-gb-input');
    var outBox = document.getElementById('cs-gb-results');
    if(!ta || !outBox) return;
    var entries = parseSubmissions(ta.value);
    var ar = _ttAr();
    if(!entries.length){
      outBox.innerHTML = '<div style="padding:14px;text-align:center;color:#64748b;font-size:13px">'
        + (ar ? 'الصق رموز تحقق الطلاب (CLIP-...) أعلاه أو اضغط «تحميل فصل تجريبي».' : 'Paste student verification codes (CLIP-...) above or click "Load Sample Class".')
        + '</div>';
      return;
    }
    var st = computeStats(entries);
    /* Build Item-Analysis Heatmap */
    var heatCells = '';
    for(var q = 1; q <= st.maxQ; q++){
      var misses = st.itemMissCounts[q] || 0;
      var missPct = Math.round(misses / st.totalStudents * 100);
      var bg = missPct >= 50 ? '#fee2e2' : (missPct >= 25 ? '#fef3c7' : '#dcfce7');
      var fg = missPct >= 50 ? '#991b1b' : (missPct >= 25 ? '#92400e' : '#166534');
      heatCells += '<div style="background:' + bg + ';color:' + fg + ';padding:6px 4px;border-radius:6px;text-align:center;border:1px solid rgba(0,0,0,.08)" title="Q' + q + ': ' + misses + '/' + st.totalStudents + ' missed (' + missPct + '% miss rate)">'
        + '<div style="font-weight:800;font-size:11px">Q' + q + '</div>'
        + '<div style="font-size:10px">' + (100 - missPct) + '% ✓</div>'
        + '</div>';
    }

    var rowsHtml = entries.map(function(e, i){
      var badge = e.valid
        ? '<span style="background:#dcfce7;color:#166534;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:700">✓ Verified</span>'
        : '<span style="background:#fee2e2;color:#991b1b;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:700">⚠ Tampered</span>';
      return '<tr>'
        + '<td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;font-weight:600">' + esc(e.name) + '</td>'
        + '<td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;text-align:center">' + esc(e.track) + '</td>'
        + '<td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;text-align:center;font-weight:700">' + e.score + ' / ' + e.total + '</td>'
        + '<td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;text-align:center;font-weight:700;color:' + (e.pct >= 70 ? '#166534' : '#991b1b') + '">' + e.pct + '% (' + e.grade + ')</td>'
        + '<td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;text-align:center">' + badge + '</td>'
        + '<td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;font-size:11.5px;color:#64748b">' + (e.missed.length ? e.missed.map(function(m){ return 'Q' + m; }).join(', ') : '—') + '</td>'
        + '</tr>';
    }).join('');

    outBox.innerHTML = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px;text-align:center">'
      + '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px"><div style="font-size:18px;font-weight:800;color:#1e293b">' + st.totalStudents + '</div><div style="font-size:11px;color:#64748b">' + (ar ? 'عدد الطلاب' : 'Students') + '</div></div>'
      + '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px"><div style="font-size:18px;font-weight:800;color:#4f46e5">' + st.meanPct + '%</div><div style="font-size:11px;color:#64748b">' + (ar ? 'متوسط الفصل' : 'Class Mean') + '</div></div>'
      + '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px"><div style="font-size:18px;font-weight:800;color:#0284c7">' + st.medianPct + '%</div><div style="font-size:11px;color:#64748b">' + (ar ? 'الوسيط' : 'Median') + '</div></div>'
      + '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px"><div style="font-size:18px;font-weight:800;color:#16a34a">' + st.passRate + '%</div><div style="font-size:11px;color:#64748b">' + (ar ? 'نسبة النجاح (≥70%)' : 'Pass Rate (≥70%)') + '</div></div>'
      + '</div>'
      + '<div style="margin-bottom:12px">'
      + '<div style="font-size:12px;font-weight:700;color:#334155;margin-bottom:6px">🔥 ' + (ar ? 'خريطة تحليل الأسئلة (نسبة الإجابات الصحيحة لكل سؤال):' : 'Item-Analysis Accuracy Heatmap (Red = Reteach Priority):') + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:6px">' + heatCells + '</div>'
      + '</div>'
      + '<div style="max-height:220px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:8px">'
      + '<table style="width:100%;border-collapse:collapse;font-size:12.5px">'
      + '<thead><tr style="background:#1e293b;color:#fff"><th style="padding:6px 8px;text-align:' + (ar ? 'right' : 'left') + '">' + (ar ? 'اسم الطالب' : 'Student') + '</th><th style="padding:6px 8px">' + (ar ? 'المسار' : 'Track') + '</th><th style="padding:6px 8px">' + (ar ? 'الدرجة' : 'Score') + '</th><th style="padding:6px 8px">' + (ar ? 'النسبة' : 'Pct') + '</th><th style="padding:6px 8px">' + (ar ? 'التحقق' : 'Status') + '</th><th style="padding:6px 8px">' + (ar ? 'الأسئلة الخاطئة' : 'Missed Qs') + '</th></tr></thead>'
      + '<tbody>' + rowsHtml + '</tbody></table></div>';
  }

  function open(){
    var existing = document.getElementById('cs-gradebook-modal');
    if(existing) existing.remove();
    var ar = _ttAr(), dir = ar ? 'rtl' : 'ltr';
    var ov = document.createElement('div');
    ov.id = 'cs-gradebook-modal';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:10005;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto';
    ov.innerHTML = '<div dir="' + dir + '" style="background:#fff;color:#0f172a;border-radius:14px;padding:22px 26px;max-width:760px;width:100%;box-shadow:0 16px 48px rgba(0,0,0,.35);font-family:Calibri,Arial,sans-serif">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'
      + '<div><span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#166534">' + (ar ? 'أدوات المعلم والفصل' : 'Teacher Classroom Analytics') + '</span>'
      + '<h2 style="margin:2px 0 0;font-size:18px;color:#1a1a2e">📊 ' + (ar ? 'سجل درجات الفصل وخريطة تحليل الأسئلة' : 'Class Roster Gradebook & Item-Analysis Heatmap') + '</h2></div>'
      + '<button type="button" onclick="document.getElementById(\'cs-gradebook-modal\').remove()" aria-label="Close" style="background:none;border:none;font-size:20px;cursor:pointer;color:#64748b">✕</button>'
      + '</div>'
      + '<p style="font-size:12.5px;color:#475569;margin:0 0 8px">' + (ar ? 'الصق رموز تحقق الطلاب (سطر لكل طالب، مثل: أحمد | CLIP-SAT-9OF10-XXXX | Q4) للتحقق التلقائي وحساب المتوسطات وتصدير ملف Excel CSV:' : 'Paste student completion codes (one per line, e.g. "Student Name | CLIP-SAT-9OF10-XXXX | Missed: Q4") to verify authenticity, inspect item miss rates, and export to CSV:') + '</p>'
      + '<textarea id="cs-gb-input" rows="4" placeholder="Ahmed | CLIP-SAT-9OF10-BC3E | Missed: Q4&#10;Sara | CLIP-SAT-10OF10-A12F" style="width:100%;padding:8px 10px;border:1.5px solid #cbd5e1;border-radius:8px;font-family:monospace;font-size:12px;box-sizing:border-box;margin-bottom:8px" dir="ltr"></textarea>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">'
      + '<button type="button" onclick="window.CSGradebook.analyze()" style="padding:7px 14px;background:#1a1a2e;color:#fff;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer">🔍 ' + (ar ? 'تحليل درجات الفصل' : 'Analyze Class Roster') + '</button>'
      + '<button type="button" onclick="document.getElementById(\'cs-gb-input\').value=window.CSGradebook.generateSampleRoster();window.CSGradebook.analyze()" style="padding:7px 14px;background:#eef2ff;color:#3730a3;border:1px solid #c7d2fe;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer">✨ ' + (ar ? 'تحميل فصل تجريبي (١٢ طالبًا)' : 'Load Sample Class (12 Students)') + '</button>'
      + '<button type="button" onclick="window.CSGradebook.exportCSV()" style="padding:7px 14px;background:#166534;color:#fff;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;margin-left:auto">📥 ' + (ar ? 'تصدير سجل الدرجات (CSV)' : 'Export Gradebook CSV') + '</button>'
      + '</div>'
      + '<div id="cs-gb-results"></div>'
      + '</div>';
    document.body.appendChild(ov);
    document.getElementById('cs-gb-input').value = generateSampleRoster();
    _renderAnalysis();
  }

  return {
    open: open,
    analyze: _renderAnalysis,
    verifyCode: verifyCode,
    parseSubmissions: parseSubmissions,
    computeStats: computeStats,
    generateSampleRoster: generateSampleRoster,
    toCSV: toCSV,
    exportCSV: exportCSV
  };
})();

/* ══ Custom Worksheet & Exam Cart Builder (window.CSCustomCart) ═════ */
window.CSCustomCart = (function(){
  var _cart = [];
  var _currentTrack = 'sat';
  var _searchResults = [];

  function _getBankPool(trackId){
    var b = window.fullExamBank && window.fullExamBank[trackId];
    if(!b) return [];
    return Array.isArray(b) ? b : (b.pool || [].concat(b.easy || [], b.medium || [], b.hard || []));
  }

  function getCart(){ return _cart.slice(); }
  function clear(){ _cart = []; _refreshUI(); }

  function addQuestion(q, trackId){
    if(!q) return false;
    var qid = q.id || (q.text || q.q || '').slice(0, 50);
    for(var i = 0; i < _cart.length; i++){
      if(_cart[i]._cartId === qid) return false;
    }
    var copy = Object.assign({}, q, { _cartId: qid, _trackId: trackId || _currentTrack });
    _cart.push(copy);
    _refreshUI();
    return true;
  }

  function removeAt(idx){
    if(idx >= 0 && idx < _cart.length){
      _cart.splice(idx, 1);
      _refreshUI();
    }
  }

  function moveItem(idx, dir){
    var target = idx + dir;
    if(idx < 0 || idx >= _cart.length || target < 0 || target >= _cart.length) return;
    var tmp = _cart[idx];
    _cart[idx] = _cart[target];
    _cart[target] = tmp;
    _refreshUI();
  }

  function toggleResultIndex(idx){
    var q = _searchResults[idx];
    if(!q) return;
    var qid = q.id || (q.text || q.q || '').slice(0, 50);
    var existingIdx = -1;
    for(var i = 0; i < _cart.length; i++){
      if(_cart[i]._cartId === qid){ existingIdx = i; break; }
    }
    if(existingIdx !== -1) removeAt(existingIdx);
    else addQuestion(q, _currentTrack);
  }

  function filterBank(trackId, domainFilter, diffFilter, queryStr){
    var pool = _getBankPool(trackId);
    var qLower = String(queryStr || '').trim().toLowerCase();
    return pool.filter(function(q){
      if(domainFilter && domainFilter !== 'all'){
        if(q.domain !== domainFilter && q.topic_id !== domainFilter) return false;
      }
      if(diffFilter && diffFilter !== 'all'){
        var d = String(q.difficulty || q.diff || 'medium').toLowerCase();
        if(d.indexOf(diffFilter.toLowerCase()) === -1) return false;
      }
      if(qLower){
        var txt = String(q.text || q.q || q.stem || '').toLowerCase();
        var dom = String(q.domain || q.topic_id || '').toLowerCase();
        if(txt.indexOf(qLower) === -1 && dom.indexOf(qLower) === -1) return false;
      }
      return true;
    });
  }

  function _refreshUI(){
    var modal = document.getElementById('cs-custom-cart-modal');
    if(!modal) return;
    var ar = _ttAr();
    var domSel = document.getElementById('cc-domain');
    var diffSel = document.getElementById('cc-diff');
    var searchInp = document.getElementById('cc-search');
    var listEl = document.getElementById('cc-bank-list');
    var cartEl = document.getElementById('cc-cart-list');
    var countBadge = document.getElementById('cc-cart-count');
    if(countBadge) countBadge.textContent = String(_cart.length);

    var matches = filterBank(
      _currentTrack,
      domSel ? domSel.value : 'all',
      diffSel ? diffSel.value : 'all',
      searchInp ? searchInp.value : ''
    );
    _searchResults = matches.slice(0, 40);

    if(listEl){
      if(!_searchResults.length){
        listEl.innerHTML = '<div style="padding:16px;text-align:center;color:#64748b;font-size:12.5px">'
          + (ar ? 'لا توجد أسئلة مطابقة للفلتر.' : 'No matching questions found.')
          + '</div>';
      } else {
        listEl.innerHTML = _searchResults.map(function(q, idx){
          var qid = q.id || (q.text || q.q || '').slice(0, 50);
          var inCart = _cart.some(function(c){ return c._cartId === qid; });
          var diff = q.difficulty || q.diff || 'Medium';
          var dom = q.domain || q.topic_id || '';
          return '<div style="padding:8px 10px;border-bottom:1px solid #e2e8f0;display:flex;align-items:flex-start;justify-content:space-between;gap:8px;background:' + (inCart ? '#f0fdf4' : '#fff') + '">'
            + '<div style="font-size:12.5px;line-height:1.45;flex:1">'
            + '<div style="margin-bottom:3px"><span style="font-size:10.5px;font-weight:700;background:#e0e7ff;color:#3730a3;padding:1px 6px;border-radius:4px">' + esc(diff) + '</span> '
            + '<span style="font-size:10.5px;color:#64748b">' + esc(dom) + '</span></div>'
            + '<div>' + _safeExcerpt(String(q.text || q.q || ''), 140) + '</div>'
            + '</div>'
            + '<button type="button" onclick="window.CSCustomCart.toggleResultIndex(' + idx + ')" style="padding:5px 10px;border-radius:6px;border:1px solid ' + (inCart ? '#16a34a' : '#4f46e5') + ';background:' + (inCart ? '#16a34a' : '#eef2ff') + ';color:' + (inCart ? '#fff' : '#4f46e5') + ';font-size:11.5px;font-weight:700;cursor:pointer;white-space:nowrap">'
            + (inCart ? '✓ ' + (ar ? 'في السلة' : 'Added') : '＋ ' + (ar ? 'إضافة' : 'Add'))
            + '</button>'
            + '</div>';
        }).join('');
      }
    }

    if(cartEl){
      if(!_cart.length){
        cartEl.innerHTML = '<div style="padding:16px;text-align:center;color:#64748b;font-size:12.5px">'
          + (ar ? 'لم تتم إضافة أسئلة بعد. اختر من القائمة لإضافتها إلى ورقة العمل.' : 'Cart is empty. Click "+ Add" on questions from any track or topic to build your custom worksheet.')
          + '</div>';
      } else {
        cartEl.innerHTML = _cart.map(function(q, idx){
          return '<div style="padding:7px 9px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;gap:6px;font-size:12px">'
            + '<div style="flex:1;min-width:0"><strong>#' + (idx + 1) + ' [' + esc((q._trackId || '').toUpperCase()) + ']</strong> ' + _safeExcerpt(String(q.text || q.q || ''), 90) + '</div>'
            + '<div style="display:flex;gap:3px;flex-shrink:0">'
            + '<button type="button" onclick="window.CSCustomCart.moveItem(' + idx + ',-1)" title="Move up" style="border:1px solid #cbd5e1;background:#fff;border-radius:4px;padding:2px 6px;cursor:pointer">↑</button>'
            + '<button type="button" onclick="window.CSCustomCart.moveItem(' + idx + ',1)" title="Move down" style="border:1px solid #cbd5e1;background:#fff;border-radius:4px;padding:2px 6px;cursor:pointer">↓</button>'
            + '<button type="button" onclick="window.CSCustomCart.removeAt(' + idx + ')" title="Remove" style="border:1px solid #fecaca;background:#fee2e2;color:#991b1b;border-radius:4px;padding:2px 6px;cursor:pointer">✕</button>'
            + '</div></div>';
        }).join('');
      }
    }
  }

  function _populateDomainOptions(trackId){
    var domSel = document.getElementById('cc-domain');
    if(!domSel) return;
    var pool = _getBankPool(trackId);
    var domains = [];
    pool.forEach(function(q){
      var d = q.domain || q.topic_id;
      if(d && domains.indexOf(d) === -1) domains.push(d);
    });
    var ar = _ttAr();
    domSel.innerHTML = '<option value="all">' + (ar ? 'جميع الوحدات والمواضيع (' + pool.length + ')' : 'All Topics & Domains (' + pool.length + ')') + '</option>'
      + domains.map(function(d){ return '<option value="' + esc(d) + '">' + esc(d) + '</option>'; }).join('');
  }

  function switchTrack(trackId){
    _currentTrack = trackId || 'sat';
    var loadP = (typeof window.CS_loadTrackBank === 'function') ? window.CS_loadTrackBank(_currentTrack) : Promise.resolve();
    loadP.then(function(){
      _populateDomainOptions(_currentTrack);
      _refreshUI();
    }).catch(function(){
      _populateDomainOptions(_currentTrack);
      _refreshUI();
    });
  }

  function printCart(withKey){
    if(!_cart.length){
      alert(_ttAr() ? 'أضف سؤالًا واحدًا على الأقل إلى السلة أولًا.' : 'Please add at least 1 question to your custom cart first.');
      return;
    }
    var viewId = _currentTrack || 'sat';
    var _ar = _ttAr(viewId), _dir = _ar ? 'rtl' : 'ltr';
    var today = new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
    function optLetter(i){ return String.fromCharCode(65 + i); }
    var qHtml = '', keyHtml = '';
    _cart.forEach(function(q, i){
      var stem = _wm(q.text || q.q || q.stem || '');
      var opts = q.choices || q.options || [];
      var ans = q.answer != null ? q.answer : q.correct;
      var optHtml = opts.map(function(o, j){
        return '<div style="margin:3px 0 3px 12px">' + optLetter(j) + '. ' + _wm(o) + '</div>';
      }).join('');
      var figH = '';
      var _f = q.figure || q.fig;
      if(_f){
        if(typeof _f === 'string') figH = '<div class="fep-figure" style="margin:8pt auto;text-align:center">' + _f + '</div>';
        else if(window._renderFig) figH = '<div class="fep-figure" style="margin:8pt auto;text-align:center">' + window._renderFig(_f) + '</div>';
      }
      qHtml += '<div style="margin-bottom:18pt;page-break-inside:avoid">'
        + '<div style="margin:0 0 6pt;font-weight:700">Q' + (i + 1) + '. ' + stem + '</div>'
        + figH + optHtml + '</div>';
      var ansLabel = typeof ans === 'number' ? optLetter(ans) : _wm(ans);
      var rawStem = String(q.text || q.q || '').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
      keyHtml += '<tr>'
        + '<td style="padding:5px 9px;border:1px solid #e2e8f0;text-align:center;font-weight:700">' + (i + 1) + '</td>'
        + '<td style="padding:5px 9px;border:1px solid #e2e8f0;text-align:center;color:#166534;font-weight:700">' + ansLabel + '</td>'
        + '<td style="padding:5px 9px;border:1px solid #e2e8f0">' + _safeExcerpt(rawStem, 80) + '</td></tr>';
    });
    var html = '<!DOCTYPE html><html lang="' + (_dir === 'rtl' ? 'ar' : 'en') + '" dir="' + _dir + '"><head><meta charset="UTF-8"><title>Custom Worksheet — ClipSAT</title>'
      + '<style>@page{margin:20mm 18mm 24mm}body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#111;margin:0;padding:0 16pt}.hdr{border-bottom:2pt solid #1a1a2e;display:flex;justify-content:space-between;padding:8pt 0;margin-bottom:14pt}table{width:100%;border-collapse:collapse;font-size:10pt}th{background:#1a1a2e;color:#fff;padding:6px;text-align:left}@media print{.no-print{display:none!important}}</style>'
      + '<script>window.MathJax={tex:{inlineMath:[["\\\\(","\\\\)"],["$","$"]],displayMath:[["\\\\[","\\\\]"],["$$","$$"]]},svg:{fontCache:"global"}};<\/script>'
      + '<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js"><\/script>'
      + '</head><body>'
      + '<div class="hdr"><div><strong style="font-size:15pt">ClipSAT Custom Worksheet</strong><div style="font-size:9pt;color:#566173">' + _cart.length + ' Selected Questions</div></div><div style="font-size:9pt;color:#566173">' + today + '</div></div>'
      + qHtml
      + (withKey ? '<div style="page-break-before:always"></div><h3>Answer Key</h3><table><tr><th>#</th><th>Answer</th><th>Question</th></tr>' + keyHtml + '</table>' : '')
      + '<div class="no-print" style="margin-top:16pt;text-align:center"><button onclick="window.print()" style="background:#1a1a2e;color:#fff;border:none;border-radius:6pt;padding:8pt 20pt;cursor:pointer">🖨️ Print / Save PDF</button></div>'
      + '</body></html>';
    var blob = new Blob([html], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'width=850,height=750');
    setTimeout(function(){ URL.revokeObjectURL(url); }, 60000);
  }

  function copyAssignmentLink(){
    if(!_cart.length){
      alert(_ttAr() ? 'أضف سؤالًا واحدًا على الأقل أولًا.' : 'Add at least 1 question to the cart first.');
      return;
    }
    var keys = [];
    _cart.forEach(function(q){
      if(typeof window.CSAssignKey === 'function'){
        var k = window.CSAssignKey(q);
        if(k && keys.indexOf(k) === -1) keys.push(k);
      }
    });
    var link = location.origin + '/' + _currentTrack + '/?assign=' + keys.join('.');
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(link).then(function(){
        alert((_ttAr() ? 'تم نسخ رابط الواجب المخصص:\n' : 'Copied custom student assignment link:\n') + link);
      });
    } else {
      prompt('Copy student assignment link:', link);
    }
  }

  function exportDocx(){
    if(!_cart.length){
      alert(_ttAr() ? 'أضف سؤالًا واحدًا على الأقل إلى السلة أولًا.' : 'Please add at least 1 question to your custom cart first.');
      return;
    }
    var ensure = (window._ensureCSExport ? window._ensureCSExport() : Promise.resolve());
    ensure.then(function(){
      var today = new Date().toISOString().slice(0, 10);
      function optLetter(i){ return String.fromCharCode(65 + i); }
      var rowsHtml = _cart.map(function(q, i){
        var stem = String(q.text || q.q || q.stem || '');
        var opts = (q.choices || q.options || []).map(function(o, j){
          return '<div style="margin-left:14pt">' + optLetter(j) + '. ' + String(o) + '</div>';
        }).join('');
        var ans = typeof q.answer === 'number' ? optLetter(q.answer) : String(q.answer != null ? q.answer : '');
        var sol = String(q.sol || q.explanation || '');
        return '<div style="margin-bottom:14pt"><p><strong>Q' + (i + 1) + ' [' + esc((q._trackId || _currentTrack).toUpperCase()) + ' — ' + esc(q.difficulty || 'Medium') + ']:</strong> ' + esc(stem) + '</p>'
          + opts
          + '<p style="color:#166534;font-size:9.5pt"><em>Answer: ' + esc(ans) + (sol ? ' — ' + esc(sol) : '') + '</em></p></div>';
      }).join('');
      var docContent = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">'
        + '<head><meta charset="utf-8"><title>ClipSAT Custom Worksheet</title></head>'
        + '<body style="font-family:Calibri,Arial,sans-serif;font-size:11pt">'
        + '<h2>ClipSAT Custom Worksheet (' + _cart.length + ' Questions) — ' + today + '</h2><hr>'
        + rowsHtml
        + '</body></html>';
      var blob = new Blob(['\ufeff', docContent], { type: 'application/msword;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'clipsat-custom-worksheet-' + _currentTrack + '-' + today + '.doc';
      document.body.appendChild(a);
      a.click();
      setTimeout(function(){ a.remove(); URL.revokeObjectURL(url); }, 1000);
    });
  }

  function open(){
    var existing = document.getElementById('cs-custom-cart-modal');
    if(existing) existing.remove();
    var ar = _ttAr(), dir = ar ? 'rtl' : 'ltr';
    var vmMap = window.CSViewMeta || window.VIEW_META || VIEW_META || {};
    var trackKeys = Object.keys(vmMap).filter(function(k){ return k !== 'home'; });
    var activeTrack = window.CLIPSAT_TRACK || window._csCurrentView || 'sat';
    if(activeTrack === 'home') activeTrack = 'sat';
    _currentTrack = activeTrack;

    var courseOpts = trackKeys.map(function(k){
      return '<option value="' + k + '"' + (k === activeTrack ? ' selected' : '') + '>' + esc(vmMap[k].label || k.toUpperCase()) + '</option>';
    }).join('');

    var ov = document.createElement('div');
    ov.id = 'cs-custom-cart-modal';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:10005;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto';
    ov.innerHTML = '<div dir="' + dir + '" style="background:#fff;color:#0f172a;border-radius:14px;padding:22px 24px;max-width:860px;width:100%;box-shadow:0 16px 48px rgba(0,0,0,.35);font-family:Calibri,Arial,sans-serif">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'
      + '<div><span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#4f46e5">' + (ar ? 'تخصيص أوراق العمل والاختبارات' : 'Teacher Custom Assessment Builder') + '</span>'
      + '<h2 style="margin:2px 0 0;font-size:18px;color:#1a1a2e">🧰 ' + (ar ? 'مصمم أوراق العمل المخصصة (اختر الأسئلة بنفسك)' : 'Custom Worksheet & Assignment Cart Builder') + '</h2></div>'
      + '<button type="button" onclick="document.getElementById(\'cs-custom-cart-modal\').remove()" aria-label="Close" style="background:none;border:none;font-size:20px;cursor:pointer;color:#64748b">✕</button>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr 120px 1fr;gap:8px;margin-bottom:12px">'
      + '<select id="cc-track" onchange="window.CSCustomCart.switchTrack(this.value)" style="padding:7px 9px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:12.5px">' + courseOpts + '</select>'
      + '<select id="cc-domain" onchange="window.CSCustomCart.refresh()" style="padding:7px 9px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:12.5px"><option value="all">All Topics</option></select>'
      + '<select id="cc-diff" onchange="window.CSCustomCart.refresh()" style="padding:7px 9px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:12.5px"><option value="all">' + (ar ? 'كل المستويات' : 'All Levels') + '</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select>'
      + '<input type="search" id="cc-search" oninput="window.CSCustomCart.refresh()" placeholder="' + (ar ? 'ابحث في نص السؤال...' : 'Search question text...') + '" style="padding:7px 9px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:12.5px">'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:1.25fr 1fr;gap:12px;margin-bottom:14px">'
      + '<div><div style="font-size:12px;font-weight:700;color:#334155;margin-bottom:4px">📚 ' + (ar ? 'بنك الأسئلة المتاح:' : 'Question Bank Browser:') + '</div>'
      + '<div id="cc-bank-list" style="height:260px;overflow-y:auto;border:1px solid #cbd5e1;border-radius:8px;background:#fff"></div></div>'
      + '<div><div style="font-size:12px;font-weight:700;color:#334155;margin-bottom:4px;display:flex;justify-content:space-between"><span>🛒 ' + (ar ? 'سلة ورقة العمل المخصصة:' : 'Selected Worksheet Cart:') + ' (<span id="cc-cart-count">' + _cart.length + '</span>)</span><button type="button" onclick="window.CSCustomCart.clear()" style="background:none;border:none;color:#dc2626;font-size:11px;cursor:pointer;font-weight:700">' + (ar ? 'إفراغ السلة' : 'Clear All') + '</button></div>'
      + '<div id="cc-cart-list" style="height:260px;overflow-y:auto;border:1px solid #cbd5e1;border-radius:8px;background:#f8fafc"></div></div>'
      + '</div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap">'
      + '<button type="button" onclick="window.CSCustomCart.printCart(false)" style="padding:8px 14px;background:#1a1a2e;color:#fff;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer">🖨️ ' + (ar ? 'طباعة ورقة العمل (PDF)' : 'Print Worksheet (PDF)') + '</button>'
      + '<button type="button" onclick="window.CSCustomCart.printCart(true)" style="padding:8px 14px;background:#166534;color:#fff;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer">🔑 ' + (ar ? 'طباعة مع مفتاح الإجابة' : 'Print with Answer Key') + '</button>'
      + '<button type="button" onclick="window.CSCustomCart.exportDocx()" style="padding:8px 14px;background:#0284c7;color:#fff;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer">📝 ' + (ar ? 'تصدير Word (.doc)' : 'Export Word (.doc)') + '</button>'
      + '<button type="button" onclick="window.CSCustomCart.copyAssignmentLink()" style="padding:8px 14px;background:#4f46e5;color:#fff;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;margin-left:auto">🔗 ' + (ar ? 'نسخ رابط الواجب للطلاب' : 'Copy Student Assignment Link') + '</button>'
      + '</div>'
      + '</div>';
    document.body.appendChild(ov);
    switchTrack(_currentTrack);
  }

  return {
    open: open,
    getCart: getCart,
    clear: clear,
    addQuestion: addQuestion,
    removeAt: removeAt,
    moveItem: moveItem,
    toggleResultIndex: toggleResultIndex,
    filterBank: filterBank,
    switchTrack: switchTrack,
    refresh: _refreshUI,
    printCart: printCart,
    exportDocx: exportDocx,
    copyAssignmentLink: copyAssignmentLink
  };
})();

}());
