# Portfolio Copy Strategy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Execute this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Replace generic portfolio language with concise, proof-led copy for hiring teams and founders while preserving the complete interactive hero and every existing layout.

**Architecture:** Keep all copy in its existing component or project-data source. Add one compact credibility line to the existing Featured Work header, refine the active capability dataset, make CTA language accurately match mail and navigation actions, and rewrite case-study text as factual first-person evidence. Reuse the current metadata and structured-data pipeline so visible copy and machine-readable descriptions remain aligned.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Next.js Metadata API, JSON-LD.

## Global Constraints

- Do not change any copy, component, animation, or timing inside the homepage hero.
- Do not redesign, reorder, or add standalone sections, cards, badges, icons, or interaction patterns.
- Use only the verified claims `7+ years` and `50+ projects` plus existing project metrics.
- Preserve project titles, clients, roles, dates, timelines, tags, media, and verified metrics.
- Keep replacement copy close enough to current length to preserve responsive wrapping.
- Do not invent research, stakeholders, responsibilities, awards, launches, or business outcomes.
- Structured data must match visible factual content.

---

### Task 1: Add proof and sharpen discovery copy

**Files:**
- Modify: `app/page.tsx:735-770`
- Modify: `app/work/page.tsx:107-118`
- Modify: `lib/site.ts:1-22`
- Modify: `app/work/layout.tsx:8-10`

**Interfaces:**
- Consumes: existing Featured Work header, work archive header, and metadata constants.
- Produces: visible credibility proof and descriptions reused by Metadata and JSON-LD.

- [x] **Step 1: Record the protected hero checksum**

Run:

```bash
git show HEAD:app/page.tsx | sed -n '657,731p' | shasum -a 256
```

Expected:

```text
1152ea2fc6ebc70e6c71301123ad4bf3552ab85e21a3a4f029be8119cc36076d
```

- [x] **Step 2: Add the credibility line to the existing Featured Work header**

Keep the current `h2` and add this sibling inside the same header container:

```tsx
<p className="mt-3 font-sans text-sm md:text-base text-foreground/60 tracking-tight">
  7+ years across brand, web &amp; motion <span aria-hidden="true">·</span> 50+ projects delivered
</p>
```

- [x] **Step 3: Replace the work archive headline**

Use:

```tsx
Selected Work Across <br className="hidden sm:inline" />
<span className="italic font-normal text-foreground/90">Brand, Web &amp; Motion.</span>
```

- [x] **Step 4: Update site and work metadata descriptions**

Set `SITE_DESCRIPTION` to:

```ts
"Portfolio of Shubham Shinde, a Pune-based brand, web and motion designer with 7+ years of experience across 50+ projects for founders and creative teams."
```

Set the work archive description to:

```ts
"Selected brand identity, web, motion, and creative direction work by Shubham Shinde, a Pune-based multidisciplinary designer with 7+ years of experience."
```

- [x] **Step 5: Verify proof and protected hero**

Run:

```bash
sed -n '657,731p' app/page.tsx | shasum -a 256
rg -n "7\+ years|50\+ projects|Selected Work Across" app/page.tsx app/work/page.tsx lib/site.ts app/work/layout.tsx
```

Expected: the checksum remains `1152ea2f...36076d`, and every proof claim is one of the two approved facts.

### Task 2: Rewrite active capabilities and conversion CTAs

**Files:**
- Modify: `components/services/ExpertisePillar.tsx:22-86`
- Modify: `components/services/ExpertiseCTA.tsx:27-88`
- Modify: `components/ProjectCTA.tsx:36-105`
- Modify: `components/Footer.tsx:394-520`
- Modify: `app/work/[slug]/page.tsx:152-161`

**Interfaces:**
- Consumes: `EXPERTISE_ITEMS`, existing mail actions, next-project route, footer structure, and gallery toggle.
- Produces: proof-led capability labels and CTAs whose wording matches their actual action.

- [x] **Step 1: Replace the six active capability records**

Use these title/category/overview combinations while retaining existing colors and gradients:

```ts
[
  ["Brand Identity", "Identity Systems", "Distinctive identity systems built to be recognized, remembered, and used across every touchpoint."],
  ["Website Design", "Digital Experiences", "Editorial, responsive websites where story, usability, and expression work as one."],
  ["Creative Direction", "Direction & Systems", "One clear creative idea carried from positioning through campaigns, products, and launch."],
  ["Motion Design", "Motion & Interaction", "Motion systems that add meaning, rhythm, and recall without getting in the way."],
  ["No-Code Development", "Design to Launch", "High-fidelity websites built and shipped with scalable CMS foundations and responsive performance."],
  ["AI Experiences", "Human-Centered AI", "Practical AI interfaces and workflows shaped around real user needs, clear feedback, and useful outcomes."]
]
```

Replace unsupported capability stats with qualitative proof such as `Strategy to Guidelines • Built to Scale`, `From Figma to Launch • Responsive by Design`, and `Useful by Design • Human in the Loop`. Replace synthetic terms including `Brand Bible`, `Dark Mode Matrix`, `Scroll Hijacking`, and `State of the Art` with plain capability names.

- [x] **Step 2: Rewrite the expertise CTA**

Remove the decorative `INITIATE ENGAGEMENT` row. Use:

```tsx
<h3>Building a team or building a brand? Let&rsquo;s talk.</h3>
```

Keep `Start a Conversation` as the primary mail CTA. Replace the dated availability line with:

```text
Available for select projects and roles • Remote & worldwide
```

- [x] **Step 3: Rewrite the case-study closing CTA**

Use:

```text
Available for select projects and roles
Need a designer who can carry an idea from direction to delivery?
I work with founders and creative teams across brand identity, web, motion, and launch.
Discuss a project
Copy email
More work
View next project
```

Change the mail subject from `Project Discovery Call` to `Portfolio enquiry` so the action does not imply a calendar booking.

- [x] **Step 4: Rewrite the footer conversion copy**

Use the headline:

```tsx
Building a team or <br className="hidden sm:inline" />
building a brand? <br className="hidden sm:inline" />
<span className="italic font-light">Let&rsquo;s talk.</span>
```

Change footer actions to `Start a conversation` and `Email Shubham`. Replace `Working with clients worldwide` with `Based in Pune · Working worldwide`. Update the copyright role to `Brand, web & motion designer.` Preserve the authored Studio Notes.

- [x] **Step 5: Simplify the gallery control label**

Replace `🎛️ Curator Studio Mode` with `Gallery Mode`; retain its state indicator and behavior.

- [x] **Step 6: Audit CTA/action consistency**

Run:

```bash
rg -n "INITIATE ENGAGEMENT|digital excellence|next chapter|Book a 30-Min|Q3 / Q4|Curator Studio Mode|State of the Art|Scroll Hijacking|Brand Bible|Dark Mode Matrix" app components
```

Expected: no matches in production copy.

### Task 3: Rewrite case studies as factual evidence

**Files:**
- Modify: `data/projects.ts:25-335`
- Modify: `lib/site.ts:17-24`

**Interfaces:**
- Consumes: the existing `DetailedProject` shape and verified project facts.
- Produces: visible case-study introductions and the source text for route metadata and CreativeWork JSON-LD.

- [x] **Step 1: Rewrite each subtitle and overview**

Use these summaries:

```ts
{
  "daulat-finvest": {
    subtitle: "Designing a clearer digital wealth experience for portfolio tracking, advisory, and investor communication.",
    overview: "Daulat Finvest was moving from traditional private wealth management toward a digital-first platform. As Lead Product & Design Architect, I shaped a clearer experience for viewing assets, understanding performance, and staying connected with advisors."
  },
  "solaris": {
    subtitle: "Building a distinctive fintech identity across brand, 3D, digital, and investor communications.",
    overview: "Solaris needed a distinct identity in a fintech category dominated by familiar visual conventions. As Lead Brand Designer and Creative Director, I built a system around crystalline forms, solar geometry, warm light, and editorial typography across 45+ brand assets."
  },
  "optiv": {
    subtitle: "Creating a scalable identity system across logo, digital, physical, and campaign touchpoints.",
    overview: "Optiv needed an identity that could make complex technology feel clear and approachable. As Lead Brand and Logo Designer, I developed the core mark, visual system, and applications across 16+ digital and physical touchpoints."
  },
  "studio-vistara": {
    subtitle: "Translating an architecture studio's spatial sensibility into a tactile, adaptable identity.",
    overview: "Studio Vistara needed an identity that reflected its balance of structure, materiality, and calm. As Lead Brand and Identity Designer, I created a geometric monogram, editorial type system, earth-led palette, and applications across 15+ touchpoints."
  }
}
```

- [x] **Step 2: Rewrite chapter text without adding facts**

For every chapter, replace inflated language with first-person design decisions. Keep these content rules:

```text
Problem: one sentence explaining the design constraint.
Contribution: one sentence beginning with “I” where the existing role supports ownership.
System: one sentence describing how the solution extends across listed deliverables.
Outcome: use only an existing metric from the same project record.
```

Remove unsupported standalone claims including `99.2% client retention`, `72% reduced task time`, `60fps`, `cryptographic verification`, and `high-converting` unless represented by an approved project metric. Preserve the existing top-level metrics shown on cards.

- [x] **Step 3: Simplify gallery captions**

Make captions literal descriptions of the image. Remove inflated modifiers including `comprehensive`, `high-impact`, `holistic`, `bespoke`, `future horizon`, `state-of-the-art`, and `ultra-clean` where they do not identify visible content.

- [x] **Step 4: Align route descriptions with visible project copy**

Change `projectSeoDescription` to consume `brand`, `role`, and `subtitle`, returning:

```ts
return `${project.brand} case study by Shubham Shinde, ${project.role}. ${project.subtitle}`;
```

The existing route layout and CreativeWork JSON-LD will then share the same factual description.

- [x] **Step 5: Audit unverifiable and cliché language**

Run:

```bash
rg -ni "99\.2%|72%|60fps|cryptographic|high-converting|state-of-the-art|digital excellence|next chapter|transformative solutions|elevate your brand|cutting-edge|seamless experiences|future horizon" data app components lib
```

Expected: no unapproved claims or prohibited cliché phrases in production copy.

### Task 4: Validate, commit, and publish

**Files:**
- Modify: `docs/superpowers/plans/2026-07-13-portfolio-copy-strategy.md` checkboxes only.

**Interfaces:**
- Consumes: all copy changes from Tasks 1-3.
- Produces: a verified Git commit on `main` and synchronized `origin/main`.

- [x] **Step 1: Review the complete diff**

Run:

```bash
git diff --check
git diff --stat
git diff -- app/page.tsx app/work/page.tsx components/services/ExpertisePillar.tsx components/services/ExpertiseCTA.tsx components/ProjectCTA.tsx components/Footer.tsx app/work/[slug]/page.tsx data/projects.ts lib/site.ts app/work/layout.tsx
```

Expected: copy-only changes plus the single credibility line; no hero, layout, animation, or interaction logic changes.

- [x] **Step 2: Run static validation**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit successfully and all routes compile.

- [x] **Step 3: Verify responsive rendering**

Test `/`, `/work`, and `/work/solaris` at 320×568, 375×812, 768×1024, and 1280×800. Confirm no horizontal overflow, broken headings, hidden CTA text, or changed hero copy.

- [x] **Step 4: Commit implementation**

Run:

```bash
git add app/page.tsx app/work/page.tsx app/work/layout.tsx app/work/[slug]/page.tsx components/services/ExpertisePillar.tsx components/services/ExpertiseCTA.tsx components/ProjectCTA.tsx components/Footer.tsx data/projects.ts lib/site.ts docs/superpowers/plans/2026-07-13-portfolio-copy-strategy.md
git commit -m "feat: sharpen portfolio positioning and proof"
```

- [x] **Step 5: Push main**

Run:

```bash
git push origin main
```

Expected: `main -> main`, followed by `git status -sb` showing `main...origin/main` with no ahead/behind count.
