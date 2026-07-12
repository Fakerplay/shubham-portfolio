"use client";

import React, { useEffect, useState } from "react";

const PHRASES = [
  "reshuffling our roles",
  "transforming our practice",
  "augmenting our creativity",
];

export default function TerminalTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = PHRASES[phraseIndex];

    if (isWaiting) {
      // Pause at full phrase
      timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (isDeleting) {
      if (currentText.length === 0) {
        // Done deleting, go to next phrase
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }, 0);
      } else {
        // Delete a character
        timer = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, 40); // deletion speed
      }
    } else {
      if (currentText.length === currentPhrase.length) {
        // Done typing, pause
        timer = setTimeout(() => {
          setIsWaiting(true);
        }, 0);
      } else {
        // Type a character
        timer = setTimeout(() => {
          setCurrentText((prev) => currentPhrase.slice(0, prev.length + 1));
        }, 90); // typing speed
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isWaiting, phraseIndex]);


  return (
    <span className="font-mono text-[11px] md:text-[13px] bg-zinc-950 text-zinc-100 border border-zinc-800 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1 align-middle mx-1 shadow-inner select-none font-semibold">
      <span className="text-zinc-500">&gt;/</span>
      <span className="text-zinc-300">~</span>
      <span>{currentText}</span>
      <span className="animate-pulse w-1 h-3.5 bg-zinc-100 inline-block align-middle" />
    </span>
  );
}

