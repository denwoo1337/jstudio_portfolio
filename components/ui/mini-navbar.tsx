"use client";

import React, { useState, useEffect, useRef } from "react";

const AnimatedNavLink = ({
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex overflow-hidden h-5 items-center text-sm focus:outline-none"
    >
      <div className="flex flex-col transition-transform duration-300 ease-out transform group-hover:-translate-y-1/2">
        <span className="block h-5 leading-5 text-gray-400">{children}</span>
        <span className="block h-5 leading-5 text-white">{children}</span>
      </div>
    </button>
  );
};

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function MiniNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);

    if (isOpen) {
      setHeaderShapeClass("rounded-2xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  function handleNavClick(href: string) {
    setIsOpen(false);
    setTimeout(() => scrollToSection(href), isOpen ? 320 : 0);
  }

  function handleCTAClick() {
    setIsOpen(false);
    setTimeout(() => scrollToSection("#contact"), isOpen ? 320 : 0);
  }

  const navLinksData = [
    { label: "Über mich", href: "#about" },
    { label: "Projekte", href: "#portfolio" },
    { label: "Kontakt", href: "#contact" },
  ];

  const logoElement = (
    <button
      onClick={scrollToTop}
      className="flex items-baseline gap-0 focus:outline-none"
      aria-label="Zurück nach oben"
    >
      <span className="font-display font-normal text-gray-200 text-base tracking-tight">
        J.&nbsp;
      </span>
      <span className="font-display font-extrabold text-base tracking-tight gradient-text">
        Studio
      </span>
    </button>
  );

  const ctaButton = (
    <div className="relative group w-full sm:w-auto">
      <div
        className="absolute inset-0 -m-2 rounded-full
                   hidden sm:block
                   bg-purple-400
                   opacity-20 filter blur-lg pointer-events-none
                   transition-all duration-300 ease-out
                   group-hover:opacity-40 group-hover:blur-xl group-hover:-m-3"
      />
      <button
        onClick={handleCTAClick}
        className="relative z-10 px-4 py-1.5 sm:px-4 text-xs sm:text-sm font-semibold
                   gradient-btn rounded-full w-full sm:w-auto focus:outline-none"
      >
        Gespräch starten
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50
                 flex flex-col items-center
                 pl-5 pr-5 py-3 backdrop-blur-md
                 ${headerShapeClass}
                 border border-white/10 bg-[#1f1f1f70]
                 w-[calc(100%-2rem)] sm:w-auto
                 transition-[border-radius] duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        {logoElement}

        <nav className="hidden sm:flex items-center space-x-6 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center">
          {ctaButton}
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {isOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`sm:hidden flex flex-col items-center w-full
                   transition-all ease-in-out duration-300 overflow-hidden
                   ${isOpen ? "max-h-96 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-gray-300 hover:text-white transition-colors w-full text-center text-base focus:outline-none"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mt-5 w-full pb-1">{ctaButton}</div>
      </div>
    </header>
  );
}
