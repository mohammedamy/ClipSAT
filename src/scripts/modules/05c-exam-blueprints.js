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
      exclude:'Strictly follow the official College Board Digital SAT Math specification. DO NOT include: logarithms (log, ln), normal distribution (z-scores, empirical rule, bell curves), interquartile range (IQR, quartiles, box plots, cumulative frequency/ogives), advanced trigonometry (Law of Sines, Law of Cosines, sinusoidal graphs, amplitude/period/phase shift, sec/csc/cot, inverse trig functions, polar coordinates, double-angle identities), advanced probability (permutations, combinations, factorials, binomial/Poisson distributions, Bayes\' theorem, tree diagrams, Venn diagrams, random variable variance), complex or imaginary numbers (a + bi, i^2 = -1), rational function horizontal/slant asymptotes, conic sections beyond circles/parabolas, or non-essential decorative diagrams/graphs when the stem already states the full equation or data.',
      topics:[
        T('Algebra',35,'linear equations and inequalities in one or two variables, linear functions, systems of two linear equations',['Linear Equations in One Variable & Systems of Equations','Linear Functions & Linear Inequalities']),
        T('Advanced Math',35,'equivalent expressions, nonlinear equations and systems, quadratic, exponential, polynomial, rational and radical functions',['Equivalent Expressions & Quadratic Equations','Exponentials, Radicals, Polynomials & Rational Expressions','Nonlinear Functions & Function Notation']),
        T('Problem-Solving and Data Analysis',15,'ratios, rates, proportions, units, percentages, one- and two-variable data (mean, median, range, standard deviation, scatterplots, bar charts), two-way frequency tables and conditional probability, inference from samples and margin of error',['Ratios, Rates, Proportions, Percentages & Scatterplots','One-Variable Statistics, Distributions & Margin of Error','Probability, Conditional Probability & Two-Way Tables']),
        T('Geometry and Trigonometry',15,'area and volume, lines, angles, triangles, right-triangle trigonometry and complementary angle identity, circles, arc length and sector area',['Area, Volume, Triangles, Circles & Trigonometry'])]},
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
        T('Unit 1: Limits and Continuity',11,'limits, continuity, IVT, asymptotic behaviour',['Unit 1 · Limits & Continuity']),
        T('Unit 2: Differentiation — Definition and Fundamental Properties',11,'definition of the derivative, differentiability, basic rules, product and quotient rules',['Unit 2 · Differentiation — Definition and Fundamental Properties']),
        T('Unit 3: Differentiation — Composite, Implicit, and Inverse Functions',11,'chain rule, implicit differentiation, derivatives of inverse functions, higher derivatives',['Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions']),
        T('Unit 4: Contextual Applications of Differentiation',12.5,'rates of change in context, motion, related rates, linearization, L\'Hospital\'s rule',['Unit 4 · Contextual Applications of Differentiation']),
        T('Unit 5: Analytical Applications of Differentiation',16.5,'MVT, extreme value theorem, increasing/decreasing, concavity, curve sketching, optimization',['Unit 5 · Analytical Applications of Differentiation']),
        T('Unit 6: Integration and Accumulation of Change',18.5,'Riemann sums, definite integrals, FTC, accumulation functions, antiderivatives, substitution',['Unit 6 · Integration and Accumulation of Change']),
        T('Unit 7: Differential Equations',9,'slope fields, separable equations, exponential models',['Unit 7 · Differential Equations']),
        T('Unit 8: Applications of Integration',12.5,'average value, motion, area between curves, volumes by cross sections and discs/washers',['Unit 8 · Applications of Integration'])]},
    apbc:{source:'College Board, AP Calculus BC Course and Exam Description, exam weighting by unit (midpoints)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Unit 1: Limits and Continuity',5.5,'limits, continuity, IVT',['apab:Unit 1 · Limits & Continuity']),
        T('Unit 2: Differentiation — Definition and Fundamental Properties',5.5,'definition of the derivative and basic rules',['apab:Unit 2 · Differentiation — Definition and Fundamental Properties']),
        T('Unit 3: Differentiation — Composite, Implicit, and Inverse Functions',5.5,'chain rule, implicit differentiation, inverse functions',['apab:Unit 3 · Differentiation — Composite, Implicit, and Inverse Functions']),
        T('Unit 4: Contextual Applications of Differentiation',7.5,'motion, related rates, linearization, L\'Hospital\'s rule',['apab:Unit 4 · Contextual Applications of Differentiation']),
        T('Unit 5: Analytical Applications of Differentiation',9.5,'MVT, extrema, concavity, optimization',['apab:Unit 5 · Analytical Applications of Differentiation']),
        T('Unit 6: Integration and Accumulation of Change',18.5,'Riemann sums, FTC, integration by parts, partial fractions, improper integrals',['Unit 6BC · Advanced Integration Techniques','Beyond AB — Core BC Topics Overview']),
        T('Unit 7: Differential Equations',7.5,'slope fields, Euler\'s method, separable equations, logistic models',['Unit 7BC · Logistic Models & Euler\'s Method']),
        T('Unit 8: Applications of Integration',7.5,'area, volume, arc length, average value',['AP Calculus BC Free-Response Questions (FRQs)']),
        T('Unit 9: Parametric Equations, Polar Coordinates, and Vector-Valued Functions',11.5,'derivatives and integrals of parametric, polar and vector-valued functions',['Unit 9 · Parametric Equations & Vector-Valued Functions','Unit 9 · Polar Coordinates & Polar Area']),
        T('Unit 10: Infinite Sequences and Series',17.5,'convergence tests, power series, Taylor and Maclaurin series, error bounds',['Unit 10 · Infinite Sequences & Series — Convergence Tests','Unit 10 · Power Series, Taylor & Maclaurin Series'])]},
    appc:{source:'College Board, AP Precalculus Course and Exam Description: Unit 1 30–40%, Unit 2 27–40%, Unit 3 30–35% (Unit 4 is not assessed on the exam)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Unit 1: Polynomial and Rational Functions',35,'rates of change, polynomial and rational functions, transformations, function models',['Unit 1 · Polynomial and Rational Functions','AP Precalculus Exam Format & Modeling Framework']),
        T('Unit 2: Exponential and Logarithmic Functions',33.5,'sequences, exponential and logarithmic functions, inverses, semi-log plots, models',['Unit 2 · Exponential and Logarithmic Functions']),
        T('Unit 3: Trigonometric and Polar Functions',31.5,'periodic phenomena, sine/cosine/tangent functions, inverse trig, equations and inequalities, polar functions',['Unit 3 · Trigonometric and Polar Functions'])]},
    apstats:{source:'College Board, AP Statistics Course and Exam Description (revised course, 2026–27; May 2027 exam), exam weighting by unit (midpoints): Unit 1 20–30%, Unit 2 15–25%, Unit 3 15–25%, Unit 4 10–20%, Unit 5 10–20%',
      difficulty:MIX, order:'mixed',
      exclude:'The revised course no longer assesses departures from linearity (transformations to achieve linearity), combining random variables, the geometric distribution, the chi-square goodness-of-fit test, or inference for the slope of a regression line.',
      topics:[
        T('Unit 1: Exploring One-Variable Data and Collecting Data',25,'representing and describing distributions, summary statistics, the normal distribution, sampling methods, bias, experimental design, statistical investigations',['Unit 1 · Exploring One-Variable & Two-Variable Data','Unit 2 · Collecting Data, Sampling & Experimental Design']),
        T('Unit 2: Probability, Random Variables, and Probability Distributions',20,'probability rules, conditional probability, discrete random variables, the binomial distribution, sampling distributions',['Unit 3 · Probability, Random Variables & Distributions']),
        T('Unit 3: Inference for Categorical Data: Proportions',20,'confidence intervals and significance tests for one and two proportions, errors and power',['Unit 4 · Statistical Inference: Proportions, Means & Slopes']),
        T('Unit 4: Inference for Quantitative Data: Means',15,'t-intervals and t-tests for a mean, a mean difference and a difference of means',['Unit 4 · Statistical Inference: Proportions, Means & Slopes']),
        T('Unit 5: Regression Analysis',15,'two-variable data, scatterplots, correlation, least-squares regression, residuals, interpreting slope and intercept',['Unit 1 · Exploring One-Variable & Two-Variable Data','AP Statistics Exam Format & Study Design'])]},
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
    /* SAAT Tahsili mathematics: Official ETEC/Qiyas Saudi Secondary Pathways weighting:
       20% Year 1 (Logic, Parallel Lines, Triangles, Similar Polygons, Circle Theorems),
       30% Year 2 (Matrices, Complex Numbers, Functions, Sequences/Series, Trigonometry),
       50% Year 3 (Conic Sections, 3D Vectors & Polar, Exponentials & Logarithms, Limits & Derivatives, Definite Integrals, Normal Distribution & Probability). */
    tahsili:{source:'ETEC / Qiyas Official SAAT Tahsili Mathematics Blueprint (Saudi Secondary Pathways نظام المسارات: 20% Year 1, 30% Year 2, 50% Year 3).',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Year 1: Mathematical Logic & Euclidean/Circle Geometry',20,'truth tables, conditionals, contrapositive, parallel lines, triangle congruence/similarity, circle chords, tangents, inscribed angles',['Mathematical Logic & Reasoning','Geometry & Coordinate Geometry']),
        T('Year 2: Matrices, Complex Numbers, Functions, Sequences & Trig',30,'matrix operations, determinants, Cramer\'s rule, complex numbers, polynomials, rational/radical functions, arithmetic/geometric series, binomial theorem, trigonometric identities and laws of sines/cosines',['Algebra, Matrices & Complex Numbers','Algebra & Equations','Functions & Graphs','Functions','Sequences, Series & Binomial Theorem','Sequences & Series','Trigonometry']),
        T('Year 3: Conic Sections, Vectors, Polar Coordinates & De Moivre',14,'parabolas, ellipses, hyperbolas, eccentricity, 3D vectors, dot and cross products, polar coordinates, De Moivre\'s theorem',['Analytic Geometry, Conic Sections & Vectors','Vectors & Matrices']),
        T('Year 3: Exponential & Logarithmic Functions',10,'exponential growth/decay, properties of logarithms, change of base, logarithmic equations',['Exponential & Logarithmic Functions','Exponentials & Logarithms']),
        T('Year 3: Limits, Differential & Integral Calculus',16,'limits at infinity, removable discontinuities, derivative rules, critical points, optimization, Riemann sums, Fundamental Theorem of Calculus, area between curves',['Limits & Differential Calculus','Limits & Derivatives','Integral Calculus & Area','Integration & Applications']),
        T('Year 3: Probability & Normal Distribution',10,'conditional probability, Bayes, binomial distribution, normal distribution empirical rule (68-95-99.7%), Z-scores',['Probability & Normal Distribution','Statistics & Probability'])]},
    qudrat:{source:'Education & Training Evaluation Commission (ETEC / Qiyas), GAT Qudrat Quantitative Section: Arithmetic 40%, Geometry 24%, Algebra 23%, Statistics & Data Analysis 13%, with Quantitative Comparisons across all domains.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Arithmetic, Ratios, Rates & Word Problems',32,'number sense, fractions, decimals, divisibility, percentages, ratios, direct/inverse proportion, speed/motion, work/pipes, ages, mixtures',['Arithmetic & Number Sense','Ratios, Proportion & Percentages','Motion, Speed & Work Rates','Word Problems & Reasoning','Word Problems & Modeling','High-Speed Qiyas Shortcuts']),
        T('Geometry & Shaded Regions',24,'parallel lines, triangles, polygons, inscribed squares and circles, shaded areas, clock angles, 3D solids, coordinates',['Geometry & Measurement','Geometry & Spatial Reasoning']),
        T('Algebra, Exponents, Surds & Sequences',20,'algebraic identities, difference of squares, exponents, surds, equations, arithmetic/geometric sequences, shape/number patterns',['Algebra Essentials','Sequences & Patterns','Number Patterns & Sequences']),
        T('Quantitative Comparisons (المقارنات الكمية)',12,'two-column quantitative comparisons across arithmetic, geometry, and algebra with fixed 4-option ETEC/Qiyas choices',['Quantitative Comparison','Quantitative Comparisons']),
        T('Statistics, Probability & Data Interpretation',12,'circular pie charts (360°), bar/line graphs, two-way tables, arithmetic mean, median, counting principles, probability',['Data Analysis & Probability','Statistics, Probability & Data'])]},
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

    'Cambridge AS Level — Paper 1 (Pure 1)':{source:'Cambridge International AS & A Level Mathematics 9709, Paper 1 Pure Mathematics 1.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:55,desc:'Knowledge and understanding'},AO2:{weight:45,desc:'Application and communication'}},
      topics:[
        T('Quadratics',5,'1.1: quadratics, completing the square, discriminant',['Indices, Surds & Quadratics','Simultaneous Equations & Inequalities']),
        T('Functions',5,'1.2: domain and range, composite and inverse functions',['Functions: Composite & Inverse','Graphs & Transformations']),
        T('Coordinate geometry',5,'1.3: equations of lines, circles',['Coordinate Geometry']),
        T('Circular measure',2,'1.4: radians, arc length, sector area',['Circular Measure']),
        T('Trigonometry',5,'1.5: trig ratios, identities, equations',['Trigonometry']),
        T('Series',4,'1.6: binomial expansion, arithmetic/geometric progressions',['Series & the Binomial Theorem']),
        T('Differentiation',4,'1.7: derivative of x^n, chain rule, tangents, normals, rates of change',['Differentiation & Integration']),
        T('Integration',4,'1.8: integration, area, volume of revolution',['Differentiation & Integration'])]},

    'Cambridge AS Level — Paper 4 (Mechanics)':{source:'Cambridge International AS & A Level Mathematics 9709, Paper 4 Mechanics.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Forces and equilibrium',25,'forces, resolution, equilibrium of a particle, friction',['Forces & Equilibrium']),
        T('Kinematics',25,'straight line motion, constant acceleration, calculus in kinematics',['Kinematics']),
        T("Newton's laws of motion",25,"Newton's laws, gravity, connected particles",["Newton's Laws of Motion"]),
        T('Energy, work and power',25,'work done, kinetic/potential energy, conservation of energy, power',['Energy, Work & Power'])]},

    'Cambridge AS Level — Paper 5 (Statistics 1)':{source:'Cambridge International AS & A Level Mathematics 9709, Paper 5 Probability & Statistics 1.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Representation of data',20,'histograms, stem-and-leaf, cumulative frequency, box plots, mean, standard deviation',['Representation of Data']),
        T('Permutations and combinations',20,'permutations, combinations, counting principles',['Permutations & Combinations']),
        T('Probability',20,'probability rules, conditional probability, tree diagrams',['Statistics & Probability']),
        T('Discrete random variables',20,'probability distributions, expectation, variance',['Discrete Random Variables']),
        T('The normal distribution',20,'normal distribution calculations, standardisation, binomial approximation',['Normal Distribution','Binomial Distribution'])]},

    'Cambridge A Level — Paper 3 (Pure 3)':{source:'Cambridge International AS & A Level Mathematics 9709, Paper 3 Pure Mathematics 3.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:45,desc:'Knowledge and understanding'},AO2:{weight:55,desc:'Application and communication'}},
      topics:[
        T('Algebra',5,'3.1: modulus, partial fractions, polynomial division',['Algebra: Partial Fractions & Division','Functions: Modulus & Inverse']),
        T('Logarithmic and exponential functions',4,'3.2: laws of logarithms, e^x, ln x',['Exponentials & Logarithms']),
        T('Trigonometry',2,'3.3: sec, cosec, cot, compound angles, R cos(θ ± α)',['Advanced Trigonometry']),
        T('Differentiation',3,'3.4: product/quotient rules, parametric/implicit differentiation',['Differentiation','Further Calculus']),
        T('Integration',6,'3.5: integration by parts, substitution, partial fractions',['Integration','Advanced Integration']),
        T('Numerical solution of equations',3,'3.6: sign change, iterative formulae',['Numerical Methods']),
        T('Vectors',6,'3.7: 3D vectors, vector equation of lines, scalar product',['Vectors']),
        T('Differential equations',4,'3.8: separable first-order differential equations',['Differential Equations','Differential Equation']),
        T('Complex numbers',8,'3.9: Argand diagram, modulus-argument form, roots',['Complex Numbers','Argand Diagram'])]},

    'Cambridge A Level — Paper 6 (Statistics 2)':{source:'Cambridge International AS & A Level Mathematics 9709, Paper 6 Probability & Statistics 2.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('The Poisson distribution',25,'Poisson distribution, mean and variance, Poisson as approximation to binomial',['Poisson Distribution']),
        T('Continuous random variables',25,'probability density function, cumulative distribution function, mean and variance',['Continuous Random Variables']),
        T('Sampling and estimation',25,'distribution of sample mean, Central Limit Theorem, unbiased estimates, confidence intervals',['Sampling & Estimation']),
        T('Hypothesis testing',25,'null and alternative hypotheses, Type I and Type II errors, tests for mean and Poisson parameter',['Hypothesis Testing'])]},

    ibsl:{source:'IB Mathematics: Analysis and Approaches SL guide (first assessment 2021, assessed until the new guide\'s first exams in May 2029) — topics weighted by recommended teaching hours (19/21/25/27/28 of 120)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',19,'sequences and series, exponents and logarithms, binomial theorem, proof'),
        T('Functions',21,'function concepts, graphs, transformations, quadratic, rational, exponential and log functions'),
        T('Geometry and trigonometry',25,'3D volume and area, right and non-right triangle trig, radians, trig identities and equations'),
        T('Statistics and probability',27,'data, regression, probability, discrete distributions, binomial and normal distributions'),
        T('Calculus',28,'limits, differentiation, integration, kinematics, optimisation')]},
    'IB Math SL (AA)':{source:'IB Mathematics: Analysis and Approaches SL guide (first assessment 2021) — topics weighted by teaching hours',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',19,'sequences and series, exponents and logarithms, binomial theorem, proof',['Number & Algebra']),
        T('Functions',21,'function concepts, graphs, transformations, quadratic, rational, exponential and log functions',['Functions']),
        T('Geometry and trigonometry',25,'3D volume and area, right and non-right triangle trig, radians, trig identities and equations',['Geometry & Trigonometry']),
        T('Statistics and probability',27,'data, regression, probability, discrete distributions, binomial and normal distributions',['Statistics & Probability']),
        T('Calculus',28,'limits, differentiation, integration, kinematics, optimisation',['Calculus'])]},
    'IB Math SL (AI)':{source:'IB Mathematics: Applications and Interpretation SL guide',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',20,'sequences, finances, systems',['Number & Algebra']),
        T('Functions',20,'linear, quadratic, exponential, cubic, sin/cos models',['Functions']),
        T('Geometry and trigonometry',20,'3D geometry, Voronoi diagrams, right and non-right triangles',['Geometry & Trigonometry']),
        T('Statistics and probability',20,'data displays, bivariate analysis, Spearman rank, chi-square tests, normal distribution',['Statistics & Probability']),
        T('Calculus & Applications',20,'rates of change, tangents, optimization, trapezoidal rule',['AI SL — Specific Topics','Calculus'])]},
    ibhl:{source:'IB Mathematics: Analysis and Approaches HL guide (first assessment 2021, assessed until the new guide\'s first exams in May 2029) — topics weighted by recommended teaching hours (39/32/51/33/55 of 210)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',39,'series, logarithms, counting, binomial theorem, proof by induction and contradiction, complex numbers, systems'),
        T('Functions',32,'polynomial, rational and modulus functions, transformations, inequalities'),
        T('Geometry and trigonometry',51,'trig identities and equations, vectors, lines and planes in 3D'),
        T('Statistics and probability',33,'Bayes, discrete and continuous random variables, binomial and normal distributions'),
        T('Calculus',55,'limits, differentiation, integration techniques, differential equations, Maclaurin series')]},
    'IB Math HL (AA)':{source:'IB Mathematics: Analysis and Approaches HL guide (first assessment 2021)',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',39,'series, logarithms, counting, binomial theorem, proof by induction and contradiction, complex numbers, systems',['Algebra, Proof & Complex Numbers','AA HL — Additional Topics']),
        T('Functions',32,'polynomial, rational and modulus functions, transformations, inequalities',['Functions (HL Extensions)']),
        T('Geometry and trigonometry',51,'trig identities and equations, vectors, lines and planes in 3D',['Vectors & 3D Geometry']),
        T('Statistics and probability',33,'Bayes, discrete and continuous random variables, binomial and normal distributions',['Statistics & Probability (HL)']),
        T('Calculus',55,'limits, differentiation, integration techniques, differential equations, Maclaurin series',['Calculus (HL)'])]},
    'IB Math HL (AI)':{source:'IB Mathematics: Applications and Interpretation HL guide',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Number and algebra',35,'matrices, eigenvalues, complex numbers, proof',['Algebra, Proof & Complex Numbers','AI HL — Additional Topics']),
        T('Functions',25,'non-linear models, transforming data, sinusoidal functions',['Functions (HL Extensions)']),
        T('Geometry and trigonometry',45,'graph theory, algorithms, 3D vectors, matrices for transformations',['Vectors & 3D Geometry']),
        T('Statistics and probability',40,'hypothesis tests, transition matrices, Markov chains, confidence intervals',['Statistics & Probability (HL)']),
        T('Calculus & Applications',45,'differential equations, phase portraits, Euler method, kinematic models',['Calculus (HL)'])]},
    'Cambridge AS Level — Paper 2 (Pure 2)':{source:'Cambridge International AS Level Mathematics 9709, Paper 2 Pure Mathematics 2.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Algebra',5,'modulus, polynomial division, factor theorem',['Algebra: Partial Fractions & Division','Functions: Modulus & Inverse']),
        T('Logarithmic and exponential functions',4,'laws of logs, exponentials, linear law',['Exponentials & Logarithms']),
        T('Trigonometry',4,'sec, cosec, cot, harmonic form R cos(theta +- alpha)',['Trigonometry','Advanced Trigonometry']),
        T('Differentiation',4,'differentiation of e^x, ln x, trig functions, product/quotient rules',['Differentiation & Integration']),
        T('Integration',4,'integration of e^x, 1/x, sin/cos, trapezium rule',['Differentiation & Integration']),
        T('Numerical solution of equations',3,'locating roots, iterative formula x_{n+1} = F(x_n)',['Numerical Methods'])]},

    'Cambridge A Level — Paper 4 (Mechanics)':{source:'Cambridge International AS & A Level Mathematics 9709, Paper 4 Mechanics.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Forces and equilibrium',25,'forces, resolution, equilibrium of a particle, friction',['Forces & Equilibrium']),
        T('Kinematics',25,'straight line motion, constant acceleration, calculus in kinematics',['Kinematics']),
        T("Newton's laws of motion",25,"Newton's laws, gravity, connected particles",["Newton's Laws of Motion"]),
        T('Energy, work and power',25,'work done, kinetic/potential energy, conservation of energy, power',['Energy, Work & Power'])]},

    'Edexcel IGCSE (4MA1) — Paper 1H':{source:'Pearson Edexcel International GCSE (9–1) Mathematics A (4MA1) Higher Tier, Paper 1H.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Mathematical reasoning and technique'},AO2:{weight:50,desc:'Problem solving and application'}},
      topics:[
        T('Number',25,'fractions, percentages, standard form, indices, surds, set notation, recurring decimals',['Number']),
        T('Algebra & Graphs',35,'linear and quadratic equations, inequalities, graphs, sequences, functions, calculus basics',['Algebra & Graphs']),
        T('Geometry',25,'angles, polygons, circles, trigonometry, 3D mensuration, vectors, transformations',['Geometry']),
        T('Statistics & Probability',15,'mean, cumulative frequency, histograms, probability trees, Venn diagrams',['Statistics & Probability'])]},

    'Edexcel IGCSE (4MA1) — Paper 2H':{source:'Pearson Edexcel International GCSE (9–1) Mathematics A (4MA1) Higher Tier, Paper 2H.',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Mathematical reasoning and technique'},AO2:{weight:50,desc:'Problem solving and application'}},
      topics:[
        T('Number',25,'fractions, percentages, standard form, indices, surds, set notation, recurring decimals',['Number']),
        T('Algebra & Graphs',35,'linear and quadratic equations, inequalities, graphs, sequences, functions, calculus basics',['Algebra & Graphs']),
        T('Geometry',25,'angles, polygons, circles, trigonometry, 3D mensuration, vectors, transformations',['Geometry']),
        T('Statistics & Probability',15,'mean, cumulative frequency, histograms, probability trees, Venn diagrams',['Statistics & Probability'])]},

    'Edexcel IAL — Pure Mathematics 1 (WMA11)':{source:'Pearson Edexcel International Advanced Level Pure Mathematics 1 (WMA11).',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Algebra and functions',35,'indices, surds, quadratics, discriminant, simultaneous equations, inequalities',['Indices, Surds & Quadratics','Simultaneous Equations & Inequalities']),
        T('Coordinate geometry',25,'straight line equations, parallel and perpendicular lines, length, midpoint',['Coordinate Geometry']),
        T('Calculus: Differentiation',20,'derivative of x^n, tangents and normals, rates of change',['Differentiation & Integration']),
        T('Calculus: Integration',20,'indefinite integration of x^n, finding equations of curves',['Differentiation & Integration'])]},

    'Edexcel IAL — Pure Mathematics 2 (WMA12)':{source:'Pearson Edexcel International Advanced Level Pure Mathematics 2 (WMA12).',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Proof & Algebra',20,'factor theorem, remainder theorem, algebraic division',['Algebra: Partial Fractions & Division']),
        T('Coordinate geometry: Circles',20,'equation of circle, center, radius, tangents to circles',['Coordinate Geometry']),
        T('Sequences and series',20,'binomial expansion, arithmetic and geometric progressions, sum to infinity',['Series & the Binomial Theorem']),
        T('Trigonometry',20,'sine/cosine rules, radians, sector area, trig identities, trig equations',['Trigonometry','Circular Measure']),
        T('Calculus',20,'definite integration, area under a curve, trapezoidal rule, stationary points',['Differentiation & Integration'])]},

    'Edexcel IAL — Pure Mathematics 3 (WMA13)':{source:'Pearson Edexcel International Advanced Level Pure Mathematics 3 (WMA13).',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Algebra and functions',20,'modulus functions, composite and inverse functions, partial fractions',['Algebra: Partial Fractions & Division','Functions: Modulus & Inverse']),
        T('Trigonometry',25,'sec, cosec, cot, compound angle identities, double angle identities, R cos(x +- alpha)',['Advanced Trigonometry']),
        T('Exponentials and logarithms',15,'e^x, ln x, graphs, exponential growth and decay models',['Exponentials & Logarithms']),
        T('Differentiation',25,'chain rule, product rule, quotient rule, exponential and logarithmic derivatives',['Differentiation','Further Calculus']),
        T('Numerical methods',15,'sign change root finding, fixed-point iteration, convergence',['Numerical Methods'])]},

    'Edexcel IAL — Pure Mathematics 4 (WMA14)':{source:'Pearson Edexcel International Advanced Level Pure Mathematics 4 (WMA14).',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Proof & Binomial',15,'proof by contradiction, binomial series for rational exponents',['Algebra: Partial Fractions & Division']),
        T('Advanced Integration',35,'integration by parts, substitution, partial fractions, volume of revolution',['Advanced Integration','Integration']),
        T('Differential equations',20,'first-order separable differential equations, initial value problems',['Differential Equations','Differential Equation']),
        T('Vectors',30,'vectors in 3D, line equations, scalar product, angle between lines, intersecting and skew lines',['Vectors'])]},

    'Edexcel IAL — Mechanics 1 (WME01)':{source:'Pearson Edexcel International Advanced Level Mechanics 1 (WME01).',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Kinematics',30,'constant acceleration, calculus in kinematics, velocity-time graphs',['Kinematics']),
        T('Dynamics & Newton\'s Laws',35,'Newton\'s laws of motion, connected particles, gravity, friction',['Newton\'s Laws of Motion']),
        T('Statics & Equilibrium',20,'equilibrium of concurrent forces, resolution of forces, inclined planes',['Forces & Equilibrium']),
        T('Energy and Power',15,'work done by a force, kinetic energy, work-energy principle, power',['Energy, Work & Power'])]},

    'Edexcel IAL — Statistics 1 (WST01)':{source:'Pearson Edexcel International Advanced Level Statistics 1 (WST01).',
      difficulty:MIX, order:'mixed',
      ao:{AO1:{weight:50,desc:'Knowledge and understanding'},AO2:{weight:50,desc:'Application and communication'}},
      topics:[
        T('Representation of data',25,'measures of location and spread, box plots, outliers, histograms, skewness',['Representation of Data']),
        T('Probability',25,'Venn diagrams, tree diagrams, conditional probability, independent events',['Statistics & Probability']),
        T('Discrete random variables',25,'probability distributions, expectation E(X), variance Var(X), linear transformations',['Discrete Random Variables']),
        T('The Normal distribution',25,'standardization Z = (X - mu)/sigma, finding probabilities and parameters',['Normal Distribution'])]},

    'GAT Quantitative (English Medium)':{source:'National Center for Assessment (Qiyas), GAT General Aptitude Test — Quantitative Section (English version).',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Arithmetic & Word Problems',35,'arithmetic operations, fractions, decimals, percentages, ratios, rates, word problems',['Arithmetic & Number Sense','Ratios, Proportion & Percentages','Motion, Speed & Work Rates','Word Problems & Reasoning','Word Problems & Modeling','High-Speed Qiyas Shortcuts']),
        T('Geometry & Shaded Regions',24,'angles, triangles, polygons, circles, perimeter, area, volume, coordinate geometry',['Geometry & Measurement','Geometry & Spatial Reasoning']),
        T('Algebra & Sequences',20,'linear and quadratic equations, expressions, inequalities, sequences and patterns',['Algebra Essentials','Sequences & Patterns','Number Patterns & Sequences']),
        T('Quantitative Comparisons',9,'two-column quantitative comparison across arithmetic, algebra, and geometry',['Quantitative Comparison','Quantitative Comparisons']),
        T('Data Analysis & Probability',12,'tables, charts, averages, simple probability, statistical reasoning',['Data Analysis & Probability','Statistics, Probability & Data'])]},

    'SAAT Mathematics (English Medium)':{source:'National Center for Assessment (Qiyas), SAAT Standardized Achievement Admission Test — Mathematics (English version).',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Algebra, Matrices & Functions',30,'logic, polynomials, rational expressions, exponential and logarithmic functions, sequences, matrices, complex numbers',['Mathematical Logic & Reasoning','Algebra, Matrices & Complex Numbers','Algebra & Equations','Functions & Graphs','Functions','Sequences, Series & Binomial Theorem','Sequences & Series','Exponential & Logarithmic Functions','Exponentials & Logarithms']),
        T('Geometry, Conics & Vectors',25,'angles, parallel lines, triangles, quadrilaterals, circles, coordinate geometry, transformations, conics, 3D vectors',['Geometry & Coordinate Geometry','Analytic Geometry, Conic Sections & Vectors','Vectors & Matrices']),
        T('Trigonometry',15,'unit circle, trig identities, laws of sines and cosines, trig equations',['Trigonometry']),
        T('Calculus & Statistics',30,'limits, derivatives, integrals, permutations, probability, normal distribution',['Limits & Differential Calculus','Limits & Derivatives','Integral Calculus & Area','Integration & Applications','Probability & Normal Distribution','Statistics & Probability'])]},

    'Qudrat — Quantitative Comparisons & Shaded Geometry Drill':{source:'ETEC / Qiyas High-Yield Quantitative Comparisons & Shaded Geometry Intensive.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Quantitative Comparisons (المقارنات الكمية)',50,'two-column quantitative comparisons across arithmetic, algebra, and geometry with fixed 4-option ETEC/Qiyas choices',['Quantitative Comparison','Quantitative Comparisons']),
        T('Shaded Areas, Circles, Clocks & Spatial Geometry',50,'inscribed circles and squares, lunes, parallel lines, polygons, clock angles, 3D solids',['Geometry & Spatial Reasoning','Geometry & Measurement'])]},

    'Tahsili — Year 3 Secondary Intensive (50% Exam Weight)':{source:'ETEC / Qiyas Year 3 Secondary Pathways Intensive (رياضيات ٣ — 50% of Official SAAT Tahsili).',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Analytic Geometry, Conic Sections, Vectors & Polar',28,'parabolas, ellipses, hyperbolas, eccentricity, 3D vectors, dot/cross product, polar coordinates, De Moivre',['Analytic Geometry, Conic Sections & Vectors','Vectors & Matrices']),
        T('Exponential & Logarithmic Functions',20,'exponential equations, logarithmic laws, change of base, growth/decay models',['Exponential & Logarithmic Functions','Exponentials & Logarithms']),
        T('Limits & Differential Calculus',20,'limits at infinity, algebraic limits, derivative rules, tangent lines, critical points, extrema',['Limits & Differential Calculus','Limits & Derivatives']),
        T('Integral Calculus & Area',16,'antiderivatives, Fundamental Theorem of Calculus, definite integrals, area between curves',['Integral Calculus & Area','Integration & Applications']),
        T('Probability & Normal Distribution',16,'conditional probability, binomial distribution, normal distribution empirical rule (68-95-99.7%), Z-scores',['Probability & Normal Distribution','Statistics & Probability'])]},

    'Tahsili — Year 1 & Year 2 Secondary Foundations (50% Exam Weight)':{source:'ETEC / Qiyas Year 1 (20%) & Year 2 (30%) Secondary Pathways Foundations (رياضيات ١ و ٢).',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Year 1: Mathematical Logic & Reasoning',14,'truth tables, conditionals, converse, inverse, contrapositive, deductive reasoning',['Mathematical Logic & Reasoning']),
        T('Year 1: Euclidean, Triangle & Circle Geometry',26,'parallel lines, triangle congruence and similarity, polygon angles, circle chords, tangents, inscribed angles',['Geometry & Coordinate Geometry']),
        T('Year 2: Matrices, Determinants & Complex Numbers',16,'matrix operations, 2x2 and 3x3 determinants, multiplicative inverse, Cramer\'s rule, powers of i, complex algebra',['Algebra, Matrices & Complex Numbers','Algebra & Equations']),
        T('Year 2: Functions, Variations & Radicals',16,'domain and range, inverse and composite functions, vertical/horizontal asymptotes, joint/inverse variation, radical equations',['Functions & Graphs','Functions']),
        T('Year 2: Sequences, Series & Binomial Theorem',14,'arithmetic and geometric progressions, infinite geometric series, sigma notation, binomial theorem',['Sequences, Series & Binomial Theorem','Sequences & Series']),
        T('Year 2: Trigonometric Functions & Identities',14,'radian measure, Pythagorean/double-angle/half-angle identities, law of sines, law of cosines',['Trigonometry'])]},

    'Mawhiba & Kangaroo Math Arabia (Senior)':{source:'Mawhiba / Association Kangourou sans Frontières (AKSF) Mathematics Competition — Student / Senior Level.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Part A — 3-Point Questions',33,'fundamental logical reasoning, spatial awareness, arithmetic patterns',['Arithmetic & Number Sense','Algebra Essentials']),
        T('Part B — 4-Point Questions',34,'intermediate problem solving, combinatorics, plane and solid geometry, functional equations',['Geometry & Measurement','Word Problems & Reasoning']),
        T('Part C — 5-Point Questions',33,'advanced mathematical olympiad challenges, number theory, extremal combinatorics, invariants',['Sequences & Patterns','Advanced Topics'])]},

    'AMC 10/12 Mathematics Competition':{source:'Mathematical Association of America (MAA), American Mathematics Competitions 10/12.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Algebra & Polynomials',30,'complex numbers, Vieta\'s formulas, inequalities, sequences and series, functional equations',['Algebra & Pre-Calculus','Algebra Essentials']),
        T('Geometry & Trigonometry',30,'Euclidean geometry, cyclic quadrilaterals, power of a point, trigonometry, coordinate geometry',['Geometry & Coordinate Math','Trigonometry']),
        T('Number Theory',20,'divisibility, prime factorization, modular arithmetic, Diophantine equations',['Arithmetic & Number Sense']),
        T('Combinatorics & Probability',20,'counting principles, pigeonhole principle, binomial coefficients, probability, expected value',['Statistics & Probability'])],},

    'addmath':{source:'Cambridge Assessment International Education IGCSE Additional Mathematics (0606) & Pearson Edexcel Further Pure Mathematics (4PM1).',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Functions & Quadratic Theory',12.5,'domain, range, composite and inverse functions, discriminant, quadratic inequalities',['Functions & Quadratic Theory']),
        T('Polynomials & Binomial Expansions',12.5,'remainder and factor theorems, cubic equations, binomial expansion for positive integers',['Polynomials & Binomial Expansions']),
        T('Logarithmic & Exponential Functions',12.5,'laws of logarithms, solving exponential equations, reduction to linear form',['Logarithmic & Exponential Functions']),
        T('Trigonometry & Circular Measure',15,'radian measure, arc length s = r*theta, sector area, trig identities, equations in radians',['Trigonometry & Circular Measure']),
        T('Permutations & Combinations',12.5,'arrangements, selections, cases with restrictions, binomial coefficients',['Permutations & Combinations']),
        T('Differentiation & Rates of Change',12.5,'product, quotient, chain rule, connected rates of change, tangents, normals, stationary points',['Differentiation & Rates of Change']),
        T('Integration & Kinematics',12.5,'standard integrals, area under curves, kinematics with variable acceleration v = ds/dt, a = dv/dt',['Integration & Kinematics']),
        T('2D Vectors & Relative Velocity',10,'magnitude, direction, unit vectors, position vectors, displacement, velocity',['2D Vectors & Relative Velocity'])]},

    'mathai':{source:'Mathematics for Artificial Intelligence, Machine Learning & Data Science foundations curriculum.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Vectors, Norms & Embeddings',15,'vector spaces, dot product, L1/L2 norms, cosine similarity, word embeddings representation',['Vectors, Norms & Embeddings']),
        T('Matrices & Linear Transformations',15,'matrix multiplication, determinants, rank, inverse, linear neural network layers y = Wx + b',['Matrices & Linear Transformations']),
        T('Gradient Descent & Optimization',15,'partial derivatives, gradient vectors, learning rate, loss landscapes, backpropagation',['Gradient Descent & Optimization']),
        T('Probability & Bayes\' Theorem',15,'conditional probability, Bayes\' rule, prior, likelihood, posterior, Naive Bayes classifier',['Probability & Bayes\' Theorem']),
        T('Distributions & Maximum Likelihood',15,'Gaussian, Bernoulli, Binomial distributions, likelihood functions, MLE parameter estimation',['Distributions & Maximum Likelihood']),
        T('Linear & Logistic Regression',15,'least squares regression, sigmoid activation, log-odds, binary cross-entropy loss',['Linear & Logistic Regression']),
        T('Principal Component Analysis (PCA)',10,'covariance matrix, eigenvalues, eigenvectors, dimensionality reduction, variance retention',['Principal Component Analysis (PCA)'])]},

    'AI Math Foundations — Part A (Linear Algebra & Geometry)':{source:'Mathematics for AI Foundations — Part A (Vectors, Matrices & Transformations).',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Vectors, Norms & Embeddings',35,'vector spaces, dot product, L1/L2 norms, cosine similarity, word embeddings representation',['Vectors, Norms & Embeddings']),
        T('Matrices & Linear Transformations',35,'matrix multiplication, determinants, rank, inverse, linear neural network layers y = Wx + b',['Matrices & Linear Transformations']),
        T('Gradient Descent & Optimization',30,'partial derivatives, gradient vectors, learning rate, loss landscapes, backpropagation',['Gradient Descent & Optimization'])]},

    'AI Math Foundations — Part B (Calculus, Probability & PCA)':{source:'Mathematics for AI Foundations — Part B (Probability, Modeling & Dimensionality Reduction).',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Probability & Bayes\' Theorem',25,'conditional probability, Bayes\' rule, prior, likelihood, posterior, Naive Bayes classifier',['Probability & Bayes\' Theorem']),
        T('Distributions & Maximum Likelihood',25,'Gaussian, Bernoulli, Binomial distributions, likelihood functions, MLE parameter estimation',['Distributions & Maximum Likelihood']),
        T('Linear & Logistic Regression',25,'least squares regression, sigmoid activation, log-odds, binary cross-entropy loss',['Linear & Logistic Regression']),
        T('Principal Component Analysis (PCA)',25,'covariance matrix, eigenvalues, eigenvectors, dimensionality reduction, variance retention',['Principal Component Analysis (PCA)'])]},

    'edexcel':{source:'Pearson Edexcel International GCSE Mathematics A (4MA1 Higher Tier) — Paper 1H & Paper 2H Specification.',
      difficulty:MIX, order:'ascending',
      topics:[
        T('Number, Surds, Bounds & Set Theory',15,'fractional indices, rationalizing surd denominators, upper/lower bounds, Venn diagrams',['Number, Surds, Bounds & Set Theory']),
        T('Algebraic Fractions, Quadratics & Simultaneous Systems',20,'algebraic fractions, completing the square, quadratic inequalities, linear-quadratic systems',['Algebraic Fractions, Quadratics & Simultaneous Systems']),
        T('Functions, Transformations & Arithmetic Series',15,'composite and inverse functions, graph transformations, arithmetic series sum Sn',['Functions, Transformations & Arithmetic Series']),
        T('Coordinate Geometry & Linear Programming',10,'perpendicular bisectors, equations of lines, graphical linear programming regions',['Coordinate Geometry & Linear Programming']),
        T('Circle Theorems, Similar Solids & Mensuration',15,'alternate segment theorem, intersecting chords/secants, frustums, area/volume scale factors',['Circle Theorems, Similar Solids & Mensuration']),
        T('Sine/Cosine Rules, 3D Trigonometry & Vectors',10,'sine and cosine rules, 3D space diagonals, vector collinearity proofs',['Sine/Cosine Rules, 3D Trigonometry & Vectors']),
        T('Differentiation, Stationary Points & Kinematics',8,'power rule differentiation, turning points, displacement-velocity-acceleration kinematics',['Differentiation, Stationary Points & Kinematics']),
        T('Histograms, Cumulative Frequency & Conditional Probability',7,'frequency density histograms, cumulative frequency quartiles, tree diagrams without replacement',['Histograms, Cumulative Frequency & Conditional Probability'])]},

    'gaten':{source:'ETEC / Qiyas English-Medium General Aptitude Test (GAT Quantitative) & Standardized Achievement Admission Test (SAAT Mathematics).',
      difficulty:MIX, order:'mixed',
      topics:[
        T('GAT Arithmetic Shortcuts, Surds & Number Sense',15,'difference of squares, cyclicity of units digits, telescoping fractions, surds',['GAT Arithmetic Shortcuts, Surds & Number Sense']),
        T('GAT Ratios, Percentages, Work & Motion Problems',15,'successive percentages, combined work rates, harmonic average speed',['GAT Ratios, Percentages, Work & Motion Problems']),
        T('GAT Quantitative Comparisons & Fast Geometry',15,'Choices A/B/C/D comparisons, shaded circle/square areas, clock angles',['GAT Quantitative Comparisons & Fast Geometry']),
        T('GAT Data Interpretation, Averages & Counting',10,'pie chart angles, consecutive integer averages, handshakes and circular permutations',['GAT Data Interpretation, Averages & Counting']),
        T('SAAT Logic, Polynomials, Matrices & Complex Numbers',12,'contrapositive logic, 2x2 determinants, complex conjugates, powers of i',['SAAT Logic, Polynomials, Matrices & Complex Numbers']),
        T('SAAT Functions, Sequences & Logarithms',11,'rational asymptotes, convergent infinite geometric series, logarithm laws',['SAAT Functions, Sequences & Logarithms']),
        T('SAAT Trigonometry, Conics & Vectors',11,'double-angle identities, ellipse/hyperbola eccentricity, 3D dot product orthogonality',['SAAT Trigonometry, Conics & Vectors']),
        T('SAAT Differential & Integral Calculus',11,'algebraic limits, tangent slopes, Fundamental Theorem of Calculus, area under curves',['SAAT Differential & Integral Calculus'])]},

    'olympiad':{source:'MAA AMC 10/12, AIME, Kangaroo Math Arabia & Mawhiba Mathematical Olympiad.',
      difficulty:MIX, order:'ascending',
      topics:[
        T('Olympiad Algebra, Vieta & Inequalities',15,'Vieta symmetric sums, AM-GM and Cauchy-Schwarz inequalities, telescoping series',['Olympiad Algebra, Vieta & Inequalities']),
        T('Modular Arithmetic, Primes & Divisibility',15,'Fermat Little Theorem, Euler totient function, Chinese Remainder Theorem, divisor counts',['Modular Arithmetic, Primes & Divisibility']),
        T('Diophantine Equations, SFFT & Floor Functions',12.5,'Simon Favorite Factoring Trick, Frobenius coin theorem, Legendre factorial formula',['Diophantine Equations, SFFT & Floor Functions']),
        T('Bijective Counting, Inclusion-Exclusion & Pigeonhole',12.5,'Stars and Bars, Principle of Inclusion-Exclusion, derangements, Pigeonhole principle',['Bijective Counting, Inclusion-Exclusion & Pigeonhole']),
        T('Recurrence Relations & Geometric Probability',10,'Fibonacci and Catalan recurrences, coupled Markov states, continuous geometric probability',['Recurrence Relations & Geometric Probability']),
        T('Circle Geometry, Power of a Point & Radical Axes',12.5,'Power of a Point, radical axis, Ptolemy and Brahmagupta theorems for cyclic quadrilaterals',['Circle Geometry, Power of a Point & Radical Axes']),
        T('Triangle Centers, Ceva, Menelaus & Stewart',12.5,'Euler line, Ceva and Menelaus theorems, Stewart theorem, inradius/circumradius formulas',['Triangle Centers, Ceva, Menelaus & Stewart']),
        T('Invariants, Monovariants, Coloring & Games',10,'parity and coloring invariants, Pick lattice theorem, Nim XOR game strategy',['Invariants, Monovariants, Coloring & Games'])]},

    'algebra':{source:'Core Mathematics Curriculum — Algebra I End-of-Course Specification.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Linear Equations & Inequalities',25,'solving multi-step linear equations, absolute value equations, compound inequalities',['Linear Equations & Inequalities','Linear Equations']),
        T('Linear Functions & Systems',25,'slope, rate of change, linear graphing, systems of linear equations and inequalities',['Functions & Linear Models','Systems of Equations & Inequalities']),
        T('Exponents, Radicals & Polynomials',20,'laws of exponents, scientific notation, radical simplification, polynomial operations and factoring',['Exponents & Radicals','Polynomials & Factoring']),
        T('Quadratic Functions & Equations',20,'graphing parabolas, vertex form, factoring, completing the square, quadratic formula, discriminant',['Quadratic Functions & Equations']),
        T('Exponential Models & Data Analysis',10,'exponential growth and decay, geometric sequences, two-way tables, scatterplots',['Exponential Functions','Statistics & Data'])],},

    'geo':{source:'Core Mathematics Curriculum — Euclidean & Coordinate Geometry Specification.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Logical Reasoning, Lines & Angles',15,'deductive proof, parallel lines and transversals, angle relationships, polygon angle sums',['Foundations & Logical Reasoning','Parallel & Perpendicular Lines','Polygons & Quadrilaterals']),
        T('Triangles, Congruence & Similarity',25,'SSS/SAS/ASA/AAS/HL congruence, triangle inequalities, proportional segments, similar triangles',['Congruence & Triangles','Similarity & Proportions']),
        T('Right Triangles & Trigonometry',20,'Pythagorean theorem, special right triangles (30-60-90, 45-45-90), SOHCAHTOA, Law of Sines and Cosines',['Right Triangles & Trigonometry']),
        T('Circles, Arcs & Chords',20,'central and inscribed angles, tangents, secants, chord segments, equation of a circle, sector area',['Circles']),
        T('Coordinate Geometry, Transformations & 3D Solids',20,'distance, midpoint, rigid motions, dilations, surface area and volume of prisms, cylinders, cones, spheres',['Coordinate Geometry & Transformations','Area, Surface Area & Volume'])],},

    'alg2':{source:'Core Mathematics Curriculum — Algebra II Advanced Course Specification.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Functions, Quadratics & Complex Numbers',25,'function transformations, inverses, complex numbers a+bi, quadratic systems',['Functions & Transformations','Quadratics & Complex Numbers','Systems & Matrices']),
        T('Polynomial & Radical Functions',25,'Remainder and Factor theorems, polynomial division, end behavior, rational exponents, radical equations',['Polynomials & Factoring','Radical Functions & Rational Exponents']),
        T('Rational Expressions & Equations',15,'simplifying rational expressions, vertical/horizontal asymptotes, solving rational equations',['Rational Expressions & Functions']),
        T('Exponential & Logarithmic Functions',20,'Euler number e, logarithm laws, change of base, exponential and logarithmic equations',['Exponential & Logarithmic Functions']),
        T('Sequences, Series, Conics & Probability',15,'arithmetic and geometric series, binomial expansion, parabolas/ellipses/hyperbolas, probability',['Sequences & Series','Conic Sections','Probability & Statistics','Trigonometric Functions'])],},

    'precalc':{source:'High School & University Bridge — Pre-Calculus Comprehensive Specification.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Functions, Polynomials & Rational Analysis',20,'domain, composition, inverse functions, polynomial zeros, rational asymptotes',['Functions & Graphs','Polynomial & Rational Functions']),
        T('Exponential & Logarithmic Modeling',15,'logarithmic laws, continuous growth/decay, logistic models, nonlinear equations',['Exponential & Logarithmic Functions']),
        T('Trigonometric Functions & Analytic Identities',25,'unit circle, radian measure, sinusoidal graphs, inverse trig, sum/difference/double-angle identities, Laws of Sines and Cosines',['Trigonometric Functions','Analytic Trigonometry','Applications of Trigonometry']),
        T('Vectors, Polar Coordinates & Parametric Curves',20,'2D vectors, dot product, polar equations and graphs, De Moivre theorem, parametric motion',['Vectors, Parametric & Polar','Complex Numbers & Polar Form']),
        T('Matrices, Conic Sections, Series & Limits',20,'matrix inverses, determinants, ellipses/hyperbolas/parabolas, infinite series, mathematical induction, limits',['Systems & Matrices','Conic Sections','Sequences, Series & Induction','Introduction to Limits'])],},

    'calculus':{source:'Differential & Integral Single-Variable Calculus Specification.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Limits & Continuity',15,'one-sided limits, algebraic limit laws, squeeze theorem, limits at infinity, continuity, IVT',['Foundations','Limits & Continuity']),
        T('Derivatives & Differentiation Rules',25,'limit definition, power/product/quotient/chain rules, implicit, inverse, and logarithmic differentiation',['Derivatives']),
        T('Applications of Differentiation',20,'tangent lines, related rates, MVT, extreme values, concavity, optimization, L\'Hôpital\'s rule',['Applications of Derivatives']),
        T('Definite Integrals & Fundamental Theorem',20,'Riemann sums, properties of definite integrals, Fundamental Theorem of Calculus Parts 1 & 2, u-substitution',['Integrals']),
        T('Integration Techniques, DEs & Applications',20,'area between curves, volumes of revolution, integration by parts, separable differential equations, infinite series',['Applications of Integration','Differential Equations','Infinite Series'])],},

    'linalg':{source:'University Mathematics — Linear Algebra & Matrix Theory Specification.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('Linear Systems, Vectors & Row Reduction',20,'Gaussian elimination, echelon forms, vector equations, span, linear independence',['Vectors & Spaces','Linear Systems & Gaussian Elimination']),
        T('Matrix Algebra, Inverses & Determinants',20,'matrix multiplication, LU factorization, invertible matrix theorem, determinant properties, cofactor expansion, Cramer\'s rule',['Matrix Algebra','Determinants']),
        T('Vector Spaces, Subspaces, Basis & Dimension',20,'column space, null space, rank-nullity theorem, basis, coordinates, change of basis',['Subspaces, Basis & Dimension','Linear Transformations']),
        T('Eigenvalues, Eigenvectors & Diagonalization',20,'characteristic polynomial, eigenspaces, similarity, diagonalization, powers of matrices, dynamical systems',['Eigenvalues & Eigenvectors']),
        T('Orthogonality, Least Squares & Spectral Theorem',20,'inner products, orthogonal projections, Gram-Schmidt process, QR factorization, least squares, symmetric matrices, SVD',['Orthogonality & Least Squares','Symmetric Matrices & SVD'])],},

    'mvc':{source:'University Mathematics — Multivariable & Vector Calculus Specification.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('3D Vectors, Lines, Planes & Quadric Surfaces',15,'dot and cross products, equations of lines and planes in R^3, cylinders and quadric surfaces',['Vectors & 3D Space']),
        T('Vector-Valued Functions & Space Curves',15,'derivatives and integrals of vector functions, arc length, curvature, TNB frame, planetary motion',['Vector Functions & Space Curves']),
        T('Partial Derivatives, Gradients & Optimization',25,'multivariable limits, partial derivatives, chain rule, directional derivatives, gradient vector, tangent planes, Lagrange multipliers',['Partial Derivatives & Gradients','Multivariable Optimization']),
        T('Double & Triple Integrals',25,'iterated integrals, polar/cylindrical/spherical coordinates, Jacobian change of variables, center of mass',['Double Integrals','Triple Integrals & Coordinate Systems']),
        T('Line Integrals, Surface Integrals & Vector Theorems',20,'conservative vector fields, Green\'s theorem, curl and divergence, parametric surfaces, Stokes\' and Divergence theorems',['Line Integrals & Green\'s Theorem','Surface Integrals, Stokes\' & Divergence'])],},

    'odes':{source:'University Mathematics — Ordinary Differential Equations Specification.',
      difficulty:MIX, order:'mixed',
      topics:[
        T('First-Order Differential Equations',25,'direction fields, separable ODEs, linear integrating factors, exact equations, Bernoulli and autonomous models',['First-Order ODEs','Separable & Linear Equations','Exact Equations & Substitutions']),
        T('Second-Order & Higher-Order Linear ODEs',25,'characteristic equation, real/complex/repeated roots, Wronskian, undetermined coefficients, variation of parameters, harmonic oscillators',['Second-Order Linear ODEs','Nonhomogeneous Equations & Resonance']),
        T('Laplace Transforms & Step/Impulse Forcing',20,'Laplace and inverse Laplace transforms, Heaviside step functions, Dirac delta impulse, convolution theorem',['Laplace Transforms']),
        T('Systems of Linear ODEs & Phase Portraits',15,'eigenvalue-eigenvector method for x\' = Ax, nodes, saddles, spirals, stability, matrix exponential',['Systems of ODEs & Phase Plane']),
        T('Series Solutions, Numerical Methods & BVPs',15,'power series around ordinary points, Euler and Runge-Kutta (RK4) methods, Sturm-Liouville eigenvalues, Fourier series',['Series Solutions & Special Functions','Boundary Value Problems & Fourier'])]}
  };

  // Modular Cambridge IGCSE 0580 and IB AA / AI Paper 1 / Paper 2 / Paper 3 mappings
  B['Cambridge IGCSE 0580 — Paper 2 (Extended Non-Calculator)'] = B['igcse'];
  B['Cambridge IGCSE 0580 — Paper 4 (Extended Calculator)'] = B['igcse'];
  B['IB Math SL (AA) — Paper 1 (Non-Calculator)'] = B['IB Math SL (AA)'];
  B['IB Math SL (AA) — Paper 2 (GDC Required)'] = B['IB Math SL (AA)'];
  B['IB Math SL (AI) — Paper 1 (GDC Short-Response)'] = B['IB Math SL (AI)'];
  B['IB Math SL (AI) — Paper 2 (GDC Extended-Response)'] = B['IB Math SL (AI)'];
  B['IB Math HL (AA) — Paper 1 (Non-Calculator)'] = B['IB Math HL (AA)'];
  B['IB Math HL (AA) — Paper 2 (GDC Required)'] = B['IB Math HL (AA)'];
  B['IB Math HL (AA) — Paper 3 (GDC Extended Investigation)'] = B['IB Math HL (AA)'];
  B['IB Math HL (AI) — Paper 1 (GDC Short-Response)'] = B['IB Math HL (AI)'];
  B['IB Math HL (AI) — Paper 2 (GDC Extended-Response)'] = B['IB Math HL (AI)'];
  B['IB Math HL (AI) — Paper 3 (GDC Extended Investigation)'] = B['IB Math HL (AI)'];
  B['Cambridge IGCSE 0606 — Paper 1'] = B['addmath'];
  B['Cambridge IGCSE 0606 — Paper 2'] = B['addmath'];
  B['Edexcel Further Pure 4PM1 — Paper 1'] = B['addmath'];
  B['Edexcel Further Pure 4PM1 — Paper 2'] = B['addmath'];
  B['GAT Qudrat — Quantitative Reasoning'] = B['qudrat'];
  B['Qudrat Digital (CBT / المحوسب) — 4-Module Adaptive Simulation'] = B['qudrat'];
  B['Qudrat Paper-Based (الورقي) — Full Quantitative Booklet'] = B['qudrat'];
  B['SAAT Tahsili Mathematics'] = B['tahsili'];
  B['SAAT Tahsili — Mathematics'] = B['tahsili'];
  B['Tahsili Digital (CBT / المحوسب) — High-Yield Past Papers Simulation'] = B['tahsili'];
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
  function normalizeKey(str){
    if(!str) return '';
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  }
  var ALIASES={
    'ibslaa':'IB Math SL (AA)',
    'ibslai':'IB Math SL (AI)',
    'ibhlaa':'IB Math HL (AA)',
    'ibhlai':'IB Math HL (AI)',
    'igcse':'igcse',
    'cambridge igcse 0580':'igcse',
    'cambridge igcse mathematics 0580 (extended)':'igcse',
    'cambridge igcse mathematics 0580 extended':'igcse',
    'cambridge igcse':'igcse',
    '0580':'igcse',
    'sat':'sat',
    'digital sat':'sat',
    'digital sat math':'sat',
    'digital sat mathematics':'sat',
    'digital sat® — math':'sat',
    'digital sat math':'sat',
    'act':'act',
    'act mathematics':'act',
    'act math':'act',
    'act2':'act2',
    'act international subject test — mathematics 1':'act2',
    'act international subject test mathematics 1':'act2',
    'act2l2':'act2l2',
    'act international subject test — mathematics 2':'act2l2',
    'act international subject test mathematics 2':'act2l2',
    'apab':'apab',
    'ap calculus ab':'apab',
    'apbc':'apbc',
    'ap calculus bc':'apbc',
    'appc':'appc',
    'ap precalculus':'appc',
    'apstats':'apstats',
    'ap statistics':'apstats',
    'est':'est',
    'est i — mathematics':'est',
    'est i mathematics':'est',
    'est i':'est',
    'est2':'est2',
    'est ii — mathematics level 1':'est2',
    'est ii mathematics level 1':'est2',
    'est2l2':'est2l2',
    'est ii — mathematics level 2':'est2l2',
    'est ii mathematics level 2':'est2l2',
    'qudrat':'qudrat',
    'gat qudrat — quantitative reasoning':'qudrat',
    'gat qudrat quantitative':'qudrat',
    'gat qudrat':'qudrat',
    'qudrat digital (cbt / المحوسب) — 4-module adaptive simulation':'Qudrat Digital (CBT / المحوسب) — 4-Module Adaptive Simulation',
    'qudrat paper-based (الورقي) — full quantitative booklet':'Qudrat Paper-Based (الورقي) — Full Quantitative Booklet',
    'qudrat — quantitative comparisons & shaded geometry drill':'Qudrat — Quantitative Comparisons & Shaded Geometry Drill',
    'tahsili':'tahsili',
    'saat tahsili — mathematics':'tahsili',
    'saat tahsili mathematics':'tahsili',
    'saat tahsili':'tahsili',
    'tahsili digital (cbt / المحوسب) — high-yield past papers simulation':'Tahsili Digital (CBT / المحوسب) — High-Yield Past Papers Simulation',
    'tahsili — year 3 secondary intensive (50% exam weight)':'Tahsili — Year 3 Secondary Intensive (50% Exam Weight)',
    'tahsili — year 1 & year 2 secondary foundations (50% exam weight)':'Tahsili — Year 1 & Year 2 Secondary Foundations (50% Exam Weight)',
    'aslevel':'aslevel',
    'cambridge as level mathematics 9709':'aslevel',
    'cambridge as level':'aslevel',
    'a2level':'a2level',
    'cambridge a level mathematics 9709':'a2level',
    'cambridge a level':'a2level',
    'ibsl':'IB Math SL (AA)',
    'ibhl':'IB Math HL (AA)',
    'ib mathematics: analysis and approaches sl':'IB Math SL (AA)',
    'ib mathematics: applications and interpretation sl':'IB Math SL (AI)',
    'ib mathematics: analysis and approaches hl':'IB Math HL (AA)',
    'ib mathematics: applications and interpretation hl':'IB Math HL (AI)',
    'cambridge as level 9709 — paper 1 pure mathematics 1':'Cambridge AS Level — Paper 1 (Pure 1)',
    'cambridge as level 9709 — paper 2 pure mathematics 2':'Cambridge AS Level — Paper 2 (Pure 2)',
    'cambridge as level 9709 — paper 4 mechanics':'Cambridge AS Level — Paper 4 (Mechanics)',
    'cambridge as level 9709 — paper 5 probability & statistics 1':'Cambridge AS Level — Paper 5 (Statistics 1)',
    'cambridge a level 9709 — paper 3 pure mathematics 3':'Cambridge A Level — Paper 3 (Pure 3)',
    'cambridge a level 9709 — paper 4 mechanics':'Cambridge A Level — Paper 4 (Mechanics)',
    'cambridge a level 9709 — paper 6 probability & statistics 2':'Cambridge A Level — Paper 6 (Statistics 2)',
    'pearson edexcel international gcse mathematics a (4ma1) — paper 1h':'Edexcel IGCSE (4MA1) — Paper 1H',
    'pearson edexcel international gcse mathematics a (4ma1) — paper 2h':'Edexcel IGCSE (4MA1) — Paper 2H',
    'pearson edexcel international a level — pure mathematics 1 (wma11)':'Edexcel IAL — Pure Mathematics 1 (WMA11)',
    'pearson edexcel international a level — pure mathematics 2 (wma12)':'Edexcel IAL — Pure Mathematics 2 (WMA12)',
    'pearson edexcel international a level — pure mathematics 3 (wma13)':'Edexcel IAL — Pure Mathematics 3 (WMA13)',
    'pearson edexcel international a level — pure mathematics 4 (wma14)':'Edexcel IAL — Pure Mathematics 4 (WMA14)',
    'pearson edexcel international a level — mechanics 1 (wme01)':'Edexcel IAL — Mechanics 1 (WME01)',
    'pearson edexcel international a level — statistics 1 (wst01)':'Edexcel IAL — Statistics 1 (WST01)',
    'gat general aptitude test — quantitative section (english)':'GAT Quantitative (English Medium)',
    'saat achievement test — mathematics (english)':'SAAT Mathematics (English Medium)',
    'mawhiba & kangaroo math arabia — senior level':'Mawhiba & Kangaroo Math Arabia (Senior)',
    'amc 10/12 mathematics competition':'AMC 10/12 Mathematics Competition',
    'cambridge igcse 0580 — paper 2 (extended non-calculator)':'Cambridge IGCSE 0580 — Paper 2 (Extended Non-Calculator)',
    'cambridge igcse 0580 — paper 4 (extended calculator)':'Cambridge IGCSE 0580 — Paper 4 (Extended Calculator)',
    'ib math sl (aa) — paper 1 (non-calculator)':'IB Math SL (AA) — Paper 1 (Non-Calculator)',
    'ib math sl (aa) — paper 2 (gdc required)':'IB Math SL (AA) — Paper 2 (GDC Required)',
    'ib math hl (aa) — paper 1 (non-calculator)':'IB Math HL (AA) — Paper 1 (Non-Calculator)',
    'ib math hl (aa) — paper 2 (gdc required)':'IB Math HL (AA) — Paper 2 (GDC Required)'
  };

  var N_ALIASES={};
  for(var ak in ALIASES){
    N_ALIASES[normalizeKey(ak)]=ALIASES[ak];
    N_ALIASES[ak.toLowerCase().trim()]=ALIASES[ak];
  }
  var N_B={};
  for(var bk in B){
    N_B[normalizeKey(bk)]=bk;
    N_B[bk.toLowerCase().trim()]=bk;
  }

  function resolveTarget(idOrTitle){
    if(!idOrTitle) return null;
    if(B[idOrTitle]) return idOrTitle;
    if(ALIASES[idOrTitle] && B[ALIASES[idOrTitle]]) return ALIASES[idOrTitle];
    var norm=normalizeKey(idOrTitle);
    if(N_ALIASES[norm] && B[N_ALIASES[norm]]) return N_ALIASES[norm];
    if(N_B[norm]) return N_B[norm];
    for(var k in B){
      if(normalizeKey(k)===norm) return k;
    }
    // Substring matches
    if(/0580.*(?:paper\s*2|non\s*calc)|igcse.*(?:paper\s*2|non\s*calc)/.test(norm)) return 'Cambridge IGCSE 0580 — Paper 2 (Extended Non-Calculator)';
    if(/0580.*(?:paper\s*4|calc)|igcse.*(?:paper\s*4|calc)/.test(norm)) return 'Cambridge IGCSE 0580 — Paper 4 (Extended Calculator)';
    if(/ib.*(?:analysis|aa).*sl.*paper\s*1/.test(norm)) return 'IB Math SL (AA) — Paper 1 (Non-Calculator)';
    if(/ib.*(?:analysis|aa).*sl.*paper\s*2/.test(norm)) return 'IB Math SL (AA) — Paper 2 (GDC Required)';
    if(/ib.*(?:analysis|aa).*hl.*paper\s*1/.test(norm)) return 'IB Math HL (AA) — Paper 1 (Non-Calculator)';
    if(/ib.*(?:analysis|aa).*hl.*paper\s*2/.test(norm)) return 'IB Math HL (AA) — Paper 2 (GDC Required)';
    if(/0580|igcse/.test(norm)) return 'igcse';
    if(/sat/.test(norm)) return 'sat';
    if(/act\s*2\s*l(?:evel)?\s*2/.test(norm)) return 'act2l2';
    if(/act\s*2|subject\s*test\s*1/.test(norm)) return 'act2';
    if(/\bact\b/.test(norm)) return 'act';
    if(/calculus\s*ab\b|apab/.test(norm)) return 'apab';
    if(/calculus\s*bc\b|apbc/.test(norm)) return 'apbc';
    if(/precalc|appc/.test(norm)) return 'appc';
    if(/stats|apstats/.test(norm)) return 'apstats';
    if(/est\s*2\s*l(?:evel)?\s*2/.test(norm)) return 'est2l2';
    if(/est\s*2|est\s*ii/.test(norm)) return 'est2';
    if(/est/.test(norm)) return 'est';
    if(/qudrat|gat/.test(norm)) return 'qudrat';
    if(/tahsili|saat/.test(norm)) return 'tahsili';
    if(/ib.*(?:analysis|aa).*sl/i.test(norm)) return 'IB Math SL (AA)';
    if(/ib.*(?:applications|ai).*sl/i.test(norm)) return 'IB Math SL (AI)';
    if(/ib.*(?:analysis|aa).*hl/i.test(norm)) return 'IB Math HL (AA)';
    if(/ib.*(?:applications|ai).*hl/i.test(norm)) return 'IB Math HL (AI)';
    if(/9709.*paper\s*1|pure\s*1/.test(norm)) return 'Cambridge AS Level — Paper 1 (Pure 1)';
    if(/9709.*paper\s*2|pure\s*2/.test(norm)) return 'Cambridge AS Level — Paper 2 (Pure 2)';
    if(/9709.*paper\s*4|mechanics\s*1|mechanics/.test(norm)) return 'Cambridge AS Level — Paper 4 (Mechanics)';
    if(/9709.*paper\s*5|statistics\s*1/.test(norm)) return 'Cambridge AS Level — Paper 5 (Statistics 1)';
    if(/9709.*paper\s*3|pure\s*3/.test(norm)) return 'Cambridge A Level — Paper 3 (Pure 3)';
    if(/9709.*paper\s*6|statistics\s*2/.test(norm)) return 'Cambridge A Level — Paper 6 (Statistics 2)';
    if(/4ma1.*(?:1h|paper\s*1)/.test(norm)) return 'Edexcel IGCSE (4MA1) — Paper 1H';
    if(/4ma1.*(?:2h|paper\s*2)/.test(norm)) return 'Edexcel IGCSE (4MA1) — Paper 2H';
    if(/wma11|ial.*pure\s*1/.test(norm)) return 'Edexcel IAL — Pure Mathematics 1 (WMA11)';
    if(/wma12|ial.*pure\s*2/.test(norm)) return 'Edexcel IAL — Pure Mathematics 2 (WMA12)';
    if(/wma13|ial.*pure\s*3/.test(norm)) return 'Edexcel IAL — Pure Mathematics 3 (WMA13)';
    if(/wma14|ial.*pure\s*4/.test(norm)) return 'Edexcel IAL — Pure Mathematics 4 (WMA14)';
    if(/wme01|ial.*mechanics/.test(norm)) return 'Edexcel IAL — Mechanics 1 (WME01)';
    if(/wst01|ial.*statistics/.test(norm)) return 'Edexcel IAL — Statistics 1 (WST01)';
    if(/0606.*(?:paper\s*1|p1)/.test(norm)) return 'Cambridge IGCSE 0606 — Paper 1';
    if(/0606.*(?:paper\s*2|p2)/.test(norm)) return 'Cambridge IGCSE 0606 — Paper 2';
    if(/4pm1.*(?:paper\s*1|p1)/.test(norm)) return 'Edexcel Further Pure 4PM1 — Paper 1';
    if(/4pm1.*(?:paper\s*2|p2)/.test(norm)) return 'Edexcel Further Pure 4PM1 — Paper 2';
    if(/0606|4pm1|addmath|additional\s*math/.test(norm)) return 'addmath';
    if(/mathai|ai\s*math|math\s*for\s*ai/.test(norm)) return 'mathai';
    // Check window.examSpecs if available
    if(window.examSpecs){
      var sp=window.examSpecs[idOrTitle]||window.examSpecs[norm];
      if(sp&&sp.bankId&&B[sp.bankId]) return sp.bankId;
    }
    return idOrTitle;
  }

  window.ClipSATBlueprints={
    get:function(viewIdOrTitle){
      var target=resolveTarget(viewIdOrTitle);
      return B[target]||provisional(target)||provisional(viewIdOrTitle);
    },
    resolveKey:resolveTarget,
    _data:B
  };
})();
