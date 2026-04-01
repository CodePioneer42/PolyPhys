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
    "Routing Decision",
    "stage boundary"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("mechanism-decomposer encodes checklist, state machine, after-stage actions, and self-review", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /## Checklist/i);
  assert.match(skillDoc, /## Workflow State Machine/i);
  assert.match(skillDoc, /State 1:/i);
  assert.match(skillDoc, /Exit gate/i);
  assert.match(skillDoc, /## After This Stage/i);
  assert.match(skillDoc, /If ambiguity remains high, ask one question/i);
  assert.match(skillDoc, /## Self-Review/i);
  assert.match(skillDoc, /unsupported leaps/i);
  assert.match(skillDoc, /routing readiness/i);
});

test("mechanism-decomposer uses multiple-choice clarification and a decomposition end node", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /multiple-choice/i);
  assert.match(skillDoc, /2-4/i);
  assert.match(skillDoc, /Other/i);
  assert.match(skillDoc, /decomposition end node/i);
  assert.match(skillDoc, /If the decomposition is complete, end the conversation/i);
});

test("mechanism-decomposer stops at decomposition and uses a gated next-step question", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /stage boundary/i);
  assert.match(skillDoc, /confirmation gate|stop condition/i);
  assert.match(skillDoc, /Which of these candidate mechanisms/i);
  assert.doesNotMatch(skillDoc, /If competing hypotheses are coherent, handoff to `minimal-model-builder`/i);
});
