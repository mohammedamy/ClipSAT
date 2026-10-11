"""
scripts/sat_generators/gen_quad.py
Generator for Quadratics & Nonlinear Functions questions.
"""

from .common import make_q

def get_new_questions():
    qs = []
    dom = "Quadratics & Nonlinear Functions"

    # ==================== EASY (2 questions) ====================
    easy_data = [
        ("What are all solutions to \\( (x - 5)(2x + 3) = 0 \\)?",
         ["\\( x = 5 \\) and \\( x = -\\dfrac{3}{2} \\)", "\\( x = -5 \\) and \\( x = \\dfrac{3}{2} \\)", "\\( x = 5 \\) and \\( x = \\dfrac{3}{2} \\)", "\\( x = -5 \\) and \\( x = -\\dfrac{3}{2} \\)"], 0,
         "Set each factor to zero: \\( x - 5 = 0 \\implies x = 5 \\); and \\( 2x + 3 = 0 \\implies x = -\\dfrac{3}{2} \\)."),
        ("What is the \\( y \\)-intercept of the parabola given by \\( y = 3x^2 - 7x + 12 \\)?",
         ["\\( (0, 3) \\)", "\\( (0, -7) \\)", "\\( (0, 12) \\)", "\\( (12, 0) \\)"], 2,
         "Evaluate at \\( x = 0 \\): \\( y = 3(0)^2 - 7(0) + 12 = 12 \\). The y-intercept is \\( (0, 12) \\).")
    ]
    for text, ch, ans, sol in easy_data:
        qs.append(make_q(dom, "easy", text, ch, ans, sol))

    # ==================== MEDIUM (1 question) ====================
    med_data = [
        ("The height \\( h \\) in feet of a flare launched from a boat after \\( t \\) seconds is given by \\( h(t) = -16t^2 + 64t + 5 \\). What is the maximum height, in feet, reached by the flare?",
         ["64", "69", "72", "75"], 1,
         "The time of maximum height is at the vertex \\( t = -\\dfrac{b}{2a} = -\\dfrac{64}{2(-16)} = 2 \\) seconds. At \\( t = 2 \\), \\( h(2) = -16(4) + 64(2) + 5 = -64 + 128 + 5 = 69 \\) feet.")
    ]
    for text, ch, ans, sol in med_data:
        qs.append(make_q(dom, "medium", text, ch, ans, sol))

    # ==================== HARD (31 questions) ====================
    hard_data = [
        ("For what value of \\( c \\) does the quadratic equation \\( 3x^2 - 12x + c = 0 \\) have exactly one real solution?",
         ["6", "9", "12", "16"], 2,
         "A quadratic equation has exactly one real solution when its discriminant equals zero: \\( D = b^2 - 4ac = 0 \\). Here, \\( (-12)^2 - 4(3)(c) = 0 \\implies 144 - 12c = 0 \\implies c = 12 \\)."),
        ("The line \\( y = 2x + k \\) is tangent to the parabola \\( y = x^2 - 4x + 7 \\). What is the value of \\( k \\)?",
         ["-4", "-2", "0", "2"], 1,
         "Set \\( x^2 - 4x + 7 = 2x + k \\implies x^2 - 6x + (7 - k) = 0 \\). For tangency, the discriminant must be zero: \\( (-6)^2 - 4(1)(7 - k) = 0 \\implies 36 - 28 + 4k = 0 \\implies 8 + 4k = 0 \\implies k = -2 \\)."),
        ("If the roots of the equation \\( 2x^2 + 7x - 15 = 0 \\) are \\( r \\) and \\( s \\), what is the value of \\( r^2 + s^2 \\)?",
         ["\\( \\dfrac{109}{4} \\)", "\\( \\dfrac{49}{4} \\)", "\\( \\dfrac{89}{4} \\)", "\\( \\dfrac{129}{4} \\)"], 0,
         "By Vieta's formulas, \\( r + s = -\\dfrac{7}{2} \\) and \\( rs = -\\dfrac{15}{2} \\). Then \\( r^2 + s^2 = (r + s)^2 - 2rs = \\left(-\\dfrac{7}{2}\\right)^2 - 2\\left(-\\dfrac{15}{2}\\right) = \\dfrac{49}{4} + 15 = \\dfrac{49 + 60}{4} = \\dfrac{109}{4} \\)."),
        ("For what values of \\( k \\) does the equation \\( x^2 + 4kx + (3k + 1) = 0 \\) have no real solutions?",
         ["\\( -\\dfrac{1}{4} < k < 1 \\)", "\\( -1 < k < \\dfrac{1}{4} \\)", "\\( -\\dfrac{1}{2} < k < \\dfrac{1}{2} \\)", "\\( k < -\\dfrac{1}{4} \\text{ or } k > 1 \\)"], 0,
         "No real solutions means discriminant \\( D < 0 \\). \\( D = (4k)^2 - 4(1)(3k + 1) = 16k^2 - 12k - 4 < 0 \\). Divide by 4: \\( 4k^2 - 3k - 1 < 0 \\implies (4k + 1)(k - 1) < 0 \\). The roots are \\( k = -1/4 \\) and \\( k = 1 \\), so the inequality holds for \\( -\\dfrac{1}{4} < k < 1 \\)."),
        ("A parabola has its vertex at \\( (3, -4) \\) and passes through \\( (5, 8) \\). What is the value of \\( y \\) when \\( x = 1 \\)?",
         ["4", "6", "8", "12"], 2,
         "Vertex form: \\( y = a(x - 3)^2 - 4 \\). Substitute \\( (5, 8) \\): \\( 8 = a(5 - 3)^2 - 4 \\implies 8 = 4a - 4 \\implies 4a = 12 \\implies a = 3 \\). By symmetry across \\( x = 3 \\), the value at \\( x = 1 \\) is the same as at \\( x = 5 \\), which is 8."),
        ("What is the sum of the solutions to \\( 3x^2 - 18x + 5 = 0 \\)?",
         ["5", "6", "9", "18"], 1,
         "By Vieta's formulas, for \\( ax^2 + bx + c = 0 \\), the sum of the solutions is \\( -\\dfrac{b}{a} = -\\dfrac{-18}{3} = 6 \\)."),
        ("What is the product of the solutions to \\( 4x^2 + 11x - 20 = 0 \\)?",
         ["-5", "\\( -\\dfrac{11}{4} \\)", "\\( \\dfrac{11}{4} \\)", "5"], 0,
         "By Vieta's formulas, the product of the solutions is \\( \\dfrac{c}{a} = \\dfrac{-20}{4} = -5 \\)."),
        ("The quadratic function \\( f(x) = x^2 - 8x + c \\) has a minimum value of 5. What is the value of \\( c \\)?",
         ["16", "19", "21", "25"], 2,
         "The minimum occurs at the vertex: \\( x = -\\dfrac{-8}{2(1)} = 4 \\). Substitute \\( x = 4 \\): \\( f(4) = 4^2 - 8(4) + c = 16 - 32 + c = -16 + c \\). Setting this equal to 5 gives \\( -16 + c = 5 \\implies c = 21 \\)."),
        ("The graph of \\( y = ax^2 + bx + c \\) passes through \\( (0, 3) \\), \\( (1, 6) \\), and \\( (-1, 4) \\). What is the value of \\( a \\)?",
         ["1", "2", "3", "4"], 1,
         "From \\( (0, 3) \\), \\( c = 3 \\). From \\( (1, 6) \\), \\( a + b + 3 = 6 \\implies a + b = 3 \\). From \\( (-1, 4) \\), \\( a - b + 3 = 4 \\implies a - b = 1 \\). Add the equations: \\( 2a = 4 \\implies a = 2 \\)."),
        ("If \\( x^2 + y^2 = 25 \\) and \\( xy = 12 \\), what is the value of \\( (x - y)^2 \\)?",
         ["1", "4", "9", "16"], 0,
         "Expand: \\( (x - y)^2 = x^2 - 2xy + y^2 = (x^2 + y^2) - 2(xy) = 25 - 2(12) = 25 - 24 = 1 \\)."),
        ("For what value of \\( k \\) does the parabola \\( y = 2x^2 - 8x + k \\) have its vertex on the \\( x \\)-axis?",
         ["4", "6", "8", "10"], 2,
         "The vertex has \\( x = -\\dfrac{-8}{2(2)} = 2 \\). For the vertex to be on the x-axis, \\( y = 0 \\) at \\( x = 2 \\): \\( 2(2)^2 - 8(2) + k = 0 \\implies 8 - 16 + k = 0 \\implies k = 8 \\)."),
        ("How many points of intersection do the graphs of \\( y = x^2 - 3x + 4 \\) and \\( y = 2x - 3 \\) have?",
         ["0", "1", "2", "3"], 2,
         "Set them equal: \\( x^2 - 3x + 4 = 2x - 3 \\implies x^2 - 5x + 7 = 0 \\). Check discriminant: \\( D = (-5)^2 - 4(1)(7) = 25 - 28 = -3 < 0 \\). Since \\( D < 0 \\), there are 0 real intersection points! (Wait, choice 0 is index 0)."),
        ("If \\( x^4 - 13x^2 + 36 = 0 \\), what is the product of all real solutions?",
         ["-36", "-6", "6", "36"], 3,
         "Let \\( u = x^2 \\): \\( u^2 - 13u + 36 = 0 \\implies (u - 4)(u - 9) = 0 \\implies u = 4 \\text{ or } u = 9 \\). The real solutions are \\( x = \\pm 2 \\) and \\( x = \\pm 3 \\). The product is \\( (2)(-2)(3)(-3) = -4 \\times -9 = 36 \\)."),
        ("Which of the following equations has roots that are each 3 greater than the roots of \\( x^2 - 5x + 6 = 0 \\)?",
         ["\\( x^2 - 11x + 30 = 0 \\)", "\\( x^2 + x - 6 = 0 \\)", "\\( x^2 - 8x + 15 = 0 \\)", "\\( x^2 - 2x = 0 \\)"], 0,
         "Roots of \\( x^2 - 5x + 6 = 0 \\) are \\( x = 2 \\) and \\( x = 3 \\). The new roots are \\( 2 + 3 = 5 \\) and \\( 3 + 3 = 6 \\). The new equation is \\( (x - 5)(x - 6) = x^2 - 11x + 30 = 0 \\)."),
        ("The graph of \\( y = (x - 2)^2 - 9 \\) intersects the \\( x \\)-axis at points \\( A \\) and \\( B \\). What is the distance \\( AB \\)?",
         ["4", "6", "8", "9"], 1,
         "Set \\( y = 0 \\): \\( (x - 2)^2 = 9 \\implies x - 2 = \\pm 3 \\implies x = 5 \\text{ or } x = -1 \\). Distance \\( AB = 5 - (-1) = 6 \\)."),
        ("If \\( a + b = 9 \\) and \\( a^2 + b^2 = 53 \\), what is the value of \\( ab \\)?",
         ["14", "16", "18", "20"], 0,
         "We know \\( (a + b)^2 = a^2 + 2ab + b^2 \\implies 9^2 = 53 + 2ab \\implies 81 = 53 + 2ab \\implies 2ab = 28 \\implies ab = 14 \\)."),
        ("For what value of \\( m \\) is the minimum value of \\( f(x) = 2x^2 - 12x + m \\) equal to \\( -1 \\)?",
         ["15", "17", "19", "21"], 1,
         "Vertex occurs at \\( x = -\\dfrac{-12}{2(2)} = 3 \\). Evaluate \\( f(3) = 2(9) - 12(3) + m = 18 - 36 + m = m - 18 \\). Set \\( m - 18 = -1 \\implies m = 17 \\)."),
        ("If \\( 2x^2 + kx + 8 = 0 \\) has two distinct real solutions, which inequality must be true?",
         ["\\( |k| < 8 \\)", "\\( |k| > 8 \\)", "\\( k > 8 \\)", "\\( k < -8 \\)"], 1,
         "Two distinct real solutions require \\( D > 0 \\): \\( k^2 - 4(2)(8) > 0 \\implies k^2 - 64 > 0 \\implies k^2 > 64 \\implies |k| > 8 \\)."),
        ("The parabola \\( y = -x^2 + bx - 16 \\) has its vertex on the \\( x \\)-axis. What is a possible value of \\( b \\)?",
         ["4", "6", "8", "12"], 2,
         "For the vertex to lie on the x-axis, \\( D = 0 \\): \\( b^2 - 4(-1)(-16) = 0 \\implies b^2 - 64 = 0 \\implies b = \\pm 8 \\). Among the choices, 8 is listed."),
        ("What is the positive difference between the two solutions to \\( 2x^2 - 5x - 3 = 0 \\)?",
         ["\\( 2.5 \\)", "\\( 3.5 \\)", "\\( 4.5 \\)", "\\( 5.5 \\)"], 1,
         "Factor: \\( (2x + 1)(x - 3) = 0 \\implies x = 3 \\text{ and } x = -0.5 \\). The positive difference is \\( 3 - (-0.5) = 3.5 \\)."),
        ("If \\( x^2 - 6x + y^2 - 8y = 0 \\), what is the maximum possible value of \\( x \\)?",
         ["6", "8", "10", "11"], 3,
         "Complete squares: \\( (x - 3)^2 + (y - 4)^2 = 3^2 + 4^2 = 25 \\). This is a circle with center \\( (3, 4) \\) and radius \\( r = 5 \\). The maximum value of \\( x \\) is \\( 3 + 5 = 8 \\). Wait: choices are 6, 8, 10, 11 with ans 8 (index 1)."),
        ("A ball is thrown upward from ground level. Its height \\( h \\) in meters after \\( t \\) seconds is \\( h(t) = -5t^2 + 30t \\). For how many seconds is the ball at or above a height of 40 meters?",
         ["1", "2", "3", "4"], 1,
         "Set \\( -5t^2 + 30t \\geq 40 \\implies -5t^2 + 30t - 40 \\geq 0 \\). Divide by \\( -5 \\): \\( t^2 - 6t + 8 \\leq 0 \\implies (t - 2)(t - 4) \\leq 0 \\). The ball is at or above 40 meters for \\( 2 \\leq t \\leq 4 \\), which is a duration of \\( 4 - 2 = 2 \\) seconds."),
        ("If \\( f(x) = (x - h)^2 + k \\) and \\( f(1) = f(7) = 10 \\), what is the value of \\( h \\)?",
         ["3", "4", "5", "6"], 1,
         "The axis of symmetry of a parabola passes halfway between any two points with equal y-values: \\( h = \\dfrac{1 + 7}{2} = 4 \\)."),
        ("Which quadratic equation has roots \\( 3 + 2\\sqrt{2} \\) and \\( 3 - 2\\sqrt{2} \\)?",
         ["\\( x^2 - 6x + 1 = 0 \\)", "\\( x^2 - 6x + 9 = 0 \\)", "\\( x^2 + 6x + 1 = 0 \\)", "\\( x^2 - 6x - 1 = 0 \\)"], 0,
         "Sum of roots: \\( (3 + 2\\sqrt{2}) + (3 - 2\\sqrt{2}) = 6 \\). Product of roots: \\( (3 + 2\\sqrt{2})(3 - 2\\sqrt{2}) = 3^2 - (2\\sqrt{2})^2 = 9 - 8 = 1 \\). The equation is \\( x^2 - 6x + 1 = 0 \\)."),
        ("The line \\( y = 3x - 5 \\) intersects the parabola \\( y = x^2 - 2x + 1 \\) at points \\( P \\) and \\( Q \\). What is the \\( x \\)-coordinate of the midpoint of segment \\( PQ \\)?",
         ["\\( 2 \\)", "\\( 2.5 \\)", "\\( 3 \\)", "\\( 3.5 \\)"], 1,
         "Set equal: \\( x^2 - 2x + 1 = 3x - 5 \\implies x^2 - 5x + 6 = 0 \\). By Vieta's formulas, the sum of the x-coordinates is 5. The x-coordinate of the midpoint is the average: \\( \\dfrac{5}{2} = 2.5 \\)."),
        ("If \\( x^2 + 4x + y^2 - 6y + 13 = 0 \\), what is the value of \\( x + y \\)?",
         ["-1", "0", "1", "2"], 2,
         "Complete the squares: \\( (x + 2)^2 - 4 + (y - 3)^2 - 9 + 13 = 0 \\implies (x + 2)^2 + (y - 3)^2 = 0 \\). Since squares of real numbers are non-negative, the only real solution is \\( x = -2 \\) and \\( y = 3 \\). Thus \\( x + y = -2 + 3 = 1 \\)."),
        ("For what value of \\( a \\) does the parabola \\( y = ax^2 + 4x - 1 \\) have its maximum value equal to 3?",
         ["-2", "-1", "1", "2"], 1,
         "For a maximum, \\( a < 0 \\). The vertex occurs at \\( x = -\\dfrac{4}{2a} = -\\dfrac{2}{a} \\). Substitute: \\( y = a\\left(-\\dfrac{2}{a}\\right)^2 + 4\\left(-\\dfrac{2}{a}\\right) - 1 = \\dfrac{4}{a} - \\dfrac{8}{a} - 1 = -\\dfrac{4}{a} - 1 \\). Set \\( -\\dfrac{4}{a} - 1 = 3 \\implies -\\dfrac{4}{a} = 4 \\implies a = -1 \\)."),
        ("If \\( x \\) and \\( y \\) are real numbers such that \\( 2x^2 + y^2 = 18 \\), what is the maximum possible value of \\( x \\)?",
         ["3", "\\( 3\\sqrt{2} \\)", "6", "9"], 0,
         "Since \\( y^2 \\geq 0 \\), \\( 2x^2 = 18 - y^2 \\leq 18 \\implies x^2 \\leq 9 \\implies -3 \\leq x \\leq 3 \\). The maximum value is 3."),
        ("What is the sum of the solutions to \\( (x^2 - 3x)^2 - 2(x^2 - 3x) - 8 = 0 \\)?",
         ["3", "6", "9", "12"], 1,
         "Let \\( u = x^2 - 3x \\): \\( u^2 - 2u - 8 = 0 \\implies (u - 4)(u + 2) = 0 \\implies u = 4 \\text{ or } u = -2 \\). Case 1: \\( x^2 - 3x = 4 \\implies x^2 - 3x - 4 = 0 \\) has discriminant \\( 9 + 16 = 25 > 0 \\) (2 real roots with sum 3). Case 2: \\( x^2 - 3x = -2 \\implies x^2 - 3x + 2 = 0 \\) has discriminant \\( 9 - 8 = 1 > 0 \\) (2 real roots with sum 3). The sum of all 4 real solutions is \\( 3 + 3 = 6 \\)."),
        ("If \\( r \\) and \\( s \\) are the roots of \\( x^2 - px + q = 0 \\), what is the value of \\( \\dfrac{1}{r} + \\dfrac{1}{s} \\)?",
         ["\\( \\dfrac{p}{q} \\)", "\\( \\dfrac{q}{p} \\)", "\\( -\\dfrac{p}{q} \\)", "\\( pq \\)"], 0,
         "\\( \\dfrac{1}{r} + \\dfrac{1}{s} = \\dfrac{r + s}{rs} \\). By Vieta's formulas, \\( r + s = p \\) and \\( rs = q \\). Therefore the sum is \\( \\dfrac{p}{q} \\)."),
        ("A rectangle has perimeter 40 and area \\( A \\). What is the maximum possible value of \\( A \\)?",
         ["80", "96", "100", "120"], 2,
         "Let \\( l + w = 20 \\implies w = 20 - l \\). Area \\( A(l) = l(20 - l) = -l^2 + 20l \\). The vertex occurs at \\( l = 10 \\). When \\( l = 10, w = 10 \\), the maximum area is \\( 10 \\times 10 = 100 \\).")
    ]
    # Update indices in hard_data where choice index was adjusted
    hard_data[11] = ("How many points of intersection do the graphs of \\( y = x^2 - 3x + 4 \\) and \\( y = 2x - 3 \\) have?",
                     ["0", "1", "2", "3"], 0,
                     "Set them equal: \\( x^2 - 5x + 7 = 0 \\). Discriminant \\( D = (-5)^2 - 4(1)(7) = -3 < 0 \\). There are 0 real intersection points.")
    hard_data[20] = ("If \\( x^2 - 6x + y^2 - 8y = 0 \\), what is the maximum possible value of \\( x \\)?",
                     ["6", "8", "10", "11"], 1,
                     "Complete squares: \\( (x - 3)^2 + (y - 4)^2 = 25 \\). The circle has center \\( (3, 4) \\) and radius 5. The maximum x-value is \\( 3 + 5 = 8 \\).")

    for text, ch, ans, sol in hard_data:
        qs.append(make_q(dom, "hard", text, ch, ans, sol))

    return qs
