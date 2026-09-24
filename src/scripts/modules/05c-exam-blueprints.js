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

   calcWeights (optional): {nocalc:[…], calc:[…]} — per-section topic weights, aligned with topics.

   difficulty: target share of easy/medium/hard. Exam boards do not publish
   these numbers; they are ClipSAT's calibration of each exam's profile.
   order: 'ascending' when the real exam runs from easier to harder (ACT),
   otherwise questions of each difficulty are interleaved.

   provisional:true marks exams whose board publishes no topic weights: the
   weights are an even split over the syllabus topics until the official
   distribution is supplied, and the paper says so. Exams not listed here get
   such a split over their question-bank domains. */
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
    act:{source:'ACT, Inc., enhanced ACT Mathematics (from September 2025): Preparing for Higher Math 80% (Number & Quantity 10–12%, Algebra 17–20%, Functions 17–20%, Geometry 17–20%, Statistics & Probability 12–15%), Integrating Essential Skills 20%; Modeling is a secondary label on at least 20% of questions. Midpoints are used.',
      difficulty:{easy:35,medium:40,hard:25}, order:'ascending',
      topics:[
        T('Number & Quantity',11,'real and complex number systems, integer and rational exponents, vectors and matrices',['Matrices, Vectors & Complex Numbers','Numbers, Percents & Ratios']),
        T('Algebra',18.5,'solving, graphing and modeling with linear, polynomial, radical and exponential expressions and equations, systems',['Elementary & Intermediate Algebra']),
        T('Functions',18.5,'function definition, notation, representation and application; linear, radical, piecewise, polynomial and logarithmic functions',['Functions & Graphs']),
        T('Geometry',18.5,'shapes and solids, congruence and similarity, surface area and volume, coordinate geometry, trigonometric ratios, circles',['Plane Geometry','Coordinate Geometry','Trigonometry']),
        T('Statistics & Probability',13.5,'center and spread of distributions, data collection, bivariate data, probabilities of compound events',['Statistics & Probability']),
        T('Integrating Essential Skills',20,'rates and percentages, proportional relationships, area, surface area and volume, average and median, expressing numbers in different ways, solving multistep problems',['Numbers, Percents & Ratios','Elementary & Intermediate Algebra','Plane Geometry'])]},
    /* ACT International Subject Test — Mathematics 1 */
    act2:{source:'ACT, Inc., ACT International Subject Test — Mathematics 1: about 25 Algebra II and 25 precalculus questions out of 50',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Algebra II',50,'equations, inequalities and systems, polynomial, rational, radical, exponential and logarithmic expressions and functions, counting, probability and statistics, number properties',['Advanced Algebra & Systems','Advanced Functions','Statistics, Counting & Probability','Advanced Number Theory']),
        T('Precalculus',50,'trigonometric functions, identities and equations, sequences and series, conic sections and coordinate geometry, limits, function analysis',['Advanced Trigonometry','Sequences & Series','Advanced Coordinate Geometry','Limits','Pre-Calculus Concepts'])]},
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
    apstats:{source:'College Board, AP Statistics Course and Exam Description (revised course, 2026–27; May 2027 exam), exam weighting by unit (midpoints): Unit 1 20–30%, Unit 2 15–25%, Unit 3 15–25%, Unit 4 10–20%, Unit 5 10–20%',
      difficulty:MIX, order:'mixed',
      exclude:'The revised course no longer assesses departures from linearity (transformations to achieve linearity), combining random variables, the geometric distribution, the chi-square goodness-of-fit test, or inference for the slope of a regression line.',
      topics:[
        T('Unit 1: Exploring One-Variable Data and Collecting Data',25,'representing and describing distributions, summary statistics, the normal distribution, sampling methods, bias, experimental design, statistical investigations',['Exploring Data','Sampling & Experimentation']),
        T('Unit 2: Probability, Random Variables, and Probability Distributions',20,'probability rules, conditional probability, discrete random variables, the binomial distribution, sampling distributions',['Probability & Distributions']),
        T('Unit 3: Inference for Categorical Data: Proportions',20,'confidence intervals and significance tests for one and two proportions, errors and power',['Statistical Inference']),
        T('Unit 4: Inference for Quantitative Data: Means',15,'t-intervals and t-tests for a mean, a mean difference and a difference of means',['Statistical Inference']),
        T('Unit 5: Regression Analysis',15,'two-variable data, scatterplots, correlation, least-squares regression, residuals, interpreting slope and intercept',['Exploring Data'])]},
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
    /* EST I Mathematics: no published topic distribution. Weights are the topic counts of three
       recent EST I papers supplied by the maintainer (January, October and December 2024 — 157
       questions: 60 no-calculator, 97 calculator), with separate mixes for the two sections. */
    est:{source:'Academic Assessment Ltd. publishes no EST I topic distribution. Weights are the topic counts of three recent EST I papers (January, October and December 2024; 157 questions), counted separately for the no-calculator and calculator sections.',
      difficulty:MIX, order:'mixed',
      calcWeights:{nocalc:[20,11,6,5,2,5,6,5], calc:[20,12,11,7,23,17,5,2]},
      topics:[
        T('Heart of Algebra',40,'linear equations, inequalities and systems, absolute value, literal equations and formulas, slope and equations of lines, graphs of linear inequalities',['Heart of Algebra']),
        T('Quadratics & Polynomials',23,'quadratic equations and vertex form, polynomial expansion and factoring, rational and radical equations and expressions, partial fractions',['Quadratics & Polynomials']),
        T('Functions & Graphs',17,'function notation and evaluation, composition, inverses, domain and range, asymptotes, reading and matching graphs, functions in context',['Functions & Graphs']),
        T('Exponentials & Logarithms',12,'exponent rules, exponential equations, exponential growth and decay, compound interest',['Exponentials & Logarithms']),
        T('Ratios, Rates & Data',25,'ratios and proportions, unit rates, percentages and percent change, direct variation, reading tables and charts, multistep word problems',['Ratios, Rates & Data']),
        T('Statistics & Probability',22,'mean, median, mode, range and IQR, box plots and skew, probability of simple and compound events, counting, sampling and bias',['Statistics & Probability']),
        T('Geometry',11,'angles, triangles and polygons, triangle inequality, circles and arcs, area and volume',['Geometry']),
        T('Trigonometry & Additional Topics',7,'right-triangle trigonometry and special triangles, complex numbers',['Trigonometry & Additional Topics'])]},
    /* ACT International Subject Test — Mathematics 2 */
    act2l2:{source:'ACT, Inc., ACT International Subject Test — Mathematics 2: 50 questions in 60 minutes, split roughly evenly between Algebra II and precalculus',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Algebra II',50,'complex numbers, matrices and vectors, sequences and series, polynomial, rational, exponential and logarithmic equations and functions',['Complex Numbers','Matrices & Vectors','Sequences & Series','Advanced Functions & Equations']),
        T('Precalculus',50,'trigonometric functions, identities and equations, polar coordinates, limits, function analysis',['Trigonometry & Polar Coordinates','Limits','Advanced Functions & Equations'])]},
    /* EST II subject tests (Academic Assessment Ltd., EST Description Document). The document gives
       Numerations and Operations 10–14% (both levels) and Algebra and Functions 32–42% (Level 1) /
       46–50% (Level 2); the remaining share is split evenly over its other listed areas until their
       published ranges are supplied. */
    est2:{source:'Academic Assessment Ltd., EST Description Document — EST II Mathematics Level 1: Numerations and Operations 10–14%, Algebra and Functions 32–42% (midpoints used). The other areas (coordinates, plane and solid shapes, trigonometry, data analysis, statistics and probability) share the rest evenly until their published ranges are supplied.',
      provisional:true, difficulty:MIX, order:'mixed',
      topics:[
        T('Numerations and Operations',12,'number properties, ratios and percentages, complex numbers, sequences and series, counting',['Sequences, Series & Complex Numbers']),
        T('Algebra and Functions',37,'expressions, equations, inequalities, absolute value, modelling; linear, quadratic, polynomial, rational, exponential, logarithmic, inverse and piecewise functions',['Advanced Algebra','Functions: Composite, Inverse & Logarithmic']),
        T('Coordinates System',12.75,'lines, distance and midpoint, circles and conics in the coordinate plane',['Circles & Coordinate Geometry']),
        T('Plane and Solid Shapes',12.75,'triangles, polygons, circles, similarity, surface area and volume of solids',['Lines, Triangles & Polygons','Solid Geometry & Similarity']),
        T('Trigonometry',12.75,'right-triangle trigonometry, identities, equations, laws of sines and cosines',['Trigonometry']),
        T('Data Analysis, Statistics and Probability',12.75,'measures of centre and spread, data displays, regression, probability',['Statistics & Probability'])]},
    est2l2:{source:'Academic Assessment Ltd., EST Description Document — EST II Mathematics Level 2: Numerations and Operations 10–14%, Algebra and Functions 46–50% (midpoints used). The other areas (coordinates, plane and solid shapes, trigonometry, data analysis, statistics and probability) share the rest evenly until their published ranges are supplied.',
      provisional:true, difficulty:MIX, order:'mixed',
      topics:[
        T('Numerations and Operations',12,'complex numbers, matrices and determinants, vectors, sequences and series',['Complex Numbers','Matrices & Vectors','Sequences & Series']),
        T('Algebra and Functions',48,'polynomial, rational, exponential, logarithmic, trigonometric, parametric, piecewise and inverse functions; introductory calculus (limits, derivatives); differential equations',['Functions & Graphs','Introductory Calculus']),
        T('Coordinates System',10,'lines, circles, conic sections, polar coordinates and parametric curves',[]),
        T('Plane and Solid Shapes',10,'surface area and volume of solids, similar figures, three-dimensional coordinates',[]),
        T('Trigonometry',10,'trigonometric functions and graphs, identities, equations, inverse functions, laws of sines and cosines',[]),
        T('Data Analysis, Statistics and Probability',10,'probability, counting, expected value, statistics, regression',['Probability'])]},
    /* SAAT Tahsili mathematics: Qiyas publishes no topic distribution. The topic list and weights
       follow the syllabus coverage of the maintainer-supplied "Excellence in SAAT" book (lessons per
       part: algebra 24, geometry 14, trigonometry 4, calculus 3, statistics 5) — provisional. */
    tahsili:{source:'Qiyas publishes no topic distribution for SAAT Tahsili mathematics. Weights follow the lessons per part of the "Excellence in SAAT" syllabus book supplied by the maintainer (algebra 24, geometry 14, trigonometry 4, limits/derivatives/integrals 3, statistics and probability 5 of 50 lessons).',
      provisional:true, difficulty:MIX, order:'mixed',
      topics:[
        T('Algebra',48,'logic and sets, relations and functions, domain, even/odd functions, limits and continuity, increasing/decreasing and extreme values, rate of change, parent functions and transformations, exponential and logarithmic functions, polynomials, rational and radical expressions, variation, matrices and determinants, complex numbers, sequences and series, binomial theorem, vectors, polar coordinates and De Moivre',['Algebra & Equations','Functions','Sequences & Series','Exponentials & Logarithms']),
        T('Geometry',28,'angles and parallel lines, triangles, quadrilaterals, polygon angles, transformations (reflection, translation, rotation, dilation), circles, slope and linear equations, similarity, parabolas, ellipses, hyperbolas',['Geometry & Coordinate Geometry']),
        T('Trigonometry',8,'right-triangle trigonometry, laws of sines and cosines, area of a triangle, identities and equations',['Trigonometry']),
        T('Limits, derivatives and integrals',6,'limits, derivatives, integrals',['Limits & Derivatives','Integration & Applications']),
        T('Statistics and probability',10,'counting principle, permutations and combinations, geometric probability, expected value, probability, statistics, normal distribution',['Statistics & Probability'])]},
    qudrat:{source:'National Center for Assessment (Qiyas), General Aptitude Test — quantitative section content: arithmetic 40%, geometry 24%, algebra 23%, statistics and analysis 13%. Quantitative-comparison items appear across these areas.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Arithmetic',40,'number sense, operations, fractions and decimals, ratio and proportion, percentages, rates, word problems; some items in quantitative-comparison format',['Arithmetic & Number Sense','Ratios, Proportion & Percentages','Word Problems & Reasoning','Quantitative Comparisons']),
        T('Geometry',24,'angles, triangles, polygons, circles, perimeter, area and volume, coordinate basics',['Geometry & Measurement']),
        T('Algebra',23,'expressions, linear and quadratic equations, inequalities, sequences and patterns',['Algebra Essentials','Sequences & Patterns']),
        T('Statistics and analysis',13,'reading tables and charts, averages, simple probability, data interpretation',['Data Analysis & Probability'])]},
    /* Cambridge International AS & A Level Mathematics 9709, syllabus 2026–2027 (content unchanged in
       2028–2030). Cambridge publishes no topic weighting, so each topic is weighted by its number of
       learning outcomes in the syllabus (Paper 1: 34, Paper 3: 41). AO balance is the published
       component weighting. */
    aslevel:{source:'Cambridge International AS & A Level Mathematics 9709 syllabus 2026–2027 (unchanged for 2028–2030), Paper 1 Pure Mathematics 1. Cambridge publishes no topic weighting, so each topic is weighted by its share of the Paper 1 learning outcomes (5/5/5/2/5/4/4/4 of 34). Assessment objectives follow the published Paper 1 weighting: AO1 55%, AO2 45%.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:55,desc:'Knowledge and understanding: show understanding of concepts, terminology and notation; recall accurately and use appropriate manipulative techniques'},
          AO2:{weight:45,desc:'Application and communication: recognise the appropriate procedure, apply combinations of skills and techniques to solve problems, present work and conclusions clearly and logically'}},
      exclude:'This is Paper 1 (Pure Mathematics 1) only: no mechanics, no probability or statistics, no vectors, no implicit differentiation.',
      topics:[
        T('Quadratics',5,'1.1: completing the square, discriminant, quadratic equations and inequalities, simultaneous linear and quadratic equations, equations quadratic in a function of x',['Indices, Surds & Quadratics','Simultaneous Equations & Inequalities']),
        T('Functions',5,'1.2: domain and range, one-one functions, composite and inverse functions, graph of a function and its inverse, transformations of y = f(x)',['Functions: Composite & Inverse','Graphs & Transformations']),
        T('Coordinate geometry',5,'1.3: equations of straight lines, parallel and perpendicular lines, equation of a circle, problems with lines and circles, graphs and their equations',['Coordinate Geometry']),
        T('Circular measure',2,'1.4: radians, arc length and sector area',['Circular Measure']),
        T('Trigonometry',5,'1.5: graphs of sine, cosine and tangent, exact values, inverse notation, identities, trigonometric equations',['Trigonometry']),
        T('Series',4,'1.6: binomial expansion of (a + b)^n, arithmetic and geometric progressions, sum to infinity',['Series & the Binomial Theorem']),
        T('Differentiation',4,'1.7: gradient as a limit, derivative of x^n and the chain rule, tangents, normals, increasing/decreasing functions, rates of change, stationary points',['Differentiation & Integration']),
        T('Integration',4,'1.8: integration as the reverse of differentiation, (ax + b)^n, definite and improper integrals, area, volume of revolution',['Differentiation & Integration'])]},
    a2level:{source:'Cambridge International AS & A Level Mathematics 9709 syllabus 2026–2027 (unchanged for 2028–2030), Paper 3 Pure Mathematics 3. Cambridge publishes no topic weighting, so each topic is weighted by its share of the Paper 3 learning outcomes (5/4/2/3/6/3/6/4/8 of 41). Assessment objectives follow the published Paper 3 weighting: AO1 45%, AO2 55%.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:45,desc:'Knowledge and understanding: show understanding of concepts, terminology and notation; recall accurately and use appropriate manipulative techniques'},
          AO2:{weight:55,desc:'Application and communication: recognise the appropriate procedure, apply combinations of skills and techniques to solve problems, present work and conclusions clearly and logically'}},
      exclude:'This is Paper 3 (Pure Mathematics 3) only: no mechanics and no probability or statistics.',
      topics:[
        T('Algebra',5,'3.1: modulus, polynomial division, factor and remainder theorems, partial fractions, binomial expansion for rational n',['Algebra: Partial Fractions & Division','Functions: Modulus & Inverse']),
        T('Logarithmic and exponential functions',4,'3.2: laws of logarithms, ln and e^x, solving equations and inequalities, reducing to linear form',['Exponentials & Logarithms']),
        T('Trigonometry',2,'3.3: sec, cosec, cot; compound and double angle formulae, R cos(θ ± α) form, identities and equations',['Advanced Trigonometry']),
        T('Differentiation',3,'3.4: derivatives of e^x, ln x, trigonometric and inverse tan functions, products, quotients, parametric and implicit differentiation',['Differentiation','Further Calculus']),
        T('Integration',6,'3.5: exponential and trigonometric integrals, 1/(ax+b), partial fractions, substitution, integration by parts, trapezium rule',['Integration','Advanced Integration']),
        T('Numerical solution of equations',3,'3.6: locating roots by sign change, iterative formulae, convergence',['Numerical Methods']),
        T('Vectors',6,'3.7: vectors in 2 and 3 dimensions, magnitude, vector equation of a line, intersecting, parallel and skew lines, scalar product, angle between lines, perpendicular distance',['Vectors']),
        T('Differential equations',4,'3.8: forming and solving first-order differential equations with separable variables, general and particular solutions',['Differential Equations','Differential Equation']),
        T('Complex numbers',8,'3.9: arithmetic, conjugates, roots of polynomials, Argand diagrams, modulus–argument and exponential forms, square roots, loci',['Complex Numbers','Argand Diagram'])]},
    ibsl:{source:'IB Mathematics: Analysis and Approaches SL guide (first assessment 2021, assessed until the new guide\'s first exams in May 2029) — topics weighted by recommended teaching hours (19/21/25/27/28 of 120)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',19,'sequences and series, exponents and logarithms, binomial theorem, proof'),
        T('Functions',21,'function concepts, graphs, transformations, quadratic, rational, exponential and log functions'),
        T('Geometry and trigonometry',25,'3D volume and area, right and non-right triangle trig, radians, trig identities and equations'),
        T('Statistics and probability',27,'data, regression, probability, discrete distributions, binomial and normal distributions'),
        T('Calculus',28,'limits, differentiation, integration, kinematics, optimisation')]},
    ibhl:{source:'IB Mathematics: Analysis and Approaches HL guide (first assessment 2021, assessed until the new guide\'s first exams in May 2029) — topics weighted by recommended teaching hours (39/32/51/33/55 of 210)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',39,'series, logarithms, counting, binomial theorem, proof by induction and contradiction, complex numbers, systems'),
        T('Functions',32,'polynomial, rational and modulus functions, transformations, inequalities'),
        T('Geometry and trigonometry',51,'trig identities and equations, vectors, lines and planes in 3D'),
        T('Statistics and probability',33,'Bayes, discrete and continuous random variables, binomial and normal distributions'),
        T('Calculus',55,'limits, differentiation, integration techniques, differential equations, Maclaurin series')]}
  };
  /* Every other exam (precalc, …) has no
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
