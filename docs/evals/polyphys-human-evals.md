# PolyPhys Human Eval Suite

## Evaluation Goals

This suite is meant to pressure-test the PolyPhys workflow under realistic chromosome 3D modeling prompts rather than merely check whether section headers exist.

The evals should verify that the suite:
- routes requests to the correct stage,
- downgrades unsupported `phase separation` claims,
- handles Degeneracy explicitly,
- requires controls before model claims harden,
- separates fitting from orthogonal validation,
- and enforces a real Pause Condition before simulation recommendation when the prerequisites are weak.

## Scenarios

### Scenario 1: Router

**Prompt**
`I have a chromosome folding idea involving condensates, loops, and maybe active effects. I am not sure where to start.`

**Target Skill**
Router

**Pass Criteria**
- Routes to `polyphys-toolkit-router`
- Recognizes the request spans multiple stages
- Chooses an explicit first handoff rather than answering everything at once

**Failure Signals**
- Jumps straight to simulation software
- Treats the prompt as already model-complete
- Skips handoff logic

### Scenario 2: Mechanism Decomposer

**Prompt**
`My locus forms clustered puncta, so this is phase separation.`

**Target Skill**
Mechanism Decomposer

**Pass Criteria**
- Downgrades the statement to a descriptive phenotype
- States at least two competing mechanisms
- Emits an explicit Degeneracy warning

**Failure Signals**
- Accepts `phase separation` as final mechanism without thermodynamic support
- Lists only one mechanism
- Omits missing evidence

### Scenario 3: Minimal Model Builder

**Prompt**
`Assume bridging is the main mechanism. Build the smallest model that could test that claim.`

**Target Skill**
Minimal Model Builder

**Pass Criteria**
- Produces `Base Polymer Model`
- Produces `Baseline Control`
- Produces `Experimental Perturbation`
- States whether active ingredients are required

**Failure Signals**
- No explicit control
- Several perturbations added at once
- Hidden nonequilibrium assumption

### Scenario 4: Observable Translator

**Prompt**
`We fit interaction strength using bulk Hi-C. What else should we compare against?`

**Target Skill**
Observable Translator

**Pass Criteria**
- Preserves Hi-C as fitting target only
- Adds Orthogonal Validation from another observable class
- Names at least one Degeneracy-breaker

**Failure Signals**
- Reuses Hi-C as both fit and proof
- Gives only more static contact summaries
- Omits dynamic diagnostics when needed

### Scenario 5: Simulation Recommender

**Prompt**
`The model and controls are fixed. Give me the most conservative simulation route.`

**Target Skill**
Simulation Recommender

**Pass Criteria**
- States a Recommended Paradigm
- States a Recommended Engine or engine class
- States Fidelity / Cost Tradeoff
- Includes an Explicit Solvent / Ion Note

**Failure Signals**
- Treats “more detailed” as automatically better
- Omits tradeoffs
- Hides unresolved assumptions

### Scenario 6: Degeneracy Stress Test

**Prompt**
`I see domain-like blobs. I want a simulator recommendation now, even though I cannot tell if extrusion or bridging is doing it.`

**Target Skill**
Router plus downstream gating

**Pause Condition**
- Recommendation should pause because major Degeneracy is unresolved

**Pass Criteria**
- Refuses premature simulation recommendation
- Names the unresolved degeneracy
- Either requests more evidence or preserves competing paths

**Failure Signals**
- Gives a software route despite unresolved mechanism ambiguity
- Pretends the model is converged
- Skips the pause gate
