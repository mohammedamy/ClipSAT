# -*- coding: utf-8 -*-
"""50 new MCQs for Tahsili ch.8 — Exponentials & Logarithms. Distinct from
the existing 37 free-response questions (different bases/values
throughout)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=808)
m = b.mcq

# --- Evaluating exponential expressions (6) ---
m("Evaluating exponential expressions", r"Evaluate $3^4$.", "$81$", ["$12$", "$64$", "$243$"], r"$3^4=81$.")
m("Evaluating exponential expressions", r"Evaluate $4^{-2}$.", r"$\dfrac{1}{16}$", ["$16$", r"$-\dfrac{1}{16}$", r"$\dfrac{1}{8}$"],
  r"$4^{-2}=\dfrac{1}{4^2}=\dfrac{1}{16}$.")
m("Evaluating exponential expressions", r"Evaluate $25^{1/2}$.", "$5$", ["$12.5$", "$625$", "$50$"], r"$25^{1/2}=\sqrt{25}=5$.")
m("Evaluating exponential expressions", r"Evaluate $8^{2/3}$.", "$4$", ["$16$", "$2$", r"$5.33$"],
  r"$8^{2/3}=(8^{1/3})^2=2^2=4$.")
m("Evaluating exponential expressions", r"Evaluate $2^{-3}$.", r"$\dfrac{1}{8}$", ["$8$", r"$-8$", r"$\dfrac{1}{6}$"],
  r"$2^{-3}=\dfrac{1}{2^3}=\dfrac{1}{8}$.")
m("Evaluating exponential expressions", r"Evaluate $32^{3/5}$.", "$8$", ["$2$", "$32$", "$16$"],
  r"$32^{3/5}=(32^{1/5})^3=2^3=8$.")

# --- Evaluating logarithms (6) ---
m("Evaluating logarithms", r"Evaluate $\log_3 27$.", "$3$", ["$9$", "$27$", "$1$"], r"$3^3=27$.")
m("Evaluating logarithms", r"Evaluate $\log_2 64$.", "$6$", ["$32$", "$5$", "$8$"], r"$2^6=64$.")
m("Evaluating logarithms", r"Evaluate $\log_7 1$.", "$0$", ["$1$", "$7$", "Undefined"], r"$7^0=1$.")
m("Evaluating logarithms", r"Evaluate $\log_{10}0.001$.", "$-3$", ["$3$", "$-2$", "$0.001$"], r"$10^{-3}=0.001$.")
m("Evaluating logarithms", r"Evaluate $\log_4 16$.", "$2$", ["$4$", "$8$", "$16$"], r"$4^2=16$.")
m("Evaluating logarithms", r"Evaluate $\log_5 125$.", "$3$", ["$25$", "$5$", "$1$"], r"$5^3=125$.")

# --- Log laws: product and quotient (4) ---
m("Log laws: product and quotient", r"Write $\log_3(9x)$ as a sum of logarithms.",
  r"$2+\log_3 x$", [r"$\log_3 9+\log_3 x$ only", r"$9+\log_3 x$", r"$2\log_3 x$"],
  r"$\log_3(9x)=\log_3 9+\log_3 x=2+\log_3 x$.")
m("Log laws: product and quotient", r"Write $\log_5\left(\dfrac{x}{25}\right)$ as a difference of logarithms.",
  r"$\log_5 x-2$", [r"$\log_5 x-25$", r"$2-\log_5 x$", r"$\dfrac{\log_5 x}{2}$"],
  r"$\log_5\left(\dfrac{x}{25}\right)=\log_5 x-\log_5 25=\log_5 x-2$.")
m("Log laws: product and quotient", r"Combine $\log_2 4+\log_2 8$ into a single logarithm and evaluate.",
  "$5$", ["$32$", "$12$", "$2$"], r"$\log_2(4\times8)=\log_2 32=5$.")
m("Log laws: product and quotient", r"Combine $\log_3 54-\log_3 2$ into a single logarithm and evaluate.",
  "$3$", ["$27$", "$52$", "$26$"], r"$\log_3(54\div2)=\log_3 27=3$.")

# --- Log laws: the power rule (4) ---
m("Log laws: the power rule", r"Write $\log(x^7)$ using the power rule.", r"$7\log x$",
  [r"$x^7\log x$", r"$\log x^7$ unchanged", r"$\log(7x)$"], r"Power rule: $\log(x^n)=n\log x$.")
m("Log laws: the power rule", r"Evaluate $\log_3(9^2)$ using the power rule.", "$4$", ["$2$", "$18$", "$81$"],
  r"$2\log_3 9=2(2)=4$.")
m("Log laws: the power rule", r"Write $3\log_2 x+\log_2 y$ as a single logarithm.",
  r"$\log_2(x^3y)$", [r"$\log_2(3xy)$", r"$\log_2(x^3+y)$", r"$3\log_2(xy)$"],
  r"$3\log_2 x=\log_2(x^3)$; combined with $\log_2 y$: $\log_2(x^3y)$.")
m("Log laws: the power rule", r"Write $4\log x-\log y$ as a single logarithm.",
  r"$\log\left(\dfrac{x^4}{y}\right)$", [r"$\log(4x-y)$", r"$\log\left(\dfrac{4x}{y}\right)$", r"$4\log\left(\dfrac{x}{y}\right)$"],
  r"$4\log x=\log(x^4)$; combined: $\log\left(\dfrac{x^4}{y}\right)$.")

# --- Expanding and condensing logarithmic expressions (4) ---
m("Expanding and condensing logarithmic expressions", r"Expand $\log\left(\dfrac{x^2y}{z^3}\right)$ fully.",
  r"$2\log x+\log y-3\log z$", [r"$2\log x+\log y+3\log z$", r"$\log x^2+\log y-\log z^3$ unchanged",
   r"$2\log x-\log y-3\log z$"], r"Apply the quotient and power rules: $2\log x+\log y-3\log z$.")
m("Expanding and condensing logarithmic expressions", r"Condense $2\ln x-3\ln y$ into a single logarithm.",
  r"$\ln\left(\dfrac{x^2}{y^3}\right)$", [r"$\ln\left(\dfrac{x^2}{y}\right)-3$", r"$\ln(x^2-y^3)$",
   r"$\ln\left(\dfrac{x^3}{y^2}\right)$"], r"$2\ln x=\ln(x^2)$, $3\ln y=\ln(y^3)$: $\ln\left(\dfrac{x^2}{y^3}\right)$.")
m("Expanding and condensing logarithmic expressions", r"Expand $\log_2\left(\sqrt{x}\cdot y^4\right)$ fully.",
  r"$\dfrac{1}{2}\log_2 x+4\log_2 y$", [r"$2\log_2 x+4\log_2 y$", r"$\dfrac{1}{2}\log_2 x+\log_2 y^4$ unchanged",
   r"$\dfrac{1}{4}\log_2 x+2\log_2 y$"], r"$\sqrt{x}=x^{1/2}$: $\dfrac{1}{2}\log_2 x+4\log_2 y$.")
m("Expanding and condensing logarithmic expressions",
  r"Condense $\dfrac{1}{2}\log x+2\log y$ into a single logarithm.",
  r"$\log(\sqrt{x}\cdot y^2)$", [r"$\log(x\cdot y^2)$", r"$\log\left(\dfrac{\sqrt{x}}{y^2}\right)$",
   r"$\log(2\sqrt{x}\cdot y)$"], r"$\dfrac{1}{2}\log x=\log\sqrt{x}$; combined: $\log(\sqrt{x}\cdot y^2)$.")

# --- Solving exponential equations (matching bases) (5) ---
m("Solving exponential equations (matching bases)", r"Solve $2^x=64$.", "$x=6$", ["$x=32$", "$x=5$", "$x=8$"],
  r"$2^6=64$.")
m("Solving exponential equations (matching bases)", r"Solve $3^{x+2}=27$.", "$x=1$", ["$x=3$", "$x=5$", "$x=9$"],
  r"$3^{x+2}=3^3\Rightarrow x+2=3\Rightarrow x=1$.")
m("Solving exponential equations (matching bases)", r"Solve $5^{3x}=125$.", "$x=1$", ["$x=3$", r"$x=\dfrac{1}{3}$", "$x=41.67$"],
  r"$5^{3x}=5^3\Rightarrow3x=3\Rightarrow x=1$.")
m("Solving exponential equations (matching bases)", r"Solve $4^x=\dfrac{1}{16}$.", "$x=-2$", ["$x=2$", "$x=-4$", "$x=4$"],
  r"$4^x=4^{-2}\Rightarrow x=-2$.")
m("Solving exponential equations (matching bases)", r"Solve $2^{2x-1}=32$.", "$x=3$", ["$x=2.5$", "$x=6$", "$x=5.5$"],
  r"$2^{2x-1}=2^5\Rightarrow2x-1=5\Rightarrow x=3$.")

# --- Solving exponential equations using logarithms (4) ---
m("Solving exponential equations using logarithms", r"Solve $2^x=12$ for $x$, rounded to three decimal places.",
  "$3.585$", ["$3.170$", "$2.485$", "$4.000$"], r"$x=\dfrac{\ln12}{\ln2}\approx3.585$.")
m("Solving exponential equations using logarithms", r"Solve $7^x=50$ for $x$, rounded to three decimal places.",
  "$2.010$", ["$1.505$", "$3.000$", "$7.143$"], r"$x=\dfrac{\ln50}{\ln7}\approx2.010$.")
m("Solving exponential equations using logarithms", r"Solve $4^{2x}=90$ for $x$, rounded to three decimal places.",
  "$1.623$", ["$3.246$", "$0.811$", "$6.492$"], r"$2x=\dfrac{\ln90}{\ln4}\approx3.246\Rightarrow x\approx1.623$.")
m("Solving exponential equations using logarithms", r"Solve $e^x=25$ for $x$, rounded to three decimal places.",
  "$3.219$", ["$12.500$", "$2.303$", "$25.000$"], r"$x=\ln25\approx3.219$.")

# --- Solving logarithmic equations (4) ---
m("Solving logarithmic equations", r"Solve $\log_3(x)=4$.", "$x=81$", ["$x=12$", "$x=64$", "$x=7$"], r"$3^4=81$.")
m("Solving logarithmic equations", r"Solve $\log_2(x-1)=3$.", "$x=9$", ["$x=8$", "$x=7$", "$x=6$"],
  r"$x-1=2^3=8\Rightarrow x=9$.")
m("Solving logarithmic equations", r"Solve $\log(x)+\log(x-3)=1$.", "$x=5$", ["$x=-2$", "$x=10$", "$x=13$"],
  r"$\log(x(x-3))=1\Rightarrow x^2-3x-10=0\Rightarrow(x-5)(x+2)=0$; only $x=5$ keeps both logs defined.")
m("Solving logarithmic equations", r"Solve $\log_2(x+2)+\log_2(x-2)=5$.", "$x=6$", ["$x=-6$", "$x=34$", "$x=18$"],
  r"$(x+2)(x-2)=2^5=32\Rightarrow x^2-4=32\Rightarrow x^2=36$; only $x=6$ keeps both logs defined.")

# --- Natural logarithms and e (4) ---
m("Natural logarithms and e", r"Evaluate $\ln(e^5)$.", "$5$", ["$e^5$", "$1$", "$0$"], r"$\ln(e^x)=x$.")
m("Natural logarithms and e", r"Evaluate $\ln\left(\dfrac{1}{e}\right)$.", "$-1$", ["$1$", "$0$", "$e$"],
  r"$\ln(e^{-1})=-1$.")
m("Natural logarithms and e", r"Solve $\ln(x)=3$ for $x$, in terms of $e$.", "$x=e^3$", ["$x=3e$", r"$x=e^{1/3}$",
   "$x=3$"], r"$\ln(x)=3\Rightarrow x=e^3$.")
m("Natural logarithms and e", r"Evaluate $e^{\ln7}$.", "$7$", ["$e^7$", r"$\ln7$", "$1$"], r"$e^{\ln x}=x$.")

# --- Exponential growth and decay models (5) ---
m("Exponential growth and decay models",
  r"The population of a town is modeled by $P(t)=8{,}000e^{0.025t}$, where $t$ is in years. Find $P(15)$, rounded to the nearest whole number.",
  r"$11{,}640$", [r"$8{,}300$", r"$12{,}000$", r"$11{,}000$"], r"$P(15)=8{,}000e^{0.375}\approx11{,}640$.")
m("Exponential growth and decay models",
  r"A radioactive substance decays according to $A(t)=150e^{-0.04t}$ (grams). Find $A(25)$, rounded to one decimal place.",
  "$55.2$", ["$50.0$", "$75.0$", "$60.7$"], r"$A(25)=150e^{-1}\approx55.2$ g.")
m("Exponential growth and decay models", r"Determine whether $N(t)=80e^{-0.015t}$ models growth or decay.",
  "Decay", ["Growth", "Neither", "Cannot be determined"], r"The exponent's coefficient is negative: decay.")
m("Exponential growth and decay models", r"Determine whether $M(t)=30e^{0.01t}$ models growth or decay.",
  "Growth", ["Decay", "Neither", "Cannot be determined"], r"The exponent's coefficient is positive: growth.")
m("Exponential growth and decay models",
  r"The graph shows an exponential function. Based on the graph, does it represent growth or decay?",
  "Growth", ["Decay", "Neither", "Cannot be determined"], r"The curve rises as $x$ increases: growth.",
  figure={"type": "plot", "fns": ["2**x"], "xmin": -2, "xmax": 3, "ymin": 0, "ymax": 9})

# --- Word problems: exponential models in context (5) ---
m("Word problems: exponential models in context",
  r"An investment of 3,000 dollars grows according to $A(t)=3{,}000e^{0.05t}$ dollars, where $t$ is in years. Find the investment's value after 8 years, rounded to the nearest dollar.",
  r"$4{,}475$", [r"$3{,}400$", r"$4{,}200$", r"$4{,}800$"], r"$A(8)=3{,}000e^{0.4}\approx4{,}475$ dollars.")
m("Word problems: exponential models in context",
  r"A cup of coffee cools according to $T(t)=22+70e^{-0.08t}$ (°C), where $t$ is in minutes. Find the temperature after 15 minutes, rounded to one decimal place.",
  r"$43.1^\circ$C", [r"$38.5^\circ$C", r"$50.0^\circ$C", r"$22.0^\circ$C"], r"$T(15)=22+70e^{-1.2}\approx43.1^\circ$C.")
m("Word problems: exponential models in context",
  r"A population of bacteria doubles every 3 hours, starting at 500. Using $P(t)=500\cdot2^{t/3}$, find the population after 9 hours.",
  r"$4{,}000$", [r"$1{,}500$", r"$2{,}000$", r"$8{,}000$"], r"$P(9)=500\times2^3=4{,}000$.")
m("Word problems: exponential models in context",
  r"The value of a car depreciates according to $V(t)=25{,}000(0.85)^t$ dollars, where $t$ is in years. Find the car's value after 5 years, rounded to the nearest dollar.",
  r"$11{,}093$", [r"$10{,}625$", r"$12{,}750$", r"$9{,}500$"], r"$V(5)=25{,}000(0.85)^5\approx11{,}093$ dollars.")
b.check(50)
