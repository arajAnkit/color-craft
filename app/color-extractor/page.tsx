"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, Copy, RefreshCw, Palette, Eye, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExtractedColor {
  hex: string
  rgb: [number, number, number]
  hsl: [number, number, number]
  percentage: number
}

interface ExtractionSettings {
  colorCount: number
  sortBy: "dominance" | "hue" | "brightness"
  algorithm: "kmeans" | "median-cut"
}

export default function ColorExtractorPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([])
  const [isExtracting, setIsExtracting] = useState(false)
  const [settings, setSettings] = useState<ExtractionSettings>({
    colorCount: 8,
    sortBy: "dominance",
    algorithm: "kmeans",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
        setExtractedColors([])
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.round(x).toString(16)
          return hex.length === 1 ? "0" + hex : hex
        })
        .join("")
    )
  }

  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
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

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
  }

  const getColorDistance = (color1: [number, number, number], color2: [number, number, number]): number => {
    const [r1, g1, b1] = color1
    const [r2, g2, b2] = color2
    return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2))
  }

  const kMeansCluster = (pixels: [number, number, number][], k: number): ExtractedColor[] => {
    // Initialize centroids randomly
    let centroids: [number, number, number][] = []
    for (let i = 0; i < k; i++) {
      const randomPixel = pixels[Math.floor(Math.random() * pixels.length)]
      centroids.push([...randomPixel])
    }

    let iterations = 0
    const maxIterations = 50
    let clusters: [number, number, number][][] = Array(k)
      .fill(null)
      .map(() => [])

    while (iterations < maxIterations) {
      // Assign pixels to nearest centroid
      clusters = Array(k)
        .fill(null)
        .map(() => [])

      pixels.forEach((pixel) => {
        let minDistance = Number.POSITIVE_INFINITY
        let closestCentroid = 0

        centroids.forEach((centroid, index) => {
          const distance = getColorDistance(pixel, centroid)
          if (distance < minDistance) {
            minDistance = distance
            closestCentroid = index
          }
        })

        clusters[closestCentroid].push(pixel)
      })

      // Update centroids
      const newCentroids: [number, number, number][] = []
      let hasChanged = false

      clusters.forEach((cluster, index) => {
        if (cluster.length === 0) {
          newCentroids.push(centroids[index])
          return
        }

        const avgR = cluster.reduce((sum, pixel) => sum + pixel[0], 0) / cluster.length
        const avgG = cluster.reduce((sum, pixel) => sum + pixel[1], 0) / cluster.length
        const avgB = cluster.reduce((sum, pixel) => sum + pixel[2], 0) / cluster.length

        const newCentroid: [number, number, number] = [avgR, avgG, avgB]

        if (getColorDistance(centroids[index], newCentroid) > 1) {
          hasChanged = true
        }

        newCentroids.push(newCentroid)
      })

      centroids = newCentroids

      if (!hasChanged) break
      iterations++
    }

    // Calculate percentages and create result
    const totalPixels = pixels.length
    const results: ExtractedColor[] = []

    centroids.forEach((centroid, index) => {
      const clusterSize = clusters[index]?.length || 0
      const percentage = (clusterSize / totalPixels) * 100

      if (percentage > 0.5) {
        // Only include colors that make up at least 0.5%
        const [r, g, b] = centroid
        results.push({
          hex: rgbToHex(r, g, b),
          rgb: [Math.round(r), Math.round(g), Math.round(b)],
          hsl: rgbToHsl(r, g, b),
          percentage: Math.round(percentage * 100) / 100,
        })
      }
    })

    return results
  }

  const extractColors = useCallback(async () => {
    if (!selectedImage || !canvasRef.current) return

    setIsExtracting(true)
    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = imagePreview
      })

      // Resize canvas for faster processing
      const maxSize = 300
      const scale = Math.min(maxSize / img.width, maxSize / img.height)
      canvas.width = img.width * scale
      canvas.height = img.height * scale

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Extract pixel data
      const pixels: [number, number, number][] = []
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i]
        const g = imageData.data[i + 1]
        const b = imageData.data[i + 2]
        const alpha = imageData.data[i + 3]

        // Skip transparent pixels
        if (alpha > 128) {
          pixels.push([r, g, b])
        }
      }

      // Sample pixels for performance (use every nth pixel for large images)
      const sampleRate = Math.max(1, Math.floor(pixels.length / 10000))
      const sampledPixels = pixels.filter((_, index) => index % sampleRate === 0)

      // Extract colors using K-means clustering
      const colors = kMeansCluster(sampledPixels, settings.colorCount)

      // Sort colors based on user preference
      switch (settings.sortBy) {
        case "dominance":
          colors.sort((a, b) => b.percentage - a.percentage)
          break
        case "hue":
          colors.sort((a, b) => a.hsl[0] - b.hsl[0])
          break
        case "brightness":
          colors.sort((a, b) => b.hsl[2] - a.hsl[2])
          break
      }

      setExtractedColors(colors)
      toast({
        title: "Colors Extracted!",
        description: `Found ${colors.length} dominant colors in the image.`,
      })
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "There was an error analyzing the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExtracting(false)
    }
  }, [selectedImage, imagePreview, settings, toast])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Color code copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const exportColors = (format: "json" | "css") => {
    if (extractedColors.length === 0) return

    let content = ""
    const filename = `extracted-colors.${format}`

    if (format === "json") {
      content = JSON.stringify(extractedColors, null, 2)
    } else if (format === "css") {
      content = ":root {\n"
      extractedColors.forEach((color, index) => {
        content += `  --color-${index + 1}: ${color.hex};\n`
      })
      content += "}\n\n/* Color palette */\n"
      extractedColors.forEach((color, index) => {
        content += `.color-${index + 1} {\n  background-color: ${color.hex};\n}\n\n`
      })
    }

    const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 dark:from-slate-950 dark:via-pink-950 dark:to-rose-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white">
              <Palette className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
              Color Extractor
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extract dominant colors from any image using advanced K-means clustering algorithm. Perfect for creating
            color palettes from photos, artwork, or design inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload and Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Image
                </CardTitle>
                <CardDescription>Choose an image to extract colors from</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-full h-32 object-cover rounded-lg mx-auto"
                      />
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <Button onClick={() => fileInputRef.current?.click()}>Choose Image</Button>
                        <p className="text-sm text-muted-foreground mt-2">PNG, JPG, WebP up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>

            {/* Extraction Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Extraction Settings
                </CardTitle>
                <CardDescription>Customize the color extraction process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Number of Colors: {settings.colorCount}</Label>
                  <Slider
                    value={[settings.colorCount]}
                    onValueChange={([value]) => setSettings((prev) => ({ ...prev, colorCount: value }))}
                    min={3}
                    max={16}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    More colors provide finer detail but may include noise
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select
                    value={settings.sortBy}
                    onValueChange={(value: "dominance" | "hue" | "brightness") =>
                      setSettings((prev) => ({ ...prev, sortBy: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dominance">Dominance</SelectItem>
                      <SelectItem value="hue">Hue</SelectItem>
                      <SelectItem value="brightness">Brightness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={extractColors} disabled={!selectedImage || isExtracting} className="w-full">
                  {isExtracting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <Palette className="h-4 w-4 mr-2" />
                      Extract Colors
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {extractedColors.length > 0 && (
              <>
                {/* Color Palette */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Extracted Colors ({extractedColors.length})
                    </CardTitle>
                    <CardDescription>Dominant colors found in the image</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      {extractedColors.map((color, index) => (
                        <div
                          key={index}
                          className="group relative rounded-lg overflow-hidden border cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => copyToClipboard(color.hex)}
                        >
                          <div className="h-20" style={{ backgroundColor: color.hex }} />
                          <div className="p-2 bg-background">
                            <p className="font-mono text-xs text-center">{color.hex}</p>
                            <p className="text-xs text-muted-foreground text-center">{color.percentage}%</p>
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Copy className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => exportColors("json")} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export JSON
                      </Button>
                      <Button variant="outline" onClick={() => exportColors("css")} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSS
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Color Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Color Details
                    </CardTitle>
                    <CardDescription>Detailed information for each extracted color</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="list" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="list">List View</TabsTrigger>
                        <TabsTrigger value="palette">Palette View</TabsTrigger>
                      </TabsList>

                      <TabsContent value="list" className="space-y-4">
                        {extractedColors.map((color, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                            <div
                              className="w-12 h-12 rounded-lg border flex-shrink-0"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">HEX:</span>
                                <code className="ml-2 font-mono">{color.hex}</code>
                              </div>
                              <div>
                                <span className="text-muted-foreground">RGB:</span>
                                <code className="ml-2 font-mono">{color.rgb.join(", ")}</code>
                              </div>
                              <div>
                                <span className="text-muted-foreground">HSL:</span>
                                <code className="ml-2 font-mono">{color.hsl.join(", ")}</code>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Usage:</span>
                                <span className="ml-2 font-medium">{color.percentage}%</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(color.hex)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="palette" className="space-y-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Color Palette Bar</Label>
                            <div className="flex h-16 rounded-lg overflow-hidden border">
                              {extractedColors.map((color, index) => (
                                <div
                                  key={index}
                                  className="flex-1 flex items-end justify-center pb-2 cursor-pointer hover:opacity-80 transition-opacity"
                                  style={{ backgroundColor: color.hex }}
                                  onClick={() => copyToClipboard(color.hex)}
                                >
                                  <span className="text-xs text-white drop-shadow-md font-medium">
                                    {color.percentage}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Linear Gradient</Label>
                            <div
                              className="h-16 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                              style={{
                                background: `linear-gradient(90deg, ${extractedColors.map((c) => c.hex).join(", ")})`,
                              }}
                              onClick={() =>
                                copyToClipboard(
                                  `linear-gradient(90deg, ${extractedColors.map((c) => c.hex).join(", ")})`,
                                )
                              }
                            />
                            <p className="text-xs text-muted-foreground">Click to copy gradient CSS</p>
                          </div>

                          <div className="space-y-2">
                            <Label>Radial Gradient</Label>
                            <div
                              className="h-16 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                              style={{
                                background: `radial-gradient(circle, ${extractedColors.map((c) => c.hex).join(", ")})`,
                              }}
                              onClick={() =>
                                copyToClipboard(
                                  `radial-gradient(circle, ${extractedColors.map((c) => c.hex).join(", ")})`,
                                )
                              }
                            />
                            <p className="text-xs text-muted-foreground">Click to copy gradient CSS</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Empty State */}
            {extractedColors.length === 0 && selectedImage && (
              <Card>
                <CardContent className="text-center py-12">
                  <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Colors Extracted Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload an image and click "Extract Colors" to get started.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* No Image State */}
            {!selectedImage && (
              <Card>
                <CardContent className="text-center py-12">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload an Image</h3>
                  <p className="text-muted-foreground">
                    Choose an image to extract its dominant colors and create beautiful palettes.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
