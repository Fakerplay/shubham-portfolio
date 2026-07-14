"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  priorityMargin?: string;
}

interface NetworkInformationWithSaveData {
  saveData?: boolean;
}

export default function LazyVideo({
  src,
  poster,
  className,
  priorityMargin = "200px 0px",
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canLoad, setCanLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: NetworkInformationWithSaveData }).connection;
    if (reducedMotion || connection?.saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) setCanLoad(true);
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.05);
      },
      { rootMargin: priorityMargin, threshold: [0, 0.05] },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [priorityMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canLoad) return;

    const syncPlayback = () => {
      if (isVisible && document.visibilityState === "visible") {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [canLoad, isVisible]);

  return (
    <video
      ref={videoRef}
      src={canLoad ? src : undefined}
      preload="none"
      poster={poster}
      loop
      muted
      playsInline
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}
