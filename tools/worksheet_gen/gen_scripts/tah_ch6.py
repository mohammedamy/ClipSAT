# -*- coding: utf-8 -*-
"""50 new MCQs for Tahsili ch.6 — Limits & Derivatives. Distinct from the
existing 37 free-response questions (different functions/values
throughout). Calculus is fundamentally symbolic, so this chapter's figure
share is deliberately low, balanced by geometry/trig-heavy chapters."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=606)
m = b.mcq

# --- Evaluating limits by direct substitution (5) ---
m("Evaluating limits by direct substitution", r"Evaluate $\lim_{x\to3}(2x^2-5x+3)$.",
  "$6$", ["$18$", "$-6$", "$12$"], r"$2(9)-5(3)+3=18-15+3=6$.")
m("Evaluating limits by direct substitution", r"Evaluate $\lim_{x\to-2}(x^3-3x+4)$.",
  "$2$", ["$-2$", "$-10$", "$10$"], r"$(-2)^3-3(-2)+4=-8+6+4=2$.")
m("Evaluating limits by direct substitution", r"Evaluate $\lim_{x\to1}\dfrac{4x+9}{x+5}$.",
  r"$\dfrac{13}{6}$", [r"$\dfrac{13}{5}$", r"$\dfrac{9}{5}$", r"$\dfrac{4}{5}$"], r"$\dfrac{4(1)+9}{1+5}=\dfrac{13}{6}$.")
m("Evaluating limits by direct substitution", r"Evaluate $\lim_{x\to6}\sqrt{x+10}$.",
  "$4$", ["$16$", r"$\sqrt{16}$", "$8$"], r"$\sqrt{6+10}=\sqrt{16}=4$.")
m("Evaluating limits by direct substitution", r"Evaluate $\lim_{x\to4}\dfrac{x^2-3x}{2x+1}$.",
  r"$\dfrac{4}{9}$", [r"$\dfrac{4}{8}$", r"$\dfrac{16}{9}$", r"$\dfrac{4}{7}$"], r"$\dfrac{16-12}{9}=\dfrac{4}{9}$.")

# --- Evaluating limits by factoring (the 0/0 form) (5) ---
m("Evaluating limits by factoring (the 0/0 form)", r"Evaluate $\lim_{x\to4}\dfrac{x^2-16}{x-4}$.",
  "$8$", ["$0$", "$4$", "$16$"], r"$\dfrac{(x-4)(x+4)}{x-4}\to x+4=8$.")
m("Evaluating limits by factoring (the 0/0 form)", r"Evaluate $\lim_{x\to-3}\dfrac{x^2+7x+12}{x+3}$.",
  "$1$", ["$-1$", "$7$", "$4$"], r"$\dfrac{(x+3)(x+4)}{x+3}\to x+4=1$.")
m("Evaluating limits by factoring (the 0/0 form)", r"Evaluate $\lim_{x\to5}\dfrac{x^2-25}{x-5}$.",
  "$10$", ["$0$", "$5$", "$25$"], r"$\dfrac{(x-5)(x+5)}{x-5}\to x+5=10$.")
m("Evaluating limits by factoring (the 0/0 form)", r"Evaluate $\lim_{x\to2}\dfrac{x^2-4}{x^2-5x+6}$.",
  "$-4$", ["$4$", "$-1$", r"$\dfrac{4}{3}$"],
  r"$\dfrac{(x-2)(x+2)}{(x-2)(x-3)}\to\dfrac{x+2}{x-3}=\dfrac{4}{-1}=-4$.")
m("Evaluating limits by factoring (the 0/0 form)", r"Evaluate $\lim_{x\to-1}\dfrac{x^2-1}{x^2+3x+2}$.",
  "$-2$", ["$2$", "$-1$", r"$-\dfrac{1}{2}$"],
  r"$\dfrac{(x-1)(x+1)}{(x+1)(x+2)}\to\dfrac{x-1}{x+2}=\dfrac{-2}{1}=-2$.")

# --- Limits at infinity (4) ---
m("Limits at infinity", r"Evaluate $\lim_{x\to\infty}\dfrac{4x^2+3x}{2x^2-7}$.",
  "$2$", ["$4$", r"$\dfrac{3}{7}$", "$0$"], r"Same degree: ratio of leading coefficients $=\dfrac{4}{2}=2$.")
m("Limits at infinity", r"Evaluate $\lim_{x\to\infty}\dfrac{3x+5}{x^2+2}$.",
  "$0$", ["$3$", r"$\dfrac{5}{2}$", r"$\infty$"], r"The denominator's degree is higher: the limit is $0$.")
m("Limits at infinity", r"Evaluate $\lim_{x\to\infty}\dfrac{7x^3-1}{x^3+3x}$.",
  "$7$", ["$1$", "$0$", "$-1$"], r"Same degree: ratio of leading coefficients $=\dfrac{7}{1}=7$.")
m("Limits at infinity", r"Evaluate $\lim_{x\to\infty}\dfrac{2x^2+1}{5x^3-4}$.",
  "$0$", [r"$\dfrac{2}{5}$", "$5$", r"$\infty$"], r"The denominator's degree is higher: the limit is $0$.")

# --- One-sided limits (5) ---
m("One-sided limits",
  r"A function is defined by $f(x)=x+2$ for $x<3$, and $f(x)=3x-4$ for $x\geq3$. Find $\lim_{x\to3^-}f(x)$.",
  "$5$", ["$4$", "$3$", "$9$"], r"Using $x<3$: $f(x)\to3+2=5$.")
m("One-sided limits", r"Using the same piecewise function, find $\lim_{x\to3^+}f(x)$.",
  "$5$", ["$4$", "$9$", "$3$"], r"Using $x\geq3$: $f(x)\to3(3)-4=5$.")
m("One-sided limits", r"Using the same piecewise function, does $\lim_{x\to3}f(x)$ exist? State its value.",
  "Yes, it equals $5$", ["No, it does not exist", "Yes, it equals $4$", "Yes, it equals $9$"],
  r"Since the left and right limits both equal $5$, the two-sided limit exists and equals $5$.")
m("One-sided limits",
  r"A function is defined by $f(x)=2x$ for $x\leq1$, and $f(x)=x+3$ for $x>1$. Find $\lim_{x\to1^-}f(x)$.",
  "$2$", ["$4$", "$1$", "$3$"], r"Using $x\leq1$: $f(x)\to2(1)=2$.")
m("One-sided limits",
  r"Using the same piecewise function, find $\lim_{x\to1^+}f(x)$, and state whether $\lim_{x\to1}f(x)$ exists.",
  "$4$; does not exist", ["$4$; exists", "$2$; exists", "$2$; does not exist"],
  r"Right limit $=1+3=4$. Since the left limit ($2$) differs from the right limit ($4$), the two-sided limit does not exist.")

# --- The power rule (5) ---
m("The power rule", r"Differentiate $f(x)=x^7$.", r"$7x^6$", [r"$x^6$", r"$7x^8$", r"$6x^7$"], r"Power rule: $7x^{7-1}=7x^6$.")
m("The power rule", r"Differentiate $f(x)=4x^5-3x^3+2x$.", r"$20x^4-9x^2+2$",
  [r"$20x^4-9x^2$", r"$4x^4-3x^2+2$", r"$20x^4-3x^2+2$"], r"Differentiate each term: $20x^4-9x^2+2$.")
m("The power rule", r"Differentiate $f(x)=\sqrt{x}$.", r"$\dfrac{1}{2\sqrt{x}}$",
  [r"$\dfrac{1}{2}\sqrt{x}$", r"$2\sqrt{x}$", r"$\dfrac{1}{\sqrt{x}}$"],
  r"$f(x)=x^{1/2}\Rightarrow f'(x)=\dfrac{1}{2}x^{-1/2}=\dfrac{1}{2\sqrt{x}}$.")
m("The power rule", r"Differentiate $f(x)=\dfrac{1}{x^3}$.", r"$-\dfrac{3}{x^4}$",
  [r"$\dfrac{3}{x^4}$", r"$-\dfrac{1}{3x^4}$", r"$-\dfrac{3}{x^2}$"],
  r"$f(x)=x^{-3}\Rightarrow f'(x)=-3x^{-4}=-\dfrac{3}{x^4}$.")
m("The power rule", r"Differentiate $f(x)=6x^2-4x+9$.", r"$12x-4$", [r"$12x-4x$", r"$6x-4$", r"$12x+9$"],
  r"Differentiate each term: $12x-4$.")

# --- The product rule (5) ---
m("The product rule", r"Differentiate $f(x)=x^3(2x+5)$ using the product rule.",
  r"$8x^3+15x^2$", [r"$2x^3+15x^2$", r"$8x^3+5x^2$", r"$6x^2+5$"],
  r"$f'(x)=3x^2(2x+5)+x^3(2)=6x^3+15x^2+2x^3=8x^3+15x^2$.")
m("The product rule", r"Differentiate $f(x)=(x+3)(x-7)$ using the product rule.",
  r"$2x-4$", [r"$2x+4$", r"$x-4$", r"$2x-10$"], r"$f'(x)=(x-7)+(x+3)=2x-4$.")
m("The product rule", r"Differentiate $f(x)=(3x-2)(x^2+4)$ using the product rule.",
  r"$9x^2-4x+12$", [r"$9x^2+12$", r"$3x^2-4x+12$", r"$6x^2-4x+12$"],
  r"$f'(x)=3(x^2+4)+(3x-2)(2x)=3x^2+12+6x^2-4x=9x^2-4x+12$.")
m("The product rule", r"Differentiate $f(x)=(x^2+1)(x^2-1)$ using the product rule.",
  r"$4x^3$", [r"$2x^3$", r"$4x$", r"$4x^3-2x$"],
  r"$f'(x)=2x(x^2-1)+(x^2+1)(2x)=2x^3-2x+2x^3+2x=4x^3$.")
m("The product rule", r"Differentiate $f(x)=x^2(x^3-4)$ using the product rule.",
  r"$5x^4-8x$", [r"$3x^4-8x$", r"$5x^4-4$", r"$5x^4-8$"],
  r"$f'(x)=2x(x^3-4)+x^2(3x^2)=2x^4-8x+3x^4=5x^4-8x$.")

# --- The chain rule (5) ---
m("The chain rule", r"Differentiate $f(x)=(2x+3)^5$.", r"$10(2x+3)^4$", [r"$5(2x+3)^4$", r"$10(2x+3)^5$",
   r"$2(2x+3)^4$"], r"$f'(x)=5(2x+3)^4\cdot2=10(2x+3)^4$.")
m("The chain rule", r"Differentiate $f(x)=(x^2-3)^4$.", r"$8x(x^2-3)^3$", [r"$4(x^2-3)^3$", r"$4x(x^2-3)^3$",
   r"$8x(x^2-3)^4$"], r"$f'(x)=4(x^2-3)^3\cdot2x=8x(x^2-3)^3$.")
m("The chain rule", r"Differentiate $f(x)=\sqrt{5x+1}$.", r"$\dfrac{5}{2\sqrt{5x+1}}$",
  [r"$\dfrac{1}{2\sqrt{5x+1}}$", r"$\dfrac{5}{\sqrt{5x+1}}$", r"$5\sqrt{5x+1}$"],
  r"$f'(x)=\dfrac{1}{2\sqrt{5x+1}}\cdot5=\dfrac{5}{2\sqrt{5x+1}}$.")
m("The chain rule", r"Differentiate $f(x)=(4-3x)^5$.", r"$-15(4-3x)^4$", [r"$15(4-3x)^4$", r"$-5(4-3x)^4$",
   r"$-3(4-3x)^4$"], r"$f'(x)=5(4-3x)^4\cdot(-3)=-15(4-3x)^4$.")
m("The chain rule", r"Differentiate $f(x)=(x^3+2)^2$.", r"$6x^2(x^3+2)$", [r"$2(x^3+2)$", r"$3x^2(x^3+2)$",
   r"$6x^2(x^3+2)^2$"], r"$f'(x)=2(x^3+2)\cdot3x^2=6x^2(x^3+2)$.")

# --- Derivatives of trigonometric and exponential functions (4) ---
m("Derivatives of trigonometric and exponential functions", r"Differentiate $f(x)=\cos x-\sin x$.",
  r"$-\sin x-\cos x$", [r"$\sin x+\cos x$", r"$-\sin x+\cos x$", r"$\sin x-\cos x$"],
  r"$\dfrac{d}{dx}[\cos x]=-\sin x$, $\dfrac{d}{dx}[-\sin x]=-\cos x$.")
m("Derivatives of trigonometric and exponential functions", r"Differentiate $f(x)=5\cos x$.",
  r"$-5\sin x$", [r"$5\sin x$", r"$-5\cos x$", r"$5\cos x$"], r"$\dfrac{d}{dx}[5\cos x]=-5\sin x$.")
m("Derivatives of trigonometric and exponential functions", r"Differentiate $f(x)=e^x-x^3$.",
  r"$e^x-3x^2$", [r"$e^x-3x$", r"$xe^{x-1}-3x^2$", r"$e^x-x^2$"], r"$\dfrac{d}{dx}[e^x]=e^x$, $\dfrac{d}{dx}[-x^3]=-3x^2$.")
m("Derivatives of trigonometric and exponential functions", r"Differentiate $f(x)=2e^x+\sin x$.",
  r"$2e^x+\cos x$", [r"$2e^x-\cos x$", r"$e^x+\cos x$", r"$2e^x+\sin x$"],
  r"$\dfrac{d}{dx}[2e^x]=2e^x$, $\dfrac{d}{dx}[\sin x]=\cos x$.")

# --- Tangent lines (5) ---
m("Tangent lines", r"Find the slope of the tangent line to $f(x)=x^2$ at $x=4$.",
  "$8$", ["$16$", "$4$", "$2$"], r"$f'(x)=2x$; $f'(4)=8$.")
m("Tangent lines", r"Find the equation of the tangent line to $f(x)=x^2$ at $x=3$.",
  "$y=6x-9$", ["$y=6x+9$", "$y=9x-6$", "$y=3x-9$"], r"$f(3)=9$, $f'(3)=6$: $y-9=6(x-3)\Rightarrow y=6x-9$.")
m("Tangent lines",
  r"The graph of $f(x)=x^2-2x$ is shown, with the point at $x=3$ marked. Find the equation of the tangent line there.",
  "$y=4x-9$", ["$y=4x-3$", "$y=3x-9$", "$y=4x+9$"], r"$f(3)=3$, $f'(3)=4$: $y-3=4(x-3)\Rightarrow y=4x-9$.",
  figure={"type": "plot", "fns": ["x**2-2*x"], "xmin": -1, "xmax": 5, "ymin": -2, "ymax": 10,
          "points": [[3, 3]]})
m("Tangent lines", r"Find the $x$-coordinate(s) where the tangent to $f(x)=x^3-12x$ is horizontal.",
  "$x=2$ and $x=-2$", ["$x=2$ only", "$x=4$ and $x=-4$", "$x=0$"],
  r"$f'(x)=3x^2-12=0\Rightarrow x^2=4\Rightarrow x=\pm2$.")
m("Tangent lines",
  r"The graph shows $f(x)=x^2$ and its tangent line at $x=2$. Find the slope of the tangent line by reading the graph.",
  "$4$", ["$2$", "$1$", "$8$"], r"The tangent line rises $4$ for every $1$ across.",
  figure={"type": "plot", "fns": ["x**2", "4*x-4"], "xmin": 0, "xmax": 4, "ymin": -1, "ymax": 10})

# --- Increasing, decreasing, and the second derivative (4) ---
m("Increasing, decreasing, and the second derivative",
  r"For $f(x)=x^2-6x+3$, find $f'(x)$ and determine the interval where $f$ is increasing.",
  r"$f'(x)=2x-6$; increasing for $x>3$", [r"$f'(x)=2x-6$; increasing for $x<3$", r"$f'(x)=2x$; increasing for $x>3$",
   r"$f'(x)=2x-6$; increasing for $x>6$"], r"$f'(x)=2x-6>0\Rightarrow x>3$.")
m("Increasing, decreasing, and the second derivative",
  r"For $f(x)=-x^2+8x$, determine the interval where $f$ is decreasing.",
  "$x>4$", ["$x<4$", "$x>8$", "$x<8$"], r"$f'(x)=-2x+8<0\Rightarrow x>4$.")
m("Increasing, decreasing, and the second derivative", r"Find the second derivative of $f(x)=x^5-3x^3$.",
  r"$20x^3-18x$", [r"$5x^4-9x^2$", r"$20x^3-9x$", r"$20x^2-18x$"],
  r"$f'(x)=5x^4-9x^2$; $f''(x)=20x^3-18x$.")
m("Increasing, decreasing, and the second derivative", r"Find the second derivative of $f(x)=x^4+2x^2$.",
  r"$12x^2+4$", [r"$4x^3+4x$", r"$12x^2+4x$", r"$12x^2$"], r"$f'(x)=4x^3+4x$; $f''(x)=12x^2+4$.")

# --- Word problems: rates of change (3) ---
m("Word problems: rates of change",
  r"The height of a ball thrown upward is given by $h(t)=-5t^2+30t+3$ (in meters). Find the ball's velocity at $t=2$ seconds.",
  "$10$", ["$-10$", "$20$", "$30$"], r"$h'(t)=-10t+30$; $h'(2)=10$ m/s.")
m("Word problems: rates of change",
  r"A company's cost to produce $x$ items is $C(x)=0.02x^2+8x+150$ (in dollars). Find the marginal cost at $x=100$.",
  "$12$ dollars", ["$8$ dollars", "$4$ dollars", "$20$ dollars"], r"$C'(x)=0.04x+8$; $C'(100)=12$.")
m("Word problems: rates of change",
  r"The height of a ball thrown upward is given by $h(t)=-5t^2+30t+3$ (in meters). Find the time at which the ball reaches its maximum height.",
  "$t=3$", ["$t=6$", "$t=2$", "$t=5$"], r"$h'(t)=-10t+30=0\Rightarrow t=3$ seconds.")

b.check(50)
