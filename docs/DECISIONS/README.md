# docs/DECISIONS/

One short ADR per significant architecture decision made during the re-engineering effort — context,
decision, consequences. Numbered in the order they were made; read them in order to follow how the target
content system's design actually evolved (it changed shape twice, each time on real evidence from
converting real content, not up front).

| # | Decision |
|---|---|
| 0001 | Guard the `index.html`/`baseNjk` header-footer duplication with a build-time check, don't remove either copy yet |
| 0002 | Replace the fixed-field content schema with an ordered `blocks[]` model |
| 0003 | Model interactive explorers as an in-flow `explorer` block, as an exact shell not a generic type |
| 0004 | Wire migrated content into the existing language toggle via dual-DOM, not dictionary injection |
| 0005 | Cut `/qudrat/` over to render from `content/`, keep the legacy source as a rollback path |

Add the next one as `000N-short-slug.md` — don't renumber existing ones.
