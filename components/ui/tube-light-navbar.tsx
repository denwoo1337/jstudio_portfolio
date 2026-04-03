"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
  icon: LucideIcon
}

interface TubeLightNavbarProps {
  items: NavItem[]
  className?: string
  logo?: React.ReactNode
  cta?: React.ReactNode
}

export function TubeLightNavbar({ items, className, logo, cta }: TubeLightNavbarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [menuOpen, setMenuOpen] = useState(false)
  const clickedRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickedRef.current) return
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = items.find((item) => item.href === `#${entry.target.id}`)
            if (matched) setActiveTab(matched.name)
          }
        })
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    )

    items.forEach((item) => {
      const id = item.href.replace("#", "")
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  function handleClick(item: NavItem) {
    setActiveTab(item.name)
    setMenuOpen(false)
    clickedRef.current = true
    const id = item.href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setTimeout(() => { clickedRef.current = false }, 1000)
  }

  return (
    <header
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto",
        className,
      )}
    >
      {/* Desktop navbar */}
      <div className="flex items-center gap-3 bg-[#1f1f1f70] border border-white/10 backdrop-blur-md py-2 px-3 rounded-full shadow-lg">
        {logo && <div className="pl-2 pr-1">{logo}</div>}

        {/* Nav items — hidden on mobile */}
        <nav className="hidden sm:flex items-center">
          {items.map((item) => {
            const isActive = activeTab === item.name
            return (
              <button
                key={item.name}
                onClick={() => handleClick(item)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-4 py-1.5 rounded-full transition-colors focus:outline-none",
                  "text-gray-400 hover:text-white",
                  isActive && "text-white",
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="tube-lamp"
                    className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-500 rounded-t-full">
                      <div className="absolute w-12 h-6 bg-purple-500/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-purple-500/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-purple-500/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </button>
            )
          })}
        </nav>

        {/* CTA — hidden on mobile */}
        {cta && <div className="hidden sm:block pl-1 pr-1">{cta}</div>}

        {/* Hamburger — mobile only */}
        <button
          className="sm:hidden ml-auto p-1.5 text-gray-400 hover:text-white focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü öffnen"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="sm:hidden mt-2 bg-[#1f1f1f70] border border-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden"
          >
            {items.map((item) => {
              const isActive = activeTab === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => handleClick(item)}
                  className={cn(
                    "w-full text-left px-5 py-3 text-sm font-semibold transition-colors focus:outline-none",
                    isActive ? "text-white bg-white/5" : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 mb-0.5" />
                  )}
                  {item.name}
                </button>
              )
            })}
            <div className="px-4 py-3 border-t border-white/10">{cta}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
