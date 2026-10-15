import random
from .common import make_est_mcq, shuffle_choices

def generate_algebra_questions(count=80):
    questions = []
    
    # Template 1: System of linear equations with no solution (parallel lines)
    for _ in range(count // 5):
        m = random.choice([2, 3, 4, 5, -2, -3, -4])
        b1 = random.randint(1, 9)
        b2 = b1 + random.randint(2, 6)
        c = random.choice([2, 3, 4])
        # Line 1: y = m x + b1  => -m x + y = b1
        # Line 2: k x - c y = -c * b2  => y = (k/c) x + b2
        # For no solution: k/c = m => k = c * m
        k_correct = c * m
        text = f"In the system of equations below, \\( k \\) is a constant:\n\\[ \\begin{{aligned}} -{m}x + y &= {b1} \\\\ kx - {c}y &= -{c*b2} \\end{{aligned}} \\]\nFor which value of \\( k \\) does the system have no solution?"
        distractors = [
            f"\\({-k_correct}\\)",
            f"\\({m}\\)",
            f"\\({c}\\)",
            f"\\({k_correct + random.choice([-2, 2])}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({k_correct}\\)", distractors)
        sol = f"Two linear equations have no solution if and only if their slopes are equal and their \\(y\\)-intercepts differ (representing distinct parallel lines). Rewriting each equation in slope-intercept form \\(y = mx + b\\):\nFrom Equation 1: \\(y = {m}x + {b1}\\), slope \\(m_1 = {m}\\).\nFrom Equation 2: \\(-{c}y = -kx - {c*b2} \\Rightarrow y = \\frac{{k}}{{{c}}}x + {b2}\\), slope \\(m_2 = \\frac{{k}}{{{c}}}\\).\nSetting slopes equal: \\(\\frac{{k}}{{{c}}} = {m} \\Rightarrow k = {k_correct}\\)."
        questions.append(make_est_mcq("Heart of Algebra", text, opts, idx, sol, "medium"))

    # Template 2: Absolute value equation with extraneous check or sum of solutions
    for _ in range(count // 5):
        a = random.choice([2, 3, 4])
        b = random.randint(1, 7)
        c = random.randint(b + 3, b + 15)
        # |a x + b| = c => a x + b = c or a x + b = -c
        # x1 = (c - b) / a, x2 = (-c - b) / a
        # Sum of solutions = -2b / a
        # To make integer or clean fraction:
        b = random.choice([2, 4, 6])
        a = 2
        c = b + 8
        x1 = (c - b) // a
        x2 = (-c - b) // a
        ans_sum = x1 + x2
        text = f"What is the sum of all solutions to the equation \\( |{a}x + {b}| = {c} \\)?"
        distractors = [
            f"\\({-ans_sum}\\)",
            f"\\({x1}\\)",
            f"\\({x2}\\)",
            f"\\(0\\)"
        ]
        opts, idx = shuffle_choices(f"\\({ans_sum}\\)", distractors)
        sol = f"The equation \\(|{a}x + {b}| = {c}\\) splits into two linear cases:\nCase 1: \\({a}x + {b} = {c} \\Rightarrow {a}x = {c-b} \\Rightarrow x = {x1}\\).\nCase 2: \\({a}x + {b} = -{c} \\Rightarrow {a}x = {-c-b} \\Rightarrow x = {x2}\\).\nSum of solutions: \\({x1} + ({x2}) = {ans_sum}\\)."
        questions.append(make_est_mcq("Heart of Algebra", text, opts, idx, sol, "easy"))

    # Template 3: Linear model interpretation in word context
    for _ in range(count // 5):
        rate = random.randint(15, 45)
        base = random.randint(50, 150)
        item = random.choice(["service call", "catering delivery", "equipment rental", "consultation visit"])
        text = f"A technician charges a flat initial fee of \\${base} plus an hourly rate of \\${rate} for each hour of labor on a {item}. The total charge \\( C \\) in dollars for \\( h \\) hours of work is given by \\( C = {rate}h + {base} \\). What is the best interpretation of the number \\( {rate} \\) in this context?"
        c_ans = f"The hourly labor rate of \\${rate} per hour"
        distractors = [
            f"The minimum flat fee charged for the visit, \\${rate}",
            f"The total cost for {base} hours of service",
            f"The number of hours needed to complete the {item}"
        ]
        opts, idx = shuffle_choices(c_ans, distractors)
        sol = f"In the linear equation \\(C = {rate}h + {base}\\), the coefficient of \\(h\\) represents the slope or rate of change (cost per additional hour). The constant term \\({base}\\) represents the \\(C\\)-intercept (initial flat fee when \\(h = 0\\)). Thus, \\({rate}\\) is the hourly labor rate in dollars per hour."
        questions.append(make_est_mcq("Heart of Algebra", text, opts, idx, sol, "easy"))

    # Template 4: Inequality system solution coordinate check
    for _ in range(count // 5):
        m1 = random.choice([2, 3])
        b1 = random.randint(1, 4)
        # y > m1 x + b1 and y <= -x + 10
        # point (x, y) that satisfies both
        target_x = 1
        target_y = m1 * target_x + b1 + 2
        ans_pt = f"\\(({target_x}, {target_y})\\)"
        distractors = [
            f"\\(({target_x}, {target_y - 5})\\)",
            f"\\(({target_x + 5}, {target_y + 10})\\)",
            f"\\((0, {b1 - 2})\\)"
        ]
        text = f"Which ordered pair \\( (x, y) \\) satisfies the system of inequalities below?\n\\[ \\begin{{aligned}} y &> {m1}x + {b1} \\\\ y &\\le -x + 10 \\end{{aligned}} \\]"
        opts, idx = shuffle_choices(ans_pt, distractors)
        sol = f"Test the ordered pair \\(({target_x}, {target_y})\\) in both inequalities:\n1) \\({target_y} > {m1}({target_x}) + {b1} = {m1*target_x + b1}\\), which is \\({target_y} > {m1*target_x + b1}\\) (True).\n2) \\({target_y} \\le -({target_x}) + 10 = {10 - target_x}\\), which is \\({target_y} \\le {10 - target_x}\\) (True).\nBoth conditions are satisfied."
        questions.append(make_est_mcq("Heart of Algebra", text, opts, idx, sol, "medium"))

    # Template 5: Rational equation with cross-multiplication
    for _ in range(count - len(questions)):
        a = random.randint(2, 5)
        c = random.randint(1, 4)
        d = random.randint(3, 7)
        # (x + c) / a = (2x - 1) / d => d(x + c) = a(2x - 1) => dx + dc = 2ax - a => (2a - d)x = dc + a
        if 2 * a == d:
            d += 1
        x_val = (d * c + a) / (2 * a - d)
        # make it integer
        # Let 2a - d = 1 => d = 2a - 1
        d = 2 * a - 1
        x_int = d * c + a
        text = f"If \\( \\frac{{x + {c}}}{{{a}}} = \\frac{{2x - 1}}{{{d}}} \\), what is the value of \\( x \\)?"
        distractors = [
            f"\\({x_int + 2}\\)",
            f"\\({x_int - 3}\\)",
            f"\\({c + d}\\)",
            f"\\({2*a}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({x_int}\\)", distractors)
        sol = f"Cross-multiply the rational equation:\n\\[ {d}(x + {c}) = {a}(2x - 1) \\]\n\\[ {d}x + {d*c} = {2*a}x - {a} \\]\nSubtract \\({d}x\\) from both sides and add \\({a}\\):\n\\[ {2*a - d}x = {d*c + a} \\Rightarrow x = {x_int} \\]."
        questions.append(make_est_mcq("Heart of Algebra", text, opts, idx, sol, "medium"))

    return questions
