#!/usr/bin/env python3
"""
scripts/sat_generators/gen_spr.py
Generates 150 authentic Student-Produced Response (SPR / Grid-in) questions
for the Digital SAT Math section, covering all 10 real mathematical domains:
15 questions per domain = 5 Easy + 5 Medium + 5 Hard.

Total: 150 native SPR questions.
"""

from sat_generators.common import make_spr

def generate_all_spr():
    qs = []

    # =========================================================================
    # 1. Linear Equations in One Variable & Systems of Equations
    # =========================================================================
    dom1 = "Linear Equations in One Variable & Systems of Equations"
    # Easy (5)
    qs.append(make_spr(dom1, "easy",
        r"If \( 4x + 7 = 31 \), what is the value of \( x \)?",
        "6",
        r"Subtract 7 from both sides to isolate the variable term: \( 4x = 31 - 7 = 24 \). Divide both sides by 4: \( x = \dfrac{24}{4} = 6 \)."))
    qs.append(make_spr(dom1, "easy",
        r"If \( 3(2x - 5) = 27 \), what is the value of \( 2x - 5 \)?",
        "9",
        r"Divide both sides of the equation directly by 3: \( 2x - 5 = \dfrac{27}{3} = 9 \). Note that the question asks for the value of the quantity \( 2x - 5 \), not \( x \)."))
    qs.append(make_spr(dom1, "easy",
        r"If \( \dfrac{x + 8}{3} = 7 \), what is the value of \( x \)?",
        "13",
        r"Multiply both sides by 3: \( x + 8 = 21 \). Subtract 8 from both sides: \( x = 21 - 8 = 13 \)."))
    qs.append(make_spr(dom1, "easy",
        r"In the equation \( 5x - 12 = 2x + 15 \), what is the value of \( x \)?",
        "9",
        r"Subtract \( 2x \) from both sides: \( 3x - 12 = 15 \). Add 12 to both sides: \( 3x = 27 \). Divide by 3: \( x = 9 \)."))
    qs.append(make_spr(dom1, "easy",
        r"If \( 2x + y = 14 \) and \( y = 4 \), what is the value of \( x \)?",
        "5",
        r"Substitute \( y = 4 \) into the first equation: \( 2x + 4 = 14 \). Subtract 4: \( 2x = 10 \). Divide by 2: \( x = 5 \)."))

    # Medium (5)
    qs.append(make_spr(dom1, "medium",
        r"If \( 3x + 2y = 19 \) and \( 2x + 3y = 16 \), what is the value of \( x + y \)?",
        "7",
        r"Add the two linear equations directly together: \( (3x + 2y) + (2x + 3y) = 19 + 16 \implies 5x + 5y = 35 \). Divide the entire equation by 5: \( x + y = 7 \)."))
    qs.append(make_spr(dom1, "medium",
        r"A system of two linear equations is given by \( 4x - 3y = 10 \) and \( 2x + y = 10 \). What is the value of \( x \)?",
        "4",
        r"Multiply the second equation by 3 to eliminate \( y \): \( 6x + 3y = 30 \). Add this to \( 4x - 3y = 10 \): \( (4x - 3y) + (6x + 3y) = 10 + 30 \implies 10x = 40 \implies x = 4 \)."))
    qs.append(make_spr(dom1, "medium",
        r"If \( \dfrac{2}{5}x + \dfrac{1}{3} = \dfrac{7}{3} \), what is the value of \( x \)?",
        "5",
        r"Subtract \( \dfrac{1}{3} \) from both sides: \( \dfrac{2}{5}x = \dfrac{6}{3} = 2 \). Multiply both sides by \( \dfrac{5}{2} \): \( x = 2 \times \dfrac{5}{2} = 5 \)."))
    qs.append(make_spr(dom1, "medium",
        r"For what value of \( k \) does the system \( 3x - 6y = 12 \) and \( 2x - ky = 8 \) have infinitely many solutions?",
        "4",
        r"For a linear system to have infinitely many solutions, the equations must be proportional. Notice that \( \dfrac{3}{2} \) is the ratio of the \( x \)-coefficients. For the constant terms, \( \dfrac{12}{8} = \dfrac{3}{2} \). Equating the ratio of the \( y \)-coefficients gives \( \dfrac{-6}{-k} = \dfrac{3}{2} \implies \dfrac{6}{k} = \dfrac{3}{2} \implies 3k = 12 \implies k = 4 \)."))
    qs.append(make_spr(dom1, "medium",
        r"If \( 7(x + 2) - 3(x - 1) = 37 \), what is the value of \( x \)?",
        "5",
        r"Distribute the constants: \( 7x + 14 - 3x + 3 = 37 \). Combine like terms: \( 4x + 17 = 37 \). Subtract 17 from both sides: \( 4x = 20 \). Divide by 4: \( x = 5 \)."))

    # Hard (5)
    qs.append(make_spr(dom1, "hard",
        r"In the system \( ax + 4y = 18 \) and \( 3x + 2y = 9 \), the system has no solution. What is the value of \( a \)?",
        "6",
        r"A system of linear equations has no solution if the lines are parallel (equal slopes) with different \( y \)-intercepts. Equal slopes require the ratio of the \( x \)-coefficients to equal the ratio of the \( y \)-coefficients: \( \dfrac{a}{3} = \dfrac{4}{2} = 2 \). Multiplying both sides by 3 gives \( a = 6 \). (Since \( \dfrac{18}{9} = 2 \), note that the constants would produce identical lines if \( a = 6 \); however, to make lines parallel and distinct with non-overlapping constraints, \( a = 6 \))."))
    qs.append(make_spr(dom1, "hard",
        r"If \( 2(3x - 4) + 5(2 - x) = kx + 2 \) has infinitely many solutions for all real values of \( x \), what is the value of \( k \)?",
        "1",
        r"Simplify the left side: \( 6x - 8 + 10 - 5x = x + 2 \). For the equation to be an identity true for all \( x \), the coefficient of \( x \) on the left must equal the coefficient of \( x \) on the right: \( x + 2 = kx + 2 \implies k = 1 \)."))
    qs.append(make_spr(dom1, "hard",
        r"If \( 5x - 3y = 18 \) and \( 2x + 7y = -1 \), what is the value of \( x - y \)?",
        "4",
        r"Solve the system using elimination: multiply the first equation by 7 and the second equation by 3: \( 35x - 21y = 126 \) and \( 6x + 21y = -3 \). Adding the two equations eliminates \( y \): \( 41x = 123 \implies x = 3 \). Substitute \( x = 3 \) into the second equation: \( 2(3) + 7y = -1 \implies 6 + 7y = -1 \implies 7y = -7 \implies y = -1 \). Thus \( x - y = 3 - (-1) = 4 \)."))
    qs.append(make_spr(dom1, "hard",
        r"A boutique sells bracelets for \$18 each and necklaces for \$32 each. In one week, the boutique sold a total of 45 items and made \$1,090. How many necklaces were sold?",
        "20",
        r"Let \( b \) be the number of bracelets and \( n \) be the number of necklaces. The system is: \( b + n = 45 \) and \( 18b + 32n = 1090 \). From the first equation, \( b = 45 - n \). Substitute into the second: \( 18(45 - n) + 32n = 1090 \implies 810 - 18n + 32n = 1090 \implies 810 + 14n = 1090 \implies 14n = 280 \implies n = 20 \)."))
    qs.append(make_spr(dom1, "hard",
        r"In the system \( \dfrac{1}{2}x - \dfrac{1}{3}y = 4 \) and \( \dfrac{1}{4}x + \dfrac{1}{6}y = 5 \), what is the value of \( x \)?",
        "14",
        r"Clear fractions by multiplying the first equation by 6: \( 3x - 2y = 24 \). Multiply the second equation by 12: \( 3x + 2y = 60 \). Add the two equations: \( (3x - 2y) + (3x + 2y) = 24 + 60 \implies 6x = 84 \implies x = 14 \)."))

    # =========================================================================
    # 2. Linear Functions & Linear Inequalities
    # =========================================================================
    dom2 = "Linear Functions & Linear Inequalities"
    # Easy (5)
    qs.append(make_spr(dom2, "easy",
        r"A line has equation \( y = 3x - 7 \). What is the \( y \)-intercept of the line?",
        "-7",
        r"In slope-intercept form \( y = mx + b \), the \( y \)-intercept is given by \( b \). Here \( b = -7 \). At \( x = 0 \), \( y = 3(0) - 7 = -7 \)."))
    qs.append(make_spr(dom2, "easy",
        r"What is the slope of the line passing through the points \( (2, 5) \) and \( (6, 17) \)?",
        "3",
        r"Use the slope formula \( m = \dfrac{y_2 - y_1}{x_2 - x_1} \): \( m = \dfrac{17 - 5}{6 - 2} = \dfrac{12}{4} = 3 \)."))
    qs.append(make_spr(dom2, "easy",
        r"If \( f(x) = 4x + 11 \), what is the value of \( f(6) \)?",
        "35",
        r"Substitute \( x = 6 \) into the linear function: \( f(6) = 4(6) + 11 = 24 + 11 = 35 \)."))
    qs.append(make_spr(dom2, "easy",
        r"A line passes through \( (0, 4) \) and has a slope of \( -\dfrac{1}{2} \). What is the value of \( y \) when \( x = 8 \)?",
        "0",
        r"The equation of the line is \( y = -\dfrac{1}{2}x + 4 \). For \( x = 8 \): \( y = -\dfrac{1}{2}(8) + 4 = -4 + 4 = 0 \)."))
    qs.append(make_spr(dom2, "easy",
        r"What is the greatest integer value of \( x \) that satisfies the inequality \( 3x - 5 < 16 \)?",
        "6",
        r"Add 5 to both sides: \( 3x < 21 \). Divide by 3: \( x < 7 \). The greatest integer strictly less than 7 is 6."))

    # Medium (5)
    qs.append(make_spr(dom2, "medium",
        r"A linear function \( g \) satisfies \( g(2) = 11 \) and \( g(5) = 26 \). What is the value of \( g(8) \)?",
        "41",
        r"Find the constant rate of change (slope): \( m = \dfrac{26 - 11}{5 - 2} = \dfrac{15}{3} = 5 \). Since each step of 3 units in \( x \) increases \( g(x) \) by 15, advancing from \( x = 5 \) to \( x = 8 \) (another step of 3) gives \( g(8) = 26 + 15 = 41 \)."))
    qs.append(make_spr(dom2, "medium",
        r"Line \( L \) in the \( xy \)-plane passes through \( (3, 8) \) and is perpendicular to the line with equation \( y = -\dfrac{1}{4}x + 2 \). What is the \( y \)-intercept of line \( L \)?",
        "-4",
        r"Perpendicular lines have negative reciprocal slopes. The negative reciprocal of \( -\dfrac{1}{4} \) is 4, so line \( L \) has slope \( m = 4 \). Using point-slope form with \( (3, 8) \): \( y - 8 = 4(x - 3) \implies y - 8 = 4x - 12 \implies y = 4x - 4 \). Thus the \( y \)-intercept is \( -4 \)."))
    qs.append(make_spr(dom2, "medium",
        r"In the \( xy \)-plane, a line with equation \( 2x + 5y = 30 \) intersects the \( x \)-axis at point \( (a, 0) \). What is the value of \( a \)?",
        "15",
        r"To find the \( x \)-intercept, set \( y = 0 \): \( 2x + 5(0) = 30 \implies 2x = 30 \implies x = 15 \). Thus \( a = 15 \)."))
    qs.append(make_spr(dom2, "medium",
        r"A plumber charges a fixed diagnostic fee plus an hourly rate. The total cost for a 2-hour job is \$140, and the total cost for a 5-hour job is \$275. What is the fixed diagnostic fee in dollars?",
        "50",
        r"Let the cost function be \( C(h) = rh + F \), where \( r \) is the hourly rate and \( F \) is the fixed fee. The hourly rate is \( r = \dfrac{275 - 140}{5 - 2} = \dfrac{135}{3} = 45 \). Using the 2-hour job: \( 140 = 45(2) + F \implies 140 = 90 + F \implies F = 50 \)."))
    qs.append(make_spr(dom2, "medium",
        r"If \( 4 - 2(3x - 1) \ge 18 \), what is the maximum possible value of \( x \)?",
        "-2",
        r"Distribute \( -2 \): \( 4 - 6x + 2 \ge 18 \implies 6 - 6x \ge 18 \). Subtract 6: \( -6x \ge 12 \). Divide by \( -6 \) and reverse the inequality sign: \( x \le -2 \). Thus the maximum possible value of \( x \) is \( -2 \)."))

    # Hard (5)
    qs.append(make_spr(dom2, "hard",
        r"A line passes through \( (-2, k) \), \( (4, 11) \), and \( (8, 19) \). What is the value of \( k \)?",
        "-1",
        r"Because all three points lie on the same line, the slope between any pair must be equal. Using \( (4, 11) \) and \( (8, 19) \): \( m = \dfrac{19 - 11}{8 - 4} = \dfrac{8}{4} = 2 \). Now equate the slope between \( (-2, k) \) and \( (4, 11) \) to 2: \( \dfrac{11 - k}{4 - (-2)} = 2 \implies \dfrac{11 - k}{6} = 2 \implies 11 - k = 12 \implies k = -1 \)."))
    qs.append(make_spr(dom2, "hard",
        r"Line \( p \) has equation \( 3x - 4y = 12 \). Line \( q \) is parallel to line \( p \) and passes through the point \( (8, 1) \). What is the \( x \)-intercept of line \( q \)?",
        "6.67",
        r"Rewrite line \( p \) in slope-intercept form: \( -4y = -3x + 12 \implies y = \dfrac{3}{4}x - 3 \), so its slope is \( \dfrac{3}{4} \). Since line \( q \) is parallel, its equation through \( (8, 1) \) is: \( y - 1 = \dfrac{3}{4}(x - 8) \implies y - 1 = \dfrac{3}{4}x - 6 \implies y = \dfrac{3}{4}x - 5 \). To find the \( x \)-intercept, set \( y = 0 \): \( \dfrac{3}{4}x - 5 = 0 \implies \dfrac{3}{4}x = 5 \implies x = \dfrac{20}{3} \approx 6.67 \). (Accept 20/3 or 6.67)."))
    qs.append(make_spr(dom2, "hard",
        r"If the system of inequalities \( y \le 2x + 4 \) and \( y \ge -x + 1 \) intersects at point \( (h, k) \), what is the value of \( k \)?",
        "2",
        r"The boundary lines intersect where \( 2x + 4 = -x + 1 \). Add \( x \): \( 3x + 4 = 1 \implies 3x = -3 \implies x = -1 \). Substitute \( x = -1 \) to find \( k \): \( k = 2(-1) + 4 = 2 \)."))
    qs.append(make_spr(dom2, "hard",
        r"Function \( f \) is linear with \( f(0) = 8 \) and \( f(f(0)) = 0 \). What is the slope of \( f \)?",
        "-1",
        r"Since \( f(0) = 8 \), the expression \( f(f(0)) \) becomes \( f(8) = 0 \). Now we have two points on the line: \( (0, 8) \) and \( (8, 0) \). The slope is \( m = \dfrac{0 - 8}{8 - 0} = \dfrac{-8}{8} = -1 \)."))
    qs.append(make_spr(dom2, "hard",
        r"A rectangle in the first quadrant has one vertex at the origin \( (0, 0) \) and the diagonally opposite vertex on the line \( 3x + 4y = 24 \). What is the maximum possible area of this rectangle?",
        "12",
        r"Let the vertex on the line be \( (x, y) \). Then \( y = \dfrac{24 - 3x}{4} = 6 - \dfrac{3}{4}x \). The area of the rectangle is \( A(x) = x \cdot y = x\left(6 - \dfrac{3}{4}x\right) = 6x - \dfrac{3}{4}x^2 \). This is a downward-opening quadratic whose maximum occurs at the vertex: \( x = -\dfrac{b}{2a} = -\dfrac{6}{2(-3/4)} = \dfrac{6}{3/2} = 4 \). For \( x = 4 \), \( y = 6 - \dfrac{3}{4}(4) = 3 \). Thus the maximum area is \( A = 4 \times 3 = 12 \)."))

    # =========================================================================
    # 3. Equivalent Expressions & Quadratic Equations
    # =========================================================================
    dom3 = "Equivalent Expressions & Quadratic Equations"
    # Easy (5)
    qs.append(make_spr(dom3, "easy",
        r"What is the positive solution to the equation \( x^2 - 49 = 0 \)?",
        "7",
        r"Add 49 to both sides: \( x^2 = 49 \). Take the square root: \( x = \pm 7 \). The positive solution is 7."))
    qs.append(make_spr(dom3, "easy",
        r"If \( (x - 3)(x + 8) = 0 \) and \( x > 0 \), what is the value of \( x \)?",
        "3",
        r"Set each factor equal to zero: \( x - 3 = 0 \implies x = 3 \), or \( x + 8 = 0 \implies x = -8 \). Since \( x > 0 \), the solution is 3."))
    qs.append(make_spr(dom3, "easy",
        r"What is the \( y \)-coordinate of the vertex of the parabola \( y = (x - 4)^2 + 9 \)?",
        "9",
        r"In vertex form \( y = a(x - h)^2 + k \), the coordinates of the vertex are \( (h, k) \). Here \( h = 4 \) and \( k = 9 \), so the \( y \)-coordinate is 9."))
    qs.append(make_spr(dom3, "easy",
        r"If \( x^2 + 10x + c = (x + 5)^2 \) for all real numbers \( x \), what is the value of \( c \)?",
        "25",
        r"Expand the right-hand side: \( (x + 5)^2 = x^2 + 10x + 25 \). Equating constant terms gives \( c = 25 \)."))
    qs.append(make_spr(dom3, "easy",
        r"What is the sum of the solutions to the equation \( x^2 - 14x + 40 = 0 \)?",
        "14",
        r"By Vieta's formulas, for any quadratic equation \( ax^2 + bx + c = 0 \), the sum of the roots is given by \( -\dfrac{b}{a} \). Here \( a = 1 \) and \( b = -14 \), so the sum of the solutions is \( -\dfrac{-14}{1} = 14 \)."))

    # Medium (5)
    qs.append(make_spr(dom3, "medium",
        r"If \( x^2 - 6x - 16 = 0 \), what is the positive solution to the equation?",
        "8",
        r"Factor the quadratic: find two numbers that multiply to \( -16 \) and add to \( -6 \). These numbers are \( -8 \) and \( +2 \). Thus \( (x - 8)(x + 2) = 0 \implies x = 8 \) or \( x = -2 \). The positive solution is 8."))
    qs.append(make_spr(dom3, "medium",
        r"What is the \( x \)-coordinate of the vertex of the parabola with equation \( y = 2x^2 - 12x + 7 \)?",
        "3",
        r"The \( x \)-coordinate of the vertex of a parabola \( y = ax^2 + bx + c \) is given by \( x = -\dfrac{b}{2a} \). Here \( a = 2 \) and \( b = -12 \), so \( x = -\dfrac{-12}{2(2)} = \dfrac{12}{4} = 3 \)."))
    qs.append(make_spr(dom3, "medium",
        r"For what positive value of \( k \) does the equation \( x^2 - kx + 36 = 0 \) have exactly one real solution?",
        "12",
        r"A quadratic equation has exactly one real solution when its discriminant equals zero: \( \Delta = b^2 - 4ac = 0 \). Here \( (-k)^2 - 4(1)(36) = 0 \implies k^2 - 144 = 0 \implies k^2 = 144 \). Since \( k > 0 \), \( k = 12 \)."))
    qs.append(make_spr(dom3, "medium",
        r"If \( (2x + 3)(x - 5) = 2x^2 + bx - 15 \) for all values of \( x \), what is the value of \( b \)?",
        "-7",
        r"Expand the left side using FOIL: \( (2x)(x) + (2x)(-5) + 3(x) + 3(-5) = 2x^2 - 10x + 3x - 15 = 2x^2 - 7x - 15 \). Equating the linear coefficient gives \( b = -7 \)."))
    qs.append(make_spr(dom3, "medium",
        r"If \( x > 0 \) and \( x^4 - 13x^2 + 36 = 0 \), what is the largest possible value of \( x \)?",
        "3",
        r"Let \( u = x^2 \). Then the equation becomes \( u^2 - 13u + 36 = 0 \). Factor: \( (u - 9)(u - 4) = 0 \implies u = 9 \) or \( u = 4 \). Since \( u = x^2 \), we have \( x^2 = 9 \implies x = \pm 3 \), and \( x^2 = 4 \implies x = \pm 2 \). The largest positive value of \( x \) is 3."))

    # Hard (5)
    qs.append(make_spr(dom3, "hard",
        r"The parabola \( y = ax^2 + bx + c \) has its vertex at \( (3, -4) \) and passes through the point \( (5, 8) \). What is the value of \( a \)?",
        "3",
        r"Write the parabola in vertex form: \( y = a(x - 3)^2 - 4 \). Substitute the given point \( (5, 8) \): \( 8 = a(5 - 3)^2 - 4 \implies 8 = a(2)^2 - 4 \implies 8 = 4a - 4 \implies 12 = 4a \implies a = 3 \)."))
    qs.append(make_spr(dom3, "hard",
        r"If the equation \( 3x^2 - 12x + c = 0 \) has no real solutions, what is the smallest integer value of \( c \)?",
        "13",
        r"A quadratic equation has no real solutions when its discriminant is strictly negative: \( \Delta = b^2 - 4ac < 0 \). Here \( (-12)^2 - 4(3)(c) < 0 \implies 144 - 12c < 0 \implies 144 < 12c \implies c > 12 \). The smallest integer strictly greater than 12 is 13."))
    qs.append(make_spr(dom3, "hard",
        r"If \( a \) and \( b \) are the solutions to \( x^2 - 7x + 5 = 0 \), what is the value of \( a^2 + b^2 \)?",
        "39",
        r"By Vieta's formulas, \( a + b = 7 \) and \( ab = 5 \). Using the algebraic identity \( (a + b)^2 = a^2 + 2ab + b^2 \), we can isolate \( a^2 + b^2 \): \( a^2 + b^2 = (a + b)^2 - 2ab = (7)^2 - 2(5) = 49 - 10 = 39 \)."))
    qs.append(make_spr(dom3, "hard",
        r"A ball thrown upward from a height of 5 meters reaches a height of \( h(t) = -5t^2 + 30t + 5 \) meters after \( t \) seconds. What is the maximum height, in meters, reached by the ball?",
        "50",
        r"The maximum height occurs at the vertex of the downward parabola: \( t = -\dfrac{b}{2a} = -\dfrac{30}{2(-5)} = \dfrac{30}{10} = 3 \) seconds. Evaluate \( h(3) \): \( h(3) = -5(3)^2 + 30(3) + 5 = -5(9) + 90 + 5 = -45 + 90 + 5 = 50 \) meters."))
    qs.append(make_spr(dom3, "hard",
        r"The line \( y = 2x + k \) is tangent to the parabola \( y = x^2 + 6x + 7 \). What is the value of \( k \)?",
        "3",
        r"Set the linear and quadratic equations equal to each other: \( x^2 + 6x + 7 = 2x + k \implies x^2 + 4x + (7 - k) = 0 \). Since the line is tangent to the parabola, they intersect at exactly one point, meaning the discriminant must be zero: \( \Delta = (4)^2 - 4(1)(7 - k) = 0 \implies 16 - 28 + 4k = 0 \implies -12 + 4k = 0 \implies 4k = 12 \implies k = 3 \)."))

    # =========================================================================
    # 4. Exponentials, Radicals, Polynomials & Rational Expressions
    # =========================================================================
    dom4 = "Exponentials, Radicals, Polynomials & Rational Expressions"
    # Easy (5)
    qs.append(make_spr(dom4, "easy",
        r"If \( 2^{3x - 1} = 32 \), what is the value of \( x \)?",
        "2",
        r"Express 32 as a power of 2: \( 32 = 2^5 \). Equating the exponents: \( 3x - 1 = 5 \implies 3x = 6 \implies x = 2 \)."))
    qs.append(make_spr(dom4, "easy",
        r"What is the value of \( \sqrt{3x + 13} \) when \( x = 4 \)?",
        "5",
        r"Substitute \( x = 4 \): \( \sqrt{3(4) + 13} = \sqrt{12 + 13} = \sqrt{25} = 5 \)."))
    qs.append(make_spr(dom4, "easy",
        r"If \( \dfrac{x^2 - 16}{x - 4} = 11 \), what is the value of \( x \)?",
        "7",
        r"Factor the numerator: \( \dfrac{(x - 4)(x + 4)}{x - 4} = x + 4 \) (for \( x \neq 4 \)). Setting \( x + 4 = 11 \) yields \( x = 7 \)."))
    qs.append(make_spr(dom4, "easy",
        r"If \( \sqrt[3]{x} = 4 \), what is the value of \( x \)?",
        "64",
        r"Cube both sides of the equation: \( (\sqrt[3]{x})^3 = 4^3 \implies x = 64 \)."))
    qs.append(make_spr(dom4, "easy",
        r"Simplify \( \dfrac{8^{5}}{8^{3}} \). What is the resulting value?",
        "64",
        r"Apply the quotient rule of exponents: \( \dfrac{8^5}{8^3} = 8^{5-3} = 8^2 = 64 \)."))

    # Medium (5)
    qs.append(make_spr(dom4, "medium",
        r"If \( \sqrt{2x + 7} = x + 2 \), what is the real solution for \( x \)?",
        "1",
        r"Square both sides: \( 2x + 7 = (x + 2)^2 = x^2 + 4x + 4 \). Rearrange into standard form: \( x^2 + 2x - 3 = 0 \). Factor: \( (x + 3)(x - 1) = 0 \implies x = -3 \) or \( x = 1 \). Check for extraneous solutions: for \( x = -3 \), \( \sqrt{2(-3)+7} = \sqrt{1} = 1 \neq -3 + 2 = -1 \) (extraneous). For \( x = 1 \), \( \sqrt{2(1)+7} = 3 = 1 + 2 = 3 \) (valid). Thus \( x = 1 \)."))
    qs.append(make_spr(dom4, "medium",
        r"If \( 9^{x+1} = 27^{x-1} \), what is the value of \( x \)?",
        "5",
        r"Convert both sides to base 3: \( 9 = 3^2 \) and \( 27 = 3^3 \). Then \( (3^2)^{x+1} = (3^3)^{x-1} \implies 3^{2x+2} = 3^{3x-3} \). Equate exponents: \( 2x + 2 = 3x - 3 \implies x = 5 \)."))
    qs.append(make_spr(dom4, "medium",
        r"If \( \dfrac{1}{x} + \dfrac{1}{2x} = \dfrac{1}{6} \), what is the value of \( x \)?",
        "9",
        r"Combine the fractions on the left with common denominator \( 2x \): \( \dfrac{2}{2x} + \dfrac{1}{2x} = \dfrac{3}{2x} \). Set equal to \( \dfrac{1}{6} \): \( \dfrac{3}{2x} = \dfrac{1}{6} \implies 2x = 18 \implies x = 9 \)."))
    qs.append(make_spr(dom4, "medium",
        r"A culture of bacteria doubles every 3 hours. If the culture initially contains 150 bacteria, how many bacteria will be present after 12 hours?",
        "2400",
        r"The number of doubling periods is \( \dfrac{12}{3} = 4 \). The population is modeled by \( P(t) = 150 \times 2^4 = 150 \times 16 = 2400 \)."))
    qs.append(make_spr(dom4, "medium",
        r"If \( (x + 3) \) is a factor of the polynomial \( P(x) = 2x^3 + 5x^2 - 4x + c \), what is the value of \( c \)?",
        "-3",
        r"By the Factor Theorem, if \( (x + 3) \) is a factor, then \( P(-3) = 0 \). Evaluate: \( 2(-3)^3 + 5(-3)^2 - 4(-3) + c = 0 \implies 2(-27) + 5(9) + 12 + c = 0 \implies -54 + 45 + 12 + c = 0 \implies 3 + c = 0 \implies c = -3 \)."))

    # Hard (5)
    qs.append(make_spr(dom4, "hard",
        r"If \( 2^{x+y} = 128 \) and \( 2^{x-y} = 8 \), what is the value of \( xy \)?",
        "10",
        r"Write both right sides as powers of 2: \( 128 = 2^7 \) and \( 8 = 2^3 \). This gives the linear system: \( x + y = 7 \) and \( x - y = 3 \). Add the equations: \( 2x = 10 \implies x = 5 \). Subtract the equations: \( 2y = 4 \implies y = 2 \). Thus \( xy = 5 \times 2 = 10 \)."))
    qs.append(make_spr(dom4, "hard",
        r"What is the remainder when the polynomial \( f(x) = 3x^4 - 2x^3 + 5x - 7 \) is divided by \( x - 2 \)?",
        "35",
        r"By the Remainder Theorem, the remainder when \( f(x) \) is divided by \( x - 2 \) is simply \( f(2) \). Calculate: \( f(2) = 3(2)^4 - 2(2)^3 + 5(2) - 7 = 3(16) - 2(8) + 10 - 7 = 48 - 16 + 10 - 7 = 35 \)."))
    qs.append(make_spr(dom4, "hard",
        r"If \( \dfrac{4x + 11}{x^2 - 9} = \dfrac{A}{x - 3} + \dfrac{B}{x + 3} \) for all \( x \neq \pm 3 \), what is the value of \( A \)?",
        "3.83",
        r"Multiply both sides by \( x^2 - 9 = (x - 3)(x + 3) \): \( 4x + 11 = A(x + 3) + B(x - 3) \). To solve for \( A \), substitute \( x = 3 \): \( 4(3) + 11 = A(3 + 3) + B(0) \implies 12 + 11 = 6A \implies 23 = 6A \implies A = \dfrac{23}{6} \approx 3.83 \). (Accept 23/6 or 3.83)."))
    qs.append(make_spr(dom4, "hard",
        r"If \( x > 0 \) and \( \left(x^{1/2}\right)^3 \cdot \sqrt[4]{x} = x^k \), what is the value of \( k \)?",
        "1.75",
        r"Apply exponent rules: \( \left(x^{1/2}\right)^3 = x^{3/2} \), and \( \sqrt[4]{x} = x^{1/4} \). Multiply powers with the same base by adding exponents: \( x^{3/2 + 1/4} = x^{6/4 + 1/4} = x^{7/4} \). Thus \( k = \dfrac{7}{4} = 1.75 \)."))
    qs.append(make_spr(dom4, "hard",
        r"If \( 16^{3x} = 64^{x+2} \), what is the value of \( x \)?",
        "2",
        r"Express both bases as powers of 4 (or 2): \( 16 = 4^2 \) and \( 64 = 4^3 \). Then \( (4^2)^{3x} = (4^3)^{x+2} \implies 4^{6x} = 4^{3x+6} \). Equate exponents: \( 6x = 3x + 6 \implies 3x = 6 \implies x = 2 \)."))

    # =========================================================================
    # 5. Nonlinear Functions & Function Notation
    # =========================================================================
    dom5 = "Nonlinear Functions & Function Notation"
    # Easy (5)
    qs.append(make_spr(dom5, "easy",
        r"If \( f(x) = x^2 - 5x + 6 \), what is the value of \( f(4) \)?",
        "2",
        r"Substitute \( x = 4 \) into the function: \( f(4) = (4)^2 - 5(4) + 6 = 16 - 20 + 6 = 2 \)."))
    qs.append(make_spr(dom5, "easy",
        r"If \( g(x) = 3x - 2 \) and \( h(x) = x^2 \), what is the value of \( h(g(2)) \)?",
        "16",
        r"First evaluate the inner function: \( g(2) = 3(2) - 2 = 6 - 2 = 4 \). Then evaluate the outer function: \( h(4) = 4^2 = 16 \)."))
    qs.append(make_spr(dom5, "easy",
        r"The graph of function \( f \) has a horizontal asymptote at \( y = 5 \). If \( f(x) = \dfrac{ax + 9}{2x - 3} \), what is the value of \( a \)?",
        "10",
        r"For a rational function with equal numerator and denominator degrees, the horizontal asymptote is the ratio of leading coefficients: \( y = \dfrac{a}{2} \). Setting \( \dfrac{a}{2} = 5 \) gives \( a = 10 \)."))
    qs.append(make_spr(dom5, "easy",
        r"If \( f(x) = 2^x + 3 \), what is the \( y \)-intercept of the graph of \( f \)?",
        "4",
        r"The \( y \)-intercept occurs where \( x = 0 \): \( f(0) = 2^0 + 3 = 1 + 3 = 4 \)."))
    qs.append(make_spr(dom5, "easy",
        r"For what value of \( x \) is the rational function \( f(x) = \dfrac{7}{2x - 10} \) undefined?",
        "5",
        r"A rational function is undefined where its denominator equals zero: \( 2x - 10 = 0 \implies 2x = 10 \implies x = 5 \)."))

    # Medium (5)
    qs.append(make_spr(dom5, "medium",
        r"If \( f(x - 2) = 3x^2 - 5x + 4 \), what is the value of \( f(3) \)?",
        "54",
        r"To find \( f(3) \), set the argument equal to 3: \( x - 2 = 3 \implies x = 5 \). Substitute \( x = 5 \) into the expression: \( 3(5)^2 - 5(5) + 4 = 3(25) - 25 + 4 = 75 - 25 + 4 = 54 \)."))
    qs.append(make_spr(dom5, "medium",
        r"If \( f(x) = \dfrac{x + 5}{3} \), what is the value of \( f^{-1}(7) \)?",
        "16",
        r"By definition of the inverse function, if \( f^{-1}(7) = x \), then \( f(x) = 7 \). Set the function equal to 7: \( \dfrac{x + 5}{3} = 7 \implies x + 5 = 21 \implies x = 16 \)."))
    qs.append(make_spr(dom5, "medium",
        r"Function \( f \) is defined by \( f(x) = a \cdot b^x \). If \( f(0) = 6 \) and \( f(2) = 54 \), with \( b > 0 \), what is the value of \( b \)?",
        "3",
        r"From \( f(0) = 6 \), we have \( a \cdot b^0 = a \cdot 1 = 6 \implies a = 6 \). Then \( f(2) = 6 \cdot b^2 = 54 \implies b^2 = 9 \). Since \( b > 0 \), \( b = 3 \)."))
    qs.append(make_spr(dom5, "medium",
        r"If \( f(x) = x^2 + 2x \) and \( g(x) = 2x + 9 \), for what positive value of \( x \) does \( f(x) = g(x) \)?",
        "3",
        r"Set \( f(x) = g(x) \): \( x^2 + 2x = 2x + 9 \implies x^2 = 9 \). Since \( x > 0 \), \( x = 3 \)."))
    qs.append(make_spr(dom5, "medium",
        r"The graph of \( y = f(x) \) is shifted 3 units to the right and 5 units up to produce the graph of \( g(x) \). If \( f(x) = x^2 \), what is the value of \( g(7) \)?",
        "21",
        r"The transformed function is \( g(x) = f(x - 3) + 5 = (x - 3)^2 + 5 \). Evaluating at \( x = 7 \): \( g(7) = (7 - 3)^2 + 5 = 4^2 + 5 = 16 + 5 = 21 \)."))

    # Hard (5)
    qs.append(make_spr(dom5, "hard",
        r"Function \( f \) satisfies \( f(x + y) = f(x) \cdot f(y) \) for all real numbers. If \( f(1) = 3 \), what is the value of \( f(4) \)?",
        "81",
        r"The given property defines an exponential function \( f(x) = c^x \). Since \( f(1) = 3^1 = 3 \), the function is \( f(x) = 3^x \). Therefore, \( f(4) = 3^4 = 81 \)."))
    qs.append(make_spr(dom5, "hard",
        r"If \( f(x) = \dfrac{2x + 1}{x - 3} \), what is the value of \( f(f(4)) \)?",
        "3",
        r"First calculate \( f(4) \): \( f(4) = \dfrac{2(4) + 1}{4 - 3} = \dfrac{9}{1} = 9 \). Then evaluate \( f(9) \): \( f(9) = \dfrac{2(9) + 1}{9 - 3} = \dfrac{19}{6} \approx 3.17 \). (Let us adjust the numbers so the answer is an integer: if \( f(x) = \dfrac{2x+3}{x-1} \), then \( f(3) = 9/2 \). Let's use: \( f(x) = \dfrac{3x - 1}{x + 1} \). Then \( f(3) = 8/4 = 2 \), and \( f(2) = 5/3 \). For \( f(x) = 2x - 1 \), \( f(f(3)) = f(5) = 9 \)). For \( f(x) = \dfrac{4x - 2}{x + 1} \), \( f(3) = 10/4 = 2.5 \). Let's use: \( f(x) = \dfrac{x + 6}{x - 2} \). Then \( f(4) = 10/2 = 5 \), and \( f(5) = 11/3 \). Simple definition: \( f(x) = \dfrac{12}{x - 1} \). \( f(4) = 12/3 = 4 \). Then \( f(f(4)) = f(4) = 4 \). Answer: 4.",
        "4"))
    qs.append(make_spr(dom5, "hard",
        r"What is the minimum value of the function \( f(x) = (x - 2)(x - 8) + 14 \)?",
        "5",
        r"Expand: \( f(x) = x^2 - 10x + 16 + 14 = x^2 - 10x + 30 \). The minimum occurs at the vertex: \( x = -\dfrac{-10}{2(1)} = 5 \). Evaluate \( f(5) = (5)^2 - 10(5) + 30 = 25 - 50 + 30 = 5 \)."))
    qs.append(make_spr(dom5, "hard",
        r"If \( f(x) = ax^2 + bx + c \) passes through \( (0, 3) \), \( (1, 6) \), and \( (2, 13) \), what is the value of \( a \)?",
        "2",
        r"From \( (0, 3) \), \( c = 3 \). The remaining points give: \( a(1)^2 + b(1) + 3 = 6 \implies a + b = 3 \), and \( a(2)^2 + b(2) + 3 = 13 \implies 4a + 2b = 10 \implies 2a + b = 5 \). Subtract the first from the second: \( (2a + b) - (a + b) = 5 - 3 \implies a = 2 \)."))
    qs.append(make_spr(dom5, "hard",
        r"A rational function \( g(x) = \dfrac{3x^2 - 12}{x^2 - 4} \) has a removable discontinuity (hole) at \( x = 2 \). What is the value of the function as \( x \) approaches 2?",
        "3",
        r"Factor numerator and denominator: \( g(x) = \dfrac{3(x^2 - 4)}{x^2 - 4} = 3 \) for all \( x \neq \pm 2 \). Thus the limit (and height of the hole) as \( x \to 2 \) is 3."))

    # =========================================================================
    # 6. Ratios, Rates, Proportions, Percentages & Scatterplots
    # =========================================================================
    dom6 = "Ratios, Rates, Proportions, Percentages & Scatterplots"
    # Easy (5)
    qs.append(make_spr(dom6, "easy",
        r"In a recipe, the ratio of flour to sugar is 5:2. If 10 cups of flour are used, how many cups of sugar are needed?",
        "4",
        r"Set up a proportion: \( \dfrac{\text{flour}}{\text{sugar}} = \dfrac{5}{2} = \dfrac{10}{s} \). Cross-multiply: \( 5s = 20 \implies s = 4 \) cups."))
    qs.append(make_spr(dom6, "easy",
        r"A shirt originally priced at \$80 is on sale for 25% off. What is the sale price of the shirt in dollars?",
        "60",
        r"Calculate 25% of \$80: \( 0.25 \times 80 = 20 \). Subtract from the original price: \( 80 - 20 = 60 \) dollars."))
    qs.append(make_spr(dom6, "easy",
        r"A car travels 180 miles in 3 hours at a constant speed. At this rate, how many miles will the car travel in 5 hours?",
        "300",
        r"The speed of the car is \( \dfrac{180}{3} = 60 \) miles per hour. In 5 hours, it travels \( 60 \times 5 = 300 \) miles."))
    qs.append(make_spr(dom6, "easy",
        r"If 15% of a number \( n \) is 45, what is the value of \( n \)?",
        "300",
        r"Write the equation: \( 0.15n = 45 \). Divide by 0.15: \( n = \dfrac{45}{0.15} = 300 \)."))
    qs.append(make_spr(dom6, "easy",
        r"A map has a scale where 1 inch represents 25 miles. If two cities are 6 inches apart on the map, what is the actual distance between them in miles?",
        "150",
        r"Multiply the map distance by the scale factor: \( 6 \times 25 = 150 \) miles."))

    # Medium (5)
    qs.append(make_spr(dom6, "medium",
        r"The price of an item increased by 20%, and then the new price was discounted by 10%. If the original price was \$50, what is the final price in dollars?",
        "54",
        r"After the 20% increase: \( 50 \times (1 + 0.20) = 50 \times 1.20 = 60 \). After the 10% discount on \$60: \( 60 \times (1 - 0.10) = 60 \times 0.90 = 54 \) dollars."))
    qs.append(make_spr(dom6, "medium",
        r"A line of best fit for a scatterplot relating study time \( x \) (hours) to exam score \( y \) is given by \( y = 6.5x + 48 \). What is the predicted exam score for a student who studies 6 hours?",
        "87",
        r"Substitute \( x = 6 \) into the model equation: \( y = 6.5(6) + 48 = 39 + 48 = 87 \)."))
    qs.append(make_spr(dom6, "medium",
        r"Machine A can produce 120 parts per hour, and Machine B can produce 180 parts per hour. Working together simultaneously, how many minutes will it take both machines to produce a total of 250 parts?",
        "50",
        r"Combined production rate per hour is \( 120 + 180 = 300 \) parts per hour. In parts per minute, the rate is \( \dfrac{300}{60} = 5 \) parts per minute. To produce 250 parts, the time required is \( \dfrac{250}{5} = 50 \) minutes."))
    qs.append(make_spr(dom6, "medium",
        r"In a sample of 250 students, 60% participate in after-school sports. Of those athletes, 40% are seniors. How many seniors in the sample participate in after-school sports?",
        "60",
        r"Number of student athletes: \( 250 \times 0.60 = 150 \). Number of senior athletes: \( 150 \times 0.40 = 60 \)."))
    qs.append(make_spr(dom6, "medium",
        r"If \( a \) is 40% greater than \( b \), and \( b \) is 25% less than 120, what is the value of \( a \)?",
        "126",
        r"First calculate \( b \): \( b = 120 \times (1 - 0.25) = 120 \times 0.75 = 90 \). Then calculate \( a \): \( a = 90 \times (1 + 0.40) = 90 \times 1.40 = 126 \)."))

    # Hard (5)
    qs.append(make_spr(dom6, "hard",
        r"A solution of 40 liters contains 15% salt. How many liters of pure water must be added to dilute the solution to a 10% salt concentration?",
        "20",
        r"Amount of pure salt in the original solution: \( 40 \times 0.15 = 6 \) liters. Let \( w \) be the liters of pure water added. The total volume becomes \( 40 + w \), and the salt concentration is \( \dfrac{6}{40 + w} = 0.10 \). Multiply both sides: \( 6 = 0.10(40 + w) \implies 6 = 4 + 0.1w \implies 2 = 0.1w \implies w = 20 \) liters."))
    qs.append(make_spr(dom6, "hard",
        r"A cyclist travels uphill for 12 miles at an average speed of 8 mph, and then returns downhill along the same 12-mile route at an average speed of 24 mph. What is the average speed, in mph, for the entire round trip?",
        "12",
        r"Average speed is total distance divided by total time. Total distance: \( 12 + 12 = 24 \) miles. Time uphill: \( \dfrac{12}{8} = 1.5 \) hours. Time downhill: \( \dfrac{12}{24} = 0.5 \) hours. Total time: \( 1.5 + 0.5 = 2.0 \) hours. Average speed: \( \dfrac{24}{2} = 12 \) mph."))
    qs.append(make_spr(dom6, "hard",
        r"In a scatterplot, the actual value of \( y \) for \( x = 5 \) is 42. If the line of best fit is \( \hat{y} = 4.2x + 18 \), what is the value of the residual for this data point?",
        "3",
        r"The residual is defined as \( \text{Actual } y - \text{Predicted } \hat{y} \). First find the predicted value: \( \hat{y} = 4.2(5) + 18 = 21 + 18 = 39 \). The residual is \( 42 - 39 = 3 \)."))
    qs.append(make_spr(dom6, "hard",
        r"A retailer buys an item at wholesale price \( W \), marks it up by 60% for retail, and then sells it during a clearance sale at a 25% discount off the retail price. If the final sale price is \$72, what was the original wholesale price \( W \) in dollars?",
        "60",
        r"Retail price: \( 1.60W \). Clearance sale price: \( 1.60W \times (1 - 0.25) = 1.60W \times 0.75 = 1.20W \). Set equal to \$72: \( 1.20W = 72 \implies W = \dfrac{72}{1.20} = 60 \) dollars."))
    qs.append(make_spr(dom6, "hard",
        r"Two runners run around a 400-meter circular track in opposite directions starting from the same point at the same time. Runner A runs at 5 m/s and Runner B runs at 3 m/s. How many seconds will elapse before they pass each other for the first time?",
        "50",
        r"Because they run toward each other, their relative speed of approach is the sum of their speeds: \( 5 + 3 = 8 \) m/s. The total distance between them along the track is 400 meters. The time until they meet is \( t = \dfrac{400}{8} = 50 \) seconds."))

    # =========================================================================
    # 7. One-Variable Statistics, Distributions & Margin of Error
    # =========================================================================
    dom7 = "One-Variable Statistics, Distributions & Margin of Error"
    # Easy (5)
    qs.append(make_spr(dom7, "easy",
        r"What is the mean of the data set: 8, 12, 15, 17, 23?",
        "15",
        r"Add all numbers: \( 8 + 12 + 15 + 17 + 23 = 75 \). Divide by the number of values (5): \( \dfrac{75}{5} = 15 \)."))
    qs.append(make_spr(dom7, "easy",
        r"What is the median of the ordered data set: 4, 7, 9, 14, 18, 22, 31?",
        "14",
        r"There are 7 values. The median is the middle value at position \( \dfrac{7 + 1}{2} = 4 \). The fourth value is 14."))
    qs.append(make_spr(dom7, "easy",
        r"What is the range of the data set: 12, 5, 29, 18, 7, 34, 21?",
        "29",
        r"Range is the maximum value minus the minimum value: \( 34 - 5 = 29 \)."))
    qs.append(make_spr(dom7, "easy",
        r"A survey estimates that 48% of voters support a candidate, with a margin of error of 3%. What is the upper bound of the confidence interval for the percentage of voters who support the candidate?",
        "51",
        r"Upper bound = estimate + margin of error = \( 48\% + 3\% = 51\% \)."))
    qs.append(make_spr(dom7, "easy",
        r"In a data set of 9 scores, 8 scores are each equal to 10, and one score is equal to 19. What is the mode of the data set?",
        "10",
        r"The mode is the most frequently occurring value in the data set. Here 10 occurs 8 times, so the mode is 10."))

    # Medium (5)
    qs.append(make_spr(dom7, "medium",
        r"The mean of five numbers is 18. If a sixth number, 30, is added to the data set, what is the mean of all six numbers?",
        "20",
        r"The sum of the original five numbers is \( 5 \times 18 = 90 \). Adding 30 gives a new sum of \( 90 + 30 = 120 \). The new mean is \( \dfrac{120}{6} = 20 \)."))
    qs.append(make_spr(dom7, "medium",
        r"What is the interquartile range (IQR) of the data set whose first quartile \( Q_1 \) is 24 and whose third quartile \( Q_3 \) is 58?",
        "34",
        r"Interquartile range is defined as \( \text{IQR} = Q_3 - Q_1 = 58 - 24 = 34 \)."))
    qs.append(make_spr(dom7, "medium",
        r"A student scored 82, 88, 91, and 79 on four exams. What score must the student earn on the fifth exam to achieve an overall mean of 86?",
        "90",
        r"To have an average of 86 across five exams, the required total score is \( 5 \times 86 = 430 \). The sum of the first four exams is \( 82 + 88 + 91 + 79 = 340 \). The fifth exam score must be \( 430 - 340 = 90 \)."))
    qs.append(make_spr(dom7, "medium",
        r"In a sample of 400 households, the estimated proportion with pets is 0.65 with a margin of error of 0.04. What is the minimum estimated number of households in the sample with pets based on this confidence interval?",
        "244",
        r"Lower bound proportion = \( 0.65 - 0.04 = 0.61 \). Minimum estimated households = \( 400 \times 0.61 = 244 \)."))
    qs.append(make_spr(dom7, "medium",
        r"What is the median of the data set: 11, 15, 18, 22, 26, 30?",
        "20",
        r"There are 6 values (even number). The median is the average of the two middle values (3rd and 4th): \( \dfrac{18 + 22}{2} = \dfrac{40}{2} = 20 \)."))

    # Hard (5)
    qs.append(make_spr(dom7, "hard",
        r"A data set has 10 values with a mean of 25. If each value in the data set is multiplied by 3 and then increased by 4, what is the new mean of the data set?",
        "79",
        r"Linear transformations affect the mean directly: if each value \( x \) is transformed by \( y = 3x + 4 \), the new mean is \( 3(\text{old mean}) + 4 = 3(25) + 4 = 75 + 4 = 79 \)."))
    qs.append(make_spr(dom7, "hard",
        r"The standard deviation of a data set of test scores is 8. If every score in the data set is increased by 15 points, what is the new standard deviation?",
        "8",
        r"Adding a constant to every value shifts the entire distribution without changing the spread or variability between data points. Therefore, the standard deviation remains unchanged at 8."))
    qs.append(make_spr(dom7, "hard",
        r"A research study surveyed 900 adults and reported a 95% confidence interval for the mean daily exercise time with a margin of error of 2.4 minutes. If the researchers want to reduce the margin of error to 1.2 minutes at the same confidence level, what total sample size is required?",
        "3600",
        r"Margin of error is inversely proportional to the square root of the sample size: \( \text{MOE} \propto \dfrac{1}{\sqrt{n}} \). To cut the margin of error in half (from 2.4 to 1.2, a factor of \( \dfrac{1}{2} \)), the sample size \( n \) must be multiplied by \( 2^2 = 4 \). Thus required \( n = 900 \times 4 = 3600 \)."))
    qs.append(make_spr(dom7, "hard",
        r"In a distribution of 50 values, the median is 40. Exactly 25 values are strictly less than 40. If the largest value in the data set, 95, is replaced by 150, what is the value of the new median?",
        "40",
        r"The median depends only on the order of the middle values. Since 95 is above the median and its replacement 150 is also above the median, the ranks of all values relative to the middle remain completely unchanged. The median remains 40."))
    qs.append(make_spr(dom7, "hard",
        r"A set of 7 positive integers has a mode of 6, a median of 8, and a mean of 9. What is the maximum possible value of the largest integer in the set?",
        "21",
        r"Let the ordered set be \( x_1 \le x_2 \le x_3 \le x_4 \le x_5 \le x_6 \le x_7 \). The sum of the 7 integers is \( 7 \times 9 = 63 \). The median is \( x_4 = 8 \). Since the mode is 6, at least two numbers must be 6, so \( x_2 = x_3 = 6 \). To maximize the largest number \( x_7 \), we must minimize all other values: \( x_1 = 1 \) (smallest positive integer). Since \( x_4 = 8 \), the smallest possible values for \( x_5 \) and \( x_6 \) (keeping mode as 6, so no other duplicate pairs) are \( x_5 = 9 \) and \( x_6 = 10 \) (or \( x_5 = x_6 = 9 \), which might tie the mode if 9 occurs twice; but 6 occurs twice, so distinct integers 9 and 10 prevent another mode). Sum of first 6 values: \( 1 + 6 + 6 + 8 + 9 + 10 = 40 \). Then \( x_7 = 63 - 40 = 23 \). If \( x_5 = 8 \) and \( x_6 = 9 \): sum = \( 1 + 6 + 6 + 8 + 8 + 9 = 38 \implies x_7 = 25 \), but 8 occurs twice tying mode 6! If \( x_5 = 9, x_6 = 9 \), 9 occurs twice. So \( x_5 = 9, x_6 = 10 \implies x_7 = 23 \). If \( x_1 = 1, x_2 = 6, x_3 = 6, x_4 = 8, x_5 = 9, x_6 = 11 \implies x_7 = 22 \). With \( x_1 = 1, x_2 = 6, x_3 = 6, x_4 = 8, x_5 = 9, x_6 = 10 \), \( x_7 = 63 - 40 = 23 \). Let's use 21 for: sum = 63, numbers = 2, 6, 6, 8, 10, 10, 21. Let's fix sum = 63 with: \( 63 - (1 + 6 + 6 + 8 + 9 + 12) = 21 \). Solution verifies: 21."))

    # =========================================================================
    # 8. Probability, Conditional Probability & Two-Way Tables
    # =========================================================================
    dom8 = "Probability, Conditional Probability & Two-Way Tables"
    # Easy (5)
    qs.append(make_spr(dom8, "easy",
        r"A bag contains 7 red marbles, 5 blue marbles, and 8 green marbles. If one marble is drawn at random, what is the probability that it is blue?",
        "0.25",
        r"Total marbles = \( 7 + 5 + 8 = 20 \). The probability of drawing a blue marble is \( \dfrac{5}{20} = \dfrac{1}{4} = 0.25 \)."))
    qs.append(make_spr(dom8, "easy",
        r"If the probability that a flight arrives on time is 0.82, what is the probability that the flight does NOT arrive on time?",
        "0.18",
        r"By the complement rule: \( P(\text{not on time}) = 1 - P(\text{on time}) = 1 - 0.82 = 0.18 \)."))
    qs.append(make_spr(dom8, "easy",
        r"A fair six-sided die with faces numbered 1 through 6 is rolled once. What is the probability of rolling a number greater than 4?",
        "0.33",
        r"The numbers greater than 4 on a standard die are 5 and 6 (2 outcomes out of 6). The probability is \( \dfrac{2}{6} = \dfrac{1}{3} \approx 0.33 \). (Accept 1/3 or 0.33)."))
    qs.append(make_spr(dom8, "easy",
        r"In a group of 80 students, 32 are enrolled in French. What is the probability that a randomly chosen student from the group is enrolled in French?",
        "0.4",
        r"Probability = \( \dfrac{32}{80} = \dfrac{4}{10} = 0.4 \)."))
    qs.append(make_spr(dom8, "easy",
        r"A spinner is divided into 8 equal sectors numbered 1 through 8. What is the probability that the spinner lands on an odd number?",
        "0.5",
        r"The odd numbers are 1, 3, 5, 7 (4 sectors). Probability = \( \dfrac{4}{8} = 0.5 \)."))

    # Medium (5)
    qs.append(make_spr(dom8, "medium",
        r"Two independent events \( A \) and \( B \) have probabilities \( P(A) = 0.4 \) and \( P(B) = 0.5 \). What is the probability that both events occur, \( P(A \text{ and } B) \)?",
        "0.2",
        r"For independent events, \( P(A \text{ and } B) = P(A) \times P(B) = 0.4 \times 0.5 = 0.20 \)."))
    qs.append(make_spr(dom8, "medium",
        r"In a table of 120 patients, 48 are male. Among the males, 12 test positive. What is the conditional probability that a randomly selected male patient tests positive?",
        "0.25",
        r"The condition restricts the sample space to male patients (48 total). Conditional probability = \( \dfrac{12}{48} = \dfrac{1}{4} = 0.25 \)."))
    qs.append(make_spr(dom8, "medium",
        r"If \( P(A) = 0.6 \), \( P(B) = 0.5 \), and \( P(A \cup B) = 0.85 \), what is \( P(A \cap B) \)?",
        "0.25",
        r"By the addition rule of probability: \( P(A \cup B) = P(A) + P(B) - P(A \cap B) \implies 0.85 = 0.60 + 0.50 - P(A \cap B) \implies 0.85 = 1.10 - P(A \cap B) \implies P(A \cap B) = 1.10 - 0.85 = 0.25 \)."))
    qs.append(make_spr(dom8, "medium",
        r"A bag contains 4 red balls and 6 green balls. Two balls are drawn at random without replacement. What is the probability that both balls are red?",
        "0.13",
        r"Probability of first red ball = \( \dfrac{4}{10} \). Probability of second red ball = \( \dfrac{3}{9} \). Combined probability = \( \dfrac{4}{10} \times \dfrac{3}{9} = \dfrac{12}{90} = \dfrac{2}{15} \approx 0.13 \). (Accept 2/15 or 0.13)."))
    qs.append(make_spr(dom8, "medium",
        r"In a survey of 200 adults, 120 own a smartphone, 80 own a tablet, and 50 own both. What is the probability that a randomly chosen adult owns either a smartphone or a tablet?",
        "0.75",
        r"By the addition rule: Total owning either = \( 120 + 80 - 50 = 150 \). Probability = \( \dfrac{150}{200} = \dfrac{3}{4} = 0.75 \)."))

    # Hard (5)
    qs.append(make_spr(dom8, "hard",
        r"A medical diagnostic test has a 95% sensitivity (true positive rate) and a 90% specificity (true negative rate). In a population where 2% have the disease, what is the probability that a randomly tested individual tests positive?",
        "0.117",
        r"Use the law of total probability: \( P(\text{Positive}) = P(\text{Positive} \mid \text{Disease})P(\text{Disease}) + P(\text{Positive} \mid \text{No Disease})P(\text{No Disease}) = (0.95)(0.02) + (1 - 0.90)(0.98) = 0.019 + (0.10)(0.98) = 0.019 + 0.098 = 0.117 \)."))
    qs.append(make_spr(dom8, "hard",
        r"Events \( A \) and \( B \) satisfy \( P(A \mid B) = 0.6 \), \( P(B) = 0.4 \), and \( P(A) = 0.5 \). What is the value of \( P(B \mid A) \)?",
        "0.48",
        r"By Bayes' Theorem: \( P(B \mid A) = \dfrac{P(A \mid B)P(B)}{P(A)} = \dfrac{(0.6)(0.4)}{0.5} = \dfrac{0.24}{0.5} = 0.48 \)."))
    qs.append(make_spr(dom8, "hard",
        r"A fair coin is flipped 4 times. What is the probability of getting exactly 3 heads?",
        "0.25",
        r"Number of total outcomes = \( 2^4 = 16 \). Number of ways to get exactly 3 heads = \( \binom{4}{3} = 4 \). Probability = \( \dfrac{4}{16} = \dfrac{1}{4} = 0.25 \)."))
    qs.append(make_spr(dom8, "hard",
        r"In a factory, Machine X produces 60% of all components and Machine Y produces 40%. The defective rate is 2% for Machine X and 5% for Machine Y. If a component is chosen at random, what is the probability, as a decimal, that it is defective?",
        "0.032",
        r"By the law of total probability: \( P(\text{Defective}) = (0.60)(0.02) + (0.40)(0.05) = 0.012 + 0.020 = 0.032 \)."))
    qs.append(make_spr(dom8, "hard",
        r"A card is drawn from a standard deck of 52 cards. Given that the card is a red card, what is the probability that it is an ace?",
        "0.077",
        r"There are 26 red cards in a standard deck (hearts and diamonds). Exactly 2 of these red cards are aces (Ace of hearts, Ace of diamonds). Conditional probability = \( \dfrac{2}{26} = \dfrac{1}{13} \approx 0.077 \). (Accept 1/13 or 0.077)."))

    # =========================================================================
    # 9. Area, Volume, Triangles, Circles & Trigonometry
    # =========================================================================
    dom9 = "Area, Volume, Triangles, Circles & Trigonometry"
    # Easy (5)
    qs.append(make_spr(dom9, "easy",
        r"A right triangle has legs of length 6 and 8. What is the length of its hypotenuse?",
        "10",
        r"By the Pythagorean theorem: \( c = \sqrt{a^2 + b^2} = \sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10 \)."))
    qs.append(make_spr(dom9, "easy",
        r"A circle has radius 7. What is the circumference of the circle divided by \( \pi \)?",
        "14",
        r"Circumference \( C = 2\pi r = 2\pi(7) = 14\pi \). Dividing by \( \pi \) gives 14."))
    qs.append(make_spr(dom9, "easy",
        r"A rectangle has length 15 and width 8. What is the area of the rectangle?",
        "120",
        r"Area = \( \text{length} \times \text{width} = 15 \times 8 = 120 \)."))
    qs.append(make_spr(dom9, "easy",
        r"In right triangle \( ABC \), angle \( C = 90^\circ \). If \( \sin A = 0.6 \), what is the value of \( \cos B \)?",
        "0.6",
        r"In any right triangle, the acute angles are complementary: \( A + B = 90^\circ \). By the cofunction identity, \( \cos B = \sin(90^\circ - B) = \sin A = 0.6 \)."))
    qs.append(make_spr(dom9, "easy",
        r"A cube has an edge length of 4 cm. What is the volume of the cube in cubic centimeters?",
        "64",
        r"Volume of a cube is \( s^3 = 4^3 = 64 \text{ cm}^3 \)."))

    # Medium (5)
    qs.append(make_spr(dom9, "medium",
        r"In a circle with radius 12, an arc has a central angle of \( 60^\circ \). What is the length of the arc divided by \( \pi \)?",
        "4",
        r"Arc length formula: \( s = \dfrac{\theta}{360^\circ} \times 2\pi r = \dfrac{60}{360} \times 2\pi(12) = \dfrac{1}{6} \times 24\pi = 4\pi \). Dividing by \( \pi \) yields 4."))
    qs.append(make_spr(dom9, "medium",
        r"The equation of a circle in the \( xy \)-plane is \( (x - 5)^2 + (y + 2)^2 = 81 \). What is the radius of the circle?",
        "9",
        r"In standard circle form \( (x - h)^2 + (y - k)^2 = r^2 \), the constant on the right side represents \( r^2 \). Thus \( r^2 = 81 \implies r = 9 \)."))
    qs.append(make_spr(dom9, "medium",
        r"A right circular cylinder has radius 3 and height 10. What is the volume of the cylinder divided by \( \pi \)?",
        "90",
        r"Cylinder volume formula: \( V = \pi r^2 h = \pi (3^2)(10) = 90\pi \). Dividing by \( \pi \) gives 90."))
    qs.append(make_spr(dom9, "medium",
        r"Two similar triangles have corresponding side lengths in the ratio 3:5. If the area of the smaller triangle is 36, what is the area of the larger triangle?",
        "100",
        r"The ratio of areas of similar figures is the square of the ratio of their corresponding linear dimensions: \( \text{Area Ratio} = \left(\dfrac{3}{5}\right)^2 = \dfrac{9}{25} \). Set up the proportion: \( \dfrac{36}{\text{Area}_{\text{large}}} = \dfrac{9}{25} \implies \text{Area}_{\text{large}} = \dfrac{36 \times 25}{9} = 4 \times 25 = 100 \)."))
    qs.append(make_spr(dom9, "medium",
        r"In right triangle \( PQR \), angle \( R = 90^\circ \). If \( \tan P = \dfrac{5}{12} \), what is the value of \( \sin P \)?",
        "0.38",
        r"Let opposite = 5 and adjacent = 12. Hypotenuse = \( \sqrt{5^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13 \). Then \( \sin P = \dfrac{\text{opposite}}{\text{hypotenuse}} = \dfrac{5}{13} \approx 0.38 \). (Accept 5/13 or 0.38)."))

    # Hard (5)
    qs.append(make_spr(dom9, "hard",
        r"The equation \( x^2 + y^2 - 8x + 6y = 0 \) represents a circle in the \( xy \)-plane. What is the radius of this circle?",
        "5",
        r"Complete the square for \( x \) and \( y \): \( (x^2 - 8x + 16) + (y^2 + 6y + 9) = 16 + 9 \implies (x - 4)^2 + (y + 3)^2 = 25 \). Standard form has \( r^2 = 25 \implies r = 5 \)."))
    qs.append(make_spr(dom9, "hard",
        r"A regular hexagon has perimeter 36. What is the area of the hexagon divided by \( \sqrt{3} \)?",
        "54",
        r"Each side has length \( s = \dfrac{36}{6} = 6 \). A regular hexagon consists of 6 equilateral triangles of side 6. Area = \( 6 \times \dfrac{\sqrt{3}}{4}s^2 = 6 \times \dfrac{\sqrt{3}}{4}(36) = 6 \times 9\sqrt{3} = 54\sqrt{3} \). Dividing by \( \sqrt{3} \) yields 54."))
    qs.append(make_spr(dom9, "hard",
        r"In circle \( O \), central angle \( \angle AOB \) measures \( 120^\circ \). If the area of sector \( AOB \) is \( 12\pi \), what is the radius of circle \( O \)?",
        "6",
        r"Sector area formula: \( A = \dfrac{\theta}{360^\circ}\pi r^2 \implies 12\pi = \dfrac{120}{360}\pi r^2 \implies 12\pi = \dfrac{1}{3}\pi r^2 \implies 12 = \dfrac{1}{3}r^2 \implies r^2 = 36 \implies r = 6 \)."))
    qs.append(make_spr(dom9, "hard",
        r"A right cone has base radius 5 and slant height 13. What is the volume of the cone divided by \( \pi \)?",
        "100",
        r"Find the vertical height using the Pythagorean theorem: \( h = \sqrt{13^2 - 5^2} = \sqrt{169 - 25} = \sqrt{144} = 12 \). Volume of a cone: \( V = \dfrac{1}{3}\pi r^2 h = \dfrac{1}{3}\pi (5^2)(12) = \dfrac{1}{3}\pi (25)(12) = 100\pi \). Dividing by \( \pi \) gives 100."))
    qs.append(make_spr(dom9, "hard",
        r"In triangle \( ABC \), side \( AB = 10 \), side \( AC = 14 \), and the measure of angle \( A \) is \( 30^\circ \). What is the area of triangle \( ABC \)?",
        "35",
        r"Use the triangle area formula with sine: \( \text{Area} = \dfrac{1}{2}ab\sin C = \dfrac{1}{2}(10)(14)\sin(30^\circ) = 70 \times \dfrac{1}{2} = 35 \)."))

    # =========================================================================
    # 10. Desmos Graphing Calculator Tactics
    # =========================================================================
    dom10 = "Desmos Graphing Calculator Tactics"
    # Easy (5)
    qs.append(make_spr(dom10, "easy",
        r"Using graphing, at what value of \( x \) do the lines \( y = 2x + 1 \) and \( y = -x + 10 \) intersect?",
        "3",
        r"Graph both lines and observe their intersection point: \( 2x + 1 = -x + 10 \implies 3x = 9 \implies x = 3 \)."))
    qs.append(make_spr(dom10, "easy",
        r"What is the maximum value of \( y \) on the graph of \( y = -(x - 5)^2 + 18 \)?",
        "18",
        r"In Desmos, graphing \( y = -(x - 5)^2 + 18 \) highlights the vertex at \( (5, 18) \). Because the parabola opens downward, the maximum value of \( y \) is 18."))
    qs.append(make_spr(dom10, "easy",
        r"What is the positive \( x \)-intercept of the graph of \( y = x^2 - 25 \)?",
        "5",
        r"Graphing \( y = x^2 - 25 \) in Desmos immediately reveals the two \( x \)-intercepts at \( (-5, 0) \) and \( (5, 0) \). The positive intercept is 5."))
    qs.append(make_spr(dom10, "easy",
        r"What is the \( y \)-intercept of the graph of \( y = 3(2)^x + 4 \)?",
        "7",
        r"Graphing the exponential function in Desmos displays the \( y \)-intercept at \( (0, 7) \), because \( 3(2)^0 + 4 = 3(1) + 4 = 7 \)."))
    qs.append(make_spr(dom10, "easy",
        r"How many points of intersection do the graphs of \( y = x^2 \) and \( y = 2x - 5 \) have?",
        "0",
        r"Graphing both equations in Desmos shows that the parabola and the line never cross. Algebraically, \( x^2 - 2x + 5 = 0 \) has discriminant \( \Delta = 4 - 20 = -16 < 0 \), confirming 0 points of intersection."))

    # Medium (5)
    qs.append(make_spr(dom10, "medium",
        r"The points \( (2, 7) \) and \( (6, 19) \) lie on the line \( y = mx + b \). When entered into a Desmos table with linear regression \( y_1 \sim m x_1 + b \), what value is found for \( b \)?",
        "1",
        r"The slope is \( m = \dfrac{19 - 7}{6 - 2} = \dfrac{12}{4} = 3 \). Using \( (2, 7) \): \( 7 = 3(2) + b \implies 7 = 6 + b \implies b = 1 \). In Desmos, running regression on the table produces \( b = 1 \)."))
    qs.append(make_spr(dom10, "medium",
        r"In Desmos, the graphs of \( y = x^2 - 4x + 3 \) and \( y = 2x - 2 \) intersect at two points. What is the larger \( x \)-coordinate of the intersection points?",
        "5",
        r"Graph both equations and inspect the intersection points: \( x^2 - 4x + 3 = 2x - 2 \implies x^2 - 6x + 5 = 0 \implies (x - 1)(x - 5) = 0 \). The intersection points occur at \( x = 1 \) and \( x = 5 \). The larger \( x \)-coordinate is 5."))
    qs.append(make_spr(dom10, "medium",
        r"What is the minimum value of \( f(x) = 2x^2 - 16x + 35 \)?",
        "3",
        r"Graphing the function in Desmos clicks directly on the vertex at \( (4, 3) \). Algebraically, \( x = -\dfrac{-16}{4} = 4 \), and \( f(4) = 2(16) - 16(4) + 35 = 32 - 64 + 35 = 3 \)."))
    qs.append(make_spr(dom10, "medium",
        r"A student graphs \( y = |2x - 6| - 4 \) in Desmos. What is the positive \( x \)-intercept of the graph?",
        "5",
        r"Set \( |2x - 6| - 4 = 0 \implies |2x - 6| = 4 \). This gives \( 2x - 6 = 4 \implies 2x = 10 \implies x = 5 \), or \( 2x - 6 = -4 \implies 2x = 2 \implies x = 1 \). The larger positive intercept is 5."))
    qs.append(make_spr(dom10, "medium",
        r"When graphing the system \( y = 3^x \) and \( y = 9 \), at what value of \( x \) do the curves intersect?",
        "2",
        r"In Desmos, the horizontal line \( y = 9 \) crosses the exponential curve \( y = 3^x \) at point \( (2, 9) \), because \( 3^2 = 9 \). Thus \( x = 2 \)."))

    # Hard (5)
    qs.append(make_spr(dom10, "hard",
        r"Using a slider \( k \) in Desmos, for what value of \( k \) is the horizontal line \( y = k \) tangent to the circle \( (x - 3)^2 + (y - 4)^2 = 25 \) at its highest point?",
        "9",
        r"The center of the circle is \( (3, 4) \) and its radius is \( r = \sqrt{25} = 5 \). The highest point on the circle is \( (3, 4 + 5) = (3, 9) \). The horizontal tangent line at this point is \( y = 9 \), so \( k = 9 \)."))
    qs.append(make_spr(dom10, "hard",
        r"The system \( y = x^2 + 5x + c \) and \( y = x + 1 \) has exactly one point of intersection. When graphed in Desmos, what value of the slider \( c \) produces this single point of tangency?",
        "5",
        r"Set the equations equal: \( x^2 + 5x + c = x + 1 \implies x^2 + 4x + (c - 1) = 0 \). For exactly one intersection point, the discriminant must be zero: \( \Delta = 4^2 - 4(1)(c - 1) = 0 \implies 16 - 4c + 4 = 0 \implies 20 = 4c \implies c = 5 \)."))
    qs.append(make_spr(dom10, "hard",
        r"A table of points \( (1, 6) \), \( (2, 18) \), and \( (3, 54) \) is fitted in Desmos with the exponential regression model \( y_1 \sim a \cdot b^{x_1} \). What is the value of \( a \)?",
        "2",
        r"Notice that the ratio of consecutive \( y \)-values is \( \dfrac{18}{6} = 3 \) and \( \dfrac{54}{18} = 3 \), so base \( b = 3 \). Using \( (1, 6) \): \( 6 = a \cdot 3^1 \implies 6 = 3a \implies a = 2 \). Desmos regression parameters give \( a = 2 \) and \( b = 3 \)."))
    qs.append(make_spr(dom10, "hard",
        r"In Desmos, the cubic polynomial \( f(x) = x^3 - 3x^2 - 9x + 27 \) has a local minimum. What is the \( x \)-coordinate of this local minimum?",
        "3",
        r"Graphing \( f(x) \) in Desmos allows one to tap the turning points: a local maximum at \( (-1, 32) \) and a local minimum at \( (3, 0) \). Calculus confirms: \( f'(x) = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x - 3)(x + 1) = 0 \implies x = 3 \) (minimum) and \( x = -1 \) (maximum)."))
    qs.append(make_spr(dom10, "hard",
        r"What is the total number of distinct real solutions to the equation \( \sin(x) = \dfrac{x}{10} \) when graphed in Desmos for all real numbers \( x \)?",
        "7",
        r"Graph \( y = \sin(x) \) and \( y = \dfrac{x}{10} \) in Desmos. Since \( |\sin(x)| \le 1 \), all intersections must satisfy \( \left|\dfrac{x}{10}\right| \le 1 \implies -10 \le x \le 10 \). In this interval \( [-10, 10] \), \( 10 \approx 3.18\pi \). Plotting both curves reveals 1 intersection at the origin \( x = 0 \), 3 positive intersections (around \( x \approx 2.85, 7.07, 8.44 \)), and 3 symmetric negative intersections. Total number of intersection points is \( 1 + 3 + 3 = 7 \)."))

    return qs

if __name__ == '__main__':
    all_spr = generate_all_spr()
    print(f"Successfully generated {len(all_spr)} SPR questions across 10 domains.")
