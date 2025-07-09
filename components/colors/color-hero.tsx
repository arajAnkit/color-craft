"use client"

import { useEffect, useRef } from "react"

export function ColorHero() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window

      // Header animation
      gsap.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
    }
  }, [])

  return (
    <div ref={headerRef} className="text-center mb-12">
      <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">
        Colors
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Browse our comprehensive library of more than 500 carefully curated color names with multiple format support.
      </p>
    </div>
  )
}
