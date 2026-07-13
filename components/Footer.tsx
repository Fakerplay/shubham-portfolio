"use strict";
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import LightLeakBackground from "@/components/LightLeakBackground";
import { EASE_OUT } from "@/lib/motion";

interface StudioCard {
  id: string;
  label: string;
  text: string;
  reveal: string;
  rotation: number;
  offsetY: number;
  zIndex: number;
  desktopMarginClass: string;
  gradientClass: string;
  accentTextClass: string;
}

const STUDIO_CARDS: StudioCard[] = [
  // CLUSTER 1 (Left 3 cards)
  {
    id: "01",
    label: "01 / PRINCIPLE",
    text: "Make it clear. Then make it hard to forget.",
    reveal: "clarity first, memory next",
    rotation: -11,
    offsetY: 15,
    zIndex: 30,
    desktopMarginClass: "xl:ml-0 lg:ml-0",
    gradientClass: "from-[#FF5E00] via-[#FFA800] to-[#FF0055]", // Fiery Solar Amber / Tangerine Orange (Daily Newsletter in ref)
    accentTextClass: "group-hover:text-amber-300 dark:group-hover:text-amber-200",
  },
  {
    id: "02",
    label: "02 / BACKGROUND",
    text: "Films taught me pacing. Design taught me restraint.",
    reveal: "cuts / pauses / reveals",
    rotation: 12,
    offsetY: -45,
    zIndex: 10,
    desktopMarginClass: "xl:-ml-28 lg:-ml-20",
    gradientClass: "from-[#0066FF] via-[#3B82F6] to-[#00E5FF]", // Electric Cyber Cobalt / Neon Azure (Curated Tools in ref)
    accentTextClass: "group-hover:text-blue-300 dark:group-hover:text-blue-200",
  },
  {
    id: "03",
    label: "03 / CAPABILITY",
    text: "Brand systems for ideas still finding their shape.",
    reveal: "identity / web / motion",
    rotation: -2,
    offsetY: 28,
    zIndex: 20,
    desktopMarginClass: "xl:-ml-32 lg:-ml-24",
    gradientClass: "from-[#00FF87] via-[#10B981] to-[#00E5FF]", // Laser Emerald / Mint Green (Expert Insights in ref)
    accentTextClass: "group-hover:text-emerald-300 dark:group-hover:text-emerald-200",
  },

  // CLUSTER 2 (Right 3 cards)
  {
    id: "04",
    label: "04 / DISCLOSURE",
    text: "Liverpool FC fan. Emotionally unavailable on match days.",
    reveal: "YNWA",
    rotation: -8,
    offsetY: 10,
    zIndex: 30,
    desktopMarginClass: "xl:ml-12 lg:ml-6",
    gradientClass: "from-[#FF0055] via-[#F43F5E] to-[#FF7A00]", // Sunset Crimson / Rose Glow (Envelope in ref 3)
    accentTextClass: "group-hover:text-rose-300 dark:group-hover:text-rose-200",
  },
  {
    id: "05",
    label: "05 / DYNAMICS",
    text: "Motion for ideas that deserve a second look.",
    reveal: "loops / launches / campaigns",
    rotation: 5,
    offsetY: -38,
    zIndex: 10,
    desktopMarginClass: "xl:-ml-28 lg:-ml-20",
    gradientClass: "from-[#8B5CF6] via-[#D946EF] to-[#3B82F6]", // Deep Amethyst / Neon Violet
    accentTextClass: "group-hover:text-purple-300 dark:group-hover:text-purple-200",
  },
  {
    id: "06",
    label: "06 / PHILOSOPHY",
    text: "Taste is not decoration. It is decision-making.",
    reveal: "taste = decisions",
    rotation: 8,
    offsetY: 22,
    zIndex: 20,
    desktopMarginClass: "xl:-ml-32 lg:-ml-24",
    gradientClass: "from-[#FACC15] via-[#F97316] to-[#EF4444]", // Golden Champagne / Solar Flare
    accentTextClass: "group-hover:text-yellow-300 dark:group-hover:text-yellow-200",
  },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isUnpacked, setIsUnpacked] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const email = "shubhamshinde52@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Staggered container variants for cards enter animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.055,
        delayChildren: 0.02,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const cardVariants = {
    hidden: (card: StudioCard) => ({
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.92,
      y: shouldReduceMotion ? 0 : 140,
      rotate: 0,
    }),
    visible: (card: StudioCard) => ({
      opacity: 1,
      scale: 1,
      y: shouldReduceMotion ? 0 : card.offsetY,
      rotate: shouldReduceMotion ? 0 : card.rotation,
      transition: {
        type: "spring" as const,
        damping: 17,
        stiffness: 165,
        mass: 0.7,
      },
    }),
    exit: (card: StudioCard) => ({
      opacity: 0,
      scale: 0.9,
      y: 120,
      rotate: 0,
      transition: {
        duration: 0.25,
        ease: EASE_OUT,
      },
    }),
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.05,
        ease: EASE_OUT,
      },
    },
  };

  return (
    <footer className="w-full relative z-10 border-t border-white/10 mt-auto bg-[#020d08] text-[#F5F5F7] overflow-hidden select-none pt-16 sm:pt-24 pb-8 dark">
      {/* Dark Premium Green Ambient Glow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020d08]">
        {/* Soft, organic radial glows matching the reference images */}
        <div className="absolute -top-[300px] left-[15%] w-[800px] h-[600px] rounded-full bg-[#053c25]/30 blur-[140px]" />
        <div className="absolute -bottom-[200px] right-[10%] w-[600px] h-[600px] rounded-full bg-[#032e1d]/40 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-emerald-950/20 blur-[180px]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* 1. INTERACTIVE FOLDER ENVELOPE / POP-OUT STUDIO NOTES DECK */}
        <div id="notes" className="w-full min-h-[440px] sm:min-h-[500px] flex items-center justify-center pt-10 pb-16">
          <AnimatePresence mode="wait">
            {!isUnpacked ? (
              /* STATE A: Refined, Tactile Sunset Glass Studio Dossier / Envelope (`!isUnpacked`) */
              <motion.div
                key="envelope-folder"
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.88,
                  y: 30,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 150,
                  mass: 0.8
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -8,
                        scale: 1.02,
                        transition: { type: "spring", damping: 18, stiffness: 200, mass: 0.7 },
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? {}
                    : { scale: 0.96, transition: { duration: 0.15 } }
                }
                onClick={() => setIsUnpacked(true)}
                tabIndex={0}
                role="button"
                aria-label="Click to unpack 6 Studio Notes"
                className="flex flex-col items-center justify-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-foreground/30 rounded-2xl will-change-transform"
              >
                {/* Architectural Folder / Dossier Body (Taut proportions, delicate elevation, zero heavy smudges) */}
                <div className="relative w-[340px] sm:w-[420px] md:w-[480px] lg:w-[520px] h-[270px] sm:h-[330px] md:h-[360px] rounded-[24px] sm:rounded-[28px] bg-gradient-to-tr from-[#FF5E00]/95 via-[#FF8C00]/90 to-[#FF0055]/95 p-1.5 shadow-[0_15px_40px_rgba(255,94,0,0.22),_0_4px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_24px_60px_rgba(255,94,0,0.35),_0_8px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 ease-out overflow-visible flex flex-col justify-end">
                  
                  {/* Feather-Weight Peeking Note Sheets inside Folder Top Pocket */}
                  <div className="absolute top-3.5 left-6 right-6 sm:left-8 sm:right-8 h-[120px] sm:h-[150px] md:h-[170px] flex justify-center items-end pointer-events-none">
                    {/* Back sheet 3 */}
                    <div className="absolute bottom-4 w-[250px] sm:w-[320px] md:w-[380px] h-[95px] sm:h-[125px] md:h-[140px] rounded-t-[14px] sm:rounded-t-[16px] bg-white/70 dark:bg-[#1E1E28]/80 border-t border-white/40 shadow-none rotate-5 translate-x-6 group-hover:rotate-7 group-hover:-translate-y-2 transition-transform duration-300 ease-out" />
                    {/* Middle sheet 2 */}
                    <div className="absolute bottom-2 w-[260px] sm:w-[335px] md:w-[395px] h-[105px] sm:h-[135px] md:h-[150px] rounded-t-[14px] sm:rounded-t-[16px] bg-white/85 dark:bg-[#252532]/90 border-t border-white/50 shadow-none -rotate-3 -translate-x-4 group-hover:-rotate-5 group-hover:-translate-y-3 transition-transform duration-300 ease-out" />
                    {/* Front sheet 1 */}
                    <div className="absolute bottom-0 w-[270px] sm:w-[350px] md:w-[410px] h-[115px] sm:h-[145px] md:h-[160px] rounded-t-[14px] sm:rounded-t-[16px] bg-white dark:bg-[#2C2C3A] border-t border-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] rotate-1 group-hover:-translate-y-4 transition-transform duration-300 ease-out p-4 sm:p-5 flex flex-col gap-2.5">
                      <div className="w-16 sm:w-20 h-2 rounded-full bg-black/15 dark:bg-white/20" />
                      <div className="w-28 sm:w-36 h-2 rounded-full bg-black/10 dark:bg-white/15" />
                      <div className="w-20 sm:w-28 h-1.5 rounded-full bg-black/5 dark:bg-white/10" />
                    </div>
                  </div>

                  {/* Front Lip / Folder Flap (Refined, gossamer-light optical frosted glass) */}
                  <div className="relative z-10 w-full h-[68%] sm:h-[72%] rounded-t-[16px] sm:rounded-t-[20px] rounded-b-[22px] sm:rounded-b-[26px] backdrop-blur-xl bg-white/[0.18] dark:bg-black/[0.35] border-t border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] p-6 sm:p-8 flex flex-col justify-end">
                    
                    {/* Decorative Gear / Settings icon on right edge */}
                    <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white/95 group-hover:rotate-180 transition-transform duration-500 ease-out shadow-none">
                      <span className="text-sm sm:text-base font-bold">✦</span>
                    </div>

                    {/* Main Folder Title & Subtitle */}
                    <div className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                      <h3 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight">Studio Notes</h3>
                      <p className="font-mono text-[11px] sm:text-xs text-white/85 uppercase tracking-widest mt-1">Design Beliefs & Quirks (06)</p>
                    </div>
                  </div>
                </div>

                {/* Click Prompt Badge below envelope */}
                <div className="mt-7 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/[0.04] border border-white/10 text-white/80 font-mono text-xs uppercase tracking-wider group-hover:bg-white/[0.08] group-hover:text-white transition-colors duration-300 shadow-none">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Click Folder to Unpack 6 Notes</span>
                </div>
              </motion.div>
            ) : (
              /* STATE B: Feather-Light, Architectural Glass Cards (`isUnpacked === true`) */
              <motion.div
                key="unpacked-cards-deck"
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full flex flex-col items-center py-4"
              >
                {/* Top Fold Control Bar */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-10 flex items-center justify-center"
                >
                  <button
                    onClick={() => setIsUnpacked(false)}
                    className="group font-mono text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full backdrop-blur-xl bg-white/[0.12] border border-white/25 text-white hover:border-amber-400 hover:bg-white/20 transition-[background-color,border-color,transform] duration-300 flex items-center gap-2 shadow-sm active:scale-95"
                  >
                    <span className="text-amber-500 transform group-hover:rotate-90 transition-transform duration-300">✕</span>
                    <span>Fold Notes Back Into Folder</span>
                  </button>
                </motion.div>

                {/* 6 Popped-Out Fanned Cards (Crystal clear `bg-white/[0.03]`, taut `rounded-[20px] sm:rounded-[22px]`, buttery spring hover) */}
                <motion.div
                  variants={containerVariants}
                  className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-8 px-4 sm:px-8 max-w-[1600px] mx-auto"
                >
                  {STUDIO_CARDS.map((card) => {
                    const isHovered = activeCardId === card.id;

                    return (
                      <motion.div
                        key={card.id}
                        custom={card}
                        variants={cardVariants}
                        whileHover={
                          shouldReduceMotion
                            ? {}
                            : {
                                y: card.offsetY - 32,
                                rotate: 0,
                                scale: 1.05,
                                transition: {
                                  type: "spring" as const,
                                  damping: 16,
                                  stiffness: 220,
                                  mass: 0.6,
                                },
                              }
                        }
                        whileTap={
                          shouldReduceMotion
                            ? {}
                            : { scale: 0.98, transition: { duration: 0.1 } }
                        }
                        onMouseEnter={() => setActiveCardId(card.id)}
                        onMouseLeave={() => setActiveCardId(null)}
                        tabIndex={0}
                        role="article"
                        aria-label={`Editorial note: ${card.text}`}
                        className={`group relative w-full sm:w-[320px] md:w-[340px] lg:w-[355px] xl:w-[370px] h-[270px] sm:h-[290px] md:h-[310px] rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 flex flex-col justify-between cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white/30 focus:rotate-0 backdrop-blur-[24px] bg-white/[0.04] border border-white/[0.18] overflow-hidden will-change-transform ${
                          card.desktopMarginClass
                        } ${isHovered ? "!z-50 shadow-[0_24px_60px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.4)] border-white/30" : "shadow-[0_12px_40px_rgba(0,0,0,0.2),_inset_0_1px_1px_rgba(255,255,255,0.2)]"}`}
                        style={{
                          transformOrigin: "center center",
                          zIndex: isHovered ? 50 : card.zIndex,
                        }}
                      >
                        {/* 1. Subtle, delicate internal bottom ambient glow (Transitions on GPU) */}
                        <div className={`absolute -bottom-12 inset-x-0 h-28 bg-gradient-to-t ${card.gradientClass} opacity-20 group-hover:opacity-65 blur-[28px] pointer-events-none transition-opacity duration-300 ease-out`} />

                        {/* 2. SPECULAR GLARE & LIGHT REFLECTION */}
                        <div className="absolute inset-0 rounded-[24px] sm:rounded-[28px] bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />

                        {/* 3. SUBTLE GRID OVERLAY */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-[24px] sm:rounded-[28px]" />

                        {/* 4. Top Row: Label badge & 5x5 dots matrix representation */}
                        <div className="flex items-center justify-between w-full relative z-10">
                          <span className="font-mono text-[9px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/[0.08] text-white/80 border border-white/10">
                            {card.label}
                          </span>
                          <div className="w-5 h-5 flex flex-wrap gap-[3px] content-start justify-end opacity-25">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <span key={i} className="w-[3px] h-[3px] rounded-full bg-white" />
                            ))}
                          </div>
                        </div>

                        {/* 5. Center Divider Pattern (Wave-pattern SVG divider matching reference) */}
                        <div className="w-full relative z-10 my-1 flex items-center justify-center">
                          <div className="w-full h-3 opacity-20 bg-[repeat-x] bg-center bg-[size:12px_6px] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 6%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-width=%221%22%3E%3Cpath d=%22M0 3 C3 0, 3 6, 6 3 C9 0, 9 6, 12 3%22/%3E%3C/svg%3E')]" />
                        </div>

                        {/* 6. Center Main Content Copy */}
                        <div className="flex-1 flex flex-col justify-center relative z-10 text-left px-1">
                          <p className="font-sans font-medium text-[16px] sm:text-[18px] md:text-[20px] leading-[1.35] tracking-tight text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                            {card.text}
                          </p>
                        </div>

                        {/* 7. Bottom Bar: Reveal Tag */}
                        <div className="h-8 flex items-end justify-start relative z-10 w-full">
                          <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-white/90 flex items-center gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300 ease-out whitespace-nowrap shadow-none">
                            <span>↳</span>
                            <span>{card.reveal}</span>
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. MONUMENTAL SERIF ANCHOR HEADLINE & CTAS (Centered Studio Presence) */}
        <motion.div
          variants={headlineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 sm:px-6"
        >
          <div className="flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.03]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-white/70">
              AVAILABLE FOR Q3 / Q4 PROJECTS
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-normal tracking-tight text-white leading-[1.04]">
            Let&rsquo;s make something <br className="hidden sm:inline" />
            <span className="italic font-light">clear</span>, memorable, <br className="hidden sm:inline" />
            and hard to ignore.
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-white/75 font-light max-w-2xl mx-auto mt-8 leading-relaxed">
            Available for brand systems, web experiences, motion-led visuals, and launch assets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10">
            <a
              href={`mailto:${email}`}
              className="group px-8 py-4 sm:py-4.5 rounded-full bg-zinc-900 border border-zinc-950 text-white font-sans font-semibold text-sm sm:text-base tracking-wide transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-zinc-850 hover:shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.35)]"
            >
              <span>Start a project</span>
              <svg 
                className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            <Link
              href="/#work"
              className="px-8 py-4 sm:py-4.5 rounded-full border border-white/20 hover:border-white text-white font-sans font-medium text-sm sm:text-base transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.98]"
            >
              View work
            </Link>
          </div>
        </motion.div>

        {/* 3. BAJGART-INSPIRED ARCHITECTURAL BOTTOM PILL BAR & COPYRIGHT */}
        <div className="w-full border-t border-white/10 pt-8 mt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-xs sm:text-sm font-sans">
            
            {/* Left: Social Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <a
                href="https://www.linkedin.com/in/shubham-shinde-design/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white/60 hover:bg-white/[0.04] transition-[color,background-color,border-color] duration-300 text-white/80 hover:text-white font-medium"
              >
                LinkedIn
              </a>
              <a
                href="https://www.behance.net/shubhamshinde"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white/60 hover:bg-white/[0.04] transition-[color,background-color,border-color] duration-300 text-white/80 hover:text-white font-medium"
              >
                Behance
              </a>
              <a
                href="https://www.instagram.com/5hinde/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white/60 hover:bg-white/[0.04] transition-[color,background-color,border-color] duration-300 text-white/80 hover:text-white font-medium"
              >
                Instagram
              </a>
            </div>

            {/* Center: Location & One-Click Copy Email */}
            <div className="text-center font-normal text-white/75 flex flex-wrap items-center justify-center gap-2">
              <span>Working with clients worldwide &bull;</span>
              <a
                href={`mailto:${email}`}
                className="text-white hover:underline font-semibold transition-colors"
              >
                {email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-white/20 hover:border-white/60 active:scale-[0.97] transition-[border-color,transform] cursor-pointer text-white/80 relative overflow-hidden"
                title="Copy email address"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={copied ? "copied" : "copy"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            {/* Right: Start a project + Up Scroll Pill Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="group px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white font-medium flex items-center gap-2 transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.98] shadow-2xs"
              >
                <span>Start a project</span>
                <span className="font-mono text-base leading-none text-emerald-400 group-hover:scale-125 transition-transform duration-300">+</span>
              </a>
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white/60 hover:bg-white/[0.04] text-white font-medium flex items-center gap-1.5 active:scale-[0.97] transition-[background-color,border-color,transform] duration-300 cursor-pointer"
                aria-label="Scroll to top"
              >
                <span>&uarr;</span>
                <span>Up</span>
              </button>
            </div>

          </div>

          {/* Final Studio Copyright Line */}
          <div className="max-w-7xl mx-auto pt-6 mt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs font-sans font-light text-white/50 text-center sm:text-left">
            <span>&copy; 2026 Shubham Shinde. Visual storyteller &amp; designer.</span>
            <span className="italic font-serif text-white/45">
              Taste is not decoration &bull; It is decision-making.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
