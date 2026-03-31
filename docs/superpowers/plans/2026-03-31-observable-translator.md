# Observable Translator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an `observable-translator` skill that converts chromosome modeling hypotheses into fitting targets, orthogonal validation targets, degeneracy-breakers, and in silico perturbations.

**Architecture:** Keep the implementation as one standalone skill file plus one integration contract test. The skill should sit downstream of `mechanism-decomposer` and upstream of simulation recommendation, documenting only validation strategy and evidence design so the responsibilities remain cleanly separated.

**Tech Stack:** Markdown, Node.js built-in test runner, git

---

### Task 1: Add A Contract Test For Observable Translation

**Files:**
- Create: `tests/integration/observable-translator-skill.test.mjs`
- Test: `tests/integration/observable-translator-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/observable-translator/SKILL.md",
  import.meta.url
);

test("observable-translator skill exists and encodes non-circular chromosome validation design", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: observable-translator",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Output Protocol",
    "## Quick Reference",
    "## Common Mistakes",
    "Fitting Observables",
    "Orthogonal Validation",
    "Degeneracy-Breakers",
    "In Silico Perturbations",
    "Avoid Circularity",
    "dynamic diagnostics",
    "FRAP",
    "MSD"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL because `docs/superpowers/skills/observable-translator/SKILL.md` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `tests/integration/observable-translator-skill.test.mjs` with the code above.

- [ ] **Step 4: Run test to verify it fails for the right reason**

Run: `npm run test:integration`
Expected: FAIL only because the new skill file is missing or incomplete.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/observable-translator-skill.test.mjs
git commit -m "test: add observable translator contract"
```

### Task 2: Implement The Observable Translator Skill

**Files:**
- Create: `docs/superpowers/skills/observable-translator/SKILL.md`
- Modify: `README.md`
- Test: `tests/integration/observable-translator-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the red state from Task 1. Do not write the skill until the new integration test is failing.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL in `tests/integration/observable-translator-skill.test.mjs`.

- [ ] **Step 3: Write minimal implementation**

Create `docs/superpowers/skills/observable-translator/SKILL.md` with:

```md
---
name: observable-translator
description: Use when a chromosome modeling hypothesis needs fitting targets, orthogonal validation, and perturbation logic before simulation or interpretation.
---

# Observable Translator

## Overview
[Explain Avoid Circularity and Resolve Degeneracy.]

## When to Use
[List triggers around validation design.]

## Workflow
1. [List fitting observables.]
2. [Separate orthogonal validation.]
3. [Choose degeneracy-breakers.]
4. [Add dynamic diagnostics.]
5. [Recommend in silico perturbations.]

## Output Protocol
### Fitting Observables
### Orthogonal Validation
### Degeneracy-Breakers
### Dynamic Diagnostics
### In Silico Perturbations
### Interpretation Risks

## Quick Reference
[Table for Hi-C, FISH, FRAP, MSD, and perturbation logic.]

## Common Mistakes
[List circular validation and static-only inference failures.]
```

Update `README.md` to mention this third skill in one sentence.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:integration`
Expected: PASS for the new test and all existing integration tests.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/superpowers/skills/observable-translator/SKILL.md tests/integration/observable-translator-skill.test.mjs
git commit -m "feat: add observable translator skill"
```
