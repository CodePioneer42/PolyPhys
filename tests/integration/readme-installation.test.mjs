import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const readmePath = new URL("../../README.md", import.meta.url);
const installScriptPath = new URL("../../scripts/install-polyphys-skills.sh", import.meta.url);

test("README documents install and verification steps for AI agents", async () => {
  const readme = await readFile(readmePath, "utf8");

  const requiredPhrases = [
    "## Installation",
    "bash scripts/install-polyphys-skills.sh",
    "## Verify Installation",
    "polyphys-toolkit-router",
    "CODEX_HOME",
    ".codex/skills",
    ".agents/skills"
  ];

  for (const phrase of requiredPhrases) {
    assert.match(readme, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("install script copies all PolyPhys skills into a target skill directory", async () => {
  const tempRoot = await mkdtemp(join(tmpdir(), "polyphys-install-"));
  const targetDir = join(tempRoot, "skills");

  await execFileAsync("bash", [installScriptPath.pathname, targetDir], {
    cwd: new URL("../..", import.meta.url).pathname
  });

  const installed = (await readdir(targetDir)).sort();

  assert.deepEqual(installed, [
    "chromosome-3d-idea-to-model",
    "mechanism-decomposer",
    "minimal-model-builder",
    "observable-translator",
    "polyphys-toolkit-router",
    "simulation-recommender"
  ]);
});
