"use client";
import React from "react";
import { motion } from "framer-motion";

interface ShutterLine {
  text: string;
  gradient?: boolean;
}

interface HeroShutterTextProps {
  lines: ShutterLine[];
  className?: string;
}

export default function HeroShutterText({ lines, className = "" }: HeroShutterTextProps) {
  let globalCharIndex = 0;

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {lines.map((line, lineIdx) => {
        const chars = line.text.split("");
        return (
          <div key={lineIdx} className="flex flex-wrap justify-center">
            {chars.map((char, charIdx) => {
              const delay = globalCharIndex * 0.04;
              globalCharIndex++;
              return (
                <div key={charIdx} className="relative px-[0.5px] overflow-hidden">
                  {/* Settled character */}
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: delay + 0.3, duration: 0.8 }}
                    className={`font-display font-extrabold tracking-tighter leading-none text-5xl md:text-6xl lg:text-8xl uppercase ${
                      line.gradient ? "gradient-text-animated" : "text-white"
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>

                  {/* Top shutter slice — accent-1 purple */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 0.7, delay, ease: "easeInOut" }}
                    className="absolute inset-0 font-display font-extrabold tracking-tighter leading-none text-5xl md:text-6xl lg:text-8xl uppercase text-[#7c3aed] z-10 pointer-events-none"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
                  >
                    {char}
                  </motion.span>

                  {/* Middle shutter slice — white */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: "-100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 0.7, delay: delay + 0.1, ease: "easeInOut" }}
                    className="absolute inset-0 font-display font-extrabold tracking-tighter leading-none text-5xl md:text-6xl lg:text-8xl uppercase text-white/80 z-10 pointer-events-none"
                    style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
                  >
                    {char}
                  </motion.span>

                  {/* Bottom shutter slice — accent-2 fuchsia */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 0.7, delay: delay + 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 font-display font-extrabold tracking-tighter leading-none text-5xl md:text-6xl lg:text-8xl uppercase text-[#c026d3] z-10 pointer-events-none"
                    style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
                  >
                    {char}
                  </motion.span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
