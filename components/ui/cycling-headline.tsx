"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fontClasses =
  "font-display font-extrabold tracking-tighter leading-none text-5xl md:text-6xl lg:text-8xl uppercase gradient-text-animated";

interface CyclingHeadlineProps {
  /** Each phrase must contain exactly one space, e.g. "Deine Webseite." */
  phrases: string[];
  /** Total char count of preceding static HeroShutterText lines (default: 12 = "Dein"(4) + "Betrieb."(8)) */
  charOffset?: number;
  /** Milliseconds before first phrase swap (default: 3500) */
  initialDelay?: number;
  /** Milliseconds between subsequent swaps (default: 3000) */
  interval?: number;
  className?: string;
}

export default function CyclingHeadline({
  phrases,
  charOffset = 12,
  initialDelay = 3500,
  interval = 3000,
  className = "",
}: CyclingHeadlineProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  // Track whether the initial shutter has already played
  const [hasLooped, setHasLooped] = useState(false);

  if (process.env.NODE_ENV === "development") {
    phrases.forEach((p, i) => {
      const count = (p.match(/ /g) || []).length;
      if (count !== 1)
        console.warn(
          `CyclingHeadline: phrase[${i}] "${p}" must contain exactly one space.`
        );
    });
  }

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      setHasLooped(true);
      setPhraseIndex((i) => (i + 1) % phrases.length);
      intervalId = setInterval(() => {
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, interval);
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [phrases.length, initialDelay, interval]);

  const phrase = phrases[phraseIndex];
  const spaceIdx = phrase.indexOf(" ");
  const word1 = phrase.slice(0, spaceIdx);
  const word2 = phrase.slice(spaceIdx + 1);

  // ── First load: shutter animation (same pattern as HeroShutterText) ───────
  if (!hasLooped) {
    let globalCharIdx = 0;

    const renderShutterLine = (text: string) => {
      const chars = text.split("");
      return (
        <div className="flex flex-wrap justify-center">
          {chars.map((char, i) => {
            const delay = (charOffset + globalCharIdx) * 0.04;
            globalCharIdx++;
            return (
              <div key={i} className="relative px-[0.5px] overflow-hidden">
                {/* Settled character */}
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: delay + 0.3, duration: 0.8 }}
                  className={fontClasses}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>

                {/* Top slice — purple */}
                <motion.span
                  aria-hidden="true"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{ duration: 0.7, delay, ease: "easeInOut" }}
                  className={`absolute inset-0 ${fontClasses} text-[#7c3aed] z-10 pointer-events-none`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
                >
                  {char}
                </motion.span>

                {/* Middle slice — white */}
                <motion.span
                  aria-hidden="true"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "-100%", opacity: [0, 1, 0] }}
                  transition={{ duration: 0.7, delay: delay + 0.1, ease: "easeInOut" }}
                  className={`absolute inset-0 ${fontClasses} text-white/80 z-10 pointer-events-none`}
                  style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
                >
                  {char}
                </motion.span>

                {/* Bottom slice — fuchsia */}
                <motion.span
                  aria-hidden="true"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{ duration: 0.7, delay: delay + 0.2, ease: "easeInOut" }}
                  className={`absolute inset-0 ${fontClasses} text-[#c026d3] z-10 pointer-events-none`}
                  style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
                >
                  {char}
                </motion.span>
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {renderShutterLine(word1)}
        {renderShutterLine(word2)}
      </div>
    );
  }

  // ── Subsequent phrases: per-character blur-in ──────────────────────────────
  const word1Chars = word1.split("");
  const word2Chars = word2.split("");

  // Pre-compute stagger delays across both lines in order
  const word1Delays = word1Chars.map((_, i) => i * 0.015);
  const word2Delays = word2Chars.map((_, i) => (word1Chars.length + i) * 0.015);

  const renderBlurLine = (chars: string[], delays: number[]) => (
    <div className="flex flex-wrap justify-center">
      {chars.map((char, i) => (
        <motion.span
          key={`${phraseIndex}-${i}`}
          className={`inline-block px-[0.5px] ${fontClasses}`}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delays[i], duration: 0.3, ease: "easeOut" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={phraseIndex}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="flex flex-col items-center"
        >
          {renderBlurLine(word1Chars, word1Delays)}
          {renderBlurLine(word2Chars, word2Delays)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
