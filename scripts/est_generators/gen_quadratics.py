import random
from .common import make_est_mcq, shuffle_choices

def generate_quadratics_questions(count=100):
    questions = []

    # Template 1: Remainder Theorem / Factor Theorem
    for _ in range(count // 5):
        c = random.choice([2, 3, -2, -3])
        # P(x) = 2x^3 - k x^2 + 5x - 6. If (x - c) is a factor, P(c) = 0
        # 2*c^3 - k*c^2 + 5*c - 6 = 0 => k * c^2 = 2*c^3 + 5*c - 6
        # Let's construct P(x) with integer k
        a3 = random.choice([1, 2])
        a1 = random.randint(1, 4)
        const = random.randint(2, 10)
        # P(c) = a3 * c^3 - k * c^2 + a1 * c - const = 0
        # k * c^2 = a3 * c^3 + a1 * c - const
        # Choose const such that (a3*c^3 + a1*c - const) is divisible by c^2
        rem_target = (a3 * (c**3) + a1 * c) % (c**2)
        const = rem_target if rem_target != 0 else (c**2)
        k_val = (a3 * (c**3) + a1 * c - const) // (c**2)
        
        sign_c = f"- {c}" if c > 0 else f"+ {abs(c)}"
        text = f"If \\( (x {sign_c}) \\) is a factor of the polynomial \\( P(x) = {a3 if a3!=1 else ''}x^3 - kx^2 + {a1}x - {const} \\), what is the value of the constant \\( k \\)?"
        distractors = [
            f"\\({k_val + 2}\\)",
            f"\\({-k_val}\\)",
            f"\\({k_val - 3}\\)",
            f"\\({c * 2}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({k_val}\\)", distractors)
        sol = f"By the Factor Theorem, if \\( (x {sign_c}) \\) is a factor of \\( P(x) \\), then \\( P({c}) = 0 \\).\nSubstitute \\( x = {c} \\) into \\( P(x) \\):\n\\[ P({c}) = {a3}({c})^3 - k({c})^2 + {a1}({c}) - {const} = 0 \\]\n\\[ {a3 * (c**3)} - {c**2}k + {a1 * c} - {const} = 0 \\]\n\\[ {a3 * (c**3) + a1 * c - const} = {c**2}k \\]\nDivide by \\({c**2}\\):\n\\[ k = {k_val} \\]."
        questions.append(make_est_mcq("Quadratics & Polynomials", text, opts, idx, sol, "medium"))

    # Template 2: Sum and Product of roots (Vieta's Formulas)
    for _ in range(count // 5):
        a = random.choice([2, 3, 4])
        b = random.randint(5, 15)
        c = random.randint(-12, 12)
        while c == 0:
            c = random.randint(-12, 12)
        # 2x^2 - b x + c = 0
        # What is the sum of the solutions?
        # sum = b / a
        sign_b = f"- {b}x"
        sign_c = f"+ {c}" if c > 0 else f"- {abs(c)}"
        correct_sum = f"\\( \\frac{{{b}}}{{{a}}} \\)"
        distractors = [
            f"\\( -\\frac{{{b}}}{{{a}}} \\)",
            f"\\( \\frac{{{c}}}{{{a}}} \\)",
            f"\\( -\\frac{{{c}}}{{{a}}} \\)"
        ]
        text = f"What is the sum of the roots of the quadratic equation \\( {a}x^2 {sign_b} {sign_c} = 0 \\)?"
        opts, idx = shuffle_choices(correct_sum, distractors)
        sol = f"For any quadratic equation \\( ax^2 + bx + c = 0 \\), Vieta's formulas state that:\n- Sum of roots: \\( r_1 + r_2 = -\\frac{{b}}{{a}} \\)\n- Product of roots: \\( r_1 r_2 = \\frac{{c}}{{a}} \\)\nHere, \\( a = {a} \\), \\( b = -{b} \\), and \\( c = {c} \\).\nThus, the sum of the roots is:\n\\[ r_1 + r_2 = -\\frac{{-{b}}}{{{a}}} = \\frac{{{b}}}{{{a}}} \\]."
        questions.append(make_est_mcq("Quadratics & Polynomials", text, opts, idx, sol, "easy"))

    # Template 3: Discriminant & Number of Solutions
    for _ in range(count // 5):
        # ax^2 + bx + c = 0 has exactly one real solution => b^2 - 4ac = 0 => c = b^2 / (4a)
        a = random.choice([1, 2, 4])
        # let b be even so b^2 is divisible by 4a
        b = 2 * a * random.randint(1, 4)
        c_val = (b ** 2) // (4 * a)
        text = f"For what positive value of \\( c \\) does the equation \\( {a if a!=1 else ''}x^2 - {b}x + c = 0 \\) have exactly one distinct real solution?"
        distractors = [
            f"\\({c_val * 2}\\)",
            f"\\({c_val + 4}\\)",
            f"\\({b // 2}\\)",
            f"\\({b ** 2}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({c_val}\\)", distractors)
        sol = f"A quadratic equation \\( ax^2 + bx + c = 0 \\) has exactly one distinct real solution (a double root) when its discriminant \\( \\Delta = b^2 - 4ac \\) is equal to zero:\n\\[ (-{b})^2 - 4({a})(c) = 0 \\]\n\\[ {b**2} - {4*a}c = 0 \\]\n\\[ {4*a}c = {b**2} \\]\n\\[ c = \\frac{{{b**2}}}{{{4*a}}} = {c_val} \\]."
        questions.append(make_est_mcq("Quadratics & Polynomials", text, opts, idx, sol, "medium"))

    # Template 4: Simplifying Rational Algebraic Expressions
    for _ in range(count // 5):
        r1 = random.randint(2, 6)
        r2 = random.randint(1, 5)
        while r2 == r1:
            r2 = random.randint(1, 5)
        # Numerator: x^2 - (r1+r2)x + r1*r2 = (x - r1)(x - r2)
        # Denominator: x^2 - r1^2 = (x - r1)(x + r1)
        # Simplified: (x - r2) / (x + r1)
        b_num = -(r1 + r2)
        c_num = r1 * r2
        text = f"Which of the following is equivalent to the expression \\( \\frac{{x^2 - {r1+r2}x + {c_num}}}{{x^2 - {r1**2}}} \\) for all \\( x \\ne \\pm {r1} \\)?"
        correct_expr = f"\\( \\frac{{x - {r2}}}{{x + {r1}}} \\)"
        distractors = [
            f"\\( \\frac{{x + {r2}}}{{x - {r1}}} \\)",
            f"\\( \\frac{{x - {r2}}}{{x - {r1}}} \\)",
            f"\\( \\frac{{-{r1+r2}x + {c_num}}}{{-{r1**2}}} \\)"
        ]
        opts, idx = shuffle_choices(correct_expr, distractors)
        sol = f"Factor both the numerator and the denominator completely:\nNumerator: \\( x^2 - {r1+r2}x + {c_num} = (x - {r1})(x - {r2}) \\).\nDenominator: \\( x^2 - {r1**2} = (x - {r1})(x + {r1}) \\) (difference of two squares).\nDividing out the common factor \\( (x - {r1}) \\):\n\\[ \\frac{{(x - {r1})(x - {r2})}}{{(x - {r1})(x + {r1})}} = \\frac{{x - {r2}}}{{x + {r1}}} \\]."
        questions.append(make_est_mcq("Quadratics & Polynomials", text, opts, idx, sol, "medium"))

    # Template 5: Quadratic Formula Solutions with Radicals
    for _ in range(count - len(questions)):
        # x^2 - 2px + q = 0 => x = p +/- sqrt(p^2 - q)
        p = random.randint(2, 5)
        d_inner = random.choice([2, 3, 5, 7])
        q_val = p**2 - d_inner
        b_term = 2 * p
        sign_q = f"+ {q_val}" if q_val >= 0 else f"- {abs(q_val)}"
        text = f"What are the solutions to the quadratic equation \\( x^2 - {b_term}x {sign_q} = 0 \\)?"
        correct_ans = f"\\( {p} \\pm \\sqrt{{{d_inner}}} \\)"
        distractors = [
            f"\\( {-p} \\pm \\sqrt{{{d_inner}}} \\)",
            f"\\( {2*p} \\pm \\sqrt{{{d_inner}}} \\)",
            f"\\( {p} \\pm {d_inner} \\)"
        ]
        opts, idx = shuffle_choices(correct_ans, distractors)
        sol = f"Apply the quadratic formula \\( x = \\frac{{-b \\pm \\sqrt{{b^2 - 4ac}}}}{{2a}} \\) where \\( a = 1 \\), \\( b = -{b_term} \\), and \\( c = {q_val} \\):\n\\[ x = \\frac{{-({-b_term}) \\pm \\sqrt{{(-{b_term})^2 - 4(1)({q_val})}}}}{{2(1)}} \\]\n\\[ x = \\frac{{{b_term} \\pm \\sqrt{{{b_term**2} - {4*q_val}}}}}{{2}} = \\frac{{{b_term} \\pm \\sqrt{{{4 * d_inner}}}}}{{2}} \\]\n\\[ x = \\frac{{{b_term} \\pm 2\\sqrt{{{d_inner}}}}}{{2}} = {p} \\pm \\sqrt{{{d_inner}}} \\]."
        questions.append(make_est_mcq("Quadratics & Polynomials", text, opts, idx, sol, "hard"))

    return questions
