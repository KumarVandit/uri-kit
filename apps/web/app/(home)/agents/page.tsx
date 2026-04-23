import Link from "next/link";

export const metadata = {
  title: "For AI agents",
  description: "Everything uri-kit exposes so AI agents can use the catalog first‑class.",
};

export default function AgentsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-4 flex items-center gap-2">
        <span className="uk-badge">built for agents</span>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        uri-kit is agent‑friendly by default.
      </h1>
      <p className="mt-3 text-fd-muted-foreground">
        Every URI is exposed as structured JSON, a plain‑text catalog, a
        live MCP server, and a SKILL.md file. Point your agent at any of
        these surfaces and it can compose, validate, and open deep links
        on Apple platforms.
      </p>

      <section className="mt-10 space-y-4">
        <Endpoint href="/llms.txt" title="/llms.txt" blurb="Short preamble + getting‑started pointers." />
        <Endpoint href="/llms-full.txt" title="/llms-full.txt" blurb="Full catalog flattened into Markdown + JSON." />
        <Endpoint href="/api.json" title="/api.json" blurb="Typed JSON, one entry per URI." />
        <Endpoint
          href="https://github.com/KumarVandit/uri-kit/blob/main/skills/uri-kit/SKILL.md"
          title="SKILL.md"
          blurb="Drop‑in skill file for Cursor / Claude auto‑discovery."
        />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">MCP server</h2>
        <p className="mt-1 text-fd-muted-foreground">Run a local MCP server over stdio:</p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-fd-border bg-fd-card p-4 text-sm">
{`npx uri-kit mcp`}
        </pre>
        <p className="mt-3 text-fd-muted-foreground">
          Exposes <code>search_uri</code>, <code>get_uri</code>,{" "}
          <code>build_uri</code>, <code>validate_uri</code>. See{" "}
          <Link className="underline-offset-4 hover:underline" href="/docs/mcp">
            the MCP docs
          </Link>{" "}
          for Claude Desktop / Cursor config snippets.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">uri-kit/agent</h2>
        <p className="mt-1 text-fd-muted-foreground">
          A tiny ESM export for inference‑time lookup in a JS runtime:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-fd-border bg-fd-card p-4 text-sm">
{`import { catalog, search, build, toSwift } from "uri-kit/agent";

const hit = search({ query: "wifi", platform: "ios" })[0];
build(hit);     // "prefs:root=WIFI"
toSwift(hit);   // full Swift snippet`}
        </pre>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Copy‑as‑code</h2>
        <p className="mt-1 text-fd-muted-foreground">
          Every catalog detail page has one‑click copy for TypeScript,
          Swift, Shortcut URL, macOS <code>open</code>, and a ready‑to‑paste
          agent prompt. Append <code>?prompt=1</code> to any detail URL to
          land directly on the prompt block.
        </p>
      </section>
    </main>
  );
}

function Endpoint({ href, title, blurb }: { href: string; title: string; blurb: string }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-fd-border p-5 transition hover:border-fd-foreground/40"
    >
      <div className="flex items-center justify-between">
        <code className="text-sm font-medium">{title}</code>
        <span className="text-fd-muted-foreground">→</span>
      </div>
      <p className="mt-1 text-sm text-fd-muted-foreground">{blurb}</p>
    </Link>
  );
}
