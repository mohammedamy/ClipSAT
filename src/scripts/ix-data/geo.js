/* Interactive Practice data for /geo/ - one entry per chapter section id.
   Shipped as public/js/ix/geo.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D['geo-foundations']=[
{t:'sr',ti:'Worked Example: Write a Converse Statement',steps:[
  'A conditional statement has the form "If P, then Q." Here take: "If a shape is a square, then it has four right angles." \\(P\\)="is a square", \\(Q\\)="has four right angles."',
  'The converse swaps P and Q: "If Q, then P."',
  'Converse: "If a shape has four right angles, then it is a square."',
  'Notice this converse is actually <em>false</em> (a rectangle has four right angles but isn\'t always a square) — a reminder that a converse isn\'t automatically true just because the original statement is.'
]},
{t:'qc',ti:'Quick Check: Geometric Reasoning',q:'What do we call a statement accepted as true without proof?',o:['Postulate','Theorem','Corollary','Converse'],a:0,ex:'A postulate (or axiom) is assumed true as a starting point; a theorem must be proved from postulates.'},
{t:'num',ti:'Find Complementary Angle',q:'Two angles are complementary. If one angle measures \\(38^{\\circ}\\), what is the measure of the other angle in degrees?',a:52,tol:0.001,h:'Complementary angles sum to 90 degrees.',sol:'90 - 38 = 52 degrees.'},
{t:'ord',ti:'Order the Steps: Linear Pair Algebraic Solution',q:'Arrange the steps to find angle measures for a linear pair with angles (4x + 12)° and (2x + 18)°:',items:[
  'Set the sum of the linear pair to 180°: (4x + 12) + (2x + 18) = 180',
  'Combine like terms: 6x + 30 = 180',
  'Subtract 30 from both sides: 6x = 150',
  'Divide by 6 to solve for x: x = 25',
  'Substitute x = 25 back to find the smaller angle: 2(25) + 18 = 68°'
],sol:'Linear pairs are supplementary (sum to 180°). Solving for x allows evaluating both individual angles.'},
{t:'cat',ti:'Classify Angle Pairs: Complementary vs. Supplementary',categories:['Complementary (Sum = 90°)','Supplementary (Sum = 180°)'],items:[
  {s:'35° and 55°',cat:0},
  {s:'42° and 48°',cat:0},
  {s:'110° and 70°',cat:1},
  {s:'135° and 45°',cat:1},
  {s:'Linear pair of adjacent angles on a line',cat:1}
],sol:'Angles summing to 90° are complementary; angles summing to 180° are supplementary.'}
];
D['geo-lines']=[
{t:'qc',ti:'Quick Check: Parallel Lines',q:'Co-interior angles between parallel lines sum to:',o:['90°','180°','270°','360°'],a:1,ex:'Supplementary angles — sum to \\(180°\\).'},
{t:'mt',ti:'Matching: Angle Relationships',p:[{l:'Alternate interior angles',r:'Equal: the Z shape'},{l:'Corresponding angles',r:'Equal: the F shape'},{l:'Co-interior (consecutive)',r:'Supplementary, sum 180°: the C shape'},{l:'Vertical angles',r:'Equal: opposite each other at an X'}]},
{t:'ord',ti:'Order the Steps: Solve for Transversal Angle',q:'Order the steps to find angle \\(x\\) when two parallel lines cut by a transversal have consecutive interior angles \\(2x + 10\\) and \\(3x + 20\\):',items:['Set up equation: (2x + 10) + (3x + 20) = 180','Combine like terms: 5x + 30 = 180','Subtract 30: 5x = 150','Divide by 5: x = 30'],sol:'Consecutive interior angles are supplementary, so their sum is 180°.'},
{t:'num',ti:'Calculate Alternate Interior Angle',q:'Two parallel lines are cut by a transversal. If one alternate interior angle measures \\(114^{\\circ}\\), what is the measure of the consecutive interior angle on the same side of the transversal in degrees?',a:66,tol:0.001,h:'Consecutive interior angles are supplementary to the alternate interior angle.',sol:'Consecutive interior angle = 180 - 114 = 66 degrees.'},
{t:'cat',ti:'Classify Transversal Angle Relationships',categories:['Congruent Angles (Equal Measure)','Supplementary Angles (Sum = 180°)'],items:[
  {s:'Alternate interior angles',cat:0},
  {s:'Corresponding angles',cat:0},
  {s:'Alternate exterior angles',cat:0},
  {s:'Consecutive interior angles (co-interior)',cat:1},
  {s:'Consecutive exterior angles',cat:1}
],sol:'When parallel lines are cut by a transversal, alternate and corresponding pairs are equal; consecutive pairs are supplementary.'}
];
D['geo-triangles']=[
{t:'mt',ti:'Matching: Triangle Congruence',p:[{l:'Side-Side-Side',r:'SSS'},{l:'Side-Angle-Side',r:'SAS'},{l:'Angle-Side-Angle',r:'ASA'},{l:'Angle-Angle-Side',r:'AAS'}]},
{t:'sr',ti:'Worked Example: Find the Missing Angle',steps:[
  'In \\(\\triangle ABC\\), \\(\\angle A=50°\\) and \\(\\angle B=70°\\). The angles of a triangle always sum to \\(180°\\).',
  'Set up the equation: \\(50°+70°+\\angle C=180°\\).',
  'Solve: \\(\\angle C=180°-120°=60°\\).'
]},
{t:'num',ti:'Find Missing Triangle Angle',q:'In \\(\\triangle PQR\\), \\(m\\angle P = 47^{\\circ}\\) and \\(m\\angle Q = 68^{\\circ}\\). Find the measure of \\(m\\angle R\\) in degrees:',a:65,tol:0.001,h:'The interior angles of a triangle sum to 180°.',sol:'180 - 47 - 68 = 65 degrees.'},
{t:'ord',ti:'Order the Steps: Exterior Angle Equation',q:'Arrange the steps to find angle A in △ABC with exterior angle 134° at C and remote interior angles A = (5x - 4)° and B = (3x + 10)°:',items:[
  'Apply Exterior Angle Theorem: (5x - 4) + (3x + 10) = 134',
  'Combine like terms: 8x + 6 = 134',
  'Subtract 6: 8x = 128',
  'Divide by 8: x = 16',
  'Substitute x = 16 into angle A: 5(16) - 4 = 76°'
],sol:'The measure of an exterior angle of a triangle equals the sum of its two remote interior angles.'},
{t:'cat',ti:'Classify Triangle Criteria: Valid Congruence vs. Invalid',categories:['Valid Triangle Congruence Theorem','Not Sufficient for Congruence'],items:[
  {s:'Side-Side-Side (SSS)',cat:0},
  {s:'Side-Angle-Side (SAS)',cat:0},
  {s:'Angle-Side-Angle (ASA)',cat:0},
  {s:'Angle-Angle-Angle (AAA, similarity only)',cat:1},
  {s:'Side-Side-Angle (SSA, ambiguous case)',cat:1}
],sol:'SSS, SAS, ASA, AAS, and HL prove congruence. AAA proves similarity only, and SSA is ambiguous.'}
];
D['geo-similarity']=[
{t:'sr',ti:'Worked Example: Similar Triangles — Find a Missing Side',steps:[
  'Triangles \\(ABC\\) and \\(DEF\\) are similar, with \\(AB=6\\), \\(DE=9\\), \\(BC=8\\). Corresponding sides are proportional: \\(\\dfrac{AB}{DE}=\\dfrac{BC}{EF}\\).',
  'Substitute known values: \\(\\dfrac{6}{9}=\\dfrac{8}{EF}\\).',
  'Cross-multiply: \\(6\\cdot EF=9\\cdot8=72\\).',
  'Solve: \\(EF=12\\).'
]},
{t:'qc',ti:'Quick Check: Similar vs Congruent',q:'If two triangles have all corresponding angles equal, they are:',o:['Similar','Congruent','Complementary','Perpendicular'],a:0,ex:'Equal angles alone guarantee similarity (AA), not necessarily equal size (congruence).'},
{t:'num',ti:'Similar Triangles Area Calculation',q:'Two similar triangles have side ratio \\(3 : 5\\). If the smaller triangle has an area of \\(36\\ \\text{cm}^2\\), what is the area of the larger triangle in \\(\\text{cm}^2\\)?',a:100,tol:0.001,h:'Areas scale by the square of the linear scale factor: (5/3)^2.',sol:'36 * (25/9) = 100 cm².'},
{t:'ord',ti:'Order the Steps: Perimeter from Similar Area Ratio',q:'Arrange the steps to find the perimeter of △T₂ (area 80 cm²) given similar △T₁ (area 45 cm², perimeter 27 cm):',items:[
  'Compute area ratio: Area(T₂) / Area(T₁) = 80 / 45 = 16 / 9',
  'Find linear scale factor k by taking square root: k = √(16/9) = 4/3',
  'Set up perimeter proportion: Perimeter(T₂) = k · Perimeter(T₁)',
  'Multiply: Perimeter(T₂) = (4/3) · 27',
  'Compute final perimeter: 36 cm'
],sol:'Linear dimensions scale by k, while areas scale by k².'},
{t:'cat',ti:'Classify Scaling of Geometric Measures with Scale Factor k',categories:['Scales by Factor k (Linear)','Scales by Factor k² (Area)'],items:[
  {s:'Perimeter of polygon',cat:0},
  {s:'Side length',cat:0},
  {s:'Altitude / height of triangle',cat:0},
  {s:'Area of triangle',cat:1},
  {s:'Surface area of similar shape',cat:1}
],sol:'Perimeters and lengths scale linearly by k; areas scale quadratically by k².'}
];
D['geo-right']=[
{t:'sb',ti:'Step Builder: Hypotenuse of right triangle, legs \\(5\\) and \\(12\\)',steps:[{l:'\\(c^2=5^2+12^2=\\)',a:'169',h:'\\(25+144=169\\)'},{l:'\\(c=\\sqrt{169}=\\)',a:'13',h:'\\(\\sqrt{169}=13\\)'}]},
{t:'sr',ti:'Worked Example: 30°-60°-90° Special Right Triangle',steps:[
  'In a 30°-60°-90° triangle, the sides are in the ratio \\(1 : \\sqrt{3} : 2\\).',
  'The hypotenuse is twice the shorter leg (opposite the 30° angle).',
  'If the shorter leg is 4, then the hypotenuse is \\(2\\times 4 = 8\\).',
  'The longer leg (opposite 60°) is \\(4\\sqrt{3}\\).'
]},
{t:'num',ti:'Special Right Triangle Leg',q:'In a \\(30^{\\circ}\\text{–}60^{\\circ}\\text{–}90^{\\circ}\\) right triangle, the hypotenuse has length \\(16\\). What is the length of the shorter leg (opposite 30°)?',a:8,tol:0.001,h:'In a 30-60-90 triangle, the hypotenuse is twice the shorter leg.',sol:'16 / 2 = 8.'},
{t:'ord',ti:'Order the Steps: Equilateral Triangle Altitude and Area',q:'Arrange the steps to find the altitude and area of an equilateral triangle with side length 12 cm:',items:[
  'Draw the altitude, splitting the base into two segments of length 6 cm',
  'Recognize the 30°-60°-90° right triangle with shorter leg 6 cm',
  'Calculate altitude (longer leg opposite 60°): h = 6√3 cm',
  'Apply area formula: Area = (1/2) · base · height = (1/2)(12)(6√3)',
  'Compute exact area: 36√3 cm²'
],sol:'The altitude of an equilateral triangle bisects the base and creates two 30-60-90 triangles.'},
{t:'cat',ti:'Classify Pythagorean Triples vs. Non-Triples',categories:['Valid Pythagorean Triple (Integer Right Triangle)','Not a Pythagorean Triple'],items:[
  {s:'3 - 4 - 5',cat:0},
  {s:'5 - 12 - 13',cat:0},
  {s:'8 - 15 - 17',cat:0},
  {s:'7 - 24 - 25',cat:0},
  {s:'4 - 5 - 6',cat:1},
  {s:'6 - 8 - 12',cat:1}
],sol:'Pythagorean triples satisfy a² + b² = c² with whole integers: 3-4-5, 5-12-13, 8-15-17, 7-24-25.'}
];
D['geo-quads']=[
{t:'sr',ti:'Worked Example: Sum of Interior Angles of a Hexagon',steps:[
  'Use the formula \\((n-2)\\times180°\\), where \\(n\\) is the number of sides.',
  'A hexagon has \\(n=6\\) sides.',
  'Substitute: \\((6-2)\\times180°=4\\times180°=720°\\).'
]},
{t:'qc',ti:'Quick Check: Quadrilateral Types',q:'A parallelogram with all sides equal and no right angles is a:',o:['Rhombus','Square','Rectangle','Trapezoid'],a:0,ex:'Equal sides define a rhombus; without right angles it isn\'t a square.'},
{t:'num',ti:'Regular Octagon Interior Angle',q:'What is the measure in degrees of each interior angle of a regular octagon (8-sided polygon)?',a:135,tol:0.001,h:'Exterior angle is 360 / 8 = 45°. Interior angle is 180 - 45°.',sol:'180 - 45 = 135 degrees.'},
{t:'ord',ti:'Order the Steps: Finding Number of Sides from Interior Angle',q:'Arrange the steps to find the number of sides of a regular polygon with interior angle 144°:',items:[
  'Find the exterior angle using the linear pair property: Exterior = 180° - 144° = 36°',
  'Recall the theorem: The sum of exterior angles of any convex polygon is 360°',
  'Set up the equation for regular polygon sides: n · 36° = 360°',
  'Divide to solve for n: n = 360° / 36°',
  'Conclude that the polygon has 10 sides (regular decagon)'
],sol:'Finding the exterior angle first simplifies finding the number of sides n = 360° / exterior.'},
{t:'cat',ti:'Classify Quadrilaterals: Always Perpendicular Diagonals',categories:['Diagonals Always Perpendicular (⊥)','Diagonals Not Necessarily Perpendicular'],items:[
  {s:'Rhombus',cat:0},
  {s:'Square',cat:0},
  {s:'Kite',cat:0},
  {s:'Rectangle (non-square)',cat:1},
  {s:'General Parallelogram',cat:1},
  {s:'Isosceles Trapezoid',cat:1}
],sol:'Rhombuses, squares, and kites always have mutually perpendicular diagonals.'}
];
D['geo-circles']=[
{t:'tf',ti:'True or False: Circle Theorems',items:[{s:'Inscribed angle = half the central angle on same arc',a:true,ex:'Inscribed Angle Theorem.'},{s:"Angle in a semicircle is 90°",a:true,ex:"Thales' Theorem."},{s:'Two tangents from an external point have different lengths',a:false,ex:'Equal tangent lengths from external point.'},{s:'Tangent is perpendicular to radius at contact point',a:true,ex:'Tangent-radius property.'}]},
{t:'sr',ti:'Worked Example: Arc Length of a Sector',steps:[
  'Find the arc length of a \\(60°\\) sector in a circle of radius \\(9\\). Arc length formula: \\(s=\\dfrac{\\theta}{360°}\\times2\\pi r\\).',
  'Substitute \\(\\theta=60°\\), \\(r=9\\): \\(s=\\dfrac{60}{360}\\times2\\pi(9)\\).',
  'Simplify: \\(s=\\dfrac16\\times18\\pi=3\\pi\\).'
]},
{t:'num',ti:'Inscribed Angle Measure',q:'An inscribed angle intercepts an arc of \\(74^{\\circ}\\). What is the measure of the inscribed angle in degrees?',a:37,tol:0.001,h:'An inscribed angle equals half its intercepted arc.',sol:'74 / 2 = 37 degrees.'},
{t:'ord',ti:'Order the Steps: Tangent Length from External Point',q:'Arrange the steps to find tangent length PA to a circle with radius 5 cm from external point P with PO = 13 cm:',items:[
  'Identify that radius OA is perpendicular to tangent PA at point of tangency A',
  'Recognize △PAO as a right triangle with right angle at vertex A',
  'Identify hypotenuse PO = 13 cm and leg OA = 5 cm',
  'Apply the Pythagorean theorem: PA² + 5² = 13² ⟹ PA² = 169 - 25 = 144',
  'Take square root to find tangent length: PA = 12 cm'
],sol:'Tangent segments from an external point form right triangles with the radius at the point of contact.'},
{t:'cat',ti:'Classify Angles in Circles by Vertex Location',categories:['Vertex on Circle (Inscribed / Tangent-Chord)','Vertex at Center (Central Angle)'],items:[
  {s:'Angle intercepting arc with measure equal to arc (m∠ = θ)',cat:1},
  {s:'Angle intercepting arc with measure equal to half arc (m∠ = θ / 2)',cat:0},
  {s:'Angle inscribed in a semicircle (always 90°)',cat:0},
  {s:'Central angle formed by two radii',cat:1}
],sol:'Central angles equal their intercepted arc; inscribed angles and tangent-chord angles equal half their intercepted arc.'}
];
D['geo-solids']=[
{t:'sr',ti:'Worked Example: Volume of a Cylinder',steps:[
  'Find the volume of a cylinder with radius \\(4\\) and height \\(10\\). Volume formula: \\(V=\\pi r^2h\\).',
  'Substitute \\(r=4\\), \\(h=10\\): \\(V=\\pi(4)^2(10)\\).',
  'Compute: \\(V=160\\pi\\).'
]},
{t:'qc',ti:'Quick Check: Surface Area',q:'Surface area of a cube with side length 5:',o:['150','125','100','25'],a:0,ex:'\\(SA=6s^2=6(5^2)=6(25)=150\\).'},
{t:'num',ti:'Cone Volume Factor',q:'A cylinder has a volume of \\(75\\pi\\ \\text{cm}^3\\). A cone has the exact same radius and height as the cylinder. What is the volume of the cone in \\(\\text{cm}^3\\) divided by \\(\\pi\\)?',a:25,tol:0.001,h:'A cone volume is 1/3 of the cylinder with identical dimensions.',sol:'75 / 3 = 25.'},
{t:'ord',ti:'Order the Steps: Recasting a Sphere into a Cylinder',q:'Arrange the steps to find the height of a cylinder (radius 2 cm) recast from a solid sphere (radius 3 cm):',items:[
  'Compute sphere volume: V = (4/3)π r³ = (4/3)π (27) = 36π cm³',
  'Set up cylinder volume formula: V = π R² h = π (2²) h = 4π h',
  'Equate volumes: 4π h = 36π',
  'Divide both sides by 4π: h = 36π / 4π',
  'State final cylinder height: 9 cm'
],sol:'Conservation of volume means equating the sphere volume with the cylinder volume formula.'},
{t:'cat',ti:'Classify Solids by Volume Formula Type',categories:['Base Times Height: V = B · h','One-Third Base Times Height: V = (1/3) B · h'],items:[
  {s:'Right circular cylinder',cat:0},
  {s:'Rectangular prism',cat:0},
  {s:'Right triangular prism',cat:0},
  {s:'Right circular cone',cat:1},
  {s:'Square-based pyramid',cat:1}
],sol:'Prisms and cylinders use V = B · h; cones and pyramids taper to a point and use V = (1/3) B · h.'}
];
D['geo-transform']=[
{t:'sr',ti:'Worked Example: Reflect a Point Over the y-axis',steps:[
  'Reflect the point \\((3,-2)\\) over the y-axis. Reflecting over the y-axis negates the x-coordinate and keeps y the same: \\((x,y)\\to(-x,y)\\).',
  'Apply to \\((3,-2)\\): \\((-3,-2)\\).'
]},
{t:'qc',ti:'Quick Check: Rotations',q:'A 180° rotation about the origin maps \\((x,y)\\) to:',o:['\\((-x,-y)\\)','\\((x,-y)\\)','\\((-x,y)\\)','\\((y,x)\\)'],a:0,ex:'A 180° rotation about the origin negates both coordinates.'},
{t:'cat',ti:'Categorize: Rigid vs Non-Rigid Motions',categories:['Isometry (Rigid Motion)','Non-Rigid Motion'],items:[
  {s:'Translation by vector ⟨-2, 5⟩',cat:0},
  {s:'Reflection across the line y = -x',cat:0},
  {s:'Rotation of 90° about origin',cat:0},
  {s:'Dilation by scale factor k = 2.5',cat:1},
  {s:'Horizontal stretch by factor 3',cat:1}
],sol:'Translations, reflections, and rotations preserve distance and angle measure (isometries); dilations and stretches change size or shape.'},
{t:'num',ti:'Dilation Coordinate Value',q:'The point (4, -6) is dilated with center at the origin by a scale factor of \\(k = 0.5\\). What is the resulting x-coordinate?',a:2,tol:0.001,h:'Multiply the x-coordinate by 0.5.',sol:'4 * 0.5 = 2.'},
{t:'ord',ti:'Order the Steps: Composition of Geometric Transformations',q:'Arrange the steps to reflect point A(-2, 4) across line y = x, then translate by vector ⟨3, -1⟩:',items:[
  'Recall rule for reflection across line y = x: swap coordinates (x, y) ⟶ (y, x)',
  'Apply reflection to A(-2, 4): A\'(4, -2)',
  'Recall rule for translation by ⟨h, k⟩: (x, y) ⟶ (x + h, y + k)',
  'Apply translation ⟨3, -1⟩ to A\'(4, -2): (4 + 3, -2 - 1)',
  'State the final transformed coordinates: A\'\'(7, -3)'
],sol:'Perform composite transformations in sequence, applying the coordinates rule step by step.'}
];
D['geo-coord']=[
{t:'fn',ti:'Explorer: Line Slope \\(y=mx+2\\)',fns:[{expr:'m*x+2',color:'#1E3A6E',label:'y=mx+2'}],xrange:[-5,5],yrange:[-5,10],params:[{name:'m',label:'Slope m',min:-3,max:3,step:0.5,default:1}]},
{t:'sr',ti:'Worked Example: Distance Between Two Points',steps:[
  'Find the distance between \\((1,2)\\) and \\((4,6)\\). Use the distance formula: \\(d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\).',
  'Substitute: \\(d=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}\\).',
  'Simplify: \\(d=\\sqrt{25}=5\\).'
]},
{t:'qc',ti:'Quick Check: Midpoint',q:'The midpoint of \\((2,4)\\) and \\((8,10)\\) is:',o:['\\((5,7)\\)','\\((6,7)\\)','\\((5,6)\\)','\\((10,14)\\)'],a:0,ex:'Midpoint = average of coordinates: \\(\\left(\\frac{2+8}{2},\\frac{4+10}{2}\\right)=(5,7)\\).'},
{t:'num',ti:'Perpendicular Slope Calculation',q:'Line \\(L_1\\) has equation \\(2x + 8y = 12\\). What is the slope of a line \\(L_2\\) perpendicular to \\(L_1\\)?',a:4,tol:0.001,h:'Slope of L1 is -2/8 = -1/4. Perpendicular slope is negative reciprocal: -(-4) = 4.',sol:'4.'},
{t:'ord',ti:'Order the Steps: Equation of a Perpendicular Bisector',q:'Arrange the steps to find the perpendicular bisector of segment AB connecting A(2, -1) and B(6, 7):',items:[
  'Find the midpoint M: M = ((2+6)/2, (-1+7)/2) = (4, 3)',
  'Find the slope of segment AB: m_AB = (7 - (-1)) / (6 - 2) = 8 / 4 = 2',
  'Find perpendicular slope: m_perp = -1 / 2',
  'Write point-slope equation through M(4, 3): y - 3 = (-1/2)(x - 4)',
  'Simplify to slope-intercept form: y = (-1/2)x + 5'
],sol:'The perpendicular bisector passes through the midpoint with a slope perpendicular to the segment.'},
{t:'cat',ti:'Classify Lines by Slope Relationships',categories:['Parallel Lines (Equal Slopes: m₁ = m₂)','Perpendicular Lines (Negative Reciprocals: m₁ · m₂ = -1)'],items:[
  {s:'y = 3x + 1 and y = 3x - 5',cat:0},
  {s:'y = -0.5x + 4 and y = -0.5x - 2',cat:0},
  {s:'y = 2x + 3 and y = -0.5x + 1',cat:1},
  {s:'y = (3/4)x - 2 and y = (-4/3)x + 7',cat:1}
],sol:'Parallel lines have matching slopes; perpendicular lines have negative reciprocal slopes whose product is -1.'}
];
D['geo-prob']=[
{t:'sr',ti:'Worked Example: Geometric Probability',steps:[
  'A square dartboard has side \\(10\\) with a circular target of radius \\(3\\) at its center. Area of the square: \\(10\\times10=100\\).',
  'Area of the circle: \\(\\pi r^2=\\pi(3)^2=9\\pi\\).',
  'Probability \\(=\\dfrac{\\text{circle area}}{\\text{square area}}=\\dfrac{9\\pi}{100}\\approx0.283\\).'
]},
{t:'qc',ti:'Quick Check: Coin Flips',q:'A coin is flipped 3 times. What is \\(P(\\text{exactly 2 heads})\\)?',o:['\\(\\dfrac38\\)','\\(\\dfrac12\\)','\\(\\dfrac14\\)','\\(\\dfrac18\\)'],a:0,ex:'There are \\(\\binom32=3\\) ways to get 2 heads out of 8 equally likely outcomes: \\(\\dfrac38\\).'},
{t:'num',ti:'Geometric Probability on Line Segment',q:'A point is chosen at random on a line segment of length 20. What is the probability (as a decimal) that it lands on a subsegment of length 7?',a:0.35,tol:0.001,h:'Divide subsegment length by total length: 7 / 20.',sol:'7 / 20 = 0.35.'},
{t:'ord',ti:'Order the Steps: Geometric Probability in Concentric Target',q:'Arrange the steps to find probability that a randomly landing dart hits the middle ring (radius 10 to 20 cm) on a target of radius 30 cm:',items:[
  'Find total target area: Area_total = π (30²) = 900π cm²',
  'Find area of outer circle of middle ring: π (20²) = 400π cm²',
  'Find area of inner circle: π (10²) = 100π cm²',
  'Calculate middle ring area: Area_ring = 400π - 100π = 300π cm²',
  'Divide to find probability: P = 300π / 900π = 1/3 ≈ 0.333'
],sol:'Geometric probability equals the favorable target area divided by the total possible region area.'},
{t:'cat',ti:'Classify Probability Events by Nature',categories:['Geometric / Continuous Probability','Classical / Discrete Probability'],items:[
  {s:'Probability a dart lands in a circular target on a square board',cat:0},
  {s:'Probability a random waiting time is under 5 minutes',cat:0},
  {s:'Probability a randomly selected point on [0, 10] lies in [2, 6]',cat:0},
  {s:'Probability of rolling a sum of 7 on two standard six-sided dice',cat:1},
  {s:'Probability of drawing an Ace from a standard 52-card deck',cat:1}
],sol:'Continuous/geometric probability relies on ratios of lengths, areas, or volumes; discrete probability relies on counting outcomes.'}
];
});
