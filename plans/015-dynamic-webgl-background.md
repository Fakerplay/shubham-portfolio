# 015 — Dynamically import WebGL LightLeakBackground

- **Status**: TODO
- **Commit**: aacbfa1
- **Severity**: HIGH (performance optimization)
- **Category**: Bundle size optimization
- **Estimated scope**: 1 file, very targeted edit

## Problem

The `LightLeakBackground` component renders a full-screen canvas using complex raw WebGL scripts and fragment shaders. Currently, it is imported statically in `app/layout.tsx`:
```tsx
import LightLeakBackground from '@/components/LightLeakBackground'
```
Because of this static import, Next.js compiles the entire WebGL and canvas render logic into the primary initial bundle. This blocks core text rendering and page hydration, delaying Largest Contentful Paint (LCP) and Time to Interactive (TTI).

## Target

```tsx
// app/layout.tsx — target
import dynamic from 'next/dynamic'

const LightLeakBackground = dynamic(
  () => import('@/components/LightLeakBackground'),
  { ssr: false }
)
```

## Steps

1. In [layout.tsx](file:///Users/shubhamshinde/Documents/shubham-portfolio/app/layout.tsx#L5), replace the static import of `LightLeakBackground` with a dynamic import with `ssr: false`.

## Verification

- **Mechanical**: `npm run build && npm run lint` compiles cleanly.
- **Feel check**: Verify that the portfolio loads instantly, page text elements render without blocking, and the background WebGL canvas mounts and animates smoothly in the background.
