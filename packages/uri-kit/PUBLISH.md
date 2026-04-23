# Publishing uri-kit

Step-by-step guide to publish `uri-kit` to npm. Covers first-time setup and subsequent releases.

Audience: project maintainers. Library consumers do not need this file.

## One-time setup

### 1. npm account

If you don't have one: [npmjs.com/signup](https://www.npmjs.com/signup). Enable 2FA in [account settings](https://www.npmjs.com/settings/~/profile) — npm requires it for publishing.

### 2. Login on your machine

```bash
npm login
```

Opens a browser, auths, writes credentials to `~/.npmrc`. Verify with:

```bash
npm whoami
```

### 3. Confirm the package name is free

```bash
npm view uri-kit
```

`404` means free. Anything else means taken — pick a different name or go scoped (`@handle/uri-kit`).

## Publishing

Runs from the package directory, not the repo root.

```bash
cd packages/uri-kit
```

### Dry-run (always do this first)

```bash
npm pack --dry-run
```

Check the output:
- `LICENSE` present
- `README.md` present
- `dist/` contents present (6 entry points)
- No source files, no `.map` noise in the wrong place, no `node_modules`

### Publish

```bash
npm publish
```

The `prepublishOnly` script in `package.json` runs first: `clean → build → test`. If any step fails, publish aborts.

On success, the package is live at `https://www.npmjs.com/package/uri-kit` within ~60 seconds.

### Verify

```bash
npm view uri-kit version
# 0.1.0

npx -y uri-kit --version
# 0.1.0

npx -y uri-kit search wifi
# settings.wifi  prefs:root=WIFI
```

The MCP server is now available globally for every Cursor / Claude Desktop user who adds `uri-kit` to their MCP config.

## Subsequent releases

1. Bump the version in `packages/uri-kit/package.json` following [semver](https://semver.org):
   - `0.1.x` → patch (bugfix)
   - `0.x.0` → minor (new URIs, new tools, additive API)
   - `x.0.0` → major (breaking change to `defineURI` shape, removed URIs, renamed CLI commands)
2. Update `apps/web/content/docs/changelog.mdx` with the new version + grouped bullets.
3. Commit: `chore(uri-kit): release vX.Y.Z`.
4. Tag: `git tag vX.Y.Z && git push --tags`.
5. From `packages/uri-kit/`: `npm publish`.
6. Create a GitHub release from the tag (optional but nice): `gh release create vX.Y.Z --generate-notes`.

## Publishing from CI (optional, recommended later)

For supply-chain provenance + no more local `npm login`, add a GitHub Actions workflow that publishes on tag push. Requires:

- `NPM_TOKEN` secret in the repo
- `id-token: write` permission in the workflow
- Re-enable `"provenance": true` in `publishConfig`

Defer this until after the first manual publish — easier to debug problems locally.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `npm ERR! 403 Forbidden` | Not logged in, or package name is taken. Run `npm whoami`; try `npm view <name>`. |
| `npm ERR! You must be logged in` | `npm login` again. Token may have expired. |
| `prepublishOnly` fails at test | Fix the test before publishing. Do not bypass with `--ignore-scripts`. |
| `tarball missing LICENSE` | `packages/uri-kit/LICENSE` doesn't exist. `cp LICENSE packages/uri-kit/LICENSE` from repo root. |
| `npx uri-kit` gives `command not found` after publish | npm cache. Retry with `npx -y uri-kit` or `npx --prefer-online uri-kit`. |
