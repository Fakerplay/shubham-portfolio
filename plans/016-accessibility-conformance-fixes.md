# 016 — Accessibility Conformance Fixes

- **Status**: TODO
- **Commit**: ff4d0d3
- **Severity**: HIGH (accessibility compliance)
- **Category**: accessible names & semantics
- **Estimated scope**: 5 files, targeted accessibility tags

## Problem

1. **Header.tsx** renders two separate navigation bars (desktop menu and mobile bottom dock), but neither uses distinct accessible labels (`aria-label`), which triggers duplicate landmark errors on screen readers.
2. **ThemeDropdown.tsx** opens a selection card, but the trigger button does not communicate its state (`aria-expanded`) or menu role to screen readers.
3. Interactive buttons containing explicit `aria-label` tags (sound mute toggle, theme lamp button, copy email feedback, and local time block) do not hide their decorative nested SVG icons, which leads screen readers to parse raw vector paths.
4. **app/work/page.tsx** features interactive project filter buttons that behave as selector tabs but do not communicate active/selected states to screen readers using ARIA role and selection patterns.

## Target

### 1. Header Navigation Landmarks & sound SVGs
```tsx
// components/Header.tsx — target (Desktop Nav)
<nav 
  aria-label="Main Navigation"
  className="hidden md:flex relative ..."
>
```
And:
```tsx
// components/Header.tsx — target (Mobile Nav)
<nav 
  aria-label="Mobile Navigation"
  className="relative bg-zinc-900 ..."
>
```
And:
```tsx
// components/Header.tsx — target (Mute toggles)
<button
  onClick={toggleMute}
  aria-label={isMuted ? "Enable sound" : "Disable sound"}
  ...
>
  {isMuted ? (
    <svg aria-hidden="true" width="16" height="16" ...>
  ) : (
    <svg aria-hidden="true" width="16" height="16" ...>
  )}
</button>
```

### 2. ThemeDropdown popover states
```tsx
// components/ThemeDropdown.tsx — target
<button
  onClick={() => setIsOpen(!isOpen)}
  aria-expanded={isOpen}
  aria-haspopup="true"
  className="flex items-center justify-between w-[125px] ..."
>
```

### 3. ThemeLamp & Footer SVG hiding
```tsx
// components/ThemeLamp.tsx — target
<button
  onClick={handleToggle}
  aria-label={isNight ? "Turn on lights (Day)" : "Turn off lights (Night)"}
  ...
>
  <svg
    aria-hidden="true"
    width="28"
    height="36"
    ...
  >
```
And:
```tsx
// components/Footer.tsx — target (Email links)
<a
  href={`mailto:${email}`}
  ...
>
  <span>Start a conversation</span>
  <svg 
    aria-hidden="true"
    className="w-4 h-4 text-current ..." 
    ...
  >
```

### 4. Work categories tab-roles
```tsx
// app/work/page.tsx — target
<div role="tablist" aria-label="Project categories" className="flex flex-wrap items-center gap-2 pt-6 border-t border-foreground/10">
  {CATEGORIES.map((cat) => {
    const isActive = activeTab === cat;
    return (
      <button
        key={cat}
        role="tab"
        aria-selected={isActive}
        onClick={() => setActiveTab(cat)}
        className="..."
      >
        {cat}
      </button>
    );
  })}
</div>
```

## Steps

1. **Header Navigation**: In [Header.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/Header.tsx), add `aria-label="Main Navigation"` to the desktop `<nav>` and `aria-label="Mobile Navigation"` to the mobile `<nav>`. Add `aria-hidden="true"` to both SVGs inside the sound button.
2. **ThemeDropdown expandables**: In [ThemeDropdown.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/ThemeDropdown.tsx), add `aria-expanded={isOpen}` and `aria-haspopup="true"` to the trigger `<button>`.
3. **SVG Hiding in Lamp/Footer**: In [ThemeLamp.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/ThemeLamp.tsx) and [Footer.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/Footer.tsx), add `aria-hidden="true"` to decorative icon SVGs.
4. **Work Tab Roles**: In [work/page.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/app/work/page.tsx), add `role="tablist"` to the category filters container, and `role="tab"` + `aria-selected={isActive}` to each filter button.

## Verification

- **Mechanical**: `npm run build && npm run lint` compiles cleanly.
- **Feel check**: Navigate the site via tab keys. Verify focus outlines highlight correctly, and semantic tags present clear roles/states in page code.
