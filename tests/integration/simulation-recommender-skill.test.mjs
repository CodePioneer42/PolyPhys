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
    "conservative"
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

test("simulation-recommender verifies named software against official docs and allows custom MC implementation", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /official docs/i);
  assert.match(skillDoc, /version-sensitive/i);
  assert.match(skillDoc, /package-native/i);
  assert.match(skillDoc, /package \+ custom extension/i);
  assert.match(skillDoc, /standalone custom code/i);
  assert.match(skillDoc, /Monte Carlo/i);
  assert.match(skillDoc, /self-written code/i);
});

test("simulation-recommender uses multiple-choice clarification and a recommendation end node", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /multiple-choice/i);
  assert.match(skillDoc, /2-4/i);
  assert.match(skillDoc, /Other/i);
  assert.match(skillDoc, /recommendation end node/i);
  assert.match(skillDoc, /If the recommendation is complete, end the conversation/i);
});
