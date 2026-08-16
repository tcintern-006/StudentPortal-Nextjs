# Student Course Portal — Frontend

A Next.js (App Router) application for browsing courses and students, backed by a custom Express + PostgreSQL API. Started as a static-data portfolio piece; evolved into a full-stack app with authentication-aware UI, live data mutations, and role-based access control.

**Live site:** ([https://student-portal-nextjs-swart.vercel.app](https://student-portal-nextjs-swart.vercel.app/))
*

---

## Why these choices

| Choice | Reasoning |
|---|---|
| **Next.js App Router** | Lets data-fetching strategy vary by component: pages that don't need interactivity (like a course detail page) fetch directly on the server with zero client-side JS for that part; pages that need forms/search/live state use Client Components. This project deliberately uses both, rather than defaulting everything to `"use client"`. |
| **Tailwind CSS v4, no component library** | Full control over the design system (custom accent color, dark background, `@theme` tokens) without fighting a pre-styled library's defaults. |
| **Plain `fetch`, no data-fetching library** | At this scale, `useState`/`useEffect` + a small `lib/api.js` helper is simpler to reason about than introducing React Query/SWR for a handful of endpoints. |
| **`localStorage` for the JWT** | Simplest way to persist a token across page reloads for a project this size. (See the backend README's "Known Limitations" — an `httpOnly` cookie is the more XSS-resistant choice for production.) |

---

## Features

- **Live backend integration** — courses and students are fetched from the deployed Express API, not static files
- **Server vs. Client Component split, used deliberately:**
  - `courses/[id]/page.jsx` — a Server Component; fetches directly with `await fetch()`, no hooks, with `loading.jsx` and `error.jsx` handling the loading/error UI via Next.js's file conventions
  - `Cards.jsx`, `Navbar.jsx`, `AddCourse.jsx` — Client Components; use `useState`/`useEffect` because they need interactivity (search input, form submission, hover states) that a Server Component can't provide
- **Role-aware UI** — on load, the app checks the current JWT against `/api/profile` and conditionally renders admin-only controls (add/delete buttons) based on the returned role. This is a UX convenience only — the backend enforces the real authorization boundary independently
- **Live UI updates after mutations** — newly added courses/students appear without a full page reload, via a `refreshKey` state lifted into the parent page and passed as the `key` prop to the fetching component, forcing it to remount and refetch
- **Server-side search** — the courses search hits `GET /api/courses?search=...` rather than filtering an already-downloaded array client-side
- **Own-profile editing** — a logged-in user can update their own email via `/profile`, demonstrating ownership-based authorization on the frontend side of the flow

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Icons | Iconify (`@iconify/tailwind4`, Lucide icon set) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── courses/
│   │   ├── page.jsx           # course listing + role-gated add-course form
│   │   └── [id]/
│   │       ├── page.jsx       # course detail — Server Component
│   │       ├── loading.jsx    # shown automatically while page.jsx awaits data
│   │       └── error.jsx      # shown automatically if page.jsx throws
│   ├── students/
│   │   └── page.jsx           # student list + role-gated add/delete
│   ├── profile/
│   │   └── page.jsx           # view/update own profile (ownership-based auth)
│   ├── login/ , register/     # auth forms
│   ├── instructors/ , about/ , contact/
│   ├── Assets/                 # legacy static data (courses.js) — largely superseded by live API data
│   ├── layout.js               # root layout (Navbar)
│   └── page.js                 # home page
├── Components/
│   ├── Navbar.jsx               # fixed sidebar nav, mobile drawer, live search
│   ├── Cards.jsx                  # course grid — fetches from API, loading/error state
│   ├── AddCourse.jsx               # add-course form, admin-only
│   ├── CourseCard.jsx               # single course detail layout
│   ├── ButtonComp.jsx, SectionTitle.jsx  # shared UI primitives
│   ├── notAllowed.jsx                     # shared "access denied" message
│   └── auth.js                             # localStorage token helpers (getToken/setToken/removeToken)
└── ...
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- The [backend API](https://github.com/tcintern-006/StudentPortal-Backend) running locally or deployed

### Installation

```bash
git clone https://github.com/tcintern-006/StudentPortal-Nextjs.git
cd StudentPortal-Nextjs
npm install
```

### Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Point this at the deployed backend URL for a production build.

### Run locally

```bash
npm run dev
```

Runs at `http://localhost:3000`.

---

## Architecture Notes

### Why some pages are Server Components and others aren't

`courses/[id]/page.jsx` needs no interactivity — it just needs to fetch one course and render it. As a Server Component, it can `await fetch()` directly in the function body, with no `useState`/`useEffect` at all; Next.js's `loading.jsx`/`error.jsx` file conventions (built on React Suspense and Error Boundaries) handle the loading and error UI automatically based on whether the `await` is pending or throws.

`Cards.jsx` and `Navbar.jsx`, by contrast, need `"use client"` because they have genuine interactivity (search input, hover effects) — and since Client Components can't be `async` functions themselves, their data-fetching follows the standard pattern of an `async` helper defined and invoked inside `useEffect`, with `isLoading`/`error` tracked in state.

### Images

`next/image` requires allow-listing external domains. Since course images can come from arbitrary URLs (Unsplash, GitHub raw content, etc.), `next.config.mjs` currently uses a wildcard `remotePatterns` entry (`hostname: '**'`) rather than listing specific domains — a deliberate tradeoff of Next's built-in domain-restriction safety for flexibility, acceptable at this project's scale.

---

## Deployment

Deployed on [Vercel](https://vercel.com).

| Env variable | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `https://<backend>.koyeb.app/api` | Production, Preview, Development |

`NEXT_PUBLIC_` variables are inlined at build time — a new deployment is required after changing this value in Vercel's dashboard.

---

## Known Limitations / Next Steps

- JWT is stored in `localStorage`, not an `httpOnly` cookie — simplest option for this scope, but more XSS-exposed than a cookie-based approach.
- Role-based UI hiding is convenience only; the actual authorization boundary lives entirely in the backend, as it must.
- No pagination UI yet — the backend currently returns a flat, limited result set rather than page-through results.

---

## Author

**Muhammad Ammar Akbar**
[LinkedIn](https://www.linkedin.com/in/muhammadammar46/) · [GitHub](https://github.com/tcintern-006)
