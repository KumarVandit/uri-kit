"use client";

import { useMemo, useState } from "react";
import { buildURL } from "uri-kit";
import { CATALOG, CATALOG_META } from "uri-kit/data";
import type { Category, Platform, URIDefinition } from "uri-kit";
import styles from "./library.module.css";

const PLATFORM_OPTIONS: { id: "all" | Platform; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ios", label: "iOS" },
  { id: "ipados", label: "iPadOS" },
  { id: "macos", label: "macOS" },
  { id: "watchos", label: "watchOS" },
  { id: "visionos", label: "visionOS" },
];

const CATEGORY_OPTIONS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All categories" },
  { id: "settings", label: "Settings" },
  { id: "apple-app", label: "Apple apps" },
  { id: "third-party", label: "Third-party" },
  { id: "communication", label: "Communication" },
  { id: "media", label: "Media" },
  { id: "navigation", label: "Navigation" },
  { id: "productivity", label: "Productivity" },
  { id: "developer", label: "Developer" },
  { id: "system", label: "System" },
  { id: "shortcuts", label: "Shortcuts" },
  { id: "x-callback", label: "x-callback" },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function matches(entry: URIDefinition, search: string): boolean {
  if (!search) return true;
  const q = normalize(search);
  const haystack = normalize(
    [
      entry.id ?? "",
      entry.title ?? "",
      entry.description ?? "",
      entry.notes ?? "",
      entry.scheme ?? "",
      ...(entry.tags ?? []),
    ].join(" "),
  );
  return haystack.includes(q);
}

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState<"all" | Platform>("all");
  const [category, setCategory] = useState<"all" | Category>("all");

  const entries = useMemo(() => {
    return Object.values(CATALOG).filter((entry) => {
      if (entry.deprecated) return false;
      if (platform !== "all" && entry.platforms && !entry.platforms.includes(platform)) return false;
      if (category !== "all" && entry.category !== category) return false;
      if (!matches(entry, search)) return false;
      return true;
    });
  }, [search, platform, category]);

  return (
    <article className={styles.article}>
      <div className={styles.badgeRow}>
        <span className={styles.badge}>v{CATALOG_META.version}</span>
        <span className={styles.badge}>{CATALOG_META.counts.total} URIs</span>
        <span className={styles.badge}>Apple only</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Library</h1>
      </div>

      <p className={styles.description}>
        The complete catalog bundled with uri-kit. Every entry is a typed
        {" "}
        <code>URIDefinition</code> you can import, open, or embed in a patch.
      </p>

      <div className={styles.controls}>
        <div className={styles.searchRow}>
          <input
            type="search"
            className={styles.search}
            placeholder="Search by id, title, scheme, or tag"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className={styles.count}>
            {entries.length} / {CATALOG_META.counts.total}
          </span>
        </div>

        <div className={styles.filters}>
          {PLATFORM_OPTIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`${styles.filterChip} ${platform === p.id ? styles.active : ""}`}
              onClick={() => setPlatform(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className={styles.filters}>
          {CATEGORY_OPTIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`${styles.filterChip} ${category === c.id ? styles.active : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className={styles.empty}>
          No URIs match these filters. Try widening your search.
        </div>
      ) : (
        <div className={styles.grid}>
          {entries.map((entry) => {
            let url = "";
            try {
              url = buildURL(entry);
            } catch {
              url = "";
            }
            return (
              <a
                key={entry.id}
                href={url || undefined}
                className={styles.entry}
                onClick={(e) => {
                  if (!url) e.preventDefault();
                }}
              >
                <div className={styles.entryHeader}>
                  <span className={styles.entryTitle}>{entry.title ?? entry.id}</span>
                  <span className={styles.entryId}>{entry.id}</span>
                  <span className={styles.entryMeta}>
                    {entry.platforms?.map((p) => (
                      <span key={p} className={styles.platformPill}>
                        {p}
                      </span>
                    ))}
                  </span>
                </div>
                {url && <span className={styles.entryUrl}>{url}</span>}
              </a>
            );
          })}
        </div>
      )}
    </article>
  );
}
