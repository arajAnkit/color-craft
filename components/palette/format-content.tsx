"use client";

import { Button } from "@/components/ui/button";
import { Copy, Download, FileText } from "lucide-react";
import type { ExportFormat } from "./export-format-tabs";
import { UsageInstructions } from "./usage-instructions";

interface FormatContentProps {
  format: ExportFormat;
  formatKey: string;
  paletteName: string;
  onCopy: (content: string, formatName: string) => void;
  onDownload: (content: string, filename: string, extension: string) => void;
}

export function FormatContent({
  format,
  formatKey,
  paletteName,
  onCopy,
  onDownload,
}: FormatContentProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{format.name}</h3>
          <p className="text-sm text-muted-foreground">{format.description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopy(format.content, format.name)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onDownload(
                format.content,
                paletteName.toLowerCase().replace(/\s+/g, "-"),
                format.extension
              )
            }
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <pre className="text-xs whitespace-pre-wrap break-all font-mono max-h-64 overflow-y-auto">
          {format.content}
        </pre>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Usage Instructions
        </h4>
        <UsageInstructions formatKey={formatKey} />
      </div>
    </>
  );
}
