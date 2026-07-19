# 018 — Navbar active status indicator mapping

- **Status**: TODO
- **Commit**: ccabdcc
- **Severity**: HIGH (usability bug)
- **Category**: Interactive states & scroll alignment

## Problem

The header navbar active status indicators (the sliding cap and glowing LED slot) turn completely off when scrolling through the **Experience** section (`#experience`). This occurs because the page sections include `"experience"`, but `navItems` does not map the `"experience"` state to any navigation label. This causes the status indicator to drop its active light, appearing broken or out of sync.

## Target

```tsx
// components/Header.tsx — target
  const navItems = [
    { label: "About", mobileLabel: "About", active: pathname === "/" && activeSection === "about", href: "#about" },
    { label: "Work", mobileLabel: "Work", active: pathname.startsWith("/work") || (pathname === "/" && (activeSection === "work" || activeSection === "experience")), href: "/work" },
    { label: "Capabilities", mobileLabel: "Skills", active: pathname === "/" && (activeSection === "capabilities" || activeSection === "services"), href: "#capabilities" },
    { label: "Contact", mobileLabel: "Contact", active: pathname === "/" && activeSection === "contact", href: "#contact" },
  ];
```

## Steps

1. In [Header.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/components/Header.tsx#L193), update the `"Work"` nav item's `active` property to include `activeSection === "experience"`.

## Verification

- **Mechanical**: `npm run build && npm run lint` compiles cleanly.
- **Feel check**: Scroll the homepage down through the featured projects case studies and the career timeline. Verify that the "Work" navigation item remains active, and the status indicators transition seamlessly without dropping off.
