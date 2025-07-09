"use client";

import { useState, useMemo } from "react";
import { ColorCard } from "./color-card";
import { ColorCardSkeleton } from "@/components/loading/color-card-skeleton";
import { type Color, colorData } from "@/lib/color-data";

type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "oklch";

interface ColorGridProps {
  colors: Color[];
  searchQuery?: string;
  selectedCategory?: string;
  copiedColor?: string | null;
  copiedFormat?: string | null;

  onCopyColor?: (color: string, format: ColorFormat, colorName: string) => void;
}

export function ColorGrid({
  searchQuery = "",
  selectedCategory = "all",
  copiedColor,
  copiedFormat,
  onCopyColor,
}: ColorGridProps) {
  const [isLoading, setIsLoading] = useState(false);

  const filteredColors = useMemo(() => {
    return colorData.filter((color) => {
      const matchesSearch =
        color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        color.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || color.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <ColorCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filteredColors.map((color) => (
        <ColorCard
          key={color.hex}
          color={color}
          isCopied={copiedColor === color.hex}
          copiedFormat={copiedFormat ?? null}
          copiedColor={copiedColor ?? null}
          onCopyColor={onCopyColor ?? (() => {})}
        />
      ))}
    </div>
  );
}
