"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Copy, Shuffle, Save } from "lucide-react"

type MixingMode = "rgb" | "cmyk" | "hsl" | "lab"

export default function ColorMixerPage() {
  const [color1, setColor1] = useState("#ff6b6b")
  const [color2, setColor2] = useState("#4ecdc4")
  const [mixRatio, setMixRatio] = useState(50)
  const [mixingMode, setMixingMode] = useState<MixingMode>("rgb")
  const [mixedColor, setMixedColor] = useState("")
  const [savedColors, setSavedColors] = useState<string[]>([])
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
        ".mixer-card",
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

  // Helper functions to convert between color formats
  const hexToRgb = (hex: string): [number, number, number] => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g).toString(16).padStart(2, "0")}${Math.round(b)
      .toString(16)
      .padStart(2, "0")}`
  }

  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return [h * 360, s * 100, l * 100]
  }

  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    h /= 360
    s /= 100
    l /= 100
    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    return [r * 255, g * 255, b * 255]
  }

  const rgbToCmyk = (r: number, g: number, b: number): [number, number, number, number] => {
    r /= 255
    g /= 255
    b /= 255

    const k = 1 - Math.max(r, g, b)
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k)
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k)
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k)

    return [c * 100, m * 100, y * 100, k * 100]
  }

  const cmykToRgb = (c: number, m: number, y: number, k: number): [number, number, number] => {
    c /= 100
    m /= 100
    y /= 100
    k /= 100

    const r = 255 * (1 - c) * (1 - k)
    const g = 255 * (1 - m) * (1 - k)
    const b = 255 * (1 - y) * (1 - k)

    return [r, g, b]
  }

  // Simple approximation of Lab color space for mixing
  const rgbToLab = (r: number, g: number, b: number): [number, number, number] => {
    // This is a simplified conversion
    const [h, s, l] = rgbToHsl(r, g, b)
    return [l, (s - 50) * 2, (h / 360) * 200 - 100]
  }

  const labToRgb = (l: number, a: number, b: number): [number, number, number] => {
    // This is a simplified conversion
    const h = ((b + 100) / 200) * 360
    const s = a / 2 + 50
    return hslToRgb(h, s, l)
  }

  // Mix colors based on the selected mode
  const mixColors = () => {
    const ratio = mixRatio / 100
    const [r1, g1, b1] = hexToRgb(color1)
    const [r2, g2, b2] = hexToRgb(color2)

    let result: [number, number, number]

    switch (mixingMode) {
      case "rgb":
        // Linear RGB mixing
        result = [r1 * (1 - ratio) + r2 * ratio, g1 * (1 - ratio) + g2 * ratio, b1 * (1 - ratio) + b2 * ratio]
        break

      case "cmyk":
        // CMYK mixing
        const [c1, m1, y1, k1] = rgbToCmyk(r1, g1, b1)
        const [c2, m2, y2, k2] = rgbToCmyk(r2, g2, b2)
        const cmyk = [
          c1 * (1 - ratio) + c2 * ratio,
          m1 * (1 - ratio) + m2 * ratio,
          y1 * (1 - ratio) + y2 * ratio,
          k1 * (1 - ratio) + k2 * ratio,
        ]
        result = cmykToRgb(cmyk[0], cmyk[1], cmyk[2], cmyk[3])
        break

      case "hsl":
        // HSL mixing
        const [h1, s1, l1] = rgbToHsl(r1, g1, b1)
        const [h2, s2, l2] = rgbToHsl(r2, g2, b2)

        // Special handling for hue to avoid the shortest path
        let h
        const diff = h2 - h1
        if (Math.abs(diff) <= 180) {
          h = h1 + diff * ratio
        } else {
          // Go the other way around the color wheel
          if (diff > 0) {
            h = h1 + (diff - 360) * ratio
          } else {
            h = h1 + (diff + 360) * ratio
          }
        }
        if (h < 0) h += 360
        if (h >= 360) h -= 360

        result = hslToRgb(h, s1 * (1 - ratio) + s2 * ratio, l1 * (1 - ratio) + l2 * ratio)
        break

      case "lab":
        // Lab mixing (perceptually more accurate)
        const [L1, a1, b_1] = rgbToLab(r1, g1, b1)
        const [L2, a2, b_2] = rgbToLab(r2, g2, b2)
        result = labToRgb(L1 * (1 - ratio) + L2 * ratio, a1 * (1 - ratio) + a2 * ratio, b_1 * (1 - ratio) + b_2 * ratio)
        break

      default:
        result = [r1, g1, b1]
    }

    setMixedColor(rgbToHex(...result))
  }

  // Generate random colors
  const generateRandomColors = () => {
    const randomColor = () => {
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`
    }

    setColor1(randomColor())
    setColor2(randomColor())
  }

  // Save the mixed color
  const saveColor = () => {
    if (mixedColor && !savedColors.includes(mixedColor)) {
      setSavedColors([...savedColors, mixedColor])
      toast({
        title: "Color Saved",
        description: `${mixedColor} has been added to your saved colors.`,
      })
    }
  }

  // Copy color to clipboard
  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    toast({
      title: "Copied!",
      description: `${color} has been copied to clipboard.`,
    })
  }

  // Calculate the mixed color whenever inputs change
  useEffect(() => {
    mixColors()
  }, [color1, color2, mixRatio, mixingMode])

  return (
    <div ref={pageRef} className="container mx-auto px-6 py-12">
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
          Color Mixer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Mix colors using different algorithms to see how they blend together.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Color Mixer Controls */}
        <div className="space-y-6">
          <Card className="mixer-card">
            <CardHeader>
              <CardTitle>Color Inputs</CardTitle>
              <CardDescription>Select two colors to mix together</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Color 1</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded-md border cursor-pointer"
                      style={{ backgroundColor: color1 }}
                      onClick={() => {
                        const input = document.getElementById("color1-input") as HTMLInputElement
                        if (input) input.click()
                      }}
                    />
                    <Input
                      id="color1-input"
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="w-0 h-0 opacity-0 absolute"
                    />
                    <Input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="flex-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Color 2</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded-md border cursor-pointer"
                      style={{ backgroundColor: color2 }}
                      onClick={() => {
                        const input = document.getElementById("color2-input") as HTMLInputElement
                        if (input) input.click()
                      }}
                    />
                    <Input
                      id="color2-input"
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="w-0 h-0 opacity-0 absolute"
                    />
                    <Input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="flex-1" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Mix Ratio: {mixRatio}%</Label>
                  <Button variant="ghost" size="sm" onClick={() => setMixRatio(50)}>
                    Reset
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: color1 }} />
                  <Slider
                    value={[mixRatio]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setMixRatio(value[0])}
                    className="flex-1"
                  />
                  <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: color2 }} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mixing Mode</Label>
                <Select value={mixingMode} onValueChange={(value) => setMixingMode(value as MixingMode)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mixing mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rgb">RGB (Linear)</SelectItem>
                    <SelectItem value="cmyk">CMYK (Print)</SelectItem>
                    <SelectItem value="hsl">HSL (Perceptual)</SelectItem>
                    <SelectItem value="lab">Lab (Advanced)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={generateRandomColors} variant="outline" className="flex-1">
                  <Shuffle className="mr-2 h-4 w-4" />
                  Random Colors
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mixer-card">
            <CardHeader>
              <CardTitle>Mixing Modes Explained</CardTitle>
              <CardDescription>How different color models affect mixing results</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="rgb">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="rgb">RGB</TabsTrigger>
                  <TabsTrigger value="cmyk">CMYK</TabsTrigger>
                  <TabsTrigger value="hsl">HSL</TabsTrigger>
                  <TabsTrigger value="lab">Lab</TabsTrigger>
                </TabsList>
                <TabsContent value="rgb" className="space-y-2">
                  <h4 className="font-medium">RGB (Additive)</h4>
                  <p className="text-sm text-muted-foreground">
                    Linear mixing of Red, Green, and Blue channels. This is how light mixes, but can produce muddy
                    results when mixing complementary colors.
                  </p>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <div className="text-xs">Example: Red + Blue = Purple</div>
                    <div className="flex mt-2">
                      <div className="w-8 h-8 bg-red-500" />
                      <div className="w-8 h-8 bg-purple-500" />
                      <div className="w-8 h-8 bg-blue-500" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="cmyk" className="space-y-2">
                  <h4 className="font-medium">CMYK (Subtractive)</h4>
                  <p className="text-sm text-muted-foreground">
                    Mixes colors as if they were inks on paper. Better for predicting how physical paints might mix.
                  </p>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <div className="text-xs">Example: Cyan + Yellow = Green</div>
                    <div className="flex mt-2">
                      <div className="w-8 h-8 bg-cyan-500" />
                      <div className="w-8 h-8 bg-green-500" />
                      <div className="w-8 h-8 bg-yellow-500" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="hsl" className="space-y-2">
                  <h4 className="font-medium">HSL (Perceptual)</h4>
                  <p className="text-sm text-muted-foreground">
                    Mixes Hue, Saturation, and Lightness separately. Creates more vibrant transitions between colors.
                  </p>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <div className="text-xs">Example: Red + Blue = Magenta (via color wheel)</div>
                    <div className="flex mt-2">
                      <div className="w-8 h-8 bg-red-500" />
                      <div className="w-8 h-8 bg-fuchsia-500" />
                      <div className="w-8 h-8 bg-blue-500" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="lab" className="space-y-2">
                  <h4 className="font-medium">Lab (Perceptually Uniform)</h4>
                  <p className="text-sm text-muted-foreground">
                    Most advanced mixing that accounts for human perception. Creates the most natural and pleasing
                    transitions.
                  </p>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <div className="text-xs">Example: Yellow + Blue = Neutral Gray (not green)</div>
                    <div className="flex mt-2">
                      <div className="w-8 h-8 bg-yellow-500" />
                      <div className="w-8 h-8 bg-gray-500" />
                      <div className="w-8 h-8 bg-blue-500" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Results and Saved Colors */}
        <div className="space-y-6">
          <Card className="mixer-card">
            <CardHeader>
              <CardTitle>Mixed Color Result</CardTitle>
              <CardDescription>The result of mixing your selected colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-6">
                <div className="w-16 h-16 rounded-full border shadow-md" style={{ backgroundColor: color1 }} />
                <div className="text-2xl">+</div>
                <div className="w-16 h-16 rounded-full border shadow-md" style={{ backgroundColor: color2 }} />
                <div className="text-2xl">=</div>
                <div className="w-16 h-16 rounded-full border shadow-md" style={{ backgroundColor: mixedColor }} />
              </div>

              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm">Mixed Color:</Label>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => copyColor(mixedColor)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={saveColor}>
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: mixedColor }} />
                  <code className="text-sm block">{mixedColor}</code>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Color Gradient:</Label>
                <div
                  className="h-8 rounded-md"
                  style={{
                    background: `linear-gradient(to right, ${color1}, ${mixedColor}, ${color2})`,
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Sample UI Elements:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button style={{ backgroundColor: mixedColor }}>Button</Button>
                  <div className="rounded-md p-3 text-white text-center" style={{ backgroundColor: mixedColor }}>
                    Card
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mixer-card">
            <CardHeader>
              <CardTitle>Saved Colors</CardTitle>
              <CardDescription>Your collection of mixed colors</CardDescription>
            </CardHeader>
            <CardContent>
              {savedColors.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">
                  No colors saved yet. Click the save icon to add colors to your collection.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {savedColors.map((color, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-2 flex flex-col items-center"
                      onClick={() => copyColor(color)}
                    >
                      <div className="w-full h-8 rounded-md mb-2" style={{ backgroundColor: color }} />
                      <span className="text-xs truncate w-full text-center">{color}</span>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
