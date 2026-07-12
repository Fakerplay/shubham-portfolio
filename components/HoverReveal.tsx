"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HoverRevealProps {
  text: string;
}

export default function HoverReveal({ text }: HoverRevealProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Position tooltip slightly offset from cursor
    setCoords({
      x: e.clientX + 15,
      y: e.clientY + 15,
    });
  };

  return (
    <span
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Target text styled as a capsule with a dashed border */}
      <span className="inline-block px-3 py-0.5 rounded-full border border-dashed border-foreground/35 group-hover:border-foreground/80 bg-foreground/5 text-xs md:text-sm font-sans font-semibold tracking-wide align-middle mx-0.5 transition-all duration-200">
        {text}
      </span>


      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              position: "fixed",
              left: coords.x,
              top: coords.y,
              pointerEvents: "none",
            }}
            className="z-50 w-44 h-44 p-1 bg-background border border-foreground/15 shadow-none overflow-hidden rounded-none"
          >
            <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src="/images/brand-identity.jpg"
                alt="Brand Identity Graphic"
                fill
                sizes="176px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
