import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const issuePath = new URL("../../docs/verification/human-verification-issue.md", import.meta.url);

test("human verification issue template defines actionable review steps", async () => {
  const issueDoc = await readFile(issuePath, "utf8");

  const requiredSections = [
    "# Human Verification Test Plan",
    "## Goal",
    "## Preconditions",
    "## Test Scenarios",
    "## Acceptance Criteria",
    "## Reporting Notes"
  ];

  for (const section of requiredSections) {
    assert.match(issueDoc, new RegExp(section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(issueDoc, /degeneracy/i);
  assert.match(issueDoc, /baseline control/i);
  assert.match(issueDoc, /orthogonal validation/i);
});
