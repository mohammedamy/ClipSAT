const fs = require('fs');
const path = require('path');

const satPath = path.join(__dirname, '../bank-data/sat.json');
const sat = JSON.parse(fs.readFileSync(satPath, 'utf8'));

// Replacement questions for Linear Functions & Linear Inequalities (Chapter 2, indices 251..294)
// Replacing redundant clones of f(g(x)), system of inequalities, and line x-intercepts
const replacements = {
  251: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A rideshare service models the total fare \\( C(m) \\), in dollars, for a trip of \\( m \\) minutes as \\( C(m) = 3.50 + 1.25m \\). Which of the following is the best interpretation of the number \\( 1.25 \\) in this context?",
    choices: [
      "The base pickup fee for the ride",
      "The total cost of a trip that lasts 3.5 minutes",
      "The additional cost, in dollars, for each minute of the ride",
      "The maximum duration of a ride in minutes"
    ],
    answer: 2,
    sol: "In the linear model \\( C(m) = 3.50 + 1.25m \\), \\( 1.25 \\) is the slope (rate of change), which represents the additional fare charged per minute."
  },
  252: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A municipal water reservoir's water depth \\( H(d) \\), in feet, is modeled by \\( H(d) = 320 - 4.5d \\), where \\( d \\) is the number of consecutive days of drought. What does the value \\( 320 \\) represent in this model?",
    choices: [
      "The depth of the water at the start of the drought period",
      "The rate at which the water depth decreases per day",
      "The number of days until the reservoir is completely empty",
      "The minimum allowable water depth in the reservoir"
    ],
    answer: 0,
    sol: "When \\( d = 0 \\), \\( H(0) = 320 \\). The \\( y \\)-intercept represents the initial water depth before the drought begins."
  },
  254: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A high-speed train travels along a straight track at a constant rate of \\( 90 \\) kilometers per hour. What is the train's speed in meters per second?",
    choices: ["20", "25", "30", "35"],
    answer: 1,
    sprAnswer: "25",
    ans: "25",
    sol: "\\[ 90 \\text{ km/h} = 90 \\times \\frac{1000 \\text{ m}}{3600 \\text{ s}} = 90 \\times \\frac{5}{18} = 25 \\text{ m/s} \\]"
  },
  255: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A laboratory purchased diagnostic equipment for \\( \\$24,000 \\). The value \\( V(t) \\) of the equipment depreciates linearly over time according to \\( V(t) = 24,000 - 1,800t \\), where \\( t \\) is the number of years since purchase. What is the value of the equipment \\( 5 \\) years after purchase?",
    choices: [
      "\\$15,000",
      "\\$16,800",
      "\\$13,200",
      "\\$9,000"
    ],
    answer: 0,
    sol: "\\[ V(5) = 24,000 - 1,800(5) = 24,000 - 9,000 = 15,000 \\]"
  },
  260: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, line \\( L_1 \\) has the equation \\( 3x - 4y = 12 \\). Line \\( L_2 \\) is perpendicular to \\( L_1 \\) and passes through the point \\( (6, -1) \\). What is the \\( y \\)-intercept of line \\( L_2 \\)?",
    choices: ["5", "6", "7", "8"],
    answer: 2,
    sprAnswer: "7",
    ans: "7",
    sol: "Rewrite \\( L_1 \\): \\( y = \\frac{3}{4}x - 3 \\). The slope of \\( L_1 \\) is \\( \\frac{3}{4} \\), so the perpendicular slope of \\( L_2 \\) is \\( -\\frac{4}{3} \\). Using point-slope form with \\( (6,-1) \\): \\( y - (-1) = -\\frac{4}{3}(x - 6) \\Rightarrow y = -\\frac{4}{3}x + 8 - 1 = -\\frac{4}{3}x + 7 \\). The \\( y \\)-intercept is \\( 7 \\)."
  },
  261: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "The graph of the linear equation \\( y = (k - 3)x + 7 \\) is parallel to the graph of \\( 8x - 2y = 15 \\) in the \\( xy \\)-plane, where \\( k \\) is a constant. What is the value of \\( k \\)?",
    choices: ["4", "5", "7", "11"],
    answer: 2,
    sol: "Rewrite \\( 8x - 2y = 15 \\) as \\( y = 4x - \\frac{15}{2} \\). Parallel lines have equal slopes, so \\( k - 3 = 4 \\Rightarrow k = 7 \\)."
  },
  262: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, the lines \\( ax + 5y = 10 \\) and \\( 3x - 2y = 8 \\) are perpendicular, where \\( a \\) is a constant. What is the value of \\( a \\)?",
    choices: ["10/3", "3/10", "-10/3", "-3/10"],
    answer: 0,
    sprAnswer: "10/3",
    ans: "10/3",
    sol: "Slopes are \\( m_1 = -\\frac{a}{5} \\) and \\( m_2 = \\frac{3}{2} \\). Since the lines are perpendicular: \\( \\left(-\\frac{a}{5}\\right)\\left(\\frac{3}{2}\\right) = -1 \\Rightarrow -\\frac{3a}{10} = -1 \\Rightarrow a = \\frac{10}{3} \\)."
  },
  263: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "Line \\( k \\) passes through \\( (1, -1) \\) and \\( (3, 3) \\). Line \\( p \\) is perpendicular to line \\( k \\) and passes through the point \\( (8, 3) \\). At what point do lines \\( k \\) and \\( p \\) intersect?",
    choices: [
      "\\( (3, 3) \\)",
      "\\( (4, 5) \\)",
      "\\( (5, 7) \\)",
      "\\( (2, 1) \\)"
    ],
    answer: 1,
    sol: "Slope of \\( k \\) is \\( \\frac{3 - (-1)}{3 - 1} = \\frac{4}{2} = 2 \\). Equation of \\( k \\): \\( y - 3 = 2(x - 3) \\Rightarrow y = 2x - 3 \\). Line \\( p \\) has slope \\( -\\frac{1}{2} \\) and passes through \\( (8, 3) \\): \\( y - 3 = -\\frac{1}{2}(x - 8) \\Rightarrow y = -\\frac{1}{2}x + 7 \\). Setting them equal: \\( 2x - 3 = -\\frac{1}{2}x + 7 \\Rightarrow \\frac{5}{2}x = 10 \\Rightarrow x = 4 \\). Then \\( y = 2(4) - 3 = 5 \\). The intersection is \\( (4, 5) \\)."
  },
  264: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "The table below shows selected values for a linear function \\( g \\). What is the value of \\( g(20) \\)?",
    figure: {
      type: "table",
      headers: ["x", "g(x)"],
      rows: [
        [2, 13],
        [5, 22],
        [8, 31],
        [11, 40]
      ]
    },
    choices: ["60", "64", "67", "70"],
    answer: 2,
    sprAnswer: "67",
    ans: "67",
    sol: "The slope is \\( m = \\frac{22 - 13}{5 - 2} = \\frac{9}{3} = 3 \\). Using point \\( (2, 13) \\): \\( g(x) = 3(x - 2) + 13 = 3x + 7 \\). Thus, \\( g(20) = 3(20) + 7 = 67 \\)."
  },
  265: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "At sea level (altitude \\( 0 \\) km), the temperature is \\( 20^\\circ\\text{C} \\). As altitude increases, temperature decreases at a constant linear rate of \\( 6.5^\\circ\\text{C} \\) per kilometer. Which equation models the temperature \\( T \\), in degrees Celsius, at an altitude of \\( h \\) kilometers above sea level?",
    choices: [
      "\\( T = 20 + 6.5h \\)",
      "\\( T = 20 - 6.5h \\)",
      "\\( T = 6.5 - 20h \\)",
      "\\( T = -6.5 + 20h \\)"
    ],
    answer: 1,
    sol: "The initial temperature at \\( h = 0 \\) is \\( 20 \\), and it decreases at a rate of \\( 6.5 \\) per kilometer, giving \\( T = 20 - 6.5h \\)."
  },
  266: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "For a linear function \\( f \\), \\( f(4) - f(1) = 15 \\) and \\( f(2) = 17 \\). What is the value of \\( f(0) \\)?",
    choices: ["5", "7", "9", "12"],
    answer: 1,
    sprAnswer: "7",
    ans: "7",
    sol: "For a linear function \\( f(x) = mx + b \\), the rate of change is \\( m = \\frac{f(4) - f(1)}{4 - 1} = \\frac{15}{3} = 5 \\). Given \\( f(2) = 17 \\): \\( 5(2) + b = 17 \\Rightarrow 10 + b = 17 \\Rightarrow b = 7 \\). Thus, \\( f(0) = b = 7 \\)."
  },
  267: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, the line \\( 4x + 3y = 24 \\) intersects the \\( x \\)-axis at point \\( A \\) and the \\( y \\)-axis at point \\( B \\). What is the length of segment \\( AB \\)?",
    choices: ["8", "10", "12", "14"],
    answer: 1,
    sprAnswer: "10",
    ans: "10",
    sol: "Setting \\( y = 0 \\): \\( 4x = 24 \\Rightarrow x = 6 \\), so \\( A = (6, 0) \\). Setting \\( x = 0 \\): \\( 3y = 24 \\Rightarrow y = 8 \\), so \\( B = (0, 8) \\). By the Pythagorean theorem, the distance is \\( \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10 \\)."
  },
  268: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, what is the area of the triangular region bounded by the lines \\( y = \\frac{1}{2}x \\), \\( y = -2x + 10 \\), and the \\( x \\)-axis?",
    figure: {
      type: "fn",
      xrange: [-1, 7],
      yrange: [-1, 5],
      fns: [
        { fn: "0.5*x", label: "y = 0.5x", color: "#1E3A6E" },
        { fn: "-2*x + 10", label: "y = -2x + 10", color: "#C8902A" }
      ],
      points: [
        { x: 0, y: 0, label: "(0,0)", color: "#1E3A6E" },
        { x: 5, y: 0, label: "(5,0)", color: "#C8902A" },
        { x: 4, y: 2, label: "(4,2)", color: "#0e9f8f" }
      ],
      w: 280,
      h: 210
    },
    choices: ["4", "5", "6", "10"],
    answer: 1,
    sprAnswer: "5",
    ans: "5",
    sol: "The line \\( y = \\frac{1}{2}x \\) crosses the \\( x \\)-axis at \\( (0,0) \\). The line \\( y = -2x + 10 \\) crosses the \\( x \\)-axis at \\( (5,0) \\). The base along the \\( x \\)-axis has length \\( 5 - 0 = 5 \\). Finding the intersection: \\( \\frac{1}{2}x = -2x + 10 \\Rightarrow 2.5x = 10 \\Rightarrow x = 4 \\), so \\( y = 2 \\). The height is \\( 2 \\). Area \\( = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times 5 \\times 2 = 5 \\)."
  },
  269: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, the line \\( y = -\\frac{3}{4}x + 6 \\) intersects the \\( x \\)-axis at point \\( P \\) and the \\( y \\)-axis at point \\( Q \\). What are the coordinates of the midpoint of segment \\( PQ \\)?",
    choices: [
      "\\( (3, 4) \\)",
      "\\( (4, 3) \\)",
      "\\( (4, 4) \\)",
      "\\( (8, 6) \\)"
    ],
    answer: 1,
    sol: "At \\( y = 0 \\): \\( 0 = -\\frac{3}{4}x + 6 \\Rightarrow \\frac{3}{4}x = 6 \\Rightarrow x = 8 \\), so \\( P = (8, 0) \\). At \\( x = 0 \\): \\( y = 6 \\), so \\( Q = (0, 6) \\). The midpoint is \\( \\left(\\frac{8 + 0}{2}, \\frac{0 + 6}{2}\\right) = (4, 3) \\)."
  },
  271: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, what is the area of the region in the first quadrant bounded by the line \\( 3x + 2y = 12 \\) and the coordinate axes?",
    choices: ["6", "10", "12", "24"],
    answer: 2,
    sol: "The \\( x \\)-intercept is \\( (4, 0) \\) and the \\( y \\)-intercept is \\( (0, 6) \\). The region is a right triangle with legs of length \\( 4 \\) and \\( 6 \\). Area \\( = \\frac{1}{2}(4)(6) = 12 \\)."
  },
  272: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A school drama club sells student tickets for \\( \\$6 \\) each and adult tickets for \\( \\$10 \\) each. The auditorium can seat at most \\( 250 \\) people, and the club must raise at least \\( \\$1,800 \\) from ticket sales to cover production costs. If \\( s \\) represents the number of student tickets and \\( a \\) represents the number of adult tickets sold, which system of inequalities represents this situation?",
    choices: [
      "\\[ \\begin{cases} s + a \\le 250 \\\\ 6s + 10a \\ge 1800 \\end{cases} \\]",
      "\\[ \\begin{cases} s + a \\ge 250 \\\\ 6s + 10a \\le 1800 \\end{cases} \\]",
      "\\[ \\begin{cases} 6s + 10a \\le 250 \\\\ s + a \\ge 1800 \\end{cases} \\]",
      "\\[ \\begin{cases} s + a < 250 \\\\ 10s + 6a > 1800 \\end{cases} \\]"
    ],
    answer: 0,
    sol: "The total number of tickets cannot exceed 250: \\( s + a \\le 250 \\). The total revenue from tickets must be at least \\$1,800: \\( 6s + 10a \\ge 1800 \\)."
  },
  273: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A delivery van transports packages. Small boxes weigh \\( 12 \\) pounds each and large crates weigh \\( 45 \\) pounds each. The van can hold a maximum total weight of \\( 1,200 \\) pounds and must carry at least \\( 30 \\) items in total. Which of the following combinations of \\( (x, y) \\), where \\( x \\) is the number of small boxes and \\( y \\) is the number of large crates, can the van transport?",
    choices: [
      "\\( (10, 15) \\)",
      "\\( (20, 20) \\)",
      "\\( (30, 20) \\)",
      "\\( (5, 30) \\)"
    ],
    answer: 1,
    sol: "Constraints: \\( x + y \\ge 30 \\) and \\( 12x + 45y \\le 1200 \\). For \\( (20, 20) \\): \\( 20 + 20 = 40 \\ge 30 \\) (satisfied) and \\( 12(20) + 45(20) = 240 + 900 = 1140 \\le 1200 \\) (satisfied). All other options fail one of the two constraints."
  },
  274: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "Which of the following points lies in the solution set of the system of inequalities \\( y \\le 2x + 1 \\) and \\( y \\ge -x + 4 \\)?",
    choices: [
      "\\( (0, 0) \\)",
      "\\( (1, 2) \\)",
      "\\( (3, 4) \\)",
      "\\( (0, 5) \\)"
    ],
    answer: 2,
    sol: "Test \\( (3, 4) \\): \\( 4 \\le 2(3) + 1 = 7 \\) (True); \\( 4 \\ge -(3) + 4 = 1 \\) (True). Both conditions hold, so \\( (3, 4) \\) is in the solution set."
  },
  275: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, which quadrant contains NO points that satisfy the inequality \\( y < -\\frac{2}{3}x - 4 \\) and \\( y > 2x + 6 \\)?",
    choices: [
      "Quadrant I",
      "Quadrant II",
      "Quadrant III",
      "Quadrant IV"
    ],
    answer: 0,
    sol: "Notice that for any point in Quadrant I, both \\( x > 0 \\) and \\( y > 0 \\). If \\( x > 0 \\), then \\( -\\frac{2}{3}x - 4 < -4 \\). For the first inequality to hold, \\( y < -4 \\), which contradicts \\( y > 0 \\). Therefore, no solutions exist in Quadrant I."
  },
  276: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "What is the equation of the perpendicular bisector of the line segment connecting \\( (2, 7) \\) and \\( (6, -1) \\) in the \\( xy \\)-plane?",
    choices: [
      "\\( y = \\frac{1}{2}x + 1 \\)",
      "\\( y = -2x + 11 \\)",
      "\\( y = 2x - 5 \\)",
      "\\( y = -\\frac{1}{2}x + 5 \\)"
    ],
    answer: 0,
    sol: "Midpoint: \\( \\left(\\frac{2+6}{2}, \\frac{7+(-1)}{2}\\right) = (4, 3) \\). Slope of segment: \\( \\frac{-1 - 7}{6 - 2} = \\frac{-8}{4} = -2 \\). Perpendicular slope: \\( \\frac{1}{2} \\). Equation: \\( y - 3 = \\frac{1}{2}(x - 4) \\Rightarrow y = \\frac{1}{2}x + 1 \\)."
  },
  277: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, the points \\( (1, 3) \\) and \\( (7, 11) \\) are the endpoints of a diameter of a circle. What is the equation of the tangent line to the circle at the point \\( (7, 11) \\)?",
    choices: [
      "\\( 3x + 4y = 65 \\)",
      "\\( 4x + 3y = 61 \\)",
      "\\( 3x - 4y = -23 \\)",
      "\\( 4x - 3y = -5 \\)"
    ],
    answer: 0,
    sol: "Center is \\( \\left(\\frac{1+7}{2}, \\frac{3+11}{2}\\right) = (4, 7) \\). Slope of radial segment from center to \\( (7, 11) \\) is \\( \\frac{11 - 7}{7 - 4} = \\frac{4}{3} \\). The tangent line is perpendicular to the radius, so its slope is \\( -\\frac{3}{4} \\). Using point \\( (7, 11) \\): \\( y - 11 = -\\frac{3}{4}(x - 7) \\Rightarrow 4y - 44 = -3x + 21 \\Rightarrow 3x + 4y = 65 \\)."
  },
  278: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "For what value of the constant \\( c \\) does the system of equations \\( 2x - 5y = 8 \\) and \\( 6x - 15y = c \\) have infinitely many solutions?",
    choices: ["16", "20", "24", "28"],
    answer: 2,
    sprAnswer: "24",
    ans: "24",
    sol: "Multiplying the first equation by \\( 3 \\) gives \\( 6x - 15y = 24 \\). For the system to have infinitely many solutions, the two equations must be identical, so \\( c = 24 \\)."
  },
  279: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, the graphs of \\( y = 2x + b \\) and \\( y = -3x + 10 \\) intersect at the point \\( (2, 4) \\). What is the value of \\( b \\)?",
    choices: ["-2", "0", "2", "4"],
    answer: 1,
    sprAnswer: "0",
    ans: "0",
    sol: "Substituting \\( (2, 4) \\) into \\( y = 2x + b \\): \\( 4 = 2(2) + b \\Rightarrow 4 = 4 + b \\Rightarrow b = 0 \\)."
  },
  280: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "Two linear functions \\( f \\) and \\( g \\) satisfy \\( f(x) + g(x) = 6x + 2 \\) and \\( f(x) - g(x) = 2x - 8 \\) for all real numbers \\( x \\). What is the \\( x \\)-intercept of the graph of \\( y = f(x) \\)?",
    choices: [
      "\\( \\frac{1}{2} \\)",
      "\\( \\frac{3}{4} \\)",
      "\\( 1 \\)",
      "\\( \\frac{4}{3} \\)"
    ],
    answer: 1,
    sol: "Add the two equations: \\( 2f(x) = 8x - 6 \\Rightarrow f(x) = 4x - 3 \\). To find the \\( x \\)-intercept, set \\( f(x) = 0 \\): \\( 4x - 3 = 0 \\Rightarrow x = \\frac{3}{4} \\)."
  },
  281: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A researcher models exam scores with the line of best fit \\( y = 5.2x + 58 \\), where \\( x \\) is the number of hours studied and \\( y \\) is the predicted score. A student who studied \\( 5 \\) hours earned a score of \\( 88 \\). What is the residual (actual score minus predicted score) for this student?",
    choices: ["+4", "-4", "+6", "+8"],
    answer: 0,
    sol: "Predicted score: \\( y = 5.2(5) + 58 = 26 + 58 = 84 \\). Residual \\( = \\text{actual} - \\text{predicted} = 88 - 84 = +4 \\)."
  },
  282: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "The scatterplot below shows the relationship between tree age in years, \\( x \\), and trunk diameter in inches, \\( y \\), with line of best fit \\( y = 0.45x + 3.2 \\). Which of the following is the best interpretation of \\( 0.45 \\) in this context?",
    choices: [
      "The predicted increase in trunk diameter, in inches, for each additional year of tree age",
      "The initial trunk diameter of a newly planted tree",
      "The total trunk diameter after 10 years",
      "The age of the tree when its trunk diameter reaches 10 inches"
    ],
    answer: 0,
    sol: "In the linear regression equation \\( y = 0.45x + 3.2 \\), the slope \\( 0.45 \\) represents the estimated increase in \\( y \\) (trunk diameter in inches) for each 1-unit increase in \\( x \\) (tree age in years)."
  },
  283: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A linear model predicts that \\( y = 3.8x + 14.5 \\). By how much does the predicted value of \\( y \\) increase when \\( x \\) increases by \\( 5 \\)?",
    choices: ["14.5", "18.0", "19.0", "22.5"],
    answer: 2,
    sprAnswer: "19",
    ans: "19",
    sol: "For a linear function \\( y = mx + b \\), \\( \\Delta y = m \\cdot \\Delta x = 3.8 \\times 5 = 19 \\)."
  },
  284: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "The graph of \\( f(x) = 3x - 5 \\) in the \\( xy \\)-plane is shifted upward by \\( 4 \\) units and to the right by \\( 2 \\) units to produce the graph of \\( g(x) \\). Which equation defines \\( g(x) \\)?",
    choices: [
      "\\( g(x) = 3x - 7 \\)",
      "\\( g(x) = 3x - 3 \\)",
      "\\( g(x) = 3x + 1 \\)",
      "\\( g(x) = 3x - 11 \\)"
    ],
    answer: 0,
    sol: "Shift up 4: \\( f(x) + 4 = 3x - 1 \\). Shift right 2: replace \\( x \\) with \\( x - 2 \\): \\( 3(x - 2) - 1 = 3x - 6 - 1 = 3x - 7 \\)."
  },
  285: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "For the linear function \\( f(x) = ax + b \\), the graph of \\( y = f(x) \\) has a \\( y \\)-intercept of \\( (0, 3) \\), and the graph of \\( y = f(x + 2) \\) has a \\( y \\)-intercept of \\( (0, 11) \\). What is the value of the constant \\( a \\)?",
    choices: ["2", "3", "4", "5"],
    answer: 2,
    sprAnswer: "4",
    ans: "4",
    sol: "Since the \\( y \\)-intercept of \\( f \\) is 3, \\( b = 3 \\). Now \\( f(x + 2) = a(x + 2) + 3 = ax + 2a + 3 \\). The \\( y \\)-intercept of \\( f(x+2) \\) is \\( 2a + 3 \\). Given \\( 2a + 3 = 11 \\Rightarrow 2a = 8 \\Rightarrow a = 4 \\)."
  },
  286: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "If \\( f(x) = 3x + b \\) and \\( f(f(1)) = 25 \\), where \\( b \\) is a constant, what is the value of \\( b \\)?",
    choices: ["2", "3", "4", "5"],
    answer: 2,
    sprAnswer: "4",
    ans: "4",
    sol: "\\( f(1) = 3(1) + b = 3 + b \\). Then \\( f(f(1)) = f(3 + b) = 3(3 + b) + b = 9 + 3b + b = 9 + 4b \\). Setting \\( 9 + 4b = 25 \\Rightarrow 4b = 16 \\Rightarrow b = 4 \\)."
  },
  287: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A commercial electrician charges a initial service fee of \\( \\$60 \\) plus \\( \\$70 \\) per hour of labor. A competing firm charges a \\( \\$120 \\) service fee plus \\( \\$50 \\) per hour of labor. For how many hours of work would the total charge be the same for both firms?",
    choices: ["2", "3", "4", "5"],
    answer: 1,
    sprAnswer: "3",
    ans: "3",
    sol: "Set the two cost equations equal: \\( 60 + 70h = 120 + 50h \\Rightarrow 20h = 60 \\Rightarrow h = 3 \\) hours."
  },
  288: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "The graph of the linear function \\( h(x) \\) in the \\( xy \\)-plane has an \\( x \\)-intercept at \\( (4, 0) \\) and a \\( y \\)-intercept at \\( (0, -6) \\). What is the value of \\( h(10) \\)?",
    choices: ["7", "8", "9", "10"],
    answer: 2,
    sprAnswer: "9",
    ans: "9",
    sol: "Slope: \\( m = \\frac{0 - (-6)}{4 - 0} = \\frac{6}{4} = \\frac{3}{2} \\). Equation: \\( h(x) = \\frac{3}{2}x - 6 \\). Thus, \\( h(10) = \\frac{3}{2}(10) - 6 = 15 - 6 = 9 \\)."
  },
  290: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "A line in the \\( xy \\)-plane has a slope of \\( -\\frac{5}{2} \\) and passes through the points \\( (c, 7) \\) and \\( (c + 4, d) \\), where \\( c \\) and \\( d \\) are constants. What is the value of \\( d \\)?",
    choices: ["-5", "-3", "2", "17"],
    answer: 1,
    sprAnswer: "-3",
    ans: "-3",
    sol: "Slope \\( = \\frac{d - 7}{(c + 4) - c} = \\frac{d - 7}{4} = -\\frac{5}{2} \\). Cross-multiplying: \\( 2(d - 7) = -20 \\Rightarrow 2d - 14 = -20 \\Rightarrow 2d = -6 \\Rightarrow d = -3 \\)."
  },
  291: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, line \\( \\ell \\) is defined by \\( y = mx + b \\), where \\( m > 0 \\) and \\( b < 0 \\). Which quadrant does line \\( \\ell \\) NOT pass through?",
    choices: [
      "Quadrant I",
      "Quadrant II",
      "Quadrant III",
      "Quadrant IV"
    ],
    answer: 1,
    sol: "In Quadrant II, \\( x < 0 \\) and \\( y > 0 \\). However, if \\( x < 0 \\) and \\( m > 0 \\), then \\( mx < 0 \\). Since \\( b < 0 \\), \\( y = mx + b < 0 \\) for all \\( x < 0 \\). Therefore, \\( y \\) is never positive when \\( x \\) is negative, meaning the line never enters Quadrant II."
  },
  292: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, the line passing through \\( (k, 2) \\) and \\( (4, 8) \\) is perpendicular to the line passing through \\( (1, -3) \\) and \\( (5, 1) \\). What is the value of \\( k \\)?",
    choices: ["8", "9", "10", "12"],
    answer: 2,
    sprAnswer: "10",
    ans: "10",
    sol: "Slope of the second line: \\( m_2 = \\frac{1 - (-3)}{5 - 1} = \\frac{4}{4} = 1 \\). Since the lines are perpendicular, \\( m_1 = -1 \\). Using the first line: \\( \\frac{8 - 2}{4 - k} = \\frac{6}{4 - k} = -1 \\Rightarrow 6 = -(4 - k) \\Rightarrow 6 = -4 + k \\Rightarrow k = 10 \\)."
  },
  293: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "In the \\( xy \\)-plane, the line \\( y = mx + 4 \\) intersects the line \\( y = 2x - 6 \\) at a point on the \\( x \\)-axis. What is the value of \\( m \\)?",
    choices: [
      "\\( -\\frac{4}{3} \\)",
      "\\( -\\frac{3}{4} \\)",
      "\\( \\frac{4}{3} \\)",
      "\\( 2 \\)"
    ],
    answer: 0,
    sol: "Find the \\( x \\)-intercept of \\( y = 2x - 6 \\): \\( 0 = 2x - 6 \\Rightarrow 2x = 6 \\Rightarrow x = 3 \\). The intersection point is \\( (3, 0) \\). Since \\( (3, 0) \\) lies on \\( y = mx + 4 \\): \\( 0 = m(3) + 4 \\Rightarrow 3m = -4 \\Rightarrow m = -\\frac{4}{3} \\)."
  },
  294: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "hard",
    text: "The system of inequalities \\( y \\ge 2x - 3 \\) and \\( y \\le -\\frac{1}{2}x + 7 \\) contains the point \\( (k, 5) \\) in its solution set. What is the maximum possible integer value of \\( k \\)?",
    choices: ["2", "3", "4", "5"],
    answer: 2,
    sprAnswer: "4",
    ans: "4",
    sol: "Substitute \\( y = 5 \\) into both inequalities: \\( 5 \\ge 2k - 3 \\Rightarrow 2k \\le 8 \\Rightarrow k \\le 4 \\). And \\( 5 \\le -\\frac{1}{2}k + 7 \\Rightarrow \\frac{1}{2}k \\le 2 \\Rightarrow k \\le 4 \\). Therefore, \\( k \\le 4 \\), and the maximum integer value is \\( 4 \\)."
  }
};

let count = 0;
for (const [idx, item] of Object.entries(replacements)) {
  const i = parseInt(idx, 10);
  sat.pool[i] = item;
  count++;
}

fs.writeFileSync(satPath, JSON.stringify(sat, null, 2), 'utf8');
console.log(`Successfully replaced ${count} redundant questions in bank-data/sat.json!`);
