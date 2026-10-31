/* Interactive Practice data for /tahsili/ - one entry per chapter section id.
   Shipped as public/js/ix/tahsili.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["tah-about"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Tahsili Subject Distribution",
    "ti_ar": "فحص سريع: توزيع مواد اختبار التحصيلي",
    "q": "Which four secondary school subjects comprise the Tahsili (SAAT) Scientific track exam?",
    "q_ar": "ما هي المواد الأربع التي يشملها اختبار التحصيلي العلمي؟",
    "o": [
      "Mathematics, Physics, Chemistry, and Biology",
      "Mathematics, English, Arabic, and Logic",
      "Mathematics and Physics only",
      "Algebra, Geometry, Calculus, and Statistics"
    ],
    "o_ar": [
      "الرياضيات، الفيزياء، الكيمياء، والأحياء",
      "الرياضيات، اللغة الإنجليزية، اللغة العربية، والمنطق",
      "الرياضيات والفيزياء فقط",
      "الجبر، الهندسة، التفاضل والتكامل، والإحصاء"
    ],
    "a": 0,
    "ex": "The Scientific Tahsili exam covers four high school sciences: Mathematics, Physics, Chemistry, and Biology, weighted roughly 20% for 1st year, 30% for 2nd year, and 50% for 3rd year content.",
    "ex_ar": "يشمل الاختبار التحصيلي للتخصصات العلمية 4 مواد: الرياضيات، الفيزياء، الكيمياء، والأحياء بنسب تقريبية: 20% للصف الأول ثانوي، 30% للثاني ثانوي، و50% للثالث ثانوي."
  },
  {
    "t": "mt",
    "ti": "Matching: Tahsili Mathematics Core Domains",
    "ti_ar": "مطابقة: مجالات الرياضيات في التحصيلي",
    "p": [
      {
        "l": "High School Year 1 (~20%)",
        "r": "Geometry, logic, proofs, parallel lines, triangles"
      },
      {
        "l": "High School Year 2 (~30%)",
        "r": "Quadratics, polynomials, rational functions, matrices"
      },
      {
        "l": "High School Year 3 (~50%)",
        "r": "Precalculus, vectors, limits, derivatives, integrals"
      },
      {
        "l": "Calculator Rule",
        "r": "Strictly prohibited throughout the test"
      }
    ],
    "p_ar": [
      {
        "l": "أول ثانوي (~20%)",
        "r": "الهندسة، المنطق، البرهان، التوازي، والمثلثات"
      },
      {
        "l": "ثاني ثانوي (~30%)",
        "r": "الدوال التربيعية، كثيرات الحدود، والنسبية والمصفوفات"
      },
      {
        "l": "ثالث ثانوي (~50%)",
        "r": "المتجهات، الإحداثيات القطبية، النهايات، والاشتقاق والتكامل"
      },
      {
        "l": "الآلة الحاسبة",
        "r": "ممنوعة تماماً في جميع أقسام الاختبار"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculate Tahsili Raw Time per Item",
    "ti_ar": "حساب متوسط زمن الإجابة لكل سؤال في التحصيلي",
    "q": "If a section has 22 questions to be answered in 25 minutes, how many total seconds are allocated for the entire section?",
    "q_ar": "إذا كان القسم يحتوي على 22 سؤالاً ومخصص له 25 دقيقة، فكم عدد الثواني الكلية المخصصة للقسم بأكمله؟",
    "a": 1500,
    "tol": 0.001,
    "h": "25 minutes × 60 seconds = 1500 seconds.",
    "h_ar": "25 دقيقة × 60 ثانية = 1500 ثانية.",
    "sol": "25 × 60 = 1500 seconds.",
    "sol_ar": "25 × 60 = 1500 ثانية."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Tahsili Test Day Strategy",
    "ti_ar": "رتّب الخطوات: استراتيجية التعامل مع ورقة اختبار التحصيلي",
    "q": "Order the effective steps when tackling a section in the Tahsili exam:",
    "q_ar": "رتّب الخطوات الفعالة عند حل قسم في اختبار التحصيلي:",
    "items": [
      "Scan the entire section and solve direct, instant-recall science questions first",
      "Tackle straightforward mathematical and physical calculations",
      "Flag lengthy or computation-heavy problems for the second pass",
      "Double-check that all bubble numbers align exactly with test booklet items",
      "Ensure zero unanswered questions remain before time expires (no penalty for guessing)"
    ],
    "items_ar": [
      "مسح أسئلة القسم سريعاً والبدء بالأسئلة العلمية المباشرة والمفاهيمية",
      "حل المسائل الرياضية والفيزيائية المباشرة",
      "تأجيل المسائل الحسابية الطويلة للمرور الثاني",
      "التأكد من مطابقة رقم السؤال في ورقة الإجابة مع كتيب الأسئلة",
      "التأكد من تظليل جميع الإجابات دون ترك أي سؤال فارغ قبل انتهاء الوقت"
    ],
    "sol": "Starting with high-confidence recall questions builds momentum and preserves time for multi-step math problems.",
    "sol_ar": "البدء بالأسئلة السريعة يكسبك ثقة ويوفر وقتاً كافياً للعمليات الحسابية."
  },
  {
    "t": "cat",
    "ti": "Classify Tahsili High School Curriculum Weights",
    "ti_ar": "تصنيف أوزان مناهج الثانوية في التحصيلي",
    "categories": [
      "Grade 10 / First Year (~20%)",
      "Grade 11 / Second Year (~30%)",
      "Grade 12 / Third Year (~50%)"
    ],
    "categories_ar": [
      "أول ثانوي (~20%)",
      "ثاني ثانوي (~30%)",
      "ثالث ثانوي (~50%)"
    ],
    "items": [
      {
        "s": "Coordinate geometry and angle proofs (1st year)",
        "cat": 0
      },
      {
        "s": "Matrices and polynomial equations (2nd year)",
        "cat": 1
      },
      {
        "s": "Limits, derivatives, and definite integrals (3rd year)",
        "cat": 2
      },
      {
        "s": "Vectors and polar coordinates (3rd year)",
        "cat": 2
      },
      {
        "s": "Congruence and similarity of triangles (1st year)",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "الهندسة الإحداثية وبراهين الزوايا (أول ثانوي)",
        "cat": 0
      },
      {
        "s": "المصفوفات وكثيرات الحدود (ثاني ثانوي)",
        "cat": 1
      },
      {
        "s": "النهايات والاشتقاق والتكامل (ثالث ثانوي)",
        "cat": 2
      },
      {
        "s": "المتجهات والإحداثيات القطبية (ثالث ثانوي)",
        "cat": 2
      },
      {
        "s": "تطابق وتشابه المثلثات (أول ثانوي)",
        "cat": 0
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Tahsili Pacing & Curriculum Weighting (Test format & strategy)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وأوزان الصفوف في التحصيلي (شكل الاختبار والاستراتيجية)",
    "q": "A student prepares a study and test-day plan for a 22-question, 25-minute Tahsili section. Which step introduces a major strategic flaw?",
    "q_ar": "يضع طالب خطة للمذاكرة وإدارة الوقت لقسم مكوّن من 22 سؤالاً في 25 دقيقة باختبار التحصيلي. أي خطوة تتضمن خللاً استراتيجياً؟",
    "steps": [
      "Prioritize Grade 12 (3rd year) topics (~50% weight) alongside Grade 11 (~30%) and Grade 10 (~20%).",
      "Budget roughly \\(\\frac{1500}{22} \\approx 68\\) seconds per item on average without a calculator.",
      "Spend \\(8\\) minutes on a single multi-step integral before answering the remaining \\(15\\) direct science and math questions.",
      "Verify bubble alignment and answer every item before time expires since there is no guessing penalty."
    ],
    "steps_ar": [
      "إعطاء الأولوية لمقررات الصف الثالث ثانوي (~50%) ثم الثاني ثانوي (~30%) والأول ثانوي (~20%).",
      "تخصيص متوسط يقارب \\(\\frac{1500}{22} \\approx 68\\) ثانية لكل سؤال دون استخدام الآلة الحاسبة.",
      "قضاء \\(8\\) دقائق متواصلة في مسألة تكامل واحدة قبل قراءة \\(15\\) سؤالاً مباشراً متبقياً في القسم.",
      "مراجعة تطابق أرقام التظليل والإجابة عن جميع الأسئلة قبل انتهاء الوقت لعدم وجود خصم على الخطأ."
    ],
    "errorStep": 3,
    "reasons": [
      "Spending 8 minutes on one question sacrifices 7–8 equal-weight recall and calculation items; lengthy problems must be flagged for Pass 2.",
      "Grade 10 content carries 80% of the Tahsili exam weight.",
      "Unanswered blanks earn bonus points on the Tahsili exam."
    ],
    "reasons_ar": [
      "استنزاف 8 دقائق في سؤال واحد يضيع 7–8 أسئلة متساوية الوزن؛ يجب تعليم السؤال الطويل والعودة إليه في الجولة الثانية.",
      "مقررات الصف الأول ثانوي تمثل 80% من أسئلة التحصيلي.",
      "ترك الأسئلة فارغة يمنح درجات إضافية في التحصيلي."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tahsili Pacing Audit & Weighted Admission Score (Test format & strategy)",
    "ti_ar": "وضع المصحح: ميزانية الوقت والنسبة الموزونة للقبول الجامعي (شكل الاختبار والاستراتيجية)",
    "q": "A Tahsili practice section has \\(22\\) equal-weight questions in \\(25\\) minutes with no guessing penalty. (a) Compute the average seconds-per-question budget and expected Grade 12 item share (~50%). (b) Evaluate a student's university composite score for \\(30\\%\\) GPA (\\(96\\)), \\(30\\%\\) Qudrat (\\(90\\)), and \\(40\\%\\) Tahsili (\\(85\\)).",
    "q_ar": "يتكون قسم تدريبي في التحصيلي من \\(22\\) سؤالاً متساوية الوزن في \\(25\\) دقيقة دون خصم على التخمين. (أ) احسب متوسط الزمن لكل سؤال بالثواني وحصة الصف الثالث ثانوي (~50%). (ب) احسب النسبة الموزونة لطالب معدله الثانوي \\(96\\) (وزن \\(30\\%\\)) ودرجته في القدرات \\(90\\) (\\(30\\%\\)) وفي التحصيلي \\(85\\) (\\(40\\%\\)).",
    "parts": [
      {
        "label": "Part (a) — Section Time Budget & Grade 12 Weight",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Average time budget: \\(\\frac{25 \\times 60}{22} = \\frac{1500}{22} \\approx 68\\text{ s}\\) per question."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Grade 12 (~50%) accounts for roughly \\(0.50 \\times 22 = 11\\) questions per section."
          }
        ]
      },
      {
        "label": "Part (b) — Weighted University Composite Calculation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up weighted sum: \\(0.30(96) + 0.30(90) + 0.40(85) = 28.8 + 27 + 34\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Total composite admission score \\(= 89.8\\%\\) (showing Tahsili carries the largest 40% share)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — ميزانية زمن القسم وحصة ثالث ثانوي",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "متوسط الزمن لكل سؤال: \\(\\frac{25 \\times 60}{22} = \\frac{1500}{22} \\approx 68\\) ثانية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "حصة الصف الثالث ثانوي (~50%) تقارب \\(0.50 \\times 22 = 11\\) سؤالاً في القسم."
          }
        ]
      },
      {
        "label": "الجزء (ب) — حساب النسبة الموزونة للقبول الجامعي",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "تكوين المجموع الموزون: \\(0.30(96) + 0.30(90) + 0.40(85) = 28.8 + 27 + 34\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "النسبة الموزونة الكلية \\(= 89.8\\%\\) (حيث يمثل التحصيلي النصيب الأكبر بنسبة 40%)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Tahsili Weighted Score & Time Budget (Test format & strategy)",
    "ti_ar": "بناء الخطوات: حساب النسبة الموزونة وميزانية الوقت (شكل الاختبار والاستراتيجية)",
    "steps": [
      {
        "l": "Out of \\(110\\) total questions, Grade 12 (~50%) contributes approximately how many items?",
        "a": "55",
        "h": "Compute 50% of 110."
      },
      {
        "l": "If Pass 1 answers \\(14\\) direct recall items in \\(30\\) seconds each, total seconds spent \\(=\\)",
        "a": "420",
        "h": "Multiply 14 by 30."
      },
      {
        "l": "Subtracting \\(420\\) s from a \\(1500\\)-second section leaves how many seconds for the remaining \\(8\\) math/physics problems?",
        "a": "1080",
        "h": "Compute 1500 − 420."
      }
    ],
    "steps_ar": [
      {
        "l": "من إجمالي \\(110\\) أسئلة، كم سؤالاً تقريباً يغطي مقررات الصف الثالث ثانوي (~50%)؟",
        "a": "55",
        "h": "احسب 50% من 110."
      },
      {
        "l": "إذا أنهيت \\(14\\) سؤالاً مباشراً في الجولة الأولى بمعدل \\(30\\) ثانية للسؤال، فإجمالي الثواني المستهلكة \\(=\\)",
        "a": "420",
        "h": "اضرب 14 في 30."
      },
      {
        "l": "بطرح \\(420\\) ثانية من زمن القسم (\\(1500\\) ثانية)، كم ثانية تتبقى لحل المسائل الـ \\(8\\) المتبقية؟",
        "a": "1080",
        "h": "احسب 1500 − 420."
      }
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Two-Pass Tahsili Exam Triage (Test format & strategy)",
    "ti_ar": "فحص سريع: استراتيجية الجولتين في اختبار التحصيلي (شكل الاختبار والاستراتيجية)",
    "q": "Why should you complete direct Biology and Chemistry concept items in 25–35 seconds on Pass 1 of a mixed Tahsili section?",
    "q_ar": "لماذا يُنصح بإنجاز أسئلة المفاهيم المباشرة في الأحياء والكيمياء خلال 25–35 ثانية في الجولة الأولى من قسم التحصيلي؟",
    "o": [
      "All questions carry equal weight, so banking time on instant-recall items gives 90–120 seconds each for multi-step Mathematics and Physics problems on Pass 2",
      "Biology and Chemistry questions are worth triple the marks of Mathematics questions",
      "Calculators are unlocked only during the final 10 minutes of the section",
      "Wrong answers in Mathematics deduct two marks whereas Science items have no penalty"
    ],
    "o_ar": [
      "لأن جميع الأسئلة متساوية الوزن، فتوفير الوقت في الأسئلة المباشرة يمنحك 90–120 ثانية لكل مسألة رياضيات أو فيزياء متعددة الخطوات في الجولة الثانية",
      "لأن أسئلة الأحياء والكيمياء تعادل ثلاثة أضعاف درجة أسئلة الرياضيات",
      "لأنه يُسمح باستخدام الآلة الحاسبة في آخر 10 دقائق فقط من القسم",
      "لأن الإجابة الخاطئة في الرياضيات تخصم درجتين بعكس المواد العلمية"
    ],
    "a": 0,
    "ex": "Every Tahsili item carries equal weight and calculators are never permitted, so banking time on rapid conceptual items funds multi-step hand calculations.",
    "ex_ar": "جميع أسئلة التحصيلي متساوية الوزن والآلة الحاسبة ممنوعة، لذا فإن توفير الوقت في الأسئلة المفاهيمية السريعة يمنحك وقتاً كافياً للعمليات الحسابية اليدوية."
  }
];
D["tah-algebra"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Linear Equations",
    "ti_ar": "فحص سريع: معادلات خطية",
    "q": "Solve \\(\\frac{x+3}{2}=7\\)",
    "q_ar": "حل \\(\\frac{x+3}{2}=7\\)",
    "o": [
      "x=11",
      "x=17",
      "x=10",
      "x=14"
    ],
    "o_ar": [
      "x=11",
      "x=17",
      "x=10",
      "x=14"
    ],
    "a": 0,
    "ex": "\\(x+3=14\\Rightarrow x=11\\).",
    "ex_ar": "\\(x+3=14\\Rightarrow x=11\\)."
  },
  {
    "t": "qc",
    "ti": "Quick Check: Matrix Determinant",
    "ti_ar": "فحص سريع: محددة المصفوفة",
    "q": "Find the determinant: \\(\\begin{vmatrix} 4 & 2 \\\\ 5 & 3 \\end{vmatrix}\\)",
    "q_ar": "احسب قيمة المحددة: \\(\\begin{vmatrix} 4 & 2 \\\\ 5 & 3 \\end{vmatrix}\\)",
    "o": [
      "2",
      "22",
      "14",
      "−2"
    ],
    "o_ar": [
      "2",
      "22",
      "14",
      "−2"
    ],
    "a": 0,
    "ex": "\\(\\det = (4)(3) - (2)(5) = 12 - 10 = 2\\).",
    "ex_ar": "\\(\\det = (4)(3) - (2)(5) = 12 - 10 = 2\\)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Discriminant Analysis",
    "ti_ar": "مثال محلول: تحليل المميز",
    "steps": [
      "Determine the number of real roots of \\(3x^2-2x+5=0\\). Compute the discriminant \\(\\Delta=b^2-4ac\\).",
      "\\(\\Delta=(-2)^2-4(3)(5)=4-60=-56\\).",
      "Since \\(\\Delta<0\\), the equation has no real roots (two complex roots)."
    ],
    "steps_ar": [
      "حدد عدد الجذور الحقيقية للمعادلة \\(3x^2-2x+5=0\\). احسب المميز \\(\\Delta=b^2-4ac\\).",
      "\\(\\Delta=(-2)^2-4(3)(5)=4-60=-56\\).",
      "بما أن \\(\\Delta<0\\)، فإن المعادلة ليس لها جذور حقيقية (لها جذران عقديان)."
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Complex Number Division \\(\\frac{5+5i}{1+2i}\\)",
    "ti_ar": "باني الخطوات: قسمة الأعداد المركبة \\(\\frac{5+5i}{1+2i}\\)",
    "steps": [
      {
        "l": "Conjugate of denominator \\(1+2i\\) is \\(1-2i\\). Denominator: \\(1^2 + 2^2 =\\)",
        "a": "5",
        "h": "Evaluate the expression \\(1 + 4\\)."
      },
      {
        "l": "Numerator real term: \\(5 - 10i^2 = 5 - 10(-1) =\\)",
        "a": "15",
        "h": "Evaluate the expression \\(5 + 10\\)."
      },
      {
        "l": "Divide real term by denominator: \\(15 \\div 5 =\\)",
        "a": "3",
        "h": "Perform the calculation in \\(15 \\div 5\\) to find the result."
      },
      {
        "l": "Numerator imaginary term divided by 5: \\((-10 + 5) \\div 5 =\\)",
        "a": "-1",
        "h": "Perform the calculation in \\((-10 + 5) \\div 5\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "مرافق المقام \\(1+2i\\) هو \\(1-2i\\). المقام: \\(1^2 + 2^2 =\\)",
        "a": "5",
        "h": "احسب قيمة المقدار \\(1 + 4\\)."
      },
      {
        "l": "الحد الحقيقي في البسط: \\(5 - 10i^2 = 5 - 10(-1) =\\)",
        "a": "15",
        "h": "احسب قيمة المقدار \\(5 + 10\\)."
      },
      {
        "l": "قسمة الحد الحقيقي على المقام: \\(15 \\div 5 =\\)",
        "a": "3",
        "h": "أجرِ العملية الحسابية في المقدار \\(15 \\div 5\\) للوصول إلى النتيجة."
      },
      {
        "l": "الحد التخيلي في البسط مقسومًا على 5: \\((-10 + 5) \\div 5 =\\)",
        "a": "-1",
        "h": "أجرِ العملية الحسابية في المقدار \\((-10 + 5) \\div 5\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Evaluate Matrix Determinant",
    "ti_ar": "حساب قيمة محددة مصفوفة",
    "q": "Find the determinant of the matrix \\(\\begin{pmatrix} 7 & 3 \\\\ 4 & 2 \\end{pmatrix}\\):",
    "q_ar": "احسب قيمة محددة المصفوفة \\(\\begin{pmatrix} 7 & 3 \\\\ 4 & 2 \\end{pmatrix}\\):",
    "a": 2,
    "tol": 0.001,
    "h": "det = (7)(2) - (3)(4) = 14 - 12 = 2.",
    "h_ar": "المحددة = (7)(2) - (3)(4) = 14 - 12 = 2.",
    "sol": "(7)(2) - (3)(4) = 14 - 12 = 2.",
    "sol_ar": "(7)(2) - (3)(4) = 14 - 12 = 2."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving Quadratic Equations by Factoring",
    "ti_ar": "رتّب الخطوات: حل المعادلة التربيعية بالتحليل",
    "q": "Order the steps to solve \\(2x^2 - 5x - 3 = 0\\) by factoring:",
    "q_ar": "رتّب الخطوات لحل المعادلة \\(2x^2 - 5x - 3 = 0\\) بالتحليل:",
    "items": [
      "Ensure the equation is in standard form ax² + bx + c = 0",
      "Find factors of (2)(-3) = -6 that add up to the middle coefficient -5 (-6 and 1)",
      "Split the middle term: 2x² - 6x + x - 3 = 0",
      "Factor by grouping: 2x(x - 3) + (x - 3) = (2x + 1)(x - 3) = 0",
      "Apply zero product property: x = -1/2 or x = 3"
    ],
    "items_ar": [
      "التأكد من كتابة المعادلة بالصورة القياسية ax² + bx + c = 0",
      "البحث عن عددين حاصل ضربهما (2)(-3) = -6 ومجموعهما -5 (وهما -6 و 1)",
      "تجزئة الحد الأوسط: 2x² - 6x + x - 3 = 0",
      "التحليل بالتجميع: 2x(x - 3) + (x - 3) = (2x + 1)(x - 3) = 0",
      "تطبيق خاصية الضرب الصفري لإيجاد الجذور: x = -1/2 أو x = 3"
    ],
    "sol": "Factoring by grouping cleanly solves non-monic quadratics.",
    "sol_ar": "التحليل بالتجميع يعطي الحل بدقة وسرعة للمعادلات التربيعية غير البسيطة."
  },
  {
    "t": "cat",
    "ti": "Classify Nature of Quadratic Roots by Discriminant",
    "ti_ar": "تصنيف نوع جذور المعادلة التربيعية بالمميز",
    "categories": [
      "Two Distinct Real Roots (Δ > 0)",
      "One Repeated Real Root (Δ = 0)",
      "Two Complex Conjugate Roots (Δ < 0)"
    ],
    "categories_ar": [
      "جذران حقيقيان متمايزان (Δ > 0)",
      "جذر حقيقي واحد مكرر (Δ = 0)",
      "جذران مركبان مترافقان (Δ < 0)"
    ],
    "items": [
      {
        "s": "x² - 6x + 9 = 0 (Δ = 36 - 36 = 0)",
        "cat": 1
      },
      {
        "s": "x² - 4x + 5 = 0 (Δ = 16 - 20 = -4)",
        "cat": 2
      },
      {
        "s": "x² - 5x + 6 = 0 (Δ = 25 - 24 = 1)",
        "cat": 0
      },
      {
        "s": "2x² + x + 3 = 0 (Δ = 1 - 24 = -23)",
        "cat": 2
      },
      {
        "s": "x² + 4x + 4 = 0 (Δ = 16 - 16 = 0)",
        "cat": 1
      },
      {
        "s": "x² - 2x - 8 = 0 (Δ = 4 + 32 = 36)",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "x² - 6x + 9 = 0 (المميز = 0)",
        "cat": 1
      },
      {
        "s": "x² - 4x + 5 = 0 (المميز = -4)",
        "cat": 2
      },
      {
        "s": "x² - 5x + 6 = 0 (المميز = 1)",
        "cat": 0
      },
      {
        "s": "2x² + x + 3 = 0 (المميز = -23)",
        "cat": 2
      },
      {
        "s": "x² + 4x + 4 = 0 (المميز = 0)",
        "cat": 1
      },
      {
        "s": "x² - 2x - 8 = 0 (المميز = 36)",
        "cat": 0
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Vieta's Sum of Squares Identity (Algebra & Equations)",
    "ti_ar": "اكتشف الخطأ: متطابقة فييت لمجموع مربعي الجذرين (الجبر والمعادلات)",
    "q": "For \\(x^2 - 6x + 8 = 0\\) with roots \\(\\alpha, \\beta\\), a student computes \\(\\alpha^2 + \\beta^2\\). Where is the error?",
    "q_ar": "للمعادلة \\(x^2 - 6x + 8 = 0\\) ذات الجذرين \\(\\alpha, \\beta\\)، يحسب طالب \\(\\alpha^2 + \\beta^2\\). أين الخطأ؟",
    "steps": [
      "Read Vieta's relations: \\(\\alpha + \\beta = 6\\) and \\(\\alpha\\beta = 8\\).",
      "Claim \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 36\\), omitting \\(-2\\alpha\\beta\\).",
      "State \\(36\\) as the value of \\(\\alpha^2 + \\beta^2\\)."
    ],
    "steps_ar": [
      "استخراج علاقات فييت: \\(\\alpha + \\beta = 6\\) و\\(\\alpha\\beta = 8\\).",
      "الادعاء بأن \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 36\\) وإغفال الحد \\(-2\\alpha\\beta\\).",
      "اعتماد \\(36\\) قيمة نهائية."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\), the exact identity is \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 36 - 16 = 20\\).",
      "Vieta gives \\(\\alpha + \\beta = -6\\).",
      "\\(\\alpha\\beta\\) must be squared before subtracting."
    ],
    "reasons_ar": [
      "لأن \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\)، فالمتطابقة الصحيحة هي \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 20\\).",
      "مجموع الجذرين يساوي \\(-6\\).",
      "يجب تربيع \\(\\alpha\\beta\\) قبل الطرح."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Discriminant, Vieta & Factor Theorem (Algebra & Equations)",
    "ti_ar": "وضع المصحح: المميز وعلاقات فييت ونظرية العامل (الجبر والمعادلات)",
    "q": "Consider \\(P(x) = x^2 - 6x + 8\\) with roots \\(\\alpha, \\beta\\). (a) Compute the discriminant \\(\\Delta\\) and verify \\(P(2) = 0\\). (b) Evaluate \\(\\alpha^2 + \\beta^2\\) using symmetric sums.",
    "q_ar": "لتكن \\(P(x) = x^2 - 6x + 8\\) وجذراها \\(\\alpha, \\beta\\). (أ) احسب المميز \\(\\Delta\\) وتحقق أن \\(P(2) = 0\\). (ب) أوجد قيمة \\(\\alpha^2 + \\beta^2\\) باستعمال المجاميع المتماثلة.",
    "parts": [
      {
        "label": "Part (a) — Discriminant & Factor Check",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\Delta = (-6)^2 - 4(1)(8) = 4 > 0\\) (two distinct real roots)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(2) = 4 - 12 + 8 = 0\\), confirming \\((x - 2)\\) is a factor."
          }
        ]
      },
      {
        "label": "Part (b) — Symmetric Sum of Squares",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\alpha + \\beta = 6,\\; \\alpha\\beta = 8\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 6^2 - 2(8) = 20\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — المميز والتحقق من العامل",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\Delta = (-6)^2 - 4(1)(8) = 4 > 0\\) (جذران حقيقيان مختلفان)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(2) = 0\\)، مما يؤكد أن \\((x - 2)\\) عامل لكثيرة الحدود."
          }
        ]
      },
      {
        "label": "الجزء (ب) — مجموع مربعي الجذرين",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\alpha + \\beta = 6,\\; \\alpha\\beta = 8\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 6^2 - 2(8) = 20\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Polynomial & Quadratic Theorems (Algebra & Equations)",
    "ti_ar": "مطابقة: نظريات المعادلات التربيعية وكثيرات الحدود (الجبر والمعادلات)",
    "p": [
      {
        "l": "Remainder when \\(P(x)\\) is divided by \\((x - 2)\\)",
        "r": "\\(P(2)\\)"
      },
      {
        "l": "Tangent line–parabola condition",
        "r": "System discriminant \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "Sum & product in \\(x^2 - 6x + 8 = 0\\)",
        "r": "\\(\\alpha + \\beta = 6,\\; \\alpha\\beta = 8\\)"
      },
      {
        "l": "Axis of symmetry of \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "باقي قسمة \\(P(x)\\) على \\((x - 2)\\)",
        "r": "\\(P(2)\\)"
      },
      {
        "l": "شرط تماس مستقيم مع قطع مكافئ",
        "r": "مميز النظام المشترك \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "مجموع وضرب جذري \\(x^2 - 6x + 8 = 0\\)",
        "r": "\\(\\alpha + \\beta = 6,\\; \\alpha\\beta = 8\\)"
      },
      {
        "l": "معادلة محور التماثل لـ \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
      }
    ]
  }
];
D["tah-functions"] = [
  {
    "t": "mt",
    "ti": "Matching: Function Types",
    "ti_ar": "مطابقة: أنواع الدوال",
    "p": [
      {
        "l": "\\(f(x)=mx+b\\)",
        "r": "Linear"
      },
      {
        "l": "\\(f(x)=ax^2+bx+c\\)",
        "r": "Quadratic"
      },
      {
        "l": "\\(f(x)=a^x\\)",
        "r": "Exponential"
      },
      {
        "l": "\\(f(x)=\\log_a x\\)",
        "r": "Logarithmic"
      }
    ],
    "p_ar": [
      {
        "l": "\\(f(x)=mx+b\\)",
        "r": "خطية"
      },
      {
        "l": "\\(f(x)=ax^2+bx+c\\)",
        "r": "تربيعية"
      },
      {
        "l": "\\(f(x)=a^x\\)",
        "r": "أسية"
      },
      {
        "l": "\\(f(x)=\\log_a x\\)",
        "r": "لوغاريتمية"
      }
    ]
  },
  {
    "t": "fn",
    "ti": "Explorer: Exponential and Logarithm \\(y=2^x\\) & \\(y=\\log_2x\\)",
    "ti_ar": "مستكشف: الدالة الأسية واللوغاريتمية \\(y=2^x\\) و\\(y=\\log_2x\\)",
    "fns": [
      {
        "expr": "2^x",
        "color": "#1E3A6E",
        "label": "2^x"
      },
      {
        "expr": "ln(x)/ln(2)",
        "color": "#B8801F",
        "label": "log2(x)"
      }
    ],
    "xrange": [
      -4,
      6
    ],
    "yrange": [
      -4,
      8
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Composite Function Domain",
    "ti_ar": "مثال محلول: مجال دالة مركّبة",
    "steps": [
      "Given \\(f(x)=\\dfrac1x\\) and \\(g(x)=x-3\\), find \\((f\\circ g)(x)\\). Substitute \\(g(x)\\) into \\(f\\).",
      "\\((f\\circ g)(x)=f(x-3)=\\dfrac{1}{x-3}\\).",
      "The domain excludes values that make the denominator zero: \\(x\\neq3\\)."
    ],
    "steps_ar": [
      "بما أن \\(f(x)=\\dfrac1x\\) و\\(g(x)=x-3\\)، أوجد \\((f\\circ g)(x)\\). عوّض \\(g(x)\\) في \\(f\\).",
      "\\((f\\circ g)(x)=f(x-3)=\\dfrac{1}{x-3}\\).",
      "يستثني المجال القيم التي تجعل المقام صفرًا: \\(x\\neq3\\)."
    ]
  },
  {
    "t": "tf",
    "ti": "True or False: Symmetry & Inverses",
    "ti_ar": "صحيح أم خطأ: التماثل والدوال العكسية",
    "items": [
      {
        "s": "A function satisfying \\(f(-x) = f(x)\\) is symmetric about the y-axis (even).",
        "a": true,
        "ex": "Definition of an even function."
      },
      {
        "s": "A function satisfying \\(f(-x) = -f(x)\\) is symmetric about the origin (odd).",
        "a": true,
        "ex": "Definition of an odd function."
      },
      {
        "s": "The graph of \\(f^{-1}(x)\\) is the reflection of \\(f(x)\\) across the line \\(y = x\\).",
        "a": true,
        "ex": "True reflection property."
      },
      {
        "s": "A function has an inverse if and only if it passes the horizontal line test (one-to-one).",
        "a": true,
        "ex": "One-to-one condition."
      }
    ],
    "items_ar": [
      {
        "s": "الدالة التي تحقق \\(f(-x) = f(x)\\) متماثلة حول المحور y (زوجية).",
        "a": true,
        "ex": "تعريف الدالة الزوجية."
      },
      {
        "s": "الدالة التي تحقق \\(f(-x) = -f(x)\\) متماثلة حول نقطة الأصل (فردية).",
        "a": true,
        "ex": "تعريف الدالة الفردية."
      },
      {
        "s": "منحنى الدالة العكسية \\(f^{-1}(x)\\) هو انعكاس لمنحنى \\(f(x)\\) حول المستقيم \\(y = x\\).",
        "a": true,
        "ex": "خاصية الانعكاس للدوال العكسية."
      },
      {
        "s": "تكون للدالة دالة عكسية إذا وفقط إذا اجتازت اختبار الخط الأفقي (دالة متباينة).",
        "a": true,
        "ex": "شرط التباين أحادية القيمة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Evaluate Function Value",
    "ti_ar": "حساب قيمة دالة",
    "q": "If \\(f(x) = x^2 - 3x + 4\\), find the value of \\(f(5)\\):",
    "q_ar": "إذا كانت \\(f(x) = x^2 - 3x + 4\\)، فما قيمة \\(f(5)\\)؟",
    "a": 14,
    "tol": 0.001,
    "h": "f(5) = 5² - 3(5) + 4 = 25 - 15 + 4 = 14.",
    "h_ar": "f(5) = 5² - 3(5) + 4 = 25 - 15 + 4 = 14.",
    "sol": "25 - 15 + 4 = 14.",
    "sol_ar": "25 - 15 + 4 = 14."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding the Inverse Function f⁻¹(x)",
    "ti_ar": "رتّب الخطوات: إيجاد الدالة العكسية f⁻¹(x)",
    "q": "Order the steps to algebraically determine the inverse of \\(f(x) = \\frac{2x - 1}{5}\\):",
    "q_ar": "رتّب الخطوات الجبرية لإيجاد الدالة العكسية للدالة \\(f(x) = \\frac{2x - 1}{5}\\):",
    "items": [
      "Replace f(x) with the output variable y",
      "Interchange the input and output variables: swap x and y",
      "Multiply both sides by 5: 5x = 2y - 1",
      "Isolate y by adding 1 and dividing by 2: y = (5x + 1)/2",
      "Replace y with f⁻¹(x)"
    ],
    "items_ar": [
      "استبدال f(x) بالرمز y",
      "تبديل المتغيرين x و y",
      "الضرب في 5 للطرفين: 5x = 2y - 1",
      "عزل y بإضافة 1 ثم القسمة على 2: y = (5x + 1)/2",
      "كتابة الناتج بالرمز f⁻¹(x)"
    ],
    "sol": "Swapping variables reflects the graph across y = x.",
    "sol_ar": "تبديل المتغيرين يمثل هندسياً الانعكاس حول المستقيم y = x."
  },
  {
    "t": "cat",
    "ti": "Classify Function Parity (Even, Odd, Neither)",
    "ti_ar": "تصنيف نوع الدالة (زوجية، فردية، ليست زوجية ولا فردية)",
    "categories": [
      "Even Function / زوجية (\\(f(-x) = f(x)\\))",
      "Odd Function / فردية (\\(f(-x) = -f(x)\\))",
      "Neither / ليست زوجية ولا فردية"
    ],
    "categories_ar": [
      "زوجية (\\(f(-x) = f(x)\\))",
      "فردية (\\(f(-x) = -f(x)\\))",
      "ليست زوجية ولا فردية"
    ],
    "items": [
      {
        "s": "\\(f(x) = x^4 - 2x^2 + 1\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = x^3 - 5x\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = x^2 + 3x - 2\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) = \\cos x\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\sin x\\)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "\\(f(x) = x^4 - 2x^2 + 1\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = x^3 - 5x\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = x^2 + 3x - 2\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) = \\cos x\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\sin x\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Composite Order & Inverse Domain (Functions)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال ومجال المعكوس (الدوال)",
    "q": "Let \\(f(x) = 4x + 4\\) and \\(g(x) = x^2 + 1\\). A student evaluates \\((f \\circ g)(3)\\). Which step is wrong?",
    "q_ar": "لتكن \\(f(x) = 4x + 4\\) و\\(g(x) = x^2 + 1\\). يحسب طالب \\((f \\circ g)(3)\\). أي خطوة خاطئة؟",
    "steps": [
      "Write \\((f \\circ g)(3) = g(f(3))\\) by applying \\(f\\) first instead of \\(g\\).",
      "Compute \\(f(3) = 16\\).",
      "Square and add \\(1\\) to get \\(257\\)."
    ],
    "steps_ar": [
      "كتابة \\((f \\circ g)(3) = g(f(3))\\) بتطبيق \\(f\\) أولاً بدلاً من \\(g\\).",
      "حساب \\(f(3) = 16\\).",
      "التربيع وإضافة \\(1\\) للحصول على \\(257\\)."
    ],
    "errorStep": 1,
    "reasons": [
      "By definition \\((f \\circ g)(x) = f(g(x))\\): evaluate the inner function \\(g(3) = 10\\) first, then \\(f(10) = 44\\).",
      "Function composition is always commutative.",
      "You must multiply \\(f(3)\\) by \\(g(3)\\)."
    ],
    "reasons_ar": [
      "حسب التعريف \\((f \\circ g)(x) = f(g(x))\\): نحسب الدالة الداخلية أولاً \\(g(3) = 10\\) ثم \\(f(10) = 44\\).",
      "تركيب الدوال عملية إبدالية دائماً.",
      "يجب ضرب \\(f(3)\\) في \\(g(3)\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: One-to-One Domain Restriction & Inverse (Functions)",
    "ti_ar": "وضع المصحح: تقييد المجال وإيجاد الدالة العكسية (الدوال)",
    "q": "Let \\(h(x) = (x - 4)^2 + 4\\) for \\(x \\ge 4\\). (a) State the range of \\(h\\) and explain why \\(h^{-1}\\) exists on \\(x \\ge 4\\). (b) Find \\(h^{-1}(x)\\) and state its domain.",
    "q_ar": "لتكن \\(h(x) = (x - 4)^2 + 4\\) حيث \\(x \\ge 4\\). (أ) اذكر مدى \\(h\\) وفسّر سبب وجود معكوس لها. (ب) أوجد \\(h^{-1}(x)\\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Range & Injectivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Range of \\(h\\) is \\([ 4, \\infty )\\) since \\((x - 4)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "For \\(x \\ge 4\\), \\(h\\) is strictly increasing (one-to-one / passes horizontal line test)."
          }
        ]
      },
      {
        "label": "Part (b) — Inverse Formula & Domain",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Solve \\(y = (x - 4)^2 + 4 \\implies x = 4 + \\sqrt{y - 4}\\) (choosing \\(+\\) branch for \\(x \\ge 4\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 4 + \\sqrt{x - 4}\\) with domain \\(x \\ge 4\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — المدى وشرط التباين (واحد لواحد)",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "مدى الدالة \\(h\\) هو \\([ 4, \\infty )\\) لأن \\((x - 4)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "على الفترة \\(x \\ge 4\\) الدالة متزايدة تماماً (واحد لواحد)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — قاعدة المعكوس ومجاله",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "حل المعادلة بدلالة \\(x\\) مع اختيار الفرع الموجب: \\(x = 4 + \\sqrt{y - 4}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 4 + \\sqrt{x - 4}\\) ومجالها \\(x \\ge 4\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Composite & Inverse Function Evaluation (Functions)",
    "ti_ar": "بناء الخطوات: حساب التركيب والمعكوس (الدوال)",
    "steps": [
      {
        "l": "For \\(f(x) = 4x + 4\\) and \\(g(x) = x^2 + 1\\), find \\(g(3) =\\)",
        "a": "10",
        "h": "Compute 3² + 1."
      },
      {
        "l": "Now evaluate \\(f(g(3)) = f(10) =\\)",
        "a": "44",
        "h": "Compute 4×10 + 4."
      },
      {
        "l": "Evaluate \\(f^{-1}(16) =\\)",
        "a": "3",
        "h": "Solve 4x + 4 = 16."
      }
    ],
    "steps_ar": [
      {
        "l": "للدالتين \\(f(x) = 4x + 4\\) و\\(g(x) = x^2 + 1\\)، أوجد \\(g(3) =\\)",
        "a": "10",
        "h": "احسب 3² + 1."
      },
      {
        "l": "الآن احسب \\(f(g(3)) = f(10) =\\)",
        "a": "44",
        "h": "احسب 4×10 + 4."
      },
      {
        "l": "أوجد قيمة المعكوس \\(f^{-1}(16) =\\)",
        "a": "3",
        "h": "حل المعادلة 4x + 4 = 16."
      }
    ]
  }
];
D["tah-sequences"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Sum of an Arithmetic Series",
    "ti_ar": "مثال محلول: مجموع متسلسلة حسابية",
    "steps": [
      "Find the sum of the first 20 terms of the arithmetic sequence with \\(a=5,\\ d=3\\). Use \\(S_n=\\tfrac n2(2a+(n-1)d)\\).",
      "\\(S_{20}=\\tfrac{20}{2}\\times(2\\times5+19\\times3)=10\\times(10+57)=10\\times67\\).",
      "\\(S_{20}=670\\)."
    ],
    "steps_ar": [
      "أوجد مجموع أول 20 حدًا من المتتالية الحسابية حيث \\(a=5,\\ d=3\\). استخدم \\(S_n=\\tfrac n2(2a+(n-1)d)\\).",
      "\\(S_{20}=\\tfrac{20}{2}\\times(2\\times5+19\\times3)=10\\times(10+57)=10\\times67\\).",
      "\\(S_{20}=670\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Infinite Geometric Series",
    "ti_ar": "فحص سريع: متسلسلة هندسية لا نهائية",
    "q": "Find the sum of the infinite geometric series with \\(a=9,\\ r=\\tfrac13\\).",
    "q_ar": "أوجد مجموع المتسلسلة الهندسية اللانهائية حيث \\(a=9,\\ r=\\tfrac13\\).",
    "o": [
      "13.5",
      "27",
      "9",
      "4.5"
    ],
    "o_ar": [
      "13.5",
      "27",
      "9",
      "4.5"
    ],
    "a": 0,
    "ex": "\\(S=\\dfrac{9}{1-\\tfrac13}=\\dfrac{9}{\\tfrac23}=13.5\\).",
    "ex_ar": "\\(S=\\dfrac{9}{1-\\tfrac13}=\\dfrac{9}{\\tfrac23}=13.5\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Sequence Formulas",
    "ti_ar": "مطابقة: قوانين المتتاليات",
    "p": [
      {
        "l": "Arithmetic nth term \\(a_n\\)",
        "r": "a₁ + (n−1)d"
      },
      {
        "l": "Arithmetic sum \\(S_n\\)",
        "r": "(n/2)(a₁ + a_n)"
      },
      {
        "l": "Geometric nth term \\(a_n\\)",
        "r": "a₁ · r^{n−1}"
      },
      {
        "l": "Infinite geometric sum \\(S_\\infty\\)",
        "r": "a₁ / (1−r)"
      }
    ],
    "p_ar": [
      {
        "l": "الحد النوني للمتتالية الحسابية \\(a_n\\)",
        "r": "a₁ + (n−1)d"
      },
      {
        "l": "مجموع المتسلسلة الحسابية \\(S_n\\)",
        "r": "(n/2)(a₁ + a_n)"
      },
      {
        "l": "الحد النوني للمتتالية الهندسية \\(a_n\\)",
        "r": "a₁ · r^{n−1}"
      },
      {
        "l": "مجموع المتسلسلة الهندسية اللانهائية \\(S_\\infty\\)",
        "r": "a₁ / (1−r)"
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Sum of Finite Geometric Series \\(3 + 6 + 12 + 24\\)",
    "ti_ar": "باني الخطوات: مجموع متسلسلة هندسية منتهية \\(3 + 6 + 12 + 24\\)",
    "steps": [
      {
        "l": "First term \\(a = 3\\), common ratio \\(r = 6 \\div 3 =\\)",
        "a": "2",
        "h": "Compute the quotient \\(6 \\div 3\\) to find the common ratio."
      },
      {
        "l": "Number of terms \\(n =\\)",
        "a": "4",
        "h": "Count the total number of terms being summed in the series."
      },
      {
        "l": "Compute \\(r^n = 2^4 =\\)",
        "a": "16",
        "h": "Evaluate the power \\(2^4\\) by multiplying \\(2\\) by itself \\(4\\) times."
      },
      {
        "l": "Sum \\(S_4 = \\frac{3(1 - 16)}{1 - 2} = \\frac{3(-15)}{-1} =\\)",
        "a": "45",
        "h": "Perform the calculation in \\(\\frac{3(-15)}{-1}\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "الحد الأول \\(a = 3\\)، والأساس \\(r = 6 \\div 3 =\\)",
        "a": "2",
        "h": "احسب خارج القسمة \\(6 \\div 3\\) لإيجاد الأساس."
      },
      {
        "l": "عدد الحدود \\(n =\\)",
        "a": "4",
        "h": "عُدّ حدود المتسلسلة المعطاة في السؤال."
      },
      {
        "l": "احسب \\(r^n = 2^4 =\\)",
        "a": "16",
        "h": "احسب القوة \\(2^4\\) بضرب \\(2\\) في نفسه \\(4\\) مرات."
      },
      {
        "l": "المجموع \\(S_4 = \\frac{3(1 - 16)}{1 - 2} = \\frac{3(-15)}{-1} =\\)",
        "a": "45",
        "h": "أجرِ العملية الحسابية في المقدار \\(\\frac{3(-15)}{-1}\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Find the Sum of an Arithmetic Series",
    "ti_ar": "حساب مجموع متسلسلة حسابية",
    "q": "Find the sum of the first 10 terms of the arithmetic series with \\(a_1 = 3\\) and \\(a_{10} = 39\\):",
    "q_ar": "احسب مجموع أول 10 حدود من متسلسلة حسابية حدها الأول \\(a_1 = 3\\) وحدها العاشر \\(a_{10} = 39\\):",
    "a": 210,
    "tol": 0.001,
    "h": "S_n = (n/2)(a_1 + a_n) = (10/2)(3 + 39) = 5 × 42 = 210.",
    "h_ar": "S_n = (n/2)(a_1 + a_n) = (10/2)(3 + 39) = 5 × 42 = 210.",
    "sol": "5 × 42 = 210.",
    "sol_ar": "5 × 42 = 210."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Evaluating Geometric Series Convergence",
    "ti_ar": "رتّب الخطوات: اختبار تقارب المتسلسلة الهندسية وحساب مجموعها",
    "q": "Order the steps to find the sum of an infinite geometric series:",
    "q_ar": "رتّب الخطوات لإيجاد مجموع متسلسلة هندسية لانهائية:",
    "items": [
      "Identify the first term a₁ from the series",
      "Calculate the common ratio r by dividing any term by its predecessor (a₂ / a₁)",
      "Check the convergence criterion: verify whether |r| < 1",
      "If |r| >= 1, conclude that the series diverges and has no finite sum",
      "If |r| < 1, substitute a₁ and r into S = a₁ / (1 - r)"
    ],
    "items_ar": [
      "تحديد الحد الأول a₁ في المتسلسلة",
      "حساب أساس المتتابعة r بقسمة الحد الثاني على الأول (a₂ / a₁)",
      "التحقق من شرط التقارب: فحص هل |r| < 1",
      "إذا كان |r| >= 1، فإن المتسلسلة متباعدة وليس لها مجموع",
      "إذا كان |r| < 1، التعويض في قانون المجموع S = a₁ / (1 - r)"
    ],
    "sol": "Checking |r| < 1 prevents incorrect summation of divergent series.",
    "sol_ar": "التحقق من شرط الأساس يحمي من تطبيق القانون على متسلسلات متباعدة."
  },
  {
    "t": "cat",
    "ti": "Classify Sequences by Type",
    "ti_ar": "تصنيف نوع المتتابعة",
    "categories": [
      "Arithmetic Sequence (متتابعة حسابية)",
      "Geometric Sequence (متتابعة هندسية)",
      "Neither (ليست حسابية ولا هندسية)"
    ],
    "categories_ar": [
      "متتابعة حسابية (فرق ثابت)",
      "متتابعة هندسية (نسبة ثابتة)",
      "ليست حسابية ولا هندسية"
    ],
    "items": [
      {
        "s": "3, 7, 11, 15, 19 (d = 4)",
        "cat": 0
      },
      {
        "s": "2, 6, 18, 54 (r = 3)",
        "cat": 1
      },
      {
        "s": "1, 4, 9, 16, 25 (Squares)",
        "cat": 2
      },
      {
        "s": "100, 50, 25, 12.5 (r = 0.5)",
        "cat": 1
      },
      {
        "s": "50, 43, 36, 29 (d = -7)",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "3، 7، 11، 15، 19 (الفرق = 4)",
        "cat": 0
      },
      {
        "s": "2، 6، 18، 54 (النسبة = 3)",
        "cat": 1
      },
      {
        "s": "1، 4، 9، 16، 25 (مربعات الأعداد)",
        "cat": 2
      },
      {
        "s": "100، 50، 25، 12.5 (النسبة = 0.5)",
        "cat": 1
      },
      {
        "s": "50، 43، 36، 29 (الفرق = -7)",
        "cat": 0
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Infinite Geometric Series Convergence Check (Sequences & Series)",
    "ti_ar": "اكتشف الخطأ: شرط تقارب المتسلسلة الهندسية اللانهائية (المتتاليات والمتسلسلات)",
    "q": "A student applies \\(S_\\infty = \\dfrac{a}{1 - r}\\) to \\(30 + 60 + 120 + \\cdots\\). Where does the reasoning fail?",
    "q_ar": "يطبّق طالب صيغة \\(S_\\infty = \\dfrac{a}{1 - r}\\) على المتسلسلة \\(30 + 60 + 120 + \\cdots\\). أين موضع الخطأ؟",
    "steps": [
      "Identify first term \\(a = 30\\) and common ratio \\(r = 2\\).",
      "Substitute directly into \\(S_\\infty = \\frac{30}{1 - 2} = -30\\).",
      "Conclude the sum of positive growing terms equals \\(-30\\)."
    ],
    "steps_ar": [
      "تحديد الحد الأول \\(a = 30\\) والأساس \\(r = 2\\).",
      "التعويض المباشر في القانون \\(S_\\infty = \\frac{30}{1 - 2} = -30\\).",
      "استنتاج أن مجموع حدود موجبة متزايدة يساوي \\(-30\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The sum-to-infinity formula \\(S_\\infty = \\frac{a}{1 - r}\\) is valid ONLY when \\(|r| < 1\\); since \\(|2| \\ge 1\\), the series diverges to \\(+\\infty\\).",
      "The formula should be \\(\\frac{a}{r - 1}\\).",
      "\\(r\\) equals \\(\\frac{1}{2}\\) here."
    ],
    "reasons_ar": [
      "صيغة المجموع إلى اللانهاية صالحة فقط عندما \\(|r| < 1\\)؛ وبما أن \\(|2| \\ge 1\\) فالمتسلسلة متباعدة إلى \\(+\\infty\\).",
      "القانون الصحيح هو \\(\\frac{a}{r - 1}\\).",
      "قيمة الأساس هنا \\(\\frac{1}{2}\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Convergent Geometric & Arithmetic Series (Sequences & Series)",
    "ti_ar": "وضع المصحح: المتتاليات الحسابية والهندسية المتقاربة (المتتاليات والمتسلسلات)",
    "q": "(a) A geometric series has first term \\(a = 30\\) and common ratio \\(r = \\frac{1}{3}\\). Verify convergence and find \\(S_\\infty\\). (b) An arithmetic progression has \\(u_1 = 30\\) and common difference \\(d = 6\\); find \\(u_{10}\\).",
    "q_ar": "(أ) متسلسلة هندسية حدها الأول \\(a = 30\\) وأساسها \\(r = \\frac{1}{3}\\). تحقق من التقارب وأوجد \\(S_\\infty\\). (ب) متتالية حسابية حدها الأول \\(30\\) وأساسها \\(d = 6\\)؛ أوجد الحد العاشر \\(u_{10}\\).",
    "parts": [
      {
        "label": "Part (a) — Convergence Criterion & Sum to Infinity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Since \\(|r| = \\frac{1}{3} < 1\\), the infinite geometric series converges."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(S_\\infty = \\dfrac{30}{1 - 1/3} = \\dfrac{30}{2/3} = 45\\)."
          }
        ]
      },
      {
        "label": "Part (b) — 10th Arithmetic Term",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Use \\(u_n = u_1 + (n - 1)d\\) with \\(n = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(u_{10} = 30 + 9(6) = 84\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — شرط التقارب والمجموع إلى ما لا نهاية",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "بما أن \\(|r| = \\frac{1}{3} < 1\\)، فالمتسلسلة الهندسية متقاربة."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(S_\\infty = \\dfrac{30}{1 - 1/3} = 45\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — الحد العاشر في المتتالية الحسابية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "بتطبيق القانون \\(u_n = u_1 + (n - 1)d\\) عند \\(n = 10\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(u_{10} = 30 + 9(6) = 84\\)."
          }
        ]
      }
    ]
  }
];
D["tah-trig"] = [
  {
    "t": "tf",
    "ti": "True or False: Trigonometry",
    "ti_ar": "صحيح أم خطأ: المثلثات",
    "items": [
      {
        "s": "\\(\\sin^2\\theta+\\cos^2\\theta=1\\)",
        "a": true,
        "ex": "Pythagorean identity."
      },
      {
        "s": "\\(\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}\\)",
        "a": true,
        "ex": "Definition of tangent."
      },
      {
        "s": "\\(\\cos(90°-\\theta)=\\cos\\theta\\)",
        "a": false,
        "ex": "\\(\\cos(90°-\\theta)=\\sin\\theta\\)."
      },
      {
        "s": "\\(\\sin(180°-\\theta)=\\sin\\theta\\)",
        "a": true,
        "ex": "Supplementary angle identity."
      }
    ],
    "items_ar": [
      {
        "s": "\\(\\sin^2\\theta+\\cos^2\\theta=1\\)",
        "a": true,
        "ex": "متطابقة فيثاغورس."
      },
      {
        "s": "\\(\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}\\)",
        "a": true,
        "ex": "تعريف الظل."
      },
      {
        "s": "\\(\\cos(90°-\\theta)=\\cos\\theta\\)",
        "a": false,
        "ex": "\\(\\cos(90°-\\theta)=\\sin\\theta\\)."
      },
      {
        "s": "\\(\\sin(180°-\\theta)=\\sin\\theta\\)",
        "a": true,
        "ex": "متطابقة الزاوية المكمِّلة إلى 180°."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Special Angle Trig Values",
    "ti_ar": "مطابقة: القيم المثلثية للزوايا الخاصة",
    "p": [
      {
        "l": "\\(\\sin 30^\\circ\\)",
        "r": "1/2"
      },
      {
        "l": "\\(\\cos 45^\\circ\\)",
        "r": "√2 / 2"
      },
      {
        "l": "\\(\\tan 45^\\circ\\)",
        "r": "1"
      },
      {
        "l": "\\(\\cos 30^\\circ\\)",
        "r": "√3 / 2"
      }
    ],
    "p_ar": [
      {
        "l": "\\(\\sin 30^\\circ\\)",
        "r": "1/2"
      },
      {
        "l": "\\(\\cos 45^\\circ\\)",
        "r": "√2 / 2"
      },
      {
        "l": "\\(\\tan 45^\\circ\\)",
        "r": "1"
      },
      {
        "l": "\\(\\cos 30^\\circ\\)",
        "r": "√3 / 2"
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solving a Trig Equation",
    "ti_ar": "مثال محلول: حل معادلة مثلثية",
    "steps": [
      "Solve \\(\\sin\\theta=\\tfrac12\\) for \\(0°\\le\\theta\\le360°\\). The reference angle is \\(30°\\) since \\(\\sin30°=\\tfrac12\\).",
      "Sine is positive in Quadrants I and II.",
      "\\(\\theta=30°\\) or \\(\\theta=180°-30°=150°\\)."
    ],
    "steps_ar": [
      "حل \\(\\sin\\theta=\\tfrac12\\) لـ \\(0°\\le\\theta\\le360°\\). الزاوية المرجعية هي \\(30°\\) لأن \\(\\sin30°=\\tfrac12\\).",
      "دالة الجيب موجبة في الرُبعين الأول والثاني.",
      "\\(\\theta=30°\\) أو \\(\\theta=180°-30°=150°\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Radians",
    "ti_ar": "فحص سريع: الراديان",
    "q": "Convert \\(\\tfrac{3\\pi}{4}\\) radians to degrees.",
    "q_ar": "حوّل \\(\\tfrac{3\\pi}{4}\\) راديان إلى درجات.",
    "o": [
      "135°",
      "120°",
      "150°",
      "108°"
    ],
    "o_ar": [
      "135°",
      "120°",
      "150°",
      "108°"
    ],
    "a": 0,
    "ex": "\\(\\tfrac{3\\pi}{4}\\times\\tfrac{180}{\\pi}=135°\\).",
    "ex_ar": "\\(\\tfrac{3\\pi}{4}\\times\\tfrac{180}{\\pi}=135°\\)."
  },
  {
    "t": "num",
    "ti": "Calculate Right-Angle Trig Side",
    "ti_ar": "حساب طول ضلع في مثلث قائم",
    "q": "In a right triangle with hypotenuse \\(c = 10\\) and acute angle \\(\\theta = 30^\\circ\\), what is the length of the opposite side?",
    "q_ar": "في مثلث قائم الزاوية طول وتره 10 وقياس إحدى زواياه الحادة \\(30^\\circ\\)، ما طول الضلع المقابل لهذه الزاوية؟",
    "a": 5,
    "tol": 0.001,
    "h": "opposite = hypotenuse × sin(30°) = 10 × 0.5 = 5.",
    "h_ar": "الضلع المقابل = الوتر × sin(30°) = 10 × 0.5 = 5.",
    "sol": "10 × 0.5 = 5.",
    "sol_ar": "10 × 0.5 = 5."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Evaluating Trig Value for Angles > 90°",
    "ti_ar": "رتّب الخطوات: حساب قيمة دالة مثلثية لزاوية أكبر من 90°",
    "q": "Order the steps to evaluate \\(\\cos(240^\\circ)\\):",
    "q_ar": "رتّب الخطوات لحساب قيمة \\(\\cos(240^\\circ)\\):",
    "items": [
      "Identify the quadrant containing 240° (Quadrant III)",
      "Find the reference angle: 240° - 180° = 60°",
      "Recall the standard acute angle value: cos(60°) = 1/2",
      "Apply ASTC rule: cosine is negative in Quadrant III",
      "Combine sign and value: cos(240°) = -1/2"
    ],
    "items_ar": [
      "تحديد الربع الذي تقع فيه الزاوية 240° (الربع الثالث)",
      "إيجاد زاوية الإسناد المرجعية: 240° - 180° = 60°",
      "تذكر قيمة زاوية الإسناد الحادة: cos(60°) = 1/2",
      "تطبيق قاعدة إشارات الأرباع: جيب التمام سالب في الربع الثالث",
      "دمج الإشارة بالقيمة: cos(240°) = -1/2"
    ],
    "sol": "Reference angles and quadrant rules resolve all non-acute trigonometric values.",
    "sol_ar": "استخدام زاوية الإسناد مع إشارة الربع يعطي القيمة الدقيقة دائماً."
  },
  {
    "t": "cat",
    "ti": "Classify Signs of Trig Functions by Quadrant",
    "ti_ar": "تصنيف إشارات الدوال المثلثية حسب الربع",
    "categories": [
      "Quadrant I (All Positive)",
      "Quadrant II (Sine Positive)",
      "Quadrant III (Tangent Positive)",
      "Quadrant IV (Cosine Positive)"
    ],
    "categories_ar": [
      "الربع الأول (الكل موجب)",
      "الربع الثاني (الجيب موجب)",
      "الربع الثالث (الظل موجب)",
      "الربع الرابع (جيب التمام موجب)"
    ],
    "items": [
      {
        "s": "θ = 45°",
        "cat": 0
      },
      {
        "s": "θ = 135°",
        "cat": 1
      },
      {
        "s": "θ = 210°",
        "cat": 2
      },
      {
        "s": "θ = 300°",
        "cat": 3
      },
      {
        "s": "θ = 60°",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "الزاوية 45°",
        "cat": 0
      },
      {
        "s": "الزاوية 135°",
        "cat": 1
      },
      {
        "s": "الزاوية 210°",
        "cat": 2
      },
      {
        "s": "الزاوية 300°",
        "cat": 3
      },
      {
        "s": "الزاوية 60°",
        "cat": 0
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Quadrant Sign & Dividing by \\(\\sin\\theta\\) (Trigonometry)",
    "ti_ar": "اكتشف الخطأ: إشارة الربع والقسمة على \\(\\sin\\theta\\) (المثلثات)",
    "q": "Solve \\(2\\sin\\theta\\cos\\theta = \\sin\\theta\\) for \\(0 \\le \\theta < 2\\pi\\). Which step loses valid roots?",
    "q_ar": "عند حل المعادلة \\(2\\sin\\theta\\cos\\theta = \\sin\\theta\\) على الفترة \\(0 \\le \\theta < 2\\pi\\)، أي خطوة تضيع حلولاً صحيحة؟",
    "steps": [
      "Divide both sides by \\(\\sin\\theta\\) without checking \\(\\sin\\theta = 0\\), obtaining \\(2\\cos\\theta = 1\\).",
      "Solve \\(\\cos\\theta = \\frac{1}{2}\\) to find \\(\\theta = \\frac{\\pi}{3}, \\frac{5\\pi}{3}\\).",
      "State \\(\\left\\{\\frac{\\pi}{3}, \\frac{5\\pi}{3}\\right\\}\\) as the complete solution set."
    ],
    "steps_ar": [
      "قسمة الطرفين على \\(\\sin\\theta\\) دون فحص حالة \\(\\sin\\theta = 0\\) للحصول على \\(2\\cos\\theta = 1\\).",
      "حل \\(\\cos\\theta = \\frac{1}{2}\\) لإيجاد \\(\\theta = \\frac{\\pi}{3}, \\frac{5\\pi}{3}\\).",
      "كتابة هاتين الزاويتين فقط كمجموعة حل كاملة."
    ],
    "errorStep": 1,
    "reasons": [
      "Dividing by \\(\\sin\\theta\\) discards the roots where \\(\\sin\\theta = 0\\) (\\(\\theta = 0, \\pi\\)); instead factor \\(\\sin\\theta(2\\cos\\theta - 1) = 0\\).",
      "\\(\\cos\\theta = \\frac{1}{2}\\) has no solutions in Quadrant IV.",
      "\\(\\sin\\theta\\) can never equal zero."
    ],
    "reasons_ar": [
      "القسمة على \\(\\sin\\theta\\) تحذف الجذور التي تجعل \\(\\sin\\theta = 0\\) (وهي \\(0, \\pi\\))؛ الصواب نقل الحدود والتحليل \\(\\sin\\theta(2\\cos\\theta - 1) = 0\\).",
      "لا يوجد حل لمعادلة \\(\\cos\\theta = \\frac{1}{2}\\) في الربع الرابع.",
      "لا يمكن أن يساوي \\(\\sin\\theta\\) صفراً."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Quadrant Identities & Cosine Rule (Trigonometry)",
    "ti_ar": "وضع المصحح: المتطابقات المثلثية وقانون جيب التمام (المثلثات)",
    "q": "Suppose \\(\\sin\\theta = \\dfrac{3}{5}\\) with \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (Quadrant II). (a) Find exact values of \\(\\cos\\theta\\) and \\(\\tan\\theta\\). (b) Evaluate \\(\\sin(2\\theta)\\).",
    "q_ar": "إذا كان \\(\\sin\\theta = \\dfrac{3}{5}\\) حيث \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (الربع الثاني). (أ) أوجد القيمة الدقيقة لكل من \\(\\cos\\theta\\) و\\(\\tan\\theta\\). (ب) احسب \\(\\sin(2\\theta)\\).",
    "parts": [
      {
        "label": "Part (a) — Quadrant II Cosine & Tangent",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}\\), negative in QII \\(\\implies \\cos\\theta = -\\frac{4}{5}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = -\\frac{3}{4}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Double-Angle Sine",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Apply \\(\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sin(2\\theta) = 2\\left(\\frac{3}{5}\\right)\\left(-\\frac{4}{5}\\right) = -\\frac{24}{25}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — جيب التمام والظل في الربع الثاني",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "في الربع الثاني \\(\\cos\\theta < 0\\) ومن متطابقة فيثاغورس \\(\\cos\\theta = -\\frac{4}{5}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = -\\frac{3}{4}\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — جيب ضعف الزاوية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "تطبيق المتطابقة \\(\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sin(2\\theta) = -\\frac{24}{25}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Sinusoidal Amplitude, Period & Exact Ratios (Trigonometry)",
    "ti_ar": "بناء الخطوات: السعة والدورة والنسب المثلثية (المثلثات)",
    "steps": [
      {
        "l": "State the amplitude of \\(y = -2\\cos(2x)\\):",
        "a": "2",
        "h": "Amplitude is |A| > 0."
      },
      {
        "l": "If \\(\\tan\\theta = \\frac{3}{4}\\) for acute \\(\\theta\\), find \\(\\sec\\theta\\) numerator over \\(4\\):",
        "a": "5",
        "h": "Hypotenuse of (3, 4) right triangle."
      },
      {
        "l": "Convert \\(\\pi / 3\\) radians into degrees:",
        "a": "60",
        "h": "Multiply 180 by 1/3."
      }
    ],
    "steps_ar": [
      {
        "l": "اذكر سعة الدالة \\(y = -2\\cos(2x)\\):",
        "a": "2",
        "h": "السعة تساوي القيمة المطلقة |A|."
      },
      {
        "l": "إذا كان \\(\\tan\\theta = \\frac{3}{4}\\) لزاوية حادة، فما بسط \\(\\sec\\theta\\) المقامه \\(4\\)؟",
        "a": "5",
        "h": "وتر المثلث القائم ذي الضلعين 3 و4."
      },
      {
        "l": "حوّل \\(\\pi / 3\\) راديان إلى درجات:",
        "a": "60",
        "h": "احسب 180 ÷ 3."
      }
    ]
  }
];
D["tah-geometry"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Cylinder volume, \\(r=3\\), \\(h=5\\)",
    "ti_ar": "باني الخطوات: حجم أسطوانة، \\(r=3\\)، \\(h=5\\)",
    "steps": [
      {
        "l": "\\(r^2=3^2=\\)",
        "a": "9",
        "h": "Evaluate the power \\(3^2\\) by multiplying \\(3\\) by itself \\(2\\) times."
      },
      {
        "l": "\\(V=\\pi\\times9\\times5=\\)",
        "a": "45pi",
        "h": "\\(45\\pi\\)"
      }
    ],
    "steps_ar": [
      {
        "l": "\\(r^2=3^2=\\)",
        "a": "9",
        "h": "احسب القوة \\(3^2\\) بضرب \\(3\\) في نفسه \\(2\\) مرات."
      },
      {
        "l": "\\(V=\\pi\\times9\\times5=\\)",
        "a": "45pi",
        "h": "\\(45\\pi\\)"
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Distance between \\((2,1)\\) and \\((6,4)\\)",
    "ti_ar": "باني الخطوات: المسافة بين النقطتين \\((2,1)\\) و\\((6,4)\\)",
    "steps": [
      {
        "l": "\\(\\Delta x = 6 - 2 =\\)",
        "a": "4",
        "h": "Perform the calculation in \\(6 - 2\\) to find the result."
      },
      {
        "l": "\\(\\Delta y = 4 - 1 =\\)",
        "a": "3",
        "h": "Perform the calculation in \\(4 - 1\\) to find the result."
      },
      {
        "l": "\\(d = \\sqrt{4^2+3^2} = \\sqrt{16+9} =\\)",
        "a": "5",
        "h": "Perform the calculation in \\(\\sqrt{16+9}\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "\\(\\Delta x = 6 - 2 =\\)",
        "a": "4",
        "h": "أجرِ العملية الحسابية في المقدار \\(6 - 2\\) للوصول إلى النتيجة."
      },
      {
        "l": "\\(\\Delta y = 4 - 1 =\\)",
        "a": "3",
        "h": "أجرِ العملية الحسابية في المقدار \\(4 - 1\\) للوصول إلى النتيجة."
      },
      {
        "l": "\\(d = \\sqrt{4^2+3^2} = \\sqrt{16+9} =\\)",
        "a": "5",
        "h": "أجرِ العملية الحسابية في المقدار \\(\\sqrt{16+9}\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Midpoint and Gradient",
    "ti_ar": "مثال محلول: نقطة المنتصف والميل",
    "steps": [
      "Find the midpoint and gradient of the segment from \\((-2,5)\\) to \\((4,-3)\\). Midpoint is the average of coordinates.",
      "Midpoint \\(=\\left(\\dfrac{-2+4}{2},\\dfrac{5-3}{2}\\right)=(1,1)\\).",
      "Gradient \\(=\\dfrac{-3-5}{4-(-2)}=\\dfrac{-8}{6}=-\\dfrac43\\)."
    ],
    "steps_ar": [
      "أوجد نقطة المنتصف وميل القطعة المستقيمة من \\((-2,5)\\) إلى \\((4,-3)\\). نقطة المنتصف هي متوسط الإحداثيات.",
      "نقطة المنتصف \\(=\\left(\\dfrac{-2+4}{2},\\dfrac{5-3}{2}\\right)=(1,1)\\).",
      "الميل \\(=\\dfrac{-3-5}{4-(-2)}=\\dfrac{-8}{6}=-\\dfrac43\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Distance Formula",
    "ti_ar": "فحص سريع: صيغة المسافة",
    "q": "Find the distance between \\((1,2)\\) and \\((4,6)\\).",
    "q_ar": "أوجد المسافة بين \\((1,2)\\) و\\((4,6)\\).",
    "o": [
      "5",
      "7",
      "25",
      "13"
    ],
    "o_ar": [
      "5",
      "7",
      "25",
      "13"
    ],
    "a": 0,
    "ex": "\\(\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}=5\\).",
    "ex_ar": "\\(\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}=5\\)."
  },
  {
    "t": "num",
    "ti": "Calculate Interior Angle Sum of a Polygon",
    "ti_ar": "حساب مجموع قياسات الزوايا الداخلية لمضلع",
    "q": "What is the sum of interior angles in degrees of a regular hexagon (6 sides)?",
    "q_ar": "ما مجموع قياسات الزوايا الداخلية بالدرجات للشكل السداسي (6 أضلاع)؟",
    "a": 720,
    "tol": 0.001,
    "h": "Sum = (n - 2) × 180° = (6 - 2) × 180° = 4 × 180° = 720°.",
    "h_ar": "المجموع = (n - 2) × 180° = (6 - 2) × 180° = 4 × 180° = 720°.",
    "sol": "(6 - 2) × 180 = 720°.",
    "sol_ar": "(6 - 2) × 180 = 720°."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding Perpendicular Line Equation",
    "ti_ar": "رتّب الخطوات: كتابة معادلة المستقيم العمودي",
    "q": "Order the steps to find the equation of a line perpendicular to \\(y = 2x + 1\\) passing through \\((0, 3)\\):",
    "q_ar": "رتّب الخطوات لإيجاد معادلة المستقيم العمودي على \\(y = 2x + 1\\) والمار بالنقطة \\((0, 3)\\):",
    "items": [
      "Identify the slope of the given line: m₁ = 2",
      "Calculate the perpendicular slope: m₂ = -1/m₁ = -1/2",
      "Identify the y-intercept from the point (0, 3): b = 3",
      "Write slope-intercept form: y = mx + b",
      "Substitute values: y = -1/2 x + 3"
    ],
    "items_ar": [
      "تحديد ميل المستقيم المعطى: m₁ = 2",
      "حساب ميل المستقيم العمودي (مقلوب معكوس): m₂ = -1/2",
      "تحديد المقطع الصادي من النقطة (0, 3): b = 3",
      "كتابة معادلة المستقيم بصيغة الميل والمقطع: y = mx + b",
      "التعويض بالقيم: y = -1/2 x + 3"
    ],
    "sol": "Perpendicular slopes multiply to -1.",
    "sol_ar": "حاصل ضرب ميلي المستقيمين المتعامدين يساوي -1."
  },
  {
    "t": "cat",
    "ti": "Classify Triangles by Side Relationships",
    "ti_ar": "تصنيف المثلثات حسب أطوال الأضلاع",
    "categories": [
      "Equilateral (متطابق الأضلاع)",
      "Isosceles (متطابق الضلعين)",
      "Scalene (مختلف الأضلاع)"
    ],
    "categories_ar": [
      "متطابق الأضلاع",
      "متطابق الضلعين",
      "مختلف الأضلاع"
    ],
    "items": [
      {
        "s": "Sides: 5 cm, 5 cm, 5 cm",
        "cat": 0
      },
      {
        "s": "Sides: 6 cm, 6 cm, 8 cm",
        "cat": 1
      },
      {
        "s": "Sides: 3 cm, 4 cm, 5 cm",
        "cat": 2
      },
      {
        "s": "Sides: 7 cm, 10 cm, 7 cm",
        "cat": 1
      },
      {
        "s": "Sides: 12 cm, 12 cm, 12 cm",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "الأضلاع: 5 سم، 5 سم، 5 سم",
        "cat": 0
      },
      {
        "s": "الأضلاع: 6 سم، 6 سم، 8 سم",
        "cat": 1
      },
      {
        "s": "الأضلاع: 3 سم، 4 سم، 5 سم",
        "cat": 2
      },
      {
        "s": "الأضلاع: 7 سم، 10 سم، 7 سم",
        "cat": 1
      },
      {
        "s": "الأضلاع: 12 سم، 12 سم، 12 سم",
        "cat": 0
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Perpendicular Gradient & Inequality Sign (Geometry & Coordinate Geometry)",
    "ti_ar": "اكتشف الخطأ: ميل المستقيم المتعامد وإشارة المتباينة (الهندسة والهندسة الإحداثية)",
    "q": "Given \\(A(2, 3)\\) and \\(B(4, 9)\\), a student finds the gradient of the line perpendicular to \\(AB\\). Which step is wrong?",
    "q_ar": "مُعطى النقطتان \\(A(2, 3)\\) و\\(B(4, 9)\\)، يحسب طالب ميل العمودي على \\(AB\\). أي خطوة خاطئة؟",
    "steps": [
      "Compute gradient of \\(AB\\): \\(m_{AB} = \\frac{9 - 3}{4 - 2} = \\frac{6}{2} = 3\\).",
      "Compute midpoint of \\(AB\\): \\(M = (3, 6)\\).",
      "Take the perpendicular gradient as the positive reciprocal \\(m_{\\perp} = \\frac{1}{3}\\) without negating the sign.",
      "Substitute \\(M(3, 6)\\) into point-slope form."
    ],
    "steps_ar": [
      "حساب ميل القطعة \\(AB\\): \\(m_{AB} = \\frac{9 - 3}{4 - 2} = 3\\).",
      "حساب نقطة المنتصف: \\(M = (3, 6)\\).",
      "أخذ ميل العمودي كمقلوب موجب \\(m_{\\perp} = \\frac{1}{3}\\) دون عكس الإشارة.",
      "التعويض بالنقطة \\(M(3, 6)\\) في معادلة المستقيم."
    ],
    "errorStep": 3,
    "reasons": [
      "Perpendicular non-vertical lines satisfy \\(m_1 m_2 = -1\\), so \\(m_{\\perp} = -\\frac{1}{3}\\) (negative reciprocal, not positive reciprocal).",
      "Perpendicular lines have equal slopes \\(m_1 = m_2\\).",
      "Slope is run divided by rise."
    ],
    "reasons_ar": [
      "المستقيمان المتعامدان يحققان \\(m_1 m_2 = -1\\)، لذا ميل العمودي هو المقلوب السالب \\(m_{\\perp} = -\\frac{1}{3}\\).",
      "المستقيمان المتعامدان لهما نفس الميل.",
      "الميل يساوي فرق السينات على فرق الصادات."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Line Equation & Perpendicular Bisector (Geometry & Coordinate Geometry)",
    "ti_ar": "وضع المصحح: معادلة المستقيم والعمود المنصّف (الهندسة والهندسة الإحداثية)",
    "q": "Points \\(A(2, 3)\\) and \\(B(4, 9)\\) lie in the coordinate plane. (a) Find the equation of line \\(AB\\) in \\(y = mx + c\\) form. (b) Find the midpoint \\(M\\) and the gradient of the perpendicular bisector of \\(AB\\).",
    "q_ar": "النقطتان \\(A(2, 3)\\) و\\(B(4, 9)\\) في المستوى الإحداثي. (أ) أوجد معادلة المستقيم \\(AB\\) بصيغة \\(y = mx + c\\). (ب) أوجد نقطة المنتصف \\(M\\) وميل العمود المنصّف للقطعة \\(AB\\).",
    "parts": [
      {
        "label": "Part (a) — Gradient & Line Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Gradient \\(m = \\frac{9 - 3}{4 - 2} = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Intercept \\(c = 3 - 3(2) = -3\\), giving \\(y = 3x - 3\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Midpoint & Orthogonal Gradient",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Midpoint \\(M = \\left(\\frac{2+4}{2}, \\frac{3+9}{2}\\right) = (3, 6)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Perpendicular gradient \\(m_{\\perp} = -\\frac{1}{3}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الميل ومعادلة المستقيم",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الميل \\(m = \\frac{9 - 3}{4 - 2} = 3\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "المقطع الصادي \\(c = -3\\)، والمعادلة \\(y = 3x - 3\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — نقطة المنتصف وميل العمود المنصّف",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "نقطة المنتصف \\(M = (3, 6)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "ميل العمود المنصّف \\(m_{\\perp} = -\\frac{1}{3}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Linear & Coordinate Geometry Criteria (Geometry & Coordinate Geometry)",
    "ti_ar": "مطابقة: علاقات المستقيمات والهندسة الإحداثية (الهندسة والهندسة الإحداثية)",
    "p": [
      {
        "l": "Parallel distinct lines",
        "r": "\\(m_1 = m_2\\) and \\(c_1 \\neq c_2\\) (0 intersections)"
      },
      {
        "l": "Perpendicular lines",
        "r": "\\(m_1 m_2 = -1\\) (e.g. \\(3\\) and \\(-1/3\\))"
      },
      {
        "l": "Euclidean distance \\(|AB|\\)",
        "r": "\\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)"
      },
      {
        "l": "Multiplying an inequality by \\(-1\\)",
        "r": "Reverses the inequality direction (\\(< \\;\\to\\; >\\))"
      }
    ],
    "p_ar": [
      {
        "l": "مستقيمان متوازيان مختلفان",
        "r": "\\(m_1 = m_2\\) و\\(c_1 \\neq c_2\\) (لا يوجد تقاطع)"
      },
      {
        "l": "مستقيمان متعامدان",
        "r": "\\(m_1 m_2 = -1\\) (مثل \\(3\\) و\\(-1/3\\))"
      },
      {
        "l": "المسافة الإقليدية \\(|AB|\\)",
        "r": "\\(\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)"
      },
      {
        "l": "ضرب طرفي متباينة في عدد سالب",
        "r": "يعكس اتجاه علامة التباين (\\(< \\;\\to\\; >\\))"
      }
    ]
  }
];
D["tah-calc1"] = [
  {
    "t": "sr",
    "ti": "Worked Example: The Product Rule",
    "ti_ar": "مثال محلول: قاعدة الضرب",
    "steps": [
      "Differentiate \\(y=x^2\\sin x\\) using the product rule: \\((uv)'=u'v+uv'\\) with \\(u=x^2\\), \\(v=\\sin x\\).",
      "\\(u'=2x\\), \\(v'=\\cos x\\).",
      "\\(\\dfrac{dy}{dx}=2x\\sin x+x^2\\cos x\\)."
    ],
    "steps_ar": [
      "اشتق \\(y=x^2\\sin x\\) باستخدام قاعدة الضرب: \\((uv)'=u'v+uv'\\) حيث \\(u=x^2\\)، \\(v=\\sin x\\).",
      "\\(u'=2x\\)، \\(v'=\\cos x\\).",
      "\\(\\dfrac{dy}{dx}=2x\\sin x+x^2\\cos x\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Limits",
    "ti_ar": "فحص سريع: النهايات",
    "q": "Evaluate \\(\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-4}{x-2}\\).",
    "q_ar": "أوجد قيمة \\(\\displaystyle\\lim_{x\\to2}\\dfrac{x^2-4}{x-2}\\).",
    "o": [
      "4",
      "0",
      "2",
      "undefined"
    ],
    "o_ar": [
      "4",
      "0",
      "2",
      "غير معرّفة"
    ],
    "a": 0,
    "ex": "Factor: \\(\\dfrac{(x-2)(x+2)}{x-2}=x+2\\to4\\) as \\(x\\to2\\).",
    "ex_ar": "حلل: \\(\\dfrac{(x-2)(x+2)}{x-2}=x+2\\to4\\) عندما \\(x\\to2\\)."
  },
  {
    "t": "tf",
    "ti": "True or False: Calculus I Rules",
    "ti_ar": "صحيح أم خطأ: قواعد التفاضل والنهايات",
    "items": [
      {
        "s": "The derivative of any constant \\(c\\) is zero: \\(\\frac{d}{dx}[c]=0\\).",
        "a": true,
        "ex": "Derivative of a constant is always zero."
      },
      {
        "s": "\\(\\frac{d}{dx}[\\sin x] = \\cos x\\)",
        "a": true,
        "ex": "Standard derivative of sine."
      },
      {
        "s": "\\(\\frac{d}{dx}[e^x] = x e^{x-1}\\)",
        "a": false,
        "ex": "False. \\(\\frac{d}{dx}[e^x] = e^x\\); the power rule does not apply to exponential functions."
      },
      {
        "s": "\\(\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1\\)",
        "a": true,
        "ex": "Fundamental trigonometric limit."
      }
    ],
    "items_ar": [
      {
        "s": "مشتقة أي عدد ثابت \\(c\\) تساوي صفرًا: \\(\\frac{d}{dx}[c]=0\\).",
        "a": true,
        "ex": "مشتقة الثابت دائمًا صفر."
      },
      {
        "s": "\\(\\frac{d}{dx}[\\sin x] = \\cos x\\)",
        "a": true,
        "ex": "مشتقة دالة الجيب هي جيب التمام."
      },
      {
        "s": "\\(\\frac{d}{dx}[e^x] = x e^{x-1}\\)",
        "a": false,
        "ex": "خطأ. مشتقة \\(e^x\\) هي \\(e^x\\)؛ وقاعدة القوة لا تنطبق على الدوال الأسية."
      },
      {
        "s": "\\(\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1\\)",
        "a": true,
        "ex": "نهاية مثلثية أساسية شهيرة."
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Tangent Line to \\(f(x)=x^2+3x\\) at \\(x=1\\)",
    "ti_ar": "باني الخطوات: مماس المنحنى \\(f(x)=x^2+3x\\) عند \\(x=1\\)",
    "steps": [
      {
        "l": "Find the y-coordinate: \\(f(1) = 1^2 + 3(1) =\\)",
        "a": "4",
        "h": "Evaluate the expression \\(1 + 3\\)."
      },
      {
        "l": "Derivative \\(f'(x) = 2x + 3\\). Slope \\(m = f'(1) = 2(1) + 3 =\\)",
        "a": "5",
        "h": "Evaluate the expression \\(2 + 3\\)."
      },
      {
        "l": "Equation \\(y - 4 = 5(x - 1) \\Rightarrow y = 5x + b\\). Find \\(b\\):",
        "a": "-1",
        "h": "Evaluate the expression \\(4 - 5\\)."
      }
    ],
    "steps_ar": [
      {
        "l": "أوجد الإحداثي y: \\(f(1) = 1^2 + 3(1) =\\)",
        "a": "4",
        "h": "احسب قيمة المقدار \\(1 + 3\\)."
      },
      {
        "l": "المشتقة \\(f'(x) = 2x + 3\\). الميل \\(m = f'(1) = 2(1) + 3 =\\)",
        "a": "5",
        "h": "احسب قيمة المقدار \\(2 + 3\\)."
      },
      {
        "l": "المعادلة \\(y - 4 = 5(x - 1) \\Rightarrow y = 5x + b\\). أوجد \\(b\\):",
        "a": "-1",
        "h": "احسب قيمة المقدار \\(4 - 5\\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Evaluate Derivative at a Point",
    "ti_ar": "حساب قيمة المشتقة عند نقطة",
    "q": "If \\(f(x) = 4x^2 - 7x + 2\\), compute \\(f'(3)\\):",
    "q_ar": "إذا كانت \\(f(x) = 4x^2 - 7x + 2\\)، فاحسب قيمة \\(f'(3)\\)؟",
    "a": 17,
    "tol": 0.001,
    "h": "f'(x) = 8x - 7. f'(3) = 8(3) - 7 = 24 - 7 = 17.",
    "h_ar": "f'(x) = 8x - 7. f'(3) = 8(3) - 7 = 24 - 7 = 17.",
    "sol": "8(3) - 7 = 17.",
    "sol_ar": "8(3) - 7 = 17."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Evaluating Limits with L'Hôpital's Rule",
    "ti_ar": "رتّب الخطوات: حساب النهايات باستخدام قاعدة لوبيتال",
    "q": "Order the steps to evaluate \\(\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}\\):",
    "q_ar": "رتّب الخطوات لحساب النهاية \\(\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}\\):",
    "items": [
      "Attempt direct substitution: sin(0)/0 = 0/0 (indeterminate form)",
      "Confirm conditions for L'Hôpital's rule are satisfied",
      "Differentiate numerator: d/dx[sin(3x)] = 3cos(3x)",
      "Differentiate denominator: d/dx[x] = 1",
      "Evaluate the new limit: lim 3cos(3x)/1 as x -> 0 = 3(1)/1 = 3"
    ],
    "items_ar": [
      "التعويض المباشر: sin(0)/0 = 0/0 (صيغة عدم تعيين)",
      "التحقق من انطباق شروط قاعدة لوبيتال",
      "اشتقاق البسط: d/dx[sin(3x)] = 3cos(3x)",
      "اشتقاق المقام: d/dx[x] = 1",
      "حساب نهاية الكسر الجديد: 3cos(0)/1 = 3"
    ],
    "sol": "L'Hôpital's rule resolves 0/0 limits cleanly.",
    "sol_ar": "قاعدة لوبيتال تحل صيغ عدم التعيين 0/0 بسهولة باشتقاق البسط والمقام."
  },
  {
    "t": "cat",
    "ti": "Classify Functions by Continuity and Differentiability",
    "ti_ar": "تصنيف الدوال حسب الاتصال وقابلية الاشتقاق",
    "categories": [
      "Continuous and Differentiable everywhere",
      "Continuous but Not Differentiable at a corner/cusp",
      "Discontinuous"
    ],
    "categories_ar": [
      "متصلة وقابلة للاشتقاق دائماً",
      "متصلة وغير قابلة للاشتقاق (رأس مدبب)",
      "غير متصلة"
    ],
    "items": [
      {
        "s": "\\(f(x) = x^3 - 2x + 1\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = |x|\\) at \\(x = 0\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = \\dfrac{1}{x}\\) at \\(x = 0\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) = \\sin x\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = |x - 3|\\) at \\(x = 3\\)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "\\(f(x) = x^3 - 2x + 1\\)",
        "cat": 0
      },
      {
        "s": "الدالة \\(f(x) = |x|\\) عند \\(x = 0\\)",
        "cat": 1
      },
      {
        "s": "الدالة \\(f(x) = \\dfrac{1}{x}\\) عند \\(x = 0\\)",
        "cat": 2
      },
      {
        "s": "\\(f(x) = \\sin x\\)",
        "cat": 0
      },
      {
        "s": "الدالة \\(f(x) = |x - 3|\\) عند \\(x = 3\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Chain Rule & Product Rule Differentiation (Limits & Derivatives)",
    "ti_ar": "اكتشف الخطأ: قاعدتا السلسلة والضرب في الاشتقاق (النهايات والمشتقات)",
    "q": "A student differentiates \\(f(x) = x^2 e^{4x}\\). Which step omits a required calculus rule?",
    "q_ar": "يشتق طالب الدالة \\(f(x) = x^2 e^{4x}\\). أي خطوة تغفل قاعدة أساسية في الاشتقاق؟",
    "steps": [
      "Identify the product of \\(u(x) = x^2\\) and \\(v(x) = e^{4x}\\).",
      "Compute \\(u'(x) = 2x\\) and \\(v'(x) = 4 e^{4x}\\) via the Chain Rule.",
      "Multiply the derivatives directly as \\(f'(x) = u'(x) v'(x) = 8x e^{4x}\\) instead of \\(u'v + uv'\\)."
    ],
    "steps_ar": [
      "تحديد حاصل ضرب الدالتين \\(u(x) = x^2\\) و\\(v(x) = e^{4x}\\).",
      "حساب \\(u'(x) = 2x\\) و\\(v'(x) = 4 e^{4x}\\) بقاعدة السلسلة.",
      "ضرب المشتقتين مباشرة \\(f'(x) = u'(x)v'(x)\\) بدلاً من تطبيق قاعدة الضرب \\(u'v + uv'\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "By the Product Rule, \\((uv)' = u'v + uv' = 2x e^{4x} + 4x^2 e^{4x} = x(2 + 4x)e^{4x}\\).",
      "The derivative of \\(e^{4x}\\) is \\(e^{4x}\\) without factor \\(4\\).",
      "\\((uv)' = u'v - uv'\\)."
    ],
    "reasons_ar": [
      "حسب قاعدة الضرب \\((uv)' = u'v + uv' = x(2 + 4x)e^{4x}\\).",
      "مشتقة \\(e^{4x}\\) لا تُضرب في \\(4\\).",
      "قاعدة الضرب تتضمن طرح الحدين."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Indeterminate Limit & Tangent Line (Limits & Derivatives)",
    "ti_ar": "وضع المصحح: النهايات غير المعينة ومعادلة المماس (النهايات والمشتقات)",
    "q": "(a) Evaluate \\(\\lim_{x \\to 4} \\dfrac{x^2 - 16}{x - 4}\\). (b) Find the gradient and tangent line to \\(g(x) = x^3 + 8x\\) at \\(x = 3\\).",
    "q_ar": "(أ) احسب النهاية \\(\\lim_{x \\to 4} \\dfrac{x^2 - 16}{x - 4}\\). (ب) أوجد ميل ومعادلة المماس للدالة \\(g(x) = x^3 + 8x\\) عند \\(x = 3\\).",
    "parts": [
      {
        "label": "Part (a) — Resolving 0/0 Limit",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Factor \\(\\dfrac{(x - 4)(x + 4)}{x - 4} = x + 4\\) for \\(x \\neq 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Evaluate limit as \\(x \\to 4\\): \\(8\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Derivative & Tangent Equation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(g'(x) = 3x^2 + 8 \\implies g'(3) = 35\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "With \\(g(3) = 51\\), tangent is \\(y - 51 = 35(x - 3)\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — إزالة عدم التعيين 0/0",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "التحليل والاختصار \\(\\dfrac{(x - 4)(x + 4)}{x - 4} = x + 4\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "قيمة النهاية عند \\(x \\to 4\\) تساوي \\(8\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — المشتقة ومعادلة المماس",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(g'(x) = 3x^2 + 8 \\implies g'(3) = 35\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "معادلة المماس: \\(y - 51 = 35(x - 3)\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Continuity, Derivatives & Concavity Criteria (Limits & Derivatives)",
    "ti_ar": "مطابقة: شروط الاتصال والاشتقاق والتقعر (النهايات والمشتقات)",
    "p": [
      {
        "l": "Continuity of \\(f\\) at \\(x = a\\)",
        "r": "\\(\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)\\)"
      },
      {
        "l": "Chain Rule \\(\\frac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x)) \\cdot g'(x)\\)"
      },
      {
        "l": "Strict local minimum test",
        "r": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)"
      },
      {
        "l": "Newton–Raphson step",
        "r": "\\(x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "شرط اتصال \\(f\\) عند \\(x = a\\)",
        "r": "\\(\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = f(a)\\)"
      },
      {
        "l": "قاعدة السلسلة \\(\\frac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x)) \\cdot g'(x)\\)"
      },
      {
        "l": "اختبار النهاية الصغرى المحلية",
        "r": "\\(f'(c) = 0\\) و\\(f''(c) > 0\\)"
      },
      {
        "l": "تكرار نيوتن–رافسون العددي",
        "r": "\\(x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}\\)"
      }
    ]
  }
];
D["tah-calc2"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Area Under a Curve",
    "ti_ar": "مثال محلول: المساحة تحت المنحنى",
    "steps": [
      "Find the area under \\(y=4-x^2\\) from \\(x=-2\\) to \\(x=2\\). Find the antiderivative: \\(F(x)=4x-\\tfrac{x^3}{3}\\).",
      "Evaluate: \\(F(2)=8-\\tfrac83=\\tfrac{16}{3}\\). \\(F(-2)=-8+\\tfrac83=-\\tfrac{16}{3}\\).",
      "Area \\(=F(2)-F(-2)=\\tfrac{16}{3}-\\left(-\\tfrac{16}{3}\\right)=\\tfrac{32}{3}\\approx10.67\\)."
    ],
    "steps_ar": [
      "أوجد المساحة تحت المنحنى \\(y=4-x^2\\) من \\(x=-2\\) إلى \\(x=2\\). أوجد الدالة الأصلية: \\(F(x)=4x-\\tfrac{x^3}{3}\\).",
      "احسب: \\(F(2)=8-\\tfrac83=\\tfrac{16}{3}\\). \\(F(-2)=-8+\\tfrac83=-\\tfrac{16}{3}\\).",
      "المساحة \\(=F(2)-F(-2)=\\tfrac{16}{3}-\\left(-\\tfrac{16}{3}\\right)=\\tfrac{32}{3}\\approx10.67\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Definite Integral",
    "ti_ar": "فحص سريع: التكامل المحدد",
    "q": "Evaluate \\(\\displaystyle\\int_0^1 4x^3\\,dx\\).",
    "q_ar": "أوجد قيمة \\(\\displaystyle\\int_0^1 4x^3\\,dx\\).",
    "o": [
      "1",
      "4",
      "1/4",
      "0"
    ],
    "o_ar": [
      "1",
      "4",
      "1/4",
      "0"
    ],
    "a": 0,
    "ex": "\\(\\int4x^3\\,dx=x^4+C\\). \\([x^4]_0^1=1-0=1\\).",
    "ex_ar": "\\(\\int4x^3\\,dx=x^4+C\\). \\([x^4]_0^1=1-0=1\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives",
    "ti_ar": "مطابقة: التكاملات غير المحددة الأساسية",
    "p": [
      {
        "l": "\\(\\int x^n \\, dx\\) (\\(n \\neq -1\\))",
        "r": "x^{n+1}/(n+1) + C"
      },
      {
        "l": "\\(\\int \\frac{1}{x} \\, dx\\)",
        "r": "ln|x| + C"
      },
      {
        "l": "\\(\\int \\cos x \\, dx\\)",
        "r": "sin x + C"
      },
      {
        "l": "\\(\\int e^x \\, dx\\)",
        "r": "e^x + C"
      }
    ],
    "p_ar": [
      {
        "l": "\\(\\int x^n \\, dx\\) (\\(n \\neq -1\\))",
        "r": "x^{n+1}/(n+1) + C"
      },
      {
        "l": "\\(\\int \\frac{1}{x} \\, dx\\)",
        "r": "ln|x| + C"
      },
      {
        "l": "\\(\\int \\cos x \\, dx\\)",
        "r": "sin x + C"
      },
      {
        "l": "\\(\\int e^x \\, dx\\)",
        "r": "e^x + C"
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral \\(\\int_1^3 (2x+1)\\,dx\\)",
    "ti_ar": "باني الخطوات: التكامل المحدد \\(\\int_1^3 (2x+1)\\,dx\\)",
    "steps": [
      {
        "l": "Antiderivative \\(F(x) = x^2 + x\\). Upper bound \\(F(3) = 3^2 + 3 =\\)",
        "a": "12",
        "h": "Evaluate the expression \\(9 + 3\\)."
      },
      {
        "l": "Lower bound \\(F(1) = 1^2 + 1 =\\)",
        "a": "2",
        "h": "Evaluate the expression \\(1 + 1\\)."
      },
      {
        "l": "Integral value \\(F(3) - F(1) = 12 - 2 =\\)",
        "a": "10",
        "h": "Perform the calculation in \\(12 - 2\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "الدالة الأصلية \\(F(x) = x^2 + x\\). عند الحد العلوي \\(F(3) = 3^2 + 3 =\\)",
        "a": "12",
        "h": "احسب قيمة المقدار \\(9 + 3\\)."
      },
      {
        "l": "عند الحد السفلي \\(F(1) = 1^2 + 1 =\\)",
        "a": "2",
        "h": "احسب قيمة المقدار \\(1 + 1\\)."
      },
      {
        "l": "قيمة التكامل \\(F(3) - F(1) = 12 - 2 =\\)",
        "a": "10",
        "h": "أجرِ العملية الحسابية في المقدار \\(12 - 2\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Evaluate Definite Integral",
    "ti_ar": "حساب قيمة تكامل محدد",
    "q": "Evaluate the definite integral \\(\\int_1^3 4x\\,dx\\):",
    "q_ar": "احسب قيمة التكامل المحدد \\(\\int_1^3 4x\\,dx\\):",
    "a": 16,
    "tol": 0.001,
    "h": "Antiderivative = 2x². [2(3²) - 2(1²)] = 18 - 2 = 16.",
    "h_ar": "الدالة الأصلية = 2x². [2(3²) - 2(1²)] = 18 - 2 = 16.",
    "sol": "18 - 2 = 16.",
    "sol_ar": "18 - 2 = 16."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Computing Area Under Curve",
    "ti_ar": "رتّب الخطوات: حساب المساحة تحت المنحنى",
    "q": "Order the steps to find the area under \\(f(x) = 2x\\) from \\(x = 0\\) to \\(x = 4\\):",
    "q_ar": "رتّب الخطوات لإيجاد المساحة تحت منحنى \\(f(x) = 2x\\) من \\(x = 0\\) إلى \\(x = 4\\):",
    "items": [
      "Set up the definite integral: Area = ∫₀⁴ 2x dx",
      "Find the antiderivative using power rule: F(x) = x²",
      "Apply the Fundamental Theorem of Calculus: [x²]₀⁴ = F(4) - F(0)",
      "Compute upper limit value: 4² = 16",
      "Subtract lower limit value: 16 - 0 = 16 square units"
    ],
    "items_ar": [
      "كتابة التكامل المحدد للمساحة: المساحة = ∫₀⁴ 2x dx",
      "إيجاد الدالة الأصلية بقاعدة القوى: F(x) = x²",
      "تطبيق النظرية الأساسية للتفاضل والتكامل: [x²]₀⁴ = F(4) - F(0)",
      "حساب قيمة الحد العلوي: 4² = 16",
      "طرح قيمة الحد السفلي: 16 - 0 = 16 وحدة مربعة"
    ],
    "sol": "Definite integration determines exact geometric areas.",
    "sol_ar": "التكامل المحدد يحسب المساحة الهندسية بدقة تامة."
  },
  {
    "t": "cat",
    "ti": "Classify Integrals by Form",
    "ti_ar": "تصنيف التكاملات",
    "categories": [
      "Power Rule ∫ xⁿ dx",
      "Trigonometric Integral",
      "Exponential / Logarithmic Form"
    ],
    "categories_ar": [
      "قاعدة القوى ∫ xⁿ dx",
      "تكامل دالة مثلثية",
      "دالة أسية أو لوغاريتمية"
    ],
    "items": [
      {
        "s": "∫ 5x⁴ dx",
        "cat": 0
      },
      {
        "s": "∫ cos(x) dx",
        "cat": 1
      },
      {
        "s": "∫ eˣ dx",
        "cat": 2
      },
      {
        "s": "∫ (1/x) dx",
        "cat": 2
      },
      {
        "s": "∫ sec²(x) dx",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "∫ 5x⁴ dx",
        "cat": 0
      },
      {
        "s": "∫ cos(x) dx",
        "cat": 1
      },
      {
        "s": "∫ eˣ dx",
        "cat": 2
      },
      {
        "s": "∫ (1/x) dx",
        "cat": 2
      },
      {
        "s": "∫ sec²(x) dx",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable ODE Constant & u-Substitution Bounds (Integration & Applications)",
    "ti_ar": "اكتشف الخطأ: ثابت التكامل في المعادلات التفاضلية (التكامل وتطبيقاته)",
    "q": "A student solves \\(\\dfrac{dy}{dx} = 2xy\\) with initial condition \\(y(0) = 5\\). Which step mishandles the constant of integration?",
    "q_ar": "يحل طالب المعادلة التفاضلية \\(\\dfrac{dy}{dx} = 2xy\\) بالشرط الابتدائي \\(y(0) = 5\\). أي خطوة تخطئ في التعامل مع ثابت التكامل؟",
    "steps": [
      "Separate variables for \\(y > 0\\): \\(\\int \\frac{1}{y}\\,dy = \\int 2x\\,dx\\).",
      "Integrate without \\(+C\\), then tack \\(+C\\) onto the end after exponentiating: \\(y = e^{x^2} + C\\).",
      "Apply \\(y(0) = 5\\) to write \\(y = e^{x^2} + 4\\)."
    ],
    "steps_ar": [
      "فصل المتغيرات لقيم \\(y > 0\\): \\(\\int \\frac{1}{y}\\,dy = \\int 2x\\,dx\\).",
      "التكامل دون \\(+C\\) ثم إضافة \\(+C\\) جمعاً بعد أخذ الدالة الأسية: \\(y = e^{x^2} + C\\).",
      "التعويض بالشرط \\(y(0) = 5\\) لكتابة \\(y = e^{x^2} + 4\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "Add \\(+C\\) immediately upon integrating: \\(\\ln y = x^2 + C \\implies y = e^{x^2 + C} = A e^{x^2}\\), so \\(y(0) = 5\\) gives multiplicative \\(y = 5 e^{x^2}\\).",
      "Variables cannot be separated in \\(dy/dx = 2xy\\).",
      "\\(\\int 2x\\,dx\\) equals \\(2\\)."
    ],
    "reasons_ar": [
      "يُضاف \\(+C\\) فور التكامل: \\(\\ln y = x^2 + C \\implies y = A e^{x^2}\\)، وبالتعويض عن \\(y(0) = 5\\) نجد \\(y = 5 e^{x^2}\\).",
      "لا يمكن فصل المتغيرات في هذه المعادلة.",
      "تكامل \\(2x\\) يساوي \\(2\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integral via FTC & Initial-Value ODE (Integration & Applications)",
    "ti_ar": "وضع المصحح: التكامل المحدود ومسألة القيمة الابتدائية (التكامل وتطبيقاته)",
    "q": "(a) Evaluate \\(\\int_0^{2} (3x^2 + 8x)\\,dx\\) exactly. (b) Solve \\(\\dfrac{dy}{dx} = 2xy\\) given \\(y(0) = 5\\).",
    "q_ar": "(أ) احسب التكامل المحدود \\(\\int_0^{2} (3x^2 + 8x)\\,dx\\). (ب) حل المعادلة التفاضلية \\(\\dfrac{dy}{dx} = 2xy\\) علماً بأن \\(y(0) = 5\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative & FTC Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Antiderivative: \\([x^3 + 4x^2]_0^{2}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Evaluate bounds: \\(8 + 16 - 0 = 24\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Separable Particular Solution",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\int \\frac{1}{y}\\,dy = \\int 2x\\,dx \\implies \\ln|y| = x^2 + C\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(y = A e^{x^2}\\); applying \\(y(0) = 5\\) yields \\(y = 5 e^{x^2}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — المشتقة العكسية والنظرية الأساسية للتفاضل والتكامل",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "المشتقة العكسية: \\([x^3 + 4x^2]_0^{2}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "التعويض بالحدين: \\(24\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — الحل الخاص للمعادلة القابلة للفصل",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\ln|y| = x^2 + C\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(y = 5 e^{x^2}\\)."
          }
        ]
      }
    ]
  }
];
D["tah-explog"] = [
  {
    "t": "fn",
    "ti": "Explorer: Exponential Growth \\(y=b^x\\)",
    "ti_ar": "مستكشف: النمو الأسي \\(y=b^x\\)",
    "fns": [
      {
        "expr": "b^x",
        "color": "#1E3A6E"
      }
    ],
    "xrange": [
      -3,
      4
    ],
    "yrange": [
      -1,
      10
    ],
    "params": [
      {
        "name": "b",
        "label": "Base b",
        "min": 1.5,
        "max": 3,
        "step": 0.5,
        "default": 2
      }
    ]
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solving an Exponential Equation",
    "ti_ar": "مثال محلول: حل معادلة أسية",
    "steps": [
      "Solve \\(3^{2x-1}=27\\). Write 27 as a power of 3.",
      "\\(27=3^3\\), so \\(2x-1=3\\).",
      "\\(2x=4\\), so \\(x=2\\)."
    ],
    "steps_ar": [
      "حل \\(3^{2x-1}=27\\). اكتب 27 كقوة للعدد 3.",
      "\\(27=3^3\\)، إذن \\(2x-1=3\\).",
      "\\(2x=4\\)، إذن \\(x=2\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Logarithm Rules",
    "ti_ar": "فحص سريع: قواعد اللوغاريتمات",
    "q": "Simplify \\(\\log(x^2)-\\log(x)\\).",
    "q_ar": "بسّط \\(\\log(x^2)-\\log(x)\\).",
    "o": [
      "log x",
      "log x²",
      "2 log x",
      "x"
    ],
    "o_ar": [
      "log x",
      "log x²",
      "2 log x",
      "x"
    ],
    "a": 0,
    "ex": "\\(\\log(x^2)-\\log(x)=\\log\\!\\left(\\dfrac{x^2}{x}\\right)=\\log x\\).",
    "ex_ar": "\\(\\log(x^2)-\\log(x)=\\log\\!\\left(\\dfrac{x^2}{x}\\right)=\\log x\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Logarithmic Laws & Identities",
    "ti_ar": "مطابقة: قوانين وخصائص اللوغاريتمات",
    "p": [
      {
        "l": "\\(\\log_b(xy)\\)",
        "r": "\\(\\log_b x + \\log_b y\\)"
      },
      {
        "l": "\\(\\log_b(x/y)\\)",
        "r": "\\(\\log_b x - \\log_b y\\)"
      },
      {
        "l": "\\(\\log_b(x^k)\\)",
        "r": "\\(k \\log_b x\\)"
      },
      {
        "l": "\\(\\log_b(1)\\)",
        "r": "0"
      }
    ],
    "p_ar": [
      {
        "l": "\\(\\log_b(xy)\\)",
        "r": "\\(\\log_b x + \\log_b y\\)"
      },
      {
        "l": "\\(\\log_b(x/y)\\)",
        "r": "\\(\\log_b x - \\log_b y\\)"
      },
      {
        "l": "\\(\\log_b(x^k)\\)",
        "r": "\\(k \\log_b x\\)"
      },
      {
        "l": "\\(\\log_b(1)\\)",
        "r": "0"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Solve Logarithmic Equation",
    "ti_ar": "حل معادلة لوغاريتمية",
    "q": "Solve for \\(x\\) if \\(\\log_2(x) = 6\\):",
    "q_ar": "أوجد قيمة \\(x\\) إذا كان \\(\\log_2(x) = 6\\):",
    "a": 64,
    "tol": 0.001,
    "h": "x = 2^6 = 64.",
    "h_ar": "x = 2^6 = 64.",
    "sol": "2^6 = 64.",
    "sol_ar": "2^6 = 64."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving Exponential Equations",
    "ti_ar": "رتّب الخطوات: حل المعادلة الأسية",
    "q": "Order the steps to solve \\(2^{3x - 1} = 32\\):",
    "q_ar": "رتّب الخطوات لحل المعادلة \\(2^{3x - 1} = 32\\):",
    "items": [
      "Express 32 as a power of 2: 32 = 2⁵",
      "Rewrite equation with matching bases: 2^(3x - 1) = 2⁵",
      "Equate the exponents since bases are identical: 3x - 1 = 5",
      "Add 1 to both sides: 3x = 6",
      "Divide by 3 to isolate x: x = 2"
    ],
    "items_ar": [
      "تحليل العدد 32 إلى قوى الأساس 2: 32 = 2⁵",
      "إعادة كتابة المعادلة بأساسات متساوية: 2^(3x - 1) = 2⁵",
      "مساواة الأسس نظراً لتساوي الأساسات: 3x - 1 = 5",
      "إضافة 1 للطرفين: 3x = 6",
      "القسمة على 3 لعزل x: x = 2"
    ],
    "sol": "Matching exponential bases simplifies equations to linear form.",
    "sol_ar": "توحيد الأساسات يحول المعادلة الأسية إلى معادلة خطية بسيطة."
  },
  {
    "t": "cat",
    "ti": "Classify Logarithmic Law Applications",
    "ti_ar": "تصنيف قوانين اللوغاريتمات",
    "categories": [
      "Product Property / قانون الضرب",
      "Quotient Property / قانون القسمة",
      "Power Property / قانون القوة"
    ],
    "categories_ar": [
      "قانون الضرب (log AB = log A + log B)",
      "قانون القسمة (log A/B = log A - log B)",
      "قانون القوة (log Aⁿ = n log A)"
    ],
    "items": [
      {
        "s": "log(6) + log(7) = log(42)",
        "cat": 0
      },
      {
        "s": "log(50) - log(5) = log(10)",
        "cat": 1
      },
      {
        "s": "log(x³) = 3 log(x)",
        "cat": 2
      },
      {
        "s": "log(2) + log(5) = log(10) = 1",
        "cat": 0
      },
      {
        "s": "log(100) - log(4) = log(25)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "log(6) + log(7) = log(42)",
        "cat": 0
      },
      {
        "s": "log(50) - log(5) = log(10)",
        "cat": 1
      },
      {
        "s": "log(x³) = 3 log(x)",
        "cat": 2
      },
      {
        "s": "log(2) + log(5) = log(10) = 1",
        "cat": 0
      },
      {
        "s": "log(100) - log(4) = log(25)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Logarithm Law Misapplication (Exponentials & Logarithms)",
    "ti_ar": "اكتشف الخطأ: التطبيق الخاطئ لقوانين اللوغاريتمات (الأسس واللوغاريتمات)",
    "q": "A student attempts to solve \\(\\log_{3}(x) + \\log_{3}(3) = 3\\). Which step introduces an invalid rule?",
    "q_ar": "يحاول طالب حل المعادلة \\(\\log_{3}(x) + \\log_{3}(3) = 3\\). أي خطوة تتضمن قانوناً خاطئاً؟",
    "steps": [
      "Note the domain requirement \\(x > 0\\).",
      "Combine the sum of logarithms as \\(\\log_{3}(x + 3) = 3\\) instead of multiplying arguments.",
      "Exponentiate base \\(3\\) to write \\(x + 3 = 27\\).",
      "Subtract \\(3\\) to report \\(x = 24\\)."
    ],
    "steps_ar": [
      "تحديد شرط مجال اللوغاريتم \\(x > 0\\).",
      "دمج مجموع اللوغاريتمين في صورة \\(\\log_{3}(x + 3) = 3\\) بدلاً من ضرب ما بداخل اللوغاريتم.",
      "التحويل للصورة الأسية: \\(x + 3 = 27\\).",
      "طرح \\(3\\) للوصول إلى الناتج."
    ],
    "errorStep": 2,
    "reasons": [
      "The product rule states \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\), NOT \\(\\log_b(M + N)\\); thus \\(\\log_{3}(3x) = 3 \\implies x = 9\\).",
      "The domain of \\(\\log(x)\\) is all real numbers.",
      "\\(\\log_{3}(3) = 0\\)."
    ],
    "reasons_ar": [
      "قاعدة الضرب تنص على أن \\(\\log_b(M) + \\log_b(N) = \\log_b(MN)\\) وليس جمع المداخل؛ ومنه \\(x = 9\\).",
      "مجال الدالة اللوغاريتمية هو جميع الأعداد الحقيقية.",
      "قيمة \\(\\log_{3}(3) = 0\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Logarithmic Equation & Continuous Growth (Exponentials & Logarithms)",
    "ti_ar": "وضع المصحح: المعادلات اللوغاريتمية والنمو الأسي (الأسس واللوغاريتمات)",
    "q": "(a) Solve \\(\\log_{3}(x - 1) = 2\\), stating the domain restriction. (b) A culture grows via \\(P(t) = P_0 e^{rt}\\); find the exact doubling time \\(T_d\\) in terms of \\(r\\).",
    "q_ar": "(أ) حل المعادلة \\(\\log_{3}(x - 1) = 2\\) مع ذكر شرط المجال. (ب) تنمو عينة وفق \\(P(t) = P_0 e^{rt}\\)؛ أوجد زمن التضاعف \\(T_d\\) بدلالة \\(r\\).",
    "parts": [
      {
        "label": "Part (a) — Domain & Exponential Conversion",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Domain \\(x > 1\\); convert to \\(x - 1 = 3^{2} = 9\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 10\\) (valid since \\(10 > 1\\))."
          }
        ]
      },
      {
        "label": "Part (b) — Exact Doubling Time",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(2P_0 = P_0 e^{r T_d} \\implies e^{r T_d} = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Take natural logs: \\(T_d = \\dfrac{\\ln 2}{r}\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — شرط المجال والتحويل للصورة الأسية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "المجال \\(x > 1\\)؛ والتحويل يعطي \\(x - 1 = 3^{2} = 9\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(x = 10\\) (يحقق شرط المجال)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — زمن التضاعف الدقيق",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "وضع \\(2P_0 = P_0 e^{r T_d} \\implies e^{r T_d} = 2\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "بأخذ اللوغاريتم الطبيعي: \\(T_d = \\dfrac{\\ln 2}{r}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Solving Logarithmic Equations (Exponentials & Logarithms)",
    "ti_ar": "بناء الخطوات: حل المعادلة اللوغاريتمية (الأسس واللوغاريتمات)",
    "steps": [
      {
        "l": "Evaluate \\(3^{2} =\\)",
        "a": "9",
        "h": "Multiply 3 by itself 2 times."
      },
      {
        "l": "Solve \\(\\log_{3}(x - 1) = 2\\) for \\(x =\\)",
        "a": "10",
        "h": "Add 1 to 9."
      },
      {
        "l": "Evaluate \\(\\log_{3}(1) =\\)",
        "a": "0",
        "h": "Any base raised to 0 equals 1."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(3^{2} =\\)",
        "a": "9",
        "h": "اضرب 3 في نفسه 2 مرات."
      },
      {
        "l": "حل المعادلة \\(\\log_{3}(x - 1) = 2\\) لإيجاد \\(x =\\)",
        "a": "10",
        "h": "اجمع 1 مع 9."
      },
      {
        "l": "احسب قيمة \\(\\log_{3}(1) =\\)",
        "a": "0",
        "h": "أي أساس مرفوع للأس صفر يساوي 1."
      }
    ]
  }
];
D["tah-stats"] = [
  {
    "t": "sr",
    "ti": "Worked Example: Independent Events",
    "ti_ar": "مثال محلول: الأحداث المستقلة",
    "steps": [
      "A fair die is rolled and a coin is tossed. Find \\(P(\\text{rolling a 5 AND heads})\\). Since the events are independent, multiply their probabilities.",
      "\\(P(5)=\\tfrac16\\). \\(P(\\text{heads})=\\tfrac12\\).",
      "\\(P(5\\text{ and heads})=\\tfrac16\\times\\tfrac12=\\tfrac{1}{12}\\)."
    ],
    "steps_ar": [
      "يُرمى نرد عادل وتُقذف عملة. أوجد \\(P(\\text{rolling a 5 AND heads})\\)، احتمال ظهور الرقم 5 والصورة معًا. بما أن الحدثين مستقلان، اضرب احتماليهما.",
      "\\(P(5)=\\tfrac16\\). \\(P(\\text{heads})=\\tfrac12\\).",
      "\\(P(5\\text{ and heads})=\\tfrac16\\times\\tfrac12=\\tfrac{1}{12}\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Mean",
    "ti_ar": "فحص سريع: المتوسط الحسابي",
    "q": "Find the mean of \\(6,\\,9,\\,11,\\,14\\).",
    "q_ar": "أوجد المتوسط الحسابي للأعداد \\(6,\\,9,\\,11,\\,14\\).",
    "o": [
      "10",
      "9.5",
      "11",
      "8.5"
    ],
    "o_ar": [
      "10",
      "9.5",
      "11",
      "8.5"
    ],
    "a": 0,
    "ex": "\\((6+9+11+14)/4=40/4=10\\).",
    "ex_ar": "\\((6+9+11+14)/4=40/4=10\\)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Permutations \\(_5P_2\\) vs Combinations \\(_5C_2\\)",
    "ti_ar": "باني الخطوات: التباديل \\(_5P_2\\) والتوافيق \\(_5C_2\\)",
    "steps": [
      {
        "l": "Permutations (order matters): \\(_5P_2 = 5 \\times 4 =\\)",
        "a": "20",
        "h": "Perform the calculation in \\(5 \\times 4\\) to find the result."
      },
      {
        "l": "Combinations (order does not matter): \\(_5C_2 = \\frac{20}{2!} =\\)",
        "a": "10",
        "h": "Perform the calculation in \\(\\frac{20}{2!}\\) to find the result."
      }
    ],
    "steps_ar": [
      {
        "l": "التباديل (الترتيب مهم): \\(_5P_2 = 5 \\times 4 =\\)",
        "a": "20",
        "h": "أجرِ العملية الحسابية في المقدار \\(5 \\times 4\\) للوصول إلى النتيجة."
      },
      {
        "l": "التوافيق (الترتيب غير مهم): \\(_5C_2 = \\frac{20}{2!} =\\)",
        "a": "10",
        "h": "أجرِ العملية الحسابية في المقدار \\(\\frac{20}{2!}\\) للوصول إلى النتيجة."
      }
    ]
  },
  {
    "t": "tf",
    "ti": "True or False: Probability & Normal Distribution",
    "ti_ar": "صحيح أم خطأ: الاحتمالات والتوزيع الطبيعي",
    "items": [
      {
        "s": "In a normal distribution, approximately 68% of data falls within 1 standard deviation of the mean.",
        "a": true,
        "ex": "The empirical 68-95-99.7 rule states that ~68% falls within μ ± σ."
      },
      {
        "s": "For mutually exclusive events A and B, \\(P(A \\cap B) = 0\\).",
        "a": true,
        "ex": "Mutually exclusive events cannot occur simultaneously."
      },
      {
        "s": "The sum of probabilities of all possible mutually exclusive outcomes of an experiment equals 1.",
        "a": true,
        "ex": "Total probability of sample space is always 1."
      },
      {
        "s": "If a fair coin is tossed 3 times, the sample space contains 6 outcomes.",
        "a": false,
        "ex": "By the fundamental counting principle, 2 × 2 × 2 = 8 outcomes."
      }
    ],
    "items_ar": [
      {
        "s": "في التوزيع الطبيعي، يقع حوالي 68% من البيانات ضمن انحراف معياري واحد عن المتوسط.",
        "a": true,
        "ex": "تنص القاعدة التجريبية (68-95-99.7) على وقوع نحو 68% ضمن μ ± σ."
      },
      {
        "s": "للحدثين المتنافيين A وB، يكون \\(P(A \\cap B) = 0\\).",
        "a": true,
        "ex": "الحدثان المتنافيان لا يمكن أن يقعا معًا في نفس الوقت."
      },
      {
        "s": "مجموع احتمالات جميع النواتج الممكنة والمتنافية لتجربة ما يساوي 1.",
        "a": true,
        "ex": "مجموع احتمالات فضاء العينة دائمًا يساوي 1."
      },
      {
        "s": "إذا أُلقيت قطعة نقد متماثلة 3 مرات، فإن فضاء العينة يحتوي على 6 نواتج.",
        "a": false,
        "ex": "وفق مبدأ العد الأساسي، عدد النواتج = 2 × 2 × 2 = 8 نواتج."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculate Permutations",
    "ti_ar": "حساب التباديل",
    "q": "Calculate the number of permutations \\(P(5, 2)\\):",
    "q_ar": "احسب عدد التباديل \\(P(5, 2)\\):",
    "a": 20,
    "tol": 0.001,
    "h": "P(5, 2) = 5 × 4 = 20.",
    "h_ar": "P(5, 2) = 5 × 4 = 20.",
    "sol": "5 × 4 = 20.",
    "sol_ar": "5 × 4 = 20."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Computing Empirical Rule Percentages",
    "ti_ar": "رتّب الخطوات: تطبيق القاعدة التجريبية للتوزيع الطبيعي",
    "q": "Order the steps to find percentage between \\(\\mu - \\sigma\\) and \\(\\mu + 2\\sigma\\):",
    "q_ar": "رتّب الخطوات لحساب النسبة المئوية بين \\(\\mu - \\sigma\\) و \\(\\mu + 2\\sigma\\):",
    "items": [
      "Recall standard normal curve segment percentages (34%, 13.5%, 2.35%, 0.15%)",
      "Identify segment from μ - σ to μ: 34%",
      "Identify segment from μ to μ + σ: 34%",
      "Identify segment from μ + σ to μ + 2σ: 13.5%",
      "Sum all relevant segments: 34% + 34% + 13.5% = 81.5%"
    ],
    "items_ar": [
      "تذكر نسب أجزاء التوزيع الطبيعي المعياري (34%، 13.5%، 2.35%، 0.15%)",
      "تحديد نسبة الجزء من μ - σ إلى المتوسط μ: 34%",
      "تحديد نسبة الجزء من المتوسط μ إلى μ + σ: 34%",
      "تحديد نسبة الجزء من μ + σ إلى μ + 2σ: 13.5%",
      "جمع النسب الواقعة في الفترة المطلوبة: 34% + 34% + 13.5% = 81.5%"
    ],
    "sol": "Summing normal curve empirical segments gives exact bounded percentages.",
    "sol_ar": "جمع المساحات تحت المنحنى الطبيعي يعطي النسبة الدقيقة المطلوبة."
  },
  {
    "t": "cat",
    "ti": "Classify Counting Problems (Permutations vs Combinations)",
    "ti_ar": "تصنيف مسائل العد (تباديل أم توافيق)",
    "categories": [
      "Permutations (Order Matters / الترتيب مهم)",
      "Combinations (Order Does NOT Matter / الترتيب غير مهم)"
    ],
    "categories_ar": [
      "تباديل (الترتيب مهم)",
      "توافيق (الترتيب غير مهم)"
    ],
    "items": [
      {
        "s": "Choosing 1st, 2nd, and 3rd place winners in a race",
        "cat": 0
      },
      {
        "s": "Selecting a delegation of 4 students from 20 students",
        "cat": 1
      },
      {
        "s": "Creating a 4-digit security PIN code",
        "cat": 0
      },
      {
        "s": "Choosing 3 books to borrow from a library shelf",
        "cat": 1
      },
      {
        "s": "Assigning President, Vice President, and Secretary",
        "cat": 0
      }
    ],
    "items_ar": [
      {
        "s": "تحديد الفائزين بالمركز الأول والثاني والثالث في سباق",
        "cat": 0
      },
      {
        "s": "اختيار وفد مكون من 4 طلاب من بين 20 طالباً",
        "cat": 1
      },
      {
        "s": "تكوين رقم سري مكون من 4 خانات",
        "cat": 0
      },
      {
        "s": "اختيار 3 كتب لقراءتها من رف مكتبة",
        "cat": 1
      },
      {
        "s": "اختيار رئيس ونائب رئيس وأمين سر",
        "cat": 0
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Variance of Difference of Independent Variables (Statistics & Probability)",
    "ti_ar": "اكتشف الخطأ: تباين الفرق بين متغيرين عشوائيين مستقلين (الإحصاء والاحتمالات)",
    "q": "Independent random variables \\(X\\) and \\(Y\\) have \\(\\operatorname{Var}(X) = 4\\) and \\(\\operatorname{Var}(Y) = 4\\). A student computes \\(\\operatorname{Var}(X - Y)\\). Which step is invalid?",
    "q_ar": "متغيران عشوائيان مستقلان \\(X\\) و\\(Y\\) تبايناهما \\(\\operatorname{Var}(X) = 4\\) و\\(\\operatorname{Var}(Y) = 4\\). يحسب طالب \\(\\operatorname{Var}(X - Y)\\). أي خطوة خاطئة؟",
    "steps": [
      "Verify that \\(X\\) and \\(Y\\) are statistically independent (\\(\\operatorname{Cov}(X,Y) = 0\\)).",
      "Subtract the variances directly: \\(\\operatorname{Var}(X - Y) = 4 - 4 = 0\\).",
      "Take square root for standard deviation."
    ],
    "steps_ar": [
      "التحقق من استقلال \\(X\\) و\\(Y\\) إحصائياً.",
      "طرح التباينين مباشرة: \\(\\operatorname{Var}(X - Y) = 4 - 4 = 0\\).",
      "أخذ الجذر التربيعي لإيجاد الانحراف المعياري."
    ],
    "errorStep": 2,
    "reasons": [
      "Because coefficients square in variance, \\(\\operatorname{Var}(X - Y) = 1^2\\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 4 + 4 = 8\\) — independent variances ALWAYS add.",
      "\\(\\operatorname{Var}(X - Y)\\) equals \\(\\operatorname{Var}(X) \\cdot \\operatorname{Var}(Y)\\).",
      "Expected values cannot be subtracted."
    ],
    "reasons_ar": [
      "لأن المعاملات تُربَّع في التباين: \\(\\operatorname{Var}(X - Y) = \\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 8\\) — التباينات المستقلة تُجمع دائماً.",
      "التباين يساوي حاصل ضرب التباينين.",
      "لا يجوز طرح التوقعات الرياضية."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Standard Error, Variance & Conditional Probability (Statistics & Probability)",
    "ti_ar": "وضع المصحح: الخطأ المعياري والتباين والاحتمال الشرطي (الإحصاء والاحتمالات)",
    "q": "(a) A population has standard deviation \\(\\sigma = 24\\). For a simple random sample of size \\(n = 36\\), find the standard error \\(\\sigma_{\\bar{x}}\\) and state what happens to \\(\\sigma_{\\bar{x}}\\) if \\(n\\) quadruples. (b) Independent \\(X, Y\\) have \\(\\operatorname{Var}(X) = 4,\\; \\operatorname{Var}(Y) = 4\\); compute \\(\\operatorname{Var}(2X - Y)\\).",
    "q_ar": "(أ) مجتمع انحرافه المعياري \\(\\sigma = 24\\). لعينة عشوائية حجمها \\(n = 36\\)، احسب الخطأ المعياري \\(\\sigma_{\\bar{x}}\\) واذكر ماذا يحدث له عند مضاعفة \\(n\\) أربع مرات. (ب) للمتغيرين المستقلين \\(X, Y\\) حيث \\(\\operatorname{Var}(X) = 4,\\; \\operatorname{Var}(Y) = 4\\)، احسب \\(\\operatorname{Var}(2X - Y)\\).",
    "parts": [
      {
        "label": "Part (a) — Sampling Distribution Standard Error",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{24}{\\sqrt{36}} = \\dfrac{24}{6} = 4\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "Quadrupling \\(n\\) divides \\(\\sigma_{\\bar{x}}\\) by \\(\\sqrt{4} = 2\\) (halves the standard error)."
          }
        ]
      },
      {
        "label": "Part (b) — Linear Combination Variance",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\operatorname{Var}(2X - Y) = 2^2 \\operatorname{Var}(X) + (-1)^2 \\operatorname{Var}(Y)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(4(4) + 4 = 20\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — الخطأ المعياري لتوزيع المعاينة",
        "marks": 2,
        "rubric": [
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\sigma_{\\bar{x}} = \\dfrac{24}{\\sqrt{36}} = 4\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "مضاعفة \\(n\\) أربع مرات تقسم الخطأ المعياري على \\(\\sqrt{4} = 2\\) (ينصفه)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — تباين التركيبة الخطية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\operatorname{Var}(2X - Y) = 4\\operatorname{Var}(X) + \\operatorname{Var}(Y)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "الناتج: \\(4(4) + 4 = 20\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Probability, Distributions & Inference Rules (Statistics & Probability)",
    "ti_ar": "مطابقة: قوانين الاحتمالات والتوزيعات والاستدلال (الإحصاء والاحتمالات)",
    "p": [
      {
        "l": "Conditional probability \\(P(A \\mid B)\\)",
        "r": "\\(\\dfrac{P(A \\cap B)}{P(B)}\\)"
      },
      {
        "l": "Binomial variance \\(X \\sim B(n, p)\\)",
        "r": "\\(np(1 - p)\\)"
      },
      {
        "l": "Standard \\(z\\)-score of observation \\(x\\)",
        "r": "\\(\\dfrac{x - \\mu}{\\sigma}\\)"
      },
      {
        "l": "Reject \\(H_0\\) at significance \\(\\alpha\\)",
        "r": "When \\(p\\text{-value} < \\alpha\\)"
      }
    ],
    "p_ar": [
      {
        "l": "الاحتمال الشرطي \\(P(A \\mid B)\\)",
        "r": "\\(\\dfrac{P(A \\cap B)}{P(B)}\\)"
      },
      {
        "l": "تباين التوزيع ذي الحدين \\(X \\sim B(n, p)\\)",
        "r": "\\(np(1 - p)\\)"
      },
      {
        "l": "الدرجة المعيارية \\(z\\) للمفردة \\(x\\)",
        "r": "\\(\\dfrac{x - \\mu}{\\sigma}\\)"
      },
      {
        "l": "رفض فرض العدم \\(H_0\\) عند مستوى \\(\\alpha\\)",
        "r": "عندما تكون \\(p\\text{-value} < \\alpha\\)"
      }
    ]
  }
];
});
