import type { Harmony } from "@/types/color";
import { hslToHex } from "./color-conversion";

export function generatePalette(
  baseColor: string,
  harmony: Harmony,
  count: number
): string[] {
  // Extract hue from base color more accurately
  const baseHue = hexToHue(baseColor);

  const generators = {
    analogous: generateAnalogous,
    monochromatic: generateMonochromatic,
    triadic: generateTriadic,
    complementary: generateComplementary,
    compound: generateCompound,
  };

  const colors = generators[harmony](baseHue, count, baseColor);

  // Ensure base color is always included as the first color
  if (!colors.includes(baseColor.toUpperCase())) {
    colors[0] = baseColor.toUpperCase();
  }

  return colors;
}

function hexToHue(hex: string): number {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;

  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return Math.round(h * 360);
}

function generateAnalogous(
  hue: number,
  count: number,
  baseColor: string
): string[] {
  const colors = [baseColor.toUpperCase()];
  const step = 30; // 30 degrees between analogous colors

  for (let i = 1; i < count; i++) {
    const newHue = (hue + i * step) % 360;
    colors.push(hslToHex(newHue, 75, 55));
  }
  return colors;
}

function generateMonochromatic(
  hue: number,
  count: number,
  baseColor: string
): string[] {
  const colors = [baseColor.toUpperCase()];

  // Generate variations in lightness and saturation
  for (let i = 1; i < count; i++) {
    const lightness = 20 + (i * 70) / count; // Spread from 20% to 90%
    const saturation = 60 + (i * 30) / count; // Vary saturation slightly
    colors.push(
      hslToHex(hue, Math.min(90, saturation), Math.min(90, lightness))
    );
  }
  return colors;
}

function generateTriadic(
  hue: number,
  count: number,
  baseColor: string
): string[] {
  const colors = [baseColor.toUpperCase()];

  // Triadic colors are 120 degrees apart
  if (count > 1) colors.push(hslToHex((hue + 120) % 360, 75, 55));
  if (count > 2) colors.push(hslToHex((hue + 240) % 360, 75, 55));

  // Fill remaining with variations
  for (let i = 3; i < count; i++) {
    const baseHueIndex = i % 3;
    const baseTriadicHue =
      baseHueIndex === 0
        ? hue
        : baseHueIndex === 1
        ? (hue + 120) % 360
        : (hue + 240) % 360;
    const lightness = 40 + i * 20;
    colors.push(hslToHex(baseTriadicHue, 70, Math.min(80, lightness)));
  }

  return colors;
}

function generateComplementary(
  hue: number,
  count: number,
  baseColor: string
): string[] {
  const colors = [baseColor.toUpperCase()];

  // Complementary color is 180 degrees opposite
  if (count > 1) {
    colors.push(hslToHex((hue + 180) % 360, 75, 55));
  }

  // Fill remaining with variations of base and complement
  for (let i = 2; i < count; i++) {
    const useComplement = i % 2 === 0;
    const targetHue = useComplement ? (hue + 180) % 360 : hue;
    const lightness = 30 + i * 15;
    const saturation = 60 + i * 10;
    colors.push(
      hslToHex(targetHue, Math.min(90, saturation), Math.min(85, lightness))
    );
  }

  return colors;
}

function generateCompound(
  hue: number,
  count: number,
  baseColor: string
): string[] {
  const colors = [baseColor.toUpperCase()];
  const complementHue = (hue + 180) % 360;

  // Split-complementary colors (30 degrees on either side of complement)
  if (count > 1)
    colors.push(hslToHex((complementHue - 30 + 360) % 360, 75, 55));
  if (count > 2) colors.push(hslToHex((complementHue + 30) % 360, 75, 55));

  // Fill remaining with analogous variations of base
  for (let i = 3; i < count; i++) {
    const analogousHue = (hue + (i - 2) * 20) % 360;
    colors.push(hslToHex(analogousHue, 70, 50));
  }

  return colors;
}
