import { Card, CardGrid } from "@/components/card";
import { Playground } from "@/components/playground";
import { CopyForLLM } from "@/components/copy-for-llm";
import styles from "./page.module.css";

export const metadata = {
  title: "uri-kit",
  description: "Declarative deep links for Apple platforms.",
};

const installCommands = [
  { label: "npm", value: "npm install uri-kit" },
  { label: "yarn", value: "yarn add uri-kit" },
  { label: "pnpm", value: "pnpm add uri-kit" },
  { label: "bun", value: "bun add uri-kit" },
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>uri-kit</h1>
        <CopyForLLM />
      </div>

      <p className={styles.description}>
        Declarative deep links for Apple platforms. Typed iOS settings URLs,
        system app schemes, universal links, and x-callback-url.
      </p>

      <Playground />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quickstart</h2>
        <p className={styles.sectionDescription}>
          Install <code>uri-kit</code> with your package manager of choice.
        </p>

        <div className={styles.installTabs}>
          {installCommands.map((cmd) => (
            <div key={cmd.label} className={styles.tab}>
              <span className={styles.tabLabel}>{cmd.label}</span>
              <code className={styles.tabCode}>{cmd.value}</code>
            </div>
          ))}
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
          <Card href="/docs/typescript" title="TypeScript" description="Understand the basic usage." />
          <Card href="/docs/react" title="React" description="Learn the React hooks." />
        </CardGrid>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Integrate</h2>
        <CardGrid>
          <Card href="/docs/patches" title="URI Patches" description="Bundling URIs as shareable patches." />
          <Card href="/docs/react" title="React Hooks" description="useURI, usePatch, and more." />
          <Card href="/docs/cli" title="CLI" description="Search, build, install, and MCP server." />
        </CardGrid>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Information</h2>
        <CardGrid>
          <Card href="/docs/api-define-uri" title="API Reference" description="Full API documentation." />
          <Card href="/docs/changelog" title="Changelog" description="What's new in each release." />
        </CardGrid>
      </section>
    </main>
  );
}
// trigger redeploy
