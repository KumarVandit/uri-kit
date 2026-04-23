import type { ReactNode } from "react";
import { SidebarRoot } from "@/components/sidebar";
import { SidebarContent } from "@/components/sidebar/content";
import { SidebarSlotSetter } from "@/components/sidebar-slot";
import styles from "./layout.module.css";

export const metadata = {
  title: "Overview",
  description: "Declarative deep links for Apple platforms.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.layout}>
      <SidebarRoot>
        <SidebarContent />
      </SidebarRoot>
      <SidebarSlotSetter>
        <SidebarContent />
      </SidebarSlotSetter>
      {children}
    </main>
  );
}
