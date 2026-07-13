"use strict";
"use client";

import React, { useState } from "react";
import { ExpertiseItem } from "./ExpertisePillar";
import ExpertiseMatrix from "./ExpertiseMatrix";
import ExpertiseCTA from "./ExpertiseCTA";

export default function ServicesShowcase() {
  const [hoveredService, setHoveredService] = useState<ExpertiseItem | null>(null);

  return (
    <section
      id="expertise"
      className="scroll-mt-24 w-[100vw] relative left-1/2 -translate-x-1/2 py-20 md:py-32 border-y border-foreground/10 bg-background overflow-hidden select-none z-10"
    >
      {/* Subtle, restrained micro-grain texture overlay (matching editorial tactile feel without color flashing) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "120px 120px"
        }}
      />

      {/* Main Container */}
      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 md:gap-16">
          
          {/* Clean Section Header (Consistent with Featured Work & About) */}
          <div className="flex flex-col gap-3 pb-8 border-b border-foreground/15">
            <h2 className="font-sans text-3xl md:text-5xl text-foreground font-semibold tracking-tight">
              Core Capabilities
            </h2>
          </div>

          {/* Restrained, Editorial Matrix Ledger */}
          <div className="w-full relative">
            <ExpertiseMatrix onHoverService={setHoveredService} activeService={hoveredService} />
          </div>

          {/* Call To Action (CTA) Section */}
          <ExpertiseCTA />

        </div>
      </div>
    </section>
  );
}
