"use client";

import { motion } from "framer-motion";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "Live" | "In Arbeit";
  url?: string;
  previewColor: string;
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
      className={`bg-[var(--card)] rounded-2xl overflow-hidden cursor-pointer group border border-[var(--border)] ${className}`}
      whileHover={{ y: -4, boxShadow: "0 0 40px rgba(124,58,237,0.25)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Gradient top border line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#7c3aed] via-[#c026d3] to-[#2563eb] opacity-70" />

      {/* Preview */}
      <motion.div
        layoutId={`project-preview-${project.id}`}
        className="relative h-48 md:h-56 overflow-hidden"
        style={{ background: project.previewColor }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-extrabold text-white/20 text-4xl tracking-tight">
            {project.title.charAt(0)}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div layoutId={`project-content-${project.id}`} className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <motion.h3
            layoutId={`project-title-${project.id}`}
            className="font-display font-extrabold text-foreground text-lg leading-tight tracking-tight"
          >
            {project.title}
          </motion.h3>
          <motion.span
            layoutId={`project-badge-${project.id}`}
            className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-body ${
              isLive
                ? "gradient-btn"
                : "bg-[var(--surface)] text-muted border border-[var(--border)]"
            }`}
          >
            {project.status}
          </motion.span>
        </div>
        <p className="font-body text-sm text-muted leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body px-2.5 py-1 rounded-full bg-[var(--surface)] text-muted border border-[var(--border)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
