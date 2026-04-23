import { CATALOG_META } from "uri-kit/data";

export const dynamic = "force-static";

export function GET(): Response {
  const body = [
    "# uri-kit",
    "",
    "> Declarative deep links for Apple platforms. Typed iOS settings URLs, system app schemes, universal links, and x-callback-url.",
    "",
    `Catalog version: ${CATALOG_META.version}. Total: ${CATALOG_META.counts.total} URIs.`,
    "",
    "## Getting started",
    "",
    "- Library: `npm install uri-kit`",
    "- Repo: https://github.com/KumarVandit/uri-kit",
    "- API: /api.json (served alongside this file)",
    "- Full catalog: /llms-full.txt (served alongside this file)",
    "- MCP server: `npx uri-kit mcp`",
    "",
    "## Primary API",
    "",
    "```ts",
    'import { defineURI } from "uri-kit";',
    "",
    'const openWiFi = defineURI({ scheme: "prefs", path: "root=WIFI" });',
    "openWiFi();",
    "```",
    "",
    "## Categories",
    "",
    "- settings — iOS Settings URLs (`prefs:root=...`)",
    "- apple-app — Apple system app schemes",
    "- x-callback — x-callback-url entries",
    "- macos — macOS System Settings anchors (`x-apple.systempreferences:`)",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
