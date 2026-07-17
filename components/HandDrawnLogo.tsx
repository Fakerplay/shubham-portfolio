"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { EASE_IN_OUT } from "@/lib/motion";

export default function HandDrawnLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
  }, []);

  const isNight = mounted && (theme === "night" || theme === "evening" || theme === "neon" || theme === "aurora");

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={reduceMotion ? {} : { scale: 1.05, rotate: 3 }}
      whileTap={reduceMotion ? {} : { scale: 0.96 }}
      className="relative cursor-pointer select-none"
      style={{ width: 58, height: 58 }}
    >
      <svg
        width="58"
        height="58"
        viewBox="0 0 48 48"
        className={reduceMotion || !isHovered ? "" : "animate-[wobble_0.35s_steps(1)_infinite]"}
        style={{ transformOrigin: "center" }}
      >
        <defs>
          {/* 4 separate displacement noise filters to simulate hand-drawn frames */}
          <filter id="wobble-f1">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="wobble-f2">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="wobble-f3">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="10" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="wobble-f4">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="15" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <g className="text-foreground stroke-current" fill="none">
          {isNight ? (
            // NIGHT STATE: Crescent Moon and Twinkling Stars
            <>
              {/* Wobbly Crescent Moon Path */}
              <path
                d="M 28,11 A 13.5,13.5 0 0,0 28,37 A 10.5,10.5 0 0,1 28,11"
                strokeWidth="2.2"
                fill="none"
              />

              {/* Twinkling Star 1 */}
              <motion.path
                d="M 37,14 L 37,17 M 35.5,15.5 L 38.5,15.5"
                strokeWidth="1.8"
                strokeLinecap="round"
                animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 90, 0] } : {}}
                transition={{ duration: 0.8, ease: EASE_IN_OUT }}
                style={{ transformOrigin: "37px 15.5px" }}
              />

              {/* Twinkling Star 2 */}
              <motion.path
                d="M 34,27 L 34,29 M 33,28 L 35,28"
                strokeWidth="1.6"
                strokeLinecap="round"
                animate={isHovered ? { scale: [1, 1.3, 1], rotate: [0, -90, 0] } : {}}
                transition={{ duration: 0.8, ease: EASE_IN_OUT, delay: 0.15 }}
                style={{ transformOrigin: "34px 28px" }}
              />

              {/* Sleepy Moon Face expression inside the crescent curve */}
              {isHovered ? (
                // Hover state: eyes open (dots) and wide smile
                <>
                  <circle cx="21" cy="22.5" r="1.3" fill="currentColor" stroke="none" />
                  <path
                    d="M 20.5,27 Q 22.5,29 23.5,27"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                // Default state: sleepy closed eye and gentle small smile
                <>
                  <path
                    d="M 19.5,22 Q 21,23.5 22.5,22"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20.5,27.5 Q 22.2,28.7 23.5,27.5"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </>
              )}
            </>
          ) : (
            // DAY/OTHER STATE: Happy Sun/Sparkle Face
            <>
              {/* Main wobbly face container circle */}
              <circle
                cx="24"
                cy="24"
                r="13.5"
                strokeWidth="2.2"
                fill="none"
              />

              {/* Sparkly / Sun-like ray strokes */}
              <path d="M 24,4 L 24,7" strokeWidth="2" strokeLinecap="round" />
              <path d="M 41,24 L 44,24" strokeWidth="2" strokeLinecap="round" />
              <path d="M 24,41 L 24,44" strokeWidth="2" strokeLinecap="round" />
              <path d="M 4,24 L 7,24" strokeWidth="2" strokeLinecap="round" />
              <path d="M 36,12 L 38.5,9.5" strokeWidth="2" strokeLinecap="round" />
              <path d="M 12,12 L 9.5,9.5" strokeWidth="2" strokeLinecap="round" />

              {/* Dynamic expression rendering */}
              {isHovered ? (
                // Hover state: eyes blinking (arched paths) and wider smile
                <>
                  <path
                    d="M 17,21.5 Q 19,23 21,21.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 27,21.5 Q 29,23 31,21.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20.5,27.5 Q 24,31.5 27.5,27.5"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                // Default state: open eyes (dots) and gentle smile
                <>
                  <circle cx="19" cy="21.5" r="1.8" fill="currentColor" stroke="none" />
                  <circle cx="29" cy="21.5" r="1.8" fill="currentColor" stroke="none" />
                  <path
                    d="M 21.5,28.5 Q 24,30.2 26.5,28.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              )}
            </>
          )}
        </g>
      </svg>
    </motion.div>
  );
}
