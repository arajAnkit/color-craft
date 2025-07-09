"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaletteExportDialog } from "./palette-export-dialog";
import type { Color, Harmony } from "@/types/color";

interface PaletteActionsProps {
  colors: string[];
  colorObjects: Color[];
  harmonyType: Harmony;
}

export function PaletteActions({
  colors,
  colorObjects,
  harmonyType,
}: PaletteActionsProps) {
  const { toast } = useToast();

  const copyPalette = () => {
    navigator.clipboard.writeText(colors.join(", "));
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste the colors into your design tool.",
    });
  };

  return (
    <div className="flex gap-2">
      <PaletteExportDialog
        colors={colorObjects}
        paletteName={`${
          harmonyType.charAt(0).toUpperCase() + harmonyType.slice(1)
        } Palette`}
      />
      <Button onClick={copyPalette} variant="outline">
        <Copy className="mr-2 h-4 w-4" />
        Copy Colors
      </Button>
    </div>
  );
}
