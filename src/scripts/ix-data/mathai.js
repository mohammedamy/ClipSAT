/* Interactive Practice data for /mathai/ - one entry per chapter section id.
   Shipped as public/js/ix/mathai.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["ai-vectors-embeddings"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Cosine Similarity Properties",
    "q": "If two non-zero vectors in an embedding space point in exactly the same direction, what is their cosine similarity?",
    "o": [
      "1.0",
      "0.0",
      "-1.0",
      "π / 2"
    ],
    "a": 0,
    "ex": "Cosine similarity is cos(θ) = (u · v) / (||u|| ||v||). If they point in the identical direction, angle θ = 0, so cos(0) = 1.0 (maximum semantic alignment).",
    "ti_ar": "فحص سريع: خواص تشابه جيب التمام (Cosine Similarity)",
    "q_ar": "إذا كان متجهان غير صفريين في فضاء التمثيل الشعاعي يشيران إلى نفس الاتجاه تماماً، فما قيمة تشابه جيب التمام بينهما؟",
    "o_ar": [
      "1.0",
      "0.0",
      "-1.0",
      "π / 2"
    ],
    "ex_ar": "تشابه جيب التمام هو cos(θ) = (u · v) / (||u|| ||v||). إذا كان المتجهان في نفس الاتجاه، فإن الزاوية θ = 0، وبالتالي cos(0) = 1.0 (أعلى تطابق دلالي)."
  },
  {
    "t": "mt",
    "ti": "Matching: Vector Norms in Machine Learning",
    "p": [
      {
        "l": "L2 (Euclidean) Norm",
        "r": "Straight-line distance: √(x₁² + x₂² + ... + xₙ²)"
      },
      {
        "l": "L1 (Manhattan) Norm",
        "r": "Sum of absolute values: |x₁| + |x₂| + ... + |xₙ|"
      },
      {
        "l": "L∞ (Chebyshev) Norm",
        "r": "Maximum absolute component: max(|xᵢ|)"
      },
      {
        "l": "Unit Vector",
        "r": "Vector scaled to have norm equal to 1"
      }
    ],
    "ti_ar": "مطابقة: المعايير الاتجاهية في تعلم الآلة",
    "p_ar": [
      {
        "l": "معيار L2 (المسافة الإقليدية)",
        "r": "المسافة المستقيمة المباشرة: √(x₁² + x₂² + ... + xₙ²)"
      },
      {
        "l": "معيار L1 (مسافة مانهاتن)",
        "r": "مجموع القيم المطلقة للمركبات: |x₁| + |x₂| + ... + |xₙ|"
      },
      {
        "l": "معيار L∞ (الأقصى)",
        "r": "أكبر قيمة مطلقة بين مركبات المتجه: max(|xᵢ|)"
      },
      {
        "l": "متجه الوحدة",
        "r": "متجه تمت قسمته على معياره ليصبح طوله 1 تماماً"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Vectors, Norms & High-Dimensional Embeddings)",
    "q": "A student solves the equation \\(\\sqrt{2x + 9} = x - 3\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 9 = (x - 3)^2\\).",
      "Expand the right-hand side: \\(2x + 9 = x^2 - 6x + 9\\).",
      "Rearrange and factor: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 8\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{9} = -3\\) (\\(3 = -3\\)), which is false because the principal square root is non-negative (\\(x - 3 \\ge 0\\) requires \\(x \\ge 3\\)).",
      "Expanding \\((x - 3)^2\\) should give \\(x^2 - 9\\) with no middle term.",
      "Factoring \\(x^2 - 8x = 0\\) only yields \\(x = 8\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 9} = x - 3\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 3 \\ge 0 \\iff x \\ge 3\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 8\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (المتجهات والمسافات المعيارية والتمثيل الشعاعي (Embeddings))",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 9} = x - 3\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 9 = (x - 3)^2\\).",
      "فك المربع الكامل: \\(2x + 9 = x^2 - 6x + 9\\).",
      "الترتيب والتحليل: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 8\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(3 = -3\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 3\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 3 \\ge 0 \\implies x \\ge 3\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 8\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Vectors, Norms & High-Dimensional Embeddings)",
    "q": "Let \\(f(x) = x^2 - 6x + 10\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 10 = (x - 3)^2 + 1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 1\\) (or \\([1, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 3)^2 + 1 \\implies (x - 3)^2 = y - 1\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 1}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 1\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 1}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (المتجهات والمسافات المعيارية والتمثيل الشعاعي (Embeddings))",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 10\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 1}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Vectors, Norms & High-Dimensional Embeddings)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 10\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 10 - 3^2 =\\)",
        "a": "1",
        "h": "Subtract 9 from 10."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "5",
        "h": "Compute \\((2)^2 + 1\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (المتجهات والمسافات المعيارية والتمثيل الشعاعي (Embeddings))",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 10\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 10 - 3^2 =\\)",
        "a": "1",
        "h": "اطرح 9 من 10."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "5",
        "h": "احسب \\(4 + 1\\)."
      }
    ]
  },
  {
    "t": "tf",
    "ti": "True / False: Embeddings, Norms & Cosine Similarity",
    "ti_ar": "صح / خطأ: التضمينات المتجهة والمعايير وتشابه جيب التمام",
    "items": [
      {
        "s": "Cosine similarity between two non-zero vectors always lies in the interval [-1, 1].",
        "a": true
      },
      {
        "s": "Multiplying an embedding vector by a positive scalar c > 0 changes its cosine similarity with other vectors.",
        "a": false
      },
      {
        "s": "The L1 (Manhattan) norm of v = (3, -4) is 7, while its L2 (Euclidean) norm is 5.",
        "a": true
      }
    ],
    "items_ar": [
      {
        "s": "تشابه جيب التمام بين أي متجهين غير صفريين يقع دائماً في الفترة [-1, 1].",
        "a": true
      },
      {
        "s": "ضرب متجه التضمين في عدد موجب c > 0 يغيّر قيمة تشابه جيب التمام مع المتجهات الأخرى.",
        "a": false
      },
      {
        "s": "معيار L1 للمتجه v = (3, -4) يساوي 7، بينما معيار L2 الإقليدي له يساوي 5.",
        "a": true
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Dot Product of Embedding Vectors",
    "ti_ar": "إدخال رقمي: الضرب القياسي لمتجهات التضمين",
    "q": "Compute the dot product \\( \\mathbf{u} \\cdot \\mathbf{v} \\) for \\( \\mathbf{u} = [2, -1, 4] \\) and \\( \\mathbf{v} = [3, 5, 2] \\).",
    "q_ar": "احسب حاصل الضرب القياسي \\( \\mathbf{u} \\cdot \\mathbf{v} \\) للمتجهين \\( \\mathbf{u} = [2, -1, 4] \\) و \\( \\mathbf{v} = [3, 5, 2] \\).",
    "a": 9,
    "h": "Multiply corresponding components and sum: \\( (2)(3) + (-1)(5) + (4)(2) \\).",
    "h_ar": "اضرب المركبات المتناظرة واجمعها: \\( (2)(3) + (-1)(5) + (4)(2) \\).",
    "sol": "\\( \\mathbf{u} \\cdot \\mathbf{v} = 6 - 5 + 8 = 9 \\).",
    "sol_ar": "\\( \\mathbf{u} \\cdot \\mathbf{v} = 6 - 5 + 8 = 9 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Computing Cosine Similarity",
    "ti_ar": "رتّب الخطوات: حساب تشابه جيب التمام (Cosine Similarity)",
    "prompt": "Arrange the steps to compute the cosine similarity between \\( \\mathbf{a} = [3, 4] \\) and \\( \\mathbf{b} = [6, 8] \\):",
    "prompt_ar": "رتب خطوات حساب تشابه جيب التمام بين المتجهين \\( \\mathbf{a} = [3, 4] \\) و \\( \\mathbf{b} = [6, 8] \\):",
    "items": [
      "Compute the dot product: \\( \\mathbf{a} \\cdot \\mathbf{b} = (3)(6) + (4)(8) = 50 \\).",
      "Compute the Euclidean norms: \\( \\|\\mathbf{a}\\|_2 = 5 \\) and \\( \\|\\mathbf{b}\\|_2 = 10 \\).",
      "Multiply the two norms: \\( \\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2 = 5 \\times 10 = 50 \\).",
      "Divide the dot product by the product of norms: \\( \\cos(\\theta) = \\frac{50}{50} = 1.0 \\)."
    ],
    "items_ar": [
      "احسب الضرب القياسي: \\( \\mathbf{a} \\cdot \\mathbf{b} = (3)(6) + (4)(8) = 50 \\).",
      "احسب الطول الإقليدي لكل متجه: \\( \\|\\mathbf{a}\\|_2 = 5 \\) و \\( \\|\\mathbf{b}\\|_2 = 10 \\).",
      "اضرب المعيارين: \\( \\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2 = 5 \\times 10 = 50 \\).",
      "اقسم الضرب القياسي على حاصل ضرب المعيارين: \\( \\cos(\\theta) = \\frac{50}{50} = 1.0 \\)."
    ],
    "ex": "Cosine similarity normalizes the dot product by the L2 lengths of both vectors.",
    "ex_ar": "تشابه جيب التمام يقسم الضرب القياسي على حاصل ضرب طولي المتجهين."
  },
  {
    "t": "cat",
    "ti": "Categorize: Vector Alignment from Cosine Similarity",
    "ti_ar": "تصنيف: العلاقة الهندسية بين المتجهات حسب قيمة جيب التمام",
    "categories": [
      "Aligned / Similar (cos θ > 0)",
      "Orthogonal / Unrelated (cos θ = 0)",
      "Opposite / Antonymic (cos θ < 0)"
    ],
    "categories_ar": [
      "متقاربة بالمعنى (cos θ > 0)",
      "متعامدة / مستقلة (cos θ = 0)",
      "متعاكسة بالاتجاه (cos θ < 0)"
    ],
    "items": [
      {
        "s": "\\( \\mathbf{u} = [1, 2],\\; \\mathbf{v} = [2, 4] \\)",
        "s_ar": "\\( \\mathbf{u} = [1, 2],\\; \\mathbf{v} = [2, 4] \\)",
        "cat": 0
      },
      {
        "s": "\\( \\mathbf{u} = [2, 3],\\; \\mathbf{v} = [-3, 2] \\)",
        "s_ar": "\\( \\mathbf{u} = [2, 3],\\; \\mathbf{v} = [-3, 2] \\)",
        "cat": 1
      },
      {
        "s": "\\( \\mathbf{u} = [1, -1],\\; \\mathbf{v} = [-2, 2] \\)",
        "s_ar": "\\( \\mathbf{u} = [1, -1],\\; \\mathbf{v} = [-2, 2] \\)",
        "cat": 2
      },
      {
        "s": "\\( \\mathbf{u} = [1, 0],\\; \\mathbf{v} = [0, 5] \\)",
        "s_ar": "\\( \\mathbf{u} = [1, 0],\\; \\mathbf{v} = [0, 5] \\)",
        "cat": 1
      }
    ],
    "ex": "Sign of the dot product determines whether the angle is acute (>0), right (=0), or obtuse (<0).",
    "ex_ar": "إشارة الضرب القياسي تحدد ما إذا كانت الزاوية حادة (>0) أو قائمة (=0) أو منفرجة (<0)."
  }
];

D["ai-matrices-linear-layers"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Neural Layer Weight Matrix Dimensions",
    "q": "A dense neural network layer takes an input vector with 4 features and outputs 3 activations. What must be the dimensions of the weight matrix W in the forward pass y = Wx + b?",
    "o": [
      "3 × 4 (3 rows, 4 columns)",
      "4 × 3 (4 rows, 3 columns)",
      "4 × 4 (square matrix)",
      "3 × 3 (output square matrix)"
    ],
    "a": 0,
    "ex": "In y = Wx + b, x has shape (4 × 1) and y has shape (3 × 1). For matrix multiplication to be valid, W must have shape (3 × 4), because (3 × 4) · (4 × 1) = (3 × 1).",
    "ti_ar": "فحص سريع: أبعاد مصفوفة الأوزان في الطبقة العصبية",
    "q_ar": "تستقبل طبقة عصبية كثيفة متجهاً مدخلاً يحتوي على 4 خصائص وتنتج 3 مخرجات. ما الأبعاد الصحيحة لمصفوفة الأوزان W في المعادلة y = Wx + b؟",
    "o_ar": [
      "3 × 4 (3 صفوف، 4 أعمدة)",
      "4 × 3 (4 صفوف، 3 أعمدة)",
      "4 × 4 (مصفوفة مربعة)",
      "3 × 3 (مصفوفة مربعة للمخرجات)"
    ],
    "ex_ar": "في المعادلة y = Wx + b، المتجه x بعده (4 × 1) والمتجه y بعده (3 × 1). ولكي يصح ضرب المصفوفات، يجب أن تكون مصفوفة الأوزان W بأبعاد (3 × 4)، لأن (3 × 4) · (4 × 1) = (3 × 1)."
  },
  {
    "t": "mt",
    "ti": "Matching: Neural Activation Functions",
    "p": [
      {
        "l": "ReLU",
        "r": "f(z) = max(0, z); linear for positive, 0 for negative"
      },
      {
        "l": "Sigmoid",
        "r": "σ(z) = 1 / (1 + e⁻ᶻ); squashes input into (0, 1)"
      },
      {
        "l": "Softmax",
        "r": "Converts logits into a normalized probability distribution summing to 1"
      },
      {
        "l": "Identity",
        "r": "f(z) = z; used in regression output layers"
      }
    ],
    "ti_ar": "مطابقة: دوال التنشيط في الشبكات العصبية",
    "p_ar": [
      {
        "l": "دالة ReLU",
        "r": "f(z) = max(0, z)؛ خطية للقيم الموجبة وصفر للقيم السالبة"
      },
      {
        "l": "دالة السيجمويد (Sigmoid)",
        "r": "σ(z) = 1 / (1 + e⁻ᶻ)؛ تحصر القيم داخل الفترة (0, 1)"
      },
      {
        "l": "دالة سوفت ماكس (Softmax)",
        "r": "تحول القيم إلى توزيع احتمالي معياري مجموعه 1"
      },
      {
        "l": "الدالة المطابقة (Identity)",
        "r": "f(z) = z؛ تُستخدم في طبقة المخرجات لمهام الانحدار"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Matrices, Linear Layers & Activation Functions)",
    "q": "A student solves the equation \\(\\sqrt{2x + 16} = x - 4\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 16 = (x - 4)^2\\).",
      "Expand the right-hand side: \\(2x + 16 = x^2 - 8x + 16\\).",
      "Rearrange and factor: \\(x^2 - 10x = 0 \\implies x(x - 10) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 10\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{16} = -4\\) (\\(4 = -4\\)), which is false because the principal square root is non-negative (\\(x - 4 \\ge 0\\) requires \\(x \\ge 4\\)).",
      "Expanding \\((x - 4)^2\\) should give \\(x^2 - 16\\) with no middle term.",
      "Factoring \\(x^2 - 10x = 0\\) only yields \\(x = 10\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 16} = x - 4\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 4 \\ge 0 \\iff x \\ge 4\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 10\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (المصفوفات والطبقات الخطية في الشبكات العصبية ودوال التنشيط)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 16} = x - 4\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 16 = (x - 4)^2\\).",
      "فك المربع الكامل: \\(2x + 16 = x^2 - 8x + 16\\).",
      "الترتيب والتحليل: \\(x^2 - 10x = 0 \\implies x(x - 10) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 10\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(4 = -4\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 4\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 4 \\ge 0 \\implies x \\ge 4\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 10\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Matrices, Linear Layers & Activation Functions)",
    "q": "Let \\(f(x) = x^2 - 8x + 20\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 20 = (x - 4)^2 + 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 4\\) (or \\([4, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 4)^2 + 4 \\implies (x - 4)^2 = y - 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - 4}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 4\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 4}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (المصفوفات والطبقات الخطية في الشبكات العصبية ودوال التنشيط)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 20\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 4}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Matrices, Linear Layers & Activation Functions)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 8x + 20\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "4",
        "h": "Take half of 8."
      },
      {
        "l": "Compute the minimum value \\(k = 20 - 4^2 =\\)",
        "a": "4",
        "h": "Subtract 16 from 20."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 6\\): \\(y =\\)",
        "a": "8",
        "h": "Compute \\((2)^2 + 4\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (المصفوفات والطبقات الخطية في الشبكات العصبية ودوال التنشيط)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 8x + 20\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "4",
        "h": "اقسم معامل x وهو 8 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 20 - 4^2 =\\)",
        "a": "4",
        "h": "اطرح 16 من 20."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 6\\):",
        "a": "8",
        "h": "احسب \\(4 + 4\\)."
      }
    ]
  },
  {
    "t": "tf",
    "ti": "True / False: Neural Network Layers & Activation Functions",
    "ti_ar": "صح / خطأ: طبقات الشبكات العصبية ودوال التنشيط",
    "items": [
      {
        "s": "Without non-linear activation functions, stacking multiple dense layers collapses into a single linear transformation.",
        "a": true
      },
      {
        "s": "If W has shape (16, 64) and x has shape (64, 1), the output Wx has shape (16, 1).",
        "a": true
      },
      {
        "s": "The ReLU function ReLU(z) = max(0, z) outputs -5 when z = -5.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "بدون دوال تنشيط غير خطية، فإن تكديس عدة طبقات خطية يختزل إلى تحويل خطي واحد فقط.",
        "a": true
      },
      {
        "s": "إذا كانت أبعاد W هي (16, 64) وأبعاد x هي (64, 1)، فإن أبعاد الناتج Wx هي (16, 1).",
        "a": true
      },
      {
        "s": "دالة ReLU(z) = max(0, z) تعطي الناتج -5 عندما تكون z = -5.",
        "a": false
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Forward Pass through a ReLU Neuron",
    "ti_ar": "إدخال رقمي: التمرير الأمامي عبر خلية عصبية بدالة ReLU",
    "q": "Compute \\( a = \\text{ReLU}(\\mathbf{w}^T\\mathbf{x} + b) \\) given \\( \\mathbf{w} = [2, -3] \\), \\( \\mathbf{x} = [5, 1] \\), and bias \\( b = 4 \\).",
    "q_ar": "احسب مخرج الخلية \\( a = \\text{ReLU}(\\mathbf{w}^T\\mathbf{x} + b) \\) إذا كان \\( \\mathbf{w} = [2, -3] \\) و \\( \\mathbf{x} = [5, 1] \\) والانحياز \\( b = 4 \\).",
    "a": 11,
    "h": "First compute the pre-activation \\( z = (2)(5) + (-3)(1) + 4 \\), then apply \\( \\max(0, z) \\).",
    "h_ar": "احسب أولاً \\( z = (2)(5) + (-3)(1) + 4 \\)، ثم طبّق \\( \\max(0, z) \\).",
    "sol": "\\( z = 10 - 3 + 4 = 11 \\). Since \\( 11 > 0 \\), \\( \\text{ReLU}(11) = 11 \\).",
    "sol_ar": "\\( z = 10 - 3 + 4 = 11 \\)، وبما أن الناتج موجب فإن \\( \\text{ReLU}(11) = 11 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Dense Layer Forward Propagation",
    "ti_ar": "رتّب الخطوات: التمرير الأمامي في طبقة كثيفة (Dense Layer)",
    "prompt": "Arrange the steps to compute the activated output \\( \\mathbf{a} = \\sigma(W\\mathbf{x} + \\mathbf{b}) \\) of a neural layer:",
    "prompt_ar": "رتب خطوات حساب المخرج المنشط \\( \\mathbf{a} = \\sigma(W\\mathbf{x} + \\mathbf{b}) \\) لطبقة عصبية:",
    "items": [
      "Verify dimension compatibility: weight matrix \\( W \\in \\mathbb{R}^{m \\times n} \\) matches input vector \\( \\mathbf{x} \\in \\mathbb{R}^{n \\times 1} \\).",
      "Compute the linear matrix-vector product \\( \\mathbf{u} = W\\mathbf{x} \\in \\mathbb{R}^{m \\times 1} \\).",
      "Add the bias vector \\( \\mathbf{b} \\in \\mathbb{R}^{m \\times 1} \\) to obtain pre-activation logits \\( \\mathbf{z} = \\mathbf{u} + \\mathbf{b} \\).",
      "Apply the non-linear activation function \\( \\sigma(\\cdot) \\) element-wise to produce \\( \\mathbf{a} = \\sigma(\\mathbf{z}) \\)."
    ],
    "items_ar": [
      "تحقق من توافق الأبعاد: مصفوفة الأوزان \\( W \\in \\mathbb{R}^{m \\times n} \\) تتوافق مع المتجه \\( \\mathbf{x} \\in \\mathbb{R}^{n \\times 1} \\).",
      "احسب حاصل ضرب المصفوفة في المتجه \\( \\mathbf{u} = W\\mathbf{x} \\in \\mathbb{R}^{m \\times 1} \\).",
      "أضف متجه الانحياز \\( \\mathbf{b} \\) للحصول على متجه ما قبل التنشيط \\( \\mathbf{z} = \\mathbf{u} + \\mathbf{b} \\).",
      "طبّق دالة التنشيط غير الخطية \\( \\sigma(\\cdot) \\) على كل عنصر لإنتاج \\( \\mathbf{a} = \\sigma(\\mathbf{z}) \\)."
    ],
    "ex": "A dense layer performs an affine map z = Wx + b followed by an element-wise activation σ(z).",
    "ex_ar": "تنفذ الطبقة الكثيفة تحويلاً خطياً تآلفياً z = Wx + b متبوعاً بدالة تنشيط غير خطية σ(z)."
  },
  {
    "t": "cat",
    "ti": "Categorize: Activation Function Properties",
    "ti_ar": "تصنيف: خصائص دوال التنشيط في التعلم العميق",
    "categories": [
      "ReLU(z) = max(0, z)",
      "Sigmoid σ(z) = 1/(1 + e^{-z})",
      "Softmax(z_i)"
    ],
    "categories_ar": [
      "دالة ReLU(z) = max(0, z)",
      "دالة السيجمويد σ(z) = 1/(1 + e^{-z})",
      "دالة Softmax(z_i)"
    ],
    "items": [
      {
        "s": "Outputs zero for all negative inputs and has derivative 1 for positive inputs",
        "s_ar": "تعطي صفراً للمدخلات السالبة ومشتقتها 1 للمدخلات الموجبة",
        "cat": 0
      },
      {
        "s": "Maps any real scalar into a single probability in (0, 1) for binary classification",
        "s_ar": "تحول أي عدد حقيقي إلى احتمال بين (0, 1) للتصنيف الثنائي",
        "cat": 1
      },
      {
        "s": "Converts a vector of K logits into a probability distribution summing to 1",
        "s_ar": "تحول متجهاً من K قيمة إلى توزيع احتمالي مجموعه 1 للتصنيف المتعدد",
        "cat": 2
      },
      {
        "s": "At z = 0, its output equals exactly 0.5 and its derivative is 0.25",
        "s_ar": "عند z = 0 يكون مخرجها 0.5 ومشتقتها 0.25 تماماً",
        "cat": 1
      }
    ],
    "ex": "ReLU is standard for hidden layers; Sigmoid for binary outputs; Softmax for multi-class distributions.",
    "ex_ar": "تُستخدم ReLU للطبقات الخفية، وSigmoid للتصنيف الثنائي، وSoftmax للتصنيف متعدد الفئات."
  }
];

D["ai-gradient-descent"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Direction of the Gradient Vector",
    "q": "In multivariable calculus, in which direction does the gradient vector ∇L(w) point?",
    "o": [
      "In the direction of steepest increase of the loss function",
      "In the direction of steepest decrease of the loss function",
      "Perpendicular to the contours, pointing strictly towards zero",
      "Along the tangent line where the derivative is always zero"
    ],
    "a": 0,
    "ex": "The gradient ∇L points in the direction of maximum ascent (steepest increase). Therefore, to minimize loss, Gradient Descent updates parameters in the OPPOSITE direction: w ← w - η ∇L.",
    "ti_ar": "فحص سريع: اتجاه متجه التدرج (Gradient Vector)",
    "q_ar": "في التفاضل متعدد المتغيرات، إلى أي اتجاه يشير متجه التدرج ∇L(w)؟",
    "o_ar": [
      "في اتجاه أسرع زيادة (أقصى صعود) لدالة الخسارة",
      "في اتجاه أسرع انخفاض (أقصى هبوط) لدالة الخسارة",
      "عمودياً على خطوط الكنتور متجهاً نحو الصفر دائماً",
      "على طول المماس حيث المشتقة تساوي صفراً دائماً"
    ],
    "ex_ar": "يشير متجه التدرج ∇L دائماً إلى اتجاه أقصى زيادة. لذلك، لتقليل الخسارة في خوارزمية الانحدار التدريجي، نتحرك في الاتجاه المعاكس: w ← w - η ∇L."
  },
  {
    "t": "tf",
    "ti": "True / False: Gradient Descent & Learning Rates",
    "items": [
      {
        "s": "If the learning rate η is excessively large, gradient descent can overshoot and diverge.",
        "a": true
      },
      {
        "s": "At a local or global minimum of a smooth loss function, the gradient vector is equal to zero (∇L = 0).",
        "a": true
      },
      {
        "s": "Mean Squared Error (MSE) for linear regression is a non-convex function with multiple local minima.",
        "a": false
      }
    ],
    "ti_ar": "صح / خطأ: الانحدار التدريجي ومعدل التعلم",
    "items_ar": [
      {
        "s": "إذا كان معدل التعلم η كبيراً بشكل مفرط، فإن الانحدار التدريجي قد يتجاوز الهدف ويتباعد.",
        "a": true
      },
      {
        "s": "عند النقطة الصغرى المحلية أو العامة لدالة خسارة ملساء، يكون متجه التدرج مساوياً للصفر (∇L = 0).",
        "a": true
      },
      {
        "s": "دالة متوسط مربعات الخطأ (MSE) للانحدار الخطي هي دالة غير محدبة تمتلك نقاطاً صغرى محلية متعددة.",
        "a": false
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Loss Functions, Gradients & Optimization)",
    "q": "A student solves the equation \\(\\sqrt{2x + 9} = x - 3\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 9 = (x - 3)^2\\).",
      "Expand the right-hand side: \\(2x + 9 = x^2 - 6x + 9\\).",
      "Rearrange and factor: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 8\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{9} = -3\\) (\\(3 = -3\\)), which is false because the principal square root is non-negative (\\(x - 3 \\ge 0\\) requires \\(x \\ge 3\\)).",
      "Expanding \\((x - 3)^2\\) should give \\(x^2 - 9\\) with no middle term.",
      "Factoring \\(x^2 - 8x = 0\\) only yields \\(x = 8\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 9} = x - 3\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 3 \\ge 0 \\iff x \\ge 3\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 8\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (دوال الخسارة والانحدار التدريجي والتحسين الرياضي)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 9} = x - 3\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 9 = (x - 3)^2\\).",
      "فك المربع الكامل: \\(2x + 9 = x^2 - 6x + 9\\).",
      "الترتيب والتحليل: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 8\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(3 = -3\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 3\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 3 \\ge 0 \\implies x \\ge 3\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 8\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Loss Functions, Gradients & Optimization)",
    "q": "Let \\(f(x) = x^2 - 6x + 16\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 16 = (x - 3)^2 + 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 7\\) (or \\([7, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 3)^2 + 7 \\implies (x - 3)^2 = y - 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 7}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 7\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 7}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (دوال الخسارة والانحدار التدريجي والتحسين الرياضي)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 16\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 7}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Loss Functions, Gradients & Optimization)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 16\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 16 - 3^2 =\\)",
        "a": "7",
        "h": "Subtract 9 from 16."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "11",
        "h": "Compute \\((2)^2 + 7\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (دوال الخسارة والانحدار التدريجي والتحسين الرياضي)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 16\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 16 - 3^2 =\\)",
        "a": "7",
        "h": "اطرح 9 من 16."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "11",
        "h": "احسب \\(4 + 7\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Loss Functions, Gradients & Optimization)",
    "p": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "Line is tangent to the quadratic curve (1 repeated root)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "Equals \\(\\text{ran}(f)\\) (Range of original function)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "Translation by vector \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "Vieta's root-coefficient relations"
      }
    ],
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (دوال الخسارة والانحدار التدريجي والتحسين الرياضي)",
    "p_ar": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "المستقيم مماس للمنحنى التربيعي (جذر حقيقي مكرر)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "يساوي مدى الدالة الأصلية \\(\\text{ran}(f)\\)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "إزاحة هندسية بالمتجه \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "علاقات فييت بين الجذور والمعاملات"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Single Step of Gradient Descent",
    "ti_ar": "إدخال رقمي: خطوة تحديث واحدة في الانحدار التدريجي",
    "q": "Minimize \\( L(w) = (w - 3)^2 \\) starting from \\( w_0 = 7 \\) with learning rate \\( \\eta = 0.25 \\). Find the updated weight \\( w_1 \\).",
    "q_ar": "لتقليل دالة الخسارة \\( L(w) = (w - 3)^2 \\) بدءاً من \\( w_0 = 7 \\) بمعدل تعلم \\( \\eta = 0.25 \\)، أوجد الوزن المحدّث \\( w_1 \\).",
    "a": 5,
    "h": "Compute \\( L'(w_0) = 2(7 - 3) = 8 \\), then apply \\( w_1 = w_0 - \\eta L'(w_0) \\).",
    "h_ar": "احسب المشتقة \\( L'(7) = 2(7 - 3) = 8 \\)، ثم طبّق \\( w_1 = w_0 - \\eta L'(w_0) \\).",
    "sol": "\\( w_1 = 7 - 0.25(8) = 7 - 2 = 5 \\).",
    "sol_ar": "\\( w_1 = 7 - 0.25(8) = 7 - 2 = 5 \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Backpropagation & Weight Update Loop",
    "ti_ar": "رتّب الخطوات: حلقة الانتشار الخلفي وتحديث الأوزان",
    "prompt": "Arrange the four core phases of a single training iteration in gradient descent:",
    "prompt_ar": "رتب المراحل الأربع الأساسية لتكرار تدريبي واحد باستخدام الانحدار التدريجي:",
    "items": [
      "Forward Pass: Compute model predictions \\( \\hat{y} = f_\\theta(x) \\) for the current batch.",
      "Loss Evaluation: Compute the scalar objective loss \\( \\mathcal{L}(\\hat{y}, y) \\).",
      "Backward Pass: Apply the chain rule to compute gradients \\( \\nabla_\\theta \\mathcal{L} \\).",
      "Parameter Update: Step opposite the gradient via \\( \\theta \\leftarrow \\theta - \\eta \\nabla_\\theta \\mathcal{L} \\)."
    ],
    "items_ar": [
      "التمرير الأمامي: حساب توقعات النموذج \\( \\hat{y} = f_\\theta(x) \\) للدفعة الحالية.",
      "حساب الخسارة: تقييم دالة الخسارة القياسية \\( \\mathcal{L}(\\hat{y}, y) \\).",
      "الانتشار الخلفي: تطبيق قاعدة السلسلة لحساب متجه التدرج \\( \\nabla_\\theta \\mathcal{L} \\).",
      "تحديث المعاملات: التحرك عكس اتجاه التدرج وفق \\( \\theta \\leftarrow \\theta - \\eta \\nabla_\\theta \\mathcal{L} \\)."
    ],
    "ex": "Every neural network optimizer repeats Forward → Loss → Backward (Grad) → Step.",
    "ex_ar": "تكرر خوارزميات التدريب دائماً التسلسل: التمرير الأمامي ← حساب الخسارة ← حساب التدرج ← تحديث الأوزان."
  },
  {
    "t": "cat",
    "ti": "Categorize: Learning Rate η Regime Diagnosis",
    "ti_ar": "تصنيف: تشخيص سلوك معدل التعلم η",
    "categories": [
      "Learning Rate Too Small (η ≪ 1)",
      "Well-Tuned Learning Rate",
      "Learning Rate Too Large (Overshooting)"
    ],
    "categories_ar": [
      "معدل تعلم صغير جداً (بطء شديد)",
      "معدل تعلم مثالي ومتوازن",
      "معدل تعلم كبير جداً (تذبذب وتباعد)"
    ],
    "items": [
      {
        "s": "Loss decreases smoothly and converges rapidly to the global minimum",
        "s_ar": "تنخفض الخسارة بسلاسة وتتقارب سريعاً نحو النهاية الصغرى",
        "cat": 1
      },
      {
        "s": "Loss oscillates wildly across the valley and diverges to infinity",
        "s_ar": "تتذبذب الخسارة بشدة على جانبي القاع وتتباعد إلى ما لا نهاية",
        "cat": 2
      },
      {
        "s": "Loss decreases by tiny fractions per epoch, requiring millions of steps",
        "s_ar": "تنخفض الخسارة بمقدار ضئيل جداً في كل حقبة وتتطلب ملايين الخطوات",
        "cat": 0
      },
      {
        "s": "For L(w) = w², choosing η = 1.2 so that |1 − 2η| = 1.4 > 1",
        "s_ar": "في الدالة L(w) = w²، اختيار η = 1.2 بحيث يصبح معامل التحديث |1 − 2η| = 1.4 > 1",
        "cat": 2
      }
    ],
    "ex": "Too small η stalls training; too large η overshoots the valley walls and diverges.",
    "ex_ar": "معدل التعلم الصغير جداً يبطئ التدريب، والكبير جداً يتجاوز القاع ويؤدي للتباعد."
  }
];

D["ai-probability-bayes"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Components of Bayes' Theorem",
    "q": "In the Bayesian formula P(θ | D) = P(D | θ) P(θ) / P(D), what is the term P(θ) called?",
    "o": [
      "Prior probability (belief before observing data)",
      "Likelihood (probability of data given parameters)",
      "Posterior probability (updated belief after observing data)",
      "Marginal evidence (normalizing constant)"
    ],
    "a": 0,
    "ex": "P(θ) is the Prior (knowledge/belief prior to evidence), P(D|θ) is the Likelihood, P(D) is the Evidence, and P(θ|D) is the Posterior.",
    "ti_ar": "فحص سريع: مكونات مبرهنة بايز",
    "q_ar": "في صيغة بايز P(θ | D) = P(D | θ) P(θ) / P(D)، ماذا يُسمى الحد P(θ)؟",
    "o_ar": [
      "الاحتمال القبلي (المعتقد المسبق قبل رصد البيانات)",
      "الاحتمال الإمكاني (Likelihood - إمكانية ظهور البيانات في ظل المعلمات)",
      "الاحتمال البعدي (المعتقد المحدَّث بعد رصد البيانات)",
      "الدليل الإجمالي (ثابت المعايرة)"
    ],
    "ex_ar": "الحد P(θ) هو الاحتمال القبلي (Prior)، و P(D|θ) هو الإمكانية (Likelihood)، و P(θ|D) هو الاحتمال البعدي (Posterior)."
  },
  {
    "t": "mt",
    "ti": "Matching: Bayesian Terminology",
    "p": [
      {
        "l": "Prior P(C)",
        "r": "Baseline probability of a category before seeing features"
      },
      {
        "l": "Likelihood P(x|C)",
        "r": "Probability that a category produces the observed features"
      },
      {
        "l": "Posterior P(C|x)",
        "r": "Updated classification probability given observed features"
      },
      {
        "l": "Evidence P(x)",
        "r": "Total probability of the features across all categories"
      }
    ],
    "ti_ar": "مطابقة: مصطلحات الاستدلال البايزي",
    "p_ar": [
      {
        "l": "الاحتمال القبلي P(C)",
        "r": "الاحتمال الأساسي للفئة قبل رؤية الخصائص والملاحظات"
      },
      {
        "l": "الاحتمال الإمكاني P(x|C)",
        "r": "احتمال أن تنتج الفئة الخصائص المرصودة المحددة"
      },
      {
        "l": "الاحتمال البعدي P(C|x)",
        "r": "احتمال التصنيف المحدث بعد مشاهدة الخصائص"
      },
      {
        "l": "الدليل الإجمالي P(x)",
        "r": "المجموع الكلي لاحتمال ظهور الخصائص عبر جميع الفئات"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Conditional Probability, Bayes' Rule & Classifiers)",
    "q": "A student solves the equation \\(\\sqrt{2x + 25} = x - 5\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 25 = (x - 5)^2\\).",
      "Expand the right-hand side: \\(2x + 25 = x^2 - 10x + 25\\).",
      "Rearrange and factor: \\(x^2 - 12x = 0 \\implies x(x - 12) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 12\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{25} = -5\\) (\\(5 = -5\\)), which is false because the principal square root is non-negative (\\(x - 5 \\ge 0\\) requires \\(x \\ge 5\\)).",
      "Expanding \\((x - 5)^2\\) should give \\(x^2 - 25\\) with no middle term.",
      "Factoring \\(x^2 - 12x = 0\\) only yields \\(x = 12\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 25} = x - 5\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 5 \\ge 0 \\iff x \\ge 5\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 12\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (الاحتمال الشرطي وقاعدة بايز ومصنفات الذكاء الاصطناعي)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 25} = x - 5\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 25 = (x - 5)^2\\).",
      "فك المربع الكامل: \\(2x + 25 = x^2 - 10x + 25\\).",
      "الترتيب والتحليل: \\(x^2 - 12x = 0 \\implies x(x - 12) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 12\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(5 = -5\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 5\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 5 \\ge 0 \\implies x \\ge 5\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 12\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Conditional Probability, Bayes' Rule & Classifiers)",
    "q": "Let \\(f(x) = x^2 - 10x + 28\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 28 = (x - 5)^2 + 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 3\\) (or \\([3, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 5)^2 + 3 \\implies (x - 5)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (الاحتمال الشرطي وقاعدة بايز ومصنفات الذكاء الاصطناعي)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 28\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 3}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Conditional Probability, Bayes' Rule & Classifiers)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 10x + 28\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "5",
        "h": "Take half of 10."
      },
      {
        "l": "Compute the minimum value \\(k = 28 - 5^2 =\\)",
        "a": "3",
        "h": "Subtract 25 from 28."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 7\\): \\(y =\\)",
        "a": "7",
        "h": "Compute \\((2)^2 + 3\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (الاحتمال الشرطي وقاعدة بايز ومصنفات الذكاء الاصطناعي)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 10x + 28\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "5",
        "h": "اقسم معامل x وهو 10 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 28 - 5^2 =\\)",
        "a": "3",
        "h": "اطرح 25 من 28."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 7\\):",
        "a": "7",
        "h": "احسب \\(4 + 3\\)."
      }
    ]
  },
  {
    "t": "tf",
    "ti": "True / False: Conditional Probability & Bayes' Rule",
    "ti_ar": "صح / خطأ: الاحتمال الشرطي وقاعدة بايز",
    "items": [
      {
        "s": "In general, P(A | B) is not equal to P(B | A) unless the prior probabilities P(A) and P(B) are equal.",
        "a": true
      },
      {
        "s": "If events A and B are independent with P(B) > 0, then P(A | B) = P(A).",
        "a": true
      },
      {
        "s": "A Naive Bayes classifier assumes all input features are maximally correlated with one another.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "بشكل عام، P(A | B) لا يساوي P(B | A) إلا إذا تساوى الاحتمالان القبليان P(A) و P(B).",
        "a": true
      },
      {
        "s": "إذا كان الحدثان A و B مستقلين وكان P(B) > 0، فإن P(A | B) = P(A).",
        "a": true
      },
      {
        "s": "يفترض مصنف بايز الساذج (Naive Bayes) أن جميع الخصائص المدخلة مرتبطة ببعضها ارتباطاً تاماً.",
        "a": false
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Bayes' Theorem Posterior Probability (%)",
    "ti_ar": "إدخال رقمي: حساب الاحتمال البعدي بنظرية بايز (%)",
    "q": "Given prior \\( P(A) = 0.2 \\), likelihood \\( P(B|A) = 0.9 \\), and \\( P(B|\\neg A) = 0.15 \\), find the posterior probability \\( P(A|B) \\) as a percentage.",
    "q_ar": "إذا كان الاحتمال القبلي \\( P(A) = 0.2 \\)، و \\( P(B|A) = 0.9 \\)، و \\( P(B|\\neg A) = 0.15 \\)، فأوجد الاحتمال البعدي \\( P(A|B) \\) كنسبة مئوية.",
    "a": 60,
    "h": "Compute \\( P(B) = (0.2)(0.9) + (0.8)(0.15) = 0.18 + 0.12 = 0.30 \\), then \\( P(A|B) = \\frac{0.18}{0.30} \\).",
    "h_ar": "احسب \\( P(B) = 0.18 + 0.12 = 0.30 \\)، ثم اقسم \\( \\frac{0.18}{0.30} \\) وحوّل لنسبة مئوية.",
    "sol": "\\( P(A|B) = \\frac{0.18}{0.18 + 0.12} = \\frac{0.18}{0.30} = 0.60 = 60\\% \\).",
    "sol_ar": "\\( P(A|B) = \\frac{0.18}{0.30} = 0.60 = 60\\% \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Diagnostic Test Posterior Calculation",
    "ti_ar": "رتّب الخطوات: حساب الاحتمال البعدي في فحص تشخيصي",
    "prompt": "Arrange the steps to compute the posterior probability \\( P(D \\mid +) \\) using Bayes' Theorem:",
    "prompt_ar": "رتب خطوات حساب الاحتمال البعدي للإصابة \\( P(D \\mid +) \\) باستخدام قانون بايز:",
    "items": [
      "Identify the prior prevalence \\( P(D) \\) and complement \\( P(\\neg D) = 1 - P(D) \\).",
      "Compute the true-positive joint probability \\( P(+ \\cap D) = P(+ \\mid D)P(D) \\).",
      "Compute the total probability of a positive test \\( P(+) = P(+ \\mid D)P(D) + P(+ \\mid \\neg D)P(\\neg D) \\).",
      "Divide the true-positive probability by total positive probability: \\( P(D \\mid +) = \\frac{P(+ \\cap D)}{P(+)} \\)."
    ],
    "items_ar": [
      "حدد الاحتمال القبلي \\( P(D) \\) والمكمل \\( P(\\neg D) = 1 - P(D) \\).",
      "احسب احتمال الإيجابية الحقيقية المشترك \\( P(+ \\cap D) = P(+ \\mid D)P(D) \\).",
      "احسب الاحتمال الكلي للنتيجة الموجبة \\( P(+) = P(+ \\mid D)P(D) + P(+ \\mid \\neg D)P(\\neg D) \\).",
      "اقسم احتمال الإيجابية الحقيقية على الاحتمال الكلي: \\( P(D \\mid +) = \\frac{P(+ \\cap D)}{P(+)} \\)."
    ],
    "ex": "Bayes' rule divides the true-positive branch by the sum of all positive branches.",
    "ex_ar": "يقسم قانون بايز فرع الإيجابية الحقيقية على مجموع كافة الفروع الموجبة."
  },
  {
    "t": "cat",
    "ti": "Categorize: Components of Bayes' Theorem P(Y|X) = P(X|Y)P(Y)/P(X)",
    "ti_ar": "تصنيف: مكونات معادلة بايز P(Y|X) = P(X|Y)P(Y)/P(X)",
    "categories": [
      "Prior Belief",
      "Likelihood / Generative Model",
      "Posterior / Evidence"
    ],
    "categories_ar": [
      "الاحتمال القبلي (Prior)",
      "دالة المعقولية (Likelihood)",
      "الاحتمال البعدي / الدليل (Posterior / Evidence)"
    ],
    "items": [
      {
        "s": "\\( P(Y) \\): Baseline class probability before observing features \\( X \\)",
        "s_ar": "\\( P(Y) \\): احتمال الفئة الأساسي قبل رصد البيانات \\( X \\)",
        "cat": 0
      },
      {
        "s": "\\( P(X \\mid Y) \\): Probability of generating feature \\( X \\) given class \\( Y \\)",
        "s_ar": "\\( P(X \\mid Y) \\): احتمال ظهور الخاصية \\( X \\) بشرط الفئة \\( Y \\)",
        "cat": 1
      },
      {
        "s": "\\( P(Y \\mid X) \\): Updated class probability after observing \\( X \\)",
        "s_ar": "\\( P(Y \\mid X) \\): احتمال الفئة المحدّث بعد رصد \\( X \\)",
        "cat": 2
      },
      {
        "s": "\\( P(X) = \\sum_y P(X \\mid y)P(y) \\): Marginal normalizing constant",
        "s_ar": "\\( P(X) = \\sum_y P(X \\mid y)P(y) \\): ثابت التطبيع الهامشي",
        "cat": 2
      }
    ],
    "ex": "Posterior ∝ Likelihood × Prior.",
    "ex_ar": "الاحتمال البعدي يتناسب طردياً مع حاصل ضرب المعقولية في الاحتمال القبلي."
  }
];

D["ai-distributions-mle"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Log-Likelihood vs Likelihood",
    "q": "Why do machine learning algorithms maximize the Log-Likelihood ln L(θ) instead of the original Likelihood product L(θ)?",
    "o": [
      "Logarithm converts products into sums, preventing numerical underflow and simplifying derivatives",
      "Logarithm changes the location of the maximum to make it easier to reach",
      "Logarithm makes negative probabilities positive",
      "Likelihood functions cannot be differentiated without taking logarithms first"
    ],
    "a": 0,
    "ex": "Because probabilities are numbers in [0, 1], multiplying thousands of them causes floating-point underflow (rounds to 0). The logarithm is strictly monotonically increasing, so argmax ln L(θ) = argmax L(θ), and converts products into sums.",
    "ti_ar": "فحص سريع: لوغاريتم الإمكانية مقابل دالة الإمكانية",
    "q_ar": "لماذا تقوم خوارزميات تعلم الآلة بتعظيم لوغاريتم الإمكانية ln L(θ) بدلاً من حاصل ضرب الإمكانية الأصلي L(θ)؟",
    "o_ar": [
      "لأن اللوغاريتم يحول حاصل الضرب إلى جمع، مما يمنع التلاشي الرقمي ويبسط المشتقات",
      "لأن اللوغاريتم يغير موقع النقطة العظمى لتسهيل الوصول إليها",
      "لأن اللوغاريتم يحول الاحتمالات السالبة إلى موجبة",
      "لأنه لا يمكن اشتقاق دوال الإمكانية دون أخذ اللوغاريتم أولاً"
    ],
    "ex_ar": "لأن الاحتمالات أعداد بين 0 و 1، وضرب الآلاف منها يؤدي إلى التلاشي الرقمي الصغير (underflow). وبما أن اللوغاريتم دالة تزايدية تماماً، فإن موضع النقطة العظمى لا يتغير، وتتحول عمليات الضرب المعقدة إلى عمليات جمع يسيرة الاشتقاق."
  },
  {
    "t": "tf",
    "ti": "True / False: Gaussian Distribution & MLE",
    "items": [
      {
        "s": "The Maximum Likelihood Estimator (MLE) for the mean of a Gaussian distribution is the sample arithmetic mean.",
        "a": true
      },
      {
        "s": "The normal distribution curve is symmetric around its mean μ.",
        "a": true
      },
      {
        "s": "Maximizing the log-likelihood of a Gaussian with fixed variance is mathematically equivalent to minimizing the Sum of Squared Errors.",
        "a": true
      }
    ],
    "ti_ar": "صح / خطأ: التوزيع الطبيعي وتقدير الإمكان الأقصى",
    "items_ar": [
      {
        "s": "مقدّر الإمكان الأقصى (MLE) لمتوسط التوزيع الطبيعي هو الوسط الحسابي للعينات المرصودة.",
        "a": true
      },
      {
        "s": "منحنى التوزيع الطبيعي (الجرس) متماثل تماماً حول وسطه الحسابي μ.",
        "a": true
      },
      {
        "s": "تعظيم لوغاريتم الإمكانية لتوزيع طبيعي بتباين ثابت يكافئ رياضياً تصغير مجموع مربعات الخطأ.",
        "a": true
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Probability Distributions & Maximum Likelihood (MLE))",
    "q": "A student solves the equation \\(\\sqrt{2x + 9} = x - 3\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 9 = (x - 3)^2\\).",
      "Expand the right-hand side: \\(2x + 9 = x^2 - 6x + 9\\).",
      "Rearrange and factor: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 8\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{9} = -3\\) (\\(3 = -3\\)), which is false because the principal square root is non-negative (\\(x - 3 \\ge 0\\) requires \\(x \\ge 3\\)).",
      "Expanding \\((x - 3)^2\\) should give \\(x^2 - 9\\) with no middle term.",
      "Factoring \\(x^2 - 8x = 0\\) only yields \\(x = 8\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 9} = x - 3\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 3 \\ge 0 \\iff x \\ge 3\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 8\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (التوزيعات الاحتمالية وتقدير الاحتمال الأقصى (MLE))",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 9} = x - 3\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 9 = (x - 3)^2\\).",
      "فك المربع الكامل: \\(2x + 9 = x^2 - 6x + 9\\).",
      "الترتيب والتحليل: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 8\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(3 = -3\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 3\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 3 \\ge 0 \\implies x \\ge 3\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 8\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Probability Distributions & Maximum Likelihood (MLE))",
    "q": "Let \\(f(x) = x^2 - 6x + 14\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 14 = (x - 3)^2 + 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 5\\) (or \\([5, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 3)^2 + 5 \\implies (x - 3)^2 = y - 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 5}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 5\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 5}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (التوزيعات الاحتمالية وتقدير الاحتمال الأقصى (MLE))",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 14\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 5}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Probability Distributions & Maximum Likelihood (MLE))",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 14\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 14 - 3^2 =\\)",
        "a": "5",
        "h": "Subtract 9 from 14."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "9",
        "h": "Compute \\((2)^2 + 5\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (التوزيعات الاحتمالية وتقدير الاحتمال الأقصى (MLE))",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 14\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 14 - 3^2 =\\)",
        "a": "5",
        "h": "اطرح 9 من 14."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "9",
        "h": "احسب \\(4 + 5\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Probability Distributions & Maximum Likelihood (MLE))",
    "p": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "Line is tangent to the quadratic curve (1 repeated root)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "Equals \\(\\text{ran}(f)\\) (Range of original function)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "Translation by vector \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "Vieta's root-coefficient relations"
      }
    ],
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (التوزيعات الاحتمالية وتقدير الاحتمال الأقصى (MLE))",
    "p_ar": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "المستقيم مماس للمنحنى التربيعي (جذر حقيقي مكرر)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "يساوي مدى الدالة الأصلية \\(\\text{ran}(f)\\)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "إزاحة هندسية بالمتجه \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "علاقات فييت بين الجذور والمعاملات"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Maximum Likelihood Estimate (MLE) for Bernoulli p",
    "ti_ar": "إدخال رقمي: تقدير الإمكان الأعظم (MLE) لمعامل برنولي",
    "q": "In 20 independent Bernoulli trials, you observe 13 successes. What is the MLE \\( \\hat{p}_{\\text{MLE}} \\) expressed as a percentage?",
    "q_ar": "في 20 تجربة برنولي مستقلة، تم رصد 13 نجاحاً. ما قيمة مقدر الإمكان الأعظم \\( \\hat{p}_{\\text{MLE}} \\) كنسبة مئوية؟",
    "a": 65,
    "h": "For Bernoulli trials, \\( \\hat{p}_{\\text{MLE}} = \\frac{k}{n} = \\frac{13}{20} \\).",
    "h_ar": "لتجارب برنولي، \\( \\hat{p}_{\\text{MLE}} = \\frac{k}{n} = \\frac{13}{20} \\).",
    "sol": "\\( \\hat{p}_{\\text{MLE}} = \\frac{13}{20} = 0.65 = 65\\% \\).",
    "sol_ar": "\\( \\hat{p}_{\\text{MLE}} = \\frac{13}{20} = 0.65 = 65\\% \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Deriving an MLE Estimator",
    "ti_ar": "رتّب الخطوات: اشتقاق مقدر الإمكان الأعظم (MLE)",
    "prompt": "Arrange the mathematical steps to derive the Maximum Likelihood Estimator \\( \\hat{\\theta}_{\\text{MLE}} \\):",
    "prompt_ar": "رتب الخطوات الرياضية لاشتقاق مقدر الإمكان الأعظم \\( \\hat{\\theta}_{\\text{MLE}} \\):",
    "items": [
      "Write the joint likelihood of independent samples as a product: \\( L(\\theta) = \\prod_{i=1}^n p(x_i \\mid \\theta) \\).",
      "Take the natural logarithm to convert the product into a sum: \\( \\ell(\\theta) = \\sum_{i=1}^n \\ln p(x_i \\mid \\theta) \\).",
      "Differentiate the log-likelihood \\( \\ell(\\theta) \\) with respect to \\( \\theta \\) and set \\( \\frac{d\\ell}{d\\theta} = 0 \\).",
      "Solve the critical-point equation for \\( \\hat{\\theta} \\) and verify \\( \\frac{d^2\\ell}{d\\theta^2} < 0 \\)."
    ],
    "items_ar": [
      "اكتب دالة الإمكان المشتركة للعينات المستقلة كحاصل ضرب: \\( L(\\theta) = \\prod_{i=1}^n p(x_i \\mid \\theta) \\).",
      "خذ اللوغاريتم الطبيعي لتحويل الضرب إلى مجموع: \\( \\ell(\\theta) = \\sum_{i=1}^n \\ln p(x_i \\mid \\theta) \\).",
      "اشتق دالة الإمكان اللوغاريتمية \\( \\ell(\\theta) \\) بالنسبة إلى \\( \\theta \\) وضع \\( \\frac{d\\ell}{d\\theta} = 0 \\).",
      "حل المعادلة لإيجاد \\( \\hat{\\theta} \\) وتحقق من شرط القيمة العظمى \\( \\frac{d^2\\ell}{d\\theta^2} < 0 \\)."
    ],
    "ex": "Taking logs turns products of probabilities into sums, preventing numerical underflow and simplifying derivatives.",
    "ex_ar": "أخذ اللوغاريتم يحول ضرب الاحتمالات إلى جمع، مما يمنع التلاشي العددي ويسهل الاشتقاق."
  },
  {
    "t": "cat",
    "ti": "Categorize: Probability Distributions in Machine Learning",
    "ti_ar": "تصنيف: التوزيعات الاحتمالية في تعلم الآلة",
    "categories": [
      "Bernoulli / Categorical",
      "Gaussian (Normal) N(μ, σ²)",
      "Poisson(λ)"
    ],
    "categories_ar": [
      "توزيع برنولي / الفئوي",
      "التوزيع الطبيعي (الجاوسي)",
      "توزيع بواسون Poisson(λ)"
    ],
    "items": [
      {
        "s": "Models binary labels y ∈ {0, 1} and underpins Binary Cross-Entropy loss",
        "s_ar": "ينمذج التصنيف الثنائي y ∈ {0, 1} ويشكل أساس خسارة الإنتروبيا المتقاطعة",
        "cat": 0
      },
      {
        "s": "Continuous bell-shaped density whose negative log-likelihood yields Mean Squared Error (MSE)",
        "s_ar": "توزيع متصل متماثل يؤدي سالب لوغاريتم إمكانه إلى متوسط مربع الخطأ (MSE)",
        "cat": 1
      },
      {
        "s": "Models discrete event counts per fixed interval with mean equal to variance (λ)",
        "s_ar": "ينمذج عدد الأحداث المنفصلة في فترة زمنية ويتساوى فيه المتوسط والتباين (λ)",
        "cat": 2
      },
      {
        "s": "Parameterized by a single probability p with variance p(1 − p)",
        "s_ar": "يتحدد بمعامل احتمال واحد p وتباينه يساوي p(1 − p)",
        "cat": 0
      }
    ],
    "ex": "Gaussian noise → MSE loss; Bernoulli likelihood → Binary Cross-Entropy loss.",
    "ex_ar": "الضوضاء الجاوسية تقابل خسارة MSE، وإمكان برنولي يقابل خسارة الإنتروبيا المتقاطعة الثنائية."
  }
];

D["ai-linear-regression"] = [
  {
    "t": "qc",
    "ti": "Quick Check: The Normal Equation",
    "q": "What is the closed-form matrix solution for the optimal weights w in Ordinary Least Squares (OLS) regression?",
    "o": [
      "w = (XᵀX)⁻¹ Xᵀ y",
      "w = Xᵀ y (XᵀX)⁻¹",
      "w = (X Xᵀ)⁻¹ X y",
      "w = X⁻¹ y"
    ],
    "a": 0,
    "ex": "Setting the gradient of ||y - Xw||² with respect to w to zero gives: -2Xᵀ(y - Xw) = 0 ⟹ XᵀX w = Xᵀy ⟹ w = (XᵀX)⁻¹ Xᵀ y.",
    "ti_ar": "فحص سريع: المعادلة الطبيعية في الانحدار الخطي",
    "q_ar": "ما الحل المصفوفي المغلق للأوزان المثلى w في نموذج المربعات الصغرى العادية (OLS)؟",
    "o_ar": [
      "w = (XᵀX)⁻¹ Xᵀ y",
      "w = Xᵀ y (XᵀX)⁻¹",
      "w = (X Xᵀ)⁻¹ X y",
      "w = X⁻¹ y"
    ],
    "ex_ar": "بمساواة مشتقة مجموع مربعات الخطأ بالصفر بالنسبة لـ w: نجد أن XᵀX w = Xᵀy، وبالتالي w = (XᵀX)⁻¹ Xᵀ y."
  },
  {
    "t": "mt",
    "ti": "Matching: Regression Metrics",
    "p": [
      {
        "l": "R² Score",
        "r": "Proportion of target variance explained by the model (0 to 1)"
      },
      {
        "l": "MSE",
        "r": "Average of the squared differences between predictions and actuals"
      },
      {
        "l": "Residual e",
        "r": "The difference between observed y and predicted ŷ"
      },
      {
        "l": "Overfitting",
        "r": "Model memorizes noise and fails to generalize to unseen test data"
      }
    ],
    "ti_ar": "مطابقة: مقاييس جودة الانحدار",
    "p_ar": [
      {
        "l": "معامل التحديد R²",
        "r": "نسبة التباين في المتغير التابع المفسرة بواسطة النموذج (من 0 إلى 1)"
      },
      {
        "l": "متوسط مربعات الخطأ MSE",
        "r": "متوسط مربعات الفروق بين التوقعات والقيم الفعلية"
      },
      {
        "l": "الباقي (Residual e)",
        "r": "الفرق بين القيمة الحقيقية y والقيمة المتوقعة ŷ"
      },
      {
        "l": "فرط التخصيص (Overfitting)",
        "r": "حفظ النموذج للضوضاء في بيانات التدريب وفشله في التعميم"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Linear Regression & Ordinary Least Squares)",
    "q": "A student solves the equation \\(\\sqrt{2x + 4} = x - 2\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 4 = (x - 2)^2\\).",
      "Expand the right-hand side: \\(2x + 4 = x^2 - 4x + 4\\).",
      "Rearrange and factor: \\(x^2 - 6x = 0 \\implies x(x - 6) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 6\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{4} = -2\\) (\\(2 = -2\\)), which is false because the principal square root is non-negative (\\(x - 2 \\ge 0\\) requires \\(x \\ge 2\\)).",
      "Expanding \\((x - 2)^2\\) should give \\(x^2 - 4\\) with no middle term.",
      "Factoring \\(x^2 - 6x = 0\\) only yields \\(x = 6\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 4} = x - 2\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 2 \\ge 0 \\iff x \\ge 2\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 6\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (الانحدار الخطي وطريقة المربعات الصغرى (OLS))",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 4} = x - 2\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 4 = (x - 2)^2\\).",
      "فك المربع الكامل: \\(2x + 4 = x^2 - 4x + 4\\).",
      "الترتيب والتحليل: \\(x^2 - 6x = 0 \\implies x(x - 6) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 6\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(2 = -2\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 2\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 2 \\ge 0 \\implies x \\ge 2\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 6\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Linear Regression & Ordinary Least Squares)",
    "q": "Let \\(f(x) = x^2 - 4x + 8\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 8 = (x - 2)^2 + 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 4\\) (or \\([4, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 2)^2 + 4 \\implies (x - 2)^2 = y - 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 4}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 4\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 4}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (الانحدار الخطي وطريقة المربعات الصغرى (OLS))",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 8\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 4}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Linear Regression & Ordinary Least Squares)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 4x + 8\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "2",
        "h": "Take half of 4."
      },
      {
        "l": "Compute the minimum value \\(k = 8 - 2^2 =\\)",
        "a": "4",
        "h": "Subtract 4 from 8."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 4\\): \\(y =\\)",
        "a": "8",
        "h": "Compute \\((2)^2 + 4\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (الانحدار الخطي وطريقة المربعات الصغرى (OLS))",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 4x + 8\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "2",
        "h": "اقسم معامل x وهو 4 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 8 - 2^2 =\\)",
        "a": "4",
        "h": "اطرح 4 من 8."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 4\\):",
        "a": "8",
        "h": "احسب \\(4 + 4\\)."
      }
    ]
  },
  {
    "t": "tf",
    "ti": "True / False: Ordinary Least Squares (OLS) & Residual Geometry",
    "ti_ar": "صح / خطأ: المربعات الصغرى العادية (OLS) وهندسة البواقي",
    "items": [
      {
        "s": "The fitted OLS regression line ŷ = β₀ + β₁x always passes through the sample centroid (x̄, ȳ).",
        "a": true
      },
      {
        "s": "In OLS, the residual vector e = y − Xβ̂ is orthogonal to every column of the design matrix X.",
        "a": true
      },
      {
        "s": "A coefficient of determination R² = 0.85 means 15% of the variance in y is explained by the linear model.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "يمر خط انحدار المربعات الصغرى ŷ = β₀ + β₁x دائماً بنقطة المتوسط الحسابي للعينة (x̄, ȳ).",
        "a": true
      },
      {
        "s": "في طريقة المربعات الصغرى، يكون متجه البواقي e = y − Xβ̂ عمودياً على كل عمود في مصفوفة التصميم X.",
        "a": true
      },
      {
        "s": "معامل التحديد R² = 0.85 يعني أن 15% فقط من التباين في y يفسره النموذج الخطي.",
        "a": false
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Computing R² (Coefficient of Determination)",
    "ti_ar": "إدخال رقمي: حساب معامل التحديد R²",
    "q": "A linear regression model has total sum of squares \\( \\text{TSS} = 200 \\) and residual sum of squares \\( \\text{RSS} = 30 \\). Find \\( R^2 \\) as a percentage.",
    "q_ar": "نموذج انحدار خطي مجموع مربعاته الكلي \\( \\text{TSS} = 200 \\) ومجموع مربعات البواقي \\( \\text{RSS} = 30 \\). أوجد قيمة \\( R^2 \\) كنسبة مئوية.",
    "a": 85,
    "h": "Use \\( R^2 = 1 - \\frac{\\text{RSS}}{\\text{TSS}} \\).",
    "h_ar": "استخدم القانون \\( R^2 = 1 - \\frac{\\text{RSS}}{\\text{TSS}} \\).",
    "sol": "\\( R^2 = 1 - \\frac{30}{200} = 1 - 0.15 = 0.85 = 85\\% \\).",
    "sol_ar": "\\( R^2 = 1 - \\frac{30}{200} = 0.85 = 85\\% \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Deriving the Normal Equations XᵀXβ̂ = Xᵀy",
    "ti_ar": "رتّب الخطوات: اشتقاق المعادلات الطبيعية للانحدار الخطي",
    "prompt": "Arrange the steps to derive the closed-form OLS estimator \\( \\hat{\\boldsymbol{\\beta}} = (X^T X)^{-1} X^T \\mathbf{y} \\):",
    "prompt_ar": "رتب خطوات اشتقاق الصيغة المغلقة لمقدر المربعات الصغرى \\( \\hat{\\boldsymbol{\\beta}} = (X^T X)^{-1} X^T \\mathbf{y} \\):",
    "items": [
      "Express the Residual Sum of Squares in matrix form: \\( L(\\boldsymbol{\\beta}) = \\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|_2^2 = (\\mathbf{y} - X\\boldsymbol{\\beta})^T(\\mathbf{y} - X\\boldsymbol{\\beta}) \\).",
      "Expand the quadratic form: \\( L(\\boldsymbol{\\beta}) = \\mathbf{y}^T\\mathbf{y} - 2\\boldsymbol{\\beta}^T X^T \\mathbf{y} + \\boldsymbol{\\beta}^T X^T X \\boldsymbol{\\beta} \\).",
      "Set the gradient with respect to \\( \\boldsymbol{\\beta} \\) to zero: \\( \\nabla_{\\boldsymbol{\\beta}} L = -2X^T\\mathbf{y} + 2X^T X\\hat{\\boldsymbol{\\beta}} = \\mathbf{0} \\).",
      "Left-multiply by \\( (X^T X)^{-1} \\) to isolate \\( \\hat{\\boldsymbol{\\beta}} = (X^T X)^{-1} X^T \\mathbf{y} \\)."
    ],
    "items_ar": [
      "اكتب مجموع مربعات البواقي بصيغة المصفوفات: \\( L(\\boldsymbol{\\beta}) = (\\mathbf{y} - X\\boldsymbol{\\beta})^T(\\mathbf{y} - X\\boldsymbol{\\beta}) \\).",
      "فك الصيغة التربيعية: \\( L(\\boldsymbol{\\beta}) = \\mathbf{y}^T\\mathbf{y} - 2\\boldsymbol{\\beta}^T X^T \\mathbf{y} + \\boldsymbol{\\beta}^T X^T X \\boldsymbol{\\beta} \\).",
      "ساوِ التدرج بالنسبة إلى \\( \\boldsymbol{\\beta} \\) بالصفر: \\( -2X^T\\mathbf{y} + 2X^T X\\hat{\\boldsymbol{\\beta}} = \\mathbf{0} \\).",
      "اضرب من اليسار في المعكوس \\( (X^T X)^{-1} \\) لعزل \\( \\hat{\\boldsymbol{\\beta}} = (X^T X)^{-1} X^T \\mathbf{y} \\)."
    ],
    "ex": "Setting the gradient of the squared L2 residual norm to zero yields the Normal Equations.",
    "ex_ar": "مساواة تدرج مربع معيار البواقي بالصفر يعطي المعادلات الطبيعية مباشرة."
  },
  {
    "t": "cat",
    "ti": "Categorize: Regularized Regression Objectives (OLS vs Ridge vs Lasso)",
    "ti_ar": "تصنيف: دوال الهدف في الانحدار المنتظم (OLS vs Ridge vs Lasso)",
    "categories": [
      "Standard OLS",
      "Ridge Regression (L2 Penalty)",
      "Lasso Regression (L1 Penalty)"
    ],
    "categories_ar": [
      "المربعات الصغرى القياسية (OLS)",
      "انحدار ريدج (عقوبة L2)",
      "انحدار لاسو (عقوبة L1)"
    ],
    "items": [
      {
        "s": "Minimizes \\( \\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|_2^2 \\) with no regularization penalty",
        "s_ar": "يقلل \\( \\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|_2^2 \\) بدون أي حد عقوبة تنظيمي",
        "cat": 0
      },
      {
        "s": "Adds \\( \\lambda \\|\\boldsymbol{\\beta}\\|_2^2 \\) and gives closed-form \\( (X^T X + \\lambda I)^{-1}X^T\\mathbf{y} \\)",
        "s_ar": "يضيف \\( \\lambda \\|\\boldsymbol{\\beta}\\|_2^2 \\) ويعطي الحل \\( (X^T X + \\lambda I)^{-1}X^T\\mathbf{y} \\)",
        "cat": 1
      },
      {
        "s": "Adds \\( \\lambda \\|\\boldsymbol{\\beta}\\|_1 \\) to drive irrelevant feature weights to exact zero (sparsity)",
        "s_ar": "يضيف \\( \\lambda \\|\\boldsymbol{\\beta}\\|_1 \\) لتصفير أوزان الخصائص غير المهمة تماماً",
        "cat": 2
      },
      {
        "s": "Can fail if \\( X^T X \\) is singular due to collinear features",
        "s_ar": "قد يفشل إذا كانت المصفوفة \\( X^T X \\) منفردة بسبب التعدد الخطي للخصائص",
        "cat": 0
      }
    ],
    "ex": "Ridge (L2) shrinks weights smoothly and stabilizes inversion; Lasso (L1) induces exact feature sparsity.",
    "ex_ar": "انحدار ريدج (L2) يقلص الأوزان بسلاسة، بينما انحدار لاسو (L1) يصفر المعاملات غير المهمة."
  }
];

D["ai-logistic-regression"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Sigmoid Activation Function",
    "q": "If the logit z = wᵀx + b is equal to 0, what is the output probability σ(z) produced by the Sigmoid function?",
    "o": [
      "0.5",
      "0.0",
      "1.0",
      "Undefined"
    ],
    "a": 0,
    "ex": "σ(0) = 1 / (1 + e⁰) = 1 / (1 + 1) = 0.5. A logit of 0 corresponds exactly to the 50/50 decision threshold.",
    "ti_ar": "فحص سريع: دالة التنشيط اللوجستية (السيجمويد)",
    "q_ar": "إذا كانت قيمة z = wᵀx + b مساوية للصفر، فما الاحتمال الناتج من دالة السيجمويد σ(z)؟",
    "o_ar": [
      "0.5",
      "0.0",
      "1.0",
      "غير معرف"
    ],
    "ex_ar": "σ(0) = 1 / (1 + e⁰) = 1 / (1 + 1) = 0.5. القيمة z=0 تمثل عتبة القرار الفاصلة بنسبة 50%."
  },
  {
    "t": "tf",
    "ti": "True / False: Binary Cross-Entropy Loss",
    "items": [
      {
        "s": "If true label y = 1 and predicted probability ŷ = 0.99, the binary cross-entropy loss is near 0.",
        "a": true
      },
      {
        "s": "The decision boundary in standard logistic regression is linear (a straight line or hyperplane).",
        "a": true
      },
      {
        "s": "Logistic regression uses Mean Squared Error (MSE) because it creates a perfectly convex loss surface.",
        "a": false
      }
    ],
    "ti_ar": "صح / خطأ: دالة خسارة الإنتروبيا المتقاطعة (Cross-Entropy)",
    "items_ar": [
      {
        "s": "إذا كانت التسمية الفعلية y = 1 والاحتمال المتوقع ŷ = 0.99، فإن خسارة الإنتروبيا تكون قريبة جداً من الصفر.",
        "a": true
      },
      {
        "s": "الحد الفاصل للقرار في الانحدار اللوجستي القياسي هو حد خطي (مستقيم أو مستوى فائق).",
        "a": true
      },
      {
        "s": "يستخدم الانحدار اللوجستي دالة MSE لأنها تولد سطح خسارة محدب تماماً.",
        "a": false
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Logistic Regression & Classification Boundaries)",
    "q": "A student solves the equation \\(\\sqrt{2x + 9} = x - 3\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 9 = (x - 3)^2\\).",
      "Expand the right-hand side: \\(2x + 9 = x^2 - 6x + 9\\).",
      "Rearrange and factor: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 8\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{9} = -3\\) (\\(3 = -3\\)), which is false because the principal square root is non-negative (\\(x - 3 \\ge 0\\) requires \\(x \\ge 3\\)).",
      "Expanding \\((x - 3)^2\\) should give \\(x^2 - 9\\) with no middle term.",
      "Factoring \\(x^2 - 8x = 0\\) only yields \\(x = 8\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 9} = x - 3\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 3 \\ge 0 \\iff x \\ge 3\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 8\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (الانحدار اللوجستي والحدود الفاصلة للتصنيف)",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 9} = x - 3\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 9 = (x - 3)^2\\).",
      "فك المربع الكامل: \\(2x + 9 = x^2 - 6x + 9\\).",
      "الترتيب والتحليل: \\(x^2 - 8x = 0 \\implies x(x - 8) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 8\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(3 = -3\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 3\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 3 \\ge 0 \\implies x \\ge 3\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 8\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Logistic Regression & Classification Boundaries)",
    "q": "Let \\(f(x) = x^2 - 6x + 14\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 14 = (x - 3)^2 + 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 5\\) (or \\([5, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 3)^2 + 5 \\implies (x - 3)^2 = y - 5\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 5}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 5\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 5}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (الانحدار اللوجستي والحدود الفاصلة للتصنيف)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 14\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 5}\\) لأن \\(x \\ge 3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Logistic Regression & Classification Boundaries)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 6x + 14\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "3",
        "h": "Take half of 6."
      },
      {
        "l": "Compute the minimum value \\(k = 14 - 3^2 =\\)",
        "a": "5",
        "h": "Subtract 9 from 14."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 5\\): \\(y =\\)",
        "a": "9",
        "h": "Compute \\((2)^2 + 5\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (الانحدار اللوجستي والحدود الفاصلة للتصنيف)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 6x + 14\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "3",
        "h": "اقسم معامل x وهو 6 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 14 - 3^2 =\\)",
        "a": "5",
        "h": "اطرح 9 من 14."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 5\\):",
        "a": "9",
        "h": "احسب \\(4 + 5\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Logistic Regression & Classification Boundaries)",
    "p": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "Line is tangent to the quadratic curve (1 repeated root)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "Equals \\(\\text{ran}(f)\\) (Range of original function)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "Translation by vector \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "Vieta's root-coefficient relations"
      }
    ],
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (الانحدار اللوجستي والحدود الفاصلة للتصنيف)",
    "p_ar": [
      {
        "l": "\\(b^2 - 4ac = 0\\)",
        "r": "المستقيم مماس للمنحنى التربيعي (جذر حقيقي مكرر)"
      },
      {
        "l": "\\(\\text{dom}(f^{-1})\\)",
        "r": "يساوي مدى الدالة الأصلية \\(\\text{ran}(f)\\)"
      },
      {
        "l": "\\(f(x - h) + k\\)",
        "r": "إزاحة هندسية بالمتجه \\(\\binom{h}{k}\\)"
      },
      {
        "l": "\\(x_1 + x_2 = -b/a,\\; x_1 x_2 = c/a\\)",
        "r": "علاقات فييت بين الجذور والمعاملات"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Sigmoid Probability from Log-Odds",
    "ti_ar": "إدخال رقمي: حساب احتمال السيجمويد من اللوجيت",
    "q": "If a logistic regression model produces a linear logit of \\( z = \\mathbf{w}^T\\mathbf{x} + b = 0 \\), what is the predicted probability \\( \\hat{p} = \\sigma(0) \\) expressed as a percentage?",
    "q_ar": "إذا أنتج نموذج الانحدار اللوجستي قيمة خطية \\( z = \\mathbf{w}^T\\mathbf{x} + b = 0 \\)، فما الاحتمال المتوقع \\( \\hat{p} = \\sigma(0) \\) كنسبة مئوية؟",
    "a": 50,
    "h": "Substitute \\( z = 0 \\) into \\( \\sigma(z) = \\frac{1}{1 + e^{-z}} \\).",
    "h_ar": "عوّض \\( z = 0 \\) في دالة السيجمويد \\( \\sigma(z) = \\frac{1}{1 + e^{-z}} \\).",
    "sol": "\\( \\sigma(0) = \\frac{1}{1 + e^0} = \\frac{1}{1 + 1} = 0.50 = 50\\% \\).",
    "sol_ar": "\\( \\sigma(0) = \\frac{1}{1 + 1} = 0.50 = 50\\% \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding the Linear Decision Boundary",
    "ti_ar": "رتّب الخطوات: إيجاد معادلة حد القرار الخطي",
    "prompt": "Arrange the steps to find the decision boundary at threshold \\( \\hat{p} = 0.5 \\) for \\( \\hat{p} = \\sigma(2x_1 - 4x_2 + 6) \\):",
    "prompt_ar": "رتب خطوات إيجاد معادلة حد القرار عند عتبة \\( \\hat{p} = 0.5 \\) للنموذج \\( \\hat{p} = \\sigma(2x_1 - 4x_2 + 6) \\):",
    "items": [
      "Set the predicted probability equal to the threshold: \\( \\sigma(z) = \\frac{1}{1 + e^{-z}} = 0.5 \\).",
      "Solve for the logit \\( z \\): \\( 1 + e^{-z} = 2 \\implies e^{-z} = 1 \\implies z = 0 \\).",
      "Substitute the linear predictor into \\( z = 0 \\): \\( 2x_1 - 4x_2 + 6 = 0 \\).",
      "Rearrange into slope-intercept form: \\( x_2 = 0.5x_1 + 1.5 \\)."
    ],
    "items_ar": [
      "ساوِ الاحتمال المتوقع بعتبة القرار: \\( \\sigma(z) = 0.5 \\).",
      "أوجد قيمة اللوجيت \\( z \\): \\( e^{-z} = 1 \\implies z = 0 \\).",
      "عوّض بالمقدار الخطي في \\( z = 0 \\): \\( 2x_1 - 4x_2 + 6 = 0 \\).",
      "رتب المعادلة في صيغة الميل والمقطع: \\( x_2 = 0.5x_1 + 1.5 \\)."
    ],
    "ex": "At the 0.5 probability threshold, the decision boundary is the hyperplane wᵀx + b = 0.",
    "ex_ar": "عند عتبة الاحتمال 0.5، يكون حد القرار هو المستوي الفائق الذي يحقق wᵀx + b = 0."
  },
  {
    "t": "cat",
    "ti": "Categorize: Binary Classification Predictions by Logit Sign",
    "ti_ar": "تصنيف: قرار التصنيف الثنائي حسب إشارة اللوجيت z",
    "categories": [
      "Predict Class 1 (p̂ > 0.5)",
      "On Decision Boundary (p̂ = 0.5)",
      "Predict Class 0 (p̂ < 0.5)"
    ],
    "categories_ar": [
      "توقع الفئة 1 (p̂ > 0.5)",
      "على حد القرار تماماً (p̂ = 0.5)",
      "توقع الفئة 0 (p̂ < 0.5)"
    ],
    "items": [
      {
        "s": "Logit \\( z = \\mathbf{w}^T\\mathbf{x} + b = +3.2 \\)",
        "s_ar": "قيمة اللوجيت \\( z = +3.2 \\)",
        "cat": 0
      },
      {
        "s": "Logit \\( z = \\mathbf{w}^T\\mathbf{x} + b = 0 \\)",
        "s_ar": "قيمة اللوجيت \\( z = 0 \\)",
        "cat": 1
      },
      {
        "s": "Logit \\( z = \\mathbf{w}^T\\mathbf{x} + b = -2.5 \\)",
        "s_ar": "قيمة اللوجيت \\( z = -2.5 \\)",
        "cat": 2
      },
      {
        "s": "Odds ratio \\( \\frac{\\hat{p}}{1 - \\hat{p}} = e^z > 1 \\)",
        "s_ar": "نسبة الأرجحية \\( \\frac{\\hat{p}}{1 - \\hat{p}} = e^z > 1 \\)",
        "cat": 0
      }
    ],
    "ex": "Positive logit z > 0 means p̂ > 0.5 (Class 1); negative logit z < 0 means p̂ < 0.5 (Class 0).",
    "ex_ar": "اللوجيت الموجب z > 0 يعني p̂ > 0.5 (الفئة 1)، واللوجيت السالب z < 0 يعني p̂ < 0.5 (الفئة 0)."
  }
];

D["ai-pca-dimensionality"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Principal Component Analysis (PCA)",
    "q": "In Principal Component Analysis (PCA), which direction does the first principal component vector represent?",
    "o": [
      "The direction along which the data exhibits the maximum variance",
      "The direction with the smallest spread to minimize outlier effects",
      "The axis that passes through the origin perpendicular to all points",
      "The average vector of all feature dimensions"
    ],
    "a": 0,
    "ex": "PCA seeks the orthogonal axis that maximizes the variance of the projected data points. The first principal component corresponds to the eigenvector with the largest eigenvalue.",
    "ti_ar": "فحص سريع: تحليل المكونات الرئيسية (PCA)",
    "q_ar": "في تحليل المكونات الرئيسية (PCA)، ما الاتجاه الذي يمثله متجه المكون الرئيسي الأول؟",
    "o_ar": [
      "الاتجاه الذي يُظهر فيه توزيع البيانات أقصى تباين (أكبر انتشار)",
      "الاتجاه صاحب أقل تشتت لتقليل تأثير القيم الشاذة",
      "المحور المار بنقطة الأصل عمودياً على جميع النقاط",
      "متجه المتوسط الحسابي لجميع أبعاد الخصائص"
    ],
    "ex_ar": "يبحث PCA عن المحور المتعامد الذي يعظم تباين البيانات المسقطة عليه. والمكون الأول يناظر المتجه الذاتي المقترن بأكبر قيمة ذاتية لمصفوفة التباين المشترك."
  },
  {
    "t": "mt",
    "ti": "Matching: Spectral Concepts in PCA",
    "p": [
      {
        "l": "Covariance Matrix Σ",
        "r": "Measures pairwise linear relationships and feature variances"
      },
      {
        "l": "Eigenvector",
        "r": "Direction that remains invariant up to scalar scaling under transformation"
      },
      {
        "l": "Eigenvalue λ",
        "r": "Magnitude of variance explained along the corresponding eigenvector axis"
      },
      {
        "l": "Explained Variance Ratio",
        "r": "λᵢ / ∑ λ; proportion of total information preserved by component i"
      }
    ],
    "ti_ar": "مطابقة: مفاهيم الجبر الطيفي في تحليل PCA",
    "p_ar": [
      {
        "l": "مصفوفة التباين المشترك Σ",
        "r": "تقيس العلاقات الخطية الثنائية وتباين الخصائص"
      },
      {
        "l": "المتجه الذاتي (Eigenvector)",
        "r": "الاتجاه الذي يحافظ على اتجاهه الثابت عند التحويل الخطي"
      },
      {
        "l": "القيمة الذاتية (Eigenvalue λ)",
        "r": "مقدار التباين المفسر على طول محور المتجه الذاتي المقترن بها"
      },
      {
        "l": "نسبة التباين المفسرة",
        "r": "λᵢ / ∑ λ؛ نسبة المعلومات الكلية المحفوظة بواسطة المكون i"
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Dimensionality Reduction, Covariance & PCA)",
    "q": "A student solves the equation \\(\\sqrt{2x + 16} = x - 4\\) step by step. Which step introduces an invalid conclusion?",
    "steps": [
      "Square both sides to eliminate the radical: \\(2x + 16 = (x - 4)^2\\).",
      "Expand the right-hand side: \\(2x + 16 = x^2 - 8x + 16\\).",
      "Rearrange and factor: \\(x^2 - 10x = 0 \\implies x(x - 10) = 0\\).",
      "Conclude that both \\(x = 0\\) and \\(x = 10\\) are valid real solutions."
    ],
    "errorStep": 4,
    "reasons": [
      "Substituting \\(x = 0\\) into the original equation gives \\(\\sqrt{16} = -4\\) (\\(4 = -4\\)), which is false because the principal square root is non-negative (\\(x - 4 \\ge 0\\) requires \\(x \\ge 4\\)).",
      "Expanding \\((x - 4)^2\\) should give \\(x^2 - 16\\) with no middle term.",
      "Factoring \\(x^2 - 10x = 0\\) only yields \\(x = 10\\)."
    ],
    "correctReason": 0,
    "h": "Test \\(x = 0\\) in the original equation \\(\\sqrt{2x + 16} = x - 4\\).",
    "sol": "Squaring both sides is a non-reversible step unless \\(x - 4 \\ge 0 \\iff x \\ge 4\\). Therefore \\(x = 0\\) is an extraneous root and \\(x = 10\\) is the unique solution.",
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (تقليل الأبعاد ومصفوفة التباين المشترك وتحليل المكونات الرئيسية (PCA))",
    "q_ar": "يحل طالب المعادلة \\(\\sqrt{2x + 16} = x - 4\\) خطوة بخطوة. أي خطوة تتضمن استنتاجاً خاطئاً؟",
    "steps_ar": [
      "تربيع الطرفين للتخلص من الجذر: \\(2x + 16 = (x - 4)^2\\).",
      "فك المربع الكامل: \\(2x + 16 = x^2 - 8x + 16\\).",
      "الترتيب والتحليل: \\(x^2 - 10x = 0 \\implies x(x - 10) = 0\\).",
      "استنتاج أن كلاً من \\(x = 0\\) و \\(x = 10\\) حلان صحيحان للمعادلة الأصلية."
    ],
    "reasons_ar": [
      "التعويض عن \\(x = 0\\) في المعادلة الأصلية يعطي \\(4 = -4\\) وهو مستحيل لأن الجذر التربيعي الأساسي غير سالب (يجب أن يتحقق \\(x \\ge 4\\)).",
      "فك التربيع غير صحيح.",
      "التحليل بإخراج العامل المشترك غير صحيح."
    ],
    "h_ar": "عوّض عن \\(x = 0\\) في المعادلة الأصلية للتحقق من إشارة الطرف الأيمن.",
    "sol_ar": "الشرط اللازم هو \\(x - 4 \\ge 0 \\implies x \\ge 4\\)، لذا يُرفض الجذر الدخيل \\(x = 0\\) ويبقى \\(x = 10\\) فقط."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Dimensionality Reduction, Covariance & PCA)",
    "q": "Let \\(f(x) = x^2 - 8x + 19\\) for \\(x \\ge 4\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 4)^2 - 16 + 19 = (x - 4)^2 + 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 3\\) (or \\([3, \\infty)\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Function & Domain",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(y = (x - 4)^2 + 3 \\implies (x - 4)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 4\\)): \\(f^{-1}(x) = 4 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 4\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (تقليل الأبعاد ومصفوفة التباين المشترك وتحليل المكونات الرئيسية (PCA))",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 19\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 3}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Dimensionality Reduction, Covariance & PCA)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 8x + 19\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "4",
        "h": "Take half of 8."
      },
      {
        "l": "Compute the minimum value \\(k = 19 - 4^2 =\\)",
        "a": "3",
        "h": "Subtract 16 from 19."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 6\\): \\(y =\\)",
        "a": "7",
        "h": "Compute \\((2)^2 + 3\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (تقليل الأبعاد ومصفوفة التباين المشترك وتحليل المكونات الرئيسية (PCA))",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 8x + 19\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "4",
        "h": "اقسم معامل x وهو 8 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 19 - 4^2 =\\)",
        "a": "3",
        "h": "اطرح 16 من 19."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 6\\):",
        "a": "7",
        "h": "احسب \\(4 + 3\\)."
      }
    ]
  },
  {
    "t": "tf",
    "ti": "True / False: Covariance Matrices & Principal Component Analysis",
    "ti_ar": "صح / خطأ: مصفوفة التغاير وتحليل المركبات الأساسية (PCA)",
    "items": [
      {
        "s": "Every sample covariance matrix Σ is symmetric and positive semi-definite, so all its eigenvalues are ≥ 0.",
        "a": true
      },
      {
        "s": "The sum of all eigenvalues of Σ equals the trace of Σ (the total variance of the dataset).",
        "a": true
      },
      {
        "s": "Principal components corresponding to distinct eigenvalues of a symmetric covariance matrix are parallel.",
        "a": false
      }
    ],
    "items_ar": [
      {
        "s": "كل مصفوفة تغاير Σ هي مصفوفة متماثلة وشبه موجبة التحديد، لذا فإن جميع قيمها الذاتية غير سالبة (λ ≥ 0).",
        "a": true
      },
      {
        "s": "مجموع القيم الذاتية لمصفوفة التغاير Σ يساوي أثر المصفوفة tr(Σ) (أي التباين الكلي للبيانات).",
        "a": true
      },
      {
        "s": "المركبات الأساسية المناظرة لقيم ذاتية مختلفة في مصفوفة التغاير المتماثلة تكون متوازية.",
        "a": false
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Proportion of Variance Explained in PCA",
    "ti_ar": "إدخال رقمي: نسبة التباين المفسر في تحليل PCA",
    "q": "A 3D dataset has covariance eigenvalues \\( \\lambda_1 = 12, \\lambda_2 = 5, \\lambda_3 = 3 \\). What percentage of total variance is captured by the first principal component \\( \\text{PC}_1 \\)?",
    "q_ar": "بيانات ثلاثية الأبعاد قيمها الذاتية لمصفوفة التغاير هي \\( \\lambda_1 = 12, \\lambda_2 = 5, \\lambda_3 = 3 \\). ما النسبة المئوية للتباين الكلي التي تفسرها المركبة الأولى \\( \\text{PC}_1 \\)؟",
    "a": 60,
    "h": "Divide \\( \\lambda_1 \\) by the total variance \\( \\lambda_1 + \\lambda_2 + \\lambda_3 = 20 \\).",
    "h_ar": "اقسم \\( \\lambda_1 \\) على مجموع القيم الذاتية \\( 12 + 5 + 3 = 20 \\).",
    "sol": "\\( \\frac{12}{12 + 5 + 3} = \\frac{12}{20} = 0.60 = 60\\% \\).",
    "sol_ar": "\\( \\frac{12}{20} = 0.60 = 60\\% \\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Executing the PCA Algorithm",
    "ti_ar": "رتّب الخطوات: تنفيذ خوارزمية تحليل المركبات الأساسية (PCA)",
    "prompt": "Arrange the four standard steps to reduce an \\( n \\times d \\) data matrix \\( X \\) to \\( k \\) dimensions via PCA:",
    "prompt_ar": "رتب الخطوات الأربع القياسية لتقليص مصفوفة بيانات \\( X \\) إلى \\( k \\) أبعاد باستخدام PCA:",
    "items": [
      "Mean-center each feature column so that \\( \\tilde{X} = X - \\mathbf{1}\\boldsymbol{\\mu}^T \\) has zero mean.",
      "Compute the \\( d \\times d \\) sample covariance matrix \\( \\Sigma = \\frac{1}{n-1}\\tilde{X}^T\\tilde{X} \\).",
      "Compute the eigenvalues and orthonormal eigenvectors of \\( \\Sigma \\) and sort them so \\( \\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_d \\).",
      "Form the projection matrix \\( W_k = [\\mathbf{v}_1, \\dots, \\mathbf{v}_k] \\) and project \\( Z = \\tilde{X} W_k \\)."
    ],
    "items_ar": [
      "مركز البيانات بطرح المتوسط الحسابي لكل عمود بحيث يصبح متوسط \\( \\tilde{X} \\) صفراً.",
      "احسب مصفوفة التغاير للعينة \\( \\Sigma = \\frac{1}{n-1}\\tilde{X}^T\\tilde{X} \\).",
      "أوجد القيم الذاتية والمتجهات الذاتية المتعامدة لمصفوفة التغاير ورتبها تنازلياً \\( \\lambda_1 \\ge \\lambda_2 \\ge \\dots \\).",
      "كوّن مصفوفة الإسقاط من أول \\( k \\) متجهات ذاتية \\( W_k \\) وأسقط البيانات \\( Z = \\tilde{X} W_k \\)."
    ],
    "ex": "Center data → Covariance Σ → Eigendecomposition → Project onto top k eigenvectors.",
    "ex_ar": "مركزة البيانات ← حساب مصفوفة التغاير ← التحليل الطيفي للقيم الذاتية ← الإسقاط على أعلى k متجهات."
  },
  {
    "t": "cat",
    "ti": "Categorize: Covariance Matrix Entries & Spectral Quantities",
    "ti_ar": "تصنيف: عناصر مصفوفة التغاير والمقادير الطيفية",
    "categories": [
      "Diagonal Entries Σ_{ii}",
      "Off-Diagonal Entries Σ_{ij} (i ≠ j)",
      "Eigenpairs (λ_k, v_k)"
    ],
    "categories_ar": [
      "عناصر القطر الرئيسي Σ_{ii}",
      "العناصر خارج القطر Σ_{ij}",
      "الأزواج الذاتية (λ_k, v_k)"
    ],
    "items": [
      {
        "s": "Variance \\( \\text{Var}(X_i) \\) of the \\( i \\)-th individual feature",
        "s_ar": "التباين \\( \\text{Var}(X_i) \\) للخاصية رقم \\( i \\)",
        "cat": 0
      },
      {
        "s": "Linear covariance \\( \\text{Cov}(X_i, X_j) \\) measuring redundancy between features \\( i \\) and \\( j \\)",
        "s_ar": "التغاير الخطي \\( \\text{Cov}(X_i, X_j) \\) بين الخاصيتين \\( i \\) و \\( j \\)",
        "cat": 1
      },
      {
        "s": "Orthogonal principal axis direction and the variance captured along that axis",
        "s_ar": "اتجاه المحور الأساسي المتعامد ومقدار التباين المفسر على طوله",
        "cat": 2
      },
      {
        "s": "Equals zero when two centered features are uncorrelated",
        "s_ar": "تساوي صفراً عندما تكون خاصيتان غير مرتبطتين خطياً",
        "cat": 1
      }
    ],
    "ex": "Diagonals hold feature variances; off-diagonals hold pairwise covariances; eigenpairs give principal axes.",
    "ex_ar": "القطر الرئيسي يمثل تباين كل متغير، وخارج القطر يمثل التغاير المشترك، والمتجهات الذاتية تحدد المحاور الأساسية."
  }
];
});
