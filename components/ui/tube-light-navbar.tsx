"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
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
  function handleClick(item: NavItem) {
    setActiveTab(item.name)
    const id = item.href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-[#1f1f1f70] border border-white/10 backdrop-blur-md py-2 px-3 rounded-full shadow-lg">
        {/* Logo */}
        {logo && <div className="pl-2 pr-1">{logo}</div>}

        {/* Nav items */}
        <nav className="flex items-center">
          {items.map((item) => {
            const Icon = item.icon
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
                <span className="hidden sm:inline">{item.name}</span>
                <span className="sm:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
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

        {/* CTA */}
        {cta && <div className="pl-1 pr-1">{cta}</div>}
      </div>
    </header>
  )
}
