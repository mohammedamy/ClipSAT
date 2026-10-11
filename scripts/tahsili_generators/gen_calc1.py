"""
scripts/tahsili_generators/gen_calc1.py
Tahsili Limits & Derivatives generator:
- Limit laws, limits at infinity, indeterminate forms (0/0)
- Definition of derivative & Power, Product, Quotient, Chain rules
- Derivatives of Trigonometric functions
- Tangent line equations, Extrema, Concavity & Inflection points
- Position, Velocity, Acceleration & Mean Value Theorem
"""

import sys
import os
sys.path.insert(0, os.path.abspath("."))
from scripts.tahsili_generators.common import make_q

def get_questions():
    d = "Limits & Derivatives"
    qs = []

    # ================= EASY (15 items) =================
    easy_data = [
        (r"ما قيمة النهاية \( \lim_{x \to 2} (3x^2 - 4x + 1) \)؟<br><em>Evaluate limit by direct substitution.</em>",
         ["5", "4", "7", "1"], 0,
         r"بالتعويض المباشر: \( 3(2^2) - 4(2) + 1 = 3(4) - 8 + 1 = 12 - 8 + 1 = 5 \)."),

        (r"ما مشتقة الدالة \( f(x) = 7x^4 \)؟<br><em>Derivative of \( f(x) = 7x^4 \)?</em>",
         [r"\( 28x^3 \)", r"\( 21x^3 \)", r"\( 28x^4 \)", r"\( 7x^3 \)"], 0,
         r"قاعدة القوة: \( f'(x) = 7(4) x^3 = 28x^3 \)."),

        (r"ما مشتقة الدالة الثابتة \( f(x) = 15 \)؟<br><em>Derivative of constant function \( f(x) = 15 \)?</em>",
         ["0", "1", "15", "x"], 0,
         r"مشتقة أي دالة ثابتة تساوي صفرًا دائمًا: \( f'(x) = 0 \)."),

        (r"ما قيمة النهاية \( \lim_{x \to \infty} \dfrac{5x^2 - 2}{3x^2 + 7} \)؟<br><em>Limit at infinity of rational function?</em>",
         [r"\( \dfrac{5}{3} \)", "0", r"\( \infty \)", r"\( -\dfrac{2}{7} \)"], 0,
         r"بما أن درجتي البسط والمقام متساويتان (2)، فالنهاية عند اللانهاية تساوي نسبة المعاملين الرئيسيين: \( \dfrac{5}{3} \)."),

        (r"ما مشتقة الدالة \( f(x) = \sin x \)؟<br><em>Derivative of \( \sin x \)?</em>",
         [r"\( \cos x \)", r"\( -\cos x \)", r"\( \tan x \)", r"\( -\sin x \)"], 0,
         r"مشتقة جيب الزاوية هي جيب تمام الزاوية: \( (\sin x)' = \cos x \)."),

        (r"ما مشتقة الدالة \( f(x) = \cos x \)؟<br><em>Derivative of \( \cos x \)?</em>",
         [r"\( -\sin x \)", r"\( \sin x \)", r"\( -\cos x \)", r"\( \sec^2 x \)"], 0,
         r"مشتقة جيب التمام هي سالب الجيب: \( (\cos x)' = -\sin x \)."),

        (r"ما ميل المماس لمنحنى الدالة \( f(x) = x^2 \) عند النقطة \( x = 3 \)؟<br><em>Slope of tangent line to \( x^2 \) at x = 3?</em>",
         ["6", "9", "3", "12"], 0,
         r"\( f'(x) = 2x \). عند \( x = 3 \): ميل المماس \( m = f'(3) = 2(3) = 6 \)."),

        (r"إذا كان الموقع يعطى بالدالة \( s(t) = t^2 + 3t \)، فما السرعة المتجهة اللحظية عند \( t = 2 \)؟<br><em>Instantaneous velocity at t = 2?</em>",
         ["7", "10", "4", "5"], 0,
         r"السرعة هي مشتقة الموقع: \( v(t) = s'(t) = 2t + 3 \). عند \( t = 2 \): \( v(2) = 2(2) + 3 = 7 \)."),

        (r"ما قيمة النهاية \( \lim_{x \to 0} \dfrac{\sin x}{x} \)؟<br><em>Evaluate fundamental trigonometric limit.</em>",
         ["1", "0", r"\( \infty \)", "غير موجودة"], 0,
         r"نهاية مثلثية قياسية أساسية: \( \lim_{x \to 0} \dfrac{\sin x}{x} = 1 \)."),

        (r"ما مشتقة الدالة \( f(x) = \tan x \)؟<br><em>Derivative of \( \tan x \)?</em>",
         [r"\( \sec^2 x \)", r"\( \csc^2 x \)", r"\( \cot x \)", r"\( \sec x \tan x \)"], 0,
         r"مشتقة دالة الظل هي مربع القاطع: \( (\tan x)' = \sec^2 x \)."),

        (r"ما قيمة المشتقة الثانية \( f''(x) \) للدالة \( f(x) = x^3 - 5x^2 + 2 \)؟<br><em>Second derivative of \( x^3 - 5x^2 + 2 \)?</em>",
         [r"\( 6x - 10 \)", r"\( 3x^2 - 10x \)", r"\( 6x \)", "6"], 0,
         r"\( f'(x) = 3x^2 - 10x \). المشتقة الثانية: \( f''(x) = 6x - 10 \)."),

        (r"ما قيمة النهاية \( \lim_{x \to 3} \dfrac{x^2 - 9}{x - 3} \)؟<br><em>Evaluate indeterminate limit 0/0.</em>",
         ["6", "3", "0", "غير موجودة"], 0,
         r"تحليل البسط كفرق بين مربعين: \( \dfrac{(x-3)(x+3)}{x-3} = x + 3 \). بالتعويض: \( 3 + 3 = 6 \)."),

        (r"ما النقاط الحرجة للدالة \( f(x) = x^2 - 6x + 8 \)؟<br><em>Critical point of \( x^2 - 6x + 8 \)?</em>",
         ["x = 3", "x = 2", "x = 4", "x = -3"], 0,
         r"نوجد المشتقة ونساويها بالصفر: \( f'(x) = 2x - 6 = 0 \implies 2x = 6 \implies x = 3 \)."),

        (r"ما قيمة النهاية \( \lim_{x \to \infty} \dfrac{4}{x^2 + 1} \)؟<br><em>Limit at infinity?</em>",
         ["0", "4", "1", r"\( \infty \)"], 0,
         r"درجة البسط أصغر من درجة المقام، فتؤول الدالة إلى 0 عندما \( x \to \infty \)."),

        (r"إذا كانت الدالة متصلة على الفترة المغلقة \( [a, b] \) وقابلة للاشتقاق على \( (a, b) \)، وكان \( f(a) = f(b) \)، فما النظرية التي تضمن وجود \( c \) بحيث \( f'(c) = 0 \)؟<br><em>Which theorem guarantees \( f'(c) = 0 \)?</em>",
         ["نظرية رول (Rolle's Theorem)", "نظرية القيمة المتوسطة", "نظرية القيمة الابتدائية", "نظرية لوبيتال"], 0,
         r"هذا هو نص نظرية رول تماماً.")
    ]
    for text, ch, ans, sol in easy_data:
        qs.append(make_q(d, "easy", text, ch, ans, sol))

    # ================= MEDIUM (20 items) =================
    med_data = [
        (r"ما مشتقة الدالة \( f(x) = (2x + 1)^4 \) باستخدام قاعدة السلسلة؟<br><em>Derivative using chain rule.</em>",
         [r"\( 8(2x + 1)^3 \)", r"\( 4(2x + 1)^3 \)", r"\( 2(2x + 1)^3 \)", r"\( 8(2x + 1)^4 \)"], 0,
         r"قاعدة السلسلة: \( f'(x) = 4(2x + 1)^3 \times \dfrac{d}{dx}(2x + 1) = 4(2x + 1)^3 (2) = 8(2x + 1)^3 \)."),

        (r"ما مشتقة حاصل الضرب للدالة \( f(x) = x^2 \sin x \)؟<br><em>Product rule derivative of \( x^2 \sin x \)?</em>",
         [r"\( 2x\sin x + x^2\cos x \)", r"\( 2x\cos x \)", r"\( x^2\cos x - 2x\sin x \)", r"\( 2x\sin x \)"], 0,
         r"قاعدة الضرب: \( f'(x) = (x^2)' \sin x + x^2 (\sin x)' = 2x\sin x + x^2\cos x \)."),

        (r"ما مشتقة الدالة الكسرية \( f(x) = \dfrac{x}{x + 1} \)؟<br><em>Quotient rule derivative of \( \dfrac{x}{x+1} \)?</em>",
         [r"\( \dfrac{1}{(x + 1)^2} \)", r"\( \dfrac{2x + 1}{(x + 1)^2} \)", r"\( \dfrac{-1}{(x + 1)^2} \)", "1"], 0,
         r"قاعدة القسمة: \( \dfrac{(1)(x+1) - (x)(1)}{(x+1)^2} = \dfrac{x+1-x}{(x+1)^2} = \dfrac{1}{(x+1)^2} \)."),

        (r"ما معادلة مماس منحنى الدالة \( f(x) = x^2 + 1 \) عند النقطة \( (1, 2) \)؟<br><em>Tangent line equation at (1, 2)?</em>",
         [r"\( y = 2x \)", r"\( y = 2x + 1 \)", r"\( y = 2x - 1 \)", r"\( y = x + 1 \)"], 0,
         r"الميل \( m = f'(1) = 2(1) = 2 \). المعادلة: \( y - 2 = 2(x - 1) \implies y - 2 = 2x - 2 \implies y = 2x \)."),

        (r"ما قيمة النهاية \( \lim_{x \to 4} \dfrac{\sqrt{x} - 2}{x - 4} \)؟<br><em>Evaluate limit involving radical.</em>",
         [r"\( \dfrac{1}{4} \)", r"\( \dfrac{1}{2} \)", "0", "4"], 0,
         r"بالضرب في مرافق البسط \( \sqrt{x} + 2 \): \( \dfrac{x - 4}{(x - 4)(\sqrt{x} + 2)} = \dfrac{1}{\sqrt{x} + 2} \). بالتعويض: \( \dfrac{1}{2 + 2} = \dfrac{1}{4} \)."),

        (r"ما التسارع اللحظي لجسيم موضعه \( s(t) = 2t^3 - 4t^2 + 5 \) عند \( t = 2 \)؟<br><em>Instantaneous acceleration at t = 2?</em>",
         ["16", "8", "24", "12"], 0,
         r"السرعة \( v(t) = s'(t) = 6t^2 - 8t \). التسارع \( a(t) = v'(t) = 12t - 8 \). عند \( t = 2 \): \( a(2) = 12(2) - 8 = 24 - 8 = 16 \)."),

        (r"ما الفترات التي تكون فيها الدالة \( f(x) = x^3 - 3x \) متزايدة؟<br><em>Intervals where \( x^3 - 3x \) is increasing?</em>",
         [r"\( (-\infty, -1) \cup (1, \infty) \)", r"\( (-1, 1) \)", r"\( (0, \infty) \)", r"\( (-\infty, 0) \)"], 0,
         r"\( f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1) > 0 \). الإشارة موجبة خارج الجذرين: \( (-\infty, -1) \cup (1, \infty) \)."),

        (r"ما نقطة الانقلاب لمنحنى الدالة \( f(x) = x^3 - 6x^2 + 9x \)؟<br><em>Inflection point of \( x^3 - 6x^2 + 9x \)?</em>",
         [r"\( (2, 2) \)", r"\( (1, 4) \)", r"\( (3, 0) \)", r"\( (0, 0) \)"], 0,
         r"\( f'(x) = 3x^2 - 12x + 9 \). \( f''(x) = 6x - 12 = 0 \implies x = 2 \). \( f(2) = 8 - 24 + 18 = 2 \). النقطة هي \( (2, 2) \)."),

        (r"ما قيمة النهاية \( \lim_{x \to 0} \dfrac{\sin(5x)}{2x} \)؟<br><em>Evaluate \( \lim_{x \to 0} \dfrac{\sin(5x)}{2x} \).</em>",
         [r"\( \dfrac{5}{2} \)", r"\( \dfrac{2}{5} \)", "0", "1"], 0,
         r"\( \lim_{x \to 0} \dfrac{\sin(5x)}{2x} = \dfrac{5}{2} \lim_{x \to 0} \dfrac{\sin(5x)}{5x} = \dfrac{5}{2}(1) = \dfrac{5}{2} \)."),

        (r"ما القيمة العظمى المحلية للدالة \( f(x) = -x^2 + 4x + 1 \)؟<br><em>Local maximum value of \( -x^2 + 4x + 1 \)?</em>",
         ["5", "4", "2", "1"], 0,
         r"\( f'(x) = -2x + 4 = 0 \implies x = 2 \). القيمة العظمى: \( f(2) = -(4) + 4(2) + 1 = -4 + 8 + 1 = 5 \)."),

        (r"ما مشتقة الدالة \( f(x) = \sqrt{3x + 1} \)؟<br><em>Derivative of \( \sqrt{3x+1} \)?</em>",
         [r"\( \dfrac{3}{2\sqrt{3x + 1}} \)", r"\( \dfrac{1}{2\sqrt{3x + 1}} \)", r"\( \dfrac{3}{\sqrt{3x + 1}} \)", r"\( \dfrac{1}{3\sqrt{3x + 1}} \)"], 0,
         r"مشتقة الجذر التربيعي: \( \dfrac{g'(x)}{2\sqrt{g(x)}} = \dfrac{3}{2\sqrt{3x + 1}} \)."),

        (r"ما ميل المماس العمودي على منحنى الدالة \( f(x) = x^3 \) عند \( x = 1 \)؟<br><em>Slope of normal line (perpendicular to tangent) at x = 1?</em>",
         [r"\( -\dfrac{1}{3} \)", "3", "-3", r"\( \dfrac{1}{3} \)"], 0,
         r"ميل المماس \( m_{tan} = f'(1) = 3(1)^2 = 3 \). ميل العمودي على المماس \( m_{norm} = -\dfrac{1}{m_{tan}} = -\dfrac{1}{3} \)."),

        (r"ما قيمة النهاية \( \lim_{x \to 1} \dfrac{x^3 - 1}{x - 1} \)؟<br><em>Evaluate \( \lim_{x \to 1} \dfrac{x^3 - 1}{x - 1} \).</em>",
         ["3", "1", "2", "0"], 0,
         r"تحليل فرق بين مكعبين: \( \dfrac{(x-1)(x^2+x+1)}{x-1} = x^2+x+1 \). بالتعويض: \( 1+1+1 = 3 \)."),

        (r"إذا كانت \( f(x) = x^4 - 4x^3 \)، فما هي الفترات التي يكون فيها المنحنى مقعراً للأعلى؟<br><em>Interval where curve is concave upward?</em>",
         [r"\( (-\infty, 0) \cup (2, \infty) \)", r"\( (0, 2) \)", r"\( (2, \infty) \)", r"\( (-\infty, 0) \)"], 0,
         r"\( f'(x) = 4x^3 - 12x^2 \). \( f''(x) = 12x^2 - 24x = 12x(x - 2) > 0 \). الإشارة موجبة خارج الجذرين: \( (-\infty, 0) \cup (2, \infty) \)."),

        (r"ما قيمة الثابت \( c \) المضمون بنظرية القيمة المتوسطة للدالة \( f(x) = x^2 \) على الفترة \( [0, 4] \)؟<br><em>Value of c from Mean Value Theorem on [0, 4]?</em>",
         ["2", "1", "3", r"\( \sqrt{2} \)"], 0,
         r"\( \dfrac{f(4) - f(0)}{4 - 0} = \dfrac{16 - 0}{4} = 4 \). \( f'(c) = 2c = 4 \implies c = 2 \)."),

        (r"ما مشتقة الدالة \( f(x) = \dfrac{1}{x^2} \)؟<br><em>Derivative of \( x^{-2} \)?</em>",
         [r"\( -\dfrac{2}{x^3} \)", r"\( \dfrac{2}{x^3} \)", r"\( -\dfrac{1}{x^3} \)", r"\( -\dfrac{2}{x} \)"], 0,
         r"\( f(x) = x^{-2} \implies f'(x) = -2x^{-3} = -\dfrac{2}{x^3} \)."),

        (r"باستخدام قاعدة لوبيتال، ما قيمة \( \lim_{x \to 0} \dfrac{e^x - 1}{x} \)؟<br><em>Evaluate limit using L'Hopital's rule.</em>",
         ["1", "0", "e", "غير موجودة"], 0,
         r"الصيغة غير معينة \( 0/0 \). باشتقاق البسط والمقام: \( \lim_{x \to 0} \dfrac{e^x}{1} = \dfrac{e^0}{1} = 1 \)."),

        (r"ما قيمة النهاية \( \lim_{x \to \infty} \dfrac{3x^3 + 2}{x^4 - 5} \)؟<br><em>Limit at infinity when denominator degree is higher?</em>",
         ["0", "3", r"\( \infty \)", "-2/5"], 0,
         r"بما أن درجة المقام (4) أكبر من درجة البسط (3)، فإن النهاية عند المالانهاية تساوي 0."),

        (r"إذا كان \( f(2) = 3 \) و \( f'(2) = 5 \)، وكان \( g(x) = (f(x))^2 \)، فما قيمة \( g'(2) \)؟<br><em>Find \( g'(2) \) using chain rule.</em>",
         ["30", "15", "25", "10"], 0,
         r"\( g'(x) = 2 f(x) f'(x) \). عند \( x = 2 \): \( g'(2) = 2(3)(5) = 30 \)."),

        (r"ما معدل التغير اللحظي للدالة \( f(x) = 5x^2 - 3x \) عند \( x = 4 \)؟<br><em>Instantaneous rate of change at x = 4?</em>",
         ["37", "40", "34", "35"], 0,
         r"معدل التغير اللحظي هو المشتقة: \( f'(x) = 10x - 3 \). عند \( x = 4 \): \( f'(4) = 10(4) - 3 = 40 - 3 = 37 \).")
    ]
    for text, ch, ans, sol in med_data:
        qs.append(make_q(d, "medium", text, ch, ans, sol))

    # ================= HARD (15 items) =================
    hard_data = [
        (r"ما قيمة النهاية \( \lim_{x \to 0} \dfrac{1 - \cos x}{x^2} \)؟<br><em>Evaluate \( \lim_{x \to 0} \dfrac{1 - \cos x}{x^2} \).</em>",
         [r"\( \dfrac{1}{2} \)", "0", "1", "غير موجودة"], 0,
         r"باستخدام قاعدة لوبيتال مرتين أو بالضرب في المرافق: \( \lim_{x \to 0} \dfrac{\sin x}{2x} = \dfrac{1}{2}(1) = \dfrac{1}{2} \)."),

        (r"إذا كان مماس منحنى الدالة \( f(x) = x^3 - 3x \) أفقيًا، فما هي قيم \( x \) الممكنة؟<br><em>Find x where tangent line is horizontal.</em>",
         [r"\( \pm 1 \)", "0 فقط", r"\( \pm \sqrt{3} \)", "3 فقط"], 0,
         r"المماس الأفقي يعني أن الميل صفر: \( f'(x) = 3x^2 - 3 = 0 \implies 3(x^2 - 1) = 0 \implies x = \pm 1 \)."),

        (r"ما مشتقة الدالة \( f(x) = \sin(x^2) \)؟<br><em>Derivative of \( \sin(x^2) \)?</em>",
         [r"\( 2x\cos(x^2) \)", r"\( \cos(x^2) \)", r"\( 2x\sin(x^2) \)", r"\( -2x\cos(x^2) \)"], 0,
         r"بقاعدة السلسلة: \( \cos(x^2) \times \dfrac{d}{dx}(x^2) = 2x\cos(x^2) \)."),

        (r"ما مشتقة الدالة \( f(x) = \cos^3 x \)؟<br><em>Derivative of \( \cos^3 x \)?</em>",
         [r"\( -3\cos^2 x \sin x \)", r"\( 3\cos^2 x \)", r"\( 3\cos^2 x \sin x \)", r"\( -3\sin^2 x \)"], 0,
         r"بقاعدة السلسلة: \( 3\cos^2 x \times (-\sin x) = -3\cos^2 x \sin x \)."),

        (r"ما هي القيمة الصغرى المطلقة للدالة \( f(x) = x^3 - 3x \) على الفترة المغلقة \( [0, 2] \)؟<br><em>Absolute minimum on closed interval [0, 2]?</em>",
         ["-2", "0", "2", "-1"], 0,
         r"النقاط الحرجة: \( f'(x) = 3x^2 - 3 = 0 \implies x = 1 \in [0, 2] \). نحسب القيم عند الأطراف والنقطة الحرجة: \( f(0) = 0 \)، \( f(1) = 1 - 3 = -2 \)، \( f(2) = 8 - 6 = 2 \). القيمة الصغرى المطلقة هي \( -2 \) عند \( x = 1 \)."),

        (r"ما قيمة النهاية \( \lim_{x \to 2} \dfrac{x^4 - 16}{x - 2} \)؟<br><em>Evaluate limit \( \lim_{x \to 2} \dfrac{x^4 - 16}{x-2} \).</em>",
         ["32", "16", "8", "64"], 0,
         r"تمثل تعريف المشتقة للدالة \( f(x) = x^4 \) عند \( x = 2 \): \( f'(2) = 4(2)^3 = 4(8) = 32 \)."),

        (r"إذا كانت الدالة \( f(x) = \begin{cases} ax^2 + 1, & x \leq 1 \\ 2x + b, & x > 1 \end{cases} \) قابلة للاشتقاق عند \( x = 1 \)، فما قيمة الثابت \( a \)؟<br><em>Find a if function is differentiable at x = 1.</em>",
         ["1", "2", "0", "-1"], 0,
         r"لاشتقاقها، يجب أن تتساوى المشتقات من اليمين واليسار: \( f'_-(1) = 2a(1) = 2a \)، \( f'_+(1) = 2 \implies 2a = 2 \implies a = 1 \)."),

        (r"في نفس الدالة السابقة (\( a = 1 \))، ما قيمة الثابت \( b \) لتكون متصلة أيضاً عند \( x = 1 \)؟<br><em>Find b for continuity.</em>",
         ["0", "1", "2", "-1"], 0,
         r"الاتصال يتطلب: \( a(1)^2 + 1 = 2(1) + b \implies 1 + 1 = 2 + b \implies 2 = 2 + b \implies b = 0 \)."),

        (r"ما قيمة النهاية \( \lim_{x \to 0} \dfrac{\tan(3x)}{\sin(4x)} \)؟<br><em>Evaluate \( \lim_{x \to 0} \dfrac{\tan(3x)}{\sin(4x)} \).</em>",
         [r"\( \dfrac{3}{4} \)", r"\( \dfrac{4}{3} \)", "0", "1"], 0,
         r"\( \lim_{x \to 0} \dfrac{\tan(3x)/x}{\sin(4x)/x} = \dfrac{3}{4} \)."),

        (r"إذا كان \( f'(x) > 0 \) و \( f''(x) < 0 \) على فترة معينة، فإن التمثيل البياني للدالة على هذه الفترة يكون:<br><em>If \( f' > 0 \) and \( f'' < 0 \), the graph is:</em>",
         ["متزايداً ومقعراً للأسفل", "متزايداً ومقعراً للأعلى", "متناقصاً ومقعراً للأسفل", "متناقصاً ومقعراً للأعلى"], 0,
         r"\( f' > 0 \) تعني أن الدالة متزايدة، و \( f'' < 0 \) تعني أن المنحنى مقعر للأسفل."),

        (r"ما مشتقة دالة المقلوب \( f(x) = \csc x \)؟<br><em>Derivative of \( \csc x \)?</em>",
         [r"\( -\csc x \cot x \)", r"\( \csc x \cot x \)", r"\( -\sec x \tan x \)", r"\( -\cot^2 x \)"], 0,
         r"مشتقة قاطع التمام هي: \( (\csc x)' = -\csc x \cot x \)."),

        (r"ما مشتقة دالة القاطع \( f(x) = \sec x \)؟<br><em>Derivative of \( \sec x \)?</em>",
         [r"\( \sec x \tan x \)", r"\( -\sec x \tan x \)", r"\( \tan^2 x \)", r"\( \sec^2 x \)"], 0,
         r"مشتقة القاطع هي: \( (\sec x)' = \sec x \tan x \)."),

        (r"ما قيمة النهاية \( \lim_{x \to \infty} \dfrac{\sqrt{4x^2 + 1}}{x} \)؟<br><em>Limit at positive infinity involving square root?</em>",
         ["2", "4", "1", r"\( \infty \)"], 0,
         r"عندما \( x > 0 \): \( \dfrac{\sqrt{4x^2 + 1}}{x} = \sqrt{4 + \dfrac{1}{x^2}} \to \sqrt{4} = 2 \)."),

        (r"جسيم يتحرك في خط مستقيم بحيث \( s(t) = t^3 - 6t^2 + 9t \). في أي لحظة يتوقف الجسيم لحظياً (السرعة = 0)؟<br><em>When does particle momentarily stop?</em>",
         [r"\( t = 1 \) و \( t = 3 \)", r"\( t = 0 \) و \( t = 3 \)", r"\( t = 2 \)", r"\( t = 3 \) فقط"], 0,
         r"\( v(t) = s'(t) = 3t^2 - 12t + 9 = 0 \implies 3(t^2 - 4t + 3) = 0 \implies 3(t - 1)(t - 3) = 0 \implies t = 1, 3 \)."),

        (r"ما هو الشرط اللازم والكافي لتكون النقطة \( (c, f(c)) \) نقطة انقلاب لدالة قابلة للاشتقاق مرتين؟<br><em>Condition for inflection point?</em>",
         ["أن تكون المشتقة الثانية صفراً وتغير إشارتها حول c", "أن تكون المشتقة الأولى صفراً", "أن تكون المشتقة الثانية موجبة دائماً", "أن تكون الدالة متزايدة فقط"], 0,
         r"نقطة الانقلاب تتطلب أن ينعدم التقعر (\( f''(c) = 0 \)) مع تغير إشارة المشتقة الثانية من الموجب إلى السالب أو العكس حول \( c \).")
    ]
    for text, ch, ans, sol in hard_data:
        qs.append(make_q(d, "hard", text, ch, ans, sol))

    return qs

if __name__ == "__main__":
    qs = get_questions()
    from collections import Counter
    print("Limits & Derivatives generated:", Counter(q['difficulty'] for q in qs))
