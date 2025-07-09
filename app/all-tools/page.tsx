"use client";

import { toolsData } from "@/lib/tools-data";

import { HeroSection } from "@/components/tools/hero-section";
import { ToolsGrid } from "@/components/tools/tools-grid";

export default function AllToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <HeroSection />
      <ToolsGrid toolsData={toolsData} />
    </div>
  );
}
