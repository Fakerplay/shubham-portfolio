# 017 — Polish contrast and mobile touch targets

- **Status**: TODO
- **Commit**: c1e08d2
- **Severity**: HIGH (design polish and usability)
- **Category**: Color contrast & Responsive design
- **Estimated scope**: 2 files, targeted CSS class additions

## Problem

1. **ThemeDropdown.tsx** font-toggle item uses `text-foreground/50` opacity for its default state, which falls below WCAG AAA and AA contrast recommendations against the light themed background surfaces (clay, sun, matcha).
2. **Header.tsx** mobile navigation buttons have tight padding boundaries, making their vertical touch targets ~32px, below the recommended 44px threshold.

## Target

### 1. ThemeDropdown Font Toggle Contrast
```tsx
// components/ThemeDropdown.tsx — target
className="w-full text-left px-3 py-2 uppercase tracking-wider transition-colors duration-150 flex items-center justify-between rounded-none text-foreground/70 hover:bg-foreground/5 hover:text-foreground font-semibold text-[10px] cursor-pointer"
```

### 2. Header Mobile Navigation Touch Bounds
```tsx
// components/Header.tsx — target
className={`relative py-2 px-3 rounded-lg flex items-center gap-1.5 active:scale-[0.96] transition-[color,transform] duration-300 font-sans text-[11px] font-medium tracking-normal select-none after:absolute after:-inset-y-2.5 after:inset-x-0 ${
```

## Steps

1. **Contrast Adjustment**: In [ThemeDropdown.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/ThemeDropdown.tsx#L121), change text opacity from `text-foreground/50` to `text-foreground/70`.
2. **Mobile Target Boundary**: In [Header.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/Header.tsx#L336), append `after:absolute after:-inset-y-2.5 after:inset-x-0` to the mobile navigation `<Link>` classes.

## Verification

- **Mechanical**: `npm run build && npm run lint` compiles cleanly.
- **Feel check**: Click dropdown menus and verify font selector labels are highly legible. Navigate using a touch emulator and check that the click boundary extends beyond the top/bottom borders of the mobile buttons.
