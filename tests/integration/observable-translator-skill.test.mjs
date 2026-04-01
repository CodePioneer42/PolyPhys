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
    "MSD",
    "stage boundary"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("observable-translator encodes checklist, state machine, after-stage actions, and self-review", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /## Checklist/i);
  assert.match(skillDoc, /## Workflow State Machine/i);
  assert.match(skillDoc, /State 1:/i);
  assert.match(skillDoc, /Exit gate/i);
  assert.match(skillDoc, /## After This Stage/i);
  assert.match(skillDoc, /If validation is still circular, ask one question/i);
  assert.match(skillDoc, /## Self-Review/i);
  assert.match(skillDoc, /circular reuse/i);
  assert.match(skillDoc, /degeneracy coverage/i);
});

test("observable-translator uses multiple-choice clarification and a validation-plan end node", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /multiple-choice/i);
  assert.match(skillDoc, /2-4/i);
  assert.match(skillDoc, /Other/i);
  assert.match(skillDoc, /validation-plan end node/i);
  assert.match(skillDoc, /If the validation plan is complete, end the conversation/i);
});

test("observable-translator stops at validation planning and defers software framing", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /stage boundary/i);
  assert.match(skillDoc, /confirmation gate|stop condition/i);
  assert.match(skillDoc, /Do not produce software or engine recommendation content/i);
  assert.doesNotMatch(skillDoc, /If the validation plan is coherent, handoff to `simulation-recommender`/i);
});
