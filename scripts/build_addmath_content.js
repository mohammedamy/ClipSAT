#!/usr/bin/env node
/**
 * scripts/build_addmath_content.js
 * Generates content/addmath/_meta.json and the 8 core chapters for
 * Cambridge IGCSE Additional Mathematics (0606) & Pearson Edexcel Further Pure (4PM1).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TRACK_DIR = path.join(ROOT, 'content', 'addmath');

if (!fs.existsSync(TRACK_DIR)) {
  fs.mkdirSync(TRACK_DIR, { recursive: true });
}

// 1. Course Meta
const courseMeta = {
  id: "addmath",
  chapterOrder: [
    "am-functions-quadratics",
    "am-polynomials-binomial",
    "am-logs-exponentials",
    "am-trigonometry-circular",
    "am-permutations-combinations",
    "am-differentiation-rates",
    "am-integration-kinematics",
    "am-vectors-2d"
  ],
  meta: {
    title: {
      en: "Additional Mathematics",
      ar: "الرياضيات الإضافية (0606 & 4PM1)"
    },
    subtitle: {
      en: "Cambridge IGCSE 0606 & Pearson Edexcel Further Pure 4PM1. Advanced high-school algebra, calculus, trigonometry, and kinematics.",
      ar: "منهج كامبريدج 0606 وإدكسل 4PM1 للرياضيات المتقدمة لطلاب المدارس الدولية بالمرحلة الثانوية."
    },
    level: "Advanced",
    color: "var(--indigo)",
    icon: "⚡",
    examBoard: "Cambridge Assessment International Education & Pearson Edexcel",
    tags: [
      "Cambridge 0606",
      "Edexcel 4PM1",
      "Additional Mathematics",
      "Further Pure",
      "IGCSE Math",
      "Grade 10 STEM"
    ],
    officialLinks: [
      {
        label: {
          en: "Cambridge IGCSE Additional Mathematics (0606) Syllabus & Resources",
          ar: null
        },
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-additional-0606/",
        note: {
          en: "Official Cambridge International qualifications portal",
          ar: null
        }
      },
      {
        label: {
          en: "Pearson Edexcel International GCSE Further Pure Mathematics (4PM1)",
          ar: null
        },
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/further-pure-mathematics-2017.html",
        note: {
          en: "Official Pearson Edexcel specifications and past papers",
          ar: null
        }
      }
    ],
    downloadsInfo: {
      introText: {
        en: "Download complete Additional Mathematics study packets, formula sheets, and past paper practice offline. Formatted for high-yield exam preparation.",
        ar: null
      },
      pdfCardTitle: {
        en: "Additional Mathematics Complete Revision Guide",
        ar: null
      },
      pdfCardDescription: {
        en: "All eight chapters with formula breakdowns, worked past paper examples, and self-check solutions.",
        ar: null
      },
      docxCardDescription: {
        en: "Editable .docx revision packet with native equation-editor formulas ready for print or classroom use.",
        ar: null
      },
      worksheetLibraryText: {
        en: "Comprehensive collection of Additional Mathematics topical worksheets with step-by-step marking rubrics.",
        ar: null
      }
    },
    pageHeader: {
      h1: {
        en: "Additional Mathematics (0606 / 4PM1)",
        ar: "الرياضيات الإضافية (Cambridge 0606 & Edexcel 4PM1)"
      },
      stats: [
        {
          label: { en: "Exam Codes", ar: null },
          value: { en: "Cambridge 0606 · Edexcel 4PM1", ar: null }
        },
        {
          label: { en: "Target Level", ar: null },
          value: { en: "Grades 9–10 / Years 10–11 Advanced STEM", ar: null }
        },
        {
          label: { en: "Chapters", ar: null },
          value: { en: "8 Core Domains", ar: null }
        },
        {
          label: { en: "Interactive Explorers", ar: null },
          value: { en: "4 Dynamic Explorers", ar: null }
        }
      ]
    },
    testGenerator: {
      examTitle: "Cambridge 0606 & Edexcel 4PM1 Additional Mathematics",
      sections: [
        "Paper 1 — Pure Mathematics & Calculus (2 hours · 80 marks)",
        "Paper 2 — Trigonometry, Vectors & Mechanics (2 hours · 80 marks)"
      ],
      introText: {
        en: "Generate realistic Additional Mathematics past paper tests. Select question count and difficulty, attempt problems on paper or screen, and review detailed marking scheme steps.",
        ar: null
      },
      examDescription: {
        en: "Full-length 80-mark authentic mock papers matching Cambridge 0606 (Paper 1 & Paper 2) and Pearson Edexcel Further Pure 4PM1 (Paper 1 & Paper 2).",
        ar: null
      },
      examButtonLabel: {
        en: "Generate Full Additional Math Exam ↻",
        ar: null
      },
      examMinutesArg: 120,
      exams: [
        {
          examTitle: "Cambridge IGCSE 0606 — Paper 1",
          examButtonLabel: {
            en: "Generate Cambridge 0606 Paper 1 ↻",
            ar: null
          }
        },
        {
          examTitle: "Cambridge IGCSE 0606 — Paper 2",
          examButtonLabel: {
            en: "Generate Cambridge 0606 Paper 2 ↻",
            ar: null
          }
        },
        {
          examTitle: "Edexcel Further Pure 4PM1 — Paper 1",
          examButtonLabel: {
            en: "Generate Edexcel 4PM1 Paper 1 ↻",
            ar: null
          }
        },
        {
          examTitle: "Edexcel Further Pure 4PM1 — Paper 2",
          examButtonLabel: {
            en: "Generate Edexcel 4PM1 Paper 2 ↻",
            ar: null
          }
        }
      ]
    }
  }
};

fs.writeFileSync(path.join(TRACK_DIR, '_meta.json'), JSON.stringify(courseMeta, null, 2), 'utf8');

// 2. Chapters Content
const chapters = [
  {
    id: "am-functions-quadratics",
    chapterNumber: "1",
    title: {
      en: "Functions, Modulus & Quadratic Theory",
      ar: "الدوال والقيمة المطلقة ونظرية المعادلات التربيعية"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "⚡",
      category: "0606 Topic 1 — Functions & Quadratics",
      badges: [{ text: "Core STEM", className: "tier-e" }],
      topics: [
        "One-to-one functions &amp; inverses",
        "Modulus functions |f(x)|",
        "Discriminant b² - 4ac",
        "Completing the square &amp; extrema",
        "Simultaneous equations (linear &amp; non-linear)"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Mastering the structural foundations of higher algebra: function domains, codomains, one-to-one conditions for invertibility, modulus equations \\( |f(x)| = g(x) \\), and precise quadratic discriminant criteria.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "def",
          label: {
            en: "● Definition 1.1 — Inverse Functions & One-to-One Condition",
            ar: null
          },
          body: {
            en: "A function \\( f \\) has an inverse \\( f^{-1} \\) <strong>if and only if</strong> \\( f \\) is a <strong>one-to-one (injective)</strong> mapping across its given domain. For any \\( y = f(x) \\), \\( f^{-1}(y) = x \\). The domain of \\( f^{-1} \\) equals the range of \\( f \\), and the range of \\( f^{-1} \\) equals the domain of \\( f \\). Graphically, \\( y = f^{-1}(x) \\) is the reflection of \\( y = f(x) \\) in the line \\( y = x \\).",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Discriminant Criteria", ar: null },
              value: { en: "\\( \\Delta = b^{2}-4ac \\): \\( >0 \\) (2 real roots), \\( =0 \\) (equal/tangent), \\( <0 \\) (no real roots)", ar: null }
            },
            {
              label: { en: "Modulus Definition", ar: null },
              value: { en: "\\( |x| = x \\) for \\( x \\ge 0 \\); \\( |x| = -x \\) for \\( x < 0 \\)", ar: null }
            },
            {
              label: { en: "Vertex Form", ar: null },
              value: { en: "\\( a(x-h)^{2}+k \\) with turning point \\( (h, k) \\)", ar: null }
            },
            {
              label: { en: "Composite Rule", ar: null },
              value: { en: "\\( fg(x) = f(g(x)) \\) requires \\( \\text{range}(g) \\subseteq \\text{domain}(f) \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 1.A — Solving Modulus Equations", ar: null },
          body: {
            en: "<p>Solve the equation \\( |2x - 5| = 3x + 1 \\).</p><p><strong>Method 1 (Case Analysis):</strong><br>Case 1: \\( 2x - 5 = 3x + 1 \\implies -x = 6 \\implies x = -6 \\).<br>Check validity: \\( |-12 - 5| = 17 \\), but \\( 3(-6) + 1 = -17 \\ne 17 \\). Hence \\( x = -6 \\) is an extraneous solution because the RHS must be non-negative (\\( 3x + 1 \\ge 0 \\implies x \\ge -\\frac{1}{3} \\)).<br>Case 2: \\( -(2x - 5) = 3x + 1 \\implies -2x + 5 = 3x + 1 \\implies 5x = 4 \\implies x = \\frac{4}{5} \\).<br>Check: \\( |2(0.8) - 5| = |-3.4| = 3.4 \\); \\( 3(0.8) + 1 = 3.4 \\). Valid!</p><p><strong>Final Answer:</strong> \\( x = \\frac{4}{5} \\).</p>",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 1.B — Tangent Line & Discriminant", ar: null },
          body: {
            en: "<p>Find the values of \\( k \\) for which the line \\( y = kx - 2 \\) is a tangent to the curve \\( y = x^2 + 2x + 7 \\).</p><p><strong>Solution:</strong><br>Equate equations: \\( x^2 + 2x + 7 = kx - 2 \\implies x^2 + (2 - k)x + 9 = 0 \\).<br>Since the line is a tangent, the intersection has exactly one real root, so the discriminant \\( \\Delta = b^2 - 4ac = 0 \\):<br>\\[ (2 - k)^2 - 4(1)(9) = 0 \\implies (2 - k)^2 - 36 = 0 \\]<br>\\[ (2 - k)^2 = 36 \\implies 2 - k = \\pm 6 \\]<br>\\[ 2 - k = 6 \\implies k = -4, \\quad 2 - k = -6 \\implies k = 8 \\]<br><strong>Answer:</strong> \\( k = -4 \\) or \\( k = 8 \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Functions, Modulus & Quadratics"]
    }
  },
  {
    id: "am-polynomials-binomial",
    chapterNumber: "2",
    title: {
      en: "Polynomials, Remainder Theorem & Binomial Theorem",
      ar: "كثيرات الحدود ونظرية الباقي ونظرية ذات الحدين"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "⚡",
      category: "0606 Topic 2 — Polynomials & Binomial",
      badges: [{ text: "Core STEM", className: "tier-e" }],
      topics: [
        "Remainder Theorem P(b/a)",
        "Factor Theorem &amp; cubic roots",
        "Polynomial long division &amp; equating coefficients",
        "Binomial expansion for positive integer n",
        "Finding specific term coefficients"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Deep factorisation of higher-degree polynomials without trial-and-error graphing, paired with the powerful Binomial Theorem for expanding \\( (a+b)^n \\) algebraically.",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "thm",
          label: { en: "▲ Theorem 2.1 — Remainder & Factor Theorems", ar: null },
          body: {
            en: "If a polynomial \\( P(x) \\) is divided by \\( (ax - b) \\), the remainder is \\( R = P\\left(\\frac{b}{a}\\right) \\).<br>If \\( P\\left(\\frac{b}{a}\\right) = 0 \\), then \\( (ax - b) \\) is an exact factor of \\( P(x) \\).",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Binomial Expansion", ar: null },
              value: { en: "\\( (a+b)^n = \\sum_{r=0}^n \\binom{n}{r} a^{n-r} b^r \\)", ar: null }
            },
            {
              label: { en: "Combination Formula", ar: null },
              value: { en: "\\( \\binom{n}{r} = \\frac{n!}{r!(n-r)!} \\)", ar: null }
            },
            {
              label: { en: "General Term", ar: null },
              value: { en: "\\( T_{r+1} = \\binom{n}{r} a^{n-r} b^r \\)", ar: null }
            },
            {
              label: { en: "Remainder Rule", ar: null },
              value: { en: "\\( P(x) = Q(x)(ax-b) + P(b/a) \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 2.A — Unknown Coefficients via Remainder Theorem", ar: null },
          body: {
            en: "<p>The polynomial \\( P(x) = 2x^3 + ax^2 + bx - 6 \\) has \\( (x - 2) \\) as a factor. When divided by \\( (x + 1) \\), the remainder is \\( 12 \\). Find the values of \\( a \\) and \\( b \\).</p><p><strong>Step 1: Use Factor Theorem:</strong><br>\\( P(2) = 0 \\implies 2(2)^3 + a(2)^2 + b(2) - 6 = 0 \\implies 16 + 4a + 2b - 6 = 0 \\implies 4a + 2b = -10 \\implies 2a + b = -5 \\) (Equation 1).<br><strong>Step 2: Use Remainder Theorem:</strong><br>\\( P(-1) = 12 \\implies 2(-1)^3 + a(-1)^2 + b(-1) - 6 = 12 \\implies -2 + a - b - 6 = 12 \\implies a - b = 20 \\) (Equation 2).<br><strong>Step 3: Solve simultaneously:</strong><br>Add (1) and (2): \\( (2a + b) + (a - b) = -5 + 20 \\implies 3a = 15 \\implies a = 5 \\).<br>Substitute \\( a = 5 \\) into (2): \\( 5 - b = 20 \\implies b = -15 \\).<br><strong>Answer:</strong> \\( a = 5, \\, b = -15 \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Polynomials & Binomial Theorem"]
    }
  },
  {
    id: "am-logs-exponentials",
    chapterNumber: "3",
    title: {
      en: "Logarithms, Exponentials & Straight-Line Reduction",
      ar: "اللوغاريتمات والدوال الأسية والتحويل للخط المستقيم"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "⚡",
      category: "0606 Topic 3 — Logarithmic & Exponential Functions",
      badges: [{ text: "Core STEM", className: "tier-e" }],
      topics: [
        "Laws of logarithms &amp; base changes",
        "Solving a^x = b and natural logs (ln)",
        "Linear law: y = ab^x to Y = mX + c",
        "Power law: y = Ax^n to ln y = ln A + n ln x"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Comprehensive mastery of exponential modeling, logarithmic properties, change of base, and the essential Cambridge experimental skill of transforming non-linear data into straight lines.",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Product Law", ar: null },
              value: { en: "\\( \\log_a(xy) = \\log_a x + \\log_a y \\)", ar: null }
            },
            {
              label: { en: "Quotient Law", ar: null },
              value: { en: "\\( \\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y \\)", ar: null }
            },
            {
              label: { en: "Power Law", ar: null },
              value: { en: "\\( \\log_a(x^k) = k\\log_a x \\)", ar: null }
            },
            {
              label: { en: "Change of Base", ar: null },
              value: { en: "\\( \\log_a b = \\frac{\\ln b}{\\ln a} = \\frac{\\log_{10} b}{\\log_{10} a} \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "thm",
          label: { en: "▲ Theorem 3.1 — The Linear Law Transformations", ar: null },
          body: {
            en: "1. <strong>Exponential Relationship \\( y = ab^x \\):</strong><br>Take natural logs of both sides: \\( \\ln y = \\ln(a \\cdot b^x) = \\ln a + x \\ln b \\).<br>In \\( Y = mX + c \\) form: \\( Y = \\ln y \\), \\( X = x \\), gradient \\( m = \\ln b \\implies b = e^m \\), and intercept \\( c = \\ln a \\implies a = e^c \\).<br><br>2. <strong>Power Relationship \\( y = Ax^n \\):</strong><br>\\( \\ln y = \\ln A + n \\ln x \\).<br>Here: \\( Y = \\ln y \\), \\( X = \\ln x \\), gradient \\( m = n \\), and intercept \\( c = \\ln A \\implies A = e^c \\).",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 3.A — Linear Law Model Fitting", ar: null },
          body: {
            en: "<p>Variables \\( x \\) and \\( y \\) are related by \\( y = ab^x \\). A plot of \\( \\ln y \\) against \\( x \\) produces a straight line passing through \\( (2, 3.4) \\) and \\( (6, 5.8) \\). Find the values of \\( a \\) and \\( b \\) to 3 significant figures.</p><p><strong>Solution:</strong><br>Gradient \\( m = \\frac{5.8 - 3.4}{6 - 2} = \\frac{2.4}{4} = 0.6 \\).<br>Since \\( m = \\ln b \\implies \\ln b = 0.6 \\implies b = e^{0.6} \\approx 1.82 \\).<br>Equation of line: \\( Y - 3.4 = 0.6(X - 2) \\implies Y = 0.6X + 2.2 \\).<br>The vertical intercept is \\( c = 2.2 \\).<br>Since \\( c = \\ln a \\implies a = e^{2.2} \\approx 9.03 \\).<br><strong>Answer:</strong> \\( a \\approx 9.03, \\, b \\approx 1.82 \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Logarithmic & Exponential Functions"]
    }
  },
  {
    id: "am-trigonometry-circular",
    chapterNumber: "4",
    title: {
      en: "Trigonometry & Circular Measure",
      ar: "حساب المثلثات والقياس الدائري (الراديان)"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "⚡",
      category: "0606 Topic 4 — Circular Measure & Trig",
      badges: [{ text: "Core STEM", className: "tier-e" }],
      topics: [
        "Radian measure s = rθ and A = ½r²θ",
        "Reciprocal trig functions: sec, csc, cot",
        "Pythagorean identities 1 + tan²θ = sec²θ",
        "Solving trigonometric equations in intervals",
        "Trigonometric wave sketching"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Radian measure enables direct calculus of circular motion and periodic waves. We introduce secant, cosecant, cotangent, fundamental Pythagorean identities, and systematic equation solving.",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Arc Length", ar: null },
              value: { en: "\\( s = r\\theta \\) (\\( \\theta \\) in radians)", ar: null }
            },
            {
              label: { en: "Sector Area", ar: null },
              value: { en: "\\( A = \\frac{1}{2}r^2\\theta \\)", ar: null }
            },
            {
              label: { en: "Segment Area", ar: null },
              value: { en: "\\( A = \\frac{1}{2}r^2(\\theta - \\sin\\theta) \\)", ar: null }
            },
            {
              label: { en: "Pythagorean Identities", ar: null },
              value: { en: "\\( \\sin^2\\theta + \\cos^2\\theta = 1 \\), \\( 1 + \\tan^2\\theta = \\sec^2\\theta \\), \\( 1 + \\cot^2\\theta = \\csc^2\\theta \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 4.A — Radians & Shaded Segment", ar: null },
          body: {
            en: "<p>A sector of a circle of radius \\( 8 \\text{ cm} \\) has an angle of \\( \\theta = 1.25 \\text{ radians} \\) at the center. Calculate (a) the arc length, (b) the perimeter of the sector, and (c) the area of the minor segment formed by chord \\( AB \\).</p><p><strong>Solution:</strong><br>(a) Arc length: \\( s = r\\theta = 8 \\times 1.25 = 10 \\text{ cm} \\).<br>(b) Perimeter: \\( P = 2r + s = 2(8) + 10 = 26 \\text{ cm} \\).<br>(c) Segment Area: \\( A_{\\text{segment}} = \\frac{1}{2}r^2(\\theta - \\sin\\theta) = \\frac{1}{2}(64)(1.25 - \\sin(1.25 \\text{ rad})) \\).<br>Note: In radian mode, \\( \\sin(1.25) \\approx 0.94898 \\).<br>\\( A = 32 \\times (1.25 - 0.94898) = 32 \\times 0.30102 \\approx 9.63 \\text{ cm}^2 \\).<br><strong>Answer:</strong> \\( 9.63 \\text{ cm}^2 \\).</p>",
            ar: null
          }
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 4.B — Solving Trig Equation via Identity", ar: null },
          body: {
            en: "<p>Solve \\( 2\\sec^2 x - 3\\tan x = 5 \\) for \\( 0^\\circ \\le x \\le 360^\\circ \\).</p><p><strong>Solution:</strong><br>Replace \\( \\sec^2 x \\) with \\( 1 + \\tan^2 x \\):<br>\\[ 2(1 + \\tan^2 x) - 3\\tan x - 5 = 0 \\implies 2\\tan^2 x - 3\\tan x - 3 = 0 \\]<br>Solve for \\( \\tan x \\) using the quadratic formula:<br>\\[ \\tan x = \\frac{3 \\pm \\sqrt{9 - 4(2)(-3)}}{4} = \\frac{3 \\pm \\sqrt{33}}{4} \\]<br>1. \\( \\tan x = \\frac{3 + \\sqrt{33}}{4} \\approx 2.186 \\implies x = 65.4^\\circ \\) and \\( x = 180^\\circ + 65.4^\\circ = 245.4^\\circ \\).<br>2. \\( \\tan x = \\frac{3 - \\sqrt{33}}{4} \\approx -0.686 \\implies \\text{basic angle } \\alpha = \\tan^{-1}(0.686) \\approx 34.5^\\circ \\).<br>In Q2 and Q4: \\( x = 180^\\circ - 34.5^\\circ = 145.5^\\circ \\) and \\( x = 360^\\circ - 34.5^\\circ = 325.5^\\circ \\).<br><strong>Answer:</strong> \\( x = 65.4^\\circ, 145.5^\\circ, 245.4^\\circ, 325.5^\\circ \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Trigonometry & Circular Measure"]
    }
  },
  {
    id: "am-permutations-combinations",
    chapterNumber: "5",
    title: {
      en: "Permutations & Combinations",
      ar: "التباديل والتوافيق"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "⚡",
      category: "0606 Topic 5 — Permutations & Combinations",
      badges: [{ text: "Core STEM", className: "tier-e" }],
      topics: [
        "Factorial algebra n!",
        "Permutations ⁿPᵣ (arrangements where order matters)",
        "Combinations ⁿCᵣ (selections where order does not matter)",
        "Restrictions: items grouped together or separated",
        "Team and committee selection problems"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Combinatorial principles governing selections, orderings, and arrangements with constraints. A crucial foundation for probability, discrete mathematics, and advanced statistics.",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Permutation Formula", ar: null },
              value: { en: "\\( {}^nP_r = \\frac{n!}{(n-r)!} \\) (order matters)", ar: null }
            },
            {
              label: { en: "Combination Formula", ar: null },
              value: { en: "\\( {}^nC_r = \\frac{n!}{r!(n-r)!} \\) (order does not matter)", ar: null }
            },
            {
              label: { en: "Together Rule", ar: null },
              value: { en: "Treat grouped items as 1 single block, then multiply by internal block arrangements.", ar: null }
            },
            {
              label: { en: "Apart Rule", ar: null },
              value: { en: "Place unrestricted items first, then insert restricted items into spaces (gaps).", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 5.A — Arrangements with Constraints", ar: null },
          body: {
            en: "<p>A group of 4 boys and 3 girls are to sit in a row of 7 chairs. Find the number of possible arrangements if:<br>(a) All 3 girls must sit together.<br>(b) No two girls may sit next to each other.</p><p><strong>Solution:</strong><br>(a) <strong>Girls together:</strong> Treat the 3 girls as 1 composite block \\( G \\). We now have 4 boys + 1 block = 5 entities to arrange: \\( 5! = 120 \\). Within the block, the 3 girls can be arranged in \\( 3! = 6 \\) ways.<br>Total arrangements = \\( 5! \\times 3! = 120 \\times 6 = 720 \\).<br><br>(b) <strong>No two girls adjacent:</strong> First arrange the 4 boys in a row: \\( 4! = 24 \\) ways.<br>This creates 5 available gaps (including ends): \\( _ B _ B _ B _ B _ \\).<br>We must choose 3 of these 5 gaps for the 3 girls and arrange them: \\( {}^5P_3 = 5 \\times 4 \\times 3 = 60 \\).<br>Total arrangements = \\( 4! \\times {}^5P_3 = 24 \\times 60 = 1,440 \\).<br><strong>Answer:</strong> (a) 720, (b) 1,440.</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Permutations & Combinations"]
    }
  },
  {
    id: "am-differentiation-rates",
    chapterNumber: "6",
    title: {
      en: "Differentiation, Rules & Rates of Change",
      ar: "التفاضل وقواعد الاشتقاق ومعدلات التغير المرتبطة"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "⚡",
      category: "0606 Topic 6 — Differentiation",
      badges: [{ text: "Core STEM", className: "tier-e" }],
      topics: [
        "Derivatives of powers, exp, ln, sin, cos, tan",
        "Chain rule, Product rule &amp; Quotient rule",
        "Tangents and normal lines",
        "Connected rates of change dy/dt = (dy/dx)(dx/dt)",
        "Stationary points &amp; second derivative optimization"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Comprehensive differential calculus: mastering the Chain, Product, and Quotient rules for algebraic, trigonometric, and transcendental functions, with applications to optimization, geometry of curves, and related rates.",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Chain Rule", ar: null },
              value: { en: "\\( \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} \\)", ar: null }
            },
            {
              label: { en: "Product Rule", ar: null },
              value: { en: "\\( \\frac{d}{dx}[uv] = u\\frac{dv}{dx} + v\\frac{du}{dx} \\)", ar: null }
            },
            {
              label: { en: "Quotient Rule", ar: null },
              value: { en: "\\( \\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2} \\)", ar: null }
            },
            {
              label: { en: "Normal Gradient", ar: null },
              value: { en: "\\( m_{\\text{normal}} = -\\frac{1}{m_{\\text{tangent}}} \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 6.A — Connected Rates of Change", ar: null },
          body: {
            en: "<p>A right circular cone of fixed semi-vertical angle has height \\( h \\) and base radius \\( r = \\frac{h}{2} \\). Water is poured into the cone at a constant rate of \\( 12\\pi \\text{ cm}^3/\\text{s} \\). Find the rate at which the water level is rising when \\( h = 6 \\text{ cm} \\).</p><p><strong>Solution:</strong><br>Volume of a cone: \\( V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\left(\\frac{h}{2}\\right)^2 h = \\frac{\\pi}{12} h^3 \\).<br>Differentiate with respect to \\( h \\): \\( \\frac{dV}{dh} = \\frac{\\pi}{4} h^2 \\).<br>We are given \\( \\frac{dV}{dt} = 12\\pi \\text{ cm}^3/\\text{s} \\). By the chain rule:<br>\\[ \\frac{dV}{dt} = \\frac{dV}{dh} \\cdot \\frac{dh}{dt} \\implies 12\\pi = \\left(\\frac{\\pi}{4} h^2\\right) \\cdot \\frac{dh}{dt} \\]<br>Substitute \\( h = 6 \\):<br>\\[ 12\\pi = \\left(\\frac{\\pi}{4} \\cdot 36\\right) \\cdot \\frac{dh}{dt} = 9\\pi \\cdot \\frac{dh}{dt} \\implies \\frac{dh}{dt} = \\frac{12\\pi}{9\\pi} = \\frac{4}{3} \\text{ cm/s} \\].<br><strong>Answer:</strong> \\( \\frac{4}{3} \\text{ cm/s} \\) (or \\( 1.33 \\text{ cm/s} \\)).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Differentiation & Rates of Change"]
    }
  },
  {
    id: "am-integration-kinematics",
    chapterNumber: "7",
    title: {
      en: "Integration, Areas & Kinematics",
      ar: "التكامل والمساحات المستوية وعلم الحركة (الميكانيكا)"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "⚡",
      category: "0606 Topic 7 — Integration & Kinematics",
      badges: [{ text: "Core STEM", className: "tier-e" }],
      topics: [
        "Indefinite integrals of e^(ax+b), sin(ax+b), 1/(ax+b)",
        "Definite integrals and area under curves",
        "Area between two curves ∫ (y₁ - y₂) dx",
        "Kinematics: v = ds/dt and a = dv/dt",
        "Displacement from velocity s = ∫ v dt"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Integration as inverse differentiation and continuous accumulation. We apply definite integrals to enclosed plane areas and straight-line particle kinematics with variable acceleration.",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Exponential Integral", ar: null },
              value: { en: "\\( \\int e^{ax+b}\\,dx = \\frac{1}{a}e^{ax+b} + c \\)", ar: null }
            },
            {
              label: { en: "Reciprocal Integral", ar: null },
              value: { en: "\\( \\int \\frac{1}{ax+b}\\,dx = \\frac{1}{a}\\ln|ax+b| + c \\)", ar: null }
            },
            {
              label: { en: "Area Formula", ar: null },
              value: { en: "\\( A = \\int_a^b |y_1 - y_2|\\,dx \\)", ar: null }
            },
            {
              label: { en: "Kinematics Relations", ar: null },
              value: { en: "\\( v = \\frac{ds}{dt} \\), \\( a = \\frac{dv}{dt} \\implies s = \\int v\\,dt \\), \\( v = \\int a\\,dt \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 7.A — Straight-Line Kinematics", ar: null },
          body: {
            en: "<p>A particle moves in a straight line such that its velocity at time \\( t \\ge 0 \\) is given by \\( v = 6t - 2t^2 \\text{ m/s} \\). Initially, the particle is at origin \\( s = 0 \\).<br>(a) Find the time when the particle is instantaneously at rest (for \\( t > 0 \\)).<br>(b) Calculate the maximum velocity of the particle.<br>(c) Find the total distance traveled during the first \\( 4 \\) seconds.</p><p><strong>Solution:</strong><br>(a) Instantaneous rest occurs when \\( v = 0 \\):<br>\\[ 6t - 2t^2 = 0 \\implies 2t(3 - t) = 0 \\implies t = 3 \\text{ s} \\quad (t > 0) \\].<br><br>(b) Max velocity occurs when acceleration \\( a = \\frac{dv}{dt} = 0 \\):<br>\\[ a = 6 - 4t = 0 \\implies t = 1.5 \\text{ s} \\].<br>Since \\( \\frac{d^2v}{dt^2} = -4 < 0 \\), this is a maximum.<br>\\( v_{\\text{max}} = 6(1.5) - 2(1.5)^2 = 9 - 4.5 = 4.5 \\text{ m/s} \\).<br><br>(c) Displacement function \\( s(t) = \\int (6t - 2t^2)\\,dt = 3t^2 - \\frac{2}{3}t^3 \\) (since \\( s(0) = 0 \\)).<br>The particle changes direction at \\( t = 3 \\).<br>At \\( t = 3 \\): \\( s(3) = 3(9) - \\frac{2}{3}(27) = 27 - 18 = 9 \\text{ m} \\).<br>At \\( t = 4 \\): \\( s(4) = 3(16) - \\frac{2}{3}(64) = 48 - 42.67 = 5.33 \\text{ m} \\).<br>Distance from \\( t = 0 \\) to \\( t = 3 \\): \\( |9 - 0| = 9 \\text{ m} \\).<br>Distance from \\( t = 3 \\) to \\( t = 4 \\): \\( |5.33 - 9| = 3.67 \\text{ m} \\).<br>Total distance = \\( 9 + 3.67 = 12.67 \\text{ m} = \\frac{38}{3} \\text{ m} \\).<br><strong>Answer:</strong> (a) \\( 3 \\text{ s} \\), (b) \\( 4.5 \\text{ m/s} \\), (c) \\( 12.67 \\text{ m} \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Integration & Kinematics"]
    }
  },
  {
    id: "am-vectors-2d",
    chapterNumber: "8",
    title: {
      en: "Vectors in Two Dimensions & Relative Motion",
      ar: "المتجهات في بعدين والسرعة النسبية"
    },
    chapterTag: {
      variant: "category",
      className: "igcse-tag",
      emoji: "⚡",
      category: "0606 Topic 8 — Vectors & Relative Motion",
      badges: [{ text: "Core STEM", className: "tier-e" }],
      topics: [
        "Unit vectors i, j and column vectors",
        "Magnitude, direction &amp; unit vector",
        "Scalar product a · b = |a||b| cos θ",
        "Perpendicular (a · b = 0) and collinear vectors",
        "Relative velocity: v_A - v_B"
      ]
    },
    content: {
      blocks: [
        {
          kind: "text",
          body: {
            en: "Two-dimensional Cartesian vectors: algebraic operations, collinearity, scalar (dot) products, orthogonality, and vector navigation in relative velocity problems.",
            ar: null
          }
        },
        {
          kind: "cards",
          items: [
            {
              label: { en: "Magnitude", ar: null },
              value: { en: "\\( |\\mathbf{r}| = \\sqrt{x^2 + y^2} \\)", ar: null }
            },
            {
              label: { en: "Unit Vector", ar: null },
              value: { en: "\\( \\mathbf{\\hat{r}} = \\frac{\\mathbf{r}}{|\\mathbf{r}|} \\)", ar: null }
            },
            {
              label: { en: "Scalar (Dot) Product", ar: null },
              value: { en: "\\( \\mathbf{a} \\cdot \\mathbf{b} = a_1 b_1 + a_2 b_2 = |\\mathbf{a}||\\mathbf{b}|\\cos\\theta \\)", ar: null }
            },
            {
              label: { en: "Orthogonality", ar: null },
              value: { en: "\\( \\mathbf{a} \\perp \\mathbf{b} \\iff \\mathbf{a} \\cdot \\mathbf{b} = 0 \\)", ar: null }
            }
          ]
        },
        {
          kind: "callout",
          style: "example",
          label: { en: "Worked Example 8.A — Dot Product & Angle", ar: null },
          body: {
            en: "<p>Given position vectors \\( \\vec{OA} = 3\\mathbf{i} + 4\\mathbf{j} \\) and \\( \\vec{OB} = -5\\mathbf{i} + 12\\mathbf{j} \\):<br>(a) Find the unit vector in the direction of \\( \\vec{OA} \\).<br>(b) Calculate the angle between \\( \\vec{OA} \\) and \\( \\vec{OB} \\) in degrees to 1 decimal place.</p><p><strong>Solution:</strong><br>(a) \\( |\\vec{OA}| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5 \\).<br>Unit vector \\( \\mathbf{\\hat{OA}} = \\frac{1}{5}(3\\mathbf{i} + 4\\mathbf{j}) = 0.6\\mathbf{i} + 0.8\\mathbf{j} \\).<br><br>(b) \\( |\\vec{OB}| = \\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13 \\).<br>Dot product \\( \\vec{OA} \\cdot \\vec{OB} = (3)(-5) + (4)(12) = -15 + 48 = 33 \\).<br>Using \\( \\vec{OA} \\cdot \\vec{OB} = |\\vec{OA}||\\vec{OB}|\\cos\\theta \\):<br>\\[ 33 = (5)(13)\\cos\\theta = 65\\cos\\theta \\implies \\cos\\theta = \\frac{33}{65} \\approx 0.5077 \\]<br>\\[ \\theta = \\cos^{-1}(0.5077) \\approx 59.5^\\circ \\].<br><strong>Answer:</strong> (a) \\( \\frac{3}{5}\\mathbf{i} + \\frac{4}{5}\\mathbf{j} \\), (b) \\( 59.5^\\circ \\).</p>",
            ar: null
          }
        }
      ]
    },
    quizWidget: {
      enabled: true,
      domains: ["Vectors in Two Dimensions"]
    }
  }
];

chapters.forEach((ch) => {
  fs.writeFileSync(path.join(TRACK_DIR, ch.id + '.json'), JSON.stringify(ch, null, 2), 'utf8');
});

console.log(`✅ Cambridge 0606 & Edexcel 4PM1 Additional Mathematics: created _meta.json and ${chapters.length} chapters.`);
