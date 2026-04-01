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
4. When naming software, verify the capability claim against current official docs if the answer depends on package support or version-sensitive features.
5. Classify the route as `package-native`, `package + custom extension`, or `standalone custom code`.
6. State the `Fidelity / Cost Tradeoff` explicitly.
7. State the `Explicit Solvent / Ion Note` explicitly.
8. Use `one multiple-choice question per message` when one unresolved prerequisite still blocks the recommendation.
9. Add a short `Do Not Recommend Yet` note when the prerequisites are not satisfied.
10. Treat a coherent recommendation package as a `recommendation end node`.

## Checklist
- Check the readiness gate before naming any paradigm or engine.
- Match the recommendation to the current model assumptions instead of maximal realism.
- Verify named software against official docs when the capability claim could have changed across releases.
- Treat self-written Monte Carlo code as a valid route when a lightweight custom sampler is a better fit than a general package.
- State the `Fidelity / Cost Tradeoff` and `Explicit Solvent / Ion Note` every time.
- Use a multiple-choice format with `2-4` options plus `Other` when clarification is still active.
- Pause rather than overcommitting when degeneracy still blocks a meaningful choice.
- Keep the recommendation conservative and tied to the question being asked.

## Workflow State Machine
### State 1: Readiness Gate
- Check whether the model, control, and validation logic are already coherent.
- Pause when major degeneracy remains.
- Use a multiple-choice question when one blocked prerequisite can be clarified cleanly.
- Exit gate: the recommendation is either clearly blocked or clearly allowed.

### State 2: Conservative Recommendation
- Choose the `Recommended Paradigm` and `Recommended Engine`.
- Verify package claims against official docs and classify the route before presenting it as settled.
- Keep the recommendation aligned with the active ingredients that matter.
- Exit gate: the recommended route is justified without appealing to unnecessary fidelity.

### State 3: Assumption Disclosure
- State the `Fidelity / Cost Tradeoff`, `Explicit Solvent / Ion Note`, and `Do Not Recommend Yet` condition when needed.
- Make the blocking issue visible if the route must pause.
- Treat a coherent recommendation package as a `recommendation end node`.
- Exit gate: the user can see either the conservative route, the exact reason the recommendation must stop, or the recommendation end node.

## After This Stage
- If recommendation must pause, ask one question.
- If recommendation is ready, present the conservative route.
- If the recommendation is complete, end the conversation and wait for a new explicit request.
- If the draft still sounds like an overcommitted recommendation, step back to the readiness gate.

## Self-Review
- `stage completeness`: did the response include readiness, route, capability check, tradeoff, and solvent/ion assumptions?
- `readiness gate`: was the gating decision made before tool choice?
- `overcommitted recommendation`: did the response oversell a route despite unresolved degeneracy?
- `software verification`: were version-sensitive package claims checked against official docs?
- `cost realism`: does the chosen fidelity match the actual question?
- `pause clarity`: if blocked, is the missing prerequisite explicit?
- `question format`: did clarification stay in multiple-choice form unless forced otherwise?
- `end-node discipline`: did the skill stop at the recommendation end node when the stage was complete?

When clarification is still active, use `one multiple-choice question per message`.

Default question format:
- Ask a multiple-choice question with `2-4` concrete options.
- Include `Other` as the final option.
- Only use open-ended clarification when the missing prerequisite cannot be discretized honestly.

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

### Software Capability Check
- Whether the named software capability was verified in official docs
- Whether the route is `package-native`, `package + custom extension`, or `standalone custom code`
- Whether self-written code is acceptable for the required Monte Carlo move set
- Which capability boundary matters most for the recommendation

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
| A package claim is version-sensitive | Verify it in official docs before presenting it as settled |
| The required Monte Carlo move set is simple and specific | Prefer `standalone custom code` over forcing a heavyweight package |

## Common Mistakes
- Recommending a tool before the model and control are stable.
- Hiding unresolved degeneracy behind a confident software choice.
- Naming version-sensitive package support without checking official docs.
- Treating Monte Carlo as package-only when self-written code is the cleaner implementation path.
- Choosing a high-cost route because it sounds more realistic rather than because the question requires it.
- Omitting the `Fidelity / Cost Tradeoff`, which makes the recommendation impossible to evaluate.
- Failing to state the `Explicit Solvent / Ion Note`, leaving a major modeling assumption implicit.
