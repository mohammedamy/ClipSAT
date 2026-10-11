/* Interactive Practice data for /linalg/ - one entry per chapter section id.
   Shipped as public/js/ix/linalg.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {

D['la-vectors'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Dot Product & Cauchy–Schwarz Verification',
    steps: [
      { l: 'Given \\(\\mathbf{u}=\\begin{pmatrix}2\\\\-1\\\\2\\end{pmatrix}\\) and \\(\\mathbf{v}=\\begin{pmatrix}1\\\\4\\\\-1\\end{pmatrix}\\), compute \\(\\mathbf{u}\\cdot\\mathbf{v} = 2(1)+(-1)(4)+2(-1) =\\)', a: '-4', h: '\\(2 - 4 - 2 = -4\\)' },
      { l: 'Compute the Euclidean norm \\(\\|\\mathbf{u}\\| = \\sqrt{2^2+(-1)^2+2^2} =\\)', a: '3', h: '\\(\\sqrt{4+1+4} = \\sqrt{9} = 3\\)' },
      { l: 'Compute \\(\\|\\mathbf{v}\\|^2 = 1^2+4^2+(-1)^2 =\\)', a: '18', h: '\\(1+16+1 = 18\\)' }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: Vector Operations & Geometric Interpretations',
    p: [
      { l: 'u · v = 0', r: 'Orthogonal vectors (90° angle)' },
      { l: 'u = c · v, c ≠ 0', r: 'Collinear / Linearly dependent' },
      { l: '‖u‖ = 1', r: 'Unit vector' },
      { l: 'proj_v(u)', r: '(u·v / ‖v‖²) · v' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Angle Between Vectors',
    q: 'If \\(\\mathbf{u}\\cdot\\mathbf{v} < 0\\), what can be deduced about the angle \\(\\theta\\) between \\(\\mathbf{u}\\) and \\(\\mathbf{v}\\)?',
    o: ['\\(\\theta\\) is obtuse (\\(90^{\\circ} < \\theta \\le 180^{\\circ}\\))', '\\(\\theta\\) is acute (\\(0^{\\circ} \\le \\theta < 90^{\\circ}\\))', '\\(\\theta = 90^{\\circ}\\)', '\\(\\mathbf{u}\\) and \\(\\mathbf{v}\\) are parallel and point in the same direction'],
    a: 0,
    ex: 'Since \\(\\cos\\theta = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|}\\), a negative dot product implies \\(\\cos\\theta < 0\\), which corresponds to an obtuse angle.'
  },
  {
    t: 'num',
    ti: 'Compute Dot Product',
    q: 'Compute the dot product \\(\\mathbf{u}\\cdot\\mathbf{v}\\) for \\(\\mathbf{u}=\\begin{pmatrix}3\\\\-2\\\\5\\end{pmatrix}\\) and \\(\\mathbf{v}=\\begin{pmatrix}4\\\\1\\\\-2\\end{pmatrix}\\):',
    a: 0,
    tol: 0.001,
    h: 'u · v = 3(4) + (-2)(1) + 5(-2).',
    sol: '3(4) + (-2)(1) + 5(-2) = 12 - 2 - 10 = 0.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Vector Projection Formula',
    q: 'Order the steps to project vector \\(\\mathbf{u}\\) onto a non-zero vector \\(\\mathbf{v}\\):',
    items: [
      'Compute the scalar dot product u · v',
      'Compute the squared norm ‖v‖² = v · v',
      'Form the projection scalar coefficient c = (u · v) / ‖v‖²',
      'Multiply the direction vector v by scalar c: proj_v(u) = c v'
    ],
    sol: 'Projection scales the target direction vector v by the scalar ratio (u · v) / ‖v‖².'
  },
  {
    t: 'cat',
    ti: 'Classify Vector Pairs: Orthogonal vs. Collinear',
    categories: ['Orthogonal (u · v = 0)', 'Collinear / Linearly Dependent'],
    items: [
      { s: '(1, 0) and (0, 3)', cat: 0 },
      { s: '(2, -1) and (4, -2)', cat: 1 },
      { s: '(3, -4) and (4, 3)', cat: 0 },
      { s: '(-3, 6) and (1, -2)', cat: 1 },
      { s: '(1, 2, -1) and (2, 1, 4)', cat: 0 }
    ],
    sol: 'Orthogonal pairs have zero inner product; collinear pairs are non-zero scalar multiples of each other.'
  }
];

D['la-systems'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Gaussian Elimination & Pivot Finding',
    steps: [
      { l: 'Row reduce \\(\\begin{pmatrix}1 & 2 & 3 \\\\ 2 & 5 & 8\\end{pmatrix}\\). Perform \\(R_2 \\leftarrow R_2 - 2R_1\\). Second row becomes \\(\\begin{pmatrix}0 & 1 & ?\\end{pmatrix}\\):', a: '2', h: '\\(8 - 2(3) = 2\\)' },
      { l: 'Number of pivots in the resulting row echelon form:', a: '2', h: 'Pivots in columns 1 and 2' }
    ]
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Linear System Solvability & Consistency',
    items: [
      { s: 'A system with more variables than equations (underdetermined) can never have a unique solution.', a: true, ex: 'If consistent, there will be at least one free variable, yielding infinitely many solutions.' },
      { s: 'A homogeneous system \\(A\\mathbf{x} = \\mathbf{0}\\) always has at least the trivial solution \\(\\mathbf{x} = \\mathbf{0}\\).', a: true, ex: 'Zero is always a valid solution to any homogeneous linear system.' },
      { s: 'If a row in an augmented matrix is \\(\\begin{pmatrix}0 & 0 & 0 & | & 5\\end{pmatrix}\\), the system is consistent.', a: false, ex: 'This represents \\(0x_1 + 0x_2 + 0x_3 = 5\\) (0 = 5), which is impossible (inconsistent).' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Pivot Columns & Free Variables',
    q: 'An augmented matrix for a system of 4 equations in 5 variables has 3 pivot columns in the coefficient matrix. How many free variables are there if the system is consistent?',
    o: ['2', '1', '3', '0'],
    a: 0,
    ex: 'Number of free variables = (total variables) - (pivot columns) = 5 - 3 = 2.'
  },
  {
    t: 'num',
    ti: 'Parameter for Infinitely Many Solutions',
    q: 'Find the value of \\(k\\) for which the system \\(\\begin{cases} 2x + 4y = 6 \\\\ 3x + ky = 9 \\end{cases}\\) has infinitely many solutions:',
    a: 6,
    tol: 0.001,
    h: 'For infinitely many solutions, equation 2 must be 1.5 times equation 1: 4 * 1.5 = k.',
    sol: 'Multiplying the first equation by 1.5 gives 3x + 6y = 9, so k = 6 makes the equations dependent and consistent.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Gaussian Elimination Algorithm',
    q: 'Arrange the standard steps of Gaussian Elimination to reduce an augmented matrix [A | b] to row echelon form:',
    items: [
      'Locate the leftmost non-zero pivot column',
      'Swap rows if needed to place a non-zero entry in the pivot position',
      'Use elementary row operations to eliminate all entries below the pivot',
      'Cover the pivot row and column and repeat the process on the remaining submatrix',
      'Read off pivots to determine consistency and identify any free variables'
    ],
    sol: 'Gaussian elimination works systematically from left to right, creating zeros below pivots.'
  },
  {
    t: 'cat',
    ti: 'Classify Linear Systems by Solution Set Type',
    categories: ['Unique Solution (Consistent)', 'Infinitely Many Solutions (Consistent with Free Variables)', 'No Solution (Inconsistent)'],
    items: [
      { s: 'Consistent system where every column in coefficient matrix has a pivot', cat: 0 },
      { s: 'Consistent system with 4 variables and 3 pivot columns', cat: 1 },
      { s: 'Augmented matrix containing row [0 0 0 | 8]', cat: 2 },
      { s: 'Square n x n system with det(A) ≠ 0', cat: 0 },
      { s: 'Homogeneous system Ax = 0 with more variables than equations', cat: 1 }
    ],
    sol: 'Pivot count relative to variables determines uniqueness or infinitely many solutions; contradiction rows signify inconsistency.'
  }
];

D['la-matrices'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Matrix Inversion Formula (2×2)',
    steps: [
      { l: 'For \\(A = \\begin{pmatrix}3 & 5 \\\\ 1 & 2\\end{pmatrix}\\), compute \\(\\det(A) = 3(2) - 5(1) =\\)', a: '1', h: '\\(6 - 5 = 1\\)' },
      { l: 'The inverse is \\(A^{-1} = \\dfrac{1}{\\det(A)}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}\\). Entry (1,1) of \\(A^{-1}\\) is:', a: '2', h: 'd = 2' },
      { l: 'Entry (1,2) of \\(A^{-1}\\) is:', a: '-5', h: '-b = -5' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Transpose & Product Properties',
    q: 'If \\(A\\) is an \\(m\\times n\\) matrix and \\(B\\) is an \\(n\\times p\\) matrix, which identity is ALWAYS correct?',
    o: ['\\((AB)^T = B^T A^T\\)', '\\((AB)^T = A^T B^T\\)', '\\(AB = BA\\)', '\\(\\det(AB) = \\det(A) + \\det(B)\\)'],
    a: 0,
    ex: 'The transpose of a product reverses order: \\((AB)^T = B^T A^T\\). Matrix multiplication is not generally commutative.'
  },
  {
    t: 'mt',
    ti: 'Matching: Matrix Invertibility Equivalences',
    p: [
      { l: 'A is invertible', r: 'det(A) ≠ 0' },
      { l: 'Ax = 0 has only trivial solution', r: 'Columns are linearly independent' },
      { l: 'RREF of A is I_n', r: 'A has n pivot positions' },
      { l: 'Col(A) = ℝⁿ', r: 'Transformation x ↦ Ax is onto (surjective)' }
    ]
  },
  {
    t: 'num',
    ti: 'Sum of Entries of Matrix Power',
    q: 'Given matrix \\(A = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}\\), compute the sum of all four entries of \\(A^2\\):',
    a: 50,
    tol: 0.001,
    h: 'Multiply A by A: top row is (7, 6), bottom row is (18, 19). Sum them: 7 + 6 + 18 + 19.',
    sol: 'A² = [[7, 6], [18, 19]]. Sum of entries = 7 + 6 + 18 + 19 = 50.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Matrix Inversion via [A | I]',
    q: 'Order the steps to find the inverse A⁻¹ of an n × n matrix using Gauss–Jordan elimination:',
    items: [
      'Augment matrix A with the identity matrix to form [A | I_n]',
      'Perform row operations to create a leading 1 in the top-left position',
      'Use row operations to eliminate non-zero entries in all other rows of that column',
      'Repeat across all columns until the left block becomes the identity matrix I_n',
      'Read off the resulting right block as the inverse matrix A⁻¹'
    ],
    sol: 'Gauss–Jordan elimination transforms [A | I] into [I | A⁻¹].'
  },
  {
    t: 'cat',
    ti: 'Classify Matrix Types by Algebraic Properties',
    categories: ['Symmetric Matrix (A = Aᵀ)', 'Skew-Symmetric Matrix (Aᵀ = -A)', 'Orthogonal Matrix (AᵀA = I)'],
    items: [
      { s: 'Any diagonal matrix with real diagonal entries', cat: 0 },
      { s: 'Matrix with A[i][j] = -A[j][i] and zeros on the main diagonal', cat: 1 },
      { s: 'Standard 2D rotation matrix [[cos θ, -sin θ], [sin θ, cos θ]]', cat: 2 },
      { s: 'Matrix whose columns form an orthonormal basis of ℝⁿ', cat: 2 },
      { s: 'The matrix product AᵀA for any real matrix A', cat: 0 }
    ],
    sol: 'Symmetric matrices equal their transpose; skew-symmetric matrices equal negative transpose; orthogonal matrices satisfy AᵀA = I.'
  }
];

D['la-determinants'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Determinant via Row Operations',
    steps: [
      { l: 'If row 1 and row 2 of a \\(3\\times3\\) matrix with \\(\\det=6\\) are swapped, the new determinant is:', a: '-6', h: 'Row swap multiplies determinant by -1' },
      { l: 'If all entries in one row are multiplied by 4, the new determinant is \\((-6)\\times 4 =\\)', a: '-24', h: 'Scaling one row scales determinant by that factor' },
      { l: 'Adding a multiple of one row to another changes the determinant by adding:', a: '0', h: 'Row addition leaves the determinant unchanged' }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching Lab: Determinants & Geometric Properties',
    p: [
      { l: 'det(A) ≠ 0', r: 'A is invertible / non-singular' },
      { l: 'det(A) = 0', r: 'Linearly dependent rows / columns' },
      { l: 'det(Aᵀ)', r: 'det(A)' },
      { l: 'det(A⁻¹)', r: '1 / det(A)' }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Scalar Multiplication of Matrix Determinant',
    q: 'If \\(A\\) is an \\(n\\times n\\) matrix and \\(c\\) is a real scalar, what is \\(\\det(cA)\\)?',
    o: ['\\(c^n \\det(A)\\)', '\\(c \\det(A)\\)', '\\(n c \\det(A)\\)', '\\(\\det(A) / c^n\\)'],
    a: 0,
    ex: 'Multiplying an n x n matrix by c multiplies each of its n rows by c, factoring out c^n.'
  },
  {
    t: 'num',
    ti: 'Determinant of Scalar Inverse Matrix',
    q: 'If \\(A\\) is a \\(3\\times 3\\) matrix with \\(\\det(A) = 4\\), compute \\(\\det(2A^{-1})\\):',
    a: 2,
    tol: 0.001,
    h: 'det(2A⁻¹) = 2³ · det(A⁻¹) = 8 · (1/4).',
    sol: 'det(2A⁻¹) = 2³ · (1/det(A)) = 8 · (1/4) = 2.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Cofactor Expansion along First Row',
    q: 'Order the steps to evaluate the determinant of a 3 × 3 matrix A by cofactor expansion along row 1:',
    items: [
      'Identify entries a₁₁, a₁₂, a₁₃ along the first row',
      'Compute the 2 × 2 minor determinants M₁₁, M₁₂, M₁₃ by deleting row 1 and each corresponding column',
      'Attach alternating chessboard signs: +M₁₁, -M₁₂, +M₁₃',
      'Multiply each cofactor C₁ⱼ = (-1)¹⁺ʲ M₁ⱼ by the corresponding entry a₁ⱼ',
      'Sum the three terms: det(A) = a₁₁C₁₁ + a₁₂C₁₂ + a₁₃C₁₃'
    ],
    sol: 'Laplace cofactor expansion multiplies row entries by their signed minor determinants and sums them.'
  },
  {
    t: 'cat',
    ti: 'Classify Row Operations by Effect on det(A)',
    categories: ['Determinant Unchanged', 'Determinant Negated (Multiplied by -1)', 'Determinant Multiplied by Scalar k'],
    items: [
      { s: 'Adding a multiple of one row to another (R_j ← R_j + c R_i)', cat: 0 },
      { s: 'Swapping two rows (R_i ↔ R_j)', cat: 1 },
      { s: 'Multiplying a single row by non-zero scalar k (R_i ← k R_i)', cat: 2 },
      { s: 'Transposing the matrix (det(Aᵀ) vs det(A))', cat: 0 },
      { s: 'Swapping two columns (C_i ↔ C_j)', cat: 1 }
    ],
    sol: 'Row replacement preserves determinant; row interchanges flip sign; single-row scaling multiplies determinant by k.'
  }
];

D['la-vectorspaces'] = [
  {
    t: 'qc',
    ti: 'Lab Check: Subspace Axioms & Verification',
    q: 'Which of the following subsets of \\(\\mathbb{R}^3\\) forms a subspace?',
    o: ['The plane \\(2x - 3y + z = 0\\)', 'The plane \\(2x - 3y + z = 4\\)', 'The sphere \\(x^2 + y^2 + z^2 = 1\\)', 'Vectors with all non-negative entries \\(x, y, z \\ge 0\\)'],
    a: 0,
    ex: 'A subspace must contain the zero vector \\(\\mathbf{0}\\) and be closed under addition and scalar multiplication. Only planes passing through the origin \\((0,0,0)\\) satisfy all three axioms.'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Basis, Dimension & Rank-Nullity',
    items: [
      { s: 'Any set of 4 vectors in \\(\\mathbb{R}^3\\) is linearly dependent.', a: true, ex: 'The maximum number of linearly independent vectors in \\(\\mathbb{R}^n\\) is \\(n\\).' },
      { s: 'The dimension of \\(\\text{Null}(A)\\) plus the dimension of \\(\\text{Col}(A)\\) equals the number of rows of \\(A\\).', a: false, ex: 'By the Rank-Nullity Theorem, \\(\\text{rank}(A) + \\text{nullity}(A) = n\\), the number of COLUMNS.' },
      { s: 'The columns of an \\(n\\times n\\) matrix \\(A\\) form a basis for \\(\\mathbb{R}^n\\) if and only if \\(\\det(A) \\neq 0\\).', a: true, ex: 'Non-zero determinant is equivalent to full column rank and linear independence.' }
    ]
  },
  {
    t: 'mt',
    ti: 'Matching: Fundamental Subspaces of Matrix A (m × n)',
    p: [
      { l: 'Col(A)', r: 'Subspace of ℝᵐ spanned by columns' },
      { l: 'Null(A)', r: 'Subspace of ℝⁿ consisting of solutions to Ax = 0' },
      { l: 'Row(A)', r: 'Subspace of ℝⁿ spanned by row vectors' },
      { l: 'Null(Aᵀ)', r: 'Left null space, orthogonal to Col(A) in ℝᵐ' }
    ]
  },
  {
    t: 'num',
    ti: 'Rank-Nullity Dimension Calculation',
    q: 'A linear transformation \\(T: \\mathbb{R}^7 \\to \\mathbb{R}^4\\) has a 3-dimensional range (column space). By the Rank-Nullity Theorem, what is the dimension of the null space \\(\\ker(T)\\)?',
    a: 4,
    tol: 0.001,
    h: 'dim(domain) = rank + nullity: 7 = 3 + nullity.',
    sol: 'nullity(T) = dim(domain) - rank(T) = 7 - 3 = 4.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Extract Basis for Column Space Col(A)',
    q: 'Order the steps to find a basis for the column space Col(A) of an m × n matrix A:',
    items: [
      'Write down the original matrix A with column vectors v₁, v₂, ..., vₙ',
      'Row reduce A using elementary row operations to row echelon form (REF)',
      'Identify the pivot columns in the row echelon form',
      'Select the corresponding original columns of A matching those pivot column indices',
      'Collect these original columns as the basis for Col(A)'
    ],
    sol: 'A basis for Col(A) consists of the original columns of A corresponding to pivot columns in REF.'
  },
  {
    t: 'cat',
    ti: 'Classify Subsets of ℝ³: Subspace vs. Not a Subspace',
    categories: ['Valid Vector Subspace of ℝ³', 'Not a Vector Subspace of ℝ³'],
    items: [
      { s: 'The plane 3x - 5y + 2z = 0 passing through origin', cat: 0 },
      { s: 'The affine plane x + y + z = 1', cat: 1 },
      { s: 'The trivial set {(0, 0, 0)} containing only the zero vector', cat: 0 },
      { s: 'Vectors with all non-negative entries x ≥ 0, y ≥ 0, z ≥ 0', cat: 1 },
      { s: 'The null space Null(A) of any 3 × 3 matrix', cat: 0 }
    ],
    sol: 'Subspaces must contain the zero vector and be closed under both vector addition and scalar multiplication.'
  }
];

D['la-eigen'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Finding Eigenvalues & Trace/Det Check',
    steps: [
      { l: 'For \\(A = \\begin{pmatrix}4 & 1 \\\\ 2 & 3\\end{pmatrix}\\), trace \\(\\text{tr}(A) = 4 + 3 =\\)', a: '7', h: 'Sum of diagonal entries' },
      { l: 'Determinant \\(\\det(A) = (4)(3) - (1)(2) =\\)', a: '10', h: '\\(12 - 2 = 10\\)' },
      { l: 'The characteristic equation is \\(\\lambda^2 - 7\\lambda + 10 = 0\\). The smaller eigenvalue is:', a: '2', h: '\\((\\lambda-2)(\\lambda-5) = 0\\)' },
      { l: 'The larger eigenvalue is:', a: '5', h: '\\(\\lambda = 5\\)' }
    ]
  },
  {
    t: 'fn',
    ti: 'Lab Explorer: Diagonal Matrix Action on Vectors \\(\\mathbf{y} = A\\mathbf{x}\\)',
    fns: [
      { expr: 'l1*x', color: '#2563eb', label: 'Eigenspace λ₁' },
      { expr: 'l2*x', color: '#ea580c', label: 'Eigenspace λ₂' }
    ],
    xrange: [-5, 5],
    yrange: [-10, 10],
    params: [
      { name: 'l1', label: 'Eigenvalue λ₁', min: -3, max: 3, step: 0.5, default: 2 },
      { name: 'l2', label: 'Eigenvalue λ₂', min: -3, max: 3, step: 0.5, default: -1 }
    ]
  },
  {
    t: 'qc',
    ti: 'Quick Check: Diagonalization Condition',
    q: 'An \\(n\\times n\\) matrix \\(A\\) is diagonalizable if and only if:',
    o: ['\\(A\\) has \\(n\\) linearly independent eigenvectors', '\\(\\det(A) \\neq 0\\)', '\\(A\\) is symmetric', '\\(A\\) has \\(n\\) distinct non-zero rows'],
    a: 0,
    ex: 'Diagonalizability requires that the geometric multiplicities sum to n, providing n linearly independent eigenvectors to form matrix P.'
  },
  {
    t: 'num',
    ti: 'Determinant from Eigenvalues of Matrix Polynomial',
    q: 'Matrix \\(A\\) has eigenvalues \\(\\lambda_1 = 3\\) and \\(\\lambda_2 = -2\\). What is the determinant of \\(A^2 + 2I\\)?',
    a: 66,
    tol: 0.001,
    h: 'Eigenvalues of A² + 2I are 3² + 2 = 11 and (-2)² + 2 = 6. det is their product.',
    sol: 'Eigenvalues are 11 and 6; determinant is the product of eigenvalues: 11 × 6 = 66.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Diagonalize Matrix A = PDP⁻¹',
    q: 'Order the steps to diagonalize an n × n matrix A into A = PDP⁻¹:',
    items: [
      'Compute the characteristic polynomial p(λ) = det(A - λI)',
      'Find all roots of p(λ) = 0 to obtain eigenvalues λ₁, λ₂, ..., λₖ',
      'For each eigenvalue, solve (A - λI)v = 0 to find a basis for its eigenspace',
      'Verify that the total count of linearly independent eigenvectors equals n',
      'Form P with eigenvectors as columns and D with corresponding eigenvalues on the diagonal'
    ],
    sol: 'Diagonalization requires finding all eigenvalues, basis eigenvectors, and assembling P and D.'
  },
  {
    t: 'cat',
    ti: 'Classify Matrices by Real Diagonalizability',
    categories: ['Guaranteed Diagonalizable over ℝ', 'Not Guaranteed / Not Diagonalizable over ℝ'],
    items: [
      { s: 'Any n × n real symmetric matrix (Spectral Theorem)', cat: 0 },
      { s: 'An n × n real matrix with n distinct real eigenvalues', cat: 0 },
      { s: 'Non-zero shear matrix [[1, 1], [0, 1]]', cat: 1 },
      { s: '90° rotation matrix [[0, -1], [1, 0]] over the real numbers', cat: 1 },
      { s: 'Matrix where geometric multiplicity < algebraic multiplicity for some eigenvalue', cat: 1 }
    ],
    sol: 'Real symmetric matrices and matrices with n distinct real eigenvalues are always diagonalizable over ℝ; defective or complex-eigenvalue matrices are not.'
  }
];

D['la-lintrans'] = [
  {
    t: 'mt',
    ti: 'Matching Lab: Standard 2D Transformation Matrices',
    p: [
      { l: 'Rotation by 90° CCW', r: '[[0, -1], [1, 0]]' },
      { l: 'Reflection across x-axis', r: '[[1, 0], [0, -1]]' },
      { l: 'Horizontal shear by k', r: '[[1, k], [0, 1]]' },
      { l: 'Projection onto x-axis', r: '[[1, 0], [0, 0]]' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Kernel & Injectivity',
    q: 'A linear transformation \\(T: V \\to W\\) is one-to-one (injective) if and only if:',
    o: ['\\(\\ker(T) = \\{\\mathbf{0}\\}\\)', '\\(\\ker(T) = V\\)', '\\(\\text{range}(T) = \\{\\mathbf{0}\\}\\)', '\\(\\dim(V) > \\dim(W)\\)'],
    a: 0,
    ex: '\\(T(\\mathbf{u}) = T(\\mathbf{v}) \\iff T(\\mathbf{u}-\\mathbf{v}) = \\mathbf{0}\\). If the only vector mapping to zero is the zero vector, then \\(\\mathbf{u}=\\mathbf{v}\\).'
  },
  {
    t: 'tf',
    ti: 'Reasoning Lab: Linear Transformation Properties',
    items: [
      { s: 'Every linear transformation satisfies T(0) = 0.', a: true, ex: 'T(0) = T(0 · v) = 0 · T(v) = 0.' },
      { s: 'If T: ℝ³ → ℝ² is linear, T can be one-to-one (injective).', a: false, ex: 'dim(domain) = 3 > dim(codomain) = 2, so nullity ≥ 1 by Rank-Nullity; it cannot be one-to-one.' },
      { s: 'The composition S ∘ T of two linear transformations is also linear.', a: true, ex: 'Compositions of linear transformations preserve addition and scalar multiplication.' }
    ]
  },
  {
    t: 'num',
    ti: 'Determinant of Composed Linear Transformation',
    q: 'A linear transformation \\(T: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) reflects vectors across the line \\(y = x\\) and then scales horizontally by a factor of 3. What is the determinant of the standard matrix \\([T]\\)?',
    a: -3,
    tol: 0.001,
    h: 'det(Reflection across y=x) = -1; det(Horizontal scale by 3) = 3. Multiply them.',
    sol: 'det([T]) = det(Scale) · det(Reflection) = 3 · (-1) = -3.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Construct Standard Transformation Matrix [T]',
    q: 'Order the steps to find the standard matrix [T] representing a linear transformation T: ℝⁿ → ℝᵐ:',
    items: [
      'Identify the standard basis vectors e₁, e₂, ..., eₙ for the domain ℝⁿ',
      'Apply the transformation to each standard basis vector to evaluate T(e₁), T(e₂), ..., T(eₙ)',
      'Express each resulting output vector as a column in ℝᵐ',
      'Assemble these columns side-by-side into matrix [T] = [T(e₁) T(e₂) ... T(eₙ)]',
      'Confirm that matrix-vector multiplication [T]x reproduces T(x)'
    ],
    sol: 'The j-th column of the standard matrix is T(eⱼ).'
  },
  {
    t: 'cat',
    ti: 'Classify Mappings: Linear vs. Non-Linear',
    categories: ['Linear Transformation', 'Non-Linear Transformation'],
    items: [
      { s: 'T(x, y) = (2x - 3y, x + 4y)', cat: 0 },
      { s: 'T(x, y) = (x + 1, y)', cat: 1 },
      { s: 'T(x, y) = (xy, x + y)', cat: 1 },
      { s: 'T(x, y, z) = (0, 0)', cat: 0 },
      { s: 'T(x, y) = (x², y)', cat: 1 }
    ],
    sol: 'Linear transformations preserve addition and scalar multiplication, and must map zero to zero without higher-order or affine terms.'
  }
];

D['la-orthogonality'] = [
  {
    t: 'sb',
    ti: 'Lab Step Builder: Gram–Schmidt Orthogonalization',
    steps: [
      { l: 'Set \\(\\mathbf{v}_1 = \\mathbf{u}_1 = \\begin{pmatrix}1\\\\1\\\\0\\end{pmatrix}\\). Compute \\(\\mathbf{v}_1\\cdot\\mathbf{v}_1 = 1^2+1^2+0^2 =\\)', a: '2', h: '\\(1 + 1 = 2\\)' },
      { l: 'For \\(\\mathbf{u}_2 = \\begin{pmatrix}1\\\\0\\\\1\\end{pmatrix}\\), compute \\(\\mathbf{u}_2\\cdot\\mathbf{v}_1 = 1(1)+0(1)+1(0) =\\)', a: '1', h: '\\(1 + 0 + 0 = 1\\)' },
      { l: 'The projection coefficient \\(\\dfrac{\\mathbf{u}_2\\cdot\\mathbf{v}_1}{\\mathbf{v}_1\\cdot\\mathbf{v}_1} = 1/\\)', a: '2', h: 'Denominator is 2' }
    ]
  },
  {
    t: 'qc',
    ti: 'Lab Check: Normal Equations for Least Squares',
    q: 'To find the least-squares solution \\(\\hat{\\mathbf{x}}\\) to an inconsistent system \\(A\\mathbf{x} = \\mathbf{b}\\), solve:',
    o: ['\\(A^T A \\hat{\\mathbf{x}} = A^T \\mathbf{b}\\)', '\\(A A^T \\hat{\\mathbf{x}} = \\mathbf{b}\\)', '\\(A^{-1} \\mathbf{b} = \\hat{\\mathbf{x}}\\)', '\\(A^T \\hat{\\mathbf{x}} = \\mathbf{0}\\)'],
    a: 0,
    ex: 'The residual vector \\(\\mathbf{b} - A\\hat{\\mathbf{x}}\\) must be orthogonal to \\(\\text{Col}(A)\\), leading directly to \\(A^T( \\mathbf{b} - A\\hat{\\mathbf{x}} ) = \\mathbf{0} \\Rightarrow A^T A\\hat{\\mathbf{x}} = A^T \\mathbf{b}\\).'
  },
  {
    t: 'mt',
    ti: 'Matching: Orthogonal Concepts & Decompositions',
    p: [
      { l: 'Orthogonal Complement V^⊥', r: 'Set of all vectors orthogonal to every vector in V' },
      { l: 'Orthogonal Matrix Q', r: 'Square matrix with Qᵀ = Q⁻¹ and orthonormal columns' },
      { l: 'QR Factorization A = QR', r: 'Q has orthonormal columns, R is upper triangular' },
      { l: 'Row(A)^⊥', r: 'Null(A) in ℝⁿ' }
    ]
  },
  {
    t: 'num',
    ti: 'Orthogonal Projection Scalar Coefficient',
    q: 'Compute the projection scalar coefficient \\(c = \\dfrac{\\mathbf{y}\\cdot\\mathbf{u}}{\\|\\mathbf{u}\\|^2}\\) when projecting \\(\\mathbf{y}=\\begin{pmatrix}4\\\\2\\\\4\\end{pmatrix}\\) onto \\(\\mathbf{u}=\\begin{pmatrix}2\\\\1\\\\2\\end{pmatrix}\\):',
    a: 2,
    tol: 0.001,
    h: 'y · u = 4(2) + 2(1) + 4(2) = 18. ‖u‖² = 2² + 1² + 2² = 9. Compute 18 / 9.',
    sol: 'y · u = 18 and ‖u‖² = 9. The scalar coefficient is 18 / 9 = 2.'
  },
  {
    t: 'ord',
    ti: 'Order the Steps: Gram–Schmidt Orthogonalization Process',
    q: 'Order the steps to convert linearly independent vectors {x₁, x₂, x₃} into an orthogonal basis {v₁, v₂, v₃}:',
    items: [
      'Set the first orthogonal basis vector v₁ = x₁',
      'Compute the projection of x₂ onto v₁: proj_{v₁}(x₂)',
      'Subtract the projection from x₂ to obtain v₂ = x₂ - proj_{v₁}(x₂)',
      'Compute projections of x₃ onto both v₁ and v₂',
      'Subtract both projections from x₃ to obtain v₃ = x₃ - proj_{v₁}(x₃) - proj_{v₂}(x₃)'
    ],
    sol: 'Gram–Schmidt iteratively subtracts components parallel to previously determined orthogonal basis vectors.'
  },
  {
    t: 'cat',
    ti: 'Classify Matrix and Subspace Orthogonal Relationships',
    categories: ['Orthogonal / Orthonormal Relationship', 'Not Necessarily Orthogonal'],
    items: [
      { s: 'A square matrix Q satisfying QᵀQ = I', cat: 0 },
      { s: 'The row space Row(A) and null space Null(A) in ℝⁿ', cat: 0 },
      { s: 'Two vectors u and v with u · v = 0', cat: 0 },
      { s: 'Two linearly independent vectors with non-zero dot product', cat: 1 },
      { s: 'Eigenvectors from different eigenspaces of an arbitrary non-symmetric matrix', cat: 1 }
    ],
    sol: 'Fundamental theorem of linear algebra establishes Row(A) ⊥ Null(A); QᵀQ = I defines orthonormal columns.'
  }
];

});
