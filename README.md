# Team portfolio

A Next.js + Tailwind portfolio site: hero, team, filterable project grid,
featured project, tech stack, and contact section. Dark mode by default,
toggleable to light.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For production:

```bash
npm run build
npm start
```

## Where to add your real content

Everything content-related lives in `/data` — the components just render
whatever is in these files, so you never touch component code to add a
project or a teammate.

| What to change              | File                     |
| ---------------------------- | ------------------------ |
| Team members                 | `data/team.ts`           |
| Projects                     | `data/projects.ts`       |
| Tech stack / skills          | `data/skills.ts`         |
| Site title / meta description| `app/layout.tsx`         |
| Email / GitHub / LinkedIn    | `components/Contact.tsx` |
| Colors, fonts, spacing       | `tailwind.config.ts`     |

### Adding a project

Add an object to the `projects` array in `data/projects.ts`:

```ts
{
  slug: "your-project",             // used for the URL-safe id and modal state
  name: "Your Project",
  summary: "One sentence for the card.",
  description: "Longer paragraph for the details modal.",
  category: "web",                  // "web" | "mobile" | "ai-ml" | "other"
  status: "in-progress",            // "completed" | "in-progress" | "upcoming"
  stack: ["Next.js", "PostgreSQL"],
  thumbnail: "https://...",         // or a local file in /public
  githubUrl: "https://github.com/...",
  demoUrl: "https://...",           // omit if there's no live demo yet
  featured: true,                   // optional — shows in the Featured section
  features: ["...", "..."],         // optional, shown in the details modal
  achievements: ["...", "..."],     // optional, shown in the Featured section
}
```

Only one project should have `featured: true` at a time (the section picks
the first match). The filter bar, grid, empty state, and modal all update
automatically — nothing else needs editing.

### Adding a team member

Add an object to the `team` array in `data/team.ts` with `name`, `role`,
`bio`, `avatar`, and optional `github` / `linkedin`. Drop real photos in
`/public/avatars/` and point `avatar` at `/avatars/yourfile.jpg`, or use
any full image URL.

### Images

- Project thumbnails and avatars can be any HTTPS URL — `next.config.js`
  is set to allow all remote hosts for convenience. For production, you
  may want to restrict `remotePatterns` to only the hosts you actually use.
- To use local images instead, put files in `/public` and reference them
  as `/your-image.jpg`.

## Folder structure

```
app/
  layout.tsx        — root layout, fonts, metadata
  page.tsx           — assembles all sections in order
  globals.css        — base styles + light/dark theme variables
components/
  Navbar.tsx
  Hero.tsx
  About.tsx
  TeamMemberCard.tsx
  ProjectsSection.tsx  — filter state + grid + empty state
  ProjectCard.tsx
  ProjectModal.tsx     — "View details" popup
  StatusDot.tsx        — color-coded status indicator
  FeaturedProject.tsx
  SkillsSection.tsx
  Contact.tsx
  Footer.tsx
  ThemeToggle.tsx
data/
  team.ts
  projects.ts
  skills.ts
lib/
  types.ts           — shared TypeScript interfaces
```

## Design notes

- Dark mode is the default; the toggle in the navbar persists your choice
  to `localStorage`.
- Colors, fonts, and spacing are defined once in `tailwind.config.ts` and
  as CSS variables in `globals.css` — change them there to re-theme the
  whole site.
- The contact form is UI-only right now (it confirms locally on submit).
  Wire `handleSubmit` in `components/Contact.tsx` to an email service
  (Resend, Formspree) or your own API route to make it functional.
- Reduced-motion and visible focus states are respected throughout.

## Deploying

The fastest path is [Vercel](https://vercel.com): push this to a GitHub
repo, import it in Vercel, and it builds with zero configuration.
