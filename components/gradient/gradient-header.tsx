import { Sparkles } from "lucide-react"

export function GradientHeader() {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex items-center gap-2">
        <Sparkles className="h-8 w-8 text-purple-600" />
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Advanced CSS Gradient Generator
        </h1>
      </div>
      <p className="text-lg text-muted-foreground">
        Create stunning CSS gradients with advanced controls, presets, and real-time preview.
      </p>
    </div>
  )
}
