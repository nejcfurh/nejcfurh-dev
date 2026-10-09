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

## Getting Started

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The site runs at http://localhost:3000. Every variable in `.env.example` is optional; the sections below say what each one turns on.

## Analytics

PostHog is wired up in `app/analytics`, configured from `app/config/app.config.ts` and mounted in the root layout. Page views are sent by `PageVisitTracker` rather than by PostHog's automatic capture, so each event carries its own page name.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key. Analytics stay off while this is unset. |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog ingest host: `https://eu.i.posthog.com`. The project is on EU cloud, so the key is rejected by the US host. |
| `NEXT_PUBLIC_ENV` | `development`, `staging`, `preview` or `production`. PostHog is only initialised, and events only sent, outside `development`. |
| `NEXT_PUBLIC_VERSION` | Reported as the `Version` super property. Falls back to the short Vercel commit SHA, then `dev`. |

## Contact Form

The contact form sends through EmailJS from the browser. While any of these is unset, submitting shows a "not configured" toast instead of sending.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID. The older `NEXT_PUBLIC_MAILJS_SERVICE_ID` name is still read as a fallback. |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID. |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key. |

## Deployment

Live site: **[https://nejcfurh.dev](https://nejcfurh.dev)**
