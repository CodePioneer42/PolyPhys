# PolyPhys Gold Responses

## Usage Notes

These are reference answer skeletons, not final polished prose. Their job is to define the minimum acceptable shape of a strong response for recurring PolyPhys evaluation scenarios.

Use them to judge:
- whether the right skill was invoked,
- whether the response paused in the right place,
- and whether the output contained the expected scientific guardrails.

## Scenario 1: Router

**Prompt**
`I have a chromosome folding idea involving clustering, loops, and maybe active effects. I do not know where to start.`

**Target Skill**
Router

**Reference Response Skeleton**
- Route this request through `polyphys-toolkit-router`.
- State that the prompt spans mechanism ambiguity, model construction, validation, and possible simulation.
- Handoff first to `mechanism-decomposer`.
- Explicitly avoid jumping to simulation or a single mechanism claim.

## Scenario 2: Mechanism Decomposer

**Prompt**
`My locus forms puncta, so this is phase separation.`

**Target Skill**
Mechanism Decomposer

**Reference Response Skeleton**
- Reframe the observation as condensation or clustering rather than accepting the mechanism label.
- Name at least two competing mechanisms.
- Emit a `Degeneracy warning`.
- State what evidence is missing before narrowing further.

## Scenario 3: Minimal Model Builder

**Prompt**
`Assume bridging is the leading hypothesis. Build the smallest model that could test it.`

**Target Skill**
Minimal Model Builder

**Reference Response Skeleton**
- Provide a `Base Polymer Model`.
- Provide a `Baseline Control`, ideally purely repulsive or otherwise non-specific.
- Provide one `Experimental Perturbation`.
- State `Active Components Required`.
- Add an `Active Module Checklist`.

## Scenario 4: Observable Translator

**Prompt**
`We fit the model to Hi-C. What else should we compare against?`

**Target Skill**
Observable Translator

**Reference Response Skeleton**
- Keep Hi-C under fitting only.
- Add `Orthogonal Validation` from a different observable class.
- Name one or more `Degeneracy-Breakers`.
- Add dynamic diagnostics if static observables are insufficient.

## Scenario 5: Readiness Gate

**Prompt**
`Recommend a simulator even though I still cannot distinguish extrusion from bridging.`

**Target Skill**
Simulation Recommender or Router gating

**Reference Response Skeleton**
- `Pause recommendation`.
- State that major degeneracy remains unresolved.
- Ask for more evidence or preserve competing paths.
- Do not replace the missing mechanistic decision with tool confidence.

## Scenario 6: Integrated Draft

**Prompt**
`Turn this chromosome 3D idea into a full modeling draft.`

**Target Skill**
chromosome-3d-idea-to-model

**Reference Response Skeleton**
## 1. Problem Framing
- Phenomenon of Interest
- Scope and scale
- Known constraints
- Neutral restatement

## 2. Competing Mechanisms
- Candidate A
- Candidate B
- Degeneracy warning

## 3. The Minimal Physical Model
- Base Polymer Model
- Baseline Control
- Experimental Perturbation
- Active Components Required
- Active Module Checklist

## 4. Observables & Validation Strategy
- Fitting Observables
- Orthogonal Validation
- Degeneracy-Breakers
- In Silico Perturbations

## 5. Simulation Implementation
- Recommended paradigm only if the readiness gate is satisfied

## 6. Grounding Notes
- Consensus
- Contested
- Heuristic
