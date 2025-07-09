import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColorSwatch } from "./color-swatch";
import { ColorWheel } from "./color-wheel";
import type { Harmony } from "@/types/color";

interface PaletteDisplayProps {
  colors: string[];
  harmonyType: Harmony;
  baseColor: string;
  onBaseColorChange?: (newBaseColor: string) => void;
}

export function PaletteDisplay({
  colors,
  harmonyType,
  baseColor,
  onBaseColorChange,
}: PaletteDisplayProps) {
  if (colors.length === 0) return null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Generated Palette</CardTitle>
          <CardDescription>
            Here is your generated color palette using {harmonyType} harmony.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {colors.map((color, index) => (
              <ColorSwatch
                key={`${color}-${index}`}
                color={color}
                index={index}
                isBaseColor={color.toUpperCase() === baseColor.toUpperCase()}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <ColorWheel
        colors={colors}
        baseColor={baseColor}
        harmonyType={harmonyType}
        onBaseColorChange={onBaseColorChange}
      />
    </div>
  );
}
