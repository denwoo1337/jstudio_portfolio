"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "Start" },
  { id: "about", label: "Über mich" },
  { id: "portfolio", label: "Portfolio" },
  { id: "reviews", label: "Bewertungen" },
  { id: "contact", label: "Kontakt" },
];

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-4"
          aria-label="Seitennavigation"
        >
          {sections.map(({ id, label }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredSection === id;

            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                onMouseEnter={() => setHoveredSection(id)}
                onMouseLeave={() => setHoveredSection(null)}
                className="flex items-center gap-3 group"
                aria-label={`Zu ${label} scrollen`}
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                      className="text-xs font-medium text-[var(--foreground)] bg-[var(--background)] border border-[var(--border)] px-2 py-1 rounded-md whitespace-nowrap shadow-sm"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{
                    width: isActive ? 24 : isHovered ? 16 : 8,
                    height: isActive ? 8 : isHovered ? 8 : 8,
                    borderRadius: isActive ? 4 : 9999,
                    backgroundColor: isActive
                      ? "var(--accent-1)"
                      : isHovered
                      ? "var(--foreground)"
                      : "rgba(240, 240, 255, 0.35)",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ opacity: isActive ? 1 : 0.45 }}
                />
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
