"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Palette } from "lucide-react";
import type { Color } from "@/types/color";
import { ExportFormatTabs, type ExportFormat } from "./export-format-tabs";
import {
  generateJSON,
  generateCSS,
  generateSCSS,
  generateTailwind,
  generateASE,
  generateSketch,
  generateFigma,
  generateProcreate,
} from "@/utils/export-formats";

interface PaletteExportDialogProps {
  colors: Color[];
  paletteName?: string;
}

export function PaletteExportDialog({
  colors,
  paletteName = "Custom Palette",
}: PaletteExportDialogProps) {
  const [activeTab, setActiveTab] = useState("json");
  const { toast } = useToast();

  const formats: Record<string, ExportFormat> = {
    json: {
      name: "JSON",
      extension: "json",
      content: generateJSON(colors, paletteName),
      description: "Standard JSON format for web applications",
    },
    css: {
      name: "CSS Variables",
      extension: "css",
      content: generateCSS(colors),
      description: "CSS custom properties with utility classes",
    },
    scss: {
      name: "SCSS Variables",
      extension: "scss",
      content: generateSCSS(colors, paletteName),
      description: "Sass variables and color map",
    },
    tailwind: {
      name: "Tailwind Config",
      extension: "js",
      content: generateTailwind(colors),
      description: "Tailwind CSS configuration object",
    },
    ase: {
      name: "Adobe ASE",
      extension: "txt",
      content: generateASE(colors, paletteName),
      description: "Adobe Swatch Exchange format",
    },
    sketch: {
      name: "Sketch Palette",
      extension: "sketchpalette",
      content: generateSketch(colors),
      description: "Sketch app color palette",
    },
    figma: {
      name: "Figma Tokens",
      extension: "json",
      content: generateFigma(colors, paletteName),
      description: "Design tokens for Figma plugins",
    },
    procreate: {
      name: "Procreate",
      extension: "txt",
      content: generateProcreate(colors, paletteName),
      description: "Color list for Procreate app",
    },
  };

  const copyToClipboard = (content: string, formatName: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: `${formatName} format copied to clipboard.`,
    });
  };

  const downloadFile = (
    content: string,
    filename: string,
    extension: string
  ) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <Download className="h-4 w-4" />
          Export Palette
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Export Color Palette
          </DialogTitle>
          <DialogDescription>
            Export your color palette in various formats for different design
            tools and workflows.
          </DialogDescription>
        </DialogHeader>

        <ExportFormatTabs
          formats={formats}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          paletteName={paletteName}
          onCopy={copyToClipboard}
          onDownload={downloadFile}
        />
      </DialogContent>
    </Dialog>
  );
}
