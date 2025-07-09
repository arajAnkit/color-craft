"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Eye, Palette, Zap } from "lucide-react"

export default function ColorHarmoniesPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window

      // Header animation
      gsap.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

      // Cards animation
      gsap.fromTo(
        ".harmony-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        },
      )

      // Fact cards animation
      gsap.fromTo(
        ".fact-card",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.8,
          ease: "back.out(1.7)",
        },
      )
    }
  }, [])

  const harmonies = [
    {
      name: "Complementary",
      description: "Colors opposite each other on the color wheel",
      colors: ["#FF6B6B", "#4ECDC4"],
      example: "Red & Cyan",
      usage: "High contrast, attention-grabbing designs",
    },
    {
      name: "Analogous",
      description: "Colors adjacent to each other on the color wheel",
      colors: ["#FF6B6B", "#FF8E53", "#FF6B9D"],
      example: "Red, Orange, Pink",
      usage: "Harmonious, natural-looking designs",
    },
    {
      name: "Triadic",
      description: "Three colors evenly spaced on the color wheel",
      colors: ["#FF6B6B", "#6BCF7F", "#6B8AFF"],
      example: "Red, Green, Blue",
      usage: "Vibrant yet balanced color schemes",
    },
    {
      name: "Split-Complementary",
      description: "Base color plus two colors adjacent to its complement",
      colors: ["#FF6B6B", "#4ECDC4", "#4E9CCD"],
      example: "Red, Cyan, Blue",
      usage: "High contrast with less tension than complementary",
    },
    {
      name: "Tetradic",
      description: "Four colors arranged in two complementary pairs",
      colors: ["#FF6B6B", "#FFD93D", "#4ECDC4", "#6B5B95"],
      example: "Red, Yellow, Cyan, Purple",
      usage: "Rich color palettes with multiple options",
    },
    {
      name: "Monochromatic",
      description: "Different shades, tints, and tones of a single color",
      colors: ["#FF6B6B", "#FF9999", "#FFCCCC"],
      example: "Light Red, Red, Dark Red",
      usage: "Elegant, cohesive designs with subtle variation",
    },
  ]

  const surprisingFacts = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "The Tetrachromacy Secret",
      fact: "Some people (mostly women) have a 4th color receptor, allowing them to see 100 million colors instead of the typical 10 million. This affects how they perceive color harmonies.",
      category: "Biology",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "The 60-30-10 Rule Origins",
      fact: "This design rule actually comes from interior design in the 1960s, not digital design. It was created to prevent visual fatigue in living spaces.",
      category: "History",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Cultural Color Blindness",
      fact: "The Himba tribe in Namibia can distinguish between subtle green shades that most people can't see, but struggle with blue-green distinctions that seem obvious to others.",
      category: "Culture",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "The Impossible Colors",
      fact: "Stygian blue and self-luminous red are 'impossible colors' that can only be seen under special laboratory conditions, challenging our understanding of color perception.",
      category: "Science",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "The Dress Phenomenon",
      fact: "The viral 'blue/black vs white/gold dress' revealed that color perception is heavily influenced by assumptions about lighting - a principle crucial for digital color harmony.",
      category: "Psychology",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Mantis Shrimp Vision",
      fact: "Mantis shrimp have 16 types of color receptors (humans have 3), but surprisingly, they're worse at distinguishing colors than humans due to poor neural processing.",
      category: "Biology",
    },
  ]

  return (
    <div ref={pageRef} className="container mx-auto px-6 py-12">
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
          Color Harmonies Guide
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the science and art behind color combinations, plus surprising facts about color perception.
        </p>
      </div>

      {/* Color Harmonies Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Color Harmony Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {harmonies.map((harmony, index) => (
            <Card key={harmony.name} className="harmony-card">
              <CardHeader>
                <CardTitle className="text-xl">{harmony.name}</CardTitle>
                <CardDescription>{harmony.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 justify-center">
                  {harmony.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-12 h-12 rounded-full shadow-md"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{harmony.example}</p>
                  <p className="text-xs text-muted-foreground mt-2">{harmony.usage}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Surprising Facts Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Surprising Color Facts</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          These lesser-known facts about color perception and harmony will change how you think about color design.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {surprisingFacts.map((fact, index) => (
            <Card key={index} className="fact-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                    {fact.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{fact.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {fact.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{fact.fact}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Practical Applications */}
      <Card className="harmony-card">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Applying Color Harmonies in Design</CardTitle>
          <CardDescription className="text-center">
            Practical tips for using color harmonies effectively
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Do's</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Use the 60-30-10 rule: 60% dominant, 30% secondary, 10% accent color</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Test color combinations in different lighting conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Consider cultural associations and accessibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Use analogous colors for backgrounds and complementary for accents</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Don'ts</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Don't use too many colors - stick to 3-5 maximum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Avoid pure complementary colors for large areas (causes eye strain)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Don't ignore contrast ratios for text readability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Avoid relying solely on color to convey important information</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mt-6">
            <h4 className="font-semibold mb-3">Pro Tip: The Psychology of Color Harmony</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Color harmony isn't just about aesthetics - it's about creating emotional responses. Warm harmonies (reds,
              oranges, yellows) create energy and excitement, while cool harmonies (blues, greens, purples) promote calm
              and trust. Understanding this psychology helps you choose the right harmony for your design goals.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
