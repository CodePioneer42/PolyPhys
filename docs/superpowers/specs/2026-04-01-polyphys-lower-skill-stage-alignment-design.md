---
title: PolyPhys Lower Skill Stage Alignment
date: 2026-04-01
status: approved-in-chat
---

# PolyPhys Lower Skill Stage Alignment

## Summary

Align the remaining lower-level PolyPhys skills with the stage-lock behavior already added to the router, top-level draft skill, and simulation recommender.

The target skills are:

- `mechanism-decomposer`
- `minimal-model-builder`
- `observable-translator`

Each skill should stop at its own stage boundary, avoid leaking later-stage content, and require either a user-choice question or an explicit confirmation gate before downstream handoff.

## Goals

- Prevent `mechanism-decomposer` from feeling like an automatic pass-through to model construction.
- Prevent `minimal-model-builder` from drifting into validation design or software framing.
- Prevent `observable-translator` from drifting into engine recommendation in the same response.
- Make each skill’s state machine, after-stage actions, and output protocol consistent with the staged workflow now used elsewhere in the toolkit.
- Add integration assertions so the stage boundaries are verified directly from the skill text.

## Non-Goals

- Rewriting the scientific substance of mechanism, model, or observable selection
- Changing `simulation-recommender` again in this pass
- Creating a fully shared boilerplate block across all skills

## Affected Files

- `docs/superpowers/skills/mechanism-decomposer/SKILL.md`
- `docs/superpowers/skills/minimal-model-builder/SKILL.md`
- `docs/superpowers/skills/observable-translator/SKILL.md`
- `tests/integration/mechanism-decomposer-skill.test.mjs`
- `tests/integration/minimal-model-builder-skill.test.mjs`
- `tests/integration/observable-translator-skill.test.mjs`

## Approach

### 1. Mechanism Decomposer

Add a decomposition-stage breakpoint with these behavioral requirements:

- Stay strictly inside phenotype normalization, competing hypotheses, degeneracy warning, and required next evidence
- End with a direct user-choice or evidence-choice question when ambiguity still matters
- Remove wording that makes handoff to `minimal-model-builder` feel automatic in the same response
- Keep a visible `decomposition end node`, but treat downstream handoff as gated rather than immediate

### 2. Minimal Model Builder

Add a model-construction-stage breakpoint with these behavioral requirements:

- Stay inside `Base Polymer Model`, `Baseline Control`, `Experimental Perturbation`, active assumptions, and scope limits
- Do not produce validation-plan or simulation-framing content in the same response
- End with a direct question or confirmation gate when a design choice still matters before validation handoff
- Keep `observable-translator` as the next stage, but only after the current stage is explicitly stable

### 3. Observable Translator

Add a validation-stage breakpoint with these behavioral requirements:

- Stay inside fit/validation separation, degeneracy-breakers, dynamic diagnostics, perturbations, and interpretation risks
- Do not produce software or engine recommendation content in the same response
- End with a direct question or confirmation gate when measurement choice or validation scope still matters
- Keep `simulation-recommender` as the next stage, but only after the validation plan is explicitly stable

### 4. Test-Driven Documentation Changes

Before editing the skill docs, add failing integration assertions that enforce:

- Each skill contains explicit stage-boundary language
- Each skill forbids leaking content from the next stage
- Each skill includes a stop condition, direct question, or explicit confirmation gate
- Existing tests no longer normalize immediate same-turn handoff as the default happy path

After the skill edits, run the three targeted integration tests and then re-run the broader PolyPhys skill/eval suite if needed.

## Risks

- Some existing tests currently assume the next handoff is immediate once the current output is coherent.
- Over-tightening the lower-level skills could make the toolkit too repetitive if the wording is copied mechanically instead of adapted to each stage.
- The new stage-lock wording must not contradict the router or top-level skill language already added.

## Verification Plan

- Run:
  - `node --test tests/integration/mechanism-decomposer-skill.test.mjs`
  - `node --test tests/integration/minimal-model-builder-skill.test.mjs`
  - `node --test tests/integration/observable-translator-skill.test.mjs`
- Then re-run the already-hardened upstream checks if the wording overlap creates regressions:
  - `node --test tests/integration/polyphys-toolkit-router-skill.test.mjs`
  - `node --test tests/integration/chromosome-idea-to-model-skill.test.mjs`
  - `node --test tests/integration/simulation-recommender-skill.test.mjs`

## Open Questions

- Whether future human-eval docs should add examples for these lower-level stop conditions in a later pass.
