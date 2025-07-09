"use client";

import { ToolCard } from "./tool-card";
import { toolsData } from "@/lib/tools-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ToolsGrid() {
  // Show only first 8 tools on home page
  const displayTools = toolsData.slice(0, 8);

  return (
    <div className="space-y-8">
      <div className="tools-grid mx-auto grid justify-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {displayTools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>

      {/* Explore All Tools Button */}
      <div className="flex justify-center">
        <Link href="/all-tools">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Explore All Tools
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
