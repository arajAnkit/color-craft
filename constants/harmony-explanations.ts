import type { Harmony } from "@/types/color";

export interface HarmonyExplanation {
  title: string;
  description: string;
  howItWorks: string;
  characteristics: string[];
  useCases: string[];
  tips: string[];
  examples: string[];
}

export const HARMONY_EXPLANATIONS: Record<Harmony, HarmonyExplanation> = {
  analogous: {
    title: "Analogous Color Harmony",
    description:
      "Analogous colors are groups of colors that are adjacent to each other on the color wheel. They create harmonious and pleasing color combinations that are easy on the eyes.",
    howItWorks:
      "This harmony uses colors that are within 30-60 degrees of each other on the color wheel. Starting from your base color, analogous palettes include the neighboring colors, creating a smooth transition across the spectrum.",
    characteristics: [
      "Creates a sense of harmony and unity",
      "Produces serene and comfortable designs",
      "One color dominates while others support",
      "Low contrast between colors",
      "Natural and pleasing to the eye",
      "Easy to work with and rarely clash",
    ],
    useCases: [
      "Nature-inspired designs and landscapes",
      "Calming and relaxing interfaces",
      "Gradient backgrounds and transitions",
      "Brand identities requiring harmony",
      "Interior design and home decor",
      "Photography and artistic compositions",
    ],
    tips: [
      "Choose one color to dominate and use others as accents",
      "Add a neutral color to balance the palette",
      "Consider the temperature (warm vs cool) of your analogous colors",
      "Use varying saturation and brightness for depth",
      "Perfect for creating mood and atmosphere",
    ],
    examples: [
      "Ocean themes: Blues, blue-greens, and greens",
      "Sunset palettes: Reds, oranges, and yellows",
      "Forest themes: Greens, yellow-greens, and blues",
      "Autumn colors: Reds, red-oranges, and oranges",
    ],
  },
  monochromatic: {
    title: "Monochromatic Color Harmony",
    description:
      "Monochromatic color schemes use variations in lightness and saturation of a single color. This creates a cohesive and sophisticated look while maintaining visual interest through tonal variations.",
    howItWorks:
      "Starting with one base hue, this harmony creates variations by adjusting the saturation (intensity) and lightness (brightness) of that single color, resulting in tints, tones, and shades of the same hue.",
    characteristics: [
      "Highly cohesive and unified appearance",
      "Sophisticated and elegant aesthetic",
      "Easy to create and work with",
      "Minimal risk of color clashing",
      "Creates depth through light and dark variations",
      "Emphasizes texture and form over color contrast",
    ],
    useCases: [
      "Minimalist and modern designs",
      "Professional and corporate branding",
      "Photography with single color focus",
      "Interior design for calm spaces",
      "Fashion and textile design",
      "User interfaces requiring subtlety",
    ],
    tips: [
      "Use a wide range of tints and shades for variety",
      "Include both very light and very dark versions",
      "Add texture and patterns to create visual interest",
      "Consider using different saturations of the same hue",
      "Perfect for creating focus on content over color",
    ],
    examples: [
      "Navy corporate theme: Light blue to dark navy",
      "Sage green spa: Pale mint to deep forest green",
      "Burgundy wine brand: Pink blush to deep maroon",
      "Charcoal tech: Light gray to deep charcoal",
    ],
  },
  triadic: {
    title: "Triadic Color Harmony",
    description:
      "Triadic color schemes use three colors that are evenly spaced around the color wheel, creating vibrant and dynamic palettes while maintaining harmony and balance.",
    howItWorks:
      "This harmony selects colors that are 120 degrees apart on the color wheel, forming an equilateral triangle. This creates high contrast while maintaining color harmony, offering vibrant yet balanced combinations.",
    characteristics: [
      "High contrast and vibrant appearance",
      "Balanced and harmonious despite contrast",
      "Dynamic and energetic feel",
      "Each color maintains its distinctiveness",
      "Creates visual tension and excitement",
      "Offers rich color variety",
    ],
    useCases: [
      "Playful and energetic brand identities",
      "Children's products and educational materials",
      "Sports and entertainment designs",
      "Art and creative projects",
      "Festival and event graphics",
      "Gaming and interactive interfaces",
    ],
    tips: [
      "Let one color dominate and use others as accents",
      "Adjust saturation to control intensity",
      "Use neutral colors to balance the vibrancy",
      "Consider the psychological impact of each color",
      "Great for creating focal points and emphasis",
    ],
    examples: [
      "Primary triad: Red, blue, and yellow",
      "Secondary triad: Orange, green, and purple",
      "Tropical theme: Orange, teal, and magenta",
      "Retro gaming: Lime green, hot pink, and electric blue",
    ],
  },
  complementary: {
    title: "Complementary Color Harmony",
    description:
      "Complementary colors are opposite each other on the color wheel, creating the highest contrast and most dynamic color relationships. They make each other appear more vibrant when used together.",
    howItWorks:
      "This harmony uses colors that are 180 degrees apart on the color wheel. When placed next to each other, complementary colors create maximum contrast and visual impact, making both colors appear more intense and vibrant.",
    characteristics: [
      "Maximum contrast and visual impact",
      "Colors appear more vibrant when paired",
      "Creates strong focal points",
      "High energy and dynamic tension",
      "Can be overwhelming if not balanced properly",
      "Naturally draws attention and creates emphasis",
    ],
    useCases: [
      "Call-to-action buttons and important elements",
      "Sports team colors and competitive branding",
      "High-impact advertising and marketing",
      "Art pieces requiring dramatic contrast",
      "Warning signs and safety applications",
      "Fashion statements and bold designs",
    ],
    tips: [
      "Use one color as dominant and the other as accent",
      "Adjust saturation to reduce intensity if needed",
      "Add neutral colors to provide visual rest",
      "Consider using tints and shades for variation",
      "Perfect for creating strong visual hierarchy",
    ],
    examples: [
      "Classic: Red and green (Christmas colors)",
      "Digital: Blue and orange (tech and warmth)",
      "Nature: Purple and yellow (flowers and sun)",
      "Modern: Teal and coral (contemporary design)",
    ],
  },
  compound: {
    title: "Compound Color Harmony (Split-Complementary)",
    description:
      "Compound harmony combines the vibrancy of complementary colors with the harmony of analogous colors, using a base color plus the two colors adjacent to its complement.",
    howItWorks:
      "Starting with a base color, this harmony includes the two colors on either side of the base color's complement. This creates strong visual contrast like complementary colors but with more harmony and less tension.",
    characteristics: [
      "Strong visual contrast with more harmony",
      "Less tension than pure complementary schemes",
      "Offers more color variety than complementary",
      "Maintains visual interest without overwhelming",
      "Balanced between harmony and contrast",
      "Sophisticated and complex color relationships",
    ],
    useCases: [
      "Sophisticated brand identities",
      "Editorial design and publications",
      "Web design requiring both harmony and contrast",
      "Interior design with personality",
      "Fashion and lifestyle brands",
      "Art and creative projects needing complexity",
    ],
    tips: [
      "Use the base color as the dominant color",
      "The split-complementary colors work well as accents",
      "Provides more flexibility than strict complementary",
      "Easier to work with than pure complementary schemes",
      "Great for creating sophisticated color stories",
    ],
    examples: [
      "Blue with red-orange and yellow-orange",
      "Red with blue-green and yellow-green",
      "Yellow with red-purple and blue-purple",
      "Green with red-orange and red-purple",
    ],
  },
};
