# SocialYork

Marketing site (Phase 1). Next.js App Router + TypeScript + Tailwind CSS v4, hosted on AWS Amplify.

Its one job: survive a skeptical owner-operator's credibility check in the ninety seconds after Isti leaves their shop. Fast first paint, specific proof, no agency filler.

## Develop

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
npm run dev         # http://localhost:3000
npm run build       # production build
npm run typecheck
npm run lint
```

## Where things live

```
app/
  layout.tsx            root: fonts, metadata, favicon (app/icon.svg), OG image
  (marketing)/          Phase 1 public site — the only group with content
    page.tsx            one long scrolling page, sections composed here
    layout.tsx          fixed wordmark + footer
  (portal)/             Phase 2 stub — not linked, not built
  robots.ts, sitemap.ts
components/
  hero/                 hero sequence (state machine in useHeroSequence.ts,
                        kept separate from layout so a mobile version drops in later)
  sections/             one component per section
  Demo.tsx              renders [DEMO: token] strings as visible placeholders
content/
  site.ts              ALL copy and numbers. Nothing lives in JSX.
lib/
  data.ts              data-access seam for the portal — empty for now
public/video/          hero-01..03 as .mp4 + .webm + .jpg poster (placeholders)
```

## Replacing placeholder content

Everything unverified is a `[DEMO: token]` string in `content/site.ts`, rendered
with a dashed outline so it can't ship unnoticed. The full checklist is section 0
of the build brief. Editing `content/site.ts` is the whole job — no component
changes.

**Hero footage** is placeholder NYC stock. To swap: drop three source clips at
`scripts/src/hero-01..03.*` and run `scripts/transcode-hero.sh` (needs `ffmpeg`).
The site must not claim the footage is SocialYork's own work.

**Client logos**: drop files in `public/logos/`, then set each `logo` path in
`content/site.ts` (`clients.items`). The name-only placeholder disappears.

**Long Island address**: set `site.address` in `content/site.ts` — the footer
picks it up. Off by default (per the brief).

## Deploy (AWS Amplify Hosting)

Connect the repo in the Amplify console; it auto-detects Next.js SSR and uses
`amplify.yml`. Set the app platform to **Next.js - SSR (WEB_COMPUTE)** and the
build image Node version to 22.

## Not in this phase

Auth, Stripe, any database, a CMS, analytics, case-study pages, the audio hero,
and the mobile hero sequence. Seams are left (route group, `lib/`, an analytics
mount point in the root layout) so none of the Phase 1 code has to be rewritten.
