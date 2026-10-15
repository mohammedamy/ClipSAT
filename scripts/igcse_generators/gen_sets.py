"""
scripts/igcse_generators/gen_sets.py
Generates diverse, authentic Cambridge IGCSE 0580 questions for Sets & Venn Diagrams.
Covers: Set Notation, Venn Diagram regions, Subsets, Universal Set, and Union/Intersection.
"""

from .common import make_q

def get_sets_questions():
    qs = []
    dom = "Sets & Venn Diagrams"

    # ==================== EASY ====================
    qs.append(make_q(dom, "easy",
        r"Universal set \( \mathscr{E} = \{x : x \text{ is an integer}, 1 \le x \le 10\} \). Set \( A = \{2, 3, 5, 7\} \). List the elements of \( A' \).",
        [r"\( \{1, 4, 6, 8, 9, 10\} \)", r"\( \{4, 6, 8, 9, 10\} \)", r"\( \{1, 4, 6, 8, 10\} \)", r"\( \{2, 3, 5, 7\} \)"],
        0,
        r"The complement \( A' \) consists of all elements in the universal set \( \mathscr{E} \) that are NOT in set \( A \): \( A' = \{1, 4, 6, 8, 9, 10\} \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"If \( A = \{1, 2, 4, 8\} \) and \( B = \{2, 4, 6, 8, 10\} \), find \( A \cap B \).",
        [r"\( \{2, 4, 8\} \)", r"\( \{1, 2, 4, 6, 8, 10\} \)", r"\( \{1, 6, 10\} \)", r"\( \emptyset \)"],
        0,
        r"The intersection \( A \cap B \) consists of all elements that belong to BOTH set \( A \) and set \( B \): \( \{2, 4, 8\} \). [B1]"))
    qs.append(make_q(dom, "easy",
        r"Which of the following statements represents 'the empty set'?",
        [r"\( \emptyset \)", r"\( \{0\} \)", r"\( \mathscr{E} \)", r"\( A' \)"],
        0,
        r"The empty set (or null set), which contains zero elements, is universally denoted by the symbol \( \emptyset \) (or \( \{\} \)). Note that \( \{0\} \) is not empty as it contains the integer 0. [B1]"))
    qs.append(make_q(dom, "easy",
        r"In set theory notation, which symbol denotes 'is a subset of'?",
        [r"\( \subset \)", r"\( \in \)", r"\( \cup \)", r"\( \cap \)"],
        0,
        r"The symbol \( \subset \) means 'is a subset of', while \( \in \) means 'is an element of'. [B1]"))

    # ==================== MEDIUM ====================
    qs.append(make_q(dom, "medium",
        r"In a class of 30 students, 18 study French (\(F\)), 15 study German (\(G\)), and 7 study both French and German. How many students study neither French nor German?",
        ["4", "7", "26", "11"],
        0,
        r"By the principle of inclusion-exclusion: \( n(F \cup G) = n(F) + n(G) - n(F \cap G) = 18 + 15 - 7 = 26 \). Students studying neither = \( 30 - 26 = 4 \). [M1 for 18+15-7=26, A1 for 30-26=4]"))
    qs.append(make_q(dom, "medium",
        r"If \( n(\mathscr{E}) = 40 \), \( n(A) = 22 \), \( n(B) = 19 \), and \( n(A \cap B) = 8 \), find \( n((A \cup B)') \).",
        ["7", "11", "15", "19"],
        0,
        r"First calculate \( n(A \cup B) = n(A) + n(B) - n(A \cap B) = 22 + 19 - 8 = 33 \). The complement has \( n((A \cup B)') = n(\mathscr{E}) - n(A \cup B) = 40 - 33 = 7 \). [M1 for finding n(A union B) = 33, A1 for 7]"))
    qs.append(make_q(dom, "medium",
        r"Which set notation represents the shaded region outside set \( A \) but inside set \( B \)?",
        [r"\( A' \cap B \)", r"\( A \cap B' \)", r"\( (A \cup B)' \)", r"\( A' \cup B \)"],
        0,
        r"The region that is inside \( B \) and outside \( A \) is the intersection of \( B \) with the complement of \( A \): \( A' \cap B \) (also written as \( B \setminus A \)). [B1]"))
    qs.append(make_q(dom, "medium",
        r"Universal set \( \mathscr{E} = \{x : x \text{ is an integer}, 1 \le x \le 20\} \). \( P = \{x : x \text{ is a prime number}\} \) and \( O = \{x : x \text{ is an odd number}\} \). What is \( n(P \cap O') \)?",
        ["1", "2", "8", "9"],
        0,
        r"The prime numbers in \( \mathscr{E} \) are \( \{2, 3, 5, 7, 11, 13, 17, 19\} \). The set \( O' \) consists of all even numbers. The only even prime number is 2, so \( P \cap O' = \{2\} \), which has exactly 1 element: \( n(P \cap O') = 1 \). [M1 for identifying even prime 2, A1 for 1]"))

    # ==================== HARD ====================
    qs.append(make_q(dom, "hard",
        r"In a survey of 50 tourists, 30 visited museum \( M \), 25 visited palace \( P \), and 20 visited art gallery \( G \). 12 visited both \( M \) and \( P \), 10 visited both \( P \) and \( G \), 8 visited both \( M \) and \( G \), and 5 visited all three. How many tourists visited NONE of the three attractions?",
        ["0", "5", "8", "10"],
        0,
        r"By the 3-set inclusion-exclusion principle: \( n(M \cup P \cup G) = (30 + 25 + 20) - (12 + 10 + 8) + 5 = 75 - 30 + 5 = 50 \). Since the union equals 50, all 50 tourists visited at least one attraction. Therefore, \( 50 - 50 = 0 \) tourists visited none. [M1 for 3-set formula, A1 for 50, A1 for 0]"))
    qs.append(make_q(dom, "hard",
        r"Set \( A \) has 12 elements and set \( B \) has 8 elements. If \( A \cap B \neq \emptyset \), what is the maximum possible number of elements in \( A \cup B \)?",
        ["19", "20", "12", "11"],
        0,
        r"Formula: \( n(A \cup B) = n(A) + n(B) - n(A \cap B) = 12 + 8 - n(A \cap B) = 20 - n(A \cap B) \). To maximize the union, we must minimize the intersection. Since \( A \cap B \neq \emptyset \), the minimum possible value of \( n(A \cap B) \) is 1. Thus maximum \( n(A \cup B) = 20 - 1 = 19 \). [M1 for maximizing union by minimizing intersection to 1, A1 for 19]"))

    return qs
