#!/usr/bin/env node

import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(SCRIPT_DIR, "..", "..");
const REPO_ROOT = resolve(PACKAGE_ROOT, "..", "..");
const SDK_ENTRY = resolve(PACKAGE_ROOT, "sdk/javascript/src/index.ts");
const DOCS_OUT = resolve(PACKAGE_ROOT, "docs/sdk/javascript");
const SECTION_BY_FUNCTION = {
  assertFideId: "Validation and Parsing",
  buildFideIdFromParts: "Validation and Parsing",
  parseFideId: "Validation and Parsing",
  calculateFideId: "Calculation",
  calculateStatementFideId: "Calculation",
  normalizeReferenceIdentifier: "Normalization",
  normalizePredicateReferenceIdentifier: "Normalization",
  buildStatementReferenceIdentifier: "Statement",
};

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: REPO_ROOT,
    env: process.env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

async function injectPackageName() {
  const files = await readdir(DOCS_OUT);
  for (const file of files) {
    if (file === "meta.json") {
      const metaPath = resolve(DOCS_OUT, file);
      await writeFile(
        metaPath,
        JSON.stringify(
          {
            title: "SDK",
            description: "Generated SDK reference",
            root: true,
            icon: "Box",
            pages: [
              "index",
              "--- Validation and Parsing ---",
              "assert-fide-id",
              "build-fide-id-from-parts",
              "parse-fide-id",
              "--- Calculation ---",
              "calculate-fide-id",
              "calculate-statement-fide-id",
              "--- Normalization ---",
              "normalize-predicate-reference-identifier",
              "normalize-reference-identifier",
              "--- Statement ---",
              "build-statement-reference-identifier",
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
      continue;
    }

    if (!file.endsWith('.mdx')) continue;
    const fullPath = resolve(DOCS_OUT, file);
    const source = await readFile(fullPath, 'utf8');
    let updated = source;

    if (file !== 'index.mdx') {
      updated = updated.replace(
        /<SDKFunctionPageInteractive data=\{(\{[\s\S]*\})\} \/>/,
        (_match, json) => {
          const data = JSON.parse(json);
          data.packageName = '@fide-work/id';
          const groupedSection = SECTION_BY_FUNCTION[data.name];
          if (groupedSection) {
            data.section = groupedSection;
          } else if (data.section === 'Fide Id') {
            data.section = 'Fide ID';
          }
          return `<SDKFunctionPageInteractive data={${JSON.stringify(data)}} />`;
        },
      );
    } else {
      updated = `---
title: "SDK"
description: "JavaScript SDK reference for Fide ID."
---

### Validation and Parsing

  - [\`assertFideId\`](./javascript/assert-fide-id)
  - [\`buildFideIdFromParts\`](./javascript/build-fide-id-from-parts)
  - [\`parseFideId\`](./javascript/parse-fide-id)

### Calculation

  - [\`calculateFideId\`](./javascript/calculate-fide-id)
  - [\`calculateStatementFideId\`](./javascript/calculate-statement-fide-id)

### Normalization

  - [\`normalizePredicateReferenceIdentifier\`](./javascript/normalize-predicate-reference-identifier)
  - [\`normalizeReferenceIdentifier\`](./javascript/normalize-reference-identifier)

### Statement

  - [\`buildStatementReferenceIdentifier\`](./javascript/build-statement-reference-identifier)
`;
    }

    if (updated !== source) {
      await writeFile(fullPath, updated, 'utf8');
    }
  }
}

async function clearGeneratedDocs() {
  const files = await readdir(DOCS_OUT);
  for (const file of files) {
    if (!file.endsWith(".mdx") && file !== "meta.json") continue;
    await unlink(resolve(DOCS_OUT, file));
  }
}

await clearGeneratedDocs();

run('pnpm', [
  'exec',
  'lally',
  'fumadocs',
  'generate',
  'sdk',
  '--app',
  'apps/docs',
  '--entry',
  SDK_ENTRY,
  '--out',
  DOCS_OUT,
  '--package-name',
  '@fide-work/id',
  '--title',
  'SDK',
  '--component-import-path',
  '@/components/sdk-layout/sdk-function-page-interactive',
  '--component-export-name',
  'SDKFunctionPageInteractive',
  '--component-file-path',
  'src/components/sdk-layout/sdk-function-page-interactive.tsx',
]);

await injectPackageName();
