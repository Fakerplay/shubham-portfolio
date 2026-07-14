"use strict";
"use client";

import React, { useState } from "react";
import { Reorder, motion } from "framer-motion";
import { EXPERTISE_ITEMS, ExpertiseItem } from "./ExpertisePillar";

interface ExpertiseStackProps {
  onHoverService: (item: ExpertiseItem | null) => void;
}

export default function ExpertiseStack({ onHoverService }: ExpertiseStackProps) {
  const [items, setItems] = useState<ExpertiseItem[]>(EXPERTISE_ITEMS);
  const topThree = items.slice(0, 3);

  const handleProposalClick = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      {/* Left Column: Spacious Draggable Gamified Stack */}
      <div className="lg:col-span-7 w-full flex flex-col gap-6 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-foreground/15">
          <span className="font-sans font-semibold text-xs tracking-widest uppercase text-foreground/60">
            DRAGGABLE PRIORITY STACK
          </span>
          <span className="font-sans text-xs sm:text-sm text-foreground/60 font-normal">
            Drag items up or down to configure top project priorities
          </span>
        </div>

        <Reorder.Group axis="y" values={items} onReorder={setItems} className="flex flex-col gap-3.5 w-full">
          {items.map((item, idx) => {
            const isTopThree = idx < 3;

            return (
              <Reorder.Item
                key={item.title}
                value={item}
                onMouseEnter={() => onHoverService(item)}
                onMouseLeave={() => onHoverService(null)}
                className={`flex items-center justify-between p-5 sm:p-6 rounded-2xl border cursor-grab active:cursor-grabbing transition-colors duration-300 select-none min-w-0 relative ${
                  isTopThree
                    ? "bg-foreground/[0.06] border-foreground/40 shadow-sm"
                    : "bg-foreground/[0.015] border-foreground/15 hover:border-foreground/30"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0 truncate pr-3">
                  <div className="flex items-center gap-1.5 text-foreground/35 flex-shrink-0">
                    <span className="w-1.5 h-4 rounded-full bg-foreground/25" />
                    <span className="w-1.5 h-4 rounded-full bg-foreground/25" />
                  </div>
                  <span
                    className={`font-sans font-semibold text-xs sm:text-sm px-3 py-1 rounded-full border flex-shrink-0 ${
                      isTopThree
                        ? "bg-foreground text-background border-foreground"
                        : "bg-foreground/[0.03] border-foreground/10 text-foreground/50"
                    }`}
                  >
                    #{idx + 1}
                  </span>
                  <span className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold text-foreground tracking-tight truncate leading-tight">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-sans text-sm text-foreground/60 hidden md:inline font-medium whitespace-nowrap">
                    {item.category}
                  </span>
                  <span
                    className="font-sans text-base md:text-lg font-semibold uppercase tracking-widest"
                    style={{ color: item.color }}
                  >
                    &equiv;
                  </span>
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>

      {/* Right Column: Spacious Proposal Spec Container */}
      <div className="lg:col-span-5 w-full lg:sticky lg:top-32">
        <div className="w-full rounded-[36px] bg-foreground/[0.03] border border-foreground/15 p-8 sm:p-11 md:p-12 backdrop-blur-md flex flex-col justify-between gap-8 shadow-sm min-h-[420px]">
          <div className="flex flex-col gap-4">
            <span className="font-sans font-semibold text-xs tracking-widest uppercase text-foreground/60">
              CUSTOM ENGAGEMENT SPEC
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-foreground tracking-tight leading-[1.1]">
              Configured Architecture
            </h3>
            <p className="font-sans text-lg md:text-2xl text-foreground/80 font-normal leading-[1.6]">
              We tailor our team topology and design sprints directly around your selected top 3 core disciplines below.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-foreground/10">
            <span className="font-sans font-semibold text-[11px] tracking-widest uppercase text-foreground/45">
              ACTIVE SPRINT FOCUS
            </span>
            {topThree.map((item, index) => (
              <div
                key={item.title}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-foreground/[0.04] border border-foreground/10 min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0 truncate pr-2">
                  <span className="font-sans font-semibold text-xs sm:text-sm text-foreground/50 flex-shrink-0">0{index + 1}</span>
                  <span className="font-sans text-base sm:text-lg font-semibold text-foreground truncate">{item.title}</span>
                </div>
                <span className="font-sans text-xs sm:text-sm font-medium text-foreground/65 flex-shrink-0 whitespace-nowrap">{item.category}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleProposalClick}
            className="w-full py-4 px-6 sm:px-8 rounded-2xl bg-foreground text-background font-sans font-semibold text-base tracking-wide transition-all duration-300 hover:opacity-90 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-3 shadow-sm whitespace-nowrap"
          >
            <span>Start Sprint with Priorities</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

    </div>
  );
}
