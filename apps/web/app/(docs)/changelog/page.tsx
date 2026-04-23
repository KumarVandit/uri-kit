import Link from "next/link";
import styles from "../doc.module.css";

export const metadata = {
  title: "Changelog — uri-kit",
  description: "Version history for uri-kit",
};

interface Release {
  version: string;
  date: string;
  tag?: string;
  changes: {
    added?: string[];
    changed?: string[];
    fixed?: string[];
  };
}

const RELEASES: Release[] = [
  {
    version: "0.1.0",
    date: "2026-04-23",
    tag: "Initial",
    changes: {
      added: [
        "Core defineURI primitive with fallbacks, analytics hooks, and platform metadata.",
        "Catalog of 111 Apple-platform URIs covering iOS Settings, macOS System Settings, Apple apps, and x-callback endpoints.",
        "React hooks: useURI and usePatch.",
        "CLI with search, list, build, check, init, add, llms, and mcp commands.",
        "MCP server exposing the catalog to any AI agent.",
        "Three bundled patches: apple-core, ios-settings, macos-settings.",
        "Agent-friendly endpoints: /llms.txt, /llms-full.txt, /api.json.",
        "Full TypeScript types with strict mode.",
      ],
    },
  },
];

export default function ChangelogPage() {
  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>Resources</span>
        <span className={styles.badge}>Changelog</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Changelog</h1>
      </div>

      <p className={styles.description}>
        All notable changes to uri-kit. Follows{" "}
        <a
          href="https://semver.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--ds-gray-12)", textDecoration: "underline" }}
        >
          semantic versioning
        </a>
        {" "}and{" "}
        <a
          href="https://keepachangelog.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--ds-gray-12)", textDecoration: "underline" }}
        >
          keepachangelog
        </a>
        .
      </p>

      {RELEASES.map((release) => (
        <section key={release.version} className={styles.section}>
          <h2 className={styles.sectionTitle}>
            v{release.version}
            {release.tag && (
              <span
                style={{
                  marginLeft: 12,
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: 999,
                  background: "var(--ds-gray-a3)",
                  color: "var(--ds-gray-11)",
                  verticalAlign: "middle",
                }}
              >
                {release.tag}
              </span>
            )}
          </h2>
          <p className={styles.sectionDescription}>
            Released <time dateTime={release.date}>{release.date}</time>
          </p>

          {release.changes.added && (
            <>
              <h3 className={styles.subsectionTitle}>Added</h3>
              <ul className={styles.list}>
                {release.changes.added.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}

          {release.changes.changed && (
            <>
              <h3 className={styles.subsectionTitle}>Changed</h3>
              <ul className={styles.list}>
                {release.changes.changed.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}

          {release.changes.fixed && (
            <>
              <h3 className={styles.subsectionTitle}>Fixed</h3>
              <ul className={styles.list}>
                {release.changes.fixed.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      ))}

      <div className={styles.callout}>
        <strong>Following along:</strong> full release notes are published on{" "}
        <a
          href="https://github.com/KumarVandit/uri-kit/releases"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--ds-gray-12)", textDecoration: "underline" }}
        >
          GitHub
        </a>
        {" "}alongside a git tag for every version.
      </div>

      <nav className={styles.pageNav}>
        <Link href="/api-define-uri" className={styles.prevLink}>
          <span className={styles.navLabel}>Previous</span>
          <span className={styles.navTitle}>← defineURI API</span>
        </Link>
        <Link href="/library" className={styles.nextLink}>
          <span className={styles.navLabel}>Next</span>
          <span className={styles.navTitle}>Library →</span>
        </Link>
      </nav>
    </article>
  );
}
