"use client"

import { useState, useEffect } from "react"
import type { Harmony } from "@/types/color"
import { generatePalette } from "@/utils/palette-generator"

export function usePaletteGenerator() {
  const [colors, setColors] = useState<string[]>([])
  const [harmonyType, setHarmonyType] = useState<Harmony>("analogous")

  // Generate default palette on mount
  useEffect(() => {
    const defaultColors = generatePalette("#00FFFF", "analogous", 5)
    setColors(defaultColors)
  }, [])

  const generateNewPalette = (baseColor: string, harmony: Harmony, count: number) => {
    setHarmonyType(harmony)
    const newColors = generatePalette(baseColor, harmony, count)
    setColors(newColors)
  }

  return {
    colors,
    harmonyType,
    generateNewPalette,
  }
}
