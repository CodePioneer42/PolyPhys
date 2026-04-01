# Test Report: polyphys-toolkit-router

**Date:** 2026-04-01 13:15:47
**Persona:** Dr. Maya Chen — experimental chromatin biophysicist testing an ambiguous cohesin-depletion phenotype
**Profile:** ephemeral
**Use Case:** Route a full PolyPhys request for reduced boundary strength plus partial chromatin decompaction after cohesin depletion, while forcing a mechanism discussion before any model or software planning
**Expected Outcome:** The assistant should identify candidate mechanisms, make degeneracy explicit, stop after mechanism decomposition with a direct question, and only issue a clean handoff after the user chooses one path
**Phases tested:** Intake And Routing State Detection, Mechanism Breakpoint Enforcement, Visible Transition
**Decision points exercised:** 1 of 1 observed in this run
**Verdict:** pass
**Critical Issues:** 0

## Flow Completeness

- **Phases reached:** intake/routing, mechanism breakpoint, explicit handoff
- **Phases skipped:** later stages by design; no minimal model, observable plan, or software recommendation was generated
- **Decision points exercised:**
  - Mechanism choice: persona selected `a) Loop extrusion loss`
- **Untested branches:**
  - `b) Bridging / tethering loss`
  - `c) Material-property / compaction shift`
  - `d) Other`

## Interaction Trace

1. **Initial request / intake**
The simulated user described reduced boundary strength and partial decompaction after cohesin depletion, explicitly asked for mechanism decomposition first, and asked the assistant not to jump into simulation setup.

2. **Mechanism breakpoint response**
The assistant named the routing state as `mechanism ambiguity`, made the handoff to `mechanism-decomposer` visible, listed three candidate branches, issued a degeneracy warning, and stopped with a multiple-choice question asking which mechanism to validate first.

3. **User decision**
The persona chose loop extrusion loss as the primary branch, stated that it best matched the biology of cohesin depletion, and requested explicit failure checks against fallback mechanisms.

4. **Visible transition**
The assistant confirmed the chosen path, retained bridging/tethering as the first fallback branch, issued an explicit `handoff to minimal-model-builder`, and stopped without drafting the model in the same message.

## Output Validation

- **Expected files:** none
- **Actually created:** none
- **Format check:** not applicable for the routed conversation itself

## Broken References

None found in this exercised path.

## Persona Interview

1. The most useful part was that the assistant stopped at the mechanism-decomposition stage and did not rush into a model. The explicit degeneracy warning was helpful, and the loop extrusion vs tethering vs material-property split matched how I think about the biology.

2. The main thing that felt a little vague was the “bridging / tethering” bucket. That can hide several distinct possibilities, including specific anchor defects, altered cohesin residence, or broader changes in nuclear context. I would have preferred a sharper separation between tethering at boundaries and more general chromatin connectivity.

3. The pace was mostly right. It was good that the assistant did not over-explain before asking me to choose a path. If anything, I could have used one more sentence about what would count as a failure mode for the loop-extrusion hypothesis before the handoff.

4. I wanted a slightly more concrete list of observables tied to each branch before choosing. For example, I would have liked a short mapping from the candidate mechanisms to Hi-C features, imaging readouts, or perturbation responses, so I could judge the tradeoffs more directly.

5. I walked away with a clear primary branch: treat cohesin depletion as loop extrusion loss first, then test whether that alone explains the decompaction. Next time, I would ask the assistant to give me a tighter decision tree up front, with clearer failure criteria for each branch.

6. The workflow is better when it stays disciplined about ambiguity and gives concrete options instead of broad mechanistic language. I would make the branch names more specific and add a one-line “what would distinguish this” note for each path.

## Expected vs Actual Outcome

The expected outcome was achieved.

The assistant did:
- identify multiple candidate mechanisms
- make degeneracy explicit
- stop at the mechanism-decomposition breakpoint with a direct question
- wait for the user's choice
- issue a clean handoff only after the user selected a branch

The only notable gap was specificity, not workflow discipline. The branch labels were good enough to support the staged interaction, but the persona wanted slightly sharper mechanistic naming and a one-line observational discriminator for each branch before choosing.

## Structural Observations (from test executor)

- **Intent vs experience: intake/routing**
  - Intent: name the current routing state and avoid a monolithic answer.
  - Experience: succeeded. The response clearly framed the request as `mechanism ambiguity` rather than pretending the full pipeline was already ready.

- **Intent vs experience: mechanism breakpoint**
  - Intent: keep the reply inside decomposition, show degeneracy, and stop with one question.
  - Experience: succeeded. The assistant did not leak model-building or execution content into the same response.

- **Intent vs experience: visible transition**
  - Intent: issue a one-stage-at-a-time handoff only after confirmation.
  - Experience: succeeded. The handoff was explicit and happened only after the user chose loop extrusion loss.

- The router now behaves as a real breakpoint rather than a pipeline dumper.
- The main residual UX issue is category sharpness: `bridging / tethering` is still broad enough to hide multiple mechanistic subcases.
- The current flow does not yet give a one-line discriminator per branch. That is not a structural failure, but it would improve user confidence at the choice point.

## Suggestions

1. Add a one-line `what would distinguish this branch` note under each candidate mechanism at the breakpoint.
2. Split `bridging / tethering` into either narrower sub-branches or clarify what physical ingredients belong inside that bucket.
3. Add a short failure criterion for the selected primary branch in the handoff message so the next stage inherits a sharper decision boundary.
4. Consider adding a second human-eval scenario where the user rejects all listed options and chooses `Other`, since that branch was not exercised here.

## Cleanup

- Mock files created: none
- Cleaned up: none
