"use client";

import { useState } from "react";
import { ColorCard } from "./color-card";
import { ColorCardSkeleton } from "@/components/loading/color-card-skeleton";
import { type Color } from "@/lib/color-data";

type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "oklch";

interface ColorGridProps {
  colors: Color[];
  copiedColor?: string | null;
  copiedFormat?: string | null;
  onCopyColor?: (color: string, format: ColorFormat, colorName: string) => void;
}

export function ColorGrid({
  colors,
  copiedColor,
  copiedFormat,
  onCopyColor,
}: ColorGridProps) {
  const [isLoading, setIsLoading] = useState(false);

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
      {colors.map((color, index) => (
        <ColorCard
          key={index}
          color={color}
          isCopied={copiedColor === color.hex}
          copiedFormat={copiedFormat ?? null}
          copiedColor={copiedColor ?? null}
          onCopyColor={onCopyColor ?? (() => {})}
        />
      ))}
      {colors.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          Colors not found
        </p>
      )}
    </div>
  );
}
