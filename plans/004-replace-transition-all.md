# 004 — Replace `transition-all` with explicit properties sitewide

- **Status**: TODO
- **Commit**: fcd47cc
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: ~9 files, ~40 class-string edits

## Problem

`transition-all` (Tailwind's `transition-property: all`) appears in ~40 places across the live-rendered part of the app. AUDIT.md: "`transition: all` animates unintended properties off-GPU — always a finding." A representative sample (full list to fix is every occurrence found in step 1 below):

```tsx
// components/Header.tsx:175 — current
className={`w-1 h-3 rounded-full transition-all duration-300 ${...}`}
```

```tsx
// components/Footer.tsx:397 — current
className="px-8 py-4 sm:py-4.5 rounded-full bg-foreground text-background font-sans font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] cursor-pointer flex items-center gap-3 shadow-md"
```

```tsx
// app/page.tsx:75 — current (worst case: bundles a multi-layer box-shadow change under "all")
className="group inline-flex items-center px-4 py-1 rounded-full border border-foreground/15 bg-foreground/[0.05] text-foreground/80 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 align-baseline leading-none select-none mx-1.5 cursor-pointer relative -top-[0.02em] transition-all duration-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),_0_3px_6px_rgba(0,0,0,0.3)]"
```

## Target

Replace `transition-all` with a Tailwind arbitrary property list naming exactly what changes on hover/state in that element. General rule: if the hover/active class changes `background`/`border`/`text` colors only, use `transition-colors`; if it changes `transform` (`translate`/`scale`/`rotate`) only, use `transition-transform`; if it changes both plus `box-shadow`/`opacity`, use an explicit property list.

```tsx
// components/Header.tsx:175 — target (color + transform via arbitrary property list, since it toggles a background-color + shadow class)
className={`w-1 h-3 rounded-full transition-[background-color,box-shadow] duration-300 ${...}`}
```

```tsx
// components/Footer.tsx:397 — target (transform + shadow)
className="px-8 py-4 sm:py-4.5 rounded-full bg-foreground text-background font-sans font-semibold text-sm sm:text-base tracking-wide transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] cursor-pointer flex items-center gap-3 shadow-md"
```

```tsx
// app/page.tsx:75 — target (color + shadow, since hover changes text/bg color and box-shadow)
className="group inline-flex items-center px-4 py-1 rounded-full border border-foreground/15 bg-foreground/[0.05] text-foreground/80 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 align-baseline leading-none select-none mx-1.5 cursor-pointer relative -top-[0.02em] transition-[color,background-color,border-color,box-shadow] duration-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),_0_3px_6px_rgba(0,0,0,0.3)]"
```

## Repo conventions to follow

- The codebase already uses Tailwind's single-property transition utilities correctly in many places (e.g. `transition-colors`, `transition-opacity`, `transition-transform` appear throughout) — match that existing convention; only use the arbitrary `transition-[a,b]` syntax when more than one property genuinely changes together.

## Steps

1. Run `grep -rn "transition-all" app components` (excluding the 9 dead components: `ColorPicker.tsx`, `ProceduralShadowOverlay.tsx`, `TerminalTypewriter.tsx`, `HoverReveal.tsx`, `ExpertisePillar.tsx`, `ExpertiseStack.tsx`, `ServicesAccordion.tsx`, `ServicesGrid.tsx`, `ServicesMarquee.tsx`) to get the authoritative current list — line numbers may have shifted since this plan was written if plans 001-003 landed first.
2. For each match, read the surrounding `hover:`/`active:`/`group-hover:` classes on that element to determine exactly which CSS properties change, then replace `transition-all` with either a single-property Tailwind utility (`transition-colors`, `transition-transform`, `transition-opacity`, `transition-shadow`) or an arbitrary `transition-[prop1,prop2]` list.
3. Confirm every replaced element still animates on hover/active/focus by checking the DevTools Elements panel computed `transition-property` value.

## Boundaries

- Do NOT touch the 9 dead components listed above.
- Do NOT change any `duration-*` values, colors, or any other class in this pass — property list only.
- Do NOT add `will-change` anywhere as part of this plan.

## Verification

- **Mechanical**: `grep -rn "transition-all" app components` (excluding dead components) returns nothing; `npx tsc --noEmit` clean (this is a Tailwind class change so type errors are unlikely, but confirm no JSX syntax broke).
- **Feel check**: Hover/click through Header nav, Footer CTAs, ProjectCTA buttons, ExpertiseMatrix/ExpertiseCTA rows, and the `/work` filter tabs — every hover/active effect that existed before (color change, lift, shadow) must still visibly happen exactly as before; nothing should look "frozen" or lose its transition.
- **Done when**: zero `transition-all` remains in live-rendered code and no visual regression on any hover/active state.
