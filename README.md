# Student Course Portal

A modern, responsive course portal built with **Next.js (App Router)**, where students can browse courses, view instructor profiles, and enroll in programs. Built as part of a structured web development internship, focused on file-based routing, dynamic pages, and reusable component architecture.

**Live Demo:** [student-portal-nextjs-swart.vercel.app](https://student-portal-nextjs-swart.vercel.app/)

---

## Features

- 🏠 **Home** — Hero section, featured courses, and trusted-by logos
- 📚 **Courses** — Browse all available courses in a responsive grid
- 🔍 **Live Search** — Client-side search bar that filters courses in real time as you type
- 📄 **Dynamic Course Details** (`/courses/[slug]`) — Individual pages generated per course, with related courses shown at the bottom
- 👩‍🏫 **Instructors** — Meet the team behind the courses
- ℹ️ **About** — Mission, stats, and values
- ✉️ **Contact** — Working contact form UI
- 🚫 **Custom 404 Page** — Friendly not-found page for invalid routes
- 📱 **Fully Responsive** — Mobile-first design with a slide-in navigation drawer
- 🎨 **Custom Design System** — Reusable CSS variables for consistent theming across light mode

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Iconify](https://iconify.design/) (`@iconify/tailwind4`) |
| Fonts | Geist Variable |
| Deployment | [Vercel](https://vercel.com/) |
| Language | JavaScript (JSX) |

---

## Project Structure

```
src/
├── app/
│   ├── Assets/
│   │   ├── data.js          # Centralized static data (courses, instructors, nav, etc.)
│   │   ├── Images/           # Local image assets
│   │   └── logos/            # Company/brand logos
│   ├── courses/
│   │   ├── page.jsx          # Courses listing page
│   │   └── [slug]/
│   │       └── page.jsx      # Dynamic course detail page
│   ├── instructors/
│   │   └── page.jsx
│   ├── about/
│   │   └── page.jsx
│   ├── contact/
│   │   └── page.jsx
│   ├── not-found.jsx         # Custom 404 page
│   ├── layout.js             # Root layout (Navbar + Footer)
│   ├── globals.css           # Design tokens & global styles
│   └── page.js               # Home page
├── Components/
│   ├── Navbar.jsx             # Fixed sidebar nav with mobile drawer + live search
│   ├── ButtonComp.jsx          # Reusable button
│   ├── SectionTitle.jsx        # Reusable title + description block
│   ├── Cards.jsx                # Course card grid (supports filtering)
│   ├── CourseCard.jsx            # Single course detail layout
│   ├── ProfileCards.jsx           # Instructor card grid
│   ├── FeatureCards.jsx            # Featured courses section
│   └── ContactForm.jsx              # Contact form UI
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/tcintern-006/StudentPortal-Nextjs.git
cd StudentPortal-Nextjs
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for production

```bash
npm run build
npm start
```

---

## Key Concepts Demonstrated

- **File-based routing** with the Next.js App Router
- **Dynamic routes** (`/courses/[slug]`) with `async` params and `notFound()` handling
- **Component composition** — reusable `ButtonComp`, `SectionTitle`, and `Cards` components shared across multiple pages
- **Client-side state & filtering** — live search implemented with React state, no backend required
- **Design system via CSS variables** — centralized color tokens in `globals.css` for consistent theming

---

## Roadmap

- [ ] Connect to a real backend/database for course and enrollment data
- [ ] Add authentication (student sign-in)
- [ ] Dark mode toggle
- [ ] Related courses filtering (exclude current course)
- [ ] Contact form backend integration

---

## Author

**Muhammad Ammar Akbar**
[GitHub](https://github.com/tcintern-006) · [LinkedIn](https://www.linkedin.com/in/muhammadammar46/)

---

## License

This project was built for educational purposes as part of a web development internship.
