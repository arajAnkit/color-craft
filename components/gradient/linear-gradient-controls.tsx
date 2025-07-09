"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface LinearGradientControlsProps {
  angle: number
  onAngleChange: (angle: number) => void
}

export function LinearGradientControls({ angle, onAngleChange }: LinearGradientControlsProps) {
  const getDirectionLabel = (angle: number): string => {
    if (angle === 0) return "Right to Left"
    if (angle === 45) return "Bottom-Left to Top-Right"
    if (angle === 90) return "Bottom to Top"
    if (angle === 135) return "Bottom-Right to Top-Left"
    if (angle === 180) return "Left to Right"
    if (angle === 225) return "Top-Left to Bottom-Right"
    if (angle === 270) return "Top to Bottom"
    if (angle === 315) return "Top-Right to Bottom-Left"
    return "Custom Direction"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linear Gradient Settings</CardTitle>
        <CardDescription>Configure the direction and angle</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Slider
            value={[angle]}
            min={0}
            max={360}
            step={1}
            onValueChange={(value) => onAngleChange(value[0])}
            className="flex-1"
          />
          <div className="w-20">
            <Input
              type="number"
              value={angle}
              onChange={(e) => onAngleChange(Number(e.target.value) % 361)}
              min={0}
              max={360}
            />
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {angle}° - {getDirectionLabel(angle)}
        </div>
      </CardContent>
    </Card>
  )
}
