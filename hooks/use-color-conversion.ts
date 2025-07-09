import type { Color } from "@/types/color"
import { hexToRgb, hexToHsl } from "@/utils/color-conversion"

export function useColorConversion() {
  const convertColorsToFullFormat = (colors: string[]): Color[] => {
    return colors.map((color, index) => ({
      name: `Color ${index + 1}`,
      hex: color,
      rgb: hexToRgb(color),
      hsl: hexToHsl(color),
    }))
  }

  return { convertColorsToFullFormat }
}
