import Link from "next/link";
import styles from "../doc.module.css";

export const metadata = {
  title: "Patches — uri-kit",
  description: "URI patches bundle format",
};

export default function PatchesPage() {
  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>Integrations</span>
        <span className={styles.badge}>Patches</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Patches</h1>
      </div>

      <p className={styles.description}>
        A patch is a named bundle of URIs shipped as JSON. Patches make it easy to share
        curated sets of deep links — team-wide, across repos, or as npm packages.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Format</h2>
        <p className={styles.sectionDescription}>
          A patch is a plain JSON object matching the <code className={styles.inlineCode}>Patch</code> type.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`interface Patch {
  name: string;
  version: string;
  description?: string;
  author?: string;
  homepage?: string;
  license?: string;
  uris: Record<string, URIDefinition>;
}`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Example</h2>
        <p className={styles.sectionDescription}>
          A small team patch with two iOS Settings shortcuts.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`{
  "name": "team-utilities",
  "version": "1.0.0",
  "description": "Internal deep links for the mobile team",
  "uris": {
    "wifi": {
      "scheme": "prefs",
      "path": "root=WIFI",
      "title": "Open Wi-Fi Settings"
    },
    "vpn": {
      "scheme": "prefs",
      "path": "root=General&path=VPN",
      "title": "Open VPN Settings"
    }
  }
}`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Loading a patch</h2>

        <h3 className={styles.subsectionTitle}>TypeScript</h3>
        <pre className={styles.codeBlock}>
          <code>{`import { loadPatch } from "uri-kit";
import team from "./team-utilities.json";

const uris = loadPatch(team);
await uris.wifi();         // opens Wi-Fi
await uris.vpn();          // opens VPN`}</code>
        </pre>

        <h3 className={styles.subsectionTitle}>React</h3>
        <pre className={styles.codeBlock}>
          <code>{`"use client";

import { usePatch } from "uri-kit/react";
import team from "./team-utilities.json";

export function TeamMenu() {
  const uris = usePatch(team);
  return <button onClick={() => uris.wifi.open()}>Wi-Fi</button>;
}`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Bundled patches</h2>
        <p className={styles.sectionDescription}>
          uri-kit ships with three official patches you can import directly.
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Patch</th>
              <th>Contents</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>apple-core</code></td>
              <td>Every first-party Apple app URI in the catalog.</td>
            </tr>
            <tr>
              <td><code>ios-settings</code></td>
              <td>All iOS Settings deep links.</td>
            </tr>
            <tr>
              <td><code>macos-settings</code></td>
              <td>macOS System Settings pane URLs.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Publishing a patch</h2>
        <p className={styles.sectionDescription}>
          Any npm package that exports a JSON file matching the Patch shape counts as a patch.
          Ship it like any other library.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`// package.json
{
  "name": "@acme/uri-patch",
  "exports": {
    ".": "./patch.json"
  }
}`}</code>
        </pre>
      </section>

      <nav className={styles.pageNav}>
        <Link href="/universal" className={styles.prevLink}>
          <span className={styles.navLabel}>Previous</span>
          <span className={styles.navTitle}>← Universal Links</span>
        </Link>
        <Link href="/api-define-uri" className={styles.nextLink}>
          <span className={styles.navLabel}>Next</span>
          <span className={styles.navTitle}>defineURI API →</span>
        </Link>
      </nav>
    </article>
  );
}
