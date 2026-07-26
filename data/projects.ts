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
  industry?: string;
  status?: string;
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
  metaDescription?: string;
  nextProject: {
    slug: string;
    brand: string;
    title: string;
  };
}

export const DETAILED_PROJECTS: Record<string, DetailedProject> = {
  "daulat-finvest": {
    slug: "daulat-finvest",
    brand: "Daulat Wealth Management",
    title: "Daulat Wealth Management — Brand Identity and Website",
    subtitle: "Building a more human, credible and portfolio-first wealth management brand.",
    liveUrl: "https://daulat.co.in/",
    role: "Brand Strategy, Identity, Website Design & Development",
    timeline: "6 weeks",
    client: "Daulat Wealth Management",
    industry: "Wealth Management · Financial Services",
    status: "Client project",
    outcome: "Launched",
    video: "/videos/daulat-cover.mp4",
    image: "/images/project-1-cover.jpg",
    showcaseGallery: [
      { number: "02", filename: "1_Daulat CS.png", caption: "Strategic positioning overview focusing on credibility, transparency, and portfolio-first communication." },
      { number: "03", filename: "2_Daulat CS.png", caption: "Brand editorial typography direction and visual architecture guidelines." },
      { number: "04", filename: "Color.png", caption: "The brand palette balances financial heritage colors with organic secondary tones." },
      { number: "05", filename: "Frame 2085664055.png", caption: "Typography scale and responsive hierarchy system for clean layout presentation." },
      { number: "06", filename: "Frame 2147257348.png", caption: "Bespoke engraved botanical and financial illustrations representing long-term resilience." }
    ],
    tags: ["Website Strategy", "Website Design", "Development"],
    context: "Daulat Wealth Management needed to shift away from generic financial services messaging toward a digital presence that reflects their relationship-led, founder-driven approach. They required a positioning strategy that is both credible and human.",
    challenge: "Traditional financial platforms rely on cold, complex data presentations and abstract illustrations. The challenge was to construct a strategy-led visual identity, integrate custom Indian botanical illustrations, and build a high-performance responsive website within a six-week timeline.",
    responsibility: "As Lead Designer, I led the complete journey from initial strategy and discovery, visual direction, botanical art direction, and copywriting, to website UX/UI design, responsive Next.js development, and final launch.",
    decision01: {
      title: "Establishing credibility and human warmth",
      text: "We positioned the brand around transparency and relationships. By avoiding generic stock imagery and heavy data blocks, the interface speaks directly to long-term investors seeking alignment and clarity."
    },
    decision02: {
      title: "Cultural botanical visual direction",
      text: "Custom Indian botanical illustrations were created and placed throughout key site layouts. These hand-drawn elements symbolize growth and patience, grounding the digital experience in warm, organic heritage."
    },
    decision03: {
      title: "Responsive, content-first architecture",
      text: "A clean, content-driven layout was designed to explain Daulat's advisory model clearly. The website was developed with responsive front-end components to ensure quick loading times and readability across mobile and desktop devices."
    },
    outcomeDetails: "A complete brand strategy and responsive website were launched in six weeks. The project delivered a consistent visual identity across the site and communication systems, establishing a clearer representation of Daulat's relationship-led approach.",
    metaDescription: "A case study on the branding, identity strategy, custom botanical illustrations, and responsive website development for Daulat Wealth Management.",
    nextProject: {
      slug: "solace",
      brand: "Solace AI",
      title: "Solace AI Brand Identity and Website"
    }
  },
  "solace": {
    slug: "solace",
    brand: "Solace AI",
    title: "Solace AI — Brand Identity and Website",
    subtitle: "Quiet confidence for a modern wellness brand.",
    liveUrl: "https://aisolace.vercel.app/",
    role: "Brand Identity and Website Design",
    timeline: "4 weeks",
    client: "Solace AI",
    industry: "Technology & Wellness",
    status: "Client project",
    outcome: "Launched",
    image: "/images/solace/Solace Cover.png",
    showcaseGallery: [
      { number: "02", filename: "Solace Main Cover.png", caption: "The core Solace AI visual identity system and organic corporate emblem." },
      { number: "03", filename: "Solace Main Cover-1.png", caption: "Premium product packaging guidelines and digital assets presentation." },
      { number: "04", filename: "Solace Main Cover-2.png", caption: "Editorial typography structure, layout systems, and clean content spacing." },
      { number: "05", filename: "Solace Main Cover-3.png", caption: "Digital product showcase formats and cohesive social storytelling templates." },
      { number: "06", filename: "Solace Main Cover-4.png", caption: "Holistic design variables, assets, and future brand guidelines." }
    ],
    tags: ["Brand Identity", "Website Design", "Creative Direction"],
    context: "Solace AI needed a distinctive brand presence to stand out in a noisy wellness technology market. The brand required a quiet, disciplined point of view that bridges organic product design with luxury editorial typography.",
    challenge: "Wellness technology marketing often relies on familiar pastel gradients and generic vector graphics. Solace AI needed to establish a premium positioning, applying structured typographic details and blind-embossed packaging textures across digital layouts.",
    responsibility: "As Lead Designer, I led the brand identity development, packaging guidelines, visual art direction, responsive website design, and front-end interface layout.",
    decision01: {
      title: "Luxury through deliberate restraint",
      text: "We avoided unnecessary decorative elements, utilizing generous whitespace and elegant serif headlines to establish focus, giving the brand a calm and premium visual presence."
    },
    decision02: {
      title: "Bridging physical and digital touchpoints",
      text: "The web design system mirrors the tactile feel of physical packaging, incorporating stone and glass textures, blind debossing styles, and structured layouts."
    },
    decision03: {
      title: "Structured brand implementation guidelines",
      text: "We created a set of style guides for typographic layout, color usage, and spatial balance, ensuring Solace AI maintains a consistent voice across future launches."
    },
    outcomeDetails: "The project delivered a comprehensive brand identity and launching site within a four-week timeline, establishing a unified premium presence across all marketing and product channels.",
    metaDescription: "A case study on the premium brand identity, luxury typography, and website design for Solace AI wellness ecosystem.",
    nextProject: {
      slug: "studio-vistara",
      brand: "Studio Vistara",
      title: "Studio Vistara Brand Identity and Website"
    }
  },
  "studio-vistara": {
    slug: "studio-vistara",
    brand: "Studio Vistara",
    title: "Studio Vistara — Brand Identity and Website",
    subtitle: "An architectural identity built from structure, material, and calm.",
    role: "Brand Identity and Website Design",
    timeline: "3 months",
    client: "A local architecture and interior design studio based in Pune",
    industry: "Architecture & Interior Design",
    status: "Client project",
    outcome: "Launched",
    video: "/videos/studio-vistara-1.mp4",
    image: "/images/studio-vistara-cover.png",
    showcaseGallery: [
      { number: "02", filename: "Intro_slide.png", caption: "Studio Vistara brand positioning, philosophy guidelines, and spatial foundations." },
      { number: "03", filename: "Project_About.png", caption: "Architectural strategy and brand identity presentation systems." },
      { number: "04", filename: "Logo_2.png", caption: "Geometric monogram monogram and secondary architectural logo systems." },
      { number: "05", filename: "Mark.png", caption: "Core emblem structure, grid alignments, and dimension ratios." },
      { number: "06", filename: "Color_Palette.png", caption: "Stone, clay, and terracotta earth-toned colors palette tokens." },
      { number: "07", filename: "Typo_1.png", caption: "Primary editorial serif typeface specifications and sizing rules." },
      { number: "08", filename: "Typo_1_1.png", caption: "Clean sans-serif typography pairing guidelines for high legibility." },
      { number: "09", filename: "Typo_2.png", caption: "Type construction details, letterform flourishes, and visual alignment." },
      { number: "10", filename: "Stationery.png", caption: "Tactile embossed business cards and professional stationery layouts." },
      { number: "11", filename: "Poster.png", caption: "Large-Format Brand Exhibition Poster Spread" },
      { number: "12", filename: "Poster_2.png", caption: "Minimalist editorial campaign poster explorations and grid pacing." },
      { number: "13", filename: "Social_Media.png", caption: "Social media visual template systems and structured image grids." },
      { number: "14", filename: "Social_Media_1.png", caption: "Instagram narrative layouts and digital publishing guidelines." },
      { number: "15", filename: "Collage.png", caption: "Combined portfolio overview showing core branding touchpoints." },
      { number: "16", filename: "Studio_Vistara.png", caption: "Summary brand presentation slide highlighting spatial architecture." },
      { number: "17", filename: "Frame_1216221521.png", caption: "Digital identity guidelines, UI design variables, and responsive components." }
    ],
    tags: ["Brand Identity", "Website Design", "Creative Direction"],
    context: "Studio Vistara, an architectural and interior design practice based in Pune, needed an identity created from scratch for their official launch. The system had to represent their spatial sensitivity across physical and digital formats.",
    challenge: "Architectural identities often fall into rigid line-art logomarks and industrial colors. The goal was to balance clean geometric structures with material warmth, delivering launch-ready business applications and an editorial website layout.",
    responsibility: "As Lead Brand and Identity Designer, I developed the monogram, construction rules, earth-led color palette, layout grids, business collateral, and responsive web interface design.",
    decision01: {
      title: "Spatial monogram design system",
      text: "The core monogram utilizes balanced dimensions and structural lines. Its geometry references architectural foundations without reproducing literal building symbols."
    },
    decision02: {
      title: "Earth-toned palette and tactile elements",
      text: "A color palette reflecting stone, clay, and terracotta was introduced. Spacing and layout rules were optimized for blind embossing, thick cardstocks, and clean physical presentation."
    },
    decision03: {
      title: "Editorial web structure and layouts",
      text: "We paired custom serif headings with a structured layout grid. The clean organization allows architectural photography to stand out while presenting services clearly."
    },
    outcomeDetails: "The project successfully launched the studio's brand identity. It provided a cohesive tactile print system and responsive digital presence, giving Vistara a structured foundation for client presentations.",
    metaDescription: "A case study on the spatial monogram identity, earthy palette, editorial proposals, and website design created from scratch for Studio Vistara's launch.",
    nextProject: {
      slug: "solaris",
      brand: "Solaris",
      title: "Solaris Independent Brand Concept"
    }
  },
  "solaris": {
    slug: "solaris",
    brand: "Solaris",
    title: "Solaris — Independent Brand Concept",
    subtitle: "A fintech identity shaped by light, precision, and possibility.",
    role: "Independent Designer",
    timeline: "1 week",
    client: "Solaris (Independent Concept)",
    industry: "Financial Technology",
    status: "Independent concept",
    outcome: "Independent concept",
    video: "/videos/solaris-2.mp4",
    image: "/images/solaris-cover.png",
    showcaseGallery: [
      { number: "02", filename: "Bento.png", caption: "Solaris brand architecture, system tokens, and ecosystem bento grid layout." },
      { number: "03", filename: "ID Card 2.png", caption: "Visual security badges, corporate credentials, and passcard designs." },
      { number: "04", filename: "Solaris_ID.png", caption: "Crystalline credential tokens and spatial verification card layouts." },
      { number: "05", filename: "asset.png", caption: "A 3D glass prism asset refracting amber light, representing solar geometry." },
      { number: "06", filename: "Solaris 7.png", caption: "Clean typography structure and asset-allocation layout concepts." },
      { number: "07", filename: "Solaris 8.png", caption: "Modular dashboard details showing visual precision." },
      { number: "08", filename: "Solaris 9.png", caption: "Precise icon design tokens and technical interface components." },
      { number: "09", filename: "Solaris 10.png", caption: "A restrained interface system keeps information legible while allowing the brand's editorial character to remain visible across formats." },
      { number: "10", filename: "Solaris 11.png", caption: "Multi-device layout presentation across desktop and mobile screens." },
      { number: "11", filename: "Solaris 12.png", caption: "Crystalline visual accents and allocated portfolio views." },
      { number: "12", filename: "Solaris 13.png", caption: "Verification steps and key account information layouts." },
      { number: "13", filename: "Solaris 15.png", caption: "Core visual styles, spacing guidelines, and type sizing." },
      { number: "14", filename: "Solaris 16.png", caption: "Design system buttons, inputs, and form library components." },
      { number: "15", filename: "Solaris 17.png", caption: "Mobile layout grid and structured navigation system." },
      { number: "16", filename: "Solaris 21.png", caption: "Digital marketing campaign layouts and poster formats." },
      { number: "17", filename: "Solaris 22.png", caption: "Investor presentation slides and narrative layouts." },
      { number: "18", filename: "Solaris 27.png", caption: "Alternative layout concepts exploring solar shapes." },
      { number: "19", filename: "02-full.jpg", caption: "Full brand layout summary showing visual assets." },
      { number: "20", filename: "02-portrait-left.jpg", caption: "Mobile vertical layouts and typography treatments." }
    ],
    tags: ["Brand Strategy", "Identity Design", "Art Direction"],
    context: "Solaris is an independent design concept exploring financial technology brand aesthetics. The project researches alternative visual directions that move away from generic fintech icons and stock vectors.",
    challenge: "Fintech branding often relies on abstract blue grids and digital connection lines. The design exploration sought to combine amber lighting, crystalline shapes, and structured typography to create a memorable aesthetic.",
    responsibility: "As Independent Designer, I developed the brand strategy, visual monogram, 3D art direction, design system guidelines, and marketing presentation concepts.",
    decision01: {
      title: "Solar and crystalline visual theme",
      text: "We explored solar shapes and amber lighting as central metaphors. This direction provides a distinct color palette and high-contrast visuals, adding energy to traditional financial layouts."
    },
    decision02: {
      title: "Typography contrast guidelines",
      text: "The concept pairs expressive serif headlines with a clean sans-serif system. This layout balances personality with reading clarity across dashboards, documents, and slides."
    },
    decision03: {
      title: "Unified design tokens library",
      text: "We established consistent rules for spacing, border radiuses, and lighting states. The guidelines ensure a cohesive style across credentials, interfaces, decks, and marketing posters."
    },
    outcomeDetails: "The design concept was completed as a portfolio exploration. It demonstrates how amber lighting and glass textures can be applied to create a distinct aesthetic in financial technology branding.",
    metaDescription: "Independent brand concept exploring solar geometry, crystalline iconography, refracted lighting, and product mockups created for portfolio exploration.",
    nextProject: {
      slug: "optiv",
      brand: "Optiv",
      title: "Optiv Brand Concept Proposal"
    }
  },
  "optiv": {
    slug: "optiv",
    brand: "Optiv",
    title: "Optiv — Brand Concept Proposal",
    subtitle: "Making complex technology feel clear and approachable.",
    role: "Independent Designer",
    timeline: "2 weeks",
    client: "Optiv (Concept Proposal)",
    industry: "Information Technology",
    status: "Concept proposal",
    outcome: "Concept proposal",
    video: "/videos/Cover_Optiv_1080.mp4",
    image: "/images/optiv/About.png",
    showcaseGallery: [
      { number: "02", filename: "Optiv 1.png", caption: "The core Optiv geometric mark and structural logo construction grid." },
      { number: "03", filename: "ID.png", caption: "Corporate identification badges and biometric employee passes." },
      { number: "04", filename: "Color.png", caption: "High-contrast brand colors and accessibility palette tokens." },
      { number: "05", filename: "Creative.png", caption: "Identity system assets applied across print and digital layouts." },
      { number: "06", filename: "Mockup.png", caption: "Mockup applications on office stationery and packaging boxes." },
      { number: "07", filename: "Poster.png", caption: "Brand exhibition poster exploring grid layouts and type sizing." },
      { number: "08", filename: "About.png", caption: "Visual positioning and messaging rules overview." },
      { number: "09", filename: "Web.png", caption: "Main web interface design and responsive layout grid." },
      { number: "10", filename: "Web-1.png", caption: "Digital product portal concept and typography placement." },
      { number: "11", filename: "Web-2.png", caption: "Mobile layout grid and adaptive navigation components." },
      { number: "12", filename: "Web-3.png", caption: "Design system components, buttons, and input guidelines." },
      { number: "13", filename: "Optiv 2.png", caption: "Geometric construction lines showing proportions of the symbol." },
      { number: "14", filename: "Optiv 3.png", caption: "Solid black and white variations of the core mark." },
      { number: "15", filename: "Optiv 4.png", caption: "Typography pairing guidelines and letterform details." },
      { number: "16", filename: "Optiv 5.png", caption: "Custom iconography library and clean interface symbols." },
      { number: "17", filename: "Optiv 6.png", caption: "Brand rollout schedule and visual timeline guidelines." }
    ],
    tags: ["Brand Strategy", "Identity Design", "Digital Applications"],
    context: "Optiv is a brand concept proposal developed as a pitch for a prospective technology client. The system explores how an identity can feel structured and recognizable across digital and physical formats.",
    challenge: "Technology branding can easily become overly busy with complex patterns. The concept pitches a simple geometric monogram built on a grid, showing how the system scales down to small avatars and up to exhibition posters.",
    responsibility: "As Independent Designer, I created the brand strategy, visual monogram, layout grids, colors, iconography, and multi-device application mockups for the pitch proposal.",
    decision01: {
      title: "Grid-aligned monogram construction",
      text: "The core mark was built on a precise geometric grid. This structure ensures readability at small scales and consistency across print and digital formats."
    },
    decision02: {
      title: "Cross-channel brand logic",
      text: "We established consistent rules for layout, colors, and type pairing. This system ensures the brand voice remains clear on business cards, packages, and interfaces."
    },
    decision03: {
      title: "Interactive digital proposal details",
      text: "We designed portal layouts, dashboard states, and mobile grids. These concepts show how the identity functions in responsive software, not just static mockups."
    },
    outcomeDetails: "The project was developed as a concept proposal for prospective client evaluation. It showcases a scalable, grid-aligned identity design system designed for modern multi-device applications.",
    metaDescription: "A concept proposal developed for a prospective client, showcasing geometric grid construction guidelines, brand design systems, and digital applications.",
    nextProject: {
      slug: "daulat-finvest",
      brand: "Daulat Wealth Management",
      title: "Daulat Wealth Management Brand and Website"
    }
  }
};
