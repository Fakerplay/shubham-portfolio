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
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-sans font-semibold text-xs tracking-widest uppercase text-foreground/50">
              INITIATE ENGAGEMENT
            </span>
          </div>
          <h3 className="font-sans text-3xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight leading-[1.08]">
            Have an ambitious vision? Let&rsquo;s craft digital excellence together.
          </h3>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0 self-start lg:self-end">
          <a
            href={`mailto:${email}`}
            className="px-8 py-4.5 rounded-full bg-foreground text-background font-sans font-semibold text-sm sm:text-base tracking-wide transition-[transform,opacity] duration-300 hover:scale-[1.02] hover:opacity-95 shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 text-center"
          >
            <span>Start a Conversation</span>
            <span>&rarr;</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-6 py-4.5 rounded-full border border-foreground/20 hover:border-foreground/50 text-foreground font-sans font-medium text-sm sm:text-base tracking-wide transition-[background-color,border-color,transform] duration-300 hover:bg-foreground/[0.04] active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 overflow-hidden"
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
            <span className="text-xs text-foreground/45">
              {copied ? "✓" : "⌘C"}
            </span>
          </button>
        </div>

      </div>

      {/* Bottom Minimalist Footer Strip of the Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-foreground/45 uppercase tracking-widest pt-4">
        <span>Available for Q3 / Q4 Sprints &bull; Remote & Worldwide</span>
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
