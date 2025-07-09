"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormatContent } from "./format-content";

export interface ExportFormat {
  name: string;
  extension: string;
  content: string;
  description: string;
}

interface ExportFormatTabsProps {
  formats: Record<string, ExportFormat>;
  activeTab: string;
  onTabChange: (value: string) => void;
  paletteName: string;
  onCopy: (content: string, formatName: string) => void;
  onDownload: (content: string, filename: string, extension: string) => void;
}

export function ExportFormatTabs({
  formats,
  activeTab,
  onTabChange,
  paletteName,
  onCopy,
  onDownload,
}: ExportFormatTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid grid-cols-4 lg:grid-cols-8">
        {Object.entries(formats).map(([key, format]) => (
          <TabsTrigger key={key} value={key} className="text-xs">
            {format.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(formats).map(([key, format]) => (
        <TabsContent key={key} value={key} className="space-y-4">
          <FormatContent
            format={format}
            formatKey={key}
            paletteName={paletteName}
            onCopy={onCopy}
            onDownload={onDownload}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
