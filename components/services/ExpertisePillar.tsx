"use strict";
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ExpertiseItem {
  number: string;
  title: string;
  category: string;
  color: string;
  gradient: string;
  overview: string;
  stats: string;
  skills: string[];
  technologies: string[];
}

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    number: "01",
    title: "Brand Identity",
    category: "Identity Systems",
    color: "#f43f5e",
    gradient: "radial-gradient(ellipse 90% 70% at 30% 50%, rgba(244, 63, 94, 0.15) 0%, rgba(244, 63, 94, 0.08) 35%, rgba(244, 63, 94, 0.03) 65%, rgba(244, 63, 94, 0) 100%)",
    overview: "Distinctive identity systems built to be recognized, remembered, and used across every touchpoint.",
    stats: "Strategy to Guidelines • Built to Scale",
    skills: ["Design Tokens", "Typography Systems", "Logo Systems", "Brand Guidelines"],
    technologies: ["Figma Variables", "Typography Hierarchy", "Design Systems", "Vector Design"]
  },
  {
    number: "02",
    title: "Website Design",
    category: "Digital Experiences",
    color: "#10b981",
    gradient: "radial-gradient(ellipse 90% 70% at 30% 50%, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.08) 35%, rgba(16, 185, 129, 0.03) 65%, rgba(16, 185, 129, 0) 100%)",
    overview: "Editorial, responsive websites where story, usability, and expression work as one.",
    stats: "From Figma to Launch • Responsive by Design",
    skills: ["Information Architecture", "Responsive Grids", "Design Systems", "Accessible Interfaces"],
    technologies: ["Next.js 16", "Tailwind CSS", "Figma Variables", "Design Systems"]
  },
  {
    number: "03",
    title: "Creative Direction",
    category: "Direction & Systems",
    color: "#f59e0b",
    gradient: "radial-gradient(ellipse 90% 70% at 30% 50%, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.08) 35%, rgba(245, 158, 11, 0.03) 65%, rgba(245, 158, 11, 0) 100%)",
    overview: "One clear creative idea carried from positioning through campaigns, products, and launch.",
    stats: "Concept to Production • One Coherent Direction",
    skills: ["Art Direction", "Sprint Leadership", "Visual Storytelling", "System Governance"],
    technologies: ["Design Systems", "Typography Hierarchy", "Figma Variables"]
  },
  {
    number: "04",
    title: "Motion Design",
    category: "Motion & Interaction",
    color: "#a855f7",
    gradient: "radial-gradient(ellipse 90% 70% at 70% 50%, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.08) 35%, rgba(168, 85, 247, 0.03) 65%, rgba(168, 85, 247, 0) 100%)",
    overview: "Motion systems that add meaning, rhythm, and recall without getting in the way.",
    stats: "Interaction to Campaign • Designed with Restraint",
    skills: ["Motion Systems", "WebGL", "Transitions", "Micro-Interactions"],
    technologies: ["GSAP ScrollTrigger", "WebGL Shaders", "React Three Fiber", "Kinetic Curves"]
  },
  {
    number: "05",
    title: "No-Code Development",
    category: "Design to Launch",
    color: "#14b8a6",
    gradient: "radial-gradient(ellipse 90% 70% at 70% 50%, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0.08) 35%, rgba(20, 184, 166, 0.03) 65%, rgba(20, 184, 166, 0) 100%)",
    overview: "High-fidelity websites built and shipped with scalable CMS foundations and responsive performance.",
    stats: "Design to Launch • CMS Ready",
    skills: ["Framer Production", "Webflow Systems", "CMS Architecture", "SEO Optimization"],
    technologies: ["No-Code Framer", "Tailwind CSS", "Design Systems"]
  },
  {
    number: "06",
    title: "AI Experiences",
    category: "Human-Centered AI",
    color: "#d946ef",
    gradient: "radial-gradient(ellipse 90% 70% at 70% 50%, rgba(217, 70, 239, 0.15) 0%, rgba(217, 70, 239, 0.08) 35%, rgba(217, 70, 239, 0.03) 65%, rgba(217, 70, 239, 0) 100%)",
    overview: "Practical AI interfaces and workflows shaped around real user needs, clear feedback, and useful outcomes.",
    stats: "Useful by Design • Human in the Loop",
    skills: ["AI Workflows", "LLM Integration", "Conversation Design", "Interactive Prototyping"],
    technologies: ["OpenAI & Claude APIs", "Next.js 16", "Tailwind CSS", "Kinetic Curves"]
  }
];

interface ExpertisePillarProps {
  onHoverService: (item: ExpertiseItem | null) => void;
  activeService: ExpertiseItem | null;
}

export default function ExpertisePillar({ onHoverService, activeService }: ExpertisePillarProps) {
  const current = activeService || EXPERTISE_ITEMS[1]; // default to Website Design if none hovered

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      {/* Left Column: Spacious 2-Column Bold Editorial List (01-03 left, 04-06 right) */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
        
        {/* Left Side (01-03) */}
        <div className="flex flex-col">
          {EXPERTISE_ITEMS.slice(0, 3).map((item) => {
            const isHovered = activeService?.title === item.title;
            const isOtherHovered = activeService && !isHovered;

            return (
              <div
                key={item.title}
                onMouseEnter={() => onHoverService(item)}
                className={`group flex items-center justify-between py-5 sm:py-6 border-b border-foreground/15 cursor-pointer transition-all duration-300 min-w-0 ${
                  isHovered
                    ? "translate-x-2 text-foreground border-foreground/60 font-semibold"
                    : isOtherHovered
                    ? "opacity-35 text-foreground/50"
                    : "text-foreground/90 hover:text-foreground"
                }`}
              >
                <div className="flex items-baseline gap-4 min-w-0 truncate">
                  <span className="font-sans font-medium text-sm md:text-base text-foreground/45 flex-shrink-0">
                    {item.number}
                  </span>
                  <span className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-semibold tracking-tight truncate leading-tight">
                    {item.title}
                  </span>
                </div>
                <span
                  className={`font-sans text-base md:text-lg font-semibold uppercase transition-all duration-300 flex-shrink-0 ml-3 ${
                    isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3 pointer-events-none"
                  }`}
                  style={{ color: item.color }}
                >
                  &rarr;
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Side (04-06) */}
        <div className="flex flex-col">
          {EXPERTISE_ITEMS.slice(3, 6).map((item) => {
            const isHovered = activeService?.title === item.title;
            const isOtherHovered = activeService && !isHovered;

            return (
              <div
                key={item.title}
                onMouseEnter={() => onHoverService(item)}
                className={`group flex items-center justify-between py-5 sm:py-6 border-b border-foreground/15 cursor-pointer transition-all duration-300 min-w-0 ${
                  isHovered
                    ? "translate-x-2 text-foreground border-foreground/60 font-semibold"
                    : isOtherHovered
                    ? "opacity-35 text-foreground/50"
                    : "text-foreground/90 hover:text-foreground"
                }`}
              >
                <div className="flex items-baseline gap-4 min-w-0 truncate">
                  <span className="font-sans font-medium text-sm md:text-base text-foreground/45 flex-shrink-0">
                    {item.number}
                  </span>
                  <span className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-semibold tracking-tight truncate leading-tight">
                    {item.title}
                  </span>
                </div>
                <span
                  className={`font-sans text-base md:text-lg font-semibold uppercase transition-all duration-300 flex-shrink-0 ml-3 ${
                    isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3 pointer-events-none"
                  }`}
                  style={{ color: item.color }}
                >
                  &rarr;
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Right Column: Spacious Glassmorphism Manifesto Pillar (No Core Deliverables shown) */}
      <div className="lg:col-span-5 w-full">
        <div className="w-full rounded-[36px] bg-foreground/[0.03] border border-foreground/15 p-8 sm:p-11 md:p-12 backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[420px] shadow-sm">
          
          {/* Number Watermark */}
          <span className="absolute -bottom-8 -right-4 font-sans text-[150px] font-black text-foreground/[0.035] select-none pointer-events-none leading-none tracking-tighter">
            {current.number}
          </span>

          {/* Inner Content (Editorial scale matching Work Section) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col justify-between h-full gap-10 relative z-10"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className="font-sans font-semibold text-xs tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-foreground/[0.06] border border-foreground/10"
                    style={{ color: current.color }}
                  >
                    ↳ {current.category}
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-foreground/60 font-medium tracking-wide">
                    {current.stats}
                  </span>
                </div>

                <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight leading-[1.1] break-words">
                  {current.title}
                </h3>

                <p className="font-sans text-lg md:text-2xl font-normal text-foreground/80 leading-[1.6] break-words">
                  {current.overview}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="pt-6 border-t border-foreground/10 flex items-center justify-between text-xs font-sans text-foreground/45 uppercase tracking-widest">
                <span>Core Discipline {current.number} / 06</span>
                <span className="font-semibold text-foreground/70" style={{ color: current.color }}>Active Specification &bull;</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
