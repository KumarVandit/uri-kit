import Link from "next/link";
import styles from "../doc.module.css";

export const metadata = {
  title: "TypeScript — uri-kit",
  description: "TypeScript usage guide for uri-kit",
};

export default function TypeScriptPage() {
  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>Getting Started</span>
        <span className={styles.badge}>TypeScript</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>TypeScript</h1>
      </div>

      <p className={styles.description}>
        uri-kit is written in TypeScript with strict types. Every URI you define
        is fully type-checked, auto-completed, and validated at compile time.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Installation</h2>
        <p className={styles.sectionDescription}>
          Install the package with your favourite package manager.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`npm install uri-kit`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Defining a URI</h2>
        <p className={styles.sectionDescription}>
          Use <code className={styles.inlineCode}>defineURI</code> to turn a plain object into a callable that opens the URI when invoked.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`import { defineURI } from "uri-kit";

const openWiFi = defineURI({
  scheme: "prefs",
  path: "root=WIFI",
  platforms: ["ios", "ipados"],
  title: "Open Wi-Fi Settings",
});

openWiFi();            // navigates
openWiFi.url;          // "prefs:root=WIFI"
openWiFi.definition;   // the raw URIDefinition`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The URIDefinition type</h2>
        <p className={styles.sectionDescription}>
          Every URI is described by a single declarative object. All fields are optional except that at least one of
          {" "}
          <code className={styles.inlineCode}>scheme</code> or <code className={styles.inlineCode}>url</code> must be provided.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`interface URIDefinition {
  scheme?: string;       // "prefs", "music", "sms"
  host?: string;         // "music.apple.com"
  path?: string;         // "root=WIFI"
  fragment?: string;     // "#section"
  params?: Record<string, string | number | boolean | undefined>;
  to?: string;           // sms:/tel:/mailto: shortcut
  url?: string;          // escape hatch — full URL
  fallback?: Fallback;   // App Store or universal link
  platforms?: Platform[];
  title?: string;
  description?: string;
  tags?: string[];
  category?: Category;
  onInvoke?: (url: string) => void;
}`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Fallbacks</h2>
        <p className={styles.sectionDescription}>
          On iOS Safari there is no reliable signal for whether a URI opened an app. Provide a
          {" "}
          <code className={styles.inlineCode}>fallback</code> and uri-kit will open the App Store or a universal link
          if the page is still visible after 1.5 seconds.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`const openBear = defineURI({
  scheme: "bear",
  path: "open-note",
  params: { id: "abc123" },
  fallback: {
    appStoreId: "1016366447",
  },
});`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Programmatic open</h2>
        <p className={styles.sectionDescription}>
          Skip the intermediate callable when you just want to open something once.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`import { open } from "uri-kit";

await open({ scheme: "sms", to: "+15550123456" });
await open("prefs:root=WIFI");`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Using the catalog</h2>
        <p className={styles.sectionDescription}>
          The library ships with 100+ typed URIs for Apple apps, iOS Settings, macOS System Preferences, and x-callback-url endpoints.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`import { CATALOG, queryCatalog, getById } from "uri-kit";

getById("settings.wifi");
queryCatalog({ platform: "ios", search: "bluetooth" });
Object.keys(CATALOG).length; // 111`}</code>
        </pre>
      </section>

      <nav className={styles.pageNav}>
        <Link href="/" className={styles.prevLink}>
          <span className={styles.navLabel}>Previous</span>
          <span className={styles.navTitle}>← Overview</span>
        </Link>
        <Link href="/react" className={styles.nextLink}>
          <span className={styles.navLabel}>Next</span>
          <span className={styles.navTitle}>React →</span>
        </Link>
      </nav>
    </article>
  );
}
