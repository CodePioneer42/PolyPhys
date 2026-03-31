import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const skillPath = new URL(
  "../../docs/superpowers/skills/chromosome-3d-idea-to-model/SKILL.md",
  import.meta.url
);

test("chromosome idea-to-model skill exists and encodes v1 guardrails", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "name: chromosome-3d-idea-to-model",
    "description: Use when",
    "## Overview",
    "## When to Use",
    "## Workflow",
    "## Output Protocol",
    "## Quick Reference",
    "## Common Mistakes",
    "Degeneracy warning",
    "Baseline Control",
    "Orthogonal Validation",
    "Grounding Notes",
    "phase separation"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("chromosome idea-to-model skill encodes the full modeling draft template", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  const requiredPhrases = [
    "Problem Framing",
    "Competing Mechanisms",
    "The Minimal Physical Model",
    "Observables & Validation Strategy",
    "Simulation Implementation",
    "Grounding Notes",
    "Base Polymer Model",
    "Baseline Control",
    "Experimental Perturbation",
    "Active Components Required",
    "Active Module Checklist",
    "Fitting Observables",
    "Orthogonal Validation",
    "Degeneracy-Breakers",
    "In Silico Perturbations",
    "Consensus",
    "Contested",
    "Heuristic"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(skillDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("chromosome idea-to-model skill encodes the phase-separation downgrade and degeneracy pause rules", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /phase separation/i);
  assert.match(skillDoc, /thermodynamic evidence/i);
  assert.match(skillDoc, /Degeneracy warning/);
  assert.match(skillDoc, /Pause simulation recommendation/i);
  assert.match(skillDoc, /two competing control models/i);
});

test("chromosome idea-to-model skill encodes proactive questioning for underspecified biology", async () => {
  const skillDoc = await readFile(skillPath, "utf8");

  assert.match(skillDoc, /Proactive Questions/i);
  assert.match(skillDoc, /ATP-driven/i);
  assert.match(skillDoc, /passive/i);
  assert.match(skillDoc, /Persistence length/i);
  assert.match(skillDoc, /ask clarifying questions/i);
});
