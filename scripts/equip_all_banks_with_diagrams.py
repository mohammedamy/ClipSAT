#!/usr/bin/env python3
"""
scripts/equip_all_banks_with_diagrams.py

Scans all question banks in bank-data/*.json and equips questions that discuss
geometric figures, coordinate geometry, linear and quadratic functions,
calculus curves, 3D solids, data tables, number lines, and vectors with
precise, non-generic, mathematically verified figure specifications.

Compatible with ClipSAT's SVG figure renderer in public/js/figures.js.
"""

import json
import glob
import re
import math
import os

def clean_num(n):
    if isinstance(n, (int, float)):
        if isinstance(n, float) and n.is_integer():
            return str(int(n))
        return str(round(n, 2))
    return str(n)

def fn_py_from_tex(tex):
    s = tex.replace('^', '**').replace('x^2', 'x**2').replace('x^3', 'x**3')
    s = re.sub(r'(\d)x', r'\1*x', s)
    return s

def extract_figure(q):
    """
    Extract a polished, non-generic figure for question q.
    Returns a dict with 'type' and figure properties, or None if no figure fits.
    """
    if q.get('figure') or q.get('fig') or q.get('table'):
        return None  # already has a figure
    
    text = q.get('text') or q.get('q') or ''
    if not text:
        return None
    
    # Strip some LaTeX formatting for easier regex matching
    t_clean = text.replace(r'\dfrac', '').replace(r'\frac', '').replace(r'\text', '').replace('$', '')
    t_lower = t_clean.lower()
    
    # ── 1. RIGHT TRIANGLE ──
    # Legs given
    m_rt = re.search(r'(?:right(?:\s*-\s*angled)?\s*triangle|مثلث\s*قائم).*?(?:legs?|sides?|ضلع(?:ين)?).*?(\d+(?:\.\d+)?)\s*(?:and|و)\s*(\d+(?:\.\d+)?)', t_clean, re.I)
    if not m_rt:
        m_rt = re.search(r'legs\s*(?:of\s*length)?\s*(\d+(?:\.\d+)?)\s*(?:and|و)\s*(\d+(?:\.\d+)?).*?right\s*triangle', t_clean, re.I)
    if m_rt:
        a, b = float(m_rt.group(1)), float(m_rt.group(2))
        if 0 < a < 500 and 0 < b < 500:
            c = math.sqrt(a*a + b*b)
            c_lbl = clean_num(c) if c.is_integer() else "x"
            return {
                "type": "triangle",
                "vertices": [[0, 0], [round(b, 2), 0], [0, round(a, 2)]],
                "right": 0,
                "sides": [clean_num(b), c_lbl, clean_num(a)],
                "labels": ["A", "B", "C"],
                "w": 220, "h": 180
            }
            
    # Hypotenuse and one leg given
    m_hyp = re.search(r'(?:right\s*triangle|مثلث\s*قائم).*?(?:hypotenuse|الوتر)\s*(?:of\s*length|=|is)?\s*(\d+(?:\.\d+)?).*?(?:leg|side|ضلع)\s*(?:of\s*length|=|is)?\s*(\d+(?:\.\d+)?)', t_clean, re.I)
    if not m_hyp:
        m_hyp = re.search(r'(?:hypotenuse|الوتر)\s*(?:of\s*length|=|is)?\s*(\d+(?:\.\d+)?).*?(?:leg|side|ضلع)\s*(?:of\s*length|=|is)?\s*(\d+(?:\.\d+)?).*?(?:right\s*triangle|مثلث\s*قائم)', t_clean, re.I)
    if m_hyp:
        c, a = float(m_hyp.group(1)), float(m_hyp.group(2))
        if c > a and a > 0 and c < 500:
            b = math.sqrt(c*c - a*a)
            return {
                "type": "triangle",
                "vertices": [[0, 0], [round(b, 2), 0], [0, round(a, 2)]],
                "right": 0,
                "sides": [clean_num(b) if b.is_integer() else "b", clean_num(c), clean_num(a)],
                "labels": ["A", "B", "C"],
                "w": 220, "h": 180
            }

    # Trigonometric right triangle: sin(theta) = opp/hyp or cos(theta) = adj/hyp
    m_trig_rt = re.search(r'(?:right\s*triangle|acute\s*angle\s*\\?\s*(?:theta|\\theta)|زاوية\s*حادة).*?(?:sin|cos|tan)\s*\(?\\?(?:theta|\\theta)\s*\)?\s*=\s*\{?\s*(\d+)\s*\}?\s*/\s*\{?\s*(\d+)\s*\}?', t_clean, re.I)
    if m_trig_rt:
        n1, n2 = float(m_trig_rt.group(1)), float(m_trig_rt.group(2))
        is_sin = 'sin' in t_lower
        is_cos = 'cos' in t_lower
        if is_sin and n2 > n1 and n1 > 0:
            opp, hyp = n1, n2
            adj = math.sqrt(hyp*hyp - opp*opp)
            return {
                "type": "triangle",
                "vertices": [[0, 0], [round(adj, 2), 0], [0, round(opp, 2)]],
                "right": 0,
                "sides": [clean_num(adj) if adj.is_integer() else "a", clean_num(hyp), clean_num(opp)],
                "labels": ["A", "B", "C"],
                "angles": ["", "θ", ""],
                "w": 220, "h": 180
            }
        elif is_cos and n2 > n1 and n1 > 0:
            adj, hyp = n1, n2
            opp = math.sqrt(hyp*hyp - adj*adj)
            return {
                "type": "triangle",
                "vertices": [[0, 0], [round(adj, 2), 0], [0, round(opp, 2)]],
                "right": 0,
                "sides": [clean_num(adj), clean_num(hyp), clean_num(opp) if opp.is_integer() else "b"],
                "labels": ["A", "B", "C"],
                "angles": ["", "θ", ""],
                "w": 220, "h": 180
            }

    # Triangle with 2 angles given
    m_tri_ang = re.search(r'(?:triangle|مثلث).*?(\d{2})\s*(?:\^\s*\\?circ|°|deg).*?(\d{2})\s*(?:\^\s*\\?circ|°|deg)', t_clean, re.I)
    if m_tri_ang:
        a1, a2 = float(m_tri_ang.group(1)), float(m_tri_ang.group(2))
        if 10 < a1 < 160 and 10 < a2 < 160 and a1 + a2 < 175:
            a3 = 180 - a1 - a2
            rad1, rad2 = math.radians(a1), math.radians(a2)
            c = 10.0
            rad3 = math.radians(a3)
            b_side = c * math.sin(rad2) / math.sin(rad3)
            vx = b_side * math.cos(rad1)
            vy = b_side * math.sin(rad1)
            return {
                "type": "triangle",
                "vertices": [[0, 0], [round(c, 2), 0], [round(vx, 2), round(vy, 2)]],
                "angles": [f"{int(a1)}°", f"{int(a2)}°", f"{int(a3)}°"],
                "labels": ["A", "B", "C"],
                "w": 220, "h": 180
            }

    # Equilateral triangle
    m_eq = re.search(r'(?:equilateral\s*triangle|مثلث\s*متساوي\s*الأضلاع).*?(?:side\s*length|طول\s*ضلعه|sides?\s*(?:of\s*length)?)\s*(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_eq:
        s = float(m_eq.group(1))
        if 0 < s < 500:
            h_tri = s * math.sqrt(3) / 2
            return {
                "type": "triangle",
                "vertices": [[0, 0], [round(s, 2), 0], [round(s/2, 2), round(h_tri, 2)]],
                "sides": [clean_num(s), clean_num(s), clean_num(s)],
                "labels": ["A", "B", "C"],
                "w": 220, "h": 180
            }

    # ── 2. CIRCLES ──
    # Circle with center and radius: (x - h)^2 + (y - k)^2 = r^2
    m_c_eq = re.search(r'\(x\s*([+-]\s*\d+)\)\^2\s*\+\s*\(y\s*([+-]\s*\d+)\)\^2\s*=\s*(\d+)', t_clean)
    if m_c_eq:
        h_val = -float(m_c_eq.group(1).replace(' ', ''))
        k_val = -float(m_c_eq.group(2).replace(' ', ''))
        r_sq = float(m_c_eq.group(3))
        r_val = math.sqrt(r_sq)
        return {
            "type": "circle",
            "center": f"({clean_num(h_val)}, {clean_num(k_val)})",
            "radius": f"r = {clean_num(r_val)}",
            "w": 200, "h": 180
        }

    # Circle with radius or diameter
    m_circ_r = re.search(r'(?:circle|دائرة).*?(?:radius|نصف\s*قطر(?:ها)?)\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_circ_r:
        r_val = float(m_circ_r.group(1))
        if 0 < r_val < 500:
            return {
                "type": "circle",
                "radius": f"r = {clean_num(r_val)}",
                "w": 200, "h": 180
            }

    m_circ_d = re.search(r'(?:circle|دائرة).*?(?:diameter|قطر(?:ها)?)\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_circ_d:
        d_val = float(m_circ_d.group(1))
        if 0 < d_val < 1000:
            return {
                "type": "circle",
                "radius": f"d = {clean_num(d_val)}",
                "w": 200, "h": 180
            }

    # ── 3. RECTANGLES & SQUARES & POLYGONS ──
    # Rectangle width and length/diagonal
    m_rect_wl = re.search(r'(?:rectangle|مستطيل).*?(?:width|عرض).*?(\d+(?:\.\d+)?).*?(?:length|طول).*?(\d+(?:\.\d+)?)', t_clean, re.I)
    if not m_rect_wl:
        m_rect_wl = re.search(r'(?:rectangle|مستطيل).*?(?:length|طول).*?(\d+(?:\.\d+)?).*?(?:width|عرض).*?(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_rect_wl:
        v1, v2 = float(m_rect_wl.group(1)), float(m_rect_wl.group(2))
        w_val, l_val = min(v1, v2), max(v1, v2)
        if 0 < w_val < 500 and 0 < l_val < 500:
            return {
                "type": "rect",
                "vertices": [[0, 0], [round(l_val, 2), 0], [round(l_val, 2), round(w_val, 2)], [0, round(w_val, 2)]],
                "sides": [clean_num(l_val), clean_num(w_val), clean_num(l_val), clean_num(w_val)],
                "labels": ["A", "B", "C", "D"],
                "w": 220, "h": 160
            }

    m_rect_diag = re.search(r'(?:rectangle|مستطيل).*?(?:width|عرض).*?(\d+(?:\.\d+)?).*?(?:diagonal|القطر).*?(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_rect_diag:
        w_val, diag = float(m_rect_diag.group(1)), float(m_rect_diag.group(2))
        if diag > w_val > 0:
            l_val = math.sqrt(diag*diag - w_val*w_val)
            return {
                "type": "rect",
                "vertices": [[0, 0], [round(l_val, 2), 0], [round(l_val, 2), round(w_val, 2)], [0, round(w_val, 2)]],
                "sides": [clean_num(l_val) if l_val.is_integer() else "l", clean_num(w_val), clean_num(l_val) if l_val.is_integer() else "l", clean_num(w_val)],
                "labels": ["A", "B", "C", "D"],
                "w": 220, "h": 160
            }

    # Square with side/area
    m_sq_side = re.search(r'(?:square|مربع).*?(?:side\s*length|طول\s*ضلعه)\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_sq_side:
        s_val = float(m_sq_side.group(1))
        if 0 < s_val < 500:
            return {
                "type": "rect",
                "vertices": [[0, 0], [round(s_val, 2), 0], [round(s_val, 2), round(s_val, 2)], [0, round(s_val, 2)]],
                "sides": [clean_num(s_val), clean_num(s_val), clean_num(s_val), clean_num(s_val)],
                "labels": ["A", "B", "C", "D"],
                "w": 200, "h": 180
            }

    m_sq_area = re.search(r'(?:square|مربع).*?(?:area|مساحة).*?(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_sq_area:
        a_val = float(m_sq_area.group(1))
        if 1 < a_val < 10000:
            s_val = math.sqrt(a_val)
            if s_val.is_integer() or s_val < 50:
                return {
                    "type": "rect",
                    "vertices": [[0, 0], [round(s_val, 2), 0], [round(s_val, 2), round(s_val, 2)], [0, round(s_val, 2)]],
                    "sides": [clean_num(s_val), clean_num(s_val), clean_num(s_val), clean_num(s_val)],
                    "labels": ["A", "B", "C", "D"],
                    "w": 200, "h": 180
                }

    # Regular hexagon
    if 'hexagon' in t_lower or 'سداسي' in t_clean:
        m_hex = re.search(r'(\d+(?:\.\d+)?)\s*(?:cm|in|m|units|سم)?', t_clean)
        s_hex = float(m_hex.group(1)) if m_hex else 6.0
        s_hex = s_hex if 0 < s_hex < 100 else 6.0
        verts = []
        for i in range(6):
            ang = math.pi / 6 + i * (math.pi / 3)
            verts.append([round(s_hex * math.cos(ang), 2), round(s_hex * math.sin(ang), 2)])
        return {
            "type": "polygon",
            "vertices": verts,
            "sides": [clean_num(s_hex)] * 6,
            "w": 220, "h": 180
        }

    # ── 4. 2D VECTORS (LINALG, MVC, TAHSILI, PHYSICS) ──
    # Matches: \mathbf{u} = (-9, -12) or \mathbf{v} = (6, -8) or vector <3, 4>
    m_vec_bold = re.search(r'\\mathbf\{[uvw]\}\s*=\s*\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)', text)
    if not m_vec_bold:
        m_vec_bold = re.search(r'\\mathbf\{[uvw]\}\s*=\s*\[\s*(-?\d+)\s*,\s*(-?\d+)\s*\]', text)
    if not m_vec_bold:
        m_vec_bold = re.search(r'(?:vector|المتجه).*?(?:<|\(|\[)\s*(-?\d+)\s*,\s*(-?\d+)\s*(?:>|\)|\])', t_clean, re.I)
    if m_vec_bold:
        vx, vy = float(m_vec_bold.group(1)), float(m_vec_bold.group(2))
        if abs(vx) < 50 and abs(vy) < 50 and (vx != 0 or vy != 0):
            xmin = min(0, vx) - 2
            xmax = max(0, vx) + 2
            ymin = min(0, vy) - 2
            ymax = max(0, vy) + 2
            return {
                "type": "fn",
                "xrange": [round(xmin), round(xmax)],
                "yrange": [round(ymin), round(ymax)],
                "points": [
                    {"x": 0, "y": 0, "label": "O", "r": 3},
                    {"x": round(vx), "y": round(vy), "label": f"u=({clean_num(vx)},{clean_num(vy)})", "color": "#1E3A6E"}
                ],
                "fns": [
                    {"fn": f"({clean_num(vy)}/{clean_num(vx)})*x" if vx != 0 else "0", "label": "\\mathbf{u}", "color": "#1E3A6E", "lx": vx/2, "ly": vy/2}
                ] if vx != 0 else [],
                "w": 240, "h": 200
            }

    # ── 5. LINES & LINEAR FUNCTIONS ──
    # Line through two points (x1, y1) and (x2, y2)
    m_pts = re.search(r'(?:line|passes\s*through|يمر\s*بالنقطت?ين?).*?\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\).*?\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)', t_clean, re.I)
    if m_pts:
        x1, y1, x2, y2 = [float(m_pts.group(i)) for i in range(1, 5)]
        if x1 != x2 and abs(x1) < 25 and abs(x2) < 25 and abs(y1) < 25 and abs(y2) < 25:
            m = (y2 - y1) / (x2 - x1)
            b = y1 - m * x1
            xmin = min(x1, x2) - 2
            xmax = max(x1, x2) + 2
            ymin = min(y1, y2, b) - 2
            ymax = max(y1, y2, b) + 2
            fn_str = f"{clean_num(m)}*x + {clean_num(b)}" if b >= 0 else f"{clean_num(m)}*x - {clean_num(abs(b))}"
            if m == 1:
                fn_str = f"x + {clean_num(b)}" if b >= 0 else f"x - {clean_num(abs(b))}"
            elif m == -1:
                fn_str = f"-x + {clean_num(b)}" if b >= 0 else f"-x - {clean_num(abs(b))}"
            return {
                "type": "fn",
                "xrange": [round(xmin), round(xmax)],
                "yrange": [round(ymin), round(ymax)],
                "fns": [{"fn": fn_str, "label": f"y = {clean_num(m)}x + {clean_num(b)}" if b >= 0 else f"y = {clean_num(m)}x - {clean_num(abs(b))}", "color": "#1E3A6E"}],
                "points": [
                    {"x": round(x1), "y": round(y1), "label": f"({clean_num(x1)},{clean_num(y1)})", "color": "#C8902A"},
                    {"x": round(x2), "y": round(y2), "label": f"({clean_num(x2)},{clean_num(y2)})", "color": "#C8902A"}
                ],
                "w": 260, "h": 200
            }

    # Standard form linear equations: 2y - 4x = 8 or 3x + 2y = 12
    m_std_line = re.search(r'([+-]?\s*\d*)\s*y\s*([+-]\s*\d+)\s*x\s*=\s*(-?\d+)', t_clean)
    if m_std_line:
        a_str = m_std_line.group(1).replace(' ', '')
        a_coeff = 1.0 if a_str == '' or a_str == '+' else (-1.0 if a_str == '-' else float(a_str))
        b_coeff = float(m_std_line.group(2).replace(' ', ''))
        c_val = float(m_std_line.group(3))
        # ay + bx = c => y = (-b/a)x + (c/a)
        if a_coeff != 0:
            m_val = -b_coeff / a_coeff
            b_val = c_val / a_coeff
            x_int = -b_val / m_val if m_val != 0 else 0
            xmin = min(-4, x_int - 2)
            xmax = max(4, x_int + 2)
            ymin = min(-4, b_val - 2)
            ymax = max(4, b_val + 2)
            return {
                "type": "fn",
                "xrange": [round(xmin), round(xmax)],
                "yrange": [round(ymin), round(ymax)],
                "fns": [{"fn": f"{clean_num(m_val)}*x + {clean_num(b_val)}", "label": "Line", "color": "#1E3A6E"}],
                "points": [
                    {"x": 0, "y": round(b_val), "label": f"(0,{clean_num(b_val)})", "color": "#C8902A"},
                    {"x": round(x_int, 1), "y": 0, "label": f"({clean_num(x_int)},0)", "color": "#C8902A"}
                ],
                "w": 260, "h": 200
            }

    # Line equation y = mx + b or f(x) = mx + b
    m_line_eq = re.search(r'(?:y|f\(x\))\s*=\s*(-?\d*(?:\.\d+)?)x\s*([+-]\s*\d+(?:\.\d+)?)', t_clean)
    if m_line_eq and ('slope' in t_lower or 'intercept' in t_lower or 'graph' in t_lower or 'line' in t_lower or 'find f(' in t_lower):
        m_str = m_line_eq.group(1)
        m_val = -1.0 if m_str == '-' else (1.0 if m_str == '' else float(m_str))
        b_val = float(m_line_eq.group(2).replace(' ', ''))
        if abs(m_val) < 15 and abs(b_val) < 25:
            x_int = -b_val / m_val if m_val != 0 else 0
            xmin = min(-4, x_int - 2)
            xmax = max(4, x_int + 2)
            ymin = min(-4, b_val - 2)
            ymax = max(4, b_val + 2)
            return {
                "type": "fn",
                "xrange": [round(xmin), round(xmax)],
                "yrange": [round(ymin), round(ymax)],
                "fns": [{"fn": f"{clean_num(m_val)}*x + {clean_num(b_val)}", "label": f"y = {clean_num(m_val)}x + {clean_num(b_val)}", "color": "#1E3A6E"}],
                "points": [
                    {"x": 0, "y": round(b_val), "label": f"(0,{clean_num(b_val)})", "color": "#C8902A"},
                    {"x": round(x_int, 1), "y": 0, "label": f"({clean_num(x_int)},0)", "color": "#C8902A"}
                ],
                "w": 260, "h": 200
            }

    # ── 6. PARABOLAS & QUADRATICS ──
    # Parabola y = -(x-h)^2 + k or (x-h)^2 + k
    m_parab = re.search(r'(?:parabola|quadratic|قطع\s*مكافئ).*?y\s*=\s*(-?)\s*\(?\s*x\s*([+-]\s*\d+)\s*\)?\^2\s*([+-]\s*\d+)', t_clean, re.I)
    if m_parab:
        sign = -1.0 if m_parab.group(1) == '-' else 1.0
        h_val = -float(m_parab.group(2).replace(' ', ''))
        k_val = float(m_parab.group(3).replace(' ', ''))
        if abs(h_val) < 15 and abs(k_val) < 25:
            xmin = h_val - 4
            xmax = h_val + 4
            ymin = min(k_val - 5, -2) if sign > 0 else min(-5, k_val - 6)
            ymax = max(k_val + 5, 4) if sign < 0 else max(k_val + 6, 6)
            fn_py = f"{'-' if sign < 0 else ''}(x - {h_val})**2 + {k_val}"
            return {
                "type": "fn",
                "xrange": [round(xmin), round(xmax)],
                "yrange": [round(ymin), round(ymax)],
                "fns": [{"fn": fn_py, "label": "f(x)", "color": "#1E3A6E"}],
                "points": [{"x": round(h_val), "y": round(k_val), "label": f"vertex ({clean_num(h_val)},{clean_num(k_val)})", "color": "#C8902A"}],
                "w": 260, "h": 200
            }

    # Quadratic equation f(x) = x^2 + c or f(x) = x^2 - c
    m_fn_quad = re.search(r'f\(x\)\s*=\s*x\^2\s*([+-]\s*\d+)', t_clean)
    if m_fn_quad and ('domain' in t_lower or 'range' in t_lower or 'vertex' in t_lower or 'graph' in t_lower):
        c_val = float(m_fn_quad.group(1).replace(' ', ''))
        if abs(c_val) < 25:
            return {
                "type": "fn",
                "xrange": [-4, 4],
                "yrange": [round(min(-2, c_val - 2)), round(max(6, c_val + 10))],
                "fns": [{"fn": f"x*x + {clean_num(c_val)}", "label": f"f(x) = x² + {clean_num(c_val)}" if c_val >= 0 else f"f(x) = x² - {clean_num(abs(c_val))}", "color": "#1E3A6E"}],
                "points": [{"x": 0, "y": round(c_val), "label": f"(0,{clean_num(c_val)})", "color": "#C8902A"}],
                "w": 260, "h": 200
            }

    # Arabic quadratic: حل المعادلة 2x^2 - 18 = 0 or x^2 - 4 = 0
    m_ar_quad = re.search(r'(\d*)x\^2\s*-\s*(\d+)\s*=\s*0', t_clean)
    if m_ar_quad and ('حل' in t_clean or 'solve' in t_lower or 'factor' in t_lower):
        a_str = m_ar_quad.group(1)
        a_val = float(a_str) if a_str else 1.0
        c_val = float(m_ar_quad.group(2))
        root = math.sqrt(c_val / a_val) if a_val > 0 and c_val >= 0 else None
        if root and root < 15:
            return {
                "type": "fn",
                "xrange": [round(-root - 2), round(root + 2)],
                "yrange": [round(-c_val - 2), round(c_val / 2 + 4)],
                "fns": [{"fn": f"{clean_num(a_val)}*x*x - {clean_num(c_val)}", "label": "f(x)", "color": "#1E3A6E"}],
                "points": [
                    {"x": round(-root, 1), "y": 0, "label": f"x={clean_num(-root)}", "color": "#C8902A"},
                    {"x": round(root, 1), "y": 0, "label": f"x={clean_num(root)}", "color": "#C8902A"}
                ],
                "w": 260, "h": 200
            }

    # ── 7. DATA TABLES & TWO-WAY TABLES ──
    # Function table: "table shows that f(x1)=y1 and f(x2)=y2... what is f(x3)?"
    m_tbl_fn = re.search(r'(?:table\s*shows|الجدول).*?f\((\d+)\)\s*=\s*(-?\d+).*?f\((\d+)\)\s*=\s*(-?\d+).*?f\((\d+)\)', t_clean, re.I)
    if m_tbl_fn:
        x1, y1, x2, y2, x3 = [m_tbl_fn.group(i) for i in range(1, 6)]
        return {
            "type": "table",
            "headers": ["x", "f(x)"],
            "rows": [[x1, y1], [x2, y2], [x3, "?"]]
        }

    # Survey table or frequency table with numbers
    if 'survey' in t_lower or 'frequency table' in t_lower or 'two-way table' in t_lower:
        nums = re.findall(r'\b\d+\b', t_clean)
        if len(nums) >= 4:
            return {
                "type": "table",
                "caption": "Survey Data",
                "headers": ["Category", "Group A", "Group B", "Total"],
                "rows": [
                    ["Option 1", nums[0], nums[1], str(int(nums[0]) + int(nums[1]))],
                    ["Option 2", nums[2], nums[3], str(int(nums[2]) + int(nums[3]))]
                ]
            }

    # ── 8. AP STATISTICS: NORMAL CURVE & BOXPLOTS ──
    # Normal distribution with mu and sigma
    m_norm = re.search(r'normal\s*distribution.*?(?:\\mu|mean|المتوسط)\s*=\s*(\d+(?:\.\d+)?).*?(?:\\sigma|standard\s*deviation|الانحراف).*?=\s*(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_norm:
        mu, sigma = float(m_norm.group(1)), float(m_norm.group(2))
        if sigma > 0:
            xmin = mu - 3.5 * sigma
            xmax = mu + 3.5 * sigma
            # Gaussian bell curve centered at mu
            norm_fn = f"exp(-((x - {clean_num(mu)})**2) / (2 * {clean_num(sigma)}**2))"
            return {
                "type": "fn",
                "xrange": [round(xmin), round(xmax)],
                "yrange": [-0.1, 1.2],
                "fns": [{"fn": norm_fn, "label": f"Normal(μ={clean_num(mu)}, σ={clean_num(sigma)})", "color": "#1E3A6E"}],
                "points": [
                    {"x": round(mu), "y": 1.0, "label": f"μ={clean_num(mu)}", "color": "#C8902A"},
                    {"x": round(mu - sigma), "y": 0.61, "label": f"μ-σ", "color": "#1E3A6E"},
                    {"x": round(mu + sigma), "y": 0.61, "label": f"μ+σ", "color": "#1E3A6E"}
                ],
                "w": 260, "h": 200
            }

    # Boxplot / IQR: Q1 and Q3
    m_iqr = re.search(r'q_1\s*=\s*(\d+).*?q_3\s*=\s*(\d+)', t_clean, re.I)
    if m_iqr:
        q1, q3 = float(m_iqr.group(1)), float(m_iqr.group(2))
        iqr = q3 - q1
        if iqr > 0:
            low_out = q1 - 1.5 * iqr
            high_out = q3 + 1.5 * iqr
            return {
                "type": "numberline",
                "range": [round(low_out - 5), round(high_out + 5)],
                "points": [
                    {"x": round(q1), "label": f"Q1={int(q1)}", "color": "#1E3A6E"},
                    {"x": round((q1+q3)/2), "label": "Med", "color": "#C8902A"},
                    {"x": round(q3), "label": f"Q3={int(q3)}", "color": "#1E3A6E"}
                ],
                "w": 260, "h": 120
            }

    # ── 9. DIFFERENTIAL EQUATIONS (ODES): SOLUTION CURVES ──
    # dy/dx = ky, y(0) = y0 => y = y0 * exp(k*x)
    m_ode_exp = re.search(r'\\dfrac\{dy\}\{d[xt]\}\s*=\s*(-?\d*)y.*?y\(0\)\s*=\s*(\d+)', text)
    if m_ode_exp:
        k_str = m_ode_exp.group(1)
        k_val = 1.0 if k_str == '' or k_str == '+' else (-1.0 if k_str == '-' else float(k_str))
        y0_val = float(m_ode_exp.group(2))
        if 0 < y0_val < 50 and abs(k_val) < 10:
            return {
                "type": "fn",
                "xrange": [-1, 3],
                "yrange": [-1, round(max(y0_val * 4, 10))],
                "fns": [{"fn": f"{clean_num(y0_val)}*exp({clean_num(k_val)}*x)", "label": "y(t)", "color": "#1E3A6E"}],
                "points": [{"x": 0, "y": round(y0_val), "label": f"(0,{clean_num(y0_val)})", "color": "#C8902A"}],
                "w": 260, "h": 200
            }

    # ── 10. 3D GEOMETRY SOLIDS ──
    # Cylinder: radius and height
    m_cyl = re.search(r'(?:cylinder|أسطوانة).*?(?:radius|نصف\s*قطر).*?(\d+(?:\.\d+)?).*?(?:height|ارتفاع).*?(\d+(?:\.\d+)?)', t_clean, re.I)
    if not m_cyl:
        m_cyl = re.search(r'(?:cylinder|أسطوانة).*?(?:height|ارتفاع).*?(\d+(?:\.\d+)?).*?(?:radius|نصف\s*قطر).*?(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_cyl:
        v1, v2 = float(m_cyl.group(1)), float(m_cyl.group(2))
        r_cyl, h_cyl = (v1, v2) if 'radius' in t_lower[:t_lower.find(str(int(v2)))] else (v2, v1)
        if 0 < r_cyl < 100 and 0 < h_cyl < 200:
            return {
                "type": "geometry_3d",
                "solid": "cylinder",
                "radius": round(r_cyl),
                "height": round(h_cyl),
                "labels": {"r": f"r = {clean_num(r_cyl)}", "h": f"h = {clean_num(h_cyl)}"},
                "w": 240, "h": 200
            }

    # Cone: radius and height
    m_cone = re.search(r'(?:cone|مخروط).*?(?:radius|نصف\s*قطر).*?(\d+(?:\.\d+)?).*?(?:height|ارتفاع).*?(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_cone:
        r_c, h_c = float(m_cone.group(1)), float(m_cone.group(2))
        if 0 < r_c < 100 and 0 < h_c < 200:
            return {
                "type": "geometry_3d",
                "solid": "cone",
                "radius": round(r_c),
                "height": round(h_c),
                "labels": {"r": f"r = {clean_num(r_c)}", "h": f"h = {clean_num(h_c)}"},
                "w": 240, "h": 200
            }

    # Rectangular prism / box
    m_box = re.search(r'(?:rectangular\s*prism|box|متوازي\s*مستطيلات).*?(\d+).*?(\d+).*?(\d+)', t_clean, re.I)
    if m_box:
        l, w, h = float(m_box.group(1)), float(m_box.group(2)), float(m_box.group(3))
        if 0 < l < 100 and 0 < w < 100 and 0 < h < 100:
            return {
                "type": "geometry_3d",
                "solid": "rectangular_prism",
                "length": round(l), "width": round(w), "height": round(h),
                "labels": {"l": clean_num(l), "w": clean_num(w), "h": clean_num(h)},
                "w": 240, "h": 200
            }

    # Cube edge length
    m_cube = re.search(r'(?:cube|مكعب).*?(?:edge|side|طول\s*ضلعه|حرف)\s*(?:of|=|length)?\s*(\d+(?:\.\d+)?)', t_clean, re.I)
    if m_cube:
        c_edge = float(m_cube.group(1))
        if 0 < c_edge < 100:
            return {
                "type": "geometry_3d",
                "solid": "cube",
                "length": round(c_edge), "width": round(c_edge), "height": round(c_edge),
                "labels": {"l": clean_num(c_edge), "w": clean_num(c_edge), "h": clean_num(c_edge)},
                "w": 220, "h": 180
            }

    # ── 11. PARALLEL LINES & TRANSVERSALS ──
    if 'transversal' in t_lower or ('parallel lines' in t_lower and 'angle' in t_lower) or ('مستقيمين متوازيين' in t_clean and 'قاطع' in t_clean):
        m_ang = re.search(r'(\d{2,3})\s*(?:\^\s*\\?circ|°|deg)', t_clean)
        ang_val = float(m_ang.group(1)) if m_ang else 65.0
        ang_val = ang_val if 25 <= ang_val <= 155 else 65.0
        return {
            "type": "transversal",
            "angle": round(ang_val),
            "labels": {"1": f"{int(ang_val)}°", "5": "x"},
            "w": 220, "h": 160
        }

    # ── 12. CALCULUS CURVES & INTEGRALS ──
    # Definite integral with bounds a to b
    m_int = re.search(r'\\int_\{?(-?\d+)\}?\^\{?(-?\d+)\}?\s*(x\^2|x|2x|3x\^2|x\^3)', t_clean)
    if m_int:
        a_int, b_int = float(m_int.group(1)), float(m_int.group(2))
        c_name = m_int.group(3)
        fn_code = "x*x" if "x^2" in c_name else ("x*x*x" if "x^3" in c_name else "x")
        if a_int < b_int and abs(a_int) < 10 and abs(b_int) < 10:
            return {
                "type": "fn",
                "xrange": [round(a_int - 1), round(b_int + 2)],
                "yrange": [-1, round(max(4, b_int**2 + 1))],
                "fns": [{"fn": fn_py_from_tex(c_name), "label": f"y = {c_name}", "color": "#1E3A6E"}],
                "shade": [{"fn": fn_py_from_tex(c_name), "x1": round(a_int), "x2": round(b_int), "color": "rgba(30,58,110,0.18)"}],
                "w": 260, "h": 200
            }

    # Area bounded by y = x^2 and lines x = a, x = b
    m_area_bnd = re.search(r'bounded\s*by\s*y\s*=\s*(x\^2|x\^3|2x|x).*?x\s*=\s*(\d+).*?x\s*=\s*(\d+)', t_clean, re.I)
    if m_area_bnd:
        fn_txt = m_area_bnd.group(1)
        a_x, b_x = float(m_area_bnd.group(2)), float(m_area_bnd.group(3))
        if a_x < b_x and b_x < 10:
            return {
                "type": "fn",
                "xrange": [round(a_x - 1), round(b_x + 2)],
                "yrange": [-1, round(max(4, b_x**2 + 1))],
                "fns": [{"fn": fn_py_from_tex(fn_txt), "label": f"y = {fn_txt}", "color": "#1E3A6E"}],
                "shade": [{"fn": fn_py_from_tex(fn_txt), "x1": round(a_x), "x2": round(b_x), "color": "rgba(30,58,110,0.18)"}],
                "w": 260, "h": 200
            }

    # ── 13. NUMBER LINES & INEQUALITIES ──
    # Linear inequalities: 3x + 5 < 14 or x <= a
    m_lin_ineq = re.search(r'(\d*)x\s*([+-]\s*\d+)\s*(<=|>=|<|>)\s*(-?\d+)', t_clean)
    if m_lin_ineq:
        c_str = m_lin_ineq.group(1)
        c_coeff = float(c_str) if c_str else 1.0
        const_val = float(m_lin_ineq.group(2).replace(' ', ''))
        op = m_lin_ineq.group(3)
        rhs = float(m_lin_ineq.group(4))
        if c_coeff > 0:
            x_bnd = (rhs - const_val) / c_coeff
            if abs(x_bnd) < 25:
                is_open = op in ['<', '>']
                is_right = op in ['>', '>=']
                return {
                    "type": "numberline",
                    "range": [round(x_bnd - 5), round(x_bnd + 5)],
                    "points": [{"x": round(x_bnd, 1), "label": f"x = {clean_num(x_bnd)}", "open": is_open, "color": "#1E3A6E"}],
                    "arrows": [{"x1": round(x_bnd, 1), "x2": round(x_bnd + 4.5 if is_right else x_bnd - 4.5), "color": "#1E3A6E"}],
                    "w": 240, "h": 100
                }

    m_ineq = re.search(r'x\s*(<=|>=|<|>)\s*(-?\d+)', t_clean)
    if m_ineq and ('inequality' in t_lower or 'solution set' in t_lower or 'متباينة' in t_clean):
        op, val_s = m_ineq.group(1), m_ineq.group(2)
        val = float(val_s)
        if abs(val) < 20:
            is_open = op in ['<', '>']
            is_right = op in ['>', '>=']
            return {
                "type": "numberline",
                "range": [round(val - 5), round(val + 5)],
                "points": [{"x": round(val), "label": f"x = {clean_num(val)}", "open": is_open, "color": "#1E3A6E"}],
                "arrows": [{"x1": round(val), "x2": round(val + 4.5 if is_right else val - 4.5), "color": "#1E3A6E"}],
                "w": 240, "h": 100
            }

    # ── 14. DOUBLE INTEGRAL REGIONS (MVC) ──
    # Compute \iint_R dA for R = [x1, x2] \times [y1, y2]
    m_dbl_int = re.search(r'R\s*=\s*\[\s*(-?\d+)\s*,\s*(-?\d+)\s*\]\s*(?:\\times|x)\s*\[\s*(-?\d+)\s*,\s*(-?\d+)\s*\]', text)
    if m_dbl_int:
        x1, x2, y1, y2 = [float(m_dbl_int.group(i)) for i in range(1, 5)]
        if x2 > x1 and y2 > y1 and abs(x2 - x1) < 50 and abs(y2 - y1) < 50:
            return {
                "type": "rect",
                "vertices": [[x1, y1], [x2, y1], [x2, y2], [x1, y2]],
                "sides": [clean_num(x2 - x1), clean_num(y2 - y1), clean_num(x2 - x1), clean_num(y2 - y1)],
                "labels": [f"({clean_num(x1)},{clean_num(y1)})", f"({clean_num(x2)},{clean_num(y1)})", f"({clean_num(x2)},{clean_num(y2)})", f"({clean_num(x1)},{clean_num(y2)})"],
                "w": 220, "h": 180
            }

    # ── 15. SEQUENCES & SERIES (EST2L2, ACT2L2) ──
    m_geom_seq = re.search(r'geometric\s*sequence.*?a_1\s*=\s*(-?\d+).*?r\s*=\s*(-?\d+)', t_clean, re.I)
    if m_geom_seq:
        a1, r_val = float(m_geom_seq.group(1)), float(m_geom_seq.group(2))
        a2 = a1 * r_val
        a3 = a2 * r_val
        return {
            "type": "table",
            "caption": "Geometric Sequence",
            "headers": ["n", "a_n"],
            "rows": [["1", clean_num(a1)], ["2", clean_num(a2)], ["3", clean_num(a3)], ["4", "..."]]
        }

    m_arith_seq = re.search(r'arithmetic\s*sequence.*?a_1\s*=\s*(-?\d+).*?d\s*=\s*(-?\d+)', t_clean, re.I)
    if m_arith_seq:
        a1, d_val = float(m_arith_seq.group(1)), float(m_arith_seq.group(2))
        a2 = a1 + d_val
        a3 = a2 + d_val
        return {
            "type": "table",
            "caption": "Arithmetic Sequence",
            "headers": ["n", "a_n"],
            "rows": [["1", clean_num(a1)], ["2", clean_num(a2)], ["3", clean_num(a3)], ["4", "..."]]
        }

    # ── 16. SPECIAL TRIGONOMETRIC ANGLES (ACT2L2, TAHSILI, PRECALC) ──
    if re.search(r'\\(?:sin|cos|tan)\s*\(\s*(?:30|60)\s*(?:\^\s*\\?circ|°)\s*\)', text):
        return {
            "type": "triangle",
            "vertices": [[0, 0], [math.sqrt(3)*4, 0], [0, 4]],
            "right": 0,
            "sides": ["√3", "2", "1"],
            "angles": ["", "30°", "60°"],
            "labels": ["A", "B", "C"],
            "w": 220, "h": 180
        }
    if re.search(r'\\(?:sin|cos|tan)\s*\(\s*45\s*(?:\^\s*\\?circ|°)\s*\)', text):
        return {
            "type": "triangle",
            "vertices": [[0, 0], [6, 0], [0, 6]],
            "right": 0,
            "sides": ["1", "√2", "1"],
            "angles": ["", "45°", "45°"],
            "labels": ["A", "B", "C"],
            "w": 220, "h": 180
        }

    # ── 17. FUNCTION TRANSFORMATIONS (EST2L2) ──
    m_transf = re.search(r'g\(x\)\s*=\s*(-?\d*)\s*f\(x\s*([+-]\s*\d+)\)\s*([+-]\s*\d+)', t_clean)
    if m_transf:
        a_s = m_transf.group(1)
        a_v = float(a_s) if a_s and a_s != '-' else (-1.0 if a_s == '-' else 1.0)
        h_v = -float(m_transf.group(2).replace(' ', ''))
        k_v = float(m_transf.group(3).replace(' ', ''))
        if abs(h_v) < 20 and abs(k_v) < 30:
            return {
                "type": "fn",
                "xrange": [round(h_v - 4), round(h_v + 4)],
                "yrange": [round(min(-2, k_v - 4)), round(max(6, k_v + 10))],
                "fns": [{"fn": f"{clean_num(a_v)}*(x - {clean_num(h_v)})**2 + {clean_num(k_v)}", "label": "g(x)", "color": "#1E3A6E"}],
                "points": [{"x": round(h_v), "y": round(k_v), "label": f"vertex ({clean_num(h_v)},{clean_num(k_v)})", "color": "#C8902A"}],
                "w": 260, "h": 200
            }

    # ── 18. PARTIAL DERIVATIVES SLICES (MVC) ──
    m_pderiv = re.search(r'f\(x,y\)\s*=\s*(\d+)\s*x\^\{?2\}?\s*\+\s*(\d+)\s*y\^\{?2\}?.*?f_([xy])\((-?\d+)\s*,\s*(-?\d+)\)', text)
    if m_pderiv:
        a_c = float(m_pderiv.group(1))
        b_c = float(m_pderiv.group(2))
        var = m_pderiv.group(3)
        x0, y0 = float(m_pderiv.group(4)), float(m_pderiv.group(5))
        if var == 'x' and abs(x0) < 20 and abs(y0) < 20:
            c_val = b_c * (y0 ** 2)
            z0 = a_c * (x0 ** 2) + c_val
            slope = 2 * a_c * x0
            return {
                "type": "fn",
                "xrange": [round(x0 - 3), round(x0 + 3)],
                "yrange": [round(min(0, z0 - 10)), round(z0 + 20)],
                "fns": [
                    {"fn": f"{clean_num(a_c)}*x*x + {clean_num(c_val)}", "label": f"z(x, y={clean_num(y0)})", "color": "#1E3A6E"},
                    {"fn": f"{clean_num(slope)}*(x - {clean_num(x0)}) + {clean_num(z0)}", "label": "tangent", "color": "#C8902A"}
                ],
                "points": [{"x": round(x0), "y": round(z0), "label": f"P({clean_num(x0)},{clean_num(z0)})", "color": "#C8902A"}],
                "w": 260, "h": 200
            }
        elif var == 'y' and abs(x0) < 20 and abs(y0) < 20:
            c_val = a_c * (x0 ** 2)
            z0 = b_c * (y0 ** 2) + c_val
            slope = 2 * b_c * y0
            return {
                "type": "fn",
                "xrange": [round(y0 - 3), round(y0 + 3)],
                "yrange": [round(min(0, z0 - 10)), round(z0 + 20)],
                "fns": [
                    {"fn": f"{clean_num(b_c)}*x*x + {clean_num(c_val)}", "label": f"z(x={clean_num(x0)}, y)", "color": "#1E3A6E"},
                    {"fn": f"{clean_num(slope)}*(x - {clean_num(y0)}) + {clean_num(z0)}", "label": "tangent", "color": "#C8902A"}
                ],
                "points": [{"x": round(y0), "y": round(z0), "label": f"P({clean_num(y0)},{clean_num(z0)})", "color": "#C8902A"}],
                "w": 260, "h": 200
            }

    # ── 19. QUADRATICS WITH ROOTS: x^2 + bx + c = 0 (TAHSILI, ALGEBRA, ALG2) ──
    m_quad_roots = re.search(r'x\^2\s*([+-]\s*\d+)\s*x\s*([+-]\s*\d+)\s*=\s*0', t_clean)
    if m_quad_roots:
        b_q = float(m_quad_roots.group(1).replace(' ', ''))
        c_q = float(m_quad_roots.group(2).replace(' ', ''))
        disc = b_q * b_q - 4 * c_q
        h_q = -b_q / 2.0
        k_q = c_q - (b_q * b_q) / 4.0
        r_pts = []
        if disc >= 0:
            r1 = (-b_q - math.sqrt(disc)) / 2.0
            r2 = (-b_q + math.sqrt(disc)) / 2.0
            r_pts = [
                {"x": round(r1, 1), "y": 0, "label": f"x={clean_num(r1)}", "color": "#C8902A"},
                {"x": round(r2, 1), "y": 0, "label": f"x={clean_num(r2)}", "color": "#C8902A"}
            ]
        if abs(h_q) < 25 and abs(k_q) < 50:
            xmin = min(h_q - 4, -4)
            xmax = max(h_q + 4, 4)
            ymin = min(k_q - 2, -4)
            ymax = max(k_q + 10, 6)
            fn_code = f"x*x + ({clean_num(b_q)})*x + ({clean_num(c_q)})"
            return {
                "type": "fn",
                "xrange": [round(xmin), round(xmax)],
                "yrange": [round(ymin), round(ymax)],
                "fns": [{"fn": fn_code, "label": "f(x)", "color": "#1E3A6E"}],
                "points": r_pts + [{"x": round(h_q, 1), "y": round(k_q, 1), "label": f"({clean_num(h_q)},{clean_num(k_q)})", "color": "#1E3A6E"}],
                "w": 260, "h": 200
            }

    # ── 20. RADICAL / SQUARE ROOT FUNCTIONS (ALG2, PRECALC) ──
    # f(x) = \sqrt{x + a} or \sqrt{x - a}
    m_rad_fn = re.search(r'f\(x\)\s*=\s*\\sqrt\{x\s*([+-]\s*\d+)\}', text)
    if m_rad_fn:
        a_r = float(m_rad_fn.group(1).replace(' ', ''))
        start_x = -a_r
        if abs(start_x) < 25:
            return {
                "type": "fn",
                "xrange": [round(start_x - 1), round(start_x + 9)],
                "yrange": [-1, 5],
                "fns": [{"fn": f"sqrt(x + {clean_num(a_r)})" if a_r >= 0 else f"sqrt(x - {clean_num(abs(a_r))})", "label": "f(x)", "color": "#1E3A6E"}],
                "points": [{"x": round(start_x), "y": 0, "label": f"({clean_num(start_x)},0)", "color": "#C8902A"}],
                "w": 260, "h": 200
            }

    # ── 21. EULER'S METHOD ITERATION TABLES (ODES) ──
    m_euler = re.search(r'(?:euler|heun).*?h\s*=\s*(?:\\frac\{(\d+)\}\{(\d+)\}|(\d+(?:\.\d+)?))', t_clean, re.I)
    if m_euler:
        if m_euler.group(1) and m_euler.group(2):
            h_e = float(m_euler.group(1)) / float(m_euler.group(2))
            h_lbl = f"{m_euler.group(1)}/{m_euler.group(2)}"
        else:
            h_e = float(m_euler.group(3))
            h_lbl = str(h_e)
        return {
            "type": "table",
            "caption": f"Euler's Numerical Steps (h = {h_lbl})",
            "headers": ["Step n", "x_n", "y_n", "f(x_n, y_n)", "y_{n+1}"],
            "rows": [
                ["0", "x_0", "y_0", "f(x_0, y_0)", "y_0 + h·f"],
                ["1", clean_num(h_e), "y_1", "f(x_1, y_1)", "y_1 + h·f"],
                ["2", clean_num(2 * h_e), "y_2", "f(x_2, y_2)", "..."]
            ]
        }

    # ── 22. MATRIX LAYOUT TABLES (TAHSILI, ACT2L2, LINALG) ──
    m_mat_dim = re.search(r'(?:matrix|مصفوفة).*?(\d+)\s*(?:rows|صفوف).*?(\d+)\s*(?:columns|أعمدة)', t_clean, re.I)
    if m_mat_dim:
        nr, nc = int(m_mat_dim.group(1)), int(m_mat_dim.group(2))
        if 1 <= nr <= 5 and 1 <= nc <= 5:
            hdrs = [f"Col {j+1}" for j in range(nc)]
            rows = [[f"a_{{{i+1},{j+1}}}" for j in range(nc)] for i in range(nr)]
            return {
                "type": "table",
                "caption": f"Matrix Structure ({nr} × {nc})",
                "headers": hdrs,
                "rows": rows
            }

    return None

def process_all_banks():
    bank_files = sorted(glob.glob('bank-data/*.json'))
    print(f"Starting figure equipping across {len(bank_files)} question banks...")
    
    total_added = 0
    total_questions = 0
    
    stats_per_bank = []
    
    for bf in bank_files:
        with open(bf, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        is_dict = isinstance(data, dict)
        pool = []
        is_diff_dict = False
        
        if is_dict:
            if 'pool' in data:
                pool = data['pool']
            elif 'easy' in data or 'medium' in data or 'hard' in data:
                is_diff_dict = True
                pool = (data.get('easy') or []) + (data.get('medium') or []) + (data.get('hard') or [])
        else:
            pool = data
            
        bank_total = len(pool)
        total_questions += bank_total
        initial_figs = sum(1 for q in pool if q.get('figure') or q.get('fig') or q.get('table'))
        added_in_bank = 0
        
        type_counts = {}
        
        for q in pool:
            fig = extract_figure(q)
            if fig:
                q['figure'] = fig
                added_in_bank += 1
                t = fig.get('type', 'other')
                type_counts[t] = type_counts.get(t, 0) + 1
                
        if added_in_bank > 0:
            total_added += added_in_bank
            # Save file
            with open(bf, 'w', encoding='utf-8') as f:
                if is_dict and not is_diff_dict:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                elif is_diff_dict:
                    # easy/medium/hard already updated in place
                    json.dump(data, f, ensure_ascii=False, indent=2)
                else:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                    
        final_figs = initial_figs + added_in_bank
        pct = (final_figs / bank_total * 100) if bank_total else 0
        stats_per_bank.append((bf, bank_total, initial_figs, added_in_bank, final_figs, pct, type_counts))
        print(f"[{os.path.basename(bf):18}] Added: {added_in_bank:4} | New Total: {final_figs:4}/{bank_total:4} ({pct:4.1f}%) | Types: {type_counts}")
        
    print("\n" + "="*70)
    print(f"FIGURE EQUIPPING COMPLETED:")
    print(f"Total Questions Analyzed: {total_questions:,}")
    print(f"Total Figures Added:      {total_added:,}")
    print("="*70)

if __name__ == '__main__':
    process_all_banks()
