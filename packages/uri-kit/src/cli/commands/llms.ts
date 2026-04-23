import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import kleur from "kleur";
import { buildURL } from "../../build.js";
import { CATALOG, CATALOG_META, queryCatalog } from "../../data/index.js";
import { toLLMSEntry } from "../../agent/index.js";
import type { URIDefinition } from "../../types.js";

function toLLMsTxt(): string {
  return [
    "# uri-kit",
    "",
    "> Declarative deep links for Apple platforms. Typed iOS settings URLs, system app schemes, universal links, and x-callback-url.",
    "",
    `Catalog version: ${CATALOG_META.version}. Generated: ${CATALOG_META.generatedAt}.`,
    `Total: ${CATALOG_META.counts.total} URIs.`,
    "",
    "## Getting started",
    "",
    "- Library: `npm install uri-kit`",
    "- Repo: https://github.com/KumarVandit/uri-kit",
    "- Local API: run `npx uri-kit llms ./out` to emit api.json next to these files",
    "- MCP server: `npx uri-kit mcp`",
    "",
    "## Primary API",
    "",
    "```ts",
    'import { defineURI } from "uri-kit";',
    "",
    'const openWiFi = defineURI({ scheme: "prefs", path: "WIFI" });',
    "openWiFi();",
    "```",
    "",
    "## Categories",
    "",
    "- settings — iOS settings URLs (`prefs:root=...`)",
    "- apple-app — Apple system app schemes",
    "- x-callback — x-callback-url entries for Apple‑ecosystem apps",
    "- macos — macOS System Settings anchors (`x-apple.systempreferences:`)",
  ].join("\n");
}

function toLLMsFull(): string {
  const lines: string[] = [];
  lines.push("# uri-kit — full catalog\n");
  lines.push(`Version: ${CATALOG_META.version}.  Total: ${CATALOG_META.counts.total}.\n`);

  const byCategory = new Map<string, URIDefinition[]>();
  for (const def of queryCatalog({ includeDeprecated: true })) {
    const key = def.category ?? "other";
    const bucket = byCategory.get(key) ?? [];
    bucket.push(def);
    byCategory.set(key, bucket);
  }

  for (const [category, defs] of byCategory) {
    lines.push(`\n## ${category}\n`);
    for (const def of defs) {
      lines.push(toLLMSEntry(def));
    }
  }

  lines.push("\n## Raw JSON\n");
  lines.push("```json");
  lines.push(
    JSON.stringify(
      Object.values(CATALOG).map((e) => ({ ...e, url: buildURL(e) })),
      null,
      2,
    ),
  );
  lines.push("```");
  return lines.join("\n");
}

function toApiJson(): unknown {
  return {
    version: CATALOG_META.version,
    generatedAt: CATALOG_META.generatedAt,
    counts: CATALOG_META.counts,
    entries: Object.values(CATALOG).map((e) => ({ ...e, url: buildURL(e) })),
  };
}

export async function runLLMs(args: string[]): Promise<void> {
  const outDir = resolve(process.cwd(), args[0] ?? "public");
  await mkdir(outDir, { recursive: true });

  const files: Array<[string, string]> = [
    ["llms.txt", toLLMsTxt()],
    ["llms-full.txt", toLLMsFull()],
    ["api.json", `${JSON.stringify(toApiJson(), null, 2)}\n`],
  ];

  for (const [name, contents] of files) {
    const p = join(outDir, name);
    await writeFile(p, contents);
    console.log(kleur.green("✓"), kleur.dim(p));
  }
}
