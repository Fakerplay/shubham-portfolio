# 002 — Stop the always-on "wobble" animations from running forever

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: HIGH
- **Category**: Purpose & frequency / Accessibility / Performance
- **Estimated scope**: 3 files, small targeted edits

## Problem

Three separate places apply the CSS `wobble` keyframe (`app/globals.css:73-86`, which cycles `filter: url(#wobble-fN)` — SVG filters defined only inside `HandDrawnLogo.tsx`) as an **infinite** animation with no interaction gate:

```tsx
// components/Header.tsx:153-155 — current
<span className="w-[1.5px] h-3 bg-zinc-700 border-l border-zinc-950 border-r border-zinc-600 rounded-full animate-[wobble_0.8s_infinite_alternate]" />
<span className="w-[1.5px] h-3 bg-zinc-700 border-l border-zinc-950 border-r border-zinc-600 rounded-full animate-[wobble_0.8s_infinite_alternate_0.2s]" />
<span className="w-[1.5px] h-3 bg-zinc-700 border-l border-zinc-950 border-r border-zinc-600 rounded-full animate-[wobble_0.8s_infinite_alternate_0.4s]" />
```

`Header.tsx` has zero `prefers-reduced-motion` handling anywhere in the file — this infinite animation runs for every visitor, every page, forever, regardless of OS accessibility settings.

```tsx
// components/HandDrawnLogo.tsx:29-35 — current
<svg
  width="58"
  height="58"
  viewBox="0 0 48 48"
  className={reduceMotion ? "" : "animate-[wobble_0.35s_steps(1)_infinite]"}
  style={{ transformOrigin: "center" }}
>
```

This one IS gated by `reduceMotion`, but still runs the expensive `feTurbulence`/`feDisplacementMap` SVG filter continuously for every non-reduced-motion visitor, for as long as the header is mounted (i.e. the entire session) — for a persistent, always-visible logo, that's justified only as an occasional hover flourish, not a permanent background cost.

```tsx
// components/LocalTime.tsx:74-86 — current
<AnimatePresence>
  {isHovered && weather && (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute top-10 right-0 bg-zinc-950 text-white border border-zinc-800 rounded-xl shadow-2xl p-3.5 z-[100] w-48 pointer-events-none select-none animate-[wobble_0.5s_steps(1)_infinite]"
      style={{
        transformOrigin: "top right"
      }}
    >
```

This tooltip has nothing to do with the hand-drawn logo concept, has no `reduceMotion` check in this file at all, and the `wobble` class only "works" because `HandDrawnLogo`'s SVG filter defs happen to be mounted elsewhere in the same `Header` — a fragile, invisible cross-component coupling.

## Target

Header ribbed grips: remove the infinite wobble entirely (it's pure decoration with no purpose per AUDIT.md's frequency table — an always-visible element seen 100+ times/session should not carry a permanent animation).

```tsx
// components/Header.tsx — target
<span className="w-[1.5px] h-3 bg-zinc-700 border-l border-zinc-950 border-r border-zinc-600 rounded-full" />
<span className="w-[1.5px] h-3 bg-zinc-700 border-l border-zinc-950 border-r border-zinc-600 rounded-full" />
<span className="w-[1.5px] h-3 bg-zinc-700 border-l border-zinc-950 border-r border-zinc-600 rounded-full" />
```

HandDrawnLogo: only wobble while hovered, matching the component's existing `isHovered` state (already tracked at `HandDrawnLogo.tsx:8,23-24`).

```tsx
// components/HandDrawnLogo.tsx — target
className={reduceMotion || !isHovered ? "" : "animate-[wobble_0.35s_steps(1)_infinite]"}
```

LocalTime: remove the wobble class outright — keep the existing opacity/y/scale Framer transition, which already provides a clean entrance.

```tsx
// components/LocalTime.tsx — target
className="absolute top-10 right-0 bg-zinc-950 text-white border border-zinc-800 rounded-xl shadow-2xl p-3.5 z-[100] w-48 pointer-events-none select-none"
```

## Repo conventions to follow

- `HandDrawnLogo.tsx` already has an `isHovered` state variable (`:8`) toggled by `onMouseEnter`/`onMouseLeave` (`:23-24`) — reuse it directly, no new state needed.
- Keep the `@keyframes wobble` definition in `app/globals.css:73-86` — it's still used by `HandDrawnLogo`'s hover state after this change.

## Steps

1. In `components/Header.tsx`, remove `animate-[wobble_0.8s_infinite_alternate]`, `animate-[wobble_0.8s_infinite_alternate_0.2s]`, and `animate-[wobble_0.8s_infinite_alternate_0.4s]` from the three ribbed-grip `<span>` elements at lines 153-155 (leave every other class untouched).
2. In `components/HandDrawnLogo.tsx:33`, change the `className` expression from `reduceMotion ? "" : "animate-[wobble_0.35s_steps(1)_infinite]"` to `reduceMotion || !isHovered ? "" : "animate-[wobble_0.35s_steps(1)_infinite]"`.
3. In `components/LocalTime.tsx:82`, remove `animate-[wobble_0.5s_steps(1)_infinite]` from the tooltip's `className` string, leaving the rest of the classes intact.

## Boundaries

- Do NOT remove the `@keyframes wobble` rule from `app/globals.css` — it's still needed by `HandDrawnLogo`.
- Do NOT change any other part of the ribbed-grip markup, the logo SVG, or the weather tooltip's Framer Motion `initial`/`animate`/`exit`/`transition` props.
- Do NOT touch `ThemeLamp.tsx`, `ThemeDropdown.tsx`, or any other Header child component.

## Verification

- **Mechanical**: `npx tsc --noEmit` — no new type errors.
- **Feel check**:
  - Load any page; the three ribbed-grip dots next to the nav labels should be static (no jitter) at rest.
  - Hover the header logo — it should now wobble only while the cursor is over it, and stop immediately on mouse-leave.
  - Hover the local-time clock in the header long enough for the weather tooltip to appear — it should fade/scale in cleanly with zero jitter.
  - Toggle `prefers-reduced-motion: reduce` in DevTools Rendering panel and confirm the logo never wobbles even on hover.
- **Done when**: no infinite/always-on wobble runs anywhere on the site; the logo wobbles only on hover (and only without reduced motion); the weather tooltip has no jitter.
