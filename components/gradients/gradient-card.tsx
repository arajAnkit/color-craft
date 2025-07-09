"use client";

import { Copy, Check } from "lucide-react";

interface GradientInfo {
  name: string;
  css: string;
  colors: string[];
  category: string;
  type?: string;
}

interface GradientCardProps {
  gradient: GradientInfo;
  copiedGradient: string | null;
  onCopyGradient?: (css: string, name: string) => void;
}

export function GradientCard({
  gradient,
  copiedGradient,
  onCopyGradient,
}: GradientCardProps) {
  return (
    <div className="gradient-card group relative">
      <div
        className="h-48 rounded-t-lg cursor-pointer transition-all relative overflow-hidden"
        style={{ background: gradient.css }}
        onClick={() => onCopyGradient?.(gradient.css, gradient.name)}
      >
        {/* Gradient info overlay - visible on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center space-y-2 p-4">
          <div className="text-white text-center">
            <div className="text-sm font-medium mb-2">
              {gradient.type?.toUpperCase() ?? "LINEAR"} GRADIENT
            </div>
            <div className="text-xs font-mono bg-black/30 rounded px-2 py-1 max-w-full overflow-hidden">
              {gradient.css}
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              {copiedGradient === gradient.name ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="text-xs">Click to copy CSS</span>
            </div>
          </div>
        </div>

        {/* Color dots */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {gradient.colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full border border-white/30"
              style={{ backgroundColor: color }}
            />
          ))}
          {gradient.colors.length > 4 && (
            <div className="w-3 h-3 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
              <span className="text-white text-xs">+</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 border border-t-0 rounded-b-lg">
        <h3 className="font-medium text-lg text-center">{gradient.name}</h3>
        <p className="text-sm text-muted-foreground text-center capitalize">
          {gradient.type} • {gradient.category}
        </p>
      </div>
    </div>
  );
}
