import random
from .common import make_est_mcq, shuffle_choices

def generate_functions_questions(count=80):
    questions = []
    
    # Template 1: Composite functions f(g(x))
    for _ in range(count // 5):
        a = random.randint(2, 5)
        b = random.randint(1, 6)
        c = random.randint(2, 4)
        d = random.randint(1, 5)
        x_val = random.randint(2, 4)
        # f(x) = a x - b, g(x) = c x^2 + d
        # g(x_val) = c * x_val^2 + d
        # f(g(x_val)) = a * g(x_val) - b
        gx = c * (x_val ** 2) + d
        ans = a * gx - b
        text = f"The functions \\( f \\) and \\( g \\) are defined by \\( f(x) = {a}x - {b} \\) and \\( g(x) = {c}x^2 + {d} \\). What is the value of \\( f(g({x_val})) \\)?"
        distractors = [
            f"\\({ans + a * 2}\\)",
            f"\\({ans - 10}\\)",
            f"\\({c * (a * x_val - b)**2 + d}\\)", # g(f(x_val))
            f"\\({gx}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({ans}\\)", distractors)
        sol = f"First evaluate the inner function \\(g({x_val})\\):\n\\[ g({x_val}) = {c}({x_val})^2 + {d} = {c}({x_val**2}) + {d} = {gx} \\]\nNow evaluate \\(f\\) at \\({gx}\\):\n\\[ f({gx}) = {a}({gx}) - {b} = {a * gx} - {b} = {ans} \\]."
        questions.append(make_est_mcq("Functions & Graphs", text, opts, idx, sol, "medium"))

    # Template 2: Inverse function f^{-1}(x)
    for _ in range(count // 5):
        m = random.randint(2, 6)
        k = random.randint(1, 9)
        # f(x) = (m x - k) / 3 => y = (m x - k)/3 => 3y + k = mx => x = (3y + k)/m
        denom = random.choice([2, 4, 5])
        # f(x) = (m x + k) / denom
        text = f"If \\( f(x) = \\frac{{{m}x - {k}}}{{{denom}}} \\), which of the following represents \\( f^{{-1}}(x) \\)?"
        correct_str = f"\\( \\frac{{{denom}x + {k}}}{{{m}}} \\)"
        distractors = [
            f"\\( \\frac{{{m}x + {k}}}{{{denom}}} \\)",
            f"\\( \\frac{{{denom}x - {k}}}{{{m}}} \\)",
            f"\\( \\frac{{{m}}}{{{denom}x - {k}}} \\)"
        ]
        opts, idx = shuffle_choices(correct_str, distractors)
        sol = f"To find the inverse function \\(f^{{-1}}(x)\\), set \\(y = f(x)\\) and solve for \\(x\\) in terms of \\(y\\):\n\\[ y = \\frac{{{m}x - {k}}}{{{denom}}} \\]\nMultiply both sides by \\({denom}\\):\n\\[ {denom}y = {m}x - {k} \\]\nAdd \\({k}\\) to both sides:\n\\[ {denom}y + {k} = {m}x \\]\nDivide by \\({m}\\):\n\\[ x = \\frac{{{denom}y + {k}}}{{{m}}} \\]\nSwapping variables gives \\(f^{{-1}}(x) = \\frac{{{denom}x + {k}}}{{{m}}}\\)."
        questions.append(make_est_mcq("Functions & Graphs", text, opts, idx, sol, "medium"))

    # Template 3: Function transformation shifts
    for _ in range(count // 5):
        h = random.randint(2, 6)
        k = random.randint(2, 7)
        dir_h = random.choice(["right", "left"])
        dir_v = random.choice(["up", "down"])
        
        # If right by h, x -> x - h. If left by h, x -> x + h
        # If up by k, + k. If down by k, - k
        h_term = f"x - {h}" if dir_h == "right" else f"x + {h}"
        v_term = f"+ {k}" if dir_v == "up" else f"- {k}"
        
        correct_expr = f"\\( g(x) = f({h_term}) {v_term} \\)"
        
        # Wrong expressions
        w_h = f"x + {h}" if dir_h == "right" else f"x - {h}"
        w_v = f"- {k}" if dir_v == "up" else f"+ {k}"
        distractors = [
            f"\\( g(x) = f({w_h}) {v_term} \\)",
            f"\\( g(x) = f({h_term}) {w_v} \\)",
            f"\\( g(x) = f({w_h}) {w_v} \\)"
        ]
        text = f"The graph of function \\( g \\) is obtained by shifting the graph of \\( f \\) {h} units to the {dir_h} and {k} units {dir_v}. Which of the following defines \\( g(x) \\)?"
        opts, idx = shuffle_choices(correct_expr, distractors)
        sol = f"Horizontal translations: Shifting a graph \\(c\\) units to the right replaces \\(x\\) with \\((x - c)\\), while shifting \\(c\\) units to the left replaces \\(x\\) with \\((x + c)\\).\nVertical translations: Shifting \\(d\\) units up adds \\(d\\) to the function, while shifting down subtracts \\(d\\).\nTherefore, shifting {h} units to the {dir_h} and {k} units {dir_v} yields:\n\\[ g(x) = f({h_term}) {v_term} \\]."
        questions.append(make_est_mcq("Functions & Graphs", text, opts, idx, sol, "easy"))

    # Template 4: Domain of a radical / rational function
    for _ in range(count // 5):
        a = random.choice([2, 3, 4, 5])
        b = random.randint(6, 20)
        # f(x) = \sqrt{a x - b} => ax - b >= 0 => x >= b/a
        # let b be multiple of a for clean answer
        b = a * random.randint(2, 7)
        bound = b // a
        correct_dom = f"\\( x \\ge {bound} \\)"
        distractors = [
            f"\\( x > {bound} \\)",
            f"\\( x \\le {bound} \\)",
            f"\\( x \\ge {-bound} \\)"
        ]
        text = f"What is the domain of the real-valued function \\( f(x) = \\sqrt{{{a}x - {b}}} \\)?"
        opts, idx = shuffle_choices(correct_dom, distractors)
        sol = f"For the function \\(f(x) = \\sqrt{{{a}x - {b}}}\\) to produce real values, the radicand must be non-negative:\n\\[ {a}x - {b} \\ge 0 \\]\nAdd \\({b}\\) to both sides:\n\\[ {a}x \\ge {b} \\]\nDivide by \\({a}\\):\n\\[ x \\ge \\frac{{{b}}}{{{a}}} = {bound} \\]\nThus, the domain is all real numbers such that \\(x \\ge {bound}\\)."
        questions.append(make_est_mcq("Functions & Graphs", text, opts, idx, sol, "easy"))

    # Template 5: Quadratic minimum/maximum value
    for _ in range(count - len(questions)):
        a = random.choice([1, 2, -1, -2])
        h = random.randint(1, 5)
        k = random.randint(3, 15)
        # f(x) = a(x - h)^2 + k = a(x^2 - 2hx + h^2) + k = a x^2 - 2ah x + (a h^2 + k)
        b_coeff = -2 * a * h
        c_const = a * (h ** 2) + k
        sign_c = f"+ {c_const}" if c_const >= 0 else f"- {abs(c_const)}"
        sign_b = f"+ {b_coeff}x" if b_coeff >= 0 else f"- {abs(b_coeff)}x"
        
        is_min = (a > 0)
        extrema_type = "minimum" if is_min else "maximum"
        text = f"What is the {extrema_type} value of the function \\( f(x) = {a if abs(a)!=1 else ('-' if a==-1 else '')}x^2 {sign_b} {sign_c} \\)?"
        distractors = [
            f"\\({h}\\)",
            f"\\({-h}\\)",
            f"\\({k + 4}\\)",
            f"\\({-k}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({k}\\)", distractors)
        sol = f"The vertex of a parabola \\(f(x) = ax^2 + bx + c\\) occurs at \\(x = -\\frac{{b}}{{2a}}\\):\n\\[ x = -\\frac{{{b_coeff}}}{{2({a})}} = {h} \\]\nSubstitute \\(x = {h}\\) into \\(f(x)\\) to obtain the {extrema_type} value:\n\\[ f({h}) = {a}({h})^2 + ({b_coeff})({h}) + ({c_const}) = {k} \\]\nAlternatively, completing the square gives \\(f(x) = {a}(x - {h})^2 + {k}\\), which clearly shows the vertex at \\(({h}, {k})\\)."
        questions.append(make_est_mcq("Functions & Graphs", text, opts, idx, sol, "medium"))

    return questions
