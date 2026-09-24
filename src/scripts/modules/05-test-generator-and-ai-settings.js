(function(){
'use strict';

/* ── helpers ───────────────────────────────────────────────────── */
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── AI Settings ────────────────────────────────────────────────────
   Both this exam generator and the Ask Mr. Mohamed chat tutor call
   window._openrouterChatMessages() (defined earlier in this file). By
   default that routes through a signed-in-only Supabase proxy (see the
   "SHARED AI PROVIDER" block above); the only thing a visitor can
   configure here is an optional personal Groq key, which skips signing
   in entirely and calls Groq directly with their own key instead. */
window.openAISettings=function(){
  document.getElementById('aiKey').value=localStorage.getItem('clip_or_key')||'';
  document.getElementById('aiStatus').className='ai-status';
  document.getElementById('aiModal').classList.add('show');
};
window.closeAISettings=function(){ document.getElementById('aiModal').classList.remove('show'); };
window.saveAISettings=function(){
  var k=document.getElementById('aiKey').value.trim();
  if(k){
    localStorage.setItem('clip_or_key',k);
    showAIStatus('Saved! Using your own Groq key.','ok');
  } else {
    localStorage.removeItem('clip_or_key');
    showAIStatus('Cleared — back to the shared AI (requires sign-in).','ok');
  }
  setTimeout(window.closeAISettings,1200);
};
function showAIStatus(msg,cls){
  var el=document.getElementById('aiStatus');
  el.textContent=msg; el.className='ai-status '+cls;
}
window.aiEnabled=function(){ return window._openrouterEnabled?window._openrouterEnabled():false; };

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
/* AI generates the test when AI is available, unless the visitor picks
   "Question bank" in the .tg-source select (test-generator.njk). Every AI
   question is reviewed (05b-ai-question-verifier.js) before it is shown. */
function aiSourceChosen(btn){
  var box=btn&&btn.closest('.testgen');
  var sel=box&&box.querySelector('.tg-source');
  if(sel&&sel.value==='bank') return false;
  return window.aiEnabled();
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
    ibsl:{name:'IB Math SL (AA/AI)',letters:'A B C D E',desc:'IB Mathematics Standard Level for both Analysis & Approaches and Applications & Interpretation. Covers algebra, functions, trigonometry, statistics, and calculus at SL level.'},
    ibhl:{name:'IB Math HL (AA/AI)',letters:'A B C D E',desc:'IB Mathematics Higher Level for both Analysis & Approaches and Applications & Interpretation. Covers all SL topics plus complex numbers, proof, 3D vectors, advanced calculus, and (AI HL) matrices and graph theory.'},
    precalc:{name:'Pre-Calculus',letters:'A B C D',desc:'High school pre-calculus: trigonometry, unit circle, conic sections, vectors, polar coordinates, exponential/logarithmic functions, rational functions, sequences and series.'},
    appc:{name:'AP Precalculus',letters:'A B C D',desc:'College Board AP Precalculus: polynomial/rational functions, rates of change, exponential/logarithmic functions, sinusoidal functions, polar functions, parametric equations, vectors, matrices.'},
    apstats:{name:'AP Statistics',letters:'A B C D E',desc:'College Board AP Statistics: exploring data (distributions, regression), sampling and experimentation, probability, random variables, sampling distributions, confidence intervals, hypothesis tests, chi-square tests, linear regression inference.'},
    calculus:{name:'AP Calculus AB/BC',letters:'A B C D E',desc:'US College Board exam. Cover: limits, derivatives, integrals, FTC, series (BC).'},
    algebra:{name:'Algebra',letters:'A B C D',desc:'High school algebra: linear equations, quadratics, systems, polynomials, inequalities.'},
    alg2:{name:'Algebra 2',letters:'A B C D',desc:'Algebra 2: complex numbers, polynomials, rational functions, conic sections, logarithms, sequences.'},
    apab:{name:'AP Calculus AB',letters:'A B C D E',desc:'College Board AP Calculus AB: limits, derivatives, integrals, FTC, differential equations, areas, volumes.'},
    apbc:{name:'AP Calculus BC',letters:'A B C D E',desc:'College Board AP Calculus BC: all AB topics plus sequences/series, Taylor, parametric, polar, integration techniques.'},
    igcse:{name:'Cambridge IGCSE Mathematics 0580 Extended',letters:'A B C D',desc:'Cambridge IGCSE 0580 Extended, 2025–2030 syllabus: number, algebra and graphs, coordinate geometry, geometry, mensuration, trigonometry, transformations and vectors, probability, statistics. Paper 2 non-calculator and Paper 4 calculator, 100 marks each, structured and unstructured questions with marks shown. Matrices and linear programming are NOT in this syllabus.'},
    geo:{name:'Geometry',letters:'A B C D',desc:'Euclidean geometry: triangles, circles, quadrilaterals, 3D solids, coordinate geometry, proofs.'},
    qudrat:{name:'GAT Qudrat Quantitative',letters:'A B C D',desc:'Saudi GAT Qudrat: quantitative reasoning, standard MCQ and quantitative comparison (A>B/B>A/Equal/Cannot determine). Bilingual Arabic/English.'},
    tahsili:{name:'SAAT Tahsili Mathematics',letters:'A B C D',desc:'Saudi SAAT Tahsili: Saudi secondary curriculum MCQ. Include Arabic question then English translation.'},
    sat:{name:'Digital SAT Mathematics',letters:'A B C D',desc:'College Board Digital SAT 2025: algebra, advanced math, problem solving, data analysis. MCQ (4 choices) plus some SPR (student-produced response, treated as FRQ).'},
    act:{name:'ACT Mathematics',letters:'A B C D E',desc:'ACT Math: pre-algebra through trigonometry. 5 choices per MCQ.'},
    est:{name:'EST I Mathematics',letters:'A B C D',desc:'Electronic Scholastic Test (EST) math section: algebra, geometry, data analysis, advanced math.'},
    est2:{name:'EST 2 Math Level 1',letters:'A B C D',desc:'EST II Math Level 1: algebra, geometry, trigonometry, and statistics.'},
    act2:{name:'ACT 2 Math Level 1',letters:'A B C D E',desc:'ACT International Subject Test Math 1: equations, data analysis, area/volume, and geometric proof.'},
    aslevel:{name:'Cambridge AS Level Mathematics 9709',letters:'A B C D',desc:'Cambridge AS Level 9709 Paper 1 Pure Math: quadratics, coordinate geometry, binomial, trigonometry, differentiation, integration, vectors.'},
    a2level:{name:'Cambridge A Level Mathematics 9709 P3',letters:'A B C D',desc:'Cambridge A Level 9709 Paper 3: complex numbers, partial fractions, series, differential equations, vectors, numerical methods.'}
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
'Solids: rectangular_prism, cube, cylinder, cone, triangular_prism, square_pyramid, sphere\n\n'+
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

/* ── SVG Figure Renderer ────────────────────────────────────────── */
function evalFn(expr,x){
  try{
    var e=expr.replace(/\*\*/g,'___POW___');
    e=e.replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(')
      .replace(/sqrt\(/g,'Math.sqrt(').replace(/abs\(/g,'Math.abs(').replace(/ln\(/g,'Math.log(')
      .replace(/log10\(/g,'Math.log10(').replace(/log\(/g,'Math.log10(').replace(/exp\(/g,'Math.exp(')
      .replace(/pi/g,'Math.PI').replace(/e(?![0-9a-zA-Z_])/g,'Math.E')
      .replace(/___POW___/g,'**');
    /* eslint-disable no-new-func */
    return (new Function('x','return ('+e+')'))(x);
  }catch(err){return NaN;}
}

function renderMathFigure(spec){
  if(!spec||!spec.type) return '';
  switch(spec.type){
    case 'function_graph': return renderFnGraph(spec);
    case 'geometry_2d':    return renderGeom2D(spec);
    case 'geometry_3d':    return renderGeom3D(spec);
    case 'bar_chart':      return renderBarChart(spec);
    case 'scatter':        return renderScatter(spec);
    case 'pie':            return renderPie(spec);
    case 'number_line':    return renderNumberLine(spec);
    default: return '';
  }
}
window.renderMathFigure = renderMathFigure; // expose to _renderFig, which lives in a separate scope

/* ── Function Graph ─────────────────────────────────── */
function renderFnGraph(s){
  var W=320,H=230,ml=42,mr=20,mt=18,mb=32;
  var pw=W-ml-mr,ph=H-mt-mb;
  var xmin=s.xmin!=null?s.xmin:-5, xmax=s.xmax!=null?s.xmax:5;
  var ymin=s.ymin!=null?s.ymin:-4, ymax=s.ymax!=null?s.ymax:6;
  function sx(mx){return ml+(mx-xmin)/(xmax-xmin)*pw;}
  function sy(my){return mt+ph-(my-ymin)/(ymax-ymin)*ph;}
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Grid
  var xi,yi;
  for(xi=Math.ceil(xmin);xi<=Math.floor(xmax);xi++){
    svg+='<line x1="'+sx(xi).toFixed(1)+'" y1="'+mt+'" x2="'+sx(xi).toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
  }
  for(yi=Math.ceil(ymin);yi<=Math.floor(ymax);yi++){
    svg+='<line x1="'+ml+'" y1="'+sy(yi).toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+sy(yi).toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
  }
  // Axes
  var ax0=Math.max(ml,Math.min(ml+pw,sx(0)));
  var ay0=Math.max(mt,Math.min(mt+ph,sy(0)));
  svg+='<line x1="'+ml+'" y1="'+ay0.toFixed(1)+'" x2="'+(ml+pw+8)+'" y2="'+ay0.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  svg+='<polygon points="'+(ml+pw+8)+','+ay0+' '+(ml+pw+2)+','+(ay0-3)+' '+(ml+pw+2)+','+(ay0+3)+'" fill="'+FIG_INK+'"/>';
  svg+='<line x1="'+ax0.toFixed(1)+'" y1="'+(mt+ph+8)+'" x2="'+ax0.toFixed(1)+'" y2="'+(mt-8)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  svg+='<polygon points="'+ax0+','+(mt-8)+' '+(ax0-3)+','+(mt-2)+' '+(ax0+3)+','+(mt-2)+'" fill="'+FIG_INK+'"/>';
  // Axis labels
  svg+='<text x="'+(ml+pw+10)+'" y="'+(ay0+4)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">x</text>';
  svg+='<text x="'+(ax0+6)+'" y="'+(mt-10)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">y</text>';
  // Ticks
  for(xi=Math.ceil(xmin);xi<=Math.floor(xmax);xi++){
    if(xi===0) continue;
    var txs=sx(xi);
    svg+='<line x1="'+txs.toFixed(1)+'" y1="'+(ay0-3)+'" x2="'+txs.toFixed(1)+'" y2="'+(ay0+3)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    if(Math.abs(xi)<=10) svg+='<text x="'+txs.toFixed(1)+'" y="'+(ay0+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+xi+'</text>';
  }
  for(yi=Math.ceil(ymin);yi<=Math.floor(ymax);yi++){
    if(yi===0) continue;
    var tys=sy(yi);
    svg+='<line x1="'+(ax0-3)+'" y1="'+tys.toFixed(1)+'" x2="'+(ax0+3)+'" y2="'+tys.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    if(Math.abs(yi)<=10) svg+='<text x="'+(ax0-6)+'" y="'+(tys+3.5)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+yi+'</text>';
  }
  // Shade region
  if(s.shade){
    var sh=s.shade, a_=sh.a!=null?sh.a:xmin, b_=sh.b!=null?sh.b:xmax;
    var shPts=[],N=200;
    for(var si=0;si<=N;si++){
      var sx_=a_+(b_-a_)*si/N;
      var sy1=sh.from==='fn0'&&s.fns&&s.fns[0]?evalFn(s.fns[0],sx_):0;
      var sy2=sh.to==='fn1'&&s.fns&&s.fns[1]?evalFn(s.fns[1],sx_):(sh.to==='x_axis'?0:0);
      shPts.push([sx(sx_),sy(sy1),sy(sy2)]);
    }
    var shd='M'+shPts[0][0].toFixed(1)+','+shPts[0][2].toFixed(1);
    shd+=shPts.map(function(p){return 'L'+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('');
    shd+=shPts.slice().reverse().map(function(p){return 'L'+p[0].toFixed(1)+','+p[2].toFixed(1);}).join('');
    shd+='Z';
    svg+='<path d="'+shd+'" fill="'+FIG_AMBER_FILL+'" stroke="none"/>';
  }
  // Functions
  var colors=FIG_SERIES;
  (s.fns||[]).forEach(function(fnStr,fi){
    var col=colors[fi%colors.length];
    var seg=[],N=400;
    for(var i=0;i<=N;i++){
      var mx=xmin+(xmax-xmin)*i/N;
      var my=evalFn(fnStr,mx);
      var inRange=isFinite(my)&&my>=ymin-(ymax-ymin)&&my<=ymax+(ymax-ymin);
      if(inRange){seg.push([sx(mx),sy(my)]);}
      else{
        if(seg.length>1){
          svg+='<path d="'+seg.map(function(p,k){return (k===0?'M':'L')+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('')+'" fill="none" stroke="'+col+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
        }
        seg=[];
      }
    }
    if(seg.length>1){
      svg+='<path d="'+seg.map(function(p,k){return (k===0?'M':'L')+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('')+'" fill="none" stroke="'+col+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
    }
  });
  // Key points
  (s.points||[]).forEach(function(pt){
    var px=sx(pt.x||0),py=sy(pt.y!=null?pt.y:0);
    svg+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="4" fill="'+FIG_AMBER+'" stroke="#fff" stroke-width="1.5"/>';
    if(pt.label) svg+='<text x="'+(px+7)+'" y="'+(py-5)+'" font-size="9.5" fill="'+FIG_INK+'">'+esc(pt.label)+'</text>';
  });
  // Legend
  var labs=s.labels||[];
  if(labs.length){
    var legX=W-8,legY=mt+6;
    labs.forEach(function(lb,li){
      var col=colors[li%colors.length];
      svg+='<rect x="'+(legX-70)+'" y="'+(legY+li*16-6)+'" width="60" height="15" fill="white" fill-opacity="0.85" rx="3"/>';
      svg+='<line x1="'+(legX-68)+'" y1="'+(legY+li*16)+'" x2="'+(legX-55)+'" y2="'+(legY+li*16)+'" stroke="'+col+'" stroke-width="2"/>';
      svg+='<text x="'+(legX-52)+'" y="'+(legY+li*16+4)+'" font-size="8.5" fill="'+FIG_INK+'">'+esc(lb)+'</text>';
    });
  }
  svg+='</svg>';
  return svg;
}

/* ── 2D Geometry ───────────────────────────────────────── */
function renderGeom2D(s){
  var W=300,H=230,mg=38;
  var shapes=s.shapes||[];
  // Collect all points for auto-scaling
  var allx=[],ally=[];
  shapes.forEach(function(sh){
    (sh.pts||[]).forEach(function(p){allx.push(p[0]);ally.push(p[1]);});
    if(sh.cx!=null){allx.push(sh.cx-sh.r,sh.cx+sh.r);ally.push(sh.cy-sh.r,sh.cy+sh.r);}
  });
  if(!allx.length){allx=[0,4];ally=[0,3];}
  var mxmin=Math.min.apply(null,allx),mxmax=Math.max.apply(null,allx);
  var mymin=Math.min.apply(null,ally),mymax=Math.max.apply(null,ally);
  var dx=mxmax-mxmin||1,dy=mymax-mymin||1;
  mxmin-=dx*0.18;mxmax+=dx*0.18;mymin-=dy*0.18;mymax+=dy*0.18;
  function sx(mx){return mg+(mx-mxmin)/(mxmax-mxmin)*(W-2*mg);}
  function sy(my){return (H-mg)-(my-mymin)/(mymax-mymin)*(H-2*mg);}
  function norm2(v){var l=Math.sqrt(v[0]*v[0]+v[1]*v[1])||1;return [v[0]/l,v[1]/l];}

  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  shapes.forEach(function(sh){
    // POLYGON / TRIANGLE
    if(sh.shape==='triangle'||sh.shape==='polygon'){
      var pts=sh.pts.map(function(p){return [sx(p[0]),sy(p[1])];});
      var pstr=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ');
      svg+='<polygon points="'+pstr+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      // Right angle mark
      if(sh.right_angle!=null){
        var ri=sh.right_angle%pts.length;
        var rp=pts[ri];
        var p1=pts[(ri+1)%pts.length];
        var p2=pts[(ri+pts.length-1)%pts.length];
        var d1=norm2([p1[0]-rp[0],p1[1]-rp[1]]);
        var d2=norm2([p2[0]-rp[0],p2[1]-rp[1]]);
        var s2=12;
        var q1=[rp[0]+d1[0]*s2,rp[1]+d1[1]*s2];
        var q2=[rp[0]+d1[0]*s2+d2[0]*s2,rp[1]+d1[1]*s2+d2[1]*s2];
        var q3=[rp[0]+d2[0]*s2,rp[1]+d2[1]*s2];
        svg+='<path d="M'+q1[0].toFixed(1)+','+q1[1].toFixed(1)+' L'+q2[0].toFixed(1)+','+q2[1].toFixed(1)+' L'+q3[0].toFixed(1)+','+q3[1].toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
      }
      // Angle arcs (non-right angles)
      if(sh.angle_marks){
        sh.angle_marks.forEach(function(ai){
          var ap=pts[ai%pts.length];
          var pp=pts[(ai+pts.length-1)%pts.length];
          var np=pts[(ai+1)%pts.length];
          var d3=norm2([pp[0]-ap[0],pp[1]-ap[1]]);
          var d4=norm2([np[0]-ap[0],np[1]-ap[1]]);
          var r3=14;
          var x1=ap[0]+d3[0]*r3,y1=ap[1]+d3[1]*r3;
          var x2=ap[0]+d4[0]*r3,y2=ap[1]+d4[1]*r3;
          svg+='<path d="M'+x1.toFixed(1)+','+y1.toFixed(1)+' Q'+ap[0]+','+ap[1]+' '+x2.toFixed(1)+','+y2.toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.4"/>';
        });
      }
      // Side tick marks (equal sides)
      if(sh.equal_sides){
        sh.equal_sides.forEach(function(pair){
          [pair].flat().forEach(function(si){
            var i0=si%pts.length, i1=(si+1)%pts.length;
            var mx=(pts[i0][0]+pts[i1][0])/2,my=(pts[i0][1]+pts[i1][1])/2;
            var ang=Math.atan2(pts[i1][1]-pts[i0][1],pts[i1][0]-pts[i0][0]);
            var perp=ang+Math.PI/2;
            var t=5;
            svg+='<line x1="'+(mx+Math.cos(perp)*t).toFixed(1)+'" y1="'+(my+Math.sin(perp)*t).toFixed(1)+'" x2="'+(mx-Math.cos(perp)*t).toFixed(1)+'" y2="'+(my-Math.sin(perp)*t).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
          });
        });
      }
      // Side labels
      var sides=sh.sides||[];
      sides.forEach(function(lbl,si){
        if(!lbl) return;
        var i0=si%pts.length, i1=(si+1)%pts.length;
        var mx=(pts[i0][0]+pts[i1][0])/2,my2=(pts[i0][1]+pts[i1][1])/2;
        var dx2=pts[i1][0]-pts[i0][0],dy2=pts[i1][1]-pts[i0][1];
        var len=Math.sqrt(dx2*dx2+dy2*dy2)||1;
        var off=14;
        var lx=mx+(-dy2/len)*off, ly=my2+(dx2/len)*off;
        svg+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="11.5" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="700">'+esc(lbl)+'</text>';
      });
      // Vertex labels
      var labels=sh.labels||[];
      var cx3=pts.reduce(function(a,p){return a+p[0];},0)/pts.length;
      var cy3=pts.reduce(function(a,p){return a+p[1];},0)/pts.length;
      labels.forEach(function(lbl,li){
        if(li>=pts.length||!lbl) return;
        var lx=pts[li][0],ly=pts[li][1];
        var ox=lx-cx3,oy=ly-cy3,ol=Math.sqrt(ox*ox+oy*oy)||1;
        lx+=ox/ol*16; ly+=oy/ol*16;
        svg+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="middle" font-weight="700">'+esc(lbl)+'</text>';
      });
    }
    // CIRCLE
    if(sh.shape==='circle'){
      var cxp=sx(sh.cx||0),cyp=sy(sh.cy||0);
      var rp=(sh.r||1)/(mxmax-mxmin)*(W-2*mg);
      svg+='<circle cx="'+cxp.toFixed(1)+'" cy="'+cyp.toFixed(1)+'" r="'+rp.toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      svg+='<circle cx="'+cxp.toFixed(1)+'" cy="'+cyp.toFixed(1)+'" r="3" fill="'+FIG_INK+'"/>';
      if(sh.center_label) svg+='<text x="'+(cxp+6)+'" y="'+(cyp-6)+'" font-size="11.5" fill="'+FIG_INK+'" font-weight="700">'+esc(sh.center_label)+'</text>';
      if(sh.radius_angle!=null){
        var ra=sh.radius_angle*Math.PI/180;
        var rx=cxp+rp*Math.cos(ra),ry=cyp-rp*Math.sin(ra);
        svg+='<line x1="'+cxp.toFixed(1)+'" y1="'+cyp.toFixed(1)+'" x2="'+rx.toFixed(1)+'" y2="'+ry.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6" stroke-dasharray="5 3"/>';
        if(sh.radius_label){
          var mlx=(cxp+rx)/2+8,mly=(cyp+ry)/2;
          svg+='<text x="'+mlx.toFixed(1)+'" y="'+mly.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(sh.radius_label)+'</text>';
        }
      }
      if(sh.chord&&sh.chord.length===2){
        svg+='<line x1="'+sx(sh.chord[0][0]).toFixed(1)+'" y1="'+sy(sh.chord[0][1]).toFixed(1)+'" x2="'+sx(sh.chord[1][0]).toFixed(1)+'" y2="'+sy(sh.chord[1][1]).toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
      }
      if(sh.tangent){
        var ta=sh.tangent*Math.PI/180;
        var tx=cxp+rp*Math.cos(ta),ty=cyp-rp*Math.sin(ta);
        var tpx=-Math.sin(ta)*25,tpy=-Math.cos(ta)*25;
        svg+='<line x1="'+(tx-tpx).toFixed(1)+'" y1="'+(ty-tpy).toFixed(1)+'" x2="'+(tx+tpx).toFixed(1)+'" y2="'+(ty+tpy).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.8"/>';
      }
    }
    // RECTANGLE
    if(sh.shape==='rectangle'){
      var rx2=sx(sh.x||0),ry2=sy((sh.y||0)+(sh.h||0));
      var rw=(sh.w||4)/(mxmax-mxmin)*(W-2*mg);
      var rh=(sh.h||3)/(mymax-mymin)*(H-2*mg);
      svg+='<rect x="'+rx2.toFixed(1)+'" y="'+ry2.toFixed(1)+'" width="'+rw.toFixed(1)+'" height="'+rh.toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      // dimension labels
      if(sh.width_label){var wlx=rx2+rw/2,wly=ry2+rh+14;svg+='<text x="'+wlx+'" y="'+wly+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(sh.width_label)+'</text>';}
      if(sh.height_label){var hlx=rx2+rw+12,hly=ry2+rh/2;svg+='<text x="'+hlx+'" y="'+hly+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" dominant-baseline="middle" font-weight="600">'+esc(sh.height_label)+'</text>';}
    }
  });

  if(s.title) svg+='<text x="'+W/2+'" y="12" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  svg+='</svg>';
  return svg;
}

/* ── 3D Geometry (isometric projection) ─────────────── */
function renderGeom3D(s){
  var W=300,H=220,cx=W/2,cy=H*0.55;
  var solid=s.solid||'rectangular_prism';
  var dims=s.dims||[4,3,2];
  var lw=dims[0]||4, dw=dims[1]||3, ht=dims[2]||2;
  var sc=Math.min(50,Math.min(W/(lw+dw+2),H/(ht+dw+2))*0.9);
  function iso(ix,iy,iz){
    return{x:cx+(ix-iz)*sc*0.866,y:cy-iy*sc+(ix+iz)*sc*0.5};
  }
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  function pt(ix,iy,iz){var p=iso(ix,iy,iz);return p.x.toFixed(1)+','+p.y.toFixed(1);}
  function line3(x1,y1,z1,x2,y2,z2,col,dash){
    var a=iso(x1,y1,z1),b=iso(x2,y2,z2);
    return '<line x1="'+a.x.toFixed(1)+'" y1="'+a.y.toFixed(1)+'" x2="'+b.x.toFixed(1)+'" y2="'+b.y.toFixed(1)+'" stroke="'+(col||FIG_INK)+'" stroke-width="1.8"'+(dash?' stroke-dasharray="5 3"':'')+'/>';
  }
  function face(pts4, fill){
    return '<polygon points="'+pts4.join(' ')+'" fill="'+fill+'" stroke="'+FIG_INDIGO+'" stroke-width="1.5" stroke-linejoin="round"/>';
  }
  /* three-tone face shading (front/right/top), consistent across every solid so the same
     light source reads correctly no matter which shape is drawn */
  var FACE_FRONT=FIG_INDIGO_FILL2, FACE_SIDE='rgba(43,91,168,0.28)', FACE_TOP='rgba(43,91,168,0.10)';

  if(solid==='rectangular_prism'||solid==='cube'){
    var l=lw,w=dw,h=ht;
    // Hidden edges (dashed)
    svg+=line3(0,0,0,l,0,0,FIG_INK,true);
    svg+=line3(0,0,0,0,0,w,FIG_INK,true);
    svg+=line3(0,0,0,0,h,0,FIG_INK,true);
    // Front face (left face in isometric)
    svg+=face([pt(0,0,w),pt(0,h,w),pt(l,h,w),pt(l,0,w)],FACE_FRONT);
    // Right face
    svg+=face([pt(l,0,w),pt(l,h,w),pt(l,h,0),pt(l,0,0)],FACE_SIDE);
    // Top face
    svg+=face([pt(0,h,0),pt(0,h,w),pt(l,h,w),pt(l,h,0)],FACE_TOP);
    // Dimension labels
    var lbs=s.labels||{};
    if(lbs.l){var ml2=iso(l/2,0,w+0.3);svg+='<text x="'+ml2.x.toFixed(1)+'" y="'+(ml2.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs.l)+'</text>';}
    if(lbs.w){var mw2=iso(l+0.3,0,w/2);svg+='<text x="'+(mw2.x+5)+'" y="'+(mw2.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs.w)+'</text>';}
    if(lbs.h){var mh2=iso(l+0.3,h/2,0);svg+='<text x="'+(mh2.x+5)+'" y="'+(mh2.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs.h)+'</text>';}
  }

  if(solid==='cylinder'){
    var r=lw/2,h2=ht;
    // Ellipse params
    var rX=r*sc*0.866*2,rY=r*sc*0.5;
    // Bottom ellipse (dashed)
    var bc=iso(0,0,0);
    svg+='<ellipse cx="'+bc.x.toFixed(1)+'" cy="'+bc.y.toFixed(1)+'" rx="'+rX.toFixed(1)+'" ry="'+rY.toFixed(1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
    // Side rectangle
    var tl=iso(-r,h2,0),tr=iso(r,h2,0);
    var bl=iso(-r,0,0),br=iso(r,0,0);
    svg+='<path d="M'+tl.x.toFixed(1)+','+tl.y.toFixed(1)+' L'+bl.x.toFixed(1)+','+bl.y.toFixed(1)+' A'+rX.toFixed(1)+' '+rY.toFixed(1)+' 0 0 0 '+br.x.toFixed(1)+','+br.y.toFixed(1)+' L'+tr.x.toFixed(1)+','+tr.y.toFixed(1)+'" fill="'+FACE_SIDE+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    // Top ellipse
    var tc=iso(0,h2,0);
    svg+='<ellipse cx="'+tc.x.toFixed(1)+'" cy="'+tc.y.toFixed(1)+'" rx="'+rX.toFixed(1)+'" ry="'+rY.toFixed(1)+'" fill="'+FACE_TOP+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    var lbs2=s.labels||{};
    if(lbs2.r){svg+='<line x1="'+tc.x.toFixed(1)+'" y1="'+tc.y.toFixed(1)+'" x2="'+(tc.x+rX).toFixed(1)+'" y2="'+tc.y.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4" stroke-dasharray="4 2"/><text x="'+(tc.x+rX/2)+'" y="'+(tc.y-6)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs2.r)+'</text>';}
    if(lbs2.h){svg+='<line x1="'+(br.x+12)+'" y1="'+br.y.toFixed(1)+'" x2="'+(tr.x+12)+'" y2="'+tr.y.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/><text x="'+(br.x+22)+'" y="'+((br.y+tr.y)/2)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" dominant-baseline="middle" font-weight="600">'+esc(lbs2.h)+'</text>';}
  }

  if(solid==='cone'){
    var r3=lw/2,h3=ht;
    var rX3=r3*sc*0.866*2,rY3=r3*sc*0.5;
    var bc3=iso(0,0,0);
    var apex=iso(0,h3,0);
    /* A cone's silhouette is the two slant lines from the base ellipse's
       HORIZONTAL extremes to the apex. The old code ran lines from the
       ellipse's top and bottom points instead — both of which share the
       apex's x, so they drew as a vertical line through the middle — and
       supplied only a left slant, making every cone render as a "sail on a
       pole" rather than a cone. */
    var coneL=(bc3.x-rX3), coneR=(bc3.x+rX3);
    svg+='<polygon points="'+coneL.toFixed(1)+','+bc3.y.toFixed(1)+' '+apex.x.toFixed(1)+','+apex.y.toFixed(1)+' '+coneR.toFixed(1)+','+bc3.y.toFixed(1)+'" fill="'+FACE_FRONT+'" stroke="none"/>';
    svg+='<ellipse cx="'+bc3.x.toFixed(1)+'" cy="'+bc3.y.toFixed(1)+'" rx="'+rX3.toFixed(1)+'" ry="'+rY3.toFixed(1)+'" fill="'+FACE_SIDE+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+coneL.toFixed(1)+'" y1="'+bc3.y.toFixed(1)+'" x2="'+apex.x.toFixed(1)+'" y2="'+apex.y.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+coneR.toFixed(1)+'" y1="'+bc3.y.toFixed(1)+'" x2="'+apex.x.toFixed(1)+'" y2="'+apex.y.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    var lbs3=s.labels||{};
    /* radius: dashed centre->rim line, label clear of the rim */
    if(lbs3.r){
      svg+='<line x1="'+bc3.x.toFixed(1)+'" y1="'+bc3.y.toFixed(1)+'" x2="'+coneR.toFixed(1)+'" y2="'+bc3.y.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3" stroke-dasharray="4 2"/>';
      svg+='<text x="'+(bc3.x+rX3/2).toFixed(1)+'" y="'+(bc3.y+rY3+14).toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs3.r)+'</text>';
    }
    if(lbs3.h) svg+='<text x="'+(apex.x+14)+'" y="'+((apex.y+bc3.y)/2)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" dominant-baseline="middle" font-weight="600">'+esc(lbs3.h)+'</text>';
  }

  if(solid==='square_pyramid'){
    /* Honors dims[1] as the base depth, so a rectangular base (e.g. a 2x12
       pyramid) draws truthfully instead of silently squaring off and
       contradicting its own "2 x 12" label. dims[0]===dims[1] still gives the
       square pyramid the name implies. */
    var l4=lw,d4=dw,h4=ht;
    var apex4=iso(l4/2,h4,d4/2);
    var bases=[[0,0,0],[l4,0,0],[l4,0,d4],[0,0,d4]];
    var faceColors=[FACE_FRONT,FACE_SIDE,FACE_FRONT,FACE_SIDE];
    for(var fi=0;fi<4;fi++){
      var b1=bases[fi],b2=bases[(fi+1)%4];
      svg+=face([pt(b1[0],b1[1],b1[2]),pt(b2[0],b2[1],b2[2]),apex4.x.toFixed(1)+','+apex4.y.toFixed(1)],faceColors[fi]);
    }
    var lbs4=s.labels||{};
    if(lbs4.base){var mb=iso(l4/2,0,d4+0.5);svg+='<text x="'+mb.x+'" y="'+(mb.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs4.base)+'</text>';}
    if(lbs4.h){svg+='<line x1="'+iso(l4/2,0,d4/2).x+'" y1="'+iso(l4/2,0,d4/2).y+'" x2="'+apex4.x+'" y2="'+apex4.y+'" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 2"/><text x="'+(apex4.x+12)+'" y="'+(apex4.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(lbs4.h)+'</text>';}
  }

  if(solid==='triangular_prism'){
    // base triangle in the x-z plane, extruded along y (height ht)
    var l6=lw,d6=dw,h6=ht;
    var baseTri=[[0,0,0],[l6,0,0],[l6/2,0,d6]];
    var topTri=baseTri.map(function(p){return [p[0],h6,p[2]];});
    // hidden bottom edges (dashed)
    svg+=line3(baseTri[0][0],0,baseTri[0][2],baseTri[1][0],0,baseTri[1][2],FIG_INK,true);
    svg+=line3(baseTri[1][0],0,baseTri[1][2],baseTri[2][0],0,baseTri[2][2],FIG_INK,true);
    svg+=line3(baseTri[2][0],0,baseTri[2][2],baseTri[0][0],0,baseTri[0][2],FIG_INK,true);
    // two visible rectangular side faces + one visible triangular end face
    svg+=face([pt(baseTri[0][0],0,baseTri[0][2]),pt(baseTri[1][0],0,baseTri[1][2]),pt(topTri[1][0],h6,topTri[1][2]),pt(topTri[0][0],h6,topTri[0][2])],FACE_FRONT);
    svg+=face([pt(baseTri[1][0],0,baseTri[1][2]),pt(baseTri[2][0],0,baseTri[2][2]),pt(topTri[2][0],h6,topTri[2][2]),pt(topTri[1][0],h6,topTri[1][2])],FACE_SIDE);
    svg+=face([pt(topTri[0][0],h6,topTri[0][2]),pt(topTri[1][0],h6,topTri[1][2]),pt(topTri[2][0],h6,topTri[2][2])],FACE_TOP);
    var lbs6=s.labels||{};
    if(lbs6.base){var mb6=iso((baseTri[0][0]+baseTri[1][0])/2,0,baseTri[0][2]-0.4);svg+='<text x="'+mb6.x.toFixed(1)+'" y="'+(mb6.y+10).toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs6.base)+'</text>';}
    if(lbs6.h){var mh6=iso(l6+0.3,h6/2,0);svg+='<text x="'+(mh6.x+6).toFixed(1)+'" y="'+mh6.y.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs6.h)+'</text>';}
  }

  if(solid==='sphere'){
    var r5=Math.min(lw,dw,ht)/2;
    var c5=iso(0,r5,0);
    var rp5=r5*sc;
    svg+='<circle cx="'+c5.x.toFixed(1)+'" cy="'+c5.y.toFixed(1)+'" r="'+rp5.toFixed(1)+'" fill="url(#sphereGrad)" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<defs><radialGradient id="sphereGrad" cx="38%" cy="35%"><stop offset="0%" stop-color="#eef2fb"/><stop offset="100%" stop-color="'+FIG_INDIGO2+'" stop-opacity="0.55"/></radialGradient></defs>';
    svg+='<ellipse cx="'+c5.x.toFixed(1)+'" cy="'+c5.y.toFixed(1)+'" rx="'+rp5.toFixed(1)+'" ry="'+(rp5*0.35).toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1" stroke-dasharray="5 3"/>';
    var lbs5=s.labels||{};
    if(lbs5.r) svg+='<text x="'+(c5.x+rp5/1.4)+'" y="'+(c5.y-rp5/1.4)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(lbs5.r)+'</text>';
  }

  if(solid==='cross_section'){
    // a rectangular prism sliced by a horizontal plane at a given fractional height,
    // showing the cut face — used for volume/cross-section questions (Calc, Geometry)
    var l7=lw,w7=dw,h7=ht,cutFrac=s.cut!=null?s.cut:0.5,ch=h7*cutFrac;
    svg+=line3(0,0,0,l7,0,0,FIG_INK,true);
    svg+=line3(0,0,0,0,0,w7,FIG_INK,true);
    svg+=line3(0,0,0,0,ch,0,FIG_INK,true);
    svg+=face([pt(0,0,w7),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,0,w7)],FACE_FRONT);
    svg+=face([pt(l7,0,w7),pt(l7,ch,w7),pt(l7,ch,0),pt(l7,0,0)],FACE_SIDE);
    // cut face at the top of the visible slice — amber, to draw the eye to what's being measured
    svg+=face([pt(0,ch,0),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,ch,0)],FIG_AMBER_FILL);
    // ghost outline of the full solid above the cut, dashed, so students see what was removed
    svg+='<polygon points="'+[pt(0,ch,0),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,ch,0)].join(' ')+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.6" stroke-dasharray="5 3"/>';
    svg+=line3(0,ch,0,0,h7,0,FIG_MUTED,true);
    svg+=line3(l7,ch,0,l7,h7,0,FIG_MUTED,true);
    svg+=line3(l7,ch,w7,l7,h7,w7,FIG_MUTED,true);
    svg+=line3(0,ch,w7,0,h7,w7,FIG_MUTED,true);
    var lbs7=s.labels||{};
    if(lbs7.l){var ml7=iso(l7/2,0,w7+0.3);svg+='<text x="'+ml7.x.toFixed(1)+'" y="'+(ml7.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs7.l)+'</text>';}
    if(lbs7.w){var mw7=iso(l7+0.3,0,w7/2);svg+='<text x="'+(mw7.x+5)+'" y="'+(mw7.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs7.w)+'</text>';}
    if(lbs7.h){var mh7=iso(l7+0.3,ch/2,0);svg+='<text x="'+(mh7.x+5)+'" y="'+(mh7.y+4)+'" font-size="11" fill="'+FIG_AMBER_TEXT+'" text-anchor="start" font-weight="600">'+esc(lbs7.h)+'</text>';}
  }

  if(s.title) svg+='<text x="'+W/2+'" y="12" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  svg+='</svg>';
  return svg;
}

/* ── Bar Chart ──────────────────────────────────────── */
function renderBarChart(s){
  var bars=s.bars||[];
  if(!bars.length) return '';
  var W=320,H=210,ml=44,mr=14,mt=22,mb=38;
  var pw=W-ml-mr,ph=H-mt-mb;
  var maxVal=Math.max.apply(null,bars.map(function(b){return b.val||0;}))||1;
  var yScale=Math.ceil(maxVal/5)*5; // round up to nice number
  var bw=Math.min(40,(pw/bars.length)*0.65);
  var gap=(pw-bw*bars.length)/(bars.length+1);
  var colors=FIG_SERIES;
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Title
  if(s.title) svg+='<text x="'+W/2+'" y="14" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  // Y axis grid
  for(var g=0;g<=5;g++){
    var gv=yScale*g/5, gy=mt+ph-(gv/yScale)*ph;
    svg+='<line x1="'+ml+'" y1="'+gy.toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+gy.toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+(ml-5)+'" y="'+(gy+3.5)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+Math.round(gv)+'</text>';
  }
  // Axes
  svg+='<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg+='<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(ml+pw)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  // Axis labels
  if(s.ylabel) svg+='<text x="12" y="'+(mt+ph/2)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90,12,'+(mt+ph/2)+')">'+esc(s.ylabel)+'</text>';
  if(s.xlabel) svg+='<text x="'+(ml+pw/2)+'" y="'+(H-4)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  // Bars
  bars.forEach(function(b,i){
    var bx=ml+gap+i*(bw+gap);
    var bh=(b.val/yScale)*ph;
    var by=mt+ph-bh;
    var col=colors[i%colors.length];
    svg+='<rect x="'+bx.toFixed(1)+'" y="'+by.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+bh.toFixed(1)+'" fill="'+col+'" rx="3"/>';
    // Value label on top
    svg+='<text x="'+(bx+bw/2).toFixed(1)+'" y="'+(by-4).toFixed(1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle" font-weight="600">'+b.val+'</text>';
    // Category label
    var lbl=b.label||'';
    svg+='<text x="'+(bx+bw/2).toFixed(1)+'" y="'+(mt+ph+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+esc(lbl)+'</text>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Scatter Plot ───────────────────────────────────── */
function renderScatter(s){
  var pts=s.pts||[];
  if(!pts.length) return '';
  var W=310,H=210,ml=42,mr=18,mt=20,mb=34;
  var pw=W-ml-mr,ph=H-mt-mb;
  var xs=pts.map(function(p){return p[0];}),ys=pts.map(function(p){return p[1];});
  var xmin2=Math.min.apply(null,xs),xmax2=Math.max.apply(null,xs);
  var ymin2=Math.min.apply(null,ys),ymax2=Math.max.apply(null,ys);
  var xpad=(xmax2-xmin2)*0.12||1, ypad=(ymax2-ymin2)*0.15||1;
  xmin2-=xpad;xmax2+=xpad;ymin2-=ypad;ymax2+=ypad;
  function sx2(x){return ml+(x-xmin2)/(xmax2-xmin2)*pw;}
  function sy2(y){return mt+ph-(y-ymin2)/(ymax2-ymin2)*ph;}
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  if(s.title) svg+='<text x="'+W/2+'" y="13" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  // Grid
  var nxg=5,nyg=5;
  for(var gi=0;gi<=nxg;gi++){
    var gx=(xmin2+(xmax2-xmin2)*gi/nxg);
    svg+='<line x1="'+sx2(gx).toFixed(1)+'" y1="'+mt+'" x2="'+sx2(gx).toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+sx2(gx).toFixed(1)+'" y="'+(mt+ph+12)+'" font-size="8.5" fill="'+FIG_INK+'" text-anchor="middle">'+gx.toFixed(0)+'</text>';
  }
  for(var gi2=0;gi2<=nyg;gi2++){
    var gy2=(ymin2+(ymax2-ymin2)*gi2/nyg);
    svg+='<line x1="'+ml+'" y1="'+sy2(gy2).toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+sy2(gy2).toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+(ml-5)+'" y="'+(sy2(gy2)+3)+'" font-size="8.5" fill="'+FIG_INK+'" text-anchor="end">'+gy2.toFixed(0)+'</text>';
  }
  // Axes
  svg+='<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg+='<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(ml+pw)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  if(s.xlabel) svg+='<text x="'+(ml+pw/2)+'" y="'+(H-3)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  if(s.ylabel) svg+='<text x="11" y="'+(mt+ph/2)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90,11,'+(mt+ph/2)+')">'+esc(s.ylabel)+'</text>';
  // Trend line
  if(s.trendline&&pts.length>1){
    var n=pts.length;
    var sumx=0,sumy=0,sumxy=0,sumx2=0;
    pts.forEach(function(p){sumx+=p[0];sumy+=p[1];sumxy+=p[0]*p[1];sumx2+=p[0]*p[0];});
    var m2=(n*sumxy-sumx*sumy)/(n*sumx2-sumx*sumx);
    var b2=(sumy-m2*sumx)/n;
    var tx1=xmin2+xpad*0.5,tx2=xmax2-xpad*0.5;
    svg+='<line x1="'+sx2(tx1).toFixed(1)+'" y1="'+sy2(m2*tx1+b2).toFixed(1)+'" x2="'+sx2(tx2).toFixed(1)+'" y2="'+sy2(m2*tx2+b2).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.8" stroke-dasharray="6 3"/>';
  }
  // Points
  pts.forEach(function(p){
    svg+='<circle cx="'+sx2(p[0]).toFixed(1)+'" cy="'+sy2(p[1]).toFixed(1)+'" r="4.5" fill="'+FIG_INDIGO2+'" fill-opacity="0.85" stroke="#fff" stroke-width="1.2"/>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Pie Chart ──────────────────────────────────────── */
function renderPie(s){
  var slices=s.slices||[];
  if(!slices.length) return '';
  var W=300,H=210,cx4=110,cy4=H/2,r6=78;
  var total=slices.reduce(function(a,sl){return a+sl.val;},0)||1;
  var colors=FIG_SERIES;
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  if(s.title) svg+='<text x="'+W/2+'" y="14" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  var ang=-Math.PI/2;
  slices.forEach(function(sl,si){
    var sweep=2*Math.PI*sl.val/total;
    var x1=cx4+r6*Math.cos(ang),y1=cy4+r6*Math.sin(ang);
    var x2=cx4+r6*Math.cos(ang+sweep),y2=cy4+r6*Math.sin(ang+sweep);
    var large=sweep>Math.PI?1:0;
    var col=colors[si%colors.length];
    svg+='<path d="M'+cx4+','+cy4+' L'+x1.toFixed(1)+','+y1.toFixed(1)+' A'+r6+','+r6+' 0 '+large+',1 '+x2.toFixed(1)+','+y2.toFixed(1)+' Z" fill="'+col+'" stroke="#fff" stroke-width="1.5"/>';
    ang+=sweep;
  });
  // Legend (right side)
  var legX=210,legY=H/2-slices.length*9;
  slices.forEach(function(sl,si){
    var col=colors[si%colors.length];
    var pct=Math.round(sl.val/total*100);
    svg+='<rect x="'+legX+'" y="'+(legY+si*20)+'" width="12" height="12" fill="'+col+'" rx="2"/>';
    svg+='<text x="'+(legX+16)+'" y="'+(legY+si*20+10)+'" font-size="10" fill="'+FIG_INK+'">'+esc(sl.label)+' ('+pct+'%)</text>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Number Line ────────────────────────────────────── */
function renderNumberLine(s){
  var W=310,H=90,my=50,ml=28,mr=28;
  var pw=W-ml-mr;
  var mn=s.min!=null?s.min:-5, mx=s.max!=null?s.max:5;
  function sx3(v){return ml+(v-mn)/(mx-mn)*pw;}
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Line
  svg+='<line x1="'+ml+'" y1="'+my+'" x2="'+(W-mr)+'" y2="'+my+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  svg+='<polygon points="'+(W-mr)+','+my+' '+(W-mr-7)+','+(my-3)+' '+(W-mr-7)+','+(my+3)+'" fill="'+FIG_INK+'"/>';
  svg+='<polygon points="'+ml+','+my+' '+(ml+7)+','+(my-3)+' '+(ml+7)+','+(my+3)+'" fill="'+FIG_INK+'"/>';
  // Ticks
  for(var tv=Math.ceil(mn);tv<=Math.floor(mx);tv++){
    var tx4=sx3(tv);
    svg+='<line x1="'+tx4.toFixed(1)+'" y1="'+(my-5)+'" x2="'+tx4.toFixed(1)+'" y2="'+(my+5)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    svg+='<text x="'+tx4.toFixed(1)+'" y="'+(my+18)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+tv+'</text>';
  }
  // Shaded regions
  (s.regions||[]).forEach(function(rg){
    var rx1=sx3(rg.from),rx2=sx3(rg.to);
    svg+='<rect x="'+rx1.toFixed(1)+'" y="'+(my-4)+'" width="'+(rx2-rx1).toFixed(1)+'" height="8" fill="'+FIG_INDIGO2+'" fill-opacity="0.28"/>';
    // Endpoints
    svg+='<circle cx="'+rx1.toFixed(1)+'" cy="'+my+'" r="5" fill="'+(rg.closed_left?FIG_INDIGO2:FIG_BG)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2"/>';
    svg+='<circle cx="'+rx2.toFixed(1)+'" cy="'+my+'" r="5" fill="'+(rg.closed_right?FIG_INDIGO2:FIG_BG)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2"/>';
  });
  // Points
  (s.points||[]).forEach(function(pt){
    var px=sx3(pt.x);
    svg+='<circle cx="'+px.toFixed(1)+'" cy="'+my+'" r="5.5" fill="'+(pt.open?FIG_BG:FIG_AMBER)+'" stroke="'+FIG_AMBER+'" stroke-width="2"/>';
    if(pt.label) svg+='<text x="'+px.toFixed(1)+'" y="'+(my-12)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(pt.label)+'</text>';
  });
  if(s.title) svg+='<text x="'+W/2+'" y="14" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  svg+='</svg>';
  return svg;
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

/* ── AI genTest override ────────────────────────────── */
window.genTest=function(btn){
  var box=btn.closest('.testgen'); if(!box) return;
  if(!aiSourceChosen(btn)){
    // Fall back to original question bank approach
    return _genTestOriginal(btn);
  }
  // AI path
  var view=btn.closest('main[id^="view-"]'); if(!view) return;
  var viewId=view.id.replace('view-','');
  var n=parseInt(box.querySelector('.tg-count').value,10)||10;
  var lvl=box.querySelector('.tg-level').value||'all';
  var out=box.querySelector('.tg-out');
  out.innerHTML='<div class="ai-gen-loading"><div class="ai-spinner"></div><p>AI is generating '+n+' fresh questions for <strong>'+viewId.toUpperCase()+'</strong>…</p><p style="font-size:.82rem;opacity:.7">This may take 10–30 seconds</p></div>';
  /* The blueprint decides topics and difficulty slot by slot; the AI only fills slots (05d). */
  var _bp=examBlueprint(viewId), _assembly=null, _verifyRes=null;
  var _slots=window.ClipSATAssembler.plan(_bp,[{q:n,type:'mcq'}],lvl);
  window.ClipSATAssembler.fill({viewId:viewId,blueprint:_bp,slots:_slots,system:examSystemPrompt(viewId),syllabus:examSyllabus(viewId),
    generate:callAI,review:callAISolver,progress:assemblerProgress(out,'Building a '+n+'-question '+viewId.toUpperCase()+' test')
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
    var bank=window.fullExamBank&&window.fullExamBank[viewId];
    var letters=(bank&&bank.letters)||['A','B','C','D'];
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

// Keep original as fallback
function _genTestOriginal(btn){
  var box=btn.closest('.testgen'); if(!box) return;
  var view=btn.closest('main[id^="view-"]'); if(!view) return;
  var practice=view.querySelector('section[id$="-practice"]'); if(!practice) return;
  var pool=Array.prototype.slice.call(practice.querySelectorAll('.problem'));
  var n=parseInt(box.querySelector('.tg-count').value,10)||10;
  var lvl=box.querySelector('.tg-level').value;
  var filtered=(lvl==='all')?pool.slice():pool.filter(function(p){var L=p.querySelector('.lvl');return L&&L.textContent.trim().toLowerCase()===lvl.toLowerCase();});
  if(!filtered.length) filtered=pool.slice();
  // shuffle
  for(var i=filtered.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=filtered[i];filtered[i]=filtered[j];filtered[j]=t;}
  var pick=filtered.slice(0,Math.min(n,filtered.length));
  var out=box.querySelector('.tg-out'); out.innerHTML='';
  var head=document.createElement('div'); head.className='tg-head';
  var lvlLabel=(lvl==='all'?'all levels':lvl);
  head.innerHTML='<span class="tg-title">Generated test</span><span class="tg-meta">'+pick.length+' question'+(pick.length===1?'':'s')+' · '+lvlLabel+'</span>';
  out.appendChild(head);
  if(!pick.length){var e=document.createElement('p');e.className='tg-empty';e.textContent='No questions match that filter.';out.appendChild(e);return;}
  var _csCaptureQ=[];
  pick.forEach(function(p,idx){
    var c=p.cloneNode(true);c.classList.remove('open');
    var pn=c.querySelector('.pn');if(pn) pn.textContent=(idx+1);
    var st=c.querySelector('.sol-toggle');
    if(st){var tw=st.querySelector('.tw');if(tw) tw.textContent='▸';if(st.childNodes[1]) st.childNodes[1].textContent=' Show solution';}
    out.appendChild(c);
    /* Google Forms/Classroom capture — this legacy path never has MCQ
       choices/answers, only a free-text prompt + worked solution, so every
       question is captured as ungraded FRQ. See public/js/quiz-capture-ui.js
       for the honest "short-answer, no auto-grading" fallback this enables. */
    var pq=c.querySelector('.pq');
    _csCaptureQ.push({text:pq?pq.textContent:'',choices:[],correctIndex:null,type:'frq',points:1});
  });
  var ans=box.querySelector('.tg-ans');if(ans){ans.setAttribute('data-state','hidden');ans.textContent='Show all answers';}
  if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]);
  out.scrollIntoView({behavior:'smooth',block:'nearest'});
  if(pick.length) document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genTest-legacy',title:'Generated test',trackId:(view&&view.id.replace('view-',''))||'',questions:_csCaptureQ,outEl:out}}));
}

/* ── tgReveal override (works with AI questions too) ── */
window.tgReveal=function(btn){
  var box=btn.closest('.testgen');
  var out=box.querySelector('.tg-out');
  var show=btn.getAttribute('data-state')!=='shown';
  // Standard problems
  out.querySelectorAll('.problem').forEach(function(p){
    p.classList.toggle('open',show);
    var st=p.querySelector('.sol-toggle');if(st&&st.childNodes[1]) st.childNodes[1].textContent=' '+(show?'Hide solution':'Show solution');
  });
  // AI questions
  out.querySelectorAll('.aiq-solution').forEach(function(sol){
    sol.classList.toggle('open',show);
    var tb=sol.previousElementSibling;
    if(tb&&tb.classList.contains('aiq-sol-toggle')) tb.textContent=show?'▾ Hide solution':'▸ Show solution';
  });
  btn.setAttribute('data-state',show?'shown':'hidden');
  btn.textContent=show?'Hide all answers':'Show all answers';
  if(show&&window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){});
};

/* ── AI genFullExam override ───────────────────────── */
var _origGenFullExam=window.genFullExam;
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
window.genFullExam=function(btn,examName,viewId,sectionTitles,qPerSection){
  if(!aiSourceChosen(btn)){
    return _origGenFullExam&&_origGenFullExam(btn,examName,viewId,sectionTitles,qPerSection);
  }
  var out=btn.closest('.testgen').querySelector('.tg-out');
  var bank=window.fullExamBank&&window.fullExamBank[viewId];
  var spec=window.examSpecs&&window.examSpecs[viewId];
  var letters=(bank&&bank.letters)||['A','B','C','D'];
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
  var _bp=examBlueprint(viewId), _assembly=null, _verifyRes=null;
  var _slots=window.ClipSATAssembler.plan(_bp,sections,'all');
  window.ClipSATAssembler.fill({viewId:viewId,blueprint:_bp,slots:_slots,system:examSystemPrompt(viewId),syllabus:examSyllabus(viewId),
    generate:callAI,review:callAISolver,progress:assemblerProgress(out,'Building the '+esc(examName)+' paper ('+_slots.length+' questions)')
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

/* ── Show AI badge in nav when enabled ───────────────── */
(function(){
  var btn=document.querySelector('.ai-settings-btn');
  if(!btn) return;
  btn.textContent='⚙ AI ✓';
  btn.style.background='linear-gradient(135deg,#16a34a,#0891b2)';
})();

})(); // end IIFE

/* ─────────────────────────────────────────────── */

