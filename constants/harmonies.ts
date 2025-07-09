import type { HarmonyOption } from "@/types/color";

export const HARMONY_OPTIONS: HarmonyOption[] = [
  {
    label: "Analogous",
    value: "analogous",
    description: "Colors that are next to each other on the color wheel.",
  },
  {
    label: "Monochromatic",
    value: "monochromatic",
    description: "Variations of a single color.",
  },
  {
    label: "Triadic",
    value: "triadic",
    description: "Colors that are evenly spaced around the color wheel.",
  },
  {
    label: "Complementary",
    value: "complementary",
    description: "Colors that are opposite each other on the color wheel.",
  },
  {
    label: "Compound",
    value: "compound",
    description: "Combination of complementary and analogous colors.",
  },
];
