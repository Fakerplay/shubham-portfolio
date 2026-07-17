# 014 — Add theme control delights, tactile press, and header clean up

- **Status**: TODO
- **Commit**: e664243
- **Severity**: MEDIUM
- **Category**: Missed opportunities & Physicality
- **Estimated scope**: 5 files, targeted animations and minor cleanup

## Problem

1. The theme dropdown opens and collapses with a simple opacity fade and y-offset, missing a corresponding physical scale transition from its anchor origin.
2. The skeuomorphic theme lamp pull-chain string and bead elements are static SVG shapes, missing a tactile "pull-and-spring" visual feedback when clicked.
3. The wobbly hand-drawn home button logo and the about expandable bio button have no press feedback scale.
4. Unused `AnimatePresence` imports are left in `Header.tsx`.

## Target

### 1. ThemeDropdown scale entrance
```tsx
// components/ThemeDropdown.tsx — target
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.96 }}
      transition={{ duration: 0.15, ease: EASE_OUT }}
      style={{ transformOrigin: "top right" }}
      className="absolute right-0 mt-1 w-32 border border-foreground/10 bg-background shadow-none z-50 rounded-none overflow-hidden"
    >
```

### 2. ThemeLamp pull-chain bounce
```tsx
// components/ThemeLamp.tsx — target
<motion.g
  key={isNight ? "night" : "day"}
  initial={{ y: 0 }}
  animate={{ y: [0, 4, -1.5, 0.5, 0] }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  {/* Hanging Pull Chain String (on the right) */}
  <line 
    x1="16.5" 
    y1="18" 
    x2="16.5" 
    y2="28" 
    strokeWidth="1" 
    className="opacity-70"
  />
  {/* Pull Chain weight (circular bead) */}
  <circle 
    cx="16.5" 
    cy="28.5" 
    r="1.5" 
    fill="currentColor" 
    className="opacity-90"
  />
</motion.g>
```

### 3. Tactile click feedback for logo and bio button
```tsx
// components/HandDrawnLogo.tsx — target
<motion.div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  whileHover={reduceMotion ? {} : { scale: 1.05, rotate: 3 }}
  whileTap={reduceMotion ? {} : { scale: 0.96 }}
  className="relative cursor-pointer select-none"
  style={{ width: 58, height: 58 }}
>
```
And:
```tsx
// app/page.tsx — target (expandable bio trigger)
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
  whileTap={reduceMotion ? {} : { scale: 0.96 }}
  transition={{ layout: { duration: 0.16, ease: EASE_OUT } }}
  className="group inline-flex items-center gap-1.5 cursor-pointer font-serif text-2xl md:text-3xl text-foreground/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 rounded-full py-1 px-4 border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.05] bg-foreground/[0.02] shadow-[0_2px_5px_rgba(0,0,0,0.03)] transition-colors duration-300 select-none relative align-baseline leading-none -top-[0.02em]"
>
```

## Steps

1. **ThemeDropdown entrance scale**: In [ThemeDropdown.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/ThemeDropdown.tsx#L80-L84), add `scale: 0.96` to the `initial` and `exit` props.
2. **ThemeLamp pull-chain bounce**: In [ThemeLamp.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/ThemeLamp.tsx#L77-L93), wrap the line and circle elements of the pull chain in `<motion.g>` with dynamic `key` remounting, keyframe offsets, and adjust the button active scale to `active:scale-[0.96]`.
3. **Logo tactile feedback**: In [HandDrawnLogo.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/HandDrawnLogo.tsx#L23-L29), add `whileTap={reduceMotion ? {} : { scale: 0.96 }}`.
4. **Expandable Bio tactile feedback**: In [page.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/app/page.tsx#L306-L320), add `whileTap={reduceMotion ? {} : { scale: 0.96 }}` to the button element.
5. **Header cleanup**: In [Header.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/Header.tsx#L4), remove the unused `AnimatePresence` import.

## Verification

- **Mechanical**: `npm run build && npm run lint` compiles cleanly.
- **Feel check**: 
  - Opening the theme dropdown slides and scales down nicely.
  - Clicking the theme lamp yanks the pull string downwards and bounces back with organic damping.
  - Clicking the sun/moon logo and meeting bio buttons triggers a tactile click press shrink.
