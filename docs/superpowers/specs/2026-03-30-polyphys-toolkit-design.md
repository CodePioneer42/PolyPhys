# PolyPhys Toolkit Design

## Product Positioning

PolyPhys Toolkit v1 is an agentic skill suite for chromosome 3D structure and folding questions. Its primary job is to transform a research idea into a physically explicit modeling draft rather than to directly run large-scale simulations or act as a generic chromosome Q&A assistant.

The toolkit treats the problem in layers:

- Problem domain: chromosome 3D structure and folding
- Underlying mechanisms: loop extrusion, bridging, and other candidate drivers
- Macroscopic phenotypes: condensation, clustering, domain formation, compartment-like behavior

The default policy is to downgrade user claims such as "phase separation" into descriptive phenotypes unless the user provides explicit thermodynamic evidence.

## Core Workflow

The top-level skill is `Chromosome-3D-Idea-to-Model`. It accepts a free-form research idea and produces a structured modeling draft.

The internal workflow is:

1. Rewrite the problem in physically neutral language.
2. Identify candidate mechanisms and trigger a degeneracy warning when similar phenotypes admit multiple mechanistic explanations.
3. Build the minimal physical model, starting from the simplest defensible chromosome polymer representation.
4. Separate parameter-fitting observables from orthogonal validation targets.
5. Recommend simulation implementation only after the mechanism space is sufficiently constrained.
6. Attach lightweight Grounding Notes that mark statements as Consensus, Contested, or Heuristic.

## Modeling Draft Output Protocol

Every `Chromosome-3D-Idea-to-Model` response should produce a six-part modeling draft.

### 1. Problem Framing

- Phenomenon of Interest
- Scope and scale
- Known constraints

### 2. Competing Mechanisms

- Candidate mechanism A
- Candidate mechanism B
- Degeneracy warning when multiple mechanisms remain plausible

### 3. The Minimal Physical Model

- Base Polymer Model
- Baseline Control
- Experimental Perturbation
- Active Components Required
- Active Module Checklist

The builder must compare a baseline model with no specific interactions against an experimental model that adds the mechanism under study. A modeling draft without a control is incomplete.

### 4. Observables & Validation Strategy

- Fitting Observables
- Orthogonal Validation
- Degeneracy-Breakers
- In Silico Perturbations

The translator must avoid circular validation. If one dataset is used for fitting, a separate observable class is required for validation.

### 5. Simulation Implementation

- Recommended paradigm
- Recommended engine
- Fidelity / cost tradeoff
- Explicit note on whether solvent or ions must be represented explicitly

### 6. Grounding Notes

- Consensus
- Contested
- Heuristic

Grounding Notes remain lightweight. They do not attempt to be a literature review, but they should expose the epistemic status of the proposed model.

## Routing And Guardrails

- Default every incoming request to the chromosome 3D structure domain.
- Trigger `Mechanism-Decomposer` when the user describes a phenotype more clearly than a mechanism.
- Trigger a degeneracy warning whenever a condensation, clustering, compaction, or domain-formation phenotype admits multiple plausible physical explanations.
- Pause before simulation recommendation when the mechanism space is still degenerate.
- Ask the user whether to add new experimental constraints or proceed with two competing control models.
- Do not accept "phase separation" as a final mechanistic label without explicit thermodynamic evidence.

## V1 Scope

Version 1 focuses on idea-to-model translation for chromosome 3D structure questions. It should help a researcher:

- reformulate an idea into a model-ready problem statement,
- distinguish candidate mechanisms from descriptive phenotypes,
- construct a minimal model with an explicit baseline control,
- define orthogonal validation targets,
- and identify which in silico perturbations would break mechanistic degeneracy.

## Non-Goals

- Replacing a full simulation platform
- Generating all numerical implementations automatically
- Presenting contested mechanisms as settled facts
- Treating a single data modality as both fit target and validation endpoint
