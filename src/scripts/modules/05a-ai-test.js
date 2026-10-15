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
    a2level:{name:'Cambridge A Level Mathematics 9709 P3',letters:'A B C D',desc:'Cambridge International A Level 9709 (2026–2027 syllabus) Paper 3 Pure Mathematics 3: algebra (modulus, polynomials, partial fractions, binomial for rational n), logarithmic and exponential functions, trigonometry, differentiation, integration, numerical solution of equations, vectors, differential equations, complex numbers. Structured questions with marks shown; no mechanics or statistics on this paper.'},
    linalg:{name:'Linear Algebra',letters:'A B C D',desc:'University Linear Algebra: systems of linear equations, matrices, determinants, vector spaces, subspaces, eigenvalues and eigenvectors, orthogonality, diagonalization.'},
    mvc:{name:'Multivariable Calculus',letters:'A B C D',desc:'University Multivariable Calculus: 3D coordinate systems, vectors and dot/cross product, vector functions and space curves, partial derivatives, directional derivatives, gradient vector, multiple integrals, vector calculus (Green, Stokes, Divergence).'}
  };
  var sp=specs[examId]||{name:'Mathematics',letters:'A B C D',desc:'High school mathematics.'};

  return 'You are an expert exam writer for '+sp.name+'. '+sp.desc+'\n\n'+
'Generate authentic, examination-grade questions strictly equivalent to real standardized papers. Return ONLY valid JSON in this exact structure:\n'+
'{"questions":[\n'+
'  {\n'+
'    "type":"mcq"|"frq",\n'+
'    "domain":"Topic Name",\n'+
'    "text":"Question stem in LaTeX",\n'+
'    "choices":["choice A","choice B",...],\n'+
'    "answer":0,\n'+
'    "sol":"Comprehensive step-by-step solution explaining why the answer is correct and why common distractor traps fail",\n'+
'    "marks":3,\n'+
'    "isQC":false,\n'+
'    "colA":"Value or expression in Column A (for Qudrat QC questions)",\n'+
'    "colB":"Value or expression in Column B (for Qudrat QC questions)",\n'+
'    "isSPR":false,\n'+
'    "figure":{...optional...},\n'+
'    "table":{...optional data table...}\n'+
'  }\n'+
']}\n\n'+
'LaTeX rules:\n'+
'- Inline math: \\\\( expression \\\\)\n'+
'- Display math: \\\\[ expression \\\\]\n'+
'- Use \\\\frac{a}{b}, \\\\sqrt{x}, \\\\int, \\\\sum, \\\\infty, \\\\leq, \\\\geq, \\\\Rightarrow, \\\\pi, \\\\theta, \\\\circ (NOT inside \\\\( \\\\))\n'+
'- Degrees: write "90^\\\\circ" NOT "90°"\n\n'+
'Answer choices for MCQ must use letters ('+sp.letters+'). "answer" is 0-based index. Write each choice WITHOUT '+
'any letter prefix (write "12", not "A. 12"): the page adds the letters itself.\n'+
'DISTRACTOR ENGINEERING (CRITICAL FOR REAL-PAPER EQUIVALENCE):\n'+
'Real standardized exam distractors are NEVER random guesses. Every wrong option MUST be an engineered distractor targeting a specific common error:\n'+
'- Choice A/B/C/D: one correct answer, and 3 authentic distractors derived from:\n'+
'  (1) Partial computation (e.g. finding x instead of 2x+1; finding radius instead of area).\n'+
'  (2) Sign or algebraic slip (e.g. -b/(2a) forgotten negative, distribution over parentheses error).\n'+
'  (3) Misunderstood concept (e.g. confusing mean and median, confusing radian and degree mode, multiplying exponents instead of adding).\n'+
'  (4) Premature rounding or wrong order of operations.\n'+
'Every distractor must look plausible and attractive to an unprepared student.\n\n'+
'QUANTITATIVE COMPARISON (QUDRAT):\n'+
'For Qudrat comparison questions, set "isQC": true, provide "colA" and "colB", and use choices: 0 (Col A > Col B), 1 (Col B > Col A), 2 (Equal), 3 (Cannot determine).\n\n'+
'FIGURES & TABLES RULES:\n'+
'- NEVER REVEAL THE UNKNOWN / ANSWER IN THE FIGURE: If the question asks for a side length, angle, coordinate, area, or value, that target unknown MUST NEVER be labeled with its numerical answer. Instead, mark the unknown with "?" or a variable (e.g. "x", "\\theta"), or omit the label. For example, if asking for the hypotenuse of legs 6 and 8, label the sides ["6", "8", "?"], NEVER ["6", "8", "10"]. Any question whose diagram reveals the answer is automatically defective and discarded.\n'+
'- RELEVANCE: ONLY include a figure when the question genuinely requires visual/geometric reasoning. NEVER attach an unrelated or generic graph (such as a parabola to a trigonometry evaluation or algebraic equation). Pure analytical, arithmetic, or algebraic questions should have NO figure.\n'+
'- ACCURACY & SCALE: Every labeled given value must match the problem text. Side lengths must be drawn in true proportion (a side of length 8 must be twice as long as 4). Right angles must really be 90°.\n'+
'- For tabular data, provide "table": {"headers":["..."],"rows":[["..."]]}.\n\n'+
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
'FIGURES — include when and only when a diagram, graph, or chart is needed for the question.\n'+
'Figure types (use the "figure" field):\n\n'+
'1. Function graph:\n'+
'{"type":"function_graph","fns":["x**2-2*x-3","2*x-1"],"labels":["f(x)","g(x)"],"xmin":-2,"xmax":5,"ymin":-5,"ymax":8,"points":[{"x":1,"y":-4,"label":"(1,−4)"}],"shade":{"from":"fn0","to":"x_axis","a":−1,"b":3}}\n\n'+
'2. 2-D geometry (unknown side labelled "?", never the solution value):\n'+
'{"type":"geometry_2d","title":"Triangle ABC","shapes":[{"shape":"triangle","pts":[[0,0],[4,0],[0,3]],"right_angle":0,"labels":["A","B","C"],"sides":["4","?","3"],"angle_marks":[1,2]}]}\n\n'+
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
'Include a figure or table ONLY when appropriate for the topic. Vary difficulty (easy / medium / hard). Be creative with contexts: real-world applications, authentic exam setups.';
}

/* ── Official Formula & Reference Sheets ─────────────── */
function examRefSheet(viewId){
  var id=String(viewId||'').toLowerCase();
  var isSatEst=/^(sat|est|est2|act|act2|geo|algebra|alg2)/.test(id);
  var isCambridge=/^(igcse|aslevel|a2level)/.test(id);
  var isArabic=/^(qudrat|tahsili)/.test(id);
  var isAP=/^(apab|apbc|calculus|apstats|appc|precalc|ibsl|ibhl|mvc|linalg)/.test(id);

  if(!isSatEst&&!isCambridge&&!isArabic&&!isAP) return '';

  var title='Official Reference & Formula Sheet';
  var subtitle='Authorized formulas and geometric reference for this examination';
  var cards=[];

  if(isArabic){
    title=(id==='qudrat')?'ورقة القوانين والمفاهيم الرياضية الأساسية (القدرات العامة)':'ورقة القوانين والمفاهيم الرياضية (التحصيلي)';
    subtitle='قوانين معتمدة ومفاهيم أساسية للاختبار — لا يُسمح باستخدام الآلة الحاسبة';
    if(id==='qudrat'){
      cards=[
        {title:'الهندسة والقياس',content:'محيط الدائرة = \\(2\\pi r\\) · مساحة الدائرة = \\(\\pi r^2\\)<br>مساحة المثلث = \\(\\frac{1}{2} \\times \\text{القاعدة} \\times \\text{الارتفاع}\\)<br>مجموع زوايا المثلث = \\(180^\\circ\\) · زوايا الشكل الرباعي = \\(360^\\circ\\)<br>مثلث فيثاغورس المشهور: (3, 4, 5)، (5, 12, 13)'},
        {title:'المتطابقات والتحليل',content:'\\((a+b)^2 = a^2 + 2ab + b^2\\)<br>\\((a-b)^2 = a^2 - 2ab + b^2\\)<br>\\(a^2 - b^2 = (a-b)(a+b)\\)'},
        {title:'الحركة والسرعة والمتوسط',content:'المسافة = السرعة \\(\\times\\) الزمن<br>السرعة المتوسطة = \\(\\frac{\\text{المسافة الكلية}}{\\text{الزمن الكلي}}\\)<br>المتوسط الحسابي = \\(\\frac{\\text{مجموع القيم}}{\\text{عددها}}\\)'},
        {title:'النسبة والربح والتناسب',content:'التناسب الطردي: \\(\\frac{x_1}{y_1} = \\frac{x_2}{y_2}\\) (زيادة يقابلها زيادة)<br>التناسب العكسي: \\(x_1 y_1 = x_2 y_2\\) (زيادة يقابلها نقصان)<br>نسبة التغير = \\(\\frac{\\text{مقدار التغير}}{\\text{القيمة الأصلية}} \\times 100\\%\\)'}
      ];
    } else {
      cards=[
        {title:'الجبر والدوال',content:'المعادلة التربيعية: \\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)<br>المتتابعة الحسابية: \\(a_n = a_1 + (n-1)d\\) · \\(S_n = \\frac{n}{2}(a_1+a_n)\\)<br>المتتابعة الهندسية: \\(a_n = a_1 r^{n-1}\\) · \\(S_\\infty = \\frac{a_1}{1-r}\\) (حيث \\(|r| < 1\\))'},
        {title:'حساب المثلثات',content:'\\(\\sin^2\\theta + \\cos^2\\theta = 1\\)<br>\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}\\) · \\(\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\\)<br>قانون الجيوب: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\)<br>قانون جيوب التمام: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\)'},
        {title:'المتجهات والمصفوفات',content:'الضرب الداخلي: \\(\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 = |\\vec{u}||\\vec{v}|\\cos\\theta\\)<br>المحدد: \\(\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc\\)<br>المتجهات المتعامدة: \\(\\vec{u} \\cdot \\vec{v} = 0\\)'},
        {title:'التفاضل والتكامل',content:'\\(\\frac{d}{dx}[x^n] = n x^{n-1}\\) · \\(\\frac{d}{dx}[\\sin x] = \\cos x\\)<br>\\(\\int x^n dx = \\frac{x^{n+1}}{n+1} + C\\) \\((n \\neq -1)\\)<br>ميل المماس عند نقطة = المشتقة الأولى \\(f\'(x)\\)'}
      ];
    }
  } else if(isCambridge){
    title=(id==='igcse')?'Cambridge IGCSE® Mathematics 0580 Formula Sheet':'Cambridge International AS & A Level 9709 Formula List (MF19)';
    subtitle='Formulae for Extended Mathematics / Pure Mathematics';
    if(id==='igcse'){
      cards=[
        {title:'Algebra & Quadratics',content:'Quadratic equation \\(ax^2 + bx + c = 0\\):<br>\\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\]'},
        {title:'Mensuration (Geometry & Solids)',content:'Curved surface area of cone = \\(\\pi r l\\)<br>Surface area of sphere = \\(4\\pi r^2\\)<br>Volume of sphere = \\(\\frac{4}{3}\\pi r^3\\)<br>Volume of cone = \\(\\frac{1}{3}\\pi r^2 h\\)'},
        {title:'Trigonometry',content:'Sine rule: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\)<br>Cosine rule: \\(a^2 = b^2 + c^2 - 2bc\\cos A\\)<br>Area of triangle = \\(\\frac{1}{2}ab\\sin C\\)'},
        {title:'Statistics',content:'Mean \\(\\bar{x} = \\frac{\\sum f x}{\\sum f}\\)<br>Probability: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)'}
      ];
    } else {
      cards=[
        {title:'Algebra & Series',content:'Arithmetic: \\(u_n = a + (n-1)d\\), \\(S_n = \\frac{1}{2}n(2a + (n-1)d)\\)<br>Geometric: \\(u_n = ar^{n-1}\\), \\(S_n = \\frac{a(1-r^n)}{1-r}\\), \\(S_\\infty = \\frac{a}{1-r}\\) (\\(|r|<1\\))<br>Binomial: \\((a+b)^n = a^n + \\binom{n}{1}a^{n-1}b + \\dots\\)'},
        {title:'Circular Measure & Trigonometry',content:'Arc length \\(s = r\\theta\\) · Sector area \\(A = \\frac{1}{2}r^2\\theta\\) (\\(\\theta\\) in rad)<br>\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}\\) · \\(\\sin^2\\theta + \\cos^2\\theta = 1\\)<br>\\(1 + \\tan^2\\theta = \\sec^2\\theta\\) · \\(1 + \\cot^2\\theta = \\csc^2\\theta\\)'},
        {title:'Differentiation',content:'\\(f(x) = x^n \\implies f\'(x) = nx^{n-1}\\)<br>\\(\\frac{d}{dx}(\\sin x) = \\cos x\\), \\(\\frac{d}{dx}(\\cos x) = -\\sin x\\)<br>Product: \\((uv)\' = u\'v + uv\'\\) · Quotient: \\((\\frac{u}{v})\' = \\frac{u\'v - uv\'}{v^2}\\)'},
        {title:'Integration',content:'\\(\\int x^n dx = \\frac{x^{n+1}}{n+1} + c\\) \\((n \\neq -1)\\)<br>\\(\\int \\frac{1}{x} dx = \\ln|x| + c\\)<br>\\(\\int \\cos(ax+b)dx = \\frac{1}{a}\\sin(ax+b) + c\\)'}
      ];
    }
  } else if(isSatEst){
    title='Reference Information (College Board Digital SAT & EST Standards)';
    subtitle='The following formulas and geometry facts are provided on the real examination';
    cards=[
      {title:'2D Geometry & Circles',content:'Circle: \\(A = \\pi r^2\\), \\(C = 2\\pi r\\)<br>Rectangle: \\(A = \\ell w\\)<br>Triangle: \\(A = \\frac{1}{2}bh\\), \\(c^2 = a^2 + b^2\\)<br>Arc degrees in circle = \\(360^\\circ\\), radians = \\(2\\pi\\)<br>Triangle angle sum = \\(180^\\circ\\)'},
      {title:'Special Right Triangles',content:'\\(30^\\circ-60^\\circ-90^\\circ\\): sides in ratio \\(x : x\\sqrt{3} : 2x\\)<br>\\(45^\\circ-45^\\circ-90^\\circ\\): sides in ratio \\(s : s : s\\sqrt{2}\\)'},
      {title:'3D Solids (Volume)',content:'Rectangular prism: \\(V = \\ell w h\\)<br>Cylinder: \\(V = \\pi r^2 h\\)<br>Sphere: \\(V = \\frac{4}{3}\\pi r^3\\)<br>Cone: \\(V = \\frac{1}{3}\\pi r^2 h\\)<br>Pyramid: \\(V = \\frac{1}{3}\\ell w h\\)'},
      {title:'Coordinate & Algebra Facts',content:'Slope \\(m = \\frac{y_2 - y_1}{x_2 - x_1}\\) · Vertex of parabola \\(x = -\\frac{b}{2a}\\)<br>Exponential growth: \\(f(t) = a(1 + r)^t\\)<br>SPR Rule: No negative values for grid-ins; round decimals or enter fractions'}
    ];
  } else {
    title=(id.indexOf('stat')!==-1)?'AP® Statistics Formula Sheet & Tables':'AP® Calculus Reference Information';
    subtitle='Authorized formulas for Advanced Placement Examinations';
    if(id.indexOf('stat')!==-1){
      cards=[
        {title:'Descriptive Statistics',content:'Sample mean \\(\\bar{x} = \\frac{1}{n}\\sum x_i\\)<br>Sample standard deviation \\(s = \\sqrt{\\frac{1}{n-1}\\sum (x_i-\\bar{x})^2}\\)<br>Linear regression \\(\\hat{y} = b_0 + b_1 x\\), \\(b_1 = r\\frac{s_y}{s_x}\\)'},
        {title:'Probability & Distributions',content:'\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)<br>Conditional: \\(P(A|B) = \\frac{P(A \\cap B)}{P(B)}\\)<br>Binomial: \\(P(X = k) = \\binom{n}{k}p^k(1-p)^{n-k}\\), \\(\\mu = np\\), \\(\\sigma = \\sqrt{np(1-p)}\\)'},
        {title:'Inference',content:'Standardized test statistic: \\(\\frac{\\text{statistic} - \\text{parameter}}{\\text{standard error of statistic}}\\)<br>Confidence interval: \\(\\text{statistic} \\pm (\\text{critical value})(\\text{SE})\\)<br>One-proportion \\(z\\): \\(SE = \\sqrt{\\frac{p_0(1-p_0)}{n}}\\)'},
        {title:'Normal Distribution Facts',content:'68% of data within \\(\\mu \\pm 1\\sigma\\)<br>95% of data within \\(\\mu \\pm 2\\sigma\\)<br>99.7% of data within \\(\\mu \\pm 3\\sigma\\)'}
      ];
    } else {
      cards=[
        {title:'Derivatives',content:'\\(\\frac{d}{dx}[f(g(x))] = f\'(g(x))g\'(x)\\)<br>\\(\\frac{d}{dx}[\\ln x] = \\frac{1}{x}\\) · \\(\\frac{d}{dx}[e^x] = e^x\\)<br>\\(\\frac{d}{dx}[\\tan x] = \\sec^2 x\\) · \\(\\frac{d}{dx}[\\sec x] = \\sec x\\tan x\\)'},
        {title:'Integrals & FTC',content:'FTC Part 1: \\(\\frac{d}{dx}\\int_a^x f(t)dt = f(x)\\)<br>FTC Part 2: \\(\\int_a^b f(x)dx = F(b) - F(a)\\)<br>Average value: \\(f_{\\text{avg}} = \\frac{1}{b-a}\\int_a^b f(x)dx\\)'},
        {title:'Volumes of Revolution',content:'Disk method: \\(V = \\pi \\int_a^b [R(x)]^2 dx\\)<br>Washer method: \\(V = \\pi \\int_a^b ([R(x)]^2 - [r(x)]^2) dx\\)<br>Cross-sections: \\(V = \\int_a^b A(x) dx\\)'},
        {title:'Series & Approximation (BC)',content:'Taylor Series: \\(\\sum_{n=0}^\\infty \\frac{f^{(n)}(c)}{n!}(x-c)^n\\)<br>Geometric series: \\(\\sum_{n=0}^\\infty ar^n = \\frac{a}{1-r}\\) (\\(|r|<1\\))<br>Error bound (alternating): \\(|R_n| \\le a_{n+1}\\)'}
      ];
    }
  }

  var h='<div class="fep-ref-section">'+
    '<button type="button" class="fep-ref-toggle-btn" onclick="var w=this.nextElementSibling;var open=w.style.display!==\'none\';w.style.display=open?\'none\':\'block\';this.querySelector(\'.fep-ref-arrow\').textContent=open?\'▸ Show Reference Sheet\':\'▾ Hide Reference Sheet\';">'+
    '<span>📐 '+esc(title)+'</span><span class="fep-ref-arrow" style="font-size:.85rem;font-weight:600">▾ Hide Reference Sheet</span></button>'+
    '<div class="fep-ref-wrap">'+
    '<div class="fep-ref-header">'+
    '<div class="fep-ref-title">'+esc(title)+'</div>'+
    '<div class="fep-ref-subtitle">'+esc(subtitle)+'</div>'+
    '</div>'+
    '<div class="fep-ref-grid">';

  cards.forEach(function(c){
    h+='<div class="fep-ref-card"><h4>'+esc(c.title)+'</h4><p>'+c.content+'</p></div>';
  });

  h+='</div></div></div>';
  return h;
}

function _autoMath(s){
  if(window.CSAutoMath) return window.CSAutoMath(s);
  if(!s && s !== 0) return '';
  s = String(s).trim();
  if(s.indexOf('\\(')!==-1 || s.indexOf('\\[')!==-1 || s.indexOf('$$')!==-1) return s;
  if(s.startsWith('$') && s.endsWith('$') && s.length > 2) return '\\(' + s.slice(1, -1).trim() + '\\)';
  if(/<[a-z/][\s\S]*>/i.test(s) || /[\u0600-\u06FF]/.test(s)) return s;
  if(s.indexOf('\\')!==-1) return '\\(' + s + '\\)';
  if(/[\^_{}±≤≥≠≈√πθ∞×÷·°]/.test(s) && !/[^\\]%|^%/.test(s)) return '\\(' + s + '\\)';
  if(/^[-+]?\d+(?:\.\d+)?%?$/.test(s)) return '\\(' + s + '\\)';
  var fracMatch = /^([-+]?)\s*([0-9a-zA-Z]+)\s*\/\s*([0-9a-zA-Z]+)$/.exec(s);
  if(fracMatch) return '\\(' + (fracMatch[1]||'') + '\\frac{' + fracMatch[2] + '}{' + fracMatch[3] + '}\\)';
  if(/^\(\s*[-+]?[0-9a-zA-Z.]+\s*,\s*[-+]?[0-9a-zA-Z.]+\s*\)$/.test(s)) return '\\(' + s + '\\)';
  if(/^[(\[]\s*[-+]?[0-9a-zA-Z.]+\s*,\s*[-+]?[0-9a-zA-Z.]+\s*[)\]]$/.test(s)) return '\\(' + s + '\\)';
  if(/^[-+]?\d*[a-zA-Z]$/.test(s)) return '\\(' + s + '\\)';
  var mathFns = {sin:1, cos:1, tan:1, sec:1, csc:1, cot:1, log:1, ln:1, lim:1, exp:1, det:1, deg:1, rad:1};
  var words = s.match(/[a-zA-Z]{2,}/g) || [];
  if(words.some(function(w){ return !mathFns[w.toLowerCase()]; })){
    if(/^[a-zA-Z](?:\([a-zA-Z0-9]+\))?\s*(=|<|>|<=|>=)\s*[-+]?[0-9a-zA-Z]/.test(s) && !/[^\\]%|^%/.test(s)){
      return '\\(' + s.replace(/\b(or|and)\b/g, '\\text{ $1 }') + '\\)';
    }
    return s;
  }
  if(/[-+*/=<>|()]/.test(s) && /^[-+*/=<>()0-9a-zA-Z.,\s|]+$/.test(s)) return '\\(' + s + '\\)';
  return s;
}

/* ── Render one AI question ─────────────────────────── */
function renderAIQuestion(q,idx,totalLetters,viewId){
  function _maths(s){
    if(!s && s !== 0) return '';
    s = String(s);
    s = s.replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]');
    s = s.replace(/\$(?!\s)([^$\n]+?)(?<!\s)\$/g, function(m, inner){
      if(/^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/.test(inner)) return m;
      return '\\(' + inner + '\\)';
    });
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
      if(!inM&&s[i]==='\\'&&i+1<L&&(s[i+1]==='%'||s[i+1]==='$')){o+=s[i+1];i+=2;continue;}
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
  var isQC=!!(q.isQC||q.qc||(q.colA!=null&&q.colB!=null));
  var isAr=(viewId==='qudrat'||viewId==='tahsili'||/[\u0600-\u06FF]/.test(String(q.text||'')+String(q.colA||'')));

  var html='<div class="aiq" data-idx="'+idx+'"';
  if(q.answer!=null) html+=' data-answer="'+q.answer+'"';
  if(typeof q.numericAnswer==='number'&&isFinite(q.numericAnswer)){
    html+=' data-numeric-answer="'+q.numericAnswer+'"';
    if(typeof q.tolerance==='number'&&isFinite(q.tolerance)) html+=' data-tolerance="'+q.tolerance+'"';
  } else if(typeof q.answerExpr==='string'&&q.answerExpr.trim()){
    html+=' data-answer-expr="'+esc(q.answerExpr.trim())+'"';
    if(Array.isArray(q.answerVars)&&q.answerVars.length) html+=' data-answer-vars="'+esc(q.answerVars.join(','))+'"';
  }
  html+='>';

  html+='<div class="aiq-head">';
  html+='<div class="aiq-num">'+(idx+1)+'</div>';
  if(q.domain) html+='<span class="aiq-domain">'+esc(q.domain)+'</span>';
  html+='<span class="aiq-type">'+(q.type==='frq'?'FRQ':(isQC?'QC':'MCQ'))+'</span>';
  if(q.marks||q.mark) html+='<span class="fep-mark-badge">['+(q.marks||q.mark)+' '+((q.marks||q.mark)===1?'mark':'marks')+']</span>';
  if(q.isSPR||(viewId==='sat'&&q.type==='frq')) html+='<span class="fep-spr-badge">Student-Produced Response</span>';
  if(window.ClipSATVerifyAI&&(('_verified' in q)||q._fromBank)) html+=window.ClipSATVerifyAI.badgeHTML(q);
  html+='</div>';

  html+='<div class="aiq-text">'+_maths(q.text)+'</div>';

  // Quantitative Comparison Card
  if(isQC){
    html+='<div class="fep-qc-card">';
    if(q.stem&&q.stem!==q.text) html+='<div class="fep-qc-stem">'+_maths(q.stem)+'</div>';
    html+='<div class="fep-qc-cols">';
    html+='<div class="fep-qc-col"><span class="fep-qc-label">'+(isAr?'العمود الأول (القيمة الأولى)':'Column A')+'</span><div class="fep-qc-val">'+_maths(String(q.colA||''))+'</div></div>';
    html+='<div class="fep-qc-col"><span class="fep-qc-label">'+(isAr?'العمود الثاني (القيمة الثانية)':'Column B')+'</span><div class="fep-qc-val">'+_maths(String(q.colB||''))+'</div></div>';
    html+='</div></div>';
  }

  // Figure or Data Table
  var _aiFig = q.figure || q.fig || q.table;
  if(_aiFig){
    if(typeof _aiFig === 'string'){
      html+='<div class="mfig">'+_aiFig+'</div>';
    } else {
      var fig=typeof renderMathFigure==='function'?renderMathFigure(_aiFig):(window._renderFig?window._renderFig(_aiFig):'');
      if(fig){
        html+='<div class="mfig">'+fig+'</div>';
      } else if((_aiFig.type==='table'||_aiFig.headers||_aiFig.rows||_aiFig.data)&&(_aiFig.rows||_aiFig.data)){
        html+='<div class="mfig" style="padding:10px"><table class="exam-table"><thead><tr>'+
          (_aiFig.headers||[]).map(function(h){return h?'<th>'+_maths(String(h))+'</th>':'<th><span class="sr-only">Row</span></th>';}).join('')+'</tr></thead><tbody>'+
          (_aiFig.rows||_aiFig.data||[]).map(function(row){return '<tr>'+(Array.isArray(row)?row.map(function(c){return '<td>'+_maths(String(c!=null?c:''))+'</td>';}).join(''):'<td>'+_maths(String(row))+'</td>')+'</tr>';}).join('')+
          '</tbody></table></div>';
      }
    }
  }

  // MCQ choices
  var chs=q.choices;
  if(isQC&&(!chs||!chs.length)){
    chs=isAr?[
      'القيمة في العمود الأول أكبر (أ)',
      'القيمة في العمود الثاني أكبر (ب)',
      'القيمتان متساويتان (ج)',
      'المعطيات غير كافية للمقارنة (د)'
    ]:[
      'The quantity in Column A is greater',
      'The quantity in Column B is greater',
      'The two quantities are equal',
      'The relationship cannot be determined from the information given'
    ];
  }
  if(q.type!=='frq'&&chs&&chs.length){
    html+='<div class="aiq-choices">';
    chs.forEach(function(ch,ci){
      var letter=letters[ci]||String.fromCharCode(65+ci);
      var chStr=_autoMath(ch);
      html+='<div class="aiq-choice" data-idx="'+ci+'" onclick="aiqSelect(this,'+idx+','+ci+')">';
      html+='<span class="aiq-cletter">'+letter+'</span>';
      html+='<span>'+_maths(chStr)+'</span>';
      html+='</div>';
    });
    html+='</div>';
  } else if(q.type==='frq'){
    html+='<div class="fep-work-space aiq-workspace" contenteditable="true" spellcheck="false">';
    html+='<div style="font-size:.8rem;color:var(--muted);margin-bottom:6px;font-style:italic">Show your working here…</div>';
    for(var li=0;li<5;li++) html+='<div class="fep-ws-line"></div>';
    html+='</div>';
    if(q.isSPR||(viewId==='sat'&&q.type==='frq')){
      html+='<div class="fep-spr-note">Enter your answer below. Write exact integers, terminating decimals, or fractions (e.g. 7/4).</div>';
    }
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
    var estTimeMin=Math.round(data.length * (viewId==='qudrat'||viewId==='tahsili' ? 1.0 : (viewId==='sat'||viewId==='est' ? 1.6 : 1.5)));
    var calcAllowed=!(viewId==='qudrat'||viewId==='tahsili'||viewId==='aslevel');
    var spec=window.examSpecs&&window.examSpecs[viewId];
    var examTitle=(spec&&spec.title)||viewId.toUpperCase();

    var headHtml='<div class="tg-head">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
        '<span class="tg-title">' + esc(examTitle) + ' Practice Test</span>' +
        '<span class="tg-ai-badge">✦ AI Real-Paper Standard</span>' +
      '</div>' +
      '<div class="fep-actions-bar no-print">' +
        '<button type="button" class="btn ghost small" onclick="window.tgPrint(this)" style="display:inline-flex;align-items:center;gap:6px">' +
          '<span>🖨</span> Print / Export PDF' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 14px;font-size:.82rem;color:var(--muted)">' +
      '<span style="padding:3px 10px;background:var(--card);border:1px solid var(--line);border-radius:20px">📝 ' + data.length + ' Questions</span>' +
      '<span style="padding:3px 10px;background:var(--card);border:1px solid var(--line);border-radius:20px">⏱ ~' + estTimeMin + ' min</span>' +
      '<span style="padding:3px 10px;background:var(--card);border:1px solid var(--line);border-radius:20px">🎯 ' + lvlLabel + '</span>' +
      '<span style="padding:3px 10px;background:var(--card);border:1px solid var(--line);border-radius:20px">' + (calcAllowed ? '🧮 Calculator Allowed' : '🚫 No Calculator') + '</span>' +
    '</div>' +
    examRefSheet(viewId) +
    (_assembly?window.ClipSATAssembler.complianceHTML(_bp,_assembly):'');

    out.innerHTML=headHtml;
    var _csCaptureQ=[];
    data.forEach(function(q,i){
      q.text=q.text||'';q.sol=q.sol||'';
      q=window._shuffleQ?window._shuffleQ(q):q; /* randomize correct-answer position */
      var div=document.createElement('div');
      div.innerHTML=renderAIQuestion(q,i,letters,viewId);
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
      var _fHtml = null;
      var _aiFig = q.figure || q.fig || q.table;
      if(_aiFig) {
        if(typeof _aiFig === 'string') _fHtml = _aiFig;
        else if(window.renderMathFigure) _fHtml = window.renderMathFigure(_aiFig);
        else if(window._renderFig) _fHtml = window._renderFig(_aiFig);
      }
      _csCaptureQ.push({text:q.text,choices:(q.type!=='frq'&&q.choices)?q.choices.slice():[],correctIndex:q.type!=='frq'?q.answer:null,type:q.type==='frq'?'frq':'mcq',points:1,figure:_aiFig||null,figureHtml:_fHtml||null});
    });
    // Sync show/hide answers button
    var ans=box.querySelector('.tg-ans');
    if(ans){ans.setAttribute('data-state','hidden');ans.textContent='Show all answers';}
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){});
    out.scrollIntoView({behavior:'smooth',block:'nearest'});
    document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genTest-ai',title:'AI-Generated Test',trackId:viewId,questions:_csCaptureQ,outEl:out}}));
  }).catch(function(err){
    out.innerHTML='<p class="tg-empty" style="color:#dc2626">Error: '+esc(err.message)+'<br><button class="btn ghost" onclick="window.openCloudAuthModal&&window.openCloudAuthModal()" style="margin-top:10px">☁️ Sign In / Account</button></p>';
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
  if(!s && s !== 0) return '';
  s = String(s);
  s = s.replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]');
  s = s.replace(/\$(?!\s)([^$\n]+?)(?<!\s)\$/g, function(m, inner){
    if(/^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/.test(inner)) return m;
    return '\\(' + inner + '\\)';
  });
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
    if(!inM&&s[i]==='\\'&&i+1<L&&(s[i+1]==='%'||s[i+1]==='$')){o+=s[i+1];i+=2;continue;}
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
  var spec=window.examSpecs&&(window.examSpecs[examName]||window.examSpecs[viewId]);
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
    var _csCaptureQ=qs.map(function(q){
      var _fHtml = null;
      var _aiFig = q.figure || q.fig || q.table;
      if(_aiFig) {
        if(typeof _aiFig === 'string') _fHtml = _aiFig;
        else if(window.renderMathFigure) _fHtml = window.renderMathFigure(_aiFig);
        else if(window._renderFig) _fHtml = window._renderFig(_aiFig);
      }
      return {text:q.text||'',choices:(q.type!=='frq'&&q.choices)?q.choices.slice():[],correctIndex:q.type!=='frq'?q.answer:null,type:q.type==='frq'?'frq':'mcq',points:1,figure:_aiFig||null,figureHtml:_fHtml||null};
    });

    var totalMCQ=0, totalFRQ=0;
    qs.forEach(function(q){
      if(q.type==='frq'||q.isSPR) totalFRQ++;
      else totalMCQ++;
    });
    var d=new Date();
    var dateStr=d.toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'});

    var examTitle=(spec&&spec.title)||examName;
    var examOrg=(spec&&spec.org)||(
      /qudrat|tahsili/.test(viewId)?'المركز الوطني للقياس (Qiyas) · Saudi Arabia':
      /sat|ap/.test(viewId)?'College Board Advanced Testing Standards':
      /igcse|aslevel|a2level/.test(viewId)?'Cambridge Assessment International Education':
      /est/.test(viewId)?'Egyptian Scholastic Test (Academic Assessment Ltd.)':
      /act/.test(viewId)?'ACT, Inc. Assessment Standards':
      /ib/.test(viewId)?'International Baccalaureate Organization':'ClipSAT Examination Board'
    );
    var totalTimeStr=(spec&&spec.totalTime)||(Math.round(qs.length*1.5)+' min');
    var logoTag=(spec&&spec.logo)||examTitle;

    var html='<div class="full-exam-paper">';

    // Action bar (Print + Help)
    html+='<div class="fep-actions-bar no-print">' +
      '<button type="button" class="btn primary small" onclick="window.tgPrint(this)" style="display:inline-flex;align-items:center;gap:6px">' +
        '<span>🖨</span> Print Full Examination (PDF)' +
      '</button>' +
      '<span style="font-size:.82rem;color:var(--muted)">Matches 100% real-paper format, cover sheet, reference tables &amp; bubble sheets</span>' +
    '</div>';

    // Official Cover Page
    html+='<div class="fep-cover-page">';
    html+='<div class="fep-official-bar">'+esc(examOrg)+'</div>';
    html+='<div class="fep-header">';
    html+='<div class="fep-logo-wrap" style="text-align:center;padding:10px 0 4px">' +
      '<img src="'+(document.getElementById('site-logo-img')||{src:'img/logo.png'}).src+'" class="fep-logo-img" alt="ClipSAT Logo" onerror="this.style.display=\'none\'">' +
    '</div>';
    html+='<div class="fep-top-bar"><span class="fep-exam-logo">'+esc(logoTag)+'</span><span class="fep-badge">Official Standard Practice Exam</span></div>';
    html+='<h1 class="fep-title">'+esc(examTitle)+'</h1>';

    html+='<div class="fep-total-bar">';
    html+='<div class="fep-total-item"><span class="fep-total-val">'+qs.length+'</span><span class="fep-total-lbl">Total Questions</span></div>';
    html+='<div class="fep-total-item"><span class="fep-total-val">'+esc(totalTimeStr)+'</span><span class="fep-total-lbl">Total Time</span></div>';
    if(totalMCQ>0) html+='<div class="fep-total-item"><span class="fep-total-val">'+totalMCQ+'</span><span class="fep-total-lbl">Multiple Choice</span></div>';
    if(totalFRQ>0) html+='<div class="fep-total-item"><span class="fep-total-val">'+totalFRQ+'</span><span class="fep-total-lbl">Free Response / SPR</span></div>';
    html+='</div>';

    html+='<div class="fep-meta-grid">';
    html+='<div class="fep-meta-cell"><span class="fep-mlabel">Candidate Name</span><span class="fep-mline"></span></div>';
    html+='<div class="fep-meta-cell"><span class="fep-mlabel">Date</span><span class="fep-mval">'+dateStr+'</span></div>';
    html+='<div class="fep-meta-cell"><span class="fep-mlabel">Centre / School Code</span><span class="fep-mline"></span></div>';
    html+='<div class="fep-meta-cell fep-score-cell"><span class="fep-mlabel">Score Obtained</span><span class="fep-score-box-big">____&nbsp;/&nbsp;'+qs.length+'</span></div>';
    html+='</div>';

    var instructions=(spec&&spec.instructions)||[
      'Write your name, centre number, and candidate details in the spaces at the top of this page.',
      'Answer all questions. Check that you have all pages of this examination.',
      'For multiple-choice questions, mark your answer clearly on the answer sheet provided.',
      'For free-response questions, show all necessary working clearly. Marks may be awarded for correct methodology.',
      'Give non-exact numerical answers correct to 3 significant figures unless a different degree of accuracy is specified.',
      'Check whether calculators are permitted or prohibited for each specific section.'
    ];
    html+='<div class="fep-instr-box"><strong>Instructions to Candidates</strong><ul class="fep-instr-list">';
    instructions.forEach(function(ins){ html+='<li>'+esc(ins)+'</li>'; });
    html+='</ul></div>';

    html+='<div class="fep-instr-box" style="margin-top:16px"><strong>Examination Structure &amp; Timing</strong>';
    html+='<table style="width:100%;border-collapse:collapse;font-family:var(--sans);font-size:.82rem;margin-top:8px">';
    html+='<tr style="background:#f0f4fc"><th style="padding:6px 10px;text-align:left;border:1px solid #c5cde8">Section / Module</th><th style="padding:6px 10px;text-align:left;border:1px solid #c5cde8">Time Allowed</th><th style="padding:6px 10px;text-align:center;border:1px solid #c5cde8">Questions</th><th style="padding:6px 10px;text-align:center;border:1px solid #c5cde8">Calculator</th></tr>';
    sections.forEach(function(sec, sIdx){
      var secQs = qs.filter(function(q){ return q._part === sIdx; });
      var qCount = secQs.length || sec.q || 0;
      var calcBool = sec.calc !== false;
      html+='<tr>' +
        '<td style="padding:6px 10px;border:1px solid #c5cde8"><strong>'+esc(sec.title)+'</strong>'+(sec.notes?'<br><small style="color:var(--muted)">'+esc(sec.notes)+'</small>':'')+'</td>' +
        '<td style="padding:6px 10px;border:1px solid #c5cde8;white-space:nowrap">'+esc(sec.time||'Standard')+'</td>' +
        '<td style="padding:6px 10px;border:1px solid #c5cde8;text-align:center">'+qCount+'</td>' +
        '<td style="padding:6px 10px;border:1px solid #c5cde8;text-align:center"><span class="fep-calc-badge '+(calcBool?'fep-calc-yes':'fep-calc-no')+'">'+(calcBool?'Permitted':'Prohibited')+'</span></td>' +
      '</tr>';
    });
    html+='</table></div>';
    html+='</div></div>'; // end fep-header, end fep-cover-page

    // Formula & Reference Sheet
    html+=examRefSheet(viewId);

    // Compliance HTML
    if(_assembly) html+=window.ClipSATAssembler.complianceHTML(_bp,_assembly);

    // Bubble sheet for MCQ
    if(totalMCQ>0){
      html+='<div class="fep-anssheet" style="page-break-before:always"><div class="fep-anssheet-title">Answer Sheet — Multiple Choice ('+totalMCQ+' questions)</div><div class="fep-bubbles" style="--fep-nopt:'+letters.length+'">';
      var bNum=0;
      qs.forEach(function(q){
        if(q.type==='frq'||q.isSPR) return;
        bNum++;
        html+='<div class="fep-bubble-row"><span class="fep-bnum">'+bNum+'</span>';
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
      var calcBool=sec.calc!==false;
      html+='<div class="fep-section" style="page-break-before:'+(si>0?'always':'auto')+'">';
      html+='<div class="fep-section-head">' +
        '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
          '<span>'+esc(sec.title)+'</span>' +
          '<span class="fep-calc-badge '+(calcBool?'fep-calc-yes':'fep-calc-no')+'">'+(calcBool?'🧮 Calculator Permitted':'🚫 No Calculator')+'</span>' +
        '</div>' +
        (sec.time?'<span style="font-size:.85rem;color:var(--muted);font-weight:600">⏱ '+esc(sec.time)+'</span>':'') +
      '</div>';
      if(sec.notes) html+='<p style="font-size:.85rem;color:var(--muted);margin:0 0 16px;font-style:italic">'+esc(sec.notes)+'</p>';
      secQs.forEach(function(q,qsi){
        qi++;
        var itemAttrs=' data-idx="'+qi+'"';
        if(q.answer!=null) itemAttrs+=' data-answer="'+q.answer+'"';
        if(typeof q.numericAnswer==='number'&&isFinite(q.numericAnswer)){
          itemAttrs+=' data-numeric-answer="'+q.numericAnswer+'"';
          if(typeof q.tolerance==='number'&&isFinite(q.tolerance)) itemAttrs+=' data-tolerance="'+q.tolerance+'"';
        } else if(typeof q.answerExpr==='string'&&q.answerExpr.trim()){
          itemAttrs+=' data-answer-expr="'+esc(q.answerExpr.trim())+'"';
          if(Array.isArray(q.answerVars)&&q.answerVars.length) itemAttrs+=' data-answer-vars="'+esc(q.answerVars.join(','))+'"';
        }
        var isQC=!!(q.isQC||q.qc||(q.colA!=null&&q.colB!=null));
        var isAr=(viewId==='qudrat'||viewId==='tahsili'||/[\u0600-\u06FF]/.test(String(q.text||'')+String(q.colA||'')));

        html+='<div class="fep-item aiq"'+itemAttrs+'>';
        html+='<div class="fep-item-head">';
        html+='<span class="fep-inum">'+qi+'</span>';
        html+='<span class="fep-domain-tag">'+esc(q.domain||'')+'</span>';
        if(q.marks||q.mark) html+='<span class="fep-mark-badge">['+(q.marks||q.mark)+' '+((q.marks||q.mark)===1?'mark':'marks')+']</span>';
        if(q.isSPR||(viewId==='sat'&&q.type==='frq')) html+='<span class="fep-spr-badge">Student-Produced Response</span>';
        if((('_verified' in q)||q._fromBank)&&window.ClipSATVerifyAI) html+=window.ClipSATVerifyAI.badgeHTML(q);
        html+='</div>';

        var _pFig = q.figure || q.fig || q.table;
        if(_pFig){
          var pfig = '';
          if(typeof _pFig === 'string') pfig = _pFig;
          else if(typeof renderMathFigure === 'function') pfig = renderMathFigure(_pFig);
          else if(window._renderFig) pfig = window._renderFig(_pFig);
          if(!pfig && (_pFig.type === 'table' || _pFig.headers || _pFig.rows || _pFig.data)){
            pfig = '<table class="exam-table"><thead><tr>'+
              (_pFig.headers||[]).map(function(h){return h?'<th>'+_maths(String(h))+'</th>':'<th><span class="sr-only">Row label</span></th>';}).join('')+'</tr></thead><tbody>'+
              (_pFig.rows||_pFig.data||[]).map(function(row){return '<tr>'+(Array.isArray(row)?row.map(function(c){return '<td>'+_maths(String(c!=null?c:''))+'</td>';}).join(''):'<td>'+_maths(String(row))+'</td>')+'</tr>';}).join('')+
              '</tbody></table>';
          }
          if(pfig) html+='<div class="mfig fep-figure">'+pfig+'</div>';
        }

        html+='<div class="fep-qbody aiq-text">'+_maths(String(q.text||''))+'</div>';

        // Quantitative Comparison Card
        if(isQC){
          html+='<div class="fep-qc-card">';
          if(q.stem&&q.stem!==q.text) html+='<div class="fep-qc-stem">'+_maths(q.stem)+'</div>';
          html+='<div class="fep-qc-cols">';
          html+='<div class="fep-qc-col"><span class="fep-qc-label">'+(isAr?'العمود الأول (القيمة الأولى)':'Column A')+'</span><div class="fep-qc-val">'+_maths(String(q.colA||''))+'</div></div>';
          html+='<div class="fep-qc-col"><span class="fep-qc-label">'+(isAr?'العمود الثاني (القيمة الثانية)':'Column B')+'</span><div class="fep-qc-val">'+_maths(String(q.colB||''))+'</div></div>';
          html+='</div></div>';
        }

        var chs=q.choices;
        if(isQC&&(!chs||!chs.length)){
          chs=isAr?[
            'القيمة في العمود الأول أكبر (أ)',
            'القيمة في العمود الثاني أكبر (ب)',
            'القيمتان متساويتان (ج)',
            'المعطيات غير كافية للمقارنة (د)'
          ]:[
            'The quantity in Column A is greater',
            'The quantity in Column B is greater',
            'The two quantities are equal',
            'The relationship cannot be determined from the information given'
          ];
        }

        if(q.type!=='frq'&&chs){
          html+='<div class="fep-choices aiq-choices">';
          chs.forEach(function(ch,ci){
            var letter=letters[ci]||String.fromCharCode(65+ci);
            var s=_autoMath(ch);
            html+='<div class="fep-choice aiq-choice" data-idx="'+ci+'" onclick="aiqSelect(this,'+qi+','+ci+')">';
            html+='<span class="fep-cletter aiq-cletter">'+letter+'</span>';
            html+='<span class="fep-ctext">'+_maths(s)+'</span></div>';
          });
          html+='</div>';
        } else {
          html+='<div class="fep-work-space aiq-workspace" contenteditable="true" spellcheck="false">';
          html+='<div style="font-size:.8rem;color:var(--muted);margin-bottom:6px;font-style:italic">Show your working here…</div>';
          for(var li=0;li<6;li++) html+='<div class="fep-ws-line"></div>';
          html+='</div>';
          if(q.isSPR||(viewId==='sat'&&q.type==='frq')){
            html+='<div class="fep-spr-note">Enter your answer below. Write exact integers, terminating decimals, or fractions (e.g. 7/4).</div>';
          }
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

    // Answer key & Solutions
    html+='<div class="fep-key-section"><div style="font-weight:700;font-size:1rem;color:#1e3a6e;padding:14px 18px;border-bottom:1px solid var(--line);cursor:pointer;display:flex;justify-content:space-between;align-items:center" onclick="this.nextElementSibling.classList.toggle(\'open\')">Official Worked Solutions &amp; Marking Scheme <span>▸</span></div>';
    html+='<div style="display:none" class="fep-key-grid open">';
    qs.forEach(function(q,qi2){
      if(q.sol){
        var markTxt = (q.marks||q.mark)?' ['+(q.marks||q.mark)+' marks]':'';
        html+='<div class="fep-sol-block"><strong>Q'+(qi2+1)+(q.type!=='frq'&&q.answer!=null?' ['+letters[q.answer||0]+']':' [FRQ]')+markTxt+' — '+esc(q.domain||'')+'</strong><div>'+_maths(q.sol)+'</div></div>';
      }
    });
    html+='</div></div>';
    html+='</div>';

    out.innerHTML=html;
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([out]).catch(function(){});
    out.scrollIntoView({behavior:'smooth',block:'start'});
    document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genFullExam-ai',title:examName,trackId:viewId,questions:_csCaptureQ,outEl:out}}));
  }).catch(function(err){
    out.innerHTML='<p style="color:#dc2626">Error: '+esc(err.message)+'<br><button class="btn ghost" onclick="window.openCloudAuthModal&&window.openCloudAuthModal()" style="margin-top:10px">☁️ Sign In / Account</button></p>';
  });
};


window.CSAITest={genTest:aiGenTest, genFullExam:aiGenFullExam};
})();
