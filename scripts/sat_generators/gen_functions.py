"""
scripts/sat_generators/gen_functions.py
Generator for Functions & Function Notation questions.
"""

from .common import make_q

def get_new_questions():
    qs = []
    dom = "Functions & Function Notation"

    # ==================== EASY (12 questions) ====================
    easy_data = [
        ("If \\( f(x) = 3x - 5 \\), what is the value of \\( f(4) \\)?",
         ["5", "7", "9", "12"], 1,
         "\\( f(4) = 3(4) - 5 = 12 - 5 = 7 \\)."),
        ("If \\( g(x) = x^2 + 4 \\), what is the value of \\( g(-3) \\)?",
         ["-5", "10", "13", "15"], 2,
         "\\( g(-3) = (-3)^2 + 4 = 9 + 4 = 13 \\)."),
        ("For what value of \\( x \\) does the function \\( f(x) = 2x + 8 \\) equal 0?",
         ["-4", "-2", "2", "4"], 0,
         "Set \\( 2x + 8 = 0 \\implies 2x = -8 \\implies x = -4 \\)."),
        ("Which of the following values of \\( x \\) is NOT in the domain of \\( h(x) = \\dfrac{5}{x - 7} \\)?",
         ["-7", "0", "5", "7"], 3,
         "The denominator cannot be zero: \\( x - 7 = 0 \\implies x = 7 \\). Thus 7 is not in the domain."),
        ("If \\( f(x) = 4 - 2x \\), what is the value of \\( f(0) + f(2) \\)?",
         ["0", "2", "4", "6"], 2,
         "\\( f(0) = 4 - 0 = 4 \\) and \\( f(2) = 4 - 2(2) = 0 \\). Sum is \\( 4 + 0 = 4 \\)."),
        ("If \\( g(x) = \\sqrt{x + 9} \\), what is the smallest real number in the domain of \\( g \\)?",
         ["-9", "-3", "0", "3"], 0,
         "The radicand must be non-negative: \\( x + 9 \\geq 0 \\implies x \\geq -9 \\). Smallest value is \\( -9 \\)."),
        ("A function \\( f \\) satisfies \\( f(3) = 11 \\) and \\( f(5) = 17 \\). If \\( f \\) is linear, what is \\( f(1) \\)?",
         ["3", "5", "7", "8"], 1,
         "Slope \\( m = \\dfrac{17 - 11}{5 - 3} = \\dfrac{6}{2} = 3 \\). Then \\( f(1) = f(3) - 2(3) = 11 - 6 = 5 \\)."),
        ("If \\( h(x) = |x - 4| + 2 \\), what is the minimum value of \\( h(x) \\)?",
         ["0", "2", "4", "6"], 1,
         "Since \\( |x - 4| \\geq 0 \\) with equality at \\( x = 4 \\), the minimum value of \\( h(x) \\) is \\( 0 + 2 = 2 \\)."),
        ("If \\( f(x) = 5x - 3 \\) and \\( f(a) = 22 \\), what is the value of \\( a \\)?",
         ["4", "5", "6", "7"], 1,
         "\\( 5a - 3 = 22 \\implies 5a = 25 \\implies a = 5 \\)."),
        ("Which of the following functions has the property that \\( f(-x) = f(x) \\) for all \\( x \\)?",
         ["\\( f(x) = x^2 + 3 \\)", "\\( f(x) = x^3 - x \\)", "\\( f(x) = 2x + 1 \\)", "\\( f(x) = x^5 \\)"], 0,
         "An even function satisfies \\( f(-x) = f(x) \\). \\( f(-x) = (-x)^2 + 3 = x^2 + 3 = f(x) \\)."),
        ("If \\( f(x) = 2x^2 - 1 \\), what is \\( f(3) - f(1) \\)?",
         ["12", "14", "16", "18"], 2,
         "\\( f(3) = 2(9) - 1 = 17 \\) and \\( f(1) = 2(1) - 1 = 1 \\). Then \\( 17 - 1 = 16 \\)."),
        ("If \\( k(x) = \\dfrac{12}{x} \\), what is \\( k(k(4)) \\)?",
         ["3", "4", "6", "12"], 1,
         "\\( k(4) = 12/4 = 3 \\). Then \\( k(3) = 12/3 = 4 \\).")
    ]
    for text, ch, ans, sol in easy_data:
        qs.append(make_q(dom, "easy", text, ch, ans, sol))

    # ==================== MEDIUM (8 questions) ====================
    med_data = [
        ("If \\( f(x) = 2x + 3 \\) and \\( g(x) = x^2 - 1 \\), what is \\( f(g(3)) \\)?",
         ["15", "17", "19", "21"], 2,
         "First, \\( g(3) = 3^2 - 1 = 8 \\). Then \\( f(8) = 2(8) + 3 = 16 + 3 = 19 \\)."),
        ("If \\( f(x) = 3x - 4 \\) and \\( g(x) = 2x + 5 \\), what is the value of \\( g(f(2)) \\)?",
         ["7", "9", "11", "13"], 1,
         "\\( f(2) = 3(2) - 4 = 2 \\). Then \\( g(2) = 2(2) + 5 = 9 \\)."),
        ("The graph of \\( y = f(x) \\) is shifted 4 units to the right and 3 units down. Which function represents the transformed graph?",
         ["\\( y = f(x - 4) - 3 \\)", "\\( y = f(x + 4) - 3 \\)", "\\( y = f(x - 4) + 3 \\)", "\\( y = f(x + 4) + 3 \\)"], 0,
         "Shifting right by 4 replaces \\( x \\) with \\( x - 4 \\), and shifting down by 3 subtracts 3: \\( y = f(x - 4) - 3 \\)."),
        ("If \\( f(x) = 4x - 7 \\), what is the equation for the inverse function \\( f^{-1}(x) \\)?",
         ["\\( f^{-1}(x) = \\dfrac{x + 7}{4} \\)", "\\( f^{-1}(x) = \\dfrac{x - 7}{4} \\)", "\\( f^{-1}(x) = 4x + 7 \\)", "\\( f^{-1}(x) = \\dfrac{1}{4x - 7} \\)"], 0,
         "Let \\( y = 4x - 7 \\). Swap variables: \\( x = 4y - 7 \\implies 4y = x + 7 \\implies y = \\dfrac{x + 7}{4} \\)."),
        ("The function \\( h(x) = -2(x - 3)^2 + 8 \\) has a maximum value at which point \\( (x, y) \\)?",
         ["\\( (-3, 8) \\)", "\\( (3, 8) \\)", "\\( (3, -8) \\)", "\\( (8, 3) \\)"], 1,
         "The vertex form \\( y = a(x - h)^2 + k \\) with \\( a < 0 \\) has its maximum at \\( (h, k) = (3, 8) \\)."),
        ("If \\( f(x) = x^2 + 2x \\) and \\( g(x) = x - 3 \\), for what value of \\( x \\) does \\( f(g(x)) = 0 \\)?",
         ["\\( x = 1 \\text{ or } x = 3 \\)", "\\( x = 3 \\text{ or } x = 5 \\)", "\\( x = -3 \\text{ or } x = 1 \\)", "\\( x = -1 \\text{ or } x = 3 \\)"], 0,
         "\\( f(u) = u^2 + 2u = u(u + 2) = 0 \\implies u = 0 \\text{ or } u = -2 \\). Since \\( u = g(x) = x - 3 \\): \\( x - 3 = 0 \\implies x = 3 \\); and \\( x - 3 = -2 \\implies x = 1 \\). The solutions are 1 and 3."),
        ("What is the domain of \\( f(x) = \\dfrac{\\sqrt{x - 2}}{x - 5} \\)?",
         ["\\( x \\geq 2 \\)", "\\( x > 2 \\text{ and } x \\neq 5 \\)", "\\( x \\geq 2 \\text{ and } x \\neq 5 \\)", "\\( x \\neq 5 \\)"], 2,
         "The radicand requires \\( x - 2 \\geq 0 \\implies x \\geq 2 \\). The denominator requires \\( x - 5 \\neq 0 \\implies x \\neq 5 \\). Combining: \\( x \\geq 2 \\text{ and } x \\neq 5 \\)."),
        ("If \\( f(x) = 2^x + 3 \\), what is the range of \\( f \\)?",
         ["\\( y > 0 \\)", "\\( y \\geq 3 \\)", "\\( y > 3 \\)", "All real numbers"], 2,
         "Since \\( 2^x > 0 \\) for all real \\( x \\), \\( 2^x + 3 > 3 \\). The range is \\( y > 3 \\).")
    ]
    for text, ch, ans, sol in med_data:
        qs.append(make_q(dom, "medium", text, ch, ans, sol))

    # ==================== HARD (2 questions) ====================
    hard_data = [
        ("The function \\( f \\) is defined by \\( f(x) = \\dfrac{3x - 1}{2x + 5} \\) for \\( x \\neq -2.5 \\). What is the value of \\( f^{-1}(2) \\)?",
         ["-11", "-9", "-7", "9"], 0,
         "Let \\( f(x) = 2 \\implies \\dfrac{3x - 1}{2x + 5} = 2 \\implies 3x - 1 = 2(2x + 5) = 4x + 10 \\implies x = -11 \\). Therefore \\( f^{-1}(2) = -11 \\)."),
        ("Let \\( f(x) = \\begin{cases} 2x + k, & x < 3 \\\\ x^2 - 1, & x \\geq 3 \\end{cases} \\). If \\( f \\) is continuous at \\( x = 3 \\), what is the value of \\( k \\)?",
         ["1", "2", "3", "4"], 1,
         "For continuity at \\( x = 3 \\), the left and right limits must be equal: \\( 2(3) + k = 3^2 - 1 \\implies 6 + k = 8 \\implies k = 2 \\).")
    ]
    for text, ch, ans, sol in hard_data:
        qs.append(make_q(dom, "hard", text, ch, ans, sol))

    return qs
