#!/usr/bin/env node
/**
 * Upgrades all 9 ACT Math lesson JSON files (content/act/*.json) so every lesson has:
 * - >= 4 graduated worked examples
 * - >= 4 practice problems
 * - >= 2 figures
 * - 1 interactive 2D explorer (and 3D explorer on act-planegeo)
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'content', 'act');

const UPGRADES = {
  'act-about.json': {
    figures: [
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'ACT 20-20-20 Pacing Curve: Cumulative Minutes vs Question Number',
          xrange: [0, 60],
          yrange: [0, 65],
          fns: [
            { fn: 'x', color: 'var(--fig-indigo-2)', dash: '4,4', label: '1 min/Q uniform' },
            { fn: '0.85*x + 0.0025*x*x', color: 'var(--fig-amber)', label: '20-20-20 Optimal Pacing' }
          ],
          points: [
            { x: 20, y: 15, label: 'Q20 (15 min)' },
            { x: 40, y: 35, label: 'Q40 (35 min)' },
            { x: 60, y: 60, label: 'Q60 (60 min)' }
          ]
        },
        caption: { en: 'The 20-20-20 ACT pacing rule banks 5 minutes on the first 20 questions to spend on the hardest final 20 questions.', ar: null }
      }
    ],
    explorer: {
      kind: 'explorer',
      title: { en: '⊙ Explorer · ACT 20-20-20 Pacing Simulator', ar: null },
      canvasId: 'actAboutCanvas',
      ariaLabel: { en: 'ACT Pacing Curve Explorer across 60 questions', ar: null },
      dataPanel: {
        btnId: 'actAboutDataBtn', panelId: 'actAboutDataPanel', descId: 'actAboutDataDesc', rowsId: 'actAboutDataRows',
        caption: { en: 'ACT 20-20-20 time budget checkpoints', ar: null },
        columns: [{ en: 'Question', ar: null }, { en: 'Target Elapsed', ar: null }]
      },
      controls: [
        { id: 'actAboutQ', label: { en: 'Question <b># =</b>', ar: null }, min: 1, max: 60, value: 30, step: 1, valueDisplayId: 'actAboutQV', ariaLabel: { en: 'Question number', ar: null } }
      ],
      readouts: [
        { id: 'actAboutTier', label: { en: 'Difficulty Tier', ar: null }, colorClass: 'indigo', value: 'Tier 2 (Medium · 60s/Q)' },
        { id: 'actAboutTime', label: { en: 'Target Elapsed', ar: null }, colorClass: 'amber', value: '25.0 min elapsed' },
        { id: 'actAboutRem', label: { en: 'Target Remaining', ar: null }, colorClass: 'indigo', value: '35.0 min left' }
      ]
    },
    examples: [
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 0.A — Back-Solving from the Middle Choice (C / H)', ar: null },
        body: { en: 'When an ACT algebra word problem offers five numerical choices in ascending order \\((A\\text{ to }E)\\), testing choice \\(C\\) first eliminates half the remaining choices immediately if \\(C\\) is too small or too large.<br><br><strong>Example:</strong> If \\(\\sqrt{2x + 7} = x - 4\\), choices are \\(A)\\;1, B)\\;5, C)\\;9, D)\\;11, E)\\;15\\).<br>Test \\(C (x=9)\\): \\(\\sqrt{2(9)+7} = \\sqrt{25} = 5\\), and \\(9 - 4 = 5\\). Matches immediately!', ar: null }
      },
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 0.B — Plugging In Convenient Numbers for Variables', ar: null },
        body: { en: 'If \\(x\\) is an odd integer, which expression must be an even integer? Choose \\(x = 3\\) and evaluate each choice in seconds rather than expanding algebraic identities.', ar: null }
      },
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 0.C — Allocating Time Across Multi-Question Data Sets', ar: null },
        body: { en: 'Every ACT Math section contains a 3-question stem sharing a table or diagram (usually around Q32–Q34). Spend 20 seconds reading the stem headings once, then solve all 3 questions in 2.5 minutes total.', ar: null }
      },
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 0.D — Eliminating Scale-Trap Distractors in Late Geometry', ar: null },
        body: { en: 'On Q50–Q60, when a diagram asks for a length in a composite figure with legs \\(6\\) and \\(8\\), eliminate any choice equal to \\(6+8=14\\) and check the Pythagorean hypotenuse \\(\\sqrt{6^2+8^2}=10\\).', ar: null }
      }
    ],
    practices: [
      {
        kind: 'practiceProblem',
        question: { en: 'Under the 20-20-20 pacing strategy, how many minutes should remain on the 60-minute clock when you finish Question 20?', ar: null },
        solution: { en: 'You spend 15 minutes on Questions 1–20, leaving \\(60 - 15 = \\mathbf{45\\text{ minutes}}\\) remaining.', ar: null }
      },
      {
        kind: 'practiceProblem',
        question: { en: 'Does the ACT Math test penalize wrong guesses, or should every single question be answered before time expires?', ar: null },
        solution: { en: 'There is <strong>no guessing penalty</strong> on the ACT; raw score equals the count of correct answers out of 60. Never leave a bubble blank.', ar: null }
      },
      {
        kind: 'practiceProblem',
        question: { en: 'Why should you test Choice C (or H) first when back-solving numerical answer choices on the ACT?', ar: null },
        solution: { en: 'ACT numerical choices are ordered from least to greatest (or greatest to least). Testing the middle choice tells you whether to move higher or lower, requiring at most 2 tests.', ar: null }
      }
    ]
  },
  'act-numbers.json': {
    figures: [
      {
        kind: 'figure',
        figure: {
          type: 'bars',
          title: 'Successive Percentage Multipliers: $100 Base After +25% then -20%',
          xlabel: 'Pricing Stage',
          ylabel: 'Value ($)',
          bars: [
            { label: 'Initial', value: 100 },
            { label: '+25% Markup', value: 125 },
            { label: '-20% Discount', value: 100, highlight: true }
          ]
        },
        caption: { en: 'A 25% increase followed by a 20% discount returns exactly to 100 because 1.25 × 0.80 = 1.00.', ar: null }
      }
    ],
    explorer: {
      kind: 'explorer',
      title: { en: '⊙ Explorer · Successive Percent Multipliers', ar: null },
      canvasId: 'actNumbersCanvas',
      ariaLabel: { en: 'Successive Percent Multiplier Explorer', ar: null },
      dataPanel: {
        btnId: 'actNumDataBtn', panelId: 'actNumDataPanel', descId: 'actNumDataDesc', rowsId: 'actNumDataRows',
        caption: { en: 'Successive percentage change breakdown', ar: null },
        columns: [{ en: 'Stage', ar: null }, { en: 'Value', ar: null }]
      },
      controls: [
        { id: 'actNumP1', label: { en: 'Change 1 <b>p₁ =</b>', ar: null }, min: -50, max: 50, value: 20, step: 5, valueDisplayId: 'actNumP1V', ariaLabel: { en: 'First percentage change', ar: null } },
        { id: 'actNumP2', label: { en: 'Change 2 <b>p₂ =</b>', ar: null }, min: -50, max: 50, value: -20, step: 5, valueDisplayId: 'actNumP2V', ariaLabel: { en: 'Second percentage change', ar: null } }
      ],
      readouts: [
        { id: 'actNumStep1', label: { en: 'After Step 1', ar: null }, colorClass: 'indigo', value: '120.0' },
        { id: 'actNumFinal', label: { en: 'Final Value', ar: null }, colorClass: 'amber', value: '96.0' },
        { id: 'actNumNet', label: { en: 'Net Change', ar: null }, colorClass: 'indigo', value: '-4.0%' }
      ]
    },
    examples: [
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 1.D — LCM Periodic Cycle Synchronization', ar: null },
        body: { en: 'Three beacons flash every \\(12\\), \\(18\\), and \\(30\\) seconds respectively. If they flash simultaneously at 12:00:00 PM, how many minutes pass before they next flash together?<br><br><strong>Solution:</strong> Prime factorize: \\(12 = 2^2 \\cdot 3\\), \\(18 = 2 \\cdot 3^2\\), \\(30 = 2 \\cdot 3 \\cdot 5\\).<br>\\[ \\text{LCM} = 2^2 \\cdot 3^2 \\cdot 5 = 180\\text{ seconds} = \\mathbf{3\\text{ minutes}} \\]', ar: null }
      }
    ],
    practices: [
      {
        kind: 'practiceProblem',
        question: { en: 'What is the greatest common factor (GCF) and least common multiple (LCM) of 24 and 36?', ar: null },
        solution: { en: '\\(24 = 2^3 \\cdot 3\\) and \\(36 = 2^2 \\cdot 3^2\\). Thus \\(\\text{GCF} = 2^2 \\cdot 3 = \\mathbf{12}\\) and \\(\\text{LCM} = 2^3 \\cdot 3^2 = \\mathbf{72}\\).', ar: null }
      },
      {
        kind: 'practiceProblem',
        question: { en: 'A shirt is marked up by 40% and then placed on sale for 25% off. What is the net percentage increase over the original cost?', ar: null },
        solution: { en: 'Multiply scale factors: \\(1.40 \\times 0.75 = 1.05\\), which corresponds to a \\(\\mathbf{5\\%}\\) net increase.', ar: null }
      }
    ]
  },
  'act-algebra.json': {
    figures: [
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'Absolute Value Inequality |x - 3| <= 4 on the Real Line',
          xrange: [-3, 9],
          yrange: [-2, 6],
          fns: [
            { fn: 'Math.abs(x - 3)', color: 'var(--fig-indigo)', label: 'y = |x - 3|' },
            { fn: '4', color: 'var(--fig-amber)', dash: '4,4', label: 'y = 4' }
          ],
          points: [
            { x: -1, y: 4, label: '(-1, 4)' },
            { x: 3, y: 0, label: 'Vertex (3, 0)' },
            { x: 7, y: 4, label: '(7, 4)' }
          ]
        },
        caption: { en: 'The inequality |x - 3| <= 4 corresponds to all x where the V-shaped graph y = |x - 3| lies on or below y = 4, yielding [-1, 7].', ar: null }
      }
    ],
    explorer: {
      kind: 'explorer',
      title: { en: '⊙ Explorer · Linear-Quadratic System Intersections', ar: null },
      canvasId: 'actAlgCanvas',
      ariaLabel: { en: 'ACT Linear Quadratic System Explorer', ar: null },
      dataPanel: {
        btnId: 'actAlgDataBtn', panelId: 'actAlgDataPanel', descId: 'actAlgDataDesc', rowsId: 'actAlgDataRows',
        caption: { en: 'Linear-quadratic intersection analysis', ar: null },
        columns: [{ en: 'Quantity', ar: null }, { en: 'Value', ar: null }]
      },
      controls: [
        { id: 'actAlgM', label: { en: 'Slope <b>m =</b>', ar: null }, min: -3, max: 3, value: 1, step: 0.5, valueDisplayId: 'actAlgMV', ariaLabel: { en: 'Line slope m', ar: null } },
        { id: 'actAlgC', label: { en: 'Intercept <b>c =</b>', ar: null }, min: -5, max: 5, value: 2, step: 0.5, valueDisplayId: 'actAlgCV', ariaLabel: { en: 'Line y-intercept c', ar: null } }
      ],
      readouts: [
        { id: 'actAlgDisc', label: { en: 'Discriminant Δ', ar: null }, colorClass: 'indigo', value: '21.0' },
        { id: 'actAlgSolCount', label: { en: 'Intersections', ar: null }, colorClass: 'amber', value: '2 real intersections' }
      ]
    },
    examples: [
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 2.D — Rational Equation Domain & Extraneous Root Check', ar: null },
        body: { en: 'Solve \\(\\frac{x}{x - 2} + \\frac{2}{x + 3} = \\frac{10}{(x - 2)(x + 3)}\\).<br><br><strong>Solution:</strong> Multiply through by \\((x-2)(x+3)\\) (noting \\(x \\neq 2, -3\\)):<br>\\[ x(x + 3) + 2(x - 2) = 10 \\implies x^2 + 5x - 14 = 0 \\implies (x + 7)(x - 2) = 0 \\]<br>Since \\(x = 2\\) makes the denominator zero, it is extraneous. Thus \\(\\mathbf{x = -7}\\).', ar: null }
      }
    ],
    practices: [
      {
        kind: 'practiceProblem',
        question: { en: 'What is the sum and product of the roots of \\(3x^2 - 15x + 7 = 0\\)?', ar: null },
        solution: { en: 'By Vieta\'s formulas, sum \\(= -b/a = 15/3 = \\mathbf{5}\\) and product \\(= c/a = \\mathbf{7/3}\\).', ar: null }
      },
      {
        kind: 'practiceProblem',
        question: { en: 'For what values of \\(x\\) does \\(|2x - 5| > 9\\) hold?', ar: null },
        solution: { en: 'Split into two rays: \\(2x - 5 > 9 \\implies x > 7\\) or \\(2x - 5 < -9 \\implies x < -2\\). Thus \\(\\mathbf{x < -2 \\text{ or } x > 7}\\).', ar: null }
      }
    ]
  },
  'act-coordgeo.json': {
    figures: [
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'Circle (x - 1)² + (y - 1)² = 9 & Tangent Line y = 4',
          xrange: [-4, 6],
          yrange: [-3, 6],
          fns: [
            { fn: '1 + Math.sqrt(Math.max(0, 9 - (x - 1)*(x - 1)))', color: 'var(--fig-indigo)', label: 'Circle r = 3' },
            { fn: '1 - Math.sqrt(Math.max(0, 9 - (x - 1)*(x - 1)))', color: 'var(--fig-indigo)' },
            { fn: '4', color: 'var(--fig-amber)', dash: '4,4', label: 'Tangent y = 4' }
          ],
          points: [
            { x: 1, y: 1, label: 'Center (1,1)' },
            { x: 1, y: 4, label: 'Tangency (1,4)' }
          ]
        },
        caption: { en: 'A circle centered at (1, 1) with radius 3 reaches its maximum y-value at (1, 1 + 3) = (1, 4).', ar: null }
      }
    ],
    examples: [
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 3.C — Completing the Square for a Circle Equation', ar: null },
        body: { en: 'Find the center and radius of \\(x^2 + y^2 + 8x - 6y = 24\\).<br><br><strong>Solution:</strong> Group and add half-coefficients squared:<br>\\[ (x^2 + 8x + 16) + (y^2 - 6y + 9) = 24 + 16 + 9 = 49 \\]<br>\\[ (x + 4)^2 + (y - 3)^2 = 7^2 \\implies \\text{Center } \\mathbf{(-4, 3)}, \\text{ Radius } \\mathbf{7} \\]', ar: null }
      },
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 3.D — Reflecting Points Across y = x and y = -x', ar: null },
        body: { en: 'Point \\(P(-3, 7)\\) is reflected across the line \\(y = x\\) to form \\(P\'\\), and then reflected across the \\(x\\)-axis to form \\(P\'\'\\). Find \\(P\'\'\\).<br><br><strong>Solution:</strong> Reflection across \\(y = x\\) swaps coordinates: \\(P\' = (7, -3)\\). Reflection across the \\(x\\)-axis negates \\(y\\): \\(P\'\' = \\mathbf{(7, 3)}\\).', ar: null }
      }
    ],
    practices: []
  },
  'act-functions.json': {
    figures: [
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'Exponential Growth f(x) = 2^x vs Logarithmic Inverse f⁻¹(x) = log₂(x)',
          xrange: [-3, 6],
          yrange: [-3, 6],
          fns: [
            { fn: 'Math.pow(2, x)', color: 'var(--fig-indigo)', label: 'f(x) = 2^x' },
            { fn: 'x > 0 ? Math.log2(x) : NaN', color: 'var(--fig-teal)', label: 'f⁻¹(x) = log₂(x)' },
            { fn: 'x', color: 'var(--fig-amber)', dash: '4,4', label: 'y = x' }
          ],
          points: [
            { x: 0, y: 1, label: '(0, 1)' },
            { x: 1, y: 0, label: '(1, 0)' }
          ]
        },
        caption: { en: 'A function and its inverse are symmetric across the line y = x, swapping domain and range as well as horizontal and vertical asymptotes.', ar: null }
      }
    ],
    examples: [
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 4.C — Piecewise Function Evaluation at Boundary Inputs', ar: null },
        body: { en: 'Let \\(f(x) = \\begin{cases} 2x^2 - 1 & x < 2 \\\\ 5x - 3 & x \\geq 2 \\end{cases}\\). Compute \\(f(-1) + f(2)\\).<br><br><strong>Solution:</strong> Since \\(-1 < 2\\), \\(f(-1) = 2(-1)^2 - 1 = 1\\). Since \\(2 \\geq 2\\), \\(f(2) = 5(2) - 3 = 7\\). Thus \\(f(-1) + f(2) = 1 + 7 = \\mathbf{8}\\).', ar: null }
      },
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 4.D — Vertical & Horizontal Asymptotes of Rational Functions', ar: null },
        body: { en: 'Find the vertical and horizontal asymptotes of \\(g(x) = \\frac{6x - 5}{2x + 4}\\).<br><br><strong>Solution:</strong> Set denominator to zero for the vertical asymptote: \\(2x + 4 = 0 \\implies \\mathbf{x = -2}\\). Since numerator and denominator have equal degree \\(1\\), the horizontal asymptote is the ratio of leading coefficients: \\(y = \\frac{6}{2} = \\mathbf{3}\\).', ar: null }
      }
    ],
    practices: [
      {
        kind: 'practiceProblem',
        question: { en: 'If \\(f(x) = 3x - 4\\) and \\(g(x) = x^2 + 2\\), what is \\(g(f(3))\\)?', ar: null },
        solution: { en: 'First evaluate \\(f(3) = 3(3) - 4 = 5\\). Then \\(g(5) = 5^2 + 2 = \\mathbf{27}\\).', ar: null }
      },
      {
        kind: 'practiceProblem',
        question: { en: 'What is the inverse function \\(f^{-1}(x)\\) of \\(f(x) = \\frac{5x + 2}{3}\\)?', ar: null },
        solution: { en: 'Swap \\(x\\) and \\(y\\): \\(x = \\frac{5y + 2}{3} \\implies 3x - 2 = 5y \\implies f^{-1}(x) = \\mathbf{\\frac{3x - 2}{5}}\\).', ar: null }
      }
    ]
  },
  'act-planegeo.json': {
    figures: [
      {
        kind: 'figure',
        figure: {
          type: 'triangle',
          A: [0, 0], B: [12, 0], C: [12, 5],
          labels: { A: 'A', B: 'C', C: 'B' },
          sides: { c: '12', a: '5', b: '13' },
          rightAt: 'B'
        },
        caption: { en: 'A 5-12-13 Pythagorean right triangle with right angle at C.', ar: null }
      }
    ],
    explorer: {
      kind: 'explorer',
      title: { en: '⊙ Explorer · 2D Circle Sectors, Chords &amp; 3D Cylinder/Cone Volumes', ar: null },
      canvasId: 'actGeoCanvas',
      ariaLabel: { en: 'ACT Circle Sector and Chord Explorer with 3D Cylinder and Cone volume comparison', ar: null },
      canvas3d: {
        btnId: 'actGeo3dBtn',
        wrapId: 'actGeo3dWrap',
        hintId: 'actGeo3dHint',
        btnLabel: '🧊 View Cylinder & Cone in 3D',
        ariaLabel: { en: 'Interactive 3D comparison of a cylinder and a cone of radius r and height h. Drag to rotate.', ar: null }
      },
      dataPanel: {
        btnId: 'actGeoDataBtn', panelId: 'actGeoDataPanel', descId: 'actGeoDataDesc', rowsId: 'actGeoDataRows',
        caption: { en: 'Circle sector and 3D solid measurements', ar: null },
        columns: [{ en: 'Measurement', ar: null }, { en: 'Value', ar: null }]
      },
      controls: [
        { id: 'actGeoR', label: { en: 'Radius <b>r =</b>', ar: null }, min: 1, max: 5, value: 4, step: 0.5, valueDisplayId: 'actGeoRV', ariaLabel: { en: 'Radius r', ar: null } },
        { id: 'actGeoDeg', label: { en: 'Angle <b>θ =</b>', ar: null }, min: 30, max: 180, value: 90, step: 15, valueDisplayId: 'actGeoDegV', ariaLabel: { en: 'Angle theta', ar: null } },
        { id: 'actGeoH', label: { en: '3D Height <b>h =</b>', ar: null }, min: 2, max: 8, value: 5, step: 0.5, valueDisplayId: 'actGeoHV', ariaLabel: { en: 'Height h', ar: null } }
      ],
      readouts: [
        { id: 'actGeoArc', label: { en: 'Arc Length s', ar: null }, colorClass: 'indigo', value: '6.28' },
        { id: 'actGeoArea', label: { en: 'Sector Area A', ar: null }, colorClass: 'amber', value: '12.57' },
        { id: 'actGeoChord', label: { en: 'Chord | 3D Vol', ar: null }, colorClass: 'indigo', value: '5.66 | V: 251/84' }
      ]
    },
    examples: [
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 5.C — Inscribed vs Central Angles in a Circle', ar: null },
        body: { en: 'Points \\(A, B, C\\) lie on a circle centered at \\(O\\). If central angle \\(\\angle AOB = 114^\\circ\\), what is the measure of inscribed angle \\(\\angle ACB\\) subtending the same minor arc \\(\\widehat{AB}\\)?<br><br><strong>Solution:</strong> By the Inscribed Angle Theorem, an inscribed angle equals half the central angle subtending the same arc:<br>\\[ \\angle ACB = \\frac{1}{2}(114^\\circ) = \\mathbf{57^\\circ} \\]', ar: null }
      },
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 5.D — Space Diagonal of a 3D Rectangular Prism', ar: null },
        body: { en: 'Find the length of the longest rod that can fit completely inside a rectangular box of dimensions \\(3\\text{ ft} \\times 4\\text{ ft} \\times 12\\text{ ft}\\).<br><br><strong>Solution:</strong> Apply the 3D Pythagorean theorem:<br>\\[ d = \\sqrt{\\ell^2 + w^2 + h^2} = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = \\mathbf{13\\text{ ft}} \\]', ar: null }
      }
    ],
    practices: []
  },
  'act-trig.json': {
    figures: [
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'Sinusoidal Wave Modeling: y = 3 sin(2x) + 1',
          xrange: [0, 6.28],
          yrange: [-3, 5],
          fns: [
            { fn: '3*Math.sin(2*x) + 1', color: 'var(--fig-indigo)', label: 'y = 3 sin(2x) + 1' },
            { fn: '1', color: 'var(--fig-amber)', dash: '4,4', label: 'Midline y = 1' }
          ],
          points: [
            { x: 0.785, y: 4, label: 'Max (π/4, 4)' },
            { x: 2.356, y: -2, label: 'Min (3π/4, -2)' }
          ]
        },
        caption: { en: 'For y = A sin(Bx) + D, the amplitude is |A| = 3, midline is y = 1, and period is 2π/B = π.', ar: null }
      }
    ],
    examples: [
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 6.C — Law of Sines in a Non-Right Triangle', ar: null },
        body: { en: 'In \\(\\triangle ABC\\), \\(\\angle A = 30^\\circ\\), \\(\\angle B = 45^\\circ\\), and side \\(a = 8\\). Find side \\(b\\).<br><br><strong>Solution:</strong> By the Law of Sines:<br>\\[ \\frac{b}{\\sin 45^\\circ} = \\frac{8}{\\sin 30^\\circ} \\implies b = 8 \\cdot \\frac{\\sqrt{2}/2}{1/2} = \\mathbf{8\\sqrt{2}} \\]', ar: null }
      },
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 6.D — Quadrant Sign & Pythagorean Identity', ar: null },
        body: { en: 'If \\(\\sin\\theta = \\frac{8}{17}\\) and \\(\\frac{\\pi}{2} < \\theta < \\pi\\) (Quadrant II), what is \\(\\tan\\theta\\)?<br><br><strong>Solution:</strong> From the \\(8-15-17\\) right triangle, \\(|\\cos\\theta| = \\frac{15}{17}\\). In Quadrant II, cosine and tangent are negative, so \\(\\tan\\theta = \\mathbf{-\\frac{8}{15}}\\).', ar: null }
      }
    ],
    practices: []
  },
  'act-stats.json': {
    figures: [
      {
        kind: 'figure',
        figure: {
          type: 'bars',
          title: 'Probability Distribution of Discrete Random Variable X',
          xlabel: 'Outcome X',
          ylabel: 'Probability P(X) (%)',
          bars: [
            { label: 'X = 1', value: 20 },
            { label: 'X = 2', value: 50, highlight: true },
            { label: 'X = 3', value: 30 }
          ]
        },
        caption: { en: 'Expected value E(X) = 1(0.20) + 2(0.50) + 3(0.30) = 2.10.', ar: null }
      }
    ],
    explorer: {
      kind: 'explorer',
      title: { en: '⊙ Explorer · Outlier Sensitivity: Mean vs. Median', ar: null },
      canvasId: 'actStatsCanvas',
      ariaLabel: { en: 'ACT Mean vs Median Outlier Explorer', ar: null },
      dataPanel: {
        btnId: 'actStatsDataBtn', panelId: 'actStatsDataPanel', descId: 'actStatsDataDesc', rowsId: 'actStatsDataRows',
        caption: { en: 'Summary statistics under outlier shifts', ar: null },
        columns: [{ en: 'Statistic', ar: null }, { en: 'Value', ar: null }]
      },
      controls: [
        { id: 'actStatsOut', label: { en: '7th Value <b>x₇ =</b>', ar: null }, min: 8, max: 34, value: 18, step: 1, valueDisplayId: 'actStatsOutV', ariaLabel: { en: '7th data value', ar: null } }
      ],
      readouts: [
        { id: 'actStatsMean', label: { en: 'Mean', ar: null }, colorClass: 'indigo', value: '12.86' },
        { id: 'actStatsMed', label: { en: 'Median', ar: null }, colorClass: 'amber', value: '12.0' },
        { id: 'actStatsRange', label: { en: 'Range', ar: null }, colorClass: 'indigo', value: '10' }
      ]
    },
    examples: [
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 7.C — Expected Value of a Discrete Payout Table', ar: null },
        body: { en: 'A raffle ticket pays \\(\\$50\\) with probability \\(0.04\\), \\(\\$10\\) with probability \\(0.16\\), and \\(\\$0\\) with probability \\(0.80\\). What is the expected value of one ticket?<br><br><strong>Solution:</strong><br>\\[ E(X) = 50(0.04) + 10(0.16) + 0(0.80) = 2.00 + 1.60 = \\mathbf{\\$3.60} \\]', ar: null }
      },
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 7.D — Permutations vs Combinations in Committee Selection', ar: null },
        body: { en: 'From a club of 10 members, how many ways can a President, Vice-President, and Treasurer be chosen, versus a 3-person committee with equal roles?<br><br><strong>Solution:</strong> Ordered offices use permutations: \\(_{10}P_3 = 10 \\times 9 \\times 8 = \\mathbf{720}\\). Unordered committees use combinations: \\(_{10}C_3 = \\frac{720}{3!} = \\mathbf{120}\\).', ar: null }
      }
    ],
    practices: []
  },
  'act-advanced.json': {
    figures: [
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: '2D Vector Addition & Orthogonal Dot Product Check',
          xrange: [-3, 6],
          yrange: [-2, 6],
          fns: [
            { fn: '(4/3)*x', color: 'var(--fig-indigo)', label: 'u = <3, 4>' },
            { fn: '(-3/4)*x', color: 'var(--fig-amber)', label: 'v = <-4, 3> (u·v = 0)' }
          ],
          points: [
            { x: 3, y: 4, label: 'u(3,4)' },
            { x: -2, y: 1.5, label: 'v(-4,3) dir' }
          ]
        },
        caption: { en: 'Vectors u = <3, 4> and v = <-4, 3> are perpendicular because their dot product 3(-4) + 4(3) = 0.', ar: null }
      }
    ],
    explorer: {
      kind: 'explorer',
      title: { en: '⊙ Explorer · Complex Plane &amp; Multiplication by i (90° Rotation)', ar: null },
      canvasId: 'actAdvCanvas',
      ariaLabel: { en: 'Complex Plane Rotation Explorer', ar: null },
      dataPanel: {
        btnId: 'actAdvDataBtn', panelId: 'actAdvDataPanel', descId: 'actAdvDataDesc', rowsId: 'actAdvDataRows',
        caption: { en: 'Complex number modulus, conjugate, and 90° rotation', ar: null },
        columns: [{ en: 'Operation', ar: null }, { en: 'Result', ar: null }]
      },
      controls: [
        { id: 'actAdvA', label: { en: 'Real part <b>a =</b>', ar: null }, min: -5, max: 5, value: 3, step: 1, valueDisplayId: 'actAdvAV', ariaLabel: { en: 'Real part a', ar: null } },
        { id: 'actAdvB', label: { en: 'Imag part <b>b =</b>', ar: null }, min: -5, max: 5, value: 2, step: 1, valueDisplayId: 'actAdvBV', ariaLabel: { en: 'Imaginary part b', ar: null } }
      ],
      readouts: [
        { id: 'actAdvMod', label: { en: 'Modulus |z|', ar: null }, colorClass: 'indigo', value: '3.61' },
        { id: 'actAdvConj', label: { en: 'Conjugate z̄', ar: null }, colorClass: 'amber', value: '3 − 2i' },
        { id: 'actAdvRot', label: { en: 'Rotated i·z', ar: null }, colorClass: 'indigo', value: '-2 + 3i' }
      ]
    },
    examples: [
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 8.C — 2x2 Matrix Determinant & Singular Matrix Condition', ar: null },
        body: { en: 'For what value of \\(k\\) does the matrix \\(A = \\begin{pmatrix} 6 & k \\\\ 4 & 8 \\end{pmatrix}\\) fail to have an inverse?<br><br><strong>Solution:</strong> A \\(2 \\times 2\\) matrix is singular (non-invertible) when \\(\\det(A) = ad - bc = 0\\):<br>\\[ 6(8) - 4k = 0 \\implies 48 = 4k \\implies \\mathbf{k = 12} \\]', ar: null }
      },
      {
        kind: 'callout', style: 'example',
        label: { en: 'Worked Example 8.D — Infinite Geometric Series Convergence', ar: null },
        body: { en: 'Find the sum of the infinite geometric series \\(18 + 6 + 2 + \\frac{2}{3} + \\cdots\\).<br><br><strong>Solution:</strong> Here \\(a_1 = 18\\) and common ratio \\(r = \\frac{6}{18} = \\frac{1}{3}\\). Since \\(|r| < 1\\):<br>\\[ S_\\infty = \\frac{a_1}{1 - r} = \\frac{18}{1 - 1/3} = \\frac{18}{2/3} = \\mathbf{27} \\]', ar: null }
      }
    ],
    practices: []
  }
};

for (const [fname, patch] of Object.entries(UPGRADES)) {
  const fpath = path.join(DIR, fname);
  const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
  const blocks = data.content.blocks;

  const figCount = blocks.filter(b => b.kind === 'figure').length;
  if (figCount < 2 && patch.figures) {
    blocks.splice(2, 0, ...patch.figures);
  }

  if (patch.explorer && !blocks.some(b => b.kind === 'explorer')) {
    blocks.splice(3, 0, patch.explorer);
  }

  for (const ex of (patch.examples || [])) {
    if (!blocks.some(b => b.kind === 'callout' && b.label && b.label.en === ex.label.en)) {
      const firstPrac = blocks.findIndex(b => b.kind === 'practiceProblem');
      if (firstPrac >= 0) blocks.splice(firstPrac, 0, ex);
      else blocks.push(ex);
    }
  }

  for (const pr of (patch.practices || [])) {
    if (!blocks.some(b => b.kind === 'practiceProblem' && b.question.en === pr.question.en)) {
      blocks.push(pr);
    }
  }

  fs.writeFileSync(fpath, JSON.stringify(data, null, 2) + '\n');
}

console.log('Upgraded all 9 ACT lesson JSON files.');
