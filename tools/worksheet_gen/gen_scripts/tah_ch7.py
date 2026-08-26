# -*- coding: utf-8 -*-
"""50 new MCQs for Tahsili ch.7 — Integration & Applications. Distinct from
the existing 34 free-response questions (different functions/values
throughout). No fill/shade support in the figure renderer, so 'area under
a curve' figures show the plain curve (the interval is stated in the
question text) rather than a shaded region."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=707)
m = b.mcq

# --- Basic antiderivatives (the power rule) (6) ---
m("Basic antiderivatives (the power rule)", r"Find $\int x^6\,dx$.",
  r"$\dfrac{x^7}{7}+C$", [r"$7x^5+C$", r"$\dfrac{x^7}{6}+C$", r"$\dfrac{x^6}{7}+C$"], r"Power rule: $\dfrac{x^{6+1}}{6+1}+C$.")
m("Basic antiderivatives (the power rule)", r"Find $\int5x^3\,dx$.",
  r"$\dfrac{5x^4}{4}+C$", [r"$5x^4+C$", r"$\dfrac{5x^4}{3}+C$", r"$15x^2+C$"], r"$5\cdot\dfrac{x^4}{4}+C$.")
m("Basic antiderivatives (the power rule)", r"Find $\int\sqrt[3]{x}\,dx$.",
  r"$\dfrac{3}{4}x^{4/3}+C$", [r"$\dfrac{4}{3}x^{4/3}+C$", r"$\dfrac{1}{3}x^{-2/3}+C$", r"$\dfrac{3}{2}x^{2/3}+C$"],
  r"$\int x^{1/3}dx=\dfrac{x^{4/3}}{4/3}+C=\dfrac{3}{4}x^{4/3}+C$.")
m("Basic antiderivatives (the power rule)", r"Find $\int\dfrac{1}{x^4}\,dx$.",
  r"$-\dfrac{1}{3x^3}+C$", [r"$\dfrac{1}{3x^3}+C$", r"$-\dfrac{1}{4x^3}+C$", r"$-\dfrac{4}{x^5}+C$"],
  r"$\int x^{-4}dx=\dfrac{x^{-3}}{-3}+C=-\dfrac{1}{3x^3}+C$.")
m("Basic antiderivatives (the power rule)", r"Find $\int7\,dx$.",
  r"$7x+C$", [r"$7+C$", r"$\dfrac{7x^2}{2}+C$", "$C$"], r"The antiderivative of a constant $k$ is $kx+C$.")
m("Basic antiderivatives (the power rule)", r"Find $\int\dfrac{1}{\sqrt{x}}\,dx$.",
  r"$2\sqrt{x}+C$", [r"$\dfrac{1}{2}\sqrt{x}+C$", r"$\sqrt{x}+C$", r"$-2\sqrt{x}+C$"],
  r"$\int x^{-1/2}dx=\dfrac{x^{1/2}}{1/2}+C=2\sqrt{x}+C$.")

# --- Antiderivatives of polynomials (4) ---
m("Antiderivatives of polynomials", r"Find $\int(6x^2-8x+3)\,dx$.",
  r"$2x^3-4x^2+3x+C$", [r"$2x^3-4x^2+C$", r"$12x-8+C$", r"$2x^3-8x^2+3x+C$"], r"Integrate each term.")
m("Antiderivatives of polynomials", r"Find $\int(5x+9)\,dx$.",
  r"$\dfrac{5x^2}{2}+9x+C$", [r"$5x^2+9x+C$", r"$\dfrac{5x^2}{2}+C$", r"$\dfrac{5x^2}{2}+9+C$"], r"Integrate each term.")
m("Antiderivatives of polynomials", r"Find $\int(x^2-6x+5)\,dx$.",
  r"$\dfrac{x^3}{3}-3x^2+5x+C$", [r"$\dfrac{x^3}{3}-6x^2+5x+C$", r"$x^3-3x^2+5x+C$", r"$\dfrac{x^3}{3}-3x^2+C$"],
  r"Integrate each term.")
m("Antiderivatives of polynomials", r"Find $\int(3x^3-2x)\,dx$.",
  r"$\dfrac{3x^4}{4}-x^2+C$", [r"$\dfrac{3x^4}{4}-2x^2+C$", r"$3x^4-x^2+C$", r"$\dfrac{x^4}{4}-x^2+C$"],
  r"Integrate each term.")

# --- Antiderivatives of trigonometric and exponential functions (4) ---
m("Antiderivatives of trigonometric and exponential functions", r"Find $\int2\cos x\,dx$.",
  r"$2\sin x+C$", [r"$-2\sin x+C$", r"$2\cos x+C$", r"$\sin(2x)+C$"], r"$\int\cos x\,dx=\sin x$.")
m("Antiderivatives of trigonometric and exponential functions", r"Find $\int3\sin x\,dx$.",
  r"$-3\cos x+C$", [r"$3\cos x+C$", r"$-3\sin x+C$", r"$3\sin x+C$"], r"$\int\sin x\,dx=-\cos x$.")
m("Antiderivatives of trigonometric and exponential functions", r"Find $\int(e^x+2)\,dx$.",
  r"$e^x+2x+C$", [r"$e^x+2+C$", r"$xe^x+2x+C$", r"$e^x+C$"], r"$\int e^x\,dx=e^x$; $\int2\,dx=2x$.")
m("Antiderivatives of trigonometric and exponential functions", r"Find $\int(\sin x+\cos x)\,dx$.",
  r"$-\cos x+\sin x+C$", [r"$\cos x-\sin x+C$", r"$\cos x+\sin x+C$", r"$-\cos x-\sin x+C$"],
  r"$\int\sin x\,dx=-\cos x$; $\int\cos x\,dx=\sin x$.")

# --- Evaluating definite integrals (6) ---
m("Evaluating definite integrals", r"Evaluate $\int_0^3 2x\,dx$.", "$9$", ["$6$", "$18$", "$3$"], r"$[x^2]_0^3=9$.")
m("Evaluating definite integrals", r"Evaluate $\int_1^4 3x^2\,dx$.", "$63$", ["$64$", "$48$", "$21$"], r"$[x^3]_1^4=64-1=63$.")
m("Evaluating definite integrals", r"Evaluate $\int_0^5 x\,dx$.", "$12.5$", ["$25$", "$5$", "$10$"], r"$\left[\dfrac{x^2}{2}\right]_0^5=12.5$.")
m("Evaluating definite integrals", r"Evaluate $\int_{-2}^{1}4x^3\,dx$.", "$-15$", ["$15$", "$-17$", "$1$"],
  r"$[x^4]_{-2}^1=1-16=-15$.")
m("Evaluating definite integrals", r"Evaluate $\int_2^5 3\,dx$.", "$9$", ["$15$", "$3$", "$6$"], r"$3\times(5-2)=9$.")
m("Evaluating definite integrals", r"Evaluate $\int_0^2 6x^2\,dx$.", "$16$", ["$8$", "$24$", "$12$"], r"$[2x^3]_0^2=16$.")

# --- Definite integrals with polynomial integrands (4) ---
m("Definite integrals with polynomial integrands", r"Evaluate $\int_0^3(x^2+2)\,dx$.",
  "$15$", ["$9$", "$11$", "$21$"], r"$\left[\dfrac{x^3}{3}+2x\right]_0^3=9+6=15$.")
m("Definite integrals with polynomial integrands", r"Evaluate $\int_1^4(3x^2-2x+1)\,dx$.",
  "$51$", ["$52$", "$50$", "$63$"], r"$[x^3-x^2+x]_1^4=52-1=51$.")
m("Definite integrals with polynomial integrands", r"Evaluate $\int_0^2(4x^2-2x+3)\,dx$.",
  r"$\dfrac{38}{3}$", [r"$\dfrac{32}{3}$", "$14$", r"$\dfrac{40}{3}$"],
  r"$\left[\dfrac{4x^3}{3}-x^2+3x\right]_0^2=\dfrac{32}{3}-4+6=\dfrac{38}{3}$.")
m("Definite integrals with polynomial integrands", r"Evaluate $\int_{-1}^{2}(x^2-x)\,dx$.",
  "$1.5$", ["$2.5$", "$0.5$", "$4.5$"], r"$\left[\dfrac{x^3}{3}-\dfrac{x^2}{2}\right]_{-1}^{2}=\dfrac{2}{3}-\left(-\dfrac{5}{6}\right)=1.5$.")

# --- Definite integrals of trigonometric and exponential functions (3) ---
m("Definite integrals of trigonometric and exponential functions", r"Evaluate $\int_0^{\pi/2}\sin x\,dx$.",
  "$1$", ["$0$", r"$-1$", r"$\dfrac{\pi}{2}$"], r"$[-\cos x]_0^{\pi/2}=-0+1=1$.")
m("Definite integrals of trigonometric and exponential functions", r"Evaluate $\int_0^{\pi}\cos x\,dx$.",
  "$0$", ["$2$", r"$\pi$", r"$-2$"], r"$[\sin x]_0^{\pi}=0-0=0$.")
m("Definite integrals of trigonometric and exponential functions", r"Evaluate $\int_0^2 e^x\,dx$.",
  r"$e^2-1$", [r"$e^2$", r"$e^2+1$", "$2e$"], r"$[e^x]_0^2=e^2-1$.")

# --- Area under a curve (4) ---
m("Area under a curve", r"Find the area under $y=x^2$ from $x=0$ to $x=4$, using a definite integral.",
  r"$\dfrac{64}{3}$", [r"$16$", r"$\dfrac{16}{3}$", "$64$"], r"$\left[\dfrac{x^3}{3}\right]_0^4=\dfrac{64}{3}$.")
m("Area under a curve", r"Find the area under $y=9-x^2$ from $x=-3$ to $x=3$.",
  "$36$", ["$18$", "$54$", "$27$"], r"$\left[9x-\dfrac{x^3}{3}\right]_{-3}^{3}=18-(-18)=36$.")
m("Area under a curve",
  r"The graph shows $y=x^2$. Find the area under the curve from $x=0$ to $x=3$, using a definite integral.",
  "$9$", ["$3$", "$27$", "$18$"], r"$\left[\dfrac{x^3}{3}\right]_0^3=9$.",
  figure={"type": "plot", "fns": ["x**2"], "xmin": 0, "xmax": 3, "ymin": 0, "ymax": 10})
m("Area under a curve", r"The graph shows $y=4-x^2$. Find the area under the curve from $x=-2$ to $x=2$.",
  r"$\dfrac{32}{3}$", [r"$16$", r"$\dfrac{16}{3}$", "$32$"],
  r"$\left[4x-\dfrac{x^3}{3}\right]_{-2}^{2}=\dfrac{16}{3}-\left(-\dfrac{16}{3}\right)=\dfrac{32}{3}$.",
  figure={"type": "plot", "fns": ["4-x**2"], "xmin": -2, "xmax": 2, "ymin": 0, "ymax": 5})

# --- Signed area and regions below the axis (3) ---
m("Signed area and regions below the axis",
  r"Evaluate $\int_0^3(x-3)\,dx$ and explain what the sign of the result means.",
  "$-4.5$; the region lies below the $x$-axis", ["$4.5$; the region lies above the $x$-axis",
   "$-4.5$; the region lies above the $x$-axis", "$4.5$; the region lies below the $x$-axis"],
  r"$\left[\dfrac{x^2}{2}-3x\right]_0^3=4.5-9=-4.5$; negative means the region lies below the $x$-axis.")
m("Signed area and regions below the axis",
  r"Find the (positive) area between $y=x-3$ and the $x$-axis, from $x=0$ to $x=3$.",
  "$4.5$", ["$-4.5$", "$9$", "$3$"], r"Take the absolute value of the signed integral: $|-4.5|=4.5$.")
m("Signed area and regions below the axis",
  r"Evaluate $\int_0^4(x-4)\,dx$ and state whether the region is above or below the $x$-axis.",
  "$-8$; below", ["$8$; above", "$-8$; above", "$8$; below"],
  r"$\left[\dfrac{x^2}{2}-4x\right]_0^4=8-16=-8$; negative means below the $x$-axis.")

# --- Properties of definite integrals (5) ---
m("Properties of definite integrals", r"Given $\int_2^6 f(x)\,dx=12$, find $\int_2^6 4f(x)\,dx$.",
  "$48$", ["$16$", "$12$", "$3$"], r"$4\times12=48$.")
m("Properties of definite integrals",
  r"Given $\int_0^3 f(x)\,dx=6$ and $\int_3^7 f(x)\,dx=9$, find $\int_0^7 f(x)\,dx$.",
  "$15$", ["$3$", "$54$", "$13$"], r"$6+9=15$.")
m("Properties of definite integrals", r"Given $\int_0^5 f(x)\,dx=14$, find $\int_5^0 f(x)\,dx$.",
  "$-14$", ["$14$", "$0$", r"$\dfrac{1}{14}$"], r"Reversing the limits negates the integral: $-14$.")
m("Properties of definite integrals",
  r"Given $\int_1^5 f(x)\,dx=20$ and $\int_1^5 3\,dx=12$, find $\int_1^5[f(x)-3]\,dx$.",
  "$8$", ["$32$", "$17$", "$-8$"], r"$20-12=8$.")
m("Properties of definite integrals",
  r"Given $\int_0^4 f(x)\,dx=9$ and $\int_0^4 g(x)\,dx=5$, find $\int_0^4[f(x)+g(x)]\,dx$.",
  "$14$", ["$4$", "$45$", r"$\dfrac{9}{5}$"], r"$9+5=14$.")

# --- Finding a function from its derivative (4) ---
m("Finding a function from its derivative",
  r"A function satisfies $f'(x)=8x^3-6$ and $f(1)=3$. Find $f(x)$.",
  r"$2x^4-6x+7$", [r"$2x^4-6x+3$", r"$2x^4-6x-7$", r"$8x^4-6x+7$"],
  r"$f(x)=2x^4-6x+C$; $f(1)=2-6+C=3\Rightarrow C=7$.")
m("Finding a function from its derivative",
  r"A function satisfies $f'(x)=4x^2+3x$ and $f(0)=2$. Find $f(x)$.",
  r"$\dfrac{4x^3}{3}+1.5x^2+2$", [r"$\dfrac{4x^3}{3}+1.5x^2$", r"$4x^3+1.5x^2+2$", r"$\dfrac{4x^3}{3}+3x^2+2$"],
  r"$f(x)=\dfrac{4x^3}{3}+1.5x^2+C$; $f(0)=C=2$.")
m("Finding a function from its derivative",
  r"A function satisfies $f'(x)=6x-5$ and $f(3)=20$. Find $f(x)$.",
  r"$3x^2-5x+8$", [r"$3x^2-5x-8$", r"$3x^2-5x+20$", r"$6x^2-5x+8$"],
  r"$f(x)=3x^2-5x+C$; $f(3)=27-15+C=20\Rightarrow C=8$.")
m("Finding a function from its derivative",
  r"A function satisfies $f'(x)=2x+7$ and $f(-1)=4$. Find $f(x)$.",
  r"$x^2+7x+10$", [r"$x^2+7x-10$", r"$x^2+7x+4$", r"$2x^2+7x+10$"],
  r"$f(x)=x^2+7x+C$; $f(-1)=1-7+C=4\Rightarrow C=10$.")

# --- Average value of a function (3) ---
m("Average value of a function",
  r"Find the average value of $f(x)=x^2$ on $[0,4]$, using $\text{avg}=\dfrac{1}{b-a}\int_a^b f(x)\,dx$.",
  r"$\dfrac{16}{3}$", [r"$\dfrac{64}{3}$", "$16$", "$4$"], r"$\dfrac{1}{4}\left[\dfrac{x^3}{3}\right]_0^4=\dfrac{1}{4}\times\dfrac{64}{3}=\dfrac{16}{3}$.")
m("Average value of a function", r"Find the average value of $f(x)=3x+2$ on $[0,4]$.",
  "$8$", ["$32$", "$14$", "$4$"], r"$\dfrac{1}{4}[1.5x^2+2x]_0^4=\dfrac{1}{4}(32)=8$.")
m("Average value of a function", r"Find the average value of $f(x)=x^2-1$ on $[1,3]$.",
  r"$\dfrac{10}{3}$", [r"$\dfrac{20}{3}$", "$6$", r"$\dfrac{8}{3}$"],
  r"$\dfrac{1}{2}\left[\dfrac{x^3}{3}-x\right]_1^3=\dfrac{1}{2}\left(6-\left(-\dfrac{2}{3}\right)\right)=\dfrac{10}{3}$.")

# --- Word problems: integration in context (4) ---
m("Word problems: integration in context",
  r"A particle moves along a line with velocity $v(t)=8t-2t^2$ (m/s) for $0\leq t\leq4$. Find the particle's displacement over this interval.",
  r"$\dfrac{64}{3}$", [r"$\dfrac{192}{3}$", "$32$", "$64$"],
  r"$\int_0^4(8t-2t^2)\,dt=\left[4t^2-\dfrac{2t^3}{3}\right]_0^4=\dfrac{64}{3}$ m.")
m("Word problems: integration in context",
  r"Water flows into a tank at a rate of $r(t)=30-3t$ liters per minute, for $0\leq t\leq10$. Find the total volume of water that flows in during this time.",
  "$150$", ["$300$", "$100$", "$450$"], r"$\int_0^{10}(30-3t)\,dt=[30t-1.5t^2]_0^{10}=150$ liters.")
m("Word problems: integration in context",
  r"The graph shows a particle's velocity $v(t)=8t-2t^2$ for $0\leq t\leq4$. Find the particle's displacement (the area under the curve).",
  r"$\dfrac{64}{3}$", [r"$32$", r"$16$", "$64$"],
  r"$\int_0^4(8t-2t^2)\,dt=\dfrac{64}{3}$ m.",
  figure={"type": "plot", "fns": ["8*x-2*x**2"], "xmin": 0, "xmax": 4, "ymin": 0, "ymax": 9})
m("Word problems: integration in context",
  r"A factory's production rate is $p(t)=50+4t$ items per hour, for $0\leq t\leq8$. Find the total number of items produced during this 8-hour period.",
  "$528$", ["$400$", "$656$", "$450$"], r"$\int_0^8(50+4t)\,dt=[50t+2t^2]_0^8=528$ items.")

b.check(50)
