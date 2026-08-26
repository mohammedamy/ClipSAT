# -*- coding: utf-8 -*-
"""50 new MCQs for Qudrat ch.3 — Algebra Essentials. Distinct from the
existing 42 free-response questions (different numbers/forms throughout)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=303)
m = b.mcq

# --- Evaluating expressions (4) ---
m("Evaluating expressions", r"If $x=6$, evaluate $4x-9$.",
  15, [33, 24, -15],
  r"$4(6)-9=24-9=15$.")
m("Evaluating expressions", r"If $a=-2$ and $b=3$, evaluate $a^2+2ab$.",
  -8, [8, -4, -16],
  r"$a^2=4$, $2ab=2(-2)(3)=-12$. $4+(-12)=-8$.")
m("Evaluating expressions", r"If $x=5$ and $y=-1$, evaluate $(x+y)^2-xy$.",
  21, [11, 16, -5],
  r"$(x+y)^2=4^2=16$; $xy=-5$. $16-(-5)=21$.")
m("Evaluating expressions", r"If $p=3$, evaluate $2p^3-5p$.",
  39, [49, 33, 69],
  r"$2(27)-15=54-15=39$.")

# --- Solving linear equations (5) ---
m("Solving linear equations", r"Solve $\dfrac{x}{3}+4=9$.",
  "$x=15$", ["$x=27$", "$x=39$", "$x=5$"],
  r"$\dfrac{x}{3}=5\Rightarrow x=15$.")
m("Solving linear equations", r"Solve $4(x+2)=3x+15$.",
  "$x=7$", ["$x=23$", "$x=-7$", "$x=1$"],
  r"$4x+8=3x+15\Rightarrow x=7$.")
m("Solving linear equations", r"Solve $0.5x-3=7$.",
  "$x=20$", ["$x=14$", "$x=8$", "$x=-20$"],
  r"$0.5x=10\Rightarrow x=20$.")
m("Solving linear equations", r"Solve $\dfrac{2x-1}{3}=5$.",
  "$x=8$", ["$x=7$", "$x=16$", "$x=4$"],
  r"$2x-1=15\Rightarrow 2x=16\Rightarrow x=8$.")
m("Solving linear equations", r"Solve $6-2x=3x-9$.",
  "$x=3$", ["$x=-3$", "$x=1$", "$x=15$"],
  r"$15=5x\Rightarrow x=3$.")

# --- Expanding and simplifying (4) ---
m("Expanding and simplifying", r"Expand $(x+7)^2$.",
  "$x^2+14x+49$", ["$x^2+49$", "$x^2+7x+49$", "$x^2+14x+14$"],
  r"$(x+7)^2=x^2+2(7)x+49=x^2+14x+49$.")
m("Expanding and simplifying", r"Expand $(x-5)^2$.",
  "$x^2-10x+25$", ["$x^2-25$", "$x^2-5x+25$", "$x^2+10x+25$"],
  r"$(x-5)^2=x^2-10x+25$.")
m("Expanding and simplifying", r"Expand $(3x-2)(3x+2)$.",
  "$9x^2-4$", ["$9x^2+4$", "$6x^2-4$", "$9x^2-12x-4$"],
  r"Difference of squares: $(3x)^2-2^2=9x^2-4$.")
m("Expanding and simplifying", r"Simplify $2(x+3)-3(x-1)$.",
  "$-x+9$", ["$5x+9$", "$-x+3$", "$x+9$"],
  r"$2x+6-3x+3=-x+9$.")

# --- Factoring (4) ---
m("Factoring", r"Factor $3x^2+12x$.",
  "$3x(x+4)$", ["$3x(x+12)$", "$x(3x+12)$", "$3(x^2+4x)$"],
  r"GCF $=3x$: $3x^2+12x=3x(x+4)$.")
m("Factoring", r"Factor $x^2-11x+30$.",
  "$(x-5)(x-6)$", ["$(x-3)(x-10)$", "$(x+5)(x+6)$", "$(x-2)(x-15)$"],
  r"Need two numbers multiplying to $30$, adding to $-11$: $-5,-6$.")
m("Factoring", r"Factor $x^2+3x-18$.",
  "$(x+6)(x-3)$", ["$(x-6)(x+3)$", "$(x+9)(x-2)$", "$(x+2)(x-9)$"],
  r"Need two numbers multiplying to $-18$, adding to $3$: $6,-3$.")
m("Factoring", r"Factor $4x^2-25$.",
  "$(2x-5)(2x+5)$", ["$(4x-5)(x+5)$", "$(2x-25)(2x+1)$", "$(2x-5)^2$"],
  r"Difference of squares: $(2x)^2-5^2=(2x-5)(2x+5)$.")

# --- Solving quadratic equations (4) ---
m("Solving quadratic equations", r"Solve $x^2-9x+18=0$.",
  "x = 3 or x = 6", ["x = -3 or x = -6", "x = 2 or x = 9", "x = 1 or x = 18"],
  r"$(x-3)(x-6)=0\Rightarrow x=3$ or $x=6$.")
m("Solving quadratic equations", r"Solve $x^2+2x-24=0$.",
  "x = -6 or x = 4", ["x = 6 or x = -4", "x = -2 or x = 12", "x = -3 or x = 8"],
  r"$(x+6)(x-4)=0\Rightarrow x=-6$ or $x=4$.")
m("Solving quadratic equations",
  r"The graph shows $y=x^2-49$. What are its roots (where the curve crosses the $x$-axis)?",
  "x = 7 or x = -7", ["x = 49", "x = 7 only", "x = -7 only"],
  r"The curve crosses the $x$-axis at $x=-7$ and $x=7$, matching $x^2-49=0$.",
  figure={"type": "plot", "fns": ["x**2-49"], "xmin": -9, "xmax": 9, "ymin": -55, "ymax": 15})
m("Solving quadratic equations", r"Solve $2x^2-8x=0$.",
  "x = 0 or x = 4", ["x = 0 or x = -4", "x = 2 or x = 4", "x = 8"],
  r"$2x(x-4)=0\Rightarrow x=0$ or $x=4$.")

# --- Systems of two equations (4) ---
m("Systems of two equations", r"Solve the system: $x+2y=8$, $x-y=2$.",
  "x = 4, y = 2", ["x = 2, y = 3", "x = 6, y = 1", "x = 8, y = 0"],
  r"Subtracting: $3y=6\Rightarrow y=2$, then $x=4$.")
m("Systems of two equations", r"Solve the system: $3x-y=7$, $x+y=5$.",
  "x = 3, y = 2", ["x = 2, y = 3", "x = 4, y = 1", "x = 1, y = 4"],
  r"Adding the equations: $4x=12\Rightarrow x=3$, then $y=2$.")
m("Systems of two equations",
  r"The graph shows two lines. What is their point of intersection?",
  "(2, 3)", ["(1, 4)", "(3, 2)", "(0, 5)"],
  r"The two lines $y=x+1$ and $y=-x+5$ cross where both are true: at $(2,3)$.",
  figure={"type": "plot", "fns": ["x+1", "-x+5"], "xmin": -1, "xmax": 6, "ymin": -2, "ymax": 8})
m("Systems of two equations", r"Solve the system: $y=2x-1$, $y=x+3$.",
  "x = 4, y = 7", ["x = 7, y = 4", "x = -4, y = -5", "x = 2, y = 3"],
  r"$2x-1=x+3\Rightarrow x=4$, then $y=4+3=7$.")

# --- Laws of exponents (4) ---
m("Laws of exponents", r"Simplify $b^7\div b^2$.",
  "$b^5$", ["$b^9$", "$b^{3.5}$", "$b^{14}$"],
  r"Subtract exponents: $b^{7-2}=b^5$.")
m("Laws of exponents", r"Simplify $(2x^3)^2$.",
  "$4x^6$", ["$2x^6$", "$4x^5$", "$2x^9$"],
  r"$(2x^3)^2=2^2x^{3\times2}=4x^6$.")
m("Laws of exponents", r"Simplify $x^0\cdot x^4$ ($x\neq0$).",
  "$x^4$", ["$x^0$", "$1$", "$x^5$"],
  r"$x^0=1$, so $x^0\cdot x^4=x^4$.")
m("Laws of exponents", r"Simplify $m^{-2}$.",
  r"$\dfrac{1}{m^2}$", [r"$-m^2$", "$m^2$", r"$-\dfrac{1}{m^2}$"],
  r"A negative exponent means reciprocal: $m^{-2}=\dfrac{1}{m^2}$.")

# --- Inequalities (5) ---
m("Inequalities",
  r"The number line shows the solution set of an inequality. Which inequality matches?",
  "$x<4$", ["$x>4$", r"$x\leq4$", r"$x\geq4$"],
  r"An open circle at $4$ with shading to the left means $x<4$.",
  figure={"type": "numberline", "min": 0, "max": 8, "marks": [{"x": 4, "open": True}], "shade": [0, 4]})
m("Inequalities",
  r"The number line shows the solution set of an inequality. Which inequality matches?",
  r"$x\geq-2$", ["$x>-2$", r"$x\leq-2$", "$x<-2$"],
  r"A closed circle at $-2$ with shading to the right means $x\geq-2$.",
  figure={"type": "numberline", "min": -6, "max": 4, "marks": [{"x": -2, "open": False}], "shade": [-2, 4]})
m("Inequalities", r"Solve $-3x+7\leq22$.",
  r"$x\geq-5$", [r"$x\leq-5$", r"$x\geq5$", r"$x\leq5$"],
  r"$-3x\leq15$; dividing by $-3$ flips the sign: $x\geq-5$.")
m("Inequalities",
  r"The number line shows the solution set of an inequality. Which inequality matches?",
  r"$x\leq1$", [r"$x\geq1$", "$x<1$", "$x>1$"],
  r"A closed circle at $1$ with shading to the left means $x\leq1$.",
  figure={"type": "numberline", "min": -4, "max": 5, "marks": [{"x": 1, "open": False}], "shade": [-4, 1]})

# --- Reading function graphs (4) ---
m("Reading function graphs", r"The graph shows a line. What is its slope?",
  "$2$", ["$-2$", r"$\dfrac{1}{2}$", "$-1$"],
  r"The line rises $2$ for every $1$ across, e.g. from $(0,-1)$ to $(1,1)$: slope $=2$.",
  figure={"type": "plot", "fns": ["2*x-1"], "xmin": -2, "xmax": 4, "ymin": -6, "ymax": 8})
m("Reading function graphs", r"What is the $y$-intercept of the line shown?",
  "$4$", ["$-4$", "$1$", "$0$"],
  r"The line crosses the $y$-axis at $(0,4)$.",
  figure={"type": "plot", "fns": ["-x+4"], "xmin": -2, "xmax": 6, "ymin": -3, "ymax": 7})
m("Reading function graphs", r"What is the equation of the line shown?",
  "$y=3x$", ["$y=x+3$", "$y=3x+1$", r"$y=\dfrac{1}{3}x$"],
  r"The line passes through the origin and $(1,3)$: slope $3$, no intercept, so $y=3x$.",
  figure={"type": "plot", "fns": ["3*x"], "xmin": -2, "xmax": 3, "ymin": -7, "ymax": 10})
m("Reading function graphs", r"Find the slope of the line through the two marked points.",
  "$2$", ["$4$", r"$\dfrac{1}{2}$", "$-2$"],
  r"Slope $=\dfrac{6-2}{3-1}=\dfrac{4}{2}=2$.",
  figure={"type": "plot", "fns": ["2*x"], "xmin": 0, "xmax": 4, "ymin": -1, "ymax": 9,
          "points": [[1, 2], [3, 6]]})

# --- Substitution into formulas (4) ---
m("Substitution into formulas", r"Given $A=\dfrac{1}{2}bh$, find $A$ when $b=10$ and $h=6$.",
  "$30$", ["$60$", "$16$", "$8$"],
  r"$A=\dfrac{1}{2}(10)(6)=30$.")
m("Substitution into formulas", r"Given $KE=\dfrac{1}{2}mv^2$, find $KE$ when $m=4$ and $v=3$.",
  "$18$", ["$36$", "$12$", "$24$"],
  r"$KE=\dfrac{1}{2}(4)(9)=18$.")
m("Substitution into formulas",
  r"The rectangle shown has area $A=lw=48$ and length $l=8$. Find the width $w$.",
  "$6$", ["$8$", "$40$", "$384$"],
  r"$48=8w\Rightarrow w=6$.",
  figure={"type": "rect", "vertices": [[0, 0], [8, 0], [8, 6], [0, 6]],
          "side_labels": ["l = 8", "w = ?", None, None]})
m("Substitution into formulas", r"Given $F=ma$, find $F$ when $m=7$ and $a=5$.",
  "$35$", ["$12$", "$2.4$", "$75$"],
  r"$F=(7)(5)=35$.")

# --- Translating words into equations (4) ---
m("Translating words into equations",
  r"Three times a number, minus 5, equals twice the number plus 7. Find the number.",
  "$12$", ["$2$", "$-12$", "$19$"],
  r"$3n-5=2n+7\Rightarrow n=12$.")
m("Translating words into equations",
  r"The sum of two consecutive even integers is 54. Find the larger integer.",
  "$28$", ["$26$", "$27$", "$29$"],
  r"$n+(n+2)=54\Rightarrow n=26$; larger integer $=28$.")
m("Translating words into equations",
  r"Five less than three times a number is 25. Find the number.",
  "$10$", ["$15$", "$5$", "$20$"],
  r"$3n-5=25\Rightarrow n=10$.")
m("Translating words into equations",
  r"The perimeter of a rectangle is 54 cm. The length is 3 cm more than the width. Find the width.",
  "$12$", ["$15$", "$9$", "$24$"],
  r"$2(w+(w+3))=54\Rightarrow4w+6=54\Rightarrow w=12$.")

# --- Word problems (5) ---
m("Word problems", r"A number increased by 20% equals 72. Find the number.",
  "$60$", ["$86.4$", "$52$", "$90$"],
  r"$1.2n=72\Rightarrow n=60$.")
m("Word problems",
  r"Ahmed is twice as old as his sister. In 5 years, the sum of their ages will be 40. Find Ahmed's current age.",
  "$20$", ["$10$", "$25$", "$15$"],
  r"Let sister $=x$, Ahmed $=2x$. $(x+5)+(2x+5)=40\Rightarrow3x=30\Rightarrow x=10$; Ahmed $=20$.")
m("Word problems", r"A positive number plus its square is 30. Find the number.",
  "$5$", ["$6$", "$-6$", "$30$"],
  r"$n^2+n-30=0\Rightarrow(n+6)(n-5)=0$; the positive root is $n=5$.")
m("Word problems",
  r"The bar chart shows four students' test scores. Whose score is exactly 12 more than 70?",
  "Student C", ["Student A", "Student B", "Student D"],
  r"$70+12=82$, which is Student C's score.",
  figure={"type": "bars", "categories": ["Student A", "Student B", "Student C", "Student D"],
          "values": [70, 75, 82, 90], "ylabel": "score"})
m("Word problems", r"The product of two consecutive integers is 132. Find the larger integer.",
  "$12$", ["$11$", "$13$", "$10$"],
  r"$n(n+1)=132\Rightarrow n^2+n-132=0\Rightarrow(n+12)(n-11)=0$; taking the positive root $n=11$, larger $=12$.")

b.check(50)
