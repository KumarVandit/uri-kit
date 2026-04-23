/**
 * `uri-kit/agent`
 *
 * A tiny, dependency‑free surface for LLM agents running at inference time.
 * Everything here is synchronous and deterministic.
 *
 *   import { catalog, search, build, toSwift, toShortcut, toCurl } from "uri-kit/agent";
 */
import { buildURL } from "../build.js";
import { CATALOG, queryCatalog } from "../data/index.js";
import type { Category, Platform, URIDefinition } from "../types.js";

export { CATALOG as catalog, queryCatalog as search } from "../data/index.js";

/**
 * Build the final URL string for any definition. Identical to the public
 * `buildURL`, re‑exported here so agents can `import { build } from "uri-kit/agent"`.
 */
export function build(def: URIDefinition): string {
  return buildURL(def);
}

/**
 * Render a URI as TypeScript `defineURI({ ... })` source.
 */
export function toTypeScript(def: URIDefinition): string {
  const body = JSON.stringify(pickSerializable(def), null, 2);
  return `import { defineURI } from "uri-kit";\n\nconst open = defineURI(${body});\n\nopen();`;
}

/**
 * Render a URI as Swift source using `UIApplication.shared.open`.
 */
export function toSwift(def: URIDefinition): string {
  const url = buildURL(def);
  return [
    "import UIKit",
    "",
    `if let url = URL(string: "${escapeSwift(url)}") {`,
    "    UIApplication.shared.open(url)",
    "}",
  ].join("\n");
}

/**
 * Render a URI as a Shortcuts "Open URL" action parameter.
 */
export function toShortcut(def: URIDefinition): string {
  return buildURL(def);
}

/**
 * Render a URI as a macOS `open` command suitable for terminal automation.
 */
export function toCurl(def: URIDefinition): string {
  return `open "${buildURL(def).replace(/"/g, '\\"')}"`;
}

/**
 * Machine‑readable JSON snapshot of the catalog. Stable shape for agents.
 */
export function toJSON(opts?: {
  platform?: Platform;
  category?: Category;
}): { version: string; entries: URIDefinition[] } {
  const entries = queryCatalog({ platform: opts?.platform, category: opts?.category });
  return { version: "0.1.0", entries };
}

/**
 * Compact one‑liner for each entry — the format used by `llms.txt`.
 */
export function toLLMSEntry(def: URIDefinition): string {
  const url = buildURL(def);
  const platforms = (def.platforms ?? []).join(",");
  const title = def.title ?? def.id ?? "(untitled)";
  return `- [${def.id ?? url}] ${title} — ${url}${platforms ? ` (${platforms})` : ""}`;
}

function pickSerializable(def: URIDefinition): URIDefinition {
  const out: URIDefinition = {};
  const keys: (keyof URIDefinition)[] = [
    "id",
    "title",
    "description",
    "scheme",
    "host",
    "path",
    "fragment",
    "params",
    "to",
    "url",
    "platforms",
    "since",
    "deprecated",
    "category",
    "notes",
    "source",
    "tags",
    "fallback",
  ];
  for (const k of keys) {
    const v = def[k];
    if (v !== undefined) (out as Record<string, unknown>)[k] = v;
  }
  return out;
}

function escapeSwift(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
