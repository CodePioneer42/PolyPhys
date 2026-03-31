# PolyPhys Toolkit

PolyPhys Toolkit is an agentic skill suite for translating chromosome 3D structure ideas into clear, testable physical modeling drafts.

The current v1 design is captured in [docs/superpowers/specs/2026-03-30-polyphys-toolkit-design.md](docs/superpowers/specs/2026-03-30-polyphys-toolkit-design.md).

The first implemented skill is [docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md](docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md), which turns chromosome folding ideas into a structured modeling draft with degeneracy handling, control design, and validation guardrails.

The second implemented skill is [docs/superpowers/skills/mechanism-decomposer/SKILL.md](docs/superpowers/skills/mechanism-decomposer/SKILL.md), which isolates phenotype language, competing mechanisms, and explicit degeneracy warnings before model construction.

The third implemented skill is [docs/superpowers/skills/observable-translator/SKILL.md](docs/superpowers/skills/observable-translator/SKILL.md), which turns model hypotheses into fitting targets, orthogonal validation, dynamic diagnostics, and in silico perturbation logic.

The fourth implemented skill is [docs/superpowers/skills/minimal-model-builder/SKILL.md](docs/superpowers/skills/minimal-model-builder/SKILL.md), which translates a mechanism hypothesis into a base polymer model, a control, a minimal perturbation, and an explicit active-module self-check.

Human verification steps are tracked in [docs/verification/human-verification-issue.md](docs/verification/human-verification-issue.md).
