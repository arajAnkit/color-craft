"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Play, Pause } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GradientExplorerPage() {
  const [copiedGradient, setCopiedGradient] = useState<string | null>(null)
  const [animationPlaying, setAnimationPlaying] = useState<Record<string, boolean>>({})
  const { toast } = useToast()
  const pageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window

      // Header animation
      gsap.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

      // Cards animation
      gsap.fromTo(
        ".explorer-card",
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
    }
  }, [])

  const gradientTypes = [
    {
      name: "Linear Gradients",
      description: "Gradients that transition along a straight line",
      category: "Basic",
      examples: [
        {
          name: "Horizontal",
          css: "linear-gradient(to right, #667eea, #764ba2)",
          description: "Left to right transition",
        },
        {
          name: "Vertical",
          css: "linear-gradient(to bottom, #f093fb, #f5576c)",
          description: "Top to bottom transition",
        },
        {
          name: "Diagonal",
          css: "linear-gradient(45deg, #4facfe, #00f2fe)",
          description: "45-degree angle transition",
        },
        {
          name: "Custom Angle",
          css: "linear-gradient(135deg, #667eea, #764ba2)",
          description: "Custom angle transition",
        },
      ],
    },
    {
      name: "Radial Gradients",
      description: "Gradients that radiate from a center point",
      category: "Basic",
      examples: [
        {
          name: "Circle",
          css: "radial-gradient(circle, #667eea, #764ba2)",
          description: "Circular radial gradient",
        },
        {
          name: "Ellipse",
          css: "radial-gradient(ellipse, #f093fb, #f5576c)",
          description: "Elliptical radial gradient",
        },
        {
          name: "Positioned",
          css: "radial-gradient(circle at top left, #4facfe, #00f2fe)",
          description: "Positioned radial gradient",
        },
        {
          name: "Sized",
          css: "radial-gradient(circle closest-side, #667eea, #764ba2)",
          description: "Size-controlled radial gradient",
        },
      ],
    },
    {
      name: "Conic Gradients",
      description: "Gradients that rotate around a center point",
      category: "Advanced",
      examples: [
        {
          name: "Basic Conic",
          css: "conic-gradient(#667eea, #764ba2, #667eea)",
          description: "Simple conic gradient",
        },
        {
          name: "Rainbow Wheel",
          css: "conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)",
          description: "Full spectrum color wheel",
        },
        {
          name: "Positioned Conic",
          css: "conic-gradient(from 45deg at 30% 70%, #667eea, #764ba2, #667eea)",
          description: "Positioned and rotated conic",
        },
        {
          name: "Stepped Conic",
          css: "conic-gradient(#667eea 0deg, #667eea 90deg, #764ba2 90deg, #764ba2 180deg, #667eea 180deg, #667eea 270deg, #764ba2 270deg, #764ba2 360deg)",
          description: "Hard stops creating segments",
        },
      ],
    },
    {
      name: "Multi-Stop Gradients",
      description: "Gradients with multiple color stops",
      category: "Intermediate",
      examples: [
        {
          name: "Three Colors",
          css: "linear-gradient(45deg, #667eea, #f093fb, #764ba2)",
          description: "Three color transition",
        },
        {
          name: "Rainbow Linear",
          css: "linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)",
          description: "Full spectrum linear",
        },
        {
          name: "Positioned Stops",
          css: "linear-gradient(90deg, #667eea 0%, #f093fb 30%, #764ba2 100%)",
          description: "Custom positioned color stops",
        },
        {
          name: "Hard Stops",
          css: "linear-gradient(90deg, #667eea 0%, #667eea 50%, #764ba2 50%, #764ba2 100%)",
          description: "Sharp color transitions",
        },
      ],
    },
    {
      name: "Repeating Gradients",
      description: "Gradients that repeat their pattern",
      category: "Advanced",
      examples: [
        {
          name: "Repeating Linear",
          css: "repeating-linear-gradient(45deg, #667eea, #667eea 10px, #764ba2 10px, #764ba2 20px)",
          description: "Repeating linear stripes",
        },
        {
          name: "Repeating Radial",
          css: "repeating-radial-gradient(circle, #667eea, #667eea 10px, #764ba2 10px, #764ba2 20px)",
          description: "Repeating radial rings",
        },
        {
          name: "Repeating Conic",
          css: "repeating-conic-gradient(#667eea 0deg, #667eea 15deg, #764ba2 15deg, #764ba2 30deg)",
          description: "Repeating conic segments",
        },
        {
          name: "Complex Pattern",
          css: "repeating-linear-gradient(0deg, #667eea, #764ba2 2px, #667eea 2px, #667eea 4px)",
          description: "Fine repeating pattern",
        },
      ],
    },
    {
      name: "Animated Gradients",
      description: "Gradients with CSS animations",
      category: "Advanced",
      examples: [
        {
          name: "Rotating Conic",
          css: "conic-gradient(from 0deg, #667eea, #764ba2, #667eea)",
          description: "Rotating conic gradient",
          animated: true,
          animation: "rotate 3s linear infinite",
        },
        {
          name: "Moving Linear",
          css: "linear-gradient(45deg, #667eea, #764ba2, #667eea, #764ba2)",
          description: "Moving linear gradient",
          animated: true,
          animation: "moveGradient 4s ease-in-out infinite",
        },
        {
          name: "Pulsing Radial",
          css: "radial-gradient(circle, #667eea, #764ba2)",
          description: "Pulsing radial gradient",
          animated: true,
          animation: "pulse 2s ease-in-out infinite",
        },
        {
          name: "Color Shift",
          css: "linear-gradient(45deg, #667eea, #764ba2)",
          description: "Color shifting gradient",
          animated: true,
          animation: "colorShift 3s ease-in-out infinite",
        },
      ],
    },
  ]

  const copyToClipboard = (css: string, name: string) => {
    navigator.clipboard.writeText(css)
    setCopiedGradient(name)

    toast({
      title: "Copied!",
      description: `${name} gradient CSS has been copied to clipboard.`,
    })

    setTimeout(() => {
      setCopiedGradient(null)
    }, 2000)
  }

  const toggleAnimation = (gradientName: string) => {
    setAnimationPlaying((prev) => ({
      ...prev,
      [gradientName]: !prev[gradientName],
    }))
  }

  return (
    <div ref={pageRef} className="container mx-auto px-6 py-12">
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
          Gradient Explorer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore different types of CSS gradients with interactive examples and copy-ready code.
        </p>
      </div>

      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes moveGradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes colorShift {
          0%,
          100% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(180deg);
          }
        }
      `}</style>

      <div className="space-y-12">
        {gradientTypes.map((type, typeIndex) => (
          <div key={type.name} className="explorer-card">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">{type.name}</h2>
                <Badge variant="outline">{type.category}</Badge>
              </div>
              <p className="text-muted-foreground">{type.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {type.examples.map((example, exampleIndex) => (
                <Card key={example.name} className="overflow-hidden">
                  <div className="relative">
                    <div
                      className="h-32 cursor-pointer relative"
                      style={{
                        background: example.css,
                        backgroundSize: example.animated ? "200% 200%" : "auto",
                        animation:
                          example.animated && animationPlaying[`${type.name}-${example.name}`]
                            ? example.animation
                            : "none",
                      }}
                      onClick={() => copyToClipboard(example.css, example.name)}
                    >
                      {example.animated && (
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleAnimation(`${type.name}-${example.name}`)
                          }}
                        >
                          {animationPlaying[`${type.name}-${example.name}`] ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white text-center">
                          <Copy className="h-6 w-6 mx-auto mb-2" />
                          <span className="text-sm">
                            {copiedGradient === example.name ? "Copied!" : "Click to copy"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{example.name}</CardTitle>
                    <CardDescription className="text-sm">{example.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <code className="text-xs bg-muted p-2 rounded block overflow-x-auto">{example.css}</code>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <Card className="explorer-card mt-12">
        <CardHeader>
          <CardTitle className="text-2xl">Gradient Tips & Best Practices</CardTitle>
          <CardDescription>Professional tips for working with CSS gradients</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Performance Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Use CSS gradients instead of images for better performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Limit animated gradients to avoid performance issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Use transform animations instead of changing gradient properties</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Design Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">💡</span>
                  <span>Use subtle gradients for backgrounds to avoid overwhelming content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">💡</span>
                  <span>Combine multiple gradients using CSS layers for complex effects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">💡</span>
                  <span>Test gradients on different screen sizes and devices</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
