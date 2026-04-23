#!/usr/bin/env node
/**
 * Emit first‑party patch JSON files from the built catalog into .uri-kit/packs.
 *
 * Run with: node scripts/emit-patches.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..", "..", "..");

const { APPLE_APPS, IOS_SETTINGS, MACOS_SETTINGS, X_CALLBACK, CATALOG } = await import(
  "../dist/data/index.js"
);

const out = resolve(repoRoot, ".uri-kit", "packs");
await mkdir(out, { recursive: true });

const patches = [
  { name: "apple-core", title: "Apple Core", uris: { ...APPLE_APPS } },
  { name: "ios-settings", title: "iOS Settings", uris: { ...IOS_SETTINGS } },
  { name: "macos", title: "macOS System Settings", uris: { ...MACOS_SETTINGS } },
  { name: "x-callback", title: "x-callback-url", uris: { ...X_CALLBACK } },
  { name: "all", title: "Full uri-kit Catalog", uris: { ...CATALOG } },
];

for (const p of patches) {
  const manifest = {
    name: p.name,
    version: "0.1.0",
    description: `First‑party ${p.title} patch shipped with uri-kit.`,
    author: "Vandit Kumar",
    homepage: "https://github.com/KumarVandit/uri-kit",
    license: "MIT",
    uris: p.uris,
  };
  const file = resolve(out, `${p.name}.json`);
  await writeFile(file, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`wrote ${file} (${Object.keys(p.uris).length} URIs)`);
}
