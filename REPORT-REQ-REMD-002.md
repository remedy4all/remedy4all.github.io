---
request: REQ-REMD-002
outcome: complete
version: none cut. At this commit the repository had no release mechanism (no package.json, tag or CHANGELOG). Versioning starts with REQ-REMD-001 at 0.1.0.
commit: 32653a5
spec_change: add-agent-kit-baseline (archived as openspec/changes/archive/2026-10-29-add-agent-kit-baseline, capability agent-tooling)
requirements: {1: done, 2: done, 3: done, 4: done, 5: done, 6: done, 7: done, 8: done}
tests: |
  uv run --script .claude/hooks/test_block_ai_attribution.py, 10/10 passed (blocked trailer in -m,
  heredoc generator line, PowerShell here-string, -F message file, tag message, git -C form;
  allowed a CLAUDE.md mention, a clean -F file, a human co-author, and a non-commit command).
  A live probe in this session (git commit --dry-run with a Claude Co-Authored-By trailer) was
  refused by the hook through Claude Code.
  validate_frontmatter.py reports all agent and command frontmatter valid.
  openspec validate add-agent-kit-baseline --strict passed before archive; openspec validate
  --specs --strict passed after (1 spec).
  ci.yml parses as YAML. It has not run because nothing is pushed. Its job is skipped until
  package-lock.json exists, so there were no npm gates to run at this commit.
closed_out:
  spec_change: archived
  release: no release mechanism here at this commit; the first release is cut by REQ-REMD-001
  tech_debt: register created by the kit (.claude/reports/_tech-debt.md, tracked in git); added TD-001 (the hook entry lives in a kit core file that install.py overwrites) and TD-002 (openspec update regenerates command frontmatter the kit linter rejects)
  docs: CLAUDE.md, AGENTS.md, .claude/project.md and openspec/project.md written; no README yet (REQ-REMD-001 adds it)
  review: none requested
deviations: |
  - Order. openspec init ran before the proposal, because a change cannot be written into a
    repository with no openspec/ directory. Everything else followed analyse, proposal, apply,
    archive.
  - OpenSpec commands. /openspec:proposal, /openspec:apply and /openspec:archive were installed by
    openspec init during this session and only load when a session starts, so they could not be
    invoked. Their files were opened and their guardrails and steps followed by hand, using the
    openspec CLI (validate --strict, archive --yes). The proposal's approval gate counts as met
    because the request itself was agreed.
  - Kit source. The local clone at D:\code\python\ai-coding stops at v0.2.2. Rather than fetch
    into it, the kit was cloned fresh at tag v0.3.0 into a scratch directory and the installer
    was run from there, --check first and then for real.
  - Kit core file touched. The PreToolUse hook entry had to go in .claude/settings.json, a kit
    core file, because the kit offers no project-owned settings file that is committed. No other
    core file was changed. Logged as TD-001.
  - OpenSpec command frontmatter. OpenSpec 0.16.0 writes "name: OpenSpec: Apply" unquoted, which
    is invalid YAML, plus name, category and tags keys that the kit's linter rejects. The
    frontmatter of the three commands was cut down to description; the OpenSpec-managed body is
    unchanged. Logged as TD-002.
  - Security tooling decision (the request's open question). Review tooling is the kit's
    security-engineer agent and /agents:security, enabled by the install. project.md's Security
    expectations section tells it what to check here: personal data, invented facts, third-party
    requests, placeholder contacts, CI privilege, secrets and dependencies. In CI, npm audit
    reports but does not block. The site ships static HTML with no dependency code reaching
    visitors, and a build-time advisory should not stop a content fix going out. The blocking
    content gates arrive with the site tests in REQ-REMD-001.
  - Hook mode decision. The attribution hook blocks (exit 2) rather than warns, because the rule
    is absolute and a commit is awkward to rewrite once made. It also covers git tag, since the
    rule covers tag messages.
  - Lint. A lint gate is listed, but there is no separate linter. astro check (npm run check)
    serves as lint and type check, so as not to add dependencies to a site that is meant to have
    as few as possible.
  - Added .gitattributes (LF line endings) so the Linux CI and Windows checkouts agree.
incidental_fixes: |
  - none (the OpenSpec frontmatter correction is to files created in this change, so it is part of the change commit and listed under deviations)
follow_ups: |
  - Kit, upstream. Give projects a committed place for their own hooks, or have install.py merge rather than overwrite .claude/settings.json, so the attribution hook survives kit updates (TD-001).
  - Kit, upstream. Make validate_frontmatter.py accept or skip OpenSpec-generated command frontmatter (name, category, tags), or have the installer normalise it, so openspec update does not reintroduce lint errors (TD-002).
---

# REQ-REMD-002 completion report

The agent kit v0.3.0 is installed and adapted. `.claude/project.md` states the toolchain commands
and the security expectations, and `CLAUDE.md` sends every session to it. The attribution hook is
live and tested, CI is in place but dormant until the site lands, and OpenSpec is initialised with
this change archived as the first spec, `agent-tooling`.
