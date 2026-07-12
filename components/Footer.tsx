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
    <footer className="w-full relative z-10 border-t border-foreground/15 mt-auto bg-transparent text-foreground transition-colors duration-500 overflow-hidden select-none pt-16 sm:pt-24 pb-8">
      {/* Exact WebGL Live Hero Light Leak Canvas Background & Noise */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <LightLeakBackground height="100%" mask={false} />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* 1. INTERACTIVE FOLDER ENVELOPE / POP-OUT STUDIO NOTES DECK */}
        <div className="w-full min-h-[440px] sm:min-h-[500px] flex items-center justify-center pt-10 pb-16">
          <AnimatePresence>
            {!isUnpacked ? (
              /* STATE A: Refined, Tactile Sunset Glass Studio Dossier / Envelope (`!isUnpacked`) */
              <motion.div
                key="envelope-folder"
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 1.06,
                  y: 45,
                  rotate: -2.5,
                  transition: { duration: 0.32, ease: EASE_OUT },
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
                viewport={{ once: true }}
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
                <div className="mt-7 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-foreground/[0.04] border border-foreground/10 text-foreground/80 font-mono text-xs uppercase tracking-wider group-hover:bg-foreground/[0.08] group-hover:text-foreground transition-colors duration-300 shadow-none">
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
                    className="group font-mono text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full backdrop-blur-xl bg-white/[0.12] dark:bg-white/[0.15] border border-white/25 text-foreground hover:border-amber-400 hover:bg-white/20 transition-[background-color,border-color,transform] duration-300 flex items-center gap-2 shadow-sm active:scale-95"
                  >
                    <span className="text-amber-500 transform group-hover:rotate-90 transition-transform duration-300">✕</span>
                    <span>Fold Notes Back Into Folder</span>
                  </button>
                </motion.div>

                {/* 6 Popped-Out Fanned Cards (Crystal clear `bg-white/[0.03]`, taut `rounded-[20px] sm:rounded-[22px]`, buttery spring hover) */}
                <motion.div
                  variants={containerVariants}
                  className="w-full flex flex-wrap lg:flex-nowrap items-center justify-center gap-6 sm:gap-7 lg:gap-0 px-2 sm:px-4"
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
                        className={`group relative w-full sm:w-[320px] md:w-[340px] lg:w-[355px] xl:w-[370px] h-[220px] sm:h-[235px] md:h-[245px] rounded-[20px] sm:rounded-[22px] p-6 sm:p-7 flex flex-col justify-between cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:rotate-0 backdrop-blur-xl bg-white/[0.03] dark:bg-white/[0.035] border border-white/[0.14] dark:border-white/[0.14] overflow-hidden will-change-transform ${
                          card.desktopMarginClass
                        } ${isHovered ? "!z-50 shadow-[0_20px_50px_rgba(0,0,0,0.16)] border-white/30" : "shadow-[0_8px_30px_rgba(0,0,0,0.08),_0_2px_8px_rgba(0,0,0,0.04)]"}`}
                        style={{
                          transformOrigin: "center center",
                          zIndex: isHovered ? 50 : card.zIndex,
                        }}
                      >
                        {/* 1. Subtle, delicate internal bottom aurora leak (Only transitions opacity cleanly on GPU) */}
                        <div className={`absolute -bottom-12 inset-x-0 h-28 bg-gradient-to-t ${card.gradientClass} opacity-45 group-hover:opacity-85 blur-[24px] pointer-events-none transition-opacity duration-300 ease-out`} />

                        {/* 2. Delicate top-left corner light catch (Only transitions opacity on GPU) */}
                        <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br ${card.gradientClass} blur-[26px] pointer-events-none opacity-35 group-hover:opacity-75 transition-opacity duration-300 ease-out`} />

                        {/* 3. Pin-sharp specular rim & soft diagonal surface reflection */}
                        <div className="absolute inset-0 rounded-[20px] sm:rounded-[22px] border border-white/[0.18] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_inset_0_-1px_1px_rgba(255,255,255,0.1)]" />
                        <div className="absolute inset-0 rounded-[20px] sm:rounded-[22px] bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />

                        {/* Center Main Serif Copy inside Crystal Glass Lens */}
                        <div className="flex-1 flex items-center justify-center px-1 py-2 relative z-10">
                          <p className={`font-serif text-xl sm:text-2xl md:text-[25px] font-normal leading-[1.25] text-center tracking-tight text-[#F5F5F7] dark:text-[#F8F8FA] drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-colors duration-300 ${card.accentTextClass}`}>
                            {card.text}
                          </p>
                        </div>

                        {/* Bottom Bar: Frosted Feathery Glass Pill */}
                        <div className="h-8 flex items-end justify-center overflow-hidden relative z-10">
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full backdrop-blur-md bg-white/[0.08] dark:bg-white/[0.1] border border-white/20 text-[#F5F5F7] flex items-center gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 transition-[opacity,transform] duration-300 ease-out whitespace-nowrap shadow-none">
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
          <div className="flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full border border-foreground/15 bg-foreground/[0.03]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-foreground/70">
              AVAILABLE FOR Q3 / Q4 PROJECTS
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-normal tracking-tight text-foreground leading-[1.04]">
            Let&rsquo;s make something <br className="hidden sm:inline" />
            <span className="italic font-light">clear</span>, memorable, <br className="hidden sm:inline" />
            and hard to ignore.
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-foreground/75 font-light max-w-2xl mx-auto mt-8 leading-relaxed">
            Available for brand systems, web experiences, motion-led visuals, and launch assets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10">
            <a
              href={`mailto:${email}`}
              className="px-8 py-4 sm:py-4.5 rounded-full bg-foreground text-background font-sans font-semibold text-sm sm:text-base tracking-wide transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] cursor-pointer flex items-center gap-3 shadow-md"
            >
              <span>Start a project</span>
              <span>&rarr;</span>
            </a>

            <Link
              href="/#work"
              className="px-8 py-4 sm:py-4.5 rounded-full border border-foreground/20 hover:border-foreground text-foreground font-sans font-medium text-sm sm:text-base transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.98]"
            >
              View work
            </Link>
          </div>
        </motion.div>

        {/* 3. BAJGART-INSPIRED ARCHITECTURAL BOTTOM PILL BAR & COPYRIGHT */}
        <div className="w-full border-t border-foreground/15 pt-8 mt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-xs sm:text-sm font-sans">
            
            {/* Left: Social Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <a
                href="https://www.linkedin.com/in/shubham-shinde-design/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-foreground/15 hover:border-foreground/60 hover:bg-foreground/[0.04] transition-[color,background-color,border-color] duration-300 text-foreground/80 hover:text-foreground font-medium"
              >
                LinkedIn
              </a>
              <a
                href="https://www.behance.net/shubhamshinde"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-foreground/15 hover:border-foreground/60 hover:bg-foreground/[0.04] transition-[color,background-color,border-color] duration-300 text-foreground/80 hover:text-foreground font-medium"
              >
                Behance
              </a>
              <a
                href="https://www.instagram.com/5hinde/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-foreground/15 hover:border-foreground/60 hover:bg-foreground/[0.04] transition-[color,background-color,border-color] duration-300 text-foreground/80 hover:text-foreground font-medium"
              >
                Instagram
              </a>
            </div>

            {/* Center: Location & One-Click Copy Email */}
            <div className="text-center font-normal text-foreground/75 flex flex-wrap items-center justify-center gap-2">
              <span>Working with clients worldwide &bull;</span>
              <a
                href={`mailto:${email}`}
                className="text-foreground hover:underline font-semibold transition-colors"
              >
                {email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-foreground/20 hover:border-foreground/60 active:scale-[0.97] transition-[border-color,transform] cursor-pointer text-foreground/80 relative overflow-hidden"
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
                className="px-5 py-2 rounded-full border border-foreground/25 hover:border-foreground text-foreground font-medium flex items-center gap-2 transition-[color,background-color,border-color] duration-300 hover:bg-foreground hover:text-background shadow-2xs"
              >
                <span>Start a project</span>
                <span className="font-mono text-base leading-none">+</span>
              </a>
              <button
                onClick={scrollToTop}
                className="px-4 py-2 rounded-full border border-foreground/15 hover:border-foreground/60 hover:bg-foreground/[0.04] text-foreground font-medium flex items-center gap-1.5 active:scale-[0.97] transition-[background-color,border-color,transform] duration-300 cursor-pointer"
                aria-label="Scroll to top"
              >
                <span>&uarr;</span>
                <span>Up</span>
              </button>
            </div>

          </div>

          {/* Final Studio Copyright Line */}
          <div className="max-w-7xl mx-auto pt-6 mt-8 border-t border-foreground/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs font-sans font-light text-foreground/50 text-center sm:text-left">
            <span>&copy; 2026 Shubham Shinde. Visual storyteller &amp; designer.</span>
            <span className="italic font-serif text-foreground/45">
              Taste is not decoration &bull; It is decision-making.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
