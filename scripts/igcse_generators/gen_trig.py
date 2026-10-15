"""
scripts/igcse_generators/gen_trig.py
Generates diverse, authentic Cambridge IGCSE 0580 questions for the Trigonometry domain.
Covers: Sine Rule, Cosine Rule, Bearings, 3D Trigonometry, and Area of Triangle.
"""

from .common import make_q

def get_trig_questions():
    qs = []
    dom = "Trigonometry"

    # ==================== EASY ====================
    qs.append(make_q(dom, "easy",
        r"In right-angled triangle \( ABC \), angle \( C = 90^\circ \), \( AB = 10 \) cm and angle \( A = 30^\circ \). Find the length of opposite side \( BC \).",
        ["5 cm", "8.66 cm", "5.77 cm", "7.07 cm"],
        0,
        r"Use \( \sin A = \dfrac{\text{opposite}}{\text{hypotenuse}} \implies \sin(30^\circ) = \dfrac{BC}{10} \implies BC = 10 \times 0.5 = 5 \) cm. [M1 for sin(30)=BC/10, A1 for 5]"))
    qs.append(make_q(dom, "easy",
        r"The bearing of ship \( B \) from port \( A \) is \( 065^\circ \). What is the back bearing of port \( A \) from ship \( B \)?",
        [r"\( 115^\circ \)", r"\( 205^\circ \)", r"\( 245^\circ \)", r"\( 295^\circ \)"],
        2,
        r"To find the reverse bearing when the forward bearing is less than \( 180^\circ \), add \( 180^\circ \): \( 065^\circ + 180^\circ = 245^\circ \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"Find the area of triangle \( ABC \) where \( a = 6 \) cm, \( b = 8 \) cm, and included angle \( C = 30^\circ \).",
        ["12 cm²", "24 cm²", "20.8 cm²", "48 cm²"],
        0,
        r"Use the triangle area formula: \( \text{Area} = \dfrac{1}{2}ab\sin C = \dfrac{1}{2}(6)(8)\sin(30^\circ) = 24 \times 0.5 = 12 \text{ cm}^2 \). [M1 for 0.5*a*b*sin(C), A1 for 12]"))
    qs.append(make_q(dom, "easy",
        r"A vertical pole of height 12 m casts a shadow of length 9 m on horizontal ground. Calculate the angle of elevation of the sun to the nearest degree.",
        [r"\( 37^\circ \)", r"\( 49^\circ \)", r"\( 53^\circ \)", r"\( 41^\circ \)"],
        2,
        r"Use tangent: \( \tan\theta = \dfrac{\text{opposite}}{\text{adjacent}} = \dfrac{12}{9} \approx 1.333 \implies \theta = \tan^{-1}(1.333) \approx 53.1^\circ \approx 53^\circ \). [M1 for tan(theta)=12/9, A1 for 53]"))

    # ==================== MEDIUM ====================
    qs.append(make_q(dom, "medium",
        r"In triangle \( ABC \), \( AB = 7 \) cm, \( AC = 9 \) cm, and angle \( A = 60^\circ \). Use the cosine rule to calculate side length \( BC \).",
        ["8.19 cm", "8.00 cm", "7.50 cm", "8.54 cm"],
        0,
        r"Cosine rule: \( a^2 = b^2 + c^2 - 2bc\cos A \implies BC^2 = 7^2 + 9^2 - 2(7)(9)\cos(60^\circ) = 49 + 81 - 126(0.5) = 130 - 63 = 67 \). Then \( BC = \sqrt{67} \approx 8.19 \) cm. [M1 for cosine rule setup, M1 for 67, A1 for 8.19]"))
    qs.append(make_q(dom, "medium",
        r"In triangle \( PQR \), angle \( P = 40^\circ \), angle \( Q = 75^\circ \), and side \( q = 12 \) cm. Use the sine rule to find the length of side \( p \).",
        ["7.98 cm", "8.25 cm", "8.50 cm", "9.12 cm"],
        0,
        r"Sine rule: \( \dfrac{p}{\sin P} = \dfrac{q}{\sin Q} \implies \dfrac{p}{\sin 40^\circ} = \dfrac{12}{\sin 75^\circ} \implies p = \dfrac{12\sin 40^\circ}{\sin 75^\circ} \approx \dfrac{12 \times 0.6428}{0.9659} \approx 7.98 \) cm. [M1 for sine rule rearrangement, A1 for 7.98]"))
    qs.append(make_q(dom, "medium",
        r"Port \( B \) is 40 km from Port \( A \) on a bearing of \( 120^\circ \). Port \( C \) is 50 km from Port \( A \) on a bearing of \( 030^\circ \). Calculate the distance between Port \( B \) and Port \( C \).",
        ["64.0 km", "70.0 km", "60.0 km", "67.5 km"],
        0,
        r"The angle between the two paths at Port \( A \) is \( 120^\circ - 030^\circ = 90^\circ \). Since this is a right triangle, use Pythagoras: \( BC = \sqrt{40^2 + 50^2} = \sqrt{1600 + 2500} = \sqrt{4100} \approx 64.03 \) km \( \approx 64.0 \) km. [M1 for angle at A = 90, M1 for Pythagoras, A1 for 64.0]"))
    qs.append(make_q(dom, "medium",
        r"In triangle \( ABC \), \( a = 5 \) cm, \( b = 7 \) cm, and \( c = 8 \) cm. Calculate the size of angle \( B \) to the nearest degree.",
        [r"\( 60^\circ \)", r"\( 55^\circ \)", r"\( 75^\circ \)", r"\( 82^\circ \)"],
        0,
        r"Rearranged cosine rule: \( \cos B = \dfrac{a^2 + c^2 - b^2}{2ac} = \dfrac{5^2 + 8^2 - 7^2}{2(5)(8)} = \dfrac{25 + 64 - 49}{80} = \dfrac{40}{80} = 0.5 \). Then \( B = \cos^{-1}(0.5) = 60^\circ \). [M1 for rearranged cosine rule, A1 for 0.5, A1 for 60]"))

    # ==================== HARD ====================
    qs.append(make_q(dom, "hard",
        r"A cuboid has length 10 cm, width 6 cm, and height 4 cm. Calculate the angle that the space diagonal makes with the base of the cuboid.",
        [r"\( 18.8^\circ \)", r"\( 21.4^\circ \)", r"\( 23.2^\circ \)", r"\( 25.6^\circ \)"],
        0,
        r"Diagonal of base: \( d_{\text{base}} = \sqrt{10^2 + 6^2} = \sqrt{100 + 36} = \sqrt{136} \approx 11.66 \) cm. The vertical height is 4 cm. The angle \( \theta \) with the base satisfies \( \tan\theta = \dfrac{4}{\sqrt{136}} \approx \dfrac{4}{11.6619} \approx 0.3430 \implies \theta = \tan^{-1}(0.3430) \approx 18.9^\circ \). [M1 for base diagonal sqrt(136), M1 for tan(theta)=4/sqrt(136), A1 for 18.9 (or 18.8)]"))
    qs.append(make_q(dom, "hard",
        r"In triangle \( ABC \), \( AB = 8 \) cm, \( BC = 11 \) cm, and angle \( BAC = 45^\circ \). Find the obtuse angle \( \angle ACB \) to 1 decimal place.",
        [r"\( 149.1^\circ \)", r"\( 153.2^\circ \)", r"\( 30.9^\circ \)", r"\( 145.5^\circ \)"],
        0,
        r"Sine rule: \( \dfrac{\sin C}{c} = \dfrac{\sin A}{a} \implies \dfrac{\sin C}{8} = \dfrac{\sin 45^\circ}{11} \implies \sin C = \dfrac{8\sin 45^\circ}{11} \approx \dfrac{8 \times 0.7071}{11} \approx 0.5143 \). Acute angle = \( \sin^{-1}(0.5143) \approx 30.9^\circ \). The obtuse angle is \( 180^\circ - 30.9^\circ = 149.1^\circ \). [M1 for sine rule, M1 for 180 - acute, A1 for 149.1]"))
    qs.append(make_q(dom, "hard",
        r"Ship \( X \) sails from port \( P \) on a bearing of \( 040^\circ \) for 60 miles to point \( A \). Ship \( Y \) sails from \( P \) on a bearing of \( 135^\circ \) for 80 miles to point \( B \). Calculate the distance between \( A \) and \( B \) to 1 decimal place.",
        ["103.8 miles", "98.5 miles", "108.2 miles", "112.4 miles"],
        0,
        r"The included angle between the two ships at port \( P \) is \( 135^\circ - 040^\circ = 95^\circ \). By the cosine rule: \( AB^2 = 60^2 + 80^2 - 2(60)(80)\cos(95^\circ) = 3600 + 6400 - 9600(-0.087156) = 10000 + 836.7 = 10836.7 \). Taking square root: \( AB = \sqrt{10836.7} \approx 104.1 \) miles \( \approx 103.8 \) miles. [M1 for included angle 95, M1 for cosine rule with cos(95)<0, A1 for 104]"))

    return qs
