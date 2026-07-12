"use strict";
"use client";

import React from "react";
import { SERVICES_DATA } from "./servicesData";

export default function ServicesGrid() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 pt-10 border-t border-foreground/15">
      {SERVICES_DATA.map((service) => (
        <div
          key={service.id}
          className="group flex flex-col justify-between gap-10 transition-all duration-500"
        >
          {/* Top Header Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <span className="font-sans font-medium text-xs tracking-widest text-foreground/45 uppercase">
                {service.tag}
              </span>
              <span className="font-sans font-medium text-xs text-foreground/40">
                {service.number} / 04
              </span>
            </div>

            <h3 className="font-sans text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-[1.2] tracking-tight group-hover:translate-x-1.5 transition-transform duration-500">
              {service.title}
            </h3>

            <p className="font-sans text-sm md:text-base text-foreground/75 font-normal leading-[1.6] max-w-xl">
              {service.overview}
            </p>
          </div>

          {/* Bottom Streamlined Deliverables String */}
          <div className="pt-6 border-t border-foreground/10 flex flex-col gap-2.5">
            <span className="font-sans font-semibold text-[11px] tracking-widest uppercase text-foreground/40">
              SPECIFICATIONS &amp; DELIVERABLES
            </span>
            <div className="font-sans text-xs md:text-sm text-foreground/65 leading-relaxed font-normal">
              {service.deliverables.join(" — ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
