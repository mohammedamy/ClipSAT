(function(){window.TeacherMode = (function(){
    var _active = false;
    var CSS = [
      '.tm-meta{display:flex;gap:6px;flex-wrap:wrap;padding:3px 0 8px;font-size:11px;line-height:1.3}',
      '.tm-id{background:#e0e7ff;color:#3730a3;padding:1px 6px;border-radius:4px;font-family:monospace}',
      '.tm-dom{background:#f0fdf4;color:#166534;padding:1px 6px;border-radius:4px}',
      '.tm-diff-easy{background:#dcfce7;color:#15803d;padding:1px 6px;border-radius:4px}',
      '.tm-diff-medium{background:#fef9c3;color:#854d0e;padding:1px 6px;border-radius:4px}',
      '.tm-diff-hard{background:#fee2e2;color:#991b1b;padding:1px 6px;border-radius:4px}',
      '.tm-diff-review{background:#ede9fe;color:#5b21b6;padding:1px 6px;border-radius:4px}',
      '.tm-src{background:#f1f5f9;color:#475569;padding:1px 6px;border-radius:4px}',
      '.tm-toolbar{position:fixed;bottom:90px;right:16px;z-index:9000;background:#1e1b4b;color:#fff;',
      'border-radius:12px;padding:10px 18px;font-size:13px;display:flex;gap:10px;align-items:center;',
      'box-shadow:0 4px 20px rgba(0,0,0,.3)}',
      '.tm-toolbar button{background:#4f46e5;color:#fff;border:none;border-radius:7px;padding:5px 12px;cursor:pointer;font-size:12px}',
      '@media print{.cq-sol{display:block!important}.tm-meta{display:flex!important}',
      'nav,.sidebar,#tm-toolbar,#chatFab,#daily-goal-bar,#exam-countdown-bar,#weak-recs{display:none!important}}'
    ].join('');

    function _injectCSS(){
      if(document.getElementById('tm-style')) return;
      var s=document.createElement('style'); s.id='tm-style'; s.textContent=CSS;
      document.head.appendChild(s);
    }

    function toggle(){
      _active=!_active;
      window._teacherMode=_active;
      document.body.classList.toggle('teacher-mode',_active);
      _renderToolbar();
      /* update checkbox if open */
      var cb=document.getElementById('teacher-mode-toggle');
      if(cb) cb.checked=_active;
    }

    function _renderToolbar(){
      var existing=document.getElementById('tm-toolbar');
      if(!_active){ if(existing) existing.remove(); return; }
      if(!existing){
        var bar=document.createElement('div');
        bar.id='tm-toolbar'; bar.className='tm-toolbar';
        if(_ttAr()) bar.dir='rtl';
        bar.innerHTML=_tt('tmTeacherMode')
          +' <button onclick="window.TeacherMode.printLessonPlan()">'+_tt('tmLessonPlan')+'</button>'
          +' <button onclick="window.TeacherMode.exportPDF()">'+_tt('tmPrintChapterPdf')+'</button>'
          +' <button onclick="window.TeacherMode.exportWord()">'+_tt('tmQuizWordExport')+'</button>'
          +' <button onclick="window.CSExport&&window.CSExport.downloadChapterDocx(null)">'+_tt('tmChapterDocx')+'</button>'
          +' <button onclick="window.CSAssign&&window.CSAssign.open()">'+_tt('tmAssignment')+'</button>'
          +' <button onclick="window.CSReport&&window.CSReport.generate()">'+_tt('tmProgressReport')+'</button>'
          +' <button onclick="window.TeacherMode.toggle()" style="background:#7f1d1d">'+_tt('tmOff')+'</button>';
        document.body.appendChild(bar);
      }
    }

    function exportPDF(){
      if(window.CSExport){
        window.CSExport.printActiveChapter({teacherMode:true});
      } else {
        window.print();
      }
    }

    function exportWord(){
      var items=Array.from(document.querySelectorAll('.cq-item'));
      if(!items.length){ alert(_tt('generateQuizFirst')); return; }
      if(typeof JSZip==='undefined'){ alert(_tt('docxLoading')); return; }
      var _ar=_ttAr();

      var _view=document.querySelector('.view.active');
      var _h1=_view&&_view.querySelector('.subject-head h1');
      var _track=_view&&_view.querySelector('.subject-head .eyebrow');
      var _lhTitle=_h1?_h1.textContent.trim():'ClipSAT Math';
      var _lhTrack=_track?_track.textContent.trim():'';

      /* Use OMML helpers from CSExport if available */
      var _omml=window.CSExport&&window.CSExport.latexToOmml||function(){return '';};
      var _mrun=window.CSExport&&window.CSExport.mixedRunsXml||function(s){return '<w:r><w:t xml:space="preserve">'+String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</w:t></w:r>';};

      function _xmlEnc(t){return String(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
      function _rawEl(el){if(!el)return '';var r=el.getAttribute&&el.getAttribute('data-raw');return r!=null?r:el.textContent||'';}

      /* Build a table cell with mixed text+math content */
      function _tc(widthDxa, content, rprXml, tcOpts){
        tcOpts=tcOpts||{};
        var bg=tcOpts.bg?'<w:shd w:val="clear" w:color="auto" w:fill="'+tcOpts.bg+'"/>':'';
        var vAlign=tcOpts.vAlign?'<w:vAlign w:val="'+tcOpts.vAlign+'"/>':'';
        var innerXml=_mrun(String(content||''), rprXml||'');
        var pPr='<w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="0"/></w:pPr>';
        return '<w:tc>'
          +'<w:tcPr><w:tcW w:w="'+widthDxa+'" w:type="dxa"/>'+bg+vAlign
          +'<w:tcMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar>'
          +'</w:tcPr>'
          +'<w:p>'+pPr+innerXml+'</w:p>'
          +'</w:tc>';
      }

      /* Table borders XML */
      var tblBorders='<w:tblBorders>'
        +'<w:top w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:left w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:bottom w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:right w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:insideH w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:insideV w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'</w:tblBorders>';
      /* Column widths (twips, A4 landscape usable ~13680 minus margins ~1440 = ~12240) */
      /* Using US Letter landscape: 15840 - 1440 margins = 14400 usable */
      /* Cols: # 480, Question 9600 (67%), Solution 2880 (20%), Info 1440 (10%) */
      var C1=480, C2=9600, C3=2880, C4=1440;
      var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});

      /* Helper: make RPr XML */
      function rpr(bold,italic,color,size){
        return '<w:rPr>'+(bold?'<w:b/>':'')+(italic?'<w:i/>':'')
          +(color?'<w:color w:val="'+color+'"/>':'')
          +(size?'<w:sz w:val="'+size+'"/><w:szCs w:val="'+size+'"/>':'')+(_ar?'<w:rtl/>':'')+'</w:rPr>';
      }

      var body='';
      /* Branding, title and track now live in the repeating page header (see
         window.CSExport.buildLetterhead) — the body just needs the date. */
      body+='<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="200"/></w:pPr>'
        +'<w:r>'+rpr(false,true,'566173','18')+'<w:t>'+_tt('generatedLabel')+_xmlEnc(today)+'</w:t></w:r></w:p>';

      /* Header row */
      var hRpr=rpr(true,false,'FFFFFF','20');
      var headerRow='<w:tr>'
        +'<w:trPr><w:trStyle w:val="TableHead"/></w:trPr>'
        +_tc(C1,_tt('colNum'),hRpr,{bg:'1A1A2E',vAlign:'center'})
        +_tc(C2,_tt('colQuestionChoices'),hRpr,{bg:'1A1A2E',vAlign:'center'})
        +_tc(C3,_tt('colAnswerSolution'),hRpr,{bg:'1A1A2E',vAlign:'center'})
        +_tc(C4,_tt('colInfo'),hRpr,{bg:'1A1A2E',vAlign:'center'})
        +'</w:tr>';

      /* ── Per-item figure capture for inline placement inside question cells ── */
      var _captureImgs=window.CSExport&&window.CSExport.captureContainerImages
        ?window.CSExport.captureContainerImages:function(){return Promise.resolve([]);};
      var _imgPara=window.CSExport&&window.CSExport.imgParaXml?window.CSExport.imgParaXml:function(){return '';};
      var _fetchLogo=window.CSExport&&window.CSExport.fetchLogoBase64?window.CSExport.fetchLogoBase64:function(){return Promise.resolve(null);};
      var _buildLh=window.CSExport&&window.CSExport.buildLetterhead?window.CSExport.buildLetterhead:function(){return {docRelsXml:'',contentTypesXml:'',sectPrRefs:''};};

      Promise.all([
        Promise.all(items.map(function(item){
          var figEl=item.querySelector('.cq-figure,figure,.fig-wrap,.svg-fig');
          return figEl?_captureImgs(figEl):Promise.resolve([]);
        })),
        _fetchLogo()
      ]).then(function(_cap){
        var perItemImgs=_cap[0], _logoB64=_cap[1];
        var zip=new JSZip();
        var imgIdx=0;
        var imgRelsXml='';
        var _letterhead=_buildLh(zip,{title:_lhTitle,chapter:'Quiz Export',track:_lhTrack},_logoB64);
        imgRelsXml+=_letterhead.docRelsXml;

        /* Pre-assign rIds for every captured image */
        var perItemRefs=perItemImgs.map(function(imgs){
          return imgs.map(function(img){
            imgIdx++;
            var rId='rId'+(imgIdx+1);
            zip.folder('word').folder('media').file('fig'+imgIdx+'.png',img.imageData,{base64:true});
            imgRelsXml+='<Relationship Id="'+rId+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/fig'+imgIdx+'.png"/>';
            return {rId:rId,wEmu:img.widthEmu,hEmu:img.heightEmu};
          });
        });

        /* Question rows — images appear inline inside question cell */
        var tableRows=headerRow;
        items.forEach(function(item,i){
          /* 1. Question stem */
          var stemRaw=item.getAttribute('data-raw')||'';
          if(!stemRaw){ var sEl=item.querySelector('.cq-qt,.cq-stem'); stemRaw=sEl?_rawEl(sEl):''; }

          /* 2. MCQ choices */
          var choiceParas='';
          item.querySelectorAll('.cq-opt').forEach(function(opt,j){
            var ct=opt.getAttribute('data-raw')||opt.querySelector('.cq-ct')?opt.querySelector('.cq-ct').textContent:'';
            if(!ct)ct=opt.getAttribute('data-raw')||'';
            var letter=String.fromCharCode(65+j);
            var chRpr=rpr(false,false,'444444','20');
            choiceParas+='<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:ind w:left="240"/><w:spacing w:after="30"/></w:pPr>'+_mrun(letter+'.  '+ct,chRpr)+'</w:p>';
          });

          /* 3. Inline figure paragraphs for this question */
          var inlineImgXml=perItemRefs[i].map(function(ref){
            return _imgPara(ref.rId,ref.wEmu,ref.hEmu);
          }).join('');

          /* 4. Question cell: stem → inline figure(s) → choices */
          var stemRpr=rpr(true,false,'','22');
          var qCell='<w:tc>'
            +'<w:tcPr><w:tcW w:w="'+C2+'" w:type="dxa"/>'
            +'<w:tcMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar>'
            +'</w:tcPr>'
            +'<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="60"/></w:pPr>'+_mrun(stemRaw,stemRpr)+'</w:p>'
            +inlineImgXml
            +choiceParas
            +'</w:tc>';

          /* 5. Solution */
          var solEl=item.querySelector('.cq-sol-box,.cq-sol');
          var solRaw=solEl?_rawEl(solEl):'';
          solRaw=solRaw.replace(/^Solution:\s*/i,'').trim();
          var solRpr=rpr(false,true,'166534','20');
          var solCell='<w:tc>'
            +'<w:tcPr><w:tcW w:w="'+C3+'" w:type="dxa"/>'
            +'<w:tcMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar>'
            +'</w:tcPr>'
            +'<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="0"/></w:pPr>'+_mrun(solRaw,solRpr)+'</w:p>'
            +'</w:tc>';

          /* 6. Info/meta */
          var metaEl=item.querySelector('.tm-meta,.cq-meta');
          var meta=metaEl?_xmlEnc(metaEl.textContent.trim()):'';
          var metaRpr=rpr(false,false,'888888','18');

          tableRows+='<w:tr>'
            +'<w:tc><w:tcPr><w:tcW w:w="'+C1+'" w:type="dxa"/><w:vAlign w:val="top"/></w:tcPr>'
            +'<w:p><w:pPr>'+(_ar?'<w:bidi/>':'')+'<w:jc w:val="center"/><w:spacing w:after="0"/></w:pPr>'
            +'<w:r>'+rpr(true,false,'1A1A2E','22')+'<w:t>'+_xmlEnc(String(i+1))+'</w:t></w:r></w:p></w:tc>'
            +qCell+solCell
            +'<w:tc><w:tcPr><w:tcW w:w="'+C4+'" w:type="dxa"/><w:vAlign w:val="top"/></w:tcPr>'
            +'<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="0"/></w:pPr>'
            +'<w:r>'+metaRpr+'<w:t xml:space="preserve">'+meta+'</w:t></w:r></w:p></w:tc>'
            +'</w:tr>';
        });

        body+='<w:tbl>'
          +'<w:tblPr>'+(_ar?'<w:bidiVisual/>':'')+'<w:tblW w:w="'+(C1+C2+C3+C4)+'" w:type="dxa"/>'+tblBorders
          +'<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr>'
          +'<w:tblGrid><w:gridCol w:w="'+C1+'"/><w:gridCol w:w="'+C2+'"/><w:gridCol w:w="'+C3+'"/><w:gridCol w:w="'+C4+'"/></w:tblGrid>'
          +tableRows+'</w:tbl>';

        var wNS='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
        var mNS='xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"';
        var rNS='xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
        var wpNS='xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"';
        var aNS='xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"';
        var picNS='xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
        var wDoc='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
          +'<w:document '+wNS+' '+mNS+' '+rNS+' '+wpNS+' '+aNS+' '+picNS+'>'
          +'<w:body>'+body
          +'<w:sectPr>'+_letterhead.sectPrRefs+'<w:pgSz w:w="15840" w:h="12240" w:orient="landscape"/>'
          +'<w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="720" w:footer="720"/>'
          +'</w:sectPr></w:body></w:document>';
        var ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
          +'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
          +'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
          +'<Default Extension="xml" ContentType="application/xml"/>'
          +'<Default Extension="png" ContentType="image/png"/>'
          +'<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
          +_letterhead.contentTypesXml
          +'</Types>';
        var rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
          +'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
          +'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
          +'</Relationships>';
        zip.file('[Content_Types].xml',ct);
        zip.folder('_rels').file('.rels',rels);
        zip.folder('word').file('document.xml',wDoc);
        var wRels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+imgRelsXml+'</Relationships>';
        zip.folder('word').folder('_rels').file('document.xml.rels',wRels);
        return zip.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
      }).then(function(blob){
        var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='clipsat-quiz.docx';
        document.body.appendChild(a); a.click();
        setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},1500);
      }).catch(function(){alert('Sorry — the .docx could not be generated in this browser.');});
    }

    /* ══ LESSON PLAN PRINTER ═══════════════════════════════════════════ */
    function printLessonPlan(){
      var view=document.querySelector('.view.active');
      if(!view){alert(_tt('navigateFirst'));return;}
      var _dir=_ttDir();

      var subjEl=view.querySelector('.subject-head h1');
      var subject=subjEl?subjEl.textContent.trim():'Mathematics';
      var eyebrow=view.querySelector('.subject-head .eyebrow');
      var track=eyebrow?eyebrow.textContent.trim():'';
      /* Exclude testgen chapters — when teacher is viewing quiz output, ch-active
         is the testgen chapter which has no definitions or practice problems */
      var chapter=view.querySelector('.chapter.ch-active:not(.testgen)')||view.querySelector('.chapter:not(.testgen)');
      var chTitle='';
      if(chapter){var chH=chapter.querySelector('.chead h2');if(chH)chTitle=chH.textContent.replace(/^[^a-zA-Z؀-ۿ]+/,'').trim();}
      var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});

      function esc(t){return t?t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'):''; }

      /* Extract content */
      var objectives=[];
      var defs=[];
      var examples=[];
      var probs=[];
      if(chapter){
        chapter.querySelectorAll('.callout').forEach(function(c){var l=c.querySelector('.lab');if(l)objectives.push(l.textContent.trim());});
        chapter.querySelectorAll('.callout.def').forEach(function(d){
          var l=d.querySelector('.lab');
          if(!l)return;
          /* Use data-raw (pre-typeset LaTeX source) so MathJax re-renders in popup */
          var rawDef=d.getAttribute('data-raw')||d.innerHTML;
          var _tmp=document.createElement('div');_tmp.innerHTML=rawDef;
          var _bp=_tmp.querySelector('p,.body');
          /* defHtml: raw HTML with \(...\) intact for MathJax; strip .lab span first */
          var defHtml=_bp?_bp.innerHTML:(rawDef.replace(/<span[^>]*class="lab"[^>]*>[\s\S]*?<\/span>/i,'').trim());
          defs.push({term:l.textContent.trim(),def:defHtml});
        });
        chapter.querySelectorAll('.example').forEach(function(ex,i){var t=ex.querySelector('.et,.ex-title,.lab');
          /* Use data-raw (pre-typeset LaTeX source) so MathJax in popup can re-render */
          var rawHtml=ex.getAttribute('data-raw')||ex.innerHTML;
          examples.push({n:i+1,title:t?t.textContent.trim():_tt('exampleWord')+' '+(i+1),html:rawHtml});});
        var ps=chapter.querySelectorAll('.problem');for(var pi=0;pi<Math.min(3,ps.length);pi++){
          /* Use .pq data-raw (pre-typeset LaTeX) so MathJax re-renders in popup */
          var _pq=ps[pi].querySelector('.pq');
          probs.push(_pq?(_pq.getAttribute('data-raw')||_pq.innerHTML):(ps[pi].getAttribute('data-raw')||ps[pi].innerHTML));}
      }
      if(!objectives.length)objectives.push(_tt('understandKeyConcepts')+subject);

      var css='@page{margin:20mm 18mm 24mm 18mm}'
        +'*{box-sizing:border-box}'
        +'body{margin:0;padding:0 0 0 24pt;font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.55;color:#111;background:#fff}'
        +'.lp-header{display:flex;align-items:center;justify-content:space-between;gap:8pt;border-bottom:2.5pt solid #1a1a2e;padding:6pt 0 6pt;margin-bottom:14pt;width:100%;box-sizing:border-box;overflow:hidden}'
        +'.lp-brand{display:flex;align-items:center;gap:7pt;flex-shrink:0;min-width:0}'
        +'.lp-logo{width:32pt;height:32pt;border-radius:6pt;background:#1a1a2e;color:#fff;display:flex;align-items:center;justify-content:center;font-size:15pt;font-weight:700;font-family:Georgia,serif;flex-shrink:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
        +'.lp-logo-img{height:32pt;width:auto;border-radius:4pt;object-fit:contain;max-width:80pt;flex-shrink:0}'
        +'.lp-brand-text .lp-name{font-size:11pt;font-weight:700;color:#1a1a2e;white-space:nowrap}'
        +'.lp-brand-text .lp-author{font-size:7pt;letter-spacing:.10em;text-transform:uppercase;color:#566173;white-space:nowrap}'
        +'.lp-title-block{flex:1;text-align:center;min-width:0;padding:0 6pt;overflow:hidden}'
        +'.lp-doc-label{font-size:7pt;letter-spacing:.16em;text-transform:uppercase;color:#B8801F;font-weight:700}'
        +'.lp-subject{font-size:12pt;font-weight:700;color:#1a1a2e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
        +'.lp-chapter{font-size:9pt;color:#566173;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
        +'.lp-track{font-size:7.5pt;color:#8892a4;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}'
        +'.lp-meta{font-size:8pt;text-align:right;line-height:1.7;color:#566173;flex-shrink:0;white-space:nowrap}'
        +'.lp-meta strong{color:#1a1a2e}'
        +'.lp-section{margin-bottom:16pt;page-break-inside:avoid}'
        +'.lp-section-head{background:#1a1a2e;color:#fff;font-size:9pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4pt 10pt;margin-bottom:8pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
        +'.lp-amber-head{background:#92650F;color:#fff;font-size:9pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4pt 10pt;margin-bottom:8pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
        +'.lp-field-grid{display:grid;grid-template-columns:1fr 1fr;gap:8pt 20pt;margin-bottom:10pt}'
        +'.lp-field{border-bottom:1pt solid #ccc;padding-bottom:6pt}'
        +'.lp-field label{display:block;font-size:7.5pt;letter-spacing:.1em;text-transform:uppercase;color:#888;margin-bottom:4pt;font-weight:700}'
        +'.lp-field-val{font-size:10pt;min-height:14pt}'
        +'.lp-obj-list{margin:0;padding-left:14pt}'
        +'.lp-obj-list li{margin-bottom:5pt;font-size:10.5pt}'
        +'.lp-vocab{width:100%;border-collapse:collapse;font-size:10pt}'
        +'.lp-vocab th{background:#e8edf8;border:1pt solid #c5cde8;padding:5pt 8pt;text-align:left;font-size:8.5pt;text-transform:uppercase;letter-spacing:.06em;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
        +'.lp-vocab td{border:1pt solid #dde2ec;padding:5pt 8pt;vertical-align:top}'
        +'.lp-vocab tr:nth-child(even) td{background:#f8f9fc}'
        +'.lp-example{border:1pt solid #dde2ec;border-radius:4pt;padding:8pt 10pt;margin-bottom:8pt;page-break-inside:avoid}'
        +'.lp-example-title{font-weight:700;font-size:9.5pt;color:#1a1a2e;margin-bottom:5pt}'
        +'.lp-strat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8pt}'
        +'.lp-strat-box{border:1pt solid #dde2ec;border-radius:4pt;padding:8pt 10pt}'
        +'.lp-strat-title{font-weight:700;font-size:9.5pt;color:#1a1a2e;margin-bottom:4pt}'
        +'.lp-note-lines .nl{border-bottom:1pt solid #ddd;height:24pt}'
        +'.lp-q{display:flex;gap:8pt;margin-bottom:12pt;page-break-inside:avoid;align-items:flex-start}'
        +'.lp-qn{width:18pt;height:18pt;border-radius:50%;border:1.5pt solid #1a1a2e;display:flex;align-items:center;justify-content:center;font-size:8.5pt;font-weight:700;flex-shrink:0}'
        +'.lp-qbody{flex:1;font-size:10.5pt}'
        +'.lp-footer{position:fixed;bottom:0;left:0;right:0;border-top:1pt solid #1a1a2e;padding:3pt 18pt;display:flex;justify-content:space-between;font-size:7.5pt;color:#888;background:#fff}'
        +'mjx-container{display:inline!important;visibility:visible!important}'
        +'mjx-container[display="true"]{display:block!important;visibility:visible!important;margin:5pt 0!important}'
        +'mjx-container svg{display:inline-block!important;visibility:visible!important}'
        +'mjx-container *{visibility:visible!important}'
        +'.MathJax,.MathJax_SVG{display:inline!important;visibility:visible!important}'
        /* Qudrat/Tahsili + Arabic mode only — see _ttAr(). Math stays LTR,
           matching the site's own established RTL convention. */
        +'body[dir="rtl"]{direction:rtl;text-align:right;padding:0 24pt 0 0}'
        +'body[dir="rtl"] .lp-header{direction:rtl}'
        +'body[dir="rtl"] .lp-meta{text-align:left}'
        +'body[dir="rtl"] .lp-obj-list{padding-left:0;padding-right:14pt}'
        +'body[dir="rtl"] .lp-vocab th{text-align:right}'
        +'body[dir="rtl"] .lp-footer{direction:rtl}'
        +'body[dir="rtl"] mjx-container,body[dir="rtl"] .MathJax{direction:ltr}';

      var objHTML='<ul class="lp-obj-list">';
      objectives.slice(0,6).forEach(function(o){objHTML+='<li>'+_tt('studentsWillUnderstand')+esc(o)+'<\/li>';});
      objHTML+='<li>'+_tt('studentsWillApply')+'<\/li><\/ul>';

      var vocabHTML='<table class="lp-vocab"><thead><tr><th>'+_tt('termConcept')+'<\/th><th>'+_tt('defDescription')+'<\/th><\/tr><\/thead><tbody>';
      if(defs.length){defs.forEach(function(d){
        /* d.def is raw HTML with LaTeX \(...\) intact — do NOT esc() it so MathJax renders */
        vocabHTML+='<tr><td><strong>'+esc(d.term)+'<\/strong><\/td><td>'+d.def+'<\/td><\/tr>';
      });}
      else{for(var vi=0;vi<3;vi++)vocabHTML+='<tr><td><\/td><td><\/td><\/tr>';}
      vocabHTML+='<\/tbody><\/table>';

      var exHTML='';
      if(examples.length){examples.slice(0,3).forEach(function(ex){exHTML+='<div class="lp-example"><div class="lp-example-title">'+_tt('exampleWord')+' '+ex.n+(ex.title&&ex.title!==_tt('exampleWord')+' '+ex.n?' — '+esc(ex.title):'')+'<\/div>'+ex.html+'<\/div>';});}
      else{exHTML='<div class="lp-example" style="min-height:80pt"><div class="lp-example-title">'+_tt('workedExamples')+'<\/div><\/div>';}

      var noteLines='<div class="lp-note-lines">';
      for(var ni=0;ni<8;ni++)noteLines+='<div class="nl"><\/div>';
      noteLines+='<\/div>';

      var assessHTML='';
      if(probs.length){probs.forEach(function(p,i){assessHTML+='<div class="lp-q"><div class="lp-qn">'+(i+1)+'<\/div><div class="lp-qbody">'+_inlineMjx(p)+'<\/div><\/div>';});}
      else{for(var qi=1;qi<=3;qi++){assessHTML+='<div class="lp-q"><div class="lp-qn">'+qi+'<\/div><div class="lp-qbody" style="min-height:40pt"><\/div><\/div>';}}

      /* MathJax 3 SVG mode stores reusable path defs in a hidden <svg> in the main
         document. Copied innerHTML uses <use href="#MJX-..."/> which resolves to
         that hidden element — but NOT in a new popup where it doesn't exist.
         Fix: serialize the global SVG cache and inject it into the popup body. */
      var _mjxDefs='';
      var _mjxCacheEl=null;
      (function(){
        /* Robust selector: find the MathJax glyph-cache SVG several ways */
        var _sc=document.querySelector('svg[style*="display:none"],svg[style*="display: none"]');
        if(!_sc){var _d=document.querySelector('defs [id^="MJX-"]');if(_d)_sc=_d.closest('svg');}
        if(!_sc){var _all=document.querySelectorAll('body > svg');for(var _i=0;_i<_all.length;_i++){if(_all[_i].querySelector('defs')){_sc=_all[_i];break;}}}
        if(_sc){
          _mjxCacheEl=_sc;
          _mjxDefs=_sc.outerHTML.replace(/(<svg[^>]*?)\s+style\s*=\s*["'][^"']*?["']/i,
            '$1 style="position:absolute;width:0;height:0;overflow:hidden;"');
        }
      }());
      /* Inline every <use href="#MJX-…"> → actual <path> so the popup HTML is
         fully self-contained and works in blob: URLs without cross-doc lookups */
      function _inlineMjx(html){
        if(!_mjxCacheEl||!html)return html;
        var tmp=document.createElement('div');
        tmp.innerHTML=html;
        tmp.querySelectorAll('use').forEach(function(u){
          var ref=u.getAttribute('href')||u.getAttributeNS('http://www.w3.org/1999/xlink','href');
          if(!ref||ref.charAt(0)!=='#')return;
          var target=_mjxCacheEl.querySelector('[id="'+ref.slice(1)+'"]');
          if(!target)return;
          var clone=target.cloneNode(true);
          clone.removeAttribute('id');
          ['x','y','width','height','transform','fill','stroke'].forEach(function(a){
            var v=u.getAttribute(a);if(v)clone.setAttribute(a,v);
          });
          u.parentNode.replaceChild(clone,u);
        });
        return tmp.innerHTML;
      }

      var lpHTML='<!DOCTYPE html><html lang="'+(_dir==='rtl'?'ar':'en')+'" dir="'+_dir+'"><head>'
        +'<meta charset="utf-8"><title>'+_tt('lessonPlanDocTitlePrefix')+esc(subject)+'<\/title>'
        +'<style>'+css+'<\/style>'
        +'<script>MathJax={tex:{inlineMath:[["\\\\(","\\\\)"]],displayMath:[["\\\\[","\\\\]"]],tags:"none"},svg:{fontCache:"global",scale:1},options:{skipHtmlTags:["script","noscript","style","textarea","pre","code"]}};<\/script>'
        +'<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js"><\/script>'
        +'<\/head><body dir="'+_dir+'">'
        +'<div class="lp-header">'
          +'<div class="lp-brand">'
            +(window.CSExport&&window.CSExport.logoSrc()
              ?'<img src="'+window.CSExport.logoSrc()+'" class="lp-logo-img" alt="ClipSAT">'
              :'<div class="lp-logo">C<\/div>')
            +'<div class="lp-brand-text"><div class="lp-name">ClipSAT<\/div><div class="lp-author">Mr. Mohamed Abdallah<\/div><\/div><\/div>'
          +'<div class="lp-title-block">'
            +'<div class="lp-doc-label">'+_tt('lessonPlanLabel')+'<\/div>'
            +'<div class="lp-subject">'+esc(subject)+'<\/div>'
            +(chTitle?'<div class="lp-chapter">'+esc(chTitle)+'<\/div>':'')
            +(track?'<div class="lp-track">'+esc(track)+'<\/div>':'')
          +'<\/div>'
          +'<div class="lp-meta"><div>'+_tt('dateLabel')+' <strong>'+today+'<\/strong><\/div><div>'+_tt('durationLabel')+' <strong>'+_tt('durationPlaceholder')+'<\/strong><\/div><div>'+_tt('classLabel')+' <strong>________________<\/strong><\/div><\/div>'
        +'<\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('lessonInfo')+'<\/div>'
          +'<div class="lp-field-grid">'
            +'<div class="lp-field"><label>'+_tt('unitTopic')+'<\/label><div class="lp-field-val">'+esc(chTitle||subject)+'<\/div><\/div>'
            +'<div class="lp-field"><label>'+_tt('gradeLevel')+'<\/label><div class="lp-field-val"><\/div><\/div>'
            +'<div class="lp-field"><label>'+_tt('curriculumBoard')+'<\/label><div class="lp-field-val">'+esc(track||'')+'<\/div><\/div>'
            +'<div class="lp-field"><label>'+_tt('priorKnowledge')+'<\/label><div class="lp-field-val"><\/div><\/div>'
          +'<\/div><\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('learningObjectives')+'<\/div>'+objHTML+'<\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('keyVocab')+'<\/div>'+vocabHTML+'<\/div>'
        +'<div class="lp-section"><div class="lp-amber-head">'+_tt('teachingStrategy')+'<\/div>'
          +'<div class="lp-strat-grid">'
            +'<div class="lp-strat-box"><div class="lp-strat-title">&#128218; '+_tt('educationalTools')+'<\/div>'+_tt('educationalToolsBody')+'<\/div>'
            +'<div class="lp-strat-box"><div class="lp-strat-title">&#128187; '+_tt('digitalDevices')+'<\/div>'+_tt('digitalDevicesBody')+'<\/div>'
            +'<div class="lp-strat-box"><div class="lp-strat-title">&#128203; '+_tt('pedagogicalApproach')+'<\/div>'+_tt('pedagogicalApproachBody')+'<\/div>'
            +'<div class="lp-strat-box"><div class="lp-strat-title">&#8987; '+_tt('timing')+'<\/div>'+_tt('timingBody')+'<\/div>'
          +'<\/div><\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('workedExamples')+'<\/div>'+exHTML+'<\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('studentNotes')+'<\/div>'+noteLines+'<\/div>'
        +'<div class="lp-section"><div class="lp-amber-head">'+_tt('practiceAssess')+'<\/div>'+assessHTML+'<\/div>'
        +'<div class="lp-footer"><span>ClipSAT &middot; Mr. Mohamed Abdallah<\/span><span>'+_tt('lessonPlanDocTitlePrefix')+esc(subject)+'<\/span><span>'+today+'<\/span><\/div>'
        /* MathJax script is sync (no async); startup.promise resolves after full typeset */
        +'<script>MathJax.startup.promise.then(function(){setTimeout(window.print,400);});<\/script>'
        +'<\/body><\/html>';

      var _lpBlob=new Blob([lpHTML],{type:'text/html;charset=utf-8'});
      var _lpUrl=URL.createObjectURL(_lpBlob);
      var lpWin=window.open(_lpUrl,'_blank','width=940,height=780');
      if(!lpWin){alert('Please allow pop-ups to print the lesson plan.');URL.revokeObjectURL(_lpUrl);return;}
      setTimeout(function(){URL.revokeObjectURL(_lpUrl);},120000);
    }

    _injectCSS();
    return {toggle:toggle, exportPDF:exportPDF, exportWord:exportWord, printLessonPlan:printLessonPlan, isActive:function(){ return _active; }};
  }());


  /* ===================== i18n — EN / AR ===================== */
  })();
