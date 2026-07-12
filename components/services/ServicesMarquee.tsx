"use strict";
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_DATA } from "./servicesData";

export default function ServicesMarquee() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentService = SERVICES_DATA[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SERVICES_DATA.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SERVICES_DATA.length) % SERVICES_DATA.length);
  };

  return (
    <div className="w-full flex flex-col gap-10 pt-6">
      {/* Top Index Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-foreground/15">
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          {SERVICES_DATA.map((service, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={service.id}
                onClick={() => setActiveIdx(idx)}
                className={`font-sans text-base md:text-xl transition-all duration-300 cursor-pointer flex items-baseline gap-2 pb-1 relative ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-foreground/45 hover:text-foreground/80 font-normal"
                }`}
              >
                <span className="font-sans font-medium text-xs text-foreground/40">{service.number}</span>
                <span>{service.title.split(" & ")[0]}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-4 self-end sm:self-auto">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background flex items-center justify-center transition-all duration-300 cursor-pointer font-sans font-semibold text-base"
            title="Previous Capability"
          >
            ←
          </button>
          <span className="font-sans font-medium text-xs text-foreground/50 px-1">
            {currentService.number} / 04
          </span>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background flex items-center justify-center transition-all duration-300 cursor-pointer font-sans font-semibold text-base"
            title="Next Capability"
          >
            →
          </button>
        </div>
      </div>

      {/* Featured Card Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentService.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-[32px] bg-foreground/[0.02] border border-foreground/15 p-8 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-12 lg:gap-20 justify-between relative overflow-hidden shadow-sm"
        >
          {/* Background Number Watermark */}
          <span className="absolute -bottom-12 -right-8 font-sans text-[220px] md:text-[360px] font-black text-foreground/[0.02] select-none pointer-events-none leading-none tracking-tighter">
            {currentService.number}
          </span>

          {/* Left Column: Title & Overview */}
          <div className="flex flex-col gap-6 max-w-3xl relative z-10">
            <span className="font-sans font-medium text-xs tracking-widest uppercase text-foreground/45">
              {currentService.tag}
            </span>
            <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.12] tracking-tight">
              {currentService.title}
            </h3>
            <p className="font-sans text-base md:text-xl text-foreground/80 font-normal leading-[1.6]">
              {currentService.overview}
            </p>
          </div>

          {/* Right Column: Specifications Matrix */}
          <div className="w-full lg:max-w-md flex flex-col justify-between gap-10 lg:border-l lg:border-foreground/15 lg:pl-12 relative z-10 self-stretch">
            <div className="flex flex-col gap-5">
              <span className="font-sans font-semibold text-[11px] tracking-widest uppercase text-foreground/40 block">
                CORE DELIVERABLES
              </span>
              <ul className="flex flex-col gap-3.5">
                {currentService.deliverables.map((item, idx) => (
                  <li key={idx} className="font-sans text-sm md:text-base text-foreground/85 flex items-center gap-3.5 font-normal">
                    <span className="font-sans font-medium text-xs text-foreground/35">0{idx + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-foreground/10 flex items-center justify-between text-[11px] font-sans font-medium text-foreground/40 uppercase tracking-widest">
              <span>ARCHITECTURE MATRIX</span>
              <span>2026 EDITION</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
