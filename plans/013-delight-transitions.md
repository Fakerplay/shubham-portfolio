# 013 — Add missed-opportunity delight transitions

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: LOW (additive)
- **Category**: Missed opportunities
- **Estimated scope**: 4 files, small additive edits

## Problem

Three rare/high-emotion or state-changing moments currently teleport with no transition at all:

```tsx
// components/Footer.tsx:453-459 — current (copy-email button)
<button
  onClick={handleCopyEmail}
  className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-foreground/20 hover:border-foreground/60 transition-colors cursor-pointer text-foreground/80"
  title="Copy email address"
>
  {copied ? "Copied ✓" : "Copy"}
</button>
```
(Same instant-swap pattern also at `components/ProjectCTA.tsx:59-63` and `components/services/ExpertiseCTA.tsx:48-56`.)

```tsx
// components/ThemeLamp.tsx:68-100 — current (day/night toggle)
<path
  d="M 9.5,18 C 9.5,21.5 12,22 12,22 C 12,22 14.5,21.5 14.5,18"
  strokeWidth="1.5"
  strokeLinecap="round"
  fill={isNight ? "currentColor" : "none"}
/>
...
{isNight && (
  <polygon
    points="12,22 5,30 19,30"
    fill="currentColor"
    className="opacity-15 stroke-none"
  />
)}
```

```tsx
// app/work/[slug]/page.tsx:196-197 — current (Floating Curator Dock)
{curatorMode && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background/95 backdrop-blur-xl border border-foreground/20 rounded-full px-6 py-3.5 shadow-2xl flex items-center gap-6 max-w-xl w-full justify-between animate-fade-in">
```
`animate-fade-in` has no matching `@keyframes`/Tailwind utility anywhere in the repo (`app/globals.css` only defines `wobble` and `marquee`) — this class is currently a silent no-op, and the dock actually teleports on/off screen.

## Target

**Copy feedback** — swap the copied label in with a small scale+fade instead of an instant text replacement, in all three locations:

```tsx
// components/Footer.tsx — target
<button
  onClick={handleCopyEmail}
  className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-foreground/20 hover:border-foreground/60 transition-colors cursor-pointer text-foreground/80 relative overflow-hidden"
  title="Copy email address"
>
  <AnimatePresence mode="popLayout" initial={false}>
    <motion.span
      key={copied ? "copied" : "copy"}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="inline-block"
    >
      {copied ? "Copied ✓" : "Copy"}
    </motion.span>
  </AnimatePresence>
</button>
```

Apply the identical pattern to `components/ProjectCTA.tsx` (wrapping `{copied ? "✓ Email Copied!" : \`Copy Email (${email})\`}`) and `components/services/ExpertiseCTA.tsx` (wrapping `{copied ? "Email Copied!" : email}`), each requiring `import { motion, AnimatePresence } from "framer-motion";` and adding `"use client"` if not already present (both files already have `"use client"` at the top).

**ThemeLamp** — crossfade the bulb fill and glow beam instead of instant swap:

```tsx
// components/ThemeLamp.tsx — target
<motion.path
  d="M 9.5,18 C 9.5,21.5 12,22 12,22 C 12,22 14.5,21.5 14.5,18"
  strokeWidth="1.5"
  strokeLinecap="round"
  animate={{ fill: isNight ? "currentColor" : "rgba(0,0,0,0)" }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
/>
...
<motion.polygon
  points="12,22 5,30 19,30"
  fill="currentColor"
  className="stroke-none"
  initial={false}
  animate={{ opacity: isNight ? 0.15 : 0 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
/>
```

Note: the `polygon` moves from being conditionally rendered (`{isNight && (...)}`) to always-rendered with animated `opacity`, so it can crossfade instead of popping.

**Curator Dock** — replace the dead `animate-fade-in` class with a real Framer Motion entrance:

```tsx
// app/work/[slug]/page.tsx — target
<AnimatePresence>
  {curatorMode && (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background/95 backdrop-blur-xl border border-foreground/20 rounded-full px-6 py-3.5 shadow-2xl flex items-center gap-6 max-w-xl w-full justify-between"
      style={{ x: "-50%" }}
    >
      {/* existing dock content unchanged */}
    </motion.div>
  )}
</AnimatePresence>
```

Note: `-translate-x-1/2` in the original className handles horizontal centering via Tailwind; when adding Framer Motion's own `x`/`y`/`scale` animated props to the same element, the `transform` shorthand can conflict with Tailwind's `-translate-x-1/2` utility class. Keep `left-1/2` in the className, remove `-translate-x-1/2` from the className, and instead set the constant `x: "-50%"` via the `style` prop as shown, so Framer owns the full `transform` and Tailwind doesn't fight it.

## Repo conventions to follow

- `Footer.tsx`, `ProjectCTA.tsx`, and `ExpertiseCTA.tsx` all already track `copied` state with the same `useState` + `setTimeout(() => setCopied(false), N)` pattern — this plan only changes the JSX around the existing state, not the state logic itself.
- `app/work/[slug]/page.tsx` does not currently import `motion`/`AnimatePresence` — add `import { motion, AnimatePresence } from "framer-motion";` near its existing imports.

## Steps

1. `components/Footer.tsx:453-459`: wrap the button's text content in the `AnimatePresence`/`motion.span` pattern shown in Target; add `motion`/`AnimatePresence` to the existing `framer-motion` import (this file doesn't currently import from `framer-motion` at all — add `import { motion, AnimatePresence } from "framer-motion";` near the top).
2. `components/ProjectCTA.tsx:58-63`: same wrapping pattern around `{copied ? "✓ Email Copied!" : \`Copy Email (${email})\`}`; add the `framer-motion` import (not currently present in this file).
3. `components/services/ExpertiseCTA.tsx:48-56`: same wrapping pattern around `{copied ? "Email Copied!" : email}` (leave the adjacent `⌘C`/`✓` span as a plain instant swap — it's a small icon-like indicator, not the primary feedback text); add the `framer-motion` import (not currently present in this file).
4. `components/ThemeLamp.tsx:68-73`: convert the bulb `<path>` to `<motion.path>` with animated `fill` as shown in Target; add `motion` to a new `import { motion } from "framer-motion";` (not currently imported in this file).
5. `components/ThemeLamp.tsx:94-100`: change the conditional `{isNight && (<polygon .../>)}` to an always-rendered `<motion.polygon initial={false} animate={{ opacity: isNight ? 0.15 : 0 }} .../>` as shown in Target, removing the `opacity-15` Tailwind class (opacity is now animated) but keeping `stroke-none`.
6. `app/work/[slug]/page.tsx:196-220`: wrap the Floating Curator Dock in `AnimatePresence`, convert its outer `<div>` to `<motion.div>` with the `initial`/`animate`/`exit`/`transition` shown in Target, remove `-translate-x-1/2` from its className and add `style={{ x: "-50%" }}`; add `import { motion, AnimatePresence } from "framer-motion";` near the top of the file (not currently imported).

## Boundaries

- Do NOT change the `copied` state timers (`setTimeout(() => setCopied(false), 2500)` etc.) in any of the three copy-feedback files.
- Do NOT change the lamp SVG's other paths/lines (wire, socket, shade, chain) — only the bulb fill and the glow-beam polygon.
- Do NOT change the curator dock's internal content/buttons — only its outer mount/unmount animation and the `-translate-x-1/2` → `style={{x}}` swap.
- Do NOT add these transitions to any of the 9 confirmed-dead components.

## Verification

- **Mechanical**: `npx tsc --noEmit` clean.
- **Feel check**:
  - Click each of the 3 copy-email buttons and confirm the label crossfades/slides into "Copied ✓" instead of snapping, then back to the original label after its timeout.
  - Toggle the header lamp between day/night and confirm the bulb fill and glow beam now fade in/out instead of popping.
  - Toggle "Curator Studio Mode" on `/work/[any-slug-with-showcaseGallery]` and confirm the bottom dock now scales/fades in and out instead of appearing/disappearing instantly, and remains correctly horizontally centered.
- **Done when**: all three moments show a visible, appropriately brief transition instead of an instant swap, with no layout/centering regression on the curator dock.
