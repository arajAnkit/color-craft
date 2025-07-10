"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { colorData } from "@/lib/color-data";
import { ColorHero } from "@/components/colors/color-hero";
import { ColorSearch } from "@/components/colors/color-search";
import { ColorCategories } from "@/components/colors/color-categories";
import { ColorGrid } from "@/components/colors/color-grid";

type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "oklch";

export default function ColorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<ColorFormat | null>(null);
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All Shades", color: "#E2E8F0" },
    { id: "red", name: "Red", color: "#EF4444" },
    { id: "orange", name: "Orange", color: "#F97316" },
    { id: "yellow", name: "Yellow", color: "#EAB308" },
    { id: "green", name: "Green", color: "#22C55E" },
    { id: "blue", name: "Blue", color: "#3B82F6" },
    { id: "purple", name: "Purple", color: "#8B5CF6" },
    { id: "pink", name: "Pink", color: "#EC4899" },
    { id: "black", name: "Black", color: "#000000" },
    { id: "white", name: "White", color: "#FFFFFF" },
  ];

  // Filter colors based on search term and category
  const filteredColors = colorData.filter((color) => {
    const matchesSearch = color.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || color.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  console.log(filteredColors);

  const copyToClipboard = (
    text: string,
    format: ColorFormat,
    colorName: string
  ) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    setCopiedFormat(format);

    toast({
      title: "Copied!",
      description: `${text} has been copied to clipboard.`,
    });

    setTimeout(() => {
      setCopiedColor(null);
      setCopiedFormat(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <ColorHero />

      <div className="mb-8">
        <ColorSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ColorCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <ColorGrid
        colors={filteredColors}
        copiedColor={copiedColor}
        copiedFormat={copiedFormat}
        onCopyColor={copyToClipboard}
      />
    </div>
  );
}
