import Link from "next/link";
import { buildURL } from "uri-kit";
import { CATALOG_META, queryCatalog } from "uri-kit/data";
import type { Platform } from "uri-kit";
import { CatalogFilter } from "./catalog-filter";

export const metadata = {
  title: "Catalog",
  description: `${CATALOG_META.counts.total} typed deep links for Apple platforms.`,
};

type SearchParams = Promise<{
  q?: string;
  platform?: Platform;
  category?: string;
}>;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const entries = queryCatalog({
    search: sp.q,
    platform: sp.platform,
    category: sp.category as never,
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-6 flex items-center gap-2">
        <span className="uk-badge">{entries.length} of {CATALOG_META.counts.total}</span>
        {sp.platform ? <span className="uk-badge">{sp.platform}</span> : null}
        {sp.category ? <span className="uk-badge">{sp.category}</span> : null}
      </div>

      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Catalog</h1>
      <p className="mt-2 text-fd-muted-foreground">
        Every URI bundled with uri-kit. Search, filter, and copy‑as‑code.
      </p>

      <CatalogFilter />

      <ul className="mt-8 divide-y divide-fd-border rounded-xl border border-fd-border">
        {entries.map((e) => {
          const url = buildURL(e);
          return (
            <li key={e.id ?? url} className="flex flex-col gap-1 px-5 py-4">
              <div className="flex items-center gap-2">
                <code className="text-sm font-medium">{e.id}</code>
                {e.platforms?.map((p) => (
                  <span key={p} className="uk-badge">{p}</span>
                ))}
                {e.category ? <span className="uk-badge">{e.category}</span> : null}
                {e.since ? <span className="uk-badge">since {e.since}</span> : null}
                {e.deprecated ? <span className="uk-badge">deprecated {e.deprecated}</span> : null}
              </div>
              <div className="text-sm">{e.title}</div>
              <code className="truncate font-mono text-xs text-fd-muted-foreground">{url}</code>
              <div className="mt-1 flex gap-2">
                <Link
                  href={`/catalog/${encodeURIComponent(e.id ?? "")}`}
                  className="text-xs text-fd-muted-foreground underline-offset-4 hover:underline"
                >
                  details
                </Link>
                <a
                  href={`/catalog/${encodeURIComponent(e.id ?? "")}?prompt=1`}
                  className="text-xs text-fd-muted-foreground underline-offset-4 hover:underline"
                >
                  copy as prompt
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
