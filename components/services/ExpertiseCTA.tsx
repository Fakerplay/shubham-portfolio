"use client";

import React from "react";

export default function ExpertiseCTA() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="contact" className="scroll-mt-24 w-full mt-16 sm:mt-20 pt-16 sm:pt-20 border-t border-foreground/15 flex flex-col gap-10 sm:gap-14">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
        
        {/* Left Side: Editorial CTA Headline */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-foreground tracking-tight leading-[1.08] text-balance">
            Have a project—or building a design team? Let&rsquo;s talk.
          </h3>
        </div>

        {/* Right Side: Action Buttons (Branched Audiences) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0 self-start lg:self-end">
          <a
            href="mailto:shubhamshinde52@gmail.com?subject=Discuss%20a%20project"
            className="group btn-primary px-8 py-4 sm:py-4.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.96] cursor-pointer flex items-center justify-center gap-3.5 text-center shadow-lg"
          >
            <span>Discuss a project</span>
            <svg 
              className="w-4 h-4 text-current transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <a
            href="mailto:shubhamshinde52@gmail.com?subject=Talk%20about%20a%20role"
            className="group btn-secondary px-8 py-4 sm:py-4.5 rounded-full font-sans font-medium text-sm sm:text-base tracking-wide transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 active:scale-[0.96] cursor-pointer flex items-center justify-center gap-3.5 text-center bg-transparent"
          >
            <span>Talk about a role</span>
            <svg 
              className="w-4 h-4 text-current transform group-hover:translate-x-1 transition-transform duration-300" 
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
