"use client"

import { Button } from "@/components/ui/button"
import { Shuffle, Download, RefreshCw } from "lucide-react"

interface GradientToolbarProps {
  onRandomize: () => void
  onExport: () => void
  isAnimated: boolean
  onToggleAnimation: () => void
}

export function GradientToolbar({ onRandomize, onExport, isAnimated, onToggleAnimation }: GradientToolbarProps) {
  return (
    <div className="flex gap-2 mt-4">
      <Button onClick={onRandomize} variant="outline" className="gap-2 bg-transparent">
        <Shuffle className="h-4 w-4" />
        Randomize
      </Button>
      <Button onClick={onExport} variant="outline" className="gap-2 bg-transparent">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <Button onClick={onToggleAnimation} variant={isAnimated ? "default" : "outline"} className="gap-2">
        <RefreshCw className={`h-4 w-4 ${isAnimated ? "animate-spin" : ""}`} />
        {isAnimated ? "Stop Animation" : "Animate"}
      </Button>
    </div>
  )
}
