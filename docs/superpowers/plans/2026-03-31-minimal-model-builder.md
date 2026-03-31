# Minimal Model Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `minimal-model-builder` skill that turns a chromosome mechanism hypothesis into a minimal physical model with explicit controls and active-module self-checks.

**Architecture:** Keep the implementation as one standalone skill file plus one integration contract test. The skill should sit between `mechanism-decomposer` and `observable-translator`, owning only minimal model construction, control design, and the decision of whether active components are required.

**Tech Stack:** Markdown, Node.js built-in test runner, git

---

### Task 1: Add A Contract Test For Minimal Model Building

**Files:**
- Create: `tests/integration/minimal-model-builder-skill.test.mjs`
- Test: `tests/integration/minimal-model-builder-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/minimal-model-builder/SKILL.md",
  import.meta.url
);

test("minimal-model-builder skill exists and encodes control-first chromosome model design", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: minimal-model-builder",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Output Protocol",
    "## Quick Reference",
    "## Common Mistakes",
    "Base Polymer Model",
    "Baseline Control",
    "Experimental Perturbation",
    "Active Components Required",
    "Active Module Checklist",
    "nonequilibrium",
    "purely repulsive",
    "control"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL because `docs/superpowers/skills/minimal-model-builder/SKILL.md` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `tests/integration/minimal-model-builder-skill.test.mjs` with the code above.

- [ ] **Step 4: Run test to verify it fails for the right reason**

Run: `npm run test:integration`
Expected: FAIL only because the new skill file is missing or incomplete.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/minimal-model-builder-skill.test.mjs
git commit -m "test: add minimal model builder contract"
```

### Task 2: Implement The Minimal Model Builder Skill

**Files:**
- Create: `docs/superpowers/skills/minimal-model-builder/SKILL.md`
- Modify: `README.md`
- Test: `tests/integration/minimal-model-builder-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the red state from Task 1. Do not write the skill until the new integration test is failing.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL in `tests/integration/minimal-model-builder-skill.test.mjs`.

- [ ] **Step 3: Write minimal implementation**

Create `docs/superpowers/skills/minimal-model-builder/SKILL.md` with:

```md
---
name: minimal-model-builder
description: Use when a chromosome mechanism hypothesis must be converted into a minimal physical model with explicit controls before validation or simulation planning.
---

# Minimal Model Builder

## Overview
[Explain control-first minimal model design and active-module self-checking.]

## When to Use
[List triggers around model construction.]

## Workflow
1. [Choose Base Polymer Model.]
2. [Define Baseline Control.]
3. [Define Experimental Perturbation.]
4. [Set Active Components Required.]
5. [Run Active Module Checklist.]

## Output Protocol
### Base Polymer Model
### Baseline Control
### Experimental Perturbation
### Active Components Required
### Active Module Checklist
### Scope Limits

## Quick Reference
[Table for repulsive controls, active vs equilibrium models, and overfitting risks.]

## Common Mistakes
[List model bloat, missing controls, and hidden nonequilibrium assumptions.]
```

Update `README.md` to mention this fourth skill in one sentence.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:integration`
Expected: PASS for the new test and all existing integration tests.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/superpowers/skills/minimal-model-builder/SKILL.md tests/integration/minimal-model-builder-skill.test.mjs
git commit -m "feat: add minimal model builder skill"
```
