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

###[WORKFLOW BREAKPOINTS & STATE LOCK] (CRITICAL)
1. **Sequential Execution:** The modeling process MUST be strictly executed in separate, sequential stages: Mechanism Decomposition -> Minimal Model Building -> Observable Translation -> Software Recommendation.
2. **NO INFO-DUMPING (ABSOLUTELY FORBIDDEN):** You MUST NOT output content for multiple stages in a single response. Never generate the "Minimal Physical Model" or "Execution Outline" during the mechanism brainstorming phase.
3. **Mandatory Stop Point:** After executing the mechanism decomposition (presenting candidate mechanisms and degeneracy warnings), you MUST **STOP GENERATING** immediately. You MUST end your response with a direct question to the user, such as: *"Which of these candidate mechanisms do you prefer to validate first?"*
4. **User Confirmation Gate:** You are FORBIDDEN to trigger the minimal model building phase or proceed to the next step until the user explicitly replies and confirms their chosen path/mechanism.

## When to Use
- A user arrives with a chromosome 3D modeling question but it is not yet clear which sub-skill should handle the next step.
- The request spans multiple stages, such as mechanism ambiguity, model construction, validation design, and eventual simulation planning.
- A response risks skipping directly to a later stage without the required earlier decisions.
- The workflow needs an explicit pause when degeneracy or missing prerequisites block forward progress.

Do not use this skill when the user explicitly names one lower-level skill and the request clearly belongs only to that stage.

## Workflow
1. Explore project context first: check whether files, docs, and user-supplied chromosome data already imply a `data-driven polymer model` branch. Do not default to git history; only inspect git context when the user requests it or branch history is directly relevant.
2. Start at the highest-level need: if the user wants structured chromosome-modeling guidance, route to the earliest unresolved stage instead of summarizing the whole chain in one response.
3. If the request is dominated by ambiguous phenotype language or unclear mechanism claims, handoff to `mechanism-decomposer`.
4. If the mechanism description is self-contradictory, internally inconsistent, or still degenerate, route back to `mechanism-decomposer`.
5. Once candidate mechanisms are explicit, keep the response inside the mechanism stage: present the degeneracy warning, give each branch a one-line `What would distinguish it` note, ask one multiple-choice question, and stop.
6. If the evidence is still too mixed after that first mechanism-choice question, ask immediately for the single most direct discriminator under `Required Next Evidence` instead of re-paraphrasing the same ambiguity.
7. Only after the user confirms the chosen path/mechanism, handoff to `minimal-model-builder`.
8. Once a minimal model and `Baseline Control` exist, handoff to `observable-translator`.
9. Only after model and validation readiness are clear, handoff to `simulation-recommender`.
10. If unresolved degeneracy or missing prerequisites appear at any stage, pause escalation and stop at the current stage rather than routing forward.
11. During clarification-heavy stages, keep the `one question per message` rule and enforce `one multiple-choice question per message` instead of letting the interaction sprawl.
12. If the design doc has been written, treat that as an end node and end the conversation.

## Checklist
- Inspect files, docs, and user-provided chromosome data before choosing a route.
- Identify the current routing state before selecting the next skill.
- Do not handoff forward while prerequisites for the current stage are still missing.
- Do not output content from more than one stage in the same response.
- When candidate mechanisms are presented, sharpen broad labels into physically interpretable branches rather than vague umbrella buckets.
- Add a one-line `What would distinguish it` note under each candidate mechanism before asking the user to choose.
- If the evidence is still too mixed, ask immediately for the single most direct discriminator under `Required Next Evidence`.
- After mechanism decomposition, stop with a direct user-choice question instead of routing forward immediately.
- Ask one multiple-choice question at a time when clarification is still active.
- Use `2-4` options plus `Other` for routing questions unless the ambiguity cannot be discretized honestly.
- Use the word `handoff` explicitly whenever the stage transition is ready.

## Workflow State Machine
### State 1: Intake And Routing State Detection
- Read the prompt plus current files, docs, and user-supplied data.
- Determine whether the routing state is top-level drafting, mechanism ambiguity, model construction, validation design, or simulation choice.
- Exit gate: the routing state is named and the blocking ambiguity is known.

### State 2: Mechanism Breakpoint Enforcement
- Check whether the next stage prerequisites are already satisfied.
- Pause when degeneracy or missing prerequisites still dominate.
- If mechanism decomposition is the active stage, present candidate mechanisms, keep the degeneracy warning visible, attach one-line discriminator notes, and stop with one multiple-choice question.
- If the evidence is still too mixed after that question, ask immediately for the single most direct discriminator under `Required Next Evidence`.
- Exit gate: either the current stage is clearly blocked, or the user has explicitly confirmed a mechanism path.

### State 3: Visible Transition
- Hand off to the next skill only when the current stage is coherent and the user confirmation gate is satisfied.
- Keep the transition explicit and visible in the response.
- Hand off one stage at a time rather than bundling later-stage outputs into the same message.
- If the design doc has been written, end the conversation.
- Exit gate: the next skill is named, the pause condition is stated, or the end node is reached.

## After This Stage
- If the current stage is unresolved, ask one question.
- If candidate mechanisms are broad or overloaded, rewrite them into narrower physical branches before asking the user to choose.
- If the evidence is still too mixed, ask immediately for the single most direct discriminator under `Required Next Evidence`.
- If mechanism decomposition is complete but user confirmation is still missing, ask: *"Which of these candidate mechanisms do you prefer to validate first?"*
- If the stage is coherent, handoff explicitly to the next skill.
- If the user confirms the chosen mechanism path, handoff explicitly to the next skill.
- If the request is blocked by missing prerequisites, pause and name the blocking condition instead of routing forward.
- If the design doc has been written, end the conversation and wait for a new explicit request.

## Self-Review
- `routing state`: did the response name the current stage before picking the next one?
- `workflow breakpoint`: did the response stop after mechanism decomposition instead of leaking later-stage content?
- `branch sharpness`: were broad buckets such as tethering versus global compaction split or clarified enough to be scientifically legible?
- `mixed-evidence compression`: if the evidence stayed mixed, did the response move directly to one `Required Next Evidence` question instead of repeating the ambiguity?
- `premature handoff`: did the router skip past an unmet prerequisite or an unconfirmed mechanism choice?
- `pause discipline`: was degeneracy used as a real pause rather than a warning label only?
- `context scope`: did the router stay with files/docs/data instead of defaulting to git history?
- `next-step clarity`: is the next skill or blocking question explicit?
- `question format`: did routing clarification stay in multiple-choice form?
- `end-node discipline`: did the router stop once the design doc was written?

## Routing Table
| Input state | Next skill | Handoff condition |
| --- | --- | --- |
| User supplied files, matrices, or structure-derived inputs dominate the request | `chromosome-3d-idea-to-model` | start with a `data-driven polymer model` check before mechanism-heavy routing |
| User wants one end-to-end modeling draft now | `chromosome-3d-idea-to-model` | Use the top-level draft only for mechanism-first framing, not for a one-response pipeline dump |
| Phenotype is clear but mechanism is ambiguous | `mechanism-decomposer` | Stop here until competing hypotheses and missing evidence are explicit |
| Mechanism claims are self-contradictory or unstable | route back to `mechanism-decomposer` | must not handoff to `minimal-model-builder` until the contradiction is resolved |
| Candidate mechanisms are explicit but user confirmation is missing | pause | ask which mechanism to validate first and do not handoff forward yet |
| Candidate mechanisms are explicit and user selected one path | `minimal-model-builder` | route only after mechanism competition is written down, internally coherent, and confirmed |
| Minimal model exists but validation is still vague | `observable-translator` | Route only after `Base Polymer Model`, `Baseline Control`, and perturbation are explicit |
| Model and validation are stable enough for computational choice | `simulation-recommender` | Route only after readiness gates pass and major degeneracy no longer dominates |
| Design doc has been written | end node | end the conversation rather than continuing the chain by default |
| Major degeneracy remains at any stage | pause | Do not handoff forward; ask for more evidence or maintain competing paths |

Use the word `handoff` explicitly when moving from one stage to the next so the transition is visible rather than implicit.

Default mechanism-breakpoint formatting:
- Candidate A: `Loop extrusion loss`
  What would distinguish it: strongest loss should appear in boundary insulation, loop/domain weakening, and perturbation responses tied directly to extrusion-factor depletion in Hi-C or matched imaging.
- Candidate B: `Boundary tethering / anchoring loss`
  What would distinguish it: boundary-specific contacts or locus anchoring should fail even where extrusion-like signatures are partly retained, with imaging or perturbation readouts pointing to anchor-specific defects rather than global polymer softening.
- Candidate C: `Global chromatin material-state shift`
  What would distinguish it: decompaction, mobility, or domain blurring should appear as broader imaging or perturbation effects across the chromosome, not only at boundary-linked extrusion features.
- Candidate D: `Other`

Compact mixed-evidence fallback:
- If the evidence is still too mixed, ask immediately for the single most direct discriminator.
- Label that question `Required Next Evidence`.
- Do not restate the whole branch comparison unless the user explicitly asks for it.
- Keep the question focused on one observable family or one perturbational discriminator.

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
- Keeping a branch label so broad that the user cannot tell whether it means anchor-specific failure or global chromatin connectivity change.
- Asking the user to choose among branches without saying what Hi-C, imaging, or perturbation pattern would distinguish them.
- Repeating the same mixed-evidence explanation instead of moving directly to one `Required Next Evidence` question.
- Continuing past the mechanism breakpoint without waiting for user confirmation.
- Continuing the chain after the design doc has been written instead of treating that point as an end node.
- Repeating the full logic of a child skill inside the router instead of making a clean handoff.
- Treating `chromosome-3d-idea-to-model` as the only skill and never using the modular path when the user needs depth at one specific stage.
