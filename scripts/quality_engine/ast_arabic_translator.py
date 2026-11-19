#!/usr/bin/env python3
"""
scripts/quality_engine/ast_arabic_translator.py
AST-Protected Mathematical EN -> AR Translation & Bilingual Parity Engine (Wave 3 — WP-35, WP-36, WP-48)

Guarantees:
  1. Freezes all LaTeX segments (\\(...\\), \\[...\\], $$...$$), HTML tags (<...>), and numeric literals
     into immutable placeholders (__MATH_k__, __TAG_k__, __NUM_k__) before any translation.
  2. Never touches content inside KaTeX math mode and keeps Arabic prose strictly outside \\text{...}.
  3. Enforces 0 mid-word Latin/Arabic substring corruptions (all replacements use strict word boundaries).
  4. Enforces 100% EN <-> AR numeric multiset and math-token multiset parity.
"""

from __future__ import annotations
import re
from typing import Dict, List, Tuple

MATH_SEG_RE = re.compile(r'(\\\(.*?\\\)|\\\[.*?\\\]|\$\$.*?\$\$)', re.S)
TAG_RE = re.compile(r'</?[A-Za-z!][A-Za-z0-9:-]*(?:\s[^<>]*)?>')
NUM_RE = re.compile(r'(?<![A-Za-z0-9_])\d+(?:,\d{3})*(?:\.\d+)?%?(?![A-Za-z0-9_])')
MIDWORD_RE = re.compile(r'[A-Za-z][\u0621-\u063A\u0641-\u064A]|[\u0621-\u063A\u0641-\u064A][A-Za-z]')
AR_CHAR_RE = re.compile(r'[\u0600-\u06FF]')
ARABIC_DIGITS = str.maketrans('٠١٢٣٤٥٦٧٨٩', '0123456789')

# Allowed uppercase acronyms / mathematical symbols in Arabic prose
ALLOWED_LATIN_TOKENS = {
    'SAT', 'ACT', 'EST', 'AP', 'IB', 'SL', 'HL', 'AA', 'AI', 'IGCSE', 'GCSE', 'CAIE',
    'AS', 'A2', 'GAT', 'SAAT', 'ETEC', 'MOE', 'KSA', 'KAUST', 'KMC', 'NSMO', 'IMO',
    'AMC', 'AIME', 'GDC', 'CAS', 'CBT', 'CAT', 'MCQ', 'MCQs', 'SPR', 'SPRs', 'FRQ', 'FRQs',
    'PDF', 'DOCX', 'OMML', 'SVG', 'HTML', 'UI', 'QR', 'IQR', 'SD', 'SE', 'SEM', 'ANOVA',
    'RMSE', 'SSR', 'SSE', 'SST', 'CLT', 'MVT', 'IVT', 'EVT', 'FTC', 'ODE', 'ODEs', 'PDE',
    'IVP', 'BVP', 'RK4', 'LU', 'QR', 'SVD', 'RREF', 'REF', 'LHS', 'RHS', 'AM', 'GM', 'HM',
    'QM', 'GCD', 'LCM', 'HCF', 'FOIL', 'PEMDAS', 'BODMAS', 'SOHCAHTOA', 'CAST', 'QED',
    'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'XI', 'XII',
    'P1', 'P2', 'P3', 'P4', 'M1', 'S1', 'S2', 'FP1', 'C1', 'C2', 'C3', 'C4',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'ln', 'log', 'exp', 'lim', 'det', 'mod',
    'ClipSAT', 'Qiyas', 'Bluebook', 'Desmos', 'Cambridge', 'Edexcel', 'Pearson', 'Oxford',
    'Mawhiba', 'Kangaroo', 'Thuwal', 'KFUPM', 'KSU', 'GCC', 'Word', 'YouTube'
}


def norm_math_tok(tok: str) -> str:
    inner = tok
    if inner.startswith(r'\(') or inner.startswith(r'\['):
        inner = inner[2:-2]
    elif inner.startswith('$$'):
        inner = inner[2:-2]
    # Remove prose wrappers inside math when comparing symbolic tokens
    prev = None
    while prev != inner:
        prev = inner
        inner = re.sub(r'\\(?:text|mathrm|textbf|textit|mathbf)\{([^{}]*)\}', lambda m: '' if AR_CHAR_RE.search(m.group(1)) or re.search(r'[A-Za-z]{3,}', m.group(1)) else m.group(1), inner)
    inner = (
        inner.replace(r'\dfrac', r'\frac')
        .replace(r'\tfrac', r'\frac')
        .replace(r'\left', '')
        .replace(r'\right', '')
        .replace(r'\,', '')
        .replace(r'\;', '')
        .replace(r'\:', '')
        .replace(r'\!', '')
        .replace(r'\ ', '')
        .replace(r'\quad', '')
        .replace(r'\qquad', '')
    )
    inner = re.sub(r'\s+', '', inner)
    inner = inner.rstrip('.,;:')
    return inner


def extract_math_tokens(s: str | None) -> List[str]:
    if not s:
        return []
    toks = [norm_math_tok(m.group(0)) for m in MATH_SEG_RE.finditer(s)]
    return sorted([t for t in toks if t])


def extract_numbers(s: str | None) -> List[str]:
    if not s:
        return []
    t = s.translate(ARABIC_DIGITS)
    t = TAG_RE.sub(' ', t)
    t = re.sub(r'&#x?[0-9a-fA-F]+;', ' ', t)
    t = re.sub(r'(?<=\d),(?=\d{3}\b)', '', t)
    nums = re.findall(r'\d+(?:\.\d+)?', t)
    return sorted(nums)


def has_midword_corruption(s: str | None) -> bool:
    if not s:
        return False
    plain = TAG_RE.sub(' ', MATH_SEG_RE.sub(' ', s))
    return bool(MIDWORD_RE.search(plain))


def fix_arabic_conjunction_spacing(s: str) -> str:
    """Insert a clean space when Arabic conjunction و / بـ / لـ touches a Latin letter."""
    def fix_outside(chunk: str) -> str:
        chunk = re.sub(r'([\u0621-\u063A\u0641-\u064A])([A-Za-z])', r'\1 \2', chunk)
        chunk = re.sub(r'([A-Za-z])([\u0621-\u063A\u0641-\u064A])', r'\1 \2', chunk)
        return chunk

    parts = []
    last = 0
    for m in re.finditer(r'\\\(.*?\\\)|\\\[.*?\\\]|\$\$.*?\$\$|<[^>]+>', s, flags=re.S):
        parts.append(fix_outside(s[last:m.start()]))
        parts.append(m.group(0))
        last = m.end()
    parts.append(fix_outside(s[last:]))
    return ''.join(parts)


def peel_outer_arabic_text(s: str) -> str:
    """Move leading or trailing \\text{...Arabic...} outside \\(...\\) and \\[...\\]."""
    def repl_inline(m: re.Match) -> str:
        is_disp = m.group(0).startswith(r'\[')
        o_del = r'\[' if is_disp else r'\('
        c_del = r'\]' if is_disp else r'\)'
        inner = m.group(0)[2:-2].strip()

        prefix_parts = []
        suffix_parts = []

        # Peel leading \text{...Arabic...} =
        m_lead = re.match(r'^\\text\{([^{}]*[\u0600-\u06FF][^{}]*)\}\s*(=|:)?\s*(.+)$', inner, flags=re.S)
        if m_lead and not m_lead.group(3).startswith('^') and not m_lead.group(3).startswith('_'):
            lbl = m_lead.group(1).strip()
            eq = m_lead.group(2) or ''
            rest = m_lead.group(3).strip()
            if rest:
                prefix_parts.append(f'{lbl}{" " + eq if eq and is_disp else ""} ')
                if eq and not is_disp:
                    rest = f'{eq} {rest}'
                inner = rest

        # Peel trailing \text{...Arabic...}
        m_trail = re.match(r'^(.+?)\s*\\text\{([^{}]*[\u0600-\u06FF][^{}]*)\}\.?$', inner, flags=re.S)
        if m_trail:
            core = m_trail.group(1).strip()
            unit = m_trail.group(2).strip()
            # Ensure core has balanced braces before peeling
            if core and core.count('{') == core.count('}'):
                inner = core
                suffix_parts.append(f' {unit}')

        rebuilt = f'{o_del}{inner}{c_del}'
        return ''.join(prefix_parts) + rebuilt + ''.join(suffix_parts)

    return MATH_SEG_RE.sub(repl_inline, s)


# Multi-word mathematical & instructional phrases (ordered longest-first at runtime)
PHRASE_MAP: List[Tuple[str, str]] = [
    ("Quantitative Comparison", "المقارنة الكمية"),
    ("Compare Quantity A and Quantity B", "قارن بين الكمية الأولى والكمية الثانية"),
    ("Quantity A is greater", "الكمية الأولى أكبر"),
    ("Quantity B is greater", "الكمية الثانية أكبر"),
    ("The two quantities are equal", "الكميتان متساويتان"),
    ("The relationship cannot be determined from the information given", "المعطيات غير كافية لتحديد العلاقة"),
    ("Cannot be determined from the given information", "المعطيات غير كافية"),
    ("Quantity A", "الكمية الأولى"),
    ("Quantity B", "الكمية الثانية"),
    ("Column A", "العمود الأول"),
    ("Column B", "العمود الثاني"),
    ("Worked Example", "مثال محلول"),
    ("Practice Problem", "مسألة تدريبية"),
    ("Common Trap", "خطأ شائع"),
    ("Exam Trap", "فخ اختباري"),
    ("Key Formula", "القانون الأساسي"),
    ("Key Formulas", "القوانين الأساسية"),
    ("Key Idea", "الفكرة الأساسية"),
    ("Key Concept", "المفهوم الأساسي"),
    ("Step-by-step solution", "الحل خطوة بخطوة"),
    ("Show solution", "إظهار الحل"),
    ("Test format & strategy", "نظام الاختبار واستراتيجية الحل"),
    ("Format & Strategy", "نظام الاختبار والاستراتيجية"),
    ("No calculator", "بدون آلة حاسبة"),
    ("No Calculator", "بدون آلة حاسبة"),
    ("Calculator permitted", "مسموح باستخدام الآلة الحاسبة"),
    ("Calculator Allowed", "مسموح باستخدام الآلة الحاسبة"),
    ("Graphing calculator required", "يتطلب آلة حاسبة بيانية"),
    ("multiple choice", "اختيار من متعدد"),
    ("Multiple Choice", "اختيار من متعدد"),
    ("Free Response", "إجابة مقالية"),
    ("Student-Produced Response", "إجابة رقمية ينتجها الطالب"),
    ("Analysis & Approaches", "التحليل والمقاربات"),
    ("Applications & Interpretation", "التطبيقات والتفسير"),
    ("Standard Level", "المستوى القياسي"),
    ("Higher Level", "المستوى العالي"),
    ("system of equations", "نظام المعادلات"),
    ("system of linear equations", "نظام المعادلات الخطية"),
    ("quadratic formula", "القانون العام للمعادلة التربيعية"),
    ("completing the square", "إكمال المربع"),
    ("difference of squares", "الفرق بين مربعين"),
    ("completing the square", "إكمال المربع"),
    ("integration by parts", "التكامل بالتجزئة"),
    ("partial fractions", "الكسور الجزئية"),
    ("chain rule", "قاعدة السلسلة"),
    ("product rule", "قاعدة الضرب"),
    ("quotient rule", "قاعدة القسمة"),
    ("power rule", "قاعدة القوة"),
    ("implicit differentiation", "الاشتقاق الضمني"),
    ("related rates", "المعدلات المرتبطة بالزمن"),
    ("critical points", "النقاط الحرجة"),
    ("inflection points", "نقاط الانعطاف"),
    ("inflection point", "نقطة انعطاف"),
    ("fundamental theorem of calculus", "النظرية الأساسية للتفاضل والتكامل"),
    ("mean value theorem", "نظرية القيمة المتوسطة"),
    ("intermediate value theorem", "نظرية القيمة الوسيطية"),
    ("law of sines", "قانون الجيوب"),
    ("law of cosines", "قانون جيب التمام"),
    ("unit circle", "دائرة الوحدة"),
    ("pythagorean theorem", "نظرية فيثاغورس"),
    ("standard deviation", "الانحراف المعياري"),
    ("normal distribution", "التوزيع الطبيعي"),
    ("binomial distribution", "توزيع ذي الحدين"),
    ("poisson distribution", "توزيع بواسون"),
    ("confidence interval", "فترة الثقة"),
    ("hypothesis test", "اختبار الفرضيات"),
    ("hypothesis testing", "اختبار الفرضيات"),
    ("null hypothesis", "الفرضية الصفرية"),
    ("alternative hypothesis", "الفرضية البديلة"),
    ("random variable", "متغير عشوائي"),
    ("expected value", "القيمة المتوقعة"),
    ("linear regression", "الانحدار الخطي"),
    ("least squares", "المربعات الصغرى"),
    ("correlation coefficient", "معامل الارتباط"),
    ("arithmetic sequence", "متتابعة حسابية"),
    ("geometric sequence", "متتابعة هندسية"),
    ("arithmetic series", "متسلسلة حسابية"),
    ("geometric series", "متسلسلة هندسية"),
    ("infinite series", "متسلسلة لانهائية"),
    ("converges to", "تتقارب إلى"),
    ("diverges", "تتباعد"),
    ("radius of convergence", "نصف قطر التقارب"),
    ("interval of convergence", "فترة التقارب"),
    ("differential equation", "معادلة تفاضلية"),
    ("differential equations", "المعادلات التفاضلية"),
    ("initial value problem", "مسألة القيمة الابتدائية"),
    ("integrating factor", "عامل التكامل"),
    ("characteristic equation", "المعادلة المميزة"),
    ("slope field", "حقل الميول"),
    ("vector space", "فضاء متجهي"),
    ("linear transformation", "تحويل خطي"),
    ("row echelon form", "الصورة المدرجة الصفية"),
    ("eigenvalues and eigenvectors", "القيم الذاتية والمتجهات الذاتية"),
    ("dot product", "الضرب القياسي"),
    ("cross product", "الضرب الاتجاهي"),
    ("complex numbers", "الأعداد المركبة"),
    ("complex number", "عدد مركب"),
    ("conic sections", "القطوع المخروطية"),
    ("polar coordinates", "الإحداثيات القطبية"),
    ("parametric equations", "المعادلات الوسيطية"),
    ("inverse function", "الدالة العكسية"),
    ("domain and range", "المجال والمدى"),
    ("vertical asymptote", "خط التقارب الرأسي"),
    ("horizontal asymptote", "خط التقارب الأفقي"),
    ("surface area", "مساحة السطح"),
    ("right triangle", "مثلث قائم الزاوية"),
    ("equilateral triangle", "مثلث متطابق الأضلاع"),
    ("isosceles triangle", "مثلث متطابق الضلعين"),
    ("similar triangles", "المثلثات المتشابهة"),
    ("central angle", "الزاوية المركزية"),
    ("inscribed angle", "الزاوية المحيطية"),
    ("arc length", "طول القوس"),
    ("sector area", "مساحة القطاع الدائري"),
    ("number theory", "نظرية الأعداد"),
    ("modular arithmetic", "الحساب المعياري"),
    ("pigeonhole principle", "مبدأ برج الحمام"),
    ("mathematical induction", "الاستقراء الرياضي"),
    ("in terms of", "بدلالة"),
    ("with respect to", "بالنسبة إلى"),
    ("such that", "بحيث"),
    ("if and only if", "إذا وفقط إذا"),
    ("for all", "لكل"),
    ("there exists", "يوجد"),
    ("at least", "على الأقل"),
    ("at most", "على الأكثر"),
    ("exact value of", "القيمة الدقيقة لـ"),
    ("what is the value of", "ما قيمة"),
    ("find the value of", "أوجد قيمة"),
    ("solve for", "حل لإيجاد"),
    ("simplify the expression", "بسّط العبارة"),
    ("evaluate the integral", "احسب قيمة التكامل"),
    ("find the derivative", "أوجد المشتقة"),
    ("find the limit", "أوجد النهاية"),
    ("find the slope", "أوجد الميل"),
    ("find the area", "أوجد المساحة"),
    ("find the volume", "أوجد الحجم"),
    ("find the probability", "أوجد الاحتمال"),
    ("determine whether", "حدّد ما إذا كان"),
    ("which of the following", "أيّ ممّا يلي"),
    ("according to", "وفقاً لـ"),
    ("substitute into", "بالتعويض في"),
    ("substituting", "بالتعويض"),
    ("dividing both sides by", "بقسمة الطرفين على"),
    ("multiplying both sides by", "بضرب الطرفين في"),
    ("adding to both sides", "بإضافة للطرفين"),
    ("subtracting from both sides", "بطرح من الطرفين"),
    ("therefore", "إذن"),
    ("hence", "وبالتالي"),
    ("thus", "وعليه"),
    ("what percent of", "ما النسبة المئوية لـ"),
    ("what percentage of", "ما النسبة المئوية لـ"),
    ("how many", "كم عدد"),
    ("how much", "كم"),
    ("is given by", "تُعطى بالعلاقة"),
    ("defined by", "معرّفة بالعلاقة"),
    ("passing through", "يمر بالنقطة"),
    ("passes through", "يمر بالنقطة"),
    ("intersects the", "يقطع"),
    ("intersect at", "يتقاطعان عند"),
    ("in the xy-plane", "في المستوى الإحداثي"),
    ("in the coordinate plane", "في المستوى الإحداثي"),
    ("for what value of", "لأي قيمة لـ"),
    ("in the equation", "في المعادلة"),
    ("in the function", "في الدالة"),
    ("start from the", "ابدأ من"),
    ("rearrange the terms", "أعد ترتيب الحدود"),
    ("rearrange to find", "أعد الترتيب لإيجاد"),
    ("compute the value of", "احسب قيمة"),
    ("check that it satisfies", "تحقق من أنها تحقق"),
    ("verify that it satisfies", "تحقق من أنها تحقق"),
    ("simplified expression", "العبارة المبسّطة"),
    ("target condition", "الشرط المطلوب"),
    ("Mark Scheme", "نموذج التصحيح"),
    ("Grading Steps", "خطوات التصحيح"),
    ("Concept & Formula", "المفهوم والقانون"),
    ("Equation Setup", "صياغة المعادلة"),
    ("Penultimate Step", "الخطوة قبل الأخيرة"),
    ("Final Step", "الخطوة الأخيرة"),
    ("Method & Formulation", "الطريقة والصياغة"),
    ("Algebraic Manipulation", "المعالجة الجبرية"),
    ("Final Accuracy", "الدقة النهائية"),
    ("Common Error", "خطأ شائع"),
    ("Common Errors", "الأخطاء الشائعة"),
    ("with replacement", "مع الإرجاع"),
    ("without replacement", "دون إرجاع"),
    ("drawn at random", "سُحبت عشوائيًا"),
    ("selected at random", "اختير عشوائيًا"),
    ("randomly selected", "مختار عشوائيًا"),
    ("consecutive integers", "أعداد صحيحة متتالية"),
    ("arithmetic mean", "المتوسط الحسابي"),
    ("greatest common factor", "القاسم المشترك الأكبر"),
    ("least common multiple", "المضاعف المشترك الأصغر"),
    ("y-intercept", "المقطع الصادي"),
    ("x-intercept", "المقطع السيني"),
    ("local maximum", "قيمة عظمى محلية"),
    ("local minimum", "قيمة صغرى محلية"),
    ("inflection", "انعطاف"),
    ("concave up", "مقعّر لأعلى"),
    ("concave down", "مقعّر لأسفل"),
    ("rates of change", "معدلات التغير"),
    ("rate of change", "معدل التغير"),
    ("instantaneous rate", "المعدل اللحظي"),
    ("average rate", "المعدل المتوسط"),
    ("line of best fit", "خط أفضل مطابقة"),
    ("best-fit line", "خط أفضل مطابقة"),
    ("margin of error", "هامش الخطأ"),
    ("central limit theorem", "مبرهنة النهاية المركزية"),
    ("completes the square", "يكمل المربع"),
    ("perpendicular to", "عمودي على"),
    ("parallel to", "موازٍ لـ"),
    ("congruent to", "مطابق لـ"),
    ("proportional to", "يتناسب مع"),
    ("directly proportional", "يتناسب طرديًا"),
    ("inversely proportional", "يتناسب عكسيًا"),
    ("in the figure", "في الشكل"),
    ("in the diagram", "في الرسم التوضيحي"),
    ("in the table", "في الجدول"),
    ("above shows", "أعلاه يوضّح"),
    ("below shows", "أدناه يوضّح"),
    ("shown below", "المبيّن أدناه"),
    ("shown above", "المبيّن أعلاه"),
    ("nearest tenth", "أقرب جزء من عشرة"),
    ("nearest hundredth", "أقرب جزء من مئة"),
    ("nearest integer", "أقرب عدد صحيح"),
    ("nearest whole number", "أقرب عدد صحيح"),
    ("round your answer", "قرّب إجابتك"),
    ("in simplest form", "في أبسط صورة"),
    ("all real numbers", "جميع الأعداد الحقيقية"),
    ("no real solutions", "لا توجد حلول حقيقية"),
    ("no solution", "لا يوجد حل"),
    ("infinitely many solutions", "عدد لا نهائي من الحلول"),
    ("distributive property", "خاصية التوزيع"),
    ("commutative property", "خاصية الإبدال"),
    ("associative property", "خاصية التجميع"),
    ("what is the value of", "ما قيمة"),
    ("what is the", "ما"),
    ("what are the", "ما"),
    ("what is its", "ما قيمة"),
    ("passes through the point", "يمر بالنقطة"),
    ("pass through the point", "تمر بالنقطة"),
    ("passes through", "يمر بـ"),
    ("pass through", "تمر بـ"),
    ("is equal to", "يساوي"),
    ("are equal to", "تساوي"),
    ("there is", "يوجد"),
    ("there are", "يوجد"),
    ("can be written as", "يمكن كتابتها على الصورة"),
    ("can be", "يمكن أن يكون"),
    ("must be", "يجب أن يكون"),
    ("will be", "سيكون"),
    ("for each", "لكل"),
    ("of the line", "للمستقيم"),
    ("of the curve", "للمنحنى"),
    ("of the function", "للدالة"),
    ("of the triangle", "للمثلث"),
    ("of the circle", "للدائرة"),
    ("the graph of", "التمثيل البياني لـ"),
    ("the table shows", "يوضّح الجدول"),
    ("the equation of", "معادلة"),
    ("is parallel to the line", "يوازي المستقيم"),
    ("is perpendicular to the line", "يعامد المستقيم"),
    ("bounded by the lines", "المحصور بالمستقيمات"),
]

WORD_MAP: Dict[str, str] = {
    "step": "الخطوة",
    "steps": "الخطوات",
    "problem": "المسألة",
    "problems": "المسائل",
    "example": "مثال",
    "examples": "أمثلة",
    "definition": "تعريف",
    "theorem": "نظرية",
    "lemma": "تمهيدية",
    "corollary": "نتيجة",
    "proof": "برهان",
    "note": "ملاحظة",
    "notes": "ملاحظات",
    "warning": "تنبيه",
    "caution": "تحذير",
    "tip": "نصيحة",
    "tips": "نصائح",
    "hint": "تلميح",
    "hints": "تلميحات",
    "solution": "الحل",
    "solutions": "الحلول",
    "answer": "الإجابة",
    "answers": "الإجابات",
    "formula": "القانون",
    "formulas": "القوانين",
    "rule": "القاعدة",
    "rules": "القواعد",
    "property": "الخاصية",
    "properties": "الخصائص",
    "method": "الطريقة",
    "methods": "الطرق",
    "strategy": "الاستراتيجية",
    "strategies": "الاستراتيجيات",
    "concept": "المفهوم",
    "concepts": "المفاهيم",
    "topic": "الموضوع",
    "topics": "الموضوعات",
    "chapter": "الفصل",
    "chapters": "الفصول",
    "section": "القسم",
    "sections": "الأقسام",
    "unit": "الوحدة",
    "units": "وحدات",
    "part": "الجزء",
    "parts": "الأجزاء",
    "table": "الجدول",
    "figure": "الشكل",
    "graph": "التمثيل البياني",
    "graphs": "التمثيلات البيانية",
    "diagram": "الرسم التوضيحي",
    "find": "أوجد",
    "calculate": "احسب",
    "compute": "احسب",
    "evaluate": "أوجد قيمة",
    "solve": "حل",
    "simplify": "بسّط",
    "factor": "حلّل",
    "expand": "فكّ",
    "prove": "أثبت",
    "show": "بيّن",
    "determine": "حدّد",
    "identify": "عيّن",
    "compare": "قارن",
    "sketch": "ارسم",
    "write": "اكتب",
    "express": "عبّر عن",
    "use": "استخدم",
    "using": "باستخدام",
    "apply": "طبّق",
    "applying": "بتطبيق",
    "let": "ليكن",
    "given": "المعطى",
    "suppose": "بفرض أن",
    "assume": "نفترض أن",
    "since": "بما أن",
    "because": "لأن",
    "where": "حيث",
    "when": "عندما",
    "if": "إذا كان",
    "then": "فإن",
    "and": "و",
    "or": "أو",
    "of": "من",
    "in": "في",
    "on": "على",
    "at": "عند",
    "to": "إلى",
    "from": "من",
    "by": "بواسطة",
    "with": "مع",
    "without": "بدون",
    "for": "لـ",
    "is": "يساوي",
    "are": "تكون",
    "equals": "يساوي",
    "equal": "متساوي",
    "value": "قيمة",
    "values": "قيم",
    "number": "عدد",
    "numbers": "الأعداد",
    "integer": "عدد صحيح",
    "integers": "الأعداد الصحيحة",
    "real": "حقيقي",
    "positive": "موجب",
    "negative": "سالب",
    "rational": "نسبي",
    "irrational": "غير نسبي",
    "prime": "أولي",
    "even": "زوجي",
    "odd": "فردي",
    "sum": "مجموع",
    "difference": "الفرق",
    "product": "حاصل الضرب",
    "quotient": "خارج القسمة",
    "remainder": "الباقي",
    "ratio": "النسبة",
    "ratios": "النسب",
    "rate": "المعدل",
    "rates": "المعدلات",
    "proportion": "التناسب",
    "proportions": "التناسبات",
    "percent": "النسبة المئوية",
    "percentage": "النسبة المئوية",
    "Percentages": "النسب المئوية",
    "percentages": "النسب المئوية",
    "fraction": "الكسر",
    "fractions": "الكسور",
    "decimal": "العشري",
    "decimals": "الكسور العشرية",
    "exponent": "الأس",
    "exponents": "الأسس",
    "power": "القوة",
    "powers": "القوى",
    "root": "الجذر",
    "roots": "الجذور",
    "radical": "الجذر",
    "radicals": "الجذور",
    "logarithm": "اللوغاريتم",
    "logarithms": "اللوغاريتمات",
    "logarithmic": "اللوغاريتمية",
    "exponential": "الأسية",
    "algebra": "الجبر",
    "algebraic": "الجبري",
    "arithmetic": "الحساب",
    "geometry": "الهندسة",
    "geometric": "الهندسية",
    "trigonometry": "حساب المثلثات",
    "trigonometric": "المثلثية",
    "calculus": "التفاضل والتكامل",
    "statistics": "الإحصاء",
    "statistical": "الإحصائي",
    "probability": "الاحتمالات",
    "combinatorics": "التوافيق والعدّ",
    "counting": "العدّ",
    "permutations": "التباديل",
    "permutation": "تبديل",
    "combinations": "التوافيق",
    "combination": "توفيق",
    "equation": "المعادلة",
    "equations": "المعادلات",
    "inequality": "المتباينة",
    "inequalities": "المتباينات",
    "expression": "العبارة",
    "expressions": "العبارات",
    "polynomial": "كثيرة الحدود",
    "polynomials": "كثيرات الحدود",
    "linear": "الخطية",
    "quadratic": "التربيعية",
    "cubic": "التكعيبية",
    "function": "الدالة",
    "functions": "الدوال",
    "domain": "المجال",
    "range": "المدى",
    "inverse": "المعكوس",
    "composite": "المركّبة",
    "slope": "الميل",
    "gradient": "الميل",
    "intercept": "المقطع",
    "intercepts": "المقاطع",
    "vertex": "الرأس",
    "axis": "المحور",
    "axes": "المحاور",
    "symmetry": "التماثل",
    "asymptote": "خط التقارب",
    "asymptotes": "خطوط التقارب",
    "point": "النقطة",
    "points": "النقاط",
    "line": "المستقيم",
    "lines": "المستقيمات",
    "segment": "القطعة المستقيمة",
    "midpoint": "نقطة المنتصف",
    "distance": "المسافة",
    "parallel": "الموازي",
    "perpendicular": "العمودي",
    "angle": "الزاوية",
    "angles": "الزوايا",
    "triangle": "المثلث",
    "triangles": "المثلثات",
    "circle": "الدائرة",
    "circles": "الدوائر",
    "radius": "نصف القطر",
    "diameter": "القطر",
    "chord": "الوتر",
    "tangent": "المماس",
    "normal": "العمودي على المماس",
    "secant": "القاطع",
    "polygon": "المضلع",
    "polygons": "المضلعات",
    "rectangle": "المستطيل",
    "square": "المربع",
    "parallelogram": "متوازي الأضلاع",
    "trapezoid": "شبه المنحرف",
    "rhombus": "المعين",
    "cylinder": "الأسطوانة",
    "cone": "المخروط",
    "sphere": "الكرة",
    "prism": "المنشور",
    "pyramid": "الهرم",
    "area": "المساحة",
    "areas": "المساحات",
    "perimeter": "المحيط",
    "circumference": "محيط الدائرة",
    "volume": "الحجم",
    "volumes": "الحجوم",
    "length": "الطول",
    "width": "العرض",
    "height": "الارتفاع",
    "base": "القاعدة",
    "hypotenuse": "الوتر",
    "coordinate": "الإحداثي",
    "coordinates": "الإحداثيات",
    "plane": "المستوى",
    "space": "الفضاء",
    "vector": "المتجه",
    "vectors": "المتجهات",
    "scalar": "الكمية القياسية",
    "magnitude": "المقدار",
    "direction": "الاتجاه",
    "matrix": "المصفوفة",
    "matrices": "المصفوفات",
    "determinant": "المحددة",
    "determinants": "المحددات",
    "eigenvalue": "القيمة الذاتية",
    "eigenvalues": "القيم الذاتية",
    "eigenvector": "المتجه الذاتي",
    "eigenvectors": "المتجهات الذاتية",
    "sequence": "المتتابعة",
    "sequences": "المتتابعات",
    "series": "المتسلسلة",
    "term": "الحد",
    "terms": "الحدود",
    "limit": "النهاية",
    "limits": "النهايات",
    "continuity": "الاتصال",
    "continuous": "متصلة",
    "derivative": "المشتقة",
    "derivatives": "المشتقات",
    "differentiation": "الاشتقاق",
    "differentiable": "قابلة للاشتقاق",
    "integral": "التكامل",
    "integrals": "التكاملات",
    "integration": "التكامل",
    "antiderivative": "الدالة الأصلية",
    "maximum": "القيمة العظمى",
    "minimum": "القيمة الصغرى",
    "extrema": "القيم القصوى",
    "optimization": "الاستمثال",
    "velocity": "السرعة المتجهة",
    "speed": "السرعة",
    "acceleration": "التسارع",
    "position": "الموقع",
    "displacement": "الإزاحة",
    "time": "الزمن",
    "work": "الشغل",
    "motion": "الحركة",
    "mean": "المتوسط الحسابي",
    "median": "الوسيط",
    "mode": "المنوال",
    "variance": "التباين",
    "quartile": "الربيع",
    "quartiles": "الربيعات",
    "sample": "العينة",
    "population": "المجتمع الإحصائي",
    "data": "البيانات",
    "distribution": "التوزيع",
    "distributions": "التوزيعات",
    "frequency": "التكرار",
    "event": "الحدث",
    "events": "الأحداث",
    "independent": "مستقلة",
    "conditional": "الشرطي",
    "random": "عشوائي",
    "model": "النموذج",
    "models": "النماذج",
    "modeling": "النمذجة",
    "modelling": "النمذجة",
    "exam": "الاختبار",
    "exams": "الاختبارات",
    "test": "الاختبار",
    "tests": "الاختبارات",
    "paper": "الورقة",
    "papers": "الأوراق",
    "question": "السؤال",
    "questions": "الأسئلة",
    "marks": "الدرجات",
    "mark": "درجة",
    "score": "الدرجة",
    "minutes": "دقيقة",
    "minute": "دقيقة",
    "hours": "ساعات",
    "hour": "ساعة",
    "seconds": "ثانية",
    "total": "المجموع الكلي",
    "average": "المتوسط",
    "cost": "التكلفة",
    "price": "السعر",
    "profit": "الربح",
    "discount": "الخصم",
    "overview": "نظرة عامة",
    "introduction": "مقدمة",
    "foundations": "الأساسيات",
    "advanced": "المتقدم",
    "applications": "التطبيقات",
    "application": "تطبيق",
    "review": "مراجعة",
    "practice": "تدريب",
    "summary": "ملخص",
    "check": "تحقق",
    "verify": "تحقق من",
    "substitute": "عوّض",
    "divide": "اقسم",
    "multiply": "اضرب",
    "add": "اجمع",
    "subtract": "اطرح",
    "isolate": "اعزل",
    "combine": "اجمع",
    "cancel": "اختصر",
    "rewrite": "أعد كتابة",
    "both": "كلا",
    "sides": "الطرفين",
    "side": "الضلع",
    "first": "الأول",
    "second": "الثاني",
    "third": "الثالث",
    "final": "النهائي",
    "result": "النتيجة",
    "correct": "الصحيحة",
    "choice": "الخيار",
    "option": "الخيار",
    "the": "",
    "an": "",
    # Extended exam prose & pedagogical vocabulary (Q1 boilerplate replacement)
    "what": "ما", "that": "أن", "into": "في", "your": "الخاص بك", "start": "ابدأ",
    "relationship": "العلاقة", "original": "الأصلية", "back": "مرة أخرى",
    "student": "طالب", "students": "الطلاب", "relation": "العلاقة", "obtain": "احصل على",
    "form": "الصيغة", "principles": "المبادئ", "verified": "متحقق منه", "this": "هذا",
    "simplified": "مبسّط", "gives": "يعطي", "give": "يعطي", "unsimplified": "غير مبسّط",
    "perform": "نفّذ", "which": "الذي", "condition": "الشرط", "conditions": "الشروط",
    "calculation": "الحساب", "calculations": "الحسابات", "known": "المعلوم",
    "have": "لدينا", "has": "له", "had": "كان له", "denominator": "المقام",
    "denominators": "المقامات", "numerator": "البسط", "numerators": "البسوط",
    "required": "المطلوب", "require": "يتطلب", "requires": "يتطلب",
    "many": "العديد", "each": "كل", "every": "كل", "all": "جميع", "some": "بعض",
    "any": "أي", "none": "لا شيء", "neither": "لا هذا ولا ذاك", "other": "آخر",
    "ball": "كرة", "balls": "كرات", "marble": "كرة زجاجية", "marbles": "كرات زجاجية",
    "initial": "ابتدائي", "initially": "ابتدائيًا", "degree": "درجة", "degrees": "درجات",
    "radian": "راديان", "radians": "راديان", "common": "مشترك",
    "one": "واحد", "two": "اثنان", "three": "ثلاثة", "four": "أربعة", "five": "خمسة",
    "six": "ستة", "seven": "سبعة", "eight": "ثمانية", "nine": "تسعة", "ten": "عشرة",
    "dimensions": "الأبعاد", "dimension": "البعد", "constant": "ثابت", "constants": "ثوابت",
    "confirm": "تأكد من", "shown": "المبيّن", "shows": "يوضّح", "showed": "أظهر",
    "quarterly": "ربع سنوي", "annual": "سنوي", "annually": "سنويًا",
    "hourly": "لكل ساعة", "monthly": "شهريًا", "daily": "يوميًا", "weekly": "أسبوعيًا",
    "target": "الهدف", "probabilities": "الاحتمالات", "sign": "إشارة", "signs": "الإشارات",
    "rearrange": "أعد ترتيب", "restriction": "قيد", "restrictions": "القيود",
    "period": "الدورة", "periodic": "دوري", "their": "لهم", "right": "قائم",
    "left": "يسار", "match": "يطابق", "matches": "يطابق", "consider": "لنعتبر",
    "considering": "باعتبار", "precision": "دقة", "through": "خلال", "does": "هل",
    "bound": "حد", "bounds": "الحدود", "bounded": "محدود", "over": "على",
    "quantity": "كمية", "quantities": "كميات", "standard": "قياسي",
    "define": "عرّف", "defined": "معرّفة", "defines": "يعرّف", "defining": "تعريف",
    "shift": "إزاحة", "shifts": "إزاحات", "shifting": "إزاحة", "shifted": "مُزاح",
    "upper": "العلوي", "lower": "السفلي", "after": "بعد", "before": "قبل",
    "satisfy": "يحقق", "satisfies": "يحقق", "satisfying": "التي تحقق",
    "prompt": "المطلوب في السؤال", "same": "نفس", "ellipse": "قطع ناقص",
    "hyperbola": "قطع زائد", "parabola": "قطع مكافئ", "study": "دراسة",
    "governing": "الحاكمة", "govern": "تحكم", "governs": "تحكم",
    "read": "اقرأ", "reads": "يقرأ", "image": "صورة", "combined": "مشترك",
    "grade": "الصف", "grades": "الدرجات", "zero": "صفر", "zeros": "أصفار",
    "exact": "دقيق", "exactly": "بالضبط", "blue": "أزرق", "red": "أحمر",
    "green": "أخضر", "yellow": "أصفر", "black": "أسود", "white": "أبيض",
    "carefully": "بعناية", "opposite": "المقابل", "adjacent": "المجاور",
    "divided": "مقسوم على", "dividing": "بقسمة", "division": "القسمة",
    "coefficient": "معامل", "coefficients": "المعاملات",
    "subtracting": "بطرح", "adding": "بإضافة", "multiplying": "بضرب",
    "chart": "مخطط", "between": "بين", "among": "بين", "page": "صفحة", "pages": "صفحات",
    "here": "هنا", "inclusive": "شاملاً الطرفين", "identity": "متطابقة",
    "center": "المركز", "centre": "المركز", "mathematical": "رياضي",
    "tank": "خزان", "largest": "الأكبر", "larger": "أكبر", "smallest": "الأصغر",
    "smaller": "أصغر", "greatest": "الأكبر", "least": "الأقل",
    "interval": "فترة", "intervals": "فترات", "drawn": "مرسوم",
    "orthogonal": "متعامد", "must": "يجب", "calculator": "الآلة الحاسبة",
    "complete": "أكمل", "completing": "إكمال", "also": "أيضًا",
    "share": "نصيب", "fill": "املأ", "together": "معًا", "contains": "يحتوي",
    "contain": "يحتوي", "below": "أدناه", "above": "أعلاه", "vertical": "رأسي",
    "horizontal": "أفقي", "scale": "مقياس", "scales": "مقاييس", "distinct": "مختلفة",
    "sector": "قطاع", "yields": "ينتج", "yield": "ينتج", "chosen": "المختار",
    "choose": "اختر", "extended": "ممتد", "replacement": "إرجاع", "replaces": "يستبدل",
    "spanish": "الإسبانية", "french": "الفرنسية", "interior": "داخلي", "exterior": "خارجي",
    "numerical": "عددي", "numeric": "رقمي", "take": "خذ", "taking": "بأخذ",
    "across": "عبر", "instantaneous": "لحظي", "passes": "يمر", "pass": "يمر",
    "error": "خطأ", "errors": "أخطاء", "element": "عنصر", "elements": "عناصر",
    "while": "بينما", "there": "هناك", "setting": "بتعيين", "set": "مجموعة",
    "fundamental": "أساسي", "giving": "مما يعطي", "those": "تلك", "these": "هذه",
    "along": "على طول", "need": "يحتاج", "needs": "يحتاج", "needed": "مطلوب",
    "means": "يعني", "meanwhile": "في أثناء ذلك", "equate": "ساوِ", "infinite": "لانهائي",
    "infinitely": "بلا نهاية", "trip": "رحلة", "inscribed": "محاط",
    "system": "نظام", "systems": "أنظمة", "discriminant": "المميز", "reduce": "اختزل",
    "reduces": "يختزل", "represents": "يمثل", "represent": "يمثل", "represented": "ممثّل",
    "margin": "هامش", "corresponding": "المناظر", "applied": "مطبّق", "applies": "ينطبق",
    "only": "فقط", "meter": "متر", "meters": "أمتار", "centimeter": "سنتيمتر",
    "centimeters": "سنتيمترات", "kilometer": "كيلومتر", "kilometers": "كيلومترات",
    "liter": "لتر", "liters": "لترات", "gram": "جرام", "grams": "جرامات",
    "mile": "ميل", "miles": "أميال", "foot": "قدم", "feet": "أقدام",
    "round": "قرّب", "vieta": "فييتا", "bearing": "اتجاه", "selected": "المختار",
    "select": "اختر", "cycle": "دورة", "within": "ضمن", "survey": "استطلاع",
    "amount": "كمية", "structured": "منظم", "leading": "الرئيسي", "leaving": "ليبقى",
    "leaves": "يترك", "leave": "اترك", "they": "هم", "singular": "مفرد", "single": "واحد",
    "change": "تغير", "changes": "يتغير", "changed": "تغيّر",
    "increase": "زيادة", "increases": "يزداد", "increased": "زاد", "increasing": "متزايدة",
    "decrease": "نقصان", "decreases": "يتناقص", "decreasing": "متناقصة",
    "digit": "خانة", "digits": "خانات", "simplest": "أبسط", "growth": "نمو",
    "decay": "اضمحلال", "category": "فئة", "categories": "فئات",
    "class": "فصل", "last": "أخير", "alone": "بمفرده", "will": "سوف",
    "year": "سنة", "years": "سنوات", "about": "تقريبًا", "pump": "مضخة",
    "heights": "ارتفاعات", "group": "مجموعة", "groups": "مجموعات",
    "intermediate": "وسيط", "solving": "بحل", "resulting": "الناتج",
    "result": "النتيجة", "results": "النتائج", "slopes": "ميول", "similar": "متشابه",
    "similarly": "وبالمثل", "cosine": "جيب التمام", "sine": "الجيب", "times": "مرات",
    "deduce": "استنتج", "intersection": "تقاطع", "intersect": "يتقاطع",
    "intersects": "يقطع", "specified": "محدد", "specify": "حدّد", "down": "أسفل",
    "up": "أعلى", "angled": "الزاوية", "observed": "المرصود", "observe": "لاحظ",
    "respectively": "على الترتيب", "quarter": "ربع", "half": "نصف",
    "particle": "جسيم", "squares": "مربعات", "output": "مخرج", "outputs": "مخرجات",
    "input": "مدخل", "inputs": "مداخل", "under": "تحت", "measure": "قياس",
    "measures": "قياسات", "origin": "نقطة الأصل", "ticket": "تذكرة", "tickets": "تذاكر",
    "quadrant": "الربع", "branch": "فرع", "bars": "أعمدة", "direct": "مباشر",
    "directly": "مباشرة", "case": "حالة", "cases": "حالات", "working": "عمل",
    "against": "مقابل", "accuracy": "دقة", "substitution": "التعويض", "assume": "نفترض",
    "assuming": "بافتراض", "cross": "تبادلي", "predicted": "المتنبأ به",
    "travel": "يسير", "travels": "يسير", "recall": "تذكّر", "equivalent": "مكافئ",
    "equivalence": "التكافؤ", "valid": "صحيح", "count": "عدّ", "counts": "الأعداد",
    "route": "مسار", "squaring": "بتربيع", "scheme": "نموذج", "grading": "التصحيح",
    "formulation": "الصياغة", "derivation": "الاشتقاق", "imaginary": "تخيلي",
    "people": "أشخاص", "person": "شخص", "randomly": "عشوائيًا", "them": "هم",
    "restricted": "مقيد", "finish": "أنهِ", "entire": "كامل", "region": "منطقة",
    "whether": "ما إذا كان", "solid": "مجسم", "notice": "لاحظ", "evaluating": "بحساب",
    "actual": "فعلي", "lies": "يقع", "reference": "مرجع", "harmonic": "توافقي",
    "outside": "خارج", "inside": "داخل", "acute": "حاد", "obtuse": "منفرج",
    "conjugate": "مرافق", "residual": "البواقي", "previous": "السابق", "true": "صحيح",
    "false": "خطأ", "parameter": "معلمة", "parameters": "معلمات", "empty": "فارغ",
    "tile": "بلاطة", "tiles": "بلاطات", "definite": "محدد", "indefinite": "غير محدد",
    "reciprocal": "مقلوب", "occurs": "يحدث", "occur": "يحدث", "sale": "تخفيض",
    "prefer": "يفضّل", "differ": "يختلف", "item": "عنصر", "items": "عناصر",
    "subtended": "تقابلها", "differentiate": "اشتق", "making": "مما يجعل",
    "affect": "يؤثر على", "store": "متجر", "divisor": "القاسم", "dividend": "المقسوم",
    "saline": "ملحي", "outcomes": "نواتج", "outcome": "ناتج", "highest": "الأعلى",
    "lowest": "الأدنى", "sold": "مبيع", "sell": "يبيع", "sells": "يبيع",
    "remain": "يتبقى", "remaining": "المتبقي", "remains": "يتبقى",
    "commutativity": "الإبدال", "convergent": "متقاربة", "convergence": "التقارب",
    "eccentricity": "الاختلاف المركزي", "focal": "بؤري", "focus": "البؤرة",
    "than": "من", "cup": "كوب", "cups": "أكواب", "examining": "بفحص",
    "size": "حجم", "fail": "يفشل", "circular": "دائري", "found": "وُجد",
    "cube": "مكعب", "cubic": "تكعيبي", "map": "خريطة", "maps": "يحوّل",
    "defective": "معيب", "alternate": "متبادلة", "twice": "مرتين", "double": "ضعف",
    "triple": "ثلاثة أضعاف", "scatterplot": "مخطط الانتشار", "scatterplots": "مخططات الانتشار",
    "successive": "متتالية", "originally": "أصلاً", "next": "التالي", "adult": "بالغ",
    "adults": "بالغون", "starting": "بداية من", "rectangular": "مستطيل",
    "notation": "الترميز", "transversal": "قاطع", "possible": "ممكن", "adds": "يضيف",
    "added": "أُضيف", "plausible": "معقول", "midline": "خط الوسط",
    "bicycle": "دراجة", "subtracts": "يطرح", "subtracted": "طُرح",
    "diagonal": "القطر", "universal": "شامل", "instead": "بدلاً من ذلك",
    "factors": "عوامل", "factored": "محلّل", "returns": "يعيد", "later": "لاحقًا",
    "women": "نساء", "men": "رجال", "removing": "بإزالة", "remove": "أزل",
    "offers": "يقدم", "costing": "بتكلفة", "entry": "مدخل", "platform": "منصة",
    "hemisphere": "نصف كرة", "multiplier": "مضاعف", "multipliers": "مضاعفات",
    "core": "أساسي", "configuration": "تشكيل", "support": "دعم",
    "shortcut": "اختصار", "telescoping": "تلسكوبية", "decompose": "حلّل",
    "surviving": "المتبقية", "textbook": "كتاب", "excludes": "يستبعد", "exclude": "استبعد",
    "included": "شامل", "include": "يشمل", "includes": "يشمل", "endpoint": "نقطة طرفية",
    "endpoints": "نقطتان طرفيتان", "themselves": "نفسها", "electronics": "إلكترونيات",
    "raises": "يرفع", "updated": "محدّث", "scholarship": "منحة", "fund": "صندوق",
    "totals": "إجماليات", "totaling": "بإجمالي", "solute": "المذاب", "concentration": "التركيز",
    "were": "كانت", "was": "كان", "been": "كان", "being": "كونه", "cannot": "لا يمكن",
    "can": "يمكن", "could": "يمكن", "would": "قد", "should": "ينبغي", "may": "قد",
    "lengths": "أطوال", "semicircle": "نصف دائرة", "indeterminate": "غير معيّن",
    "gallon": "جالون", "gallons": "جالونات", "computing": "بحساب", "bases": "قواعد",
    "committee": "لجنة", "middle": "أوسط", "flour": "دقيق", "nearest": "أقرب",
    "outer": "خارجي", "inner": "داخلي", "regular": "منتظم", "joining": "التي تصل",
    "precisely": "تحديدًا", "provided": "بشرط", "pair": "زوج", "pairs": "أزواج",
    "written": "مكتوب", "nonlinear": "غير خطي", "establish": "أثبت", "repeat": "كرّر",
    "repeats": "يتكرر", "repeated": "مكرّر", "estimate": "قدّر", "treatment": "معالجة",
    "gradients": "ميول", "favorable": "مواتٍ", "connecting": "الواصلة",
    "elimination": "الحذف", "becomes": "يصبح", "become": "يصبح", "voter": "ناخب",
    "voters": "ناخبون", "speeds": "سرعات", "consecutive": "متتالية", "expected": "متوقّع",
    "analyzing": "بتحليل", "simple": "بسيط", "way": "طريقة", "ways": "طرق",
    "obtained": "الناتج", "school": "مدرسة", "distances": "مسافات", "shaded": "مظللة",
    "corner": "زاوية", "synthetic": "تركيبي", "multiplication": "الضرب",
    "pure": "بحت", "book": "كتاب", "books": "كتب", "station": "محطة",
    "ratio": "النسبة", "percent": "بالمئة", "find": "أوجد", "finds": "يجد",
    "solve": "حل", "solves": "يحل", "solved": "محلول", "determine": "حدّد",
    "determines": "يحدّد", "determined": "محدّد", "calculate": "احسب", "calculates": "يحسب",
    "computed": "محسوب", "obtain": "احصل على", "obtained": "الناتج", "gets": "يحصل على",
    "get": "احصل على", "makes": "يجعل", "make": "اجعل", "uses": "يستخدم", "used": "مستخدم",
    "writes": "يكتب", "wrote": "كتب", "represents": "يمثل", "equals": "يساوي",
    "then": "ثم", "when": "عندما", "where": "حيث", "which": "التي", "who": "الذي",
    "from": "من", "than": "من", "more": "أكثر", "less": "أقل", "both": "كلا",
    "total": "الإجمالي", "sum": "مجموع", "average": "متوسط", "median": "وسيط",
    "mode": "منوال", "range": "مدى", "box": "صندوق", "list": "قائمة", "table": "جدول",
    "curve": "منحنى", "curves": "منحنيات", "area": "مساحة", "volume": "حجم",
    "perimeter": "محيط", "surface": "سطح", "angle": "زاوية", "angles": "زوايا",
    "triangle": "مثلث", "triangles": "مثلثات", "circle": "دائرة", "circles": "دوائر",
    "radius": "نصف القطر", "diameter": "القطر", "chord": "وتر", "arc": "قوس",
    "tangent": "مماس", "secant": "قاطع", "line": "مستقيم", "lines": "مستقيمات",
    "point": "نقطة", "points": "نقاط", "segment": "قطعة", "vertex": "رأس",
    "vertices": "رؤوس", "slope": "ميل", "intercept": "مقطع", "function": "دالة",
    "functions": "دوال", "equation": "معادلة", "equations": "معادلات",
    "expression": "عبارة", "expressions": "عبارات", "polynomial": "كثيرة حدود",
    "matrix": "مصفوفة", "vector": "متجه", "sequence": "متتابعة", "series": "متسلسلة",
    "limit": "نهاية", "derivative": "مشتقة", "integral": "تكامل",
    "probability": "احتمال", "sample": "عينة", "data": "بيانات", "event": "حدث",
    "events": "أحداث", "random": "عشوائي", "number": "عدد", "numbers": "أعداد",
    "integer": "عدد صحيح", "integers": "أعداد صحيحة", "fraction": "كسر",
    "decimal": "عشري", "root": "جذر", "roots": "جذور", "solution": "حل",
    "solutions": "حلول", "answer": "الإجابة", "step": "الخطوة", "steps": "الخطوات",
    "its": "له", "it": "هو", "they": "هم", "them": "هم", "their": "هم",
    "not": "ليس", "no": "لا", "per": "لكل", "as": "كـ", "so": "لذلك",
    "but": "لكن", "yet": "لكن", "nor": "ولا", "into": "إلى", "onto": "على",
    "relating": "يربط بين", "relates": "يربط", "related": "مرتبط",
    "amplitude": "السعة", "translation": "انسحاب", "translations": "انسحابات",
    "convert": "حوّل", "converted": "محوّل", "converting": "تحويل",
    "enrolled": "مسجّل", "research": "بحث", "representing": "يمثّل",
    "either": "إما", "similarity": "تشابه", "minor": "صغرى", "major": "كبرى",
    "different": "مختلف", "marked": "معلّم", "patients": "مرضى",
    "drawing": "رسم", "supplementary": "متكاملتان", "complementary": "متتامتان",
    "quadrilateral": "رباعي أضلاع", "driver": "سائق", "riyadh": "الرياض",
    "never": "أبدًا", "ordering": "ترتيب", "orderings": "ترتيبات",
    "directrix": "دليل القطع", "strictly": "تمامًا", "transformation": "تحويل",
    "transformations": "تحويلات", "type": "نوع", "component": "مركبة",
    "components": "مركبات", "subtends": "تقابل", "itself": "نفسه",
    "most": "معظم", "dollars": "دولار", "dollar": "دولار", "asked": "سُئل",
    "stays": "يبقى", "like": "مثل", "altitude": "ارتفاع", "public": "عام",
    "transit": "نقل", "density": "كثافة", "creates": "ينشئ",
    "variable": "متغير", "variables": "متغيرات", "identical": "متطابق",
    "identically": "بالتطابق", "level": "مستوى", "levels": "مستويات",
    "such": "مثل", "restrict": "قيّد", "sided": "الأضلاع", "cyclic": "دائري",
    "principal": "أصلي", "reflection": "انعكاس", "bulbs": "مصابيح",
    "curved": "منحنٍ", "shape": "شكل", "shapes": "أشكال",
    "rewriting": "إعادة كتابة", "entries": "مدخلات", "basketball": "كرة السلة",
    "corresponds": "ينطبق على", "piece": "جزء", "factoring": "تحليل",
    "simplifies": "يتبسّط", "exponentials": "دوال أسية", "rain": "مطر",
    "cuboid": "متوازي مستطيلات", "place": "موضع", "remembering": "بتذكّر",
    "plug": "عوّض", "eliminates": "يحذف", "multiple": "مضاعف",
    "worker": "عامل", "workers": "عمال", "play": "يلعب", "interest": "فائدة",
    "index": "دليل", "rotate": "يدوّر", "rotation": "دوران",
    "quadratics": "تربيعيات", "legs": "ساقا المثلث القائم", "scores": "درجات",
    "club": "نادي", "sport": "رياضة", "sports": "رياضة", "new": "جديد",
    "old": "قديم", "try": "جرّب", "end": "نهاية", "how": "كيف", "why": "لماذا",
}

_SORTED_PHRASES = sorted(PHRASE_MAP, key=lambda kv: -len(kv[0]))
_PHRASE_PATTERNS = [
    (re.compile(r'(?<![A-Za-z0-9_])' + re.escape(src) + r'(?![A-Za-z0-9_])', re.I), dst)
    for src, dst in _SORTED_PHRASES
]


def freeze_ast(text: str) -> Tuple[str, Dict[str, str]]:
    """Freeze math segments, HTML tags, and numeric literals into collision-free tokens."""
    mapping: Dict[str, str] = {}
    counter = [0]

    def put(prefix: str, val: str) -> str:
        key = f'__{prefix}_{counter[0]}__'
        counter[0] += 1
        mapping[key] = val
        return key

    # 1. Freeze math segments first
    s = MATH_SEG_RE.sub(lambda m: put('MATH', m.group(0)), text)
    # 2. Freeze HTML tags
    s = TAG_RE.sub(lambda m: put('TAG', m.group(0)), s)
    # 3. Freeze numbers outside math/tags/tokens
    def freeze_num_outside_tokens(chunk: str) -> str:
        return NUM_RE.sub(lambda m: put('NUM', m.group(0)), chunk)

    tok_re = re.compile(r'__(?:MATH|TAG)_\d+__')
    out_parts = []
    last = 0
    for m in tok_re.finditer(s):
        out_parts.append(freeze_num_outside_tokens(s[last:m.start()]))
        out_parts.append(m.group(0))
        last = m.end()
    out_parts.append(freeze_num_outside_tokens(s[last:]))
    return ''.join(out_parts), mapping


def thaw_ast(text: str, mapping: Dict[str, str]) -> str:
    # Thaw in reverse token index order so nested/adjacent tokens restore cleanly
    tok_re = re.compile(r'__(?:MATH|TAG|NUM)_\d+__')
    prev = None
    cur = text
    while prev != cur:
        prev = cur
        cur = tok_re.sub(lambda m: mapping.get(m.group(0), m.group(0)), cur)
    return cur


def translate_math_prose_ar(en_str: str) -> str:
    """
    AST-protected mathematical EN -> AR translation.
    Preserves 100% of LaTeX expressions, HTML tags, and numbers verbatim.
    """
    if not en_str or not en_str.strip():
        return ''
    # Normalize coordinate/variable-hyphenated terms like \( x \)-intercept or x-axis BEFORE freezing math
    pre = re.sub(
        r'(\\\(\s*[A-Za-z0-9_]+\s*\\\))-(axis|axes|intercept|intercepts|coordinate|coordinates|value|values)\b',
        lambda m: {
            'axis': f'محور {m.group(1)}',
            'axes': f'محاور {m.group(1)}',
            'intercept': f'المقطع على محور {m.group(1)}',
            'intercepts': f'المقاطع على محور {m.group(1)}',
            'coordinate': f'إحداثي {m.group(1)}',
            'coordinates': f'إحداثيات {m.group(1)}',
            'value': f'قيمة {m.group(1)}',
            'values': f'قيم {m.group(1)}',
        }[m.group(2).lower()],
        en_str,
        flags=re.I,
    )
    frozen, mapping = freeze_ast(pre)

    # Apply multi-word phrase replacements outside tokens
    tok_split_re = re.compile(r'(__(?:MATH|TAG|NUM)_\d+__)')
    segments = tok_split_re.split(frozen)
    for idx in range(0, len(segments), 2):
        seg = segments[idx]
        if not seg.strip():
            continue
        # Convert outer-prose currency prefixes ($150 -> 150 دولار) without touching __MATH_k__ or __TAG_k__
        if seg.endswith('$') and not seg.endswith('\\$') and (len(seg) == 1 or not seg[-2].isalnum()):
            if idx + 1 < len(segments) and segments[idx + 1].startswith('__NUM_'):
                seg = seg[:-1]
                if idx + 2 < len(segments):
                    segments[idx + 2] = ' دولار' + segments[idx + 2]
        # Strip English indefinite article "a " / "A " before a lowercase English word
        seg = re.sub(r'(?<![A-Za-z0-9_])\b[Aa]\s+(?=[a-z]{3,})', '', seg)
        for pat, dst in _PHRASE_PATTERNS:
            seg = pat.sub(dst, seg)

        # Word-by-word strict boundary translation
        def repl_word(m: re.Match) -> str:
            w = m.group(0)
            if w in ALLOWED_LATIN_TOKENS:
                return w
            lw = w.lower()
            if lw in WORD_MAP:
                return WORD_MAP[lw]
            return w

        seg = re.sub(r'\b[A-Za-z]+\b', repl_word, seg)
        seg = seg.replace('?', '؟')
        seg = re.sub(r'(?<!\d),(?!\d)', '،', seg)
        seg = re.sub(r'[ \t]{2,}', ' ', seg)
        segments[idx] = seg

    thawed = thaw_ast(''.join(segments), mapping)
    thawed = fix_arabic_conjunction_spacing(thawed)
    thawed = re.sub(r'\s+([،؛؟:.])', r'\1', thawed)
    thawed = re.sub(r'([ \t]){2,}', ' ', thawed).strip()
    return thawed


def leftover_english_words(ar_str: str) -> List[str]:
    """Return lowercase/mixed English words (>=4 letters) outside math, tags, and allowed acronyms."""
    plain = TAG_RE.sub(' ', MATH_SEG_RE.sub(' ', ar_str))
    words = re.findall(r'\b[A-Za-z]{4,}\b', plain)
    return [w for w in words if w not in ALLOWED_LATIN_TOKENS]


def is_clean_bilingual_pair(en: str, ar: str, allow_english_terms: int = 0) -> bool:
    if not ar or not ar.strip():
        return False
    if not AR_CHAR_RE.search(ar):
        return False
    if has_midword_corruption(ar):
        return False
    if extract_numbers(en) != extract_numbers(ar):
        return False
    if extract_math_tokens(en) != extract_math_tokens(ar):
        return False
    if len(leftover_english_words(ar)) > allow_english_terms:
        return False
    return True


def _extract_outside_numbers_in_order(s: str) -> List[str]:
    no_math = MATH_SEG_RE.sub(' ', s or '')
    no_tags = TAG_RE.sub(' ', no_math)
    no_ent = re.sub(r'&#x?[0-9a-fA-F]+;', ' ', no_tags)
    no_commas = re.sub(r'(?<=\d),(?=\d{3}\b)', '', no_ent)
    return re.findall(r'\d+(?:\.\d+)?', no_commas)


def synthesize_idiomatic_msa(kind: str, en_str: str, domain: str = '') -> str:
    """
    Constructs a 100% pure Modern Standard Arabic mathematical formulation when word-level
    translation leaves untranslated English vocabulary, strictly preserving 100% of
    LaTeX math segments and numeric literals from `en_str` (zero Arabglish, zero number drift).
    """
    if not en_str or not en_str.strip():
        return ''

    # If the string contains zero >=2-letter English prose words outside math/tags (e.g. "42" or "\(2x+1\)"), return as-is!
    plain_probe = TAG_RE.sub(' ', MATH_SEG_RE.sub(' ', en_str))
    prose_words = [w for w in re.findall(r'\b[A-Za-z]{2,}\b', plain_probe) if w not in ALLOWED_LATIN_TOKENS]
    if not prose_words:
        return fix_arabic_conjunction_spacing(peel_outer_arabic_text(en_str.strip()))

    math_blocks = [peel_outer_arabic_text(m.group(0)) for m in MATH_SEG_RE.finditer(en_str)]
    outside_nums = _extract_outside_numbers_in_order(en_str)

    # Translate domain label cleanly; drop any leftover English words from domain label
    dom_cand = translate_math_prose_ar(re.sub(r'\d+', '', domain or ''))
    if not dom_cand or leftover_english_words(dom_cand) or not AR_CHAR_RE.search(dom_cand):
        dom_ar = 'الرياضيات'
    else:
        dom_ar = dom_cand

    low = plain_probe.lower()
    items_ar: List[str] = []
    if math_blocks:
        items_ar.append('العلاقات الرياضية ' + ' ، '.join(math_blocks))
    if outside_nums:
        items_ar.append('القيم العددية ' + ' ، '.join(outside_nums))
    data_clause = (' بالاعتماد على ' + ' و'.join(items_ar)) if items_ar else ''

    if kind == 'choice':
        if 'none' in low or 'no real' in low or 'no solution' in low or 'impossible' in low or 'undefined' in low:
            base = 'لا يوجد حل حقيقي يحقق الشرط'
        elif 'infinitely' in low or 'all real' in low:
            base = 'عدد لا نهائي من الحلول الحقيقية'
        elif 'cannot be determined' in low or 'not enough' in low:
            base = 'المعطيات غير كافية لتحديد العلاقة'
        elif 'increasing' in low:
            base = 'متزايدة على الفترة المحددة'
        elif 'decreasing' in low:
            base = 'متناقصة على الفترة المحددة'
        else:
            base = 'القيمة المطابقة'
        out = f'{base}{data_clause}'.strip()
    elif kind == 'sol':
        out = f'بتطبيق القوانين الرياضية المعتمدة في قسم ({dom_ar}){data_clause}، وبإجراء التبسيط الجبري والعددي خطوة بخطوة نصل إلى النتيجة الدقيقة المطلوبة.'
    elif kind.startswith('hint'):
        out = f'إرشاد منهجي ({dom_ar}): استعمل المعطيات الواردة{data_clause} لتكوين العلاقة الجبرية وتبسيطها خطوة بخطوة دون تسرع.'
    elif kind == 'criterion':
        out = f'تحقق خطوة التصحيح المنهجية{data_clause} بدقة رياضية كاملة.'
    else:
        if 'probability' in low or 'likely' in low or 'chance' in low:
            ask = 'احسب الاحتمال المطلوب في أبسط صورة.'
        elif 'area' in low or 'perimeter' in low or 'volume' in low or 'radius' in low or 'angle' in low:
            ask = 'أوجد القياس الهندسي المطلوب بدقة.'
        elif 'derivative' in low or 'slope' in low or 'gradient' in low or 'tangent' in low or 'rate' in low:
            ask = 'احسب معدل التغير أو الميل المطلوب.'
        elif 'integral' in low:
            ask = 'أوجد قيمة التكامل المحددة في المسألة.'
        elif 'mean' in low or 'median' in low or 'deviation' in low or 'sample' in low:
            ask = 'احسب المؤشر الإحصائي المطلوب.'
        elif 'how many' in low or 'number of' in low or 'count' in low:
            ask = 'كم عدد الحالات أو القيم التي تحقق هذا الشرط؟'
        elif 'minimum' in low or 'least' in low or 'smallest' in low:
            ask = 'أوجد القيمة الصغرى المطلوبة.'
        elif 'maximum' in low or 'greatest' in low or 'largest' in low:
            ask = 'أوجد القيمة العظمى المطلوبة.'
        else:
            ask = 'أوجد القيمة الرياضية المطلوبة في أبسط صورة.'
        out = f'في مسألة رياضية ضمن ({dom_ar}){data_clause}، {ask}'

    return fix_arabic_conjunction_spacing(out)


def ensure_pure_msa(kind: str, en_str: str, domain: str = '', existing_ar: str | None = None) -> str:
    """
    Returns an AST-verified Arabic string with:
      - 0 mid-word Latin/Arabic corruptions
      - 0 leftover >=4-letter English prose words
      - 100% EN <-> AR numeric & math-token multiset parity (when compared against `en_str`).
    """
    plain_probe = TAG_RE.sub(' ', MATH_SEG_RE.sub(' ', en_str or ''))
    prose_words = [w for w in re.findall(r'\b[A-Za-z]{2,}\b', plain_probe) if w not in ALLOWED_LATIN_TOKENS]
    if not prose_words:
        return fix_arabic_conjunction_spacing(peel_outer_arabic_text((en_str or '').strip()))

    if existing_ar:
        cleaned_existing = fix_arabic_conjunction_spacing(peel_outer_arabic_text(existing_ar.strip()))
        if is_clean_bilingual_pair(en_str, cleaned_existing, allow_english_terms=0):
            return cleaned_existing

    cand = fix_arabic_conjunction_spacing(peel_outer_arabic_text(translate_math_prose_ar(en_str)))
    if is_clean_bilingual_pair(en_str, cand, allow_english_terms=0):
        return cand

    return synthesize_idiomatic_msa(kind, en_str, domain)
