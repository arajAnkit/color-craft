"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, Eye, EyeOff, Info, Accessibility } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ColorBlindnessType {
  id: string
  name: string
  description: string
  prevalence: string
  severity: "mild" | "moderate" | "severe"
}

const colorBlindnessTypes: ColorBlindnessType[] = [
  {
    id: "normal",
    name: "Normal Vision",
    description: "No color vision deficiency",
    prevalence: "~92% of population",
    severity: "mild",
  },
  {
    id: "protanopia",
    name: "Protanopia",
    description: "Missing long-wavelength (red) cones",
    prevalence: "~1% of males",
    severity: "severe",
  },
  {
    id: "deuteranopia",
    name: "Deuteranopia",
    description: "Missing medium-wavelength (green) cones",
    prevalence: "~1% of males",
    severity: "severe",
  },
  {
    id: "tritanopia",
    name: "Tritanopia",
    description: "Missing short-wavelength (blue) cones",
    prevalence: "~0.01% of population",
    severity: "severe",
  },
  {
    id: "protanomaly",
    name: "Protanomaly",
    description: "Altered long-wavelength (red) cones",
    prevalence: "~1% of males",
    severity: "moderate",
  },
  {
    id: "deuteranomaly",
    name: "Deuteranomaly",
    description: "Altered medium-wavelength (green) cones",
    prevalence: "~5% of males",
    severity: "moderate",
  },
  {
    id: "tritanomaly",
    name: "Tritanomaly",
    description: "Altered short-wavelength (blue) cones",
    prevalence: "~0.01% of population",
    severity: "moderate",
  },
  {
    id: "achromatopsia",
    name: "Achromatopsia",
    description: "Complete absence of color vision",
    prevalence: "~0.003% of population",
    severity: "severe",
  },
]

export default function ColorBlindnessSimulatorPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("#3b82f6")
  const [activeSimulation, setActiveSimulation] = useState<string>("normal")
  const [simulatedImages, setSimulatedImages] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

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
        setSimulatedImages({})
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const simulateColorBlindness = useCallback((imageData: ImageData, type: string): ImageData => {
    const { data, width, height } = imageData
    const newData = new Uint8ClampedArray(data)

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      let newR = r,
        newG = g,
        newB = b

      switch (type) {
        case "protanopia":
          // Remove red channel contribution
          newR = 0.567 * r + 0.433 * g
          newG = 0.558 * r + 0.442 * g
          newB = 0.242 * g + 0.758 * b
          break
        case "deuteranopia":
          // Remove green channel contribution
          newR = 0.625 * r + 0.375 * g
          newG = 0.7 * r + 0.3 * g
          newB = 0.3 * g + 0.7 * b
          break
        case "tritanopia":
          // Remove blue channel contribution
          newR = 0.95 * r + 0.05 * g
          newG = 0.433 * g + 0.567 * b
          newB = 0.475 * g + 0.525 * b
          break
        case "protanomaly":
          // Reduced red sensitivity
          newR = 0.817 * r + 0.183 * g
          newG = 0.333 * r + 0.667 * g
          newB = 0.125 * g + 0.875 * b
          break
        case "deuteranomaly":
          // Reduced green sensitivity
          newR = 0.8 * r + 0.2 * g
          newG = 0.258 * r + 0.742 * g
          newB = 0.142 * g + 0.858 * b
          break
        case "tritanomaly":
          // Reduced blue sensitivity
          newR = 0.967 * r + 0.033 * g
          newG = 0.733 * g + 0.267 * b
          newB = 0.183 * g + 0.817 * b
          break
        case "achromatopsia":
          // Convert to grayscale
          const gray = 0.299 * r + 0.587 * g + 0.114 * b
          newR = newG = newB = gray
          break
        default:
          // Normal vision - no change
          break
      }

      newData[i] = Math.round(Math.max(0, Math.min(255, newR)))
      newData[i + 1] = Math.round(Math.max(0, Math.min(255, newG)))
      newData[i + 2] = Math.round(Math.max(0, Math.min(255, newB)))
    }

    return new ImageData(newData, width, height)
  }, [])

  const simulateColorForColorBlindness = useCallback((hex: string, type: string): string => {
    // Convert hex to RGB
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)

    let newR = r,
      newG = g,
      newB = b

    switch (type) {
      case "protanopia":
        newR = 0.567 * r + 0.433 * g
        newG = 0.558 * r + 0.442 * g
        newB = 0.242 * g + 0.758 * b
        break
      case "deuteranopia":
        newR = 0.625 * r + 0.375 * g
        newG = 0.7 * r + 0.3 * g
        newB = 0.3 * g + 0.7 * b
        break
      case "tritanopia":
        newR = 0.95 * r + 0.05 * g
        newG = 0.433 * g + 0.567 * b
        newB = 0.475 * g + 0.525 * b
        break
      case "protanomaly":
        newR = 0.817 * r + 0.183 * g
        newG = 0.333 * r + 0.667 * g
        newB = 0.125 * g + 0.875 * b
        break
      case "deuteranomaly":
        newR = 0.8 * r + 0.2 * g
        newG = 0.258 * r + 0.742 * g
        newB = 0.142 * g + 0.858 * b
        break
      case "tritanomaly":
        newR = 0.967 * r + 0.033 * g
        newG = 0.733 * g + 0.267 * b
        newB = 0.183 * g + 0.817 * b
        break
      case "achromatopsia":
        const gray = 0.299 * r + 0.587 * g + 0.114 * b
        newR = newG = newB = gray
        break
      default:
        break
    }

    // Convert back to hex
    const toHex = (n: number) =>
      Math.round(Math.max(0, Math.min(255, n)))
        .toString(16)
        .padStart(2, "0")
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
  }, [])

  const processImage = useCallback(async () => {
    if (!selectedImage || !canvasRef.current) return

    setIsProcessing(true)
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
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const newSimulatedImages: Record<string, string> = {}

      // Process each color blindness type
      for (const type of colorBlindnessTypes) {
        if (type.id === "normal") {
          newSimulatedImages[type.id] = imagePreview
          continue
        }

        const simulatedImageData = simulateColorBlindness(originalImageData, type.id)
        ctx.putImageData(simulatedImageData, 0, 0)
        newSimulatedImages[type.id] = canvas.toDataURL()
      }

      setSimulatedImages(newSimulatedImages)
      toast({
        title: "Processing Complete!",
        description: "All color blindness simulations have been generated.",
      })
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "There was an error processing the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }, [selectedImage, imagePreview, simulateColorBlindness, toast])

  const downloadImage = (type: string) => {
    const imageUrl = simulatedImages[type]
    if (!imageUrl) return

    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `color-blindness-${type}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "severe":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Accessibility className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Color Blindness Simulator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test how your designs appear to people with different types of color vision deficiency. Essential for
            creating accessible and inclusive user experiences.
          </p>
        </div>

        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Image Simulation
            </TabsTrigger>
            <TabsTrigger value="color" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Color Simulation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upload Section */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Image
                    </CardTitle>
                    <CardDescription>Choose an image to simulate color blindness effects</CardDescription>
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

                    {selectedImage && (
                      <Button onClick={processImage} disabled={isProcessing} className="w-full">
                        {isProcessing ? "Processing..." : "Generate Simulations"}
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Color Blindness Types Info */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Color Vision Types
                    </CardTitle>
                    <CardDescription>Understanding different types of color vision deficiency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {colorBlindnessTypes.map((type) => (
                        <div key={type.id} className="p-3 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{type.name}</h4>
                            <Badge className={getSeverityColor(type.severity)}>{type.severity}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{type.description}</p>
                          <p className="text-xs text-muted-foreground">{type.prevalence}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-2">
                {Object.keys(simulatedImages).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {colorBlindnessTypes.map((type) => {
                      const imageUrl = simulatedImages[type.id]
                      if (!imageUrl) return null

                      return (
                        <Card
                          key={type.id}
                          className={cn(
                            "cursor-pointer transition-all",
                            activeSimulation === type.id ? "ring-2 ring-blue-500" : "",
                          )}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{type.name}</CardTitle>
                              <div className="flex items-center gap-2">
                                <Badge className={getSeverityColor(type.severity)}>{type.severity}</Badge>
                                <Button variant="ghost" size="sm" onClick={() => downloadImage(type.id)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <CardDescription>{type.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div
                              className="relative rounded-lg overflow-hidden border cursor-pointer"
                              onClick={() => setActiveSimulation(type.id)}
                            >
                              <img
                                src={imageUrl || "/placeholder.svg"}
                                alt={`${type.name} simulation`}
                                className="w-full h-48 object-cover"
                              />
                              {activeSimulation === type.id && (
                                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                  <Eye className="h-8 w-8 text-white" />
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <EyeOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Simulations Yet</h3>
                      <p className="text-muted-foreground">
                        Upload an image and click "Generate Simulations" to see how it appears with different types of
                        color vision deficiency.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="color" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Color Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Color Input
                  </CardTitle>
                  <CardDescription>
                    Choose a color to see how it appears with different types of color vision
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="color-input">Select Color</Label>
                    <div className="flex gap-3">
                      <Input
                        id="color-input"
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-16 h-12 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        placeholder="#3b82f6"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Original Color</Label>
                    <div className="w-full h-16 rounded-lg border" style={{ backgroundColor: selectedColor }} />
                    <p className="text-sm text-muted-foreground text-center">{selectedColor.toUpperCase()}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Color Simulations */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Vision Simulations</CardTitle>
                  <CardDescription>
                    How the selected color appears with different types of color vision deficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {colorBlindnessTypes.map((type) => {
                      const simulatedColor = simulateColorForColorBlindness(selectedColor, type.id)

                      return (
                        <div key={type.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">{type.name}</Label>
                            <Badge className={getSeverityColor(type.severity)} variant="outline">
                              {type.severity}
                            </Badge>
                          </div>
                          <div className="w-full h-12 rounded border" style={{ backgroundColor: simulatedColor }} />
                          <p className="text-xs text-muted-foreground text-center font-mono">
                            {simulatedColor.toUpperCase()}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Design Considerations
                </CardTitle>
                <CardDescription>Best practices for creating accessible designs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Do's</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        Use high contrast between text and background colors
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        Include patterns, textures, or shapes alongside color coding
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        Test your designs with color blindness simulators
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        Use tools like ColorBrewer for accessible color palettes
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Don'ts</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        Don't rely solely on color to convey important information
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        Avoid problematic color combinations (red/green, blue/purple)
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        Don't use low contrast color combinations
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        Avoid using color as the only way to indicate status or state
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
