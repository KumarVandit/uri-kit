import Link from "next/link";
import styles from "../doc.module.css";

export const metadata = {
  title: "React — uri-kit",
  description: "React hooks for uri-kit",
};

export default function ReactPage() {
  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>Getting Started</span>
        <span className={styles.badge}>React</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>React</h1>
      </div>

      <p className={styles.description}>
        uri-kit ships with first-class React hooks for opening URIs, loading
        patches, and building declarative deep link UIs.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Installation</h2>
        <p className={styles.sectionDescription}>
          The hooks live under the <code className={styles.inlineCode}>uri-kit/react</code> subpath — no separate package required.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`npm install uri-kit`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>useURI</h2>
        <p className={styles.sectionDescription}>
          Memoizes a <code className={styles.inlineCode}>defineURI</code> call and returns a stable callable plus the resolved URL.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`"use client";

import { useURI } from "uri-kit/react";

export function WifiButton() {
  const wifi = useURI({
    scheme: "prefs",
    path: "root=WIFI",
  });

  return (
    <button onClick={() => wifi.open()}>
      Open Wi-Fi Settings
      <span>{wifi.url}</span>
    </button>
  );
}`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>usePatch</h2>
        <p className={styles.sectionDescription}>
          Load a <Link href="/patches">patch</Link> (a bundle of URIs) and get back a map of callable URIs keyed by id.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`"use client";

import { usePatch } from "uri-kit/react";
import appleCore from "uri-kit/patches/apple-core.json";

export function SettingsMenu() {
  const uris = usePatch(appleCore);

  return (
    <ul>
      <li onClick={() => uris["settings.wifi"].open()}>Wi-Fi</li>
      <li onClick={() => uris["settings.bluetooth"].open()}>Bluetooth</li>
      <li onClick={() => uris["settings.cellular"].open()}>Cellular</li>
    </ul>
  );
}`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>SSR safe by default</h2>
        <p className={styles.sectionDescription}>
          Calling <code className={styles.inlineCode}>useURI</code> during server rendering is safe — invoking
          the returned callable is a no-op on the server. The URL string is always available for rendering.
        </p>
        <div className={styles.callout}>
          <strong>Tip:</strong> use the <code className={styles.inlineCode}>onInvoke</code> callback for analytics.
          It fires whenever the URI is opened, with the resolved URL string.
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Next.js App Router</h2>
        <p className={styles.sectionDescription}>
          The hooks require a client component. Add <code className={styles.inlineCode}>&quot;use client&quot;</code> at the top of any file that imports from
          {" "}
          <code className={styles.inlineCode}>uri-kit/react</code>.
        </p>
      </section>

      <nav className={styles.pageNav}>
        <Link href="/typescript" className={styles.prevLink}>
          <span className={styles.navLabel}>Previous</span>
          <span className={styles.navTitle}>← TypeScript</span>
        </Link>
        <Link href="/cli" className={styles.nextLink}>
          <span className={styles.navLabel}>Next</span>
          <span className={styles.navTitle}>Command Line →</span>
        </Link>
      </nav>
    </article>
  );
}
