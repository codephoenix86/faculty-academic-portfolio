# Faculty Academic Portfolio

A full‑stack academic site for **Prof. Jitendra Kumar Samriya** at **IIIT Sonipat**, Haryana—bringing together profile, research, teaching, and contact in one place. Content is managed in a headless CMS so updates do not require code changes. The live site is deployed on **Vercel** at [profjksamriya.in](https://profjksamriya.in).

---

## What this project does

- **Public-facing pages** for biography, publications, books, conferences, PhD students, course assignments, study resources, and announcements.
- **Contact form** that sends email through the [Resend](https://resend.com) API.
- **Visitor count** stored in the CMS and updated once per browser session (so refreshes do not inflate the number).
- **Fresh content** from the CMS on each request (good for pages that change often).

---

## Why this stack

| Piece | Role |
|--------|------|
| **Next.js (App Router)** | Server-rendered pages, API routes, and routing in one project. |
| **Sanity** | Editors update text, files, and images in a dashboard; the site reads that data over the API. |
| **Tailwind CSS** | Consistent layout and styling without a separate CSS bundle to maintain by hand. |
| **Framer Motion** | Light motion for a more polished feel. |
| **Resend** | Reliable delivery for contact-form messages. |
| **Zustand** | Small client-side store for visitor count UI updates. |

Together, this gives a **maintainable** site for a non-developer (CMS) with **room to grow** (API routes, hosting on Vercel).

---

## Project layout (short)

- `app/` — Pages and layouts (home, about, publications, books, conferences, PhD students, assignments, resources, announcements, contact).
- `app/api/` — `contact` (email) and `increment-visitor` (visitor count).
- `components/` — Shared UI (navigation, footer, profile blocks, visitor tracking).
- `utils/sanity.js` — Sanity client, queries, and image URLs.

---

## Prerequisites

- **Node.js** (LTS recommended)
- **npm** (comes with Node)

---

## Local setup

1. **Clone the repository** and open the project folder.

2. **Environment variables** — Copy the sample file and fill in real values:

   ```bash
   cp .env.sample .env
   ```

   | Variable | Purpose |
   |----------|---------|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (public, used in the browser). |
   | `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (e.g. `production`). |
   | `SANITY_API_TOKEN` | Server-only token; needed for **writing** (visitor count updates). Keep it secret. |
   | `RESEND_API_KEY` | API key from Resend for sending contact emails. |

   The contact form sends mail to the **primary email stored in the faculty profile** in Sanity (not a separate env variable). `.env.sample` may list extra keys for your own experiments.

3. **Install dependencies** and **run the dev server**:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | What it runs |
|---------|----------------|
| `npm run dev` | Development server (uses webpack as configured in this repo). |
| `npm run build` | Production build. |
| `npm start` | Serves the production build locally. |

---

## Deployment

The production site is hosted on **Vercel**. Add the same environment variables in the Vercel project settings. For **Resend**, use a **verified sending domain** that matches your “from” address in the contact API route.

---

## Strengths at a glance

- **CMS-first**: Faculty can update content without touching the codebase.
- **Real features**: Email-backed contact form and persistent visitor counting with session-aware logic.
- **Structured content model**: Separate types for publications, books, conferences, students, assignments, resources, and announcements.
- **Modern frontend**: React 19, Next.js App Router, responsive styling with Tailwind.
- **Operational**: Error handling paths that consider CMS failures; images allowed from Sanity’s CDN via Next.js config.

---

## Context & credits

**Faculty & institution.** This repository powers the public portfolio of **Prof. Jitendra Kumar Samriya** at the **Indian Institute of Information Technology (IIIT) Sonipat**, Haryana.

**Developer.** Implemented by **Naresh Lohar** (CSE, IIIT Sonipat) as the project for this faculty site.

**License & reuse.** If you fork or reuse this work, follow the terms of Sanity, Resend, Vercel, and other services you use, and never commit real API keys or tokens.
