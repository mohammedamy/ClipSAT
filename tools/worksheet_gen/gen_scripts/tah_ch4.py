# -*- coding: utf-8 -*-
"""50 new MCQs for Tahsili ch.4 — Trigonometry. Distinct from the existing
39 free-response questions (different angles/triangles/values throughout)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=404)
m = b.mcq

# --- Right-triangle trigonometric ratios (5) ---
m("Right-triangle trigonometric ratios",
  r"In the right triangle shown, angle $\theta$ has opposite side $8$ and hypotenuse $17$. Find $\sin\theta$.",
  r"$\dfrac{8}{17}$", [r"$\dfrac{15}{17}$", r"$\dfrac{17}{8}$", r"$\dfrac{8}{15}$"],
  r"$\sin\theta=\dfrac{\text{opposite}}{\text{hypotenuse}}=\dfrac{8}{17}$.",
  figure={"type": "triangle", "vertices": [[0, 0], [15, 0], [15, 8]],
          "right_angle_at": 1, "side_labels": ["15", "8", "17"]})
m("Right-triangle trigonometric ratios",
  r"In a right triangle, angle $\theta$ has opposite side $9$ and hypotenuse $41$. Find $\cos\theta$.",
  r"$\dfrac{40}{41}$", [r"$\dfrac{9}{41}$", r"$\dfrac{41}{40}$", r"$\dfrac{9}{40}$"],
  r"Adjacent $=\sqrt{41^2-9^2}=40$; $\cos\theta=\dfrac{40}{41}$.")
m("Right-triangle trigonometric ratios",
  r"In a right triangle, angle $\theta$ has adjacent side $20$ and hypotenuse $29$. Find $\sin\theta$.",
  r"$\dfrac{21}{29}$", [r"$\dfrac{20}{29}$", r"$\dfrac{29}{21}$", r"$\dfrac{21}{20}$"],
  r"Opposite $=\sqrt{29^2-20^2}=21$; $\sin\theta=\dfrac{21}{29}$.")
m("Right-triangle trigonometric ratios",
  r"In the right triangle shown, the two legs are $9$ and $40$, and the hypotenuse is $41$. Find $\sin\theta$ and $\cos\theta$ (where $\theta$ is opposite the side of length $9$).",
  r"$\sin\theta=\dfrac{9}{41}$, $\cos\theta=\dfrac{40}{41}$",
  [r"$\sin\theta=\dfrac{40}{41}$, $\cos\theta=\dfrac{9}{41}$",
   r"$\sin\theta=\dfrac{9}{40}$, $\cos\theta=\dfrac{40}{9}$",
   r"$\sin\theta=\dfrac{41}{9}$, $\cos\theta=\dfrac{41}{40}$"],
  r"Opposite $=9$, adjacent $=40$, hypotenuse $=41$.",
  figure={"type": "triangle", "vertices": [[0, 0], [40, 0], [40, 9]],
          "right_angle_at": 1, "side_labels": ["40", "9", "41"]})
m("Right-triangle trigonometric ratios",
  r"In a right triangle, angle $\theta$ has opposite side $7$ and adjacent side $24$. Find $\tan\theta$.",
  r"$\dfrac{7}{24}$", [r"$\dfrac{24}{7}$", r"$\dfrac{7}{25}$", r"$\dfrac{24}{25}$"],
  r"$\tan\theta=\dfrac{\text{opposite}}{\text{adjacent}}=\dfrac{7}{24}$.")

# --- Special angles (5) ---
m("Special angles", r"State the exact value of $\cos(30^\circ)$.", r"$\dfrac{\sqrt{3}}{2}$",
  [r"$\dfrac{1}{2}$", r"$\dfrac{\sqrt{2}}{2}$", "$1$"], r"$\cos(30^\circ)=\dfrac{\sqrt{3}}{2}$.")
m("Special angles", r"State the exact value of $\sin(45^\circ)$.", r"$\dfrac{\sqrt{2}}{2}$",
  [r"$\dfrac{1}{2}$", r"$\dfrac{\sqrt{3}}{2}$", "$1$"], r"$\sin(45^\circ)=\dfrac{\sqrt{2}}{2}$.")
m("Special angles", r"State the exact value of $\tan(30^\circ)$.", r"$\dfrac{\sqrt{3}}{3}$",
  [r"$\dfrac{\sqrt{3}}{2}$", "$\\sqrt{3}$", r"$\dfrac{1}{2}$"],
  r"$\tan(30^\circ)=\dfrac{\sin(30^\circ)}{\cos(30^\circ)}=\dfrac{1/2}{\sqrt{3}/2}=\dfrac{1}{\sqrt{3}}=\dfrac{\sqrt{3}}{3}$.")
m("Special angles", r"State the exact values of $\cos(90^\circ)$ and $\sin(0^\circ)$.",
  "Both equal $0$", ["Both equal $1$", r"$\cos(90^\circ)=1$, $\sin(0^\circ)=0$",
   r"$\cos(90^\circ)=0$, $\sin(0^\circ)=1$"], r"$\cos(90^\circ)=0$ and $\sin(0^\circ)=0$.")
m("Special angles", r"State the exact value of $\tan(45^\circ)$.", "$1$", ["$0$", r"$\sqrt{2}$", "Undefined"],
  r"$\tan(45^\circ)=\dfrac{\sin(45^\circ)}{\cos(45^\circ)}=1$.")

# --- Converting between radians and degrees (4) ---
m("Converting between radians and degrees", r"Convert $360^\circ$ to radians.", r"$2\pi$",
  [r"$\pi$", r"$\dfrac{\pi}{2}$", r"$4\pi$"], r"$360\times\dfrac{\pi}{180}=2\pi$.")
m("Converting between radians and degrees", r"Convert $45^\circ$ to radians.", r"$\dfrac{\pi}{4}$",
  [r"$\dfrac{\pi}{2}$", r"$\dfrac{\pi}{6}$", r"$\dfrac{\pi}{8}$"], r"$45\times\dfrac{\pi}{180}=\dfrac{\pi}{4}$.")
m("Converting between radians and degrees", r"Convert $\dfrac{3\pi}{4}$ radians to degrees.",
  r"$135^\circ$", [r"$120^\circ$", r"$150^\circ$", r"$270^\circ$"], r"$\dfrac{3\pi}{4}\times\dfrac{180}{\pi}=135^\circ$.")
m("Converting between radians and degrees", r"Convert $210^\circ$ to radians.", r"$\dfrac{7\pi}{6}$",
  [r"$\dfrac{7\pi}{3}$", r"$\dfrac{5\pi}{6}$", r"$\dfrac{7\pi}{12}$"], r"$210\times\dfrac{\pi}{180}=\dfrac{7\pi}{6}$.")

# --- The Pythagorean identity (4) ---
m("The Pythagorean identity",
  r"Given $\sin\theta=\dfrac{4}{5}$ with $\theta$ acute, find $\cos\theta$.",
  r"$\dfrac{3}{5}$", [r"$\dfrac{4}{5}$", r"$\dfrac{9}{25}$", r"$\dfrac{5}{3}$"],
  r"$\cos^2\theta=1-\dfrac{16}{25}=\dfrac{9}{25}\Rightarrow\cos\theta=\dfrac{3}{5}$.")
m("The Pythagorean identity",
  r"Given $\cos\theta=\dfrac{7}{25}$ with $\theta$ acute, find $\sin\theta$.",
  r"$\dfrac{24}{25}$", [r"$\dfrac{7}{25}$", r"$\dfrac{576}{625}$", r"$\dfrac{25}{24}$"],
  r"$\sin^2\theta=1-\dfrac{49}{625}=\dfrac{576}{625}\Rightarrow\sin\theta=\dfrac{24}{25}$.")
m("The Pythagorean identity", r"Given $\sin\theta=0.8$, find $\cos^2\theta$.",
  "$0.36$", ["$0.64$", "$0.2$", "$0.8$"], r"$\cos^2\theta=1-0.8^2=1-0.64=0.36$.")
m("The Pythagorean identity",
  r"Given $\cos\theta=\dfrac{12}{13}$ with $\theta$ acute, find $\sin\theta$.",
  r"$\dfrac{5}{13}$", [r"$\dfrac{12}{13}$", r"$\dfrac{25}{169}$", r"$\dfrac{13}{5}$"],
  r"$\sin^2\theta=1-\dfrac{144}{169}=\dfrac{25}{169}\Rightarrow\sin\theta=\dfrac{5}{13}$.")

# --- Simplifying trigonometric expressions (4) ---
m("Simplifying trigonometric expressions", r"Simplify $\sin^2\theta+\cos^2\theta-1$.",
  "$0$", ["$1$", "$2$", r"$2\sin^2\theta$"], r"By the Pythagorean identity, $\sin^2\theta+\cos^2\theta=1$, so this is $0$.")
m("Simplifying trigonometric expressions", r"Simplify $\dfrac{1-\sin^2\theta}{\cos\theta}$ (for $\cos\theta\neq0$).",
  r"$\cos\theta$", [r"$\sin\theta$", r"$\dfrac{1}{\cos\theta}$", r"$1-\cos\theta$"],
  r"$1-\sin^2\theta=\cos^2\theta$, so $\dfrac{\cos^2\theta}{\cos\theta}=\cos\theta$.")
m("Simplifying trigonometric expressions", r"Simplify $\dfrac{\sin\theta}{\tan\theta}$ (for $\tan\theta\neq0$).",
  r"$\cos\theta$", [r"$\sin\theta$", r"$1$", r"$\dfrac{1}{\cos\theta}$"],
  r"$\tan\theta=\dfrac{\sin\theta}{\cos\theta}$, so $\dfrac{\sin\theta}{\sin\theta/\cos\theta}=\cos\theta$.")
m("Simplifying trigonometric expressions", r"Simplify $2\sin^2\theta+2\cos^2\theta$.",
  "$2$", ["$1$", "$0$", r"$4\sin\theta\cos\theta$"], r"$2(\sin^2\theta+\cos^2\theta)=2(1)=2$.")

# --- Graphs: amplitude and period (5) ---
m("Graphs: amplitude and period", r"State the amplitude and period of $y=4\sin(x)$.",
  r"Amplitude $4$, period $2\pi$", [r"Amplitude $2\pi$, period $4$", r"Amplitude $4$, period $\pi$",
   r"Amplitude $1$, period $4$"], r"For $y=A\sin(Bx)$ with $B=1$: amplitude $=4$, period $=\dfrac{2\pi}{1}=2\pi$.")
m("Graphs: amplitude and period", r"State the amplitude and period of $y=2\cos(3x)$.",
  r"Amplitude $2$, period $\dfrac{2\pi}{3}$", [r"Amplitude $3$, period $\dfrac{2\pi}{2}$",
   r"Amplitude $2$, period $6\pi$", r"Amplitude $6$, period $2\pi$"],
  r"Amplitude $=2$; period $=\dfrac{2\pi}{3}$.")
m("Graphs: amplitude and period", r"State the amplitude and period of $y=5\sin\left(\dfrac{x}{2}\right)$.",
  r"Amplitude $5$, period $4\pi$", [r"Amplitude $\dfrac{5}{2}$, period $2\pi$", r"Amplitude $5$, period $\pi$",
   r"Amplitude $2$, period $4\pi$"], r"$B=\dfrac{1}{2}$: period $=\dfrac{2\pi}{1/2}=4\pi$; amplitude $=5$.")
m("Graphs: amplitude and period",
  r"A cosine graph has amplitude $3$ and period $4\pi$. Write its equation in the form $y=A\cos(Bx)$.",
  r"$y=3\cos\left(\dfrac{x}{2}\right)$", [r"$y=3\cos(4\pi x)$", r"$y=4\pi\cos(3x)$", r"$y=3\cos(2x)$"],
  r"$B=\dfrac{2\pi}{\text{period}}=\dfrac{2\pi}{4\pi}=\dfrac{1}{2}$.")
m("Graphs: amplitude and period",
  r"The graph shows $y=A\sin(x)$ for some $A$. Find $A$ by reading the graph's amplitude.",
  "$A=2$", ["$A=1$", "$A=4$", r"$A=2\pi$"], r"The curve's peak height (amplitude) is $2$.",
  figure={"type": "plot", "fns": ["2*sin(x)"], "xmin": -0.5, "xmax": 6.5, "ymin": -3, "ymax": 3})

# --- Graphs: phase shift and vertical shift (4) ---
m("Graphs: phase shift and vertical shift",
  r"The graph of $y=\cos(x)$ is shifted $\dfrac{\pi}{4}$ to the right and 3 units up. Write the new equation.",
  r"$y=\cos\left(x-\dfrac{\pi}{4}\right)+3$", [r"$y=\cos\left(x+\dfrac{\pi}{4}\right)+3$",
   r"$y=\cos\left(x-\dfrac{\pi}{4}\right)-3$", r"$y=\cos(x)+\dfrac{\pi}{4}+3$"],
  r"Right shift: replace $x$ with $x-\dfrac{\pi}{4}$; up $3$: add $3$.")
m("Graphs: phase shift and vertical shift", r"State the vertical shift and midline of $y=2\sin(x)-4$.",
  "Down 4, midline $y=-4$", ["Up 4, midline $y=4$", "Down 2, midline $y=-4$", "Down 4, midline $y=2$"],
  r"Subtracting $4$ shifts down $4$; the midline is $y=-4$.")
m("Graphs: phase shift and vertical shift",
  r"The graph of $y=\sin(x)$ is shifted $\dfrac{\pi}{6}$ to the left. Write the new equation.",
  r"$y=\sin\left(x+\dfrac{\pi}{6}\right)$", [r"$y=\sin\left(x-\dfrac{\pi}{6}\right)$",
   r"$y=\sin(x)+\dfrac{\pi}{6}$", r"$y=\sin\left(\dfrac{\pi}{6}-x\right)$"],
  r"Left shift: replace $x$ with $x+\dfrac{\pi}{6}$.")
m("Graphs: phase shift and vertical shift",
  r"The graph shows $y=\sin(x)$ shifted vertically. Find the new midline by reading the graph.",
  "$y=2$", ["$y=0$", "$y=1$", "$y=-2$"], r"The curve oscillates evenly about $y=2$.",
  figure={"type": "plot", "fns": ["sin(x)+2"], "xmin": -0.5, "xmax": 6.5, "ymin": 0, "ymax": 4})

# --- Solving basic trigonometric equations (5) ---
m("Solving basic trigonometric equations", r"Solve $2\sin\theta=\sqrt{2}$ for $0^\circ\leq\theta<360^\circ$.",
  r"$\theta=45^\circ$ or $\theta=135^\circ$", [r"$\theta=45^\circ$ or $\theta=225^\circ$",
   r"$\theta=60^\circ$ or $\theta=120^\circ$", r"$\theta=45^\circ$ only"],
  r"$\sin\theta=\dfrac{\sqrt{2}}{2}$: $\theta=45^\circ$ or $135^\circ$.")
m("Solving basic trigonometric equations", r"Solve $\sqrt{3}\tan\theta=3$ for $0^\circ\leq\theta<360^\circ$.",
  r"$\theta=60^\circ$ or $\theta=240^\circ$", [r"$\theta=60^\circ$ or $\theta=300^\circ$",
   r"$\theta=30^\circ$ or $\theta=210^\circ$", r"$\theta=60^\circ$ only"],
  r"$\tan\theta=\sqrt{3}$: $\theta=60^\circ$ or $240^\circ$ (tangent positive in Q1 and Q3).")
m("Solving basic trigonometric equations", r"Solve $2\cos\theta=1$ for $0^\circ\leq\theta<360^\circ$.",
  r"$\theta=60^\circ$ or $\theta=300^\circ$", [r"$\theta=60^\circ$ or $\theta=240^\circ$",
   r"$\theta=30^\circ$ or $\theta=330^\circ$", r"$\theta=60^\circ$ only"],
  r"$\cos\theta=0.5$: $\theta=60^\circ$ or $300^\circ$.")
m("Solving basic trigonometric equations", r"Solve $\tan\theta=1$ for $0^\circ\leq\theta<360^\circ$.",
  r"$\theta=45^\circ$ or $\theta=225^\circ$", [r"$\theta=45^\circ$ or $\theta=135^\circ$",
   r"$\theta=45^\circ$ or $\theta=315^\circ$", r"$\theta=45^\circ$ only"],
  r"Tangent is positive in Q1 and Q3: $\theta=45^\circ$ or $225^\circ$.")
m("Solving basic trigonometric equations", r"Solve $2\sin\theta+1=0$ for $0^\circ\leq\theta<360^\circ$.",
  r"$\theta=210^\circ$ or $\theta=330^\circ$", [r"$\theta=30^\circ$ or $\theta=150^\circ$",
   r"$\theta=210^\circ$ or $\theta=300^\circ$", r"$\theta=150^\circ$ or $\theta=330^\circ$"],
  r"$\sin\theta=-0.5$: $\theta=210^\circ$ or $330^\circ$.")

# --- Reference angles in other quadrants (4) ---
m("Reference angles in other quadrants", r"Find $\sin(120^\circ)$ using the reference angle.",
  r"$\dfrac{\sqrt{3}}{2}$", [r"$-\dfrac{\sqrt{3}}{2}$", r"$\dfrac{1}{2}$", r"$-\dfrac{1}{2}$"],
  r"Reference angle $60^\circ$; sine is positive in Q2: $\sin(120^\circ)=\sin(60^\circ)=\dfrac{\sqrt{3}}{2}$.")
m("Reference angles in other quadrants", r"Find $\cos(210^\circ)$ using the reference angle.",
  r"$-\dfrac{\sqrt{3}}{2}$", [r"$\dfrac{\sqrt{3}}{2}$", r"$-\dfrac{1}{2}$", r"$\dfrac{1}{2}$"],
  r"Reference angle $30^\circ$; cosine is negative in Q3: $\cos(210^\circ)=-\cos(30^\circ)=-\dfrac{\sqrt{3}}{2}$.")
m("Reference angles in other quadrants", r"Find $\tan(330^\circ)$ using the reference angle.",
  r"$-\dfrac{\sqrt{3}}{3}$", [r"$\dfrac{\sqrt{3}}{3}$", r"$-\sqrt{3}$", r"$\sqrt{3}$"],
  r"Reference angle $30^\circ$; tangent is negative in Q4: $\tan(330^\circ)=-\tan(30^\circ)=-\dfrac{\sqrt{3}}{3}$.")
m("Reference angles in other quadrants", r"Find $\sin(315^\circ)$ using the reference angle.",
  r"$-\dfrac{\sqrt{2}}{2}$", [r"$\dfrac{\sqrt{2}}{2}$", r"$-\dfrac{1}{2}$", r"$\dfrac{1}{2}$"],
  r"Reference angle $45^\circ$; sine is negative in Q4: $\sin(315^\circ)=-\sin(45^\circ)=-\dfrac{\sqrt{2}}{2}$.")

# --- Complementary angle relationships (3) ---
m("Complementary angle relationships",
  r"Given $\sin(25^\circ)\approx0.423$, use the relationship $\sin\theta=\cos(90^\circ-\theta)$ to find $\cos(65^\circ)$.",
  "$0.423$", ["$0.577$", "$0.906$", "$-0.423$"], r"$\cos(65^\circ)=\cos(90^\circ-25^\circ)=\sin(25^\circ)\approx0.423$.")
m("Complementary angle relationships", r"Given $\cos(40^\circ)\approx0.766$, find $\sin(50^\circ)$.",
  "$0.766$", ["$0.643$", "$0.234$", "$1.306$"], r"$\sin(50^\circ)=\sin(90^\circ-40^\circ)=\cos(40^\circ)\approx0.766$.")
m("Complementary angle relationships", r"Given $\sin(70^\circ)\approx0.940$, find $\cos(20^\circ)$.",
  "$0.940$", ["$0.342$", "$0.060$", "$1.064$"], r"$\cos(20^\circ)=\cos(90^\circ-70^\circ)=\sin(70^\circ)\approx0.940$.")

# --- The unit circle: coordinates of key points (4) ---
m("The unit circle: coordinates of key points",
  r"State the coordinates $(\cos\theta,\sin\theta)$ of the point on the unit circle at $\theta=30^\circ$.",
  r"$\left(\dfrac{\sqrt{3}}{2},\dfrac{1}{2}\right)$", [r"$\left(\dfrac{1}{2},\dfrac{\sqrt{3}}{2}\right)$",
   r"$\left(\dfrac{\sqrt{2}}{2},\dfrac{\sqrt{2}}{2}\right)$", "$(1,0)$"],
  r"$\cos(30^\circ)=\dfrac{\sqrt{3}}{2}$, $\sin(30^\circ)=\dfrac{1}{2}$.")
m("The unit circle: coordinates of key points",
  r"State the coordinates of the point on the unit circle at $\theta=90^\circ$.",
  "$(0,1)$", ["$(1,0)$", "$(0,-1)$", "$(-1,0)$"], r"$\cos(90^\circ)=0$, $\sin(90^\circ)=1$.")
m("The unit circle: coordinates of key points",
  r"State the coordinates of the point on the unit circle at $\theta=225^\circ$.",
  r"$\left(-\dfrac{\sqrt{2}}{2},-\dfrac{\sqrt{2}}{2}\right)$", [r"$\left(\dfrac{\sqrt{2}}{2},\dfrac{\sqrt{2}}{2}\right)$",
   r"$\left(-\dfrac{\sqrt{2}}{2},\dfrac{\sqrt{2}}{2}\right)$", "$(-1,-1)$"],
  r"$225^\circ$ is in Q3, reference angle $45^\circ$: both coordinates negative, $-\dfrac{\sqrt{2}}{2}$.")
m("The unit circle: coordinates of key points",
  r"The unit circle shown marks a point at angle $\theta=60^\circ$. What are its coordinates?",
  r"$\left(0.5,\dfrac{\sqrt{3}}{2}\right)$", [r"$\left(\dfrac{\sqrt{3}}{2},0.5\right)$", "$(1,0)$",
   r"$\left(0.5,0.5\right)$"], r"$\cos(60^\circ)=0.5$, $\sin(60^\circ)=\dfrac{\sqrt{3}}{2}$.",
  figure={"type": "circle", "radius": 1, "points": [{"angle": 60, "label": "θ"}]})

# --- Word problems: angles of elevation (3) ---
m("Word problems: angles of elevation",
  r"A drone hovers directly above a landmark. From a point 150 meters from the landmark's base, the angle of elevation to the drone is $40^\circ$. Find the drone's height, to the nearest meter.",
  "$126$", ["$115$", "$196$", "$150$"], r"$h=150\tan(40^\circ)\approx126$ m.")
m("Word problems: angles of elevation",
  r"A ladder leans against a wall, making an angle of $70^\circ$ with the ground. If the ladder shown is 12 meters long, find how high up the wall it reaches, to the nearest meter.",
  "$11$", ["$4$", "$8$", "$12$"], r"$h=12\sin(70^\circ)\approx11$ m.",
  figure={"type": "triangle", "vertices": [[0, 0], [10, 0], [0, 5]],
          "right_angle_at": 0, "side_labels": [None, "12", None],
          "angle_marks": [{"vertex": 1, "label": "70°"}]})
m("Word problems: angles of elevation",
  r"From the top of an 80 m cliff, the angle of depression to a boat is $25^\circ$. Find the horizontal distance from the base of the cliff to the boat, to the nearest meter.",
  "$172$", ["$37$", "$189$", "$80$"], r"$\tan(25^\circ)=\dfrac{80}{d}\Rightarrow d=\dfrac{80}{\tan(25^\circ)}\approx172$ m.")

b.check(50)
