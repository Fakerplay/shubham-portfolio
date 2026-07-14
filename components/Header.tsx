"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeDropdown from "./ThemeDropdown";
import LocalTime from "./LocalTime";
import ThemeLamp from "./ThemeLamp";
import HandDrawnLogo from "./HandDrawnLogo";
import { playClickSound } from "@/utils/audio";
import { EASE_OUT } from "@/lib/motion";

export default function Header() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isMuted, setIsMuted] = useState(false);
  const isScrollingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const programmaticScrollFrameRef = useRef<number | null>(null);
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerY = useMotionValue(0);
  const headerTransform = useMotionTemplate`translateY(${headerY}px)`;

  // Initialize mute state from localStorage
  useEffect(() => {
    const savedMute = localStorage.getItem("mute-clicks") === "true";
    setIsMuted(savedMute);
  }, []);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    localStorage.setItem("mute-clicks", String(nextMute));
    if (!nextMute) {
      setTimeout(() => playClickSound(0.12), 50);
    }
  };

  // Scroll visibility logic (top header hides/shows, bottom dock hides on scroll down)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Mobile bottom dock is visible if scrolled past 260px AND scrolling up
      const scrollingUp = currentScrollY < lastScrollYRef.current;
      const isPastThreshold = currentScrollY >= 260;
      setIsMobileNavVisible(isPastThreshold && (scrollingUp || currentScrollY < 300));
      
      if (isScrollingRef.current) {
        lastScrollYRef.current = currentScrollY;
        return;
      }
      
      const b = currentScrollY - lastScrollYRef.current;
      if (Math.abs(b) >= 6 || currentScrollY < 10) {
        if (currentScrollY < 10) {
          setIsVisible(true);
        } else if (b > 0 && currentScrollY > 80) {
          setIsVisible(false);
        } else if (b < 0) {
          setIsVisible(true);
        }
        lastScrollYRef.current = currentScrollY;
      }
    };

    lastScrollYRef.current = window.scrollY;
    setIsMobileNavVisible(window.scrollY >= 260);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (programmaticScrollFrameRef.current !== null) {
        cancelAnimationFrame(programmaticScrollFrameRef.current);
      }
      if (programmaticScrollTimeoutRef.current !== null) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, []);

  // Drive the header's show/hide transform off the main thread via a motion value
  useEffect(() => {
    animate(headerY, isVisible ? 0 : -120, { duration: 0.45, ease: EASE_OUT });
  }, [isVisible, headerY]);

  // Section intersection observer to track which section is in view
  useEffect(() => {
    const observedElements = new Set<string>();
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-25% 0px -55% 0px",
    });

    const sections = ["about", "work", "capabilities", "services", "contact"];
    
    const bindSections = () => {
      sections.forEach((id) => {
        if (observedElements.has(id)) return;
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observedElements.add(id);
        }
      });
    };

    bindSections();
    
    // Re-check for dynamically loaded DOM elements on scroll
    window.addEventListener("scroll", bindSections, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", bindSections);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClickSound(0.12);
    if (href === "/work" || href.startsWith("/work")) {
      router.push(href);
      return;
    }
    if (href.startsWith("#")) {
      if (pathname === "/") {
        const el = document.getElementById(href.replace("#", ""));
        if (el) {
          if (programmaticScrollFrameRef.current !== null) {
            cancelAnimationFrame(programmaticScrollFrameRef.current);
          }
          if (programmaticScrollTimeoutRef.current !== null) {
            clearTimeout(programmaticScrollTimeoutRef.current);
          }

          isScrollingRef.current = true;
          setIsVisible(true);
          el.scrollIntoView({ behavior: "smooth" });

          let previousScrollY = window.scrollY;
          let stableFrames = 0;
          let hasMoved = Math.abs(el.getBoundingClientRect().top) < 120;
          const finishProgrammaticScroll = () => {
            isScrollingRef.current = false;
            programmaticScrollFrameRef.current = null;
            if (programmaticScrollTimeoutRef.current !== null) {
              clearTimeout(programmaticScrollTimeoutRef.current);
              programmaticScrollTimeoutRef.current = null;
            }
          };
          const watchScroll = () => {
            const currentScrollY = window.scrollY;
            const movement = Math.abs(currentScrollY - previousScrollY);
            if (movement >= 0.5) hasMoved = true;
            stableFrames = hasMoved && movement < 0.5 ? stableFrames + 1 : 0;
            previousScrollY = currentScrollY;

            if (stableFrames >= 4) {
              finishProgrammaticScroll();
              return;
            }
            programmaticScrollFrameRef.current = requestAnimationFrame(watchScroll);
          };

          programmaticScrollFrameRef.current = requestAnimationFrame(watchScroll);
          programmaticScrollTimeoutRef.current = setTimeout(finishProgrammaticScroll, 1800);
        }
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  const navItems = [
    { label: "Work", mobileLabel: "Work", active: pathname.startsWith("/work") || (pathname === "/" && activeSection === "work"), href: "/work" },
    { label: "Capabilities", mobileLabel: "Skills", active: pathname === "/" && (activeSection === "capabilities" || activeSection === "services"), href: "#capabilities" },
    { label: "About", mobileLabel: "About", active: pathname === "/" && activeSection === "about", href: "#about" },
    { label: "Contact", mobileLabel: "Contact", active: pathname === "/" && activeSection === "contact", href: "#contact" },
  ];

  return (
    <>
      {/* 1. Desktop & Global Header Container */}
      <motion.header
        style={{ transform: headerTransform }}
        className="fixed top-0 left-0 right-0 w-full z-50 select-none"
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center p-6 md:p-12 text-xs md:text-sm font-semibold tracking-tight relative">
          
          {/* Left Column: Logo & Inline Navigation (Aligned on left, with full skeuomorphic tactility) */}
          <div className="flex-1 flex items-center justify-start gap-8 z-20">
            <Link href="/" aria-label="Home" onClick={() => playClickSound(0.12)}>
              <HandDrawnLogo />
            </Link>

            {/* Desktop Tactile Segmented Navigation */}
            <nav 
              className="hidden md:flex relative bg-zinc-900 border border-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_3px_rgba(255,255,255,0.05),0_12px_28px_rgba(0,0,0,0.65)] rounded-xl p-1 flex gap-1 pointer-events-auto"
              style={{
                backgroundImage: "repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) 1px, transparent 1px, transparent 4px)"
              }}
            >
              {navItems.map((item, idx) => (
                <Link 
                  key={idx}
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative py-2.5 px-4 rounded-lg flex items-center gap-2 active:scale-[0.97] transition-[color,transform] duration-300 font-sans text-[13px] md:text-[14px] font-medium tracking-normal select-none ${
                    item.active 
                      ? 'text-white font-semibold' 
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {/* Sliding Sunken Key Cap Background */}
                  {item.active && (
                    <motion.div
                      layoutId="activeTactileTab"
                      className="absolute inset-0 bg-zinc-800 border-t border-zinc-700/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_6px_rgba(0,0,0,0.5)] rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* 3D Vertical Ribbed Grips (molded switch handle ridges) */}
                  <div className={`flex gap-0.5 items-center opacity-60 mr-0.5 transition-opacity ${item.active ? 'opacity-90' : 'opacity-30'}`}>
                    <span className="w-[1.5px] h-3 bg-zinc-700 border-l border-zinc-950 border-r border-zinc-600 rounded-full" />
                    <span className="w-[1.5px] h-3 bg-zinc-700 border-l border-zinc-950 border-r border-zinc-600 rounded-full" />
                    <span className="w-[1.5px] h-3 bg-zinc-700 border-l border-zinc-950 border-r border-zinc-600 rounded-full" />
                  </div>

                  {/* Index Number */}
                  <span className={`text-[10px] md:text-[11px] transition-colors duration-300 ${
                    item.active ? 'text-emerald-400 font-bold' : 'text-zinc-650'
                  }`}>
                    0{idx + 1}
                  </span>

                  {/* Label Text (with active ambient text-shadow glow) */}
                  <span className={`font-semibold transition-[filter] duration-300 ${
                    item.active ? 'drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]' : ''
                  }`}>
                    {item.label}
                  </span>

                  {/* Glowing vertical LED lens slot */}
                  <div className="flex items-center justify-center pl-1 select-none">
                    <div className="w-2.5 h-4.5 rounded-full bg-zinc-950 border border-zinc-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] flex items-center justify-center">
                      <div className={`w-1 h-3 rounded-full transition-[background-color,box-shadow] duration-300 ${
                        item.active
                          ? 'bg-emerald-400 shadow-[0_0_8px_#34d399,0_0_15px_#10b981]'
                          : 'bg-zinc-800 border border-zinc-700/60 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]'
                      }`} />
                    </div>
                  </div>

                  {/* Segment Divider Line (only for non-active siblings) */}
                  {idx < 3 && !item.active && (
                    <div className="absolute right-0 top-2.5 bottom-2.5 w-[1px] bg-zinc-800/40 pointer-events-none" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Column: Utility Widgets (Time & dropdown time selector pushed to far right) */}
          <div className="flex-1 flex gap-4 items-center justify-end z-20 pointer-events-auto">
            {/* Audio Mute/Unmute toggle widget */}
            <button
              onClick={toggleMute}
              className={`min-w-11 min-h-11 flex items-center justify-center rounded-md hover:bg-foreground/5 active:scale-[0.97] transition-[background-color,color,transform] duration-300 text-foreground/50 hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 ${pathname.startsWith("/work/") ? "hidden md:flex" : "flex"}`}
              title={isMuted ? "Unmute clicks" : "Mute clicks"}
              aria-label={isMuted ? "Unmute clicks" : "Mute clicks"}
            >
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            <ThemeLamp />
            <div className={`h-4 w-[1px] bg-foreground/10 ${pathname.startsWith("/work/") ? "hidden md:block" : "block"}`} />
            <div className={pathname.startsWith("/work/") ? "hidden md:block" : "block"}>
              <LocalTime />
            </div>
            <div className={pathname.startsWith("/work/") ? "hidden md:block" : "block"}>
              <ThemeDropdown />
            </div>
          </div>

        </div>
      </motion.header>

      {/* 2. Mobile Center Bottom Tactile Navigation */}
      <div className={`mobileNavDock fixed left-1/2 -translate-x-1/2 z-50 select-none w-auto max-w-[92vw] md:hidden transition-[opacity,transform] duration-300 ${
        isMobileNavVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}>
        <nav 
          className="relative bg-zinc-900 border border-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_28px_rgba(0,0,0,0.5)] rounded-xl p-1 flex gap-1"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) 1px, transparent 1px, transparent 4px)"
          }}
        >
          {navItems.map((item, idx) => (
            <Link 
              key={idx}
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative py-2 px-3 rounded-lg flex items-center gap-1.5 active:scale-[0.97] transition-[color,transform] duration-300 font-sans text-[11px] font-medium tracking-normal select-none ${
                item.active 
                  ? 'text-white font-semibold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {/* Sliding Background Key Cap */}
              {item.active && (
                <motion.div
                  layoutId="activeHeaderTabMobile"
                  className="absolute inset-0 bg-zinc-800 border-t border-zinc-700/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.5)] rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Index Number */}
              <span className={`text-[9px] transition-colors duration-300 ${
                item.active ? 'text-emerald-400 font-bold' : 'text-zinc-650'
              }`}>
                0{idx + 1}
              </span>
              <span className="font-semibold text-[10px]">{item.mobileLabel}</span>

              {/* Glowing vertical LED lens slot */}
              <div className="flex items-center justify-center pl-0.5 select-none">
                <div className="w-2 h-3.5 rounded-full bg-zinc-950 border border-zinc-900 shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.9)] flex items-center justify-center">
                  <div className={`w-0.5 h-2 rounded-full transition-[background-color,box-shadow] duration-300 ${
                    item.active
                      ? 'bg-emerald-400 shadow-[0_0_6px_#34d399,0_0_10px_#10b981]'
                      : 'bg-zinc-800 border border-zinc-700/60 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]'
                  }`} />
                </div>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* 3. Left Gutter Vertical Section Dot Navigation (Clean floating indicator from screenshot) */}
      <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-40 pointer-events-auto">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="group relative flex items-center justify-center w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 rounded-full"
            title={`Scroll to ${item.label}`}
          >
            <div className={`rounded-full transition-[width,height,background-color,box-shadow,opacity,transform] duration-300 ${
              item.active
                ? 'w-2 h-2 bg-foreground shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-100 scale-125'
                : 'w-1.5 h-1.5 bg-foreground/30 group-hover:bg-foreground/60 scale-100'
            }`} />
            
            {/* Tooltip Label */}
            <span className="absolute left-8 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-white font-sans text-[10px] font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
