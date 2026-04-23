"use client";

import { DrawerPreview as Drawer } from "@base-ui/react/drawer";
import HotDrink from "@uri-kit/icons/fill/hot-drink";
import Github from "@uri-kit/icons/social-media/github";
import XTwitter from "@uri-kit/icons/social-media/x-twitter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { useDrawerPortalContainer } from "@/components/drawer-shell";
import { SidebarRoot } from "@/components/sidebar";
import { useSidebarSlot } from "@/components/sidebar-slot";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./styles.module.css";

const LINKS = [
  {
    href: "/",
    label: "Docs",
    match: (p: string) => !p.startsWith("/library"),
  },
  {
    href: "/library",
    label: "Library",
    match: (p: string) => p.startsWith("/library"),
  },
];

export function TopNav() {
  const pathname = usePathname();
  const sidebarContent = useSidebarSlot();
  const portalContainer = useDrawerPortalContainer();
  const [open, setOpen] = useState(false);
  const closeDrawer = useCallback(() => setOpen(false), []);
  const wasOpenRef = useRef(open);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <LinkIcon className={styles.logoIcon} />
          <span className={styles.logoText}>uri-kit</span>
        </Link>
        <div className={styles.links}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${link.match(pathname) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className={styles.actions}>
          {sidebarContent && (
            <Drawer.Root
              open={open}
              onOpenChange={(next) => {
                setOpen(next);
                wasOpenRef.current = next;
              }}
              modal={false}
            >
              <Drawer.Trigger className={styles.menuButton} aria-label="Menu">
                <MenuIcon open={open} />
              </Drawer.Trigger>
              <Drawer.Portal container={portalContainer}>
                <Drawer.Backdrop className={styles.backdrop} />
                <Drawer.Viewport className={styles.viewport}>
                  <Drawer.Popup className={styles.popup}>
                    <div className={styles.handle} />
                    <Drawer.Content className={styles.content}>
                      <SidebarRoot onNavigate={closeDrawer}>
                        {sidebarContent}
                      </SidebarRoot>
                    </Drawer.Content>
                  </Drawer.Popup>
                </Drawer.Viewport>
              </Drawer.Portal>
            </Drawer.Root>
          )}
          <a
            href="https://github.com/KumarVandit/uri-kit"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="GitHub"
          >
            <Github width={15} height={15} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <line x1="4" y1="4" x2="12" y2="12" />
          <line x1="12" y1="4" x2="4" y2="12" />
        </>
      ) : (
        <>
          <line x1="2" y1="4.5" x2="14" y2="4.5" />
          <line x1="2" y1="8" x2="14" y2="8" />
          <line x1="2" y1="11.5" x2="14" y2="11.5" />
        </>
      )}
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9.5 7.5C9.5 8.88 10.62 10 12 10s2.5-1.12 2.5-2.5S13.38 5 12 5s-2.5 1.12-2.5 2.5z"
        fill="currentColor"
      />
      <path
        d="M4.5 7.5C4.5 8.88 5.62 10 7 10s2.5-1.12 2.5-2.5S8.38 5 7 5s-2.5 1.12-2.5 2.5z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M14.5 7.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5S18.38 5 17 5s-2.5 1.12-2.5 2.5z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M12 15c-1.38 0-2.5 1.12-2.5 2.5S10.62 20 12 20s2.5-1.12 2.5-2.5S13.38 15 12 15z"
        fill="currentColor"
      />
      <path
        d="M12 15c-1.38 0-2.5 1.12-2.5 2.5S10.62 20 12 20s2.5-1.12 2.5-2.5S13.38 15 12 15z"
        fill="currentColor"
        transform="rotate(45 12 17.5)"
      />
      <path
        d="M12 15c-1.38 0-2.5 1.12-2.5 2.5S10.62 20 12 20s2.5-1.12 2.5-2.5S13.38 15 12 15z"
        fill="currentColor"
        transform="rotate(-45 12 17.5)"
      />
    </svg>
  );
}
