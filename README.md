# Portfolio

Personal portfolio and professional showcase site — [nejcfurh.dev](https://nejcfurh.dev).

## Overview

A single-page portfolio built with Next.js, featuring a modern layout with smooth scroll, parallax-style sections, and responsive design. Sections include Hero, About, Experience, Projects, and Contact (with EmailJS integration).

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animation:** Motion (Framer Motion), react-parallax-tilt, maath
- **Icons:** Lucide React, React Icons
- **Contact:** EmailJS (browser), react-hot-toast
- **Analytics:** PostHog (posthog-js)
- **Runtime:** React 19

## Analytics

PostHog is wired up in `app/analytics`, configured from `app/config/app.config.ts` and mounted in the root layout. Page views are sent by `PageVisitTracker` rather than by PostHog's automatic capture, so each event carries its own page name.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key. Analytics stay off while this is unset. |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog ingest host. |
| `NEXT_PUBLIC_ENV` | `development`, `staging`, `preview` or `production`. Events are only sent outside `development`. |
| `NEXT_PUBLIC_VERSION` | Reported as the `Version` super property. Defaults to `dev`. |

## Deployment

Live site: **[https://nejcfurh.dev](https://nejcfurh.dev)**
