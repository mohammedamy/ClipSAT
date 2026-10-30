/* Interactive Practice data for /ibsl/ - one entry per chapter section id.
   Shipped as public/js/ix/ibsl.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["ibsl-overview"] = [
  {
    "t": "qc",
    "ti": "Quick Check: IB Math Analysis & Approaches SL Exams",
    "ti_ar": "فحص سريع: اختبارات رياضيات البكالوريا الدولية AA SL",
    "q": "How are the external written examinations structured for IB AA SL?",
    "q_ar": "كيف يُهيكل التقييم الكتابي الخارجي لمادة IB Math AA SL؟",
    "o": [
      "Paper 1 (non-calc, 90 min, 80 marks) and Paper 2 (calc, 90 min, 80 marks)",
      "Paper 1 only (calculator, 3 hr, 100 marks)",
      "Paper 1 (multiple choice, 60 min) and Paper 2 (free response, 120 min)",
      "Paper 1, Paper 2, and Paper 3 (60 min each)"
    ],
    "o_ar": [
      "الورقة 1 (بدون حاسبة، 90 دقيقة، 80 درجة) والورقة 2 (بالحاسبة، 90 دقيقة، 80 درجة)",
      "الورقة 1 فقط (بالحاسبة، 3 ساعات، 100 درجة)",
      "الورقة 1 (اختيار من متعدد، 60 دقيقة) والورقة 2 (إجابة حرة، 120 دقيقة)",
      "الورقة 1، والورقة 2، والورقة 3 (60 دقيقة لكل منها)"
    ],
    "a": 0,
    "ex": "IB AA SL external assessment consists of Paper 1 (no calculator, 90 minutes, 80 marks) and Paper 2 (graphic display calculator required, 90 minutes, 80 marks), plus the IA exploration (20%).",
    "ex_ar": "يتكون التقييم الخارجي لـ IB AA SL من الورقة 1 (بدون آلة حاسبة، 90 دقيقة، 80 درجة) والورقة 2 (تتطلب آلة حاسبة بيانية، 90 دقيقة، 80 درجة)، بالإضافة إلى مشروع الاستكشاف الفردي IA بنسبة 20%."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: IB Mathematics SL Assessment Rules",
    "ti_ar": "مختبر التفكير المنطقي: قواعد تقييم رياضيات IB SL",
    "items": [
      {
        "s": "A graphic display calculator is permitted on Paper 1 of the IB SL exam.",
        "s_ar": "يُسمح باستخدام الآلة الحاسبة البيانية في الورقة 1 من اختبار IB SL.",
        "a": false,
        "ex": "Paper 1 strictly forbids any calculator.",
        "ex_ar": "الورقة 1 تمنع استخدام أي نوع من الآلات الحاسبة منعاً باتاً."
      },
      {
        "s": "Non-exact numerical answers must be given to 3 significant figures unless specified otherwise.",
        "s_ar": "يجب كتابة الإجابات العددية غير الدقيقة مقربة إلى 3 أرقام معنوية ما لم يُنص على خلاف ذلك.",
        "a": true,
        "ex": "The standard IB accuracy rule is 3 s.f.",
        "ex_ar": "القاعدة القياسية لدقة الإجابات في IB هي 3 أرقام معنوية (3 s.f.)."
      },
      {
        "s": "The internal assessment exploration accounts for 20% of the final subject grade.",
        "s_ar": "يمثل استكشاف التقييم الداخلي (IA) نسبة 20% من الدرجة النهائية للمادة.",
        "a": true,
        "ex": "The individual IA mathematical exploration contributes 20%.",
        "ex_ar": "يسهم الاستكشاف الرياضي الفردي (IA) بنسبة 20% في الدرجة النهائية."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Scoring Lab: IB SL Final Percentage Score",
    "ti_ar": "مختبر الدرجات: النسبة المئوية النهائية في IB SL",
    "q": "A student earns 64/80 on Paper 1 (40% weight), 72/80 on Paper 2 (40% weight), and 16/20 on the IA (20% weight). What is the student's final overall percentage?",
    "q_ar": "حصل طالب على 64/80 في الورقة 1 (وزنها 40%)، و 72/80 في الورقة 2 (وزنها 40%)، و 16/20 في التقييم الداخلي IA (وزنه 20%). ما هي النسبة المئوية الإجمالية النهائية للطالب؟",
    "a": 84,
    "tol": 0.1,
    "unit": "%",
    "h": "Calculate individual component percentages: 64/80 = 80%, 72/80 = 90%, 16/20 = 80%, then apply weights 0.40, 0.40, 0.20.",
    "h_ar": "احسب نسبة كل مكوّن: 64/80 = 80%، 72/80 = 90%، 16/20 = 80%، ثم طبق الأوزان 0.40 و 0.40 و 0.20.",
    "sol": "\\(0.40(80) + 0.40(90) + 0.20(80) = 32 + 36 + 16 = 84\\%\\).",
    "sol_ar": "\\(0.40(80) + 0.40(90) + 0.20(80) = 32 + 36 + 16 = 84\\%\\)."
  },
  {
    "t": "ord",
    "ti": "Strategy Protocol: Exam Day Strategy for Paper 1",
    "ti_ar": "بروتوكول الاستراتيجية: خطة يوم الامتحان للورقة 1",
    "q": "Order the strategic steps for completing an 80-mark, 90-minute Paper 1 exam:",
    "q_ar": "رتب الخطوات الاستراتيجية لإنجاز اختبار الورقة 1 (80 درجة في 90 دقيقة):",
    "items": [
      "Use the 5-minute reading time to preview Section A short questions and identify familiar topics.",
      "Tackle Section A questions in order, writing exact expressions with simplified surds and fractions.",
      "Reach Section B extended-response questions by the 45-minute mark.",
      "Follow \"Hence\" directives strictly in multi-part questions to reuse earlier results.",
      "Spend the final 5 minutes checking for missed units, 3 s.f. compliance, and sign errors."
    ],
    "items_ar": [
      "استغلال فترة القراءة (5 دقائق) لمعاينة أسئلة القسم A القصيرة وتحديد المسائل المألوفة.",
      "حل أسئلة القسم A بترتيبها، مع كتابة القيم الدقيقة بالجذور والكسور المبسطة.",
      "الانتقال إلى أسئلة القسم B المقالية المطولة عند الدقيقة 45 من زمن الامتحان.",
      "الالتزام الصارم بكلمة \"Hence\" (ومن ثم) في الأسئلة متعددة الأجزاء لإعادة استخدام النتائج السابقة.",
      "تخصيص آخر 5 دقائق للتدقيق في الوحدات والتقريب لـ 3 أرقام معنوية وإشارات الأعداد."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Syllabus Topics by Course Stream",
    "ti_ar": "تصنيف موضوعات المنهج حسب مسار المادة",
    "categories": [
      "Analysis & Approaches SL (AA)",
      "Applications & Interpretation SL (AI)"
    ],
    "categories_ar": [
      "التحليل والطرائق (AA SL)",
      "التطبيقات والتأويل (AI SL)"
    ],
    "items": [
      {
        "s": "Binomial theorem algebraic expansions \\((a+b)^n\\)",
        "s_ar": "مفكوك ذات الحدين الجبري \\((a+b)^n\\)",
        "cat": 0
      },
      {
        "s": "Voronoi diagrams and nearest-site analysis",
        "s_ar": "مخططات فورونوي وتحليل الموقع الأقرب",
        "cat": 1
      },
      {
        "s": "Kinematics integration with initial conditions",
        "s_ar": "تكامل الحركة والحركيات مع الشروط الابتدائية",
        "cat": 0
      },
      {
        "s": "Chi-squared test for independence contingency tables",
        "s_ar": "اختبار مربع كاي للاستقلالية في جداول التوافق",
        "cat": 1
      },
      {
        "s": "Exact trigonometric identities and radian circle sectors",
        "s_ar": "المتطابقات المثلثية الدقيقة وقطاعات الدائرة بالراديان",
        "cat": 0
      },
      {
        "s": "Spearman's rank correlation coefficient \\(r_s\\)",
        "s_ar": "معامل ارتباط الرتب لسبيرمان \\(r_s\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Exam Pacing & Time Allocation (Overview)",
    "ti_ar": "اكتشف الخطأ: إدارة الوقت وتوزيع الدرجات (نظرة عامة على رياضيات البكالوريا الدولية للمستوى القياسي (IB SL))",
    "q": "A student plans their timing for a 30-question, 45-minute section in IBSL. Which step in their strategy introduces a flaw?",
    "q_ar": "يخطط طالب لتوزيع وقته في قسم مكوّن من 30 سؤالاً خلال 45 دقيقة. أي خطوة تتضمن خللاً منهجياً؟",
    "steps": [
      "Compute average time budget per question: \\(\\frac{45\\times 60}{30} = 90\\) seconds.",
      "Complete a first pass of straightforward items in roughly \\(63\\) seconds each to bank time.",
      "Spend \\(9\\) minutes stuck on a single hard item before reading the remaining 15 questions.",
      "Reserve the final \\(4\\) minutes to verify flagged items and ensure no unanswered blanks remain."
    ],
    "steps_ar": [
      "حساب متوسط الزمن لكل سؤال: \\(\\frac{45\\times 60}{30} = 90\\) ثانية.",
      "إنجاز الجولة الأولى للأسئلة المباشرة خلال نحو \\(63\\) ثانية للسؤال لتوفير الوقت.",
      "قضاء \\(9\\) دقائق متواصلة على سؤال صعب واحد قبل قراءة بقية الأسئلة (15 سؤالاً).",
      "تخصيص آخر \\(4\\) دقائق لمراجعة الأسئلة المعلّمة والتأكد من عدم ترك أي إجابة فارغة."
    ],
    "errorStep": 3,
    "reasons": [
      "Sinking 9 minutes into one question sacrifices 5–6 solvable equal-weight items later in the section; hard items should be flagged for Pass 2.",
      "Average time per question should be computed by multiplying minutes by questions.",
      "You should leave unanswered blanks when there is no guessing penalty."
    ],
    "reasons_ar": [
      "استنزاف 9 دقائق في سؤال واحد يضيع 5–6 أسئلة قابلة للحل بنفس الوزن لاحقاً؛ يجب تعليم السؤال الصعب والعودة إليه في الجولة الثانية.",
      "يُحسب متوسط الزمن بضرب الدقائق في عدد الأسئلة.",
      "يفضّل ترك الأسئلة الصعبة فارغة حتى عند عدم وجود خصم على التخمين."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Pacing Audit & Target Score Plan (Overview)",
    "ti_ar": "وضع المصحح: خطة إدارة الوقت والدرجة المستهدفة (نظرة عامة على رياضيات البكالوريا الدولية للمستوى القياسي (IB SL))",
    "q": "A practice section has \\(30\\) equal-weight questions in \\(45\\) minutes with no penalty for wrong guesses. A student answers \\(27\\) correctly on Pass 1–2. (a) Find the exact seconds-per-question budget and accuracy percentage. (b) State the optimal triage rule for the remaining \\(3\\) flagged questions.",
    "q_ar": "يتكون قسم تدريبي من \\(30\\) سؤالاً متساوية الوزن في \\(45\\) دقيقة دون خصم على الإجابات الخاطئة. أجاب طالب عن \\(27\\) سؤالاً بشكل صحيح. (أ) أوجد الزمن المخصص لكل سؤال بالثواني ونسبة الدقة المئوية. (ب) اذكر قاعدة الفرز المثلى للأسئلة المتبقية وعددها \\(3\\).",
    "parts": [
      {
        "label": "Part (a) — Time Budget & Raw Accuracy",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Time per item: \\(\\frac{2700}{30} = 90\\text{ s}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Raw score percentage: \\(\\frac{27}{30} \\times 100\\% \\approx 90\\%\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Elimination & Zero-Blank Rule",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Eliminate clearly invalid distractors using dimensional/sign/boundary checks."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Select the best remaining option on all \\(3\\) items before time expires (expected gain \\(> 0\\) with no guessing penalty)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — ميزانية الوقت ونسبة الدقة",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "الزمن لكل سؤال: \\(\\frac{2700}{30} = 90\\) ثانية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "النسبة المئوية للدرجة الخام: \\(\\frac{27}{30} \\times 100\\% \\approx 90\\%\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — استبعاد البدائل وعدم ترك فراغات",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "استبعاد الخيارات المستحيلة عبر فحص الإشارة أو القيم الحدية."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "اختيار أفضل إجابة لجميع الأسئلة المتبقية (3) قبل انتهاء الوقت لعدم وجود خصم."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Exam Time & Score Budget (Overview)",
    "ti_ar": "بناء الخطوات: حساب ميزانية الوقت والدرجة (نظرة عامة على رياضيات البكالوريا الدولية للمستوى القياسي (IB SL))",
    "steps": [
      {
        "l": "Convert \\(45\\) minutes into total seconds:",
        "a": "2700",
        "h": "Multiply 45 by 60."
      },
      {
        "l": "Divide by \\(30\\) questions to get seconds per question:",
        "a": "90",
        "h": "Compute 2700 / 30."
      },
      {
        "l": "If you answer \\(27\\) out of \\(30\\) correctly, how many items remain for review?",
        "a": "3",
        "h": "Subtract 27 from 30."
      }
    ],
    "steps_ar": [
      {
        "l": "حوّل \\(45\\) دقيقة إلى إجمالي الثواني:",
        "a": "2700",
        "h": "اضرب 45 في 60."
      },
      {
        "l": "اقسم على \\(30\\) سؤالاً لإيجاد عدد الثواني لكل سؤال:",
        "a": "90",
        "h": "احسب 2700 ÷ 30."
      },
      {
        "l": "إذا حللت \\(27\\) من أصل \\(30\\)، فكم سؤالاً يتبقى للمراجعة؟",
        "a": "3",
        "h": "اطرح 27 من 30."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: High-Yield Exam Tactics (Overview)",
    "ti_ar": "مطابقة: تكتيكات الحل السريع والتحقق (نظرة عامة على رياضيات البكالوريا الدولية للمستوى القياسي (IB SL))",
    "p": [
      {
        "l": "Pass 1 (63 s/item)",
        "r": "Solve direct items immediately to bank guaranteed marks"
      },
      {
        "l": "Boundary / Sign Sanity Check",
        "r": "Eliminate options with impossible signs, units, or limiting values"
      },
      {
        "l": "Back-Solving from Choices",
        "r": "Substitute middle option first when algebraic setup is slow"
      },
      {
        "l": "Final 3-Minute Sweep",
        "r": "Verify flagged items and confirm zero unanswered questions"
      }
    ],
    "p_ar": [
      {
        "l": "الجولة الأولى (63 ث/سؤال)",
        "r": "حل الأسئلة المباشرة فوراً لتأمين الدرجات المضمونة"
      },
      {
        "l": "فحص الإشارة والقيم الحدية",
        "r": "استبعاد الخيارات ذات الإشارات أو الوحدات المستحيلة رياضياً"
      },
      {
        "l": "التجريب العكسي للخيارات",
        "r": "تعويض الخيار الأوسط أولاً عندما يكون البناء الجبري طويلاً"
      },
      {
        "l": "مراجعة الدقائق الثلاث الأخيرة",
        "r": "مراجعة الأسئلة المعلّمة والتأكد من عدم ترك أي فراغ"
      }
    ]
  }
];
D["ibsl-t1"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Arithmetic Sequence Term",
    "ti_ar": "فحص سريع: حد المتتابعة الحسابية",
    "q": "What is the 12th term of the arithmetic sequence \\(4, 9, 14, 19, \\ldots\\)?",
    "q_ar": "ما هو الحد الثاني عشر للمتتابعة الحسابية \\(4, 9, 14, 19, \\ldots\\)؟",
    "o": [
      "59",
      "64",
      "54",
      "69"
    ],
    "o_ar": [
      "59",
      "64",
      "54",
      "69"
    ],
    "a": 0,
    "ex": "\\(u_n = u_1 + (n - 1)d = 4 + (11)(5) = 4 + 55 = 59\\).",
    "ex_ar": "\\(u_n = u_1 + (n - 1)d = 4 + (11)(5) = 4 + 55 = 59\\)."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Sequences and Logarithms Properties",
    "ti_ar": "مختبر التفكير المنطقي: خصائص المتتابعات واللوغاريتمات",
    "items": [
      {
        "s": "A geometric series converges to a finite sum to infinity if and only if \\(|r| < 1\\).",
        "s_ar": "تتقارب المتسلسلة الهندسية إلى مجموع لانهائي منتهٍ إذا وفقط إذا كان \\(|r| < 1\\).",
        "a": true,
        "ex": "When |r| < 1, r^n approaches 0 as n approaches infinity.",
        "ex_ar": "عندما يكون |r| < 1، فإن r^n تقترب من الصفر عندما تقترب n من اللانهاية."
      },
      {
        "s": "\\(\\log_b(x + y) = \\log_b(x) + \\log_b(y)\\) for all positive \\(x, y\\).",
        "s_ar": "\\(\\log_b(x + y) = \\log_b(x) + \\log_b(y)\\) لجميع قيم x و y الموجبة.",
        "a": false,
        "ex": "The log of a product is the sum of logs: \\(\\log_b(xy) = \\log_b(x) + \\log_b(y)\\).",
        "ex_ar": "لوغاريتم حاصل الضرب هو مجموع اللوغاريتمات: \\(\\log_b(xy) = \\log_b(x) + \\log_b(y)\\)."
      },
      {
        "s": "The binomial coefficient \\(\\binom{n}{r}\\) equals \\(\\frac{n!}{r!(n-r)!}\\).",
        "s_ar": "معامل ذات الحدين \\(\\binom{n}{r}\\) يساوي \\(\\frac{n!}{r!(n-r)!}\\).",
        "a": true,
        "ex": "Standard definition of n choose r.",
        "ex_ar": "التعريف القياسي للتوافيق n فوق r."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Geometric Series Sum to Infinity",
    "ti_ar": "مختبر الحساب: مجموع المتسلسلة الهندسية اللانهائية",
    "q": "Find the sum to infinity \\(S_\\infty\\) of the geometric series \\(18 + 6 + 2 + \\frac{2}{3} + \\cdots\\).",
    "q_ar": "أوجد المجموع إلى اللانهاية \\(S_\\infty\\) للمتسلسلة الهندسية \\(18 + 6 + 2 + \\frac{2}{3} + \\cdots\\).",
    "a": 27,
    "tol": 0.01,
    "h": "Identify first term \\(u_1 = 18\\) and common ratio \\(r = 6/18 = 1/3\\). Use \\(S_\\infty = \\frac{u_1}{1 - r}\\).",
    "h_ar": "حدد الحد الأول \\(u_1 = 18\\) والأساس المشترك \\(r = 6/18 = 1/3\\). استخدم \\(S_\\infty = \\frac{u_1}{1 - r}\\).",
    "sol": "\\(S_\\infty = \\dfrac{18}{1 - 1/3} = \\dfrac{18}{2/3} = 27\\).",
    "sol_ar": "\\(S_\\infty = \\dfrac{18}{1 - 1/3} = \\dfrac{18}{2/3} = 27\\)."
  },
  {
    "t": "ord",
    "ti": "Algebra Protocol: Solving Logarithmic Equations",
    "ti_ar": "بروتوكول الجبر: حل المعادلات اللوغاريتمية",
    "q": "Order the steps for solving \\(\\log_2(x) + \\log_2(x - 2) = 3\\):",
    "q_ar": "رتب خطوات حل المعادلة \\(\\log_2(x) + \\log_2(x - 2) = 3\\):",
    "items": [
      "State the domain restrictions: \\(x > 0\\) and \\(x - 2 > 0 \\implies x > 2\\).",
      "Combine the logarithmic terms using product rule: \\(\\log_2[x(x - 2)] = 3\\).",
      "Convert from logarithmic to exponential form: \\(x(x - 2) = 2^3 = 8\\).",
      "Expand and rearrange into a standard quadratic: \\(x^2 - 2x - 8 = 0\\).",
      "Factor into \\((x - 4)(x + 2) = 0\\) and reject the extraneous solution \\(x = -2\\), leaving \\(x = 4\\)."
    ],
    "items_ar": [
      "تحديد قيود المجال: \\(x > 0\\) و \\(x - 2 > 0 \\implies x > 2\\).",
      "دمج الحدود اللوغاريتمية باستخدام قاعدة الضرب: \\(\\log_2[x(x - 2)] = 3\\).",
      "التحويل من الصورة اللوغاريتمية إلى الصورة الأسية: \\(x(x - 2) = 2^3 = 8\\).",
      "فك الأقواس والترتيب في صورة معادلة تربيعية قياسية: \\(x^2 - 2x - 8 = 0\\).",
      "التحليل إلى \\((x - 4)(x + 2) = 0\\) واستبعاد الحل الدخيل \\(x = -2\\)، ليتبقى الحل الصحيح \\(x = 4\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Sequence and Series Formulas",
    "ti_ar": "تصنيف قوانين المتتابعات والمتسلسلات",
    "categories": [
      "Arithmetic Sequence/Series",
      "Geometric Sequence/Series"
    ],
    "categories_ar": [
      "متتابعة/متسلسلة حسابية",
      "متتابعة/متسلسلة هندسية"
    ],
    "items": [
      {
        "s": "\\(u_n = u_1 + (n - 1)d\\)",
        "s_ar": "\\(u_n = u_1 + (n - 1)d\\)",
        "cat": 0
      },
      {
        "s": "\\(u_n = u_1 r^{n-1}\\)",
        "s_ar": "\\(u_n = u_1 r^{n-1}\\)",
        "cat": 1
      },
      {
        "s": "\\(S_n = \\frac{n}{2}(2u_1 + (n-1)d)\\)",
        "s_ar": "\\(S_n = \\frac{n}{2}(2u_1 + (n-1)d)\\)",
        "cat": 0
      },
      {
        "s": "\\(S_\\infty = \\frac{u_1}{1 - r}\\) for \\(|r| < 1\\)",
        "s_ar": "\\(S_\\infty = \\frac{u_1}{1 - r}\\) عندما \\(|r| < 1\\)",
        "cat": 1
      },
      {
        "s": "Common difference \\(d = u_{k+1} - u_k\\)",
        "s_ar": "الفرق المشترك \\(d = u_{k+1} - u_k\\)",
        "cat": 0
      },
      {
        "s": "Common ratio \\(r = u_{k+1} / u_k\\)",
        "s_ar": "النسبة المشتركة \\(r = u_{k+1} / u_k\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Successive Percentage Multipliers (Number & Algebra)",
    "ti_ar": "اكتشف الخطأ: النسب المئوية المتتالية (الموضوع ١ · الأعداد والجبر والمتسلسلات)",
    "q": "An item priced at \\(200\\) rises by \\(40\\%\\) and is then discounted by \\(40\\%\\). Which step in the calculation is wrong?",
    "q_ar": "سلعة سعرها \\(200\\) زاد سعرها بنسبة \\(40\\%\\) ثم خُفِّض بنسبة \\(40\\%\\). أي خطوة تحتوي على خطأ؟",
    "steps": [
      "Apply the \\(40\\%\\) increase multiplier: \\(200 \\times 1.40 = 280\\).",
      "Recognize that the \\(40\\%\\) discount applies to the new price \\(280\\).",
      "Add the percentage changes directly: \\(+40\\% - 40\\% = 0\\%\\), claiming the final price returns to \\(200\\).",
      "Verify final price via product of multipliers."
    ],
    "steps_ar": [
      "تطبيق معامل الزيادة \\(40\\%\\): \\(200 \\times 1.40 = 280\\).",
      "ملاحظة أن خصم \\(40\\%\\) يُطبَّق على السعر الجديد \\(280\\).",
      "جمع النسبتين مباشرة \\(+40\\% - 40\\% = 0\\%\\) والادعاء بأن السعر النهائي يعود إلى \\(200\\).",
      "التحقق من السعر النهائي بضرب المعاملات."
    ],
    "errorStep": 3,
    "reasons": [
      "Successive percentages multiply rather than add: \\(280 \\times 0.60 = 168\\) (a net \\(16\\%\\) decrease).",
      "The final price is actually greater than \\(200\\).",
      "Discounts must be divided rather than multiplied."
    ],
    "reasons_ar": [
      "النسب المتتالية تُضرب كمعاملات ولا تُجمع: \\(280 \\times 0.60 = 168\\) (بانخفاض صافي قدره \\(16\\%\\)).",
      "السعر النهائي أكبر من \\(200\\).",
      "الخصم يُحسب بالقسمة لا بالضرب."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Harmonic Round-Trip Speed & Bounds (Number & Algebra)",
    "ti_ar": "وضع المصحح: السرعة المتوسطة التوافقية والحدود (الموضوع ١ · الأعداد والجبر والمتسلسلات)",
    "q": "A vehicle travels a fixed distance \\(d\\) outbound at \\(80\\text{ km/h}\\) and returns the same distance \\(d\\) at \\(120\\text{ km/h}\\). (a) Express total time in terms of \\(d\\) and find the exact round-trip average speed. (b) If a length \\(L = 18\\text{ cm}\\) is rounded to the nearest \\(1\\text{ cm}\\), state its lower and upper bounds.",
    "q_ar": "تقطع مركبة مسافة \\(d\\) ذهاباً بسرعة \\(80\\text{ km/h}\\) وتعود المسافة نفسها بسرعة \\(120\\text{ km/h}\\). (أ) عبّر عن الزمن الكلي بدلالة \\(d\\) وأوجد السرعة المتوسطة للرحلة كاملة. (ب) إذا قُرِّب الطول \\(L = 18\\text{ cm}\\) لأقرب \\(1\\text{ cm}\\)، فاكتب الحد الأدنى والحد الأعلى.",
    "parts": [
      {
        "label": "Part (a) — Harmonic Average Speed",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Total distance \\(= 2d\\), total time \\(= \\frac{d}{80} + \\frac{d}{120}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Average speed \\(= \\frac{2 \\cdot 80 \\cdot 120}{80 + 120} = 96\\text{ km/h}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Error Interval Bounds",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Half-unit tolerance \\(\\pm 0.5\\text{ cm}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Error interval: \\(17.5 \\le L < 18.5\\)."
          }
        ]
      }
    ],
    "parts_ar": [
      {
        "label": "الجزء (أ) — السرعة المتوسطة التوافقية",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "المسافة الكلية \\(= 2d\\)، والزمن الكلي \\(= \\frac{d}{80} + \\frac{d}{120}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "السرعة المتوسطة \\(= \\frac{2 \\cdot 80 \\cdot 120}{80 + 120} = 96\\text{ km/h}\\)."
          }
        ]
      },
      {
        "label": "الجزء (ب) — فترة الخطأ والحدود",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "نصف وحدة الدقة يساوي \\(\\pm 0.5\\text{ cm}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "فترة القيمة الحقيقية: \\(17.5 \\le L < 18.5\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Successive Multipliers & Net Change (Number & Algebra)",
    "ti_ar": "بناء الخطوات: المعاملات المتتالية وصافي التغير (الموضوع ١ · الأعداد والجبر والمتسلسلات)",
    "steps": [
      {
        "l": "Increase \\(200\\) by \\(40\\%\\): new value \\(=\\)",
        "a": "280",
        "h": "Compute 200 × 1.40."
      },
      {
        "l": "Now discount \\(280\\) by \\(40\\%\\): final value \\(=\\)",
        "a": "168",
        "h": "Compute 280 × 0.60."
      },
      {
        "l": "Find the net decrease \\(200 - 168 =\\)",
        "a": "32",
        "h": "Subtract 168 from 200."
      }
    ],
    "steps_ar": [
      {
        "l": "زد العدد \\(200\\) بنسبة \\(40\\%\\): القيمة الجديدة \\(=\\)",
        "a": "280",
        "h": "احسب 200 × 1.40."
      },
      {
        "l": "طبّق خصم \\(40\\%\\) على \\(280\\): القيمة النهائية \\(=\\)",
        "a": "168",
        "h": "احسب 280 × 0.60."
      },
      {
        "l": "أوجد مقدار النقصان الصافي \\(200 - 168 =\\)",
        "a": "32",
        "h": "اطرح 168 من 200."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Number, Bounds & Set Principles (Number & Algebra)",
    "ti_ar": "مطابقة: قوانين الأعداد والحدود والمجموعات (الموضوع ١ · الأعداد والجبر والمتسلسلات)",
    "p": [
      {
        "l": "Upper bound of \\(a / b\\) (positive)",
        "r": "\\(a_{\\text{upper}} / b_{\\text{lower}}\\)"
      },
      {
        "l": "Inclusion–Exclusion \\(|A \\cup B|\\)",
        "r": "\\(|A| + |B| - |A \\cap B|\\)"
      },
      {
        "l": "Equal-distance round-trip speed",
        "r": "\\(\\frac{2 v_1 v_2}{v_1 + v_2} = 96\\) for \\(80, 120\\)"
      },
      {
        "l": "Rationalising \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}}\\)",
        "r": "Multiply numerator & denominator by \\(\\sqrt{a} + \\sqrt{b}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "الحد الأعلى للقسمة \\(a / b\\) (موجبة)",
        "r": "\\(a_{\\text{الأعلى}} / b_{\\text{الأدنى}}\\)"
      },
      {
        "l": "مبدأ الشمول والإقصاء \\(|A \\cup B|\\)",
        "r": "\\(|A| + |B| - |A \\cap B|\\)"
      },
      {
        "l": "السرعة المتوسطة ذهاباً وإياباً",
        "r": "\\(\\frac{2 v_1 v_2}{v_1 + v_2} = 96\\) للسرعتين \\(80, 120\\)"
      },
      {
        "l": "إنطاق مقام \\(\\frac{1}{\\sqrt{a} - \\sqrt{b}}\\)",
        "r": "الضرب في المرافق \\(\\sqrt{a} + \\sqrt{b}\\) بسطاً ومقاماً"
      }
    ]
  }
];
D["ibsl-t2"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Composite Function Evaluation",
    "ti_ar": "فحص سريع: إيجاد قيمة تركيب دالتين",
    "q": "Given \\(f(x) = 2x - 5\\) and \\(g(x) = x^2 + 1\\), what is \\((g \\circ f)(3)\\)?",
    "q_ar": "إذا كانت \\(f(x) = 2x - 5\\) و \\(g(x) = x^2 + 1\\)، فما هي قيمة \\((g \\circ f)(3)\\)؟",
    "o": [
      "2",
      "10",
      "7",
      "1"
    ],
    "o_ar": [
      "2",
      "10",
      "7",
      "1"
    ],
    "a": 0,
    "ex": "First find \\(f(3) = 2(3) - 5 = 1\\). Then evaluate \\(g(1) = 1^2 + 1 = 2\\).",
    "ex_ar": "أولاً نحسب \\(f(3) = 2(3) - 5 = 1\\). ثم نحسب \\(g(1) = 1^2 + 1 = 2\\)."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Graph Transformations and Inverses",
    "ti_ar": "مختبر التفكير المنطقي: تحويلات المنحنيات والدوال العكسية",
    "items": [
      {
        "s": "The graph of \\(y = f(x - 3) + 2\\) translates \\(y = f(x)\\) right by 3 units and up by 2 units.",
        "s_ar": "منحنى \\(y = f(x - 3) + 2\\) يزيح منحنى \\(y = f(x)\\) إلى اليمين بمقدار 3 وحدات وإلى الأعلى بمقدار وحدتين.",
        "a": true,
        "ex": "Inside subtraction moves right; outside addition moves up.",
        "ex_ar": "الطرح داخل الدالة يزيح لليمين، والجمع خارجها يزيح للأعلى."
      },
      {
        "s": "The vertical asymptote of \\(f(x) = \\frac{3x - 1}{x - 4}\\) is \\(x = 4\\).",
        "s_ar": "خط التقارب الرأسي للدالة \\(f(x) = \\frac{3x - 1}{x - 4}\\) هو \\(x = 4\\).",
        "a": true,
        "ex": "Denominator equals zero at x = 4.",
        "ex_ar": "المقام يساوي صفراً عند x = 4."
      },
      {
        "s": "The graph of \\(y = f^{-1}(x)\\) is obtained by reflecting \\(y = f(x)\\) in the y-axis.",
        "s_ar": "يتم الحصول على منحنى \\(y = f^{-1}(x)\\) بانعكاس منحنى \\(y = f(x)\\) حول محور y.",
        "a": false,
        "ex": "It is a reflection across the line \\(y = x\\).",
        "ex_ar": "الانعكاس يكون حول المستقيم القطري \\(y = x\\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Quadratic Vertex Value",
    "ti_ar": "مختبر الحساب: القيمة الصغرى لرأس القطع المكافئ",
    "q": "Find the minimum value (the y-coordinate of the vertex) of \\(f(x) = 2x^2 - 12x + 23\\).",
    "q_ar": "أوجد القيمة الصغرى (الإحداثي y للرأس) للدالة \\(f(x) = 2x^2 - 12x + 23\\).",
    "a": 5,
    "tol": 0.01,
    "h": "Vertex x-coordinate is \\(x = -b/(2a) = 12/4 = 3\\). Evaluate \\(f(3)\\).",
    "h_ar": "إحداثي x للرأس هو \\(x = -b/(2a) = 12/4 = 3\\). احسب \\(f(3)\\).",
    "sol": "\\(x_v = 3\\). \\(f(3) = 2(9) - 12(3) + 23 = 18 - 36 + 23 = 5\\).",
    "sol_ar": "\\(x_v = 3\\). \\(f(3) = 2(9) - 12(3) + 23 = 18 - 36 + 23 = 5\\)."
  },
  {
    "t": "ord",
    "ti": "Algebra Protocol: Finding the Inverse Function",
    "ti_ar": "بروتوكول الجبر: إيجاد الدالة العكسية",
    "q": "Order the steps for finding the inverse of \\(f(x) = \\dfrac{3x - 4}{2}\\):",
    "q_ar": "رتب خطوات إيجاد الدالة العكسية للدالة \\(f(x) = \\dfrac{3x - 4}{2}\\):",
    "items": [
      "Write the equation as \\(y = \\dfrac{3x - 4}{2}\\).",
      "Swap the roles of variables \\(x\\) and \\(y\\): \\(x = \\dfrac{3y - 4}{2}\\).",
      "Multiply both sides by 2 to clear the fraction: \\(2x = 3y - 4\\).",
      "Add 4 to both sides: \\(3y = 2x + 4\\).",
      "Divide by 3 to isolate \\(f^{-1}(x) = \\dfrac{2x + 4}{3}\\)."
    ],
    "items_ar": [
      "كتابة المعادلة على الصورة \\(y = \\dfrac{3x - 4}{2}\\).",
      "تبديل دوري المتغيرين \\(x\\) و \\(y\\): \\(x = \\dfrac{3y - 4}{2}\\).",
      "ضرب كلا الطرفين في 2 للتخلص من المقام: \\(2x = 3y - 4\\).",
      "إضافة 4 إلى كلا الطرفين: \\(3y = 2x + 4\\).",
      "القسمة على 3 لعزل \\(f^{-1}(x) = \\dfrac{2x + 4}{3}\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Graph Transformation Effects",
    "ti_ar": "تصنيف تأثيرات التحويلات الهندسية على المنحنى",
    "categories": [
      "Horizontal Transformation",
      "Vertical Transformation"
    ],
    "categories_ar": [
      "تحويل أفقي",
      "تحويل رأسي"
    ],
    "items": [
      {
        "s": "\\(y = f(x + 5)\\) (shift left 5)",
        "s_ar": "\\(y = f(x + 5)\\) (إزاحة لليسار 5)",
        "cat": 0
      },
      {
        "s": "\\(y = f(x) - 7\\) (shift down 7)",
        "s_ar": "\\(y = f(x) - 7\\) (إزاحة للأسفل 7)",
        "cat": 1
      },
      {
        "s": "\\(y = f(3x)\\) (horizontal compression by 1/3)",
        "s_ar": "\\(y = f(3x)\\) (انضغاط أفقي بمعامل 1/3)",
        "cat": 0
      },
      {
        "s": "\\(y = 4f(x)\\) (vertical stretch by 4)",
        "s_ar": "\\(y = 4f(x)\\) (تمدد رأسي بمعامل 4)",
        "cat": 1
      },
      {
        "s": "\\(y = f(-x)\\) (reflection across y-axis)",
        "s_ar": "\\(y = f(-x)\\) (انعكاس حول محور y)",
        "cat": 0
      },
      {
        "s": "\\(y = -f(x)\\) (reflection across x-axis)",
        "s_ar": "\\(y = -f(x)\\) (انعكاس حول محور x)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Composite Order & Inverse Domain (Functions)",
    "ti_ar": "اكتشف الخطأ: ترتيب تركيب الدوال ومجال المعكوس (الموضوع ٢ · الدوال والتمثيلات البيانية)",
    "q": "Let \\(f(x) = 5x + 3\\) and \\(g(x) = x^2 + 1\\). A student evaluates \\((f \\circ g)(2)\\). Which step is wrong?",
    "q_ar": "لتكن \\(f(x) = 5x + 3\\) و\\(g(x) = x^2 + 1\\). يحسب طالب \\((f \\circ g)(2)\\). أي خطوة خاطئة؟",
    "steps": [
      "Write \\((f \\circ g)(2) = g(f(2))\\) by applying \\(f\\) first instead of \\(g\\).",
      "Compute \\(f(2) = 13\\).",
      "Square and add \\(1\\) to get \\(170\\)."
    ],
    "steps_ar": [
      "كتابة \\((f \\circ g)(2) = g(f(2))\\) بتطبيق \\(f\\) أولاً بدلاً من \\(g\\).",
      "حساب \\(f(2) = 13\\).",
      "التربيع وإضافة \\(1\\) للحصول على \\(170\\)."
    ],
    "errorStep": 1,
    "reasons": [
      "By definition \\((f \\circ g)(x) = f(g(x))\\): evaluate the inner function \\(g(2) = 5\\) first, then \\(f(5) = 28\\).",
      "Function composition is always commutative.",
      "You must multiply \\(f(2)\\) by \\(g(2)\\)."
    ],
    "reasons_ar": [
      "حسب التعريف \\((f \\circ g)(x) = f(g(x))\\): نحسب الدالة الداخلية أولاً \\(g(2) = 5\\) ثم \\(f(5) = 28\\).",
      "تركيب الدوال عملية إبدالية دائماً.",
      "يجب ضرب \\(f(2)\\) في \\(g(2)\\)."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: One-to-One Domain Restriction & Inverse (Functions)",
    "ti_ar": "وضع المصحح: تقييد المجال وإيجاد الدالة العكسية (الموضوع ٢ · الدوال والتمثيلات البيانية)",
    "q": "Let \\(h(x) = (x - 5)^2 + 3\\) for \\(x \\ge 5\\). (a) State the range of \\(h\\) and explain why \\(h^{-1}\\) exists on \\(x \\ge 5\\). (b) Find \\(h^{-1}(x)\\) and state its domain.",
    "q_ar": "لتكن \\(h(x) = (x - 5)^2 + 3\\) حيث \\(x \\ge 5\\). (أ) اذكر مدى \\(h\\) وفسّر سبب وجود معكوس لها. (ب) أوجد \\(h^{-1}(x)\\) وحدد مجالها.",
    "parts": [
      {
        "label": "Part (a) — Range & Injectivity",
        "marks": 2,
        "rubric": [
          {
            "code": "B1",
            "marks": 1,
            "text": "Range of \\(h\\) is \\([ 3, \\infty )\\) since \\((x - 5)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "For \\(x \\ge 5\\), \\(h\\) is strictly increasing (one-to-one / passes horizontal line test)."
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
            "text": "Solve \\(y = (x - 5)^2 + 3 \\implies x = 5 + \\sqrt{y - 3}\\) (choosing \\(+\\) branch for \\(x \\ge 5\\))."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 5 + \\sqrt{x - 3}\\) with domain \\(x \\ge 3\\)."
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
            "text": "مدى الدالة \\(h\\) هو \\([ 3, \\infty )\\) لأن \\((x - 5)^2 \\ge 0\\)."
          },
          {
            "code": "B1",
            "marks": 1,
            "text": "على الفترة \\(x \\ge 5\\) الدالة متزايدة تماماً (واحد لواحد)."
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
            "text": "حل المعادلة بدلالة \\(x\\) مع اختيار الفرع الموجب: \\(x = 5 + \\sqrt{y - 3}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(h^{-1}(x) = 5 + \\sqrt{x - 3}\\) ومجالها \\(x \\ge 3\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Composite & Inverse Function Evaluation (Functions)",
    "ti_ar": "بناء الخطوات: حساب التركيب والمعكوس (الموضوع ٢ · الدوال والتمثيلات البيانية)",
    "steps": [
      {
        "l": "For \\(f(x) = 5x + 3\\) and \\(g(x) = x^2 + 1\\), find \\(g(2) =\\)",
        "a": "5",
        "h": "Compute 2² + 1."
      },
      {
        "l": "Now evaluate \\(f(g(2)) = f(5) =\\)",
        "a": "28",
        "h": "Compute 5×5 + 3."
      },
      {
        "l": "Evaluate \\(f^{-1}(18) =\\)",
        "a": "3",
        "h": "Solve 5x + 3 = 18."
      }
    ],
    "steps_ar": [
      {
        "l": "للدالتين \\(f(x) = 5x + 3\\) و\\(g(x) = x^2 + 1\\)، أوجد \\(g(2) =\\)",
        "a": "5",
        "h": "احسب 2² + 1."
      },
      {
        "l": "الآن احسب \\(f(g(2)) = f(5) =\\)",
        "a": "28",
        "h": "احسب 5×5 + 3."
      },
      {
        "l": "أوجد قيمة المعكوس \\(f^{-1}(18) =\\)",
        "a": "3",
        "h": "حل المعادلة 5x + 3 = 18."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Function Transformations & Inverse Rules (Functions)",
    "ti_ar": "مطابقة: تحويلات الدوال وقواعد المعكوس (الموضوع ٢ · الدوال والتمثيلات البيانية)",
    "p": [
      {
        "l": "Graph of \\(y = f^{-1}(x)\\)",
        "r": "Reflection of \\(y = f(x)\\) across \\(y = x\\)"
      },
      {
        "l": "Domain of \\(f^{-1}\\)",
        "r": "Exact range of \\(f\\)"
      },
      {
        "l": "Transformation \\(y = f(x - 5) + 3\\)",
        "r": "Shift right \\(5\\) units and up \\(3\\) units"
      },
      {
        "l": "Modulus graph \\(y = |f(x)|\\)",
        "r": "Reflects portions where \\(f(x) < 0\\) above the \\(x\\)-axis"
      }
    ],
    "p_ar": [
      {
        "l": "منحنى المعكوس \\(y = f^{-1}(x)\\)",
        "r": "انعكاس منحنى \\(y = f(x)\\) حول المستقيم \\(y = x\\)"
      },
      {
        "l": "مجال الدالة العكسية \\(f^{-1}\\)",
        "r": "يساوي مدى الدالة الأصلية \\(f\\) تماماً"
      },
      {
        "l": "التحويل \\(y = f(x - 5) + 3\\)",
        "r": "إزاحة لليمين \\(5\\) وحدات ولأعلى \\(3\\) وحدات"
      },
      {
        "l": "منحنى القيمة المطلقة \\(y = |f(x)|\\)",
        "r": "يعكس الأجزاء السالبة \\(f(x) < 0\\) فوق محور السينات"
      }
    ]
  }
];
D["ibsl-t3"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Radian Arc Length",
    "ti_ar": "فحص سريع: طول القوس بالراديان",
    "q": "A circular sector has radius \\(r = 8\\text{ cm}\\) and central angle \\(\\theta = 0.75\\text{ radians}\\). What is the arc length \\(s\\)?",
    "q_ar": "قطاع دائري نصف قطره \\(r = 8\\text{ cm}\\) وزاويته المركزية \\(\\theta = 0.75\\text{ راديان}\\). ما هو طول القوس \\(s\\)؟",
    "o": [
      "6 cm",
      "12 cm",
      "4.5 cm",
      "16 cm"
    ],
    "o_ar": [
      "6 cm",
      "12 cm",
      "4.5 cm",
      "16 cm"
    ],
    "a": 0,
    "ex": "\\(s = r\\theta = 8(0.75) = 6\\text{ cm}\\).",
    "ex_ar": "\\(s = r\\theta = 8(0.75) = 6\\text{ cm}\\)."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Trigonometric Rules and Radians",
    "ti_ar": "مختبر التفكير المنطقي: قوانين حساب المثلثات والراديان",
    "items": [
      {
        "s": "The sine rule \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\) can be applied to any triangle, not just right-angled triangles.",
        "s_ar": "قانون الجيوب \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\) يمكن تطبيقه على أي مثلث، وليس المثلثات القائمة فقط.",
        "a": true,
        "ex": "The sine rule applies to all oblique triangles.",
        "ex_ar": "قانون الجيوب ينطبق على جميع المثلثات العامة."
      },
      {
        "s": "\\(\\cos(180^\\circ - \\theta) = \\cos\\theta\\).",
        "s_ar": "\\(\\cos(180^\\circ - \\theta) = \\cos\\theta\\).",
        "a": false,
        "ex": "Cosine of an obtuse angle is negative: \\(\\cos(180^\\circ - \\theta) = -\\cos\\theta\\).",
        "ex_ar": "جيب تمام الزاوية المنفرجة سالب: \\(\\cos(180^\\circ - \\theta) = -\\cos\\theta\\)."
      },
      {
        "s": "Two non-zero 2D vectors are perpendicular if and only if their dot product \\(\\mathbf{u} \\cdot \\mathbf{v} = 0\\).",
        "s_ar": "يكون المتجهان غير الصفريين متعامدين إذا وفقط إذا كان حاصل ضربهما القياسي \\(\\mathbf{u} \\cdot \\mathbf{v} = 0\\).",
        "a": true,
        "ex": "Zero dot product implies angle is 90 degrees.",
        "ex_ar": "الضرب القياسي الصفري يعني أن الزاوية بينهما 90 درجة."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Sector Area Calculation",
    "ti_ar": "مختبر الحساب: مساحة القطاع الدائري",
    "q": "Find the area of a sector of a circle of radius \\(r = 6\\text{ cm}\\) with central angle \\(\\theta = \\frac{\\pi}{3}\\text{ radians}\\). Express your answer as a decimal to 3 significant figures. (Use \\(\\pi \\approx 3.1416\\))",
    "q_ar": "أوجد مساحة قطاع دائري نصف قطره \\(r = 6\\text{ cm}\\) وزاويته المركزية \\(\\theta = \\frac{\\pi}{3}\\text{ راديان}\\). قرّب إجابتك إلى 3 أرقام معنوية (استخدم \\(\\pi \\approx 3.1416\\)).",
    "a": 18.8,
    "tol": 0.2,
    "unit": "cm²",
    "h": "Use \\(A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(36)(\\pi/3) = 6\\pi\\).",
    "h_ar": "استخدم \\(A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(36)(\\pi/3) = 6\\pi\\).",
    "sol": "\\(A = \\frac{1}{2}(6^2)\\left(\\frac{\\pi}{3}\\right) = 6\\pi \\approx 18.8\\text{ cm}^2\\).",
    "sol_ar": "\\(A = \\frac{1}{2}(6^2)\\left(\\frac{\\pi}{3}\\right) = 6\\pi \\approx 18.8\\text{ cm}^2\\)."
  },
  {
    "t": "ord",
    "ti": "Trigonometry Protocol: Solving Non-Right Triangles with the Cosine Rule",
    "ti_ar": "بروتوكول المثلثات: حل المثلثات المائلة بقانون جيوب التمام",
    "q": "Order the steps to find side \\(c\\) in a triangle with sides \\(a = 5\\), \\(b = 7\\) and included angle \\(C = 60^\\circ\\):",
    "q_ar": "رتب خطوات إيجاد طول الضلع \\(c\\) في مثلث أطوال أضلاعه \\(a = 5\\) و \\(b = 7\\) والزاوية المحصورة بينهما \\(C = 60^\\circ\\):",
    "items": [
      "State the cosine rule formula: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\).",
      "Substitute values: \\(c^2 = 5^2 + 7^2 - 2(5)(7)\\cos 60^\\circ\\).",
      "Evaluate trigonometric constant: \\(\\cos 60^\\circ = 0.5\\).",
      "Compute: \\(c^2 = 25 + 49 - 70(0.5) = 74 - 35 = 39\\).",
      "Take square root: \\(c = \\sqrt{39} \\approx 6.24\\)."
    ],
    "items_ar": [
      "صياغة قانون جيوب التمام: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\).",
      "التعويض بالقيم المعطاة: \\(c^2 = 5^2 + 7^2 - 2(5)(7)\\cos 60^\\circ\\).",
      "حساب النسبة المثلثية: \\(\\cos 60^\\circ = 0.5\\).",
      "الحساب العددي: \\(c^2 = 25 + 49 - 70(0.5) = 74 - 35 = 39\\).",
      "أخذ الجذر التربيعي: \\(c = \\sqrt{39} \\approx 6.24\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Trigonometric Properties by Quadrant",
    "ti_ar": "تصنيف إشارات النسب المثلثية في الربع الثاني",
    "categories": [
      "Positive in Quadrant II (90° to 180°)",
      "Negative in Quadrant II (90° to 180°)"
    ],
    "categories_ar": [
      "موجبة في الربع الثاني (90° إلى 180°)",
      "سالبة في الربع الثاني (90° إلى 180°)"
    ],
    "items": [
      {
        "s": "\\(\\sin\\theta\\)",
        "s_ar": "\\(\\sin\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(\\cos\\theta\\)",
        "s_ar": "\\(\\cos\\theta\\)",
        "cat": 1
      },
      {
        "s": "\\(\\tan\\theta\\)",
        "s_ar": "\\(\\tan\\theta\\)",
        "cat": 1
      },
      {
        "s": "\\(\\sin(180^\\circ - \\theta)\\)",
        "s_ar": "\\(\\sin(180^\\circ - \\theta)\\)",
        "cat": 0
      },
      {
        "s": "\\(\\cos(180^\\circ - \\theta)\\)",
        "s_ar": "\\(\\cos(180^\\circ - \\theta)\\)",
        "cat": 1
      },
      {
        "s": "\\(\\tan(180^\\circ - \\theta)\\)",
        "s_ar": "\\(\\tan(180^\\circ - \\theta)\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Quadrant Sign & Dividing by \\(\\sin\\theta\\) (Geometry & Trigonometry)",
    "ti_ar": "اكتشف الخطأ: إشارة الربع والقسمة على \\(\\sin\\theta\\) (الموضوع ٣ · الهندسة وحساب المثلثات)",
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
    "ti": "Examiner Mode: Quadrant Identities & Cosine Rule (Geometry & Trigonometry)",
    "ti_ar": "وضع المصحح: المتطابقات المثلثية وقانون جيب التمام (الموضوع ٣ · الهندسة وحساب المثلثات)",
    "q": "Suppose \\(\\sin\\theta = \\dfrac{5}{13}\\) with \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (Quadrant II). (a) Find exact values of \\(\\cos\\theta\\) and \\(\\tan\\theta\\). (b) Evaluate \\(\\sin(2\\theta)\\).",
    "q_ar": "إذا كان \\(\\sin\\theta = \\dfrac{5}{13}\\) حيث \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (الربع الثاني). (أ) أوجد القيمة الدقيقة لكل من \\(\\cos\\theta\\) و\\(\\tan\\theta\\). (ب) احسب \\(\\sin(2\\theta)\\).",
    "parts": [
      {
        "label": "Part (a) — Quadrant II Cosine & Tangent",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\cos^2\\theta = 1 - \\frac{25}{169} = \\frac{144}{169}\\), negative in QII \\(\\implies \\cos\\theta = -\\frac{12}{13}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = -\\frac{5}{12}\\)."
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
            "text": "\\(\\sin(2\\theta) = 2\\left(\\frac{5}{13}\\right)\\left(-\\frac{12}{13}\\right) = -\\frac{120}{169}\\)."
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
            "text": "في الربع الثاني \\(\\cos\\theta < 0\\) ومن متطابقة فيثاغورس \\(\\cos\\theta = -\\frac{12}{13}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = -\\frac{5}{12}\\)."
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
            "text": "\\(\\sin(2\\theta) = -\\frac{120}{169}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Sinusoidal Amplitude, Period & Exact Ratios (Geometry & Trigonometry)",
    "ti_ar": "بناء الخطوات: السعة والدورة والنسب المثلثية (الموضوع ٣ · الهندسة وحساب المثلثات)",
    "steps": [
      {
        "l": "State the amplitude of \\(y = -5\\cos(3x)\\):",
        "a": "5",
        "h": "Amplitude is |A| > 0."
      },
      {
        "l": "If \\(\\tan\\theta = \\frac{5}{12}\\) for acute \\(\\theta\\), find \\(\\sec\\theta\\) numerator over \\(12\\):",
        "a": "13",
        "h": "Hypotenuse of (5, 12) right triangle."
      },
      {
        "l": "Convert \\(\\pi / 3\\) radians into degrees:",
        "a": "60",
        "h": "Multiply 180 by 1/3."
      }
    ],
    "steps_ar": [
      {
        "l": "اذكر سعة الدالة \\(y = -5\\cos(3x)\\):",
        "a": "5",
        "h": "السعة تساوي القيمة المطلقة |A|."
      },
      {
        "l": "إذا كان \\(\\tan\\theta = \\frac{5}{12}\\) لزاوية حادة، فما بسط \\(\\sec\\theta\\) المقامه \\(12\\)؟",
        "a": "13",
        "h": "وتر المثلث القائم ذي الضلعين 5 و12."
      },
      {
        "l": "حوّل \\(\\pi / 3\\) راديان إلى درجات:",
        "a": "60",
        "h": "احسب 180 ÷ 3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Trigonometric & Inverse-Trig Identities (Geometry & Trigonometry)",
    "ti_ar": "مطابقة: المتطابقات المثلثية والفروع العكسية (الموضوع ٣ · الهندسة وحساب المثلثات)",
    "p": [
      {
        "l": "\\(1 + \\tan^2\\theta\\)",
        "r": "\\(\\sec^2\\theta\\)"
      },
      {
        "l": "Cosine Rule for side \\(c\\)",
        "r": "\\(c^2 = a^2 + b^2 - 2ab\\cos C\\)"
      },
      {
        "l": "Principal range of \\(\\arccos x\\)",
        "r": "\\([0, \\pi]\\)"
      },
      {
        "l": "Period of \\(5\\sin(3x)\\)",
        "r": "\\(\\dfrac{2\\pi}{3}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\(1 + \\tan^2\\theta\\)",
        "r": "\\(\\sec^2\\theta\\)"
      },
      {
        "l": "قانون جيب التمام للضلع \\(c\\)",
        "r": "\\(c^2 = a^2 + b^2 - 2ab\\cos C\\)"
      },
      {
        "l": "المدى الرئيسي للدالة \\(\\arccos x\\)",
        "r": "\\([0, \\pi]\\)"
      },
      {
        "l": "دورة الدالة \\(5\\sin(3x)\\)",
        "r": "\\(\\dfrac{2\\pi}{3}\\)"
      }
    ]
  }
];
D["ibsl-t4"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Expected Value of a Binomial Distribution",
    "ti_ar": "فحص سريع: القيمة المتوقعة للتوزيع ذي الحدين",
    "q": "A fair 6-sided die is rolled 60 times. What is the expected number of times a 4 will appear?",
    "q_ar": "أُلقي نرد منتظم ذو 6 أوجه 60 مرة. ما هو العدد المتوقع لمرات ظهور الرقم 4؟",
    "o": [
      "10",
      "6",
      "12",
      "15"
    ],
    "o_ar": [
      "10",
      "6",
      "12",
      "15"
    ],
    "a": 0,
    "ex": "\\(X \\sim B(60, 1/6) \\implies E(X) = np = 60(1/6) = 10\\).",
    "ex_ar": "\\(X \\sim B(60, 1/6) \\implies E(X) = np = 60(1/6) = 10\\)."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Probability and Normal Distribution",
    "ti_ar": "مختبر التفكير المنطقي: الاحتمالات والتوزيع الطبيعي",
    "items": [
      {
        "s": "For independent events \\(A\\) and \\(B\\), \\(P(A \\cap B) = P(A) \\cdot P(B)\\).",
        "s_ar": "للحادثتين المستقلتين A و B، يكون \\(P(A \\cap B) = P(A) \\cdot P(B)\\).",
        "a": true,
        "ex": "Multiplication rule for independence.",
        "ex_ar": "قاعدة الضرب للحوادث المستقلة."
      },
      {
        "s": "In a normal distribution, approximately 95% of data falls within 1 standard deviation of the mean.",
        "s_ar": "في التوزيع الطبيعي، يقع حوالي 95% من البيانات ضمن انحراف معياري واحد من المتوسط.",
        "a": false,
        "ex": "Approximately 68% lies within 1 s.d., and 95% lies within 2 s.d.",
        "ex_ar": "حوالي 68% يقع ضمن انحراف معياري واحد، بينما 95% يقع ضمن انحرافين معياريين."
      },
      {
        "s": "For mutually exclusive events, \\(P(A \\cap B) = 0\\).",
        "s_ar": "للحوادث المتنافية، يكون \\(P(A \\cap B) = 0\\).",
        "a": true,
        "ex": "Mutually exclusive events cannot occur simultaneously.",
        "ex_ar": "الحوادث المتنافية يستحيل وقوعها معاً في الوقت ذاته."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Probability Union Calculation",
    "ti_ar": "مختبر الحساب: احتمال اتحاد حادثتين",
    "q": "Events \\(A\\) and \\(B\\) satisfy \\(P(A) = 0.6\\), \\(P(B) = 0.5\\), and \\(P(A \\cap B) = 0.3\\). Find \\(P(A \\cup B)\\).",
    "q_ar": "حادثتان A و B تحققان \\(P(A) = 0.6\\) و \\(P(B) = 0.5\\) و \\(P(A \\cap B) = 0.3\\). أوجد \\(P(A \\cup B)\\).",
    "a": 0.8,
    "tol": 0.01,
    "h": "Use the addition rule: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).",
    "h_ar": "استخدم قاعدة الجمع: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).",
    "sol": "\\(P(A \\cup B) = 0.6 + 0.5 - 0.3 = 0.8\\).",
    "sol_ar": "\\(P(A \\cup B) = 0.6 + 0.5 - 0.3 = 0.8\\)."
  },
  {
    "t": "ord",
    "ti": "Inference Protocol: Normal Distribution Probability Workflow",
    "ti_ar": "بروتوكول الاستدلال: مسار حساب احتمالات التوزيع الطبيعي",
    "q": "Order the steps for finding \\(P(X \\le 85)\\) for \\(X \\sim N(70, 10^2)\\):",
    "q_ar": "رتب خطوات إيجاد الاحتمال \\(P(X \\le 85)\\) للمتغير \\(X \\sim N(70, 10^2)\\):",
    "items": [
      "Identify the parameters: mean \\(\\mu = 70\\) and standard deviation \\(\\sigma = 10\\).",
      "Calculate the standardized z-score: \\(z = \\dfrac{x - \\mu}{\\sigma} = \\dfrac{85 - 70}{10} = 1.5\\).",
      "Write the probability in standardized form: \\(P(Z \\le 1.5) = \\Phi(1.5)\\).",
      "Look up \\(\\Phi(1.5)\\) in the standard normal table or enter into GDC \\(\\text{normcdf}(-10^{99}, 1.5, 0, 1)\\).",
      "State the final probability: \\(P(X \\le 85) \\approx 0.933\\)."
    ],
    "items_ar": [
      "تحديد المعلمات: المتوسط الحسابي \\(\\mu = 70\\) والانحراف المعياري \\(\\sigma = 10\\).",
      "حساب الدرجة المعيارية z: \\(z = \\dfrac{x - \\mu}{\\sigma} = \\dfrac{85 - 70}{10} = 1.5\\).",
      "كتابة الاحتمال بالصيغة المعيارية: \\(P(Z \\le 1.5) = \\Phi(1.5)\\).",
      "إيجاد قيمة \\(\\Phi(1.5)\\) من جدول التوزيع الطبيعي المعياري أو بإدخال \\(\\text{normcdf}(-10^{99}, 1.5, 0, 1)\\) في الحاسبة.",
      "كتابة الاحتمال النهائي: \\(P(X \\le 85) \\approx 0.933\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Statistical Variables",
    "ti_ar": "تصنيف المتغيرات الإحصائية: متقطعة (منفصلة) مقابل متصلة",
    "categories": [
      "Discrete Random Variable",
      "Continuous Random Variable"
    ],
    "categories_ar": [
      "متغير عشوائي متقطع (منفصل)",
      "متغير عشوائي متصل"
    ],
    "items": [
      {
        "s": "Number of defects in a manufactured batch",
        "s_ar": "عدد العيوب في دفعة إنتاجية مصنعة",
        "cat": 0
      },
      {
        "s": "Time taken to run a 400-meter race",
        "s_ar": "الزمن المستغرق لقطع سباق 400 متر",
        "cat": 1
      },
      {
        "s": "Number of goals scored in a football match",
        "s_ar": "عدد الأهداف المسجلة في مباراة كرة قدم",
        "cat": 0
      },
      {
        "s": "Weight of an apple chosen from an orchard",
        "s_ar": "وزن تفاحة تم اختيارها من بستان",
        "cat": 1
      },
      {
        "s": "Number of students passing an examination",
        "s_ar": "عدد الطلاب الناجحين في الامتحان",
        "cat": 0
      },
      {
        "s": "Height of a tree measured in meters",
        "s_ar": "طول شجرة مقاساً بالأمتار",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Variance of Difference of Independent Variables (Statistics & Probability)",
    "ti_ar": "اكتشف الخطأ: تباين الفرق بين متغيرين عشوائيين مستقلين (الموضوع ٤ · الإحصاء والاحتمالات والتوزيعات)",
    "q": "Independent random variables \\(X\\) and \\(Y\\) have \\(\\operatorname{Var}(X) = 8\\) and \\(\\operatorname{Var}(Y) = 4\\). A student computes \\(\\operatorname{Var}(X - Y)\\). Which step is invalid?",
    "q_ar": "متغيران عشوائيان مستقلان \\(X\\) و\\(Y\\) تبايناهما \\(\\operatorname{Var}(X) = 8\\) و\\(\\operatorname{Var}(Y) = 4\\). يحسب طالب \\(\\operatorname{Var}(X - Y)\\). أي خطوة خاطئة؟",
    "steps": [
      "Verify that \\(X\\) and \\(Y\\) are statistically independent (\\(\\operatorname{Cov}(X,Y) = 0\\)).",
      "Subtract the variances directly: \\(\\operatorname{Var}(X - Y) = 8 - 4 = 4\\).",
      "Take square root for standard deviation."
    ],
    "steps_ar": [
      "التحقق من استقلال \\(X\\) و\\(Y\\) إحصائياً.",
      "طرح التباينين مباشرة: \\(\\operatorname{Var}(X - Y) = 8 - 4 = 4\\).",
      "أخذ الجذر التربيعي لإيجاد الانحراف المعياري."
    ],
    "errorStep": 2,
    "reasons": [
      "Because coefficients square in variance, \\(\\operatorname{Var}(X - Y) = 1^2\\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 8 + 4 = 12\\) — independent variances ALWAYS add.",
      "\\(\\operatorname{Var}(X - Y)\\) equals \\(\\operatorname{Var}(X) \\cdot \\operatorname{Var}(Y)\\).",
      "Expected values cannot be subtracted."
    ],
    "reasons_ar": [
      "لأن المعاملات تُربَّع في التباين: \\(\\operatorname{Var}(X - Y) = \\operatorname{Var}(X) + (-1)^2\\operatorname{Var}(Y) = 12\\) — التباينات المستقلة تُجمع دائماً.",
      "التباين يساوي حاصل ضرب التباينين.",
      "لا يجوز طرح التوقعات الرياضية."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Standard Error, Variance & Conditional Probability (Statistics & Probability)",
    "ti_ar": "وضع المصحح: الخطأ المعياري والتباين والاحتمال الشرطي (الموضوع ٤ · الإحصاء والاحتمالات والتوزيعات)",
    "q": "(a) A population has standard deviation \\(\\sigma = 24\\). For a simple random sample of size \\(n = 36\\), find the standard error \\(\\sigma_{\\bar{x}}\\) and state what happens to \\(\\sigma_{\\bar{x}}\\) if \\(n\\) quadruples. (b) Independent \\(X, Y\\) have \\(\\operatorname{Var}(X) = 8,\\; \\operatorname{Var}(Y) = 4\\); compute \\(\\operatorname{Var}(2X - Y)\\).",
    "q_ar": "(أ) مجتمع انحرافه المعياري \\(\\sigma = 24\\). لعينة عشوائية حجمها \\(n = 36\\)، احسب الخطأ المعياري \\(\\sigma_{\\bar{x}}\\) واذكر ماذا يحدث له عند مضاعفة \\(n\\) أربع مرات. (ب) للمتغيرين المستقلين \\(X, Y\\) حيث \\(\\operatorname{Var}(X) = 8,\\; \\operatorname{Var}(Y) = 4\\)، احسب \\(\\operatorname{Var}(2X - Y)\\).",
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
            "text": "\\(4(8) + 4 = 36\\)."
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
            "text": "الناتج: \\(4(8) + 4 = 36\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Standard Error & Independent Variance (Statistics & Probability)",
    "ti_ar": "بناء الخطوات: الخطأ المعياري وتباين المتغيرات المستقلة (الموضوع ٤ · الإحصاء والاحتمالات والتوزيعات)",
    "steps": [
      {
        "l": "Compute \\(\\sqrt{n}\\) for sample size \\(n = 36\\):",
        "a": "6",
        "h": "Square root of 36."
      },
      {
        "l": "Find standard error \\(\\sigma / \\sqrt{n}\\) when \\(\\sigma = 24\\):",
        "a": "4",
        "h": "Divide 24 by 6."
      },
      {
        "l": "For independent \\(\\operatorname{Var}(X) = 8,\\; \\operatorname{Var}(Y) = 4\\), find \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "12",
        "h": "Add 8 + 4."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب \\(\\sqrt{n}\\) لحجم العينة \\(n = 36\\):",
        "a": "6",
        "h": "الجذر التربيعي للعدد 36."
      },
      {
        "l": "أوجد الخطأ المعياري \\(\\sigma / \\sqrt{n}\\) عندما \\(\\sigma = 24\\):",
        "a": "4",
        "h": "اقسم 24 على 6."
      },
      {
        "l": "للمتغيرين المستقلين \\(\\operatorname{Var}(X) = 8,\\; \\operatorname{Var}(Y) = 4\\)، احسب \\(\\operatorname{Var}(X - Y) =\\)",
        "a": "12",
        "h": "اجمع 8 + 4."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Probability, Distributions & Inference Rules (Statistics & Probability)",
    "ti_ar": "مطابقة: قوانين الاحتمالات والتوزيعات والاستدلال (الموضوع ٤ · الإحصاء والاحتمالات والتوزيعات)",
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
D["ibsl-t5"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Derivative via Power & Chain Rule",
    "ti_ar": "فحص سريع: المشتقة باستخدام قاعدتي القوة والسلسلة",
    "q": "Find the derivative of \\(f(x) = (2x + 1)^4\\).",
    "q_ar": "أوجد مشتقة الدالة \\(f(x) = (2x + 1)^4\\).",
    "o": [
      "\\(8(2x + 1)^3\\)",
      "\\(4(2x + 1)^3\\)",
      "\\(2(2x + 1)^3\\)",
      "\\(8x(2x + 1)^3\\)"
    ],
    "o_ar": [
      "\\(8(2x + 1)^3\\)",
      "\\(4(2x + 1)^3\\)",
      "\\(2(2x + 1)^3\\)",
      "\\(8x(2x + 1)^3\\)"
    ],
    "a": 0,
    "ex": "Chain rule: \\(f'(x) = 4(2x + 1)^3 \\cdot \\frac{d}{dx}(2x + 1) = 4(2x + 1)^3 \\cdot 2 = 8(2x + 1)^3\\).",
    "ex_ar": "قاعدة السلسلة: \\(f'(x) = 4(2x + 1)^3 \\cdot \\frac{d}{dx}(2x + 1) = 4(2x + 1)^3 \\cdot 2 = 8(2x + 1)^3\\)."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Calculus Theorems and Kinematics",
    "ti_ar": "مختبر التفكير المنطقي: نظريات التفاضل والتكامل والحركيات",
    "items": [
      {
        "s": "If \\(f'(c) = 0\\) and \\(f''(c) > 0\\), then \\(f(x)\\) has a local minimum at \\(x = c\\).",
        "s_ar": "إذا كان \\(f'(c) = 0\\) و \\(f''(c) > 0\\)، فإن للدالة \\(f(x)\\) قيمة صغرى محلية عند \\(x = c\\).",
        "a": true,
        "ex": "Second derivative test for a local minimum.",
        "ex_ar": "اختبار المشتقة الثانية لتحديد القيم الصغرى المحلية."
      },
      {
        "s": "Displacement is equal to the integral of speed over time.",
        "s_ar": "الإزاحة تساوي تكامل السرعة القياسية (speed) بالنسبة للزمن.",
        "a": false,
        "ex": "Displacement is the integral of velocity; total distance is the integral of speed (|v(t)|).",
        "ex_ar": "الإزاحة هي تكامل السرعة المتجهة (velocity)؛ بينما المسافة الكلية هي تكامل السرعة القياسية (|v(t)|)."
      },
      {
        "s": "The derivative of \\(\\sin(2x)\\) is \\(2\\cos(2x)\\).",
        "s_ar": "مشتقة الدالة \\(\\sin(2x)\\) هي \\(2\\cos(2x)\\).",
        "a": true,
        "ex": "Chain rule multiplies by 2.",
        "ex_ar": "قاعدة السلسلة تقتضي الضرب في مشتقة ما بداخل الجيب (2)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Definite Integral Evaluation",
    "ti_ar": "مختبر الحساب: حساب التكامل المحدد",
    "q": "Evaluate the definite integral \\(\\displaystyle\\int_0^3 (2x + 1)\\,dx\\).",
    "q_ar": "احسب قيمة التكامل المحدد \\(\\displaystyle\\int_0^3 (2x + 1)\\,dx\\).",
    "a": 12,
    "tol": 0.01,
    "h": "Integrate term by term: \\([x^2 + x]_0^3\\).",
    "h_ar": "كامل حداً بحر: \\([x^2 + x]_0^3\\).",
    "sol": "\\([x^2 + x]_0^3 = (3^2 + 3) - (0) = 9 + 3 = 12\\).",
    "sol_ar": "\\([x^2 + x]_0^3 = (3^2 + 3) - (0) = 9 + 3 = 12\\)."
  },
  {
    "t": "ord",
    "ti": "Calculus Protocol: Finding Tangent Line Equation",
    "ti_ar": "بروتوكول التفاضل: إيجاد معادلة خط المماس",
    "q": "Order the steps to find the equation of the tangent line to \\(y = x^2 - 3x\\) at \\(x = 4\\):",
    "q_ar": "رتب خطوات إيجاد معادلة خط المماس لمنحنى \\(y = x^2 - 3x\\) عند \\(x = 4\\):",
    "items": [
      "Find the y-coordinate of the point: \\(y(4) = 4^2 - 3(4) = 16 - 12 = 4\\), so point is \\((4, 4)\\).",
      "Find the derivative of the function: \\(y' = 2x - 3\\).",
      "Evaluate the gradient at \\(x = 4\\): \\(m = y'(4) = 2(4) - 3 = 5\\).",
      "Substitute into point-slope formula: \\(y - 4 = 5(x - 4)\\).",
      "Expand and simplify into slope-intercept form: \\(y = 5x - 16\\)."
    ],
    "items_ar": [
      "إيجاد الإحداثي y لنقطة التماس: \\(y(4) = 4^2 - 3(4) = 16 - 12 = 4\\)، إذن النقطة هي \\((4, 4)\\).",
      "إيجاد مشتقة الدالة: \\(y' = 2x - 3\\).",
      "حساب الميل عند \\(x = 4\\): \\(m = y'(4) = 2(4) - 3 = 5\\).",
      "التعويض في صيغة الميل ونقطة: \\(y - 4 = 5(x - 4)\\).",
      "فك الأقواس والتبسيط لصيغة الميل والمقطع: \\(y = 5x - 16\\)."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify Calculus Concepts",
    "ti_ar": "تصنيف مفاهيم التفاضل والتكامل",
    "categories": [
      "Differential Calculus",
      "Integral Calculus"
    ],
    "categories_ar": [
      "حساب التفاضل",
      "حساب التكامل"
    ],
    "items": [
      {
        "s": "Rate of change and tangent gradients",
        "s_ar": "معدل التغير وميول المماسات",
        "cat": 0
      },
      {
        "s": "Area enclosed between two curves",
        "s_ar": "المساحة المحصورة بين منحنيين",
        "cat": 1
      },
      {
        "s": "Finding stationary points and inflection points",
        "s_ar": "إيجاد النقاط الحرجة ونقاط الانقلاب",
        "cat": 0
      },
      {
        "s": "Recovering displacement from a velocity function",
        "s_ar": "استنتاج دالة الإزاحة من دالة السرعة المتجهة",
        "cat": 1
      },
      {
        "s": "Chain rule, product rule, and quotient rule",
        "s_ar": "قواعد السلسلة والضرب والقسمة للمشتقات",
        "cat": 0
      },
      {
        "s": "Definite integrals and anti-derivatives",
        "s_ar": "التكاملات المحددة والدوال الأصلية (عكس المشتقة)",
        "cat": 1
      }
    ]
  },
  {
    "t": "gp",
    "ti": "Interactive Graph Plotter: Cubic Extrema & Inflection Point",
    "ti_ar": "مخطط الدوال التفاعلي: القيم القصوى ونقطة الانقلاب للدالة التكعيبية",
    "q": "Plot the local maximum, local minimum, and inflection point of \\(f(x) = x^3 - 3x^2\\) on the grid.",
    "q_ar": "حدد القيمة العظمى المحلية، والقيمة الصغرى المحلية، ونقطة الانقلاب للدالة \\(f(x) = x^3 - 3x^2\\) على الشبكة الإحداثية.",
    "xrange": [
      -2,
      4
    ],
    "yrange": [
      -6,
      3
    ],
    "targets": [
      {
        "label": "Local Maximum (0, 0)",
        "label_ar": "عظمى محلية (0, 0)",
        "target": [
          0,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "Local Minimum (2, -4)",
        "label_ar": "صغرى محلية (2, -4)",
        "target": [
          2,
          -4
        ],
        "tol": 0.45
      },
      {
        "label": "Inflection Point (1, -2)",
        "label_ar": "نقطة انقلاب (1, -2)",
        "target": [
          1,
          -2
        ],
        "tol": 0.45
      }
    ],
    "targets_ar": [
      {
        "label": "عظمى محلية (0, 0)",
        "target": [
          0,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "صغرى محلية (2, -4)",
        "target": [
          2,
          -4
        ],
        "tol": 0.45
      },
      {
        "label": "نقطة انقلاب (1, -2)",
        "target": [
          1,
          -2
        ],
        "tol": 0.45
      }
    ],
    "curve": "x**3 - 3*x**2",
    "sol": "Differentiating: \\(f'(x) = 3x^2 - 6x = 3x(x - 2) = 0 \\implies x = 0, 2\\). At \\(x = 0\\), \\(f(0) = 0\\) (local max); at \\(x = 2\\), \\(f(2) = -4\\) (local min). Inflection occurs at \\(f''(x) = 6x - 6 = 0 \\implies x = 1, y = -2\\).",
    "sol_ar": "باشتقاق الدالة: \\(f'(x) = 3x(x - 2) = 0 \\implies x = 0, 2\\). عند \\(x = 0\\) عظمى محلية عند \\((0, 0)\\)، وعند \\(x = 2\\) صغرى محلية عند \\((2, -4)\\). نقطة الانقلاب عند \\(f''(x) = 6x - 6 = 0 \\implies (1, -2)\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Extraneous Solutions in Logarithmic Equations",
    "ti_ar": "اكتشف الخطأ: الحلول الدخيلة في المعادلات اللوغاريتمية",
    "q": "A student solves \\(\\log_2(x) + \\log_2(x - 2) = 3\\). Review their steps below:",
    "q_ar": "قام طالب بحل المعادلة \\(\\log_2(x) + \\log_2(x - 2) = 3\\). افحص خطوات الحل التالية:",
    "steps": [
      {
        "s": "Combine logs using product property: \\(\\log_2[x(x - 2)] = 3\\)"
      },
      {
        "s": "Convert to exponential form: \\(x(x - 2) = 2^3 = 8\\)"
      },
      {
        "s": "Expand and rearrange into standard quadratic: \\(x^2 - 2x - 8 = 0\\)"
      },
      {
        "s": "Factor: \\((x - 4)(x + 2) = 0 \\implies x = 4\\) or \\(x = -2\\)"
      },
      {
        "s": "Conclude both \\(x = 4\\) and \\(x = -2\\) are valid solutions"
      }
    ],
    "steps_ar": [
      {
        "s": "دمج اللوغاريتمات باستخدام خاصية الضرب: \\(\\log_2[x(x - 2)] = 3\\)"
      },
      {
        "s": "التحويل للصيغة الأسية: \\(x(x - 2) = 2^3 = 8\\)"
      },
      {
        "s": "الترتيب بالصيغة القياسية: \\(x^2 - 2x - 8 = 0\\)"
      },
      {
        "s": "التحليل: \\((x - 4)(x + 2) = 0 \\implies x = 4\\) أو \\(x = -2\\)"
      },
      {
        "s": "الاستنتاج أن كلاً من \\(x = 4\\) و \\(x = -2\\) حلان صحيحان"
      }
    ],
    "errorStep": 5,
    "reasons": [
      "Logarithms require strictly positive arguments; x = -2 is an extraneous solution because log₂(-2) is undefined",
      "The exponential form should have been 3² = 9",
      "Factoring x² - 2x - 8 was incorrect"
    ],
    "reasons_ar": [
      "اللوغاريتم يشترط أعداداً موجبة تماماً؛ والعدد x = -2 حل دخيل لأن log₂(-2) غير معرّف",
      "التحويل للصيغة الأسية كان يجب أن يكون 3² = 9",
      "تحليل المقدار كان غير صحيح"
    ],
    "correctReason": 0,
    "sol": "Step 5 is erroneous! The domain of \\(\\log_2(x)\\) and \\(\\log_2(x - 2)\\) requires \\(x > 2\\). Since \\(-2 \\le 2\\), \\(x = -2\\) is an extraneous solution. The sole valid solution is \\(x = 4\\).",
    "sol_ar": "الخطوة 5 خاطئة! مجال المعادلة يشترط \\(x > 2\\). العدد \\(x = -2\\) حل دخيل، والحل الوحيد المقبول هو \\(x = 4\\)."
  },
  {
    "t": "ms",
    "ti": "IB Math AA SL Paper 1: Kinematics Multi-Part Exam Question",
    "ti_ar": "ورقة اختبار IB Math AA SL 1: مسألة الحركيات متعددة الأجزاء",
    "q": "A particle moves along a horizontal straight line such that its velocity at time \\(t\\) seconds is given by \\(v(t) = 6t - 3t^2\\) for \\(t \\ge 0\\).<br><b>(a)</b> Find the acceleration of the particle at \\(t = 2\\). [2 marks]<br><b>(b)</b> Find the values of \\(t\\) when the particle is instantaneously at rest. [2 marks]<br><b>(c)</b> Given that the particle starts at displacement \\(s(0) = 4\\text{ m}\\), find its displacement at \\(t = 3\\). [3 marks]",
    "parts": [
      {
        "label": "Part (a)",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "text": "Recognise \\(a(t) = v'(t)\\) and differentiate: \\(a(t) = 6 - 6t\\)",
            "text_ar": "إدراك أن التسارع هو مشتقة السرعة والاشتقاق: 6 - 6t"
          },
          {
            "code": "A1",
            "text": "Substitute \\(t = 2\\): \\(a(2) = 6 - 12 = -6\\text{ m s}^{-2}\\)",
            "text_ar": "التعويض عن t = 2 للحصول على -6 م/ث²"
          }
        ]
      },
      {
        "label": "Part (b)",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "text": "Set velocity to zero: \\(6t - 3t^2 = 0 \\implies 3t(2 - t) = 0\\)",
            "text_ar": "مساواة السرعة بالصفر والتحليل"
          },
          {
            "code": "A1",
            "text": "State both non-negative solutions: \\(t = 0\\) and \\(t = 2\\text{ s}\\)",
            "text_ar": "كتابة قيمتي الزمن: t = 0 و t = 2 ثانية"
          }
        ]
      },
      {
        "label": "Part (c)",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "text": "Integrate velocity with respect to time: \\(s(t) = \\int (6t - 3t^2)\\,dt = 3t^2 - t^3 + C\\)",
            "text_ar": "تكامل السرعة بالنسبة للزمن"
          },
          {
            "code": "A1",
            "text": "Use initial condition \\(s(0) = 4\\implies C = 4\\), so \\(s(t) = 3t^2 - t^3 + 4\\)",
            "text_ar": "إيجاد ثابت التكامل C = 4"
          },
          {
            "code": "A1",
            "text": "Evaluate at \\(t = 3\\): \\(s(3) = 3(9) - 27 + 4 = 4\\text{ m}\\)",
            "text_ar": "حساب الإزاحة عند t = 3 وتساوي 4 أمتار"
          }
        ]
      }
    ],
    "boundaries": [
      {
        "min": 7,
        "grade": "IB Grade 7 (Maximum Mastery)",
        "grade_ar": "درجة البكالوريا الدولية 7 (إتقان تام)"
      },
      {
        "min": 5,
        "grade": "IB Grade 6 (Excellent)",
        "grade_ar": "درجة البكالوريا الدولية 6 (ممتاز)"
      },
      {
        "min": 4,
        "grade": "IB Grade 5 (Good)",
        "grade_ar": "درجة البكالوريا الدولية 5 (جيد جداً)"
      },
      {
        "min": 3,
        "grade": "IB Grade 4 (Satisfactory Pass)",
        "grade_ar": "درجة البكالوريا الدولية 4 (ناجح)"
      },
      {
        "min": 0,
        "grade": "Needs Practice",
        "grade_ar": "يحتاج تدريب"
      }
    ],
    "examinerTip": "Examiner Advice: Full method marks require showing the integration constant +C explicitly before solving for s(0) = 4.",
    "examinerTip_ar": "نصيحة المصحح: تتطلب علامة الطريقة إظهار ثابت التكامل +C صراحة قبل التعويض بالشرط الابتدائي."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Limit Evaluation & Instantaneous Slope (Calculus)",
    "ti_ar": "بناء الخطوات: حساب النهايات والميل اللحظي (الموضوع ٥ · التفاضل والتكامل)",
    "steps": [
      {
        "l": "Evaluate \\(\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} =\\)",
        "a": "4",
        "h": "Factor as (x − 2)(x + 2) and substitute x = 2."
      },
      {
        "l": "For \\(g(x) = x^3 + 4x\\), evaluate \\(g(1) =\\)",
        "a": "5",
        "h": "Compute 1 + 4."
      },
      {
        "l": "Evaluate instantaneous slope \\(g'(1) = 3(1)^2 + 4 =\\)",
        "a": "7",
        "h": "Compute 3 + 4."
      }
    ],
    "steps_ar": [
      {
        "l": "احسب النهاية \\(\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} =\\)",
        "a": "4",
        "h": "حلّل البسط واختصر ثم عوّض x = 2."
      },
      {
        "l": "للدالة \\(g(x) = x^3 + 4x\\)، احسب \\(g(1) =\\)",
        "a": "5",
        "h": "احسب 1 + 4."
      },
      {
        "l": "احسب ميل المماس \\(g'(1) = 3(1)^2 + 4 =\\)",
        "a": "7",
        "h": "احسب 3 + 4."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Continuity, Derivatives & Concavity Criteria (Calculus)",
    "ti_ar": "مطابقة: شروط الاتصال والاشتقاق والتقعر (الموضوع ٥ · التفاضل والتكامل)",
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
D["ibsl-ai"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Euler's Method Step Formula",
    "ti_ar": "فحص سريع: صيغة خطوة طريقة أويلر",
    "q": "In Euler's method for \\(\\frac{dy}{dx} = f(x, y)\\) with step size \\(h\\), how is \\(y_{n+1}\\) computed from \\(y_n\\)?",
    "q_ar": "في طريقة أويلر للمعادلة التفاضلية \\(\\frac{dy}{dx} = f(x, y)\\) بطول خطوة \\(h\\)، كيف تُحسب \\(y_{n+1}\\) بدلالة \\(y_n\\)؟",
    "o": [
      "\\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\)",
      "\\(y_{n+1} = y_n + \\frac{h}{2} \\cdot f(x_n, y_n)\\)",
      "\\(y_{n+1} = y_n + f(x_n, y_n)\\)",
      "\\(y_{n+1} = x_n + h \\cdot y_n\\)"
    ],
    "o_ar": [
      "\\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\)",
      "\\(y_{n+1} = y_n + \\frac{h}{2} \\cdot f(x_n, y_n)\\)",
      "\\(y_{n+1} = y_n + f(x_n, y_n)\\)",
      "\\(y_{n+1} = x_n + h \\cdot y_n\\)"
    ],
    "a": 0,
    "ex": "Euler's recurrence formula is \\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\).",
    "ex_ar": "صيغة أويلر التكرارية هي \\(y_{n+1} = y_n + h \\cdot f(x_n, y_n)\\)."
  },
  {
    "t": "tf",
    "ti": "Reasoning Lab: Voronoi Diagrams & AI SL Statistics",
    "ti_ar": "مختبر التفكير المنطقي: مخططات فورونوي وإحصاء AI SL",
    "items": [
      {
        "s": "In a Voronoi diagram, every point inside a cell is closer to that cell's site than to any other site.",
        "s_ar": "في مخطط فورونوي، أي نقطة داخل خلية معينة تكون أقرب إلى موقع تلك الخلية من أي موقع آخر.",
        "a": true,
        "ex": "Definition of a Voronoi region.",
        "ex_ar": "التعريف الأساسي لمنطقة فورونوي."
      },
      {
        "s": "A Voronoi vertex is equidistant from at least three sites.",
        "s_ar": "رأس فورونوي يبعد مسافات متساوية عن ثلاثة مواقع على الأقل.",
        "a": true,
        "ex": "Vertices are circumcenters of adjacent sites.",
        "ex_ar": "رؤوس فورونوي تمثل مراكز الدوائر المحيطة بالمواقع المتجاورة."
      },
      {
        "s": "A chi-squared test for independence is valid even when expected cell frequencies are less than 1.",
        "s_ar": "يكون اختبار مربع كاي للاستقلالية صالحاً حتى لو كانت التكرارات المتوقعة في الخلايا أقل من 1.",
        "a": false,
        "ex": "Every expected cell frequency must be at least 5.",
        "ex_ar": "يجب أن يكون التكرار المتوقع في كل خلية 5 على الأقل."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Calculation Lab: Euler's Method Single Step Estimation",
    "ti_ar": "مختبر الحساب: تقدير خطوة واحدة بطريقة أويلر",
    "q": "Given \\(\\frac{dy}{dx} = 2x + y\\) with \\(y(0) = 3\\), use Euler's method with step size \\(h = 0.2\\) to estimate \\(y(0.2)\\).",
    "q_ar": "إذا كان \\(\\frac{dy}{dx} = 2x + y\\) مع الشرط الابتدائي \\(y(0) = 3\\)، استخدم طريقة أويلر بطول خطوة \\(h = 0.2\\) لتقدير قيمة \\(y(0.2)\\).",
    "a": 3.6,
    "tol": 0.01,
    "h": "Compute \\(f(x_0, y_0) = 2(0) + 3 = 3\\). Then \\(y_1 = y_0 + h \\cdot f(0, 3)\\).",
    "h_ar": "احسب \\(f(x_0, y_0) = 2(0) + 3 = 3\\). ثم \\(y_1 = y_0 + h \\cdot f(0, 3)\\).",
    "sol": "\\(y_1 = 3 + 0.2(3) = 3 + 0.6 = 3.6\\).",
    "sol_ar": "\\(y_1 = 3 + 0.2(3) = 3 + 0.6 = 3.6\\)."
  },
  {
    "t": "ord",
    "ti": "Inference Protocol: Executing a Chi-Squared Independence Test",
    "ti_ar": "بروتوكول الاستدلال: تنفيذ اختبار مربع كاي للاستقلالية",
    "q": "Order the steps for conducting a \\(\\chi^2\\) test for independence on a two-way contingency table:",
    "q_ar": "رتب خطوات إجراء اختبار \\(\\chi^2\\) للاستقلالية على جدول توافق ثنائي:",
    "items": [
      "State the null hypothesis \\(H_0\\) (variables are independent) and alternative \\(H_1\\) (variables are dependent).",
      "Calculate expected frequencies for every cell: \\(f_e = \\frac{\\text{row total} \\times \\text{column total}}{\\text{grand total}}\\).",
      "Verify that all expected frequencies satisfy \\(f_e \\ge 5\\).",
      "Compute the test statistic: \\(\\chi^2 = \\sum \\frac{(f_o - f_e)^2}{f_e}\\) and degrees of freedom \\((r - 1)(c - 1)\\).",
      "Compare \\(\\chi^2\\) with the critical value (or p-value with \\(\\alpha\\)) and state the conclusion."
    ],
    "items_ar": [
      "صياغة فرضية العدم \\(H_0\\) (المتغيران مستقلان) والفرضية البديلة \\(H_1\\) (المتغيران غير مستقلين/مرتبطان).",
      "حساب التكرارات المتوقعة لكل خلية: \\(f_e = \\frac{\\text{مجموع الصف} \\times \\text{مجموع العمود}}{\\text{المجموع الكلي}}\\).",
      "التحقق من أن جميع التكرارات المتوقعة تحقق الشرط \\(f_e \\ge 5\\).",
      "حساب إحصائية الاختبار: \\(\\chi^2 = \\sum \\frac{(f_o - f_e)^2}{f_e}\\) ودرجات الحرية \\((r - 1)(c - 1)\\).",
      "مقارنة قيمة \\(\\chi^2\\) المحسوبة بالقيمة الحرجة (أو p-value مع مستوى الدلالة \\(\\alpha\\)) واستخلاص القرار."
    ]
  },
  {
    "t": "cat",
    "ti": "Classify AI SL Analytical Methods",
    "ti_ar": "تصنيف الطرائق التحليلية في AI SL",
    "categories": [
      "Geometric / Network Modelling",
      "Statistical Inference"
    ],
    "categories_ar": [
      "النمذجة الهندسية والشبكية",
      "الاستدلال الإحصائي"
    ],
    "items": [
      {
        "s": "Voronoi diagrams and toxic waste dump placement",
        "s_ar": "مخططات فورونوي وتحديد مواقع مكبات النفايات",
        "cat": 0
      },
      {
        "s": "Chi-squared test for independence",
        "s_ar": "اختبار مربع كاي للاستقلالية",
        "cat": 1
      },
      {
        "s": "Perpendicular bisectors between two coordinate sites",
        "s_ar": "المنصفات العمودية بين موقعين إحداثيين",
        "cat": 0
      },
      {
        "s": "Spearman's rank correlation coefficient \\(r_s\\)",
        "s_ar": "معامل ارتباط الرتب لسبيرمان \\(r_s\\)",
        "cat": 1
      },
      {
        "s": "Euler's numerical method for differential equations",
        "s_ar": "طريقة أويلر العددية للمعادلات التفاضلية",
        "cat": 0
      },
      {
        "s": "Pearson product-moment correlation coefficient \\(r\\)",
        "s_ar": "معامل ارتباط بيرسون \\(r\\)",
        "cat": 1
      }
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Vieta's Sum of Squares Identity (AI SL — Specific Topics)",
    "ti_ar": "اكتشف الخطأ: متطابقة فييت لمجموع مربعي الجذرين (مسار التطبيقات والتفسير (AI SL) — الموضوعات الخاصة)",
    "q": "For \\(x^2 - 11x + 28 = 0\\) with roots \\(\\alpha, \\beta\\), a student computes \\(\\alpha^2 + \\beta^2\\). Where is the error?",
    "q_ar": "للمعادلة \\(x^2 - 11x + 28 = 0\\) ذات الجذرين \\(\\alpha, \\beta\\)، يحسب طالب \\(\\alpha^2 + \\beta^2\\). أين الخطأ؟",
    "steps": [
      "Read Vieta's relations: \\(\\alpha + \\beta = 11\\) and \\(\\alpha\\beta = 28\\).",
      "Claim \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 121\\), omitting \\(-2\\alpha\\beta\\).",
      "State \\(121\\) as the value of \\(\\alpha^2 + \\beta^2\\)."
    ],
    "steps_ar": [
      "استخراج علاقات فييت: \\(\\alpha + \\beta = 11\\) و\\(\\alpha\\beta = 28\\).",
      "الادعاء بأن \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 = 121\\) وإغفال الحد \\(-2\\alpha\\beta\\).",
      "اعتماد \\(121\\) قيمة نهائية."
    ],
    "errorStep": 2,
    "reasons": [
      "Because \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\), the exact identity is \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 121 - 56 = 65\\).",
      "Vieta gives \\(\\alpha + \\beta = -11\\).",
      "\\(\\alpha\\beta\\) must be squared before subtracting."
    ],
    "reasons_ar": [
      "لأن \\((\\alpha + \\beta)^2 = \\alpha^2 + 2\\alpha\\beta + \\beta^2\\)، فالمتطابقة الصحيحة هي \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 65\\).",
      "مجموع الجذرين يساوي \\(-11\\).",
      "يجب تربيع \\(\\alpha\\beta\\) قبل الطرح."
    ],
    "correctReason": 0
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Discriminant, Vieta & Factor Theorem (AI SL — Specific Topics)",
    "ti_ar": "وضع المصحح: المميز وعلاقات فييت ونظرية العامل (مسار التطبيقات والتفسير (AI SL) — الموضوعات الخاصة)",
    "q": "Consider \\(P(x) = x^2 - 11x + 28\\) with roots \\(\\alpha, \\beta\\). (a) Compute the discriminant \\(\\Delta\\) and verify \\(P(4) = 0\\). (b) Evaluate \\(\\alpha^2 + \\beta^2\\) using symmetric sums.",
    "q_ar": "لتكن \\(P(x) = x^2 - 11x + 28\\) وجذراها \\(\\alpha, \\beta\\). (أ) احسب المميز \\(\\Delta\\) وتحقق أن \\(P(4) = 0\\). (ب) أوجد قيمة \\(\\alpha^2 + \\beta^2\\) باستعمال المجاميع المتماثلة.",
    "parts": [
      {
        "label": "Part (a) — Discriminant & Factor Check",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\Delta = (-11)^2 - 4(1)(28) = 9 > 0\\) (two distinct real roots)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(4) = 16 - 44 + 28 = 0\\), confirming \\((x - 4)\\) is a factor."
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
            "text": "\\(\\alpha + \\beta = 11,\\; \\alpha\\beta = 28\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 11^2 - 2(28) = 65\\)."
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
            "text": "\\(\\Delta = (-11)^2 - 4(1)(28) = 9 > 0\\) (جذران حقيقيان مختلفان)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(P(4) = 0\\)، مما يؤكد أن \\((x - 4)\\) عامل لكثيرة الحدود."
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
            "text": "\\(\\alpha + \\beta = 11,\\; \\alpha\\beta = 28\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\alpha^2 + \\beta^2 = 11^2 - 2(28) = 65\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Vieta Relations & Remainder Theorem (AI SL — Specific Topics)",
    "ti_ar": "بناء الخطوات: علاقات فييت ونظرية الباقي (مسار التطبيقات والتفسير (AI SL) — الموضوعات الخاصة)",
    "steps": [
      {
        "l": "For \\(x^2 - 11x + 28 = 0\\), find \\(\\alpha + \\beta =\\)",
        "a": "11",
        "h": "Use −b/a."
      },
      {
        "l": "Find the product of roots \\(\\alpha\\beta =\\)",
        "a": "28",
        "h": "Use c/a."
      },
      {
        "l": "Compute \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "65",
        "h": "Compute 121 − 56."
      }
    ],
    "steps_ar": [
      {
        "l": "للمعادلة \\(x^2 - 11x + 28 = 0\\)، أوجد \\(\\alpha + \\beta =\\)",
        "a": "11",
        "h": "استعمل −b/a."
      },
      {
        "l": "أوجد حاصل ضرب الجذرين \\(\\alpha\\beta =\\)",
        "a": "28",
        "h": "استعمل c/a."
      },
      {
        "l": "احسب \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta =\\)",
        "a": "65",
        "h": "احسب 121 − 56."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Polynomial & Quadratic Theorems (AI SL — Specific Topics)",
    "ti_ar": "مطابقة: نظريات المعادلات التربيعية وكثيرات الحدود (مسار التطبيقات والتفسير (AI SL) — الموضوعات الخاصة)",
    "p": [
      {
        "l": "Remainder when \\(P(x)\\) is divided by \\((x - 4)\\)",
        "r": "\\(P(4)\\)"
      },
      {
        "l": "Tangent line–parabola condition",
        "r": "System discriminant \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "Sum & product in \\(x^2 - 11x + 28 = 0\\)",
        "r": "\\(\\alpha + \\beta = 11,\\; \\alpha\\beta = 28\\)"
      },
      {
        "l": "Axis of symmetry of \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "باقي قسمة \\(P(x)\\) على \\((x - 4)\\)",
        "r": "\\(P(4)\\)"
      },
      {
        "l": "شرط تماس مستقيم مع قطع مكافئ",
        "r": "مميز النظام المشترك \\(\\Delta = b^2 - 4ac = 0\\)"
      },
      {
        "l": "مجموع وضرب جذري \\(x^2 - 11x + 28 = 0\\)",
        "r": "\\(\\alpha + \\beta = 11,\\; \\alpha\\beta = 28\\)"
      },
      {
        "l": "معادلة محور التماثل لـ \\(ax^2 + bx + c\\)",
        "r": "\\(x = -\\frac{b}{2a}\\)"
      }
    ]
  }
];
D["ibsl-aa"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Period of a Transformed Sinusoid (AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus)",
    "ti_ar": "فحص سريع: دورة الدالة الجيبية (مسار التحليل والتقاربات (AA SL) — ذات الحدين والبرهان والمثلثات والتفاضل التحليلي)",
    "q": "What is the fundamental period of \\(f(x) = 4\\sin(4x - \\pi) + 1\\)?",
    "q_ar": "ما الدورة الأساسية للدالة \\(f(x) = 4\\sin(4x - \\pi) + 1\\)؟",
    "o": [
      "\\(\\dfrac{2\\pi}{4}\\)",
      "\\(8\\pi\\)",
      "\\(\\dfrac{\\pi}{4}\\)",
      "\\(4\\pi\\)"
    ],
    "o_ar": [
      "\\(\\dfrac{2\\pi}{4}\\)",
      "\\(8\\pi\\)",
      "\\(\\dfrac{\\pi}{4}\\)",
      "\\(4\\pi\\)"
    ],
    "a": 0,
    "ex": "For \\(A\\sin(Bx + C) + D\\), the period is \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{4}\\).",
    "ex_ar": "دورة الدالة \\(A\\sin(Bx + C) + D\\) تساوي \\(\\frac{2\\pi}{|B|} = \\frac{2\\pi}{4}\\)."
  },
  {
    "t": "tf",
    "ti": "True / False: Trigonometric & Inverse-Trig Identities (AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus)",
    "ti_ar": "صح أم خطأ: المتطابقات المثلثية والفروع العكسية (مسار التحليل والتقاربات (AA SL) — ذات الحدين والبرهان والمثلثات والتفاضل التحليلي)",
    "items": [
      {
        "s": "\\(1 + \\tan^2\\theta\\) corresponds to \\(\\sec^2\\theta\\).",
        "a": true,
        "ex": "Verified identity: \\(\\sec^2\\theta\\)."
      },
      {
        "s": "Cosine Rule for side \\(c\\) corresponds to \\([0, \\pi]\\).",
        "a": false,
        "ex": "Actually, Cosine Rule for side \\(c\\) corresponds to \\(c^2 = a^2 + b^2 - 2ab\\cos C\\)."
      },
      {
        "s": "Period of \\(4\\sin(4x)\\) corresponds to \\(\\dfrac{2\\pi}{4}\\).",
        "a": true,
        "ex": "Correct: \\(\\dfrac{2\\pi}{4}\\)."
      }
    ],
    "items_ar": [
      {
        "s": "\\(1 + \\tan^2\\theta\\) يكافئ \\(\\sec^2\\theta\\).",
        "a": true,
        "ex": "علاقة صحيحة: \\(\\sec^2\\theta\\)."
      },
      {
        "s": "قانون جيب التمام للضلع \\(c\\) يكافئ \\([0, \\pi]\\).",
        "a": false,
        "ex": "الصواب أن قانون جيب التمام للضلع \\(c\\) يكافئ \\(c^2 = a^2 + b^2 - 2ab\\cos C\\)."
      },
      {
        "s": "دورة الدالة \\(4\\sin(4x)\\) يكافئ \\(\\dfrac{2\\pi}{4}\\).",
        "a": true,
        "ex": "صحيح: \\(\\dfrac{2\\pi}{4}\\)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Trigonometric & Inverse-Trig Identities (AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus)",
    "ti_ar": "مطابقة: المتطابقات المثلثية والفروع العكسية (مسار التحليل والتقاربات (AA SL) — ذات الحدين والبرهان والمثلثات والتفاضل التحليلي)",
    "p": [
      {
        "l": "\\(1 + \\tan^2\\theta\\)",
        "r": "\\(\\sec^2\\theta\\)"
      },
      {
        "l": "Cosine Rule for side \\(c\\)",
        "r": "\\(c^2 = a^2 + b^2 - 2ab\\cos C\\)"
      },
      {
        "l": "Principal range of \\(\\arccos x\\)",
        "r": "\\([0, \\pi]\\)"
      },
      {
        "l": "Period of \\(4\\sin(4x)\\)",
        "r": "\\(\\dfrac{2\\pi}{4}\\)"
      }
    ],
    "p_ar": [
      {
        "l": "\\(1 + \\tan^2\\theta\\)",
        "r": "\\(\\sec^2\\theta\\)"
      },
      {
        "l": "قانون جيب التمام للضلع \\(c\\)",
        "r": "\\(c^2 = a^2 + b^2 - 2ab\\cos C\\)"
      },
      {
        "l": "المدى الرئيسي للدالة \\(\\arccos x\\)",
        "r": "\\([0, \\pi]\\)"
      },
      {
        "l": "دورة الدالة \\(4\\sin(4x)\\)",
        "r": "\\(\\dfrac{2\\pi}{4}\\)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Sinusoidal Amplitude, Period & Exact Ratios (AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus)",
    "ti_ar": "إدخال رقمي: السعة والدورة والنسب المثلثية (مسار التحليل والتقاربات (AA SL) — ذات الحدين والبرهان والمثلثات والتفاضل التحليلي)",
    "q": "State the amplitude of \\(y = -4\\cos(4x)\\):",
    "q_ar": "اذكر سعة الدالة \\(y = -4\\cos(4x)\\):",
    "a": "4",
    "ex": "Amplitude is |A| > 0. Answer: \\(4\\).",
    "ex_ar": "السعة تساوي القيمة المطلقة |A|. الإجابة: \\(4\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving a Triangle via Cosine & Sine Rules (AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus)",
    "ti_ar": "ترتيب الخطوات: حل مثلث بقانوني جيب التمام والجيب (مسار التحليل والتقاربات (AA SL) — ذات الحدين والبرهان والمثلثات والتفاضل التحليلي)",
    "prompt": "Given SAS data (sides \\(a, b\\) and included angle \\(C\\)), order the steps to solve \\(\\triangle ABC\\):",
    "prompt_ar": "بمعلومية ضلعين والزاوية المحصورة \\((a, b, C)\\)، رتّب خطوات حل المثلث \\(\\triangle ABC\\):",
    "items": [
      "Compute \\(c^2 = a^2 + b^2 - 2ab\\cos C\\) using the Cosine Rule.",
      "Take the positive square root \\(c = \\sqrt{c^2}\\).",
      "Apply the Sine Rule (or Cosine Rule) to find the smaller remaining angle first (avoiding obtuse ambiguity).",
      "Subtract the two known angles from \\(180^\\circ\\) to obtain the third angle."
    ],
    "items_ar": [
      "حساب \\(c^2 = a^2 + b^2 - 2ab\\cos C\\) بقانون جيب التمام.",
      "أخذ الجذر الموجب لإيجاد الضلع الثالث \\(c\\).",
      "استعمال قانون الجيب لإيجاد الزاوية المقابلة للضلع الأصغر لتجنب التباس الزاوية المنفرجة.",
      "طرح مجموع الزاويتين من \\(180^\\circ\\) لإيجاد الزاوية الثالثة."
    ],
    "ex": "Cosine Rule for third side → smaller angle via Sine Rule → angle sum 180°.",
    "ex_ar": "قانون جيب التمام للضلع الثالث ← الزاوية الصغرى بقانون الجيب ← مجموع زوايا المثلث 180°."
  },
  {
    "t": "cat",
    "ti": "Categorize: Sign of Trigonometric Ratios in Quadrant II (AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus)",
    "ti_ar": "تصنيف: إشارة النسب المثلثية في الربع الثاني (مسار التحليل والتقاربات (AA SL) — ذات الحدين والبرهان والمثلثات والتفاضل التحليلي)",
    "categories": [
      "Positive in Quadrant II",
      "Negative in Quadrant II"
    ],
    "categories_ar": [
      "موجبة في الربع الثاني",
      "سالبة في الربع الثاني"
    ],
    "items": [
      {
        "s": "\\(\\sin\\theta\\) and \\(\\csc\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(\\cos\\theta\\) and \\(\\sec\\theta\\)",
        "cat": 1
      },
      {
        "s": "\\(\\tan\\theta\\) and \\(\\cot\\theta\\)",
        "cat": 1
      }
    ],
    "items_ar": [
      {
        "s": "\\(\\sin\\theta\\) و\\(\\csc\\theta\\)",
        "cat": 0
      },
      {
        "s": "\\(\\cos\\theta\\) و\\(\\sec\\theta\\)",
        "cat": 1
      },
      {
        "s": "\\(\\tan\\theta\\) و\\(\\cot\\theta\\)",
        "cat": 1
      }
    ],
    "ex": "In Quadrant II (\\(x < 0, y > 0\\)), only \\(\\sin\\theta\\) and \\(\\csc\\theta\\) are positive.",
    "ex_ar": "في الربع الثاني (\\(x < 0, y > 0\\)) يكون الجيب وقاطع التمام فقط موجبين."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Quadrant Sign & Dividing by \\(\\sin\\theta\\) (AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus)",
    "ti_ar": "اكتشف الخطأ: إشارة الربع والقسمة على \\(\\sin\\theta\\) (مسار التحليل والتقاربات (AA SL) — ذات الحدين والبرهان والمثلثات والتفاضل التحليلي)",
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
    "ti": "Examiner Mode: Quadrant Identities & Cosine Rule (AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus)",
    "ti_ar": "وضع المصحح: المتطابقات المثلثية وقانون جيب التمام (مسار التحليل والتقاربات (AA SL) — ذات الحدين والبرهان والمثلثات والتفاضل التحليلي)",
    "q": "Suppose \\(\\sin\\theta = \\dfrac{8}{17}\\) with \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (Quadrant II). (a) Find exact values of \\(\\cos\\theta\\) and \\(\\tan\\theta\\). (b) Evaluate \\(\\sin(2\\theta)\\).",
    "q_ar": "إذا كان \\(\\sin\\theta = \\dfrac{8}{17}\\) حيث \\(\\theta \\in \\left(\\frac{\\pi}{2}, \\pi\\right)\\) (الربع الثاني). (أ) أوجد القيمة الدقيقة لكل من \\(\\cos\\theta\\) و\\(\\tan\\theta\\). (ب) احسب \\(\\sin(2\\theta)\\).",
    "parts": [
      {
        "label": "Part (a) — Quadrant II Cosine & Tangent",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "\\(\\cos^2\\theta = 1 - \\frac{64}{289} = \\frac{225}{289}\\), negative in QII \\(\\implies \\cos\\theta = -\\frac{15}{17}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = -\\frac{8}{15}\\)."
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
            "text": "\\(\\sin(2\\theta) = 2\\left(\\frac{8}{17}\\right)\\left(-\\frac{15}{17}\\right) = -\\frac{240}{289}\\)."
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
            "text": "في الربع الثاني \\(\\cos\\theta < 0\\) ومن متطابقة فيثاغورس \\(\\cos\\theta = -\\frac{15}{17}\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "\\(\\tan\\theta = -\\frac{8}{15}\\)."
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
            "text": "\\(\\sin(2\\theta) = -\\frac{240}{289}\\)."
          }
        ]
      }
    ]
  },
  {
    "t": "sb",
    "ti": "Step Builder: Sinusoidal Amplitude, Period & Exact Ratios (AA SL — Binomial Theorem, Proof, Radian Trigonometry & Analytical Calculus)",
    "ti_ar": "بناء الخطوات: السعة والدورة والنسب المثلثية (مسار التحليل والتقاربات (AA SL) — ذات الحدين والبرهان والمثلثات والتفاضل التحليلي)",
    "steps": [
      {
        "l": "State the amplitude of \\(y = -4\\cos(4x)\\):",
        "a": "4",
        "h": "Amplitude is |A| > 0."
      },
      {
        "l": "If \\(\\tan\\theta = \\frac{8}{15}\\) for acute \\(\\theta\\), find \\(\\sec\\theta\\) numerator over \\(15\\):",
        "a": "17",
        "h": "Hypotenuse of (8, 15) right triangle."
      },
      {
        "l": "Convert \\(\\pi / 3\\) radians into degrees:",
        "a": "60",
        "h": "Multiply 180 by 1/3."
      }
    ],
    "steps_ar": [
      {
        "l": "اذكر سعة الدالة \\(y = -4\\cos(4x)\\):",
        "a": "4",
        "h": "السعة تساوي القيمة المطلقة |A|."
      },
      {
        "l": "إذا كان \\(\\tan\\theta = \\frac{8}{15}\\) لزاوية حادة، فما بسط \\(\\sec\\theta\\) المقامه \\(15\\)؟",
        "a": "17",
        "h": "وتر المثلث القائم ذي الضلعين 8 و15."
      },
      {
        "l": "حوّل \\(\\pi / 3\\) راديان إلى درجات:",
        "a": "60",
        "h": "احسب 180 ÷ 3."
      }
    ]
  }
];
});
