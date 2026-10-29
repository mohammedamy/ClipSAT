/* ═══════════════════════════════════════════════════════════════════════════
   02e-question-bank-and-syllabus.js — Question Bank Loader, QB & Syllabus Map
   Extracted from 02-core-app.js (Pillar 5 Modularization).
   Provides window.CS_loadTrackBank, window.QB, window.SM, window._ensureFigures,
   window._shuffle, window._shuffleQ, window._ensureBankExam, and genFullExam.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  /* ===================== FULL EXAM QUESTION BANK ===================== */
  window.fullExamBank = {};
  window.CS_BANK_LOADED = {};
  window.CS_loadTrackBank = function(trackId){
    if(!trackId||trackId==='home') return Promise.resolve(null);
    if(window.CS_BANK_LOADED[trackId]) return window.CS_BANK_LOADED[trackId];
    var p = fetch('/bank-data/'+trackId+'.json?v=20261028a')
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(data){
        if(data){
          if(!data.pool && (data.easy||data.medium||data.hard)){
            var _cvt=function(a,diff){
              return(a||[]).map(function(q){
                return Object.assign({}, q, {
                  type: q.type || 'mcq',
                  difficulty: q.difficulty || diff,
                  domain: q.domain || q.topic || 'Mathematics',
                  text: q.text || q.q || '',
                  choices: q.choices || [],
                  answer: q.answer,
                  ans: q.ans,
                  sol: q.sol || q.exp || q.expl || '',
                  hints: q.hints,
                  figure: q.figure || q.fig,
                  marks: q.marks,
                  paper: q.paper,
                  course: q.course,
                  ibSection: q.ibSection,
                  calc: q.calc
                });
              });
            };
            data.pool=_cvt(data.easy,'easy').concat(_cvt(data.medium,'medium')).concat(_cvt(data.hard,'hard'));
          }
          window.fullExamBank[trackId]=data;
        }
        return data;
      })
      .catch(function(){ return null; });
    window.CS_BANK_LOADED[trackId] = p;
    return p;
  };

  /* Lightweight per-chapter shard loader (~50 KB vs ~2 MB full bank) for instant topic drills */
  window.CS_SHARD_CACHE = {};
  window.CS_loadTopicShard = function(trackId, topicId){
    if(!trackId || trackId === 'home' || !topicId) return window.CS_loadTrackBank(trackId);
    var full = window.fullExamBank && window.fullExamBank[trackId];
    if(full && Array.isArray(full.pool)){
      var filtered = full.pool.filter(function(q){ return q.topic_id === topicId; });
      if(filtered.length) return Promise.resolve({ track: trackId, topic_id: topicId, pool: filtered });
    }
    var key = trackId + ':' + topicId;
    if(window.CS_SHARD_CACHE[key]) return Promise.resolve(window.CS_SHARD_CACHE[key]);
    var cleanTid = String(topicId).replace(/[^a-zA-Z0-9_-]/g, '');
    return fetch('/bank-shards/' + trackId + '/' + cleanTid + '.json?v=20261029a')
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(shard){
        if(shard && Array.isArray(shard.pool) && shard.pool.length){
          window.CS_SHARD_CACHE[key] = shard;
          return shard;
        }
        return window.CS_loadTrackBank(trackId);
      })
      .catch(function(){
        return window.CS_loadTrackBank(trackId);
      });
  };

  window.CS_bankReady = window.CS_loadTrackBank(window.CLIPSAT_TRACK);

  /* ===================== QB — Question Bank Module ===================== */
  window.QB = (function(){
    var _banks = {};
    function register(viewId, questions){
      _banks[viewId] = (_banks[viewId]||[]).concat(questions);
    }
    function get(viewId){ return _banks[viewId]||[]; }
    function getById(id){
      var parts=String(id||'').split('-'); var viewId=parts[0];
      var pool=get(viewId);
      for(var i=0;i<pool.length;i++){ if(pool[i].id===id) return pool[i]; }
      return null;
    }
    function filter(viewId, opts){
      return get(viewId).filter(function(q){
        if(opts.difficulty && q.difficulty!==opts.difficulty) return false;
        if(opts.domain && q.domain!==opts.domain) return false;
        if(opts.type && q.type!==opts.type) return false;
        if(opts.tags && opts.tags.length){
          var match=opts.tags.some(function(t){ return (q.tags||[]).indexOf(t)!==-1; });
          if(!match) return false;
        }
        return true;
      });
    }
    return {register:register, get:get, getById:getById, filter:filter};
  }());

  window.QB_migrate = function(){
    Object.keys(window.fullExamBank||{}).forEach(function(viewId){
      var bank=window.fullExamBank[viewId];
      var raw;
      if(bank.pool){ raw=bank.pool; }
      else{
        raw=[].concat(
          (bank.easy||[]).map(function(q){return Object.assign({},q,{difficulty:'easy'});}),
          (bank.medium||[]).map(function(q){return Object.assign({},q,{difficulty:'medium'});}),
          (bank.hard||[]).map(function(q){return Object.assign({},q,{difficulty:'hard'});})
        );
      }
      raw=raw.filter(Boolean);
      var questions=raw.map(function(q,i){
        var diff=q.difficulty||'medium';
        var domSlug=(q.domain||'gen').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
        return {
          id:         viewId+'-'+domSlug+'-'+String(i+1).padStart(3,'0'),
          viewId:     viewId,
          type:       q.type||'mcq',
          domain:     q.domain||'Mathematics',
          tags:       q.tags||[],
          difficulty: diff,
          text:       q.text||q.q||'',
          choices:    q.choices,
          answer:     q.answer,
          gridIn:     q.gridIn,
          sol:        q.sol||'',
          hints:      q.hints,
          fig:        q.fig,
          figure:     q.figure,
          src:        q.src||''
        };
      });
      window.QB.register(viewId, questions);
    });
  };
  window.CS_bankReady.then(function(){ window.QB_migrate(); });

  /* ===================== SM — Syllabus Map Module ===================== */
  window.SM = (function(){
    var _maps = {};
    function register(map){ _maps[map.viewId]=map; }
    function get(viewId){ return _maps[viewId]||null; }
    function topicForQuestion(q){
      var map=_maps[q.viewId]; if(!map) return null;
      for(var i=0;i<map.topics.length;i++){
        var t=map.topics[i]; var tags=q.tags||[];
        for(var j=0;j<tags.length;j++){ if(t.tags.indexOf(tags[j])!==-1) return t; }
      }
      return null;
    }
    return {register:register, get:get, topicForQuestion:topicForQuestion};
  }());

  /* ── Register all exam track syllabus maps ── */
  (function(){
    var R=window.SM.register.bind(window.SM);

    R({viewId:'sat', name:'Digital SAT Math', topics:[
      {id:'sat-algebra',   label:'Algebra',                    tags:['linear','inequality','system','slope'],        examWeight:35, chapterId:'sat-ch-algebra'},
      {id:'sat-advanced',  label:'Advanced Math',              tags:['quadratic','polynomial','rational','radical'],  examWeight:35, chapterId:'sat-ch-advanced'},
      {id:'sat-problem',   label:'Problem-Solving & Data',     tags:['ratio','percent','statistics','data'],          examWeight:15, chapterId:'sat-ch-data'},
      {id:'sat-geometry',  label:'Geometry & Trigonometry',    tags:['circle','triangle','trig','geometry'],          examWeight:15, chapterId:'sat-ch-geometry'}
    ]});

    R({viewId:'est', name:'EST I Math', topics:[
      {id:'est-number',    label:'Number & Operations',        tags:['number','integer','fraction'],                  examWeight:20, chapterId:'est-ch-number'},
      {id:'est-algebra',   label:'Algebra',                    tags:['linear','quadratic','equation'],                examWeight:30, chapterId:'est-ch-algebra'},
      {id:'est-functions', label:'Functions',                  tags:['function','domain','range','composite'],        examWeight:25, chapterId:'est-ch-functions'},
      {id:'est-geometry',  label:'Geometry & Measurement',     tags:['geometry','area','volume','trig'],              examWeight:25, chapterId:'est-ch-geometry'}
    ]});

    R({viewId:'act', name:'ACT Math', topics:[
      {id:'act-prepre',    label:'Preparing for HS Math',      tags:['number','fraction','integer'],                  examWeight:20, chapterId:'act-ch-prepre'},
      {id:'act-essential', label:'Essential Skills',           tags:['ratio','percent','proportion'],                  examWeight:15, chapterId:'act-ch-essential'},
      {id:'act-algebra',   label:'Algebra',                    tags:['linear','quadratic','polynomial'],              examWeight:15, chapterId:'act-ch-algebra'},
      {id:'act-functions', label:'Functions',                  tags:['function','exponential','logarithm'],           examWeight:15, chapterId:'act-ch-functions'},
      {id:'act-geometry',  label:'Geometry',                   tags:['geometry','circle','triangle'],                 examWeight:20, chapterId:'act-ch-geometry'},
      {id:'act-stats',     label:'Statistics & Probability',   tags:['statistics','probability','data'],              examWeight:15, chapterId:'act-ch-stats'}
    ]});

    R({viewId:'igcse', name:'Cambridge IGCSE 0580', topics:[
      {id:'igcse-number',  label:'Number',                     tags:['number','fraction','percentage','ratio'],       examWeight:30, chapterId:'ig-number'},
      {id:'igcse-algebra', label:'Algebra & Graphs',           tags:['algebra','quadratic','function','graph'],       examWeight:30, chapterId:'ig-algebra'},
      {id:'igcse-geometry',label:'Geometry',                   tags:['geometry','circle','angle','construction'],     examWeight:20, chapterId:'ig-geometry'},
      {id:'igcse-stats',   label:'Statistics & Probability',   tags:['statistics','probability','data'],              examWeight:20, chapterId:'ig-stats'}
    ]});

    R({viewId:'aslevel', name:'Cambridge AS Level 9709', topics:[
      {id:'as-pure1',      label:'Pure Mathematics 1',         tags:['functions','coordinate','sequence','trig','calculus'],  examWeight:40, chapterId:'as-ch-pure1'},
      {id:'as-mech',       label:'Mechanics',                  tags:['forces','kinematics','newton','energy'],               examWeight:30, chapterId:'as-ch-mech'},
      {id:'as-stats',      label:'Statistics',                 tags:['probability','distribution','binomial','normal'],      examWeight:30, chapterId:'as-ch-stats'}
    ]});

    R({viewId:'a2level', name:'Cambridge A2 Level 9709', topics:[
      {id:'a2-pure3',      label:'Pure Mathematics 3',         tags:['complex','differential','integration','vector'],       examWeight:40, chapterId:'a2-ch-pure3'},
      {id:'a2-mech',       label:'Mechanics',                  tags:['circular','momentum','rigid'],                         examWeight:30, chapterId:'a2-ch-mech'},
      {id:'a2-stats',      label:'Statistics',                 tags:['poisson','hypothesis','chi','regression'],             examWeight:30, chapterId:'a2-ch-stats'}
    ]});

    R({viewId:'ibsl', name:'IB DP Mathematics SL (AA & AI)', topics:[
      {id:'ibsl-t1',       label:'Topic 1: Number & Algebra',          tags:['sequences','binomial','logarithm','amortization','proof'],      examWeight:14, chapterId:'ibsl-t1'},
      {id:'ibsl-t2',       label:'Topic 2: Functions',                 tags:['function','inverse','exponential','quadratic','modelling'],     examWeight:16, chapterId:'ibsl-t2'},
      {id:'ibsl-t3',       label:'Topic 3: Geometry & Trigonometry',   tags:['circle','trig','sine-rule','cosine-rule','voronoi'],            examWeight:16, chapterId:'ibsl-t3'},
      {id:'ibsl-t4',       label:'Topic 4: Statistics & Probability',  tags:['statistics','normal','binomial','regression','conditional'],    examWeight:18, chapterId:'ibsl-t4'},
      {id:'ibsl-t5',       label:'Topic 5: Calculus',                  tags:['derivative','integral','kinematics','optimization','trapezoid'],examWeight:18, chapterId:'ibsl-t5'},
      {id:'ibsl-ai',       label:'AI SL Extensions (Voronoi, Chi-Sq & t-Test)', tags:['voronoi','chi-squared','t-test','spearman'],          examWeight:9,  chapterId:'ibsl-ai'},
      {id:'ibsl-aa',       label:'AA SL Analytical Proofs, Exact Trig & Kinematics', tags:['binomial','proof','exact-trig','kinematics'],    examWeight:9,  chapterId:'ibsl-aa'}
    ]});

    R({viewId:'ibhl', name:'IB DP Mathematics HL (AA & AI)', topics:[
      {id:'ibhl-t1',       label:'Topic 1: Number & Algebra (Complex & Matrices)', tags:['complex','induction','de-moivre','matrix','eigenvalue'], examWeight:15, chapterId:'ibhl-t1'},
      {id:'ibhl-t2',       label:'Topic 2: Functions (Polynomials & Rational)',    tags:['rational','odd-even','transformation','vieta','modulus'],examWeight:13, chapterId:'ibhl-t2'},
      {id:'ibhl-t3',       label:'Topic 3: Geometry, Trig & 3D Vectors',           tags:['vector3d','planes','cross-product','trig-identities'],  examWeight:15, chapterId:'ibhl-t3'},
      {id:'ibhl-t4',       label:'Topic 4: Statistics & Probability Distributions',tags:['bayes','continuous-rv','poisson','chi-squared'],        examWeight:15, chapterId:'ibhl-t4'},
      {id:'ibhl-t5',       label:'Topic 5: HL Calculus & Differential Equations',  tags:['limits','differential-equations','maclaurin','euler'],  examWeight:22, chapterId:'ibhl-t5'},
      {id:'ibhl-aa',       label:'AA HL Deep Dive (Proofs, Series & ODEs)',        tags:['induction','maclaurin','integrating-factor'],           examWeight:10, chapterId:'ibhl-aa'},
      {id:'ibhl-aihl',     label:'AI HL Extensions (Graph Theory, Phase Portraits & Markov)', tags:['graph-theory','markov','coupled-ode','phase-portrait'], examWeight:10, chapterId:'ibhl-aihl'}
    ]});

    R({viewId:'appc', name:'AP Precalculus', topics:[
      {id:'appc-u1',       label:'Polynomial & Rational Functions',  tags:['polynomial','rational','rate-of-change'],        examWeight:18, chapterId:'appc-u1'},
      {id:'appc-u1b',      label:'Rational Asymptotes & Polynomial Inequalities', tags:['asymptote','end-behavior','inequality'], examWeight:14, chapterId:'appc-u1b'},
      {id:'appc-u2',       label:'Exponential & Logarithmic',        tags:['exponential','logarithm','half-life'],           examWeight:16, chapterId:'appc-u2'},
      {id:'appc-u2b',      label:'Logarithmic Modeling & Semi-Log Linearization', tags:['semi-log','residual','logistic'],   examWeight:12, chapterId:'appc-u2b'},
      {id:'appc-u3',       label:'Trigonometric & Polar',            tags:['sinusoidal','polar','trig'],                     examWeight:16, chapterId:'appc-u3'},
      {id:'appc-u3b',      label:'Polar Roses, Limacons & Complex Polar Form', tags:['polar-graph','de-moivre','complex'],   examWeight:12, chapterId:'appc-u3b'},
      {id:'appc-u4',       label:'Functions Involving Parameters',   tags:['parametric','vector','implicit'],                examWeight:12, chapterId:'appc-u4'}
    ]});

    R({viewId:'apstats', name:'AP Statistics', topics:[
      {id:'aps-explore',   label:'Exploring One- & Two-Variable Data', tags:['distribution','summary','graph'],              examWeight:16, chapterId:'aps-u1'},
      {id:'aps-collect',   label:'Collecting Data (Sampling & Design)', tags:['sampling','experiment','bias'],               examWeight:12, chapterId:'aps-u2'},
      {id:'aps-prob',      label:'Probability & Random Variables',   tags:['probability','normal','binomial','geometric'],   examWeight:16, chapterId:'aps-u3'},
      {id:'aps-inference', label:'Sampling Distributions & CI',      tags:['confidence','sampling-distribution','clt'],      examWeight:14, chapterId:'aps-u4'},
      {id:'aps-u5',        label:'Inference for Categorical Data (Proportions)', tags:['z-test','proportion','p-value'],     examWeight:14, chapterId:'aps-u5'},
      {id:'aps-u6',        label:'Inference for Quantitative Data (Means)', tags:['t-test','paired','degrees-of-freedom'],   examWeight:14, chapterId:'aps-u6'},
      {id:'aps-u7',        label:'Chi-Square Tests & Inference for Slopes', tags:['chi-square','slope-inference','gof'],     examWeight:14, chapterId:'aps-u7'}
    ]});

    R({viewId:'qudrat', name:'Qudrat (GAT — قدرات كمي)', topics:[
      {id:'qud-arithmetic', label:'Arithmetic & Number Sense',         tags:['number','fraction','divisibility','lcm'],        examWeight:14, chapterId:'qud-arithmetic'},
      {id:'qud-ratio',      label:'Ratios, Proportions & Percentages', tags:['ratio','percent','zakat','discount'],            examWeight:12, chapterId:'qud-ratio'},
      {id:'qud-algebra',    label:'Algebra, Exponents & Radicals',     tags:['equation','inequality','exponent','radical'],    examWeight:14, chapterId:'qud-algebra'},
      {id:'qud-geometry',   label:'Geometry & Shaded Regions',         tags:['geometry','shaded','circle','triangle','area'],  examWeight:18, chapterId:'qud-geometry'},
      {id:'qud-word',       label:'Word Problems, Motion & Work',      tags:['motion','speed','work','age','mixture'],         examWeight:12, chapterId:'qud-word'},
      {id:'qud-compare',    label:'Quantitative Comparison (المقارنات)', tags:['comparison','compare','quantity'],              examWeight:12, chapterId:'qud-compare'},
      {id:'qud-patterns',   label:'Sequences, Clock Angles & Cycles',  tags:['pattern','sequence','clock','calendar'],         examWeight:6,  chapterId:'qud-patterns'},
      {id:'qud-data',       label:'Statistics, Pie/Bar Charts & Prob', tags:['statistics','probability','pie','bar','mean'],   examWeight:6,  chapterId:'qud-data'},
      {id:'qud-strategy',   label:'High-Speed Qiyas Shortcuts',        tags:['shortcut','backsolve','plug-in','mental'],       examWeight:6,  chapterId:'qud-about'}
    ]});

    R({viewId:'tahsili', name:'Tahsili (SAAT — تحصيلي رياضيات)', topics:[
      {id:'tah-logic',      label:'Y1: Logic, Reasoning & Proof',      tags:['logic','contrapositive','polygon','similarity'], examWeight:8,  chapterId:'tah-about'},
      {id:'tah-algebra',    label:'Y2: Matrices, Determinants & Complex', tags:['matrix','determinant','cramer','complex'],    examWeight:12, chapterId:'tah-algebra'},
      {id:'tah-functions',  label:'Y2/Y3: Polynomial, Rational & Inverse', tags:['polynomial','rational','asymptote','domain'],examWeight:10, chapterId:'tah-functions'},
      {id:'tah-sequences',  label:'Y2: Sequences, Series & Binomial',  tags:['arithmetic','geometric','infinite','binomial'],  examWeight:8,  chapterId:'tah-sequences'},
      {id:'tah-trig',       label:'Y2/Y3: Trigonometry & Identities',  tags:['trig','sine-law','cosine-law','double-angle'],   examWeight:10, chapterId:'tah-trig'},
      {id:'tah-geometry',   label:'Y1/Y3: Conic Sections, Vectors & Polar', tags:['conic','ellipse','hyperbola','vector','polar'],examWeight:14, chapterId:'tah-geometry'},
      {id:'tah-explog',     label:'Y3: Exponential & Logarithmic',     tags:['exponential','logarithm','change-of-base'],      examWeight:8,  chapterId:'tah-explog'},
      {id:'tah-calc1',      label:'Y3: Limits & Differential Calculus',tags:['limit','derivative','tangent','critical-point'], examWeight:12, chapterId:'tah-calc1'},
      {id:'tah-calc2',      label:'Y3: Integral Calculus & Area',      tags:['integral','antiderivative','area','ftc'],        examWeight:10, chapterId:'tah-calc2'},
      {id:'tah-stats',      label:'Y2/Y3: Probability & Normal Dist',  tags:['probability','conditional','binomial','normal'], examWeight:8,  chapterId:'tah-stats'}
    ]});

    R({viewId:'precalc', name:'Precalculus', topics:[
      {id:'pc-functions',  label:'Functions',                  tags:['function','composition','inverse'],                    examWeight:25, chapterId:'pc-ch-functions'},
      {id:'pc-trig',       label:'Trigonometry',               tags:['trig','unit-circle','identities'],                    examWeight:30, chapterId:'pc-ch-trig'},
      {id:'pc-advanced',   label:'Advanced Topics',            tags:['complex','polar','conics','vectors'],                  examWeight:45, chapterId:'pc-ch-advanced'}
    ]});

    R({viewId:'addmath', name:'Additional Mathematics', topics:[
      {id:'am-functions', label:'Functions & Quadratics', tags:['function','modulus','inverse','quadratic'], examWeight:25, chapterId:'am-functions-quadratics'},
      {id:'am-calc', label:'Calculus & Rates', tags:['differentiation','integration','rates','chain-rule'], examWeight:35, chapterId:'am-differentiation-rates'},
      {id:'am-trig', label:'Trigonometry & Circular Measure', tags:['radian','sector','trig','identity'], examWeight:20, chapterId:'am-trigonometry-circular'},
      {id:'am-vectors', label:'Vectors & Kinematics', tags:['vector','dot-product','kinematics','velocity'], examWeight:20, chapterId:'am-vectors-2d'}
    ]});

    R({viewId:'mathai', name:'Math for AI & Data Science', topics:[
      {id:'ai-vectors', label:'Vectors & Embeddings', tags:['vector','norm','embedding','cosine'], examWeight:25, chapterId:'ai-vectors-embeddings'},
      {id:'ai-matrices', label:'Matrices & Neural Layers', tags:['matrix','activation','relu','dense'], examWeight:25, chapterId:'ai-matrices-layers'},
      {id:'ai-optimization', label:'Gradient Descent & Loss', tags:['gradient','loss','optimization','descent'], examWeight:25, chapterId:'ai-calculus-gradients'},
      {id:'ai-probability', label:'Probability, Bayes & PCA', tags:['bayes','mle','regression','pca'], examWeight:25, chapterId:'ai-probability-bayes'}
    ]});

    R({viewId:'edexcel', name:'Pearson Edexcel IGCSE (4MA1)', topics:[
      {id:'edx-number', label:'Number, Surds, Bounds & Set Theory', tags:['surds','bounds','sets','venn'], examWeight:15, chapterId:'edx-number-surds-sets'},
      {id:'edx-algebra', label:'Algebraic Fractions, Quadratics & Series', tags:['algebra','quadratic','functions','sequences'], examWeight:35, chapterId:'edx-algebra-quadratics'},
      {id:'edx-geometry', label:'Circle Theorems, 3D Trig & Vectors', tags:['circle','trigonometry','vectors','mensuration'], examWeight:30, chapterId:'edx-geometry-circles'},
      {id:'edx-calc-stats', label:'Differentiation, Kinematics & Histograms', tags:['differentiation','kinematics','histogram','probability'], examWeight:20, chapterId:'edx-calculus-kinematics'}
    ]});

    R({viewId:'gaten', name:'English GAT & SAAT (Qiyas)', topics:[
      {id:'ge-gat-quant', label:'GAT Arithmetic Shortcuts, Ratios & Motion', tags:['arithmetic','ratios','work','motion'], examWeight:30, chapterId:'ge-arithmetic-shortcuts'},
      {id:'ge-gat-qc', label:'GAT Quantitative Comparisons & Data', tags:['comparison','geometry','statistics','counting'], examWeight:20, chapterId:'ge-quant-comparisons'},
      {id:'ge-saat-alg', label:'SAAT Logic, Matrices, Functions & Logs', tags:['matrices','complex','rational','logarithms'], examWeight:25, chapterId:'ge-saat-algebra-matrices'},
      {id:'ge-saat-calc', label:'SAAT Conics, Vectors & Calculus', tags:['conics','vectors','limits','derivatives','integrals'], examWeight:25, chapterId:'ge-saat-calculus'}
    ]});

    R({viewId:'olympiad', name:'Contest Math & Olympiad (NSMO & KAUST)', topics:[
      {id:'ol-alg-nt', label:'Olympiad Algebra, Vieta & Number Theory', tags:['vieta','inequalities','modular','diophantine'], examWeight:20, chapterId:'ol-algebraic-techniques'},
      {id:'ol-combo', label:'Bijective Counting, Recurrences & Probability', tags:['combinatorics','pigeonhole','recurrence','probability'], examWeight:15, chapterId:'ol-combinatorics-counting'},
      {id:'ol-geom', label:'Olympiad Circle Geometry, Ceva & Stewart', tags:['circles','power-of-point','ceva','stewart'], examWeight:15, chapterId:'ol-euclidean-circles'},
      {id:'ol-inv', label:'Invariants, Monovariants & Combinatorial Games', tags:['invariants','coloring','extremal','games'], examWeight:10, chapterId:'ol-invariants-extremal'},
      {id:'ol-nsmo', label:'NSMO of KSA (Mawhiba Stages 1–3 & IMO Pathway)', tags:['nsmo','mawhiba','lte','functional-equations'], examWeight:20, chapterId:'ol-nsmo-stage1-2'},
      {id:'ol-kaust', label:'KAUST Mathematics Competition (KMC & Academy)', tags:['kaust','kmc','roots-of-unity','relay','markov'], examWeight:20, chapterId:'ol-kaust-kmc-qualifier'}
    ]});

    R({viewId:'act2', name:'ACT Subject Test Math 1', topics:[
      {id:'act2-alg', label:'Algebra, Functions & Systems', tags:['algebra','quadratic','polynomial','system'], examWeight:40, chapterId:'act2-algebra'},
      {id:'act2-geo', label:'Plane, Coordinate & 3D Geometry', tags:['geometry','coordinate','circle','triangle'], examWeight:35, chapterId:'act2-plane-geo'},
      {id:'act2-trig-stat', label:'Trigonometry, Statistics & Probability', tags:['trigonometry','statistics','probability'], examWeight:25, chapterId:'act2-trig'}
    ]});

    R({viewId:'act2l2', name:'ACT Subject Test Math 2', topics:[
      {id:'act2l2-alg', label:'Complex Numbers, Matrices & Sequences', tags:['complex','matrix','vector','sequence'], examWeight:30, chapterId:'act2l2-complex'},
      {id:'act2l2-fn-trig', label:'Advanced Functions, Trig & Polar', tags:['functions','trigonometry','polar','limits'], examWeight:35, chapterId:'act2l2-trig-polar'},
      {id:'act2l2-conic-stat', label:'Conic Sections, 3D Geometry & Statistics', tags:['conics','3d-geometry','probability','regression'], examWeight:35, chapterId:'act2l2-conics-3d-stats'}
    ]});

    R({viewId:'est2', name:'EST II Math Level 1', topics:[
      {id:'est2-alg', label:'Algebra & Functions', tags:['algebra','functions','polynomial','system'], examWeight:42, chapterId:'est2-algebra'},
      {id:'est2-geo', label:'Coordinate, Plane & Solid Geometry', tags:['geometry','coordinate','solid','trig'], examWeight:36, chapterId:'est2-coord-geo'},
      {id:'est2-stat', label:'Statistics, Counting & Probability', tags:['statistics','probability','counting'], examWeight:22, chapterId:'est2-stats'}
    ]});

    R({viewId:'est2l2', name:'EST II Math Level 2', topics:[
      {id:'est2l2-alg', label:'Complex Numbers, Sequences & Functions', tags:['complex','sequence','functions','matrix'], examWeight:38, chapterId:'est2l2-complex'},
      {id:'est2l2-calc-stat', label:'Limits, Probability & Normal Distribution', tags:['limits','calculus','probability','statistics'], examWeight:32, chapterId:'est2l2-calculus'},
      {id:'est2l2-trig-conic', label:'Trigonometry, Polar & Conic Sections', tags:['trigonometry','polar','conics','vectors'], examWeight:30, chapterId:'est2l2-trig-polar-conics'}
    ]});

    R({viewId:'apab', name:'AP Calculus AB', topics:[
      {id:'apab-lim', label:'Limits & Continuity', tags:['limits','continuity','ivt'], examWeight:12, chapterId:'ab-limits'},
      {id:'apab-diff', label:'Differentiation & Applications', tags:['derivative','chain-rule','implicit','optimization','related-rates'], examWeight:43, chapterId:'ab-diff-fund'},
      {id:'apab-int', label:'Integration, Differential Equations & Accumulation', tags:['integral','ftc','ode','area','volume'], examWeight:45, chapterId:'ab-integration'}
    ]});

    R({viewId:'apbc', name:'AP Calculus BC', topics:[
      {id:'apbc-int', label:'Advanced Integration & Logistic ODEs', tags:['ibp','partial-fractions','improper','logistic','euler'], examWeight:35, chapterId:'bc-adv-int'},
      {id:'apbc-param', label:'Parametric, Polar & Vector Calculus', tags:['parametric','polar','vector','arc-length'], examWeight:30, chapterId:'bc-param-polar'},
      {id:'apbc-series', label:'Infinite Sequences, Taylor & Maclaurin Series', tags:['series','convergence','taylor','maclaurin','lagrange'], examWeight:35, chapterId:'bc-taylor'}
    ]});

    R({viewId:'algebra', name:'Algebra I', topics:[
      {id:'alg1-lin', label:'Linear Equations, Inequalities & Systems', tags:['linear','inequality','system','slope'], examWeight:40, chapterId:'alg1-linear'},
      {id:'alg1-quad', label:'Polynomials, Factoring & Quadratics', tags:['polynomial','factoring','quadratic','discriminant'], examWeight:35, chapterId:'alg1-quadratics'},
      {id:'alg1-exp', label:'Exponents, Radicals & Data', tags:['exponent','radical','rational','statistics'], examWeight:25, chapterId:'alg1-exponents'}
    ]});

    R({viewId:'geo', name:'Euclidean & Coordinate Geometry', topics:[
      {id:'geo-tri', label:'Congruence, Similarity & Right Triangles', tags:['triangle','congruence','similarity','pythagorean','trig'], examWeight:40, chapterId:'geo-triangles'},
      {id:'geo-circ', label:'Polygons, Circles & Arc/Sector Measure', tags:['polygon','circle','chord','tangent','sector'], examWeight:35, chapterId:'geo-circles'},
      {id:'geo-3d', label:'Coordinate Geometry, Transformations & 3D Solids', tags:['coordinate','transformation','volume','surface-area'], examWeight:25, chapterId:'geo-solids'}
    ]});

    R({viewId:'alg2', name:'Algebra II', topics:[
      {id:'alg2-poly', label:'Polynomial, Rational & Radical Functions', tags:['polynomial','rational','radical','complex'], examWeight:40, chapterId:'alg2-polynomials'},
      {id:'alg2-exp', label:'Exponential, Logarithmic & Sequences', tags:['exponential','logarithm','sequence','series'], examWeight:30, chapterId:'alg2-exp-log'},
      {id:'alg2-trig', label:'Trigonometry, Conics, Matrices & Probability', tags:['trigonometry','conics','matrices','probability'], examWeight:30, chapterId:'alg2-trig'}
    ]});

    R({viewId:'calculus', name:'University Calculus I–II', topics:[
      {id:'calc-diff', label:'Limits, Derivatives & Applications', tags:['limit','derivative','optimization','related-rates'], examWeight:35, chapterId:'calc-derivatives'},
      {id:'calc-int', label:'Definite/Indefinite Integrals & Applications', tags:['integral','ftc','volume','techniques'], examWeight:35, chapterId:'calc-integrals'},
      {id:'calc-series', label:'Infinite Series, Parametric/Polar & ODEs', tags:['series','taylor','parametric','polar','ode'], examWeight:30, chapterId:'calc-series'}
    ]});

    R({viewId:'linalg', name:'Linear Algebra', topics:[
      {id:'la-sys', label:'Vectors, Linear Systems, RREF & Matrices', tags:['vector','rref','matrix','inverse','determinant'], examWeight:35, chapterId:'la-systems'},
      {id:'la-sub', label:'Vector Spaces, Subspaces & Linear Transformations', tags:['subspace','basis','dimension','rank-nullity','transformation'], examWeight:30, chapterId:'la-spaces'},
      {id:'la-eig', label:'Eigenvalues, Diagonalization, Orthogonality & SVD', tags:['eigenvalue','eigenvector','gram-schmidt','least-squares'], examWeight:35, chapterId:'la-eigen'}
    ]});

    R({viewId:'mvc', name:'Multivariable Calculus', topics:[
      {id:'mvc-diff', label:'Partial Derivatives, Gradients & Lagrange Multipliers', tags:['partial','gradient','directional','hessian','lagrange'], examWeight:35, chapterId:'mvc-partials'},
      {id:'mvc-mult', label:'Double & Triple Integrals (Polar, Cylindrical, Spherical)', tags:['double-integral','triple-integral','jacobian','spherical'], examWeight:30, chapterId:'mvc-double'},
      {id:'mvc-vec', label:'Vector Fields, Line/Surface Integrals, Green, Stokes & Divergence', tags:['line-integral','greens-theorem','stokes','divergence'], examWeight:35, chapterId:'mvc-stokes'}
    ]});

    R({viewId:'odes', name:'Differential Equations', topics:[
      {id:'ode-1st', label:'First-Order Separable, Linear & Exact ODEs', tags:['separable','integrating-factor','exact','autonomous'], examWeight:25, chapterId:'ode-first-order'},
      {id:'ode-2nd', label:'Second-Order Linear ODEs, Resonance & Variation of Parameters', tags:['characteristic','undetermined','variation-of-parameters','wronskian'], examWeight:30, chapterId:'ode-second-order'},
      {id:'ode-adv', label:'Laplace Transforms, Linear Systems, Series & Numerical ODEs', tags:['laplace','phase-plane','power-series','runge-kutta'], examWeight:45, chapterId:'ode-laplace'}
    ]});
  }());

  /* ===================== FIGURE RENDERER LAZY LOADER ===================== */
  var _figuresPromise=null;
  window._ensureFigures=function(){
    if(window._renderFig&&window.renderMathFigure) return Promise.resolve();
    if(_figuresPromise) return _figuresPromise;
    _figuresPromise=new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='/js/figures.js';
      s.onload=function(){ window._renderFig&&window.renderMathFigure?resolve():reject(new Error('figures.js did not register')); };
      s.onerror=function(){ _figuresPromise=null; reject(new Error('The figures could not load. Check your connection and try again.')); };
      document.head.appendChild(s);
    });
    return _figuresPromise;
  };
  ['pointerdown','focusin'].forEach(function(ev){
    document.addEventListener(ev,function(e){
      if(!window._renderFig&&e.target&&e.target.closest&&e.target.closest('.ch-quiz-wrap')) window._ensureFigures().catch(function(){});
    },true);
  });

  /* ===================== SHARED HELPERS ===================== */
  window._shuffle = function(arr){var a=arr.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;};

  window._shuffleQ = function(q){
    if(!q) return q;
    var choicesKey = q.choices ? 'choices' : (q.options ? 'options' : null);
    if(!choicesKey || !q[choicesKey] || q[choicesKey].length < 2) return q;
    var chArr = q[choicesKey];
    if(q.fixedChoices || q.topic_id === 'qud-compare' || /القيمة الأولى أكبر|Quantity A is greater|Column A is greater/i.test(String(chArr[0]||''))){
      return Object.assign({}, q);
    }
    var answerKey = (typeof q.answer!=='undefined') ? 'answer' : (typeof q.ans!=='undefined' ? 'ans' : (typeof q.correct!=='undefined' ? 'correct' : null));
    var origAns = answerKey ? q[answerKey] : 0;
    if(typeof origAns !== 'number') return q;
    var order = window._shuffle(q[choicesKey].map(function(_,i){return i;}));
    var copy = {};
    for(var k in q) if(Object.prototype.hasOwnProperty.call(q,k)) copy[k]=q[k];
    copy[choicesKey] = order.map(function(i){return q[choicesKey][i];});
    var newAns = order.indexOf(origAns);
    if(answerKey) copy[answerKey] = newAns;
    if(typeof q.answer!=='undefined') copy.answer = newAns;
    if(typeof q.ans!=='undefined') copy.ans = newAns;
    return copy;
  };

  /* ===================== FULL EXAM GENERATOR LAZY LOADER ===================== */
  var _bankExamPromise=null;
  function _loadBankExam(){
    if(window.CSBankExam) return Promise.resolve();
    if(_bankExamPromise) return _bankExamPromise;
    _bankExamPromise=new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='/js/bank-exam.js';
      s.onload=function(){ window.CSBankExam?resolve():reject(new Error('bank-exam.js did not register')); };
      s.onerror=function(){ _bankExamPromise=null; reject(new Error('The exam generator could not load. Check your connection and try again.')); };
      document.head.appendChild(s);
    });
    return _bankExamPromise;
  }
  window._ensureBankExam=function(){ return Promise.all([_loadBankExam(),window._ensureFigures()]).then(function(){}); };
  ['pointerdown','focusin'].forEach(function(ev){
    document.addEventListener(ev,function(e){
      if(!window.CSBankExam&&e.target&&e.target.closest&&e.target.closest('.testgen')) window._ensureBankExam().catch(function(){});
    },true);
  });
  window.genFullExam=function(btn){
    var self=this, args=arguments;
    return window._ensureBankExam().then(function(){ return window.CSBankExam.genFullExam.apply(self,args); },function(err){
      var box=btn&&btn.closest&&btn.closest('.testgen'), out=box&&box.querySelector('.tg-out');
      if(out){ out.innerHTML=''; var p=document.createElement('p'); p.className='tg-empty'; p.style.color='#dc2626'; p.textContent=err.message; out.appendChild(p); }
    });
  };
})();
