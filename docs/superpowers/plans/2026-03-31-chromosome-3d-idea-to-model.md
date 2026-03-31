# Chromosome 3D Idea To Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete `chromosome-3d-idea-to-model` skill as a repo-tracked artifact with integration tests that encode the approved workflow and output protocol.

**Architecture:** Keep the implementation lightweight and documentation-first. The core artifact is a single skill file at `docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md`, while Node integration tests assert the presence of the required sections, guardrails, and output template so the skill cannot silently drift away from the approved v1 design.

**Tech Stack:** Markdown, Node.js built-in test runner, git

---

### Task 1: Strengthen Skill Contract Tests

**Files:**
- Modify: `tests/integration/chromosome-idea-to-model-skill.test.mjs`
- Test: `tests/integration/chromosome-idea-to-model-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md",
  import.meta.url
);

test("chromosome idea-to-model skill encodes the full modeling draft template", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "## Workflow",
    "## Output Protocol",
    "Problem Framing",
    "Competing Mechanisms",
    "The Minimal Physical Model",
    "Observables & Validation Strategy",
    "Simulation Implementation",
    "Grounding Notes",
    "Active Module Checklist",
    "Fitting Observables",
    "Orthogonal Validation",
    "Degeneracy-Breakers",
    "In Silico Perturbations",
    "Consensus",
    "Contested",
    "Heuristic"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")));
  }
});

test("chromosome idea-to-model skill encodes the phase-separation downgrade and degeneracy pause rules", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /phase separation/i);
  assert.match(skillDoc, /thermodynamic evidence/i);
  assert.match(skillDoc, /Degeneracy warning/);
  assert.match(skillDoc, /Pause simulation recommendation/i);
  assert.match(skillDoc, /two competing control models/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL in `tests/integration/chromosome-idea-to-model-skill.test.mjs` because the current skill draft does not yet contain the full output template and pause wording.

- [ ] **Step 3: Write minimal implementation**

Update `tests/integration/chromosome-idea-to-model-skill.test.mjs` to include the two tests above.

- [ ] **Step 4: Run test to verify it passes/fails for the right reason**

Run: `npm run test:integration`
Expected: FAIL only because `docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md` is still incomplete, not because the test file is broken.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/chromosome-idea-to-model-skill.test.mjs
git commit -m "test: expand chromosome skill contract"
```

### Task 2: Implement The Full Skill Document

**Files:**
- Modify: `docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md`
- Modify: `README.md`
- Test: `tests/integration/chromosome-idea-to-model-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the failing integration tests from Task 1 as the red state. Do not edit production files until those tests are red for the expected reason.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL with missing phrases such as `Active Module Checklist`, `Degeneracy-Breakers`, or `Pause simulation recommendation`.

- [ ] **Step 3: Write minimal implementation**

Replace the skill body with a full, self-contained skill document that includes:

```md
---
name: chromosome-3d-idea-to-model
description: Use when a researcher has a chromosome 3D structure or folding idea and needs it reframed as a testable physical modeling draft before simulation implementation.
---

# Chromosome 3D Idea To Model

## Overview
[State the core purpose and the phenotype/mechanism hierarchy.]

## When to Use
- [Chromosome 3D idea -> model-ready draft trigger]
- [Condensation/clustering/domain formation ambiguity trigger]
- [Unsupported phase separation label trigger]
- [Need for controls and non-circular validation trigger]

## Workflow
1. [Reframe to descriptive phenotype.]
2. [List competing mechanisms and emit Degeneracy warning.]
3. [Build minimal model with Baseline Control and Experimental Perturbation.]
4. [Force Observables & Validation Strategy split.]
5. [Pause simulation recommendation if degeneracy remains.]
6. [Attach Grounding Notes.]

## Output Protocol
### Problem Framing
### Competing Mechanisms
### The Minimal Physical Model
- Base Polymer Model
- Baseline Control
- Experimental Perturbation
- Active Components Required
- Active Module Checklist
### Observables & Validation Strategy
- Fitting Observables
- Orthogonal Validation
- Degeneracy-Breakers
- In Silico Perturbations
### Simulation Implementation
### Grounding Notes
- Consensus
- Contested
- Heuristic

## Quick Reference
[Table covering phenotype downgrade, degeneracy pause, control requirement, and orthogonal validation.]

## Common Mistakes
[List of concrete failure modes.]
```

Also update `README.md` to mention the skill location in one short paragraph.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:integration`
Expected: PASS for all integration tests.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md tests/integration/chromosome-idea-to-model-skill.test.mjs
git commit -m "feat: add chromosome idea-to-model skill"
```

### Task 3: Verify And Inspect Final State

**Files:**
- Modify: `docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md` (only if verification reveals a gap)
- Test: `tests/integration/design-doc.test.mjs`
- Test: `tests/integration/human-verification-issue.test.mjs`
- Test: `tests/integration/chromosome-idea-to-model-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

No new test file is needed. Use the existing integration suite as the regression net for the full repo state.

- [ ] **Step 2: Run test to verify current state**

Run: `npm run test:integration`
Expected: PASS all tests. If anything fails, treat that failure as the red state and patch the affected file.

- [ ] **Step 3: Write minimal implementation**

If needed, make only the smallest documentation edits required to restore a fully passing suite.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:integration`
Expected: PASS with 0 failures.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md README.md tests/integration/*.test.mjs
git commit -m "chore: verify chromosome skill docs"
```
