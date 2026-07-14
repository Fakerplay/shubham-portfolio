"use client";

import React from "react";
import { useTheme } from "./ThemeContext";

type ThemeState = "auto" | "morning" | "day" | "evening" | "night" | "aurora" | "neon" | "matcha";

const FUN_THEMES: { value: ThemeState; label: string; color: string }[] = [
  { value: "aurora", label: "Aurora", color: "#10b981" },
  { value: "neon", label: "Neon Sunset", color: "#ec4899" },
  { value: "matcha", label: "Matcha Lavender", color: "#84cc16" },
];

export default function ColorPicker() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 select-none pointer-events-auto">
      {FUN_THEMES.map((t) => {
        const isActive = theme === t.value;
        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`w-11 h-11 -m-3.5 rounded-full border-[15px] border-transparent bg-clip-padding transition-all duration-300 relative cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isActive 
                ? "ring-1 ring-foreground ring-offset-1 ring-offset-background scale-110" 
                : "opacity-80 hover:opacity-100"
            }`}
            style={{
              backgroundColor: t.color,
            }}
            title={`Switch to ${t.label} palette`}
            aria-label={`Switch to ${t.label} palette`}
          />
        );
      })}
    </div>
  );
}
