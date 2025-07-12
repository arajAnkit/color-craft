"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Moon, Sun, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ThemeGeneratorPage() {
  const [primaryColor, setPrimaryColor] = useState("#7C3AED");
  const [primaryColorInput, setPrimaryColorInput] = useState("#7C3AED");
  const { toast } = useToast();

  // Convert hex to HSL
  const hexToHSL = (hex: string) => {
    // Remove the hash if it exists
    hex = hex.replace(/^#/, "");

    // Parse the hex values
    const r = Number.parseInt(hex.substring(0, 2), 16) / 255;
    const g = Number.parseInt(hex.substring(2, 4), 16) / 255;
    const b = Number.parseInt(hex.substring(4, 6), 16) / 255;

    // Find min and max values to determine hue
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

    // Convert h to degrees
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
  };

  // Convert HSL to hex
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

  // Generate a light theme color set
  const generateLightTheme = (primaryHex: string) => {
    const { h, s, l } = hexToHSL(primaryHex);

    return {
      background: "#FFFFFF",
      foreground: "#0F172A",
      card: "#FFFFFF",
      cardForeground: "#0F172A",
      popover: "#FFFFFF",
      popoverForeground: "#0F172A",
      primary: primaryHex,
      primaryForeground: "#FFFFFF",
      secondary: hslToHex(h, Math.max(5, s - 70), 97),
      secondaryForeground: hslToHex(h, Math.min(90, s + 10), 20),
      muted: hslToHex(h, 10, 96),
      mutedForeground: hslToHex(h, 10, 40),
      accent: hslToHex(h, Math.max(5, s - 60), 97),
      accentForeground: hslToHex(h, Math.min(90, s + 10), 20),
      destructive: "#FF4136",
      destructiveForeground: "#FFFFFF",
      border: hslToHex(h, 10, 90),
      input: hslToHex(h, 10, 90),
      ring: primaryHex,
    };
  };

  // Generate a dark theme color set
  const generateDarkTheme = (primaryHex: string) => {
    const { h, s, l } = hexToHSL(primaryHex);

    // Adjust primary color for dark mode
    const darkPrimary = hslToHex(h, Math.min(90, s + 5), Math.max(65, l + 10));

    return {
      background: "#0F172A",
      foreground: "#F8FAFC",
      card: "#1E293B",
      cardForeground: "#F8FAFC",
      popover: "#1E293B",
      popoverForeground: "#F8FAFC",
      primary: darkPrimary,
      primaryForeground: "#0F172A",
      secondary: hslToHex(h, Math.max(5, s - 40), 15),
      secondaryForeground: "#F8FAFC",
      muted: hslToHex(h, 10, 15),
      mutedForeground: hslToHex(h, 5, 65),
      accent: hslToHex(h, Math.max(5, s - 30), 15),
      accentForeground: "#F8FAFC",
      destructive: "#FF4136",
      destructiveForeground: "#F8FAFC",
      border: hslToHex(h, 10, 20),
      input: hslToHex(h, 10, 20),
      ring: darkPrimary,
    };
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrimaryColorInput(value);

    // Validate the color is a proper hex
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setPrimaryColor(value);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    toast({
      title: "Copied!",
      description: "CSS variables copied to clipboard.",
    });
  };

  const randomizeColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    setPrimaryColor(randomColor);
    setPrimaryColorInput(randomColor);
  };

  const lightTheme = generateLightTheme(primaryColor);
  const darkTheme = generateDarkTheme(primaryColor);

  // Generate Tailwind V4 CSS variables
  const generateTailwindV4Variables = () => {
    const lightVars = Object.entries(lightTheme)
      .map(([key, value]) => {
        // Convert camelCase to kebab-case
        const kebabKey = key
          .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
          .toLowerCase();
        return `  --color-${kebabKey}: ${value};`;
      })
      .join("\n");

    const darkVars = Object.entries(darkTheme)
      .map(([key, value]) => {
        // Convert camelCase to kebab-case
        const kebabKey = key
          .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
          .toLowerCase();
        return `  --color-${kebabKey}: ${value};`;
      })
      .join("\n");

    return `/* Tailwind CSS V4 Variables */
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

  // Mock UI components for preview
  const UIPreview = ({ theme }: { theme: Record<string, string> }) => (
    <div
      className="space-y-4"
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          style={{
            background: theme.primary,
            color: theme.primaryForeground,
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Primary Button
        </div>
        <div
          style={{
            background: theme.secondary,
            color: theme.secondaryForeground,
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Secondary Button
        </div>
      </div>

      <div
        style={{
          background: theme.card,
          color: theme.cardForeground,
          padding: "1rem",
          borderRadius: "0.5rem",
          border: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          Card Title
        </div>
        <div style={{ color: theme.mutedForeground, fontSize: "0.875rem" }}>
          This is some sample content inside a card component.
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "0.25rem",
            background: theme.primary,
          }}
        ></div>
        <div
          style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "0.25rem",
            background: theme.secondary,
          }}
        ></div>
        <div
          style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "0.25rem",
            background: theme.accent,
          }}
        ></div>
        <div
          style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "0.25rem",
            background: theme.muted,
          }}
        ></div>
        <div
          style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "0.25rem",
            background: theme.destructive,
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="container max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Theme Generator
        </h1>
        <p className="text-lg text-muted-foreground">
          Generate CSS variables for Tailwind CSS V4 themes.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Primary Color</CardTitle>
            <CardDescription>Choose your primary brand color</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              <div
                className="h-24 rounded-md shadow-md"
                style={{ backgroundColor: primaryColor }}
              ></div>

              <div className="space-y-2">
                <Label htmlFor="color-input">Hex Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color-input"
                    type="text"
                    value={primaryColorInput}
                    onChange={handleColorChange}
                    className="font-mono"
                  />
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                      setPrimaryColorInput(e.target.value);
                    }}
                    className="w-12 p-1 h-10"
                  />
                </div>
              </div>

              <Button
                variant="outline"
                onClick={randomizeColor}
                className="w-full gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Random Color</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
            <CardDescription>See how your themes look</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="light">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="light" className="gap-2">
                  <Sun className="h-4 w-4" />
                  <span>Light Theme</span>
                </TabsTrigger>
                <TabsTrigger value="dark" className="gap-2">
                  <Moon className="h-4 w-4" />
                  <span>Dark Theme</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="light" className="pt-6">
                <UIPreview theme={lightTheme} />
              </TabsContent>

              <TabsContent value="dark" className="pt-6">
                <UIPreview theme={darkTheme} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tailwind CSS V4 Variables</CardTitle>
          <CardDescription>
            Copy these CSS variables for use with Tailwind CSS V4
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <pre className="p-4 rounded-lg bg-muted font-mono text-xs overflow-x-auto max-h-80 overflow-y-auto">
              {generateTailwindV4Variables()}
            </pre>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(generateTailwindV4Variables())}
              className="absolute top-2 right-2"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={() => copyToClipboard(generateTailwindV4Variables())}
            className="w-full gap-2"
          >
            <Copy className="h-4 w-4" />
            <span>Copy CSS Variables</span>
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Using with Tailwind CSS V4</CardTitle>
          <CardDescription>
            How to implement your generated theme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Add CSS Variables</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Copy the generated CSS variables and add them to your main CSS
                file:
              </p>
              <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
                {`/* styles.css */
@import "tailwindcss";

/* Your generated variables here */
:root {
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  /* ... rest of your variables */
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. Use in Your Components</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Reference the colors in your Tailwind classes:
              </p>
              <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
                {`<button className="bg-primary text-primary-foreground">
  Primary Button
</button>

<div className="bg-card text-card-foreground border border-border">
  Card Content
</div>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium mb-2">3. Dark Mode Support</h3>
              <p className="text-sm text-muted-foreground mb-2">
                The generated variables include both light and dark themes. Use
                class-based or system preference dark mode:
              </p>
              <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto">
                {`<!-- Class-based dark mode -->
<html class="dark">
  <!-- Your content -->
</html>

<!-- Or use system preference -->
@media (prefers-color-scheme: dark) {
  /* Dark theme variables are automatically applied */
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
