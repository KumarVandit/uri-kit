import { buildURL } from "uri-kit";
import { CATALOG, CATALOG_META } from "uri-kit/data";

export const dynamic = "force-static";

export function GET(): Response {
  const payload = {
    version: CATALOG_META.version,
    generatedAt: CATALOG_META.generatedAt,
    counts: CATALOG_META.counts,
    entries: Object.values(CATALOG).map((e) => ({ ...e, url: buildURL(e) })),
  };
  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
