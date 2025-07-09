"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TailwindVariablesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  baseColor: string;
  complementaryColor: string;
  analogousColors: string[];
  triadicColors: string[];
  tetradicColors: string[];
  monochromaticColors: string[];
}

export function TailwindVariablesDialog({
  isOpen,
  onClose,
  baseColor,
  complementaryColor,
  analogousColors,
  triadicColors,
  tetradicColors,
  monochromaticColors,
}: TailwindVariablesDialogProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Helper function to convert hex to HSL for better color manipulation
  const hexToHSL = (hex: string) => {
    hex = hex.replace(/^#/, "");
    const r = Number.parseInt(hex.substring(0, 2), 16) / 255;
    const g = Number.parseInt(hex.substring(2, 4), 16) / 255;
    const b = Number.parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Generate theme colors based on the palette
  const generateThemeColors = (paletteType: string) => {
    let primaryColor = baseColor;
    let secondaryColor = monochromaticColors[1] || baseColor;
    let accentColor = complementaryColor;

    // Adjust colors based on palette type
    switch (paletteType) {
      case "complementary":
        primaryColor = baseColor;
        secondaryColor = complementaryColor;
        accentColor = monochromaticColors[2] || baseColor;
        break;
      case "analogous":
        primaryColor =
          analogousColors[Math.floor(analogousColors.length / 2)] || baseColor;
        secondaryColor = analogousColors[0] || baseColor;
        accentColor = analogousColors[analogousColors.length - 1] || baseColor;
        break;
      case "triadic":
        primaryColor = triadicColors[0] || baseColor;
        secondaryColor = triadicColors[1] || baseColor;
        accentColor = triadicColors[2] || baseColor;
        break;
      case "tetradic":
        primaryColor = tetradicColors[0] || baseColor;
        secondaryColor = tetradicColors[1] || baseColor;
        accentColor = tetradicColors[2] || baseColor;
        break;
      case "monochromatic":
        primaryColor =
          monochromaticColors[Math.floor(monochromaticColors.length / 2)] ||
          baseColor;
        secondaryColor = monochromaticColors[1] || baseColor;
        accentColor =
          monochromaticColors[monochromaticColors.length - 1] || baseColor;
        break;
    }

    // Generate light theme
    const primaryHSL = hexToHSL(primaryColor);
    const secondaryHSL = hexToHSL(secondaryColor);
    const accentHSL = hexToHSL(accentColor);

    const lightTheme = {
      background: "#FFFFFF",
      foreground: "#0F172A",
      card: "#FFFFFF",
      cardForeground: "#0F172A",
      popover: "#FFFFFF",
      popoverForeground: "#0F172A",
      primary: primaryColor,
      primaryForeground: "#FFFFFF",
      secondary: hslToHex(primaryHSL.h, Math.max(5, primaryHSL.s - 70), 97),
      secondaryForeground: hslToHex(
        primaryHSL.h,
        Math.min(90, primaryHSL.s + 10),
        20
      ),
      muted: hslToHex(primaryHSL.h, 10, 96),
      mutedForeground: hslToHex(primaryHSL.h, 10, 40),
      accent: hslToHex(accentHSL.h, Math.max(5, accentHSL.s - 60), 97),
      accentForeground: hslToHex(
        accentHSL.h,
        Math.min(90, accentHSL.s + 10),
        20
      ),
      destructive: "#FF4136",
      destructiveForeground: "#FFFFFF",
      border: hslToHex(primaryHSL.h, 10, 90),
      input: hslToHex(primaryHSL.h, 10, 90),
      ring: primaryColor,
    };

    // Generate dark theme
    const darkPrimary = hslToHex(
      primaryHSL.h,
      Math.min(90, primaryHSL.s + 5),
      Math.max(65, primaryHSL.l + 10)
    );

    const darkTheme = {
      background: "#0F172A",
      foreground: "#F8FAFC",
      card: "#1E293B",
      cardForeground: "#F8FAFC",
      popover: "#1E293B",
      popoverForeground: "#F8FAFC",
      primary: darkPrimary,
      primaryForeground: "#0F172A",
      secondary: hslToHex(primaryHSL.h, Math.max(5, primaryHSL.s - 40), 15),
      secondaryForeground: "#F8FAFC",
      muted: hslToHex(primaryHSL.h, 10, 15),
      mutedForeground: hslToHex(primaryHSL.h, 5, 65),
      accent: hslToHex(accentHSL.h, Math.max(5, accentHSL.s - 30), 15),
      accentForeground: "#F8FAFC",
      destructive: "#FF4136",
      destructiveForeground: "#F8FAFC",
      border: hslToHex(primaryHSL.h, 10, 20),
      input: hslToHex(primaryHSL.h, 10, 20),
      ring: darkPrimary,
    };

    return { lightTheme, darkTheme };
  };

  const generateTailwindCSS = (paletteType: string) => {
    const { lightTheme, darkTheme } = generateThemeColors(paletteType);

    const lightVars = Object.entries(lightTheme)
      .map(([key, value]) => {
        const kebabKey = key
          .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
          .toLowerCase();
        return `  --color-${kebabKey}: ${value};`;
      })
      .join("\n");

    const darkVars = Object.entries(darkTheme)
      .map(([key, value]) => {
        const kebabKey = key
          .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
          .toLowerCase();
        return `  --color-${kebabKey}: ${value};`;
      })
      .join("\n");

    return `/* Tailwind CSS V4 Variables - ${
      paletteType.charAt(0).toUpperCase() + paletteType.slice(1)
    } Palette */
:root {
${lightVars}
}

@media (prefers-color-scheme: dark) {
  :root {
${darkVars}
  }
}

/* Or use class-based dark mode */
.dark {
${darkVars}
}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Tailwind CSS variables copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tailwind CSS Variables</DialogTitle>
          <DialogDescription>
            Generate Tailwind CSS V4 variables based on your color palette.
            Choose a palette type to see the generated variables.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="complementary" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="complementary">Complementary</TabsTrigger>
            <TabsTrigger value="analogous">Analogous</TabsTrigger>
            <TabsTrigger value="triadic">Triadic</TabsTrigger>
            <TabsTrigger value="tetradic">Tetradic</TabsTrigger>
            <TabsTrigger value="monochromatic">Monochromatic</TabsTrigger>
          </TabsList>

          {[
            "complementary",
            "analogous",
            "triadic",
            "tetradic",
            "monochromatic",
          ].map((paletteType) => (
            <TabsContent
              key={paletteType}
              value={paletteType}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold capitalize">
                  {paletteType} Palette Variables
                </h3>
                <Button
                  onClick={() =>
                    copyToClipboard(generateTailwindCSS(paletteType))
                  }
                  className="gap-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied!" : "Copy CSS"}
                </Button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto max-h-96 overflow-y-auto border">
                  {generateTailwindCSS(paletteType)}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Light Theme Preview</h4>
                  <div
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor:
                        generateThemeColors(paletteType).lightTheme.background,
                    }}
                  >
                    <div
                      className="p-3 rounded-md mb-3"
                      style={{
                        backgroundColor:
                          generateThemeColors(paletteType).lightTheme.primary,
                        color:
                          generateThemeColors(paletteType).lightTheme
                            .primaryForeground,
                      }}
                    >
                      Primary Element
                    </div>
                    <div
                      className="p-3 rounded-md mb-3"
                      style={{
                        backgroundColor:
                          generateThemeColors(paletteType).lightTheme.secondary,
                        color:
                          generateThemeColors(paletteType).lightTheme
                            .secondaryForeground,
                      }}
                    >
                      Secondary Element
                    </div>
                    <div
                      className="p-3 rounded-md"
                      style={{
                        backgroundColor:
                          generateThemeColors(paletteType).lightTheme.accent,
                        color:
                          generateThemeColors(paletteType).lightTheme
                            .accentForeground,
                      }}
                    >
                      Accent Element
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Dark Theme Preview</h4>
                  <div
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor:
                        generateThemeColors(paletteType).darkTheme.background,
                    }}
                  >
                    <div
                      className="p-3 rounded-md mb-3"
                      style={{
                        backgroundColor:
                          generateThemeColors(paletteType).darkTheme.primary,
                        color:
                          generateThemeColors(paletteType).darkTheme
                            .primaryForeground,
                      }}
                    >
                      Primary Element
                    </div>
                    <div
                      className="p-3 rounded-md mb-3"
                      style={{
                        backgroundColor:
                          generateThemeColors(paletteType).darkTheme.secondary,
                        color:
                          generateThemeColors(paletteType).darkTheme
                            .secondaryForeground,
                      }}
                    >
                      Secondary Element
                    </div>
                    <div
                      className="p-3 rounded-md"
                      style={{
                        backgroundColor:
                          generateThemeColors(paletteType).darkTheme.accent,
                        color:
                          generateThemeColors(paletteType).darkTheme
                            .accentForeground,
                      }}
                    >
                      Accent Element
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">How to Use</h4>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Copy the CSS variables from your preferred palette type</li>
            <li>Add them to your main CSS file or Tailwind configuration</li>
            <li>
              Use the color names in your Tailwind classes (e.g.,{" "}
              <code className="bg-muted px-1 rounded">bg-primary</code>,{" "}
              <code className="bg-muted px-1 rounded">text-secondary</code>)
            </li>
            <li>
              The variables automatically support both light and dark themes
            </li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
}
