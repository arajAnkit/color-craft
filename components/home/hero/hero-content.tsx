"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Palette, Droplets, Sparkles, ArrowRight } from "lucide-react"

export function HeroContent() {
  return (
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="hero-title text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
          Master the Art of{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
            Color & Gradients
          </span>
        </h1>

        <p className="hero-subtitle text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Explore, create, and learn everything about colors and gradients with our interactive tools and comprehensive
          guides.
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/colors">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 group">
              <Palette className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span>Explore Colors</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/gradient-generator">
            <Button size="lg" variant="outline" className="gap-2 group">
              <Droplets className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span>Try Gradient Generator</span>
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="hero-decoration inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>500+ colors and gradient combinations</span>
          </div>
        </div>
      </div>
    </div>
  )
}
