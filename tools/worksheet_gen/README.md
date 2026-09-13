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

Requires: `reportlab`, `matplotlib`, `Pillow` (pip). The ClipSAT logo is read
from the repo root (`clipsat-mark.png`).

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
- `$...$` spans are rendered with matplotlib **mathtext** (a LaTeX subset).
  Supported: `\frac`, `\sqrt[n]`, `\binom`, `\sin` etc., `\langle\rangle`,
  `\overline`, `\lim_{...}`, `\left(...\right)`. **Not** supported: `\big`/
  `\Big`, `\displaystyle`, `\text{}`, `\begin{}`/`\end{}` environments (so no
  `\begin{bmatrix}` — write a matrix as a list of `\langle...\rangle` row
  vectors instead, e.g. "the matrix with rows $\langle1,2\rangle$ and
  $\langle3,4\rangle$"). `\frac`/`\dfrac`/`\sqrt` all require braced
  arguments even for a single digit/letter (`\frac{1}{2}`, `\sqrt{6}`, not
  `\frac12`/`\sqrt6`); `\mathbf`/`\hat` need braces around their argument
  too if it's more than one bare letter deep (`\hat{\mathbf{v}}`, not
  `\hat{\mathbf v}`). **`\dfrac` combined with `\partial` in the same
  $...$ span silently corrupts in the final PDF** (glyphs render as "?" —
  confirmed via direct pixel inspection that the standalone PNG is correct
  and the corruption only appears once reportlab embeds it, so this is a
  mathtext/reportlab interaction, not a content bug; root-caused instead of
  worked around, 2026-09): use plain `\frac` for any fraction containing
  `\partial` — every existing track already does this and never hit it.
  A wrong-but-plausible-looking answer key is worse than an obvious one, so
  visually spot-check rendered PDFs (not just that `generate.py` exits 0)
  before treating new worksheet content as done. **`\sqrt{X}` where `X` is a
  single tall-ascender letter alone (`b`, `d`, `f`, `h`, `k`, `l`, `t`) draws
  the vinculum detached above the letter** instead of flush over it —
  confirmed in the raw rendered PNG itself (not a reportlab interaction like
  the one above), reproducible with no other content in the span at all
  (`$\sqrt{h}$` alone is enough). Digits and non-ascender letters
  (`\sqrt{6}`, `\sqrt{x}`) are unaffected, and so is any radicand with more
  than one character (`\sqrt{h(t)}$`, `\sqrt{hx}`) — the bug needs a bare
  single ascender letter as the *entire* radicand. Work around it by
  rewriting the radicand (e.g. `h^{1/2}` instead of `\sqrt{h}` for a water
  height $h$, or naming the variable something without an ascender) rather
  than shipping the detached-bar render.
- Text OUTSIDE `$...$` spans is plain reportlab paragraph markup, not LaTeX —
  a literal backslash there is not an escape character and renders as a
  visible `\`. Don't write LaTeX's `i.e.\ `/`e.g.\ ` non-breaking-space
  convention in prose; use `i.e., `/`e.g., ` (comma) instead. This was live
  on the site (`mvc` 1.01's answer key) before being caught here, 2026-09 —
  another case the pipeline exits 0 on, only caught by rendering and reading
  the PDF.
- Never put a literal `$` (e.g. for currency) anywhere in a topic's `q`/
  `answer` text, even outside an intended math span: `rich()`'s regex
  (`\$([^$]+)\$`) pairs up ANY two `$` characters in the string, so a bare
  currency `$12` can get spliced together with an unrelated later `$` (from
  another price, or from a real `$...$` span) into one bogus "math" span,
  corrupting everything between them. Write "$12$ dollars" (digits inside a
  real math span, "dollars" as a word) instead.
- `\text{}` isn't supported (see above), but `\mathrm{}` is — use
  `\mathrm{proj}` etc. for upright text inside a math span (e.g. `\det`,
  `\sin` and friends are already upright by default; `\mathrm{}` is for
  words mathtext doesn't already special-case).
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
