# uri-kit

[![npm](https://img.shields.io/npm/v/uri-kit)](https://www.npmjs.com/package/uri-kit)
[![license](https://img.shields.io/github/license/KumarVandit/uri-kit)](LICENSE)
[![CI](https://github.com/KumarVandit/uri-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/KumarVandit/uri-kit/actions/workflows/ci.yml)

Declarative deep links for Apple platforms. Describe a URI as a plain object, open it with one call.

> Apple‑only. iOS, iPadOS, macOS, watchOS, visionOS. Typed settings URLs, system app schemes, universal links, and `x-callback-url`. Agent‑ready: ships `llms.txt`, `/api.json`, an MCP server, and a `SKILL.md`.

## Install

```bash
npm install uri-kit
```

## Quick start

```ts
import { defineURI, open } from "uri-kit";

const openWiFi = defineURI({
  scheme: "prefs",
  path: "WIFI",
  platforms: ["ios"],
});

openWiFi();

const text = defineURI({
  scheme: "sms",
  params: { body: "Hello from uri-kit" },
  to: "+15551234567",
  fallback: { appStoreId: "1146772568" },
});

await open(text);
```

### React

```tsx
import { usePatch } from "uri-kit/react";

function App() {
  const patch = usePatch("/patches/apple-core.json");

  return (
    <button onClick={() => patch.open("settings.wifi")} disabled={!patch.ready}>
      Open Wi‑Fi settings
    </button>
  );
}
```

## CLI

Browse and install community URI patches directly from GitHub:

```bash
# Browse the registry
npx uri-kit add

# Install from a GitHub repo
npx uri-kit add user/repo

# Create a new patch
npx uri-kit init

# List installed patches
npx uri-kit list

# Validate URIs against the current Apple platform schema
npx uri-kit check

# Start the bundled MCP server for AI agents
npx uri-kit mcp
```

## Agent‑ready

Every URI in the catalog is exposed to AI agents in multiple formats:

- **`llms.txt`** and **`llms-full.txt`** — typed catalog flattened for LLM context
- **`/api.json`** — machine‑readable catalog at a stable URL
- **MCP server** — `npx uri-kit mcp` exposes `search_uri`, `build_uri`, `validate_uri`, `open_uri` tools
- **`uri-kit/agent`** — tiny ESM export for LLM‑time catalog lookup
- **`SKILL.md`** — ship‑with‑your‑app skill file for Cursor/Claude auto‑discovery
- **Copy‑as‑code** — every docs entry has one‑click copy for TypeScript, Swift, Shortcuts, and `curl`

See [`docs/agents.md`](docs/agents.md) for the full agent surface.

## Monorepo structure

```
packages/uri-kit       Core library + CLI (published to npm)
apps/web               Documentation, registry, and homepage
ui/                    Shared UI components
.uri-kit/              First‑party URI patches & generated code
skills/                Cursor/Claude skill files
```

## Documentation

Docs live in this repo under [`apps/web`](apps/web). A public site is not yet hosted.

## References

- iOS Settings URLs catalog by [FifiTheBulldog/ios-settings-urls](https://github.com/FifiTheBulldog/ios-settings-urls)
- App URL schemes catalog by [bhagyas/app-urls](https://github.com/bhagyas/app-urls)
- Monorepo shape + CLI pattern inspired by [@web-kits/audio](https://github.com/raphaelsalaja/audio) and [skills.sh](https://skills.sh)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions and guidelines.

## License

[MIT](LICENSE)
