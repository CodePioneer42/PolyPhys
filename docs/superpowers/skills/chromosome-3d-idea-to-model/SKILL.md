---
name: chromosome-3d-idea-to-model
description: Use when a researcher has a chromosome 3D structure or folding idea and needs it reframed as a testable physical modeling draft before simulation implementation.
---

# Chromosome 3D Idea To Model

## Overview
Convert a free-form chromosome 3D idea into a physically explicit modeling draft. Treat chromosome 3D structure and folding as the problem domain, separate candidate underlying mechanisms from macroscopic phenotypes, and prefer explicit controls plus validation guardrails over fast conclusions.

The hierarchy is fixed:
- Problem domain: chromosome 3D structure and folding
- Underlying mechanisms: loop extrusion, bridging, and other necessary drivers
- Macroscopic phenotypes: condensation, clustering, domain formation, compartment-like behavior

`phase separation` is not accepted as a final mechanism label by default. Reframe it as a descriptive phenotype unless the user provides explicit thermodynamic evidence.

## When to Use
- A researcher has a chromosome 3D structure or folding idea and wants a model-ready draft.
- The prompt describes condensation, clustering, compaction, or domain formation but the mechanism is unresolved.
- The user labels behavior as phase separation without thermodynamic evidence.
- A project needs explicit controls, orthogonal validation, and mechanism competition before simulation implementation.

Do not use this skill for generic genomics Q&A, broad literature review only, or full simulation pipeline automation.

## Workflow
1. Reframe the idea in physically neutral language. Lead with phenotype and scope, not a mechanism conclusion.
2. Identify at least two candidate underlying mechanisms and emit a `Degeneracy warning` when multiple explanations remain plausible.
3. Build the smallest defensible model pair rather than an overgrown omnibus model.
4. Force a validation split between fitting and independent testing.
5. Pause simulation recommendation if the mechanism space is still unresolved.
6. Add lightweight Grounding Notes marked as Consensus, Contested, or Heuristic.

## Output Protocol
Every response must use the following modeling draft.

### 1. Problem Framing
- Phenomenon of Interest
- Scope and scale
- Known constraints
- Neutral restatement of the idea

### 2. Competing Mechanisms
- Candidate mechanism A
- Candidate mechanism B
- Degeneracy warning when more than one mechanism can explain the phenotype
- Explicit downgrade of unsupported `phase separation` language to phenotype-only wording

### 3. The Minimal Physical Model
- Base Polymer Model
- Baseline Control
- Experimental Perturbation
- Active Components Required
- Active Module Checklist

Requirements:
- `Base Polymer Model` states the minimal chromosome/polymer representation.
- `Baseline Control` removes mechanism-specific interactions. A pure repulsive or otherwise non-specific control is preferred.
- `Experimental Perturbation` adds the mechanism under study and only the minimum ingredients needed to test it.
- `Active Components Required` states whether nonequilibrium drivers must be present.
- `Active Module Checklist` explicitly checks loop extrusion, nonequilibrium fluxes, reader-writer feedback, or viscoelastic/environmental couplings when relevant.

Do not present a model draft without a `Baseline Control`.

### 4. Observables & Validation Strategy
- Fitting Observables
- Orthogonal Validation
- Degeneracy-Breakers
- In Silico Perturbations

Requirements:
- `Fitting Observables` are only the measurements used to set parameters.
- `Orthogonal Validation` must come from a different observable class than the fitting target.
- `Degeneracy-Breakers` should target observations that distinguish competing mechanisms.
- `In Silico Perturbations` should include virtual knockouts or mechanism removal tests when informative.

Do not reuse the same data family for both fit and validation unless the response explicitly states that the draft is still unvalidated.

### 5. Simulation Implementation
- Recommended paradigm
- Recommended engine or implementation class
- Fidelity / cost tradeoff
- Explicit solvent / ion requirement note

Pause simulation recommendation when high degeneracy remains. Ask whether to add new experimental constraints or proceed with two competing control models.

### 6. Grounding Notes
- Consensus
- Contested
- Heuristic

Grounding Notes are short. They label epistemic status; they do not become a full literature review.

## Quick Reference
| Situation | Required response |
| --- | --- |
| User says `phase separation` without proof | Reframe as condensation, clustering, or domain formation and ask for thermodynamic evidence before accepting the mechanism label |
| One phenotype admits multiple mechanisms | Add `Degeneracy warning` and list `Competing Mechanisms` before recommending software |
| Model proposal lacks a control | Add `Baseline Control` and mark the draft incomplete until it exists |
| Same data type is used for fit and validation | Replace validation with `Orthogonal Validation` from a different observable class |
| Mechanism is still unresolved late in the draft | Pause simulation recommendation and offer two competing control models or request extra constraints |
| Active processes may matter | Fill `Active Components Required` and `Active Module Checklist` explicitly rather than hiding the assumption |

## Response Template
Use this exact structure in the final answer.

```md
## Problem Framing
- Phenomenon of Interest:
- Scope and scale:
- Known constraints:
- Neutral restatement:

## Competing Mechanisms
- Candidate A:
- Candidate B:
- Degeneracy warning:

## The Minimal Physical Model
- Base Polymer Model:
- Baseline Control:
- Experimental Perturbation:
- Active Components Required:
- Active Module Checklist:

## Observables & Validation Strategy
- Fitting Observables:
- Orthogonal Validation:
- Degeneracy-Breakers:
- In Silico Perturbations:

## Simulation Implementation
- Recommended paradigm:
- Recommended engine:
- Fidelity / cost tradeoff:
- Explicit solvent / ion note:

## Grounding Notes
- Consensus:
- Contested:
- Heuristic:
```

## Common Mistakes
- Treating `phase separation` as a final mechanism without explicit thermodynamic evidence.
- Giving one favored mechanism without a `Competing Mechanisms` section.
- Skipping the `Baseline Control`.
- Omitting the `Active Module Checklist` when nonequilibrium effects may be central.
- Using the same observable family for both `Fitting Observables` and `Orthogonal Validation`.
- Recommending software before resolving whether major mechanistic degeneracy remains.
- Presenting contested claims as settled instead of labeling them in `Grounding Notes`.
