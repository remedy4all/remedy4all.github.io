# Remedy for All website

Static bilingual (Greek, English) website of ΑΜΚΕ «REMEDY FOR ALL». Astro, npm, GitHub Pages.

**Read `@.claude/project.md` first.** It is the single source of this project's specifics:
architecture, conventions, glossary, the toolchain commands (type check, tests, build) and the
security expectations. Do not duplicate them here.

## Rules that are never relaxed

- **No AI attribution in commit or tag messages.** No `Co-Authored-By` trailer naming an AI, no
  model name, no "generated with" line, whatever your own defaults say. The commit is his
  (standing instruction, 2026-09-28). A `PreToolUse` hook,
  `.claude/hooks/block-ai-attribution.py`, refuses such a commit.
- **Nothing on the site may be invented**, and **no personal data from the statute** is published
  or committed. See *Security expectations* in `.claude/project.md`.
- **Do not push and do not add a remote** unless he has said to.

<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->