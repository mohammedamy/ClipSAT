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
        "h": "Compute (2)^2 + 1."
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
        "h": "احسب 4 + 1."
      }
    ]
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
        "h": "Compute (2)^2 + 4."
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
        "h": "احسب 4 + 4."
      }
    ]
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
        "h": "Compute (2)^2 + 7."
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
        "h": "احسب 4 + 7."
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
        "h": "Compute (2)^2 + 3."
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
        "h": "احسب 4 + 3."
      }
    ]
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
        "h": "Compute (2)^2 + 5."
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
        "h": "احسب 4 + 5."
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
        "h": "Compute (2)^2 + 4."
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
        "h": "احسب 4 + 4."
      }
    ]
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
        "h": "Compute (2)^2 + 5."
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
        "h": "احسب 4 + 5."
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
        "h": "Compute (2)^2 + 3."
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
        "h": "احسب 4 + 3."
      }
    ]
  }
];

});
