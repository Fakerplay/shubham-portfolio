"use strict";
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExpertiseCTA() {
  const [copied, setCopied] = useState(false);
  const email = "shubhamshinde52@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full mt-16 sm:mt-20 pt-16 sm:pt-20 border-t border-foreground/15 flex flex-col gap-10 sm:gap-14">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
        
        {/* Left Side: Editorial CTA Headline */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <h3 className="font-sans text-3xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight leading-[1.08]">
            Building a team or building a brand? Let&rsquo;s talk.
          </h3>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0 self-start lg:self-end">
          <a
            href={`mailto:${email}`}
            className="group px-8 py-4 sm:py-4.5 rounded-full bg-zinc-900 border border-zinc-950 text-white font-sans font-semibold text-sm sm:text-base tracking-wide transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-zinc-850 hover:shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.35)]"
          >
            <span>Start a Conversation</span>
            <svg 
              className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-6 py-4 sm:py-4.5 rounded-full border border-zinc-850 hover:border-zinc-500 text-zinc-300 hover:text-white font-sans font-medium text-sm sm:text-base tracking-wide transition-[background-color,border-color,transform] duration-300 hover:bg-white/[0.04] active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 overflow-hidden bg-transparent"
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
                {copied ? "Email Copied!" : email}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs text-zinc-500">
              {copied ? "✓" : "⌘C"}
            </span>
          </button>
        </div>

      </div>

      {/* Bottom Minimalist Footer Strip of the Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-foreground/45 uppercase tracking-widest pt-4">
        <span>Available for select projects and roles &bull; Remote &amp; worldwide</span>
        <button
          onClick={handleScrollToTop}
          className="hover:text-foreground transition-colors duration-300 cursor-pointer flex items-center gap-1.5"
        >
          <span>Back to Top</span>
          <span>&uarr;</span>
        </button>
      </div>
    </div>
  );
}
