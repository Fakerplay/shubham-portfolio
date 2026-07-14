"use strict";
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_DATA } from "./servicesData";

export default function ServicesAccordion() {
  const [openId, setOpenId] = useState<string | null>(SERVICES_DATA[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col border-t border-foreground/15">
      {SERVICES_DATA.map((service) => {
        const isOpen = openId === service.id;

        return (
          <div
            key={service.id}
            className="border-b border-foreground/15 transition-colors duration-500"
          >
            {/* Trigger Row (Pure Sans Font matching Work Section) */}
            <button
              onClick={() => toggleAccordion(service.id)}
              className="w-full py-10 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="font-sans font-medium text-xs md:text-sm tracking-widest text-foreground/45 group-hover:text-foreground/80 transition-colors">
                  {service.number}
                </span>
                <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl font-normal text-foreground group-hover:translate-x-2 transition-transform duration-500 leading-tight tracking-tight">
                  {service.title}
                </h3>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-12 pl-12 md:pl-0 w-full md:w-auto">
                <span className="font-sans text-sm text-foreground/50 font-normal hidden lg:block max-w-xs text-right tracking-wide">
                  {service.subtitle}
                </span>
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                    isOpen
                      ? "bg-foreground text-background rotate-45 border-foreground scale-105"
                      : "border-foreground/20 group-hover:border-foreground text-foreground"
                  }`}
                >
                  <span className="font-sans text-lg leading-none font-semibold">+</span>
                </div>
              </div>
            </button>

            {/* Content Area */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-14 md:pb-20 pl-0 md:pl-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 pt-2">
                    {/* Overview Paragraph */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <p className="font-sans text-base md:text-xl text-foreground/80 font-normal leading-[1.6] tracking-tight">
                        {service.overview}
                      </p>
                    </div>

                    {/* Deliverables List */}
                    <div className="lg:col-span-5 flex flex-col gap-5 pt-2 lg:border-l lg:border-foreground/10 lg:pl-10">
                      <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-foreground/45 block">
                        CAPABILITIES MATRIX
                      </span>
                      <ul className="flex flex-col gap-3 font-sans text-sm md:text-base text-foreground/75 font-normal">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <span className="font-sans font-medium text-xs text-foreground/35">0{idx + 1}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
