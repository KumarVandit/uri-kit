# Contributing to uri-kit

Thanks for considering a contribution. This repo is a pnpm + Turborepo monorepo.

## Requirements

- Node 18.17+
- pnpm 9+

## Setup

```bash
pnpm install
pnpm build
pnpm test
```

## Monorepo layout

| Path | What lives here |
| ---- | --------------- |
| `packages/uri-kit` | Core library + CLI, published to npm as `uri-kit`. |
| `apps/web` | Docs site, registry, homepage. |
| `ui/` | Shared UI components used by the docs site. |
| `.uri-kit/` | First‑party URI patches (`apple-core`, `ios-settings`, `macos`, `x-callback`) and generated artifacts. |
| `skills/uri-kit` | `SKILL.md` so Cursor/Claude agents auto‑discover how to use uri-kit. |

## Adding a URI

All URIs live as typed entries under `packages/uri-kit/src/data/`. Each entry declares:

- `id` — stable dotted identifier (`settings.wifi`, `music.playlist`)
- `title` — human‑readable label
- `scheme`, optional `host`, optional `path`, optional `params`
- `platforms` — one or more of `ios`, `ipados`, `macos`, `watchos`, `visionos`
- `since` / `deprecated` — platform version metadata
- `category` — for docs grouping
- `notes` — free‑form caveats

Run `pnpm --filter uri-kit check` to validate the catalog.

## Adding a patch

Patches are JSON bundles of URIs shipped under `.uri-kit/packs/`. Create a new one with:

```bash
npx uri-kit init my-patch
```

## Submitting

1. Create a branch.
2. Run `pnpm check` and `pnpm test`.
3. Open a PR.
