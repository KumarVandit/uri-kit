import Link from "next/link";
import styles from "../doc.module.css";

export const metadata = {
  title: "URI Schemes — uri-kit",
  description: "URI schemes reference for Apple platforms",
};

export default function SchemesPage() {
  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>Concepts</span>
        <span className={styles.badge}>Schemes</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>URI Schemes</h1>
      </div>

      <p className={styles.description}>
        URI schemes are the older, simpler form of deep link on Apple platforms.
        They&apos;re the <code className={styles.inlineCode}>prefs:</code>, <code className={styles.inlineCode}>sms:</code>,
        and <code className={styles.inlineCode}>music:</code> URLs you&apos;ve seen. uri-kit normalizes every scheme
        Apple ships with and adds a curated set of third-party schemes.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>System schemes</h2>
        <p className={styles.sectionDescription}>
          These are the scheme prefixes you can use today with <code className={styles.inlineCode}>defineURI</code>.
        </p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Scheme</th>
              <th>Opens</th>
              <th>Platforms</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>prefs:</code></td>
              <td>iOS Settings app</td>
              <td>iOS, iPadOS</td>
            </tr>
            <tr>
              <td><code>App-prefs:</code></td>
              <td>iOS Settings (alt syntax)</td>
              <td>iOS, iPadOS</td>
            </tr>
            <tr>
              <td><code>x-apple.systempreferences:</code></td>
              <td>macOS System Settings</td>
              <td>macOS</td>
            </tr>
            <tr>
              <td><code>sms:</code></td>
              <td>Messages</td>
              <td>iOS, iPadOS, macOS</td>
            </tr>
            <tr>
              <td><code>tel:</code></td>
              <td>Phone</td>
              <td>iOS</td>
            </tr>
            <tr>
              <td><code>facetime:</code></td>
              <td>FaceTime</td>
              <td>iOS, macOS</td>
            </tr>
            <tr>
              <td><code>mailto:</code></td>
              <td>Mail</td>
              <td>iOS, iPadOS, macOS</td>
            </tr>
            <tr>
              <td><code>music:</code></td>
              <td>Apple Music</td>
              <td>iOS, macOS</td>
            </tr>
            <tr>
              <td><code>maps:</code></td>
              <td>Apple Maps</td>
              <td>iOS, macOS</td>
            </tr>
            <tr>
              <td><code>shareddocuments:</code></td>
              <td>Files / iCloud Drive</td>
              <td>iOS, iPadOS</td>
            </tr>
            <tr>
              <td><code>shortcuts:</code></td>
              <td>Shortcuts</td>
              <td>iOS, macOS</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How schemes are built</h2>
        <p className={styles.sectionDescription}>
          uri-kit assembles a URI from the fields on your definition in this order:
        </p>
        <pre className={styles.codeBlock}>
          <code>{`{scheme}://{host}/{path}?{query}#{fragment}`}</code>
        </pre>
        <p className={styles.sectionDescription}>
          Missing parts are dropped. <code className={styles.inlineCode}>prefs:root=WIFI</code> drops the double slash
          because <code className={styles.inlineCode}>host</code> is absent — this matches iOS&apos;s Settings URL shape.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Handling third-party schemes</h2>
        <p className={styles.sectionDescription}>
          You can define any third-party scheme the same way. Always pair third-party schemes with a
          {" "}
          <code className={styles.inlineCode}>fallback</code> in case the target app isn&apos;t installed.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`const openSpotify = defineURI({
  scheme: "spotify",
  path: "playlist/37i9dQZF1DXcBWIGoYBM5M",
  fallback: {
    universalLink: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  },
});`}</code>
        </pre>
      </section>

      <div className={styles.callout}>
        <strong>Gotcha:</strong> iOS silently drops unknown schemes with no error. Always test on-device,
        and always provide a fallback.
      </div>

      <nav className={styles.pageNav}>
        <Link href="/cli" className={styles.prevLink}>
          <span className={styles.navLabel}>Previous</span>
          <span className={styles.navTitle}>← Command Line</span>
        </Link>
        <Link href="/universal" className={styles.nextLink}>
          <span className={styles.navLabel}>Next</span>
          <span className={styles.navTitle}>Universal Links →</span>
        </Link>
      </nav>
    </article>
  );
}
