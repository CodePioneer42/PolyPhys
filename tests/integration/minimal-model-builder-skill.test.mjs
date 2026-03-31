import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/minimal-model-builder/SKILL.md",
  import.meta.url
);

test("minimal-model-builder skill exists and encodes control-first chromosome model design", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: minimal-model-builder",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Output Protocol",
    "## Quick Reference",
    "## Common Mistakes",
    "Base Polymer Model",
    "Baseline Control",
    "Experimental Perturbation",
    "Active Components Required",
    "Active Module Checklist",
    "nonequilibrium",
    "purely repulsive",
    "control"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
