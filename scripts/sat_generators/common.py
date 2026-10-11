"""
scripts/sat_generators/common.py
Helper functions and schema validation for Digital SAT question bank generation.
"""

import re

def make_q(domain, difficulty, text, choices, answer, sol, fig=None, figure=None):
    assert difficulty in ['easy', 'medium', 'hard'], f"Invalid difficulty: {difficulty}"
    assert isinstance(choices, list) and len(choices) == 4, f"Choices must be 4 items: {choices}"
    assert len(set(choices)) == 4, f"Choices must be unique: {choices}"
    assert isinstance(answer, int) and 0 <= answer <= 3, f"Answer must be 0..3: {answer}"
    assert text and text.strip(), "Text must not be empty"
    assert sol and sol.strip(), "Solution must not be empty"

    # Delimiter balance check
    for s in [text, sol]:
        inline_open = s.count(r'\(')
        inline_close = s.count(r'\)')
        disp_open = s.count(r'\[')
        disp_close = s.count(r'\]')
        assert inline_open == inline_close, f"Unbalanced inline math in: {s}"
        assert disp_open == disp_close, f"Unbalanced display math in: {s}"

    q = {
        "type": "mcq",
        "domain": domain,
        "text": text.strip(),
        "choices": choices,
        "answer": answer,
        "sol": sol.strip(),
        "difficulty": difficulty
    }
    if fig is not None:
        q["fig"] = fig
    if figure is not None:
        q["figure"] = figure
    return q

def make_table(headers, rows, caption=None):
    """Generates an accessible, clean exam-table that renders nicely in day/night/print."""
    h = '<table class="exam-table">'
    if caption:
        h += f'<caption>{caption}</caption>'
    h += '<thead><tr>'
    for c in headers:
        h += f'<th>{c}</th>'
    h += '</tr></thead><tbody>'
    for r in rows:
        h += '<tr>'
        for c in r:
            h += f'<td>{c}</td>'
        h += '</tr>'
    h += '</tbody></table>'
    return h
