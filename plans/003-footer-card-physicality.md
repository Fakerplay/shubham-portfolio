# 003 — Fix Footer Studio Notes card entrance scale and exit easing

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: HIGH (entrance scale) / LOW (exit easing)
- **Category**: Physicality & origin / Easing & duration
- **Estimated scope**: 1 file, 2 small edits

## Problem

The "Studio Notes" card-deck entrance in `Footer.tsx` scales in from 0.28 — so far below AUDIT.md's floor of `scale(0.9–0.97)` that the cards effectively pop from nothing, the exact "never scale(0)" violation the rubric warns about.

```tsx
// components/Footer.tsx:137-143 — current
const cardVariants = {
  hidden: (card: StudioCard) => ({
    opacity: 0,
    scale: shouldReduceMotion ? 1 : 0.28,
    y: shouldReduceMotion ? 0 : 140,
    rotate: 0,
  }),
```

Separately, the same variants' `exit` transition uses an ease-in-shaped curve, which AUDIT.md flags as "always a finding" for UI (even on exit, the rubric's simplified decision table says entering/exiting both use ease-out):

```tsx
// components/Footer.tsx:156-165 — current
exit: (card: StudioCard) => ({
  opacity: 0,
  scale: 0.35,
  y: 120,
  rotate: 0,
  transition: {
    duration: 0.25,
    ease: [0.32, 0, 0.67, 0] as const,
  },
}),
```

## Target

```tsx
// components/Footer.tsx — target
const cardVariants = {
  hidden: (card: StudioCard) => ({
    opacity: 0,
    scale: shouldReduceMotion ? 1 : 0.92,
    y: shouldReduceMotion ? 0 : 140,
    rotate: 0,
  }),
```

```tsx
// components/Footer.tsx — target
exit: (card: StudioCard) => ({
  opacity: 0,
  scale: 0.9,
  y: 120,
  rotate: 0,
  transition: {
    duration: 0.25,
    ease: [0.23, 1, 0.32, 1] as const,
  },
}),
```

## Repo conventions to follow

- `[0.23, 1, 0.32, 1]` is AUDIT.md's canonical strong ease-out curve — use it verbatim here (this repo has no shared token file yet; plan 006 introduces one — if plan 006 has already landed when you execute this plan, import `EASE_OUT` from `lib/motion.ts` instead of inlining the array here).
- The exit `scale` was `0.35`; raise it to `0.9` to stay consistent with the corrected entrance floor — cards should still visibly shrink toward the fold-back button, just not toward invisibility.

## Steps

1. In `components/Footer.tsx:140`, change `scale: shouldReduceMotion ? 1 : 0.28,` to `scale: shouldReduceMotion ? 1 : 0.92,`.
2. In `components/Footer.tsx:158`, change `scale: 0.35,` to `scale: 0.9,`.
3. In `components/Footer.tsx:163`, change `ease: [0.32, 0, 0.67, 0] as const,` to `ease: [0.23, 1, 0.32, 1] as const,`.

## Boundaries

- Do NOT change the `y`/`rotate` values, the `stiffness`/`damping`/`mass` spring config on the `visible` variant, or any other part of `Footer.tsx`.
- Do NOT touch the envelope card's own `initial`/`whileHover`/`whileTap`/`exit` props (a separate `motion.div`, not `cardVariants`).

## Verification

- **Mechanical**: `npx tsc --noEmit` — no new type errors.
- **Feel check**: Scroll to the footer, click "Click Folder to Unpack 6 Notes" and confirm the 6 cards fan in without appearing to pop from a pinprick. Click "Fold Notes Back Into Folder" and confirm cards shrink away smoothly (not sharply/abruptly) as they exit. In DevTools Animations panel, set playback to 10% and confirm no card ever shrinks below a clearly visible size during either transition.
- **Done when**: entrance and exit both read as physical scaling of a visible object, never a pop from nothing.
