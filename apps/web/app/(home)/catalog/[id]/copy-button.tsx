"use client";

import { useState } from "react";

export function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          // no‑op; some browsers lock clipboard without gesture
        }
      }}
      className="inline-flex h-7 items-center rounded-full border border-fd-border px-3 text-xs text-fd-muted-foreground transition hover:bg-fd-muted hover:text-fd-foreground"
    >
      {copied ? "Copied" : label ?? "Copy"}
    </button>
  );
}
