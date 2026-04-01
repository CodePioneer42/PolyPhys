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
    "Software Capability Check",
    "Pause recommendation",
    "degeneracy",
    "conservative",
    "SOFTWARE RECOMMENDATION MANDATE & ANTI-LAZINESS"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("simulation-recommender encodes checklist, state machine, after-stage actions, and self-review", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /## Checklist/i);
  assert.match(skillDoc, /## Workflow State Machine/i);
  assert.match(skillDoc, /State 1:/i);
  assert.match(skillDoc, /Exit gate/i);
  assert.match(skillDoc, /## After This Stage/i);
  assert.match(skillDoc, /If recommendation must pause, ask one question/i);
  assert.match(skillDoc, /If recommendation is ready, present the conservative route/i);
  assert.match(skillDoc, /## Self-Review/i);
  assert.match(skillDoc, /readiness gate/i);
  assert.match(skillDoc, /overcommitted recommendation/i);
});

test("simulation-recommender verifies named software against official docs and bans lazy abstract fallbacks", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /official docs/i);
  assert.match(skillDoc, /version-sensitive/i);
  assert.match(skillDoc, /package-native/i);
  assert.match(skillDoc, /package \+ custom extension/i);
  assert.match(skillDoc, /BANNED TERMS \(Blacklist\)/i);
  assert.match(skillDoc, /"standalone custom code"/i);
  assert.match(skillDoc, /"write your own scripts"/i);
  assert.match(skillDoc, /"generic MD engine"/i);
  assert.doesNotMatch(skillDoc, /Prefer `standalone custom code`/i);
  assert.doesNotMatch(skillDoc, /Treat self-written Monte Carlo code as a valid route/i);
});

test("simulation-recommender uses multiple-choice clarification and a recommendation end node", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /multiple-choice/i);
  assert.match(skillDoc, /2-4/i);
  assert.match(skillDoc, /Other/i);
  assert.match(skillDoc, /recommendation end node/i);
  assert.match(skillDoc, /If the recommendation is complete, end the conversation/i);
});

test("simulation-recommender requires concrete mainstream engines with command mappings", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /##\#\[SOFTWARE RECOMMENDATION MANDATE & ANTI-LAZINESS\] \(CRITICAL\)/);
  assert.match(skillDoc, /ABSOLUTELY FORBIDDEN to recommend abstract, non-actionable solutions/i);
  assert.match(skillDoc, /LAMMPS/i);
  assert.match(skillDoc, /HOOMD-blue/i);
  assert.match(skillDoc, /OpenMM/i);
  assert.match(skillDoc, /GROMACS/i);
  assert.match(skillDoc, /MANDATORY OUTPUT FORMAT/i);
  assert.match(skillDoc, /#### Recommended Engine: \[Software Name/i);
  assert.match(skillDoc, /\*\s+\*\*Key Modules & Command Mapping:\*\*/i);
  assert.match(skillDoc, /bond_style fene|hoomd\.md\.bond\.FENE/i);
  assert.match(skillDoc, /pair_style lj\/cut|pair_style yukawa/i);
  assert.match(skillDoc, /fix langevin/i);
});
