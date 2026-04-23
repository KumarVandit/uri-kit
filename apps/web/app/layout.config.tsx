import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="font-semibold tracking-tight">
        uri‑kit
      </span>
    ),
  },
  links: [
    { text: "Docs", url: "/docs", active: "nested-url" },
    { text: "Catalog", url: "/catalog", active: "url" },
    { text: "Agents", url: "/agents", active: "url" },
    { text: "GitHub", url: "https://github.com/KumarVandit/uri-kit", external: true },
  ],
};
