"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

const PLATFORMS = ["ios", "ipados", "macos", "watchos", "visionos"] as const;
const CATEGORIES = [
  "settings",
  "apple-app",
  "communication",
  "media",
  "navigation",
  "productivity",
  "developer",
  "system",
  "shortcuts",
  "x-callback",
] as const;

export function CatalogFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const update = useCallback(
    (key: string, value?: string) => {
      const next = new URLSearchParams(params);
      if (!value) next.delete(key);
      else next.set(key, value);
      startTransition(() => {
        router.push(`/catalog?${next.toString()}`, { scroll: false });
      });
    },
    [params, router],
  );

  return (
    <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
      <input
        defaultValue={params.get("q") ?? ""}
        placeholder="Search e.g. wifi, camera, mailto, music playlist…"
        onChange={(e) => update("q", e.currentTarget.value)}
        className="h-10 rounded-full border border-fd-border bg-fd-background px-4 text-sm outline-none focus:border-fd-foreground/40"
      />
      <select
        defaultValue={params.get("platform") ?? ""}
        onChange={(e) => update("platform", e.currentTarget.value || undefined)}
        className="h-10 rounded-full border border-fd-border bg-fd-background px-4 text-sm"
      >
        <option value="">All platforms</option>
        {PLATFORMS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <select
        defaultValue={params.get("category") ?? ""}
        onChange={(e) => update("category", e.currentTarget.value || undefined)}
        className="h-10 rounded-full border border-fd-border bg-fd-background px-4 text-sm"
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
