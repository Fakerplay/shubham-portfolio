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

  // Split showcaseGallery into 3 logical groups to correspond to decisions 01, 02, and 03
  const gallery = project.showcaseGallery || [];
  const totalImages = gallery.length;
  
  let group1End = Math.ceil(totalImages / 3);
  let group2End = Math.ceil((2 * totalImages) / 3);
  
  // Custom spacing adjustments for smaller directories
  if (totalImages === 4) {
    group1End = 1;
    group2End = 2;
  }

  const group1 = gallery.slice(0, group1End);
  const group2 = gallery.slice(group1End, group2End);
  const group3 = gallery.slice(group2End);

  // Format scope tags as lowercase/sentence-case comma-separated line
  const scopeLine = project.tags.map(tag => {
    const t = tag.trim().toLowerCase();
    // Keep 3d uppercase
    if (t === "3d visuals") return "3D visuals";
    return t;
  }).join(", ");

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
            <span className="hidden md:inline text-xs font-sans font-semibold tracking-normal text-foreground/45">
              {project.brand}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Header Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-16 md:pt-24 pb-8 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="font-serif font-light text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-[1.05] max-w-5xl">
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl font-sans font-normal text-foreground/75 leading-[1.5] max-w-4xl select-text">
            {project.subtitle}
          </p>
        </div>

        {/* Factual Metadata Row */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-x-12 md:gap-y-4 py-8 border-y border-foreground/15 text-[15px] font-sans font-normal text-foreground/85">
          <div className="flex items-center gap-2">
            <span className="text-foreground/45">Client &mdash;</span>
            <span className="text-foreground">{project.client}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground/45">Role &mdash;</span>
            <span className="text-foreground">{project.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground/45">Timeline &mdash;</span>
            <span className="text-foreground">{project.timeline}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground/45">Outcome &mdash;</span>
            <span className="text-foreground">{project.outcome}</span>
          </div>
        </div>

        {/* Combined Opening Narrative & Scope Line */}
        <div className="max-w-4xl pt-4 pb-8 flex flex-col gap-6">
          <div className="flex flex-col gap-6 text-lg md:text-xl font-sans font-light text-foreground/85 leading-relaxed select-text">
            <p>{project.context}</p>
            <p>{project.challenge}</p>
            <p>{project.responsibility}</p>
          </div>
          <div className="text-[14px] md:text-[15px] font-sans font-medium text-foreground/50 border-t border-foreground/10 pt-6 select-text">
            {scopeLine}
          </div>
        </div>
      </div>

      {/* Imagery & Decisions Rollout */}
      <div className="w-full flex flex-col gap-16 md:gap-24">
        
        {/* Cover / Hero Asset Slot */}
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

        {/* Group 1 & Decision 01 */}
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 flex flex-col gap-3.5">
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground font-light tracking-tight">{project.decision01.title}</h3>
            <p className="font-sans text-base md:text-lg text-foreground/75 leading-[1.6] max-w-4xl select-text">{project.decision01.text}</p>
          </div>
          <div className="w-full flex flex-col gap-6 md:gap-8">
            {group1.map((slot, idx) => (
              <FullWidthSlot key={slot.filename + idx} number={slot.number} slug={project.slug} filename={slot.filename} caption={slot.caption} />
            ))}
          </div>
        </div>

        {/* Group 2 & Decision 02 */}
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 flex flex-col gap-3.5">
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground font-light tracking-tight">{project.decision02.title}</h3>
            <p className="font-sans text-base md:text-lg text-foreground/75 leading-[1.6] max-w-4xl select-text">{project.decision02.text}</p>
          </div>
          <div className="w-full flex flex-col gap-6 md:gap-8">
            {group2.map((slot, idx) => (
              <FullWidthSlot key={slot.filename + idx} number={slot.number} slug={project.slug} filename={slot.filename} caption={slot.caption} />
            ))}
          </div>
        </div>

        {/* Group 3 & Decision 03 */}
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 flex flex-col gap-3.5">
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground font-light tracking-tight">{project.decision03.title}</h3>
            <p className="font-sans text-base md:text-lg text-foreground/75 leading-[1.6] max-w-4xl select-text">{project.decision03.text}</p>
          </div>
          <div className="w-full flex flex-col gap-6 md:gap-8">
            {group3.map((slot, idx) => (
              <FullWidthSlot key={slot.filename + idx} number={slot.number} slug={project.slug} filename={slot.filename} caption={slot.caption} />
            ))}
          </div>
        </div>

      </div>

      {/* Outcome Stated Qualitatively as a Closing Paragraph (No generic labels) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-16 pb-8 border-t border-foreground/15 mt-20 select-text">
        <p className="font-sans text-lg md:text-xl text-foreground/80 leading-[1.6] max-w-4xl font-light">{project.outcomeDetails}</p>
      </div>

      {/* Footer / Shared CTA */}
      <ProjectCTA nextProject={project.nextProject} />
    </div>
  );
}
