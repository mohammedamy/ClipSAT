/* Interactive Practice data for /calculus/ - one entry per chapter section id.
   Shipped as public/js/ix/calculus.js and loaded only on that track's page by the
   engine in src/scripts/modules/19-interactive-activities-engine-v1.js
   (Plan 5 Phase 5.015, ADR 0033). Entry shapes (qc/mt/tf/sb/sr/fn/num/ord/cat/gp/se/ms) are
   documented there. */
(window.__ixData = window.__ixData || []).push(function (D) {
D["ch-foundations"] = [
  {
    "t": "qc",
    "ti": "Quick Check: Algebra Fundamentals",
    "q": "Simplify \\(\\dfrac{x^2-9}{x-3}\\) for \\(x\\neq3\\)",
    "o": [
      "\\(x+3\\)",
      "\\(x-3\\)",
      "\\(x^2-3\\)",
      "\\(3\\)"
    ],
    "a": 0,
    "ex": "Factor: \\(x^2-9=(x+3)(x-3)\\). Cancel \\((x-3)\\) → \\(x+3\\).",
    "ti_ar": "فحص سريع: أساسيات الجبر",
    "q_ar": "بسّط المقدار \\(\\dfrac{x^2-9}{x-3}\\) لـ \\(x\\neq3\\)",
    "o_ar": [
      "\\(x+3\\)",
      "\\(x-3\\)",
      "\\(x^2-3\\)",
      "\\(3\\)"
    ],
    "ex_ar": "التحليل إلى عوامل: \\(x^2-9=(x+3)(x-3)\\). بالاختصار مع \\((x-3)\\) نحصل على \\(x+3\\)."
  },
  {
    "t": "mt",
    "ti": "Matching: Functions and Domains",
    "p": [
      {
        "l": "\\(f(x)=\\sqrt{x}\\)",
        "r": "[0, ∞)"
      },
      {
        "l": "\\(f(x)=\\frac{1}{x}\\)",
        "r": "x ≠ 0"
      },
      {
        "l": "\\(f(x)=\\ln x\\)",
        "r": "(0, ∞)"
      },
      {
        "l": "\\(f(x)=x^2\\)",
        "r": "(−∞, ∞)"
      }
    ],
    "ti_ar": "معمل المطابقة: الدوال ومجالاتها",
    "p_ar": [
      {
        "l": "\\(f(x)=\\sqrt{x}\\)",
        "r": "[0, ∞)"
      },
      {
        "l": "\\(f(x)=\\frac{1}{x}\\)",
        "r": "x ≠ 0"
      },
      {
        "l": "\\(f(x)=\\ln x\\)",
        "r": "(0, ∞)"
      },
      {
        "l": "\\(f(x)=x^2\\)",
        "r": "(−∞, ∞)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Parabola Vertex Minimum",
    "q": "Find the minimum value of \\(f(x) = (x - 3)^2 + 7\\).",
    "a": 7,
    "ex": "Since \\((x-3)^2 \\ge 0\\), the minimum value occurs at \\(x=3\\) and equals 7.",
    "ti_ar": "إدخال رقمي: القيمة الصغرى لرأس القطع المكافئ",
    "q_ar": "أوجد القيمة الصغرى للدالة \\(f(x) = (x - 3)^2 + 7\\).",
    "ex_ar": "بما أن \\((x-3)^2 \\ge 0\\)، فإن القيمة الصغرى تحدث عند \\(x=3\\) وتساوي 7."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Finding Domain of Rational Radical Function",
    "prompt": "Arrange the steps to find the domain of \\(f(x) = \\frac{\\sqrt{x - 2}}{x - 5}\\):",
    "items": [
      "Require radicand to be non-negative: \\(x - 2 \\ge 0 \\implies x \\ge 2\\).",
      "Identify denominator restriction: \\(x - 5 \\ne 0 \\implies x \\ne 5\\).",
      "Form the left interval component: \\([2, 5)\\).",
      "Form the right interval component excluding 5: \\((5, \\infty)\\).",
      "Combine into complete domain: \\([2, 5) \\cup (5, \\infty)\\)."
    ],
    "ex": "Radicand >= 0, denominator != 0, form intervals, and unite domain.",
    "ti_ar": "ترتيب الخطوات: إيجاد مجال دالة كسرية جذرية",
    "prompt_ar": "رتّب خطوات إيجاد مجال الدالة \\(f(x) = \\frac{\\sqrt{x - 2}}{x - 5}\\):",
    "items_ar": [
      "اشتراط أن يكون ما تحت الجذر غير سالب: \\(x - 2 \\ge 0 \\implies x \\ge 2\\).",
      "تحديد قيود المقام: \\(x - 5 \\ne 0 \\implies x \\ne 5\\).",
      "تكوين فترة الطرف الأيسر: \\([2, 5)\\).",
      "تكوين فترة الطرف الأيمن باستثناء 5: \\((5, \\infty)\\).",
      "الدمج في المجال الكامل: \\([2, 5) \\cup (5, \\infty)\\)."
    ],
    "ex_ar": "ما تحت الجذر >= 0، المقام != 0، تكوين الفترات واتحاد المجال."
  },
  {
    "t": "cat",
    "ti": "Categorize: Function Symmetry",
    "categories": [
      "Even Function f(-x) = f(x)",
      "Odd Function f(-x) = -f(x)"
    ],
    "items": [
      {
        "s": "\\(f(x) = x^2\\)",
        "cat": "Even Function f(-x) = f(x)"
      },
      {
        "s": "\\(f(x) = \\cos x\\)",
        "cat": "Even Function f(-x) = f(x)"
      },
      {
        "s": "Symmetric across the y-axis",
        "cat": "Even Function f(-x) = f(x)"
      },
      {
        "s": "\\(f(x) = x^3\\)",
        "cat": "Odd Function f(-x) = -f(x)"
      },
      {
        "s": "\\(f(x) = \\sin x\\)",
        "cat": "Odd Function f(-x) = -f(x)"
      },
      {
        "s": "Symmetric about the origin (rotational)",
        "cat": "Odd Function f(-x) = -f(x)"
      }
    ],
    "ex": "Even functions satisfy f(-x) = f(x); odd functions satisfy f(-x) = -f(x).",
    "ti_ar": "تصنيف: تماثل الدوال",
    "categories_ar": [
      "دالة زوجية f(-x) = f(x)",
      "دالة فردية f(-x) = -f(x)"
    ],
    "items_ar": [
      {
        "s": "\\(f(x) = x^2\\)",
        "cat": 0
      },
      {
        "s": "\\(f(x) = \\cos x\\)",
        "cat": 0
      },
      {
        "s": "متماثلة حول المحور الصادي y",
        "cat": 0
      },
      {
        "s": "\\(f(x) = x^3\\)",
        "cat": 1
      },
      {
        "s": "\\(f(x) = \\sin x\\)",
        "cat": 1
      },
      {
        "s": "متماثلة حول نقطة الأصل (تناظر دوراني)",
        "cat": 1
      }
    ],
    "ex_ar": "تحقق الدوال الزوجية f(-x) = f(x)؛ بينما تحقق الدوال الفردية f(-x) = -f(x)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Simplify Difference Quotient \\(\\dfrac{f(x+h)-f(x)}{h}\\) for \\(f(x)=x^2\\)",
    "steps": [
      "Write the difference quotient: \\(\\dfrac{(x+h)^2 - x^2}{h}\\).",
      "Expand the squared binomial in the numerator: \\(\\dfrac{x^2 + 2xh + h^2 - x^2}{h}\\).",
      "Cancel opposite terms \\(x^2 - x^2 = 0\\), leaving \\(\\dfrac{2xh + h^2}{h}\\).",
      "Factor out \\(h\\) and divide: \\(\\dfrac{h(2x+h)}{h} = 2x + h\\)."
    ],
    "ti_ar": "مثال محلول: تبسيط خارج قسمة الفروق \\(\\dfrac{f(x+h)-f(x)}{h}\\) لـ \\(f(x)=x^2\\)",
    "steps_ar": [
      "كتابة خارج قسمة الفروق: \\(\\dfrac{(x+h)^2 - x^2}{h}\\).",
      "فك المربع الكامل في البسط: \\(\\dfrac{x^2 + 2xh + h^2 - x^2}{h}\\).",
      "حذف الحدود المتعاكسة \\(x^2 - x^2 = 0\\)، ليبقى \\(\\dfrac{2xh + h^2}{h}\\).",
      "أخذ \\(h\\) عاملاً مشتركاً والاختصار: \\(\\dfrac{h(2x+h)}{h} = 2x + h\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Foundations &amp; Precalculus Review)",
    "q": "A student differentiates the implicit curve \\(x^2 + 3xy + y^2 = -5\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(3xy\\) with respect to \\(x\\) as \\(3\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(-5\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(3xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(3y + 3x\\dfrac{dy}{dx}\\), not \\(3\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(-5\\) remains \\(-5\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(3xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(3xy\\) gives \\(3y + 3x\\dfrac{dy}{dx}\\). Thus \\(2x + 3y + (3x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Foundations &amp; Precalculus Review)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 3xy + y^2 = -5\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(3xy\\) بالنسبة إلى \\(x\\) على أنه \\(3\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(3xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(3y + 3x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(3xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(3xy\\) نحصل على \\(3y + 3x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Foundations &amp; Precalculus Review)",
    "q": "Consider the curve \\(y = 3x^3 + x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 0\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 9x^2 - -2x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 0\\): \\(m = 9(0)^2 - -2(0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 2\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(9x - -2) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{-2}{9}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Foundations &amp; Precalculus Review)",
    "q_ar": "لمنحنى الدالة \\(y = 3x^3 + x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 0\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Foundations &amp; Precalculus Review)",
    "steps": [
      {
        "l": "Given \\(f(x) = 3x^2 - x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "6",
        "h": "Multiply power 2 by 3."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "-1",
        "h": "The derivative of -x is -1."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(0) =\\)",
        "a": "-1",
        "h": "Compute 6(0) + -1."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Foundations &amp; Precalculus Review)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 3x^2 - x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "اضرب الأس 2 في 3."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "-1",
        "h": "مشتقة -x هي -1."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(0) =\\)",
        "a": "-1",
        "h": "احسب 6(0) + -1."
      }
    ]
  }
];

D["ch-limits"] = [
  {
    "t": "mt",
    "ti": "Matching: Limit Laws",
    "p": [
      {
        "l": "\\(\\lim[f+g]\\)",
        "r": "L + M"
      },
      {
        "l": "\\(\\lim[f\\cdot g]\\)",
        "r": "L · M"
      },
      {
        "l": "\\(\\lim\\,k\\)",
        "r": "k"
      },
      {
        "l": "\\(\\lim[f/g]\\)",
        "r": "L/M (M≠0)"
      }
    ],
    "ti_ar": "معمل المطابقة: قوانين النهايات",
    "p_ar": [
      {
        "l": "\\(\\lim[f+g]\\)",
        "r": "L + M"
      },
      {
        "l": "\\(\\lim[f\\cdot g]\\)",
        "r": "L · M"
      },
      {
        "l": "\\(\\lim\\,k\\)",
        "r": "k"
      },
      {
        "l": "\\(\\lim[f/g]\\)",
        "r": "L/M (M≠0)"
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Evaluating Indeterminate Limit",
    "q": "Evaluate \\(\\displaystyle\\lim_{x\\to 3}\\frac{x^2 - 9}{x - 3}\\).",
    "a": 6,
    "ex": "Factor numerator as \\((x-3)(x+3)\\). Cancel \\((x-3)\\) to get \\(\\lim_{x\\to 3}(x+3) = 6\\).",
    "ti_ar": "إدخال رقمي: حساب نهاية صيغة غير معينة",
    "q_ar": "احسب قيمة \\(\\displaystyle\\lim_{x\\to 3}\\frac{x^2 - 9}{x - 3}\\).",
    "ex_ar": "تحليل البسط إلى \\((x-3)(x+3)\\). بالاختصار مع \\((x-3)\\) نحصل على \\(\\lim_{x\\to 3}(x+3) = 6\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Evaluating Conjugate Limit",
    "prompt": "Arrange the steps to evaluate \\(\\lim_{x\\to 4}\\frac{\\sqrt{x} - 2}{x - 4}\\):",
    "items": [
      "Direct substitution gives 0/0, confirming an indeterminate form.",
      "Multiply numerator and denominator by conjugate \\(\\sqrt{x} + 2\\).",
      "Expand numerator difference of squares to \\(x - 4\\).",
      "Cancel common factor \\(x - 4\\) leaving \\(\\frac{1}{\\sqrt{x} + 2}\\).",
      "Substitute \\(x = 4\\) to obtain limit value \\(\\frac{1}{4}\\)."
    ],
    "ex": "Identify 0/0, multiply by conjugate, simplify numerator, cancel factor, substitute.",
    "ti_ar": "ترتيب الخطوات: حساب النهاية بالضرب في المرافق",
    "prompt_ar": "رتّب خطوات حساب النهاية \\(\\lim_{x\\to 4}\\frac{\\sqrt{x} - 2}{x - 4}\\):",
    "items_ar": [
      "التعويض المباشر يعطي 0/0، مما يؤكد أنها صيغة غير معينة.",
      "ضرب البسط والمقام في المرافق \\(\\sqrt{x} + 2\\).",
      "فك فرق المربعين في البسط للحصول على \\(x - 4\\).",
      "اختصار العامل المشترك \\(x - 4\\) ليبقى \\(\\frac{1}{\\sqrt{x} + 2}\\).",
      "التعويض بـ \\(x = 4\\) للحصول على قيمة النهاية \\(\\frac{1}{4}\\)."
    ],
    "ex_ar": "تحديد 0/0، الضرب في المرافق، تبسيط البسط، اختصار العامل، والتعويض."
  },
  {
    "t": "cat",
    "ti": "Categorize: Limit Evaluation Forms",
    "categories": [
      "Determinate Form",
      "Indeterminate Form (Requires Work)"
    ],
    "items": [
      {
        "s": "\\(\\frac{5}{2}\\)",
        "cat": "Determinate Form"
      },
      {
        "s": "\\(\\frac{0}{7} = 0\\)",
        "cat": "Determinate Form"
      },
      {
        "s": "\\(\\frac{4}{0}\\) (Vertical asymptote)",
        "cat": "Determinate Form"
      },
      {
        "s": "\\(\\frac{0}{0}\\)",
        "cat": "Indeterminate Form (Requires Work)"
      },
      {
        "s": "\\(\\frac{\\infty}{\\infty}\\)",
        "cat": "Indeterminate Form (Requires Work)"
      },
      {
        "s": "\\(0 \\times \\infty\\)",
        "cat": "Indeterminate Form (Requires Work)"
      }
    ],
    "ex": "0/0 and inf/inf are indeterminate forms requiring algebraic simplification or L'Hôpital.",
    "ti_ar": "تصنيف: صيغ حساب النهايات",
    "categories_ar": [
      "صيغة معينة",
      "صيغة غير معينة (تتطلب تبسيطاً)"
    ],
    "items_ar": [
      {
        "s": "\\(\\frac{5}{2}\\)",
        "cat": 0
      },
      {
        "s": "\\(\\frac{0}{7} = 0\\)",
        "cat": 0
      },
      {
        "s": "\\(\\frac{4}{0}\\) (خط تقارب رأسي)",
        "cat": 0
      },
      {
        "s": "\\(\\frac{0}{0}\\)",
        "cat": 1
      },
      {
        "s": "\\(\\frac{\\infty}{\\infty}\\)",
        "cat": 1
      },
      {
        "s": "\\(0 \\times \\infty\\)",
        "cat": 1
      }
    ],
    "ex_ar": "0/0 و inf/inf هما صيغتان غير معينتين تتطلبان تبسيطاً جبرياً أو استخدام قاعدة لوبيتال."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Evaluate \\(\\displaystyle\\lim_{x\\to4}\\dfrac{\\sqrt{x}-2}{x-4}\\)",
    "steps": [
      "Direct substitution gives \\(\\dfrac{0}{0}\\) — an indeterminate form, so we need another approach.",
      "Multiply numerator and denominator by the conjugate \\(\\sqrt{x}+2\\): \\(\\dfrac{(\\sqrt{x}-2)(\\sqrt{x}+2)}{(x-4)(\\sqrt{x}+2)}\\).",
      "The numerator becomes \\(x-4\\) (difference of squares), which cancels with \\((x-4)\\) in the denominator, leaving \\(\\dfrac{1}{\\sqrt{x}+2}\\).",
      "Now substitute \\(x=4\\) directly: \\(\\dfrac{1}{\\sqrt{4}+2}=\\dfrac{1}{4}\\)."
    ],
    "ti_ar": "مثال محلول: حساب النهاية \\(\\displaystyle\\lim_{x\\to4}\\dfrac{\\sqrt{x}-2}{x-4}\\)",
    "steps_ar": [
      "التعويض المباشر يعطي \\(\\dfrac{0}{0}\\) — صيغة غير معينة، لذلك نحتاج إلى طريقة أخرى.",
      "ضرب البسط والمقام في المرافق \\(\\sqrt{x}+2\\): \\(\\dfrac{(\\sqrt{x}-2)(\\sqrt{x}+2)}{(x-4)(\\sqrt{x}+2)}\\).",
      "يصبح البسط \\(x-4\\) (فرق مربعين)، والذي يختصر مع \\((x-4)\\) في المقام، متبقياً \\(\\dfrac{1}{\\sqrt{x}+2}\\).",
      "الآن نعوض بـ \\(x=4\\) مباشرة: \\(\\dfrac{1}{\\sqrt{4}+2}=\\dfrac{1}{4}\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Limits &amp; Continuity)",
    "q": "A student differentiates the implicit curve \\(x^2 + 5xy + y^2 = 20\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(5xy\\) with respect to \\(x\\) as \\(5\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(20\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(5xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(5y + 5x\\dfrac{dy}{dx}\\), not \\(5\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(20\\) remains \\(20\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(5xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(5xy\\) gives \\(5y + 5x\\dfrac{dy}{dx}\\). Thus \\(2x + 5y + (5x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 5y}{5x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Limits &amp; Continuity)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 5xy + y^2 = 20\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(5xy\\) بالنسبة إلى \\(x\\) على أنه \\(5\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(5xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(5y + 5x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(5xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(5xy\\) نحصل على \\(5y + 5x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 5y}{5x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Limits &amp; Continuity)",
    "q": "Consider the curve \\(y = 5x^3 - 4x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 3\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 15x^2 - 8x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 3\\): \\(m = 15(3)^2 - 8(3)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 127\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(15x - 8) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{8}{15}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Limits &amp; Continuity)",
    "q_ar": "لمنحنى الدالة \\(y = 5x^3 - 4x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 3\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Limits &amp; Continuity)",
    "steps": [
      {
        "l": "Given \\(f(x) = 5x^2 + 4x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "10",
        "h": "Multiply power 2 by 5."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "4",
        "h": "The derivative of 4x is 4."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(3) =\\)",
        "a": "34",
        "h": "Compute 10(3) + 4."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Limits &amp; Continuity)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 5x^2 + 4x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "10",
        "h": "اضرب الأس 2 في 5."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "4",
        "h": "مشتقة 4x هي 4."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(3) =\\)",
        "a": "34",
        "h": "احسب 10(3) + 4."
      }
    ]
  }
];

D["ch-derivatives"] = [
  {
    "t": "tf",
    "ti": "True or False: Derivative Rules",
    "items": [
      {
        "s": "\\(\\frac{d}{dx}x^n=nx^{n-1}\\)",
        "a": true,
        "ex": "Power Rule — correct."
      },
      {
        "s": "\\(\\frac{d}{dx}\\sin x=-\\cos x\\)",
        "a": false,
        "ex": "\\(\\frac{d}{dx}\\sin x=+\\cos x\\)."
      },
      {
        "s": "\\(\\frac{d}{dx}e^x=e^x\\)",
        "a": true,
        "ex": "Exponential is its own derivative."
      },
      {
        "s": "\\(\\frac{d}{dx}\\ln x=\\frac{1}{x^2}\\)",
        "a": false,
        "ex": "\\(\\frac{d}{dx}\\ln x=\\frac{1}{x}\\)."
      }
    ],
    "ti_ar": "صح أم خطأ: قواعد الاشتقاق",
    "items_ar": [
      {
        "s": "\\(\\frac{d}{dx}x^n=nx^{n-1}\\)",
        "ex": "قاعدة القوى — صحيحة."
      },
      {
        "s": "\\(\\frac{d}{dx}\\sin x=-\\cos x\\)",
        "ex": "\\(\\frac{d}{dx}\\sin x=+\\cos x\\)."
      },
      {
        "s": "\\(\\frac{d}{dx}e^x=e^x\\)",
        "ex": "الدالة الأسية هي مشتقة نفسها."
      },
      {
        "s": "\\(\\frac{d}{dx}\\ln x=\\frac{1}{x^2}\\)",
        "ex": "\\(\\frac{d}{dx}\\ln x=\\frac{1}{x}\\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Polynomial Derivative Value",
    "q": "For \\(y = x^4 - 2x^2 + 5\\), evaluate \\(\\frac{dy}{dx}\\) at \\(x = 2\\).",
    "a": 24,
    "ex": "\\(\\frac{dy}{dx} = 4x^3 - 4x\\). At \\(x = 2\\): \\(4(8) - 4(2) = 32 - 8 = 24\\).",
    "ti_ar": "إدخال رقمي: قيمة مشتقة كثيرة حدود",
    "q_ar": "للدالة \\(y = x^4 - 2x^2 + 5\\)، احسب \\(\\frac{dy}{dx}\\) عند \\(x = 2\\).",
    "ex_ar": "\\(\\frac{dy}{dx} = 4x^3 - 4x\\). عند \\(x = 2\\): \\(4(8) - 4(2) = 32 - 8 = 24\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Differentiating via Product and Chain Rules",
    "prompt": "Arrange the steps to differentiate \\(y = x^3\\sin(2x)\\):",
    "items": [
      "Identify factors: \\(u = x^3\\) and \\(v = \\sin(2x)\\).",
      "Differentiate first factor: \\(u' = 3x^2\\).",
      "Differentiate second factor via chain rule: \\(v' = 2\\cos(2x)\\).",
      "Assemble product rule formula: \\(u'v + uv' = 3x^2\\sin(2x) + x^3(2\\cos(2x))\\).",
      "Factor out greatest common factor: \\(x^2(3\\sin(2x) + 2x\\cos(2x))\\)."
    ],
    "ex": "Split factors, differentiate each, apply product rule, and factor.",
    "ti_ar": "ترتيب الخطوات: الاشتقاق باستخدام قاعدتي الضرب والسلسلة",
    "prompt_ar": "رتّب خطوات اشتقاق الدالة \\(y = x^3\\sin(2x)\\):",
    "items_ar": [
      "تحديد العاملين: \\(u = x^3\\) و \\(v = \\sin(2x)\\).",
      "اشتقاق العامل الأول: \\(u' = 3x^2\\).",
      "اشتقاق العامل الثاني بقاعدة السلسلة: \\(v' = 2\\cos(2x)\\).",
      "تطبيق صيغة قاعدة الضرب: \\(u'v + uv' = 3x^2\\sin(2x) + x^3(2\\cos(2x))\\).",
      "أخذ العامل المشترك الأكبر: \\(x^2(3\\sin(2x) + 2x\\cos(2x))\\)."
    ],
    "ex_ar": "فصل العوامل، اشتقاق كل عامل، تطبيق قاعدة الضرب، وأخذ العامل المشترك."
  },
  {
    "t": "cat",
    "ti": "Categorize: Signs of Basic Derivatives",
    "categories": [
      "Positive Sign",
      "Negative Sign"
    ],
    "items": [
      {
        "s": "\\(\\frac{d}{dx}(\\sin x) = \\cos x\\)",
        "cat": "Positive Sign"
      },
      {
        "s": "\\(\\frac{d}{dx}(e^x) = e^x\\)",
        "cat": "Positive Sign"
      },
      {
        "s": "\\(\\frac{d}{dx}(\\tan x) = \\sec^2 x\\)",
        "cat": "Positive Sign"
      },
      {
        "s": "\\(\\frac{d}{dx}(\\cos x) = -\\sin x\\)",
        "cat": "Negative Sign"
      },
      {
        "s": "\\(\\frac{d}{dx}(\\cot x) = -\\csc^2 x\\)",
        "cat": "Negative Sign"
      },
      {
        "s": "\\(\\frac{d}{dx}(\\csc x) = -\\csc x\\cot x\\)",
        "cat": "Negative Sign"
      }
    ],
    "ex": "All co-functions in trigonometry have negative derivatives.",
    "ti_ar": "تصنيف: إشارات المشتقات الأساسية",
    "categories_ar": [
      "إشارة موجبة",
      "إشارة سالبة"
    ],
    "items_ar": [
      {
        "s": "\\(\\frac{d}{dx}(\\sin x) = \\cos x\\)",
        "cat": 0
      },
      {
        "s": "\\(\\frac{d}{dx}(e^x) = e^x\\)",
        "cat": 0
      },
      {
        "s": "\\(\\frac{d}{dx}(\\tan x) = \\sec^2 x\\)",
        "cat": 0
      },
      {
        "s": "\\(\\frac{d}{dx}(\\cos x) = -\\sin x\\)",
        "cat": 1
      },
      {
        "s": "\\(\\frac{d}{dx}(\\cot x) = -\\csc^2 x\\)",
        "cat": 1
      },
      {
        "s": "\\(\\frac{d}{dx}(\\csc x) = -\\csc x\\cot x\\)",
        "cat": 1
      }
    ],
    "ex_ar": "جميع الدوال المثلثية التي تبدأ بـ co مشتقاتها سالبة."
  },
  {
    "t": "qc",
    "ti": "Quick Check: Chain Rule",
    "q": "Find \\(\\frac{d}{dx}(3x^2-1)^4\\):",
    "o": [
      "\\(24x(3x^2-1)^3\\)",
      "\\(4(3x^2-1)^3\\)",
      "\\(12x(3x^2-1)^3\\)",
      "\\(6x(3x^2-1)^4\\)"
    ],
    "a": 0,
    "ex": "By the chain rule: \\(4(3x^2-1)^3\\cdot\\frac{d}{dx}(3x^2-1)=4(3x^2-1)^3(6x)=24x(3x^2-1)^3\\).",
    "ti_ar": "فحص سريع: قاعدة السلسلة",
    "q_ar": "أوجد \\(\\frac{d}{dx}(3x^2-1)^4\\):",
    "o_ar": [
      "\\(24x(3x^2-1)^3\\)",
      "\\(4(3x^2-1)^3\\)",
      "\\(12x(3x^2-1)^3\\)",
      "\\(6x(3x^2-1)^4\\)"
    ],
    "ex_ar": "بقاعدة السلسلة: \\(4(3x^2-1)^3\\cdot\\frac{d}{dx}(3x^2-1)=4(3x^2-1)^3(6x)=24x(3x^2-1)^3\\)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Differentiate \\(y=x^2\\sin x\\)",
    "steps": [
      "Identify the two factors: \\(u=x^2\\) and \\(v=\\sin x\\).",
      "Differentiate each on its own: \\(u'=2x\\) and \\(v'=\\cos x\\).",
      "Apply the Product Rule: \\((uv)'=u'v+uv'\\).",
      "Substitute: \\(y'=2x\\sin x+x^2\\cos x\\)."
    ],
    "ti_ar": "مثال محلول: اشتقاق \\(y=x^2\\sin x\\)",
    "steps_ar": [
      "تحديد العاملين: \\(u=x^2\\) و \\(v=\\sin x\\).",
      "اشتقاق كل عامل على حدة: \\(u'=2x\\) و \\(v'=\\cos x\\).",
      "تطبيق قاعدة الضرب: \\((uv)'=u'v+uv'\\).",
      "التعويض: \\(y'=2x\\sin x+x^2\\cos x\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Derivatives)",
    "q": "A student differentiates the implicit curve \\(x^2 + 3xy + y^2 = -5\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(3xy\\) with respect to \\(x\\) as \\(3\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(-5\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(3xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(3y + 3x\\dfrac{dy}{dx}\\), not \\(3\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(-5\\) remains \\(-5\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(3xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(3xy\\) gives \\(3y + 3x\\dfrac{dy}{dx}\\). Thus \\(2x + 3y + (3x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Derivatives)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 3xy + y^2 = -5\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(3xy\\) بالنسبة إلى \\(x\\) على أنه \\(3\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(3xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(3y + 3x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(3xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(3xy\\) نحصل على \\(3y + 3x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Derivatives)",
    "q": "Consider the curve \\(y = 3x^3 + x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 1\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 9x^2 - -2x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 1\\): \\(m = 9(1)^2 - -2(1)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 11\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(9x - -2) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{-2}{9}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Derivatives)",
    "q_ar": "لمنحنى الدالة \\(y = 3x^3 + x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 1\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Derivatives)",
    "steps": [
      {
        "l": "Given \\(f(x) = 3x^2 - x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "6",
        "h": "Multiply power 2 by 3."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "-1",
        "h": "The derivative of -x is -1."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(1) =\\)",
        "a": "5",
        "h": "Compute 6(1) + -1."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Derivatives)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 3x^2 - x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "اضرب الأس 2 في 3."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "-1",
        "h": "مشتقة -x هي -1."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(1) =\\)",
        "a": "5",
        "h": "احسب 6(1) + -1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Derivatives)",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Derivatives)",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];

D["ch-integrals"] = [
  {
    "t": "sb",
    "ti": "Step Builder: Evaluate \\(\\displaystyle\\int_0^2 3x^2\\,dx\\)",
    "steps": [
      {
        "l": "Antiderivative of \\(3x^2\\):",
        "a": "x^3",
        "h": "Power rule: \\(3\\cdot\\frac{x^3}{3}=x^3\\)"
      },
      {
        "l": "At upper limit \\(x=2\\): \\(2^3=\\)",
        "a": "8",
        "h": "Evaluate the power \\(2^3\\) by multiplying \\(2\\) by itself \\(3\\) times."
      },
      {
        "l": "At lower limit \\(x=0\\): \\(0^3=\\)",
        "a": "0",
        "h": "Evaluate the power \\(0^3\\) by multiplying \\(0\\) by itself \\(3\\) times."
      },
      {
        "l": "Answer \\(F(2)-F(0)=\\)",
        "a": "8",
        "h": "\\(8-0=8\\)"
      }
    ],
    "ti_ar": "بناء الخطوات: حساب \\(\\displaystyle\\int_0^2 3x^2\\,dx\\)",
    "steps_ar": [
      {
        "l": "المشتقة العكسية لـ \\(3x^2\\):",
        "a": "x^3",
        "h": "قاعدة القوى: 3·(x³/3) = x³"
      },
      {
        "l": "عند الحد العلوي \\(x=2\\): \\(2^3=\\)",
        "a": "8",
        "h": "احسب القوة \\(2^3\\) بضرب \\(2\\) في نفسه \\(3\\) مرات."
      },
      {
        "l": "عند الحد السفلي \\(x=0\\): \\(0^3=\\)",
        "a": "0",
        "h": "احسب القوة \\(0^3\\) بضرب \\(0\\) في نفسه \\(3\\) مرات."
      },
      {
        "l": "الناتج \\(F(2)-F(0)=\\)",
        "a": "8",
        "h": "احسب قيمة المقدار \\(8 - 0\\)."
      }
    ]
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Definite Integral Evaluation",
    "q": "Evaluate \\(\\displaystyle\\int_0^3 4x\\,dx\\).",
    "a": 18,
    "ex": "Antiderivative is \\(2x^2\\). Evaluating: \\(2(3^2) - 2(0^2) = 18 - 0 = 18\\).",
    "ti_ar": "إدخال رقمي: حساب تكامل محدد",
    "q_ar": "احسب قيمة \\(\\displaystyle\\int_0^3 4x\\,dx\\).",
    "ex_ar": "المشتقة العكسية هي \\(2x^2\\). بالتعويض: \\(2(3^2) - 2(0^2) = 18 - 0 = 18\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: U-Substitution on \\(\\int 2x\\sqrt{x^2 + 4}\\,dx\\)",
    "prompt": "Arrange the steps to integrate using substitution:",
    "items": [
      "Set substitution for inner function: \\(u = x^2 + 4\\).",
      "Calculate differential: \\(du = 2x\\,dx\\).",
      "Rewrite in terms of u: \\(\\int u^{1/2}\\,du\\).",
      "Integrate via power rule: \\(\\frac{2}{3}u^{3/2} + C\\).",
      "Back-substitute u: \\(\\frac{2}{3}(x^2 + 4)^{3/2} + C\\)."
    ],
    "ex": "Choose u, compute du, substitute, apply power rule, and back-substitute.",
    "ti_ar": "ترتيب الخطوات: التكامل بالتعويض لـ \\(\\int 2x\\sqrt{x^2 + 4}\\,dx\\)",
    "prompt_ar": "رتّب خطوات التكامل باستخدام طريقة التعويض:",
    "items_ar": [
      "فرض التعويض للدالة الداخلية: \\(u = x^2 + 4\\).",
      "حساب التفاضل: \\(du = 2x\\,dx\\).",
      "إعادة كتابة التكامل بدلالة u: \\(\\int u^{1/2}\\,du\\).",
      "المكاملة باستخدام قاعدة القوى: \\(\\frac{2}{3}u^{3/2} + C\\).",
      "التعويض العكسي عن u: \\(\\frac{2}{3}(x^2 + 4)^{3/2} + C\\)."
    ],
    "ex_ar": "اختيار u، حساب du، التعويض، تطبيق قاعدة القوى، والتعويض العكسي."
  },
  {
    "t": "cat",
    "ti": "Categorize: Types of Integrals",
    "categories": [
      "Definite Integral",
      "Indefinite Integral"
    ],
    "items": [
      {
        "s": "Has upper and lower limits of integration \\(\\int_a^b\\)",
        "cat": "Definite Integral"
      },
      {
        "s": "Represents net signed area between curve and x-axis",
        "cat": "Definite Integral"
      },
      {
        "s": "Evaluates to a numerical value",
        "cat": "Definite Integral"
      },
      {
        "s": "Has no limits of integration \\(\\int f(x)\\,dx\\)",
        "cat": "Indefinite Integral"
      },
      {
        "s": "Represents an entire family of antiderivatives",
        "cat": "Indefinite Integral"
      },
      {
        "s": "Must include arbitrary constant \\(+ C\\)",
        "cat": "Indefinite Integral"
      }
    ],
    "ex": "Definite integrals have limits and yield values; indefinite integrals yield functions + C.",
    "ti_ar": "تصنيف: أنواع التكاملات",
    "categories_ar": [
      "تكامل محدد",
      "تكامل غير محدد"
    ],
    "items_ar": [
      {
        "s": "له حدان علوي وسفلي للتكامل \\(\\int_a^b\\)",
        "cat": 0
      },
      {
        "s": "يمثل صافي المساحة ذات الإشارة بين المنحنى ومحور x",
        "cat": 0
      },
      {
        "s": "يعطي في الناتج قيمة عددية",
        "cat": 0
      },
      {
        "s": "ليس له حدود تكامل \\(\\int f(x)\\,dx\\)",
        "cat": 1
      },
      {
        "s": "يمثل عائلة كاملة من المشتقات العكسية",
        "cat": 1
      },
      {
        "s": "يجب أن يتضمن الثابت الاختياري \\(+ C\\)",
        "cat": 1
      }
    ],
    "ex_ar": "التكاملات المحددة لها حدود وتعطي أعداداً؛ التكاملات غير المحددة تعطي دوالاً + C."
  },
  {
    "t": "sr",
    "ti": "Worked Example: U-Substitution \\(\\displaystyle\\int 2x(x^2+1)^3\\,dx\\)",
    "steps": [
      "Choose the substitution for the inner function: let \\(u = x^2 + 1\\).",
      "Compute the differential: \\(du = 2x\\,dx\\).",
      "Substitute into the integral: \\(\\int u^3\\,du\\).",
      "Integrate with the power rule: \\(\\dfrac{u^4}{4} + C\\).",
      "Back-substitute \\(u=x^2+1\\): \\(\\dfrac{(x^2+1)^4}{4} + C\\)."
    ],
    "ti_ar": "مثال محلول: التكامل بالتعويض \\(\\displaystyle\\int 2x(x^2+1)^3\\,dx\\)",
    "steps_ar": [
      "اختيار التعويض للدالة الداخلية: نفرض \\(u = x^2 + 1\\).",
      "حساب التفاضل: \\(du = 2x\\,dx\\).",
      "التعويض في التكامل: \\(\\int u^3\\,du\\).",
      "المكاملة بقاعدة القوى: \\(\\dfrac{u^4}{4} + C\\).",
      "التعويض العكسي عن \\(u=x^2+1\\): \\(\\dfrac{(x^2+1)^4}{4} + C\\)."
    ]
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Integrals)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 5xy\\) with \\(y(0) = 0\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{5x^2/2} + C\\).",
      "Substitute \\(x = 0, y = 0\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) yields \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{5x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{5x^2/2 + C} = e^C e^{5x^2/2} \\implies y = Ae^{5x^2/2}\\). Using \\(y(0) = 0\\) gives \\(A = 0\\), so \\(y = 0e^{5x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (Integrals)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 5xy\\) مع الشرط \\(y(0) = 0\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{5x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = 0\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) وليس \\(e^{5x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{5x^2/2}\\)، وبالتعويض عن \\(y(0)=0\\) نجد \\(y = 0e^{5x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Integrals)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 10x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 1\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{1} (3x^2 + 10x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 5x^2\\right]_0^{1}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Fundamental Theorem Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute upper and lower limits: \\((1^3 + 5(1)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(6\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (Integrals)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 10x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 1\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives & ODE Forms (Integrals)",
    "p": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (Integration by Parts)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "Multiply by integrating factor \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ],
    "ti_ar": "مطابقة: التكاملات القياسية والمعادلات التفاضلية (Integrals)",
    "p_ar": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (التكامل بالتجزيء)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "الضرب في عامل التكامل \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ]
  }
];

D["ch-ftc"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Evaluating Definite Integral via FTC",
    "q": "Evaluate \\(\\displaystyle\\int_1^3 (3x^2 - 2)\\,dx\\).",
    "a": 22,
    "ex": "Antiderivative \\(F(x) = x^3 - 2x\\). \\(F(3) = 27 - 6 = 21\\), \\(F(1) = 1 - 2 = -1\\). \\(F(3) - F(1) = 21 - (-1) = 22\\).",
    "ti_ar": "إدخال رقمي: حساب تكامل محدد بواسطة النظرية الأساسية",
    "q_ar": "احسب قيمة \\(\\displaystyle\\int_1^3 (3x^2 - 2)\\,dx\\).",
    "ex_ar": "المشتقة العكسية \\(F(x) = x^3 - 2x\\). \\(F(3) = 27 - 6 = 21\\)، و \\(F(1) = 1 - 2 = -1\\). إذن \\(F(3) - F(1) = 21 - (-1) = 22\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Differentiating Accumulation Function",
    "prompt": "Arrange the steps to differentiate \\(g(x) = \\int_1^{x^2} \\sin t\\,dt\\):",
    "items": [
      "Recognize form: \\(g(x) = \\int_1^{u(x)} f(t)\\,dt\\).",
      "Identify upper limit function: \\(u(x) = x^2\\).",
      "Compute derivative of upper limit: \\(u'(x) = 2x\\).",
      "Evaluate integrand at upper limit: \\(f(u(x)) = \\sin(x^2)\\).",
      "Multiply by inner derivative: \\(g'(x) = 2x\\sin(x^2)\\)."
    ],
    "ex": "Identify u(x), compute u'(x), evaluate f(u(x)), and multiply via chain rule.",
    "ti_ar": "ترتيب الخطوات: اشتقاق دالة التراكم",
    "prompt_ar": "رتّب خطوات اشتقاق الدالة \\(g(x) = \\int_1^{x^2} \\sin t\\,dt\\):",
    "items_ar": [
      "التعرف على الصورة: \\(g(x) = \\int_1^{u(x)} f(t)\\,dt\\).",
      "تحديد دالة الحد العلوي: \\(u(x) = x^2\\).",
      "حساب مشتقة الحد العلوي: \\(u'(x) = 2x\\).",
      "حساب قيمة دالة المكاملة عند الحد العلوي: \\(f(u(x)) = \\sin(x^2)\\).",
      "الضرب في المشتقة الداخلية: \\(g'(x) = 2x\\sin(x^2)\\)."
    ],
    "ex_ar": "تحديد u(x)، حساب مشتقتها، تعويضها في دالة المكاملة، والضرب بقاعدة السلسلة."
  },
  {
    "t": "cat",
    "ti": "Categorize: Parts of the Fundamental Theorem",
    "categories": [
      "FTC Part 1 (Derivative of Accumulation)",
      "FTC Part 2 (Evaluation via Antiderivative)"
    ],
    "items": [
      {
        "s": "\\(\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\)",
        "cat": "FTC Part 1 (Derivative of Accumulation)"
      },
      {
        "s": "Demonstrates that differentiation and integration are inverse processes",
        "cat": "FTC Part 1 (Derivative of Accumulation)"
      },
      {
        "s": "Requires chain rule factor \\(u'(x)\\) when limit is \\(u(x)\\)",
        "cat": "FTC Part 1 (Derivative of Accumulation)"
      },
      {
        "s": "\\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\)",
        "cat": "FTC Part 2 (Evaluation via Antiderivative)"
      },
      {
        "s": "Calculates exact area without taking limit of Riemann sums",
        "cat": "FTC Part 2 (Evaluation via Antiderivative)"
      },
      {
        "s": "Net change theorem: integral of rate is total change",
        "cat": "FTC Part 2 (Evaluation via Antiderivative)"
      }
    ],
    "ex": "FTC 1 differentiates accumulation functions; FTC 2 evaluates definite integrals.",
    "ti_ar": "تصنيف: أجزاء النظرية الأساسية للتفاضل والتكامل",
    "categories_ar": [
      "النظرية الأساسية الجزء 1 (مشتقة التراكم)",
      "النظرية الأساسية الجزء 2 (الحساب بالمشتقة العكسية)"
    ],
    "items_ar": [
      {
        "s": "\\(\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\)",
        "cat": 0
      },
      {
        "s": "توضح أن التفاضل والتكامل عمليتان عكسيتان",
        "cat": 0
      },
      {
        "s": "تتطلب معامل قاعدة السلسلة \\(u'(x)\\) عندما يكون الحد دالة \\(u(x)\\)",
        "cat": 0
      },
      {
        "s": "\\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\)",
        "cat": 1
      },
      {
        "s": "تحسب المساحة الدقيقة دون الحاجة لنهاية مجموع ريمان",
        "cat": 1
      },
      {
        "s": "نظرية التغير الصافي: تكامل المعدل يعطي إجمالي التغير",
        "cat": 1
      }
    ],
    "ex_ar": "الجزء 1 يشتق دوال التراكم؛ الجزء 2 يحسب قيم التكاملات المحددة."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Evaluate \\(\\displaystyle\\int_1^3(2x+1)\\,dx\\)",
    "steps": [
      "Find an antiderivative of \\(2x+1\\): \\(F(x)=x^2+x\\) (check: \\(F'(x)=2x+1\\) ✓).",
      "Evaluate at the upper limit: \\(F(3)=3^2+3=12\\).",
      "Evaluate at the lower limit: \\(F(1)=1^2+1=2\\).",
      "By the Fundamental Theorem, the integral equals \\(F(3)-F(1)=12-2=10\\)."
    ],
    "ti_ar": "مثال محلول: حساب \\(\\displaystyle\\int_1^3(2x+1)\\,dx\\)",
    "steps_ar": [
      "إيجاد مشتقة عكسية لـ \\(2x+1\\): \\(F(x)=x^2+x\\) (التحقق: \\(F'(x)=2x+1\\) ✓).",
      "التعويض عند الحد العلوي: \\(F(3)=3^2+3=12\\).",
      "التعويض عند الحد السفلي: \\(F(1)=1^2+1=2\\).",
      "وفقاً للنظرية الأساسية، يساوي التكامل \\(F(3)-F(1)=12-2=10\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: FTC",
    "q": "Evaluate \\(\\displaystyle\\int_0^{\\pi}\\sin x\\,dx\\)",
    "o": [
      "0",
      "1",
      "2",
      "−2"
    ],
    "a": 2,
    "ex": "\\([-\\cos x]_0^\\pi=-\\cos\\pi-(-\\cos0)=1+1=2\\).",
    "ti_ar": "فحص سريع: النظرية الأساسية",
    "q_ar": "احسب قيمة \\(\\displaystyle\\int_0^{\\pi}\\sin x\\,dx\\)",
    "o_ar": [
      "0",
      "1",
      "2",
      "−2"
    ],
    "ex_ar": "\\([-\\cos x]_0^\\pi=-\\cos\\pi-(-\\cos0)=1+1=2\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (The Fundamental Theorem)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 5xy\\) with \\(y(0) = 1\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{5x^2/2} + C\\).",
      "Substitute \\(x = 0, y = 1\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) yields \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{5x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{5x^2/2 + C} = e^C e^{5x^2/2} \\implies y = Ae^{5x^2/2}\\). Using \\(y(0) = 1\\) gives \\(A = 1\\), so \\(y = 1e^{5x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (The Fundamental Theorem)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 5xy\\) مع الشرط \\(y(0) = 1\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{5x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = 1\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) وليس \\(e^{5x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{5x^2/2}\\)، وبالتعويض عن \\(y(0)=1\\) نجد \\(y = 1e^{5x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (The Fundamental Theorem)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 10x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 0\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{0} (3x^2 + 10x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 5x^2\\right]_0^{0}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Fundamental Theorem Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute upper and lower limits: \\((0^3 + 5(0)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(0\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (The Fundamental Theorem)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 10x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 0\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (The Fundamental Theorem)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 5\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 5x",
        "h": "Integrate 2x to x^2 and 5 to 5x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(0) =\\)",
        "a": "0",
        "h": "Compute \\((0)^2 + 5\\)(0)."
      },
      {
        "l": "Hence state \\(\\int_0^{0} (2x + 5)\\,dx =\\)",
        "a": "0",
        "h": "Compute F(0) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (The Fundamental Theorem)",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 5\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 5x",
        "h": "كامل 2x إلى x^2 و 5 إلى 5x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(0) =\\)",
        "a": "0",
        "h": "احسب (0)^2 + 5(0)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{0} (2x + 5)\\,dx =\\)",
        "a": "0",
        "h": "اطرح F(0) - F(0)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives & ODE Forms (The Fundamental Theorem)",
    "p": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (Integration by Parts)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "Multiply by integrating factor \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ],
    "ti_ar": "مطابقة: التكاملات القياسية والمعادلات التفاضلية (The Fundamental Theorem)",
    "p_ar": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (التكامل بالتجزيء)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "الضرب في عامل التكامل \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ]
  }
];

D["ch-applications"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Finding Critical Number",
    "q": "Find the positive critical number of \\(f(x) = 2x^2 - 12x + 5\\).",
    "a": 3,
    "ex": "\\(f'(x) = 4x - 12 = 0 \\implies x = 3\\).",
    "ti_ar": "إدخال رقمي: إيجاد النقطة الحرجة",
    "q_ar": "أوجد العدد الحرج الموجب للدالة \\(f(x) = 2x^2 - 12x + 5\\).",
    "ex_ar": "\\(f'(x) = 4x - 12 = 0 \\implies x = 3\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving an Optimization Problem",
    "prompt": "Arrange the steps to find dimensions of maximum area with fixed perimeter:",
    "items": [
      "Draw a diagram and assign variable names for dimensions (x, y).",
      "Write the objective equation for area: \\(A = xy\\).",
      "Write constraint equation: \\(2x + y = P \\implies y = P - 2x\\).",
      "Substitute constraint into objective to express area in one variable \\(A(x)\\).",
      "Differentiate, set \\(A'(x) = 0\\), and verify maximum with second derivative test."
    ],
    "ex": "Diagram, objective function, constraint equation, single-variable model, differentiate and verify.",
    "ti_ar": "ترتيب الخطوات: حل مسألة أمثلية",
    "prompt_ar": "رتّب خطوات إيجاد أبعاد أكبر مساحة ممكنة مع محيط ثابت:",
    "items_ar": [
      "رسم مخطط وتحديد أسماء المتغيرات للأبعاد (x, y).",
      "كتابة معادلة الهدف للمساحة: \\(A = xy\\).",
      "كتابة معادلة القيد: \\(2x + y = P \\implies y = P - 2x\\).",
      "التعويض بالقيد في دالة الهدف للتعبير عن المساحة بمتغير واحد \\(A(x)\\).",
      "الاشتقاق ومساواة \\(A'(x) = 0\\) والتحقق من القيمة العظمى باختبار المشتقة الثانية."
    ],
    "ex_ar": "رسم توضيحي، دالة الهدف، معادلة القيد، نموذج متغير واحد، الاشتقاق والتحقق."
  },
  {
    "t": "cat",
    "ti": "Categorize: Classification of Extrema",
    "categories": [
      "Local Maximum",
      "Local Minimum",
      "Inflection Point"
    ],
    "items": [
      {
        "s": "First derivative changes sign from positive to negative",
        "cat": "Local Maximum"
      },
      {
        "s": "Critical point where \\(f''(c) < 0\\)",
        "cat": "Local Maximum"
      },
      {
        "s": "First derivative changes sign from negative to positive",
        "cat": "Local Minimum"
      },
      {
        "s": "Critical point where \\(f''(c) > 0\\)",
        "cat": "Local Minimum"
      },
      {
        "s": "Second derivative changes sign (concavity switches)",
        "cat": "Inflection Point"
      }
    ],
    "ex": "First/second derivative tests identify local max and min; concavity change defines inflection point.",
    "ti_ar": "تصنيف: تصنيف القيم القصوى",
    "categories_ar": [
      "قيمة عظمى محلية",
      "قيمة صغرى محلية",
      "نقطة انقلاب"
    ],
    "items_ar": [
      {
        "s": "المشتقة الأولى تغير إشارتها من موجب إلى سالب",
        "cat": 0
      },
      {
        "s": "نقطة حرجة يكون عندها \\(f''(c) < 0\\)",
        "cat": 0
      },
      {
        "s": "المشتقة الأولى تغير إشارتها من سالب إلى موجب",
        "cat": 1
      },
      {
        "s": "نقطة حرجة يكون عندها \\(f''(c) > 0\\)",
        "cat": 1
      },
      {
        "s": "المشتقة الثانية تغير إشارتها (تغير اتجاه التقعر)",
        "cat": 2
      }
    ],
    "ex_ar": "تحدد اختبارات المشتقة الأولى والثانية العظمى والصغرى؛ بينما يعرف تغير التقعر نقطة الانقلاب."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Maximize the area of a fence-against-a-wall pen",
    "steps": [
      "A farmer has 40 m of fencing for a rectangular pen against a barn wall (no fence needed on that side). Let \\(x\\) = width (perpendicular to wall), \\(y\\) = length (along the wall): \\(2x+y=40\\Rightarrow y=40-2x\\).",
      "Area: \\(A(x)=xy=x(40-2x)=40x-2x^2\\).",
      "Differentiate and set to zero: \\(A'(x)=40-4x=0\\Rightarrow x=10\\).",
      "Then \\(y=40-2(10)=20\\), giving a maximum area of \\(A=10\\times20=200\\text{ m}^2\\)."
    ],
    "ti_ar": "مثال محلول: تعظيم مساحة حظيرة مستطيلة محاذية لجدار",
    "steps_ar": [
      "يمتلك مزارع 40 متراً من السياج لحظيرة مستطيلة على جدار حظيرة (لا يحتاج سياجاً على ذلك الجانب). لتكن \\(x\\) = العرض (العمودي على الجدار)، و \\(y\\) = الطول (بمحاذاة الجدار): \\(2x+y=40\\Rightarrow y=40-2x\\).",
      "المساحة: \\(A(x)=xy=x(40-2x)=40x-2x^2\\).",
      "الاشتقاق والمساواة بالصفر: \\(A'(x)=40-4x=0\\Rightarrow x=10\\).",
      "إذن \\(y=40-2(10)=20\\)، مما يعطي أقصى مساحة قدرها \\(A=10\\times20=200\\text{ m}^2\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Optimization",
    "q": "For \\(f(x)=x^3-3x\\), the x-coordinate of the local maximum is:",
    "o": [
      "\\(x=-1\\)",
      "\\(x=1\\)",
      "\\(x=0\\)",
      "\\(x=3\\)"
    ],
    "a": 0,
    "ex": "\\(f'(x)=3x^2-3=0\\Rightarrow x=\\pm1\\). \\(f''(x)=6x\\); at \\(x=-1\\), \\(f''<0\\), confirming a local max.",
    "ti_ar": "فحص سريع: الأمثلية",
    "q_ar": "للدالة \\(f(x)=x^3-3x\\)، الإحداثي السيني للقيمة العظمى المحلية هو:",
    "o_ar": [
      "\\(x=-1\\)",
      "\\(x=1\\)",
      "\\(x=0\\)",
      "\\(x=3\\)"
    ],
    "ex_ar": "\\(f'(x)=3x^2-3=0\\Rightarrow x=\\pm1\\). \\(f''(x)=6x\\)؛ عند \\(x=-1\\)، نجد \\(f''<0\\)، مما يؤكد وجود قيمة عظمى محلية."
  },
  {
    "t": "gp",
    "ti": "Interactive Graph Plotter: Extrema & Inflection Points",
    "ti_ar": "مخطط الدوال التفاعلي: القيم القصوى ونقطة الانقلاب",
    "q": "Plot the local maximum, local minimum, and inflection point of \\(f(x) = x^3 - 6x^2 + 9x\\) on the coordinate plane.",
    "q_ar": "حدد القيمة العظمى المحلية، والقيمة الصغرى المحلية، ونقطة الانقلاب للدالة \\(f(x) = x^3 - 6x^2 + 9x\\) على المستوى الإحداثي.",
    "xrange": [
      -1,
      5
    ],
    "yrange": [
      -2,
      6
    ],
    "targets": [
      {
        "label": "Local Maximum (1, 4)",
        "label_ar": "عظمى محلية (1, 4)",
        "target": [
          1,
          4
        ],
        "tol": 0.45
      },
      {
        "label": "Local Minimum (3, 0)",
        "label_ar": "صغرى محلية (3, 0)",
        "target": [
          3,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "Inflection Point (2, 2)",
        "label_ar": "نقطة انقلاب (2, 2)",
        "target": [
          2,
          2
        ],
        "tol": 0.45
      }
    ],
    "targets_ar": [
      {
        "label": "عظمى محلية (1, 4)",
        "target": [
          1,
          4
        ],
        "tol": 0.45
      },
      {
        "label": "صغرى محلية (3, 0)",
        "target": [
          3,
          0
        ],
        "tol": 0.45
      },
      {
        "label": "نقطة انقلاب (2, 2)",
        "target": [
          2,
          2
        ],
        "tol": 0.45
      }
    ],
    "curve": "x**3 - 6*x**2 + 9*x",
    "sol": "Critical points from \\(f'(x) = 3(x - 1)(x - 3) = 0 \\implies x = 1, 3\\). Local max is at \\((1, 4)\\) and local min at \\((3, 0)\\). Concavity changes at \\(f''(x) = 6x - 12 = 0 \\implies (2, 2)\\).",
    "sol_ar": "النقاط الحرجة من \\(f'(x) = 3(x - 1)(x - 3) = 0 \\implies x = 1, 3\\). القيمة العظمى المحلية عند \\((1, 4)\\) والصغرى المحلية عند \\((3, 0)\\). نقطة الانقلاب عند \\(f''(x) = 6x - 12 = 0 \\implies (2, 2)\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Misapplication of L'Hôpital's Rule",
    "ti_ar": "اكتشف الخطأ: التطبيق الخاطئ لقاعدة لوبيتال",
    "q": "A student evaluates \\(\\lim_{x \\to 0} \\frac{x^2 + 2x}{\\cos x}\\). Review their working below:",
    "q_ar": "حاول طالب حساب النهاية \\(\\lim_{x \\to 0} \\frac{x^2 + 2x}{\\cos x}\\). افحص خطوات الحل التالية:",
    "steps": [
      {
        "s": "Observe limit is a quotient as x approaches 0"
      },
      {
        "s": "Differentiate numerator and denominator via L'Hôpital: \\(\\lim_{x \\to 0} \\frac{2x + 2}{-\\sin x}\\)"
      },
      {
        "s": "Substitute x = 0: \\(\\frac{2(0) + 2}{-\\sin(0)} = \\frac{2}{0}\\)"
      },
      {
        "s": "Conclude the limit does not exist (undefined)"
      }
    ],
    "steps_ar": [
      {
        "s": "ملاحظة أن النهاية عبارة عن كسر عندما يقترب x من 0"
      },
      {
        "s": "اشتقاق البسط والمقام بقاعدة لوبيتال: \\(\\lim_{x \\to 0} \\frac{2x + 2}{-\\sin x}\\)"
      },
      {
        "s": "التعويض عن x = 0: \\(\\frac{2(0) + 2}{-\\sin(0)} = \\frac{2}{0}\\)"
      },
      {
        "s": "الاستنتاج أن النهاية غير موجودة"
      }
    ],
    "errorStep": 2,
    "reasons": [
      "L'Hôpital's Rule requires an indeterminate form (0/0 or ∞/∞); direct substitution gives 0/1 = 0",
      "The derivative of cos(x) should be +sin(x)",
      "The derivative of x² + 2x should be 2x + 1"
    ],
    "reasons_ar": [
      "قاعدة لوبيتال تشترط صيغة غير معينة (0/0 أو ∞/∞)؛ بينما التعويض المباشر يعطي 0/1 = 0 فوراً",
      "مشتقة جيب التمام كان يجب أن تكون +جا(س)",
      "مشتقة البسط كان يجب أن تكون 2س + 1"
    ],
    "correctReason": 0,
    "sol": "Step 2 is invalid! L'Hôpital's rule can only be applied when direct substitution yields \\(\\frac{0}{0}\\) or \\(\\frac{\\pm\\infty}{\\pm\\infty}\\). Here, the denominator evaluates to \\(\\cos(0) = 1 \\ne 0\\). Direct evaluation yields \\(\\frac{0^2 + 2(0)}{\\cos(0)} = \\frac{0}{1} = 0\\).",
    "sol_ar": "الخطوة 2 باطلة! قاعدة لوبيتال لا تُطبق إلا على الصيغ غير المعينة \\(\\frac{0}{0}\\) أو \\(\\frac{\\infty}{\\infty}\\). هنا المقام يساوي \\(\\cos(0) = 1 \\ne 0\\)، وبالتالي فإن التعويض المباشر يعطي \\(\\frac{0}{1} = 0\\) مباشرة."
  },
  {
    "t": "ms",
    "ti": "AP Calculus AB Free Response Question (FRQ): Extrema & Accumulation",
    "ti_ar": "سؤال الاستجابة الحرة (FRQ) في AP Calculus AB: القيم القصوى والتراكم",
    "q": "Let \\(f\\) be a continuous function defined on \\([-2, 4]\\) with derivative \\(f'(x) = 2x - 4\\) and initial condition \\(f(0) = 5\\).<br><b>(a)</b> Find the critical point of \\(f\\) on \\([-2, 4]\\) and justify whether it is a relative minimum, relative maximum, or neither. [3 marks]<br><b>(b)</b> Find the absolute maximum and absolute minimum values of \\(f\\) on the closed interval \\([-2, 4]\\). [3 marks]<br><b>(c)</b> Find the average value of \\(f'(x)\\) on \\([0, 4]\\). [3 marks]",
    "parts": [
      {
        "label": "Part (a)",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "text": "Set \\(f'(x) = 0 \\implies 2x - 4 = 0 \\implies x = 2\\)",
            "text_ar": "مساواة المشتقة بالصفر وإيجاد x = 2"
          },
          {
            "code": "A1",
            "text": "Integrate to find \\(f(x) = x^2 - 4x + 5\\) and evaluate \\(f(2) = 1\\)",
            "text_ar": "إيجاد الدالة الأصلية وحساب f(2) = 1"
          },
          {
            "code": "R1",
            "text": "Justification: \\(f'(x) < 0\\) for \\(x < 2\\) and \\(f'(x) > 0\\) for \\(x > 2\\), so \\(x = 2\\) is a relative minimum",
            "text_ar": "التبرير: تغير إشارة المشتقة من سالب إلى موجب يدل على قيمة صغرى نسبية"
          }
        ]
      },
      {
        "label": "Part (b)",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "text": "Identify candidates: interior critical point \\(x = 2\\) and endpoints \\(x = -2, 4\\)",
            "text_ar": "تحديد المرشحين: النقطة الحرجة وطرفا الفترة"
          },
          {
            "code": "A1",
            "text": "Evaluate endpoints: \\(f(-2) = (-2)^2 - 4(-2) + 5 = 17\\) and \\(f(4) = 4^2 - 4(4) + 5 = 5\\)",
            "text_ar": "حساب قيم الدالة عند طرفي الفترة: f(-2) = 17 و f(4) = 5"
          },
          {
            "code": "A1",
            "text": "State conclusions: Absolute maximum is 17 at \\(x = -2\\); Absolute minimum is 1 at \\(x = 2\\)",
            "text_ar": "تحديد القيمة العظمى المطلقة (17) والصغرى المطلقة (1)"
          }
        ]
      },
      {
        "label": "Part (c)",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "text": "Apply average value formula: \\(\\frac{1}{4 - 0} \\int_0^4 f'(x)\\,dx\\)",
            "text_ar": "تطبيق صيغة القيمة المتوسطة للتكامل"
          },
          {
            "code": "M1",
            "text": "Use FTC: \\(\\frac{f(4) - f(0)}{4} = \\frac{5 - 5}{4}\\)",
            "text_ar": "تطبيق النظرية الأساسية للتفاضل والتكامل"
          },
          {
            "code": "A1",
            "text": "State correct average value: \\(0\\)",
            "text_ar": "كتابة القيمة المتوسطة الصحيحة: 0"
          }
        ]
      }
    ],
    "boundaries": [
      {
        "min": 8,
        "grade": "AP Score 5 (Extremely Well Qualified)",
        "grade_ar": "درجة AP 5 (مؤهل بجدارة فائقة)"
      },
      {
        "min": 6,
        "grade": "AP Score 4 (Well Qualified)",
        "grade_ar": "درجة AP 4 (مؤهل بجدارة)"
      },
      {
        "min": 4,
        "grade": "AP Score 3 (Qualified Pass)",
        "grade_ar": "درجة AP 3 (ناجح مؤهل)"
      },
      {
        "min": 0,
        "grade": "Needs Review",
        "grade_ar": "يحتاج مراجعة"
      }
    ],
    "examinerTip": "College Board Tip: When asked for the \"absolute maximum value\", provide the y-value (17), not just the x-location.",
    "examinerTip_ar": "إرشاد كوليدج بورد: عندما يُطلب \"القيمة العظمى المطلقة\"، اذكر قيمة y (وهي 17)، وليس فقط موضع x."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Applications of Derivatives)",
    "steps": [
      {
        "l": "Given \\(f(x) = 3x^2 - x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "6",
        "h": "Multiply power 2 by 3."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "-1",
        "h": "The derivative of -x is -1."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(1) =\\)",
        "a": "5",
        "h": "Compute 6(1) + -1."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Applications of Derivatives)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 3x^2 - x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "اضرب الأس 2 في 3."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "-1",
        "h": "مشتقة -x هي -1."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(1) =\\)",
        "a": "5",
        "h": "احسب 6(1) + -1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Applications of Derivatives)",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Applications of Derivatives)",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];

D["ch-techniques"] = [
  {
    "t": "fn",
    "ti": "Explorer: Products that Need Integration by Parts — \\(x\\,e^{kx}\\)",
    "fns": [
      {
        "expr": "x*exp(k*x)",
        "color": "#1E3A6E",
        "label": "x·e^{kx}"
      }
    ],
    "xrange": [
      -3,
      3
    ],
    "yrange": [
      -2,
      8
    ],
    "params": [
      {
        "name": "k",
        "label": "Rate k",
        "min": 0.2,
        "max": 2,
        "step": 0.2,
        "default": 1
      }
    ],
    "ti_ar": "مستكشف: حواصل الضرب التي تتطلب تكاملاً بالتجزيء — \\(x\\,e^{kx}\\)"
  },
  {
    "t": "num",
    "ti": "Numeric Entry: Integration by Parts Definite Value",
    "q": "Evaluate \\(\\displaystyle\\int_0^1 x e^x\\,dx\\).",
    "a": 1,
    "ex": "Antiderivative is \\(x e^x - e^x = e^x(x - 1)\\). At \\(x = 1\\): \\(e(0) = 0\\). At \\(x = 0\\): \\(1(-1) = -1\\). Subtracting: \\(0 - (-1) = 1\\).",
    "ti_ar": "إدخال رقمي: قيمة تكامل بالتجزيء محدد",
    "q_ar": "احسب قيمة \\(\\displaystyle\\int_0^1 x e^x\\,dx\\).",
    "ex_ar": "المشتقة العكسية هي \\(x e^x - e^x = e^x(x - 1)\\). عند \\(x = 1\\): \\(e(0) = 0\\). عند \\(x = 0\\): \\(1(-1) = -1\\). بالطرح: \\(0 - (-1) = 1\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Integration by Parts on \\(\\int x\\cos x\\,dx\\)",
    "prompt": "Arrange the steps to integrate using parts:",
    "items": [
      "Choose u and dv: let \\(u = x\\) and \\(dv = \\cos x\\,dx\\).",
      "Compute differentials: \\(du = dx\\) and \\(v = \\sin x\\).",
      "Apply formula: \\(uv - \\int v\\,du = x\\sin x - \\int \\sin x\\,dx\\).",
      "Evaluate remaining integral: \\(\\int \\sin x\\,dx = -\\cos x\\).",
      "Combine signs and add constant: \\(x\\sin x + \\cos x + C\\)."
    ],
    "ex": "Choose u and dv, compute du and v, apply uv - int v du, evaluate and simplify.",
    "ti_ar": "ترتيب الخطوات: التكامل بالتجزيء لـ \\(\\int x\\cos x\\,dx\\)",
    "prompt_ar": "رتّب خطوات التكامل باستخدام طريقة التجزيء:",
    "items_ar": [
      "اختيار u و dv: نفرض \\(u = x\\) و \\(dv = \\cos x\\,dx\\).",
      "حساب التفاضلات: \\(du = dx\\) و \\(v = \\sin x\\).",
      "تطبيق الصيغة: \\(uv - \\int v\\,du = x\\sin x - \\int \\sin x\\,dx\\).",
      "حساب التكامل المتبقي: \\(\\int \\sin x\\,dx = -\\cos x\\).",
      "دمج الإشارات وإضافة ثابت التكامل: \\(x\\sin x + \\cos x + C\\)."
    ],
    "ex_ar": "اختيار u و dv، حساب du و v، تطبيق صيغة التجزيء، وحساب التكامل والتبسيط."
  },
  {
    "t": "cat",
    "ti": "Categorize: Selection of Integration Technique",
    "categories": [
      "U-Substitution",
      "Integration by Parts",
      "Partial Fractions"
    ],
    "items": [
      {
        "s": "\\(\\int 2x(x^2 + 1)^4\\,dx\\)",
        "cat": "U-Substitution"
      },
      {
        "s": "\\(\\int \\frac{\\cos x}{\\sin x}\\,dx\\)",
        "cat": "U-Substitution"
      },
      {
        "s": "\\(\\int x e^x\\,dx\\)",
        "cat": "Integration by Parts"
      },
      {
        "s": "\\(\\int x^2 \\ln x\\,dx\\)",
        "cat": "Integration by Parts"
      },
      {
        "s": "\\(\\int \\frac{1}{x^2 - 4}\\,dx\\)",
        "cat": "Partial Fractions"
      },
      {
        "s": "\\(\\int \\frac{3x + 1}{(x - 1)(x + 2)}\\,dx\\)",
        "cat": "Partial Fractions"
      }
    ],
    "ex": "Use u-sub for derivative pairs, parts for mixed products, partial fractions for rational functions.",
    "ti_ar": "تصنيف: اختيار أسلوب التكامل",
    "categories_ar": [
      "التكامل بالتعويض (U-Substitution)",
      "التكامل بالتجزيء (Integration by Parts)",
      "الكسور الجزئية (Partial Fractions)"
    ],
    "items_ar": [
      {
        "s": "\\(\\int 2x(x^2 + 1)^4\\,dx\\)",
        "cat": 0
      },
      {
        "s": "\\(\\int \\frac{\\cos x}{\\sin x}\\,dx\\)",
        "cat": 0
      },
      {
        "s": "\\(\\int x e^x\\,dx\\)",
        "cat": 1
      },
      {
        "s": "\\(\\int x^2 \\ln x\\,dx\\)",
        "cat": 1
      },
      {
        "s": "\\(\\int \\frac{1}{x^2 - 4}\\,dx\\)",
        "cat": 2
      },
      {
        "s": "\\(\\int \\frac{3x + 1}{(x - 1)(x + 2)}\\,dx\\)",
        "cat": 2
      }
    ],
    "ex_ar": "استخدم التعويض لأزواج المشتقات، والتجزيء لحواصل الضرب المختلطة، والكسور الجزئية للدوال الكسرية."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Integration by Parts — \\(\\displaystyle\\int xe^x\\,dx\\)",
    "steps": [
      "Choose \\(u=x\\) (differentiates to something simpler) and \\(dv=e^x\\,dx\\).",
      "Then \\(du=dx\\) and \\(v=e^x\\).",
      "Apply the formula \\(\\int u\\,dv=uv-\\int v\\,du\\): \\(xe^x-\\int e^x\\,dx\\).",
      "Integrate the remaining piece: \\(xe^x-e^x+C\\)."
    ],
    "ti_ar": "مثال محلول: التكامل بالتجزيء — \\(\\displaystyle\\int xe^x\\,dx\\)",
    "steps_ar": [
      "اختيار \\(u=x\\) (يتبسط بالاشتقاق) و \\(dv=e^x\\,dx\\).",
      "إذن \\(du=dx\\) و \\(v=e^x\\).",
      "تطبيق الصيغة \\(\\int u\\,dv=uv-\\int v\\,du\\): \\(xe^x-\\int e^x\\,dx\\).",
      "مكاملة الجزء المتبقي: \\(xe^x-e^x+C\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Choosing a Substitution",
    "q": "Which substitution works best for \\(\\displaystyle\\int 2x\\cos(x^2)\\,dx\\)?",
    "o": [
      "\\(u=x^2\\)",
      "\\(u=\\cos x\\)",
      "\\(u=2x\\)",
      "\\(u=x\\)"
    ],
    "a": 0,
    "ex": "Let \\(u=x^2\\), then \\(du=2x\\,dx\\) — matches the integrand exactly.",
    "ti_ar": "فحص سريع: اختيار التعويض المناسب",
    "q_ar": "أي تعويض هو الأنسب لحساب \\(\\displaystyle\\int 2x\\cos(x^2)\\,dx\\)؟",
    "o_ar": [
      "\\(u=x^2\\)",
      "\\(u=\\cos x\\)",
      "\\(u=2x\\)",
      "\\(u=x\\)"
    ],
    "ex_ar": "نفرض \\(u=x^2\\)، فيكون \\(du=2x\\,dx\\) — وهو يطابق دالة المكاملة تماماً."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Techniques of Integration)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 2xy\\) with \\(y(0) = 3\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 2x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{2}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{2x^2/2} + C\\).",
      "Substitute \\(x = 0, y = 3\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{2}{2}x^2 + C\\) yields \\(y = e^{\\frac{2}{2}x^2 + C} = Ae^{2x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{2x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{2x^2/2 + C} = e^C e^{2x^2/2} \\implies y = Ae^{2x^2/2}\\). Using \\(y(0) = 3\\) gives \\(A = 3\\), so \\(y = 3e^{2x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (Techniques of Integration)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 2xy\\) مع الشرط \\(y(0) = 3\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 2x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{2}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{2x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = 3\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{2}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{2}{2}x^2 + C} = Ae^{2x^2/2}\\) وليس \\(e^{2x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{2x^2/2}\\)، وبالتعويض عن \\(y(0)=3\\) نجد \\(y = 3e^{2x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Techniques of Integration)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 4x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 4\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{4} (3x^2 + 4x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 2x^2\\right]_0^{4}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Fundamental Theorem Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute upper and lower limits: \\((4^3 + 2(4)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(96\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (Techniques of Integration)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 4x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 4\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (Techniques of Integration)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 2\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 2x",
        "h": "Integrate 2x to x^2 and 2 to 2x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(4) =\\)",
        "a": "24",
        "h": "Compute \\((4)^2 + 2\\)(4)."
      },
      {
        "l": "Hence state \\(\\int_0^{4} (2x + 2)\\,dx =\\)",
        "a": "24",
        "h": "Compute F(4) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (Techniques of Integration)",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 2\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 2x",
        "h": "كامل 2x إلى x^2 و 2 إلى 2x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(4) =\\)",
        "a": "24",
        "h": "احسب (4)^2 + 2(4)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{4} (2x + 2)\\,dx =\\)",
        "a": "24",
        "h": "اطرح F(4) - F(0)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives & ODE Forms (Techniques of Integration)",
    "p": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (Integration by Parts)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "Multiply by integrating factor \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ],
    "ti_ar": "مطابقة: التكاملات القياسية والمعادلات التفاضلية (Techniques of Integration)",
    "p_ar": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (التكامل بالتجزيء)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "الضرب في عامل التكامل \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ]
  }
];

D["ch-appint"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Scaled Area Between Curves",
    "q": "Find the area between \\(y = 2x\\) and \\(y = x^2\\). What is \\(3 \\times \\text{Area}\\)?",
    "a": 4,
    "ex": "Curves intersect at \\(x = 0\\) and \\(x = 2\\). Area \\(= \\int_0^2 (2x - x^2)\\,dx = [x^2 - x^3/3]_0^2 = 4 - 8/3 = 4/3\\). Multiplied by 3 gives 4.",
    "ti_ar": "إدخال رقمي: المساحة المحصورة بين منحنيين",
    "q_ar": "أوجد المساحة بين \\(y = 2x\\) و \\(y = x^2\\). ما هي قيمة \\(3 \\times \\text{المساحة}\\)؟",
    "ex_ar": "يتقاطع المنحنيان عند \\(x = 0\\) و \\(x = 2\\). المساحة \\(= \\int_0^2 (2x - x^2)\\,dx = [x^2 - x^3/3]_0^2 = 4 - 8/3 = 4/3\\). بالضرب في 3 نحصل على 4."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Volume of Revolution via Disk Method",
    "prompt": "Arrange the steps to find volume of solid formed by revolving y = f(x) about x-axis:",
    "items": [
      "Sketch region and identify bounding curves.",
      "Identify axis of revolution (e.g. x-axis).",
      "Determine radius function: \\(R(x) = f(x)\\).",
      "Formulate circular cross-section area: \\(A(x) = \\pi [R(x)]^2\\).",
      "Integrate across bounds: \\(V = \\pi \\int_a^b [f(x)]^2\\,dx\\)."
    ],
    "ex": "Sketch, find axis, write radius, formulate disk area, and integrate.",
    "ti_ar": "ترتيب الخطوات: حجم المجسم الدوراني بطريقة الأقراص",
    "prompt_ar": "رتّب خطوات إيجاد حجم المجسم الناتج عن دوران y = f(x) حول محور x:",
    "items_ar": [
      "رسم المنطقة وتحديد المنحنيات المحددة لها.",
      "تحديد محور الدوران (مثل محور x).",
      "تحديد دالة نصف القطر: \\(R(x) = f(x)\\).",
      "صياغة مساحة المقطع العرضي الدائري: \\(A(x) = \\pi [R(x)]^2\\).",
      "المكاملة عبر الحدود: \\(V = \\pi \\int_a^b [f(x)]^2\\,dx\\)."
    ],
    "ex_ar": "الرسم، تحديد المحور، كتابة نصف القطر، صياغة مساحة القرص، والتكامل."
  },
  {
    "t": "cat",
    "ti": "Categorize: Definite Integral Applications",
    "categories": [
      "Planar Area",
      "Solid Volume of Revolution",
      "Arc Length"
    ],
    "items": [
      {
        "s": "\\(\\int_a^b [f(x) - g(x)]\\,dx\\)",
        "cat": "Planar Area"
      },
      {
        "s": "Enclosed space between top and bottom functions",
        "cat": "Planar Area"
      },
      {
        "s": "Disk method: \\(\\pi \\int_a^b [R(x)]^2\\,dx\\)",
        "cat": "Solid Volume of Revolution"
      },
      {
        "s": "Washer method: \\(\\pi \\int_a^b [R(x)^2 - r(x)^2]\\,dx\\)",
        "cat": "Solid Volume of Revolution"
      },
      {
        "s": "\\(\\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx\\)",
        "cat": "Arc Length"
      },
      {
        "s": "Distance traversed along a curve in the plane",
        "cat": "Arc Length"
      }
    ],
    "ex": "Area integrates height; volume integrates pi*r²; arc length integrates line element sqrt(1 + (y')²).",
    "ti_ar": "تصنيف: تطبيقات التكامل المحدد",
    "categories_ar": [
      "المساحة المستوية",
      "حجم مجسم دوراني",
      "طول القوس"
    ],
    "items_ar": [
      {
        "s": "\\(\\int_a^b [f(x) - g(x)]\\,dx\\)",
        "cat": 0
      },
      {
        "s": "المساحة المحصورة بين الدالة العلوية والسفلية",
        "cat": 0
      },
      {
        "s": "طريقة الأقراص: \\(\\pi \\int_a^b [R(x)]^2\\,dx\\)",
        "cat": 1
      },
      {
        "s": "طريقة الحلقات: \\(\\pi \\int_a^b [R(x)^2 - r(x)^2]\\,dx\\)",
        "cat": 1
      },
      {
        "s": "\\(\\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx\\)",
        "cat": 2
      },
      {
        "s": "المسافة المقطوعة على طول منحنى في المستوى",
        "cat": 2
      }
    ],
    "ex_ar": "تكامل المساحة يجمع الارتفاع؛ وتكامل الحجم يجمع pi*r²؛ وتكامل طول القوس يجمع عنصر الطول sqrt(1 + (y')²)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Area Between Two Curves",
    "steps": [
      "Find where \\(y=x^2\\) and \\(y=x+2\\) intersect: \\(x^2=x+2\\Rightarrow x^2-x-2=0\\Rightarrow(x-2)(x+1)=0\\), so \\(x=-1\\) and \\(x=2\\).",
      "On \\([-1,2]\\), the line \\(y=x+2\\) lies above the parabola, so Area \\(=\\displaystyle\\int_{-1}^{2}\\big[(x+2)-x^2\\big]\\,dx\\).",
      "Antiderivative: \\(\\dfrac{x^2}{2}+2x-\\dfrac{x^3}{3}\\).",
      "Evaluate: at \\(x=2\\) this is \\(\\frac{10}{3}\\); at \\(x=-1\\) it is \\(-\\frac{7}{6}\\). Subtracting gives \\(\\frac{10}{3}+\\frac{7}{6}=\\frac{9}{2}\\)."
    ],
    "ti_ar": "مثال محلول: المساحة بين منحنيين",
    "steps_ar": [
      "إيجاد نقاط تقاطع \\(y=x^2\\) و \\(y=x+2\\): \\(x^2=x+2\\Rightarrow x^2-x-2=0\\Rightarrow(x-2)(x+1)=0\\)، إذن \\(x=-1\\) و \\(x=2\\).",
      "على الفترة \\([-1,2]\\)، يقع الخط \\(y=x+2\\) فوق القطع المكافئ، إذن المساحة \\(=\\displaystyle\\int_{-1}^{2}\\big[(x+2)-x^2\\big]\\,dx\\).",
      "المشتقة العكسية: \\(\\dfrac{x^2}{2}+2x-\\dfrac{x^3}{3}\\).",
      "التعويض: عند \\(x=2\\) القيمة هي \\(\\frac{10}{3}\\)؛ وعند \\(x=-1\\) القيمة هي \\(-\\frac{7}{6}\\). بالطرح نحصل على \\(\\frac{10}{3}+\\frac{7}{6}=\\frac{9}{2}\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Setting Up Area Integrals",
    "q": "The area between \\(y=x\\) and \\(y=x^3\\) on \\([0,1]\\) is given by:",
    "o": [
      "\\(\\int_0^1(x-x^3)\\,dx\\)",
      "\\(\\int_0^1(x^3-x)\\,dx\\)",
      "\\(\\int_{-1}^1(x-x^3)\\,dx\\)",
      "\\(\\int_0^1(x+x^3)\\,dx\\)"
    ],
    "a": 0,
    "ex": "On \\([0,1]\\), \\(x\\ge x^3\\), so the height of the region is \\(x-x^3\\).",
    "ti_ar": "فحص سريع: إعداد تكاملات المساحة",
    "q_ar": "المساحة بين \\(y=x\\) و \\(y=x^3\\) على الفترة \\([0,1]\\) معطاة بالتكامل:",
    "o_ar": [
      "\\(\\int_0^1(x-x^3)\\,dx\\)",
      "\\(\\int_0^1(x^3-x)\\,dx\\)",
      "\\(\\int_{-1}^1(x-x^3)\\,dx\\)",
      "\\(\\int_0^1(x+x^3)\\,dx\\)"
    ],
    "ex_ar": "على الفترة \\([0,1]\\)، نجد أن \\(x\\ge x^3\\)، وبالتالي ارتفاع المنطقة هو \\(x-x^3\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Applications of Integration)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 2xy\\) with \\(y(0) = 0\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 2x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{2}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{2x^2/2} + C\\).",
      "Substitute \\(x = 0, y = 0\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{2}{2}x^2 + C\\) yields \\(y = e^{\\frac{2}{2}x^2 + C} = Ae^{2x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{2x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{2x^2/2 + C} = e^C e^{2x^2/2} \\implies y = Ae^{2x^2/2}\\). Using \\(y(0) = 0\\) gives \\(A = 0\\), so \\(y = 0e^{2x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (Applications of Integration)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 2xy\\) مع الشرط \\(y(0) = 0\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 2x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{2}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{2x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = 0\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{2}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{2}{2}x^2 + C} = Ae^{2x^2/2}\\) وليس \\(e^{2x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{2x^2/2}\\)، وبالتعويض عن \\(y(0)=0\\) نجد \\(y = 0e^{2x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Applications of Integration)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 4x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 1\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{1} (3x^2 + 4x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 2x^2\\right]_0^{1}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Fundamental Theorem Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute upper and lower limits: \\((1^3 + 2(1)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(3\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (Applications of Integration)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 4x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 1\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (Applications of Integration)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 2\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 2x",
        "h": "Integrate 2x to x^2 and 2 to 2x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(1) =\\)",
        "a": "3",
        "h": "Compute \\((1)^2 + 2\\)(1)."
      },
      {
        "l": "Hence state \\(\\int_0^{1} (2x + 2)\\,dx =\\)",
        "a": "3",
        "h": "Compute F(1) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (Applications of Integration)",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 2\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 2x",
        "h": "كامل 2x إلى x^2 و 2 إلى 2x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(1) =\\)",
        "a": "3",
        "h": "احسب (1)^2 + 2(1)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{1} (2x + 2)\\,dx =\\)",
        "a": "3",
        "h": "اطرح F(1) - F(0)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives & ODE Forms (Applications of Integration)",
    "p": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (Integration by Parts)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "Multiply by integrating factor \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ],
    "ti_ar": "مطابقة: التكاملات القياسية والمعادلات التفاضلية (Applications of Integration)",
    "p_ar": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (التكامل بالتجزيء)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "الضرب في عامل التكامل \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ]
  }
];

D["ch-diffeq"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Initial Value Problem",
    "q": "If \\(\\frac{dy}{dx} = 3y\\) and \\(y(0) = 5\\), what is the initial value \\(y(0)\\)?",
    "a": 5,
    "ex": "The initial value is given directly by the initial condition \\(y(0) = 5\\).",
    "ti_ar": "إدخال رقمي: مسألة القيمة الابتدائية",
    "q_ar": "إذا كانت \\(\\frac{dy}{dx} = 3y\\) وكان \\(y(0) = 5\\)، فما هي القيمة الابتدائية \\(y(0)\\)؟",
    "ex_ar": "القيمة الابتدائية معطاة مباشرة من الشرط الابتدائي \\(y(0) = 5\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Solving Exponential Growth dy/dt = ky",
    "prompt": "Arrange the steps to solve the natural growth differential equation:",
    "items": [
      "Separate variables: \\(\\frac{dy}{y} = k\\,dt\\).",
      "Integrate both sides: \\(\\int \\frac{1}{y}\\,dy = \\int k\\,dt\\).",
      "Add integration constant: \\(\\ln|y| = kt + C\\).",
      "Exponentiate both sides: \\(|y| = e^{kt + C} = e^C e^{kt}\\).",
      "Apply initial condition to set constant: \\(y(t) = y_0 e^{kt}\\)."
    ],
    "ex": "Separate, integrate, add C, exponentiate, and apply initial condition.",
    "ti_ar": "ترتيب الخطوات: حل معادلة النمو الطبيعي dy/dt = ky",
    "prompt_ar": "رتّب خطوات حل المعادلة التفاضلية للنمو الطبيعي:",
    "items_ar": [
      "فصل المتغيرات: \\(\\frac{dy}{y} = k\\,dt\\).",
      "مكاملة الطرفين: \\(\\int \\frac{1}{y}\\,dy = \\int k\\,dt\\).",
      "إضافة ثابت التكامل: \\(\\ln|y| = kt + C\\).",
      "أخذ الدالة الأسية للطرفين: \\(|y| = e^{kt + C} = e^C e^{kt}\\).",
      "تطبيق الشرط الابتدائي لتحديد الثابت: \\(y(t) = y_0 e^{kt}\\)."
    ],
    "ex_ar": "فصل المتغيرات، المكاملة، إضافة C، الرفع للدالة الأسية، وتطبيق الشرط الابتدائي."
  },
  {
    "t": "cat",
    "ti": "Categorize: Differential Equations by Order",
    "categories": [
      "First-Order ODE",
      "Second-Order ODE"
    ],
    "items": [
      {
        "s": "\\(\\frac{dy}{dx} = 2xy\\)",
        "cat": "First-Order ODE"
      },
      {
        "s": "Slope fields represent gradient vectors",
        "cat": "First-Order ODE"
      },
      {
        "s": "\\(y' + 3y = e^x\\)",
        "cat": "First-Order ODE"
      },
      {
        "s": "\\(y'' + 4y = 0\\)",
        "cat": "Second-Order ODE"
      },
      {
        "s": "Harmonic oscillator motion equation",
        "cat": "Second-Order ODE"
      },
      {
        "s": "Requires two initial conditions for a unique solution",
        "cat": "Second-Order ODE"
      }
    ],
    "ex": "First-order involves first derivatives; second-order involves second derivatives.",
    "ti_ar": "تصنيف: المعادلات التفاضلية حسب الرتبة",
    "categories_ar": [
      "معادلة تفاضلية من الرتبة الأولى",
      "معادلة تفاضلية من الرتبة الثانية"
    ],
    "items_ar": [
      {
        "s": "\\(\\frac{dy}{dx} = 2xy\\)",
        "cat": 0
      },
      {
        "s": "حقول الميول تمثل متجهات الانحدار",
        "cat": 0
      },
      {
        "s": "\\(y' + 3y = e^x\\)",
        "cat": 0
      },
      {
        "s": "\\(y'' + 4y = 0\\)",
        "cat": 1
      },
      {
        "s": "معادلة حركة المتذبذب التوافقي",
        "cat": 1
      },
      {
        "s": "تتطلب شرطين ابتدائيين للحصول على حل وحيد",
        "cat": 1
      }
    ],
    "ex_ar": "تحتوي الرتبة الأولى على مشتقات أولى فقط؛ بينما تحتوي الرتبة الثانية على مشتقات ثانية."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Solve \\(\\dfrac{dy}{dx}=2xy\\), \\(y(0)=3\\)",
    "steps": [
      "Separate variables: \\(\\dfrac{dy}{y}=2x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y|=x^2+C\\).",
      "Exponentiate: \\(y=Ae^{x^2}\\), where \\(A=e^C\\).",
      "Apply the initial condition \\(y(0)=3\\): \\(3=Ae^0=A\\), so \\(y=3e^{x^2}\\)."
    ],
    "ti_ar": "مثال محلول: حل \\(\\dfrac{dy}{dx}=2xy\\)، \\(y(0)=3\\)",
    "steps_ar": [
      "فصل المتغيرات: \\(\\dfrac{dy}{y}=2x\\,dx\\).",
      "مكاملة الطرفين: \\(\\ln|y|=x^2+C\\).",
      "أخذ الدالة الأسية: \\(y=Ae^{x^2}\\)، حيث \\(A=e^C\\).",
      "تطبيق الشرط الابتدائي \\(y(0)=3\\): \\(3=Ae^0=A\\)، إذن \\(y=3e^{x^2}\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Separable Equations",
    "q": "Which of these differential equations is separable?",
    "o": [
      "\\(\\dfrac{dy}{dx}=\\dfrac{x^2}{y}\\)",
      "\\(\\dfrac{dy}{dx}=x+y\\)",
      "\\(\\dfrac{dy}{dx}=x-y\\)",
      "\\(\\dfrac{dy}{dx}=xy+x^2\\)"
    ],
    "a": 0,
    "ex": "\\(\\frac{x^2}{y}\\) splits into a pure function of \\(x\\) times a pure function of \\(y\\), so we can write \\(y\\,dy=x^2\\,dx\\).",
    "ti_ar": "فحص سريع: المعادلات القابلة للفصل",
    "q_ar": "أي من هذه المعادلات التفاضلية قابلة للفصل؟",
    "o_ar": [
      "\\(\\dfrac{dy}{dx}=\\dfrac{x^2}{y}\\)",
      "\\(\\dfrac{dy}{dx}=x+y\\)",
      "\\(\\dfrac{dy}{dx}=x-y\\)",
      "\\(\\dfrac{dy}{dx}=xy+x^2\\)"
    ],
    "ex_ar": "\\(\\frac{x^2}{y}\\) تنقسم إلى دالة في x فقط مضروبة في دالة في y فقط، لذا يمكن كتابتها \\(y\\,dy=x^2\\,dx\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Separable Differential Equation & Constant of Integration (Differential Equations)",
    "q": "A student solves the initial value problem \\(\\dfrac{dy}{dx} = 5xy\\) with \\(y(0) = -1\\). Which step contains the mathematical flaw?",
    "steps": [
      "Separate variables: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "Integrate both sides: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "Exponentiate both sides to write \\(y = e^{5x^2/2} + C\\).",
      "Substitute \\(x = 0, y = -1\\) to solve for \\(C\\)."
    ],
    "errorStep": 3,
    "reasons": [
      "Exponentiating \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) yields \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) (where \\(A = \\pm e^C\\)), NOT \\(e^{5x^2/2} + C\\).",
      "The integral of \\(1/y\\) is \\(y^{-2}\\), not \\(\\ln|y|\\).",
      "Variables cannot be separated when \\(x\\) and \\(y\\) are multiplied."
    ],
    "correctReason": 0,
    "h": "Check how the exponent law \\(e^{a + C} = e^a \\cdot e^C\\) behaves in Step 3.",
    "sol": "By index laws, \\(|y| = e^{5x^2/2 + C} = e^C e^{5x^2/2} \\implies y = Ae^{5x^2/2}\\). Using \\(y(0) = -1\\) gives \\(A = -1\\), so \\(y = -1e^{5x^2/2}\\).",
    "ti_ar": "اكتشف الخطأ: حل المعادلات التفاضلية وثابت التكامل (Differential Equations)",
    "q_ar": "يحل طالب مسألة القيمة الابتدائية \\(\\dfrac{dy}{dx} = 5xy\\) مع الشرط \\(y(0) = -1\\). أي خطوة تتضمن الخطأ الرياضي؟",
    "steps_ar": [
      "فصل المتغيرات: \\(\\int \\dfrac{1}{y}\\,dy = \\int 5x\\,dx\\).",
      "تكامل الطرفين: \\(\\ln|y| = \\dfrac{5}{2}x^2 + C\\).",
      "أخذ الدالة الأسية للطرفين لكتابة \\(y = e^{5x^2/2} + C\\).",
      "التعويض عن \\(x = 0, y = -1\\) لإيجاد \\(C\\)."
    ],
    "reasons_ar": [
      "أخذ الدالة الأسية للعلاقة \\(\\ln|y| = \\tfrac{5}{2}x^2 + C\\) يعطي \\(y = e^{\\frac{5}{2}x^2 + C} = Ae^{5x^2/2}\\) وليس \\(e^{5x^2/2} + C\\).",
      "تكامل \\(1/y\\) يساوي \\(-1/y^2\\).",
      "لا يمكن فصل المتغيرات في حالة الضرب."
    ],
    "h_ar": "تذكّر أن \\(e^{u+C} = e^C \\cdot e^u = Ae^u\\).",
    "sol_ar": "الصورة الصحيحة بعد أخذ الدالة الأسية هي \\(y = Ae^{5x^2/2}\\)، وبالتعويض عن \\(y(0)=-1\\) نجد \\(y = -1e^{5x^2/2}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Definite Integration & Area Under a Curve (Differential Equations)",
    "q": "Evaluate the exact area bounded by \\(y = 3x^2 + 10x\\), the \\(x\\)-axis, \\(x = 0\\), and \\(x = 0\\).",
    "parts": [
      {
        "label": "Part (a) — Antiderivative Construction",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set up definite integral \\(A = \\int_0^{0} (3x^2 + 10x)\\,dx\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Find correct antiderivative \\(\\left[x^3 + 5x^2\\right]_0^{0}\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Fundamental Theorem Evaluation",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute upper and lower limits: \\((0^3 + 5(0)^2) - (0)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact area \\(0\\)."
          }
        ]
      }
    ],
    "examinerTip": "When a question says \"Hence find the exact area,\" calculator-only decimal answers with no antiderivative working shown receive 0/4 marks.",
    "ti_ar": "وضع المصحح: التكامل المحدد والمساحة تحت المنحنى (Differential Equations)",
    "q_ar": "أوجد المساحة المحصورة بين المنحنى \\(y = 3x^2 + 10x\\) ومحور السينات والمستقيمين \\(x = 0\\) و \\(x = 0\\).",
    "examinerTip_ar": "يجب كتابة الدالة الأصلية صراحةً قبل تعويض حدود التكامل للحصول على درجات الطريقة كاملة."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Definite Integral via FTC (Differential Equations)",
    "steps": [
      {
        "l": "Find the antiderivative \\(F(x)\\) of \\(f(x) = 2x + 5\\) with \\(F(0) = 0\\): \\(F(x) =\\)",
        "a": "x^2 + 5x",
        "h": "Integrate 2x to x^2 and 5 to 5x."
      },
      {
        "l": "Evaluate at the upper bound \\(F(0) =\\)",
        "a": "0",
        "h": "Compute \\((0)^2 + 5\\)(0)."
      },
      {
        "l": "Hence state \\(\\int_0^{0} (2x + 5)\\,dx =\\)",
        "a": "0",
        "h": "Compute F(0) - F(0)."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب التكامل المحدد (Differential Equations)",
    "steps_ar": [
      {
        "l": "أوجد الدالة الأصلية \\(F(x)\\) للدالة \\(2x + 5\\) بحيث \\(F(0)=0\\):",
        "a": "x^2 + 5x",
        "h": "كامل 2x إلى x^2 و 5 إلى 5x."
      },
      {
        "l": "احسب القيمة عند الحد العلوي \\(F(0) =\\)",
        "a": "0",
        "h": "احسب (0)^2 + 5(0)."
      },
      {
        "l": "إذن قيمة التكامل \\(\\int_0^{0} (2x + 5)\\,dx =\\)",
        "a": "0",
        "h": "اطرح F(0) - F(0)."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Standard Antiderivatives & ODE Forms (Differential Equations)",
    "p": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (Integration by Parts)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "Multiply by integrating factor \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ],
    "ti_ar": "مطابقة: التكاملات القياسية والمعادلات التفاضلية (Differential Equations)",
    "p_ar": [
      {
        "l": "\\(\\int e^{kx}\\,dx\\)",
        "r": "\\(\\dfrac{1}{k}e^{kx} + C\\)"
      },
      {
        "l": "\\(\\int \\dfrac{f'(x)}{f(x)}\\,dx\\)",
        "r": "\\(\\ln|f(x)| + C\\)"
      },
      {
        "l": "\\(\\int u\\,dv\\)",
        "r": "\\(uv - \\int v\\,du\\) (التكامل بالتجزيء)"
      },
      {
        "l": "\\(y' + P(x)y = Q(x)\\)",
        "r": "الضرب في عامل التكامل \\(\\mu(x) = e^{\\int P(x)\\,dx}\\)"
      }
    ]
  }
];

D["ch-parametric"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Parametric Tangent Slope",
    "q": "For \\(x = 3t\\) and \\(y = 6t^2\\), find \\(\\frac{dy}{dx}\\) at \\(t = 2\\).",
    "a": 8,
    "ex": "\\(\\frac{dx}{dt} = 3\\) and \\(\\frac{dy}{dt} = 12t\\). Then \\(\\frac{dy}{dx} = \\frac{12t}{3} = 4t\\). At \\(t = 2\\), the slope is \\(4(2) = 8\\).",
    "ti_ar": "إدخال رقمي: ميل المماس لمعادلات وسيطية",
    "q_ar": "لـ \\(x = 3t\\) و \\(y = 6t^2\\)، أوجد قيمة \\(\\frac{dy}{dx}\\) عند \\(t = 2\\).",
    "ex_ar": "\\(\\frac{dx}{dt} = 3\\) و \\(\\frac{dy}{dt} = 12t\\). إذن \\(\\frac{dy}{dx} = \\frac{12t}{3} = 4t\\). عند \\(t = 2\\)، الميل هو \\(4(2) = 8\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Evaluating Area Inside a Polar Curve",
    "prompt": "Arrange the steps to find area enclosed by polar curve r = f(θ):",
    "items": [
      "Identify angular bounds of integration \\(\\alpha\\) and \\(\\beta\\).",
      "Square the radius function: \\(r^2 = [f(\\theta)]^2\\).",
      "Multiply by one-half: \\(\\frac{1}{2}r^2\\).",
      "Set up polar area integral: \\(\\frac{1}{2}\\int_\\alpha^\\beta r^2\\,d\\theta\\).",
      "Evaluate the definite integral across limits."
    ],
    "ex": "Find angle bounds, square radius, multiply by 1/2, set up integral, and evaluate.",
    "ti_ar": "ترتيب الخطوات: حساب المساحة داخل منحنى قطبي",
    "prompt_ar": "رتّب خطوات إيجاد المساحة المحصورة بالمنحنى القطبي r = f(θ):",
    "items_ar": [
      "تحديد حدود التكامل الزاوية \\(\\alpha\\) و \\(\\beta\\).",
      "تربيع دالة نصف القطر: \\(r^2 = [f(\\theta)]^2\\).",
      "الضرب في النصف: \\(\\frac{1}{2}r^2\\).",
      "إعداد تكامل المساحة القطبية: \\(\\frac{1}{2}\\int_\\alpha^\\beta r^2\\,d\\theta\\).",
      "حساب التكامل المحدد عبر الحدود."
    ],
    "ex_ar": "إيجاد حدود الزاوية، تربيع نصف القطر، الضرب في 1/2، إعداد التكامل وحسابه."
  },
  {
    "t": "cat",
    "ti": "Categorize: Coordinate Systems",
    "categories": [
      "Cartesian Coordinates",
      "Polar Coordinates",
      "Parametric Form"
    ],
    "items": [
      {
        "s": "Points identified as \\((x, y)\\)",
        "cat": "Cartesian Coordinates"
      },
      {
        "s": "Straightforward horizontal and vertical grids",
        "cat": "Cartesian Coordinates"
      },
      {
        "s": "Points defined by distance and angle \\((r, \\theta)\\)",
        "cat": "Polar Coordinates"
      },
      {
        "s": "Circular symmetry: \\(r = 2a\\cos\\theta\\)",
        "cat": "Polar Coordinates"
      },
      {
        "s": "Coordinates defined as functions of time: \\(x(t), y(t)\\)",
        "cat": "Parametric Form"
      },
      {
        "s": "Tracks position and motion of a moving particle",
        "cat": "Parametric Form"
      }
    ],
    "ex": "Cartesian uses (x,y); polar uses (r, theta); parametric links both to parameter t.",
    "ti_ar": "تصنيف: أنظمة الإحداثيات",
    "categories_ar": [
      "الإحداثيات الديكارتية",
      "الإحداثيات القطبية",
      "الصورة الوسيطية (البارامترية)"
    ],
    "items_ar": [
      {
        "s": "تحدد النقاط بصورة \\((x, y)\\)",
        "cat": 0
      },
      {
        "s": "شبكات خطوط أفقية ورأسية واضحة",
        "cat": 0
      },
      {
        "s": "تحدد النقاط بالمسافة والزاوية \\((r, \\theta)\\)",
        "cat": 1
      },
      {
        "s": "التماثل الدائري: \\(r = 2a\\cos\\theta\\)",
        "cat": 1
      },
      {
        "s": "الإحداثيات معرفة كدوال في الزمن: \\(x(t), y(t)\\)",
        "cat": 2
      },
      {
        "s": "تتبع موضع وحركة جسيم متحرك",
        "cat": 2
      }
    ],
    "ex_ar": "تستخدم الديكارتية (x,y)؛ والقطبية (r, theta)؛ والوسيطية تربط كلاهما بالوسيط t."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Parametric Slope for \\(x=t^2,\\ y=t^3-3t\\) at \\(t=2\\)",
    "steps": [
      "Differentiate each with respect to \\(t\\): \\(\\dfrac{dx}{dt}=2t\\), \\(\\dfrac{dy}{dt}=3t^2-3\\).",
      "Use the parametric slope formula: \\(\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}=\\dfrac{3t^2-3}{2t}\\).",
      "Substitute \\(t=2\\): \\(\\dfrac{3(4)-3}{2(2)}=\\dfrac{9}{4}\\)."
    ],
    "ti_ar": "مثال محلول: ميل المماس الوسيطي لـ \\(x=t^2,\\ y=t^3-3t\\) عند \\(t=2\\)",
    "steps_ar": [
      "اشتقاق كل دالة بالنسبة إلى \\(t\\): \\(\\dfrac{dx}{dt}=2t\\)، و \\(\\dfrac{dy}{dt}=3t^2-3\\).",
      "استخدام صيغة الميل الوسيطي: \\(\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}=\\dfrac{3t^2-3}{2t}\\).",
      "التعويض بـ \\(t=2\\): \\(\\dfrac{3(4)-3}{2(2)}=\\dfrac{9}{4}\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Parametric Slopes",
    "q": "For \\(x=\\cos t,\\ y=\\sin t\\), what is \\(\\dfrac{dy}{dx}\\)?",
    "o": [
      "\\(-\\cot t\\)",
      "\\(\\cot t\\)",
      "\\(-\\tan t\\)",
      "\\(\\tan t\\)"
    ],
    "a": 0,
    "ex": "\\(\\dfrac{dy}{dx}=\\dfrac{\\cos t}{-\\sin t}=-\\cot t\\).",
    "ti_ar": "فحص سريع: الميول الوسيطية",
    "q_ar": "للمعادلتين \\(x=\\cos t,\\ y=\\sin t\\)، ما هي قيمة \\(\\dfrac{dy}{dx}\\)؟",
    "o_ar": [
      "\\(-\\cot t\\)",
      "\\(\\cot t\\)",
      "\\(-\\tan t\\)",
      "\\(\\tan t\\)"
    ],
    "ex_ar": "\\(\\dfrac{dy}{dx}=\\dfrac{\\cos t}{-\\sin t}=-\\cot t\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Parametric &amp; Polar)",
    "q": "A student differentiates the implicit curve \\(x^2 + 2xy + y^2 = 15\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(2xy\\) with respect to \\(x\\) as \\(2\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(15\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(2xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(2y + 2x\\dfrac{dy}{dx}\\), not \\(2\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(15\\) remains \\(15\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(2xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(2xy\\) gives \\(2y + 2x\\dfrac{dy}{dx}\\). Thus \\(2x + 2y + (2x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 2y}{2x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Parametric &amp; Polar)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 2xy + y^2 = 15\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(2xy\\) بالنسبة إلى \\(x\\) على أنه \\(2\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(2xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(2y + 2x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(2xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(2xy\\) نحصل على \\(2y + 2x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 2y}{2x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Parametric &amp; Polar)",
    "q": "Consider the curve \\(y = 2x^3 - 3x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 3\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 6x^2 - 6x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 3\\): \\(m = 6(3)^2 - 6(3)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 48\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(6x - 6) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{6}{6}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Parametric &amp; Polar)",
    "q_ar": "لمنحنى الدالة \\(y = 2x^3 - 3x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 3\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Parametric &amp; Polar)",
    "steps": [
      {
        "l": "Given \\(f(x) = 2x^2 + 3x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "4",
        "h": "Multiply power 2 by 2."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "3",
        "h": "The derivative of 3x is 3."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(3) =\\)",
        "a": "15",
        "h": "Compute 4(3) + 3."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Parametric &amp; Polar)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 2x^2 + 3x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "4",
        "h": "اضرب الأس 2 في 2."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "3",
        "h": "مشتقة 3x هي 3."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(3) =\\)",
        "a": "15",
        "h": "احسب 4(3) + 3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Parametric &amp; Polar)",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Parametric &amp; Polar)",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];

D["ch-series"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Geometric Series Sum",
    "q": "Find the sum of the convergent geometric series \\(\\displaystyle\\sum_{n=0}^\\infty 5(0.5)^n\\).",
    "a": 10,
    "ex": "First term \\(a = 5\\), ratio \\(r = 0.5\\). Sum \\(S = \\frac{a}{1 - r} = \\frac{5}{1 - 0.5} = 10\\).",
    "ti_ar": "إدخال رقمي: مجموع متسلسلة هندسية",
    "q_ar": "أوجد مجموع المتسلسلة الهندسية المتقاربة \\(\\displaystyle\\sum_{n=0}^\\infty 5(0.5)^n\\).",
    "ex_ar": "الحد الأول \\(a = 5\\)، والأساس \\(r = 0.5\\). المجموع \\(S = \\frac{a}{1 - r} = \\frac{5}{1 - 0.5} = 10\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Constructing a Taylor Polynomial at x = a",
    "prompt": "Arrange the steps to find the Taylor polynomial of degree n:",
    "items": [
      "Compute successive derivatives: \\(f(x), f'(x), f''(x), \\dots, f^{(n)}(x)\\).",
      "Evaluate all derivatives at the expansion center: \\(f(a), f'(a), \\dots, f^{(n)}(a)\\).",
      "Divide each derivative by its factorial: \\(\\frac{f^{(k)}(a)}{k!}\\).",
      "Multiply by power term \\((x - a)^k\\).",
      "Sum all terms: \\(P_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(a)}{k!}(x - a)^k\\)."
    ],
    "ex": "Compute derivatives, evaluate at center, divide by k!, attach (x-a)^k, sum terms.",
    "ti_ar": "ترتيب الخطوات: إنشاء كثيرة حدود تايلور عند x = a",
    "prompt_ar": "رتّب خطوات إيجاد كثيرة حدود تايلور من الدرجة n:",
    "items_ar": [
      "حساب المشتقات المتتابعة: \\(f(x), f'(x), f''(x), \\dots, f^{(n)}(x)\\).",
      "حساب قيم المشتقات عند مركز المفكوك: \\(f(a), f'(a), \\dots, f^{(n)}(a)\\).",
      "قسمة كل مشتقة على مضروب درجتها: \\(\\frac{f^{(k)}(a)}{k!}\\).",
      "الضرب في حد القوى \\((x - a)^k\\).",
      "جمع جميع الحدود: \\(P_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(a)}{k!}(x - a)^k\\)."
    ],
    "ex_ar": "حساب المشتقات، التعويض عند المركز، القسمة على !k، إرفاق الحد (x-a)^k، والجمع."
  },
  {
    "t": "cat",
    "ti": "Categorize: Familiar Maclaurin Expansions",
    "categories": [
      "Alternating Sign Terms",
      "All Positive Terms (for x > 0)"
    ],
    "items": [
      {
        "s": "\\(\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots\\)",
        "cat": "Alternating Sign Terms"
      },
      {
        "s": "\\(\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots\\)",
        "cat": "Alternating Sign Terms"
      },
      {
        "s": "\\(\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots\\)",
        "cat": "Alternating Sign Terms"
      },
      {
        "s": "\\(e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots\\)",
        "cat": "All Positive Terms (for x > 0)"
      },
      {
        "s": "\\(\\frac{1}{1 - x} = 1 + x + x^2 + x^3 + \\dots\\)",
        "cat": "All Positive Terms (for x > 0)"
      }
    ],
    "ex": "Sine, cosine, and log(1+x) alternate; exponential and 1/(1-x) have all positive signs.",
    "ti_ar": "تصنيف: متسلسلات ماكلورين الشهيرة",
    "categories_ar": [
      "حدود ذات إشارات متناوبة",
      "جميع الحدود موجبة (لقيم x > 0)"
    ],
    "items_ar": [
      {
        "s": "\\(\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots\\)",
        "cat": 0
      },
      {
        "s": "\\(\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots\\)",
        "cat": 0
      },
      {
        "s": "\\(\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots\\)",
        "cat": 0
      },
      {
        "s": "\\(e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots\\)",
        "cat": 1
      },
      {
        "s": "\\(\\frac{1}{1 - x} = 1 + x + x^2 + x^3 + \\dots\\)",
        "cat": 1
      }
    ],
    "ex_ar": "متسلسلات الجيب وجيب التمام واللوغاريتم تتناوب إشاراتها؛ بينما الأسية و 1/(1-x) حدودها موجبة."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Sum of \\(\\displaystyle\\sum_{n=0}^{\\infty}\\left(\\dfrac13\\right)^n\\)",
    "steps": [
      "This is a geometric series with first term \\(a=1\\) and ratio \\(r=\\dfrac13\\).",
      "Since \\(|r|<1\\), the series converges. Use \\(S=\\dfrac{a}{1-r}\\).",
      "Substitute: \\(S=\\dfrac{1}{1-\\frac13}=\\dfrac{1}{\\frac23}=\\dfrac32\\)."
    ],
    "ti_ar": "مثال محلول: مجموع المتسلسلة \\(\\displaystyle\\sum_{n=0}^{\\infty}\\left(\\dfrac13\\right)^n\\)",
    "steps_ar": [
      "هذه متسلسلة هندسية حدها الأول \\(a=1\\) وأساسها \\(r=\\dfrac13\\).",
      "بما أن \\(|r|<1\\)، فإن المتسلسلة متقاربة. نستخدم القانون \\(S=\\dfrac{a}{1-r}\\).",
      "التعويض: \\(S=\\dfrac{1}{1-\\frac13}=\\dfrac{1}{\\frac23}=\\dfrac32\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: The Harmonic Series",
    "q": "Does the harmonic series \\(\\displaystyle\\sum\\frac1n\\) converge or diverge?",
    "o": [
      "Converges to 1",
      "Converges to 2",
      "Diverges",
      "Converges to 0"
    ],
    "a": 2,
    "ex": "The harmonic series is a classic example of a divergent series — even though its terms shrink to 0, the sum still grows without bound.",
    "ti_ar": "فحص سريع: المتسلسلة التوافقية",
    "q_ar": "هل المتسلسلة التوافقية \\(\\displaystyle\\sum\\frac1n\\) متقاربة أم متباعدة؟",
    "o_ar": [
      "متقاربة إلى 1",
      "متقاربة إلى 2",
      "متباعدة",
      "متقاربة إلى 0"
    ],
    "ex_ar": "المتسلسلة التوافقية مثال كلاسيكي للمتسلسلات المتباعدة — على الرغم من أن حدودها تؤول إلى 0، إلا أن مجموعها ينمو بلا حدود."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Sequences &amp; Series)",
    "q": "A student differentiates the implicit curve \\(x^2 + 5xy + y^2 = 10\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(5xy\\) with respect to \\(x\\) as \\(5\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(10\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(5xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(5y + 5x\\dfrac{dy}{dx}\\), not \\(5\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(10\\) remains \\(10\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(5xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(5xy\\) gives \\(5y + 5x\\dfrac{dy}{dx}\\). Thus \\(2x + 5y + (5x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 5y}{5x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Sequences &amp; Series)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 5xy + y^2 = 10\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(5xy\\) بالنسبة إلى \\(x\\) على أنه \\(5\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(5xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(5y + 5x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(5xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(5xy\\) نحصل على \\(5y + 5x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 5y}{5x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Sequences &amp; Series)",
    "q": "Consider the curve \\(y = 5x^3 - 2x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 15x^2 - 4x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 15(2)^2 - 4(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 56\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(15x - 4) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{4}{15}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Sequences &amp; Series)",
    "q_ar": "لمنحنى الدالة \\(y = 5x^3 - 2x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Sequences &amp; Series)",
    "steps": [
      {
        "l": "Given \\(f(x) = 5x^2 + 2x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "10",
        "h": "Multiply power 2 by 5."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "2",
        "h": "The derivative of 2x is 2."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "22",
        "h": "Compute 10(2) + 2."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Sequences &amp; Series)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 5x^2 + 2x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "10",
        "h": "اضرب الأس 2 في 5."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "2",
        "h": "مشتقة 2x هي 2."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "22",
        "h": "احسب 10(2) + 2."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Sequences &amp; Series)",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Sequences &amp; Series)",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];

D["ch-convergence"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Smallest Convergent p-Value",
    "q": "For a p-series \\(\\sum \\frac{1}{n^p}\\), what is the smallest integer value of p for which the series converges?",
    "a": 2,
    "ex": "A p-series converges if and only if \\(p > 1\\). The smallest integer satisfying \\(p > 1\\) is 2.",
    "ti_ar": "إدخال رقمي: أصغر قيمة صحيحة لـ p للتقارب",
    "q_ar": "لمتسلسلة p التوافقية \\(\\sum \\frac{1}{n^p}\\)، ما هي أصغر قيمة عدد صحيح لـ p تتقارب عندها المتسلسلة؟",
    "ex_ar": "تتقارب متسلسلة p إذا وفقط إذا كان \\(p > 1\\). أصغر عدد صحيح يحقق \\(p > 1\\) هو 2."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Performing the Ratio Test",
    "prompt": "Arrange the steps to determine convergence via the Ratio Test:",
    "items": [
      "Identify the nth term \\(a_n\\) and construct the next term \\(a_{n+1}\\).",
      "Form the absolute ratio \\(\\left|\\frac{a_{n+1}}{a_n}\\right|\\).",
      "Simplify powers and factorials through cancellation.",
      "Evaluate the limit \\(L = \\lim_{n\\to\\infty} \\left|\\frac{a_{n+1}}{a_n}\\right|\\).",
      "Conclude: converges if \\(L < 1\\), diverges if \\(L > 1\\), test fails if \\(L = 1\\)."
    ],
    "ex": "Construct ratio, simplify algebra, take limit as n->infinity, and conclude.",
    "ti_ar": "ترتيب الخطوات: تطبيق اختبار النسبة (Ratio Test)",
    "prompt_ar": "رتّب خطوات تحديد التقارب باستخدام اختبار النسبة:",
    "items_ar": [
      "تحديد الحد النوني \\(a_n\\) وتكوين الحد التالي \\(a_{n+1}\\).",
      "تكوين نسبة القيمة المطلقة \\(\\left|\\frac{a_{n+1}}{a_n}\\right|\\).",
      "تبسيط القوى والمضاريب بالاختصار.",
      "حساب النهاية \\(L = \\lim_{n\\to\\infty} \\left|\\frac{a_{n+1}}{a_n}\\right|\\).",
      "الاستنتاج: تتقارب إذا كان \\(L < 1\\)، وتتباعد إذا كان \\(L > 1\\)، ويفشل الاختبار إذا كان \\(L = 1\\)."
    ],
    "ex_ar": "تكوين النسبة، التبسيط الجبري، أخذ النهاية مع اقتراب n من اللانهاية، والاستنتاج."
  },
  {
    "t": "cat",
    "ti": "Categorize: Reliability of Convergence Tests",
    "categories": [
      "Decisive on p-Series",
      "Inconclusive when Limit Equals 1"
    ],
    "items": [
      {
        "s": "p-Series test (checks exponent \\(p > 1\\))",
        "cat": "Decisive on p-Series"
      },
      {
        "s": "Integral test comparing \\(\\int_1^\\infty \\frac{1}{x^p}\\,dx\\)",
        "cat": "Decisive on p-Series"
      },
      {
        "s": "Limit comparison test with harmonic series",
        "cat": "Decisive on p-Series"
      },
      {
        "s": "Ratio test on rational terms \\(a_n = \\frac{1}{n^p}\\)",
        "cat": "Inconclusive when Limit Equals 1"
      },
      {
        "s": "Root test on rational terms \\(a_n = \\frac{1}{n^p}\\)",
        "cat": "Inconclusive when Limit Equals 1"
      }
    ],
    "ex": "Ratio and root tests always yield L = 1 on polynomial/p-series and are inconclusive.",
    "ti_ar": "تصنيف: موثوقية اختبارات التقارب",
    "categories_ar": [
      "حاسم على متسلسلات p",
      "غير حاسم عندما تساوي النهاية 1"
    ],
    "items_ar": [
      {
        "s": "اختبار متسلسلة p (يفحص الأس \\(p > 1\\))",
        "cat": 0
      },
      {
        "s": "اختبار التكامل بمقارنة \\(\\int_1^\\infty \\frac{1}{x^p}\\,dx\\)",
        "cat": 0
      },
      {
        "s": "اختبار مقارنة النهايات مع المتسلسلة التوافقية",
        "cat": 0
      },
      {
        "s": "اختبار النسبة للحدود النسبية \\(a_n = \\frac{1}{n^p}\\)",
        "cat": 1
      },
      {
        "s": "اختبار الجذر للحدود النسبية \\(a_n = \\frac{1}{n^p}\\)",
        "cat": 1
      }
    ],
    "ex_ar": "يعطي اختبارا النسبة والجذر دائماً L = 1 على الحدود كثيرة الحدود ومتسلسلات p ويكونان غير حاسمين."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Ratio Test on \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{n}{2^n}\\)",
    "steps": [
      "Let \\(a_n=\\dfrac{n}{2^n}\\). Compute \\(\\left|\\dfrac{a_{n+1}}{a_n}\\right|=\\dfrac{n+1}{2^{n+1}}\\cdot\\dfrac{2^n}{n}=\\dfrac{n+1}{2n}\\).",
      "Take the limit as \\(n\\to\\infty\\): \\(\\displaystyle\\lim_{n\\to\\infty}\\dfrac{n+1}{2n}=\\dfrac12\\).",
      "Since the limit \\(\\dfrac12<1\\), the Ratio Test confirms the series converges."
    ],
    "ti_ar": "مثال محلول: اختبار النسبة على \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{n}{2^n}\\)",
    "steps_ar": [
      "نفرض \\(a_n=\\dfrac{n}{2^n}\\). احسب \\(\\left|\\dfrac{a_{n+1}}{a_n}\\right|=\\dfrac{n+1}{2^{n+1}}\\cdot\\dfrac{2^n}{n}=\\dfrac{n+1}{2n}\\).",
      "حساب النهاية عندما \\(n\\to\\infty\\): \\(\\displaystyle\\lim_{n\\to\\infty}\\dfrac{n+1}{2n}=\\dfrac12\\).",
      "بما أن النهاية \\(\\dfrac12<1\\)، فإن اختبار النسبة يؤكد أن المتسلسلة متقاربة."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Ratio Test",
    "q": "The Ratio Test is inconclusive when the limit equals:",
    "o": [
      "0",
      "1",
      "∞",
      "−1"
    ],
    "a": 1,
    "ex": "When \\(L=1\\), the Ratio Test gives no information — another test is needed.",
    "ti_ar": "فحص سريع: اختبار النسبة",
    "q_ar": "يكون اختبار النسبة غير حاسم عندما تساوي النهاية:",
    "o_ar": [
      "0",
      "1",
      "∞",
      "−1"
    ],
    "ex_ar": "عندما يكون \\(L=1\\)، لا يقدم اختبار النسبة أي معلومة — ويلزم استخدام اختبار آخر."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Convergence Tests &amp; Power Series)",
    "q": "A student differentiates the implicit curve \\(x^2 + 4xy + y^2 = 30\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(4xy\\) with respect to \\(x\\) as \\(4\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(30\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(4xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(4y + 4x\\dfrac{dy}{dx}\\), not \\(4\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(30\\) remains \\(30\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(4xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(4xy\\) gives \\(4y + 4x\\dfrac{dy}{dx}\\). Thus \\(2x + 4y + (4x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Convergence Tests &amp; Power Series)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 4xy + y^2 = 30\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(4xy\\) بالنسبة إلى \\(x\\) على أنه \\(4\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(4xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(4y + 4x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(4xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(4xy\\) نحصل على \\(4y + 4x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Convergence Tests &amp; Power Series)",
    "q": "Consider the curve \\(y = 4x^3 - 6x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 4\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 12x^2 - 12x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 4\\): \\(m = 12(4)^2 - 12(4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 180\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(12x - 12) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{12}{12}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Convergence Tests &amp; Power Series)",
    "q_ar": "لمنحنى الدالة \\(y = 4x^3 - 6x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 4\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Convergence Tests &amp; Power Series)",
    "steps": [
      {
        "l": "Given \\(f(x) = 4x^2 + 6x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "8",
        "h": "Multiply power 2 by 4."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "6",
        "h": "The derivative of 6x is 6."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(4) =\\)",
        "a": "38",
        "h": "Compute 8(4) + 6."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Convergence Tests &amp; Power Series)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 4x^2 + 6x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "8",
        "h": "اضرب الأس 2 في 4."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "مشتقة 6x هي 6."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(4) =\\)",
        "a": "38",
        "h": "احسب 8(4) + 6."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Convergence Tests &amp; Power Series)",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Convergence Tests &amp; Power Series)",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];

D["ch-vectors"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: 3D Vector Magnitude",
    "q": "Find the magnitude of the vector \\(\\vec v = \\langle 3, 4, 12\\rangle\\).",
    "a": 13,
    "ex": "\\(|\\vec v| = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13\\).",
    "ti_ar": "إدخال رقمي: مقدار المتجه ثلاثي الأبعاد",
    "q_ar": "أوجد مقدار المتجه \\(\\vec v = \\langle 3, 4, 12\\rangle\\).",
    "ex_ar": "\\(|\\vec v| = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Computing Angle Between Two Vectors",
    "prompt": "Arrange the steps to find the angle between vectors u and v:",
    "items": [
      "Calculate the dot product: \\(\\vec u \\cdot \\vec v = u_1v_1 + u_2v_2 + u_3v_3\\).",
      "Calculate magnitude \\(|\\vec u| = \\sqrt{u_1^2 + u_2^2 + u_3^2}\\).",
      "Calculate magnitude \\(|\\vec v| = \\sqrt{v_1^2 + v_2^2 + v_3^2}\\).",
      "Divide dot product by product of magnitudes: \\(\\cos\\theta = \\frac{\\vec u \\cdot \\vec v}{|\\vec u||\\vec v|}\\).",
      "Take the inverse cosine: \\(\\theta = \\cos^{-1}\\left(\\frac{\\vec u \\cdot \\vec v}{|\\vec u||\\vec v|}\\right)\\)."
    ],
    "ex": "Dot product, magnitudes, divide to get cos(theta), and take arccosine.",
    "ti_ar": "ترتيب الخطوات: حساب الزاوية بين متجهين",
    "prompt_ar": "رتّب خطوات إيجاد الزاوية بين المتجهين u و v:",
    "items_ar": [
      "حساب الضرب القياسي: \\(\\vec u \\cdot \\vec v = u_1v_1 + u_2v_2 + u_3v_3\\).",
      "حساب المقدار \\(|\\vec u| = \\sqrt{u_1^2 + u_2^2 + u_3^2}\\).",
      "حساب المقدار \\(|\\vec v| = \\sqrt{v_1^2 + v_2^2 + v_3^2}\\).",
      "قسمة الضرب القياسي على حاصل ضرب المقدارين: \\(\\cos\\theta = \\frac{\\vec u \\cdot \\vec v}{|\\vec u||\\vec v|}\\).",
      "أخذ جيب التمام العكسي: \\(\\theta = \\cos^{-1}\\left(\\frac{\\vec u \\cdot \\vec v}{|\\vec u||\\vec v|}\\right)\\)."
    ],
    "ex_ar": "الضرب القياسي، المقادير، القسمة للحصول على cos(theta)، وأخذ الدالة العكسية."
  },
  {
    "t": "cat",
    "ti": "Categorize: Vector Multiplication Operations",
    "categories": [
      "Dot Product (u · v)",
      "Cross Product (u × v)"
    ],
    "items": [
      {
        "s": "Result is a scalar quantity (real number)",
        "cat": "Dot Product (u · v)"
      },
      {
        "s": "Zero when non-zero vectors are perpendicular",
        "cat": "Dot Product (u · v)"
      },
      {
        "s": "Commutative: \\(\\vec u \\cdot \\vec v = \\vec v \\cdot \\vec u\\)",
        "cat": "Dot Product (u · v)"
      },
      {
        "s": "Result is a 3D vector orthogonal to both inputs",
        "cat": "Cross Product (u × v)"
      },
      {
        "s": "Zero when non-zero vectors are parallel",
        "cat": "Cross Product (u × v)"
      },
      {
        "s": "Anticommutative: \\(\\vec u \\times \\vec v = -(\\vec v \\times \\vec u)\\)",
        "cat": "Cross Product (u × v)"
      }
    ],
    "ex": "Dot product produces a scalar; cross product produces a perpendicular 3D vector.",
    "ti_ar": "تصنيف: عمليات ضرب المتجهات",
    "categories_ar": [
      "الضرب القياسي (u · v)",
      "الضرب الاتجاهي (u × v)"
    ],
    "items_ar": [
      {
        "s": "الناتج كمية قياسية (عدد حقيقي)",
        "cat": 0
      },
      {
        "s": "يساوي صفراً عندما يكون المتجهان غير الصفريين متعامدين",
        "cat": 0
      },
      {
        "s": "إبدالي: \\(\\vec u \\cdot \\vec v = \\vec v \\cdot \\vec u\\)",
        "cat": 0
      },
      {
        "s": "الناتج متجه ثلاثي الأبعاد عمودي على كلا المدخلين",
        "cat": 1
      },
      {
        "s": "يساوي صفراً عندما يكون المتجهان غير الصفريين متوازيين",
        "cat": 1
      },
      {
        "s": "غير إبدالي (مضاد للتبادل): \\(\\vec u \\times \\vec v = -(\\vec v \\times \\vec u)\\)",
        "cat": 1
      }
    ],
    "ex_ar": "ينتج الضرب القياسي عدداً قياسياً؛ بينما ينتج الضرب الاتجاهي متجهاً ثلاثي الأبعاد عمودياً عليهما."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Angle Between \\(\\vec u=\\langle3,4\\rangle\\) and \\(\\vec v=\\langle4,-3\\rangle\\)",
    "steps": [
      "Compute the dot product: \\(\\vec u\\cdot\\vec v=3(4)+4(-3)=12-12=0\\).",
      "Compute the magnitudes: \\(|\\vec u|=\\sqrt{9+16}=5\\), \\(|\\vec v|=\\sqrt{16+9}=5\\).",
      "Use \\(\\cos\\theta=\\dfrac{\\vec u\\cdot\\vec v}{|\\vec u||\\vec v|}=\\dfrac{0}{25}=0\\).",
      "So \\(\\theta=\\cos^{-1}(0)=90°\\) — the vectors are perpendicular."
    ],
    "ti_ar": "مثال محلول: الزاوية بين \\(\\vec u=\\langle3,4\\rangle\\) و \\(\\vec v=\\langle4,-3\\rangle\\)",
    "steps_ar": [
      "حساب الضرب القياسي: \\(\\vec u\\cdot\\vec v=3(4)+4(-3)=12-12=0\\).",
      "حساب المقادير: \\(|\\vec u|=\\sqrt{9+16}=5\\)، و \\(|\\vec v|=\\sqrt{16+9}=5\\).",
      "استخدام الصيغة \\(\\cos\\theta=\\dfrac{\\vec u\\cdot\\vec v}{|\\vec u||\\vec v|}=\\dfrac{0}{25}=0\\).",
      "إذن \\(\\theta=\\cos^{-1}(0)=90°\\) — المتجهان متعامدان."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Dot Products",
    "q": "If \\(\\vec u\\cdot\\vec v=0\\) and neither vector is zero, the vectors are:",
    "o": [
      "Parallel",
      "Perpendicular",
      "Equal",
      "Opposite"
    ],
    "a": 1,
    "ex": "A zero dot product means the vectors are orthogonal (perpendicular).",
    "ti_ar": "فحص سريع: الضرب القياسي",
    "q_ar": "إذا كان \\(\\vec u\\cdot\\vec v=0\\) ولم يكن أي من المتجهين متجهاً صفرياً، فإن المتجهين:",
    "o_ar": [
      "متوازيان",
      "متعامدان",
      "متساويان",
      "متعاكسان"
    ],
    "ex_ar": "الضرب القياسي الصفري يعني أن المتجهين متعامدان (Orthogonal)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Vectors &amp; Vector-Valued Functions)",
    "q": "A student differentiates the implicit curve \\(x^2 + 3xy + y^2 = 0\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(3xy\\) with respect to \\(x\\) as \\(3\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(0\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(3xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(3y + 3x\\dfrac{dy}{dx}\\), not \\(3\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(0\\) remains \\(0\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(3xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(3xy\\) gives \\(3y + 3x\\dfrac{dy}{dx}\\). Thus \\(2x + 3y + (3x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Vectors &amp; Vector-Valued Functions)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 3xy + y^2 = 0\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(3xy\\) بالنسبة إلى \\(x\\) على أنه \\(3\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(3xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(3y + 3x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(3xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(3xy\\) نحصل على \\(3y + 3x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Vectors &amp; Vector-Valued Functions)",
    "q": "Consider the curve \\(y = 3x^3 - 0x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 1\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 9x^2 - 0x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 1\\): \\(m = 9(1)^2 - 0(1)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 9\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(9x - 0) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{0}{9}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Vectors &amp; Vector-Valued Functions)",
    "q_ar": "لمنحنى الدالة \\(y = 3x^3 - 0x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 1\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Vectors &amp; Vector-Valued Functions)",
    "steps": [
      {
        "l": "Given \\(f(x) = 3x^2 + 0x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "6",
        "h": "Multiply power 2 by 3."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "0",
        "h": "The derivative of 0x is 0."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(1) =\\)",
        "a": "6",
        "h": "Compute 6(1) + 0."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Vectors &amp; Vector-Valued Functions)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 3x^2 + 0x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "اضرب الأس 2 في 3."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "0",
        "h": "مشتقة 0x هي 0."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(1) =\\)",
        "a": "6",
        "h": "احسب 6(1) + 0."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Vectors &amp; Vector-Valued Functions)",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Vectors &amp; Vector-Valued Functions)",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];

D["ch-partial"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Evaluating Partial Derivative",
    "q": "For \\(f(x, y) = 3x^2y + 4y^2\\), find the value of \\(f_x(2, 3)\\).",
    "a": 36,
    "ex": "Treat \\(y\\) as constant: \\(f_x = 6xy\\). At \\((2, 3)\\): \\(6(2)(3) = 36\\).",
    "ti_ar": "إدخال رقمي: حساب المشتقة الجزئية",
    "q_ar": "للدالة \\(f(x, y) = 3x^2y + 4y^2\\)، أوجد قيمة \\(f_x(2, 3)\\).",
    "ex_ar": "معاملة \\(y\\) كثابت: \\(f_x = 6xy\\). عند \\((2, 3)\\): \\(6(2)(3) = 36\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Classifying Critical Points in Two Variables",
    "prompt": "Arrange the steps to find and classify local extrema of f(x, y):",
    "items": [
      "Set partial derivatives to zero: \\(f_x = 0\\) and \\(f_y = 0\\).",
      "Solve simultaneously to find critical points \\((a, b)\\).",
      "Compute second partial derivatives: \\(f_{xx}, f_{yy}, f_{xy}\\).",
      "Compute discriminant: \\(D = f_{xx}f_{yy} - (f_{xy})^2\\).",
      "Classify: D < 0 is saddle; D > 0 with f_xx > 0 is local min; D > 0 with f_xx < 0 is local max."
    ],
    "ex": "Find critical points, compute second partials, evaluate discriminant D, and classify.",
    "ti_ar": "ترتيب الخطوات: تصنيف النقاط الحرجة في متغيرين",
    "prompt_ar": "رتّب خطوات إيجاد وتصنيف القيم القصوى المحلية للدالة f(x, y):",
    "items_ar": [
      "مساواة المشتقات الجزئية بالصفر: \\(f_x = 0\\) و \\(f_y = 0\\).",
      "حل المعادلتين آنياً لإيجاد النقاط الحرجة \\((a, b)\\).",
      "حساب المشتقات الجزئية من الرتبة الثانية: \\(f_{xx}, f_{yy}, f_{xy}\\).",
      "حساب المميز: \\(D = f_{xx}f_{yy} - (f_{xy})^2\\).",
      "التصنيف: إذا كان D < 0 فنقطة سرج؛ وإذا كان D > 0 مع f_xx > 0 فصغرى محلية؛ وإذا كان D > 0 مع f_xx < 0 فعظمى محلية."
    ],
    "ex_ar": "إيجاد النقاط الحرجة، حساب المشتقات الثانية، حساب المميز D، وتصنيف النقاط."
  },
  {
    "t": "cat",
    "ti": "Categorize: Second Derivative Test Outcomes in 2D",
    "categories": [
      "Local Minimum",
      "Local Maximum",
      "Saddle Point"
    ],
    "items": [
      {
        "s": "\\(D > 0\\) and \\(f_{xx} > 0\\)",
        "cat": "Local Minimum"
      },
      {
        "s": "Surface opens upward in every vertical slice",
        "cat": "Local Minimum"
      },
      {
        "s": "\\(D > 0\\) and \\(f_{xx} < 0\\)",
        "cat": "Local Maximum"
      },
      {
        "s": "Surface opens downward in every vertical slice",
        "cat": "Local Maximum"
      },
      {
        "s": "\\(D < 0\\)",
        "cat": "Saddle Point"
      },
      {
        "s": "Surface opens upward in one direction and downward in another",
        "cat": "Saddle Point"
      }
    ],
    "ex": "D > 0 yields true extrema based on sign of f_xx; D < 0 yields a saddle point.",
    "ti_ar": "تصنيف: نتائج اختبار المشتقة الثانية في بعدين",
    "categories_ar": [
      "قيمة صغرى محلية",
      "قيمة عظمى محلية",
      "نقطة سرج (Saddle Point)"
    ],
    "items_ar": [
      {
        "s": "\\(D > 0\\) و \\(f_{xx} > 0\\)",
        "cat": 0
      },
      {
        "s": "السطح يفتح لأعلى في كل مقطع رأسي",
        "cat": 0
      },
      {
        "s": "\\(D > 0\\) و \\(f_{xx} < 0\\)",
        "cat": 1
      },
      {
        "s": "السطح يفتح لأسفل في كل مقطع رأسي",
        "cat": 1
      },
      {
        "s": "\\(D < 0\\)",
        "cat": 2
      },
      {
        "s": "السطح يفتح لأعلى في اتجاه ولأسفل في اتجاه آخر",
        "cat": 2
      }
    ],
    "ex_ar": "D > 0 يعطي قيماً قصوى حقيقية بناءً على إشارة f_xx؛ بينما D < 0 يعطي نقطة سرج."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Partial Derivatives of \\(f(x,y)=x^2y+3xy^2\\)",
    "steps": [
      "To find \\(f_x\\), treat \\(y\\) as a constant and differentiate with respect to \\(x\\): \\(f_x=2xy+3y^2\\).",
      "To find \\(f_y\\), treat \\(x\\) as a constant and differentiate with respect to \\(y\\): \\(f_y=x^2+6xy\\).",
      "The gradient is \\(\\nabla f=\\langle 2xy+3y^2,\\ x^2+6xy\\rangle\\)."
    ],
    "ti_ar": "مثال محلول: المشتقات الجزئية للدالة \\(f(x,y)=x^2y+3xy^2\\)",
    "steps_ar": [
      "لإيجاد \\(f_x\\)، نعامل \\(y\\) كثابت ونشتق بالنسبة إلى \\(x\\): \\(f_x=2xy+3y^2\\).",
      "لإيجاد \\(f_y\\)، نعامل \\(x\\) كثابت ونشتق بالنسبة إلى \\(y\\): \\(f_y=x^2+6xy\\).",
      "متجه التدرج هو \\(\\nabla f=\\langle 2xy+3y^2,\\ x^2+6xy\\rangle\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Partial Derivatives",
    "q": "For \\(f(x,y)=x^3y^2\\), what is \\(\\partial f/\\partial y\\)?",
    "o": [
      "\\(2x^3y\\)",
      "\\(3x^2y^2\\)",
      "\\(x^3y\\)",
      "\\(2x^2y\\)"
    ],
    "a": 0,
    "ex": "Treat \\(x\\) as constant: \\(\\frac{\\partial}{\\partial y}(x^3y^2)=x^3\\cdot2y=2x^3y\\).",
    "ti_ar": "فحص سريع: المشتقات الجزئية",
    "q_ar": "للدالة \\(f(x,y)=x^3y^2\\)، ما هي قيمة \\(\\partial f/\\partial y\\)؟",
    "o_ar": [
      "\\(2x^3y\\)",
      "\\(3x^2y^2\\)",
      "\\(x^3y\\)",
      "\\(2x^2y\\)"
    ],
    "ex_ar": "معاملة \\(x\\) كثابت: \\(\\frac{\\partial}{\\partial y}(x^3y^2)=x^3\\cdot2y=2x^3y\\)."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Partial Derivatives &amp; the Gradient)",
    "q": "A student differentiates the implicit curve \\(x^2 + 4xy + y^2 = -5\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(4xy\\) with respect to \\(x\\) as \\(4\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(-5\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(4xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(4y + 4x\\dfrac{dy}{dx}\\), not \\(4\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(-5\\) remains \\(-5\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(4xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(4xy\\) gives \\(4y + 4x\\dfrac{dy}{dx}\\). Thus \\(2x + 4y + (4x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Partial Derivatives &amp; the Gradient)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 4xy + y^2 = -5\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(4xy\\) بالنسبة إلى \\(x\\) على أنه \\(4\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(4xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(4y + 4x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(4xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(4xy\\) نحصل على \\(4y + 4x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 4y}{4x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Partial Derivatives &amp; the Gradient)",
    "q": "Consider the curve \\(y = 4x^3 + x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 12x^2 - -2x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 12(2)^2 - -2(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 50\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(12x - -2) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{-2}{12}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Partial Derivatives &amp; the Gradient)",
    "q_ar": "لمنحنى الدالة \\(y = 4x^3 + x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Partial Derivatives &amp; the Gradient)",
    "steps": [
      {
        "l": "Given \\(f(x) = 4x^2 - x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "8",
        "h": "Multiply power 2 by 4."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "-1",
        "h": "The derivative of -x is -1."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "15",
        "h": "Compute 8(2) + -1."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Partial Derivatives &amp; the Gradient)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 4x^2 - x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "8",
        "h": "اضرب الأس 2 في 4."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "-1",
        "h": "مشتقة -x هي -1."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "15",
        "h": "احسب 8(2) + -1."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Partial Derivatives &amp; the Gradient)",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Partial Derivatives &amp; the Gradient)",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];

D["ch-multiint"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Double Integral over Rectangle",
    "q": "Evaluate \\(\\displaystyle\\int_0^2\\!\\int_0^3 1\\,dx\\,dy\\).",
    "a": 6,
    "ex": "The integral of 1 over a region equals the area of the region: \\(2 \\times 3 = 6\\).",
    "ti_ar": "إدخال رقمي: تكامل ثنائي على مستطيل",
    "q_ar": "احسب قيمة \\(\\displaystyle\\int_0^2\\!\\int_0^3 1\\,dx\\,dy\\).",
    "ex_ar": "تكامل العدد 1 على منطقة يساوي مساحة المنطقة: \\(2 \\times 3 = 6\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Changing to Polar Coordinates in Double Integrals",
    "prompt": "Arrange the steps to convert a Cartesian double integral to polar:",
    "items": [
      "Determine the radial limits: \\(r_1 \\le r \\le r_2\\).",
      "Determine the angular limits: \\(\\alpha \\le \\theta \\le \\beta\\).",
      "Substitute coordinates: \\(x = r\\cos\\theta\\) and \\(y = r\\sin\\theta\\).",
      "Replace area element: \\(dA = r\\,dr\\,d\\theta\\) (insert Jacobian r).",
      "Evaluate the iterated polar integral."
    ],
    "ex": "Find r bounds, find theta bounds, substitute x and y, insert r dr dtheta, integrate.",
    "ti_ar": "ترتيب الخطوات: التحويل إلى الإحداثيات القطبية في التكاملات الثنائية",
    "prompt_ar": "رتّب خطوات تحويل التكامل الثنائي الديكارتي إلى قطبي:",
    "items_ar": [
      "تحديد حدود نصف القطر: \\(r_1 \\le r \\le r_2\\).",
      "تحديد حدود الزاوية: \\(\\alpha \\le \\theta \\le \\beta\\).",
      "التعويض عن الإحداثيات: \\(x = r\\cos\\theta\\) و \\(y = r\\sin\\theta\\).",
      "استبدال عنصر المساحة: \\(dA = r\\,dr\\,d\\theta\\) (إدراج عامل جاكوبي r).",
      "حساب التكامل القطبي التكراري."
    ],
    "ex_ar": "إيجاد حدود r، إيجاد حدود theta، تعويض x و y، إدراج r dr dtheta، والتكامل."
  },
  {
    "t": "cat",
    "ti": "Categorize: Coordinate Systems for Multiple Integrals",
    "categories": [
      "Cartesian Volume Element dV",
      "Cylindrical Volume Element dV",
      "Spherical Volume Element dV"
    ],
    "items": [
      {
        "s": "\\(dx\\,dy\\,dz\\)",
        "cat": "Cartesian Volume Element dV"
      },
      {
        "s": "Rectangular box partition",
        "cat": "Cartesian Volume Element dV"
      },
      {
        "s": "\\(r\\,dr\\,d\\theta\\,dz\\)",
        "cat": "Cylindrical Volume Element dV"
      },
      {
        "s": "Ideal for pipes, cylinders, and axial rotational symmetry",
        "cat": "Cylindrical Volume Element dV"
      },
      {
        "s": "\\(\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta\\)",
        "cat": "Spherical Volume Element dV"
      },
      {
        "s": "Ideal for spheres, cones, and central field models",
        "cat": "Spherical Volume Element dV"
      }
    ],
    "ex": "Cartesian uses dx dy dz; cylindrical adds r; spherical adds rho² sin(phi).",
    "ti_ar": "تصنيف: أنظمة الإحداثيات للتكاملات المتعددة",
    "categories_ar": [
      "عنصر الحجم الديكارتي dV",
      "عنصر الحجم الأسطواني dV",
      "عنصر الحجم الكروي dV"
    ],
    "items_ar": [
      {
        "s": "\\(dx\\,dy\\,dz\\)",
        "cat": 0
      },
      {
        "s": "تقسيم الصندوق المستطيل",
        "cat": 0
      },
      {
        "s": "\\(r\\,dr\\,d\\theta\\,dz\\)",
        "cat": 1
      },
      {
        "s": "مثالي للأنابيب والأسطوانات والتماثل الدوراني المحوري",
        "cat": 1
      },
      {
        "s": "\\(\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta\\)",
        "cat": 2
      },
      {
        "s": "مثالي للكرات والمخاريط ونماذج المجالات المركزية",
        "cat": 2
      }
    ],
    "ex_ar": "يستخدم الديكارتي dx dy dz؛ ويضيف الأسطواني r؛ ويضيف الكروي rho² sin(phi)."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Evaluate \\(\\displaystyle\\int_0^1\\!\\int_0^2 xy\\,dy\\,dx\\)",
    "steps": [
      "Integrate with respect to \\(y\\) first, treating \\(x\\) as constant: \\(\\displaystyle\\int_0^2 xy\\,dy=x\\cdot\\dfrac{y^2}{2}\\Big|_0^2=2x\\).",
      "Now integrate the result with respect to \\(x\\): \\(\\displaystyle\\int_0^1 2x\\,dx=x^2\\Big|_0^1=1\\).",
      "The value of the double integral is \\(1\\)."
    ],
    "ti_ar": "مثال محلول: حساب \\(\\displaystyle\\int_0^1\\!\\int_0^2 xy\\,dy\\,dx\\)",
    "steps_ar": [
      "المكاملة بالنسبة إلى \\(y\\) أولاً مع معاملة \\(x\\) كثابت: \\(\\displaystyle\\int_0^2 xy\\,dy=x\\cdot\\dfrac{y^2}{2}\\Big|_0^2=2x\\).",
      "الآن مكاملة الناتج بالنسبة إلى \\(x\\): \\(\\displaystyle\\int_0^1 2x\\,dx=x^2\\Big|_0^1=1\\).",
      "قيمة التكامل الثنائي هي \\(1\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Order of Integration",
    "q": "For a double integral over a rectangle, in what order can you integrate?",
    "o": [
      "Only \\(dx\\) then \\(dy\\)",
      "Only \\(dy\\) then \\(dx\\)",
      "Either order (Fubini's Theorem)",
      "Neither — must use polar coordinates"
    ],
    "a": 2,
    "ex": "Fubini's Theorem guarantees the order doesn't matter for continuous functions over a rectangle.",
    "ti_ar": "فحص سريع: ترتيب التكامل",
    "q_ar": "في التكامل الثنائي على مستطيل، بأي ترتيب يمكنك إجراء التكامل؟",
    "o_ar": [
      "فقط \\(dx\\) ثم \\(dy\\)",
      "فقط \\(dy\\) ثم \\(dx\\)",
      "بأي من الترتيبين (مبرهنة فوبيني)",
      "لا هذا ولا ذاك — يجب استخدام الإحداثيات القطبية"
    ],
    "ex_ar": "تضمن مبرهنة فوبيني أن ترتيب التكامل لا يهم بالنسبة للدوال المتصلة على المستطيل."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Multiple Integrals)",
    "q": "A student differentiates the implicit curve \\(x^2 + 2xy + y^2 = 25\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(2xy\\) with respect to \\(x\\) as \\(2\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(25\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(2xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(2y + 2x\\dfrac{dy}{dx}\\), not \\(2\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(25\\) remains \\(25\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(2xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(2xy\\) gives \\(2y + 2x\\dfrac{dy}{dx}\\). Thus \\(2x + 2y + (2x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 2y}{2x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Multiple Integrals)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 2xy + y^2 = 25\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(2xy\\) بالنسبة إلى \\(x\\) على أنه \\(2\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(2xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(2y + 2x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(2xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(2xy\\) نحصل على \\(2y + 2x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 2y}{2x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Multiple Integrals)",
    "q": "Consider the curve \\(y = 2x^3 - 5x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 4\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 6x^2 - 10x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 4\\): \\(m = 6(4)^2 - 10(4)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 86\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(6x - 10) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{10}{6}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Multiple Integrals)",
    "q_ar": "لمنحنى الدالة \\(y = 2x^3 - 5x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 4\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Multiple Integrals)",
    "steps": [
      {
        "l": "Given \\(f(x) = 2x^2 + 5x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "4",
        "h": "Multiply power 2 by 2."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "5",
        "h": "The derivative of 5x is 5."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(4) =\\)",
        "a": "21",
        "h": "Compute 4(4) + 5."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Multiple Integrals)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 2x^2 + 5x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "4",
        "h": "اضرب الأس 2 في 2."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "5",
        "h": "مشتقة 5x هي 5."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(4) =\\)",
        "a": "21",
        "h": "احسب 4(4) + 5."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Multiple Integrals)",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Multiple Integrals)",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];

D["ch-vectorcalc"] = [
  {
    "t": "num",
    "ti": "Numeric Entry: Divergence Calculation",
    "q": "If \\(\\vec F = \\langle 3x, 4y, 5z\\rangle\\), find \\(\\text{div}(\\vec F)\\).",
    "a": 12,
    "ex": "\\(\\text{div}(\\vec F) = \\frac{\\partial}{\\partial x}(3x) + \\frac{\\partial}{\\partial y}(4y) + \\frac{\\partial}{\\partial z}(5z) = 3 + 4 + 5 = 12\\).",
    "ti_ar": "إدخال رقمي: حساب التباعد (Divergence)",
    "q_ar": "إذا كان \\(\\vec F = \\langle 3x, 4y, 5z\\rangle\\)، فأوجد \\(\\text{div}(\\vec F)\\).",
    "ex_ar": "\\(\\text{div}(\\vec F) = \\frac{\\partial}{\\partial x}(3x) + \\frac{\\partial}{\\partial y}(4y) + \\frac{\\partial}{\\partial z}(5z) = 3 + 4 + 5 = 12\\)."
  },
  {
    "t": "ord",
    "ti": "Order the Steps: Applying Green's Theorem",
    "prompt": "Arrange the steps to convert a line integral around curve C to a double integral:",
    "items": [
      "Confirm that curve C is a closed, positively oriented (counterclockwise) loop.",
      "Identify vector field components: \\(P(x, y)\\) and \\(Q(x, y)\\).",
      "Compute partial derivatives: \\(\\frac{\\partial Q}{\\partial x}\\) and \\(\\frac{\\partial P}{\\partial y}\\).",
      "Formulate double integral integrand: \\(Q_x - P_y\\).",
      "Integrate over the enclosed 2D region R: \\(\\iint_R (Q_x - P_y)\\,dA\\)."
    ],
    "ex": "Verify orientation, identify P and Q, compute Q_x and P_y, set up double integral, evaluate.",
    "ti_ar": "ترتيب الخطوات: تطبيق مبرهنة غرين",
    "prompt_ar": "رتّب خطوات تحويل التكامل الخطي حول المنحنى C إلى تكامل ثنائي:",
    "items_ar": [
      "التحقق من أن المنحنى C مسار مغلق وموجه إيجابياً (عكس اتجاه عقارب الساعة).",
      "تحديد مركبات المجال المتجهي: \\(P(x, y)\\) و \\(Q(x, y)\\).",
      "حساب المشتقات الجزئية: \\(\\frac{\\partial Q}{\\partial x}\\) و \\(\\frac{\\partial P}{\\partial y}\\).",
      "صياغة دالة المكاملة للتكامل الثنائي: \\(Q_x - P_y\\).",
      "المكاملة على المنطقة المستوية المحصورة R: \\(\\iint_R (Q_x - P_y)\\,dA\\)."
    ],
    "ex_ar": "التحقق من الاتجاه، تحديد P و Q، حساب Q_x و P_y، إعداد التكامل الثنائي وحسابه."
  },
  {
    "t": "cat",
    "ti": "Categorize: Vector Calculus Differential Operators",
    "categories": [
      "Gradient (∇f)",
      "Divergence (∇ · F)",
      "Curl (∇ × F)"
    ],
    "items": [
      {
        "s": "Operates on scalar field and outputs vector field",
        "cat": "Gradient (∇f)"
      },
      {
        "s": "Points in direction of steepest ascent of surface",
        "cat": "Gradient (∇f)"
      },
      {
        "s": "Operates on vector field and outputs scalar field",
        "cat": "Divergence (∇ · F)"
      },
      {
        "s": "Measures net expansion or outward flux per unit volume",
        "cat": "Divergence (∇ · F)"
      },
      {
        "s": "Operates on 3D vector field and outputs 3D vector field",
        "cat": "Curl (∇ × F)"
      },
      {
        "s": "Measures rotational tendency and circulation density",
        "cat": "Curl (∇ × F)"
      }
    ],
    "ex": "Gradient maps scalar to vector; divergence maps vector to scalar; curl maps vector to vector.",
    "ti_ar": "تصنيف: مؤثرات التفاضل في حساب المتجهات",
    "categories_ar": [
      "التدرج (∇f)",
      "التباعد (∇ · F)",
      "الالتفاف (∇ × F)"
    ],
    "items_ar": [
      {
        "s": "يؤثر على مجال قياسي وينتج مجالاً متجهياً",
        "cat": 0
      },
      {
        "s": "يشير إلى اتجاه أقصى صعود للسطح",
        "cat": 0
      },
      {
        "s": "يؤثر على مجال متجهي وينتج مجالاً قياسياً",
        "cat": 1
      },
      {
        "s": "يقيس صافي التمدد أو التدفق الخارجي لكل وحدة حجم",
        "cat": 1
      },
      {
        "s": "يؤثر على مجال متجهي ثلاثي الأبعاد وينتج مجالاً متجهياً ثلاثي الأبعاد",
        "cat": 2
      },
      {
        "s": "يقيس النزعة الدورانية وكثافة الدوران",
        "cat": 2
      }
    ],
    "ex_ar": "ينقل التدرج القياسي إلى متجه؛ والتباعد المتجه إلى قياسي؛ والالتفاف المتجه إلى متجه."
  },
  {
    "t": "sr",
    "ti": "Worked Example: Divergence of \\(\\vec F=\\langle x^2y,\\ yz,\\ xz^2\\rangle\\)",
    "steps": [
      "Divergence formula: \\(\\text{div}\\,\\vec F=\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}\\), where \\(\\vec F=\\langle P,Q,R\\rangle\\).",
      "Compute each term: \\(\\dfrac{\\partial}{\\partial x}(x^2y)=2xy\\), \\(\\dfrac{\\partial}{\\partial y}(yz)=z\\), \\(\\dfrac{\\partial}{\\partial z}(xz^2)=2xz\\).",
      "Sum them: \\(\\text{div}\\,\\vec F=2xy+z+2xz\\)."
    ],
    "ti_ar": "مثال محلول: تباعد المجال \\(\\vec F=\\langle x^2y,\\ yz,\\ xz^2\\rangle\\)",
    "steps_ar": [
      "صيغة التباعد: \\(\\text{div}\\,\\vec F=\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}\\)، حيث \\(\\vec F=\\langle P,Q,R\\rangle\\).",
      "حساب كل حد: \\(\\dfrac{\\partial}{\\partial x}(x^2y)=2xy\\)، و \\(\\dfrac{\\partial}{\\partial y}(yz)=z\\)، و \\(\\dfrac{\\partial}{\\partial z}(xz^2)=2xz\\).",
      "جمع الحدود: \\(\\text{div}\\,\\vec F=2xy+z+2xz\\)."
    ]
  },
  {
    "t": "qc",
    "ti": "Quick Check: Divergence",
    "q": "The divergence of a vector field is a:",
    "o": [
      "Vector",
      "Scalar",
      "Matrix",
      "Unit vector"
    ],
    "a": 1,
    "ex": "Divergence measures a scalar rate of \"outflow\" at each point — it is a scalar field, not a vector.",
    "ti_ar": "فحص سريع: التباعد",
    "q_ar": "تباعد المجال المتجهي هو عبارة عن:",
    "o_ar": [
      "متجه",
      "كمية قياسية",
      "مصفوفة",
      "متجه وحدة"
    ],
    "ex_ar": "يقيس التباعد معدلاً قياسياً لـ \"التدفق نحو الخارج\" عند كل نقطة — وهو مجال قياسي وليس متجهاً."
  },
  {
    "t": "se",
    "ti": "Spot the Error: Implicit Differentiation & Product Rule (Vector Calculus)",
    "q": "A student differentiates the implicit curve \\(x^2 + 3xy + y^2 = 15\\) with respect to \\(x\\). Identify the step with the mathematical flaw:",
    "steps": [
      "Differentiate \\(x^2\\) with respect to \\(x\\) to obtain \\(2x\\).",
      "Differentiate the middle term \\(3xy\\) with respect to \\(x\\) as \\(3\\dfrac{dy}{dx}\\).",
      "Differentiate \\(y^2\\) using the Chain Rule as \\(2y\\dfrac{dy}{dx}\\) and the constant \\(15\\) as \\(0\\).",
      "Collect \\(\\dfrac{dy}{dx}\\) terms and divide to isolate \\(\\dfrac{dy}{dx}\\)."
    ],
    "errorStep": 2,
    "reasons": [
      "The term \\(3xy\\) is a product of two functions of \\(x\\); by the Product Rule its derivative is \\(3y + 3x\\dfrac{dy}{dx}\\), not \\(3\\dfrac{dy}{dx}\\).",
      "The derivative of \\(y^2\\) with respect to \\(x\\) is simply \\(2y\\) without \\(\\dfrac{dy}{dx}\\).",
      "The constant \\(15\\) remains \\(15\\) after differentiation."
    ],
    "correctReason": 0,
    "h": "Look closely at how the product \\(3xy\\) was differentiated in Step 2.",
    "sol": "Applying the Product Rule to \\(3xy\\) gives \\(3y + 3x\\dfrac{dy}{dx}\\). Thus \\(2x + 3y + (3x + 2y)\\dfrac{dy}{dx} = 0 \\implies \\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\).",
    "ti_ar": "اكتشف الخطأ: الاشتقاق الضمني وقاعدة الضرب (Vector Calculus)",
    "q_ar": "يقوم طالب باشتقاق العلاقة الضمنية \\(x^2 + 3xy + y^2 = 15\\) بالنسبة إلى \\(x\\). حدد الخطوة الخاطئة:",
    "steps_ar": [
      "اشتقاق \\(x^2\\) بالنسبة إلى \\(x\\) ليعطي \\(2x\\).",
      "اشتقاق الحد الأوسط \\(3xy\\) بالنسبة إلى \\(x\\) على أنه \\(3\\dfrac{dy}{dx}\\).",
      "اشتقاق \\(y^2\\) بقاعدة السلسلة ليعطي \\(2y\\dfrac{dy}{dx}\\) ومشتقة الثابت \\(0\\).",
      "تجميع حدود \\(\\dfrac{dy}{dx}\\) وقسمة الطرفين لعزل المشتقة."
    ],
    "reasons_ar": [
      "الحد \\(3xy\\) حاصل ضرب دالتين في \\(x\\)؛ وبقاعدة الضرب مشتقته هي \\(3y + 3x\\dfrac{dy}{dx}\\).",
      "مشتقة \\(y^2\\) هي \\(2y\\) فقط دون \\(\\dfrac{dy}{dx}\\).",
      "مشتقة الثابت تبقى كما هي."
    ],
    "h_ar": "راجع كيفية اشتقاق حاصل الضرب \\(3xy\\) في الخطوة الثانية.",
    "sol_ar": "بتطبيق قاعدة الضرب على \\(3xy\\) نحصل على \\(3y + 3x\\dfrac{dy}{dx}\\)، ومنه \\(\\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}\\)."
  },
  {
    "t": "ms",
    "ti": "Examiner Mode: Tangent, Normal & Stationary Points (Vector Calculus)",
    "q": "Consider the curve \\(y = 3x^3 - 3x^2 + 4\\). (a) Find \\(\\dfrac{dy}{dx}\\) and the gradient of the tangent at \\(x = 2\\). (b) Find the \\(x\\)-coordinates of the stationary points.",
    "parts": [
      {
        "label": "Part (a) — First Derivative & Tangent Gradient",
        "marks": 3,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Differentiate term by term using the power rule: \\(\\dfrac{dy}{dx} = 9x^2 - 6x\\)."
          },
          {
            "code": "M1",
            "marks": 1,
            "text": "Substitute \\(x = 2\\): \\(m = 9(2)^2 - 6(2)\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "Obtain exact tangent gradient \\(m = 30\\)."
          }
        ]
      },
      {
        "label": "Part (b) — Stationary Points Condition",
        "marks": 2,
        "rubric": [
          {
            "code": "M1",
            "marks": 1,
            "text": "Set \\(\\dfrac{dy}{dx} = 0 \\implies x(9x - 6) = 0\\)."
          },
          {
            "code": "A1",
            "marks": 1,
            "text": "State both stationary \\(x\\)-coordinates: \\(x = 0\\) and \\(x = \\dfrac{6}{9}\\)."
          }
        ]
      }
    ],
    "examinerTip": "Always show the explicit equation \\(\\dfrac{dy}{dx} = 0\\) before solving for stationary points—this earns the M1 method mark even if an arithmetic slip occurs.",
    "ti_ar": "وضع المصحح: المماس والنقاط الحرجة (Vector Calculus)",
    "q_ar": "لمنحنى الدالة \\(y = 3x^3 - 3x^2 + 4\\): (أ) أوجد \\(\\dfrac{dy}{dx}\\) وميل المماس عند \\(x = 2\\). (ب) أوجد الإحداثيات السينية للنقاط الحرجة.",
    "examinerTip_ar": "اكتب دائماً شرط النقطة الحرجة \\(\\dfrac{dy}{dx} = 0\\) صراحةً لضمان الحصول على درجة الطريقة (M1)."
  },
  {
    "t": "sb",
    "ti": "Step Builder: Instantaneous Rate of Change (Vector Calculus)",
    "steps": [
      {
        "l": "Given \\(f(x) = 3x^2 + 3x - 5\\), find the coefficient of \\(x\\) in \\(f'(x)\\):",
        "a": "6",
        "h": "Multiply power 2 by 3."
      },
      {
        "l": "Find the constant term in \\(f'(x)\\):",
        "a": "3",
        "h": "The derivative of 3x is 3."
      },
      {
        "l": "Evaluate the instantaneous rate of change \\(f'(2) =\\)",
        "a": "15",
        "h": "Compute 6(2) + 3."
      }
    ],
    "ti_ar": "بناء الخطوات: حساب المشتقة ومعدل التغير اللحظي (Vector Calculus)",
    "steps_ar": [
      {
        "l": "للدالة \\(f(x) = 3x^2 + 3x - 5\\)، معامل \\(x\\) في \\(f'(x)\\) يساوي:",
        "a": "6",
        "h": "اضرب الأس 2 في 3."
      },
      {
        "l": "الحد الثابت في المشتقة \\(f'(x)\\) يساوي:",
        "a": "3",
        "h": "مشتقة 3x هي 3."
      },
      {
        "l": "احسب قيمة المشتقة \\(f'(2) =\\)",
        "a": "15",
        "h": "احسب 6(2) + 3."
      }
    ]
  },
  {
    "t": "mt",
    "ti": "Matching: Differentiation Rules & Analytic Criteria (Vector Calculus)",
    "p": [
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) < 0\\)",
        "r": "Strict local maximum at \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) and \\(f''(c) > 0\\)",
        "r": "Strict local minimum at \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (Product Rule)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (Chain Rule)"
      }
    ],
    "ti_ar": "مطابقة: قواعد الاشتقاق ومعايير القيم القصوى (Vector Calculus)",
    "p_ar": [
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) < 0\\)",
        "r": "نقطة عظمى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(f'(c) = 0\\) و \\(f''(c) > 0\\)",
        "r": "نقطة صغرى محلية عند \\(x = c\\)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[u(x)v(x)]\\)",
        "r": "\\(u'(x)v(x) + u(x)v'(x)\\) (قاعدة الضرب)"
      },
      {
        "l": "\\(\\dfrac{d}{dx}[f(g(x))]\\)",
        "r": "\\(f'(g(x))\\cdot g'(x)\\) (قاعدة السلسلة)"
      }
    ]
  }
];

});
