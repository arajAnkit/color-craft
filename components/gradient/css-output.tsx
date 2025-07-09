"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"
import type { GradientConfig } from "@/types/gradient"
import { generateCSS } from "@/utils/gradient"

interface CSSOutputProps {
  config: GradientConfig
  onCopy: () => void
  onExport: () => void
}

export function CSSOutput({ config, onCopy, onExport }: CSSOutputProps) {
  const css = generateCSS(config)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated CSS</CardTitle>
        <CardDescription>Copy the CSS code for your gradient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all">
            {`background: ${css};`}
          </pre>
          <Button variant="ghost" size="icon" onClick={onCopy} className="absolute top-2 right-2">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onCopy} className="gap-2">
            <Copy className="h-4 w-4" />
            Copy CSS
          </Button>
          <Button onClick={onExport} variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export File
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
