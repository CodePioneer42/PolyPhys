# PolyPhys Gold Responses Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a gold-response library that provides reference answer skeletons for the key PolyPhys evaluation scenarios.

**Architecture:** Keep the implementation documentation-first. One gold-response document will store scenario name, prompt, target skill path, and a short reference response skeleton. One integration test will ensure the library remains present and covers the key scenarios used in the human-eval suite.

**Tech Stack:** Markdown, Node.js built-in test runner, git

---

### Task 1: Add A Contract Test For Gold Response Coverage

**Files:**
- Create: `tests/integration/polyphys-gold-responses.test.mjs`
- Test: `tests/integration/polyphys-gold-responses.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const goldPath = new URL(
  "../../docs/evals/polyphys-gold-responses.md",
  import.meta.url
);

test("polyphys gold responses exist and cover key evaluation scenarios", async () => {
  const goldDoc = await readFile(goldPath, "utf8");

  const requiredPhrases = [
    "# PolyPhys Gold Responses",
    "## Usage Notes",
    "## Scenario 1",
    "## Scenario 2",
    "## Scenario 3",
    "## Scenario 4",
    "Router",
    "Mechanism Decomposer",
    "Minimal Model Builder",
    "Observable Translator",
    "Reference Response Skeleton",
    "Degeneracy warning",
    "Baseline Control",
    "Orthogonal Validation",
    "Pause recommendation"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(goldDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")));
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL because `docs/evals/polyphys-gold-responses.md` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `tests/integration/polyphys-gold-responses.test.mjs` with the code above.

- [ ] **Step 4: Run test to verify it fails for the right reason**

Run: `npm run test:integration`
Expected: FAIL only because the gold-response document is missing or incomplete.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/polyphys-gold-responses.test.mjs
git commit -m "test: add polyphys gold response coverage"
```

### Task 2: Implement The Gold Response Library

**Files:**
- Create: `docs/evals/polyphys-gold-responses.md`
- Modify: `README.md`
- Test: `tests/integration/polyphys-gold-responses.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the red state from Task 1. Do not write the gold-response library until the new integration test is failing.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:integration`
Expected: FAIL in `tests/integration/polyphys-gold-responses.test.mjs`.

- [ ] **Step 3: Write minimal implementation**

Create `docs/evals/polyphys-gold-responses.md` with:

```md
# PolyPhys Gold Responses

## Usage Notes
[Explain these are reference skeletons, not final polished answers.]

## Scenario 1: Router
[Prompt, target skill, reference response skeleton]

## Scenario 2: Mechanism Decomposer
[Prompt, target skill, reference response skeleton]

## Scenario 3: Minimal Model Builder
[Prompt, target skill, reference response skeleton]

## Scenario 4: Observable Translator
[Prompt, target skill, reference response skeleton]
```

Update `README.md` to mention the gold-response library in one sentence.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:integration`
Expected: PASS for the new test and all existing integration tests.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/evals/polyphys-gold-responses.md tests/integration/polyphys-gold-responses.test.mjs
git commit -m "feat: add polyphys gold responses"
```
