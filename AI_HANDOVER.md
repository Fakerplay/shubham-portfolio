# Project Handover & Context for AI Coding Assistants (Claude Code, Codex, Cursor, etc.)

## 1. Project Overview & Tech Stack
- **Project Name**: `shubham-portfolio`
- **Framework**: Next.js 16 (App Router, TypeScript, Turbopack enabled)
- **Styling & Animations**: Tailwind CSS / Vanilla CSS (`app/globals.css`), Framer Motion (`framer-motion`), WebGL / Canvas effects (`LightLeakBackground.tsx`, `ThemeLamp.tsx`)
- **Key Commands**:
  - `npm run dev` (Runs local dev server with Turbopack)
  - `npm run build` (Validates static page generation and TypeScript compilation)
  - `npm run lint` (Runs ESLint checks across all pages and components)

---

## 2. Core Architecture & Directory Layout

```
shubham-portfolio/
├── app/
│   ├── layout.tsx         # Global layout (WebGL LightLeakBackground + Header + Footer + ThemeProvider)
│   ├── page.tsx           # Homepage (Hero, ProjectCard grid, Expertise, Services)
│   ├── work/
│   │   ├── page.tsx       # Selected Works Archive page (`/work`) with category tabs
│   │   └── [slug]/
│   │       └── page.tsx   # Dynamic case study page (`/work/daulat-finvest`, `/work/solaris`, etc.)
├── components/
│   ├── Header.tsx         # Tactile skeuomorphic 3D keycap navbar (Routes `/work` directly)
│   ├── Footer.tsx         # Folder-reveal interactive notes + social pills + global contact CTA
│   ├── ProjectCTA.tsx     # Post-case study collaboration banner
│   └── ...
├── data/
│   └── projects.ts        # Centralized project data repository (titles, slugs, metrics, assets)
└── public/
    ├── images/            # Static image assets grouped by project (`/images/solaris/`, `/images/optiv/`)
    └── videos/            # Looping video covers (`daulat-cover.mp4`, `solaris-2.mp4`, `studio-vistara-1.mp4`)
```

---

## 3. Critical Conventions & Rules for AI Agents

1. **Asset Naming & Paths**:
   - **Never use spaces, `#`, or special characters in filenames inside `/public/`**. Always use URL-safe kebab-case or underscore-separated names (e.g., `Studio_Vistara.png` or `solaris-2.mp4`).
   - Video files live in `/public/videos/` and are referenced with leading slashes: `video: "/videos/solaris-2.mp4"`.
   - Images live in `/public/images/` and are referenced with leading slashes: `image: "/images/solaris-cover.png"`.

2. **Client Logos Marquee (`CLIENT_LOGOS` array in `app/page.tsx`)**:
   - The featured client logos marquee is dynamically controlled by `CLIENT_LOGOS` around line 496 of `app/page.tsx`.
   - To add a new logo to the infinite scrolling strip, place the `.png` or `.svg` asset inside `/public/logos/` and add one object to `CLIENT_LOGOS`:
     ```ts
     { name: "NewClient", src: "/logos/new-client.png", width: 140, height: 34, className: "h-8 md:h-[34px]" }
     ```

3. **Project Data & Routing (`data/projects.ts` & `app/page.tsx`)**:
   - When adding a new project or modifying case studies, check both `data/projects.ts` (`DETAILED_PROJECTS`) and `app/page.tsx` (`projects` array).
   - Each project requires a `slug`, `brand`, `title`, `year`, `image` (or `video`), `description`, `metrics`, and `tags`.
   - The `/work/[slug]` route dynamically pulls `FullWidthSlot` or array-based case study spreads from `DETAILED_PROJECTS`.

3. **Navigation & Active State (`components/Header.tsx`)**:
   - The top navbar supports both anchor hash scrolling (`#about`, `#expertise`) when on `/`, and direct route navigation (`/work`).
   - If adding new standalone pages, add them to `navItems` with leading `/` route handling in `handleNavClick`.

4. **Contact & Social Tokens**:
   - Primary Email: `shubhamshinde52@gmail.com`
   - LinkedIn: `https://www.linkedin.com/in/shubham-shinde-design/`
   - Behance: `https://www.behance.net/shubhamshinde`
   - Instagram: `https://www.instagram.com/5hinde/`

---

## 4. Verification Check Before Committing Code
Always run the following command to ensure all static pages (`/work`, `/work/[slug]`, `/`) generate cleanly without broken image paths or TypeScript errors:
```bash
npm run build && npm run lint
```
