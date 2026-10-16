"""Precalculus Topics Data Part 2: Topics 4.01 to 6.02 (8 Topics).

Standardized 4-Page Format:
4 Sections × 3 Questions = 12 MCQs per topic with exact 4-page layout and full solutions.
"""

def make_q(q, choices, correct, answer):
    return {
        "q": q,
        "choices": choices,
        "correct": correct,
        "answer": answer
    }

PRECALC_TOPICS_P2 = [
    # ── 4.01 Circles and Parabolas ────────────────────────────────────────────
    {
        "track": "precalc",
        "num": "4.01",
        "slug": "circles-and-parabolas",
        "title": "Circles and Parabolas",
        "sections": [
            {
                "heading": "Section 1: Standard Equation and Features of Circles",
                "questions": [
                    make_q(
                        "Find the center and radius of the circle $(x - 3)^2 + (y + 5)^2 = 49$.",
                        ["Center: $(3, -5)$, Radius: $7$", "Center: $(-3, 5)$, Radius: $7$", "Center: $(3, -5)$, Radius: $49$", "Center: $(-3, 5)$, Radius: $49$"],
                        0,
                        "Standard form is $(x - h)^2 + (y - k)^2 = r^2$. Here $h = 3, k = -5, r = \\sqrt{49} = 7$."
                    ),
                    make_q(
                        "Convert the general equation $x^2 + y^2 - 6x + 8y - 11 = 0$ to standard form by completing the square.",
                        ["$(x - 3)^2 + (y + 4)^2 = 36$", "$(x + 3)^2 + (y - 4)^2 = 36$", "$(x - 3)^2 + (y + 4)^2 = 25$", "$(x - 6)^2 + (y + 8)^2 = 11$"],
                        0,
                        "$(x^2 - 6x + 9) + (y^2 + 8y + 16) = 11 + 9 + 16 = 36 \\Rightarrow (x - 3)^2 + (y + 4)^2 = 36$."
                    ),
                    make_q(
                        "Find the equation of the circle passing through the origin with center $(-2, 3)$.",
                        ["$(x + 2)^2 + (y - 3)^2 = 13$", "$(x - 2)^2 + (y + 3)^2 = 13$", "$(x + 2)^2 + (y - 3)^2 = 5$", "$(x + 2)^2 + (y - 3)^2 = 25$"],
                        0,
                        "Radius $r = \\sqrt{(-2 - 0)^2 + (3 - 0)^2} = \\sqrt{4 + 9} = \\sqrt{13}$. Equation: $(x + 2)^2 + (y - 3)^2 = 13$."
                    )
                ]
            },
            {
                "heading": "Section 2: Parabolas with Vertical Axis of Symmetry",
                "questions": [
                    make_q(
                        "Find the focus and directrix of the parabola $x^2 = 12y$.",
                        ["Focus: $(0, 3)$, Directrix: $y = -3$", "Focus: $(3, 0)$, Directrix: $x = -3$", "Focus: $(0, 12)$, Directrix: $y = -12$", "Focus: $(0, 6)$, Directrix: $y = -6$"],
                        0,
                        "$x^2 = 4py \\Rightarrow 4p = 12 \\Rightarrow p = 3$. Vertical axis, opens up: Focus is $(0, p) = (0, 3)$, directrix is $y = -p = -3$."
                    ),
                    make_q(
                        "Find the standard equation of the parabola with vertex $(0, 0)$ and focus $(0, -2)$.",
                        ["$x^2 = -8y$", "$y^2 = -8x$", "$x^2 = 8y$", "$y^2 = -4x$"],
                        0,
                        "Opens downward: $p = -2$. Standard equation: $x^2 = 4py = 4(-2)y = -8y$."
                    ),
                    make_q(
                        "Find the focal diameter (latus rectum length) of $(x - 1)^2 = -16(y + 2)$.",
                        ["$16$", "$4$", "$8$", "$32$"],
                        0,
                        "The focal diameter is $|4p| = |-16| = 16$."
                    )
                ]
            },
            {
                "heading": "Section 3: Parabolas with Horizontal Axis of Symmetry",
                "questions": [
                    make_q(
                        "Find the vertex, focus, and directrix of $(y - 2)^2 = 8(x + 1)$.",
                        ["Vertex: $(-1, 2)$, Focus: $(1, 2)$, Directrix: $x = -3$", "Vertex: $(1, -2)$, Focus: $(3, -2)$, Directrix: $x = -1$", "Vertex: $(-1, 2)$, Focus: $(-1, 4)$, Directrix: $y = 0$", "Vertex: $(2, -1)$, Focus: $(4, -1)$, Directrix: $x = 0$"],
                        0,
                        "$4p = 8 \\Rightarrow p = 2$. Vertex is $(h, k) = (-1, 2)$. Opens right: Focus is $(h+p, k) = (1, 2)$, directrix is $x = h - p = -1 - 2 = -3$."
                    ),
                    make_q(
                        "Find the equation of a parabola with vertex $(3, -1)$ and focus $(1, -1)$.",
                        ["$(y + 1)^2 = -8(x - 3)$", "$(x - 3)^2 = -8(y + 1)$", "$(y + 1)^2 = 8(x - 3)$", "$(y - 3)^2 = -4(x + 1)$"],
                        0,
                        "Horizontal axis $y = -1$. Opens left because focus $x = 1$ is to the left of vertex $x = 3$. $p = 1 - 3 = -2$. $(y + 1)^2 = 4(-2)(x - 3) = -8(x - 3)$."
                    ),
                    make_q(
                        "Convert $y^2 + 4y - 4x + 8 = 0$ to standard form.",
                        ["$(y + 2)^2 = 4(x - 1)$", "$(y - 2)^2 = 4(x + 1)$", "$(y + 2)^2 = 4x - 8$", "$(x - 1)^2 = 4(y + 2)$"],
                        0,
                        "$(y^2 + 4y + 4) = 4x - 8 + 4 = 4x - 4 \\Rightarrow (y + 2)^2 = 4(x - 1)$."
                    )
                ]
            },
            {
                "heading": "Section 4: Reflective Properties and Applications",
                "questions": [
                    make_q(
                        "A satellite dish has the shape of a paraboloid. If the cross-section is $x^2 = 20y$ (in inches), where should the receiver be placed?",
                        ["At $(0, 5)$, which is $5\\text{ inches}$ above the vertex", "$20\\text{ inches}$ above the vertex", "$10\\text{ inches}$ above the vertex", "$2.5\\text{ inches}$ above the vertex"],
                        0,
                        "Signals parallel to the axis reflect to the focus. $4p = 20 \\Rightarrow p = 5\\text{ inches}$ above the vertex."
                    ),
                    make_q(
                        "A suspension bridge cable hangs in the shape of a parabola with towers $100\\text{ m}$ apart and $20\\text{ m}$ high, touching the road at the center. Find its equation with origin at the vertex.",
                        ["$y = \\frac{1}{125}x^2$", "$y = \\frac{1}{250}x^2$", "$y = \\frac{1}{50}x^2$", "$y = \\frac{1}{20}x^2$"],
                        0,
                        "Vertex at $(0, 0)$. Towers at $(\\pm 50, 20)$. $20 = a(50)^2 = 2500a \\Rightarrow a = \\frac{20}{2500} = \\frac{1}{125}$."
                    ),
                    make_q(
                        "Why do parabolic headlights use a light source placed exactly at the focus?",
                        ["Light rays reflecting off the parabolic surface emerge in a parallel beam", "It spreads the light in all directions equally", "It minimizes heat production", "It prevents the mirror from tarnishing"],
                        0,
                        "By the geometric reflective property of parabolas, all rays emanating from the focus reflect parallel to the axis of symmetry."
                    )
                ]
            }
        ]
    },

    # ── 4.02 Ellipses ─────────────────────────────────────────────────────────
    {
        "track": "precalc",
        "num": "4.02",
        "slug": "ellipses",
        "title": "Ellipses",
        "sections": [
            {
                "heading": "Section 1: Horizontal and Vertical Standard Forms",
                "questions": [
                    make_q(
                        "Find the center, vertices, and co-vertices of $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$.",
                        ["Center: $(0, 0)$, Vertices: $(\\pm 5, 0)$, Co-vertices: $(0, \\pm 3)$", "Center: $(0, 0)$, Vertices: $(0, \\pm 5)$, Co-vertices: $(\\pm 3, 0)$", "Center: $(5, 3)$, Vertices: $(\\pm 5, 0)$", "Center: $(0, 0)$, Vertices: $(\\pm 25, 0)$"],
                        0,
                        "$a^2 = 25 \\Rightarrow a = 5$ (major axis horizontal). $b^2 = 9 \\Rightarrow b = 3$. Vertices at $(\\pm 5, 0)$, co-vertices at $(0, \\pm 3)$."
                    ),
                    make_q(
                        "Find the standard equation of the ellipse with center $(0, 0)$, vertices $(0, \\pm 6)$, and co-vertices $(\\pm 4, 0)$.",
                        ["$\\frac{x^2}{16} + \\frac{y^2}{36} = 1$", "$\\frac{x^2}{36} + \\frac{y^2}{16} = 1$", "$\\frac{x^2}{4} + \\frac{y^2}{6} = 1$", "$\\frac{x^2}{20} + \\frac{y^2}{36} = 1$"],
                        0,
                        "Major axis vertical: $a = 6 \\Rightarrow a^2 = 36$ under $y^2$. Minor axis horizontal: $b = 4 \\Rightarrow b^2 = 16$ under $x^2$."
                    ),
                    make_q(
                        "Find the length of the major and minor axes for $\\frac{(x - 2)^2}{16} + \\frac{(y + 1)^2}{4} = 1$.",
                        ["Major axis $= 8$, Minor axis $= 4$", "Major axis $= 4$, Minor axis $= 2$", "Major axis $= 16$, Minor axis $= 4$", "Major axis $= 8$, Minor axis $= 2$"],
                        0,
                        "$a^2 = 16 \\Rightarrow a = 4$, major axis length $2a = 8$. $b^2 = 4 \\Rightarrow b = 2$, minor axis length $2b = 4$."
                    )
                ]
            },
            {
                "heading": "Section 2: Foci and the Fundamental Relationship",
                "questions": [
                    make_q(
                        "What is the fundamental relationship between semi-major axis $a$, semi-minor axis $b$, and focal distance $c$ in an ellipse?",
                        ["$c^2 = a^2 - b^2$", "$c^2 = a^2 + b^2$", "$a^2 = b^2 - c^2$", "$c = a - b$"],
                        0,
                        "In an ellipse, the foci lie on the major axis inside the vertices, governed by the Pythagorean relation $c^2 = a^2 - b^2$."
                    ),
                    make_q(
                        "Find the coordinates of the foci of $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$.",
                        ["$(\\pm 4, 0)$", "$(0, \\pm 4)$", "$(\\pm \\sqrt{34}, 0)$", "$(\\pm 16, 0)$"],
                        0,
                        "$c^2 = a^2 - b^2 = 25 - 9 = 16 \\Rightarrow c = 4$. Major axis is horizontal, so foci are $(\\pm 4, 0)$."
                    ),
                    make_q(
                        "Find the foci of $\\frac{x^2}{16} + \\frac{y^2}{25} = 1$.",
                        ["$(0, \\pm 3)$", "$(\\pm 3, 0)$", "$(0, \\pm \\sqrt{41})$", "$(\\pm 9, 0)$"],
                        0,
                        "Major axis is vertical ($a^2 = 25$). $c^2 = 25 - 16 = 9 \\Rightarrow c = 3$. Foci are $(0, \\pm 3)$."
                    )
                ]
            },
            {
                "heading": "Section 3: Eccentricity",
                "questions": [
                    make_q(
                        "How is the eccentricity $e$ of an ellipse defined, and what is its range?",
                        ["$e = \\frac{c}{a}$, where $0 \\leq e < 1$", "$e = \\frac{a}{c}$, where $e > 1$", "$e = \\frac{b}{a}$, where $e < 0$", "$e = c^2/a^2$"],
                        0,
                        "Eccentricity is the ratio of focal distance to semi-major axis: $e = c/a$. For any ellipse, $0 \\leq e < 1$ (with $e = 0$ being a circle)."
                    ),
                    make_q(
                        "Find the eccentricity of the ellipse $\\frac{x^2}{100} + \\frac{y^2}{64} = 1$.",
                        ["$0.6$", "$0.8$", "$0.36$", "$0.64$"],
                        0,
                        "$a = 10, b = 8 \\Rightarrow c = \\sqrt{100 - 64} = \\sqrt{36} = 6$. Eccentricity $e = c/a = 6/10 = 0.6$."
                    ),
                    make_q(
                        "What happens to the shape of an ellipse as its eccentricity approaches 0?",
                        ["It becomes nearly circular", "It becomes very elongated / needle-like", "It approaches a parabola", "It opens outward"],
                        0,
                        "When $e \\to 0$, $c \\to 0$, meaning the two foci merge into the center, producing a circle ($a = b$)."
                    )
                ]
            },
            {
                "heading": "Section 4: Completing the Square and Whispering Galleries",
                "questions": [
                    make_q(
                        "Convert $4x^2 + 9y^2 - 16x + 54y + 61 = 0$ to standard form.",
                        ["$\\frac{(x - 2)^2}{9} + \\frac{(y + 3)^2}{4} = 1$", "$\\frac{(x - 2)^2}{4} + \\frac{(y + 3)^2}{9} = 1$", "$\\frac{(x + 2)^2}{9} + \\frac{(y - 3)^2}{4} = 1$", "$(x - 2)^2 + (y + 3)^2 = 36$"],
                        0,
                        "$4(x^2 - 4x + 4) + 9(y^2 + 6y + 9) = -61 + 16 + 81 = 36$. Dividing by 36: $\\frac{(x-2)^2}{9} + \\frac{(y+3)^2}{4} = 1$."
                    ),
                    make_q(
                        "A whispering gallery is an elliptical room $100\\text{ ft}$ long and $60\\text{ ft}$ wide. How far from the center are the two whispering spots (foci)?",
                        ["$40\\text{ ft}$", "$50\\text{ ft}$", "$30\\text{ ft}$", "$20\\text{ ft}$"],
                        0,
                        "$2a = 100 \\Rightarrow a = 50$. $2b = 60 \\Rightarrow b = 30$. $c = \\sqrt{50^2 - 30^2} = \\sqrt{2500 - 900} = \\sqrt{1600} = 40\\text{ ft}$ from the center."
                    ),
                    make_q(
                        "Why can a whisper at one focus of an elliptical gallery be heard clearly at the other focus?",
                        ["Sound waves reflecting off the elliptical wall all converge simultaneously at the other focus", "Sound waves travel faster along ellipses", "The walls absorb echo", "The ceiling acts as a resonator"],
                        0,
                        "By the reflective property of the ellipse, any ray emitted from one focus reflects off the perimeter directly toward the opposite focus with equal path length."
                    )
                ]
            }
        ]
    },

    # ── 4.03 Hyperbolas ───────────────────────────────────────────────────────
    {
        "track": "precalc",
        "num": "4.03",
        "slug": "hyperbolas",
        "title": "Hyperbolas",
        "sections": [
            {
                "heading": "Section 1: Standard Equations of Hyperbolas",
                "questions": [
                    make_q(
                        "Find the vertices and orientation of $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$.",
                        ["Horizontal, vertices at $(\\pm 4, 0)$", "Vertical, vertices at $(0, \\pm 3)$", "Horizontal, vertices at $(\\pm 5, 0)$", "Vertical, vertices at $(0, \\pm 4)$"],
                        0,
                        "Positive term is $x^2$, so the transverse axis is horizontal. $a^2 = 16 \\Rightarrow a = 4$. Vertices are $(\\pm 4, 0)$."
                    ),
                    make_q(
                        "Find the vertices and orientation of $\\frac{y^2}{25} - \\frac{x^2}{144} = 1$.",
                        ["Vertical, vertices at $(0, \\pm 5)$", "Horizontal, vertices at $(\\pm 12, 0)$", "Vertical, vertices at $(0, \\pm 13)$", "Horizontal, vertices at $(\\pm 5, 0)$"],
                        0,
                        "Positive term is $y^2$, so the transverse axis is vertical. $a^2 = 25 \\Rightarrow a = 5$. Vertices are $(0, \\pm 5)$."
                    ),
                    make_q(
                        "Find the length of the transverse axis and conjugate axis for $\\frac{(x - 1)^2}{36} - \\frac{(y + 2)^2}{64} = 1$.",
                        ["Transverse $= 12$, Conjugate $= 16$", "Transverse $= 6$, Conjugate $= 8$", "Transverse $= 16$, Conjugate $= 12$", "Transverse $= 72$, Conjugate $= 128$"],
                        0,
                        "$a^2 = 36 \\Rightarrow a = 6 \\Rightarrow 2a = 12$. $b^2 = 64 \\Rightarrow b = 8 \\Rightarrow 2b = 16$."
                    )
                ]
            },
            {
                "heading": "Section 2: Asymptotes of Hyperbolas",
                "questions": [
                    make_q(
                        "State the equations of the asymptotes for the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$.",
                        ["$y = \\pm \\frac{b}{a}x$", "$y = \\pm \\frac{a}{b}x$", "$y = \\pm \\frac{b^2}{a^2}x$", "$y = \\pm x$"],
                        0,
                        "For a horizontal hyperbola centered at the origin, the asymptotes pass through the center with slopes $\\pm b/a$: $y = \\pm \\frac{b}{a}x$."
                    ),
                    make_q(
                        "Find the asymptotes of $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$.",
                        ["$y = \\pm \\frac{4}{3}x$", "$y = \\pm \\frac{3}{4}x$", "$y = \\pm \\frac{16}{9}x$", "$y = \\pm \\frac{5}{3}x$"],
                        0,
                        "$a = 3, b = 4$. Asymptotes: $y = \\pm \\frac{b}{a}x = \\pm \\frac{4}{3}x$."
                    ),
                    make_q(
                        "Find the asymptotes of the vertical hyperbola $\\frac{y^2}{4} - \\frac{x^2}{9} = 1$.",
                        ["$y = \\pm \\frac{2}{3}x$", "$y = \\pm \\frac{3}{2}x$", "$y = \\pm \\frac{4}{9}x$", "$y = \\pm 2x$"],
                        0,
                        "For a vertical hyperbola centered at $(0, 0)$, $a^2$ is under $y^2$ and $b^2$ is under $x^2$. Asymptotes are $y = \\pm \\frac{a}{b}x = \\pm \\frac{2}{3}x$."
                    )
                ]
            },
            {
                "heading": "Section 3: Foci and Eccentricity of Hyperbolas",
                "questions": [
                    make_q(
                        "What is the relationship between $a, b$, and focal distance $c$ for a hyperbola?",
                        ["$c^2 = a^2 + b^2$", "$c^2 = a^2 - b^2$", "$a^2 = b^2 + c^2$", "$c = a + b$"],
                        0,
                        "In a hyperbola, the foci lie farther from the center than the vertices, so $c^2 = a^2 + b^2$."
                    ),
                    make_q(
                        "Find the foci of $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$.",
                        ["$(\\pm 5, 0)$", "$(0, \\pm 5)$", "$(\\pm \\sqrt{7}, 0)$", "$(\\pm 25, 0)$"],
                        0,
                        "$c^2 = 16 + 9 = 25 \\Rightarrow c = 5$. Horizontal transverse axis: foci are $(\\pm 5, 0)$."
                    ),
                    make_q(
                        "Find the eccentricity $e = c/a$ of $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$.",
                        ["$5/4 = 1.25$", "$4/5 = 0.8$", "$3/4 = 0.75$", "$\\sqrt{7}/4$"],
                        0,
                        "$c = 5, a = 4$. Eccentricity $e = c/a = 5/4 = 1.25 > 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Identifying Conics from General Second-Degree Equations",
                "questions": [
                    make_q(
                        "For $A x^2 + C y^2 + D x + E y + F = 0$ ($A, C \\neq 0$), which condition identifies a hyperbola?",
                        ["$A$ and $C$ have opposite signs ($A C < 0$)", "$A$ and $C$ have the same sign and $A = C$", "$A$ and $C$ have the same sign and $A \\neq C$", "$A = 0$ or $C = 0$"],
                        0,
                        "If $A C < 0$, the quadratic terms have opposite signs, representing a hyperbola."
                    ),
                    make_q(
                        "Identify the conic: $9x^2 - 4y^2 - 36x + 8y - 4 = 0$.",
                        ["Hyperbola", "Ellipse", "Parabola", "Circle"],
                        0,
                        "$A = 9 > 0$ and $C = -4 < 0$. The signs are opposite, so this equation represents a hyperbola."
                    ),
                    make_q(
                        "Convert $9x^2 - 4y^2 - 36x + 8y - 4 = 0$ to standard form.",
                        ["$\\frac{(x - 2)^2}{4} - \\frac{(y - 1)^2}{9} = 1$", "$\\frac{(x - 2)^2}{9} - \\frac{(y - 1)^2}{4} = 1$", "$\\frac{(y - 1)^2}{9} - \\frac{(x - 2)^2}{4} = 1$", "$(x - 2)^2 - (y - 1)^2 = 36$"],
                        0,
                        "$9(x^2 - 4x + 4) - 4(y^2 - 2y + 1) = 4 + 36 - 4 = 36$. Dividing by 36: $\\frac{(x-2)^2}{4} - \\frac{(y-1)^2}{9} = 1$."
                    )
                ]
            }
        ]
    },

    # ── 5.01 Vectors: Components and Operations ───────────────────────────────
    {
        "track": "precalc",
        "num": "5.01",
        "slug": "vectors-components-and-operations",
        "title": "Vectors: Components and Operations",
        "sections": [
            {
                "heading": "Section 1: Geometric vs Component Form",
                "questions": [
                    make_q(
                        "Find the component form of vector $\\mathbf{v}$ with initial point $P(2, -3)$ and terminal point $Q(-1, 4)$.",
                        ["$\\langle -3, 7 \\rangle$", "$\\langle 1, 1 \\rangle$", "$\\langle 3, -7 \\rangle$", "$\\langle -2, -12 \\rangle$"],
                        0,
                        "$\\mathbf{v} = \\langle x_2 - x_1, y_2 - y_1 \\rangle = \\langle -1 - 2, 4 - (-3) \\rangle = \\langle -3, 7 \\rangle$."
                    ),
                    make_q(
                        "Express $\\mathbf{v} = \\langle 5, -8 \\rangle$ in terms of the standard unit basis vectors $\\mathbf{i}$ and $\\mathbf{j}$.",
                        ["$5\\mathbf{i} - 8\\mathbf{j}$", "$5\\mathbf{i} + 8\\mathbf{j}$", "$-8\\mathbf{i} + 5\\mathbf{j}$", "$5\\mathbf{j} - 8\\mathbf{i}$"],
                        0,
                        "$\\mathbf{i} = \\langle 1, 0 \\rangle$ and $\\mathbf{j} = \\langle 0, 1 \\rangle$, so $\\langle 5, -8 \\rangle = 5\\mathbf{i} - 8\\mathbf{j}$."
                    ),
                    make_q(
                        "When are two geometric vectors considered equal?",
                        ["When they have both the same magnitude and the same direction", "When they have the same initial point", "When their lengths are equal regardless of direction", "When they are collinear"],
                        0,
                        "Vectors are defined strictly by magnitude and direction, independent of their initial position in space."
                    )
                ]
            },
            {
                "heading": "Section 2: Magnitude and Direction Angle",
                "questions": [
                    make_q(
                        "Find the magnitude of $\\mathbf{v} = \\langle -6, 8 \\rangle$.",
                        ["$10$", "$14$", "$\\sqrt{28}$", "$2$"],
                        0,
                        "$\\|\\mathbf{v}\\| = \\sqrt{(-6)^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$."
                    ),
                    make_q(
                        "Find the direction angle $\\theta \\in [0^\\circ, 360^\\circ)$ of $\\mathbf{v} = \\langle -3, 3\\sqrt{3} \\rangle$.",
                        ["$120^\\circ$", "$60^\\circ$", "$150^\\circ$", "$240^\\circ$"],
                        0,
                        "In Quadrant II: $\\tan\\theta = \\frac{3\\sqrt{3}}{-3} = -\\sqrt{3}$. Reference angle is $60^\\circ$, so $\\theta = 180^\\circ - 60^\\circ = 120^\\circ$."
                    ),
                    make_q(
                        "Find the components of a vector with magnitude $12$ and direction angle $210^\\circ$.",
                        ["$\\langle -6\\sqrt{3}, -6 \\rangle$", "$\\langle -6, -6\\sqrt{3} \\rangle$", "$\\langle 6\\sqrt{3}, 6 \\rangle$", "$\\langle -6\\sqrt{2}, -6\\sqrt{2} \\rangle$"],
                        0,
                        "$v_x = 12\\cos(210^\\circ) = 12(-\\sqrt{3}/2) = -6\\sqrt{3}$. $v_y = 12\\sin(210^\\circ) = 12(-1/2) = -6$."
                    )
                ]
            },
            {
                "heading": "Section 3: Vector Addition, Subtraction, and Scalar Multiplication",
                "questions": [
                    make_q(
                        "Given $\\mathbf{u} = \\langle 3, -2 \\rangle$ and $\\mathbf{v} = \\langle -1, 5 \\rangle$, find $2\\mathbf{u} - 3\\mathbf{v}$.",
                        ["$\\langle 9, -19 \\rangle$", "$\\langle 3, 11 \\rangle$", "$\\langle 9, 11 \\rangle$", "$\\langle 3, -19 \\rangle$"],
                        0,
                        "$2\\mathbf{u} = \\langle 6, -4 \\rangle$. $3\\mathbf{v} = \\langle -3, 15 \\rangle$. Difference $= \\langle 6 - (-3), -4 - 15 \\rangle = \\langle 9, -19 \\rangle$."
                    ),
                    make_q(
                        "Find the unit vector $\\mathbf{u}$ in the same direction as $\\mathbf{v} = \\langle 5, -12 \\rangle$.",
                        ["$\\langle 5/13, -12/13 \\rangle$", "$\\langle 5/17, -12/17 \\rangle$", "$\\langle 1, -1 \\rangle$", "$\\langle 5, -12 \\rangle$"],
                        0,
                        "$\\|\\mathbf{v}\\| = \\sqrt{25 + 144} = 13$. Unit vector $\\mathbf{u} = \\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|} = \\langle 5/13, -12/13 \\rangle$."
                    ),
                    make_q(
                        "What is the result of multiplying any vector $\\mathbf{v}$ by scalar $-1$?",
                        ["A vector of the same magnitude pointing in the exactly opposite direction", "The zero vector", "A scalar number", "A perpendicular vector"],
                        0,
                        "Scalar multiplication by $-1$ negates every component, reversing the direction while preserving the magnitude."
                    )
                ]
            },
            {
                "heading": "Section 4: Resultant Forces and Navigation",
                "questions": [
                    make_q(
                        "Two forces act on an object: $\\mathbf{F}_1 = \\langle 20, 0 \\rangle\\text{ N}$ and $\\mathbf{F}_2 = \\langle 0, 15 \\rangle\\text{ N}$. Find the magnitude of the resultant force.",
                        ["$25\\text{ N}$", "$35\\text{ N}$", "$5\\text{ N}$", "$300\\text{ N}$"],
                        0,
                        "Resultant $\\mathbf{F} = \\langle 20, 15 \\rangle$. Magnitude $\\|\\mathbf{F}\\| = \\sqrt{20^2 + 15^2} = \\sqrt{400 + 225} = \\sqrt{625} = 25\\text{ N}$."
                    ),
                    make_q(
                        "An airplane flies at a heading due east with airspeed $400\\text{ mph}$. A wind blows from the south at $50\\text{ mph}$. Find the ground speed of the plane.",
                        ["$\\sqrt{400^2 + 50^2} \\approx 403.1\\text{ mph}$", "$450\\text{ mph}$", "$350\\text{ mph}$", "$425\\text{ mph}$"],
                        0,
                        "Plane velocity $\\mathbf{v}_p = \\langle 400, 0 \\rangle$. Wind velocity (blowing from south means heading north) $\\mathbf{v}_w = \\langle 0, 50 \\rangle$. Total $\\|\\mathbf{v}\\| = \\sqrt{160000 + 2500} = \\sqrt{162500} \\approx 403.1\\text{ mph}$."
                    ),
                    make_q(
                        "In the airplane problem, what is the drift angle north of east?",
                        ["$\\arctan(50/400) \\approx 7.1^\\circ$", "$12.5^\\circ$", "$45^\\circ$", "$3.6^\\circ$"],
                        0,
                        "$\\tan\\theta = \\frac{50}{400} = 0.125 \\Rightarrow \\theta = \\arctan(0.125) \\approx 7.1^\\circ$."
                    )
                ]
            }
        ]
    },

    # ── 5.02 The Dot Product ──────────────────────────────────────────────────
    {
        "track": "precalc",
        "num": "5.02",
        "slug": "the-dot-product",
        "title": "The Dot Product",
        "sections": [
            {
                "heading": "Section 1: Algebraic Definition and Properties",
                "questions": [
                    make_q(
                        "Find the dot product $\\mathbf{u} \\cdot \\mathbf{v}$ for $\\mathbf{u} = \\langle 4, -3 \\rangle$ and $\\mathbf{v} = \\langle 2, 5 \\rangle$.",
                        ["$-7$", "$23$", "$\\langle 8, -15 \\rangle$", "$1$"],
                        0,
                        "$\\mathbf{u} \\cdot \\mathbf{v} = u_1 v_1 + u_2 v_2 = (4)(2) + (-3)(5) = 8 - 15 = -7$."
                    ),
                    make_q(
                        "What is the value of $\\mathbf{v} \\cdot \\mathbf{v}$ for any vector $\\mathbf{v}$?",
                        ["$\\|\\mathbf{v}\\|^2$", "$\\|\\mathbf{v}\\|$", "$0$", "$1$"],
                        0,
                        "$\\mathbf{v} \\cdot \\mathbf{v} = v_1^2 + v_2^2 = \\|\\mathbf{v}\\|^2$."
                    ),
                    make_q(
                        "Which property does NOT hold for the dot product?",
                        ["$\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{v} \\cdot \\mathbf{u}$ (Commutative)", "$c(\\mathbf{u} \\cdot \\mathbf{v}) = (c\\mathbf{u}) \\cdot \\mathbf{v}$", "$\\mathbf{u} \\cdot (\\mathbf{v} + \\mathbf{w}) = \\mathbf{u} \\cdot \\mathbf{v} + \\mathbf{u} \\cdot \\mathbf{w}$", "$\\mathbf{u} \\cdot (\\mathbf{v} \\cdot \\mathbf{w}) = (\\mathbf{u} \\cdot \\mathbf{v}) \\cdot \\mathbf{w}$ (Associative)"],
                        3,
                        "The dot product of two vectors is a scalar, so $\\mathbf{v} \\cdot \\mathbf{w}$ is a scalar. You cannot dot a vector with a scalar, so associativity of dot products is undefined."
                    )
                ]
            },
            {
                "heading": "Section 2: Geometric Definition and Angle Between Vectors",
                "questions": [
                    make_q(
                        "State the formula for the cosine of the angle $\\theta$ between two non-zero vectors $\\mathbf{u}$ and $\\mathbf{v}$.",
                        ["$\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$", "$\\cos\\theta = \\frac{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}{\\mathbf{u} \\cdot \\mathbf{v}}$", "$\\cos\\theta = \\mathbf{u} \\cdot \\mathbf{v}$", "$\\cos\\theta = \\frac{\\mathbf{u} + \\mathbf{v}}{\\|\\mathbf{u} + \\mathbf{v}\\|}$"],
                        0,
                        "From $\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\|\\cos\\theta$, we have $\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$."
                    ),
                    make_q(
                        "Find the angle between $\\mathbf{u} = \\langle 1, 1 \\rangle$ and $\\mathbf{v} = \\langle 0, 2 \\rangle$.",
                        ["$45^\\circ$", "$90^\\circ$", "$30^\\circ$", "$60^\\circ$"],
                        0,
                        "$\\mathbf{u} \\cdot \\mathbf{v} = 0 + 2 = 2$. $\\|\\mathbf{u}\\| = \\sqrt{2}, \\|\\mathbf{v}\\| = 2$. $\\cos\\theta = \\frac{2}{2\\sqrt{2}} = \\frac{1}{\\sqrt{2}} \\Rightarrow \\theta = 45^\\circ$."
                    ),
                    make_q(
                        "If the dot product $\\mathbf{u} \\cdot \\mathbf{v} < 0$, what type of angle is $\\theta$?",
                        ["Obtuse ($90^\\circ < \\theta \\leq 180^\\circ$)", "Acute ($0^\\circ \\leq \\theta < 90^\\circ$)", "Right ($90^\\circ$)", "Straight ($180^\\circ$)"],
                        0,
                        "Since $\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$, a negative dot product implies $\\cos\\theta < 0$, which corresponds to an obtuse angle."
                    )
                ]
            },
            {
                "heading": "Section 3: Orthogonality and Parallel Vectors",
                "questions": [
                    make_q(
                        "Two non-zero vectors $\\mathbf{u}$ and $\\mathbf{v}$ are orthogonal (perpendicular) if and only if:",
                        ["$\\mathbf{u} \\cdot \\mathbf{v} = 0$", "$\\mathbf{u} \\cdot \\mathbf{v} = 1$", "$\\mathbf{u} \\times \\mathbf{v} = \\mathbf{0}$", "$\\|\\mathbf{u}\\| = \\|\\mathbf{v}\\|$"],
                        0,
                        "$\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos(90^\\circ) = 0$."
                    ),
                    make_q(
                        "Find $k$ such that $\\mathbf{u} = \\langle 3, k \\rangle$ is orthogonal to $\\mathbf{v} = \\langle 4, 6 \\rangle$.",
                        ["$-2$", "$2$", "$-1/2$", "$12$"],
                        0,
                        "$\\mathbf{u} \\cdot \\mathbf{v} = 3(4) + 6k = 12 + 6k = 0 \\Rightarrow 6k = -12 \\Rightarrow k = -2$."
                    ),
                    make_q(
                        "Which pair of vectors is parallel?",
                        ["$\\langle 2, -3 \\rangle$ and $\\langle -6, 9 \\rangle$", "$\\langle 2, 3 \\rangle$ and $\\langle 3, 2 \\rangle$", "$\\langle 1, 0 \\rangle$ and $\\langle 0, 1 \\rangle$", "$\\langle 4, 1 \\rangle$ and $\\langle -1, 4 \\rangle$"],
                        0,
                        "$\\langle -6, 9 \\rangle = -3\\langle 2, -3 \\rangle$. A vector is parallel to another if it is a scalar multiple of it."
                    )
                ]
            },
            {
                "heading": "Section 4: Vector Projections and Work",
                "questions": [
                    make_q(
                        "State the formula for the vector projection of $\\mathbf{u}$ onto $\\mathbf{v}$ ($\\text{proj}_{\\mathbf{v}}\\mathbf{u}$).",
                        ["$\\left(\\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|^2}\\right)\\mathbf{v}$", "$\\left(\\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|^2}\\right)\\mathbf{u}$", "$\\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|}$", "$(\\mathbf{u} \\cdot \\mathbf{v})\\mathbf{v}$"],
                        0,
                        "The vector projection is the scalar component $\\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|}$ multiplied by the unit vector $\\frac{\\mathbf{v}}{\\|\\mathbf{v}\\|}$, yielding $\\left(\\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|^2}\\right)\\mathbf{v}$."
                    ),
                    make_q(
                        "Find $\\text{proj}_{\\mathbf{v}}\\mathbf{u}$ for $\\mathbf{u} = \\langle 6, 2 \\rangle$ and $\\mathbf{v} = \\langle 4, 0 \\rangle$.",
                        ["$\\langle 6, 0 \\rangle$", "$\\langle 4, 0 \\rangle$", "$\\langle 0, 2 \\rangle$", "$\\langle 24, 0 \\rangle$"],
                        0,
                        "$\\mathbf{u} \\cdot \\mathbf{v} = 24$. $\\|\\mathbf{v}\\|^2 = 16$. $\\text{proj}_{\\mathbf{v}}\\mathbf{u} = \\frac{24}{16}\\langle 4, 0 \\rangle = \\frac{3}{2}\\langle 4, 0 \\rangle = \\langle 6, 0 \\rangle$."
                    ),
                    make_q(
                        "A force $\\mathbf{F} = \\langle 30, 40 \\rangle\\text{ N}$ moves a cart along the displacement $\\mathbf{d} = \\langle 5, 0 \\rangle\\text{ m}$. Calculate the work done.",
                        ["$150\\text{ J}$", "$200\\text{ J}$", "$350\\text{ J}$", "$250\\text{ J}$"],
                        0,
                        "$W = \\mathbf{F} \\cdot \\mathbf{d} = (30)(5) + (40)(0) = 150\\text{ J}$."
                    )
                ]
            }
        ]
    },

    # ── 5.03 Parametric Equations ─────────────────────────────────────────────
    {
        "track": "precalc",
        "num": "5.03",
        "slug": "parametric-equations",
        "title": "Parametric Equations",
        "sections": [
            {
                "heading": "Section 1: Plotting and Direction of Motion",
                "questions": [
                    make_q(
                        "For the parametric curve $x = 2t + 1, y = t^2 - 4$ for $-2 \\leq t \\leq 2$, find the initial point and terminal point.",
                        ["Initial: $(-3, 0)$, Terminal: $(5, 0)$", "Initial: $(1, -4)$, Terminal: $(5, 0)$", "Initial: $(-3, 0)$, Terminal: $(1, -4)$", "Initial: $(0, -3)$, Terminal: $(0, 5)$"],
                        0,
                        "At $t = -2$: $x = 2(-2)+1 = -3, y = (-2)^2 - 4 = 0$. At $t = 2$: $x = 2(2)+1 = 5, y = 2^2 - 4 = 0$."
                    ),
                    make_q(
                        "How is orientation (direction of motion) shown on a parametric graph?",
                        ["Arrows placed along the curve indicating the direction as the parameter $t$ increases", "By the slope of the curve", "By the color of the line", "By the quadrant of the initial point"],
                        0,
                        "Orientation arrows indicate the forward direction of motion as time/parameter $t$ advances."
                    ),
                    make_q(
                        "Determine the direction of motion for $x = 3 - t, y = 2t$ as $t$ increases.",
                        ["Leftward and upward", "Rightward and upward", "Leftward and downward", "Rightward and downward"],
                        0,
                        "As $t$ increases, $x = 3 - t$ decreases (leftward) and $y = 2t$ increases (upward)."
                    )
                ]
            },
            {
                "heading": "Section 2: Eliminating the Parameter (Algebraic)",
                "questions": [
                    make_q(
                        "Eliminate the parameter $t$ from $x = t - 3, y = 2t + 1$.",
                        ["$y = 2x + 7$", "$y = 2x - 5$", "$y = 2x - 7$", "$y = x + 4$"],
                        0,
                        "Solve for $t$: $t = x + 3$. Substitute into $y$: $y = 2(x + 3) + 1 = 2x + 6 + 1 = 2x + 7$."
                    ),
                    make_q(
                        "Eliminate the parameter from $x = t^2, y = 3t$ for $t \\geq 0$.",
                        ["$x = \\frac{y^2}{9}$ for $y \\geq 0$", "$y = 3\\sqrt{x}$", "Both of the above are correct", "$x = 9y^2$"],
                        2,
                        "$t = y/3 \\Rightarrow x = (y/3)^2 = y^2/9$, or equivalently $y = 3\\sqrt{x}$ for $x \\geq 0, y \\geq 0$."
                    ),
                    make_q(
                        "Eliminate the parameter from $x = e^t, y = 2e^{2t} - 1$.",
                        ["$y = 2x^2 - 1$ for $x > 0$", "$y = 2x - 1$", "$y = e^{2x} - 1$", "$y = 4x^2 - 1$"],
                        0,
                        "$e^{2t} = (e^t)^2 = x^2$. Since $x = e^t > 0$, $y = 2x^2 - 1$ with domain $x > 0$."
                    )
                ]
            },
            {
                "heading": "Section 3: Eliminating the Parameter (Trigonometric)",
                "questions": [
                    make_q(
                        "Eliminate the parameter from $x = 3\\cos\\theta, y = 3\\sin\\theta$.",
                        ["$x^2 + y^2 = 9$", "$x^2 + y^2 = 3$", "$9x^2 + 9y^2 = 1$", "$\\frac{x^2}{9} - \\frac{y^2}{9} = 1$"],
                        0,
                        "$\\cos\\theta = x/3, \\sin\\theta = y/3$. Using $\\cos^2\\theta + \\sin^2\\theta = 1$: $(x/3)^2 + (y/3)^2 = 1 \\Rightarrow x^2 + y^2 = 9$."
                    ),
                    make_q(
                        "Identify the Cartesian equation for $x = 4\\cos\\theta, y = 2\\sin\\theta$.",
                        ["$\\frac{x^2}{16} + \\frac{y^2}{4} = 1$ (an ellipse)", "$x^2 + y^2 = 20$", "$\\frac{x^2}{4} + \\frac{y^2}{16} = 1$", "$\\frac{x^2}{16} - \\frac{y^2}{4} = 1$"],
                        0,
                        "$(x/4)^2 + (y/2)^2 = \\cos^2\\theta + \\sin^2\\theta = 1 \\Rightarrow \\frac{x^2}{16} + \\frac{y^2}{4} = 1$."
                    ),
                    make_q(
                        "What curve is traced by $x = 3\\sec\\theta, y = 2\\tan\\theta$?",
                        ["A hyperbola: $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$", "An ellipse: $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$", "A parabola: $y = 2x^2$", "A circle: $x^2 + y^2 = 13$"],
                        0,
                        "Using the identity $\\sec^2\\theta - \\tan^2\\theta = 1$: $(x/3)^2 - (y/2)^2 = 1 \\Rightarrow \\frac{x^2}{9} - \\frac{y^2}{4} = 1$."
                    )
                ]
            },
            {
                "heading": "Section 4: Projectile Motion Applications",
                "questions": [
                    make_q(
                        "State the standard parametric equations for projectile motion launched with speed $v_0$ at angle $\\theta$ from $(0, h_0)$ (with $g = 32\\text{ ft/s}^2$).",
                        ["$x(t) = (v_0\\cos\\theta)t, y(t) = -16t^2 + (v_0\\sin\\theta)t + h_0$", "$x(t) = v_0 t, y(t) = -32t^2 + h_0$", "$x(t) = (v_0\\sin\\theta)t, y(t) = -16t^2 + h_0$", "$x(t) = (v_0\\cos\\theta)t, y(t) = (v_0\\sin\\theta)t$"],
                        0,
                        "Horizontal velocity is constant ($v_0\\cos\\theta$), and vertical position is governed by gravity: $y(t) = -\\frac{1}{2}gt^2 + v_{0y}t + h_0$."
                    ),
                    make_q(
                        "A ball is kicked from ground level at $64\\text{ ft/s}$ at an angle of $30^\\circ$. At what time does it hit the ground?",
                        ["$2\\text{ seconds}$", "$1\\text{ second}$", "$4\\text{ seconds}$", "$3\\text{ seconds}$"],
                        0,
                        "$v_{0y} = 64\\sin(30^\\circ) = 32\\text{ ft/s}$. $y(t) = -16t^2 + 32t = -16t(t - 2) = 0 \\Rightarrow t = 2\\text{ s}$."
                    ),
                    make_q(
                        "In the previous question, what is the horizontal range of the ball?",
                        ["$64\\sqrt{3}\\text{ ft}$", "$128\\text{ ft}$", "$32\\sqrt{3}\\text{ ft}$", "$64\\text{ ft}$"],
                        0,
                        "$x(t) = (64\\cos 30^\\circ)t = (32\\sqrt{3})(2) = 64\\sqrt{3}\\text{ ft}$."
                    )
                ]
            }
        ]
    },

    # ── 6.01 Polar Coordinates and Conversions ────────────────────────────────
    {
        "track": "precalc",
        "num": "6.01",
        "slug": "polar-coordinates-and-conversions",
        "title": "Polar Coordinates and Conversions",
        "sections": [
            {
                "heading": "Section 1: Plotting with Positive and Negative Radii",
                "questions": [
                    make_q(
                        "How is a point with negative radius $(-r, \\theta)$ plotted in polar coordinates?",
                        ["Plot along the opposite ray directly across the pole (angle $\\theta + \\pi$)", "Plot in the negative $y$ direction", "Reflect across the $y$-axis", "The point is undefined"],
                        0,
                        "A negative radius $-r$ means moving a distance $r$ backward along the line passing through angle $\\theta$, which lands at $(r, \\theta + \\pi)$."
                    ),
                    make_q(
                        "Which polar coordinate represents the same point as $(3, \\pi/3)$?",
                        ["$(-3, 4\\pi/3)$", "$(-3, 2\\pi/3)$", "$(3, 4\\pi/3)$", "$(-3, -\\pi/3)$"],
                        0,
                        "Adding $\\pi$ to the angle and negating the radius gives $(-3, \\pi/3 + \\pi) = (-3, 4\\pi/3)$."
                    ),
                    make_q(
                        "In which quadrant does the polar point $(4, 7\\pi/6)$ lie?",
                        ["Quadrant III", "Quadrant II", "Quadrant IV", "Quadrant I"],
                        0,
                        "Angle $7\\pi/6 = 210^\\circ$ lies in Quadrant III. With positive radius $r = 4$, the point is in Quadrant III."
                    )
                ]
            },
            {
                "heading": "Section 2: Converting Polar to Cartesian Coordinates",
                "questions": [
                    make_q(
                        "State the formulas to convert polar coordinates $(r, \\theta)$ to Cartesian coordinates $(x, y)$.",
                        ["$x = r\\cos\\theta, y = r\\sin\\theta$", "$x = r\\sin\\theta, y = r\\cos\\theta$", "$x = r^2\\cos\\theta, y = r^2\\sin\\theta$", "$x = \\frac{\\cos\\theta}{r}, y = \\frac{\\sin\\theta}{r}$"],
                        0,
                        "By standard right-triangle trigonometry, $x = r\\cos\\theta$ and $y = r\\sin\\theta$."
                    ),
                    make_q(
                        "Convert the polar point $(6, 2\\pi/3)$ to exact Cartesian coordinates.",
                        ["$(-3, 3\\sqrt{3})$", "$(3, -3\\sqrt{3})$", "$(-3\\sqrt{3}, 3)$", "$(-3, -3\\sqrt{3})$"],
                        0,
                        "$x = 6\\cos(2\\pi/3) = 6(-1/2) = -3$. $y = 6\\sin(2\\pi/3) = 6(\\sqrt{3}/2) = 3\\sqrt{3}$."
                    ),
                    make_q(
                        "Convert $(4, -\\pi/4)$ to Cartesian coordinates.",
                        ["$(2\\sqrt{2}, -2\\sqrt{2})$", "$(-2\\sqrt{2}, 2\\sqrt{2})$", "$(2\\sqrt{2}, 2\\sqrt{2})$", "$(4, -4)$"],
                        0,
                        "$x = 4\\cos(-\\pi/4) = 4(\\sqrt{2}/2) = 2\\sqrt{2}$. $y = 4\\sin(-\\pi/4) = 4(-\\sqrt{2}/2) = -2\\sqrt{2}$."
                    )
                ]
            },
            {
                "heading": "Section 3: Converting Cartesian to Polar Coordinates",
                "questions": [
                    make_q(
                        "Convert the Cartesian point $(-2, 2)$ to polar coordinates with $r > 0$ and $0 \\leq \\theta < 2\\pi$.",
                        ["$(2\\sqrt{2}, 3\\pi/4)$", "$(2\\sqrt{2}, 5\\pi/4)$", "$(4, 3\\pi/4)$", "$(2\\sqrt{2}, \\pi/4)$"],
                        0,
                        "$r = \\sqrt{(-2)^2 + 2^2} = \\sqrt{8} = 2\\sqrt{2}$. In Quadrant II, $\\theta = 3\\pi/4$."
                    ),
                    make_q(
                        "Convert $(0, -5)$ to polar coordinates.",
                        ["$(5, 3\\pi/2)$", "$(5, \\pi/2)$", "$(-5, 0)$", "$(5, \\pi)$"],
                        0,
                        "Distance $r = 5$. The point lies on the negative $y$-axis, which is angle $\\theta = 3\\pi/2$."
                    ),
                    make_q(
                        "Convert $(3, -3\\sqrt{3})$ to polar coordinates with $r > 0$ and $0 \\leq \\theta < 2\\pi$.",
                        ["$(6, 5\\pi/3)$", "$(6, 4\\pi/3)$", "$(6, 2\\pi/3)$", "$(12, 5\\pi/3)$"],
                        0,
                        "$r = \\sqrt{9 + 27} = \\sqrt{36} = 6$. In Quadrant IV with $\\tan\\theta = -\\sqrt{3}$, $\\theta = 2\\pi - \\pi/3 = 5\\pi/3$."
                    )
                ]
            },
            {
                "heading": "Section 4: Converting Equations Between Polar and Cartesian",
                "questions": [
                    make_q(
                        "Convert the polar equation $r = 4\\cos\\theta$ to Cartesian form.",
                        ["$(x - 2)^2 + y^2 = 4$", "$x^2 + y^2 = 4$", "$x^2 + (y - 2)^2 = 4$", "$x = 4$"],
                        0,
                        "Multiply by $r$: $r^2 = 4r\\cos\\theta \\Rightarrow x^2 + y^2 = 4x \\Rightarrow (x - 2)^2 + y^2 = 4$."
                    ),
                    make_q(
                        "Convert $r = 5\\csc\\theta$ to Cartesian form.",
                        ["$y = 5$", "$x = 5$", "$x^2 + y^2 = 25$", "$y = 5x$"],
                        0,
                        "$r = \\frac{5}{\\sin\\theta} \\Rightarrow r\\sin\\theta = 5 \\Rightarrow y = 5$."
                    ),
                    make_q(
                        "Convert the line $y = 3x$ to a polar equation.",
                        ["$\\theta = \\arctan(3)$", "$r = 3$", "$r = 3\\cos\\theta$", "$\\theta = 3$"],
                        0,
                        "Substitute $x = r\\cos\\theta, y = r\\sin\\theta$: $r\\sin\\theta = 3r\\cos\\theta \\Rightarrow \\tan\\theta = 3 \\Rightarrow \\theta = \\arctan(3)$."
                    )
                ]
            }
        ]
    },

    # ── 6.02 Polar Equations and Graphs ───────────────────────────────────────
    {
        "track": "precalc",
        "num": "6.02",
        "slug": "polar-equations-and-graphs",
        "title": "Polar Equations and Graphs",
        "sections": [
            {
                "heading": "Section 1: Circles and Lines in Polar Form",
                "questions": [
                    make_q(
                        "What is the graph of $r = a$ where $a$ is a constant?",
                        ["A circle centered at the origin with radius $|a|$", "A line through the origin", "A parabola", "An ellipse"],
                        0,
                        "$r = a \\Rightarrow \\sqrt{x^2 + y^2} = a \\Rightarrow x^2 + y^2 = a^2$, a circle centered at $(0, 0)$."
                    ),
                    make_q(
                        "What is the graph of $\\theta = \\alpha$ where $\\alpha$ is a constant angle?",
                        ["A straight line passing through the origin with slope $\\tan\\alpha$", "A circle", "A ray only", "A spiral"],
                        0,
                        "Allowing all positive and negative values of $r$ along the angle $\\alpha$ produces a complete straight line through the origin."
                    ),
                    make_q(
                        "Describe the circle given by $r = -6\\sin\\theta$.",
                        ["Centered at $(0, -3)$ with radius $3$", "Centered at $(0, 3)$ with radius $3$", "Centered at $(0, 0)$ with radius $6$", "Centered at $(-3, 0)$ with radius $3$"],
                        0,
                        "Multiply by $r$: $r^2 = -6r\\sin\\theta \\Rightarrow x^2 + y^2 = -6y \\Rightarrow x^2 + (y + 3)^2 = 9$. Center is $(0, -3)$, radius 3."
                    )
                ]
            },
            {
                "heading": "Section 2: Limaçons and Cardiods",
                "questions": [
                    make_q(
                        "Under what condition does the limaçon $r = a + b\\cos\\theta$ ($a, b > 0$) form a cardioid (heart-shaped curve)?",
                        ["$a/b = 1$ (i.e. $a = b$)", "$a/b < 1$", "$1 < a/b < 2$", "$a/b \\geq 2$"],
                        0,
                        "When $a = b$, the curve passes through the origin at a cusp, creating a cardioid."
                    ),
                    make_q(
                        "Which equation produces a limaçon with an inner loop?",
                        ["$r = 2 + 3\\cos\\theta$", "$r = 3 + 3\\cos\\theta$", "$r = 4 + 2\\cos\\theta$", "$r = 3 + 2\\cos\\theta$"],
                        0,
                        "An inner loop occurs when $a < b$ (ratio $a/b < 1$). For $r = 2 + 3\\cos\\theta$, $a/b = 2/3 < 1$."
                    ),
                    make_q(
                        "What type of curve is $r = 5 + 2\\sin\\theta$?",
                        ["A convex (dimple-free) limaçon", "A cardioid", "A limaçon with an inner loop", "A dimpled limaçon"],
                        0,
                        "Here $a/b = 5/2 = 2.5 \\geq 2$. When $a/b \\geq 2$, the limaçon has no dimple and is convex."
                    )
                ]
            },
            {
                "heading": "Section 3: Rose Curves",
                "questions": [
                    make_q(
                        "How many petals does the rose curve $r = 4\\cos(3\\theta)$ have?",
                        ["$3$ petals", "$6$ petals", "$4$ petals", "$12$ petals"],
                        0,
                        "For $r = a\\cos(n\\theta)$, if $n$ is odd, the curve has exactly $n$ petals. Here $n = 3$, so it has 3 petals."
                    ),
                    make_q(
                        "How many petals does the rose curve $r = 2\\sin(4\\theta)$ have?",
                        ["$8$ petals", "$4$ petals", "$16$ petals", "$2$ petals"],
                        0,
                        "If $n$ is even, the curve has $2n$ petals. Here $n = 4$ (even), so it has $2(4) = 8$ petals."
                    ),
                    make_q(
                        "What is the maximum length of each petal in $r = 5\\cos(2\\theta)$?",
                        ["$5$", "$10$", "$2.5$", "$2$"],
                        0,
                        "The maximum value of $|r| = |5\\cos(2\\theta)|$ is 5, which determines the tip length of each petal."
                    )
                ]
            },
            {
                "heading": "Section 4: Lemniscates and Spirals",
                "questions": [
                    make_q(
                        "What figure-eight-shaped curve is given by $r^2 = 9\\cos(2\\theta)$?",
                        ["A lemniscate", "A cardioid", "A rose curve", "A spiral of Archimedes"],
                        0,
                        "Equations of the form $r^2 = a^2\\cos(2\\theta)$ or $r^2 = a^2\\sin(2\\theta)$ represent lemniscates (infinity-symbol / figure-eight curves)."
                    ),
                    make_q(
                        "What type of curve is represented by the polar equation $r = 2\\theta$ for $\\theta \\geq 0$?",
                        ["Spiral of Archimedes", "Logarithmic spiral", "Lemniscate", "Circle"],
                        0,
                        "Equations where radius is directly proportional to angle ($r = a\\theta$) are Archimedean spirals."
                    ),
                    make_q(
                        "Which symmetry test verifies that a polar graph is symmetric with respect to the polar axis (the horizontal axis)?",
                        ["Replacing $(r, \\theta)$ with $(r, -\\theta)$ yields an equivalent equation", "Replacing $(r, \\theta)$ with $(-r, \\theta)$", "Replacing $\\theta$ with $\\theta + \\pi$", "Replacing $r$ with $1/r$"],
                        0,
                        "Symmetry across the polar axis corresponds to reflection across $\\theta = 0$, so replacing $\\theta$ with $-\\theta$ must leave the equation unchanged."
                    )
                ]
            }
        ]
    }
]
