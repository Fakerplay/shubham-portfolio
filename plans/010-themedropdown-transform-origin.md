# 010 — Fix ThemeDropdown transform-origin

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: LOW-MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 1 file, 1-line edit

## Problem

`ThemeDropdown` is a real anchored popover (opens below-right of its trigger button) but its `AnimatePresence` menu has no `transform-origin` set, so it defaults to `center` instead of scaling from the trigger corner.

```tsx
// components/ThemeDropdown.tsx:77-85 — current
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute right-0 mt-1 w-32 border border-foreground/10 bg-background shadow-none z-50 rounded-none overflow-hidden"
    >
```

## Target

```tsx
// components/ThemeDropdown.tsx — target
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{ transformOrigin: "top right" }}
      className="absolute right-0 mt-1 w-32 border border-foreground/10 bg-background shadow-none z-50 rounded-none overflow-hidden"
    >
```

## Repo conventions to follow

- `components/LocalTime.tsx:82-85` already does exactly this correctly for its weather tooltip (`style={{ transformOrigin: "top right" }}`) — use it as the exemplar; same pattern, same value, since both are right-aligned popovers anchored to a header-row trigger.

## Steps

1. In `components/ThemeDropdown.tsx`, add `style={{ transformOrigin: "top right" }}` to the `motion.div` at lines 79-85 (the dropdown is `right-0`-aligned via its `className`, so "top right" matches its actual anchor point).

## Boundaries

- Do NOT change the `initial`/`animate`/`exit`/`transition` values — only add the `style` prop.
- Do NOT touch the trigger `<button>` above it.

## Verification

- **Mechanical**: `npx tsc --noEmit` clean.
- **Feel check**: Click the theme-greeting dropdown trigger in the header; the menu should now visibly scale/fade from its top-right corner (near the trigger) rather than from its center. In DevTools Animations panel at 10% speed, confirm the scale origin point sits at the top-right of the menu box.
- **Done when**: the dropdown opens from its trigger corner, matching `LocalTime`'s existing tooltip behavior.
