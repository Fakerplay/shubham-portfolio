# 007 — Tighten ExpandableBio button transition durations

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: MEDIUM
- **Category**: Easing & duration
- **Estimated scope**: 1 file, 2 duration edits

## Problem

`ExpandableBio` in `app/page.tsx` is a `motion.button` — its own press-adjacent feedback (layout shift + icon rotate) runs at 350-400ms, well above AUDIT.md's 100-160ms button-press budget. The larger content-disclosure reveal underneath it (currently 550ms) is closer to the 200-500ms modal/drawer range and is left alone by this plan.

```tsx
// app/page.tsx:295-309 — current
<motion.button
  layout
  onClick={toggleOpen}
  onKeyDown={handleKeyDown}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  aria-expanded={isOpen}
  aria-label="Click to reveal personal bio note"
  whileHover={reduceMotion ? {} : {
    y: -1.5,
    rotate: 0.5,
    boxShadow: "0 4px 10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.05)"
  }}
  transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
  className="..."
>
```

```tsx
// app/page.tsx:330-336 — current (plus-icon rotate)
<motion.span
  animate={{ rotate: targetRotate }}
  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  className="font-mono text-sm select-none opacity-65 group-hover:opacity-100 transition-opacity ml-1.5"
>
  +
</motion.span>
```

## Target

```tsx
// app/page.tsx — target
transition={{ layout: { duration: 0.16, ease: [0.22, 1, 0.36, 1] } }}
```

```tsx
// app/page.tsx — target
<motion.span
  animate={{ rotate: targetRotate }}
  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
  className="font-mono text-sm select-none opacity-65 group-hover:opacity-100 transition-opacity ml-1.5"
>
  +
</motion.span>
```

Note: if plan 006 (shared easing constants) has already landed by the time you execute this plan, use `EASE_OUT` (imported from `@/lib/motion`) instead of the inline `[0.22, 1, 0.36, 1]` array shown above — the duration change is the same either way.

## Repo conventions to follow

- AUDIT.md's button-press-feedback budget is 100-160ms; 160ms (`0.16`) is used here to stay inside that range while remaining close to the original feel.
- Leave the "peek inside" label reveal (`app/page.tsx:315-328`, currently 350ms) and the disclosure height/opacity reveal (`app/page.tsx:339-359`, currently 550ms) untouched — both fall within AUDIT.md's broader tooltip/disclosure budgets and are not part of this plan's scope.

## Steps

1. In `app/page.tsx:308`, change `transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}` to `transition={{ layout: { duration: 0.16, ease: [0.22, 1, 0.36, 1] } }}`.
2. In `app/page.tsx:332`, change `transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}` to `transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}`.

## Boundaries

- Do NOT change the "peek inside" reveal transition (`:321`) or the disclosure open/close transition (`:345,352`) — those are separate, correctly-scoped content reveals, not button press feedback.
- Do NOT change the `whileHover` values or the `boxShadow` strings.
- Do NOT touch `InteractiveCodeWord` (a separate component in the same file) — its layout transition is addressed by plan 009 instead, which restructures its animation model entirely.

## Verification

- **Mechanical**: `npx tsc --noEmit` clean.
- **Feel check**: Click "It's nice to meet you" — the button's own lift/rotate and the "+" icon's rotation should now feel snappy and immediate (not sluggish), while the paragraph reveal below it still opens at its original, slightly more leisurely pace.
- **Done when**: the button's own layout/icon transition is ≤160ms; the content disclosure timing is unchanged.
