## 1. Kit
- [x] 1.1 Clone the kit at tag `v0.3.0` and run `uv run --script install.py --check <repo>`
- [x] 1.2 Run the installer without `--check`; confirm `.claude/VERSION` reads `0.3.0`
- [x] 1.3 Run `/adapt` (deterministic pass, then the project notes) and write `.claude/project.md` including *Security expectations*

## 2. Session guidance
- [x] 2.1 Point `CLAUDE.md` at `.claude/project.md` and state the no-AI-attribution rule
- [x] 2.2 Fill `openspec/project.md` with the same essentials (or point it at `.claude/project.md`)

## 3. Attribution hook
- [x] 3.1 Write `.claude/hooks/block-ai-attribution.py`
- [x] 3.2 Wire it as a `PreToolUse` hook on `Bash|PowerShell` in `.claude/settings.json`
- [x] 3.3 Test it: blocked trailer, blocked generator line, `-F` file, allowed `CLAUDE.md` mention, non-commit command

## 4. CI and repository hygiene
- [x] 4.1 Add `.github/workflows/ci.yml` running check, test, build (and a non-blocking `npm audit`) on push and pull requests
- [x] 4.2 Add `.gitignore` (reports runtime, settings.local.json, node_modules, dist, .astro)
- [x] 4.3 Confirm one agent tree only

## 5. Close
- [x] 5.1 Validate the change strictly, archive it, commit
