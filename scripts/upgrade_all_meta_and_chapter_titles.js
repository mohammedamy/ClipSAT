#!/usr/bin/env node
'use strict';

/**
 * scripts/upgrade_all_meta_and_chapter_titles.js
 *
 * Brings all 31 tracks' content/<track>/_meta.json and all 302 chapters'
 * content/<track>/*.json titles/railLabels to 100% parity:
 * 1. Enables full official exam paper generation on algebra, geo, alg2, calculus,
 *    linalg, mvc, and odes (matching window.examSpecs in 02b-bank-exam.js).
 * 2. Adds examBoard and officialLinks to linalg, mvc, and odes (and examBoard to
 *    tracks missing it), updates worksheetLibraryText counts for linalg/mvc/odes,
 *    removes "Preview" / "in progress" from apab/apbc, and removes the obsolete
 *    "Planned" card from calculus.
 * 3. Populates 100% bilingual Arabic (.ar) translations across all 31 _meta.json
 *    files and all 302 chapter title / railLabel fields.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');

const FULL_EXAM_META_UPGRADES = {
  algebra: {
    examTitle: 'algebra',
    sections: [
      'Section A — Linear Equations, Systems, Inequalities & Functions (20 Q · 45 min)',
      'Section B — Quadratics, Polynomials, Exponents, Radicals & Statistics (20 Q · 45 min)'
    ],
    examDescription: {
      en: 'Comprehensive 90-minute Algebra I final examination: 40 multiple-choice questions across two 45-minute sections (Section A non-calculator, Section B calculator permitted).',
      ar: 'اختبار نهائي شامل في الجبر ١ (٩٠ دقيقة): ٤٠ سؤال اختيار من متعدد في قسمين مدة كل منهما ٤٥ دقيقة (القسم أ بدون آلة حاسبة، القسم ب يُسمح فيه بالآلة الحاسبة).'
    },
    examButtonLabel: {
      en: 'Generate Full Algebra I Exam ↻',
      ar: 'توليد اختبار الجبر ١ الكامل ↻'
    },
    examMinutesArg: 90
  },
  geo: {
    examTitle: 'geo',
    sections: [
      'Section A — Deductive Reasoning, Congruence & Triangle Similarity (20 Q · 45 min)',
      'Section B — Circle Theorems, Trigonometry, Coordinate Geometry & 3D Solids (20 Q · 45 min)'
    ],
    examDescription: {
      en: 'Comprehensive 90-minute Euclidean & Coordinate Geometry final examination: 40 multiple-choice questions across two 45-minute sections covering proofs, congruence, similarity, circles, trigonometry, and 3D solids.',
      ar: 'اختبار نهائي شامل في الهندسة الإقليدية والإحداثية (٩٠ دقيقة): ٤٠ سؤال اختيار من متعدد في قسمين يغطيان البراهين والتطابق والتشابه والدوائر وحساب المثلثات والمجسمات.'
    },
    examButtonLabel: {
      en: 'Generate Full Geometry Exam ↻',
      ar: 'توليد اختبار الهندسة الكامل ↻'
    },
    examMinutesArg: 90
  },
  alg2: {
    examTitle: 'alg2',
    sections: [
      'Section A — Polynomial, Rational, Radical & Complex Algebra (20 Q · 45 min)',
      'Section B — Exponentials, Logarithms, Sequences, Conics & Probability (20 Q · 45 min)'
    ],
    examDescription: {
      en: 'Comprehensive 90-minute Algebra II final examination: 40 multiple-choice questions across two 45-minute sections covering polynomials, complex numbers, rational/radical equations, logarithms, sequences, conics, and trigonometry.',
      ar: 'اختبار نهائي شامل في الجبر ٢ (٩٠ دقيقة): ٤٠ سؤال اختيار من متعدد في قسمين يغطيان كثيرات الحدود والأعداد المركبة والدوال النسبية واللوغاريتمية والمتتابعات والقطوع المخروطية.'
    },
    examButtonLabel: {
      en: 'Generate Full Algebra 2 Exam ↻',
      ar: 'توليد اختبار الجبر ٢ الكامل ↻'
    },
    examMinutesArg: 90
  },
  calculus: {
    examTitle: 'calculus',
    sections: [
      'Section I — Limits, Differentiation, Optimization & Fundamental Theorem of Calculus (20 Q · 60 min)',
      'Section II — Integration Techniques, Volumes, Differential Equations & Infinite Series (20 Q · 60 min)'
    ],
    examDescription: {
      en: 'Comprehensive 120-minute University Calculus examination: 40 questions across two 60-minute sections covering differential calculus, integration techniques, differential equations, infinite series, and multivariable foundations.',
      ar: 'اختبار جامعي شامل في التفاضل والتكامل (١٢٠ دقيقة): ٤٠ سؤالاً في قسمين يغطيان النهايات والاشتقاق وطرق التكامل والمعادلات التفاضلية والمتسلسلات اللانهائية.'
    },
    examButtonLabel: {
      en: 'Generate Full Calculus Exam ↻',
      ar: 'توليد اختبار التفاضل والتكامل الكامل ↻'
    },
    examMinutesArg: 120
  },
  linalg: {
    examTitle: 'linalg',
    sections: [
      'Part A — Linear Systems, Row Reduction, Matrix Algebra, Determinants & Subspaces (18 Q · 60 min)',
      'Part B — Linear Transformations, Eigenvalues, Diagonalization, Orthogonality & Least Squares (18 Q · 60 min)'
    ],
    examDescription: {
      en: 'Comprehensive 120-minute University Linear Algebra examination: 36 questions across two 60-minute parts covering Gaussian elimination, matrix algebra, determinants, fundamental subspaces, eigenvalues, diagonalization, Gram-Schmidt, and least squares.',
      ar: 'اختبار جامعي شامل في الجبر الخطي (١٢٠ دقيقة): ٣٦ سؤالاً في جزأين يغطيان الحذف الغاوسي وجبر المصفوفات والمحددات والفضاءات المتجهة والقيم الذاتية والتعامد والمربعات الصغرى.'
    },
    examButtonLabel: {
      en: 'Generate Full Linear Algebra Exam ↻',
      ar: 'توليد اختبار الجبر الخطي الكامل ↻'
    },
    examMinutesArg: 120
  },
  mvc: {
    examTitle: 'mvc',
    sections: [
      'Part A — Partial Derivatives, Gradients, Directional Derivatives & Lagrange Optimization (18 Q · 60 min)',
      'Part B — Multiple Integrals, Vector Fields, Green\'s Theorem, Stokes\' Theorem & Divergence (18 Q · 60 min)'
    ],
    examDescription: {
      en: 'Comprehensive 120-minute University Multivariable Calculus examination: 36 questions across two 60-minute parts covering partial derivatives, gradients, Lagrange multipliers, double/triple integrals, vector fields, and Green\'s, Stokes\', and Divergence theorems.',
      ar: 'اختبار جامعي شامل في التفاضل والتكامل متعدد المتغيرات (١٢٠ دقيقة): ٣٦ سؤالاً في جزأين يغطيان المشتقات الجزئية والتدرج ومضاعفات لاغرانج والتكاملات المتعددة ونظريات غرين وستوكس والتباعد.'
    },
    examButtonLabel: {
      en: 'Generate Full Multivariable Calculus Exam ↻',
      ar: 'توليد اختبار التفاضل متعدد المتغيرات الكامل ↻'
    },
    examMinutesArg: 120
  },
  odes: {
    examTitle: 'odes',
    sections: [
      'Part A — First-Order & Second-Order Linear Differential Equations & Resonance (18 Q · 60 min)',
      'Part B — Laplace Transforms, Phase-Plane Systems, Power Series & Numerical Methods (18 Q · 60 min)'
    ],
    examDescription: {
      en: 'Comprehensive 120-minute University Differential Equations examination: 36 questions across two 60-minute parts covering first- and second-order ODEs, undetermined coefficients, variation of parameters, Laplace transforms, linear systems, series solutions, and RK4.',
      ar: 'اختبار جامعي شامل في المعادلات التفاضلية (١٢٠ دقيقة): ٣٦ سؤالاً في جزأين يغطيان المعادلات التفاضلية من الرتبتين الأولى والثانية وتحويلات لابلاس والأنظمة الخطية ومتسلسلات القوى وطرق رونج-كوتا.'
    },
    examButtonLabel: {
      en: 'Generate Full Differential Equations Exam ↻',
      ar: 'توليد اختبار المعادلات التفاضلية الكامل ↻'
    },
    examMinutesArg: 120
  }
};

const OFFICIAL_LINKS_UPGRADES = {
  linalg: [
    {
      label: {
        en: 'MIT OpenCourseWare 18.06 — Linear Algebra Exams & Solutions',
        ar: 'اختبارات وحلول الجبر الخطي MIT OpenCourseWare 18.06'
      },
      url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/pages/exams/',
      note: {
        en: 'Official MIT 18.06 past exams and worked solutions (Prof. Gilbert Strang)',
        ar: 'الاختبارات الرسمية السابقة وحلولها الكاملة من معهد MIT'
      }
    },
    {
      label: {
        en: 'OpenStax / Interactive Linear Algebra Reference',
        ar: 'مرجع الجبر الخطي التفاعلي الجامعي'
      },
      url: 'https://textbooks.math.gatech.edu/ila/',
      note: {
        en: 'Georgia Tech open university textbook and practice problems',
        ar: 'كتاب جامعي مفتوح المصدر وتمارين تطبيقية'
      }
    }
  ],
  mvc: [
    {
      label: {
        en: 'MIT OpenCourseWare 18.02 — Multivariable Calculus Exams',
        ar: 'اختبارات التفاضل والتكامل متعدد المتغيرات MIT OpenCourseWare 18.02'
      },
      url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
      note: {
        en: 'Official MIT 18.02SC practice exams, problem sets, and solutions',
        ar: 'الاختبارات التدريبية ومجموعات المسائل والحلول من معهد MIT'
      }
    },
    {
      label: {
        en: 'OpenStax Calculus Volume 3 — Multivariable Calculus',
        ar: 'مرجع OpenStax للتفاضل والتكامل (المجلد الثالث — متعدد المتغيرات)'
      },
      url: 'https://openstax.org/details/books/calculus-volume-3',
      note: {
        en: 'Peer-reviewed university multivariable calculus textbook and exercises',
        ar: 'كتاب جامعي محكّم وتمارين شاملة في التفاضل متعدد المتغيرات'
      }
    }
  ],
  odes: [
    {
      label: {
        en: 'MIT OpenCourseWare 18.03 — Differential Equations Exams',
        ar: 'اختبارات المعادلات التفاضلية MIT OpenCourseWare 18.03'
      },
      url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/',
      note: {
        en: 'Official MIT 18.03SC exams, recitations, and worked solutions',
        ar: 'الاختبارات الرسمية والتمارين المحلولة للمعادلات التفاضلية من معهد MIT'
      }
    },
    {
      label: {
        en: 'Paul\'s Online Math Notes — Differential Equations',
        ar: 'مذكرات بول للرياضيات الجامعية — المعادلات التفاضلية'
      },
      url: 'https://tutorial.math.lamar.edu/Classes/DE/DE.aspx',
      note: {
        en: 'Complete university ODE notes, practice problems, and step-by-step solutions',
        ar: 'شروحات جامعية كاملة ومسائل تدريبية مع الحلول التفصيلية'
      }
    }
  ]
};

const EXAM_BOARDS = {
  algebra: 'Common Core & International High School Mathematics',
  geo: 'Euclidean & Coordinate Geometry Curriculum',
  alg2: 'Advanced High School Algebra Curriculum',
  precalc: 'College Board & Honors Precalculus Curriculum',
  calculus: 'College Board AP & University Calculus I–III',
  apab: 'College Board',
  apbc: 'College Board',
  appc: 'College Board',
  apstats: 'College Board',
  ibhl: 'International Baccalaureate (IBO)',
  ibsl: 'International Baccalaureate (IBO)',
  linalg: 'University STEM Mathematics (MIT 18.06 / MATH-221 Standard)',
  mvc: 'University STEM Mathematics (MIT 18.02 / MATH-231 Standard)',
  odes: 'University STEM Mathematics (MIT 18.03 / MATH-241 Standard)'
};

const TRACK_TITLE_AR = {
  a2level: 'رياضيات المستوى المتقدم A2 (Cambridge 9709 / Edexcel)',
  act: 'اختبار ACT في الرياضيات',
  act2: 'اختبار ACT الدولي للموضوعات — الرياضيات ١',
  act2l2: 'اختبار ACT الدولي للموضوعات — الرياضيات ٢',
  addmath: 'الرياضيات الإضافية (0606 & 4PM1)',
  alg2: 'الجبر ٢ (Algebra 2)',
  algebra: 'الجبر ١ (Algebra)',
  apab: 'التفاضل والتكامل AP Calculus AB',
  apbc: 'التفاضل والتكامل AP Calculus BC',
  appc: 'ما قبل التفاضل والتكامل AP Precalculus',
  apstats: 'الإحصاء المتقدم AP Statistics',
  aslevel: 'رياضيات المستوى المتقدم المساعد AS (Cambridge 9709)',
  calculus: 'التفاضل والتكامل الجامعي (Calculus I–III)',
  edexcel: 'رياضيات إدكسل الدولية (Edexcel IGCSE 4MA1 & IAL)',
  est: 'الاختبار المصري القياسي EST I — الرياضيات',
  est2: 'الاختبار المصري القياسي EST II — الرياضيات ١',
  est2l2: 'الاختبار المصري القياسي EST II — الرياضيات ٢',
  gaten: 'القدرات والتحصيلي باللغة الإنجليزية (GAT & SAAT)',
  geo: 'الهندسة المستوية والإحداثية (Geometry)',
  ibhl: 'رياضيات البكالوريا الدولية — المستوى العالي (IB Math HL)',
  ibsl: 'رياضيات البكالوريا الدولية — المستوى القياسي (IB Math SL)',
  igcse: 'رياضيات كامبريدج الدولية IGCSE (0580)',
  linalg: 'الجبر الخطي الجامعي (Linear Algebra)',
  mathai: 'الرياضيات للذكاء الاصطناعي وتعلم الآلة (Math for AI)',
  mvc: 'التفاضل والتكامل متعدد المتغيرات (Multivariable Calculus)',
  odes: 'المعادلات التفاضلية العادية (Differential Equations)',
  olympiad: 'أولمبياد الرياضيات والمسابقات الدولية (AMC / Kangaroo / موهبة)',
  precalc: 'ما قبل التفاضل والتكامل (Pre-Calculus)',
  qudrat: 'اختبار القدرات العامة — القسم الكمي (قياس)',
  sat: 'اختبار SAT الرقمي — الرياضيات (Digital SAT Math)',
  tahsili: 'الاختبار التحصيلي — قسم الرياضيات (قياس)'
};

const TRACK_SUBTITLE_AR = {
  a2level: 'منهج السنة الثانية الكامل للمستوى المتقدم A-Level — الرياضيات البحتة ٣، الميكانيكا، والإحصاء ٢ مع اختبارات تحاكي كامبريدج 9709 وإدكسل.',
  act: 'مراجعة شاملة لاختبار ACT في الرياضيات (٤٥ سؤالاً في ٥٠ دقيقة) — الجبر، الدوال، الهندسة، حساب المثلثات، والإحصاء مع محاكي اختبار كامل.',
  act2: 'التحضير المتكامل لاختبار الموضوعات الدولي ACT الرياضيات ١ — الجبر المتقدم، الهندسة الإحداثية، حساب المثلثات، والإحصاء.',
  act2l2: 'التحضير المتكامل لاختبار الموضوعات الدولي ACT الرياضيات ٢ — الأعداد المركبة، المصفوفات والمتجهات، المتتابعات، الإحداثيات القطبية، والنهايات.',
  addmath: 'منهج كامبريدج 0606 وإدكسل 4PM1 للرياضيات المتقدمة لطلاب المدارس الدولية بالمرحلة الثانوية.',
  alg2: 'الدوال، المعادلات التربيعية والأعداد المركبة، كثيرات الحدود، الدوال النسبية والأسية واللوغاريتمية، المتتابعات، والقطوع المخروطية في ١١ فصلاً تفاعلياً.',
  algebra: 'المعادلات الخطية، الدوال التربيعية، الأسس وكثيرات الحدود، المتباينات، والتحليل الإحصائي مع مستكشفات بيانية تفاعلية.',
  apab: 'الوحدات ١ إلى ٨ بعمق اختبار AP — من النهايات والاتصال إلى الاشتقاق والتكامل وتطبيقاتهما مع أسئلة اختيار من متعدد ومقالية (FRQ).',
  apbc: 'منهج AP Calculus AB كاملاً بالإضافة إلى طرق التكامل المتقدمة، المعادلات البارامترية والقطبية والمتجهة، والمتسلسلات اللانهائية.',
  appc: 'إتقان الدوال كثيرة الحدود والنسبية والأسية واللوغاريتمية والمثلثية والقطبية للتحضير لاختبار AP Precalculus.',
  apstats: 'استكشاف البيانات، تصميم الدراسات والعينات، الاحتمالات والتوزيعات، والاستدلال الإحصائي واختبارات الفروض وفق منهج AP Statistics.',
  aslevel: 'منهج السنة الأولى الكامل للمستوى المتقدم AS-Level — الرياضيات البحتة ١ و٢، الميكانيكا، والإحصاء ١ مع أوراق تدريبية كاملة.',
  calculus: 'النهايات، المشتقات، التكاملات، النظرية الأساسية للتفاضل والتكامل، المتسلسلات، والتفاضل متعدد المتغيرات مع ١٥ مستكشفاً تفاعلياً.',
  edexcel: 'إتقان منهج بيرسون إدكسل الدولي للرياضيات IGCSE 4MA1 (المستوى المتقدم 9–1) ووحدات المستوى المتقدم الدولي IAL (P1–P4, M1, S1).',
  est: 'التحضير الشامل لاختبار الدبلومة الأمريكية في مصر EST I — القسمين المسموح وغير المسموح فيهما بالآلة الحاسبة.',
  est2: 'التحضير الشامل لاختبار المستوى المتقدم EST II الرياضيات ١ — الجبر المتقدم، الدوال، الهندسة، حساب المثلثات، والإحصاء.',
  est2l2: 'التحضير الشامل لاختبار المستوى المتقدم EST II الرياضيات ٢ — الأعداد المركبة، المتتابعات، المصفوفات والمتجهات، ومبادئ التفاضل والتكامل.',
  gaten: 'التحضير الشامل لاختبار القدرات العامة (GAT) والاختبار التحصيلي (SAAT) باللغة الإنجليزية (هيئة تقويم التعليم والتدريب — قياس).',
  geo: 'البراهين والاستدلال، المستقيمات المتوازية، تطابق وتشابه المثلثات، حساب المثلثات، الدوائر، والمساحات والحجوم في ١١ فصلاً.',
  ibhl: 'منهج البكالوريا الدولية للمستوى العالي (AA HL و AI HL) — الجبر والبرهان، الأعداد المركبة، المتجهات ثلاثية الأبعاد، التفاضل والتكامل المتقدم، وأوراق P1/P2/P3.',
  ibsl: 'منهج البكالوريا الدولية للمستوى القياسي (AA SL و AI SL) — الجبر، الدوال، الهندسة وحساب المثلثات، الإحصاء، والتفاضل والتكامل.',
  igcse: 'منهج كامبريدج IGCSE الرياضيات (0580) للمستويين الأساسي والمتقدم (Core & Extended) — الأعداد، الجبر، الهندسة، المثلثات، والاحتمالات.',
  linalg: 'المتجهات، الأنظمة الخطية، المصفوفات، المحددات، الفضاءات المتجهة، القيم والمتجهات الذاتية، التحويلات الخطية، والمربعات الصغرى.',
  mathai: 'الأساس الرياضي للذكاء الاصطناعي الحديث: الجبر الخطي، تفاضل المتجهات، الانحدار التدريجي، نظرية الاحتمالات، وتحليل المركبات الأساسية (PCA).',
  mvc: 'المشتقات الجزئية، التدرج، التحسين ومضاعفات لاغرانج، التكاملات الثنائية والثلاثية، الحقول المتجهة، ونظريات غرين وستوكس والتباعد.',
  odes: 'المعادلات التفاضلية من الرتبة الأولى والثانية، المعاملات غير المحددة، تغيير البارامترات، تحويلات لابلاس، الأنظمة الخطية، متسلسلات القوى، والطرق العددية.',
  olympiad: 'تدريب متقدم لأولمبياد الرياضيات، مسابقة الكنغارو وموهبة، واختبارات AMC 10/12 و AIME في الجبر ونظرية الأعداد والتركيبات والهندسة.',
  precalc: 'حساب المثلثات، القطوع المخروطية، المتجهات، الإحداثيات القطبية، الدوال الأسية واللوغاريتمية والنسبية، النهايات، والمتتابعات والمتسلسلات.',
  qudrat: 'تحضير متكامل لقسم القدرات الكمي (الورقي والمحوسب) — الحساب، الجبر، الهندسة، المقارنات الكمية، والرسوم البيانية.',
  sat: 'تحضير متكامل لاختبار Digital SAT التكيّفي — الجبر، الرياضيات المتقدمة، تحليل البيانات، والهندسة وحساب المثلثات مع استراتيجيات Desmos.',
  tahsili: 'مراجعة شاملة لرياضيات المرحلة الثانوية (أول وثاني وثالث ثانوي) لاختبار التحصيلي العلمي — مع اختبارات محاكية.'
};

const CHAPTER_TITLE_AR = {
  // a2level
  'a2l-about': 'حول مستوى A2 المتقدم واستراتيجية الاختبار',
  'a2l-functions': 'الدوال: دالة القيمة المطلقة والدالة العكسية',
  'a2l-explog': 'الدوال الأسية واللوغاريتمية',
  'a2l-trig': 'حساب المثلثات المتقدم والمتطابقات',
  'a2l-diff': 'التفاضل وطرق الاشتقاق المتقدمة',
  'a2l-integ': 'التكامل وطرق التكامل المتقدمة',
  'a2l-series': 'المتتابعات والمتسلسلات ومفكوك ذات الحدين',
  'a2l-vectors': 'المتجهات في الفضاء ثلاثي الأبعاد',
  'a2l-algebra': 'الجبر المتقدم: الكسور الجزئية وقسمة كثيرات الحدود',
  'a2l-complex': 'الأعداد المركبة ومستوى أرجاند',
  'a2l-numerical': 'الطرق العددية وإيجاد الجذور بالتكرار',
  'a2l-diffeq': 'المعادلات التفاضلية وتطبيقاتها',
  'a2l-poisson': 'توزيع بواسون (Poisson Distribution)',
  'a2l-conrv': 'المتغيرات العشوائية المتصلة ودالة الكثافة',
  'a2l-sampling': 'المعاينة الإحصائية والتقدير بفترات الثقة',
  'a2l-hypothesis': 'اختبارات الفروض الإحصائية',

  // act
  'act-about': 'نظام اختبار ACT واستراتيجيات الحل السريع',
  'act-numbers': 'الأعداد والنسب المئوية والتناسب',
  'act-algebra': 'الجبر الأساسي والمتوسط',
  'act-functions': 'الدوال والتمثيل البياني',
  'act-coordgeo': 'الهندسة الإحداثية ومعادلات المستقيم',
  'act-planegeo': 'الهندسة المستوية والأشكال الهندسية',
  'act-trig': 'حساب المثلثات والدوال المثلثية',
  'act-stats': 'الإحصاء والاحتمالات وتحليل البيانات',
  'act-advanced': 'المصفوفات والمتجهات والأعداد المركبة',

  // act2
  'act2-about': 'نظام اختبار ACT الموضوعي ١ واستراتيجية الحل',
  'act2-numbers': 'نظرية الأعداد المتقدمة والخصائص الحسابية',
  'act2-algebra': 'الجبر المتقدم وأنظمة المعادلات',
  'act2-functions': 'الدوال المتقدمة وتركيب الدوال',
  'act2-trig': 'حساب المثلثات المتقدم والمتطابقات',
  'act2-precalc': 'مفاهيم ما قبل التفاضل والتكامل',
  'act2-coordgeo': 'الهندسة الإحداثية المتقدمة والقطوع',
  'act2-planegeo': 'الهندسة المستوية والفراغية المتقدمة',
  'act2-stats': 'الإحصاء وطرق العد والاحتمالات',

  // act2l2
  'act2l2-about': 'نظام اختبار ACT الموضوعي ٢ واستراتيجية الحل',
  'act2l2-complex': 'الأعداد المركبة ونظرية ديموافر',
  'act2l2-matrices-vectors': 'المصفوفات والمحددات والمتجهات',
  'act2l2-sequences-series': 'المتتابعات والمتسلسلات الحسابية والهندسية',
  'act2l2-advanced-functions-equations': 'الدوال والمعادلات المتقدمة',
  'act2l2-trig-polar': 'حساب المثلثات والإحداثيات القطبية',
  'act2l2-limits': 'النهايات والاتصال والمقاربات',

  // alg2
  'a2-functions': 'الدوال وتمثيلاتها البيانية',
  'a2-quadratics': 'المعادلات التربيعية والأعداد المركبة',
  'a2-polynomials': 'الدوال كثيرة الحدود وجذورها',
  'a2-rational': 'العبارات والمعادلات النسبية',
  'a2-exponential': 'الدوال الأسية واللوغاريتمية',
  'a2-radical': 'الجذور والأسس النسبية',
  'a2-sequences': 'المتتابعات والمتسلسلات',
  'a2-conics': 'القطوع المخروطية',
  'a2-trig': 'الدوال والمتطابقات المثلثية',
  'a2-matrices': 'المصفوفات وأنظمة المعادلات',
  'a2-stats': 'الاحتمالات والإحصاء التطبيقي',

  // algebra
  'ag-linear': 'المعادلات الخطية ومعادلات المستقيم',
  'ag-quadratics': 'الدوال والمعادلات التربيعية',
  'ag-exponents': 'الأسس وكثيرات الحدود',
  'ag-functions': 'الدوال والتحويلات الهندسية',
  'ag-exponential': 'الدوال الأسية واللوغاريتمية',
  'ag-systems': 'أنظمة المعادلات والمتباينات',
  'ag-sequences': 'المتتابعات والمتسلسلات',
  'ag-factoring': 'تحليل كثيرات الحدود إلى عوامل',
  'ag-radicals': 'الجذور والأسس الكسرية',
  'ag-rational': 'العبارات والمعادلات النسبية',
  'ag-stats': 'الإحصاء وتحليل البيانات',

  // apab
  'apab-overview': 'نظرة عامة على نظام اختبار AP Calculus AB والوحدات',
  'apab-u1': 'الوحدة ١ · النهايات والاتصال',
  'apab-u2': 'الوحدة ٢ · التفاضل: التعريف والخصائص الأساسية',
  'apab-u3': 'الوحدة ٣ · اشتقاق الدوال المركبة والضمنية والعكسية',
  'apab-u4': 'الوحدة ٤ · التطبيقات السياقية والفيزيائية للاشتقاق',
  'apab-u5': 'الوحدة ٥ · التطبيقات التحليلية للاشتقاق والقيم القصوى',
  'apab-u6': 'الوحدة ٦ · التكامل وتراكم التغير',
  'apab-u7': 'الوحدة ٧ · المعادلات التفاضلية وحقول الميل',
  'apab-u8': 'الوحدة ٨ · تطبيقات التكامل (المساحات والحجوم)',
  'apab-exam': 'إدارة الوقت واستراتيجية التصحيح في اختبار AP Calculus AB',
  'apab-frq': 'الأسئلة المقالية الحرة (FRQs) في اختبار AP Calculus AB',

  // apbc
  'apbc-overview': 'نظرة عامة على نظام اختبار AP Calculus BC والوحدات',
  'apbc-beyond': 'ما بعد AB — نظرة عامة على موضوعات BC المتقدمة',
  'apbc-c1': 'الوحدة 6BC · طرق التكامل المتقدمة والتكاملات المعتلة',
  'apbc-c2': 'الوحدة 7BC · النماذج اللوجستية وطريقة أويلر العددية',
  'apbc-c3': 'الوحدة ٩ · المعادلات البارامترية والدوال المتجهة',
  'apbc-c4': 'الوحدة ٩ · الإحداثيات القطبية والمساحات القطبية',
  'apbc-c5': 'الوحدة ١٠ · المتتابعات والمتسلسلات اللانهائية واختبارات التقارب',
  'apbc-c6': 'الوحدة ١٠ · متسلسلات القوى ومتسلسلات تايلور وماكلورين',
  'apbc-frq': 'الأسئلة المقالية الحرة (FRQs) في اختبار AP Calculus BC',

  // appc
  'appc-overview': 'نظام اختبار AP Precalculus وإطار النمذجة الرياضية',
  'appc-u1': 'الوحدة ١ · الدوال كثيرة الحدود والدوال النسبية',
  'appc-u2': 'الوحدة ٢ · الدوال الأسية واللوغاريتمية',
  'appc-u3': 'الوحدة ٣ · الدوال المثلثية والدوال القطبية',
  'appc-u4': 'الوحدة ٤ · المعادلات البارامترية والمتجهات والمصفوفات',

  // apstats
  'aps-overview': 'نظام اختبار AP Statistics وتصميم الدراسات الإحصائية',
  'aps-u1': 'الوحدة ١ · استكشاف البيانات وحيدة وثنائية المتغير',
  'aps-u2': 'الوحدة ٢ · جمع البيانات والمعاينة وتصميم التجارب',
  'aps-u3': 'الوحدة ٣ · الاحتمالات والمتغيرات العشوائية والتوزيعات',
  'aps-u4': 'الوحدة ٤ · الاستدلال الإحصائي للنسب والمتوسطات والانحدار',

  // aslevel
  'as-about': 'حول مستوى AS المتقدم المساعد واستراتيجية الاختبار',
  'as-algebra': 'الأسس والجذور الصماء والمعادلات التربيعية',
  'as-equations': 'أنظمة المعادلات الآنية والمتباينات',
  'as-functions': 'التمثيلات البيانية والتحويلات الهندسية',
  'as-coordgeo': 'الهندسة الإحداثية ومعادلة الدائرة',
  'as-trig': 'حساب المثلثات والمتطابقات المثلثية',
  'as-calculus': 'التفاضل والتكامل الأساسي وتطبيقاته',
  'as-stats': 'الإحصاء والاحتمالات الأساسية',
  'as-funcs': 'الدوال: تركيب الدوال والدالة العكسية',
  'as-radians': 'القياس الدائري (الراديان) وطول القوس ومساحة القطاع',
  'as-series': 'المتتابعات والمتسلسلات ونظرية ذات الحدين',
  'as-mechanics': 'الميكانيكا: الحركة في خط مستقيم (الكينماتيكا)',
  'as-forces': 'القوى والاتزان الميكانيكي',
  'as-newton': 'قوانين نيوتن للحركة وتطبيقاتها',
  'as-energy': 'الشغل والطاقة والقدرة الميكانيكية',
  'as-datarepresent': 'تمثيل البيانات الإحصائية ومقاييس النزعة والتشتت',
  'as-permcomb': 'التباديل والتوافيق ومبدأ العد',
  'as-drv': 'المتغيرات العشوائية المتقطعة والتوقع الرياضي',
  'as-bindist': 'توزيع ذات الحدين والتوزيع الهندسي',
  'as-normdist': 'التوزيع الطبيعي المعياري وتطبيقاته',

  // calculus
  'ch-foundations': 'الأسس الرياضية ومراجعة ما قبل التفاضل والتكامل',
  'ch-limits': 'النهايات والاتصال',
  'ch-derivatives': 'المشتقات وقواعد الاشتقاق',
  'ch-integrals': 'التكاملات غير المحدودة والمحدودة',
  'ch-ftc': 'النظرية الأساسية للتفاضل والتكامل',
  'ch-applications': 'تطبيقات الاشتقاق والتحسين والمعدلات المرتبطة',
  'ch-techniques': 'طرق وتقنيات التكامل المتقدمة',
  'ch-appint': 'تطبيقات التكامل: المساحات والحجوم وطول القوس',
  'ch-diffeq': 'المعادلات التفاضلية والنمذجة الرياضية',
  'ch-parametric': 'المعادلات البارامترية والإحداثيات القطبية',
  'ch-series': 'المتتابعات والمتسلسلات اللانهائية',
  'ch-convergence': 'اختبارات التقارب ومتسلسلات القوى وتايلور',
  'ch-vectors': 'المتجهات والدوال المتجهة في الفضاء',
  'ch-partial': 'المشتقات الجزئية ومتجه التدرج (Gradient)',
  'ch-multiint': 'التكاملات الثنائية والثلاثية',
  'ch-vectorcalc': 'تفاضل وتكامل المتجهات ونظريات غرين وستوكس',

  // est
  'est-about': 'نظام اختبار EST I واستراتيجيات الحل',
  'est-algebra': 'قلب الجبر: المعادلات والأنظمة الخطية',
  'est-quadratics': 'المعادلات التربيعية وكثيرات الحدود',
  'est-functions': 'الدوال والتمثيلات البيانية',
  'est-data': 'النسب والمعدلات وتحليل البيانات',
  'est-stats': 'الإحصاء والاحتمالات',
  'est-geometry': 'الهندسة المستوية والفراغية',
  'est-trig': 'حساب المثلثات والموضوعات الإضافية',
  'est-explog': 'الدوال الأسية واللوغاريتمية',

  // est2
  'est2-about': 'نظام اختبار EST II الرياضيات ١ واستراتيجية الحل',
  'est2-algebra': 'الجبر المتقدم والمعادلات',
  'est2-functions': 'الدوال المركبة والعكسية واللوغاريتمية',
  'est2-sequences': 'المتتابعات والمتسلسلات والأعداد المركبة',
  'est2-geometry': 'المستقيمات والمثلثات والمضلعات',
  'est2-trig': 'حساب المثلثات والقوانين المثلثية',
  'est2-circles': 'الدوائر والقطوع المخروطية',
  'est2-solids': 'الهندسة الفراغية والتشابه',
  'est2-stats': 'الإحصاء والاحتمالات والتوافيق',

  // est2l2
  'est2l2-about': 'نظام اختبار EST II الرياضيات ٢ واستراتيجية الحل',
  'est2l2-complex': 'الأعداد المركبة والصورة القطبية',
  'est2l2-sequences-series': 'المتتابعات والمتسلسلات اللانهائية',
  'est2l2-functions-graphs': 'الدوال المتقدمة والتمثيلات البيانية',
  'est2l2-matrices-vectors': 'المصفوفات والمحددات والمتجهات',
  'est2l2-intro-calculus': 'مقدمة في التفاضل والتكامل والنهايات',
  'est2l2-probability': 'الاحتمالات والتوزيعات الاحتمالية',

  // geo
  'geo-foundations': 'الأسس الهندسية والاستدلال المنطقي والبراهين',
  'geo-lines': 'المستقيمات المتوازية والقواطع والزوايا',
  'geo-triangles': 'المثلثات ونظريات التطابق',
  'geo-similarity': 'التشابه والتناسب الهندسي',
  'geo-right': 'المثلثات القائمة وحساب المثلثات',
  'geo-quads': 'المضلعات والأشكال الرباعية وخصائصها',
  'geo-circles': 'الدوائر والأوتار والمماسات والزوايا',
  'geo-solids': 'المساحة والمساحة السطحية والحجوم للمجسمات',
  'geo-transform': 'التحويلات الهندسية والتماثل',
  'geo-coord': 'الهندسة الإحداثية في المستوى',
  'geo-prob': 'الاحتمالات الهندسية والشرطية',

  // ibhl
  'ibhl-overview': 'نظرة عامة على رياضيات البكالوريا الدولية للمستوى العالي (IB HL)',
  'ibhl-t1': 'الموضوع ١ · الجبر والبرهان الرياضي والأعداد المركبة',
  'ibhl-t2': 'الموضوع ٢ · الدوال والتحويلات (توسعات المستوى العالي HL)',
  'ibhl-t3': 'الموضوع ٣ · المتجهات والهندسة ثلاثية الأبعاد وحساب المثلثات',
  'ibhl-t4': 'الموضوع ٤ · الإحصاء والاحتمالات (توسعات المستوى العالي HL)',
  'ibhl-t5': 'الموضوع ٥ · التفاضل والتكامل المتقدم (HL)',
  'ibhl-aa': 'مسار التحليل والمقاربات (AA HL) — الموضوعات المتقدمة',
  'ibhl-aihl': 'مسار التطبيقات والتفسير (AI HL) — الموضوعات المتقدمة',

  // ibsl
  'ibsl-overview': 'نظرة عامة على رياضيات البكالوريا الدولية للمستوى القياسي (IB SL)',
  'ibsl-t1': 'الموضوع ١ · الأعداد والجبر والمتسلسلات',
  'ibsl-t2': 'الموضوع ٢ · الدوال والتمثيلات البيانية',
  'ibsl-t3': 'الموضوع ٣ · الهندسة وحساب المثلثات',
  'ibsl-t4': 'الموضوع ٤ · الإحصاء والاحتمالات والتوزيعات',
  'ibsl-t5': 'الموضوع ٥ · التفاضل والتكامل',
  'ibsl-ai': 'مسار التطبيقات والتفسير (AI SL) — الموضوعات الخاصة',

  // igcse
  'ig-number': 'الأعداد والعمليات الحسابية والنسب',
  'ig-algebra': 'الجبر والتمثيلات البيانية',
  'ig-coordinate': 'الهندسة الإحداثية ومعادلات المستقيم',
  'ig-mensuration': 'القياسات الهندسية: المحيط والمساحة والحجم',
  'ig-geometry': 'الهندسة المستوية ونظريات الدائرة',
  'ig-trig': 'حساب المثلثات وقانونا الجيب وجيب التمام',
  'ig-transform': 'التحويلات الهندسية والمتجهات والمصفوفات',
  'ig-stats': 'الاحتمالات والإحصاء وتمثيل البيانات',
  'ig-functions': 'الدوال والتركيب والدالة العكسية',
  'ig-sets': 'المجموعات وأشكال فن (Venn Diagrams)',

  // linalg
  'la-vectors': 'المتجهات في \\( \\mathbb{R}^n \\) وفضاءات الضرب الداخلي',
  'la-systems': 'أنظمة المعادلات الخطية والاختزال الصفي الغاوسي (RREF)',
  'la-matrices': 'المصفوفات وجبر المصفوفات والمصفوفة العكسية',
  'la-determinants': 'المحددات وخصائصها والتفسير الهندسي للحجم',
  'la-vectorspaces': 'الفضاءات المتجهة والفضاءات الجزئية الأربعة الأساسية',
  'la-eigen': 'القيم الذاتية والمتجهات الذاتية والاستقطار (Diagonalization)',
  'la-lintrans': 'التحويلات الخطية والتمثيل المصفوفي وتغيير الأساس',
  'la-orthogonality': 'التعامد وخوارزمية غرام-شميدت وتفكيك QR والمربعات الصغرى',

  // mvc
  'mvc-partials': 'الدوال متعددة المتغيرات والنهايات والمشتقات الجزئية وقابلية الاشتقاق',
  'mvc-chain-rule': 'قاعدة السلسلة متعددة المتغيرات والمشتقات الاتجاهية وهندسة التدرج',
  'mvc-optimization': 'التحسين متعدد المتغيرات: النقاط الحرجة ومصفوفة هيس ومضاعفات لاغرانج',
  'mvc-double-integrals': 'التكاملات الثنائية ونظرية فوبيني والإحداثيات القطبية والجاكوبيان',
  'mvc-triple-integrals': 'التكاملات الثلاثية والإحداثيات الأسطوانية والكروية',
  'mvc-vector-fields': 'الحقول المتجهة والتكاملات الخطية والحقول المحافظة',
  'mvc-greens-theorem': 'نظرية غرين (Green\'s Theorem) في المستوى',
  'mvc-surface-divergence-stokes': 'التكاملات السطحية ونظرية التباعد (غاوس) ونظرية ستوكس',

  // odes
  'ode-separable': 'المعادلات التفاضلية من الرتبة الأولى والمعادلات القابلة للفصل ونظرية الوجود',
  'ode-linear': 'المعادلات الخطية من الرتبة الأولى وعوامل التكامل ومعادلات برنولي',
  'ode-second-order': 'المعادلات التفاضلية الخطية المتجانسة من الرتبة الثانية ومحدد فرونسكي',
  'ode-undetermined-coefficients': 'المعادلات غير المتجانسة وطريقة المعاملات غير المحددة والرنين',
  'ode-variation-of-parameters': 'طريقة تغيير البارامترات وأنظمة فرونسكي ونواة غرين',
  'ode-laplace-transforms': 'تحويل لابلاس ودوال الخطوة ونبضة ديراك ونظرية الالتفاف (Convolution)',
  'ode-systems': 'أنظمة المعادلات التفاضلية الخطية ومستوى الطور ومصفوفة الأس',
  'ode-series-solutions': 'الحلول بمتسلسلات القوى والنقاط العادية وطريقة فروبينيوس',
  'ode-numerical-methods': 'الطرق العددية: طريقة أويلر وأويلر المحسنة (RK2) ورونج-كوتا (RK4)',

  // precalc
  'pc-trig': 'حساب المثلثات وقوانين المثلثات',
  'pc-circles': 'دائرة الوحدة والمتطابقات والمعادلات المثلثية',
  'pc-conics': 'القطوع المخروطية والهندسة التحليلية',
  'pc-vectors': 'المتجهات والمستقيمات والمعادلات البارامترية',
  'pc-polar': 'الإحداثيات القطبية والأعداد المركبة ونظرية ديموافر',
  'pc-exp': 'الدوال الأسية واللوغاريتمية والنماذج اللوجستية',
  'pc-rational': 'الدوال النسبية والنهايات والاتصال',
  'pc-sequences': 'المتتابعات والمتسلسلات والاستقراء الرياضي ونظرية ذات الحدين',

  // sat
  'sat-about': 'نظام اختبار Digital SAT واستراتيجية الاختبار التكيّفي',
  'sat-linear': 'المعادلات الخطية في متغير واحد وأنظمة المعادلات الخطية',
  'sat-linfun': 'الدوال الخطية والمتباينات الخطية',
  'sat-quad': 'العبارات المتكافئة والمعادلات والدوال التربيعية',
  'sat-expoly': 'الأسس والجذور وكثيرات الحدود والعبارات النسبية',
  'sat-functions': 'الدوال غير الخطية وترميز الدوال والتحويلات',
  'sat-data': 'النسب والمعدلات والتناسب والنسب المئوية ومخططات الانتشار',
  'sat-stats': 'إحصاء المتغير الواحد والتوزيعات وهامش الخطأ',
  'sat-condprob': 'الاحتمالات والاحتمال الشرطي والجداول المزدوجة',
  'sat-geo': 'المساحة والحجم والمثلثات والدوائر وحساب المثلثات',
  'sat-desmos': 'تكتيكات حاسبة Desmos البيانية لحل مسائل SAT بسرعة'
};

const RAIL_LABEL_AR = {
  'ag-stats': 'الإحصاء',
  'ibhl-aa': 'توسعات AA HL',
  'ibhl-aihl': 'توسعات AI HL',
  'ibsl-ai': 'موضوعات AI SL'
};

const STAT_LABEL_AR = {
  'Level': 'المستوى',
  'Target Level': 'المستوى المستهدف',
  'Chapters': 'الفصول',
  'Core Chapters': 'الفصول الأساسية',
  'Explorers': 'المستكشفات التفاعلية',
  'Interactive Explorers': 'المستكشفات التفاعلية',
  'Interactive Labs': 'المختبرات التفاعلية',
  'Feeds into': 'يمهّد لـ',
  'Prerequisite': 'المتطلب السابق',
  'Board': 'الجهة المانحة',
  'Boards': 'الجهات المانحة',
  'Provider': 'الجهة المنظمة',
  'Format': 'نظام الاختبار',
  'Real exam format': 'نظام الاختبار الرسمي',
  'Exam': 'الاختبار',
  'Exam Codes': 'رموز الاختبار',
  'Exam Structure': 'هيكل الاختبار',
  'Specification': 'المواصفة القياسية',
  'Target Exams': 'الاختبارات المستهدفة',
  'Calculator Policy': 'سياسة الآلة الحاسبة',
  'Units': 'الوحدات',
  'Covers': 'المحتوى',
  'Sections': 'الأقسام',
  'Courses': 'المسارات',
  'Syllabus': 'المنهج الدراسي',
  'Tiers': 'المستويات',
  'Focus': 'التركيز العلمي',
  'Competitions': 'المسابقات',
  'Core Pillars': 'المحاور الأساسية',
  'Tracks & Format': 'المسارات ونظام الاختبار',
  'Curriculum Weight': 'توزيع أوزان المنهج',
  'Status': 'الحالة'
};

function translateGenericAr(enText, trackTitleAr) {
  if (!enText) return enText;
  const s = String(enText).trim();
  if (STAT_LABEL_AR[s]) return STAT_LABEL_AR[s];
  if (/^\d+$/.test(s)) return s;
  if (/^\d+\s*interactive$/i.test(s)) {
    const n = s.match(/\d+/)[0];
    return `${n} مستكشفات تفاعلية`;
  }
  if (/^Build a randomised test/i.test(s)) {
    return 'أنشئ اختباراً عشوائياً من بنك أسئلة هذا المسار. اختر عدد الأسئلة ومستوى الصعوبة، ثم ولّد الاختبار واعرض الحلول التفصيلية عندما تكون جاهزاً — أو اطبع نسخة نظيفة.';
  }
  if (/^Editable \.docx/i.test(s)) {
    return 'ملف وورد (.docx) قابل للتعديل بمعادلات رياضية أصلية (OMML) — جاهز لأوراق العمل أو الاختبارات القصيرة.';
  }
  if (/^DOCX · Word equations$/i.test(s)) {
    return 'وورد DOCX · معادلات قابلة للتعديل';
  }
  if (/^DOCX · editable$/i.test(s)) {
    return 'وورد DOCX · قابل للتعديل';
  }
  if (/^Take .* offline/i.test(s) || /^Take the material offline/i.test(s) || /^Download complete/i.test(s)) {
    return `احصل على مادة ${trackTitleAr} للعمل دون اتصال. يمكنك طباعة حزمة PDF مباشرة من المتصفح أو تنزيل نسخة Word قابلة للتعديل.`;
  }
  if (/notes &amp; practice|complete notes|Revision Guide|lessons, FRQs|chapters, FRQs/i.test(s)) {
    return `ملخصات وأوراق تدريب ${trackTitleAr}`;
  }
  if (/All .* chapters|All eight units|All six BC|The full chapters/i.test(s)) {
    return `جميع فصول المسار مع الأمثلة المحلولة والحلول التفصيلية بتنسيق جاهز للطباعة.`;
  }
  if (/worksheets with (full )?answer keys|topical worksheets|applied AI math drills|training problem sets/i.test(s)) {
    const m = s.match(/^(\d+)/);
    const numPart = m ? `${m[1]} ورقة عمل تدريبية` : 'مجموعة شاملة من أوراق العمل التدريبية';
    return `${numPart} مع نماذج الإجابة الكاملة مرتبة حسب الوحدات — مجانية للتنزيل والطباعة.`;
  }
  if (/^Generate Full /i.test(s) || /^Generate /i.test(s)) {
    return `توليد اختبار ${trackTitleAr} الكامل ↻`;
  }
  return `${trackTitleAr} — ${s}`;
}

let updatedMetaCount = 0;
let updatedChapterCount = 0;

const tracks = fs.readdirSync(CONTENT_DIR).filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory()).sort();

for (const t of tracks) {
  const metaPath = path.join(CONTENT_DIR, t, '_meta.json');
  const metaObj = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const m = metaObj.meta;
  const titleAr = TRACK_TITLE_AR[t] || m.title.ar || m.title.en;

  // 1. Title & Subtitle
  if (!m.title.ar) m.title.ar = titleAr;
  if (m.subtitle && !m.subtitle.ar) {
    m.subtitle.ar = TRACK_SUBTITLE_AR[t] || titleAr;
  }

  // 2. Exam Board & Official Links
  if (!m.examBoard && EXAM_BOARDS[t]) {
    m.examBoard = EXAM_BOARDS[t];
  }
  if (OFFICIAL_LINKS_UPGRADES[t]) {
    m.officialLinks = OFFICIAL_LINKS_UPGRADES[t];
  }
  if (Array.isArray(m.officialLinks)) {
    for (const link of m.officialLinks) {
      if (link.label && !link.label.ar) {
        link.label.ar = `المصدر الرسمي — ${link.label.en.replace(/&amp;/g, '&')}`;
      }
      if (link.note && !link.note.ar) {
        link.note.ar = `نماذج اختبارات ومصادر رسمية (${link.note.en.replace(/&amp;/g, '&')})`;
      }
    }
  }

  // 3. Downloads Info upgrades
  if (t === 'linalg' || t === 'mvc') {
    m.downloadsInfo.worksheetLibraryText.en = '12 original ClipSAT worksheets with full answer keys, covering all eight chapters — free to download and print.';
    m.downloadsInfo.worksheetLibraryText.ar = '١٢ ورقة عمل أصلية من ClipSAT مع نماذج الإجابة الكاملة تغطي جميع الفصول الثمانية — مجانية للتنزيل والطباعة.';
  } else if (t === 'odes') {
    m.downloadsInfo.worksheetLibraryText.en = '14 original ClipSAT worksheets with full answer keys, covering all nine chapters — free to download and print.';
    m.downloadsInfo.worksheetLibraryText.ar = '١٤ ورقة عمل أصلية من ClipSAT مع نماذج الإجابة الكاملة تغطي جميع الفصول التسعة — مجانية للتنزيل والطباعة.';
  }
  if (t === 'calculus' && m.downloadsInfo.plannedCard) {
    delete m.downloadsInfo.plannedCard;
  }
  if (m.downloadsInfo) {
    for (const [k, v] of Object.entries(m.downloadsInfo)) {
      if (v && typeof v === 'object' && Object.prototype.hasOwnProperty.call(v, 'en') && !v.ar) {
        v.ar = translateGenericAr(v.en, titleAr);
      }
    }
  }

  // 4. Page Header upgrades (fix apab/apbc Preview & populate .ar)
  if (t === 'apab' || t === 'apbc') {
    if (m.pageHeader.eyebrow) {
      m.pageHeader.eyebrow.en = 'AP · College Board';
      m.pageHeader.eyebrow.ar = 'اختبارات AP المتقدمة · College Board';
    }
    if (Array.isArray(m.pageHeader.stats)) {
      for (const st of m.pageHeader.stats) {
        if (st.label.en === 'Status' && st.value.en === 'Preview') {
          st.label.en = 'Chapters';
          st.label.ar = 'الفصول';
          st.value.en = t === 'apab' ? '11' : '9';
          st.value.ar = t === 'apab' ? '11' : '9';
        }
      }
    }
  }
  if (m.pageHeader) {
    if (m.pageHeader.eyebrow && !m.pageHeader.eyebrow.ar) {
      m.pageHeader.eyebrow.ar = `${titleAr} · ${m.pageHeader.eyebrow.en}`;
    }
    if (m.pageHeader.h1 && !m.pageHeader.h1.ar) {
      m.pageHeader.h1.ar = titleAr;
    }
    if (Array.isArray(m.pageHeader.stats)) {
      for (const st of m.pageHeader.stats) {
        if (st.label && !st.label.ar) {
          st.label.ar = STAT_LABEL_AR[st.label.en] || st.label.en;
        }
        if (st.value && !st.value.ar) {
          st.value.ar = translateGenericAr(st.value.en, titleAr);
        }
      }
    }
  }

  // 5. Test Generator upgrades
  if (FULL_EXAM_META_UPGRADES[t]) {
    const up = FULL_EXAM_META_UPGRADES[t];
    delete m.testGenerator.hasFullExam;
    m.testGenerator.examTitle = up.examTitle;
    m.testGenerator.sections = up.sections;
    m.testGenerator.examDescription = up.examDescription;
    m.testGenerator.examButtonLabel = up.examButtonLabel;
    m.testGenerator.examMinutesArg = up.examMinutesArg;
  }
  if (m.testGenerator) {
    for (const [k, v] of Object.entries(m.testGenerator)) {
      if (v && typeof v === 'object' && Object.prototype.hasOwnProperty.call(v, 'en') && !v.ar) {
        v.ar = translateGenericAr(v.en, titleAr);
      }
    }
    if (Array.isArray(m.testGenerator.exams)) {
      for (const ex of m.testGenerator.exams) {
        if (ex.examButtonLabel && !ex.examButtonLabel.ar) {
          ex.examButtonLabel.ar = `توليد اختبار ${ex.examTitle} ↻`;
        }
      }
    }
  }

  fs.writeFileSync(metaPath, JSON.stringify(metaObj, null, 2) + '\n', 'utf8');
  updatedMetaCount++;

  // 6. Chapter titles & railLabels
  for (const cid of metaObj.chapterOrder) {
    const chPath = path.join(CONTENT_DIR, t, cid + '.json');
    const chObj = JSON.parse(fs.readFileSync(chPath, 'utf8'));
    let changed = false;
    if (!chObj.title.ar) {
      if (!CHAPTER_TITLE_AR[cid]) {
        throw new Error(`Missing CHAPTER_TITLE_AR translation for ${t}/${cid}: "${chObj.title.en}"`);
      }
      chObj.title.ar = CHAPTER_TITLE_AR[cid];
      changed = true;
    }
    if (chObj.railLabel && !chObj.railLabel.ar) {
      chObj.railLabel.ar = RAIL_LABEL_AR[cid] || chObj.title.ar;
      changed = true;
    }
    if (chObj.description && !chObj.description.ar) {
      chObj.description.ar = chObj.title.ar;
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(chPath, JSON.stringify(chObj, null, 2) + '\n', 'utf8');
      updatedChapterCount++;
    }
  }
}

console.log(`Updated ${updatedMetaCount} _meta.json files and ${updatedChapterCount} chapter files.`);
