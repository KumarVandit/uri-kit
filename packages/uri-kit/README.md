# uri-kit

[![npm](https://img.shields.io/npm/v/uri-kit)](https://www.npmjs.com/package/uri-kit)
[![license](https://img.shields.io/github/license/KumarVandit/uri-kit)](https://github.com/KumarVandit/uri-kit/blob/main/LICENSE)

Declarative deep links for Apple platforms. Describe a URI as a plain object, open it with one call.

> Apple‑only. iOS, iPadOS, macOS, watchOS, visionOS. Typed settings URLs, system app schemes, universal links, and `x-callback-url`. Agent‑ready: ships `llms.txt`, `/api.json`, an MCP server, and a `SKILL.md`.

## Install

```bash
npm install uri-kit
```

## Quick start

```ts
import { defineURI } from "uri-kit";

const openWiFi = defineURI({
  scheme: "prefs",
  path: "root=WIFI",
  platforms: ["ios", "ipados"],
});

openWiFi();
```

Source and docs: [github.com/KumarVandit/uri-kit](https://github.com/KumarVandit/uri-kit).
