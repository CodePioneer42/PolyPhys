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
    "multiple-choice",
    "WORKFLOW BREAKPOINTS & STATE LOCK"
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
  assert.match(skillDoc, /design doc has been written/i);
  assert.match(skillDoc, /end the conversation/i);
});

test("polyphys-toolkit-router enforces workflow breakpoints and forbids multi-stage output", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /##\#\[WORKFLOW BREAKPOINTS & STATE LOCK\] \(CRITICAL\)/);
  assert.match(skillDoc, /Sequential Execution/i);
  assert.match(skillDoc, /Mechanism Decomposition -> Minimal Model Building -> Observable Translation -> Software Recommendation/i);
  assert.match(skillDoc, /NO INFO-DUMPING \(ABSOLUTELY FORBIDDEN\)/i);
  assert.match(skillDoc, /Mandatory Stop Point/i);
  assert.match(skillDoc, /You MUST \*\*STOP GENERATING\*\* immediately/i);
  assert.match(skillDoc, /Which of these candidate mechanisms do you prefer to validate first\?/i);
  assert.match(skillDoc, /User Confirmation Gate/i);
  assert.doesNotMatch(skillDoc, /handoff toward the `Execution Outline`/i);
  assert.doesNotMatch(skillDoc, /If the mechanism is clear, handoff toward the `Execution Outline`/i);
});

test("polyphys-toolkit-router sharpens mechanism branches and states how to distinguish them", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /Boundary tethering \/ anchoring loss/i);
  assert.match(skillDoc, /Global chromatin material-state shift/i);
  assert.match(skillDoc, /What would distinguish it:/i);
  assert.match(skillDoc, /Hi-C|imaging|perturbation/i);
});

test("polyphys-toolkit-router uses a compact mixed-evidence fallback", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /if the evidence is still too mixed/i);
  assert.match(skillDoc, /ask immediately for the single most direct discriminator/i);
  assert.match(skillDoc, /Required Next Evidence/i);
});
