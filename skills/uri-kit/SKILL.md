---
name: uri-kit
summary: Compose and open Apple platform deep links — iOS settings URLs, system app schemes, universal links, and x-callback-url — from a typed catalog.
triggers:
  - deep link
  - deeplink
  - url scheme
  - ios settings url
  - macos system preferences
  - prefs:root=
  - App-prefs
  - x-apple.systempreferences
  - x-callback-url
  - facetime://
  - sms://
  - tel://
  - open maps
  - open settings
  - open app store
  - shortcuts://
  - apple platform url
---

# uri-kit skill

Use `uri-kit` whenever you need to open a native surface on an Apple platform
— Settings, Apple Music, Maps, Messages, FaceTime, App Store, Shortcuts,
third‑party apps via `x-callback-url`, or macOS System Settings panes.

## When to use

Trigger this skill if the user says:

- "open Wi‑Fi settings", "deep link to privacy → camera", "launch Apple Music playlist"
- "build a tel/sms/mailto url with body and subject"
- "open the App Store page for app id ..."
- "macOS system settings URL for camera permissions"
- "x-callback-url for Bear / Things / Drafts / OmniFocus"
- "jump to Shortcuts and run 'X'"

Do NOT use for: Android intents, generic `https://` URLs unrelated to Apple
ecosystem, or plain `fetch`/`curl` requests.

## How to use

### 1. Look up an entry in the catalog

```ts
import { catalog, search, build } from "uri-kit/agent";

const hit = search({ query: "wifi", platform: "ios" })[0];
const url = build(hit); // → "prefs:root=WIFI"
```

Every entry has stable `id` (dotted), `title`, `scheme`, optional `host` /
`path` / `params` / `fragment`, `platforms`, and `since` / `deprecated`
metadata.

### 2. Compose a new URI declaratively

```ts
import { defineURI } from "uri-kit";

const sms = defineURI({
  scheme: "sms",
  to: "+15551234567",
  params: { body: "Hello from uri-kit" },
});

sms(); // opens Messages on iOS / macOS
```

### 3. Fall back when the app is missing

```ts
const uber = defineURI({
  scheme: "uber",
  params: { action: "setPickup", "pickup[latitude]": 37.775, "pickup[longitude]": -122.418 },
  fallback: { appStoreId: "368677368" },
});

await uber();
```

### 4. Validate before shipping

```bash
npx uri-kit check          # validates the bundled catalog
npx uri-kit search wifi    # quick catalog search from the terminal
npx uri-kit build '{"scheme":"sms","to":"+15551234567"}'
```

### 5. Run the MCP server for live lookups

```bash
npx uri-kit mcp
```

Exposes four tools over stdio JSON‑RPC:

| Tool | Purpose |
| ---- | ------- |
| `search_uri` | Free‑text + platform/category filter |
| `get_uri` | Fetch one entry by stable id |
| `build_uri` | Compose a URL from a URIDefinition |
| `validate_uri` | Sanity‑check a URIDefinition |

## Platform rules (important)

- **iOS Settings** uses `prefs:root=...` (Shortcuts context) or
  `App-prefs:root=...` (from a third‑party app). `uri-kit` defaults to
  `prefs:` — swap at build time if you're calling from a native app.
- **macOS System Settings** uses `x-apple.systempreferences:<bundle-id>`
  with anchors as the URL fragment (e.g.
  `x-apple.systempreferences:com.apple.preference.security#Privacy_Camera`).
- **Apple Music** mirrors `music.apple.com` URLs by swapping `https://` with
  `music://`. Preserve the rest of the path as‑is.
- **x-callback-url** adds `x-success` / `x-cancel` / `x-error` params. Use
  `buildXCallback({ scheme, action, actionParams, xSuccess, ... })`.

## Common patterns

```ts
// Open a specific iOS settings pane
defineURI({ scheme: "prefs", path: "root=Privacy&path=CAMERA" })();

// Open an App Store page
defineURI({ scheme: "itms-apps", host: "itunes.apple.com", path: "app/id544007664" })();

// Run a Shortcut by name
defineURI({
  scheme: "shortcuts",
  host: "x-callback-url",
  path: "run-shortcut",
  params: { name: "My Shortcut", input: "Clipboard" },
})();

// Compose an email
defineURI({
  scheme: "mailto",
  to: "hello@example.com",
  params: { subject: "Hi", body: "Body text." },
})();
```

## Machine‑readable endpoints

If the repo's docs site is deployed:

- `GET /llms.txt` — short agent preamble
- `GET /llms-full.txt` — full catalog as one markdown blob
- `GET /api.json` — typed JSON catalog

If you only have the local CLI:

- `npx uri-kit llms ./out` emits all three files locally.

## Catalog scope

Apple only. Covers:

- Apple system apps (Music, Maps, Mail, Messages, FaceTime, Photos, Wallet, Notes, Reminders, Shortcuts, Weather, App Store, iTunes Store, Books, Podcasts, GarageBand, iMovie, Clips, Voice Memos, Watch, Diagnostics, Files, Find My, Game Center, Dictionary).
- iOS / iPadOS Settings panes (Wi‑Fi, Bluetooth, Cellular, Personal Hotspot, VPN, Notifications, Focus, Screen Time, Display, Accessibility + sub‑panes, Privacy + sub‑panes, Apple ID, iCloud, Passwords, Safari + sub‑panes, Camera, Mail, Action Button, more).
- macOS System Settings anchors (Network, Wi‑Fi, Bluetooth, Displays, Privacy & Security + sub‑panes, Keyboard, Trackpad, Sound, Sharing, Users, Software Update).
- x-callback-url entries for Bear, Things, Drafts, Ulysses, OmniFocus, Shortcuts.

Unsupported: Android, Windows, Linux, generic web URLs.
