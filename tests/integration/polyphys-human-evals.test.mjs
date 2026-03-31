import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evalPath = new URL("../../docs/evals/polyphys-human-evals.md", import.meta.url);

test("polyphys human eval suite exists and covers the full workflow", async () => {
  const evalDoc = await readFile(evalPath, "utf8");

  const requiredPhrases = [
    "# PolyPhys Human Eval Suite",
    "## Evaluation Goals",
    "## Scenarios",
    "Router",
    "Mechanism Decomposer",
    "Minimal Model Builder",
    "Observable Translator",
    "Simulation Recommender",
    "Degeneracy",
    "Pause Condition",
    "Pass Criteria",
    "Failure Signals"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(evalDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
