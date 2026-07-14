"use strict";
"use client";

import React from "react";
import { EXPERTISE_ITEMS, ExpertiseItem } from "./ExpertisePillar";

interface ExpertiseMatrixProps {
  onHoverService: (item: ExpertiseItem | null) => void;
  activeService: ExpertiseItem | null;
}

export default function ExpertiseMatrix({ onHoverService, activeService }: ExpertiseMatrixProps) {
  return (
    <div className="w-full flex flex-col">
      {/* 1-Column Editorial Focus Ledger (Restrained & Architectural) */}
      <div className="flex flex-col border-t border-foreground/15">
        {EXPERTISE_ITEMS.map((item) => {
          const isServiceHovered = activeService?.title === item.title;
          const isDimmed = activeService && !isServiceHovered;

          return (
            <div
              key={item.title}
              onMouseEnter={() => onHoverService(item)}
              onMouseLeave={() => onHoverService(null)}
              className={`group flex items-center justify-between py-6 sm:py-7 border-b border-foreground/15 cursor-pointer transition-[color,border-color,transform] duration-300 min-w-0 ${
                isServiceHovered
                  ? "translate-x-2 border-foreground/50 text-foreground"
                  : isDimmed
                  ? "opacity-35 text-foreground/50"
                  : "text-foreground/85 hover:text-foreground"
              }`}
            >
              {/* Left: Number + Title */}
              <div className="flex items-baseline gap-4 min-w-0 truncate">
                <span
                  className={`font-mono text-xs sm:text-sm transition-colors duration-300 flex-shrink-0 ${
                    isServiceHovered ? "text-foreground/80 font-medium" : "text-foreground/45"
                  }`}
                >
                  {item.number}
                </span>
                <span
                  className={`font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[36px] tracking-tight truncate leading-tight transition-colors duration-300 ${
                    isServiceHovered ? "font-semibold text-foreground" : "font-medium text-foreground/85"
                  }`}
                >
                  {item.title}
                </span>
              </div>
              
              {/* Right: Unboxed Discipline Specification + Subtle Editorial Arrow */}
              <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                <span
                  className={`font-sans text-xs sm:text-sm tracking-tight transition-colors duration-300 whitespace-nowrap ${
                    isServiceHovered
                      ? "text-foreground/90 font-medium"
                      : "text-foreground/55 font-normal"
                  }`}
                >
                  {item.category}
                </span>

                <span
                  className={`font-sans text-base sm:text-lg transition-[opacity,transform] duration-300 ${
                    isServiceHovered
                      ? "opacity-100 translate-x-0 text-foreground"
                      : "opacity-0 -translate-x-2 pointer-events-none text-foreground/40"
                  }`}
                >
                  &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
