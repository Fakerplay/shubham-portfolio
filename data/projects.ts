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
    subtitle: "Designing a clearer digital wealth experience for portfolio tracking, advisory, and investor communication.",
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
      { number: "09", filename: "Color.png", caption: "Design System Color Palette" },
      { number: "10", filename: "Frame 2085664055.png", caption: "Typography Scale & Layout Hierarchy" },
      { number: "11", filename: "Frame 2147256860.png", caption: "Micro-Interaction Details & Component Specifications" },
      { number: "12", filename: "Frame 2147257348.png", caption: "Custom Engraved Botanical & Financial Illustrations" },
      { number: "13", filename: "Frame 2147257349.png", caption: "Platform Overview & Client Presentation" },
      { number: "14", filename: "Frame 2147257350.png", caption: "Client Review & Platform Direction" }
    ],
    tags: ["Website Design", "Development", "Fintech"],
    metrics: [
      { value: "4.5x", label: "Portfolio Growth" },
      { value: "94%", label: "Platform Adoption" }
    ],
    overview: "Daulat Finvest was moving from traditional private wealth management toward a digital-first platform. As Lead Product & Design Architect, I shaped a clearer experience for viewing assets, understanding performance, and staying connected with advisors.",
    chapters: [
      {
        number: "01",
        title: "Making Complex Portfolios Easier to Read",
        subtitle: "Turning dense financial information into clearer decisions",
        content: [
          "Legacy wealth dashboards often bury important information in dense tables and disconnected views.",
          "I simplified the information hierarchy and introduced a calmer visual system so investors could understand allocation, performance, and next steps more quickly."
        ],
        highlightMetric: {
          value: "94%",
          label: "Platform Adoption",
          description: "Adoption recorded for the redesigned digital wealth experience."
        }
      },
      {
        number: "02",
        title: "Designing the Portfolio Experience",
        subtitle: "Modular views for assets, performance, and advice",
        content: [
          "I designed modular asset cards that make changes in allocation and performance easier to scan without creating visual alarm.",
          "Consistent interaction states connect asset breakdowns, planning tools, documents, and advisor communication as one experience."
        ],
        image: "/images/liverpool_3d.jpg"
      },
      {
        number: "03",
        title: "Designing for Trust",
        subtitle: "Clarity and consistency across sensitive interactions",
        content: [
          "In wealth management, trust depends on clear hierarchy, predictable behavior, and careful handling of detail.",
          "I carried the same typography, spacing, and interaction logic across desktop and mobile so the platform feels consistent wherever investors use it."
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
    subtitle: "Building a distinctive fintech identity across brand, 3D, digital, and investor communications.",
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
    tags: ["Brand Identity", "Creative Direction", "3D Visuals", "Fintech"],
    metrics: [
      { value: "3.8x", label: "Brand Engagement" },
      { value: "45+", label: "Visual Assets Created" }
    ],
    overview: "Solaris needed a distinct identity in a fintech category dominated by familiar visual conventions. As Lead Brand Designer and Creative Director, I built a system around crystalline forms, solar geometry, warm light, and editorial typography across 45+ brand assets.",
    chapters: [
      {
        number: "01",
        title: "A Visual Idea Built Around Clarity",
        subtitle: "Turning financial complexity into a recognizable brand language",
        content: [
          "Solaris needed to make sophisticated financial technology feel clear, credible, and distinct.",
          "I developed the crystal lotus and solar horizon as recurring forms, giving the identity a consistent language for transparency, growth, and perspective."
        ],
        highlightMetric: {
          value: "100%",
          label: "Cohesive Visual Identity",
          description: "One visual system applied across web experiences, pitch decks, and social campaigns."
        }
      },
      {
        number: "02",
        title: "Building the 3D Visual System",
        subtitle: "A flexible asset language for digital and campaign use",
        content: [
          "I created 45+ 3D assets using refracted glass, warm amber light, and orbital forms to visualize movement and value.",
          "The system gave product pages, campaigns, decks, and investor communications a shared visual signature."
        ],
        image: "/images/solaris-thumb.jpg"
      },
      {
        number: "03",
        title: "Carrying the Direction Across Touchpoints",
        subtitle: "From identity principles to a consistent rollout",
        content: [
          "I paired expressive serif typography with a restrained sans-serif system to balance authority with accessibility.",
          "Applied consistently across the rollout, the new direction contributed to a 3.8x lift in brand engagement."
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
    subtitle: "Creating a scalable identity system across logo, digital, physical, and campaign touchpoints.",
    year: "2025",
    role: "Lead Brand & Logo Designer",
    timeline: "3 Months",
    client: "Optiv Technologies",
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
    tags: ["Brand Identity", "Logo Design", "Visual System", "Creative Direction"],
    metrics: [
      { value: "100%", label: "Cohesive Identity System" },
      { value: "16+", label: "Brand Touchpoints Engineered" }
    ],
    overview: "Optiv needed an identity that could make complex technology feel clear and approachable. As Lead Brand and Logo Designer, I developed the core mark, visual system, and applications across 16+ digital and physical touchpoints.",
    chapters: [
      {
        number: "01",
        title: "Designing the Optiv Mark",
        subtitle: "A precise symbol built to work at every scale",
        content: [
          "The Optiv mark needed to remain recognizable from digital avatars to large-format applications.",
          "I built the symbol on a controlled geometric grid, creating a clear anchor for the wider identity system."
        ],
        highlightMetric: {
          value: "16+",
          label: "Brand Touchpoints Engineered",
          description: "One identity applied across web, hardware mockups, employee ID cards, and marketing collateral."
        }
      },
      {
        number: "02",
        title: "Extending the Identity into Physical Touchpoints",
        subtitle: "A consistent system for identification and collateral",
        content: [
          "I extended the identity across employee cards, hardware mockups, and large-format campaign pieces.",
          "A restrained type scale and controlled color system keep each application recognizably Optiv."
        ],
        image: "/images/optiv/ID.png"
      },
      {
        number: "03",
        title: "Building the Digital System",
        subtitle: "Responsive rules for web and interface applications",
        content: [
          "I translated the visual guidelines into responsive patterns for mobile, desktop, and portal views.",
          "Typography, spacing, and interface components follow the same logic, helping the brand stay consistent as the product grows."
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
    subtitle: "Translating an architecture studio's spatial sensibility into a tactile, adaptable identity.",
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
      { number: "05", filename: "Mark.png", caption: "Emblem Construction Grid & Proportions" },
      { number: "06", filename: "Color_Palette.png", caption: "Curated Earth & Stone Color Palette Contrast Tokens" },
      { number: "07", filename: "Typo_1.png", caption: "Editorial Typography Scale & Primary Serif Specification" },
      { number: "08", filename: "Typo_1_1.png", caption: "Secondary Sans-Serif Pairing & Hierarchy Rules" },
      { number: "09", filename: "Typo_2.png", caption: "Typeface Micro-Details & Custom Letterform Ligatures" },
      { number: "10", filename: "Stationery.png", caption: "Tactile Embossed Business Cards & Corporate Stationery Spread" },
      { number: "11", filename: "Poster.png", caption: "Large-Format Brand Exhibition Poster Spread" },
      { number: "12", filename: "Poster_2.png", caption: "Minimalist Editorial Campaign Poster Exploration" },
      { number: "13", filename: "Social_Media.png", caption: "Digital Social Media Assets & Editorial Grid Templates" },
      { number: "14", filename: "Social_Media_1.png", caption: "Multi-Platform Storytelling & Social Campaign Rollout" },
      { number: "15", filename: "Collage.png", caption: "Brand Overview Across Key Touchpoints" },
      { number: "16", filename: "Studio_Vistara.png", caption: "Brand System Summary & Direction" },
      { number: "17", filename: "Frame_1216221521.png", caption: "Digital Identity Guidelines & UI Component Tokens" }
    ],
    tags: ["Brand Identity", "Typography System", "Stationery & Packaging", "Creative Direction"],
    metrics: [
      { value: "100%", label: "Cohesive Visual Identity" },
      { value: "15+", label: "Brand Touchpoints Engineered" }
    ],
    overview: "Studio Vistara needed an identity that reflected its balance of structure, materiality, and calm. As Lead Brand and Identity Designer, I created a geometric monogram, editorial type system, earth-led palette, and applications across 15+ touchpoints.",
    chapters: [
      {
        number: "01",
        title: "Designing the Vistara Monogram",
        subtitle: "Translating architectural form into a distinct mark",
        content: [
          "Studio Vistara needed a mark that felt architectural without becoming rigid or impersonal.",
          "I built the monogram around clear geometry and balanced proportions so it could act as a recognizable signature across physical and digital spaces."
        ],
        highlightMetric: {
          value: "15+",
          label: "Brand Touchpoints Engineered",
          description: "One identity applied across stationery, exhibition posters, digital templates, and color systems."
        }
      },
      {
        number: "02",
        title: "Building a Material Color System",
        subtitle: "Stone-led tones carried into tactile print applications",
        content: [
          "I developed a palette from natural stone, terracotta, and warm alabaster to reflect the studio's material sensibility.",
          "Embossed cards, stationery, and print applications turn that palette into a tactile extension of the architecture practice."
        ],
        image: "/images/studio-vistara/Stationery.png"
      },
      {
        number: "03",
        title: "Creating the Editorial System",
        subtitle: "A clear hierarchy across social, print, and presentation formats",
        content: [
          "I paired expressive serif headlines with a clean sans-serif body system to create a flexible editorial hierarchy.",
          "The same rules organize gallery posters, social templates, and presentations without losing the studio's character."
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
