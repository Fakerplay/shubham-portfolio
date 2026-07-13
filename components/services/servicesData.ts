export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  overview: string;
  deliverables: string[];
  tag: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "brand-architecture",
    number: "01",
    title: "Brand Architecture & Identity Systems",
    subtitle: "Re-architecting visual design languages and editorial positioning.",
    overview: "From zero-to-one startups to established enterprises, I build distinctive brand ecosystems that command market presence through meticulous typography, custom iconography, and scalable visual systems.",
    deliverables: [
      "Design Tokens & Matrix",
      "Visual Identity Systems",
      "Typography Hierarchy",
      "Brand Guidelines & Strategy",
      "Iconography & Asset Production"
    ],
    tag: "01 / IDENTITY"
  },
  {
    id: "product-architecture",
    number: "02",
    title: "Product Architecture & UI/UX Experience",
    subtitle: "High-density platform design, advisory portals, and complex web ecosystems.",
    overview: "Designing intuitive interfaces for high-net-worth platforms, multi-device enterprise dashboards, and seamless consumer web applications that turn operational complexity into elegance.",
    deliverables: [
      "Platform Interface Design",
      "Interactive Prototyping",
      "Design System Libraries",
      "Multi-Device Responsive Flows",
      "Data Visualization UI"
    ],
    tag: "02 / PRODUCT & UI"
  },
  {
    id: "3d-motion",
    number: "03",
    title: "Immersive 3D & Motion Direction",
    subtitle: "Kinetic typography, 3D spatial environments, and dynamic storytelling.",
    overview: "Adding depth, emotion, and tactile response to digital touchpoints through 3D modeling, interaction choreography, and cinematic motion design.",
    deliverables: [
      "3D Product Modeling",
      "WebGL & Motion Systems",
      "Kinetic Typography",
      "Micro-Interactions",
      "Promotional Video Direction"
    ],
    tag: "03 / 3D & MOTION"
  },
  {
    id: "design-systems",
    number: "04",
    title: "Design Systems & Frontend Engineering",
    subtitle: "Bridging creative direction with high-performance production code.",
    overview: "Translating complex design matrices into modular, production-ready frontend codebases using Next.js, React, and Framer Motion, ensuring exact visual fidelity across every device.",
    deliverables: [
      "React & Next.js Architecture",
      "Framer Motion Choreography",
      "Design Token Implementation",
      "Cross-Device Optimization",
      "Accessible Component Libraries"
    ],
    tag: "04 / ENGINEERING"
  }
];
