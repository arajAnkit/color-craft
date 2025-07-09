"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Plus, Minus, Copy, Play, Pause, Download, RefreshCw } from "lucide-react"

interface ColorStop {
  id: string
  color: string
  position: number
  opacity: number
}

interface GradientLayer {
  id: string
  type: "linear" | "radial" | "conic"
  angle: number
  centerX: number
  centerY: number
  colorStops: ColorStop[]
  blendMode: string
  opacity: number
  enabled: boolean
}

export default function AdvancedGradientBuilderPage() {
  const [layers, setLayers] = useState<GradientLayer[]>([
    {
      id: "1",
      type: "linear",
      angle: 45,
      centerX: 50,
      centerY: 50,
      colorStops: [
        { id: "1", color: "#667eea", position: 0, opacity: 100 },
        { id: "2", color: "#764ba2", position: 100, opacity: 100 },
      ],
      blendMode: "normal",
      opacity: 100,
      enabled: true,
    },
  ])
  const [activeLayer, setActiveLayer] = useState("1")
  const [isAnimated, setIsAnimated] = useState(false)
  const [animationDuration, setAnimationDuration] = useState(3)
  const [isPlaying, setIsPlaying] = useState(false)
  const [exportSize, setExportSize] = useState({ width: 800, height: 600 })
  const { toast } = useToast()
  const previewRef = useRef<HTMLDivElement>(null)

  const blendModes = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
  ]

  // Add new layer
  const addLayer = () => {
    const newLayer: GradientLayer = {
      id: Date.now().toString(),
      type: "linear",
      angle: 90,
      centerX: 50,
      centerY: 50,
      colorStops: [
        { id: Date.now().toString(), color: "#ff6b6b", position: 0, opacity: 100 },
        { id: (Date.now() + 1).toString(), color: "#4ecdc4", position: 100, opacity: 100 },
      ],
      blendMode: "normal",
      opacity: 100,
      enabled: true,
    }
    setLayers([...layers, newLayer])
    setActiveLayer(newLayer.id)
  }

  // Remove layer
  const removeLayer = (layerId: string) => {
    if (layers.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "You need at least one layer.",
        variant: "destructive",
      })
      return
    }

    const newLayers = layers.filter((layer) => layer.id !== layerId)
    setLayers(newLayers)

    if (activeLayer === layerId) {
      setActiveLayer(newLayers[0].id)
    }
  }

  // Update layer
  const updateLayer = (layerId: string, updates: Partial<GradientLayer>) => {
    setLayers(layers.map((layer) => (layer.id === layerId ? { ...layer, ...updates } : layer)))
  }

  // Add color stop
  const addColorStop = (layerId: string) => {
    const layer = layers.find((l) => l.id === layerId)
    if (!layer || layer.colorStops.length >= 10) return

    const newStop: ColorStop = {
      id: Date.now().toString(),
      color: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
      position: 50,
      opacity: 100,
    }

    updateLayer(layerId, {
      colorStops: [...layer.colorStops, newStop].sort((a, b) => a.position - b.position),
    })
  }

  // Remove color stop
  const removeColorStop = (layerId: string, stopId: string) => {
    const layer = layers.find((l) => l.id === layerId)
    if (!layer || layer.colorStops.length <= 2) return

    updateLayer(layerId, {
      colorStops: layer.colorStops.filter((stop) => stop.id !== stopId),
    })
  }

  // Update color stop
  const updateColorStop = (layerId: string, stopId: string, updates: Partial<ColorStop>) => {
    const layer = layers.find((l) => l.id === layerId)
    if (!layer) return

    updateLayer(layerId, {
      colorStops: layer.colorStops.map((stop) => (stop.id === stopId ? { ...stop, ...updates } : stop)),
    })
  }

  // Generate CSS for a single layer
  const generateLayerCSS = (layer: GradientLayer): string => {
    const sortedStops = [...layer.colorStops].sort((a, b) => a.position - b.position)
    const colorStopsString = sortedStops
      .map((stop) => {
        const opacity = stop.opacity / 100
        const hex = stop.color
        const r = Number.parseInt(hex.slice(1, 3), 16)
        const g = Number.parseInt(hex.slice(3, 5), 16)
        const b = Number.parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${opacity}) ${stop.position}%`
      })
      .join(", ")

    switch (layer.type) {
      case "linear":
        return `linear-gradient(${layer.angle}deg, ${colorStopsString})`
      case "radial":
        return `radial-gradient(circle at ${layer.centerX}% ${layer.centerY}%, ${colorStopsString})`
      case "conic":
        return `conic-gradient(from ${layer.angle}deg at ${layer.centerX}% ${layer.centerY}%, ${colorStopsString})`
      default:
        return ""
    }
  }

  // Generate complete background value (without "background:" prefix)
  const generateBackgroundValue = (): string => {
    const enabledLayers = layers.filter((layer) => layer.enabled)
    if (enabledLayers.length === 0) return ""

    return enabledLayers.map(generateLayerCSS).join(", ")
  }

  // Generate complete CSS with properties
  const generateCompleteCSS = (): string => {
    const enabledLayers = layers.filter((layer) => layer.enabled)
    if (enabledLayers.length === 0) return ""

    const backgroundImages = enabledLayers.map(generateLayerCSS).join(", ")
    const blendModes = enabledLayers.map((layer) => layer.blendMode).join(", ")

    let css = `background: ${backgroundImages};`

    if (enabledLayers.some((layer) => layer.blendMode !== "normal")) {
      css += `\nbackground-blend-mode: ${blendModes};`
    }

    if (isAnimated) {
      css += `\nanimation: gradient-animation ${animationDuration}s ease-in-out infinite;`
    }

    return css
  }

  // Generate animation keyframes
  const generateAnimationCSS = (): string => {
    if (!isAnimated) return ""

    const originalBackground = generateBackgroundValue()
    const animatedBackground = originalBackground.replace(
      /(\d+)deg/g,
      (match, angle) => `${(Number.parseInt(angle) + 180) % 360}deg`,
    )

    return `
@keyframes gradient-animation {
  0%, 100% {
    background: ${originalBackground};
  }
  50% {
    background: ${animatedBackground};
  }
}`
  }

  // Copy CSS to clipboard
  const copyCSS = () => {
    const css = generateCompleteCSS() + (isAnimated ? "\n\n" + generateAnimationCSS() : "")
    navigator.clipboard.writeText(css)
    toast({
      title: "Copied!",
      description: "CSS code copied to clipboard.",
    })
  }

  // Export as image
  const exportAsImage = () => {
    const canvas = document.createElement("canvas")
    canvas.width = exportSize.width
    canvas.height = exportSize.height
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Create a temporary div with the gradient
    const tempDiv = document.createElement("div")
    tempDiv.style.width = `${exportSize.width}px`
    tempDiv.style.height = `${exportSize.height}px`
    tempDiv.style.background = generateBackgroundValue()
    document.body.appendChild(tempDiv)

    // Use html2canvas or similar library in a real implementation
    // For now, we'll create a simple colored rectangle
    const gradient = ctx.createLinearGradient(0, 0, exportSize.width, exportSize.height)
    const activeLayerData = layers.find((l) => l.id === activeLayer)
    if (activeLayerData) {
      activeLayerData.colorStops.forEach((stop) => {
        gradient.addColorStop(stop.position / 100, stop.color)
      })
    }

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, exportSize.width, exportSize.height)

    // Download the image
    const link = document.createElement("a")
    link.download = "advanced-gradient.png"
    link.href = canvas.toDataURL()
    link.click()

    document.body.removeChild(tempDiv)
  }

  // Generate random gradient
  const generateRandomGradient = () => {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
      "#54a0ff",
      "#5f27cd",
      "#00d2d3",
      "#ff9f43",
      "#10ac84",
      "#ee5a24",
      "#0abde3",
      "#3867d6",
      "#8854d0",
    ]

    const randomLayer: GradientLayer = {
      id: Date.now().toString(),
      type: ["linear", "radial", "conic"][Math.floor(Math.random() * 3)] as any,
      angle: Math.floor(Math.random() * 360),
      centerX: Math.floor(Math.random() * 100),
      centerY: Math.floor(Math.random() * 100),
      colorStops: [
        {
          id: Date.now().toString(),
          color: colors[Math.floor(Math.random() * colors.length)],
          position: 0,
          opacity: 100,
        },
        {
          id: (Date.now() + 1).toString(),
          color: colors[Math.floor(Math.random() * colors.length)],
          position: 100,
          opacity: 100,
        },
      ],
      blendMode: "normal",
      opacity: 100,
      enabled: true,
    }

    setLayers([randomLayer])
    setActiveLayer(randomLayer.id)
  }

  const activeLayerData = layers.find((layer) => layer.id === activeLayer)

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
          Advanced Gradient Builder
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create complex multi-layer gradients with blend modes, animations, and advanced controls.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Layer Management */}
        <Card>
          <CardHeader>
            <CardTitle>Layers</CardTitle>
            <CardDescription>Manage gradient layers and blend modes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={addLayer} size="sm" className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Add Layer
              </Button>
              <Button onClick={generateRandomGradient} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {layers.map((layer, index) => (
                <div
                  key={layer.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeLayer === layer.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setActiveLayer(layer.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Layer {layers.length - index}</span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={layer.enabled}
                        onCheckedChange={(enabled) => updateLayer(layer.id, { enabled })}
                        size="sm"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeLayer(layer.id)
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-8 rounded-md border" style={{ background: generateLayerCSS(layer) }} />
                  <div className="mt-2 text-xs text-muted-foreground">
                    {layer.type} • {layer.blendMode} • {layer.opacity}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Layer Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Layer Controls</CardTitle>
            <CardDescription>
              {activeLayerData
                ? `Editing Layer ${layers.findIndex((l) => l.id === activeLayer) + 1}`
                : "Select a layer to edit"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeLayerData && (
              <Tabs defaultValue="gradient">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                </TabsList>

                <TabsContent value="gradient" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={activeLayerData.type}
                      onValueChange={(value) => updateLayer(activeLayer, { type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                        <SelectItem value="conic">Conic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(activeLayerData.type === "linear" || activeLayerData.type === "conic") && (
                    <div className="space-y-2">
                      <Label>Angle: {activeLayerData.angle}°</Label>
                      <Slider
                        value={[activeLayerData.angle]}
                        min={0}
                        max={360}
                        step={1}
                        onValueChange={(value) => updateLayer(activeLayer, { angle: value[0] })}
                      />
                    </div>
                  )}

                  {(activeLayerData.type === "radial" || activeLayerData.type === "conic") && (
                    <>
                      <div className="space-y-2">
                        <Label>Center X: {activeLayerData.centerX}%</Label>
                        <Slider
                          value={[activeLayerData.centerX]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateLayer(activeLayer, { centerX: value[0] })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Center Y: {activeLayerData.centerY}%</Label>
                        <Slider
                          value={[activeLayerData.centerY]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => updateLayer(activeLayer, { centerY: value[0] })}
                        />
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="colors" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Color Stops</Label>
                    <Button onClick={() => addColorStop(activeLayer)} size="sm" variant="outline">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {activeLayerData.colorStops.map((stop) => (
                      <div key={stop.id} className="space-y-2 p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-md border cursor-pointer"
                            style={{ backgroundColor: stop.color }}
                            onClick={() => {
                              const input = document.getElementById(`color-${stop.id}`) as HTMLInputElement
                              if (input) input.click()
                            }}
                          />
                          <Input
                            id={`color-${stop.id}`}
                            type="color"
                            value={stop.color}
                            onChange={(e) => updateColorStop(activeLayer, stop.id, { color: e.target.value })}
                            className="w-0 h-0 opacity-0 absolute"
                          />
                          <Input
                            type="text"
                            value={stop.color}
                            onChange={(e) => updateColorStop(activeLayer, stop.id, { color: e.target.value })}
                            className="flex-1 font-mono text-sm"
                          />
                          <Button variant="ghost" size="sm" onClick={() => removeColorStop(activeLayer, stop.id)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Position: {stop.position}%</Label>
                          <Slider
                            value={[stop.position]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => updateColorStop(activeLayer, stop.id, { position: value[0] })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Opacity: {stop.opacity}%</Label>
                          <Slider
                            value={[stop.opacity]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => updateColorStop(activeLayer, stop.id, { opacity: value[0] })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="effects" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Blend Mode</Label>
                    <Select
                      value={activeLayerData.blendMode}
                      onValueChange={(value) => updateLayer(activeLayer, { blendMode: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {blendModes.map((mode) => (
                          <SelectItem key={mode} value={mode}>
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Layer Opacity: {activeLayerData.opacity}%</Label>
                    <Slider
                      value={[activeLayerData.opacity]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => updateLayer(activeLayer, { opacity: value[0] })}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Animation</Label>
                      <Switch checked={isAnimated} onCheckedChange={setIsAnimated} />
                    </div>

                    {isAnimated && (
                      <>
                        <div className="space-y-2">
                          <Label>Duration: {animationDuration}s</Label>
                          <Slider
                            value={[animationDuration]}
                            min={0.5}
                            max={10}
                            step={0.5}
                            onValueChange={(value) => setAnimationDuration(value[0])}
                          />
                        </div>

                        <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" className="w-full">
                          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                          {isPlaying ? "Pause" : "Play"} Animation
                        </Button>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>

        {/* Preview and Export */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Live preview of your gradient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              ref={previewRef}
              className={`w-full h-64 rounded-lg border ${isAnimated && isPlaying ? "animate-pulse" : ""}`}
              style={{
                background: generateBackgroundValue(),
                animation:
                  isAnimated && isPlaying ? `gradient-animation ${animationDuration}s ease-in-out infinite` : "none",
              }}
            />

            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <Label className="text-sm mb-2 block">CSS Code:</Label>
                <pre className="text-xs whitespace-pre-wrap break-all font-mono">
                  {generateCompleteCSS()}
                  {isAnimated && "\n\n" + generateAnimationCSS()}
                </pre>
              </div>

              <div className="flex gap-2">
                <Button onClick={copyCSS} className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy CSS
                </Button>
                <Button onClick={exportAsImage} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Export Size</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Width"
                    value={exportSize.width}
                    onChange={(e) => setExportSize({ ...exportSize, width: Number.parseInt(e.target.value) || 800 })}
                  />
                  <Input
                    type="number"
                    placeholder="Height"
                    value={exportSize.height}
                    onChange={(e) => setExportSize({ ...exportSize, height: Number.parseInt(e.target.value) || 600 })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Examples */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>See how your gradient looks in different contexts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm">Button</Label>
              <Button className="w-full" style={{ background: generateBackgroundValue() }}>
                Gradient Button
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Card</Label>
              <div className="p-6 rounded-lg shadow-md" style={{ background: generateBackgroundValue() }}>
                <h3 className="text-lg font-bold text-white drop-shadow-md">Card Title</h3>
                <p className="text-white/90 text-sm drop-shadow-md">
                  This is how your gradient would look as a card background.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Text</Label>
              <div className="text-center">
                <h2
                  className="text-3xl font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: generateBackgroundValue() }}
                >
                  Gradient Text
                </h2>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes gradient-animation {
          0%, 100% {
            background: ${generateBackgroundValue()};
          }
          50% {
            background: ${generateBackgroundValue().replace(/(\d+)deg/g, (match, angle) => `${(Number.parseInt(angle) + 180) % 360}deg`)};
          }
        }
      `}</style>
    </div>
  )
}
