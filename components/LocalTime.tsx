"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export default function LocalTime() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; description: string; emoji: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Fetch live Pune weather coordinates from Open-Meteo
    fetch("https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current_weather=true")
      .then((res) => res.json())
      .then((data) => {
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        
        let description = "Clear Skies";
        let emoji = "☀️";
        if (code === 0) { description = "Clear Skies"; emoji = "☀️"; }
        else if (code >= 1 && code <= 3) { description = "Partly Cloudy"; emoji = "⛅"; }
        else if (code === 45 || code === 48) { description = "Foggy"; emoji = "🌫️"; }
        else if (code >= 51 && code <= 67) { description = "Rainy Showers"; emoji = "🌧️"; }
        else if (code >= 71 && code <= 77) { description = "Snowy"; emoji = "❄️"; }
        else if (code >= 80 && code <= 82) { description = "Rain Showers"; emoji = "🌦️"; }
        else if (code >= 95 && code <= 99) { description = "Thunderstorms"; emoji = "⛈️"; }
        
        setWeather({ temp, description, emoji });
      })
      .catch(() => {
        // Fallback default
        setWeather({ temp: 28, description: "Monsoon Breeze", emoji: "🌦️" });
      });

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <span className="font-mono text-foreground opacity-40">
        --:-- --
      </span>
    );
  }

  return (
    <div 
      className="relative cursor-help w-[68px] text-right"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-mono text-foreground opacity-60 font-medium hover:opacity-100 transition-opacity duration-300 block">
        {time}
      </span>

      {/* Floating Weather Tooltip */}
      <AnimatePresence>
        {isHovered && weather && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="absolute top-10 right-0 bg-zinc-950 text-white border border-zinc-800 rounded-xl shadow-2xl p-3.5 z-[100] w-48 pointer-events-none select-none"
            style={{
              transformOrigin: "top right"
            }}
          >
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">pune, india</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xl font-bold font-mono tracking-tight text-white">{weather.temp}°C</span>
                <span className="text-lg">{weather.emoji}</span>
              </div>
              <span className="text-[11px] font-sans text-zinc-300 leading-tight">{weather.description}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
