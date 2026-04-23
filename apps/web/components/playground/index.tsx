"use client";

import { Button } from "@base-ui/react/button";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import styles from "./styles.module.css";

const spring = { type: "spring", stiffness: 500, damping: 25 } as const;

const URI_DEMOS = [
  { id: "wifi", label: "Open Wi-Fi Settings", scheme: "prefs", path: "root=WIFI" },
  { id: "sms", label: "Compose SMS", scheme: "sms", path: "+15550123456" },
  { id: "maps", label: "Open Maps", scheme: "maps", path: "?q=Cupertino,CA" },
  { id: "mail", label: "Compose Email", scheme: "mailto", path: "hello@example.com" },
] as const;

function openURI(scheme: string, path: string) {
  const url = `${scheme}:${path}`;
  window.location.href = url;
}

function URIButton({ label, scheme, path, onClick }: { label: string; scheme: string; path: string; onClick: (scheme: string, path: string) => void }) {
  return (
    <Button
      className={styles.uriButton}
      render={
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.92 }}
          transition={spring}
        />
      }
      onClick={() => onClick(scheme, path)}
    >
      {label}
    </Button>
  );
}

export function Playground() {
  const [lastOpened, setLastOpened] = useState<string | null>(null);

  const handleOpen = useCallback((scheme: string, path: string) => {
    setLastOpened(`${scheme}:${path}`);
    openURI(scheme, path);
  }, []);

  return (
    <div className={styles.playground}>
      <div className={styles.grid}>
        {URI_DEMOS.map((demo) => (
          <div key={demo.id} className={styles.cell}>
            <URIButton
              label={demo.label}
              scheme={demo.scheme}
              path={demo.path}
              onClick={handleOpen}
            />
          </div>
        ))}
      </div>
      {lastOpened && (
        <div className={styles.lastOpened}>
          Last opened: <code>{lastOpened}</code>
        </div>
      )}
    </div>
  );
}
