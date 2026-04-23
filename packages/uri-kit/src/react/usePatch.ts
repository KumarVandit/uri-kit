import { useEffect, useMemo, useState } from "react";
import { loadPatch, type ResolvedPatch } from "../patch.js";
import type { Patch } from "../types.js";
import { useURIKit } from "./provider.js";

export interface UsePatchResult {
  ready: boolean;
  patch?: ResolvedPatch;
  error?: Error;
  open: (id: string) => Promise<void>;
  ids: () => string[];
}

/**
 * Load a patch and return a ready‑to‑use invoker.
 *
 * @example
 * ```tsx
 * const patch = usePatch("/patches/apple-core.json");
 * <button onClick={() => patch.open("settings.wifi")} disabled={!patch.ready}>
 *   Open Wi‑Fi
 * </button>
 * ```
 */
export function usePatch(source: string | Patch): UsePatchResult {
  const ctx = useURIKit();
  const [patch, setPatch] = useState<ResolvedPatch | undefined>();
  const [error, setError] = useState<Error | undefined>();

  const resolved = useMemo(() => {
    if (typeof source === "string" && ctx.patchBase) {
      return source.startsWith("http") || source.startsWith("/")
        ? source
        : `${ctx.patchBase.replace(/\/$/, "")}/${source}`;
    }
    return source;
  }, [source, ctx.patchBase]);

  useEffect(() => {
    let cancelled = false;
    loadPatch(resolved)
      .then((p) => {
        if (!cancelled) setPatch(p);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e : new Error(String(e)));
      });
    return () => {
      cancelled = true;
    };
  }, [resolved]);

  return {
    ready: Boolean(patch),
    patch,
    error,
    open: async (id: string) => {
      if (!patch) throw new Error("uri-kit: patch not yet loaded");
      await patch.open(id);
    },
    ids: () => (patch ? patch.ids() : []),
  };
}
