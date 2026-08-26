# -*- coding: utf-8 -*-
"""50 new MCQs for Tahsili ch.2 — Functions. Distinct from the existing 34
free-response questions (different functions/values throughout)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=202)
m = b.mcq

# --- Evaluating functions (5) ---
m("Evaluating functions", r"If $f(x)=4x-7$, find $f(6)$.", "$17$", ["$24$", "$31$", "$10$"],
  r"$4(6)-7=24-7=17$.")
m("Evaluating functions", r"If $f(x)=x^2-3x+2$, find $f(-3)$.", "$20$", ["$2$", "$-16$", "$16$"],
  r"$(-3)^2-3(-3)+2=9+9+2=20$.")
m("Evaluating functions", r"If $g(x)=\sqrt{x+9}$, find $g(7)$.", "$4$", ["$16$", "$8$", "$\\sqrt{16}$"],
  r"$g(7)=\sqrt{16}=4$.")
m("Evaluating functions", r"If $h(x)=\dfrac{3x}{x-2}$, find $h(5)$.", "$5$", ["$3$", "$15$", "$1.5$"],
  r"$h(5)=\dfrac{15}{3}=5$.")
m("Evaluating functions", r"If $f(x)=2x^2+1$, find $f(3)-f(1)$.", "$16$", ["$18$", "$22$", "$8$"],
  r"$f(3)=19$, $f(1)=3$; $19-3=16$.")

# --- Domain and range (5) ---
m("Domain and range", r"State the domain of $f(x)=\sqrt{x-5}$.", "$x\\geq5$", ["$x>5$", "$x\\leq5$", "$x\\neq5$"],
  r"The expression under the root must be $\geq0$: $x-5\geq0\Rightarrow x\geq5$.")
m("Domain and range", r"State the domain of $f(x)=\dfrac{1}{x-7}$.",
  "All reals except $x=7$", ["$x\\geq7$", "$x>7$", "All real numbers"],
  r"The denominator cannot be $0$, so $x\neq7$.")
m("Domain and range", r"State the domain of $f(x)=\sqrt{9-x}$.", "$x\\leq9$", ["$x\\geq9$", "$x<9$", "$x\\neq9$"],
  r"$9-x\geq0\Rightarrow x\leq9$.")
m("Domain and range", r"State the range of $f(x)=x^2+5$.", "$y\\geq5$", ["$y>5$", "$y\\leq5$", "All real numbers"],
  r"Since $x^2\geq0$, the minimum value of $f$ is $5$: range $y\geq5$.")
m("Domain and range", r"The graph shows $f(x)$ defined only where plotted. State its domain.",
  "$[-3,3]$", ["$[-4,4]$", "$[0,3]$", "All real numbers"],
  r"The curve is only plotted for $x$ between $-3$ and $3$.",
  figure={"type": "plot", "fns": ["sqrt(9-x**2)"], "xmin": -4, "xmax": 4, "ymin": -1, "ymax": 4})

# --- Transformations: shifts (4) ---
m("Transformations: shifts",
  r"The graph of $y=x^2$ is shifted 5 units right and 3 units down. Write the new equation.",
  "$y=(x-5)^2-3$", ["$y=(x+5)^2-3$", "$y=(x-5)^2+3$", "$y=(x-3)^2-5$"],
  r"Right $5$: replace $x$ with $x-5$; down $3$: subtract $3$.")
m("Transformations: shifts",
  r"The graph of $y=|x|$ is shifted 2 units left and 4 units up. Write the new equation.",
  "$y=|x+2|+4$", ["$y=|x-2|+4$", "$y=|x+2|-4$", "$y=|x+4|+2$"],
  r"Left $2$: replace $x$ with $x+2$; up $4$: add $4$.")
m("Transformations: shifts", r"Describe the transformation that takes $y=x^2$ to $y=(x-3)^2+2$.",
  "Shift right 3, up 2", ["Shift left 3, up 2", "Shift right 3, down 2", "Shift right 2, up 3"],
  r"Replacing $x$ with $x-3$ shifts right $3$; adding $2$ shifts up $2$.")
m("Transformations: shifts", r"The graph of $y=\sqrt{x}$ is shifted 6 units right. Write the new equation.",
  "$y=\\sqrt{x-6}$", ["$y=\\sqrt{x+6}$", "$y=\\sqrt{x}-6$", "$y=\\sqrt{x}+6$"],
  r"Right $6$: replace $x$ with $x-6$.")

# --- Transformations: reflections and stretches (4) ---
m("Transformations: reflections and stretches",
  r"The graph of $y=x^2$ is reflected over the $x$-axis and stretched vertically by a factor of 2. Write the new equation.",
  "$y=-2x^2$", ["$y=2x^2$", "$y=-\\dfrac{1}{2}x^2$", "$y=(-2x)^2$"],
  r"Reflect over $x$-axis: negate; stretch by $2$: multiply by $2$.")
m("Transformations: reflections and stretches",
  r"Describe the transformation that takes $y=\sqrt{x}$ to $y=3\sqrt{x}$.",
  "Vertical stretch by a factor of 3", ["Horizontal stretch by a factor of 3",
   "Vertical shift up 3", "Reflection over the $x$-axis"],
  r"Multiplying the output by $3$ stretches the graph vertically by a factor of $3$.")
m("Transformations: reflections and stretches",
  r"Describe the transformation that takes $y=x^2$ to $y=-(x+2)^2+1$.",
  "Reflect over $x$-axis, shift left 2, up 1", ["Reflect over $y$-axis, shift right 2, up 1",
   "Reflect over $x$-axis, shift right 2, down 1", "Shift left 2, up 1 (no reflection)"],
  r"The negative sign reflects over the $x$-axis; $+2$ shifts left $2$; $+1$ shifts up $1$.")
m("Transformations: reflections and stretches",
  r"The graph of $y=\sqrt{x}$ is reflected over the $y$-axis. Write the new equation.",
  "$y=\\sqrt{-x}$", ["$y=-\\sqrt{x}$", "$y=\\sqrt{x}$", "$y=-\\sqrt{-x}$"],
  r"Reflecting over the $y$-axis replaces $x$ with $-x$: $y=\sqrt{-x}$.")

# --- Composite functions (5) ---
m("Composite functions", r"Let $f(x)=3x+2$ and $g(x)=x^2-1$. Find $(f\circ g)(3)$.",
  "$26$", ["$11$", "$29$", "$23$"], r"$g(3)=8$; $f(8)=3(8)+2=26$.")
m("Composite functions", r"Using the same $f$ and $g$, find $(g\circ f)(3)$.",
  "$120$", ["$26$", "$100$", "$121$"], r"$f(3)=11$; $g(11)=11^2-1=120$.")
m("Composite functions", r"Using the same $f$ and $g$, find a general formula for $(f\circ g)(x)$.",
  "$3x^2-1$", ["$3x^2+2$", "$9x^2-1$", "$3x^2-3$"], r"$f(g(x))=3(x^2-1)+2=3x^2-1$.")
m("Composite functions", r"Using the same $f$ and $g$, find a general formula for $(g\circ f)(x)$.",
  "$9x^2+12x+3$", ["$9x^2+4$", "$9x^2+12x-1$", "$3x^2+2x-1$"],
  r"$g(f(x))=(3x+2)^2-1=9x^2+12x+4-1=9x^2+12x+3$.")
m("Composite functions", r"Let $f(x)=x+4$ and $g(x)=2x$. Find $(f\circ g)(5)$.",
  "$14$", ["$18$", "$10$", "$9$"], r"$g(5)=10$; $f(10)=14$.")

# --- Inverse functions (5) ---
m("Inverse functions", r"Find the inverse of $f(x)=4x-3$.", r"$f^{-1}(x)=\dfrac{x+3}{4}$",
  [r"$f^{-1}(x)=\dfrac{x-3}{4}$", r"$f^{-1}(x)=4x+3$", r"$f^{-1}(x)=\dfrac{x+4}{3}$"],
  r"$y=4x-3\Rightarrow x=\dfrac{y+3}{4}$.")
m("Inverse functions", r"Find the inverse of $f(x)=\dfrac{x-7}{2}$.", "$f^{-1}(x)=2x+7$",
  ["$f^{-1}(x)=2x-7$", r"$f^{-1}(x)=\dfrac{x+7}{2}$", "$f^{-1}(x)=2(x-7)$"],
  r"$y=\dfrac{x-7}{2}\Rightarrow x=2y+7$.")
m("Inverse functions",
  r"Show that $f(x)=3x+9$ and $g(x)=\dfrac{x-9}{3}$ are inverses by computing $f(g(x))$.",
  "$x$", ["$x+9$", "$3x$", "$x-9$"], r"$f(g(x))=3\left(\dfrac{x-9}{3}\right)+9=x-9+9=x$.")
m("Inverse functions", r"Find the inverse of $f(x)=x^3-2$.", r"$f^{-1}(x)=\sqrt[3]{x+2}$",
  [r"$f^{-1}(x)=\sqrt[3]{x-2}$", r"$f^{-1}(x)=\sqrt[3]{x}+2$", "$f^{-1}(x)=(x+2)^3$"],
  r"$y=x^3-2\Rightarrow x=\sqrt[3]{y+2}$.")
m("Inverse functions", r"Find the inverse of $f(x)=5x+10$.", r"$f^{-1}(x)=\dfrac{x-10}{5}$",
  [r"$f^{-1}(x)=\dfrac{x+10}{5}$", "$f^{-1}(x)=5x-10$", r"$f^{-1}(x)=\dfrac{x}{5}-10$"],
  r"$y=5x+10\Rightarrow x=\dfrac{y-10}{5}$.")

# --- Piecewise functions (4) ---
m("Piecewise functions",
  r"A function is defined by $f(x)=x+3$ for $x<2$, and $f(x)=2x-1$ for $x\geq2$. Find $f(-3)$.",
  "$0$", ["$-7$", "$1$", "$6$"], r"$x=-3<2$: $f(-3)=-3+3=0$.")
m("Piecewise functions", r"Using the same piecewise function, find $f(2)$.",
  "$3$", ["$5$", "$0$", "$4$"], r"$x=2\geq2$: $f(2)=2(2)-1=3$.")
m("Piecewise functions", r"Using the same piecewise function, find $f(5)$.",
  "$9$", ["$8$", "$5$", "$7$"], r"$x=5\geq2$: $f(5)=2(5)-1=9$.")
m("Piecewise functions",
  r"A function is defined by $f(x)=2x$ for $x\leq0$, and $f(x)=x^2+1$ for $x>0$. Find $f(0)+f(3)$.",
  "$10$", ["$11$", "$1$", "$0$"], r"$f(0)=0$; $f(3)=9+1=10$; sum $=10$.")

# --- Even and odd functions (4) ---
m("Even and odd functions", r"Determine whether $f(x)=x^2-7$ is even, odd, or neither.",
  "Even", ["Odd", "Neither", "Both even and odd"],
  r"$f(-x)=x^2-7=f(x)$: even.")
m("Even and odd functions", r"Determine whether $f(x)=x^3-4x$ is even, odd, or neither.",
  "Odd", ["Even", "Neither", "Both even and odd"],
  r"$f(-x)=-x^3+4x=-f(x)$: odd.")
m("Even and odd functions", r"Determine whether $f(x)=x^2+3x$ is even, odd, or neither.",
  "Neither", ["Even", "Odd", "Both even and odd"],
  r"$f(-x)=x^2-3x$, which is neither $f(x)$ nor $-f(x)$: neither.")
m("Even and odd functions",
  r"The graph shown is symmetric about the $y$-axis. Is the function even, odd, or neither?",
  "Even", ["Odd", "Neither", "Cannot be determined"],
  r"Symmetry about the $y$-axis is exactly the definition of an even function.",
  figure={"type": "plot", "fns": ["x**2-4"], "xmin": -4, "xmax": 4, "ymin": -5, "ymax": 12})

# --- Increasing, decreasing, and average rate of change (4) ---
m("Increasing, decreasing, and average rate of change",
  r"Find the average rate of change of $f(x)=x^2$ from $x=2$ to $x=5$.",
  "$7$", ["$21$", "$3$", "$29$"], r"$\dfrac{f(5)-f(2)}{5-2}=\dfrac{25-4}{3}=7$.")
m("Increasing, decreasing, and average rate of change",
  r"Find the average rate of change of $f(x)=3x^2-2x$ from $x=0$ to $x=4$.",
  "$10$", ["$40$", "$46$", "$8.5$"], r"$f(4)=40$, $f(0)=0$; rate $=\dfrac{40}{4}=10$.")
m("Increasing, decreasing, and average rate of change",
  r"State the interval on which $f(x)=(x-3)^2$ is decreasing.",
  "$(-\\infty,3)$", ["$(3,\\infty)$", "$(-\\infty,-3)$", "$(-3,\\infty)$"],
  r"The parabola's vertex is at $x=3$; it decreases for $x<3$.")
m("Increasing, decreasing, and average rate of change",
  r"Find the average rate of change of $f(x)=x^3$ from $x=1$ to $x=3$.",
  "$13$", ["$26$", "$9$", "$8$"], r"$f(3)=27$, $f(1)=1$; rate $=\dfrac{26}{2}=13$.")

# --- Operations on functions (4) ---
m("Operations on functions", r"Let $f(x)=x+5$ and $g(x)=x^2-2$. Find $(f+g)(x)$.",
  "$x^2+x+3$", ["$x^2+x+7$", "$x^2-x+3$", "$x^2+2x+3$"], r"$(x+5)+(x^2-2)=x^2+x+3$.")
m("Operations on functions", r"Using the same $f$ and $g$, find $(f\cdot g)(3)$.",
  "$56$", ["$50$", "$62$", "$48$"], r"$f(3)=8$, $g(3)=7$: $8\times7=56$.")
m("Operations on functions", r"Using the same $f$ and $g$, find $(f/g)(4)$.",
  r"$\dfrac{9}{14}$", [r"$\dfrac{14}{9}$", r"$\dfrac{9}{16}$", r"$\dfrac{7}{14}$"],
  r"$f(4)=9$, $g(4)=14$: $\dfrac{9}{14}$.")
m("Operations on functions", r"Let $f(x)=2x$ and $g(x)=x+6$. Find $(f-g)(x)$.",
  "$x-6$", ["$x+6$", "$3x+6$", "$-x-6$"], r"$2x-(x+6)=x-6$.")

# --- Reading a function graph (3) ---
_PARABOLA = {"type": "plot", "fns": ["x**2-9"], "xmin": -5, "xmax": 5, "ymin": -10, "ymax": 16}
m("Reading a function graph", r"The graph shows $y=f(x)=x^2-9$. Find $f(3)$ by reading the graph.",
  "$0$", ["$-9$", "$9$", "$6$"], r"The curve crosses the $x$-axis at $x=3$, so $f(3)=0$.", figure=_PARABOLA)
m("Reading a function graph",
  r"Using the same graph, find the values of $x$ where $f(x)=0$ (the $x$-intercepts).",
  "$x=-3$ and $x=3$", ["$x=-9$ and $x=9$", "$x=0$ and $x=9$", "$x=3$ only"],
  r"The curve crosses the $x$-axis at $x=-3$ and $x=3$.", figure=_PARABOLA)
m("Reading a function graph", r"Using the same graph, find the $y$-intercept.",
  "$-9$", ["$9$", "$0$", "$-3$"], r"At $x=0$, the curve crosses the $y$-axis at $y=-9$.", figure=_PARABOLA)

# --- Word problems: functions in context (3) ---
m("Word problems: functions in context",
  r"A company's daily profit (in dollars) from selling $x$ units is modeled by $P(x)=-2x^2+80x-300$. Find the profit when 15 units are sold.",
  "$450$ dollars", ["$600$ dollars", "$150$ dollars", "$900$ dollars"],
  r"$P(15)=-2(225)+1{,}200-300=450$ dollars.")
m("Word problems: functions in context",
  r"The Fahrenheit conversion of a Celsius temperature is $F(C)=\dfrac{9C}{5}+32$. Find $F(20)$.",
  r"$68^{\circ}$F", [r"$36^{\circ}$F", r"$52^{\circ}$F", r"$72^{\circ}$F"], r"$F(20)=\dfrac{9(20)}{5}+32=36+32=68$.")
m("Word problems: functions in context",
  r"A ball's height (in meters) $t$ seconds after being thrown is $h(t)=-5t^2+20t+2$. Find the height at $t=2$ seconds.",
  "$22$", ["$42$", "$18$", "$2$"], r"$h(2)=-5(4)+40+2=22$ meters.")

b.check(50)
