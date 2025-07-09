"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function GsapProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Dynamic import GSAP to avoid SSR issues
    const loadGsap = async () => {
      const gsapModule = await import("gsap")
      const scrollTriggerModule = await import("gsap/ScrollTrigger")

      const { gsap } = gsapModule
      const { ScrollTrigger } = scrollTriggerModule

      gsap.registerPlugin(ScrollTrigger)

      // Make gsap available globally for components
      window.gsap = gsap
      window.ScrollTrigger = ScrollTrigger

      // Refresh ScrollTrigger on route change
      ScrollTrigger.refresh()
    }

    loadGsap()

    return () => {
      // Clean up ScrollTrigger instances on unmount
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [pathname])

  return <>{children}</>
}

// Add type definitions for global window object
declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
  }
}
