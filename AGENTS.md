# AGENTS.md

## Repository layout

There is no root `package.json` or workspace tooling; this repo contains two independently installed packages:

- `simple-crud-client/` — Next.js 16.4 App Router UI (React 19, Tailwind v4, shadcn `base-nova`).
- `simple-crud-server/` — Express 5 + MongoDB Node driver API.

Run every `npm` command from inside the relevant package; `npm run dev` at the repo root fails. Install dependencies separately in each package.

## Commands

Client (`cd simple-crud-client`):

- `npm run dev` — dev server on http://localhost:3000.
- `npm run lint` then `npm run typecheck` (`tsc --noEmit`) then `npm run build` — the verification order. There is no test suite; don't invent `npm test`.
- `npm run format` rewrites every `.ts`/`.tsx`; for a focused change use `npx prettier --write <path>`.

Server (`cd simple-crud-server`):

- `npm run dev` (`node --watch`) or `npm start` (`node index.js`). There is no test suite.
- Requires a gitignored `.env` with `DB_USER` and `DB_PASS` (see `.env.example`); connects to Atlas `simpleCrudDB.users` and listens on `PORT` or 5000. Missing or invalid credentials exit the process at startup.
- Node 22+ is required (enforced by both packages' `engines`).

## Non-obvious behavior

- All API calls use `API_BASE_URL` from `simple-crud-client/lib/api.ts`, which reads `NEXT_PUBLIC_API_URL` and falls back to `http://localhost:5000`. There are no route handlers or server actions. Client env files are optional; `.env.example` is tracked, real `.env*` files are not.
- Keep `/users` and `/users/[userId]` dynamic (`export const dynamic = "force-dynamic"` plus `cache: "no-store"`). Without those, `next build` bakes the current DB rows into static HTML.
- Mutations are browser-side fetches followed by `router.refresh()`; creation redirects to `/users`. Keep that pattern rather than adding `revalidatePath` unless converting to server actions.
- shadcn is configured with `@base-ui/react`, not Radix. Compose triggers with the `render` prop (`<DialogTrigger render={<Button />} />`); `asChild` does not exist. Add primitives with `npx shadcn@latest add <name>`.
- `cn` comes from the `cn` package (`lib/utils.ts` only re-exports it). For a `<Link>` styled as a button, use `cn(buttonVariants(...))`; the raw cva string has conflicting border classes.
- Tailwind v4 has no `tailwind.config.*`; theme tokens and base styles live in `app/globals.css`.
- The server validates `name`/`email` (400), invalid ObjectIds (400), and missing users (404) as JSON errors. PATCH deliberately does not upsert; do not reintroduce `upsert: true`.
- Next.js 16 differs from most training data. Read the relevant guide in `simple-crud-client/node_modules/next/dist/docs/` before using an unfamiliar API; `params`/`searchParams` are Promises.

## Existing instructions

`simple-crud-client/AGENTS.md` holds deeper client conventions, including the `next dev`-managed Next.js rules block that must be kept and committed. `simple-crud-client/CLAUDE.md` just includes that file.
