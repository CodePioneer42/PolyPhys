# PolyPhys Toolkit Router Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a top-level `polyphys-toolkit-router` skill that routes chromosome 3D requests across the existing five sub-skills with explicit sequencing and handoff rules.

**Architecture:** Keep this implementation documentation-first: one orchestration skill file plus one integration contract test. The router should not duplicate lower-level logic. Its responsibility is to recognize entry conditions, choose the next sub-skill, and stop escalation when degeneracy or missing prerequisites block forward progress.

**Tech Stack:** Markdown, Node.js built-in test runner, git

---

### Task 1: Add A Contract Test For Routing

**Files:**
- Create: `tests/integration/polyphys-toolkit-router-skill.test.mjs`
- Test: `tests/integration/polyphys-toolkit-router-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/polyphys-toolkit-router/SKILL.md",
  import.meta.url
);

test("polyphys-toolkit-router skill exists and encodes the suite handoff order", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: polyphys-toolkit-router",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Routing Table",
    "## Common Mistakes",
    "chromosome-3d-idea-to-model",
    "mechanism-decomposer",
    "minimal-model-builder",
    "observable-translator",
    "simulation-recommender",
    "handoff",
    "degeneracy",
    "pause"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL because `docs/superpowers/skills/polyphys-toolkit-router/SKILL.md` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `tests/integration/polyphys-toolkit-router-skill.test.mjs` with the code above.

- [ ] **Step 4: Run test to verify it fails for the right reason**

Run: `npm run test:integration`
Expected: FAIL only because the new router skill file is missing or incomplete.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/polyphys-toolkit-router-skill.test.mjs
git commit -m "test: add polyphys router contract"
```

### Task 2: Implement The Router Skill

**Files:**
- Create: `docs/superpowers/skills/polyphys-toolkit-router/SKILL.md`
- Modify: `README.md`
- Test: `tests/integration/polyphys-toolkit-router-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the red state from Task 1. Do not write the router until the new integration test is failing.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL in `tests/integration/polyphys-toolkit-router-skill.test.mjs`.

- [ ] **Step 3: Write minimal implementation**

Create `docs/superpowers/skills/polyphys-toolkit-router/SKILL.md` with:

```md
---
name: polyphys-toolkit-router
description: Use when a chromosome 3D modeling request needs to be routed across the PolyPhys skill suite instead of handled by one skill in isolation.
---

# PolyPhys Toolkit Router

## Overview
[Explain the suite-level orchestration goal.]

## When to Use
[List entry triggers.]

## Workflow
1. [Choose between direct top-level draft and decomposition-first entry.]
2. [Route to mechanism-decomposer when phenotype dominates.]
3. [Route to minimal-model-builder once hypotheses are clear.]
4. [Route to observable-translator once a model exists.]
5. [Route to simulation-recommender only after readiness gates pass.]
6. [Pause on degeneracy or missing prerequisites.]

## Routing Table
[Map input state to next skill and handoff condition.]

## Common Mistakes
[List duplicated logic, skipped handoffs, and premature recommendations.]
```

Update `README.md` to mention the router as the suite entry point.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:integration`
Expected: PASS for the new test and all existing integration tests.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/superpowers/skills/polyphys-toolkit-router/SKILL.md tests/integration/polyphys-toolkit-router-skill.test.mjs
git commit -m "feat: add polyphys toolkit router"
```
