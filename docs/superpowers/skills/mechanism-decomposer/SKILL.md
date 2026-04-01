---
name: mechanism-decomposer
description: Use when a chromosome 3D structure prompt mixes phenotype language with possible mechanisms and needs explicit degeneracy handling before model construction.
---

# Mechanism Decomposer

## Overview
Separate descriptive chromosome 3D phenotypes from candidate physical mechanisms before any model is built. The core job is not to pick a winner too early, but to expose when one phenotype can emerge from multiple mechanistic stories and to say what evidence is still missing.

Treat `phase separation` as a risky shortcut label. Unless the prompt includes explicit thermodynamic evidence, rewrite it as a descriptive phenotype such as condensation, clustering, compaction, or domain formation.

## When to Use
- A chromosome 3D prompt describes a visible phenotype more clearly than its underlying mechanism.
- The user jumps straight from a phenotype to a mechanism claim, especially around `phase separation`.
- Multiple mechanisms could plausibly explain the same structure, localization pattern, or contact-map feature.
- The next step depends on whether the problem should branch into competing models or request more evidence first.

Do not use this skill to build the full physical model, define observables in detail, or recommend simulation software. Hand off after decomposition is complete.

## Workflow
1. Normalize the prompt into a chromosome 3D problem statement with phenotype-first wording.
2. Extract candidate mechanisms without assuming they are mutually exclusive or equally supported.
3. Emit a `Degeneracy Warning` whenever at least two mechanisms can explain the same phenotype.
4. Write `Competing Hypotheses` in plain physical terms rather than software or assay jargon.
5. State the `Required Next Evidence` that would reduce degeneracy.
6. Use `one multiple-choice question per message` when one ambiguity still blocks decomposition.
7. Finish with a `Routing Decision` that says whether to ask for more constraints or proceed to parallel model construction.
8. Treat a coherent decomposition package as a `decomposition end node` unless an explicit handoff is the active task.

## Checklist
- Normalize the prompt into phenotype-first language before naming mechanisms.
- Emit a `Degeneracy Warning` whenever more than one mechanism remains plausible.
- Write `Competing Hypotheses` in physical terms rather than software labels.
- Name the single most useful `Required Next Evidence`.
- Use a multiple-choice format with `2-4` options plus `Other` when clarification is still active.
- Do not handoff to model building until the competing hypotheses are coherent enough to compare.

## Workflow State Machine
### State 1: Phenotype Normalization
- Rewrite the prompt as a chromosome 3D phenotype question.
- Downgrade unsupported `phase separation` language.
- Exit gate: the phenotype is described neutrally and the mechanism claim is no longer smuggled in.

### State 2: Mechanism Decomposition
- Extract candidate mechanisms and write `Competing Hypotheses`.
- Make the degeneracy explicit.
- Use a multiple-choice question when one blocked ambiguity can be narrowed cleanly.
- Exit gate: at least two plausible hypotheses are stated or the prompt is narrow enough to ask one targeted question.

### State 3: Evidence And Routing Readiness
- State the `Required Next Evidence` and the `Routing Decision`.
- Keep the output at the decomposition layer instead of drifting into full model construction.
- Treat a coherent decomposition package as a `decomposition end node` when no explicit downstream handoff is requested.
- Exit gate: the next step is either one clarifying question, a clean route to model building, or the decomposition end node.

## After This Stage
- If ambiguity remains high, ask one question.
- If competing hypotheses are coherent, handoff to `minimal-model-builder`.
- If the decomposition is complete, end the conversation and wait for a new explicit request.
- If the prompt still confuses phenotype and mechanism, stay in decomposition mode and do not route forward.

## Self-Review
- `stage completeness`: are phenotype normalization, competing hypotheses, evidence, and routing all present?
- `unsupported leaps`: did the response jump from phenotype to one favored mechanism too early?
- `degeneracy discipline`: was ambiguity made explicit rather than implied?
- `routing readiness`: is the next step narrow enough to justify a handoff?
- `scope control`: did the skill avoid drifting into full model design?
- `question format`: did clarification stay in multiple-choice form unless forced otherwise?
- `end-node discipline`: did the skill stop at the decomposition end node when the stage was complete?

When clarification is still active, use `one multiple-choice question per message`.

Default question format:
- Ask a multiple-choice question with `2-4` concrete options.
- Include `Other` as the final option.
- Only use open-ended clarification when the ambiguity cannot be discretized honestly.

## Output Protocol
Every response should use the following structure.

### Problem Domain
- Chromosome 3D structure or folding question
- Scope or scale if known

### Phenotype Normalization
- User language rewritten as descriptive phenotype
- Explicit downgrade of unsupported `phase separation` language unless thermodynamic evidence is present

### Candidate Mechanisms
- Mechanism candidate A
- Mechanism candidate B
- Optional additional mechanism candidates

### Competing Hypotheses
- Hypothesis 1 in physical terms
- Hypothesis 2 in physical terms
- Why both remain plausible

### Degeneracy Warning
- Explicit statement that the current phenotype does not uniquely identify one mechanism
- Short note on the risk of over-interpreting the current evidence

### Required Next Evidence
- The most useful experimental or conceptual constraint needed next
- Whether the missing evidence is thermodynamic, structural, dynamic, or perturbational

### Routing Decision
- Ask for more evidence before further narrowing, or
- Proceed with two competing control models if the user prefers theory-first exploration

## Quick Reference
| Situation | Required response |
| --- | --- |
| User says `phase separation` with no thermodynamic evidence | Rewrite as condensation, clustering, or domain formation and mark the mechanism label as unproven |
| Same phenotype can arise from extrusion and bridging | Emit `Degeneracy Warning` and write both as `Competing Hypotheses` |
| Evidence is mostly static structure data | Mark dynamic or perturbational evidence as `Required Next Evidence` |
| User wants one answer immediately | State the ambiguity first, then offer a `Routing Decision` between more evidence and two competing control models |
| Mechanism language is vague but phenotype is clear | Stay in decomposition mode and do not jump ahead to full model construction |

## Common Mistakes
- Treating `phase separation` as a settled mechanism without thermodynamic evidence.
- Translating one phenotype directly into one mechanism with no `Competing Hypotheses` section.
- Using software choices or favorite literature labels instead of physical mechanism statements.
- Skipping the `Degeneracy Warning` even when two mechanisms obviously remain plausible.
- Asking for generic “more data” instead of naming the `Required Next Evidence`.
- Building a full model before issuing a clear `Routing Decision`.
