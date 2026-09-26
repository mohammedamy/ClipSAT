/* The question-bank full exam (bankGenFullExam) and window.examSpecs, the real exam
   configurations. Moved verbatim from 02-core-app.js (Plan 5 Phase 5.015, ADR 0042). Ships as
   public/js/bank-exam.js; 02's _ensureBankExam() loads it the first time a paper is generated
   (or a test generator is touched), and 02's window.genFullExam hands off to CSBankExam. The AI
   pipeline (05a/05c) reads examSpecs too, so 05's _ensureAIExam() loads this file first. */
(function(){
  "use strict";


  /* ===================== EXAM SPECS (real exam configurations) ===================== */
  window.examSpecs={
    /* AP Calculus AB/BC, AP Precalculus and AP Statistics follow the formats College Board set for the
       May 2027 exams (course content unchanged for Calculus and Precalculus; AP Statistics is the revised
       five-unit course). AP multiple-choice questions have four options. */
    apab:{
      title:'AP Calculus AB',totalTime:'3 hr 10 min',
      logo:'AP® Calculus AB',org:'College Board',letters:['A','B','C','D'],
      instructions:['This exam has two sections. Budget your time carefully.',
        'Section I: 42 multiple-choice questions (four options each). Wrong answers are NOT penalised.',
        'Section II: 6 free-response questions. Show ALL work to earn full credit.',
        'Unless stated otherwise, assume the domain of ƒ is all real numbers.',
        'Decimal answers correct to three decimal places unless otherwise specified.',
        'The average of a finite set of values is their arithmetic mean.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 40 min',
         note:'50% of the exam score. Answered in the Bluebook app on the real exam.',
         parts:[
          {label:'Part A',q:29,time:'62 min',calc:false,type:'mcq',note:'No calculator permitted.'},
          {label:'Part B',q:13,time:'38 min',calc:true,type:'mcq',note:'Graphing calculator required for some questions.'}]},
        {title:'Section II — Free Response',time:'1 hr 30 min',
         note:'50% of the exam score. Show all your work. Clearly indicate the methods used, as you are graded on correctness of method as well as accuracy of answer.',
         parts:[
          {label:'Part A',q:2,time:'30 min',calc:true,type:'frq',note:'Graphing calculator required. Write work in the exam booklet.'},
          {label:'Part B',q:4,time:'60 min',calc:false,type:'frq',note:'No calculator permitted. Write work in the exam booklet.'}]}]},

    apbc:{
      title:'AP Calculus BC',totalTime:'3 hr 10 min',
      logo:'AP® Calculus BC',org:'College Board',letters:['A','B','C','D'],
      instructions:['This exam has two sections. Budget your time carefully.',
        'Section I: 42 multiple-choice questions (four options each). Wrong answers are NOT penalised.',
        'Section II: 6 free-response questions. Show ALL work to earn full credit.',
        'Unless stated otherwise, assume the domain of ƒ is all real numbers.',
        'Decimal answers correct to three decimal places unless otherwise specified.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 40 min',
         note:'50% of the exam score. Answered in the Bluebook app on the real exam.',
         parts:[
          {label:'Part A',q:29,time:'62 min',calc:false,type:'mcq',note:'No calculator permitted.'},
          {label:'Part B',q:13,time:'38 min',calc:true,type:'mcq',note:'Graphing calculator required for some questions.'}]},
        {title:'Section II — Free Response',time:'1 hr 30 min',
         note:'50% of the exam score. Show all your work for full credit.',
         parts:[
          {label:'Part A',q:2,time:'30 min',calc:true,type:'frq',note:'Graphing calculator required.'},
          {label:'Part B',q:4,time:'60 min',calc:false,type:'frq',note:'No calculator permitted.'}]}]},

    appc:{
      title:'AP Precalculus',totalTime:'2 hr 55 min',
      logo:'AP® Precalculus',org:'College Board',letters:['A','B','C','D'],
      instructions:['This exam has two sections.',
        'Section I: 42 multiple-choice questions (Parts A & B), four options each.',
        'Section II: 4 free-response questions.',
        'Show all work for free-response questions.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 45 min',
         note:'Answered in the Bluebook app on the real exam.',
         parts:[
          {label:'Part A',q:29,time:'65 min',calc:false,type:'mcq',note:'No calculator permitted.'},
          {label:'Part B',q:13,time:'40 min',calc:true,type:'mcq',note:'Graphing calculator required for some questions (radian mode).'}]},
        {title:'Section II — Free Response',time:'1 hr 10 min',
         note:'Show all work. Answers without supporting work may not receive full credit.',
         parts:[
          {label:'Part A',q:2,time:'35 min',calc:true,type:'frq',note:'Graphing calculator required.'},
          {label:'Part B',q:2,time:'35 min',calc:false,type:'frq',note:'No calculator permitted.'}]}]},

    apstats:{
      title:'AP Statistics',totalTime:'3 hr',
      logo:'AP® Statistics',org:'College Board',letters:['A','B','C','D'],
      instructions:['This exam has two sections, both completed in the Bluebook app on the real exam.',
        'Section I: 42 multiple-choice questions (four options each), 90 minutes.',
        'Section II: 4 free-response questions, 10 points each, 90 minutes.',
        'Show all work. Answers without appropriate supporting work will not receive full credit.',
        'A formula sheet and probability and statistics tables are provided. A graphing calculator is allowed throughout.'],
      sections:[
        {title:'Section I — Multiple Choice',time:'1 hr 30 min',
         note:'42 questions. 50% of the exam score. No penalty for incorrect answers.',
         parts:[{label:'',q:42,time:'90 min',calc:true,type:'mcq',note:''}]},
        {title:'Section II — Free Response',time:'1 hr 30 min',
         note:'4 questions, 10 points each. 50% of the exam score. Clearly communicate your statistical reasoning.',
         parts:[{label:'',q:4,time:'90 min',calc:true,type:'frq',note:'About 22 minutes per question.'}]}]},

    /* Digital SAT: 22 questions per module, about 75% multiple choice and 25% student-produced
       response (the real test mixes them; ClipSAT groups them within each module). */
    sat:{
      title:'Digital SAT® — Math',totalTime:'70 min',
      logo:'SAT®',org:'College Board',
      instructions:['Math section has two modules, each 35 minutes.',
        'Question types: multiple-choice (4 options) and student-produced response (grid-in).',
        'Calculator is permitted on ALL math questions.',
        'Reference sheet with formulas is provided at the start of each module.',
        'Module 2 difficulty adapts based on your Module 1 performance.'],
      sections:[
        {title:'Math — Module 1',time:'35 min',
         note:'This module contains multiple-choice and student-produced response questions.',
         parts:[{label:'Multiple choice',q:17,time:'',calc:true,type:'mcq',note:'Four answer choices.'},
          {label:'Student-produced response',q:5,time:'',calc:true,type:'frq',note:'Enter your own answer (an integer, decimal or fraction).'}]},
        {title:'Math — Module 2 (Adaptive)',time:'35 min',
         note:'This module adapts to your performance on Module 1.',
         parts:[{label:'Multiple choice',q:17,time:'',calc:true,type:'mcq',note:'Four answer choices.'},
          {label:'Student-produced response',q:5,time:'',calc:true,type:'frq',note:'Enter your own answer (an integer, decimal or fraction).'}]}]},

    /* Enhanced ACT (national paper and online tests from September 2025): 45 questions in 50 minutes,
       four answer choices, calculator allowed throughout. On the real test 41 are scored and 4 are
       unscored field-test questions; ClipSAT scores all 45. */
    act:{
      title:'ACT Mathematics',totalTime:'50 min',
      logo:'ACT®',org:'ACT, Inc.',letters:['A','B','C','D'],
      instructions:['45 questions — 50 minutes.',
        'Each question has four answer choices.',
        'Choose the BEST answer. Fill in the corresponding bubble on your answer sheet.',
        'Do not spend too long on any one problem. Return to difficult problems if time permits.',
        'Calculator permitted on every question. Assumed: figures not to scale unless stated; all geometry in a plane; "line" means straight line; "average" means arithmetic mean.'],
      sections:[
        {title:'Mathematics Test',time:'50 min',note:'45 Questions — 50 Minutes',
         parts:[{label:'',q:45,time:'50 min',calc:true,type:'mcq',note:'Four answer choices per question.',letters:['A','B','C','D']}]}]},

    /* ACT International Subject Test — Mathematics 1: 50 multiple-choice questions in 60 minutes,
       calculator allowed, reference sheet provided; about half Algebra II and half precalculus. */
    act2:{
      title:'ACT International Subject Test — Mathematics 1',totalTime:'60 min',
      logo:'ACT®',org:'ACT, Inc.',letters:['A','B','C','D'],
      instructions:['50 questions — 60 minutes.',
        'Choose the best answer for each question.',
        'Calculator permitted. A reference sheet of common formulas is provided.',
        'Assumed: figures not to scale unless stated.'],
      sections:[
        {title:'Mathematics 1',time:'60 min',note:'50 Questions — 60 Minutes',
         parts:[{label:'',q:50,time:'60 min',calc:true,type:'mcq',note:'',letters:['A','B','C','D']}]}]},

    est:{
      /* EST I papers from January, October and December 2024 (supplied by the maintainer) all have a
         20-question no-calculator section and a 38-question calculator section of four-option MCQs. */
      title:'EST I — Mathematics',totalTime:'1 hr 20 min',
      logo:'EST',org:'Academic Assessment Ltd.',letters:['A','B','C','D'],
      instructions:['The Mathematics test has two sections.',
        'No-calculator section: 20 questions, 25 minutes.',
        'Calculator section: 38 questions, 55 minutes.',
        'Every question is multiple choice with four answer choices. Mark the best answer on the answer sheet.',
        'No penalty for incorrect answers.'],
      sections:[
        {title:'Section 3 — Mathematics: No Calculator',time:'25 min',
         note:'Calculator use is NOT permitted in this section.',
         parts:[{label:'',q:20,time:'25 min',calc:false,type:'mcq',note:''}]},
        {title:'Section 4 — Mathematics: Calculator Permitted',time:'55 min',
         note:'A scientific or graphing calculator may be used in this section.',
         parts:[{label:'',q:38,time:'55 min',calc:true,type:'mcq',note:''}]}]},

    /* EST II Mathematics Level 1 (subject test): 50 multiple-choice questions in 60 minutes, calculator
       allowed, surface-area and volume formulas provided. */
    est2:{
      title:'EST II — Mathematics Level 1',totalTime:'60 min',
      logo:'EST II',org:'Academic Assessment Ltd.',
      instructions:['50 questions — 60 minutes.',
        'Choose the best answer for each question.',
        'A calculator is allowed; check whether it should be in degree or radian mode.',
        'Formulas for the surface area and volume of solids are provided.',
        'No penalty for incorrect answers.'],
      sections:[
        {title:'Mathematics Level 1',time:'60 min',
         note:'50 questions. A scientific or graphing calculator may be used.',
         parts:[{label:'',q:50,time:'60 min',calc:true,type:'mcq',note:''}]}]},

    igcse:{
      /* 0580 syllabus 2025–2027 and 2028–2030, Extended tier: two balanced papers (2 h, 100 marks, 50% each),
         Paper 2 non-calculator, Paper 4 calculator, List of formulas on page 2 of each paper. The syllabus does
         not fix a question count; the counts below are ClipSAT's layout for a 100-mark paper. */
      title:'Cambridge IGCSE Mathematics 0580 (Extended)',totalTime:'4 hr',
      logo:'Cambridge IGCSE™',org:'Cambridge Assessment International Education',
      instructions:['Answer ALL questions.',
        'Show all necessary working clearly. Answers without working may not gain full marks.',
        'A List of formulas is provided on page 2 of each paper.',
        'Give non-exact numerical answers correct to 3 significant figures, or 1 decimal place for angles in degrees, unless the question says otherwise.',
        'For π, use either your calculator value or 3.142 (Paper 4).',
        'Diagrams are not necessarily drawn to scale.'],
      sections:[
        {title:'Paper 2 — Non-calculator (Extended)',time:'2 hr',
         note:'100 marks. Calculators must not be used. Structured and unstructured questions. Answer ALL questions.',
         parts:[{label:'',q:20,time:'120 min',calc:false,type:'frq',note:'Non-calculator paper. Show all working.'}]},
        {title:'Paper 4 — Calculator (Extended)',time:'2 hr',
         note:'100 marks. A scientific calculator is required. Structured and unstructured questions. Answer ALL questions.',
         parts:[{label:'',q:20,time:'120 min',calc:true,type:'frq',note:'Calculator paper. Show all necessary working.'}]}]},

    aslevel:{
      /* 9709 syllabus 2026–2027 and 2028–2030: Paper 1 is 1 h 50 min, 75 marks, 10–12 structured questions. */
      title:'Cambridge AS Level Mathematics 9709',totalTime:'1 hr 50 min',
      logo:'Cambridge International AS & A Level',org:'Cambridge Assessment International Education',
      instructions:['Answer ALL questions.',
        'If working is needed, show it below the question.',
        'Omission of essential working will result in loss of marks.',
        'Electronic calculators should be used where appropriate.',
        'Give non-exact answers correct to 3 significant figures, or 1 decimal place for angles in degrees, unless stated otherwise.',
        'A list of formulae and statistical tables (MF19) is provided. Graphical calculators are not permitted.'],
      sections:[
        {title:'Paper 1 — Pure Mathematics 1',time:'1 hr 50 min',
         note:'75 marks. Answer ALL questions. Electronic calculator required.',
         parts:[{label:'',q:11,time:'110 min',calc:true,type:'frq',note:'Show all working. Partial marks are awarded.'}]}]},

    a2level:{
      /* 9709 syllabus 2026–2027 and 2028–2030: Paper 3 is 1 h 50 min, 75 marks, 9–11 structured questions. */
      title:'Cambridge A Level Mathematics 9709',totalTime:'1 hr 50 min',
      logo:'Cambridge International AS & A Level',org:'Cambridge Assessment International Education',
      instructions:['Answer ALL questions.',
        'Show all necessary working. Omission of working results in loss of marks.',
        'Electronic calculators should be used where appropriate.',
        'Give non-exact answers correct to 3 significant figures, or 1 decimal place for angles in degrees, unless stated otherwise.',
        'A list of formulae and statistical tables (MF19) is provided. Graphical calculators are not permitted.'],
      sections:[
        {title:'Paper 3 — Pure Mathematics 3',time:'1 hr 50 min',
         note:'75 marks. Answer ALL questions. Electronic calculator required.',
         parts:[{label:'',q:10,time:'110 min',calc:true,type:'frq',note:'Show all working.'}]}]},

    qudrat:{
      title:'GAT Qudrat — Quantitative Reasoning',totalTime:'52 min',
      logo:'GAT',org:'National Center for Assessment (Qiyas)',
      instructions:['52 questions — 52 minutes.',
        'Choose the best answer for each question.',
        'There is no penalty for wrong answers.',
        'Work quickly and carefully.',
        'No calculator permitted.'],
      sections:[
        {title:'Quantitative Reasoning',time:'52 min',
         note:'52 questions — one per minute on average.',
         parts:[{label:'',q:52,time:'52 min',calc:false,type:'mcq',note:''}]}]},

    tahsili:{
      title:'SAAT Tahsili — Mathematics',totalTime:'50 min',
      logo:'Tahsili',org:'National Center for Assessment (Qiyas)',
      instructions:['50 questions — 50 minutes.',
        'Choose the best answer for each question from the four options.',
        'No penalty for wrong answers.',
        'No calculator permitted.'],
      sections:[
        {title:'Mathematics Section',time:'50 min',
         note:'50 questions — answer all questions.',
         parts:[{label:'',q:50,time:'50 min',calc:false,type:'mcq',note:''}]}]},
    /* IB Mathematics: analysis and approaches, guide for first assessment 2021 (assessed until the new
       guide's first exams in May 2029). Every paper is written: Section A short-response and Section B
       extended-response questions. There is no multiple choice. */
    ibsl:{
      title:'IB Mathematics: Analysis and Approaches SL',totalTime:'3 hr',
      logo:'IB Mathematics SL',org:'International Baccalaureate Organization',
      instructions:['Answer ALL questions in both papers.',
        'Paper 1 (no technology): 80 marks, 90 minutes.',
        'Paper 2 (graphic display calculator required): 80 marks, 90 minutes.',
        'Each paper has Section A (short-response) and Section B (extended-response) questions.',
        'Answers should be given exactly or correct to 3 significant figures unless stated otherwise.',
        'Full marks are not necessarily awarded for a correct answer with no working.'],
      sections:[
        {title:'Paper 1 — No technology',time:'90 min',
         note:'80 marks. No calculator allowed.',
         parts:[{label:'Sections A and B',q:9,time:'90 min',calc:false,type:'frq',note:'Short-response then extended-response questions. Answer all questions.'}]},
        {title:'Paper 2 — Technology required',time:'90 min',
         note:'80 marks. Graphic display calculator required.',
         parts:[{label:'Sections A and B',q:9,time:'90 min',calc:true,type:'frq',note:'Short-response then extended-response questions. Answer all questions.'}]}
      ]
    },
    ibhl:{
      title:'IB Mathematics: Analysis and Approaches HL',totalTime:'5 hr',
      logo:'IB Mathematics HL',org:'International Baccalaureate Organization',
      instructions:['Answer ALL questions in all papers.',
        'Paper 1 (no technology): 110 marks, 120 minutes.',
        'Paper 2 (graphic display calculator required): 110 marks, 120 minutes.',
        'Paper 3 (graphic display calculator required): two extended problem-solving questions, 55 marks, 60 minutes.',
        'Answers should be given exactly or correct to 3 significant figures unless stated otherwise.',
        'Full marks are not necessarily awarded for a correct answer with no working.'],
      sections:[
        {title:'Paper 1 — No technology',time:'120 min',
         note:'110 marks. No calculator allowed.',
         parts:[{label:'Sections A and B',q:10,time:'120 min',calc:false,type:'frq',note:'Short-response then extended-response questions. Answer all questions.'}]},
        {title:'Paper 2 — Technology required',time:'120 min',
         note:'110 marks. Graphic display calculator required.',
         parts:[{label:'Sections A and B',q:10,time:'120 min',calc:true,type:'frq',note:'Short-response then extended-response questions. Answer all questions.'}]},
        {title:'Paper 3 — Technology required',time:'60 min',
         note:'55 marks. Two compulsory extended-response problem-solving questions.',
         parts:[{label:'',q:2,time:'60 min',calc:true,type:'frq',note:'Answer both questions.'}]}
      ]
    }
  };


  /* ===================== FULL EXAM GENERATOR ===================== */
  var bankGenFullExam=function(btn,examName,viewId,sectionTitles,qPerSection){
    var spec=window.examSpecs&&window.examSpecs[viewId];
    var bank=window.fullExamBank&&window.fullExamBank[viewId];
    if(!bank){alert('Question bank not found for '+viewId);return;}

    /* ── helpers ── */
    function _maths(s){var AENV=['align','aligned','matrix','pmatrix','bmatrix','vmatrix','array','cases','eqnarray','split','gather','gathered','smallmatrix'];var out='',inM=false,aD=0,i=0,L=s.length;while(i<L){if(!inM&&s.slice(i,i+2)==='\\('){out+='\\(';i+=2;inM=true;aD=0;continue;}if(!inM&&s.slice(i,i+2)==='\\['){out+='\\[';i+=2;inM=true;aD=0;continue;}if(inM&&s.slice(i,i+2)==='\\)'){out+='\\)';i+=2;inM=false;aD=0;continue;}if(inM&&s.slice(i,i+2)==='\\]'){out+='\\]';i+=2;inM=false;aD=0;continue;}if(inM&&s.slice(i,i+6)==='\\begin'){var b1=s.indexOf('{',i+6),e1=s.indexOf('}',b1+1);if(b1!==-1&&e1!==-1&&AENV.some(function(v){return s.slice(b1+1,e1).indexOf(v)!==-1;}))aD++;}if(inM&&s.slice(i,i+4)==='\\end'){var b2=s.indexOf('{',i+4),e2=s.indexOf('}',b2+1);if(b2!==-1&&e2!==-1&&AENV.some(function(v){return s.slice(b2+1,e2).indexOf(v)!==-1;})&&aD>0)aD--;}if(!inM&&s[i]==='<'&&i+1<L&&(s[i+1]==='/'||/[a-zA-Z]/.test(s[i+1]))){var tj=s.indexOf('>',i);if(tj!==-1){out+=s.slice(i,tj+1);i=tj+1;continue;}}var c=s[i];if(c==='&'){var sm=s.indexOf(';',i+1);if(sm!==-1&&sm-i<=8&&/^&[a-zA-Z#0-9]+;/.test(s.slice(i,sm+1))){var ent=s.slice(i,sm+1);if(ent==='&amp;'){if(inM&&aD>0)out+='&';else if(inM)out+='\\&';else out+='&amp;';}else out+=ent;i=sm+1;continue;}if(inM&&aD>0)out+='&';else if(inM)out+='\\&';else out+='&amp;';}else if(c==='<')out+='&lt;';else if(c==='>')out+='&gt;';else out+=c;i++;}return out;}
    function _mjRun(el){if(!el)return;function _t(){try{if(window.MathJax){if(typeof MathJax.typesetPromise==='function')MathJax.typesetPromise([el]).catch(function(){});else if(typeof MathJax.typeset==='function')MathJax.typeset([el]);else setTimeout(_t,400);}else{setTimeout(_t,400);}}catch(e){}}setTimeout(_t,80);setTimeout(_t,800);}
    var shuffle=window._shuffle;
    /* Track questions already drawn by an earlier section/part of THIS exam
       (fresh per genFullExam call) so the same question can never appear
       twice in one generated paper — previously each call re-shuffled the
       whole pool independently with no memory of prior draws. Also shuffle
       each drawn question's own choice order/answer index here, once, so
       every consumer of drawQ's result (fallback layout, spec-driven layout,
       and the answer key built from the same objects) automatically gets a
       randomized correct-answer position instead of always "A". */
    var _usedQFullExam=new Set();
    /* …and no two questions in the paper repeat a question or idea (05e-redundancy-check.js). */
    var _ideas=window.ClipSATRedundancy?window.ClipSATRedundancy.tracker():null;
    function drawQ(pool,n){
      var avail=shuffle(pool.filter(function(q){return !_usedQFullExam.has(q);})), picked=[];
      for(var i=0;i<avail.length&&picked.length<n;i++){ if(!_ideas||_ideas.add(avail[i])) picked.push(avail[i]); }
      picked.forEach(function(q){_usedQFullExam.add(q);});
      return picked.map(function(q){return window._shuffleQ?window._shuffleQ(q):q;});
    }
    /* A written-answer part takes the bank's free-response items first, then MCQ items that still
       make sense without their options; an MCQ part takes only MCQ items. */
    var _needsOptions=/which of the following|which (one|statement|expression|equation|graph|table|value|point|option)/i;
    function drawForPart(pool,part){
      if(part.type==='frq'){
        var got=drawQ(pool.filter(function(q){return q.type==='frq';}),part.q);
        if(got.length<part.q) got=got.concat(drawQ(pool.filter(function(q){return q.type!=='frq'&&!_needsOptions.test(q.text||q.q||'');}),part.q-got.length));
        return got;
      }
      if(part.type==='mcq'){
        /* prefer items with exactly the exam's option count (4-option exams skip old 5-option items) */
        var nOpt=(part.letters||globalLetters).length, mcq=pool.filter(function(q){return q.type!=='frq';});
        var got2=drawQ(mcq.filter(function(q){return !q.choices||q.choices.length===nOpt;}),part.q);
        if(got2.length<part.q) got2=got2.concat(drawQ(mcq,part.q-got2.length));
        return got2;
      }
      return drawQ(pool,part.q);
    }
    function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

    var d=new Date();
    var dateStr=d.toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});
    /* build pool from easy/medium/hard if bank has no pool */
    if(!bank.pool && (bank.easy||bank.medium||bank.hard)){
      var _cvt=function(a){return (a||[]).map(function(q){return {type:'mcq',domain:q.domain||'Mathematics',text:q.q||q.text||'',choices:q.choices||[],answer:q.answer,sol:q.sol||''};});};
      bank.pool=_cvt(bank.easy).concat(_cvt(bank.medium)).concat(_cvt(bank.hard));
    }
    var globalLetters=(spec&&spec.letters)||(bank.letters)||['A','B','C','D'];

    /* ── FALLBACK: no spec → flat legacy layout ── */
    if(!spec){
      var totalQ=sectionTitles.length*qPerSection;
      var h='<div class="full-exam-paper">';
      h+='<div class="fep-header"><div class="fep-top-bar"><span class="fep-logo-tag">ClipSAT</span><span class="fep-badge">Practice Examination</span></div>';
      h+='<h1 class="fep-title">'+esc(examName)+'</h1>';
      h+='<div class="fep-meta-grid"><div class="fep-meta-cell"><span class="fep-mlabel">Student Name</span><span class="fep-mline"></span></div>';
      h+='<div class="fep-meta-cell"><span class="fep-mlabel">Date</span><span class="fep-mval">'+dateStr+'</span></div>';
      h+='<div class="fep-meta-cell"><span class="fep-mlabel">School / Centre</span><span class="fep-mline"></span></div>';
      h+='<div class="fep-meta-cell fep-score-cell"><span class="fep-mlabel">Score</span><span class="fep-score-box-big">____&nbsp;/&nbsp;'+totalQ+'</span></div></div></div>';
      h+='<div class="fep-anssheet"><div class="fep-anssheet-title">Answer Sheet</div><div class="fep-bubbles" style="--fep-nopt:'+globalLetters.length+'">';
      for(var qi=1;qi<=totalQ;qi++){h+='<div class="fep-bubble-row"><span class="fep-bnum">'+qi+'</span>';globalLetters.forEach(function(l){h+='<span class="fep-bubble">'+l+'</span>';});h+='</div>';}
      h+='</div></div>';
      var qNum=1;var ak=[];
      /* Structured capture for the Google Forms/Classroom integration — see
         public/js/quiz-capture-ui.js. Mirrors ak[] but keeps the full
         choices array + a zero-based correctIndex instead of a display
         letter, and is fired as a DOM event once rendering completes so
         nothing outside this function needs to know the internal shape. */
      var _csCaptureQ=[];
      sectionTitles.forEach(function(secTitle,si){
        var sq=drawQ(bank.pool,qPerSection);
        h+='<div class="fep-section" style="page-break-before:'+(si>0?'always':'auto')+'">';
        h+='<div class="fep-section-head"><span class="fep-sec-label">Section '+(si+1)+'</span><span class="fep-sec-title">'+esc(secTitle)+'</span></div>';
        sq.forEach(function(q){
          var isMCQ=(q.type==='mcq'||q.type==='data');
          ak.push({n:qNum,type:q.type,domain:q.domain,answer:isMCQ?globalLetters[q.answer]:null,sol:q.sol||''});
          _csCaptureQ.push({text:q.text||q.q||'',choices:isMCQ?(q.choices||[]).slice():[],correctIndex:isMCQ?q.answer:null,type:isMCQ?'mcq':'frq',points:1});
          h+='<div class="fep-item '+(q.type==='frq'?'fep-frq':'fep-mcq')+'">';
          h+='<div class="fep-item-head"><span class="fep-inum">'+qNum+'</span><span class="fep-domain-tag">'+esc(q.domain)+'</span></div>';
          if(q.figure||q.fig)h+='<div class="fep-figure">'+(q.figure||(window._renderFig&&window._renderFig(q.fig))||'')+'</div>';
          h+='<div class="fep-qbody">'+_maths(q.text||q.q||'')+'</div>';
          if(isMCQ&&q.choices){h+='<div class="fep-choices">';q.choices.forEach(function(ch,ci){var s=String(ch||'');if(s.indexOf('\\(')===-1&&s.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(s)){s='\\('+s+'\\)';}h+='<div class="fep-choice"><span class="fep-cletter">'+globalLetters[ci]+'.</span><span class="fep-ctext">'+_maths(s)+'</span></div>';});h+='</div>';}
          if(q.type==='frq'){h+='<div class="fep-work-space"><span class="fep-ws-label">Working:</span>';for(var l=0;l<5;l++)h+='<div class="fep-ws-line"></div>';h+='<div class="fep-ws-ans"><span>Answer:</span><span class="fep-ws-ans-line"></span></div></div>';}
          h+='<div class="fep-sol-block" style="display:none"><strong>Answer'+(isMCQ?' ('+globalLetters[q.answer]+')':'')+': </strong>'+_maths(q.sol||'')+'</div></div>';
          qNum++;
        });
        h+='</div>';
      });
      h+='<div class="fep-key-section"><button class="btn fep-key-toggle" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display===\'none\'?\'block\':\'none\';this.textContent=this.textContent.includes(\'Show\')?\'Hide Answer Key ▴\':\'Show Answer Key ▾\'">Show Answer Key ▾</button><div class="fep-key-grid" style="display:none">';
      ak.forEach(function(k){h+='<div class="fep-key-item '+(k.type==='frq'?'fep-key-frq':'')+'""><span class="fep-knum">'+k.n+'</span><span class="fep-kans">'+(k.answer||'FRQ')+'</span><span class="fep-kdomain">'+esc(k.domain)+'</span></div>';});
      h+='</div></div></div>';
      var _tgF=btn.closest('.testgen');
      var out=_tgF?_tgF.querySelector('.tg-out'):null;
      if(!out){var _secF=btn.closest('section');if(_secF){var _outsF=_secF.querySelectorAll('.tg-out');out=_outsF[_outsF.length-1]||null;}}
      if(!out){console.warn('genFullExam: no .tg-out found for',viewId);return;}
      out.innerHTML=h;
      _mjRun(out);
      document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genFullExam-static',title:examName,trackId:viewId,questions:_csCaptureQ,outEl:out}}));
      return;
    }

    /* ── SPEC-DRIVEN PATH — real exam standards ── */
    var totalMCQ=0,totalFRQ=0;
    spec.sections.forEach(function(sec){sec.parts.forEach(function(p){
      if(p.type==='mcq')totalMCQ+=p.q; else if(p.type==='frq')totalFRQ+=p.q;
    });});
    var totalQ=totalMCQ+totalFRQ;

    /* COVER PAGE */
    var h='<div class="full-exam-paper">';
    h+='<div class="fep-cover-page">';
    h+='<div class="fep-official-bar">'+esc(spec.org||'ClipSAT Practice')+'</div>';
    h+='<div class="fep-header">';
    h+='<div class="fep-logo-wrap" style="text-align:center;padding:10px 0 4px">'+'<img src="'+(document.getElementById('site-logo-img')||{src:''}).src+'" class="fep-logo-img" alt="ClipSAT Logo"></div>';
    h+='<div class="fep-top-bar"><span class="fep-exam-logo">'+esc(spec.logo||spec.title)+'</span><span class="fep-badge">Practice Examination</span></div>';
    h+='<h1 class="fep-title">'+esc(spec.title)+'</h1>';
    h+='<div class="fep-total-bar">';
    h+='<div class="fep-total-item"><span class="fep-total-val">'+totalQ+'</span><span class="fep-total-lbl">Total Questions</span></div>';
    h+='<div class="fep-total-item"><span class="fep-total-val">'+esc(spec.totalTime)+'</span><span class="fep-total-lbl">Total Time</span></div>';
    if(totalMCQ>0)h+='<div class="fep-total-item"><span class="fep-total-val">'+totalMCQ+'</span><span class="fep-total-lbl">Multiple Choice</span></div>';
    if(totalFRQ>0)h+='<div class="fep-total-item"><span class="fep-total-val">'+totalFRQ+'</span><span class="fep-total-lbl">Free Response</span></div>';
    h+='</div>';
    h+='<div class="fep-meta-grid">';
    h+='<div class="fep-meta-cell"><span class="fep-mlabel">Student Name</span><span class="fep-mline"></span></div>';
    h+='<div class="fep-meta-cell"><span class="fep-mlabel">Date</span><span class="fep-mval">'+dateStr+'</span></div>';
    h+='<div class="fep-meta-cell"><span class="fep-mlabel">School / Centre</span><span class="fep-mline"></span></div>';
    h+='<div class="fep-meta-cell fep-score-cell"><span class="fep-mlabel">Total Score</span><span class="fep-score-box-big">____&nbsp;/&nbsp;'+totalQ+'</span></div>';
    h+='</div>';
    h+='<div class="fep-instr-box"><strong>General Instructions</strong><ul class="fep-instr-list">';
    spec.instructions.forEach(function(ins){h+='<li>'+esc(ins)+'</li>';});
    h+='</ul></div>';
    h+='</div>';
    /* overview table */
    h+='<div class="fep-instr-box" style="margin-top:16px"><strong>Exam Overview</strong>';
    h+='<table style="width:100%;border-collapse:collapse;font-family:var(--sans);font-size:.82rem;margin-top:8px">';
    h+='<tr style="background:#f0f4fc"><th style="padding:5px 8px;text-align:left;border:1px solid #c5cde8">Section / Part</th><th style="padding:5px 8px;text-align:left;border:1px solid #c5cde8">Time</th><th style="padding:5px 8px;text-align:center;border:1px solid #c5cde8">Q\'s</th><th style="padding:5px 8px;text-align:center;border:1px solid #c5cde8">Calc</th></tr>';
    spec.sections.forEach(function(sec){
      sec.parts.forEach(function(p){
        var rowTitle=sec.parts.length>1&&p.label?(esc(sec.title)+' — '+esc(p.label)):esc(sec.title);
        h+='<tr><td style="padding:5px 8px;border:1px solid #c5cde8">'+rowTitle+(p.note?'<br><small style="color:#666">'+esc(p.note)+'</small>':'')+'</td>';
        h+='<td style="padding:5px 8px;border:1px solid #c5cde8;white-space:nowrap">'+esc(p.time)+'</td>';
        h+='<td style="padding:5px 8px;border:1px solid #c5cde8;text-align:center">'+p.q+'</td>';
        h+='<td style="padding:5px 8px;border:1px solid #c5cde8;text-align:center"><span class="fep-calc-badge '+(p.calc?'fep-calc-yes':'fep-calc-no')+'">'+(p.calc?'Yes':'No')+'</span></td></tr>';
      });
    });
    h+='</table></div></div>';

    /* ANSWER SHEET (MCQ only) */
    if(totalMCQ>0){
      h+='<div class="fep-anssheet" style="page-break-before:always"><div class="fep-anssheet-title">Answer Sheet — Multiple Choice ('+totalMCQ+' questions)</div>';
      h+='<p style="font-family:var(--sans);font-size:.78rem;color:#555;margin:0 0 10px">Fill in the bubble for your chosen answer. Erase completely if you change an answer.</p>';
      var maxOpt=globalLetters.length;
      spec.sections.forEach(function(sec){sec.parts.forEach(function(p){if(p.type==='mcq'&&p.letters&&p.letters.length>maxOpt)maxOpt=p.letters.length;});});
      h+='<div class="fep-bubbles" style="--fep-nopt:'+maxOpt+'">';
      var mcqN=0;
      spec.sections.forEach(function(sec){sec.parts.forEach(function(p){
        if(p.type!=='mcq')return;
        var pL=p.letters||globalLetters;
        for(var i=0;i<p.q;i++){mcqN++;h+='<div class="fep-bubble-row"><span class="fep-bnum">'+mcqN+'</span>';pL.forEach(function(l){h+='<span class="fep-bubble">'+l+'</span>';});h+='</div>';}
      });});
      h+='</div></div>';
    }

    /* SECTIONS & PARTS */
    var qNum=1;var answerKey=[];
    var _csCaptureQ=[]; /* see the fallback branch above for what this feeds */
    spec.sections.forEach(function(sec,si){
      h+='<div class="fep-section" style="page-break-before:always">';
      h+='<div class="fep-section-head">';
      h+='<span class="fep-sec-label">Section '+(si+1)+' of '+spec.sections.length+'</span>';
      h+='<span class="fep-sec-title">'+esc(sec.title)+'</span>';
      h+='<span class="fep-sec-time">&#9201; '+esc(sec.time)+'</span>';
      h+='</div>';
      if(sec.note)h+='<div class="fep-sec-note">'+esc(sec.note)+'</div>';

      sec.parts.forEach(function(part){
        var pL=part.letters||globalLetters;
        var isMCQPart=(part.type==='mcq');
        var isFRQPart=(part.type==='frq');

        if(part.label){
          h+='<div class="fep-part-head">';
          h+='<span class="fep-part-label">'+esc(part.label)+'</span>';
          h+='<span class="fep-part-info">'+part.q+' Question'+(part.q!==1?'s':'')+(part.time?' &nbsp;·&nbsp; &#9201; '+esc(part.time):'')+'</span>';
          h+='<span class="fep-calc-badge '+(part.calc?'fep-calc-yes':'fep-calc-no')+'">'+(part.calc?'Calculator Permitted':'No Calculator')+'</span>';
          h+='</div>';
        }
        if(part.note){h+='<div class="fep-sec-note">'+esc(part.note)+'</div>';}

        var partStart=qNum;
        var qs=drawForPart(bank.pool,part);
        if(part.q>1)h+='<div class="fep-q-count">Questions '+partStart+'–'+(partStart+part.q-1)+'</div>';

        qs.forEach(function(q){
          var isMCQ=isMCQPart||(q.type==='mcq'||q.type==='data');
          var isFRQ=isFRQPart||(q.type==='frq');
          if(isMCQPart){isFRQ=false;isMCQ=true;}
          if(isFRQPart){isMCQ=false;isFRQ=true;}

          answerKey.push({n:qNum,type:(isFRQ?'frq':'mcq'),domain:q.domain,
            answer:(isMCQ?pL[q.answer]:null),sol:q.sol||''});
          _csCaptureQ.push({text:q.text||q.q||'',choices:isMCQ?(q.choices||[]).slice():[],correctIndex:isMCQ?q.answer:null,type:isFRQ?'frq':'mcq',points:1});

          h+='<div class="fep-item '+(isFRQ?'fep-frq fep-frq-full':'fep-mcq')+'">';
          h+='<div class="fep-item-head"><span class="fep-inum">'+qNum+'</span>';
          h+='<span class="fep-domain-tag">'+esc(q.domain||'')+'</span>';
          if(isFRQ)h+='<span class="fep-type-tag frq-tag">FRQ</span>';
          h+='</div>';
          if(q.figure)h+='<div class="fep-figure">'+q.figure+'</div>';
          h+='<div class="fep-qbody">'+_maths(q.text||q.q||'')+'</div>';
          if(isMCQ&&q.choices){
            h+='<div class="fep-choices">';
            q.choices.forEach(function(ch,ci){var s=String(ch||'');if(s.indexOf('\\(')===-1&&s.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(s)){s='\\('+s+'\\)';}h+='<div class="fep-choice"><span class="fep-cletter">'+pL[ci]+'.</span><span class="fep-ctext">'+_maths(s)+'</span></div>';});
            h+='</div>';
          }
          if(isFRQ){
            h+='<div class="fep-work-space"><span class="fep-ws-label">Working Space:</span>';
            for(var ln=0;ln<8;ln++)h+='<div class="fep-ws-line"></div>';
            h+='<div class="fep-ws-ans"><span>Answer:</span><span class="fep-ws-ans-line"></span></div></div>';
          }
          h+='<div class="fep-sol-block" style="display:none"><strong>Answer'+(isMCQ?' ('+pL[q.answer]+')':'')+': </strong>'+_maths(q.sol||'')+'</div>';
          h+='</div>';
          qNum++;
        });
      });
      h+='</div>';
    });

    /* ANSWER KEY */
    h+='<div class="fep-key-section">';
    h+='<button class="btn fep-key-toggle" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display===\'none\'?\'block\':\'none\';this.textContent=this.textContent.includes(\'Show\')?\'Hide Answer Key ▴\':\'Show Answer Key ▾\'">Show Answer Key ▾</button>';
    h+='<div class="fep-key-grid" style="display:none">';
    answerKey.forEach(function(k){
      h+='<div class="fep-key-item '+(k.type==='frq'?'fep-key-frq':'')+'">';
      h+='<span class="fep-knum">'+k.n+'</span>';
      h+='<span class="fep-kans">'+(k.answer||'FRQ')+'</span>';
      h+='<span class="fep-kdomain">'+esc(k.domain)+'</span>';
      h+='</div>';
    });
    h+='</div></div>';
    h+='</div>';

    /* find nearest .tg-out whether inside .testgen or as a following sibling */
    var _tg=btn.closest('.testgen');
    var out=_tg?_tg.querySelector('.tg-out'):null;
    if(!out){
      /* button outside .testgen: look for next .tg-out sibling or cousin */
      var _p=btn.parentElement;
      var _sib=_p?_p.nextElementSibling:null;
      if(_sib&&(_sib.classList.contains('tg-out')||_sib.querySelector('.tg-out')))
        out=_sib.classList.contains('tg-out')?_sib:_sib.querySelector('.tg-out');
      if(!out){
        var _sec=btn.closest('section');
        if(_sec){var _outs=_sec.querySelectorAll('.tg-out');out=_outs[_outs.length-1];}
      }
    }
    if(!out){out=document.createElement('div');out.className='tg-out';btn.insertAdjacentElement('afterend',out);}
    out.innerHTML=h;
    _mjRun(out);
    document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genFullExam-static',title:spec.title||examName,trackId:viewId,questions:_csCaptureQ,outEl:out}}));
  };

  window.CSBankExam={genFullExam:bankGenFullExam};
})();
