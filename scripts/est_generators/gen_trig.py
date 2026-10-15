import random
from .common import make_est_mcq, shuffle_choices

def generate_trig_questions(count=120):
    questions = []

    # Template 1: Cofunction identity sin(x) = cos(90 - x)
    for _ in range(count // 5):
        angle = random.randint(15, 75)
        comp = 90 - angle
        # If sin(angle) = a/b, cos(comp) = a/b
        num = random.choice([3, 5, 7, 8])
        den = num + random.choice([1, 2, 4, 5])
        text = f"In a right triangle, angle \\( A \\) and angle \\( B \\) are acute angles such that \\( \\sin(A) = \\frac{{{num}}}{{{den}}} \\). What is the value of \\( \\cos(B) \\)?"
        correct_ans = f"\\( \\frac{{{num}}}{{{den}}} \\)"
        distractors = [
            f"\\( \\frac{{{den - num}}}{{{den}}} \\)",
            f"\\( \\frac{{{den}}}{{{num}}} \\)",
            f"\\( \\frac{{{num + 1}}}{{{den}}} \\)"
        ]
        opts, idx = shuffle_choices(correct_ans, distractors)
        sol = f"In any right triangle, the two acute angles \\( A \\) and \\( B \\) are complementary, meaning \\( A + B = 90^\\circ \\) (or \\( B = 90^\\circ - A \\)).\nBy the cofunction identity:\n\\[ \\cos(B) = \\cos(90^\\circ - A) = \\sin(A) \\]\nSince \\( \\sin(A) = \\frac{{{num}}}{{{den}}} \\), we have \\( \\cos(B) = \\frac{{{num}}}{{{den}}} \\)."
        questions.append(make_est_mcq("Trigonometry & Additional Topics", text, opts, idx, sol, "easy"))

    # Template 2: Radian to degree / degree to radian
    for _ in range(count // 5):
        # Choose a nice angle
        angles = [(30, "\\frac{\\pi}{6}"), (45, "\\frac{\\pi}{4}"), (60, "\\frac{\\pi}{3}"),
                  (120, "\\frac{2\\pi}{3}"), (135, "\\frac{3\\pi}{4}"), (150, "\\frac{5\\pi}{6}"),
                  (210, "\\frac{7\\pi}{6}"), (240, "\\frac{4\\pi}{3}"), (300, "\\frac{5\\pi}{3}"),
                  (315, "\\frac{7\\pi}{4}"), (330, "\\frac{11\\pi}{6}")]
        deg, rad = random.choice(angles)
        text = f"What is the radian measure of an angle of \\( {deg}^\\circ \\)?"
        correct_ans = f"\\( {rad} \\)"
        distractors = [
            f"\\( \\frac{{{deg}\\pi}}{{360}} \\)",
            f"\\( \\frac{{\\pi}}{{{deg // 10}}} \\)",
            f"\\( \\frac{{{deg}}}{{180\\pi}} \\)"
        ]
        opts, idx = shuffle_choices(correct_ans, distractors)
        sol = f"To convert an angle from degrees to radians, multiply by \\( \\frac{{\\pi}}{{180^\\circ}} \\):\n\\[ \\text{{Radians}} = {deg}^\\circ \\times \\frac{{\\pi}}{{180^\\circ}} = \\frac{{{deg}\\pi}}{{180}} = {rad} \\]."
        questions.append(make_est_mcq("Trigonometry & Additional Topics", text, opts, idx, sol, "easy"))

    # Template 3: Complex number multiplication (a + bi)(c + di)
    for _ in range(count // 5):
        a = random.randint(2, 5)
        b = random.randint(1, 4)
        c = random.randint(2, 5)
        d = random.randint(1, 4)
        # (a + bi)(c - di) = (ac + bd) + (bc - ad)i
        real_part = a * c + b * d
        imag_part = b * c - a * d
        sign_imag = f"+ {imag_part}i" if imag_part >= 0 else f"- {abs(imag_part)}i"
        correct_ans = f"\\( {real_part} {sign_imag} \\)"
        distractors = [
            f"\\( {a * c - b * d} {sign_imag} \\)",
            f"\\( {real_part} + {b*c + a*d}i \\)",
            f"\\( {a * c} - {b * d}i \\)"
        ]
        text = f"Given that \\( i = \\sqrt{{-1}} \\), what is the product of the complex numbers \\( ({a} + {b}i)({c} - {d}i) \\)?"
        opts, idx = shuffle_choices(correct_ans, distractors)
        sol = f"Expand using the distributive property (FOIL):\n\\[ ({a} + {b}i)({c} - {d}i) = ({a})({c}) - {a*d}i + {b*c}i - ({b})({d})i^2 \\]\nSince \\( i^2 = -1 \\):\n\\[ = {a*c} + ({b*c - a*d})i - ({b*d})(-1) \\]\n\\[ = {a*c} + {b*d} {sign_imag} = {real_part} {sign_imag} \\]."
        questions.append(make_est_mcq("Trigonometry & Additional Topics", text, opts, idx, sol, "medium"))

    # Template 4: Vector Dot Product
    for _ in range(count // 5):
        u1 = random.randint(-5, 6)
        u2 = random.randint(-5, 6)
        v1 = random.randint(-5, 6)
        v2 = random.randint(-5, 6)
        dot = u1 * v1 + u2 * v2
        text = f"What is the dot product of the vectors \\( \\vec{{u}} = \\langle {u1}, {u2} \\rangle \\) and \\( \\vec{{v}} = \\langle {v1}, {v2} \\rangle \\)?"
        distractors = [
            f"\\({dot + 5}\\)",
            f"\\({u1 * v2 - u2 * v1}\\)",
            f"\\({-(dot)}\\)",
            f"\\({u1 + v1 + u2 + v2}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({dot}\\)", distractors)
        sol = f"The dot product of two vectors \\( \\vec{{u}} = \\langle u_1, u_2 \\rangle \\) and \\( \\vec{{v}} = \\langle v_1, v_2 \\rangle \\) is defined as:\n\\[ \\vec{{u}} \\cdot \\vec{{v}} = u_1 v_1 + u_2 v_2 \\]\nSubstitute the components:\n\\[ \\vec{{u}} \\cdot \\vec{{v}} = ({u1})({v1}) + ({u2})({v2}) = {u1*v1} + ({u2*v2}) = {dot} \\]."
        questions.append(make_est_mcq("Trigonometry & Additional Topics", text, opts, idx, sol, "easy"))

    # Template 5: High power of i (i^n)
    for _ in range(count - len(questions)):
        n = random.randint(50, 250)
        rem = n % 4
        # i^0 = 1, i^1 = i, i^2 = -1, i^3 = -i
        ans_map = {0: "1", 1: "i", 2: "-1", 3: "-i"}
        correct_val = f"\\( {ans_map[rem]} \\)"
        distractors = [
            f"\\( {ans_map[(rem + 1) % 4]} \\)",
            f"\\( {ans_map[(rem + 2) % 4]} \\)",
            f"\\( {ans_map[(rem + 3) % 4]} \\)"
        ]
        text = f"If \\( i = \\sqrt{{-1}} \\), what is the value of \\( i^{{{n}}} \\)?"
        opts, idx = shuffle_choices(correct_val, distractors)
        sol = f"The powers of the imaginary unit \\( i \\) repeat in a cycle of length 4:\n\\( i^1 = i \\), \\( i^2 = -1 \\), \\( i^3 = -i \\), \\( i^4 = 1 \\).\nDivide the exponent {n} by 4:\n\\[ {n} = 4 \\times {n // 4} + {rem} \\]\nThus, \\( i^{{{n}}} = (i^4)^{{{n // 4}}} \\times i^{{{rem}}} = (1)^{{{n // 4}}} \\times i^{{{rem}}} = {ans_map[rem]} \\)."
        questions.append(make_est_mcq("Trigonometry & Additional Topics", text, opts, idx, sol, "easy"))

    return questions
