# PolyPhys Toolkit

PolyPhys Toolkit is an agentic skill suite for translating chromosome 3D structure ideas into clear, testable physical modeling drafts.

## Installation

An AI agent should be able to install the suite by running the repository script directly:

```bash
bash scripts/install-polyphys-skills.sh
```

The installer chooses the target skill directory in this order:
- `$CODEX_HOME/skills` if `CODEX_HOME` is set
- `~/.codex/skills` if `~/.codex` exists
- `~/.agents/skills` if `~/.agents` exists
- otherwise it defaults to `~/.codex/skills`

To force a specific target directory, pass it explicitly:

```bash
bash scripts/install-polyphys-skills.sh "$HOME/.agents/skills"
```

## Verify Installation

After installation, an agent or user should be able to verify the suite with:

```bash
ls "${CODEX_HOME:-$HOME/.codex}/skills"
```

If you installed into `~/.agents/skills`, inspect that directory instead:

```bash
ls "$HOME/.agents/skills"
```

The installed set should include `polyphys-toolkit-router`, `chromosome-3d-idea-to-model`, `mechanism-decomposer`, `minimal-model-builder`, `observable-translator`, and `simulation-recommender`.

The current v1 design is captured in [docs/superpowers/specs/2026-03-30-polyphys-toolkit-design.md](docs/superpowers/specs/2026-03-30-polyphys-toolkit-design.md).

The suite entry point is [docs/superpowers/skills/polyphys-toolkit-router/SKILL.md](docs/superpowers/skills/polyphys-toolkit-router/SKILL.md), which routes requests across the specialized chromosome-modeling skills below.

The first implemented skill is [docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md](docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md), which turns chromosome folding ideas into a structured modeling draft with degeneracy handling, control design, and validation guardrails.

The second implemented skill is [docs/superpowers/skills/mechanism-decomposer/SKILL.md](docs/superpowers/skills/mechanism-decomposer/SKILL.md), which isolates phenotype language, competing mechanisms, and explicit degeneracy warnings before model construction.

The third implemented skill is [docs/superpowers/skills/observable-translator/SKILL.md](docs/superpowers/skills/observable-translator/SKILL.md), which turns model hypotheses into fitting targets, orthogonal validation, dynamic diagnostics, and in silico perturbation logic.

The fourth implemented skill is [docs/superpowers/skills/minimal-model-builder/SKILL.md](docs/superpowers/skills/minimal-model-builder/SKILL.md), which translates a mechanism hypothesis into a base polymer model, a control, a minimal perturbation, and an explicit active-module self-check.

The fifth implemented skill is [docs/superpowers/skills/simulation-recommender/SKILL.md](docs/superpowers/skills/simulation-recommender/SKILL.md), which gives conservative simulation-route guidance only when model and mechanism readiness gates have been satisfied.

Human verification steps are tracked in [docs/verification/human-verification-issue.md](docs/verification/human-verification-issue.md).

A reusable prompt suite for manual evaluation lives in [docs/evals/polyphys-human-evals.md](docs/evals/polyphys-human-evals.md).

Reference response skeletons for those scenarios live in [docs/evals/polyphys-gold-responses.md](docs/evals/polyphys-gold-responses.md).
