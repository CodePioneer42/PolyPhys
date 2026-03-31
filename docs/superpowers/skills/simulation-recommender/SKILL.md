---
name: simulation-recommender
description: Use when a chromosome model is already defined well enough to choose a conservative simulation route without overcommitting under degeneracy.
---

# Simulation Recommender

## Overview
Recommend a simulation route only after the model, control, and validation logic are already coherent. The core rule is conservative gating: if the mechanism space is still too degenerate, pause recommendation instead of pretending the software choice is already well-posed.

This skill does not decide the mechanism or build the model. It translates an already-structured model into a simulation paradigm, a plausible engine class, and a clear statement of fidelity and cost.

## When to Use
- A chromosome model already has an explicit control and perturbation.
- Mechanistic ambiguity has been reduced enough that a simulation route is meaningful.
- The user needs to know whether equilibrium, active, coarse-grained, or more detailed routes are appropriate.
- The next decision is computational framing, not mechanism discovery.

Do not use this skill when major degeneracy remains, when the model lacks a control, or when observables and validation have not been defined yet.

## Workflow
1. Check the readiness gate and `Pause recommendation` if unresolved degeneracy remains.
2. Choose a `Recommended Paradigm` that matches the model assumptions rather than the most elaborate option available.
3. Choose a `Recommended Engine` or implementation class that can express the needed interactions and dynamics.
4. State the `Fidelity / Cost Tradeoff` explicitly.
5. State the `Explicit Solvent / Ion Note` explicitly.
6. Add a short `Do Not Recommend Yet` note when the prerequisites are not satisfied.

## Output Protocol
Every response should use the following structure.

### Readiness Gate
- Whether the model is sufficiently specified
- Whether major degeneracy still blocks a meaningful recommendation
- Whether the draft is ready for recommendation or must pause

### Recommended Paradigm
- The conservative simulation paradigm that fits the current model
- Why this paradigm is sufficient
- Which more detailed paradigms are unnecessary at this stage

### Recommended Engine
- The engine class or simulation framework type
- Why it matches the model ingredients
- What capability matters most: active dynamics, coarse-grained polymer support, custom interactions, or flexible state logic

### Fidelity / Cost Tradeoff
- What physical detail is retained
- What detail is omitted
- What computational cost the choice implies
- Why the conservative route is preferable to a higher-cost route for the current question

### Explicit Solvent / Ion Note
- Whether explicit solvent is needed
- Whether explicit ions are needed
- Why implicit treatment is acceptable or not acceptable here

### Do Not Recommend Yet
- The unresolved issue if recommendation must pause
- The next information needed to unblock a conservative recommendation

## Quick Reference
| Situation | Required response |
| --- | --- |
| Mechanism and control are still unclear | `Pause recommendation` and name the missing prerequisite |
| A simple coarse-grained question is being overcomplicated | Choose a conservative paradigm and explain why higher fidelity is unnecessary |
| The user asks for software before model convergence | Say the recommendation is blocked by degeneracy, not by tool availability |
| Explicit solvent or ions are not central to the question | State why implicit treatment is acceptable under the current assumptions |
| Active dynamics are essential | Tie the `Recommended Engine` to the active ingredients instead of giving a generic package name |

## Common Mistakes
- Recommending a tool before the model and control are stable.
- Hiding unresolved degeneracy behind a confident software choice.
- Choosing a high-cost route because it sounds more realistic rather than because the question requires it.
- Omitting the `Fidelity / Cost Tradeoff`, which makes the recommendation impossible to evaluate.
- Failing to state the `Explicit Solvent / Ion Note`, leaving a major modeling assumption implicit.
