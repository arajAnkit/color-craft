import { toolsData } from "@/lib/tools-data";

export function StatsSection() {
  return (
    <div className="flex flex-wrap justify-center gap-8 pt-8">
      <div className="text-center">
        <div className="text-3xl font-bold text-slate-900 dark:text-white">
          {toolsData.length}+
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Professional Tools
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-slate-900 dark:text-white">
          8
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Tool Categories
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-slate-900 dark:text-white">
          100%
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Free to Use
        </div>
      </div>
    </div>
  );
}
