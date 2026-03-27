"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowSquareOut } from "@phosphor-icons/react";
import type { Project } from "./ProjectCard";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const isLive = project?.status === "Live";

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050508]/90 z-40 backdrop-blur-xl"
            style={{ touchAction: "none" }}
          />

          {/* Modal */}
          <motion.div
            key={`modal-${project.id}`}
            layoutId={`project-${project.id}`}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-[var(--card)] rounded-3xl overflow-hidden flex flex-col border border-[var(--border)]"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Gradient top border */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#7c3aed] via-[#c026d3] to-[#2563eb] flex-shrink-0" />

            {/* Header preview */}
            <motion.div
              layoutId={`project-preview-${project.id}`}
              className="relative h-48 md:h-72 flex-shrink-0"
              style={{ background: project.previewColor }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-extrabold text-white/20 text-8xl tracking-tight">
                  {project.title.charAt(0)}
                </span>
              </div>

              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--card)]/90 backdrop-blur-sm flex items-center justify-center hover:bg-[var(--surface)] transition-colors focus:outline-none border border-[var(--border)]"
                aria-label="Modal schließen"
              >
                <X size={20} weight="bold" className="text-foreground" />
              </button>
            </motion.div>

            {/* Content */}
            <motion.div
              layoutId={`project-content-${project.id}`}
              className="flex-1 overflow-y-auto p-6 md:p-10"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <motion.h2
                    layoutId={`project-title-${project.id}`}
                    className="font-display font-extrabold text-foreground text-3xl md:text-4xl tracking-tight leading-none mb-2"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.span
                    layoutId={`project-badge-${project.id}`}
                    className={`inline-flex text-xs px-2.5 py-1 rounded-full font-body ${
                      isLive
                        ? "gradient-btn"
                        : "bg-[var(--surface)] text-muted border border-[var(--border)]"
                    }`}
                  >
                    {project.status}
                  </motion.span>
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-2 gradient-btn font-body text-sm px-5 py-2.5 rounded-full"
                  >
                    Website ansehen
                    <ArrowSquareOut size={16} />
                  </a>
                )}
              </div>

              <p className="font-body text-base text-muted leading-relaxed mb-8">
                {project.description}
              </p>

              <div>
                <p className="font-body text-xs uppercase tracking-[4px] gradient-text mb-3">
                  TECHNOLOGIEN
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-body px-3 py-1.5 rounded-full bg-[var(--surface)] text-muted border border-[var(--border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
