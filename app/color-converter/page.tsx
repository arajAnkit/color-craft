"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, RefreshCw, Palette, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ColorConverterPage() {
  const [hexInput, setHexInput] = useState("#FF5733")
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)
  const { toast } = useToast()
  const pageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const converterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window

      // Header animation
      gsap.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

      // Converter animation
      gsap.fromTo(
        converterRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" },
      )

      // Color format cards animation
      gsap.fromTo(
        ".format-card",
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

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return null

    const r = Number.parseInt(result[1], 16)
    const g = Number.parseInt(result[2], 16)
    const b = Number.parseInt(result[3], 16)

    return { r, g, b }
  }

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  // Convert RGB to HSB
  const rgbToHsb = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    let h = 0
    const s = max === 0 ? 0 : delta / max
    const brightness = max

    if (delta !== 0) {
      switch (max) {
        case r:
          h = ((g - b) / delta) % 6
          break
        case g:
          h = (b - r) / delta + 2
          break
        case b:
          h = (r - g) / delta + 4
          break
      }
      h *= 60
      if (h < 0) h += 360
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      b: Math.round(brightness * 100),
    }
  }

  // Convert RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

    const k = 1 - Math.max(r, g, b)
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k)
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k)
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k)

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    }
  }

  // Convert RGB to LAB (simplified approximation)
  const rgbToLab = (r: number, g: number, b: number) => {
    // Convert RGB to XYZ first (simplified)
    r = r / 255
    g = g / 255
    b = b / 255

    // Apply gamma correction
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

    // Convert to XYZ
    let x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375
    let y = r * 0.2126729 + g * 0.7151522 + b * 0.072175
    let z = r * 0.0193339 + g * 0.119192 + b * 0.9503041

    // Normalize for D65 illuminant
    x = x / 0.95047
    y = y / 1.0
    z = z / 1.08883

    // Convert XYZ to LAB
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116

    const L = Math.round(116 * y - 16)
    const A = Math.round(500 * (x - y))
    const B = Math.round(200 * (y - z))

    return { l: L, a: A, b: B }
  }

  // Convert RGB to OKLCH (simplified approximation)
  const rgbToOklch = (r: number, g: number, b: number) => {
    const { h, s, l } = rgbToHsl(r, g, b)

    // Approximate OKLCH values
    const lightness = Math.round((l / 100) * 100) / 100
    const chroma = Math.round((s / 100) * 0.4 * 1000) / 1000
    const hue = h

    return {
      l: lightness,
      c: chroma,
      h: hue,
    }
  }

  const isValidHex = (hex: string) => {
    return /^#[0-9A-F]{6}$/i.test(hex)
  }

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()}`
    setHexInput(randomColor)
  }

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text)
    setCopiedFormat(format)

    toast({
      title: "Copied!",
      description: `${format} code copied to clipboard.`,
    })

    setTimeout(() => setCopiedFormat(null), 2000)
  }

  // Generate all color formats
  const rgb = isValidHex(hexInput) ? hexToRgb(hexInput) : null
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null
  const hsb = rgb ? rgbToHsb(rgb.r, rgb.g, rgb.b) : null
  const cmyk = rgb ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : null
  const lab = rgb ? rgbToLab(rgb.r, rgb.g, rgb.b) : null
  const oklch = rgb ? rgbToOklch(rgb.r, rgb.g, rgb.b) : null

  const colorFormats = [
    {
      name: "HEX",
      value: hexInput.toUpperCase(),
      description: "Hexadecimal color notation",
      usage: "Most common for web development",
    },
    {
      name: "RGB",
      value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid hex",
      description: "Red, Green, Blue values (0-255)",
      usage: "Digital displays, additive color mixing",
    },
    {
      name: "RGBA",
      value: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : "Invalid hex",
      description: "RGB with alpha transparency (0-1)",
      usage: "Web elements with transparency effects",
    },
    {
      name: "HSL",
      value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "Invalid hex",
      description: "Hue, Saturation, Lightness",
      usage: "Intuitive color adjustments and variations",
    },
    {
      name: "HSLA",
      value: hsl ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)` : "Invalid hex",
      description: "HSL with alpha transparency",
      usage: "Color variations with transparency",
    },
    {
      name: "HSB",
      value: hsb ? `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)` : "Invalid hex",
      description: "Hue, Saturation, Brightness",
      usage: "Digital screen color representation",
    },
    {
      name: "CMYK",
      value: cmyk ? `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` : "Invalid hex",
      description: "Cyan, Magenta, Yellow, Black",
      usage: "Print design and offset printing",
    },
    {
      name: "LAB",
      value: lab ? `lab(${lab.l}, ${lab.a}, ${lab.b})` : "Invalid hex",
      description: "Perceptual color space",
      usage: "Color correction and accurate reproduction",
    },
    {
      name: "OKLCH",
      value: oklch ? `oklch(${oklch.l} ${oklch.c} ${oklch.h}deg)` : "Invalid hex",
      description: "Modern perceptual color model",
      usage: "Uniform color palettes and gradients",
    },
  ]

  const formatGuides = [
    {
      name: "HEX (Hexadecimal)",
      format: "#RRGGBB (e.g., #FF5733)",
      explanation:
        "HEX codes represent colors using a mix of red, green, and blue values in hexadecimal format (base 16). Each component (R, G, B) ranges from 00 to FF, where 00 means no intensity, and FF means full intensity.",
      pros: ["Compact and widely supported", "Easy to copy and share", "Standard for web development"],
      cons: ["Not intuitive for color adjustments", "Hard to predict color from code"],
      bestFor: "Web development, CSS styling, design handoffs",
    },
    {
      name: "RGB (Red, Green, Blue)",
      format: "rgb(R, G, B) (e.g., rgb(255, 87, 51))",
      explanation:
        "Uses three numerical values ranging from 0 to 255, defining the intensity of red, green, and blue. Used in digital displays where colors are mixed additively.",
      pros: ["Intuitive color mixing", "Direct hardware representation", "Easy to understand"],
      cons: ["Large value ranges", "Not great for color harmony"],
      bestFor: "Digital displays, programming, image processing",
    },
    {
      name: "RGBA (RGB with Alpha)",
      format: "rgba(R, G, B, A) (e.g., rgba(255, 87, 51, 0.5))",
      explanation:
        "Works like RGB but includes an alpha channel (A), a value between 0 (fully transparent) and 1 (fully opaque), allowing transparency effects.",
      pros: ["Supports transparency", "Widely supported", "Easy to understand"],
      cons: ["Larger syntax", "Alpha can be confusing"],
      bestFor: "UI overlays, hover effects, layered designs",
    },
    {
      name: "HSL (Hue, Saturation, Lightness)",
      format: "hsl(H, S%, L%) (e.g., hsl(20, 100%, 60%))",
      explanation:
        "Uses Hue (0–360 degrees, like on a color wheel), Saturation (0% is gray, 100% is full color), and Lightness (0% is black, 50% is normal, 100% is white). Makes color adjustments more intuitive than RGB.",
      pros: ["Intuitive color adjustments", "Great for variations", "Human-friendly"],
      cons: ["Not perceptually uniform", "Lightness can be misleading"],
      bestFor: "Theme generation, color variations, design systems",
    },
    {
      name: "HSLA (HSL with Alpha)",
      format: "hsla(H, S%, L%, A) (e.g., hsla(20, 100%, 60%, 0.5))",
      explanation: "Works like HSL but includes an alpha channel (A) for transparency.",
      pros: ["Intuitive with transparency", "Great for theme variations", "Easy color manipulation"],
      cons: ["Longer syntax", "Not perceptually uniform"],
      bestFor: "Transparent theme elements, hover states, overlays",
    },
    {
      name: "HSB (Hue, Saturation, Brightness)",
      format: "hsb(H, S%, B%) (e.g., hsb(20, 100%, 60%))",
      explanation:
        "Similar to HSL but uses Brightness (B) instead of Lightness, which better represents digital screen colors.",
      pros: ["Better for digital screens", "Intuitive brightness control", "Good for UI design"],
      cons: ["Less web support", "Similar to HSL confusion"],
      bestFor: "Digital design tools, screen-based applications",
    },
    {
      name: "CMYK (Cyan, Magenta, Yellow, Black)",
      format: "cmyk(C%, M%, Y%, K%) (e.g., cmyk(0, 70, 80, 0))",
      explanation:
        "A subtractive color model used in printing. Colors are mixed by subtracting light from paper (opposite of RGB, which adds light).",
      pros: ["Industry standard for print", "Accurate print reproduction", "Professional printing workflow"],
      cons: ["Not for digital displays", "Limited web support", "Complex conversion"],
      bestFor: "Print design, offset printing, professional publishing",
    },
    {
      name: "LAB (CIELAB Color Space)",
      format: "lab(L, A, B) (e.g., lab(53, 80, 67))",
      explanation:
        "A perceptual color space used for accurate color reproduction. L (Lightness): 0 (black) to 100 (white), A: Red-green axis, B: Blue-yellow axis. Closely matches human vision.",
      pros: ["Perceptually uniform", "Device independent", "Accurate color matching"],
      cons: ["Complex to understand", "Limited software support", "Not web-friendly"],
      bestFor: "Color correction, professional photography, color matching",
    },
    {
      name: "OKLCH (Perceptual Color Model)",
      format: "oklch(L, C, H) (e.g., oklch(0.6, 0.2, 30))",
      explanation:
        "A modern, human-friendly color model with L (Lightness): Perceived brightness, C (Chroma): Color intensity, H (Hue): Color's position on the wheel. Designed for more perceptually uniform colors.",
      pros: ["Perceptually uniform", "Modern and accurate", "Great for gradients", "Future-proof"],
      cons: ["Limited browser support", "New and unfamiliar", "Complex calculations"],
      bestFor: "Modern web design, consistent color palettes, advanced gradients",
    },
  ]

  return (
    <div ref={pageRef} className="container mx-auto px-6 py-12">
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Color Code Converter</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert any hex color code to 9 different color formats including RGB, HSL, CMYK, LAB, and OKLCH.
        </p>
      </div>

      <div ref={converterRef} className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Input Color
            </CardTitle>
            <CardDescription>Enter a hex color code to convert to all supported formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-2">
                <Label htmlFor="hex-input">Hex Color Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="hex-input"
                    type="text"
                    value={hexInput}
                    onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                    className="font-mono"
                    placeholder="#FF5733"
                  />
                  <Input
                    type="color"
                    value={isValidHex(hexInput) ? hexInput : "#FF5733"}
                    onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                    className="w-16 p-1 h-10"
                  />
                </div>
                {!isValidHex(hexInput) && (
                  <p className="text-sm text-destructive">Please enter a valid hex color code (e.g., #FF5733)</p>
                )}
              </div>

              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-24 h-24 rounded-lg shadow-lg border-2 border-border"
                  style={{ backgroundColor: isValidHex(hexInput) ? hexInput : "#FF5733" }}
                />
                <Button variant="outline" onClick={generateRandomColor} className="gap-2 bg-transparent">
                  <RefreshCw className="h-4 w-4" />
                  Random Color
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {colorFormats.map((format, index) => (
            <Card key={format.name} className="format-card group hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{format.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(format.value, format.name)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedFormat === format.name ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CardDescription className="text-xs">{format.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="p-3 rounded-md bg-muted font-mono text-sm cursor-pointer hover:bg-muted/80 transition-colors mb-2"
                  onClick={() => copyToClipboard(format.value, format.name)}
                >
                  {format.value}
                </div>
                <p className="text-xs text-muted-foreground">{format.usage}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Complete Color Format Guide
            </CardTitle>
            <CardDescription>In-depth explanation of all color formats and their use cases</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hex" className="w-full">
              <TabsList className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 mb-6">
                <TabsTrigger value="hex">HEX</TabsTrigger>
                <TabsTrigger value="rgb">RGB</TabsTrigger>
                <TabsTrigger value="rgba">RGBA</TabsTrigger>
                <TabsTrigger value="hsl">HSL</TabsTrigger>
                <TabsTrigger value="hsla">HSLA</TabsTrigger>
                <TabsTrigger value="hsb">HSB</TabsTrigger>
                <TabsTrigger value="cmyk">CMYK</TabsTrigger>
                <TabsTrigger value="lab">LAB</TabsTrigger>
                <TabsTrigger value="oklch">OKLCH</TabsTrigger>
              </TabsList>

              {formatGuides.map((guide, index) => (
                <TabsContent key={index} value={guide.name.toLowerCase().split(" ")[0]} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{guide.name}</h3>
                        <div className="bg-muted rounded-lg p-3 font-mono text-sm">{guide.format}</div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Explanation</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{guide.explanation}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-green-600">Best For</h4>
                        <p className="text-sm text-muted-foreground">{guide.bestFor}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-green-600">Advantages</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {guide.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-muted-foreground">
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-orange-600">Limitations</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {guide.cons.map((con, i) => (
                            <li key={i} className="text-sm text-muted-foreground">
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">Pro Tip</h4>
                        <p className="text-sm text-muted-foreground">
                          {guide.name === "HEX (Hexadecimal)" &&
                            "Use HEX for quick color sharing and CSS. It's the most universally supported format."}
                          {guide.name === "RGB (Red, Green, Blue)" &&
                            "RGB is perfect when you need to manipulate individual color channels programmatically."}
                          {guide.name === "RGBA (RGB with Alpha)" &&
                            "Use RGBA for hover effects and overlays where you need precise transparency control."}
                          {guide.name === "HSL (Hue, Saturation, Lightness)" &&
                            "HSL is ideal for creating color variations - just adjust the lightness or saturation values."}
                          {guide.name === "HSLA (HSL with Alpha)" &&
                            "Combine HSL's intuitive adjustments with alpha for perfect theme variations with transparency."}
                          {guide.name === "HSB (Hue, Saturation, Brightness)" &&
                            "HSB is preferred in design software like Photoshop for more intuitive brightness control."}
                          {guide.name === "CMYK (Cyan, Magenta, Yellow, Black)" &&
                            "Always convert RGB to CMYK before printing to avoid color shifts in final prints."}
                          {guide.name === "LAB (CIELAB Color Space)" &&
                            "Use LAB for color correction work where perceptual accuracy is critical."}
                          {guide.name === "OKLCH (Perceptual Color Model)" &&
                            "OKLCH is the future of web colors - use it for the most perceptually uniform color palettes."}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
