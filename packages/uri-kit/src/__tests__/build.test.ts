import { describe, expect, it } from "vitest";
import { buildURL, buildXCallback, URIBuildError } from "../build.js";

describe("buildURL", () => {
  it("builds a plain scheme URL", () => {
    expect(buildURL({ scheme: "prefs" })).toBe("prefs://");
  });

  it("builds iOS settings paths", () => {
    expect(buildURL({ scheme: "prefs", path: "root=WIFI" })).toBe("prefs:root=WIFI");
  });

  it("builds scheme+host+path", () => {
    expect(buildURL({ scheme: "music", host: "music.apple.com", path: "playlist/pl.123" })).toBe(
      "music://music.apple.com/playlist/pl.123",
    );
  });

  it("encodes params", () => {
    expect(
      buildURL({
        scheme: "sms",
        to: "+15551234567",
        params: { body: "hi there" },
      }),
    ).toBe("sms:+15551234567?body=hi%20there");
  });

  it("omits undefined params", () => {
    expect(
      buildURL({
        scheme: "maps",
        params: { q: "cafe", ll: undefined },
      }),
    ).toBe("maps://?q=cafe");
  });

  it("supports a raw url escape hatch", () => {
    expect(buildURL({ url: "https://example.com/foo" })).toBe("https://example.com/foo");
  });

  it("appends fragments", () => {
    expect(
      buildURL({
        scheme: "x-apple.systempreferences",
        path: "com.apple.preference.security",
        fragment: "Privacy_Camera",
      }),
    ).toBe("x-apple.systempreferences:com.apple.preference.security#Privacy_Camera");
  });

  it("throws without scheme or url", () => {
    expect(() => buildURL({})).toThrow(URIBuildError);
  });
});

describe("buildXCallback", () => {
  it("composes an x-callback-url", () => {
    const url = buildXCallback({
      scheme: "bear",
      action: "create",
      actionParams: { title: "Note", text: "hello" },
      xSuccess: "myapp://done",
    });
    expect(url).toBe(
      "bear://x-callback-url/create?title=Note&text=hello&x-success=myapp%3A%2F%2Fdone",
    );
  });
});
