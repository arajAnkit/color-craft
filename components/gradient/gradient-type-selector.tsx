"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { GradientType } from "@/types/gradient"

interface GradientTypeSelectorProps {
  value: GradientType
  onChange: (value: GradientType) => void
}

export function GradientTypeSelector({ value, onChange }: GradientTypeSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gradient Type</CardTitle>
        <CardDescription>Choose the type of gradient you want to create</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={value} onValueChange={(value) => onChange(value as GradientType)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="linear">Linear</TabsTrigger>
            <TabsTrigger value="radial">Radial</TabsTrigger>
            <TabsTrigger value="conic">Conic</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}
