/* AI-generated tests and full papers: the prompts, the AI calls, rendering and
   grading of AI questions, and the AI paths of genTest/genFullExam. Moved verbatim
   from 05-test-generator-and-ai-settings.js (ADR 0041). Ships first inside
   public/js/ai-exam.js, which 05's _ensureAIExam() loads the first time an AI test
   or paper is generated; 05 keeps the question-bank paths and hands the AI ones to
   window.CSAITest. */
(function(){
'use strict';

function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function renderMathFigure(spec){ return window.renderMathFigure(spec); }

/* ── callAI — uses the shared Groq provider (same key/models as
   the Ask Mr. Mohamed chatbot) ── */
async function callAI(system, user){
  try{
    /* maxTokens was a flat 4096 — nowhere near enough for genFullExam's ask
       of up to 80 questions. This was originally tuned (7800, then a
       dynamic prompt-aware formula) against Groq's tight, fixed 8,000
       tokens-per-minute account cap, which charges prompt + completion
       TOGETHER — go over it and the whole request gets rejected outright
       ("Request too large… Limit 8000, Requested 8989"), confirmed via a
       live reproduction using the real examSystemPrompt() output.
       That hard 8K ceiling only applies to the personal-key path now
       (still Groq, calling directly from the browser with a visitor's own
       key — see callWithPersonalKey above). The default shared path
       proxies to OpenAI (pay-as-you-go, no such small fixed account-wide
       cap), so this ceiling is sized for a full ~80-question exam instead;
       a personal-key visitor whose own Groq account can't cover an
       unusually large request still gets Groq's own clean error back
       rather than a crash (see tryModel's error handling above).
       chars/3 is a deliberately conservative (over-)estimate of
       tokens-per-char for English+LaTeX text, so the budget still tracks
       actual prompt size rather than always maxing out; 2000 is a floor
       so an unusually long prompt still gets a shot at a partial answer. */
    var promptTokensEst = Math.ceil((system.length + user.length) / 3);
    var maxTokens = Math.max(2000, Math.min(16000, 17000 - promptTokensEst));
    return await window._openrouterChatMessages(
      [{role:'system',content:system},{role:'user',content:user}],
      {temperature:0.3, maxTokens:maxTokens, json:true}
    );
  }catch(err){
    if(err&&err.message==='NO_KEY') throw new Error('No AI key. Click ⚙ Configure AI below.');
    throw err;
  }
}

/* Independent re-solve call for the verifier (05b-ai-question-verifier.js):
   temperature 0, so the checker is as deterministic as the provider allows. */
function callAISolver(system, user){
  var promptTokensEst = Math.ceil((system.length + user.length) / 3);
  var maxTokens = Math.max(1500, Math.min(8000, 17000 - promptTokensEst));
  return window._openrouterChatMessages(
    [{role:'system',content:system},{role:'user',content:user}],
    {temperature:0, maxTokens:maxTokens, json:true}
  );
}
/* The exam's blueprint (05c), or a single-topic stand-in for pages without one. */
function examBlueprint(viewId){
  var bp=window.ClipSATBlueprints&&window.ClipSATBlueprints.get(viewId);
  if(bp&&bp.topics&&bp.topics.length) return bp;
  var syl=examSyllabus(viewId);
  return {source:'No blueprint for this page; questions follow the course syllabus.',provisional:true,
    difficulty:{easy:30,medium:40,hard:30},order:'mixed',topics:[{name:syl,weight:1,desc:syl,bank:[]}]};
}
function assemblerProgress(out,label){
  return function(done,total,phase){
    out.innerHTML='<div class="ai-gen-loading"><div class="ai-spinner"></div><p>'+label+' — '+phase+' ('+done+'/'+total+' batches), '+
      'each question reviewed for its answer, topic, difficulty and clarity…</p></div>';
  };
}
/* Answer letters for an exam's MCQs: the paper spec's own letters, else the
   letters the generator is told to use (so a 4-option exam never shows "E"). */
function examLetters(viewId){
  var sp=window.examSpecs&&window.examSpecs[viewId];
  if(sp&&sp.letters) return sp.letters;
  var m=/must use letters \(([A-Z ]+)\)/.exec(examSystemPrompt(viewId));
  return m?m[1].split(' '):['A','B','C','D'];
}
/* "<exam name>. <syllabus description>" — the first sentence pair of
   examSystemPrompt, reused so the reviewer judges syllabus fit against
   exactly what the generator was told. */
function examSyllabus(examId){
  var m=/^You are an expert exam writer for ([\s\S]*?)\n\n/.exec(examSystemPrompt(examId));
  return m?m[1]:String(examId);
}

/* ── Exam prompt builder ────────────────────────────────────────── */
function examSystemPrompt(examId){
  var specs={
    ibsl:{name:'IB Mathematics: Analysis and Approaches SL',letters:'A B C D',desc:'IB Mathematics: Analysis and Approaches SL (guide for first assessment 2021): number and algebra, functions, geometry and trigonometry, statistics and probability, calculus. Papers 1 (no technology) and 2 (GDC) are written papers of short-response (Section A) and extended-response (Section B) questions with marks shown; there is NO multiple choice.'},
    ibhl:{name:'IB Mathematics: Analysis and Approaches HL',letters:'A B C D',desc:'IB Mathematics: Analysis and Approaches HL (guide for first assessment 2021): all SL topics plus proof by induction and contradiction, complex numbers, counting, partial fractions, 3D vectors, lines and planes, Bayes, continuous random variables, further calculus, differential equations and Maclaurin series. Papers 1 and 2 are written short- and extended-response questions; Paper 3 is two extended problem-solving questions; there is NO multiple choice.'},
    precalc:{name:'Pre-Calculus',letters:'A B C D',desc:'High school pre-calculus: trigonometry, unit circle, conic sections, vectors, polar coordinates, exponential/logarithmic functions, rational functions, sequences and series.'},
    appc:{name:'AP Precalculus',letters:'A B C D',desc:'College Board AP Precalculus: polynomial/rational functions, rates of change, exponential/logarithmic functions, sinusoidal functions, polar functions, parametric equations, vectors, matrices.'},
    apstats:{name:'AP Statistics',letters:'A B C D',desc:'College Board AP Statistics, revised five-unit course (May 2027 exam): exploring one-variable data and collecting data, probability, random variables and distributions, inference for proportions, inference for means, regression analysis. Four answer choices per MCQ. NOT assessed: transformations to achieve linearity, combining random variables, the geometric distribution, chi-square goodness of fit, inference for regression slopes.'},
    calculus:{name:'AP Calculus AB/BC',letters:'A B C D',desc:'US College Board exam. Cover: limits, derivatives, integrals, FTC, series (BC).'},
    algebra:{name:'Algebra',letters:'A B C D',desc:'High school algebra: linear equations, quadratics, systems, polynomials, inequalities.'},
    alg2:{name:'Algebra 2',letters:'A B C D',desc:'Algebra 2: complex numbers, polynomials, rational functions, conic sections, logarithms, sequences.'},
    apab:{name:'AP Calculus AB',letters:'A B C D',desc:'College Board AP Calculus AB: limits, derivatives, integrals, FTC, differential equations, areas, volumes.'},
    apbc:{name:'AP Calculus BC',letters:'A B C D',desc:'College Board AP Calculus BC: all AB topics plus sequences/series, Taylor, parametric, polar, integration techniques.'},
    igcse:{name:'Cambridge IGCSE Mathematics 0580 Extended',letters:'A B C D',desc:'Cambridge IGCSE 0580 Extended, 2025–2030 syllabus: number, algebra and graphs, coordinate geometry, geometry, mensuration, trigonometry, transformations and vectors, probability, statistics. Paper 2 non-calculator and Paper 4 calculator, 100 marks each, structured and unstructured questions with marks shown. Matrices and linear programming are NOT in this syllabus.'},
    geo:{name:'Geometry',letters:'A B C D',desc:'Euclidean geometry: triangles, circles, quadrilaterals, 3D solids, coordinate geometry, proofs.'},
    qudrat:{name:'GAT Qudrat Quantitative',letters:'A B C D',desc:'Saudi GAT Qudrat quantitative section (Qiyas): arithmetic, geometry, algebra, statistics and analysis; no calculator. Standard MCQ and quantitative comparison (A>B/B>A/Equal/Cannot determine). Bilingual Arabic/English.'},
    tahsili:{name:'SAAT Tahsili Mathematics',letters:'A B C D',desc:'Saudi SAAT Tahsili (Qiyas) mathematics, secondary curriculum, four-option MCQ, no calculator. Algebra: logic and sets, relations and functions, domain, even/odd functions, limits and continuity, increasing/decreasing and extreme values, average rate of change, parent functions and transformations, exponential and logarithmic functions, polynomials, rational and radical expressions, direct and inverse variation, matrices and determinants, complex numbers, arithmetic and geometric sequences and series, combinations and the binomial theorem, vectors (dot and cross product), polar coordinates and De Moivre. Geometry: angles and parallel lines, triangles, quadrilaterals, polygon angles, reflections, translations, rotations, dilations, circles, slope and linear equations, similarity, parabolas, ellipses, hyperbolas. Trigonometry: right-triangle trigonometry, laws of sines and cosines, identities and equations. Calculus: limits, derivatives, integrals. Statistics and probability: counting, permutations and combinations, geometric probability, expected value, probability, statistics, the normal distribution. Include Arabic question then English translation.'},
    sat:{name:'Digital SAT Mathematics',letters:'A B C D',desc:'College Board Digital SAT 2025: algebra, advanced math, problem solving, data analysis. MCQ (4 choices) plus some SPR (student-produced response, treated as FRQ).'},
    act:{name:'ACT Mathematics',letters:'A B C D',desc:'Enhanced ACT Math (from September 2025): number and quantity, algebra, functions, geometry, statistics and probability, and integrating essential skills. 45 questions in 50 minutes, calculator allowed, 4 choices per MCQ.'},
    est:{name:'EST I Mathematics',letters:'A B C D',desc:'EST I (Academic Assessment Ltd.) Mathematics: a 20-question no-calculator section and a 38-question calculator section, all four-option multiple choice. Linear equations, inequalities and systems; quadratics, polynomials, rational and radical expressions; functions and graphs; exponents and exponential growth; ratios, rates, percentages and data in tables and charts; statistics and probability; geometry; right-triangle trigonometry and complex numbers.'},
    est2:{name:'EST II Mathematics Level 1',letters:'A B C D',desc:'EST II Mathematics Level 1 subject test: algebra and functions, plane, coordinate and solid geometry, trigonometry, sequences, statistics and probability. 50 multiple-choice questions in 60 minutes, calculator allowed.'},
    act2:{name:'ACT International Subject Test — Mathematics 1',letters:'A B C D',desc:'ACT International Subject Test Mathematics 1: about half Algebra II (equations, systems, polynomial, rational, exponential and logarithmic functions, counting, probability, statistics) and half precalculus (trigonometry, sequences and series, conics and coordinate geometry, limits). 50 questions in 60 minutes, calculator allowed.'},
    act2l2:{name:'ACT International Subject Test — Mathematics 2',letters:'A B C D',desc:'ACT International Subject Test Mathematics 2: about half Algebra II and half precalculus at the advanced level — complex numbers, matrices and vectors, sequences and series, advanced functions and equations, trigonometry and polar coordinates, limits. 50 multiple-choice questions in 60 minutes, calculator allowed.'},
    est2l2:{name:'EST II Mathematics Level 2',letters:'A B C D',desc:'EST II Mathematics Level 2 subject test (Academic Assessment Ltd.): numbers and operations (complex numbers, matrices and determinants, vectors, sequences and series), algebra and functions (polynomial, rational, exponential, logarithmic, trigonometric, parametric and piecewise functions, introductory calculus, differential equations), coordinate geometry, plane and solid shapes, trigonometry, data analysis, statistics and probability. 50 multiple-choice questions in 60 minutes, calculator allowed, formula sheet provided.'},
    aslevel:{name:'Cambridge AS Level Mathematics 9709 Paper 1',letters:'A B C D',desc:'Cambridge International AS Level 9709 (2026–2027 syllabus) Paper 1 Pure Mathematics 1: quadratics, functions, coordinate geometry, circular measure, trigonometry, series, differentiation, integration. Structured questions with marks shown; no vectors, mechanics or statistics on this paper.'},
    a2level:{name:'Cambridge A Level Mathematics 9709 P3',letters:'A B C D',desc:'Cambridge International A Level 9709 (2026–2027 syllabus) Paper 3 Pure Mathematics 3: algebra (modulus, polynomials, partial fractions, binomial for rational n), logarithmic and exponential functions, trigonometry, differentiation, integration, numerical solution of equations, vectors, differential equations, complex numbers. Structured questions with marks shown; no mechanics or statistics on this paper.'}
  };
  var sp=specs[examId]||{name:'Mathematics',letters:'A B C D',desc:'High school mathematics.'};

  return 'You are an expert exam writer for '+sp.name+'. '+sp.desc+'\n\n'+
'Generate original, high-quality exam questions. Return ONLY valid JSON in this exact structure:\n'+
'{"questions":[{"type":"mcq"|"frq","domain":"Topic","text":"question in LaTeX","choices":["choice A","choice B",...],"answer":0,"sol":"solution","figure":{...optional...}}]}\n\n'+
'LaTeX rules:\n'+
'- Inline math: \\\\( expression \\\\)\n'+
'- Display math: \\\\[ expression \\\\]\n'+
'- Use \\\\frac{a}{b}, \\\\sqrt{x}, \\\\int, \\\\sum, \\\\infty, \\\\leq, \\\\geq, \\\\Rightarrow, \\\\pi, \\\\theta, \\\\circ (NOT inside \\\\( \\\\))\n'+
'- Degrees: write "90^\\\\circ" NOT "90°"\n\n'+
'Answer choices for MCQ must use letters ('+sp.letters+'). "answer" is 0-based index. Write each choice WITHOUT '+
'any letter prefix (write "12", not "A. 12"): the page adds the letters itself.\n'+
'FIGURES must match the question exactly: every label equals the value in the text, side labels are in '+
'proportion to the coordinates you draw (a side labelled 8 is twice as long as one labelled 4), right angles '+
'are really 90°, and the diagram type fits the question (e.g. a linear pair is two angles on a straight line, '+
'not a triangle). If you cannot draw a consistent figure, omit the figure.\n'+
'RELEVANCE: every question must test a topic of THIS syllabus at the requested level; never include topics '+
'beyond it (e.g. university-level material in a school course). Off-syllabus questions are discarded.\n'+
'ACCURACY IS THE TOP PRIORITY. For every question, work the full solution in "sol" FIRST, then set the '+
'answer key to the option that matches the solution\'s final result. Exactly one option may be correct; '+
'every other option must be a genuinely different value.\n'+
'Every MCQ MUST also include "answerValue" (the final result from "sol" as plain-text math, NOT LaTeX: '+
'* for multiplication, ^ for powers, sqrt()/sin()/ln(), fractions as a/b, e.g. "3/4" or "2*sqrt(3)") and '+
'"choiceValues" (an array, same order and length as "choices", giving each option\'s value in that same '+
'plain-text form; use null for an option that is not a single number or expression). Answers are checked '+
'automatically against these fields and an independent re-solve; questions that fail are discarded.\n'+
'For FRQ: omit choices and answer fields. If — and only if — the question has ONE single final '+
'numeric answer (not an interval, not multiple values, not a proof/derivation with no single number), '+
'also include "numericAnswer" (a plain number, e.g. 12.5) so the student can self-check; omit it '+
'entirely for anything else.\n'+
'If instead the question has ONE single final answer that is an algebraic expression in one or more '+
'variables (e.g. factor/expand/simplify a polynomial, find f(x), find the derivative) — not an equation, '+
'not a set of cases, not a proof — include "answerExpr" (plain-text math, NOT LaTeX: use * for '+
'multiplication or juxtaposition like "2x", ^ for powers, standard function names like sqrt()/sin()/'+
'ln(), e.g. "2*x+2" or "(x-1)*(x+1)" or "sqrt(x)+3") and "answerVars" (array of the variable name(s) '+
'it uses, e.g. ["x"]). Only ever include ONE of numericAnswer or answerExpr, never both, and omit both '+
'for anything else.\n\n'+
'FIGURES — include whenever a diagram, graph, or chart makes the question clearer or more realistic.\n'+
'Figure types (use the "figure" field):\n\n'+
'1. Function graph:\n'+
'{"type":"function_graph","fns":["x**2-2*x-3","2*x-1"],"labels":["f(x)","g(x)"],"xmin":-2,"xmax":5,"ymin":-5,"ymax":8,"points":[{"x":1,"y":-4,"label":"(1,−4)"}],"shade":{"from":"fn0","to":"x_axis","a":−1,"b":3}}\n\n'+
'2. 2-D geometry:\n'+
'{"type":"geometry_2d","title":"Triangle ABC","shapes":[{"shape":"triangle","pts":[[0,0],[4,0],[0,3]],"right_angle":0,"labels":["A","B","C"],"sides":["3","4","5"],"angle_marks":[1,2]}]}\n\n'+
'3. 3-D solid (isometric):\n'+
'{"type":"geometry_3d","solid":"rectangular_prism","dims":[6,4,3],"labels":{"l":"6 cm","w":"4 cm","h":"3 cm"}}\n'+
'Solids: rectangular_prism, cube, cylinder, cone, triangular_prism, square_pyramid, sphere\n'+
'Cylinder and cone: give the true "radius" and "height", e.g. {"type":"geometry_3d","solid":"cylinder","radius":3,"height":10,"labels":{"r":"3 in","h":"10 in"}} (cone may add "l" for the slant height).\n\n'+
'4. Bar chart:\n'+
'{"type":"bar_chart","title":"Weekly Sales","xlabel":"Day","ylabel":"Units","bars":[{"label":"Mon","val":42},{"label":"Tue","val":67}]}\n\n'+
'5. Scatter plot:\n'+
'{"type":"scatter","title":"Height vs Weight","xlabel":"Height (cm)","ylabel":"Weight (kg)","pts":[[160,55],[165,60],[170,65],[175,72],[180,78]],"trendline":true}\n\n'+
'6. Pie chart:\n'+
'{"type":"pie","title":"Budget","slices":[{"label":"Rent","val":40},{"label":"Food","val":25},{"label":"Travel","val":20},{"label":"Other","val":15}]}\n\n'+
'7. Number line:\n'+
'{"type":"number_line","min":-4,"max":4,"regions":[{"from":-2,"to":2,"closed_left":true,"closed_right":false}],"points":[{"x":2,"open":true}]}\n\n'+
'8. Circle geometry:\n'+
'{"type":"geometry_2d","shapes":[{"shape":"circle","cx":0,"cy":0,"r":3,"center_label":"O","radius_angle":40,"radius_label":"r = 3 cm","chord":[[−3,0],[3,0]]}]}\n\n'+
'Make at least 40% of questions include a figure. Vary difficulty (easy / medium / hard). Be creative with contexts: real-world applications, interesting setups.';
}

/* ── Render one AI question ─────────────────────────── */
function renderAIQuestion(q,idx,totalLetters){
  function _maths(s){
    if(!s)return'';
    var ALIGN_ENVS=['align','aligned','matrix','pmatrix','bmatrix','vmatrix','array','cases','eqnarray','split','gather','gathered','smallmatrix'];
    var o='',inM=false,aD=0,i=0,L=s.length;
    while(i<L){
      if(!inM&&s.slice(i,i+2)==='\\('){o+='\\(';i+=2;inM=true;aD=0;continue;}
      if(!inM&&s.slice(i,i+2)==='\\['){o+='\\[';i+=2;inM=true;aD=0;continue;}
      if(inM&&s.slice(i,i+2)==='\\)'){o+='\\)';i+=2;inM=false;aD=0;continue;}
      if(inM&&s.slice(i,i+2)==='\\]'){o+='\\]';i+=2;inM=false;aD=0;continue;}
      if(inM&&s.slice(i,i+6)==='\\begin'){var b1=s.indexOf('{',i+6),e1=s.indexOf('}',b1+1);if(b1!==-1&&e1!==-1&&ALIGN_ENVS.some(function(v){return s.slice(b1+1,e1).indexOf(v)!==-1;}))aD++;}
      if(inM&&s.slice(i,i+4)==='\\end'){var b2=s.indexOf('{',i+4),e2=s.indexOf('}',b2+1);if(b2!==-1&&e2!==-1&&ALIGN_ENVS.some(function(v){return s.slice(b2+1,e2).indexOf(v)!==-1;})&&aD>0)aD--;}
      if(!inM&&s[i]==='<'&&i+1<L&&(s[i+1]==='/'||/[a-zA-Z]/.test(s[i+1]))){var tj=s.indexOf('>',i);if(tj!==-1){o+=s.slice(i,tj+1);i=tj+1;continue;}}
      var c=s[i];
      if(c==='&'){
        var sm=s.indexOf(';',i+1);
        if(sm!==-1&&sm-i<=8&&/^&[a-zA-Z#0-9]+;/.test(s.slice(i,sm+1))){
          var ent=s.slice(i,sm+1);
          if(ent==='&amp;'){if(inM&&aD>0)o+='&';else if(inM)o+='\\&';else o+='&amp;';}
          else o+=ent;
          i=sm+1;continue;
        }
        if(inM&&aD>0)o+='&';else if(inM)o+='\\&';else o+='&amp;';
      }
      else if(c==='<')o+='&lt;';
      else if(c==='>')o+='&gt;';
      else o+=c;
      i++;
    }
    return o;
  }
  var letters=totalLetters||['A','B','C','D'];
  var html='<div class="aiq" data-idx="'+idx+'">';
  html+='<div class="aiq-head">';
  html+='<div class="aiq-num">'+(idx+1)+'</div>';
  if(q.domain) html+='<span class="aiq-domain">'+esc(q.domain)+'</span>';
  html+='<span class="aiq-type">'+(q.type==='frq'?'FRQ':'MCQ')+'</span>';
  if(window.ClipSATVerifyAI&&(('_verified' in q)||q._fromBank)) html+=window.ClipSATVerifyAI.badgeHTML(q);
  html+='</div>';
  html+='<div class="aiq-text">'+_maths(q.text)+'</div>';
  // Figure
  if(q.figure){
    var fig=renderMathFigure(q.figure);
    if(fig) html+='<div class="mfig">'+fig+'</div>';
    else if(q.figure.type==='table'&&q.figure.data){
      // HTML table fallback
      html+='<div class="mfig" style="padding:10px"><table class="exam-table"><thead><tr>'+
        (q.figure.headers||[]).map(function(h){return h?'<th>'+esc(h)+'</th>':'<th><span class="sr-only">Row label</span></th>';}).join('')+'</tr></thead><tbody>'+
        (q.figure.rows||[]).map(function(row){return '<tr>'+row.map(function(c){return '<td>'+esc(c)+'</td>';}).join('')+'</tr>';}).join('')+
        '</tbody></table></div>';
    }
  }
  // MCQ choices
  if(q.type!=='frq'&&q.choices&&q.choices.length){
    html+='<div class="aiq-choices">';
    q.choices.forEach(function(ch,ci){
      var letter=letters[ci]||String.fromCharCode(65+ci);
      var chStr=String(ch||'');
      /* auto-wrap bare LaTeX in \( \) so MathJax processes it */
      if(chStr.indexOf('\\(')===-1&&chStr.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(chStr)) chStr='\\('+chStr+'\\)';
      html+='<div class="aiq-choice" data-idx="'+ci+'" onclick="aiqSelect(this,'+idx+','+ci+')">';
      html+='<span class="aiq-cletter">'+letter+'</span>';
      html+='<span>'+_maths(chStr)+'</span>';
      html+='</div>';
    });
    html+='</div>';
  } else if(q.type==='frq'){
    html+='<div class="aiq-workspace" contenteditable="true" spellcheck="false">Write your work here…</div>';
    if(typeof q.numericAnswer==='number'&&isFinite(q.numericAnswer)){
      html+='<div class="aiq-frq-check">'
        + '<input type="text" inputmode="decimal" class="aiq-frq-input" placeholder="Your final answer" aria-label="Your final answer" onkeydown="if(event.key===\'Enter\'){event.preventDefault();aiqCheckFRQ(this,'+idx+');}">'
        + '<button class="aiq-frq-btn" onclick="aiqCheckFRQ(this,'+idx+')">Check answer</button>'
        + '<span class="aiq-frq-feedback"></span>'
        + '</div>';
    } else if(q.answerExpr){
      html+='<div class="aiq-frq-check">'
        + '<input type="text" inputmode="text" autocapitalize="off" autocorrect="off" spellcheck="false" class="aiq-frq-input" placeholder="Your final expression, e.g. 2x+2" aria-label="Your final expression" onkeydown="if(event.key===\'Enter\'){event.preventDefault();aiqCheckFRQSymbolic(this,'+idx+');}">'
        + '<button class="aiq-frq-btn" onclick="aiqCheckFRQSymbolic(this,'+idx+')">Check answer</button>'
        + '<span class="aiq-frq-feedback"></span>'
        + '</div>';
    }
  }
  // Solution
  if(q.sol){
    html+='<button class="aiq-sol-toggle" onclick="aiqToggleSol(this)">▸ Show solution</button>';
    html+='<div class="aiq-solution">'+_maths(q.sol)+'</div>';
  }
  html+='</div>';
  return html;
}

/* ── Interactive choice selection ───────────────────── */
window.aiqSelect=function(el,qIdx,cIdx){
  var aiq=el.closest('.aiq');
  aiq.querySelectorAll('.aiq-choice').forEach(function(c){
    c.classList.remove('selected','correct','wrong');
    c.querySelector('.aiq-cletter').style.background='';
    c.querySelector('.aiq-cletter').style.borderColor='';
    c.querySelector('.aiq-cletter').style.color='';
  });
  el.classList.add('selected');
  // If answer is known, show correct/wrong immediately
  var ans=parseInt(aiq.getAttribute('data-answer'));
  if(!isNaN(ans)){
    el.classList.add(cIdx===ans?'correct':'wrong');
    if(cIdx!==ans){
      var correctEl=aiq.querySelectorAll('.aiq-choice')[ans];
      if(correctEl) correctEl.classList.add('correct');
    }
    // Auto-open solution
    var sol=aiq.querySelector('.aiq-solution');
    var btn=aiq.querySelector('.aiq-sol-toggle');
    if(sol&&!sol.classList.contains('open')){
      sol.classList.add('open');
      if(btn) btn.textContent='▾ Hide solution';
      if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([sol]).catch(function(){});
    }
  }
};

/* ── Free-response numeric auto-grading (Pillar 3 MVP: "extend auto-grading
   to free-response numeric … answers"). Tolerance-based only — algebraic-
   expression answers go through aiqCheckFRQSymbolic below instead (see its
   own comment). Only fires when the AI supplied a numericAnswer for this
   question (most FRQs — proofs, multi-part derivations — correctly have
   neither, and keep working exactly as before: workspace + self-check
   against the shown solution). ── */
window.aiqCheckFRQ=function(el, qIdx){
  var aiq=el.closest('.aiq');
  var raw=aiq.getAttribute('data-numeric-answer');
  var target=parseFloat(raw);
  if(raw==null || isNaN(target)) return;
  var input=aiq.querySelector('.aiq-frq-input');
  var feedback=aiq.querySelector('.aiq-frq-feedback');
  var given=parseFloat((input&&input.value||'').trim());
  if(!input || input.value.trim()==='' || isNaN(given)){
    if(feedback){ feedback.textContent='Enter a number first'; feedback.className='aiq-frq-feedback'; }
    return;
  }
  var tolAttr=parseFloat(aiq.getAttribute('data-tolerance'));
  var tol=!isNaN(tolAttr) ? tolAttr : Math.max(0.01, Math.abs(target)*0.01); // ±1% (min 0.01) unless the question set its own
  var isRight=Math.abs(given-target)<=tol;
  if(input) input.classList.toggle('wrong', !isRight);
  if(input) input.classList.toggle('correct', isRight);
  if(feedback){
    feedback.textContent=isRight ? '✓ Correct' : ('✗ Not quite — target: '+target);
    feedback.className='aiq-frq-feedback '+(isRight?'correct':'wrong');
  }
  // Auto-open solution either way, same UX as MCQ answers
  var sol=aiq.querySelector('.aiq-solution');
  var solBtn=aiq.querySelector('.aiq-sol-toggle');
  if(sol&&!sol.classList.contains('open')){
    sol.classList.add('open');
    if(solBtn) solBtn.textContent='▾ Hide solution';
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([sol]).catch(function(){});
  }
};

/* ── Symbolic-equivalence FRQ auto-grading — the CAS-backed follow-up the
   numeric grader above deliberately deferred (see its comment and the
   v3.3.70 changelog entry: "symbolic-equivalence grading … needs a real
   computer-algebra library"). Rather than hand-rolling an expression parser
   — the one thing that entry explicitly warned against — this parses and
   evaluates through math.js, a vetted, widely-used expression/CAS library,
   loaded lazily from CDN only on the first "Check answer" click on a
   symbolic-answer FRQ (never on page load), matching this file's existing
   lazy-CDN pattern for Three.js (see ClipSAT3D above).

   Equivalence is tested NUMERICALLY, not via symbolic simplification: both
   expressions are compiled once, then evaluated at several random points
   for their shared variable(s) and the outputs compared within tolerance.
   This is the standard technique real auto-graders (WeBWorK, Numbas, etc.)
   use for exactly this problem — it correctly accepts ANY algebraically
   equivalent form (factored, expanded, trig-identity-rewritten…) without
   needing a full symbolic-simplification engine, and it's far more robust
   than comparing parsed ASTs or normalized strings. A sample point that
   lands on a domain restriction (division by zero, sqrt of a negative, a
   non-real result) is discarded and re-sampled — that's a sampling
   artifact, not evidence the expressions differ. If too few valid points
   can be sampled to reach a confident verdict, this reports "unverifiable"
   rather than silently guessing — matching the roadmap's explicit call for
   visible confidence framing rather than overclaiming reliability. ── */
window.ClipSATSymbolicCheck=(function(){
  var mathjsPromise=null;
  function loadMathjs(){
    if(!mathjsPromise) mathjsPromise=import('https://cdn.jsdelivr.net/npm/mathjs@13/+esm');
    return mathjsPromise;
  }
  /* Defense in depth on top of math.js's own sandboxed expression language
     (no DOM/network/JS-global access): reject anything outside the shape a
     "final answer" should ever take before it's even parsed. */
  var SAFE_RE=/^[\s0-9a-zA-Z+\-*/^().,!%]*$/;
  function isSafe(expr){
    return typeof expr==='string' && expr.length>0 && expr.length<=200 && SAFE_RE.test(expr);
  }
  var FN_NAMES=['sin','cos','tan','asin','acos','atan','sinh','cosh','tanh','sqrt','ln','log','exp','abs','cbrt'];
  /* Normalizes implicit multiplication ("2x", "2(x+1)", "(x-1)(x+1)") into
     explicit "*" before handing the string to math.js, so grading doesn't
     depend on exactly which implicit-multiplication cases any given
     math.js version happens to support. Leaves known function calls
     ("sin(x)") alone. */
  function normalizeImplicitMult(expr){
    expr=expr.replace(/(\d)(\s*)([a-zA-Z(])/g,function(m,d,sp,next){ return d+'*'+sp+next; });
    expr=expr.replace(/(\))(\s*)([a-zA-Z0-9(])/g,function(m,close,sp,next){ return close+'*'+sp+next; });
    expr=expr.replace(/([a-zA-Z][a-zA-Z0-9]*)(\s*)\(/g,function(m,ident,sp){
      return FN_NAMES.indexOf(ident.toLowerCase())!==-1 ? m : ident+'*'+sp+'(';
    });
    return expr;
  }
  function randPoint(vars){
    var scope={};
    vars.forEach(function(v){
      // [0.3,6) magnitude plus irrational-ish jitter, random sign — avoids
      // 0/±1 and clean integers, the values most likely to sit exactly on
      // a removable singularity or a coincidental false match.
      var mag=0.3+Math.random()*5.7, jitter=0.11+Math.random()*0.37;
      scope[v]=(Math.random()<0.5?-1:1)*(mag+jitter);
    });
    return scope;
  }
  function realNumberOrNull(math,v){
    try{
      if(v&&typeof v==='object'&&typeof v.im==='number'){
        if(Math.abs(v.im)>1e-9) return null; // meaningfully complex → domain miss
        v=v.re;
      }
      var n=(math.number?math.number(v):Number(v));
      return (typeof n==='number'&&isFinite(n))?n:null;
    }catch(e){ return null; }
  }
  /* Returns Promise<'equivalent'|'different'|'unverifiable'> */
  function check(targetExpr,givenExpr,vars){
    vars=(vars&&vars.length)?vars:['x'];
    if(!isSafe(targetExpr)||!isSafe(givenExpr)) return Promise.resolve('unverifiable');
    return loadMathjs().then(function(mod){
      var math=mod.default||mod;
      var targetNode,givenNode;
      try{
        targetNode=math.compile(normalizeImplicitMult(targetExpr));
        givenNode=math.compile(normalizeImplicitMult(givenExpr));
      }catch(e){ return 'unverifiable'; }
      var MAX_ATTEMPTS=25, NEEDED=6, matched=0, valid=0;
      for(var i=0;i<MAX_ATTEMPTS&&valid<NEEDED;i++){
        var scope=randPoint(vars), a=null, b=null;
        try{ a=realNumberOrNull(math,targetNode.evaluate(scope)); }catch(e){}
        try{ b=realNumberOrNull(math,givenNode.evaluate(scope)); }catch(e){}
        if(a===null||b===null) continue; // domain miss on either side — resample
        valid++;
        var tol=1e-6+Math.abs(a)*1e-6;
        if(Math.abs(a-b)<=tol) matched++;
      }
      if(valid<NEEDED) return 'unverifiable';
      return (matched===valid) ? 'equivalent' : 'different';
    }).catch(function(){ return 'unverifiable'; });
  }
  return {check:check};
})();

window.aiqCheckFRQSymbolic=function(el, qIdx){
  var aiq=el.closest('.aiq');
  var targetExpr=aiq.getAttribute('data-answer-expr');
  if(!targetExpr) return;
  var varsAttr=aiq.getAttribute('data-answer-vars');
  var vars=varsAttr?varsAttr.split(',').map(function(s){return s.trim();}).filter(Boolean):['x'];
  var input=aiq.querySelector('.aiq-frq-input');
  var feedback=aiq.querySelector('.aiq-frq-feedback');
  var given=(input&&input.value||'').trim();
  if(!input||!given){
    if(feedback){ feedback.textContent='Enter an expression first'; feedback.className='aiq-frq-feedback'; }
    return;
  }
  if(input) input.classList.remove('correct','wrong');
  if(feedback){ feedback.textContent='Checking…'; feedback.className='aiq-frq-feedback'; }
  window.ClipSATSymbolicCheck.check(targetExpr,given,vars).then(function(verdict){
    var isRight=verdict==='equivalent', isUnverifiable=verdict==='unverifiable';
    if(input){ input.classList.toggle('correct',isRight); input.classList.toggle('wrong',verdict==='different'); }
    if(feedback){
      feedback.textContent = isRight ? '✓ Correct'
        : isUnverifiable ? '⚠ Could not auto-verify — check against the solution below'
        : '✗ Not quite — check the solution below';
      feedback.className='aiq-frq-feedback '+(isRight?'correct':(isUnverifiable?'':'wrong'));
    }
    var sol=aiq.querySelector('.aiq-solution');
    var solBtn=aiq.querySelector('.aiq-sol-toggle');
    if(sol&&!sol.classList.contains('open')){
      sol.classList.add('open');
      if(solBtn) solBtn.textContent='▾ Hide solution';
      if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([sol]).catch(function(){});
    }
  });
};

window.aiqToggleSol=function(btn){
  var sol=btn.nextElementSibling;
  var open=sol.classList.toggle('open');
  btn.textContent=open?'▾ Hide solution':'▸ Show solution';
  if(open&&window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([sol]).catch(function(){});
};

/* ── AI test (the question-bank path stays in 05) ────────────────────────────── */
function aiGenTest(btn){
  var box=btn.closest('.testgen'); if(!box) return;
  // AI path
  var view=btn.closest('main[id^="view-"]'); if(!view) return;
  var viewId=view.id.replace('view-','');
  var n=parseInt(box.querySelector('.tg-count').value,10)||10;
  var lvl=box.querySelector('.tg-level').value||'all';
  var out=box.querySelector('.tg-out');
  out.innerHTML='<div class="ai-gen-loading"><div class="ai-spinner"></div><p>AI is generating '+n+' fresh questions for <strong>'+viewId.toUpperCase()+'</strong>…</p><p style="font-size:.82rem;opacity:.7">This may take 10–30 seconds</p></div>';
  /* The blueprint decides topics and difficulty slot by slot; the AI only fills slots (05d). */
  var _bp=null, _assembly=null, _verifyRes=null;
  window._ensureAIExam().then(function(){
  _bp=examBlueprint(viewId);
  var _slots=window.ClipSATAssembler.plan(_bp,[{q:n,type:'mcq'}],lvl);
  return window.ClipSATAssembler.fill({viewId:viewId,blueprint:_bp,slots:_slots,system:examSystemPrompt(viewId),syllabus:examSyllabus(viewId),
    options:examLetters(viewId).length,generate:callAI,review:callAISolver,progress:assemblerProgress(out,'Building a '+n+'-question '+viewId.toUpperCase()+' test')
  });
  }).then(function(res){
    _assembly=res; _verifyRes={total:res.slots.length};
    return JSON.stringify({questions:res.slots.filter(function(s){return s.q;}).map(function(s){return s.q;})});
  }).then(function(raw){
    var data;
    try{
      // Handle both {questions:[...]} and [...] responses
      var parsed=JSON.parse(raw);
      data=Array.isArray(parsed)?parsed:(parsed.questions||[]);
    }catch(e){
      // Try to extract JSON array from the text
      var m=raw.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if(m){try{data=JSON.parse(m[0]);}catch(e2){data=[];}}
      else{data=[];}
    }
    if(!data.length){
      out.innerHTML='<p class="tg-empty" style="color:#dc2626">'+(_verifyRes&&_verifyRes.total?'None of the AI-generated questions passed review, so none are shown. Please try again, or choose Question bank.':'AI returned no questions. Please try again.')+'</p>';
      return;
    }
    // Get letter set from fullExamBank if available
    var letters=examLetters(viewId);
    var lvlLabel=(lvl==='all'?'all levels':lvl);
    out.innerHTML='<div class="tg-head"><span class="tg-title">AI-Generated Test</span><span class="tg-ai-badge">✦ AI</span><span class="tg-meta">'+data.length+' question'+(data.length===1?'':'s')+' · '+lvlLabel+'</span></div>'+
      (_assembly?window.ClipSATAssembler.complianceHTML(_bp,_assembly):'');
    var _csCaptureQ=[];
    data.forEach(function(q,i){
      q.text=q.text||'';q.sol=q.sol||'';
      q=window._shuffleQ?window._shuffleQ(q):q; /* randomize correct-answer position */
      var div=document.createElement('div');
      div.innerHTML=renderAIQuestion(q,i,letters);
      var aiqEl=div.firstElementChild;
      if(q.answer!=null) aiqEl.setAttribute('data-answer',q.answer);
      if(typeof q.numericAnswer==='number'&&isFinite(q.numericAnswer)){
        aiqEl.setAttribute('data-numeric-answer',q.numericAnswer);
        if(typeof q.tolerance==='number'&&isFinite(q.tolerance)) aiqEl.setAttribute('data-tolerance',q.tolerance);
      } else if(typeof q.answerExpr==='string'&&q.answerExpr.trim()){
        aiqEl.setAttribute('data-answer-expr',q.answerExpr.trim());
        if(Array.isArray(q.answerVars)&&q.answerVars.length) aiqEl.setAttribute('data-answer-vars',q.answerVars.join(','));
      }
      out.appendChild(aiqEl);
      /* Google Forms/Classroom capture — see public/js/quiz-capture-ui.js.
         FRQ questions (no .choices) carry no gradable answer here either. */
      _csCaptureQ.push({text:q.text,choices:(q.type!=='frq'&&q.choices)?q.choices.slice():[],correctIndex:q.type!=='frq'?q.answer:null,type:q.type==='frq'?'frq':'mcq',points:1});
    });
    // Sync show/hide answers button
    var ans=box.querySelector('.tg-ans');
    if(ans){ans.setAttribute('data-state','hidden');ans.textContent='Show all answers';}
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){});
    out.scrollIntoView({behavior:'smooth',block:'nearest'});
    document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genTest-ai',title:'AI-Generated Test',trackId:viewId,questions:_csCaptureQ,outEl:out}}));
  }).catch(function(err){
    out.innerHTML='<p class="tg-empty" style="color:#dc2626">Error: '+esc(err.message)+'<br><button class="btn ghost" onclick="openAISettings()" style="margin-top:10px">⚙ Configure AI</button></p>';
  });
};

/* Same LaTeX-aware HTML-escaper as renderAIQuestion's local _maths (used by
   genTest's AI path) — copied rather than shared, matching this file's
   existing per-function-copy convention for this helper (see the other
   copies around line 3734 and 8337). Needed here specifically: this
   function builds its question HTML inline instead of delegating to
   renderAIQuestion, and calling a bare _maths() below without this local
   definition throws "_maths is not defined" — a real bug that went
   uncaught because every previous attempt to reach this code with a real
   AI response failed earlier in the pipeline (maxTokens sizing, then
   provider/billing issues) before ever exercising this render path. */
function _maths(s){
  if(!s)return'';
  var ALIGN_ENVS=['align','aligned','matrix','pmatrix','bmatrix','vmatrix','array','cases','eqnarray','split','gather','gathered','smallmatrix'];
  var o='',inM=false,aD=0,i=0,L=s.length;
  while(i<L){
    if(!inM&&s.slice(i,i+2)==='\\('){o+='\\(';i+=2;inM=true;aD=0;continue;}
    if(!inM&&s.slice(i,i+2)==='\\['){o+='\\[';i+=2;inM=true;aD=0;continue;}
    if(inM&&s.slice(i,i+2)==='\\)'){o+='\\)';i+=2;inM=false;aD=0;continue;}
    if(inM&&s.slice(i,i+2)==='\\]'){o+='\\]';i+=2;inM=false;aD=0;continue;}
    if(inM&&s.slice(i,i+6)==='\\begin'){var b1=s.indexOf('{',i+6),e1=s.indexOf('}',b1+1);if(b1!==-1&&e1!==-1&&ALIGN_ENVS.some(function(v){return s.slice(b1+1,e1).indexOf(v)!==-1;}))aD++;}
    if(inM&&s.slice(i,i+4)==='\\end'){var b2=s.indexOf('{',i+4),e2=s.indexOf('}',b2+1);if(b2!==-1&&e2!==-1&&ALIGN_ENVS.some(function(v){return s.slice(b2+1,e2).indexOf(v)!==-1;})&&aD>0)aD--;}
    if(!inM&&s[i]==='<'&&i+1<L&&(s[i+1]==='/'||/[a-zA-Z]/.test(s[i+1]))){var tj=s.indexOf('>',i);if(tj!==-1){o+=s.slice(i,tj+1);i=tj+1;continue;}}
    var c=s[i];
    if(c==='&'){
      var sm=s.indexOf(';',i+1);
      if(sm!==-1&&sm-i<=8&&/^&[a-zA-Z#0-9]+;/.test(s.slice(i,sm+1))){
        var ent=s.slice(i,sm+1);
        if(ent==='&amp;'){if(inM&&aD>0)o+='&';else if(inM)o+='\\&';else o+='&amp;';}
        else o+=ent;
        i=sm+1;continue;
      }
      if(inM&&aD>0)o+='&';else if(inM)o+='\\&';else o+='&amp;';
    }
    else if(c==='<')o+='&lt;';
    else if(c==='>')o+='&gt;';
    else o+=c;
    i++;
  }
  return o;
}
function aiGenFullExam(btn,examName,viewId,sectionTitles,qPerSection){
  var out=btn.closest('.testgen').querySelector('.tg-out');
  var bank=window.fullExamBank&&window.fullExamBank[viewId];
  var spec=window.examSpecs&&window.examSpecs[viewId];
  var letters=examLetters(viewId);
  /* Build section list from spec if available, otherwise from legacy args */
  var sections;
  var totalQ;
  if(spec){
    sections=[];
    spec.sections.forEach(function(sec){
      sec.parts.forEach(function(p){
        sections.push({title:sec.parts.length>1&&p.label?(sec.title+' — '+p.label):sec.title,
          time:p.time,notes:p.note||sec.note||'',q:p.q,type:p.type,calc:p.calc});
      });
    });
    totalQ=0; sections.forEach(function(s){totalQ+=s.q;});
  } else {
    sections=(bank&&bank.sections?bank.sections:sectionTitles.map(function(t){return{title:t};})).map(function(sc){
      return {title:sc.title||String(sc),time:sc.time||'',notes:sc.notes||'',q:sc.q||qPerSection||10,type:sc.type||'mcq',calc:sc.calc};
    });
    totalQ=Math.min(qPerSection*(sections.length),50);
  }

  out.innerHTML='<div class="ai-gen-loading"><div class="ai-spinner"></div><p>AI is generating a complete <strong>'+esc(examName)+'</strong> paper…</p><p style="font-size:.82rem;opacity:.7">Generating ~'+totalQ+' questions with figures — please wait 30–60 s</p></div>';

  /* The blueprint decides every slot (part, topic, difficulty, type, calculator);
     the AI only fills slots, and each question is reviewed against its slot (05d). */
  var _bp=null, _assembly=null, _verifyRes=null;
  window._ensureAIExam().then(function(){
  _bp=examBlueprint(viewId);
  var _slots=window.ClipSATAssembler.plan(_bp,sections,'all');
  return window.ClipSATAssembler.fill({viewId:viewId,blueprint:_bp,slots:_slots,system:examSystemPrompt(viewId),syllabus:examSyllabus(viewId),
    options:examLetters(viewId).length,generate:callAI,review:callAISolver,progress:assemblerProgress(out,'Building the '+esc(examName)+' paper ('+_slots.length+' questions)')
  });
  }).then(function(res){
    _assembly=res; _verifyRes={total:res.slots.length};
    var list=[];
    res.slots.forEach(function(sl){ if(sl.q){ sl.q._part=sl.part; list.push(sl.q); } });
    return list;
  }).then(function(qs){
    if(!qs.length){
      out.innerHTML='<p style="color:#dc2626">'+(_verifyRes&&_verifyRes.total?'None of the AI-generated questions passed review, so no paper is shown. Please try again, or choose Question bank.':'AI returned no questions. Please try again.')+'</p>';return;
    }
    /* AI-authored MCQs conventionally list the correct choice first —
       randomize each question's choice order/answer index before rendering. */
    qs=qs.map(function(q){return window._shuffleQ?window._shuffleQ(q):q;});
    /* Google Forms/Classroom capture — see public/js/quiz-capture-ui.js. */
    var _csCaptureQ=qs.map(function(q){return {text:q.text||'',choices:(q.type!=='frq'&&q.choices)?q.choices.slice():[],correctIndex:q.type!=='frq'?q.answer:null,type:q.type==='frq'?'frq':'mcq',points:1};});
    // Each question carries its section (q._part) from the blueprint plan.
    var html='<div class="full-exam-paper">';
    // Cover
    html+='<div class="fep-header">';
    html+='<div class="fep-top-bar"><span>✦ AI-Generated · ClipSAT</span><span style="background:linear-gradient(135deg,#3b4fc8,#7c3aed);color:#fff;padding:2px 10px;border-radius:12px;font-size:.75rem">AI EXAM</span></div>';
    html+='<div class="fep-title">'+esc(examName)+'</div>';
    html+='<div class="fep-meta-grid">';
    sections.forEach(function(sec){html+='<div><strong>'+esc(sec.title)+'</strong>'+(sec.time?' · '+esc(sec.time):'')+'</div>';});
    html+='</div>';
    html+='<div class="fep-instr-box">This exam was generated by ClipSAT AI. Answer all questions. Show all working for free-response questions. Circle or bubble your answers for multiple-choice. Good luck!</div>';
    html+='</div>';
    if(_assembly) html+=window.ClipSATAssembler.complianceHTML(_bp,_assembly);

    // Bubble sheet for MCQ
    var mcqs=qs.filter(function(q){return q.type!=='frq';});
    if(mcqs.length){
      html+='<div class="fep-anssheet"><div style="font-weight:700;font-size:.9rem;margin-bottom:10px;color:#1e3a6e">Answer Sheet — Multiple Choice</div><div class="fep-bubbles" style="--fep-nopt:'+letters.length+'">';
      var mcqIdx=0;
      qs.forEach(function(q,qi){
        if(q.type==='frq') return;
        mcqIdx++;
        html+='<div class="fep-bubble-row"><span class="fep-bnum">'+mcqIdx+'</span>';
        letters.forEach(function(l){html+='<div class="fep-bubble">'+l+'</div>';});
        html+='</div>';
      });
      html+='</div></div>';
    }

    // Sections
    var qi=0;
    sections.forEach(function(sec,si){
      var secQs=qs.filter(function(q){ return q._part===si; });
      if(!secQs.length) return;
      html+='<div class="fep-section">';
      html+='<div class="fep-section-head"><span>'+esc(sec.title)+'</span>'+(sec.time?'<span style="font-size:.85rem;color:#566173">'+esc(sec.time)+'</span>':'')+'</div>';
      if(sec.notes) html+='<p style="font-size:.85rem;color:#566173;margin:0 0 16px;font-style:italic">'+esc(sec.notes)+'</p>';
      secQs.forEach(function(q,qsi){
        qi++;
        /* Same numeric/symbolic answer-check attributes genTest's AI path
           (renderAIQuestion, above) sets via setAttribute() on a detached
           element — this function builds one big HTML string instead, so
           they're inlined into the opening tag directly. aiqCheckFRQ /
           aiqCheckFRQSymbolic read these by attribute name regardless of
           which path rendered the question. */
        var itemAttrs=' data-idx="'+qi+'"';
        if(q.answer!=null) itemAttrs+=' data-answer="'+q.answer+'"';
        if(typeof q.numericAnswer==='number'&&isFinite(q.numericAnswer)){
          itemAttrs+=' data-numeric-answer="'+q.numericAnswer+'"';
          if(typeof q.tolerance==='number'&&isFinite(q.tolerance)) itemAttrs+=' data-tolerance="'+q.tolerance+'"';
        } else if(typeof q.answerExpr==='string'&&q.answerExpr.trim()){
          itemAttrs+=' data-answer-expr="'+esc(q.answerExpr.trim())+'"';
          if(Array.isArray(q.answerVars)&&q.answerVars.length) itemAttrs+=' data-answer-vars="'+esc(q.answerVars.join(','))+'"';
        }
        html+='<div class="fep-item aiq"'+itemAttrs+'>';
        html+='<div class="fep-item-head"><span class="fep-inum">'+qi+'</span><span class="fep-domain-tag">'+esc(q.domain||'')+'</span>'+((('_verified' in q)||q._fromBank)?window.ClipSATVerifyAI.badgeHTML(q):'')+'</div>';
        if(q.figure){var fig=renderMathFigure(q.figure);if(fig) html+='<div class="mfig fep-figure">'+fig+'</div>';}
        html+='<div class="fep-qbody aiq-text">'+_maths(String(q.text||''))+'</div>';
        if(q.type!=='frq'&&q.choices){
          html+='<div class="fep-choices aiq-choices">';
          q.choices.forEach(function(ch,ci){
            var letter=letters[ci]||String.fromCharCode(65+ci);
            var s=String(ch||'');
            if(s.indexOf('\\(')===-1&&s.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(s)){s='\\('+s+'\\)';}
            html+='<div class="fep-choice aiq-choice" data-idx="'+ci+'" onclick="aiqSelect(this,'+qi+','+ci+')">';
            html+='<span class="fep-cletter aiq-cletter">'+letter+'</span>';
            html+='<span class="fep-ctext">'+_maths(s)+'</span></div>';
          });
          html+='</div>';
        } else {
          html+='<div class="fep-work-space aiq-workspace" contenteditable="true" spellcheck="false">';
          for(var li=0;li<6;li++) html+='<div class="fep-ws-line"></div>';
          html+='</div>';
          /* Mirrors renderAIQuestion's FRQ branch exactly (same classes/
             onclick targets) so the existing aiqCheckFRQ/aiqCheckFRQSymbolic
             handlers and .aiq-frq-* CSS work here with no changes. */
          if(typeof q.numericAnswer==='number'&&isFinite(q.numericAnswer)){
            html+='<div class="aiq-frq-check">'
              + '<input type="text" inputmode="decimal" class="aiq-frq-input" placeholder="Your final answer" aria-label="Your final answer" onkeydown="if(event.key===\'Enter\'){event.preventDefault();aiqCheckFRQ(this,'+qi+');}">'
              + '<button class="aiq-frq-btn" onclick="aiqCheckFRQ(this,'+qi+')">Check answer</button>'
              + '<span class="aiq-frq-feedback"></span>'
              + '</div>';
          } else if(q.answerExpr){
            html+='<div class="aiq-frq-check">'
              + '<input type="text" inputmode="text" autocapitalize="off" autocorrect="off" spellcheck="false" class="aiq-frq-input" placeholder="Your final expression, e.g. 2x+2" aria-label="Your final expression" onkeydown="if(event.key===\'Enter\'){event.preventDefault();aiqCheckFRQSymbolic(this,'+qi+');}">'
              + '<button class="aiq-frq-btn" onclick="aiqCheckFRQSymbolic(this,'+qi+')">Check answer</button>'
              + '<span class="aiq-frq-feedback"></span>'
              + '</div>';
          }
        }
        html+='</div>';
      });
      html+='</div>';
    });

    // Answer key
    html+='<div class="fep-key-section"><div style="font-weight:700;font-size:1rem;color:#1e3a6e;padding:14px 18px;border-bottom:1px solid var(--line);cursor:pointer;display:flex;justify-content:space-between;align-items:center" onclick="this.nextElementSibling.classList.toggle(\'open\')">Answer Key &amp; Solutions <span>▸</span></div>';
    html+='<div style="display:none" class="fep-key-grid open">';
    qs.forEach(function(q,qi2){
      if(q.sol){
        html+='<div class="fep-sol-block"><strong>Q'+(qi2+1)+(q.type!=='frq'&&q.answer!=null?' ['+letters[q.answer||0]+']':'')+' — '+esc(q.domain||'')+'</strong><div>'+q.sol+'</div></div>';
      }
    });
    html+='</div></div>';
    html+='</div>';

    out.innerHTML=html;
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){});
    out.scrollIntoView({behavior:'smooth',block:'start'});
    document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genFullExam-ai',title:examName,trackId:viewId,questions:_csCaptureQ,outEl:out}}));
  }).catch(function(err){
    out.innerHTML='<p style="color:#dc2626">Error: '+esc(err.message)+'<br><button class="btn ghost" onclick="openAISettings()" style="margin-top:10px">⚙ Configure AI</button></p>';
  });
};


window.CSAITest={genTest:aiGenTest, genFullExam:aiGenFullExam};
})();
