"""
scripts/igcse_generators/gen_number.py
Generates diverse, authentic Cambridge IGCSE 0580 questions for the Number domain.
Covers: Upper/Lower Bounds, Standard Form, Recurring Decimals, Reverse Percentages,
Compound Interest, Surds, and HCF/LCM.
"""

from .common import make_q, make_frq

def get_number_questions():
    qs = []
    dom = "Number"

    # ==================== EASY ====================
    # Standard Form
    qs.append(make_q(dom, "easy",
        r"Write \( 0.00045 \) in standard form.",
        [r"\( 4.5 \times 10^{-4} \)", r"\( 4.5 \times 10^{-5} \)", r"\( 45 \times 10^{-5} \)", r"\( 4.5 \times 10^{-3} \)"],
        0,
        r"Move the decimal point 4 places to the right to obtain \( 4.5 \). Since the original number is less than 1, the exponent is negative: \( 4.5 \times 10^{-4} \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"Calculate \( (3 \times 10^4) \times (2 \times 10^3) \). Give your answer in standard form.",
        [r"\( 6 \times 10^7 \)", r"\( 6 \times 10^{12} \)", r"\( 5 \times 10^7 \)", r"\( 6 \times 10^1 \)",],
        0,
        r"Multiply coefficients and add exponents: \( (3 \times 2) \times 10^{4+3} = 6 \times 10^7 \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"Find the highest common factor (HCF) of 36 and 54.",
        ["6", "9", "18", "27"],
        2,
        r"Prime factorisation: \( 36 = 2^2 \times 3^2 \) and \( 54 = 2 \times 3^3 \). The HCF takes the lowest power of common factors: \( \text{HCF} = 2^1 \times 3^2 = 2 \times 9 = 18 \). [M1 for prime factors, A1 for 18]"))
    qs.append(make_q(dom, "easy",
        r"Find the lowest common multiple (LCM) of 12 and 15.",
        ["30", "45", "60", "90"],
        2,
        r"Prime factorisation: \( 12 = 2^2 \times 3 \), \( 15 = 3 \times 5 \). \( \text{LCM} = 2^2 \times 3 \times 5 = 4 \times 15 = 60 \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"A length is measured as 14 cm correct to the nearest centimetre. What is the lower bound of the length?",
        ["13 cm", "13.4 cm", "13.5 cm", "13.9 cm"],
        2,
        r"Since the degree of accuracy is to the nearest 1 cm, the error is \( \pm 0.5 \) cm. Lower bound = \( 14 - 0.5 = 13.5 \) cm. [B1]"))
    qs.append(make_q(dom, "easy",
        r"A mass is given as 68 kg correct to the nearest 2 kg. What is the upper bound of the mass?",
        ["68.5 kg", "69 kg", "70 kg", "69.5 kg"],
        1,
        r"Half the unit of accuracy is \( \dfrac{2}{2} = 1 \) kg. Upper bound = \( 68 + 1 = 69 \) kg. [B1]"))
    qs.append(make_q(dom, "easy",
        r"Work out \( \dfrac{3}{5} \div \dfrac{9}{10} \). Give your answer as a fraction in its simplest form.",
        [r"\( \dfrac{2}{3} \)", r"\( \dfrac{27}{50} \)", r"\( \dfrac{3}{2} \)", r"\( \dfrac{1}{3} \)"],
        0,
        r"Multiply by the reciprocal: \( \dfrac{3}{5} \times \dfrac{10}{9} = \dfrac{3 \times 10}{5 \times 9} = \dfrac{30}{45} = \dfrac{2}{3} \). [M1 for multiplying by reciprocal, A1 for 2/3]"))

    # ==================== MEDIUM ====================
    qs.append(make_q(dom, "medium",
        r"Convert the recurring decimal \( 0.\dot{2}\dot{7} \) into a fraction in its simplest form.",
        [r"\( \dfrac{27}{100} \)", r"\( \dfrac{3}{11} \)", r"\( \dfrac{9}{33} \)", r"\( \dfrac{1}{4} \)"],
        1,
        r"Let \( x = 0.272727\ldots \). Then \( 100x = 27.272727\ldots \). Subtract: \( 100x - x = 27 \implies 99x = 27 \implies x = \dfrac{27}{99} = \dfrac{3}{11} \). [M1 for subtraction method, A1 for 3/11]"))
    qs.append(make_q(dom, "medium",
        r"A jacket is sold for \$68 after a 15% discount. What was the original price of the jacket?",
        [r"\( \$78.20 \)", r"\( \$80.00 \)", r"\( \$82.50 \)", r"\( \$85.00 \)"],
        1,
        r"The sale price represents \( 100\% - 15\% = 85\% \) of the original price. Original price = \( \dfrac{68}{0.85} = \$80 \). [M1 for dividing by 0.85, A1 for 80]"))
    qs.append(make_q(dom, "medium",
        r"Calculate \( \dfrac{6.4 \times 10^7}{1.6 \times 10^{-3}} \). Give your answer in standard form.",
        [r"\( 4 \times 10^4 \)", r"\( 4 \times 10^{10} \)", r"\( 4 \times 10^{-10} \)", r"\( 4.8 \times 10^{10} \)"],
        1,
        r"Divide coefficients and subtract exponents: \( \dfrac{6.4}{1.6} \times 10^{7 - (-3)} = 4 \times 10^{10} \). [M1 for dividing coefficients, A1 for 4x10^10]"))
    qs.append(make_q(dom, "medium",
        r"A car travels a distance of 150 km, correct to the nearest 10 km, in a time of 2 hours, correct to the nearest 0.1 hour. What is the upper bound of the average speed in km/h?",
        ["79.5 km/h", "77.5 km/h", "75.0 km/h", "81.6 km/h"],
        0,
        r"Upper bound of speed = \( \dfrac{\text{Upper bound of distance}}{\text{Lower bound of time}} \). Upper distance = \( 150 + 5 = 155 \) km. Lower time = \( 2.0 - 0.05 = 1.95 \) hours. Maximum speed = \( \dfrac{155}{1.95} \approx 79.487 \) km/h \( \approx 79.5 \) km/h. [M1 for upper dist / lower time, A1 for 79.5]"))
    qs.append(make_q(dom, "medium",
        r"Simplify \( \sqrt{75} - \sqrt{12} \).",
        [r"\( 3\sqrt{3} \)", r"\( \sqrt{63} \)", r"\( 7\sqrt{3} \)", r"\( 5\sqrt{3} \)"],
        0,
        r"Simplify each surd: \( \sqrt{75} = \sqrt{25 \times 3} = 5\sqrt{3} \) and \( \sqrt{12} = \sqrt{4 \times 3} = 2\sqrt{3} \). Then \( 5\sqrt{3} - 2\sqrt{3} = 3\sqrt{3} \). [M1 for simplifying surds, A1 for 3sqrt(3)]"))
    qs.append(make_q(dom, "medium",
        r"Rationalise the denominator of \( \dfrac{6}{\sqrt{3}} \).",
        [r"\( 2\sqrt{3} \)", r"\( 3\sqrt{3} \)", r"\( \sqrt{2} \)", r"\( 6\sqrt{3} \)"],
        0,
        r"Multiply numerator and denominator by \( \sqrt{3} \): \( \dfrac{6\sqrt{3}}{\sqrt{3}\sqrt{3}} = \dfrac{6\sqrt{3}}{3} = 2\sqrt{3} \). [M1 for multiplying by sqrt(3)/sqrt(3), A1 for 2sqrt(3)]"))
    qs.append(make_q(dom, "medium",
        r"\( \$5000 \) is invested at 4% per year compound interest. Calculate the total value of the investment after 3 years.",
        [r"\( \$5600.00 \)", r"\( \$5624.32 \)", r"\( \$5640.50 \)", r"\( \$5500.00 \)"],
        1,
        r"Compound interest formula: \( A = P(1 + r)^n = 5000(1 + 0.04)^3 = 5000(1.04)^3 = 5000 \times 1.124864 = \$5624.32 \). [M1 for 5000*(1.04)^3, A1 for 5624.32]"))

    # ==================== HARD ====================
    qs.append(make_q(dom, "hard",
        r"Rationalise the denominator and simplify: \( \dfrac{10}{3 - \sqrt{5}} \).",
        [r"\( \dfrac{15 + 5\sqrt{5}}{2} \)", r"\( 5(3 + \sqrt{5}) \)", r"\( \dfrac{10(3 - \sqrt{5})}{4} \)", r"\( 3 + \sqrt{5} \)"],
        0,
        r"Multiply numerator and denominator by the conjugate \( 3 + \sqrt{5} \): \( \dfrac{10(3 + \sqrt{5})}{(3 - \sqrt{5})(3 + \sqrt{5})} = \dfrac{10(3 + \sqrt{5})}{9 - 5} = \dfrac{10(3 + \sqrt{5})}{4} = \dfrac{5(3 + \sqrt{5})}{2} = \dfrac{15 + 5\sqrt{5}}{2} \). [M1 for multiplying by conjugate, M1 for difference of squares denominator, A1 for simplified form]"))
    qs.append(make_q(dom, "hard",
        r"Convert \( 0.1\dot{4}\dot{8} \) to a fraction in its simplest form.",
        [r"\( \dfrac{148}{1000} \)", r"\( \dfrac{49}{330} \)", r"\( \dfrac{37}{250} \)", r"\( \dfrac{7}{45} \)"],
        1,
        r"Let \( x = 0.1484848\ldots \). Then \( 10x = 1.484848\ldots \) and \( 1000x = 148.484848\ldots \). Subtract: \( 1000x - 10x = 148 - 1 = 147 \implies 990x = 147 \implies x = \dfrac{147}{990} \). Divide numerator and denominator by 3: \( \dfrac{49}{330} \). [M1 for 1000x - 10x, A1 for 49/330]"))
    qs.append(make_q(dom, "hard",
        r"A rectangle has length \( l = 8.4 \) cm correct to 1 decimal place and width \( w = 5.6 \) cm correct to 1 decimal place. Calculate the lower bound for the area of the rectangle.",
        ["47.04 cm²", "46.3425 cm²", "46.75 cm²", "47.7425 cm²"],
        1,
        r"Lower bound of length = \( 8.4 - 0.05 = 8.35 \) cm. Lower bound of width = \( 5.6 - 0.05 = 5.55 \) cm. Lower bound of area = \( 8.35 \times 5.55 = 46.3425 \text{ cm}^2 \). [B1 for bounds 8.35 and 5.55, M1 for multiplying, A1 for 46.3425]"))
    qs.append(make_q(dom, "hard",
        r"A bank account pays compound interest of 3% per year. How many complete years will it take for an initial deposit of \$2000 to exceed \$3000?",
        ["12 years", "13 years", "14 years", "15 years"],
        2,
        r"We need \( 2000(1.03)^n > 3000 \implies (1.03)^n > 1.5 \). Taking logarithms: \( n \ln(1.03) > \ln(1.5) \implies n > \dfrac{\ln(1.5)}{\ln(1.03)} \approx \dfrac{0.405465}{0.029559} \approx 13.72 \). The minimum number of complete years is 14. [M1 for setting up inequality, A1 for 14 years]"))
    qs.append(make_q(dom, "hard",
        r"Given that \( x = 3.6 \times 10^5 \) and \( y = 4.8 \times 10^4 \), find the value of \( x + y \) in standard form.",
        [r"\( 4.08 \times 10^5 \)", r"\( 8.4 \times 10^5 \)", r"\( 4.08 \times 10^9 \)", r"\( 3.648 \times 10^5 \)"],
        0,
        r"Align exponents to \( 10^5 \): \( y = 0.48 \times 10^5 \). Then \( x + y = (3.6 + 0.48) \times 10^5 = 4.08 \times 10^5 \). [M1 for matching powers of 10, A1 for 4.08x10^5]"))

    return qs
