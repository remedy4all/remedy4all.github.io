# agent-tooling Specification

## Purpose
How this repository is set up for coding agents: the agent kit, the project profile, the commit-attribution rule and the CI gates.
## Requirements
### Requirement: Agent kit baseline
The repository SHALL carry the AI Coding Infrastructure kit at version `0.3.0`, installed by the
kit's own installer, in a single agent tree `.claude/`, with no `.opencode/`, `.pi/` or similar copy.

#### Scenario: Version recorded
- **WHEN** `.claude/VERSION` is read
- **THEN** it reads `0.3.0`

#### Scenario: One agent tree
- **WHEN** the repository root is listed
- **THEN** `.claude/` is the only agent configuration tree

### Requirement: Project profile
`.claude/project.md` SHALL hold the project's architecture, conventions, glossary, toolchain
commands for every part of the stack, and a *Security expectations* section, and `CLAUDE.md` SHALL
point every session at it.

#### Scenario: Fresh session knows the gates
- **WHEN** a new session starts in the repository and reads `CLAUDE.md`
- **THEN** it is directed to `.claude/project.md`, which states the test command and the security expectations

### Requirement: No AI attribution in commits
A `PreToolUse` hook on `Bash|PowerShell` SHALL refuse a `git commit` whose message carries AI
attribution, and `CLAUDE.md` SHALL state the rule.

#### Scenario: Attribution trailer refused
- **WHEN** an agent runs `git commit` with a message containing `Co-Authored-By: Claude ...`
- **THEN** the hook blocks the call and explains why

#### Scenario: Ordinary message allowed
- **WHEN** an agent runs `git commit` with a message that mentions `CLAUDE.md` but carries no attribution
- **THEN** the hook allows the call

### Requirement: Continuous integration gates
A CI workflow SHALL run the gates listed in `.claude/project.md` on push and on pull requests.

#### Scenario: Push runs the gates
- **WHEN** a commit is pushed or a pull request is opened
- **THEN** the workflow runs the type check, the tests and the build

