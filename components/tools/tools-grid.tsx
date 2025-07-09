import { toolsData } from "@/lib/tools-data";

import { ToolCard } from "./tool-card";
import { BottomCTA } from "./bottom-cta";

export function ToolsGrid() {
  return (
    <div className="container max-w-6xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {toolsData.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
      <BottomCTA />
    </div>
  );
}
