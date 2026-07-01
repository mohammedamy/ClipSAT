#!/usr/bin/env python3
"""
parse_notes.py — ClipSAT DOCX → Course JSON Pipeline
══════════════════════════════════════════════════════
Parses a Microsoft Word (.docx) file and produces a JSON file that conforms
to the ClipSAT course_schema.json.

Features
─────────
  • Extracts OMML math (<m:oMath>) elements via the document XML.
  • Converts OMML → MathML (using lxml + Microsoft's OMML2MML.XSL) and then
    to a LaTeX-ish string understood by MathJax / KaTeX.
  • Parses document structure:
      Heading 1 / Heading 2  →  Chapter titles
      Bold-only paragraphs   →  Definition or Theorem labels
      Numbered list items    →  Worked Example steps
      Normal paragraphs      →  Chapter notes / body text
      Bullet / list items    →  Key Formula hints or additional notes

Usage
─────
  python parse_notes.py Calculus_Notes.docx --out courses/calculus.json
  python parse_notes.py Digital_SAT_Math_Notes.docx --id digital-sat --level Standard

Requirements
────────────
  pip install python-docx lxml

  For OMML→MathML you also need the Microsoft OMML2MML.XSL stylesheet.
  It ships with Microsoft Office.  Common locations:
    Windows: C:/Program Files/Microsoft Office/root/vfs/ProgramFilesCommonX86/
             Microsoft Shared/OFFICE16/OMML2MML.XSL
    macOS:   /Applications/Microsoft Word.app/Contents/Resources/OMML2MML.XSL
  Override the path with --xsl or set env OMML2MML_XSL.
"""

import argparse
import json
import os
import re
import sys
import uuid
from pathlib import Path
from typing import Any

# ── Third-party ──────────────────────────────────────────────────────────────
try:
    from docx import Document
    from docx.oxml.ns import qn
    from lxml import etree
except ImportError as e:
    print(f"[ERROR] Missing dependency: {e}\n  Run: pip install python-docx lxml", file=sys.stderr)
    sys.exit(1)

# ── Namespaces ────────────────────────────────────────────────────────────────
NS = {
    'w'  : 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'm'  : 'http://schemas.openxmlformats.org/officeDocument/2006/math',
    'r'  : 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
}

# ── Default XSL locations to probe ───────────────────────────────────────────
_XSL_CANDIDATES = [
    os.environ.get('OMML2MML_XSL', ''),
    # macOS (Office 365)
    '/Applications/Microsoft Word.app/Contents/Resources/OMML2MML.XSL',
    # Windows Office 16
    r'C:\Program Files\Microsoft Office\root\vfs\ProgramFilesCommonX86'
    r'\Microsoft Shared\OFFICE16\OMML2MML.XSL',
    r'C:\Program Files (x86)\Microsoft Office\Office16\OMML2MML.XSL',
    # LibreOffice ships a copy too
    '/usr/lib/libreoffice/share/xslt/export/mathml/omml2mml.xsl',
]


def _find_xsl() -> str | None:
    for p in _XSL_CANDIDATES:
        if p and Path(p).exists():
            return str(p)
    return None


# ═════════════════════════════════════════════════════════════════════════════
# OMML → LaTeX conversion
# ═════════════════════════════════════════════════════════════════════════════

class MathConverter:
    """Converts OMML XML fragments to LaTeX strings."""

    def __init__(self, xsl_path: str | None = None):
        self._transformer = None
        path = xsl_path or _find_xsl()
        if path:
            try:
                xsl_tree = etree.parse(path)
                self._transformer = etree.XSLT(xsl_tree)
                print(f"[INFO] Loaded OMML2MML.XSL from: {path}")
            except Exception as exc:
                print(f"[WARN] Could not load XSL ({exc}). Falling back to heuristic converter.", file=sys.stderr)
        else:
            print("[WARN] OMML2MML.XSL not found. Using heuristic OMML→LaTeX converter.", file=sys.stderr)

    # ── Public entry point ───────────────────────────────────────────────────

    def omml_to_latex(self, omath_el: etree._Element) -> str:
        """Convert an <m:oMath> element to a LaTeX string."""
        if self._transformer:
            return self._via_xsl(omath_el)
        return self._via_heuristic(omath_el)

    # ── XSL path: OMML → MathML → (simple MathML→LaTeX) ────────────────────

    def _via_xsl(self, el: etree._Element) -> str:
        try:
            result = self._transformer(el)
            mathml = str(result)
            return self._mathml_to_latex(mathml)
        except Exception as exc:
            print(f"[WARN] XSL transform failed ({exc}); using heuristic.", file=sys.stderr)
            return self._via_heuristic(el)

    # ── Heuristic path: walk OMML XML and emit LaTeX ─────────────────────────

    def _via_heuristic(self, el: etree._Element) -> str:
        return _omml_node_to_latex(el).strip()

    # ── MathML → LaTeX (minimal — handles the most common Office output) ─────

    def _mathml_to_latex(self, mathml: str) -> str:
        """
        Very lightweight MathML→LaTeX.  Office's OMML2MML output is
        predictable enough that simple string transforms cover ~90% of cases.
        For a full solution, use the `latex2mathml` or `mathml2latex` packages.
        """
        # Strip XML declaration and namespaces for easier regex
        ml = re.sub(r'<\?xml[^?]*\?>', '', mathml)
        ml = re.sub(r'\s+xmlns(?::\w+)?="[^"]*"', '', ml)

        def tag(t):
            return re.compile(rf'<m?:{t}[^>]*>(.*?)</m?:{t}>', re.S)

        # Fractions
        ml = re.sub(
            r'<(?:m:)?mfrac[^>]*><(?:m:)?mrow[^>]*>(.*?)</(?:m:)?mrow><(?:m:)?mrow[^>]*>(.*?)</(?:m:)?mrow></(?:m:)?mfrac>',
            lambda m: r'\frac{' + _strip_tags(m.group(1)) + '}{' + _strip_tags(m.group(2)) + '}',
            ml, flags=re.S
        )
        # Superscripts
        ml = re.sub(
            r'<(?:m:)?msup[^>]*><(?:m:)?mrow[^>]*>(.*?)</(?:m:)?mrow><(?:m:)?mrow[^>]*>(.*?)</(?:m:)?mrow></(?:m:)?msup>',
            lambda m: _strip_tags(m.group(1)) + '^{' + _strip_tags(m.group(2)) + '}',
            ml, flags=re.S
        )
        # Subscripts
        ml = re.sub(
            r'<(?:m:)?msub[^>]*><(?:m:)?mrow[^>]*>(.*?)</(?:m:)?mrow><(?:m:)?mrow[^>]*>(.*?)</(?:m:)?mrow></(?:m:)?msub>',
            lambda m: _strip_tags(m.group(1)) + '_{' + _strip_tags(m.group(2)) + '}',
            ml, flags=re.S
        )
        # Square roots
        ml = re.sub(
            r'<(?:m:)?msqrt[^>]*>(.*?)</(?:m:)?msqrt>',
            lambda m: r'\sqrt{' + _strip_tags(m.group(1)) + '}',
            ml, flags=re.S
        )

        return _strip_tags(ml).strip()


def _strip_tags(s: str) -> str:
    return re.sub(r'<[^>]+>', '', s)


# ── Heuristic OMML walker ─────────────────────────────────────────────────────

_OMML_SYMBOLS = {
    'α': r'\alpha', 'β': r'\beta', 'γ': r'\gamma', 'δ': r'\delta',
    'ε': r'\epsilon', 'ζ': r'\zeta', 'η': r'\eta', 'θ': r'\theta',
    'λ': r'\lambda', 'μ': r'\mu', 'π': r'\pi', 'σ': r'\sigma',
    'τ': r'\tau', 'φ': r'\phi', 'ψ': r'\psi', 'ω': r'\omega',
    'Δ': r'\Delta', 'Σ': r'\Sigma', 'Π': r'\Pi', 'Ω': r'\Omega',
    '∞': r'\infty', '∫': r'\int', '∑': r'\sum', '∏': r'\prod',
    '±': r'\pm', '≤': r'\le', '≥': r'\ge', '≠': r'\ne',
    '→': r'\to', '⇒': r'\Rightarrow', '∈': r'\in', '∉': r'\notin',
    '⊂': r'\subset', '∪': r'\cup', '∩': r'\cap', '√': r'\sqrt',
}


def _omml_node_to_latex(el: etree._Element) -> str:
    tag_local = etree.QName(el.tag).localname if el.tag else ''

    # Text runs
    if tag_local == 't':
        text = (el.text or '').strip()
        for char, latex in _OMML_SYMBOLS.items():
            text = text.replace(char, latex)
        return text

    # Fraction: <m:f><m:num>…</m:num><m:den>…</m:den></m:f>
    if tag_local == 'f':
        num = el.find('.//{%s}num' % NS['m'])
        den = el.find('.//{%s}den' % NS['m'])
        n = _children_to_latex(num) if num is not None else ''
        d = _children_to_latex(den) if den is not None else ''
        return rf'\frac{{{n}}}{{{d}}}'

    # Superscript / subscript
    if tag_local == 'sSup':
        base = el.find('.//{%s}e' % NS['m'])
        sup  = el.find('.//{%s}sup' % NS['m'])
        b = _children_to_latex(base) if base is not None else ''
        s = _children_to_latex(sup)  if sup  is not None else ''
        return rf'{b}^{{{s}}}'

    if tag_local == 'sSub':
        base = el.find('.//{%s}e' % NS['m'])
        sub  = el.find('.//{%s}sub' % NS['m'])
        b = _children_to_latex(base) if base is not None else ''
        s = _children_to_latex(sub)  if sub  is not None else ''
        return rf'{b}_{{{s}}}'

    if tag_local == 'sSubSup':
        base = el.find('.//{%s}e'   % NS['m'])
        sub  = el.find('.//{%s}sub' % NS['m'])
        sup  = el.find('.//{%s}sup' % NS['m'])
        b = _children_to_latex(base) if base is not None else ''
        lo = _children_to_latex(sub)  if sub  is not None else ''
        hi = _children_to_latex(sup)  if sup  is not None else ''
        return rf'{b}_{{{lo}}}^{{{hi}}}'

    # Radical
    if tag_local == 'rad':
        deg = el.find('.//{%s}deg' % NS['m'])
        e   = el.find('.//{%s}e'   % NS['m'])
        body = _children_to_latex(e) if e is not None else ''
        if deg is not None and _children_to_latex(deg).strip():
            d = _children_to_latex(deg)
            return rf'\sqrt[{d}]{{{body}}}'
        return rf'\sqrt{{{body}}}'

    # Grouping characters / delimiters
    if tag_local == 'd':
        e = el.find('.//{%s}e' % NS['m'])
        inner = _children_to_latex(e) if e is not None else _children_to_latex(el)
        # Try to get beg/end chars
        begChr = el.find('.//{%s}dPr/{%s}begChr' % (NS['m'], NS['m']))
        endChr = el.find('.//{%s}dPr/{%s}endChr' % (NS['m'], NS['m']))
        b = (begChr.get(qn('m:val'), '(') if begChr is not None else '(')
        e2 = (endChr.get(qn('m:val'), ')') if endChr is not None else ')')
        _MAP = {'(': r'\left(', ')': r'\right)', '[': r'\left[', ']': r'\right]',
                '{': r'\left\{', '}': r'\right\}', '|': r'\left|'}
        bl = _MAP.get(b, r'\left' + b)
        br = _MAP.get(e2, r'\right' + e2)
        return rf'{bl}{inner}{br}'

    # n-ary (summation, integral, product)
    if tag_local == 'nary':
        chr_el = el.find('.//{%s}naryPr/{%s}chr' % (NS['m'], NS['m']))
        sym_char = chr_el.get(qn('m:val'), '∑') if chr_el is not None else '∑'
        sym = _OMML_SYMBOLS.get(sym_char, r'\sum')
        sub  = el.find('.//{%s}sub' % NS['m'])
        sup  = el.find('.//{%s}sup' % NS['m'])
        e    = el.find('.//{%s}e'   % NS['m'])
        lo = '_{' + _children_to_latex(sub) + '}' if sub is not None else ''
        hi = '^{' + _children_to_latex(sup) + '}' if sup is not None else ''
        body = _children_to_latex(e) if e is not None else ''
        return rf'{sym}{lo}{hi}{body}'

    # Fallback: recurse into children
    return _children_to_latex(el)


def _children_to_latex(el: etree._Element | None) -> str:
    if el is None:
        return ''
    parts = []
    if el.text:
        text = el.text.strip()
        for char, lat in _OMML_SYMBOLS.items():
            text = text.replace(char, lat)
        parts.append(text)
    for child in el:
        parts.append(_omml_node_to_latex(child))
        if child.tail:
            tail = child.tail.strip()
            for char, lat in _OMML_SYMBOLS.items():
                tail = tail.replace(char, lat)
            parts.append(tail)
    return ' '.join(p for p in parts if p)


# ═════════════════════════════════════════════════════════════════════════════
# Document parser
# ═════════════════════════════════════════════════════════════════════════════

class DocxParser:

    def __init__(self, path: str, course_id: str, math_converter: MathConverter):
        self.doc      = Document(path)
        self.course_id = course_id
        self.math     = math_converter

    # ── Top-level parse ──────────────────────────────────────────────────────

    def parse(self) -> dict[str, Any]:
        """Return a dict matching the ClipSAT course schema."""
        chapters: list[dict] = []
        current_chapter: dict | None = None
        current_content: dict        = self._empty_content()
        pending_label: str | None    = None   # "Definition", "Theorem", etc.

        for para in self.doc.paragraphs:
            style  = para.style.name or ''
            ptext  = self._para_text(para)
            latex  = self._extract_inline_math(para)  # may be ''

            # ── Heading 1 / 2 → new chapter ──────────────────────────────
            if 'Heading 1' in style or 'Heading 2' in style:
                if current_chapter is not None:
                    current_chapter['content'] = current_content
                    chapters.append(current_chapter)
                current_chapter = {
                    'id'         : _slug(ptext or f'ch-{len(chapters)+1}'),
                    'title'      : ptext,
                    'description': '',
                    'content'    : {},
                    'quiz'       : {'questions': []},
                }
                current_content = self._empty_content()
                pending_label   = None
                continue

            if current_chapter is None:
                # Pre-chapter content — skip or treat as course description
                continue

            ptext_stripped = ptext.strip()

            # ── Numbered list → worked example step ──────────────────────
            if 'List Number' in style or 'List Paragraph' in style:
                step_text = ptext_stripped or latex
                if step_text:
                    if not current_content['workedExamples']:
                        current_content['workedExamples'].append(
                            {'id': _uid(), 'problem': '(See steps below)', 'steps': [], 'answer': ''}
                        )
                    current_content['workedExamples'][-1]['steps'].append({
                        'text' : step_text,
                        'latex': latex if latex != step_text else '',
                    })
                continue

            # ── Bullet list → key formula note or additional note ─────────
            if 'List Bullet' in style:
                if latex:
                    current_content['keyFormulas'].append({
                        'id'   : _uid(),
                        'label': ptext_stripped.replace(latex, '').strip() or 'Formula',
                        'latex': latex,
                    })
                elif ptext_stripped:
                    current_content['notes'] += '\n- ' + ptext_stripped
                continue

            # ── Bold-only paragraph → Definition / Theorem label ──────────
            if self._is_bold(para):
                label = ptext_stripped.rstrip(':')
                if 'def' in label.lower():
                    pending_label = 'definition'
                elif any(w in label.lower() for w in ('theorem','rule','law','property','corollary')):
                    pending_label = 'theorem'
                else:
                    pending_label = 'note'
                continue

            # ── Normal paragraph with pending label ───────────────────────
            if pending_label and ptext_stripped:
                body = ptext_stripped + (f'  $${latex}$$' if latex else '')
                if pending_label == 'definition':
                    current_content['definitions'].append({
                        'id'  : _uid(),
                        'term': '',   # will be filled from label context
                        'body': body,
                    })
                elif pending_label == 'theorem':
                    current_content['theorems'].append({
                        'id'       : _uid(),
                        'name'     : '',
                        'statement': body,
                    })
                else:
                    current_content['notes'] += '\n' + body
                pending_label = None
                continue

            # ── Standalone math line → key formula ────────────────────────
            if latex and not ptext_stripped.replace(latex, '').strip():
                current_content['keyFormulas'].append({
                    'id'   : _uid(),
                    'label': 'Formula',
                    'latex': latex,
                })
                continue

            # ── Normal text with inline math ──────────────────────────────
            if ptext_stripped:
                body = ptext_stripped
                if latex:
                    body = re.sub(re.escape(latex), f'${latex}$', body, count=1)
                current_content['notes'] += '\n' + body

        # Flush last chapter
        if current_chapter is not None:
            current_chapter['content'] = current_content
            chapters.append(current_chapter)

        return {
            'id'      : self.course_id,
            'meta'    : self._build_meta(),
            'chapters': chapters,
        }

    # ── Helpers ──────────────────────────────────────────────────────────────

    def _build_meta(self) -> dict:
        props = self.doc.core_properties
        return {
            'title'   : props.title or self.course_id.replace('-', ' ').title(),
            'level'   : 'Standard',
            'color'   : 'var(--indigo)',
            'tags'    : [],
        }

    @staticmethod
    def _empty_content() -> dict:
        return {
            'definitions'  : [],
            'theorems'     : [],
            'keyFormulas'  : [],
            'workedExamples': [],
            'notes'        : '',
        }

    def _para_text(self, para) -> str:
        """Plain text of paragraph, replacing math elements with their LaTeX."""
        parts = []
        for child in para._element:
            local = etree.QName(child.tag).localname
            if local == 'r':
                # Normal text run
                for t_el in child.findall('.//{%s}t' % NS['w']):
                    parts.append(t_el.text or '')
            elif local == 'oMath':
                parts.append(self.math.omml_to_latex(child))
            elif local == 'oMathPara':
                for om in child.findall('.//{%s}oMath' % NS['m']):
                    parts.append(self.math.omml_to_latex(om))
        return ''.join(parts)

    def _extract_inline_math(self, para) -> str:
        """Return LaTeX for the first math element found, or ''."""
        for child in para._element:
            local = etree.QName(child.tag).localname
            if local == 'oMath':
                return self.math.omml_to_latex(child)
            if local == 'oMathPara':
                for om in child.findall('.//{%s}oMath' % NS['m']):
                    return self.math.omml_to_latex(om)
        return ''

    @staticmethod
    def _is_bold(para) -> bool:
        """True if every non-empty run in the paragraph is bold."""
        runs = [r for r in para.runs if r.text.strip()]
        return bool(runs) and all(r.bold for r in runs)


# ═════════════════════════════════════════════════════════════════════════════
# Utilities
# ═════════════════════════════════════════════════════════════════════════════

def _slug(text: str) -> str:
    s = re.sub(r'[^\w\s-]', '', text.lower())
    s = re.sub(r'[\s_]+', '-', s).strip('-')
    return s[:60] or 'chapter'


def _uid() -> str:
    return str(uuid.uuid4())[:8]


# ═════════════════════════════════════════════════════════════════════════════
# CLI
# ═════════════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description='Parse a ClipSAT Word document into course JSON.'
    )
    parser.add_argument('docx', help='Path to the .docx file')
    parser.add_argument('--out', '-o',  help='Output JSON path (default: {id}.json)', default=None)
    parser.add_argument('--id',         help='Course ID slug (default: derived from filename)', default=None)
    parser.add_argument('--xsl',        help='Path to OMML2MML.XSL', default=None)
    parser.add_argument('--level',      help='Academic level label', default=None)
    parser.add_argument('--pretty',     action='store_true', help='Pretty-print JSON output')
    args = parser.parse_args()

    docx_path = Path(args.docx)
    if not docx_path.exists():
        print(f"[ERROR] File not found: {docx_path}", file=sys.stderr)
        sys.exit(1)

    course_id = args.id or _slug(docx_path.stem)
    out_path  = args.out or f'{course_id}.json'

    print(f"[INFO] Parsing: {docx_path}")
    print(f"[INFO] Course ID: {course_id}")

    converter = MathConverter(xsl_path=args.xsl)
    parser_obj = DocxParser(str(docx_path), course_id, converter)
    course_data = parser_obj.parse()

    # Apply overrides
    if args.level:
        course_data['meta']['level'] = args.level

    indent = 2 if args.pretty else None
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(course_data, f, ensure_ascii=False, indent=indent)

    chapters = len(course_data.get('chapters', []))
    print(f"[OK] Wrote {chapters} chapter(s) to: {out_path}")


if __name__ == '__main__':
    main()
