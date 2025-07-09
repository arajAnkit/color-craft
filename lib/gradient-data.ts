export interface Gradient {
  id: string
  name: string
  css: string
  category: string
  colors: string[]
  description?: string
}

export const gradients: Gradient[] = [
  // Linear Gradients
  {
    id: "sunset",
    name: "Sunset",
    css: "linear-gradient(45deg, #ff6b6b, #ffa500, #ff1493)",
    category: "linear",
    colors: ["#ff6b6b", "#ffa500", "#ff1493"],
    description: "A warm sunset gradient with vibrant oranges and pinks",
  },
  {
    id: "ocean",
    name: "Ocean",
    css: "linear-gradient(135deg, #667eea, #764ba2)",
    category: "linear",
    colors: ["#667eea", "#764ba2"],
    description: "Deep ocean blues transitioning to purple",
  },
  {
    id: "forest",
    name: "Forest",
    css: "linear-gradient(to right, #134e5e, #71b280)",
    category: "linear",
    colors: ["#134e5e", "#71b280"],
    description: "Fresh forest greens from dark to light",
  },
  {
    id: "fire",
    name: "Fire",
    css: "linear-gradient(45deg, #ff0000, #ff4500, #ffa500)",
    category: "linear",
    colors: ["#ff0000", "#ff4500", "#ffa500"],
    description: "Blazing fire colors from red to orange",
  },
  {
    id: "sky",
    name: "Sky",
    css: "linear-gradient(to bottom, #87ceeb, #98fb98)",
    category: "linear",
    colors: ["#87ceeb", "#98fb98"],
    description: "Clear sky blue fading to light green",
  },
  {
    id: "purple-rain",
    name: "Purple Rain",
    css: "linear-gradient(135deg, #667eea, #764ba2, #f093fb)",
    category: "linear",
    colors: ["#667eea", "#764ba2", "#f093fb"],
    description: "Purple rain with blue and pink accents",
  },

  // Radial Gradients
  {
    id: "sun",
    name: "Sun",
    css: "radial-gradient(circle, #ffd700, #ff8c00, #ff4500)",
    category: "radial",
    colors: ["#ffd700", "#ff8c00", "#ff4500"],
    description: "Radiant sun with golden center",
  },
  {
    id: "moon",
    name: "Moon",
    css: "radial-gradient(circle, #f5f5dc, #d3d3d3, #696969)",
    category: "radial",
    colors: ["#f5f5dc", "#d3d3d3", "#696969"],
    description: "Soft moonlight glow",
  },
  {
    id: "aurora",
    name: "Aurora",
    css: "radial-gradient(ellipse at center, #00ff7f, #00bfff, #9370db)",
    category: "radial",
    colors: ["#00ff7f", "#00bfff", "#9370db"],
    description: "Northern lights aurora effect",
  },
  {
    id: "galaxy",
    name: "Galaxy",
    css: "radial-gradient(circle, #4b0082, #8a2be2, #000000)",
    category: "radial",
    colors: ["#4b0082", "#8a2be2", "#000000"],
    description: "Deep space galaxy colors",
  },

  // Conic Gradients
  {
    id: "rainbow",
    name: "Rainbow",
    css: "conic-gradient(from 0deg, #ff0000, #ff8c00, #ffd700, #00ff00, #00bfff, #4169e1, #8a2be2)",
    category: "conic",
    colors: ["#ff0000", "#ff8c00", "#ffd700", "#00ff00", "#00bfff", "#4169e1", "#8a2be2"],
    description: "Full spectrum rainbow wheel",
  },
  {
    id: "color-wheel",
    name: "Color Wheel",
    css: "conic-gradient(from 90deg, #ff0000, #ff8c00, #ffd700, #00ff00, #00bfff, #8a2be2, #ff0000)",
    category: "conic",
    colors: ["#ff0000", "#ff8c00", "#ffd700", "#00ff00", "#00bfff", "#8a2be2"],
    description: "Classic color wheel gradient",
  },
  {
    id: "sunset-wheel",
    name: "Sunset Wheel",
    css: "conic-gradient(from 45deg, #ff6b6b, #ffa500, #ff1493, #ff6b6b)",
    category: "conic",
    colors: ["#ff6b6b", "#ffa500", "#ff1493"],
    description: "Sunset colors in a circular pattern",
  },

  // Complex Gradients
  {
    id: "northern-lights",
    name: "Northern Lights",
    css: "linear-gradient(45deg, #00ff7f 0%, #00bfff 25%, #9370db 50%, #ff1493 75%, #00ff7f 100%)",
    category: "complex",
    colors: ["#00ff7f", "#00bfff", "#9370db", "#ff1493"],
    description: "Aurora borealis inspired gradient",
  },
  {
    id: "tropical",
    name: "Tropical",
    css: "linear-gradient(135deg, #ff6b6b 0%, #ffa500 25%, #32cd32 50%, #00bfff 75%, #ff6b6b 100%)",
    category: "complex",
    colors: ["#ff6b6b", "#ffa500", "#32cd32", "#00bfff"],
    description: "Vibrant tropical paradise colors",
  },
  {
    id: "cosmic",
    name: "Cosmic",
    css: "radial-gradient(ellipse at top, #4b0082, #8a2be2, #000080, #000000)",
    category: "complex",
    colors: ["#4b0082", "#8a2be2", "#000080", "#000000"],
    description: "Deep space cosmic gradient",
  },
  {
    id: "volcano",
    name: "Volcano",
    css: "radial-gradient(circle at bottom, #ff0000, #ff4500, #ffa500, #000000)",
    category: "complex",
    colors: ["#ff0000", "#ff4500", "#ffa500", "#000000"],
    description: "Volcanic eruption with lava colors",
  },
]

export const gradientCategories = [
  { id: "all", name: "All Gradients" },
  { id: "linear", name: "Linear" },
  { id: "radial", name: "Radial" },
  { id: "conic", name: "Conic" },
  { id: "complex", name: "Complex" },
]
