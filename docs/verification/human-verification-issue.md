# Human Verification Test Plan

## Goal

Verify that the current PolyPhys Toolkit design produces scientifically disciplined modeling drafts for chromosome 3D structure ideas.

## Preconditions

- Read the design doc in `docs/superpowers/specs/2026-03-30-polyphys-toolkit-design.md`.
- Prepare one chromosome 3D idea that is mechanism-rich and one that is mechanism-ambiguous.
- Confirm the reviewer understands the distinction between phenotype, mechanism, and validation target.

## Test Scenarios

1. Submit an idea described with phenotype-heavy language such as clustering or condensation and verify the response downgrades unsupported "phase separation" claims.
2. Submit an idea with at least two plausible mechanisms and verify a degeneracy warning appears together with competing hypotheses.
3. Inspect the minimal model section and verify it includes both a baseline control and an experimental perturbation.
4. Inspect the validation section and verify orthogonal validation targets differ from fitting observables.
5. Inspect the validation section and verify at least one in silico perturbation is proposed to break degeneracy.
6. Inspect the simulation section and verify implementation advice is deferred when the mechanism space remains unresolved.

## Acceptance Criteria

- The modeling draft uses descriptive phenotypes before naming mechanisms.
- The draft identifies competing mechanisms when the input is degenerate.
- The minimal model includes an explicit baseline control.
- The validation strategy includes orthogonal validation rather than circular reuse of fitting data.
- The simulation recommendation does not overcommit when major mechanistic ambiguity remains.

## Reporting Notes

Record which sections passed, which assumptions were too vague, and whether the draft felt like a proposal-quality starting point for a chromosome modeling discussion.
