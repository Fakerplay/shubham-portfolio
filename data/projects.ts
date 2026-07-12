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
  image: string;
  video?: string;
  showcaseGallery?: { number: string; filename: string; caption: string }[];
  tags: string[];
  metrics: { value: string; label: string }[];
  overview: string;
  chapters: Chapter[];
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
    subtitle: "Re-architecting digital advisory and multi-asset wealth tracking for high-net-worth investors.",
    liveUrl: "https://daulat.co.in",
    role: "Lead Product & Design Architect",
    timeline: "6 Months",
    client: "Daulat Financial Advisory",
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
      { number: "09", filename: "Color.png", caption: "Design System Palette & Curated Color Matrix" },
      { number: "10", filename: "Frame 2085664055.png", caption: "Typography Scale & Layout Hierarchy" },
      { number: "11", filename: "Frame 2147256860.png", caption: "Micro-Interaction Details & Component Specifications" },
      { number: "12", filename: "Frame 2147257348.png", caption: "Custom Engraved Botanical & Financial Illustrations" },
      { number: "13", filename: "Frame 2147257349.png", caption: "Comprehensive Platform Spread & Client Presentation" },
      { number: "14", filename: "Frame 2147257350.png", caption: "Client Review & Future Horizon Outcome" }
    ],
    tags: ["Website Design", "Development", "Fintech"],
    metrics: [
      { value: "4.5x", label: "Portfolio Growth" },
      { value: "94%", label: "Platform Adoption" }
    ],
    overview: "Daulat Finvest sought to transition from a traditional private wealth management firm into a digital-first, ultra-secure investment platform. High-net-worth individuals required clarity across fragmented asset classes, real-time analytics, and seamless communication with dedicated advisors without sacrificing editorial elegance.",
    chapters: [
      {
        number: "01",
        title: "The Fragmented Wealth Experience",
        subtitle: "Why legacy portals fail modern investors",
        content: [
          "Legacy financial dashboards overwhelm users with dense tables, lagging charts, and clinical interfaces that feel disconnected from personal goals.",
          "Our strategic challenge was to strip away cognitive clutter and introduce a tranquil, bespoke visual language where complex financial data feels airy, precise, and empowering."
        ],
        highlightMetric: {
          value: "72%",
          label: "Reduced Task Time",
          description: "Average reduction in time required for investors to review quarterly allocations."
        }
      },
      {
        number: "02",
        title: "Architecting Bespoke Portfolio Intelligence",
        subtitle: "Precision engineering meets human advisory",
        content: [
          "We designed modular asset cards that adapt dynamically to market shifts, utilizing subtle micro-interactions to signify performance trends without visual alarm fatigue.",
          "Every interaction was prototyped with fluid motion curves, ensuring 60fps transitions between asset breakdowns, tax simulation models, and secure document vaults."
        ],
        image: "/images/liverpool_3d.jpg"
      },
      {
        number: "03",
        title: "Systemic Security & Trust Design",
        subtitle: "Building unshakeable confidence at scale",
        content: [
          "In wealth management, trust is conveyed through typography, spacing, and uncompromising clarity. We established an SF Pro typographic hierarchy backed by end-to-end cryptographic verifications invisible to the user.",
          "Within 90 days of launch, client retention hit 99.2%, and platform engagement soared across both mobile and desktop touchpoints."
        ]
      }
    ],
    nextProject: {
      slug: "solaris",
      brand: "Solaris",
      title: "Solaris: Fintech Branding & Creative Direction"
    }
  },
  "solaris": {
    slug: "solaris",
    brand: "Solaris",
    title: "Solaris: Fintech Branding & Creative Direction",
    subtitle: "Forging a luminous, multi-dimensional brand identity and visual narrative for next-generation asset management.",
    year: "2024 - 2025",
    role: "Lead Brand Designer & Creative Director",
    timeline: "4 Months",
    client: "Solaris Financial Technologies",
    video: "/videos/solaris-2.mp4",
    image: "/images/solaris-cover.png",
    showcaseGallery: [
      { number: "02", filename: "Bento.png", caption: "Solaris Brand Architecture & Ecosystem Bento Grid" },
      { number: "03", filename: "ID Card 2.png", caption: "Executive Identification System & Holographic Security Pass" },
      { number: "04", filename: "Solaris_ID.png", caption: "Biometric Employee Credentials & Digital Touchpoints" },
      { number: "05", filename: "asset.png", caption: "Core 3D Glass Prism Asset & Refracted Amber Lighting" },
      { number: "06", filename: "Solaris 7.png", caption: "Institutional Advisory Dashboard & Wealth Tracking UI" },
      { number: "07", filename: "Solaris 8.png", caption: "High-Density Financial Analytics & Asset Allocation Matrix" },
      { number: "08", filename: "Solaris 9.png", caption: "Micro-Interaction Details & Custom Iconography System" },
      { number: "09", filename: "Solaris 10.png", caption: "Multi-Platform Editorial Interface & Dark Mode UI Spread" },
      { number: "10", filename: "Solaris 11.png", caption: "Comprehensive Platform Overview & Multi-Device Responsive Experience" },
      { number: "11", filename: "Solaris 12.png", caption: "Interactive Advisory Portal & Real-Time Portfolio Performance" },
      { number: "12", filename: "Solaris 13.png", caption: "Cryptographic Verification Engine & Security Architecture" },
      { number: "13", filename: "Solaris 15.png", caption: "Visual Design Tokens & Typography Scale Matrix" },
      { number: "14", filename: "Solaris 16.png", caption: "Component Library & Interactive Form Elements" },
      { number: "15", filename: "Solaris 17.png", caption: "Mobile Wealth Management Experience & Gesture Navigation" },
      { number: "16", filename: "Solaris 21.png", caption: "Marketing Campaign Spread & Digital Brand Rollout" },
      { number: "17", filename: "Solaris 22.png", caption: "Investor Deck Presentation & Visual Storytelling" },
      { number: "18", filename: "Solaris 27.png", caption: "Future Horizon Concept & Holographic Spatial UI" },
      { number: "19", filename: "02-full.jpg", caption: "Full-Spread Brand Master Overview & Visual Summary" },
      { number: "20", filename: "02-portrait-left.jpg", caption: "Mobile Portrait Touchpoint & Compact Editorial Card" }
    ],
    tags: ["Brand Identity", "Creative Direction", "3D Visuals", "Fintech"],
    metrics: [
      { value: "3.8x", label: "Brand Engagement" },
      { value: "45+", label: "Visual Assets Created" }
    ],
    overview: "In a crowded fintech landscape dominated by conventional flat palettes, Solaris sought to stand apart as an illuminating beacon of financial clarity. As Lead Creative Director, I crafted a holistic brand identity centered around radiant crystalline structures, solar geometry, and aspirational editorial typography.",
    chapters: [
      {
        number: "01",
        title: "Growing Financial Clarity",
        subtitle: "A luminous metaphor for wealth intelligence",
        content: [
          "To translate complex algorithmic wealth tracking into human trust, we conceptualized the crystal lotus and solar horizon visual pillars.",
          "Every visual artifact expresses transparency, resilience, and radiant foresight—redefining how institutional investors interact with financial data."
        ],
        highlightMetric: {
          value: "100%",
          label: "Cohesive Visual Identity",
          description: "Seamless design alignment across digital web experiences, pitch decks, and social campaigns."
        }
      },
      {
        number: "02",
        title: "3D Worldbuilding & Visual Systems",
        subtitle: "Crafting multi-dimensional brand assets",
        content: [
          "We engineered 45+ bespoke 3D renders, blending refracted glass prisms, warm amber lighting, and orbital coin rings to signify dynamic asset flow.",
          "These assets served as the backbone for high-converting marketing pages and investor communications."
        ],
        image: "/images/solaris-thumb.jpg"
      },
      {
        number: "03",
        title: "Illuminating Bright Solutions",
        subtitle: "From creative direction to market impact",
        content: [
          "By pairing serif elegance with ultra-clean sans typography, the visual direction establishes immediate authority while feeling modern and inviting.",
          "The brand rollout drove a 3.8x lift in organic brand engagement and set a benchmark for creative excellence in fintech."
        ]
      }
    ],
    nextProject: {
      slug: "optiv",
      brand: "Optiv",
      title: "Optiv: Branding and Logo Design"
    }
  },
  "optiv": {
    slug: "optiv",
    brand: "Optiv",
    title: "Optiv: Branding and Logo Design",
    subtitle: "Architecting a distinctive brand identity, cohesive logo ecosystem, and comprehensive visual language for modern digital transformation.",
    year: "2025",
    role: "Lead Brand & Logo Designer",
    timeline: "3 Months",
    client: "Optiv Technologies",
    video: "/videos/Cover_Optiv_1080.mp4",
    image: "/images/optiv/About.png",
    showcaseGallery: [
      { number: "02", filename: "Optiv 1.png", caption: "Optiv Core Brand Mark & Primary Architectural Logo Exploration" },
      { number: "03", filename: "ID.png", caption: "Biometric Security Badges & Corporate Identification Card Ecosystem" },
      { number: "04", filename: "Color.png", caption: "Curated Brand Color Palette & Harmonic Contrast Matrix" },
      { number: "05", filename: "Creative.png", caption: "Creative Direction & Visual Token Applications Across Digital Touchpoints" },
      { number: "06", filename: "Mockup.png", caption: "Tactile Hardware & Physical Brand Collateral Mockups" },
      { number: "07", filename: "Poster.png", caption: "High-Impact Brand Campaign Poster & Editorial Typography Scale" },
      { number: "08", filename: "About.png", caption: "Strategic Brand Overview & Core Positioning Architecture" },
      { number: "09", filename: "Web.png", caption: "Responsive Digital Portal & Main Web Interface Experience" },
      { number: "10", filename: "Web-1.png", caption: "Editorial Web Dashboard & Interactive UI Tokens" },
      { number: "11", filename: "Web-2.png", caption: "Mobile Experience & Adaptive Interface Components" },
      { number: "12", filename: "Web-3.png", caption: "Comprehensive Web Spread & Design System Guidelines" },
      { number: "13", filename: "Optiv 2.png", caption: "Logo Construction Grid & Geometric Proportion Guidelines" },
      { number: "14", filename: "Optiv 3.png", caption: "Monochrome & Reverse Contrast Logo Variations" },
      { number: "15", filename: "Optiv 4.png", caption: "Typography Hierarchy & Custom Letterform Details" },
      { number: "16", filename: "Optiv 5.png", caption: "Iconography Matrix & System Micro-Illustrations" },
      { number: "17", filename: "Optiv 6.png", caption: "Final Brand Master Overview & Future Horizon Roadmap" }
    ],
    tags: ["Brand Identity", "Logo Design", "Visual System", "Creative Direction"],
    metrics: [
      { value: "100%", label: "Cohesive Identity System" },
      { value: "16+", label: "Brand Touchpoints Engineered" }
    ],
    overview: "Optiv required a bold, forward-looking brand identity that bridges complex technological capability with intuitive human design. From foundational geometric logo construction grid models to tactile identification cards and responsive web touchpoints, this case study details the creation of a timeless visual ecosystem designed to scale with clarity and poise.",
    chapters: [
      {
        number: "01",
        title: "Foundational Geometry & The Optiv Mark",
        subtitle: "Engineering precision into the core emblem",
        content: [
          "A great logo must function with razor-sharp clarity across both monumental physical signage and micro-digital avatars. We crafted the Optiv mark on a mathematically strict geometric grid.",
          "The resulting emblem balances dynamic kinetic energy with structural authority, serving as the anchor for the entire brand ecosystem."
        ],
        highlightMetric: {
          value: "16+",
          label: "Brand Touchpoints Engineered",
          description: "Seamless identity alignment across web, hardware mockups, employee ID cards, and marketing collateral."
        }
      },
      {
        number: "02",
        title: "Tactile Identification & Physical Touchpoints",
        subtitle: "Translating digital precision into the physical realm",
        content: [
          "We designed custom employee identification cards, hardware collateral mockups, and large-format editorial posters that elevate everyday interactions into tactile brand moments.",
          "Every surface utilizes restrained typographic scales and curated color contrast matrices to reinforce premium craftsmanship."
        ],
        image: "/images/optiv/ID.png"
      },
      {
        number: "03",
        title: "Digital Web Ecosystem & Scalable Guidelines",
        subtitle: "Bringing the brand to life across interactive viewports",
        content: [
          "Beyond static assets, we extended Optiv's visual guidelines into a responsive web architecture across mobile, desktop, and interactive portal views.",
          "The web interface pairs crisp typography with airy structural spacing, providing users with an effortless navigation experience that feels distinctly Optiv."
        ]
      }
    ],
    nextProject: {
      slug: "studio-vistara",
      brand: "Studio Vistara",
      title: "Studio Vistara: Branding"
    }
  },
  "studio-vistara": {
    slug: "studio-vistara",
    brand: "Studio Vistara",
    title: "Studio Vistara: Branding",
    subtitle: "Crafting an ethereal, highly tactile brand identity, architectural typography matrix, and bespoke stationery ecosystem for modern spatial design.",
    year: "2025 - Present",
    role: "Lead Brand & Identity Designer",
    timeline: "3 Months",
    client: "Studio Vistara Architecture & Interiors",
    video: "/videos/studio-vistara-1.mp4",
    image: "/images/studio-vistara-cover.png",
    showcaseGallery: [
      { number: "02", filename: "Intro_slide.png", caption: "Studio Vistara Brand Philosophy & Core Visual Foundations" },
      { number: "03", filename: "Project_About.png", caption: "Architectural Positioning & Brand Identity Strategy Overview" },
      { number: "04", filename: "Logo_2.png", caption: "Geometric Monogram & Primary Architectural Logo System" },
      { number: "05", filename: "Mark.png", caption: "Emblem Construction Grid & Proportional Balance Matrix" },
      { number: "06", filename: "Color_Palette.png", caption: "Curated Earth & Stone Color Palette Contrast Tokens" },
      { number: "07", filename: "Typo_1.png", caption: "Editorial Typography Scale & Primary Serif Specification" },
      { number: "08", filename: "Typo_1_1.png", caption: "Secondary Sans-Serif Pairing & Hierarchy Rules" },
      { number: "09", filename: "Typo_2.png", caption: "Typeface Micro-Details & Custom Letterform Ligatures" },
      { number: "10", filename: "Stationery.png", caption: "Tactile Embossed Business Cards & Corporate Stationery Spread" },
      { number: "11", filename: "Poster.png", caption: "Large-Format Brand Exhibition Poster Spread" },
      { number: "12", filename: "Poster_2.png", caption: "Minimalist Editorial Campaign Poster Exploration" },
      { number: "13", filename: "Social_Media.png", caption: "Digital Social Media Assets & Editorial Grid Templates" },
      { number: "14", filename: "Social_Media_1.png", caption: "Multi-Platform Storytelling & Social Campaign Rollout" },
      { number: "15", filename: "Collage.png", caption: "Holistic Brand Master Overview & Multi-Touchpoint Spread" },
      { number: "16", filename: "Studio_Vistara.png", caption: "Brand Architecture Summary & Future Horizon Vision" },
      { number: "17", filename: "Frame_1216221521.png", caption: "Digital Identity Guidelines & UI Component Tokens" }
    ],
    tags: ["Brand Identity", "Typography System", "Stationery & Packaging", "Creative Direction"],
    metrics: [
      { value: "100%", label: "Cohesive Visual Identity" },
      { value: "15+", label: "Brand Touchpoints Engineered" }
    ],
    overview: "Studio Vistara required a sophisticated, deeply tactile visual identity that mirrors their architectural ethos of spatial harmony and timeless serenity. By combining precise geometric monograms with earthy, tactile color tokens and refined editorial typography, we constructed a comprehensive brand ecosystem that exudes both warmth and authoritative luxury.",
    chapters: [
      {
        number: "01",
        title: "Spatial Geometry & The Vistara Emblem",
        subtitle: "Translating architectural form into a distinct monogram",
        content: [
          "To embody the essence of Studio Vistara's architectural vision, we crafted a clean geometric monogram anchored in classic proportions.",
          "The emblem balances structural precision with fluid elegance, acting as a memorable seal of quality across physical and digital spaces."
        ],
        highlightMetric: {
          value: "15+",
          label: "Brand Touchpoints Engineered",
          description: "Comprehensive identity alignment across stationery spreads, exhibition posters, digital templates, and color matrices."
        }
      },
      {
        number: "02",
        title: "Tactile Stationery & Color Harmonies",
        subtitle: "Earthy, stone-inspired tones meets textured print craftsmanship",
        content: [
          "We curated a bespoke palette inspired by natural stone, terracotta, and warm alabaster to evoke spatial depth.",
          "When applied to physical collateral like embossed business cards and letterheads, the identity creates an unforgettable tactile experience."
        ],
        image: "/images/studio-vistara/Stationery.png"
      },
      {
        number: "03",
        title: "Editorial Typography & Digital Rollout",
        subtitle: "Structuring communication across social and print media",
        content: [
          "The typography matrix establishes clear hierarchy through expressive serif headlines paired with ultra-clean sans-serif body copy.",
          "From large-format gallery posters to structured social media storytelling grids, the identity remains poised, adaptable, and instantly recognizable."
        ]
      }
    ],
    nextProject: {
      slug: "daulat-finvest",
      brand: "Daulat Finvest",
      title: "Wealth management crafted around your portfolio"
    }
  }
};
