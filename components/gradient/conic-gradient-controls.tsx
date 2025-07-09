"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConicGradientControlsProps {
  angle: number
  position: string
  onAngleChange: (angle: number) => void
  onPositionChange: (position: string) => void
}

export function ConicGradientControls({
  angle,
  position,
  onAngleChange,
  onPositionChange,
}: ConicGradientControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conic Gradient Settings</CardTitle>
        <CardDescription>Configure the conic gradient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Starting Angle: {angle}°</Label>
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
        </div>
        <div className="space-y-2">
          <Label>Position</Label>
          <Select value={position} onValueChange={onPositionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="top left">Top Left</SelectItem>
              <SelectItem value="top right">Top Right</SelectItem>
              <SelectItem value="bottom left">Bottom Left</SelectItem>
              <SelectItem value="bottom right">Bottom Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
