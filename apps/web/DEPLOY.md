# Deploying the docs site

`apps/web` is a Next.js 15 app built with Fumadocs. It reads from the `uri-kit` workspace package and publishes a docs site with `llms.txt`, `api.json`, and per-URI pages.

This guide documents how to deploy a fork or your own instance. Everything below is generic — no hardcoded accounts, domains, or owners.

## Prerequisites

- Node.js 18.17 or newer
- pnpm 9
- A Vercel, Netlify, or Cloudflare Pages account (examples below use Vercel)

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No (defaults to `http://localhost:3000`) | Canonical URL used for `metadataBase`, OG tags, sitemap, and `llms.txt`. Set this to the deployed URL. |

No secrets are required. The site is fully static/SSG except for the `/catalog` search page, which is server-rendered per request.

## Deploy to Vercel

1. [vercel.com/new](https://vercel.com/new) → import the repo.
2. **Set Root Directory to `apps/web`** — this is the one setting you must change. Vercel's Next.js auto-detection resolves `.next` relative to this path, so it has to point at the app, not the monorepo root. [`apps/web/vercel.json`](./vercel.json) takes care of invoking Turbo from the workspace root via `cd ../..` so all workspace packages build in the right order.
3. Framework preset auto-detects as Next.js. Do not override the build, install, or ignore commands — they're pinned in [`apps/web/vercel.json`](./vercel.json).
4. Add `NEXT_PUBLIC_SITE_URL` to the project's environment variables, set to the production URL.
5. Deploy.

Preview deployments for pull requests work out of the box.

## Deploy elsewhere

The app is a standard Next.js 15 output; any platform that runs Next apps can host it. For other platforms, configure the build equivalent of:

```
root:    apps/web
install: pnpm install --frozen-lockfile
build:   turbo build
output:  .next   (relative to apps/web)
```

`turbo build` auto-detects the workspace root and auto-resolves dependencies, so the `uri-kit` package gets built before the docs app without an explicit filter. This mirrors Vercel's recommended pattern for Next.js in a Turborepo.

Netlify and Cloudflare Pages both support monorepos with these settings; see their docs for the exact field names.

## Local production build

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example pnpm --filter uri-kit-web build
NEXT_PUBLIC_SITE_URL=https://your-domain.example pnpm --filter uri-kit-web start
```

## Custom domain

Add the domain in your hosting provider's dashboard, then update `NEXT_PUBLIC_SITE_URL` and redeploy. No code changes required.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `Cannot find module '@/.source'` | `fumadocs-mdx` didn't generate types. The `postinstall` hook in `apps/web/package.json` handles this automatically — ensure `installCommand` hasn't been overridden in your host's dashboard. |
| `pnpm: command not found` | Vercel auto-detects pnpm from `packageManager` in the root `package.json`. Other platforms may need pnpm enabled explicitly. |
| `llms.txt` or `api.json` return 404 | Confirm the Next.js app built successfully. These are route handlers in `apps/web/app/`, not static files — they require a successful build to be served. |
| OG metadata points at `localhost` | `NEXT_PUBLIC_SITE_URL` is unset in the deployment environment. |
