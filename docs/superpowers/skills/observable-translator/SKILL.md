---
name: observable-translator
description: Use when a chromosome modeling hypothesis needs fitting targets, orthogonal validation, and perturbation logic before simulation or interpretation.
---

# Observable Translator

## Overview
Translate a chromosome modeling hypothesis into an evidence plan that can support or falsify it. The core rule is `Avoid Circularity`: one data family should not silently serve as both parameter fit target and proof of correctness.

The second rule is to resolve mechanistic ambiguity rather than decorate it. When competing mechanisms remain plausible, choose observables that break degeneracy instead of adding more of the same static evidence.

## When to Use
- A chromosome model already exists and now needs a defensible validation strategy.
- The same dataset is being reused for both fitting and confirmation.
- Static structure data alone is not enough to distinguish two competing mechanisms.
- The next step requires deciding whether FRAP, MSD, single-cell variability, perturbation response, or another measurement would be more informative.

Do not use this skill to decide the underlying mechanisms from scratch or to build the physical model itself. Start from an explicit hypothesis or a small set of competing hypotheses.

## Workflow
1. List the `Fitting Observables` used to set model parameters.
2. Separate `Orthogonal Validation` targets that come from a different observable family.
3. Identify `Degeneracy-Breakers` that distinguish competing mechanisms rather than merely refining fit quality.
4. Add `dynamic diagnostics` such as FRAP, MSD, turnover, or recovery behavior when static observables are insufficient.
5. Recommend `In Silico Perturbations` that remove or weaken the suspected mechanism and predict a measurable response.
6. State interpretation risks when the current observable set still cannot resolve degeneracy.

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
