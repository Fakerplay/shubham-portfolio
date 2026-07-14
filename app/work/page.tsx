"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ProjectCTA from "@/components/ProjectCTA";
import { EASE_OUT } from "@/lib/motion";
import LazyVideo from "@/components/LazyVideo";

interface ProjectItem {
  slug: string;
  brand: string;
  logoColor?: string;
  year: string;
  title: string;
  category: string[];
  image: string;
  video?: string;
  description: string;
  tags: string[];
  outcome: string;
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    slug: "daulat-finvest",
    brand: "Daulat Finvest",
    logoColor: "#10b981", // Emerald accent
    year: "2026",
    title: "Wealth management crafted around your portfolio",
    category: ["All Projects", "Fintech & Wealth", "UI/UX & Systems", "Creative Direction"],
    video: "/videos/daulat-cover.mp4",
    image: "/images/daulat-thumb.jpg",
    description: "Designed a clearer wealth management experience for portfolio tracking, performance, and advisor communication.",
    tags: ["Product Design", "UI/UX Systems", "Wealth Management", "Creative Direction"],
    outcome: "Unified digital wealth experience"
  },
  {
    slug: "solaris",
    brand: "Solaris",
    logoColor: "#f59e0b", // Radiant amber gold
    year: "2024 - 2025",
    title: "A fintech identity shaped by light, precision, and possibility",
    category: ["All Projects", "Fintech & Wealth", "Brand Identity", "Creative Direction"],
    video: "/videos/solaris-2.mp4",
    image: "/images/solaris-cover.png",
    description: "Built the Solaris identity across brand, 3D, digital, and investor communications.",
    tags: ["Brand Identity", "Creative Direction", "3D Visuals", "Fintech"],
    outcome: "Unified brand-to-product visual system"
  },
  {
    slug: "optiv",
    brand: "Optiv",
    logoColor: "#6366f1", // Sleek indigo/violet architectural tone
    year: "2025",
    title: "Making complex technology feel clear and approachable",
    category: ["All Projects", "Brand Identity", "Creative Direction"],
    video: "/videos/Cover_Optiv_1080.mp4",
    image: "/images/optiv/About.png",
    description: "Created a scalable Optiv identity across logo, digital, physical, and campaign touchpoints.",
    tags: ["Brand Identity", "Logo Design", "Visual System", "Creative Direction"],
    outcome: "Scalable cross-channel identity system"
  },
  {
    slug: "studio-vistara",
    brand: "Studio Vistara",
    logoColor: "#a8a29e", // Warm stone & earthy architectural tone
    year: "2025 - Present",
    title: "An architectural identity built from structure, material, and calm",
    category: ["All Projects", "Brand Identity", "Creative Direction"],
    video: "/videos/studio-vistara-1.mp4",
    image: "/images/studio-vistara-cover.png",
    description: "Translated Studio Vistara’s spatial sensibility into a tactile, adaptable identity system.",
    tags: ["Brand Identity", "Typography System", "Stationery & Packaging", "Creative Direction"],
    outcome: "Cohesive tactile and digital identity"
  },
  {
    slug: "solace",
    brand: "Solace",
    logoColor: "#111111", // Sleek luxury charcoal/black accent
    year: "2025",
    title: "Quiet confidence for a modern wellness brand",
    category: ["All Projects", "Brand Identity", "Creative Direction"],
    image: "/images/solace/Solace Cover.png",
    description: "Crafted a serene, highly sophisticated brand identity and premium packaging design ecosystem for Solace, bridging organic geometry with luxury editorial typography.",
    tags: ["Brand Identity", "Packaging Design", "Creative Direction", "Visual System"],
    outcome: "Scalable packaging and brand system"
  }
];

const CATEGORIES = [
  "All Projects",
  "Fintech & Wealth",
  "Brand Identity",
  "Creative Direction",
  "UI/UX & Systems"
];

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("All Projects");

  const filteredProjects = ALL_PROJECTS.filter((p) =>
    activeTab === "All Projects" ? true : p.category.includes(activeTab)
  );

  return (
    <div className="w-full flex flex-col items-center pt-32 pb-24 text-foreground selection:bg-emerald-500/20 selection:text-emerald-400">
      
      {/* 1. Hero Header & Editorial Introduction */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col gap-8 mb-16">
        <div className="flex flex-col gap-4">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground leading-[1.05]">
            Selected Work Across <br className="hidden sm:inline" />
            <span className="italic font-normal text-foreground/90">Brand, Web &amp; Motion.</span>
          </h1>
        </div>
        {/* 2. Interactive Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-foreground/10">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-5 py-2.5 rounded-xl font-sans text-xs md:text-sm font-medium active:scale-[0.97] transition-[background-color,color,border-color,transform] duration-300 select-none cursor-pointer border ${
                  isActive
                    ? "bg-foreground text-background border-transparent shadow-md font-semibold"
                    : "bg-foreground/[0.03] text-foreground/70 border-foreground/15 hover:bg-foreground/[0.08] hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Projects Showcase List */}
      <section className="w-full flex flex-col gap-24 md:gap-36">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.06 }}
              className="w-full px-6 md:px-16 lg:px-24 flex flex-col group select-none"
            >
              <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 md:gap-12">
                
                {/* Top Header: Brand Label + Massive Headline */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-foreground/10 pb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      0{index + 1}
                    </span>
                    <span className="font-sans font-semibold tracking-wider text-sm md:text-base uppercase text-foreground/75">
                      {project.brand}
                    </span>
                  </div>
                  <span className="font-mono text-xs md:text-sm text-foreground/50">
                    {project.year}
                  </span>
                </div>

                <Link href={`/work/${project.slug}`} prefetch={false} className="hover:opacity-85 transition-opacity">
                  <h2 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-[1.05]">
                    {project.title}
                  </h2>
                </Link>

                {/* Centerpiece: Full-Width Cinematic Cover Showcase */}
                <Link href={`/work/${project.slug}`} prefetch={false} className="block w-full">
                  <div className="relative w-full aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden border border-foreground/15 shadow-2xl bg-foreground/[0.02]">
                    {project.video || project.image?.endsWith(".mp4") || project.image?.endsWith(".webm") ? (
                      <LazyVideo
                        src={project.video || project.image}
                        poster={project.image?.endsWith(".mp4") || project.image?.endsWith(".webm") ? undefined : project.image}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
                      />
                    ) : (
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        quality={85}
                        sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1280px) calc(100vw - 128px), 1280px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
                      />
                    )}
                    
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Sleek floating interactive badge */}
                    <div className="absolute bottom-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                      <div className="px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-md text-white font-sans text-xs font-medium tracking-wide border border-white/20 flex items-center gap-2 shadow-lg">
                        <span>Explore Case Study</span>
                        <span>&rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Bottom Editorial Content & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-2 items-start">
                  <div className="lg:col-span-7 flex flex-col justify-between h-full gap-8">
                    <div className="flex flex-col gap-2 pt-5 border-t border-foreground/15">
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="px-3.5 py-1.5 rounded-lg bg-foreground/[0.04] border border-foreground/15 text-xs font-sans font-medium text-foreground/85 transition-colors duration-300 hover:bg-foreground/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Qualitative Outcome */}
                  <div className="lg:col-span-5 flex flex-row lg:flex-col justify-end lg:justify-start gap-8 lg:gap-10 pt-4 lg:pt-0 border-t lg:border-t-0 border-foreground/15">
                    <div className="flex flex-col gap-1 border-l-2 border-emerald-500/80 pl-4 text-left">
                      <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-foreground/50">
                        Outcome
                      </span>
                      <span className="font-sans text-xl md:text-2xl font-medium tracking-tight text-foreground leading-[1.3]">
                        {project.outcome}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* 4. Bottom CTA Section */}
      <div className="w-full pt-16">
        <ProjectCTA
          nextProject={{
            slug: "daulat-finvest",
            brand: "Daulat Finvest",
            title: "Wealth management crafted around your portfolio"
          }}
        />
      </div>

    </div>
  );
}
