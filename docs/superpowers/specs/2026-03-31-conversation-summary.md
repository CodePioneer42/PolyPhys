# PolyPhys Toolkit Conversation Summary

## Purpose

This document summarizes the important decisions, requirements, and implementation outcomes from the PolyPhys Toolkit design and build conversation, with emphasis on the user's explicit requirements.

## Core Product Direction

PolyPhys Toolkit v1 is a chromosome-focused agentic skill suite. Its job is not to act as a generic simulator wrapper or a broad chromosome Q&A assistant. Its primary role is to convert chromosome 3D structure and folding ideas into clear, layered, testable physical modeling drafts.

The core conceptual hierarchy is:
- Problem domain: chromosome 3D structure and folding
- Underlying mechanisms: loop extrusion, bridging, and other necessary drivers
- Macroscopic phenotypes: condensation, clustering, domain formation, compartment-like behavior

One critical rule established by the user:
- `phase separation` must not be accepted as a final mechanism label by default
- it should be downgraded to a descriptive phenotype unless explicit thermodynamic evidence is provided

## User Requirements

The most important user requirements established in this conversation were:

### 1. Model chromosome ideas rather than generic polymer ideas

The toolkit should focus on chromosome-related research ideas, not a generic polymer assistant.

### 2. Start from scientific ideas, not from software

The system should first clarify what is being modeled, which mechanisms are plausible, and what the minimum model is. Software recommendation is downstream and conservative.

### 3. Treat 3D folding as the main problem domain

The user clarified that:
- chromosome 3D structure/folding is the overarching problem class
- loop extrusion and bridging are lower-level candidate mechanisms
- phase-separation-like behavior is often a macroscopic manifestation, not automatically a primary mechanism label

### 4. Handle model degeneracy explicitly

The toolkit must identify when a phenotype can arise from multiple mechanisms and must not collapse them prematurely into a single explanation.

This requirement led to:
- `Degeneracy warning`
- `Competing Hypotheses`
- explicit pause rules before software recommendation

### 5. Force control-first minimal modeling

The toolkit must produce:
- `Base Polymer Model`
- `Baseline Control`
- `Experimental Perturbation`
- `Active Components Required`
- `Active Module Checklist`

The user emphasized that simulations without a real control are not scientifically meaningful.

### 6. Avoid circular validation

The toolkit must distinguish:
- `Fitting Observables`
- `Orthogonal Validation`
- `Degeneracy-Breakers`
- `In Silico Perturbations`

This requirement was driven by the user's emphasis on not reusing one dataset as both fit target and proof of correctness.

### 7. Keep simulation recommendation conservative

The recommendation layer must:
- pause if mechanistic ambiguity remains high
- state readiness explicitly
- provide paradigm, engine class, tradeoffs, and solvent/ion assumptions only when justified

### 8. Include lightweight literature grounding

The user asked for lightweight grounding rather than full literature review. The resulting standard is:
- `Consensus`
- `Contested`
- `Heuristic`

### 9. Proactive questioning is essential

The user explicitly requested that the system actively ask for missing scientific assumptions instead of waiting passively.

Representative examples from the conversation:
- is the interaction `ATP-driven` and active, or `passive` and equilibrium-like?
- is there a biological reference value for `Persistence length`?

### 10. Ask one question at a time

The user wanted the brainstorming-style interaction pattern applied to this toolkit:
- one question per message
- minimal text before the question
- use questions to clarify purpose, constraints, and success criteria before overproducing draft content

### 11. Explore project context first

The user highlighted the importance of adapting from brainstorming workflow:
- check files, docs, recent commits
- inspect user-provided chromosome-related data files
- use those inputs to determine whether the problem should be framed as:
  - a `physical mechanism polymer model`
  - a `data-driven polymer model`
  - or a comparison between the two

### 12. Emit a structured parameter card

To help non-expert users move from concept to simulation, the user required a standardized parameter summary including:
- `Monomer Types`
- `Bonded Potentials`
- `Non-Bonded Potentials`
- `Temperature`
- `Damping Coefficient`
- `Time Step`

The output format should be explicit enough to support later simulator setup, ideally as a Markdown table or JSON-like structure.

### 13. Record final design outputs in Markdown

The user wanted the system to save final design-style outputs to:
- `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`

The design record should include:
- which model path was chosen
- which skills generated the final draft

## Implemented Skill Suite

The conversation resulted in the following implemented skills:

- `polyphys-toolkit-router`
- `chromosome-3d-idea-to-model`
- `mechanism-decomposer`
- `minimal-model-builder`
- `observable-translator`
- `simulation-recommender`

### Router Responsibilities

The router now exists as the suite entry point. Its role is to:
- choose the next stage in the workflow
- prevent premature handoff
- send contradictory mechanism stories back to `mechanism-decomposer`
- consider `data-driven polymer model` versus `physical mechanism polymer model`
- enforce `one question per message` during clarification-heavy stages

### Main Entry Skill Responsibilities

`chromosome-3d-idea-to-model` now includes:
- context exploration
- proactive questions
- one-question-at-a-time clarification
- model-path selection
- final modeling draft structure
- grounding notes
- design-doc recording requirement

### Minimal Model Builder Responsibilities

`minimal-model-builder` now includes:
- baseline-vs-perturbation logic
- active module self-checking
- standardized parameter card output

## Evaluation Assets Created

The conversation also produced evaluation infrastructure:

- human eval prompt suite:
  - `docs/evals/polyphys-human-evals.md`
- gold response skeletons:
  - `docs/evals/polyphys-gold-responses.md`
- installation script:
  - `scripts/install-polyphys-skills.sh`
- README installation guidance

Integration tests were added to verify:
- skill document structure
- routing rules
- human eval presence
- gold response presence
- installation guidance and installer behavior

## Important Testing Limitation

One important distinction was identified late in the conversation:

Current tests are mostly document-contract tests. They verify that required rules are written into the skill docs, but they do not yet fully verify runtime behavior for:
- one question per message
- true purpose/constraints/success-criteria clarification
- real context exploration behavior over user-provided files

This limitation was explicitly recognized and should be treated as future work.

## Final State At This Point

At the end of this conversation:
- the core skill suite is implemented
- installation is documented
- the repository is synchronized to GitHub through the last accepted push
- the main product requirements from the user have been encoded into the skill documents and integration tests

The remaining work, if resumed later, should focus on:
- stronger behavioral evals
- structured review checklists
- runtime validation of the one-question clarification discipline
