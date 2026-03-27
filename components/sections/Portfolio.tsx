"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import ProjectCard, { type Project } from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";

const projects: Project[] = [
  {
    id: "carwellness",
    title: "Carwellness Allgäu",
    description:
      "Professionelle Website für einen Fahrzeugpflegebetrieb im Allgäu. Klares Design, übersichtliche Leistungsübersicht und eine einfache Kontaktmöglichkeit — damit Kunden schnell finden, was sie suchen.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    status: "Live",
    url: "https://www.carwellness-allgaeu.de/",
    previewColor: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
  },
  {
    id: "alltec",
    title: "Alltec Anhängervermietung",
    description:
      "Website für einen lokalen Anhängervermietungsbetrieb. Übersichtliche Darstellung der verfügbaren Anhänger, Preise und unkomplizierte Buchungsanfrage.",
    tags: ["Next.js", "Tailwind CSS"],
    status: "In Arbeit",
    url: "https://alltec-anhaengervermietung.vercel.app/",
    previewColor: "linear-gradient(135deg, #c026d3 0%, #7c3aed 100%)",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--background)] overflow-hidden">
      {/* Background blob */}
      <div
        className="absolute bottom-[-100px] left-[-80px] w-[450px] h-[450px] rounded-full opacity-15 bg-[radial-gradient(circle,#7c3aed_0%,transparent_70%)] blur-[110px] animate-blob-float pointer-events-none"
        style={{ animationDelay: "-10s" }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="mb-12 relative z-10"
      >
        <p className="font-body text-[10px] uppercase tracking-[4px] gradient-text mb-4">
          MEINE PROJEKTE
        </p>
        <h2 className="font-display font-extrabold tracking-tighter leading-none text-4xl md:text-6xl text-foreground uppercase">
          Echte Websites.{" "}
          <span className="font-light italic text-muted normal-case text-3xl md:text-4xl">
            Echte Ergebnisse.
          </span>
        </h2>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 relative z-10"
      >
        {/* Card 1 — large */}
        <motion.div variants={cardVariants}>
          <ProjectCard
            project={projects[0]}
            onClick={setSelectedProject}
            className="h-full"
          />
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <motion.div variants={cardVariants}>
            <ProjectCard
              project={projects[1]}
              onClick={setSelectedProject}
            />
          </motion.div>

          {/* CTA placeholder card */}
          <motion.div
            variants={cardVariants}
            className="flex-1 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[140px] cursor-pointer transition-all duration-300 group relative overflow-hidden"
            style={{
              background: "var(--card)",
              border: "1px dashed rgba(124,58,237,0.35)",
            }}
            whileHover={{ boxShadow: "0 0 30px rgba(124,58,237,0.2)" }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <p className="font-display font-extrabold text-foreground text-base mb-1 group-hover:gradient-text transition-colors">
              Dein Betrieb könnte hier stehen
            </p>
            <p className="font-body text-xs text-muted">
              Jetzt anfragen →
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
