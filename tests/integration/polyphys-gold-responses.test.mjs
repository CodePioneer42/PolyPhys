import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const goldPath = new URL("../../docs/evals/polyphys-gold-responses.md", import.meta.url);

test("polyphys gold responses exist and cover key evaluation scenarios", async () => {
  const goldDoc = await readFile(goldPath, "utf8");

  const requiredPhrases = [
    "# PolyPhys Gold Responses",
    "## Usage Notes",
    "## Scenario 1",
    "## Scenario 2",
    "## Scenario 3",
    "## Scenario 4",
    "## Scenario 5",
    "## Scenario 6",
    "Router",
    "Mechanism Decomposer",
    "Minimal Model Builder",
    "Observable Translator",
    "Reference Response Skeleton",
    "Degeneracy warning",
    "Baseline Control",
    "Orthogonal Validation",
    "Pause recommendation",
    "6. Grounding Notes",
    "Consensus",
    "Contested",
    "Heuristic"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(goldDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
