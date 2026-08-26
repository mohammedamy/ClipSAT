# -*- coding: utf-8 -*-
"""50 new MCQs for Tahsili ch.1 — Algebra & Equations. Distinct from the
existing 35 free-response questions (different equations/values
throughout)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=101)
m = b.mcq

# --- Solving linear equations (5) ---
m("Solving linear equations", r"Solve $4x-9=15$.", "$x=6$", ["$x=1.5$", "$x=24$", "$x=-6$"],
  r"$4x=24\Rightarrow x=6$.")
m("Solving linear equations", r"Solve $6(x-3)=2x+10$.", "$x=7$", ["$x=-7$", "$x=4$", "$x=1$"],
  r"$6x-18=2x+10\Rightarrow4x=28\Rightarrow x=7$.")
m("Solving linear equations", r"Solve $\dfrac{2x-1}{3}=x-2$.", "$x=5$", ["$x=-5$", "$x=1$", "$x=7$"],
  r"$2x-1=3x-6\Rightarrow x=5$.")
m("Solving linear equations", r"Solve $3(x+4)-7=2(x-1)$.", "$x=-7$", ["$x=7$", "$x=-3$", "$x=3$"],
  r"$3x+5=2x-2\Rightarrow x=-7$.")
m("Solving linear equations", r"Solve $5x+3=2x-9$.", "$x=-4$", ["$x=4$", "$x=-2$", "$x=2$"],
  r"$3x=-12\Rightarrow x=-4$.")

# --- Expanding and simplifying expressions (4) ---
m("Expanding and simplifying expressions", r"Expand and simplify $4(3x-2)-3(x-5)$.",
  "$9x+7$", ["$9x-23$", "$15x-23$", "$9x+23$"], r"$12x-8-3x+15=9x+7$.")
m("Expanding and simplifying expressions", r"Expand $(x+7)(x-3)$.",
  "$x^2+4x-21$", ["$x^2-4x-21$", "$x^2+4x+21$", "$x^2+10x-21$"], r"$(x+7)(x-3)=x^2+4x-21$.")
m("Expanding and simplifying expressions", r"Expand $(3x-1)^2$.",
  "$9x^2-6x+1$", ["$9x^2-1$", "$9x^2-6x-1$", "$3x^2-6x+1$"], r"$(3x-1)^2=9x^2-6x+1$.")
m("Expanding and simplifying expressions", r"Simplify $\dfrac{8x^2-12x}{4x}$ (for $x\neq0$).",
  "$2x-3$", ["$2x-12$", "$8x-3$", "$2x^2-3$"], r"$\dfrac{4x(2x-3)}{4x}=2x-3$.")

# --- Factoring quadratic expressions (5) ---
m("Factoring quadratic expressions", r"Factor $x^2+9x+14$.",
  "$(x+2)(x+7)$", ["$(x+1)(x+14)$", "$(x-2)(x-7)$", "$(x+14)(x-1)$"],
  r"Need two numbers multiplying to $14$, adding to $9$: $2,7$.")
m("Factoring quadratic expressions", r"Factor $x^2-3x-18$.",
  "$(x-6)(x+3)$", ["$(x+6)(x-3)$", "$(x-9)(x+2)$", "$(x-2)(x+9)$"],
  r"Need two numbers multiplying to $-18$, adding to $-3$: $-6,3$.")
m("Factoring quadratic expressions", r"Factor $3x^2+7x+2$.",
  "$(3x+1)(x+2)$", ["$(3x+2)(x+1)$", "$(x+1)(3x+2)$", "$(3x-1)(x-2)$"],
  r"$(3x+1)(x+2)=3x^2+6x+x+2=3x^2+7x+2$.")
m("Factoring quadratic expressions", r"Factor $x^2-81$ using the difference of squares.",
  "$(x-9)(x+9)$", ["$(x-81)(x+1)$", "$(x-9)^2$", "$(x+9)^2$"], r"$x^2-9^2=(x-9)(x+9)$.")
m("Factoring quadratic expressions", r"Factor $2x^2-x-6$.",
  "$(2x+3)(x-2)$", ["$(2x-3)(x+2)$", "$(x+3)(2x-2)$", "$(2x+1)(x-6)$"],
  r"$(2x+3)(x-2)=2x^2-4x+3x-6=2x^2-x-6$.")

# --- Solving quadratic equations by factoring (4) ---
m("Solving quadratic equations by factoring", r"Solve $x^2-7x+10=0$.",
  "$x=2$ or $x=5$", ["$x=-2$ or $x=-5$", "$x=1$ or $x=10$", "$x=7$ or $x=10$"],
  r"$(x-2)(x-5)=0\Rightarrow x=2$ or $x=5$.")
m("Solving quadratic equations by factoring", r"Solve $x^2+3x-10=0$.",
  "$x=-5$ or $x=2$", ["$x=5$ or $x=-2$", "$x=-3$ or $x=10$", "$x=-10$ or $x=1$"],
  r"$(x+5)(x-2)=0\Rightarrow x=-5$ or $x=2$.")
m("Solving quadratic equations by factoring", r"Solve $3x^2-11x-4=0$.",
  r"$x=-\dfrac{1}{3}$ or $x=4$", [r"$x=\dfrac{1}{3}$ or $x=-4$", r"$x=-\dfrac{1}{3}$ or $x=-4$",
   "$x=1$ or $x=4$"],
  r"$(3x+1)(x-4)=0\Rightarrow x=-\dfrac{1}{3}$ or $x=4$.")
m("Solving quadratic equations by factoring", r"Solve $x^2-11x+24=0$.",
  "$x=3$ or $x=8$", ["$x=-3$ or $x=-8$", "$x=1$ or $x=24$", "$x=4$ or $x=6$"],
  r"$(x-3)(x-8)=0\Rightarrow x=3$ or $x=8$.")

# --- The quadratic formula and the discriminant (4) ---
m("The quadratic formula and the discriminant",
  r"Use the quadratic formula to solve $x^2+5x+2=0$, leaving the answer in surd form.",
  r"$x=\dfrac{-5\pm\sqrt{17}}{2}$", [r"$x=\dfrac{-5\pm\sqrt{33}}{2}$", r"$x=\dfrac{5\pm\sqrt{17}}{2}$",
   r"$x=\dfrac{-5\pm\sqrt{17}}{4}$"],
  r"Discriminant $=25-8=17$; $x=\dfrac{-5\pm\sqrt{17}}{2}$.")
m("The quadratic formula and the discriminant",
  r"Find the discriminant of $3x^2-6x+5=0$ and state how many real roots it has.",
  "$-24$; no real roots", ["$96$; two real roots", "$-24$; one real root", "$24$; two real roots"],
  r"$(-6)^2-4(3)(5)=36-60=-24<0$: no real roots.")
m("The quadratic formula and the discriminant",
  r"Find the discriminant of $x^2-8x+16=0$ and state how many real roots it has.",
  "$0$; one real root", ["$64$; two real roots", "$0$; two real roots", "$-64$; no real roots"],
  r"$(-8)^2-4(1)(16)=64-64=0$: one repeated real root.")
m("The quadratic formula and the discriminant", r"Use the quadratic formula to solve $2x^2+3x-2=0$.",
  "$x=0.5$ or $x=-2$", ["$x=-0.5$ or $x=2$", "$x=1$ or $x=-2$", "$x=0.5$ or $x=2$"],
  r"Discriminant $=9+16=25$; $x=\dfrac{-3\pm5}{4}$: $x=0.5$ or $x=-2$.")

# --- Absolute value equations (5) ---
m("Absolute value equations", r"Solve $|x-6|=11$.", "$x=17$ or $x=-5$", ["$x=-17$ or $x=5$",
   "$x=17$ or $x=5$", "$x=5$ or $x=-17$"], r"$x-6=11$ or $x-6=-11$: $x=17$ or $x=-5$.")
m("Absolute value equations", r"Solve $|3x+2|=13$.", r"$x=\dfrac{11}{3}$ or $x=-5$",
  [r"$x=\dfrac{11}{3}$ or $x=5$", "$x=5$ or $x=-5$", r"$x=-\dfrac{11}{3}$ or $x=5$"],
  r"$3x+2=13\Rightarrow x=\dfrac{11}{3}$; $3x+2=-13\Rightarrow x=-5$.")
m("Absolute value equations", r"Solve $4|x-2|=20$.", "$x=7$ or $x=-3$",
  ["$x=-7$ or $x=3$", "$x=7$ or $x=3$", "$x=5$ or $x=-5$"],
  r"$|x-2|=5\Rightarrow x-2=5$ or $x-2=-5$: $x=7$ or $x=-3$.")
m("Absolute value equations", r"Solve $|2x-5|=9$.", "$x=7$ or $x=-2$",
  ["$x=-7$ or $x=2$", "$x=2$ or $x=-7$", "$x=7$ or $x=2$"],
  r"$2x-5=9\Rightarrow x=7$; $2x-5=-9\Rightarrow x=-2$.")
m("Absolute value equations", r"The graph shows $y=|x-3|$. At what $x$-value does the graph reach its minimum?",
  "$x=3$", ["$x=0$", "$x=-3$", "$x=1$"], r"The vertex of the V-shape (the minimum) is at $x=3$.",
  figure={"type": "plot", "fns": ["abs(x-3)"], "xmin": -1, "xmax": 7, "ymin": -1, "ymax": 6})

# --- Linear inequalities (4) ---
m("Linear inequalities", r"Solve $3x-7<14$, and identify the graph of its solution set.",
  "$x<7$", ["$x>7$", r"$x\leq7$", r"$x\geq7$"], r"$3x<21\Rightarrow x<7$.",
  figure={"type": "numberline", "min": 2, "max": 12, "marks": [{"x": 7, "open": True}], "shade": [2, 7]})
m("Linear inequalities", r"Solve $-4x+6\geq-10$, and identify the graph of its solution set.",
  r"$x\leq4$", [r"$x\geq4$", "$x<4$", "$x>4$"], r"$-4x\geq-16$; dividing by $-4$ flips the sign: $x\leq4$.",
  figure={"type": "numberline", "min": -1, "max": 9, "marks": [{"x": 4, "open": False}], "shade": [-1, 4]})
m("Linear inequalities", r"Solve the compound inequality $7<3x+1\leq19$.",
  r"$2<x\leq6$", [r"$2\leq x<6$", r"$6<x\leq2$", r"$2<x<6$"],
  r"$6<3x\leq18\Rightarrow2<x\leq6$.")
m("Linear inequalities",
  r"Solve $2x+5>-3$ and $x-1<6$ together (both must hold). Find the combined solution set.",
  "$-4<x<7$", ["$-4<x\\leq7$", "$x>-4$", "$x<7$"],
  r"$2x+5>-3\Rightarrow x>-4$; $x-1<6\Rightarrow x<7$. Together: $-4<x<7$.")

# --- Systems of linear equations (4) ---
m("Systems of linear equations", r"Solve the system $x+y=14$, $x-y=4$.",
  "$x=9$, $y=5$", ["$x=5$, $y=9$", "$x=10$, $y=4$", "$x=9$, $y=4$"],
  r"Adding: $2x=18\Rightarrow x=9$; then $y=5$.")
m("Systems of linear equations", r"Solve the system $4x+3y=26$, $x-y=3$.",
  "$x=5$, $y=2$", ["$x=2$, $y=5$", "$x=5$, $y=3$", "$x=8$, $y=5$"],
  r"$x=y+3\Rightarrow4(y+3)+3y=26\Rightarrow7y=14\Rightarrow y=2$; $x=5$.")
m("Systems of linear equations", r"The sum of two numbers is $22$ and their difference is $6$. Find the two numbers.",
  "$14$ and $8$", ["$16$ and $6$", "$11$ and $11$", "$14$ and $6$"],
  r"$x+y=22$, $x-y=6\Rightarrow x=14$, $y=8$.")
m("Systems of linear equations", r"Solve the system $2x-y=7$, $3x+2y=21$.",
  "$x=5$, $y=3$", ["$x=3$, $y=5$", "$x=7$, $y=7$", "$x=5$, $y=-3$"],
  r"$y=2x-7\Rightarrow3x+2(2x-7)=21\Rightarrow7x=35\Rightarrow x=5$; $y=3$.")

# --- Rational equations (5) ---
m("Rational equations", r"Solve $\dfrac{x}{x-3}=4$.", "$x=4$", ["$x=-4$", "$x=12$", "$x=3$"],
  r"$x=4(x-3)=4x-12\Rightarrow-3x=-12\Rightarrow x=4$.")
m("Rational equations", r"Solve $\dfrac{3}{x+2}=\dfrac{1}{4}$.", "$x=10$", ["$x=-10$", "$x=6$", "$x=14$"],
  r"Cross-multiply: $12=x+2\Rightarrow x=10$.")
m("Rational equations", r"Solve $\dfrac{x+2}{x-2}=3$.", "$x=4$", ["$x=-4$", "$x=8$", "$x=2$"],
  r"$x+2=3(x-2)=3x-6\Rightarrow8=2x\Rightarrow x=4$.")
m("Rational equations", r"Solve $\dfrac{4}{x-1}=\dfrac{2}{x+2}$.", "$x=-5$", ["$x=5$", "$x=-1$", "$x=2$"],
  r"Cross-multiply: $4(x+2)=2(x-1)\Rightarrow4x+8=2x-2\Rightarrow x=-5$.")
m("Rational equations", r"Solve $\dfrac{6}{x}=\dfrac{2}{x-4}$.", "$x=6$", ["$x=-6$", "$x=12$", "$x=4$"],
  r"Cross-multiply: $6(x-4)=2x\Rightarrow6x-24=2x\Rightarrow x=6$.")

# --- Solving for a variable in a formula (4) ---
m("Solving for a variable in a formula", r"The perimeter of a rectangle is $P=2l+2w$. Solve for $l$.",
  r"$l=\dfrac{P-2w}{2}$", [r"$l=\dfrac{P+2w}{2}$", "$l=P-2w$", r"$l=\dfrac{P}{2}-w$"],
  r"$P-2w=2l\Rightarrow l=\dfrac{P-2w}{2}$ (equivalently $\dfrac{P}{2}-w$).")
m("Solving for a variable in a formula", r"The formula for simple interest is $I=Prt$. Solve for $r$.",
  r"$r=\dfrac{I}{Pt}$", [r"$r=\dfrac{Pt}{I}$", "$r=I-Pt$", r"$r=\dfrac{I}{P}$"],
  r"Dividing both sides by $Pt$: $r=\dfrac{I}{Pt}$.")
m("Solving for a variable in a formula",
  r"The formula $F=\dfrac{9}{5}C+32$ converts Celsius to Fahrenheit. Solve for $C$.",
  r"$C=\dfrac{5(F-32)}{9}$", [r"$C=\dfrac{9(F-32)}{5}$", r"$C=\dfrac{5F-32}{9}$", r"$C=\dfrac{5}{9}F+32$"],
  r"$F-32=\dfrac{9}{5}C\Rightarrow C=\dfrac{5(F-32)}{9}$.")
m("Solving for a variable in a formula", r"The volume of a cylinder is $V=\pi r^2h$. Solve for $h$.",
  r"$h=\dfrac{V}{\pi r^2}$", [r"$h=\dfrac{V}{\pi r}$", r"$h=\dfrac{\pi r^2}{V}$", r"$h=V-\pi r^2$"],
  r"Dividing both sides by $\pi r^2$: $h=\dfrac{V}{\pi r^2}$.")

# --- Linear-quadratic systems (4) ---
m("Linear-quadratic systems", r"Solve the system $y=x^2-4$, $y=3x$.",
  "$(4,12)$ and $(-1,-3)$", ["$(-4,-12)$ and $(1,3)$", "$(4,12)$ and $(1,3)$", "$(-1,-3)$ and $(1,3)$"],
  r"$x^2-4=3x\Rightarrow x^2-3x-4=0\Rightarrow(x-4)(x+1)=0$: $x=4,y=12$ or $x=-1,y=-3$.")
m("Linear-quadratic systems", r"Solve the system $y=x^2$, $y=2x+3$.",
  "$(3,9)$ and $(-1,1)$", ["$(-3,9)$ and $(1,1)$", "$(3,9)$ and $(1,1)$", "$(-1,1)$ and $(1,1)$"],
  r"$x^2-2x-3=0\Rightarrow(x-3)(x+1)=0$: $x=3,y=9$ or $x=-1,y=1$.")
m("Linear-quadratic systems",
  r"The graph shows the system $y=x^2-4$, $y=3x$. What are the points of intersection?",
  "$(4,12)$ and $(-1,-3)$", ["$(-4,-12)$ and $(1,3)$", "$(4,12)$ and $(1,3)$", "$(-1,-3)$ and $(1,3)$"],
  r"The curve and line cross at $(-1,-3)$ and $(4,12)$.",
  figure={"type": "plot", "fns": ["x**2-4", "3*x"], "xmin": -3, "xmax": 5, "ymin": -5, "ymax": 14})
m("Linear-quadratic systems",
  r"The graph shows the system $y=x^2$, $y=2x+3$. What are the points of intersection?",
  "$(3,9)$ and $(-1,1)$", ["$(-3,9)$ and $(1,1)$", "$(3,9)$ and $(1,1)$", "$(-1,1)$ and $(1,1)$"],
  r"The curve and line cross at $(-1,1)$ and $(3,9)$.",
  figure={"type": "plot", "fns": ["x**2", "2*x+3"], "xmin": -3, "xmax": 4, "ymin": -1, "ymax": 10})

# --- Word problems: setting up and solving equations (2) ---
m("Word problems: setting up and solving equations",
  r"A rectangular garden has a length that is 5 meters more than its width, and its area is 84 square meters. Find the width.",
  "$7$", ["$12$", "$9$", "$14$"], r"$w(w+5)=84\Rightarrow(w+12)(w-7)=0$; the positive root is $w=7$.")
m("Word problems: setting up and solving equations",
  r"A mobile-data plan charges a fixed monthly fee of 40 riyals plus 2 riyals per GB used. If a user's bill was 68 riyals, how many GB did they use?",
  "$14$", ["$34$", "$28$", "$54$"], r"$40+2g=68\Rightarrow2g=28\Rightarrow g=14$.")

b.check(50)
