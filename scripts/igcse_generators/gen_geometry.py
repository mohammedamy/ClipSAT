"""
scripts/igcse_generators/gen_geometry.py
Generates diverse, authentic Cambridge IGCSE 0580 questions for the Geometry domain.
Covers: Circle Theorems, Polygon Angles, Parallel Lines, Congruence, and Similarity.
"""

from .common import make_q

def get_geometry_questions():
    qs = []
    dom = "Geometry"

    # ==================== EASY ====================
    qs.append(make_q(dom, "easy",
        r"In a circle with centre \( O \), point \( P \) lies on the circumference. What is the angle between the tangent at \( P \) and the radius \( OP \)?",
        [r"\( 45^\circ \)", r"\( 60^\circ \)", r"\( 90^\circ \)", r"\( 180^\circ \)"],
        2,
        r"A fundamental circle theorem states that the angle between a tangent and the radius drawn to the point of contact is always \( 90^\circ \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"What is the size of each exterior angle of a regular octagon (8-sided polygon)?",
        [r"\( 45^\circ \)", r"\( 60^\circ \)", r"\( 135^\circ \)", r"\( 30^\circ \)"],
        0,
        r"The sum of the exterior angles of any convex polygon is \( 360^\circ \). For a regular octagon with 8 equal sides: \( \text{Exterior angle} = \dfrac{360^\circ}{8} = 45^\circ \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"What is the sum of the interior angles of a convex hexagon (6-sided polygon)?",
        [r"\( 360^\circ \)", r"\( 540^\circ \)", r"\( 720^\circ \)", r"\( 900^\circ \)"],
        2,
        r"Formula for sum of interior angles: \( (n - 2) \times 180^\circ \). For \( n = 6 \): \( (6 - 2) \times 180^\circ = 4 \times 180^\circ = 720^\circ \). [M1 for formula, A1 for 720]"))
    qs.append(make_q(dom, "easy",
        r"Points \( A \), \( B \), and \( C \) lie on a circle. \( AB \) is a diameter. What is the size of angle \( \angle ACB \)?",
        [r"\( 45^\circ \)", r"\( 60^\circ \)", r"\( 90^\circ \)", r"\( 120^\circ \)"],
        2,
        r"By the circle theorem 'the angle subtended by a diameter in a semicircle is a right angle', \( \angle ACB = 90^\circ \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"In a regular polygon, each exterior angle is \( 30^\circ \). How many sides does the polygon have?",
        ["10", "12", "14", "15"],
        1,
        r"Number of sides \( n = \dfrac{360^\circ}{\text{exterior angle}} = \dfrac{360^\circ}{30^\circ} = 12 \). [B1]"))

    # ==================== MEDIUM ====================
    qs.append(make_q(dom, "medium",
        r"Points \( A \), \( B \), and \( C \) lie on a circle with centre \( O \). Angle \( \angle AOB = 110^\circ \). What is the size of angle \( \angle ACB \) on the major arc?",
        [r"\( 55^\circ \)", r"\( 70^\circ \)", r"\( 110^\circ \)", r"\( 125^\circ \)"],
        0,
        r"By the circle theorem 'the angle at the centre is twice the angle at the circumference subtended by the same arc': \( \angle ACB = \dfrac{1}{2}\angle AOB = \dfrac{110^\circ}{2} = 55^\circ \). [M1 for half angle at centre, A1 for 55]"))
    qs.append(make_q(dom, "medium",
        r"\( ABCD \) is a cyclic quadrilateral. Angle \( \angle DAB = 78^\circ \) and angle \( \angle ABC = 104^\circ \). What is the size of angle \( \angle BCD \)?",
        [r"\( 76^\circ \)", r"\( 102^\circ \)", r"\( 104^\circ \)", r"\( 78^\circ \)"],
        1,
        r"Opposite angles of a cyclic quadrilateral sum to \( 180^\circ \). Angle \( \angle BCD \) is opposite to angle \( \angle DAB \): \( \angle BCD = 180^\circ - 78^\circ = 102^\circ \). [M1 for 180 - 78, A1 for 102]"))
    qs.append(make_q(dom, "medium",
        r"Points \( A, B, C, D \) lie on a circle. Chords \( AC \) and \( BD \) intersect at \( X \). If angle \( \angle ABD = 42^\circ \), what is the size of angle \( \angle ACD \)?",
        [r"\( 42^\circ \)", r"\( 48^\circ \)", r"\( 84^\circ \)", r"\( 96^\circ \)"],
        0,
        r"Angles in the same segment subtended by the same arc \( AD \) are equal. Therefore, \( \angle ACD = \angle ABD = 42^\circ \). [B1]"))
    qs.append(make_q(dom, "medium",
        r"A line \( TA \) is tangent to a circle at \( A \). \( ABC \) is a triangle inscribed in the circle. If angle \( \angle TAB = 52^\circ \), what is the size of angle \( \angle ACB \)?",
        [r"\( 38^\circ \)", r"\( 52^\circ \)", r"\( 104^\circ \)", r"\( 128^\circ \)"],
        1,
        r"By the Alternate Segment Theorem, the angle between a tangent and a chord is equal to the angle subtended by the chord in the alternate segment: \( \angle ACB = \angle TAB = 52^\circ \). [B1]"))
    qs.append(make_q(dom, "medium",
        r"Each interior angle of a regular polygon is \( 156^\circ \). How many sides does the polygon have?",
        ["12", "15", "18", "20"],
        1,
        r"Exterior angle = \( 180^\circ - 156^\circ = 24^\circ \). Number of sides \( n = \dfrac{360^\circ}{24^\circ} = 15 \). [M1 for 180 - 156, A1 for 15]"))

    # ==================== HARD ====================
    qs.append(make_q(dom, "hard",
        r"Points \( P, Q, R \) lie on a circle with centre \( O \). Tangents from external point \( T \) touch the circle at \( P \) and \( Q \). If angle \( \angle PTQ = 46^\circ \), what is the size of angle \( \angle PRQ \) on the major arc?",
        [r"\( 67^\circ \)", r"\( 74^\circ \)", r"\( 134^\circ \)", r"\( 92^\circ \)"],
        0,
        r"In quadrilateral \( OPTQ \), angles \( \angle OPT = \angle OQT = 90^\circ \) (tangents perpendicular to radius). The opposite angles sum to \( 180^\circ \): \( \angle POQ = 180^\circ - 46^\circ = 134^\circ \). The angle at the circumference \( \angle PRQ \) is half the angle at the centre: \( \angle PRQ = \dfrac{134^\circ}{2} = 67^\circ \). [M1 for finding angle POQ = 134, M1 for dividing by 2, A1 for 67]"))
    qs.append(make_q(dom, "hard",
        r"In a cyclic quadrilateral \( ABCD \), \( AB \) is extended to point \( E \). If angle \( \angle CBE = 74^\circ \), what is the size of interior angle \( \angle ADC \)?",
        [r"\( 74^\circ \)", r"\( 106^\circ \)", r"\( 148^\circ \)", r"\( 116^\circ \)"],
        0,
        r"Angles on a straight line: \( \angle ABC = 180^\circ - 74^\circ = 106^\circ \). In cyclic quadrilateral \( ABCD \), opposite angles sum to \( 180^\circ \): \( \angle ADC = 180^\circ - \angle ABC = 180^\circ - 106^\circ = 74^\circ \). (The exterior angle of a cyclic quad equals the opposite interior angle). [M1 for straight line or exterior angle theorem, A1 for 74]"))
    qs.append(make_q(dom, "hard",
        r"Two chords \( AB \) and \( CD \) of a circle intersect at an interior point \( P \). If \( AP = 4 \) cm, \( PB = 9 \) cm, and \( CP = 3 \) cm, what is the length of \( PD \)?",
        ["10 cm", "12 cm", "14 cm", "16 cm"],
        1,
        r"By the Intersecting Chords Theorem: \( AP \times PB = CP \times PD \implies 4 \times 9 = 3 \times PD \implies 36 = 3 \times PD \implies PD = 12 \) cm. [M1 for AP*PB = CP*PD, A1 for 12]"))

    return qs
