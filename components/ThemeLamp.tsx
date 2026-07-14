"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function ThemeLamp() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-6 h-8 flex items-center justify-center opacity-20">
        <span className="w-1.5 h-6 bg-current rounded-full" />
      </div>
    );
  }

  // Determine if night theme is active (either explicitly or resolved in auto)
  const isNight =
    theme === "night" ||
    (theme === "auto" &&
      typeof window !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "night");

  const handleToggle = () => {
    setTheme(isNight ? "day" : "night");
  };

  return (
    <button
      onClick={handleToggle}
      className="relative min-w-11 min-h-11 text-foreground hover:opacity-85 active:scale-[0.97] transition-[opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 rounded-md flex items-center justify-center cursor-pointer"
      title={isNight ? "Turn on lights (Day)" : "Turn off lights (Night)"}
      aria-label={isNight ? "Turn on lights (Day)" : "Turn off lights (Night)"}
    >
      <svg
        width="28"
        height="36"
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current"
      >
        {/* Hanging Wire Cord */}
        <line x1="12" y1="0" x2="12" y2="7" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Top Socket Cap (Rounded top capsule) */}
        <path 
          d="M 10.5,12 L 10.5,9 A 1.5,1.5 0 0 1 13.5,9 L 13.5,12 Z" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
          fill="none" 
        />

        {/* Wide Curved Lamp Shade */}
        <path
          d="M 4,17 C 4,13 6.5,12.5 12,12.5 C 17.5,12.5 20,13 20,17 A 1,1 0 0 1 19,18 L 5,18 A 1,1 0 0 1 4,17 Z"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Hanging Bulb (U-shape) */}
        <motion.path
          d="M 9.5,18 C 9.5,21.5 12,22 12,22 C 12,22 14.5,21.5 14.5,18"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ fill: isNight ? "currentColor" : "rgba(0,0,0,0)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Hanging Pull Chain String (on the right) */}
        <line 
          x1="16.5" 
          y1="18" 
          x2="16.5" 
          y2="28" 
          strokeWidth="1" 
          className="opacity-70"
        />
        {/* Pull Chain weight (circular bead) */}
        <circle 
          cx="16.5" 
          cy="28.5" 
          r="1.5" 
          fill="currentColor" 
          className="opacity-90"
        />

        {/* Ambient Glow beam radiating from bulb when night mode is active */}
        <motion.polygon
          points="12,22 5,30 19,30"
          fill="currentColor"
          className="stroke-none"
          initial={false}
          animate={{ opacity: isNight ? 0.15 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </button>
  );
}
