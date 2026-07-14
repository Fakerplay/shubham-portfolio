# Lighthouse Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve mobile Lighthouse performance and accessibility without changing the portfolio's visual design or structure.

**Architecture:** Introduce one focused lazy-video primitive shared by portfolio surfaces, preserve posters as the immediate visual, and make continuous effects lifecycle-aware. Keep all design markup and copy intact while removing avoidable initial network, decode, rendering, and accessibility costs.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, browser IntersectionObserver and media-query APIs.

## Global Constraints

- Do not change hero copy, visual design, content hierarchy, or page structure.
- Do not add dependencies or icon packages.
- Preserve reduced-motion behavior and keyboard access.
- Exclude pre-existing untracked mascot files from all commits.

---

### Task 1: Demand-driven project video

**Files:**
- Create: `components/LazyVideo.tsx`
- Modify: `app/page.tsx`
- Modify: `app/work/page.tsx`
- Modify: `app/work/[slug]/page.tsx`

**Interfaces:**
- Produces: `LazyVideo({ src, poster, className, priorityMargin })`
- Uses: `IntersectionObserver`, `prefers-reduced-motion`, `navigator.connection.saveData`, and `document.visibilityState`

- [ ] Create a reusable video component that leaves `src` unset until the card approaches the viewport.
- [ ] Play only while visible; pause on exit and when the document is hidden.
- [ ] Keep poster imagery and existing classes so card dimensions and styling remain unchanged.
- [ ] Replace each autoplay video instance with the shared component and disable repeated project-link prefetching.

### Task 2: Image and font delivery

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/work/page.tsx`
- Modify: `app/work/[slug]/page.tsx`
- Modify: `app/layout.tsx`
- Create: `public/fonts/ExposureTrialVAR.woff2`
- Create: `public/fonts/ExposureTrialVAR-Italic.woff2`

**Interfaces:**
- Next Image receives responsive `sizes` and quality 85 without `unoptimized`.
- `next/font/local` reads WOFF2 variable font sources.

- [ ] Remove optimization bypasses and quality 100 from portfolio imagery.
- [ ] Convert both variable TTF fonts to WOFF2 and update the root font declaration.
- [ ] Confirm typography retains the same family, weight range, and italic behavior.

### Task 3: Adaptive effects and secondary data

**Files:**
- Modify: `components/LightLeakBackground.tsx`
- Modify: `components/LocalTime.tsx`

**Interfaces:**
- WebGL render loop responds to intersection, page visibility, reduced motion, and viewport width.
- Weather cache shape: `{ expiresAt: number, value: Weather }` in session storage.

- [ ] Pause WebGL while hidden and use a lower mobile frame cadence.
- [ ] Render a stable frame for reduced-motion users.
- [ ] Update the clock once per minute instead of once per second.
- [ ] Defer weather until idle, cache it, and cancel updates after unmount.

### Task 4: Lighthouse accessibility semantics

**Files:**
- Modify: `app/work/page.tsx`
- Modify: `app/work/[slug]/page.tsx`
- Modify: `components/Header.tsx`
- Modify: `components/ThemeLamp.tsx`
- Modify: `components/ColorPicker.tsx`
- Modify: `components/services/ServicesAccordion.tsx`

**Interfaces:**
- Root layout remains the single `<main>` landmark.
- Icon controls expose at least a 44px hit target and `focus-visible` ring.

- [ ] Replace nested page-level main landmarks with neutral containers.
- [ ] Add visible focus styles and accessible hit-area sizing without changing icon appearance.

### Task 5: Verification and delivery

**Files:**
- Verify all modified files.

**Interfaces:**
- `npm run lint` exits successfully.
- `npm run build` exits successfully and lists expected routes.

- [ ] Run lint and fix scoped failures.
- [ ] Run the production build and review bundle/route output.
- [ ] Inspect git diff and confirm unrelated untracked files remain excluded.
- [ ] Commit the approved performance work and push the current branch.

