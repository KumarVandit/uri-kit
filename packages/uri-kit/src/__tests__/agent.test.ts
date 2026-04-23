import { describe, expect, it } from "vitest";
import { build, catalog, toCurl, toJSON, toLLMSEntry, toShortcut, toSwift, toTypeScript } from "../agent/index.js";

describe("agent surface", () => {
  const entry = catalog["settings.wifi"];

  it("exposes the full catalog", () => {
    expect(Object.keys(catalog).length).toBeGreaterThan(20);
  });

  it("build() returns a URL", () => {
    expect(build(entry!).startsWith("prefs:")).toBe(true);
  });

  it("renders Swift", () => {
    const swift = toSwift(entry!);
    expect(swift).toContain("UIApplication.shared.open");
    expect(swift).toContain("prefs:");
  });

  it("renders TypeScript", () => {
    const ts = toTypeScript(entry!);
    expect(ts).toContain("defineURI(");
    expect(ts).toContain("\"scheme\"");
  });

  it("renders a Shortcut URL string", () => {
    expect(toShortcut(entry!)).toContain("prefs:");
  });

  it("renders a macOS open command", () => {
    expect(toCurl(entry!)).toMatch(/^open "/);
  });

  it("emits an llms.txt line", () => {
    const line = toLLMSEntry(entry!);
    expect(line.startsWith("- [settings.wifi]")).toBe(true);
  });

  it("toJSON filters by platform", () => {
    const j = toJSON({ platform: "macos" });
    expect(j.entries.every((e) => !e.platforms || e.platforms.includes("macos"))).toBe(true);
  });
});
