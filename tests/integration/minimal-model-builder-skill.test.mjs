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
    "Data Source Check",
    "Parameterization Readiness",
    "data source",
    "parameter files",
    "nonequilibrium",
    "purely repulsive",
    "control",
    "stage boundary"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("minimal-model-builder defers detailed parameter files until simulation setup is needed", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /Do not read detailed parameter files during model-selection stage by default/i);
  assert.match(skillDoc, /Only build a full Parameter Card when simulation setup is the active task/i);
  assert.match(skillDoc, /identify the data source and whether downstream parameterization is needed/i);
});

test("minimal-model-builder encodes checklist, state machine, after-stage actions, and self-review", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /## Checklist/i);
  assert.match(skillDoc, /## Workflow State Machine/i);
  assert.match(skillDoc, /State 1:/i);
  assert.match(skillDoc, /Exit gate/i);
  assert.match(skillDoc, /## After This Stage/i);
  assert.match(skillDoc, /If the model is still unstable, ask one question/i);
  assert.match(skillDoc, /## Self-Review/i);
  assert.match(skillDoc, /skipped controls/i);
  assert.match(skillDoc, /premature parameterization/i);
});

test("minimal-model-builder uses multiple-choice clarification and a model-design end node", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /multiple-choice/i);
  assert.match(skillDoc, /2-4/i);
  assert.match(skillDoc, /Other/i);
  assert.match(skillDoc, /model-design end node/i);
  assert.match(skillDoc, /If the model design is complete, end the conversation/i);
});

test("minimal-model-builder stops at model construction and defers validation framing", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /stage boundary/i);
  assert.match(skillDoc, /confirmation gate|stop condition/i);
  assert.match(skillDoc, /Do not produce validation-plan or simulation-framing content/i);
  assert.doesNotMatch(skillDoc, /If the model is coherent, handoff to `observable-translator`/i);
});
