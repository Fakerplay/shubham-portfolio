"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DETAILED_PROJECTS } from "@/data/projects";
import ProjectCTA from "@/components/ProjectCTA";
import LazyVideo from "@/components/LazyVideo";

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

  if (hasError) return null;

  return (
    <section className="w-full relative group px-6 md:px-[80px]">
      <div className="w-full relative overflow-hidden rounded-[12px] border border-foreground/15 shadow-xl bg-foreground/[0.015]">
        <Image
          src={src}
          alt={caption}
          width={2560}
          height={1440}
          priority={priority}
          quality={85}
          onError={() => setHasError(true)}
          sizes="(max-width: 768px) 100vw, calc(100vw - 160px)"
          className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.01]"
        />
      </div>
    </section>
  );
}

export default function WorkDetail() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const project = DETAILED_PROJECTS[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center select-none">
        <h1 className="text-4xl font-serif font-light text-foreground mb-4">Case Study Not Found</h1>
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
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-foreground selection:text-background pb-32">
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
            <span className="hidden md:inline text-xs font-sans font-semibold tracking-widest uppercase text-foreground/45">
              {project.brand} &mdash; Case Study
            </span>
          </div>
        </div>
      </header>

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

          <h1 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-[1.05] max-w-5xl">
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
              <LazyVideo
                src={project.video || project.image}
                poster={project.image?.endsWith(".mp4") || project.image?.endsWith(".webm") ? undefined : project.image}
                priorityMargin="100px 0px"
                className="w-full h-auto block" 
              />
            ) : (
              <Image 
                src={project.image} 
                alt={project.title} 
                width={2560}
                height={1440}
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, calc(100vw - 160px)" 
                className="w-full h-auto block" 
              />
            )}
          </div>
        </section>

        {/* Slots 02+: 100% Full Width Immersive Imagery */}
        {project.showcaseGallery && project.showcaseGallery.length > 0 ? (
          project.showcaseGallery.map((slot, idx) => (
            <FullWidthSlot
              key={slot.filename + idx}
              number={slot.number}
              slug={project.slug}
              filename={slot.filename}
              caption={slot.caption}
            />
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
            <FullWidthSlot number="16" slug={project.slug} filename="16-full.jpg" caption="Final Concept & Project Direction" />
          </>
        )}

      </div>

      {/* POST-SHOWCASE CTA & NEXT PROJECT PREVIEW */}
      <ProjectCTA nextProject={project.nextProject} />
    </div>
  );
}
