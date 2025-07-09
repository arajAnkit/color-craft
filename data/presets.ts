import type { GradientPreset } from "@/types/gradient.ts";

export const gradientPresets: GradientPreset[] = [
  {
    name: "Sunset",
    type: "linear",
    angle: 45,
    colorStops: [
      { color: "#FF6B6B", position: 0 },
      { color: "#FFE66D", position: 50 },
      { color: "#FF8E53", position: 100 },
    ],
    category: "Nature",
  },
  {
    name: "Ocean",
    type: "linear",
    angle: 135,
    colorStops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 },
    ],
    category: "Nature",
  },
  {
    name: "Neon",
    type: "linear",
    angle: 90,
    colorStops: [
      { color: "#00F5FF", position: 0 },
      { color: "#FF00FF", position: 50 },
      { color: "#FFFF00", position: 100 },
    ],
    category: "Vibrant",
  },
  {
    name: "Pastel Dream",
    type: "radial",
    colorStops: [
      { color: "#FFB6C1", position: 0 },
      { color: "#E6E6FA", position: 50 },
      { color: "#B0E0E6", position: 100 },
    ],
    category: "Soft",
  },
  {
    name: "Fire",
    type: "conic",
    colorStops: [
      { color: "#FF4500", position: 0 },
      { color: "#FFD700", position: 25 },
      { color: "#FF6347", position: 50 },
      { color: "#DC143C", position: 75 },
      { color: "#FF4500", position: 100 },
    ],
    category: "Vibrant",
  },
  {
    name: "Mint Fresh",
    type: "linear",
    angle: 180,
    colorStops: [
      { color: "#00C9FF", position: 0 },
      { color: "#92FE9D", position: 100 },
    ],
    category: "Fresh",
  },
];
