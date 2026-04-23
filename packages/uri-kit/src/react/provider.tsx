import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Platform } from "../types.js";

interface URIKitContextValue {
  /** Override detected platform. */
  platform?: Platform;
  /** Base URL prefix for patch JSON files. */
  patchBase?: string;
  /** Analytics hook fired whenever any URI is invoked. */
  onInvoke?: (url: string) => void;
}

const URIKitContext = createContext<URIKitContextValue>({});

export interface URIKitProviderProps extends URIKitContextValue {
  children: ReactNode;
}

export function URIKitProvider({
  children,
  platform,
  patchBase,
  onInvoke,
}: URIKitProviderProps) {
  const value = useMemo<URIKitContextValue>(
    () => ({ platform, patchBase, onInvoke }),
    [platform, patchBase, onInvoke],
  );
  return <URIKitContext.Provider value={value}>{children}</URIKitContext.Provider>;
}

export function useURIKit(): URIKitContextValue {
  return useContext(URIKitContext);
}
