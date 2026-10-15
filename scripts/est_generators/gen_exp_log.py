import random
from .common import make_est_mcq, shuffle_choices

def generate_exp_log_questions(count=130):
    questions = []

    # Template 1: Solving exponential equations with common bases
    for _ in range(count // 5):
        # 4^(2x - 1) = 8^(x + 2) => 2^(4x - 2) = 2^(3x + 6) => 4x - 2 = 3x + 6 => x = 8
        base_prime = random.choice([2, 3])
        p1 = 2
        p2 = 3
        # base1 = base_prime^p1, base2 = base_prime^p2
        base1 = base_prime ** p1
        base2 = base_prime ** p2
        # base1^(x + a) = base2^(x - b)
        # p1*(x + a) = p2*(x - b) => p1*x + p1*a = p2*x - p2*b => (p2 - p1)x = p1*a + p2*b
        a = random.randint(1, 4)
        b = random.randint(1, 3)
        # since p2 - p1 = 3 - 2 = 1, x = 2*a + 3*b
        x_sol = p1 * a + p2 * b
        text = f"If \\( {base1}^{{x + {a}}} = {base2}^{{x - {b}}} \\), what is the value of \\( x \\)?"
        distractors = [
            f"\\({x_sol + 3}\\)",
            f"\\({x_sol - 2}\\)",
            f"\\({p1 * a - p2 * b}\\)",
            f"\\({a + b}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({x_sol}\\)", distractors)
        sol = f"Express both sides with a common base of {base_prime}:\n\\[ ({base_prime}^{{{p1}}})^{{x + {a}}} = ({base_prime}^{{{p2}}})^{{x - {b}}} \\]\nUsing the power of a power rule \\((b^m)^n = b^{{mn}}\\):\n\\[ {base_prime}^{{{p1}(x + {a})}} = {base_prime}^{{{p2}(x - {b})}} \\]\nSince the bases are equal, equate the exponents:\n\\[ {p1}(x + {a}) = {p2}(x - {b}) \\]\n\\[ {p1}x + {p1*a} = {p2}x - {p2*b} \\]\n\\[ {p1*a + p2*b} = {p2 - p1}x \\Rightarrow x = {x_sol} \\]."
        questions.append(make_est_mcq("Exponentials & Logarithms", text, opts, idx, sol, "medium"))

    # Template 2: Logarithm expansion and properties
    for _ in range(count // 5):
        # log_b (x^a * y^c / z^d) = a log x + c log y - d log z
        a = random.randint(2, 5)
        c = random.randint(2, 4)
        d = random.randint(2, 5)
        text = f"Which of the following is equivalent to \\( \\log_b \\left( \\frac{{x^{{{a}}} y^{{{c}}}}}{{z^{{{d}}}}} \\right) \\) for all positive values of \\( x, y, z \\)?"
        correct_expr = f"\\( {a}\\log_b(x) + {c}\\log_b(y) - {d}\\log_b(z) \\)"
        distractors = [
            f"\\( \\frac{{{a}\\log_b(x) + {c}\\log_b(y)}}{{{d}\\log_b(z)}} \\)",
            f"\\( {a}\\log_b(x) \\cdot {c}\\log_b(y) - {d}\\log_b(z) \\)",
            f"\\( {a}\\log_b(x) - {c}\\log_b(y) - {d}\\log_b(z) \\)"
        ]
        opts, idx = shuffle_choices(correct_expr, distractors)
        sol = f"Apply the fundamental logarithmic laws:\n1) Quotient Rule: \\(\\log_b(M/N) = \\log_b(M) - \\log_b(N)\\)\n\\[ \\log_b \\left( \\frac{{x^{{{a}}} y^{{{c}}}}}{{z^{{{d}}}}} \\right) = \\log_b(x^{{{a}}} y^{{{c}}}) - \\log_b(z^{{{d}}}) \\]\n2) Product Rule: \\(\\log_b(MN) = \\log_b(M) + \\log_b(N)\\)\n\\[ = \\log_b(x^{{{a}}}) + \\log_b(y^{{{c}}}) - \\log_b(z^{{{d}}}) \\]\n3) Power Rule: \\(\\log_b(M^k) = k\\log_b(M)\\)\n\\[ = {a}\\log_b(x) + {c}\\log_b(y) - {d}\\log_b(z) \\]."
        questions.append(make_est_mcq("Exponentials & Logarithms", text, opts, idx, sol, "easy"))

    # Template 3: Exponential Growth / Decay model interpretation
    for _ in range(count // 5):
        init = random.choice([500, 1200, 2500, 4000, 8000])
        pct = random.randint(3, 18)
        is_decay = random.choice([True, False])
        if is_decay:
            factor = round(1 - pct / 100.0, 2)
            desc = f"decreases by {pct}% each year"
        else:
            factor = round(1 + pct / 100.0, 2)
            desc = f"increases by {pct}% each year"
        
        text = f"The population of a species is initially {init} and {desc}. Which function models the population \\( P(t) \\) after \\( t \\) years?"
        correct_model = f"\\( P(t) = {init}({factor})^t \\)"
        distractors = [
            f"\\( P(t) = {init} + ({factor})^t \\)",
            f"\\( P(t) = {init}({pct})^t \\)",
            f"\\( P(t) = {init}({round(1 + pct if is_decay else 1 - pct, 2)})^t \\)"
        ]
        opts, idx = shuffle_choices(correct_model, distractors)
        sol = f"The standard exponential growth or decay formula is \\( P(t) = P_0 (1 \\pm r)^t \\), where \\( P_0 \\) is the initial amount and \\( r \\) is the annual rate of change as a decimal.\nHere, initial population \\( P_0 = {init} \\).\nRate: \\( r = {pct}\\% = {pct/100} \\).\nGrowth/decay factor: \\( 1 {'-' if is_decay else '+'} {pct/100} = {factor} \\).\nThus, the population function is \\( P(t) = {init}({factor})^t \\)."
        questions.append(make_est_mcq("Exponentials & Logarithms", text, opts, idx, sol, "easy"))

    # Template 4: Evaluating Logarithms
    for _ in range(count // 5):
        b = random.choice([2, 3, 5])
        exp = random.choice([-3, -2, -1, 2, 3, 4])
        if exp < 0:
            val_str = f"\\frac{{1}}{{{b ** abs(exp)}}}"
        else:
            val_str = f"{b ** exp}"
        text = f"What is the exact value of \\( \\log_{{{b}}} \\left( {val_str} \\right) \\)?"
        distractors = [
            f"\\({-exp}\\)",
            f"\\({exp + 1}\\)",
            f"\\({b * exp}\\)",
            f"\\({b}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({exp}\\)", distractors)
        sol = f"By definition, \\( \\log_b(y) = x \\) is equivalent to \\( b^x = y \\).\nHere, we set \\( \\log_{{{b}}}\\left({val_str}\\right) = x \\), which means:\n\\[ {b}^x = {val_str} = {b}^{{{exp}}} \\]\nSince the bases are identical, \\( x = {exp} \\)."
        questions.append(make_est_mcq("Exponentials & Logarithms", text, opts, idx, sol, "easy"))

    # Template 5: Rational Exponents and Radicals Simplification
    for _ in range(count - len(questions)):
        # (x^a)^(1/b) = x^(a/b)
        a = random.choice([2, 4, 6])
        b = random.choice([3, 5])
        # x^(a/b) = \sqrt[b]{x^a}
        text = f"For all positive values of \\( x \\), which expression is equivalent to \\( x^{{\\frac{{{a}}}{{{b}}}}} \\)?"
        correct_rad = f"\\( \\sqrt[{{{b}}}]{{x^{{{a}}}}} \\)"
        distractors = [
            f"\\( \\sqrt[{{{a}}}]{{x^{{{b}}}}} \\)",
            f"\\( \\frac{{x^{{{a}}}}}{{{b}}} \\)",
            f"\\( \\frac{{1}}{{\\sqrt[{{{b}}}]{{x^{{{a}}}}}}} \\)"
        ]
        opts, idx = shuffle_choices(correct_rad, distractors)
        sol = f"By the definition of rational exponents:\n\\[ x^{{\\frac{{m}}{{n}}}} = \\sqrt[n]{{x^m}} = (\\sqrt[n]{{x}})^m \\]\nwhere \\( n \\) is the index of the radical (root) and \\( m \\) is the power.\nThus, \\( x^{{\\frac{{{a}}}{{{b}}}}} = \\sqrt[{{{b}}}]{{x^{{{a}}}}} \\)."
        questions.append(make_est_mcq("Exponentials & Logarithms", text, opts, idx, sol, "easy"))

    return questions
