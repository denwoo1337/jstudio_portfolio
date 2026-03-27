"use client"

import { User, Briefcase, MessageCircle } from "lucide-react"
import { TubeLightNavbar } from "@/components/ui/tube-light-navbar"

const navItems = [
  { name: "Über mich", href: "#about", icon: User },
  { name: "Projekte", href: "#portfolio", icon: Briefcase },
  { name: "Kontakt", href: "#contact", icon: MessageCircle },
]

function Logo() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-baseline gap-0 focus:outline-none whitespace-nowrap"
      aria-label="Zurück nach oben"
    >
      <span className="font-display font-normal text-gray-200 text-base tracking-tight">
        J.&nbsp;
      </span>
      <span className="font-display font-extrabold text-base tracking-tight gradient-text">
        Studio
      </span>
    </button>
  )
}

function CTAButton() {
  function handleClick() {
    const el = document.getElementById("contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative group">
      <div
        className="absolute inset-0 -m-2 rounded-full
                   bg-purple-400 opacity-20 filter blur-lg pointer-events-none
                   transition-all duration-300 ease-out
                   group-hover:opacity-40 group-hover:blur-xl group-hover:-m-3"
      />
      <button
        onClick={handleClick}
        className="relative z-10 px-4 py-1.5 text-xs sm:text-sm font-semibold gradient-btn rounded-full focus:outline-none whitespace-nowrap"
      >
        Gespräch starten
      </button>
    </div>
  )
}

export default function Navbar() {
  return (
    <TubeLightNavbar
      items={navItems}
      logo={<Logo />}
      cta={<CTAButton />}
    />
  )
}
