# Simulation Recommender Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `simulation-recommender` skill that gives conservative simulation-route recommendations only after mechanism and model choices are sufficiently constrained.

**Architecture:** Keep the implementation as one standalone skill file plus one integration contract test. The skill should sit downstream of the other four skills and own only recommendation gating, paradigm selection, engine class suggestions, and fidelity/cost framing.

**Tech Stack:** Markdown, Node.js built-in test runner, git

---

### Task 1: Add A Contract Test For Simulation Recommendation

**Files:**
- Create: `tests/integration/simulation-recommender-skill.test.mjs`
- Test: `tests/integration/simulation-recommender-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/simulation-recommender/SKILL.md",
  import.meta.url
);

test("simulation-recommender skill exists and encodes conservative recommendation gating", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: simulation-recommender",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Output Protocol",
    "## Quick Reference",
    "## Common Mistakes",
    "Recommended Paradigm",
    "Recommended Engine",
    "Fidelity / Cost Tradeoff",
    "Explicit Solvent / Ion Note",
    "Pause recommendation",
    "degeneracy",
    "conservative"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL because `docs/superpowers/skills/simulation-recommender/SKILL.md` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `tests/integration/simulation-recommender-skill.test.mjs` with the code above.

- [ ] **Step 4: Run test to verify it fails for the right reason**

Run: `npm run test:integration`
Expected: FAIL only because the new skill file is missing or incomplete.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/simulation-recommender-skill.test.mjs
git commit -m "test: add simulation recommender contract"
```

### Task 2: Implement The Simulation Recommender Skill

**Files:**
- Create: `docs/superpowers/skills/simulation-recommender/SKILL.md`
- Modify: `README.md`
- Test: `tests/integration/simulation-recommender-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the red state from Task 1. Do not write the skill until the new integration test is failing.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL in `tests/integration/simulation-recommender-skill.test.mjs`.

- [ ] **Step 3: Write minimal implementation**

Create `docs/superpowers/skills/simulation-recommender/SKILL.md` with:

```md
---
name: simulation-recommender
description: Use when a chromosome model is already defined well enough to choose a conservative simulation route without overcommitting under degeneracy.
---

# Simulation Recommender

## Overview
[Explain conservative recommendation and gating.]

## When to Use
[List readiness criteria.]

## Workflow
1. [Check degeneracy gate.]
2. [Choose Recommended Paradigm.]
3. [Choose Recommended Engine.]
4. [State Fidelity / Cost Tradeoff.]
5. [State Explicit Solvent / Ion Note.]

## Output Protocol
### Readiness Gate
### Recommended Paradigm
### Recommended Engine
### Fidelity / Cost Tradeoff
### Explicit Solvent / Ion Note
### Do Not Recommend Yet

## Quick Reference
[Table for pause conditions and conservative routing.]

## Common Mistakes
[List premature recommendation and hidden cost failures.]
```

Update `README.md` to mention this fifth skill in one sentence.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:integration`
Expected: PASS for the new test and all existing integration tests.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/superpowers/skills/simulation-recommender/SKILL.md tests/integration/simulation-recommender-skill.test.mjs
git commit -m "feat: add simulation recommender skill"
```
