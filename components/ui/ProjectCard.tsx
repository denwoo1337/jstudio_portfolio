"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "Live" | "In Arbeit";
  url?: string;
  previewColor: string;
  image?: string;
  video?: string;
  embedUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  className?: string;
}

export default function ProjectCard({ project, onClick, className = "" }: ProjectCardProps) {
  const isLive = project.status === "Live";

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={() => onClick(project)}
      className={`bg-[var(--card)] rounded-2xl overflow-hidden cursor-pointer group border border-[var(--border)] flex flex-col ${className}`}
      whileHover={{ y: -4, boxShadow: "0 0 40px rgba(14,165,233,0.25)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Gradient top border line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#0369a1] opacity-70 flex-shrink-0" />

      {/* Preview */}
      <motion.div
        layoutId={`project-preview-${project.id}`}
        className="relative flex-1 min-h-[260px] overflow-hidden"
        style={{ background: project.previewColor }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-extrabold text-white/20 text-4xl tracking-tight">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div layoutId={`project-content-${project.id}`} className="px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between gap-3">
          <motion.h3
            layoutId={`project-title-${project.id}`}
            className="font-display font-extrabold text-foreground text-base leading-tight tracking-tight"
          >
            {project.title}
          </motion.h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-body px-2 py-0.5 rounded-full bg-[var(--surface)] text-muted border border-[var(--border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.span
              layoutId={`project-badge-${project.id}`}
              className={`flex-shrink-0 text-xs px-2.5 py-0.5 rounded-full font-body ${
                isLive
                  ? "gradient-btn"
                  : "bg-[var(--surface)] text-muted border border-[var(--border)]"
              }`}
            >
              {project.status}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
