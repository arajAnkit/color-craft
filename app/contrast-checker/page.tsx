"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContrastCheckerPage() {
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [foregroundInput, setForegroundInput] = useState("#000000")
  const [backgroundInput, setBackgroundInput] = useState("#FFFFFF")
  const { toast } = useToast()
  const pageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const checkerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window

      // Header animation
      gsap.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

      // Checker animation
      gsap.fromTo(
        checkerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" },
      )

      // Result cards animation
      gsap.fromTo(
        ".result-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          delay: 0.6,
          ease: "power2.out",
        },
      )
    }
  }, [])

  // Calculate relative luminance
  const getLuminance = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return 0

    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  // Calculate contrast ratio
  const getContrastRatio = (color1: string, color2: string) => {
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)
  }

  const isValidHex = (hex: string) => {
    return /^#[0-9A-F]{6}$/i.test(hex)
  }

  const handleForegroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setForegroundInput(value)
    if (isValidHex(value)) {
      setForegroundColor(value)
    }
  }

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBackgroundInput(value)
    if (isValidHex(value)) {
      setBackgroundColor(value)
    }
  }

  const swapColors = () => {
    const tempFg = foregroundColor
    const tempBg = backgroundColor
    setForegroundColor(tempBg)
    setBackgroundColor(tempFg)
    setForegroundInput(tempBg)
    setBackgroundInput(tempFg)
  }

  const generateRandomColors = () => {
    const randomFg = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
    const randomBg = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
    setForegroundColor(randomFg)
    setBackgroundColor(randomBg)
    setForegroundInput(randomFg)
    setBackgroundInput(randomBg)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    })
  }

  const contrastRatio = getContrastRatio(foregroundColor, backgroundColor)
  const wcagAA = contrastRatio >= 4.5
  const wcagAAA = contrastRatio >= 7
  const wcagAALarge = contrastRatio >= 3
  const wcagAAALarge = contrastRatio >= 4.5

  const getContrastLevel = () => {
    if (wcagAAA) return { level: "AAA", color: "bg-green-500", icon: CheckCircle }
    if (wcagAA) return { level: "AA", color: "bg-blue-500", icon: CheckCircle }
    if (wcagAALarge) return { level: "AA Large", color: "bg-yellow-500", icon: AlertTriangle }
    return { level: "Fail", color: "bg-red-500", icon: XCircle }
  }

  const contrastLevel = getContrastLevel()
  const ContrastIcon = contrastLevel.icon

  return (
    <div ref={pageRef} className="container mx-auto px-6 py-12">
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">
          Contrast Checker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Check color contrast ratios for accessibility compliance with WCAG guidelines.
        </p>
      </div>

      <div ref={checkerRef} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Color Selection</CardTitle>
              <CardDescription>Choose foreground and background colors to test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foreground-color">Foreground (Text)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="foreground-color"
                      type="text"
                      value={foregroundInput}
                      onChange={handleForegroundChange}
                      className="font-mono"
                      placeholder="#000000"
                    />
                    <Input
                      type="color"
                      value={isValidHex(foregroundInput) ? foregroundInput : "#000000"}
                      onChange={(e) => {
                        setForegroundColor(e.target.value)
                        setForegroundInput(e.target.value)
                      }}
                      className="w-16 p-1 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background-color">Background</Label>
                  <div className="flex gap-2">
                    <Input
                      id="background-color"
                      type="text"
                      value={backgroundInput}
                      onChange={handleBackgroundChange}
                      className="font-mono"
                      placeholder="#FFFFFF"
                    />
                    <Input
                      type="color"
                      value={isValidHex(backgroundInput) ? backgroundInput : "#FFFFFF"}
                      onChange={(e) => {
                        setBackgroundColor(e.target.value)
                        setBackgroundInput(e.target.value)
                      }}
                      className="w-16 p-1 h-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={swapColors} variant="outline" className="flex-1 gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Swap Colors
                </Button>
                <Button onClick={generateRandomColors} variant="outline" className="flex-1 gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Random Colors
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your colors look together</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="rounded-lg p-8 min-h-[200px] flex flex-col justify-center items-center space-y-4 border-2 border-border"
                style={{ backgroundColor: backgroundColor, color: foregroundColor }}
              >
                <h2 className="text-2xl font-bold text-center">Sample Heading</h2>
                <p className="text-base text-center">
                  This is sample body text to demonstrate how your color combination looks in practice. The contrast
                  ratio determines readability.
                </p>
                <button
                  className="px-4 py-2 rounded-md border-2 transition-colors hover:opacity-80"
                  style={{ borderColor: foregroundColor, backgroundColor: "transparent" }}
                >
                  Sample Button
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="result-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ContrastIcon className={`h-5 w-5 text-white`} />
                Contrast Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{contrastRatio.toFixed(2)}:1</div>
              <Badge className={`${contrastLevel.color} text-white`}>{contrastLevel.level}</Badge>
            </CardContent>
          </Card>

          <Card className="result-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">WCAG AA</CardTitle>
              <CardDescription className="text-xs">Normal text (4.5:1)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {wcagAA ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className={wcagAA ? "text-green-500" : "text-red-500"}>{wcagAA ? "Pass" : "Fail"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="result-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">WCAG AAA</CardTitle>
              <CardDescription className="text-xs">Normal text (7:1)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {wcagAAA ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className={wcagAAA ? "text-green-500" : "text-red-500"}>{wcagAAA ? "Pass" : "Fail"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="result-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Large Text</CardTitle>
              <CardDescription className="text-xs">18pt+ or 14pt+ bold (3:1)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {wcagAALarge ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className={wcagAALarge ? "text-green-500" : "text-red-500"}>{wcagAALarge ? "Pass" : "Fail"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Color Information</CardTitle>
              <CardDescription>Detailed color values and copy options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Foreground</div>
                    <div className="font-mono text-sm text-muted-foreground">{foregroundColor}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border" style={{ backgroundColor: foregroundColor }} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(foregroundColor, "Foreground color")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Background</div>
                    <div className="font-mono text-sm text-muted-foreground">{backgroundColor}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border" style={{ backgroundColor: backgroundColor }} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(backgroundColor, "Background color")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WCAG Guidelines</CardTitle>
              <CardDescription>Understanding accessibility standards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">WCAG AA (Minimum)</h4>
                  <p className="text-sm text-muted-foreground">
                    4.5:1 contrast ratio for normal text. Suitable for most web content.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-1">WCAG AAA (Enhanced)</h4>
                  <p className="text-sm text-muted-foreground">
                    7:1 contrast ratio for normal text. Higher standard for better accessibility.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-1">Large Text</h4>
                  <p className="text-sm text-muted-foreground">
                    3:1 minimum for text 18pt+ or 14pt+ bold. Lower requirement for larger text.
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 mt-4">
                  <h4 className="font-medium text-sm mb-1">Pro Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Aim for WCAG AA compliance at minimum. AAA is ideal for critical content and better user experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
