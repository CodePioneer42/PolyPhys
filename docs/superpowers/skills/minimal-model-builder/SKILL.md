---
name: minimal-model-builder
description: Use when a chromosome mechanism hypothesis must be converted into a minimal physical model with explicit controls before validation or simulation planning.
---

# Minimal Model Builder

## Overview
Convert a chromosome mechanism hypothesis into the smallest physical model that can actually test it. The core rule is control-first design: every proposed mechanism-bearing model must be paired with a simpler control model that removes the mechanism-specific ingredient.

The skill should also expose hidden active assumptions. If the mechanism only works through nonequilibrium driving, motor stepping, turnover, or feedback, that fact must be stated rather than buried inside a vague model label.

## When to Use
- Candidate mechanisms have already been identified and the next step is to write a model that could, in principle, distinguish them.
- A draft model has grown too large and needs to be reduced to the smallest defensible version.
- The current proposal lacks a clear control or does not state what the perturbation actually adds.
- It is unclear whether an equilibrium model is enough or whether nonequilibrium ingredients are required.

Do not use this skill to identify mechanisms from scratch, design validation observables in detail, or recommend software. Its job ends once the minimal model and controls are explicit.

## Workflow
1. Choose the `Base Polymer Model` that captures the geometry and scale with the fewest assumptions.
2. Define a `Baseline Control` that removes the mechanism-specific ingredient. A purely repulsive or otherwise non-specific control is preferred when possible.
3. Define the `Experimental Perturbation` that adds only the minimum extra ingredient needed to test the target mechanism.
4. State `Active Components Required` explicitly rather than assuming them.
5. Run an `Active Module Checklist` that asks whether nonequilibrium drivers, extrusion, turnover, feedback, or viscoelastic couplings are genuinely necessary.
6. Add a `Data Source Check` and `Parameterization Readiness` note: identify the data source and whether downstream parameterization is needed. Do not read detailed parameter files during model-selection stage by default.
7. Use `one multiple-choice question per message` when one design ambiguity still blocks the minimal model.
8. End with `Scope Limits` that say what this minimal model intentionally does not explain yet.
9. Treat a coherent output package as a `model-design end node` unless explicit validation handoff is the active task.

## Checklist
- Choose the smallest `Base Polymer Model` that can still test the mechanism.
- Write an explicit `Baseline Control` before adding the perturbation.
- State `Active Components Required` instead of hiding nonequilibrium assumptions.
- Identify the data source and defer detailed parameter files until simulation setup is active.
- Use a multiple-choice format with `2-4` options plus `Other` when clarification is still active.
- Do not handoff to `observable-translator` until the model and control are both stable.

## Workflow State Machine
### State 1: Model Skeleton
- Define the `Base Polymer Model` with the minimum geometry and confinement assumptions.
- Keep the model small enough to interpret.
- Exit gate: the base model is explicit and no mechanism-specific ingredient has leaked into it.

### State 2: Control And Perturbation Pair
- Add `Baseline Control`, `Experimental Perturbation`, and `Active Components Required`.
- Run the `Active Module Checklist`.
- Exit gate: the mechanism-bearing ingredient is isolated relative to the control.

### State 3: Parameterization Readiness And Transition
- Add `Data Source Check`, `Parameterization Readiness`, and `Scope Limits`.
- Keep parameter files deferred unless simulation setup is the active task.
- Use a multiple-choice question when one blocked design choice can be narrowed cleanly.
- Treat a coherent output package as a `model-design end node` when no explicit downstream handoff is requested.
- Exit gate: the model is coherent enough for validation design, the remaining gap can be resolved with one question, or the model-design end node is reached.

## After This Stage
- If the model is still unstable, ask one question.
- If the model is coherent, handoff to `observable-translator`.
- If the model design is complete, end the conversation and wait for a new explicit request.
- If the current draft is slipping into premature parameterization, stop and return to model selection.

## Self-Review
- `stage completeness`: did the draft include base model, control, perturbation, and readiness notes?
- `skipped controls`: was any mechanism-bearing model proposed without a real control?
- `premature parameterization`: did the skill start reading detailed parameter files too early?
- `active assumptions`: were nonequilibrium requirements stated explicitly?
- `handoff readiness`: is the model actually ready for validation design?
- `question format`: did clarification stay in multiple-choice form unless forced otherwise?
- `end-node discipline`: did the skill stop at the model-design end node when the stage was complete?

When clarification is still active, use `one multiple-choice question per message`.

Default question format:
- Ask a multiple-choice question with `2-4` concrete options.
- Include `Other` as the final option.
- Only use open-ended clarification when the design choice cannot be discretized honestly.

## Output Protocol
Every response should use the following structure.

### Base Polymer Model
- The minimal polymer representation
- Chain organization assumptions
- Spatial or confinement assumptions

### Baseline Control
- A control model with the target mechanism removed
- Prefer a purely repulsive or otherwise non-specific interaction set when feasible
- State exactly what remains in the control

### Experimental Perturbation
- The smallest extra ingredient added to test the mechanism
- Why that perturbation is sufficient
- What should change relative to the control

### Active Components Required
- Whether the hypothesis can remain equilibrium
- Whether active or nonequilibrium ingredients are required
- The physical reason those active ingredients are needed

### Active Module Checklist
- Loop extrusion or motor stepping required or not
- Nonequilibrium fluxes required or not
- Reader-writer or state-feedback logic required or not
- Environmental or viscoelastic coupling required or not

### Data Source Check
- Identify the data source that grounds the current model choice
- State whether the model is being driven by experimental matrices, tracks, structures, or a mechanism-first hypothesis
- State what evidence is sufficient now to choose the model path

### Parameterization Readiness
- State whether exact parameter files are needed yet
- Do not read detailed parameter files during model-selection stage by default
- Only build a full Parameter Card when simulation setup is the active task
- If deferred, identify the data source and whether downstream parameterization is needed

### Scope Limits
- Which effects are intentionally excluded
- Which biological claims the minimal model cannot support yet
- What should be added only in a later model iteration

## Quick Reference
| Situation | Required response |
| --- | --- |
| Mechanism-specific attraction is proposed | Pair it with a `Baseline Control` that is purely repulsive or non-specific |
| The model only works if activity is present | Mark `Active Components Required` and explain the nonequilibrium dependency |
| Multiple extra ingredients are being added at once | Reduce to one `Experimental Perturbation` over one control before adding more |
| The current model is too realistic to interpret cleanly | Strip it back to the `Base Polymer Model` plus one perturbation |
| A hidden control is implied but not written | Write it explicitly; a missing control means the draft is incomplete |
| User will need help moving toward simulation | Add `Parameterization Readiness` now, then build a full `Parameter Card` only when simulation setup becomes the active task |

## Common Mistakes
- Starting with a complicated mechanism-rich model instead of a `Base Polymer Model`.
- Omitting the `Baseline Control` or describing it too vaguely to reproduce.
- Adding several mechanism-bearing ingredients at once so the `Experimental Perturbation` is no longer interpretable.
- Hiding a nonequilibrium assumption inside a generic model label instead of stating `Active Components Required`.
- Reading detailed parameter files before model selection is stable.
- Emitting a full `Parameter Card` before the work has even reached simulation setup.
- Forgetting to say what the minimal model does not explain, causing scope creep from the start.
