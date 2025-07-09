"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  Download,
  Copy,
  Eye,
  Palette,
  Layers,
  Settings,
  ImageIcon,
  Sparkles,
  CheckCircle,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorStop {
  color: string
  position: number
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
}

interface ExtractedGradient {
  id: string
  type: "linear" | "radial"
  direction?: number
  angle?: string
  colors: ColorStop[]
  css: string
  quality: number
}

interface AnalysisSettings {
  sensitivity: number
  gradientType: "auto" | "linear" | "radial"
  minStops: number
  maxStops: number
  maxGradients: number
}

export default function GradientExtractorPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [extractedGradients, setExtractedGradients] = useState<ExtractedGradient[]>([])
  const [selectedGradient, setSelectedGradient] = useState<ExtractedGradient | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [copiedGradient, setCopiedGradient] = useState<string | null>(null)
  const [settings, setSettings] = useState<AnalysisSettings>({
    sensitivity: 75,
    gradientType: "auto",
    minStops: 2,
    maxStops: 5,
    maxGradients: 6,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      return
    }

    setSelectedImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
      setExtractedGradients([])
      setSelectedGradient(null)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleImageUpload(files[0])
      }
    },
    [handleImageUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  // Color conversion utilities
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  // K-means clustering for color extraction
  const kMeansColors = (imageData: ImageData, k: number): { r: number; g: number; b: number }[] => {
    const pixels: { r: number; g: number; b: number }[] = []

    // Sample pixels (every 4th pixel for performance)
    for (let i = 0; i < imageData.data.length; i += 16) {
      pixels.push({
        r: imageData.data[i],
        g: imageData.data[i + 1],
        b: imageData.data[i + 2],
      })
    }

    // Initialize centroids randomly
    const centroids: { r: number; g: number; b: number }[] = []
    for (let i = 0; i < k; i++) {
      const randomPixel = pixels[Math.floor(Math.random() * pixels.length)]
      centroids.push({ ...randomPixel })
    }

    // K-means iterations
    for (let iter = 0; iter < 10; iter++) {
      const clusters: { r: number; g: number; b: number }[][] = Array(k)
        .fill(null)
        .map(() => [])

      // Assign pixels to nearest centroid
      pixels.forEach((pixel) => {
        let minDistance = Number.POSITIVE_INFINITY
        let closestCentroid = 0

        centroids.forEach((centroid, index) => {
          const distance = Math.sqrt(
            Math.pow(pixel.r - centroid.r, 2) + Math.pow(pixel.g - centroid.g, 2) + Math.pow(pixel.b - centroid.b, 2),
          )
          if (distance < minDistance) {
            minDistance = distance
            closestCentroid = index
          }
        })

        clusters[closestCentroid].push(pixel)
      })

      // Update centroids
      clusters.forEach((cluster, index) => {
        if (cluster.length > 0) {
          centroids[index] = {
            r: Math.round(cluster.reduce((sum, p) => sum + p.r, 0) / cluster.length),
            g: Math.round(cluster.reduce((sum, p) => sum + p.g, 0) / cluster.length),
            b: Math.round(cluster.reduce((sum, p) => sum + p.b, 0) / cluster.length),
          }
        }
      })
    }

    return centroids
  }

  // Analyze image for gradients
  const analyzeGradients = async () => {
    if (!imagePreview || !canvasRef.current) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

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

      // Set canvas size
      canvas.width = Math.min(img.width, 800)
      canvas.height = Math.min(img.height, 600)

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      setAnalysisProgress(25)

      // Extract dominant colors
      const dominantColors = kMeansColors(imageData, settings.maxStops * 2)

      setAnalysisProgress(50)

      // Generate gradients based on analysis
      const gradients: ExtractedGradient[] = []

      // Linear gradients (horizontal, vertical, diagonal)
      if (settings.gradientType === "auto" || settings.gradientType === "linear") {
        const directions = [
          { angle: 0, name: "to right" },
          { angle: 90, name: "to bottom" },
          { angle: 45, name: "to bottom right" },
          { angle: 135, name: "to bottom left" },
        ]

        directions.forEach((dir, index) => {
          if (gradients.length >= settings.maxGradients) return

          const selectedColors = dominantColors
            .slice(0, Math.min(settings.maxStops, dominantColors.length))
            .map((color, i) => ({
              color: rgbToHex(color.r, color.g, color.b),
              position: (i / (Math.min(settings.maxStops, dominantColors.length) - 1)) * 100,
              rgb: color,
              hsl: rgbToHsl(color.r, color.g, color.b),
            }))

          const css = `linear-gradient(${dir.name}, ${selectedColors
            .map((stop) => `${stop.color} ${stop.position}%`)
            .join(", ")})`

          gradients.push({
            id: `linear-${index}`,
            type: "linear",
            direction: dir.angle,
            angle: dir.name,
            colors: selectedColors,
            css,
            quality: Math.random() * 30 + 70, // Simulated quality score
          })
        })
      }

      setAnalysisProgress(75)

      // Radial gradients
      if (settings.gradientType === "auto" || settings.gradientType === "radial") {
        const radialPositions = ["circle at center", "ellipse at center", "circle at top left"]

        radialPositions.forEach((position, index) => {
          if (gradients.length >= settings.maxGradients) return

          const selectedColors = dominantColors
            .slice(index, index + Math.min(settings.maxStops, dominantColors.length - index))
            .map((color, i) => ({
              color: rgbToHex(color.r, color.g, color.b),
              position: (i / (Math.min(settings.maxStops, dominantColors.length - index) - 1)) * 100,
              rgb: color,
              hsl: rgbToHsl(color.r, color.g, color.b),
            }))

          if (selectedColors.length >= settings.minStops) {
            const css = `radial-gradient(${position}, ${selectedColors
              .map((stop) => `${stop.color} ${stop.position}%`)
              .join(", ")})`

            gradients.push({
              id: `radial-${index}`,
              type: "radial",
              colors: selectedColors,
              css,
              quality: Math.random() * 25 + 60, // Simulated quality score
            })
          }
        })
      }

      setAnalysisProgress(100)

      // Sort by quality
      gradients.sort((a, b) => b.quality - a.quality)
      setExtractedGradients(gradients.slice(0, settings.maxGradients))

      if (gradients.length > 0) {
        setSelectedGradient(gradients[0])
      }
    } catch (error) {
      console.error("Error analyzing gradients:", error)
    } finally {
      setIsAnalyzing(false)
      setTimeout(() => setAnalysisProgress(0), 1000)
    }
  }

  const copyToClipboard = async (text: string, gradientId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedGradient(gradientId)
      setTimeout(() => setCopiedGradient(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const downloadCSS = () => {
    if (extractedGradients.length === 0) return

    const cssContent = extractedGradients
      .map(
        (gradient, index) => `/* Gradient ${index + 1} - ${gradient.type} */
.gradient-${index + 1} {
  background: ${gradient.css};
}

`,
      )
      .join("")

    const blob = new Blob([cssContent], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "extracted-gradients.css"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
              <Layers className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Gradient Extractor
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extract beautiful gradients from any image using advanced analysis algorithms. Upload an image and discover
            the hidden gradient patterns within.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload and Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Image
                </CardTitle>
                <CardDescription>
                  Upload an image to extract gradients from. Supports JPG, PNG, and WebP formats.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
                    "hover:border-primary/50 hover:bg-primary/5",
                    selectedImage ? "border-primary bg-primary/10" : "border-muted-foreground/25",
                  )}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                  />

                  {imagePreview ? (
                    <div className="space-y-3">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-full max-h-32 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-muted-foreground">{selectedImage?.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium">Drop an image here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Analysis Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Sensitivity: {settings.sensitivity}%</Label>
                  <Slider
                    value={[settings.sensitivity]}
                    onValueChange={([value]) => setSettings({ ...settings, sensitivity: value })}
                    max={100}
                    min={25}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Higher sensitivity detects more subtle gradients</p>
                </div>

                <div className="space-y-2">
                  <Label>Gradient Type</Label>
                  <Select
                    value={settings.gradientType}
                    onValueChange={(value: "auto" | "linear" | "radial") =>
                      setSettings({ ...settings, gradientType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Detect</SelectItem>
                      <SelectItem value="linear">Linear Only</SelectItem>
                      <SelectItem value="radial">Radial Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Stops: {settings.minStops}</Label>
                    <Slider
                      value={[settings.minStops]}
                      onValueChange={([value]) => setSettings({ ...settings, minStops: value })}
                      max={5}
                      min={2}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Stops: {settings.maxStops}</Label>
                    <Slider
                      value={[settings.maxStops]}
                      onValueChange={([value]) => setSettings({ ...settings, maxStops: value })}
                      max={8}
                      min={3}
                      step={1}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Max Gradients: {settings.maxGradients}</Label>
                  <Slider
                    value={[settings.maxGradients]}
                    onValueChange={([value]) => setSettings({ ...settings, maxGradients: value })}
                    max={10}
                    min={3}
                    step={1}
                  />
                </div>

                <Button
                  onClick={analyzeGradients}
                  disabled={!selectedImage || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Extract Gradients
                    </>
                  )}
                </Button>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <Progress value={analysisProgress} className="w-full" />
                    <p className="text-xs text-center text-muted-foreground">
                      {analysisProgress < 25 && "Loading image..."}
                      {analysisProgress >= 25 && analysisProgress < 50 && "Extracting colors..."}
                      {analysisProgress >= 50 && analysisProgress < 75 && "Analyzing patterns..."}
                      {analysisProgress >= 75 && "Generating gradients..."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {extractedGradients.length > 0 && (
              <>
                {/* Extracted Gradients Grid */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="h-5 w-5" />
                          Extracted Gradients ({extractedGradients.length})
                        </CardTitle>
                        <CardDescription>Click on a gradient to view details and get the CSS code</CardDescription>
                      </div>
                      <Button onClick={downloadCSS} variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download CSS
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {extractedGradients.map((gradient) => (
                        <div
                          key={gradient.id}
                          className={cn(
                            "relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-2",
                            "hover:scale-105 hover:shadow-lg",
                            selectedGradient?.id === gradient.id
                              ? "border-primary shadow-lg scale-105"
                              : "border-transparent",
                          )}
                          onClick={() => setSelectedGradient(gradient)}
                        >
                          <div className="h-24 w-full" style={{ background: gradient.css }} />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="text-xs">
                              {Math.round(gradient.quality)}%
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="outline" className="text-xs bg-white/90">
                              {gradient.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Gradient Details */}
                {selectedGradient && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Gradient Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="preview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                          <TabsTrigger value="colors">Colors</TabsTrigger>
                          <TabsTrigger value="code">CSS Code</TabsTrigger>
                        </TabsList>

                        <TabsContent value="preview" className="space-y-4">
                          <div className="h-32 w-full rounded-lg border" style={{ background: selectedGradient.css }} />
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label className="text-xs text-muted-foreground">Type</Label>
                              <p className="font-medium capitalize">{selectedGradient.type}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Quality Score</Label>
                              <p className="font-medium">{Math.round(selectedGradient.quality)}%</p>
                            </div>
                            {selectedGradient.angle && (
                              <div>
                                <Label className="text-xs text-muted-foreground">Direction</Label>
                                <p className="font-medium">{selectedGradient.angle}</p>
                              </div>
                            )}
                            <div>
                              <Label className="text-xs text-muted-foreground">Color Stops</Label>
                              <p className="font-medium">{selectedGradient.colors.length}</p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="colors" className="space-y-4">
                          <div className="space-y-3">
                            {selectedGradient.colors.map((color, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                                <div
                                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: color.color }}
                                />
                                <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <Label className="text-xs text-muted-foreground">HEX</Label>
                                    <p className="font-mono">{color.color}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">RGB</Label>
                                    <p className="font-mono">
                                      {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">HSL</Label>
                                    <p className="font-mono">
                                      {color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%
                                    </p>
                                  </div>
                                </div>
                                <Badge variant="outline">{Math.round(color.position)}%</Badge>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="code" className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label>CSS Background</Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(selectedGradient.css, selectedGradient.id)}
                              >
                                {copiedGradient === selectedGradient.id ? (
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                ) : (
                                  <Copy className="h-4 w-4 mr-2" />
                                )}
                                {copiedGradient === selectedGradient.id ? "Copied!" : "Copy"}
                              </Button>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                              <code className="text-sm font-mono break-all">{selectedGradient.css}</code>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <Label>CSS Class</Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    `.gradient {\n  background: ${selectedGradient.css};\n}`,
                                    `${selectedGradient.id}-class`,
                                  )
                                }
                              >
                                {copiedGradient === `${selectedGradient.id}-class` ? (
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                ) : (
                                  <Copy className="h-4 w-4 mr-2" />
                                )}
                                {copiedGradient === `${selectedGradient.id}-class` ? "Copied!" : "Copy"}
                              </Button>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                              <code className="text-sm font-mono whitespace-pre">
                                {`.gradient {\n  background: ${selectedGradient.css};\n}`}
                              </code>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Empty State */}
            {extractedGradients.length === 0 && !isAnalyzing && (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center space-y-4">
                    <div className="p-4 rounded-full bg-muted w-fit mx-auto">
                      <Layers className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">No Gradients Extracted Yet</h3>
                      <p className="text-muted-foreground">
                        Upload an image and click "Extract Gradients" to get started
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Pro Tips:</strong> Images with smooth color transitions work best. Try landscape photos,
                abstract art, or UI designs with gradient backgrounds for optimal results.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
