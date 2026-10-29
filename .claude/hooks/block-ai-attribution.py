#!/usr/bin/env python3
# /// script
# requires-python = ">=3.12"
# dependencies = []
# ///
"""PreToolUse hook: refuse a git commit or tag whose message carries AI attribution.

Project rule (his standing instruction, 2026-09-28): no `Co-Authored-By` trailer
naming an AI, no model name and no "generated with" line in any commit or tag
message. The commit is his.

Wired in .claude/settings.json as a PreToolUse hook on Bash|PowerShell. Reads the
hook payload from stdin; exits 2 with the reason on stderr to block the call, so
the agent sees why and rewrites the message. Exits 0 otherwise.

The whole command text is scanned, which covers -m, heredocs and PowerShell
here-strings alike; a file given with -F/--file is read as well. Patterns match
attribution, not the bare word "Claude", so a message about CLAUDE.md passes.
"""

import json
import re
import shlex
import sys
from pathlib import Path

GIT_MESSAGE_CMD = re.compile(r"\bgit\b(?:\s+-[cC]\s+\S+)*\s+(?:commit|tag)\b")

AI = r"(?:claude|anthropic|openai|chatgpt|gpt-?\d|copilot|gemini|codex|cursor|windsurf|codeium|\bai\b|llm)"
PATTERNS = [
    re.compile(rf"co-authored-by:[^\n]*{AI}", re.I),
    re.compile(r"noreply@anthropic\.com", re.I),
    re.compile(rf"generated\s+(?:with|by|using)\b[^\n]*{AI}", re.I),
    re.compile(r"claude\.(?:com|ai)/(?:claude-)?code", re.I),
    re.compile(r"\bclaude[ -](?:opus|sonnet|haiku|fable|code)\b", re.I),
    re.compile("\U0001F916"),  # robot face, the usual "generated with" marker
]


def message_files(command: str) -> list[Path]:
    """Paths passed to -F/--file, where the message is not in the command text."""
    try:
        tokens = shlex.split(command, posix=True)
    except ValueError:
        tokens = command.split()
    paths = []
    for i, tok in enumerate(tokens):
        if tok in ("-F", "--file") and i + 1 < len(tokens):
            paths.append(tokens[i + 1])
        elif tok.startswith("--file="):
            paths.append(tok.split("=", 1)[1])
        elif tok.startswith("-F") and len(tok) > 2:
            paths.append(tok[2:])
    return [Path(p) for p in paths if p != "-"]


def find_attribution(text: str) -> str | None:
    for pattern in PATTERNS:
        match = pattern.search(text)
        if match:
            return match.group(0)
    return None


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0
    command = (payload.get("tool_input") or {}).get("command") or ""
    if not GIT_MESSAGE_CMD.search(command):
        return 0

    texts = [command]
    for path in message_files(command):
        try:
            texts.append(path.read_text(encoding="utf-8", errors="replace"))
        except OSError:
            pass

    for text in texts:
        hit = find_attribution(text)
        if hit:
            print(
                f"Blocked: the commit/tag message carries AI attribution ({hit!r}). "
                "Project rule: no Co-Authored-By naming an AI, no model name, no "
                "'generated with' line. Remove it and commit again.",
                file=sys.stderr,
            )
            return 2
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    raise SystemExit(main())
