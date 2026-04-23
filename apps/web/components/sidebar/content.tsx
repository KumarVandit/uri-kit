"use client";

import type { Root as PageTree } from "fumadocs-core/page-tree";
import {
  SidebarAside,
  SidebarHeader,
  SidebarNav,
  SidebarTree,
} from "./index";

const TREE: PageTree = {
  name: "uri-kit",
  children: [
    { type: "separator" },
    { type: "page", name: "Overview", url: "/" },
    { type: "separator" },
    {
      type: "folder",
      name: "Getting Started",
      children: [
        { type: "page", name: "TypeScript", url: "/typescript" },
        { type: "page", name: "React", url: "/react" },
      ],
    },
    { type: "page", name: "Command Line", url: "/cli" },
    { type: "separator" },
    {
      type: "folder",
      name: "Concepts",
      children: [
        { type: "page", name: "URI Schemes", url: "/schemes" },
        { type: "page", name: "Universal Links", url: "/universal" },
      ],
    },
    {
      type: "folder",
      name: "Integrations",
      children: [{ type: "page", name: "Patches", url: "/patches" }],
    },
    {
      type: "folder",
      name: "API",
      children: [{ type: "page", name: "defineURI", url: "/api-define-uri" }],
    },
    { type: "separator" },
    {
      type: "folder",
      name: "Resources",
      children: [{ type: "page", name: "Changelog", url: "/changelog" }],
    },
    { type: "separator" },
    {
      type: "page",
      name: "GitHub",
      url: "github",
      external: true,
    },
    {
      type: "page",
      name: "npm",
      url: "npm",
      external: true,
    },
  ],
};

export function SidebarContent() {
  return (
    <SidebarAside>
      <SidebarHeader>uri-kit</SidebarHeader>
      <SidebarNav>
        <SidebarTree tree={TREE} />
      </SidebarNav>
    </SidebarAside>
  );
}
