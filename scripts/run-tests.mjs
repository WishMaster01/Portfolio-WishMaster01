import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const root = process.cwd();
const args = process.argv.slice(2);

const isUnitOnly = args.includes("--unit");
const isIntegrationOnly = args.includes("--integration");

const testFiles = [];

const unitDir = path.join(root, "tests", "unit");
const integrationDir = path.join(root, "tests", "integration");

if (!isIntegrationOnly && fs.existsSync(unitDir)) {
  const files = fs.readdirSync(unitDir).filter((f) => f.endsWith(".test.mjs") || f.endsWith(".test.ts"));
  for (const f of files) {
    testFiles.push(path.join("tests", "unit", f));
  }
}

if (!isUnitOnly && fs.existsSync(integrationDir)) {
  const files = fs.readdirSync(integrationDir).filter((f) => f.endsWith(".test.mjs") || f.endsWith(".test.ts"));
  for (const f of files) {
    testFiles.push(path.join("tests", "integration", f));
  }
}

console.log("\n=======================================================");
console.log("  WISHMASTER01 PORTFOLIO — AUTOMATED TEST RUNNER");
console.log("=======================================================");
console.log(`Running ${testFiles.length} test suite(s)...`);
testFiles.forEach((file, index) => {
  console.log(`  [${index + 1}/${testFiles.length}] ${file}`);
});
console.log("=======================================================\n");

const nodeArgs = [
  "--test",
  "--experimental-transform-types",
  "--loader",
  "./scripts/test-loader.mjs",
  "--no-warnings",
  ...testFiles,
];

const child = spawn(process.execPath, nodeArgs, {
  stdio: "inherit",
  cwd: root,
  env: {
    ...process.env,
    NODE_ENV: "test",
  },
});

child.on("close", (code) => {
  console.log("\n=======================================================");
  if (code === 0) {
    console.log("  >>> ALL TEST SUITES PASSED CLEANLY (100%)");
  } else {
    console.log(`  >>> TEST RUN FAILED with exit code ${code}`);
  }
  console.log("=======================================================\n");
  process.exit(code ?? 1);
});
