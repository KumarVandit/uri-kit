import Link from "next/link";
import styles from "../doc.module.css";

export const metadata = {
  title: "defineURI — uri-kit",
  description: "defineURI API reference",
};

export default function ApiDefineUriPage() {
  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>API</span>
        <span className={styles.badge}>defineURI</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>defineURI</h1>
      </div>

      <p className={styles.description}>
        The core primitive. Turns a declarative <code className={styles.inlineCode}>URIDefinition</code>
        {" "}
        into a callable that opens the URI and exposes its resolved URL.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Signature</h2>
        <pre className={styles.codeBlock}>
          <code>{`function defineURI(definition: URIDefinition): CallableURI;

type CallableURI = {
  (): Promise<void>;
  readonly url: string;
  readonly definition: URIDefinition;
};`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>URIDefinition fields</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>scheme</code></td>
              <td><code>string</code></td>
              <td>URL scheme without <code>://</code> (e.g. <code>prefs</code>, <code>music</code>).</td>
            </tr>
            <tr>
              <td><code>host</code></td>
              <td><code>string</code></td>
              <td>Authority/host portion (e.g. <code>music.apple.com</code>).</td>
            </tr>
            <tr>
              <td><code>path</code></td>
              <td><code>string</code></td>
              <td>Path after the authority. No leading slash.</td>
            </tr>
            <tr>
              <td><code>fragment</code></td>
              <td><code>string</code></td>
              <td>Fragment after <code>#</code>.</td>
            </tr>
            <tr>
              <td><code>params</code></td>
              <td><code>Record&lt;string, Primitive&gt;</code></td>
              <td>Query parameters. Values URI-encoded automatically.</td>
            </tr>
            <tr>
              <td><code>to</code></td>
              <td><code>string</code></td>
              <td>Shortcut for <code>sms:</code>/<code>tel:</code>/<code>mailto:</code> — written before the query string.</td>
            </tr>
            <tr>
              <td><code>url</code></td>
              <td><code>string</code></td>
              <td>Escape hatch — a fully formed URL. Overrides other URL fields.</td>
            </tr>
            <tr>
              <td><code>fallback</code></td>
              <td><code>Fallback</code></td>
              <td>App Store or universal link fallback. See below.</td>
            </tr>
            <tr>
              <td><code>platforms</code></td>
              <td><code>Platform[]</code></td>
              <td>Which Apple platforms this URI is known to work on.</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td>Human-readable title for docs and agents.</td>
            </tr>
            <tr>
              <td><code>description</code></td>
              <td><code>string</code></td>
              <td>Longer description.</td>
            </tr>
            <tr>
              <td><code>tags</code></td>
              <td><code>string[]</code></td>
              <td>Search tags.</td>
            </tr>
            <tr>
              <td><code>category</code></td>
              <td><code>Category</code></td>
              <td>Grouping: <code>settings</code>, <code>apple-app</code>, <code>media</code>, etc.</td>
            </tr>
            <tr>
              <td><code>onInvoke</code></td>
              <td><code>(url: string) =&gt; void</code></td>
              <td>Analytics hook, fired with the resolved URL on every invocation.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Fallback</h2>
        <pre className={styles.codeBlock}>
          <code>{`interface Fallback {
  appStoreId?: string;     // numeric App Store ID
  universalLink?: string;  // HTTPS fallback
  silent?: boolean;        // suppress dev warning
}`}</code>
        </pre>
        <p className={styles.sectionDescription}>
          If the page is still visible 1.5 s after invocation, uri-kit assumes the primary URI failed and opens the fallback.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Platform type</h2>
        <pre className={styles.codeBlock}>
          <code>{`type Platform =
  | "ios"
  | "ipados"
  | "macos"
  | "watchos"
  | "visionos";`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Examples</h2>

        <h3 className={styles.subsectionTitle}>Simple scheme</h3>
        <pre className={styles.codeBlock}>
          <code>{`const wifi = defineURI({ scheme: "prefs", path: "root=WIFI" });
// wifi.url === "prefs:root=WIFI"`}</code>
        </pre>

        <h3 className={styles.subsectionTitle}>With query params</h3>
        <pre className={styles.codeBlock}>
          <code>{`const maps = defineURI({
  scheme: "maps",
  params: { q: "Apple Park", ll: "37.3349,-122.00902" },
});
// maps.url === "maps:?q=Apple%20Park&ll=37.3349%2C-122.00902"`}</code>
        </pre>

        <h3 className={styles.subsectionTitle}>Universal link with fallback</h3>
        <pre className={styles.codeBlock}>
          <code>{`const openTrack = defineURI({
  url: "https://music.apple.com/us/album/1440841090",
  fallback: { appStoreId: "1108187390" },
  onInvoke: (url) => analytics.track("deeplink", { url }),
});`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Related</h2>
        <ul className={styles.list}>
          <li><code>open(target)</code> — open a definition, callable, or URL string.</li>
          <li><code>canOpen(target)</code> — best-effort check for whether a URI will open.</li>
          <li><code>loadPatch(patch)</code> — load a <Link href="/patches">patch bundle</Link>.</li>
          <li><code>queryCatalog(query)</code> — search the built-in catalog.</li>
        </ul>
      </section>

      <nav className={styles.pageNav}>
        <Link href="/patches" className={styles.prevLink}>
          <span className={styles.navLabel}>Previous</span>
          <span className={styles.navTitle}>← Patches</span>
        </Link>
        <Link href="/changelog" className={styles.nextLink}>
          <span className={styles.navLabel}>Next</span>
          <span className={styles.navTitle}>Changelog →</span>
        </Link>
      </nav>
    </article>
  );
}
