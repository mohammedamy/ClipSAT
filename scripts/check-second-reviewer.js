#!/usr/bin/env node
/**
 * check-second-reviewer.js — ADR docs/DECISIONS/0025-second-reviewer-process.md
 *
 * Process gate, not a content-quality checker: if a PR's diff touches tracked pedagogical content
 * (content/** or bank-data/**), require the PR body to name a reviewer other than the PR's own author.
 * Does NOT verify the review was thorough, or that the content is correct — see the ADR for why that's a
 * deliberately separate, unbuilt problem.
 *
 * Reads from env (set by .github/workflows/pr-checks.yml):
 *   PR_BODY    — the pull request description
 *   PR_AUTHOR  — the PR author's GitHub login
 *   BASE_SHA   — base commit of the PR (diff target)
 *   HEAD_SHA   — head commit of the PR
 *
 * Exit 0 = gate passed or not applicable (no content-path changes). Exit 1 = gate failed.
 */
'use strict';
const { execFileSync } = require('child_process');

const CONTENT_PATH_PREFIXES = ['content/', 'bank-data/'];

function changedFiles(baseSha, headSha) {
  if (!baseSha || !headSha) {
    console.log('⚠️  BASE_SHA/HEAD_SHA not set — skipping (not running under the PR workflow?).');
    return null;
  }
  try {
    const out = execFileSync('git', ['diff', '--name-only', `${baseSha}...${headSha}`], {
      encoding: 'utf8',
    });
    return out.split('\n').map((l) => l.trim()).filter(Boolean);
  } catch (e) {
    console.error(`❌ could not diff ${baseSha}...${headSha}: ${e.message}`);
    process.exit(1);
  }
}

function touchesContent(files) {
  return files.some((f) => CONTENT_PATH_PREFIXES.some((p) => f.startsWith(p)));
}

function findReviewer(body) {
  if (!body) return null;
  // Tolerate the label being wrapped in markdown emphasis (**Reviewed-by:** Gemini) — GitHub's
  // own PR description editor bolds a field label like this by default, and a real PR (#181)
  // hit exactly this: the line was present, correctly worded, correctly placed, and the gate
  // still reported it missing because the leading "**" kept the anchored "^Reviewed-by:" from
  // matching at all. [*_]* on both sides of the label eats any wrapping bold/italic markers
  // without caring whether they're actually paired.
  const m = body.match(/^\s*[*_]*\s*Reviewed-by:\s*[*_]*\s*(.+?)\s*$/im);
  if (!m) return null;
  // Strip any leftover wrapping emphasis markers from the captured name too (e.g. if the name
  // itself was bolded: "**Reviewed-by:** **Gemini**").
  let name = m[1].replace(/^[*_]+|[*_]+$/g, '').trim();
  if (!name) return null;
  // The template's own unfilled placeholder is an HTML comment ("**Reviewed-by:** <!-- name/handle
  // ... -->"), which the regex above happily captures as if it were a real name — GitHub's raw PR
  // body text includes HTML comments verbatim, they're only hidden in rendered markdown. Strip
  // anything from the first "<!--" onward and re-trim, so a completely untouched template line
  // still counts as unfilled.
  const commentIdx = name.indexOf('<!--');
  if (commentIdx !== -1) name = name.slice(0, commentIdx).trim();
  if (!name) return null;
  // A real PR (#185) hit a second, different gap: the author left an explanatory placeholder —
  // "_(needed before merge — an independent review pass is planned as a follow-up)_" — instead of
  // a name. After the emphasis strip above that reads as "(needed before merge — ...)", a non-empty
  // string with no author-name match, so the gate passed a PR its own author had explicitly not
  // reviewed yet. Real names/handles are never written wrapped entirely in parentheses, so treat a
  // value that's nothing but a parenthetical as an unfilled placeholder too.
  if (/^\(.*\)$/.test(name)) return null;
  return name || null;
}

function normalize(name) {
  return name.replace(/^@/, '').trim().toLowerCase();
}

function main() {
  const { PR_BODY, PR_AUTHOR, BASE_SHA, HEAD_SHA } = process.env;

  const files = changedFiles(BASE_SHA, HEAD_SHA);
  if (files === null) return; // can't determine — don't block, just skip

  const relevant = files.filter((f) => CONTENT_PATH_PREFIXES.some((p) => f.startsWith(p)));
  if (!touchesContent(files)) {
    console.log('✅ No content/** or bank-data/** changes in this PR — second-reviewer gate not applicable.');
    return;
  }

  console.log(`This PR touches ${relevant.length} content/bank-data file(s):`);
  relevant.forEach((f) => console.log(`  - ${f}`));

  const reviewer = findReviewer(PR_BODY);
  if (!reviewer) {
    console.error(
      '\n❌ This PR changes tracked content or question banks but has no "Reviewed-by: <name>" line in ' +
        'its description. Add one naming whoever gave this content a second look, before merging.\n' +
        'See docs/DECISIONS/0025-second-reviewer-process.md.'
    );
    process.exit(1);
  }

  if (PR_AUTHOR && normalize(reviewer) === normalize(PR_AUTHOR)) {
    console.error(
      `\n❌ "Reviewed-by: ${reviewer}" names the PR's own author (${PR_AUTHOR}). The reviewer must be ` +
        'someone other than whoever authored the change.\n' +
        'See docs/DECISIONS/0025-second-reviewer-process.md.'
    );
    process.exit(1);
  }

  console.log(`\n✅ Second-reviewer gate satisfied — reviewed by "${reviewer}".`);
}

main();
