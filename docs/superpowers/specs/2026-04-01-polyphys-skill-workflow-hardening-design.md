---
title: PolyPhys Skill Workflow Hardening
date: 2026-04-01
status: approved-in-chat
---

# PolyPhys Skill Workflow Hardening

## Summary

Refactor the PolyPhys skill prompts to fix two workflow failures:

1. Stage collapse and info-dumping across the chromosome modeling pipeline
2. Abstract, non-actionable software recommendations in simulation guidance

The change will harden stage gates across the router and top-level draft skill, and will force concrete mainstream engine recommendations with command mappings in the simulation recommender.

## Goals

- Prevent one-response dumping of mechanism discussion, model construction, validation, and execution planning.
- Force a visible stop after mechanism decomposition until the user selects a mechanism to pursue.
- Remove prompt language that encourages early `Execution Outline` or simulation content.
- Replace abstract software fallbacks with concrete engine recommendations and explicit command mappings.
- Add or update tests so these constraints are verified directly from the skill text.

## Non-Goals

- Rewriting the lower-level scientific content of `mechanism-decomposer`, `minimal-model-builder`, or `observable-translator`
- Adding live software capability web checks to the tests
- Expanding the toolkit to new simulation packages beyond what is needed for concrete recommendations

## Affected Files

- `docs/superpowers/skills/polyphys-toolkit-router/SKILL.md`
- `docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md`
- `docs/superpowers/skills/simulation-recommender/SKILL.md`
- `tests/integration/polyphys-toolkit-router-skill.test.mjs`
- `tests/integration/simulation-recommender-skill.test.mjs`
- Any eval docs or tests that currently encode the old collapsed workflow

## Approach

### 1. Router Stage Lock

Insert the new critical `WORKFLOW BREAKPOINTS & STATE LOCK` block verbatim into the router skill.

Then align the surrounding sections so they do not contradict the new block:

- Remove or rewrite instructions that route directly toward `Execution Outline`
- Make the stop-after-mechanism gate explicit in workflow, checklist, state machine, after-stage actions, and self-review
- Keep the handoff order visible, but prohibit multi-stage output in one response

### 2. Top-Level Draft Skill Decomposition

Refactor `chromosome-3d-idea-to-model` so it no longer instructs the model to produce a full pipeline draft in one answer.

The updated structure should:

- Preserve early-stage framing and competing-mechanism work
- Stop after the mechanism discussion when degeneracy remains
- End with a direct user-choice question
- Defer minimal model, observables, simulation implementation, and execution outline until the user confirms the mechanism path

### 3. Simulation Recommender Hardening

Insert the new critical `SOFTWARE RECOMMENDATION MANDATE & ANTI-LAZINESS` block verbatim into the recommender skill.

Then align the rest of the skill around that block:

- Remove endorsements of `standalone custom code`, `self-written code`, or generic engine classes as default recommendations
- Require at least one or two concrete mainstream engines
- Require command or API mappings for bonds, non-bonded interactions, and dynamics
- Preserve conservative gating when the model is not ready

### 4. Test-Driven Documentation Changes

Before changing the skills, add failing integration assertions that enforce:

- Router contains the new state-lock block and no longer encourages early `Execution Outline`
- Top-level draft skill no longer requires `Simulation Implementation` and `Execution Outline` in the initial draft path
- Simulation recommender contains the anti-laziness block, bans the blacklist phrases, and requires the concrete command-mapping output structure

After the skill edits, run the targeted integration tests and then the broader PolyPhys documentation tests that may be affected.

## Risks

- Existing eval docs may still describe the old monolithic response shape and fail after the skill refactor.
- Some current tests assert phrases that now need to be removed or weakened.
- The exact mandatory block text must be inserted without introducing inconsistent wording elsewhere in the same skill.

## Verification Plan

- Run:
  - `node --test tests/integration/polyphys-toolkit-router-skill.test.mjs`
  - `node --test tests/integration/simulation-recommender-skill.test.mjs`
  - `node --test tests/integration/chromosome-idea-to-model-skill.test.mjs`
- Then run any PolyPhys eval tests affected by the revised wording:
  - `node --test tests/integration/polyphys-gold-responses.test.mjs`
  - `node --test tests/integration/polyphys-human-evals.test.mjs`

## Open Questions

- Whether any human-eval markdown files should be updated now or in a follow-up pass if they still normalize the old workflow.
- KEEP as history.
- Whether lower-level skills should later adopt matching stage-lock wording for full consistency.
- sure keep update.
