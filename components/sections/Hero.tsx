"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type Variants,
} from "framer-motion";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import CyclingHeadline from "@/components/ui/cycling-headline";

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
  const { scrollY } = useScroll();
  const blurPx = useTransform(scrollY, [0, 500], [0, 14]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.92]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section
      id="hero"
      className="sticky top-0 z-0 min-h-[100dvh] overflow-hidden"
    >
      <motion.div
        style={{ filter, opacity, scale }}
        className="absolute inset-0 flex flex-col items-center px-6 md:px-12 lg:px-20"
      >
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src="/hero-bg-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        {/* Background blob */}
        <div
          className="absolute top-[40%] left-[40%] w-[350px] h-[350px] rounded-full opacity-15 bg-[radial-gradient(circle,#2563eb_0%,transparent_70%)] blur-[90px] animate-blob-float pointer-events-none"
          style={{ animationDelay: "-13s" }}
        />

        {/* Centered headline content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col items-center justify-center text-center relative z-10 max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="font-body text-[10px] uppercase tracking-[4px] gradient-text mb-6"
          >
            WEB-AGENTUR · ALLGÄU
          </motion.p>

          {/* Headline */}
          <motion.div variants={itemVariants}>
            <HeroShutterText
              lines={[
                { text: "Dein" },
                { text: "Betrieb." },
              ]}
            />
            <CyclingHeadline
              phrases={[
                "Deine Webseite.",
                "Dein Auftritt.",
                "Dein Kundenmagnet.",
                "Dein Kundengewinner.",
                "Deine Bühne.",
                "Dein Vertrieb.",
                "Dein Vorsprung.",
              ]}
            />
          </motion.div>

          {/* Body copy */}
          <motion.p
            variants={itemVariants}
            className="font-body text-sm md:text-base text-white/80 leading-relaxed max-w-md mt-6 mx-auto"
          >
            Professionelle Webpräsenz für Allgäuer Handwerker — fair, direkt, ohne Umwege.
          </motion.p>
        </motion.div>

        {/* Bottom: CTAs + Social proof */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 relative z-10 pb-10 md:pb-14"
        >
          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 flex-wrap items-center justify-center"
          >
            <button
              onClick={() => scrollToSection("portfolio")}
              className="gradient-btn font-body text-sm px-6 py-3 rounded-full"
            >
              Projekte ansehen
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="font-body text-sm text-muted hover:text-foreground transition-colors duration-200 border border-[var(--border)] px-6 py-3 rounded-full hover:border-[var(--accent-1)]"
            >
              Über mich →
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#c026d3] text-white flex items-center justify-center font-body text-[10px] font-semibold z-30 ring-2 ring-[var(--background)]">
                MK
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--card)] text-muted flex items-center justify-center font-body text-[10px] font-semibold -ml-2 z-20 ring-2 ring-[var(--background)]">
                SB
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--surface)] text-muted flex items-center justify-center font-body text-[10px] font-semibold -ml-2 z-10 ring-2 ring-[var(--background)]">
                TH
              </div>
            </div>
            <p className="font-body text-xs text-muted">
              Vertrauen von lokalen Betrieben im Allgäu
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
