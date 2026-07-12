# 012 — Add stagger to `/work` filter-tab card transitions

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file, small edit

## Problem

Switching the category filter on `/work` animates every currently-visible project card in simultaneously — AUDIT.md's "everything-at-once group entrance where a 30-80ms stagger belongs" pattern.

```tsx
// app/work/page.tsx:147-157 — current
<AnimatePresence mode="popLayout">
  {filteredProjects.map((project, index) => (
    <motion.div
      key={project.slug}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full px-6 md:px-16 lg:px-24 flex flex-col group select-none"
    >
```

## Target

```tsx
// app/work/page.tsx — target
<AnimatePresence mode="popLayout">
  {filteredProjects.map((project, index) => (
    <motion.div
      key={project.slug}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="w-full px-6 md:px-16 lg:px-24 flex flex-col group select-none"
    >
```

## Repo conventions to follow

- `index` is already available as the second argument to `.map()` at line 148 — no new variable needed.
- 60ms (`0.06`) sits inside AUDIT.md's 30-80ms stagger budget; with at most 4 projects per category in this dataset, the total added delay tops out at ~180ms, which stays well within the "occasional" content-swap tolerance.

## Steps

1. In `app/work/page.tsx:155`, change `transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}` to `transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}`.

## Boundaries

- Do NOT add a delay to the `exit` transition — only entrance should stagger; exiting cards should leave together (`AnimatePresence mode="popLayout"` already handles this correctly since `exit` is a separate object with no `delay`).
- Do NOT change the filter tab buttons themselves (covered by plan 005 for press feedback).

## Verification

- **Mechanical**: `npx tsc --noEmit` clean.
- **Feel check**: On `/work`, click through the category tabs and confirm the resulting cards now cascade in slightly rather than popping in unison, while still feeling quick (total stagger well under a second even with more categories added later).
- **Done when**: filtered project cards visibly stagger in by index on every tab switch.
