/* ══════════════════════════════════════════════════════════════════
   CLIPSAT PRINT SYSTEM — Quiz + Exam
   ══════════════════════════════════════════════════════════════════ */
(function(){

/* ── Get MathJax CDN src ── */
var _mjSrc = (function(){
  var scripts = document.querySelectorAll('script[src*="mathjax"]');
  return scripts.length ? scripts[0].src : 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js';
})();

/* ── Retrieve course label from nav or active view ── */
function _getCourseLabel() {
  var treeLbl = document.getElementById('navTreeLabel');
  if (treeLbl && treeLbl.textContent.trim() && window.CLIPSAT_TRACK && window.CLIPSAT_TRACK !== 'home') {
    return treeLbl.textContent.trim();
  }
  var sel = document.querySelector('.nav-select');
  if (sel && sel.options && sel.options[sel.selectedIndex]) {
    return sel.options[sel.selectedIndex].text.trim();
  }
  var active = document.querySelector('.view.active');
  if (active) {
    var id = (active.id || '').replace(/^view-/,'');
    if (window.VIEW_META && window.VIEW_META[id] && window.VIEW_META[id].label) {
      return window.VIEW_META[id].label;
    }
    return id.replace(/-/g,' ').toUpperCase();
  }
  return 'ClipSAT';
}

/* ═══ QUIZ PRINT ══════════════════════════════════════════════════ */
window.printCQ = function(btn) {
  var paper  = btn.closest('.cq-paper');
  if (!paper) return;

  /* ── meta info ── */
  var _logoUrl = (document.getElementById('site-logo-img')||{src:''}).src;
  var logoTag  = _logoUrl
    ? '<img class="ph-logo-img" src="' + _logoUrl + '" alt="ClipSAT">'
    : '<div class="ph-logo">C</div>';
  var courseLabel = _getCourseLabel();
  var chapterEl   = btn.closest('.chapter') || btn.closest('section');
  var chapterName = '';
  if (chapterEl) {
    var h2 = chapterEl.querySelector('.chead h1, .chead h2');
    if (h2) chapterName = h2.textContent.trim();
  }
  var metaEl  = paper.querySelector('.cq-meta');
  var metaTxt = metaEl ? metaEl.textContent.trim() : '';
  var today   = new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});

  /* ── gather questions ── */
  var items = paper.querySelectorAll('.cq-item');
  var LTR   = ['A','B','C','D','E'];

  var qHTML = '';
  items.forEach(function(item, qi) {
    var stemEl = item.querySelector('.cq-qt');
    var stem   = stemEl ? stemEl.innerHTML : '';
    /* If a table exists inside item/row outside cq-qt/cq-figure, capture it */
    var extraTbls = item.querySelectorAll('table');
    extraTbls.forEach(function(tbl){
      if((!stemEl || !stemEl.contains(tbl)) && !tbl.closest('.cq-figure')){
        stem += '<div class="pq-stem-table">' + tbl.outerHTML + '</div>';
      }
    });
    var fig    = item.querySelector('.cq-figure');
    var figH   = fig ? '<div class="pq-fig">' + fig.innerHTML + '</div>' : '';
    var opts   = item.querySelectorAll('.cq-opt .cq-ct');

    var optsH = '';
    opts.forEach(function(o, ci) {
      optsH += '<div class="pq-opt"><span class="pq-lt">(' + LTR[ci] + ')</span><span class="pq-ct">' + o.innerHTML + '</span></div>';
    });

    qHTML +=
      '<div class="pq-item">' +
        '<div class="pq-num">' + (qi + 1) + '</div>' +
        '<div class="pq-body">' +
          figH +
          '<div class="pq-stem">' + stem + '</div>' +
          '<div class="pq-opts">' + optsH + '</div>' +
        '</div>' +
      '</div>';
  });

  /* ── RTL detection ── */
  var isRtl = document.body.classList.contains('rtl') ||
              (document.documentElement && document.documentElement.lang === 'ar') ||
              (paper.getAttribute('dir') === 'rtl') ||
              (typeof _ttDir === 'function' && _ttDir() === 'rtl');
  var lang = isRtl ? 'ar' : 'en';
  var dir = isRtl ? 'rtl' : 'ltr';

  var _origin = (window.location && window.location.origin) || '';
  /* ── open print window via Blob URL (self-hosted KaTeX + light print figure vars) ── */
  var _cqHtml = '<!DOCTYPE html><html lang="' + lang + '" dir="' + dir + '"><head>' +
    '<meta charset="utf-8">' +
    '<title>ClipSAT Quiz — ' + courseLabel + '</title>' +
    '<link rel="stylesheet" href="' + _origin + '/vendor/katex/katex.min.css">' +
    '<script defer src="' + _origin + '/vendor/katex/katex.min.js"><\/script>' +
    '<script defer src="' + _origin + '/vendor/katex/contrib/auto-render.min.js" onload="renderMathInElement(document.body,{delimiters:[{left:\'$$\',right:\'$$\',display:true},{left:\'\\\\[\',right:\'\\\\]\',display:true},{left:\'\\\\(\',right:\'\\\\)\',display:false}],throwOnError:false})"><\/script>' +
    '<style>' +
    ':root{--fig-bg:#ffffff;--fig-border:#cbd5e1;--fig-ink:#0E1726;--fig-muted:#475569;--fig-grid:#cbd5e1;--fig-indigo:#1E3A6E;--fig-indigo-2:#2B5BA8;--fig-indigo-soft:rgba(30,58,110,.09);--fig-indigo-fill2:rgba(30,62,112,.14);--fig-amber:#B8801F;--fig-amber-text:#784F08;--fig-amber-soft:rgba(184,128,31,.12);--fig-teal:#0e7490;--fig-purple:#7C3AED;--fig-rose:#D94656}' +
    '@page{margin:18mm 18mm 22mm 18mm}' +
    'body{margin:0;padding:0;font-family:Georgia,"Times New Roman",serif;font-size:11pt;line-height:1.6;color:#000;background:#fff}' +
    '.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}' +
    'body[dir="rtl"]{direction:rtl;text-align:right;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
    'body[dir="rtl"] .ph{direction:rtl}' +
    'body[dir="rtl"] .ph-meta{text-align:left}' +
    'body[dir="rtl"] .pq-item{direction:rtl}' +
    'body[dir="rtl"] .pq-opts{margin-left:0;margin-right:4pt}' +
    'body[dir="rtl"] .info-bar{direction:rtl}' +
    'body[dir="rtl"] .instr{border-left:none;border-right:3pt solid #1a1a2e;text-align:right}' +
    'body[dir="rtl"] .pq-footer{direction:rtl}' +
    'body[dir="rtl"] mjx-container,body[dir="rtl"] .MathJax,body[dir="rtl"] .katex,body[dir="rtl"] svg{direction:ltr!important;unicode-bidi:isolate}' +
    /* ── Branded header ── */
    '.ph{display:flex;align-items:flex-start;justify-content:space-between;gap:16pt;border-bottom:2pt solid #1a1a2e;padding-bottom:10pt;margin-bottom:14pt}' +
    '.ph-brand{display:flex;align-items:center;gap:10pt}' +
    '.ph-logo{width:42pt;height:42pt;border-radius:8pt;background:#1a1a2e;display:flex;align-items:center;justify-content:center;color:#fff;font-family:Georgia,serif;font-size:18pt;font-weight:700;flex-shrink:0}' +
    '.ph-logo-img{width:42pt;height:42pt;object-fit:contain;flex-shrink:0}' +
    '.ph-name{font-size:15pt;font-weight:700;letter-spacing:.01em;line-height:1.1;color:#1a1a2e}' +
    '.ph-author{font-size:8pt;letter-spacing:.12em;text-transform:uppercase;color:#566173;margin-top:2pt}' +
    '.ph-mid{flex:1;text-align:center}' +
    '.ph-course{font-size:12pt;font-weight:700;color:#1a1a2e;letter-spacing:.02em}' +
    '.ph-chapter{font-size:9.5pt;color:#566173;margin-top:3pt}' +
    '.ph-meta{font-size:8.5pt;color:#566173;text-align:right;white-space:nowrap;line-height:1.8}' +
    '.ph-meta strong{color:#1a1a2e}' +
    /* ── Student info bar ── */
    '.info-bar{display:grid;grid-template-columns:2fr 1fr 1fr;gap:16pt;border:1pt solid #ccc;border-radius:4pt;padding:8pt 12pt;margin-bottom:14pt;font-size:9pt}' +
    '.info-bar label{font-weight:700;font-size:8pt;letter-spacing:.08em;text-transform:uppercase;color:#888;display:block;margin-bottom:4pt}' +
    '.info-bar .info-line{border-bottom:1pt solid #999;height:16pt}' +
    /* ── Instructions strip ── */
    '.instr{background:#f5f5f5;border-left:3pt solid #1a1a2e;padding:6pt 10pt;margin-bottom:14pt;font-size:9pt;color:#333}' +
    '.instr strong{display:block;font-size:8pt;letter-spacing:.1em;text-transform:uppercase;color:#1a1a2e;margin-bottom:3pt}' +
    /* ── Question items ── */
    '.pq-item{display:flex;gap:10pt;margin-bottom:16pt;page-break-inside:avoid;align-items:flex-start}' +
    '.pq-num{width:20pt;height:20pt;border-radius:50%;border:1.5pt solid #1a1a2e;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:9pt;flex-shrink:0;margin-top:1pt}' +
    '.pq-body{flex:1;min-width:0}' +
    '.pq-stem{margin-bottom:8pt}' +
    '.pq-fig{margin:6pt 0 8pt;text-align:center;break-inside:avoid;page-break-inside:avoid}' +
    '.pq-fig svg{width:100%;max-width:220pt;height:auto;direction:ltr!important;unicode-bidi:isolate;border:1pt solid #e0e0e0;border-radius:4pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
    '.pq-fig .exam-fig{display:block;margin:0 auto;max-width:220pt;height:auto}' +
    'table, .exam-table, table.exam-table, .pq-stem table, .pq-fig table, .pq-body table, .pq-stem-table table{border-collapse:collapse;margin:8pt auto;font-size:9.5pt;font-family:sans-serif;width:auto!important;max-width:100%;break-inside:avoid;page-break-inside:avoid}' +
    'table th, table td, .exam-table th,.exam-table td,.pq-stem table th,.pq-stem table td,.pq-fig table th,.pq-fig table td,.pq-body table th,.pq-body table td,.pq-stem-table table th,.pq-stem-table table td{border:1pt solid #999;padding:4pt 10pt;text-align:center}' +
    'table th, .exam-table th,.pq-stem table th,.pq-fig table th,.pq-body table th,.pq-stem-table table th{background:#e8edf8!important;color:#1a1a2e!important;font-weight:700;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
    '.pq-fig .exam-barchart{font-family:sans-serif;font-size:8pt;max-width:240pt;margin:6pt auto}' +
    '.pq-fig .ebc-wrap{display:flex;align-items:flex-end;gap:8pt;height:90pt;border-bottom:1.5pt solid #1a1a2e;padding-bottom:0;justify-content:center}' +
    '.pq-fig .ebc-bar{width:28pt;background:#3b4fc8!important;display:flex;align-items:flex-end;justify-content:center;font-size:7pt;color:#fff!important;padding-bottom:2pt;position:relative;border-radius:2pt 2pt 0 0;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
    '.pq-fig .ebc-labels{display:flex;justify-content:center;gap:8pt;margin-top:3pt}' +
    '.pq-fig .ebc-labels span{width:28pt;text-align:center;font-size:7pt;color:#555}' +
    '.pq-opts{display:grid;grid-template-columns:1fr 1fr;gap:4pt 16pt;margin-left:4pt}' +
    '.pq-opt{display:flex;align-items:baseline;gap:6pt;font-size:10.5pt}' +
    '.pq-lt{font-weight:700;color:#1a1a2e;flex-shrink:0;font-size:9pt}' +
    /* ── Footer ── */
    '.pq-footer{border-top:1pt solid #ccc;margin-top:20pt;padding-top:8pt;display:flex;justify-content:space-between;font-size:8pt;color:#888}' +
    '</style>' +
    '</head><body dir="' + dir + '">' +
    /* Header */
    '<div class="ph">' +
      '<div class="ph-brand">' +
        logoTag +
        '<div><div class="ph-name">ClipSAT</div><div class="ph-author">Mr. Mohamed Abdallah</div></div>' +
      '</div>' +
      '<div class="ph-mid">' +
        '<div class="ph-course">' + courseLabel + '</div>' +
        (chapterName ? '<div class="ph-chapter">' + chapterName + '</div>' : '') +
      '</div>' +
      '<div class="ph-meta">' +
        '<div>Date: <strong>' + today + '</strong></div>' +
        '<div>' + metaTxt + '</div>' +
        '<div>Score: _____ / ' + items.length + '</div>' +
      '</div>' +
    '</div>' +
    /* Student info */
    '<div class="info-bar">' +
      '<div><label>Student Name</label><div class="info-line"></div></div>' +
      '<div><label>Class / Grade</label><div class="info-line"></div></div>' +
      '<div><label>Score</label><div class="info-line"></div></div>' +
    '</div>' +
    /* Instructions */
    '<div class="instr"><strong>Instructions</strong>' +
      (isRtl ? 'اختر الإجابة الصحيحة لكل سؤال وضع دائرة حول رمز الإجابة. أظهر خطوات حلك في المساحة المخصصة.' : 'Choose the best answer for each question. Circle the letter of your choice. Show any working in the space provided.') +
    '</div>' +
    /* Questions */
    qHTML +
    /* Footer */
    '<div class="pq-footer">' +
      '<span>ClipSAT · clipsat.org · Mr. Mohamed Abdallah</span>' +
      '<span>' + courseLabel + ' · ' + today + '</span>' +
    '</div>' +
    '<script>window.addEventListener("load",function(){setTimeout(window.print,350);});<\/script>' +
    '</body>' +
    '</html>';
  var _cqBlob=new Blob([_cqHtml],{type:'text/html;charset=utf-8'});
  var _cqUrl=URL.createObjectURL(_cqBlob);
  var pw=window.open(_cqUrl,'_blank','width=860,height=720');
  if(!pw){alert('Please allow pop-ups to print the quiz.');URL.revokeObjectURL(_cqUrl);return;}
  setTimeout(function(){URL.revokeObjectURL(_cqUrl);},120000);
};

/* patchExamPrint removed — tgPrint now uses window.open() directly */

})(); /* end ClipSAT Print System */

/* ─────────────────────────────────────────────── */

