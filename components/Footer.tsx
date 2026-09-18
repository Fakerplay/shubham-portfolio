"use strict";
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import LightLeakBackground from "@/components/LightLeakBackground";
import { EASE_OUT } from "@/lib/motion";
import { SITE_LOCATION, SOCIAL_LINKS } from "@/lib/site";

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
  const pathname = usePathname() || "/";
  const [copied, setCopied] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isUnpacked, setIsUnpacked] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const email = "shubhamshinde52@gmail.com";

  // Form State
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    companyWebsite: "",
    requirements: "",
    challenges: "",
    timeline: "",
    budget: "",
    referral: "",
    honeypot: ""
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormError("");

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
        setFormError(data.error || "Required fields are missing or invalid.");
      }
    } catch (err) {
      setFormStatus('error');
      setFormError("A connection error occurred. Please try again.");
    }
  };

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
    <footer data-surface="dark" className="w-full relative z-10 border-t border-white/10 mt-auto bg-[#020d08] text-[#F5F5F7] overflow-hidden select-none pt-16 sm:pt-24 pb-8 dark">
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

                  {/* Front Lip / Folder Frosted Glass */}
                  <div className="relative z-10 w-full h-[68%] sm:h-[72%] rounded-t-[16px] sm:rounded-t-[20px] rounded-b-[22px] sm:rounded-b-[26px] backdrop-blur-xl bg-white/[0.18] dark:bg-black/[0.35] border-t border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] p-6 sm:p-8 flex flex-col justify-end">
                    
                    {/* Decorative Star Icon */}
                    <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white/95 group-hover:rotate-180 transition-transform duration-500 ease-out shadow-none">
                      <span className="text-sm sm:text-base font-bold">✦</span>
                    </div>

                    {/* Main Folder Title */}
                    <div className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                      <h3 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight">Studio Notes</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* STATE B: Unpacked Glass Cards */
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
                    className="group font-mono text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full backdrop-blur-xl bg-white/[0.12] border border-white/25 text-white hover:border-amber-400 hover:bg-white/20 transition-[background-color,border-color,transform] duration-300 flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span className="text-amber-500 transform group-hover:rotate-90 transition-transform duration-300">✕</span>
                    <span>Fold Notes Back Into Folder</span>
                  </button>
                </motion.div>

                {/* Unpacked Cards list */}
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
                        onMouseEnter={() => setActiveCardId(card.id)}
                        onMouseLeave={() => setActiveCardId(null)}
                        tabIndex={0}
                        className={`group w-[280px] sm:w-[310px] md:w-[330px] aspect-[3/4] rounded-[22px] p-6 sm:p-7 flex flex-col justify-between border relative overflow-hidden transition-[border-color,box-shadow] duration-500 will-change-transform bg-white/[0.03] select-none border-white/10 ${card.desktopMarginClass}`}
                        style={{
                          zIndex: isHovered ? 100 : card.zIndex,
                        }}
                      >
                        {/* Interactive Gradient Background */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-tr ${card.gradientClass} opacity-0 group-hover:opacity-[0.09] transition-opacity duration-700 ease-out pointer-events-none z-0`}
                        />

                        {/* Top Metadata Row */}
                        <div className="h-8 flex items-start justify-between relative z-10 w-full">
                          <span className="font-mono text-[9px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/[0.08] text-white/80 border border-white/10">
                            {card.label}
                          </span>
                          <div className="w-5 h-5 flex flex-wrap gap-[3px] content-start justify-end opacity-25">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <span key={i} className="w-[3px] h-[3px] rounded-full bg-white" />
                            ))}
                          </div>
                        </div>

                        {/* Center Main Content Copy */}
                        <div className="flex-1 flex flex-col justify-center relative z-10 text-left px-1">
                          <p className="font-sans font-medium text-[16px] sm:text-[18px] md:text-[20px] leading-[1.35] tracking-tight text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                            {card.text}
                          </p>
                        </div>

                        {/* Bottom Bar: Reveal Tag */}
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

        {/* 2. DYNAMIC PROJECT ENQUIRY FLOW SECTION */}
        <section id="contact" className="scroll-mt-24 w-full max-w-4xl mx-auto px-6 relative z-10 flex flex-col gap-10">
          
          <motion.div
            variants={headlineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-6"
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 w-fit select-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-wider">Currently available for new projects.</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-[1.15] tracking-tight">
              Building a brand, launching a product or improving how your company communicates?
            </h2>

            {/* SLA indicator */}
            <p className="font-sans text-xs md:text-sm text-white/50 tracking-normal leading-relaxed -mt-2 select-none">
              I usually reply within four working hours.
            </p>

            {/* Main Action Buttons */}
            {formStatus !== 'success' && (
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <button
                  onClick={() => setFormOpen(!formOpen)}
                  className="group/btn btn-primary px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.96] cursor-pointer flex items-center justify-center gap-3 text-center bg-white text-black border-transparent"
                >
                  <span>Tell me about the project</span>
                  <span className={`transition-transform duration-300 ${formOpen ? 'rotate-90' : ''}`}>&rarr;</span>
                </button>

                <a
                  href={`mailto:${email}?subject=Hiring%20for%20a%20design-leadership%20role`}
                  className="btn-secondary px-8 py-4 rounded-full font-sans font-medium text-sm transition-[transform,box-shadow,background-color,border-color] duration-300 hover:-translate-y-0.5 active:scale-[0.96] cursor-pointer text-white/80 hover:text-white border border-white/20 bg-white/5 hover:bg-white/10"
                >
                  Hiring for a design-leadership role? Get in touch.
                </a>
              </div>
            )}
          </motion.div>

          <AnimatePresence>
            {formOpen && formStatus !== 'success' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden w-full border-t border-white/10 pt-10"
              >
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  
                  {/* Honeypot Field */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name field */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="form-name" className="text-xs uppercase tracking-wider text-white/70 font-medium">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Emily Campbell"
                      className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/50 text-white rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="form-email" className="text-xs uppercase tracking-wider text-white/70 font-medium">
                      Work Email <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. emily@company.com"
                      className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/50 text-white rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Company field */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="form-company" className="text-xs uppercase tracking-wider text-white/70 font-medium">
                      Company Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="form-company"
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. WizCommerce"
                      className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/50 text-white rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Company Website field */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="form-company-website" className="text-xs uppercase tracking-wider text-white/70 font-medium">
                      Company Website <span className="text-white/40">(Optional)</span>
                    </label>
                    <input
                      id="form-company-website"
                      type="text"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleInputChange}
                      placeholder="e.g. www.company.com"
                      className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/50 text-white rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Textarea: Requirements */}
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-2.5">
                    <label htmlFor="form-requirements" className="text-xs uppercase tracking-wider text-white/70 font-medium">
                      What do you need? <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      id="form-requirements"
                      name="requirements"
                      required
                      rows={4}
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="Describe your design needs: branding, website, campaign creatives..."
                      className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/50 text-white rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors resize-y min-h-[100px]"
                    />
                  </div>

                  {/* Textarea: Challenges */}
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-2.5">
                    <label htmlFor="form-challenges" className="text-xs uppercase tracking-wider text-white/70 font-medium">
                      What is currently not working? <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      id="form-challenges"
                      name="challenges"
                      required
                      rows={3}
                      value={formData.challenges}
                      onChange={handleInputChange}
                      placeholder="What visual, technical, or strategic challenges does your brand currently face?"
                      className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-white/50 text-white rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors resize-y min-h-[80px]"
                    />
                  </div>

                  {/* Select: Timeline */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="form-timeline" className="text-xs uppercase tracking-wider text-white/70 font-medium">
                      Approximate Timeline <span className="text-emerald-400">*</span>
                    </label>
                    <select
                      id="form-timeline"
                      name="timeline"
                      required
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full bg-[#03150d] border border-white/10 hover:border-white/20 focus:border-white/50 text-white rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select option</option>
                      <option value="Under 1 month">Under 1 month</option>
                      <option value="1–3 months">1–3 months</option>
                      <option value="3–6 months">3–6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  {/* Select: Budget */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="form-budget" className="text-xs uppercase tracking-wider text-white/70 font-medium">
                      Project Budget <span className="text-emerald-400">*</span>
                    </label>
                    <select
                      id="form-budget"
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-[#03150d] border border-white/10 hover:border-white/20 focus:border-white/50 text-white rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select range</option>
                      <option value="Under US$1,500">Under US$1,500</option>
                      <option value="US$1,500–3,000">US$1,500–3,000</option>
                      <option value="US$3,000–6,000">US$3,000–6,000</option>
                      <option value="US$6,000–10,000">US$6,000–10,000</option>
                      <option value="US$10,000+">US$10,000+</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  {/* Select: Referral Source */}
                  <div className="flex flex-col gap-2.5 col-span-1 md:col-span-2">
                    <label htmlFor="form-referral" className="text-xs uppercase tracking-wider text-white/70 font-medium">
                      How did you find me? <span className="text-white/40">(Optional)</span>
                    </label>
                    <select
                      id="form-referral"
                      name="referral"
                      value={formData.referral}
                      onChange={handleInputChange}
                      className="w-full bg-[#03150d] border border-white/10 hover:border-white/20 focus:border-white/50 text-white rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select source</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Behance">Behance</option>
                      <option value="Search Engine">Search Engine</option>
                      <option value="Recommendation / Word of Mouth">Recommendation / Word of Mouth</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Error messaging state */}
                  {formStatus === 'error' && (
                    <div className="col-span-1 md:col-span-2 p-4 rounded-xl border border-red-500/35 bg-red-500/5 text-red-300 text-sm font-medium">
                      {formError}
                    </div>
                  )}

                  {/* Submit buttons */}
                  <div className="col-span-1 md:col-span-2 pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/95 active:scale-[0.97] transition-all disabled:opacity-50 select-none cursor-pointer text-sm tracking-wide flex items-center gap-3"
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending enquiry...</span>
                        </>
                      ) : (
                        <span>Submit enquiry</span>
                      )}
                    </button>
                  </div>

                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Call to Action State Card */}
          <AnimatePresence>
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full border border-emerald-500/25 bg-emerald-950/20 backdrop-blur-md rounded-3xl p-8 md:p-12 flex flex-col gap-6 items-start"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-medium">
                    Thank you!
                  </h3>
                </div>
                <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed max-w-xl">
                  Your enquiry has been successfully submitted. I usually reply within four working hours. In the meantime, you can schedule a call directly.
                </p>
                <a
                  href="https://calendly.com/shubhamshinde52/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full transition-[background-color,transform] duration-300 active:scale-[0.97] cursor-pointer text-sm tracking-wide shadow-lg shadow-emerald-500/20"
                >
                  <span>Schedule a 30-minute call ↗</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </section>

        {/* 3. BOTTOM PILL BAR & APPROVED SOCIALS */}
        <div className="w-full border-t border-white/10 pt-8 mt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-xs sm:text-sm font-sans">
            
            {/* Left: Social Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white/60 hover:bg-white/[0.04] transition-[color,background-color,border-color] duration-300 text-white/80 hover:text-white font-medium cursor-pointer"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white/60 hover:bg-white/[0.04] transition-[color,background-color,border-color] duration-300 text-white/80 hover:text-white font-medium cursor-pointer"
              >
                More projects on Behance
              </a>
            </div>

            {/* Center: Location & Email */}
            <div className="text-center font-normal text-white/75 flex flex-wrap items-center justify-center gap-2">
              <span>Based in {SITE_LOCATION} &bull; Working worldwide &bull;</span>
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

            {/* Right: Email & Up Scroll Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="group px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white font-medium flex items-center gap-2 transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.98] shadow-2xs"
              >
                <span>Email Shubham</span>
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
            <span>&copy; 2026 Shubham Shinde. Brand, campaigns &amp; creative direction.</span>
            <span className="italic font-serif text-white/45">
              Taste is not decoration &bull; It is decision-making.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
