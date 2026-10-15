import random
from .common import make_est_mcq, shuffle_choices

def generate_geometry_questions(count=140):
    questions = []

    # Template 1: Circle equation - completing the square for radius/center
    for _ in range(count // 5):
        h = random.randint(1, 6)
        k = random.randint(1, 6)
        r = random.choice([3, 4, 5, 6, 7, 8])
        # (x - h)^2 + (y + k)^2 = r^2
        # x^2 - 2hx + h^2 + y^2 + 2ky + k^2 = r^2
        # x^2 + y^2 - 2hx + 2ky = r^2 - h^2 - k^2
        const = r**2 - h**2 - k**2
        sign_const = f"+ {const}" if const >= 0 else f"- {abs(const)}"
        text = f"The equation of a circle in the \\( xy \\)-plane is given by:\n\\[ x^2 + y^2 - {2*h}x + {2*k}y = {const} \\]\nWhat is the radius of the circle?"
        distractors = [
            f"\\({r**2}\\)",
            f"\\({r + 2}\\)",
            f"\\({abs(const)}\\)",
            f"\\({h + k}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({r}\\)", distractors)
        sol = f"Complete the square for the \\(x\\) and \\(y\\) terms to put the equation in standard form \\((x - h)^2 + (y - k)^2 = r^2\\):\nGroup terms:\n\\[ (x^2 - {2*h}x) + (y^2 + {2*k}y) = {const} \\]\nAdd \\(({2*h}/2)^2 = {h**2}\\) and \\(({2*k}/2)^2 = {k**2}\\) to both sides:\n\\[ (x - {h})^2 + (y + {k})^2 = {const} + {h**2} + {k**2} = {r**2} \\]\nSince \\(r^2 = {r**2}\\), the radius is \\(r = \\sqrt{{{r**2}}} = {r}\\)."
        questions.append(make_est_mcq("Geometry", text, opts, idx, sol, "medium"))

    # Template 2: Arc length / Sector area
    for _ in range(count // 5):
        r = random.choice([6, 9, 12, 15, 18])
        deg = random.choice([30, 45, 60, 90, 120])
        # Sector area = (deg / 360) * pi * r^2
        # Let's simplify (deg / 360) * r^2
        coef = (deg * (r**2)) // 360
        text = f"A circle has a radius of {r} cm. What is the area, in square centimeters, of a sector bounded by a central angle of \\( {deg}^\\circ \\)?"
        correct_ans = f"\\( {coef}\\pi \\)"
        distractors = [
            f"\\( {2 * coef}\\pi \\)",
            f"\\( {coef // 2 if coef > 2 else 3}\\pi \\)",
            f"\\( {(deg * r) // 180}\\pi \\)" # arc length distractor
        ]
        opts, idx = shuffle_choices(correct_ans, distractors)
        sol = f"The formula for the area of a sector with central angle \\(\\theta\\) (in degrees) and radius \\(r\\) is:\n\\[ A = \\frac{{\\theta}}{{360^\\circ}} \\times \\pi r^2 \\]\nSubstitute \\(\\theta = {deg}^\\circ\\) and \\(r = {r}\\):\n\\[ A = \\frac{{{deg}}}{{360}} \\times \\pi ({r})^2 = \\frac{{{deg}}}{{360}} \\times {r**2}\\pi = {coef}\\pi \\text{{ cm}}^2 \\]."
        questions.append(make_est_mcq("Geometry", text, opts, idx, sol, "easy"))

    # Template 3: Similar Triangles Area Scale Factor
    for _ in range(count // 5):
        k = random.choice([2, 3, 4, 5])
        a1 = random.randint(12, 36)
        a2 = a1 * (k ** 2)
        text = f"Triangle \\( ABC \\) is similar to triangle \\( DEF \\), where each side of \\( DEF \\) is {k} times the length of the corresponding side of \\( ABC \\). If the area of triangle \\( ABC \\) is {a1} square units, what is the area of triangle \\( DEF \\)?"
        distractors = [
            f"\\({a1 * k}\\)", # linear scale distractor
            f"\\({a2 + 20}\\)",
            f"\\({a1 * (k**3)}\\)", # volume scale distractor
            f"\\({a1 + k**2}\\)"
        ]
        opts, idx = shuffle_choices(f"\\({a2}\\)", distractors)
        sol = f"For any two similar geometric figures, if the linear scale factor of side lengths is \\(k\\), then the ratio of their areas is the square of the linear scale factor, \\(k^2\\):\n\\[ \\frac{{\\text{{Area}}(DEF)}}{{\\text{{Area}}(ABC)}} = k^2 = {k}^2 = {k**2} \\]\nTherefore:\n\\[ \\text{{Area}}(DEF) = {k**2} \\times \\text{{Area}}(ABC) = {k**2} \\times {a1} = {a2} \\text{{ square units}} \\]."
        questions.append(make_est_mcq("Geometry", text, opts, idx, sol, "easy"))

    # Template 4: 3D Geometry - Cylinder / Cone volume comparison
    for _ in range(count // 5):
        r = random.choice([3, 4, 5, 6])
        h = random.choice([6, 9, 12, 15])
        # Cone volume = (1/3) pi r^2 h
        v_cone = ((r**2) * h) // 3
        text = f"A right circular cone has a base radius of {r} cm and a height of {h} cm. What is the volume of the cone, in cubic centimeters?"
        correct_ans = f"\\( {v_cone}\\pi \\)"
        distractors = [
            f"\\( {3 * v_cone}\\pi \\)", # cylinder volume
            f"\\( {2 * v_cone}\\pi \\)",
            f"\\( {(r * h)}\\pi \\)"
        ]
        opts, idx = shuffle_choices(correct_ans, distractors)
        sol = f"The volume of a right circular cone is given by:\n\\[ V = \\frac{{1}}{{3}} \\pi r^2 h \\]\nSubstitute radius \\(r = {r}\\) and height \\(h = {h}\\):\n\\[ V = \\frac{{1}}{{3}} \\pi ({r})^2 ({h}) = \\frac{{1}}{{3}} \\pi ({r**2}) ({h}) = {v_cone}\\pi \\text{{ cm}}^3 \\]."
        questions.append(make_est_mcq("Geometry", text, opts, idx, sol, "easy"))

    # Template 5: Coordinate Geometry - Distance & Perpendicular Bisector
    for _ in range(count - len(questions)):
        # Midpoint of (x1, y1) and (x2, y2)
        x1 = random.randint(-6, 4)
        y1 = random.randint(-6, 4)
        dx = 2 * random.randint(2, 6)
        dy = 2 * random.randint(2, 6)
        x2 = x1 + dx
        y2 = y1 + dy
        mx = (x1 + x2) // 2
        my = (y1 + y2) // 2
        text = f"In the \\( xy \\)-plane, what are the coordinates of the midpoint of the line segment connecting \\( ({x1}, {y1}) \\) and \\( ({x2}, {y2}) \\)?"
        correct_pt = f"\\( ({mx}, {my}) \\)"
        distractors = [
            f"\\( ({mx + 1}, {my}) \\)",
            f"\\( ({mx}, {my - 2}) \\)",
            f"\\( ({dx}, {dy}) \\)"
        ]
        opts, idx = shuffle_choices(correct_pt, distractors)
        sol = f"The midpoint formula for two points \\((x_1, y_1)\\) and \\((x_2, y_2)\\) is:\n\\[ M = \\left( \\frac{{x_1 + x_2}}{{2}}, \\frac{{y_1 + y_2}}{{2}} \\right) \\]\nSubstitute the coordinates:\n\\[ M = \\left( \\frac{{{x1} + {x2}}}{{2}}, \\frac{{{y1} + {y2}}}{{2}} \\right) = \\left( \\frac{{{x1 + x2}}}{{2}}, \\frac{{{y1 + y2}}}{{2}} \\right) = ({mx}, {my}) \\]."
        questions.append(make_est_mcq("Geometry", text, opts, idx, sol, "easy"))

    return questions
