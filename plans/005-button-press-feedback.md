# 005 — Add press feedback to buttons sitewide

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: MEDIUM (high leverage)
- **Category**: Physicality & origin
- **Estimated scope**: ~15 files, one class addition each

## Problem

Nearly every clickable element in the live app has hover styling but no `:active` press feedback. AUDIT.md: "Buttons must feel responsive... add `transform: scale(0.97)` on `:active`." Representative locations:

```tsx
// components/ThemeLamp.tsx:34-39 — current
<button
  onClick={handleToggle}
  className="relative text-foreground hover:opacity-85 transition-opacity focus:outline-none p-1 flex items-center justify-center cursor-pointer"
  ...
```

```tsx
// components/ThemeDropdown.tsx:66-69 — current
<button
  onClick={() => setIsOpen(!isOpen)}
  className="flex items-center justify-between w-[125px] uppercase tracking-wider font-semibold bg-transparent text-foreground hover:opacity-60 transition-opacity border-none px-0 py-0 cursor-pointer"
>
```

```tsx
// app/work/page.tsx:129-140 — current
<button
  onClick={() => setActiveTab(cat)}
  className={`relative px-5 py-2.5 rounded-xl font-sans text-xs md:text-sm font-medium transition-all duration-300 select-none cursor-pointer border ${...}`}
>
```

```tsx
// components/ColorPicker.tsx:22-29 — current
<button
  ...
  className={`w-3.5 h-3.5 rounded-full border border-foreground/15 transition-all duration-300 relative cursor-pointer hover:scale-125 focus:outline-none ${...}`}
```

Note: `ColorPicker.tsx` is confirmed dead code (not imported anywhere) — included here only for completeness of the original audit; skip it per Boundaries below.

## Target

Add `active:scale-[0.97]` (Tailwind arbitrary value, matching AUDIT.md's 0.95-0.98 press-feedback range) plus a matching `transition-transform duration-150` where a transform transition doesn't already exist, to every pressable element below. `ColorPicker.tsx`'s existing `hover:scale-125` would make `active:scale-[0.97]` a large jump — use `active:scale-100` there specifically if it's ever reactivated (out of scope now, see Boundaries).

```tsx
// components/ThemeLamp.tsx — target
<button
  onClick={handleToggle}
  className="relative text-foreground hover:opacity-85 active:scale-[0.97] transition-[opacity,transform] focus:outline-none p-1 flex items-center justify-center cursor-pointer"
  ...
```

```tsx
// components/ThemeDropdown.tsx — target
<button
  onClick={() => setIsOpen(!isOpen)}
  className="flex items-center justify-between w-[125px] uppercase tracking-wider font-semibold bg-transparent text-foreground hover:opacity-60 active:scale-[0.97] transition-[opacity,transform] border-none px-0 py-0 cursor-pointer"
>
```

```tsx
// app/work/page.tsx — target
<button
  onClick={() => setActiveTab(cat)}
  className={`relative px-5 py-2.5 rounded-xl font-sans text-xs md:text-sm font-medium active:scale-[0.97] transition-[background-color,color,border-color,transform] duration-300 select-none cursor-pointer border ${...}`}
>
```

## Repo conventions to follow

- Several elements already use `active:scale-[0.98]` correctly (e.g. `components/Footer.tsx:397,405`, `components/ProjectCTA.tsx:52`, `app/work/[slug]/page.tsx:253`) — match that pattern and value range; do not introduce a different scale value.
- This plan should execute after plan 004 (transition-all cleanup) touches the same class strings — coordinate the `transition-[...]` property list so both plans' edits land together rather than one overwriting the other's property list. If plan 004 has already landed, just append `transform` to its property list instead of writing a new one.

## Steps

1. `components/ThemeLamp.tsx:36`: add `active:scale-[0.97]`, change `transition-opacity` to `transition-[opacity,transform]`.
2. `components/ThemeDropdown.tsx:68`: add `active:scale-[0.97]`, change `transition-opacity` to `transition-[opacity,transform]`.
3. `app/work/page.tsx:132`: add `active:scale-[0.97]` to the category filter button className.
4. `app/work/[slug]/page.tsx:178`: add `active:scale-[0.97]` to the Curator Studio Mode toggle button (it already has `scale-105` conditionally applied when active — keep that, just add the active-press scale for the press moment itself alongside it).
5. `app/work/[slug]/page.tsx:207,214,350,358,365`: add `active:scale-[0.97]` to Reset/Copy/Up/Down/Remove buttons.
6. `components/Footer.tsx:453-459` (copy-email button) and `:471-479` ("Up" button): add `active:scale-[0.97]`.
7. `components/services/ExpertiseCTA.tsx:48-56` (copy-email button): add `active:scale-[0.97]` (the "Start a Conversation" link at `:40-46` already has `active:scale-[0.98]` — leave it).
8. `components/services/ExpertiseMatrix.tsx:22-33` (row container, since the whole row is clickable via `onMouseEnter`/hover — this one is hover-only by design, not a press target; skip this file, it has no `onClick`).
9. Header nav links (`components/Header.tsx:132-141,233-242`) and the mute-toggle button (`:195-213`): add `active:scale-[0.97]` (do not add it to the sliding `layoutId` background div, only to the outer pressable `Link`/`button`).

## Boundaries

- Do NOT touch `ColorPicker.tsx` or any of the other 8 confirmed-dead components.
- Do NOT add press feedback to elements with no `onClick`/no interactive role (e.g. `ExpertiseMatrix.tsx` rows, which are hover-only).
- Do NOT change the scale value from `0.97` (or the existing `0.98` where already present) to anything else.

## Verification

- **Mechanical**: `npx tsc --noEmit` clean.
- **Feel check**: Click/tap each updated button and confirm a subtle, immediate shrink-and-release — nothing should feel like a no-op click. In DevTools, throttle CPU to 4x slowdown and confirm the press feedback still registers instantly (it's a CSS transform transition, should stay smooth).
- **Done when**: every listed pressable element visibly compresses on `:active` and releases cleanly.
