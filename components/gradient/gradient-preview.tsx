import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { GradientConfig } from "@/types/gradient"
import { getGradientStyle } from "@/utils/gradient"

interface GradientPreviewProps {
  config: GradientConfig
  isAnimated?: boolean
}

export function GradientPreview({ config, isAnimated = false }: GradientPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
        <CardDescription>See how your gradient looks in real-time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80 rounded-lg shadow-lg border" style={getGradientStyle(config, isAnimated)} />
      </CardContent>
    </Card>
  )
}
