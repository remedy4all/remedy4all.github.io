# Change: Install the agent kit baseline (REQ-REMD-002)

## Why
The repository is new and empty and has no agent kit. Every application repository is brought to
the same baseline (his instruction 2026-09-30) so that any coding session started here knows the
project's toolchain, conventions and security expectations without being told.

## What Changes
- Install AI Coding Infrastructure `v0.3.0` with the kit's own installer (`--check` first), so
  `.claude/VERSION` reads `0.3.0`.
- Run `/adapt` and write real project notes in `.claude/project.md`: architecture, conventions,
  glossary, toolchain commands, and a *Security expectations* section.
- Point `CLAUDE.md` at `.claude/project.md` and state the no-AI-attribution rule there.
- Add a handwritten `PreToolUse` hook, `.claude/hooks/block-ai-attribution.py`, wired on
  `Bash|PowerShell`, that refuses a `git commit` whose message carries AI attribution.
- Add a CI workflow that runs the gates `project.md` lists (type check, tests, build) on push and
  on pull requests. The site does not exist yet (REQ-REMD-001 builds it), so the job is skipped
  until `package-lock.json` exists.
- Keep one agent tree, `.claude/`. OpenSpec is initialised for Claude only.

## Impact
- Affected specs: `agent-tooling` (new capability)
- Affected code: `.claude/`, `CLAUDE.md`, `AGENTS.md`, `openspec/`, `.github/workflows/ci.yml`
- No application code.
