"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "./ThemeContext";

interface ProjectCTAProps {
  nextProject?: {
    slug: string;
    brand: string;
    title: string;
  };
}

export default function ProjectCTA({ nextProject }: ProjectCTAProps) {
  const { theme } = useTheme();
  const isDark = theme === "night" || theme === "aurora" || theme === "neon";
  const surface = isDark ? "dark" : "light";
  const email = "shubhamshinde52@gmail.com";

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-20 pb-28 flex flex-col gap-20">
      
      {/* High-Impact Post-Showcase CTA Box (Matching Hero Section Aesthetic) */}
      <div data-surface={surface} className="relative overflow-hidden rounded-[32px] bg-foreground/[0.03] border border-foreground/15 p-8 md:p-16 text-foreground shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 group transition-colors duration-500">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl pointer-events-none group-hover:bg-foreground/10 transition-colors duration-700" />

        {/* Left Side: Editorial Pitch */}
        <div className="flex flex-col gap-6 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-foreground/[0.05] border border-foreground/15 text-xs font-mono text-foreground/80 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-wider">Available for select projects and roles</span>
          </div>
          <h3 className="font-serif text-3xl md:text-5xl font-light leading-[1.2] tracking-tight text-foreground">
            Building a team or building a brand? Let&rsquo;s talk.
          </h3>
        </div>

        {/* Right Side: Action Trigger Buttons (Branched Audiences) */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto flex-shrink-0 relative z-10">
          <a
            href={`mailto:${email}?subject=Discuss%20a%20project`}
            className="group/btn btn-primary inline-flex items-center justify-center gap-3.5 px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] cursor-pointer text-center"
          >
            <span>Discuss a project</span>
            <svg 
              className="w-4 h-4 text-current transform group-hover/btn:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <a
            href={`mailto:${email}?subject=Talk%20about%20a%20role`}
            className="group/btn btn-secondary inline-flex items-center justify-center gap-3.5 px-8 py-4 rounded-full font-sans font-medium text-sm tracking-wide transition-[background-color,border-color,transform] duration-300 active:scale-[0.97] cursor-pointer overflow-hidden text-center"
          >
            <span>Talk about a role</span>
            <svg 
              className="w-4 h-4 text-current transform group-hover/btn:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Next Case Study Preview Banner */}
      {nextProject && (
        <div className="pt-8 border-t border-foreground/15 flex flex-col gap-6">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground/50">
            MORE WORK
          </span>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group/next block rounded-2xl p-6 md:p-10 border border-foreground/15 hover:border-foreground/40 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-[background-color,border-color] duration-500 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div>
                <span className="font-sans font-medium text-xs md:text-sm uppercase tracking-wider text-foreground/60 block mb-2">
                  View next project
                </span>
                <h4 className="font-serif text-3xl md:text-5xl font-light text-foreground group-hover/next:translate-x-2 transition-transform duration-500">
                  {nextProject.brand} <span className="text-foreground/40 font-sans text-2xl md:text-4xl">&mdash; {nextProject.title}</span>
                </h4>
              </div>

              <div className="w-14 h-14 rounded-full border border-foreground/20 group-hover/next:border-foreground group-hover/next:bg-foreground group-hover/next:text-background flex items-center justify-center transition-[color,background-color,border-color] duration-500 text-lg flex-shrink-0">
                &rarr;
              </div>
            </div>
          </Link>
        </div>
      )}

    </section>
  );
}
