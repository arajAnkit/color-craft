import { Sparkles } from "lucide-react";
import { toolsData } from "@/lib/tools-data";

export function BottomCTA() {
  return (
    <div className="mt-20 text-center">
      <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full border border-white/20 shadow-xl">
        <div className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="text-base font-semibold text-slate-900 dark:text-white">
          {toolsData.length} Professional Tools Ready to Use
        </span>
      </div>
    </div>
  );
}
