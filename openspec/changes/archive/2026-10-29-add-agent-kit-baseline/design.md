## Context
Empty repository, Windows workstation, kit `v0.3.0`. The kit's installer copies a generic core
under `.claude/` and never overwrites `project.md`, `reports/` or `settings.local.json`.

## Decisions
- **OpenSpec initialised before the proposal.** A change cannot be written into a repository with
  no `openspec/`, so `openspec init --tools claude` runs first. That is the only step taken before
  this plan.
- **Attribution hook blocks, not warns.** The rule is absolute (his standing instruction
  2026-09-28) and a commit, once made, is awkward to rewrite. The hook exits 2 with the reason, so
  the agent sees why and rewrites the message. It reads the message from `-m`/`--message` and from
  `-F`/`--file`. It matches attribution trailers and generator lines, not the bare word "Claude",
  so a message that mentions `CLAUDE.md` is allowed.
- **Hook runs through `uv run --script`**, like the kit's own `SessionStart` hook, so it needs no
  Python on `PATH` beyond what the kit already requires.
- **Security tooling.** The kit's `security-engineer` agent and `/agents:security` command (L3 of
  `/review-full`) are the review tooling. They are on by default once the kit is installed, and
  `project.md` names what they must check for in this application. The real risks for this site
  are what it publishes, not a server: personal data, invented facts and third-party requests. So
  the blocking gate in CI is the site's own output tests (added by REQ-REMD-001). `npm audit` is
  reported in CI but does not block, because the deployed output is static HTML with no
  dependency code shipped to visitors, and a build-time advisory must not stop a content fix
  going out.
- **The hook entry lives in `.claude/settings.json`**, which is a kit core file and would be
  overwritten by a future `install.py` run. The kit has no project-owned settings file other than
  `settings.local.json`, which is personal and not committed. Recorded as a follow-up for the kit.

## Risks / Trade-offs
- CI job skipped until the site lands → removed in REQ-REMD-001 once `package-lock.json` exists.
