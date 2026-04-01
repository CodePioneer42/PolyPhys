# PolyPhys Skill Workflow Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the PolyPhys skill prompts so early-stage responses stop after mechanism decomposition and simulation recommendations use concrete mainstream engines with explicit command mappings.

**Architecture:** Update the skill text in the router, top-level draft skill, and simulation recommender so the stage machine and output contracts no longer contradict the desired behavior. Drive the work with failing integration tests first, then patch the documentation until the new assertions pass, and finally re-run the related PolyPhys eval-document tests.

**Tech Stack:** Markdown skill docs, Node.js `node:test`, integration tests in `tests/integration`

---

### Task 1: Add failing router and top-level workflow-lock tests

**Files:**
- Modify: `tests/integration/polyphys-toolkit-router-skill.test.mjs`
- Modify: `tests/integration/chromosome-idea-to-model-skill.test.mjs`
- Test: `tests/integration/polyphys-toolkit-router-skill.test.mjs`
- Test: `tests/integration/chromosome-idea-to-model-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
test("polyphys-toolkit-router enforces workflow breakpoints and stops after mechanism decomposition", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /##\#\[WORKFLOW BREAKPOINTS & STATE LOCK\] \(CRITICAL\)/);
  assert.match(skillDoc, /NO INFO-DUMPING \(ABSOLUTELY FORBIDDEN\)/i);
  assert.match(skillDoc, /Mandatory Stop Point/i);
  assert.match(skillDoc, /Which of these candidate mechanisms do you prefer to validate first\?/i);
  assert.doesNotMatch(skillDoc, /handoff toward the `Execution Outline`/i);
});

test("chromosome idea-to-model defers minimal model and execution planning until user confirmation", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /Mechanism Decomposition -> Minimal Model Building -> Observable Translation -> Software Recommendation/i);
  assert.match(skillDoc, /You MUST \*\*STOP GENERATING\*\* immediately/i);
  assert.match(skillDoc, /FORBIDDEN to trigger the minimal model building phase/i);
  assert.doesNotMatch(skillDoc, /## Simulation Implementation/);
  assert.doesNotMatch(skillDoc, /## Execution Outline/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/integration/polyphys-toolkit-router-skill.test.mjs tests/integration/chromosome-idea-to-model-skill.test.mjs`
Expected: FAIL because the new breakpoint language is absent and the old `Execution Outline` expectations are still encoded.

- [ ] **Step 3: Write minimal test adjustments for current suite compatibility**

```js
// Remove old assertions that require early Execution Outline content.
assert.doesNotMatch(skillDoc, /If the mechanism is clear, provide the Execution Outline/i);
assert.doesNotMatch(skillDoc, /Simulation Implementation/i);
```

- [ ] **Step 4: Run tests to verify the RED state is stable**

Run: `node --test tests/integration/polyphys-toolkit-router-skill.test.mjs tests/integration/chromosome-idea-to-model-skill.test.mjs`
Expected: FAIL only on missing new workflow-lock text, not on syntax errors in the test files.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/polyphys-toolkit-router-skill.test.mjs tests/integration/chromosome-idea-to-model-skill.test.mjs
git commit -m "test: add workflow lock assertions for polyphys skills"
```

### Task 2: Add failing anti-laziness simulation recommendation tests

**Files:**
- Modify: `tests/integration/simulation-recommender-skill.test.mjs`
- Test: `tests/integration/simulation-recommender-skill.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
test("simulation-recommender bans abstract software fallbacks and requires concrete engine mappings", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /##\#\[SOFTWARE RECOMMENDATION MANDATE & ANTI-LAZINESS\] \(CRITICAL\)/);
  assert.match(skillDoc, /ABSOLUTELY FORBIDDEN to recommend abstract, non-actionable solutions/i);
  assert.match(skillDoc, /LAMMPS/i);
  assert.match(skillDoc, /HOOMD-blue/i);
  assert.match(skillDoc, /Key Modules & Command Mapping/i);
  assert.match(skillDoc, /bond_style fene|hoomd\.md\.bond\.FENE/i);
  assert.doesNotMatch(skillDoc, /Treat self-written Monte Carlo code as a valid route/i);
  assert.doesNotMatch(skillDoc, /standalone custom code/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/integration/simulation-recommender-skill.test.mjs`
Expected: FAIL because the anti-laziness block and command-mapping structure do not exist yet.

- [ ] **Step 3: Tighten old expectations that currently normalize lazy fallback behavior**

```js
// Replace permissive checks with concrete-engine checks.
assert.match(skillDoc, /OpenMM|GROMACS/i);
assert.doesNotMatch(skillDoc, /self-written code/i);
```

- [ ] **Step 4: Run test to verify the RED state is stable**

Run: `node --test tests/integration/simulation-recommender-skill.test.mjs`
Expected: FAIL on missing new recommendation text only.

- [ ] **Step 5: Commit**

```bash
git add tests/integration/simulation-recommender-skill.test.mjs
git commit -m "test: require concrete polyphys engine recommendations"
```

### Task 3: Patch router and top-level skill docs to enforce stage locking

**Files:**
- Modify: `docs/superpowers/skills/polyphys-toolkit-router/SKILL.md`
- Modify: `docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md`
- Test: `tests/integration/polyphys-toolkit-router-skill.test.mjs`
- Test: `tests/integration/chromosome-idea-to-model-skill.test.mjs`

- [ ] **Step 1: Write the minimal doc changes**

```md
###[WORKFLOW BREAKPOINTS & STATE LOCK] (CRITICAL)
1. **Sequential Execution:** The modeling process MUST be strictly executed in separate, sequential stages: Mechanism Decomposition -> Minimal Model Building -> Observable Translation -> Software Recommendation.
2. **NO INFO-DUMPING (ABSOLUTELY FORBIDDEN):** You MUST NOT output content for multiple stages in a single response. Never generate the "Minimal Physical Model" or "Execution Outline" during the mechanism brainstorming phase.
3. **Mandatory Stop Point:** After executing the mechanism decomposition (presenting candidate mechanisms and degeneracy warnings), you MUST **STOP GENERATING** immediately. You MUST end your response with a direct question to the user, such as: *"Which of these candidate mechanisms do you prefer to validate first?"*
4. **User Confirmation Gate:** You are FORBIDDEN to trigger the minimal model building phase or proceed to the next step until the user explicitly replies and confirms their chosen path/mechanism.
```

- [ ] **Step 2: Remove contradictory surrounding guidance**

```md
- Delete instructions that say to handoff toward `Execution Outline` during routing.
- Replace monolithic draft sections with mechanism-first output requirements and an explicit stop question.
- Keep later-stage references as deferred stages rather than same-turn output requirements.
```

- [ ] **Step 3: Run tests to verify they pass**

Run: `node --test tests/integration/polyphys-toolkit-router-skill.test.mjs tests/integration/chromosome-idea-to-model-skill.test.mjs`
Expected: PASS

- [ ] **Step 4: Re-read the edited docs for contradictions**

Run: `sed -n '1,260p' docs/superpowers/skills/polyphys-toolkit-router/SKILL.md` and `sed -n '1,320p' docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md`
Expected: No remaining instructions that require early `Simulation Implementation` or `Execution Outline`.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/skills/polyphys-toolkit-router/SKILL.md docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md
git commit -m "docs: lock polyphys workflow stages"
```

### Task 4: Patch simulation recommender to require concrete engine output

**Files:**
- Modify: `docs/superpowers/skills/simulation-recommender/SKILL.md`
- Test: `tests/integration/simulation-recommender-skill.test.mjs`

- [ ] **Step 1: Write the minimal doc changes**

```md
###[SOFTWARE RECOMMENDATION MANDATE & ANTI-LAZINESS] (CRITICAL)
1. **BANNED TERMS (Blacklist):** You are ABSOLUTELY FORBIDDEN to recommend abstract, non-actionable solutions such as "standalone custom code", "write your own scripts", or "generic MD engine".
2. **REQUIRED SELECTION:** You MUST evaluate and recommend at least one or two concrete, mainstream simulation engines capable of coarse-grained polymer physics (e.g., LAMMPS, HOOMD-blue, OpenMM, GROMACS).
3. **MANDATORY OUTPUT FORMAT:** Your software recommendation MUST strictly follow the exact Markdown structure below. Any deviation, abstraction, or omission of this structure will be considered a severe task failure:
```

- [ ] **Step 2: Align the output protocol around the new structure**

```md
#### Recommended Engine: [Software Name, e.g., LAMMPS or HOOMD-blue]
*   **Justification:** ...
*   **Key Modules & Command Mapping:**
    *   **Polymer Topology/Bonds:** `bond_style fene`
    *   **Specific Interactions (Non-bonded):** `pair_style lj/cut`
    *   **Integrator & Dynamics:** `fix langevin`
*   **Limitations & Warnings:** ...
```

- [ ] **Step 3: Run test to verify it passes**

Run: `node --test tests/integration/simulation-recommender-skill.test.mjs`
Expected: PASS

- [ ] **Step 4: Re-read the edited doc for banned fallback text**

Run: `rg -n "standalone custom code|self-written code|write your own scripts|generic MD engine" docs/superpowers/skills/simulation-recommender/SKILL.md`
Expected: No matches for banned fallback phrasing.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/skills/simulation-recommender/SKILL.md
git commit -m "docs: require concrete simulation engines in polyphys recommender"
```

### Task 5: Reconcile related eval tests and verify the final suite

**Files:**
- Modify: `tests/integration/polyphys-gold-responses.test.mjs` (only if needed)
- Modify: `tests/integration/polyphys-human-evals.test.mjs` (only if needed)
- Modify: `docs/evals/polyphys-gold-responses.md` (only if needed)
- Modify: `docs/evals/polyphys-human-evals.md` (only if needed)
- Test: `tests/integration/polyphys-gold-responses.test.mjs`
- Test: `tests/integration/polyphys-human-evals.test.mjs`

- [ ] **Step 1: Run the broader verification suite**

```bash
node --test \
  tests/integration/polyphys-toolkit-router-skill.test.mjs \
  tests/integration/chromosome-idea-to-model-skill.test.mjs \
  tests/integration/simulation-recommender-skill.test.mjs \
  tests/integration/polyphys-gold-responses.test.mjs \
  tests/integration/polyphys-human-evals.test.mjs
```

Expected: PASS, or focused failures only in eval docs that still encode the old behavior.

- [ ] **Step 2: Patch any eval docs or tests that still normalize the old workflow**

```md
- Replace references that imply a one-shot pipeline dump.
- Add wording that mechanism decomposition ends with a user-choice gate.
- Ensure software recommendation examples use concrete engines and command mappings.
```

- [ ] **Step 3: Re-run the verification suite**

Run: the same `node --test` command above
Expected: PASS

- [ ] **Step 4: Inspect changed files**

Run: `git diff -- docs/superpowers/skills tests/integration docs/evals`
Expected: Only the intended workflow-hardening changes appear.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/skills docs/evals tests/integration
git commit -m "docs: harden polyphys workflow and recommendation prompts"
```
