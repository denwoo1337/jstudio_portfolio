"use client"

import { useState } from "react"

interface MarqueeProps {
  children: React.ReactNode
  duration?: string
}

export default function Marquee({ children, duration = "40s" }: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex animate-marquee"
        style={{
          ["--marquee-duration" as string]: duration,
          animationPlayState: isHovered ? "paused" : "running",
        }}
      >
        <div className="flex gap-6 pr-6">{children}</div>
        <div className="flex gap-6 pr-6" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
