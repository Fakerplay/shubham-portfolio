# 006 — Introduce shared easing constants and replace ad hoc curves

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 new file + ~13 files touched (import + swap)

## Problem

No `--ease-*` token exists anywhere in the repo (`app/globals.css`, `tailwind.config.ts`). Every Framer Motion `transition.ease` is either a hand-typed cubic-bezier array or a bare built-in keyword, with two near-duplicate "strong ease-out" curves in circulation and no consolidation:

| Curve | Count | Representative locations |
| --- | --- | --- |
| `[0.22, 1, 0.36, 1]` | 12 | `app/page.tsx:308,321,332,345,352,710`; `components/Header.tsx:113`; `components/Footer.tsx:175,203`; `app/work/page.tsx:155`; `components/services/ExpertiseCTA... (n/a, dead)`; `components/services/ExpertiseMatrix.tsx` (none currently — verify at execution time) |
| `[0.16, 1, 0.3, 1]` | 2 | `app/page.tsx:51,74` |
| bare `"easeOut"` | 5 | `app/page.tsx:231,492`; `components/LocalTime.tsx:81`; `components/ThemeDropdown.tsx:83` |
| bare `"easeInOut"` | 3 | `app/page.tsx:237`; `components/HandDrawnLogo.tsx:73,83` |

AUDIT.md: "Built-in CSS easings are too weak for deliberate motion" and "Curves and durations should live as shared tokens" — five near-identical hand-typed curves is exactly the consolidation case it names.

## Target

Create `lib/motion.ts`:

```ts
// lib/motion.ts — new file
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
```

These are AUDIT.md's exact canonical values — copy them verbatim, do not approximate.

Replace every occurrence of `[0.22, 1, 0.36, 1]` and `[0.16, 1, 0.3, 1]` with `EASE_OUT`, and every bare `"easeOut"` with `EASE_OUT` and bare `"easeInOut"` with `EASE_IN_OUT`, importing from `@/lib/motion` in each file (this repo's existing import alias, confirmed via `@/components/...` imports already used throughout, e.g. `components/Header.tsx:11`).

```tsx
// example — components/Header.tsx — before
import { motion, AnimatePresence } from "framer-motion";
...
transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
```

```tsx
// example — components/Header.tsx — after
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
...
transition={{ duration: 0.45, ease: EASE_OUT }}
```

## Repo conventions to follow

- Path alias `@/` already maps to the repo root (see every existing `@/components/...` import) — `@/lib/motion` will resolve the same way, no tsconfig change needed.
- Keep `as const` where the original array had it (e.g. `components/Footer.tsx:175,203`) — `EASE_OUT`/`EASE_IN_OUT` are already declared `as const` in `lib/motion.ts`, so just drop the local `as const` when replacing.

## Steps

1. Create `lib/motion.ts` with the two exported constants shown above.
2. In `app/page.tsx`: replace `[0.16, 1, 0.3, 1]` at lines 51 and 74 with `EASE_OUT`; replace `[0.22, 1, 0.36, 1]` at lines 308, 321, 332, 345, 352, 710 with `EASE_OUT`; replace bare `"easeOut"` at 231, 492 with `EASE_OUT`; replace bare `"easeInOut"` at 237 with `EASE_IN_OUT`. Add `import { EASE_OUT, EASE_IN_OUT } from "@/lib/motion";` near the top with the other imports.
3. In `components/Header.tsx:113`: replace `[0.22, 1, 0.36, 1]` with `EASE_OUT`; add the import.
4. In `components/Footer.tsx:175,203` (and `:163` if plan 003 hasn't landed yet — coordinate so the value matches plan 003's target `[0.23, 1, 0.32, 1]`, which is identical to `EASE_OUT`): replace with `EASE_OUT`; add the import.
5. In `app/work/page.tsx:155`: replace `[0.22, 1, 0.36, 1]` with `EASE_OUT`; add the import.
6. In `components/LocalTime.tsx:81`: replace bare `"easeOut"` with `EASE_OUT`; add the import.
7. In `components/ThemeDropdown.tsx:83`: replace bare `"easeOut"` with `EASE_OUT`; add the import.
8. In `components/HandDrawnLogo.tsx:73,83`: replace bare `"easeInOut"` with `EASE_IN_OUT`; add the import.
9. Grep the whole repo for any remaining `ease: [0.22` / `ease: [0.16` / `ease: "easeOut"` / `ease: "easeInOut"` occurrences in files actually rendered by the live app (skip the dead components listed in the audit: `ExpertisePillar.tsx`, `ExpertiseStack.tsx`, `ServicesAccordion.tsx`, `ServicesGrid.tsx`, `ServicesMarquee.tsx`, `ProceduralShadowOverlay.tsx`) and replace those too.

## Boundaries

- Do NOT touch the 9 confirmed-dead components (`ColorPicker.tsx`, `ProceduralShadowOverlay.tsx`, `TerminalTypewriter.tsx`, `HoverReveal.tsx`, `ExpertisePillar.tsx`, `ExpertiseStack.tsx`, `ServicesAccordion.tsx`, `ServicesGrid.tsx`, `ServicesMarquee.tsx`) — they are not imported anywhere in the live app; leave their easing as-is.
- Do NOT change any `duration` values in this plan — only the `ease` values change here.
- Do NOT introduce a third easing curve — only `EASE_OUT` and `EASE_IN_OUT` per AUDIT.md.

## Verification

- **Mechanical**: `npx tsc --noEmit` and `grep -rn "ease: \[0.22\|ease: \[0.16\|ease: \"easeOut\"\|ease: \"easeInOut\"" app components` (excluding the 9 dead files) should return nothing.
- **Feel check**: Spot-check 3 entrances that changed (header show/hide, ExpandableBio disclosure, footer headline reveal) in DevTools Animations panel at 10% speed — the curve shape should look identical to before (both curves are visually near-identical strong ease-outs), confirming this is a pure consolidation with no visible regression.
- **Done when**: `lib/motion.ts` exists, is imported everywhere a hand-typed curve or bare keyword previously appeared in live code, and no behavioral difference is visible.
