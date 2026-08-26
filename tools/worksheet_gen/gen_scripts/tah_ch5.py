# -*- coding: utf-8 -*-
"""50 new MCQs for Tahsili ch.5 — Geometry & Coordinate Geometry. Distinct
from the existing 36 free-response questions (different points/shapes
throughout). Very figure-friendly chapter, so figure share runs high."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=505)
m = b.mcq

# --- Distance and midpoint (6) ---
m("Distance and midpoint", r"Find the distance between $(2,3)$ and $(6,6)$.",
  "$5$", ["$7$", "$25$", r"$\sqrt{7}$"], r"$\sqrt{(6-2)^2+(6-3)^2}=\sqrt{16+9}=5$.")
m("Distance and midpoint", r"Find the midpoint of $(3,-4)$ and $(9,6)$.",
  "$(6,1)$", ["$(12,2)$", "$(3,10)$", "$(6,2)$"], r"$\left(\dfrac{3+9}{2},\dfrac{-4+6}{2}\right)=(6,1)$.")
m("Distance and midpoint", r"Find the distance between $(-3,2)$ and $(5,-13)$.",
  "$17$", ["$15$", "$289$", "$19$"], r"$\sqrt{8^2+15^2}=\sqrt{64+225}=\sqrt{289}=17$.")
m("Distance and midpoint", r"Find the midpoint of $(-5,8)$ and $(7,-2)$.",
  "$(1,3)$", ["$(2,6)$", "$(1,6)$", "$(6,1)$"], r"$\left(\dfrac{-5+7}{2},\dfrac{8-2}{2}\right)=(1,3)$.")
m("Distance and midpoint", r"Find the distance between the two points shown.",
  "$5$", ["$4$", "$3$", r"$\sqrt{5}$"], r"$\sqrt{(5-1)^2+(5-2)^2}=\sqrt{16+9}=5$.",
  figure={"type": "plot", "fns": [], "points": [[1, 2], [5, 5]], "xmin": 0, "xmax": 6, "ymin": 0, "ymax": 6})
m("Distance and midpoint", r"Find the midpoint of the segment joining the two points shown.",
  "$(2,3)$", ["$(4,3)$", "$(2,6)$", "$(8,6)$"], r"$\left(\dfrac{-2+6}{2},\dfrac{3+3}{2}\right)=(2,3)$.",
  figure={"type": "plot", "fns": [], "points": [[-2, 3], [6, 3]], "xmin": -3, "xmax": 7, "ymin": 0, "ymax": 6})

# --- Gradient (slope) (4) ---
m("Gradient (slope)", r"Find the gradient of the line through $(2,3)$ and $(6,11)$.",
  "$2$", ["$4$", "$0.5$", "$8$"], r"$m=\dfrac{11-3}{6-2}=2$.")
m("Gradient (slope)", r"Find the gradient of the line through $(-2,5)$ and $(3,-10)$.",
  "$-3$", ["$3$", "$-15$", r"$-\dfrac{1}{3}$"], r"$m=\dfrac{-10-5}{3-(-2)}=\dfrac{-15}{5}=-3$.")
m("Gradient (slope)", r"Find the gradient of the line through $(0,0)$ and $(8,12)$.",
  "$1.5$", [r"$\dfrac{8}{12}$", "$96$", r"$\dfrac{2}{3}$"], r"$m=\dfrac{12}{8}=1.5$.")
m("Gradient (slope)", r"State whether the line through $(2,3)$ and $(2,9)$ is horizontal, vertical, or neither.",
  "Vertical", ["Horizontal", "Neither", "Cannot be determined"], r"Both points share $x=2$: the line is vertical.")

# --- Equations of lines (6) ---
m("Equations of lines", r"Find the equation of the line with gradient $3$ passing through $(2,4)$, in the form $y=mx+c$.",
  "$y=3x-2$", ["$y=3x+2$", "$y=2x-3$", "$y=3x+4$"], r"$4=3(2)+c\Rightarrow c=-2$.")
m("Equations of lines", r"Find the equation of the line through $(0,5)$ and $(3,14)$.",
  "$y=3x+5$", ["$y=5x+3$", "$y=3x-5$", "$y=9x+5$"], r"$m=\dfrac{14-5}{3}=3$; $c=5$ (the $y$-intercept).")
m("Equations of lines", r"Find the $x$- and $y$-intercepts of the line $3x+4y=24$.",
  "$x=8$, $y=6$", ["$x=6$, $y=8$", "$x=24$, $y=24$", "$x=4$, $y=3$"],
  r"Set $y=0$: $x=8$. Set $x=0$: $y=6$.")
m("Equations of lines", r"Write the equation of the line parallel to $y=5x-2$ passing through $(1,8)$.",
  "$y=5x+3$", ["$y=5x-3$", r"$y=-\dfrac{1}{5}x+3$", "$y=5x+8$"], r"$8=5(1)+c\Rightarrow c=3$.")
m("Equations of lines", r"Find the equation of the line through $(1,3)$ and $(4,12)$.",
  "$y=3x$", ["$y=3x+3$", "$y=x+3$", "$y=3x-3$"], r"$m=\dfrac{12-3}{3}=3$; $3=3(1)+c\Rightarrow c=0$.")
m("Equations of lines", r"The graph shows a line. Find its equation in the form $y=mx+c$ by reading the graph.",
  "$y=2x+1$", ["$y=x+1$", "$y=2x-1$", r"$y=\dfrac{1}{2}x+1$"],
  r"The line crosses the $y$-axis at $1$ and rises $2$ for every $1$ across: $y=2x+1$.",
  figure={"type": "plot", "fns": ["2*x+1"], "xmin": -2, "xmax": 3, "ymin": -4, "ymax": 8})

# --- Parallel and perpendicular lines (4) ---
m("Parallel and perpendicular lines", r"State the gradient of a line perpendicular to a line with gradient $4$.",
  r"$-\dfrac{1}{4}$", ["$4$", "$-4$", r"$\dfrac{1}{4}$"], r"Perpendicular gradients multiply to $-1$: $-\dfrac{1}{4}$.")
m("Parallel and perpendicular lines",
  r"Determine whether the lines $y=3x+2$ and $y=3x-5$ are parallel, perpendicular, or neither.",
  "Parallel", ["Perpendicular", "Neither", "The same line"], r"Both have gradient $3$: parallel.")
m("Parallel and perpendicular lines",
  r"Find the equation of the line perpendicular to $y=-\dfrac{1}{4}x+3$, passing through $(4,5)$.",
  "$y=4x-11$", ["$y=4x+11$", r"$y=-\dfrac{1}{4}x+6$", "$y=4x-5$"],
  r"Perpendicular gradient $=4$: $5=4(4)+c\Rightarrow c=-11$.")
m("Parallel and perpendicular lines",
  r"Determine whether the lines $y=2x+1$ and $y=-0.5x+4$ are parallel, perpendicular, or neither.",
  "Perpendicular", ["Parallel", "Neither", "The same line"],
  r"Gradients $2$ and $-0.5$ multiply to $-1$: perpendicular.")

# --- The equation of a circle (6) ---
m("The equation of a circle", r"Write the equation of a circle centered at the origin with radius $8$.",
  "$x^2+y^2=64$", ["$x^2+y^2=8$", "$(x-8)^2+(y-8)^2=64$", "$x^2+y^2=16$"], r"$r^2=64$.")
m("The equation of a circle", r"Write the equation of a circle centered at $(3,-2)$ with radius $7$.",
  "$(x-3)^2+(y+2)^2=49$", ["$(x+3)^2+(y-2)^2=49$", "$(x-3)^2+(y+2)^2=7$", "$(x-3)^2-(y+2)^2=49$"],
  r"$(x-3)^2+(y-(-2))^2=7^2$.")
m("The equation of a circle", r"Find the radius and center of the circle $(x+2)^2+(y-5)^2=81$.",
  "Center $(-2,5)$, radius $9$", ["Center $(2,-5)$, radius $9$", "Center $(-2,5)$, radius $81$",
   "Center $(2,5)$, radius $9$"], r"$(x-(-2))^2+(y-5)^2=9^2$.")
m("The equation of a circle", r"Find the equation of the circle centered at the origin that passes through $(6,8)$.",
  "$x^2+y^2=100$", ["$x^2+y^2=10$", "$x^2+y^2=48$", "$x^2+y^2=196$"],
  r"$r=\sqrt{6^2+8^2}=10$; $r^2=100$.")
m("The equation of a circle", r"Write the equation of the circle shown, centered at the origin.",
  "$x^2+y^2=25$", ["$x^2+y^2=5$", "$x^2+y^2=10$", "$x^2+y^2=20$"], r"$r=5$; $r^2=25$.",
  figure={"type": "circle", "radius": 5, "center": [0, 0], "radius_label": "r = 5"})
m("The equation of a circle",
  r"The circle shown is centered at $(1,2)$ with the radius marked. Write its equation.",
  "$(x-1)^2+(y-2)^2=16$", ["$(x+1)^2+(y+2)^2=16$", "$(x-1)^2+(y-2)^2=4$", "$(x-1)^2+(y-2)^2=8$"],
  r"$(x-1)^2+(y-2)^2=4^2$.",
  figure={"type": "circle", "radius": 4, "center": [1, 2], "center_label": "(1, 2)", "radius_label": "r = 4"})

# --- Circles: chords and arcs (4) ---
m("Circles: chords and arcs",
  r"Points $A$ and $B$ lie on a circle of radius $8$ centered at $O$, with central angle $\angle AOB=60^\circ$. Find the arc length $AB$, in terms of $\pi$.",
  r"$\dfrac{8\pi}{3}$", [r"$\dfrac{4\pi}{3}$", r"$16\pi$", r"$\dfrac{16\pi}{3}$"],
  r"Arc $=\dfrac{60}{360}\times2\pi(8)=\dfrac{8\pi}{3}$.")
m("Circles: chords and arcs",
  r"A chord of a circle with radius $13$ cm is $24$ cm long. Find the distance from the center to the chord.",
  "$5$", ["$12$", "$1$", "$7$"], r"Half-chord $=12$; distance $=\sqrt{13^2-12^2}=\sqrt{25}=5$ cm.")
m("Circles: chords and arcs", r"Find the circumference of a circle with radius $11$ cm, in terms of $\pi$.",
  r"$22\pi$", [r"$11\pi$", r"$121\pi$", r"$44\pi$"], r"$C=2\pi(11)=22\pi$ cm.")
m("Circles: chords and arcs", r"Find the arc length of the $90^\circ$ sector shown, in terms of $\pi$.",
  r"$3\pi$", [r"$6\pi$", r"$1.5\pi$", r"$12\pi$"], r"Arc $=\dfrac{90}{360}\times2\pi(6)=3\pi$.",
  figure={"type": "circle", "radius": 6, "sector": {"start_deg": 0, "end_deg": 90, "label": "90°"}})

# --- Polygon angle sums (4) ---
m("Polygon angle sums", r"Find the sum of the interior angles of an octagon (8 sides).",
  r"$1{,}080^\circ$", [r"$1{,}440^\circ$", r"$900^\circ$", r"$720^\circ$"], r"$(8-2)\times180=1{,}080^\circ$.")
m("Polygon angle sums", r"Find the measure of each interior angle of a regular hexagon.",
  r"$120^\circ$", [r"$108^\circ$", r"$135^\circ$", r"$140^\circ$"], r"Sum $=720^\circ$; each $=720\div6=120^\circ$.")
m("Polygon angle sums", r"A polygon has an interior angle sum of $1{,}620^\circ$. Find the number of sides.",
  "$11$", ["$9$", "$10$", "$12$"], r"$(n-2)\times180=1{,}620\Rightarrow n-2=9\Rightarrow n=11$.")
m("Polygon angle sums", r"Find the sum of the interior angles of a decagon (10 sides).",
  r"$1{,}440^\circ$", [r"$1{,}080^\circ$", r"$1{,}800^\circ$", r"$1{,}260^\circ$"], r"$(10-2)\times180=1{,}440^\circ$.")

# --- Perimeter and area (4) ---
m("Perimeter and area", r"A rectangle has length $15$ and width $9$, as shown. Find its perimeter and area.",
  "$P=48$, $A=135$", ["$P=135$, $A=48$", "$P=24$, $A=135$", "$P=48$, $A=24$"],
  r"$P=2(15+9)=48$; $A=15\times9=135$.",
  figure={"type": "rect", "vertices": [[0, 0], [15, 0], [15, 9], [0, 9]], "side_labels": ["15", "9", None, None]})
m("Perimeter and area", r"A right triangle has legs $5$ and $12$, as shown. Find its area and hypotenuse.",
  "$A=30$, hyp $=13$", ["$A=30$, hyp $=17$", "$A=60$, hyp $=13$", "$A=30$, hyp $=12$"],
  r"$A=\dfrac{1}{2}(5)(12)=30$; hyp $=\sqrt{5^2+12^2}=13$.",
  figure={"type": "triangle", "vertices": [[0, 0], [12, 0], [12, 5]],
          "right_angle_at": 1, "side_labels": ["12", "5", None]})
m("Perimeter and area",
  r"A regular hexagon has side length $6$, with area $A=\dfrac{3\sqrt{3}}{2}s^2$. Find its area in exact form.",
  r"$54\sqrt{3}$", [r"$18\sqrt{3}$", r"$108\sqrt{3}$", r"$36\sqrt{3}$"], r"$A=\dfrac{3\sqrt{3}}{2}(36)=54\sqrt{3}$.")
m("Perimeter and area",
  r"A regular pentagon has side length $8$, with area $A\approx1.72s^2$. Find its area to the nearest whole number.",
  "$110$", ["$14$", "$96$", "$124$"], r"$A\approx1.72(64)\approx110$.")

# --- Coordinate geometry: identifying shapes (5) ---
m("Coordinate geometry: identifying shapes",
  r"Is the triangle with vertices $A(0,0)$, $B(6,0)$, $C(6,4)$ a right triangle?",
  "Yes", ["No", "Only if it is also isosceles", "Cannot be determined"],
  r"$AB$ is horizontal and $BC$ is vertical, so they meet at a right angle at $B$: yes.")
m("Coordinate geometry: identifying shapes",
  r"Determine whether the points $A(-3,2)$, $B(1,5)$, $C(4,1)$ form a right triangle, using squared distances.",
  "Yes", ["No", "Only if it is also equilateral", "Cannot be determined"],
  r"$AB^2=25$, $BC^2=25$, $AC^2=50$. Since $AB^2+BC^2=AC^2$, it's a right triangle at $B$: yes.")
m("Coordinate geometry: identifying shapes",
  r"Determine whether the triangle with vertices $A(2,3)$, $B(6,3)$, $C(4,7)$ is isosceles.",
  "Yes", ["No", "Only if it is also a right triangle", "Cannot be determined"],
  r"$AC=\sqrt{4+16}=\sqrt{20}$ and $BC=\sqrt{4+16}=\sqrt{20}$: two equal sides, so yes.")
m("Coordinate geometry: identifying shapes", r"Is the triangle shown a right triangle?",
  "Yes", ["No", "Only if it is also isosceles", "Cannot be determined"],
  r"The two legs meet at a right angle, as shown.",
  figure={"type": "triangle", "vertices": [[0, 0], [6, 0], [6, 4]]})
m("Coordinate geometry: identifying shapes", r"Is the triangle shown isosceles, scalene, or equilateral?",
  "Isosceles", ["Scalene", "Equilateral", "Cannot be determined"],
  r"Two of the three sides shown are equal in length: isosceles.",
  figure={"type": "triangle", "vertices": [[0, 0], [6, 0], [3, 8]]})

# --- The perpendicular bisector of a segment (4) ---
m("The perpendicular bisector of a segment",
  r"Find the equation of the perpendicular bisector of the segment joining $(1,4)$ and $(7,10)$.",
  "$y=-x+11$", ["$y=x+11$", "$y=-x+7$", "$y=x-11$"],
  r"Midpoint $=(4,7)$; segment slope $=1$; perpendicular slope $=-1$: $y-7=-(x-4)$.")
m("The perpendicular bisector of a segment",
  r"A line segment has endpoints $(2,0)$ and $(2,8)$. Find the equation of its perpendicular bisector.",
  "$y=4$", ["$x=4$", "$y=2$", "$x=2$"], r"Midpoint $=(2,4)$; the segment is vertical, so the bisector is horizontal: $y=4$.")
m("The perpendicular bisector of a segment",
  r"A line segment has endpoints $(3,6)$ and $(9,6)$. Find the equation of its perpendicular bisector.",
  "$x=6$", ["$y=6$", "$x=3$", "$y=9$"], r"Midpoint $=(6,6)$; the segment is horizontal, so the bisector is vertical: $x=6$.")
m("The perpendicular bisector of a segment",
  r"Find the equation of the perpendicular bisector of the segment joining $(-2,1)$ and $(4,9)$.",
  r"$y=-\dfrac{3}{4}x+\dfrac{23}{4}$", [r"$y=\dfrac{3}{4}x+\dfrac{23}{4}$", r"$y=-\dfrac{4}{3}x+\dfrac{23}{4}$",
   r"$y=-\dfrac{3}{4}x+5$"],
  r"Midpoint $=(1,5)$; segment slope $=\dfrac{4}{3}$; perpendicular slope $=-\dfrac{3}{4}$.")

# --- Word problems: geometry on a coordinate grid (3) ---
m("Word problems: geometry on a coordinate grid",
  r"A city park is designed on a coordinate grid (in meters). Two gates are located at $(10,20)$ and $(50,60)$. Find the distance between the gates, to the nearest meter.",
  "$57$", ["$40$", "$80$", "$113$"], r"$\sqrt{40^2+40^2}=40\sqrt{2}\approx57$ m.")
m("Word problems: geometry on a coordinate grid",
  r"A circular irrigation sprinkler is centered at $(8,8)$ on a farm's coordinate grid (in meters) and has a radius of $15$ meters. Write the equation of the circle it waters.",
  "$(x-8)^2+(y-8)^2=225$", ["$(x-8)^2+(y-8)^2=15$", "$(x+8)^2+(y+8)^2=225$", "$(x-8)^2+(y-8)^2=30$"],
  r"$(x-8)^2+(y-8)^2=15^2$.")
m("Word problems: geometry on a coordinate grid",
  r"A surveyor marks two points on a coordinate map (in km): a base camp at $(3,4)$ and a summit at $(15,4)$. Find the midpoint, to be used as a resupply station.",
  "$(9,4)$", ["$(6,4)$", "$(9,8)$", "$(18,8)$"], r"$\left(\dfrac{3+15}{2},\dfrac{4+4}{2}\right)=(9,4)$.")

b.check(50)
