# 001 — Fix reduced-motion users getting permanently invisible project cards

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: HIGH
- **Category**: Accessibility (correctness bug)
- **Estimated scope**: 1 file, ~10 line change

## Problem

`app/page.tsx` applies a static `opacity-0` class to every `.featured-project-card` unconditionally, and only ever sets it back to `opacity: 1` via a GSAP tween that is skipped entirely when the user has `prefers-reduced-motion: reduce` set. The result: reduced-motion users see the "Featured Work" project cards permanently invisible — the site's primary content is missing for them.

```tsx
// app/page.tsx:501-513 — current
useEffect(() => {
  setMounted(true)

  // Check accessibility presets
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  setReduceMotion(mediaQuery.matches)
  const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
  mediaQuery.addEventListener("change", listener)

  if (mediaQuery.matches) {
    return () => mediaQuery.removeEventListener("change", listener)
  }
  // ... GSAP ScrollTrigger + fromTo calls below never run when matches is true
```

```tsx
// app/page.tsx:533-548 — current (skipped for reduced-motion users)
gsap.fromTo(
  ".featured-project-card",
  { y: 55, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.85,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: { trigger: "#work", start: "top 75%", toggleActions: "play none none none" }
  }
);
```

```tsx
// app/page.tsx:823 — current
<div key={idx} className={`featured-project-card opacity-0 flex flex-col ${idx < projects.length - 1 ? 'border-b border-foreground/10 pb-32 md:pb-44' : ''}`}>
```

## Target

Reduced-motion users must see the cards at full opacity immediately (no scroll-triggered fade needed — AUDIT.md: reduced motion means fewer/gentler animations, not zero content). Everyone else keeps the existing scroll-triggered reveal (also see plan 011 for the stagger-timing fix to this same `gsap.fromTo` call).

```tsx
// app/page.tsx — target: don't hardcode opacity-0 in JSX; let GSAP own the initial state
<div key={idx} className={`featured-project-card flex flex-col ${idx < projects.length - 1 ? 'border-b border-foreground/10 pb-32 md:pb-44' : ''}`}>
```

```tsx
// app/page.tsx — target: reduced-motion branch explicitly sets full opacity, no animation
if (mediaQuery.matches) {
  gsap.set(".featured-project-card", { opacity: 1, y: 0 });
  gsap.set(".lab-item-card", { opacity: 1, y: 0 }); // harmless no-op if selector matches nothing, see plan 011
  return () => mediaQuery.removeEventListener("change", listener);
}
```

## Repo conventions to follow

- GSAP is already imported and registered at the top of `app/page.tsx` (`import { gsap } from "gsap"`), so `gsap.set(...)` requires no new import.
- Keep the existing `mediaQuery.addEventListener("change", listener)` registration — only change what happens in the `if (mediaQuery.matches)` branch.

## Steps

1. In `app/page.tsx`, remove the hardcoded `opacity-0` Tailwind class from the `.featured-project-card` div at line 823 (template string interpolation stays for the border class).
2. In the `useEffect` at `app/page.tsx:501-513`, inside the `if (mediaQuery.matches) { ... }` block (before the `return`), add `gsap.set(".featured-project-card", { opacity: 1, y: 0 });`.
3. Confirm the non-reduced-motion path (the `gsap.fromtailwind` reveal at `:533-548`) is unchanged — it already animates from `opacity: 0` itself via the `fromTo` call, so removing the static class does not affect that path (GSAP's `fromTo` sets the starting state in JS before animating).

## Boundaries

- Do NOT touch the `.lab-item-card` GSAP call beyond adding the one `gsap.set` line above — its stagger value and the orphaned-selector cleanup are handled by plan 011.
- Do NOT change the GSAP `fromTo` reveal for non-reduced-motion users.
- Do NOT touch any other component.

## Verification

- **Mechanical**: `npx tsc --noEmit` — no new type errors.
- **Feel check**: In Chrome DevTools → Rendering panel → "Emulate CSS media feature prefers-reduced-motion: reduce", reload the homepage, scroll to "Featured Work" and confirm all 4 project cards are immediately visible at full opacity with no fade-in. Then turn the emulation off, reload, and confirm the normal scroll-triggered stagger reveal still plays for non-reduced-motion users.
- **Done when**: project cards are visible under both reduced-motion and normal settings, with no regression to the existing GSAP scroll reveal.
