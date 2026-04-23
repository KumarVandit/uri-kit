import Link from "next/link";
import styles from "../doc.module.css";

export const metadata = {
  title: "Command Line — uri-kit",
  description: "Command line interface for uri-kit",
};

export default function CliPage() {
  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>Tools</span>
        <span className={styles.badge}>CLI</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Command Line</h1>
      </div>

      <p className={styles.description}>
        The <code className={styles.inlineCode}>uri-kit</code> CLI lets you search the catalog, build URIs, inspect patches,
        and expose the library as an MCP server to any AI agent.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Install</h2>
        <p className={styles.sectionDescription}>
          The CLI is bundled with the package. Use <code className={styles.inlineCode}>npx</code> for one-off invocations
          or install globally.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`npx uri-kit --help

# Or install globally
npm install -g uri-kit
uri-kit --help`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Commands</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>uri-kit search &lt;query&gt;</code></td>
              <td>Search the catalog by id, title, tag, or scheme.</td>
            </tr>
            <tr>
              <td><code>uri-kit list</code></td>
              <td>List all URIs, grouped by category.</td>
            </tr>
            <tr>
              <td><code>uri-kit build</code></td>
              <td>Build a URI string from inline flags (<code>--scheme</code>, <code>--path</code>, etc).</td>
            </tr>
            <tr>
              <td><code>uri-kit check &lt;url&gt;</code></td>
              <td>Validate a URI string against the catalog.</td>
            </tr>
            <tr>
              <td><code>uri-kit init</code></td>
              <td>Scaffold a project with starter URIs and a patch.</td>
            </tr>
            <tr>
              <td><code>uri-kit add &lt;id&gt;</code></td>
              <td>Copy a catalog entry into your project.</td>
            </tr>
            <tr>
              <td><code>uri-kit llms</code></td>
              <td>Emit an llms.txt summary for agents.</td>
            </tr>
            <tr>
              <td><code>uri-kit mcp</code></td>
              <td>Start the MCP server on stdio.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Examples</h2>

        <h3 className={styles.subsectionTitle}>Search</h3>
        <pre className={styles.codeBlock}>
          <code>{`$ npx uri-kit search wifi

settings.wifi          Wi-Fi Settings              ios, ipados
settings.wifi-disabled Disable Wi-Fi              ios
music.radio            Apple Music Radio          ios, macos`}</code>
        </pre>

        <h3 className={styles.subsectionTitle}>Build</h3>
        <pre className={styles.codeBlock}>
          <code>{`$ npx uri-kit build --scheme prefs --path root=WIFI
prefs:root=WIFI

$ npx uri-kit build --scheme sms --to +15550123456
sms:+15550123456`}</code>
        </pre>

        <h3 className={styles.subsectionTitle}>MCP Server</h3>
        <p className={styles.sectionDescription}>
          Expose uri-kit to any MCP-compatible agent (Claude Desktop, Cursor, Cline):
        </p>
        <pre className={styles.codeBlock}>
          <code>{`{
  "mcpServers": {
    "uri-kit": {
      "command": "npx",
      "args": ["-y", "uri-kit", "mcp"]
    }
  }
}`}</code>
        </pre>
      </section>

      <nav className={styles.pageNav}>
        <Link href="/react" className={styles.prevLink}>
          <span className={styles.navLabel}>Previous</span>
          <span className={styles.navTitle}>← React</span>
        </Link>
        <Link href="/schemes" className={styles.nextLink}>
          <span className={styles.navLabel}>Next</span>
          <span className={styles.navTitle}>URI Schemes →</span>
        </Link>
      </nav>
    </article>
  );
}
