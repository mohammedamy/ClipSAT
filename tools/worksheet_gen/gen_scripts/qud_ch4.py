# -*- coding: utf-8 -*-
"""50 new MCQs for Qudrat ch.4 — Geometry & Measurement. Distinct from the
existing 42 free-response questions (different numbers/configurations/
sub-skills throughout). Geometry is naturally figure-friendly, so this
chapter carries a higher figure share (~50%) to help balance the overall
17-chapter average against figure-sparse chapters like ch.1/ch.3."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from _lib import Bank

b = Bank(seed=404)
m = b.mcq

# --- Angle facts (4) ---
m("Angle facts", r"Two angles are supplementary. One is three times the other. Find the smaller angle.",
  "$45^{\\circ}$", ["$135^{\\circ}$", "$60^{\\circ}$", "$30^{\\circ}$"],
  r"$x+3x=180\Rightarrow x=45^{\circ}$.")
m("Angle facts", r"Three angles around a point measure $118^{\circ}$, $142^{\circ}$, and $x$. Find $x$.",
  "$100^{\\circ}$", ["$80^{\\circ}$", "$120^{\\circ}$", "$140^{\\circ}$"],
  r"$x=360-118-142=100^{\circ}$.")
m("Angle facts", r"An angle is four times its complement. Find the angle.",
  "$72^{\\circ}$", ["$18^{\\circ}$", "$90^{\\circ}$", "$54^{\\circ}$"],
  r"$x=4(90-x)\Rightarrow5x=360\Rightarrow x=72^{\circ}$.")
m("Angle facts", r"Two angles on a straight line measure $(4x+10)^{\circ}$ and $(2x+20)^{\circ}$. Find $x$.",
  "$25$", ["$35$", "$20$", "$15$"],
  r"$4x+10+2x+20=180\Rightarrow6x+30=180\Rightarrow x=25$.")

# --- Parallel lines and transversals (4) ---
m("Parallel lines and transversals",
  r"Two parallel lines are cut by a transversal. One angle is $(3x+15)^{\circ}$ and its corresponding angle is $(5x-25)^{\circ}$. Find $x$.",
  "$20$", ["$10$", "$30$", "$8$"],
  r"Corresponding angles are equal: $3x+15=5x-25\Rightarrow x=20$.")
m("Parallel lines and transversals",
  r"Two parallel lines cut by a transversal create co-interior angles of $(2x+10)^{\circ}$ and $(3x-30)^{\circ}$. Find $x$.",
  "$40$", ["$34$", "$50$", "$30$"],
  r"Co-interior angles sum to $180^{\circ}$: $2x+10+3x-30=180\Rightarrow5x=200\Rightarrow x=40$.")
m("Parallel lines and transversals",
  r"Two parallel lines are cut by a transversal. One angle is $63^{\circ}$. Find its alternate exterior angle.",
  "$63^{\\circ}$", ["$117^{\\circ}$", "$27^{\\circ}$", "$153^{\\circ}$"],
  r"Alternate exterior angles are equal, so the answer is $63^{\circ}$.")
m("Parallel lines and transversals",
  r"Two parallel lines are cut by a transversal. One angle and its co-interior angle differ by $40^{\circ}$ and sum to $180^{\circ}$. Find the larger angle.",
  "$110^{\\circ}$", ["$140^{\\circ}$", "$90^{\\circ}$", "$70^{\\circ}$"],
  r"$L+S=180$, $L-S=40\Rightarrow L=110^{\circ}$.")

# --- Triangle angle sum (4) ---
m("Triangle angle sum", r"Find the third angle of the triangle shown.",
  "$44^{\\circ}$", ["$54^{\\circ}$", "$64^{\\circ}$", "$116^{\\circ}$"],
  r"$180-64-72=44^{\circ}$.",
  figure={"type": "triangle", "vertices": [[0, 0], [7, 0], [2.5, 4.5]],
          "angle_marks": [{"vertex": 0, "label": "64°"}, {"vertex": 1, "label": "72°"}]})
m("Triangle angle sum",
  r"The isosceles triangle shown has two equal base angles of $70^{\circ}$ each. Find the apex angle.",
  "$40^{\\circ}$", ["$110^{\\circ}$", "$70^{\\circ}$", "$55^{\\circ}$"],
  r"$180-70-70=40^{\circ}$.",
  figure={"type": "triangle", "vertices": [[0, 0], [8, 0], [4, 5]],
          "angle_marks": [{"vertex": 0, "label": "70°"}, {"vertex": 1, "label": "70°"}]})
m("Triangle angle sum", r"A triangle has three angles in the ratio $2:3:4$. Find the largest angle.",
  "$80^{\\circ}$", ["$100^{\\circ}$", "$60^{\\circ}$", "$90^{\\circ}$"],
  r"$9$ parts $=180^{\circ}$, so $1$ part $=20^{\circ}$; largest $=4\times20=80^{\circ}$.")
m("Triangle angle sum",
  r"In a right triangle, one non-right angle exceeds the other by $26^{\circ}$. Find the larger non-right angle.",
  "$58^{\\circ}$", ["$64^{\\circ}$", "$32^{\\circ}$", "$48^{\\circ}$"],
  r"$x+(x+26)=90\Rightarrow x=32$; larger $=58^{\circ}$.")

# --- The Pythagorean theorem (5) ---
m("The Pythagorean theorem", r"Find the hypotenuse of the right triangle shown.",
  "$17$", ["$23$", "$19$", "$13$"],
  r"$\sqrt{8^2+15^2}=\sqrt{64+225}=\sqrt{289}=17$.",
  figure={"type": "triangle", "vertices": [[0, 0], [15, 0], [15, 8]],
          "right_angle_at": 1, "side_labels": ["15", "8", None]})
m("The Pythagorean theorem", r"Find the missing leg of the right triangle shown.",
  "$24$", ["$18$", "$20$", "$26$"],
  r"$\sqrt{25^2-7^2}=\sqrt{625-49}=\sqrt{576}=24$.",
  figure={"type": "triangle", "vertices": [[0, 0], [7, 0], [7, 10]],
          "right_angle_at": 1, "side_labels": ["7", "?", "25"]})
m("The Pythagorean theorem", r"A rectangular field is 24 m long and 18 m wide. Find the length of its diagonal.",
  "$30$", ["$36$", "$26$", "$42$"],
  r"$\sqrt{24^2+18^2}=\sqrt{576+324}=\sqrt{900}=30$ m.")
m("The Pythagorean theorem", r"A triangle has sides 9 cm, 12 cm, and 15 cm, as shown. Is it a right triangle?",
  "Yes — a right triangle", ["No — not a right triangle", "Only if it is also isosceles",
                              "Cannot be determined"],
  r"$9^2+12^2=81+144=225=15^2$, so yes, it is a right triangle.",
  figure={"type": "triangle", "vertices": [[0, 0], [12, 0], [0, 9]],
          "side_labels": ["12", "15", "9"]})
m("The Pythagorean theorem",
  r"A 15 m ladder leans against a wall with its foot 9 m from the wall's base. How high up the wall does the ladder reach?",
  "$12$", ["$10$", "$13$", "$18$"],
  r"$\sqrt{15^2-9^2}=\sqrt{225-81}=\sqrt{144}=12$ m.")

# --- Perimeter and area of rectangles and squares (4) ---
m("Perimeter and area of rectangles and squares",
  r"Find the perimeter and area of the rectangle shown.",
  "$P=48$ cm, $A=135$ cm$^2$", ["$P=135$ cm, $A=48$ cm$^2$", "$P=24$ cm, $A=135$ cm$^2$",
                                  "$P=48$ cm, $A=24$ cm$^2$"],
  r"$P=2(15+9)=48$ cm; $A=15\times9=135$ cm$^2$.",
  figure={"type": "rect", "vertices": [[0, 0], [15, 0], [15, 9], [0, 9]],
          "side_labels": ["15", "9", None, None]})
m("Perimeter and area of rectangles and squares",
  r"Find the perimeter and area of the square shown.",
  "$P=44$ cm, $A=121$ cm$^2$", ["$P=121$ cm, $A=44$ cm$^2$", "$P=22$ cm, $A=121$ cm$^2$",
                                  "$P=44$ cm, $A=110$ cm$^2$"],
  r"$P=4\times11=44$ cm; $A=11^2=121$ cm$^2$.",
  figure={"type": "rect", "vertices": [[0, 0], [11, 0], [11, 11], [0, 11]],
          "side_labels": ["11", None, None, None]})
m("Perimeter and area of rectangles and squares",
  r"A rectangle has perimeter 64 cm and length 20 cm. Find its width and area.",
  "$w=12$ cm, $A=240$ cm$^2$", ["$w=22$ cm, $A=440$ cm$^2$", "$w=12$ cm, $A=32$ cm$^2$",
                                  "$w=44$ cm, $A=240$ cm$^2$"],
  r"$2(l+w)=64\Rightarrow l+w=32\Rightarrow w=12$ cm; $A=20\times12=240$ cm$^2$.")
m("Perimeter and area of rectangles and squares",
  r"A square has area $225$ cm$^2$. Find its side length and perimeter.",
  "$s=15$ cm, $P=60$ cm", ["$s=225$ cm, $P=900$ cm", "$s=15$ cm, $P=30$ cm", "$s=45$ cm, $P=60$ cm"],
  r"$s=\sqrt{225}=15$ cm; $P=4\times15=60$ cm.")

# --- Area of triangles and parallelograms (4) ---
m("Area of triangles and parallelograms",
  r"The triangle shown has base 16 cm and height 10 cm. Find its area.",
  "$80$", ["$160$", "$26$", "$40$"],
  r"$A=\dfrac{1}{2}(16)(10)=80$ cm$^2$.",
  figure={"type": "triangle", "vertices": [[0, 0], [16, 0], [6, 10]],
          "side_labels": ["16", None, None]})
m("Area of triangles and parallelograms",
  r"The parallelogram shown has base 18 cm and height 7 cm. Find its area.",
  "$126$", ["$252$", "$25$", "$63$"],
  r"$A=18\times7=126$ cm$^2$.",
  figure={"type": "rect", "vertices": [[0, 0], [18, 0], [22, 7], [4, 7]],
          "side_labels": ["18", None, None, None]})
m("Area of triangles and parallelograms", r"A triangle has area $84$ cm$^2$ and height 12 cm. Find its base.",
  "$14$", ["$1{,}008$", "$7$", "$28$"],
  r"$b=\dfrac{2(84)}{12}=14$ cm.")
m("Area of triangles and parallelograms", r"A parallelogram has area $150$ cm$^2$ and base 15 cm. Find its height.",
  "$10$", ["$2{,}250$", "$20$", "$5$"],
  r"$h=\dfrac{150}{15}=10$ cm.")

# --- Circles: circumference and area (5) ---
m("Circles: circumference and area", r"Find the circumference of the circle shown, using $\pi=\dfrac{22}{7}$.",
  "$88$", ["$44$", "$616$", "$176$"],
  r"$C=2\times\dfrac{22}{7}\times14=88$ cm.",
  figure={"type": "circle", "radius": 14, "radius_label": "r = 14"})
m("Circles: circumference and area", r"Find the area of the circle shown, using $\pi=\dfrac{22}{7}$.",
  "$1{,}386$", ["$132$", "$693$", "$2{,}772$"],
  r"$A=\dfrac{22}{7}\times21^2=1{,}386$ cm$^2$.",
  figure={"type": "circle", "radius": 21, "radius_label": "r = 21"})
m("Circles: circumference and area", r"Find the circumference of the circle shown, in terms of $\pi$.",
  r"$24\pi$ cm", [r"$12\pi$ cm", r"$144\pi$ cm", r"$48\pi$ cm"],
  r"$C=2\pi r=2\pi(12)=24\pi$ cm.",
  figure={"type": "circle", "radius": 12, "radius_label": "r = 12"})
m("Circles: circumference and area",
  r"Find the area of the shaded $60^{\circ}$ sector shown, in terms of $\pi$.",
  r"$13.5\pi$ cm$^2$", [r"$27\pi$ cm$^2$", r"$4.5\pi$ cm$^2$", r"$81\pi$ cm$^2$"],
  r"Sector area $=\dfrac{60}{360}\times\pi(9)^2=13.5\pi$ cm$^2$.",
  figure={"type": "circle", "radius": 9, "sector": {"start_deg": 0, "end_deg": 60, "label": "60°"}})
m("Circles: circumference and area", r"A circle has area $144\pi$ cm$^2$. Find its radius.",
  "$12$", ["$72$", "$24$", "$6$"],
  r"$r^2=144\Rightarrow r=12$ cm.")

# --- Composite figures (4) ---
m("Composite figures", r"Find the area of the L-shaped room shown (all measurements in meters).",
  "$58$", ["$70$", "$46$", "$82$"],
  r"Full rectangle $10\times7=70$ minus the $4\times3$ notch $=70-12=58$ m$^2$.",
  figure={"type": "polygon",
          "vertices": [[0, 0], [10, 0], [10, 4], [6, 4], [6, 7], [0, 7]],
          "side_labels": ["10", "4", "4", "3", "6", "7"]})
m("Composite figures",
  r"A garden is L-shaped: an 18 m by 8 m rectangle with a 6 m by 3 m rectangle removed from one corner. Find its area.",
  "$126$", ["$162$", "$138$", "$108$"],
  r"$18\times8=144$; $144-6\times3=144-18=126$ m$^2$.")
m("Composite figures",
  r"Find the area of the shape shown: a 14 cm by 6 cm rectangle with a right triangle of base 6 cm and height 4 cm attached to one side.",
  "$96$", ["$108$", "$90$", "$72$"],
  r"Rectangle $=14\times6=84$; triangle $=\dfrac{1}{2}(6)(4)=12$; total $=96$ cm$^2$.",
  figure={"type": "polygon",
          "vertices": [[0, 0], [14, 0], [14, 6], [10, 6], [7, 10], [4, 6], [0, 6]],
          "side_labels": ["14", "6", None, None, None, None, "6"]})
m("Composite figures",
  r"A rectangular lawn 20 m by 12 m has a circular flower bed of radius 3.5 m removed from it. Find the remaining lawn area, using $\pi=\dfrac{22}{7}$.",
  "$201.5$", ["$278.5$", "$196$", "$240$"],
  r"Rectangle $=240$; circle $=\dfrac{22}{7}(3.5)^2=38.5$; remaining $=240-38.5=201.5$ m$^2$.")

# --- Volume and surface area (5) ---
m("Volume and surface area", r"Find the volume of the rectangular box shown.",
  "$120$", ["$30$", "$15$", "$60$"],
  r"$V=6\times5\times4=120$ cm$^3$.",
  figure={"type": "solid", "solid": "rectangular_prism", "dims": [6, 5, 4],
          "labels": {"l": "6 cm", "w": "5 cm", "h": "4 cm"}})
m("Volume and surface area", r"Find the volume and surface area of the cube shown.",
  "$V=343$ cm$^3$, $SA=294$ cm$^2$", ["$V=294$ cm$^3$, $SA=343$ cm$^2$", "$V=343$ cm$^3$, $SA=49$ cm$^2$",
                                        "$V=49$ cm$^3$, $SA=294$ cm$^2$"],
  r"$V=7^3=343$ cm$^3$; $SA=6\times7^2=294$ cm$^2$.",
  figure={"type": "solid", "solid": "cube", "dims": [7, 7, 7], "labels": {"l": "7 cm"}})
m("Volume and surface area", r"Find the volume of the cylinder shown, using $\pi=\dfrac{22}{7}$.",
  "$1{,}540$", ["$770$", "$440$", "$3{,}080$"],
  r"$V=\dfrac{22}{7}(7)^2(10)=1{,}540$ cm$^3$.",
  figure={"type": "solid", "solid": "cylinder", "dims": [14, 14, 10],
          "labels": {"r": "7 cm", "h": "10 cm"}})
m("Volume and surface area", r"Find the volume of the cone shown, using $\pi=\dfrac{22}{7}$.",
  "$770$", ["$2{,}310$", "$1{,}540$", "$385$"],
  r"$V=\dfrac{1}{3}\times\dfrac{22}{7}(7)^2(15)=770$ cm$^3$.",
  figure={"type": "solid", "solid": "cone", "dims": [14, 14, 15],
          "labels": {"r": "7 cm", "h": "15 cm"}})
m("Volume and surface area",
  r"A rectangular prism has volume $360$ cm$^3$, length 12 cm, and width 5 cm. Find its height.",
  "$6$", ["$30$", "$72$", "$15$"],
  r"$h=\dfrac{360}{12\times5}=6$ cm.")

# --- Coordinate geometry: distance and midpoint (4) ---
m("Coordinate geometry: distance and midpoint",
  r"Find the distance between the two points shown.",
  "$5$", ["$7$", "$25$", r"$\sqrt{7}$"],
  r"$\sqrt{(4-1)^2+(6-2)^2}=\sqrt{9+16}=\sqrt{25}=5$.",
  figure={"type": "plot", "fns": [], "points": [[1, 2], [4, 6]], "xmin": 0, "xmax": 5, "ymin": 0, "ymax": 7})
m("Coordinate geometry: distance and midpoint",
  r"Find the midpoint of the segment joining the two points shown.",
  "$(5, 3)$", ["$(10, 6)$", "$(3, 5)$", "$(6, 3)$"],
  r"Midpoint $=\left(\dfrac{2+8}{2},\dfrac{3+3}{2}\right)=(5,3)$.",
  figure={"type": "plot", "fns": [], "points": [[2, 3], [8, 3]], "xmin": 0, "xmax": 9, "ymin": 0, "ymax": 5})
m("Coordinate geometry: distance and midpoint", r"Find the distance between the points $(0,0)$ and $(6,8)$.",
  "$10$", ["$14$", "$48$", "$7$"],
  r"$\sqrt{6^2+8^2}=\sqrt{36+64}=\sqrt{100}=10$.")
m("Coordinate geometry: distance and midpoint",
  r"Find the midpoint of the segment joining the two points shown.",
  "$(1, 4)$", ["$(2, 8)$", "$(4, 1)$", "$(-1, -4)$"],
  r"Midpoint $=\left(\dfrac{-3+5}{2},\dfrac{1+7}{2}\right)=(1,4)$.",
  figure={"type": "plot", "fns": [], "points": [[-3, 1], [5, 7]], "xmin": -4, "xmax": 6, "ymin": 0, "ymax": 8})

# --- Similar figures and scale factor (4) ---
m("Similar figures and scale factor",
  r"Two similar triangles have a scale factor of $3:5$. If the smaller triangle's perimeter is 24 cm, find the larger triangle's perimeter.",
  "$40$", ["$14.4$", "$72$", "$64$"],
  r"$24\times\dfrac{5}{3}=40$ cm.")
m("Similar figures and scale factor",
  r"A model car is built at a scale of $1:24$. If the model is 8 cm long, find the actual car's length in meters.",
  "$1.92$", ["$19.2$", "$0.192$", "$24$"],
  r"$8\times24=192$ cm $=1.92$ m.")
m("Similar figures and scale factor",
  r"Two similar rectangles have areas in ratio $4:9$. Find the ratio of their side lengths.",
  "$2:3$", ["$4:9$", "$16:81$", "$8:18$"],
  r"Side ratio $=\sqrt{4}:\sqrt{9}=2:3$.")
m("Similar figures and scale factor",
  r"A photo is enlarged by a scale factor of $2.5$. If the original photo is 6 cm wide, find the width of the enlargement.",
  "$15$", ["$8.5$", "$3.6$", "$12.5$"],
  r"$6\times2.5=15$ cm.")

# --- Word problems (3) ---
m("Word problems",
  r"A rectangular pool measuring 25 m by 12 m is surrounded by a deck 2 m wide. Find the area of the deck alone.",
  "$164$", ["$464$", "$300$", "$74$"],
  r"Outer $=29\times16=464$; pool $=300$; deck $=464-300=164$ m$^2$.")
m("Word problems",
  r"Tiling costs 38 riyals per square meter. Find the total cost to tile a rectangular room measuring 9 m by 6 m.",
  "$2{,}052$ SAR", ["$1{,}026$ SAR", "$342$ SAR", "$4{,}104$ SAR"],
  r"Area $=9\times6=54$ m$^2$; cost $=54\times38=2{,}052$ SAR.")
m("Word problems",
  r"A water tank shaped like the rectangular box shown has these dimensions in meters. Find its capacity in cubic meters.",
  "$300$", ["$150$", "$21$", "$60$"],
  r"$V=10\times6\times5=300$ m$^3$.",
  figure={"type": "solid", "solid": "rectangular_prism", "dims": [10, 6, 5],
          "labels": {"l": "10 m", "w": "6 m", "h": "5 m"}})

b.check(50)
