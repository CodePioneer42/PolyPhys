import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/mechanism-decomposer/SKILL.md",
  import.meta.url
);

test("mechanism-decomposer skill exists and encodes degeneracy-first chromosome decomposition", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: mechanism-decomposer",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Output Protocol",
    "## Quick Reference",
    "## Common Mistakes",
    "Competing Hypotheses",
    "Degeneracy Warning",
    "phase separation",
    "thermodynamic evidence",
    "Required Next Evidence",
    "Routing Decision"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
