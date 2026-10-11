"""
scripts/tahsili_generators/gen_calc2.py
Tahsili Integration & Applications generator:
- Indefinite Integrals & Power / Trig / Exp Rules
- Fundamental Theorem of Calculus & Definite Integrals
- Integration by Substitution
- Area under a curve & Area between curves
- Average value of a function & Kinematics applications
"""

import sys
import os
sys.path.insert(0, os.path.abspath("."))
from scripts.tahsili_generators.common import make_q

def get_questions():
    d = "Integration & Applications"
    qs = []

    # ================= EASY (20 items) =================
    easy_data = [
        (r"ما قيمة التكامل غير المحدد: \( \int 6x^2 \, dx \)؟<br><em>Evaluate indefinite integral \( \int 6x^2 dx \).</em>",
         [r"\( 2x^3 + C \)", r"\( 3x^3 + C \)", r"\( 6x^3 + C \)", r"\( 12x + C \)"], 0,
         r"قاعدة القوة في التكامل: \( \int 6x^2 dx = 6 \dfrac{x^3}{3} + C = 2x^3 + C \)."),

        (r"ما قيمة التكامل: \( \int \cos x \, dx \)؟<br><em>Evaluate \( \int \cos x dx \).</em>",
         [r"\( \sin x + C \)", r"\( -\sin x + C \)", r"\( \tan x + C \)", r"\( \cos x + C \)"], 0,
         r"الدالة الأصلية لجيب التمام هي الجيب: \( \int \cos x dx = \sin x + C \)."),

        (r"ما قيمة التكامل: \( \int \sin x \, dx \)؟<br><em>Evaluate \( \int \sin x dx \).</em>",
         [r"\( -\cos x + C \)", r"\( \cos x + C \)", r"\( -\sin x + C \)", r"\( \sec^2 x + C \)"], 0,
         r"الدالة الأصلية للجيب هي سالب جيب التمام: \( \int \sin x dx = -\cos x + C \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^3 2x \, dx \)؟<br><em>Evaluate definite integral \( \int_0^3 2x dx \).</em>",
         ["9", "6", "3", "18"], 0,
         r"\( \left[ x^2 \right]_0^3 = 3^2 - 0 = 9 \)."),

        (r"ما قيمة التكامل: \( \int e^x \, dx \)؟<br><em>Evaluate \( \int e^x dx \).</em>",
         [r"\( e^x + C \)", r"\( \ln x + C \)", r"\( \dfrac{e^{x+1}}{x+1} + C \)", r"\( x e^x + C \)"], 0,
         r"الدالة الأسية الطبيعية \( e^x \) مشتقتها وتكاملها هو نفسها: \( e^x + C \)."),

        (r"ما قيمة التكامل: \( \int \sec^2 x \, dx \)؟<br><em>Evaluate \( \int \sec^2 x dx \).</em>",
         [r"\( \tan x + C \)", r"\( \sec x + C \)", r"\( -\cot x + C \)", r"\( 2\sec x + C \)"], 0,
         r"مشتقة الظل هي \( \sec^2 x \)، لذا \( \int \sec^2 x dx = \tan x + C \)."),

        (r"ما قيمة التكامل: \( \int 5 \, dx \)؟<br><em>Evaluate \( \int 5 dx \).</em>",
         [r"\( 5x + C \)", r"\( 0 \)", r"\( 5x^2 + C \)", r"\( \dfrac{5}{x} + C \)"], 0,
         r"تكامل الثابت هو الثابت مضروباً في المتغير: \( 5x + C \)."),

        (r"ما قيمة التكامل المحدد: \( \int_1^2 3x^2 \, dx \)؟<br><em>Evaluate \( \int_1^2 3x^2 dx \).</em>",
         ["7", "8", "6", "9"], 0,
         r"\( \left[ x^3 \right]_1^2 = 2^3 - 1^3 = 8 - 1 = 7 \)."),

        (r"ما قيمة التكامل المحدد: \( \int_a^a f(x) \, dx \) لأي دالة \( f(x) \)؟<br><em>Definite integral with identical upper and lower limits?</em>",
         ["0", "1", r"\( f(a) \)", r"\( 2a \)"], 0,
         r"من خصائص التكامل المحدد: تكامل أي دالة عندما يتساوى الحد السفلي مع الحد العلوي يساوي صفرًا: \( \int_a^a f(x) dx = 0 \)."),

        (r"إذا كانت \( \int_1^5 f(x) \, dx = 10 \)، فما قيمة \( \int_5^1 f(x) \, dx \)؟<br><em>Effect of reversing limits of integration?</em>",
         ["-10", "10", "0", "5"], 0,
         r"عكس حدود التكامل يغير إشارة الناتج: \( \int_b^a f(x) dx = -\int_a^b f(x) dx = -10 \)."),

        (r"ما مساحة المنطقة المحصورة تحت المنحنى \( y = 4 \) ومحور السينات على الفترة \( [1, 5] \)؟<br><em>Area under horizontal line y = 4 on [1, 5]?</em>",
         ["16", "20", "12", "8"], 0,
         r"مساحة مستطيل عرضه \( 5 - 1 = 4 \) وارتفاعه 4: \( 4 \times 4 = 16 \) (أو \( \int_1^5 4 dx = 16 \))."),

        (r"ما قيمة التكامل: \( \int \dfrac{1}{x} \, dx \) لـ \( x > 0 \)؟<br><em>Evaluate \( \int \frac{1}{x} dx \).</em>",
         [r"\( \ln x + C \)", r"\( -\dfrac{1}{x^2} + C \)", r"\( x + C \)", r"\( e^x + C \)"], 0,
         r"الدالة الأصلية لـ \( 1/x \) هي اللوغاريتم الطبيعي: \( \ln|x| + C \)."),

        (r"إذا كانت السرعة المتجهة لجسيم هي \( v(t) = 6t \)، فما دالة الإزاحة \( s(t) \) إذا بدأ من نقطة الأصل \( s(0) = 0 \)؟<br><em>Find displacement s(t) if v(t) = 6t and s(0) = 0.</em>",
         [r"\( 3t^2 \)", r"\( 6t^2 \)", r"\( 3t \)", r"\( t^3 \)"], 0,
         r"\( s(t) = \int 6t dt = 3t^2 + C \). من الشرط \( s(0) = 0 \implies C = 0 \implies s(t) = 3t^2 \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^2 (2x + 1) \, dx \)؟<br><em>Evaluate \( \int_0^2 (2x+1) dx \).</em>",
         ["6", "4", "5", "8"], 0,
         r"\( \left[ x^2 + x \right]_0^2 = (4 + 2) - 0 = 6 \)."),

        (r"ما قيمة التكامل: \( \int (x^3 - x) \, dx \)؟<br><em>Evaluate \( \int (x^3 - x) dx \).</em>",
         [r"\( \dfrac{x^4}{4} - \dfrac{x^2}{2} + C \)", r"\( \dfrac{x^4}{4} + \dfrac{x^2}{2} + C \)", r"\( 3x^2 - 1 + C \)", r"\( x^4 - x^2 + C \)"], 0,
         r"\( \dfrac{x^4}{4} - \dfrac{x^2}{2} + C \)."),

        (r"إذا كانت \( \int_0^2 f(x) \, dx = 3 \) و \( \int_2^5 f(x) \, dx = 7 \)، فما قيمة \( \int_0^5 f(x) \, dx \)؟<br><em>Additive property of definite integrals?</em>",
         ["10", "4", "-4", "21"], 0,
         r"خاصية الإضافة: \( \int_0^5 f(x) dx = \int_0^2 f(x) dx + \int_2^5 f(x) dx = 3 + 7 = 10 \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^\pi \sin x \, dx \)؟<br><em>Evaluate \( \int_0^\pi \sin x dx \).</em>",
         ["2", "0", "1", "-2"], 0,
         r"\( [-\cos x]_0^\pi = -\cos\pi - (-\cos 0) = -(-1) + 1 = 1 + 1 = 2 \)."),

        (r"ما قيمة التكامل: \( \int e^{3x} \, dx \)؟<br><em>Evaluate \( \int e^{3x} dx \).</em>",
         [r"\( \dfrac{1}{3} e^{3x} + C \)", r"\( 3e^{3x} + C \)", r"\( e^{3x} + C \)", r"\( \dfrac{1}{3} e^x + C \)"], 0,
         r"\( \int e^{kx} dx = \dfrac{1}{k} e^{kx} + C \implies \dfrac{1}{3} e^{3x} + C \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^1 x^4 \, dx \)؟<br><em>Evaluate \( \int_0^1 x^4 dx \).</em>",
         [r"\( \dfrac{1}{5} \)", r"\( \dfrac{1}{4} \)", "1", "5"], 0,
         r"\( \left[ \dfrac{x^5}{5} \right]_0^1 = \dfrac{1}{5} - 0 = \dfrac{1}{5} \)."),

        (r"أي الدوال التالية هي دالة أصلية (Antiderivative) للدالة \( f(x) = 2x \)؟<br><em>Which is an antiderivative of 2x?</em>",
         [r"\( F(x) = x^2 + 5 \)", r"\( F(x) = 2 \)", r"\( F(x) = 2x^2 \)", r"\( F(x) = x^2 - x \)"], 0,
         r"مشتقة \( x^2 + 5 \) هي \( 2x \)، لذا فهي دالة أصلية لها.")
    ]
    for text, ch, ans, sol in easy_data:
        qs.append(make_q(d, "easy", text, ch, ans, sol))

    # ================= MEDIUM (25 items) =================
    med_data = [
        (r"باستخدام طريقة التعويض، ما قيمة التكامل: \( \int 2x(x^2 + 1)^3 \, dx \)؟<br><em>Evaluate integral by substitution.</em>",
         [r"\( \dfrac{(x^2 + 1)^4}{4} + C \)", r"\( \dfrac{(x^2 + 1)^4}{2} + C \)", r"\( (x^2 + 1)^4 + C \)", r"\( \dfrac{(x^2 + 1)^3}{3} + C \)"], 0,
         r"نضع \( u = x^2 + 1 \implies du = 2x dx \). التكامل يصبح: \( \int u^3 du = \dfrac{u^4}{4} + C = \dfrac{(x^2 + 1)^4}{4} + C \)."),

        (r"ما مساحة المنطقة المحصورة بين منحنى الدالة \( y = x^2 \) ومحور السينات على الفترة \( [0, 3] \)؟<br><em>Area under \( y = x^2 \) on [0, 3]?</em>",
         ["9", "3", "27", "6"], 0,
         r"\( \text{المساحة} = \int_0^3 x^2 dx = \left[ \dfrac{x^3}{3} \right]_0^3 = \dfrac{27}{3} - 0 = 9 \)."),

        (r"ما مساحة المنطقة المحصورة بين منحنى الدالة \( y = \sqrt{x} \) ومحور السينات من \( x = 0 \) إلى \( x = 4 \)؟<br><em>Area under \( y = \sqrt{x} \) from 0 to 4?</em>",
         [r"\( \dfrac{16}{3} \)", r"\( \dfrac{8}{3} \)", "4", "8"], 0,
         r"\( \int_0^4 x^{1/2} dx = \left[ \dfrac{2}{3} x^{3/2} \right]_0^4 = \dfrac{2}{3} (4)^{3/2} = \dfrac{2}{3}(8) = \dfrac{16}{3} \)."),

        (r"ما القيمة المتوسطة للدالة \( f(x) = 2x \) على الفترة \( [0, 4] \)؟<br><em>Average value of \( 2x \) on [0, 4]?</em>",
         ["4", "2", "8", "16"], 0,
         r"\( f_{avg} = \dfrac{1}{4 - 0} \int_0^4 2x dx = \dfrac{1}{4} \left[ x^2 \right]_0^4 = \dfrac{1}{4} (16) = 4 \)."),

        (r"ما قيمة التكامل: \( \int x \cos(x^2) \, dx \)؟<br><em>Evaluate \( \int x \cos(x^2) dx \).</em>",
         [r"\( \dfrac{1}{2}\sin(x^2) + C \)", r"\( \sin(x^2) + C \)", r"\( -\dfrac{1}{2}\sin(x^2) + C \)", r"\( 2\sin(x^2) + C \)"], 0,
         r"نضع \( u = x^2 \implies du = 2x dx \implies x dx = \dfrac{1}{2} du \). الناتج \( = \dfrac{1}{2}\sin(x^2) + C \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^1 e^{2x} \, dx \)؟<br><em>Evaluate \( \int_0^1 e^{2x} dx \).</em>",
         [r"\( \dfrac{e^2 - 1}{2} \)", r"\( e^2 - 1 \)", r"\( \dfrac{e^2}{2} \)", r"\( \dfrac{e^2 + 1}{2} \)"], 0,
         r"\( \left[ \dfrac{1}{2} e^{2x} \right]_0^1 = \dfrac{1}{2} e^2 - \dfrac{1}{2} e^0 = \dfrac{e^2 - 1}{2} \)."),

        (r"ما مساحة المنطقة المحصورة بين المنحنيين \( y = x \) و \( y = x^2 \)؟<br><em>Area between \( y = x \) and \( y = x^2 \)?</em>",
         [r"\( \dfrac{1}{6} \)", r"\( \dfrac{1}{3} \)", r"\( \dfrac{1}{2} \)", r"\( \dfrac{1}{12} \)"], 0,
         r"نقاط التقاطع: \( x = x^2 \implies x = 0, 1 \). على الفترة \( [0, 1] \) يكون \( x \geq x^2 \): \( \int_0^1 (x - x^2) dx = \left[ \dfrac{x^2}{2} - \dfrac{x^3}{3} \right]_0^1 = \dfrac{1}{2} - \dfrac{1}{3} = \dfrac{1}{6} \)."),

        (r"ما قيمة التكامل المحدد: \( \int_{-2}^2 (x^3 + x) \, dx \)؟<br><em>Integral of odd function on symmetric interval?</em>",
         ["0", "4", "8", "-4"], 0,
         r"الدالة \( f(x) = x^3 + x \) دالة فردية تماماً، وتكامل أي دالة فردية على فترة متماثلة حول الصفر \( [-a, a] \) يساوي صفرًا دائمًا."),

        (r"إذا كانت \( f(x) \) دالة زوجية وكان \( \int_0^3 f(x) \, dx = 5 \)، فما قيمة \( \int_{-3}^3 f(x) \, dx \)؟<br><em>Integral of even function on symmetric interval?</em>",
         ["10", "0", "5", "-5"], 0,
         r"تكامل الدالة الزوجية على فترة متماثلة يساوي ضعف التكامل على نصف الفترة: \( 2 \times 5 = 10 \)."),

        (r"ما قيمة التكامل: \( \int \dfrac{2x}{x^2 + 1} \, dx \)؟<br><em>Evaluate integral where numerator is derivative of denominator.</em>",
         [r"\( \ln(x^2 + 1) + C \)", r"\( \dfrac{1}{x^2 + 1} + C \)", r"\( \arctan(x) + C \)", r"\( 2\ln(x^2 + 1) + C \)"], 0,
         r"بما أن البسط هو مشتقة المقام تماماً، فإن التكامل يساوي اللوغاريتم الطبيعي للمقام: \( \ln(x^2 + 1) + C \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^{\pi/2} \cos x \, dx \)؟<br><em>Evaluate \( \int_0^{\pi/2} \cos x dx \).</em>",
         ["1", "0", "-1", r"\( \dfrac{\pi}{2} \)"], 0,
         r"\( [\sin x]_0^{\pi/2} = \sin(\pi/2) - \sin(0) = 1 - 0 = 1 \)."),

        (r"إذا كانت دالة التسارع لجسيم هي \( a(t) = 4 \)، وكانت سرعته الابتدائية \( v(0) = 3 \)، فما سرعته عند \( t = 5 \)؟<br><em>Velocity at t = 5 given a(t) = 4 and v(0) = 3?</em>",
         ["23", "20", "15", "27"], 0,
         r"\( v(t) = \int 4 dt = 4t + C \). \( v(0) = 3 \implies C = 3 \). عند \( t = 5 \): \( v(5) = 4(5) + 3 = 23 \)."),

        (r"ما مساحة المنطقة المحصورة تحت منحنى \( y = 3x^2 \) من \( x = 1 \) إلى \( x = 2 \)؟<br><em>Area under \( y = 3x^2 \) from 1 to 2?</em>",
         ["7", "8", "6", "9"], 0,
         r"\( \int_1^2 3x^2 dx = \left[ x^3 \right]_1^2 = 8 - 1 = 7 \)."),

        (r"ما قيمة التكامل: \( \int (2x - 3)^5 \, dx \)؟<br><em>Evaluate \( \int (2x-3)^5 dx \).</em>",
         [r"\( \dfrac{(2x - 3)^6}{12} + C \)", r"\( \dfrac{(2x - 3)^6}{6} + C \)", r"\( \dfrac{(2x - 3)^6}{2} + C \)", r"\( 5(2x - 3)^4 + C \)"], 0,
         r"بالتعويض: \( \dfrac{(2x - 3)^6}{6 \times 2} + C = \dfrac{(2x - 3)^6}{12} + C \)."),

        (r"ما قيمة التكامل المحدد: \( \int_1^3 (x^2 - 1) \, dx \)؟<br><em>Evaluate \( \int_1^3 (x^2 - 1) dx \).</em>",
         [r"\( \dfrac{20}{3} \)", r"\( \dfrac{26}{3} \)", "6", "8"], 0,
         r"\( \left[ \dfrac{x^3}{3} - x \right]_1^3 = \left(\dfrac{27}{3} - 3\right) - \left(\dfrac{1}{3} - 1\right) = (9 - 3) - \left(-\dfrac{2}{3}\right) = 6 + \dfrac{2}{3} = \dfrac{20}{3} \)."),

        (r"ما مشتقة الدالة المعرفة بتكامل: \( F(x) = \int_1^x (t^2 + 5) \, dt \) حسب النظرية الأساسية في التفاضل والتكامل؟<br><em>Derivative of integral with variable upper limit?</em>",
         [r"\( x^2 + 5 \)", r"\( 2x \)", r"\( \dfrac{x^3}{3} + 5x \)", r"\( (x^2 + 5) - 6 \)"], 0,
         r"الجزء الأول من النظرية الأساسية في التفاضل والتكامل: \( \dfrac{d}{dx} \int_a^x f(t) dt = f(x) = x^2 + 5 \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^1 \dfrac{1}{1 + x^2} \, dx \)؟<br><em>Evaluate \( \int_0^1 \frac{1}{1+x^2} dx \).</em>",
         [r"\( \dfrac{\pi}{4} \)", r"\( \dfrac{\pi}{2} \)", "1", r"\( \ln 2 \)"], 0,
         r"الدالة الأصلية هي \( \arctan x \): \( [\arctan x]_0^1 = \arctan(1) - \arctan(0) = \dfrac{\pi}{4} - 0 = \dfrac{\pi}{4} \)."),

        (r"ما مساحة المنطقة المحصورة بين المنحنى \( y = 4 - x^2 \) ومحور السينات؟<br><em>Area under \( y = 4 - x^2 \) above x-axis?</em>",
         [r"\( \dfrac{32}{3} \)", r"\( \dfrac{16}{3} \)", "8", "16"], 0,
         r"نقاط التقاطع مع المحور السيني: \( 4 - x^2 = 0 \implies x = \pm 2 \). \( \text{المساحة} = \int_{-2}^2 (4 - x^2) dx = 2 \left[ 4x - \dfrac{x^3}{3} \right]_0^2 = 2 \left(8 - \dfrac{8}{3}\right) = 2 \times \dfrac{16}{3} = \dfrac{32}{3} \)."),

        (r"ما قيمة التكامل: \( \int \sin(2x) \, dx \)؟<br><em>Evaluate \( \int \sin(2x) dx \).</em>",
         [r"\( -\dfrac{1}{2}\cos(2x) + C \)", r"\( \dfrac{1}{2}\cos(2x) + C \)", r"\( -2\cos(2x) + C \)", r"\( 2\cos(2x) + C \)"], 0,
         r"\( \int \sin(kx) dx = -\dfrac{1}{k}\cos(kx) + C \implies -\dfrac{1}{2}\cos(2x) + C \)."),

        (r"إذا كان \( \int_1^4 f(x) \, dx = 8 \)، فما قيمة \( \int_1^4 3f(x) \, dx \)؟<br><em>Constant multiple property of integrals?</em>",
         ["24", "8", "11", "12"], 0,
         r"نخرج الثابت 3 خارج التكامل: \( 3 \int_1^4 f(x) dx = 3(8) = 24 \)."),

        (r"ما مساحة المنطقة المحددة بالمنحنى \( y = e^x \) ومحور السينات على الفترة \( [0, 1] \)؟<br><em>Area under \( y = e^x \) on [0, 1]?</em>",
         [r"\( e - 1 \)", r"\( e \)", r"\( e + 1 \)", "1"], 0,
         r"\( \int_0^1 e^x dx = [e^x]_0^1 = e^1 - e^0 = e - 1 \)."),

        (r"ما قيمة التكامل المحدد: \( \int_1^e \dfrac{1}{x} \, dx \)؟<br><em>Evaluate \( \int_1^e \frac{1}{x} dx \).</em>",
         ["1", "e", "0", r"\( e - 1 \)"], 0,
         r"\( [\ln x]_1^e = \ln e - \ln 1 = 1 - 0 = 1 \)."),

        (r"إذا كان معدل التغير لدالة هو \( f'(x) = 3x^2 - 2 \)، وكان المنحنى يمر بالنقطة \( (1, 4) \)، فما هي الدالة \( f(x) \)؟<br><em>Find f(x) passing through (1, 4).</em>",
         [r"\( f(x) = x^3 - 2x + 5 \)", r"\( f(x) = x^3 - 2x + 4 \)", r"\( f(x) = 3x^3 - 2x + 3 \)", r"\( f(x) = x^3 - 2x \)"], 0,
         r"\( f(x) = \int (3x^2 - 2) dx = x^3 - 2x + C \). عند \( (1, 4) \): \( 1 - 2 + C = 4 \implies -1 + C = 4 \implies C = 5 \)."),

        (r"ما قيمة التكامل: \( \int \dfrac{1}{\sqrt{x}} \, dx \)؟<br><em>Evaluate \( \int x^{-1/2} dx \).</em>",
         [r"\( 2\sqrt{x} + C \)", r"\( \sqrt{x} + C \)", r"\( \dfrac{1}{2\sqrt{x}} + C \)", r"\( \dfrac{2}{3}x^{3/2} + C \)"], 0,
         r"\( \int x^{-1/2} dx = \dfrac{x^{1/2}}{1/2} + C = 2\sqrt{x} + C \)."),

        (r"ما القيمة المتوسطة للدالة \( f(x) = x^2 \) على الفترة \( [0, 3] \)؟<br><em>Average value of \( x^2 \) on [0, 3]?</em>",
         ["3", "9", "1", "4.5"], 0,
         r"\( f_{avg} = \dfrac{1}{3 - 0} \int_0^3 x^2 dx = \dfrac{1}{3} \left[ \dfrac{x^3}{3} \right]_0^3 = \dfrac{1}{3}(9) = 3 \).")
    ]
    for text, ch, ans, sol in med_data:
        qs.append(make_q(d, "medium", text, ch, ans, sol))

    # ================= HARD (20 items) =================
    hard_data = [
        (r"ما قيمة التكامل المحدد: \( \int_0^1 x(1 - x^2)^4 \, dx \)؟<br><em>Evaluate \( \int_0^1 x(1-x^2)^4 dx \).</em>",
         [r"\( \dfrac{1}{10} \)", r"\( \dfrac{1}{5} \)", r"\( \dfrac{1}{8} \)", r"\( \dfrac{1}{20} \)"], 0,
         r"نضع \( u = 1 - x^2 \implies du = -2x dx \implies x dx = -\dfrac{1}{2} du \). عند \( x=0 \implies u=1 \)، وعند \( x=1 \implies u=0 \). التكامل: \( -\dfrac{1}{2} \int_1^0 u^4 du = \dfrac{1}{2} \int_0^1 u^4 du = \dfrac{1}{2} \left[\dfrac{u^5}{5}\right]_0^1 = \dfrac{1}{10} \)."),

        (r"ما مشتقة الدالة \( G(x) = \int_0^{x^2} \sin(t) \, dt \) بالنسبة إلى \( x \)؟<br><em>Derivative using Leibniz rule / chain rule?</em>",
         [r"\( 2x\sin(x^2) \)", r"\( \sin(x^2) \)", r"\( \cos(x^2) \)", r"\( 2x\cos(x^2) \)"], 0,
         r"بقاعدة السلسلة للنظرية الأساسية: \( G'(x) = \sin(x^2) \times \dfrac{d}{dx}(x^2) = 2x\sin(x^2) \)."),

        (r"ما مساحة المنطقة المحصورة بين المنحنيين \( y = x^2 \) و \( y = 2x - x^2 \)؟<br><em>Area enclosed by parabolas?</em>",
         [r"\( \dfrac{1}{3} \)", r"\( \dfrac{2}{3} \)", r"\( \dfrac{1}{6} \)", "1"], 0,
         r"نقاط التقاطع: \( x^2 = 2x - x^2 \implies 2x^2 - 2x = 0 \implies 2x(x - 1) = 0 \implies x = 0, 1 \). \( \text{المساحة} = \int_0^1 (2x - 2x^2) dx = \left[ x^2 - \dfrac{2x^3}{3} \right]_0^1 = 1 - \dfrac{2}{3} = \dfrac{1}{3} \)."),

        (r"ما قيمة التكامل: \( \int \tan x \, dx \)؟<br><em>Evaluate \( \int \tan x dx \).</em>",
         [r"\( \ln|\sec x| + C \)", r"\( \sec^2 x + C \)", r"\( -\ln|\sin x| + C \)", r"\( \ln|\cos x| + C \)"], 0,
         r"\( \int \dfrac{\sin x}{\cos x} dx = -\ln|\cos x| + C = \ln|\sec x| + C \)."),

        (r"ما قيمة التكامل المحدد: \( \int_1^2 \dfrac{2x + 1}{x^2 + x} \, dx \)؟<br><em>Evaluate integral where numerator is derivative of denominator.</em>",
         [r"\( \ln 3 \)", r"\( \ln 6 \)", r"\( \ln 2 \)", "1"], 0,
         r"\( \left[ \ln(x^2 + x) \right]_1^2 = \ln(4 + 2) - \ln(1 + 1) = \ln 6 - \ln 2 = \ln\left(\dfrac{6}{2}\right) = \ln 3 \)."),

        (r"ما حجم الجسم الدوراني الناتج عن دوران المنطقة المحصورة بين \( y = \sqrt{x} \) ومحور السينات على \( [0, 4] \) حول محور السينات؟<br><em>Volume of solid of revolution?</em>",
         [r"\( 8\pi \)", r"\( 16\pi \)", r"\( 4\pi \)", r"\( \dfrac{16\pi}{3} \)"], 0,
         r"طريقة الأقراص: \( V = \pi \int_0^4 (\sqrt{x})^2 dx = \pi \int_0^4 x dx = \pi \left[ \dfrac{x^2}{2} \right]_0^4 = \pi \left(\dfrac{16}{2}\right) = 8\pi \)."),

        (r"ما قيمة التكامل: \( \int x e^{x^2} \, dx \)؟<br><em>Evaluate \( \int x e^{x^2} dx \).</em>",
         [r"\( \dfrac{1}{2} e^{x^2} + C \)", r"\( e^{x^2} + C \)", r"\( 2e^{x^2} + C \)", r"\( \dfrac{1}{2} x^2 e^{x^2} + C \)"], 0,
         r"بالتعويض \( u = x^2 \implies du = 2x dx \implies \dfrac{1}{2} \int e^u du = \dfrac{1}{2} e^{x^2} + C \)."),

        (r"ما مساحة المنطقة المحصورة بين منحنى الدالة \( y = \cos x \) ومحور السينات من \( x = -\pi/2 \) إلى \( x = \pi/2 \)؟<br><em>Area under cosine between -pi/2 and pi/2?</em>",
         ["2", "0", "1", "4"], 0,
         r"الدالة موجبة على هذه الفترة: \( \int_{-\pi/2}^{\pi/2} \cos x dx = [\sin x]_{-\pi/2}^{\pi/2} = 1 - (-1) = 2 \)."),

        (r"إذا كان \( \int_0^k (2x - 3) \, dx = 4 \)، وكان \( k > 0 \)، فما قيمة \( k \)؟<br><em>Find positive k if integral equals 4.</em>",
         ["4", "3", "5", "2"], 0,
         r"\( \left[ x^2 - 3x \right]_0^k = k^2 - 3k = 4 \implies k^2 - 3k - 4 = 0 \implies (k - 4)(k + 1) = 0 \). بما أن \( k > 0 \)، فإن \( k = 4 \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^1 \dfrac{x}{\sqrt{x^2 + 3}} \, dx \)؟<br><em>Evaluate \( \int_0^1 \frac{x}{\sqrt{x^2+3}} dx \).</em>",
         [r"\( 2 - \sqrt{3} \)", r"\( \sqrt{3} - 1 \)", "1", r"\( \dfrac{1}{2} \)"], 0,
         r"الدالة الأصلية هي \( \sqrt{x^2 + 3} \): \( \left[ \sqrt{x^2 + 3} \right]_0^1 = \sqrt{1 + 3} - \sqrt{0 + 3} = \sqrt{4} - \sqrt{3} = 2 - \sqrt{3} \)."),

        (r"إذا كان \( F'(x) = f(x) \) وكان \( \int_1^3 f(x) \, dx = 7 \) وكان \( F(1) = 2 \)، فما قيمة \( F(3) \)؟<br><em>Find F(3) using Fundamental Theorem.</em>",
         ["9", "5", "-5", "14"], 0,
         r"\( \int_1^3 f(x) dx = F(3) - F(1) \implies 7 = F(3) - 2 \implies F(3) = 9 \)."),

        (r"ما قيمة التكامل: \( \int \sin^2 x \cos x \, dx \)؟<br><em>Evaluate \( \int \sin^2 x \cos x dx \).</em>",
         [r"\( \dfrac{\sin^3 x}{3} + C \)", r"\( \dfrac{\cos^3 x}{3} + C \)", r"\( \sin^3 x + C \)", r"\( -\dfrac{\sin^3 x}{3} + C \)"], 0,
         r"نضع \( u = \sin x \implies du = \cos x dx \). التكامل: \( \int u^2 du = \dfrac{u^3}{3} + C = \dfrac{\sin^3 x}{3} + C \)."),

        (r"ما قيمة التكامل المحدد: \( \int_{-1}^1 |x| \, dx \)؟<br><em>Evaluate integral of absolute value function.</em>",
         ["1", "2", "0", r"\( \dfrac{1}{2} \)"], 0,
         r"الدالة زوجية ومساحة مثلثين متطابقين قاعدتهما 1 وارتفاعهما 1: \( 2 \times \left(\dfrac{1}{2} \times 1 \times 1\right) = 1 \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^{\pi/4} \sec^2 x \, dx \)؟<br><em>Evaluate \( \int_0^{\pi/4} \sec^2 x dx \).</em>",
         ["1", "0", r"\( \sqrt{2} \)", r"\( \dfrac{\pi}{4} \)"], 0,
         r"\( [\tan x]_0^{\pi/4} = \tan(\pi/4) - \tan(0) = 1 - 0 = 1 \)."),

        (r"إذا كانت \( v(t) = 3t^2 - 12 \)، فما الإزاحة الكلية للجسيم من \( t = 0 \) إلى \( t = 3 \)؟<br><em>Displacement of particle from t = 0 to t = 3?</em>",
         ["-9", "9", "27", "0"], 0,
         r"الإزاحة هي التكامل المحدد للسرعة: \( \int_0^3 (3t^2 - 12) dt = \left[ t^3 - 12t \right]_0^3 = (27 - 36) - 0 = -9 \)."),

        (r"ما قيمة التكامل: \( \int \dfrac{e^{\sqrt{x}}}{\sqrt{x}} \, dx \)؟<br><em>Evaluate \( \int \frac{e^{\sqrt{x}}}{\sqrt{x}} dx \).</em>",
         [r"\( 2e^{\sqrt{x}} + C \)", r"\( e^{\sqrt{x}} + C \)", r"\( \dfrac{1}{2} e^{\sqrt{x}} + C \)", r"\( 2\sqrt{x} e^{\sqrt{x}} + C \)"], 0,
         r"نضع \( u = \sqrt{x} \implies du = \dfrac{1}{2\sqrt{x}} dx \implies \dfrac{1}{\sqrt{x}} dx = 2 du \). التكامل: \( 2e^{\sqrt{x}} + C \)."),

        (r"ما مساحة المنطقة المحصورة بين المنحنى \( y = x^3 \) ومحور السينات على الفترة \( [-1, 1] \)؟<br><em>Total geometric area (not net integral)?</em>",
         [r"\( \dfrac{1}{2} \)", "0", "1", r"\( \dfrac{1}{4} \)"], 0,
         r"المساحة الهندسية موجبة دائمًا وتساوي مجموع مساحتي الجزأين: \( 2 \int_0^1 x^3 dx = 2 \left[\dfrac{x^4}{4}\right]_0^1 = 2 \times \dfrac{1}{4} = \dfrac{1}{2} \)."),

        (r"ما قيمة التكامل: \( \int \dfrac{\ln x}{x} \, dx \)؟<br><em>Evaluate \( \int \frac{\ln x}{x} dx \).</em>",
         [r"\( \dfrac{(\ln x)^2}{2} + C \)", r"\( (\ln x)^2 + C \)", r"\( \dfrac{1}{x^2} + C \)", r"\( \ln(\ln x) + C \)"], 0,
         r"نضع \( u = \ln x \implies du = \dfrac{1}{x} dx \). التكامل: \( \int u du = \dfrac{u^2}{2} + C = \dfrac{(\ln x)^2}{2} + C \)."),

        (r"ما قيمة التكامل المحدد: \( \int_0^2 (x - 1)^3 \, dx \)؟<br><em>Evaluate \( \int_0^2 (x-1)^3 dx \).</em>",
         ["0", "1", "2", "-1"], 0,
         r"نضع \( u = x - 1 \). عند \( x=0 \implies u=-1 \)، وعند \( x=2 \implies u=1 \). تكامل \( u^3 \) على الفترة المتماثلة \( [-1, 1] \) يساوي 0 لأنها دالة فردية."),

        (r"إذا كان \( f(x) \geq 0 \) على \( [a, b] \) وكانت مساحة المنطقة تحت المنحنى تساوي \( A \)، فما قيمة مساحة المنطقة تحت منحنى الدالة \( 2f(x) \) على نفس الفترة؟<br><em>Effect of vertical scaling on area?</em>",
         ["2A", "A", "4A", r"\( A^2 \)"], 0,
         r"المساحة الجديدة: \( \int_a^b 2f(x) dx = 2 \int_a^b f(x) dx = 2A \).")
    ]
    for text, ch, ans, sol in hard_data:
        qs.append(make_q(d, "hard", text, ch, ans, sol))

    return qs

if __name__ == "__main__":
    qs = get_questions()
    from collections import Counter
    print("Integration generated:", Counter(q['difficulty'] for q in qs))
