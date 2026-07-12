"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { DETAILED_PROJECTS } from "@/data/projects";
import ProjectCTA from "@/components/ProjectCTA";

function FullWidthSlot({
  number,
  slug,
  filename,
  caption,
  priority = false
}: {
  number: string;
  slug: string;
  filename: string;
  caption: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const src = `/images/${slug}/${filename}`;

  return (
    <section className="w-full relative group px-6 md:px-[80px]">
      <div className="w-full relative overflow-hidden rounded-[12px] border border-foreground/15 shadow-xl bg-foreground/[0.015]">
        {!hasError ? (
          <Image
            src={src}
            alt={caption}
            width={2560}
            height={1440}
            priority={priority}
            quality={100}
            unoptimized
            onError={() => setHasError(true)}
            sizes="(max-width: 768px) 100vw, calc(100vw - 160px)"
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />
        ) : (
          <div className="w-full aspect-[16/9] md:aspect-[21/9] relative p-8 md:p-16 flex flex-col items-center justify-center font-mono text-xs select-all">
            <div className="max-w-xl w-full border border-dashed border-foreground/25 bg-background/80 backdrop-blur-md rounded-2xl p-8 md:p-12 flex flex-col items-center text-center gap-4 shadow-xl">
              <span className="font-semibold tracking-widest uppercase text-foreground/45">
                EXHIBIT {number} / FULL WIDTH VISUAL SPREAD
              </span>
              <div className="w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center text-foreground/50 text-xl font-light">
                +
              </div>
              <div>
                <h4 className="font-sans font-semibold text-base text-foreground mb-1">
                  {caption}
                </h4>
                <p className="font-sans text-xs text-foreground/60 leading-relaxed">
                  Drop your full-width image into your project directory on your computer.
                </p>
              </div>
              <div className="bg-foreground/[0.06] text-foreground font-mono text-xs px-3 py-1.5 rounded select-all">
                {src}
              </div>
              <span className="text-[11px] font-sans text-foreground/40 pt-2 border-t border-foreground/10 w-full">
                Recommended Resolution: 2560 × 1440 px (Widescreen Full Bleed)
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function WorkDetail() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const project = DETAILED_PROJECTS[slug];

  const [curatorMode, setCuratorMode] = useState(false);
  const [customGallery, setCustomGallery] = useState<{ number: string; filename: string; caption: string }[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (project?.showcaseGallery) {
      const saved = localStorage.getItem(`curator_order_${slug}`);
      if (saved) {
        try {
          setCustomGallery(JSON.parse(saved));
        } catch {
          setCustomGallery(project.showcaseGallery);
        }
      } else {
        setCustomGallery(project.showcaseGallery);
      }
    }
  }, [slug, project]);

  const moveItem = (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= customGallery.length) return;
    const next = [...customGallery];
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    
    // Re-assign sequential numbers starting from 02
    const renumbered = next.map((item, i) => ({
      ...item,
      number: (i + 2).toString().padStart(2, "0")
    }));
    
    setCustomGallery(renumbered);
    localStorage.setItem(`curator_order_${slug}`, JSON.stringify(renumbered));
  };

  const removeItem = (idx: number) => {
    const next = customGallery.filter((_, i) => i !== idx);
    const renumbered = next.map((item, i) => ({
      ...item,
      number: (i + 2).toString().padStart(2, "0")
    }));
    setCustomGallery(renumbered);
    localStorage.setItem(`curator_order_${slug}`, JSON.stringify(renumbered));
  };

  const resetOrder = () => {
    if (project?.showcaseGallery) {
      setCustomGallery(project.showcaseGallery);
      localStorage.removeItem(`curator_order_${slug}`);
    }
  };

  const copyOrderCode = () => {
    const code = `    showcaseGallery: [\n` +
      customGallery.map(item => `      { number: "${item.number}", filename: "${item.filename}", caption: "${item.caption}" }`).join(",\n") +
      `\n    ],`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center select-none">
        <h1 className="text-4xl font-sans font-semibold text-foreground mb-4">Case Study Not Found</h1>
        <p className="text-foreground/70 mb-8 max-w-md">
          We couldn&apos;t find the requested project showcase. It may have been archived or moved.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 rounded-full bg-foreground text-background font-sans font-medium text-sm hover:opacity-90 transition-opacity"
        >
          &larr; Return to Featured Work
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-background text-foreground selection:bg-foreground selection:text-background pb-32">
      {/* Top Sticky Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-foreground/10 px-6 md:px-16 lg:px-24 py-5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href="/#work" 
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-foreground/80 hover:text-foreground transition-colors group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            <span>Back to Featured Work</span>
          </Link>
          <div className="flex items-center gap-4">
            {project.showcaseGallery && (
              <button
                onClick={() => setCuratorMode(!curatorMode)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold active:scale-[0.97] transition-[background-color,color,border-color,box-shadow,transform] duration-300 flex items-center gap-2 border ${
                  curatorMode 
                    ? "bg-foreground text-background border-foreground shadow-lg scale-105" 
                    : "bg-foreground/5 text-foreground/80 border-foreground/15 hover:bg-foreground/10"
                }`}
              >
                <span>🎛️ Curator Studio Mode</span>
                <span className={`w-2 h-2 rounded-full ${curatorMode ? "bg-green-400 animate-pulse" : "bg-foreground/30"}`} />
              </button>
            )}
            <span className="hidden md:inline text-xs font-sans font-semibold tracking-widest uppercase text-foreground/45">
              {project.brand} &mdash; Case Study
            </span>
          </div>
        </div>
      </header>

      {/* Floating Curator Dock */}
      <AnimatePresence>
        {curatorMode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-50 bg-background/95 backdrop-blur-xl border border-foreground/20 rounded-full px-6 py-3.5 shadow-2xl flex items-center gap-6 max-w-xl w-full justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Live Gallery Reordering
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={resetOrder}
                className="px-3.5 py-1.5 rounded-full font-mono text-xs text-foreground/70 hover:text-foreground hover:bg-foreground/5 active:scale-[0.97] transition-[color,background-color,transform] border border-foreground/10"
                title="Restore original sequence and all removed images"
              >
                Reset &amp; Restore All
              </button>
              <button
                onClick={copyOrderCode}
                className="px-4 py-1.5 rounded-full bg-foreground text-background font-mono text-xs font-semibold hover:opacity-90 active:scale-[0.97] transition-[opacity,transform] flex items-center gap-1.5 shadow"
              >
                <span>{copied ? "✓ Copied TypeScript Config!" : "📋 Copy Order Code"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BRIEF INTRO SECTION: Title, Specs & Concise Overview */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-16 md:pt-24 pb-16 flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-sans font-semibold tracking-wider text-sm md:text-base uppercase text-foreground">
              {project.brand}
            </span>
            {project.year && (
              <>
                <span className="text-foreground/30">&bull;</span>
                <span className="text-sm font-sans font-medium text-foreground/60">
                  {project.year}
                </span>
              </>
            )}
          </div>

          <h1 className="font-sans font-semibold text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-[1.05] max-w-5xl">
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl font-sans font-normal text-foreground/75 leading-[1.5] max-w-4xl">
            {project.subtitle}
          </p>

          {project.liveUrl && (
            <div className="pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background font-sans font-semibold text-sm tracking-wide transition-[transform,box-shadow] duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98] w-fit"
              >
                <span>Visit Live Website</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">↗</span>
              </a>
            </div>
          )}
        </div>

        {/* Specs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-foreground/15">
          <div>
            <span className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-foreground/45 mb-1.5">Client</span>
            <span className="text-base font-sans font-medium text-foreground">{project.client}</span>
          </div>
          <div>
            <span className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-foreground/45 mb-1.5">Role</span>
            <span className="text-base font-sans font-medium text-foreground">{project.role}</span>
          </div>
          <div>
            <span className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-foreground/45 mb-1.5">Timeline</span>
            <span className="text-base font-sans font-medium text-foreground">{project.timeline}</span>
          </div>
          <div>
            <span className="block text-[11px] font-sans font-semibold uppercase tracking-widest text-foreground/45 mb-1.5">Primary Outcome</span>
            <span className="text-base font-sans font-semibold text-foreground">{project.metrics[0]?.value} {project.metrics[0]?.label}</span>
          </div>
        </div>

        {/* Brief Overview & Process Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-sans font-medium uppercase tracking-wider text-foreground/50 block mb-3">
              Disciplines &amp; Scope
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base md:text-lg font-sans font-normal text-foreground/90 tracking-tight">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-x-3">
                  <span>{tag}</span>
                  {idx < project.tags.length - 1 && <span className="text-foreground/35 font-light select-none">/</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-6 text-lg md:text-xl font-sans font-light text-foreground/85 leading-[1.6]">
            <p>{project.overview}</p>
            {project.chapters[0] && (
              <p className="text-foreground/70 text-base md:text-lg">{project.chapters[0].content[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* FULL WIDTH IMAGERY FLOW (15+ FULL WIDTH SHOWCASE SLOTS) */}
      <div className="w-full flex flex-col gap-6 md:gap-8">
        
        {/* Slot 01: Hero Cover Video/Image */}
        <section className="w-full relative group px-6 md:px-[80px]">
          <div className="w-full relative overflow-hidden rounded-[12px] border border-foreground/15 shadow-xl bg-foreground/[0.015]">
            {project.video || project.image?.endsWith(".mp4") || project.image?.endsWith(".webm") ? (
              <video 
                src={project.video || project.image} 
                poster={project.image?.endsWith(".mp4") || project.image?.endsWith(".webm") ? undefined : project.image}
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-auto block" 
              />
            ) : (
              <Image 
                src={project.image} 
                alt={project.title} 
                width={2560}
                height={1440}
                priority
                quality={100} 
                unoptimized 
                sizes="(max-width: 768px) 100vw, calc(100vw - 160px)" 
                className="w-full h-auto block" 
              />
            )}
          </div>
        </section>

        {/* Slots 02+: 100% Full Width Immersive Imagery */}
        {customGallery.length > 0 ? (
          customGallery.map((slot, idx) => (
            <div key={slot.filename + idx} className="relative group/curator">
              {curatorMode && (
                <div className="sticky top-20 z-40 max-w-7xl mx-auto px-6 md:px-16 -mb-14 pt-4 flex justify-end pointer-events-none">
                  <div className="pointer-events-auto bg-background/95 backdrop-blur-md border border-foreground/25 rounded-full px-4 py-2 shadow-xl flex items-center gap-3 font-mono text-xs text-foreground">
                    <span className="font-semibold text-foreground/50">[{slot.number}] {slot.filename}</span>
                    <div className="h-3 w-px bg-foreground/15" />
                    <button
                      onClick={() => moveItem(idx, "up")}
                      disabled={idx === 0}
                      className="px-2.5 py-1 rounded-full bg-foreground/5 hover:bg-foreground/15 disabled:opacity-30 disabled:hover:bg-transparent active:scale-[0.97] transition-[background-color,transform] font-bold"
                      title="Move Up"
                    >
                      ▲ Up
                    </button>
                    <button
                      onClick={() => moveItem(idx, "down")}
                      disabled={idx === customGallery.length - 1}
                      className="px-2.5 py-1 rounded-full bg-foreground/5 hover:bg-foreground/15 disabled:opacity-30 disabled:hover:bg-transparent active:scale-[0.97] transition-[background-color,transform] font-bold"
                      title="Move Down"
                    >
                      ▼ Down
                    </button>
                    <button
                      onClick={() => removeItem(idx)}
                      className="px-2.5 py-1 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 active:scale-[0.97] transition-[background-color,transform] font-bold flex items-center gap-1"
                      title="Remove Image from Sequence"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              )}
              <FullWidthSlot
                number={slot.number}
                slug={project.slug}
                filename={slot.filename}
                caption={slot.caption}
              />
            </div>
          ))
        ) : (
          <>
            <FullWidthSlot number="02" slug={project.slug} filename="02-full.jpg" caption="Brand Identity & Visual System Spread" />
            <FullWidthSlot number="03" slug={project.slug} filename="03-full.jpg" caption="Creative Direction Architecture" />
            <FullWidthSlot number="04" slug={project.slug} filename="04-full.jpg" caption="Core Interface Experience Showcase" />
            <FullWidthSlot number="05" slug={project.slug} filename="05-full.jpg" caption="High-Density Editorial UI & Typography" />
            <FullWidthSlot number="06" slug={project.slug} filename="06-full.jpg" caption="Interactive Prototyping & Motion System" />
            <FullWidthSlot number="07" slug={project.slug} filename="07-full.jpg" caption="Design Language Matrix & Visual Tokens" />
            <FullWidthSlot number="08" slug={project.slug} filename="08-full.jpg" caption="Platform Touchpoint Exploration — Desktop view" />
            <FullWidthSlot number="09" slug={project.slug} filename="09-full.jpg" caption="Platform Touchpoint Exploration — Mobile view" />
            <FullWidthSlot number="10" slug={project.slug} filename="10-full.jpg" caption="System Architecture & Component Library" />
            <FullWidthSlot number="11" slug={project.slug} filename="11-full.jpg" caption="Data Visualization & Dynamic Graphs" />
            <FullWidthSlot number="12" slug={project.slug} filename="12-full.jpg" caption="Editorial Layout & Narrative Progression" />
            <FullWidthSlot number="13" slug={project.slug} filename="13-full.jpg" caption="Micro-Interaction Details & Iconography" />
            <FullWidthSlot number="14" slug={project.slug} filename="14-full.jpg" caption="Design Asset Production & 3D Renderings" />
            <FullWidthSlot number="15" slug={project.slug} filename="15-full.jpg" caption="Executive Deck & Client Presentation Spread" />
            <FullWidthSlot number="16" slug={project.slug} filename="16-full.jpg" caption="Grand Finale & Future Horizon Concept" />
          </>
        )}

      </div>

      {/* POST-SHOWCASE CTA & NEXT PROJECT PREVIEW */}
      <ProjectCTA nextProject={project.nextProject} />
    </main>
  );
}
