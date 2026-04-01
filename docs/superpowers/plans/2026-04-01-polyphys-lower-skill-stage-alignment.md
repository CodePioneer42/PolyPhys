# PolyPhys Lower Skill Stage Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the lower-level PolyPhys skills so each stops at its own stage boundary instead of leaking later-stage content or auto-handing off downstream in the same response.

**Architecture:** Tighten the behavior contract in the three lower-level skill docs and drive the change with failing integration tests first. Each skill will get stage-specific stop conditions and gated handoff language rather than a generic shared boilerplate block, and the tests will enforce those boundaries directly from the documentation text.

**Tech Stack:** Markdown skill docs, Node.js `node:test`, integration tests in `tests/integration`

---

### Task 1: Add failing decomposition-stage boundary tests

**Files:**
- Modify: `tests/integration/mechanism-decomposer-skill.test.mjs`
- Test: `tests/integration/mechanism-decomposer-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
test("mechanism-decomposer stops at decomposition and uses a gated next-step question", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /stage boundary|breakpoint|confirmation gate/i);
  assert.match(skillDoc, /Which of these candidate mechanisms/i);
  assert.doesNotMatch(skillDoc, /If competing hypotheses are coherent, handoff to `minimal-model-builder`/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/integration/mechanism-decomposer-skill.test.mjs`
Expected: FAIL because the current skill still treats downstream handoff as immediate once decomposition is coherent.

- [ ] **Step 3: Keep the RED state focused on behavior**

```js
assert.match(skillDoc, /decomposition end node/i);
assert.match(skillDoc, /If the decomposition is complete, end the conversation/i);
```

- [ ] **Step 4: Run test to verify the RED state is stable**

Run: `node --test tests/integration/mechanism-decomposer-skill.test.mjs`
Expected: FAIL only on missing stage-boundary language, not on broken test syntax.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/mechanism-decomposer-skill.test.mjs
git commit -m "test: add mechanism decomposition stage-boundary assertions"
```

### Task 2: Add failing model-construction-stage boundary tests

**Files:**
- Modify: `tests/integration/minimal-model-builder-skill.test.mjs`
- Test: `tests/integration/minimal-model-builder-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
test("minimal-model-builder stops at model construction and defers validation framing", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /stage boundary|confirmation gate|stop condition/i);
  assert.match(skillDoc, /Do not produce validation-plan or simulation-framing content/i);
  assert.doesNotMatch(skillDoc, /If the model is coherent, handoff to `observable-translator`/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/integration/minimal-model-builder-skill.test.mjs`
Expected: FAIL because the current skill still normalizes immediate handoff once the model is coherent.

- [ ] **Step 3: Preserve the existing core checks**

```js
assert.match(skillDoc, /Base Polymer Model/i);
assert.match(skillDoc, /Baseline Control/i);
assert.match(skillDoc, /model-design end node/i);
```

- [ ] **Step 4: Run test to verify the RED state is stable**

Run: `node --test tests/integration/minimal-model-builder-skill.test.mjs`
Expected: FAIL only on missing model-stage stop language.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/minimal-model-builder-skill.test.mjs
git commit -m "test: add minimal-model stage-boundary assertions"
```

### Task 3: Add failing validation-stage boundary tests

**Files:**
- Modify: `tests/integration/observable-translator-skill.test.mjs`
- Test: `tests/integration/observable-translator-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
test("observable-translator stops at validation planning and defers software framing", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /stage boundary|confirmation gate|stop condition/i);
  assert.match(skillDoc, /Do not produce software or engine recommendation content/i);
  assert.doesNotMatch(skillDoc, /If the validation plan is coherent, handoff to `simulation-recommender`/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/integration/observable-translator-skill.test.mjs`
Expected: FAIL because the current skill still treats immediate handoff to software framing as the default next step.

- [ ] **Step 3: Preserve the existing validation checks**

```js
assert.match(skillDoc, /Fitting Observables/i);
assert.match(skillDoc, /Orthogonal Validation/i);
assert.match(skillDoc, /validation-plan end node/i);
```

- [ ] **Step 4: Run test to verify the RED state is stable**

Run: `node --test tests/integration/observable-translator-skill.test.mjs`
Expected: FAIL only on missing validation-stage stop language.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/observable-translator-skill.test.mjs
git commit -m "test: add observable translation stage-boundary assertions"
```

### Task 4: Patch the three lower-level skill docs to enforce stage boundaries

**Files:**
- Modify: `docs/superpowers/skills/mechanism-decomposer/SKILL.md`
- Modify: `docs/superpowers/skills/minimal-model-builder/SKILL.md`
- Modify: `docs/superpowers/skills/observable-translator/SKILL.md`
- Test: `tests/integration/mechanism-decomposer-skill.test.mjs`
- Test: `tests/integration/minimal-model-builder-skill.test.mjs`
- Test: `tests/integration/observable-translator-skill.test.mjs`

- [ ] **Step 1: Add stage-specific stop and gate language**

```md
- Stay inside the current stage only.
- Do not leak content from the next stage.
- End with a direct question or explicit confirmation gate when the next handoff still depends on user choice.
```

- [ ] **Step 2: Remove contradictory immediate-handoff wording**

```md
- Replace unconditional "If the stage is coherent, handoff ..." lines with gated language.
- Keep each skill's end node visible.
- Keep downstream skills named, but only as confirmed next stages.
```

- [ ] **Step 3: Run the three targeted tests**

Run: `node --test tests/integration/mechanism-decomposer-skill.test.mjs tests/integration/minimal-model-builder-skill.test.mjs tests/integration/observable-translator-skill.test.mjs`
Expected: PASS

- [ ] **Step 4: Re-read the edited skill docs for contradictions**

Run: `sed -n '1,260p' docs/superpowers/skills/mechanism-decomposer/SKILL.md`, `sed -n '1,280p' docs/superpowers/skills/minimal-model-builder/SKILL.md`, and `sed -n '1,280p' docs/superpowers/skills/observable-translator/SKILL.md`
Expected: No same-turn drift into later-stage outputs.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/skills/mechanism-decomposer/SKILL.md docs/superpowers/skills/minimal-model-builder/SKILL.md docs/superpowers/skills/observable-translator/SKILL.md
git commit -m "docs: align lower polyphys skills with staged workflow"
```

### Task 5: Re-run the broader workflow verification suite

**Files:**
- Test: `tests/integration/polyphys-toolkit-router-skill.test.mjs`
- Test: `tests/integration/chromosome-idea-to-model-skill.test.mjs`
- Test: `tests/integration/simulation-recommender-skill.test.mjs`
- Test: `tests/integration/mechanism-decomposer-skill.test.mjs`
- Test: `tests/integration/minimal-model-builder-skill.test.mjs`
- Test: `tests/integration/observable-translator-skill.test.mjs`

- [ ] **Step 1: Run the six-skill verification suite**

```bash
node --test \
  tests/integration/polyphys-toolkit-router-skill.test.mjs \
  tests/integration/chromosome-idea-to-model-skill.test.mjs \
  tests/integration/simulation-recommender-skill.test.mjs \
  tests/integration/mechanism-decomposer-skill.test.mjs \
  tests/integration/minimal-model-builder-skill.test.mjs \
  tests/integration/observable-translator-skill.test.mjs
```

Expected: PASS

- [ ] **Step 2: Inspect the changed scope**

Run: `git diff -- docs/superpowers/skills tests/integration docs/superpowers/specs docs/superpowers/plans`
Expected: Only lower-skill alignment changes plus the new spec/plan artifacts appear.

- [ ] **Step 3: Re-run the same suite if any wording-level fix is needed**

Run: the same `node --test` command above
Expected: PASS

- [ ] **Step 4: Summarize residual risk**

```md
- Residual risk should be limited to human-eval coverage rather than integration-test coverage.
```

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/specs/2026-04-01-polyphys-lower-skill-stage-alignment-design.md docs/superpowers/plans/2026-04-01-polyphys-lower-skill-stage-alignment.md docs/superpowers/skills tests/integration
git commit -m "docs: align lower polyphys skills with stage boundaries"
```
