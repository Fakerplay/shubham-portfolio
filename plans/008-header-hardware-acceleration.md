# 008 — Hardware-accelerate the sticky header's scroll show/hide

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file, small edit

## Problem

The sticky header's show/hide-on-scroll animation uses Framer Motion's bare `y` shorthand, which AUDIT.md flags explicitly: "Framer Motion `x`/`y`/`scale` shorthands are not hardware-accelerated — they run on the main thread and drop frames under load." This one is driven by a `scroll` event listener that fires on effectively every scroll tick (`components/Header.tsx:37-54`), making it a high-frequency case where the main-thread cost compounds.

```tsx
// components/Header.tsx:110-114 — current
<motion.header
  initial={{ y: 0 }}
  animate={{ y: isVisible ? 0 : -120 }}
  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  className="fixed top-0 left-0 right-0 w-full z-50 select-none"
>
```

## Target

```tsx
// components/Header.tsx — target
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, animate } from "framer-motion";
...
const headerY = useMotionValue(0);

useEffect(() => {
  animate(headerY, isVisible ? 0 : -120, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
}, [isVisible, headerY]);

const headerTransform = useMotionTemplate`translateY(${headerY}px)`;
...
<motion.header
  style={{ transform: headerTransform }}
  className="fixed top-0 left-0 right-0 w-full z-50 select-none"
>
```

## Repo conventions to follow

- `Header.tsx` already imports `useState`/`useEffect` from React and `motion`/`AnimatePresence` from `framer-motion` (`:1-11`) — add `useMotionTemplate`, `useMotionValue`, and `animate` to the existing `framer-motion` import line rather than a new import statement.
- Keep the existing `isVisible` state and its scroll-listener `useEffect` (`:36-54`) completely unchanged — only the header's own animate/style wiring changes.

## Steps

1. In `components/Header.tsx`, update the `framer-motion` import at line 4 to: `import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from "framer-motion";`.
2. Add `const headerY = useMotionValue(0);` near the top of the component, alongside the other `useState` declarations.
3. Add a new `useEffect(() => { animate(headerY, isVisible ? 0 : -120, { duration: 0.45, ease: [0.22, 1, 0.36, 1] }); }, [isVisible, headerY]);` placed after the existing scroll-visibility `useEffect`.
4. Add `const headerTransform = useMotionTemplate\`translateY(${headerY}px)\`;` after that.
5. Replace the `<motion.header initial={{ y: 0 }} animate={{ y: isVisible ? 0 : -120 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} ...>` opening tag with `<motion.header style={{ transform: headerTransform }} ...>`, keeping the existing `className` string unchanged.

## Boundaries

- Do NOT change the scroll-visibility detection logic (`:37-54`) or the `isVisible`/`lastScrollY` state.
- Do NOT change the duration or easing values — only the mechanism (motion value + `animate()` + `transform` string) changes, not the timing.
- Do NOT apply this same pattern to the `layoutId="activeTactileTab"`/`"activeHeaderTabMobile"` sliding backgrounds in the same file — those are a different, already-appropriate Framer Motion `layout` animation pattern, out of scope here.

## Verification

- **Mechanical**: `npx tsc --noEmit` clean; confirm `framer-motion` v12 exports `useMotionTemplate` and `animate` (it does, both are documented public APIs).
- **Feel check**: Scroll down past 80px then back up on the homepage — the header should hide/show exactly as before, no visible timing or curve change. In DevTools Performance panel, record a scroll session before/after and confirm the header animation appears in the "Composite" phase rather than triggering "Layout"/"Paint" work tied to the header element.
- **Done when**: header show/hide behavior is visually identical to before, driven by a `transform` string rather than a bare `y` prop.
