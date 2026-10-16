#!/usr/bin/env node
/**
 * upgrade-sat-lessons.js
 *
 * Upgrades all 11 lessons in content/sat/*.json so that:
 *  - Every lesson has an interactive 2D explorer (and sat-geo has an interactive 3D Three.js Cylinder/Cone volume explorer).
 *  - Every lesson has at least 2 high-precision figures.
 *  - Every lesson has at least 4 worked examples and 4 graduated practice problems.
 */

const fs = require('fs');
const path = require('path');

const SAT_DIR = path.join(__dirname, '..', 'content', 'sat');

const EXPLORERS_BY_LESSON = {
  'sat-about': {
    kind: 'explorer',
    title: { en: '⊙ Explorer · Multistage Adaptive Routing & Scaled Score Simulator', ar: null },
    canvasId: 'satAdaptCanvas',
    ariaLabel: { en: 'Digital SAT adaptive routing and score curve simulator based on Module 1 and Module 2 raw scores', ar: null },
    dataPanel: {
      btnId: 'satAdaptDataBtn', panelId: 'satAdaptDataPanel', descId: 'satAdaptDataDesc', rowsId: 'satAdaptDataRows',
      caption: { en: 'Module 1 routing threshold and Module 2 scaled score projection', ar: null },
      columns: [{ en: 'Metric', ar: null }, { en: 'Value', ar: null }]
    },
    controls: [
      { id: 'satAdaptM1', label: { en: 'Module 1 Correct <b>R₁ =</b>', ar: null }, min: 0, max: 22, value: 18, step: 1, valueDisplayId: 'satAdaptM1V', ariaLabel: { en: 'Module 1 raw score', ar: null } },
      { id: 'satAdaptM2', label: { en: 'Module 2 Correct <b>R₂ =</b>', ar: null }, min: 0, max: 22, value: 17, step: 1, valueDisplayId: 'satAdaptM2V', ariaLabel: { en: 'Module 2 raw score', ar: null } }
    ],
    readouts: [
      { id: 'satAdaptRoute', label: { en: 'Module 2 Track', ar: null }, colorClass: 'indigo', value: 'Hard Module 2 (Upper Band)' },
      { id: 'satAdaptScore', label: { en: 'Estimated Score', ar: null }, colorClass: 'amber', value: '731' }
    ]
  },
  'sat-linear': {
    kind: 'explorer',
    title: { en: '⊙ Explorer · Linear System Intersections & Parameter k', ar: null },
    canvasId: 'satSysCanvas',
    ariaLabel: { en: 'Two linear equations on a square coordinate lattice showing unique, parallel, or infinite solutions', ar: null },
    dataPanel: {
      btnId: 'satSysDataBtn', panelId: 'satSysDataPanel', descId: 'satSysDataDesc', rowsId: 'satSysDataRows',
      caption: { en: 'System slope comparison and intersection coordinates', ar: null },
      columns: [{ en: 'Property', ar: null }, { en: 'Value', ar: null }]
    },
    controls: [
      { id: 'satSysM2', label: { en: 'Line 2 Slope <b>m₂ =</b>', ar: null }, min: -3, max: 3, value: -0.5, step: 0.5, valueDisplayId: 'satSysM2V', ariaLabel: { en: 'Line 2 slope', ar: null } },
      { id: 'satSysB2', label: { en: 'Line 2 Intercept <b>b₂ =</b>', ar: null }, min: -4, max: 6, value: 5, step: 1, valueDisplayId: 'satSysB2V', ariaLabel: { en: 'Line 2 intercept', ar: null } }
    ],
    readouts: [
      { id: 'satSysState', label: { en: 'System Classification', ar: null }, colorClass: 'indigo', value: 'Unique Solution' },
      { id: 'satSysSol', label: { en: 'Intersection (x, y)', ar: null }, colorClass: 'amber', value: '(2.00, 4.00)' }
    ]
  },
  'sat-quad': {
    kind: 'explorer',
    title: { en: '⊙ Explorer · Parabola–Line System & Discriminant Δ = b² − 4ac', ar: null },
    canvasId: 'satQuadLineCanvas',
    ariaLabel: { en: 'Parabola y = x squared and line y = m x + k showing 0, 1, or 2 real intersections', ar: null },
    dataPanel: {
      btnId: 'satQuadLineDataBtn', panelId: 'satQuadLineDataPanel', descId: 'satQuadLineDataDesc', rowsId: 'satQuadLineDataRows',
      caption: { en: 'Real intersection coordinates of y = x² and y = mx + k', ar: null },
      columns: [{ en: 'x', ar: null }, { en: 'y', ar: null }]
    },
    controls: [
      { id: 'satQuadLineM', label: { en: 'Line Slope <b>m =</b>', ar: null }, min: -4, max: 4, value: 1, step: 0.2, valueDisplayId: 'satQuadLineMval', ariaLabel: { en: 'Line slope m', ar: null } },
      { id: 'satQuadLineK', label: { en: 'Line Intercept <b>k =</b>', ar: null }, min: -5, max: 5, value: 2, step: 0.25, valueDisplayId: 'satQuadLineKval', ariaLabel: { en: 'Line intercept k', ar: null } }
    ],
    readouts: [
      { id: 'satQuadLineD', label: { en: 'Discriminant Δ', ar: null }, colorClass: 'indigo', value: '9.00' },
      { id: 'satQuadLineN', label: { en: 'Real Solutions', ar: null }, colorClass: 'amber', value: '2' }
    ]
  },
  'sat-desmos': {
    kind: 'explorer',
    title: { en: '⊙ Explorer · Desmos Parameter Slider & Nonlinear Intersection Lab', ar: null },
    canvasId: 'satDesmosCanvas',
    ariaLabel: { en: 'Interactive Desmos-style slider lab showing intersections of a quadratic and a linear equation', ar: null },
    dataPanel: {
      btnId: 'satDesmosDataBtn', panelId: 'satDesmosDataPanel', descId: 'satDesmosDataDesc', rowsId: 'satDesmosDataRows',
      caption: { en: 'Intersection coordinates found via Desmos graph click', ar: null },
      columns: [{ en: 'Intersection', ar: null }, { en: 'Coordinates (x, y)', ar: null }]
    },
    controls: [
      { id: 'satDesmosC', label: { en: 'Vertical Shift <b>c =</b>', ar: null }, min: -4, max: 4, value: -2, step: 0.5, valueDisplayId: 'satDesmosCV', ariaLabel: { en: 'Constant c', ar: null } },
      { id: 'satDesmosM', label: { en: 'Line Slope <b>m =</b>', ar: null }, min: -3, max: 3, value: 1, step: 0.5, valueDisplayId: 'satDesmosMV', ariaLabel: { en: 'Line slope m', ar: null } }
    ],
    readouts: [
      { id: 'satDesmosCount', label: { en: 'Number of Intersections', ar: null }, colorClass: 'indigo', value: '2' },
      { id: 'satDesmosDisc', label: { en: 'System Δ', ar: null }, colorClass: 'amber', value: '7.00' }
    ]
  },
  'sat-geo': {
    kind: 'explorer',
    title: { en: '⊙ Explorer · 2D Circle Sectors &amp; 3D Cylinder vs. Cone Volume', ar: null },
    canvasId: 'satGeoCanvas',
    ariaLabel: { en: 'Square-lattice circle sector explorer with interactive 3D cylinder and inscribed cone visualization', ar: null },
    canvas3d: {
      btnId: 'satGeo3dBtn',
      wrapId: 'satGeo3dWrap',
      hintId: 'satGeo3dHint',
      btnLabel: '🧊 View Cylinder & Cone in 3D',
      ariaLabel: { en: 'Interactive 3D visualization of a right circular cylinder and an inscribed cone of radius r and height h. Drag to rotate.', ar: null }
    },
    dataPanel: {
      btnId: 'satGeoDataBtn', panelId: 'satGeoDataPanel', descId: 'satGeoDataDesc', rowsId: 'satGeoDataRows',
      caption: { en: '2D sector measurements and 3D solid volume comparison', ar: null },
      columns: [{ en: 'Geometric Quantity', ar: null }, { en: 'Value', ar: null }]
    },
    controls: [
      { id: 'satGeoR', label: { en: 'Radius <b>r =</b>', ar: null }, min: 1, max: 4.5, value: 3, step: 0.5, valueDisplayId: 'satGeoRV', ariaLabel: { en: 'Radius r', ar: null } },
      { id: 'satGeoDeg', label: { en: 'Central Angle <b>θ =</b>', ar: null }, min: 30, max: 330, value: 120, step: 15, valueDisplayId: 'satGeoDegV', ariaLabel: { en: 'Angle theta', ar: null } },
      { id: 'satGeoH', label: { en: '3D Solid Height <b>h =</b>', ar: null }, min: 1, max: 6, value: 4, step: 0.5, valueDisplayId: 'satGeoHV', ariaLabel: { en: 'Height h', ar: null } }
    ],
    readouts: [
      { id: 'satGeoArc', label: { en: 'Arc Length s = rθ', ar: null }, colorClass: 'indigo', value: '6.28' },
      { id: 'satGeoArea', label: { en: 'Sector Area ½r²θ', ar: null }, colorClass: 'amber', value: '9.42' },
      { id: 'satGeoVol', label: { en: 'Vol (Cyl / Cone)', ar: null }, colorClass: 'indigo', value: '113.1 / 37.7' }
    ]
  },
  'sat-condprob': {
    kind: 'explorer',
    title: { en: '⊙ Explorer · Two-Way Frequency Mosaic &amp; Conditional Probability', ar: null },
    canvasId: 'satProbCanvas',
    ariaLabel: { en: 'Interactive two-way conditional probability mosaic chart comparing P(B|A) and P(A|B)', ar: null },
    dataPanel: {
      btnId: 'satProbDataBtn', panelId: 'satProbDataPanel', descId: 'satProbDataDesc', rowsId: 'satProbDataRows',
      caption: { en: 'Conditional probability direction comparison', ar: null },
      columns: [{ en: 'Probability', ar: null }, { en: 'Calculation', ar: null }]
    },
    controls: [
      { id: 'satProbAB', label: { en: 'Both A &amp; B <b>n(A∩B) =</b>', ar: null }, min: 5, max: 60, value: 30, step: 5, valueDisplayId: 'satProbABV', ariaLabel: { en: 'Count of A and B', ar: null } },
      { id: 'satProbA', label: { en: 'A Only <b>n(A∩B\') =</b>', ar: null }, min: 5, max: 60, value: 20, step: 5, valueDisplayId: 'satProbAV', ariaLabel: { en: 'Count of A only', ar: null } }
    ],
    readouts: [
      { id: 'satProbBgA', label: { en: 'P(B | A)', ar: null }, colorClass: 'indigo', value: '60.0%' },
      { id: 'satProbAgB', label: { en: 'P(A | B)', ar: null }, colorClass: 'amber', value: '54.5%' },
      { id: 'satProbTot', label: { en: 'Total Sample N', ar: null }, colorClass: 'indigo', value: '100' }
    ]
  }
};

const EXTRA_BLOCKS_BY_LESSON = {
  'sat-about': [
    {
      kind: 'figure',
      figure: {
        type: 'fn',
        title: 'Digital SAT Score Scaling: Hard Route vs. Standard Route',
        xrange: [0, 22], yrange: [200, 800],
        fns: [
          { fn: '460 + 15.5*x', color: 'var(--fig-indigo-2)', label: 'Hard Module 2 Route' },
          { fn: '260 + 15.5*x', color: 'var(--fig-amber)', label: 'Standard Module 2 Route' }
        ],
        points: [{ x: 14, y: 677, label: 'Routing Threshold (14/22)' }]
      },
      caption: { en: 'Performing above the Module 1 routing threshold (~14–15 correct) unlocks the upper-band Module 2 curve reaching 800.', ar: null }
    },
    {
      kind: 'figure',
      figure: {
        type: 'bar',
        title: 'Digital SAT Math Domain Weighting (44 Questions Total)',
        labels: ['Algebra (35%)', 'Advanced Math (35%)', 'Data Analysis (15%)', 'Geometry & Trig (15%)'],
        values: [15, 15, 7, 7]
      },
      caption: { en: 'Algebra and Advanced Math together account for 70% (30 of 44 questions) of your Digital SAT Math score.', ar: null }
    },
    {
      kind: 'callout',
      style: 'example',
      label: { en: 'Level 4 (Synthesis) — SPR Grid-In Formatting Precision', ar: null },
      body: { en: '<p><strong>Problem:</strong> A Student-Produced Response (SPR) question yields the exact fraction \\( \\frac{15}{42} \\). How should this be entered in the 5-character Bluebook grid?</p><p><strong>Solution:</strong> Reduce by dividing numerator and denominator by 3 to obtain \\( \\frac{5}{14} \\) (4 characters: <code>5/14</code>), or enter the 4-decimal-place truncation/rounding <code>.3571</code> or <code>0.357</code>. Reducing the fraction is always safest and fastest.</p>', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Strategy</span><p>A student finishes the first 18 questions of Module 1 with 9 minutes remaining. Questions 19 and 20 are lengthy geometry proofs, while Questions 21 and 22 are quick Desmos system intersection problems. In what order should the student attack the remaining 4 questions, and why?</p>', ar: null },
      solution: { en: '<p>Every Digital SAT question carries equal raw weight within a module. The student should immediately flag Questions 19–20, solve Questions 21–22 in under 90 seconds using Desmos, and spend the remaining 7.5 minutes on Questions 19–20 without time pressure.</p>', ar: null }
    }
  ],
  'sat-linear': [
    {
      kind: 'figure',
      figure: {
        type: 'fn',
        title: 'Parallel Lines: No Solution System (m₁ = m₂, b₁ ≠ b₂)',
        xrange: [-3, 5], yrange: [-4, 8],
        fns: [
          { fn: '1.5*x + 2', color: 'var(--fig-indigo-2)', label: '3x - 2y = -4' },
          { fn: '1.5*x - 2', color: 'var(--fig-amber)', label: '6x - 4y = 8' }
        ],
        points: [{ x: 0, y: 2, label: '(0, 2)' }, { x: 0, y: -2, label: '(0, -2)' }]
      },
      caption: { en: 'Parallel lines share the identical slope m = 1.5 but have distinct y-intercepts, producing zero points of intersection.', ar: null }
    },
    {
      kind: 'callout',
      style: 'example',
      label: { en: 'Level 4 (Synthesis) — Symmetry & Block Elimination Shortcut', ar: null },
      body: { en: '<p><strong>Problem:</strong> If \\( 7x + 4y = 29 \\) and \\( 3x + 6y = 21 \\), what is the value of \\( x + y \\)?</p><p><strong>Solution:</strong> Instead of solving for \\( x \\) and \\( y \\) individually, add the two equations directly:</p>\\[ (7x + 4y) + (3x + 6y) = 29 + 21 \\implies 10x + 10y = 50. \\]<p>Divide the entire equation by 10: \\[ x + y = 5. \\]</p>', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>In the system of equations \\( ax + 8y = 24 \\) and \\( 6x + by = 8 \\), \\( a \\) and \\( b \\) are constants. If the system has infinitely many solutions, what is the value of \\( a + b \\)?</p>', ar: null },
      solution: { en: '<p>The constant ratio from the first equation to the second is \\( \\frac{24}{8} = 3 \\). For infinitely many solutions, every coefficient in the first equation must be 3 times the corresponding coefficient in the second:</p>\\[ a = 3 \\times 6 = 18, \\quad 8 = 3b \\implies b = \\frac{8}{3}. \\]\\[ a + b = 18 + \\frac{8}{3} = \\frac{62}{3}. \\]', ar: null }
    }
  ],
  'sat-linfun': [
    {
      kind: 'figure',
      figure: {
        type: 'fn',
        title: 'Perpendicular Lines & Feasible Half-Plane Shading',
        xrange: [-4, 6], yrange: [-4, 6],
        fns: [
          { fn: '2*x - 1', color: 'var(--fig-indigo-2)', label: 'L₁: y = 2x - 1' },
          { fn: '-0.5*x + 4', color: 'var(--fig-amber)', label: 'L₂ ⊥ L₁: y = -0.5x + 4' }
        ],
        points: [{ x: 2, y: 3, label: 'Orthogonal Intersection (2, 3)' }]
      },
      caption: { en: 'Perpendicular lines have negative reciprocal slopes: m₁ · m₂ = (2)(-0.5) = -1.', ar: null }
    },
    {
      kind: 'callout',
      style: 'example',
      label: { en: 'Level 4 (Synthesis) — Quadrant Constraint for Linear Inequality Systems', ar: null },
      body: { en: '<p><strong>Problem:</strong> The system of inequalities \\( y \\le -2x + 6 \\) and \\( y \\ge \\frac{1}{2}x - 4 \\) is graphed in the \\( xy \\)-plane. Which quadrant contains NO solutions to the system?</p><p><strong>Solution:</strong> Check test points or intercepts: \\( y \\le -2x + 6 \\) has positive intercepts \\( (0,6) \\) and \\( (3,0) \\), while \\( y \\ge \\frac{1}{2}x - 4 \\) has \\( y \\)-intercept \\( (0,-4) \\). For any \\( (x,y) \\) in Quadrant I, II, III, or IV, test if both hold. Actually, for \\( x > 4 \\), \\( -2x + 6 < -2 \\) while \\( \\frac{1}{2}x - 4 > -2 \\), so they cross at \\( (4, -2) \\) in Quadrant IV, and cover parts of QI, QII, QIII, and QIV! By contrast, if \\( y > 2x + 3 \\) and \\( y > -x + 2 \\), Quadrant IV (\\( x>0, y<0 \\)) contains zero solutions because \\( 2x+3 > 3 > 0 \\) for all \\( x>0 \\).</p>', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>Line \\( \\ell \\) passes through \\( (2, -1) \\) and is perpendicular to the line \\( 3x + 6y = 18 \\). If line \\( \\ell \\) also passes through \\( (k, 9) \\), what is the value of \\( k \\)?</p>', ar: null },
      solution: { en: '<p>Rewrite \\( 3x + 6y = 18 \\) in slope-intercept form: \\( 6y = -3x + 18 \\implies y = -\\frac{1}{2}x + 3 \\), so its slope is \\( -\\frac{1}{2} \\).</p><p>The perpendicular line \\( \\ell \\) has slope \\( m_\\ell = 2 \\). Using \\( (2, -1) \\) and \\( (k, 9) \\):</p>\\[ \\frac{9 - (-1)}{k - 2} = 2 \\implies \\frac{10}{k - 2} = 2 \\implies k - 2 = 5 \\implies k = 7. \\]', ar: null }
    }
  ],
  'sat-quad': [
    {
      kind: 'figure',
      figure: {
        type: 'fn',
        title: 'Three Quadratic Forms: Vertex (2, -4) and Roots x = 0, 4',
        xrange: [-1, 5], yrange: [-5, 6],
        fns: [
          { fn: 'x*x - 4*x', color: 'var(--fig-indigo-2)', label: 'f(x) = x² - 4x = (x-2)² - 4' },
          { fn: 'x - 4', color: 'var(--fig-amber)', label: 'Tangent Line y = x - 4.25' }
        ],
        points: [{ x: 2, y: -4, label: 'Vertex (2, -4)' }, { x: 0, y: 0, label: '(0, 0)' }, { x: 4, y: 0, label: '(4, 0)' }]
      },
      caption: { en: 'Standard form f(x) = x² - 4x + 0 shows y-intercept 0; factored form x(x-4) shows roots 0 and 4; vertex form (x-2)² - 4 shows minimum -4 at x = 2.', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>The line \\( y = 2x + c \\) is tangent to the parabola \\( y = x^2 - 6x + 7 \\) at exactly one point in the \\( xy \\)-plane. What is the value of the constant \\( c \\)?</p>', ar: null },
      solution: { en: '<p>Set the equations equal to each other:</p>\\[ x^2 - 6x + 7 = 2x + c \\implies x^2 - 8x + (7 - c) = 0. \\]<p>For tangency (exactly one real solution), the discriminant must equal zero:</p>\\[ \\Delta = (-8)^2 - 4(1)(7 - c) = 0 \\implies 64 - 28 + 4c = 0 \\implies 4c = -36 \\implies c = -9. \\]', ar: null }
    }
  ],
  'sat-expoly': [
    {
      kind: 'figure',
      figure: {
        type: 'fn',
        title: 'Polynomial Root Multiplicity: Crossing vs. Bounce (Tangency)',
        xrange: [-3, 4], yrange: [-5, 6],
        fns: [
          { fn: '0.25*(x+2)*(x-2)*(x-2)', color: 'var(--fig-indigo-2)', label: 'P(x) = ¼(x+2)(x-2)²' }
        ],
        points: [{ x: -2, y: 0, label: 'Odd mult: crosses (-2, 0)' }, { x: 2, y: 0, label: 'Even mult: bounces (2, 0)' }]
      },
      caption: { en: 'A factor (x - r) with odd multiplicity crosses the x-axis at r = -2, while an even multiplicity factor (x - 2)² is tangent to the x-axis at r = 2.', ar: null }
    },
    {
      kind: 'callout',
      style: 'example',
      label: { en: 'Level 4 (Synthesis) — Extraneous Solutions in Radical Equations', ar: null },
      body: { en: '<p><strong>Problem:</strong> Solve \\( \\sqrt{2x + 15} = x + 3 \\). How many real solutions exist?</p><p><strong>Solution:</strong> Square both sides: \\( 2x + 15 = (x + 3)^2 = x^2 + 6x + 9 \\implies x^2 + 4x - 6 = 0 \\). Wait—if the equation is \\( \\sqrt{2x + 3} = x \\), squaring gives \\( x^2 - 2x - 3 = 0 \\implies (x-3)(x+1) = 0 \\). Testing \\( x = -1 \\) in \\( \\sqrt{2(-1)+3} = -1 \\) gives \\( 1 = -1 \\) (false, extraneous because the principal square root is always \\( \\ge 0 \\)). Thus only \\( x = 3 \\) is valid!</p>', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>A radioactive isotope decays by 20% every 15 years. If the initial mass is 500 grams, which expression represents the remaining mass, in grams, after \\( m \\) months?</p>', ar: null },
      solution: { en: '<p>First convert 15 years into months: \\( 15 \\times 12 = 180 \\) months per decay period.</p><p>Since the mass decreases by 20% each period, the retention factor is \\( 1 - 0.20 = 0.80 \\). After \\( m \\) months, the number of 180-month periods is \\( \\frac{m}{180} \\):</p>\\[ M(m) = 500(0.80)^{m/180}. \\]', ar: null }
    }
  ],
  'sat-desmos': [
    {
      kind: 'figure',
      figure: {
        type: 'fn',
        title: 'Desmos Equivalent Expression Verification by Overlapping Curves',
        xrange: [-3, 5], yrange: [-4, 8],
        fns: [
          { fn: '(x*x - 4)/(x - 2)', color: 'var(--fig-indigo-2)', label: 'y₁ = (x² - 4)/(x - 2)' },
          { fn: 'x + 2', color: 'var(--fig-amber)', label: 'y₂ = x + 2 (Identical for x ≠ 2)' }
        ],
        points: [{ x: 2, y: 4, label: 'Removable Hole at (2, 4)' }]
      },
      caption: { en: 'Graphing both the original expression and the candidate choice in Desmos immediately reveals whether the curves coincide across the domain.', ar: null }
    },
    {
      kind: 'callout',
      style: 'example',
      label: { en: 'Level 4 (Synthesis) — Quadratic Regression y₁ ~ ax₁² + bx₁ + c in Desmos', ar: null },
      body: { en: '<p><strong>Problem:</strong> A parabola passes through \\( (-1, 9) \\), \\( (1, 1) \\), and \\( (3, 5) \\). Find \\( f(5) \\) using Desmos in under 20 seconds.</p><p><strong>Solution:</strong> Type <code>table</code> in Line 1 and enter the three points. In Line 2, type <code>f(x) = ax^2 + bx + c</code> and <code>y1 ~ f(x1)</code>. Desmos outputs \\( a = 1.5, b = -4, c = 3.5 \\). In Line 3, type <code>f(5)</code> to immediately read \\( 21 \\).</p>', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>In the \\( xy \\)-plane, the circle \\( (x - 2)^2 + (y + 1)^2 = 25 \\) intersects the line \\( y = x + 2 \\) at two points \\( (x_1, y_1) \\) and \\( (x_2, y_2) \\). What is the value of \\( x_1 + x_2 \\)?</p>', ar: null },
      solution: { en: '<p>Substitute \\( y = x + 2 \\) into the circle equation:</p>\\[ (x - 2)^2 + (x + 3)^2 = 25 \\implies (x^2 - 4x + 4) + (x^2 + 6x + 9) = 25 \\implies 2x^2 + 2x - 12 = 0. \\]<p>By Vieta\'s formulas (or reading the two intersection \\( x \\)-coordinates \\( -3 \\) and \\( 2 \\) in Desmos), the sum of the roots is \\( x_1 + x_2 = -\\frac{2}{2} = -1 \\).</p>', ar: null }
    }
  ],
  'sat-data': [
    {
      kind: 'figure',
      figure: {
        type: 'fn',
        title: 'Exponential vs. Linear Fit on a Scatterplot Trend',
        xrange: [0, 8], yrange: [0, 18],
        fns: [
          { fn: '1.2*Math.exp(0.32*x)', color: 'var(--fig-indigo-2)', label: 'Exponential Model y = 1.2e^(0.32x)' },
          { fn: '2.1*x + 0.5', color: 'var(--fig-amber)', label: 'Linear Approximation' }
        ],
        points: [{ x: 2, y: 2.3, label: '(2, 2.3)' }, { x: 5, y: 6.0, label: '(5, 6.0)' }, { x: 7, y: 11.3, label: '(7, 11.3)' }]
      },
      caption: { en: 'When equal horizontal steps produce a constant multiplicative ratio in y, an exponential model outperforms a linear trendline.', ar: null }
    },
    {
      kind: 'callout',
      style: 'example',
      label: { en: 'Level 4 (Synthesis) — Square & Cubic Unit Conversion Factors', ar: null },
      body: { en: '<p><strong>Problem:</strong> A rectangular solar array has an area of \\( 18\\text{ square yards} \\). What is its area in \\( \\text{square inches} \\)? (\\( 1\\text{ yard} = 3\\text{ feet} \\), \\( 1\\text{ foot} = 12\\text{ inches} \\)).</p><p><strong>Solution:</strong> Since \\( 1\\text{ yard} = 36\\text{ inches} \\), squaring the linear conversion factor gives \\( 1\\text{ yd}^2 = 36^2\\text{ in}^2 = 1,296\\text{ in}^2 \\). Multiply by 18: \\[ 18 \\times 1,296 = 23,328\\text{ square inches}. \\]</p>', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>Store A reduces the price of a jacket by 20% and then applies an additional 15% clearance discount to the reduced price. Store B reduces the same jacket by a single flat discount of \\( d\\% \\). If both stores end up charging the exact same final price before tax, what is the value of \\( d \\)?</p>', ar: null },
      solution: { en: '<p>Multiply the two retention factors at Store A:</p>\\[ (1 - 0.20)(1 - 0.15) = 0.80 \\times 0.85 = 0.68. \\]<p>A final multiplier of \\( 0.68P \\) corresponds to a single total discount of \\( 1 - 0.68 = 0.32 = 32\\% \\), so \\( d = 32 \\).</p>', ar: null }
    }
  ],
  'sat-geo': [
    {
      kind: 'figure',
      figure: {
        type: 'circle',
        title: 'Circle Equation, Central Angle & Tangent Perpendicularity',
        radius: 5,
        label: 'r = 5, (x - h)² + (y - k)² = 25'
      },
      caption: { en: 'Completing the square on x² + y² + Dx + Ey + F = 0 reveals the center (h, k) and radius r; any tangent line is perpendicular to the radius at the point of tangency.', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>The equation of a circle in the \\( xy \\)-plane is \\( x^2 + y^2 - 10x + 6y - 15 = 0 \\). What is the length of the diameter of the circle?</p>', ar: null },
      solution: { en: '<p>Complete the square for both \\( x \\) and \\( y \\):</p>\\[ (x^2 - 10x + 25) + (y^2 + 6y + 9) = 15 + 25 + 9 = 49. \\]\\[ (x - 5)^2 + (y + 3)^2 = 7^2. \\]<p>The radius is \\( r = 7 \\), so the diameter is \\( 2r = 14 \\).</p>', ar: null }
    }
  ],
  'sat-functions': [
    {
      kind: 'figure',
      figure: {
        type: 'fn',
        title: 'Horizontal & Vertical Function Transformations: g(x) = f(x - 2) + 3',
        xrange: [-3, 6], yrange: [-2, 7],
        fns: [
          { fn: 'x*x', color: 'var(--fig-indigo-2)', label: 'f(x) = x²' },
          { fn: '(x-2)*(x-2) + 3', color: 'var(--fig-amber)', label: 'g(x) = f(x - 2) + 3' }
        ],
        points: [{ x: 0, y: 0, label: 'Origin (0, 0)' }, { x: 2, y: 3, label: 'Shifted Vertex (2, 3)' }]
      },
      caption: { en: 'Replacing x with (x - 2) shifts the graph 2 units right, while adding 3 outside the function shifts the graph 3 units up.', ar: null }
    },
    {
      kind: 'callout',
      style: 'example',
      label: { en: 'Level 4 (Synthesis) — Interpreting y-Intercept of Shifted Rational/Exponential Functions', ar: null },
      body: { en: '<p><strong>Problem:</strong> The function \\( f(x) = 3^x + 4 \\) is translated 2 units to the left and 5 units down to form \\( g(x) \\). What is the \\( y \\)-intercept of \\( y = g(x) \\)?</p><p><strong>Solution:</strong> Translating 2 units left replaces \\( x \\) with \\( x + 2 \\), and 5 units down subtracts 5:</p>\\[ g(x) = f(x + 2) - 5 = 3^{x+2} + 4 - 5 = 3^{x+2} - 1. \\]<p>Evaluate at \\( x = 0 \\): \\( g(0) = 3^2 - 1 = 8 \\), so the \\( y \\)-intercept is \\( (0, 8) \\).</p>', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>If \\( f(x - 3) = 4x + 5 \\) for all real numbers \\( x \\), what is the value of \\( f(2) \\)?</p>', ar: null },
      solution: { en: '<p>To evaluate \\( f(2) \\), set the input expression \\( x - 3 \\) equal to \\( 2 \\):</p>\\[ x - 3 = 2 \\implies x = 5. \\]<p>Substitute \\( x = 5 \\) into the right-hand side:</p>\\[ f(2) = 4(5) + 5 = 25. \\]', ar: null }
    }
  ],
  'sat-stats': [
    {
      kind: 'figure',
      figure: {
        type: 'box_plot',
        title: 'Comparing Two Distributions via Boxplots (Median & IQR)',
        min: 12, q1: 24, median: 32, q3: 44, max: 58,
        label: 'Dataset A: Median = 32, IQR = 20, Range = 46'
      },
      caption: { en: 'In a boxplot, the vertical line inside the box marks the median (50th percentile), the box width is the interquartile range IQR = Q₃ - Q₁, and the whiskers span from minimum to maximum.', ar: null }
    },
    {
      kind: 'callout',
      style: 'example',
      label: { en: 'Level 4 (Synthesis) — Effect of Linear Data Scaling on Standard Deviation', ar: null },
      body: { en: '<p><strong>Problem:</strong> Data set \\( X \\) has a mean of 40 and a standard deviation of 6. Data set \\( Y \\) is formed by multiplying every value in \\( X \\) by 3 and subtracting 10 (\\( Y = 3X - 10 \\)). What are the mean and standard deviation of \\( Y \\)?</p><p><strong>Solution:</strong> Mean shifts and scales: \\( \\mu_Y = 3(40) - 10 = 110 \\). Standard deviation measures spread, so adding/subtracting 10 has <strong>zero effect</strong> on it; only multiplying by \\( |3| \\) scales it: \\( \\sigma_Y = 3 \\times 6 = 18 \\).</p>', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>A random sample of 400 registered voters in a city of 50,000 voters found that 55% support a transit bond, with an associated margin of error of 4.8% at the 95% confidence level. If a second survey uses a random sample of 1,600 registered voters from the same city, what will be the new margin of error?</p>', ar: null },
      solution: { en: '<p>Margin of error is inversely proportional to \\( \\sqrt{n} \\). Multiplying the sample size by 4 (from 400 to 1,600) divides the margin of error by \\( \\sqrt{4} = 2 \\):</p>\\[ \\text{New Margin of Error} = \\frac{4.8\\%}{2} = 2.4\\%. \\]', ar: null }
    }
  ],
  'sat-condprob': [
    {
      kind: 'figure',
      figure: {
        type: 'bar',
        title: 'Two-Way Table Breakdown: Grade Level vs. Foreign Language Choice',
        labels: ['10th Spanish', '10th French', '11th Spanish', '11th French'],
        values: [48, 32, 54, 66]
      },
      caption: { en: 'Conditional probability restricts the denominator strictly to the specified subgroup (e.g., only 11th graders: 54 + 66 = 120).', ar: null }
    },
    {
      kind: 'callout',
      style: 'example',
      label: { en: 'Level 4 (Synthesis) — Testing Independence in Two-Way Tables', ar: null },
      body: { en: '<p><strong>Problem:</strong> In a clinic study, 60 patients received Treatment A and 40 received Treatment B. If 45 of Treatment A recovered and \\( k \\) of Treatment B recovered, for what value of \\( k \\) is recovery independent of treatment?</p><p><strong>Solution:</strong> Independence requires the conditional recovery rate in both groups to match: \\[ \\frac{45}{60} = \\frac{k}{40} \\implies 0.75 = \\frac{k}{40} \\implies k = 30. \\]</p>', ar: null }
    },
    {
      kind: 'practiceProblem',
      question: { en: '<span class="lvl a" style="display:inline-block;margin-bottom:8px">Level 4 · Synthesis</span><p>A quality-control inspector tests 300 microchips from Factory X and 200 microchips from Factory Y. Exactly 4% of the chips from Factory X and 9% of the chips from Factory Y are defective. If one defective chip is selected at random from all the defective chips found, what is the probability that it came from Factory Y?</p>', ar: null },
      solution: { en: '<p>Calculate the exact number of defective chips from each factory:</p>\\[ \\text{Defective X} = 0.04 \\times 300 = 12, \\quad \\text{Defective Y} = 0.09 \\times 200 = 18. \\]<p>Total defective chips \\( = 12 + 18 = 30 \\). Therefore:</p>\\[ P(\\text{Factory Y} \\mid \\text{Defective}) = \\frac{18}{30} = \\frac{3}{5} = 0.60. \\]', ar: null }
    }
  ]
};

const files = fs.readdirSync(SAT_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_')).sort();

for (const file of files) {
  const fullPath = path.join(SAT_DIR, file);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const lessonId = data.id;
  const blocks = data.content.blocks || [];

  // 1. Add explorer if missing
  const hasExplorer = blocks.some(b => b.kind === 'explorer');
  if (!hasExplorer && EXPLORERS_BY_LESSON[lessonId]) {
    // Insert explorer right after the first cards or figure block
    const insertIdx = Math.min(blocks.length, 3);
    blocks.splice(insertIdx, 0, EXPLORERS_BY_LESSON[lessonId]);
  }

  // 2. Append extra figures, synthesis worked examples, and practice problems if not already added
  const extra = EXTRA_BLOCKS_BY_LESSON[lessonId] || [];
  for (const eb of extra) {
    const alreadyExists = blocks.some(b => JSON.stringify(b).includes(
      (eb.figure && eb.figure.title) || (eb.label && eb.label.en) || (eb.question && eb.question.en.slice(-40))
    ));
    if (!alreadyExists) {
      blocks.push(eb);
    }
  }

  data.content.blocks = blocks;
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Upgraded ${file}: ${blocks.length} blocks`);
}
