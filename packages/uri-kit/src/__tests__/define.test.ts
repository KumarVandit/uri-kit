import { describe, expect, it } from "vitest";
import { defineURI } from "../define.js";

describe("defineURI", () => {
  it("exposes resolved url and definition", () => {
    const open = defineURI({ scheme: "prefs", path: "root=WIFI" });
    expect(open.url).toBe("prefs:root=WIFI");
    expect(open.definition.scheme).toBe("prefs");
  });

  it("is callable", async () => {
    const open = defineURI({ scheme: "prefs" });
    await expect(open()).resolves.toBeUndefined();
  });
});
