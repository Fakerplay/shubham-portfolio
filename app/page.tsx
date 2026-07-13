"use client";

import HoverReveal from '@/components/HoverReveal'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'
import { playClickSound } from '@/utils/audio'
import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { EASE_OUT, EASE_IN_OUT } from '@/lib/motion'

const ServicesShowcase = dynamic(() => import('@/components/services/ServicesShowcase'), { ssr: false })

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

// 1. LineReveal Component (reveals text line-by-line using a clean overflow mask)
const LineReveal = ({ children, delay = 0, reduceMotion = false }: { children: React.ReactNode; delay?: number; reduceMotion?: boolean }) => {
  if (reduceMotion) {
    return <span className="block w-full">{children}</span>;
  }
  return (
    <span className="overflow-hidden block w-full">
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: EASE_OUT }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
};

// 2. KeywordPill Component (world-class design-led horizontal expanding contrast capsule)
const KeywordPill = ({ text, delay, reduceMotion = false }: { text: string; delay: number; reduceMotion?: boolean }) => {
  const { theme } = useTheme();
  const isDark = theme === "evening" || theme === "night" || theme === "aurora" || theme === "neon";

  if (reduceMotion) {
    return (
      <span className={`inline-flex items-center px-3.5 py-0.5 rounded-full border text-2xl md:text-3xl font-serif font-light align-baseline leading-none mx-1 relative -top-[0.02em] ${
        isDark 
          ? "border-white/10 bg-white/10 text-white" 
          : "border-foreground/15 bg-black/5 text-foreground/90"
      }`}>
        {text}
      </span>
    );
  }

  const borderClass = isDark ? "border-white/10 hover:border-white/30" : "border-foreground/15 hover:border-zinc-700";
  const bgClass = isDark ? "bg-white/5 hover:bg-white/15" : "bg-foreground/[0.05] hover:bg-zinc-800";
  const textClass = isDark ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-white";

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.25, duration: 0.5, ease: EASE_OUT }}
      className={`group inline-flex items-center px-4 py-1 rounded-full border ${borderClass} ${bgClass} ${textClass} align-baseline leading-none select-none mx-1.5 cursor-pointer relative -top-[0.02em] transition-[color,background-color,border-color,box-shadow] duration-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),_0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),_0_3px_6px_rgba(0,0,0,0.3)]`}
    >
      <span className="relative z-10 font-serif font-light text-2xl md:text-3xl block transition-[filter] duration-150 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
        {text}
      </span>
    </motion.span>
  );
};

// 3. SplitFlapWord Component (vanilla DOM-based departure board split-flap scramble animation)
const SplitFlapWord = ({ reduceMotion = false }: { reduceMotion?: boolean }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const targetText = "MOMENTUM";
  const activeIntervals = useRef<NodeJS.Timeout[]>([]);
  const isScrambling = useRef(false);

  const triggerEffect = useCallback(() => {
    if (isScrambling.current) return; // let an in-flight scramble finish instead of hard-resetting
    isScrambling.current = true;

    const el = containerRef.current;
    if (!el) {
      isScrambling.current = false;
      return;
    }

    // Clear previous timers
    activeIntervals.current.forEach((interval) => clearInterval(interval));
    activeIntervals.current = [];

    const final = el.getAttribute("data-final") || targetText;
    el.innerHTML = ""; // reset DOM content

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (reduceMotion) {
      isScrambling.current = false;
    }

    let remaining = final.length;

    for (let i = 0; i < final.length; i++) {
      const box = document.createElement("span");
      box.className = "split-flap-box w-5.5 h-8.5 md:w-6.5 md:h-10.5 flex items-center justify-center border rounded-sm transition-[transform,background-color,color,border-color] duration-300 align-baseline select-none relative overflow-hidden";
      box.style.transform = "scaleY(1)";
      
      // Structure split-flap card halves, side hinges, and gradient overlays
      box.innerHTML = `
        <span class="char-span relative z-10 font-serif font-bold text-lg md:text-xl">${reduceMotion ? final[i] : "-"}</span>
        <span class="split-flap-divider absolute left-0 right-0 top-[calc(50%-0.5px)] h-[1px] z-20 pointer-events-none transition-colors duration-300"></span>
        <span class="split-flap-hinge absolute left-0 top-1/2 -translate-y-1/2 w-[1.5px] h-[5px] border-r rounded-r-[1px] z-30 pointer-events-none transition-colors duration-300"></span>
        <span class="split-flap-hinge absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-[5px] border-l rounded-l-[1px] z-30 pointer-events-none transition-colors duration-300"></span>
        <span class="absolute inset-x-0 top-0 bottom-1/2 bg-gradient-to-b from-black/20 via-transparent to-black/5 z-0 pointer-events-none"></span>
        <span class="absolute inset-x-0 top-1/2 bottom-0 bg-gradient-to-b from-black/30 to-transparent z-0 pointer-events-none"></span>
      `;
      el.appendChild(box);

      if (reduceMotion) {
        continue;
      }

      const charSpan = box.querySelector(".char-span");
      if (!charSpan) continue;

      const settleCount = 8 + i * 4; // stagger locks from left to right
      let count = 0;

      const interval = setInterval(() => {
        count++;
        if (count >= settleCount) {
          clearInterval(interval);
          // Apply a vertical scale flip settle on locking the character
          box.style.transform = "scaleY(0.1)";
          charSpan.textContent = final[i];
          setTimeout(() => {
            box.style.transform = "scaleY(1)";
            remaining--;
            if (remaining === 0) isScrambling.current = false;
          }, 80);
        } else {
          // Cycle characters
          const randIdx = Math.floor(Math.random() * chars.length);
          charSpan.textContent = chars[randIdx];
        }
      }, 45);

      activeIntervals.current.push(interval);
    }
  }, [reduceMotion]);

  useEffect(() => {
    triggerEffect();
    const loopInterval = setInterval(triggerEffect, 6500); // loop flip scramble every 6.5s
    return () => {
      clearInterval(loopInterval);
      activeIntervals.current.forEach((interval) => clearInterval(interval));
    };
  }, [triggerEffect]);

  return (
    <span
      ref={containerRef}
      data-final={targetText}
      onMouseEnter={triggerEffect}
      className="inline-flex gap-[1.5px] mx-1 align-baseline leading-none select-none cursor-pointer filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] transition-[filter] duration-300 relative -top-[0.06em]"
      title="Hover to flip"
    />
  );
};

// 4. InteractiveCodeWord Component (compact dark inline code-block style manual flip/split-flap component)
const InteractiveCodeWord = ({ reduceMotion = false }: { reduceMotion?: boolean }) => {
  const { theme } = useTheme();
  const isDark = theme === "evening" || theme === "night" || theme === "aurora" || theme === "neon";

  const words = ["sharper", "trusted", "memorable"];
  const [wordIndex, setWordIndex] = useState(0);

  const shadowNormal = isDark 
    ? "0 6px 15px rgba(255,255,255,0.06), 0 2px 5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05)"
    : "0 6px 15px rgba(0,0,0,0.22), 0 2px 5px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.25), 0 0 8px rgba(255,255,255,0.04)";
    
  const shadowHover = isDark
    ? "0 12px 24px rgba(255,255,255,0.1), 0 4px 8px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.05)"
    : "0 12px 24px rgba(0,0,0,0.28), 0 4px 8px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3), 0 0 12px rgba(255,255,255,0.08)";

  // AnimatePresence below retargets/interrupts cleanly on rapid clicks instead
  // of dropping them, so cycling the word is just a state update.
  const cycleWord = () => {
    setWordIndex((prev) => (prev + 1) % words.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cycleWord();
    }
  };

  const dynamicBgClass = isDark 
    ? "bg-white border-zinc-200 text-zinc-950 hover:bg-zinc-100 hover:text-black focus-visible:ring-zinc-950" 
    : "bg-zinc-900 border-zinc-700/80 text-zinc-300 hover:bg-zinc-850 hover:border-zinc-600/90 hover:text-zinc-50 focus-visible:ring-zinc-400";

  return (
    <motion.button
      layout
      onClick={cycleWord}
      onKeyDown={handleKeyDown}
      aria-label="Click to cycle brand outcome word"
      initial={{ boxShadow: shadowNormal }}
      whileHover={reduceMotion ? {} : { 
        y: -1.5,
        boxShadow: shadowHover
      }}
      transition={{ layout: { duration: 0.25, ease: EASE_OUT }, boxShadow: { duration: 0.2 } }}
      className={`inline-flex items-center justify-center px-3.5 py-0.5 rounded-md border font-mono text-xl md:text-2xl select-none mx-1.5 align-baseline leading-none cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 h-9 md:h-11.5 group gap-1.5 relative -top-[0.02em] ${dynamicBgClass}`}
    >
      <span style={{ perspective: 600 }} className="inline-block overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={wordIndex}
            initial={reduceMotion ? false : { rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE_IN_OUT }}
            style={{ transformOrigin: "center" }}
            className="inline-block"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* Small subtle dropdown arrow appearing on hover */}
      <span className="inline-flex items-center text-xs opacity-40 group-hover:opacity-85 transition-opacity duration-300 select-none">
        <svg 
          width="10" 
          height="6" 
          viewBox="0 0 10 6" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="transform group-hover:translate-y-[0.5px] transition-transform duration-300"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </span>
    </motion.button>
  );
};

// 5. ExpandableBio Component (accessible personal aside bio reveal)
const ExpandableBio = ({ reduceMotion = false }: { reduceMotion?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleOpen = () => {
    playClickSound(0.12);
    setIsOpen(!isOpen);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();
    }
  };

  const emoji = (char: string) => (
    <span className="text-[0.8em] inline-block align-baseline leading-none ml-1 relative -top-[0.05em] select-none">
      {char}
    </span>
  );

  let targetRotate = 0;
  if (isOpen) {
    targetRotate = 135;
  } else if (isHovered) {
    targetRotate = 45;
  }

  return (
    <div className="flex flex-col items-start w-full select-text mt-1.5">
      <motion.button
        layout
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-expanded={isOpen}
        aria-label="Click to reveal personal bio note"
        whileHover={reduceMotion ? {} : { 
          y: -1.5,
          rotate: 0.5,
          boxShadow: "0 4px 10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
        transition={{ layout: { duration: 0.16, ease: EASE_OUT } }}
        className="group inline-flex items-center gap-1.5 cursor-pointer font-serif text-2xl md:text-3xl text-foreground/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 rounded-full py-1 px-4 border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.05] bg-foreground/[0.02] shadow-[0_2px_5px_rgba(0,0,0,0.03)] transition-colors duration-300 select-none relative align-baseline leading-none -top-[0.02em]"
      >
        <span className="border-b border-dotted border-foreground/25 group-hover:border-foreground/50 transition-colors duration-300 pb-[1px]">
          It’s nice to meet you
        </span>

        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0, marginRight: 0 }}
              animate={{ opacity: 0.5, width: "auto", marginRight: 6 }}
              exit={{ opacity: 0, width: 0, marginRight: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="inline-flex items-center overflow-hidden whitespace-nowrap text-xs md:text-sm font-sans font-normal uppercase tracking-wider select-none pl-1"
            >
              <span className="mr-1">·</span>
              <span>peek inside</span>
            </motion.span>
          )}
        </AnimatePresence>

        <motion.span
          animate={{ rotate: targetRotate }}
          transition={{ duration: 0.16, ease: EASE_OUT }}
          className="font-mono text-sm select-none opacity-65 group-hover:opacity-100 transition-opacity ml-1.5"
        >
          +
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="overflow-hidden w-full"
          >
            <motion.p
              initial={reduceMotion ? { y: 0 } : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? { y: 0 } : { y: 12, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="font-serif font-light text-2xl md:text-3xl text-foreground/80 mt-3 select-text leading-[1.6]"
            >
              Outside design, I’m usually watching movies {emoji("🎬")}, cheering for Liverpool FC {emoji("🔴")}, playing video games {emoji("🎮")}, or travelling somewhere new {emoji("✈️")}.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ProjectProps {
  slug: string;
  brand: string;
  logoColor: string;
  year: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  metrics: { value: string; label: string }[];
  tags?: string[];
  index?: number;
  total?: number;
  reduceMotion?: boolean;
}

// 6. ProjectCard Component (Full-Width Cinematic Cover Showcase with Editorial Hierarchy)
const ProjectCard = ({ 
  slug, brand, year, title, description, image, video, metrics, tags, index, total, reduceMotion = false 
}: ProjectProps) => {
  return (
    <div className="w-full px-6 md:px-16 lg:px-24 flex flex-col group select-none">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 md:gap-12">
        
        {/* Top Header: Brand Label + Massive Headline */}
        <div className="flex flex-col gap-3">
          <div>
            <span className="font-sans font-semibold tracking-wider text-sm md:text-base uppercase text-foreground/75">
              {brand}
            </span>
          </div>

          <Link href={`/work/${slug}`} className="hover:opacity-85 transition-opacity">
            <h3 className="font-sans font-semibold text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-[1.05]">
              {title}
            </h3>
          </Link>
        </div>

        {/* Centerpiece: Full-Width Cinematic Cover Showcase */}
        <Link href={`/work/${slug}`} className="block w-full">
          <div className="relative w-full aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden border border-foreground/15 shadow-2xl bg-foreground/[0.02]">
            {video || image?.endsWith(".mp4") || image?.endsWith(".webm") ? (
              <video 
                src={video || image} 
                preload="metadata"
                poster={image?.endsWith(".mp4") || image?.endsWith(".webm") ? undefined : image}
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
              />
            ) : (
              <Image 
                src={image} 
                alt={title} 
                fill 
                quality={100} 
                unoptimized 
                sizes="100vw" 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
              />
            )}
            {/* Subtle overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Sleek floating interactive badge */}
            <div className="absolute bottom-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
              <div className="px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-md text-white font-sans text-xs font-medium tracking-wide border border-white/20 flex items-center gap-2 shadow-lg">
                <span>View Case Study</span>
                <span>&rarr;</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Bottom Editorial Content & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-2 items-start">
          {/* Left Column: Authoritative Editorial Body Text / Quote + Project Categories */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full gap-8">
            <p className="text-lg md:text-2xl font-sans font-normal text-foreground/80 leading-[1.6]">
              &ldquo;{description}&rdquo;
            </p>

            {tags && tags.length > 0 && (
              <div className="flex flex-col gap-2 pt-5 border-t border-foreground/15">
                <span className="text-xs font-sans font-medium uppercase tracking-wider text-foreground/50">Disciplines &amp; Scope</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base md:text-lg font-sans font-normal text-foreground/90 tracking-tight">
                  {tags.map((tag: string, idx: number) => (
                    <span key={idx} className="inline-flex items-center gap-x-3">
                      <span>{tag}</span>
                      {idx < tags.length - 1 && <span className="text-foreground/35 font-light select-none">/</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: ROI Metrics + Action */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-between lg:justify-start gap-8 border-t lg:border-t-0 lg:border-l border-foreground/10 pt-6 lg:pt-0 lg:pl-12">
            <div className="flex gap-12 sm:gap-16">
              {metrics.map((metric: { value: string; label: string }, idx: number) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl md:text-5xl font-sans text-foreground font-semibold tracking-tight">{metric.value}</span>
                  <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-foreground/50 mt-2">{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link href={`/work/${slug}`} className="group/btn inline-flex items-center gap-3 px-6 py-3 rounded-full border border-foreground/25 hover:border-foreground bg-transparent hover:bg-foreground hover:text-background text-foreground font-sans font-medium text-sm tracking-wide transition-[color,background-color,border-color] duration-300 cursor-pointer">
                <span>Explore Case Study</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


// Framer Motion variants for Title
const helloVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.75, ease: EASE_OUT } }
} as const;

// 7. Client Logos Marquee Configuration (Easily add or remove logos here)
export const CLIENT_LOGOS = [
  { name: "Phyllo", src: "/logos/phyllo.png", width: 105, height: 28, className: "h-6 md:h-[28px]" },
  { name: "Thar", src: "/logos/thar.png", width: 100, height: 28, className: "h-6 md:h-[28px]" },
  { name: "ATCON", src: "/logos/atcon.png", width: 180, height: 30, className: "h-7 md:h-[30px]" },
  { name: "Ecolab", src: "/logos/ecolab.png", width: 200, height: 52, className: "h-12 md:h-[52px]" },
  { name: "KTM", src: "/logos/ktm.png", width: 110, height: 34, className: "h-8 md:h-[34px]" },
  { name: "ISKCON", src: "/logos/iskcon.png", width: 220, height: 58, className: "h-14 md:h-[58px]" },
  { name: "Motilal Oswal", src: "/logos/motilal-oswal.png", width: 96, height: 54, className: "h-12 md:h-[54px]" },
  { name: "Prachyam", src: "/logos/prachyam.png", width: 150, height: 32, className: "h-8 md:h-[32px]" },
  { name: "Pidilite", src: "/logos/pidilite.png", width: 100, height: 50, className: "h-11 md:h-[50px]" },
  { name: "Daulat", src: "/logos/daulat.png", width: 140, height: 34, className: "h-8 md:h-[34px]" },
];

export default function Home() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    setMounted(true)

    // Check accessibility presets
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mediaQuery.matches)
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mediaQuery.addEventListener("change", listener)

    if (mediaQuery.matches) {
      // .featured-project-card starts at opacity-0 via Tailwind to avoid a flash
      // before this effect runs; app/globals.css forces it back to opacity 1 for
      // reduced-motion users so this early return never leaves content invisible.
      return () => mediaQuery.removeEventListener("change", listener)
    }

    // Dynamic import GSAP and ScrollTrigger in client-side runtime
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);

      // GSAP ScrollTrigger intersection observers to sync sidebar navigation
      const sections = ["about", "work"];

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
          });
        }
      });

      // Staggered reveal for Selected Projects cards
      gsap.fromTo(
        ".featured-project-card",
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#work",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => {
      mediaQuery.removeEventListener("change", listener);
      // Clean up all dynamically created ScrollTriggers
      import("gsap/ScrollTrigger").then((m) => {
        m.ScrollTrigger.getAll().forEach(t => t.kill());
      });
    };
  }, []);

  const resolvedTheme = mounted ? getResolvedTheme(theme) : "day";
  const isDark = resolvedTheme === "evening" || resolvedTheme === "night" || resolvedTheme === "aurora" || resolvedTheme === "neon";
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  // Selected work items
  const projects = [
    {
      slug: "daulat-finvest",
      brand: "Daulat Finvest",
      logoColor: "#171717", // Elegant dark tone
      year: "2024 - Present",
      title: "Wealth management crafted around your portfolio",
      video: "/videos/daulat-cover.mp4",
      image: "/images/project-1-cover.jpg",
      description: "Designed a premium wealth management platform tailored for high-net-worth individuals, focusing on elegant portfolio tracking and secure digital advisory.",
      tags: ["Website Design", "Development", "Fintech"],
      metrics: [
        { value: "4.5x", label: "Portfolio Growth" },
        { value: "94%", label: "Platform Adoption" }
      ]
    },
    {
      slug: "solaris",
      brand: "Solaris",
      logoColor: "#f59e0b", // Radiant amber gold
      year: "2024 - 2025",
      title: "Solaris: Fintech Branding & Creative Direction",
      video: "/videos/solaris-2.mp4",
      image: "/images/solaris-cover.png",
      description: "Crafted the complete brand identity, 3D visual language, and creative direction for Solaris—a next-generation fintech platform illuminating financial clarity through radiant, crystalline aesthetics.",
      tags: ["Brand Identity", "Creative Direction", "3D Visuals", "Fintech"],
      metrics: [
        { value: "3.8x", label: "Brand Engagement" },
        { value: "45+", label: "Visual Assets Created" }
      ]
    },
    {
      slug: "optiv",
      brand: "Optiv",
      logoColor: "#6366f1", // Sleek indigo/violet architectural tone
      year: "2025",
      title: "Optiv: Branding and Logo Design",
      video: "/videos/Cover_Optiv_1080.mp4",
      image: "/images/optiv/About.png",
      description: "Architected a distinctive brand identity, cohesive logo ecosystem, and comprehensive visual language for Optiv, bridging technological capability with human-centric clarity.",
      tags: ["Brand Identity", "Logo Design", "Visual System", "Creative Direction"],
      metrics: [
        { value: "100%", label: "Cohesive Identity System" },
        { value: "16+", label: "Brand Touchpoints Engineered" }
      ]
    },
    {
      slug: "studio-vistara",
      brand: "Studio Vistara",
      logoColor: "#a8a29e", // Warm stone & earthy architectural tone
      year: "2025 - Present",
      title: "Studio Vistara: Branding",
      video: "/videos/studio-vistara-1.mp4",
      image: "/images/studio-vistara-cover.png",
      description: "Crafted an ethereal, highly tactile brand identity, architectural typography matrix, and bespoke stationery ecosystem for modern spatial design.",
      tags: ["Brand Identity", "Typography System", "Stationery & Packaging", "Creative Direction"],
      metrics: [
        { value: "100%", label: "Cohesive Visual Identity" },
        { value: "15+", label: "Brand Touchpoints Engineered" }
      ]
    }
  ];

  return (
    <div className="hero-container relative min-h-[calc(100vh-200px)] w-full px-6 md:px-12 pt-40 pb-24 max-w-7xl mx-auto z-10">
      {/* Main Content Area: Expanded to full width layout centering */}
      <div className="w-full max-w-4xl mx-auto flex flex-col justify-start relative z-10">
        
        {/* SECTION 1: ABOUT (Intro Text Section) */}
        <section id="about" className="scroll-mt-24 flex flex-col">
          {/* Hello Greeting (serif header matching the reference photo) */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-12 text-foreground font-light select-none">
            <motion.span
              variants={helloVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              Hello.
            </motion.span>
          </h1>

          {/* Editorial Bio Content styled exactly like reference Emily Campbell layout */}
          <div className="flex flex-col gap-10 font-serif text-2xl md:text-3xl leading-[1.6] text-foreground font-light max-w-3xl mb-20 select-text">
            
            {/* Paragraph 1 */}
            <div className="flex flex-col gap-1">
              <LineReveal delay={0.3} reduceMotion={reduceMotion}>
                I’m <span className="font-semibold text-foreground">Shubham Shinde</span>{" "}
                <span className="inline-flex items-center w-8 h-8 rounded-md overflow-hidden border border-foreground/15 align-baseline leading-none mx-1.5 relative select-none -top-[0.05em]">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Shubham Shinde"
                    fill
                    sizes="32px"
                    className="object-cover grayscale"
                    priority
                  />
                </span>, a <KeywordPill text="visual storyteller" delay={0.3} reduceMotion={reduceMotion} />
              </LineReveal>
              <LineReveal delay={0.45} reduceMotion={reduceMotion}>
                building <KeywordPill text="brand systems" delay={0.4} reduceMotion={reduceMotion} />,{" "}
                <KeywordPill text="web experiences" delay={0.5} reduceMotion={reduceMotion} />, and{" "}
                <KeywordPill text="motion design" delay={0.6} reduceMotion={reduceMotion} />.
              </LineReveal>
            </div>

            {/* Paragraph 2 */}
            <div className="flex flex-col gap-1">
              <LineReveal delay={0.7} reduceMotion={reduceMotion}>
                I help startups and growing brands
              </LineReveal>
              <LineReveal delay={0.85} reduceMotion={reduceMotion}>
                in <SplitFlapWord reduceMotion={reduceMotion} /> shape identities, websites, and visuals people remember.
              </LineReveal>
            </div>

            {/* Paragraph 4 */}
            <div className="flex flex-col gap-1">
              <LineReveal delay={1.1} reduceMotion={reduceMotion}>
                I make brands feel <InteractiveCodeWord reduceMotion={reduceMotion} /> across
              </LineReveal>
              <LineReveal delay={1.25} reduceMotion={reduceMotion}>
                websites, campaigns, decks, and social.
              </LineReveal>
            </div>

            {/* Paragraph 5 */}
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8, ease: EASE_OUT }}
              className="w-full"
            >
              <ExpandableBio reduceMotion={reduceMotion} />
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: WORK (Selected Featured Projects inside Subtle Surface Band) */}
        <section id="work" className="scroll-mt-24 w-[100vw] relative left-1/2 -translate-x-1/2 py-24 md:py-32 bg-foreground/[0.025] dark:bg-white/[0.025] border-y border-foreground/10 flex flex-col gap-16 md:gap-24">
          
          {/* Perfectly Aligned Section Header */}
          <div className="w-full px-6 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="font-sans text-3xl md:text-5xl text-foreground font-semibold tracking-tight">Featured Work</h2>
            </div>
          </div>

          {/* Full-Width Client Logos Marquee Row */}
          <div className="w-full overflow-hidden py-8 border-y border-foreground/10 bg-foreground/[0.015] select-none">
            <div className="animate-marquee hover:[animation-play-state:paused] flex items-center py-2 opacity-60 hover:opacity-85 transition-opacity duration-300 pointer-events-auto min-w-max">
              {[1, 2, 3, 4].map((groupNum) => (
                <div key={groupNum} className="flex gap-20 pr-20 items-center flex-shrink-0">
                  {CLIENT_LOGOS.map((logo, lIdx) => (
                    <div key={`${groupNum}-${lIdx}`} className="flex-shrink-0 flex items-center">
                      <Image 
                        src={logo.src} 
                        alt={`${logo.name} Logo`} 
                        width={logo.width} 
                        height={logo.height} 
                        className={`${logo.className} w-auto object-contain pointer-events-none select-none`} 
                        style={{ filter: isDark ? "brightness(0) invert(1)" : "brightness(0)" }} 
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-36 md:gap-48 mt-4">
            {projects.map((proj, idx) => (
              <div key={idx} className={`featured-project-card opacity-0 flex flex-col ${idx < projects.length - 1 ? 'border-b border-foreground/10 pb-32 md:pb-44' : ''}`}>
                <ProjectCard {...proj} index={idx + 1} total={projects.length} reduceMotion={reduceMotion} />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: CORE CAPABILITIES & SERVICES SHOWCASE (Full Width Aligned Below Work Section) */}
        <ServicesShowcase />

      </div>
    </div>
  )
}
