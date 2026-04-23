import { buildURL } from "uri-kit";
import { toLLMSEntry } from "uri-kit/agent";
import { CATALOG, CATALOG_META, queryCatalog } from "uri-kit/data";

export const dynamic = "force-static";

export function GET(): Response {
  const lines: string[] = [];
  lines.push("# uri-kit — full catalog\n");
  lines.push(`Version: ${CATALOG_META.version}.  Total: ${CATALOG_META.counts.total}.\n`);

  const byCategory = new Map<string, ReturnType<typeof queryCatalog>>();
  for (const def of queryCatalog({ includeDeprecated: true })) {
    const key = def.category ?? "other";
    const bucket = byCategory.get(key) ?? [];
    bucket.push(def);
    byCategory.set(key, bucket);
  }
  for (const [category, defs] of byCategory) {
    lines.push(`\n## ${category}\n`);
    for (const def of defs) lines.push(toLLMSEntry(def));
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

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
