"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  type Variants,
} from "framer-motion";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import LightPillar from "@/components/ui/LightPillar";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollY } = useScroll();

  const blurRaw = useTransform(scrollY, [0, 700], [0, 10]);
  const opacityRaw = useTransform(scrollY, [0, 700], [1, 0.55]);

  const springConfig = { stiffness: 80, damping: 25, mass: 0.5 };
  const blurPx = useSpring(blurRaw, springConfig);
  const opacity = useSpring(opacityRaw, springConfig);

  const filter = useMotionTemplate`blur(${blurPx}px)`;

  const scrollStyle = isMobile ? {} : { filter, opacity };

  return (
    <section
      id="hero"
      className="sticky top-0 z-0 min-h-[100dvh] bg-black flex flex-col"
    >
      <motion.div
        style={scrollStyle}
        className="absolute inset-0 flex flex-col px-6 md:px-12 lg:px-20 pt-20 overflow-hidden"
      >
        <LightPillar
          topColor="#ffffff"
          bottomColor="#3200bd"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={isMobile ? 0.012 : 0.003}
          pillarWidth={isMobile ? 2.5 : 6.4}
          pillarHeight={0.5}
          noiseIntensity={0}
          pillarRotation={218}
          interactive={false}
          mixBlendMode="normal"
          quality="high"
        />
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/30 pointer-events-none" />

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-start text-left flex-1 w-full justify-center gap-8"
        >
          {/* Headline group */}
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="font-body text-[10px] uppercase tracking-[4px] gradient-text mb-6"
            >
              Webdesign & Entwicklung
            </motion.p>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <HeroShutterText
                align="left"
                lines={[
                  { text: "DIGITALE" },
                  { text: "PRÄSENZ." },
                  { text: "MAXIMIERT.", gradient: true },
                ]}
              />
            </motion.div>
          </div>

          {/* CTA */}
          <div className="pb-10 md:pb-14 flex flex-col items-start gap-6">
            <motion.div variants={itemVariants}>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="gradient-btn font-body text-sm px-6 py-3 rounded-full focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:outline-none"
              >
                Projekte ansehen
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
