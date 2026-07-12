# 011 — Tighten GSAP stagger timing and remove the orphaned `.lab-item-card` call

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: LOW
- **Category**: Cohesion & tokens / code hygiene
- **Estimated scope**: 1 file, small edit

## Problem

The GSAP stagger reveal for featured project cards exceeds AUDIT.md's 30-80ms stagger budget:

```tsx
// app/page.tsx:532-548 — current
gsap.fromTo(
  ".featured-project-card",
  { y: 55, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.85,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#work",
      start: "top 75%",
      toggleActions: "play none none none"
    }
  }
);
```

Separately, a second `gsap.fromTo` call targets `.lab-item-card` with a `#smart-lab` `ScrollTrigger`, but neither the class nor the id exists anywhere in the current JSX (confirmed via repo-wide grep — this is leftover from a prior "Smart Lab" section that no longer exists in the page):

```tsx
// app/page.tsx:515,550-566 — current
const sections = ["about", "work", "smart-lab"];
...
gsap.fromTo(
  ".lab-item-card",
  { y: 40, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.12,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#smart-lab",
      start: "top 75%",
      toggleActions: "play none none none"
    }
  }
);
```

## Target

```tsx
// app/page.tsx — target: tighten the live stagger
gsap.fromTo(
  ".featured-project-card",
  { y: 55, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.85,
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#work",
      start: "top 75%",
      toggleActions: "play none none none"
    }
  }
);
```

```tsx
// app/page.tsx — target: remove the dead "smart-lab" entry and the orphaned gsap.fromTo call entirely
const sections = ["about", "work"];
// (the entire `gsap.fromTo(".lab-item-card", ...)` block is deleted)
```

## Repo conventions to follow

- This is the only GSAP-driven stagger in the live app (all Framer Motion staggers live in the dead `services/*` components) — 80ms (`0.08`) is AUDIT.md's upper bound, chosen here to keep the reveal feeling substantial across 4 large cards rather than rushed.

## Steps

1. In `app/page.tsx:540`, change `stagger: 0.15,` to `stagger: 0.08,`.
2. In `app/page.tsx:515`, change `const sections = ["about", "work", "smart-lab"];` to `const sections = ["about", "work"];`.
3. Delete the entire second `gsap.fromTo(".lab-item-card", ...)` block (originally at `:551-566`), including its trailing comment line `// Staggered reveal for Smart Lab items` (originally at `:550`).

## Boundaries

- Do NOT touch the `.featured-project-card` reduced-motion handling — that's plan 001's scope (if plan 001 hasn't landed yet, its `gsap.set(".lab-item-card", ...)` step should be dropped since this plan deletes the selector entirely — coordinate: execute plan 001 first, or if this plan lands first, skip the `.lab-item-card` line in plan 001's step 2 since the selector no longer exists in the codebase after this plan).
- Do NOT touch the `ScrollTrigger.create` loop over `sections` beyond removing `"smart-lab"` from the array — its `onEnter`/`onEnterBack` logic stays the same.
- Do NOT add a new "Smart Lab" section — this plan only removes dead code, it does not restore missing content.

## Verification

- **Mechanical**: `npx tsc --noEmit` clean; `grep -n "lab-item-card\|smart-lab" app/page.tsx` returns nothing.
- **Feel check**: Scroll to "Featured Work" on the homepage and confirm the 4 project cards stagger in slightly faster/tighter than before but still readably sequential, not simultaneous.
- **Done when**: no orphaned GSAP call remains and the live stagger sits within the 30-80ms budget.
