import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/observable-translator/SKILL.md",
  import.meta.url
);

test("observable-translator skill exists and encodes non-circular chromosome validation design", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: observable-translator",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Output Protocol",
    "## Quick Reference",
    "## Common Mistakes",
    "Fitting Observables",
    "Orthogonal Validation",
    "Degeneracy-Breakers",
    "In Silico Perturbations",
    "Avoid Circularity",
    "dynamic diagnostics",
    "FRAP",
    "MSD"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
