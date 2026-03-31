import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/simulation-recommender/SKILL.md",
  import.meta.url
);

test("simulation-recommender skill exists and encodes conservative recommendation gating", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: simulation-recommender",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Output Protocol",
    "## Quick Reference",
    "## Common Mistakes",
    "Recommended Paradigm",
    "Recommended Engine",
    "Fidelity / Cost Tradeoff",
    "Explicit Solvent / Ion Note",
    "Pause recommendation",
    "degeneracy",
    "conservative"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
