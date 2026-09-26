(function(){window.i18n = (function(){
    var _strings = {
      en: {
        'nav.home':'Home','nav.mistakes':'Mistakes','nav.whats-new':"What's New?",
        'quiz.generate':'Generate Quiz','quiz.level':'Level','quiz.count':'Questions',
        'quiz.chapterQuiz':'Chapter Quiz',
        'quiz.mixed':'Mixed','quiz.easy':'Easy','quiz.medium':'Medium','quiz.hard':'Hard',
        'ix.head':'Interactive Practice','ix.badge.qc':'Quick Check','ix.badge.sr':'Worked Example','ix.badge.fn':'Explorer',
        'ix.tryAgain':'Try again','ix.correct':'✓ Correct! ','ix.incorrect':'✗ Not quite. ',
        'ix.sr.showFirst':'Show first step ▸','ix.sr.showNext':'Show next step ▸ ({n}/{m})','ix.sr.restart':'↺ Restart',
        'mistake.empty':'🎉 No mistakes yet! Keep it up.',
        'mistake.quiz-me':'🔁 Quiz Me On Mistakes','mistake.clear':'🗑 Clear All',
        'mistake.explain':'🤖 Explain this',
        'daily.goal-met':'✓ Goal met!','daily.streak':'{n} day streak',
        'weak.heading':'⚠ Focus areas','weak.quiz-all':'🔁 Quiz me on mistakes',
        'teacher.on':'📐 Teacher Mode ON','teacher.pdf':'📄 PDF','teacher.word':'📝 Word','teacher.off':'✕ Off',
        'solution.show':'Show solution','solution.hide':'Hide solution',
        /* Site chrome — Pillar 4 Scale-phase pilot (see below). Deliberately
           NOT extended to chapter prose/proofs/question banks: that's
           exam-critical mathematical content needing a subject-matter
           reviewer, not a bulk pass — matches the roadmap's "don't dilute
           the proof-and-explorer bar" rule. */
        'search.placeholder':'Search topics…',
        'nav.progress':'Progress','nav.teacher':'Teacher','nav.support':'Support',
        'nav.calculator':'Calculator','nav.more':'More',
        'nav.whats-new-label':"What's New",
        'hero.h1':'Math you can <span class="q1">see</span> —<br>built for the <span class="q2">exam</span>.',
        'hero.lede':'ClipSAT turns every topic into something you can watch move: readable notes, live interactive figures, worked solutions, and printable packets. All 26 exam tracks are live now — pick yours below.',
        'hero.cta-calc':'Start with Calculus <span class="arr">→</span>',
        'hero.cta-algebra':'Explore Algebra',
        'hero.fig-title':'Calculus preview · drag the point',
        'hero.chip-slope':'slope','hero.chip-area':'area',
        'hero.toggle-area':'Show area','hero.toggle-tan':'Show tangent',
        'hero.fig-hint':'Indigo tangent = the derivative · amber region = the integral',

        /* Home page — full-page translation (every band below the hero:
           Egypt promo, about-the-educator, results, testimonials, course
           catalog, both interactive explorers, "four ways in", the
           deep-content math sample, and resources). EN entries match the
           raw home.html verbatim, same convention as contact/privacy/terms/
           cookies above — _applyToDOM() always runs the swap, in either
           locale. Dynamically-generated JS strings inside the two
           explorers' "view as data" accessibility panels (derivDataDesc /
           riemannDataDesc, built from live slider values) are NOT covered
           here — same scope boundary as everywhere else on the site where a
           number-driven sentence is assembled in JS rather than static HTML. */
        'home.egypt.link-aria':'Visit ClipSAT for Egypt (opens in a new tab)',
        'home.egypt.flag-aria':'Egyptian flag',
        'home.egypt.for-egypt':'for Egypt',
        'home.egypt.eyebrow':'Sister site',
        'home.egypt.h2':"Studying Egypt's national curriculum?",
        'home.egypt.p':'ClipSAT for Egypt is a companion site built for students on Egypt\'s national math curriculum — the same read‑it, see‑it, practice‑it approach as ClipSAT, tailored to Egypt.',
        'home.egypt.cta':'Visit ClipSAT for Egypt',

        'home.about.eyebrow':'About the educator',
        'home.about.h2':"Taught by someone who's spent a career watching students get stuck in the exact same places.",
        'home.about.p1':'Mr. Mohamed Abdallah holds a <strong>B.Sc. in Mathematics &amp; Education</strong> from the Faculty of Education, Alexandria University, Egypt, and a <strong>Diploma in Math Education</strong> from the University of Maryland, Baltimore County (UMBC), USA, where he completed the Egyptian Mathematics and Science Teacher-Scholar Program. He is a Google Certified Educator and Microsoft Certified Innovator, holds a Saudi Teaching License in Mathematics with a 96% score, and in 2023 won Egypt\'s first Global Certificate in Mathematics competition for adults.',
        'home.about.p2':'In <strong>33+ years</strong> teaching mathematics — including as Head of Mathematics at Asia International School in Al Khobar and currently at Edugates International School in Jeddah — across Cambridge IGCSE/GCSE and AS/A-Level, the IB Diploma (SL/HL), AP Calculus AB/BC and AP Statistics, the Digital SAT and ACT, the EST II subject tests, and the Saudi national exams GAT Qudrat and SAAT Tahsili, he has led curriculum design, teacher mentoring, and data-driven intervention programs that raised student achievement by 15%.',
        'home.about.p3':'That breadth across curricula is the real asset: the algebra mistake that trips up a Digital SAT student is the same one that trips up an AP Calculus student a year later, and teaching every level at once makes those patterns hard to miss.',
        'home.about.p4':'ClipSAT grew directly out of that classroom experience. Every explorer on this site exists because a verbal explanation of "the tangent line\'s slope approaches the derivative" wasn\'t landing — but dragging a point and watching it happen always did. The same philosophy shapes every track: read the idea in plain language, watch it move, practice it until it\'s automatic, then keep a clean copy for review before the exam.',
        'home.about.stat-years':'Years teaching','home.about.stat-tracks':'Exam tracks covered',
        'home.about.stat-questions':'Practice questions','home.about.stat-explorers':'Interactive explorers',
        'home.about.credentials':'B.Sc. Mathematics &amp; Education, Alexandria University · Diploma in Math Education, UMBC (USA) · Google Certified Educator · Microsoft Certified Innovator. Curricula ClipSAT covers: IGCSE · Cambridge A-Level · IB (SL/HL) · AP · Digital SAT &amp; ACT · EST II · Qudrat &amp; Tahsili · university-track math (Linear Algebra, ODEs, Multivariable Calculus). <a href="https://wa.me/966597688647" target="_blank" rel="noopener">1:1 tutoring on WhatsApp →</a>',

        'home.results.eyebrow':'Real results',
        'home.results.h2':'Students who worked the material, not just watched it.',
        'home.results.p':"A sample of real outcomes from Mr. Mohamed's classroom, first names only.",
        'home.results.card1-label':'on the AP Exam',
        'home.results.card1-names':'Omar, Salma, Noor, Yasmeen, Mohamed, and more — perfect 5s on AP Calculus AB/BC.',
        'home.results.card2-label':'Cambridge Mathematics',
        'home.results.card2-names':'Nadine, Yousf, Nour, Haya, and more — A and A* grades across IGCSE, AS-Level, and A2-Level.',
        'home.results.card3-label':'on ACT Math',
        'home.results.card3-names':'Mohamed and Shereen — a perfect score on ACT Math.',

        'home.testi.eyebrow':'Testimonials','home.testi.h2':'What families say.',
        'home.testi.p1':'Mr. Mohamed Abdallah is an exceptional mathematics teacher who delivers outstanding results. Under his guidance, our students have achieved remarkable success: Omar, Salma, Noor, Yasmeen, Mohamed, and many more students scored a perfect 5 in AP Calculus AB/BC. Nadine, Yousf, Nour, Haya, and a long list of others earned A and A* grades in IGCSE Mathematics (AS and A2 levels). Mohamed and Shereen achieved an impressive 36 in ACT Math.',
        'home.testi.p2':"Mr. Mohamed's teaching style is clear, engaging, and highly effective. He breaks down complex topics like calculus, trigonometry, quadratics, and integrals into understandable concepts and provides excellent revision sheets, practice problems, and targeted exam strategies. His dedication and expertise helped our children not only master the material but also build confidence for top university placements.",
        'home.testi.p3':'We highly recommend Mr. Mohamed Abdallah for any student aiming for excellence in IGCSE, AP, or ACT mathematics. He is truly one of the best math tutors in Jeddah!',
        'home.testi.attr':'— Satisfied Parents &amp; Students, Jeddah International Schools',

        'home.catalog.eyebrow':'Course catalog','home.catalog.h2':'Every track ClipSAT covers.',
        'home.catalog.p':'All 26 tracks below share the same structure — notes, visual explorers, practice, and downloads — and are live today.',
        'home.cat.calculus.ct':'MATH · DIFFERENTIAL &amp; INTEGRAL','home.cat.calculus.h3':'Calculus',
        'home.cat.calculus.p':'Limits, derivatives, integrals, and the Fundamental Theorem — with interactive tangent and area explorers.',
        'home.cat.algebra.ct':'MATH · FOUNDATIONS','home.cat.algebra.h3':'Algebra',
        'home.cat.algebra.p':'Linear equations, quadratics, exponents and polynomials — with live line and parabola explorers.',
        'home.cat.alg2.ct':'MATH · ALGEBRA II','home.cat.alg2.h3':'Algebra 2',
        'home.cat.alg2.p':'Functions, quadratics &amp; complex numbers, polynomials, rationals, exp/log, radicals, series and conics — eleven chapters, three explorers, 50 problems.',
        'home.cat.geo.ct':'MATH · EUCLIDEAN GEOMETRY','home.cat.geo.h3':'Geometry',
        'home.cat.geo.p':'Proof and reasoning, parallel lines, triangles and congruence, similarity, right-triangle trigonometry, circles, and area &amp; volume. Eleven chapters, three explorers, 50 problems.',
        'home.cat.precalc.ct':'HIGH SCHOOL · PRECALCULUS','home.cat.precalc.h3':'Pre-Calculus',
        'home.cat.precalc.p':'Trigonometry, conic sections, vectors, polar & parametric coordinates, and limits — the essential bridge from Algebra 2 to Calculus.',
        'home.cat.linalg.ct':'UNIVERSITY · LINEAR ALGEBRA','home.cat.linalg.h3':'Linear Algebra',
        'home.cat.linalg.p':"Vectors, systems of equations, matrices and determinants — every theorem proved in full. Four chapters, the post-calculus foundation for engineering and CS.",
        'home.cat.mvc.ct':'UNIVERSITY · MULTIVARIABLE CALCULUS','home.cat.mvc.h3':'Multivariable Calculus',
        'home.cat.mvc.p':"Partial derivatives, gradients, optimization and double integrals — every theorem proved in full. Four chapters, built on Linear Algebra's vectors and determinants.",
        'home.cat.odes.ct':'UNIVERSITY · DIFFERENTIAL EQUATIONS','home.cat.odes.h3':'Differential Equations',
        'home.cat.odes.p':'First-order and separable equations, proved from the chain rule rather than asserted — the first chapter of a growing track.',
        'home.cat.apab.ct':'COLLEGE BOARD · AP','home.cat.apab.h3':'AP Calculus AB',
        'home.cat.apab.p':'Units 1–8 at AP depth — limits through integrals, with exam-style multiple choice and free response.',
        'home.cat.apbc.ct':'COLLEGE BOARD · AP','home.cat.apbc.h3':'AP Calculus BC',
        'home.cat.apbc.p':'All of AB plus series, parametric and polar curves, and advanced integration techniques.',
        'home.cat.appc.ct':'AP · PRECALCULUS','home.cat.appc.h3':'AP Precalculus',
        'home.cat.appc.p':'College Board AP Precalculus: polynomial, rational, exponential, logarithmic, trigonometric, and sinusoidal functions — with full exam prep.',
        'home.cat.apstats.ct':'AP · STATISTICS','home.cat.apstats.h3':'AP Statistics',
        'home.cat.apstats.p':'Exploring data, sampling distributions, probability, inference — confidence intervals, hypothesis tests, regression — full College Board coverage.',
        'home.cat.igcse.ct':'CAMBRIDGE · IGCSE 0580','home.cat.igcse.h3':'IGCSE 0580',
        'home.cat.igcse.p':'Cambridge IGCSE Mathematics — Core and Extended. Ten chapters, three explorers, and a 50-question paper-style bank.',
        'home.cat.aslevel.ct':'CAMBRIDGE · AS LEVEL','home.cat.aslevel.h3':'AS Level',
        'home.cat.aslevel.p':'Pure Mathematics 1 with the foundations of trigonometry, calculus and statistics. Eleven chapters, three explorers, 50 problems.',
        'home.cat.a2level.ct':'CAMBRIDGE · A2 LEVEL','home.cat.a2level.h3':'A2 Level',
        'home.cat.a2level.p':'Pure 2 &amp; 3 — functions, logarithms, advanced trig, calculus, series and vectors, completing the full A Level. Eleven chapters, three explorers, 50 problems.',
        'home.cat.ibsl.ct':'IB · MATHEMATICS SL','home.cat.ibsl.h3':'IB Math SL (AA/AI)',
        'home.cat.ibsl.p':'IB Mathematics Standard Level covering algebra, functions, trigonometry, statistics and calculus for both Analysis &amp; Approaches and Applications &amp; Interpretation.',
        'home.cat.ibhl.ct':'IB · MATHEMATICS HL','home.cat.ibhl.h3':'IB Math HL (AA/AI)',
        'home.cat.ibhl.p':'IB Mathematics Higher Level — all SL topics plus complex numbers, proof, 3D vectors, advanced calculus, differential equations and (AI HL) matrices and graph theory.',
        'home.cat.sat.ct':'COLLEGE BOARD · DIGITAL SAT','home.cat.sat.h3':'Digital SAT Math',
        'home.cat.sat.p':'The four math domains — algebra, advanced math, problem-solving &amp; data analysis, and geometry &amp; trigonometry — with Desmos tactics for the adaptive test. Eight chapters, three explorers, 50 problems.',
        'home.cat.act.ct':'ACT · MATHEMATICS','home.cat.act.h3':'ACT Math',
        'home.cat.act.p':'All 45 questions of the enhanced ACT — pre-algebra through trigonometry, with pacing and calculator strategy. Eight chapters, three explorers, 50 problems.',
        'home.cat.act2.ct':'ACT · SUBJECT TEST','home.cat.act2.h3':'ACT 2 Math Level 1',
        'home.cat.act2.p':'Deep-dive ACT practice — advanced algebra, functions, coordinate geometry and trigonometry with timed section strategy and full-length drills.',
        'home.cat.act2l2.ct':'ACT · SUBJECT TEST','home.cat.act2l2.h3':'ACT 2 Math Level 2',
        'home.cat.act2l2.p':'The advanced AIST Math 2 test — complex numbers, matrices and vectors, advanced functions, limits, and polar/trigonometric precalculus.',
        'home.cat.est.ct':'EST I · EGYPT','home.cat.est.h3':'EST Math',
        'home.cat.est.p':'The Electronic Scholastic Test — algebra, functions, geometry and data analysis, for American Diploma students seeking Egyptian university admission.',
        'home.cat.est2.ct':'EST II · LEVEL 1','home.cat.est2.h3':'EST 2 Math Level 1',
        'home.cat.est2l2.ct':'EST II · LEVEL 2','home.cat.est2l2.h3':'EST 2 Math Level 2',
        'home.cat.est2l2.p':'The advanced EST II component — complex numbers, matrices and vectors, sequences and series, and an introduction to calculus.',
        'home.cat.est2.p':'Advanced EST — extended content covering trigonometry, sequences, logarithms and introductory calculus for the second-level paper.',
        'home.cat.qudrat.ct':'QIYAS · GAT (QUDRAT)','home.cat.qudrat.h3':'GAT Qudrat Math',
        'home.cat.qudrat.p':'The quantitative section of the General Aptitude Test — arithmetic, ratios and percentages, algebra, geometry, sequences, data, and the signature quantitative-comparison questions. Eight chapters, three explorers, 50 problems.',
        'home.cat.tahsili.ct':'QIYAS · SAAT (TAHSILI)','home.cat.tahsili.h3':'SAAT Tahsili Math',
        'home.cat.tahsili.p':'Achievement-test mathematics — high-school algebra, functions, sequences, trigonometry, coordinate geometry and introductory calculus, mapped to the exam. Nine chapters, three explorers, 50 problems.',

        'home.explorers.eyebrow':'See it before you solve it','home.explorers.h2':'Two instruments, not two pictures.',
        'home.explorers.p':"These aren't screenshots — drag them, type into them, break them. Pick a function, then watch the definitions from the textbook stop being definitions.",
        'home.deriv.title':'📐 Derivative &amp; Tangent Explorer',
        'home.deriv.canvas-aria':'A curve with a draggable point, its tangent line, and a secant line that converges to the tangent as h approaches zero',
        'home.deriv.caption':'Sampled points across the current view: the curve, its tangent line at a, and the secant line through a and a+h',
        'home.deriv.th-tangent':'tangent y','home.deriv.th-secant':'secant y',
        'home.deriv.lbl-point':'point','home.deriv.aria-a':'Value of a',
        'home.deriv.lbl-secant':'secant offset','home.deriv.aria-h':'Secant offset h',
        'home.deriv.hint-secant':'(drag to 0 to watch the secant become the tangent)',
        'home.deriv.readout-secant':'secant slope (h ≠ 0)','home.deriv.readout-deriv':'f′(a) — exact derivative',
        'home.riemann.title':'∫ Riemann Sum &amp; Definite Integral Explorer',
        'home.riemann.canvas-aria':'A curve over an interval, approximated by rectangles or trapezoids whose count and rule can be changed',
        'home.riemann.caption':"Every subinterval of the current partition: its bounds, the sample point the current rule uses, the height sampled there, and that shape's area",
        'home.riemann.th-sample':'sample x*','home.riemann.th-area':'area',
        'home.riemann.lbl-interval':'interval','home.riemann.hint-interval':'(drag the handles on the plot, or type below)',
        'home.riemann.aria-a':'Left endpoint a','home.riemann.aria-b':'Right endpoint b',
        'home.riemann.lbl-partitions':'partitions','home.riemann.aria-n':'Number of partitions n',
        'home.riemann.ctrl-rule':'rule','home.riemann.rule-aria':'Choose a Riemann sum rule',
        'home.riemann.rule-left':'Left','home.riemann.rule-right':'Right','home.riemann.rule-mid':'Midpoint','home.riemann.rule-trap':'Trapezoidal',
        'home.riemann.readout-approx':'approximation','home.riemann.readout-exact':'exact value ∫ f(x) dx',
        'home.exp.ctrl-function':'function','home.exp.radios-aria':'Choose a function','home.exp.reset':'↺ Reset to default',

        'home.tools.eyebrow':'How each subject works','home.tools.h2':'Four ways in.',
        'home.tools.p':'Every topic pairs the same four study tools, so students always know where to look.',
        'home.tools.n1':'01 · Read','home.tools.h3-1':'Notes &amp; theory','home.tools.p1':'Definitions and theorems set in clean typography, numbered for easy reference.',
        'home.tools.n2':'02 · See','home.tools.h3-2':'Visual explorers','home.tools.p2':'Drag a slider and watch a tangent tilt or an area converge in real time.',
        'home.tools.n3':'03 · Practice','home.tools.h3-3':'Problems &amp; solutions','home.tools.p3':'Graded problem sets with full worked solutions hidden until you want them.',
        'home.tools.n4':'04 · Keep','home.tools.h3-4':'Downloads','home.tools.p4':'Print a clean PDF packet, or request a native Word version with editable equations.',

        'home.deep.eyebrow':'A sample of the rigor','home.deep.h2':'Three ideas, done properly.',
        'home.deep.p':'Every chapter on ClipSAT follows this same shape — definition, theorem, proof, worked example — not just answers.',
        'home.deep.copy-latex':'📋 Copy LaTeX','home.deep.proof-label':'Proof','home.deep.example-label':'Worked example','home.deep.remark-label':'◆ Remark',
        'home.deep.h3-1':'1 · The Fundamental Theorem of Calculus',
        'home.deep.def1-label':'● Definition — Antiderivative',
        'home.deep.def1-body':'A function \\( F \\) is an <strong>antiderivative</strong> of \\( f \\) on an interval if \\( F\'(x)=f(x) \\) for every \\( x \\) in that interval.',
        'home.deep.thm1-label':'▲ Theorem — Fundamental Theorem of Calculus (evaluation form)',
        'home.deep.thm1-body':'If \\( f \\) is continuous on \\( [a,b] \\) and \\( F \\) is <em>any</em> antiderivative of \\( f \\), then \\[ \\int_a^b f(x)\\,dx = F(b)-F(a). \\]',
        'home.deep.pf1-body':"Let \\( G(x)=\\int_a^x f(t)\\,dt \\). The theorem's first part (not restated here) gives \\( G'(x)=f(x) \\), so \\( G \\) is also an antiderivative of \\( f \\). Two antiderivatives of the same function differ by a constant, so \\( F(x)=G(x)+C \\) for some \\( C \\). Then \\[ F(b)-F(a) = \\big(G(b)+C\\big)-\\big(G(a)+C\\big) = G(b)-G(a) = \\int_a^b f(t)\\,dt - \\int_a^a f(t)\\,dt = \\int_a^b f(t)\\,dt, \\] since \\( \\int_a^a f(t)\\,dt=0 \\).",
        'home.deep.ex1-body':'Evaluate \\( \\displaystyle\\int_1^3 (3x^2-1)\\,dx \\). An antiderivative of \\( 3x^2-1 \\) is \\( F(x)=x^3-x \\). So the integral equals \\[ F(3)-F(1) = (27-3)-(1-1) = 24-0 = 24. \\]',
        'home.deep.rmk1-body':'This is exactly what the Riemann Sum explorer above is showing you converge to as \\( n\\to\\infty \\) — and \\( F\'(x)=f(x) \\) is exactly the tangent-slope statement from the Derivative explorer, run in reverse.',
        'home.deep.h3-2':'2 · Completing the Square &amp; the Quadratic Formula',
        'home.deep.def2-label':'● Definition — Perfect-square trinomial',
        'home.deep.def2-body':'For a real number \\( p \\), the trinomial \\( x^2+2px+p^2 \\) factors as \\( (x+p)^2 \\). "Completing the square" means adding the right constant to a quadratic expression so it takes this form.',
        'home.deep.thm2-label':'▲ Theorem — The Quadratic Formula',
        'home.deep.thm2-body':'For \\( a\\neq 0 \\), the solutions of \\( ax^2+bx+c=0 \\) are \\[ x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}. \\]',
        'home.deep.pf2-body':'Divide by \\( a \\): \\( x^2+\\tfrac{b}{a}x+\\tfrac{c}{a}=0 \\), so \\( x^2+\\tfrac{b}{a}x=-\\tfrac{c}{a} \\). Add \\( \\left(\\tfrac{b}{2a}\\right)^2 \\) to both sides to complete the square on the left: \\[ x^2+\\frac{b}{a}x+\\left(\\frac{b}{2a}\\right)^2 = \\left(\\frac{b}{2a}\\right)^2-\\frac{c}{a}. \\] The left side is \\( \\left(x+\\tfrac{b}{2a}\\right)^2 \\); the right side simplifies to \\( \\tfrac{b^2-4ac}{4a^2} \\). Taking square roots, \\( x+\\tfrac{b}{2a} = \\pm\\tfrac{\\sqrt{b^2-4ac}}{2a} \\), so \\( x = \\tfrac{-b\\pm\\sqrt{b^2-4ac}}{2a} \\).',
        'home.deep.ex2-body':'Solve \\( 2x^2+8x-10=0 \\) by completing the square. Divide by 2: \\( x^2+4x-5=0 \\Rightarrow x^2+4x=5 \\). Add \\( 2^2=4 \\): \\( x^2+4x+4=9 \\Rightarrow (x+2)^2=9 \\Rightarrow x+2=\\pm3 \\Rightarrow x=1 \\) or \\( x=-5 \\).',
        'home.deep.rmk2-body':'The quantity under the root, \\( b^2-4ac \\), is the <strong>discriminant</strong>: positive gives two real roots, zero gives one repeated root, negative gives two complex roots.',
        'home.deep.h3-3':'3 · The Unit Circle &amp; Exact Trigonometric Values',
        'home.deep.def3-label':'● Definition — Sine and cosine on the unit circle',
        'home.deep.def3-body':'Let \\( \\theta \\) be an angle measured counterclockwise from the positive \\( x \\)-axis, and let \\( P=(x,y) \\) be the point where its terminal side meets the unit circle \\( x^2+y^2=1 \\). Define \\( \\cos\\theta = x \\) and \\( \\sin\\theta = y \\).',
        'home.deep.thm3-label':'▲ Theorem — Pythagorean identity',
        'home.deep.thm3-body':'For every angle \\( \\theta \\), \\[ \\sin^2\\theta + \\cos^2\\theta = 1. \\]',
        'home.deep.pf3-body':'By definition, \\( P=(\\cos\\theta,\\sin\\theta) \\) lies on the unit circle, which is exactly the set of points satisfying \\( x^2+y^2=1 \\). Substituting gives \\( \\cos^2\\theta+\\sin^2\\theta=1 \\).',
        'home.deep.ex3-body':'Find the exact values of \\( \\sin\\frac{\\pi}{3} \\) and \\( \\cos\\frac{\\pi}{3} \\) (60°). A 30–60–90 triangle with hypotenuse 1 has legs \\( \\tfrac12 \\) (opposite 30°) and \\( \\tfrac{\\sqrt3}{2} \\) (opposite 60°), so \\( \\cos\\frac{\\pi}{3}=\\tfrac12 \\) and \\( \\sin\\frac{\\pi}{3}=\\tfrac{\\sqrt3}{2} \\). Check: \\( \\left(\\tfrac12\\right)^2+\\left(\\tfrac{\\sqrt3}{2}\\right)^2=\\tfrac14+\\tfrac34=1 \\). ✓',
        'home.deep.rmk3-body':'Since adding a full turn returns \\( P \\) to the same point, \\( \\sin(\\theta+2\\pi)=\\sin\\theta \\) and \\( \\cos(\\theta+2\\pi)=\\cos\\theta \\) — both functions are periodic with period \\( 2\\pi \\).',

        'home.res.eyebrow':'Resources &amp; downloads','home.res.h2':'Take it with you.',
        'home.res.p':'Everything below is real and working today — not a roadmap.',
        'home.res.h3-1':'Printable PDF packets','home.res.p1':'Every chapter exports a clean, print-ready packet with the ClipSAT letterhead, ready for offline review.',
        'home.res.h3-2':'Native Word exports','home.res.p2':'Download a .docx version with real, editable equations — not images or plain-text LaTeX.',
        'home.res.h3-3':'Formula quick-reference','home.res.p3':'A collapsible sidebar surfaces the formulas for whichever chapter is open, so you never lose your place.',
        'home.res.h3-4':'Timed practice sets','home.res.p4':'Generate an exam-length set and run it against the built-in countdown timer, same as test day.',
        'home.visitors.eyebrow':'Community',
        'home.visitors.h2':'Growing every day.',
        'home.visitors.p':'A live, public tally of visits to ClipSAT — no accounts, no cookies set by us, just a running count.',
        'home.visitors.note':'Counts one visit per browser tab, site-wide — see the <a href="/cookies/">Cookie Policy</a> for details.',

        'foot.explore':'Explore','foot.all-courses':'All courses',
        'foot.legal':'Legal','foot.contact':'Contact','foot.privacy':'Privacy Policy','foot.terms':'Terms of Service',
        'foot.cookies':'Cookie Policy','foot.rigor':'Rigor Standard','foot.free-tier':'Free-Tier Promise',
        'foot.report':'🐛 Report an error or suggestion',
        /* Contact / Privacy / Terms / Cookies pages — none of these had any
           Arabic support at all before (no data-i18n anywhere in their
           source), so the footer's language toggle silently left them in
           English even when every other page switched. EN entries here
           intentionally match the raw HTML verbatim — _applyToDOM() always
           runs the swap, in either locale, so a missing/mismatched EN
           value would blank these out on first load in English too, not
           just fail to translate. */
        'calc.page.h1':'Graphing, 3D, Scientific, Geometry & Exam-Mode Calculator',
        'calc.page.lede':'This is the real Desmos calculator, not a lookalike — the same engine the digital SAT, many AP exams, and most U.S. state tests actually hand students. Switch modes below: full Graphing, 3D, and Geometry calculators for coursework, a Scientific calculator for quick computation, or Exam Mode, a restricted skin matching what you get on test day (no images, no notes, no extra menus).',
        'calc.mode.graphing':'Graphing','calc.mode.3d':'3D','calc.mode.scientific':'Scientific','calc.mode.geometry':'Geometry','calc.mode.exam':'Exam Mode',
        'calc.openExternal':'Open in a tab','calc.loadingExam':'Loading Exam Mode…',
        'calc.presets.toggle':'Presets','calc.presets.heading':'Curriculum Presets',
        'calc.presets.info':'Select any preset to auto-switch mode and copy its equations ready to paste.',
        'calc.presets.apply':'Apply Preset','calc.presets.copy':'Copy equations',
        'calc.presets.copiedToast':'Copied {n} expressions! Paste (Ctrl+V) into Desmos.',
        'calc.presets.close':'Close presets',
        'calc.presets.cat.all':'All','calc.presets.cat.calculus':'Calculus',
        'calc.presets.cat.solid_3d':'3D Solid','calc.presets.cat.statics_dynamics':'Applied',
        'calc.presets.cat.scientific':'Scientific',
        'contact.h1':'Contact',
        'contact.lede':'For questions about ClipSAT, tutoring, or anything else',
        'contact.p1':'Stuck on a specific problem right now? The <strong>"Ask Mr. Mohamed"</strong> chat button on every page is the fastest way to get unstuck — it\'s a live AI tutor trained to walk through your exact question.',
        'contact.p2':'For everything else — tutoring, feedback, corrections, or just to say hello — reach Mr. Mohamed Abdallah directly:',
        'contact.p3':'Found a bug, a math error, or have a suggestion? Email <a href="mailto:admin@clipsat.org">admin@clipsat.org</a> — every page also has a "Report an error or suggestion" link in the footer that opens this same address.',
        'contact.p4':'WhatsApp and Telegram are the fastest way to reach Mr. Mohamed Abdallah directly, including for 1:1 tutoring inquiries. The social channels above are best for general updates and new content — replies there may take longer.',
        'privacy.h2':'Privacy Policy',
        'privacy.updated':'Last updated July 14, 2026',
        'privacy.intro':'ClipSAT is a static study site with no user accounts and no server-side database of your personal information. This page explains what little data does exist and how it\'s handled.',
        'privacy.h3-device':'What\'s stored on your device',
        'privacy.li-device1':'Progress, streaks, mistake log, and dark-mode preference are saved in your browser\'s local storage. They never leave your device and are not visible to us.',
        'privacy.li-device2':'If you use "Ask Mr. Mohamed," your questions are sent directly to a third-party AI provider to generate a reply; they are not stored on any ClipSAT server.',
        'privacy.h3-counter':'Visitor counter',
        'privacy.counter':'The home page displays a live, site-wide visit count, stored in ClipSAT\'s own Supabase project — the same optional backend used for cloud sync, described above. Each browser tab counts itself at most once per visit, by calling a small server-side function that only ever increments one shared number; no page content, device identifiers, or account information is attached to that call. As with any request made over the internet, Supabase\'s own infrastructure sees the request (including your device\'s IP address) the way any web host does, but ClipSAT\'s own code never stores or has access to that information — only the running total the function returns.',
        'privacy.h3-ads':'Advertising &amp; cookies',
        'privacy.ads':'ClipSAT may show ads served by Google and other third-party vendors. These vendors, including Google, use cookies to serve ads based on a user\'s prior visits to this or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google Ads Settings</a>. You can also control cookies through your browser settings; disabling cookies may affect some site features.',
        'privacy.h3-forms':'Google Forms integration',
        'privacy.forms-intro':'Teachers can optionally connect a Google account to turn a ClipSAT-generated quiz or worksheet into a Google Form, with a shareable link they can post anywhere — Google Classroom, Canvas, Moodle, or any other LMS. This is entirely opt-in — nothing is sent to Google unless a teacher clicks "Connect Google Account" and approves the specific permissions requested. Key points:',
        'privacy.forms-li1':'ClipSAT requests only the permissions needed to create a Form, read its own responses, and save the question images it renders to a teacher\'s Google Drive (a permission scoped only to files ClipSAT itself creates — it cannot see or touch anything else already in that Drive). ClipSAT never reads or changes anything else in a connected Google account, and never requests access to a teacher\'s Google Classroom courses or roster.',
        'privacy.forms-li2':'Questions and answer choices containing complex math are rendered into an image (so they display correctly in Forms, which cannot show math notation) and uploaded to that teacher\'s own Google Drive, set to "anyone with the link can view" so the Form can display it. These images are not stored anywhere by ClipSAT — only in the teacher\'s own Drive.',
        'privacy.forms-li3':'This connection happens entirely in your browser. ClipSAT has no backend server, so no quiz content, response data, or access token passes through or is stored on any ClipSAT server — each Google API call is made directly from the teacher\'s browser to Google, using a token that Google itself issues and that ClipSAT never persists beyond the current browser tab.',
        'privacy.forms-li4':'Any results shown inside ClipSAT (a per-student score summary) are fetched live from Google each time the page is viewed, not stored anywhere by ClipSAT.',
        'privacy.forms-li5':'Google\'s own Privacy Policy governs how Google handles data once ClipSAT\'s requests reach it — see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.',
        'privacy.forms-li6':'A teacher can revoke ClipSAT\'s access at any time from their <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener">Google Account permissions</a> page.',
        'privacy.h3-thirdparty':'Third-party links',
        'privacy.thirdparty':'Links to WhatsApp, Telegram, YouTube, Instagram, TikTok, Facebook, and PayPal take you to those companies\' own sites, each governed by its own privacy policy.',
        'privacy.h3-contact':'Contact',
        'privacy.contact-p':'Questions about this policy can be sent via <a href="https://wa.me/966597688647" target="_blank" rel="noopener">WhatsApp</a> or <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">Telegram</a>.',
        'terms.h2':'Terms of Service',
        'terms.updated':'Last updated July 8, 2026',
        'terms.intro':'By using ClipSAT you agree to the following.',
        'terms.h3-content':'Use of content',
        'terms.content':'Notes, explorers, and practice questions are provided for personal study. Downloaded packets may be used for your own review; please don\'t redistribute or resell them.',
        'terms.h3-guarantee':'No guarantee of results',
        'terms.guarantee':'ClipSAT is a study aid, not a guarantee of any particular exam score. Always check official curriculum documents (e.g. Cambridge, IB, College Board, Qiyas) for the authoritative syllabus.',
        'terms.h3-ai':'AI tutor',
        'terms.ai':'"Ask Mr. Mohamed" is an AI assistant, not Mr. Mohamed Abdallah himself. Double-check important steps and final answers yourself.',
        'terms.h3-contact':'Contact',
        'terms.contact-p':'Questions can be sent via <a href="https://wa.me/966597688647" target="_blank" rel="noopener">WhatsApp</a> or <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">Telegram</a>.',
        'cookies.h2':'Cookie Policy',
        'cookies.updated':'Last updated July 13, 2026',
        'cookies.intro':'ClipSAT does not set any cookies itself, and runs no advertising or analytics scripts. The one exception is a small visit counter on the home page, described below. This page explains exactly what\'s stored, using the same plain terms as the <a href="/privacy/">Privacy Policy</a>.',
        'cookies.h3-stores':'What ClipSAT itself stores',
        'cookies.stores':'Your progress, streaks, mistake log, flashcard review schedule, and dark-mode preference are saved using your browser\'s <strong>local storage</strong> — a different, more limited mechanism than cookies. This data stays on your device, is never transmitted to any ClipSAT server, and isn\'t shared with anyone. You can clear it at any time from your browser\'s settings.',
        'cookies.h3-counter':'Visitor counter',
        'cookies.counter':'The home page shows a live, site-wide visit count, read from ClipSAT\'s own Supabase project rather than a third-party badge. Each browser tab counts one visit — via a small server-side function that only ever increments a single shared number — and remembers that it already did so for the rest of that tab\'s session using <strong>session storage</strong> (cleared automatically when the tab closes; not a cookie), so navigating between pages in the same tab isn\'t counted twice. No page content, device identifiers, or account information is attached to the call itself. As with any request over the internet, the underlying network request is visible to ClipSAT\'s hosting infrastructure the way any request is, but ClipSAT\'s own code never stores or has access to that information — only the running total.',
        'cookies.h3-embeds':'Third-party embeds',
        'cookies.embeds':'Links to WhatsApp, Telegram, YouTube, Instagram, TikTok, Facebook, and PayPal take you to those companies\' own sites, each of which may set its own cookies under its own policy once you\'re there. ClipSAT doesn\'t control or receive data from those cookies.',
        'cookies.h3-changes':'If this changes',
        'cookies.changes':'If ClipSAT adds advertising or analytics in the future, this page will be updated first to describe exactly what\'s added and why, along with a way to control it, before anything goes live.',
        'cookies.h3-contact':'Contact',
        'cookies.contact-p':'Questions about this policy can be sent via <a href="https://wa.me/966597688647" target="_blank" rel="noopener">WhatsApp</a> or <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">Telegram</a>.',
        /* Qudrat ch.1 "Arithmetic & Number Sense" — Pillar 4 Scale-phase pilot,
           first chapter of actual chapter CONTENT (not just site chrome) to be
           translated. Deliberately scoped to one chapter: chapter prose/proofs
           are exam-critical and need a subject-matter reviewer before this
           pattern is applied to the rest of Qudrat/Tahsili — see roadmap. */
        'qud.arith.title':'Arithmetic & Number Sense',
        'qud.arith.intro':'The foundation: order of operations, fractions, factors and multiples, and quick estimation.',
        'qud.arith.ref-label':'▲ Reference — Number facts',
        'qud.arith.ref-body':"Follow order of operations (brackets, powers, ×÷, +−). To compare fractions, cross-multiply or use a common denominator. A number's prime factorisation reveals its factors, GCD and LCM.",
        'qud.arith.card-order-t':'Order','qud.arith.card-order-b':'brackets → powers → ×÷ → +−',
        'qud.arith.card-compare-t':'Compare','qud.arith.card-percent-t':'Percent','qud.arith.card-average-t':'Average',
        'qud.arith.ex1a-label':'Worked example 1.A',
        'qud.arith.ex1a-p1':'Which is larger, \\( \\tfrac23 \\) or \\( \\tfrac35 \\)?',
        'qud.arith.ex1a-p2':'Cross-multiply: \\( 2\\times5=10 \\) versus \\( 3\\times3=9 \\). Since \\( 10>9 \\),',
        'qud.arith.ex1b-label':'Worked example 1.B',
        'qud.arith.ex1b-p1':'Find \\( 15\\% \\) of \\( 200 \\).',
        'qud.arith.practice-label':'Practice Problem',
        'qud.arith.practice-q':'What is \\(\\dfrac{5}{6}+\\dfrac{7}{9}-\\dfrac{1}{3}\\)?',
        'qud.arith.practice-solution':'LCD\\(=18:\\quad\\dfrac{15}{18}+\\dfrac{14}{18}-\\dfrac{6}{18}=\\dfrac{23}{18}=1\\dfrac{5}{18}.\\)',

        'ix.badge.mt':'Matching','ix.mt.allMatched':'🎉 All pairs matched!',
        'ix.badge.tf':'True / False','ix.tf.trueCorrect':'✓ True — ','ix.tf.falseCorrect':'✓ False — ','ix.tf.true':'True','ix.tf.false':'False',
        'ix.badge.sb':'Step Builder','ix.sb.hintPrefix':'Hint: ','ix.sb.checkAnswers':'Check Answers',
        'ix.sb.allCorrect':'✓ All {n} steps correct!','ix.sb.someCorrect':'{ok}/{total} correct. Hints: ','ix.sb.stepN':'Step {n}: ',
        'exp.interactive':'interactive','exp.viewAsData':'📊 View as data (non-visual equivalent)',
        'exp.quantity':'quantity','exp.value':'value',

        'qud.about.title':'Test format & strategy',
        'qud.about.intro':'The General Aptitude Test (GAT — <span dir="rtl">القدرات العامة</span>, "Qudrat") is administered by Qiyas. Alongside a verbal section it has a <strong>quantitative</strong> section that measures reasoning with numbers rather than memorised content.',
        'qud.about.expect-label':'What to expect',
        'qud.about.expect-body':'Questions are multiple choice and are answered <strong>without a calculator</strong>, so speed and clean mental methods matter as much as the mathematics. The quantitative material draws on arithmetic, algebra, geometry and data — at roughly a middle- to early-secondary level — plus a distinctive <strong>quantitative-comparison</strong> question type covered in Chapter 5.',
        'qud.about.map-label':'GAT Qudrat — Quantitative Section Map',
        'qud.about.map-th-chapter':'Chapter','qud.about.map-th-topics':'Topics tested','qud.about.map-th-share':'Typical share',
        'qud.about.map-r1-ch':'1 — Arithmetic','qud.about.map-r1-tp':'Operations, fractions, LCM/GCD, estimation',
        'qud.about.map-r2-ch':'2 — Ratios & %','qud.about.map-r2-tp':'Part:whole ratios, percentage change, proportions',
        'qud.about.map-r3-ch':'3 — Algebra','qud.about.map-r3-tp':'Linear equations, systems, expansion, substitution',
        'qud.about.map-r4-ch':'4 — Geometry','qud.about.map-r4-tp':'Perimeter, area, angles, triangles, circles',
        'qud.about.map-r5-ch':'5 — QC Questions','qud.about.map-r5-tp':'Compare Quantity A vs B; 4-choice response',
        'qud.about.map-r6-ch':'6 — Sequences','qud.about.map-r6-tp':'Arithmetic/geometric nth term, visual patterns',
        'qud.about.map-r7-ch':'7 — Data & Probability','qud.about.map-r7-tp':'Mean, median, mode; table reading; basic probability',
        'qud.about.map-footer':'<strong>Format:</strong> Multiple choice, no calculator. Questions are in Arabic. Key strategy: estimate first, test special values on QC questions.',
        'qud.about.card-format-t':'Format','qud.about.card-format-v':'multiple choice',
        'qud.about.card-calc-t':'Calculator','qud.about.card-calc-v':'not permitted',
        'qud.about.card-skills-t':'Skills','qud.about.card-skills-v':'arithmetic · algebra · geometry · data',
        'qud.about.card-sig-t':'Signature','qud.about.card-sig-v':'quantitative comparisons',
        'qud.about.habits-label':'▲ Three habits that save time',
        'qud.about.habits-body':'Estimate before computing; keep fractions instead of converting to decimals where possible; and on comparison questions, test convenient values (such as \\( 0 \\), \\( 1 \\), and a negative) before committing to an answer.',
        'qud.about.practice-label':'Practice Problem',
        'qud.about.practice-q':'A student answers 36 out of 45 questions correctly. What percentage is that?',

        'qud.ratio.title':'Ratios, Proportion & Percentages',
        'qud.ratio.intro':'Ratios share a quantity in parts; percentages express change. Both appear constantly on the test, often disguised in word problems.',
        'qud.ratio.ref-label':'▲ Reference — Ratio & percent',
        'qud.ratio.ref-body':'To split a total in ratio \\( a:b \\), there are \\( a+b \\) equal parts. Percentage change is \\( \\dfrac{\\text{new}-\\text{old}}{\\text{old}}\\times100\\% \\). A rise of \\( p\\% \\) then a fall of \\( p\\% \\) does <em>not</em> return to the start.',
        'qud.ratio.exp1-intro':'Adjust the two parts of the ratio below and watch how a total of 120 divides between them.',
        'qud.ratio.exp1-et':'⊙ Explorer · Sharing in a ratio',
        'qud.ratio.exp1-aria':'A bar of total 120 split between two parts of an adjustable ratio',
        'qud.ratio.exp1-caption':'The split of the total by the current ratio',
        'qud.ratio.exp1-ctrl-a':'Part <b>a =</b>','qud.ratio.exp1-ctrl-a-aria':'Part a',
        'qud.ratio.exp1-ctrl-b':'Part <b>b =</b>','qud.ratio.exp1-ctrl-b-aria':'Part b',
        'qud.ratio.exp1-readout-a':'first share','qud.ratio.exp1-readout-b':'second share',
        'qud.ratio.exp1-note':'Each part is \\( \\tfrac{120}{a+b} \\); the shares are \\( a \\) and \\( b \\) of those parts.',
        'qud.ratio.exp2-intro':'Now fix an original value of 80 and slide the new value to read the percentage change directly.',
        'qud.ratio.exp2-et':'⊙ Explorer · Percentage change',
        'qud.ratio.exp2-aria':'Two bars comparing an original value of 80 with an adjustable new value',
        'qud.ratio.exp2-caption':'Original and new values, and the percent change',
        'qud.ratio.exp2-ctrl-pre':'New value =','qud.ratio.exp2-ctrl-post':'(original 80)','qud.ratio.exp2-ctrl-aria':'New value',
        'qud.ratio.exp2-readout':'percentage change',
        'qud.ratio.exp2-note':'\\( \\dfrac{\\text{new}-80}{80}\\times100\\% \\). Equal bars mean \\( 0\\% \\) change.',
        'qud.ratio.card-share-t':'Share','qud.ratio.card-pctchange-t':'% change','qud.ratio.card-increase-t':'Increase','qud.ratio.card-decrease-t':'Decrease',
        'qud.ratio.ex2a-label':'Worked example 2.A',
        'qud.ratio.ex2a-p1':'Share \\( 150 \\) in the ratio \\( 2:3 \\).',
        'qud.ratio.ex2a-p2':'Five parts, each \\( 30 \\):',
        'qud.ratio.ex2b-label':'Worked example 2.B',
        'qud.ratio.ex2b-p1':'A price of \\( 100 \\) rises \\( 10\\% \\), then falls \\( 10\\% \\). Find the final price.',
        'qud.ratio.practice-label':'Practice Problem',
        'qud.ratio.practice-q':'A class has boys to girls in the ratio 3:5. If there are 40 girls, how many students in total?',
        'qud.ratio.practice-solution':'Total parts\\(=3+5=8.\\quad\\)Total students\\(=8\\times8=64.\\)',

        'qud.algebra.title':'Algebra Essentials',
        'qud.algebra.intro':'Linear equations, simple systems, expansion and substitution — the algebra that the quantitative section relies on.',
        'qud.algebra.ref-label':'▲ Reference — Working with unknowns',
        'qud.algebra.ref-body':'Solve a linear equation by isolating the variable. A system of two equations can be solved by elimination or substitution. Expand \\( (x+a)(x+b)=x^2+(a+b)x+ab \\).',
        'qud.algebra.card-linear-t':'Linear','qud.algebra.card-expand-t':'Expand',
        'qud.algebra.card-system-t':'System','qud.algebra.card-system-v':'eliminate or substitute',
        'qud.algebra.card-powers-t':'Powers',
        'qud.algebra.ex3a-label':'Worked example 3.A',
        'qud.algebra.ex3a-p1':'Solve \\( 2x+5=17 \\).',
        'qud.algebra.ex3b-label':'Worked example 3.B',
        'qud.algebra.ex3b-p1':'If \\( x+y=10 \\) and \\( x-y=4 \\), find \\( x \\).',
        'qud.algebra.ex3b-p2':'Add the equations: \\( 2x=14 \\).',
        'qud.algebra.practice-label':'Practice Problem',
        'qud.algebra.practice-q':'Solve: \\(2x+y=11\\) and \\(x-y=1.\\)',
        'qud.algebra.practice-solution1':'Add: \\(3x=12\\Rightarrow x=4.\\)',

        'rail.chapters':'Chapters','rail.practiceSet':'Practice set','rail.testGenerator':'Test generator','rail.downloads':'Downloads',
        'qud.rail.ratio':'Ratios & Percentages','qud.rail.geometry':'Geometry & Measurement',
        'qud.rail.compare':'Quantitative Comparisons','qud.rail.patterns':'Sequences & Patterns',
        'qud.rail.data':'Data & Probability','qud.rail.word':'Word Problems & Reasoning',
        'tah.rail.algebra':'Algebra & Equations','tah.rail.functions':'Functions',
        'tah.rail.sequences':'Sequences & Series','tah.rail.trig':'Trigonometry',
        'tah.rail.geometry':'Geometry & Coordinates','tah.rail.calc1':'Limits & Derivatives',
        'tah.rail.calc2':'Integration & Applications','tah.rail.explog':'Exponentials & Logarithms',
        'tah.rail.stats':'Statistics & Probability',

        'qud.geo.intro':'Angles, triangles, area, perimeter and volume — applied quickly, usually without a calculator.',
        'qud.geo.ref-label':'▲ Reference — Shapes & space',
        'qud.geo.ref-body':'Triangle angles sum to \\( 180^{\\circ} \\); a quadrilateral to \\( 360^{\\circ} \\). Pythagoras: \\( a^2+b^2=c^2 \\). Circle area \\( \\pi r^2 \\), circumference \\( 2\\pi r \\).',
        'qud.geo.card-triangle-t':'Triangle','qud.geo.card-triangle-v':'angles',
        'qud.geo.card-rect-t':'Rectangle','qud.geo.card-circle-t':'Circle','qud.geo.card-pyth-t':'Pythagoras',
        'qud.geo.ex4a-label':'Worked example 4.A',
        'qud.geo.ex4a-p1':'A right triangle has legs \\( 6 \\) and \\( 8 \\). Find the hypotenuse.',
        'qud.geo.ex4b-label':'Worked example 4.B',
        'qud.geo.ex4b-p1':'Find the area of a circle with \\( r=7 \\), taking \\( \\pi=\\tfrac{22}{7} \\).',
        'qud.geo.practice-label':'Practice Problem',
        'qud.geo.practice-q':'A rectangle has length \\((2x+3)\\) cm and width \\((x+1)\\) cm with perimeter 38 cm. Find the area.',
        'qud.geo.practice-solution2':'Length\\(=13\\) cm, Width\\(=6\\) cm. Area\\(=78\\) cm\\(^2.\\)',

        'qud.compare.intro':'The question type most associated with Qudrat: two quantities, <strong>A</strong> and <strong>B</strong>, and a single decision to make.',
        'qud.compare.def-label':'● The four responses',
        'qud.compare.def-body':'Choose: <strong>A &gt; B</strong>, <strong>A &lt; B</strong>, <strong>A = B</strong>, or <strong>cannot be determined</strong> — the last when the relationship changes depending on unknown values. Always test convenient numbers before deciding.',
        'qud.compare.exp-intro':'Here \\( A=2x \\) and \\( B=x+3 \\). Slide \\( x \\): notice the order of A and B <em>flips</em>, so with \\( x \\) unknown the honest answer is "cannot be determined".',
        'qud.compare.exp-et':'⊙ Explorer · A vs B',
        'qud.compare.exp-aria':'A number line comparing quantity A equals 2x with quantity B equals x plus 3',
        'qud.compare.exp-caption':'Quantity A and B at the current x, and how the relation changes across x',
        'qud.compare.exp-th-relation':'relation',
        'qud.compare.exp-ctrl-aria':'Value of x',
        'qud.compare.exp-readout-rel':'relationship',
        'qud.compare.exp-note':'They are equal at \\( x=3 \\); to the left \\( B \\) leads, to the right \\( A \\) leads.',
        'qud.compare.ex5a-label':'Worked example 5.A',
        'qud.compare.ex5a-p1':'<strong>A:</strong> \\( 25\\% \\) of \\( 80 \\). &nbsp; <strong>B:</strong> \\( 20 \\). Compare.',
        'qud.compare.ex5a-p2':'\\( 25\\% \\) of \\( 80=20 \\), so',
        'qud.compare.ex5b-label':'Worked example 5.B',
        'qud.compare.ex5b-p1':'<strong>A:</strong> \\( x \\). &nbsp; <strong>B:</strong> \\( x^{2} \\), for a real number \\( x \\). Compare.',
        'qud.compare.ex5b-p2':'If \\( x=\\tfrac12 \\) then \\( B&lt;A \\); if \\( x=2 \\) then \\( B&gt;A \\). Therefore',
        'qud.compare.strategy-label':'▲ Quantitative comparison strategy',
        'qud.compare.strategy-body':'Each QC question gives two quantities, A and B. You choose: A&gt;B, B&gt;A, A=B, or cannot be determined. Plug in special values (0, 1, −1, fractions) to test.',
        'qud.compare.card-s1-t':'Strategy 1','qud.compare.card-s1-v':'Simplify both columns algebraically before comparing',
        'qud.compare.card-s2-t':'Strategy 2','qud.compare.card-s2-v':'Plug in 0, 1, −1, ½ to check if relationship is constant',
        'qud.compare.card-s3-t':'Strategy 3','qud.compare.card-s3-v':'If a variable could make either column larger: "cannot determine"',
        'qud.compare.card-tip-t':'Geometry tip','qud.compare.card-tip-v':'Draw a diagram; do not assume figures are to scale',
        'qud.compare.ex-generic-label':'Worked example',
        'qud.compare.ex-generic-p1':'Column A: \\( x^2 \\). Column B: \\( x \\). Compare.',
        'qud.compare.ex-generic-p2':'If \\( x=2 \\): \\( 4&gt;2 \\). If \\( x=\\frac{1}{2} \\): \\( \\frac{1}{4}&lt;\\frac{1}{2} \\). If \\( x=0 \\): equal. → Cannot be determined.',
        'qud.compare.practice-label':'Practice Problem',
        'qud.compare.practice-q':'<strong>Quantity A:</strong> \\((x-3)^2\\) &nbsp; <strong>Quantity B:</strong> \\(x^2-6x+9\\) for any real \\(x\\). Compare.',
        'qud.compare.practice-solution1':'Expand A: \\((x-3)^2=x^2-6x+9.\\)',
        'qud.compare.practice-solution2':'<strong>A = B</strong> (always).'
      }
    };

    var _locale = localStorage.getItem('clipsat_locale') || 'en';

    /* The Arabic strings ship as their own file, public/js/i18n-ar.js (20e-i18n-ar.js),
       loaded the first time Arabic is needed rather than with every page (ADR 0040).
       Until it arrives t() falls back to English. */
    var _pending = {};
    function _addStrings(loc, dict){ _strings[loc] = dict; }
    function _ensureStrings(loc){
      if(_strings[loc]) return Promise.resolve();
      if(_pending[loc]) return _pending[loc];
      _pending[loc] = new Promise(function(resolve){
        var s = document.createElement('script');
        s.src = '/js/i18n-' + loc + '.js';
        s.onload = function(){ resolve(); };
        s.onerror = function(){ _pending[loc] = null; resolve(); }; // stay in English text; a later toggle retries
        document.head.appendChild(s);
      });
      return _pending[loc];
    }
    if(_locale !== 'en') _ensureStrings(_locale); // start early for a saved Arabic locale

    function t(key, vars){
      var str = (_strings[_locale]||_strings.en)[key] || key;
      if(vars) Object.keys(vars).forEach(function(k){ str=str.replace('{'+k+'}',vars[k]); });
      return str;
    }

    /* Containers actually translated so far — must stay in exact sync with
       the `body.rtl ...{direction:rtl}` selectors in the CSS block above
       ("RTL / ARABIC" comment). Setting `dir` here (not just CSS `direction`)
       matters for the Unicode Bidi Algorithm on real Arabic text runs, not
       just visual alignment. Deliberately NOT html/body-level — the rest of
       each track's chapter content is untranslated English and must stay LTR. */
    var RTL_SCOPE_SELECTOR = 'header.site, .hero, footer.site, #qud-arithmetic .i18n-content, #qud-about .i18n-content, #qud-ratio .i18n-content, #qud-algebra .i18n-content, #qud-geometry .i18n-content, #qud-compare .i18n-content, #view-contact, #view-privacy, #view-terms, #view-cookies, #view-calculator, #view-home';

    function setLocale(loc){
      _locale = loc;
      localStorage.setItem('clipsat_locale', loc);
      document.documentElement.lang = loc; // safe globally — lang is metadata, doesn't affect layout/inheritance
      document.body.classList.toggle('rtl', loc==='ar'); // CSS mirroring hook — see body.rtl rules
      document.querySelectorAll(RTL_SCOPE_SELECTOR).forEach(function(el){
        el.dir = loc==='ar' ? 'rtl' : 'ltr';
      });
      /* update toggle button label */
      var btn=document.getElementById('i18n-toggle-btn');
      if(btn){
        btn.textContent = loc==='ar' ? '🌐 EN' : '🌐 ع';
        btn.title = loc==='ar' ? 'Switch to English' : 'Switch to Arabic';
      }
      _applyToDOM(); // bilingual content and English strings switch now
      return _ensureStrings(loc).then(function(){
        if(_locale !== loc) return; // toggled again while the strings were loading
        if(loc !== 'en') _applyToDOM();
        /* re-translate already-injected Interactive Practice widgets (chrome +
           any reviewed-chapter Arabic content) — see _inject()'s locale guard */
        if(window.ClipSATIX)window.ClipSATIX.refreshAll();
        if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise();
      });
    }

    function getLocale(){ return _locale; }

    function _applyToDOM(){
      document.querySelectorAll('[data-i18n]').forEach(function(el){
        el.textContent = t(el.getAttribute('data-i18n'));
      });
      /* data-i18n-html: same as data-i18n but the English source string itself
         contains a styled child element (e.g. the hero H1's <span class="q1">),
         so it needs an innerHTML swap instead of a plain textContent one. */
      document.querySelectorAll('[data-i18n-html]').forEach(function(el){
        el.innerHTML = t(el.getAttribute('data-i18n-html'));
      });
      /* data-i18n-attr="attrName:key" — translates a single named attribute
         (placeholders, titles) instead of the element's own content. */
      document.querySelectorAll('[data-i18n-attr]').forEach(function(el){
        var spec=el.getAttribute('data-i18n-attr').split(':');
        el.setAttribute(spec[0], t(spec[1]));
      });
      /* data-bilingual: content migrated to content/{track}/*.json (docs/CONTENT_MODEL.md)
         embeds BOTH languages directly as two child elements (.i18n-en / .i18n-ar) instead
         of a dictionary-key lookup — there is no key, so nothing above applies to it. Toggle
         which child is visible; if there's no .i18n-ar (the source string's "ar" was null,
         i.e. not yet translated), the English one just stays visible regardless of locale.
         Purely additive: pages with no [data-bilingual] elements (everything before this was
         written) are unaffected — the querySelectorAll below simply returns nothing. */
      document.querySelectorAll('[data-bilingual]').forEach(function(el){
        var en = el.querySelector(':scope > .i18n-en');
        var ar = el.querySelector(':scope > .i18n-ar');
        if(!en) return;
        var showAr = _locale === 'ar' && !!ar;
        en.hidden = showAr;
        if(ar) ar.hidden = !showAr;
      });
      /* data-bilingual-attrs="attr1,attr2": companion to data-bilingual above, for values
         that must be plain attributes (aria-label, etc.) rather than visible content, so the
         dual-span trick doesn't apply. Reads data-{attr}-en / data-{attr}-ar and sets attr to
         whichever matches the current locale (falls back to -en if no -ar exists). */
      document.querySelectorAll('[data-bilingual-attrs]').forEach(function(el){
        el.getAttribute('data-bilingual-attrs').split(',').forEach(function(attr){
          var en = el.getAttribute('data-'+attr+'-en');
          var ar = el.getAttribute('data-'+attr+'-ar');
          var val = (_locale === 'ar' && ar) ? ar : en;
          if(val != null) el.setAttribute(attr, val);
        });
      });
    }

    /* Apply on load — always through setLocale() so the toggle-button label,
       lang/dir attributes, and body.rtl class all end up consistent
       regardless of whether the script runs before or after DOMContentLoaded. */
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded', function(){ setLocale(_locale); });
    } else {
      setLocale(_locale);
    }

    return {t:t, setLocale:setLocale, getLocale:getLocale, _addStrings:_addStrings};
  }());


  /* ── TITLE + META INJECTOR ── */
  })();
