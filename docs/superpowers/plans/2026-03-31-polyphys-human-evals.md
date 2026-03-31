# PolyPhys Human Evals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a human-eval prompt suite that exercises the PolyPhys router and the five specialized chromosome-modeling skills under realistic pressure scenarios.

**Architecture:** Keep the implementation lightweight and documentation-first. One eval document will collect scenario prompts, target skill, pass conditions, and failure signals. One integration test will ensure the eval suite remains present and covers all major workflow stages.

**Tech Stack:** Markdown, Node.js built-in test runner, git

---

### Task 1: Add A Contract Test For Human Eval Coverage

**Files:**
- Create: `tests/integration/polyphys-human-evals.test.mjs`
- Test: `tests/integration/polyphys-human-evals.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evalPath = new URL(
  "../../docs/evals/polyphys-human-evals.md",
  import.meta.url
);

test("polyphys human eval suite exists and covers the full workflow", async () => {
  const evalDoc = await readFile(evalPath, "utf8");

  const requiredPhrases = [
    "# PolyPhys Human Eval Suite",
    "## Evaluation Goals",
    "## Scenarios",
    "Router",
    "Mechanism Decomposer",
    "Minimal Model Builder",
    "Observable Translator",
    "Simulation Recommender",
    "Degeneracy",
    "Pause Condition",
    "Pass Criteria",
    "Failure Signals"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(evalDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL because `docs/evals/polyphys-human-evals.md` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `tests/integration/polyphys-human-evals.test.mjs` with the code above.

- [ ] **Step 4: Run test to verify it fails for the right reason**

Run: `npm run test:integration`
Expected: FAIL only because the eval document is missing or incomplete.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/polyphys-human-evals.test.mjs
git commit -m "test: add polyphys human eval coverage"
```

### Task 2: Implement The Human Eval Suite

**Files:**
- Create: `docs/evals/polyphys-human-evals.md`
- Modify: `README.md`
- Test: `tests/integration/polyphys-human-evals.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the red state from Task 1. Do not write the eval suite until the new integration test is failing.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL in `tests/integration/polyphys-human-evals.test.mjs`.

- [ ] **Step 3: Write minimal implementation**

Create `docs/evals/polyphys-human-evals.md` with:

```md
# PolyPhys Human Eval Suite

## Evaluation Goals
[State what the suite should verify.]

## Scenarios
### Scenario 1: Router
[Prompt, target skill, pass criteria, failure signals]
### Scenario 2: Mechanism Decomposer
[Prompt, target skill, pass criteria, failure signals]
### Scenario 3: Minimal Model Builder
[Prompt, target skill, pass criteria, failure signals]
### Scenario 4: Observable Translator
[Prompt, target skill, pass criteria, failure signals]
### Scenario 5: Simulation Recommender
[Prompt, target skill, pass criteria, failure signals]
### Scenario 6: Degeneracy Stress Test
[Prompt, Pause Condition, pass criteria, failure signals]
```

Update `README.md` to mention the human-eval suite in one sentence.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:integration`
Expected: PASS for the new test and all existing integration tests.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/evals/polyphys-human-evals.md tests/integration/polyphys-human-evals.test.mjs
git commit -m "feat: add polyphys human eval suite"
```
