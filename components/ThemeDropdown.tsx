"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type ThemeState = "morning" | "day" | "evening" | "night";

const THEMES: { value: ThemeState; label: string }[] = [
  { value: "morning", label: "Morning" },
  { value: "day", label: "Day" },
  { value: "evening", label: "Evening" },
  { value: "night", label: "Night" },
];

const getPuneHour = () => {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    });
    return parseInt(formatter.format(new Date()), 10);
  } catch {
    return new Date().getHours();
  }
};

const getThemeGreeting = (theme: string) => {
  let resolved = theme;
  if (theme === "auto") {
    const hour = getPuneHour();
    if (hour >= 5 && hour < 12) resolved = "morning";
    else if (hour >= 12 && hour < 17) resolved = "day";
    else if (hour >= 17 && hour < 22) resolved = "evening";
    else resolved = "night";
  }
  
  switch (resolved) {
    case "morning": return "GOOD MORNING";
    case "day": return "GOOD DAY";
    case "evening": return "GOOD EVENING";
    case "night": return "GOOD NIGHT";
    default: return "GOOD DAY";
  }
};

export default function ThemeDropdown() {
  const { theme, setTheme, fontPairing, setFontPairing } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative font-sans text-xs md:text-sm" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center justify-between w-[125px] uppercase tracking-wider font-semibold bg-transparent text-foreground hover:opacity-60 active:scale-[0.96] transition-[opacity,transform] border-none px-0 py-0 cursor-pointer"
      >
        <span>{getThemeGreeting(theme)}</span>
        <span className={`transition-transform duration-200 text-[10px] ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: EASE_OUT }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 mt-1 w-36 border border-foreground/10 bg-background shadow-none z-50 rounded-none overflow-hidden"
          >
            <div className="flex flex-col py-1">
              {THEMES.map((t) => {
                const isActive = theme === t.value;
                return (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTheme(t.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 uppercase tracking-wider transition-colors duration-150 flex items-center justify-between rounded-none ${
                      isActive
                        ? "bg-foreground text-background font-semibold"
                        : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground font-medium"
                    }`}
                  >
                    <span>{t.label}</span>
                    {isActive && <span className="text-[9px]">●</span>}
                  </button>
                );
              })}

              {/* Separator line */}
              <div className="h-[1px] bg-foreground/10 my-1" />

              {/* Font Pairing Switch Toggle */}
              <button
                onClick={() => {
                  setFontPairing(fontPairing === "modern" ? "classic" : "modern");
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 uppercase tracking-wider transition-colors duration-150 flex items-center justify-between rounded-none text-foreground/50 hover:bg-foreground/5 hover:text-foreground font-semibold text-[10px] cursor-pointer"
              >
                <span>{fontPairing === "modern" ? "Classic Type" : "Modern Type"}</span>
                <span className="text-[8px]">⌥</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

