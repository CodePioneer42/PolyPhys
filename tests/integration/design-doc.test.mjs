import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const designPath = new URL("../../docs/superpowers/specs/2026-03-30-polyphys-toolkit-design.md", import.meta.url);

test("design doc exists and captures the approved v1 structure", async () => {
  const designDoc = await readFile(designPath, "utf8");

  const requiredSections = [
    "# PolyPhys Toolkit Design",
    "## Product Positioning",
    "## Core Workflow",
    "## Modeling Draft Output Protocol",
    "## Routing And Guardrails",
    "## V1 Scope",
    "## Non-Goals"
  ];

  for (const section of requiredSections) {
    assert.match(designDoc, new RegExp(section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(designDoc, /Competing Mechanisms/);
  assert.match(designDoc, /Baseline Control/);
  assert.match(designDoc, /Orthogonal Validation/);
  assert.match(designDoc, /Grounding Notes/);
});
