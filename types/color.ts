export type Harmony =
  | "analogous"
  | "monochromatic"
  | "triadic"
  | "complementary"
  | "compound";

export interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  hsl: [number, number, number];
}

export interface PaletteFormValues {
  baseColor: string;
  harmony: Harmony;
  count: number;
}

export interface HarmonyOption {
  label: string;
  value: Harmony;
  description: string;
}
