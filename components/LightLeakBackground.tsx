"use client";

import React from "react";
import { useTheme } from "./ThemeContext";

type PaletteKey = "clay" | "sun" | "dark" | "aurora" | "neon" | "matcha";

interface PaletteData {
  bg: string;
  blob1: string;
  blob2: string;
  blob3: string;
}

const PALETTE_STYLES: Record<PaletteKey, PaletteData> = {
  clay: {
    bg: "bg-[#f2e6e1]",
    blob1: "bg-[#df7463]/30",
    blob2: "bg-[#de8b80]/20",
    blob3: "bg-[#e2b5a9]/25",
  },
  sun: {
    bg: "bg-[#F9F9F9]",
    blob1: "bg-amber-100/40",
    blob2: "bg-orange-100/35",
    blob3: "bg-amber-50/50",
  },
  dark: {
    bg: "bg-[#0b101c]",
    blob1: "bg-indigo-950/40",
    blob2: "bg-blue-950/45",
    blob3: "bg-violet-950/30",
  },
  aurora: {
    bg: "bg-[#020706]",
    blob1: "bg-emerald-950/40",
    blob2: "bg-purple-950/35",
    blob3: "bg-pink-950/20",
  },
  neon: {
    bg: "bg-[#0c0214]",
    blob1: "bg-fuchsia-950/45",
    blob2: "bg-orange-950/35",
    blob3: "bg-purple-950/30",
  },
  matcha: {
    bg: "bg-[#b8c4bc]",
    blob1: "bg-purple-200/30",
    blob2: "bg-emerald-100/45",
    blob3: "bg-zinc-100/30",
  },
};

const getResolvedTheme = (themeName: string): string => {
  if (themeName !== "auto") return themeName;
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    });
    const hour = parseInt(formatter.format(new Date()), 10);
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "day";
    if (hour >= 17 && hour < 22) return "evening";
    return "night";
  } catch {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "day";
    if (hour >= 17 && hour < 22) return "evening";
    return "night";
  }
};

const getPaletteFromTheme = (themeName: string): PaletteKey => {
  if (themeName === "aurora" || themeName === "neon" || themeName === "matcha") {
    return themeName;
  }
  const resolved = getResolvedTheme(themeName);
  switch (resolved) {
    case "morning":
    case "day":
      return "sun";
    case "evening":
      return "clay";
    case "night":
    default:
      return "dark";
  }
};

interface LightLeakBackgroundProps {
  palette?: string;
  showToggle?: boolean;
  height?: string;
  mask?: boolean;
}

export default function LightLeakBackground({
  palette,
  showToggle = false,
  height = "100vh",
  mask = true
}: LightLeakBackgroundProps) {
  const { theme } = useTheme();

  // Resolve palette dynamically based on global app theme or manual prop overrides
  const resolvedPalette = getPaletteFromTheme(theme);
  const activePalette = (palette as PaletteKey) || resolvedPalette;
  const styles = PALETTE_STYLES[activePalette] || PALETTE_STYLES.clay;

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 w-full overflow-hidden transition-colors duration-1000 ${styles.bg}`}
      style={{ height }}
    >
      {/* Container holding blurred organic color blobs */}
      <div className="absolute inset-0 w-full h-full filter blur-[100px] md:blur-[150px] opacity-75 md:opacity-90 transform-gpu">
        {/* Blob 1 */}
        <div className={`absolute top-[-10%] left-[-10%] w-[65vw] h-[65vw] rounded-full animate-blob-1 transform-gpu ${styles.blob1}`} />
        
        {/* Blob 2 */}
        <div className={`absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full animate-blob-2 transform-gpu ${styles.blob2}`} />
        
        {/* Blob 3 */}
        <div className={`absolute top-[25%] left-[20%] w-[50vw] h-[50vw] rounded-full animate-blob-3 transform-gpu ${styles.blob3}`} />
      </div>

      {/* Subtle Vignette Mask Overlay */}
      {mask && (
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,255,255,0)_0%,rgba(0,0,0,0.03)_100%] dark:bg-radial-[circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.15)_100%] w-full h-full mix-blend-overlay" />
      )}
    </div>
  );
}
