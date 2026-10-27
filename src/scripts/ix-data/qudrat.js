/* Interactive Practice data for /qudrat/ - one entry per chapter section id.
   Shipped as public/js/ix/qudrat.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["qud-about"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Qudrat Quantitative Structure",
    "ti_ar": "فحص سريع: هيكل اختبار القدرات الكمي",
    "q": "What is the structure and calculator policy of the General Aptitude Test (Qudrat)?",
    "q_ar": "ما هو هيكل قسم الرياضيات في اختبار القدرات العامة وسياسة الآلة الحاسبة؟",
    "o": [
      "Multiple sections with roughly 1 minute per question; calculators are strictly prohibited",
      "One long 3-hour section with graphing calculators allowed",
      "60 questions with 45 minutes and scientific calculators permitted",
      "All questions are grid-in without multiple-choice options"
    ],
    "o_ar": [
      "أقسام متعددة بمعدل دقيقة واحدة تقريباً لكل سؤال، والآلة الحاسبة ممنوعة تماماً",
      "قسم واحد مدته 3 ساعات مع السماح بالآلة البيانية",
      "60 سؤالاً في 45 دقيقة مع السماح بالحاسبة العلمية",
      "جميع الأسئلة حل مباشر بدون خيارات"
    ],
    "a": 0,
    "ex": "Qudrat sections are timed with strictly about 1 minute (or less) per question, and no calculators of any kind are permitted. Mental arithmetic and estimation tricks are essential.",
    "ex_ar": "اختبار القدرات مقسم إلى أقسام زمنية محددة بمعدل دقيقة لكل سؤال، والآلة الحاسبة ممنوعة نهائياً مما يتطلب مهارات الحساب الذهني والتقدير السريع."
  },
  {
    "t": "mt",
    "ti": "Matching: Qudrat Comparison Question (المقارنات) Rules",
    "ti_ar": "مطابقة: قواعد أسئلة المقارنات في القدرات",
    "p": [
      {
        "l": "Value A is greater",
        "r": "Option A (القيمة الأولى أكبر)"
      },
      {
        "l": "Value B is greater",
        "r": "Option B (القيمة الثانية أكبر)"
      },
      {
        "l": "Values are equal",
        "r": "Option C (القيمتان متساويتان)"
      },
      {
        "l": "Information is insufficient",
        "r": "Option D (المعطيات غير كافية)"
      }
    ],
    "p_ar": [
      {
        "l": "القيمة الأولى أكبر دائماً",
        "r": "الاختيار (أ)"
      },
      {
        "l": "القيمة الثانية أكبر دائماً",
        "r": "الاختيار (ب)"
      },
      {
        "l": "القيمتان متساويتان",
        "r": "الاختيار (ج)"
      },
      {
        "l": "المعطيات غير كافية",
        "r": "الاختيار (د)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculate Score Percentage",
    "ti_ar": "حساب النسبة المئوية للدرجة",
    "q": "A student answers 48 out of 60 questions correctly. What is the score percentage?",
    "q_ar": "أجاب طالب إجابةً صحيحة عن 48 سؤالًا من أصل 60 سؤالًا. ما نسبته المئوية في الاختبار؟",
    "a": 80,
    "tol": 0.001,
    "h": "48 / 60 = 4 / 5 = 80%.",
    "h_ar": "48 ÷ 60 = 4 ÷ 5 = 80%.",
    "sol": "48 / 60 = 80%.",
    "sol_ar": "48 ÷ 60 = 80%."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Qudrat Question Solving Strategy",
    "ti_ar": "رتّب الخطوات: استراتيجية حل سؤال القدرات",
    "q": "Order the recommended steps to approach a quantitative question in under 1 minute:",
    "q_ar": "رتّب الخطوات الموصى بها للتعامل مع سؤال كمي في أقل من دقيقة واحدة:",
    "items": [
      "Read the question carefully and identify what is specifically asked",
      "Estimate the reasonable magnitude of the answer before calculating",
      "Eliminate obviously impossible multiple-choice options",
      "Use fast mental arithmetic, factoring, or algebraic shortcuts",
      "Select the best remaining option and avoid lingering past 60 seconds"
    ],
    "items_ar": [
      "اقرأ السؤال بعناية وحدد المطلوب بدقة",
      "قدّر القيمة التقريبية المنطقية للإجابة قبل البدء في الحساب",
      "استبعد الخيارات البعيدة وغير المنطقية فورًا",
      "استخدم الحساب الذهني السريع أو التبسيط والتحليل",
      "اختر الإجابة الصحيحة وانتقل للسؤال التالي دون تجاوز دقيقة واحدة"
    ],
    "sol": "Disciplined time management and estimation are critical for high scores on Qudrat.",
    "sol_ar": "إدارة الوقت والتقدير السريع هما مفتاح الحصول على درجات عالية في اختبار القدرات."
  },
  {
    "t": "cat",
    "ti": "Classify Qudrat Question Types",
    "ti_ar": "تصنيف أنواع أسئلة القدرات",
    "categories": [
      "Standard 4-Choice Multiple Choice (الاختيار من متعدد)",
      "Quantitative Comparison (المقارنات)"
    ],
    "categories_ar": [
      "اختيار من متعدد بأربعة خيارات",
      "أسئلة المقارنات"
    ],
    "items": [
      {
        "s": "What is the value of 3/4 + 1/2?",
        "cat": 0
      },
      {
        "s": "Value A: 2^(30) vs Value B: 3^(20)",
        "cat": 1
      },
      {
        "s": "Find the area of a circle with radius 7",
        "cat": 0
      },
      {
        "s": "Value A: x² vs Value B: x for real x",
        "cat": 1
      },
      {
        "s": "If 3x + 5 = 20, what is x?",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "ما قيمة 3/4 + 1/2؟",
        "cat": 0
      },
      {
        "s": "القيمة الأولى: 2^(30) مقابل القيمة الثانية: 3^(20)",
        "cat": 1
      },
      {
        "s": "أوجد مساحة دائرة نصف قطرها 7",
        "cat": 0
      },
      {
        "s": "القيمة الأولى: x² مقابل القيمة الثانية: x لعدد حقيقي x",
        "cat": 1
      },
      {
        "s": "إذا كان 3x + 5 = 20، فما قيمة x؟",
        "cat": 0
      }
    ],
    "sol": "Standard questions ask for a numerical value; comparisons compare two calculated or algebraic quantities.",
    "sol_ar": "أسئلة الاختيار تطلب قيمة محددة، بينما أسئلة المقارنات تقارن بين كميتين رياضيتين."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Test format & strategy)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (شكل الاختبار والاستراتيجية)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Test format & strategy)",
    "q": "Let \\(f(x) = x^2 - 10x + 32\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 32 = (x - 5)^2 + 7\\)."
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
            "text": "Set \\(y = (x - 5)^2 + 7 \\implies (x - 5)^2 = y - 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 7}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 7\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 7}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (شكل الاختبار والاستراتيجية)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 32\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 7}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Test format & strategy)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 10x + 32\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "5",
        "h": "Take half of 10."
      },
      {
        "l": "Compute the minimum value \\(k = 32 - 5^2 =\\)",
        "a": "7",
        "h": "Subtract 25 from 32."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 7\\): \\(y =\\)",
        "a": "11",
        "h": "Compute \\((2)^2 + 7\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (شكل الاختبار والاستراتيجية)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 10x + 32\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "5",
        "h": "اقسم معامل x وهو 10 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 32 - 5^2 =\\)",
        "a": "7",
        "h": "اطرح 25 من 32."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 7\\):",
        "a": "11",
        "h": "احسب \\(4 + 7\\)."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Vertex & Minimum Analysis (Test format & strategy)",
    "ti_ar": "فحص سريع: تحليل نقطة الرأس والقيمة الصغرى (شكل الاختبار والاستراتيجية)",
    "q": "What is the minimum value of \\( f(x) = (x - 3)^2 + 5 \\) over all real \\( x \\)?",
    "q_ar": "ما هي القيمة الصغرى للدالة \\( f(x) = (x - 3)^2 + 5 \\) لكل \\( x \\in \\mathbb{R} \\)؟",
    "o": [
      "\\( 5 \\)",
      "\\( 3 \\)",
      "\\( -3 \\)",
      "\\( 14 \\)"
    ],
    "o_ar": [
      "\\( 5 \\)",
      "\\( 3 \\)",
      "\\( -3 \\)",
      "\\( 14 \\)"
    ],
    "a": 0,
    "ex": "Since \\( (x - 3)^2 \\ge 0 \\), the minimum value is \\( 5 \\) achieved at \\( x = 3 \\).",
    "ex_ar": "بما أن المربع الكامل غير سالب، فإن القيمة الصغرى هي \\( 5 \\) عند \\( x = 3 \\)."
  }
];

D["qud-arithmetic"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Fractions",
    "ti_ar": "فحص سريع: الكسور",
    "q": "Find \\(\\frac{3}{4}\\) of \\(80\\)",
    "q_ar": "أوجد \\(\\frac{3}{4}\\) من \\(80\\)",
    "o": [
      "50",
      "60",
      "45",
      "70"
    ],
    "o_ar": [
      "50",
      "60",
      "45",
      "70"
    ],
    "a": 1,
    "ex": "\\(\\frac{3}{4}\\times80=60\\).",
    "ex_ar": "\\(\\frac{3}{4}\\times80=60\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Exponent Laws & Roots",
    "ti_ar": "مطابقة: قوانين الأسس والجذور",
    "p": [
      {
        "l": "\\(a^m \\times a^n\\)",
        "r": "a^{m+n}"
      },
      {
        "l": "\\((a^m)^n\\)",
        "r": "a^{m·n}"
      },
      {
        "l": "\\(a^{-n}\\)",
        "r": "1 / a^n"
      },
      {
        "l": "\\(a^{1/2}\\)",
        "r": "√a"
      }
    ],
    "p_ar": [
      {
        "l": "\\(a^m \\times a^n\\)",
        "r": "a^{m+n}"
      },
      {
        "l": "\\((a^m)^n\\)",
        "r": "a^{m·n}"
      },
      {
        "l": "\\(a^{-n}\\)",
        "r": "1 / a^n"
      },
      {
        "l": "\\(a^{1/2}\\)",
        "r": "√a"
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Order of Operations",
    "ti_ar": "مثال محلول: ترتيب العمليات الحسابية",
    "steps": [
      "Evaluate \\(3+4\\times(6-2)^2\\div8\\). Start with the brackets: \\(6-2=4\\).",
      "Apply the exponent: \\(4^2=16\\). The expression becomes \\(3+4\\times16\\div8\\).",
      "Multiply and divide left to right: \\(4\\times16=64\\), \\(64\\div8=8\\). Finally \\(3+8=11\\)."
    ],
    "steps_ar": [
      "احسب \\(3+4\\times(6-2)^2\\div8\\). ابدأ بالأقواس: \\(6-2=4\\).",
      "طبّق الأس: \\(4^2=16\\). يصبح التعبير \\(3+4\\times16\\div8\\).",
      "اضرب واقسم من اليسار إلى اليمين: \\(4\\times16=64\\)، \\(64\\div8=8\\). وأخيرًا \\(3+8=11\\)."
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Simplify Powers \\(\\frac{2^5 \\times 3^3}{6^2}\\)",
    "ti_ar": "باني الخطوات: تبسيط القوى \\(\\frac{2^5 \\times 3^3}{6^2}\\)",
    "steps": [
      {
        "l": "Express denominator with bases 2 and 3: \\(6^2 = (2 \\times 3)^2 = 2^2 \\times 3^2\\). Power of 2 is \\(5 - 2 =\\)",
        "a": "3",
        "h": "Perform the calculation in \\(5 - 2\\) to find the result."
      },
      {
        "l": "\\(2^3 =\\)",
        "a": "8",
        "h": "Evaluate the power \\(2^3\\) by multiplying \\(2\\) by itself \\(3\\) times."
      },
      {
        "l": "Power of 3 is \\(3 - 2 = 1\\), so \\(3^1 = 3\\). Final product \\(8 \\times 3 =\\)",
        "a": "24",
        "h": "Perform the calculation in \\(8 \\times 3\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "فكك المقام لأساسات 2 و3: \\(6^2 = (2 \\times 3)^2 = 2^2 \\times 3^2\\). أس العدد 2 هو \\(5 - 2 =\\)",
        "a": "3",
        "h": "أجرِ العملية الحسابية في المقدار \\(5 - 2\\) للوصول إلى النتيجة."
      },
      {
        "l": "\\(2^3 =\\)",
        "a": "8",
        "h": "احسب القوة \\(2^3\\) بضرب \\(2\\) في نفسه \\(3\\) مرات."
      },
      {
        "l": "أس العدد 3 هو \\(3 - 2 = 1\\)، إذن \\(3^1 = 3\\). الناتج النهائي \\(8 \\times 3 =\\)",
        "a": "24",
        "h": "أجرِ العملية الحسابية في المقدار \\(8 \\times 3\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Evaluate Exponent Expression",
    "ti_ar": "حساب قيمة عبارة أسية",
    "q": "Find the value of \\(\\dfrac{2^6 \\times 3^4}{6^3}\\):",
    "q_ar": "أوجد قيمة المقدار \\(\\dfrac{2^6 \\times 3^4}{6^3}\\):",
    "a": 24,
    "tol": 0.001,
    "h": "6³ = 2³ × 3³. Expression = 2^(6-3) × 3^(4-3) = 8 × 3 = 24.",
    "h_ar": "6³ = 2³ × 3³. الناتج = 2^(6-3) × 3^(4-3) = 8 × 3 = 24.",
    "sol": "2³ × 3¹ = 8 × 3 = 24.",
    "sol_ar": "2³ × 3¹ = 8 × 3 = 24."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Mixed Fraction Addition and Subtraction",
    "ti_ar": "رتّب الخطوات: طرح وجمع الكسور الاعتيادية",
    "q": "Order the steps to evaluate 5/6 + 7/9 - 1/3:",
    "q_ar": "رتّب الخطوات لحساب 5/6 + 7/9 - 1/3:",
    "items": [
      "Find the least common multiple of denominators 6, 9, 3 (LCD = 18)",
      "Convert each fraction to denominator 18: 15/18 + 14/18 - 6/18",
      "Combine numerators: 15 + 14 - 6 = 23",
      "Write the combined fraction: 23/18",
      "Convert to a mixed number if desired: 1 5/18"
    ],
    "items_ar": [
      "أوجد المضاعف المشترك الأصغر للمقامات 6 و9 و3 (المقام المشترك = 18)",
      "وحّد المقامات إلى 18: 15/18 + 14/18 - 6/18",
      "اجمع واطرح البسوط: 15 + 14 - 6 = 23",
      "اكتب الناتج في صورة كسر: 23/18",
      "حوّل الكسر لعدد كسري: 1 و5/18"
    ],
    "sol": "Using the least common denominator simplifies arithmetic and prevents large numbers.",
    "sol_ar": "توحيد المقامات بالمضاعف المشترك الأصغر يمنع التعامل مع أرقام كبيرة."
  },
  {
    "t": "cat",
    "ti": "Classify Numbers: Prime vs. Composite",
    "ti_ar": "تصنيف الأعداد: أعداد أولية وغير أولية",
    "categories": [
      "Prime Number (عدد أولي)",
      "Composite Number (عدد غير أولي / مؤلف)"
    ],
    "categories_ar": [
      "عدد أولي",
      "عدد غير أولي (مؤلف)"
    ],
    "items": [
      {
        "s": "17",
        "cat": 0
      },
      {
        "s": "21",
        "cat": 1
      },
      {
        "s": "29",
        "cat": 0
      },
      {
        "s": "51",
        "cat": 1
      },
      {
        "s": "91",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "17",
        "cat": 0
      },
      {
        "s": "21",
        "cat": 1
      },
      {
        "s": "29",
        "cat": 0
      },
      {
        "s": "51",
        "cat": 1
      },
      {
        "s": "91",
        "cat": 1
      }
    ],
    "sol": "Primes have exactly two distinct positive divisors (1 and themselves); 51 = 3×17 and 91 = 7×13 are composite.",
    "sol_ar": "الأعداد الأولية لها قاسمان فقط؛ 51 = 3×17 و91 = 7×13 أعداد غير أولية."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Arithmetic & Number Sense)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (الحساب والحس العددي)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Arithmetic & Number Sense)",
    "q": "Let \\(f(x) = x^2 - 10x + 25\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 25 = (x - 5)^2 + 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State exact range: \\(f(x) \\ge 0\\) (or \\([0, \\infty)\\))."
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
            "text": "Set \\(y = (x - 5)^2 + 0 \\implies (x - 5)^2 = y - 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 0}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 0\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 0}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (الحساب والحس العددي)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 25\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 0}\\) لأن \\(x \\ge 5\\)."
  }
];

D["qud-ratio"] = [
  {
    "t": "mt",
    "ti": "Matching: Ratios & Percents",
    "ti_ar": "مطابقة: النسب والمئويات",
    "p": [
      {
        "l": "40% as fraction",
        "r": "2/5"
      },
      {
        "l": "0.75 as percent",
        "r": "75%"
      },
      {
        "l": "1/3 as decimal",
        "r": "0.333…"
      },
      {
        "l": "If a:b=2:3, a=8, b=",
        "r": "12"
      }
    ],
    "p_ar": [
      {
        "l": "40% كسر",
        "r": "2/5"
      },
      {
        "l": "0.75 كنسبة مئوية",
        "r": "75%"
      },
      {
        "l": "1/3 كعدد عشري",
        "r": "0.333…"
      },
      {
        "l": "إذا كانت a:b=2:3، وa=8، فإن b=",
        "r": "12"
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Sharing in a Ratio",
    "ti_ar": "مثال محلول: تقسيم بنسبة",
    "steps": [
      "Share 150 in the ratio 2:3:5. Find the number of equal parts.",
      "Total parts \\(=2+3+5=10\\), so each part \\(=150\\div10=15\\).",
      "The three shares are \\(2\\times15=30\\), \\(3\\times15=45\\), and \\(5\\times15=75\\)."
    ],
    "steps_ar": [
      "اقسم 150 بنسبة 2:3:5. أوجد عدد الأجزاء المتساوية.",
      "إجمالي الأجزاء \\(=2+3+5=10\\)، إذن كل جزء \\(=150\\div10=15\\).",
      "الأنصبة الثلاثة هي \\(2\\times15=30\\)، و\\(3\\times15=45\\)، و\\(5\\times15=75\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Percentage Change",
    "ti_ar": "فحص سريع: التغيّر المئوي",
    "q": "A price rises from 80 to 92. Find the percentage increase.",
    "q_ar": "يرتفع سعر من 80 إلى 92. أوجد نسبة الزيادة المئوية.",
    "o": [
      "15%",
      "12%",
      "8%",
      "20%"
    ],
    "o_ar": [
      "15%",
      "12%",
      "8%",
      "20%"
    ],
    "a": 0,
    "ex": "\\(\\dfrac{92-80}{80}\\times100\\%=15\\%\\).",
    "ex_ar": "\\(\\dfrac{92-80}{80}\\times100\\%=15\\%\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Successive Discount on 200 SAR (20% then 10%)",
    "ti_ar": "باني الخطوات: خصم متتالٍ على 200 ريال (20% ثم 10%)",
    "steps": [
      {
        "l": "First discount: \\(20\\%\\text{ of }200 = 0.20 \\times 200 =\\)",
        "a": "40",
        "h": "Perform the calculation in \\(0.20 \\times 200\\) to find the result."
      },
      {
        "l": "Price after 1st discount: \\(200 - 40 =\\)",
        "a": "160",
        "h": "Perform the calculation in \\(200 - 40\\) to find the result."
      },
      {
        "l": "Second discount: \\(10\\%\\text{ of }160 = 0.10 \\times 160 =\\)",
        "a": "16",
        "h": "Perform the calculation in \\(0.10 \\times 160\\) to find the result."
      },
      {
        "l": "Final sale price: \\(160 - 16 =\\)",
        "a": "144",
        "h": "Perform the calculation in \\(160 - 16\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "الخصم الأول: \\(20\\%\\text{ من }200 = 0.20 \\times 200 =\\)",
        "a": "40",
        "h": "أجرِ العملية الحسابية في المقدار \\(0.20 \\times 200\\) للوصول إلى النتيجة."
      },
      {
        "l": "السعر بعد الخصم الأول: \\(200 - 40 =\\)",
        "a": "160",
        "h": "أجرِ العملية الحسابية في المقدار \\(200 - 40\\) للوصول إلى النتيجة."
      },
      {
        "l": "الخصم الثاني: \\(10\\%\\text{ من }160 = 0.10 \\times 160 =\\)",
        "a": "16",
        "h": "أجرِ العملية الحسابية في المقدار \\(0.10 \\times 160\\) للوصول إلى النتيجة."
      },
      {
        "l": "السعر النهائي بعد التخفيضين: \\(160 - 16 =\\)",
        "a": "144",
        "h": "أجرِ العملية الحسابية في المقدار \\(160 - 16\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Price after Successive Discounts",
    "ti_ar": "السعر بعد تخفيضين متتاليين",
    "q": "An item costs 200 SAR. It is discounted by 20%, then by an additional 10%. What is the final price in SAR?",
    "q_ar": "سلعة سعرها 200 ريال، خُفِّضت بنسبة 20%، ثم خُفِّض السعر الجديد بنسبة 10% إضافية. ما هو السعر النهائي بالريال؟",
    "a": 144,
    "tol": 0.001,
    "h": "200 × 0.80 = 160. 160 × 0.90 = 144.",
    "h_ar": "200 × 0.80 = 160. ثم 160 × 0.90 = 144.",
    "sol": "200 × 0.80 × 0.90 = 144 SAR.",
    "sol_ar": "200 × 0.80 × 0.90 = 144 ريال."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Ratio Partition Problem",
    "ti_ar": "رتّب الخطوات: حل مسائل التقسيم التناسبي",
    "q": "Order the steps to divide 150 SAR among three people in the ratio 2:3:5:",
    "q_ar": "رتّب الخطوات لتقسيم مبلغ 150 ريال بين ثلاثة أشخاص بنسبة 2:3:5:",
    "items": [
      "Sum the ratio parts: 2 + 3 + 5 = 10 total parts",
      "Calculate the monetary value of one part: 150 / 10 = 15 SAR",
      "Multiply each person parts by single part value: 2×15, 3×15, 5×15",
      "Identify the three shares: 30 SAR, 45 SAR, and 75 SAR",
      "Verify that 30 + 45 + 75 = 150 SAR"
    ],
    "items_ar": [
      "اجمع أجزاء النسبة: 2 + 3 + 5 = 10 أجزاء إجمالية",
      "احسب قيمة الجزء الواحد: 150 ÷ 10 = 15 ريال",
      "اضرب نصيب كل شخص في قيمة الجزء الواحد: 2×15 و3×15 و5×15",
      "استخرج الأنصبة الثلاثة: 30 ريال، 45 ريال، 75 ريال",
      "تحقق من أن المجموع: 30 + 45 + 75 = 150 ريال"
    ],
    "sol": "Summing parts to find unit value solves all ratio distribution problems.",
    "sol_ar": "جمع الأجزاء لحساب قيمة الجزء الواحد هو الأساس لحل كل مسائل التقسيم التناسبي."
  },
  {
    "t": "cat",
    "ti": "Classify Proportions: Direct vs. Inverse",
    "ti_ar": "تصنيف التناسب: طردي أم عكسي",
    "categories": [
      "Direct Proportion (تناسب طردي)",
      "Inverse Proportion (تناسب عكسي)"
    ],
    "categories_ar": [
      "تناسب طردي",
      "تناسب عكسي"
    ],
    "items": [
      {
        "s": "Speed and travel time for a fixed distance",
        "cat": 1
      },
      {
        "s": "Number of pens purchased and total cost",
        "cat": 0
      },
      {
        "s": "Number of workers and time required to complete a job",
        "cat": 1
      },
      {
        "s": "Distance traveled at constant speed and elapsed time",
        "cat": 0
      },
      {
        "s": "Volume of paint and surface area covered",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "السرعة وزمن السفر لقطع مسافة ثابتة",
        "cat": 1
      },
      {
        "s": "عدد الأقلام المشتراة وإجمالي التكلفة",
        "cat": 0
      },
      {
        "s": "عدد العمال والزمن اللازم لإنجاز بناء منزل",
        "cat": 1
      },
      {
        "s": "المسافة المقطوعة بسرعة ثابتة والزمن المنقضي",
        "cat": 0
      },
      {
        "s": "كمية الدهان ومساحة الجدار المدهون",
        "cat": 0
      }
    ],
    "sol": "Direct proportion: both increase together. Inverse proportion: one increases as the other decreases.",
    "sol_ar": "التناسب الطردي تزيد فيه الكميتان معًا؛ والتناسب العكسي تزيد فيه كمية بنقصان الأخرى."
  },
  {
    "t": "se",
    "ti": "Spot the Error: The 20% Increase Followed by 20% Decrease Trap",
    "ti_ar": "اكتشف الخطأ: فخ زيادة 20% ثم تخفيض 20%",
    "q": "A dress priced at 100 SAR was marked up by 20%, then during a seasonal sale was discounted by 20%. A student reasons:",
    "q_ar": "فستان سعره 100 ريال، زاد سعره بنسبة 20%، ثم خُفِّض السعر الجديد بنسبة 20%. استنتج أحد الطلاب التالي:",
    "steps": [
      {
        "s": "Original base price is 100 SAR"
      },
      {
        "s": "20% increase adds \\(0.20 \\times 100 = 20\\) SAR, so new price is 120 SAR"
      },
      {
        "s": "20% decrease subtracts the same 20 SAR: \\(120 - 20 = 100\\) SAR"
      },
      {
        "s": "Conclusion: The final price equals the original 100 SAR"
      }
    ],
    "steps_ar": [
      {
        "s": "السعر الأصلي هو 100 ريال"
      },
      {
        "s": "الزيادة بنسبة 20% تضيف \\(0.20 \\times 100 = 20\\) ريال، فيصبح السعر 120 ريال"
      },
      {
        "s": "التخفيض بنسبة 20% يطرح نفس الـ 20 ريال: \\(120 - 20 = 100\\) ريال"
      },
      {
        "s": "الاستنتاج: السعر النهائي يعود إلى 100 ريال كما كان"
      }
    ],
    "errorStep": 3,
    "reasons": [
      "The 20% discount applies to the NEW price of 120 SAR, which is 24 SAR (not 20 SAR)",
      "The first price increase calculation was wrong",
      "Percentage change can never be applied twice"
    ],
    "reasons_ar": [
      "نسبة التخفيض 20% تُحسب من السعر الجديد (120 ريال) أي 24 ريالاً وليس 20 ريالاً",
      "حساب الزيادة في المرة الأولى كان خاطئاً",
      "لا يجوز تطبيق النسبة المئوية مرتين"
    ],
    "correctReason": 0,
    "sol": "Step 3 is the classic Qudrat trap! A 20% decrease on 120 SAR is \\(0.20 \\times 120 = 24\\) SAR. The correct final price is \\(120 - 24 = 96\\) SAR. An increase of \\(p\\%\\) followed by a decrease of \\(p\\%\\) always leaves the final price LOWER than the starting price!",
    "sol_ar": "الخطوة 3 هي الفخ الأشهر في القدرات! خصم 20% من 120 ريال يعادل \\(0.20 \\times 120 = 24\\) ريالاً. السعر النهائي الصحيح هو \\(120 - 24 = 96\\) ريالاً. زيادة بنسبة \\(p\\%\\) يليها تخفيض بنسبة \\(p\\%\\) تجعل السعر النهائي دائماً أقل من السعر الأصلي!"
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Multi-Step Structured Problem (Ratios, Proportion & Percentages)",
    "q": "Let \\(f(x) = x^2 - 6x + 12\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 12 = (x - 3)^2 + 3\\)."
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
            "text": "Set \\(y = (x - 3)^2 + 3 \\implies (x - 3)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (النسب والتناسب والمئويات)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 12\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 3}\\) لأن \\(x \\ge 3\\)."
  }
];

D["qud-algebra"] = [
  {
    "t": "tf",
    "ti": "True or False: Algebra Basics",
    "ti_ar": "صحيح أم خطأ: أساسيات الجبر",
    "items": [
      {
        "s": "\\(3(x+2)=3x+6\\)",
        "a": true,
        "ex": "Distributive property."
      },
      {
        "s": "\\(\\sqrt{a+b}=\\sqrt{a}+\\sqrt{b}\\)",
        "a": false,
        "ex": "Not true. E.g. \\(\\sqrt{25}=5\\neq3+4\\)."
      },
      {
        "s": "\\(-(-x)=x\\)",
        "a": true,
        "ex": "Double negative cancels."
      },
      {
        "s": "\\(|x|=5\\) implies \\(x=5\\) only",
        "a": false,
        "ex": "\\(x=5\\) or \\(x=-5\\)."
      }
    ],
    "items_ar": [
      {
        "s": "\\(3(x+2)=3x+6\\)",
        "a": true,
        "ex": "خاصية التوزيع."
      },
      {
        "s": "\\(\\sqrt{a+b}=\\sqrt{a}+\\sqrt{b}\\)",
        "a": false,
        "ex": "غير صحيح. مثال: \\(\\sqrt{25}=5\\neq3+4\\)."
      },
      {
        "s": "\\(-(-x)=x\\)",
        "a": true,
        "ex": "السالبان يُلغيان بعضهما."
      },
      {
        "s": "\\(|x|=5\\) تعني \\(x=5\\) فقط",
        "a": false,
        "ex": "\\(x=5\\) أو \\(x=-5\\)."
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solving a Linear System",
    "ti_ar": "مثال محلول: حل نظام معادلات خطية",
    "steps": [
      "Solve \\(3x+2y=16\\) and \\(x-2y=0\\). Notice the \\(y\\)-terms cancel when the equations are added.",
      "Add the two equations: \\(4x=16\\), so \\(x=4\\).",
      "Substitute into \\(x-2y=0\\): \\(4-2y=0\\Rightarrow y=2\\). Solution: \\(x=4,\\ y=2\\)."
    ],
    "steps_ar": [
      "حل \\(3x+2y=16\\) و\\(x-2y=0\\). لاحظ أن حدود \\(y\\) تُلغى عند جمع المعادلتين.",
      "اجمع المعادلتين: \\(4x=16\\)، إذن \\(x=4\\).",
      "عوّض في \\(x-2y=0\\): \\(4-2y=0\\Rightarrow y=2\\). الحل: \\(x=4,\\ y=2\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Powers",
    "ti_ar": "فحص سريع: الأسس",
    "q": "Simplify \\(a^5\\div a^2\\).",
    "q_ar": "بسّط \\(a^5\\div a^2\\).",
    "o": [
      "a³",
      "a⁷",
      "a²·⁵",
      "a¹⁰"
    ],
    "o_ar": [
      "a³",
      "a⁷",
      "a²·⁵",
      "a¹⁰"
    ],
    "a": 0,
    "ex": "\\(a^m\\div a^n=a^{m-n}\\Rightarrow a^{5-2}=a^3\\).",
    "ex_ar": "\\(a^m\\div a^n=a^{m-n}\\Rightarrow a^{5-2}=a^3\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Difference of Squares Shortcut \\(103^2 - 97^2\\)",
    "ti_ar": "باني الخطوات: اختصار فرق المربعين \\(103^2 - 97^2\\)",
    "steps": [
      {
        "l": "Formula: \\(a^2 - b^2 = (a - b)(a + b)\\). First factor: \\(103 - 97 =\\)",
        "a": "6",
        "h": "Perform the calculation in \\(103 - 97\\) to find the result."
      },
      {
        "l": "Second factor: \\(103 + 97 =\\)",
        "a": "200",
        "h": "Perform the calculation in \\(103 + 97\\) to find the result."
      },
      {
        "l": "Multiply factors: \\(6 \\times 200 =\\)",
        "a": "1200",
        "h": "Perform the calculation in \\(6 \\times 200\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "القانون: \\(a^2 - b^2 = (a - b)(a + b)\\). المعامل الأول: \\(103 - 97 =\\)",
        "a": "6",
        "h": "أجرِ العملية الحسابية في المقدار \\(103 - 97\\) للوصول إلى النتيجة."
      },
      {
        "l": "المعامل الثاني: \\(103 + 97 =\\)",
        "a": "200",
        "h": "أجرِ العملية الحسابية في المقدار \\(103 + 97\\) للوصول إلى النتيجة."
      },
      {
        "l": "اضرب الناتجين: \\(6 \\times 200 =\\)",
        "a": "1200",
        "h": "أجرِ العملية الحسابية في المقدار \\(6 \\times 200\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Evaluate Algebraic Identity",
    "ti_ar": "حساب قيمة متطابقة جبرية",
    "q": "If \\(x + y = 7\\) and \\(xy = 10\\), what is \\(x^2 + y^2\\)?",
    "q_ar": "إذا كان \\(x + y = 7\\) و\\(xy = 10\\)، فما قيمة \\(x^2 + y^2\\)؟",
    "a": 29,
    "tol": 0.001,
    "h": "x² + y² = (x + y)² - 2xy = 7² - 2(10).",
    "h_ar": "x² + y² = (x + y)² - 2xy = 7² - 2(10).",
    "sol": "49 - 20 = 29.",
    "sol_ar": "49 - 20 = 29."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Difference of Squares Shortcut",
    "ti_ar": "رتّب الخطوات: حل المقادير باختصار فرق المربعين",
    "q": "Order the steps to evaluate 103² - 97² without long multiplication:",
    "q_ar": "رتّب الخطوات لحساب 103² - 97² ذهنيًا دون إجراء ضرب مطول:",
    "items": [
      "Recognize difference of squares: a² - b² = (a - b)(a + b)",
      "Identify a = 103 and b = 97",
      "Calculate the difference factor: 103 - 97 = 6",
      "Calculate the sum factor: 103 + 97 = 200",
      "Multiply the two simple factors: 6 × 200 = 1200"
    ],
    "items_ar": [
      "استحضر قانون فرق المربعين: a² - b² = (a - b)(a + b)",
      "حدد قيم a = 103 و b = 97",
      "احسب ناتج القوس الأول (الفرق): 103 - 97 = 6",
      "احسب ناتج القوس الثاني (المجموع): 103 + 97 = 200",
      "اضرب الناتجين البسيطين: 6 × 200 = 1200"
    ],
    "sol": "Difference of squares converts tedious calculations into rapid mental arithmetic.",
    "sol_ar": "فرق المربعين يحوّل التربيع البطيء إلى عملية ضرب ذهني فائقة السرعة."
  },
  {
    "t": "cat",
    "ti": "Classify Algebraic Factoring Formats",
    "ti_ar": "تصنيف أشكال التحليل الجبري",
    "categories": [
      "Difference of Squares (فرق بين مربعين)",
      "Perfect Square Trinomial (مربع كامل)"
    ],
    "categories_ar": [
      "فرق بين مربعين",
      "مربع كامل"
    ],
    "items": [
      {
        "s": "x² - 49",
        "cat": 0
      },
      {
        "s": "x² + 6x + 9",
        "cat": 1
      },
      {
        "s": "4x² - 25",
        "cat": 0
      },
      {
        "s": "x² - 10x + 25",
        "cat": 1
      },
      {
        "s": "16a² - 81b²",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "x² - 49",
        "cat": 0
      },
      {
        "s": "x² + 6x + 9",
        "cat": 1
      },
      {
        "s": "4x² - 25",
        "cat": 0
      },
      {
        "s": "x² - 10x + 25",
        "cat": 1
      },
      {
        "s": "16a² - 81b²",
        "cat": 0
      }
    ],
    "sol": "Difference of squares has two terms; perfect square trinomials have three terms with 2ab in the middle.",
    "sol_ar": "فرق المربعين يتكون من حدين، بينما المربع الكامل يتكون من ثلاثة حدود تشمل الحد الأوسط 2ab."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Algebra Essentials)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (أساسيات الجبر)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Algebra Essentials)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (أساسيات الجبر)",
    "q_ar": "لتكن \\(f(x) = x^2 - 8x + 19\\) حيث \\(x \\ge 4\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(4 + \\sqrt{x - 3}\\) لأن \\(x \\ge 4\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Algebra Essentials)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (أساسيات الجبر)",
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

D["qud-geometry"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Trapezoid area, parallel sides \\(6\\) & \\(10\\), height \\(4\\)",
    "ti_ar": "باني الخطوات: مساحة شبه منحرف، الضلعان المتوازيان \\(6\\) و\\(10\\)، الارتفاع \\(4\\)",
    "steps": [
      {
        "l": "Sum of parallel sides: \\(6+10=\\)",
        "a": "16",
        "h": "Perform the calculation in \\(6+10\\) to find the result."
      },
      {
        "l": "\\(A=\\frac{1}{2}\\times16\\times4=\\)",
        "a": "32",
        "h": "\\(8\\times4=32\\)"
      }
    ],
    "steps_ar": [
      {
        "l": "مجموع القاعدتين المتوازيتين: \\(6+10=\\)",
        "a": "16",
        "h": "أجرِ العملية الحسابية في المقدار \\(6+10\\) للوصول إلى النتيجة."
      },
      {
        "l": "\\(A=\\frac{1}{2}\\times16\\times4=\\)",
        "a": "32",
        "h": "\\(8\\times4=32\\)"
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Exterior Angle of a Triangle",
    "ti_ar": "مثال محلول: الزاوية الخارجية للمثلث",
    "steps": [
      "In \\(\\triangle ABC\\), \\(\\angle A=50°\\), \\(\\angle B=60°\\). Find the exterior angle at \\(C\\).",
      "Theorem: The exterior angle equals the sum of the two remote interior angles.",
      "Exterior angle \\(=50°+60°=110°\\)."
    ],
    "steps_ar": [
      "في \\(\\triangle ABC\\)، \\(\\angle A=50°\\)، و\\(\\angle B=60°\\). أوجد الزاوية الخارجية عند \\(C\\).",
      "مبرهنة: قياس الزاوية الخارجية يساوي مجموع قياسي الزاويتين الداخليتين البعيدتين.",
      "الزاوية الخارجية \\(=50°+60°=110°\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Right Triangles",
    "ti_ar": "فحص سريع: المثلثات القائمة",
    "q": "Hypotenuse of a right triangle with legs \\(6\\) and \\(8\\):",
    "q_ar": "وتر مثلث قائم الزاوية طولا ضلعيه القائمين \\(6\\) و\\(8\\):",
    "o": [
      "10",
      "12",
      "14",
      "√28"
    ],
    "o_ar": [
      "10",
      "12",
      "14",
      "√28"
    ],
    "a": 0,
    "ex": "\\(\\sqrt{6^2+8^2}=\\sqrt{36+64}=10\\). (3-4-5 scaled by 2).",
    "ex_ar": "\\(\\sqrt{6^2+8^2}=\\sqrt{36+64}=10\\). (المثلث المشهور 3-4-5 مضروباً في 2)."
  },
  {
    "t": "qc",
    "ti": "Quick Check: Circle Area",
    "ti_ar": "فحص سريع: مساحة الدائرة",
    "q": "Area of a circle with diameter \\(10\\):",
    "q_ar": "مساحة دائرة قطرها \\(10\\):",
    "o": [
      "25π",
      "100π",
      "50π",
      "10π"
    ],
    "o_ar": [
      "25π",
      "100π",
      "50π",
      "10π"
    ],
    "a": 0,
    "ex": "Radius \\(r=5\\), Area \\(=\\pi r^2=25\\pi\\).",
    "ex_ar": "نصف القطر \\(r=5\\)، المساحة \\(=\\pi r^2=25\\pi\\)."
  },
  {
    "t": "num",
    "ti": "Calculate Right Triangle Area",
    "ti_ar": "حساب مساحة مثلث قائم",
    "q": "A right triangle has hypotenuse 15 cm and one leg 9 cm. What is its area in cm²?",
    "q_ar": "مثلث قائم الزاوية طول وتره 15 سم وطول أحد أضلاعه القائمة 9 سم. ما مساحته بالسنتيمتر المربع؟",
    "a": 54,
    "tol": 0.001,
    "h": "Other leg = √(15² - 9²) = 12. Area = (1/2) × 9 × 12 = 54.",
    "h_ar": "الضلع الآخر = √(15² - 9²) = 12. المساحة = (1/2) × 9 × 12 = 54.",
    "sol": "(1/2) × 9 × 12 = 54 cm².",
    "sol_ar": "(1/2) × 9 × 12 = 54 سم²."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Perimeter to Rectangle Area",
    "ti_ar": "رتّب الخطوات: إيجاد مساحة مستطيل من محيطه",
    "q": "Order the steps to find area of a rectangle with length (2x + 3), width (x + 1), and perimeter 38 cm:",
    "q_ar": "رتّب الخطوات لإيجاد مساحة مستطيل طوله (2x + 3) وعرضه (x + 1) ومحيطه 38 سم:",
    "items": [
      "Set up the perimeter formula: 2[(2x + 3) + (x + 1)] = 38",
      "Simplify inside brackets: 3x + 4 = 19",
      "Solve for x: 3x = 15 => x = 5",
      "Compute actual dimensions: length = 2(5) + 3 = 13 cm, width = 5 + 1 = 6 cm",
      "Calculate area: 13 × 6 = 78 cm²"
    ],
    "items_ar": [
      "اكتب معادلة المحيط: 2[(2x + 3) + (x + 1)] = 38",
      "بسّط ما داخل القوس بالقسمة على 2: 3x + 4 = 19",
      "حل المعادلة لإيجاد x: 3x = 15 => x = 5",
      "احسب الأبعاد الفعلية: الطول = 13 سم، العرض = 6 سم",
      "احسب المساحة: 13 × 6 = 78 سم²"
    ],
    "sol": "Finding x allows computing true side lengths to obtain the exact area.",
    "sol_ar": "إيجاد قيمة x يعطي الأبعاد الحقيقية لحساب المساحة بدقة."
  },
  {
    "t": "cat",
    "ti": "Classify Triangles by Angle Type",
    "ti_ar": "تصنيف المثلثات حسب الزوايا",
    "categories": [
      "Right Triangle (مثلث قائم)",
      "Acute or Obtuse Triangle (حاد أو منفرج الزوايا)"
    ],
    "categories_ar": [
      "مثلث قائم الزاوية",
      "مثلث حاد أو منفرج الزوايا"
    ],
    "items": [
      {
        "s": "Sides 3, 4, 5",
        "cat": 0
      },
      {
        "s": "Sides 5, 12, 13",
        "cat": 0
      },
      {
        "s": "Sides 4, 5, 6",
        "cat": 1
      },
      {
        "s": "Sides 8, 15, 17",
        "cat": 0
      },
      {
        "s": "Sides 6, 8, 11",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "الأضلاع: 3، 4، 5",
        "cat": 0
      },
      {
        "s": "الأضلاع: 5، 12، 13",
        "cat": 0
      },
      {
        "s": "الأضلاع: 4، 5، 6",
        "cat": 1
      },
      {
        "s": "الأضلاع: 8، 15، 17",
        "cat": 0
      },
      {
        "s": "الأضلاع: 6، 8، 11",
        "cat": 1
      }
    ],
    "sol": "Right triangles satisfy the Pythagorean theorem a² + b² = c².",
    "sol_ar": "المثلثات القائمة تحقق نظرية فيثاغورس a² + b² = c²."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Geometry & Measurement)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (الهندسة والقياس)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Geometry & Measurement)",
    "q": "Let \\(f(x) = x^2 - 10x + 32\\) for \\(x \\ge 5\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 5)^2 - 25 + 32 = (x - 5)^2 + 7\\)."
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
            "text": "Set \\(y = (x - 5)^2 + 7 \\implies (x - 5)^2 = y - 7\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 5\\)): \\(f^{-1}(x) = 5 + \\sqrt{x - 7}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 7\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 7}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 5\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (الهندسة والقياس)",
    "q_ar": "لتكن \\(f(x) = x^2 - 10x + 32\\) حيث \\(x \\ge 5\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(5 + \\sqrt{x - 7}\\) لأن \\(x \\ge 5\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Core Algebraic & Analytic Principles (Geometry & Measurement)",
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
    "ti_ar": "مطابقة: المبادئ الجبرية والتحليلية الأساسية (الهندسة والقياس)",
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

D["qud-compare"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Quantitative Comparison",
    "ti_ar": "مثال محلول: المقارنات الكمية",
    "steps": [
      "Compare: Column A: \\(2^{30}\\), Column B: \\(3^{20}\\). The numbers are too large to calculate directly.",
      "Express both with the same exponent: \\(2^{30}=(2^3)^{10}=8^{10}\\), and \\(3^{20}=(3^2)^{10}=9^{10}\\).",
      "Compare bases: \\(8<9\\), so \\(8^{10}<9^{10}\\). Answer: Column B is greater."
    ],
    "steps_ar": [
      "قارن بين: القيمة الأولى: \\(2^{30}\\)، والقيمة الثانية: \\(3^{20}\\). الأعداد كبيرة جدًا على الحساب المباشر.",
      "وحّد الأسس: \\(2^{30}=(2^3)^{10}=8^{10}\\)، و\\(3^{20}=(3^2)^{10}=9^{10}\\).",
      "قارن الأساسات: \\(8<9\\)، إذن \\(8^{10}<9^{10}\\). الإجابة: القيمة الثانية أكبر."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Comparison with Fractions",
    "ti_ar": "فحص سريع: مقارنة الكسور",
    "q": "Column A: \\(\\frac{5}{8}\\), Column B: \\(\\frac{7}{11}\\). Compare.",
    "q_ar": "القيمة الأولى: \\(\\frac{5}{8}\\)، القيمة الثانية: \\(\\frac{7}{11}\\). قارن.",
    "o": [
      "Column B is greater (القيمة الثانية أكبر)",
      "Column A is greater (القيمة الأولى أكبر)",
      "The two values are equal (القيمتان متساويتان)",
      "Cannot be determined (المعطيات غير كافية)"
    ],
    "o_ar": [
      "القيمة الثانية أكبر",
      "القيمة الأولى أكبر",
      "القيمتان متساويتان",
      "المعطيات غير كافية"
    ],
    "a": 0,
    "ex": "Cross-multiply: \\(5\\times11=55\\) vs \\(8\\times7=56\\). Since \\(56>55\\), Column B is greater.",
    "ex_ar": "المقص: \\(5\\times11=55\\) مقابل \\(8\\times7=56\\). بما أن \\(56>55\\)، فالقيمة الثانية أكبر."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Variables in Comparisons",
    "ti_ar": "مختبر التفكير: المتغيرات في المقارنات",
    "items": [
      {
        "s": "If \\(x<1\\), then \\(x^2>x\\) is always true.",
        "a": false,
        "ex": "False: if \\(x=1/2\\), \\(x^2=1/4<1/2\\)."
      },
      {
        "s": "If \\(x>0\\), then \\(x+\\frac{1}{x}\\ge2\\) always.",
        "a": true,
        "ex": "AM-GM inequality: \\(x+1/x\\ge2\\sqrt{x\\cdot1/x}=2\\)."
      },
      {
        "s": "If \\(a>b\\), then \\(a^2>b^2\\) always.",
        "a": false,
        "ex": "False with negatives: \\(1>-3\\) but \\(1^2<(-3)^2=9\\)."
      }
    ],
    "items_ar": [
      {
        "s": "إذا كان \\(x<1\\)، فإن \\(x^2>x\\) صحيح دائمًا.",
        "a": false,
        "ex": "خطأ: إذا كان \\(x=1/2\\)، فإن \\(x^2=1/4<1/2\\)."
      },
      {
        "s": "إذا كان \\(x>0\\)، فإن \\(x+\\frac{1}{x}\\ge2\\) دائمًا.",
        "a": true,
        "ex": "متباينة الوسطين: \\(x+1/x\\ge2\\sqrt{x\\cdot1/x}=2\\)."
      },
      {
        "s": "إذا كان \\(a>b\\)، فإن \\(a^2>b^2\\) دائمًا.",
        "a": false,
        "ex": "خطأ مع الأعداد السالبة: \\(1>-3\\) لكن \\(1^2<(-3)^2=9\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Comparison Outcomes",
    "ti_ar": "مطابقة: نتائج المقارنة",
    "p": [
      {
        "l": "\\(x>0\\): \\(x^2\\) vs \\(x^3\\) for \\(x=1/2\\)",
        "r": "Column A is greater (1/4 > 1/8)"
      },
      {
        "l": "\\(x=2\\): \\(x^2\\) vs \\(x^3\\)",
        "r": "Column B is greater (8 > 4)"
      },
      {
        "l": "\\(x=1\\): \\(x^2\\) vs \\(x^3\\)",
        "r": "Equal (1 = 1)"
      },
      {
        "l": "\\(x\\) unconstrained: \\(x^2\\) vs \\(x^3\\)",
        "r": "Cannot be determined"
      }
    ],
    "p_ar": [
      {
        "l": "\\(x>0\\): \\(x^2\\) مقابل \\(x^3\\) لـ \\(x=1/2\\)",
        "r": "القيمة الأولى أكبر (1/4 > 1/8)"
      },
      {
        "l": "\\(x=2\\): \\(x^2\\) مقابل \\(x^3\\)",
        "r": "القيمة الثانية أكبر (8 > 4)"
      },
      {
        "l": "\\(x=1\\): \\(x^2\\) مقابل \\(x^3\\)",
        "r": "القيمتان متساويتان (1 = 1)"
      },
      {
        "l": "\\(x\\) غير محدد: \\(x^2\\) مقابل \\(x^3\\)",
        "r": "المعطيات غير كافية"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Evaluate Difference Between Quantities",
    "ti_ar": "حساب الفرق بين كميتين",
    "q": "If Quantity A is \\(2^{10}\\) and Quantity B is 1000, what is \\(\\text{A} - \\text{B}\\)?",
    "q_ar": "إذا كانت القيمة الأولى \\(2^{10}\\) والقيمة الثانية 1000، فما ناتج الفرق \\(\\text{الأولى} - \\text{الثانية}\\)?",
    "a": 24,
    "tol": 0.001,
    "h": "2^(10) = 1024. 1024 - 1000 = 24.",
    "h_ar": "2^(10) = 1024. 1024 - 1000 = 24.",
    "sol": "1024 - 1000 = 24.",
    "sol_ar": "1024 - 1000 = 24."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Quantitative Comparison Strategy",
    "ti_ar": "رتّب الخطوات: استراتيجية حل سؤال المقارنات",
    "q": "Order the steps to compare two algebraic expressions with variable x:",
    "q_ar": "رتّب الخطوات لمقارنة عبارتين جبريتين تحويان المتغير x:",
    "items": [
      "Check for common terms in both quantities and cancel or subtract them",
      "Simplify remaining algebraic expressions completely",
      "Test positive integer values (e.g., x = 2)",
      "Test fractional values between 0 and 1, zero, and negative values",
      "If the relationship changes across test cases, select Option D (Insufficient Info)"
    ],
    "items_ar": [
      "ابحث عن الحدود المشتركة بين الطرفين واحذفها بالتبسيط",
      "بسّط العبارتين الجبريتين المتبقيتين إلى أقصى حد",
      "جرّب قيمة موجبة صحيحة (مثل x = 2)",
      "جرّب كسورًا بين 0 و1 والصفر والأعداد السالبة",
      "إذا اختلفت النتيجة بين الحالات اختر فورًا الخيار (د) المعطيات غير كافية"
    ],
    "sol": "Testing edge-case numbers prevents falling into traps of apparent equality.",
    "sol_ar": "تجربة القيم الحرجة يحمي من الوقوع في فخ التسرع باختيار إجابة خاطئة."
  },
  {
    "t": "cat",
    "ti": "Classify Comparison Outcomes",
    "ti_ar": "تصنيف نتائج المقارنة",
    "categories": [
      "Quantity A is Greater (A > B)",
      "Quantity B is Greater (B > A)",
      "Quantities are Equal (A = B)"
    ],
    "categories_ar": [
      "القيمة الأولى أكبر",
      "القيمة الثانية أكبر",
      "القيمتان متساويتان"
    ],
    "items": [
      {
        "s": "Quantity A: x + 5 vs Quantity B: x + 2 for any real x",
        "cat": 0
      },
      {
        "s": "Quantity A: -3x vs Quantity B: -x for x > 0",
        "cat": 1
      },
      {
        "s": "Quantity A: (x - 2)² vs Quantity B: x² - 4x + 4",
        "cat": 2
      },
      {
        "s": "Quantity A: 2x vs Quantity B: 5x for x > 0",
        "cat": 1
      },
      {
        "s": "Quantity A: x² + 1 vs Quantity B: -5 for any real x",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "القيمة الأولى: x + 5 مقابل القيمة الثانية: x + 2 لأي x حقيقي",
        "cat": 0
      },
      {
        "s": "القيمة الأولى: -3x مقابل القيمة الثانية: -x عندما x > 0",
        "cat": 1
      },
      {
        "s": "القيمة الأولى: (x - 2)² مقابل القيمة الثانية: x² - 4x + 4",
        "cat": 2
      },
      {
        "s": "القيمة الأولى: 2x مقابل القيمة الثانية: 5x عندما x > 0",
        "cat": 1
      },
      {
        "s": "القيمة الأولى: x² + 1 مقابل القيمة الثانية: -5 لأي x حقيقي",
        "cat": 0
      }
    ],
    "sol": "Comparing simplified forms reveals constant, sign-dependent, or identical relationships.",
    "sol_ar": "المقارنة بعد التبسيط تكشف العلاقات الثابتة والمتطابقة بدقة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Quantitative Comparisons)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (المقارنات الكمّية)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Quantitative Comparisons)",
    "q": "Let \\(f(x) = x^2 - 4x + 7\\) for \\(x \\ge 2\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 2)^2 - 4 + 7 = (x - 2)^2 + 3\\)."
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
            "text": "Set \\(y = (x - 2)^2 + 3 \\implies (x - 2)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 2\\)): \\(f^{-1}(x) = 2 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 2\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (المقارنات الكمّية)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 7\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 3}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Quantitative Comparisons)",
    "steps": [
      {
        "l": "In \\(y = x^2 - 4x + 7\\), halve the \\(x\\)-coefficient to write \\((x - h)^2\\) where \\(h =\\)",
        "a": "2",
        "h": "Take half of 4."
      },
      {
        "l": "Compute the minimum value \\(k = 7 - 2^2 =\\)",
        "a": "3",
        "h": "Subtract 4 from 7."
      },
      {
        "l": "Evaluate \\(y\\) when \\(x = 4\\): \\(y =\\)",
        "a": "7",
        "h": "Compute \\((2)^2 + 3\\)."
      }
    ],
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (المقارنات الكمّية)",
    "steps_ar": [
      {
        "l": "في الدالة \\(y = x^2 - 4x + 7\\): قيمة \\(h\\) في \\((x - h)^2\\) تساوي:",
        "a": "2",
        "h": "اقسم معامل x وهو 4 على 2."
      },
      {
        "l": "احسب القيمة الصغرى \\(k = 7 - 2^2 =\\)",
        "a": "3",
        "h": "اطرح 4 من 7."
      },
      {
        "l": "احسب قيمة \\(y\\) عندما \\(x = 4\\):",
        "a": "7",
        "h": "احسب \\(4 + 3\\)."
      }
    ]
  }
];

D["qud-patterns"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Finding the Next Term",
    "ti_ar": "مثال محلول: إيجاد الحد التالي",
    "steps": [
      "Find the next term in \\(2, 5, 10, 17, 26, \\ldots\\). Compute the first differences.",
      "Differences: \\(5-2=3\\), \\(10-5=5\\), \\(17-10=7\\), \\(26-17=9\\). The differences increase by 2 each time.",
      "Next difference: \\(9+2=11\\). Next term: \\(26+11=37\\). (Pattern: \\(n^2+1\\))."
    ],
    "steps_ar": [
      "أوجد الحد التالي في \\(2، 5، 10، 17، 26، \\ldots\\). احسب الفروق الأولى.",
      "الفروق: \\(5-2=3\\)، \\(10-5=5\\)، \\(17-10=7\\)، \\(26-17=9\\). الفروق تزيد بمقدار 2 في كل مرة.",
      "الفرق التالي: \\(9+2=11\\). الحد التالي: \\(26+11=37\\). (النمط هو: \\(n^2+1\\))."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Arithmetic Sequence",
    "ti_ar": "فحص سريع: متتالية حسابية",
    "q": "In an arithmetic sequence with \\(a_1=5\\) and \\(d=3\\), find \\(a_{10}\\).",
    "q_ar": "في متتالية حسابية حدها الأول \\(a_1=5\\) وأساسها \\(d=3\\)، أوجد \\(a_{10}\\).",
    "o": [
      "32",
      "35",
      "29",
      "38"
    ],
    "o_ar": [
      "32",
      "35",
      "29",
      "38"
    ],
    "a": 0,
    "ex": "\\(a_n=a_1+(n-1)d\\Rightarrow a_{10}=5+9\\times3=32\\).",
    "ex_ar": "\\(a_n=a_1+(n-1)d\\Rightarrow a_{10}=5+9\\times3=32\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Sum of First n Integers \\(1 + 2 + \\ldots + 20\\)",
    "ti_ar": "باني الخطوات: مجموع أول n عدد صحيح \\(1 + 2 + \\ldots + 20\\)",
    "steps": [
      {
        "l": "Formula: \\(S = \\frac{n(n+1)}{2}\\). Here \\(n = 20\\). Compute \\(n + 1 =\\)",
        "a": "21",
        "h": "Perform the calculation in \\(n + 1\\) to find the result."
      },
      {
        "l": "\\(20 \\times 21 =\\)",
        "a": "420",
        "h": "Perform the calculation in \\(20 \\times 21\\) to find the result."
      },
      {
        "l": "Divide by 2: \\(420 / 2 =\\)",
        "a": "210",
        "h": "Perform the calculation in \\(420 / 2\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "القانون: \\(S = \\frac{n(n+1)}{2}\\). هنا \\(n = 20\\). احسب \\(n + 1 =\\)",
        "a": "21",
        "h": "أجرِ العملية الحسابية في المقدار \\(n + 1\\) للوصول إلى النتيجة."
      },
      {
        "l": "\\(20 \\times 21 =\\)",
        "a": "420",
        "h": "أجرِ العملية الحسابية في المقدار \\(20 \\times 21\\) للوصول إلى النتيجة."
      },
      {
        "l": "اقسم على 2: \\(420 / 2 =\\)",
        "a": "210",
        "h": "أجرِ العملية الحسابية في المقدار \\(420 / 2\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Sequences & Patterns",
    "ti_ar": "مطابقة: المتتاليات والأنماط",
    "p": [
      {
        "l": "Arithmetic sequence nth term",
        "r": "a_1 + (n - 1)d"
      },
      {
        "l": "Geometric sequence nth term",
        "r": "a_1 · r^{n-1}"
      },
      {
        "l": "Sum of first n integers",
        "r": "n(n + 1) / 2"
      },
      {
        "l": "Sum of odd numbers 1+3+…+(2n-1)",
        "r": "n²"
      }
    ],
    "p_ar": [
      {
        "l": "الحد النوني لمتتالية حسابية",
        "r": "a_1 + (n - 1)d"
      },
      {
        "l": "الحد النوني لمتتالية هندسية",
        "r": "a_1 · r^{n-1}"
      },
      {
        "l": "مجموع أول n عدد صحيح",
        "r": "n(n + 1) / 2"
      },
      {
        "l": "مجموع أول n عدد فردي",
        "r": "n²"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Multiples Count in Range",
    "ti_ar": "عدد المضاعفات في فترة",
    "q": "How many multiples of 4 are there between 15 and 95?",
    "q_ar": "كم عدد مضاعفات العدد 4 المحصورة بين 15 و95؟",
    "a": 20,
    "tol": 0.001,
    "h": "Smallest is 16, largest is 92. Count = (92 - 16)/4 + 1 = 19 + 1 = 20.",
    "h_ar": "الأول هو 16، والأخير هو 92. عدد الحدود = (92 - 16)/4 + 1 = 20.",
    "sol": "(92 - 16)/4 + 1 = 20.",
    "sol_ar": "(92 - 16)/4 + 1 = 20."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Arithmetic Sequence nth Term",
    "ti_ar": "رتّب الخطوات: إيجاد رتبة الحد في المتتالية الحسابية",
    "q": "Order the steps to find which term of sequence 7, 12, 17, 22... equals 82:",
    "q_ar": "رتّب الخطوات لمعرفة أي حد في المتتالية 7، 12، 17، 22... يساوي 82:",
    "items": [
      "Identify first term a = 7 and common difference d = 12 - 7 = 5",
      "Recall general nth term formula: a_n = a + (n - 1)d",
      "Set up the equation: 7 + 5(n - 1) = 82",
      "Subtract 7 from both sides: 5(n - 1) = 75",
      "Divide by 5 and add 1: n - 1 = 15 => n = 16"
    ],
    "items_ar": [
      "حدد الحد الأول a = 7 وأساس المتتالية d = 12 - 7 = 5",
      "استحضر قانون الحد العام للمتتالية الحسابية: a_n = a + (n - 1)d",
      "اكتب المعادلة: 7 + 5(n - 1) = 82",
      "اطرح 7 من الطرفين: 5(n - 1) = 75",
      "اقسم على 5 ثم أضف 1: n - 1 = 15 => n = 16"
    ],
    "sol": "The formula a_n = a + (n - 1)d solves for any unknown term index.",
    "sol_ar": "قانون الحد العام يتيح إيجاد رتبة أي حد بدقة."
  },
  {
    "t": "cat",
    "ti": "Classify Sequence Types",
    "ti_ar": "تصنيف أنواع المتتاليات",
    "categories": [
      "Arithmetic Sequence (متتالية حسابية - جمع ثابت)",
      "Geometric Sequence (متتالية هندسية - ضرب ثابت)"
    ],
    "categories_ar": [
      "متتالية حسابية (جمع ثابت)",
      "متتالية هندسية (ضرب ثابت)"
    ],
    "items": [
      {
        "s": "3, 7, 11, 15, 19...",
        "cat": 0
      },
      {
        "s": "2, 6, 18, 54...",
        "cat": 1
      },
      {
        "s": "100, 50, 25, 12.5...",
        "cat": 1
      },
      {
        "s": "50, 43, 36, 29...",
        "cat": 0
      },
      {
        "s": "5, 10, 20, 40...",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "3، 7، 11، 15، 19...",
        "cat": 0
      },
      {
        "s": "2، 6، 18، 54...",
        "cat": 1
      },
      {
        "s": "100، 50، 25، 12.5...",
        "cat": 1
      },
      {
        "s": "50، 43، 36، 29...",
        "cat": 0
      },
      {
        "s": "5، 10، 20، 40...",
        "cat": 1
      }
    ],
    "sol": "Arithmetic sequences add a constant difference; geometric sequences multiply by a constant ratio.",
    "sol_ar": "المتتالية الحسابية تضيف فرقًا ثابتًا، والهندسية تضرب في نسبة ثابتة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Sequences & Patterns)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (المتتاليات والأنماط)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Sequences & Patterns)",
    "q": "Let \\(f(x) = x^2 - 6x + 12\\) for \\(x \\ge 3\\). (a) Express \\(f(x)\\) in completed-square vertex form and state the range of \\(f\\). (b) Find an expression for the inverse function \\(f^{-1}(x)\\) and state its domain.",
    "parts": [
      {
        "label": "Part (a) — Vertex Form & Range",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Complete the square: \\(f(x) = (x - 3)^2 - 9 + 12 = (x - 3)^2 + 3\\)."
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
            "text": "Set \\(y = (x - 3)^2 + 3 \\implies (x - 3)^2 = y - 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select positive branch (since \\(x \\ge 3\\)): \\(f^{-1}(x) = 3 + \\sqrt{x - 3}\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "State domain of \\(f^{-1}\\): \\(x \\ge 3\\) (matching the range of \\(f\\))."
          }
        ]
      }
    ],
    "examinerTip": "Writing \\(\\pm\\sqrt{x - 3}\\) for \\(f^{-1}(x)\\) loses the final A1 mark because a function must be single-valued; use the domain restriction \\(x \\ge 3\\) to choose the \\(+\\) sign.",
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (المتتاليات والأنماط)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 12\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 3}\\) لأن \\(x \\ge 3\\)."
  }
];

D["qud-data"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Mean, Median, and Mode",
    "ti_ar": "مثال محلول: المتوسط والوسيط والمنوال",
    "steps": [
      "Data: \\(3, 7, 3, 8, 9\\). First order the data: \\(3, 3, 7, 8, 9\\).",
      "Mean: \\((3+7+3+8+9)/5 = 30/5 = 6\\).",
      "Median: middle value of ordered list \\(= 7\\). Mode: most frequent value \\(= 3\\)."
    ],
    "steps_ar": [
      "البيانات: \\(3، 7، 3، 8، 9\\). أولًا رتّب البيانات: \\(3، 3، 7، 8، 9\\).",
      "المتوسط الحسابي: \\((3+7+3+8+9)/5 = 30/5 = 6\\).",
      "الوسيط: القيمة الوسطى في القائمة المرتبة \\(= 7\\). المنوال: القيمة الأكثر تكرارًا \\(= 3\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Weighted Average",
    "ti_ar": "فحص سريع: المتوسط الموزون",
    "q": "A test counts 40% and an exam counts 60%. Scores are 80 on the test, 90 on the exam. Weighted mean:",
    "q_ar": "اختبار قصير وزنه 40% واختبار نهائي وزنه 60%. الدرجات: 80 في القصير و90 في النهائي. المتوسط الموزون:",
    "o": [
      "86",
      "85",
      "84",
      "88"
    ],
    "o_ar": [
      "86",
      "85",
      "84",
      "88"
    ],
    "a": 0,
    "ex": "\\(0.40\\times80+0.60\\times90=32+54=86\\).",
    "ex_ar": "\\(0.40\\times80+0.60\\times90=32+54=86\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Statistical Measures",
    "ti_ar": "مطابقة: المقاييس الإحصائية",
    "p": [
      {
        "l": "Mean",
        "r": "Sum of values / number of values"
      },
      {
        "l": "Median",
        "r": "Middle value of ordered data"
      },
      {
        "l": "Mode",
        "r": "Value appearing most frequently"
      },
      {
        "l": "Range",
        "r": "Maximum - Minimum"
      }
    ],
    "p_ar": [
      {
        "l": "المتوسط الحسابي",
        "r": "مجموع القيم / عدد القيم"
      },
      {
        "l": "الوسيط",
        "r": "القيمة الوسطى بعد الترتيب"
      },
      {
        "l": "المنوال",
        "r": "القيمة الأكثر تكراراً"
      },
      {
        "l": "المدى",
        "r": "أكبر قيمة - أصغر قيمة"
      }
    ]
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Probability & Data Interpretation",
    "ti_ar": "مختبر التفكير: الاحتمالات وتفسير البيانات",
    "items": [
      {
        "s": "Probability of an impossible event is 0.",
        "a": true,
        "ex": "Events that cannot happen have P = 0."
      },
      {
        "s": "Adding 5 to every data point increases the standard deviation by 5.",
        "a": false,
        "ex": "Shifting data by a constant does not change spread or standard deviation."
      },
      {
        "s": "In a standard 52-card deck, probability of drawing an Ace is 1/13.",
        "a": true,
        "ex": "4 Aces out of 52 cards: 4/52 = 1/13."
      }
    ],
    "items_ar": [
      {
        "s": "احتمال الحدث المستحيل يساوي 0.",
        "a": true,
        "ex": "الأحداث التي لا يمكن وقوعها احتمالها 0."
      },
      {
        "s": "إضافة 5 إلى كل قيمة في البيانات يزيد الانحراف المعياري بمقدار 5.",
        "a": false,
        "ex": "إضافة ثابت لجميع القيم يغير المتوسط فقط ولا يغير التشتت أو الانحراف المعياري."
      },
      {
        "s": "في حزمة أوراق لعب قياسية (52 ورقة)، احتمال سحب ورقة (آص) هو 1/13.",
        "a": true,
        "ex": "4 أوراق آص من أصل 52: 4/52 = 1/13."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculate New Score from Mean",
    "ti_ar": "حساب درجة طالب جديد من المتوسط",
    "q": "The average score of 5 students is 82. When a 6th student score is included, the new average becomes 84. What is the 6th score?",
    "q_ar": "متوسط درجات 5 طلاب هو 82. عند إضافة درجة طالب سادس، أصبح المتوسط الجديد 84. ما درجة الطالب السادس؟",
    "a": 94,
    "tol": 0.001,
    "h": "Total 5 = 410. Total 6 = 504. Difference = 504 - 410 = 94.",
    "h_ar": "مجموع 5 = 410. مجموع 6 = 504. الفرق = 504 - 410 = 94.",
    "sol": "504 - 410 = 94.",
    "sol_ar": "504 - 410 = 94."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Calculate the Median",
    "ti_ar": "رتّب الخطوات: حساب الوسيط لمجموعة بيانات",
    "q": "Order the steps to find the median of the dataset 17, 14, 16, 14, 18, 15, 14:",
    "q_ar": "رتّب الخطوات لحساب الوسيط للقيم: 17، 14، 16، 14، 18، 15، 14:",
    "items": [
      "Sort the dataset in ascending order: 14, 14, 14, 15, 16, 17, 18",
      "Count total number of observations: n = 7",
      "Determine median position: (7 + 1) / 2 = 4th value",
      "Locate the 4th item in the sorted list",
      "Identify median = 15"
    ],
    "items_ar": [
      "رتّب البيانات تصاعديًا: 14، 14، 14، 15، 16، 17، 18",
      "احسب عدد القيم: n = 7 قيم",
      "حدد رتبة الوسيط: (7 + 1) ÷ 2 = القيمة الرابعة",
      "عَيّن القيمة التي تقع في المرتبة الرابعة في القائمة المرتبة",
      "استخرج قيمة الوسيط = 15"
    ],
    "sol": "Sorting is mandatory; the middle position represents the true median.",
    "sol_ar": "الترتيب إلزامي؛ القيمة الوسطى تمثل الوسيط الحقيقي."
  },
  {
    "t": "cat",
    "ti": "Classify Statistical Measures",
    "ti_ar": "تصنيف المقاييس الإحصائية",
    "categories": [
      "Measures of Central Tendency (مقاييس النزعة المركزية)",
      "Measures of Dispersion / Spread (مقاييس التشتت)"
    ],
    "categories_ar": [
      "مقاييس النزعة المركزية",
      "مقاييس التشتت"
    ],
    "items": [
      {
        "s": "Arithmetic Mean (المتوسط الحسابي)",
        "cat": 0
      },
      {
        "s": "Range (المدى)",
        "cat": 1
      },
      {
        "s": "Median (الوسيط)",
        "cat": 0
      },
      {
        "s": "Standard Deviation (الانحراف المعياري)",
        "cat": 1
      },
      {
        "s": "Mode (المنوال)",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "المتوسط الحسابي",
        "cat": 0
      },
      {
        "s": "المدى",
        "cat": 1
      },
      {
        "s": "الوسيط",
        "cat": 0
      },
      {
        "s": "الانحراف المعياري",
        "cat": 1
      },
      {
        "s": "المنوال",
        "cat": 0
      }
    ],
    "sol": "Central tendency identifies center; dispersion measures variation and spread.",
    "sol_ar": "النزعة المركزية تقيس التمركز، بينما التشتت يقيس تباعد البيانات وانتشارها."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Data Analysis & Probability)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (تحليل البيانات والاحتمالات)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Data Analysis & Probability)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (تحليل البيانات والاحتمالات)",
    "q_ar": "لتكن \\(f(x) = x^2 - 4x + 8\\) حيث \\(x \\ge 2\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(2 + \\sqrt{x - 4}\\) لأن \\(x \\ge 2\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Completing the Square & Vertex Analysis (Data Analysis & Probability)",
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
    "ti_ar": "بناء الخطوات: إكمال المربع وإيجاد القيمة الصغرى (تحليل البيانات والاحتمالات)",
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
  }
];

D["qud-word"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Rate, Distance, and Time",
    "ti_ar": "مثال محلول: السرعة والمسافة والزمن",
    "steps": [
      "A car travels 180 km at 60 km/h, then 120 km at 40 km/h. Find average speed.",
      "Time for first part: \\(180/60 = 3\\) hours. Time for second part: \\(120/40 = 3\\) hours.",
      "Total distance \\(= 180+120=300\\) km. Total time \\(= 3+3=6\\) hours.",
      "Average speed \\(= 300/6 = 50\\) km/h. (Never average the speeds directly!)."
    ],
    "steps_ar": [
      "تسير سيارة مسافة 180 كم بسرعة 60 كم/س، ثم 120 كم بسرعة 40 كم/س. أوجد السرعة المتوسطة.",
      "زمن الجزء الأول: \\(180/60 = 3\\) ساعات. زمن الجزء الثاني: \\(120/40 = 3\\) ساعات.",
      "المسافة الكلية \\(= 180+120=300\\) كم. الزمن الكلي \\(= 3+3=6\\) ساعات.",
      "السرعة المتوسطة \\(= 300/6 = 50\\) كم/س. (إياك أن تأخذ متوسط السرعتين مباشرة!)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Work Problem",
    "ti_ar": "فحص سريع: مسائل العمل",
    "q": "A pipe fills a tank in 4 hours, another in 6 hours. Together, time to fill:",
    "q_ar": "حنفية تملأ خزانًا في 4 ساعات، وأخرى في 6 ساعات. معًا، زمن الملء:",
    "o": [
      "2.4 hours",
      "5 hours",
      "2.5 hours",
      "3 hours"
    ],
    "o_ar": [
      "2.4 ساعة",
      "5 ساعات",
      "2.5 ساعة",
      "3 ساعات"
    ],
    "a": 0,
    "ex": "Rate \\(=1/4+1/6=5/12\\) tank/h. Time \\(=12/5=2.4\\) hours.",
    "ex_ar": "المعدل \\(=1/4+1/6=5/12\\) خزان/ساعة. الزمن \\(=12/5=2.4\\) ساعة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Age Problem (Father is 3 times son age)",
    "ti_ar": "باني الخطوات: مسائل الأعمار (عمر الأب 3 أمثال عمر ابنه)",
    "steps": [
      {
        "l": "Son age = x, Father = 3x. Sum of ages is 48: \\(x + 3x = 48 \\Rightarrow\\) ? \\(x = 48\\):",
        "a": "4",
        "h": "Perform the calculation in \\(x = 48\\) to find the result."
      },
      {
        "l": "Solve for son age: \\(48 / 4 =\\)",
        "a": "12",
        "h": "Perform the calculation in \\(48 / 4\\) to find the result."
      },
      {
        "l": "Father age: \\(3 \\times 12 =\\)",
        "a": "36",
        "h": "Perform the calculation in \\(3 \\times 12\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "عمر الابن = x، الأب = 3x. مجموع أعمارهما 48: \\(x + 3x = 48 \\Rightarrow\\) ؟ \\(x = 48\\):",
        "a": "4",
        "h": "أجرِ العملية الحسابية في المقدار \\(x = 48\\) للوصول إلى النتيجة."
      },
      {
        "l": "عمر الابن: \\(48 / 4 =\\)",
        "a": "12",
        "h": "أجرِ العملية الحسابية في المقدار \\(48 / 4\\) للوصول إلى النتيجة."
      },
      {
        "l": "عمر الأب: \\(3 \\times 12 =\\)",
        "a": "36",
        "h": "أجرِ العملية الحسابية في المقدار \\(3 \\times 12\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Word Problem Equations",
    "ti_ar": "مطابقة: معادلات المسائل الحياتية",
    "p": [
      {
        "l": "Distance",
        "r": "Speed × Time"
      },
      {
        "l": "Combined work rate",
        "r": "1/A + 1/B"
      },
      {
        "l": "Remaining amount after discount",
        "r": "Original × (1 - discount)"
      },
      {
        "l": "Percentage share",
        "r": "(Part / Total) × 100%"
      }
    ],
    "p_ar": [
      {
        "l": "المسافة",
        "r": "السرعة × الزمن"
      },
      {
        "l": "معدل العمل المشترك",
        "r": "1/A + 1/B"
      },
      {
        "l": "المبلغ المتبقي بعد الخصم",
        "r": "الأصلي × (1 - الخصم)"
      },
      {
        "l": "النسبة المئوية",
        "r": "(الجزء / الكل) × 100%"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Combined Work Time Calculation",
    "ti_ar": "حساب زمن العمل المشترك",
    "q": "Worker A finishes a task in 6 hours, Worker B in 3 hours. Working together, how many hours will they take?",
    "q_ar": "ينجز العامل (أ) عملًا في 6 ساعات، والعامل (ب) في 3 ساعات. معًا، كم ساعة يستغرقان لإنجازه؟",
    "a": 2,
    "tol": 0.001,
    "h": "Combined rate = 1/6 + 1/3 = 1/2. Time = 2 hours.",
    "h_ar": "المعدل = 1/6 + 1/3 = 1/2. الزمن = 2 ساعتان.",
    "sol": "Time = 2 hours.",
    "sol_ar": "الزمن = 2 ساعتان."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Average Speed Calculation",
    "ti_ar": "رتّب الخطوات: حساب السرعة المتوسطة لرحلة ذهاب وإياب",
    "q": "Order the steps to find average speed for a 120 km trip at 60 km/h and returning at 40 km/h:",
    "q_ar": "رتّب الخطوات لحساب السرعة المتوسطة لرحلة ذهاب مسافتها 120 كم بسرعة 60 كم/س وإياب بسرعة 40 كم/س:",
    "items": [
      "Compute outbound trip time: 120 / 60 = 2 hours",
      "Compute return trip time: 120 / 40 = 3 hours",
      "Calculate total round-trip distance: 120 + 120 = 240 km",
      "Calculate total round-trip time: 2 + 3 = 5 hours",
      "Divide total distance by total time: 240 / 5 = 48 km/h"
    ],
    "items_ar": [
      "احسب زمن الذهاب: 120 ÷ 60 = 2 ساعتان",
      "احسب زمن الإياب: 120 ÷ 40 = 3 ساعات",
      "احسب المسافة الكلية للذهاب والعودة: 120 + 120 = 240 كم",
      "احسب الزمن الكلي للرحلة: 2 + 3 = 5 ساعات",
      "اقسم المسافة الكلية على الزمن الكلي: 240 ÷ 5 = 48 كم/س"
    ],
    "sol": "Average speed is total distance divided by total time.",
    "sol_ar": "السرعة المتوسطة تحسب دائمًا بقسمة المسافة الكلية على الزمن الكلي."
  },
  {
    "t": "cat",
    "ti": "Classify Word Problem Types",
    "ti_ar": "تصنيف المسائل الحسابية الحياتية",
    "categories": [
      "Distance, Rate & Time Problem (مسائل السرعة والمسافة)",
      "Shared Work / Pipes Problem (مسائل العمل المشترك والحنفيات)"
    ],
    "categories_ar": [
      "مسائل السرعة والمسافة والزمن",
      "مسائل العمل المشترك والحنفيات"
    ],
    "items": [
      {
        "s": "Two cars traveling towards each other until meeting",
        "cat": 0
      },
      {
        "s": "Two pipes filling a swimming pool simultaneously",
        "cat": 1
      },
      {
        "s": "Average speed for a round-trip journey",
        "cat": 0
      },
      {
        "s": "Two painters working together to paint an apartment",
        "cat": 1
      },
      {
        "s": "A train crossing a bridge of known length",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "سيارتان تتحركان باتجاهين متعاكسين حتى تلتقيا",
        "cat": 0
      },
      {
        "s": "حنفيتان تملآن خزان ماء معًا في نفس الوقت",
        "cat": 1
      },
      {
        "s": "السرعة المتوسطة لرحلة ذهاب وإياب",
        "cat": 0
      },
      {
        "s": "عاملان يتعاونان في دهان شقة سكنية",
        "cat": 1
      },
      {
        "s": "قطار يعبر جسرًا بطول معلوم وبسرعة محددة",
        "cat": 0
      }
    ],
    "sol": "Speed problems relate distance, speed, and time; work problems add reciprocal time rates.",
    "sol_ar": "مسائل الحركة تربط المسافة والسرعة والزمن؛ ومسائل العمل تجمع معدلات الإنجاز المعكوسة."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Algebraic & Domain Verification (Word Problems & Reasoning)",
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
    "ti_ar": "اكتشف الخطأ: الجذور الدخيلة والتحقق من المجال (المسائل اللفظية والاستدلال)",
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
    "ti": "Examiner Mode: Multi-Step Structured Problem (Word Problems & Reasoning)",
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
    "ti_ar": "وضع المصحح: إكمال المربع والدالة العكسية (المسائل اللفظية والاستدلال)",
    "q_ar": "لتكن \\(f(x) = x^2 - 6x + 10\\) حيث \\(x \\ge 3\\). (أ) اكتب \\(f(x)\\) في صورة المربع الكامل وحدد مداها. (ب) أوجد قاعدة الدالة العكسية \\(f^{-1}(x)\\) ومجالها.",
    "examinerTip_ar": "الدالة العكسية يجب أن تكون وحيدة القيمة، لذا نختار الإشارة الموجبة للجذر \\(3 + \\sqrt{x - 1}\\) لأن \\(x \\ge 3\\)."
  }
];
});
