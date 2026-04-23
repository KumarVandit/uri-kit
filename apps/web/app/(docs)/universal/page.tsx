import Link from "next/link";
import styles from "../doc.module.css";

export const metadata = {
  title: "Universal Links — uri-kit",
  description: "Universal links on iOS and macOS",
};

export default function UniversalPage() {
  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>Concepts</span>
        <span className={styles.badge}>Universal Links</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Universal Links</h1>
      </div>

      <p className={styles.description}>
        Universal links are HTTPS URLs that open in an app when it&apos;s installed
        and fall back to the web when it&apos;s not. They&apos;re the modern, Apple-recommended
        replacement for most URI schemes.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why universal links</h2>
        <ul className={styles.list}>
          <li>Work on iOS 9+, iPadOS, macOS, and watchOS.</li>
          <li>No ugly scheme prefix — just a regular <code>https://</code> URL.</li>
          <li>Automatic fallback to Safari when the app isn&apos;t installed.</li>
          <li>Apple verifies ownership via a signed <code>apple-app-site-association</code> file, so scheme hijacking is impossible.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Opening a universal link</h2>
        <p className={styles.sectionDescription}>
          Use the <code className={styles.inlineCode}>url</code> field on a URI definition to bypass the scheme
          builder and pass a full HTTPS URL.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`const openPlaylist = defineURI({
  url: "https://music.apple.com/us/playlist/chill-mix/pl.abc123",
  title: "Open Chill Mix",
  platforms: ["ios", "macos"],
});`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Known universal link hosts</h2>
        <p className={styles.sectionDescription}>
          uri-kit&apos;s catalog includes universal links for the most common Apple services.
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Host</th>
              <th>Opens</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>music.apple.com</code></td><td>Apple Music</td></tr>
            <tr><td><code>podcasts.apple.com</code></td><td>Podcasts</td></tr>
            <tr><td><code>tv.apple.com</code></td><td>Apple TV</td></tr>
            <tr><td><code>books.apple.com</code></td><td>Books</td></tr>
            <tr><td><code>apps.apple.com</code></td><td>App Store</td></tr>
            <tr><td><code>maps.apple.com</code></td><td>Maps</td></tr>
            <tr><td><code>icloud.com</code></td><td>iCloud web / native apps</td></tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Falling back from a scheme</h2>
        <p className={styles.sectionDescription}>
          The cleanest production pattern: try the scheme first, fall back to the universal link.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`const openAppleMusic = defineURI({
  scheme: "music",
  path: "playlist/pl.abc123",
  fallback: {
    universalLink: "https://music.apple.com/playlist/pl.abc123",
  },
});`}</code>
        </pre>
      </section>

      <div className={styles.callout}>
        <strong>macOS tip:</strong> universal links work from Terminal via
        {" "}
        <code className={styles.inlineCode}>open https://music.apple.com/...</code>.
        On iOS, they must be invoked inside Safari or another app&apos;s webview.
      </div>

      <nav className={styles.pageNav}>
        <Link href="/schemes" className={styles.prevLink}>
          <span className={styles.navLabel}>Previous</span>
          <span className={styles.navTitle}>← URI Schemes</span>
        </Link>
        <Link href="/patches" className={styles.nextLink}>
          <span className={styles.navLabel}>Next</span>
          <span className={styles.navTitle}>Patches →</span>
        </Link>
      </nav>
    </article>
  );
}
