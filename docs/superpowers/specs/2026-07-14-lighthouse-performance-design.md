# Lighthouse Performance Design

## Goal

Improve mobile Lighthouse performance, accessibility, and best-practice scores without changing the portfolio's visual design, content hierarchy, hero copy, or page structure.

## Approved direction

The site keeps its cinematic videos, animated hero, WebGL light treatment, typography, and existing layouts. Expensive behavior becomes demand-driven instead of starting during the initial page load.

## Media behavior

- Project cards render their existing cover image as a poster.
- Video files use `preload="none"` and receive a source only when they approach the viewport.
- Visible videos play while intersecting and pause when they leave the viewport or the document is hidden.
- Reduced-motion and data-saver users retain the same card composition but see the poster rather than autoplay.
- Next.js image optimization is enabled at an appropriate quality with responsive `sizes` values.

## Rendering and animation

- The WebGL background retains its appearance on capable devices.
- It pauses when the page is hidden, respects reduced motion, and uses a reduced frame cadence on narrow/mobile viewports.
- Client-side services remain deferred below the fold.
- Link prefetching is disabled on repeated project-card links to avoid speculative route payloads during the critical load.

## Fonts and secondary requests

- Exposure variable fonts are converted from TTF to WOFF2 without changing typography.
- The local clock updates once per minute.
- Weather is fetched after the critical load and cached in session storage with a time-to-live.

## Semantics and accessibility

- Pages do not nest `<main>` landmarks inside the root layout.
- Small icon controls receive a minimum 44px interactive area.
- Keyboard focus remains visibly indicated.
- Reduced-motion behavior is available without removing the site's personality for other users.

## Validation

- `npm run lint` and `npm run build` must pass.
- The production bundle must retain all routes and metadata.
- The final commit must exclude the pre-existing `app/mascot-demo/` and `components/PixelMascot.tsx` files.

