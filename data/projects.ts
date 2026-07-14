export interface Chapter {
  number: string;
  title: string;
  subtitle?: string;
  content: string[];
  highlightMetric?: { value: string; label: string; description: string };
  image?: string;
}

export interface DetailedProject {
  slug: string;
  brand: string;
  title: string;
  subtitle: string;
  year?: string;
  liveUrl?: string;
  role: string;
  timeline: string;
  client: string;
  outcome: string;
  image: string;
  video?: string;
  showcaseGallery?: { number: string; filename: string; caption: string }[];
  tags: string[];
  metrics?: { value: string; label: string }[];
  overview?: string;
  context: string;
  challenge: string;
  responsibility: string;
  decision01: { title: string; text: string };
  decision02: { title: string; text: string };
  decision03: { title: string; text: string };
  outcomeDetails: string;
  chapters?: Chapter[];
  nextProject: {
    slug: string;
    brand: string;
    title: string;
  };
}

export const DETAILED_PROJECTS: Record<string, DetailedProject> = {
  "daulat-finvest": {
    slug: "daulat-finvest",
    brand: "Daulat Finvest",
    title: "Wealth management crafted around your portfolio",
    subtitle: "For Daulat, a clearer digital wealth experience for understanding assets, tracking performance, and staying connected with an advisor.",
    liveUrl: "https://daulat.co.in",
    role: "Lead Product & Design Architect",
    timeline: "6 months",
    client: "Daulat Financial Advisory",
    outcome: "Unified digital wealth experience",
    video: "/videos/daulat-cover.mp4",
    image: "/images/project-1-cover.jpg",
    showcaseGallery: [
      { number: "02", filename: "1_Daulat CS.png", caption: "About the Project & Strategic Overview — Varun Fatehpuria Founder & CEO" },
      { number: "03", filename: "2_Daulat CS.png", caption: "Brand Architecture & Editorial Positioning" },
      { number: "04", filename: "2_Daulat CS-1.png", caption: "Multi-Device Responsive Ecosystem & Mobile Experience" },
      { number: "05", filename: "3_Daulat CS.png", caption: "Platform Interface Design & Wealth Tracking Dashboard" },
      { number: "06", filename: "3_Daulat CS-1.png", caption: "High-Density Editorial UI & Financial Metrics" },
      { number: "07", filename: "3_Daulat CS-5.png", caption: "Wireframe Architecture & User Experience Flow" },
      { number: "08", filename: "3_Daulat CS-6.png", caption: "Interactive Advisory Portal & Visual Tokens" },
      { number: "09", filename: "Color.png", caption: "Design System Color Palette" },
      { number: "10", filename: "Frame 2085664055.png", caption: "Typography Scale & Layout Hierarchy" },
      { number: "11", filename: "Frame 2147256860.png", caption: "Micro-Interaction Details & Component Specifications" },
      { number: "12", filename: "Frame 2147257348.png", caption: "Custom Engraved Botanical & Financial Illustrations" },
      { number: "13", filename: "Frame 2147257349.png", caption: "Platform Overview & Client Presentation" },
      { number: "14", filename: "Frame 2147257350.png", caption: "Client Review & Platform Direction" }
    ],
    tags: ["Product design", "Website design", "Design system", "Fintech"],
    context: "Daulat was evolving from relationship-led wealth management into a digital-first advisory platform. The opportunity was to give investors greater visibility and control without losing the confidence of a personal advisor relationship.",
    challenge: "Wealth dashboards often bury important information in dense tables and disconnected views. Daulat needed to make assets, allocation, performance, documents, and advisor communication feel like parts of one understandable experience.",
    responsibility: "As Lead Product & Design Architect, I shaped the experience from information hierarchy and visual direction through responsive interface design, reusable components, and launch-ready touchpoints.",
    decision01: {
      title: "Organizing the experience around investor questions",
      text: "The interface was organized around the questions investors return to most: what do I own, how is it performing, and what should I do next? Clear hierarchy and modular views make detailed financial information easier to scan without flattening its meaning."
    },
    decision02: {
      title: "Designing trust through consistency",
      text: "In wealth management, trust is reinforced by predictable behavior and careful handling of detail. Typography, spacing, data states, and interaction patterns follow the same logic across portfolio views, planning tools, documents, and advisor communication."
    },
    decision03: {
      title: "Building one system across devices",
      text: "The design language connects the public website, desktop platform, and mobile experience. Editorial typography and custom botanical illustrations bring warmth to the brand, while the component system keeps sensitive product interactions calm and precise."
    },
    outcomeDetails: "The result is a unified digital wealth experience that gives Daulat a clearer way to present its advisory model across marketing, portfolio tracking, and ongoing investor communication.",
    nextProject: {
      slug: "solaris",
      brand: "Solaris",
      title: "Solaris: Fintech Branding & Creative Direction"
    }
  },
  "solaris": {
    slug: "solaris",
    brand: "Solaris",
    title: "A fintech identity shaped by light, precision, and possibility",
    subtitle: "For Solaris, a distinctive brand and visual system spanning identity, 3D imagery, digital products, campaigns, and investor communication.",
    year: "2024 - 2025",
    role: "Lead Brand Designer & Creative Director",
    timeline: "4 months",
    client: "Solaris Financial Technologies",
    outcome: "Unified brand-to-product visual system",
    video: "/videos/solaris-2.mp4",
    image: "/images/solaris-cover.png",
    showcaseGallery: [
      { number: "02", filename: "Bento.png", caption: "Solaris Brand Architecture & Ecosystem Bento Grid" },
      { number: "03", filename: "ID Card 2.png", caption: "Executive Identification System & Holographic Security Pass" },
      { number: "04", filename: "Solaris_ID.png", caption: "Biometric Employee Credentials & Digital Touchpoints" },
      { number: "05", filename: "asset.png", caption: "Core 3D Glass Prism Asset & Refracted Amber Lighting" },
      { number: "06", filename: "Solaris 7.png", caption: "Institutional Advisory Dashboard & Wealth Tracking UI" },
      { number: "07", filename: "Solaris 8.png", caption: "Financial Analytics & Asset Allocation Interface" },
      { number: "08", filename: "Solaris 9.png", caption: "Micro-Interaction Details & Custom Iconography System" },
      { number: "09", filename: "Solaris 10.png", caption: "Multi-Platform Editorial Interface & Dark Mode UI Spread" },
      { number: "10", filename: "Solaris 11.png", caption: "Platform Overview & Multi-Device Experience" },
      { number: "11", filename: "Solaris 12.png", caption: "Interactive Advisory Portal & Real-Time Portfolio Performance" },
      { number: "12", filename: "Solaris 13.png", caption: "Account Verification & Security Interface" },
      { number: "13", filename: "Solaris 15.png", caption: "Visual Design Tokens & Typography Scale" },
      { number: "14", filename: "Solaris 16.png", caption: "Component Library & Interactive Form Elements" },
      { number: "15", filename: "Solaris 17.png", caption: "Mobile Wealth Management Experience & Gesture Navigation" },
      { number: "16", filename: "Solaris 21.png", caption: "Marketing Campaign Spread & Digital Brand Rollout" },
      { number: "17", filename: "Solaris 22.png", caption: "Investor Deck Presentation & Visual Storytelling" },
      { number: "18", filename: "Solaris 27.png", caption: "Holographic Spatial Interface Concept" },
      { number: "19", filename: "02-full.jpg", caption: "Full-Spread Brand Master Overview & Visual Summary" },
      { number: "20", filename: "02-portrait-left.jpg", caption: "Mobile Portrait Touchpoint & Compact Editorial Card" }
    ],
    tags: ["Brand identity", "Creative direction", "3D visuals", "Digital experience"],
    context: "Solaris was entering a fintech category filled with familiar gradients, abstract networks, and interchangeable claims of innovation. It needed an identity that could feel credible in financial contexts while remaining unmistakably its own.",
    challenge: "The system had to explain sophisticated financial technology across product interfaces, investor material, campaigns, and internal touchpoints. Every application needed to feel connected without relying on a single logo or campaign image.",
    responsibility: "As Lead Brand Designer and Creative Director, I developed the core visual idea and carried it through identity, 3D art direction, typography, digital interfaces, campaign assets, and investor communication.",
    decision01: {
      title: "Creating an ownable visual metaphor",
      text: "Crystalline forms, solar geometry, and refracted amber light became a visual language for transparency, movement, and value. The idea is recognizable enough to build memory, but flexible enough to support product, campaign, and presentation needs."
    },
    decision02: {
      title: "Balancing expression with financial credibility",
      text: "Expressive serif typography and luminous 3D imagery give Solaris presence. A restrained sans-serif system, controlled spacing, and precise interface patterns provide the clarity required for institutional and product communication."
    },
    decision03: {
      title: "Designing a system, not a campaign look",
      text: "The direction was applied across identity assets, employee credentials, dashboards, mobile views, verification flows, campaign material, and investor decks. Shared tokens and component rules allow the brand to remain coherent as the context changes."
    },
    outcomeDetails: "The result is a coordinated visual system that moves between brand storytelling, product experience, campaigns, and investor communication without losing its signature.",
    nextProject: {
      slug: "optiv",
      brand: "Optiv",
      title: "Optiv: Branding and Logo Design"
    }
  },
  "optiv": {
    slug: "optiv",
    brand: "Optiv",
    title: "Making complex technology feel clear and approachable",
    subtitle: "For Optiv, a scalable identity built to remain recognizable across digital interfaces, physical applications, and campaign touchpoints.",
    year: "2025",
    role: "Lead Brand & Logo Designer",
    timeline: "3 months",
    client: "Optiv Technologies",
    outcome: "Scalable cross-channel identity system",
    video: "/videos/Cover_Optiv_1080.mp4",
    image: "/images/optiv/About.png",
    showcaseGallery: [
      { number: "02", filename: "Optiv 1.png", caption: "Optiv Core Brand Mark & Primary Architectural Logo Exploration" },
      { number: "03", filename: "ID.png", caption: "Biometric Security Badges & Corporate Identification Card Ecosystem" },
      { number: "04", filename: "Color.png", caption: "Brand Color Palette & Contrast System" },
      { number: "05", filename: "Creative.png", caption: "Creative Direction & Visual Token Applications Across Digital Touchpoints" },
      { number: "06", filename: "Mockup.png", caption: "Tactile Hardware & Physical Brand Collateral Mockups" },
      { number: "07", filename: "Poster.png", caption: "Brand Campaign Poster & Editorial Typography" },
      { number: "08", filename: "About.png", caption: "Brand Overview & Positioning" },
      { number: "09", filename: "Web.png", caption: "Responsive Digital Portal & Main Web Interface Experience" },
      { number: "10", filename: "Web-1.png", caption: "Editorial Web Dashboard & Interactive UI Tokens" },
      { number: "11", filename: "Web-2.png", caption: "Mobile Experience & Adaptive Interface Components" },
      { number: "12", filename: "Web-3.png", caption: "Web Experience & Design System Guidelines" },
      { number: "13", filename: "Optiv 2.png", caption: "Logo Construction Grid & Geometric Proportion Guidelines" },
      { number: "14", filename: "Optiv 3.png", caption: "Monochrome & Reverse Contrast Logo Variations" },
      { number: "15", filename: "Optiv 4.png", caption: "Typography Hierarchy & Custom Letterform Details" },
      { number: "16", filename: "Optiv 5.png", caption: "Iconography System & Micro-Illustrations" },
      { number: "17", filename: "Optiv 6.png", caption: "Brand System Overview & Application Roadmap" }
    ],
    tags: ["Brand identity", "Logo design", "Visual system", "Creative direction"],
    context: "Optiv needed an identity that could represent complex technology without feeling cold or over-engineered. The brand had to work as confidently in a small digital avatar as it did across portals, credentials, physical collateral, and campaigns.",
    challenge: "A technology identity can quickly become generic when it depends on familiar symbols or visual effects. Optiv needed a simple, ownable foundation with enough structure to support a growing range of applications.",
    responsibility: "As Lead Brand and Logo Designer, I created the core mark, construction logic, typography, color system, iconography, and application rules across digital and physical touchpoints.",
    decision01: {
      title: "Building recognition into the mark",
      text: "The symbol was constructed on a controlled geometric grid so its proportions remain clear at different scales. Monochrome and reverse versions preserve recognition when color, space, or production methods are limited."
    },
    decision02: {
      title: "Extending the identity beyond the logo",
      text: "Typography, contrast, iconography, and layout rules give the brand a consistent voice even when the mark is not dominant. This turns the identity into a usable system rather than a collection of branded mockups."
    },
    decision03: {
      title: "Connecting physical and digital applications",
      text: "The same visual logic carries through employee credentials, hardware concepts, campaign posters, responsive portals, and interface components. Each touchpoint feels appropriate to its context while remaining recognizably Optiv."
    },
    outcomeDetails: "The final identity gives Optiv a consistent foundation for product, internal, physical, and marketing communication while remaining recognizable across formats and scales.",
    nextProject: {
      slug: "studio-vistara",
      brand: "Studio Vistara",
      title: "Studio Vistara: Branding"
    }
  },
  "studio-vistara": {
    slug: "studio-vistara",
    brand: "Studio Vistara",
    title: "An architectural identity built from structure, material, and calm",
    subtitle: "For Studio Vistara, translating an architecture studio's spatial sensibility into a tactile identity across print, presentation, and digital formats.",
    year: "2025 - Present",
    role: "Lead Brand & Identity Designer",
    timeline: "3 months",
    client: "Studio Vistara Architecture & Interiors",
    outcome: "Cohesive tactile and digital identity",
    video: "/videos/studio-vistara-1.mp4",
    image: "/images/studio-vistara-cover.png",
    showcaseGallery: [
      { number: "02", filename: "Intro_slide.png", caption: "Studio Vistara Brand Philosophy & Core Visual Foundations" },
      { number: "03", filename: "Project_About.png", caption: "Architectural Positioning & Brand Identity Strategy Overview" },
      { number: "04", filename: "Logo_2.png", caption: "Geometric Monogram & Primary Architectural Logo System" },
      { number: "05", filename: "Mark.png", caption: "Emblem Construction Grid & Proportions" },
      { number: "06", filename: "Color_Palette.png", caption: "Curated Earth & Stone Color Palette Contrast Tokens" },
      { number: "07", filename: "Typo_1.png", caption: "Editorial Typography Scale & Primary Serif Specification" },
      { number: "08", filename: "Typo_1_1.png", caption: "Secondary Sans-Serif Pairing & Hierarchy Rules" },
      { number: "09", filename: "Typo_2.png", caption: "Typeface Micro-Details & Custom Letterform Details" },
      { number: "10", filename: "Stationery.png", caption: "Tactile Embossed Business Cards & Corporate Stationery Spread" },
      { number: "11", filename: "Poster.png", caption: "Large-Format Brand Exhibition Poster Spread" },
      { number: "12", filename: "Poster_2.png", caption: "Minimalist Editorial Campaign Poster Exploration" },
      { number: "13", filename: "Social_Media.png", caption: "Digital Social Media Assets & Editorial Grid Templates" },
      { number: "14", filename: "Social_Media_1.png", caption: "Multi-Platform Storytelling & Social Campaign Rollout" },
      { number: "15", filename: "Collage.png", caption: "Brand Overview Across Key Touchpoints" },
      { number: "16", filename: "Studio_Vistara.png", caption: "Brand System Summary & Direction" },
      { number: "17", filename: "Frame_1216221521.png", caption: "Digital Identity Guidelines & UI Component Tokens" }
    ],
    tags: ["Brand identity", "Typography system", "Stationery", "Creative direction"],
    context: "Studio Vistara's work balances disciplined structure with warmth, texture, and material sensitivity. Its identity needed to express that duality without relying on predictable architectural imagery.",
    challenge: "The mark had to feel architectural without becoming rigid or impersonal. The wider system also needed enough flexibility for tactile stationery, exhibition material, presentations, and everyday digital communication.",
    responsibility: "As Lead Brand and Identity Designer, I developed the monogram, construction system, typography, earth-led palette, print direction, and adaptable editorial layouts.",
    decision01: {
      title: "Translating spatial thinking into a mark",
      text: "The monogram uses clear geometry and balanced proportions to create a compact architectural signature. Its structure gives the studio recognition without depicting a building or reducing the practice to a familiar industry symbol."
    },
    decision02: {
      title: "Using material as part of the identity",
      text: "A palette drawn from stone, terracotta, and warm alabaster reflects the studio's relationship with natural materials. Embossing, textured stocks, and restrained print details turn the visual system into a tactile extension of the practice."
    },
    decision03: {
      title: "Creating an editorial rhythm",
      text: "Expressive serif headlines are paired with a clean sans-serif system to balance character with clarity. Consistent hierarchy and grid rules organize proposals, posters, social templates, and presentations while leaving room for architectural imagery."
    },
    outcomeDetails: "The identity gives Studio Vistara a coherent system for presenting its work across physical, editorial, and digital settings while retaining the material sensitivity of the practice.",
    nextProject: {
      slug: "solace",
      brand: "Solace",
      title: "Solace: Branding and Identity Design"
    }
  },
  "solace": {
    slug: "solace",
    brand: "Solace",
    title: "Quiet confidence for a modern wellness brand",
    subtitle: "For Solace, a restrained identity and packaging system built around editorial typography, tactile materials, and a calmer expression of premium wellness.",
    year: "2025",
    role: "Lead Brand & Packaging Designer",
    timeline: "3 months",
    client: "Solace Lifestyle & Wellness Co.",
    outcome: "Scalable packaging and brand system",
    image: "/images/solace/Solace Cover.png",
    showcaseGallery: [
      { number: "02", filename: "Solace Main Cover.png", caption: "Solace Core Visual Emblem & Brand Identity Concept" },
      { number: "03", filename: "Solace Main Cover-1.png", caption: "Premium Product Packaging & Design Language Application" },
      { number: "04", filename: "Solace Main Cover-2.png", caption: "Editorial Typography Grid & Curated Lifestyle Storyboard" },
      { number: "05", filename: "Solace Main Cover-3.png", caption: "Social Media Storytelling Layout & Visual Asset Collection" },
      { number: "06", filename: "Solace Main Cover-4.png", caption: "Holistic Design Guidelines & Future Horizon Rollout" }
    ],
    tags: ["Brand identity", "Packaging design", "Creative direction", "Visual system"],
    context: "Solace needed to communicate calm and premium quality in a wellness category crowded with soft gradients, botanical motifs, and interchangeable ideas of self-care. The brand required a quieter and more disciplined point of view.",
    challenge: "The identity had to feel organic without becoming rustic, and luxurious without becoming decorative. It also needed to work across packaging, print, digital storefronts, campaigns, and social storytelling.",
    responsibility: "As Lead Brand and Packaging Designer, I shaped the visual direction across typography, emblem design, layout, packaging concepts, material expression, digital applications, and guidelines.",
    decision01: {
      title: "Treating restraint as the luxury signal",
      text: "Spacious compositions, fine-ruled grids, and high-contrast typography create presence without visual noise. The system uses proportion and pacing—not decoration—to communicate confidence and care."
    },
    decision02: {
      title: "Bringing the brand into physical form",
      text: "Glass forms, textured cardstock, blind debossing, and restrained labels extend the identity into packaging. Each material decision supports the same sense of calm established by the typography and layout system."
    },
    decision03: {
      title: "Creating rules for a growing brand",
      text: "Typography, image treatment, spacing, and grid guidance allow Solace to move from packaging into storefronts, campaigns, and social formats without losing its voice. The rules provide consistency while leaving enough flexibility for new products and stories."
    },
    outcomeDetails: "The project established a shared visual language for packaging, print, digital commerce, and brand communication, giving Solace a consistent foundation for future products and stories.",
    nextProject: {
      slug: "daulat-finvest",
      brand: "Daulat Finvest",
      title: "Wealth management crafted around your portfolio"
    }
  }
};
