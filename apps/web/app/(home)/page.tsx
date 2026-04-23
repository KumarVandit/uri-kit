import Link from "next/link";
import { CATALOG_META } from "uri-kit/data";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div className="mb-8 flex items-center gap-2">
        <span className="uk-badge">v0.1.0</span>
        <span className="uk-badge">{CATALOG_META.counts.total} URIs</span>
        <span className="uk-badge">Apple only</span>
      </div>

      <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
        Declarative deep links for Apple platforms.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-fd-muted-foreground">
        Describe a URI as a plain object, open it with one call. Typed iOS
        settings URLs, system app schemes, universal links, and{" "}
        <code>x-callback-url</code>. Ships with an MCP server, a SKILL.md,
        and <code>llms.txt</code> so AI agents can use the catalog as well.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/docs"
          className="inline-flex h-10 items-center rounded-full bg-fd-foreground px-5 text-sm font-medium text-fd-background transition hover:opacity-90"
        >
          Read the docs
        </Link>
        <Link
          href="/catalog"
          className="inline-flex h-10 items-center rounded-full border border-fd-border px-5 text-sm font-medium hover:bg-fd-muted"
        >
          Browse the catalog
        </Link>
        <Link
          href="/agents"
          className="inline-flex h-10 items-center rounded-full border border-fd-border px-5 text-sm font-medium hover:bg-fd-muted"
        >
          For AI agents
        </Link>
      </div>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <Card title="Quickstart" href="/docs">
          <pre className="overflow-x-auto text-sm leading-relaxed">
{`import { defineURI } from "uri-kit";

const openWiFi = defineURI({
  scheme: "prefs",
  path: "root=WIFI",
  platforms: ["ios", "ipados"],
});

openWiFi();`}
          </pre>
        </Card>

        <Card title="React" href="/docs/react">
          <pre className="overflow-x-auto text-sm leading-relaxed">
{`import { usePatch } from "uri-kit/react";

const patch = usePatch("/patches/apple-core.json");

<button
  onClick={() => patch.open("settings.wifi")}
  disabled={!patch.ready}>
  Open Wi‑Fi
</button>`}
          </pre>
        </Card>

        <Card title="CLI" href="/docs/cli">
          <pre className="overflow-x-auto text-sm leading-relaxed">
{`npx uri-kit search wifi
npx uri-kit build '{"scheme":"sms","to":"+1555"}'
npx uri-kit add user/repo
npx uri-kit mcp`}
          </pre>
        </Card>

        <Card title="AI agents" href="/agents">
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li><code>/llms.txt</code> + <code>/llms-full.txt</code></li>
            <li><code>/api.json</code> typed catalog</li>
            <li>Bundled MCP server (<code>npx uri-kit mcp</code>)</li>
            <li><code>SKILL.md</code> for Cursor/Claude</li>
            <li>Copy‑as‑code buttons on every entry</li>
          </ul>
        </Card>
      </section>
    </main>
  );
}

function Card({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-fd-border bg-fd-card p-5 transition hover:border-fd-foreground/30"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <span className="text-fd-muted-foreground transition group-hover:translate-x-0.5">→</span>
      </div>
      {children}
    </Link>
  );
}
