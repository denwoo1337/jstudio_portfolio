"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowSquareOut, SpinnerGap } from "@phosphor-icons/react";
import type { Project } from "./ProjectCard";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!project) return;
    setIframeLoading(true);
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

  const modal = (
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
            className="fixed inset-x-8 md:inset-x-28 lg:inset-x-48 top-[15vh] bottom-[15vh] z-50 bg-[var(--card)] rounded-3xl overflow-hidden flex flex-col border border-[var(--border)]"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Gradient top border */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#0369a1] flex-shrink-0" />

            {/* Header preview */}
            <motion.div
              layoutId={`project-preview-${project.id}`}
              className="relative flex-1 min-h-0"
              style={{ background: project.previewColor }}
            >
              {project.embedUrl && !isMobile ? (
                <>
                  {/* Loading state */}
                  <AnimatePresence>
                    {iframeLoading && (
                      <motion.div
                        key="iframe-loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[var(--card)]"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <SpinnerGap size={32} weight="bold" className="text-white/50" />
                        </motion.div>
                        <p className="font-body text-sm text-white/30 tracking-wide">
                          Website wird geladen…
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.iframe
                    src={project.embedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                    title={project.title}
                    onLoad={() => setIframeLoading(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: iframeLoading ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Intercepts clicks but lets scroll through */}
                  {!iframeLoading && (
                    <div
                      className="absolute inset-0"
                      style={{ pointerEvents: "all" }}
                      onWheel={(e) => e.currentTarget.style.pointerEvents = "none"}
                      onMouseLeave={(e) => e.currentTarget.style.pointerEvents = "all"}
                    />
                  )}
                </>
              ) : project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              ) : project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-extrabold text-white/20 text-8xl tracking-tight">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}

              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:outline-none border border-white/30"
                aria-label="Modal schließen"
              >
                <X size={20} weight="bold" className="text-white" />
              </button>
            </motion.div>

            {/* Content */}
            <motion.div
              layoutId={`project-content-${project.id}`}
              className="flex-shrink-0 p-5 md:p-7"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <motion.h2
                      layoutId={`project-title-${project.id}`}
                      className="font-display font-extrabold text-foreground text-xl md:text-2xl tracking-tight leading-none"
                    >
                      {project.title}
                    </motion.h2>
                    <motion.span
                      layoutId={`project-badge-${project.id}`}
                      className={`flex-shrink-0 inline-flex text-xs px-2.5 py-1 rounded-full font-body ${
                        isLive
                          ? "gradient-btn"
                          : "bg-[var(--surface)] text-muted border border-[var(--border)]"
                      }`}
                    >
                      {project.status}
                    </motion.span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-body px-2.5 py-1 rounded-full bg-[var(--surface)] text-muted border border-[var(--border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center justify-center gap-2 gradient-btn font-body text-sm px-5 py-2.5 rounded-full"
                  >
                    Website ansehen
                    <ArrowSquareOut size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
