/* ═══════════════════════════════════════════════════════════════════════════
   02d-exam-print-and-lang.js — Exam Language Mode, Copy LaTeX & Print Engine
   Extracted from 02-core-app.js (Pillar 5 Modularization).
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  /* ── Header "More" overflow menu — toggle + outside-click/Escape-to-close ── */
  (function(){
    var btn=document.getElementById('navMoreBtn'), panel=document.getElementById('navMorePanel');
    if(!btn||!panel) return;
    function closePanel(){ panel.hidden=true; btn.setAttribute('aria-expanded','false'); }
    function openPanel(){
      panel.hidden=false; btn.setAttribute('aria-expanded','true');
      if (window._ensureTeacherMode) window._ensureTeacherMode();
    }
    window.closeNavMorePanel = closePanel;
    window.openNavMorePanel = openPanel;
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      if(panel.hidden) openPanel(); else closePanel();
    });
    document.addEventListener('click',function(e){
      if(!panel.hidden && !panel.contains(e.target) && e.target!==btn) closePanel();
    });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !panel.hidden) closePanel(); });
  })();

  /* ── Copy Equation as LaTeX ── */
  document.addEventListener('click',function(e){
    var btn=e.target.closest && e.target.closest('.copy-eq-btn');
    if(!btn) return;
    var latex=btn.getAttribute('data-latex')||'';
    var restore=btn.textContent, done='✓ Copied';
    function flash(){ btn.textContent=done; btn.classList.add('copied'); setTimeout(function(){ btn.textContent=restore; btn.classList.remove('copied'); },1400); }
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(latex).then(flash).catch(flash);
    } else { flash(); }
  });

  /* ── Exam Language Mode (Arabic-only, English-only, Bilingual for Qudrat & Tahsili) ── */
  function setExamLang(lang){
    var valid = ['ar', 'en', 'both'];
    if(valid.indexOf(lang) === -1) lang = 'both';
    try{ localStorage.setItem('clipsat_exam_lang', lang); }catch(e){}
    document.body.classList.remove('cs-lang-ar', 'cs-lang-en', 'cs-lang-both');
    document.body.classList.add('cs-lang-' + lang);

    document.querySelectorAll('.cs-lt-btn').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }
  window.ClipSATSetExamLang = setExamLang;

  function _formatBilingualText(s){
    if(!s && s !== 0) return '';
    var str = String(s).trim();
    var m = /^(.*?)\s*<br\s*\/?>\s*(?:<em>|<span\s+class=["']en-trans["']>)(.*?)(?:<\/em>|<\/span>)$/is.exec(str);
    if(m){
      var ar = m[1].trim();
      var en = m[2].trim();
      return '<span class="q-lang-wrap">'
           + '<span class="q-lang-ar" dir="rtl">' + ar + '</span>'
           + '<span class="q-lang-en" dir="ltr">' + en + '</span>'
           + '</span>';
    }
    return s;
  }
  window.CSFormatBilingual = _formatBilingualText;

  (function(){
    var saved = 'both';
    try{ saved = localStorage.getItem('clipsat_exam_lang') || 'both'; }catch(e){}
    document.body.classList.add('cs-lang-' + saved);
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', function(){
        document.querySelectorAll('.cs-lt-btn').forEach(function(b){
          b.classList.toggle('active', b.getAttribute('data-lang') === saved);
        });
      });
    } else {
      document.querySelectorAll('.cs-lt-btn').forEach(function(b){
        b.classList.toggle('active', b.getAttribute('data-lang') === saved);
      });
    }
  })();

  /* ── Print Exam / Practice Paper (window.tgPrint) ── */
  window.tgPrint=function(btn){
    var sec=btn.closest('section.chapter')||btn.closest('section')||btn.closest('.testgen');
    var box=sec||btn.closest('.testgen');
    var out=null;
    if(box){
      var outs=box.querySelectorAll('.tg-out');
      for(var _i=outs.length-1;_i>=0;_i--){
        if(outs[_i].querySelector('.problem,.fep-item,.fep-q,.full-exam-paper')){out=outs[_i];break;}
      }
    }
    if(!out||!out.innerHTML.trim()){alert('Generate a test or exam first, then print.');return;}

    var _logoUrl=(document.getElementById('site-logo-img')||{src:''}).src;
    var brandLogoTag=_logoUrl?'<img class="pb-logo-img" src="'+_logoUrl+'" alt="ClipSAT">':'';
    var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
    var examHTML=out.innerHTML;
    var _titleEl=out.querySelector('.fep-title,.fep-exam-logo');
    var examTitle=_titleEl?_titleEl.textContent.trim():'ClipSAT Practice Exam';

    var CSS=[
      '@page{margin:20mm 18mm 22mm 18mm}',
      '@page:first{margin-top:18mm}',
      '*,*::before,*::after{box-sizing:border-box}',
      'body{margin:0;padding:0;background:#fff;font-family:Georgia,"Times New Roman",serif;color:#111;font-size:10.5pt;line-height:1.55}',
      '#print-brand{position:fixed;top:0;left:0;right:0;display:flex;align-items:center;gap:7pt;justify-content:space-between;background:#fff;border-bottom:1.5pt solid #1a1a2e;padding:3pt 18pt;font-family:sans-serif;font-size:8pt;color:#1a1a2e;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '#print-brand .pb-left{display:flex;align-items:center;gap:7pt}',
      '.pb-logo-img{height:16pt;width:auto;object-fit:contain}',
      '.content-wrap{padding-top:22pt}',
      '.full-exam-paper{font-family:Georgia,serif;color:#111;max-width:100%;font-size:10.5pt;line-height:1.55}',
      '.fep-cover-page{page-break-after:always;margin-bottom:24pt}',
      '.fep-logo-wrap{text-align:center;padding:8pt 0 3pt}',
      '.fep-logo-img{max-width:60pt;max-height:40pt}',
      '.fep-official-bar{background:#1a1a2e!important;color:#fff!important;padding:4pt 18pt;font-family:sans-serif;font-size:7pt;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-header{border:2pt solid #000;margin-bottom:24pt;background:#fafafa;overflow:hidden;page-break-inside:avoid}',
      '.fep-top-bar{background:#1a1a2e!important;color:#fff!important;display:flex;justify-content:space-between;align-items:center;padding:8pt 18pt;margin-bottom:14pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-exam-logo{font-family:Georgia,serif;font-size:10pt;font-weight:900;letter-spacing:.08em;color:#fff!important;text-transform:uppercase}',
      '.fep-logo-tag{font-family:sans-serif;font-size:7pt;letter-spacing:.15em;text-transform:uppercase;opacity:.85}',
      '.fep-badge{font-family:sans-serif;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;background:#B8801F!important;color:#fff!important;padding:2pt 10pt;border-radius:2pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-title{font-size:17pt;font-weight:700;color:#1a1a2e;margin:0 18pt 4pt;text-align:center}',
      '.fep-meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:8pt 20pt;padding:10pt 18pt 0}',
      '.fep-meta-cell{display:flex;align-items:center;gap:8pt;font-size:8pt}',
      '.fep-mlabel{font-weight:700;white-space:nowrap;font-family:sans-serif;font-size:7pt;text-transform:uppercase;letter-spacing:.05em;color:#555;min-width:72pt}',
      '.fep-mline{flex:1;border-bottom:1pt solid #888}',
      '.fep-mval{flex:1;font-family:sans-serif;color:#333}',
      '.fep-score-cell{border:1.5pt solid #1a1a2e;padding:3pt 8pt}',
      '.fep-score-box-big{font-family:sans-serif;font-size:11pt;font-weight:700;color:#1a1a2e;margin-left:auto}',
      '.fep-instr-box{margin:12pt 18pt 0;background:#eef2fb!important;border-left:4pt solid #3b4fc8;padding:8pt 12pt;font-size:8pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-instr-box strong{display:block;margin-bottom:4pt;font-family:sans-serif;text-transform:uppercase;font-size:7pt;letter-spacing:.06em;color:#3b4fc8!important}',
      '.fep-instr-list{margin:0;padding-left:16pt;line-height:1.65;color:#333}',
      '.fep-total-bar{display:flex;gap:20pt;padding:8pt 18pt;background:#f4f6fb;border:1.5pt solid #c5cde8;margin:10pt 0 0;font-family:sans-serif;font-size:8pt}',
      '.fep-total-item{display:flex;flex-direction:column;align-items:center;gap:2pt}',
      '.fep-total-val{font-size:11pt;font-weight:800;color:#1a1a2e}',
      '.fep-total-lbl{font-size:7pt;color:#888;text-transform:uppercase;letter-spacing:.06em}',
      '.fep-anssheet{border:1.5pt solid #ccc;padding:12pt 18pt;margin-bottom:24pt;background:#fff;page-break-after:always}',
      '.fep-anssheet-title{font-family:sans-serif;font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#555;margin-bottom:8pt;padding-bottom:5pt;border-bottom:1pt solid #ddd}',
      '.fep-bubbles{display:grid;grid-template-columns:repeat(auto-fill,minmax(calc(24pt + var(--fep-nopt,5) * 23pt),1fr));gap:7pt 16pt}',
      '.fep-bubble-row{display:flex;align-items:center;gap:5pt;font-size:8pt;font-family:sans-serif;break-inside:avoid}',
      '.fep-bnum{width:19pt;text-align:right;font-weight:700;color:#555;flex-shrink:0}',
      '.fep-bubble{width:18pt;height:18pt;border-radius:50%;border:1.5pt solid #000!important;display:flex;align-items:center;justify-content:center;font-size:7pt;font-weight:700;flex-shrink:0;background:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-section{margin-bottom:28pt;page-break-inside:auto}',
      '.fep-section-head{display:flex;align-items:center;gap:12pt;background:#1a1a2e!important;color:#fff!important;padding:8pt 14pt;margin-bottom:5pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-sec-label{font-family:sans-serif;font-size:7pt;text-transform:uppercase;letter-spacing:.08em;opacity:.7}',
      '.fep-sec-title{flex:1;font-family:sans-serif;font-size:9pt;font-weight:700}',
      '.fep-sec-time{font-family:sans-serif;font-size:7pt;background:rgba(255,255,255,.15)!important;padding:2pt 8pt;border-radius:2pt;white-space:nowrap;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-sec-note{font-family:sans-serif;font-size:8pt;color:#555;background:#fff8ee!important;border-left:3pt solid #B8801F;padding:6pt 10pt;margin-bottom:8pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-q-count{font-family:sans-serif;font-size:7pt;color:#888;margin-bottom:12pt;padding-bottom:5pt;border-bottom:1pt solid #e5e5e5}',
      '.fep-item{margin-bottom:18pt;padding-bottom:14pt;border-bottom:1pt dashed #ddd;page-break-inside:avoid}',
      '.fep-item:last-child{border-bottom:none}',
      '.fep-item-head{display:flex;align-items:center;gap:7pt;margin-bottom:7pt}',
      '.fep-inum{width:22pt;height:22pt;border-radius:50%;background:#1a1a2e!important;color:#fff!important;display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-weight:700;font-size:8pt;flex-shrink:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-domain-tag{font-family:sans-serif;font-size:7pt;color:#888;background:#f4f4f4;padding:1pt 6pt;border-radius:2pt;text-transform:uppercase;letter-spacing:.05em}',
      '.fep-type-tag{font-family:sans-serif;font-size:6pt;padding:1pt 5pt;border-radius:2pt;font-weight:700;text-transform:uppercase;letter-spacing:.06em}',
      '.fep-figure,.cq-figure{margin:8pt 0 10pt 28pt;break-inside:avoid;page-break-inside:avoid}',
      '.fep-figure svg,.cq-figure svg{width:auto!important;max-width:250pt!important;height:auto!important;display:block;max-height:180pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.exam-fig{display:block;margin:0 auto;max-width:220pt;height:auto;break-inside:avoid;page-break-inside:avoid}',
      '.exam-barchart{font-family:sans-serif;font-size:8pt;max-width:240pt;margin:8pt auto;break-inside:avoid;page-break-inside:avoid}',
      '.ebc-wrap{display:flex;align-items:flex-end;gap:8pt;height:90pt;border-bottom:1.5pt solid #1a1a2e;padding-bottom:0;justify-content:center}',
      '.ebc-bar{width:28pt;background:#3b4fc8!important;display:flex;align-items:flex-end;justify-content:center;font-size:7pt;color:#fff!important;padding-bottom:2pt;position:relative;border-radius:2pt 2pt 0 0;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.ebc-labels{display:flex;justify-content:center;gap:8pt;margin-top:3pt}',
      '.ebc-labels span{width:28pt;text-align:center;font-size:7pt;color:#555}',
      '.fep-qbody{margin-left:28pt;margin-bottom:10pt;font-size:9.5pt;line-height:1.65}',
      '.fep-choices{margin-left:28pt;display:grid;grid-template-columns:1fr 1fr;gap:5pt 16pt}',
      '.fep-choice{display:flex;align-items:baseline;gap:7pt;font-size:9pt;padding:4pt 7pt;border:1pt solid transparent;border-radius:3pt}',
      '.fep-cletter{font-weight:700;font-family:sans-serif;width:14pt;flex-shrink:0;color:#1a1a2e}',
      '.fep-ctext{flex:1}',
      '.fep-work-space{margin:8pt 28pt 0;border:1.5pt solid #ccc;padding:8pt 12pt;background:#fdfdfd}',
      '.fep-ws-label{font-family:sans-serif;font-size:7pt;text-transform:uppercase;letter-spacing:.06em;color:#888;display:block;margin-bottom:6pt}',
      '.fep-ws-line{border-bottom:1pt solid #ddd;height:28pt;margin-bottom:3pt}',
      '.fep-ws-ans{display:flex;align-items:center;gap:8pt;margin-top:8pt;font-family:sans-serif;font-size:8pt;font-weight:700}',
      '.fep-ws-ans-line{flex:1;border-bottom:2pt solid #1a1a2e}',
      '.fep-part-head{display:flex;align-items:center;gap:10pt;background:#2d3a6b!important;color:#fff!important;padding:6pt 14pt;margin:14pt 0 8pt;border-radius:2pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-part-label{font-family:sans-serif;font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:.1em}',
      '.fep-part-info{font-family:sans-serif;font-size:7pt;opacity:.85;flex:1}',
      '.fep-calc-badge{font-family:sans-serif;font-size:6pt;padding:2pt 7pt;border-radius:2pt;font-weight:700;text-transform:uppercase;letter-spacing:.05em;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-calc-no{background:#e53935!important;color:#fff!important}',
      '.fep-calc-yes{background:#2e7d32!important;color:#fff!important}',
      '.fep-actions-bar,.fep-ref-toggle-btn,.cs-hint-wrap{display:none!important}',
      '.fep-ref-wrap.collapsed{display:block!important}',
      '.fep-ref-section{page-break-before:always;break-before:always;margin-bottom:20pt;border:1.5pt solid #1a1a2e;background:#fafafa;padding:10pt 14pt}',
      '.fep-ref-header{border-bottom:1.5pt solid #1a1a2e;padding-bottom:6pt;margin-bottom:10pt}',
      '.fep-ref-title{font-family:sans-serif;font-size:9pt;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1a1a2e}',
      '.fep-ref-subtitle{font-family:sans-serif;font-size:7pt;color:#666;margin-top:2pt}',
      '.fep-ref-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180pt,1fr));gap:8pt}',
      '.fep-ref-card{background:#fff;border:1pt solid #ccc;border-radius:3pt;padding:6pt 8pt;font-size:7.5pt}',
      '.fep-ref-card-title{font-family:sans-serif;font-weight:700;font-size:7pt;color:#3b4fc8;text-transform:uppercase;margin-bottom:4pt;border-bottom:1pt solid #edf1f8;padding-bottom:2pt}',
      '.fep-ref-card-formula{font-weight:600;margin-bottom:3pt;color:#111}',
      '.fep-ref-card-desc{font-family:sans-serif;font-size:6.5pt;color:#666;line-height:1.3}',
      '.fep-qc-card{margin:8pt 0 10pt 28pt;border:1.5pt solid #1a1a2e;border-radius:4pt;background:#fff;overflow:hidden;break-inside:avoid;page-break-inside:avoid}',
      '.fep-qc-stem{background:#f0f4fb!important;padding:6pt 10pt;font-size:8.5pt;border-bottom:1.5pt solid #1a1a2e;font-weight:600;color:#1a1a2e;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-qc-cols{display:grid;grid-template-columns:1fr 1fr;text-align:center}',
      '.fep-qc-col{padding:8pt 10pt;display:flex;flex-direction:column;gap:4pt}',
      '.fep-qc-col:first-child{border-right:1.5pt solid #1a1a2e}',
      '.fep-qc-label{font-family:sans-serif;font-size:6.5pt;font-weight:700;text-transform:uppercase;color:#555;background:#f4f6fb!important;padding:2pt 6pt;border-radius:2pt;display:inline-block;margin:0 auto;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-qc-val{font-size:9.5pt;font-weight:700;color:#1a1a2e;padding:4pt 0}',
      '.fep-mark-badge{font-family:sans-serif;font-weight:700;font-size:7pt;color:#555;margin-left:auto;background:#f1f5f9;padding:1pt 6pt;border-radius:2pt}',
      '.fep-spr-badge{background:#e0f2fe;color:#0369a1;border:1pt solid #7dd3fc;font-family:sans-serif;font-size:6.5pt;font-weight:700;text-transform:uppercase;padding:1pt 5pt;border-radius:2pt;margin-left:4pt}',
      '.fep-spr-note{font-family:sans-serif;font-size:7.5pt;color:#333;background:#f0fdf4!important;border-left:3pt solid #16a34a;padding:5pt 8pt;margin:5pt 0 8pt 28pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.fep-ws-mark{margin-left:auto;font-family:sans-serif;font-size:7.5pt;font-weight:700;color:#555}',
      '.fep-sol-block,.fep-key-section,.fep-key-toggle,.btn,.fep-key-grid{display:none!important}',
      '.fep-frq-full .fep-ws-line{height:38pt}',
      '.fep-frq-full .fep-work-space{min-height:180pt}',
      '.problem{border:1pt solid #ccc;border-radius:4pt;padding:8pt;margin-bottom:10pt;page-break-inside:avoid}',
      '.pn{display:inline-flex;align-items:center;justify-content:center;width:22pt;height:22pt;border-radius:50%;background:#1a1a2e!important;color:#fff!important;font-weight:700;font-size:8pt;margin-right:6pt;vertical-align:middle;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      '.solution{display:none}',
      'table, .exam-table, table.exam-table, .fep-figure table, .fep-qbody table, .fep-item table, .problem table, .cq-figure table, .cq-item table, .mfig table, .aiq table, .aiq-text table{border-collapse:collapse;margin:8pt auto;font-size:9pt;width:auto!important;max-width:100%;break-inside:avoid;page-break-inside:avoid}',
      'table th, table td, .exam-table th, .exam-table td, .fep-figure table th, .fep-figure table td, .fep-qbody table th, .fep-qbody table td, .fep-item table th, .fep-item table td, .problem table th, .problem table td, .cq-figure table th, .cq-figure table td, .cq-item table th, .cq-item table td, .mfig table th, .mfig table td, .aiq table th, .aiq table td, .aiq-text table th, .aiq-text table td{border:1pt solid #999;padding:4pt 8pt;text-align:center}',
      'table th, .exam-table th, .fep-figure table th, .fep-qbody table th, .fep-item table th, .problem table th, .cq-figure table th, .cq-item table th, .mfig table th, .aiq table th, .aiq-text table th{background:#e8edf8!important;color:#1a1a2e!important;font-weight:700;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
      'mjx-container{display:inline!important}',
      'mjx-container[display="true"]{display:block!important;margin:6pt 0!important}',
      'body[dir="rtl"]{direction:rtl;text-align:right;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}',
      'body[dir="rtl"] #print-brand{direction:rtl}',
      'body[dir="rtl"] .fep-top-bar{direction:rtl}',
      'body[dir="rtl"] .fep-meta-grid{direction:rtl}',
      'body[dir="rtl"] .fep-instr-box{border-left:none!important;border-right:4pt solid #3b4fc8!important;text-align:right}',
      'body[dir="rtl"] .fep-total-bar{direction:rtl}',
      'body[dir="rtl"] .fep-section-head{direction:rtl}',
      'body[dir="rtl"] .fep-item-head{direction:rtl}',
      'body[dir="rtl"] .fep-qbody{margin-left:0;margin-right:28pt;text-align:right}',
      'body[dir="rtl"] .fep-choices{margin-left:0;margin-right:28pt}',
      'body[dir="rtl"] .fep-choice{direction:rtl}',
      'body[dir="rtl"] .fep-work-space{margin-left:0;margin-right:28pt}',
      'body[dir="rtl"] .fep-figure,.cq-figure{margin:8pt 28pt 10pt 0}',
      'body[dir="rtl"] mjx-container,body[dir="rtl"] .MathJax,body[dir="rtl"] .katex{direction:ltr;unicode-bidi:isolate}'
    ].join('');

    var isRtl = document.body.classList.contains('rtl') ||
                (document.documentElement && document.documentElement.lang === 'ar') ||
                (out && out.getAttribute('dir') === 'rtl') ||
                (typeof _ttDir === 'function' && _ttDir() === 'rtl');
    var lang = isRtl ? 'ar' : 'en';
    var dir = isRtl ? 'rtl' : 'ltr';

    var html='<!DOCTYPE html><html lang="'+lang+'" dir="'+dir+'"><head>'+
      '<meta charset="utf-8">'+
      '<meta name="viewport" content="width=device-width,initial-scale=1">'+
      '<title>'+examTitle+'<\/title>'+
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.css" crossorigin="anonymous">'+
      '<script>window.MathJax={tex:{inlineMath:[["\\\\(","\\\\)"],["$","$"]],displayMath:[["\\\\[","\\\\]"],["$$","$$"]]},startup:{typeset:true}};<\/script>'+
      '<script async src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js"><\/script>'+
      '<style>'+CSS+'<\/style>'+
      '<\/head><body dir="'+dir+'">'+
      '<div id="print-brand"><span class="pb-left">'+brandLogoTag+'<span><strong>ClipSAT<\/strong> &middot; Mr. Mohamed Abdallah<\/span><\/span><span>'+today+'<\/span><\/div>'+
      '<div class="content-wrap">'+examHTML+'<\/div>'+
      '<script>window.addEventListener("load",function(){'+
        'function doPrint(){'+
          'if(window.MathJax&&MathJax.typesetPromise){'+
            'MathJax.typesetPromise().then(function(){setTimeout(function(){window.print();},300);});'+
          '}else if(window.MathJax&&MathJax.startup){'+
            'MathJax.startup.promise.then(function(){setTimeout(function(){window.print();},300);});'+
          '}else{setTimeout(function(){window.print();},300);}}'+
        'var _t=0,_iv=setInterval(function(){_t++;'+
          'if((window.MathJax&&MathJax.startup)||_t>25){clearInterval(_iv);doPrint();}'+
        '},200);'+
      '});<\/script>'+
      '<\/body><\/html>';

    var _blob=new Blob([html],{type:'text/html;charset=utf-8'});
    var _burl=URL.createObjectURL(_blob);
    var pw=window.open(_burl,'_blank','width=940,height=780');
    if(!pw){alert('Please allow pop-ups for this site, then try again.');URL.revokeObjectURL(_burl);return;}
    setTimeout(function(){URL.revokeObjectURL(_burl);},120000);
  };
})();
