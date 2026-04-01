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
1. Explore project context first: check whether files, docs, and user-supplied chromosome data already imply a `data-driven polymer model` branch. Do not default to git history; only inspect git context when the user requests it or branch history is directly relevant.
2. Start at the highest-level need: if the user wants a full structured draft, route to `chromosome-3d-idea-to-model`.
3. If the request is dominated by ambiguous phenotype language or unclear mechanism claims, handoff to `mechanism-decomposer`.
4. If the mechanism description is self-contradictory, internally inconsistent, or still degenerate, route back to `mechanism-decomposer`.
5. Once competing hypotheses are explicit and internally coherent, handoff to `minimal-model-builder`.
6. Once a minimal model and control exist, handoff to `observable-translator`.
7. Only after model and validation readiness are clear, handoff to `simulation-recommender`.
8. If unresolved degeneracy or missing prerequisites appear at any stage, pause escalation and stop at the current stage rather than routing forward.
9. During clarification-heavy stages, keep the `one question per message` rule and enforce `one multiple-choice question per message` instead of letting the interaction sprawl.
10. When the mechanism is clear, handoff to the skill that can produce the modeling draft and `Execution Outline` instead of continuing open-ended exploration.
11. If the design doc has been written, treat that as an end node and end the conversation.

## Checklist
- Inspect files, docs, and user-provided chromosome data before choosing a route.
- Identify the current routing state before selecting the next skill.
- Do not handoff forward while prerequisites for the current stage are still missing.
- Ask one multiple-choice question at a time when clarification is still active.
- Use `2-4` options plus `Other` for routing questions unless the ambiguity cannot be discretized honestly.
- Use the word `handoff` explicitly whenever the stage transition is ready.

## Workflow State Machine
### State 1: Intake And Routing State Detection
- Read the prompt plus current files, docs, and user-supplied data.
- Determine whether the routing state is top-level drafting, mechanism ambiguity, model construction, validation design, or simulation choice.
- Exit gate: the routing state is named and the blocking ambiguity is known.

### State 2: Gate Enforcement
- Check whether the next stage prerequisites are already satisfied.
- Pause when degeneracy or missing prerequisites still dominate.
- Use a multiple-choice question when one blocked prerequisite can be clarified cleanly.
- Exit gate: either the current stage is stable enough for a handoff or one clarifying question is clearly identified.

### State 3: Visible Transition
- Hand off to the next skill only when the stage is coherent.
- Keep the transition explicit and visible in the response.
- If the mechanism is clear, handoff toward `Execution Outline` generation rather than more discovery.
- If the design doc has been written, end the conversation.
- Exit gate: the next skill is named, the pause condition is stated, or the end node is reached.

## After This Stage
- If the current stage is unresolved, ask one question.
- If the stage is coherent, handoff explicitly to the next skill.
- If the request is blocked by missing prerequisites, pause and name the blocking condition instead of routing forward.
- If the mechanism is clear, handoff toward the `Execution Outline`.
- If the design doc has been written, end the conversation and wait for a new explicit request.

## Self-Review
- `routing state`: did the response name the current stage before picking the next one?
- `premature handoff`: did the router skip past an unmet prerequisite?
- `pause discipline`: was degeneracy used as a real pause rather than a warning label only?
- `context scope`: did the router stay with files/docs/data instead of defaulting to git history?
- `next-step clarity`: is the next skill or blocking question explicit?
- `question format`: did routing clarification stay in multiple-choice form?
- `end-node discipline`: did the router stop once the design doc was written?

## Routing Table
| Input state | Next skill | Handoff condition |
| --- | --- | --- |
| User supplied files, matrices, or structure-derived inputs dominate the request | `chromosome-3d-idea-to-model` | start with a `data-driven polymer model` check before mechanism-heavy routing |
| User wants one end-to-end modeling draft now | `chromosome-3d-idea-to-model` | Use the top-level draft when the whole chain must be summarized in one response |
| Phenotype is clear but mechanism is ambiguous | `mechanism-decomposer` | Stop here until competing hypotheses and missing evidence are explicit |
| Mechanism claims are self-contradictory or unstable | route back to `mechanism-decomposer` | must not handoff to `minimal-model-builder` until the contradiction is resolved |
| Candidate mechanisms are explicit but no minimal model exists | `minimal-model-builder` | route only after mechanism competition is written down and internally coherent |
| Minimal model exists but validation is still vague | `observable-translator` | Route only after `Base Polymer Model`, `Baseline Control`, and perturbation are explicit |
| Model and validation are stable enough for computational choice | `simulation-recommender` | Route only after readiness gates pass and major degeneracy no longer dominates |
| Mechanism is clear and the next need is execution framing | `chromosome-3d-idea-to-model` | handoff for the compact modeling draft plus `Execution Outline` |
| Design doc has been written | end node | end the conversation rather than continuing the chain by default |
| Major degeneracy remains at any stage | pause | Do not handoff forward; ask for more evidence or maintain competing paths |

Use the word `handoff` explicitly when moving from one stage to the next so the transition is visible rather than implicit.

When clarification is still active, keep the `one question per message` rule by using `one multiple-choice question per message` until the state is coherent enough for a stable handoff.

Default question format:
- Ask a multiple-choice question with `2-4` concrete options.
- Include `Other` as the final option.
- Only use open-ended routing questions when the ambiguity cannot be honestly reduced to a finite choice set.

## Common Mistakes
- Sending a phenotype-heavy request directly to `minimal-model-builder` before `mechanism-decomposer`.
- Letting a self-contradictory mechanism story pass forward instead of sending it back to `mechanism-decomposer`.
- Ignoring a user-supplied dataset and routing straight into a `physical mechanism polymer model` when a `data-driven polymer model` branch should be considered first.
- Defaulting to git history instead of files, docs, and user-supplied chromosome data during routing.
- Routing into `simulation-recommender` before validation strategy exists.
- Ignoring degeneracy and pushing the workflow forward instead of using a pause.
- Using open-ended clarification when a multiple-choice question would have preserved routing discipline.
- Continuing the chain after the design doc has been written instead of treating that point as an end node.
- Repeating the full logic of a child skill inside the router instead of making a clean handoff.
- Treating `chromosome-3d-idea-to-model` as the only skill and never using the modular path when the user needs depth at one specific stage.
