"use client";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ColorSwatchProps {
  color: string;
  index: number;
  isBaseColor?: boolean;
}

export function ColorSwatch({
  color,
  index,
  isBaseColor = false,
}: ColorSwatchProps) {
  const { toast } = useToast();

  const handleColorClick = () => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${color} copied to clipboard.`,
    });
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <div
          className={`h-16 w-16 rounded-lg border shadow-sm cursor-pointer hover:scale-105 transition-transform ${
            isBaseColor ? "ring-2 ring-black ring-offset-2" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={handleColorClick}
        />
        {isBaseColor && (
          <div className="absolute -top-1 -right-1">
            <Badge variant="default" className="text-xs px-1 py-0">
              ★
            </Badge>
          </div>
        )}
      </div>
      <div className="text-center">
        <Label className="text-xs font-mono">{color}</Label>
        {isBaseColor && (
          <p className="text-xs text-muted-foreground">Base Color</p>
        )}
      </div>
    </div>
  );
}
