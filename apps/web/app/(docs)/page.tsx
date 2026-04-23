import { Card, CardGrid } from "@/components/card";
import { Playground } from "@/components/playground";
import { CopyForLLM } from "@/components/copy-for-llm";
import styles from "./page.module.css";

export const metadata = {
  title: "Overview",
  description: "Declarative deep links for Apple platforms.",
};

export default function OverviewPage() {
  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>v0.1.0</span>
        <span className={styles.badge}>111 URIs</span>
        <span className={styles.badge}>Apple only</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Overview</h1>
        <CopyForLLM />
      </div>

      <p className={styles.description}>
        uri-kit is a declarative deep links library for Apple platforms. Define URIs
        as plain objects and open them with a single function call.
      </p>

      <Playground />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quickstart</h2>
        <p className={styles.sectionDescription}>
          Install <code>uri-kit</code> with your package manager of choice.
        </p>

        <div className={styles.installBlock}>
          <div className={styles.installTabs}>
            <button className={`${styles.installTab} ${styles.active}`}>npm</button>
            <button className={styles.installTab}>yarn</button>
            <button className={styles.installTab}>pnpm</button>
            <button className={styles.installTab}>bun</button>
          </div>
          <pre className={styles.installCode}>
            <code>npm install uri-kit</code>
          </pre>
        </div>

        <p className={styles.sectionDescription}>
          Define a URI as a plain object and call the returned function to open it.
        </p>

        <pre className={styles.codeBlock}>
          <code>{`import { defineURI } from "uri-kit";

const openWiFi = defineURI({
  scheme: "prefs",
  path: "root=WIFI",
  platforms: ["ios", "ipados"],
});

openWiFi();`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Get Started</h2>
        <CardGrid>
          <Card href="/typescript" title="TypeScript" description="Understand the basic usage." />
          <Card href="/react" title="React" description="Learn the React hooks." />
        </CardGrid>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Integrate</h2>
        <CardGrid>
          <Card href="/patches" title="URI Patches" description="Bundling URIs as shareable patches." />
          <Card href="/react" title="React Hooks" description="useURI, usePatch, and more." />
          <Card href="/cli" title="CLI" description="Search, build, install, and MCP server." />
        </CardGrid>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Information</h2>
        <CardGrid>
          <Card href="/api-define-uri" title="API Reference" description="Full API documentation." />
          <Card href="/changelog" title="Changelog" description="What's new in each release." />
        </CardGrid>
      </section>

      <nav className={styles.pageNav}>
        <a href="/typescript" className={styles.nextLink}>
          <span className={styles.nextLabel}>Next</span>
          <span className={styles.nextTitle}>TypeScript →</span>
        </a>
      </nav>
    </article>
  );
}
