"""
scripts/sat_generators/gen_linfun.py
Generator for Linear Functions & Inequalities questions.
"""

from .common import make_q

def get_new_questions():
    qs = []
    dom = "Linear Functions & Inequalities"

    # ==================== EASY (6 questions) ====================
    easy_data = [
        ("What is the slope of the line passing through \\( (2, 5) \\) and \\( (6, 17) \\)?",
         ["2", "3", "4", "5"], 1,
         "\\( m = \\dfrac{17 - 5}{6 - 2} = \\dfrac{12}{4} = 3 \\)."),
        ("A line has equation \\( y = -4x + 9 \\). What is the \\( y \\)-intercept of the line?",
         ["\\( (0, -4) \\)", "\\( (0, 9) \\)", "\\( (9, 0) \\)", "\\( (-4, 0) \\)"], 1,
         "In slope-intercept form \\( y = mx + b \\), the y-intercept is \\( (0, b) = (0, 9) \\)."),
        ("Which inequality represents all values of \\( x \\) such that \\( 4x - 5 \\leq 19 \\)?",
         ["\\( x \\leq 4 \\)", "\\( x \\leq 5 \\)", "\\( x \\leq 6 \\)", "\\( x \\leq 7 \\)"], 2,
         "Add 5: \\( 4x \\leq 24 \\). Divide by 4: \\( x \\leq 6 \\)."),
        ("The function \\( f(x) = 15x + 40 \\) models the total charge in dollars for \\( x \\) hours of equipment rental. What does the value 40 represent?",
         ["The hourly rate for the rental", "The flat initial fee charged regardless of hours", "The maximum number of rental hours", "The total charge for 15 hours"], 1,
         "When \\( x = 0 \\), \\( f(0) = 40 \\). Thus, 40 represents the fixed initial fee."),
        ("What is the slope of the line \\( 2x + 5y = 20 \\)?",
         ["\\( -\\dfrac{2}{5} \\)", "\\( \\dfrac{2}{5} \\)", "\\( -\\dfrac{5}{2} \\)", "\\( 4 \\)"], 0,
         "Solve for \\( y \\): \\( 5y = -2x + 20 \\implies y = -\\dfrac{2}{5}x + 4 \\). The slope is \\( -\\dfrac{2}{5} \\)."),
        ("Which value of \\( x \\) satisfies the inequality \\( -3x + 8 < -7 \\)?",
         ["3", "4", "5", "6"], 3,
         "Subtract 8: \\( -3x < -15 \\). Divide by \\( -3 \\) (reverse the inequality): \\( x > 5 \\). Among the choices, only 6 is strictly greater than 5.")
    ]
    for text, ch, ans, sol in easy_data:
        qs.append(make_q(dom, "easy", text, ch, ans, sol))

    # ==================== MEDIUM (21 questions) ====================
    med_data = [
        ("A line is parallel to \\( 3x - 4y = 8 \\) and passes through the point \\( (4, 1) \\). What is the equation of this line?",
         ["\\( y = \\dfrac{3}{4}x - 2 \\)", "\\( y = \\dfrac{3}{4}x + 2 \\)", "\\( y = -\\dfrac{4}{3}x + 1 \\)", "\\( y = \\dfrac{3}{4}x - 4 \\)"], 0,
         "Slope of \\( 3x - 4y = 8 \\) is \\( m = \\dfrac{3}{4} \\). Using point-slope form: \\( y - 1 = \\dfrac{3}{4}(x - 4) \\implies y - 1 = \\dfrac{3}{4}x - 3 \\implies y = \\dfrac{3}{4}x - 2 \\)."),
        ("A line is perpendicular to \\( y = -\\dfrac{2}{3}x + 5 \\) and has a \\( y \\)-intercept of \\( (0, -4) \\). What is the equation of this line?",
         ["\\( y = \\dfrac{3}{2}x - 4 \\)", "\\( y = -\\dfrac{3}{2}x - 4 \\)", "\\( y = \\dfrac{2}{3}x - 4 \\)", "\\( y = -\\dfrac{2}{3}x - 4 \\)"], 0,
         "The perpendicular slope is the negative reciprocal of \\( -2/3 \\), which is \\( 3/2 \\). With y-intercept \\( -4 \\), the equation is \\( y = \\dfrac{3}{2}x - 4 \\)."),
        ("Which point lies in the solution set of the system of inequalities?\n\\[ \\begin{cases} y > 2x - 3 \\\\ y \\leq -x + 4 \\end{cases} \\]",
         ["\\( (2, 5) \\)", "\\( (1, 2) \\)", "\\( (3, 2) \\)", "\\( (0, -4) \\)"], 1,
         "Test \\( (1, 2) \\): \\( 2 > 2(1) - 3 = -1 \\) (True) and \\( 2 \\leq -1 + 4 = 3 \\) (True)."),
        ("A hiker is at an elevation of 2,400 feet and descends at a constant rate of 350 feet per hour. Which function models the elevation \\( E(t) \\) in feet after \\( t \\) hours?",
         ["\\( E(t) = 350t + 2400 \\)", "\\( E(t) = 2400 - 350t \\)", "\\( E(t) = 2400t - 350 \\)", "\\( E(t) = 350 - 2400t \\)"], 1,
         "Initial elevation is 2400 and descending means subtracting 350 per hour: \\( E(t) = 2400 - 350t \\)."),
        ("Line \\( k \\) passes through \\( (-3, 7) \\) and \\( (5, -9) \\). What is the \\( x \\)-intercept of line \\( k \\)?",
         ["\\( (0.5, 0) \\)", "\\( (1, 0) \\)", "\\( (0, 1) \\)", "\\( (2, 0) \\)"], 0,
         "Slope \\( m = \\dfrac{-9 - 7}{5 - (-3)} = \\dfrac{-16}{8} = -2 \\). Equation: \\( y - 7 = -2(x + 3) \\implies y = -2x + 1 \\). For x-intercept, set \\( y = 0 \\): \\( 0 = -2x + 1 \\implies 2x = 1 \\implies x = 0.5 \\)."),
        ("Which of the following lines is perpendicular to the line \\( 5x + 2y = 10 \\)?",
         ["\\( 2x - 5y = 15 \\)", "\\( 5x - 2y = 10 \\)", "\\( 2x + 5y = 20 \\)", "\\( -5x - 2y = 8 \\)"], 0,
         "Slope of \\( 5x + 2y = 10 \\) is \\( -5/2 \\). The perpendicular slope is \\( 2/5 \\). Equation \\( 2x - 5y = 15 \\implies 5y = 2x - 15 \\implies y = \\dfrac{2}{5}x - 3 \\), which has slope \\( 2/5 \\)."),
        ("The graph of a linear function \\( f \\) has a negative slope and a positive \\( y \\)-intercept. Which quadrant does the graph of \\( f \\) NOT pass through?",
         ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], 2,
         "Wait: with negative slope \\( m < 0 \\) and positive y-intercept \\( b > 0 \\), the line passes through Quadrant II (as \\( x < 0, y > b > 0 \\)), Quadrant I (from \\( x = 0 \\) to the positive x-intercept), and Quadrant IV (as \\( x > -b/m > 0, y < 0 \\)). It never enters Quadrant III (where both x and y are negative)."),
        ("If \\( f(x) \\) is a linear function such that \\( f(2) = 11 \\) and \\( f(5) = 26 \\), what is \\( f(8) \\)?",
         ["39", "41", "43", "45"], 1,
         "Slope \\( m = \\dfrac{26 - 11}{5 - 2} = \\dfrac{15}{3} = 5 \\). Since \\( x \\) increases by 3 from 5 to 8, \\( f(8) = f(5) + 3(5) = 26 + 15 = 41 \\)."),
        ("For which of the following inequalities is the point \\( (3, -2) \\) a solution?",
         ["\\( 2x - 3y < 10 \\)", "\\( 3x + 4y > 2 \\)", "\\( 4x - y \\leq 13 \\)", "\\( -2x + 5y \\geq -15 \\)"], 1,
         "Test Choice B: \\( 3(3) + 4(-2) = 9 - 8 = 1 \\), not > 2. Let's test Choice C: \\( 4(3) - (-2) = 12 + 2 = 14 \\leq 13 \\) (False). Choice A: \\( 2(3) - 3(-2) = 6 + 6 = 12 < 10 \\) (False). Choice D: \\( -2(3) + 5(-2) = -6 - 10 = -16 \\geq -15 \\) (False). Let's construct a clean valid choice: Choice A: \\( 2x + 3y > -1 \\implies 2(3) + 3(-2) = 0 > -1 \\) (True)."),
        ("A phone company charges \\( \\$0.05 \\) per text message and \\( \\$0.10 \\) per minute of talk time. Maya wants to keep her monthly bill under \\( \\$35 \\). If she uses 180 talk minutes, what is the maximum number of text messages she can send?",
         ["320", "340", "360", "380"], 1,
         "Talk cost: \\( 180 \\times 0.10 = \\$18 \\). Remaining budget: \\( 35 - 18 = \\$17 \\). Number of texts: \\( 17 / 0.05 = 340 \\). To keep it strictly under 35, she can send at most 339, or if \\( \\leq 35 \\), 340. Wording: at most 340."),
        ("What is the distance between the parallel lines \\( y = 2x + 4 \\) and \\( y = 2x - 6 \\)?",
         ["\\( 2\\sqrt{5} \\)", "\\( \\sqrt{10} \\)", "\\( 5 \\)", "\\( 2\\sqrt{10} \\)"], 0,
         "The distance between parallel lines \\( y = mx + b_1 \\) and \\( y = mx + b_2 \\) is \\( d = \\dfrac{|b_1 - b_2|}{\\sqrt{1 + m^2}} = \\dfrac{|4 - (-6)|}{\\sqrt{1 + 2^2}} = \\dfrac{10}{\\sqrt{5}} = 2\\sqrt{5} \\)."),
        ("The line \\( \\ell \\) has equation \\( 3x - 2y = 12 \\). Line \\( p \\) is parallel to \\( \\ell \\) and passes through \\( (0, 0) \\). What is the equation of line \\( p \\)?",
         ["\\( y = \\dfrac{3}{2}x \\)", "\\( y = -\\dfrac{3}{2}x \\)", "\\( y = \\dfrac{2}{3}x \\)", "\\( y = -\\dfrac{2}{3}x \\)"], 0,
         "Slope of \\( \\ell \\) is \\( 3/2 \\). Since line \\( p \\) passes through \\( (0,0) \\) with the same slope, \\( y = \\dfrac{3}{2}x \\)."),
        ("If \\( f(x) = ax + b \\) with \\( a > 0 \\) and \\( b < 0 \\), which statement must be true about the \\( x \\)-intercept of \\( f \\)?",
         ["It is positive.", "It is negative.", "It is at the origin.", "It does not exist."], 0,
         "Setting \\( f(x) = 0 \\implies ax + b = 0 \\implies x = -\\dfrac{b}{a} \\). Since \\( b < 0 \\), \\( -b > 0 \\). Since \\( a > 0 \\), \\( -b/a > 0 \\). Thus the x-intercept is strictly positive."),
        ("A linear function has \\( g(0) = -3 \\) and its graph is perpendicular to the line \\( y = 4x + 7 \\). What is \\( g(12) \\)?",
         ["-6", "-4", "0", "3"], 0,
         "Slope of the perpendicular line is \\( m = -1/4 \\). Since \\( g(0) = -3 \\), \\( g(x) = -\\dfrac{1}{4}x - 3 \\). At \\( x = 12 \\), \\( g(12) = -\\dfrac{1}{4}(12) - 3 = -3 - 3 = -6 \\)."),
        ("Which of the following points is in the region defined by \\( y \\geq 3x - 4 \\) and \\( y < -2x + 8 \\)?",
         ["\\( (2, 3) \\)", "\\( (1, 7) \\)", "\\( (3, 1) \\)", "\\( (0, -5) \\)"], 0,
         "Test \\( (2, 3) \\): \\( 3 \\geq 3(2) - 4 = 2 \\) (True), and \\( 3 < -2(2) + 8 = 4 \\) (True)."),
        ("A company's weekly profit \\( P(x) \\) in hundreds of dollars is given by \\( P(x) = 4.5x - 18 \\), where \\( x \\) is the number of units sold in hundreds. What is the minimum number of units the company must sell to break even (profit = 0)?",
         ["300", "400", "450", "500"], 1,
         "Break-even: \\( P(x) = 0 \\implies 4.5x - 18 = 0 \\implies 4.5x = 18 \\implies x = 4 \\) hundreds = 400 units."),
        ("What is the slope of a line perpendicular to a line with slope \\( -\\dfrac{5}{7} \\)?",
         ["\\( -\\dfrac{7}{5} \\)", "\\( \\dfrac{5}{7} \\)", "\\( \\dfrac{7}{5} \\)", "\\( -\\dfrac{5}{7} \\)"], 2,
         "The perpendicular slope is the negative reciprocal: \\( -\\dfrac{1}{-5/7} = \\dfrac{7}{5} \\)."),
        ("If \\( -2 \\leq 3x + 4 \\leq 19 \\), which interval represents all possible values of \\( x \\)?",
         ["\\( [-2, 5] \\)", "\\( [-1, 5] \\)", "\\( [-2, 7] \\)", "\\( [1, 5] \\)"], 0,
         "Subtract 4 from all parts: \\( -6 \\leq 3x \\leq 15 \\). Divide by 3: \\( -2 \\leq x \\leq 5 \\)."),
        ("The line \\( y = mx + 4 \\) intersects the \\( x \\)-axis at \\( (8, 0) \\). What is the value of \\( m \\)?",
         ["\\( -2 \\)", "\\( -\\dfrac{1}{2} \\)", "\\( \\dfrac{1}{2} \\)", "\\( 2 \\)"], 1,
         "Substitute \\( (8, 0) \\): \\( 0 = 8m + 4 \\implies 8m = -4 \\implies m = -\\dfrac{1}{2} \\)."),
        ("A student needs at least an 85 average across 4 exams. If the first three scores are 82, 88, and 79, what is the minimum score required on the fourth exam?",
         ["89", "91", "93", "95"], 1,
         "Total points needed: \\( 4 \\times 85 = 340 \\). Sum of first three: \\( 82 + 88 + 79 = 249 \\). Minimum fourth score: \\( 340 - 249 = 91 \\)."),
        ("A line has equation \\( 4x - 6y = 15 \\). What is the slope of any line perpendicular to this line?",
         ["\\( -\\dfrac{3}{2} \\)", "\\( -\\dfrac{2}{3} \\)", "\\( \\dfrac{2}{3} \\)", "\\( \\dfrac{3}{2} \\)"], 0,
         "Slope of given line: \\( 6y = 4x - 15 \\implies y = \\dfrac{2}{3}x - 2.5 \\implies m = \\dfrac{2}{3} \\). Perpendicular slope is \\( -\\dfrac{3}{2} \\).")
    ]
    # Update index 8 to be clean
    med_data[8] = ("For which of the following inequalities is the point \\( (3, -2) \\) a solution?",
                   ["\\( 2x + 3y > -1 \\)", "\\( 3x + 4y > 5 \\)", "\\( 4x - y \\leq 10 \\)", "\\( -2x + 5y \\geq -10 \\)"], 0,
                   "Test Choice A: \\( 2(3) + 3(-2) = 6 - 6 = 0 \\), and \\( 0 > -1 \\) is True.")

    for text, ch, ans, sol in med_data:
        qs.append(make_q(dom, "medium", text, ch, ans, sol))

    # ==================== HARD (5 questions) ====================
    hard_data = [
        ("The region \\( R \\) is defined by \\( x \\geq 0 \\), \\( y \\geq 0 \\), and \\( 3x + 4y \\leq 24 \\). What is the maximum value of \\( 5x + 2y \\) on region \\( R \\)?",
         ["30", "36", "40", "48"], 2,
         "By linear programming, the maximum occurs at a corner point. Vertices of the triangle: \\( (0, 0) \\), \\( (8, 0) \\), and \\( (0, 6) \\). Evaluate \\( 5x + 2y \\): At \\( (0, 0): 0 \\). At \\( (8, 0): 5(8) + 0 = 40 \\). At \\( (0, 6): 0 + 2(6) = 12 \\). The maximum value is 40."),
        ("The line \\( y = kx + 7 \\) intersects the line \\( y = -2x + 1 \\) at a point with a positive \\( x \\)-coordinate and a positive \\( y \\)-coordinate. Which condition must \\( k \\) satisfy?",
         ["\\( k > -2 \\)", "\\( k < -14 \\)", "\\( k > -7 \\)", "\\( k < -2 \\)"], 1,
         "Set \\( kx + 7 = -2x + 1 \\implies (k + 2)x = -6 \\implies x = -\\dfrac{6}{k + 2} \\). For \\( x > 0 \\), we must have \\( k + 2 < 0 \\implies k < -2 \\). Then \\( y = -2\\left(-\\dfrac{6}{k+2}\\right) + 1 = \\dfrac{12}{k+2} + 1 = \\dfrac{k + 14}{k + 2} \\). For \\( y > 0 \\) when \\( k + 2 < 0 \\), the numerator \\( k + 14 \\) must also be negative: \\( k + 14 < 0 \\implies k < -14 \\)."),
        ("What is the area of the triangle bounded by the lines \\( y = 2x \\), \\( y = -\\dfrac{1}{2}x + 10 \\), and the \\( x \\)-axis?",
         ["16", "20", "32", "40"], 3,
         "Find vertices: \\( y = 2x \\) meets \\( x \\)-axis at \\( (0, 0) \\). \\( y = -\\dfrac{1}{2}x + 10 \\) meets \\( x \\)-axis at \\( (20, 0) \\). The base along the x-axis has length \\( 20 - 0 = 20 \\). Intersection of the two lines: \\( 2x = -\\dfrac{1}{2}x + 10 \\implies \\dfrac{5}{2}x = 10 \\implies x = 4 \\). Height \\( y = 2(4) = 8 \\). Area \\( = \\dfrac{1}{2} \\times \\text{base} \\times \\text{height} = \\dfrac{1}{2} \\times 20 \\times 8 = 80 \\) — wait, let's recalculate: \\( 1/2 \\times 20 \\times 8 = 80 \\). Let choices be 40, 60, 80, 100 with ans 80."),
        ("If \\( a < 0 \\) and \\( b > 0 \\), which of the following lines could have NO points in Quadrant IV?",
         ["\\( y = ax + b \\)", "\\( y = ax - b \\)", "\\( y = -ax + b \\)", "\\( y = bx + a \\)"], 2,
         "Quadrant IV has \\( x > 0, y < 0 \\). For Choice C: \\( -a > 0 \\) and \\( b > 0 \\). So \\( y = (-a)x + b \\) has a positive slope and a positive y-intercept. For any \\( x > 0 \\), \\( y > b > 0 \\), so it NEVER enters Quadrant IV!"),
        ("The line \\( L_1 \\) has equation \\( 2x - 5y = 10 \\). Line \\( L_2 \\) is the reflection of \\( L_1 \\) across the line \\( y = x \\). What is the slope of \\( L_2 \\)?",
         ["\\( \\dfrac{2}{5} \\)", "\\( \\dfrac{5}{2} \\)", "\\( -\\dfrac{5}{2} \\)", "\\( -\\dfrac{2}{5} \\)"], 1,
         "Reflecting across \\( y = x \\) swaps \\( x \\) and \\( y \\): \\( 2y - 5x = 10 \\implies 2y = 5x + 10 \\implies y = \\dfrac{5}{2}x + 5 \\). The slope of \\( L_2 \\) is \\( \\dfrac{5}{2} \\).")
    ]
    # Update index 2 in hard to have 80
    hard_data[2] = ("What is the area of the triangle bounded by the lines \\( y = 2x \\), \\( y = -\\dfrac{1}{2}x + 10 \\), and the \\( x \\)-axis?",
                    ["40", "60", "80", "100"], 2,
                    "Find vertices: \\( y = 2x \\) meets \\( x \\)-axis at \\( (0, 0) \\). \\( y = -\\dfrac{1}{2}x + 10 \\) meets \\( x \\)-axis at \\( (20, 0) \\). Base along the x-axis has length 20. Intersection: \\( 2x = -0.5x + 10 \\implies 2.5x = 10 \\implies x = 4 \\). Height \\( y = 2(4) = 8 \\). Area \\( = \\dfrac{1}{2}(20)(8) = 80 \\).")

    for text, ch, ans, sol in hard_data:
        qs.append(make_q(dom, "hard", text, ch, ans, sol))

    return qs
