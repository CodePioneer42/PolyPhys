# Mechanism Decomposer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a focused `mechanism-decomposer` skill that classifies chromosome 3D prompts into phenotype, candidate mechanisms, and explicit degeneracy warnings.

**Architecture:** Keep this as a standalone skill file plus one integration test. The skill will sit beside `chromosome-3d-idea-to-model` and document only decomposition logic, evidence thresholds, and handoff conditions so it remains composable rather than swallowing downstream model-building responsibilities.

**Tech Stack:** Markdown, Node.js built-in test runner, git

---

### Task 1: Add A Contract Test For Mechanism Decomposition

**Files:**
- Create: `tests/integration/mechanism-decomposer-skill.test.mjs`
- Test: `tests/integration/mechanism-decomposer-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/mechanism-decomposer/SKILL.md",
  import.meta.url
);

test("mechanism-decomposer skill exists and encodes degeneracy-first chromosome decomposition", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: mechanism-decomposer",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Output Protocol",
    "## Quick Reference",
    "## Common Mistakes",
    "Competing Hypotheses",
    "Degeneracy Warning",
    "phase separation",
    "thermodynamic evidence",
    "Required Next Evidence",
    "Routing Decision"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL because `docs/superpowers/skills/mechanism-decomposer/SKILL.md` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `tests/integration/mechanism-decomposer-skill.test.mjs` with the code above.

- [ ] **Step 4: Run test to verify it fails for the right reason**

Run: `npm run test:integration`
Expected: FAIL only because the new skill file is missing or incomplete.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/mechanism-decomposer-skill.test.mjs
git commit -m "test: add mechanism decomposer contract"
```

### Task 2: Implement The Mechanism Decomposer Skill

**Files:**
- Create: `docs/superpowers/skills/mechanism-decomposer/SKILL.md`
- Modify: `README.md`
- Test: `tests/integration/mechanism-decomposer-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the red state from Task 1. Do not write the skill until the new integration test is failing.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL in `tests/integration/mechanism-decomposer-skill.test.mjs`.

- [ ] **Step 3: Write minimal implementation**

Create `docs/superpowers/skills/mechanism-decomposer/SKILL.md` with:

```md
---
name: mechanism-decomposer
description: Use when a chromosome 3D structure prompt mixes phenotype language with possible mechanisms and needs explicit degeneracy handling before model construction.
---

# Mechanism Decomposer

## Overview
[Explain phenotype/mechanism separation and model degeneracy.]

## When to Use
[List ambiguity triggers.]

## Workflow
1. [Normalize to phenotype.]
2. [List candidate mechanisms.]
3. [Trigger Degeneracy Warning.]
4. [Add Competing Hypotheses.]
5. [State Required Next Evidence.]
6. [Emit Routing Decision.]

## Output Protocol
### Problem Domain
### Phenotype Normalization
### Candidate Mechanisms
### Competing Hypotheses
### Degeneracy Warning
### Required Next Evidence
### Routing Decision

## Quick Reference
[Table for phase separation downgrade, evidence threshold, and pause conditions.]

## Common Mistakes
[List mechanism-labeling and overcommitment failures.]
```

Update `README.md` to mention this second skill in one sentence.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:integration`
Expected: PASS for the new test and all existing integration tests.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/superpowers/skills/mechanism-decomposer/SKILL.md tests/integration/mechanism-decomposer-skill.test.mjs
git commit -m "feat: add mechanism decomposer skill"
```
