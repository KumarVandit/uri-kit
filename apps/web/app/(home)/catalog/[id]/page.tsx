import { notFound } from "next/navigation";
import Link from "next/link";
import { toCurl, toShortcut, toSwift, toTypeScript } from "uri-kit/agent";
import { buildURL } from "uri-kit";
import { getById } from "uri-kit/data";
import { CopyButton } from "./copy-button";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ prompt?: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const p = await params;
  const entry = getById(decodeURIComponent(p.id));
  return {
    title: entry?.title ?? entry?.id ?? "URI",
    description: entry?.description ?? entry?.notes ?? "",
  };
}

export default async function URIDetail({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const p = await params;
  const sp = await searchParams;
  const id = decodeURIComponent(p.id);
  const entry = getById(id);
  if (!entry) notFound();

  const url = buildURL(entry);
  const ts = toTypeScript(entry);
  const swift = toSwift(entry);
  const shortcut = toShortcut(entry);
  const cli = toCurl(entry);

  const prompt = [
    `I want to open "${entry.title ?? id}" on ${(entry.platforms ?? ["Apple"]).join(", ")}.`,
    "Use `uri-kit`:",
    "```ts",
    ts,
    "```",
    `Resolved URL: ${url}`,
  ].join("\n");

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link href="/catalog" className="text-sm text-fd-muted-foreground hover:underline">
        ← Back to catalog
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <code className="text-sm font-medium">{entry.id}</code>
        {entry.platforms?.map((pl) => (
          <span key={pl} className="uk-badge">{pl}</span>
        ))}
        {entry.category ? <span className="uk-badge">{entry.category}</span> : null}
        {entry.since ? <span className="uk-badge">since {entry.since}</span> : null}
      </div>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{entry.title}</h1>
      {entry.description ? <p className="mt-2 text-fd-muted-foreground">{entry.description}</p> : null}
      {entry.notes ? <p className="mt-2 text-sm text-fd-muted-foreground">{entry.notes}</p> : null}

      <div className="mt-6 rounded-xl border border-fd-border bg-fd-muted/40 p-4">
        <div className="text-xs uppercase tracking-wider text-fd-muted-foreground">URL</div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <code className="truncate font-mono text-sm">{url}</code>
          <CopyButton text={url} label="Copy URL" />
        </div>
      </div>

      <Section title="TypeScript" payload={ts} lang="ts" />
      <Section title="Swift" payload={swift} lang="swift" />
      <Section title="Shortcut URL" payload={shortcut} lang="text" />
      <Section title="macOS `open` command" payload={cli} lang="bash" />
      <Section title="Agent prompt" payload={prompt} lang="text" />

      {sp.prompt === "1" ? (
        <p className="mt-6 text-xs text-fd-muted-foreground">
          Add <code>?prompt=1</code> to any catalog URL to auto‑scroll to the prompt block.
        </p>
      ) : null}

      {entry.source ? (
        <p className="mt-10 text-xs text-fd-muted-foreground">
          Source:{" "}
          <a className="underline-offset-4 hover:underline" href={entry.source} target="_blank" rel="noreferrer">
            {entry.source}
          </a>
        </p>
      ) : null}
    </main>
  );
}

function Section({ title, payload, lang }: { title: string; payload: string; lang: string }) {
  return (
    <section className="mt-8">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-wide text-fd-muted-foreground">{title}</h2>
        <CopyButton text={payload} label={`Copy ${title}`} />
      </div>
      <pre className="overflow-x-auto rounded-xl border border-fd-border bg-fd-card p-4 text-sm leading-relaxed">
        <code className={`language-${lang}`}>{payload}</code>
      </pre>
    </section>
  );
}
