---
name: observable-translator
description: Use when a chromosome modeling hypothesis needs fitting targets, orthogonal validation, and perturbation logic before simulation or interpretation.
---

# Observable Translator

## Overview
Translate a chromosome modeling hypothesis into an evidence plan that can support or falsify it. The core rule is `Avoid Circularity`: one data family should not silently serve as both parameter fit target and proof of correctness.

The second rule is to resolve mechanistic ambiguity rather than decorate it. When competing mechanisms remain plausible, choose observables that break degeneracy instead of adding more of the same static evidence.

## Stage Boundary
This skill has a strict stage boundary at validation planning. Stay inside fit/validation separation, degeneracy-breakers, dynamic diagnostics, perturbations, and interpretation risks. Do not produce software or engine recommendation content in the same response.

## When to Use
- A chromosome model already exists and now needs a defensible validation strategy.
- The same dataset is being reused for both fitting and confirmation.
- Static structure data alone is not enough to distinguish two competing mechanisms.
- The next step requires deciding whether FRAP, MSD, single-cell variability, perturbation response, or another measurement would be more informative.

Do not use this skill to decide the underlying mechanisms from scratch or to build the physical model itself. Start from an explicit hypothesis or a small set of competing hypotheses, and only handoff downstream after the validation plan is explicitly confirmed.

## Workflow
1. List the `Fitting Observables` used to set model parameters.
2. Separate `Orthogonal Validation` targets that come from a different observable family.
3. Identify `Degeneracy-Breakers` that distinguish competing mechanisms rather than merely refining fit quality.
4. Add `dynamic diagnostics` such as FRAP, MSD, turnover, or recovery behavior when static observables are insufficient.
5. Recommend `In Silico Perturbations` that remove or weaken the suspected mechanism and predict a measurable response.
6. Use `one multiple-choice question per message` when one unresolved measurement choice still blocks the plan.
7. State interpretation risks when the current observable set still cannot resolve degeneracy.
8. Use a `confirmation gate` or explicit stop condition before any downstream handoff.
9. Treat a coherent output package as a `validation-plan end node` unless explicit simulation framing is the active task.

## Checklist
- Name the `Fitting Observables` explicitly before proposing validation.
- Keep `Orthogonal Validation` in a different observable family.
- Identify the one or two highest-value `Degeneracy-Breakers`.
- Add dynamic diagnostics when static evidence cannot separate mechanisms.
- Use a multiple-choice format with `2-4` options plus `Other` when clarification is still active.
- Do not handoff to simulation recommendation until circular reuse has been addressed and the validation plan is explicitly confirmed.
- End with a direct question or stop condition instead of drifting into software framing.

## Workflow State Machine
### State 1: Fit / Validation Separation
- Identify which observables fit parameters and which must remain independent.
- Mark circular reuse risks immediately.
- Exit gate: fitting and validation targets are separated or one clarifying question is clearly needed.

### State 2: Degeneracy-Breaking Design
- Add `Degeneracy-Breakers`, `dynamic diagnostics`, and `In Silico Perturbations`.
- Focus on observables that can actually distinguish mechanisms.
- Exit gate: the validation plan can falsify or support the current competing hypotheses.

### State 3: Interpretation And Transition
- State the remaining interpretation risks.
- Decide whether the plan is ready for simulation framing.
- Use a multiple-choice question when one blocked measurement choice can be narrowed cleanly.
- Add a confirmation gate before any handoff toward simulation framing.
- Treat a coherent output package as a `validation-plan end node` when no explicit downstream handoff is requested.
- Exit gate: the validation plan is coherent enough to route forward, the missing evidence is narrowed to one question, a confirmed handoff is requested, or the validation-plan end node is reached.

## After This Stage
- If validation is still circular, ask one question.
- If the validation plan is coherent but the next stage is still unconfirmed, ask one question.
- If the user confirms the software-framing handoff and asks to continue, handoff to `simulation-recommender`.
- If the validation plan is complete, end the conversation and wait for a new explicit request.
- If degeneracy coverage is still weak, stay in validation design and strengthen the plan before routing.

## Self-Review
- `stage completeness`: are fit targets, orthogonal validation, perturbations, and risks all present?
- `circular reuse`: did any observable family silently serve as both fit and proof?
- `degeneracy coverage`: do the chosen observables actually separate the competing mechanisms?
- `dynamic adequacy`: were FRAP, MSD, or other time-resolved diagnostics added when needed?
- `stage boundary`: did the response stay inside validation planning instead of leaking software framing?
- `handoff readiness`: is the plan strong enough to support computational framing?
- `question format`: did clarification stay in multiple-choice form unless forced otherwise?
- `end-node discipline`: did the skill stop at the validation-plan end node when the stage was complete?

When clarification is still active, use `one multiple-choice question per message`.

Default question format:
- Ask a multiple-choice question with `2-4` concrete options.
- Include `Other` as the final option.
- Only use open-ended clarification when the measurement ambiguity cannot be discretized honestly.

## Output Protocol
Every response should use the following structure.

### Fitting Observables
- Which observables set model parameters
- Which parameters they constrain
- Why these observables are suitable for fitting rather than validation

### Orthogonal Validation
- A different observable class than the fitting target
- The expected qualitative or quantitative signature
- Why this validation is independent enough to count

### Degeneracy-Breakers
- The one or two highest-value observables for distinguishing competing hypotheses
- What result would favor mechanism A over mechanism B

### Dynamic Diagnostics
- FRAP-style recovery logic when liquid-like versus gel-like behavior is at issue
- MSD or related mobility analysis when transport or material state matters
- Other turnover or time-resolved readouts when static structure is ambiguous

### In Silico Perturbations
- Virtual knockout or depletion of the suspected mechanism
- Parameter weakening or removal tests
- Null perturbations that should preserve the structure if the hypothesis is correct

### Interpretation Risks
- Remaining circularity risks
- Remaining degeneracy risks
- Missing evidence that still blocks a strong conclusion

### Confirmation Gate
- Direct question to the user when validation scope or next-stage transition still matters
- Stop condition for this conversation
- Confirmed next stage only after the user requests software framing

## Quick Reference
| Situation | Required response |
| --- | --- |
| Bulk Hi-C is used to fit interaction strength | Add `Orthogonal Validation` from FISH distances, single-cell variation, or another non-Hi-C observable |
| Two mechanisms make similar static domains | Add `Degeneracy-Breakers` and `dynamic diagnostics` rather than more static contact summaries |
| Need to distinguish liquid-like from gel-like clustering | Use FRAP-style recovery logic, MSD, or related mobility measures |
| User only has one observational modality | Mark the circularity risk explicitly under `Interpretation Risks` |
| Mechanism should fail under depletion or removal | Add `In Silico Perturbations` that simulate knockout, weakening, or loss of the active ingredient |

## Common Mistakes
- Using one observable family for both fit and proof, violating `Avoid Circularity`.
- Treating a better fit to static data as proof that degeneracy has been resolved.
- Ignoring dynamic diagnostics when FRAP, MSD, or related time-resolved behavior is the only real way to separate hypotheses.
- Recommending perturbations that do not actually target the proposed mechanism.
- Listing many observables without stating which ones are true `Degeneracy-Breakers`.
- Treating a coherent validation plan as permission to recommend software in the same response.
