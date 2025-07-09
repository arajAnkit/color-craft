"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Plus, Trash2 } from "lucide-react"
import type { ColorStop } from "@/types/gradient"

interface ColorStopsManagerProps {
  colorStops: ColorStop[]
  onAddColorStop: () => void
  onRemoveColorStop: (index: number) => void
  onUpdateColorStop: (index: number, field: "color" | "position", value: string | number) => void
}

export function ColorStopsManager({
  colorStops,
  onAddColorStop,
  onRemoveColorStop,
  onUpdateColorStop,
}: ColorStopsManagerProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Color Stops</CardTitle>
          <CardDescription>Add and configure color stops for your gradient</CardDescription>
        </div>
        <Button onClick={onAddColorStop} size="sm" className="h-8 gap-1">
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {colorStops.map((stop, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
            <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border">
              <Input
                type="color"
                value={stop.color}
                onChange={(e) => onUpdateColorStop(index, "color", e.target.value)}
                className="w-12 h-12 p-0 border-0 -ml-1 -mt-1 cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={stop.color}
              onChange={(e) => onUpdateColorStop(index, "color", e.target.value)}
              className="font-mono flex-shrink-0 w-28"
            />
            <div className="flex-1 px-2">
              <Slider
                value={[stop.position]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => onUpdateColorStop(index, "position", value[0])}
              />
            </div>
            <div className="flex-shrink-0 w-16">
              <Input
                type="number"
                value={stop.position}
                onChange={(e) =>
                  onUpdateColorStop(index, "position", Math.max(0, Math.min(100, Number(e.target.value))))
                }
                min={0}
                max={100}
                className="text-center"
              />
            </div>
            <span className="text-sm text-muted-foreground">%</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveColorStop(index)}
              className="flex-shrink-0 h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
