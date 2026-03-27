"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const animationVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const transitionConfig = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export default function About() {
  const handleContactScroll = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--surface)] overflow-hidden"
    >
      {/* Background blob */}
      <div
        className="absolute top-[-60px] right-[-60px] w-[400px] h-[400px] rounded-full opacity-20 bg-[radial-gradient(circle,#2563eb_0%,transparent_70%)] blur-[100px] animate-blob-float pointer-events-none"
        style={{ animationDelay: "-5s" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-20 items-start relative z-10">
        {/* Left Column */}
        <motion.div
          variants={animationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...transitionConfig, delay: 0 }}
        >
          {/* Photo */}
          <div className="w-full aspect-[3/4] max-w-xs rounded-2xl overflow-hidden border border-[var(--border)] relative"
            style={{ boxShadow: "0 0 40px rgba(124,58,237,0.15)" }}
          >
            <Image
              src="/about-photo.jpg"
              alt="James — Webdesigner aus dem Allgäu"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>

          {/* Stats */}
          <div className="mt-8">
            <div className="border-t border-[var(--border)] pt-4 pb-4">
              <p className="font-display font-extrabold text-3xl gradient-text">
                2+
              </p>
              <p className="font-body text-sm text-muted">
                Projekte abgeschlossen
              </p>
            </div>
            <div className="border-t border-[var(--border)] pt-4 pb-4">
              <p className="font-display font-extrabold text-3xl gradient-text">
                100%
              </p>
              <p className="font-body text-sm text-muted">
                Zufriedene Kunden
              </p>
            </div>
            <div className="border-t border-[var(--border)] pt-4 pb-4">
              <p className="font-display font-extrabold text-3xl text-foreground">
                Fair
              </p>
              <p className="font-body text-sm text-muted">
                Preise ohne Überraschungen
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          variants={animationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...transitionConfig, delay: 0.15 }}
        >
          <p
            className="font-body text-[10px] uppercase gradient-text"
            style={{ letterSpacing: "4px" }}
          >
            WER STECKT DAHINTER
          </p>

          <h2 className="font-display font-extrabold tracking-tighter leading-none text-4xl md:text-5xl mt-4 uppercase">
            Hi, ich bin
            <br />
            <span className="gradient-text-animated">James.</span>
            <br />
            <span className="text-muted font-light not-italic text-3xl md:text-4xl normal-case">
              Webdesigner aus dem Allgäu.
            </span>
          </h2>

          <div className="mt-6 space-y-4 font-body text-base text-muted leading-relaxed">
            <p>
              Ich habe J. Studio gegründet, weil ich gesehen habe, dass viele
              lokale Betriebe im Allgäu entweder keine Website haben oder mit
              einer veralteten Seite kämpfen. Dabei ist eine professionelle
              Web-Präsenz heute kein Luxus — sie ist die Visitenkarte deines
              Betriebs.
            </p>
            <p>
              Ich arbeite direkt mit meinen Kunden zusammen, ohne unnötige
              Zwischenstufen. Das bedeutet: kurze Wege, faire Preise und eine
              Website, die wirklich zu deinem Betrieb passt.
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={handleContactScroll}
              className="gradient-btn font-body text-sm px-6 py-3 rounded-full"
            >
              Jetzt Kontakt aufnehmen
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
