"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Copy, Check, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TintShadeGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#7C3AED")
  const [colorInput, setColorInput] = useState("#7C3AED")
  const [variationCount, setVariationCount] = useState(10)
  const [copied, setCopied] = useState<string | null>(null)
  const { toast } = useToast()

  // Generate tints (lighter versions - mix with white)
  const generateTints = (color: string, count: number) => {
    const tints = []
    const r = Number.parseInt(color.slice(1, 3), 16)
    const g = Number.parseInt(color.slice(3, 5), 16)
    const b = Number.parseInt(color.slice(5, 7), 16)

    for (let i = 1; i <= count; i++) {
      const percent = i / (count + 1)
      const rTint = Math.round(r + (255 - r) * percent)
      const gTint = Math.round(g + (255 - g) * percent)
      const bTint = Math.round(b + (255 - b) * percent)

      const hexTint = `#${rTint.toString(16).padStart(2, "0")}${gTint.toString(16).padStart(2, "0")}${bTint.toString(16).padStart(2, "0")}`
      tints.push(hexTint)
    }
    return tints
  }

  // Generate shades (darker versions - mix with black)
  const generateShades = (color: string, count: number) => {
    const shades = []
    const r = Number.parseInt(color.slice(1, 3), 16)
    const g = Number.parseInt(color.slice(3, 5), 16)
    const b = Number.parseInt(color.slice(5, 7), 16)

    for (let i = 1; i <= count; i++) {
      const percent = i / (count + 1)
      const rShade = Math.round(r * (1 - percent))
      const gShade = Math.round(g * (1 - percent))
      const bShade = Math.round(b * (1 - percent))

      const hexShade = `#${rShade.toString(16).padStart(2, "0")}${gShade.toString(16).padStart(2, "0")}${bShade.toString(16).padStart(2, "0")}`
      shades.push(hexShade)
    }
    return shades
  }

  // Generate tones (mix with gray)
  const generateTones = (color: string, count: number) => {
    const tones = []
    const r = Number.parseInt(color.slice(1, 3), 16)
    const g = Number.parseInt(color.slice(3, 5), 16)
    const b = Number.parseInt(color.slice(5, 7), 16)

    // Gray value (128 is middle gray)
    const gray = 128

    for (let i = 1; i <= count; i++) {
      const percent = i / (count + 1)
      const rTone = Math.round(r + (gray - r) * percent)
      const gTone = Math.round(g + (gray - g) * percent)
      const bTone = Math.round(b + (gray - b) * percent)

      const hexTone = `#${rTone.toString(16).padStart(2, "0")}${gTone.toString(16).padStart(2, "0")}${bTone.toString(16).padStart(2, "0")}`
      tones.push(hexTone)
    }
    return tones
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setColorInput(value)

    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setBaseColor(value)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    toast({
      title: "Copied!",
      description: `${text} has been copied to clipboard.`,
    })

    setTimeout(() => setCopied(null), 2000)
  }

  const tints = generateTints(baseColor, variationCount)
  const shades = generateShades(baseColor, variationCount)
  const tones = generateTones(baseColor, variationCount)

  const ColorVariationGrid = ({ colors, type }: { colors: string[]; type: string }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {colors.map((color, index) => (
        <button
          key={index}
          onClick={() => copyToClipboard(color)}
          className="group relative flex flex-col items-center"
        >
          <div
            className="w-full aspect-square rounded-md shadow-md transition-transform transform group-hover:scale-105 relative overflow-hidden"
            style={{ backgroundColor: color }}
          >
            {copied === color && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <Check className="text-white h-5 w-5" />
              </div>
            )}
          </div>
          <span className="mt-1 text-xs font-mono text-muted-foreground group-hover:text-foreground">{color}</span>
        </button>
      ))}
    </div>
  )

  return (
    <div className="container max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Tint, Shade & Tone Generator</h1>
        <p className="text-lg text-muted-foreground">
          Create lighter tints, darker shades, and muted tones from any base color.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Base Color
            </CardTitle>
            <CardDescription>Choose your starting color</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="h-24 rounded-md shadow-md" style={{ backgroundColor: baseColor }}></div>

              <div className="space-y-2">
                <Label htmlFor="color-input">Hex Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color-input"
                    type="text"
                    value={colorInput}
                    onChange={handleColorChange}
                    className="font-mono"
                  />
                  <Input
                    type="color"
                    value={baseColor}
                    onChange={(e) => {
                      setBaseColor(e.target.value)
                      setColorInput(e.target.value)
                    }}
                    className="w-12 p-1 h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Number of Variations: {variationCount}</Label>
                <Slider
                  value={[variationCount]}
                  min={5}
                  max={15}
                  step={1}
                  onValueChange={(value) => setVariationCount(value[0])}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Generated Color Variations</CardTitle>
            <CardDescription>Click any color to copy its hex code</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tints">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tints">Tints</TabsTrigger>
                <TabsTrigger value="shades">Shades</TabsTrigger>
                <TabsTrigger value="tones">Tones</TabsTrigger>
              </TabsList>

              <TabsContent value="tints" className="space-y-4 pt-4">
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Tints (Mixed with White)</h3>
                  <p className="text-sm text-muted-foreground">Lighter, more pastel versions of your base color</p>
                </div>
                <ColorVariationGrid colors={tints} type="tint" />
              </TabsContent>

              <TabsContent value="shades" className="space-y-4 pt-4">
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Shades (Mixed with Black)</h3>
                  <p className="text-sm text-muted-foreground">Darker, more intense versions of your base color</p>
                </div>
                <ColorVariationGrid colors={shades} type="shade" />
              </TabsContent>

              <TabsContent value="tones" className="space-y-4 pt-4">
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Tones (Mixed with Gray)</h3>
                  <p className="text-sm text-muted-foreground">Muted, sophisticated versions of your base color</p>
                </div>
                <ColorVariationGrid colors={tones} type="tone" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Complete Color Palette</CardTitle>
          <CardDescription>View your full color range from darkest to lightest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center">
            {[...shades.reverse(), baseColor, ...tints].map((color, index) => (
              <button
                key={index}
                onClick={() => copyToClipboard(color)}
                className="group relative"
                title={`Click to copy: ${color}`}
              >
                <div
                  className="h-16 w-12 transition-transform transform group-hover:scale-y-110"
                  style={{ backgroundColor: color }}
                >
                  {copied === color && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                      <Check className="text-white h-4 w-4" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => {
                const colorCodes = [...shades.reverse(), baseColor, ...tints].join(", ")
                copyToClipboard(colorCodes)
              }}
              className="gap-2 mt-2"
            >
              <Copy className="h-4 w-4" />
              <span>Copy All Hex Codes</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Tints, Shades & Tones</CardTitle>
          <CardDescription>Learn how to use color variations effectively in your designs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-200 rounded"></div>
                <h3 className="font-semibold">Tints (+ White)</h3>
              </div>
              <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                <li>Create lighter, softer versions</li>
                <li>Perfect for backgrounds and subtle elements</li>
                <li>Add airiness and openness to designs</li>
                <li>Great for hover states and secondary UI</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-900 rounded"></div>
                <h3 className="font-semibold">Shades (+ Black)</h3>
              </div>
              <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                <li>Create darker, more intense versions</li>
                <li>Ideal for text, icons, and emphasis</li>
                <li>Add depth and visual weight</li>
                <li>Perfect for borders and dividers</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-gray-500 rounded"></div>
                <h3 className="font-semibold">Tones (+ Gray)</h3>
              </div>
              <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                <li>Create muted, sophisticated versions</li>
                <li>Excellent for subtle backgrounds</li>
                <li>Add elegance and refinement</li>
                <li>Perfect for professional interfaces</li>
              </ul>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-6 space-y-4">
            <h3 className="font-semibold mb-3">Design System Best Practices</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Color Hierarchy</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>
                    <strong>Primary:</strong> Use your base color for main actions
                  </li>
                  <li>
                    <strong>Secondary:</strong> Use tints for supporting elements
                  </li>
                  <li>
                    <strong>Tertiary:</strong> Use tones for subtle backgrounds
                  </li>
                  <li>
                    <strong>Text:</strong> Use shades for readable content
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Accessibility Tips</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Ensure 4.5:1 contrast ratio for text</li>
                  <li>Use shades for text on light backgrounds</li>
                  <li>Use tints for text on dark backgrounds</li>
                  <li>Test color combinations with accessibility tools</li>
                </ul>
              </div>
            </div>

            <div className="bg-background rounded-lg p-4 border">
              <h4 className="font-medium mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">
                Create a balanced design system with 3-5 tints, 3-5 shades, and 2-3 tones of your primary colors. This
                gives you enough variation for different UI states while maintaining visual harmony. Tones are
                particularly useful for creating sophisticated, professional interfaces that aren't too vibrant.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
