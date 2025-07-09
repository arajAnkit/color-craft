import {
  Palette,
  Lightbulb,
  Layers,
  Shuffle,
  Eye,
  Pipette,
  Blend,
  Zap,
  Sparkles,
  Wand2,
  Target,
  Brush,
  ImageIcon,
  Settings,
  Sliders,
} from "lucide-react";

export const toolsData = [
  {
    title: "Color Library",
    tagline: "Curated Color Collection",
    description:
      "Explore our comprehensive collection of beautiful, professionally curated colors.",
    detail:
      "Browse through hundreds of carefully selected colors organized by categories, moods, and themes. Each color comes with complete information including hex codes, RGB values, and usage suggestions for your design projects.",
    features: [
      "500+ curated colors",
      "Category-based organization",
      "Color information & codes",
      "Usage recommendations",
      "Search & filter options",
      "Copy to clipboard",
    ],
    icon: <Palette className="h-6 w-6" />,
    href: "/colors",
    gradient: "from-red-600 to-yellow-400",
  },
  {
    title: "Color Theory",
    tagline: "Learn Color Fundamentals",
    description:
      "Master the fundamentals of color theory with interactive lessons and examples.",
    detail:
      "Dive deep into color theory concepts including color wheels, harmonies, temperature, and psychology. Interactive examples help you understand how colors work together and influence emotions in design.",
    features: [
      "Interactive color wheel",
      "Color harmony examples",
      "Psychology of colors",
      "Temperature concepts",
      "Practical applications",
      "Visual demonstrations",
    ],
    icon: <Lightbulb className="h-6 w-6" />,
    href: "/color-theory",
    gradient: "from-indigo-800 to-cyan-300",
  },
  {
    title: "Palette Generator",
    tagline: "AI-Powered Palettes",
    description:
      "Generate stunning color palettes using advanced AI algorithms.",
    detail:
      "Create beautiful, harmonious color palettes instantly with our AI-powered generator. Choose from various generation methods including complementary, triadic, analogous, and custom algorithms.",
    features: [
      "AI-powered generation",
      "Multiple harmony types",
      "Custom algorithms",
      "Export options",
      "Palette history",
      "Share functionality",
    ],
    icon: <Sparkles className="h-6 w-6" />,
    href: "/palette-generator",
    gradient: "from-fuchsia-500 to-amber-600",
  },
  {
    title: "Color Converter",
    tagline: "Universal Color Conversion",
    description:
      "Convert colors between different formats with precision and ease.",
    detail:
      "Convert colors seamlessly between HEX, RGB, HSL, HSV, CMYK, and more. Perfect for designers and developers who need accurate color translations across different platforms and applications.",
    features: [
      "Multiple format support",
      "Real-time conversion",
      "Precision accuracy",
      "Batch conversion",
      "History tracking",
      "Copy functionality",
    ],
    icon: <Shuffle className="h-6 w-6" />,
    href: "/color-converter",
    gradient: "from-emerald-700 to-rose-400",
  },
  {
    title: "Contrast Checker",
    tagline: "Accessibility Compliance",
    description: "Ensure your color combinations meet accessibility standards.",
    detail:
      "Test color combinations for WCAG compliance and accessibility. Get detailed reports on contrast ratios, readability scores, and suggestions for improving accessibility in your designs.",
    features: [
      "WCAG compliance testing",
      "Contrast ratio calculation",
      "Accessibility scoring",
      "Improvement suggestions",
      "Real-time preview",
      "Detailed reports",
    ],
    icon: <Eye className="h-6 w-6" />,
    href: "/contrast-checker",
    gradient: "from-slate-900 to-orange-500",
  },
  {
    title: "Tint & Shade Generator",
    tagline: "Color Variations Made Easy",
    description:
      "Generate beautiful tints, shades, and tones from any base color.",
    detail:
      "Create comprehensive color variations by generating tints (adding white), shades (adding black), and tones (adding gray) from your base color. Perfect for creating cohesive color schemes.",
    features: [
      "Tint generation",
      "Shade creation",
      "Tone variations",
      "Custom step control",
      "Export options",
      "Palette preview",
    ],
    icon: <Brush className="h-6 w-6" />,
    href: "/tint-shade-generator",
    gradient: "from-violet-600 to-lime-400",
  },
  {
    title: "Color Harmonies",
    tagline: "Perfect Color Relationships",
    description:
      "Discover harmonious color combinations using color theory principles.",
    detail:
      "Explore different color harmony types including complementary, analogous, triadic, tetradic, and split-complementary schemes. Each harmony comes with detailed explanations and usage examples.",
    features: [
      "Multiple harmony types",
      "Theory explanations",
      "Usage examples",
      "Interactive preview",
      "Export capabilities",
      "Educational content",
    ],
    icon: <Target className="h-6 w-6" />,
    href: "/color-harmonies",
    gradient: "from-teal-800 to-pink-300",
  },
  {
    title: "Color Mixer",
    tagline: "Blend Colors Naturally",
    description:
      "Mix colors together to create new shades and discover color relationships.",
    detail:
      "Experiment with color mixing using realistic blending algorithms. Mix multiple colors together, adjust ratios, and see how colors interact in real-time with professional color mixing techniques.",
    features: [
      "Realistic color mixing",
      "Multiple color support",
      "Ratio adjustments",
      "Real-time preview",
      "Mixing history",
      "Professional algorithms",
    ],
    icon: <Blend className="h-6 w-6" />,
    href: "/color-mixer",
    gradient: "from-green-600 to-blue-800",
  },
  {
    title: "Theme Generator",
    tagline: "Complete Design Systems",
    description: "Generate complete color themes for your design projects.",
    detail:
      "Create comprehensive design systems with primary, secondary, accent colors, and their variations. Generate themes for light and dark modes with proper contrast ratios and accessibility considerations.",
    features: [
      "Complete theme generation",
      "Light & dark modes",
      "Accessibility focused",
      "Design system export",
      "CSS variables",
      "Framework integration",
    ],
    icon: <Settings className="h-6 w-6" />,
    href: "/theme-generator",
    gradient: "from-purple-900 to-yellow-300",
  },
  {
    title: "Color Blindness Simulator",
    tagline: "Accessibility Testing Tool",
    description:
      "Test how your colors appear to users with different types of color vision.",
    detail:
      "Simulate various types of color blindness including protanopia, deuteranopia, tritanopia, and more. Ensure your designs are accessible to users with different color vision capabilities.",
    features: [
      "8 vision types",
      "Real-time simulation",
      "Image upload support",
      "Accessibility reports",
      "Comparison views",
      "Educational resources",
    ],
    icon: <Eye className="h-6 w-6" />,
    href: "/color-blindness-simulator",
    gradient: "from-amber-700 to-sky-400",
  },
  {
    title: "Color Extractor",
    tagline: "Extract Colors from Images",
    description:
      "Extract dominant colors from any image using advanced algorithms.",
    detail:
      "Upload images and extract their dominant colors using K-means clustering and other advanced algorithms. Perfect for creating palettes from photographs, artwork, or existing designs.",
    features: [
      "K-means clustering",
      "Dominant color extraction",
      "Multiple algorithms",
      "Palette generation",
      "Export options",
      "Batch processing",
    ],
    icon: <Pipette className="h-6 w-6" />,
    href: "/color-extractor",
    gradient: "from-rose-700 to-emerald-300",
  },
  {
    title: "Gradient Library",
    tagline: "Beautiful Gradient Collection",
    description:
      "Explore our curated collection of stunning gradients for your projects.",
    detail:
      "Browse through hundreds of professionally designed gradients organized by style, mood, and application. Each gradient includes CSS code and can be customized to fit your specific needs.",
    features: [
      "300+ gradients",
      "Style categories",
      "CSS code included",
      "Customization options",
      "Preview modes",
      "Easy copying",
    ],
    icon: <Layers className="h-6 w-6" />,
    href: "/gradients",
    gradient: "from-blue-900 to-teal-200",
  },
  {
    title: "Gradient Theory",
    tagline: "Master Gradient Design",
    description:
      "Learn the principles of creating beautiful and effective gradients.",
    detail:
      "Understand gradient theory including color transitions, direction, easing, and visual impact. Learn how to create gradients that enhance your designs rather than distract from them.",
    features: [
      "Gradient principles",
      "Color transitions",
      "Direction theory",
      "Easing functions",
      "Visual examples",
      "Best practices",
    ],
    icon: <Lightbulb className="h-6 w-6" />,
    href: "/gradient-theory",
    gradient: "from-orange-800 to-violet-400",
  },
  {
    title: "Gradient Generator",
    tagline: "Custom Gradient Creator",
    description:
      "Create custom gradients with full control over colors and direction.",
    detail:
      "Build custom gradients with unlimited colors, multiple directions, and advanced easing options. Real-time preview and instant CSS code generation make it easy to implement in your projects.",
    features: [
      "Unlimited colors",
      "Multiple directions",
      "Advanced easing",
      "Real-time preview",
      "CSS generation",
      "Export options",
    ],
    icon: <Wand2 className="h-6 w-6" />,
    href: "/gradient-generator",
    gradient: "from-cyan-800 to-red-400",
  },
  {
    title: "Gradient Explorer",
    tagline: "Interactive Gradient Tool",
    description:
      "Explore and experiment with gradients in an interactive environment.",
    detail:
      "Interactive gradient exploration tool with real-time editing, color manipulation, and advanced controls. Perfect for experimenting with different gradient combinations and effects.",
    features: [
      "Interactive editing",
      "Real-time preview",
      "Color manipulation",
      "Advanced controls",
      "Effect options",
      "Experimentation tools",
    ],
    icon: <Zap className="h-6 w-6" />,
    href: "/gradient-explorer",
    gradient: "from-lime-700 to-fuchsia-400",
  },
  {
    title: "Multi-step Gradient",
    tagline: "Complex Gradient Builder",
    description: "Create complex multi-step gradients with precise control.",
    detail:
      "Build sophisticated gradients with multiple color stops, custom positioning, and advanced blending modes. Perfect for creating complex backgrounds and visual effects.",
    features: [
      "Multiple color stops",
      "Custom positioning",
      "Blending modes",
      "Advanced controls",
      "Complex effects",
      "Professional output",
    ],
    icon: <Sliders className="h-6 w-6" />,
    href: "/multistep-gradient",
    gradient: "from-pink-800 to-green-300",
  },
  {
    title: "Advanced Gradient Builder",
    tagline: "Professional Gradient Suite",
    description: "Professional-grade gradient creation with advanced features.",
    detail:
      "Advanced gradient builder with layer support, blend modes, animation capabilities, and professional export options. Designed for complex projects requiring sophisticated gradient effects.",
    features: [
      "Layer support",
      "Blend modes",
      "Animation support",
      "Professional export",
      "Complex effects",
      "Advanced features",
    ],
    icon: <Settings className="h-6 w-6" />,
    href: "/advanced-gradient-builder",
    gradient: "from-gray-800 to-cyan-400",
  },
  {
    title: "Gradient Extractor",
    tagline: "Extract Gradients from Images",
    description:
      "Extract gradient patterns from images and convert them to CSS.",
    detail:
      "Analyze images to extract gradient patterns and convert them to usable CSS gradients. Perfect for recreating gradients from existing designs or natural imagery.",
    features: [
      "Image analysis",
      "Gradient detection",
      "CSS conversion",
      "Pattern recognition",
      "Export options",
      "Batch processing",
    ],
    icon: <ImageIcon className="h-6 w-6" />,
    href: "/gradient-extractor",
    gradient: "from-yellow-800 to-blue-300",
  },
];
