"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type ColorStop = {
  id: string
  color: string
  position: number
}

export default function MultistepGradientPage() {
  const [gradientType, setGradientType] = useState<"linear" | "radial" | "conic">("linear")
  const [angle, setAngle] = useState<number>(90)
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: "1", color: "#667eea", position: 0 },
    { id: "2", color: "#764ba2", position: 50 },
    { id: "3", color: "#f093fb", position: 100 },
  ])
  const [presetName, setPresetName] = useState("")
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
        ".multistep-card",
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

  const addColorStop = () => {
    if (colorStops.length >= 10) {
      toast({
        title: "Maximum Color Stops",
        description: "You can have a maximum of 10 color stops.",
        variant: "destructive",
      })
      return
    }

    const newId = Date.now().toString()
    const newPosition = colorStops.length > 0 ? Math.max(...colorStops.map((stop) => stop.position)) + 10 : 50

    // Generate a random color
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`

    setColorStops([...colorStops, { id: newId, color: randomColor, position: Math.min(newPosition, 100) }])
  }

  const removeColorStop = (id: string) => {
    if (colorStops.length <= 2) {
      toast({
        title: "Minimum Color Stops",
        description: "You need at least 2 color stops for a gradient.",
        variant: "destructive",
      })
      return
    }

    setColorStops(colorStops.filter((stop) => stop.id !== id))
  }

  const updateColorStop = (id: string, field: "color" | "position", value: string | number) => {
    setColorStops(
      colorStops.map((stop) =>
        stop.id === id
          ? {
              ...stop,
              [field]: value,
            }
          : stop,
      ),
    )
  }

  const generateRandomGradient = () => {
    const colors = [
      "#667eea",
      "#764ba2",
      "#f093fb",
      "#f5576c",
      "#4facfe",
      "#00f2fe",
      "#43e97b",
      "#38f9d7",
      "#ffecd2",
      "#fcb69f",
      "#a8edea",
      "#fed6e3",
      "#ff9a9e",
      "#fecfef",
      "#ffecd2",
    ]

    const numStops = Math.floor(Math.random() * 4) + 3 // 3-6 stops
    const newStops: ColorStop[] = []

    for (let i = 0; i < numStops; i++) {
      newStops.push({
        id: Date.now().toString() + i,
        color: colors[Math.floor(Math.random() * colors.length)],
        position: (i / (numStops - 1)) * 100,
      })
    }

    setColorStops(newStops)
    setAngle(Math.floor(Math.random() * 360))
  }

  const generateCSS = (): string => {
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position)

    // Format the color stops
    const colorStopsString = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")

    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${colorStopsString})`
    } else if (gradientType === "radial") {
      return `radial-gradient(circle, ${colorStopsString})`
    } else {
      return `conic-gradient(from ${angle}deg, ${colorStopsString})`
    }
  }

  const copyCSS = () => {
    const css = generateCSS()
    navigator.clipboard.writeText(css)
    toast({
      title: "Copied!",
      description: "CSS gradient copied to clipboard.",
    })
  }

  const savePreset = () => {
    if (!presetName.trim()) {
      toast({
        title: "Preset Name Required",
        description: "Please enter a name for your preset.",
        variant: "destructive",
      })
      return
    }

    const preset = {
      name: presetName,
      type: gradientType,
      angle,
      colorStops,
      css: generateCSS(),
    }

    // In a real app, you'd save this to localStorage or a database
    console.log("Saving preset:", preset)

    toast({
      title: "Preset Saved!",
      description: `"${presetName}" has been saved to your presets.`,
    })

    setPresetName("")
  }

  const presetGradients = [
    {
      name: "Sunset Vibes",
      stops: [
        { id: "1", color: "#ff6b6b", position: 0 },
        { id: "2", color: "#ffa500", position: 50 },
        { id: "3", color: "#ff1744", position: 100 },
      ],
    },
    {
      name: "Ocean Depths",
      stops: [
        { id: "1", color: "#0077be", position: 0 },
        { id: "2", color: "#00a8cc", position: 33 },
        { id: "3", color: "#4facfe", position: 66 },
        { id: "4", color: "#00f2fe", position: 100 },
      ],
    },
    {
      name: "Forest Canopy",
      stops: [
        { id: "1", color: "#2d5016", position: 0 },
        { id: "2", color: "#4a7c59", position: 25 },
        { id: "3", color: "#6b8e23", position: 50 },
        { id: "4", color: "#9acd32", position: 75 },
        { id: "5", color: "#adff2f", position: 100 },
      ],
    },
  ]

  const loadPreset = (preset: any) => {
    setColorStops(preset.stops)
    toast({
      title: "Preset Loaded!",
      description: `"${preset.name}" gradient has been loaded.`,
    })
  }

  return (
    <div ref={pageRef} className="container mx-auto px-6 py-12">
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
          Multistep Gradient Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create complex gradients with multiple color stops and advanced controls.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card className="multistep-card">
            <CardHeader>
              <CardTitle>Gradient Settings</CardTitle>
              <CardDescription>Configure your gradient type and direction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Gradient Type</Label>
                <Select
                  value={gradientType}
                  onValueChange={(value) => setGradientType(value as "linear" | "radial" | "conic")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gradient type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                    <SelectItem value="conic">Conic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(gradientType === "linear" || gradientType === "conic") && (
                <div className="space-y-2">
                  <Label>Angle: {angle}°</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[angle]}
                      min={0}
                      max={360}
                      step={1}
                      onValueChange={(value) => setAngle(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={angle}
                      onChange={(e) => setAngle(Number(e.target.value) % 361)}
                      min={0}
                      max={360}
                      className="w-20"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={generateRandomGradient} variant="outline" className="flex-1">
                  Random Gradient
                </Button>
                <Button onClick={addColorStop} variant="outline" className="flex-1">
                  Add Color Stop
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="multistep-card">
            <CardHeader>
              <CardTitle>Color Stops</CardTitle>
              <CardDescription>Add, remove, and adjust color stops</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {colorStops.map((stop) => (
                <div key={stop.id} className="flex items-center gap-3">
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
                    onChange={(e) => updateColorStop(stop.id, "color", e.target.value)}
                    className="w-0 h-0 opacity-0 absolute"
                  />
                  <div className="flex-1">
                    <Label className="text-xs mb-1 block">Position: {stop.position}%</Label>
                    <Slider
                      value={[stop.position]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => updateColorStop(stop.id, "position", value[0])}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeColorStop(stop.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="multistep-card">
            <CardHeader>
              <CardTitle>Presets</CardTitle>
              <CardDescription>Save and load gradient presets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Preset name"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={savePreset}>Save</Button>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {presetGradients.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    className="h-auto py-2 px-3 flex flex-col items-center"
                    onClick={() => loadPreset(preset)}
                  >
                    <div
                      className="w-full h-8 rounded-md mb-2"
                      style={{
                        background: `linear-gradient(90deg, ${preset.stops
                          .map((stop) => `${stop.color} ${stop.position}%`)
                          .join(", ")})`,
                      }}
                    />
                    <span className="text-xs">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card className="multistep-card">
            <CardHeader>
              <CardTitle>Gradient Preview</CardTitle>
              <CardDescription>Live preview of your gradient</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 rounded-lg shadow-inner" style={{ background: generateCSS() }} />

              <div className="mt-6 space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <Label className="text-sm mb-2 block">CSS Code:</Label>
                  <code className="text-sm block whitespace-pre-wrap break-all">background: {generateCSS()};</code>
                </div>

                <Button onClick={copyCSS} className="w-full">
                  Copy CSS
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="multistep-card">
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
              <CardDescription>See how your gradient looks in different contexts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm">Button:</Label>
                <div className="flex justify-center">
                  <Button className="w-auto" style={{ background: generateCSS() }}>
                    Gradient Button
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Card:</Label>
                <div className="p-6 rounded-lg shadow-md" style={{ background: generateCSS() }}>
                  <h3 className="text-lg font-bold text-white drop-shadow-md">Card Title</h3>
                  <p className="text-white/90 text-sm drop-shadow-md">
                    This is how your gradient would look as a card background.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Text:</Label>
                <div className="text-center">
                  <h2
                    className="text-3xl font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: generateCSS() }}
                  >
                    Gradient Text
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
