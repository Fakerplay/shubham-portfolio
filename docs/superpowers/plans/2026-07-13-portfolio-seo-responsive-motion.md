# Portfolio SEO, Responsive, and Motion Reliability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve technical SEO, copy quality, mobile usability, scroll reliability, and desktop header behavior without changing the portfolio's visual design or structural layout.

**Architecture:** Keep all client-rendered UI components in place. Add server-only route layouts and metadata route files around them, centralize site identity and project SEO data, and treat motion as progressive enhancement so content is visible before JavaScript initializes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion 12, GSAP 3.

## Global Constraints

- Preserve the existing visual design, theme system, typography, cards, navigation appearance, section order, and case-study layout.
- Do not introduce new visual sections, card patterns, icon libraries, or decorative treatments.
- Limit responsive changes to safe spacing, wrapping, overflow prevention, and touch behavior.
- Remove generic eyebrow labels, helper copy, and project-description paragraphs that repeat existing information.
- Retain project names, client names, titles, services, metrics, tags, navigation, personal introduction, and CTAs.
- Content must remain visible if GSAP fails or reduced motion is enabled.

---

### Task 1: Install dependencies and read the bundled Next.js metadata references

**Files:**
- Read: `node_modules/next/dist/docs/`
- Verify: `package-lock.json`

**Interfaces:**
- Consumes: `package.json` and `package-lock.json`.
- Produces: installed local dependencies and confirmed Next.js 16 metadata API contracts.

- [x] **Step 1: Install locked dependencies**

Run: `npm install`

Expected: dependencies install without modifying declared versions.

- [x] **Step 2: Locate and read relevant bundled documentation**

Run: `find node_modules/next/dist/docs -type f | rg 'metadata|robots|sitemap|generateMetadata'`

Read the matching App Router metadata, robots, sitemap, and `generateMetadata` references completely before editing code.

- [x] **Step 3: Confirm a clean baseline**

Run: `npm run lint`

Expected: record existing failures separately from new work.

### Task 2: Add a centralized SEO source of truth and global metadata

**Files:**
- Create: `lib/site.ts`
- Modify: `app/layout.tsx`
- Test: production HTML for `/`

**Interfaces:**
- Produces: `SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`, `SOCIAL_LINKS`, `absoluteUrl(path)`, and global `Metadata` values.
- Consumes: existing public social links and `/images/avatar.jpg`.

- [x] **Step 1: Add site constants**

Create typed constants for the production URL, name, concise description, owner identity, location, social profiles, and default share image. Add `absoluteUrl(path: string): string` using `new URL(path, SITE_URL).toString()`.

- [x] **Step 2: Add global metadata**

Export `metadata: Metadata` from `app/layout.tsx` with `metadataBase`, title default/template, description, authors, creator, publisher, canonical, Open Graph, Twitter, robots preview directives, category, and icons.

- [x] **Step 3: Add homepage JSON-LD**

Render one JSON-LD script in the root layout describing `WebSite`, `ProfilePage`, and `Person`, using only existing identity, discipline, image, and social-profile facts. Serialize with `<` escaped as `\\u003c`.

- [x] **Step 4: Verify homepage metadata**

Build and inspect `/` for a non-empty title, description, canonical, Open Graph image, Twitter card, robots directives, and valid JSON-LD.

### Task 3: Add route-specific metadata, robots, and sitemap

**Files:**
- Create: `app/work/layout.tsx`
- Create: `app/work/[slug]/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Modify: `data/projects.ts`

**Interfaces:**
- Consumes: `DETAILED_PROJECTS` and site constants from `lib/site.ts`.
- Produces: unique archive/case-study metadata and crawlable `/robots.txt` and `/sitemap.xml` endpoints.

- [x] **Step 1: Export a stable project slug list**

Add `PROJECT_SLUGS = Object.keys(DETAILED_PROJECTS)` after the project map so metadata routes share the canonical set of valid work URLs.

- [x] **Step 2: Add work archive metadata**

Export route metadata from `app/work/layout.tsx`, with canonical `/work`, a specific title/description, archive Open Graph URL, and unchanged `{children}` rendering.

- [x] **Step 3: Add case-study metadata generation**

Export `generateMetadata({ params })` from `app/work/[slug]/layout.tsx`. Resolve the project from `DETAILED_PROJECTS`, return `noindex` for unknown slugs, and provide title, description, canonical, Open Graph, Twitter, and `CreativeWork` JSON-LD for valid projects.

- [x] **Step 4: Add robots metadata route**

Return `MetadataRoute.Robots` allowing `/`, disallowing framework internals if needed, and referencing `${SITE_URL}/sitemap.xml`.

- [x] **Step 5: Add sitemap metadata route**

Return homepage, `/work`, and all project routes with stable URL values, reasonable priorities, and change frequencies. Do not invent precise modification dates.

- [x] **Step 6: Verify metadata endpoints**

Confirm `/robots.txt` and `/sitemap.xml` return `200`, and inspect at least `/work/daulat-finvest` and `/work/solaris` metadata.

### Task 4: Distill generic visible copy without changing structure

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/services/ServicesShowcase.tsx`
- Modify: `components/Footer.tsx`
- Inspect: `app/work/page.tsx`, `components/services/*.tsx`

**Interfaces:**
- Produces: concise rendered portfolio copy.
- Preserves: data descriptions for metadata and JSON-LD.

- [x] **Step 1: Remove featured-project blurbs**

Remove the rendered description paragraph from `ProjectCard`, but retain description values in project data for metadata. Remove `description` from the component's destructured visual props only if TypeScript allows the data to continue passing structurally.

- [x] **Step 2: Remove the disciplines eyebrow**

Delete only the `Disciplines & Scope` label and keep the tags and divider treatment.

- [x] **Step 3: Remove repeated expertise eyebrow**

Delete `EXPERTISE / FOCUS` while preserving the `Core Capabilities` heading and section layout.

- [x] **Step 4: Remove footer template copy**

Delete the availability badge and repeated supporting sentence while preserving the contact headline and CTAs.

- [x] **Step 5: Remove comparable helper copy**

Inspect visible uppercase eyebrow/helper phrases. Remove only phrases that restate an adjacent heading or obvious interaction; keep category filters, metrics, navigation, accessibility names, and meaningful labels.

### Task 5: Make homepage motion a progressive enhancement

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css` only if an enhancement selector is required

**Interfaces:**
- Consumes: `prefers-reduced-motion` and GSAP dynamic imports.
- Produces: visible project content before and without GSAP, with the same reveal when GSAP succeeds.

- [x] **Step 1: Add a failure reproduction check**

Load the homepage with JavaScript throttled or scroll immediately to `#work`; confirm current project wrappers can be observed with opacity zero before initialization.

- [x] **Step 2: Remove the server-rendered hidden state**

Remove `opacity-0` from `.featured-project-card` markup.

- [x] **Step 3: Scope GSAP ownership**

Inside the effect, capture a cancellation flag and arrays/context for only the triggers/tweens created by this component. On cleanup, revert/kill only those owned instances.

- [x] **Step 4: Animate only initialized targets**

After successful imports, set the target cards' enhancement start state and create per-card reveal triggers or a batch whose start state is applied only when a card is still below the viewport. Cards already visible remain visible.

- [x] **Step 5: Handle failure and reduced motion**

On import rejection or cancellation, explicitly clear motion-owned inline styles. Reduced-motion users skip all transforms and opacity changes.

- [x] **Step 6: Refresh after setup**

Call `ScrollTrigger.refresh()` after owned triggers are registered, without global trigger destruction.

### Task 6: Harden mobile safe areas and desktop header behavior

**Files:**
- Modify: `components/Header.tsx`
- Modify: `app/globals.css`
- Modify: responsive classes in `app/page.tsx` only when a verified overflow requires it

**Interfaces:**
- Produces: one stable scroll listener, safe mobile content reachability, and unchanged visual navigation.

- [x] **Step 1: Reserve the mobile navigation safe area**

Add a mobile-only custom property for the fixed navigation clearance and apply bottom padding using `calc(clearance + env(safe-area-inset-bottom))`. Reset the extra clearance at the desktop breakpoint.

- [x] **Step 2: Place the nav above device safe areas**

Replace the fixed `bottom-6` assumption with a class that adds `env(safe-area-inset-bottom)` while retaining the same visible 24px offset on devices without a safe-area inset.

- [x] **Step 3: Replace scroll state with refs**

Replace `lastScrollY` state with `lastScrollYRef`, add a small delta threshold, and keep the scroll effect dependency array stable.

- [x] **Step 4: Harden programmatic scrolling**

Store and clear a fallback timer in a ref; release the scrolling guard after the target is near its destination or after a bounded fallback. Clear it on unmount and before a new navigation.

- [x] **Step 5: Verify responsive overflow**

At 320, 375, 390, and 430 pixels, inspect `scrollWidth === clientWidth`. Change only existing wrapping/gap utilities for any confirmed offending element.

### Task 7: Verify production behavior and record the result

**Files:**
- Modify: `docs/superpowers/plans/2026-07-13-portfolio-seo-responsive-motion.md` checkboxes only

**Interfaces:**
- Consumes: all tasks.
- Produces: tested production-ready changes.

- [x] **Step 1: Run static checks**

Run: `npm run lint`

Expected: exit 0, or only documented pre-existing issues with no new violations.

- [x] **Step 2: Run production build**

Run: `npm run build`

Expected: exit 0 with `/`, `/work`, case-study routes, `/robots.txt`, and `/sitemap.xml` generated.

- [x] **Step 3: Test desktop**

Verify at 1280 by 720 and a wider viewport: no blank fast-scroll state, stable header hide/show, working anchor navigation, unchanged visual composition, and no console errors.

- [x] **Step 4: Test mobile**

Verify at 320 by 568, 375 by 812, 390 by 844, and 430 by 932: no horizontal overflow, no fixed-nav collisions, reachable CTAs, and unchanged navigation design.

- [x] **Step 5: Test reduced motion**

Emulate `prefers-reduced-motion: reduce`; confirm all cards and content remain visible with no entrance transforms.

- [x] **Step 6: Inspect the diff**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors and only intended source, metadata, and documentation changes.

- [x] **Step 7: Commit implementation**

Run: `git add app components data lib docs/superpowers/plans && git commit -m "feat: improve portfolio SEO and interaction reliability"`

Expected: one implementation commit after the existing specification commit.
