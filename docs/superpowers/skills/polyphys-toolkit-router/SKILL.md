---
name: polyphys-toolkit-router
description: Use when a chromosome 3D modeling request needs to be routed across the PolyPhys skill suite instead of handled by one skill in isolation.
---

# PolyPhys Toolkit Router

## Overview
Route chromosome 3D modeling requests across the PolyPhys Toolkit without collapsing all responsibilities into one monolithic response. The router decides the next best skill, enforces handoff order, and prevents later-stage skills from running before their prerequisites are satisfied.

The suite currently routes across:
- `chromosome-3d-idea-to-model`
- `mechanism-decomposer`
- `minimal-model-builder`
- `observable-translator`
- `simulation-recommender`

## When to Use
- A user arrives with a chromosome 3D modeling question but it is not yet clear which sub-skill should handle the next step.
- The request spans multiple stages, such as mechanism ambiguity, model construction, validation design, and eventual simulation planning.
- A response risks skipping directly to a later stage without the required earlier decisions.
- The workflow needs an explicit pause when degeneracy or missing prerequisites block forward progress.

Do not use this skill when the user explicitly names one lower-level skill and the request clearly belongs only to that stage.

## Workflow
1. Start at the highest-level need: if the user wants a full structured draft, route to `chromosome-3d-idea-to-model`.
2. If the request is dominated by ambiguous phenotype language or unclear mechanism claims, handoff to `mechanism-decomposer`.
3. Once competing hypotheses are explicit, handoff to `minimal-model-builder`.
4. Once a minimal model and control exist, handoff to `observable-translator`.
5. Only after model and validation readiness are clear, handoff to `simulation-recommender`.
6. If unresolved degeneracy or missing prerequisites appear at any stage, pause escalation and stop at the current stage rather than routing forward.

## Routing Table
| Input state | Next skill | Handoff condition |
| --- | --- | --- |
| User wants one end-to-end modeling draft now | `chromosome-3d-idea-to-model` | Use the top-level draft when the whole chain must be summarized in one response |
| Phenotype is clear but mechanism is ambiguous | `mechanism-decomposer` | Stop here until competing hypotheses and missing evidence are explicit |
| Candidate mechanisms are explicit but no minimal model exists | `minimal-model-builder` | Route only after mechanism competition is written down |
| Minimal model exists but validation is still vague | `observable-translator` | Route only after `Base Polymer Model`, `Baseline Control`, and perturbation are explicit |
| Model and validation are stable enough for computational choice | `simulation-recommender` | Route only after readiness gates pass and major degeneracy no longer dominates |
| Major degeneracy remains at any stage | pause | Do not handoff forward; ask for more evidence or maintain competing paths |

Use the word `handoff` explicitly when moving from one stage to the next so the transition is visible rather than implicit.

## Common Mistakes
- Sending a phenotype-heavy request directly to `minimal-model-builder` before `mechanism-decomposer`.
- Routing into `simulation-recommender` before validation strategy exists.
- Ignoring degeneracy and pushing the workflow forward instead of using a pause.
- Repeating the full logic of a child skill inside the router instead of making a clean handoff.
- Treating `chromosome-3d-idea-to-model` as the only skill and never using the modular path when the user needs depth at one specific stage.
