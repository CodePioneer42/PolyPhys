import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/polyphys-toolkit-router/SKILL.md",
  import.meta.url
);

test("polyphys-toolkit-router skill exists and encodes the suite handoff order", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: polyphys-toolkit-router",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Routing Table",
    "## Common Mistakes",
    "chromosome-3d-idea-to-model",
    "mechanism-decomposer",
    "minimal-model-builder",
    "observable-translator",
    "simulation-recommender",
    "handoff",
    "degeneracy",
    "pause",
    "self-contradictory",
    "route back to `mechanism-decomposer`",
    "must not handoff to `minimal-model-builder`",
    "data-driven polymer model",
    "physical mechanism polymer model",
    "one question per message"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
