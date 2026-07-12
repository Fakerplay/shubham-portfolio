"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTheme } from './ThemeContext'
import { useEffect, useState } from 'react'

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

const getResolvedTheme = (theme: string) => {
  if (theme !== "auto") return theme;
  const hour = getPuneHour();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "day";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
};

export default function ProceduralShadowOverlay() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [bgUrl, setBgUrl] = useState("url(/shadow.png)")
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const x = useSpring(useTransform(mouseX, [-500, 500], [-40, 40]), { damping: 40 })
  const y = useSpring(useTransform(mouseY, [-500, 500], [-40, 40]), { damping: 40 })

  useEffect(() => {
    setMounted(true)
    // Force cache bust to guarantee browser updates the gobo map resource
    setBgUrl(`url(/shadow.png?v=${Date.now()})`)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!mounted) return null

  const resolvedTheme = getResolvedTheme(theme)

  // Define visual properties based on other themes (night, morning, day)
  const getThemeStyles = (activeTheme: string) => {
    switch (activeTheme) {
      case 'night':
        // Soft blue/white light leak on dark background
        return {
          r: 0.72,
          g: 0.82,
          b: 1.0,
          opacity: 0.55,
          stdDeviation: 10,
          blend: 'screen',
          aMult: 3.0,
          aOffset: -0.7
        };
      case 'evening':
        // Evening theme is handled procedurally in page.tsx
        return {
          r: 0,
          g: 0,
          b: 0,
          opacity: 0.0,
          stdDeviation: 0,
          blend: 'screen',
          aMult: 1.0,
          aOffset: 0.0
        };
      case 'morning':
        // Golden creamy sunrise light leaks on warm beige background
        return {
          r: 1.0,
          g: 0.94,
          b: 0.82,
          opacity: 0.65,
          stdDeviation: 12,
          blend: 'screen',
          aMult: 3.0,
          aOffset: -0.7
        };
      case 'day':
      default:
        // Soft warm gray daytime shadows on white background (multiply to darken)
        return {
          r: 0.47,
          g: 0.43,
          b: 0.39,
          opacity: 0.26,
          stdDeviation: 16,
          blend: 'multiply',
          aMult: 1.0,
          aOffset: 0.0
        };
    }
  };

  const { r, g, b, opacity, stdDeviation, blend, aMult, aOffset } = getThemeStyles(resolvedTheme);

  if (opacity === 0) return null;

  return (
    <>
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <defs>
          <filter id="dappledColorFilter" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values={`0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} ${aMult} 0 0 0 ${aOffset}`}
            />
            <feGaussianBlur stdDeviation={stdDeviation} />
          </filter>
        </defs>
      </svg>
      <motion.div 
        className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        style={{
          mixBlendMode: blend as React.CSSProperties["mixBlendMode"],
          opacity: opacity
        }}
      >
        <motion.div
          style={{
            x,
            y,
            position: "absolute",
            inset: "-20%",
            backgroundImage: bgUrl,
            backgroundRepeat: "repeat",
            backgroundSize: "900px 900px",
            filter: "url(#dappledColorFilter)",
            rotate: -15
          }}
        />
      </motion.div>
    </>
  )
}
