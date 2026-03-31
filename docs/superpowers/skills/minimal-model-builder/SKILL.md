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
6. Emit a standardized `Parameter Card` as a Markdown table or JSON block so downstream simulation setup has no conceptual blind spots.
7. End with `Scope Limits` that say what this minimal model intentionally does not explain yet.

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

### Parameter Card
- Present as a Markdown table or JSON block
- `Monomer Types`
- `Bonded Potentials`
- `Non-Bonded Potentials`
- `Temperature`
- `Damping Coefficient`
- `Time Step`
- Add placeholder ranges or reference dimensions when exact values are not yet known

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
| User will need help moving toward simulation | Add a `Parameter Card` in Markdown table or JSON form |

## Common Mistakes
- Starting with a complicated mechanism-rich model instead of a `Base Polymer Model`.
- Omitting the `Baseline Control` or describing it too vaguely to reproduce.
- Adding several mechanism-bearing ingredients at once so the `Experimental Perturbation` is no longer interpretable.
- Hiding a nonequilibrium assumption inside a generic model label instead of stating `Active Components Required`.
- Failing to emit a `Parameter Card`, leaving monomer types, bonded terms, non-bonded terms, temperature, damping, or time step implicit.
- Forgetting to say what the minimal model does not explain, causing scope creep from the start.
