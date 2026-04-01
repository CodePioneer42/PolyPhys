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
    "one question per message",
    "multiple-choice"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("polyphys-toolkit-router defaults to files and data sources instead of git history", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /check whether files, docs, and user-supplied chromosome data/i);
  assert.match(skillDoc, /Do not default to git history/i);
  assert.match(skillDoc, /only inspect git context when the user requests it/i);
});

test("polyphys-toolkit-router exposes routing checklist, state machine, after-stage actions, and self-review", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /## Checklist/i);
  assert.match(skillDoc, /## Workflow State Machine/i);
  assert.match(skillDoc, /State 1:/i);
  assert.match(skillDoc, /Exit gate/i);
  assert.match(skillDoc, /## After This Stage/i);
  assert.match(skillDoc, /If the current stage is unresolved, ask one question/i);
  assert.match(skillDoc, /If the stage is coherent, handoff explicitly/i);
  assert.match(skillDoc, /If the design doc has been written, end the conversation/i);
  assert.match(skillDoc, /## Self-Review/i);
  assert.match(skillDoc, /routing state/i);
  assert.match(skillDoc, /premature handoff/i);
});

test("polyphys-toolkit-router uses multiple-choice clarification and stops after the design-doc end node", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /multiple-choice question/i);
  assert.match(skillDoc, /2-4/i);
  assert.match(skillDoc, /Other/i);
  assert.match(skillDoc, /Execution Outline/i);
  assert.match(skillDoc, /mechanism is clear/i);
  assert.match(skillDoc, /design doc has been written/i);
  assert.match(skillDoc, /end the conversation/i);
});
