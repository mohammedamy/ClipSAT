/* Interactive Practice data for /mvc/ - one entry per chapter section id.
   Shipped as public/js/ix/mvc.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['mvc-partials'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Computing First & Mixed Partial Derivatives',
    steps: [
      { l: 'For \\(f(x,y) = x^3 y^2 - 4xy + 5y\\), find \\(f_x(x,y) = 3x^2 y^2 -\\)', a: '4y', h: 'd/dx(-4xy) with y treated as constant is -4y' },
      { l: 'Find \\(f_{xy}(x,y) = \\dfrac{\\partial}{\\partial y}(3x^2 y^2 - 4y) = 6x^2 y -\\)', a: '4', h: 'd/dy(-4y) = -4' },
      { l: 'By Clairaut\'s theorem, does \\(f_{yx} = f_{xy}\\) for this smooth polynomial? (yes/no):', a: 'yes', h: 'Mixed partials are equal when second derivatives are continuous.' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Tangent Plane to a Surface',
    q: 'Find the normal vector \\(\\mathbf{n}\\) to the tangent plane of \\(z = f(x,y)\\) at \\((x_0, y_0)\\):',
    o: ['\\(\\langle f_x, f_y, -1 \\rangle\\)', '\\(\\langle f_x, f_y, 1 \\rangle\\)', '\\(\\langle 1, 1, f_z \\rangle\\)', '\\(\\langle -f_y, f_x, 0 \\rangle\\)'],
    a: 0,
    ex: 'Rearranging \\(z = f(x,y)\\) into \\(F(x,y,z) = f(x,y) - z = 0\\), the gradient \\(\\nabla F = \\langle f_x, f_y, -1 \\rangle\\) gives the normal vector.'
  },
  {
    t: 'num',
    ti: 'Evaluate Mixed Second Partial Derivative',
    q: 'Given \\(f(x, y) = 2x^2 y^3 - 5xy + 4x - 6y\\), evaluate the mixed second partial derivative \\(f_{xy}(1, 2)\\):',
    a: 43,
    tol: 0.001,
    h: 'f_x = 4x y³ - 5y + 4. Then differentiate with respect to y: f_xy = 12x y² - 5. Evaluate at (1, 2).',
    sol: 'f_xy = 12x y² - 5. At (1, 2): 12(1)(4) - 5 = 48 - 5 = 43.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Tangent Plane to z = f(x, y)',
    q: 'Order the steps to construct the tangent plane equation to z = f(x, y) at the point (x₀, y₀, z₀):',
    items: [
      'Compute the first-order partial derivatives f_x(x, y) and f_y(x, y)',
      'Evaluate f_x(x₀, y₀) and f_y(x₀, y₀) at the point of tangency',
      'Verify or compute z₀ = f(x₀, y₀) if not given explicitly',
      'Substitute into the formula: z - z₀ = f_x(x₀, y₀)(x - x₀) + f_y(x₀, y₀)(y - y₀)',
      'Expand and rearrange into the standard form Ax + By + Cz = D'
    ],
    sol: 'The tangent plane utilizes evaluated partial derivatives as slopes along coordinate directions.'
  },
  {
    t: 'cat',
    ti: 'Classify Partial Derivatives: Holding x vs. Holding y Constant',
    categories: ['Computed Holding y Constant (∂/∂x)', 'Computed Holding x Constant (∂/∂y)'],
    items: [
      { s: 'f_x(x, y) measuring slope along coordinate slice y = constant', cat: 0 },
      { s: 'f_y(x, y) measuring slope along coordinate slice x = constant', cat: 1 },
      { s: 'Differentiating x² y³ to obtain 2x y³', cat: 0 },
      { s: 'Differentiating x² y³ to obtain 3x² y²', cat: 1 },
      { s: 'Rate of change in the direction of unit vector i = ⟨1, 0⟩', cat: 0 }
    ],
    sol: '∂/∂x treats y as a constant multiplier; ∂/∂y treats x as a constant multiplier.'
  }
];

D['mvc-chain-rule'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Directional Derivative & Gradient',
    steps: [
      { l: 'For \\(f(x,y) = x^2 + 3y^2\\) at \\(P(1,2)\\), compute \\(f_x(1,2) = 2(1) =\\)', a: '2', h: '\\(2(1) = 2\\)' },
      { l: 'Compute \\(f_y(1,2) = 6(2) =\\)', a: '12', h: '\\(6(2) = 12\\)' },
      { l: 'The gradient vector is \\(\\nabla f(1,2) = \\langle 2, 12 \\rangle\\). What is the maximum directional derivative value \\(\\|\\nabla f\\|\\)? \\(\\sqrt{2^2 + 12^2} = \\sqrt{148} = 2\\sqrt{\\text{?}}\\):', a: '37', h: '\\(148 = 4 \\times 37\\)' }
    ]
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Directional Derivatives & Gradient Direction',
    items: [
      { s: 'The gradient vector \\(\\nabla f(x,y)\\) always points in the direction of steepest ascent.', a: true, ex: 'The maximum rate of change occurs when the unit direction vector \\(\\mathbf{u}\\) is parallel to \\(\\nabla f\\).' },
      { s: 'The directional derivative in a direction tangent to a level curve is zero.', a: true, ex: 'Along a level curve \\(f(x,y) = c\\), the value is constant, so \\(D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u} = 0\\).' },
      { s: 'The gradient \\(\\nabla f(x_0, y_0)\\) is tangent to the level curve through \\((x_0, y_0)\\).', a: false, ex: 'The gradient is strictly ORTHOGONAL (perpendicular) to the level curve.' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Gradient at a Stationary Point',
    q: 'If \\(f(x, y)\\) is differentiable and \\(\\nabla f(x_0, y_0) = \\langle 0, 0 \\rangle\\), what is the directional derivative \\(D_{\\mathbf{u}}f(x_0, y_0)\\) in any arbitrary unit direction \\(\\mathbf{u}\\)?',
    o: ['0', '1', '\\(\\|\\mathbf{u}\\|\\)', 'Undefined'],
    a: 0,
    ex: 'Since \\(D_{\\mathbf{u}}f = \\nabla f \\cdot \\mathbf{u} = \\langle 0, 0 \\rangle \\cdot \\mathbf{u} = 0\\), the directional derivative is zero in all directions.'
  },
  {
    t: 'num',
    ti: 'Maximum Rate of Change (Gradient Norm)',
    q: 'Compute the maximum rate of increase \\(\\|\\nabla f(3, 4)\\|\\) for the function \\(f(x, y) = x^2 + y^2\\):',
    a: 10,
    tol: 0.001,
    h: '∇f = ⟨2x, 2y⟩. At (3, 4), ∇f = ⟨6, 8⟩. Compute √(6² + 8²).',
    sol: '‖∇f(3, 4)‖ = √(6² + 8²) = √(36 + 64) = √100 = 10.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Calculate Directional Derivative D_u f',
    q: 'Order the steps to compute the directional derivative of f(x, y) at P(x₀, y₀) in the direction of vector v:',
    items: [
      'Compute partial derivatives f_x and f_y to construct gradient vector ∇f',
      'Evaluate gradient vector at the specified point: ∇f(x₀, y₀)',
      'Calculate the length of the direction vector: ‖v‖ = √(v₁² + v₂²)',
      'Normalize v to obtain a unit vector: u = v / ‖v‖',
      'Take the dot product: D_u f = ∇f(x₀, y₀) · u'
    ],
    sol: 'Directional derivative requires dotting the evaluated gradient with a normalized unit direction vector.'
  },
  {
    t: 'cat',
    ti: 'Classify Directional Derivative Rates of Change',
    categories: ['Maximum Rate of Increase (+‖∇f‖)', 'Maximum Rate of Decrease (-‖∇f‖)', 'Zero Rate of Change (0)'],
    items: [
      { s: 'Direction parallel to ∇f(x₀, y₀)', cat: 0 },
      { s: 'Direction opposite to -∇f(x₀, y₀)', cat: 1 },
      { s: 'Direction tangent to the level curve through (x₀, y₀)', cat: 2 },
      { s: 'Direction orthogonal (perpendicular) to ∇f(x₀, y₀)', cat: 2 },
      { s: 'Unit direction u = ∇f / ‖∇f‖', cat: 0 }
    ],
    sol: 'Directional derivative is maximized in direction of ∇f, minimized in direction of -∇f, and vanishes tangent to level curves.'
  }
];

D['mvc-optimization'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Second Derivative Test for Critical Points',
    steps: [
      { l: 'Discriminant \\(D = f_{xx} f_{yy} - (f_{xy})^2\\). If \\(f_{xx} = 4\\), \\(f_{yy} = 3\\), and \\(f_{xy} = 1\\), compute \\(D = 4(3) - 1^2 =\\)', a: '11', h: '\\(12 - 1 = 11\\)' },
      { l: 'Since \\(D > 0\\) and \\(f_{xx} > 0\\), the critical point is a local: (min/max/saddle)', a: 'min', h: 'Positive D and positive f_xx indicates a local minimum.' }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: Second Derivative Test Outcomes',
    p: [
      { l: 'D > 0 and f_xx > 0', r: 'Local minimum' },
      { l: 'D > 0 and f_xx < 0', r: 'Local maximum' },
      { l: 'D < 0', r: 'Saddle point' },
      { l: 'D = 0', r: 'Inconclusive' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Lagrange Multipliers Tangency',
    q: 'At an extremum of \\(f(x, y)\\) subject to constraint \\(g(x, y) = k\\), the gradient vectors satisfy:',
    o: ['\\(\\nabla f = \\lambda \\nabla g\\)', '\\(\\nabla f \\cdot \\nabla g = 0\\)', '\\(\\nabla f = -\\nabla g\\) always', '\\(\\nabla f = \\mathbf{0}\\)'],
    a: 0,
    ex: 'Extrema occur where the level curve of f is tangent to the constraint curve g=k, meaning their normal gradients are collinear: \\(\\nabla f = \\lambda \\nabla g\\).'
  },
  {
    t: 'num',
    ti: 'Compute Hessian Discriminant D',
    q: 'At a critical point of \\(f(x, y)\\), the second partials are \\(f_{xx} = 6\\), \\(f_{yy} = 4\\), and \\(f_{xy} = 3\\). Compute the discriminant \\(D = f_{xx}f_{yy} - (f_{xy})^2\\):',
    a: 15,
    tol: 0.001,
    h: 'D = 6(4) - 3² = 24 - 9.',
    sol: 'D = 6(4) - 9 = 24 - 9 = 15.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Second Derivative Test Classification',
    q: 'Order the steps to locate and classify the local extrema of a smooth function f(x, y):',
    items: [
      'Find first partial derivatives f_x and f_y and set both equal to 0',
      'Solve the system f_x = 0 and f_y = 0 simultaneously to find all critical points',
      'Compute second partial derivatives f_xx, f_yy, and f_xy',
      'Form the discriminant D(x, y) = f_xx f_yy - (f_xy)²',
      'Evaluate D at each critical point: if D < 0 saddle; if D > 0 check sign of f_xx'
    ],
    sol: 'Critical points are found via first derivatives, then classified via the sign of D and f_xx.'
  },
  {
    t: 'cat',
    ti: 'Classify Optimization Conditions: Unconstrained vs. Constrained',
    categories: ['Unconstrained Extrema Condition', 'Lagrange Multiplier Constrained Condition'],
    items: [
      { s: '∇f(x, y) = ⟨0, 0⟩', cat: 0 },
      { s: '∇f(x, y) = λ ∇g(x, y) with constraint g(x, y) = k', cat: 1 },
      { s: 'f_x = 0 and f_y = 0 simultaneously', cat: 0 },
      { s: 'Level curves of f are tangent to constraint boundary g = k', cat: 1 },
      { s: 'Curvature classified via discriminant D = f_xx f_yy - (f_xy)²', cat: 0 }
    ],
    sol: 'Unconstrained optimization looks for flat tangent planes (∇f = 0); Lagrange multipliers looks for tangency with constraint curves.'
  }
];

D['mvc-double-integrals'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Iterated Double Integrals',
    steps: [
      { l: 'Evaluate \\(\\int_0^1 \\int_0^2 (2x + 3y)\\,dy\\,dx\\). Inner integral with respect to y: \\([2xy + \\frac{3}{2}y^2]_0^2 = 4x +\\)', a: '6', h: '\\(2x(2) + 3/2(4) = 4x + 6\\)' },
      { l: 'Outer integral with respect to x: \\(\\int_0^1 (4x + 6)\\,dx = [2x^2 + 6x]_0^1 =\\)', a: '8', h: '\\(2(1) + 6(1) = 8\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Double Integrals in Polar Coordinates',
    q: 'When converting a double integral \\(\\iint_R f(x,y)\\,dA\\) to polar coordinates, the area element \\(dA\\) becomes:',
    o: ['\\(r\\,dr\\,d\\theta\\)', '\\(dr\\,d\\theta\\)', '\\(r^2\\,dr\\,d\\theta\\)', '\\(\\frac{1}{r}\\,dr\\,d\\theta\\)'],
    a: 0,
    ex: 'The Jacobian determinant of the transformation \\(x=r\\cos\\theta, y=r\\sin\\theta\\) is \\(r\\), giving \\(dA = r\\,dr\\,d\\theta\\).'
  },
  {
    t: 'mt',
    ti: 'Matching: Double Integral Regions and Slices',
    p: [
      { l: 'Type I region', r: 'Integrated dy first, between curves y = g₁(x) and y = g₂(x)' },
      { l: 'Type II region', r: 'Integrated dx first, between curves x = h₁(y) and x = h₂(y)' },
      { l: 'Fubini\'s Theorem', r: 'Allows swapping order of integration for continuous f' },
      { l: 'Area of region D', r: '∬_D 1 dA' }
    ]
  },
  {
    t: 'num',
    ti: 'Separable Double Integral Calculation',
    q: 'Evaluate the separable double integral \\(\\int_0^2 \\int_0^3 xy \\, dy \\, dx\\):',
    a: 9,
    tol: 0.001,
    h: 'Factor into (∫₀² x dx)(∫₀³ y dy) = [x²/2]₀² · [y²/2]₀³ = 2 · (9/2).',
    sol: '(2) · (9/2) = 9.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Convert Double Integral to Polar Coordinates',
    q: 'Order the steps to convert and evaluate a double integral ∬_D f(x, y) dA using polar coordinates:',
    items: [
      'Sketch region D and determine radial limits r₁ ≤ r ≤ r₂ and angle limits θ₁ ≤ θ ≤ θ₂',
      'Substitute x = r cos θ and y = r sin θ into the integrand f(x, y)',
      'Replace the area element dA with the polar area element r dr dθ',
      'Integrate with respect to r from inner boundary to outer boundary',
      'Integrate the resulting expression with respect to θ over the angular interval'
    ],
    sol: 'Polar conversion requires replacing coordinates, inserting Jacobian factor r, and evaluating iterated limits.'
  },
  {
    t: 'cat',
    ti: 'Classify Integration Regions: Cartesian vs. Polar Preference',
    categories: ['Best Solved in Cartesian Coordinates (dx dy)', 'Best Solved in Polar Coordinates (r dr dθ)'],
    items: [
      { s: 'Rectangular region [a, b] × [c, d]', cat: 0 },
      { s: 'Circular disk x² + y² ≤ 16', cat: 1 },
      { s: 'Integrand containing (x² + y²)', cat: 1 },
      { s: 'Triangular region bounded by y = 2x, y = 0, and x = 4', cat: 0 },
      { s: 'Annular sector between circles r = 1 and r = 3 for 0 ≤ θ ≤ π/2', cat: 1 }
    ],
    sol: 'Polar coordinates excel for circular, radial, and rotational boundaries; Cartesian is natural for boxes and linear boundaries.'
  }
];

D['mvc-triple-integrals'] = [
  {
    t: 'mt',
    ti: 'Matching Lab: Differential Volume Elements in Coordinates',
    p: [
      { l: 'Cartesian volume element dV', r: 'dx dy dz' },
      { l: 'Cylindrical volume element dV', r: 'r dz dr dθ' },
      { l: 'Spherical volume element dV', r: 'ρ² sin φ dρ dφ dθ' },
      { l: 'Spherical radius relation', r: 'x² + y² + z² = ρ²' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Spherical Angle Conventions',
    q: 'In spherical coordinates \\((\\rho, \\theta, \\phi)\\), the polar/zenith angle \\(\\phi\\) measured from the positive z-axis ranges from:',
    o: ['\\([0, \\pi]\\)', '\\([0, 2\\pi]\\)', '\\([-\\pi/2, \\pi/2]\\)', '\\([0, \\pi/2]\\)'],
    a: 0,
    ex: '\\(\\phi = 0\\) represents the north pole (positive z-axis) and \\(\\phi = \\pi\\) represents the south pole (negative z-axis).'
  },
  {
    t: 'sb',
    ti: 'Lab Step Builder: Cylindrical Coordinates Volume Integral',
    steps: [
      { l: 'In cylindrical coordinates, \\(x^2 + y^2 =\\)', a: 'r^2', h: 'x = r cos θ, y = r sin θ gives x² + y² = r²' },
      { l: 'The Jacobian volume element \\(dV =\\) ? \\(dz\\,dr\\,d\\theta\\):', a: 'r', h: 'Jacobian factor is r' },
      { l: 'For a solid bounded below by \\(z=0\\) and above by \\(z=4-r^2\\), the inner z-integral evaluates to \\([z]_0^{4-r^2} = 4 -\\)', a: 'r^2', h: '4 - r² - 0 = 4 - r²' }
    ]
  },
  {
    t: 'num',
    ti: 'Cylinder Volume Calculation in Cylindrical Coordinates',
    q: 'Using cylindrical coordinates, compute the volume of a cylinder of radius \\(R = 3\\) and height \\(h = 5\\) (formula \\(V = \\pi R^2 h\\); enter the integer coefficient of \\(\\pi\\), i.e., \\(R^2 h\\)):',
    a: 45,
    tol: 0.001,
    h: 'R² h = 3² · 5 = 9 · 5.',
    sol: 'R² h = 3² · 5 = 45.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Triple Integration in Spherical Coordinates',
    q: 'Order the steps to evaluate a triple integral ∭_E f(x, y, z) dV in spherical coordinates:',
    items: [
      'Identify spherical boundaries such as spheres ρ = a or cones φ = α',
      'Determine angle limits: azimuthal θ ∈ [0, 2π] and colatitude φ ∈ [0, π]',
      'Determine radial limits: ρ from inner radius to outer boundary',
      'Substitute x = ρ sin φ cos θ, y = ρ sin φ sin θ, z = ρ cos φ into f',
      'Insert the volume element dV = ρ² sin φ dρ dφ dθ and integrate iteratively'
    ],
    sol: 'Spherical coordinates map space via radius ρ, colatitude φ, and azimuth θ with volume metric ρ² sin φ.'
  },
  {
    t: 'cat',
    ti: 'Classify 3D Regions: Cylindrical vs. Spherical Suitability',
    categories: ['Cylindrical Coordinates (r, θ, z)', 'Spherical Coordinates (ρ, φ, θ)'],
    items: [
      { s: 'Solid bounded by paraboloid z = x² + y² and plane z = 4', cat: 0 },
      { s: 'Solid sphere x² + y² + z² ≤ 25', cat: 1 },
      { s: 'Ice cream cone solid between sphere ρ = 3 and cone φ = π/3', cat: 1 },
      { s: 'Vertical circular cylinder x² + y² ≤ 4 with 0 ≤ z ≤ 6', cat: 0 },
      { s: 'Integrand with spherical symmetry depending only on (x² + y² + z²)', cat: 1 }
    ],
    sol: 'Cylindrical coordinates suit axial symmetry along z; spherical coordinates suit radial symmetry from origin.'
  }
];

D['mvc-vector-fields'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Line Integral of a Vector Field',
    steps: [
      { l: 'Let \\(\\mathbf{F} = \\langle y, x \\rangle\\) along \\(\\mathbf{r}(t) = \\langle t, t^2 \\rangle\\) for \\(t \\in [0, 1]\\). Compute \\(\\mathbf{r}\'(t) = \\langle 1, ?\\rangle\\):', a: '2t', h: 'd/dt(t²) = 2t' },
      { l: 'Substitute \\(\\mathbf{r}(t)\\) into \\(\\mathbf{F}\\): \\(\\mathbf{F}(\\mathbf{r}(t)) = \\langle t^2, t \\rangle\\). Compute dot product \\(\\mathbf{F}\\cdot\\mathbf{r}\' = t^2(1) + t(2t) =\\) ? \\(t^2\\):', a: '3', h: '\\(t^2 + 2t^2 = 3t^2\\)' },
      { l: 'Integrate \\(\\int_0^1 3t^2\\,dt = [t^3]_0^1 =\\)', a: '1', h: '\\(1^3 - 0 = 1\\)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Fundamental Theorem for Line Integrals',
    q: 'If \\(\\mathbf{F} = \\nabla f\\) is conservative, the work done along any curve \\(C\\) from \\(A\\) to \\(B\\) is:',
    o: ['\\(f(B) - f(A)\\)', '\\(f(A) - f(B)\\)', '\\(\\oint_C \\nabla f\\)', '\\(0\\) always'],
    a: 0,
    ex: 'Line integrals of conservative vector fields are path-independent and depend solely on potential values at endpoints: \\(\\int_C \\nabla f\\cdot d\\mathbf{r} = f(B) - f(A)\\).'
  },
  {
    t: 'mt',
    ti: 'Matching: Vector Field Concepts',
    p: [
      { l: 'Conservative field F', r: 'F = ∇f for some scalar potential f' },
      { l: 'Path independence', r: '∫_C F·dr depends only on endpoints' },
      { l: 'Closed loop line integral ∮_C F·dr', r: '0 for any conservative field' },
      { l: '2D curl condition', r: '∂Q/∂x = ∂P/∂y on simply connected domain' }
    ]
  },
  {
    t: 'num',
    ti: 'Work Done by Conservative Field',
    q: 'A conservative force field \\(\\mathbf{F} = \\nabla f\\) has potential \\(f(x, y) = x^2 y + 3y^2\\). Find the work done \\(\\int_C \\mathbf{F}\\cdot d\\mathbf{r}\\) along any smooth curve from \\(A(1, 1)\\) to \\(B(2, 3)\\):',
    a: 35,
    tol: 0.001,
    h: 'Work = f(B) - f(A). Compute f(2, 3) and f(1, 1).',
    sol: 'f(2, 3) = 2²(3) + 3(3²) = 12 + 27 = 39. f(1, 1) = 1(1) + 3(1) = 4. Work = 39 - 4 = 35.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Find Potential Function f(x, y)',
    q: 'Order the steps to find a potential function f(x, y) for a conservative field F = ⟨P, Q⟩:',
    items: [
      'Check that ∂P/∂y = ∂Q/∂x throughout an open simply connected domain',
      'Integrate f_x = P with respect to x, adding an unknown function of y: f(x, y) = ∫ P dx + g(y)',
      'Differentiate this expression for f(x, y) with respect to y: ∂f/∂y = ∂/∂y[∫ P dx] + g\'(y)',
      'Equate ∂f/∂y with Q(x, y) to isolate and solve for g\'(y)',
      'Integrate g\'(y) to find g(y) and write down the complete potential function f(x, y)'
    ],
    sol: 'Potential functions are found by integrating one component and differentiating to solve for the remaining single-variable function.'
  },
  {
    t: 'cat',
    ti: 'Classify Vector Fields: Conservative vs. Non-Conservative',
    categories: ['Conservative Vector Field', 'Non-Conservative Vector Field'],
    items: [
      { s: 'F = ∇f for a smooth scalar potential f', cat: 0 },
      { s: 'Line integral around every simple closed curve is zero: ∮_C F · dr = 0', cat: 0 },
      { s: 'Line integral value depends on the path taken between fixed endpoints', cat: 1 },
      { s: 'Curl of F is non-zero (∇ × F ≠ 0)', cat: 1 },
      { s: 'F(x, y) = ⟨2xy, x²⟩ on all of ℝ²', cat: 0 }
    ],
    sol: 'Conservative vector fields have path-independent integrals, vanish around closed loops, and have zero curl.'
  }
];

D['mvc-greens-theorem'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Green\'s Theorem Application',
    steps: [
      { l: 'Green\'s theorem states \\(\\oint_C (P\\,dx + Q\\,dy) = \\iint_D \\left(\\dfrac{\\partial Q}{\\partial x} - \\dfrac{\\partial P}{\\partial y}\\right)dA\\). For \\(P = -y^3\\), \\(Q = x^3\\), \\(\\dfrac{\\partial Q}{\\partial x} =\\)', a: '3x^2', h: 'd/dx(x³) = 3x²' },
      { l: '\\(\\dfrac{\\partial P}{\\partial y} =\\)', a: '-3y^2', h: 'd/dy(-y³) = -3y²' },
      { l: 'The integrand \\(\\dfrac{\\partial Q}{\\partial x} - \\dfrac{\\partial P}{\\partial y} = 3(x^2 + y^2)\\). Across circle \\(x^2+y^2\\le 1\\), in polar this is \\(3r^2\\cdot r = 3r^3\\). Integrate \\(\\int_0^{2\\pi}\\int_0^1 3r^3\\,dr\\,d\\theta = 2\\pi \\times [\\frac{3}{4}r^4]_0^1 =\\) (enter fraction like 3/2pi as 1.5pi or 3pi/2):', a: '3pi/2', h: '\\(2\\pi \\times 3/4 = 3\\pi/2\\)' }
    ]
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Green\'s Theorem Hypotheses',
    items: [
      { s: 'Green\'s theorem requires the boundary curve C to be positively oriented (counterclockwise).', a: true, ex: 'Counterclockwise orientation ensures the interior domain D lies to the left of the curve.' },
      { s: 'Green\'s theorem can be used to compute the area of a region using \\(\\text{Area} = \\frac{1}{2}\\oint_C (x\\,dy - y\\,dx)\\).', a: true, ex: 'Here \\(\\partial Q/\\partial x - \\partial P/\\partial y = 1/2(1 - (-1)) = 1\\), which integrates to Area.' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Green\'s Theorem Boundary Orientation',
    q: 'If a closed curve \\(C\\) is traversed in the clockwise direction, how does the line integral \\(\\oint_C P\\,dx + Q\\,dy\\) relate to the double integral over the interior \\(D\\)?',
    o: ['\\(-\\iint_D (Q_x - P_y)\\,dA\\)', '\\(\\iint_D (Q_x - P_y)\\,dA\\)', '\\(0\\)', '\\(\\iint_D (P_x + Q_y)\\,dA\\)'],
    a: 0,
    ex: 'Clockwise traversal is negative orientation (-C), reversing the sign of the line integral: \\(\\oint_{-C} = -\\oint_C = -\\iint_D (Q_x - P_y)\\,dA\\).'
  },
  {
    t: 'num',
    ti: 'Evaluate Circulation via Green\'s Theorem',
    q: 'Use Green\'s theorem to evaluate \\(\\oint_C (3y\\,dx + 7x\\,dy)\\) where \\(C\\) is the positively oriented boundary of a circle of radius 2. (Enter the integer coefficient of \\(\\pi\\) in the answer \\(k\\pi\\)):',
    a: 16,
    tol: 0.001,
    h: 'Q_x - P_y = 7 - 3 = 4. Double integral = 4 · Area = 4 · (π · 2²) = 16π.',
    sol: 'Q_x - P_y = 4. Line integral = 4 · Area(circle) = 4 · (4π) = 16π. The integer coefficient is 16.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Applying Green\'s Theorem',
    q: 'Order the steps to transform and evaluate a closed planar line integral using Green\'s Theorem:',
    items: [
      'Verify that curve C is a closed, simple, positively oriented boundary curve',
      'Identify P(x, y) as the dx coefficient and Q(x, y) as the dy coefficient',
      'Compute partial derivatives ∂Q/∂x and ∂P/∂y',
      'Form the 2D curl difference: (∂Q/∂x - ∂P/∂y)',
      'Set up and evaluate the double integral ∬_D (∂Q/∂x - ∂P/∂y) dA over region D'
    ],
    sol: 'Green\'s theorem converts a closed line integral into a double integral of 2D curl over the interior.'
  },
  {
    t: 'cat',
    ti: 'Classify Boundary Orientations for Planar Regions',
    categories: ['Positive Orientation (Counter-Clockwise Outer Loop)', 'Negative Orientation (Clockwise Outer Loop)'],
    items: [
      { s: 'Walking along curve keeping the interior domain to the left', cat: 0 },
      { s: 'Walking along curve keeping the interior domain to the right', cat: 1 },
      { s: 'Counter-clockwise traversal around circle x² + y² = 1', cat: 0 },
      { s: 'Clockwise traversal around the boundary of a triangle', cat: 1 },
      { s: 'Standard orientation yielding ∮_C F·dr = +∬_D (Q_x - P_y) dA', cat: 0 }
    ],
    sol: 'Positive orientation keeps the interior on the left and corresponds to counter-clockwise outer loops.'
  }
];

D['mvc-surface-divergence-stokes'] = [
  {
    t: 'mt',
    ti: 'Matching Lab: Fundamental Theorems of Vector Calculus',
    p: [
      { l: 'Green\'s Theorem', r: '∮_C F·dr = ∬_D (Q_x − P_y) dA' },
      { l: 'Stokes\' Theorem', r: '∮_C F·dr = ∬_S (∇ × F) · dS' },
      { l: 'Divergence Theorem', r: '∬_S F·dS = ∭_E (∇ · F) dV' },
      { l: 'Curl of gradient ∇ × (∇f)', r: '0 (always identically zero)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Divergence Theorem Physical Meaning',
    q: 'If \\(\\iint_S \\mathbf{F}\\cdot d\\mathbf{S} > 0\\) across a closed outward-oriented boundary surface, the enclosed region contains:',
    o: ['A net source of flux (divergence > 0)', 'A net sink of flux (divergence < 0)', 'No fluid generation or absorption', 'A pure rotational vortex'],
    a: 0,
    ex: 'By the Divergence Theorem, total outward flux equals the volume integral of divergence. A positive net flux indicates net generation of fluid (a source).'
  },
  {
    t: 'sb',
    ti: 'Lab Step Builder: Divergence of a 3D Vector Field',
    steps: [
      { l: 'For \\(\\mathbf{F} = \\langle x^2 y, \\; 2yz, \\; 3z^2 x \\rangle\\), compute \\(\\dfrac{\\partial P}{\\partial x} =\\) ? \\(xy\\):', a: '2', h: 'd/dx(x² y) = 2xy' },
      { l: 'Compute \\(\\dfrac{\\partial Q}{\\partial y} =\\) ? \\(z\\):', a: '2', h: 'd/dy(2yz) = 2z' },
      { l: 'Compute \\(\\dfrac{\\partial R}{\\partial z} =\\) ? \\(zx\\):', a: '6', h: 'd/dz(3z² x) = 6zx' }
    ]
  },
  {
    t: 'num',
    ti: 'Calculate Divergence at a Given Point',
    q: 'Compute the divergence \\(\\nabla \\cdot \\mathbf{F}\\) at the point \\((1, 2, 3)\\) for the vector field \\(\\mathbf{F} = \\langle 2x^2 y, \\; 3y^2 z, \\; 4z^2 x \\rangle\\):',
    a: 68,
    tol: 0.001,
    h: 'div F = 4xy + 6yz + 8zx. Evaluate at (1, 2, 3): 4(1)(2) + 6(2)(3) + 8(3)(1) = 8 + 36 + 24.',
    sol: 'div F = 4xy + 6yz + 8zx. At (1, 2, 3): 8 + 36 + 24 = 68.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Applying Stokes\' Theorem',
    q: 'Order the steps to evaluate a line integral ∮_C F · dr around boundary loop C using Stokes\' Theorem:',
    items: [
      'Verify that curve C is a closed, oriented boundary curve of surface S',
      'Compute the curl vector field ∇ × F = ⟨R_y - Q_z, P_z - R_x, Q_x - P_y⟩',
      'Choose a simple oriented surface S spanning boundary curve C (such as a planar disk or paraboloid)',
      'Determine the outward unit normal vector n conforming to C via the right-hand rule',
      'Compute the surface integral ∬_S (∇ × F) · dS = ∬_D (∇ × F) · n dA'
    ],
    sol: 'Stokes\' theorem equates boundary circulation to the surface flux of curl.'
  },
  {
    t: 'cat',
    ti: 'Classify Theorems by Integral Relationship Type',
    categories: ['Boundary Line Integral to Surface/Region Integral', 'Closed Surface Integral to Volume Integral'],
    items: [
      { s: 'Green\'s Theorem: ∮_C F·dr = ∬_D (Q_x - P_y) dA', cat: 0 },
      { s: 'Stokes\' Theorem: ∮_C F·dr = ∬_S (∇ × F) · dS', cat: 0 },
      { s: 'Divergence Theorem: ∬_S F·dS = ∭_E (∇ · F) dV', cat: 1 },
      { s: 'Gauss\'s Law equating closed surface flux to enclosed charge volume', cat: 1 },
      { s: 'Circulation of curl over an open capped surface', cat: 0 }
    ],
    sol: 'Green\'s and Stokes\' theorems connect boundary loops (1D) to surfaces (2D); Divergence theorem connects closed boundaries (2D) to volumes (3D).'
  }
];

});
