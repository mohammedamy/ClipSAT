#!/usr/bin/env python3
"""
sweep-hex-to-tokens.py — ClipSAT WP2 (docs/PHASE1-2_TARGET_ARCHITECTURE.md, Phase 1 principle #5)

Finds hardcoded hex color literals inside index.html's two source <style> blocks (the ones
build.js extracts into public/css/main.css — see build.js's cssMatch / gamifyCssMatch) that
exactly duplicate an existing CSS custom-property token's LIGHT-mode value, and replaces those
usages with var(--token-name).

Deliberately conservative, by design:
  - Only touches usages OUTSIDE the :root{...} / body.dark{...} token-definition blocks
    themselves (never rewrites a token's own declaration).
  - Only replaces a hex literal when exactly ONE token has that light-mode value (skips and
    reports ambiguous matches where two tokens share a value — a human should pick the
    semantically-right one, not a script).
  - Does not invent new tokens for un-tokenized values. That is a separate, judgment-heavy
    follow-up (see docs/INVENTORY.md §3), not automated here.
  - Because dark-mode overrides work by redefining the SAME custom-property names inside
    body.dark{...} (confirmed by inspecting public/css/main.css — every token appears twice,
    once per mode), replacing a hardcoded light-value hex with var(--token) automatically
    makes that rule dark-mode-aware for free — no separate dark-scoped rule needs touching.
    This is the same fix pattern as the prior dark-mode-contrast-sweep PRs, applied
    systematically instead of by manual hunting.

Usage:
    python3 scripts/sweep-hex-to-tokens.py           # report only, no changes
    python3 scripts/sweep-hex-to-tokens.py --apply    # writes index.html in place
"""
import re
import sys

ROOT_INDEX = "index.html"
HEX_RE = re.compile(r"#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b")
TOKEN_DECL_RE = re.compile(r"--([a-zA-Z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,6})\b")


def find_style_blocks(html):
    """Return [(start, end, text), ...] for the two blocks build.js extracts into main.css:
    the first bare <style> tag, and <style id="cs-gamify-styles">."""
    blocks = []
    m = re.search(r"<style>([\s\S]*?)</style>", html)
    if not m:
        raise SystemExit("Could not find bare <style> block — aborting, do not guess.")
    blocks.append((m.start(1), m.end(1), m.group(1)))
    m2 = re.search(r'<style id="cs-gamify-styles">([\s\S]*?)</style>', html)
    if not m2:
        raise SystemExit("Could not find #cs-gamify-styles block — aborting, do not guess.")
    blocks.append((m2.start(1), m2.end(1), m2.group(1)))
    return blocks


def extract_light_tokens(css_text):
    """Build {hex_lower: token_name} for the FIRST (light-mode, :root-scoped) declaration of
    each custom property. Assumes light declarations precede dark overrides in source order,
    matching the file's observed structure (:root block first, body.dark overrides later)."""
    seen = {}
    hex_to_tokens = {}
    for m in TOKEN_DECL_RE.finditer(css_text):
        name, hex_val = m.group(1), m.group(2).lower()
        if name not in seen:  # first occurrence = light/root value
            seen[name] = hex_val
            hex_to_tokens.setdefault(hex_val, set()).add(name)
    return seen, hex_to_tokens


def mask_token_declarations(css_text):
    """Return css_text with every `--name: #hex;` declaration's hex blanked out (kept same
    length, using 'X' placeholders) so the usage-scan pass never touches a definition."""
    def blank(m):
        return m.group(0).replace(m.group(2), "X" * len(m.group(2)))
    return TOKEN_DECL_RE.sub(blank, css_text)


def main():
    apply = "--apply" in sys.argv
    html = open(ROOT_INDEX, encoding="utf-8").read()
    blocks = find_style_blocks(html)

    # Build the token map from BOTH blocks combined (either could declare tokens).
    light_map = {}
    hex_to_tokens_all = {}
    for _, _, text in blocks:
        _, h2t = extract_light_tokens(text)
        for hexv, names in h2t.items():
            hex_to_tokens_all.setdefault(hexv, set()).update(names)
    for hexv, names in hex_to_tokens_all.items():
        if len(names) == 1:
            light_map[hexv] = next(iter(names))

    total_usages = 0
    total_replaced = 0
    total_ambiguous_skipped = 0
    total_no_token_skipped = 0
    replacements_by_token = {}
    ambiguous_report = {}

    # Process blocks in reverse offset order so earlier replacements don't shift later offsets.
    new_html = html
    for start, end, text in sorted(blocks, key=lambda b: -b[0]):
        masked = mask_token_declarations(text)
        out = []
        pos = 0
        for m in HEX_RE.finditer(masked):
            hexv = m.group(0).lower()
            out.append(text[pos:m.start()])
            if hexv in hex_to_tokens_all:
                total_usages += 1
                if hexv in light_map:
                    token = light_map[hexv]
                    out.append(f"var(--{token})")
                    replacements_by_token[token] = replacements_by_token.get(token, 0) + 1
                    total_replaced += 1
                else:
                    total_ambiguous_skipped += 1
                    ambiguous_report[hexv] = sorted(hex_to_tokens_all[hexv])
                    out.append(text[m.start():m.end()])
            else:
                total_no_token_skipped += 1
                out.append(text[m.start():m.end()])
            pos = m.end()
        out.append(text[pos:])
        new_block = "".join(out)
        if apply:
            new_html = new_html[:start] + new_block + new_html[end:]

    print(f"Tokens with an unambiguous light-mode hex value: {len(light_map)}")
    print(f"Hex usages found matching a known token value: {total_usages}")
    print(f"  → replaced with var(--token):  {total_replaced}")
    print(f"  → skipped (ambiguous, 2+ tokens share this value): {total_ambiguous_skipped}")
    print(f"Hex usages found with NO matching token (left as-is, not in scope): {total_no_token_skipped}")
    print()
    print("Replacements by token:")
    for token, n in sorted(replacements_by_token.items(), key=lambda kv: -kv[1]):
        print(f"  --{token}: {n}")
    if ambiguous_report:
        print()
        print("Skipped as ambiguous (needs a human to pick the right token — not auto-fixed):")
        for hexv, names in ambiguous_report.items():
            print(f"  {hexv}: {', '.join('--' + n for n in names)}")

    if apply:
        open(ROOT_INDEX, "w", encoding="utf-8").write(new_html)
        print("\nindex.html written. Now run: node build.js && npx @11ty/eleventy")
    else:
        print("\nDry run only — re-run with --apply to write index.html.")


if __name__ == "__main__":
    main()
