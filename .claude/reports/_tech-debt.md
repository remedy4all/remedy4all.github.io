# Tech Debt Registry

**Last Updated:** 2026-10-29

> **Purpose:** Track deferred improvements and known issues to address later.
> Add an entry whenever work is knowingly deferred, a shortcut is taken, or an
> incident reveals a gap. Check here before starting related work.

---

## Open

| ID | Area | Description | Severity | Logged | Source |
|--------|------|-------------|----------|--------|--------|
| TD-001 | agent-kit | The `PreToolUse` attribution hook is registered in `.claude/settings.json`, a kit core file that `install.py` overwrites on update. Re-add the hook entry after any kit update until the kit preserves project hooks | Medium | 2026-10-29 | REQ-REMD-002 |
| TD-002 | agent-kit | `openspec update` regenerates `.claude/commands/openspec/*.md` with frontmatter keys (`name`, `category`, `tags`) the kit's linter rejects, and an unquoted `name` that is invalid YAML. Trimmed to `description` by hand; redo after any `openspec update` | Low | 2026-10-29 | REQ-REMD-002 |
<!-- TD-001 | auth | Example: token refresh not covered by tests | Medium | YYYY-MM-DD | review-... |

---

## Resolved

| ID | Area | Description | Resolved | Resolution |
|--------|------|-------------|----------|------------|
<!-- TD-000 | ... | ... | YYYY-MM-DD | Fixed in ... -->

---

## Legend

**Severity:**
- **Critical** - Actively causing bugs or blocking work
- **High** - Likely to cause problems soon
- **Medium** - Should fix, not urgent
- **Low** - Nice to have

**ID format:** `TD-NNN` (zero-padded, sequential). Never reuse IDs.
