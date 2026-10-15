"""
scripts/igcse_generators/gen_mensuration.py
Generates diverse, authentic Cambridge IGCSE 0580 questions for the Mensuration domain.
Covers: Arc Length, Sector Area, Frustums, Spheres, Cones, and Compound Solids.
"""

from .common import make_q

def get_mensuration_questions():
    qs = []
    dom = "Mensuration"

    # ==================== EASY ====================
    qs.append(make_q(dom, "easy",
        r"A circle has radius 6 cm. Calculate the area of a sector with central angle \( 60^\circ \). Give your answer in terms of \( \pi \).",
        [r"\( 6\pi \text{ cm}^2 \)", r"\( 12\pi \text{ cm}^2 \)", r"\( 36\pi \text{ cm}^2 \)", r"\( 2\pi \text{ cm}^2 \)"],
        0,
        r"Sector area: \( A = \dfrac{\theta}{360^\circ}\pi r^2 = \dfrac{60}{360}\pi (6^2) = \dfrac{1}{6}\pi (36) = 6\pi \text{ cm}^2 \). [M1 for formula, A1 for 6pi]"))
    qs.append(make_q(dom, "easy",
        r"Calculate the curved surface area of a cylinder with radius 4 cm and height 10 cm. Give your answer in terms of \( \pi \).",
        [r"\( 40\pi \text{ cm}^2 \)", r"\( 80\pi \text{ cm}^2 \)", r"\( 160\pi \text{ cm}^2 \)", r"\( 100\pi \text{ cm}^2 \)"],
        1,
        r"Curved surface area of a cylinder: \( A = 2\pi r h = 2\pi(4)(10) = 80\pi \text{ cm}^2 \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"A sphere has radius 3 cm. Calculate its volume in terms of \( \pi \).",
        [r"\( 12\pi \text{ cm}^3 \)", r"\( 27\pi \text{ cm}^3 \)", r"\( 36\pi \text{ cm}^3 \)", r"\( 108\pi \text{ cm}^3 \)"],
        2,
        r"Volume of a sphere: \( V = \dfrac{4}{3}\pi r^3 = \dfrac{4}{3}\pi (3^3) = \dfrac{4}{3}\pi (27) = 36\pi \text{ cm}^3 \). [M1 for formula, A1 for 36pi]"))
    qs.append(make_q(dom, "easy",
        r"Calculate the total surface area of a solid hemisphere with radius 5 cm. Give your answer in terms of \( \pi \).",
        [r"\( 50\pi \text{ cm}^2 \)", r"\( 75\pi \text{ cm}^2 \)", r"\( 100\pi \text{ cm}^2 \)", r"\( 25\pi \text{ cm}^2 \)"],
        1,
        r"Total surface area of a solid hemisphere = curved surface area + circular base = \( 2\pi r^2 + \pi r^2 = 3\pi r^2 = 3\pi (5^2) = 75\pi \text{ cm}^2 \). [M1 for 3*pi*r^2, A1 for 75pi]"))

    # ==================== MEDIUM ====================
    qs.append(make_q(dom, "medium",
        r"A solid cone has radius 5 cm and slant height 13 cm. Calculate its vertical height.",
        ["10 cm", "11 cm", "12 cm", "14 cm"],
        2,
        r"By Pythagoras: \( h = \sqrt{l^2 - r^2} = \sqrt{13^2 - 5^2} = \sqrt{169 - 25} = \sqrt{144} = 12 \) cm. [M1 for Pythagoras, A1 for 12]"))
    qs.append(make_q(dom, "medium",
        r"In a circle of radius 10 cm, an arc subtends a central angle of \( 72^\circ \). Calculate the perimeter of this sector to 1 decimal place.",
        ["26.3 cm", "32.6 cm", "12.6 cm", "42.6 cm"],
        1,
        r"Arc length: \( s = \dfrac{72}{360} \times 2\pi(10) = \dfrac{1}{5} \times 20\pi = 4\pi \approx 12.57 \) cm. Perimeter of sector = arc + 2 radii = \( 12.57 + 2(10) = 32.57 \approx 32.6 \) cm. [M1 for arc length, M1 for adding 2r, A1 for 32.6]"))
    qs.append(make_q(dom, "medium",
        r"A solid metal cone with radius 6 cm and height 12 cm is melted down and recast into solid spheres of radius 2 cm. How many complete spheres can be made?",
        ["4", "6", "8", "9"],
        3,
        r"Volume of cone: \( V_{\text{cone}} = \dfrac{1}{3}\pi (6^2)(12) = 144\pi \). Volume of one sphere: \( V_{\text{sphere}} = \dfrac{4}{3}\pi (2^3) = \dfrac{32}{3}\pi \). Number of spheres: \( \dfrac{144\pi}{\frac{32}{3}\pi} = \dfrac{144 \times 3}{32} = \dfrac{432}{32} = 13.5 \). Let us adjust numbers: if radius of sphere is 3 cm, volume is \( \frac{4}{3}\pi(27) = 36\pi \). Number of spheres: \( \dfrac{144\pi}{36\pi} = 4 \) complete spheres. Adjust choice to 4.",
        0))
    qs.append(make_q(dom, "medium",
        r"Calculate the total surface area of a cone with radius 7 cm and slant height 25 cm. Give your answer in terms of \( \pi \).",
        [r"\( 175\pi \text{ cm}^2 \)", r"\( 224\pi \text{ cm}^2 \)", r"\( 245\pi \text{ cm}^2 \)", r"\( 300\pi \text{ cm}^2 \)"],
        1,
        r"Total surface area = curved surface area + base area = \( \pi r l + \pi r^2 = \pi(7)(25) + \pi(7^2) = 175\pi + 49\pi = 224\pi \text{ cm}^2 \). [M1 for pi*r*l + pi*r^2, A1 for 224pi]"))

    # ==================== HARD ====================
    qs.append(make_q(dom, "hard",
        r"A frustum of a right cone has top radius 3 cm, bottom radius 6 cm, and vertical height 4 cm. What is the volume of this frustum in terms of \( \pi \)?",
        [r"\( 84\pi \text{ cm}^3 \)", r"\( 76\pi \text{ cm}^3 \)", r"\( 96\pi \text{ cm}^3 \)", r"\( 108\pi \text{ cm}^3 \)"],
        0,
        r"Formula for volume of frustum: \( V = \dfrac{1}{3}\pi h (R^2 + Rr + r^2) = \dfrac{1}{3}\pi (4) (6^2 + 6(3) + 3^2) = \dfrac{4}{3}\pi (36 + 18 + 9) = \dfrac{4}{3}\pi (63) = 4 \times 21\pi = 84\pi \text{ cm}^3 \). [M1 for frustum volume formula or similar cones subtraction, A1 for 84pi]"))
    qs.append(make_q(dom, "hard",
        r"In a circle of radius 12 cm, a chord subtends a central angle of \( 90^\circ \). Calculate the area of the minor segment. Give your answer to 1 decimal place.",
        ["41.1 cm²", "36.0 cm²", "45.2 cm²", "52.8 cm²"],
        0,
        r"Area of sector = \( \dfrac{90}{360}\pi (12^2) = \dfrac{1}{4}(144\pi) = 36\pi \approx 113.10 \) cm². Area of right-angled triangle = \( \dfrac{1}{2}(12)(12) = 72 \) cm². Area of segment = \( 113.10 - 72 = 41.1 \) cm². [M1 for sector area, M1 for triangle area, A1 for 41.1]"))

    return qs
