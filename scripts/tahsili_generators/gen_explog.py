"""
scripts/tahsili_generators/gen_explog.py
Tahsili Exponentials & Logarithms generator:
- Definitions of logarithm: log_b(x) = y <=> b^y = x
- Logarithm and exponential properties: product, quotient, power, change of base
- Solving exponential equations (equal bases, quadratic form, substitution)
- Solving logarithmic equations and checking for extraneous solutions
- Domains, ranges, asymptotes, and transformations of exponential and logarithmic functions
- Natural logarithms (ln) and Euler's number e
- Exponential growth, decay, half-life, and logarithmic inequalities
"""

import sys
import os
sys.path.insert(0, os.path.abspath("."))
from scripts.tahsili_generators.common import make_q

def get_questions():
    d = "Exponentials & Logarithms"
    qs = []

    # ================= EASY (30 items) =================
    easy_data = [
        # 1. log2(16)
        (r"ما قيمة \( \log_2 16 \)؟<br><em>What is the value of \( \log_2 16 \)?</em>",
         ["4", "3", "5", "8"], 0,
         r"بما أن \( 2^4 = 16 \)، فإن \( \log_2 16 = 4 \)."),

        # 2. log3(27)
        (r"ما قيمة \( \log_3 27 \)؟<br><em>Evaluate \( \log_3 27 \).</em>",
         ["3", "9", "2", "4"], 0,
         r"بما أن \( 3^3 = 27 \)، فإن \( \log_3 27 = 3 \)."),

        # 3. log5(1)
        (r"ما قيمة \( \log_5 1 \)؟<br><em>Evaluate \( \log_5 1 \).</em>",
         ["0", "1", "5", "غير معرف"], 0,
         r"لوغاريتم العدد 1 لأي أساس موجب لا يساوي 1 هو صفر دائمًا لأن \( 5^0 = 1 \)."),

        # 4. log7(7)
        (r"ما قيمة \( \log_7 7 \)؟<br><em>Evaluate \( \log_7 7 \).</em>",
         ["1", "0", "7", "49"], 0,
         r"لوغاريتم الأساس لنفسه يساوي 1 دائمًا لأن \( 7^1 = 7 \)."),

        # 5. log10(1000)
        (r"ما قيمة اللوغاريتم العشري \( \log 1000 \)؟<br><em>Evaluate common logarithm \( \log 1000 \).</em>",
         ["3", "2", "4", "10"], 0,
         r"الأساس غير المكتوب هو 10، وبما أن \( 10^3 = 1000 \)، فالناتج هو 3."),

        # 6. ln(e)
        (r"ما قيمة اللوغاريتم الطبيعي \( \ln e \)؟<br><em>What is the value of \( \ln e \)?</em>",
         ["1", "0", "e", r"\( e^2 \)"], 0,
         r"\( \ln \) هو لوغاريتم للأساس \( e \)، وبما أن الأساس لنفسه يساوي 1، فإن \( \ln e = 1 \)."),

        # 7. ln(1)
        (r"ما قيمة \( \ln 1 \)؟<br><em>Evaluate \( \ln 1 \).</em>",
         ["0", "1", "-1", "e"], 0,
         r"لوغاريتم 1 لأي أساس هو صفر، لذا \( \ln 1 = 0 \)."),

        # 8. log4(1/16)
        (r"ما قيمة \( \log_4 \left(\dfrac{1}{16}\right) \)؟<br><em>Evaluate \( \log_4 (1/16) \).</em>",
         ["-2", "2", "-4", r"\( -\dfrac{1}{2} \)"], 0,
         r"\( \dfrac{1}{16} = 4^{-2} \)، وبالتالي \( \log_4 (4^{-2}) = -2 \)."),

        # 9. Exponential to Logarithmic form
        (r"الصورة اللوغاريتمية للمعادلة الأسية \( 2^5 = 32 \) هي:<br><em>Logarithmic form of \( 2^5 = 32 \)?</em>",
         [r"\( \log_2 32 = 5 \)", r"\( \log_5 32 = 2 \)", r"\( \log_{32} 2 = 5 \)", r"\( \log_2 5 = 32 \)"], 0,
         r"وفق تعريف اللوغاريتم: إذا كان \( b^y = x \)، فإن \( \log_b x = y \). هنا \( \log_2 32 = 5 \)."),

        # 10. Logarithmic to Exponential form
        (r"الصورة الأسية للمعادلة اللوغاريتمية \( \log_3 x = 4 \) هي:<br><em>Exponential form of \( \log_3 x = 4 \)?</em>",
         [r"\( 3^4 = x \)", r"\( 4^3 = x \)", r"\( x^4 = 3 \)", r"\( x^3 = 4 \)"], 0,
         r"الأساس 3 مرفوع للناتج 4 يساوي القيمة \( x \)، أي \( 3^4 = x \)."),

        # 11. Domain of f(x) = log_2(x)
        (r"مجال الدالة \( f(x) = \log_2 x \) هو:<br><em>Domain of \( f(x) = \log_2 x \)?</em>",
         [r"\( (0, \infty) \)", r"\( [0, \infty) \)", r"\( \mathbb{R} \)", r"\( (-\infty, 0) \)"], 0,
         r"اللوغاريتم معرف فقط للأعداد الحقيقية الموجبة تمامًا: \( x > 0 \)، أي المجال هو \( (0, \infty) \)."),

        # 12. Range of f(x) = 2^x
        (r"مدى الدالة الأسية \( f(x) = 2^x \) هو:<br><em>Range of exponential function \( f(x) = 2^x \)?</em>",
         [r"\( (0, \infty) \)", r"\( [0, \infty) \)", r"\( \mathbb{R} \)", r"\( (-\infty, 0) \)"], 0,
         r"قيم الدالة الأسية \( b^x \) (حيث \( b > 0 \)) موجبة دائمًا ولا تساوي صفرًا، فالمدى هو \( (0, \infty) \)."),

        # 13. Horizontal asymptote of y = 3^x
        (r"خط التقارب الأفقي لمنحنى الدالة \( f(x) = 3^x \) هو:<br><em>Horizontal asymptote of \( f(x) = 3^x \)?</em>",
         [r"\( y = 0 \)", r"\( x = 0 \)", r"\( y = 1 \)", r"\( x = 3 \)"], 0,
         r"منحنى الدالة الأسية يقترب من محور السينات عندما \( x \to -\infty \)، لذا خط التقارب الأفقي هو \( y = 0 \)."),

        # 14. Vertical asymptote of y = log_3(x)
        (r"خط التقارب الرأسي لمنحنى الدالة \( f(x) = \log_3 x \) هو:<br><em>Vertical asymptote of \( f(x) = \log_3 x \)?</em>",
         [r"\( x = 0 \)", r"\( y = 0 \)", r"\( x = 1 \)", r"\( y = 3 \)"], 0,
         r"منحنى دالة اللوغاريتم يقترب من محور الصادات عندما \( x \to 0^+ \)، لذا خط التقارب الرأسي هو \( x = 0 \)."),

        # 15. y-intercept of y = 5^x
        (r"المقطع الصادي لمنحنى الدالة \( f(x) = 5^x \) هو:<br><em>y-intercept of \( f(x) = 5^x \)?</em>",
         ["1", "5", "0", "غير موجود"], 0,
         r"عند \( x = 0 \): \( f(0) = 5^0 = 1 \). إذن المقطع الصادي هو 1."),

        # 16. x-intercept of y = log_5(x)
        (r"المقطع السيني لمنحنى الدالة \( f(x) = \log_5 x \) هو:<br><em>x-intercept of \( f(x) = \log_5 x \)?</em>",
         ["1", "5", "0", "غير موجود"], 0,
         r"نضع \( \log_5 x = 0 \implies x = 5^0 = 1 \). إذن المقطع السيني هو 1."),

        # 17. Base property b^(log_b x)
        (r"ما قيمة المقدار \( 4^{\log_4 9} \)؟<br><em>Evaluate \( 4^{\log_4 9} \).</em>",
         ["9", "4", "3", "36"], 0,
         r"من خواص الدالة العكسية للوغاريتمات: \( b^{\log_b x} = x \)، إذن \( 4^{\log_4 9} = 9 \)."),

        # 18. log_b(b^x)
        (r"ما قيمة المقدار \( \log_6 (6^5) \)؟<br><em>Evaluate \( \log_6 (6^5) \).</em>",
         ["5", "6", "1", "30"], 0,
         r"من خواص اللوغاريتمات: \( \log_b (b^k) = k \)، إذن الناتج هو 5."),

        # 19. Product rule basic
        (r"المقدار \( \log_b x + \log_b y \) يكافئ:<br><em>Simplify \( \log_b x + \log_b y \).</em>",
         [r"\( \log_b (xy) \)", r"\( \log_b (x+y) \)", r"\( \log_b (x/y) \)", r"\( (\log_b x)(\log_b y) \)"], 0,
         r"خاصية الضرب في اللوغاريتمات: مجموع لوغاريتمين بنفس الأساس يساوي لوغاريتم حاصل ضربهما: \( \log_b (xy) \)."),

        # 20. Quotient rule basic
        (r"المقدار \( \log_b x - \log_b y \) يكافئ:<br><em>Simplify \( \log_b x - \log_b y \).</em>",
         [r"\( \log_b \left(\dfrac{x}{y}\right) \)", r"\( \log_b (x-y) \)", r"\( \dfrac{\log_b x}{\log_b y} \)", r"\( \log_b (xy) \)"], 0,
         r"خاصية القسمة في اللوغاريتمات: فرق لوغاريتمين يساوي لوغاريتم ناتج القسمة: \( \log_b (x/y) \)."),

        # 21. Power rule basic
        (r"المقدار \( \log_b (x^3) \) يكافئ:<br><em>Simplify \( \log_b (x^3) \).</em>",
         [r"\( 3\log_b x \)", r"\( (\log_b x)^3 \)", r"\( 3 + \log_b x \)", r"\( \log_b 3x \)"], 0,
         r"خاصية القوة في اللوغاريتمات: \( \log_b (x^k) = k \log_b x \)، إذن الناتج \( 3\log_b x \)."),

        # 22. Growth vs decay
        ("أي من الدوال التالية تمثل دالة اضمحلال أسي؟<br><em>Which function represents exponential decay?</em>",
         [r"\( f(x) = \left(\dfrac{1}{3}\right)^x \)", r"\( f(x) = 3^x \)", r"\( f(x) = (1.5)^x \)", r"\( f(x) = 2^x \)"], 0,
         r"تمثل الدالة اضمحلالاً أسيًا إذا كان أساسها \( 0 < b < 1 \). هنا \( \dfrac{1}{3} \) بين 0 و 1."),

        # 23. Exponential growth condition
        (r"تمثل الدالة \( f(x) = a \cdot b^x \) دالة نمو أسي إذا كان \( a > 0 \) و:<br><em>Condition for exponential growth?</em>",
         [r"\( b > 1 \)", r"\( 0 < b < 1 \)", r"\( b < 0 \)", r"\( b = 1 \)"], 0,
         r"تكون الدالة دالة نمو أسي عندما يكون الأساس \( b > 1 \)."),

        # 24. e^(ln 7)
        (r"ما قيمة المقدار \( e^{\ln 7} \)؟<br><em>Evaluate \( e^{\ln 7} \).</em>",
         ["7", "e", r"\( 7e \)", "1"], 0,
         r"الدالة الأسية الطبيعية والدالة اللوغاريتمية الطبيعية دالتان عكسيتان: \( e^{\ln x} = x \)، لذا \( e^{\ln 7} = 7 \)."),

        # 25. ln(e^4)
        (r"ما قيمة المقدار \( \ln(e^4) \)؟<br><em>Evaluate \( \ln(e^4) \).</em>",
         ["4", "e", "1", r"\( 4e \)"], 0,
         r"\( \ln(e^k) = k \)، إذن \( \ln(e^4) = 4 \)."),

        # 26. Simple exponential equation 2^x = 8
        (r"ما حل المعادلة \( 2^x = 8 \)؟<br><em>Solve \( 2^x = 8 \).</em>",
         ["3", "4", "2", "1"], 0,
         r"\( 8 = 2^3 \)، بما أن الأساسين متساويان فإن الأسين متساويان: \( x = 3 \)."),

        # 27. Simple exponential equation 3^(x-1) = 9
        (r"ما حل المعادلة \( 3^{x-1} = 9 \)؟<br><em>Solve \( 3^{x-1} = 9 \).</em>",
         ["3", "2", "4", "1"], 0,
         r"\( 9 = 3^2 \implies x - 1 = 2 \implies x = 3 \)."),

        # 28. Simple log equation log_2(x) = 5
        (r"إذا كان \( \log_2 x = 5 \)، فما قيمة \( x \)؟<br><em>If \( \log_2 x = 5 \), what is \( x \)?</em>",
         ["32", "25", "10", "64"], 0,
         r"بالتحويل للصورة الأسية: \( x = 2^5 = 32 \)."),

        # 29. log_b(sqrt(b))
        (r"ما قيمة \( \log_b \sqrt{b} \) حيث \( b > 0, b \ne 1 \)؟<br><em>Evaluate \( \log_b \sqrt{b} \).</em>",
         [r"\( \dfrac{1}{2} \)", "2", "1", r"\( \dfrac{1}{4} \)"], 0,
         r"\( \sqrt{b} = b^{1/2} \)، إذن \( \log_b (b^{1/2}) = \dfrac{1}{2} \)."),

        # 30. Domain of f(x) = log(x - 3)
        (r"مجال الدالة \( f(x) = \log_4 (x - 3) \) هو:<br><em>Domain of \( f(x) = \log_4 (x - 3) \)?</em>",
         [r"\( (3, \infty) \)", r"\( [3, \infty) \)", r"\( (-\infty, 3) \)", r"\( \mathbb{R} \)"], 0,
         r"يجب أن يكون ما بداخل اللوغاريتم موجبًا تمامًا: \( x - 3 > 0 \implies x > 3 \)، أي \( (3, \infty) \).")
    ]

    for item in easy_data:
        qs.append(make_q(d, "easy", item[0], item[1], item[2], item[3]))

    # ================= MEDIUM (50 items) =================
    med_data = [
        # 1. 2^(x+1) = 16
        (r"ما حل المعادلة \( 2^{x+1} = 16 \)؟<br><em>Solve \( 2^{x+1} = 16 \).</em>",
         ["3", "4", "2", "5"], 0,
         r"\( 16 = 2^4 \implies x + 1 = 4 \implies x = 3 \)."),

        # 2. 3^(2x - 1) = 27
        (r"ما حل المعادلة \( 3^{2x-1} = 27 \)؟<br><em>Solve \( 3^{2x-1} = 27 \).</em>",
         ["2", "3", "1", "4"], 0,
         r"\( 27 = 3^3 \implies 2x - 1 = 3 \implies 2x = 4 \implies x = 2 \)."),

        # 3. 4^(x-1) = 2^(x+4)
        (r"ما حل المعادلة \( 4^{x-1} = 2^{x+4} \)؟<br><em>Solve \( 4^{x-1} = 2^{x+4} \).</em>",
         ["6", "5", "4", "3"], 0,
         r"نوحد الأساسات: \( 4 = 2^2 \implies 2^{2(x-1)} = 2^{x+4} \implies 2x - 2 = x + 4 \implies x = 6 \)."),

        # 4. 9^x = 3^(x+3)
        (r"ما حل المعادلة \( 9^x = 3^{x+3} \)؟<br><em>Solve \( 9^x = 3^{x+3} \).</em>",
         ["3", "1", "2", "6"], 0,
         r"\( 9^x = (3^2)^x = 3^{2x} \implies 2x = x + 3 \implies x = 3 \)."),

        # 5. 5^(x-2) = 1/25
        (r"ما حل المعادلة \( 5^{x-2} = \dfrac{1}{25} \)؟<br><em>Solve \( 5^{x-2} = \dfrac{1}{25} \).</em>",
         ["0", "4", "-2", "1"], 0,
         r"\( \dfrac{1}{25} = 5^{-2} \implies x - 2 = -2 \implies x = 0 \)."),

        # 6. log2(6) + log2(4/3)
        (r"ما قيمة المقدار \( \log_2 6 + \log_2 \left(\dfrac{4}{3}\right) \)؟<br><em>Evaluate \( \log_2 6 + \log_2(4/3) \).</em>",
         ["3", "4", "2", "8"], 0,
         r"باستخدام خاصية الضرب: \( \log_2 \left(6 \cdot \dfrac{4}{3}\right) = \log_2 8 = 3 \)."),

        # 7. log3(54) - log3(2)
        (r"ما قيمة المقدار \( \log_3 54 - \log_3 2 \)؟<br><em>Evaluate \( \log_3 54 - \log_3 2 \).</em>",
         ["3", "27", "2", "9"], 0,
         r"باستخدام خاصية القسمة: \( \log_3 \left(\dfrac{54}{2}\right) = \log_3 27 = 3 \)."),

        # 8. 2 log_5(x) - log_5(y)
        (r"المقدار \( 2\log_5 x - \log_5 y \) يكافئ في صورة لوغاريتم واحد:<br><em>Condense \( 2\log_5 x - \log_5 y \).</em>",
         [r"\( \log_5 \left(\dfrac{x^2}{y}\right) \)", r"\( \log_5 \left(\dfrac{2x}{y}\right) \)", r"\( \log_5 (x^2 - y) \)", r"\( \dfrac{\log_5 x^2}{\log_5 y} \)"], 0,
         r"\( 2\log_5 x = \log_5 (x^2) \). ثم بالقسمة: \( \log_5 \left(\dfrac{x^2}{y}\right) \)."),

        # 9. 3 log a + 2 log b
        (r"أي من المقادير التالية يكافئ \( 3\log a + 2\log b \)؟<br><em>Condense \( 3\log a + 2\log b \).</em>",
         [r"\( \log (a^3 b^2) \)", r"\( \log (3a + 2b) \)", r"\( \log (a^3 + b^2) \)", r"\( 6\log (ab) \)"], 0,
         r"نرفع المعاملات كأسس: \( \log (a^3) + \log (b^2) = \log (a^3 b^2) \)."),

        # 10. log_4(2x - 1) = 2
        (r"ما حل المعادلة اللوغاريتمية \( \log_4 (2x - 1) = 2 \)؟<br><em>Solve \( \log_4 (2x - 1) = 2 \).</em>",
         [r"\( \dfrac{17}{2} \)", "8", "9", r"\( \dfrac{15}{2} \)"], 0,
         r"نحول للصورة الأسية: \( 2x - 1 = 4^2 = 16 \implies 2x = 17 \implies x = \dfrac{17}{2} \)."),

        # 11. log_2(x + 3) = 4
        (r"ما حل المعادلة \( \log_2 (x + 3) = 4 \)؟<br><em>Solve \( \log_2 (x + 3) = 4 \).</em>",
         ["13", "16", "11", "19"], 0,
         r"\( x + 3 = 2^4 = 16 \implies x = 16 - 3 = 13 \)."),

        # 12. log_3(x) + log_3(2) = log_3(18)
        (r"ما قيمة \( x \) في المعادلة \( \log_3 x + \log_3 2 = \log_3 18 \)؟<br><em>Solve \( \log_3 x + \log_3 2 = \log_3 18 \).</em>",
         ["9", "16", "8", "6"], 0,
         r"\( \log_3 (2x) = \log_3 18 \implies 2x = 18 \implies x = 9 \)."),

        # 13. log_5(x^2 - 11) = 2
        (r"ما حلول المعادلة \( \log_5 (x^2 - 11) = 2 \)؟<br><em>Solve \( \log_5 (x^2 - 11) = 2 \).</em>",
         [r"\( \pm 6 \)", r"\( 6 \)", r"\( \pm 5 \)", r"\( \pm 4 \)"], 0,
         r"\( x^2 - 11 = 5^2 = 25 \implies x^2 = 36 \implies x = \pm 6 \). كلا الحلين يعطي قيمة موجبة داخل اللوغاريتم."),

        # 14. Change of base formula
        (r"باستخدام صيغة تغيير الأساس، يمكن كتابة \( \log_3 7 \) على الصورة:<br><em>Using change of base, \( \log_3 7 \) equals:</em>",
         [r"\( \dfrac{\log 7}{\log 3} \)", r"\( \dfrac{\log 3}{\log 7} \)", r"\( \log \left(\dfrac{7}{3}\right) \)", r"\( \log 7 - \log 3 \)"], 0,
         r"صيغة تغيير الأساس تنص على: \( \log_b a = \dfrac{\log a}{\log b} = \dfrac{\log 7}{\log 3} \)."),

        # 15. Change of base evaluation log_2(3) * log_3(8)
        (r"ما قيمة المقدار \( \log_2 3 \cdot \log_3 8 \)؟<br><em>Evaluate \( \log_2 3 \cdot \log_3 8 \).</em>",
         ["3", "4", "2", "6"], 0,
         r"بتغيير الأساس إلى الأساس الطبيعي أو العشري: \( \dfrac{\log 3}{\log 2} \cdot \dfrac{\log 8}{\log 3} = \dfrac{\log 8}{\log 2} = \log_2 8 = 3 \)."),

        # 16. e^(2x - 3) = 1
        (r"ما حل المعادلة \( e^{2x - 3} = 1 \)؟<br><em>Solve \( e^{2x - 3} = 1 \).</em>",
         [r"\( \dfrac{3}{2} \)", "3", "0", "1"], 0,
         r"بما أن \( e^0 = 1 \)، فإن \( 2x - 3 = 0 \implies 2x = 3 \implies x = \dfrac{3}{2} \)."),

        # 17. ln(x - 2) = 1
        (r"ما حل المعادلة \( \ln (x - 2) = 1 \)؟<br><em>Solve \( \ln (x - 2) = 1 \).</em>",
         [r"\( e + 2 \)", r"\( e - 2 \)", r"\( 3 \)", r"\( e^2 \)"], 0,
         r"نحول للصورة الأسية: \( x - 2 = e^1 \implies x = e + 2 \)."),

        # 18. ln(x) + ln(3) = ln(12)
        (r"إذا كان \( \ln x + \ln 3 = \ln 12 \)، فإن \( x \) يساوي:<br><em>If \( \ln x + \ln 3 = \ln 12 \), then x = ?</em>",
         ["4", "9", "36", "6"], 0,
         r"\( \ln(3x) = \ln 12 \implies 3x = 12 \implies x = 4 \)."),

        # 19. Range of f(x) = 3^x + 4
        (r"مدى الدالة \( f(x) = 3^x + 4 \) هو:<br><em>Range of \( f(x) = 3^x + 4 \)?</em>",
         [r"\( (4, \infty) \)", r"\( [4, \infty) \)", r"\( (0, \infty) \)", r"\( \mathbb{R} \)"], 0,
         r"بما أن مدى \( 3^x \) هو \( (0, \infty) \)، فإن إضافة 4 يزيح المنحنى للأعلى بمقدار 4، فالمدى هو \( (4, \infty) \)."),

        # 20. Horizontal asymptote of f(x) = 2^(x-1) - 5
        (r"معادلة خط التقارب الأفقي لمنحنى الدالة \( f(x) = 2^{x-1} - 5 \) هي:<br><em>Horizontal asymptote of \( f(x) = 2^{x-1} - 5 \)?</em>",
         [r"\( y = -5 \)", r"\( y = 5 \)", r"\( x = 1 \)", r"\( y = 0 \)"], 0,
         r"خط التقارب الأفقي يتبع الإزاحة الرأسية، إذن \( y = -5 \)."),

        # 21. Vertical asymptote of f(x) = log_2(x + 4)
        (r"معادلة خط التقارب الرأسي لمنحنى الدالة \( f(x) = \log_2 (x + 4) \) هي:<br><em>Vertical asymptote of \( f(x) = \log_2 (x + 4) \)?</em>",
         [r"\( x = -4 \)", r"\( x = 4 \)", r"\( y = -4 \)", r"\( x = 0 \)"], 0,
         r"نجعل ما بداخل اللوغاريتم مساويًا للصفر: \( x + 4 = 0 \implies x = -4 \)."),

        # 22. Domain of f(x) = log_3(2x - 8)
        (r"مجال الدالة \( f(x) = \log_3 (2x - 8) \) هو:<br><em>Domain of \( f(x) = \log_3 (2x - 8) \)?</em>",
         [r"\( (4, \infty) \)", r"\( [4, \infty) \)", r"\( (8, \infty) \)", r"\( (-\infty, 4) \)"], 0,
         r"\( 2x - 8 > 0 \implies 2x > 8 \implies x > 4 \)، أي \( (4, \infty) \)."),

        # 23. Inverse of f(x) = 3^x
        (r"الدالة العكسية للدالة \( f(x) = 3^x \) هي:<br><em>Inverse of \( f(x) = 3^x \)?</em>",
         [r"\( f^{-1}(x) = \log_3 x \)", r"\( f^{-1}(x) = 3^{-x} \)", r"\( f^{-1}(x) = \log_x 3 \)", r"\( f^{-1}(x) = \sqrt[3]{x} \)"], 0,
         r"الدالة العكسية للدالة الأسية ذات الأساس 3 هي دالة اللوغاريتم للأساس نفسه: \( f^{-1}(x) = \log_3 x \)."),

        # 24. Inverse of f(x) = log_5(x)
        (r"الدالة العكسية للدالة \( f(x) = \log_5 x \) هي:<br><em>Inverse of \( f(x) = \log_5 x \)?</em>",
         [r"\( f^{-1}(x) = 5^x \)", r"\( f^{-1}(x) = x^5 \)", r"\( f^{-1}(x) = 5^{-x} \)", r"\( f^{-1}(x) = \dfrac{1}{\log_5 x} \)"], 0,
         r"عكس اللوغاريتم هو الدالة الأسية: \( y = \log_5 x \iff x = 5^y \implies f^{-1}(x) = 5^x \)."),

        # 25. Exponential inequality 2^x >= 16
        (r"مجموعة حل المتباينة الأسية \( 2^x \ge 16 \) هي:<br><em>Solution set of \( 2^x \ge 16 \)?</em>",
         [r"\( [4, \infty) \)", r"\( (4, \infty) \)", r"\( (-\infty, 4] \)", r"\( [8, \infty) \)"], 0,
         r"\( 16 = 2^4 \). بما أن الأساس \( 2 > 1 \)، فإن اتجاه المتباينة لا يتغير: \( x \ge 4 \)، أي \( [4, \infty) \)."),

        # 26. Exponential inequality (1/3)^x < 9
        (r"مجموعة حل المتباينة \( \left(\dfrac{1}{3}\right)^x < 9 \) هي:<br><em>Solution of \( (1/3)^x < 9 \)?</em>",
         [r"\( (-2, \infty) \)", r"\( (-\infty, -2) \)", r"\( (2, \infty) \)", r"\( (-\infty, 2) \)"], 0,
         r"\( 3^{-x} < 3^2 \implies -x < 2 \implies x > -2 \)، إذن الحل هو \( (-2, \infty) \)."),

        # 27. Log inequality log_2(x) < 3
        (r"مجموعة حل المتباينة اللوغاريتمية \( \log_2 x < 3 \) هي:<br><em>Solution of \( \log_2 x < 3 \)?</em>",
         [r"\( (0, 8) \)", r"\( (-\infty, 8) \)", r"\( (0, 6) \)", r"\( [0, 8) \)"], 0,
         r"من شرط المجال \( x > 0 \)، ومن المتباينة \( x < 2^3 = 8 \). بالتقاطع نحصل على \( (0, 8) \)."),

        # 28. Half-life model basic
        (r"إذا كانت المادة المشعة تتناقص وفق الدالة \( N(t) = 100 \left(\dfrac{1}{2}\right)^{t/10} \) حيث \( t \) بالسنوات، فما الكمية المتبقية بعد 20 سنة؟<br><em>Amount remaining after 20 years?</em>",
         ["25", "50", "12.5", "10"], 0,
         r"نعوض \( t = 20 \): \( N(20) = 100 \left(\dfrac{1}{2}\right)^{20/10} = 100 \left(\dfrac{1}{2}\right)^2 = 100 \cdot \dfrac{1}{4} = 25 \)."),

        # 29. Bacteria growth model
        (r"تتضاعف عينة بكتيريا كل ساعة وفق الدالة \( B(t) = 50 \cdot 2^t \). كم يصبح عددها بعد 4 ساعات؟<br><em>Bacteria count after 4 hours?</em>",
         ["800", "400", "200", "1600"], 0,
         r"\( B(4) = 50 \cdot 2^4 = 50 \cdot 16 = 800 \)."),

        # 30. log_sqrt(2) (8)
        (r"ما قيمة \( \log_{\sqrt{2}} 8 \)؟<br><em>Evaluate \( \log_{\sqrt{2}} 8 \).</em>",
         ["6", "3", "4", "8"], 0,
         r"\( \sqrt{2} = 2^{1/2} \) و \( 8 = 2^3 \). إذن \( \log_{2^{1/2}} (2^3) = \dfrac{3}{1/2} = 6 \)."),

        # 31. log_27(9)
        (r"ما قيمة \( \log_{27} 9 \)؟<br><em>Evaluate \( \log_{27} 9 \).</em>",
         [r"\( \dfrac{2}{3} \)", r"\( \dfrac{3}{2} \)", r"\( \dfrac{1}{3} \)", "3"], 0,
         r"\( 27 = 3^3 \) و \( 9 = 3^2 \). إذن \( \log_{3^3} (3^2) = \dfrac{2}{3} \)."),

        # 32. 8^(2x) = 4^(x+4)
        (r"ما حل المعادلة \( 8^{2x} = 4^{x+4} \)؟<br><em>Solve \( 8^{2x} = 4^{x+4} \).</em>",
         ["2", "3", "1", "4"], 0,
         r"\( (2^3)^{2x} = (2^2)^{x+4} \implies 2^{6x} = 2^{2x+8} \implies 6x = 2x + 8 \implies 4x = 8 \implies x = 2 \)."),

        # 33. log(x) + log(x - 3) = 1
        (r"ما حل المعادلة اللوغاريتمية \( \log x + \log (x - 3) = 1 \)؟<br><em>Solve \( \log x + \log (x - 3) = 1 \).</em>",
         ["5", "2", "-2", "10"], 0,
         r"\( \log [x(x-3)] = 1 \implies x^2 - 3x = 10 \implies x^2 - 3x - 10 = 0 \implies (x-5)(x+2) = 0 \). نرفض \( x = -2 \) لأنه يجعل ما بداخل اللوغاريتم سالبًا، إذن \( x = 5 \)."),

        # 34. log_2(x^2 - 4) - log_2(x + 2) = 3
        (r"ما حل المعادلة \( \log_2 (x^2 - 4) - \log_2 (x + 2) = 3 \)؟<br><em>Solve \( \log_2 (x^2 - 4) - \log_2 (x + 2) = 3 \).</em>",
         ["10", "8", "6", "12"], 0,
         r"\( \log_2 \left(\dfrac{x^2 - 4}{x+2}\right) = 3 \implies \log_2 (x - 2) = 3 \implies x - 2 = 2^3 = 8 \implies x = 10 \)."),

        # 35. 2^(x^2) = 16
        (r"ما مجموعة حلول المعادلة \( 2^{x^2} = 16 \)؟<br><em>Solve \( 2^{x^2} = 16 \).</em>",
         [r"\( \{-2, 2\} \)", r"\( \{4\} \)", r"\( \{-4, 4\} \)", r"\( \{2\} \)"], 0,
         r"\( 16 = 2^4 \implies x^2 = 4 \implies x = \pm 2 \)."),

        # 36. 3^(x^2 - 3x) = 1/9
        (r"ما حلول المعادلة \( 3^{x^2 - 3x} = \dfrac{1}{9} \)؟<br><em>Solve \( 3^{x^2 - 3x} = 1/9 \).</em>",
         [r"\( \{1, 2\} \)", r"\( \{-1, -2\} \)", r"\( \{2, 3\} \)", r"\( \{-1, 2\} \)"], 0,
         r"\( \dfrac{1}{9} = 3^{-2} \implies x^2 - 3x = -2 \implies x^2 - 3x + 2 = 0 \implies (x-1)(x-2) = 0 \implies x \in \{1, 2\} \)."),

        # 37. log_b(x) = 2 and log_b(y) = 3 => log_b(x^3 y)
        (r"إذا كان \( \log_b x = 2 \) و \( \log_b y = 3 \)، فما قيمة \( \log_b (x^3 y) \)؟<br><em>Find \( \log_b (x^3 y) \) given values.</em>",
         ["9", "18", "11", "8"], 0,
         r"\( \log_b (x^3 y) = 3\log_b x + \log_b y = 3(2) + 3 = 6 + 3 = 9 \)."),

        # 38. log_b(sqrt(x) / y)
        (r"إذا كان \( \log_b x = 6 \) و \( \log_b y = 2 \)، فما قيمة \( \log_b \left(\dfrac{\sqrt{x}}{y}\right) \)؟<br><em>Find \( \log_b (\sqrt{x}/y) \).</em>",
         ["1", "2", "3", "0"], 0,
         r"\( \log_b \left(\dfrac{\sqrt{x}}{y}\right) = \dfrac{1}{2}\log_b x - \log_b y = \dfrac{1}{2}(6) - 2 = 3 - 2 = 1 \)."),

        # 39. Transformation of f(x) = 2^x to g(x) = 2^(x-3) + 1
        (r"الدالة \( g(x) = 2^{x-3} + 1 \) تمثل إزاحة لمنحنى \( f(x) = 2^x \) بمقدار:<br><em>Transformations from \( 2^x \) to \( 2^{x-3} + 1 \)?</em>",
         ["3 وحدات لليمين ووحدة للأعلى", "3 وحدات لليسار ووحدة للأعلى", "3 وحدات لليمين ووحدة للأسفل", "3 وحدات لليسار ووحدة للأسفل"], 0,
         r"\( x - 3 \) تعني إزاحة أفقية 3 وحدات لليمين، و \( + 1 \) تعني إزاحة رأسية وحدة واحدة للأعلى."),

        # 40. Reflection of f(x) = log_2(x) across x-axis
        (r"معادلة الدالة الناتجة عن انعكاس منحنى \( f(x) = \log_2 x \) حول محور السينات هي:<br><em>Reflection of \( \log_2 x \) across x-axis?</em>",
         [r"\( g(x) = -\log_2 x \)", r"\( g(x) = \log_2 (-x) \)", r"\( g(x) = \log_{1/2} (-x) \)", r"\( g(x) = 2^{-x} \)"], 0,
         r"الانعكاس حول محور السينات يغير إشارة الدالة بأكملها: \( g(x) = -f(x) = -\log_2 x \)."),

        # 41. log_8(4)
        (r"ما قيمة \( \log_8 4 \)؟<br><em>Evaluate \( \log_8 4 \).</em>",
         [r"\( \dfrac{2}{3} \)", "2", r"\( \dfrac{1}{2} \)", r"\( \dfrac{3}{2} \)"], 0,
         r"\( 8 = 2^3 \) و \( 4 = 2^2 \). إذن \( \log_{2^3} (2^2) = \dfrac{2}{3} \)."),

        # 42. log_16(32)
        (r"ما قيمة \( \log_{16} 32 \)؟<br><em>Evaluate \( \log_{16} 32 \).</em>",
         [r"\( \dfrac{5}{4} \)", "2", r"\( \dfrac{4}{5} \)", r"\( \dfrac{3}{2} \)"], 0,
         r"\( 16 = 2^4 \) و \( 32 = 2^5 \). إذن \( \log_{2^4} (2^5) = \dfrac{5}{4} \)."),

        # 43. 10^(2x) = 1000
        (r"ما قيمة \( x \) في المعادلة \( 10^{2x} = 1000 \)؟<br><em>Solve \( 10^{2x} = 1000 \).</em>",
         [r"\( \dfrac{3}{2} \)", "3", "2", r"\( \dfrac{2}{3} \)"], 0,
         r"\( 1000 = 10^3 \implies 2x = 3 \implies x = \dfrac{3}{2} \)."),

        # 44. (1/2)^(x-3) = 8
        (r"ما حل المعادلة \( \left(\dfrac{1}{2}\right)^{x-3} = 8 \)؟<br><em>Solve \( (1/2)^{x-3} = 8 \).</em>",
         ["0", "6", "-3", "3"], 0,
         r"\( 2^{-(x-3)} = 2^3 \implies -(x-3) = 3 \implies x - 3 = -3 \implies x = 0 \)."),

        # 45. ln(e^(3x - 1)) = 8
        (r"ما حل المعادلة \( \ln (e^{3x - 1}) = 8 \)؟<br><em>Solve \( \ln(e^{3x-1}) = 8 \).</em>",
         ["3", r"\( \dfrac{7}{3} \)", "2", "4"], 0,
         r"\( \ln(e^{3x-1}) = 3x - 1 \implies 3x - 1 = 8 \implies 3x = 9 \implies x = 3 \)."),

        # 46. log_x(64) = 3
        (r"إذا كان \( \log_x 64 = 3 \)، فما قيمة \( x \)؟<br><em>If \( \log_x 64 = 3 \), find x.</em>",
         ["4", "8", "2", "16"], 0,
         r"\( x^3 = 64 = 4^3 \implies x = 4 \)."),

        # 47. log_x(81) = 4
        (r"إذا كان \( \log_x 81 = 4 \)، فما قيمة \( x \)؟<br><em>If \( \log_x 81 = 4 \), find x.</em>",
         ["3", "9", "2", "4"], 0,
         r"\( x^4 = 81 = 3^4 \implies x = 3 \)."),

        # 48. Solve log_2(x) + log_2(x - 2) = 3
        (r"ما حل المعادلة \( \log_2 x + \log_2 (x - 2) = 3 \)؟<br><em>Solve \( \log_2 x + \log_2 (x - 2) = 3 \).</em>",
         ["4", "2", "-2", "8"], 0,
         r"\( \log_2 [x(x-2)] = 3 \implies x^2 - 2x = 8 \implies x^2 - 2x - 8 = 0 \implies (x-4)(x+2) = 0 \). نأخذ الحل الموجب \( x = 4 \)."),

        # 49. Base of log function
        ("أي من القيم التالية لا يمكن أن تكون أساسًا للدالة اللوغاريتمية؟<br><em>Which cannot be a base for a logarithmic function?</em>",
         ["1", "2", "0.5", "10"], 0,
         r"أساس اللوغاريتم يجب أن يكون موجبًا ولا يساوي 1 (\( b > 0, b \ne 1 \)). لذا 1 لا يمكن أن يكون أساسًا."),

        # 50. Value of log_3(1/81)
        (r"ما قيمة \( \log_3 \left(\dfrac{1}{81}\right) \)؟<br><em>Evaluate \( \log_3 (1/81) \).</em>",
         ["-4", "4", "-3", r"\( -\dfrac{1}{4} \)"], 0,
         r"\( \dfrac{1}{81} = 3^{-4} \implies \log_3 (3^{-4}) = -4 \).")
    ]

    for item in med_data:
        qs.append(make_q(d, "medium", item[0], item[1], item[2], item[3]))

    # ================= HARD (45 items) =================
    hard_data = [
        # 1. Quadratic substitution 4^x - 6(2^x) + 8 = 0
        (r"ما مجموعة حلول المعادلة \( 4^x - 6(2^x) + 8 = 0 \)؟<br><em>Solve \( 4^x - 6(2^x) + 8 = 0 \).</em>",
         [r"\( \{1, 2\} \)", r"\( \{2, 4\} \)", r"\( \{1, 3\} \)", r"\( \{0, 2\} \)"], 0,
         r"بوضع \( u = 2^x \)، تصبح المعادلة: \( u^2 - 6u + 8 = 0 \implies (u-2)(u-4) = 0 \implies u = 2 \) أو \( u = 4 \). إذن \( 2^x = 2 \implies x = 1 \)، و \( 2^x = 4 \implies x = 2 \)."),

        # 2. 9^x - 4(3^x) + 3 = 0
        (r"ما مجموعة حلول المعادلة \( 9^x - 4(3^x) + 3 = 0 \)؟<br><em>Solve \( 9^x - 4(3^x) + 3 = 0 \).</em>",
         [r"\( \{0, 1\} \)", r"\( \{1, 3\} \)", r"\( \{0, 2\} \)", r"\( \{-1, 1\} \)"], 0,
         r"بوضع \( u = 3^x \): \( u^2 - 4u + 3 = 0 \implies (u-1)(u-3) = 0 \implies u = 1 \) أو \( u = 3 \). إذن \( 3^x = 1 \implies x = 0 \)، و \( 3^x = 3 \implies x = 1 \)."),

        # 3. 25^x - 6(5^x) + 5 = 0
        (r"ما مجموع جذور المعادلة \( 25^x - 6(5^x) + 5 = 0 \)؟<br><em>Sum of roots of \( 25^x - 6(5^x) + 5 = 0 \)?</em>",
         ["1", "0", "5", "6"], 0,
         r"بوضع \( u = 5^x \): \( u^2 - 6u + 5 = 0 \implies u = 1 \) أو \( u = 5 \). إذن \( 5^x = 1 \implies x = 0 \) و \( 5^x = 5 \implies x = 1 \). مجموع الجذور: \( 0 + 1 = 1 \)."),

        # 4. Quadratic in log: (log_2 x)^2 - 3 log_2 x + 2 = 0
        (r"ما مجموعة حلول المعادلة \( (\log_2 x)^2 - 3\log_2 x + 2 = 0 \)؟<br><em>Solve \( (\log_2 x)^2 - 3\log_2 x + 2 = 0 \).</em>",
         [r"\( \{2, 4\} \)", r"\( \{1, 2\} \)", r"\( \{4, 8\} \)", r"\( \{2, 8\} \)"], 0,
         r"بوضع \( u = \log_2 x \): \( u^2 - 3u + 2 = 0 \implies (u-1)(u-2) = 0 \implies u = 1 \) أو \( u = 2 \). إذن \( \log_2 x = 1 \implies x = 2 \)، و \( \log_2 x = 2 \implies x = 4 \)."),

        # 5. Product of roots of (log_3 x)^2 - 5 log_3 x + 6 = 0
        (r"ما حاصل ضرب جذور المعادلة \( (\log_3 x)^2 - 5\log_3 x + 6 = 0 \)؟<br><em>Product of roots of the logarithmic equation?</em>",
         ["243", "81", "27", "9"], 0,
         r"\( u = \log_3 x \implies u^2 - 5u + 6 = 0 \implies u_1 = 2, u_2 = 3 \). إذن \( x_1 = 3^2 = 9 \) و \( x_2 = 3^3 = 27 \). حاصل الضرب: \( 9 \cdot 27 = 243 \) (أو مباشرة \( 3^{u_1 + u_2} = 3^5 = 243 \))."),

        # 6. Extraneous solution: log_3(x) + log_3(x - 6) = 3
        (r"ما الحل المقبول للمعادلة \( \log_3 x + \log_3 (x - 6) = 3 \)؟<br><em>Valid solution to \( \log_3 x + \log_3(x-6) = 3 \)?</em>",
         ["9", "3", "-3", "6"], 0,
         r"\( \log_3 [x(x-6)] = 3 \implies x^2 - 6x = 27 \implies x^2 - 6x - 27 = 0 \implies (x-9)(x+3) = 0 \). شرط التعريف \( x > 6 \)، لذا نرفض \( -3 \) والحل المقبول هو 9."),

        # 7. System of equations with powers: 2^x * 4^y = 32 and 3^(x-y) = 9
        (r"إذا كان \( 2^x \cdot 4^y = 32 \) و \( 3^{x-y} = 9 \)، فما قيمة \( x \)؟<br><em>Find x in the exponential system.</em>",
         ["3", "2", "4", "1"], 0,
         r"المعادلة الأولى: \( 2^x \cdot 2^{2y} = 2^5 \implies x + 2y = 5 \). المعادلة الثانية: \( 3^{x-y} = 3^2 \implies x - y = 2 \implies x = y + 2 \). بالتعويض: \( (y+2) + 2y = 5 \implies 3y = 3 \implies y = 1 \)، وبالتالي \( x = 3 \)."),

        # 8. System with log: log_2(x) + log_2(y) = 5 and log_2(x/y) = 1
        (r"إذا كان \( \log_2 x + \log_2 y = 5 \) و \( \log_2 \left(\dfrac{x}{y}\right) = 1 \)، فما قيمة \( x \)؟<br><em>Find x in the logarithmic system.</em>",
         ["8", "4", "16", "2"], 0,
         r"بجمع المعادلتين: \( 2\log_2 x = 6 \implies \log_2 x = 3 \implies x = 2^3 = 8 \)."),

        # 9. Telescoping log product: log_2(3) * log_3(4) * ... * log_15(16)
        (r"ما قيمة المقدار \( \log_2 3 \cdot \log_3 4 \cdot \log_4 5 \cdots \log_{15} 16 \)؟<br><em>Telescoping product of logarithms?</em>",
         ["4", "8", "2", "16"], 0,
         r"باستخدام صيغة تغيير الأساس: \( \dfrac{\log 3}{\log 2} \cdot \dfrac{\log 4}{\log 3} \cdots \dfrac{\log 16}{\log 15} = \dfrac{\log 16}{\log 2} = \log_2 16 = 4 \)."),

        # 10. log inequality with fraction base: log_(1/2)(x - 1) > -2
        (r"ما مجموعة حل المتباينة \( \log_{1/2} (x - 1) > -2 \)؟<br><em>Solve \( \log_{1/2}(x-1) > -2 \).</em>",
         [r"\( (1, 5) \)", r"\( (1, \infty) \)", r"\( (5, \infty) \)", r"\( (-\infty, 5) \)"], 0,
         r"شرط المجال: \( x - 1 > 0 \implies x > 1 \). وبما أن الأساس \( 0 < \dfrac{1}{2} < 1 \)، فإن اتجاه المتباينة ينعكس: \( x - 1 < \left(\dfrac{1}{2}\right)^{-2} = 4 \implies x < 5 \). بالتقاطع: \( (1, 5) \)."),

        # 11. Domain of log(x^2 - 9)
        (r"مجال الدالة \( f(x) = \log (x^2 - 9) \) هو:<br><em>Domain of \( f(x) = \log(x^2 - 9) \)?</em>",
         [r"\( (-\infty, -3) \cup (3, \infty) \)", r"\( (-3, 3) \)", r"\( [-3, 3] \)", r"\( \mathbb{R} \setminus \{-3, 3\} \)"], 0,
         r"يجب أن يكون \( x^2 - 9 > 0 \implies (x-3)(x+3) > 0 \). إذن \( x < -3 \) أو \( x > 3 \)، أي \( (-\infty, -3) \cup (3, \infty) \)."),

        # 12. Domain of log((x - 2)/(x + 3))
        (r"مجال الدالة \( f(x) = \ln \left(\dfrac{x - 2}{x + 3}\right) \) هو:<br><em>Domain of \( \ln((x-2)/(x+3)) \)?</em>",
         [r"\( (-\infty, -3) \cup (2, \infty) \)", r"\( (-3, 2) \)", r"\( [2, \infty) \)", r"\( \mathbb{R} \setminus \{-3\} \)"], 0,
         r"يجب أن يكون الكسر موجبًا تمامًا: إشارة البسط والمقام متفقة عندما \( x < -3 \) أو \( x > 2 \)، أي \( (-\infty, -3) \cup (2, \infty) \)."),

        # 13. log_2(x) + log_4(x) = 6
        (r"ما حل المعادلة \( \log_2 x + \log_4 x = 6 \)؟<br><em>Solve \( \log_2 x + \log_4 x = 6 \).</em>",
         ["16", "8", "64", "4"], 0,
         r"\( \log_4 x = \dfrac{\log_2 x}{\log_2 4} = \dfrac{1}{2}\log_2 x \). إذن \( \log_2 x + \dfrac{1}{2}\log_2 x = 6 \implies \dfrac{3}{2}\log_2 x = 6 \implies \log_2 x = 4 \implies x = 2^4 = 16 \)."),

        # 14. log_3(x) + log_9(x) + log_27(x) = 11/2
        (r"ما قيمة \( x \) في المعادلة \( \log_3 x + \log_9 x + \log_{27} x = \dfrac{11}{2} \)؟<br><em>Solve equation with multiple power bases.</em>",
         ["27", "9", "81", "3"], 0,
         r"نوحد الأساس إلى 3: \( \log_3 x + \dfrac{1}{2}\log_3 x + \dfrac{1}{3}\log_3 x = \dfrac{11}{6}\log_3 x \). إذن \( \dfrac{11}{6}\log_3 x = \dfrac{11}{2} \implies \log_3 x = 3 \implies x = 3^3 = 27 \)."),

        # 15. x^(log_2 x) = 16
        (r"ما مجموعة حلول المعادلة \( x^{\log_2 x} = 16 \)؟<br><em>Solve \( x^{\log_2 x} = 16 \).</em>",
         [r"\( \left\{\dfrac{1}{4}, 4\right\} \)", r"\( \{2, 4\} \)", r"\( \left\{\dfrac{1}{2}, 2\right\} \)", r"\( \{4\} \)"], 0,
         r"بأخذ \( \log_2 \) للطرفين: \( (\log_2 x)(\log_2 x) = \log_2 16 = 4 \implies (\log_2 x)^2 = 4 \implies \log_2 x = \pm 2 \). إذن \( x = 2^2 = 4 \) أو \( x = 2^{-2} = \dfrac{1}{4} \)."),

        # 16. Solve 2^(2x+1) - 5(2^x) + 2 = 0
        (r"ما حلول المعادلة \( 2^{2x+1} - 5(2^x) + 2 = 0 \)؟<br><em>Solve \( 2(2^{2x}) - 5(2^x) + 2 = 0 \).</em>",
         [r"\( \{-1, 1\} \)", r"\( \{0, 1\} \)", r"\( \{1, 2\} \)", r"\( \{-1, 2\} \)"], 0,
         r"\( 2(2^x)^2 - 5(2^x) + 2 = 0 \implies (2u - 1)(u - 2) = 0 \implies 2^x = \dfrac{1}{2} \) (أي \( x = -1 \)) أو \( 2^x = 2 \) (أي \( x = 1 \))."),

        # 17. Radioactive decay half-life calculation
        ("عنصر مشع كتلته 80 جرامًا وفترة عمر النصف له 5 أيام. كم يتبقى منه بعد 15 يومًا؟<br><em>Remaining mass after 15 days?</em>",
         ["10 جرامات", "20 جرامًا", "5 جرامات", "40 جرامًا"], 0,
         r"عدد فترات عمر النصف: \( n = \dfrac{15}{5} = 3 \). الكتلة المتبقية: \( 80 \cdot \left(\dfrac{1}{2}\right)^3 = 80 \cdot \dfrac{1}{8} = 10 \) جرامات."),

        # 18. Compound growth equation: 200 * e^(0.05 t) = 400
        (r"إذا كان تزايد مجتمع خلايا يعطى بالدالة \( N(t) = 200 e^{0.05 t} \)، فما الزمن اللازم ليتضاعف عدد الخلايا؟<br><em>Doubling time in exponential model?</em>",
         [r"\( \dfrac{\ln 2}{0.05} \)", r"\( \dfrac{0.05}{\ln 2} \)", r"\( 200 \ln 2 \)", r"\( \dfrac{\ln 400}{0.05} \)"], 0,
         r"\( 400 = 200 e^{0.05 t} \implies e^{0.05 t} = 2 \implies 0.05 t = \ln 2 \implies t = \dfrac{\ln 2}{0.05} \)."),

        # 19. Inverse of f(x) = ln(x - 3) + 2
        (r"الدالة العكسية للدالة \( f(x) = \ln(x - 3) + 2 \) هي:<br><em>Inverse of \( f(x) = \ln(x - 3) + 2 \)?</em>",
         [r"\( f^{-1}(x) = e^{x-2} + 3 \)", r"\( f^{-1}(x) = e^{x+2} - 3 \)", r"\( f^{-1}(x) = e^{x-3} + 2 \)", r"\( f^{-1}(x) = e^x - 1 \)"], 0,
         r"\( y - 2 = \ln(x - 3) \implies x - 3 = e^{y-2} \implies x = e^{y-2} + 3 \). إذن \( f^{-1}(x) = e^{x-2} + 3 \)."),

        # 20. Inverse of f(x) = 2^(x+1) - 4
        (r"الدالة العكسية للدالة \( f(x) = 2^{x+1} - 4 \) هي:<br><em>Inverse of \( f(x) = 2^{x+1} - 4 \)?</em>",
         [r"\( f^{-1}(x) = \log_2(x + 4) - 1 \)", r"\( f^{-1}(x) = \log_2(x - 4) + 1 \)", r"\( f^{-1}(x) = \log_2(x + 1) - 4 \)", r"\( f^{-1}(x) = \log_4(x + 2) \)"], 0,
         r"\( y + 4 = 2^{x+1} \implies \log_2(y + 4) = x + 1 \implies x = \log_2(y + 4) - 1 \)."),

        # 21. Number of digits in 2^50 using log 2 approx 0.3010
        (r"إذا كان \( \log 2 \approx 0.3010 \)، فكم عدد أرقام (منازل) العدد \( 2^{50} \)؟<br><em>Number of digits in \( 2^{50} \)?</em>",
         ["16", "15", "17", "50"], 0,
         r"عدد أرقام العدد \( N \) هو \( \lfloor \log N \rfloor + 1 \). هنا \( \log (2^{50}) = 50 \log 2 \approx 50(0.3010) = 15.05 \). إذن عدد الأرقام هو \( 15 + 1 = 16 \)."),

        # 22. Range of f(x) = -3^(x) + 2
        (r"مدى الدالة \( f(x) = -3^x + 2 \) هو:<br><em>Range of \( f(x) = -3^x + 2 \)?</em>",
         [r"\( (-\infty, 2) \)", r"\( (2, \infty) \)", r"\( (-\infty, -2) \)", r"\( [2, \infty) \)"], 0,
         r"بما أن \( 3^x > 0 \)، فإن \( -3^x < 0 \)، وبالتالي \( -3^x + 2 < 2 \)، فالمدى هو \( (-\infty, 2) \)."),

        # 23. log_2(x-3) + log_2(x+3) = 4
        (r"ما حل المعادلة \( \log_2 (x - 3) + \log_2 (x + 3) = 4 \)؟<br><em>Solve \( \log_2(x-3) + \log_2(x+3) = 4 \).</em>",
         ["5", r"\( \pm 5 \)", "4", r"\( \sqrt{7} \)"], 0,
         r"\( \log_2 [(x-3)(x+3)] = 4 \implies x^2 - 9 = 2^4 = 16 \implies x^2 = 25 \implies x = \pm 5 \). شرط المجال \( x > 3 \)، إذن الحل الوحيد هو 5."),

        # 24. 3^(x+1) + 3^x = 36
        (r"ما حل المعادلة \( 3^{x+1} + 3^x = 36 \)؟<br><em>Solve \( 3^{x+1} + 3^x = 36 \).</em>",
         ["2", "3", "1", "4"], 0,
         r"نأخذ \( 3^x \) عاملًا مشتركًا: \( 3^x (3 + 1) = 36 \implies 4 \cdot 3^x = 36 \implies 3^x = 9 \implies x = 2 \)."),

        # 25. 2^(x+2) - 2^x = 24
        (r"ما قيمة \( x \) في المعادلة \( 2^{x+2} - 2^x = 24 \)؟<br><em>Solve \( 2^{x+2} - 2^x = 24 \).</em>",
         ["3", "2", "4", "5"], 0,
         r"\( 2^x (2^2 - 1) = 24 \implies 2^x (3) = 24 \implies 2^x = 8 \implies x = 3 \)."),

        # 26. log_5(x) = a, log_5(y) = b, express log_y(x)
        (r"إذا كان \( \log_5 x = a \) و \( \log_5 y = b \)، فإن \( \log_y x \) يساوي:<br><em>Express \( \log_y x \) in terms of a and b.</em>",
         [r"\( \dfrac{a}{b} \)", r"\( \dfrac{b}{a} \)", r"\( a - b \)", r"\( ab \)"], 0,
         r"باستخدام صيغة تغيير الأساس: \( \log_y x = \dfrac{\log_5 x}{\log_5 y} = \dfrac{a}{b} \)."),

        # 27. Value of log_2(sin 45 deg) + log_2(cos 45 deg)
        (r"ما قيمة المقدار \( \log_2 (\sin 45^\circ) + \log_2 (\cos 45^\circ) \)؟<br><em>Evaluate trigonometric logarithm expression.</em>",
         ["-1", "0", "1", r"\( -\dfrac{1}{2} \)"], 0,
         r"\( \log_2 (\sin 45^\circ \cos 45^\circ) = \log_2 \left(\dfrac{\sqrt{2}}{2} \cdot \dfrac{\sqrt{2}}{2}\right) = \log_2 \left(\dfrac{2}{4}\right) = \log_2 \left(\dfrac{1}{2}\right) = -1 \)."),

        # 28. Solve e^(2x) - 4e^x + 3 = 0
        (r"ما مجموع حلول المعادلة \( e^{2x} - 4e^x + 3 = 0 \)؟<br><em>Sum of solutions of \( e^{2x} - 4e^x + 3 = 0 \)?</em>",
         [r"\( \ln 3 \)", "4", r"\( \ln 4 \)", "3"], 0,
         r"\( (e^x - 1)(e^x - 3) = 0 \implies e^x = 1 \) أو \( e^x = 3 \implies x_1 = \ln 1 = 0 \)، \( x_2 = \ln 3 \). المجموع: \( 0 + \ln 3 = \ln 3 \)."),

        # 29. Logarithmic equation with log_x: log_x(3) + log_3(x) = 2
        (r"ما حل المعادلة \( \log_x 3 + \log_3 x = 2 \) حيث \( x > 0, x \ne 1 \)؟<br><em>Solve \( \log_x 3 + \log_3 x = 2 \).</em>",
         ["3", "9", "1", r"\( \dfrac{1}{3} \)"], 0,
         r"\( \log_x 3 = \dfrac{1}{\log_3 x} \). بوضع \( u = \log_3 x \): \( \dfrac{1}{u} + u = 2 \implies u^2 - 2u + 1 = 0 \implies (u-1)^2 = 0 \implies u = 1 \implies \log_3 x = 1 \implies x = 3 \)."),

        # 30. Inequality 3^(2x - 1) < 1/27
        (r"ما مجموعة حل المتباينة \( 3^{2x - 1} < \dfrac{1}{27} \)؟<br><em>Solve \( 3^{2x-1} < 1/27 \).</em>",
         [r"\( (-\infty, -1) \)", r"\( (-1, \infty) \)", r"\( (-\infty, -2) \)", r"\( (-2, \infty) \)"], 0,
         r"\( \dfrac{1}{27} = 3^{-3} \implies 2x - 1 < -3 \implies 2x < -2 \implies x < -1 \)."),

        # 31. Domain of f(x) = sqrt(log_2(x - 1))
        (r"مجال الدالة \( f(x) = \sqrt{\log_2 (x - 1)} \) هو:<br><em>Domain of \( \sqrt{\log_2(x-1)} \)?</em>",
         [r"\( [2, \infty) \)", r"\( (1, \infty) \)", r"\( [1, \infty) \)", r"\( (2, \infty) \)"], 0,
         r"يجب أن يكون ما تحت الجذر غير سالب: \( \log_2 (x - 1) \ge 0 \implies x - 1 \ge 2^0 = 1 \implies x \ge 2 \). إذن المجال \( [2, \infty) \)."),

        # 32. 4^(x) = 8^(y) and x + y = 5
        (r"إذا كان \( 4^x = 8^y \) و \( x + y = 5 \)، فما قيمة \( x \)؟<br><em>Find x in the exponential relation.</em>",
         ["3", "2", r"\( \dfrac{5}{2} \)", "4"], 0,
         r"\( (2^2)^x = (2^3)^y \implies 2x = 3y \implies y = \dfrac{2}{3}x \). بالتعويض: \( x + \dfrac{2}{3}x = 5 \implies \dfrac{5}{3}x = 5 \implies x = 3 \)."),

        # 33. log_2(x) - 3 log_x(2) = 2
        (r"ما حاصل ضرب حلول المعادلة \( \log_2 x - 3\log_x 2 = 2 \)؟<br><em>Product of solutions to \( \log_2 x - 3\log_x 2 = 2 \)?</em>",
         ["4", "8", "2", "1"], 0,
         r"\( u = \log_2 x \implies u - \dfrac{3}{u} = 2 \implies u^2 - 2u - 3 = 0 \implies (u-3)(u+1) = 0 \). إذن \( u_1 = 3 \implies x_1 = 8 \)، و \( u_2 = -1 \implies x_2 = \dfrac{1}{2} \). حاصل الضرب: \( 8 \cdot \dfrac{1}{2} = 4 \)."),

        # 34. Domain of f(x) = 1 / ln(x)
        (r"مجال الدالة \( f(x) = \dfrac{1}{\ln x} \) هو:<br><em>Domain of \( 1/\ln x \)?</em>",
         [r"\( (0, 1) \cup (1, \infty) \)", r"\( (0, \infty) \)", r"\( \mathbb{R} \setminus \{1\} \)", r"\( [0, \infty) \)"], 0,
         r"شرط اللوغاريتم: \( x > 0 \)، وشرط المقام: \( \ln x \ne 0 \implies x \ne 1 \). إذن المجال هو \( (0, 1) \cup (1, \infty) \)."),

        # 35. Solution of 5^(2x) - 26(5^x) + 25 = 0
        (r"ما مجموعة حل المعادلة \( 5^{2x} - 26(5^x) + 25 = 0 \)؟<br><em>Solve \( 5^{2x} - 26(5^x) + 25 = 0 \).</em>",
         [r"\( \{0, 2\} \)", r"\( \{1, 2\} \)", r"\( \{0, 1\} \)", r"\( \{1, 5\} \)"], 0,
         r"\( u = 5^x \implies u^2 - 26u + 25 = 0 \implies (u-1)(u-25) = 0 \implies 5^x = 1 \implies x = 0 \) أو \( 5^x = 25 \implies x = 2 \)."),

        # 36. log_3(x+2) + log_3(x-4) = 3
        (r"ما الحل المقبول للمعادلة \( \log_3 (x + 2) + \log_3 (x - 4) = 3 \)؟<br><em>Valid solution to \( \log_3(x+2) + \log_3(x-4) = 3 \)?</em>",
         ["7", "5", "-5", "9"], 0,
         r"\( \log_3 [(x+2)(x-4)] = 3 \implies x^2 - 2x - 8 = 27 \implies x^2 - 2x - 35 = 0 \implies (x-7)(x+5) = 0 \). شرط التعريف \( x > 4 \)، إذن الحل هو 7."),

        # 37. Sum of log terms: sum_(k=1)^9 log10((k+1)/k)
        (r"ما قيمة المجموع \( \sum_{k=1}^9 \log \left(\dfrac{k+1}{k}\right) \)؟<br><em>Evaluate the telescoping logarithmic sum.</em>",
         ["1", "0", "9", "10"], 0,
         r"مجموع اللوغاريتمات يساوي لوغاريتم حاصل الضرب: \( \log \left(\dfrac{2}{1} \cdot \dfrac{3}{2} \cdot \dfrac{4}{3} \cdots \dfrac{10}{9}\right) = \log(10) = 1 \)."),

        # 38. If 2^a = 3, 3^b = 4, 4^c = 8, what is a*b*c?
        (r"إذا كان \( 2^a = 3 \) و \( 3^b = 4 \) و \( 4^c = 8 \)، فما قيمة حاصل الضرب \( a \cdot b \cdot c \)؟<br><em>Find product of exponents a*b*c.</em>",
         ["3", "4", "2", "6"], 0,
         r"\( a = \log_2 3 \)، \( b = \log_3 4 \)، \( c = \log_4 8 \). حاصل الضرب: \( \log_2 3 \cdot \log_3 4 \cdot \log_4 8 = \log_2 8 = 3 \)."),

        # 39. Solve |log_2 x| = 3
        (r"ما حلول المعادلة \( |\log_2 x| = 3 \)؟<br><em>Solve \( |\log_2 x| = 3 \).</em>",
         [r"\( \left\{\dfrac{1}{8}, 8\right\} \)", r"\( \{-8, 8\} \)", r"\( \{6, 8\} \)", r"\( \left\{\dfrac{1}{6}, 6\right\} \)"], 0,
         r"\( \log_2 x = 3 \implies x = 8 \) أو \( \log_2 x = -3 \implies x = 2^{-3} = \dfrac{1}{8} \)."),

        # 40. Log base x of 2x = 2
        (r"ما حل المعادلة \( \log_x (2x) = 2 \)؟<br><em>Solve \( \log_x (2x) = 2 \).</em>",
         ["2", "4", "1", "غير موجود"], 0,
         r"\( x^2 = 2x \implies x^2 - 2x = 0 \implies x(x-2) = 0 \). بما أن الأساس \( x > 0 \) و \( x \ne 1 \)، فإن \( x = 2 \)."),

        # 41. log_2(x) > log_4(x + 2)
        (r"ما مجموعة حل المتباينة \( \log_2 x > \log_4 (x + 2) \)؟<br><em>Solve \( \log_2 x > \log_4(x+2) \).</em>",
         [r"\( (2, \infty) \)", r"\( (0, 2) \)", r"\( (-1, 2) \)", r"\( [2, \infty) \)"], 0,
         r"\( \log_4 (x+2) = \dfrac{1}{2}\log_2 (x+2) \implies \log_2 x > \dfrac{1}{2}\log_2(x+2) \implies \log_2 (x^2) > \log_2 (x+2) \implies x^2 - x - 2 > 0 \implies (x-2)(x+1) > 0 \). بما أن \( x > 0 \)، فالحل هو \( (2, \infty) \)."),

        # 42. Exponential growth to 8-fold
        (r"إذا كان مجتمع ينمو وفق الدالة \( P(t) = P_0 e^{kt} \)، وتضاعف بعد سنتين (\( t=2 \))، فبعد كم سنة من البداية يصبح 8 أضعاف حجمه الأصلي؟<br><em>Time to reach 8-fold initial size?</em>",
         ["6 سنوات", "8 سنوات", "4 سنوات", "16 سنة"], 0,
         r"يتضاعف المجتمع (\( \times 2 \)) كل سنتين. ليصل إلى 8 أضعاف (\( 2^3 \))، فإنه يحتاج إلى 3 فترات تضاعف: \( 3 \times 2 = 6 \) سنوات."),

        # 43. 7^(x+1) = 5^(x+1)
        (r"ما حل المعادلة \( 7^{x+1} = 5^{x+1} \) في الأعداد الحقيقية؟<br><em>Solve \( 7^{x+1} = 5^{x+1} \).</em>",
         ["-1", "0", "1", "لا يوجد حل"], 0,
         r"\( \left(\dfrac{7}{5}\right)^{x+1} = 1 = \left(\dfrac{7}{5}\right)^0 \implies x + 1 = 0 \implies x = -1 \)."),

        # 44. Evaluate 2^(log_4 25)
        (r"ما قيمة المقدار \( 2^{\log_4 25} \)؟<br><em>Evaluate \( 2^{\log_4 25} \).</em>",
         ["5", "25", r"\( \dfrac{25}{2} \)", "10"], 0,
         r"\( \log_4 25 = \dfrac{\log_2 25}{\log_2 4} = \dfrac{1}{2}\log_2 25 = \log_2 (25^{1/2}) = \log_2 5 \). إذن \( 2^{\log_2 5} = 5 \)."),

        # 45. Find x if log(x-1) + log(x+2) = 1
        (r"ما الحل المقبول للمعادلة \( \log (x - 1) + \log (x + 2) = 1 \)؟<br><em>Valid solution to \( \log(x-1) + \log(x+2) = 1 \)?</em>",
         ["3", "2", "-4", "4"], 0,
         r"\( \log [(x-1)(x+2)] = 1 \implies x^2 + x - 2 = 10 \implies x^2 + x - 12 = 0 \implies (x-3)(x+4) = 0 \). شرط التعريف \( x > 1 \)، إذن الحل هو 3.")
    ]

    for item in hard_data:
        qs.append(make_q(d, "hard", item[0], item[1], item[2], item[3]))

    return qs

if __name__ == "__main__":
    questions = get_questions()
    easy_cnt = sum(1 for q in questions if q["difficulty"] == "easy")
    med_cnt = sum(1 for q in questions if q["difficulty"] == "medium")
    hard_cnt = sum(1 for q in questions if q["difficulty"] == "hard")
    print(f"gen_explog.py: Total = {len(questions)} (Easy: {easy_cnt}, Medium: {med_cnt}, Hard: {hard_cnt})")
