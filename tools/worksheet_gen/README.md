# ClipSAT Worksheet Generator

Turns JSON topic files into branded worksheet + answer-key PDF pairs that match
the site's worksheet-library look (indigo question numbers, sectioned layout,
ClipSAT logo header, `© ClipSAT: By Mr. Mohamed Abdallah +966597688647` footer).

## Usage

```bash
# Generate one track's topics straight into the site's downloads folder
python3 generate.py topics/precalc/*.json --out ../../public/downloads --manifest
```

- `--out DIR` — output root; PDFs land in `DIR/<track>/`.
- `--manifest` — writes/merges `DIR/<track>/manifest.json` in the exact schema
  the site's worksheet-library UI consumes (`unit`, `num`, `title`, `sub`,
  `worksheet`, `answerkey`).

Requires: `reportlab`, `matplotlib`, `Pillow` (pip), plus a system LaTeX
installation for math rendering (see below) — on Debian/Ubuntu:
`apt-get install texlive-latex-base texlive-latex-extra
texlive-fonts-recommended dvipng cm-super`. The ClipSAT logo is read from
the repo root (`clipsat-mark.png`).

## Topic JSON format

One file per topic, named `<num>-<slug>.json`:

```json
{
  "track": "precalc",
  "num": "1.01",
  "title": "Functions and Function Notation",
  "sub": null,
  "sections": [
    {
      "heading": "Function notation",
      "questions": [
        {
          "q": "Consider $f(x) = 2x^2 - 5x + 3$. Evaluate:",
          "parts": ["$f(0)$", "$f(2)$"],
          "cols": 4,
          "answers": ["$= 3$", "$= 1$"]
        },
        {
          "q": "A question without parts.",
          "answer": "Its answer (shown only on the answer key).",
          "figure": {
            "type": "plot",
            "fns": ["x**2 - 2"],
            "xmin": -4, "xmax": 4, "ymin": -4, "ymax": 6,
            "width": 220
          }
        }
      ]
    }
  ]
}
```

Notes:

- **Real multiple choice**: give a question `"choices": [4 strings]` and
  `"correct": <0-indexed int>` instead of (or alongside) `"answer"`. Renders
  as a lettered A/B/C/D list (أ/ب/ج/د for `lang:"ar"`, same convention as
  lettered `parts`) — no visual hint on the worksheet; the answer key bolds
  the correct choice in green with a checkmark. `"answer"` on a
  `choices`-question becomes the worked-explanation text shown under the
  highlighted choice in the answer key (optional but recommended — a bare
  correct-letter mark with no reasoning is a weak answer key).
- `$...$` spans are rendered with **real LaTeX** (matplotlib's `usetex` mode,
  via a system `latex`+`dvipng`, scoped to just math rendering — see the
  comment above `render_math()` in `generate.py`), not matplotlib's built-in
  "mathtext" subset. This means standard LaTeX — `amsmath`/`amssymb` are
  loaded — is fair game inside a `$...$` span, including
  `\begin{bmatrix}...\end{bmatrix}` / `\begin{vmatrix}...\end{vmatrix}` /
  `\begin{array}{ccc|c}...\end{array}` for real matrices, determinants, and
  augmented-matrix layouts (**write them this way — never as a list of
  `\langle...\rangle` row vectors**, which was an earlier workaround this
  renderer switch made unnecessary), plus `\big`/`\Big`, `\displaystyle`,
  and `\text{}`. `\frac`/`\dfrac`/`\sqrt` still read more cleanly braced
  (`\frac{1}{2}`, not `\frac12`) but no longer strictly require it, and the
  `\dfrac`+`\partial` corruption that mathtext had is gone under real LaTeX
  (confirmed directly — kept working around it in already-shipped content
  purely because reverting it had no upside, not because it's still needed).
  A LaTeX compile error in a topic (stray `$`, unescaped `%`/`_`/`#` outside
  math, a typo'd command) fails `generate.py` loudly with the offending
  `.tex` source and log — that's the signal to fix the JSON, not a bug in
  the renderer. A wrong-but-plausible-looking answer key is worse than an
  obvious one, so visually spot-check rendered PDFs (not just that
  `generate.py` exits 0) before treating new worksheet content as done.
- `figure.fns` are Python/numpy expressions in `x` (`sin`, `cos`, `sqrt`,
  `exp`, `log`, `abs`, `pi`, `e` available). Values far outside the y-window
  are masked, so vertical-asymptote jumps render as gaps.
- `cols` lays parts out in n columns; answer keys append each part's answer
  inline after the part text.
- The worksheet omits `answer`/`answers`; the answer key includes them and
  hides figures.

## Unit numbering convention

Units mirror the track's site chapters (e.g. Pre-Calculus: Unit 2 =
Trigonometry ... Unit 9 = Sequences & Series), with Unit 1 reserved for a
foundations unit where useful. The library UI groups rows by `unit`.

## Integration checklist for a new track

1. Author `topics/<track>/*.json`.
2. `python3 generate.py topics/<track>/*.json --out ../../public/downloads --manifest`
3. Add the container to that track's Downloads chapter in `index.html`:
   `<div class="worksheet-library" data-track="<track>">...</div>`
   (copy the exact pattern from another track, including the `<h3>` heading).
4. `node build.js && npx eleventy`, verify in the browser preview, update
   `changelog.html`, commit `public/downloads/<track>/`, `tools/worksheet_gen/`,
   `index.html`, `changelog.html`, and push.
