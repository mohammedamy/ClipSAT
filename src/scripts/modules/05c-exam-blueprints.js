/* ── Exam blueprints: topic weights + difficulty mix per exam ───────────
   Used by 05d-blueprint-assembler.js to plan every generated test and paper
   slot by slot, so the result matches the real exam's topic distribution and
   difficulty profile instead of whatever the model happens to write. Section
   and part structure (question counts, calculator rules, MCQ/FRQ) stays in
   window.examSpecs (02-core-app.js).

   Each topic: name (shown on the paper), weight (percent; normalised), desc
   (what the generator and reviewer are told the topic covers), bank (question
   bank domains used to fill a slot the AI could not fill; "track:Domain" reaches
   another track's bank).

   ao (optional): assessment objectives with their published weighting; every slot is assigned one
   and the generator is told which (e.g. Cambridge AO1 techniques / AO2 problem solving).
   exclude (optional): content the current syllabus drops; the generator is told to avoid it.

   difficulty: target share of easy/medium/hard. Exam boards do not publish
   these numbers; they are ClipSAT's calibration of each exam's profile.
   order: 'ascending' when the real exam runs from easier to harder (ACT),
   otherwise questions of each difficulty are interleaved.

   provisional:true marks exams whose board publishes no topic weights: the
   weights are an even split over the syllabus topics until the official
   distribution is supplied, and the paper says so. */
(function(){
  function T(name,weight,desc,bank){ return {name:name,weight:weight,desc:desc,bank:bank||[]}; }
  var MIX={easy:30,medium:40,hard:30};
  var B={
    sat:{source:'College Board, Digital SAT Suite assessment framework: Math domains ≈35% / 35% / 15% / 15%',
      difficulty:{easy:33,medium:34,hard:33}, order:'mixed',
      topics:[
        T('Algebra',35,'linear equations and inequalities in one or two variables, linear functions, systems of two linear equations',['Linear Equations & Systems','Linear Functions & Inequalities']),
        T('Advanced Math',35,'equivalent expressions, nonlinear equations and systems, quadratic, exponential, polynomial, rational and radical functions',['Quadratics & Nonlinear Functions','Exponentials, Polynomials & Rational Expressions','Functions & Function Notation']),
        T('Problem-Solving and Data Analysis',15,'ratios, rates, proportions, units, percentages, one- and two-variable data, probability, inference from samples, evaluating statistical claims',['Problem-Solving & Data Analysis','Statistics, Sampling & Margin of Error','Conditional Probability & Two-Way Tables']),
        T('Geometry and Trigonometry',15,'area and volume, lines, angles, triangles, right-triangle trigonometry, circles',['Geometry & Trigonometry'])]},
    act:{source:'ACT, Inc., Mathematics reporting categories: Preparing for Higher Math 57–60% (Number & Quantity 7–10%, Algebra 12–15%, Functions 12–15%, Geometry 12–15%, Statistics & Probability 8–12%), Integrating Essential Skills 40–43%',
      difficulty:{easy:35,medium:40,hard:25}, order:'ascending',
      topics:[
        T('Number & Quantity',8.5,'real and complex number systems, integer and rational exponents, vectors and matrices',['Matrices, Vectors & Complex Numbers','Numbers, Percents & Ratios']),
        T('Algebra',13.5,'solving, graphing and modeling with linear, polynomial, radical and exponential expressions and equations, systems',['Elementary & Intermediate Algebra']),
        T('Functions',13.5,'function definition, notation, representation and application; linear, radical, piecewise, polynomial and logarithmic functions',['Functions & Graphs']),
        T('Geometry',13.5,'shapes and solids, congruence and similarity, surface area and volume, coordinate geometry, trigonometric ratios, circles',['Plane Geometry','Coordinate Geometry','Trigonometry']),
        T('Statistics & Probability',10,'center and spread of distributions, data collection, bivariate data, probabilities of compound events',['Statistics & Probability']),
        T('Integrating Essential Skills',41,'rates and percentages, proportional relationships, area, surface area and volume, average and median, expressing numbers in different ways, solving multistep problems',['Numbers, Percents & Ratios','Elementary & Intermediate Algebra','Plane Geometry'])]},
    apab:{source:'College Board, AP Calculus AB Course and Exam Description, exam weighting by unit (midpoints)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Unit 1: Limits and Continuity',11,'limits, continuity, IVT, asymptotic behaviour',['Limits & Continuity']),
        T('Unit 2: Differentiation — Definition and Fundamental Properties',11,'definition of the derivative, differentiability, basic rules, product and quotient rules',['Definition of the Derivative','Differentiation Rules']),
        T('Unit 3: Differentiation — Composite, Implicit, and Inverse Functions',11,'chain rule, implicit differentiation, derivatives of inverse functions, higher derivatives',['Chain Rule','Implicit Differentiation','Inverse Function Derivatives','Composite Functions']),
        T('Unit 4: Contextual Applications of Differentiation',12.5,'rates of change in context, motion, related rates, linearization, L\'Hospital\'s rule',['Applications of Differentiation I','Optimization & Motion']),
        T('Unit 5: Analytical Applications of Differentiation',16.5,'MVT, extreme value theorem, increasing/decreasing, concavity, curve sketching, optimization',['MVT','Curve Analysis']),
        T('Unit 6: Integration and Accumulation of Change',18.5,'Riemann sums, definite integrals, FTC, accumulation functions, antiderivatives, substitution',['Riemann Sums','Antiderivatives & Integration','Definite Integrals & FTC']),
        T('Unit 7: Differential Equations',9,'slope fields, separable equations, exponential models',['Differential Equations & Slope Fields']),
        T('Unit 8: Applications of Integration',12.5,'average value, motion, area between curves, volumes by cross sections and discs/washers',['Applications of Integration'])]},
    apbc:{source:'College Board, AP Calculus BC Course and Exam Description, exam weighting by unit (midpoints)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Unit 1: Limits and Continuity',5.5,'limits, continuity, IVT',['apab:Limits & Continuity']),
        T('Unit 2: Differentiation — Definition and Fundamental Properties',5.5,'definition of the derivative and basic rules',['apab:Definition of the Derivative','apab:Differentiation Rules']),
        T('Unit 3: Differentiation — Composite, Implicit, and Inverse Functions',5.5,'chain rule, implicit differentiation, inverse functions',['apab:Chain Rule','apab:Implicit Differentiation','apab:Inverse Function Derivatives']),
        T('Unit 4: Contextual Applications of Differentiation',7.5,'motion, related rates, linearization, L\'Hospital\'s rule',['apab:Applications of Differentiation I','apab:Optimization & Motion']),
        T('Unit 5: Analytical Applications of Differentiation',9.5,'MVT, extrema, concavity, optimization',['apab:MVT','apab:Curve Analysis']),
        T('Unit 6: Integration and Accumulation of Change',18.5,'Riemann sums, FTC, integration by parts, partial fractions, improper integrals',['Advanced Integration Techniques','apab:Definite Integrals & FTC','apab:Antiderivatives & Integration']),
        T('Unit 7: Differential Equations',7.5,'slope fields, Euler\'s method, separable equations, logistic models',['Logistic Models & Euler\'s Method','apab:Differential Equations & Slope Fields']),
        T('Unit 8: Applications of Integration',7.5,'area, volume, arc length, average value',['apab:Applications of Integration']),
        T('Unit 9: Parametric Equations, Polar Coordinates, and Vector-Valued Functions',11.5,'derivatives and integrals of parametric, polar and vector-valued functions',['Parametric & Vector-Valued Functions','Polar Coordinates']),
        T('Unit 10: Infinite Sequences and Series',17.5,'convergence tests, power series, Taylor and Maclaurin series, error bounds',['Series Convergence','Taylor & Maclaurin Series'])]},
    appc:{source:'College Board, AP Precalculus Course and Exam Description: Unit 1 30–40%, Unit 2 27–40%, Unit 3 30–35% (Unit 4 is not assessed on the exam)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Unit 1: Polynomial and Rational Functions',35,'rates of change, polynomial and rational functions, transformations, function models',['Polynomial & Rational Functions','Functions & Their Parameters']),
        T('Unit 2: Exponential and Logarithmic Functions',33.5,'sequences, exponential and logarithmic functions, inverses, semi-log plots, models',['Exponential & Logarithmic Functions']),
        T('Unit 3: Trigonometric and Polar Functions',31.5,'periodic phenomena, sine/cosine/tangent functions, inverse trig, equations and inequalities, polar functions',['Trigonometric & Polar Functions'])]},
    apstats:{source:'College Board, AP Statistics Course and Exam Description, exam weighting by unit (midpoints)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Unit 1: Exploring One-Variable Data',19,'representing and describing distributions, summary statistics, normal distribution',['Exploring Data']),
        T('Unit 2: Exploring Two-Variable Data',6,'two-way tables, scatterplots, correlation, least-squares regression, residuals',['Exploring Data']),
        T('Unit 3: Collecting Data',13.5,'sampling methods, bias, experimental design',['Sampling & Experimentation']),
        T('Unit 4: Probability, Random Variables, and Probability Distributions',15,'probability rules, random variables, binomial and geometric distributions',['Probability & Distributions']),
        T('Unit 5: Sampling Distributions',9.5,'sampling distributions of proportions and means, central limit theorem',['Probability & Distributions']),
        T('Unit 6: Inference for Categorical Data: Proportions',13.5,'confidence intervals and significance tests for proportions',['Statistical Inference']),
        T('Unit 7: Inference for Quantitative Data: Means',14,'t-intervals and t-tests for means and differences of means',['Statistical Inference']),
        T('Unit 8: Inference for Categorical Data: Chi-Square',3.5,'chi-square goodness-of-fit, homogeneity and independence tests',['Statistical Inference']),
        T('Unit 9: Inference for Quantitative Data: Slopes',3.5,'confidence intervals and tests for the slope of a regression line',['Statistical Inference'])]},
    igcse:{source:'Cambridge IGCSE Mathematics 0580 syllabus 2025–2027 (unchanged for 2028–2030), Extended tier. Cambridge publishes no topic weighting, so each topic is weighted by its share of the Extended learning outcomes (31/22/7/13/5/6/8/5/9 of 106). Assessment objectives follow the published component weighting: AO1 40–50%, AO2 50–60%.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:45,desc:'Knowledge and understanding of mathematical techniques: recall and apply techniques, carry out routine procedures, calculate with and without a calculator'},
          AO2:{weight:55,desc:'Analyse, interpret and communicate mathematically: choose a strategy, connect areas of mathematics, justify, draw conclusions, change between representations'}},
      exclude:'Matrices and linear programming are not in the current syllabus.',
      topics:[
        T('Number',31,'E1: types of number, sets and Venn diagrams, powers and roots, fractions/decimals/percentages, standard form, estimation, bounds, ratio, rates, percentages incl. reverse, exponential growth and decay, surds, time, money',['Number','Sets & Venn Diagrams']),
        T('Algebra and graphs',22,'E2: algebraic manipulation, indices, equations and inequalities, sequences, proportion, graphs in practical situations, graphs of functions, sketching curves, differentiation, functions (domain, range, composite, inverse)',['Algebra & Graphs','Functions']),
        T('Coordinate geometry',7,'E3: coordinates, drawing linear graphs, gradient, length and midpoint, equations of lines, parallel and perpendicular lines',['Coordinate Geometry']),
        T('Geometry',13,'E4: geometrical terms, constructions, scale drawings, similarity, symmetry, angles, circle theorems I and II',['Geometry']),
        T('Mensuration',5,'E5: units, area and perimeter, circles/arcs/sectors, surface area and volume, compound shapes',['Mensuration']),
        T('Trigonometry',6,'E6: bearings, Pythagoras, right-angled trigonometry, exact values, sine and cosine rules, area of a triangle, 3D trigonometry',['Trigonometry']),
        T('Transformations and vectors',8,'E7: transformations, vectors in two dimensions, magnitude, vector geometry',['Transformations & Vectors']),
        T('Probability',5,'E8: probability, relative and expected frequency, combined events, tree diagrams, conditional probability',['Probability & Statistics']),
        T('Statistics',9,'E9: classifying data, averages and range, statistical charts and diagrams, scatter diagrams, cumulative frequency, histograms',['Probability & Statistics'])]},
    ibsl:{source:'IB Mathematics: Analysis and Approaches SL guide — topics weighted by recommended teaching hours (19/21/25/27/28 of 120)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',19,'sequences and series, exponents and logarithms, binomial theorem, proof'),
        T('Functions',21,'function concepts, graphs, transformations, quadratic, rational, exponential and log functions'),
        T('Geometry and trigonometry',25,'3D volume and area, right and non-right triangle trig, radians, trig identities and equations'),
        T('Statistics and probability',27,'data, regression, probability, discrete distributions, binomial and normal distributions'),
        T('Calculus',28,'limits, differentiation, integration, kinematics, optimisation')]},
    ibhl:{source:'IB Mathematics: Analysis and Approaches HL guide — topics weighted by recommended teaching hours (39/32/51/33/55 of 210)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',39,'series, logarithms, counting, binomial theorem, proof by induction and contradiction, complex numbers, systems'),
        T('Functions',32,'polynomial, rational and modulus functions, transformations, inequalities'),
        T('Geometry and trigonometry',51,'trig identities and equations, vectors, lines and planes in 3D'),
        T('Statistics and probability',33,'Bayes, discrete and continuous random variables, binomial and normal distributions'),
        T('Calculus',55,'limits, differentiation, integration techniques, differential equations, Maclaurin series')]}
  };
  /* Every other exam (qudrat, tahsili, est, est2, act2, aslevel, a2level, precalc, …) has no
     published topic weighting: provisional even split over its bank domains. */
  var SKIP=/test format|strategy|mixed review|overview|exam format/i;
  function provisional(viewId){
    var bank=window.fullExamBank&&window.fullExamBank[viewId];
    var doms={};
    ((bank&&bank.pool)||[]).forEach(function(q){ if(q.domain&&!SKIP.test(q.domain)) doms[q.domain]=1; });
    var names=Object.keys(doms);
    if(!names.length) return null;
    return {source:'No official topic weighting is published for this exam; topics are weighted evenly until the official distribution is supplied.',
      provisional:true, difficulty:MIX, order:'mixed',
      topics:names.map(function(n){ return T(n,1,n,[n]); })};
  }
  window.ClipSATBlueprints={
    get:function(viewId){ return B[viewId]||provisional(viewId); },
    _data:B
  };
})();
