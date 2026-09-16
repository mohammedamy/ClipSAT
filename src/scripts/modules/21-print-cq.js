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
  var sel = document.querySelector('.nav-select');
  if (sel && sel.options[sel.selectedIndex]) {
    return sel.options[sel.selectedIndex].text.trim();
  }
  var active = document.querySelector('.view.active');
  if (active) {
    var id = active.id || '';
    return id.replace('view-','').replace(/-/g,' ').toUpperCase();
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
    var h2 = chapterEl.querySelector('.chead h2');
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

  /* ── open print window via Blob URL (fixes blank MathJax in popup) ── */
  var _cqHtml = '<!DOCTYPE html><html lang="en"><head>' +
    '<meta charset="utf-8">' +
    '<title>ClipSAT Quiz — ' + courseLabel + '</title>' +
    /* stem/opts below are copied in as .innerHTML — i.e. already KaTeX-rendered
       markup (<span class="katex">…</span>), not raw "\(…\)" source. This popup
       is its own blank document with none of the main page's <head>, so without
       KaTeX's own stylesheet here too, the screen-reader-only .katex-mathml
       annotation inside that markup — normally hidden only by a rule in
       katex.min.css — has nothing hiding it and renders as a second, plain-text
       copy of every formula right next to the properly-styled one. (The MathJax
       script below is a separate, harmless no-op for this content — it's kept
       only because other print windows in this file share this build and do
       need it; it finds no "\(…\)"-delimited raw text left to typeset here.) */
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.css" crossorigin="anonymous">' +
    '<script>window.MathJax={tex:{inlineMath:[["\\\\(","\\\\)"]],displayMath:[["\\\\[","\\\\]"]],tags:"none"},svg:{fontCache:"global",scale:1},options:{skipHtmlTags:["script","noscript","style","textarea","pre","code"]}};<\/script>' +
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js"><\/script>' +
    '<style>' +
    '@page{margin:18mm 18mm 22mm 18mm}' +
    'body{margin:0;padding:0;font-family:Georgia,"Times New Roman",serif;font-size:11pt;line-height:1.6;color:#000;background:#fff}' +
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
    '.pq-body{flex:1}' +
    '.pq-stem{margin-bottom:8pt}' +
    '.pq-fig{margin:6pt 0 8pt;text-align:center}' +
    '.pq-fig svg{max-width:220pt;height:auto;border:1pt solid #e0e0e0;border-radius:4pt}' +
    '.pq-opts{display:grid;grid-template-columns:1fr 1fr;gap:4pt 16pt;margin-left:4pt}' +
    '.pq-opt{display:flex;align-items:baseline;gap:6pt;font-size:10.5pt}' +
    '.pq-lt{font-weight:700;color:#1a1a2e;flex-shrink:0;font-size:9pt}' +
    /* ── Footer ── */
    '.pq-footer{border-top:1pt solid #ccc;margin-top:20pt;padding-top:8pt;display:flex;justify-content:space-between;font-size:8pt;color:#888}' +
    '</style>' +
    '</head><body>' +
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
      'Choose the best answer for each question. Circle the letter of your choice. Show any working in the space provided.' +
    '</div>' +
    /* Questions */
    qHTML +
    /* Footer */
    '<div class="pq-footer">' +
      '<span>ClipSAT · clipsat.com · Mr. Mohamed Abdallah</span>' +
      '<span>' + courseLabel + ' · ' + today + '</span>' +
    '</div>' +
    '</body>' +
    '<script>MathJax.startup.promise.then(function(){setTimeout(window.print,400);});<\/script>' +
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

