"use client";
import { Copy, Check } from "lucide-react";

type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "oklch";

interface ColorInfo {
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  category: string;
}

interface ColorCardProps {
  color: ColorInfo;
  isCopied?: boolean;
  copiedColor: string | null;
  copiedFormat: string | null;
  onCopyColor: (text: string, format: ColorFormat, colorName: string) => void;
}

export function ColorCard({
  color,
  copiedColor,
  copiedFormat,
  onCopyColor,
}: ColorCardProps) {
  const colorFormats = [
    { key: "hex" as ColorFormat, label: "HEX", value: color.hex },
    { key: "rgb" as ColorFormat, label: "RGB", value: color.rgb },
    { key: "hsl" as ColorFormat, label: "HSL", value: color.hsl },
    // { key: "oklch" as ColorFormat, label: "OKLCH", value: color.oklch },
  ];

  return (
    <div className="color-card group relative">
      <div
        className="h-48 rounded-t-lg cursor-pointer transition-all relative overflow-hidden"
        style={{ backgroundColor: color.hex }}
        onClick={() => onCopyColor(color.hex, "hex", color.name)}
      >
        {/* Color codes overlay - visible on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center space-y-1">
          {colorFormats.map((format) => (
            <button
              key={format.key}
              onClick={(e) => {
                e.stopPropagation();
                onCopyColor(format.value, format.key, color.name);
              }}
              className="text-white text-xs font-mono hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              <span className="text-white/70">{format.label}:</span>
              <span>{format.value}</span>
              {copiedColor === color.name && copiedFormat === format.key ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3 opacity-70" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 border border-t-0 rounded-b-lg">
        <h3 className="font-medium text-lg text-center">{color.name}</h3>
      </div>
    </div>
  );
}
