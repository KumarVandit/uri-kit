import { describe, expect, it } from "vitest";
import { buildURL } from "../build.js";
import { CATALOG, getById, queryCatalog } from "../data/index.js";

describe("catalog", () => {
  it("has a non‑empty catalog", () => {
    expect(Object.keys(CATALOG).length).toBeGreaterThan(20);
  });

  it("every entry builds a valid URL string", () => {
    for (const [id, entry] of Object.entries(CATALOG)) {
      const url = buildURL(entry);
      expect(url.length, `entry ${id} produced empty URL`).toBeGreaterThan(0);
      expect(url.includes(":"), `entry ${id} missing scheme separator: ${url}`).toBe(true);
    }
  });

  it("has stable ids matching keys", () => {
    for (const [id, entry] of Object.entries(CATALOG)) {
      if (entry.id) expect(entry.id).toBe(id);
    }
  });

  it("search by free text", () => {
    expect(queryCatalog({ search: "wi-fi" }).length).toBeGreaterThan(0);
    expect(queryCatalog({ search: "bluetooth" }).length).toBeGreaterThan(0);
  });

  it("filters by platform", () => {
    const ios = queryCatalog({ platform: "ios" });
    const mac = queryCatalog({ platform: "macos" });
    expect(ios.length).toBeGreaterThan(0);
    expect(mac.length).toBeGreaterThan(0);
    expect(ios.every((e) => !e.platforms || e.platforms.includes("ios"))).toBe(true);
  });

  it("filters by category", () => {
    const settings = queryCatalog({ category: "settings" });
    expect(settings.every((e) => e.category === "settings")).toBe(true);
  });

  it("getById returns entries", () => {
    expect(getById("settings.wifi")).toBeDefined();
    expect(getById("does.not.exist")).toBeUndefined();
  });
});
