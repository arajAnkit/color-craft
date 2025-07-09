import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { GradientConfig } from "@/types/gradient"
import { generateCSS, getGradientStyle } from "@/utils/gradient"

interface UsageExamplesProps {
  config: GradientConfig
}

export function UsageExamples({ config }: UsageExamplesProps) {
  const gradientStyle = getGradientStyle(config)
  const css = generateCSS(config)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Examples</CardTitle>
        <CardDescription>See your gradient in different contexts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-24 rounded-lg shadow-md overflow-hidden">
              <div
                className="h-full flex items-center justify-center font-bold text-white text-shadow"
                style={gradientStyle}
              >
                Button
              </div>
            </div>
            <p className="text-sm text-center font-medium">Button Background</p>
          </div>
          <div className="space-y-2">
            <div
              className="h-24 rounded-lg shadow-md overflow-hidden p-4 flex items-center justify-center"
              style={gradientStyle}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-md p-3 text-center shadow-lg">
                <h3 className="font-bold text-sm">Card Title</h3>
                <p className="text-xs text-muted-foreground">Gradient background</p>
              </div>
            </div>
            <p className="text-sm text-center font-medium">Card Background</p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-24 rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-white">
              <div className="text-2xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: css }}>
                Gradient Text
              </div>
            </div>
            <p className="text-sm text-center font-medium">Text Gradient</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-lg shadow-md overflow-hidden p-1" style={gradientStyle}>
              <div className="h-full bg-white rounded-md flex items-center justify-center">
                <span className="font-medium">Border Effect</span>
              </div>
            </div>
            <p className="text-sm text-center font-medium">Border Gradient</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
