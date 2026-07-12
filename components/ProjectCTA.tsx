"use strict";
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCTAProps {
  nextProject: {
    slug: string;
    brand: string;
    title: string;
  };
}

export default function ProjectCTA({ nextProject }: ProjectCTAProps) {
  const [copied, setCopied] = useState(false);
  const email = "shubhamshinde52@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-20 pb-28 flex flex-col gap-20">
      
      {/* High-Impact Post-Showcase CTA Box (Matching Hero Section Aesthetic) */}
      <div className="relative overflow-hidden rounded-[32px] bg-foreground/[0.03] border border-foreground/15 p-8 md:p-16 text-foreground shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 group transition-colors duration-500">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl pointer-events-none group-hover:bg-foreground/10 transition-colors duration-700" />

        {/* Left Side: Editorial Pitch */}
        <div className="flex flex-col gap-6 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-foreground/[0.05] border border-foreground/15 text-xs font-mono text-foreground/80 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-wider">Available for New Collaborations</span>
          </div>
          <h3 className="font-serif text-3xl md:text-5xl font-light leading-[1.2] tracking-tight text-foreground">
            Inspired by what you see? <br className="hidden sm:inline" />Let’s craft your next chapter.
          </h3>
          <p className="font-serif text-lg md:text-xl text-foreground/75 leading-relaxed font-light">
            Whether you need a full-scale brand identity, immersive motion design, or a state-of-the-art web platform, I collaborate with visionary founders and product teams worldwide.
          </p>
        </div>

        {/* Right Side: Action Trigger Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto flex-shrink-0 relative z-10">
          <a
            href={`mailto:${email}?subject=Project%20Discovery%20Call`}
            className="group/btn inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-sans font-semibold text-sm tracking-wide transition-[transform,opacity] duration-300 shadow-md hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Book a 30-Min Discovery Call</span>
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1 sm:inline">&rarr;</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-foreground/[0.05] hover:bg-foreground/[0.1] border border-foreground/15 text-foreground font-mono text-xs tracking-wider uppercase transition-colors duration-300 cursor-pointer overflow-hidden"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={copied ? "copied" : "copy"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="inline-block"
              >
                {copied ? "✓ Email Copied!" : `Copy Email (${email})`}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Next Case Study Preview Banner */}
      {nextProject && (
        <div className="pt-8 border-t border-foreground/15 flex flex-col gap-6">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground/50">
            CONTINUE EXPLORING
          </span>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group/next block rounded-2xl p-6 md:p-10 border border-foreground/15 hover:border-foreground/40 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-[background-color,border-color] duration-500 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div>
                <span className="font-sans font-medium text-xs md:text-sm uppercase tracking-wider text-foreground/60 block mb-2">
                  Next Case Study
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
