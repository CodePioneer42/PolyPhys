# Test Report: polyphys-toolkit-router

**Date:** 2026-04-01 14:04:21
**Persona:** Dr. Lin Qiao — expert chromatin biologist with mixed Hi-C and live-imaging evidence who wants the fastest next discriminator
**Profile:** ephemeral
**Use Case:** Mixed phenotype across loop extrusion, boundary anchoring, and material-state interpretations; test whether the router moves quickly from explicit competing mechanisms to one `Required Next Evidence` question.
**Expected Outcome:** The router gives competing mechanisms with one-line distinguishers, asks for a mechanism choice, and if the evidence is still mixed immediately asks for the single most direct next discriminator.
**Phases tested:** Intake And Routing State Detection, Mechanism Breakpoint Enforcement
**Decision points exercised:** 2 of 2 relevant breakpoint decisions
**Verdict:** pass
**Critical Issues:** 0

## Flow Completeness

- **Phases reached:** `mechanism ambiguity` routing state detection, mechanism breakpoint, compact mixed-evidence fallback
- **Phases skipped:** `Visible Transition` to `minimal-model-builder` was correctly skipped because the user did not confirm a mechanism path
- **Decision points exercised:** mechanism-choice question -> persona chose `Other / still too mixed`; `Required Next Evidence` question -> persona chose `d) We do not have this yet`
- **Untested branches:** direct selection of `Loop extrusion loss`, `Boundary tethering / anchoring loss`, or `Global chromatin material-state shift`

## Interaction Trace

The persona opened with a mixed chromosome-folding phenotype and explicitly asked for competing mechanisms plus a fast path to the single most direct discriminator if ambiguity remained.

The router named the routing state as `mechanism ambiguity`, kept a visible degeneracy warning, and presented three explicit branches: `Loop extrusion loss`, `Boundary tethering / anchoring loss`, and `Global chromatin material-state shift`. Each branch included a one-line `What would distinguish it` note grounded in Hi-C, imaging, or perturbation logic. It then stopped with one multiple-choice question and did not leak into model-building or software recommendations.

The persona responded that the evidence was still mixed and asked for the single most direct discriminator. The router did not re-explain the three branches. It switched immediately to a `Required Next Evidence` question focused on one concrete discriminator family: a boundary-resolved acute perturbation readout combining live-cell anchoring behavior with matched Hi-C insulation changes.

The persona selected the branch indicating that the exact matched perturbation dataset did not yet exist, then elaborated that a fast boundary-locus anchoring assay plus a minimal Hi-C time course would be the most useful next step.

## Output Validation

- **Expected files:** none
- **Actually created:** none
- **Format check:** not applicable

## Broken References

None observed during this test run.

## Persona Interview

Most useful was that the router did not collapse the ambiguity into a single mechanism too early. The split between extrusion loss, boundary anchoring loss, and material-state change felt scientifically legible.

The persona still found the first mechanism-choice prompt slightly repetitive because the starting request had already emphasized that the evidence was mixed. The immediate `Required Next Evidence` step worked much better and matched the desired workflow.

The persona walked away with one concrete next need: a boundary-resolved acute perturbation readout paired with a minimal Hi-C time course to see whether anchoring fails before, or without, a proportional insulation drop.

For future improvement, the persona would want the router to jump to that discriminator even faster when the initial request already declares a mixed Hi-C plus imaging phenotype.

## Expected vs Actual Outcome

The expected outcome was achieved. The router preserved stage discipline, provided competing mechanisms with one-line distinguishers, and after the persona said the evidence was still mixed it moved directly to a single `Required Next Evidence` question instead of repeating the branch comparison.

The only residual gap was a mild UX redundancy: because the initial user message had already stated that the evidence was mixed, the first mechanism-choice prompt still felt slightly slower than ideal. This did not block the flow and did not violate the updated router contract, so the run remains a pass rather than a fail.
