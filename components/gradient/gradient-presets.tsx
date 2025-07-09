"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette } from "lucide-react"
import type { GradientPreset } from "@/types/gradient"

interface GradientPresetsProps {
  presets: GradientPreset[]
  onApplyPreset: (preset: GradientPreset) => void
}

export function GradientPresets({ presets, onApplyPreset }: GradientPresetsProps) {
  const getPresetStyle = (preset: GradientPreset) => {
    const colorStopsString = preset.colorStops.map((s) => `${s.color} ${s.position}%`).join(", ")

    if (preset.type === "linear") {
      return `linear-gradient(${preset.angle || 90}deg, ${colorStopsString})`
    } else if (preset.type === "radial") {
      return `radial-gradient(circle, ${colorStopsString})`
    } else {
      return `conic-gradient(${colorStopsString})`
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Gradient Presets
        </CardTitle>
        <CardDescription>Quick start with beautiful pre-made gradients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {presets.map((preset, index) => (
            <div key={index} className="space-y-2">
              <div
                className="h-20 rounded-lg cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
                style={{ background: getPresetStyle(preset) }}
                onClick={() => onApplyPreset(preset)}
              />
              <div className="text-center">
                <p className="text-sm font-medium">{preset.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {preset.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
