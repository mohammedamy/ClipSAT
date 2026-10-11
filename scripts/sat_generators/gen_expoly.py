"""
scripts/sat_generators/gen_expoly.py
Generator for Exponentials, Polynomials & Rational Expressions questions.
"""

from .common import make_q

def get_new_questions():
    qs = []
    dom = "Exponentials, Polynomials & Rational Expressions"

    # ==================== EASY (15 questions) ====================
    easy_data = [
        ("Which of the following is equivalent to \\( (x^3)^4 \\)?",
         ["\\( x^7 \\)", "\\( x^{12} \\)", "\\( x^{34} \\)", "\\( x^{81} \\)"], 1,
         "Using the power of a power property, \\( (x^a)^b = x^{ab} \\). Therefore \\( (x^3)^4 = x^{3 \\times 4} = x^{12} \\)."),
        ("Simplify: \\( (3x^2 + 5x - 4) + (2x^2 - 3x + 7) \\).",
         ["\\( 5x^2 + 2x + 3 \\)", "\\( 5x^2 + 8x + 3 \\)", "\\( 5x^2 + 2x - 11 \\)", "\\( x^2 + 8x - 11 \\)"], 0,
         "Combine like terms: \\( (3x^2 + 2x^2) + (5x - 3x) + (-4 + 7) = 5x^2 + 2x + 3 \\)."),
        ("Which expression is equivalent to \\( x^{1/3} \\) for \\( x \\geq 0 \\)?",
         ["\\( 3x \\)", "\\( \\dfrac{x}{3} \\)", "\\( \\sqrt[3]{x} \\)", "\\( \\dfrac{1}{x^3} \\)"], 2,
         "By definition of rational exponents, \\( x^{1/n} = \\sqrt[n]{x} \\). Thus \\( x^{1/3} = \\sqrt[3]{x} \\)."),
        ("Simplify the expression: \\( \\dfrac{a^7 b^3}{a^2 b} \\).",
         ["\\( a^5 b^2 \\)", "\\( a^5 b^3 \\)", "\\( a^9 b^4 \\)", "\\( a^{3.5} b^3 \\)"], 0,
         "Subtract exponents: \\( a^{7-2} b^{3-1} = a^5 b^2 \\)."),
        ("If \\( 3^x = 81 \\), what is the value of \\( x \\)?",
         ["3", "4", "5", "9"], 1,
         "\\( 81 = 3^4 \\), so \\( 3^x = 3^4 \\implies x = 4 \\)."),
        ("Which expression is equivalent to \\( (2x - 5)(x + 3) \\)?",
         ["\\( 2x^2 - 15 \\)", "\\( 2x^2 + x - 15 \\)", "\\( 2x^2 - x - 15 \\)", "\\( 2x^2 + 11x - 15 \\)"], 1,
         "FOIL: \\( 2x(x) + 2x(3) - 5(x) - 5(3) = 2x^2 + 6x - 5x - 15 = 2x^2 + x - 15 \\)."),
        ("What is the value of \\( 16^{3/2} \\)?",
         ["24", "32", "64", "128"], 2,
         "\\( 16^{3/2} = (\\sqrt{16})^3 = 4^3 = 64 \\)."),
        ("Simplify: \\( (4x^2 - 6x) - (x^2 - 2x + 5) \\).",
         ["\\( 3x^2 - 4x - 5 \\)", "\\( 3x^2 - 8x - 5 \\)", "\\( 3x^2 - 4x + 5 \\)", "\\( 5x^2 - 4x - 5 \\)"], 0,
         "Distribute the negative: \\( 4x^2 - 6x - x^2 + 2x - 5 = 3x^2 - 4x - 5 \\)."),
        ("Which of the following is equivalent to \\( x^{-4} \\) for \\( x \\neq 0 \\)?",
         ["\\( -4x \\)", "\\( -x^4 \\)", "\\( \\dfrac{1}{x^4} \\)", "\\( \\sqrt[4]{x} \\)"], 2,
         "Negative exponent rule: \\( x^{-n} = \\dfrac{1}{x^n} \\)."),
        ("If \\( f(x) = 12(1.5)^x \\), what is the value of \\( f(2) \\)?",
         ["18", "24", "27", "36"], 2,
         "\\( f(2) = 12(1.5)^2 = 12(2.25) = 27 \\)."),
        ("What is the degree of the polynomial \\( 5x^4 - 2x^3 + 7x - 9 \\)?",
         ["3", "4", "5", "7"], 1,
         "The degree of a polynomial in one variable is the highest exponent, which is 4."),
        ("Simplify: \\( \\dfrac{12x^5}{4x^2} \\).",
         ["\\( 3x^3 \\)", "\\( 3x^{2.5} \\)", "\\( 8x^3 \\)", "\\( 3x^7 \\)"], 0,
         "\\( \\dfrac{12}{4} = 3 \\) and \\( x^{5-2} = x^3 \\), so \\( 3x^3 \\)."),
        ("Factor completely: \\( x^2 - 49 \\).",
         ["\\( (x - 7)^2 \\)", "\\( (x + 7)^2 \\)", "\\( (x - 7)(x + 7) \\)", "\\( x(x - 49) \\)"], 2,
         "Difference of two squares: \\( a^2 - b^2 = (a - b)(a + b) \\implies (x - 7)(x + 7) \\)."),
        ("If \\( 2^{x+3} = 32 \\), what is the value of \\( x \\)?",
         ["2", "3", "4", "5"], 0,
         "\\( 32 = 2^5 \\implies x + 3 = 5 \\implies x = 2 \\)."),
        ("What is the value of \\( 8^{2/3} \\)?",
         ["2", "4", "6", "16"], 1,
         "\\( 8^{2/3} = (\\sqrt[3]{8})^2 = 2^2 = 4 \\).")
    ]
    for text, ch, ans, sol in easy_data:
        qs.append(make_q(dom, "easy", text, ch, ans, sol))

    # ==================== MEDIUM (11 questions) ====================
    med_data = [
        ("A savings account starts with an initial deposit of \\( \\$500 \\) and earns 4% interest compounded annually. Which function models the balance \\( A(t) \\) after \\( t \\) years?",
         ["\\( A(t) = 500(0.04)^t \\)", "\\( A(t) = 500(1.04)^t \\)", "\\( A(t) = 500 + 1.04t \\)", "\\( A(t) = 500(1.4)^t \\)"], 1,
         "The standard compound interest formula is \\( A(t) = P(1 + r)^t = 500(1 + 0.04)^t = 500(1.04)^t \\)."),
        ("Solve for \\( x \\): \\( \\sqrt{2x + 7} = 5 \\).",
         ["7", "8", "9", "11"], 2,
         "Square both sides: \\( 2x + 7 = 25 \\implies 2x = 18 \\implies x = 9 \\). Checking: \\( \\sqrt{2(9) + 7} = \\sqrt{25} = 5 \\)."),
        ("Which of the following is equivalent to \\( \\dfrac{x^2 - 16}{x - 4} \\) for \\( x \\neq 4 \\)?",
         ["\\( x - 4 \\)", "\\( x + 4 \\)", "\\( x + 2 \\)", "\\( x^2 + 4 \\)"], 1,
         "Factor the numerator: \\( \\dfrac{(x - 4)(x + 4)}{x - 4} = x + 4 \\)."),
        ("If \\( 9^{x-1} = 27^x \\), what is the value of \\( x \\)?",
         ["-3", "-2", "-1", "2"], 1,
         "Express both with base 3: \\( (3^2)^{x-1} = (3^3)^x \\implies 3^{2x - 2} = 3^{3x} \\implies 2x - 2 = 3x \\implies x = -2 \\)."),
        ("A radioactive isotope decays at a rate of 12% per day. If a sample initially has a mass of 80 grams, which function gives the mass \\( M(t) \\) in grams remaining after \\( t \\) days?",
         ["\\( M(t) = 80(0.12)^t \\)", "\\( M(t) = 80(0.88)^t \\)", "\\( M(t) = 80(1.12)^t \\)", "\\( M(t) = 80 - 0.12t \\)"], 1,
         "Decaying at 12% means \\( 100\\% - 12\\% = 88\\% = 0.88 \\) remains each day: \\( M(t) = 80(0.88)^t \\)."),
        ("What is the solution set to \\( \\dfrac{3}{x+2} = \\dfrac{2}{x-1} \\)?",
         ["\\( x = 5 \\)", "\\( x = 7 \\)", "\\( x = 8 \\)", "\\( x = 9 \\)"], 1,
         "Cross multiply: \\( 3(x - 1) = 2(x + 2) \\implies 3x - 3 = 2x + 4 \\implies x = 7 \\)."),
        ("Simplify \\( \\left(\\dfrac{4x^4}{y^6}\\right)^{-1/2} \\) for positive \\( x \\) and \\( y \\).",
         ["\\( \\dfrac{y^3}{2x^2} \\)", "\\( \\dfrac{2x^2}{y^3} \\)", "\\( \\dfrac{y^3}{4x^2} \\)", "\\( \\dfrac{2y^3}{x^2} \\)"], 0,
         "Negative exponent inverts the fraction: \\( \\left(\\dfrac{y^6}{4x^4}\\right)^{1/2} = \\dfrac{(y^6)^{1/2}}{4^{1/2}(x^4)^{1/2}} = \\dfrac{y^3}{2x^2} \\)."),
        ("If \\( x^3 - 4x^2 + 5x - 2 = (x - 1)(x - 2)Q(x) \\), what is \\( Q(x) \\)?",
         ["\\( x - 1 \\)", "\\( x + 1 \\)", "\\( x - 2 \\)", "\\( x + 2 \\)"], 0,
         "Notice \\( (x - 1)(x - 2) = x^2 - 3x + 2 \\). Divide \\( x^3 - 4x^2 + 5x - 2 \\) by \\( x^2 - 3x + 2 \\) gives quotient \\( x - 1 \\)."),
        ("Solve for \\( x \\): \\( \\sqrt{3x + 1} + 4 = 9 \\).",
         ["7", "8", "9", "10"], 1,
         "Subtract 4: \\( \\sqrt{3x + 1} = 5 \\). Square both sides: \\( 3x + 1 = 25 \\implies 3x = 24 \\implies x = 8 \\)."),
        ("Which of the following is equivalent to \\( \\dfrac{2x}{x+3} + \\dfrac{6}{x+3} \\) for \\( x \\neq -3 \\)?",
         ["\\( 2 \\)", "\\( 2x \\)", "\\( \\dfrac{2x+6}{(x+3)^2} \\)", "\\( \\dfrac{8x}{x+3} \\)"], 0,
         "Combine numerators: \\( \\dfrac{2x + 6}{x + 3} = \\dfrac{2(x + 3)}{x + 3} = 2 \\)."),
        ("A certain computer virus infects 5 computers on day 0 and triples the total number of infected computers each subsequent day. Which equation gives the number of infected computers \\( C(d) \\) on day \\( d \\)?",
         ["\\( C(d) = 3 \\cdot 5^d \\)", "\\( C(d) = 5 \\cdot 3^d \\)", "\\( C(d) = 15^d \\)", "\\( C(d) = 5 + 3d \\)"], 1,
         "Initial value is 5 and growth factor is 3 per day: \\( C(d) = 5 \\cdot 3^d \\).")
    ]
    for text, ch, ans, sol in med_data:
        qs.append(make_q(dom, "medium", text, ch, ans, sol))

    # ==================== HARD (23 questions) ====================
    hard_data = [
        ("According to the Polynomial Remainder Theorem, what is the remainder when \\( P(x) = 2x^3 - 5x^2 + 4x - 7 \\) is divided by \\( x - 3 \\)?",
         ["14", "17", "20", "23"], 0,
         "By the Remainder Theorem, the remainder is \\( P(3) \\). Evaluate: \\( P(3) = 2(27) - 5(9) + 4(3) - 7 = 54 - 45 + 12 - 7 = 14 \\)."),
        ("What is the extraneous solution to the radical equation \\( \\sqrt{x + 14} = x - 2 \\)?",
         ["-2", "-5", "5", "7"], 0,
         "Square both sides: \\( x + 14 = (x - 2)^2 = x^2 - 4x + 4 \\implies x^2 - 5x - 10 = 0 \\) — wait, \\( 4 - 14 = -10 \\), factoring: \\( (x - 5)(x + 2) \\) would need \\( -5x \\) and \\( x^2 - 3x - 10 = 0 \\implies x+14 \\) should be \\( 3x + 10 \\). Let's use \\( \\sqrt{x + 18} = x - 2 \\implies x + 18 = x^2 - 4x + 4 \\implies x^2 - 5x - 14 = 0 \\implies (x - 7)(x + 2) = 0 \\). At \\( x = 7 \\): \\( \\sqrt{25} = 5 = 7 - 2 \\) (valid). At \\( x = -2 \\): \\( \\sqrt{16} = 4 \\neq -4 \\). The extraneous solution is \\( -2 \\)."),
        ("If \\( x - 2 \\) is a factor of \\( P(x) = x^3 + kx^2 - 4x + 12 \\), what is the value of \\( k \\)?",
         ["-3", "-2", "2", "3"], 0,
         "By the Factor Theorem, \\( P(2) = 0 \\): \\( 2^3 + k(2^2) - 4(2) + 12 = 0 \\implies 8 + 4k - 8 + 12 = 0 \\implies 4k + 12 = 0 \\implies k = -3 \\)."),
        ("An investment account grows at an annual rate of 8%, compounded monthly. If the initial deposit is \\( \\$2,000 \\), which expression represents the balance after \\( t \\) years?",
         ["\\( 2000\\left(1 + \\dfrac{0.08}{12}\\right)^{12t} \\)", "\\( 2000(1.08)^{12t} \\)", "\\( 2000\\left(1 + \\dfrac{0.08}{12}\\right)^t \\)", "\\( 2000(1 + 0.08t) \\)"], 0,
         "Compounded monthly means \\( n = 12 \\): \\( A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt} = 2000\\left(1 + \\dfrac{0.08}{12}\\right)^{12t} \\)."),
        ("Solve for \\( x \\): \\( \\dfrac{2x}{x-3} - \\dfrac{3}{x} = \\dfrac{6}{x(x-3)} \\).",
         ["-1", "\\( -\\dfrac{1}{2} \\)", "1", "3"], 1,
         "Multiply by \\( x(x - 3) \\): \\( 2x^2 - 3(x - 3) = 6 \\implies 2x^2 - 3x + 9 = 6 \\implies 2x^2 - 3x + 3 = 0 \\) — wait, discriminant \\( 9 - 24 < 0 \\). Let's construct a clean rational equation: \\( \\dfrac{1}{x-1} + \\dfrac{2}{x} = \\dfrac{x+1}{x(x-1)} \\implies x + 2(x - 1) = x + 1 \\implies 3x - 2 = x + 1 \\implies 2x = 3 \\implies x = 1.5 \\). Let's use \\( \\dfrac{x}{x-2} + \\dfrac{1}{x+2} = \\dfrac{8}{x^2-4} \\implies x(x+2) + (x-2) = 8 \\implies x^2 + 3x - 10 = 0 \\implies (x+5)(x-2)=0 \\). At \\( x=2 \\), denominator is 0 (extraneous). The only valid solution is \\( x = -5 \\)."),
        ("A culture of bacteria has an initial population of 400 and doubles every 6 hours. Which function gives the population \\( P(t) \\) after \\( t \\) hours?",
         ["\\( P(t) = 400(2)^{6t} \\)", "\\( P(t) = 400(2)^{t/6} \\)", "\\( P(t) = 400(6)^{t/2} \\)", "\\( P(t) = 400 + 2^{t/6} \\)"], 1,
         "Doubling every 6 hours means the exponent must be \\( t/6 \\): \\( P(t) = 400(2)^{t/6} \\)."),
        ("If \\( \\dfrac{4x+1}{x-2} = A + \\dfrac{B}{x-2} \\) for all \\( x \\neq 2 \\), what is the value of \\( A + B \\)?",
         ["11", "13", "15", "17"], 1,
         "Rewrite numerator: \\( 4x + 1 = 4(x - 2) + 9 \\). Then \\( \\dfrac{4(x - 2) + 9}{x - 2} = 4 + \\dfrac{9}{x - 2} \\). Thus \\( A = 4 \\) and \\( B = 9 \\). The sum is \\( A + B = 4 + 9 = 13 \\)."),
        ("What are all solutions to the rational equation \\( \\dfrac{x}{x-3} = \\dfrac{3}{x-3} + 4 \\)?",
         ["\\( x = 3 \\)", "\\( x = 3 \\text{ and } x = 4 \\)", "\\( x = 4 \\)", "No solution"], 2,
         "Multiply by \\( x - 3 \\): \\( x = 3 + 4(x - 3) \\implies x = 3 + 4x - 12 \\implies x = 4x - 9 \\implies 3x = 9 \\implies x = 3 \\). However, substituting \\( x = 3 \\) makes the denominator \\( x - 3 = 0 \\) undefined! Therefore \\( x = 3 \\) is extraneous and the equation has No solution. (Wait, choice D is No solution, index 3)."),
        ("A radioactive substance has a half-life of 14 days. If the initial quantity is 320 mg, how many milligrams will remain after 42 days?",
         ["20", "40", "80", "160"], 1,
         "The number of half-lives is \\( 42 / 14 = 3 \\). Remaining amount: \\( 320 \\times \\left(\\dfrac{1}{2}\\right)^3 = 320 \\times \\dfrac{1}{8} = 40 \\) mg."),
        ("If \\( P(x) = x^3 - 2x^2 - 5x + 6 \\) has a root at \\( x = 1 \\), what are the other two roots?",
         ["\\( x = -2 \\) and \\( x = 3 \\)", "\\( x = 2 \\) and \\( x = -3 \\)", "\\( x = -1 \\) and \\( x = 6 \\)", "\\( x = 1 \\) and \\( x = -6 \\)"], 0,
         "Divide \\( P(x) \\) by \\( x - 1 \\): \\( x^3 - 2x^2 - 5x + 6 = (x - 1)(x^2 - x - 6) \\). Factor the quadratic: \\( x^2 - x - 6 = (x - 3)(x + 2) \\). The remaining roots are \\( x = 3 \\) and \\( x = -2 \\)."),
        ("The expression \\( 1.06^t \\) models annual growth. Which of the following is closest to the equivalent monthly growth rate?",
         ["\\( (1.0049)^{12t} \\)", "\\( (1.06)^{12t} \\)", "\\( (1.72)^t \\)", "\\( (0.088)^t \\)"], 0,
         "To convert to a monthly rate: \\( 1.06^t = (1.06^{1/12})^{12t} \\). Since \\( 1.06^{1/12} \\approx 1.004868 \\approx 1.0049 \\), the expression is \\( (1.0049)^{12t} \\)."),
        ("If \\( \\sqrt{2x + 15} - x = 0 \\), what is the sum of all valid real solutions?",
         ["3", "5", "7", "8"], 1,
         "\\( \\sqrt{2x + 15} = x \\). Square both sides: \\( 2x + 15 = x^2 \\implies x^2 - 2x - 15 = 0 \\implies (x - 5)(x + 3) = 0 \\). At \\( x = -3 \\): \\( \\sqrt{9} = 3 \\neq -3 \\) (extraneous). At \\( x = 5 \\): \\( \\sqrt{25} = 5 \\) (valid). The only valid solution is 5."),
        ("What is the quotient and remainder when \\( 2x^2 + 7x + 5 \\) is divided by \\( x + 2 \\)?",
         ["Quotient \\( 2x + 3 \\), Remainder \\( -1 \\)", "Quotient \\( 2x + 3 \\), Remainder \\( 1 \\)", "Quotient \\( 2x + 1 \\), Remainder \\( 3 \\)", "Quotient \\( 2x + 5 \\), Remainder \\( 0 \\)"], 0,
         "Perform polynomial division: \\( 2x^2 + 7x + 5 = (x + 2)(2x + 3) - 1 \\). Quotient is \\( 2x + 3 \\) and remainder is \\( -1 \\)."),
        ("If \\( a^{2x} = 5 \\), what is the value of \\( a^{6x} - 25 \\)?",
         ["50", "75", "100", "125"], 2,
         "Notice \\( a^{6x} = (a^{2x})^3 = 5^3 = 125 \\). Therefore \\( a^{6x} - 25 = 125 - 25 = 100 \\)."),
        ("Which of the following is equivalent to \\( \\dfrac{1}{x-2} - \\dfrac{1}{x+2} \\) for \\( x \\neq \\pm 2 \\)?",
         ["\\( \\dfrac{4}{x^2 - 4} \\)", "\\( \\dfrac{2x}{x^2 - 4} \\)", "\\( \\dfrac{-4}{x^2 - 4} \\)", "\\( \\dfrac{2}{x^2 - 4} \\)"], 0,
         "Common denominator: \\( \\dfrac{(x + 2) - (x - 2)}{(x - 2)(x + 2)} = \\dfrac{4}{x^2 - 4} \\)."),
        ("The value of an antique car is modeled by \\( V(t) = 15000(1.05)^t \\), where \\( t \\) is in years. By what percentage does the value increase each year?",
         ["0.05%", "0.5%", "5%", "105%"], 2,
         "In \\( V(t) = P(1 + r)^t \\), \\( 1 + r = 1.05 \\implies r = 0.05 = 5\\% \\)."),
        ("What is the solution to \\( \\dfrac{x^2 - 9}{x - 3} = 2x - 1 \\)?",
         ["2", "3", "4", "5"], 2,
         "For \\( x \\neq 3 \\), \\( \\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3 \\). Set \\( x + 3 = 2x - 1 \\implies x = 4 \\). Since \\( 4 \\neq 3 \\), the solution is valid."),
        ("If \\( 4^{x+1} + 4^x = 80 \\), what is the value of \\( x \\)?",
         ["1", "2", "3", "4"], 1,
         "Factor out \\( 4^x \\): \\( 4^x(4 + 1) = 80 \\implies 5 \\cdot 4^x = 80 \\implies 4^x = 16 \\implies x = 2 \\)."),
        ("For what value of \\( c \\) is \\( x + 3 \\) a factor of \\( 2x^3 + 5x^2 - 4x + c \\)?",
         ["-3", "3", "6", "-6"], 0,
         "By the Factor Theorem, evaluating at \\( x = -3 \\) must give 0: \\( 2(-27) + 5(9) - 4(-3) + c = 0 \\implies -54 + 45 + 12 + c = 0 \\implies 3 + c = 0 \\implies c = -3 \\)."),
        ("Simplify: \\( \\dfrac{\\dfrac{1}{x} + \\dfrac{1}{y}}{\\dfrac{1}{x} - \\dfrac{1}{y}} \\) for \\( x \\neq y \\) and \\( xy \\neq 0 \\).",
         ["\\( \\dfrac{y + x}{y - x} \\)", "\\( \\dfrac{y - x}{y + x} \\)", "\\( \\dfrac{x + y}{x - y} \\)", "-1"], 0,
         "Multiply numerator and denominator by \\( xy \\): \\( \\dfrac{y + x}{y - x} \\)."),
        ("If \\( 8^{x-2} = \\left(\\dfrac{1}{4}\\right)^{x+1} \\), what is the value of \\( x \\)?",
         ["\\( \\dfrac{4}{5} \\)", "\\( 1 \\)", "\\( \\dfrac{6}{5} \\)", "\\( 2 \\)"], 0,
         "Base 2: \\( (2^3)^{x-2} = (2^{-2})^{x+1} \\implies 3(x - 2) = -2(x + 1) \\implies 3x - 6 = -2x - 2 \\implies 5x = 4 \\implies x = 4/5 \\)."),
        ("What is the sum of the solutions to \\( \\sqrt{2x + 3} = x \\)?",
         ["-1", "1", "3", "4"], 2,
         "Square both sides: \\( 2x + 3 = x^2 \\implies x^2 - 2x - 3 = 0 \\implies (x - 3)(x + 1) = 0 \\). Checking \\( x = -1 \\): \\( \\sqrt{1} = 1 \\neq -1 \\) (extraneous). Checking \\( x = 3 \\): \\( \\sqrt{9} = 3 \\) (valid). Only solution is 3."),
        ("If \\( f(x) = 3^x \\) and \\( f(a + b) = 72 \\) with \\( f(a) = 8 \\), what is \\( f(b) \\)?",
         ["6", "8", "9", "12"], 2,
         "By exponent rules, \\( f(a + b) = 3^{a+b} = 3^a \\cdot 3^b = f(a) \\cdot f(b) \\). Thus \\( 72 = 8 \\cdot f(b) \\implies f(b) = 9 \\).")
    ]
    # Update indices in hard_data where choice index was adjusted
    hard_data[1] = ("What is the extraneous solution to the radical equation \\( \\sqrt{x + 18} = x - 2 \\)?",
                    ["-2", "-3", "5", "7"], 0,
                    "Square both sides: \\( x + 18 = x^2 - 4x + 4 \\implies x^2 - 5x - 14 = 0 \\implies (x - 7)(x + 2) = 0 \\). At \\( x = 7 \\), \\( \\sqrt{25} = 5 = 7 - 2 \\) (valid). At \\( x = -2 \\), \\( \\sqrt{16} = 4 \\neq -4 \\) (extraneous). The extraneous solution is \\( -2 \\).")
    hard_data[4] = ("What is the valid real solution to the equation \\( \\dfrac{x}{x-2} + \\dfrac{1}{x+2} = \\dfrac{8}{x^2-4} \\)?",
                    ["-5", "-2", "2", "5"], 0,
                    "Multiply by \\( x^2 - 4 \\): \\( x(x + 2) + (x - 2) = 8 \\implies x^2 + 3x - 10 = 0 \\implies (x + 5)(x - 2) = 0 \\). At \\( x = 2 \\), the denominator is zero (extraneous). The only valid solution is \\( x = -5 \\).")
    hard_data[7] = ("What are all real solutions to the rational equation \\( \\dfrac{x}{x-3} = \\dfrac{3}{x-3} + 4 \\)?",
                    ["\\( x = 3 \\)", "\\( x = 4 \\)", "\\( x = 7 \\)", "No real solution"], 3,
                    "Multiply by \\( x - 3 \\): \\( x = 3 + 4(x - 3) \\implies x = 4x - 9 \\implies 3x = 9 \\implies x = 3 \\). However, substituting \\( x = 3 \\) makes the denominator zero. Therefore \\( x = 3 \\) is extraneous and there is no real solution.")

    for text, ch, ans, sol in hard_data:
        qs.append(make_q(dom, "hard", text, ch, ans, sol))

    return qs
